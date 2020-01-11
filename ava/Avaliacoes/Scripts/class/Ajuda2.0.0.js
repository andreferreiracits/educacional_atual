//Botão, Caixa, texto, classe, seta ( meia / inteira ), setaMeio(sim / nao)






function Ajuda() {
    var aju = this;

    this.criar = function (botao, caixa, texto, classe, seta, setaMeio) {
        if (seta && seta != "meia" && seta != "inteira")
            seta = "meia";

        $("<div>")
            .attr({ "id": caixa, "class": "SEC02511_CaixaAjuda hideI" })
            .html("<div class='SEC02511_AjudaConteudo " + classe + " '>" + texto + "</div><div class='SEC02511_AjudaSeta " + seta + "'></div>")
            .insertAfter("#" + botao);

        aju.evento(botao, caixa, texto, "normal", setaMeio);
    }

    this.criarInversa = function (botao, caixa, texto, classe, seta, setaMeio) {
        if (seta && seta != "meia" && seta != "inteira")
            seta = "meia";

        $("<div>")
            .attr({ "id": caixa, "class": "SEC02511_CaixaAjuda hideI" })
            .html("<div class='SEC02511_AjudaSeta " + seta + "'></div><div class='SEC02511_AjudaConteudo " + classe + " '>" + texto + "</div>")
            .insertAfter("#" + botao);

        aju.evento(botao, caixa, texto, "inversa", setaMeio);
    }
   
    this.alterarTexto = function (caixa, texto) {
        $("#"+caixa+" .SEC02511_AjudaConteudo").text(texto);
    }

    this.evento = function (botao, caixa, texto, posicao, setaMeio) {
        $("#"+botao).mouseover(function () {
            $("#" + caixa).removeClass("hideI")
            .css({
                "top" : aju.posTop ($(this), caixa, posicao),
                "left": aju.posLeft($(this), caixa, posicao, setaMeio) 
            });
        }).mouseout(function () {
            $("#" + caixa).addClass("hideI");
        });
    }
    this.posTop = function (btn, Caixa, pos) {
        var top, alturaCaixa, BotaoMarginTop, BotaoAltura, PaddingTop, PaddingBot;

        top = btn.position().top;
        alturaCaixa = $("#" + Caixa).height();
        BotaoMarginTop = aju.PxToNumber(btn.css("margin-top"));
        PaddingTop = aju.PxToNumber(btn.css("padding-top"));
        PaddingBot = aju.PxToNumber(btn.css("padding-bottom"));
        BotaoAltura = btn.height();
        if (pos == "normal") {
            top = (top + BotaoMarginTop) - alturaCaixa;
        } else {
            top = top + BotaoAltura + PaddingTop + PaddingBot;
        }
        /*
        inicio = (tamanhoTela - tamanhoCorpo) / 2;
        limite = inicio + tamanhoCorpo;
        tamanhoTela = $(window).width();
        tamanhoCorpo = $("div.caixaConteudo").width();
        */
        return top;
    }
    this.posLeft = function (btn, Caixa, pos, setaMeio) {
        var direcaoSeta = "esquerda";
        var left, origem, comprimentoCaixa, marginLeft, BotaoMarginLeft, tamanhoTela, tamanhoCorpo, inicio, limite, comprimentoBotao;

        left = btn.position().left;
        origem = left;
        comprimentoCaixa = $("#" + Caixa).width();
        comprimentoBotao = btn.width();

        marginLeft = 10;

        BotaoMarginLeft = aju.PxToNumber(btn.css("margin-left"));
        /*var BotalComprimento = btn.width();*/

        tamanhoTela = $(window).width();
        tamanhoCorpo = $("div.caixaConteudo").width();
        inicio = (tamanhoTela - tamanhoCorpo) / 2;
        limite = inicio + tamanhoCorpo;

        left = left + BotaoMarginLeft;

        if ((left + comprimentoCaixa) > limite) {
            left = limite - comprimentoCaixa;
            marginLeft = comprimentoCaixa - (limite - origem);
            direcaoSeta = "direita";
            if (setaMeio) {
                marginLeft = comprimentoCaixa - comprimentoBotao - 25 / 2;
            }
        } else {
            if (setaMeio) {
                marginLeft = (comprimentoCaixa / 2) - 25 / 2; // tamanho da seta...
                left = left + (comprimentoBotao / 2) - (comprimentoCaixa / 2);
            }
        }

        if (pos == "normal") {
            direcaoSeta += "Bot";
        } else {
            direcaoSeta += "Top";
        }

        $("#" + Caixa).find(".SEC02511_AjudaSeta").css({ "margin-left": marginLeft });
        $("#" + Caixa).find(".SEC02511_AjudaSeta").addClass(direcaoSeta);

        return left;
    }

    this.PxToNumber = function (valor) {
        return Number(valor.substring(0, valor.length - 2));
    }
}