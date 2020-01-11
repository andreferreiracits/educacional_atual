//gerais
(function (P, $) {
    "use strict";

    var avl_geral_ini = new (function () {
        var me = this;

        this.name = "avl_geral_ini";

        this.init = function () {
            
        }
    })();

    var comp_call = {};

    $.extend(P, {
        avl_callbacks: function (id) {
            var callbacks, component = id && comp_call[id];
            if (!component) {
                callbacks = $.Callbacks();
                component = {
                    fire: function (nextAction, component, element) {
                        callbacks.fire(nextAction, component, element);
                    },
                    add: function (call) {
                        callbacks.empty();
                        callbacks.add(call);
                    },
                    remove: callbacks.remove
                };
                if (id) {
                    comp_call[id] = component;
                }
            }
            return component;
        }
    })

    //funcoes uteis
    $.extend(P,{
        parseJsonParam : function(valor){
            //substituir as apas simples por duplas
            valor = valor.replace(/\'/g, "\"");
            return $.parseJSON(valor);
        }
    });

    //carregamento ajax da avaliação
    $.extend(P, {

        ajaxHtmlErro: function (data) {
            return false;
        },

        onAjaxError: function (data) { },
        onAjaxSuccess: function (data) { },
        onAjaxStart: function () { },
        onAjaxEnd: function () { },

        ajax: function (options) {

            var newOptions = options;
            P.onAjaxError = options.error || P.onAjaxError;
            P.onAjaxSuccess = options.success || P.onAjaxSuccess;

            newOptions.error = function () {
                P.onAjaxError();
            };

            newOptions.success = function (data) {
                
                if ((typeof (data) == "object" && !data["Sucesso"])) {
                    P.onAjaxError(data);
                    return;
                }
                if (typeof (data) == "string") {
                    var data = $(_data).find('body').length > 0 ? $(_data).find('body').html() : data;

                    if (P.ajaxHtmlErro(data)) {
                        
                        P.onAjaxError(data);
                        return;
                    }
                }

                P.onAjaxSuccess(data);
            };

            $.ajax(newOptions);

        }
    });

    P.extend(avl_geral_ini);

})(PlungerJs, jQuery);

//widget geral
(function (P, $) {
    "use strict";

    var avl_load = new (function () {
        var me = this;
        var element; //TODO: garantir que tenha apenas 1 elemento deste

        this.name = "avl_load";

        this.render = function ($e) {
            $e.hide();
            element = $e;
            _init();
        };

        function _init(){
            
            $(P.base).on("avl_load-show", function (evt) {
                element.show();
			});
            
            $(P.base).on("avl_load-hide", function (evt) {
                element.hide();
			});
            
        };

    })();

    var avl_msg = new (function () {
        var me = this;
        var element;
        var template;
        var jsonErro;

        this.name = "avl_msg";
        //TODO: só permitir 1 elemento na tela
        this.render = function ($e) {
            $e.hide();
            element = $e;
            template = $e.find('script[type="text/x-jquery-tmpl"]').html();
            jsonErro = P.parseJsonParam(me.param($e, 'inesperado'));
            init();
        };

       

        function init() {
            P.ajaxHtmlErro = function(data){
                
                return data.indexOf(me.name) >= 0;
            }

            P.onAjaxError = function(data){
                var erro = jsonErro;
                if(data && typeof (data) == "string"){
                    aplicarHtml(data);
                    return
                }else if(data && typeof (data) == "object"){
                    erro = data;
                }

                aplicarTemplate(erro);
            }
        };

        function aplicarHtml(erroHtml){
            
            element.html(erroHtml);
            showMsg();
        }
        function aplicarTemplate(erroJson){
            element.html('');
            $.tmpl( template, erroJson ).appendTo(element);
            showMsg();
        }

        function showMsg(){
            element.show();
            element.find('[data-avl_msg-btn_close="true"]').click(function(){
                element.hide();
            });
        }

    })();

    P.extend(avl_load, avl_msg);

})(PlungerJs, jQuery);

//menu passos
(function (P, $) {
    "use strict";

    var avl_stps = new (function () {
        var me = this;

        this.name = "avl_stps";

        var eventPre = "avl_stps_preopen";
        var eventPos = "avl_stps_postopen";

        function _init(){
            P.avl_callbacks(eventPre).add(preCallback);
            P.avl_callbacks(eventPos).add(posCallback);
        };
        function preCallback(next){
            if(next){
                next();
            }
        };
        function posCallback(){
        };

        this.render = function ($ul) {
            _init();
            _link($ul);
            _hide($ul);
        };

        this.click = function ($a) {
            var link = $a.attr('href');
            var ul = me.param($a, "menu");
            _selectStep(P.$(ul).find('a[href="' + link + '"]'));
        };


        function _hide($ul) {
            var $ativo;
            $ul.find('li > a').each(function () {
                var strTarget = $(this).attr('href')
                var target = P.$(strTarget);
                if (!_selected($(this))) {
                    $ativo = $(this);
                    target.hide();
                } else {
                    target.show();
                }
            });

            P.avl_callbacks(eventPos).fire(function(){}, me, $ul);
        };

        function _link($ul) {
            $ul.find('a').each(function () {
                $(this).click(function (evt) {
                    _selectStep($(this));
                    evt.preventDefault();
                });
            });
        };

        function _selected($a) {
            return $a.attr('aria-selected') || false;
        };


        function _selectStep($ativo) {
            var $ul = $ativo.closest('ul');
            function _preNext(){
                $ul.find('a').removeAttr('aria-selected')
                $ativo.attr("aria-selected", "true");
                _hide($ul);
            }
            P.avl_callbacks(eventPre).fire(_preNext, me, $ul);
            
        };

        

    })();

    P.extend(avl_stps);

})(PlungerJs, jQuery);

//form em model
(function (P, $) {
    "use strict";

    var avl_formmodel = new (function () {
        var me = this;

        this.name = "avl_formmodel";

        this.render = function ($e) {
            $e.find("input,textarea,select").each(function () {
                aplicarConteudo($(this));
                $(this).change(function () {
                    aplicarConteudo($(this));
                });
            });

        };

        function aplicarConteudo($formElement) {
            var name = $formElement.attr('name');
            var value = $formElement.val();
            var type = $formElement.attr('type');
            if (type == "radio") {
                value = $formElement.closest('label').text();
            }

            P.$('[data-avl_formmodel-view="' + name + '"]').html(value);
        };

    })();

    P.extend(avl_formmodel);

})(PlungerJs, jQuery);

//form json
(function (P, $) {
    "use strict";

    var avl_formjson = new (function () {
        var me = this;

        this.name = "avl_formjson";

        function formAuxiliares($e){
            var listForms = [];
            var strListForms = me.param($e, "aux") || "";

            if($.trim(strListForms) != ""){
                var list = strListForms.split(",");
                for(var i=0, j=list.length; i<j; i++){
                    listForms.push(P.$(list[i]));
                }
            }

            return listForms;
        }

        function objetoCompleto($e){
            var entidade = me.param($e, "ent");
            var principal = $e.serializeObject();

            var auxiliares = formAuxiliares($e);
            
            for(var i=0, j=auxiliares.length; i<j; i++){
                $.extend(principal[entidade], auxiliares[i].serializeObject()[entidade]);
            }

            return principal;
        }

        this.render = function ($e) {
            var dataLoad = JSON.stringify(objetoCompleto($e));
            var postCallback = function(){};

            $e.submit(function (evt) {
                var form = $e;

                evt.preventDefault();

                var dataSend = JSON.stringify(objetoCompleto($e));

                if (dataLoad == dataSend) {
                    postCallback();
                    return;
                }
                var eventStart = me.param($e,"event_start");
                if(eventStart){
                    PlungerJs.base.trigger(eventStart);
                }
                P.ajax({
                    url: form.attr("action"),
                    data: dataSend,
                    type: form.attr("method"),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (dados, status, xhttp) {
                        
                        dataLoad = JSON.stringify(objetoCompleto($e));

                       /* updateForm($.parseJSON(dados));

                        dataLoad = JSON.stringify($e.serializeObject());

                        if (loader) {
                            $(loader).hide();
                        }*/

                    },
                    complete:function(){
                        var eventEnd = me.param($e,"event_end");
                        if(eventEnd){
                            PlungerJs.base.trigger(eventEnd);
                        }
                    }
                });

            });

            var callback = me.param($e, "callback");
            if(callback){
                P.avl_callbacks(callback).add(function(next){
                    postCallback = next;
                    $e.submit();
                });
            }

            function updateForm(json, prefixo) {

                if (typeof (json) == "object") {

                    $.each(json, function (name, value) {
                        if (prefixo) {
                            prefixo += "[" + name + "]";
                        } else {
                            prefixo = name;
                        }
                        updateForm(value, prefixo);
                    });

                } else if (typeof (json) == "array") {
                    //TODO: problema quando passar o array sem a posição
                    for (var i = 0, j = json.length; i < j; i++) {
                        updateForm(json[i], prefixo += "[" + i + "]");
                    }
                } else {
                    P.$('[name="' + prefixo + '"]').val(json);
                }



            }
        };

        (function ($) {
            //http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
            $.fn.serializeObject = function () {

                var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push": /^$/,
                "fixed": /^\d+$/,
                "named": /^[a-zA-Z0-9_]+$/
            };


                this.build = function (base, key, value) {
                    base[key] = value;
                    return base;
                };

                this.push_counter = function (key) {
                    if (push_counters[key] === undefined) {
                        push_counters[key] = 0;
                    }
                    return push_counters[key]++;
                };

                $.each($(this).serializeArray(), function () {

                    // skip invalid keys
                    if (!patterns.validate.test(this.name)) {
                        return;
                    }
                    //TODO: converter o númerico quando for decimal
                    var k,
                    keys = this.name.match(patterns.key),
                    merge = isNaN(this.value) ? this.value : parseFloat(this.value),
                    reverse_key = this.name;

                    while ((k = keys.pop()) !== undefined) {

                        // adjust reverse_key
                        reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                        // push
                        if (k.match(patterns.push)) {
                            merge = self.build([], self.push_counter(reverse_key), merge);
                        }

                        // fixed
                        else if (k.match(patterns.fixed)) {
                            merge = self.build([], k, merge);
                        }

                        // named
                        else if (k.match(patterns.named)) {
                            merge = self.build({}, k, merge);
                        }
                    }

                    json = $.extend(true, json, merge);
                });

                return json;
            };
        })(jQuery);

    })();

    P.extend(avl_formjson);

})(PlungerJs, jQuery);

