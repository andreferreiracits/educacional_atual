
var contFile = 8000;
var contImg = 2000;


$(document).ready( function(){

  
    console.log(_controller);

    if(isAluno.toUpperCase().indexOf("TRUE") >= 0){
            //$('.multimidia_imagens').hide();
            //$('.multimidia_video').hide();
            //$('.multimidia_documentos').hide();
            $('#agendarNovo').hide();


            // $('.clearfix').hide();

        }
        else{
            $('.multimidia_imagens').show();
            $('.multimidia_video').show();
            $('.multimidia_documentos').show();
            $('#agendarNovo').show();

        }


        if( $("section.dialogo .actions[pos=0]").hasClass("current")  ){
            // alert("Ismaellllllllllllllllllllllllllllllllllllllllllllll");
            $("#agendarNovo").empty();

            // $("section.dialogo .actions[pos=0] .msn_tarefa_grupo").hide();
        }


    


});



(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.multiDownload = f()
    }
})(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            'use strict';

            function fallback(urls) {
                var i = 0;
                (function createIframe() {
                    var frame = document.createElement('iframe');
                    frame.style.display = 'none';
                    frame.src = urls[i++];
                    document.documentElement.appendChild(frame);
                    var interval = setInterval(function() {
                        if (frame.contentWindow.document.readyState === 'complete' || frame.contentWindow.document.readyState === 'interactive') {
                            clearInterval(interval);
                            setTimeout(function() {
                                frame.parentNode.removeChild(frame);
                            }, 1000);
                            if (i < urls.length) {
                                createIframe();
                            }
                        }
                    }, 100);
                })();
            }

            function isFirefox() {
                return /Firefox\//i.test(navigator.userAgent);
            }

            function sameDomain(url) {
                var a = document.createElement('a');
                a.href = url;
                return location.hostname === a.hostname && location.protocol === a.protocol;
            }

            function download(url) {
                var a = document.createElement('a');
                a.download = '';
                a.href = url;
                a.dispatchEvent(new MouseEvent('click'));
            }
            module.exports = function(urls) {
                if (!urls) {
                    throw new Error('`urls` required');
                }
                if (typeof document.createElement('a').download === 'undefined') {
                    return fallback(urls);
                }
                var delay = 0;
                urls.forEach(function(url) {
                    if (isFirefox() && !sameDomain(url)) {
                        return setTimeout(download.bind(null, url), 100 * ++delay);
                    }
                    download(url);
                });
            }
        }, {}]
    }, {}, [1])(1)
});
    
    var cont = 0;
    var srt = '';
    var Materias = null;
    var disciplinaSelecionada = 0;
    var arraySelecionados = new Array();
    var arraySelecionadosHtml = new Array();
    var globalSelecionados = false;
    var selecionarTodosArquivos = 0;
    //var objetoImagens = new Array();
    //TODO:::
    
    function ListarDisciplinas(component) {
        console.log("ListarDisciplinas(component)");
        var turma = parseInt($("#idTurma").val());
        if (Materias != null && Materias.readyState < 4) {
            Materias.abort()
        }
        var strHtml = '<div class="btn-group" id="idMateria">'+
                        '<button href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton btnDisciplina_turmas">Disciplina&nbsp;<span class="caret"></span></button>'+
                        '<ul class="dropdown-menu ulDisciplina_turmas"></ul>'+
                    '</div>';

        $("#"+component).html(strHtml);
        
        var varHtmlStr = '<li dic="0" >' +
        '<input type="checkbox" id="ckDisciplina0">' +
        '<label for="ckDisciplina0">Selecione a disciplina</label>' +
        '</li>';

        Materias = $.ajax({
            url: "/ava/seletor/home/getMateriaPorTurma",
            type: "POST",
            dataType: "json",                                
            data: { "idTurma" : turma },
            success: function(aq) {                                    
                if(aq.materias.length > 0){
                    $.each( aq.materias , function(ix, item){
                        varHtmlStr += '<li dic="' + item.IdMateria + '">' +
                        '<input type="checkbox" id="ckDisciplina' + item.IdMateria + '">' +
                        '<label for="ckDisciplina' + item.IdMateria + '">' + item.strMateria + '</label>' +
                        '</li>';                       
                    });


                    $('#'+component+' ul.ulDisciplina_turmas').html(varHtmlStr);

                    $('#'+component+' button.btnDisciplina_turmas').click(function () {      
                        $('#'+component+' ul.ulDisciplina_turmas').show();
                    });

                    $('#'+component+' ul.ulDisciplina_turmas').on('mouseleave', function () {
                        this.style.display = 'none'; 
                        $(this).slideUp();
                    });

                    $('#'+component+' ul.ulDisciplina_turmas li').click(function () {
                        var valor = $(this).attr('dic');
                        
                        $('#'+component+' ul.ulDisciplina_turmas li input[type="checkbox"]:checked').each(function (i, item) {
                            item.checked = false;
                        }); 

                        document.getElementById("ckDisciplina" + valor).checked = true;
                        if (valor == 0) {
                            $('#'+component+' button.btnDisciplina_turmas').html("Selecione a disciplina");
                            $('#'+component+' button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');
                            disciplinaSelecionada = 0;
                        }
                        else {
                            disciplinaSelecionada = valor; 
                            $('#'+component+' button.btnDisciplina_turmas').html($(this).find('label').html());
                            $('#'+component+' button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');
                        }
                        $('#'+component+' ul.ulDisciplina_turmas').hide();       
                    });
                }
            },
            error: function(ap) {               
                alert("ap.responseText - "+ap.materias);
                if (ap.statusText != "abort") {
                    console.log(ap.responseText)
                }
            }
        })
    }
   

    function unloadipad() {
        bolPassouNoBeforeUnload === !1 && bolFezAlteracaoConfiguracoes === !0 && $(".barra_topo_itens .menu_topo li .configuracoes_turma").parent().hasClass("active") && confirm(strMensagemConfiguracaoNaoSalvaUnload + " Gostaria de salvar as altera��es?") && salvarConfiguracoesGrupoTurma(!1), bolPassouNoBeforeUnload = !1
    }


    function cancelarRemoverAssunto() {
        $("#cbAssuntoEditar li").show(), $("#idAssuntoRemover").val(""), $(".feed_confirma").hide(), $("._feed_lista_assunto").slideDown(), $("#hAssuntoEditar").val($("#hAssuntoEditar").attr("initvalue")), $("#cbAssuntoEditar input[type=checkbox]").removeAttr("checked"), $("#ckAssuntoEditar" + $("#hAssuntoEditar").val()).attr("checked", "checked");
        var a = $("#cbAssuntoEditar li[assu=" + $("#hAssuntoEditar").attr("initvalue") + "] label").text() + '<span class="caret"></span>';
        $("#txtAssuntoEditar").html(a), $("#cbAssuntoEditar").parent().removeClass("open"), $("#feed_confirma_RadioRemoverLabel, #feed_confirma_RadioMoverLabel").removeClass("inputRadioChecked"), $("#feed_confirma_RadioMoverLabel").addClass("inputRadioChecked"), $(".feed_confirma input:radio").removeAttr("checked"), $("#feed_confirma_RadioMover").attr("checked", "checked"), $("strong, label, div.bootstrap", ".feed_confirma").show()
    }

    function resetarFiltroMural() {
        $("#hAssuntoTimeLine").val($("#hAssuntoTimeLine").attr("initvalue")), $("#cbAssuntoTimeLine input[type=checkbox]").removeAttr("checked"), $("#ckAssuntoTimeLine" + $("#hAssuntoTimeLine").val()).attr("checked", "checked");
        var a = $("#cbAssuntoTimeLine li[assu=" + $("#hAssuntoTimeLine").attr("initvalue") + "] label").text() + '<span class="caret"></span>';
        $("#txtAssuntoTimeLine").html(a), $("#cbAssuntoTimeLine").parent().removeClass("open")
    }

    function carregarMuralGrupoTurma() { }

    function paginaEducacional_CarregarMuralVerMais() {
        var a = $("#indexPaginacao").val();
        a++ ; 
        paginaEducacional_CarregarMural(a)
    }

    function paginaEducacional_LimparCaixaTexto(a) {
        $(a).val(""), $(a).siblings(":last").html(""), $(a).siblings(":last").prev().html(""), $(a).height(28)
    }

    function paginaEducacional_CancelarDigaLaClick() {
        
        paginaEducacional_CancelarDigaLa();
        removerPreviewVideoMensagem(!0);
        limpaArrayImagensTimeLine();
        $(".dialogo_box .preview_post.imagens .prev_imagem:not(.adicionar)").remove();
        $(".dialogo_box .preview_post.imagens").hide();
        $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
        limpaArrayArquivosTimeLine();
        $(".dialogo_box .preview_post.arquivos .prev_documento:not(.adicionar)").parent().remove();
        $(".dialogo_box .preview_post.arquivos").mCustomScrollbar("update");
        $(".dialogo_box .preview_post.arquivos").hide();
    }

    function paginaEducacional_CancelarDigaLa() {
        paginaEducacional_LimparCaixaTexto("#txtInput"), $("#hAssuntoPost").val($("#hAssuntoPost").attr("initvalue")), $("#cbAssuntoPost input[type=checkbox]").removeAttr("checked"), $("#ckAssuntoPost" + $("#hAssuntoPost").val()).attr("checked", "checked");
        var a = $("#ckAssuntoPost" + $("#hAssuntoPost").val()).next().text() + '<span class="caret"></span>';
        $("#txtAssuntoPost").html(a), $(".enviar_video").hide(), $(".mensagem_multimidia ul:not(.dropdown-menu)").show(), $(".mensagem_multimidia").show(), $("#urlVideoOriginal").val(""), $(".errovideo").hide(), $("#txtLinkVideoMensagem").val("")
        //,$("#btnCancelarFerramentaMural").closest(".sep_digala").slideUp(200)
    }

    function paginaEducacional_TratamentoVimeo() {
        var a = $f(this),
            o = !1;
        a.api("pause"), a.addEvent("ready", function () {
            a.addEvent("play", function () {
                o || (o = !0, a.api("pause"))
            })
        })
    }

    function montaPreviewVideoMensagem(a) {
        a = decodeURI(a).replace(/\s/g, "");
        var o = "";
        if (a.length > 0) {
            if ($(".errovideo").fadeOut("fast", function () {
                $(".verificavideo").fadeIn("slow")
            }), (a.indexOf("#t=") > 1 || a.indexOf("&t=") > 1 || a.indexOf("&amp;t=") > 1 || a.indexOf("?t=") > 1) && (o = getVideoTime(a)), a.indexOf("http://") > -1 ? a = a.replace("http://", "") : a.indexOf("https://") > -1 && (a = a.replace("https://", "")), a.indexOf("&feature=youtu.be") > -1) {
                var e = a.indexOf("&feature=youtu.be");
                if (a.indexOf("&list=") > -1) {
                    var i = a.indexOf("&list=");
                    a = a.substring(0, e) + a.substring(i, a.length)
                } else if (a.indexOf("#t=") > -1) {
                    var r = a.indexOf("#t=");
                    a = a.substring(0, e) + a.substring(r, a.length)
                } else if (a.indexOf("&t=") > -1) {
                    var r = a.indexOf("&t=");
                    a = a.substring(0, e) + a.substring(r, a.length)
                } else if (a.indexOf("&amp;t=") > -1) {
                    var r = a.indexOf("&amp;t=");
                    a = a.substring(0, e) + a.substring(r, a.length)
                } else if (a.indexOf("?t=") > -1) {
                    var r = a.indexOf("?t=");
                    a = a.substring(0, e) + a.substring(r, a.length)
                } else a.indexOf("&feature=youtu.be") > -1 && (a = a.substring(0, e))
            }
            a.match(/^(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be)|youtube)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
            var t, s = {
                provider: null,
                url: RegExp.$2,
                id: RegExp.$5
            };
            $.support.cors = !0, t = retornaVideoURL(s), t && "" != s.id ? t.always(function () {
                if (bolVideoProibido || (s.provider = strTipoVideo), s.provider) {
                    var e = "",
                        i = "";
                    $(".enviar_video, .verificavideo, .errovideo").hide(),
                        "youtube" == s.provider ? (e = "www.youtube.com/embed/" + s.id + "?rel=0&wmode=transparent", o.length > 0 && (e += "&start=" + o)) : (i = ' class="iframeVideoVimeo" ', e = "player.vimeo.com/video/" + s.id + "?badge=0&byline=0&portrait=0&title=0&player_id=playerPreview&api=1", o.length > 0 && (e += "#t=" + o)), $("#container_preview_video").html("<iframe " + i + ' width="300" height="165" src="//' + e + '" allowTransparency="true" frameborder="0" allowfullscreen></iframe><a href="javascript: void(0);" onClick="removerPreviewVideoMensagem(false);" class="remover_multimidia"><span class="FontAwesome"></span>Remover</a>').fadeIn("slow", function () {
                        $(".enviar_video, .verificavideo, .errovideo").hide(),
                        $("#urlVideoOriginal").val(a), 
                        $("#visualizarPost").removeClass("disable").prop("disabled", !1), 
                        $(".iframeVideoVimeo").on("load", paginaEducacional_TratamentoVimeo)
                    })
                } else $(".verificavideo").fadeOut("fast", function () {
                    $(".errovideo").text(retornaTextoErroVideo(bolVideoProibido)), bolVideoProibido = !1, strTipoVideo = "", $(".errovideo").fadeIn("slow")
                })
            }) : $(".verificavideo").fadeOut("fast", function () {
                $(".errovideo").text(retornaTextoErroVideo(bolVideoProibido)), bolVideoProibido = !1, strTipoVideo = "", $(".errovideo").fadeIn("slow")
            })
        }
        
        return !1
    }

    function removerPreviewVideoMensagem(a) {
        (void 0 === a || null == a || "" == a) && (a = !1), $("#container_preview_video").fadeOut("slow", function () {
            var o = $("iframe", $(this));
            if (o.attr("src", ""), setTimeout(function () {
                o.remove(), $("#container_preview_video").html("")
            }, 20), $("#txtLinkVideoMensagem").val(""), $(".enviar_video").hide(), $("#urlVideoOriginal").val(""), !a) {
                var e = $.trim($("#txtInput").val());
                "" == e ? paginaEducacional_CancelarDigaLa() : ($(".mensagem_multimidia ul:not(.dropdown-menu)").show(), $(".mensagem_multimidia").show())
            }
        })

        $('.multimidia_video').show();

    }

    function CallbackUploadExcluidos(a) {
        if (parseInt(a.idFerramentaTipo) == idFerramentaTipoMaterialApoio) {
            if ($("#boxMaterialApoioTarefa .the_insertedLink a.exclui_arquivo[idarquivo=" + a.idArquivo + "]").length && ($("#boxMaterialApoioTarefa .the_insertedLink a.exclui_arquivo[idarquivo=" + a.idArquivo + "]").parent().remove(), null != arrayArquivosUpload)) {
                var o = [];
                for (var e in arrayArquivosUpload.arrayArquivo) arrayArquivosUpload.arrayArquivo[e].id != a.idArquivo && o.push(arrayArquivosUpload.arrayArquivo[e]);
                arrayArquivosUpload.arrayArquivo = o, 0 == o.length && $("#boxMaterialApoioTarefa").remove(), o = []
            }
        } else if (parseInt(a.idFerramentaTipo) == idFerramentaTipoTimeLine) {
            if (void 0 !== objetoImagens && null != objetoImagens && null != objetoImagens.imagens && objetoImagens.imagens.length > 0) {
                for (var i = objetoImagens.imagens.length, r = 0; i > r; r++)
                    if (objetoImagens.imagens[r].idArquivo == a.idArquivo) {
                        objetoImagens.imagens.splice(r, 1), $(".preview_post.imagens").find(".prev_imagem").not(".adicionar").each(function () {
                            return $(this).data("idarquivo") == a.idArquivo ? void $(this).remove() : void 0
                        });
                        break
                    }
                if (0 == objetoImagens.imagens.length) {
                    $(".dialogo_box .preview_post.imagens").hide();
                    var t = $.trim($("#txtInput").val());
                    "" == t ? paginaEducacional_CancelarDigaLa() : ($(".mensagem_multimidia ul:not(.dropdown-menu)").show(), $(".mensagem_multimidia").show())
                }
                $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update")
            }
        } else if (parseInt(a.idFerramentaTipo) == idFerramentaTipoTimeLineFile && void 0 !== objetoArquivos && null != objetoArquivos && null != objetoArquivos.arquivos && objetoArquivos.arquivos.length > 0) {
            for (var i = objetoArquivos.arquivos.length, r = 0; i > r; r++)
                if (objetoArquivos.arquivos[r].idArquivo == a.idArquivo) {
                    objetoArquivos.arquivos.splice(r, 1), $(".preview_post.arquivos").find(".prev_documento").each(function () {
                        return parseInt($(this).parent().data("idarquivo")) == a.idArquivo ? void $(this).parent().remove() : void 0
                    });
                    break
                }
            if (0 == objetoArquivos.arquivos.length) {
                $(".dialogo_box .preview_post.arquivos").hide();
                var t = $.trim($("#txtInput").val());
                "" == t ? paginaEducacional_CancelarDigaLa() : ($(".mensagem_multimidia ul:not(.dropdown-menu)").show(), $(".mensagem_multimidia").show())
            }
            $(".dialogo_box .preview_post.arquivos").mCustomScrollbar("update")
        }
    }

    //Abre 'componente' de upload para o usuario escolher as imagens para o diga la.
    function abreUploadImagemTimeLine() {
        console.log("**** abreUploadImagemTimeLine *****");
        var flagContinua = true;
        var idalbum = parseInt($(".dialogo .dialogo_box .preview_post.imagens").data("idalbum")); 
        console.log("idalbum " + idalbum);
        $.fancybox.showLoading();
        if (idalbum === undefined || idalbum == null || idalbum == 0) {
            $.ajax({
                url: "/ava/mural/home/VerificaAlbumTimeline",
                type: "POST",
                dataType: "json",
                async: !1,//false,
                success: function (data) {
                    
                    console.log(data);
                    
                    var erro = parseInt(data.error);
                    if (erro == 0) {
                        idalbum = parseInt(data.album.idAlbum);

                    } else {
                        console.log(data.msg);
                        flagContinua = false;
                        $.fancybox.hideLoading();
                    }
                },
                error: function (data) {
                    $.fancybox.hideLoading();
                    flagContinua = false;
                }
            });
        }
        if (flagContinua) {
            var idsArquivosPreSelecionados = new Array();
            if (objetoImagens.imagens.length > 0) {
                for (var oi in objetoImagens.imagens) {
                    idsArquivosPreSelecionados.push(objetoImagens.imagens[oi].idArquivo);
                }
            }
            var param = {
                "idFerramenta": idalbum,
                "idFerramentaTipo": idFerramentaTipoTimeLine,
                "idsArquivosSelecionados": idsArquivosPreSelecionados.join(',')
            };
            var mForm;

            try {
                mForm = document.createElement("<form name='upload' id='upload'>");
            } catch (ex) {
                mForm = document.createElement("form");
                mForm.name = "upload";
            }

            for (var i in param) {
                if (param.hasOwnProperty(i)) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = i;
                    input.value = param[i];
                    mForm.appendChild(input);
                }
            }
            mForm.target = "UploadImagem";
            mForm.method = "POST";
            mForm.action = "/AVA/Upload";

            document.body.appendChild(mForm);

            var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                parametros = null;
            }
            $("#previewImagemDigaLaNovoTurma iframe").append(mForm);		
            mForm.submit();		
            $("#previewImagemDigaLaNovoTurma").dialog("open");		
            $.fancybox.hideLoading();
        }    
    }

    // old
    function abreUploadImagemTimeLineOld() {
        var o = parseInt($(".dialogo .dialogo_box .preview_post.imagens").data("idalbum"));
        if ($.fancybox.showLoading(), void 0 === o || null == o || 0 == o || isNaN(o)) {
            var e = [];
            if (objetoImagens.imagens.length > 0)
                for (var i in objetoImagens.imagens) e.push(objetoImagens.imagens[i].idArquivo);
            $.ajax({
                url: "/AVA/Turma/Home/VerificaAlbumTimeline",
                type: "POST",
                dataType: "json",
                async: !1,
                success: function (i) {
                    var r = parseInt(i.error);
                    if (0 == r) {
                        o = parseInt(i.album.idAlbum);
                        var t, s = {
                            idFerramenta: o,
                            idFerramentaTipo: idFerramentaTipoTimeLine,
                            idsArquivosSelecionados: e.join(",")
                        };
                        try {
                            t = document.createElement("<form name='upload'>")
                        } catch (n) {
                            t = document.createElement("form"), t.name = "upload"
                        }
                        for (var l in s)
                            if (s.hasOwnProperty(l)) {
                                var u = document.createElement("input");
                                u.type = "hidden", u.name = l, u.value = s[l], t.appendChild(u)
                            }
                        t.target = "Upload", t.method = "POST", t.action = "/AVA/Upload", document.body.appendChild(t);
                        var d = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
                        Modernizr.touch && (d = null), a = window.open("", "Upload", d), a && t.submit(), $.fancybox.hideLoading()
                    } else console.log(i.msg), $.fancybox.hideLoading()
                },
                error: function () {
                    $.fancybox.hideLoading()
                }
            })
        }
    }

    function limpaArrayImagensTimeLine() {
        void 0 !== objetoImagens && null != objetoImagens && objetoImagens.imagens.length > 0 && objetoImagens.imagens.splice(0, objetoImagens.imagens.length)
    }

    function montaPreviewImagemMensagemRapida(a) {
        $(".dialogo_box .preview_post.imagens").show();
        var o = $(".dialogo_box .preview_post.imagens .engloba_classe .mCSB_container");
        if (void 0 !== a && null != a && a.length > 0) {
            for (var e = 0; e < a.length; e++) {
                var i = a[e].diretorio,
                    r = a[e].thumbnail + a[e].extensao,
                    t = $("<div />").addClass("prev_imagem").data("idarquivo", a[e].idArquivo),
                    s = $("<img />").attr("src", i + "/" + r).attr("width", "99").attr("height", "99").attr("alt", a[e].nome),
                    n = $("<a />").addClass("remover_multimidia").attr("href", "javascript:void(0);"),
                    l = $("<span />").addClass("FontAwesome");
                n.append(l), t.append(s), t.append(n), o.find(".prev_imagem:first").hasClass("adicionar") ? o.prepend(t) : o.find(".prev_imagem").not(".adicionar").last().after(t)
            }
            $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update")
        }

        //IMG

        var jsonObject = (a) ;

        console.log(jsonObject);

        for(var i = 0; i < jsonObject.length; i++){

            console.log(jsonObject[i].diretorio);

            jsonObject[i].idPosition = contImg;

            var htmlObject = '' +

            '<li class="qq-file-id-'+contImg+' qq-upload-success"    qq-file-id="'+contImg+'">'+
                    '<span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>'+
                    '<div class="qq-progress-bar-container-selector qq-progress-bar-container qq-hide">'+
                      '  <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar" style="width: 100%;"></div>'+
                    '</div>'+
                    '<span class="qq-upload-spinner-selector qq-upload-spinner qq-hide"></span>'+
                    '<div class="qq-thumbnail-wrapper">'+
                       ' <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale="" src="'+ jsonObject[i].diretorio+"/"+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+
                    '</div>'+
                    '<button type="button" class="qq-upload-cancel-selector qq-upload-cancel qq-hide">X</button>'+
                    '<button type="button" class="qq-upload-retry-selector qq-upload-retry qq-hide">'+
                    '   <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>'+
                    '    Retry'+
                    '</button>'+
                    '<div class="qq-file-info">'+
                    '<div class="qq-file-name">'+
                    '       <span class="qq-upload-file-selector qq-upload-file" title="'+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+jsonObject[i].arquivo+jsonObject[i].extensao+'</span>'+
                    '       <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>'+
                    '   </div>'+
                    '   <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">'+
                    '   <!-- <span class="qq-upload-size-selector qq-upload-size"></span> -->'+
                    '   <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete"   onclick=deleteImg('+contImg+') >   '+
                    '       <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>'+
                    '   </button>'+
                    '   <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause qq-hide">'+
                    '       <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>'+
                    '   </button>'+
                    '   <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue qq-hide">'+
                    '       <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>'+
                    '   </button>'+
                    '</div>'+
            '</li> ';
            
            $('.qq-upload-list').append(htmlObject);
            contImg++;

        }


    }

    //Abre 'componente' de upload para o usuario escolher as imagens para o diga la.
    function abreUploadFileTimeLine() {

        console.log('abreUploadFileTimeLine turmas');

        $('div.ui-dialog').remove();

        $( "#previewFileDigaLaNovo" ).dialog({
            autoOpen: false,
            height: 680,
            width: 900,
            modal: true,
            resizable: false,
            draggable: false,
            open: function(event, ui) {
                $(this).parent().find(".ui-dialog-titlebar").hide();
                $(this).parent().find(".ui-dialog-buttonpane").hide();
            },       
    
        });

        var flagContinua = true;
        var idalbum = parseInt($(".dialogo .dialogo_box .preview_post.arquivos").data("idarquivomultimidia"));
        var e = [];
        $.fancybox.showLoading();
        if (idalbum === undefined || idalbum == null || idalbum == 0) {
            $.ajax({
                url: "/ava/mural/home/VerificaAlbumTimeline",
                dataType: "json",
                async: false,
                success: function (data) {
                    var erro = parseInt(data.error);
                    if (erro == 0) {
                        idalbum = parseInt(data.album.idAlbum);
                    } else {
                        console.log(data.msg);
                        flagContinua = false;
                        $.fancybox.hideLoading();
                    }
                },
                error: function (data) {
                    $.fancybox.hideLoading();
                    flagContinua = false;
                }
            });
        }
        if (flagContinua) {
            var idsArquivosPreSelecionados = new Array();
            if (objetoImagens.imagens.length > 0) {
                for (var oi in objetoImagens.imagens) {
                    idsArquivosPreSelecionados.push(objetoImagens.imagens[oi].idArquivo);
                }
            }
            var param = {
                idFerramenta: idalbum,
                idFerramentaTipo: idFerramentaTipoTimeLineFile,
                idsArquivosSelecionados: e.join(",")
            };
            var mForm;
            try {
                mForm = document.createElement("<form name='upload' id='upload'>");
            } catch (ex) {
                mForm = document.createElement("form");
                mForm.name = "upload";
            }

            for (var i in param) {
                if (param.hasOwnProperty(i)) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = i;
                    input.value = param[i];
                    mForm.appendChild(input);
                }
            }
            mForm.target = "Upload_arquivos";
            mForm.method = "POST";
            mForm.action = "/AVA/Upload";

            document.body.appendChild(mForm);

            var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                parametros = null;
            }            
            $("#previewFileDigaLaNovo iframe").append(mForm);		
            mForm.submit();		
            $("#previewFileDigaLaNovo").dialog("open");		
            $.fancybox.hideLoading();
        }    
    }

    function abreUploadFileTimeLineOld() {
        var o = parseInt($(".dialogo .dialogo_box .preview_post.arquivos").data("idarquivomultimidia"));
        if ($.fancybox.showLoading(), void 0 === o || null == o || 0 == o || isNaN(o)) {
            var e = [];
            if (objetoArquivos.arquivos.length > 0)
                for (var i in objetoArquivos.arquivos) e.push(objetoArquivos.arquivos[i].idArquivo);
            $.ajax({
                url: "/AVA/Turma/Home/VerificaArquivoMultimidiaTimeline",
                type: "POST",
                dataType: "json",
                async: !1,
                success: function (i) {
                    var r = parseInt(i.error);
                    if (0 == r) {
                        o = parseInt(i.arquivomultimidia.idArquivoMultimidia);
                        var s = {
                            idFerramenta: o,
                            idFerramentaTipo: idFerramentaTipoTimeLineFile,
                            idsArquivosSelecionados: e.join(",")
                        };
                        var mForm;
                        
                        try {
                            mForm = document.createElement("<form name='upload'>");
                        } catch (ex) {
                            mForm = document.createElement("form");
                            mForm.name = "upload";
                        }
                        for (var i in param) {
                            if (param.hasOwnProperty(i)) {
                                var input = document.createElement('input');
                                input.type = 'hidden';
                                input.name = i;
                                input.value = param[i];
                                mForm.appendChild(input);
                            }
                        } 
                        mForm.target = "Upload";
                        mForm.method = "POST";
                        mForm.action = "/AVA/Upload";
                        
                        document.body.appendChild(mForm);
                        
                        var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
                        if (Modernizr.touch) { parametros = null;}

                        $("#previewFileDigaLaNovo iframe").append(mForm);		
                        mForm.submit();		
                        $("#previewFileDigaLaNovo").dialog("open");		
                        $.fancybox.hideLoading();

                    } else console.log(i.msg), $.fancybox.hideLoading()
                },
                error: function () {
                    $.fancybox.hideLoading()
                }
            })
        }
    }

    function montaPreviewFilesMensagemRapida(a) {

          if(isAluno.toUpperCase().indexOf("TRUE") >= 0){
            //$('.multimidia_imagens').hide();
            //$('.multimidia_video').hide();
            //$('.multimidia_documentos').hide();
            $('#agendarNovo').hide();


            // $('.clearfix').hide();

        }
        else{
            $('.multimidia_imagens').show();
            $('.multimidia_video').show();
            $('.multimidia_documentos').show();
            $('#agendarNovo').show();

        }


        var jsonObject = (a) ;

        if (jsonObject !== undefined && jsonObject != null && jsonObject.length > 0) {
            for (var i = 0; i < jsonObject.length; i++) {
                // var caminhoImagem = obj[i].diretorio;
                // var thumb = obj[i].thumbnail + obj[i].extensao;
    
                // var $div = $("<div />").addClass("prev_midia").attr('data-idarquivo', obj[i].idArquivo);
                // var $a = $("<a>Remover</a>").addClass("btn_acao").addClass("opcao_excluir").attr('onclick', 'removeImagemDigaLa(this)').attr("href", "javascript:void(0);");
                // var $img = $("<div />").addClass("bloco_img").css("background-image", 'url(' + caminhoImagem + "/" + thumb + ')');
    
                // $div.append($a).append($img);
    
                // if ($caixa.find(".prev_midia:first").hasClass("adicionar")) {
                //     $caixa.prepend($div);
                // } else {
                //     $caixa.find(".prev_midia").not(".adicionar").last().after($div);
                // }
    
                console.log(jsonObject[i].diretorio);
    
                jsonObject[i].idPosition = contFile;

                var htmlObject = '' +
    
                '<li class="qq-file-id-'+contFile+' qq-upload-success" qq-file-id="'+contFile+'">'+
                        '<span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>'+
                        '<div class="qq-progress-bar-container-selector qq-progress-bar-container qq-hide">'+
                          '  <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar" style="width: 100%;"></div>'+
                        '</div>'+
                        '<span class="qq-upload-spinner-selector qq-upload-spinner qq-hide"></span>'+
                        
                        '<div  id= "miniatura" class="qq-thumbnail-wrapper">'+
                            '<img  class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>'+
                            '<div id = "thumbImagem" class="tipoArquivo_fineUpload" qq-max-size="120" qq-server-scale style="display:block">'+
                            '<span>'+jsonObject[i].extensao+'</span>'+
                            '</div>'+
                        '</div>'+



                        '<button type="button" class="qq-upload-cancel-selector qq-upload-cancel qq-hide">X</button>'+
                        '<button type="button" class="qq-upload-retry-selector qq-upload-retry qq-hide">'+
                        '   <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>'+
                        '    Retry'+
                        '</button>'+
                        '<div class="qq-file-info">'+
                        
                            // '<div class="qq-file-name tipo_arquivo">'+
                            
                            '       <span class="qq-upload-file-selector qq-upload-file" title="'+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+jsonObject[i].arquivo+jsonObject[i].extensao+'</span>'+
                            // '       <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>'+
                            // '   </div>'+
                            // '   <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">'+
                            '   <!-- <span class="qq-upload-size-selector qq-upload-size"></span> -->'+

                            '   <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">'+
                            '       <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>'+
                            '   </button>'+

                            '   <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause qq-hide">'+
                            '       <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>'+
                            '   </button>'+

                            '   <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue qq-hide">'+
                            '       <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>'+
                            '   </button>'+
                        '</div>'+
                '</li> ';


                
                $('.qq-upload-list').append(htmlObject);
                contFile++;
            }

    
            // bloqueiaOutrosDigaLa(true);
            // $("#previewImagemDigaLa").show();
        }

        // var o = $(".dialogo_box .preview_post.arquivos .mCSB_container");
        // if (void 0 !== a && null != a && a.length > 0) {
        //     for (var e = 0; e < a.length; e++) {
        //         var i = $("<div />").data("idarquivo", a[e].idArquivo),
        //             r = $("<div />").addClass("prev_documento"),
        //             t = $("<div />").addClass("tipo_arquivo"),
        //             s = $("<img />").attr("src", "/ava/StaticContent/Common/img/perfil/documento_multimidia.png").attr("width", "32").attr("height", "41"),
        //             n = $("<span />").text(a[e].extensao.substring(1, a[e].extensao.length)),
        //             l = $("<p />").html("" == a[e].nome ? a[e].arquivo : a[e].nome),
        //             u = $("<a />").attr("href", "#").addClass("remover_multimidia").text("Remover"),
        //             d = $("<span />").addClass("FontAwesome");
        //         t.append(s), t.append(n), r.append(t), r.append(l), u.prepend(d), i.append(r), i.append(u), o.find(".adicionar_doc").prev().before(i)
        //     }
        //     $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update")
        // }
    }

    function limpaArrayArquivosTimeLine() {
        void 0 !== objetoArquivos && null != objetoArquivos && objetoArquivos.arquivos.length > 0 && objetoArquivos.arquivos.splice(0, objetoArquivos.arquivos.length)
    }

    function CallbackUpload(a) {
        var o = (a.idFerramenta, parseInt(a.idFerramentaTipo)),
            e = a.arrayArquivo[0].id,
            i = a.arrayArquivo[0].strDiretorio + "/" + a.arrayArquivo[0].strArquivo + a.arrayArquivo[0].strExtensao;
        if (o == idFerramentaTipoTrocarFotoGrupo) idArquivoFoto = e, $("#srcFotoGrupo").val(i), $(".configuracoes_grupo .trocar_foto img").attr("src", i), bolFezAlteracaoConfiguracoes = !0;
        else if (o == idFerramentaTipoMaterialApoio) {
            if ($("#boxMaterialApoioTarefa").remove(), $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_mapoio" id="boxMaterialApoioTarefa"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>'), void 0 == arrayArquivosUpload || null == arrayArquivosUpload) arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(a));
            else {
                var r = !1,
                    t = [];
                if (arrayArquivosUpload.arrayArquivo.length > 0) {
                    for (var s in arrayArquivosUpload.arrayArquivo) {
                        r = !1;
                        for (var n in a.arrayArquivo)
                            if (a.arrayArquivo[n].id == arrayArquivosUpload.arrayArquivo[s].id) {
                                r = !0;
                                break
                            }
                        r ? t.push(arrayArquivosUpload.arrayArquivo[s]) : $("#boxMaterialApoioTarefa .the_insertedLink .exclui_arquivo[idarquivo=" + arrayArquivosUpload.arrayArquivo[s].id + "]").parent().remove()
                    }
                    arrayArquivosUpload.arrayArquivo = t, t = []
                }
                for (var l = 0; l < a.arrayArquivo.length; l++) {
                    r = !1;
                    for (var s in arrayArquivosUpload.arrayArquivo)
                        if (arrayArquivosUpload.arrayArquivo[s].id == a.arrayArquivo[l].id) {
                            r = !0;
                            break
                        }
                    r || arrayArquivosUpload.arrayArquivo.push(a.arrayArquivo[l])
                }
            }
            for (var l = 0; arrayArquivosUpload.arrayArquivo[l]; l++) strRetornoHtmlUpload += '<div class="the_insertedLink"><a href="' + arrayArquivosUpload.arrayArquivo[l].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[l].strArquivo + arrayArquivosUpload.arrayArquivo[l].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[l].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" idArquivo="' + arrayArquivosUpload.arrayArquivo[l].id + '"><strong>x</strong></a></div>';
            $("#boxMaterialApoioTarefa").remove(), $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa"><div class="container_inlinks"><h5>Material de apoio</h5>' + strRetornoHtmlUpload + "</div></div>"), arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(arrayArquivosUpload)), $(".exclui_arquivo").click(function () {
                for (var a = $(this).attr("idArquivo"), o = 0; o < arrayArquivosUpload.arrayArquivo.length; o++)
                    if (arrayArquivosUpload.arrayArquivo[o].id == parseInt(a)) {
                        arrayArquivosUpload.arrayArquivo.splice(o, 1);
                        break
                    }
                if ($(this).parent().remove(), 0 == arrayArquivosUpload.arrayArquivo.length) $("#boxMaterialApoioTarefa").remove();
                else
                    for (var o = 0; arrayArquivosUpload.arrayArquivo[o]; o++) strRetornoHtmlUpload += '<div class="the_insertedLink"><a href="' + arrayArquivosUpload.arrayArquivo[o].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[o].strArquivo + arrayArquivosUpload.arrayArquivo[o].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[o].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" posArrayArquivo="' + o + '"><strong>x</strong></a></div>';
                strRetornoHtmlUpload = ""
            }), strRetornoHtmlUpload = ""
        } else if (o == idFerramentaTipoTimeLine) {
            var u = [],
                d = !1;
            if (null != objetoImagens.imagens) {
                for (var c in objetoImagens.imagens) {
                    d = !1;
                    for (var l in a.arrayArquivo) a.arrayArquivo[l].id == objetoImagens.imagens[c].idArquivo && (d = !0, u.push(objetoImagens.imagens[c]));
                    d || $(".dialogo_box .preview_post.imagens .prev_imagem").each(function () {
                        return $(this).data("idarquivo") == objetoImagens.imagens[c].idArquivo ? ($(this).remove(), !1) : void 0
                    })
                }
                $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update")
            }
            objetoImagens.imagens = u, u = [];
            for (var l = 0; l < a.arrayArquivo.length; l++) {
                d = !1;
                for (var c in objetoImagens.imagens)
                    if (objetoImagens.imagens[c].idArquivo == a.arrayArquivo[l].id) {
                        d = !0;
                        break
                    }
                if (!d) {
                    var m = {
                        bolPaisagem: a.arrayArquivo[l].bolPaisagem,
                        bolRetrato: a.arrayArquivo[l].bolRetrato,
                        idArquivo: a.arrayArquivo[l].id,
                        thumbnail: a.arrayArquivo[l].strThumbnail,
                        arquivo: a.arrayArquivo[l].strArquivo,
                        nome: a.arrayArquivo[l].strNome,
                        descricao: a.arrayArquivo[l].strDescricao,
                        diretorio: a.arrayArquivo[l].strDiretorio,
                        extensao: a.arrayArquivo[l].strExtensao,
                        altura: a.arrayArquivo[l].intAlturaImg,
                        largura: a.arrayArquivo[l].intLarguraImg,
                        id: contImg
                    };
                    
                    g_arrayMensagemRapida.push(m);
                    objetoImagens.imagens.push(m), u.push(m)
                    
                }
            }
            objetoImagens.imagens.sort(function (a, o) {
                return o.largura > a.largura ? 1 : 0
            }), objetoImagens.imagens.sort(function (a, o) {
                return a.largura == o.largura ? o.altura < a.altura ? 1 : -1 : 0
            }), void 0 !== objetoImagens && null != objetoImagens && objetoImagens.imagens.length > 0 ? ($(".sep_digala").slideDown(200), 
                $("#visualizarPost").removeClass("disable").removeAttr("disabled"), 
                $("#btnCancelarFerramentaMural").removeAttr("disabled").removeClass("disable")) : $("#visualizarPost").addClass("disable").attr("disabled", "disabled"), void 0 !== u && null != u && u.length > 0 && ($(".dialogo_box .preview_post.imagens").is(":visible") || $(".dialogo_box .preview_post.imagens").show(), montaPreviewImagemMensagemRapida(u))      
                // ,$(".mensagem_multimidia ul:not(.dropdown-menu)").hide()),
                
                
                u.splice(0, u.length), u = null
        } else if (o == idFerramentaTipoTimeLineFile) {
            var t = [],
                d = !1;
            if (null != objetoArquivos.arquivos) {
                for (var c in objetoArquivos.arquivos) {
                    d = !1;
                    for (var l in a.arrayArquivo) a.arrayArquivo[l].id == objetoArquivos.arquivos[c].idArquivo && (d = !0, t.push(objetoArquivos.arquivos[c]));
                    d || $(".dialogo_box .preview_post.arquivos .prev_documento").each(function () {
                        return $(this).parent().data("idarquivo") == objetoArquivos.arquivos[c].idArquivo ? ($(this).parent().remove(), !1) : void 0
                    })
                }
                $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update")
            }
            objetoArquivos.arquivos = t, t = [];
            for (var l = 0; l < a.arrayArquivo.length; l++) {
                if (d = !1, null != objetoArquivos.arquivos && objetoArquivos.arquivos.length > 0)
                    for (var c in objetoArquivos.arquivos)
                        if (objetoArquivos.arquivos[c].idArquivo == a.arrayArquivo[l].id) {
                            d = !0;
                            break
                        }
                if (!d) {
                    var p = {
                        idArquivo: a.arrayArquivo[l].id,
                        arquivo: a.arrayArquivo[l].strArquivo,
                        nome: a.arrayArquivo[l].strNome,
                        descricao: a.arrayArquivo[l].strDescricao,
                        diretorio: a.arrayArquivo[l].strDiretorio,
                        extensao: a.arrayArquivo[l].strExtensao
                          
                    };
                    g_arrayMensagemRapidaFile.push(p);
                    if (null != objetoArquivos.arquivos && objetoArquivos.arquivos.length > 0) {
                        for (var v = objetoArquivos.arquivos.length, g = !0, f = 0; v > f; f++)
                            if (objetoArquivos.arquivos[f].idArquivo == p.idArquivo) {
                                g = !1;
                                break
                            }
                        g 
                        && (objetoArquivos.arquivos.push(p), t.push(p))
                    } else null == objetoArquivos.arquivos && (objetoArquivos.arquivos = []), objetoArquivos.arquivos.push(p), t.push(p)
                }
            }
            void 0 !== objetoArquivos && null != objetoArquivos && objetoArquivos.arquivos.length > 0 ? ($(".sep_digala").slideDown(200), 
                $("#visualizarPost").removeClass("disable").removeAttr("disabled"), $("#btnCancelarFerramentaMural").removeAttr("disabled").removeClass("disable")) : $("#visualizarPost").addClass("disable").attr("disabled", "disabled"), void 0 !== t && null != t && t.length > 0 && ($(".preview_post.arquivos").show(), montaPreviewFilesMensagemRapida(t)
                //  ,$(".mensagem_multimidia ul:not(.dropdown-menu)").hide()), 
                )
                t.splice(0, t.length), t = null
        }
    }

    function paginaEducacional_CarregarMural(a) {

        if(isAluno.toUpperCase().indexOf("TRUE") >= 0){
            //$('.multimidia_imagens').hide();
            //$('.multimidia_video').hide();
            //$('.multimidia_documentos').hide();
            //$('#agendarNovo').hide();


            // $('.clearfix').hide();

        }
        else{
            $('.multimidia_imagens').show();
            $('.multimidia_video').show();
            $('.multimidia_documentos').show();
            $('#agendarNovo').show();

        }
        
        ListarDisciplinas("id_materia_turma");

        null != ajaxTimeLine && ajaxTimeLine.abort();
        var o = '<div id="loader_timeline" style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>';
        1 == a ? ($("#intAlteracoesPagina").val(0), $("#indexPaginacao").val(a), $("#ava_fluxoarticles").html(o)) : a > 1 && $("#ava_fluxoarticles").append(o), $("#ava_fluxoarticles #verMaisMensagens").remove();
        var e = $("#intAlteracoesPagina").val(),
            i = $("#idPostUnico").val();
        ajaxTimeLine = $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/TimeLine",
            data: {
                idGrupo: $("#idGrupo").val(),
                idAssunto: $("#hAssuntoTimeLine").val(),
                intPaginacao: a,
                intAlteracoesPagina: e,
                idPost: i
            },
            async: !0,
            success: function (o) {
                if ("0" != o && "-1" != o && "-2" != o) {
                    var e = $(o);
                    $("#indexPaginacao").val(a), 1 == a ? $("#ava_fluxoarticles").html(e) : ($("#loader_timeline").remove(), $("#ava_fluxoarticles").append(e)), $(".ctn_msg", e).expander(expanderOptions);
                    try {
                        $(".imagens_mural", e).GaleriaAva();
                        $(".imagens_mural").addClass("select");
                        $(".imagens_mural").prepend('<span class="ava_clips_seletor"></span>');
                    } catch (i) {
                        console.log("erro ao chamara galeria ava")
                    }
                    $(".iframeVideoVimeo", e).on("load", paginaEducacional_TratamentoVimeo)
                } else 1 == a && $("#ava_fluxoarticles").html("-1" == o ? '<article ide="0" class="clearfix"><div class="feed_fitro"><p>N�o h� resultados para o filtro aplicado.</p></div></article>' : "-2" == o ? '<article ide="0" class="clearfix"><div class="feed_fitro"><p>Ops!! Esta mensagem foi exclu�da. :( </p></div></article>' : '<article ide="0" class="clearfix"><div class="feed_fitro"><p>Nenhuma mensagem encontrada.</p></div></article>');
                $("#loader_timeline").remove()
            },
            error: function () {
                console.log("Ocorreu um erro ao carregar mural"), $("#loader_timeline").remove()
            }
        })
    }

    function retornaJsonPagina(a) {
                console.log('Tava na hora ');

        $.getJSON(a, null, function (a) {
            var o = null;
            o = a.Result, xmlGlobal = o, $("#myContentTemplate").tmpl(a).appendTo("#ava_contentlista"), $("#ava_contentlista #ava_loader").css("display", "none"), $("#txtFiltroAva").live("keyup", function (a) {
                return a.which && 13 == a.which || a.keyCode && 13 == a.keyCode ? (a.preventDefault(), !1) : (_id = $(this).attr("idusuario") ? $(this).attr("idusuario") : 0, void FiltrarUsuarioPagina("#ava_contentlista", o, $(this).val(), _id))
            }), $("#txtFiltroAva").live("focus", function () {
                "Filtrar por nome" == $(this).val() && $(this).val("")
            }), $("#txtFiltroAva").live("blur", function () {
                "" == $(this).val() && $(this).val("Filtrar por nome")
            })
        })
    }

    function FiltrarUsuarioPagina(a, o, e, i) {
        if ($(a).html(""), "" != $.trim(e)) {
            var t = !1;
            for (r = 0; r < o.length; r++)
                if ((o[r].strNome.toLowerCase().indexOf(e.toLowerCase()) > -1 || o[r].strApelido.toLowerCase().indexOf(e.toLowerCase()) > -1 || retira_acentos(o[r].strNome).toLowerCase().indexOf(e.toLowerCase()) > -1 || retira_acentos(o[r].strApelido).toLowerCase().indexOf(e.toLowerCase()) > -1) && o[r].id != i) {
                    t = !0;
                    var s = "";
                    s = populaFiltroPagina(o[r]), $(a).append(strBuilder)
                }
            if (!t) {
                var n = $("#titListaUsuariosAva").clone();
                n.find("span").remove();
                var l = n.text(),
                    u = "'" + e + "'";
                $(a).html('<span class="letter-spacing">Nenhum resultado encontrado na pesquisa de ' + l + '. Que tal pesquisar <a class="link" href="javascript: procurarpessoas(' + u + ')"> outros tipos de usu�rios?</a></span>')
            }
        } else
            for (r = 0; r < o.length; r++) {
                var s = "";
                if (o[r].id != i) {
                    var s = "";
                    s = populaFiltroPagina(o[r]), $(a).append(strBuilder)
                }
            }
    }

    function populaFiltroPagina(a) {
        var o = "";
        return strBuilder = '<div class="carteirinha" id="cart_' + a.id + '"><div class="in_cT">', a.bolEducador && (strBuilder += '<div class="souProf"><span>Professor</span></div>'), o = a.strFoto.length > 0 ? a.strFoto : "/AVA/StaticContent/Common/img/perfil/avatar.jpg", strNome = a.strApelido.length > 0 ? a.strApelido : a.strNome, strNome.lenght > 10 && (strNome = strNome.substring(0, 9)), strBuilder += '<a href="/AVA/Perfil/Home/Index/' + a.strLogin + '"><img src="' + o + '" width="55" height="55" alt="avatar"><span>' + strNome + "</span></a>", a.bolSigoAuto && a.idSeguidor != a.id ? strBuilder += '<a class=" bt_seguir s_IdoForever txtSeguindoBloqueadoModal" href="#">Seguindo<span class="fontello icoSeguindo"></span></a>' : a.bolPossoSeguir && !a.bolEstouSeguindo && a.idSeguidor != a.id ? strBuilder += '<a id="btseg_' + a.id + '" class="bt_seguir s_Indo" href="javascript: seguir(' + a.idSeguidor + "," + a.id + ')">seguir<span class="fontello icoSeguir"></span></a>' : a.bolPossoSeguir && a.bolEstouSeguindo && a.idSeguidor != a.id && (strBuilder += '<a id="btseg_' + a.id + '" href="javascript: parardeseguir(' + a.idSeguidor + "," + a.id + ')" class="bt_seguir"><span class="ava_seguindo"></span><span class="ava_parardeseguir">parar de seguir</span><span class="fontello icoPararSeguir"></span></a>'), strBuilder += "</div></div>"
    }

    function montarHtmlAlunos(a) {

        var srtHtml = '';
        var aux = '';
        var sourcesTwo = [];

        $(".alunos_turma_lista a").remove(), $(".alunos_turma_lista .clearfix").remove(), $(".alunos_turma_lista .feed_fitro").remove();
        var o = '';
        for (var e in a) {

            o += '<li><div id="aluno_img"><img src="' + a[e].strFoto + '" alt="Foto" height="auto" width="75"/> </div> <div class="nome_usuario">' + a[e].strApelido + "</div>" +
                '<div id="aluno_perfil"><a class="aluno_lista_perfil" href="/AVA/Perfil/Home/Index/' + a[e].strLogin + '">Ver perfil</a></div></li>';
                // '<div id="aluno_perfil"><a class="aluno_lista_perfil" href="/AVA/Perfil/Home/Index/' + a[e].strLogin + '">Ver perfil</a></div><button type="button" id="btnSeguir">Seguir</button></li>';
                
            // '<div id="aluno_seguir"><button type="button">Seguir</button></div>';

        }

        sourcesTwo.push(o);


        var options = {
            dataSource: sourcesTwo,
            callback: function (response, paginationturmaaluno) {

                var dataHtml = '<div class="listaAlunos">';

                $.each(response, function (index, item) {


                    dataHtml += '<ul>' + item + '</ul>';
                });
                dataHtml += '</div>';



                $('#pagination-aluno').prev().html(dataHtml);

                // $('.data-container-aluno').html(dataHtml);
            }
        };



        $('#pagination-aluno').paginationturmaaluno(options);

    }

    function carregarGaleriaTurma(a) {
        a = parseInt(a), null != ajaxGaleriaTurma && ajaxGaleriaTurma.abort();
        var o = $("#hGaleriaMidiaTipo").val(),
            e = $("#hMesGaleriaTurmaFiltrado").val(),
            i = $("#hAssuntoGaleriaTurmaFiltrado").val(),
            r = '<div id="loader_galeria" style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>';
        a > 1 ? $("#lista_item_galeria").append(r) : (a = 1, $("#lista_item_galeria").html(r)), ajaxGaleriaTurma = $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/GaleriaTurma",
            data: {
                idGrupo: $("#idGrupo").val(),
                idAssunto: i,
                intPaginacao: a,
                intMes: e,
                intTipoMidia: o,
                idMateria: disciplinaSelecionada
            },
            async: !0,
            success: function (o) {
                ListarDisciplinas("id_materia_galeria");
                if ("0" != o && "-1" != o && 0 != o && -1 != o) {
                    var e = $(o);
                    $("#hPaginacaoGaleriaTurma").val(a), 1 == a ? $("#lista_item_galeria").html(e) : ($("#loader_galeria").remove(), $("#lista_item_galeria").append(e));
                    try {
                        $(".imagens_mural").addClass("select");
                        $(".imagens_mural").prepend('<span class="ava_clips_galeria_off"></span>');
                        // $('#SelecionarTodos').hide();
                        globalSelecionados = false;
                        
                    } catch (i) {
                        console.log("erro ao chamara galeria ava")
                    }
                    $(".iframeVideoVimeo", e).on("load", paginaEducacional_TratamentoVimeo), $(".item_galeria_arquivos", e).mCustomScrollbar()
                } else 1 == a && $("#lista_item_galeria").html("-1" == o || -1 == o ? '<div class="feed_fitro"><p>N�o h� resultados para o filtro aplicado.</p></div>' : '<div class="feed_fitro"><p>Nenhuma mensagem encontrada.</p></div>');
                $("#loader_galeria").remove();
                $("#galeria_rodape").hide();

                $(".imagens_mural").click(function(){
                    var idPost = $(this).attr('data-idPost');
                    var f = $(this).attr("idArquivo");
                    var b = false;
                    var arrayIdsArquivos = [];
                    var arrayArquivosDownload = [];
                    $(this).find("a").each(function(index, value){
                        arrayIdsArquivos.push($(this).attr("data-idarquivo"));
                        arrayArquivosDownload.push($(this).attr("data-path"));
                    });

                    if (arraySelecionados.length > 0) {
                        for (var c = 0; c < arraySelecionados.length; c++) {
                            if (idPost == arraySelecionados[c].IdPost) {
                                $(this).removeClass("select");
/*                                $(this).children("span").remove();*/
                                removeItem(arraySelecionados, idPost);
                                arraySelecionadosHtml.splice(c, 1);
                                b = true
                            }
                        }
                        if (!b) {
                            arraySelecionados.push({
                                "IdPost" : idPost,
                                "IdArquivos" : arrayIdsArquivos,
                                "pathArquivos" : arrayArquivosDownload
                            });

                            $(this).removeClass("select");
                            $(this).children("span").remove();
                            //--
                            $(this).find("span").remove();
    
                            $(this).addClass("select");
                            $(this).prepend('<span class="ava_clips_galeria"></span>');
                            $('#SelecionarTodos').show();
                            arraySelecionadosHtml.push($(this)[0].outerHTML)
                        }
                        else {
                            $(this).removeClass("select");
                            $(this).children("span").remove();
                            //--
                            $(this).find("span").remove();
                            $(this).addClass("select");
                            $(this).prepend('<span class="ava_clips_galeria_off"></span>');

                            if(  arraySelecionados.length == 0 ){
                                $('#SelecionarTodos').hide();
                            }
                        }
                        
                    } else {
                        arraySelecionados.push({
                            "IdPost" : idPost,
                            "IdArquivos" : arrayIdsArquivos,
                            "pathArquivos" : arrayArquivosDownload
                        });
                        $(this).removeClass("select");
                        $(this).children("span").remove();
                        $(this).find("span").remove();
    
                        $(this).addClass("select");
                        $(this).prepend('<span class="ava_clips_galeria"></span>');

                        $('#SelecionarTodos').show();

                        arraySelecionadosHtml.push($(this)[0].outerHTML)
                    }

                    if (arraySelecionados.length > 0) {
                        $(".arquivoSelecionado").slideDown()
                    }
                    if (arraySelecionados.length > 0 && globalSelecionados) {
                        VisualizaSelecionados()
                    }
                    if (arraySelecionados.length == 0) {
                        $(".arquivoSelecionado").slideUp();
                        $("#galeria_rodape").hide();
                        if (globalSelecionados) {
                            ListaArquivosBiblioteca(a, 0)
                        }
                        $(".menu_arquivos").removeClass("active");
                        $(".count_total").addClass("active")
                    } else {
                        $(".arquivoSelecionado p").html(
                            "<strong>" + arraySelecionados.length + "</strong> arquivo(s) selecionado(s)"
                        );
                        
                        $("#galeria_rodape").show();
                        // $('#excluir_file').hide();
                    }

                    // if(    ){
                    //     $('#excluir_file').hide();
                    // }

                });


            },
            error: function () {
                console.log("Ocorreu um erro ao galeria ======= ***** "), $("#loader_galeria").remove()
            }
        })
    }

    function cancelarFiltrosGaleria() {
        $("#hMesGaleriaTurmaFiltrado").val(0), $("#hAssuntoGaleriaTurmaFiltrado").val(0), $("section.galeria_da_turma li").removeClass("ativo"), $("section.galeria_da_turma li[midiaTipo=0]").addClass("ativo"), $("#hGaleriaMidiaTipo").val(0), $("#hAssuntoGaleriaTurma").val(0), $("#cbAssuntoGaleriaTurma input[type=checkbox]").removeAttr("checked"), $("#ckAssuntoGaleriaTurma0").attr("checked", "checked");
        var a = $("#cbAssuntoGaleriaTurma li[assu=0] label").text() + '<span class="caret"></span>';
        $("#txtAssuntoGaleriaTurma").html(a), $("#cbAssuntoGaleriaTurma").parent().removeClass("open"), $("#hMesGaleriaTurma").val(0), $("#cbMesGaleriaTurma input[type=checkbox]").removeAttr("checked"), $("#ckMesGaleriaTurma0").attr("checked", "checked"), a = $("#cbMesGaleriaTurma li[mes=0] label").text() + '<span class="caret"></span>', $("#txtMesGaleriaTurma").html(a), $("#cbMesGaleriaTurma").parent().removeClass("open")
    }

    function verificaSePodeAcessarGaleria() {

        // alert( objConfiguracoes.bolAlunoImagem );
        

        $(".barra_topo_itens a.galeria_turma").length && $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/PodeVerGaleriaTurma",
            data: {
                idGrupo: $("#idGrupo").val()
            },
            async: !0,
            success: function (a) {
                "1" == a || 1 == a ? $(".barra_topo_itens a.galeria_turma").parent().show() : $(".barra_topo_itens a.galeria_turma").parent().hide()
            },
            error: function () {
                console.log("Ocorreu um erro ao verificar galeria")
            }
        })
    }

    function salvarConfiguracoesGrupoTurma(a) {


        var xt = $("#filedrag_grupo").is(":checked");


        if (!$(".configuracoes_grupo .ultima_alteracao .btn_cor").hasClass("disable")) {
            $(".configuracoes_grupo .ultima_alteracao .btn_cor").addClass("disable");
            var o = {
                idGrupo: $("#idGrupo").val(),
                strFoto: $("#srcFotoGrupo").val(),
                strApelido: $.trim($(".configuracoes_grupo .dados_turma input").val()),
                strDescricao: $(".configuracoes_grupo .dados_turma textarea").val(),
                bolAlunoImagem: $("#imagens_grupo").is(":checked"),
                bolAlunoVideo: $("#videos_grupo").is(":checked"),
                bolAlunoArquivo: $("#arquivos_grupo").is(":checked"),
                bolGrupoAtivo: $("#ativar_grupo").is(":checked"),
                bolAlunoDragDrop: $("#filedrag_grupo").is(":checked"),
                idArquivo: idArquivoFoto


            };
            $.ajax({
                url: "/AVA/Turma/Home/SalvarConfiguracoesGrupo/",
                type: "POST",
                dataType: "json",
                async: a,
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                data: o,
                success: function (a) {
                    if ("0" != a) {
                        var e = jQuery.parseJSON(JSON.stringify(a));
                        "s" == e.ErroAoSalvarArquivo && ($("#srcFotoGrupo").val(objConfiguracoes.strFoto), o.strFoto = objConfiguracoes.strFoto, alert("N�o foi possivel alterar a foto")), $.jStorage.flush(), $.ajax({
                            url: "/AVA/Barras/Home/LimparCacheBarras/",
                            type: "POST",
                            success: function () {
                                objConfiguracoes.bolGrupoAtivo != o.bolGrupoAtivo ? document.location.href = $("#strLinkGrupo").val() : (objConfiguracoes = o, novoHtmlConfiguracoes(o, a.NomeModeradorAlteracao, a.DtmModeradorAlteracao)), idArquivoFoto = 0
                            },
                            error: function () {
                                console.log("Erro ao remover cache barras"), objConfiguracoes.bolGrupoAtivo != o.bolGrupoAtivo ? document.location.href = $("#strLinkGrupo").val() : (objConfiguracoes = o, novoHtmlConfiguracoes(o, a.NomeModeradorAlteracao, a.DtmModeradorAlteracao)), idArquivoFoto = 0
                            }
                        })
                    }
                    bolFezAlteracaoConfiguracoes = !1
                },
                error: function () {
                    console.log("Ocorreu ao salvar configura��es"), bolFezAlteracaoConfiguracoes = !1
                }
            })
        }
        return !1
    }

    function novoHtmlConfiguracoes(a, o, e) {
        var i = $.trim(decodeURIComponent(a.strApelido));
        0 == i.length && (i = $("#strNomeTurma").val()), $(".configuracoes_grupo .ultima_alteracao .btn_cor").removeClass("disable");
        var r = '<p style="display:none;">Ultima altera��o realizada por<br/><strong>' + o + "</strong> em <strong>" + e + "</strong></p>";
        $(".configuracoes_grupo .ultima_alteracao p").remove(), $(".configuracoes_grupo .ultima_alteracao").prepend(r), $(".configuracoes_grupo .ultima_alteracao p").fadeIn(), $("#ava_sobreaturma .desc_turma img").attr("src", a.strFoto), $("#ava_sobreaturma .desc_turma h3").text(i), $("#ava_sobreaturma .desc_turma p").text(decodeURIComponent(a.strDescricao)), $(".configuracoes_grupo .trocar_foto img").attr("src", a.strFoto), $(".menu_topo .apelido_turma").text(i)
        location.reload();
    }

    function abreUploadGrupos(o) {

        $.fancybox.showLoading();

        console.log('file -> grupoturmas | func -> abreUploadGrupos');

        $('div.ui-dialog').remove();

        $("#previewTrocaFotoTurma").dialog({
            autoOpen: false,
            height: 680,
            width: 900,
            modal: true,
            resizable: false,
            draggable: false,
            open: function (event, ui) {
                $(this).parent().find(".ui-dialog-titlebar").hide();
                $(this).parent().find(".ui-dialog-buttonpane").hide();
            },
        });

        var i = idFerramentaTipoTrocarFotoGrupo,

        r = {
            idFerramenta: o,
            idFerramentaTipo: i
        };

        var w;
        try {
            w = document.createElement("<form name='Upload'>")
        } catch (q) {
            w = document.createElement("form");
            w.name = "Upload"
        }

        for (var s in r)
            if (r.hasOwnProperty(s)) {
                var n = document.createElement("input");
                n.type = "hidden";
                n.name = s;
                n.value = r[s];
                w.appendChild(n)
            }

        w.target = "Upload";
        w.method = "POST";
        w.action = "/AVA/Upload";
        document.body.appendChild(w);

        var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        if (Modernizr.touch) {
            parametros = null;
        }

        $("#previewTrocaFotoTurma iframe").remove();

        $("#previewTrocaFotoTurma").append('<iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;"></iframe>');

        $("#previewTrocaFotoTurma iframe").append(w);
        w.submit();
        $("#previewTrocaFotoTurma").dialog("open");
        $.fancybox.hideLoading();

        w.submit();
        console.log('foi')
        
    }

        
    function CallbackUploadFotoGrupo(dados){
        var idGrupo = $('#idGrupo').val();

        console.log(idGrupo);
        console.log(JSON.stringify(dados));

        $.ajax({
            url: "/AVA/Grupo/Home/SalvaFotoGrupo",
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                idGrupo: idGrupo,
                idArquivo: dados.arquivo.idArquivo,
                srcImagem: dados.arquivo.path
            },
            success: function(a) {
            
                $.fancybox.hideLoading();
                $('#form_configuracoesturma div.trocar_foto img').attr('src', a);
                $("#previewTrocaFotoTurma").dialog("close");
            },
            error: function(a) {
                $.fancybox.hideLoading()
            }
        })
    }


    function carregarDenuncias() {
        null != ajaxDenuncias && ajaxDenuncias.abort(), $("#box_ListarDenuncia tbody").html('<tr><td colspan="5"><div style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div></td></tr>'), ajaxDenuncias = $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/Denuncias",
            data: {
                idGrupo: $("#idGrupo").val(),
                bolResolvidos: $("#estado_denuncia_resolvido").is(":checked"),
                strBusca: $.trim($("#usuario_filtro_denuncia").val())
            },
            async: !0,
            success: function (a) {
                $("#box_ListarDenuncia tbody").html(a)
            },
            error: function () {
                console.log("Ocorreu um erro ao carregar denuncias")
            }
        })
    }

    function alteraStatusDenuncia(a, o) {
        o = 1 == o, $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/AlterarStatusDenuncia",
            data: {
                idDenuncia: a,
                bolPendente: o
            },
            async: !0,
            success: function () {
                o ? $("#tr_denuncia_" + a).slideUp().remove() : ($("#estado_denuncia_pendente").attr("checked", "checked"), $("#box_ListarDenuncia .btAbreFechaFiltro").html('Fechar<span class="aberto"></span>'), $("#box_ListarDenuncia .boxFiltro").show(), $("#usuario_filtro_denuncia").val(""), carregarDenuncias())
            },
            error: function () {
                console.log("Ocorreu um erro ao salvar status")
            }
        })
    }

    function agendarTarefaRapida() {
        $("#strTituloTarefa").val($("#strTituloTarefa").val().trim());
        $("#txtDescricaoTarefa").val($("#txtDescricaoTarefa").val().trim());
        var strTituloTarefa = $("#strTituloTarefa").val();
        var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();
            
        strTituloTarefa = $("<div />").text(strTituloTarefa).html();
        txtDescricaoTarefa = $("<div />").text(txtDescricaoTarefa).html();
    
        if (strTituloTarefa == "" || strTituloTarefa == "Título da Tarefa") {
            $("#strTituloTarefa").addClass('alerta');
            $('#feedErroTituloTarefa').show();
            $('html, body').animate({
                scrollTop: $("#frmMensagemRapida").offset().top - 115
            }, 1000);
            return false;
        }
        else {
            $("#strTituloTarefa").removeClass('alerta');
            $('#feedErroTituloTarefa').hide();
        }
    
        /*
        if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
            $("#feed_erro_tarefa").show();
            $('#seletorMuralTarefa .seletor_lista').addClass("alerta");
            $("#seletorMuralTarefa").AvaSelector("focus");
            return false;
        }
        else {
            $('#seletorMuralTarefa .seletor_lista').removeClass("alerta");
        }
        */
    
        var intValorEtapa = 0;
    
        if ($('#valeNota').hasClass('ativo')) {
            intValorEtapa = $("#intValorTarefa").val().replace(".", ",");
            if (intValorEtapa == "" || intValorEtapa == "Valor") {
                $('html, body').animate({
                    scrollTop: $("#intValorTarefa").offset().top - 200
                }, 800);
                $("#intValorTarefa").addClass("alerta");
                return false;
            }
            else {
                $("#intValorTarefa").removeClass("alerta");
            }
        }
    
        var idCaminho = $("#idCaminho").val();
        if (idCaminho == "" || idCaminho == undefined) {
            idCaminho = 0;
        }
        var intStatus = 2;
        $('input:radio[name=rTipo]').each(function () {
            if ($(this).is(':checked'))
                intStatus = parseInt($(this).val());
        });
    
    
        var objArray = new Array();
        // Salvar arquivo ferramenta
        // Array de arquivos - Novo Upload
        var arrayArquivos = arrayArquivosUpload;
        if (arrayArquivos == undefined || arrayArquivos == '' || arrayArquivos == null) {
            arrayArquivos = '';
            var jsonReturnFinal = null;
        } else {
            for (var i = 0; i < arrayArquivos.arrayArquivo.length; i++) {
                objArray.push(arrayArquivos.arrayArquivo[i].id);
            }
            var jsonReturnFinal = {
                'idFerramentaTipo': arrayArquivos.idFerramentaTipo,
                'idFerramenta': arrayArquivos.idFerramenta,
                'arquivos': objArray
            };
        }
    
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarCaminho/",
            data: {
                idRota: idCaminho,
                idUsuario: 0,
                strTitulo: strTituloTarefa,
                strDescricao: txtDescricaoTarefa,
                intStatus: intStatus,
                strTags: "",
                intTipo: 2,
                json: JSON.stringify(jsonReturnFinal)
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (caminho) {
    
                $("#idCaminho").val(caminho);
    
                var idEtapa = $("#idEtapa").val();
                if (idEtapa == "" || idEtapa == undefined) {
                    idEtapa = 0;
                }
    
                var bolEntrega = false;
    
                if ($("#entrega_tarefa").attr('checked')) {
                    bolEntrega = true;
                }
    
                $.ajax({
                    url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                    data: {
                        idCaminho: caminho,
                        idEtapa: idEtapa,
                        intValor: intValorEtapa,
                        solicitaEntrega: bolEntrega
                    },
                    type: "POST",
                    success: function (idEtapa) {
                        $("#idEtapa").val(idEtapa);
    
                        //****************************AGENDAMENTO**************************************//
                        var dataInicio = $("#dataInicio").val();
                        var dataFim = $("#dataFim").val();
                        var horaInicio = $("#horaInicio").val();
                        var horaFim = $("#horaFim").val();
    
                        var strMensagem = validaAgendamento(dataInicio, dataFim, horaInicio, horaFim);
                        
                        if (strMensagem == "ok") {
                            concluirAgendamentoTarefaRapidaMuralNew(strTituloTarefa, txtDescricaoTarefa, caminho, dataInicio, dataFim, horaInicio, horaFim, idEtapa);
                            //toastr.success('Tarefa criada com sucesso.', 'Sucesso', {timeOut: 3000, positionClass: "toast-top-center", closeButton: true});
                            /*
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/SalvarCaminho/",
                                data: {
                                    'idCaminho': caminho,
                                    'dataInicio': dataInicio,
                                    'horaInicio': horaInicio,
                                    'dataFim': dataFim,
                                    'horaFim': horaFim,
                                    'bolTarefaGrupo': false
                                },
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function (data) {
                                    concluirAgendamentoTarefaRapidaMuralNew(strTituloTarefa, txtDescricaoTarefa, caminho, dataInicio, dataFim, horaInicio, horaFim, idEtapa);
                                    //toastr.success('Tarefa criada com sucesso.', 'Sucesso', {timeOut: 3000, positionClass: "toast-top-center", closeButton: true});
                                },
                                error: function (data) {
                                    if (data.status != 0) {
                                        console.debug("erro ao salvar tarefa rápida!");
                                    }
                                }
    
                            });
                            */
                            $.fancybox();
                            return false;
    
                        } else if (strMensagem == "erro") {
                            return false;
                        } else {
                            alert(strMensagem)
                        }
                        //**************************** FIM AGENDAMENTO*********************************//
    
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao salvar tarefa rápida!");
                        }
                    }
                });
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao salvar caminho rápido!");
                }
            }
        });
    }

    /******* TIMELINE IMAGEM *********/
    function concluirAgendamentoTarefaRapidaMuralNew(txtTitulo, strComplemento, idCaminho, dataInicio, dataFim, horaInicio, horaFim, idEtapa) {
        console.log("concluirAgendamentoTarefaRapidaMuralNew grupoturma ");
        var txtDisponivel = "Disponivel  de " + dataInicio + " " + horaInicio + " ate " + dataFim + " " + horaFim;
        $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");

        if (strComplemento == "")
            var txtInput = txtTitulo + txtDisponivel;
        else
            var txtInput = txtTitulo + "<br> " + strComplemento + ". " + txtDisponivel;

        $("#txtInput").val(txtInput);
        var idAvaliacao = $("#idAvaliacao").val();

        $.ajax({
            type: "POST",
            async: false,
            url: "/AVA/Caminhos/Home/MontaDestinoAgendamento",
            data: {
                "usuario": JSON.stringify(arrayUsuariosAux),
                "grupo": JSON.stringify(arrayGrupoAux)
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (usuarios_turmas) {
                var vetDestino = usuarios_turmas.split('|');

                var strMensagemErroAgendamento = "";
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirAgendamento",
                    data: {
                        idRotaAgendamento: 0,
                        idCaminho: idCaminho,
                        dataInicio: dataInicio,
                        horaInicio: horaInicio,
                        dataFim: dataFim,
                        horaFim: horaFim,
                        strComplemento: strComplemento,
                        usuario: JSON.stringify(arrayUsuariosAux),
                        grupo: JSON.stringify(arrayGrupoAux),//todo:::
                        strUsuariosDestino: vetDestino[0],
                        strTurmasDestino: vetDestino[1]
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (idRotaAgendamentoAux) {
                        strMensagemErroAgendamento = idRotaAgendamentoAux;
                        
                        if (isNumeric(idRotaAgendamentoAux)) { //verifica se não deu erro no agendamento

                            try{
                                salvarMensagemRapidaGrupo($("#idGrupo").val(), $('#idFerramentaTipo').val(), 17, idEtapa, txtInput, "", $('#hAssuntoPost').val(), disciplinaSelecionada);
                            }
                            catch(err){
                                console.log(err);
                            }

                            arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                            arrayGrupoAux.splice(0, arrayGrupoAux.length);
                            // abrirCriarTarefa(); :::
                            $("#strTituloTarefa").val("");
                            $("#txtDescricaoTarefa").val("");
                        } else {
                            $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoTarefaRapidaMural()"><span></span>Enviar Agendamento</a>');
                            return false;
                        }
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao inserir agendamento!");
                        }
                    }
                });
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao montar destino de agendamento!");
                }
            }
        });         //ajax monta destino
    }
    
    function salvarMensagemRapidaGrupo(idGrupo, idFerramentaTipo, idFerramenta, idEtapa, strMensagem, strUsuarios, idAssunto, idMateria) {

        $.ajax({
            type: "POST",
            url: "/AVA/Grupo/Home/SalvarMensagemTarefa",
            // url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
            data: {
                strUsuarios: strUsuarios,
                idGrupo: idGrupo,
                idFerramentaTipo: idFerramentaTipo,
                idFerramenta: idFerramenta,
                idEtapa: idEtapa,
                strMensagem: strMensagem
                // ,
                // idAssunto: idAssunto,
                // idMateria: idMateria
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (idMensagemRapida) {
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "900",
                    "hideDuration": "1000",
                    "timeOut": "9000",
                    "extendedTimeOut": "9000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                Command: toastr["success"]("Seus alunos j&aacute; podem visualizar esta tarefa.", "Tarefa publicada com sucesso!")
                $.ajax({
                    type: "POST",
                    url: "/AVA/Turma/Home/RetornaMensagemRapidaTurma",                    
                    data: {
                        idMensagemRapida: idMensagemRapida
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        var e = $(data);
                        $("#ava_fluxoarticles article[ide=0]").slideUp();
                        $("#ava_fluxoarticles").prepend(e);

                        var timelineFiltroValueH = $('#hTipoDePostMural').val();
                        $.fancybox.close();
                        $('#txtInput').val("");
                        $('#txtInput').css("height", "48px");
                        $('#txtInput').siblings(":last").html('');
                        $('.actions[pos=1]').click();
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao retornar feed user!");
                        }
                    }
                });

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao salvar mensagem rápida!");
                }
            }
        });
    }

    function abrirCriarTarefa() {
        $('#blocoDigaLa').hide();
        $('#menu_diga_la').removeClass('ativo');
        $('#menu_criar_tarefa').addClass('ativo');
        $('#area_criar_tarefa').show();

        arrayUsuariosAux = new Array();
        arrayGrupoAux = new Array();

        // Remove os arquivos do diga lá.
        limpaArrayArquivosTimeLine();
        //limpaPreviewArquivosDigaLa();
        //limpaPreviewImagemMensagemRapida();
        //limpaArrayImagensTimeLine();



        //remove o vídeo
        $("#container_preview_video").fadeOut('slow', function () {
            $(this).html("");
            $('.enviar_video').hide();
        });
        $(".dialogo_multimidia").hide();
        $('#erro_enviar_video').hide();

        arrayArquivosUpload = undefined;

        $("#btnCancelarFerramentaMural").hide();
        $("#seletorMuralTarefa").show();
        $("#seletorMuralDigaLa").hide();

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/AbreCriarTarefaRapidaNovaHome/",
            success: function (data) {

                $('#criarTarefaCarregando').remove();

                $('#area_criar_tarefa .load').hide();
                $('#area_criar_tarefa').html(data);

                if (data.indexOf("Você não tem turmas associadas") != -1) {
                    $('#area_criar_tarefa').removeClass('bloco_tarefa').addClass('bloco_dialogo');
                    return;
                }
                // ....
                $('#visualizar').show();
                if ($("#strTituloTarefa").val() !== undefined) {
                    $('.compartilhamento').find("li:first").text("Agendar para:");
                    $('#compartilhar').hide();
                    $('#agendar').show();
                    $('#agendarNovo').show();
                    $('.selecao_personas').find("li:first").text("Selecione turmas e pessoas");
                } else {
                    $('#compartilhar').hide();
                }

                $('.ph').addPlaceholder();

                $("#strTituloTarefa").live('focus', function () {
                    $(this).removeClass('ava_field_alert');
                })

                $("#intValorTarefa").focus(function () {
                    $(this).removeClass("alerta");
                })

                $(".tooltip_title").tooltip({
                    offset: [-10, 0]
                });

                $('#valeNota').click(function () {
                    if ($('#valeNota').attr('disabled') == 'disabled')
                        return;
                    if ($('#valeNota').hasClass("ativo")) {
                        $('#valeNota').removeClass("ativo");
                        $('#intValorTarefa').prop("disabled", true);
                        $("#intValorTarefa").val('');
                        $("#intValorTarefa").focus();
                    }
                    else {
                        $('#valeNota').addClass("ativo");
                        $('#intValorTarefa').prop("disabled", false);
                    }
                });

                $('#trf_devolutiva').click(function () {
                    if ($('#trf_devolutiva').hasClass("ativo")) {
                        $('#trf_devolutiva').removeClass("ativo");
                    }
                    else {
                        $('#trf_devolutiva').addClass("ativo");
                    }
                });

                //Mascaras
                $('#dataInicio').setMask('date'); // data
                $('#dataFim').setMask('date'); // data
                $('#horaInicio').setMask('29:59').timepicker({
                    myPosition: 'right top',
                    atPosition: 'right bottom'
                }); // hora
                $('#horaFim').setMask('29:59').timepicker({
                    myPosition: 'right top',
                    atPosition: 'right bottom'
                }); // hora
                //$('#intValorTarefa').setMask('99,9');
                $('#intValorTarefa').digitosDouble();

                //Carrega os calendarios para data de inicio e fim do agendamento
                montaCampoData('#dataInicio', '#dataFim');

                $("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function () {
                    $(this).removeClass("ava_field_alert");
                })

                $('#txtDescricaoTarefa').limit('1000', '');
                if (data.indexOf("Você não tem turmas associadas") == -1 //&& !($("#seletorMuralTarefa").AvaSelector("bolInstanciado"))
                        ) {
                    /*
                    $("#seletorMuralTarefa").AvaSelector({
                        bolProfessor: false,
                        bolLajota: true,
                        bolSeguidores: false,
                        bolAluno: true,
                        botaoConclusao: $("#agendar"),
                        strTitulo: "Agendar para:",
                        btnTextoBotaoConclusaoSeletor: "Adicionar",
                        bolSeletorFinalizar: false,
                        bolCoordenador: false,
                        usuarioGrupoAdicionado: function (u, g, seletor) {
                            arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                            arrayGrupoAux.splice(0, arrayGrupoAux.length);
                            for (var i = 0; i < u.length; i++) {
                                arrayUsuariosAux.push(u[i]);
                            }
                            for (var i = 0; i < g.length; i++) {
                                arrayGrupoAux.push(g[i]);
                            }
                            if (arrayUsuariosAux.length > 0 || arrayGrupoAux.length > 0) {
                                $("#feed_erro_tarefa").hide();
                                $("#erro_agendar_participante").hide();
                                $(".seletorGlobal .seletor_lista").removeClass("ava_field_alert");
                            };
                        }
                    });
                    */

                    $("#seletorMuralTarefa").show();
                    instanciaSeletorMuralTarefa = true;

                    $('#seletorMuralTarefa .seletor_lista input').attr("placeholder", "Agendar para...");
                    $('#seletorMuralTarefa h1').first().remove();

                }
            },
            error: function (data) {
                if (data.status != 0) {
                    console.log("Erro ao carregar tarefa rápida.");
                }
            }
        });
    }''


    function PrepararTimeLine() {

        // alert("TOp");

        $(".menu_topo .apelido_turma").parent().hasClass("active") || ($("section.dialogo .actions").removeClass("current"), 
        $("section.dialogo .actions[pos=0]").addClass("current"), 
        $("section.dialogo .dialogo_box").show(), 
        $("section.dialogo .mensagem_multimidia").show(), 
        $("#btnCancelarFerramentaMural").show(), 
        $("#visualizarPost").show(), 
        $("section.dialogo .container_tarefas").hide().html(""), 
        //$("#filtros_categoria").show(), 
        $("#agendar").hide(),
        //$("#agendarNovo").hide(),
        $(".barra_topo_itens .menu_topo li").removeClass("active"),
        $(".barra_topo_itens .menu_topo .apelido_turma").parent().addClass("active"), 
        $("section.configuracoes_grupo").hide(), $("#ava_sobreaturma").hide(), 
        $("section.galeria_da_turma").hide(), 
        $("#txtAssuntoTimeLine").closest(".bootstrap").show(), 
        $("#ava_mural_geral section.dialogo").show(), 
        $("#idPostUnico").val("0"), 
        $("#ava_mural_geral").show(), 
        $("#ava_barralateral-direita").show(), 
        resetarFiltroMural(), 
        paginaEducacional_CancelarDigaLaClick(), 
        paginaEducacional_CarregarMural(1), 
        //carregarAtividades(),
        carregarAtividadesFilhos(0), 
        $(".bcs1").show(), 
        $("#ativ_lista_normal_turma").hide())





    }

    
    function grupoTurma_PrepararSobreInicio() {
        $("#ava_mural_geral").length || ($(".barra_topo_itens a.sobre_turma").parent().addClass("active"), PrepararSobre(), $("#ativ_lista_normal_turma").hide())
    }

    function PrepararSobre() {
        $(".barra_topo_itens .menu_topo li .sobre_turma").parent().hasClass("active") ? $("#ava_sobreaturma").show() : ($(".barra_topo_itens .menu_topo li").removeClass("active"), $(".barra_topo_itens .menu_topo li .sobre_turma").parent().addClass("active"), $("section.configuracoes_grupo").hide(), $("#ava_mural_geral").hide(), $("#ava_barralateral-direita").hide(), $("section.galeria_da_turma").hide(), $("#pesquisa_aluno_input").val(""), montarHtmlAlunos(jsonAlunosGrupoTurma), $("#ava_sobreaturma").show(), $("#ativ_lista_normal_turma").hide())
        // $(".barra_topo_itens .menu_topo li .sobre_turma").parent().hasClass("active") ? $("#ava_sobreaturma").show() : ($(".barra_topo_itens .menu_topo li").removeClass("active"), $(".barra_topo_itens .menu_topo li .sobre_turma").parent().addClass("active"), $("section.configuracoes_grupo").hide(), $("#ava_mural_geral").hide(), $("#ava_barralateral-direita").hide(), $("section.galeria_da_turma").hide(), $("#pesquisa_aluno_input").val(""),$("#pesquisa_professor_input").val("") ,$("#ava_sobreaturma").show())

    }

    function PrepararAtividade() {
        console.log("ListaAtividadesTurma 2");
        
        var aux = '';
        var sources = [];

        var aprimora_icon = "/AVA/StaticContent/Common/img/geral/atividade_ico_apr.png";
        var educ_icon = "/AVA/StaticContent/Common/img/geral/atividade_ico_educ.png";

        ($(".barra_topo_itens .menu_topo li").removeClass("active"), $(".barra_topo_itens .menu_topo li .atividade_turma").parent().addClass("active"), $("section.configuracoes_grupo").hide(), $("#ava_mural_geral").hide(), $("#ava_barralateral-direita").hide(), $("#ava_sobreaturma").hide(), $("section.galeria_da_turma .filtro_galeria .link_botao").hide(), cancelarFiltrosGaleria(), $("section.atividade_da_turma").show(), $("section.galeria_da_turma").hide())


        bolCPPuro || $("#ativ_lista_normal_turma").length && (null != ajaxCarregarAtividades && ajaxCarregarAtividades.abort(), $("#ativ_lista_normal_turma .boxScroll").remove(), $("#ativ_lista_normal_turma header").after('<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" style="margin: 5px 186px 10px;" class="loaderAtividades" />').show(), ajaxCarregarAtividades = $.ajax({
            type: "GET",
            url: "/AVA/Turma/Home/ListaAtividadesTurma/",
            data: {
                idGrupo: $("#idGrupo").val(),
                idMateria: 0
            },
            async: !0,
            success: function (a) {

                $.ajax({

                    type:"GET",
                    url:"/AVA/Barras/Home/GetDadosUserLogado/",
                    success: function(dadosUsuario){



                        console.log('Dados usuário:');

                        console.log( JSON.stringify( dadosUsuario  ) );

                        if (a.Result.length > 0) {                   
                            var urlTarefa = '';
                            var tarefaPrivada = '';
                            $.each(a.Result, function (ix, item) {
                                if (item.bolEncerrou != true) {
                                    srt = ' <div  id="atividadesturma" class="atividadesturma"> ' +
                                        '<div id="atividadesturma-header" class="atividadesturma-header">' +
                                        '<img src="' + item.strFoto + '" />' +
                                        '<label id="atividadesturma-header-nomeprofessor">Professor' + item.strNomePessoa + '</label>' +

                                        '</div>' +

                                        '<div id="atividadesturma-body" class="atividadesturma-body">' +

                                        '<div id="systemIcon">';
                                    
                                    try{

                                        if (item.strTipo.indexOf("tarefa") == 0) {
                                            srt += '<img src="' + educ_icon + '" />';
                                        }
                                        else {
                                            srt += '<img src="' + aprimora_icon + '" />';
                                        }
                                    }
                                    catch(err){
                                        // srt += '<img src="' + educ_icon + '" />';
                                    }

                                    if(dadosUsuario.bolAluno ==  true){

                                    srt += '</div>' +
                                        '  <div class="atividadesturma-body-conteudo" id="atividadesturma-body-conteudo" >' +

                                        '  <a> <label  id="systemNome">#Tarefa</label></a>' +
                                        '<p> ' + item.strDtmInicio + ' a ' + item.strDtmFim + '  </p>' +


                                        ' <h3 id="atividadeNome"><strong> <a href="/AVA/Caminhos/Home/Player/' + item.idRotaAgendamento + '/' + item.idRota + '" > ' + item.strTitulo + '</strong></a></h3>  ' +
                                        '  <a href="/AVA/Perfil/Home/Index/' + item.strLogin + '"><label id="atividadesdodia_professor">Professor(a):' + item.strNomePessoa + '  </label></a>' +

                                        '<div id="Disciplina">' +
                                        '<p>Disciplina:' + item.strMateria + ' </p>' +
                                        '</div>'

                                    ' </div>' +

                                        ' </div>' +



                                        '</div><hr>';
                                    }
                                    else{

                                        urlTarefa = '/AVA/Caminhos/home/index/1';
                                        tarefaPrivada = '';

                                        if (parseInt(item.idPessoa) == dadosUsuario.Usuario.id) {
                                            urlTarefa = '/AVA/Caminhos/home/agendamento/'+item.idRotaAgendamento;
                                        }
                                        else if(item.intStatusTarefa == 1){ // tarefa do tipo aberta-compartilhada
                                            urlTarefa = '/AVA/Caminhos/home/agendamento/'+item.idRotaAgendamento;
                                        }
                                        else if (dadosUsuario.papel.bolCoordenador) {
                                            urlTarefa = '/AVA/Caminhos/home/agendamento/'+item.idRotaAgendamento;
                                        }

                                        if (item.intStatusTarefa == 2) {
                                            tarefaPrivada = 'Privada';
                                        }

                                        srt += '</div>' +
                                        '  <div class="atividadesturma-body-conteudo" id="atividadesturma-body-conteudo" >' +

                                        '  <a> <label  id="systemNome">#Tarefa '+tarefaPrivada+'</label></a>' +
                                        '<p> ' + item.strDtmInicio + ' a ' + item.strDtmFim + '  </p>' +


                                        ' <h3 id="atividadeNome"><strong> <a href="'+urlTarefa+'"> ' + item.strTitulo + '</strong></a></h3>  ' +
                                        '  <a href="/AVA/Perfil/Home/Index/' + item.strLogin + '"><label id="atividadesdodia_professor">Professor(a):' + item.strNomePessoa + '  </label></a>' +

                                        '<div id="Disciplina">' +
                                        '<p>Disciplina:' + item.strMateria + ' </p>' +
                                        '</div>'

                                    ' </div>' +

                                        ' </div>' +



                                        '</div><hr>';


                                    }

                                    sources.push(srt);


                                }

                            });

                        }



                        var options = {
                            dataSource: sources,
                            callback: function (response, paginationatividadesturma) {

                                var dataHtml = '<ul>';

                                $.each(response, function (index, item) {

                                    dataHtml += '<li class="bcs1 bloco">' + item + '</li>';
                                });
                                dataHtml += '</ul>';

                                $('#pagination-atividadeturma').prev().html(dataHtml);
                            }
                        };


                        $('#pagination-atividadeturma').paginationatividadesturma(options);

                        },

                    error: function(dadosUsuarioError){

                    }

                });

                // $('#ativ_lista_normal_turma .tooltip_title_top[title!=""]').qtip(qtipOptionsTop), $('#ativ_lista_normal_turma .tooltip_title[title!=""]').qtip(qtipOptionsTop), $("#ativ_lista_normal_turma .boxScroll").mCustomScrollbar()
            },
            error: function () {
                console.log("Ocorreu um erro ao carregar atividades")
            }
        }))

        var varHtmlStr = ' <li dic="-1" >' +
            '<input type="checkbox" id="ckDisciplinaTurma-1"  checked>   ' +
            '<label for="ckDisciplinaTurma-1 " >Selecione a disciplina</label>' +
            '</li>  ';
        var k = 0;

        $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/ListarDisciplinas/",
            data: {
                idGrupo: $("#idGrupo").val()
            },
            async: !0,
            success: function (c) {
                if (c.Result.length > 0 && c.Result != "Erro") {
                    $.each(c.Result, function (ix, item) {
                        varHtmlStr += ' <li dic="' + ix + '" >' +
                            '<input type="checkbox" id="ckDisciplinaTurma' + ix + '"  >   ' +
                            '<label for="ckDisciplinaTurma' + ix + ' " >' + item.strMateria + '</label>' +
                            '</li>  ';
                    });

                    $('#cbDisciplinaTurma').html(varHtmlStr);
                    $('#cbDisciplinaTurma ul').click(function () {
                        $('#cbDisciplinaTurma').show();
                    });

                    $('#cbDisciplinaTurma li').click(function () {
                        var valor = $(this).attr('dic');

                        $('#cbDisciplinaTurma li input[type="checkbox"]:checked').each(function (i, item) {
                            item.checked = false;
                        });

                        document.getElementById("ckDisciplinaTurma" + valor).checked = true;
                        if (valor == -1) {
                            PrepararAtividade();
                            $('#txtDisciplinaTurma').html("Selecione a disciplina");
                        }
                        else {
                            var valueDisciplina = c.Result[valor].IdMateria;
                            CarregarAtividades(valueDisciplina, valor);
                            $('#txtDisciplinaTurma').html(c.Result[valor].strMateria);                            
                        }                        
                        $('#cbDisciplinaTurma ul').hide();
                    });
                }
            },
            error: function (c) {
                alert(JSON.stringify(c));

            }

        });


    }


    function CarregarAtividades(atv, oldValue) {

        console.log("ListaAtividadesTurma 1");

        var aux = '';
        var sources = [];

        var aprimora_icon = "/AVA/StaticContent/Common/img/geral/atividade_ico_apr.png";
        var educ_icon = "/AVA/StaticContent/Common/img/geral/atividade_ico_educ.png";

        ($(".barra_topo_itens .menu_topo li").removeClass("active"), $(".barra_topo_itens .menu_topo li .atividade_turma").parent().addClass("active"), $("section.configuracoes_grupo").hide(), $("#ava_mural_geral").hide(), $("#ava_barralateral-direita").hide(), $("#ava_sobreaturma").hide(), $("section.galeria_da_turma .filtro_galeria .link_botao").hide(), cancelarFiltrosGaleria(), $("section.atividade_da_turma").show(), $("section.galeria_da_turma").hide())


        bolCPPuro || $("#ativ_lista_normal_turma").length && (null != ajaxCarregarAtividades && ajaxCarregarAtividades.abort(), $("#ativ_lista_normal_turma .boxScroll").remove(), $("#ativ_lista_normal_turma header").after('<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" style="margin: 5px 186px 10px;" class="loaderAtividades" />').show(), ajaxCarregarAtividades = $.ajax({
            type: "GET",
            url: "/AVA/Turma/Home/ListaAtividadesTurma/",
            data: {
                idGrupo: $("#idGrupo").val(),
                idMateria: atv
            },
            async: !0,
            success: function (a) {


                if (a.Result.length > 0) {
                    $.each(a.Result, function (ix, item) {
                        if (item.bolEncerrou != true) {
                            srt = ' <div  id="atividadesturma" class="atividadesturma"> ' +
                                '<div id="atividadesturma-header" class="atividadesturma-header">' +
                                '<img src="' + item.strFoto + '" />' +
                                '<label id="atividadesturma-header-nomeprofessor">Professor' + item.strNomePessoa + '</label>' +
                                '</div>' +

                                '<div id="atividadesturma-body" class="atividadesturma-body">' +
                                '<div id="systemIcon">';

                            if (item.strTipo.indexOf("tarefa") == 0) {
                                srt += '<img src="' + educ_icon + '" />';
                            }
                            else {
                                srt += '<img src="' + aprimora_icon + '" />';
                            }

                            srt += '</div>' +
                                '  <div class="atividadesturma-body-conteudo" id="atividadesturma-body-conteudo" >' +
                                '  <label  id="systemNome">#Tarefa</label>' +
                                '<p> ' + item.strDtmInicio + ' a ' + item.strDtmFim + '  </p>' +

                                ' <h3 id="atividadeNome"><strong> <a href="/AVA/Caminhos/Home/Player/' + item.idRotaAgendamento + '/' + item.idRota + '" > ' + item.strTitulo + '</strong></a></h3>  ' +
                                '  <a href="/AVA/Perfil/Home/Index/' + item.strLogin + '"><label id="atividadesdodia_professor">Professor(a):' + item.strNomePessoa + '  </label></a>' +

                                '<div id="Disciplina">' +
                                '<p>Disciplina:' + item.strMateria + ' </p>' +
                                '</div>'

                            ' </div>' +

                                ' </div>' +

                                '</div><hr>';

                            sources.push(srt);
                        }
                    });
                }

                var options = {
                    dataSource: sources,
                    callback: function (response, paginationatividadesturma) {

                        var dataHtml = '<ul>';

                        $.each(response, function (index, item) {

                            dataHtml += '<li class="bcs1 bloco">' + item + '</li>';
                        });
                        dataHtml += '</ul>';

                        $('#pagination-atividadeturma').prev().html(dataHtml);
                    }
                };

                $('#pagination-atividadeturma').paginationatividadesturma(options);

                // $('#ativ_lista_normal_turma .tooltip_title_top[title!=""]').qtip(qtipOptionsTop), $('#ativ_lista_normal_turma .tooltip_title[title!=""]').qtip(qtipOptionsTop), $("#ativ_lista_normal_turma .boxScroll").mCustomScrollbar()
            },
            error: function () {
                console.log("Ocorreu um erro ao carregar atividades")
            }
        }))

        var varHtmlStr = ' <li dic="-1" >' +
            '<input type="checkbox" id="ckDisciplinaTurma-1"  >   ' +
            '<label for="ckDisciplinaTurma-1 " >Selecione a disciplina</label>' +
            '</li>  ';
        var k = 0;

        $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/ListarDisciplinas/",
            data: {
                idGrupo: $("#idGrupo").val(),
                idMateria: 0
            },
            async: !0,
            success: function (c) {
                if (c.Result.length > 0) {

                    $.each(c.Result, function (ix, item) {
                        varHtmlStr += ' <li dic="' + ix + '" >' +
                            '<input type="checkbox" id="ckDisciplinaTurma' + ix + '"  >   ' +
                            '<label for="ckDisciplinaTurma' + ix + ' " >' + item.strMateria + '</label>' +
                            '</li>  ';
                    });

                    $('#cbDisciplinaTurma').html(varHtmlStr);

                    document.getElementById("ckDisciplinaTurma" + oldValue).checked = true;

                    $('#cbDisciplinaTurma li').click(function () {
                        var valor = $(this).attr('dic');

                        $('#cbDisciplinaTurma li input[type="checkbox"]:checked').each(function (i, item) {
                            item.checked = false;
                            // $(this).removeAttr('checked');
                        });

                        document.getElementById("ckDisciplinaTurma" + valor).checked = true;
                        // $("#ckDisciplinaTurma"+valor).attr("checked","true");

                        // alert(valor);

                        if (valor == -1) {

                            PrepararAtividade();
                            $('#txtDisciplinaTurma').html("Selecione a disciplina");
                        }
                        else {

                            var valueDisciplina = c.Result[valor].IdMateria;

                            CarregarAtividades(valueDisciplina, valor);

                            $('#txtDisciplinaTurma').html(c.Result[valor].strMateria);

                        }
                    });
                }
            },
            error: function (c) {
                alert(JSON.stringify(c));
            }

        });


    }





    function PrepararGaleria() {
        $(".barra_topo_itens .menu_topo li .galeria_turma").parent().hasClass("active") || ($(".barra_topo_itens .menu_topo li").removeClass("active"), $(".barra_topo_itens .menu_topo li .galeria_turma").parent().addClass("active"), $("section.configuracoes_grupo").hide(), $("#ava_mural_geral").hide(), $("#ava_barralateral-direita").hide(), $("#ava_sobreaturma").hide(), $("section.galeria_da_turma .filtro_galeria .link_botao").hide(), cancelarFiltrosGaleria(), carregarGaleriaTurma(1), $("section.galeria_da_turma").show(), $("#ativ_lista_normal_turma").hide())
    }

    function PrepararConfiguracoes() {

        $(".barra_topo_itens .menu_topo li .configuracoes_turma").parent().hasClass("active") || (bolFezAlteracaoConfiguracoes = !1,
        $(".barra_topo_itens .menu_topo li").removeClass("active"),
        $(".barra_topo_itens .menu_topo li .configuracoes_turma").parent().addClass("active"),
        $("#ava_mural_geral").hide(),
        $("section.galeria_da_turma").hide(),
        $("#ava_barralateral-direita").hide(),
        $("#ava_sobreaturma").hide(), 
        $("section.configuracoes_grupo").show(), 
        $("#srcFotoGrupo").val(objConfiguracoes.strFoto), 
        $(".configuracoes_grupo .trocar_foto img").attr("src", objConfiguracoes.strFoto), 
        $(".configuracoes_grupo .dados_turma input").val(objConfiguracoes.strApelido), 
        $(".configuracoes_grupo .dados_turma textarea").val(objConfiguracoes.strDescricao), 
        objConfiguracoes.bolAlunoImagem ? $("#imagens_grupo").attr("checked", "checked") : $("#imagens_grupo").removeAttr("checked"), 
        objConfiguracoes.bolAlunoVideo ? $("#videos_grupo").attr("checked", "checked") : $("#videos_grupo").removeAttr("checked"), 
        objConfiguracoes.bolAlunoArquivo ? $("#arquivos_grupo").attr("checked", "checked") : $("#arquivos_grupo").removeAttr("checked"),
        objConfiguracoes.bolAlunoDragDrop ? $("#filedrag_grupo").attr("checked", "checked") : $("#filedrag_grupo").removeAttr("checked"), 


        objConfiguracoes.bolGrupoAtivo ? $("#ativar_grupo").attr("checked", "checked") : $("#ativar_grupo").removeAttr("checked"),
         
        $("#estado_denuncia_pendente").attr("checked", "checked"), $("#box_ListarDenuncia .btAbreFechaFiltro").html('Fechar<span class="aberto"></span>'), 
        $("#box_ListarDenuncia .boxFiltro").show(), $("#usuario_filtro_denuncia").val(""), carregarDenuncias(), $("#ativ_lista_normal_turma").hide())

    }

    function montaCampoData(a, o) {
        $(a).setMask("date"), $(o).setMask("date"), $(a).datepicker({
            numberOfMonths: 1,
            dateFormat: "dd/mm/yy",
            dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S�b"],
            monthNames: ["Janeiro", "Fevereiro", "Mar�o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            onSelect: function (a) {
                $(o).datepicker("option", "minDate", a)
            }
        }), $(o).datepicker({
            numberOfMonths: 1,
            dateFormat: "dd/mm/yy",
            dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S�b"],
            monthNames: ["Janeiro", "Fevereiro", "Mar�o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            onSelect: function (o) {
                $(a).datepicker("option", "maxDate", o)
            }
        })
    }

    function carregaTimeLineGrupo() {
        
        window.setTimeout(function () {
            resetarFiltroMural(), paginaEducacional_CarregarMural(1)
        }, 200), 
        //carregarAtividades(), 
        $("#ativ_lista_pais").length && carregarAtividadesFilhos($("#hIdFilho").val())
    }

    function carregarAtividades() {
        /*
        bolCPPuro || $("#ativ_lista_normal").length && (null != ajaxCarregarAtividades && ajaxCarregarAtividades.abort(), $("#ativ_lista_normal .boxScroll").remove(), $("#ativ_lista_normal header").after('<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" style="margin: 5px 186px 10px;" class="loaderAtividades" />').show(), ajaxCarregarAtividades = $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/ListaAtividades/",
            data: {
                idGrupo: $("#idGrupo").val()
            },
            async: !0,
            success: function (a) {
                $("#ativ_lista_normal").html(a), $('#ativ_lista_normal .tooltip_title_top[title!=""]').qtip(qtipOptionsTop), $('#ativ_lista_normal .tooltip_title[title!=""]').qtip(qtipOptionsTop), $("#ativ_lista_normal .boxScroll").mCustomScrollbar()
            },
            error: function () {
                console.log("Ocorreu um erro ao carregar atividades")
            }
        }))
        */
    }

    function carregarAtividadesFilhos(a) {
        bolCPPuro || $("#ativ_lista_pais").length && (null != ajaxCarregarAtividadesFilhos && ajaxCarregarAtividadesFilhos.abort(), $("#ativ_lista_pais .boxScroll").remove(), $("#ativ_lista_pais header").after('<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" style="margin: 5px 186px 10px;" class="loaderAtividades" />').show(), ajaxCarregarAtividades = $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/ListaAtividadesFilhos/",
            data: {
                idGrupo: $("#idGrupo").val(),
                idFilho: a
            },
            async: !0,
            success: function (o) {
                a > 0 ? ($("#ativ_lista_pais .boxScroll").remove(), $("#ativ_lista_pais header").after(o), $("#ativ_lista_pais .loaderAtividades").remove()) : $("#ativ_lista_pais").html(o), $('#ativ_lista_pais .tooltip_title_top[title!=""]').qtip(qtipOptionsTop), $('#ativ_lista_pais .tooltip_title[title!=""]').qtip(qtipOptionsTop), $("#ativ_lista_pais .boxScroll").mCustomScrollbar()
            },
            error: function () {
                console.log("Ocorreu um erro ao carregar atividades dos filhos")
            }
        }))
    }

    function seguir(a, o) {
        $.ajax({
            type: "POST",
            url: "/AVA/Login/Home/UsuarioCript",
            async: !0,
            success: function (e) {
                idUsuarioSeguidorCacheado = e, $.jStorage.deleteKey("seguidos" + idUsuarioSeguidorCacheado), $("#btseg_" + o).html("<img class='carregando_seguir' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.post("/AVA/Barras/Home/Seguir/?idSeguidor=" + a + "&idPerseguido=" + o, function (e) {
                    if ("ok" == e) {
                        if ($linkhref = "javascript: parardeseguir(" + a + "," + o + ")", $("#btseg_" + o).attr("href", $linkhref), $("#btseg_" + o).attr("class", "bt_seguir"), $("#btseg_" + o).html('<span class="ava_seguindo"></span><span class="ava_parardeseguir">parar de seguir</span><span class="fontello icoPararSeguir"></span>'), $("#btseguir_perfil_" + o).attr("href", $linkhref), $("#btseguir_perfil_" + o).html('<span><div class="fontello icoSeguindo"></div>Seguindo</span><span><div class="fontello icoPararSeguir"></div>Parar de seguir</span>').children("span:first").addClass("segue_span").css("display", "block").next().addClass("seguenot_span").css("display", "none"), xmlGlobal.length > 0)
                            for (var i = 0; i < xmlGlobal.length; i++)
                                if (xmlGlobal[i].id == o) {
                                    xmlGlobal[i].bolEstouSeguindo = !0;
                                    break
                                }
                    } else alert("erro ao seguir usu�rio!")
                })
            },
            error: function (a) {
                0 != a.status && (idUsuarioCript = 0)
            }
        })
    }

    function parardeseguir(a, o) {
        $.ajax({
            type: "POST",
            url: "/AVA/Login/Home/UsuarioCript",
            async: !0,
            success: function (e) {
                idUsuarioSeguidorCacheado = e, $.jStorage.deleteKey("seguidos" + idUsuarioSeguidorCacheado), $("#btseg_" + o).html("<img class='carregando_seguir' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.post("/AVA/Barras/Home/PararDeSeguir/?idSeguidor=" + a + "&idPerseguido=" + o, function (e) {
                    if ("ok" == e) {
                        if ($linkhref = "javascript: seguir(" + a + "," + o + ")", $("#btseg_" + o).attr("href", $linkhref), $("#btseg_" + o).attr("class", "bt_seguir s_Indo"), $("#btseg_" + o).html('seguir<span class="fontello icoSeguir"></span>'), $("#btseguir_perfil_" + o).attr("href", $linkhref), $("#btseguir_perfil_" + o).html('<div class="fontello icoSeguir"></div>seguir'), xmlGlobal.length > 0)
                            for (var i = 0; i < xmlGlobal.length; i++)
                                if (xmlGlobal[i].id == o) {
                                    xmlGlobal[i].bolEstouSeguindo = !1;
                                    break
                                }
                    } else alert("erro ao parar de seguir usu�rio!")
                })
            },
            error: function (a) {
                0 != a.status && (idUsuarioCript = 0)
            }
        })
    }

    function GravarAssuntosCadastrados(a) {
        $("._feed_lista_assunto .acoes .btn_cor").hasClass("salvando") || ($("._feed_lista_assunto .acoes .btn_cor").addClass("salvando"), $.ajax({
            url: "/AVA/Turma/Home/SalvarAssuntos/",
            type: "POST",
            data: {
                idGrupo: $("#idGrupo").val(),
                jsonAssuntos: JSON.stringify(auxAssuntos)
            },
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function (o) {
                var e = jQuery.parseJSON(JSON.stringify(o));
                if (a > 0)
                    for (var i in e) e[i].IdAssunto == a && (objAssuntoCadastrado = e[i]);
                else
                    for (var r in auxAssuntos.Adicionar) {
                        var t = $(".liassunto[assu=" + auxAssuntos.Adicionar[r].idAssunto + "]");
                        for (var i in e) e[i].StrAssunto == $(".liassuntonome", t).text() && ($(".liassunto[assu=" + auxAssuntos.Adicionar[r].idAssunto + "]").attr("assu", e[i].IdAssunto), objAssuntoCadastrado = e[i])
                    }
                $(".acoesResultado").fadeIn(), clearTimeout(timeoutMensagemAssunto), timeoutMensagemAssunto = window.setTimeout(function () {
                    $(".acoesResultado").fadeOut()
                }, 5e3), resetarFiltroMural();
                var s = "",
                    n = "",
                    l = "",
                    u = "";
                for (var i in e) s += '\n<li assu="' + e[i].IdAssunto + '">\n<input type="checkbox" id="ckAssuntoPost' + e[i].IdAssunto + '"', s += e[i].BolGeral ? ' checked="checked" />' : " />", s += '\n<label for="ckAssuntoPost' + e[i].IdAssunto + '">' + e[i].StrAssunto + "&nbsp;</label>\n</li>", n += '\n<li assu="' + e[i].IdAssunto + '">\n<input type="checkbox" id="ckAssuntoTimeLine' + e[i].IdAssunto + '" />\n<label for="ckAssuntoTimeLine' + e[i].IdAssunto + '">' + e[i].StrAssunto + "&nbsp;</label>\n</li>", l += '\n<li assu="' + e[i].IdAssunto + '">\n<input type="checkbox" id="ckAssuntoGrupoTurma' + e[i].IdAssunto + '" />\n<label for="ckAssuntoGrupoTurma' + e[i].IdAssunto + '">' + e[i].StrAssunto + "&nbsp;</label>\n</li>", u += '\n<li assu="' + e[i].IdAssunto + '">\n<input type="checkbox" id="ckAssuntoEditar' + e[i].IdAssunto + '"', u += e[i].BolGeral ? ' checked="checked" />' : " />", u += '\n<label for="ckAssuntoEditar' + e[i].IdAssunto + '">' + e[i].StrAssunto + "&nbsp;</label>\n</li>";
                $("#cbAssuntoPost li:not(.li_criar_editar_assunto)").remove(), $("#cbAssuntoPost li.li_criar_editar_assunto").before(s), $("#cbAssuntoTimeLine li:not(li[assu=0])").remove(), $("#cbAssuntoTimeLine li[assu=0]").after(n), $("#cbAssuntoGaleriaTurma li:not(li[assu=0])").remove(), $("#cbAssuntoGaleriaTurma li[assu=0]").after(l), $("#cbAssuntoEditar li").remove(), $("#cbAssuntoEditar").html(u), history.pushState({
                    comboDigaLa: $("#cbAssuntoPost").html(),
                    comboTimeLine: $("#cbAssuntoTimeLine").html(),
                    comboGaleria: $("#cbAssuntoGaleriaTurma").html(),
                    comboEditar: $("#cbAssuntoEditar").html()
                }, location.pathname, location.pathname), auxAssuntos.Adicionar = [], auxAssuntos.Editar = [], auxAssuntos.Remover = [], auxAssuntos.Mover = [], mobile && $("#criareditar.fancyAssuntos ._feed_lista_assunto ul").mCustomScrollbar("update")
            },
            error: function () {
                console.log("Ocorreu um salvar os assuntos"), $(".acoesResultado").text("Erro ao salvar assunto.").fadeIn(), clearTimeout(timeoutMensagemAssunto), timeoutMensagemAssunto = window.setTimeout(function () {
                    $(".acoesResultado").fadeOut()
                }, 5e3), auxAssuntos.Adicionar = [], auxAssuntos.Editar = [], auxAssuntos.Remover = [], auxAssuntos.Mover = []
            }
        }))
    }

    function ViewRealizacaoProva(a) {
        window.open("/AVA/avaliacoes/Realizacao/index/" + a, "RealizacaoProva", "width=800, height=600, scrollbars=1")
    }

    function ViewRelatorioProva(a) {
        window.open("/AVA/avaliacoes/Realizacao/VisualizarSimulada//" + a, "Relat�rio", "width=800, height=600, scrollbars=1")
    }

    function CustomConfirmConfiguracoes(a, o) {
        $.fancybox({
            type: "ajax",
            href: "/AVA/Turma/Home/AbandonarConfiguracoes/",
            afterShow: function () {
                $("body").on("click", "#btnSairPaginaConfiguracoes", function () {
                    switch (bolFezAlteracaoConfiguracoes = !1, destinoConfiguracoes) {
                        case "timeline":
                            LimparCampoComentario(o), $.fancybox.close(), PrepararTimeLine();
                            break;
                        case "sobre":
                            LimparCampoComentario(o), $.fancybox.close(), PrepararSobre();
                            break;
                        case "atividade":
                            LimparCampoComentario(o), $.fancybox.close(), PrepararAtividade();
                            break;
                        case "galeria":
                            LimparCampoComentario(o), $.fancybox.close(), PrepararGaleria();
                            break;
                        case "abaConfiguracoes":
                            LimparCampoComentario(o), $.fancybox.close(), PrepararConfiguracoes();
                            break;
                        case "btnAgendarTarefa":
                            LimparCampoComentario(o), $.fancybox.close(), FazAgendar();
                            break;
                        case "comboFiltroAssuntoTimeline":
                            LimparCampoComentario(o), $.fancybox.close(), PrepararFiltroAssuntoTimeline(destinoIdAssunto)
                    }
                    destinoConfiguracoes = null, destinoIdAssunto = null
                }), $("body").on("click", "#btnPermanecerPaginaConfiguracoes", function () {
                    $.fancybox.close()
                })
            },
            closeBtn: !1,
            modal: !0,
            helpers: {
                overlay: {
                    closeClick: !1,
                    locked: !1
                }
            },
            padding: 0
        })
    }

    function LimparCampoComentario(a) {
        for (var o = a.idMsgRapida.length, e = o - 1; e >= 0; e--) $(".campo_comentar input.foco(article[ide=" + a.idMsgRapida[e] + "] input.foco)").prev().children().hide(), $(".campo_comentar input.foco(article[ide=" + a.idMsgRapida[e] + "] input.foco)").animate({
            width: "441px"
        }, 200).val(""), $(".campo_comentar input.foco(article[ide=" + a.idMsgRapida[e] + "] input.foco)").removeClass("foco"), a.idMsgRapida.splice(e, 1)
    }

    function PrepararFiltroAssuntoTimeline(a) {
        $("#hAssuntoTimeLine").val(a), $("#cbAssuntoTimeLine input[type=checkbox]").removeAttr("checked"), $("#ckAssuntoTimeLine" + a).attr("checked", "checked");
        var o = $("#ckAssuntoTimeLine" + a).parent().text() + '<span class="caret"></span>';
        $("#txtAssuntoTimeLine").html(o), $("#cbAssuntoTimeLine").parent().removeClass("open"), paginaEducacional_CarregarMural(1)
    }
    var idUsuarioCript = 0,
        idFerramentaTipoTimeLine = 35,
        idFerramentaTipoTimeLineFile = 37,
        idFerramentaTipoTrocarFotoGrupo = 32,
        idFerramentaTipoMaterialApoio = 15,
        bolFezAlteracaoConfiguracoes = !1,
        strMensagemConfiguracaoNaoSalvaUnload = "Você fez alterações nesta página que ainda não foram salvas.",
        strMensagemConfiguracaoNaoSalva = "Você fez alterações nesta página que ainda não foram salvas. Tem certeza de que deseja sair?",
        destinoConfiguracoes = null,
        destinoIdAssunto = null,
        _idMsgComentarioGlobal = null,
        objetoIdMensagemRapida = {
            idMsgRapida: []
        },
        idNovoAssunto = -1,
        auxAssuntos = {};
    auxAssuntos.Adicionar = [], auxAssuntos.Editar = [], auxAssuntos.Remover = [], auxAssuntos.Mover = [];
    var objAssuntoCadastrado = {
        IdAssunto: 0,
        StrAssunto: ""
    },
        timeoutMensagemAssunto = null,
        jsonAlunosGrupoTurma = !1,
        objConfiguracoes = {},
        bolAtualizarMuralDepoisDeAssuntos = !1,
        idArquivoFoto = 0,
        objetoImagens = {
            imagens: []
        },
        objetoArquivos = {
            arquivos: []
        },
        tpClick = "click",
        mobile = !1;
    if (Modernizr.touch) {
        mobile = !0;
        var ua = navigator.userAgent.toLowerCase(),
            isAndroid = ua.indexOf("android") > -1;
        isAndroid && (tpClick = "click")
    }
    window.onpopstate = function () {
        null != history.state && "" != history.state && 0 != history.state.length && ($("#cbAssuntoPost").html(history.state.comboDigaLa), $("#cbAssuntoTimeLine").html(history.state.comboTimeLine), $("#cbAssuntoGaleriaTurma").html(history.state.comboGaleria), $("#cbAssuntoEditar").html(history.state.comboEditar))
    };
    var bolPassouNoBeforeUnload = !1;
    window.onbeforeunload = function () {
        return bolPassouNoBeforeUnload = !0, bolFezAlteracaoConfiguracoes === !0 ? strMensagemConfiguracaoNaoSalvaUnload : void 0
    }, jQuery(function (a) {
        window.onpopstate(), a("#idPostUnico").val(a("#idPostUnico").attr("init")), 0 != idUsuarioCript ? paginaEducacional_CarregarMural(1) : a.ajax({
            type: "POST",
            url: "/AVA/Login/Home/UsuarioCript",
            async: !0,
            success: function (a) {
                idUsuarioCript = a, paginaEducacional_CarregarMural(1)
            },
            error: function (a) {
                0 != a.status && (idUsuarioCript = 0, console.log("n�o foi possivel carregar informa��es do usuario"))
            }
        }), verificaSePodeAcessarGaleria(), grupoTurma_PrepararSobreInicio(), a("#txtInput").elastic(), a(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar({
            horizontalScroll: !0,
            advanced: {
                autoExpandHorizontalScroll: !0
            }
        }), a(".dialogo_box .preview_post.arquivos").mCustomScrollbar(), a("#hAssuntoPost").val(a("#hAssuntoPost").attr("initvalue")), a("#cbAssuntoPost input[type=checkbox]").removeAttr("checked"), a("#ckAssuntoPost" + a("#hAssuntoPost").val()).attr("checked", "checked"), a("body").on(tpClick, "#cbAssuntoPost li", function () {
            if (!a(this).hasClass("li_criar_editar_assunto") && !a(this).parent().hasClass("li_criar_editar_assunto")) {
                var o = a(this).attr("assu");
                a("#hAssuntoPost").val(o), a("#cbAssuntoPost input[type=checkbox]").removeAttr("checked"), a("#ckAssuntoPost" + o).attr("checked", "checked");
                var e = a("label", this).text() + '<span class="caret"></span>';
                a("#txtAssuntoPost").html(e), a("#cbAssuntoPost").parent().removeClass("open")
            }
        }), a("body").on(tpClick, "#txtInput", function () {
            var o = a.trim(a(this).val()),
                e = a.trim(a("#txtLinkVideoMensagem").val()),
                i = !0;
            "" != o && (i = !1), "" != e && (i = !1), objetoArquivos.arquivos.length > 0 && (i = !1), objetoImagens.imagens.length > 0 && (i = !1), i ? a("#visualizarPost").addClass("disable").attr("disabled", "disabled") : a("#visualizarPost").removeClass("disable").removeAttr("disabled"), a(".sep_digala").slideDown(200), a("#btnCancelarFerramentaMural").removeAttr("disabled").removeClass("disable")
        }).on(tpClick, ".mensagem_multimidia .multimidia_video", function () {
            // a(".mensagem_multimidia ul:not(.dropdown-menu)").hide(),
            // $('#txtLinkVideoMensagem').hide(); 
            $(".multimidia_video").hide();
            a(".enviar_video").is(":visible") || (a(".sep_digala").slideDown(200), 
            a(".enviar_video").show(), 
            a("#visualizarPost").addClass("disable").attr("disabled", "disabled"), 
            a("#btnCancelarFerramentaMural").removeAttr("disabled").removeClass("disable"))
        }).on("click", ".mensagem_multimidia .multimidia_imagens, .dialogo_box .preview_post.imagens .adicionar .adicionar_multimidia", function () {
            abreUploadImagemTimeLine();
        }).on("click", ".mensagem_multimidia .multimidia_documentos, .dialogo_box .preview_post.arquivos .adicionar_doc", function () {
            abreUploadFileTimeLine();
            console.log("click");
        }), a("#urlVideoOriginal").val("");
        var o = "";
        a("#txtLinkVideoMensagem").val(""), a("body").on("keyup", "#txtInput", function () {
            var o = a.trim(a(this).val()),
                e = a.trim(a("#txtLinkVideoMensagem").val()),
                i = !0;
            "" != o && (i = !1), "" != e && (i = !1), objetoArquivos.arquivos.length > 0 && (i = !1), objetoImagens.imagens.length > 0 && (i = !1), i ? a("#visualizarPost").addClass("disable").attr("disabled", "disabled") : a("#visualizarPost").removeClass("disable").removeAttr("disabled")
        }).on("input paste", "#txtLinkVideoMensagem", function () {
            0 == a(this).val().length ? a(".errovideo, .verificavideo").hide() : (void 0 !== o && null != o && clearTimeout(o), o = setTimeout(function () {
                montaPreviewVideoMensagem(a("#txtLinkVideoMensagem").val())

            }, 1e3))
            $(".mensagem_multimidia").show();
        }).on("keyup", "#txtLinkVideoMensagem", function () {
            a(".errovideo, .verificavideo").hide(), 0 == a(this).val().length ? "" != a.trim(a("#txtInput").val()) && a("#visualizarPost").removeClass("disable").prop("disabled", !1) : (a("#visualizarPost").addClass("disable").prop("disabled", !0), void 0 !== o && null != o && clearTimeout(o), o = setTimeout(function () {
                montaPreviewVideoMensagem(a("#txtLinkVideoMensagem").val())
            }, 1e3))
        }), a("body").on(tpClick, "#btnCancelarFerramentaMural", paginaEducacional_CancelarDigaLaClick).on("click", ".dialogo_box .preview_post.imagens .remover_multimidia", function (o) {
            o.preventDefault();
            var e = a(this).closest(".prev_imagem"),
                i = parseInt(e.data("idarquivo"));
            if (void 0 !== objetoImagens && null != objetoImagens && objetoImagens.imagens.length > 0)
                for (var r = 0; r < objetoImagens.imagens.length; r++)
                    if (objetoImagens.imagens[r].idArquivo == i) {
                        objetoImagens.imagens.splice(r, 1), e.remove();
                        break
                    }
            var t = a.trim(a("#txtInput").val());
            return (void 0 === objetoImagens || null == objetoImagens || 0 == objetoImagens.imagens.length) && (a(".dialogo_box .preview_post.imagens").hide(), "" == t ? paginaEducacional_CancelarDigaLa() : (a(".mensagem_multimidia ul:not(.dropdown-menu)").show(), a(".mensagem_multimidia").show())), a(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update"), !1
        }).on("click", ".dialogo_box .preview_post.arquivos .remover_multimidia", function (o) {
            o.preventDefault();
            var e = a(this).parent(),
                i = parseInt(e.data("idarquivo"));
            if (void 0 !== objetoArquivos && null !== objetoArquivos && objetoArquivos.arquivos.length > 0)
                for (var r = 0; r < objetoArquivos.arquivos.length; r++)
                    if (objetoArquivos.arquivos[r].idArquivo == i) {
                        objetoArquivos.arquivos.splice(r, 1), e.remove();
                        break
                    }
            var t = a.trim(a("#txtInput").val());
            return (void 0 === objetoArquivos || null == objetoArquivos || 0 == objetoArquivos.arquivos.length) && (a(".dialogo_box .preview_post.arquivos").hide(), "" == t ? paginaEducacional_CancelarDigaLa() : (a(".mensagem_multimidia ul:not(.dropdown-menu)").show(), a(".mensagem_multimidia").show())), a(".dialogo_box .preview_post.arquivos").mCustomScrollbar("update"), !1
        }), a("body").on(tpClick, "#visualizarPost", function () {

            console.log(" visualizarPost grupoTurma.js");

            if (a("#txtInput").val().length == 0) {
                alert("Escreva algo.");
                return;
            }

            if(disciplinaSelecionada < 0)
                disciplinaSelecionada = 0;
                
                objetoImagens.imagens = [];
                objetoArquivos.arquivos = [] ;

                if(g_arrayMensagemRapida.length > 0){

                  
                    $.each( g_arrayMensagemRapida, function(index , item){
    
                        objetoImagens.imagens.push(item);
    
                    });
       
                }
    
                if(g_arrayMensagemRapidaFile.length > 0){
    
                    $.each( g_arrayMensagemRapidaFile, function(  index, item  ){
    
                        objetoArquivos.arquivos.push(item);
                    });
                   
                }

            a(this).hasClass("disable") || (a("#btnCancelarFerramentaMural").addClass("disable"), a("#visualizarPost").addClass("disable"), a.ajax({

               
                
                type: "POST",
                url: "/AVA/Turma/Home/SalvarMensagemRapida",
                data: {
                    idGrupo: a("#idGrupo").val(),
                    strTexto: encodeURIComponent(a("#txtInput").val()),
                    idAssunto: a("#hAssuntoPost").val(),
                    strLinkVideo: a("#urlVideoOriginal").val(),
                    imagens: JSON.stringify(objetoImagens.imagens),
                    arquivos: JSON.stringify(objetoArquivos.arquivos),
                    idMateria: disciplinaSelecionada
                },
                async: !0,
                success: function (o) {
                    try {
                        galleryUploader.reset();
                    }
                    catch{
                    }

                    g_arrayMensagemRapida = [];
                    g_arrayMensagemRapidaFile = [];
                    if ("0" != o[0]) {
                        var e = a(o);
                        a("#ava_fluxoarticles article[ide=0]").slideUp(), a("#ava_fluxoarticles").prepend(e), a(".ctn_msg", e).expander(expanderOptions);
                        try {
                            
                            a(".imagens_mural", e).GaleriaAva();
                        } catch (i) {
                            console.log("erro ao chamara galeria ava")
                        }
                        a(".iframeVideoVimeo", e).on("load", paginaEducacional_TratamentoVimeo);
                        var r = a("#intAlteracoesPagina").val();
                        r++ ;
                        a("#intAlteracoesPagina").val(r);
                        r++ , a("#intAlteracoesPagina").val(r), verificaSePodeAcessarGaleria();
                        
                    }
                    paginaEducacional_CancelarDigaLaClick();
                    toastr.success('Diga l&aacute; criada com sucesso.', 'Sucesso', {timeOut: 3000, positionClass: "toast-top-center", closeButton: true});
                },
                error: function () {
                    a.fancybox.close(), console.log("Ocorreu um erro ao salvar mensagem"), paginaEducacional_CancelarDigaLaClick()
                }
            }))
        }), resetarFiltroMural(), a("body").on(tpClick, "#cbAssuntoTimeLine li label", function () {
            var o = a(this).parent().attr("assu");
            if (bolFezAlteracaoConfiguracoes) destinoIdAssunto = o, destinoConfiguracoes = "comboFiltroAssuntoTimeline", CustomConfirmConfiguracoes("comboFiltroAssuntoTimeline", objetoIdMensagemRapida, o);
            else {
                a("#hAssuntoTimeLine").val(o), a("#cbAssuntoTimeLine input[type=checkbox]").removeAttr("checked"), a("#ckAssuntoTimeLine" + o).attr("checked", "checked");
                var e = a(this).text() + '<span class="caret"></span>';
                a("#txtAssuntoTimeLine").html(e), a("#cbAssuntoTimeLine").parent().removeClass("open"), paginaEducacional_CarregarMural(1)
            }
            return !1
        }), a("body").on(tpClick, ".ver_mais_doc", function () {
            a(this).closest("article").hasClass("paginas_visualizar"), a(this).closest("article").attr("ide");
            a(this).prev().slideToggle("0", function () {
                a(this).is(":visible") ? a(this).next().text("Ver menos").addClass("mostra") : a(this).next().text("Ver mais").removeClass("mostra")
            })
        }), a("body").on(tpClick, ".prev_documento a.ver_mais", function () {
            a(this).closest(".prev_documento").prev().slideToggle("0", function () {
                var o = a("a.ver_mais", a(this).next());
                a(this).is(":visible") ? o.html("Ver menos").addClass("mostra") : o.html(o.attr("textInit")).addClass("mostra"), a(this).closest(".item_galeria_arquivos").mCustomScrollbar("update")
            })
        }), a("#ava_fluxoarticles").on(tpClick, ".carregarComentarios", function () {
            var o = a(this);
            if (!o.hasClass("carregando")) {
                o.addClass("carregando");
                var e = o.attr("ide");
                o.prepend('<img style="padding:6px 0px 5px;" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />'), a("span:not(.totalCarregado)", o).hide(), a.ajax({
                    type: "POST",
                    url: "/AVA/Turma/Home/Comentarios50",
                    data: {
                        idMensagemRapida: e,
                        dataPrimeiroLoad: a("#dtmPriUpd_" + e).val(),
                        idsCarregados: a("#idsPriUpd_" + e).val()
                    },
                    async: !0,
                    success: function (i) {
                        var r = a(i);
                        o.before(r), o.next().show(), a(".ctn_msg", r).expander(expanderOptions);
                        var t = "";
                        "" != a.trim(a("#idsPriUpd_" + e).val()) && (t += atob(a("#idsPriUpd_" + e).val()).split(",")), "" != a.trim(a("#idsUltUpd_" + e).val()) && ("" != t && (t += ","), t += atob(a("#idsUltUpd_" + e).val()).split(",")), a("#idsPriUpd_" + e).val(btoa(t));
                        var s = parseInt(atob(a("#totCom_" + e).val())),
                            n = atob(a("#idsPriUpd_" + e).val()).split(",").length;
                        a(".carregarComentarios[ide=" + e + "] .totalCarregado").text(n + " de " + s);
                        var l = "1" == a("#bolVerMais50_" + e).val();
                        l ? (o.removeClass("carregando"), a("span", o).show(), a("img", o).remove()) : (a(".carregarComentarios[ide=" + e + "]").slideUp().remove(), a("img", o).remove()), a("#idsUltUpd_" + e).remove(), a("#bolVerMais50_" + e).remove(), a("#totComUpd_" + e).remove()
                    },
                    error: function () {
                        o.removeClass("carregando"), a("span", o).show(), a("img", o).remove(), console.log("Ocorreu um erro ao carregar todos os comentarios")
                    }
                })
            }
        }), a("body").on(tpClick, function (o) {
            var e = a(o.target).closest("article"),
                i = 0,
                r = a(o.target).closest(".combo_denunciar_excluir");
            r.length > 0 && e.length > 0 ? (i = e.attr("ide"), a(".combo_denunciar_excluir ul:not(article[ide=" + i + "] .combo_denunciar_excluir ul)").fadeOut()) : a(".combo_denunciar_excluir ul").fadeOut()
        }), a("#ava_fluxoarticles").on(tpClick, ".botaoComentar:not(.botaoComentarGaleria), .escreverMais_", function () {
            var o = a(".campo_comentar", a(this).closest("article"));
            a("img", o).is(":hidden") && (a("img", o).show(), a("input", o).animate({
                width: "411px"
            }, 200).focus().addClass("foco"))
        }), a("#ava_fluxoarticles").on(tpClick, ".escreverMais_", function () {
            var o = a(this).attr("ide");
            a("html,body").animate({
                scrollTop: a("form.campo_comentar[ident=" + o + "]").offset().top - 220
            }, 1e3)
        }), a("#ava_fluxoarticles").on(tpClick, ".campo_comentar input", function () {
            var o = a(this).parent();
            a("img", o).is(":hidden") && (a("img", o).show(), a("input", o).animate({
                width: "411px"
            }, 200).focus().addClass("foco")), a(".campo_comentar input").blur(function () {
                "" === a(this).val() && (a(this).prev().children().hide(), a(this).animate({
                    width: "441px"
                }, 200).val(""), a(".campo_comentar input").removeClass("foco"))
            })
        }), a("body").on(tpClick, ".botaoCurtirGrupos", function (o) {
            if (o.preventDefault(), !a(this).hasClass("carregando")) {
                a(this).addClass("carregando"), a(this).toggleClass("ativo");
                var e = a(this),
                    i = a(this).closest(".acoes_mural").attr("ide"),
                    r = a(this).hasClass("ativo");
                e.next().html('<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />'), a.ajax({
                    type: "POST",
                    url: "/AVA/Turma/Home/CurtirDescurtirMensagem",
                    data: {
                        idMensagemRapida: i,
                        curtiu: r
                    },
                    async: !0,
                    success: function (a) {
                        e.removeClass("carregando"), "0" == a[0] ? e.next().html("").hide() : e.next().html(a).show()
                    },
                    error: function () {
                        console.log("Ocorreu um erro ao " + (r ? "curtir" : "descurtir") + " a mensagem"), e.removeClass("carregando")
                    }
                })
            }
            return !1
        }), a("#ava_fluxoarticles").on(tpClick, ".botaoCurtirComentario", function () {
            if (!a(this).hasClass("carregando")) {
                a(this).addClass("carregando");
                var o = a(this),
                    e = a(this).attr("idcomentario"),
                    i = !a(this).hasClass("ativo");
                o.next().html('<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />'), a.ajax({
                    type: "POST",
                    url: "/AVA/Turma/Home/CurtirDescurtirComentario",
                    data: {
                        idComentario: e,
                        curtiu: i
                    },
                    async: !0,
                    success: function (a) {
                        o.removeClass("carregando"), o.next().html("0" == a[0] ? "" : a), o.toggleClass("ativo")
                    },
                    error: function () {
                        o.removeClass("carregando"), console.log("Ocorreu um erro ao " + (i ? "curtir" : "descurtir") + " o comentario")
                    }
                })
            }
        }), a("body").on(tpClick, ".vertodoscurtirammensagem", function (o) {
            o.preventDefault();
            var e = a(this),
                i = a(this).attr("idmensagem"),
                r = {
                    href: e.attr("href"),
                    autoSize: !1,
                    width: 900,
                    height: 530,
                    autoResize: !1,
                    fitToView: !1,
                    height: "auto",
                    padding: 0,
                    type: "ajax",
                    scrolling: "no",
                    beforeShow: function () {
                        a("html").css({
                            overflow: "hidden"
                        })
                    },
                    afterClose: function () {
                        a("html").css({
                            overflow: "scroll"
                        })
                    },
                    afterShow: function () {
                        var a = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + i;
                        retornaJsonPagina(a)
                    },
                    helpers: {
                        overlay: {
                            locked: !1
                        }
                    }
                };
            a.fancybox(r)
        }), a("#ava_fluxoarticles").on(tpClick, ".vertodoscurtiramcomentario", function (o) {
            o.preventDefault();
            var e = a(this),
                i = a(this).attr("id"),
                r = {
                    href: e.attr("href"),
                    autoSize: !1,
                    width: 900,
                    height: 530,
                    autoResize: !1,
                    fitToView: !1,
                    height: "auto",
                    padding: 0,
                    type: "ajax",
                    scrolling: "no",
                    beforeShow: function () {
                        a("html").css({
                            overflow: "hidden"
                        })
                    },
                    afterClose: function () {
                        a("html").css({
                            overflow: "scroll"
                        })
                    },
                    afterShow: function () {
                        var a = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + i;
                        retornaJsonPagina(a)
                    },
                    helpers: {
                        overlay: {
                            locked: !1
                        }
                    }
                };
            a.fancybox(r)
        });
        var e = !1;
        a("#ava_fluxoarticles").on("keypress", "input[name=strComentario]", function (o) {
            if (!e && (_this = a(this), "" != _this.val() && (o.which && 13 == o.which || o.keyCode && 13 == o.keyCode))) {
                e = !0, _id_msg = _this.attr("ident");
                var r = _this.val();
                a.ajax({
                    url: "/AVA/Turma/Home/GravarComentario/",
                    type: "POST",
                    data: {
                        idMensagemRapida: _id_msg,
                        strComentario: encodeURIComponent(r)
                    },
                    success: function (o) {
                        var r = a(o),
                            t = r.attr("id").substring(7),
                            s = [],
                            n = a("#idsPriUpd_" + _id_msg).val();
                        "" != a.trim(n) && (s = atob(a("#idsPriUpd_" + _id_msg).val()).split(","));
                        var l = 0,
                            u = a("#totCom_" + _id_msg).val();
                        for ("" != a.trim(u) && (l = parseInt(atob(u))), l++ , a("#totCom_" + _id_msg).val(btoa(l)), s.push(t), a("#idsPriUpd_" + _id_msg).val(btoa(s.join(","))), a("#boxComentarios_" + _id_msg).prepend(r).slideDown(1e3), a("#boxComentarios_" + _id_msg).show(), a(".carregarComentarios[ide=" + _id_msg + "] .totalCarregado").text(s.length + " de " + l), _this.val(""), e = !1, a(".ctn_msg", r).expander(expanderOptions), i = 0; i < objetoIdMensagemRapida.idMsgRapida.length; i++)
                            if (objetoIdMensagemRapida.idMsgRapida[i] == _id_msg) {
                                objetoIdMensagemRapida.idMsgRapida.splice(i, 1), !objetoIdMensagemRapida.idMsgRapida.length > 0 && (bolFezAlteracaoConfiguracoes = !1);
                                break
                            }
                    },
                    error: function () {
                        console.log("Ocorreu um erro ao salvar o comentario")
                    }
                })
            }
        }), a("#ava_fluxoarticles").on(tpClick, ".coment_excluir", function () {
            var o = a(this).data("idcomentario"),
                e = (a(this), a(this).closest("article").attr("ide"));
            a.fancybox({
                type: "ajax",
                href: "/AVA/Turma/Home/ExcluirComentario/" + o,
                afterShow: function () {
                    a("body").on(tpClick, "#btnExcluirComentario" + o, function () {
                        a.ajax({
                            url: "/AVA/Turma/Home/ExcluirComentarioConfirmado/",
                            type: "POST",
                            data: {
                                idComentario: o
                            },
                            success: function (i) {
                                0 == i && console.log("Ocorreu um erro ao excluir o comentario"), a.fancybox.close(), a("#coment_" + o).slideUp().remove();
                                var r = [],
                                    t = 0,
                                    s = a.trim(a("#idsPriUpd_" + e).val());
                                if ("" != s) {
                                    r = atob(s).split(",");
                                    for (var n = [], l = 0; l < r.length; l++) r[l] != o && n.push(r[l]);
                                    t = n.length, a("#idsPriUpd_" + e).val(btoa(n))
                                }
                                var u = 0,
                                    d = a.trim(a("#totCom_" + e).val());
                                "" != d && (u = atob(d), u-- , a("#totCom_" + e).val(btoa(u))), a(".carregarComentarios[ide=" + e + "] .totalCarregado").text(t + " de " + u), 0 == u && (a(".carregarComentarios[ide=" + e + "]").slideUp().remove(), a(".escreverMais_[ide=" + e + "]").slideUp(), a("#boxComentarios_" + e).slideUp())
                            },
                            error: function () {
                                console.log("Ocorreu um erro ao excluir o comentario")
                            }
                        })
                    }), a("body").on(tpClick, "#btnCancelarExclusaoComentario" + o, function () {
                        a.fancybox.close()
                    })
                },
                closeBtn: !1,
                modal: !0,
                helpers: {
                    overlay: {
                        closeClick: !1,
                        locked: !1
                    }
                },
                padding: 0
            })
        }), a("#ava_fluxoarticles").on(tpClick, ".combo_denunciar_excluir", function (o) {
            o.preventDefault(), a("ul", this).show()
        }), a("#ava_fluxoarticles").on(tpClick, ".combo_denunciar_excluir .confirma_excluir", function () {
            {
                var o = a(this).closest("article").attr("ide");
                a(this)
            }
            a.fancybox({
                type: "ajax",
                href: "/AVA/Turma/Home/ExcluirMensagem/" + o,
                afterShow: function () {
                    a("body").on(tpClick, "#btnExcluidMensagem" + o, function () {
                        a.ajax({
                            url: "/AVA/Turma/Home/ExcluirMensagemConfirmado/",
                            type: "POST",
                            data: {
                                idMensagemRapida: o
                            },
                            success: function (e) {
                                if (0 == e) console.log("Ocorreu um erro ao excluir a mensagem");
                                else {
                                    toastr.success('Exclus&atilde;o realizada com sucesso.', 'Sucesso', {timeOut: 3000, positionClass: "toast-top-center", closeButton: true});
                                    var i = a("#intAlteracoesPagina").val();
                                    i-- , a("#intAlteracoesPagina").val(i), "0" != a("#idPostUnico").val() && (document.location.href = a("#strLinkGrupo").val()), verificaSePodeAcessarGaleria()
                                }
                                a.fancybox.close(), a("article[ide=" + o + "]").slideUp().remove()
                            },
                            error: function () {
                                console.log("Ocorreu um erro ao excluir a mensagem")
                            }
                        })
                    }), a("body").on(tpClick, "#btnCancelarExclusaoMensagem" + o, function () {
                        a.fancybox.close()
                    })
                },
                closeBtn: !1,
                modal: !0,
                helpers: {
                    overlay: {
                        closeClick: !1,
                        locked: !1
                    }
                },
                padding: 0
            })
        }), a("#ava_fluxoarticles").on(tpClick, "#verMaisMensagens", function () {
            paginaEducacional_CarregarMuralVerMais()
        }), a("body").on(tpClick, ".denunciar_mensagem", function (o) {
            o.preventDefault();
            var e = a(this).closest("article").attr("ide");
            a.fancybox({
                type: "ajax",
                href: "/rede/conteudo_denuncia.asp",
                afterShow: function () {
                    a("form[name=frmDenuncia]").find("h2").css({
                        position: "absolute",
                        top: "-10px"
                    }), a("#enviar_email").click(function () {
                        if ("" == a("#txtMotivo").val()) return alert("Favor preencher o motivo!"), !1;
                        var o = a("#txtMotivo").val();
                        a.ajax({
                            data: {
                                idMensagem: e,
                                strNome: a("#strNomeLogado").val(),
                                strLogin: a("#strLoginLogado").val(),
                                strEmail: a("#strEmailLogado").val(),
                                strURL: a("#strURLCorrente").val(),
                                strMotivo: o
                            },
                            type: "POST",
                            url: "/AVA/Barras/Denuncia/DenunciaMensagemGravar",
                            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                            success: function () {
                                alert("Sua den�ncia foi encaminhada para an�lise dos administradores do ambiente."), parent.$.fancybox.close()
                            },
                            error: function () { }
                        })
                    })
                },
                type: "ajax",
                helpers: {
                    overlay: {
                        locked: !1
                    }
                }
            })
        }), a("body").on(tpClick, "section.dialogo .criar_editar_assunto.fancy", function () {
            var o = a("#idGrupo").val();
            a.fancybox({
                type: "ajax",
                href: "/AVA/Turma/Home/ListaDeAssuntos/",
                ajax: {
                    type: "POST",
                    data: {
                        idGrupo: o
                    },
                    dataType: "html"
                },
                beforeShow: function () {
                    a("html").css({
                        overflow: "hidden"
                    })
                },
                afterShow: function () {
                    if (auxAssuntos.Adicionar = [], auxAssuntos.Editar = [], auxAssuntos.Remover = [], auxAssuntos.Mover = [], objAssuntoCadastrado = {
                        IdAssunto: 0,
                        StrAssunto: ""
                    }, bolAtualizarMuralDepoisDeAssuntos = !1, mobile) {
                        var o = a("#criareditar.fancyAssuntos ._feed_lista_assunto ul").width();
                        o = parseInt(auxWidth) + 20, a("#criareditar.fancyAssuntos ._feed_lista_assunto ul").width(o), a("#criareditar.fancyAssuntos ._feed_lista_assunto ul").mCustomScrollbar()
                    }
                },
                afterClose: function () {
                    a("html").css({
                        overflow: "scroll"
                    }), bolAtualizarMuralDepoisDeAssuntos && paginaEducacional_CarregarMural(1), objAssuntoCadastrado.IdAssunto > 0 ? (a("#hAssuntoPost").val(objAssuntoCadastrado.IdAssunto), a("#cbAssuntoPost input:checkbox").removeAttr("checked"), a("#ckAssuntoPost" + objAssuntoCadastrado.IdAssunto).attr("checked", "checked"), a("#txtAssuntoPost").html(objAssuntoCadastrado.StrAssunto + '&nbsp;<span class="caret"></span>')) : (a("#hAssuntoPost").val(a("#hAssuntoPost").attr("initvalue")), a("#cbAssuntoPost input:checkbox").removeAttr("checked"), a("#ckAssuntoPost" + a("#hAssuntoPost").val()).attr("checked", "checked"), a("#txtAssuntoPost").html(a("#ckAssuntoPost" + a("#hAssuntoPost").val()).next().text() + '&nbsp;<span class="caret"></span>'))
                },
                maxWidth: 425,
                maxHeight: 425,
                fitToView: !1,
                width: 425,
                height: 425,
                padding: 0,
                autoSize: !1,
                closeClick: !1,
                openEffect: "none",
                hideOnContentClick: !1,
                closeEffect: "none",
                scrolling: "no"
            })
        }), a("body").on(tpClick, "#criareditar .link_direto", function () {
            a(this).hide(), a(this).siblings("input").show().focus(), a(this).siblings(".inputAssuntoLimpar").show(), a("._feed_lista_assunto li.liassunto a:not(.inputAssuntoLimpar)").show(), a("._feed_lista_assunto li.liassunto span:not(.icon_excluir)").show(), a("._feed_lista_assunto li.liassunto input").hide(), a("._feed_lista_assunto li.liassunto div").hide(), a("._feed_lista_assunto li.liassunto a.inputAssuntoLimpar").hide(), a("._feed_lista_assunto li.liassunto a.salvarEditar_link").hide(), a("._feed_lista_assunto li.liassunto span.liassuntonome").each(function () {
                a(this).siblings("input").val(a(this).text())
            }), a(".salvar_link").show()
        }), a("body").on(tpClick, "#criareditar", function (o) {
            if (a(o.target).parent().hasClass("inputAssuntoLimpar") || a(o.target).hasClass("icon_limpar")) {
                var e = a(o.target).closest("li");
                a("input", e).val("").focus()
            } else if (a(o.target).hasClass("_inputNovoAssunto") || a(o.target).hasClass("_inputEditarAssunto") || a(o.target).hasClass("mostra_input") || a(o.target).hasClass("icon_editar") || a(o.target).hasClass("link_direto"));
            else {
                if (a("#criareditar ._inputNovoAssunto").is(":visible")) {
                    var i = a("#criareditar ._inputNovoAssunto");
                    a(i).removeClass("obrigatorio"), a(i).prev().hide(), a(i).hide(), a(i).siblings(".inputAssuntoLimpar").hide(), a(i).siblings("a:not(.inputAssuntoLimpar)").show(), a(i).val(""), a(i).siblings(".salvar_link").hide()
                }
                a("._feed_lista_assunto li.liassunto input:visible").each(function () {
                    var o = a(this).closest("li");
                    a("a:not(.inputAssuntoLimpar)", o).show(), a("a.inputAssuntoLimpar", o).hide(), a("span:not(.icon_excluir)", o).show(), a("input", o).hide(), a("div", o).hide(), a(".salvarEditar_link").hide(), a("span.liassuntonome", o).each(function () {
                        a(this).siblings("input").val(a(this).text())
                    })
                })
            }
        }), a("body").on(tpClick, "#criareditar .salvar_link", function () {
            idNovoAssunto--;
            var o = a.trim(a("._inputNovoAssunto").val());
            if (o.length > 0) {
                var e = "geral" == o.toLowerCase();
                if (e || a(".liassunto .liassuntonome").each(function () {
                    o.toLowerCase() == a(this).text().toLowerCase() && (e = !0)
                }), e) a(".tooltip_obrigatorio p").text("Esse assunto j� existe"), a("._inputNovoAssunto").prev().show(), a("._inputNovoAssunto").addClass("obrigatorio"), a(".salvar_link").trigger();
                else {
                    a(this).removeClass("obrigatorio"), a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio");
                    var i = '<li assu="' + idNovoAssunto + '" class="liassunto"><a href="javascript:void(0);" class="mostra_input"><span class="fontello icon_editar"></span></a><span class="liassuntonome">' + o + '</span><a href="javascript:void(0);" class="feed_confirma_exclui assusmpst"><span class="fontello icon_excluir"></span></a><div class="tooltip_obrigatorio" style="display:none;"><p>O nome do assunto � obrigat�rio</p><span class="seta_baixo"></span></div><input class="_inputEditarAssunto" type="text" value="' + o + '" maxlength="40" placeholder="Nome assunto"/><a href="javascript:void(0);" class="inputAssuntoLimpar" style="display:none;"><span class="fontello icon_limpar"></span></a><a href="javascript:void(0);" class="salvarEditar_link" style="display: none;"> Salvar</a></li>';
                    a(this).parent().after(i), a(this).blur(), a(this).hide(), a(this).siblings("a:not(.inputAssuntoLimpar)").show(), a(this).siblings("a.inputAssuntoLimpar").hide(), a(this).val("");
                    var r = {};
                    r.idAssunto = idNovoAssunto, r.strAssunto = o, auxAssuntos.Adicionar.push(r), a(".acoesResultado").text("Assunto criado"), GravarAssuntosCadastrados(0), a("._inputNovoAssunto").siblings(".salvar_link").hide()
                }
            } else a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio"), a("._inputNovoAssunto").addClass("obrigatorio"), a("._inputNovoAssunto").prev().show(), a(".salvar_link").trigger()
        }), a("body").on("keyup", "#criareditar ._inputNovoAssunto", function (o) {
            if (13 == o.keyCode) {
                idNovoAssunto--;
                var e = a.trim(a(this).val());
                if (e.length > 0) {
                    var i = "geral" == e.toLowerCase();
                    if (i || a(".liassunto .liassuntonome").each(function () {
                        e.toLowerCase() == a(this).text().toLowerCase() && (i = !0)
                    }), i) a(".tooltip_obrigatorio p").text("Esse assunto j� existe"), a(this).prev().show(), a(this).addClass("obrigatorio");
                    else {
                        a(this).removeClass("obrigatorio"), a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio");
                        var r = '<li assu="' + idNovoAssunto + '" class="liassunto"><a href="javascript:void(0);" class="mostra_input"><span class="fontello icon_editar"></span></a><span class="liassuntonome">' + e + '</span><a href="javascript:void(0);" class="feed_confirma_exclui assusmpst"><span class="fontello icon_excluir"></span></a><div class="tooltip_obrigatorio" style="display:none;"><p>O nome do assunto � obrigat�rio</p><span class="seta_baixo"></span></div><input class="_inputEditarAssunto" type="text" value="' + e + '" maxlength="40" placeholder="Nome assunto"/><a href="javascript:void(0);" class="inputAssuntoLimpar" style="display:none;"><span class="fontello icon_limpar"></span></a><a href="javascript:void(0);" class="salvarEditar_link" style="display: none;"> Salvar</a></li>';
                        a(this).parent().after(r), a(this).blur(), a(this).hide(), a(this).siblings("a:not(.inputAssuntoLimpar)").show(), a(this).siblings("a.inputAssuntoLimpar").hide(), a(this).val("");
                        var t = {};
                        t.idAssunto = idNovoAssunto, t.strAssunto = e, auxAssuntos.Adicionar.push(t), a(".acoesResultado").text("Assunto criado"), GravarAssuntosCadastrados(0), a(this).siblings(".salvar_link").hide()
                    }
                } else a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio"), a(this).addClass("obrigatorio"), a(this).prev().show()
            } else {
                if (27 == o.keyCode) return a(this).hide(), a(this).siblings("a:not(.inputAssuntoLimpar)").show(), a(this).siblings("a.inputAssuntoLimpar").hide(), a(this).val(""), a(".tooltip_obrigatorio").hide(), a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio"), !1;
                a(this).removeClass("obrigatorio"), a(this).prev().hide(), a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio")
            }
        }), a("body").on(tpClick, "#criareditar .mostra_input", function () {
            a(".link_direto").siblings("input").hide(), a(".link_direto").siblings(".inputAssuntoLimpar").hide(), a(".salvar_link").hide(), a(".link_direto").show(), a(".tooltip_obrigatorio").hide(), a("._feed_lista_assunto li.liassunto a:not(.inputAssuntoLimpar)").show(), a("._feed_lista_assunto li.liassunto a.inputAssuntoLimpar").hide(), a("._feed_lista_assunto li.liassunto a.salvarEditar_link").hide(), a("._feed_lista_assunto li.liassunto span:not(.icon_excluir)").show(), a("._feed_lista_assunto li.liassunto input").hide(), a("._feed_lista_assunto li.liassunto div").hide(), a("._feed_lista_assunto li.liassunto span.liassuntonome").each(function () {
                a(this).siblings("input").val(a(this).text())
            }), a(this).hide(), a(this).siblings("a, span").hide(), a(this).siblings(".salvarEditar_link").show(), a(this).siblings("a.inputAssuntoLimpar").show(), a(this).siblings("input").show().focus().off("keyup"), a(this).siblings("input").on("keyup", function (o) {
                if (13 == o.keyCode) {
                    var e = a(this).val();
                    if (e.length > 0) {
                        var i = "geral" == e.toLowerCase(),
                            r = parseInt(a(this).closest("li").attr("assu"));
                        if (i || a(".liassunto:not(.liassunto[assu=" + r + "]) .liassuntonome").each(function () {
                            e.toLowerCase() == a(this).text().toLowerCase() && (i = !0)
                        }), i) a(".tooltip_obrigatorio p").text("Esse assunto j� existe"), a(this).prev().show(), a(this).addClass("obrigatorio");
                        else {
                            if (a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio"), a(this).removeClass("obrigatorio"), a(this).siblings("span").text(e), 0 > r)
                                for (var t in auxAssuntos.Adicionar) auxAssuntos.Adicionar[t].idAssunto == r && (auxAssuntos.Adicionar[t].strAssunto = e);
                            else if (r > 0) {
                                var s = !1;
                                for (var t in auxAssuntos.Editar) auxAssuntos.Editar[t].idAssunto == r && (s = !0, auxAssuntos.Editar[t].strAssunto = e);
                                if (!s) {
                                    var n = {};
                                    n.idAssunto = r, n.strAssunto = e, auxAssuntos.Editar.push(n)
                                }
                            }
                            a(this).siblings("a:not(.inputAssuntoLimpar), span").show(), a(this).siblings("a.inputAssuntoLimpar").hide(), a(this).blur(), a(this).hide(), a(".acoesResultado").text("Assunto editado"), bolAtualizarMuralDepoisDeAssuntos = !0, GravarAssuntosCadastrados(r), a(this).siblings(".salvarEditar_link").hide()
                        }
                    } else a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio"), a(this).addClass("obrigatorio"), a(this).prev().show()
                } else {
                    if (27 == o.keyCode) return a(this).val(a(this).siblings("span").text()), a(this).siblings("a:not(.inputAssuntoLimpar), span").show(), a(this).siblings("a.inputAssuntoLimpar").hide(), a(this).hide(), a(".tooltip_obrigatorio").hide(), a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio"), !1;
                    a(this).removeClass("obrigatorio"), a(this).prev().hide(), a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio")
                }
            })
        }), a("body").on(tpClick, "#criareditar .salvarEditar_link", function () {
            var o = a(this).siblings("input").val();
            if (o.length > 0) {
                var e = "geral" == o.toLowerCase(),
                    i = parseInt(a(this).closest("li").attr("assu"));
                if (e || a(".liassunto:not(.liassunto[assu=" + i + "]) .liassuntonome").each(function () {
                    o.toLowerCase() == a(this).text().toLowerCase() && (e = !0)
                }), e) a(".tooltip_obrigatorio p").text("Esse assunto j� existe"), a(this).siblings("input").prev().show(), a(this).siblings("input").addClass("obrigatorio"), a(".salvar_link").trigger();
                else {
                    if (a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio"), a(this).removeClass("obrigatorio"), a(this).siblings("span").text(o), 0 > i)
                        for (var r in auxAssuntos.Adicionar) auxAssuntos.Adicionar[r].idAssunto == i && (auxAssuntos.Adicionar[r].strAssunto = o);
                    else if (i > 0) {
                        var t = !1;
                        for (var r in auxAssuntos.Editar) auxAssuntos.Editar[r].idAssunto == i && (t = !0, auxAssuntos.Editar[r].strAssunto = o);
                        if (!t) {
                            var s = {};
                            s.idAssunto = i, s.strAssunto = o, auxAssuntos.Editar.push(s)
                        }
                    }
                    a(this).siblings("a:not(.inputAssuntoLimpar), span").show(), a(this).siblings("a.inputAssuntoLimpar").hide(), a(this).blur(), a(this).hide(), a(".acoesResultado").text("Assunto editado"), bolAtualizarMuralDepoisDeAssuntos = !0, GravarAssuntosCadastrados(i), a("._inputEditarAssunto").siblings(".salvarEditar_link").hide()
                }
            } else a(".tooltip_obrigatorio p").text("O nome do assunto � obrigat�rio"), a(this).siblings("input").addClass("obrigatorio"), a(this).siblings("input").prev().show(), a(".salvar_link").trigger()
        }), a("body").on(tpClick, "#feed_confirma_RadioRemoverLabel", function () {
            a(this).addClass("inputRadioChecked"), a("#feed_confirma_RadioMoverLabel").removeClass("inputRadioChecked")
        }), a("body").on(tpClick, "#feed_confirma_RadioMoverLabel", function () {
            a(this).addClass("inputRadioChecked"), a("#feed_confirma_RadioRemoverLabel").removeClass("inputRadioChecked")
        }), a("body").on(tpClick, "#cbAssuntoEditar li label", function () {
            var o = a(this).parent().attr("assu");
            a("#hAssuntoEditar").val(o), a("#cbAssuntoEditar input[type=checkbox]").removeAttr("checked"), a("#ckAssuntoEditar" + o).attr("checked", "checked");
            var e = a(this).text() + '<span class="caret"></span>';
            return a("#txtAssuntoEditar").html(e), a("#cbAssuntoEditar").parent().removeClass("open"), !1
        }), a("body").on(tpClick, "#criareditar .feed_confirma_exclui", function () {
            var o = a(this).parent().attr("assu");
            a(this).hasClass("assusmpst") || parseInt(a(this).parent().attr("assu")) < 0 ? (a(".feed_confirma h2").text("Remover o assunto " + a(this).siblings("span").text() + "?"), a("#cbAssuntoEditar li[assu=" + o + "]").hide(), a("#idAssuntoRemover").val(o), a("strong, label, div.bootstrap", ".feed_confirma").hide(), a("#feed_confirma_RadioRemoverLabel, #feed_confirma_RadioMoverLabel").removeClass("inputRadioChecked"), a("#feed_confirma_RadioRemoverLabel").addClass("inputRadioChecked"), a(".feed_confirma input:radio").removeAttr("checked"), a("#feed_confirma_RadioRemover").attr("checked", "checked"), a("._feed_lista_assunto").hide(), a(".feed_confirma").slideDown()) : (a(".feed_confirma h2").text("Remover o assunto " + a(this).siblings("span").text() + "?"), a("#cbAssuntoEditar li[assu=" + o + "]").hide(), a("#idAssuntoRemover").val(o), a("._feed_lista_assunto").hide(), a(".feed_confirma").slideDown())
        }), a("body").on(tpClick, "#criareditar .feed_confirma .btn_cor", function () {
            var o = a("#feed_confirma_RadioRemover").is(":checked");
            if (o) {
                var e = a("#idAssuntoRemover").val(),
                    i = [];
                for (var r in auxAssuntos.Adicionar) auxAssuntos.Adicionar[r].idAssunto != e && i.push(auxAssuntos.Adicionar[r]);
                auxAssuntos.Adicionar = i, auxAssuntos.Remover.push(a("#idAssuntoRemover").val()), a("._feed_lista_assunto li[assu=" + a("#idAssuntoRemover").val() + "]").remove(), objAssuntoCadastrado.IdAssunto == e && (objAssuntoCadastrado = {
                    IdAssunto: 0,
                    StrAssunto: ""
                })
            } else {
                var t = {},
                    e = a("#idAssuntoRemover").val();
                t.idAssuntoOrigem = e, t.idAssuntoDestino = a("#hAssuntoEditar").val(), auxAssuntos.Mover.push(t), a("._feed_lista_assunto li[assu=" + a("#idAssuntoRemover").val() + "]").remove(), a("._feed_lista_assunto li[assu=" + t.idAssuntoDestino + "] .feed_confirma_exclui").removeClass("assusmpst"), objAssuntoCadastrado.IdAssunto == e && (objAssuntoCadastrado = {
                    IdAssunto: 0,
                    StrAssunto: ""
                })
            }
            a("#cbAssuntoEditar li[assu=" + a("#idAssuntoRemover").val() + "]").remove(), a(".acoesResultado").text("Assunto exclu�do"), bolAtualizarMuralDepoisDeAssuntos = !0, GravarAssuntosCadastrados(0), cancelarRemoverAssunto()
        }), a("body").on(tpClick, "#criareditar .feed_confirma .btn_cinza", cancelarRemoverAssunto), a("body").on(tpClick, "._feed_lista_assunto .acoes .btn_cinza", function () {
            a.fancybox.close()
        }), a("body").on(tpClick, "section.dialogo .actions", function () {
            if (!a(this).hasClass(".current")) {
                var o = a(this).attr("pos");
                paginaEducacional_CancelarDigaLaClick(), 
                a("section.dialogo .actions").removeClass("current"), 
                a(this).addClass("current"), 0 == o ? (a("section.dialogo .dialogo_box").show(), 
                    a("section.dialogo .mensagem_multimidia").show(), 
                    a("#btnCancelarFerramentaMural").show(), 
                    a("#visualizarPost").show(), 
                    a("section.dialogo .container_tarefas").hide().html(""), 
                    //a("#filtros_categoria").show(), 
                    a(".mensagem_multimidia").show(), 
                    a("#txtInput").focus(),
                    a("#txtInput").click(),
                    a("#agendar").hide()) : (a("section.dialogo .dialogo_box").hide(), 
                    a(".mensagem_multimidia").hide(), 
                    a("#agendarNovo").hide(),
                    // a("section.dialogo .mensagem_multimidia").hide(), 
                    a("#btnCancelarFerramentaMural").hide(), 
                    a("#visualizarPost").hide(), 
                    //a("#filtros_categoria").hide(), 
                    arrayArquivosUpload = null, 
                    a("section.dialogo .container_tarefas").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").show(), 
                a.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/AbreCriarTarefaRapida/",
                    success: function (o) {
                        a("section.dialogo .container_tarefas").html(o), 
                            a("#agendar").show(),
                            a("#agendarNovo").show(), 
                            a(".sep_digala").stop().removeAttr("style"), 
                            a("body").on("focus", "#strTituloTarefa", function () {
                                a(this).removeClass("ava_field_alert")
                        }), a("body").on("focus", "#intValorTarefa", function () {
                            a(this).removeClass("ava_field_alert")
                        }), a(".tooltip_title").tooltip({
                            offset: [-10, 0]
                        }), a("body").on(tpClick, "#valeNota", function () {
                            this.checked ? a("#intValorTarefa").removeAttr("disabled") : (a("#intValorTarefa").attr("disabled", "disabled"), a("#intValorTarefa").removeClass("ava_field_alert"))
                        }), a("#dataInicio").setMask("date"), a("#dataFim").setMask("date"), a("#horaInicio").setMask("29:59"), a("#horaFim").setMask("29:59"), a("#intValorTarefa").digitosDouble(), montaCampoData("#dataInicio", "#dataFim"), a("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function () {
                            a(this).removeClass("ava_field_alert")
                        }), a("#txtDescricaoTarefa").limit("1000", "")
                    },
                    error: function (o) {
                        0 != o.status && a("section.dialogo .container_tarefas").html("Erro ao carregar tarefa r�pida.")
                    }
                }))
            }
        }), bolCPPuro || (a('#ativ_lista_pais .tooltip_title_top[title!=""]').qtip(qtipOptionsTop), 
            a('#ativ_lista_normal .tooltip_title_top[title!=""]').qtip(qtipOptionsTop), 
            //carregarAtividades(), 
            carregarAtividadesFilhos(0)), 

            a("body").on(tpClick, "#cbNomeFilho li label", function () {
                var o = a(this).parent().attr("idf");
                a("#hIdFilho").val(o), a("#cbNomeFilho input[type=checkbox]").removeAttr("checked"), a("#ckNomeFilho" + o).attr("checked", "checked");
                var e = a(this).text() + '<span class="caret"></span>';
                return a("#txtNomeFilho").html(e), a("#cbNomeFilho").parent().removeClass("open"), carregarAtividadesFilhos(o), !1
        }), a.ajax({
            url: "/AVA/Turma/Home/Aniversariantes/",
            type: "POST",
            data: {
                idGrupo: a("#idGrupo").val()
            },
            success: function (o) {
                "0" != o && (a("section.aniversariantes_mes div").html(o), a("section.aniversariantes_mes").fadeIn())
            },
            error: function () {
                console.log("Ocorreu ao buscar aniversariantes")
            }
        }), a.ajax({
            url: "/AVA/Turma/Home/AlunosGrupo/",
            type: "POST",
            dataType: "json",
            data: {
                idGrupo: a("#idGrupo").val()
            },
            success: function (a) {
                "0" != a && (jsonAlunosGrupoTurma = a, montarHtmlAlunos(jsonAlunosGrupoTurma))
            },
            error: function () {
                console.log("Ocorreu ao buscar aniversariantes")
            }
        }), a("body").on("keyup", "#pesquisa_aluno_input", function () {
            var o = a.trim(a(this).val());
            if (o.length > 1) {
                var e = [];
                for (var i in jsonAlunosGrupoTurma) (jsonAlunosGrupoTurma[i].strNome.toLowerCase().indexOf(o.toLowerCase()) > -1 || jsonAlunosGrupoTurma[i].strApelido.toLowerCase().indexOf(o.toLowerCase()) > -1 || retira_acentos(jsonAlunosGrupoTurma[i].strNome).toLowerCase().indexOf(o.toLowerCase()) > -1 || retira_acentos(jsonAlunosGrupoTurma[i].strApelido).toLowerCase().indexOf(o.toLowerCase()) > -1) && e.push(jsonAlunosGrupoTurma[i]);
                0 == e.length ? (a(".alunos_turma_lista a").remove(), a(".alunos_turma_lista .clearfix").remove(), a(".alunos_turma_lista .feed_fitro").remove(), a(".alunos_turma_lista").append('<div class="clearfix"></div><div class="feed_fitro"><p>N�o foi encontrado nenhum nome para ' + o + ".</p></div>")) : montarHtmlAlunos(e)
            }
            else montarHtmlAlunos(jsonAlunosGrupoTurma)
        }), a.ajax({
            url: "/AVA/Turma/Home/ProfessoresGrupo/",
            type: "POST",
            data: {
                idGrupo: a("#idGrupo").val()
            },
            success: function (o) {

                "0" != o && (a("#ava_sobreaturma div.professores").append(o), a("#ava_sobreaturma div.professores").fadeIn())
            },
            error: function () {
                console.log("Ocorreu ao buscar aniversariantes")
            }
        }), a("body").on(tpClick, "section.galeria_da_turma .veja_mais_botao", function () {
            a(this).prev().remove(), a(this).remove();
            var o = a("#hPaginacaoGaleriaTurma").val();
            o++ , carregarGaleriaTurma(o)
            
        }), a("body").on(tpClick, "section.galeria_da_turma .menu_tipo_filtro li", function () {
            cancelarFiltrosGaleria();
            var o = a(this).attr("midiatipo");
            a(this).siblings("li").removeClass("ativo"), 
            a(this).addClass("ativo"), 
            a("#hGaleriaMidiaTipo").val(o), o > 0 ? a("section.galeria_da_turma .filtro_galeria .link_botao").fadeIn() : a("section.galeria_da_turma .filtro_galeria .link_botao").fadeOut(), 
            carregarGaleriaTurma(1)

        }), a("body").on(tpClick, "section.galeria_da_turma .filtro_galeria .btn_branco", function () {
            "0" != a("#hMesGaleriaTurma").val() || "0" != a("#hAssuntoGaleriaTurma").val() ? a("section.galeria_da_turma .filtro_galeria .link_botao").fadeIn() : a("section.galeria_da_turma .filtro_galeria .link_botao").fadeOut(), a("#hMesGaleriaTurmaFiltrado").val(a("#hMesGaleriaTurma").val()), a("#hAssuntoGaleriaTurmaFiltrado").val(a("#hAssuntoGaleriaTurma").val()), carregarGaleriaTurma(1)
        }), a("body").on(tpClick, "section.galeria_da_turma .filtro_galeria .link_botao", function () {
            a("section.galeria_da_turma .filtro_galeria .link_botao").fadeOut(), cancelarFiltrosGaleria(), carregarGaleriaTurma(1)
        }), a("body").on(tpClick, "#cbAssuntoGaleriaTurma li label", function () {
            var o = a(this).parent().attr("assu");
            a("#hAssuntoGaleriaTurma").val(o), a("#cbAssuntoGaleriaTurma input[type=checkbox]").removeAttr("checked"), a("#ckAssuntoGaleriaTurma" + o).attr("checked", "checked");
            var e = a(this).text() + '<span class="caret"></span>';
            return a("#txtAssuntoGaleriaTurma").html(e), a("#cbAssuntoGaleriaTurma").parent().removeClass("open"), !1
        }), a("body").on(tpClick, "#cbMesGaleriaTurma li label", function () {
            var o = a(this).parent().attr("mes");
            a("#hMesGaleriaTurma").val(o), a("#cbMesGaleriaTurma input[type=checkbox]").removeAttr("checked"), a("#ckMesGaleriaTurma" + o).attr("checked", "checked");
            var e = a(this).text() + '<span class="caret"></span>';
            return a("#txtMesGaleriaTurma").html(e), a("#cbMesGaleriaTurma").parent().removeClass("open"), !1
        }), a("body").on("submit", "#form_configuracoesturma", function () {
            return !1
        }), a("#usuario_filtro_denuncia").length && (a("#usuario_filtro_denuncia").autocomplete({
            source: function (o, e) {
                a.ajax({
                    type: "POST",
                    url: "/AVA/Turma/Home/TodosOsParticipantes/",
                    data: {
                        idGrupo: a("#idGrupo").val(),
                        strBusca: o.term
                    },
                    async: !0,
                    success: function (o) {
                        e(a.map(o, function (a) {
                            return {
                                label: a.StrApelido,
                                StrNome: a.StrNome,
                                StrApelido: a.StrApelido,
                                StrFoto: a.StrFoto
                            }
                        }))
                    },
                    error: function () {
                        console.log("Ocorreu um erro ao carregar atividades dos filhos"), a(".ui-autocomplete").hide()
                    }
                })
            },
            minLength: 2,
            select: function (o, e) {
                a("#usuario_filtro_denuncia").val(e.item.StrApelido)
            }
        }).data("autocomplete")._renderItem = function (o, e) {
            return a("<li>").data("item.autocomplete", e).append('<a><img style="width:35px; heigth: 35px;" src="' + e.StrFoto + '" /><span class="nome">' + e.StrApelido + "</span></a>").appendTo(o)
        }), a("body").on(tpClick, "#box_ListarDenuncia .btAbreFechaFiltro", function () {
            a("#box_ListarDenuncia .boxFiltro").is(":visible") ? (a("#box_ListarDenuncia .boxFiltro").slideUp(), a(this).html('Abrir<span class="fechado"></span>')) : (a("#box_ListarDenuncia .boxFiltro").slideDown(), a(this).html('Fechar<span class="aberto"></span>'))
        }), a("#srcFotoGrupo").val(a("#srcFotoGrupo").attr("initvalue")),
            a(".configuracoes_grupo .dados_turma input").val(a(".configuracoes_grupo .dados_turma input").attr("initvalue")),
            a(".configuracoes_grupo .dados_turma textarea").val(a(".configuracoes_grupo .dados_turma textarea").attr("initvalue")),
            "checked" == a("#imagens_grupo").attr("initvalue") ? a("#imagens_grupo").attr("checked", "checked") : a("#imagens_grupo").removeAttr("checked"),
            "checked" == a("#videos_grupo").attr("initvalue") ? a("#videos_grupo").attr("checked", "checked") : a("#videos_grupo").removeAttr("checked"), 
            "checked" == a("#arquivos_grupo").attr("initvalue") ? a("#arquivos_grupo").attr("checked", "checked") : a("#arquivos_grupo").removeAttr("checked"),
            "checked" == a("#filedrag_grupo").attr("initvalue") ? a("#filedrag_grupo").attr("checked", "checked") : a("#filedrag_grupo").removeAttr("checked"),
            "checked" == a("#ativar_grupo").attr("initvalue") ? a("#ativar_grupo").attr("checked", "checked") : a("#ativar_grupo").removeAttr("checked"), 
            objConfiguracoes.idGrupo = a("#idGrupo").val(), 
            objConfiguracoes.strFoto = a("#srcFotoGrupo").val(), 
            objConfiguracoes.strApelido = a(".configuracoes_grupo .dados_turma input").val(), 
            objConfiguracoes.strDescricao = a(".configuracoes_grupo .dados_turma textarea").val(), 
            objConfiguracoes.bolAlunoDragDrop = a("#filedrag_grupo").is(":checked") ,

            objConfiguracoes.bolAlunoImagem = a("#imagens_grupo").is(":checked"), 
            objConfiguracoes.bolAlunoVideo = a("#videos_grupo").is(":checked"), 
            objConfiguracoes.bolAlunoArquivo = a("#arquivos_grupo").is(":checked"),
            objConfiguracoes.bolGrupoAtivo = a("#ativar_grupo").is(":checked"), 
            a("body").on(tpClick, ".configuracoes_grupo .ultima_alteracao .btn_cor", 
        
            

        function () {
            salvarConfiguracoesGrupoTurma(!0)
        }), a("body").on("keyup change paste", "#form_configuracoesturma input, #form_configuracoesturma textarea", function () {
            bolFezAlteracaoConfiguracoes = !0
        }), a("body").on("keyup change paste", "input[name=strComentario]", function (o) {
            var e = !1,
                i = 0;
            for (_idMsgComentarioGlobal = a(o.target).attr("ident"), i = 0; i < objetoIdMensagemRapida.idMsgRapida.length; i++)
                if (objetoIdMensagemRapida.idMsgRapida[i] == _idMsgComentarioGlobal) {
                    e = !0;
                    break
                }
            e || "" != !a(".campo_comentar input.foco(article[ide=" + _idMsgComentarioGlobal + "] input.foco)").val() ? e = !1 : objetoIdMensagemRapida.idMsgRapida.push(_idMsgComentarioGlobal), "" == !a(".campo_comentar input.foco(article[ide=" + _idMsgComentarioGlobal + "] input.foco)").val() ? bolFezAlteracaoConfiguracoes = !0 : void 0 !== _idMsgComentarioGlobal && (objetoIdMensagemRapida.idMsgRapida.splice(i, 1), !objetoIdMensagemRapida.idMsgRapida.length > 0 && (bolFezAlteracaoConfiguracoes = !1))
        }), a("#box_ListarDenuncia").length && carregarDenuncias(), a(".dados_turma textarea").limit(1e3, ""), a("body").on("click", ".menu_topo .apelido_turma", function () {
            "0" == a("#idPostUnico").val() ? bolFezAlteracaoConfiguracoes ? (destinoConfiguracoes = "timeline", CustomConfirmConfiguracoes("timeline", objetoIdMensagemRapida, 0)) : PrepararTimeLine() : document.location.href = a("#strLinkGrupo").val()
        }), a("body").on("click", ".menu_topo .sobre_turma", function () {
            bolFezAlteracaoConfiguracoes ? (destinoConfiguracoes = "sobre", CustomConfirmConfiguracoes("sobre", objetoIdMensagemRapida, 0)) : PrepararSobre()

        }), a("body").on("click", ".menu_topo .mural_turma", function () {
            bolFezAlteracaoConfiguracoes ? (destinoConfiguracoes = "mural", CustomConfirmConfiguracoes("mural_", objetoIdMensagemRapida, 0)) : PrepararTimeLine()
        }), a("body").on("click", ".menu_topo .atividade_turma", function () {
            bolFezAlteracaoConfiguracoes ? (destinoConfiguracoes = "atividades", CustomConfirmConfiguracoes("atividade", objetoIdMensagemRapida, 0)) : PrepararAtividade()
        }), a("body").on("click", ".menu_topo .galeria_turma", function () {
            bolFezAlteracaoConfiguracoes ? (destinoConfiguracoes = "galeria", CustomConfirmConfiguracoes("galeria", objetoIdMensagemRapida, 0)) : PrepararGaleria()
        }), a("body").on("click", ".menu_topo .configuracoes_turma", function () {
            bolFezAlteracaoConfiguracoes ? (destinoConfiguracoes = "abaConfiguracoes", CustomConfirmConfiguracoes("abaConfiguracoes", objetoIdMensagemRapida, 0)) : PrepararConfiguracoes()
        })
    });
    var expanderOptions = {
        slicePoint: 500,
        window: 2,
        expandText: " leia mais",
        expandPrefix: "...",
        userCollapseText: "menos",
        preserveWords: !0,
        expandEffect: "fadeIn",
        collapseEffect: "fadeOut"
    },
        qtipOptionsTop = {
            style: {
                classes: "qtip-dark"
            },
            position: {
                my: "bottom center",
                at: "top center"
            }
        },
        qtipOptionsBottom = {
            style: {
                classes: "qtip-dark"
            },
            position: {
                my: "top center",
                at: "bottom center"
            }
        },
        ajaxTimeLine = null,
        ajaxGaleriaTurma = null,
        ajaxDenuncias = null,
        ajaxCarregarAtividades = null,
        ajaxCarregarAtividadesFilhos = null;
    jQuery(function (a) {
        a("#dadosPerfil").delegate("[id^=btseguir_perfil_]", "mouseover", function () {
            a("[id^=btseguir_perfil_]").children("span:first").css("display", "none").next().css("display", "block")
        }), a("#dadosPerfil").delegate("[id^=btseguir_perfil_]", "mouseout", function () {
            a("[id^=btseguir_perfil_]").children("span:first").css("display", "block").next().css("display", "none")
        })
        , 
        $( "#previewImagemDigaLaNovoTurma" ).dialog({
            autoOpen: false,
            height: 680,
            width: 900,
            modal: true,
            resizable: false,
            draggable: false,
            open: function(event, ui) {
                $(this).parent().find(".ui-dialog-titlebar").hide();
                $(this).parent().find(".ui-dialog-buttonpane").hide();
            },       
    
        })
        , 
        $( "#previewFileDigaLaNovoTurma" ).dialog({
            autoOpen: false,
            height: 680,
            width: 900,
            modal: true,
            resizable: false,
            draggable: false,
            open: function(event, ui) {
                $(this).parent().find(".ui-dialog-titlebar").hide();
                $(this).parent().find(".ui-dialog-buttonpane").hide();
            },       
    
        })
    });

    function removeItem(b, c) {
        var a = 0;
        while (a < b.length) {
            if (b[a].IdPost == c) {
                b.splice(a, 1)
            } else {
                a++
            }
        }
        return b
    };

    function ExcluirArquivoTodos() {
        var a = confirm("Tem certeza que deseja excluir os arquivos selecionados?");
        if(a){
            arraySelecionadosTemp = arraySelecionados.slice();
            if (arraySelecionadosTemp.length > 0) {
                for (var c = 0; c < arraySelecionadosTemp.length; c++) {             
                    var IdArquivos = arraySelecionadosTemp[c].IdArquivos;  
                    for (var x = 0; x < IdArquivos.length; x++) {
                        var idArquivo = IdArquivos[x];
                        ExcluirArquivo(idArquivo);
                    }
                    var div = "#itemGaleriea_"+arraySelecionadosTemp[c].IdPost;
                    $(div).remove();
                    arraySelecionados = new Array();
                    AtualizaContador();
                }
            }
            toastr.success('Arquivo(s) exclu&iacute;do(s) com sucesso..', 'Sucesso', {timeOut: 3000, positionClass: "toast-top-center", closeButton: true});
        }
        
    }
    
    function ExcluirArquivo(d) {        
        var b = ".idArq_" + d;
        if (arraySelecionados.length > 0) {
            for (var c = 0; c < arraySelecionados.length; c++) {
                if (d == arraySelecionados[c]) {
                    removeItem(arraySelecionados, d);
                    arraySelecionadosHtml.splice(c, 1); 
                    auxArq = true
                }
            }
        }
        $.ajax({
            data   : {
                id: d
            },
            error  : function (e) {
                console.debug(e.status)
            },
            success: function (g) {
                $(b).hide(500, function () {
                    $(b).remove();                    
                });
                ExcluirMensagemSemArquivo(d);
                
                var e = $("#idFerramentaTipo").val();
                var f = {
                    idArquivo       : d,
                    idFerramentaTipo: e
                }; 
                //if (window.opener.CallbackUploadExcluidos) {window.opener.CallbackUploadExcluidos(f)}
            },
            type   : "POST",
            url    : "/AVA/Upload/Home/Excluir"
        })
    };

    function ExcluirMensagemSemArquivo(idArquivo) {
        $.ajax({
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data       : {
                idArquivo   : idArquivo
            },
            error      : function (c) {
                console.debug(c.status)
            },
            success    : function (c) {
                console.log(c.status);
            },
            type       : "POST",
            url        : "/AVA/Turma/Home/ExcluirMensagemSemArquivo"
        })
    }

    function AtualizaContador() {        
        if (arraySelecionados.length > 0) {
            $(".arquivoSelecionado").slideDown()
        }
        if (arraySelecionados.length > 0 && globalSelecionados) {
            VisualizaSelecionados()
        }
        if (arraySelecionados.length == 0) {
            $(".arquivoSelecionado").slideUp();
            $("#galeria_rodape").hide();
            if (globalSelecionados) {
                ListaArquivosBiblioteca(a, 0)
            }
            $(".menu_arquivos").removeClass("active");
            $(".count_total").addClass("active")
        } else {
            $(".arquivoSelecionado p").html(
                "<strong>" + arraySelecionados.length + "</strong> arquivo(s) selecionado(s)"
            );

            $("#galeria_rodape").show();
        }
    }

    //TODO:::
    function SelectAll(){
        //var select = $("#SelecionarTodos").is(':checked');:::
        arraySelecionados = new Array();         
        $("#lista_item_galeria div.item_galeria").find("span").remove();

        if(selecionarTodosArquivos == 0) {
            selecionarTodosArquivos = 1;
            $("#SelecionarTodos").removeClass("inactive");
            $("#SelecionarTodos").addClass("active");
            
        }
        else {
            selecionarTodosArquivos = 0;
            $("#SelecionarTodos").removeClass("active");
            $("#SelecionarTodos").addClass("inactive");
        }

        if(selecionarTodosArquivos == 1) {   
            $("#lista_item_galeria div.item_galeria div.item_imagem_galeria").prepend('<span class="ava_clips_galeria"></span>');
            // $('#SelecionarTodos').show();
            $("#lista_item_galeria div.item_galeria").each(function(index, x){
                var arrayIdsArquivos = []; 
                var arrayArquivosDownload = [];
                // undefined
                var idArquivo = $(this).find("div").find("a").attr("data-idarquivo");
                var pathArquivo = $(this).find("div").find("a").attr("data-path");

                if (typeof idArquivo != "undefined") 
                    arrayIdsArquivos.push(idArquivo);

                if (typeof pathArquivo != "undefined") 
                    arrayArquivosDownload.push(pathArquivo);

                var idPost = $(this).find('.item_imagem_galeria').attr('data-idpost');
                arraySelecionados.push({
                    "IdPost" : idPost,
                    "IdArquivos" : arrayIdsArquivos,
                    "pathArquivos" : arrayArquivosDownload
                });
            });
        }else{
            $("#lista_item_galeria div.item_galeria div.item_imagem_galeria").prepend('<span class="ava_clips_galeria_off"></span>');
            // $('#SelecionarTodos').hide();            
        }
        console.log("arraySelecionados.length " + arraySelecionados.length);
        if (arraySelecionados.length == 0) {
            $(".arquivoSelecionado").slideUp();
            $("#galeria_rodape").hide();            
            $(".menu_arquivos").removeClass("active");
            $(".count_total").addClass("active")
        } else {
            $(".arquivoSelecionado").slideDown()
            
            $("#galeria_rodape").show();
        }
        $(".arquivoSelecionado p").html("<strong>" + arraySelecionados.length + "</strong> arquivo(s) selecionado(s)");
    }

    function VisualizarAll(){ 
        console.log("  VisualizarAll   ");
    }

    function DownloadAll(){    
        console.log("DownloadAll");    
        var arrayBase64 = [];

        for (var c = 0; c < arraySelecionados.length; c++) {

            var IdPost = arraySelecionados[c].IdPost;

            if (arraySelecionados.length == 1 && arraySelecionados[c].pathArquivos.length == 1) {
                var url = arraySelecionados[0].pathArquivos[0];
                var temp = url.substring(url.indexOf('/'), url.length);
                var pathArquivo = "/AVA/Upload/Home/ForceDownload?strSrcArquivo="+temp;
                window.location.assign(window.location.origin + pathArquivo);
                break;
            }
            else
            {
                for (var x = 0; x < arraySelecionados[c].pathArquivos.length; x++) {
                    var url = arraySelecionados[c].pathArquivos[x];
                    var temp = url.substring(url.indexOf('/'), url.length);
                    var pathArquivo = "/AVA/Upload/Home/ForceDownload?strSrcArquivo="+temp;
                    var extensaoArquivo = temp.substring(temp.lastIndexOf('.'), temp.length);
                    var nameFile = temp.substring(temp.lastIndexOf('/') + 1, temp.length);
                    console.log(temp);
    
                    toDataURL({"url": pathArquivo, "namefile":nameFile, "extensao": extensaoArquivo, "dataUrl":""}, function(data){
                        var arquivoBase64 = data.dataUrl.split(',');
                        arrayBase64.push({
                            "Name": data.namefile,
                            "Type": arquivoBase64[0],
                            "Data": arquivoBase64[1]
                        });
    
                        download(arraySelecionados, arrayBase64);
                    });
                }
            }
            
        }
        
    }

    function download(arraySelecionados, arrayBase64){
        var count = 0;
        for (var c = 0; c < arraySelecionados.length; c++) {
            for (var x = 0; x < arraySelecionados[c].pathArquivos.length; x++) {
                count++
            }
        }
        if(count == arrayBase64.length){
            var zip = new JSZip();
            
            for (var index = 0; index < arrayBase64.length; index++) {
                var element = arrayBase64[index];
                zip.file(element.Name, element.Data, { base64: true });    

                console.log(element.Name);

                if(index ==(arrayBase64.length-1 ) ){
                    zip.generateAsync({
                        type: 'blob'
                    }).then(function(content) {
                        saveAs(content, "Arquivos_"+(new Date()).getTime()+".zip");
                    });
                }
            }

        }
        
    }

    function toDataURL(object, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                object.dataUrl = reader.result;
                callback(object);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', object.url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    function b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }



    

  function ReslogaNoAprimora(){


        var secret = window.localStorage.getItem('secret');


        var loginName =  secret.substring(0 , secret.indexOf("..") )   ;
        //alert(loginName);
        
        var passSenha =  secret.substring(secret.indexOf("..") + 2 , secret.length )  ;
        //alert(passSenha);

        localStorage.setItem("idUser",null);

        localStorage.setItem("idUser", idUsuario );


        if( idUsuario =  4203599 ){

            var loginClass ={"lgn":"almarcio","snh":"1234","jds":"{ Version: '4.1.0', ClientId: 14 }","ipb":"2"} ; 
            //var loginClass ={"lgn":""+loginName,"snh":""+passSenha,"jds":"{ Version: '4.1.0', ClientId: 14 }","ipb":"2"} ; 

            loginClass.jds = "{ Version: '4.1.0', ClientId: 14 }";
        }
        else if( idUsuario =   1006840){

            var loginClass ={"lgn":"pfmarcio","snh":"1234","jds":"{ Version: '4.1.0', ClientId: 14 }","ipb":"2"} ; 
            //var loginClass ={"lgn":""+loginName,"snh":""+passSenha,"jds":"{ Version: '4.1.0', ClientId: 14 }","ipb":"2"} ; 

            loginClass.jds = "{ Version: '4.1.0', ClientId: 14 }";

        }
         else if( idUsuario = 4203599  ){

            var loginClass ={"lgn":"a1_ef9","snh":"1234","jds":"{ Version: '4.1.0', ClientId: 14 }","ipb":"2"} ; 
            //var loginClass ={"lgn":""+loginName,"snh":""+passSenha,"jds":"{ Version: '4.1.0', ClientId: 14 }","ipb":"2"} ; 

            loginClass.jds = "{ Version: '4.1.0', ClientId: 14 }";

        }
                        
       

        

                if(idUsuario == 4203599  || idUsuario == 1006840 || idUsuario == 4203599   ){

                try{

                       //Faz login do authv1
                       $.ajax({

                                                      url: "http://login.educacional.com.br/api/authv1",
                                                      async: true,
                                                      contentType: 'application/json; charset=utf-8',
                                                      cache: false, dataType: "json", type: 'POST',
                                                      data : JSON.stringify(loginClass),
                                                      success: function (data) {
                                                                                  
                                                          var initial = JSON.stringify(data);

                                                          var middle =  initial.substring(  initial.indexOf("Token\\\":\\\"")  , initial.indexOf("\",\"tka") )  ;

                                                          localStorage.setItem("tka",null);

                                                          localStorage.setItem("tka",data.tka);

                                                          var final = middle.substring(  middle.indexOf(":") + 3 , middle.indexOf("ver") );

                                                          final = final.substring(  0 , final.length - 5 );

                                                          localStorage.setItem("Token",null);

                                                          localStorage.setItem('Token',final);

                                                          // carregaCardsAprimora();
                                                          


                                                      },
                                                      error: function(error){

                                                         // document.fLoginAVA.submit();


                                                      }

                        });

                    
                }
                catch(err){

                }
            }

    }