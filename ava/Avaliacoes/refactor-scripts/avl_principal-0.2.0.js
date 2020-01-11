/*
Comum apenas a ferramenta de avaliações.
Não será aplicada ao portal
*/
(function (P, $) {
    "use strict";

    P.add("avl_view_geral", function () {
        var me = this;

        this.init = function () {
            P.$("#avl_menu a:contains('Home')").addClass('abaHome');
        }
    });

    P.add("avl_redirect_tour", function () {
        var me = this;

        this.click = function ($e) {

            var date = new Date();
            date.setTime(date.getTime() + (10 * 60 * 1000));
            var objeto = me.param($e, 'start_json');

            var valor = "; expires=" + date.toUTCString() + ";path=/";
            document.cookie = "tourView=1" + valor;
            document.cookie = "tourRef=" + JSON.stringify(objeto) + valor;
            var destino = me.param($e, 'start_url');
            window.location = destino;
        }
    });

    P.add("avl_auto_link", function () {
        var me = this;
        this.render = function ($e) {
            var link = $e.attr('href');
            me.events.listener($e, "event", function () {
                open(link);
            });

            var auto = me.param($e, "auto");
            if (auto) {
                open(link);
            }

            function open(link) {
                me.events.dispatch($e, "pre");
                window.location.href = link;
            }
        }
    });

    P.add("avl_action", function () {
        var me = this;
        this.click = function ($e) {
            var data = me.param($e, 'data');

            me.events.dispatch($e, 'click', data);
        }
    });

    P.add("avl_action_confirm", function () {
        var me = this;
        this.click = function ($e) {
            var data = me.base.param($e, 'data'),
                confirm = { 'Tipo': 'Confirm', 'Mensagem': me.param($e, 'msg') };

            me.chain.add($e, "confirm", function (next) {
                me.base.events.dispatch($e, 'click', data);
                next();
            });

            P.onError(confirm);

        }
    }, "avl_action");

    P.add("avl_wakeup", function () {
        var me = this;
        this.singletron = true;
        this.render = function ($e) {

            var link = $e.attr('href');
            var tempo = me.param($e, 'min');

            tempo = tempo || 10;

            $e.remove();

            var onClick = false;

            $('body').mousedown(function () {
                onClick = true;
            });

            function wakeupSessao() {
                if (onClick) {
                    onClick = false;
                    $.ajax({
                        url: link,
                        type: "GET",
                        cache: false
                    });
                }
            }
            setInterval(wakeupSessao, tempo * (60 * 1000));
        }
    });

    P.add("avl_popup", function () {
        var me = this;
        this.click = function ($e) {
            var link = $e.attr('href');
            var settings = me.param($e, 'setting');
            var target = $e.attr('target');
            var janela = window.open(link, target, settings.toString());
            janela.focus();
        }
    });

    P.add("avl_total", function () {
        var me = this;

        this.render = function ($e) {

            var element = $e;

            apply($e);

            me.events.listener(element, 'refresh', function () {
                apply(element);
            });
        };

        function apply($e) {
            var element = $e;
            var type = me.param(element, 'type');
            if (types[type]) {
                types[type](element);
            }
        };

        var sumElements = function (elementos) {
            var total = 0;
            elementos.each(function (i, e) {
                total += P.decimalConvert(e.value);
            });
            return total;
        };

        var types = {
            sum: function ($e) {
                var elementos = select($e);
                $e.text(sumElements(elementos));
                var change = function (evt) {
                    setValue($e, sumElements(elementos));
                };
                elementos.off('change', change);
                elementos.on('change', change);
            },

            count: function ($e) {
                var elementos = select($e);
                setValue($e, elementos.length);
            }
        };

        var select = function ($e) {
            var param = me.param($e, 'select');
            return P.$(param);
        };

        var setValue = function ($e, valor) {
            $e.text(valor);
            me.param($e, "value", valor);
        };

    });


})(PlungerJs, jQuery);


/* inputs */

