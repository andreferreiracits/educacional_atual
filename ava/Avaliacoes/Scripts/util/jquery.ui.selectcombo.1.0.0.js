(function ($, undefined) {
    $.widget("ui.selectcombo", {
        options: undefined,
        container: undefined,
        fechado: true,
        _create: function () {
            if (this.options != undefined)
                this._refreshValue();
        },

        destroy: function () { },

        _setOption: function (key, value) {
            /*if (key === "onClose") {
            this.options.onClose = value;
            } else if (key === "onExecute") {
            this.options.onExecute = value;
            } else if (key === "onOpen") {
            this.options.onOpen = value;
            } else {
            return;
            }*/
            $.Widget.prototype._setOption.apply(this, arguments);
        },

        _refreshValue: function () {
            var $this = this;
            var elemento = this.element;
            elemento.hide();

            this.container = $('<div class="selectClassificacao slc"></div>');
            var link = $('<a class="nome tituloSelectClassificacao"></a>');
            var conteudo = $('<div class="opcoes arvoreSelectClassificacao"><ul class="arvore"></ul></div>');
            this.container.append(link);
            this.container.append(conteudo);
            conteudo.hide();

            elemento.after(this.container);

            this._nomeSelecionado();
            //montar as opções dentro do conteúdo
            elemento.find('option').each(function () {
                var item = $('<li class="no">' + $(this).text() + '</li>');
                var valor = $('<input type="hidden" name="comboValor" value="' + $(this).val() + '" />')
                item.append(valor);
                conteudo.find('ul').append(item)

                item.click(function () {
                    $this._selecionarItem($(this));
                });
            });
            $(this.container).combo({
                onOpen: function () {
                    $this.fechado = false;
                },
                onClose: function () {
                    $this.fechado = true;
                }

            });
            elemento.change(function () {
                $this._nomeSelecionado();
                //alert('selecionou');
            });
            $(document).mousedown(function (e) {
                if (!$this.fechado) {
                    if ($(e.target).closest($this.container.find('a.nome')).length > 0) {
                        return;
                    }
                    if ($(e.target).closest($this.container.find('div.opcoes')).length > 0) {
                        return;
                    }
                    $this.container.find('a.nome').click();
                }

            })
        },

        _selecionarItem: function (item) {
            this.container.find('li').removeClass('selecionado');
            var valor = item.find('> input[name="comboValor"]').val();
            //alert(this.element.find('option[value="' + valor + '"]').text());
            //this.element.find('option[value="' + valor + '"]').click();
            this.element.val(valor);
            item.addClass('selecionado');
            this.container.find('a.nome').click();
            this.element.change();
            //this._nomeSelecionado();
        },
        _nomeSelecionado: function () {
            var valor = this.element.val();
            var texto = this.element.find('option[value="' + valor + '"]').text();
            this.container.find('a.nome').html(texto)
        }
    });

    $.extend($.ui.selectcombo, {
        version: "1.0.0"
    });

})(jQuery);