//toggle
(function (P, $) {
    "use strict";

    var avl_toggle = new (function () {
        var me = this;

        var eventHide = "avl_ev_toogle_hide";
        var eventShow = "avl_ev_toogle_show";

        this.name = "avl_toggle";

        
        this.render = function ($e) {
            var status = $e.attr('aria-expanded') == "true";
            var target = me.target($e);

            if (!status) {
                target.hide();
                P.base.trigger(eventHide);
            } else {
                target.show();
                P.base.trigger(eventShow);
            }
            $e.click(function(){
                _toggle($e);
            });
        };

        function _toggle($e) {
            var status = $e.attr('aria-expanded') == "true";
            var text = $e.text();
            var textNext = me.param($e, "text");

            var target = me.target($e);
            if (!status) {
                $e.attr('aria-expanded','true');
                target.show();
                P.base.trigger(eventShow);
            } else {
                $e.attr('aria-expanded','false');
                target.hide();
                P.base.trigger(eventHide);
            }
            me.param($e, "text", text);
            $e.html(textNext);

        }


    })();

    P.extend(avl_toggle);

})(PlungerJs, jQuery);


//exclusivos para visualização
(function (P, $) {
    "use strict";

    var avl_view_geral = new (function () {
        var me = this;

        this.name = "avl_view_geral";

        this.init = function () {
            P.$("#avl_menu a:contains('Home')").addClass('abaHome');
        }
    })();

    P.extend(avl_view_geral);

})(PlungerJs, jQuery);


