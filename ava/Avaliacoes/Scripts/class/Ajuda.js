function Ajuda() {
    var aju = this;
    this.tela = $(window);

    this.criar = function (Botao, Caixa, texto) {
        $("<div>")
            .attr({ "id": Caixa, "class": "SEC02511_CaixaAjuda hideI" })
            .html("<div class='SEC02511_AjudaConteudo'>" + texto + "</div><div class='SEC02511_AjudaSeta'></div>")
            .insertAfter("#" + Botao);

        aju.evento(Botao, Caixa, texto, 0);
    }

    this.criarInversa = function (Botao, Caixa, texto) {
        $("<div>")
            .attr({ "id": Caixa, "class": "SEC02511_CaixaAjuda hideI" })
            .html("<div class='SEC02511_AjudaSeta'></div><div class='SEC02511_AjudaConteudo'>" + texto + "</div>")
            .insertAfter("#" + Botao);

        aju.evento(Botao, Caixa, texto, 1);
    }

    this.Ajustar = function (Caixa, texto, pos) {
        var conteudo = "";

        if (pos == 0) {
            conteudo = "<div class='SEC02511_AjudaConteudo'>" + texto + "</div><div class='SEC02511_AjudaSeta'></div>";
        } else {
            conteudo = "<div class='SEC02511_AjudaSeta'></div><div class='SEC02511_AjudaConteudo'>" + texto + "</div>";
        }


        $("#" + Caixa).html(conteudo);
    }

    this.evento = function (Botao, Caixa, texto, pos) {
        $("#" + Botao).mouseover(function () {
            $("#" + Caixa).removeClass("hideI");

            var objRetornoTop = aju.posTop($(this), Caixa, pos);
            
            if (pos != objRetornoTop.Sentido) {
                aju.Ajustar(Caixa, texto, objRetornoTop.Sentido);
            }

            var esquerda = aju.posLeft($(this), Caixa, objRetornoTop.Sentido);

            $("#" + Caixa).css({ "top": objRetornoTop.Top, "left": esquerda });

        }).mouseout(function () {
            $("#" + Caixa).addClass("hideI");
        });
    }

    //devolve objeto { Sentido : ( 0 = normal / 1 = inversa ), Top : valor }
    this.posTop = function (btn, Caixa, pos) {
        var objRetorno = { Sentido: pos, Top: 0 };
        var top, alturaCaixa, BotaoMarginTop, BotaoAltura;

        top = btn.position().top;
        alturaCaixa = $("#" + Caixa).height();

        if (top < alturaCaixa && pos == 0) {
            objRetorno.Sentido = 1;
        }


        BotaoMarginTop = aju.PxToNumber(btn.css("margin-top"));
        BotaoAltura = btn.height();


        if (objRetorno.Sentido == 0) {

            top = (top + BotaoMarginTop) - alturaCaixa;

        } else {

            top = top + BotaoAltura + 5;

        }


        /*
        inicio = (tamanhoTela - tamanhoCorpo) / 2;
        limite = inicio + tamanhoCorpo;
        tamanhoTela = $(window).width();
        tamanhoCorpo = $("div.caixaConteudo").width();
        */


        objRetorno.Top = top;
        return objRetorno;
    }
    this.posLeft = function (btn, Caixa, pos) {
        var classSeta = "SEC02511_AjudaEsquerda";
        var left, origem, comprimentoCaixa, marginLeft, BotaoMarginLeft, tamanhoTela, tamanhoCorpo, inicio, limite;

        left = btn.position().left;
        origem = left;
        comprimentoCaixa = $("#" + Caixa).width();

        marginLeft = 10;

        BotaoMarginLeft = aju.PxToNumber(btn.css("margin-left"));
        /*var BotalComprimento = btn.width();*/

        tamanhoTela = aju.tela.width();

        tamanhoCorpo = $("div.caixaConteudo").width();
        inicio = (tamanhoTela - tamanhoCorpo) / 2;
        limite = inicio + tamanhoCorpo;

        left = left + BotaoMarginLeft;

        if ((left + comprimentoCaixa) > limite) {
            left = limite - comprimentoCaixa;
            marginLeft = comprimentoCaixa - (limite - origem);
            classSeta = "SEC02511_AjudaDireita";
        }

        if (pos == 0) {
            classSeta += "Bot";
        } else {
            classSeta += "Top";
        }

        $("#" + Caixa).find(".SEC02511_AjudaSeta").css({ "margin-left": marginLeft });
        $("#" + Caixa).find(".SEC02511_AjudaSeta").addClass(classSeta);

        return left;
    }

    this.PxToNumber = function (valor) {
        return Number(valor.substring(0, valor.length - 2));
    }
}