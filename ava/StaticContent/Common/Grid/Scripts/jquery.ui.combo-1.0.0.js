(function ($, undefined) {
    $.widget("ui.combo", {
        options: undefined,

        _create: function () {
            if (this.options != undefined)
                this._refreshValue();
        },

        destroy: function () { },

        _setOption: function (key, value) {
            if (key === "onClose") {
                this.options.onClose = value;
            } else if (key === "onExecute") {
                this.options.onExecute = value;
            } else if (key === "onOpen") {
                this.options.onOpen = value;
            } else {
                return;
            }
            $.Widget.prototype._setOption.apply(this, arguments);
        },

        _refreshValue: function () {
            var id = this.element.attr("id");
            var elemento = this.element;
            var link = $('> a.nome', elemento);
            var caixa = $('> div.opcoes', elemento);

            var abrir = this.options.onOpen;
            var executar = this.options.onExecute;
            var fechar = this.options.onClose;

            this.destroy();

            caixa.hide();

            link.click(function () {
                if (caixa.css("display") == "block") {
                    $(this).removeClass("selecionado");
                    if (fechar)
                        fechar();
                } else {
                    $(this).addClass("selecionado");
                    if (abrir)
                        abrir();
                }
                caixa.toggle();
            });

            if (this.options.onExecute != undefined) {
                $('.executar', caixa).click(function () {
                    objeto = $(this);

                    link.removeClass("selecionado");

                    if (caixa.css("display") == "block") {
                        if (executar)
                            executar();
                    }
                    if (fechar)
                        fechar();
                    caixa.hide();
                });
            }

            if (this.options.onClose != undefined) {
                $('.fechar', caixa).click(function () {
                    objeto = $(this);

                    link.removeClass("selecionado");
                    
                    objeto.attr('href', "javascript:void(0)");
                    
                    if (caixa.css("display") == "block") {
                        if (fechar)
                            fechar();
                    }
                    caixa.hide();
                });
            }
        }
    });

    $.extend($.ui.combo, {
        version: "1.0.1"
    });

})(jQuery);