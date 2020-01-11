var objetoImagens = {
    imagens: new Array()
};
var objetoArquivos = {
    arquivos: new Array()
};
var idFerramentaTipoGrupo = 36; //constante
var idFerramentaTipoGrupoFile = 38; //constante
var tpClick = "click";
var strNomeEducacional = "Educacional Projetos";
var strLogoEducacional = "/AVA/StaticContent/Common/img/paginas/projetos/icone_projetos.png";
var strLinkEducacional = "/AVA/Pagina/Projetos";


(function ($) {
    var methods = {
        init: function (parametros) {

            var bolCarregaMais = true;
            //-> Configurações padrão do plugin
            var configsTimeline = {
                "mensagem": "Olá, compartilhe idéias ou links!",
                "idProjeto": 0,
                "idGrupo": 0,
                "idAlbum": 0,
                "tipoProjeto": 1,
                "idArquivoMultimidia": 0,
                "bolVideo": true,           //Se deseja a opção de videos
                "bolImagens": true,           //Se deseja a opção de imagens
                "bolArquivos": true,           //Se deseja a opção de arquivos
                "bolComentarios": true,           //Se deseja a opção de comentarios
                "bolCorretor": true,           //Se deseja a opção de corretor ortográfico
                "bolMediador": true,
                "bolEducador": true,
                "bolConfigImagens": "",             //Verifica se o usuário tem permissão de enviar imagens
                "bolConfigVideos": "",             //Verifica se o usuário tem permissão de enviar videos
                "bolConfigArquivos": "",             //Verifica se o usuário tem permissão de enviar arquivos
                "bolPodeParticipar": false,
                "bolParticipando": false,
                "intInicio": 1,
                "intFim": 10,
                "carregarMais": false,
                "prepend": true,
                "bolEncerrado": false
            };

            if (parametros) {
                $.extend(configsTimeline, parametros);
            }

            //-> Inicia o plugin
            return this.each(function () {
                var principal = $(this);
                var dataTimeline = principal.data("timeline");
                var divTimeline = principal[0].id;
                var ajaxCarregarTimeline = null;
                var htmlTimeline = "";
                var objMensagens = null;
                var exibeMensagens = false;
                var timeout = null;
                var mobile = false;


                if (configsTimeline.bolEncerrado) {
                    configsTimeline.bolParticipando = false;
                }

                if (!dataTimeline) {

                    //-> Verifica se é mobile ou desktop que tá acessando
                    if (Modernizr.touch) {
                        var ua = navigator.userAgent.toLowerCase();
                        var isAndroid = ua.indexOf("android") > -1;
                        if (isAndroid) {
                            tpClick = "click";
                        } else {
                            tpClick = "touchstart"; //usado para funcionar o click nos mobile's
                            mobile = true;
                        }
                    }

                    //* INÍCIO FUNÇÕES DIGA LÁ *//

                    //-> Excluir uma mensagem
                    function exclusaoMensagem() {
                        $(".excluir_mensagem_grupo").each(function (i) {
                            $(this).fancybox(
                            {
                                fitToView: true,
                                padding: 0,
                                autoSize: true,
                                closeClick: false,
                                openEffect: 'none',
                                autoResize: true,
                                closeEffect: 'none',
                                closeBtn: false,
                                helpers: {
                                    overlay: {
                                        closeClick: false,
                                        locked: false
                                    }
                                },
                                afterShow: function () {
                                    $("#btnCancelarExclusaoMensagem").click(function () {
                                        $.fancybox.close();
                                    });

                                    $("#btnExclusaoMensagem").click(function () {
                                        excluirMensagem($(this).attr("idMensagem"));
                                    });
                                }
                            }
                        );
                        });
                    }

                    //-> Função para validar a URL do video 
                    function validaURLVideo(data) {
                        if (data.length > 0) {

                            data.match(/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be))\/(video\/|embed\/|watch\?v=)?([A-Za-z0-9._%-]*)(\&\S+)?/);
                            var match = {
                                provider: null,
                                url: RegExp.$2,
                                id: RegExp.$5
                            }

                            var request;
                            $.support.cors = true;
                            if (match.url == 'youtube.com' || match.url == 'youtu.be') {
                                //var link = 'http://gdata.youtube.com/feeds/api/videos/' + match.id + '?v=2&alt=json';

                                request = $.ajax({
                                    url: getYoutubeURLDados(match.id),
                                    timeout: 5000,
                                    success: function (data, status, xhr) {
                                        match.provider = 'youtube';
                                    },
                                    dataType: 'jsonp'
                                });

                            }

                            if (match.url == 'vimeo.com') {
                                var link = 'http://vimeo.com/api/v2/video/' + match.id + '.json'

                                request = $.ajax({
                                    url: link,
                                    timeout: 2000,
                                    dataType: 'jsonp',
                                    success: function () {
                                        match.provider = 'vimeo';
                                    }
                                });
                            }

                            if (request) {
                                request.always(function () {
                                    if (match.provider) {
                                        return true;
                                    } else {
                                        $('.verificavideo').fadeOut('fast', function () {
                                            $(".errovideo").fadeIn('slow');
                                        });
                                        return false;
                                    }
                                });
                            } else {
                                $('.verificavideo').fadeOut('fast', function () {
                                    $(".errovideo").fadeIn('slow');
                                });
                                return false;
                            }
                        }
                        return false;
                    }

                    //-> Montar preview do video 
                    function montaPreviewVideoMensagem(data) {

                        data = decodeURI(data).replace(/\s/g, '');
                        var time = "";

                        if (data.length > 0) {

                            $('.errovideo').fadeOut('fast', function () {
                                $(".verificavideo").fadeIn('slow');
                            });

                            if (data.indexOf("#t=") > 1 || data.indexOf("&t=") > 1 || data.indexOf("&amp;t=") > 1 || data.indexOf("?t=") > 1) {
                                time = getVideoTime(data);
                            }

                            if (data.indexOf("http://") > -1) {
                                data = data.replace("http://", "");
                            } else if (data.indexOf("https://") > -1) {
                                data = data.replace("https://", "");
                            }

                            data.match(/^(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be)|youtube)\/(video\/|embed\/|watch\?v=)?([A-Za-z0-9._%-]*)(\&\S+)?/);

                            var match = {
                                provider: null,
                                url: RegExp.$2,
                                id: RegExp.$5
                            }

                            var request;
                            $.support.cors = true;
                            if (match.url == 'youtube.com' || match.url == 'youtu.be' || match.url == 'youtube') {
                                //var link = 'http://gdata.youtube.com/feeds/api/videos/' + match.id + '?v=2&alt=json';

                                request = $.ajax({
                                    url: getYoutubeURLDados(match.id),
                                    timeout: 5000,
                                    success: function (data, status, xhr) {
                                        match.provider = 'youtube';
                                    },
                                    dataType: 'jsonp'
                                });

                            }

                            if (match.url == 'vimeo.com') {
                                var link = 'http://vimeo.com/api/v2/video/' + match.id + '.json'

                                request = $.ajax({
                                    url: link,
                                    timeout: 2000,
                                    dataType: 'jsonp',
                                    success: function () {
                                        match.provider = 'vimeo';
                                    }
                                });
                            }

                            if (request && match.id != "") {

                                request.always(function () {

                                    if (match.provider) {

                                        var strLinkVideo = "";
                                        var classIframe = "";

                                        $('.enviar_video, .verificavideo, .errovideo').hide();

                                        if (match.provider == "youtube") {
                                            strLinkVideo = "www.youtube.com/embed/" + match.id + "?rel=0&wmode=transparent";
                                            if (time.length > 0)
                                                strLinkVideo += "&start=" + time;
                                        } else {
                                            classIframe = ' class="iframeVideoVimeo" ';
                                            strLinkVideo = "player.vimeo.com/video/" + match.id + "?badge=0&byline=0&portrait=0&title=0&player_id=playerPreview&api=1";
                                            if (time.length > 0)
                                                strLinkVideo += "#t=" + time;
                                        }

                                        $("#container_preview_video").html(
                                                '<iframe ' + classIframe + ' width="300" height="165" src="//' + strLinkVideo + '" allowTransparency="true" frameborder="0" allowfullscreen></iframe>' +
                                        //'<a href="javascript: void(0);" onClick="removerPreviewVideoMensagem();" class="remover_multimidia"><span class="FontAwesome"></span>Remover</a>'
                                                '<a href="javascript: void(0);" class="remover_multimidia remover_preview_video"><span class="FontAwesome"></span>Remover</a>'
                                            ).fadeIn('slow', function () {

                                                $('.enviar_video, .verificavideo, .errovideo').hide();
                                                $('#compartilhar').show();
                                                $('#compartilhar').removeClass('disable').prop("disabled", false);
                                                $("#urlVideoOriginal").val(data);

                                                $(".iframeVideoVimeo").on('load', function () {
                                                    var playerVimeo = $f(this);
                                                    var playerVimeoStarted = false;
                                                    playerVimeo.api('pause');
                                                    playerVimeo.addEvent('ready', function () {
                                                        playerVimeo.addEvent('play', function () {
                                                            if (!playerVimeoStarted) {
                                                                playerVimeoStarted = true;
                                                                playerVimeo.api('pause');
                                                            }
                                                        });
                                                    });
                                                });

                                            });
                                    } else {
                                        $('.verificavideo').fadeOut('fast', function () {
                                            $(".errovideo").fadeIn('slow');
                                        });
                                    }
                                });
                            } else {
                                $('.verificavideo').fadeOut('fast', function () {
                                    $(".errovideo").fadeIn('slow');
                                });
                            }
                        }
                        return false;
                    }

                    //-> Remover preview do video
                    function removerPreviewVideoMensagem(btnCancelar) {

                        if (btnCancelar === undefined || btnCancelar == null || btnCancelar == "") {
                            btnCancelar = false;
                        }

                        $("#container_preview_video").fadeOut('slow', function () {

                            //correção do bug do vimeo no IE
                            $(this).find("iframe").attr('src', '');
                            setTimeout(function () {
                                $(this).find("iframe").remove();
                                $(this).html("")
                            }, 500);

                            $("#txtLinkVideoMensagem").val("");
                            if (!btnCancelar) {
                                $('.enviar_video').show();
                            }
                            var strMensagemPadrao = "Olá! Compartilhe aqui ideias ou links!";
                            var strMensagem = $('#txtInput').val();

                            if (strMensagem == '' || strMensagem == strMensagemPadrao) {
                                $(".dialogo_box .preview_post.arquivos").hide();
                                $("#compartilhar").hide();
                                $("#btnCancelarFerramentaMural").hide();
                                $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                                $(".dialogo .mensagem_multimidia").show();
                                $("#seletorMuralDigaLa").hide();
                                $(".enviar_video").hide();
                            }
                            if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val() !== "") {
                                $(".dialogo .mensagem_multimidia").show();
                                $(".enviar_video").hide();
                            }
                        });

                    }

                    //-> Remover list do youtube
                    function removerListUrlYoutube(url) {
                        var regExp = "list?=?([^#\&\?]*)";
                        var match = url.match(regExp);

                        var retorno = "";
                        if (match != null) {
                            var listReplace1 = "&" + match[0];
                            var listReplace2 = match[0];

                            if (url.indexOf(listReplace1) > 0) {
                                retorno = url.replace(listReplace1, "");
                            } else {
                                retorno = url.replace(listReplace2, "");
                            }
                        } else {
                            retorno = url;
                        }

                        if (retorno.indexOf("http") >= 0) {
                            return retorno;
                        } else {
                            return "http://" + retorno;
                        }
                    }

                    //-> Limpar preview de arquivos na timeline
                    function limpaArrayArquivosTimeLine() {
                        if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
                            objetoArquivos.arquivos.splice(0, objetoArquivos.arquivos.length);
                        }
                    }

                    //-> Limpar preview de arquivos na mensagem rápida
                    function limpaPreviewArquivosMensagemRapida() {
                        $(".dialogo_box .preview_post.arquivos .prev_documento").parent().remove();
                    }

                    //-> Limpar o preview de imagens selecionadas ao clicar em cancelar postagem
                    function limpaPreviewImagemMensagemRapida() {
                        $(".dialogo_box .preview_post.imagens .engloba_classe .prev_imagem").not(".adicionar").remove();
                    }

                    //-> Limpar o array com imagens
                    function limpaArrayImagensTimeLine() {
                        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
                            objetoImagens.imagens.splice(0, objetoImagens.imagens.length);
                        }
                    }

                    //-> Abrir upload de imagens
                    function abreUpload() {
                        var flagContinua = true;
                        var idalbum = parseInt($(".dialogo .dialogo_box .preview_post.imagens").data("idalbum"));
                        var nomeGrupo = "clube_astronomia" //Arrumar essa xinelagem
                        $.fancybox.showLoading();
                        if (idalbum === undefined || idalbum == null || idalbum == 0) {
                            $.ajax({
                                url: "/ava/projetos/clube/home/getIdAlbum",
                                cache: false,
                                dataType: "json",
                                data: {
                                    idGrupo: configsTimeline.idGrupo
                                },
                                type: "GET",
                                async: false,
                                success: function (data) {
                                    idalbum = parseInt(data);
                                    configsTimeline.idAlbum = idalbum;
                                    $(".dialogo .dialogo_box .preview_post.imagens").data("idalbum", idalbum);
                                },
                                error: function (data) {
                                    flagContinua = false;
                                }
                            });
                        }
                        if (flagContinua) {
                            var param = {
                                "idFerramenta": idalbum,
                                "idFerramentaTipo": idFerramentaTipoGrupo

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
                            if (Modernizr.touch) {
                                parametros = null;
                            }
                            a = window.open("", "Upload", parametros);
                            if (a) {
                                mForm.submit();
                            }
                            $.fancybox.hideLoading();
                        }
                    }

                    //-> Abrir o upload de arquivos
                    function abreUploadFileTimeLine() {
                        var flagContinua = true;
                        var idArquivoMultimidia = parseInt($(".dialogo .dialogo_box .preview_post.arquivos").data("idarquivomultimidia"));
                        $.fancybox.showLoading();
                        if (idArquivoMultimidia === undefined || idArquivoMultimidia == null || idArquivoMultimidia == 0) {
                            $.ajax({
                                url: "/ava/projetos/clube/home/VerificaIdArquivoMultimidia/",
                                data: { 'idGrupo': configsTimeline.idGrupo },
                                dataType: "json",
                                async: false,
                                cache: false,
                                success: function (data) {
                                    idArquivoMultimidia = parseInt(data);
                                },
                                error: function (data) {
                                    $.fancybox.hideLoading();
                                    flagContinua = false;
                                }
                            });
                        }
                        if (flagContinua) {
                            var param = {
                                "idFerramenta": idArquivoMultimidia,
                                "idFerramentaTipo": idFerramentaTipoGrupoFile

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
                            if (Modernizr.touch) {
                                parametros = null;
                            }
                            a = window.open("", "Upload", parametros);
                            if (a) {
                                mForm.submit();
                            }
                            $.fancybox.hideLoading();
                        }
                    }

                    //-> Monta o preview de arquivos
                    function montaPreviewFilesMensagemRapida(obj) {

                        var $caixa = $(".dialogo_box .preview_post.arquivos .mCSB_container");

                        if (obj !== undefined && obj != null && obj.length > 0) {
                            for (var i = 0; i < obj.length; i++) {

                                var $div = $("<div />").data("idarquivo", obj[i].idArquivo);
                                var $divv = $("<div />").addClass("prev_documento");
                                var $div3 = $("<div />").addClass("tipo_arquivo");
                                var $img = $("<img />").attr("src", "/ava/StaticContent/Common/img/perfil/documento_multimidia.png").attr("width", "32").attr("height", "41");
                                var $span = $("<span />").text(obj[i].extensao.substring(1, obj[i].extensao.length));
                                var $p = $("<p />").text((obj[i].nome == "" ? obj[i].arquivo : obj[i].nome));
                                var $a = $("<a />").attr("href", "javascript: void();").addClass("remover_multimidia").text("Remover");
                                var $spana = $("<span />").addClass("FontAwesome");

                                $div3.append($img);
                                $div3.append($span);
                                $divv.append($div3);
                                $divv.append($p);
                                $a.prepend($spana);
                                $div.append($divv);
                                $div.append($a);
                                $caixa.find(".adicionar_doc").prev().before($div);
                            }
                            $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update");
                        }
                    }

                    //-> Limpa o preview de arquivos
                    function limpaPreviewArquivosMensagemRapida() {
                        $(".dialogo_box .preview_post.arquivos .prev_documento").parent().remove();
                    }

                    //-> Limpa o array de arquivos
                    function limpaArrayArquivosTimeLine() {
                        if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
                            objetoArquivos.arquivos.splice(0, objetoArquivos.arquivos.length);
                        }
                    }

                    ///-> Busca os assuntos do grupo
                    function buscaAssuntos(idGrupo) {

                        $.ajax({
                            url: "/ava/projetos/clube/home/buscaAssuntos",
                            cache: false,
                            dataType: "json",
                            data: {
                                idGrupo: configsTimeline.idGrupo
                            },
                            type: "GET",
                            async: false,
                            success: function (data) {
                                if (parseInt(data.error) == 0) {

                                    var tempAssuntos = "";
                                    for (var as = 0; as < data.assuntos.length; as++) {
                                        var mostraAssunto = true

                                        if (data.assuntos[as].strAssunto.toLowerCase() == "avisos" && parseInt(data.idTipoParticipante) == 3 || !configsTimeline.bolParticipando) {
                                            mostraAssunto = false;
                                        }
                                        if (mostraAssunto) {
                                            tempAssuntos = tempAssuntos + "<li>";

                                            //Sempre traz o assunto geral com checked, pra caso o usuário não selecione nenhum assunto.
                                            if (data.assuntos[as].strAssunto.toLowerCase() == "geral") {
                                                tempAssuntos = tempAssuntos + "<input id=\"rbAssuntoMensagem_" + as + "\" type=\"radio\" checked=\"checked\" name=\"rbAssuntoMensagem\" value=\"" + data.assuntos[as].id + "\"/>";

                                            } else {
                                                tempAssuntos = tempAssuntos + "<input id=\"rbAssuntoMensagem_" + as + "\" type=\"radio\" name=\"rbAssuntoMensagem\" value=\"" + data.assuntos[as].id + "\"/>";
                                            }
                                            tempAssuntos = tempAssuntos + "<label for=\"rbAssuntoMensagem_" + as + "\" ><span class=\"FontAwesome\"></span>" + data.assuntos[as].strAssunto + "</label>";
                                            tempAssuntos = tempAssuntos + "</li>";
                                        }
                                    }

                                    $("#cbAssuntoMensagem").html(tempAssuntos);

                                } else {
                                    alert("Erro ao buscar os assuntos.");
                                }
                            },
                            error: function (data) {
                                alert("Erro ao buscar os assuntos.");
                            }
                        });
                    }

                    //-> Busca se o usuário logado pode realmente enviar multmidia
                    function getConfiguracoes() {
                        $.ajax({
                            url: "/ava/projetos/clube/home/getConfiguracoesProjeto",
                            dataType: "json",
                            type: "GET",
                            async: false,
                            cache: false,
                            success: function (data) {

                                configsTimeline.bolConfigArquivos = data.config.bolConfigFile;
                                configsTimeline.bolConfigImagens = data.config.bolConfigImagem;
                                configsTimeline.bolConfigVideos = data.config.bolConfigVideo;

                            },
                            error: function (data) {
                                //alert("Erro ao buscar configurações.");
                            }
                        });
                    }

                    //->  Compartilhar itens na timeline
                    function validaMensagem() {
                        $('#compartilhar').addClass('disable');

                        var idAssunto = parseInt($("#cbAssuntoMensagem li").find("input:checked").val());
                        var strLinkVideo = "";

                        if ($('#container_preview_video').find('iframe').attr('src') != undefined && $('#container_preview_video').find('iframe').attr('src') != "") {
                            strLinkVideo = removerListUrlYoutube($("#urlVideoOriginal").val());
                        }
                        var bolComenta = $(".checkbox_personalizado_css input").prop("checked");
                        if (bolComenta) {
                            bolComenta = 1;
                        } else {
                            bolComenta = 0;
                        }
                        var mensagemEnviar = $('#txtInput').val().replace(/\r?\n|\r/g, "<br>");
                        if (mensagemEnviar == configsTimeline.mensagem) {
                            mensagemEnviar = "";
                        }
                        $.ajax({
                            url: '/AVA/Grupo/Home/SaveMensagemProjetos',
                            type: 'POST',
                            cache: false,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            data: {
                                'strMensagem': mensagemEnviar,
                                'idGrupo': configsTimeline.idGrupo,
                                'idAssunto': idAssunto,
                                'idProjeto': configsTimeline.idProjeto,
                                'strLinkVideo': strLinkVideo,
                                'bolComenta': bolComenta,
                                "imagens": JSON.stringify(objetoImagens.imagens),
                                "arquivos": JSON.stringify(objetoArquivos.arquivos)
                            },
                            success: function (data) {
                                $('#txtInput').val('');
                                $('#txtInput').css("height", "48px");
                                $('#txtInput').siblings(":last").html('');
                                $('#compartilhar').addClass('disable').prop("disabled", true);
                                $(".checkbox_personalizado_css input").prop("checked", true);

                                //Poe o checked no assunto geral novamente.
                                $("#cbAssuntoMensagem li").each(function () {
                                    var label = $(this).find("label");
                                    var valor = label.html().replace("<span class=\"FontAwesome\">", "").replace("</span>", "");
                                    if (valor.toLowerCase() == "geral") {

                                        $(this).find("input").prop("checked", true);
                                        temP = "";
                                        temP = temP + "<span class=\"FontAwesome\"></span> Geral ";
                                        temP = temP + "<span class=\"caret\"></span>";
                                        $("#assunto_digala").find("a").html("").html(temP);
                                    }
                                })

                                if ($("#boxTimeLineGrupos").find("article").last().text() == "Nenhuma mensagem enviada.") {
                                    $("#boxTimeLineGrupos").find("article").last().remove();
                                }

                                //remove o vídeo
                                $("#container_preview_video").fadeOut('slow', function () {
                                    $(this).html("");
                                    $('.enviar_video').hide();
                                    $('#txtLinkVideoMensagem').val("");
                                });
                                $("#urlVideoOriginal").val("");

                                exclusaoMensagem();
                                exclusaoComentario();
                                //acoesComentario();

                                $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                                $("#btnCancelarFerramentaMural").hide();
                                $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                                $(".mensagem_multimidia").show();
                                if ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible")) {
                                    $(".dialogo .dialogo_box .preview_post.imagens").hide();
                                }
                                //Limpa preview de imagem
                                if ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")) {
                                    $(".dialogo .dialogo_box .preview_post.arquivos").hide();
                                }

                                limpaPreviewImagemMensagemRapida();
                                limpaArrayImagensTimeLine();
                                limpaPreviewArquivosMensagemRapida();
                                limpaArrayArquivosTimeLine();

                                //configsTimeline.callbackSalvarMensagem();
                                carregaTimeline(1, 1, true);

                            },
                            error: function (data) {
                                alert("Ocorreu um erro no banco de dados.");
                            }
                        });
                    }

                    function exclusaoComentario() {
                        $(".excluir_comentario_grupo").each(function () {
                            $(this).fancybox(
                                {
                                    fitToView: true,
                                    padding: 0,
                                    autoSize: true,
                                    closeClick: false,
                                    openEffect: 'none',
                                    autoResize: true,
                                    closeEffect: 'none',
                                    closeBtn: false,
                                    helpers: {
                                        overlay: {
                                            closeClick: false,
                                            locked: false
                                        }
                                    },
                                    afterShow: function () {
                                        $("#btnCancelarExclusaoMensagem").click(function () {
                                            $.fancybox.close();
                                        });

                                        $("#btnExclusaoMensagem").click(function () {
                                            excluirComentario($(this).attr("idMensagem"));
                                        });
                                    }
                                }
                            );
                        });
                    }

                    function getSlugFromString(palavra) {

                        var com_acento = "àáâãäåāăąạảấầẩẫậắằẳẵặǟǡǻȁȃǎȧḁẚḃḅḇçćĉċčḉďđḋḍḏḑḓèéêëēĕėęěȅȇȩḕḗḙḛḝẹẻẽếềểễệḟḡĝğġģǧǵḣḥḧḩḫĥħȟẖìíîïḭḯĩīĭįǐȉȋỉịĵḱḳḵķĸǩḷḹḻḽĺļľŀłḿṁṃñṅṇṉṋńņňŉŋǹòóôõöōŏőǒǫǭȍȏȫȭȯȱṍṏṑṓọỏốồổỗộờởỡợṕṗŕŗřȑȓṙṛṝṟśŝşššșṡṣṥṧṩţťŧțṫṭṯṱẗùúûüũūŭůűưǔǖǘǚǜȕȗụủứừửữựṳṵṷṹṻµṽṿŵẁẃẅẇẉẘẋẍŷȳẏẙỳỵỷỹýÿźżžžȥẑẓẕÀÁÂÃÄÅĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶǞǠǺȀȂǍȦḀḂḄḆÇĆĈĊČḈĎĐḊḌḎḐḒÈÉÊËĒĔĖĘĚȄȆȨḔḖḘḚḜẸẺẼẾỀỂỄỆḞḠĜĞĠĢǦǴḢḤḦḨḪĤĦȞẖÌÍÎÏḬḮĨĪĬĮǏȈȊẛỈỊĴḰḲḴĶǨḶḸḺḼĹĻĽĿŁḾṀṂÑṄṆṈṊŃŅŇŊǸÒÓÔÕÖŌŎŐǑǪǬȌȎȪȬȮȰṌṎṐṒỌỎỐỒỔỖỘỚỞỠỢṔṖŔŖŘȐȒṘṚṜṞŚŜŞŠŠȘṠṢṤṦṨŢŤŦȚṪṬṮṰÙÚÛÜŨŪŬŮŰƯǓǕǗǙǛȔȖỤỦỨỪỬỮỰṲṴṶṸṺṼṾŴẀẂẄẆẈẊẌŶȲẎỲỴỶỸÝŸŹŻŽŽȤẐẒẔ";
                        var sem_acento = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbccccccdddddddeeeeeeeeeeeeeeeeeeeeeeeeefggggggghhhhhhhhhiiiiiiiiiiiiiiijkkkkkklllllllllmmmnnnnnnnnnnnoooooooooooooooooooooooooooooooopprrrrrrrrrssssssssssstttttttttuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuvvwwwwwwwxxyyyyyyyyyyzzzzzzzzAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBCCCCCCDDDDDDDEEEEEEEEEEEEEEEEEEEEEEEEEFGGGGGGGHHHHHHHHHIIIIIIIIIIIIIIIJKKKKKKLLLLLLLLLMMMNNNNNNNNNNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPRRRRRRRRRSSSSSSSSSSSTTTTTTTTUUUUUUUUUUUUUUUUUUUUUUUUUUUUUVVWWWWWWXXYYYYYYYYYZZZZZZZZ";

                        var nova = palavra;

                        if (palavra) if (palavra != "") {
                            nova = "";

                            for (var i = 0; i < palavra.length; i++) {
                                if (com_acento.indexOf(palavra.substr(i, 1)) >= 0) {
                                    nova += sem_acento.substr(com_acento.indexOf(palavra.substr(i, 1)), 1);
                                } else {
                                    nova += palavra.substr(i, 1);
                                }
                            }
                            nova = nova.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
                        }

                        return nova;
                    }

                    function getFiltersInUrl() {
                        var vars = [], hash;
                        var hashes = window.location.hash.slice(window.location.hash.indexOf('#') + 2).split('&');
                        for (var i = 0; i < hashes.length; i++) {
                            hash = hashes[i].split('=');
                            vars.push(hash[0]);
                            vars[hash[0]] = hash[1];
                        }
                        return vars;
                    }

                    function getUrlVar(name) {
                        return getUrlVars()[name];
                    }

                    function setFiltersInUrl(idTipoParticipanteFiltrando, idAssuntoFiltrando) {
                        if (idTipoParticipanteFiltrando != "" || idAssuntoFiltrando != "") {
                            var hash = '';
                            if (idTipoParticipanteFiltrando != "")
                                hash = 'participante=' + idTipoParticipanteFiltrando;
                            if (idAssuntoFiltrando != "")
                                hash = (hash == '' ? 'assunto=' + idAssuntoFiltrando : hash + '&assunto=' + idAssuntoFiltrando);

                            window.location.hash = hash;
                        } else {
                            window.location.hash = '#/';
                        }
                    }

                    //-> Todas as funções devem estar daqui para cima.

                    $(function () {
                        //-> Adicioanr arquivos na mensagem
                        $(".dialogo_box .preview_post.arquivos .adicionar_doc").click(function (e) {
                            e.preventDefault();
                            abreUploadFileTimeLine();
                        });

                        //-> Remover preview do video
                        $(".remover_preview_video").live(tpClick, function () {
                            removerPreviewVideoMensagem(true);
                        });

                        //-> Compartilhar item
                        $('#compartilhar').live(tpClick, function () {
                            validaMensagem(); //Implementar diferentes validações nesta função, caso necessite.
                        })

                        //-> Cria o scrollbar para o preview de imagens
                        $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar({
                            horizontalScroll: true,
                            advanced: {
                                autoExpandHorizontalScroll: true
                            }
                        });

                        //-> Cria a toolbar estilizada para os arquivos
                        $(".dialogo_box .preview_post.arquivos").mCustomScrollbar();

                        //-> Ao clicar em "adicionar" no preview de imagem, abre o upload novamente
                        $(".dialogo_box .preview_post.imagens .adicionar .adicionar_multimidia").click(function (e) {
                            e.preventDefault();
                            abreUpload();
                        });

                        //-> Esconde o texto default do "diga lá"
                        $('#txtInput').live('focus', function () {
                            if ($(this).text() == configsTimeline.mensagem) {
                                $(this).text("");
                            }
                        }).blur(function () {
                            if (navigator.userAgent.toLowerCase().search("android") > -1 || navigator.userAgent.toLowerCase().search("tb07sta") > -1) {

                            } else {
                                if ($(this).text() == "") {
                                    $(this).text(configsTimeline.mensagem);
                                }
                            }
                        });

                        //-> Faz funcionar o "colar" url do video para mobile
                        $("#txtLinkVideoMensagem").live('input paste', function () {
                            if ($(this).val().length == 0) {
                                $('.errovideo, .verificavideo').hide();
                            } else {
                                if (timeout !== undefined && timeout != null) {
                                    clearTimeout(timeout);
                                }
                                timeout = setTimeout(function () {
                                    montaPreviewVideoMensagem($("#txtLinkVideoMensagem").val());
                                }, 1000);
                            }
                        });

                        //-> Ao inserir a url do video no campo
                        $("#txtLinkVideoMensagem").keyup(function () {
                            if ($(this).val().length == 0) {
                                $('.errovideo, .verificavideo').hide();

                                if ($('#txtInput').val() != "") {
                                    $('#compartilhar').removeClass('disable').prop("disabled", false);
                                }
                            } else {
                                $('#compartilhar').addClass('disable').prop("disabled", true);

                                if (timeout !== undefined && timeout != null) {
                                    clearTimeout(timeout);
                                }
                                timeout = setTimeout(function () {
                                    montaPreviewVideoMensagem($("#txtLinkVideoMensagem").val());
                                }, 1000);
                            }
                        })

                        //-> Controle do text area
                        $('#txtInput').live('keyup', function () {
                            var strMensagem = $(this).val();
                            var strLinkVideo = "";

                            if ($("#txtLinkVideoMensagem").val() != undefined) {
                                strLinkVideo = $("#txtLinkVideoMensagem").val();
                            }

                            if (strMensagem == '' || strMensagem == configsTimeline.mensagem) {
                                if (strLinkVideo != "" && strLinkVideo != undefined) {
                                    if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                                        if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                                            $('#compartilhar').removeClass('disable').prop("disabled", false);
                                            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                                        } else {
                                            $('#compartilhar').addClass('disable').prop("disabled", true);
                                            $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                                        }
                                    }
                                } else {
                                    var bolBlock = false;
                                    if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens != null && objetoImagens.imagens.length == 0) {
                                        bolBlock = true;
                                    } else {
                                        bolBlock = false;
                                    }
                                    if (bolBlock && objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos != null && objetoArquivos.arquivos.length == 0) {
                                        bolBlock = true;
                                    } else {
                                        bolBlock = false;
                                    }
                                    if (bolBlock) {
                                        $('#compartilhar').addClass('disable').prop("disabled", true);
                                    }
                                }
                            } else {
                                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                                if (timeout == undefined || timeout != null) {
                                    if (strLinkVideo != "" && strLinkVideo != undefined) {
                                        if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                                            if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                                                $('#compartilhar').removeClass('disable').prop("disabled", false);
                                            } else {
                                                $('#compartilhar').addClass('disable').prop("disabled", true);
                                            }
                                        }
                                    } else {
                                        $('#compartilhar').removeClass('disable').prop("disabled", false);
                                    }
                                }
                            }
                        });

                        //-> Mostra elementos de compartilhamento
                        $('#txtInput').focus(function () {
                            $('#compartilhar').show();
                            $("#btnCancelarFerramentaMural").show();
                            $("#btnCancelarFerramentaMural").closest('.sep_digala').fadeIn("fast");
                            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

                            var strLinkVideo = "";
                            if ($("#txtLinkVideoMensagem").val() != undefined) {
                                strLinkVideo = $("#txtLinkVideoMensagem").val();
                            }
                            if (strLinkVideo.length > 0) {
                                if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                                    if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                                        $('#compartilhar').removeClass('disable').prop("disabled", false);
                                    } else {
                                        $('#compartilhar').addClass('disable').prop("disabled", true);
                                    }
                                }
                            } else {
                                var bolBlock = false;
                                if ($(this).val().length <= 0 && objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens != null && objetoImagens.imagens.length == 0) {
                                    bolBlock = true;
                                } else {
                                    bolBlock = false;
                                }
                                if (bolBlock && $(this).val().length <= 0 && objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos != null && objetoArquivos.arquivos.length == 0) {
                                    bolBlock = true;
                                } else {
                                    bolBlock = false;
                                }
                                if (bolBlock) {
                                    $('#compartilhar').addClass('disable').prop("disabled", true);
                                }
                            }
                        });

                        //-> Adiciona arquivos a mensagem
                        $("body").on(tpClick, ".mensagem_multimidia .multimidia_documentos", function (e) {
                            e.preventDefault();
                            abreUploadFileTimeLine();
                        })

                        //-> Adiciona video a mensagem
                        $("body").on(tpClick, ".mensagem_multimidia .multimidia_video", function (e) {
                            e.preventDefault();
                            $(this).closest(".mensagem_multimidia").hide();
                            if (!$(".enviar_video").is(":visible")) {
                                $(this).closest(".mensagem_multimidia").hide();
                                $(".enviar_video").show();
                                $('#compartilhar').show();
                                $("#btnCancelarFerramentaMural").show();
                                $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
                                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                            }
                        });

                        //-> Exclui imagem específica preview de imagens
                        $("body").on(tpClick, ".dialogo_box .preview_post.imagens .remover_multimidia", function (e) {
                            e.preventDefault();
                            var parent = $(this).closest(".prev_imagem");
                            var idarquivo = parseInt(parent.data("idarquivo"));
                            if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
                                for (var i = 0; i < objetoImagens.imagens.length; i++) {
                                    if (objetoImagens.imagens[i].idArquivo == idarquivo) {
                                        objetoImagens.imagens.splice(i, 1);
                                        parent.remove();
                                        break;
                                    }
                                }
                            }
                            if (objetoImagens === undefined || objetoImagens == null || objetoImagens.imagens.length == 0) {
                                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val() == "") {
                                    $("#compartilhar").addClass("disable").prop("disabled", true);
                                    $(".dialogo .dialogo_box .preview_post.imagens").hide();
                                    $(".dialogo_box .preview_post.imagens").hide();
                                    $("#compartilhar").hide();
                                    $("#btnCancelarFerramentaMural").hide();
                                    $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                                    $(".dialogo .mensagem_multimidia").show();
                                    $("#seletorMuralDigaLa").hide();
                                }
                                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val() !== "") {
                                    $(".dialogo .mensagem_multimidia").show();
                                    $(".dialogo .dialogo_box .preview_post.imagens").hide();
                                    $("#btnCancelarFerramentaMural").show();
                                    $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
                                    $("#seletorMuralDigaLa").show();
                                    $("#compartilhar").show();
                                }
                            }
                            $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
                        });

                        //-> Remove arquivos do preview de arquivos
                        $("body").on(tpClick, ".dialogo_box .preview_post.arquivos .remover_multimidia", function (e) {
                            e.preventDefault();
                            var parent = $(this).parent();
                            var idarquivo = parseInt(parent.data("idarquivo"));
                            if (objetoArquivos !== undefined && objetoArquivos !== null && objetoArquivos.arquivos.length > 0) {
                                for (var i = 0; i < objetoArquivos.arquivos.length; i++) {
                                    if (objetoArquivos.arquivos[i].idArquivo == idarquivo) {
                                        objetoArquivos.arquivos.splice(i, 1);
                                        parent.remove();
                                        break;
                                    }
                                }
                            }
                            if (objetoArquivos === undefined || objetoArquivos == null || objetoArquivos.arquivos.length == 0) {
                                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val() == "") {
                                    $("#compartilhar").addClass("disable").prop("disabled", true);


                                    $(".dialogo_box .preview_post.arquivos").hide();
                                    $("#compartilhar").hide();
                                    $("#btnCancelarFerramentaMural").hide();
                                    $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                                    $(".dialogo .mensagem_multimidia").show();
                                    $("#seletorMuralDigaLa").hide();
                                }
                                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val() !== "") {
                                    $(".dialogo .mensagem_multimidia").show();
                                    $(".dialogo_box .preview_post.arquivos").hide();
                                    $("#btnCancelarFerramentaMural").show();
                                    $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
                                    $("#seletorMuralDigaLa").show();
                                    $("#compartilhar").show();
                                }
                            }
                            $(".dialogo_box .preview_post.arquivos").mCustomScrollbar("update");
                        });

                        //-> Esconde elementos de compartilhamento ao clicar no botão compartilhar
                        $("body").on(tpClick, "#btnCancelarFerramentaMural", function (e) {
                            e.preventDefault();
                            if ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible")) {
                                limpaPreviewImagemMensagemRapida();
                                limpaArrayImagensTimeLine();

                                $(".dialogo .dialogo_box .preview_post.imagens").hide();
                                $("#compartilhar").addClass("disable").prop("disabled", true);
                            }
                            else if ($(".enviar_video").is(":visible") || $(".dialogo .dialogo_box .preview_post.video").is(":visible")) {
                                $(".enviar_video").hide();
                                removerPreviewVideoMensagem(true);
                                $("#btnCancelarFerramentaMural").hide();
                                $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();

                                $("#compartilhar").addClass("disable").prop("disabled", true);
                                $(".errovideo").hide();
                            }
                            else if ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")) {

                                limpaPreviewArquivosMensagemRapida();
                                limpaArrayArquivosTimeLine();

                                $(".dialogo .dialogo_box .preview_post.arquivos").hide();
                                $("#compartilhar").addClass("disable").prop("disabled", true);
                            }
                            $("#txtInput").val("");
                            $('#txtInput').css("height", "48px");
                            $('#txtInput').siblings(":last").html('');
                            if (!$(".mensagem_multimidia").is(":visible")) {
                                $(".mensagem_multimidia").show();
                            }
                            $(this).prop("disabled", true).addClass("disable");
                            $(this).hide();
                            $("#compartilhar").hide();
                            $("#seletorMuralDigaLa").hide();
                            $("#compartilhar").closest('.sep_digala').hide();
                            $(".checkbox_personalizado_css input").prop("checked", true);
                        });

                        //-> Abre upload de imagens
                        $("body").on(tpClick, ".mensagem_multimidia .multimidia_imagens", function (e) {
                            e.preventDefault();
                            abreUpload(); //Adicionar diferentes tipos de chamadas para cada ferramenta, se necessário
                        });

                    });

                    getConfiguracoes();

                    //-> Cria o mark-up padrão para o box "diga lá".

                    if (configsTimeline.bolParticipando) {

                        var html = "";
                        html = html + "<section class=\"dialogo clearfix\"> ";
                        html = html + "     <a href=\"javascript: void(0);\" pos=\"0\" class=\"current actions komika\">";
                        html = html + "         <span class=\"fontello digala\"></span> ";
                        html = html + "         Diga lá ";
                        html = html + "         <span class=\"seta\"></span> ";
                        html = html + "     </a> ";
                        html = html + "     <div class=\"dialogo_box actions_target\"> ";
                        html = html + "     <form name=\"formMsgRapida\"> ";
                        html = html + "         <textarea id=\"txtInput\" class=\"dialogo_field ph\" autocomplete=\"off\" cols=\"40\" rows=\"1\" placeholder=\"" + configsTimeline.mensagem + "\" name=\"dialogo\" title=\"" + configsTimeline.mensagem + "\"></textarea> ";
                        html = html + "     </form> ";

                        //-> Envio de videos permitido somente para educadores, se instanciado como true.
                        if (configsTimeline.bolVideo && configsTimeline.bolEducador) {
                            html = html + "      <div class=\"preview_post video\" id=\"container_preview_video\" style=\"display: none;\"></div>";
                        }

                        //-> Envio de imagens permitido somente para regra vinda do banco, se instanciado como true.
                        if (configsTimeline.bolImagens && configsTimeline.bolConfigImagens) {

                            html = html + "       <div class=\"preview_post imagens content\" data-idalbum=\"" + configsTimeline.idAlbum + "\" style=\"display: none;\"> ";
                            html = html + "         <div class=\"engloba_classe \"> ";
                            html = html + "             <div class=\"prev_imagem adicionar\"> ";
                            html = html + "                 <a href=\"javascript: void(0);\" class=\"adicionar_multimidia\"><span class=\"FontAwesome\"></span>Adicionar</a> ";
                            html = html + "             </div> ";
                            html = html + "         </div> ";
                            html = html + "       </div>  ";
                        }

                        html = html + "<div class=\"clearfix\"></div>";

                        //-> Envio de arquivos permitido somente para regra vinda do banco, se instanciado como true.
                        if (configsTimeline.bolArquivos && configsTimeline.bolConfigArquivos) {
                            html = html + "         <div class=\"preview_post content arquivos\" data-idarquivomultimidia=\"" + configsTimeline.idArquivoMultimidia + "\" style=\"display: none;\"> ";
                            html = html + "             <div class=\"clearfix\"></div> ";
                            html = html + "             <a href=\"javascript: void(0);\" class=\"adicionar_doc\"><span class=\"FontAwesome\"></span>Adicionar</a> ";
                            html = html + "         </div> ";
                        }

                        //-> Mostra ou não o corretor ortográfico nas mensagens.
                        if (configsTimeline.bolCorretor) {
                            html = html + "        <a href=\"javascript: void(0);\" onclick=\"SpellCheck('formMsgRapida.txtInput');\" class=\"corretor_mensagem\"> ";
                            html = html + "         <span class=\"fontello\"></span> ";
                            html = html + "             ABC ";
                            html = html + "        </a> ";
                        }
                        html = html + "<div class=\"clearfix\"></div>";
                        html = html + "     </div> ";

                        //-> Somente mediadores e educadores podem enviar arquivos
                        if (configsTimeline.bolEducador || configsTimeline.bolMediador) {

                            html = html + "     <div class=\"mensagem_multimidia\"> ";
                            html = html + "         <ul> ";

                            //-> Envio de imagens permitido somente para regra vinda do banco, se instanciado como true.
                            if (configsTimeline.bolImagens && configsTimeline.bolConfigImagens) {
                                html = html + "             <li class=\"multimidia_imagens\"> ";
                                html = html + "                 <a href=\"javascript: void(0);\"><span class=\"FontAwesome\"></span> Imagens</a> ";
                                html = html + "             </li> ";
                            }

                            //-> Envio de videos permitido somente para regra vinda do banco, se instanciado como true.
                            if (configsTimeline.bolVideo && configsTimeline.bolConfigVideos) {
                                html = html + "             <li class=\"multimidia_video\"> ";
                                html = html + "                 <a href=\"javascript: void(0);\"><span class=\"FontAwesome\"></span> Vídeo</a> ";
                                html = html + "             </li> ";
                            }

                            if (configsTimeline.bolArquivos && configsTimeline.bolConfigArquivos) {
                                html = html + "             <li class=\"multimidia_documentos\"> ";
                                html = html + "                 <a href=\"javascript: void(0);\"><span class=\"FontAwesome\"></span> Arquivos</a> ";
                                html = html + "             </li> ";
                            }
                            html = html + "          </ul> ";
                            html = html + "     </div>";

                            //-> Cria as divs para preview do video caso, passe pelas validações
                            if (configsTimeline.bolVideo && configsTimeline.bolConfigVideos) {
                                html = html + "     <div class=\"enviar_video\" style=\"display: none;\"> ";
                                html = html + "         <span class=\"FontAwesome\"></span> ";
                                html = html + "         <input type=\"text\" placeholder=\"Cole aqui a url do ví­deo do YouTube ou Vimeo\" id=\"txtLinkVideoMensagem\"/> ";
                                html = html + "     </div> ";
                                html = html + "     <div class=\"errovideo\" style=\"display: none;\">A URL inserida acima é inválida ou não existe.</div> ";
                            }

                        }
                        html = html + "          <div class=\"hab_comentario_post\"> ";
                        html = html + "             <div class=\"checkbox_personalizado_css rightalign\"> ";
                        html = html + "                 <input type=\"checkbox\" name=\"check\" checked=\"checked\" id=\"check1\" />";

                        html = html + "                     <label for=\"check1\">Permitir comentários</label>";
                        html = html + "              </div> ";
                        html = html + "          </div> ";

                        //-> Cria as divs para preview do video caso, passe pelas validações
                        if (configsTimeline.bolVideo && configsTimeline.bolConfigVideos) {
                            html = html + "     <div class=\"verificavideo\" style=\"display: none;\">Verificando URL...</div> ";
                            html = html + "     <input type=\"hidden\" value=\"\" id=\"urlVideoOriginal\" /> ";
                        }

                        //-> Conteúdo genérico
                        html = html + "     <div class=\"clearfix\"></div>";
                        html = html + "     <div class=\"sep_digala\" style=\"display: none;\"> ";
                        html = html + "         <div id=\"filtros_categoria\" class=\"left\" role=\"application\"> ";
                        html = html + "             <span class=\"postar_assunto\">Postar no assunto</span> ";
                        html = html + "                 <span class=\"bootstrap\"> ";
                        html = html + "                     <div class=\"btn-group\" id=\"assunto_digala\"> ";
                        html = html + "                         <a href=\"javascript: void(0);\" data-toggle=\"dropdown\" class=\"btn btn-small dropdown-toggle\"> ";
                        html = html + "                         <span class=\"FontAwesome\"></span> Geral ";
                        html = html + "                         <span class=\"caret\"></span> ";
                        html = html + "                         </a>";
                        html = html + "                         <ul class=\"dropdown-menu\" id=\"cbAssuntoMensagem\"> ";
                        html = html + "                         </ul>";
                        html = html + "                      </div>  ";
                        html = html + "              </span> ";
                        html = html + "         </div> ";
                        html = html + "         <div class=\"botoes right btnGrupo\">";
                        html = html + "             <a href=\"javascript: void(0);\" class=\"btn_cinza disable\" id=\"btnCancelarFerramentaMural\" style=\"display:none;\">Cancelar</a>";
                        html = html + "             <input type=\"button\" name=\"compartilhar\" id=\"compartilhar\" value=\"Compartilhar\" class=\"btn_cor\" style=\"display:none;\"/> ";
                        html = html + "             <input type=\"button\" class=\"btn_cor msn_tarefa_grupo\" value=\"Agendar\" id=\"agendar\" name=\"agendar\" style=\"display:none;\" />";
                        html = html + "         </div>";
                        html = html + "         <div class=\"clearfix\"></div>";
                        html = html + "     </div>";
                        html = html + " </section>";
                        html = html + " <input type=\"hidden\" value=\"" + configsTimeline.idGrupo + "\" name=\"idGrupo\" id=\"idGrupo\" />";

                        $html = $(html);

                        //-> Escreve o html
                        $(this).html($html);

                        buscaAssuntos(configsTimeline.idGrupo);

                        //-> Salva os elementos na data, para poder destruir o plugin.
                        /* $(this).data("timeline", {
                        target: $html,
                        configs: configsTimeline
                        });
                        */
                    }

                    //* FIM DAS FUNÇÕES DIGA LÁ *//

                    //-> Busca os assuntos do grupo
                    function buscaAssuntosTimeline(idGrupo) {
                        $.ajax({
                            url: "/ava/projetos/clube/home/buscaAssuntos",
                            dataType: "json",
                            data: {
                                idGrupo: idGrupo
                            },
                            type: "GET",
                            async: false,
                            cache: false,
                            success: function (data) {
                                if (parseInt(data.error) == 0) {

                                    var tempAssuntosMural = "";
                                    var checkedTodosAssuntos = "";
                                    var filter = getFiltersInUrl()['assunto'];

                                    if ($("#btnFiltroGrupo").attr("idAssunto") === undefined || parseInt($("#btnFiltroGrupo").attr("idAssunto")) == 0 || parseInt($("#btnFiltroGrupo").attr("idAssunto")) == 99) {
                                        checkedTodosAssuntos = "checked=\"checked\"";
                                    }

                                    tempAssuntosMural = tempAssuntosMural + "<li>";
                                    tempAssuntosMural = tempAssuntosMural + "   <input type=\"radio\" " + checkedTodosAssuntos + " id=\"rbFiltroAssunto_99\" name=\"cbFiltroAssuntoTimeLine\" value=\"99\"/>";
                                    tempAssuntosMural = tempAssuntosMural + "   <label for=\"rbFiltroAssunto_99\"><span class=\"FontAwesome\"></span>Todos os assuntos</label>";
                                    tempAssuntosMural = tempAssuntosMural + "</li>";

                                    for (var as = 0; as < data.assuntos.length; as++) {
                                        var checkedAssunto = "";
                                        if ((filter !== undefined && filter == data.assuntos[as].id) || $("#btnFiltroGrupo").attr("idAssunto") == data.assuntos[as].id) {
                                            checkedAssunto = "checked=\"checked\"";
                                            $("#btnFiltroGrupo").attr("idAssunto", data.assuntos[as].id);
                                            $("#textoBtnFiltroAssunto").text(data.assuntos[as].strAssunto);
                                        }

                                        tempAssuntosMural = tempAssuntosMural + "<li>";
                                        tempAssuntosMural = tempAssuntosMural + "   <input type=\"radio\" " + checkedAssunto + " id=\"rbFiltroAssunto_" + as + "\" name=\"cbFiltroAssuntoTimeLine\" value=\"" + data.assuntos[as].id + "\"/>";
                                        tempAssuntosMural = tempAssuntosMural + "   <label for=\"rbFiltroAssunto_" + as + "\"><span class=\"FontAwesome\"></span>" + data.assuntos[as].strAssunto + "</label>";
                                        tempAssuntosMural = tempAssuntosMural + "</li>";

                                    }


                                    $("#cbFiltroAssuntoTimeLine").html(tempAssuntosMural);

                                } else {
                                    alert("Erro ao buscar os assuntos.");
                                }
                            },
                            error: function (data) {
                                alert("Erro ao buscar os assuntos.");
                            }
                        });
                    }

                    //-> Busca os tipos de participantes do grupo
                    function buscaParticipantes(idGrupo) {
                        $.ajax({
                            url: "/ava/projetos/clube/home/buscaTiposParticipantes",
                            dataType: "json",
                            data: {
                                idGrupo: idGrupo
                            },
                            type: "GET",
                            async: false,
                            cache: false,
                            success: function (data) {
                                if (parseInt(data.error) == 0) {
                                    var checkedTodosParticipantes = "";
                                    var tempParticipantesMural = "";
                                    var filter = getFiltersInUrl()['participante'];

                                    if ($("#btnFiltroParticipante").attr("idTipoParticipante") === undefined || parseInt($("#btnFiltroParticipante").attr("idTipoParticipante")) == 0 || parseInt($("#btnFiltroParticipante").attr("idTipoParticipante")) == 99) {
                                        checkedTodosParticipantes = "checked=\"checked\"";
                                    }
                                    tempParticipantesMural = tempParticipantesMural + "<li>";
                                    tempParticipantesMural = tempParticipantesMural + "   <input type=\"radio\" id=\"rbFiltroParticipante_99\" " + checkedTodosParticipantes + " name=\"cbFiltroParticipanteTimeLine\" value=\"99\"/>";
                                    tempParticipantesMural = tempParticipantesMural + "   <label for=\"rbFiltroParticipante_99\"><span class=\"FontAwesome\"></span>Todos</label>";
                                    tempParticipantesMural = tempParticipantesMural + "</li>";

                                    for (var as = 0; as < data.tipoparticipantes.length; as++) {
                                        var checkedParticipante = "";
                                        var nomeDoParticipante = data.tipoparticipantes[as].strTipoParticipante;

                                        if (data.tipoparticipantes[as].strTipoParticipante.toLowerCase() == "criador") {
                                            nomeDoParticipante = "Tutor"
                                        }

                                        if ((filter !== undefined && filter == data.tipoparticipantes[as].idTipoParticipante) || $("#btnFiltroParticipante").attr("idTipoParticipante") == data.tipoparticipantes[as].idTipoParticipante) {
                                            checkedParticipante = "checked=\"checked\"";
                                            $("#btnFiltroParticipante").attr("idTipoParticipante", data.tipoparticipantes[as].idTipoParticipante);
                                            $("#textoBtnFiltroParticipante").text(nomeDoParticipante);
                                        }

                                        tempParticipantesMural = tempParticipantesMural + "<li>";
                                        tempParticipantesMural = tempParticipantesMural + "   <input type=\"radio\" " + checkedParticipante + " id=\"rbFiltroParticipante_" + as + "\" name=\"cbFiltroParticipanteTimeLine\" value=\"" + data.tipoparticipantes[as].idTipoParticipante + "\"/>";
                                        tempParticipantesMural = tempParticipantesMural + "   <label for=\"rbFiltroParticipante_" + as + "\"><span class=\"FontAwesome\"></span>" + nomeDoParticipante + "</label>";
                                        tempParticipantesMural = tempParticipantesMural + "</li>";
                                    }
                                    $("#cbFiltroAssunto").html(tempParticipantesMural);
                                } else {
                                    alert("Erro ao buscar os assuntos.");
                                }
                            },
                            error: function (data) {
                                alert("Erro ao buscar os assuntos.");
                            }
                        });
                    }

                    //-> Controles para as ações nos comentários
                    function acoesComentario() {
                        $(".botaoComentar").each(function () {

                            var idMensagemRapida = $(this).attr("idMensagemRapida");
                            $(this).click(function () {
                                $("#campoComentar_" + idMensagemRapida + " input").focus();
                            });

                            $("#campoComentar_" + idMensagemRapida + " input").focus(function () {
                                $(this).animate({ width: '420px' }, 200);
                                $("#campoComentar_" + idMensagemRapida).addClass('foco');
                            });

                            $("#campoComentar_" + idMensagemRapida + " input").blur(function () {
                                if ($(this).val() == "") {
                                    $(this).animate({ width: '450px' }, 200).val("");
                                    $("#campoComentar_" + idMensagemRapida).removeClass('foco');
                                }
                            });
                        });
                    }

                    //-> Função para chamar o método timeline que vai buscar os dados do WS.
                    function carregaTimeline(inicio, fim, prepend) {
                        $.fancybox.showLoading();
                        if (prepend !== undefined && !prepend) {
                            $.fancybox.showLoading();
                        }
                        if (ajaxCarregarTimeline != null && ajaxCarregarTimeline.readyState < 4) {
                            ajaxCarregarTimeline.abort();
                        }
                        
                        if ($("#btnFiltroGrupo").attr("idAssunto") === undefined || parseInt($("#btnFiltroGrupo").attr("idAssunto")) == 0 || parseInt($("#btnFiltroGrupo").attr("idAssunto")) == 99) {
                            idAssuntoFiltrando = "";
                        } else {
                            idAssuntoFiltrando = $("#btnFiltroGrupo").attr("idAssunto");
                        }

                        if ($("#btnFiltroParticipante").attr("idTipoParticipante") === undefined || parseInt($("#btnFiltroParticipante").attr("idTipoParticipante")) == 0 || parseInt($("#btnFiltroParticipante").attr("idTipoParticipante")) == 99) {
                            idTipoParticipanteFiltrando = "";
                        } else {
                            idTipoParticipanteFiltrando = $("#btnFiltroParticipante").attr("idTipoParticipante");
                        }

                        ajaxCarregarTimeline = $.ajax({
                            url: "/AVA/Projetos/Clube/Home/Timeline",
                            type: "POST",
                            cache: false,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            data: {
                                intInicio: inicio,
                                intFim: fim,
                                idProjeto: configsTimeline.idProjeto,
                                idAssunto: idAssuntoFiltrando,
                                idTipoParticipante: idTipoParticipanteFiltrando
                            },
                            dataType: "json",
                            success: function (retorno) {
                                if (retorno instanceof Object) {
                                    objMensagens = retorno;
                                } else {
                                    objMensagens = JSON.parse(retorno);
                                }
                                preencheMensagens(objMensagens, prepend);
                                bolCarregaMais = true;
                                $.fancybox.hideLoading();

                            },
                            error: function (erro) {
                                $(this).html("Erro ao buscar as mensagens.");
                                console.log(erro.responseText);
                                bolCarregaMais = true;
                                $.fancybox.hideLoading();
                            }
                        });
                    }

                    //-> Função para listar os comentários de uma mensagem
                    function listaComentarios(idMensagemRapida) {
                        var htmlTempComentario = "";
                        var escondeComentarios = "";
                        var mostrarAPartirDe = 0;
                        var qtdComentarios = 0;
                        var bolCriaDiv = false;

                        //$("#div_comentario_" + idMensagemRapida).html("<img class='loader_comentario_" + idMensagemRapida + "' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                        //$("#div_comentario_" + idMensagemRapida).html(htmlLoading);
                        $.ajax({
                            url: "/AVA/Projetos/Clube/Home/listaComentarios",
                            data: { 'idMensagemRapida': idMensagemRapida },
                            cache: false,
                            success: function (data) {

                                if (parseInt(data.error) == 0 && data.comentarios.length > 0) {

                                    //Reordena os comentários em ordem crescente e adiciona novamente na variavel data
                                    arrOrdenado = data.comentarios.sort(function (a, b) { return parseInt(a.dtmComentario.substr(6), 10) - parseInt(parseInt(b.dtmComentario.substr(6), 10)) })
                                    data = {
                                        comentarios: arrOrdenado,
                                        usuarioLogado: data.usuarioLogado
                                    };

                                    //Percorre os comentários e escreve
                                    for (var xx = 0; xx < data.comentarios.length; xx++) {

                                        if (xx == 0 && data.comentarios.length > 3) {

                                            htmlTempComentario = htmlTempComentario + "    <a href=\"javascript:void(0);\" class=\"carregarComentarios\" ide=\"" + data.comentarios[xx].IdMensagemRapida + "\" idMensagem=\"" + data.comentarios[xx].IdMensagemRapida + "\"> ";
                                            htmlTempComentario = htmlTempComentario + "        <span class=\"icone_comentario_resumo\"></span> ";
                                            htmlTempComentario = htmlTempComentario + "        Exibir todos os <strong>" + data.comentarios.length + " comentários </strong>";
                                            htmlTempComentario = htmlTempComentario + "        <span class=\"FontAwesome angle_down\"></span> ";
                                            htmlTempComentario = htmlTempComentario + "    </a> ";

                                            qtdComentarios = data.comentarios.length;
                                            mostrarAPartirDe = parseInt(data.comentarios.length - 4);

                                        }
                                        //Verifica se cria a div de comentários escondidos ou não
                                        if (parseInt(mostrarAPartirDe) >= 1) {
                                            if (xx == 0) {
                                                bolCriaDiv = true;
                                            } else {
                                                bolCriaDiv = false;
                                            }
                                        } else if (parseInt(mostrarAPartirDe) == 0) {
                                            if (xx == 0 && data.comentarios.length > 3) {
                                                bolCriaDiv = true;
                                            } else {
                                                bolCriaDiv = false;
                                            }
                                        }


                                        if (bolCriaDiv) {
                                            htmlTempComentario = htmlTempComentario + "<div class=\"comentarios_escondidos\" id=\"divComentariosEscondidos_" + data.comentarios[xx].IdMensagemRapida + "\" style=\"display: none;\"> ";
                                        }

                                        htmlTempComentario = htmlTempComentario + "    <div id=\"coment_" + data.comentarios[xx].IdComentario + "\"> ";
                                        if (parseInt(data.comentarios[xx].idTipoParticipante) == 1) {
                                            htmlTempComentario = htmlTempComentario + "        <a href=\"" + strLinkEducacional + "\"><img src=\"" + strLogoEducacional + "\" height=\"33\" width=\"33\"/></a> ";
                                        } else {
                                            htmlTempComentario = htmlTempComentario + "        <a href=\"/AVA/Perfil/Home/Index/" + data.comentarios[xx].strLogin + "\"><img src=\"" + data.comentarios[xx].strMiniFoto + "\" height=\"33\" width=\"33\"/></a> ";
                                        }
                                        htmlTempComentario = htmlTempComentario + "        <div class=\"textComentario\"> ";

                                        //Somente tem permissão pra excluir o dono do post ou mediadores.
                                        if ((parseInt(data.comentarios[xx].IdUsuario) == parseInt(data.usuarioLogado.id)) || (parseInt(data.usuarioLogado.idTipoParticipante) < 3 && configsTimeline.bolParticipando)) {
                                            htmlTempComentario = htmlTempComentario + "            <a href=\"javascript:void(0);\" idM=\"" + data.comentarios[xx].IdMensagemRapida + "\" idC=\"" + data.comentarios[xx].IdComentario + "\" class=\"FontAwesome coment_excluir excluir_comentario confirma_excluir\"><span></span></a> ";
                                        }

                                        htmlTempComentario = htmlTempComentario + "            <h4> ";

                                        if (parseInt(data.comentarios[xx].idTipoParticipante) == 1) {
                                            htmlTempComentario = htmlTempComentario + "                <a href=\"" + strLinkEducacional + "\" title=\"" + strNomeEducacional + "\" alt=\"persona\"  class=\"\"> ";
                                        } else {
                                            htmlTempComentario = htmlTempComentario + "                <a href=\"/AVA/Perfil/Home/Index/" + data.comentarios[xx].strLogin + "\" title=\"" + data.comentarios[xx].strApelido + "\" alt=\"persona\"  class=\"\"> ";
                                        }

                                        if (parseInt(data.comentarios[xx].idTipoParticipante) == 1) {
                                            htmlTempComentario = htmlTempComentario + "                    <i class=\"icon_mediador\"></i> " + strNomeEducacional + " ";
                                        } else if (data.comentarios[xx].bolEducador || data.comentarios[xx].idTipoParticipante == 2) {
                                            htmlTempComentario = htmlTempComentario + "                    <i class=\"icon_maca\"></i> " + data.comentarios[xx].strApelido + " ";
                                        } else {
                                            htmlTempComentario = htmlTempComentario + "                    " + data.comentarios[xx].strApelido + " ";
                                        }

                                        htmlTempComentario = htmlTempComentario + "                </a> ";
                                        htmlTempComentario = htmlTempComentario + "            </h4> ";
                                        htmlTempComentario = htmlTempComentario + "            <span class=\"grupoTime\" idComentario=\"" + data.comentarios[xx].IdComentario + "\">" + data.comentarios[xx].strTempoPublicacao + "</span> ";

                                        var totalCurtidas = data.comentarios[xx].intCurtidas;

                                        if (data.comentarios[xx].bolCurtiu) {
                                            htmlTempComentario = htmlTempComentario + "            <a class=\"botaoCurtirComentario ativo\"  idComentario=\"" + data.comentarios[xx].IdComentario + "\" href=\"javascript:void(0);\"></a> ";
                                            totalCurtidas = parseInt(totalCurtidas - 1);

                                        } else {
                                            htmlTempComentario = htmlTempComentario + "            <a class=\"botaoCurtirComentario\" idComentario=\"" + data.comentarios[xx].IdComentario + "\" href=\"javascript:void(0);\"></a> ";
                                        }

                                        htmlTempComentario = htmlTempComentario + "            <div class=\"feedTotalGostaram\" id=\"boxCurticoesComentario_" + data.comentarios[xx].IdComentario + "\"> ";

                                        //Se tem curtida no comentário, adiciona a div de feed curtidas.
                                        if (totalCurtidas > 0) {

                                            htmlTempComentario = htmlTempComentario + "                <a class=\"tooltipGostaram b_tooltip\" href=\"javascript:void(0);\"><strong>+" + totalCurtidas + "</strong></a> ";
                                            htmlTempComentario = htmlTempComentario + "                <div class=\"black_tip_center tooltip tooltipCurtir\" id=\"boxCurtidasComentarios_" + data.comentarios[xx].IdComentario + "\" style=\"display: none;\"> ";

                                            //busca as curtidas do comentário
                                            buscaCurticoes(data.comentarios[xx].IdComentario, 2);

                                            htmlTempComentario = htmlTempComentario + "                </div> ";
                                        }

                                        htmlTempComentario = htmlTempComentario + "            </div>   ";
                                        htmlTempComentario = htmlTempComentario + "            <p>" + data.comentarios[xx].txtComentario + " </p>";
                                        htmlTempComentario = htmlTempComentario + "        </div> ";
                                        htmlTempComentario = htmlTempComentario + "        <div class=\"clearfix\"></div> ";
                                        htmlTempComentario = htmlTempComentario + "    </div> ";

                                        //Fecha a div dos comentários escondidos 
                                        if (xx == mostrarAPartirDe) {
                                            htmlTempComentario = htmlTempComentario + "    </div> ";
                                        }
                                    }

                                    $("#loader_comentario_" + idMensagemRapida).hide();
                                    $("#div_comentario_" + idMensagemRapida).html(htmlTempComentario);

                                } else { // Se deu erro ao buscar os comentários...
                                    $(".loader_comentario_" + idMensagemRapida).hide();
                                    $("#div_comentario_" + idMensagemRapida).html("Erro ao buscar os comentários da mensagem.");
                                }
                            },
                            error: function () { // Se deu erro no ajax....
                                $(".loader_comentario_" + idMensagemRapida).hide();
                                $("#div_comentario_" + idMensagemRapida).html("Erro ao buscar os comentários da mensagem.");
                            }
                        });
                    }

                    //-> Função que exibe as mensagens.
                    function preencheMensagens(jsonRetorno, prepend) {


                        var htmlTemp = "";
                        //verifica se não deu erro na busca do json, e preenche a mensagem
                        if (parseInt(jsonRetorno.error) == 0) {
                            for (i = 0; i < jsonRetorno.timeline.length; i++) {

                                htmlTemp = htmlTemp + "<article class=\"clearfix\" id=\"msg_" + jsonRetorno.timeline[i].IdMensagemrapida + "\"> ";
                                if ((parseInt(jsonRetorno.timeline[i].IdUsuario) == parseInt(jsonRetorno.usuario.id)) || (parseInt(jsonRetorno.usuario.idTipoParticipante) == 2 || parseInt(jsonRetorno.usuario.idTipoParticipante) == 1 && configsTimeline.bolParticipando)) {
                                    htmlTemp = htmlTemp + "   <a href=\"javascript:void(0);\" idC=\"0\" idM=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\" class=\"FontAwesome msg_excluir coment_excluir\"><span></span></a> ";
                                }
                                if (parseInt(jsonRetorno.timeline[i].idTipoParticipante) == 1) {
                                    htmlTemp = htmlTemp + "   <a href=\"" + strLinkEducacional + "\"> ";
                                    htmlTemp = htmlTemp + "    <img class=\"avatar_tl\" src=\"" + strLogoEducacional + "\" width=\"35\" height=\"35\" alt=\"avatar\"/> ";
                                    htmlTemp = htmlTemp + "   </a> ";
                                } else {
                                    htmlTemp = htmlTemp + "   <a href=\"/AVA/Perfil/Home/Index/" + jsonRetorno.timeline[i].strLogin + "\"> ";
                                    htmlTemp = htmlTemp + "    <img class=\"avatar_tl\" src=\"" + jsonRetorno.timeline[i].strFoto + "\" width=\"35\" height=\"35\" alt=\"avatar\"/> ";
                                    htmlTemp = htmlTemp + "   </a> ";
                                }
                                htmlTemp = htmlTemp + "   <div class=\"e-wrap\"> ";
                                htmlTemp = htmlTemp + "   <h1> ";

                                var nomeExibicao = nomeExibicao = jsonRetorno.timeline[i].strApelido;
                                if (jsonRetorno.timeline[i].strApelido == "" || jsonRetorno.timeline[i].strApelido == null) {
                                    nomeExibicao = nomeExibicao = jsonRetorno.timeline[i].strNome;
                                }

                                //Se for mediador do grupo poe o machadinho pra ele
                                if (parseInt(jsonRetorno.timeline[i].idTipoParticipante) == 1) {
                                    htmlTemp = htmlTemp + "        <a href=\"" + strLinkEducacional + "\" title=\"" + strNomeEducacional + "\" alt=\"persona\"  class=\"\"><i class=\"fontello icon_mediador\"></i> " + strNomeEducacional + "</a> ";
                                } else if (jsonRetorno.timeline[i].bolEducador || jsonRetorno.timeline[i].idTipoParticipante == 2) {
                                    htmlTemp = htmlTemp + "        <a href=\"/AVA/Perfil/Home/Index/" + jsonRetorno.timeline[i].strLogin + "\" title=\"" + nomeExibicao + "\" alt=\"persona\"  class=\"\"><i class=\"fontello icon_maca\"></i>" + nomeExibicao + "</a> ";
                                } else {
                                    htmlTemp = htmlTemp + "        <a href=\"/AVA/Perfil/Home/Index/" + jsonRetorno.timeline[i].strLogin + "\" title=\"" + nomeExibicao + "\" alt=\"persona\"  class=\"\">" + nomeExibicao + "</a> ";
                                }
                                htmlTemp = htmlTemp + "   </h1> ";
                                htmlTemp = htmlTemp + "   <div class=\"mural_time\"> ";

                                //Remove os acentos e os espacos do assunto para gerar o link do post único.
                                var strAssunto = "";
                                //strAssunto = jsonRetorno.timeline[i].assunto.replace(/[áàâã]/g,'a').replace(/[éèê]/g,'e').replace(/[íìî]/g,'i').replace(/[óòôõ]/g,'o').replace(/[úùû]/g,'u').replace(/ /g,'');
                                strAssunto = getSlugFromString(jsonRetorno.timeline[i].assunto);

                                if (parseInt(configsTimeline.tipoProjeto) == 1 || configsTimeline.tipoProjeto == "") {
                                    htmlTemp = htmlTemp + "        <span><a href=\"Etapas/" + strAssunto + "/" + jsonRetorno.timeline[i].IdMensagemRapidaCript + "\">" + jsonRetorno.timeline[i].strTempoPublicacao + "</a></span> ";
                                } else {
                                    htmlTemp = htmlTemp + "        <span><a href=\"Desafios/" + strAssunto + "/" + jsonRetorno.timeline[i].IdMensagemRapidaCript + "\">" + jsonRetorno.timeline[i].strTempoPublicacao + "</a></span> ";
                                }

                                //htmlTemp = htmlTemp + "        <span>" + jsonRetorno.timeline[i].strTempoPublicacao + "</span> ";
                                htmlTemp = htmlTemp + "        <span>&bull;</span> ";
                                htmlTemp = htmlTemp + "        <span>" + jsonRetorno.timeline[i].assunto.toUpperCase() + "</span>";
                                htmlTemp = htmlTemp + "   </div>                                                               ";
                                htmlTemp = htmlTemp + "   <p class=\"ctn_msg\"> " + jsonRetorno.timeline[i].StrMensagem + "</p> ";

                                //verifica se tem imagens na mensagem
                                if (jsonRetorno.timeline[i].imagens != null) {

                                    var qtdImagens = jsonRetorno.timeline[i].imagens.length;
                                    var qtdMax = parseInt(3);
                                    var strTitulo = "Insira um título";

                                    //Insere no post a primeira imagem.

                                    htmlTemp = htmlTemp + "<div class=\"imagens_mural\">";
                                    if (jsonRetorno.timeline[i].imagens[0].arquivo.strNome != null) {
                                        strTitulo = jsonRetorno.timeline[i].imagens[0].arquivo.strNome;
                                    }
                                    if (jsonRetorno.timeline[i].imagens[0].arquivo.strDescricao == null) {
                                        jsonRetorno.timeline[i].imagens[0].arquivo.strDescricao = "";
                                    }

                                    htmlTemp = htmlTemp + "<a data-width=\"" + jsonRetorno.timeline[i].imagens[0].arquivo.largura + "\" data-height=\"" + jsonRetorno.timeline[i].imagens[0].arquivo.altura + "\" data-idarquivo=\"" + jsonRetorno.timeline[i].imagens[0].arquivo.idArquivo + "\" class=\"galeria_mural fancybox-thumb\" rel=\"galeria_mural_" + jsonRetorno.timeline[i].IdMensagemrapida + "\" href=\"" + jsonRetorno.timeline[i].imagens[0].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[0].arquivo.strArquivo + jsonRetorno.timeline[i].imagens[0].arquivo.strExtensao + "\" data-nomearquivo=\"" + jsonRetorno.timeline[i].imagens[0].arquivo.strNome + "\" title=\"" + strTitulo + "\" data-posicao=\"" + jsonRetorno.timeline[i].imagens[0].intOrdem + "\" data-descricao=\"" + jsonRetorno.timeline[i].imagens[0].arquivo.strDescricao + "\"> ";
                                    htmlTemp = htmlTemp + "    <img style=\"width: 100%;\" src=\"" + jsonRetorno.timeline[i].imagens[0].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[0].arquivo.strArquivo + jsonRetorno.timeline[i].imagens[0].arquivo.strExtensao + "\"> ";
                                    htmlTemp = htmlTemp + "</a> ";

                                    //Se tiver 2 imagens somente no post
                                    if (qtdImagens > 2) {

                                        htmlTemp = htmlTemp + "<div class=\"thumbs_mural\" style=\"height: 122px;\">";

                                        if (qtdImagens > qtdMax) {

                                            for (j = 1; j < qtdMax; j++) {

                                                var strTituloIMG = "Insira um título";
                                                if (jsonRetorno.timeline[i].imagens[j].arquivo.strNome != null) {
                                                    strTituloIMG = jsonRetorno.timeline[i].imagens[j].arquivo.strNome;
                                                }

                                                if (jsonRetorno.timeline[i].imagens[j].arquivo.strDescricao == null) {
                                                    jsonRetorno.timeline[i].imagens[j].arquivo.strDescricao = "";
                                                }
                                                htmlTemp = htmlTemp + "<a data-nomearquivo=\"" + jsonRetorno.timeline[i].imagens[j].arquivo.strNome + "\" data-width=\"" + jsonRetorno.timeline[i].imagens[j].arquivo.largura + "\" data-height=\"" + jsonRetorno.timeline[i].imagens[j].arquivo.altura + "\" data-idarquivo=\"" + jsonRetorno.timeline[i].imagens[j].arquivo.idArquivo + "\" class=\"galeria_mural fancybox-thumb\" rel=\"galeria_mural_" + jsonRetorno.timeline[i].IdMensagemrapida + "\" href=\"" + jsonRetorno.timeline[i].imagens[j].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[j].arquivo.strArquivo + jsonRetorno.timeline[i].imagens[j].arquivo.strExtensao + "\" title=\"" + strTituloIMG + "\" data-posicao=\"" + jsonRetorno.timeline[i].imagens[j].intOrdem + "\" data-descricao=\"" + jsonRetorno.timeline[i].imagens[j].arquivo.strDescricao + "\"> ";
                                                htmlTemp = htmlTemp + " <img src=\"" + jsonRetorno.timeline[i].imagens[j].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[j].arquivo.thumbnail + jsonRetorno.timeline[i].imagens[j].arquivo.strExtensao + "\"> ";
                                                htmlTemp = htmlTemp + "</a>";
                                            }

                                            //Cria as outras imagens, pra poder ser navegável no fancybox
                                            for (k = qtdMax; k < qtdImagens; k++) {

                                                var strTituloIMGs = "Insira um título";
                                                if (jsonRetorno.timeline[i].imagens[j].arquivo.strNome != null) {
                                                    strTituloIMGs = jsonRetorno.timeline[i].imagens[j].arquivo.strNome;
                                                }
                                                if (jsonRetorno.timeline[i].imagens[j].arquivo.strDescricao == null) {
                                                    jsonRetorno.timeline[i].imagens[j].arquivo.strDescricao = "";
                                                }
                                                htmlTemp = htmlTemp + "<a data-nomearquivo=\"" + jsonRetorno.timeline[i].imagens[k].arquivo.strNome + "\" data-width=\"" + jsonRetorno.timeline[i].imagens[k].arquivo.largura + "\" data-height=\"" + jsonRetorno.timeline[i].imagens[k].arquivo.altura + "\" data-idarquivo=\"" + jsonRetorno.timeline[i].imagens[k].arquivo.idArquivo + "\" class=\"galeria_mural fancybox-thumb\" style=\"display: none;\" rel=\"galeria_mural_" + jsonRetorno.timeline[i].IdMensagemrapida + "\" href=\"" + jsonRetorno.timeline[i].imagens[k].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[k].arquivo.strArquivo + jsonRetorno.timeline[i].imagens[k].arquivo.strExtensao + "\" title=\"" + strTituloIMGs + "\" data-posicao=\"" + jsonRetorno.timeline[i].imagens[k].intOrdem + "\" data-descricao=\"" + jsonRetorno.timeline[i].imagens[k].arquivo.strDescricao + "\"> ";
                                                htmlTemp = htmlTemp + " <img src=\"" + jsonRetorno.timeline[i].imagens[k].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[k].arquivo.strArquivo + jsonRetorno.timeline[i].imagens[k].arquivo.strExtensao + "\"> ";
                                                htmlTemp = htmlTemp + "</a>";
                                            }

                                        } else {

                                            for (l = 1; l < qtdImagens; l++) {

                                                var strTituloIMGss = "Insira um título";
                                                if (jsonRetorno.timeline[i].imagens[l].arquivo.strNome != null) {
                                                    strTituloIMGss = jsonRetorno.timeline[i].imagens[l].arquivo.strNome;
                                                }
                                                if (jsonRetorno.timeline[i].imagens[l].arquivo.strDescricao == null) {
                                                    jsonRetorno.timeline[i].imagens[l].arquivo.strDescricao = "";
                                                }

                                                htmlTemp = htmlTemp + "<a data-nomearquivo=\"" + jsonRetorno.timeline[i].imagens[l].arquivo.strNome + "\" data-width=\"" + jsonRetorno.timeline[i].imagens[l].arquivo.largura + "\" data-height=\"" + jsonRetorno.timeline[i].imagens[l].arquivo.altura + "\" data-idarquivo=\"" + jsonRetorno.timeline[i].imagens[l].arquivo.idArquivo + "\" class=\"galeria_mural fancybox-thumb\" rel=\"galeria_mural_" + jsonRetorno.timeline[i].IdMensagemrapida + "\" href=\"" + jsonRetorno.timeline[i].imagens[l].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[l].arquivo.strArquivo + jsonRetorno.timeline[i].imagens[l].arquivo.strExtensao + "\" title=\"" + strTituloIMGss + "\" data-posicao=\"" + jsonRetorno.timeline[i].imagens[l].intOrdem + "\" data-descricao=\"" + jsonRetorno.timeline[i].imagens[l].arquivo.strDescricao + "\"> ";
                                                htmlTemp = htmlTemp + " <img src=\"" + jsonRetorno.timeline[i].imagens[l].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[l].arquivo.thumbnail + jsonRetorno.timeline[i].imagens[l].arquivo.strExtensao + "\"> ";
                                                htmlTemp = htmlTemp + "</a>";
                                            }
                                        }
                                        htmlTemp = htmlTemp + "</div> "; //Fecha a div thumbs_mural

                                    } else if (qtdImagens == 2) {

                                        var strTituloIMGs2 = "Insira um título";
                                        if (jsonRetorno.timeline[i].imagens[1].arquivo.strNome != null) {
                                            strTituloIMGs2 = jsonRetorno.timeline[i].imagens[1].arquivo.strNome;
                                        }
                                        if (jsonRetorno.timeline[i].imagens[1].arquivo.strDescricao == null) {
                                            jsonRetorno.timeline[i].imagens[1].arquivo.strDescricao = "";
                                        }
                                        htmlTemp = htmlTemp + "<a data-nomearquivo=\"" + jsonRetorno.timeline[i].imagens[1].arquivo.strNome + "\" data-width=\"" + jsonRetorno.timeline[i].imagens[1].arquivo.largura + "\" data-height=\"" + jsonRetorno.timeline[i].imagens[1].arquivo.altura + "\" data-idarquivo=\"" + jsonRetorno.timeline[i].imagens[1].arquivo.idArquivo + "\" class=\"galeria_mural fancybox-thumb\" rel=\"galeria_mural_" + jsonRetorno.timeline[i].IdMensagemrapida + "\" href=\"" + jsonRetorno.timeline[i].imagens[1].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[1].arquivo.strArquivo + jsonRetorno.timeline[i].imagens[1].arquivo.strExtensao + "\" title=\"" + strTituloIMGs2 + "\" data-posicao=\"" + jsonRetorno.timeline[i].imagens[1].intOrdem + "\" data-descricao=\"" + jsonRetorno.timeline[i].imagens[1].arquivo.strDescricao + "\"> ";
                                        htmlTemp = htmlTemp + " <img style=\"width: 100%;\" src=\"" + jsonRetorno.timeline[i].imagens[1].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].imagens[1].arquivo.thumbnail + jsonRetorno.timeline[i].imagens[1].arquivo.strExtensao + "\"> ";
                                        htmlTemp = htmlTemp + "</a>";

                                        //htmlTemp = htmlTemp + "</div> ";//Fecha a div thumbs_mural
                                    }


                                    htmlTemp = htmlTemp + "</div>"; //Fecha a div imagens_mural
                                    //htmlTemp = htmlTemp + "</div>";//Fecha a div thumbs_mural
                                }
                                // Fim imagens
                                // Insere no post o video
                                if (jsonRetorno.timeline[i].strLinkVideo != null && jsonRetorno.timeline[i].strLinkVideoPreview != null && jsonRetorno.timeline[i].strLinkVideoPreview != "" && jsonRetorno.timeline[i].strLinkVideo != "") {
                                    if (jsonRetorno.timeline[i].strLinkVideo.toLowerCase().indexOf("vimeo") > -1) {
                                        var classeVideo = "class=\"iframeVideoVimeo\"";
                                    }
                                    htmlTemp = htmlTemp + " <a class=\"linkvideo\" href=\"" + jsonRetorno.timeline[i].strLinkVideo + "\" target=\"_blank\">" + jsonRetorno.timeline[i].strLinkVideo + "</a>";
                                    htmlTemp = htmlTemp + " <iframe " + classeVideo + " width=\"450\" height=\"315\" src=\"" + jsonRetorno.timeline[i].strLinkVideoPreview + "\" frameborder=\"0\" allowfullscreen></iframe> ";
                                }

                                //Insere os arquivos
                                if (jsonRetorno.timeline[i].arquivos != null && jsonRetorno.timeline[i].arquivos != "") {
                                    var qtdArquivos = jsonRetorno.timeline[i].arquivos.length;
                                    var qtdMostrar = 0;

                                    if (qtdArquivos > 3) {
                                        qtdMostrar = 3;
                                    } else {
                                        qtdMostrar = qtdArquivos;
                                    }

                                    for (var is = 0; is < qtdMostrar; is++) {

                                        htmlTemp = htmlTemp + "<div class=\"prev_documento\"> ";
                                        htmlTemp = htmlTemp + " <div class=\"tipo_arquivo\"> ";
                                        htmlTemp = htmlTemp + "     <img src=\"/ava/StaticContent/Common/img/perfil/documento_multimidia.png\" height=\"41\" width=\"32\"> ";
                                        htmlTemp = htmlTemp + "     <span>" + jsonRetorno.timeline[i].arquivos[is].arquivo.strExtensao + "</span> ";
                                        htmlTemp = htmlTemp + " </div> ";
                                        htmlTemp = htmlTemp + " <p>" + jsonRetorno.timeline[i].arquivos[is].arquivo.strNome + "</p> ";

                                        if (mobile) {
                                            htmlTemp = htmlTemp + "<a target=\"_blank\" href=\"" + jsonRetorno.timeline[i].arquivos[is].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].arquivos[is].arquivo.strArquivo + jsonRetorno.timeline[i].arquivos[is].arquivo.strExtensao + "\">Download</a> ";
                                        } else {
                                            htmlTemp = htmlTemp + "<a href=\"/ava/upload/home/forcedownload/?strSrcArquivo=" + jsonRetorno.timeline[i].arquivos[is].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].arquivos[is].arquivo.strArquivo + jsonRetorno.timeline[i].arquivos[is].arquivo.strExtensao + "\">Download</a> ";
                                        }
                                        htmlTemp = htmlTemp + " </div> ";

                                    }
                                    if (qtdArquivos > 3) {

                                        htmlTemp = htmlTemp + " <div class=\"engloba_doc\"> ";

                                        for (var no = qtdMostrar; no < qtdArquivos; no++) {

                                            htmlTemp = htmlTemp + "<div class=\"prev_documento\"> ";
                                            htmlTemp = htmlTemp + " <div class=\"tipo_arquivo\"> ";
                                            htmlTemp = htmlTemp + "     <img src=\"/ava/StaticContent/Common/img/perfil/documento_multimidia.png\" height=\"41\" width=\"32\"> ";
                                            htmlTemp = htmlTemp + "     <span>" + jsonRetorno.timeline[i].arquivos[is].arquivo.strExtensao + "</span> ";
                                            htmlTemp = htmlTemp + " </div> ";
                                            htmlTemp = htmlTemp + " <p>" + jsonRetorno.timeline[i].arquivos[is].arquivo.strNome + "</p> ";

                                            if (mobile) {
                                                htmlTemp = htmlTemp + "<a target=\"_blank\" href=\"" + jsonRetorno.timeline[i].arquivos[is].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].arquivos[is].arquivo.strArquivo + jsonRetorno.timeline[i].arquivos[is].arquivo.strExtensao + "\">Download</a> ";
                                            } else {
                                                htmlTemp = htmlTemp + "<a href=\"/ava/upload/home/forcedownload/?strSrcArquivo=" + jsonRetorno.timeline[i].arquivos[is].arquivo.strDiretorio + "/" + jsonRetorno.timeline[i].arquivos[is].arquivo.strArquivo + jsonRetorno.timeline[i].arquivos[is].arquivo.strExtensao + "\">Download</a> ";
                                            }
                                            htmlTemp = htmlTemp + " </div> ";
                                        }
                                        htmlTemp = htmlTemp + " </div> ";
                                        htmlTemp = htmlTemp + " <a href=\"javascript:void(0);\" class=\"ver_mais_doc\">Ver mais</a> ";
                                    }
                                    //htmlTemp = htmlTemp + " <div class=\"clearfix\"></div> ";

                                }

                                htmlTemp = htmlTemp + "    <div class=\"acoes_mural\"> ";

                                if (jsonRetorno.timeline[i].bolCurtiu) {
                                    htmlTemp = htmlTemp + "        <a href=\"javascript:void(0);\" class=\"botaoCurtirGrupos ativo\" idMensagemRapida=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\"></a> ";
                                } else {
                                    htmlTemp = htmlTemp + "        <a href=\"javascript:void(0);\" class=\"botaoCurtirGrupos\" idMensagemRapida=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\"></a> ";
                                }

                                htmlTemp = htmlTemp + "       <div class=\"feedCurtir\" idMensagem=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\" id=\"boxCurticoesMensagem_" + jsonRetorno.timeline[i].IdMensagemrapida + "\"> ";

                                //-> Verifica qts pessoas curtiram a mensagem
                                if (jsonRetorno.timeline[i].curtidasMensagemRapida != null) {

                                    var objetoCurtidores = {
                                        curtidor: new Array()
                                    };

                                    var classTooltip = "";
                                    var qtdCurtidasExibir = 2;
                                    var qtdCurtidas = jsonRetorno.timeline[i].curtidasMensagemRapida.length;
                                    var bolCurtiu = jsonRetorno.timeline[i].bolCurtiu;

                                    if (qtdCurtidas > 2) {
                                        classTooltip = "b_tooltip_left";
                                    }

                                    if (bolCurtiu) {
                                        qtdCurtidasExibir = 1;
                                    }

                                    if (qtdCurtidasExibir > qtdCurtidas) {
                                        qtdCurtidasExibir = qtdCurtidas;
                                    }

                                    //Populo o array com todos os curtidores da mensagem
                                    for (var pp = 0; pp < qtdCurtidas; pp++) {

                                        //Não adiciona o usuário que curtiu, a listagem de curtidores
                                        if (jsonRetorno.timeline[i].curtidasMensagemRapida[pp].idUsuario != jsonRetorno.usuario.id) {
                                            objetoCurtidores.curtidor.push({ 'idCurtidor': jsonRetorno.timeline[i].curtidasMensagemRapida[pp].idUsuario, 'strLoginCurtidor': jsonRetorno.timeline[i].curtidasMensagemRapida[pp].strLogin, 'strNomeCurtidor': jsonRetorno.timeline[i].curtidasMensagemRapida[pp].strNome, 'strMiniFotoCurtidor': jsonRetorno.timeline[i].curtidasMensagemRapida[pp].strMiniFoto });
                                        }

                                    }

                                    //Cria o link para abrir a janela de perseguição
                                    htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5\" class=\"feedCurtirIcone blokletters vertodoscurtirammensagem " + classTooltip + "\" idmensagem=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\">";

                                    //Se eu curti a mensagem me poe em 1º lugar na listagem
                                    if (bolCurtiu) {
                                        htmlTemp = htmlTemp + "<img title=\"você\" src=\"" + jsonRetorno.usuario.strMiniFoto + "\" height=\"25\" width=\"25\"> ";
                                    }

                                    // Se mais alguem curtiu, insere junto com o logado.
                                    if (!bolCurtiu || (bolCurtiu && qtdCurtidas > 1)) {

                                        for (var kk = 0; kk < qtdCurtidasExibir; kk++) {
                                            if (qtdCurtidas >= 1) {
                                                if (parseInt(jsonRetorno.timeline[i].curtidasMensagemRapida[kk].idUsuario) == parseInt(jsonRetorno.usuario.id)) {
                                                    kk++;
                                                }

                                                if (jsonRetorno.timeline[i].curtidasMensagemRapida[kk].idUsuario != jsonRetorno.usuario.id) {
                                                    htmlTemp = htmlTemp + "<img src=\"" + jsonRetorno.timeline[i].curtidasMensagemRapida[kk].strMiniFoto + "\" height=\"25\" width=\"25\"> ";
                                                }
                                                //remove do array de curtidores, este usuário para não mostrar na tooltip o nome dele
                                                for (var mm = 0; mm < objetoCurtidores.curtidor.length; mm++) {

                                                    if (objetoCurtidores.curtidor[mm].idCurtidor == jsonRetorno.timeline[i].curtidasMensagemRapida[kk].idUsuario) {
                                                        objetoCurtidores.curtidor.splice(mm, 1);
                                                        break;
                                                    }

                                                }
                                            }

                                        }

                                    }

                                    // Exibe o +X 
                                    if (parseInt(qtdCurtidas - 2) > 0) {
                                        htmlTemp = htmlTemp + "+ " + parseInt(qtdCurtidas - 2);
                                    }
                                    //fecha <a> da perseguição
                                    htmlTemp = htmlTemp + "</a> ";

                                    //Preenche a div do tooltip
                                    htmlTemp = htmlTemp + " <div class=\"black_tip_left tooltip\" id=\"tooltipCurtir_" + jsonRetorno.timeline[i].IdMensagemrapida + "\" style=\"display: none\">";

                                    //só exibe 10 usuários dentro da tooltip
                                    for (hh = 0; hh < objetoCurtidores.curtidor.length; hh++) {
                                        if (hh <= 10) {
                                            htmlTemp = htmlTemp + "<a href=\"/AVA/Perfil/Home/Index/" + objetoCurtidores.curtidor[hh].strLoginCurtidor + "\">" + objetoCurtidores.curtidor[hh].strNomeCurtidor + "</a> ";
                                        } else {
                                            break;
                                        }
                                    }
                                    htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5\" class=\"vertodoscurtirammensagem ver_todos_tool\" id=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\" idmensagem=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\">Ver todos</a> ";
                                    htmlTemp = htmlTemp + "</div> ";
                                }

                                ///-> Fim curtidas msg

                                htmlTemp = htmlTemp + "       </div> ";

                                //Só cria o campo de comentário se estiver habilitado comentários na mensagem
                                if (jsonRetorno.timeline[i].bolComentar && configsTimeline.bolParticipando) {
                                    htmlTemp = htmlTemp + "        <a href=\"javascript:void(0);\" class=\"botaoComentar\" idMensagemRapida=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\" ><span class=\"FontAwesome\"></span></a> ";
                                }
                                htmlTemp = htmlTemp + " <div class=\"clearfix\"></div> ";

                                //comentários da mensagem
                                htmlTemp = htmlTemp + "<div class=\"comentariosMural\" id=\"div_comentario_" + jsonRetorno.timeline[i].IdMensagemrapida + "\"> ";
                                if (jsonRetorno.timeline[i].totalComentarios > 0) {
                                    htmlTemp = htmlTemp + "<img class='loader_comentario_" + jsonRetorno.timeline[i].IdMensagemrapida + "' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />";
                                    listaComentarios(jsonRetorno.timeline[i].IdMensagemrapida);
                                }
                                htmlTemp = htmlTemp + "</div> ";
                                ///-> comentários da mensagem

                                //Só cria o campo de comentário se estiver habilitado comentários na mensagem
                                if (jsonRetorno.timeline[i].bolComentar && configsTimeline.bolParticipando) {
                                    htmlTemp = htmlTemp + "        <form class=\"campo_comentar\" id=\"campoComentar_" + jsonRetorno.timeline[i].IdMensagemrapida + "\" id=\"frmMensagemRapidaComentario\" name=\"frmMensagemRapidaComentario" + jsonRetorno.timeline[i].IdMensagemrapida + "\" method=\"post\" onsubmit=\"return false;\"> ";
                                    htmlTemp = htmlTemp + "            <a href=\"javascript:void(0);\"><img src=\"" + jsonRetorno.usuario.strMiniFoto + "\" height=\"25\" width=\"25\"/></a> ";
                                    htmlTemp = htmlTemp + "            <input type=\"text\" placeholder=\"Escreva um comentário...\" id=\"strComentarioGrupo\" name=\"strComentarioGrupo_" + jsonRetorno.timeline[i].IdMensagemrapida + "\" autocomplete=\"off\" idMensagemRapida=\"" + jsonRetorno.timeline[i].IdMensagemrapida + "\" /> ";
                                    htmlTemp = htmlTemp + "            <a href=\"javascript:void(0);\" onclick=\"SpellCheck('frmMensagemRapidaComentario" + jsonRetorno.timeline[i].IdMensagemrapida + ".strComentarioGrupo_" + jsonRetorno.timeline[i].IdMensagemrapida + "');\"  class=\"corretor_mensagem\"> ";
                                    htmlTemp = htmlTemp + "                <span class=\"fontello\"></span> ";
                                    htmlTemp = htmlTemp + "                ABC ";
                                    htmlTemp = htmlTemp + "            </a> ";
                                    htmlTemp = htmlTemp + "        </form> ";
                                }

                                htmlTemp = htmlTemp + "    </div> ";
                                htmlTemp = htmlTemp + " </div> ";
                                htmlTemp = htmlTemp + "</article> ";
                            }

                            //Arrumar isso, sempre vai ser > 10, -> chamar o intFim + 1 pra ver se mostra ou não este botão.
                            if (prepend === undefined) {
                                htmlTemp = htmlTemp + "<footer id=\"ava_footervejamais\" class=\"blokletters\" style=\"display:none;\"> ";
                                htmlTemp = htmlTemp + "   <a href=\"javascript:void(0);\" title=\"Veja mais\" alt=\"Veja mais\" id=\"btCarregaMensagens\">Veja mais</a> ";
                                htmlTemp = htmlTemp + "</footer> ";
                            }
                        } else {
                            htmlTemp = "<article class=\"clearfix highlight\">Nenhuma mensagem enviada.</article> ";
                            htmlTemp = htmlTemp + "<input type=\"hidden\" value=\"sem mensagens\" />";
                        }

                        //Printa na tela as mensagens existentes.
                        if (prepend !== undefined && prepend) {
                            $('.timeline #ava_fluxoarticles').prepend(htmlTemp);
                        } else if (prepend !== undefined && !prepend) {
                            $('.timeline #ava_fluxoarticles').find("> article:last").after(htmlTemp);
                        } else {
                            $('.timeline #ava_fluxoarticles').html(htmlTemp);
                        }
                        if (jsonRetorno.bolMaisMensagens) {
                            $("#ava_footervejamais").fadeIn();
                        } else {
                            $("#ava_footervejamais").fadeOut();
                        }

                        $.fancybox.hideLoading();
                        $(".imagens_mural").GaleriaAva();
                        acoesComentario();
                        buscaAssuntosTimeline(configsTimeline.idGrupo);
                        buscaParticipantes(configsTimeline.idGrupo);

                        $("#ava_fluxoarticles").find("article:first").find('.thumbs_mural').each(function () {
                            var $este = $(this);
                            var totalImg = 0;
                            var todosCarregados = 0;
                            $(this).find('a').each(function (e) {
                                if ($(this).css("display") != "none") {
                                    totalImg++;
                                    $(this).find("img").one("load", function () {
                                        todosCarregados++;
                                        var maiorAltura = $(this).height();

                                        if (todosCarregados == totalImg) {

                                            $este.find('img:visible').each(function (i) {

                                                var img = $(this);

                                                var alturaCorrente = img.height();

                                                if (alturaCorrente > maiorAltura) {
                                                    maiorAltura = alturaCorrente;
                                                }

                                                if (i == (totalImg - 1)) {
                                                    $este.closest('div').css('height', maiorAltura);
                                                    $este.find("img").css({ "height": maiorAltura, "width": 217 });
                                                }

                                            });
                                        }

                                    }).each(function () {
                                        if (this.complete)
                                            $(this).load();
                                    });
                                }
                            });

                        });
                        $(".b_tooltip_left").each(function () {
                            $(this).tooltip({
                                offset: [0, 0],
                                opacity: 1,
                                position: 'top center',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'mouseover, mouseout'
                                }
                            });
                        });
                        $(".tooltipGostaram").tooltip({
                            offset: [0, 0],
                            opacity: 1,
                            position: 'top center',
                            effect: 'slide',
                            relative: true,
                            events: {
                                def: 'mouseover, mouseout'
                            }
                        });
                        $('.ctn_msg').expander({
                            slicePoint: 500,
                            window: 2,
                            expandText: ' leia mais',
                            expandPrefix: '...',
                            userCollapseText: 'menos',
                            preserveWords: true,
                            expandEffect: 'fadeIn',
                            collapseEffect: 'fadeOut'
                        });
                        $('.thumbs_mural').each(function () {
                            var $este = $(this);
                            var totalImg = 0;
                            var todosCarregados = 0;
                            $(this).find('a').each(function (e) {
                                if ($(this).css("display") != "none") {
                                    totalImg++;
                                    $(this).find("img").one("load", function () {
                                        todosCarregados++;
                                        //var menorAltura = $(this).find('img:first').height();
                                        var maiorAltura = $(this).height();

                                        if (todosCarregados == totalImg) {

                                            $este.find('img:visible').each(function (i) {

                                                var img = $(this);

                                                var alturaCorrente = img.height();

                                                if (alturaCorrente > maiorAltura) {
                                                    maiorAltura = alturaCorrente;
                                                }

                                                if (i == (totalImg - 1)) {
                                                    $este.closest('div').css('height', maiorAltura);
                                                    $este.find("img").css({ "height": maiorAltura, "width": 217 });
                                                }

                                            });
                                        }

                                    }).each(function () {
                                        if (this.complete)
                                            $(this).load();
                                    });
                                }
                            });

                        });
                    }

                    //-> Função para carregar mais mensagens
                    function verMaisMensagens(e) {
                        if (bolCarregaMais) {

                            bolCarregaMais = false;

                            _this = $(this);
                            _this.removeAttr('href');
                            e.preventDefault();

                            var _inicio = parseInt($("#ava_fluxoarticles > article").size() + 1);
                            var _fim = parseInt(_inicio + 9);

                            carregaTimeline(_inicio, _fim, false);

                            $(".b_tooltip_left").each(function () {
                                $(this).tooltip({
                                    offset: [0, 0],
                                    opacity: 1,
                                    position: 'top center',
                                    effect: 'slide',
                                    relative: true,
                                    events: {
                                        def: 'mouseover, mouseout'
                                    }
                                });
                            });

                            $(".tooltipGostaram").each(function () {
                                $(this).tooltip({
                                    offset: [0, 0],
                                    opacity: 1,
                                    position: 'top center',
                                    effect: 'slide',
                                    relative: true,
                                    events: {
                                        def: 'mouseover, mouseout'
                                    }
                                });
                            });

                            $('#boxTimeLineGrupos .ctn_msg').expander({
                                slicePoint: 500,
                                window: 2,
                                expandText: ' leia mais',
                                expandPrefix: '...',
                                userCollapseText: 'menos',
                                preserveWords: true,
                                expandEffect: 'fadeIn',
                                collapseEffect: 'fadeOut'
                            });

                            $("#boxTimeLineGrupos .iframeVideoVimeo").on('load', function () {
                                var playerVimeo = $f(this);
                                var playerVimeoStarted = false;
                                playerVimeo.api('pause');
                                playerVimeo.addEvent('ready', function () {
                                    playerVimeo.addEvent('play', function () {
                                        if (!playerVimeoStarted) {
                                            playerVimeoStarted = true;
                                            playerVimeo.api('pause');
                                        }
                                    });
                                });
                            });
                            /*
                            denunciarMensagem();
                            exclusaoMensagem();
                            exclusaoComentario();
                            */
                            acoesComentario();

                            //remove o foco do veja mais
                            $(this).blur();
                        }
                    }

                    //-> Função para excluir uma mensagem rápida
                    function excluirMensagem(id) {
                        _id_msg = id;
                        $.ajax({
                            url: '/AVA/Projetos/Clube/Home/ExcluirMensagemRapida/?id=' + _id_msg,
                            type: 'GET',
                            cache: false,
                            success: function (data) {
                                $("#msg_" + _id_msg).slideUp('slow', function () {
                                    $(this).remove();
                                });
                                $.fancybox.close();
                            },
                            error: function (data) {
                                console.debug("Ocorreu um erro no banco de dados ao excluir mensagem.");
                            }
                        });

                    }

                    //-> Função para excluir um comentário
                    function excluirComentario(id, idM) {
                        _id_coment = id;
                        _id_Msg = idM;

                        $.ajax({
                            url: '/AVA/Projetos/Clube/Home/ExcluirComentario/?idComentario=' + _id_coment,
                            type: 'GET',
                            cache: false,
                            success: function (data) {
                                $("#coment_" + _id_coment).slideUp('slow', function () {
                                    $(this).remove();
                                });
                                listaComentarios(idM);
                                $.fancybox.close();
                            },
                            error: function (data) {
                                console.debug("Ocorreu um erro no banco de dados ao excluir comentário.");
                            }
                        });
                    }

                    //-> Funções genéricas de click no MURAL

                    $("body").on(tpClick, ".ver_mais_doc", function (e) {
                        e.preventDefault();
                        var este = $(this);

                        if (!este.prev().hasClass("mostra")) {
                            este.prev().slideToggle("slow", function () {
                                $(this).addClass("mostra");
                            });
                            este.text("Ver menos");
                        } else {
                            este.prev().slideToggle("slow", function () {
                                $(this).removeClass("mostra");
                            });
                            este.text("Ver mais");
                        }
                    });

                    //-> Excluir uma mensagem
                    $("body").on(tpClick, ".msg_excluir", function (e) {
                        e.preventDefault();
                        var idmensagem = $(this).attr("idM");

                        $.fancybox(
							{
							    type: "ajax",
							    href: "/AVA/Projetos/Clube/Home/ExclusaoMensagem/?id=" + idmensagem,
							    closeBtn: false,
							    padding: 0,
							    helpers: {
							        overlay: {
							            closeClick: false,
							            locked: false
							        }
							    },
							    afterShow: function () {
							        $("#btnCancelarExclusaoMensagem").click(function () {
							            $.fancybox.close();
							        });

							        $("#btnExclusaoMensagem").click(function () {
							            $(this).addClass("disable");
							            excluirMensagem(idmensagem);
							        });
							    }

							}

						);
                    });

                    //-> Excluir um comentário
                    $("body").on(tpClick, ".excluir_comentario", function (e) {
                        e.preventDefault();
                        var idComentario = $(this).attr("idC");
                        var idMensagem = $(this).attr("idM");
                        $.fancybox(
                            {
                                type: "ajax",
                                href: "/AVA/Projetos/Clube/Home/ExclusaoComentario/?id=" + idComentario,
                                closeBtn: false,
                                padding: 0,
                                helpers: {
                                    overlay: {
                                        closeClick: false,
                                        locked: false
                                    }
                                },
                                afterShow: function () {
                                    $("#btnCancelarExclusaoComentario").click(function () {
                                        $.fancybox.close();
                                    });

                                    $("#btnExclusaoComentario").click(function () {
                                        $(this).addClass("disable");
                                        excluirComentario(idComentario, idMensagem);
                                    });
                                }

                            }

                        );
                    });

                    //-> Pega qual o assunto selecionado na combo para filtrar a timeline
                    $("body").on("click", "input:radio[name=cbFiltroAssuntoTimeLine]", function () {
                        var idAssunto = $(this).val();
                        $(this).attr("checked", true);
                        $("#btnFiltroGrupo").attr("idAssunto", idAssunto);
                    });

                    //-> Pega qual o participante selecionado na combo para filtrar a timeline
                    $("body").on("click", "input:radio[name=cbFiltroParticipanteTimeLine]", function () {
                        var idTipoParticipante = $(this).val();
                        $("#btnFiltroParticipante").attr("idTipoParticipante", idTipoParticipante);
                    });

                    //-> Filtra a timeline
                    $("body").on(tpClick, '#btnFiltrarTimeline', function (e) {
                        e.preventDefault();

                        if ($("#btnFiltroGrupo").attr("idAssunto") === undefined || parseInt($("#btnFiltroGrupo").attr("idAssunto")) == 0 || parseInt($("#btnFiltroGrupo").attr("idAssunto")) == 99) {
                            idAssuntoFiltrando = "";
                        } else {
                            idAssuntoFiltrando = $("#btnFiltroGrupo").attr("idAssunto");
                        }

                        if ($("#btnFiltroParticipante").attr("idTipoParticipante") === undefined || parseInt($("#btnFiltroParticipante").attr("idTipoParticipante")) == 0 || parseInt($("#btnFiltroParticipante").attr("idTipoParticipante")) == 99) {
                            idTipoParticipanteFiltrando = "";
                        } else {
                            idTipoParticipanteFiltrando = $("#btnFiltroParticipante").attr("idTipoParticipante");
                        }

                        setFiltersInUrl(idTipoParticipanteFiltrando, idAssuntoFiltrando);

                        carregaTimeline(1, 10);
                    });

                    //-> Função para mostrar todos os comentários
                    $('body').on(tpClick, '.carregarComentarios', function (e) {
                        e.preventDefault();
                        var idMensagem = $(this).attr('idMensagem');
                        var _containerComentario = $(this).closest(".comentariosMural");

                        $("#divComentariosEscondidos_" + idMensagem).slideDown('fast');

                        $(".tooltipGostaram").each(function () {
                            $(this).tooltip({
                                offset: [0, 0],
                                opacity: 1,
                                position: 'top center',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'mouseover, mouseout'
                                }
                            });
                        });

                        $(".ctn_msg", _containerComentario).expander({
                            slicePoint: 500,
                            window: 2,
                            expandText: ' leia mais',
                            expandPrefix: '...',
                            userCollapseText: 'menos',
                            preserveWords: true,
                            expandEffect: 'fadeIn',
                            collapseEffect: 'fadeOut'
                        });

                        $(" .iframeVideoVimeo", _containerComentario).on('load', function () {
                            var playerVimeo = $f(this);
                            var playerVimeoStarted = false;
                            playerVimeo.api('pause');
                            playerVimeo.addEvent('ready', function () {
                                playerVimeo.addEvent('play', function () {
                                    if (!playerVimeoStarted) {
                                        playerVimeoStarted = true;
                                        playerVimeo.api('pause');
                                    }
                                });
                            });
                        });

                        //exclusaoComentario();
                        $(this).hide();
                    });

                    //-> Busca curtições da mensagem
                    function buscaCurticoes(_id, _tipo) {
                        //_id: idMensagemRapida OU idComentario
                        //_tipo: 1 OU 2 -> 1 é mensagem, 2 é comentário
                        $("#boxCurticoesMensagem_" + _id).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                        $.ajax({
                            url: "/AVA/Projetos/Clube/Home/listaCurtidas",
                            data: { 'id': _id, 'tipo': _tipo },
                            cache: false,
                            success: function (data) {

                                if (parseInt(data.error) == 0) {

                                    if (data.usuarios != null) {

                                        var classTooltip = "";
                                        var qtdCurtidasExibir = 2;
                                        var objetoCurtidores = {
                                            curtidor: new Array()
                                        };

                                        //Varre todos as curtidas
                                        for (var ii = 0; ii < data.usuarios.length; ii++) {

                                            var qtdCurtidas = data.usuarios.length;
                                            var bolCurtiu = false;
                                            var idCurtidor = 0;
                                            var idPrimeiroCurtidor = 0;
                                            var idSegundoCurtidor = 0;
                                            var htmlTemp = "";

                                            if (qtdCurtidas > 2) {
                                                classTooltip = "b_tooltip_left";
                                            }

                                            //Verifica se o usuario logado curtiu a mensagem
                                            for (var ff = 0; ff < data.usuarios.length; ff++) {
                                                if (data.usuarios[ff].id == data.usuario.id) {
                                                    bolCurtiu = true;
                                                    idCurtidor = data.usuarios[ff].id;
                                                    qtdCurtidasExibir = 1;
                                                }
                                            }

                                            if (qtdCurtidasExibir > qtdCurtidas) {
                                                qtdCurtidasExibir = qtdCurtidas;
                                            }

                                            //Se for pra listar curtidas de uma mensagem
                                            if (_tipo == 1) {

                                                htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5\" class=\"feedCurtirIcone blokletters vertodoscurtirammensagem " + classTooltip + "\" idmensagem=\"" + _id + "\">";

                                                //Se eu curti a mensagem me poe em 1º lugar na listagem
                                                if (bolCurtiu) {
                                                    htmlTemp = htmlTemp + "<img title=\"você\" src=\"" + data.usuario.strMiniFoto + "\" height=\"25\" width=\"25\"> ";
                                                }

                                                // Se mais alguem curtiu, insere junto com o logado.
                                                if (!bolCurtiu || (bolCurtiu && qtdCurtidas > 1)) {

                                                    for (var kk = 0; kk < qtdCurtidasExibir; kk++) {
                                                        if (qtdCurtidas >= 1) {
                                                            if (parseInt(data.usuarios[kk].id) == parseInt(data.usuario.id)) {
                                                                kk++;
                                                            }

                                                            if (parseInt(data.usuarios[kk].id) != data.usuario.id) {
                                                                htmlTemp = htmlTemp + "<img src=\"" + data.usuarios[kk].strMiniFoto + "\" height=\"25\" width=\"25\"> ";
                                                            }

                                                            //Salva os ids dos dois usuários que estão sendo exibidos para não mostrar dentro da tooltip
                                                            if (idPrimeiroCurtidor == 0) {
                                                                idPrimeiroCurtidor = data.usuarios[kk].id;
                                                            } else if (idSegundoCurtidor == 0 && idPrimeiroCurtidor != 0) {
                                                                idSegundoCurtidor = data.usuarios[kk].id;
                                                            }
                                                        }
                                                    }
                                                }

                                                // Exibe o +X 
                                                if (parseInt(qtdCurtidas - 2) > 0) {
                                                    htmlTemp = htmlTemp + "+ " + parseInt(qtdCurtidas - 2);
                                                }
                                                //fecha <a> da perseguição
                                                htmlTemp = htmlTemp + "</a> ";

                                                //Exibe a tooltip com todos os curtidores
                                                htmlTemp = htmlTemp + "<div class=\"black_tip_left tooltip\" id=\"tooltipCurtir_" + _id + "\" style=\"display: none\"> ";
                                            } else {
                                                idCurtidor = data.usuario.id;
                                            }

                                            for (var dd = 0; dd < qtdCurtidas; dd++) {

                                                // só mostra 10 curtidores dentro da tooltip
                                                if (dd <= 10) {

                                                    //Só adiciona na tooltip os curtidores que não estejam sendo exibidos.

                                                    if (data.usuarios[dd].id != idCurtidor && data.usuarios[dd].id != idPrimeiroCurtidor && data.usuarios[dd].id != idSegundoCurtidor) {
                                                        htmlTemp = htmlTemp + "<a href=\"/AVA/Perfil/Home/Index/" + data.usuarios[dd].strLogin + "\">" + data.usuarios[dd].strApelido + "</a> ";
                                                    }
                                                } else {
                                                    break;
                                                }
                                            }

                                            //Só exibe o "ver todos" dentro da tooltip se existirem mais de 10 curtições
                                            if (qtdCurtidas > 10 && _tipo == 1) {

                                                htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5\" class=\"vertodoscurtirammensagem ver_todos_tool\" id=\"" + _id + "\" idmensagem=\"" + _id + "\">Ver todos</a> ";

                                            } else if (qtdCurtidas > 10 && _tipo == 2) {

                                                htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6\" class=\"vertodoscurtiramcomentario ver_todos_tool\" id=\"" + _id + "\">Ver todos</a> ";
                                            }

                                            //Só fecha a div da tooltip se for curtidas da mensagem, curtidas do comentário não tem essa div.

                                            if (_tipo == 1) {
                                                htmlTemp = htmlTemp + "</div> ";
                                                $("#boxCurticoesMensagem_" + _id).html(htmlTemp);
                                            } else if (_tipo == 2) {
                                                $("#boxCurtidasComentarios_" + _id).html(htmlTemp);
                                            }

                                            $(".tooltipGostaram").each(function () {
                                                $(this).tooltip({
                                                    offset: [0, 0],
                                                    opacity: 1,
                                                    position: 'top center',
                                                    effect: 'slide',
                                                    relative: true,
                                                    events: {
                                                        def: 'mouseover, mouseout'
                                                    }
                                                });
                                            });

                                        }
                                    } //tem curtidas
                                    else { // Não tem curtidas então esconde o loader
                                        $("#boxCurticoesMensagem_" + _id).html("");
                                    }


                                    $(".b_tooltip_left").each(function () {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: 'top center',
                                            effect: 'slide',
                                            relative: true,
                                            events: {
                                                def: 'mouseover, mouseout'
                                            }
                                        });
                                    });
                                } else {
                                    console.log("Erro ao listar curticoes da mensagem.")
                                    $("#boxCurticoesMensagem_" + _id).html("");
                                }

                            },
                            error: function () {
                                console.log("Erro ao listar curticoes da mensagem.")
                                $("#boxCurticoesMensagem_" + _id).html("");
                            }
                        });

                    }

                    //-> Salvar comentário
                    function grava_comentario(e, _this) {
                        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                            var _idMsg = _this.attr('idMensagemRapida');

                            if (_this.val() != "") {
                                $.ajax({
                                    url: "/AVA/Projetos/Clube/Home/Comentar",
                                    type: 'POST',
                                    cache: false,
                                    data: {
                                        'comentario': _this.val(),
                                        'idMensagemRapida': _idMsg
                                    },
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    success: function (data) {

                                        if (parseInt(data.error) == 0) {
                                            listaComentarios(_idMsg);
                                            $("#boxComentariosGrupo_" + _idMsg + " .ctn_msg").expander({
                                                slicePoint: 500,
                                                window: 2,
                                                expandText: ' leia mais',
                                                expandPrefix: '...',
                                                userCollapseText: 'menos',
                                                preserveWords: true,
                                                expandEffect: 'fadeIn',
                                                collapseEffect: 'fadeOut'
                                            });
                                            $("#boxComentariosGrupo_" + _idMsg + " .iframeVideoVimeo").on('load', function () {
                                                var playerVimeo = $f(this);
                                                var playerVimeoStarted = false;
                                                playerVimeo.api('pause');
                                                playerVimeo.addEvent('ready', function () {
                                                    playerVimeo.addEvent('play', function () {
                                                        if (!playerVimeoStarted) {
                                                            playerVimeoStarted = true;
                                                            playerVimeo.api('pause');
                                                        }
                                                    });
                                                });
                                            });
                                            _this.val("");
                                            _this.focus();
                                        } else {
                                            alert("Erro ao salvar comentário.")
                                        }
                                    },
                                    error: function () {
                                        alert("Erro ao salvar comentário.")
                                    }
                                });
                            }

                        }

                    }

                    //-> Ver mais mensagens
                    $("body").on(tpClick, '#btCarregaMensagens', function (e) {
                        verMaisMensagens(e);
                    });

                    //-> Cria o "ler mais" nas mensagens
                    $('#boxTimeLineGrupos .ctn_msg').expander({
                        slicePoint: 500,
                        window: 2,
                        expandText: ' leia mais',
                        expandPrefix: '...',
                        userCollapseText: 'menos',
                        preserveWords: true,
                        expandEffect: 'fadeIn',
                        collapseEffect: 'fadeOut'
                    });

                    //-> Salva o comentário quando o usuário aperta enter
                    $("body").on("keypress", "#strComentarioGrupo", function (e) {
                        var _this = $(this);
                        grava_comentario(e, _this);
                    });

                    //-> Mostra todos que curtiram a mensagem
                    $("body").on(tpClick, ".vertodoscurtirammensagem", function (e) {
                        e.preventDefault();
                        var _this = $(this);
                        var id = $(this).attr("idmensagem");
                        var o = {
                            href: _this.attr("href"),
                            autoSize: false,
                            width: 720,
                            autoResize: false,
                            fitToView: false,
                            height: 'auto',
                            padding: 15,
                            type: "ajax",

                            afterShow: function () {
                                var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + id;
                                retornaJson($urlSeguidosCompleto);
                            },
                            helpers: {
                                overlay: {
                                    locked: false
                                }
                            }
                        };
                        $.fancybox(o);
                    });

                    //-> Curte ou descurte uma mensagem
                    $("body").on(tpClick, 'a.botaoCurtirGrupos', function (e) {
                        e.preventDefault();
                        var idMensagemRapida = $(this).attr("idMensagemRapida");
                        if ($(this).hasClass('ativo')) {
                            //descurtir mensagem
                            $.ajax({
                                url: "/AVA/Projetos/Clube/Home/removerCurtirMensagem",
                                data: { 'idMensagemRapida': idMensagemRapida },
                                cache: false,
                                success: function (data) {
                                    if (parseInt(data.error) == 0) {
                                        buscaCurticoes(idMensagemRapida, 1);
                                    } else {
                                        alert("Erro ao descurtir mensagem.");
                                    }
                                },
                                error: function () {
                                    alert("Erro ao descurtir mensagem.")
                                }
                            });
                        } else {
                            //curtir mensagem
                            $.ajax({
                                url: "/AVA/Projetos/Clube/Home/CurtirMensagem",
                                data: { 'idMensagemRapida': idMensagemRapida },
                                cache: false,
                                success: function (data) {
                                    if (parseInt(data.error) == 0) {
                                        buscaCurticoes(idMensagemRapida, 1);
                                    } else {
                                        alert("Erro ao curtir mensagem.");
                                    }
                                },
                                error: function () {
                                    alert("Erro ao curtir mensagem.")
                                }
                            });
                        }
                        $(this).toggleClass('ativo');
                    });

                    //-> Curte ou descurte um comentário
                    $("body").on(tpClick, 'a.botaoCurtirComentario', function (e) {
                        e.preventDefault();
                        var idComentario = $(this).attr("idComentario");
                        if ($(this).hasClass('ativo')) {
                            $.ajax({
                                url: "/AVA/Projetos/Clube/Home/DescurtirComentario",
                                data: { 'idComentario': idComentario },
                                cache: false,
                                success: function (data) {
                                    if (parseInt(data.error) == 0) {
                                        buscaCurticoes(idComentario, 2);
                                    } else {
                                        alert("Erro ao descurtir comentário.")
                                    }
                                },
                                error: function () {
                                    alert("Erro ao descurtir comentário.")
                                }
                            });
                        } else {
                            $.ajax({
                                url: "/AVA/Projetos/Clube/Home/CurtirComentario",
                                data: { 'idComentario': idComentario },
                                cache: false,
                                success: function (data) {
                                    if (data.error == 0) {
                                        buscaCurticoes(idComentario, 2);
                                    } else {
                                        alert("Erro ao curtir comentário.")
                                    }
                                },
                                error: function () {
                                    alert("Erro ao curtir comentário.");
                                }
                            });
                        }
                        $(this).toggleClass('ativo');
                    });

                    //-> Monta o mark-up  do topo do mural
                    htmlTimeline = "";
                    htmlTimeline = htmlTimeline + "<section class=\"timeline\"> ";
                    htmlTimeline = htmlTimeline + "            <header> ";
                    htmlTimeline = htmlTimeline + "                <input type=\"hidden\" value=\"0\" id=\"hTipoDePostMural\"/> ";
                    htmlTimeline = htmlTimeline + "                <h1 class=\"komika\"><span class=\"icon_li mural\"></span>MURAL</h1>  ";
                    htmlTimeline = htmlTimeline + "                <div class=\"right filtro_timeline\"> ";
                    htmlTimeline = htmlTimeline + "                    Filtrar por: ";
                    htmlTimeline = htmlTimeline + "                    <div class=\"bootstrap\"> ";
                    htmlTimeline = htmlTimeline + "                        <div class=\"btn-group\"> ";
                    htmlTimeline = htmlTimeline + "                            <button data-toggle=\"dropdown\" class=\"btn btn-small dropdown-toggle\" id=\"btnFiltroParticipante\" idTipoParticipante=\"0\">  ";
                    htmlTimeline = htmlTimeline + "                                <span class=\"FontAwesome\" id=\"textoBtnFiltroParticipante\"> Todos </span><span class=\"caret\"></span> ";
                    htmlTimeline = htmlTimeline + "                            </button> ";
                    htmlTimeline = htmlTimeline + "                            <ul class=\"dropdown-menu\" id=\"cbFiltroAssunto\"> ";
                    htmlTimeline = htmlTimeline + "                                <span class=\"seta_cima\"></span> ";
                    htmlTimeline = htmlTimeline + "                            </ul>    ";
                    htmlTimeline = htmlTimeline + "                        </div>  ";
                    htmlTimeline = htmlTimeline + "                    </div>  ";
                    htmlTimeline = htmlTimeline + "                    <div class=\"bootstrap\"> ";
                    htmlTimeline = htmlTimeline + "                        <div class=\"btn-group\"> ";
                    htmlTimeline = htmlTimeline + "                        <a href=\"javascript: void(0);\" data-toggle=\"dropdown\" class=\"btn btn-small dropdown-toggle whiteButton\" id=\"btnFiltroGrupo\" idAssunto=\"0\"> ";
                    htmlTimeline = htmlTimeline + "                            <span class=\"FontAwesome\"></span> ";
                    htmlTimeline = htmlTimeline + "                            <span id=\"textoBtnFiltroAssunto\">Todos os assuntos</span> ";
                    htmlTimeline = htmlTimeline + "                            <span class=\"caret\"></span>";
                    htmlTimeline = htmlTimeline + "                        </a>";
                    htmlTimeline = htmlTimeline + "                            <ul class=\"dropdown-menu\" id=\"cbFiltroAssuntoTimeLine\"> ";
                    htmlTimeline = htmlTimeline + "                                <span class=\"seta_cima\"></span> ";
                    htmlTimeline = htmlTimeline + "                            </ul> ";
                    htmlTimeline = htmlTimeline + "                        </div>  ";
                    htmlTimeline = htmlTimeline + "                    </div>    ";
                    htmlTimeline = htmlTimeline + "                    <a href=\"javascript: void(0);\" id=\"btnFiltrarTimeline\" class=\"btn_cinza right\">Filtrar</a>";
                    htmlTimeline = htmlTimeline + "                </div>     ";
                    htmlTimeline = htmlTimeline + "            </header> ";
                    htmlTimeline = htmlTimeline + "            <div id=\"ava_fluxoarticles\"> ";
                    //-> fim Monta o mark-up  do topo do mural

                    //-> Monta o html
                    $htmlTimeLine = $(htmlTimeline);

                    //-> Escreve o html
                    $(this).append($htmlTimeLine);

                    var filter = getFiltersInUrl();
                    if (filter['assunto'] !== undefined)
                        $("#btnFiltroGrupo").attr("idAssunto", filter['assunto']);
                    if (filter['participante'] !== undefined)
                        $("#btnFiltroParticipante").attr("idTipoParticipante", filter['participante']);
                    //-> Chama a timeline incial
                    carregaTimeline(1, 10);

                    //-> Salva os objetos
                    $(this).data("timeline", {
                        target: $htmlTimeLine,
                        configs: configsTimeline
                    });

                } else if (configsTimeline.carregarMais) {
                    callbackSalvar(configsTimeline.intInicio, configsTimeline.intFim, configsTimeline.prepend);
                } else {
                    console.log("O plugin 'timeline' já está instanciado.");
                }

            });
        },
        destruir: function () {
            return this.each(function () {
                var principal = $(this);
                var dataDigaLa = principal.data("timeline");

                if (dataDigaLa) {
                    $(window).unbind('.timeline');
                    dataDigaLa.target.remove();
                    principal.removeData("timeline");
                }
            });
        }
    };

    //-> Cria o plugin
    $.fn.timeline = function (parametros) {
        if (methods[parametros]) {
            return methods[parametros].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof parametros === "object" || !parametros) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Método " + method + " não existe no plugin timeline");
        }
    };
})(jQuery);