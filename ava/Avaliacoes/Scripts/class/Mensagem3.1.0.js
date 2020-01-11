function Mensagem(sId) {

    var msg = this;
    this.version = "3.1.0";
    this.nome = sId;
    this.id = "#" + sId;
    this.open = false;
    this.onClose = undefined;
    this.onReload = undefined;
    this.tituloPadrao = "Mensagem";

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
    
    this.objetoJsonNovo = function (dados) {

        var objetoMensagem = undefined;
        var objetoRetorno = undefined;

        if (dados && dados[0] && dados[0].Mensagens && dados[0].Mensagens[0]) {
            objetoMensagem = dados[0].Mensagens[0];
        }

        if (dados && dados[0] && dados[0].Situacoes && dados[0].Situacoes[0] && dados[0].Situacoes[0].Mensagens && dados[0].Situacoes[0].Mensagens[0]) {
            objetoMensagem = dados[0].Situacoes[0].Mensagens[0];
        }

        if (objetoMensagem !== undefined) {
            objetoRetorno = {
                titulo: objetoMensagem.Titulo ? objtoMensagem.Titulo : "",
                txtMsg: objetoMensagem.Mensagem,
                reload: objetoMensagem.Acao == "Redirect",
                estilo: "erro alerta"
            };
        }

        return objetoRetorno;
    };
    
    this.objetoAntigoNovo = function (dados) {

        var titulo, txtMsg, reload, estilo;

        var objeto = msg.objetoJsonNovo(dados);

        if (objeto !== undefined)
            return objeto;

        if ($(dados).hasClass("SEC025-11_erro")) {
            //modelo novo de mensagem
            titulo = $(dados).attr('title');
            txtMsg = $(dados).html();
            reload = $(dados).attr('data-acao') == "Redirect";
            estilo = "erro alerta";
        } else {
            titulo = $(dados).find("p#mensagem").attr('title');
            txtMsg = $(dados).find("p#mensagem").html();
            reload = $(dados).hasClass("sessao");
            estilo = $(dados).attr('class');
        }

        return {
            titulo: titulo,
            txtMsg: txtMsg,
            reload: reload,
            estilo: estilo
        };

    };

    this.exibir = function (dados, textoExtra) {
        var container = $(this.id + "_Fundo");
        var element = container.find(this.id);
        var objetoMensagem = this.objetoAntigoNovo(dados);
        var titulo = objetoMensagem.titulo || this.tituloPadrao;
        element.html("");
        //titulo
        var elementTitulo = $("<h1></h1>").appendTo(element);
        $("<p>" + titulo + "</p>").appendTo(elementTitulo)
        $("<a></a>", {"href": "javascript:void(0);", "class": "fechar closeMsg"}).append("Fechar").appendTo(elementTitulo);
        //conteudo
        var elementConteudo = $("<div></div>", {"class": "interno"}).appendTo(element);
        $("<div></div>", {"class": "icone"}).appendTo(elementConteudo);
        var txtMsg = objetoMensagem.txtMsg;
        if (textoExtra) {
            txtMsg += textoExtra;
        }
        $("<p></p>").append(txtMsg).appendTo(elementConteudo);
        //botoes
        var elementUl = $("<ul></ul>").appendTo(elementConteudo);
        var elementLi = $("<li></li>").appendTo(elementUl);
        $("<a></a>", {"href": "javascript:void(0);", "class": "closeMsg btnFecharMsg"}).append("Fechar").appendTo(elementLi);
        if (objetoMensagem.reload) {
            element.find(".closeMsg").click(function () { msg.reload(); });
        } else {
            element.find(".closeMsg").click(function () { msg.close(); });
        }
        element.addClass(objetoMensagem.estilo);
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
        if (this.onClose) {
            this.onClose();
        } else {
            this.esconder();
        }
    };

    this.reload = function () {
        if (this.onReload) {
            this.onReload();
            return;
        }
        this.recarregar();
    };

    this.recarregar = function () {
        window.location = window.location + "";
    };

    this.reposicionar = function (event) {
        var fundo = $(this.id + "_Fundo");
        fundo.css("top", $(window).scrollTop());
        fundo.css("left", $(window).scrollLeft());
    };
    
    this.focus = function () {
    };

    this.toString = function () {
        return "Mensagem - " + this.nome;
    };

    this.htmlTemplate = function (titulo, erro, msg, estilo) {
        return '<div class="' + (erro ? " erro " : " sucesso ") + (estilo ? estilo : "") + '">'
                + '<p id="mensagem" title="' + titulo + '">' + msg + '</p>' +
                '</div>';
    };

    this.init();
}

Mensagem.TemErro = function (dados) {
    if ($(dados).hasClass('erro')) {
        return true;
    }
    if ($(dados).hasClass("SEC025-11_erro")) {
        return true;
    }
    return false;
};
