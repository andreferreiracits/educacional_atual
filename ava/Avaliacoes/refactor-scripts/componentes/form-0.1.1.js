
//form em model
(function (P, $) {
    "use strict";

    P.add("avl_formmodel", function () {
        var me = this;

        this.render = function ($e) {
            $e.find("input,textarea,select").each(function () {
                $(this).change(function () {
                    aplicar($(this));
                });
            });
            aplicarIni($e);


        };

        function aplicarIni($e) {
            var $campo, name, value, search,
            campos = $e.serializeArray();
            
            for (var i = 0, j = campos.length; i < j; i++) {
                name = campos[i]['name'];
                value = campos[i]['value'];
                search = '[name="' + name + '"]';
                $campo = $e.find(search);
                if ($campo.length > 1) {
                    search += value == '' ? '' : '[value="' + value + '"]';
                    $campo = $e.find(search);
                }

                aplicar($campo);
            }
        };

        function aplicar($formElement) {
            var value, viewvalue,
            name = $formElement.attr('name'),
            type = $formElement.attr('type');
            value = $formElement.val();
            viewvalue = $formElement.val();

            if (type == "radio") {
                viewvalue = $formElement.closest('label').text();
            }
            
            me.extra("view", name).html(viewvalue);
            me.extra("input", name).val(value).change();
        };




    });

})(PlungerJs, jQuery);

//form json
(function (P, $) {
    "use strict";

    P.add("avl_formjson", function () {
       
        var me = this;

        var events = {
            start: "start",
            end: "end"
        };

        var chain = {
            submit : "submit"
        }

        var chainDTO = 'avl_formjson_submit';

        var elementos = {
            auxiliar : "auxiliar"
        }

        var typeAction = {
           
            ajax : function(form, dataSend, jsonSend, dataLoad, endSubmit, postCallback){

                P.ajax({
                    url: form.attr("action"),
                    data: dataSend,
                    type: form.attr("method"),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (retornoJson) {
                        endSubmit(JSON.stringify(objetoCompleto(form)));
                        postCallback();
                    },
                    complete: function () {
                        me.events.dispatch(form, events.end);
                    }
                });
            },
            dto : function(form, dataSend, jsonSend, dataLoad, endSubmit, postCallback){
                me.chain.fire(form, "submit", function () {
                    endSubmit(JSON.stringify(dataSend));
                    postCallback();
                    me.events.dispatch(form, events.end);
                }, jsonSend);
            }
        };

        function objetoCompleto($e) {
            var principal = P.serializeObject($e);
            var entidade = me.param($e, "entidade");
            var auxiliares = me.element($e, elementos.auxiliar);
            for (var i = 0, j = auxiliares.length; i < j; i++) {
                $.extend(principal[entidade], P.serializeObject($(auxiliares[i]))[entidade]);
            }
            return principal;
        };

        this.render = function ($e) {
            var entidade = me.param($e, "entidade");

            var form = $e;
            
            var dataLoad = JSON.stringify(objetoCompleto(form));
            var postCallback = function () { };
            var jsonLoad = {};
            
            me.chain.add($e, "submit", function (next, dto) { next(); });

            me.events.listener($e, "reloadform", function(evt, dto){
                dataLoad = JSON.stringify(objetoCompleto($e));
                jsonLoad = $.extend(jsonLoad, dto);
            });

            $e.submit(function (evt) {
                var form = $e, type;
                var endSubmit = function(data){
                    dataLoad = data;
                    me.events.dispatch(form, 'end_submit');
                };
                evt.preventDefault();

                var jsonSend = objetoCompleto($e);
                var dataSend = JSON.stringify(jsonSend);

                if (dataLoad == dataSend) {
                    endSubmit(dataLoad);
                    postCallback();
                    return;
                }

                jsonSend[entidade] = $.extend(jsonLoad, jsonSend[entidade]);
                
                me.events.dispatch($e, events.start);

                type = me.param($e,'type') || 'ajax';

                if(typeAction[type]){
                    typeAction[type](form, dataSend, jsonSend, dataLoad, endSubmit, postCallback);
                }

            });

            me.chain.add($e, chain.submit, function (next) {
                
                postCallback = next;
                $e.submit();
            });


            function updateForm(json, prefixo) {
                
                if (typeof (json) == "object") {
                    
                    $.each(json, function (name, value) {
                        var n_prefix;
                        if (prefixo) {
                            n_prefix = prefixo + "[" + name + "]";
                        } else {
                            n_prefix = name;
                        }
                        updateForm(value, n_prefix);
                    });

                } else if (typeof (json) == "array") {
                    for (var i = 0, j = json.length; i < j; i++) {
                        updateForm(json[i], prefixo += "[" + i + "]");
                    }
                } else {
                    P.$('[name="' + prefixo + '"]').val(json);
                }

            };

            //resolve problema do botão que fica fora do formulário
            var idForm = $e.attr('id');
            if(idForm){
                P.$('button[type="submit"][form="' + idForm + '"]').click(function(evt){
                    evt.preventDefault();
                    $e.submit();
                });
            }
        };

    });

})(PlungerJs, jQuery);


(function (P, $) {
    "use strict";

    P.add("avl_formtmpl", function () {
        var me = this;

        this.render = function ($e) {

            var template = $e.html();
            
            var element = $e;
            me.events.listener($e, 'applytmpl', function(evt, dto){
                P.html(element, P.tmpl(template, dto));
                me.events.dispatch($e, 'endapplytmpl', dto);
            });
            
        };

    });

})(PlungerJs, jQuery);
