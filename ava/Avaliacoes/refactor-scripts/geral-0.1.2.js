/*
Neste script deverá conter as implementações que serão comuns a qualquer página do projeto
seja ela do cadastro, da listagem, de plugins, aplicador, aplicador offline....
*/
(function (P, $) {
    "use strict";

    //carregamento ajax da avaliação
    var avl_ajax = {

        ajaxHtmlErro: function (data) {
            return false;
        },
        sendError: function (call, data) {
            if (call) {
                call();
            }
            P.onAjaxError(data);
        },
        onAjaxError: function (data) { },
        onAjaxSuccess: function (data) { },
        onAjaxStart: function () { },
        onAjaxEnd: function () { },

        onError: function (data) {
            P.onAjaxError(data);
        },

        ajax: function (options) {
            var newOptions = options;
            P.onAjaxSuccess = options.success || P.onAjaxSuccess;

            var oldError = options.error;

            newOptions.error = function (jqXHR, textStatus, errorThrown) {
                console.log("P.ajax - error", arguments);
                if (textStatus == "parsererror") {
                    P.sendError(oldError, jqXHR.responseText);
                    return;
                }
                P.sendError(oldError);
            };

            newOptions.success = function (data) {
                var _data = data;
                if ((typeof (data) == "object" && (typeof (data["Sucesso"]) != "undefined" && !data["Sucesso"]))) {
                    console.log("P.ajax - error", data);
                    P.sendError(oldError, data);
                    return;
                }
                if (typeof (data) == "string") {
                    data = $(_data).find('body').length > 0 ? $(_data).find('body').html() : data;

                    if (P.ajaxHtmlErro(data)) {
                        console.log("P.ajax - error", data);
                        P.sendError(oldError, data);
                        return;
                    }
                }

                P.onAjaxSuccess(data);
            };

            $.ajax(newOptions);

        }
    };

    $.extend(P, avl_ajax);

    var uteis = {
        decimalConvert: function (value) {
            var posVirgula = value.lastIndexOf(',');
            if (posVirgula > -1) {
                value = value.substring(0, posVirgula) + '.' + value.substring(posVirgula + 1, value.length);
            }
            return parseFloat(value);
        },

        replace: function (text, find, replace) {
            return text.replace(new RegExp(find), replace);
        },

        tmpl: function (template, json) {
            if (!template) {
                return;
            }
            var atualizacoes = {
                checked: function (render) {

                    render.find('[data-tmpl-checked]').each(function (index, value) {
                        var valor = P.parse($(this).attr('data-tmpl-checked'));
                        var val = P.parse(value.value);

                        if (valor == val) {
                            $(this).attr('checked', 'checked');
                        } else {
                            $(this).removeAttr('checked');
                        }

                    });

                },
                selected: function (render) {
                    render.find('[data-tmpl-selected]').each(function (index, value) {
                        var valor = P.parse($(this).attr('data-tmpl-selected'));
                        $(this).val(valor);
                    });
                }
            };

            if (!json) {
                json = {};
            }

            var destino = undefined;
            var field = undefined;
            if (typeof (template) != "string") {
                destino = $(template.data('tmpl-target'));
                field = template.data('tmpl-field');
                template = template.html();
            }
            if (field) {
                json = json[field] || json;
            }
            if (json.push) {
                for (var i = 0, j = json.length; i < j; i++) {
                    json[i]["_indice"] = i;
                }
            }

            var render = $.tmpl(template, json);

            $.each(atualizacoes, function (name, value) {
                value(render);
            });
            if (destino) {
                P.html(destino, render);
            }
            return render;
        },
        ready: function () { 
            $(P.base).trigger("plungerReady");
        }
    };


    $.extend(P, uteis);

})(PlungerJs, jQuery);



/* comunicação com o legado */
(function (P, $) {
    "use strict";

    P.add("avl_load_widget", function () {
        var me = this;

        var count = 0, load = 0;
        this.render = function ($a) {
            count++;
            var id = $a.attr('id');
            var storage = $.jStorage.get(id, "");
            if($.trim(storage) != ""){
                $.jStorage.deleteKey(id)
                apply($a, storage, id);
                return;
            }
            
            $.ajax({
                url: $a.attr('href'),
                success: function (html) {
                    apply($a, html, id);
                }
            });
            
        };

        var apply = function($a, html, id){
            load++;
            $.jStorage.set(id, html);
            
            var conteudo = $(html);
            if (!conteudo.attr('id')){
                me.param(conteudo, 'id', id);
                conteudo.attr('id', id);
            }
            var event = $a.data('event-is_load');

            $a.replaceWith(conteudo);
            var $element = P.$('#' + id);
            
            if(event){
                $(P.base).trigger(event,[$element]);
            }

            $(P.base).trigger("plungerUpdate", [$element, true]);
            
            if(load >= count){
                P.ready();
            }
        }

    });

})(PlungerJs, jQuery);