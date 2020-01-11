//para o grupo automatico
(function (P, $) {
    "use strict";

    P.add("avl_slc_cor", function () {
        var me = this;


        this.render = function ($e) {
            var name = $e.attr('name');
            var valor = $e.val();
            var button = '<button type="button">Selecione a cor</button>';
            var input = '<input name="' + name + '" type="text" value="' + valor + '" readonly="readonly" />';
            var lista = '<ul>';
            $e.find('option').each(function () {
                var cor = $(this).val();
                if (!$(this).attr('hidden')) {
                    lista += '<li><button type="button" value="' + cor + '" style="background:' + cor + '">' + cor + '</button></li>';
                }
            });
            lista += '</ul>';
            var selector = $('<section class="avl_slc_cor">' + button + input + lista + '</section>');

            $e.replaceWith(selector);
            var input = selector.find('input');
            input.css('background', valor);
            input.css('color', valor);
            selector.find(' > ul button').click(function () {
                input.val(this.value);
                input.css('background', this.value);
                input.css('color', this.value);
            });
            me.base.render(selector);

        };

    }, "avl_dropdown");

    P.add("avl_capa_grupo", function () {
        var me = this;

        this.render = function ($e) {
            var radio = me.element($e, 'capa');
            var elemento = $e;
            $e.hide();
            radio.change(function () {
                hideShow(elemento, $(this));
            }).each(function (index, value) {
                if ($(value).attr('checked') == "checked") {
                    hideShow(elemento, $(value));
                }
            });
        };

        var hideShow = function ($e, radio) {
            var valor = radio ? P.parse(radio.val()) : false;
            if (valor) {
                $e.show();
                me.events.dispatch($e, 'show');
            } else {
                $e.hide();
            }

        };

    });

})(PlungerJs, jQuery);