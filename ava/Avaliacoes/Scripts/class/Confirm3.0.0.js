function Confirm(sId) {

    var conf = this;
    this.version = "3.0.0";
    this.nome = sId;
    this.id = "#" + sId;

    this.init = function () {
        this.create();
        $(this.id + "_Fundo").hide();
    };

    this.create = function () {
        if ($(this.id + "_Fundo").length > 0) {
            return;
        }
        fundo = $("<div></div>").attr({
            "id": this.nome + "_Fundo",
            "class": "opacidadeLoadingBox"
        });
        var boxMsg = $(this.id);
        if (boxMsg.length <= 0) {
            boxMsg = $("<div></div>").attr({ "id": this.nome }).addClass("mensagem");
        } else {
            $(this.id).remove();
        }
        fundo.append(boxMsg);
        $("body").append(fundo);
        this.reposicionar();
        $(window).scroll(function () { msg.reposicionar(); });
    };

    this.exibir = function (dados, acaoConfirm, acaoNao) {
        var container = $(this.id + "_Fundo");
        var element = container.find(this.id);
        var titulo = dados.attr("title");
        if (!titulo || titulo == "") {
            titulo = "Mensagem";
        }
        element.html("");
        //titulo
        var elementTitulo = $("<h1></h1>").appendTo(element);
        $("<p>" + titulo + "</p>").appendTo(elementTitulo)
        $("<a></a>", {"href": "javascript:void(0);", "class": "fechar close"}).append("Fechar").appendTo(elementTitulo);
        //conteudo
        var elementConteudo = $("<div></div>", {"class": "interno"}).appendTo(element);
        $("<div></div>", {"class": "icone"}).appendTo(elementConteudo);
        //botoes
        var elementBotoes = $("<ul></ul>").appendTo(elementConteudo);
        var elementLiSim = $("<li></li>").appendTo(elementBotoes);
        if ($(dados).find(".btnConfirmSim").length > 0) {
            $(dados).find(".btnConfirmSim").clone().appendTo(elementLiSim);
            $(dados).find(".btnConfirmSim").remove();
        } else {
            $("<a></a>", {"href": "javascript:void(0);", "class": "btnConfirmSim"}).append("Sim").appendTo(elementLiSim);
        }
        var elementLiNao = $("<li></li>").appendTo(elementBotoes);
        if ($(dados).find(".btnConfirmNao").length > 0) {
            $(dados).find(".btnConfirmNao").addClass("close");
            $(dados).find(".btnConfirmNao").clone().appendTo(elementLiNao);
            $(dados).find(".btnConfirmNao").remove();
        } else {
            $("<a></a>", {"href": "javascript:void(0);", "class": "btnConfirmNao close"}).append("Não").appendTo(elementLiNao);
        }
        container.find(".close").click(function () {
            if (acaoNao) {
                acaoNao();
            }
            conf.close();
        });
        container.find(".btnConfirmSim").click(function () {
            acaoConfirm();
            conf.close();
        });
        //msg
        element.addClass(dados.attr("class"));
        $("<p></p>").append($(dados).html()).appendTo(elementConteudo);
        elementBotoes.appendTo(elementConteudo);
        container.show();
        this.open = true;
    };
    
    this.esconder = function () {
        var container = $(this.id + "_Fundo");
        var element = container.find(this.id);
        this.open = false
        element.html("");
        container.hide();
    };

    this.close = function () {
        if (!this.open) {
            return;
        }
        this.esconder();
    };

    this.reposicionar = function (event) {
        var fundo = $(this.id + "_Fundo");
        fundo.css("top", $(window).scrollTop());
        fundo.css("left", $(window).scrollLeft());
    };
    
    this.focus = function () {
    };

    this.toString = function () {
        return "Confirm - " + this.nome;
    };

    this.htmlTemplate = function (erro, msg, estilo) {
        throw "não tem template para o confirm";
    };

    this.init();
}
