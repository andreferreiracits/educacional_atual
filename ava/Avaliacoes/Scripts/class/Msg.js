function Mensagem(oContainer, cBox) {

    
    var msg = this;
    this.version = "0.1";

    this.container = oContainer;
    this.cBox = cBox;
    this.box = "." + cBox;

    this.open = false;

    this.boxAutoCreate = false;

    this.init = function () {
        //this.create();
        this.container.find(this.box).hide();
    }

    this.create = function () {
        if (this.container.find(this.box).length > 0) {
            return;
        }
        var div = '<div class="mensagem comBotao ' + this.cBox + '"></div>';
        this.boxAutoCreate = true;
        this.container.prepend(div);

    }
    this.exibir = function (dados, timeout) {
        //se for erro não apresenta o timeout
        /*if (dados.attr('class').indexOf("erro") <= -1) {
            timeout = (timeout == undefined) ? 5000 : timeout;
        }*/

        this.create();

        var element = this.container.find(this.box);

        element.html('');

        $("<p>" + dados.html() + "</p>").appendTo(element)
        $('<a></a>', {
            "href": "javascript:void(0);",
            "class": "fechar"
        }).append("Fechar").appendTo(element);

        element.find('.fechar').click(function () { msg.esconder(); });

        element.addClass(dados.attr('class'));

        element.show();

        this.open = true;
    }

    this.esconder = function () {
        var element = this.container.find(this.box);
        this.open = false
        if (this.boxAutoCreate) {
            element.remove()
            this.boxAutoCreate = false;
            return;
        }
        element.html('');
        element.hide();
    }

    this.close = function () {
        if (!this.open) {
            return;
        }
        this.esconder();
    }

    this.focus = function () {
        $(document).scrollTop(0);
    }

    this.toString = function() {
        return "Mensagem - " + this.nome;
    }

    this.htmlTemplate = function (erro, msg, estilo) {
        return '<div id="mensagem" class="' + (erro ? " erro ":" sucesso ") + (estilo ? estilo: "") + '">' + msg + '</div>';
    }

    this.init();
}