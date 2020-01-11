//para o tyne
(function (P, $) {
    "use strict";

    P.add("avl_tiny", function () {
        var me = this;

        this.render = function ($e) {

            var element = $e;
            var maxChar = $e.attr('maxlength');
            var contaChar = {};
            if (maxChar) {
                contaChar = { htmlcharcount_maxchars: (parseInt(maxChar, 10) > 0 ? maxChar : undefined) };
            }
            var format = {};

            if (format) {
                var strFormat = me.element($e, "format").text();
                format = P.parse($.trim(strFormat), true);
            }

            var tipoUpload = me.param($e, 'upload');

            var popupImagem;

            if (tipoUpload == "debug") {

                var pathUploadDebug = me.param($e, 'upload_debug_path');


                format = $.extend({}, format,
                {
                    file_browser_callback: function (field, url, type, win) {
                        popupImagem = { 'field': field, 'win': win };
                        window.carregarCaminhoImagem = function (caminho) {
                            popupImagem.win.document.forms[0].elements[popupImagem.field].value = caminho;
                        }
                        var wenv = window.open(pathUploadDebug, "uploadDebug", "height=190,width=380");
                        wenv.focus();
                    }
                });

            } else if (tipoUpload == "upload_velho") {


                var diretorioDestino = me.param($e, 'upload-destino');
                var idCampo = "tiny_upload_image";

                format = $.extend({}, format,
                {
                    file_browser_callback: function (field, url, type, win) {

                        console.log('implementar tudo que for preciso para funcionar corretamente');
                        popupImagem = { 'field': field, 'win': win };

                        if ($("#" + idCampo).length == 0) {
                            $e.after('<input type="hidden" id="' + idCampo + '" />')
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


            } else {
                format = $.extend({}, format,
                {
                    file_browser_callback: function (field, url, type, win) {
                        throw 'call back de imagem indefinido';
                    }
                });
            }

            format = $.extend({}, format, {
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
    });


    P.add("avl_view_html", function () {
        var me = this;

        var height = 25;
        var count = 0;

        this.render = function ($e) {
            var idFrame = me.param($e, 'frame');
            if (idFrame) {
                resize($('#' + idFrame));
                return;
            }
            count++;

            var idFrame = 'avl_view_html_' + count;

            me.param($e, 'frame', idFrame);

            var content = $e.val();
            var frame = $('<iframe frameborder="0" allowtransparency="yes" scrolling="no" width="100%" id="' + idFrame + '" height="' + height + '" style="margin:0"></frame>');
            var css = me.param($e, 'css');

            setTimeout(function () {
                applyCss(frame, css);
                applyContent(frame, content);
                resize(frame);
            }, 100);

            $e.change(function () {
                applyContent(frame, $(this).val());
            });
            frame.insertBefore($e);
            $e.hide();

        }

        var applyCss = function (frame, css) {
            var doc = frame[0].contentWindow.document;
            var $head = $('head', doc);
            if (css.indexOf('/') == 0) {
                css = window.location.protocol + '//' + window.location.host + css;
            }
            var stilo = '<link rel="stylesheet" type="text/css" href="' + css + '" />';
            $head.append(stilo);
            var $body = getbody(frame);
            $body.addClass('avl_view_html');
        }
        var applyContent = function (frame, content) {
            var $body = getbody(frame);
            $body.html(content);
        };

        var resize = function (frame) {
            var $body = getbody(frame);
            frame.attr('height', $body.height() + 10);
        }

        var getbody = function (frame) {
            var doc = frame[0].contentWindow.document;
            return $('body', doc);
        }

    });


})(PlungerJs, jQuery);