/*
Deve conter apenas os componentes que serão comuns a todo o projeto.
*/
(function (P, $) {
    "use strict";

    P.add("avl_load", function () {
        var me = this;

        this.singletron = true;

        this.render = function ($e) {
            this.events.listener($e, "show", function () {
                $e.show();
            });
            this.events.listener($e, "hide", function () {
                $e.hide();
            });

            $(P.base).on('plungerReady', function(){
                $e.hide();
            });
        };

    });

    P.add("avl_msg", function () {
        var me = this;
        this.singletron = true;

        var template;
        var jsonErro;
        var legado;

        this.name = "avl_msg";
        //TODO: só permitir 1 elemento na tela
        this.render = function ($e) {

            $e.hide();
            template = $e.html();
            $e.html('');
            var strInesperado = me.param($e, 'inesperado');
            if (strInesperado) {
                jsonErro = me.param($e, 'inesperado');
            } else {
                jsonErro = { Mensagem: "" };
            }
            legado = me.param($e, 'legado');
            init();
        };



        function init() {
            P.ajaxHtmlErro = function (data) {
                return data.indexOf(me.name) >= 0;
            }

            P.onAjaxError = function (data) {
                var erro = jsonErro;
                if (data && typeof (data) == "string") {
                    aplicarHtml(data);
                    return
                } else if (data && typeof (data) == "object") {
                    erro = data.Mensagens ? data.Mensagens[0] : data;
                }

                aplicarTemplate(erro);
            }

        };

        function aplicarHtml(erroHtml) {
            if (callHtmlAntigo(erroHtml)) {
                return;
            }
            var content = $(erroHtml);
            me.context.html(content.html());
            if (content.data('acao') == 'Redirect') {
                showMsg(fecharReload);
            } else {
                showMsg(fecharClose);
            }

        };
        function aplicarTemplate(erroJson) {
            me.context.html('');
            $.tmpl(template, erroJson).appendTo(me.context);
            if (erroJson.Acao && erroJson.Acao == "Redirect") {
                showMsg(fecharReload);
            } else {
                showMsg(fecharClose);
            }
        };
        function callHtmlAntigo(erroHtml) {
            //TODO: esta parte do antigo deve ser "eliminada" com o tempo ou será alterada a medida que for ficando obsoleto
            var objLegado = $(erroHtml).find(legado);
            if (objLegado && objLegado.length > 0) {
                jsonErro.Mensagem = objLegado.get(0).innerHTML;
                if ($(erroHtml).hasClass('sessao')) {
                    jsonErro.Acao = "Redirect";
                }
                aplicarTemplate(jsonErro);
                return true;
            }
            return false;
        };


        function showMsg(acaoFechar) {

            me.context.show();

            me.context.find('[data-avl_msg-btn_close="true"]').click(function () {
                me.chain.remove(undefined, "chain_confirm");
                acaoFechar = acaoFechar || fecharClose;

                acaoFechar();
            });

            me.context.find('[data-avl_msg-btn_confirm="true"]').click(function () {
                me.chain.fire(undefined, "chain_confirm", function () {
                    me.context.hide();
                    me.context.html('');
                });
            });

        };

        var fecharClose = function () {
            me.context.hide();
            me.context.html('');
        };

        var fecharReload = function () {
            var url = window.location.href.toString();
            window.location = url;
        };
    });


})(PlungerJs, jQuery);


//toggle
(function (P, $) {
    "use strict";

    P.add("avl_toggle", function () {
        var me = this;

        var events = {
            hide: "hide",
            show: "show"
        };

        this.render = function ($e) {
            var status = me.aria($e, 'expanded');
            var target = me.target($e);
            if (!status) {
                target.hide();
                me.events.dispatch($e, events.hide);
            } else {
                target.show();
                me.events.dispatch($e, events.show);
            }
            $e.click(function () {
                _toggle($e);
            });
        };

        function _toggle($e) {
            var status = me.aria($e, 'expanded');
            var text = $e.text();
            var textNext = me.param($e, "text");

            var target = me.target($e);
            if (!status) {
                me.aria($e, 'expanded', true);
                target.show();
                me.events.dispatch($e, events.show);
            } else {
                me.aria($e, 'expanded', false);
                target.hide();
                me.events.dispatch($e, events.hide);
            }
            me.param($e, "text", text);
            $e.html(textNext);

        }

    });

})(PlungerJs, jQuery);


//dialogo
(function (P, $) {
    "use strict";

    P.add("avl_dlg", function () {
        var me = this;

        this.render = function ($e) {
            var dialogo = $e;
            this.events.listener($e, "open", function () {
                var box = dialogo.find(' > section');
                dialogo.show();
                box.css({'top':$(window).scrollTop()});

                me.events.dispatch($e, "open");
            });
            this.events.listener($e, "close", function () {
                dialogo.hide();
                me.events.dispatch($e, "close");
            });

            $e.find('[data-avl_dlg-btn_close="true"]').click(function () {
                dialogo.hide();
            });
        };


    });

})(PlungerJs, jQuery);




//dropdown
(function (P, $) {
    "use strict";

    P.add("avl_dropdown", function () {
        var me = this;

        this.render = function ($e) {
            
            $e.find('> button').click(function(){
                _toggle($e);
            });
            

        };

        function _toggle($e) {
            var close = function(evt){
                if(evt && $(evt.target).closest($e.find('> ul')).length > 0){
                    if($(evt.target).closest('[data-avl_dropdown-close="true"]').length <= 0){
                        return;
                    }
                }
                me.aria($e, 'expanded', false);
                target.hide();
                $(document).off('click',close);

            }
            var status = me.aria($e, 'expanded');

            var target = $e.find('> ul');

            if (!status) {
                me.aria($e, 'expanded', true);
                target.show();
                setTimeout(function(){$(document).on('click',close);}, 100);
            } else {
                close();
            }
            
        }
    });

})(PlungerJs, jQuery);

//varios uteis
(function (P, $) {
    "use strict";

    P.add("avl_checked_all", function () {
        
        var me = this;

        this.render = function($checkbox){
            $checkbox.change(function(){
                if($(this).is(':checked')){
                    me.element($checkbox, 'checkbox').attr('checked','checked');
                }else{
                    me.element($checkbox, 'checkbox').removeAttr('checked');
                }
            });
        };

    });

})(PlungerJs, jQuery);
