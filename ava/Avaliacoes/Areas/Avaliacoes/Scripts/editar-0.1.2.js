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

//dialogo
(function (P, $) {
    "use strict";

    P.add("avl_dlg_questao_prova", function () {
        var me = this;

        this.render = function ($e) {
            me.base.render($e);

            window.obj_refactor.AbriuSubPopup = function(parametros){
                var altura1 = $e.find(' > section > header').outerHeight();
                $e.find(' > section > header').prepend('<div class="templock" style="position:absolute; top: 0; left: 0; width: 100%; height: ' + altura1 + 'px ; background: rgba(150, 150, 150, .3);"></div>');
                var altura2 = $e.find(' > section > footer').outerHeight();
                $e.find(' > section > footer').prepend('<div class="templock" style="position:absolute; width: 100%; height: ' + altura2 + 'px ; background: rgba(50, 50, 50, .3); margin: -15px;"></div>');
            };
            window.obj_refactor.FechouSubPopup = function(parametros){
                $e.find(' > section > header div.templock').remove();
                $e.find(' > section > footer div.templock').remove();
            };
        };


    }, "avl_dlg");

})(PlungerJs, jQuery);