(function ($, undefined) {
    $.widget("ui.mensagem", {
        options: undefined,

        _create: function () {
            if (this.options != undefined)
                this._refreshValue();
        },
        close: function () {
            this.element.hide();
            this.options.onClose();
        },

        destroy: function () {
            this.element.hide();
            this.element.removeClass(this.options.type);
            this.element.empty();
            $.Widget.prototype.destroy.apply(this, arguments);
        },

        _setOption: function (key, value) {
            if (key === "text") {
                this.options.text = value;
            } else if (key === "type") {
                this.options.type = value;
            } else if (key === "timeout") {
                this.options.timeout = value;
            } else if (key === "onClose") {
                this.options.onClose = value;
            } else if (key === "onUndo") {
                this.options.onUndo = value;
            } else {
                return;
            }
            $.Widget.prototype._setOption.apply(this, arguments);

            this._refreshValue();
        },

        _refreshValue: function () {
            var id = this.element.attr("id");
            var fechar = this.options.onClose;
            var desfazer = this.options.onUndo;
            var elemento = this.element;
            var esconder = function () {
                elemento.hide();
                fechar();
            }

            this.destroy();
            this.element.addClass(this.options.type);
            this.valueDiv = $("<p>" + this.options.text + "</p>").appendTo(this.element);

            if (this.options.onUndo != undefined) {
                $('<a></a>', {
                    "id": id + "desfazer",
                    "href": "javascript:void(0);",
                    "class": "desfazer"
                }).append("Desfazer").appendTo(this.element);
            }
            if (this.options.onClose != undefined) {
                $('<a></a>', {
                    "id": id + "fechar",
                    "href": "javascript:void(0);",
                    "class": "fechar"
                }).append("Fechar").appendTo(this.element);
            }

            $('#' + id + 'fechar').click(function () { esconder(); });
            $('#' + id + 'desfazer').click(function () { desfazer(); });
            $('#' + id).addClass(this.options.type);

            this.element.show();

            if (this.options.timeout != undefined) {
                setTimeout(function () { esconder(); }, this.options.timeout);
            }
        }
    });

    $.extend($.ui.mensagem, {
        version: "1.0.0"
    });

})(jQuery);