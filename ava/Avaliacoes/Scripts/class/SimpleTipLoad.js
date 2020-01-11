function SimpleTipLoad(sBtn, sDialogo, sConteinerAltura, topOffSet, sClose, fRetorno, fClose, fAntes, fRetornoMsg) {

    var tip = this;


    this.dialogo = sDialogo;
    this.btn = sBtn;
    this.conteinerAltura = sConteinerAltura;
    this.offsetTop = topOffSet;
    this.close = sClose;
    this.retorno = fRetorno;
    this.retornoClose = fClose;
    this.antes = fAntes;
    this.retornoMsg = fRetornoMsg;

    this.simpleTipWait;

    this.init = function () {
        var botoes = $(this.btn);

        botoes.each(function (index) {
            var botao = $(this);
            var link = $(this).attr('href');
            botao.click(function (e) {
                tip.antes(botao);
                $('body').append('<div id="simpletip-wait"></div>');
                $('#simpletip-wait').css('left', e.pageX + 10);
                $('#simpletip-wait').css('top', e.pageY + 10);
                $.ajax({
                    url: link,
                    type: "GET",
                    success: function (dados, status, xhttp) { tip.loadSimpleTip(botao, dados); }
                });

            });
            botao.attr('href', 'javascript:void(0)');
        });
    }

    this.loadSimpleTip = function (oBtn, data) {
        if ($("#" + this.dialogo).html() != null) {
            $("#" + this.dialogo).remove();
        }

        $("#simpletip-wait").remove();

        if ($(data).attr('class') && $(data).attr('class').indexOf("confirm") > -1) {
            if (this.retornoMsg) { this.retornoMsg(data); }
            return;
        }
        if ($(data).hasClass("erro")) {
            if (this.retornoMsg) { this.retornoMsg(data); }
            return;
        }


        var tmpleft = (oBtn.position().left);

        //alert(tmpleft + " & " + $(tip.btn).position().left);

        var tmptop = (oBtn.position().top);
        var btnHeight = (oBtn.height());

        var sTop = $(document).scrollTop();
        var wHeight = $(window).height();
        var baseline = sTop + wHeight;

        $("body").append("<div id='" + this.dialogo + "'></div>");
        $("#" + this.dialogo).append($(data));

        var tipHeight = $("#" + this.dialogo + " " + this.conteinerAltura).height();

        $("#" + this.dialogo).css("left", tmpleft + 'px');

        if (tmptop + btnHeight + tipHeight + this.offsetTop > baseline) {
            $("#" + this.dialogo).css("top", (tmptop - (tipHeight + btnHeight)) + 'px');
        } else {
            $("#" + this.dialogo).css("top", (tmptop + btnHeight + this.offsetTop) + 'px');
        }

        $("#" + this.dialogo + " " + this.close).attr('href', FUNCAO_VAZIA).click(function () { });
        $("#" + this.dialogo + " " + this.close).click(function () {
            tip.closeSimpleTip();
        });
        new DataMode(mensagem).ano("#txtAno");

        this.retorno(oBtn);


    }

    this.closeSimpleTip = function () {
        $("#" + this.dialogo).remove();
        this.retornoClose();

    }

    this.init();
}
