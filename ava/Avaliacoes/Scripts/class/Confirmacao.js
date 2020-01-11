function Confirm(oContainer, cBox) {
    var conf = this;
    this.version = "0.1";

    this.container = oContainer;
    this.cBox = cBox;
    this.box = "." + cBox;

    this.boxAutoCreate = false;

    this.open = false;

    this.init = function () {
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

    this.exibir = function (dados, acaoConfirm, acaoNao) {

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

        element.find(".btnConfirmNao").click(function () {
            if (acaoNao) {
                acaoNao();
            }
            conf.close();
        });

        element.find(".btnConfirmSim").click(function () {
            acaoConfirm();
            conf.close();
        });

        this.open = true;
    }

    this.close = function () {
        if (!this.open) {
            return;
        }
        this.esconder();
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

    this.focus = function () {
        $(document).scrollTop(0);
    }

    this.toString = function() {
        return "Confirm - " + this.nome;
    }

    this.init();
}