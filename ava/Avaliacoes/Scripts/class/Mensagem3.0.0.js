function Mensagem(sId) {

    var msg = this;
    this.version = "3.0.0";

    this.id = '#' + sId;
    this.nome = sId;

    this.open = false;

    this.onClose = undefined;
    this.onReload = undefined;

    this.tituloPadrao = "Mensagem";

    this.init = function () {

        this.create();

        $(this.id + "_Fundo").hide();

    }

    this.create = function () {

        if ($(this.id + "_Fundo").length > 0) {
            return;
        }

        fundo = $('<div></div>').attr({
            'id': this.nome + "_Fundo",
            'class': "opacidadeLoadingBox"
        });

        var boxMsg = $(this.id);

        if (boxMsg.length <= 0) {
            boxMsg = $('<div></div>').attr({ 'id': this.nome }).addClass('mensagem');
        } else {
            $(this.id).remove();
        }
        
        fundo.append(boxMsg);


        $('body').append(fundo);

        this.reposicionar();
        $(window).scroll(function () { msg.reposicionar(); });
    }

    this.exibir = function (dados, textoExtra) {
        var container = $(this.id + "_Fundo");

        var element = container.find(this.id);


        var titulo = $(dados).find("p#mensagem").attr('title');
        if (!titulo || titulo == "") {
            titulo = this.tituloPadrao;
        }


        element.html('');

        //titulo
        var elementTitulo = $("<h1></h1>").appendTo(element);
        $("<p>" + titulo + "</p>").appendTo(elementTitulo)
        $('<a></a>', {
            "href": "javascript:void(0);",
            "class": "fechar closeMsg"
        }).append("Fechar").appendTo(elementTitulo);

        //conteudo
        var elementConteudo = $("<div></div>", {
            "class": "interno"
        }).appendTo(element);

        $("<div></div>", {
            "class": "icone"
        }).appendTo(elementConteudo);

        var txtMsg = $(dados).find("p#mensagem").html();
        if (textoExtra) {
            txtMsg += textoExtra;
        }
        $("<p></p>").append(txtMsg).appendTo(elementConteudo);


        //botoes
        var elementUl = $("<ul></ul>").appendTo(elementConteudo);
        var elementLi = $("<li></li>").appendTo(elementUl);
        $('<a></a>', {
            "href": "javascript:void(0);",
            "class": "closeMsg btnFecharMsg"
        }).append("Fechar").appendTo(elementLi);


        if ($(dados).hasClass("sessao")) {
            element.find('.closeMsg').click(function () { msg.reload(); });
        } else {
            element.find('.closeMsg').click(function () { msg.close(); });
        }

        element.addClass($(dados).attr('class'));


        container.show();



        this.open = true;

    }


    this.esconder = function () {
        var container = $(this.id + "_Fundo");
        var element = container.find(this.id);

        this.open = false
        element.html('');

        container.hide();

    }

    this.close = function () {
        if (!this.open) {
            return;
        }
        if (this.onClose) {
            this.onClose();
        } else {
            this.esconder();
        }
    }

    this.reload = function () {
        if (this.onReload) {
            this.onReload();
            return;
        }
        this.recarregar();
    }

    this.recarregar = function () {
        var pgAtual = window.location + "";
        window.location = pgAtual;
    }
    this.reposicionar = function (event) {
        var fundo = $(this.id + "_Fundo");
        var cima = $(window).scrollTop();
        var esquerda = $(window).scrollLeft();

        fundo.css('top', cima);
        fundo.css('left', esquerda);
    }
    this.focus = function () {
    }

    this.toString = function () {
        return "Mensagem - " + this.nome;
    }

    this.htmlTemplate = function (titulo, erro, msg, estilo) {
        return '<div class="' + (erro ? " erro " : " sucesso ") + (estilo ? estilo : "") + '">'
                + '<p id="mensagem" title="' + titulo + '">' + msg + '</p>' +
                '</div>';
    }

    this.init();
}