(function (P, $) {
    "use strict";


    P.add("avl_pattern", function () {
        
        var me = this;

        this.render = function($e){

            var pattern = $e.attr('pattern');
            var regexp = new RegExp(pattern);
            var padrao = $e.attr('placeholder');
            var type = me.param($e, 'type');

            var pre = $e.val();

            $e.blur(function(evt){

                if(!regexp.test($(this).val())){
                    $(this).val(padrao);
                }

                blurType[type]($(this));

                pre = $(this).val();

                $(this).change();

            }).keypress(function(evt){

                return keydownType[type](evt);

            }).keyup(function(evt){

                return upType[type](evt);

            }).keydown(function(evt){
                if (event.which == 13) {
                    $(this).blur();
                }
            });
            

            var blurType = {
                number : function($e){
                    
                    var min = $e.attr('min');
                    var max = $e.attr('max');

                    var valor = P.parse($e.val());
                    
                    if(min && valor && valor < min){
                        $e.val(min);
                        return;
                    }
                    if(max && valor && valor > max){
                        $e.val(max);
                        return;
                    }
                },
                decimal : function($e){
                    blurType.number($e);
                }
            }

            var upType = {
                number: function(evt){
                    var element = $(evt.target);
                    var value = element.val();
                    var retorno = regexp.test(value);
                    var max = P.parse($e.attr('max'));
                    var min = P.parse($e.attr('min'));
                    if(!retorno || (max && max < P.parse(value)) || (min && min > P.parse(value))){
                        element.val(pre);
                    }
                    pre = element.val();
                    return retorno;
                },
                decimal: function(evt){
                    var element = $(evt.target);
                    var value = element.val();
                    var retorno = regexp.test(value);
                    var max = P.parse($e.attr('max'));
                    var min = P.parse($e.attr('min'));

                    if(!retorno){
                        var posPonto = value.indexOf('.');
                        posPonto = posPonto > -1 ? posPonto : value.indexOf(',');
                        if(value.length > 1 && posPonto > -1 && posPonto + 1 == value.length){
                            retorno = true;
                        }
                    }
                    if(!retorno || (max && max < P.parse(value)) || (min && min > P.parse(value))){
                        element.val(pre);
                    }
                    pre = element.val();
                    return retorno;
                }
            }
            var keydownType = {
                number : function(evt){
                    var value = String.fromCharCode(evt.charCode);
                    var retorno = (/[0-9]/).test(value);
                    return retorno;
                },
                decimal : function(evt){
                    var value = String.fromCharCode(evt.charCode);
                    var retorno = (/[0-9,]/).test(value);
                    return retorno;
                }
            }
            
        };


    });


})(PlungerJs, jQuery);

/* comunicação com o legado */
(function (P, $) {
    "use strict";


    P.add("avl_refator_old", function () {
        var me = this;

        var frameProvider = function(frame, scrolling){
            var _me = this;
            this.frame = frame || $('<iframe frameborder="0" allowtransparency="yes" scrolling="' + (scrolling || "no" )+ '"></frame>');

            this.win = function(){
                return _me.frame[0].contentWindow;  
            };

            this.doc = function(){
                return _me.win().document;  
            };

            this.body = function(){
                return $('body', _me.doc());
            };


        };

        var apply = function($a, dto){

            var load = me.param($a, 'loaded');

            if (load) {
                return;
            }

            var url = $a.attr('href'),
                preload = me.param($a, 'img_load'),
                frame = new frameProvider(undefined, me.param($a,'scrolling')),
                target = me.target($a);

            setTimeout(function () {
                frame.body().html('<p style="text-align:center;"><img src="' + preload + '"/></p>');
                frame.frame.attr('src', url);
            }, 1);

            target.html(frame.frame);
            me.param($a, 'loaded', true);

            me.chain.add($a, 'get-data', function (next) {
                if (frame.win().avl_refator_old_get_data) {
                    var dto = frame.win().avl_refator_old_get_data();
                    next(dto);
                }
            });

            return frame;
        };


        this.render = function($a){
            
            var frame, load;

            me.events.listener($a, 'render', function(evt, dto){

                load = me.param($a, 'loaded');
                
                if(!load){
                    frame = apply($a, dto);
                    frame.frame.load(function() {
                        if(frame.win().avl_refator_old_set_data){
                            frame.win().avl_refator_old_set_data(dto);
                        }
                        frame.win().avl_refator_erro = function(erro){
                            P.onAjaxError(erro);
                        };
                    });
                }else{
                    if(frame.win().avl_refator_old_set_data){
                        frame.win().avl_refator_old_set_data(dto);
                    }
                    if(frame.win().avl_refator_old_refresh){
                        frame.win().avl_refator_old_refresh();
                    }
                }

            });

            $a.hide();
        };

        this.click = function ($a) {
            apply($a);
        };

    });

    P.add("avl_refator_old_com", function () {
        var me = this;

        this.click = function ($a) {
            me.chain.fire($a, 'get-data', function (data) {

                me.chain.fire($a, 'send_data', function () {
                    me.events.dispatch($a, 'end_com');
                }, data);
            });


        };


    });

})(PlungerJs, jQuery);