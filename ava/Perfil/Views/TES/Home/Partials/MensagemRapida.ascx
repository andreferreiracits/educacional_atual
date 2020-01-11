<%@ Control Language="C#" Debug="true" Inherits="System.Web.Mvc.ViewUserControl<Perfil.Models.MainPerfilPrivado>" %>


<script type="text/javascript">
    

    var contFile = 8000;
    var contImg = 2000;
    var g_arrayMensagemRapida = [];
    var g_arrayMensagemRapidaFile = [];
    

    var timeout = null;
    var idFerramentaTipoTimeLine = 35; //constante
    var idFerramentaTipoGrupo = 36; //constante
    var idFerramentaTipoTimeLineFile = 37; //constante
    var idFerramentaTipoGrupoFile = 38; //constante
    var objetoImagens = {
        imagens: new Array()
    };
    var objetoArquivos = {
        arquivos: new Array()
    };
    var tpClickMuralPerfil = "click";
    $(function () {
        if (Modernizr.touch) {
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
            if (isAndroid) {
                tpClickMuralPerfil = "click";
            } else {
                tpClickMuralPerfil = "touchstart"; //mobile
            }
        }


        //para mobile
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

        $("#previewImagemDigaLaPerfil").dialog({
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

        $("#txtLinkVideoMensagem").keyup(function () {
            $('.errovideo, .verificavideo').hide();

            if ($(this).val().length == 0) {

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
        });

        /** ARQUIVO TIMELINE **/
        $("body").on(tpClickMuralPerfil, ".mensagem_multimidia .multimidia_documentos", function (e) {
            e.preventDefault();
            console.log("entrou no multimidia_documentos ------ pppppppppppppp");
            abreUploadFileTimeLine();
        })
        .on("click", ".dialogo_box .preview_post.arquivos .remover_multimidia", function (e) {
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
                    //$("#btnCancelarFerramentaMural").addClass("disable").prop("disabled", true);

                    $(".dialogo_box .preview_post.arquivos").hide();
                    //$("#compartilhar").addClass("disable").prop("disabled", true);
                    $("#compartilhar").hide();
                    $("#btnCancelarFerramentaMural").hide();
                    $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                    $(".dialogo .mensagem_multimidia").show();
                    $("#seletorMuralDigaLa").show();
                }
                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val() !== "") {
                    $(".dialogo .mensagem_multimidia").show();
                    $(".dialogo_box .preview_post.arquivos").hide();
                    $("#compartilhar").show();
                    $("#btnCancelarFerramentaMural").show();
                    $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
                    $("#seletorMuralDigaLa").show();
                }

            }

            $(".dialogo_box .preview_post.arquivos").mCustomScrollbar("update");
        }); /*
        .on(tpClickMuralPerfil, ".dialogo_box .preview_post.arquivos .adicionar_doc", function (e) {
            e.preventDefault();
            abreUploadFileTimeLine();
        });*/
        $(".dialogo_box .preview_post.arquivos .adicionar_doc").click(function (e) {
            e.preventDefault();
            abreUploadFileTimeLine();
        });
        $(".dialogo_box .preview_post.arquivos").mCustomScrollbar();
        /** ARQUIVO TIMELINE **/

        /*** IMAGEM TIMELINE ****/

        $("body").on("click", ".dialogo_box .preview_post.imagens .remover_multimidia", function (e) {
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
                    //$("#btnCancelarFerramentaMural").addClass("disable").prop("disabled", true);

                    $(".dialogo .dialogo_box .preview_post.imagens").hide();
                    $(".dialogo_box .preview_post.imagens").hide();
                    //$("#compartilhar").addClass("disable").prop("disabled", true);
                    $("#compartilhar").hide();
                    $("#btnCancelarFerramentaMural").hide();
                    $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                    $(".dialogo .mensagem_multimidia").show();
                    $("#seletorMuralDigaLa").show();
                }
                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val() !== "") {
                    $(".dialogo .mensagem_multimidia").show();
                    $(".dialogo_box .preview_post.imagens").hide();
                    $("#compartilhar").show();
                    $("#btnCancelarFerramentaMural").show();
                    $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
                    $("#seletorMuralDigaLa").show();
                }

            }

            $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");

        })
        .on(tpClickMuralPerfil, ".mensagem_multimidia .multimidia_imagens", function (e) {
            e.preventDefault();
            console.log("entrou no multimidia_imagens teste");
            abreUploadImagemTimeLine();
        })
        .on(tpClickMuralPerfil, ".mensagem_multimidia .multimidia_video", function (e) {
            console.log("entrou no mural ");
            e.preventDefault();
            $(this).closest(".mensagem_multimidia").hide();
            if (!$(".enviar_video").is(":visible")) {
                $(this).closest(".mensagem_multimidia").hide();
                $(".enviar_video").show();
                var url = location.href.toLowerCase();
                if (url.indexOf("perfil/home/index") == -1) {
                    $("#seletorMuralDigaLa").show();
                    $('.sep_digala').fadeIn('fast');
                    preparaAvaSelector();
                }

                $('#compartilhar').show();
                //$("#compartilhar").addClass("disable").prop("disabled", true);
                $("#btnCancelarFerramentaMural").show();
                $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

            }

        })
        .on(tpClickMuralPerfil, "#btnCancelarFerramentaMural", function (e) {
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
            $('.sep_digala').hide();
        });

        $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar({
            horizontalScroll: true,
            advanced: {
                autoExpandHorizontalScroll: true
            }
        });

        $(".dialogo_box .preview_post.imagens .adicionar .adicionar_multimidia").click(function (e) {
            e.preventDefault();
            abreUploadImagemTimeLine();
        });



        /*$(".dialogo_box .preview_post.imagens .engloba_classe").sortable({/
        items: "> .ui-state-default",
        cursor: "move",
        update: function(event, ui){
        $(".dialogo_box .preview_post.imagens .engloba_classe > .ui-state-default").each(function () {
        console.log($(this).data("posicao"));
        });
        }
        });*/
        //$(".dialogo_box .preview_post.imagens .engloba_classe").disableSelection();


        /*** IMAGEM TIMELINE ****/

        $('.actions').click(function (e) {
            e.preventDefault();
            _pos = $(this).attr('pos');
            $('.actions').removeClass('current');
            $(this).addClass('current');

            if (_pos !== undefined) {
                $('.actions_target').hide();
                $('.actions_target').eq(_pos).fadeIn();
            }
        });
    });

    /*** ARQUIVOS TIMELINE ***/

    function montaPreviewFilesMensagemRapida(obj) {

        var $caixa = $(".dialogo_box .preview_post.arquivos .mCSB_container");

        if (obj !== undefined && obj != null && obj.length > 0) {
            for (var i = 0; i < obj.length; i++) {

                var $div = $("<div />").data("idarquivo", obj[i].idArquivo);
                var $divv = $("<div />").addClass("prev_documento");
                var $div3 = $("<div />").addClass("tipo_arquivo");
                var $img = $("<img />").attr("src", "/ava/StaticContent/Common/img/perfil/documento_multimidia.png").attr("width", "32").attr("height", "41");
                var $span = $("<span />").text(obj[i].extensao.substring(1, obj[i].extensao.length));
                var $p = $("<p />").html((obj[i].nome == "" ? obj[i].arquivo : obj[i].nome));
                var $a = $("<a />").attr("href", "#").addClass("remover_multimidia").text("Remover");
                var $spana = $("<span />").addClass("FontAwesome");


                $div3.append($img);
                $div3.append($span);
                $divv.append($div3);
                $divv.append($p);
                $a.prepend($spana);
                $div.append($divv);
                $div.append($a);


                $caixa.find(".adicionar_doc").prev().before($div);

                //$caixa.append($div);
                /*if($caixa.find(".prev_imagem:first").hasClass("adicionar")){
                $caixa.prepend($div);
                } else {
                $caixa.find(".prev_imagem").not(".adicionar").last().after($div);
                }*/

            }
            //$(".engloba_classe").css("width", ((obj.length + 1) * 109));
            $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update");
        }


        var jsonObject = (obj) ;

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

        g_arrayMensagemRapidaFile.push(jsonObject[i]);
        

        var htmlObject = '' +

                    '<li class="qq-file-id-'+contFile+' qq-upload-success" qq-file-id="'+contFile+'">'+

                         '<span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>'+

                         '<div class="qq-progress-bar-container-selector qq-progress-bar-container qq-hide">'+


                            '<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>'+

                         '</div>'+

                         '<span class="qq-upload-spinner-selector qq-upload-spinner"></span>'+
                         
                         '<div  id= "miniatura" class="qq-thumbnail-wrapper">'+
                            
                            '<div id = "thumbImagem" class="tipoArquivo_fineUpload" qq-max-size="120" qq-server-scale>'+

                                '<span>'+jsonObject[i].extensao+'</span>'+

                            '</div>'+

                        '</div>'+
                         
                         '<button type="button" class="qq-upload-cancel-selector qq-upload-cancel qq-hide">X</button>'+
                         '<button type="button" class="qq-upload-retry-selector qq-upload-retry qq-hide">'+
                         '<span class="qq-btn qq-retry-icon" aria-label="Retry"></span>'+
                         'Retry'+
                         '</button>'+
                         '<div class="qq-file-info">'+
                            '<div class="qq-file-name">'+
                    '       <span class="qq-upload-file-selector qq-upload-file" title="'+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+jsonObject[i].arquivo+jsonObject[i].extensao+'</span>'+
                               '<span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>'+
                            '</div>'+
                            '<input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">'+
                           '<!-- <span class="qq-upload-size-selector qq-upload-size"></span> -->'+
                            '<button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete" onclick="deleteItem()">'+
                            '<span class="qq-btn qq-delete-icon" aria-label="Delete"></span>'+
                            '</button>'+
                            '<button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause">'+
                            '<span class="qq-btn qq-pause-icon" aria-label="Pause"></span>'+
                            '</button>'+
                            '<button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue">'+
                            '<span class="qq-btn qq-continue-icon" aria-label="Continue"></span>'+
                            '</button>'+
                         '</div>'+
                      '</li>';
        
        $('.qq-upload-list').append(htmlObject);
        contFile++;
    }

    // bloqueiaOutrosDigaLa(true);
    // $("#previewImagemDigaLa").show();
}

    }

    function limpaPreviewArquivosMensagemRapida() {
        $(".dialogo_box .preview_post.arquivos .prev_documento").parent().remove();
    }

    function limpaArrayArquivosTimeLine() {
        if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
            objetoArquivos.arquivos.splice(0, objetoArquivos.arquivos.length);
        }
    }

    function abreUploadFileTimeLine() {
        console.log("abreUploadFileTimeLine MensagemRapida teste");
        console.log("window.open");
        var flagContinua = true;
        var idArquivoMultimidia = parseInt($(".dialogo .dialogo_box .preview_post.arquivos").data("idarquivomultimidia"));
        $.fancybox.showLoading();
        if (idArquivoMultimidia === undefined || idArquivoMultimidia == null || idArquivoMultimidia == 0) {

            $.ajax({
                url: "/ava/mural/home/VerificaArquivoMultimidiaTimeline",
                dataType: "json",
                async: false,
                success: function (data) {
                    var erro = parseInt(data.error);
                    if (erro == 0) {
                        idArquivoMultimidia = parseInt(data.arquivomultimidia.idArquivoMultimidia);

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
            if (objetoArquivos.arquivos.length > 0) {
                for (var oi in objetoArquivos.arquivos) {
                    idsArquivosPreSelecionados.push(objetoArquivos.arquivos[oi].idArquivo);
                }
            }

            var param = {
                "idFerramenta": idArquivoMultimidia,
                "idFerramentaTipo": idFerramentaTipoTimeLineFile,
                "idsArquivosSelecionados": idsArquivosPreSelecionados.join(',')
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
            console.log("window.open");
            a = window.open("", "Upload", parametros);
            if (a) {
                mForm.submit();
            }
            $.fancybox.hideLoading();
        }
    }

    /*** ARQUIVOS TIMELINE ***/

    /******* TIMELINE IMAGEM *********/

    function CallbackUploadExcluidos(jsonRetorno) {
        if (parseInt(jsonRetorno.idFerramentaTipo) == idFerramentaTipoTimeLine) {
            if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens != null && objetoImagens.imagens.length > 0) {
                var tamanho = objetoImagens.imagens.length;
                for (var i = 0; i < tamanho; i++) {
                    if (objetoImagens.imagens[i].idArquivo == jsonRetorno.idArquivo) {
                        objetoImagens.imagens.splice(i, 1);
                        $(".preview_post.imagens").find(".prev_imagem").not(".adicionar").each(function () {
                            if ($(this).data("idarquivo") == jsonRetorno.idArquivo) {
                                $(this).remove();
                                return;
                                //console.log($(this).data("idarquivo"));
                            }
                        });
                        break;
                    }
                }
                if (objetoImagens.imagens.length == 0) {
                    if ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible")) {
                        $(".dialogo .dialogo_box .preview_post.imagens").hide();

                    }
                    if (!$(".mensagem_multimidia").is(":visible")) {
                        $(".mensagem_multimidia").show();
                        if ($("#txtInput").val() == "") {
                            $("#compartilhar").addClass("disable").prop("disabled", true);
                        }
                    }
                }
            }
        }
        else if (parseInt(jsonRetorno.idFerramentaTipo) == idFerramentaTipoTimeLineFile) {
            if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                var tamanho = objetoArquivos.arquivos.length;
                for (var i = 0; i < tamanho; i++) {
                    if (objetoArquivos.arquivos[i].idArquivo == jsonRetorno.idArquivo) {
                        objetoArquivos.arquivos.splice(i, 1);
                        $(".preview_post.arquivos").find(".prev_documento").each(function () {
                            if (parseInt($(this).parent().data("idarquivo")) == jsonRetorno.idArquivo) {
                                $(this).parent().remove();
                                return;
                                //console.log($(this).data("idarquivo"));
                            }
                        });
                        break;
                    }
                }
                if (objetoArquivos.arquivos.length == 0) {
                    if ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")) {
                        $(".dialogo .dialogo_box .preview_post.arquivos").hide();

                    }
                    if (!$(".mensagem_multimidia").is(":visible")) {
                        $(".mensagem_multimidia").show();
                        if ($("#txtInput").val() == "") {
                            $("#compartilhar").addClass("disable").prop("disabled", true);
                        }
                    }
                }
            }
        }
        //console.log(jsonRetorno);
    }

    function abreUploadImagemTimeLine() {
        console.log("abreUploadImagemTimeLine kkkkkkkkkkkkkkkk");
        var flagContinua = true;
        var idalbum = parseInt($(".dialogo .dialogo_box .preview_post.imagens").data("idalbum"));
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
                "idFerramenta": idalbum,
                "idFerramentaTipo": idFerramentaTipoTimeLine,
                "idsArquivosSelecionados": idsArquivosPreSelecionados.join(',')
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
            
            mForm.target = "Upload_perfil";
            mForm.method = "POST";
            mForm.action = "/AVA/Upload";

            document.body.appendChild(mForm);

            var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                parametros = null;
            }
            /*
            a = window.open("", "Upload", parametros);
            if (a) {
                mForm.submit();
            }
            */

            $("#previewImagemDigaLaPerfil iframe").append(mForm);		
            mForm.submit();		
            $("#previewImagemDigaLaPerfil").dialog("open");	

            $.fancybox.hideLoading();
        }
    }

    function limpaPreviewImagemMensagemRapida() {
        $(".dialogo_box .preview_post.imagens .engloba_classe .prev_imagem").not(".adicionar").remove();
    }

    function limpaArrayImagensTimeLine() {
        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
            objetoImagens.imagens.splice(0, objetoImagens.imagens.length);
        }
    }

    function montaPreviewImagemMensagemRapida(obj) {

        var $caixa = $(".dialogo_box .preview_post.imagens .engloba_classe .mCSB_container");

        if (obj !== undefined && obj != null && obj.length > 0) {
            for (var i = 0; i < obj.length; i++) {
                var caminhoImagem = obj[i].diretorio;
                var thumb = obj[i].thumbnail + obj[i].extensao;
                var $div = $("<div />").addClass("prev_imagem").data("idarquivo", obj[i].idArquivo);
                var $img = $("<img />").attr("src", caminhoImagem + "/" + thumb).attr("width", "99").attr("height", "99").attr("alt", obj[i].nome);
                var $a = $("<a />").addClass("remover_multimidia").attr("href", "javascript:void(0);");
                var $span = $("<span />").addClass("FontAwesome");

                $a.append($span);
                $div.append($img);
                $div.append($a);

                if ($caixa.find(".prev_imagem:first").hasClass("adicionar")) {
                    $caixa.prepend($div);
                } else {
                    $caixa.find(".prev_imagem").not(".adicionar").last().after($div);
                }

            }
            //$(".engloba_classe").css("width", ((obj.length + 1) * 109));
            $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
        }


        var jsonObject = (obj) ;

        console.log(jsonObject);

        for(var i = 0; i < jsonObject.length; i++){

            console.log(jsonObject[i].diretorio);

            jsonObject[i].idPosition = contImg;

            g_arrayMensagemRapida.push(jsonObject[i]);

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

    /******* TIMELINE IMAGEM *********/
</script>
    <%
    bool bolConfigImagem = (bool)ViewData["bolConfigImagem"];
    bool bolConfigVideo = (bool)ViewData["bolConfigVideo"];
    bool bolConfigFile = (bool)ViewData["bolConfigFile"];
    int idAlbum = (int)ViewData["idAlbum"];
    int idArquivoMultimidia = (int)ViewData["idArquivoMultimidia"];
    bool perfilPublico = false;
    if (ViewData["perfilPublico"] != null)
    {
        perfilPublico = (bool)ViewData["perfilPublico"];
    }
    

    //Verifica se o usuário não tá excluido e nem em processo de exclusão, se sim, não mostra o form
    //Bug 5830 - Renan Daré -> 29/05/2013
    if ((bool)ViewData["bolExcluido"] == false && (int)ViewData["idEstado"] != 6)
    {

    %>
    <form id="frmMensagemRapida" name="frmMensagemRapida" method="post">
        <section class="dialogo clearfix">
               
                <a href="javascript: void(0);" class="current actions komika">
                    <span class="fontello digala"></span>
                    Diga lá
                    <span class="seta"></span>
                </a>

                <div class="dialogo_box actions_target">
                    <%
                    string msgTextoPlaceHolder;
                    if (Model.idVisitante == Model.idUsuario)
                    {
                        msgTextoPlaceHolder = "Olá! Compartilhe aqui ideias ou links!";
                    }
                    else
                    {
                        msgTextoPlaceHolder = "Envie uma mensagem para " + Model.strNome + " (Não é uma mensagem privada)";
                    }
                    %>
                    <textarea title="<%=msgTextoPlaceHolder %>" name="dialogo" placeholder="<%=msgTextoPlaceHolder %>" rows="1" cols="40" autocomplete="off" class="dialogo_field ph" id="txtInput" style="overflow: hidden; height: 48px;display:none;"></textarea>
                    
                    <%
                        if (Model.bolVisitanteEducador)
                        {
                        %>
                           <div id="fine-uploader-gallery"></div>
                        
                        <div class="preview_post video" id="container_preview_video" style="display: none;">
                
                        </div>
                        <%
                             if (bolConfigImagem)
                             { //if configuração imagem
                                %>
                                <div class="preview_post imagens content" data-idalbum="<%=idAlbum %>" style="display: none;">
                    
                                    <!-- <div class="engloba_classe ">
                                        <div class="prev_imagem adicionar">
                                            <a href="javascript:void(0);" class="adicionar_multimidia"><span class="FontAwesome"></span>Adicionar</a>
                                        </div>
                                    </div> -->
                                </div>
                             <%
                            }
                            %>
                            <div class="clearfix"></div>
                            <%
                            if (bolConfigFile)
                            {
                                %>
                                <div class="preview_post content arquivos" data-idarquivomultimidia="<%=idArquivoMultimidia %>" style="display: none;">
                                    <div class="clearfix"></div>
                                    <!-- <a href="javascript:void();" class="adicionar_doc"><span class="FontAwesome"></span>Adicionar</a> -->
                                </div> 
                                <div class="clearfix"></div>

                                    <%
                            }
                        }
                    %>
                    <div style="padding:20px 45%;" id="loader_dialogo"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>
                    <script>
                        strMensagemPadrao = '<%=msgTextoPlaceHolder%>';
                    </script>
                </div>
                
                

    <script type="text/template" id="qq-template-gallery">
                <div class="qq-uploader-selector qq-uploader qq-gallery" qq-drop-area-text="">
                   <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
                      <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
                   </div>
                   <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
                      <span class="qq-upload-drop-area-text-selector"></span>
                   </div>
                   <div class="qq-upload-button-selector qq-upload-button">
                      <div>Selecione um Arquivo</div>
                   </div>
                   <!-- Preview de imagens anexadas -->
                   <!-- <div id="previewImagemDigaLa" class="preview_img_post preview_anx_post" data-idalbum="<%=idAlbum %>" style="display:none;"> -->
                   <!-- Adicionar mais imagem -->
                   <!-- <div class="prev_midia adicionar">                       
                      <a id="addImagemDigaLa" href="javascript:void(0);" class="btn_acao opcao_adicionar">Adicionar</a> 
                      </div>
                      </div> -->
                   <!-- 
                      <div id="previewImagemDigaLa" class="prev_midia adicionar" style="display:none">                       
                              <a id="addImagemDigaLa" href="javascript:void(0);" class="btn_acao opcao_adicionar">Adicionar</a> 
                          </div> -->
                   <div id="text_file_drag" class="text_file_drag">Arraste e solte seus arquivos aqui</div>
                   <span class="qq-drop-processing-selector qq-drop-processing">
                   <span>Processing dropped files...</span>
                   <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
                   </span>
                   <ul class="qq-upload-list-selector qq-upload-list" role="region" aria-live="polite" aria-relevant="additions removals">
                      <li>
                         <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
                         <div class="qq-progress-bar-container-selector qq-progress-bar-container">
                            <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>
                         </div>
                         <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
                         
                         <div  id= "miniatura" class="qq-thumbnail-wrapper">
                            <img  class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>
                            <div id = "thumbImagem" class="tipoArquivo_fineUpload" qq-max-size="120" qq-server-scale style="display:none">
                            </div>
                         </div>
                         
                         <button type="button" class="qq-upload-cancel-selector qq-upload-cancel">X</button>
                         <button type="button" class="qq-upload-retry-selector qq-upload-retry">
                         <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>
                         Retry
                         </button>
                         <div class="qq-file-info">
                            <div class="qq-file-name">
                               <span class="qq-upload-file-selector qq-upload-file"></span>
                               <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>
                            </div>
                            <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
                            <!-- <span class="qq-upload-size-selector qq-upload-size"></span> -->
                            <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete" onclick="deleteItem()">
                            <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>
                            </button>
                            <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause">
                            <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>
                            </button>
                            <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue">
                            <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>
                            </button>
                         </div>
                      </li>
                   </ul>
                   <dialog class="qq-alert-dialog-selector">
                      <div class="qq-dialog-message-selector"></div>
                      <div class="qq-dialog-buttons">
                         <button type="button" class="qq-cancel-button-selector">Fechar</button>
                      </div>
                   </dialog>
                   <dialog class="qq-confirm-dialog-selector">
                      <div class="qq-dialog-message-selector"></div>
                      <div class="qq-dialog-buttons">
                         <button type="button" class="qq-cancel-button-selector">Não</button>
                         <button type="button" class="qq-ok-button-selector">Sim</button>
                      </div>
                   </dialog>
                   <dialog class="qq-prompt-dialog-selector">
                      <div class="qq-dialog-message-selector"></div>
                      <input type="text">
                      <div class="qq-dialog-buttons">
                         <button type="button" class="qq-cancel-button-selector">Cancelar</button>
                         <button type="button" class="qq-ok-button-selector">Ok</button>
                      </div>
                   </dialog>
                </div>
    </script>
        
        <script>


        
var galleryUploader = null;
    var g_arrayMensagemRapida = [];
    var g_arrayMensagemRapidaFile = [];
            var idUser = localStorage.getItem('idUser');
            var idUsuarioRecebe = idUser;

            var idFerramenta = 12;

            var idFerramentaTipo = 0;
            
            var fileNameUp = "";
            var tamanho = 0;

            idFerramentaTipo = 35;

            var length = 0 ;
            var name = "";

            var idalbum = 0 ;

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

                galleryUploader = new qq.FineUploader({
                element: document.getElementById("fine-uploader-gallery"),
                template: 'qq-template-gallery',
                autoUpload: true,
                request: {
                    endpoint: '/ava/Mural/Home/UploadFile',
                    customHeaders: {
                        "idUsuarioRecebe": idUsuarioRecebe, 
                        "idFerramenta": idalbum, 
                        "idFerramentaTipo": idFerramentaTipo,
                        "idRetorno": 1
                    }
                },
                thumbnails: {
                    placeholders: {
                        waitingPath: '/source/placeholders/waiting-generic.png',
                        notAvailablePath: '/source/placeholders/not_available-generic.png'
                    }
                },
                validation: {
                    allowedExtensions: ['jpeg', 'jpg', 'gif', 'png','ppt', 'pptx', 'odp', 'xls', 'xlsx', 'ods', 'doc', 'docx', 'txt', 'pdf', 'odt', 'rtf', 'pub']
                },
                deleteFile: {
                    enabled: true,
                    forceConfirm: true,
                    endpoint: '/AVA/Mural/Home/ExcluirFile'
                },
                callbacks:{
                    onValidate: function(data, element){
                        name =   data.name ;
                        length = data.size;
                        
                    },
                    onComplete: function (id, fileName, responseJSON) {

                        this.setUuid(id,responseJSON.idArquivo);

                        var g_mensagemRapida = {
                            "bolPaisagem":false,
                            "bolRetrato":false,
                            "idArquivo":0,
                            "thumbnail":"",
                            "arquivo":"",
                            "nome": "",
                            "descricao": "",
                            "diretorio": "",
                            "extensao": "",
                            "altura": 0,
                            "largura": 0,
                            "idPosition":0
                        };   

                        if(responseJSON.tipo == 1){

                                if(responseJSON.idArquivo > 0)
                                {

                                    g_mensagemRapida.bolPaisagem = responseJSON.bolPaisagem;
                                    g_mensagemRapida.bolRetrato = responseJSON.bolRetrato;
                                    g_mensagemRapida.idArquivo = responseJSON.idArquivo;
                                    g_mensagemRapida.thumbnail = responseJSON.thumbnail;
                                    g_mensagemRapida.arquivo = responseJSON.arquivo;
                                    g_mensagemRapida.nome  = responseJSON.nome;
                                    g_mensagemRapida.descricao =  responseJSON.descricao;
                                    g_mensagemRapida.diretorio =  responseJSON.diretorio;
                                    g_mensagemRapida.extensao = responseJSON.extensao;
                                    g_mensagemRapida.altura = responseJSON.altura;
                                    g_mensagemRapida.largura = responseJSON.largura;
                                    g_mensagemRapida.idPosition = id;
                                    
                                }

                                if( g_mensagemRapida.idArquivo > 0 ){
                                    g_arrayMensagemRapida.push(g_mensagemRapida);
                                    console.log(JSON.stringify( g_arrayMensagemRapida));
                                }
                        }

                        if(responseJSON.tipo == 3 || responseJSON.tipo == 0  ){


                            var g_mensagemRapidaFile ={
                                    "idArquivo":0,
                                    "arquivo":"",
                                    "nome":"",
                                    "descricao":"",
                                    "diretorio":"",
                                    "extensao":"",
                                    "idPosition":0
                            }

                            if(responseJSON.idArquivo > 0)
                            {

                                g_mensagemRapidaFile.idArquivo = responseJSON.idArquivo;
                                g_mensagemRapidaFile.arquivo = responseJSON.arquivo;
                                g_mensagemRapidaFile.nome  = responseJSON.nome;
                                g_mensagemRapidaFile.descricao =  responseJSON.descricao;
                                g_mensagemRapidaFile.diretorio =  responseJSON.diretorio;
                                g_mensagemRapidaFile.extensao = responseJSON.extensao;
                                g_mensagemRapidaFile.idPosition = id;
                                
                                
                            }

                            if( g_mensagemRapidaFile.idArquivo > 0 ){
                                g_arrayMensagemRapidaFile.push(g_mensagemRapidaFile);
                                console.log(JSON.stringify( g_arrayMensagemRapidaFile));
                            }
                        }

                        


                            if (responseJSON.extensao == ".jpeg" || responseJSON.extensao == ".jpg" || responseJSON.extensao == ".gif" || responseJSON.extensao == ".png") {

                                var idClasse = document.getElementsByClassName("tipoArquivo_fineUpload");
                                var thumbImagem = document.getElementsByClassName("qq-thumbnail-selector");
                                var tamanhoValor = document.getElementsByClassName("tipoArquivo_fineUpload").length;
                                var posicaoIcone = tamanhoValor - 1;
                                idClasse[posicaoIcone].style.display = "none";
                                thumbImagem[posicaoIcone].style.visibility="visible";
                                console.log("oiii");

                            } else {
                                var idClasse = document.getElementsByClassName("tipoArquivo_fineUpload");
                                var thumbImagem = document.getElementsByClassName("qq-thumbnail-selector");
                                var tamanhoValor = document.getElementsByClassName("tipoArquivo_fineUpload").length;
                                var posicaoIcone = tamanhoValor - 1;
                                console.log(posicaoIcone);
                                var node = document.createElement("SPAN");
                                var textnode = document.createTextNode(responseJSON.extensao);
                                node.appendChild(textnode);
                                idClasse[posicaoIcone].appendChild(node);
                                idClasse[posicaoIcone].style.display = "block";
                                thumbImagem[posicaoIcone].style.display="none";

                            }


                            



                    }
                    ,
                    onDeleteComplete: function(id, xhr, isError){
                        
                                
                                if(g_arrayMensagemRapidaFile.length > 0){
                                            

                                    $.each( g_arrayMensagemRapidaFile, function(  index, item  ){
                                        
                                        if(item.idPosition == id){

                                            console.log('Dentro if file');
                                            
                                            g_arrayMensagemRapidaFile.splice(index,1);

                                            console.log(JSON.stringify( g_arrayMensagemRapidaFile));
                                            
                                        }

                                    });

                                

                                }

                                if(g_arrayMensagemRapida.length > 0){
                                    

                                    $.each( g_arrayMensagemRapida, function(  index, item  ){
                                        
                                        if(item.idPosition == id){

                                            console.log('Dentro if img');
                                            
                                            g_arrayMensagemRapida.splice(index,1);

                                            console.log(JSON.stringify( g_arrayMensagemRapida));
                                            
                                        }

                                    });

                                   

                                }
                    }
                }
            }
            );



                    } else {
                        console.log(data.msg);
                        
                    }
                },
                error: function (data) {
                    
                }
            });

            
            </script>
        

                <%
                if (Model.bolVisitanteEducador)
                {
                    %>
                    <div class="mensagem_multimidia" style="display: block !important">
                        <ul class="right">
                        <%
                        if (bolConfigImagem)
                        { //if configuração imagem
                        %>
                            <li class="multimidia_imagens">
                                <a href="javascript:void(0);"><span class="FontAwesome"></span> Imagens</a>
                            </li>
                            <%
                        }
                        if (bolConfigVideo)
                        { 
                        %>
                            <li class="multimidia_video">
                                <a href="javascript:void(0);"><span class="FontAwesome"></span> Vídeo</a>
                            </li>
                             <%
                        }
                        if (bolConfigFile)
                        {
                            %>
                            <li class="multimidia_documentos">
                                <a href="javascript:void(0);"><span class="FontAwesome"></span> Arquivos</a>
                            </li>
                        <%
                        }
                         %>
                            
                        </ul>
                    </div>

                    <div id="previewImagemDigaLaPerfil" class="preview_img_post preview_anx_post" style="display:none; width: 400px; height: 550px; overflow: hidden;">
                        <iframe name="Upload_perfil" id="Upload_frame_perfil" style="width: 100%; height: 100%; border:0;">
                        </iframe>
                    </div>

                    <%
                        if (bolConfigVideo)
                        { 
                        %>
                        <div class="enviar_video" style="display: none;">
                            <span class="FontAwesome"></span>
                            <input type="text" placeholder="Cole aqui a url do ví­deo do YouTube ou Vimeo" id="txtLinkVideoMensagem"/>
                        </div>
                        <div class="errovideo" style="display: none">A URL inserida acima é inválida ou não existe.</div>
                        <div class="verificavideo" style="display: none">Verificando URL...</div>
                        <input type="hidden" value="" id="urlVideoOriginal" />
                        <%
                        }
                }
                %>
                <div class="clearfix"></div>
                <div id="seletorMuralDigaLa" style="display: none;"></div>
                <div class="clearfix"></div>
                <div class="sep_digala" style="display:none;">                    
                    <div class="botoes <%= perfilPublico ? "perfil_publico" : "" %> right">
                        <a href="javascript:void(0);" class="btn_cinza disable" id="btnCancelarFerramentaMural" style="display:none;" >Cancelar</a>
                        <input type="button" name="compartilhar" id="compartilhar" value="Compartilhar" class="disable btn_cor" style="display:none;" /> 
                    </div>
                    <div class="clearfix"></div> 	
                </div>
        </section>
    </form>
<%}
%>