//para o tyne
(function (P, $) {
    "use strict";
    
    var avl_tiny_old = new (function () {
        var me = this;

        this.name = "avl_tiny_old";

        this.render = function ($e) {
            var eventPre = me.param($e, 'render_post_event');
            if(eventPre){
                $(document).on(eventPre, $e, function (evt) {
                    setTimeout(function(){
                        
                        _render($e);
                    }, 100);
				    
			    });
            }else{
                _render($e);
            }

        };
        /*render_post_event*/
        function _render($e){
            var element = $e;
            var maxChar = $e.attr('maxlength');
            var contaChar = {};
            if(maxChar){
                contaChar = { htmlcharcount_maxchars: (parseInt(maxChar, 10) > 0 ? maxChar : undefined) };
            }
            var nameFormat = me.param($e, 'format');
            var format = {};

            if(format){
                var strFormat = P.$('script[type="text/avl_tiny_old_format"][data-avl_tiny_old-format_name="' + nameFormat + '"]').text();
                format = P.parseJsonParam($.trim(strFormat));
            }

            var tipoUpload = me.param($e, 'upload');

            var popupImagem;
            if(tipoUpload == "debug"){
                
                var pathUploadDebug = me.param($e, 'upload_debug_path');
                

                format = $.extend({}, format,
                {
                    file_browser_callback: function(field, url, type, win){
                        popupImagem = { 'field': field, 'win': win };
                        window.carregarCaminhoImagem = function(caminho) {
                            popupImagem.win.document.forms[0].elements[popupImagem.field].value = caminho;
                        }
                        var wenv = window.open(pathUploadDebug, "uploadDebug", "height=190,width=380");
                        wenv.focus();
                    }
                });

            }else if(tipoUpload == "upload_velho"){

                var diretorioDestino = me.param($e, 'upload-destino');;
                var idCampo = "tiny_upload_image";

                format = $.extend({}, format,
                {
                    file_browser_callback: function(field, url, type, win){

                        console.log('implementar tudo que for preciso para funcionar corretamente');
                        popupImagem = { 'field': field, 'win': win };

                        if ($("#" + idCampo).length == 0) {
                            $e.after('<input type="hidden" id="' +idCampo + '" />')
                        }
                        var NomeForm = $("#" + idCampo).parents("form").attr('id');
                        var TiposArquivos = "jpeg,jpg,gif,avi,flv,swf,wmv,wma,mp3"
                        var NomeDestino = new Date().getTime()
                        var NomeFuncao = "";

                        var wMaxImageResize = 0;
                        var hMaxImageResize = 0;
                        var wenv;

                        wenv = window.open("/Recursos/EdHtmlNovo/enviar_tiny.asp?NomeCampo=" + idCampo + "&NomeForm=" + NomeForm + "&DirDestino=" + diretorioDestino + "&NomeDestino=" + NomeDestino + "&TiposArquivos=" + TiposArquivos + "&NomeFuncao=" + NomeFuncao + "&wMaxImageResize=" + wMaxImageResize + "&hMaxImageResize=" + hMaxImageResize, "wndEnviar", "height=130,width=330");
                        wenv.focus();
                    }
                });


            }else{
                format = $.extend({}, format,
                {
                    file_browser_callback: function(field, url, type, win){
                         throw 'call back de imagem indefinido';
                    }
                });
            }

            format = $.extend({}, format,{
                setup: function (ed) {

                    ed.onInit.add(function (ed, evt) {
                        var dom = ed.dom;
                        var doc = ed.getWin();
                        tinymce.dom.Event.add(doc, 'blur', function (e) {
                            element.trigger('change');
                        });
                    });
                }
            });
                
            $e.tinymce($.extend({}, format, contaChar));
        }
    })();

    
    

    P.extend(avl_tiny_old);

})(PlungerJs, jQuery);

