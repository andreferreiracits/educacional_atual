<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Mural.Models.MainPerfilPrivado>" %>

<%

    int idAlbum = (int) ViewData["idAlbum"];
    int idArquivoMultimidia = (int)ViewData["idArquivoMultimidia"];
    bool bolConfigImagem = (bool)ViewData["bolConfigImagem"];
    bool bolConfigVideo = (bool)ViewData["bolConfigVideo"];
    bool bolConfigFile = (bool)ViewData["bolConfigFile"];

    bool bolCPPuro = (bool)Session["bolCPPuro"]; 
    
 %>

<script type="text/javascript">

    

    var g_arrayMensagemRapida = [];
    var g_arrayMensagemRapidaFile = [];
    var caracterPermitido = /[^a-z-A-Z-0-9- ]/gi;
    

    var g_idArquivoMultimidia = "<%=idArquivoMultimidia%>";

    var arrayUsuariosAux = new Array();
    var arrayGrupoAux = new Array();
    var timeout = null;
    var strRetornoHtmlUpload = "";
    //var arrayArquivosUpload;

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
    var passouAgendar = 0;
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
                $('.verificavideo').hide();
            } else {
                if (timeout !== undefined && timeout != null) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(function () {
                    montaPreviewVideoMensagem($("#txtLinkVideoMensagem").val());
                }, 1000);
            }
        });

        $("#txtLinkVideoMensagem").keyup(function () {
            $('.verificavideo').hide();

            if ($(this).val().length == 0) {

                if ($('#txtInput').val().trim() != "") {
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
            // <!-- abreUploadFileTimeLine(); -->
        });
        
        $("body").on("click", ".caixa_dialogo .preview_post.arquivos .remover_multimidia", function (e) {
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
                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val().trim() == "") {
                    $("#compartilhar").addClass("disable").prop("disabled", true);

                    $(".caixa_dialogo .preview_post.arquivos").hide();
                    //$("#compartilhar").addClass("disable").prop("disabled", true);
                    $("#compartilhar").hide();
                    $("#btnCancelarFerramentaMural").hide();
                    $(".bloco_dialogo .mensagem_multimidia").show();
                    $("#seletorMuralDigaLa").hide();
                    $('.sep_digala').hide();
                    $("txtLinkVideoMensagem").hide();
                }
                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val().trim() !== "") {
                    $(".bloco_dialogo .mensagem_multimidia").show();
                    $(".caixa_dialogo .preview_post.arquivos").hide();
                    $("#btnCancelarFerramentaMural").show();
                    $("#seletorMuralDigaLa").show();
                    $('.sep_digala').show();
                }
            }

            $(".caixa_dialogo .preview_post.arquivos").mCustomScrollbar("update");
        });
        /*.on(tpClickMuralPerfil, ".caixa_dialogo .preview_post.arquivos .adicionar_doc", function (e) {
        e.preventDefault();
        <!-- abreUploadFileTimeLine(); -->
        });*/
        //$(".bloco_dialogo .bloco_dialogo_multimidia .multimidia_documentos").mCustomScrollbar();
        $(".bloco_dialogo .bloco_dialogo_multimidia .multimidia_documentos").click(function (e) {
            e.preventDefault();
            //  abreUploadFileTimeLine(); 
        });
        /** ARQUIVO TIMELINE **/

        /*** IMAGEM TIMELINE ****/

        $("body").on("click", ".bloco_dialogo .preview_img_post .opcao_excluir", function (e) {

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
                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val().trim() == "") {
                    $("#compartilhar").addClass("disable").prop("disabled", true);
                    //$("#btnCancelarFerramentaMural").addClass("disable").prop("disabled", true);

                    $(".bloco_dialogo .caixa_dialogo .preview_post.imagens").hide();
                    $(".caixa_dialogo .preview_post.imagens").hide();
                    //$("#compartilhar").addClass("disable").prop("disabled", true);
                    $("#compartilhar").hide();
                    $("#btnCancelarFerramentaMural").hide();
                    $(".bloco_dialogo .mensagem_multimidia").show();
                    $("#seletorMuralDigaLa").hide();
                    $('.sep_digala').hide();
                }
                if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val().trim() !== "") {
                    $(".bloco_dialogo .mensagem_multimidia").show();
                    $(".bloco_dialogo .caixa_dialogo .preview_post.imagens").hide();
                    $("#btnCancelarFerramentaMural").show();
                    $("#seletorMuralDigaLa").show();
                    $('.sep_digala').show();
                }
            }


            $(".caixa_dialogo .preview_post.imagens .engloba_classe").mCustomScrollbar("update");

        })
        .on(tpClickMuralPerfil, ".mensagem_multimidia .multimidia_imagens .multimidia_imagens_novo", function (e) {
            e.preventDefault();
            abreUploadImagemTimeLine();
        })
        .on(tpClickMuralPerfil, ".mensagem_multimidia .multimidia_video", function (e) {
            e.preventDefault();
            $(this).closest(".mensagem_multimidia").hide();
            if (!$(".enviar_video").is(":visible")) {
                $(this).closest(".mensagem_multimidia").hide();
                $(".enviar_video").show();

                $("#seletorMuralDigaLa").show();
                $('.sep_digala').fadeIn("fast");
                preparaAvaSelector();

                $('#compartilhar').show();
                //$("#compartilhar").addClass("disable").prop("disabled", true);
                $("#btnCancelarFerramentaMural").show();
                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
            }

        })
        .on(tpClickMuralPerfil, "#btnCancelarFerramentaMural", function (e) {
            e.preventDefault();
            
            if ($(".bloco_dialogo .caixa_dialogo .preview_post.imagens").is(":visible")) {
                limpaPreviewImagemMensagemRapida();
                limpaArrayImagensTimeLine();

                $(".bloco_dialogo .caixa_dialogo .preview_post.imagens").hide();
            }
            else if ($(".enviar_video").is(":visible") || $(".bloco_dialogo .caixa_dialogo .preview_post.video").is(":visible")) {
                $(".enviar_video").hide();
                removerPreviewVideoMensagem(true);
                $("#btnCancelarFerramentaMural").hide();

                $("#erro_enviar_video").hide();
            }
            else if ($(".bloco_dialogo .caixa_dialogo .preview_post.arquivos").is(":visible")) {

                limpaPreviewArquivosMensagemRapida();
                limpaArrayArquivosTimeLine();

                $(".bloco_dialogo .caixa_dialogo .preview_post.arquivos").hide();
            }
            else if ($("#previewArquivosDigaLa").is(":visible")) {

                limpaArrayArquivosTimeLine();
                limpaPreviewArquivosDigaLa();

                $("#previewArquivosDigaLa").hide();
                $("#compartilhar").hide();
                $("#seletorMuralDigaLa").hide();
            }

            $("#compartilhar").addClass("disable").prop("disabled", true);
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

        $(".caixa_dialogo .preview_post.imagens .engloba_classe").mCustomScrollbar({
            horizontalScroll: true,
            advanced: {
                autoExpandHorizontalScroll: true
            }
        });

        $(".caixa_dialogo .preview_img_post .adicionar .opcao_adicionar").click(function (e) {
            e.preventDefault();
            // alert("caixa_dialogo");
            abreUploadImagemTimeLineNovo();
        });
    });


    /*** ARQUIVOS TIMELINE ***/

    function montaPreviewFilesMensagemRapida(obj) {

        console.log('teste');

        var $caixa = $(".caixa_dialogo .preview_arq_post .dialog-modal-teste");

        if (obj !== undefined && obj != null && obj.length > 0) {
            for (var i = 0; i < obj.length; i++) {

                var $div2 = $("<div />").addClass("prev_midia arq_prev_temp").data("idarquivo", obj[i].idArquivo);
                var $divv = $("<div />").addClass("bloco_arq");
                var $div3 = $("<div />").addClass("tipo_arquivo");
                var $span = $("<span />").text(obj[i].extensao.substring(1, obj[i].extensao.length));
                var $p = $("<p />").html((obj[i].nome == "" ? obj[i].arquivo : obj[i].nome));
                var $a = $("<a />").attr("href", "#").addClass("btn_acao opcao_excluir").text("Remover");


                $div3.append($span);
                $divv.append($div3);
                $divv.append($p);
                $div2.append($divv);
                $div2.append($a);

                $caixa.prepend($div2);

                //$caixa.find(".adicionar").prev().before($div);

                //$caixa.append($div);
                /*if($caixa.find(".prev_imagem:first").hasClass("adicionar")){
                $caixa.prepend($div);
                } else {
                $caixa.find(".prev_imagem").not(".adicionar").last().after($div);
                }*/

            }
            //$(".engloba_classe").css("width", ((obj.length + 1) * 109));
            //$(".caixa_dialogo .preview_arq_post ").mCustomScrollbar("update");
        } s
    }

    function limpaPreviewArquivosMensagemRapida() {
        $(".caixa_dialogo .preview_post.arquivos .prev_documento").parent().remove();
    }

    function limpaPreviewArquivosDigaLa() {
        $("#previewArquivosDigaLa").empty();
    }

    function limpaArrayArquivosTimeLine() {
        if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
            objetoArquivos.arquivos.splice(0, objetoArquivos.arquivos.length);
        }
    }

    function abreUploadFileTimeLine() {
        var flagContinua = true;
        var idArquivoMultimidia = parseInt($(".bloco_dialogo .caixa_dialogo .preview_post.arquivos").data("idarquivomultimidia"));
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
        if (parseInt(jsonRetorno.idFerramentaTipo) == 15) {
            if ($('#boxMaterialApoioTarefa .the_insertedLink a.exclui_arquivo[idarquivo=' + jsonRetorno.idArquivo + ']').length) {
                $('#boxMaterialApoioTarefa .the_insertedLink a.exclui_arquivo[idarquivo=' + jsonRetorno.idArquivo + ']').parent().remove();
                if (arrayArquivosUpload != null) {
                    var auxFiles = [];
                    for (var a in arrayArquivosUpload.arrayArquivo) {
                        if (arrayArquivosUpload.arrayArquivo[a].id != jsonRetorno.idArquivo) {
                            auxFiles.push(arrayArquivosUpload.arrayArquivo[a]);
                        }
                    }
                    arrayArquivosUpload.arrayArquivo = auxFiles;
                    if (auxFiles.length == 0) {
                        $('#boxMaterialApoioTarefa').remove();
                    }
                    auxFiles = [];
                }
            }
        } else if (parseInt(jsonRetorno.idFerramentaTipo) == idFerramentaTipoTimeLine) {
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
                    if ($(".bloco_dialogo .caixa_dialogo .preview_post.imagens").is(":visible")) {
                        $(".bloco_dialogo .caixa_dialogo .preview_post.imagens").hide();

                    }
                    if (!$(".mensagem_multimidia").is(":visible")) {
                        $(".mensagem_multimidia").show();
                        if ($("#txtInput").val().trim() == "") {
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
                    if ($(".bloco_dialogo .caixa_dialogo .preview_post.arquivos").is(":visible")) {
                        $(".bloco_dialogo .caixa_dialogo .preview_post.arquivos").hide();

                    }
                    if (!$(".mensagem_multimidia").is(":visible")) {
                        $(".mensagem_multimidia").show();
                        if ($("#txtInput").val().trim() == "") {
                            $("#compartilhar").addClass("disable").prop("disabled", true);
                        }
                    }
                }
            }
        }
    }


    function abreUploadImagemTimeLine() {
        var flagContinua = true;
        var idalbum = parseInt($(".bloco_dialogo .caixa_dialogo .preview_post.imagens").data("idalbum"));
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

    function limpaPreviewImagemMensagemRapida() {
        $(".caixa_dialogo .preview_post.imagens .engloba_classe .prev_imagem").not(".adicionar").remove();
    }

    function limpaArrayImagensTimeLine() {
        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
            objetoImagens.imagens.splice(0, objetoImagens.imagens.length);
        }
    }


    function abreUploadImagemTimeLine() {

        console.log('Aqui');

        var flagContinua = true;
        var idalbum = parseInt($(".bloco_dialogo .caixa_dialogo .preview_post.imagens").data("idalbum"));
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
	
	
	
	
	
	
	
	
	
	
    function abreUploadImagemTimeLineOld() {
        var flagContinua = true;
        var idalbum = parseInt($(".bloco_dialogo .caixa_dialogo .preview_post.imagens").data("idalbum"));
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


    function limpaPreviewImagemMensagemRapida() {
        $(".caixa_dialogo .preview_post.imagens .engloba_classe .prev_imagem").not(".adicionar").remove();
    }

    function limpaArrayImagensTimeLine() {
        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
            objetoImagens.imagens.splice(0, objetoImagens.imagens.length);
        }
    }

    function montaPreviewImagemMensagemRapida(obj) {



        var $caixa = $(".caixa_dialogo .preview_post.imagens .engloba_classe .mCSB_container");

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
            $(".caixa_dialogo .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
        }

    }

    /******* TIMELINE IMAGEM *********/

    function concluirAgendamentoTarefaRapidaMural() {
        console.log("concluirAgendamentoTarefaRapidaMural ***** ");
        var listaGrupo = [];

        var idTurmas = [];
        if (arrayGrupoAux.length > 0){
            for(var i = 0; i < arrayGrupoAux[0].usuarios.length; i++){   
                var objeto = {};
                objeto.idTurma =  arrayGrupoAux[0].usuarios[i].idTurma;        
                objeto.idGrupo =  arrayGrupoAux[0].usuarios[i].idGrupo;
                listaGrupo.push(objeto);
                var idTurma = arrayGrupoAux[0].usuarios[i].idTurma;
                idTurmas.push(idTurma);                
            }
        }

        console.log("===================================" + JSON.stringify(listaGrupo))
        var dataInicio = $("#dataInicio").val();
        var dataFim = $("#dataFim").val();
        var horaInicio = $("#horaInicio").val();
        var horaFim = $("#horaFim").val();
        var idCaminho = $("#idCaminho").val();

        $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");

        var txtDisponivel = " Disponí­vel de " + dataInicio + " " + horaInicio + " até " + dataFim + " " + horaFim;
        var txtTitulo = $(".nome_tarefa").text();
        var strComplemento = $("#strComplementoRapido").text();

        txtTitulo = $("<div />").text(txtTitulo).html();
        //txtDescricaoTarefa = $("<div />").text(txtDescricaoTarefa).html();

        if (strComplemento == "")
            var txtInput = txtTitulo + txtDisponivel;
        else
            var txtInput = strComplemento + "<br> " + txtTitulo +". "+ txtDisponivel;

        $("#txtInput").val(txtInput);

        console.log("======txtInput============== "+ txtInput);

        //var json = montaJSON($(".compartilhamento"));

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
                        //jsonAgendamento: json,
                        usuario: JSON.stringify(arrayUsuariosAux),
                        grupo: JSON.stringify(arrayGrupoAux),
                        strUsuariosDestino: vetDestino[0],
                        strTurmasDestino: vetDestino[1]
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (idRotaAgendamentoAux) {                        

                        strMensagemErroAgendamento = idRotaAgendamentoAux;

                        if (isNumeric(idRotaAgendamentoAux)) { //verifica se não deu erro no agendamento
                            salvarMensagemRapida(arrayUsuariosAux, arrayGrupoAux, 17, idRotaAgendamentoAux, $("#idEtapa").val(), txtInput);

                           
                            $("#seletorMuralTarefa").AvaSelector("limparUsuarios");
                            abrirCriarTarefa(); 

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
                            Command: toastr["success"]("Seus alunos já podem visualizar esta tarefa.", "Tarefa publicada com sucesso!")
                            
                            for(var i = 0; i < listaGrupo.length; i++){
                                var turmaId = listaGrupo[i].idTurma;
                                var grupoId = listaGrupo[i].idGrupo;

                                console.log("  ===========  idTurma = " + idTurma);
                                var idEtapa = etapas[i];
                                    var idCaminho = idCaminhos[i];
                                    console.log("idTurma " + turmaId);  
                                    console.log("grupoId *************** " + grupoId);
                                    concluirAgendamentoTurma(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtInput, grupoId, idEtapa);             
                                
                            }

                            arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                            arrayGrupoAux.splice(0, arrayGrupoAux.length);

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
                }); //ajax inseriragendamento
            
                
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao montar destino de agendamento!");
                }
            }
        });         //ajax monta destino

    }

    ///INICIO INSERIAGENDAMENTOGRUPO
    function concluirAgendamentoTurma(dataInicio, dataFim, horaInicio, horaFim, idCaminho, strComplementoRapido, idGrupo, idEtapa) {
              
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
            data: {
                idRotaAgendamento: 0,
                idCaminho: idCaminho,
                idGrupo: idGrupo,
                dataInicio: dataInicio,
                horaInicio: horaInicio,
                dataFim: dataFim,
                horaFim: horaFim,
                strComplemento: strComplementoRapido
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(response) {
                var retorno = response.split("|");
                console.log("======================== salvarMensagemRapidaTurma ");
                salvarMensagemRapidaTurma(retorno[1], idGrupo, 17, retorno[0], idEtapa, strComplementoRapido);              
                
            },
            error: function(a) {
                0 != a.status && console.debug("erro ao inserir agendamento!")
            }
        })
    }

    function salvarMensagemRapidaTurma(strUsuarios, idGrupo, idFerramentaTipo, idFerramenta, idEtapa, strMensagem) {
    
        $.ajax({
            type: "POST",
            url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
            data: {
                strUsuarios: strUsuarios,
                idGrupo: idGrupo,
                idFerramentaTipo: idFerramentaTipo,
                idFerramenta: idFerramenta,
                idEtapa: idEtapa,
                strMensagem: strMensagem
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            // success: function(d){
            //     console.log(d);
            // },
            success: function() {
                console.log("tarefa criada com sucesso na turma =======================");
            },
            error: function(a) {
                0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
            }
        })
    }


    function isNumeric(str) {
        var er = /^[0-9]+$/;
        return (er.test(str));
    }

    function salvarMensagemRapida(usuario, grupo, idFerramentaTipo, idFerramenta, idEtapa, strMensagem) {

        var urlPagina = document.location.href.toLowerCase();
        var indexOfUrl = urlPagina.indexOf('/ava/mural');
        console.log("urlPagina = " + urlPagina);
        if (indexOfUrl > 0) {
            salvarMensagemRapidaTarefaRapida(usuario, grupo, idFerramentaTipo, idFerramenta, idEtapa, strMensagem);
        }
        else
		{
		
			$.ajax({
				type: "POST",
				url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
				data: {
					//destino: json,
					usuario: JSON.stringify(usuario),
					grupo: JSON.stringify(grupo),
					idFerramentaTipo: idFerramentaTipo,
					idFerramenta: idFerramenta,
					idEtapa: idEtapa,
					strMensagem: strMensagem
				},
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				success: function (idMensagemRapida) {

					$.ajax({
						type: "POST",
						url: "/AVA/Mural/Home/RetornaFeedUser",
						data: {
							idMensagemRapida: idMensagemRapida
						},
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						success: function (data) {
							var timelineFiltroValueH = $('#hTipoDePostMural').val();
							$.fancybox.close();
							$('#txtInput').val("");
							$('#txtInput').css("height", "48px");
							$('#txtInput').siblings(":last").html('');
							$('.actions[pos=1]').click();

							if (timelineFiltroValueH == 0 || timelineFiltroValueH == 1 || timelineFiltroValueH == 2) {
								$('#ava_fluxoarticles').prepend(data).find('article:first').addClass('highlight').slideDown(1000);
								$('#ava_fluxoarticles article:first .compartilhado').html({
									urlAjax: '/AVA/Seletor/Home/destinoPost',
									style: { classes: 'tooltip_compartilhamento' },
									position: {
										my: 'bottom left', // Position my top left...
										at: 'top center', // at the bottom right of...
										adjust: {
											y: 0
										}
									}
								});
							} else {
								//Recarrega mural
								$('#hTipoDePostMural').val(0);
								$('#ava_fluxoarticles').html('');
								$('#cbTipoDePostMural input[type=checkbox]').removeAttr("checked");
								$('#cbTipoDePostMural li[filtrotipo=0] input[type=checkbox]').attr("checked", "checked");
								var txtTextoMural = 'Todos os posts <span class="caret">';
								$('#txtTipoDePostMural').html(txtTextoMural);
								$('#loader_timeline').fadeIn("fast", function () {
									carregaTimeLine(1);
								});
							}
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
    }

    function validaAgendamento(dataInicio, dataFim, horaInicio, horaFim) {
        console.log("validaAgendamento Mural/Views/TES/Home/Partials/MensagemRapidaNovaHome.ascx");

        var strMensagem = "ok";

        if (dataInicio == "") {
            $("#dataInicio").addClass("ava_field_alert");
            strMensagem = "erro";
        } else if (dataFim == "") {
            $("#dataFim").addClass("ava_field_alert");
            strMensagem = "erro";
        } else if (horaInicio == "") {
            $("#horaInicio").addClass("ava_field_alert");
            strMensagem = "erro";
        } else if (horaFim == "") {
            $("#horaFim").addClass("ava_field_alert");
            strMensagem = "erro";
        } else {

            var dtmInicio = dataInicio.split('/');
            var dtmInicioAux = dtmInicio[2] + dtmInicio[1] + dtmInicio[0];
            var dtmFim = dataFim.split('/');
            var dtmFimAux = dtmFim[2] + dtmFim[1] + dtmFim[0];

            var horaInicio = horaInicio.split(':');
            var horaInicioAux = horaInicio[0] + horaInicio[1];
            var horaFim = horaFim.split('/');
            var horaFimAux = horaFim[0] + horaFim[1];

            var dtmAtual = $("#dtmAtualServidor").val().split(" ");
            var dataAtual = dtmAtual[0].split("/");
            var horaAtual = dtmAtual[1].split(":");

            var dataAtualAux = dataAtual[2] + dataAtual[1] + dataAtual[0];
            var horaAtualAux = horaAtual[0] + horaAtual[1];

            if (dtmInicioAux > dtmFimAux) {
                strMensagem = "Data inicial tem que ser menor que Data final.";
            } else if (dtmInicioAux == dataAtualAux) {
                if (horaInicioAux <= horaAtualAux) {
                    strMensagem = "Hora inicial tem que ser maior que a hora atual.";
                }
                if (dtmInicioAux == dtmFimAux) {
                    if (horaInicioAux >= horaFimAux) {
                        strMensagem = "Hora inicial tem que ser menor que Hora final.";
                    }
                }
            } else if (dtmInicioAux < dataAtualAux) {
                strMensagem = "Data inicial tem que ser maior que a Data atual.";
            } else {
                if (dtmInicioAux == dtmFimAux) {
                    if (horaInicioAux >= horaFimAux) {
                        strMensagem = "Hora inicial tem que ser menor que Hora final.";
                    }
                }
            }
        }

        return strMensagem;

    }

    function abrirMidiaTarefa() {
        $('#boxLinkTarefa,#boxMidiaTarefa').remove();

        var strHTML = '<div id="boxMidiaTarefa" class="atividades_insert inserir_midia bgcolor1" style="display:none">' +
            	      '  <input type="text" name="dialogo" placeholder="Insira o endereço URL" class="ipt_midia ph">' +
            	      '  <a href="javascript:void(0);" onclick="inserirMidiaTarefa()" class="ne-salvar medium awesome awesome-green">Inserir</a>' +
                      '  <span class="discreto">Digite ou cole uma URL de vídeo YouTube, Vimeo ou Globo.</span>' +
                      '</div>'

        $('#container_empilhaextras').prepend(strHTML);
        $('#boxMidiaTarefa').slideDown('slow');
        $("#boxMidiaTarefa").find("input").focus(function () {
            $(this).removeClass("ava_field_alert");
        })
        $("#boxMidiaTarefa").css("margin", "0px 0px 0px 0");
    }

    function excluirMidiaTarefa() {
        var idEtapa = $("#idEtapa").val();

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirMidiaEtapa/" + idEtapa,
            success: function (data) {
                $("#boxPreviewMidiaTarefa").slideUp("slow", function () {
                    $("#boxPreviewMidiaTarefa").hide();
                    $("#inserirMidiaTarefa").removeClass("disable");
                    $("#inserirMidiaTarefa").attr("onclick", "abrirMidiaTarefa()");
                });

            },
            error: function (data) {
                if (data.status != 0) {
                    $("#boxPreviewMidiaTarefa").prepend("erro ao excluir mídia da tarefa!")
                }
            }
        });

    }

    function validarURLVideo(texto) {
        var strRetorno = "";
        var sel = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        var ver = sel.exec(texto);

        if (texto == "") {
            $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
            return false;
        } else {
            if (!ver || strTipoVideo == "") {
                mostraAlertaTarefa("URL inserida não é válida.");
                $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
                return false;
            } else {

                if (texto.indexOf("//youtu") > 0) { //é youtube encurtado
                    strRetorno = "youtubeEncurtado";
                } else if (texto.indexOf("youtube.com/watch?v=") > 0) { //é youtube normal
                    strRetorno = "youtube";
                } else if (texto.indexOf("youtube.com/v/") > 0) { //é youtube normal
                    strRetorno = "youtube";
                } else if (texto.indexOf("vimeo.com/") > 0) {
                    strRetorno = "vimeo";
                } else if (texto.indexOf("video.globo.com/") > 0) {
                    if (texto.indexOf("GIM") > 0) {
                        strRetorno = "globo";
                    } else {
                        mostraAlertaTarefa("URL da globo falta o parâmetro ID.");
                        return false;
                    }
                } else if (texto.indexOf("globotv.globo.com/") > 0) {
                    var quebraBarra = texto.split("/");
                    var confirmaIdVideo;

                    if (texto.substring(texto.length - 1, texto.length) == "/") {
                        confirmaIdVideo = 2;
                    } else {
                        confirmaIdVideo = 1;
                    }

                    if (!isNaN(quebraBarra[quebraBarra.length - confirmaIdVideo])) {
                        strRetorno = "globo";
                    } else {
                        mostraAlertaTarefa("URL da globo falta o parâmetro ID.");
                        return false;
                    }
                } else {
                    mostraAlertaTarefa("URL inserida não é válida.");
                    return false;
                }
            }
        }
        return strRetorno;
    }


    lightBoxAVA($("#btEscondidoTarefa"), {
        autoSize: false,
        width: 400,
        height: 100,
        type: "ajax",
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        afterShow: function () {
            EscondeOsObjects();
            $("#fecharLightBox").click(function () {
                //$("#fancybox-close").click();
                $.fancybox.close();

            });

        }, //function
        beforeClose: function () {
            MostraOsObjects();
        }
    });

    function mostraAlertaTarefa(strMensagem) {
        $("#btEscondidoTarefa").attr('href', '/ava/caminhos/home/Alert/?strMensagem=' + escape(strMensagem));

        $("#btEscondidoTarefa").click();
    }

    function abrirLinkTarefa() {
        $('#boxLinkTarefa,#boxMidiaTarefa').remove();

        var strHTML = '<div id="boxLinkTarefa" class="atividades_insert inserir_link bgcolor1" style="display:none">' +
                      '    <input type="text" id="strTituloLink" name="dialogo" placeholder="Título do Link" class="ipt_link ph">' +
                      '    <input type="text" id="strLinkApoio" name="dialogo" placeholder="Insira a URL" class="ipt_link ph">' +
                      '    <a style="cursor: pointer" onclick="inserirLinkTarefa()" class="ne-salvar medium awesome awesome-green">Inserir</a>' +
                      '</div>'

        $('#container_empilhaextras').prepend(strHTML);

        $('#strTituloLink').addPlaceholder();
        $('#strLinkApoio').addPlaceholder();

        $('#boxLinkTarefa').slideDown('slow', function () {
            $("#strTituloLink,#strLinkApoio").focus(function () {
                $(this).removeClass("ava_field_alert");
                $("#strTituloLink").limit('100', '');
            })
        });
        $(".inserir_link .ipt_link").css("width", "200px");
        $("#boxLinkTarefa").css("margin", "0px 0px 0px 0");

    }

    function removerLinkApoio(idRecursoLink) {

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirLinkApoio/",
            data: { idLink: idRecursoLink },
            success: function (data) {
                retornaLinksApoio($("#idRecursoEtapa").val())
            },
            error: function (data) {
                if (data.status == 0) {
                    $(".container_inlinks").empty();
                } else {
                    $(".container_inlinks").html("erro ao excluir link.")
                }
            }
        });
    }

    function retornaLinksApoio(idRecursoEtapa) {

        $("#container_empilhaextras").find("#boxPreviewLinksTarefa").html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SelecionarLinksEtapa/",
            data: { idRecursoEtapa: idRecursoEtapa },
            success: function (data) {
                $("#container_empilhaextras").find("#boxPreviewLinksTarefa").remove();
                if (typeof (data) != "object") {
                    $("#container_empilhaextras").prepend(
                                                        '<div class="atividades_insert inserir_link" id="boxPreviewLinksTarefa" style="display:none">' + data + '</div>'
                                                     );
                }
                $("#boxPreviewLinksTarefa").slideDown("slow", function () {
                    $("#boxLinkTarefa").remove();
                });
            },
            error: function (data) {
                if (data.status != 0) {
                    $("#container_empilhaextras").prepend("erro ao retornar link da tarefa!")
                }
            }
        });

    }

    function abreListaRecurso() {

        var o = {
            scrolling: 'no',
            autoSize: false,
            width: 730,
            height: 530,
            autoResize: false,
            fitToView: false,
            type: "ajax",
            helpers: {
                overlay: {
                    closeClick: false,
                    locked: false
                }
            },
            autoResize: false,
            href: '/AVA/Caminhos/Home/ListaRecursos',
            afterShow: function () {

                EscondeOsObjects();

                /*$("#fancybox-close").bind("click", function () {
                MostraOsObjects();
                });*/

                $('.cover').mosaic({
                    animation: 'slide',
                    speed: 500,
                    hover_x: '400px'
                });
            },
            beforeClose: function () {
                MostraOsObjects();
                $("html").css({ 'overflow': 'scroll' });
            }, //function
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            }
        };

        $.fancybox(o);
        return false;

    }

    function voltaListaRecursos() {

        strPesquisaGlobal = "";
        tipoGlobal = 1;
        strEstadosGlobal = "2, 3, 5, 6, 8, 10";
        dtmInicioGlobal = "";
        dtmFimGlobal = "";
        idEstadoGlobal = -1;

        $(".fancybox-inner").html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ListaRecursos/",
            success: function (data) {
                $(".fancybox-inner").html(data);
                $('.cover').mosaic({
                    animation: 'slide',
                    speed: 500,
                    hover_x: '400px'
                });
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao retornar recurso escolhido");
                }
            }
        });

    }


    function inserirRecursoRapido(idRecurso, idPublicacao, idAvaliacao) {

        var urlPagina = document.location.href.toLowerCase();
        var indexOfUrl = urlPagina.indexOf('/ava/mural');
        if (indexOfUrl > 0) { 
            inserirRecursoRapidoTarefa(idRecurso, idPublicacao, idAvaliacao);
        }
    }

    function inserirAvaliacaoRapido(idAvaliacao) {
        console.debug('MensagemRapidaNovaHome.ascx -> inserirAvaliacaoRapido -> ln 1433');
        var strTituloTarefa = $("#strTituloTarefa").val();
        var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();

        strTituloTarefa = $("<div />").text(strTituloTarefa).html();
        txtDescricaoTarefa = $("<div />").text(txtDescricaoTarefa).html();

        $("#idAvaliacao").val(idAvaliacao);

        var strMensagem = "";
        var bolPreencheuDados = true;

        if (strTituloTarefa.length > 0 && txtDescricaoTarefa.length > 0) {
            strMensagem = "Título e Descrição serão sobreescritos";
        } else if (strTituloTarefa.length > 0 && txtDescricaoTarefa.length <= 0) {
            strMensagem = "Título será sobreescrito";
        } else if (strTituloTarefa.length <= 0 && txtDescricaoTarefa.length > 0) {
            strMensagem = "Descrição será sobreescrita";
        } else {
            bolPreencheuDados = false;
        }

        if ($("#entrega_tarefa").attr('checked') && bolPreencheuDados) {
            strMensagem += " e a solicitação de entrega será perdida.\nDeseja continuar?";
            bolPreencheuDados = true;
        } else if ($("#entrega_tarefa").attr('checked') && !bolPreencheuDados) {
            strMensagem += "Sua solicitação de entrega será perdida.\nDeseja continuar?";
            bolPreencheuDados = true;
        }

        if (bolPreencheuDados && !$("#entrega_tarefa").attr('checked')) {
            strMensagem += ".\nDeseja continuar?";
        }

        var intValorEtapa = 0;

        if ($('#valeNota').attr('checked') || $('#valeNota').hasClass('ativo')) {
            intValorEtapa = $("#intValorTarefa").val();
        }

        if ($("#previewRecursoRapidoTarefa").length > 0) {
            excluirRecursoRapidoTarefa()
        }

        if (bolPreencheuDados) {

            jConfirm(strMensagem, '', function (confirma) {
                if (confirma) {

                    $(".time_loading").css("display", "block");

                    $.ajax({
                        type: "POST",
                        url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + idAvaliacao,
                        success: function (data) {

                            strTituloTarefa = data.Nome;
                            txtDescricaoTarefa = data.TextoIntrodutorio;
                            intValorEtapa = data.ValorTotal;

                            $("#strTituloTarefa").val(strTituloTarefa);
                            $("#txtDescricaoTarefa").val(txtDescricaoTarefa);
                            $("#intValorTarefa").val(intValorEtapa);

                            $('#valeNota').attr('checked', 'true').addClass('ativo');
                            $('#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa').attr('disabled', 'disabled');
                            $("#solicita_entrega").removeAttr("onclick");
                            $("#solicita_entrega").removeAttr("href");

                            //buscar valor, titulo e descrição da tarefa e retirar entrega de trabalho
                            if ($("#entrega_tarefa").attr('checked')) {
                                $("#entrega_tarefa").removeAttr('checked');
                            }

                            $("#solicita_entrega").find("i").addClass("entrega_icon_vazio");
                            $("#bolSolicitaEntrega").val("0");

                            //salvarRecurso(strTituloTarefa, txtDescricaoTarefa, 2, intValorEtapa, 1, 0, idAvaliacao);
                            salvarCaminhoRecurso(strTituloTarefa, txtDescricaoTarefa, 2, intValorEtapa, 1, 0, idAvaliacao);

                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("erro ao retornar dados da avaliacao.");
                            }
                        }
                    }); //retorna dados avaliacao 


                }
            });     //jConfirm

        } else {

            $(".time_loading").css("display", "block");

            $.ajax({
                type: "POST",
                url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + idAvaliacao,
                success: function (data) {

                    strTituloTarefa = data.Nome;
                    txtDescricaoTarefa = data.TextoIntrodutorio;
                    intValorEtapa = data.ValorTotal;

                    //txtDescricaoTarefa = txtDescricaoTarefa.replace(/<[^>]*>/g, ""); //remove tags html

                    $("#strTituloTarefa").val(strTituloTarefa);
                    $("#txtDescricaoTarefa").val(txtDescricaoTarefa);
                    $("#intValorTarefa").val(intValorEtapa);

                    $('#valeNota').attr('checked', 'true').addClass('ativo');
                    $('#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa').attr('disabled', 'disabled');
                    $("#solicita_entrega").removeAttr("onclick");
                    $("#solicita_entrega").removeAttr("href");

                    //buscar valor, titulo e descrição da tarefa e retirar entrega de trabalho
                    if ($("#entrega_tarefa").attr('checked')) {
                        $("#entrega_tarefa").removeAttr('checked');
                    }

                    $("#solicita_entrega").find("i").addClass("entrega_icon_vazio");
                    $("#bolSolicitaEntrega").val("0");

                    //salvarRecurso(strTituloTarefa, txtDescricaoTarefa, 2, intValorEtapa, 1, 0, idAvaliacao);
                    salvarCaminhoRecurso(strTituloTarefa, txtDescricaoTarefa, 2, intValorEtapa, 1, 0, idAvaliacao);
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao retornar dados da avaliacao.");
                    }
                }
            });  //retorna dados avaliacao            

        }


    }

    function salvarCaminhoRecurso(strTituloTarefa, txtDescricaoTarefa, intTipo, intValor, idRecurso, idPublicacao, idAvaliacao) {

        var idCaminho = $("#idCaminho").val();
        if (idCaminho == "" || idCaminho == undefined) {
            idCaminho = 0;
        }

        var idEtapa = $("#idEtapa").val();
        if (idEtapa == "" || idEtapa == undefined) {
            idEtapa = 0;
        }

        var intStatus = 2;
        $('input:radio[name=rTipo]').each(function () {
            if ($(this).is(':checked'))
                intStatus = parseInt($(this).val());
        });

        $.ajax({
            type: "POST",
            //url: "/AVA/Caminhos/Home/SalvarCaminho/",
            url: "/AVA/Caminhos/Home/SalvarCaminhoRecurso/",
            data: {
                idRota: idCaminho,
                idUsuario: 0,
                strTitulo: strTituloTarefa,
                strDescricao: txtDescricaoTarefa,
                intStatus: intStatus,
                strTags: "",
                intTipo: intTipo
            },
            success: function (idCaminho) {

                $("#idCaminho").val(idCaminho);

                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                    data: {
                        idCaminho: idCaminho,
                        idEtapa: idEtapa,
                        idRecurso: 1,
                        idPublicacao: 0,
                        idAvaliacao: idAvaliacao,
                        strTitulo: strTituloTarefa,
                        strDescricao: txtDescricaoTarefa,
                        intValor: intValor
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (idRecursoEtapa_idEtapa) {

                        var vetAux = idRecursoEtapa_idEtapa.split('_');
                        var idRecursoEtapa = vetAux[0];
                        $("#idEtapa").val(vetAux[1]);

                        $("#recursoRapido").remove();
                        $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif" border="0"/></div>');

                        $.ajax({
                            type: "POST",
                            //url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/",
                            url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapidoNovaHome/",
                            data: {
                                idRecursoEtapa: idRecursoEtapa,
                                idAvaliacao: idAvaliacao
                            },
                            success: function (o) {

                                console.debug("/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/");

                                /*
                                $("#container_empilhaextras #recursoRapido").html(data);
                                $.fancybox.close();
                                $("#abreListaRecursoTarefa").attr({ "href": "javascript:void(0);", "title": "Substituir recurso" });
                                $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso")
                                $(".tooltip").each(function () {
                                    if ($(this).text() === 'Inserir recurso')
                                        $(this).html('Substituir recurso');
                                });*/
                                
                                $("#recursoRapido").css("margin", "0px 0px 0px 0");
                                $('#recursoRapido').find('h5').parent().css("margin", "0px 0px 0px 0");

                                $("#previewAnexosTarefa").append(o);
                                removerClasseAtivo();
                                $("#clickListaRecurso").attr("data-original-title", "Substituir recurso");
                                $.fancybox.close();
                                $(".tooltip").text("Substituir recurso");
                                $("#abreListaRecursoTarefa").attr({
                                    href: "javascript:void(0);",
                                    title: "Substituir recurso"
                                });
                                $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso")

                            },
                            error: function (data) {
                                if (data.status != 0) {
                                    console.debug("erro ao retornar recurso escolhido");
                                }
                            }
                        }); //lista recurso
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao salvar recurso");
                        }
                    }
                }); //inserir recurso
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao salvar tarefa rápida");
                }
            }
        });  //salvar caminhos

    }

    function removerClasseAtivo() {
        $("#clickListaRecurso").removeClass("ativo");
        $("#clickMidiaTarefa").removeClass("ativo");
        $("#clickUploadTarefa").removeClass("ativo");
        $("#clickLinkTarefa").removeClass("ativo");
        $("#clickInserirCodigo").removeClass("ativo");
        $("#clickInserirCodigo").removeClass("ativo")
    }

    function excluirRecursoRapidoTarefa() {
        console.log("############ excluirRecursoRapidoTarefa");
        var c = $("#idCaminho").val();
        var d = $("#idEtapa").val();
        var f = $("#strTituloTarefa").val();
        var b = $("#txtDescricaoTarefa").val();
        f = $("<div />").text(f).html();
        b = $("<div />").text(b).html();
        var e = 0;
        if ($("#valeNota").hasClass("ativo")) {
            e = $("#intValorTarefa").val()
        }
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
            data: {
                idCaminho: c,
                idEtapa: d,
                idRecurso: 11,
                idPublicacao: 0,
                idAvaliacao: 0,
                strTitulo: f,
                strDescricao: b,
                intValor: e
            },
            success: function (g) {
                $("#previewRecursoRapidoTarefa").slideUp("slow", function () {
                    $("#previewRecursoRapidoTarefa").parent().remove();
                    $("#strTituloTarefa, #txtDescricaoTarefa, #valeNota, #intValorTarefa, #entrega_tarefa").removeAttr("disabled")
                });
                $(".tooltip").text("Inserir recurso");
                $("#abreListaRecursoTarefa").attr({
                    href: "javascript:void(0);",
                    title: "Inserir recurso"
                });
                $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Inserir recurso");
                $("#clickListaRecurso").attr("data-original-title", "Inserir recurso")
            },
            error: function (g) {
                if (g.status != 0) {
                    console.debug("erro ao remover recurso")
                }
            }
        })
    }

    function salvarRecurso(strTituloTarefa, txtDescricaoTarefa, intTipo, intValor, idRecurso, idPublicacao, idAvaliacao) {

        var idCaminho = $("#idCaminho").val();
        if (idCaminho == "" || idCaminho == undefined) {
            idCaminho = 0;
        }

        var idEtapa = $("#idEtapa").val();
        if (idEtapa == "" || idEtapa == undefined) {
            idEtapa = 0;
        }

        var intStatus = 2;
        $('input:radio[name=rTipo]').each(function () {
            if ($(this).is(':checked'))
                intStatus = parseInt($(this).val());
        });

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
                intTipo: intTipo
            },
            success: function (idCaminho) {

                $("#idCaminho").val(idCaminho);

                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                    data: {
                        idCaminho: idCaminho,
                        idEtapa: idEtapa,
                        idRecurso: 1,
                        idPublicacao: 0,
                        idAvaliacao: idAvaliacao,
                        strTitulo: strTituloTarefa,
                        strDescricao: txtDescricaoTarefa,
                        intValor: intValor
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (idRecursoEtapa_idEtapa) {

                        var vetAux = idRecursoEtapa_idEtapa.split('_');
                        var idRecursoEtapa = vetAux[0];
                        $("#idEtapa").val(vetAux[1]);

                        $("#recursoRapido").remove();
                        $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif" border="0"/></div>');

                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/",
                            data: {
                                idRecursoEtapa: idRecursoEtapa,
                                idAvaliacao: idAvaliacao
                            },
                            success: function (data) {
                                $("#container_empilhaextras #recursoRapido").html(data);
                                //$("#fancybox-close").click();
                                $.fancybox.close();
                                $("#abreListaRecursoTarefa").attr({ "href": "javascript:void(0);", "title": "Substituir recurso" });
                                $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso")
                                $(".tooltip").each(function () {
                                    if ($(this).text() === 'Inserir recurso')
                                        $(this).html('Substituir recurso');
                                });
                                /*$(".tooltip_title").tooltip({
                                offset: [-10, 0]
                                });*/
                                $("#recursoRapido").css("margin", "0px 0px 0px 0");
                                $('#recursoRapido').find('h5').parent().css("margin", "0px 0px 0px 0");
                            },
                            error: function (data) {
                                if (data.status != 0) {
                                    console.debug("erro ao retornar recurso escolhido");
                                }
                            }
                        }); //lista recurso
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao salvar recurso");
                        }
                    }
                }); //inserir recurso
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao salvar tarefa rápida");
                }
            }
        });  //salvar caminhos

    }

    function excluirRecursoRapido() {

        var idCaminho = $("#idCaminho").val();
        var idEtapa = $("#idEtapa").val();

        var strTituloTarefa = $("#strTituloTarefa").val();
        var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();

        strTituloTarefa = $("<div />").text(strTituloTarefa).html();
        txtDescricaoTarefa = $("<div />").text(txtDescricaoTarefa).html();

        var intValorEtapa = 0;

        if ($('#valeNota').attr('checked') || $('#valeNota').hasClass('ativo')) {
            intValorEtapa = $("#intValorTarefa").val();
        }

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
            data: {
                idCaminho: idCaminho,
                idEtapa: idEtapa,
                idRecurso: 11,
                idPublicacao: 0,
                idAvaliacao: 0,
                strTitulo: strTituloTarefa,
                strDescricao: txtDescricaoTarefa,
                intValor: intValorEtapa
            },
            success: function (idRecursoEtapa_idEtapa) {
                if ($('#recursoRapido').find('img').attr('src').toLowerCase().indexOf('avaliacoes') > 0) {
                    $("#strTituloTarefa").val('');
                    $("#txtDescricaoTarefa").val('');
                    $("#intValorTarefa").val('');
                    $('#valeNota').removeAttr('checked').removeClass('ativo');
                }
                $("#recursoRapido").slideUp('slow', function () {
                    $("#recursoRapido").remove();
                    $("#strTituloTarefa, #txtDescricaoTarefa, #valeNota, #intValorTarefa, #entrega_tarefa").removeAttr("disabled");
                });
                //$(".tooltip").text('Inserir recurso');
                $(".tooltip").first().text('Inserir recurso');
                $("#abreListaRecursoTarefa").attr({ "href": "javascript:void(0);", "title": "Inserir recurso" });
                $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Inserir recurso");
                $(".tooltip_title").each(function () {
                    $(this).tooltip({
                        offset: [-10, 0]
                    });
                });
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao remover recurso");
                }
            }
        });

    }

    lightBoxAVA($("#btAbreLightBoxTarefa"), {
        autoSize: false,
        width: 726,
        height: 400,
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        autoResize: false,
        type: "ajax",
        afterShow: function () {

            EscondeOsObjects();

            /*$("#fancybox-close").bind("click", function () {
            if ($("#idEtapa").val() != "") {
            carregaArquivosTarefa($("#idEtapa").val());
            }
            MostraOsObjects();
            });*/

            $("#btnFinalizarMaterialApoio").bind("click", function () {
                //$("#fancybox-close").click();
                $.fancybox.close();
            });

        }, //function
        beforeClose: function () {
            if ($("#idEtapa").val() != "") {
                carregaArquivosTarefa($("#idEtapa").val());
            }
            MostraOsObjects();
        }
    });

    function abreUploadTarefa() {

        var idCaminho = $("#idCaminho").val();
        var idEtapa = $("#idEtapa").val();

        var strTarefa = $("#strTituloTarefa").val();
        var strDescricao = $("#txtDescricaoTarefa").val();

        strTarefa = $("<div />").text(strTarefa).html();
        strDescricao = $("<div />").text(strDescricao).html();

        var tipoFerramenta = "mural";
        var idRotaEtapaUsuario = 0;

        var intNota = 0;

        if ($('#valeNota').attr('checked') || $('#valeNota').hasClass('ativo')) {
            intNota = $("#intValorTarefa").val();
        }

        if (idCaminho == "" || idCaminho == undefined) {
            idCaminho = 0;
        }

        if (idEtapa == "" || idEtapa == undefined) {
            idEtapa = 0;
        }


        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/AVA/Caminhos/Home/AbreUploadTarefa/?idCaminho=" + idCaminho + "&idEtapa=" + idEtapa + "&strTarefa=" + strTarefa + "&strDescricao=" + strDescricao + "&intNota=" + intNota,
            dataType: "json",
            async: false,
            success: function (data, status) {

                var auxIdUsuario = data[0];
                var auxIdEtapa = data[1];
                var auxIdCaminho = data[2];
                var auxIdFerramTipo = data[3];

                $("#idEtapa").val(auxIdEtapa);
                $("#idCaminho").val(auxIdCaminho);

                var idsArquivosPreSelecionados = [];
                if (arrayArquivosUpload != null && arrayArquivosUpload != undefined) {
                    if (arrayArquivosUpload.arrayArquivo != null && arrayArquivosUpload.arrayArquivo != undefined) {
                        if (arrayArquivosUpload.arrayArquivo.length > 0) {
                            for (var oi in arrayArquivosUpload.arrayArquivo) {
                                idsArquivosPreSelecionados.push(arrayArquivosUpload.arrayArquivo[oi].id);
                            }
                        }
                    }
                }

                var param = {
                    'idFerramenta': auxIdEtapa,
                    'idFerramentaTipo': auxIdFerramTipo,
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
                a = window.open("", "Upload", parametros);

                if (a) {
                    mForm.submit();
                }

            },
            error: function (xmlHttpRequest, status, err) {
                //Caso ocorra algum erro:
                alert("Erro: " + err + "Status: " + status);
            }
        });
    }

    function excluirArquivoTarefa(idArquivo) {

        var idFerramenta = $("#idEtapa").val();

        $.ajax({
            type: "POST",
            url: "/AVA/Upload/Home/ExcluiArquivoFerramenta/",
            data: {
                idArquivo: idArquivo,
                idFerramenta: idFerramenta
            },
            success: function (data) {
                CallbackUpload(idFerramenta, idArquivo, '');
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao excluir material de apoio!");
                }
            }
        });

    }



    /*
    function montaCampoData(field_) {

    $(field_).setMask('date');

    $(field_).DatePicker({
    format: 'd/m/Y',
    date: $(field_).val(),
    current: $('#currentDay').val(),
    starts: 1,
    //position: 'r',
    onBeforeShow: function () {
    $(field_).DatePickerSetDate($('#currentDay').val(), true);
    },
    onChange: function (formated, dates) {
    $(field_).val(formated);
    $(field_).DatePickerHide();
    },
    locale: {
    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
    months: ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    weekMin: 'ms'
    }
    });
    }
    */

    function montaCampoData(dtmInicial, dtmFinal) {

        $(dtmInicial).setMask('date');
        $(dtmFinal).setMask('date');

        $(dtmInicial).datepicker({
            numberOfMonths: 1,
            dateFormat: "dd/mm/yy",
            dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            onSelect: function (selectedDate) {
                $(dtmFinal).datepicker("option", "minDate", selectedDate);
            }
        }).removeAttr('readonly');

        $(dtmFinal).datepicker({
            numberOfMonths: 1,
            dateFormat: "dd/mm/yy",
            dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            onSelect: function (selectedDate) {
                $(dtmInicial).datepicker("option", "maxDate", selectedDate);
            }
        }).removeAttr('readonly');

    }

    var quantidadePorPaginaGlobal = 10;
    var rodarGlobal = 0;
    var idRecursoGlobal = 0;
    var idCategoriaGlobal = 0;
    var strPesquisaGlobal = "";
    var tipoGlobal = 1;
    var strEstadosGlobal = "2, 3, 5, 6, 8, 10";
    var dtmInicioGlobal = "";
    var dtmFimGlobal = "";
    var idEstadoGlobal = -1;
    var intEnsinoGlobal = 0;
    var intDisciplinaGlobal = 0;
    var jsonAvaliacaoGlobal = "";

    function paginacaoRecursoItemRapido(idCategoria, idRecurso) {

        $("#mostraPaginas").hide();

        idCategoriaGlobal = idCategoria;
        idRecursoGlobal = idRecurso;
        rodarGlobal = 1;

        var resultados = 0;

        if (idRecurso == 1) {

            $("#container_recAval").html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");

            //            alert(
            //                    "tipo: "+ tipoGlobal
            //                    +"\nstrEstados: " + strEstadosGlobal
            //                    + "\ndtmInicio: " + dtmInicioGlobal
            //                    +"\ndtmFim: " + dtmFimGlobal
            //                    +"\nstrPesquisa: " + strPesquisaGlobal
            //                    +"\nstrPesquisaEncode1: " + strPesquisaGlobal
            //                    +"\nstrPesquisaEncode2: " + strPesquisaGlobal
            //                    +"\nidEstado: " + idEstadoGlobal
            //                 )

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/RetornaAvaliacoesTotal/",
                async: false,
                data: {
                    tipo: tipoGlobal,
                    strEstados: strEstadosGlobal,
                    dtmInicio: dtmInicioGlobal,
                    dtmFim: dtmFimGlobal,
                    strPesquisa: strPesquisaGlobal,
                    strPesquisaEncode1: strPesquisaGlobal,
                    strPesquisaEncode2: strPesquisaGlobal,
                    idEstado: idEstadoGlobal
                },
                success: function (data) {
                    resultados = data;
                    //resultados = 15;
                    /*$("#fancybox-close").click(function () {
                    strPesquisaGlobal = "";
                    tipoGlobal = 1;
                    strEstadosGlobal = "2, 3, 5, 6, 8, 10";
                    dtmInicioGlobal = "";
                    dtmFimGlobal = "";
                    idEstadoGlobal = -1;

                    })*/

                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("Não foi possível obter o numero de resultados");
                    }
                }
            });
        } else {

            $.ajax({
                url: "/AVA/Caminhos/home/SelecionarRecursoItemTotal/",
                data: {
                    idCategoria: idCategoriaGlobal,
                    idRecurso: idRecursoGlobal
                },
                async: false,
                success: function (data) {
                    resultados = data;
                    /*$("#fancybox-close").click(function () {
                    strPesquisaGlobal = "";
                    tipoGlobal = 1;
                    strEstadosGlobal = "2, 3, 5, 6, 8, 10";
                    dtmInicioGlobal = "";
                    dtmFimGlobal = "";
                    idEstadoGlobal = -1;
                    })*/
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("Nao foi possivel obter o numero de resultados.");
                    }
                }
            });

        }

        resultados = parseInt(resultados);

        $("#Pagination").pagination(
            resultados,
            {
                items_per_page: quantidadePorPaginaGlobal,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: retornaPaginaRecursoItemRapido
            }
        );
        if (resultados <= quantidadePorPaginaGlobal) {
            $("#mostraPaginas").hide();
        } else {
            if ($("#mostraPaginas").is(":hidden")) {
                $("#mostraPaginas").show();
            }
        }
    }

    function retornaPaginaRecursoItemRapido(pag, jq) {
        if (rodarGlobal > 0) {
            listaRecursoItemRapidoPaginando(pag, idRecursoGlobal, idCategoriaGlobal);
            $('.ava_container_masonry').masonry({
                itemSelector: '.ava_box_masonry'
            });
        }
        rodarGlobal += 1;
    }

    function listaRecursoItemRapidoPaginando(numPag, idRecurso, idCategoria) {

        numPag += 1;

        var fim = quantidadePorPaginaGlobal * numPag;
        var inicio = (fim - quantidadePorPaginaGlobal) + 1;

        $("#container_recurso").html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");

        $("#container_recurso").removeClass("tablefix_aval");
        $("#container_recurso").removeClass("trhover");

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ListaRecursoItensRapido/",
            data: {
                idCategoria: idCategoria,
                idRecurso: idRecurso,
                intInicio: inicio,
                intFim: fim
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (itens) {
                $("#container_recurso").html(itens).css("display", "");
                $('.ava_container_masonry').masonry({
                    itemSelector: '.ava_box_masonry'
                });

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao listar recursos!");
                }
            }
        });

    }

    function procurarItemRapido(catRapido, recRapido) {
        if (passouAgendar != 1) {
            var strPesquisa = $("#strPesquisaRecurso").val();
            if (strPesquisa == "") {
                $("#strPesquisaRecurso").addClass("ava_field_alert");
                return false;
            }
            if (catRapido == 159) {
                var intEnsino = $("#IdPapelEnsino").val();
                var intDisciplina = $("#idDisciplina").val();
                intEnsinoGlobal = intEnsino;
                intDisciplinaGlobal = intDisciplina;
            } else {
                intEnsinoGlobal = 0;
                intDisciplinaGlobal = 0;
            }

            idRecursoGlobal = recRapido;
            idCategoriaGlobal = catRapido;
            strPesquisaGlobal = strPesquisa;
            rodarGlobal = 1;
            passouAgendar = 1;
            paginacaoProcurarRecursoItemRapido(idCategoriaGlobal, strPesquisaGlobal);
        }
    }

    function paginacaoProcurarRecursoItemRapido(idCategoria, strPesquisa) {

        $("#mostraPaginas").hide();
        $("#container_recursoItem").html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
        var objData;
        var resultados = 0;
        if (intEnsinoGlobal != 0) {
            objData = {
                idCategoria: idCategoria,
                strPesquisa: strPesquisa,
                intEnsino: intEnsinoGlobal,
                intDisciplina: intDisciplinaGlobal
            };
        } else {
            objData = {
                idCategoria: idCategoria,
                strPesquisa: strPesquisa
            };
        }
        $.ajax({
            url: "/AVA/Caminhos/home/ProcurarRecursoItemTotal/",
            data: objData,
            async: false,
            success: function (data) {
                resultados = data;
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Nao foi possivel obter o numero de resultados.");
                }
            }
        });

        resultados = parseInt(resultados);
        $("#Pagination").pagination(
            resultados,
            {
                items_per_page: quantidadePorPaginaGlobal,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: retornaPaginaProcurarRecursoItemRapido
            }
        );
        if (resultados <= quantidadePorPaginaGlobal) {
            $("#mostraPaginas").hide();
        } else {
            if ($("#mostraPaginas").is(":hidden")) {
                $("#mostraPaginas").show();
            }
        }
    }

    function retornaPaginaProcurarRecursoItemRapido(pag, jq) {
        if (rodarGlobal > 0) {
            listaProcuraRecursoItemRapido(pag, idCategoriaGlobal, idRecursoGlobal, strPesquisaGlobal);
        }
        rodarGlobal += 1;
    }

    function listaProcuraRecursoItemRapido(numPag, idCategoria, idRecurso, strPesquisa) {

        numPag += 1;

        var fim = quantidadePorPaginaGlobal * numPag;
        var inicio = (fim - quantidadePorPaginaGlobal) + 1;
        var objData;
        //$("#container_recursoItem").html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />")
        if (idCategoria == 159) {
            objData = {
                idCategoria: idCategoria,
                idRecurso: idRecurso,
                strPesquisa: strPesquisa,
                intInicio: inicio,
                intFim: fim,
                intEnsino: intEnsinoGlobal,
                intDisciplina: intDisciplinaGlobal
            };
        } else {
            objData = {
                idCategoria: idCategoria,
                idRecurso: idRecurso,
                strPesquisa: strPesquisa,
                intInicio: inicio,
                intFim: fim
            };
        }
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ProcurarRecursoItemRapido/",
            data: objData,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (itens) {
                $("#container_recursoItem").html(itens).css("display", "");

                $('.ava_container_masonry').masonry({
                    itemSelector: '.ava_box_masonry'
                });
                passouAgendar = 0;
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao procurar recursos!");
                }
            }
        });

    }
    function simularAvaliacao(idAvaliacao) {
        window.open('/ava/avaliacoes/Agendamento/VisualizacaoProva/' + idAvaliacao, 'wnvsimularavaliacao', 'width=799,height=480, scrollbars=1, resizable=yes');
    }
    function mudarDisciplinas(idEnsino) {
        var options;
        if (idEnsino == 1010101) {
            options = "<option value=\"0\" selected=\"selected\">Todas as disciplinas</option><option value=\"6\">Ciências</option><option value=\"8\">Educação Física</option><option value=\"11\">Geografia</option><option value=\"12\">História</option><option value=\"73\">Língua Inglesa</option><option value=\"15\">Matemática</option><option value=\"16\">Língua Portuguesa</option>";
            $("#idDisciplina").empty().html(options).removeAttr("disabled");
        }
        else if (idEnsino == 1010201) {
            options = "<option value=\"0\" selected=\"selected\">Todas as disciplinas</option> " +
											"<option value=\"6\">Ciências</option>" +
                                            "<option value=\"8\">Educação Física</option>" +
											"<option value=\"10\">Física</option>" +
											"<option value=\"11\">Geografia</option>" +
											"<option value=\"12\">História</option>" +
											"<option value=\"73\">Língua Inglesa</option>" +
											"<option value=\"15\">Matemática</option>" +
                                            "<option value=\"16\">Língua Portuguesa</option>" +
                                            "<option value=\"19\">Química</option>";
            $("#idDisciplina").empty().html(options).removeAttr("disabled");
        }
        else if (idEnsino == 1020001) {
            options = "<option value=\"0\" selected=\"selected\">Todas as disciplinas</option>  " +
											    "<option value=\"7\">Biologia</option> " +
                                                "<option value=\"8\">Educação Física</option>" +
											    "<option value=\"10\">Física</option> " +
											    "<option value=\"11\">Geografia</option> " +
											    "<option value=\"12\">História</option> " +
											    "<option value=\"73\">Língua Inglesa</option> " +
											    "<option value=\"15\">Matemática</option> " +
											    "<option value=\"16\">Língua Portuguesa</option> " +
                                                "<option value=\"19\">Química</option>";
            $("#idDisciplina").empty().html(options).removeAttr("disabled");
        } else {

            options = "<option value=\"0\" selected=\"selected\">Todas as disciplinas</option>";
            $("#idDisciplina").empty().html(options).attr("disabled", "disabled");

        }
    }

    function limparfiltro() {
        $('#escola_aval, #portal_aval, #cbCompartilhada, #cbPrivado, #minhas_aval').removeAttr('checked');
        $('#strPesquisa').val('');
        $('#dataInicio, #dataFim').val('');
        $("#minhas_aval").attr('checked', true);
    }

    function filtrarAvaliacoes() {

        $tituloAval = $('#strPesquisa').val();

        $dataInicio = $('#dtmInicioAval').val();
        $dataFim = $('#dtmFimAval').val();

        if ($dataInicio.length <= 0 && $dataFim.length > 0) {
            alert("Favor preencher a data inicial!")
            return false;
        } else if ($dataInicio.length > 0 && $dataFim.length <= 0) {
            alert("Favor preencher a data final!")
            return false;
        }

        $('#filtro_aval').hide();

        $('#escorregaFiltro').html("Adicionar filtros &#9660;");

        listaAvaliacoesNovaRapido($tituloAval, $dataInicio, $dataFim);
    }

    function montaLajotinhaFiltro(titulo, dataInicio, dataFim) {

        $('.lajotinhas ul').html('');

        if (titulo != "") {
            var cont = 0;
            $(".lajotinhas li").each(function () {
                cont++;
            })

            cont++;
            $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + titulo + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(' + cont + ', 4)">x</a></span></span></li>')
        }

        if (dataInicio != "" && dataFim != "") {
            var cont = 0;
            $(".lajotinhas li").each(function () {
                cont++;
            })

            cont++;
            $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + dataInicio + ' a ' + dataFim + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(' + cont + ', 5)">x</a></span></span></li>')

        }

        $('.lajotinhas a.bt_normal').remove();


    }

    function excluirFiltro(idLI, qual) {

        /****
        1=tipoPesquisa
        2=compartilhado
        3=privado
        4=titulo
        5=data        
        ***/

        if (qual == 1) {
            $("#minhas_aval").attr('checked', true);
        } else if (qual == 2) {
            $('#cbCompartilhada').removeAttr('checked');
        } else if (qual == 3) {
            $('#cbPrivado').removeAttr('checked');
        } else if (qual == 4) {
            $('#strPesquisa').val('');
        } else if (qual == 5) {
            $('#dataInicio, #dataFim').val('');
        }

        $('#' + idLI).remove();

        $('.lajotinhas a.bt_normal').remove();
        $('.lajotinhas').append('<a class="bt_normal" href="javascript: void(0);" onclick="filtrarAvaliacoes();"><span class="ava_refresh"></span>atualizar filtro</a>');
    }

    function abreCodigo() {

        var urlPagina = document.location.href.toLowerCase();
        var indexOfUrl = urlPagina.indexOf('/ava/mural');
        if (indexOfUrl > 0) { 
            abreCodigoTarefa();
        }
        else {

            var o = {
                autoSize: false,
                width: 680,
                height: 450,
                helpers: {
                    overlay: {
                        closeClick: false,
                        locked: false
                    }
                },
                autoResize: false,
                type: "ajax",
                href: '/AVA/Caminhos/Home/SelecaoCodigosLivro',
                beforeClose: function () {
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/ListaCodigosDidatico",
                        data: {
                            idRecursoEtapa: $("#idRecursoEtapa").val()
                        },
                        success: function (data) {
                            $('#codigos_didatico').html("");
                            $('#container_empilhaextras').prepend(data);
                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("erro ao buscar codigos da tarefa!");
                            }
                        }
                    });
                    MostraOsObjects();
                }, //function
                afterShow: function () {
                    EscondeOsObjects();

                    /*$("#fancybox-close").bind("click", function () {
                    MostraOsObjects();
                    });*/
                }
            }

            $.fancybox(o);
            return false;
        }
    }

    function defineOptionsMD(nivel) {

        nivel = nivel.value;

        document.getElementById('intBimestre').disabled = false;
        document.getElementById('selAreas').disabled = false;

        strNivel = nivel;
        strSelSerie = '';
        strSelArea = '';
        strSelArea += '<option value="0" selected>selecione uma área</option>';

        if (nivel == 'EI_alu') {

            document.getElementById('intBimestre').disabled = true;
            document.getElementById('selAreas').disabled = true;
            document.getElementById('selSerie').disabled = false;

            strSelSerie = '';
            strSelSerie += '<option value="0" selected>selecione um grupo</option>';
            strSelSerie += '<option value="3" >Grupo 3</option>';
            strSelSerie += '<option value="4" >Grupo 4</option>';
            strSelSerie += '<option value="5" >Grupo 5</option>';
            strSelSerie += '<option value="1" >1º ano / nível III</option>';

        } else if (nivel == 'EF_I') {

            document.getElementById('selSerie').disabled = false;

            strSelSerie += '<option value="2" >2º ano / 1ª série</option>';
            strSelSerie += '<option value="3" >3º ano / 2ª série</option>';
            strSelSerie += '<option value="4" >4º ano / 3ª série</option>';
            strSelSerie += '<option value="5" >5º ano / 4ª série</option>';

            strSelArea += '<option value="art" >Artes</option>';
            strSelArea += '<option value="cie" >Ciências</option>';
            strSelArea += '<option value="fil" >Filosofia</option>';
            strSelArea += '<option value="geo" >Geografia</option>';
            strSelArea += '<option value="his" >História</option>';
            strSelArea += '<option value="ing" >Língua Inglesa</option>';
            strSelArea += '<option value="por" >Língua Portuguesa</option>';
            strSelArea += '<option value="mat" >Matemática</option>';

        } else if (nivel == 'EF_II') {

            document.getElementById('selSerie').disabled = false;

            strSelSerie += '<option value="6" >6º ano / 5ª série</option>';
            strSelSerie += '<option value="7" >7º ano / 6ª série</option>';
            strSelSerie += '<option value="8" >8º ano / 7ª série</option>';
            strSelSerie += '<option value="9" >9º ano / 8ª série</option>';

            strSelArea += '<option value="art" >Artes</option>';
            strSelArea += '<option value="cie" >Ciências</option>';
            strSelArea += '<option value="fis" >Física</option>';
            strSelArea += '<option value="geo" >Geografia</option>';
            strSelArea += '<option value="his" >História</option>';
            strSelArea += '<option value="hgb" >Hist. Geral e do Brasil</option>';
            strSelArea += '<option value="ing" >Língua Inglesa</option>';
            strSelArea += '<option value="por" >Língua Portuguesa</option>';
            strSelArea += '<option value="mat" >Matemática</option>';
            strSelArea += '<option value="qui" >Química</option>';

        } else if (nivel == 'EM') {

            document.getElementById('selSerie').disabled = false;

            strSelSerie += '<option value="1" >1ª série</option>';
            strSelSerie += '<option value="2" >2ª série</option>';
            strSelSerie += '<option value="3" >3ª série</option>';

            strSelArea += '<option value="art" >Artes</option>';
            strSelArea += '<option value="bio" >Biologia</option>';
            strSelArea += '<option value="fil" >Filosofia</option>';
            strSelArea += '<option value="fis" >Física</option>';
            strSelArea += '<option value="geo" >Geografia</option>';
            strSelArea += '<option value="his" >História</option>';
            strSelArea += '<option value="hgb" >Hist. Geral e do Brasil</option>';
            strSelArea += '<option value="ing" >Língua Inglesa</option>';
            strSelArea += '<option value="por" >Língua Portuguesa</option>';
            strSelArea += '<option value="lit" >Literatura</option>';
            strSelArea += '<option value="mat" >Matemática</option>';
            strSelArea += '<option value="qui" >Química</option>';
            strSelArea += '<option value="soc" >Sociologia</option>';

        } else if (nivel == 'MOD') {
            document.getElementById('selSerie').disabled = true;

            strSelSerie = '';
            strSelSerie += '<option value="0" selected>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>';
            strSelArea += '<option value="art" >Artes</option>';
            strSelArea += '<option value="bio" >Biologia</option>';
            strSelArea += '<option value="fil" >Filosofia</option>';
            strSelArea += '<option value="fis" >Física</option>';
            strSelArea += '<option value="geo" >Geografia</option>';
            strSelArea += '<option value="his" >História</option>';
            strSelArea += '<option value="ing" >Língua Inglesa</option>';
            strSelArea += '<option value="por" >Língua Portuguesa</option>';
            strSelArea += '<option value="esp" >Língua Espanhola</option>';
            strSelArea += '<option value="lit" >Literatura</option>';
            strSelArea += '<option value="mat" >Matemática</option>';
            strSelArea += '<option value="qui" >Química</option>';
            strSelArea += '<option value="soc" >Sociologia</option>';

            document.getElementById('intBimestre').disabled = true;

        } else if (nivel == 'EXT') {

            document.getElementById('selSerie').disabled = true;

            strSelArea += '<option value="bio" >Biologia</option>';
            strSelArea += '<option value="fis" >Física</option>';
            strSelArea += '<option value="geo" >Geografia</option>';
            strSelArea += '<option value="his" >História</option>';
            strSelArea += '<option value="ing" >Língua Inglesa</option>';
            strSelArea += '<option value="por" >Língua Portuguesa</option>';
            strSelArea += '<option value="esp" >Língua Espanhola</option>';
            strSelArea += '<option value="lit" >Literatura</option>';
            strSelArea += '<option value="mat" >Matemática</option>';
            strSelArea += '<option value="qui" >Química</option>';

            document.getElementById('intBimestre').disabled = true;

        }

        $('#selSerie').html(strSelSerie);
        $('#selAreas').html(strSelArea);
    }

    function fncPesquisa() {

        var selNivel = $('#selNivel').val();
        var selSerie = $('#selSerie').val();
        var selAreas = $('#selAreas').val();

        if (selNivel == '0') {
            alert('Você precisa selecionar um nível.')
            return;
        }
        if (selSerie == '0' && $('#selNivel').value != 'MOD') {
            alert('Você precisa selecionar uma série.')
            return;
        }
        if (selAreas == '0' && $('#selNivel').value != 'EI_alu') {
            alert('Você precisa selecionar uma área.')
            return;
        }

        $("#container_codigos").html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/pesquisa/listaLinks_MD_AVA.asp",
            data: {
                selNivel: selNivel,
                selSerie: selSerie,
                selAreas: selAreas
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                $("#container_codigos").html(data);
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao procurar codigo!");
                }
            }
        });

    }

    function inserirCodigo(idCodigo, idApostilaEdicao) {

        $(".time_loading").css("display", "block");

        var strTituloTarefa = $("#strTituloTarefa").val();
        var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();

        strTituloTarefa = $("<div />").text(strTituloTarefa).html();
        txtDescricaoTarefa = $("<div />").text(txtDescricaoTarefa).html();

        var intValorEtapa = 0;

        if ($('#valeNota').attr('checked') || $('#valeNota').hasClass('ativo')) {
            intValorEtapa = $("#intValorTarefa").val();
        }

        var idCaminho = $("#idCaminho").val();
        if (idCaminho == "" || idCaminho == undefined) {
            idCaminho = 0;
        }

        var idEtapa = $("#idEtapa").val();
        if (idEtapa == "" || idEtapa == undefined) {
            idEtapa = 0;
        }

        $("#boxBTNInsCodigo_" + idCodigo).html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' /> Inserindo...");
        var intStatus = 2;
        $('input:radio[name=rTipo]').each(function () {
            if ($(this).is(':checked'))
                intStatus = parseInt($(this).val());
        })
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
                intTipo: 2
            },
            success: function (idCaminho) {

                $("#idCaminho").val(idCaminho);

                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                    data: {
                        idCaminho: idCaminho,
                        idEtapa: idEtapa,
                        idRecurso: 11,
                        idPublicacao: 0,
                        idAvaliacao: 0,
                        strTitulo: strTituloTarefa,
                        strDescricao: txtDescricaoTarefa,
                        intValor: intValorEtapa,
                        buscaRecursoExistente: 1
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (idRecursoEtapa_idEtapa) {

                        var vetAux = idRecursoEtapa_idEtapa.split('_');
                        var idRecursoEtapa = vetAux[0];
                        $("#idEtapa").val(vetAux[1]);
                        $("#idRecursoEtapa").val(idRecursoEtapa);

                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/InserirCodigoDidatico/",
                            data: {
                                idRecursoEtapa: idRecursoEtapa,
                                idCodigo: idCodigo,
                                idApostilaEdicao: idApostilaEdicao
                            },
                            success: function (data) {

                                $("div#" + idApostilaEdicao).html("<span>Código inserido com sucesso!</span>");

                            },
                            error: function (data) {
                                if (data.status != 0) {
                                    console.debug("erro ao inserir codigo didatico: " + idCodigo);
                                }
                            }
                        });
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao salvar recurso");
                        }
                    }
                });
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao salvar tarefa rápida");
                }
            }
        });
    }

    function excluirCodigo(idCodigo, idRecursoEtapa, idApostilaEdicao) {

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirCodigoEtapa",
            data: {
                idRecursoEtapa: idRecursoEtapa,
                idCodigo: idCodigo,
                idApostilaEdicao: idApostilaEdicao

            },
            success: function (data) {
                $("#codigos_didatico #" + idCodigo).slideUp("slow", function () {
                    $(this).remove();
                });

            },
            error: function (data) {
                if (data.status != 0) {
                    $("#codigos_didatico #" + idCodigo).prepend("erro ao excluir código da tarefa!")
                }
            }
        });

    }

    function pesquisaPorCodigo() {

        var strCodigo = $("#strCodigoDidatico").val();
        if (strCodigo == "") {
            alert("Digite um código.");
        } else {
            $.ajax({
                type: "POST",
                url: "/pesquisa/resultadoPesquisaMD_AVA.asp",
                data: {
                    strCodigo: strCodigo
                },
                success: function (data) {
                    $("#container_codigos").html(data);
                },
                error: function (data) {
                    if (data.status != 0) {
                        $("#container_codigos").prepend("erro ao buscar codigo!")
                    }
                }
            });
        }
    }
    function visualizarCM() {
        var iVersao = $("#paginacaoCM").find("option:selected").attr("iVersao");
        var elemento = $("#paginacaoCM").find("option:selected");

        visualizarPaginaCM(elemento, iVersao);
    }

    function visualizarPaginaCM(elemento, iVersao) {

        var idPublicacao = elemento.attr("idPublicacao");

        if (iVersao == 6) {
            var w, h, rw, rh, x, y;

            //	tamanho e posição da janela:
            w = 730;
            h = 500;
            rw = screen.width;
            rh = screen.height;
            x = (rw - w) / 2;
            y = ((rh - h) / 2) - 20;

            window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(elemento.attr("url")) + "&idPublicacao=" + idPublicacao + "&iVersao=" + iVersao, idPublicacao, "left=" + x + ",top=" + y + ",width=" + w + ",height=" + h + ",resizable=yes");
        }
        else if (iVersao < 3) {
            window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(elemento.attr("urlPai")) + "?bProcura=1&idPublicacao=" + idPublicacao + "&idcapitulo=" + elemento.attr("pOrdem") + "&idSubcapitulo=" + elemento.attr("sOrdem") + "&iVersao=" + iVersao, elemento.attr("idPublicacao"), "width=800,height=600,scrollbars=no,left=0,top=0,resizable=yes");
        }
        else if (iVersao == 7) {
            window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(elemento.attr("urlPai")) + "?bProcura=1&idPublicacao=" + idPublicacao + "&idcapitulo=" + elemento.attr("pOrdem") + "&idSubcapitulo=" + elemento.attr("sOrdem") + "&iVersao=" + iVersao, elemento.attr("idPublicacao"), "width=790,height=560,scrollbars=no,left=0,top=0,resizable=yes");
        } else {
            window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(elemento.attr("urlPai")) + "?bProcura=1&idPublicacao=" + idPublicacao + "&idcapitulo=" + elemento.attr("pOrdem") + "&idSubcapitulo=" + elemento.attr("sOrdem") + "&iVersao=" + iVersao, elemento.attr("idPublicacao"), "width=780,height=580,scrollbars=no,left=0,top=0,resizable=yes");
        }

    }

    function salvarPaginasCM() {
        var elemento = $("#paginacaoCM").find("option:selected");
        var elementoEtapa = $("#idEtapa");

        $.ajax({
            url: "/ava/caminhos/home/salvarPaginacaoCMRapido",
            data: {
                idEtapa: elementoEtapa.val(),
                pOrdem: elemento.attr("pOrdem"),
                sOrdem: elemento.attr("sOrdem")
            },
            type: "POST",
            async: false,
            success: function (data) {
                var retorno = parseInt(data);
                if (retorno == 2) {
                    console.debug("Desconhecido");
                }
            },
            error: function (data) {
                console.debug(data.responseText);
            }
        });

    }

    function listaAvaliacoesNovaRapido(strTitulo, dtmInicio, dtmFim) {

        $("#container_recurso").html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");

        $.ajax({
            type: "POST",
            url: "/AVA/Avaliacoes/Agendamento/ListagemAvaliacoes",
            async: false,
            data: {
                pagina: 1,
                tamanho: quantidadePorPaginaGlobal,
                limite: 5,
                ordem: "nome,0",
                nome: strTitulo,
                datainicio: dtmInicio,
                datafim: dtmFim,
                origem: 0
            },
            success: function (jsonAvaliacao) {

                try {
                    if (jsonAvaliacao.erro.id == -1) {
                        totalAvaliacoes = 0;
                    } else {
                        totalAvaliacoes = jsonAvaliacao.Paginacao.Total;
                    }
                } catch (e) {
                    totalAvaliacoes = jsonAvaliacao.Paginacao.Total;
                }

                strPesquisaGlobal = strTitulo
                dtmInicioGlobal = dtmInicio
                dtmFimGlobal = dtmFim

                $("#Pagination").pagination(
                    totalAvaliacoes,
                    {
                        items_per_page: quantidadePorPaginaGlobal,
                        num_display_entries: 5,
                        current_page: 0,
                        num_edge_entries: 1,
                        link_to: "javascript:void(0);",
                        callback: listaAvaliacoesNovaRapidoPaginado
                    }
                );
                if (totalAvaliacoes <= quantidadePorPaginaGlobal) {
                    $("#mostraPaginas").hide();
                } else {
                    if ($("#mostraPaginas").is(":hidden")) {
                        $("#mostraPaginas").show();
                    }
                }
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Não foi possível obter o numero de resultados da avaliação");
                }
            }
        });    //ListagemAvaliacoes

    }

    function listaAvaliacoesNovaRapidoPaginado(pag, jq) {

        strTitulo = strPesquisaGlobal
        dtmInicio = dtmInicioGlobal
        dtmFim = dtmFimGlobal

        pag += 1;

        $.ajax({
            type: "POST",
            url: "/AVA/Avaliacoes/Agendamento/ListagemAvaliacoes",
            async: false,
            data: {
                pagina: pag,
                tamanho: quantidadePorPaginaGlobal,
                limite: 5,
                ordem: "nome,0",
                nome: strTitulo,
                datainicio: dtmInicio,
                datafim: dtmFim,
                origem: 0
            },
            success: function (jsonAvaliacao) {

                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/RetornaAvaliacoesRapido/",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (head_aval) {

                        $("#container_recurso").html(head_aval);

                        $('#strPesquisa').val(strTitulo);
                        $('#dtmInicioAval').val(dtmInicio);
                        $('#dtmFimAval').val(dtmFim);

                        montaLajotinhaFiltro(strTitulo, dtmInicio, dtmFim);

                        $('#filtro_aval').hide();

                        $('#escorregaFiltro').toggle(
			                function () {
			                    $(this).html("Adicionar filtros &#9650;");

			                    montaCampoData('#dtmInicioAval', '#dtmFimAval');

			                    /*
			                    montaCampoData('#dtmInicioAval');
			                    montaCampoData('#dtmFimAval');
			                    */

			                    $('#filtro_aval').slideDown();
			                }, function () {
			                    $(this).html("Adicionar filtros &#9660;");
			                    $('#filtro_aval').slideUp();
			                    $('#dtmInicioAval').attr('readonly', 'true');
			                    $('#dtmFimAval').attr('readonly', 'true');
			                }
		                );

                        $("#container_recAval").html("<tr><td colspan='2'><img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' /></td></tr>");

                        try {
                            if (jsonAvaliacao.erro.id == -1) {
                                $("#container_recAval").html('<tr><td colspan="2">Nenhuma avaliação encontrada.</td></tr>');
                            } else {
                                $.ajax({
                                    type: "POST",
                                    url: "/AVA/Caminhos/Home/RetornaListaAvaliacoesRapido",
                                    data: {
                                        jsonListaAvaliacao: jQuery.toJSON(jsonAvaliacao)
                                    },
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    success: function (lista_avaliacao) {
                                        $("#container_recAval").html(lista_avaliacao);

                                        //Mobile
                                        if (Modernizr.touch) {
                                            $('.aval_aux').addClass("mobile");
                                        }
                                    },
                                    error: function (data) {
                                        if (data.status != 0) {
                                            console.debug("erro ao listar avaliacao");
                                        }
                                    }
                                }); //RetornaListaAvaliacoesRapido
                            }
                        } catch (e) {
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/RetornaListaAvaliacoesRapido",
                                data: {
                                    jsonListaAvaliacao: jQuery.toJSON(jsonAvaliacao)
                                },
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function (lista_avaliacao) {
                                    $("#container_recAval").html(lista_avaliacao);

                                    //Mobile
                                    if (Modernizr.touch) {
                                        $('.aval_aux').addClass("mobile");
                                    }
                                },
                                error: function (data) {
                                    if (data.status != 0) {
                                        console.debug("erro ao listar avaliacao");
                                    }
                                }
                            }); //RetornaListaAvaliacoesRapido
                        }


                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao listar avaliacao");
                        }
                    }
                }); //RetornaAvaliacoesRapido


            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Não foi possível obter o numero de resultados da avaliação");
                }
            }
        });       //ListagemAvaliacoes

    }

    function EscondeOsObjects() {
        var objects = document.getElementsByTagName("object");
        for (i = 0; i < objects.length; i++)
            objects[i].style.display = 'none';
    }

    function MostraOsObjects() {
        var objects = document.getElementsByTagName("object");
        for (i = 0; i < objects.length; i++)
            objects[i].style.display = 'block';
    }
	
	// Remove o preview das imagens, video e arquivos apos usuario comparilhar pelo diga lá.
	function limpaPreviewImagemVideoArquivosDigaLa() 
    {
		$('#container_preview_video').hide();
		$("#previewImagemDigaLa").hide();
		
        $("#previewArquivosDigaLa").hide();
		
        $('#container_preview_video').empty();
		$("#previewImagemDigaLa").empty();
        $("#previewArquivosDigaLa").empty();

		var $caixa = $("#previewImagemDigaLa");
        var $divAdd = $("<div />").addClass("prev_midia").addClass("adicionar");
        var $aAdd = $("<a id='addImagemDigaLa'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");

        var $caixa2 = $("#previewArquivosDigaLa");
        var $divAdd2 = $("<div />").addClass("prev_midia").addClass("adicionar");
        var $aAdd2 = $("<a onclick='abrirArquivosDigaLa()' id='addArquivoDigaLa'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");

        $caixa.append($divAdd.append($aAdd));
        $caixa2.append($divAdd2.append($aAdd2));
    }
	
	// Remove o preview das imagens, video e arquivos apos usuario comparilhar pelo diga lá.
	function limpaPreviewImagemVideoArquivosDigaLaNovo() 
    {
		$('#container_preview_video').hide();
		//claudemir
        $("#previewImagemDigaLaNovo").hide();
		
        $("#previewArquivosDigaLa").hide();
		
        $('#container_preview_video').empty();
        $("#previewImagemDigaLaNovo").empty();
        $("#previewArquivosDigaLa").empty();

        var $caixa = $("#previewImagemDigaLaNovo");
        var $divAdd = $("<div />").addClass("prev_midia").addClass("adicionar");
        var $aAdd = $("<a id='addImagemDigaLa'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");
        
        var $caixa2 = $("#previewArquivosDigaLa");
        var $divAdd2 = $("<div />").addClass("prev_midia").addClass("adicionar");
        //var $aAdd2 = $("<a onclick='abrirArquivosDigaLa()' id='addArquivoDigaLa'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");
        $caixa.append($divAdd.append($aAdd));
        $caixa2.append($divAdd2.append($aAdd2));
    }
	
</script>

<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/mensagemRapida_3.2.0.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/criarTarefa_3.2.4.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/agenda-edu/atividadeEdu.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/agenda-edu/atividades-edu.js") %><%=Url.TimeStampLink() %>"></script>






<!-- 
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/upload_3.2.0.js") %><%=Url.TimeStampLink() %>"></script>
 <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">   -->
<!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
<input id="idUsuario" type="hidden" value="<%=Model.idUsuario%>" />    

<header class="mensagem_post_header">
	<a id="menu_diga_la" href="javascript:void(0);" class="dialogo_menu diga_la ativo">Diga lá</a>
	<%            
	if (Model.bolEducador && !bolCPPuro)       
	{
	%>
	<a id="menu_criar_tarefa" href="javascript:void(0);" class="dialogo_menu criar_tarefa ">Criar tarefa</a>
	<%
	}
	%>
</header>

<!-- Diga lá -->
<section id="blocoDigaLa" class="bloco_dialogo">

	<div class="caixa_dialogo">
	
		<textarea id="txtInput" class="campo_dialogo" autocomplete="off" cols="50" rows="1" placeholder="Olá! Compartilhe aqui a sua ideia ou link..." title="Olá! Compartilhe aqui a sua ideia ou link..."></textarea>
		
		<%
		if (Model.bolEducador)
		{
        %>
        
              <!-- Fine Uploader Gallery template
    ====================================================================== -->
    <script type="text/template" id="qq-template-gallery" charset="UTF-8">
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
				            <img class="qq-thumbnail-selector"  qq-max-size="120" qq-server-scale>
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

    <div id="fine-uploader-gallery"></div>   

			<!-- Preview de arquivo anexado -->
			<!-- <div id="previewArquivosDigaLa" data-idarquivomultimidia="<%=idArquivoMultimidia %>" style="display:none; height: 600px;"> -->
			
				<!-- Adicionar mais arquivos -->
				<!-- <div class="prev_midia adicionar1">
					<a id="addArquivoDigaLa" onclick="abrirArquivosDigaLa()" href="javascript:void(0);" class="btn_acao opcao_adicionar">Adicionar :</a>
				</div>
			</div> -->
			
			<%
			if (bolConfigFile)
			{
			%>
			
				<!-- Preview de vídeo anexado -->
				<div class="preview_vid_post preview_anx_post" id="container_preview_video" style="display:none;">

				</div>
			<%
			}
			%>
			
			<%
			if (bolConfigImagem)
			{ 
			%>
				
				
				<div id="previewImagemDigaLaNovo" class="preview_img_post preview_anx_post" data-idalbum="<%=idAlbum %>" style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>                
				
				<div id="previewFileDigaLaNovo" class="preview_img_post preview_anx_post" data-idArquivoMultimidia="<%=idArquivoMultimidia %>" style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>				
				
</div>
        

   
                <div id="preview_diario" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" src="/AVA/Modais/modal-diario.html" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>	


                  <div id="preview_comunicado" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" src="/AVA/Modais/modal-comunicado.html" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>		


                <div id="preview_cardapio" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" src="/AVA/Modais/modal-cardapio.html" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>		

                <div id="preview_plano" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" src="/AVA/Modais/modal-plano.html" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>	
    
                 <div id="preview_saude" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" src="/AVA/Modais/modal-saude.html" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>	

                <div id="preview_mensagem" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" src="/AVA/Modais/modal-mensagem.html" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>

                 <div id="preview_criar_evento" class="preview_img_post preview_anx_post"  style="display:none; width: 400px; height: 550px; overflow: hidden;">
					<iframe name="UploadFile" id="Upload_frame" src="/AVA/Modais/modal-criar-evento.html" style="width: 100%; height: 100%; border:0;">

					</iframe>
				</div>


    <script>

            var idUser = localStorage.getItem('idUser');
            var idUsuarioRecebe = idUser;

            var idFerramenta = g_idArquivoMultimidia;

            var idFerramentaTipo = 0;
            
            var fileNameUp = "";
            var tamanho = 0;

            idFerramentaTipo = 35;

            var length = 0 ;
            var name = "";
            
            //dev            

            var galleryUploader = new qq.FineUploader({
                element: document.getElementById("fine-uploader-gallery"),
                template: 'qq-template-gallery',
                autoUpload: true,
                request: {
                    endpoint: '/ava/Mural/Home/UploadFile',
                    customHeaders: {
                        "idUsuarioRecebe": idUsuarioRecebe, 
                        "idFerramenta": idFerramenta, 
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

                        //Objeto criado para Foto
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


                           $("#dialogo_acoes").show();
                        $("#seletorMuralDigaLa").show();
                        preparaAvaSelector();
                        
                        $('#compartilhar').show();
                        $("#btnCancelarFerramentaMural").show();
                        $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

                        $('#compartilhar').removeClass('disable').prop("disabled", false);

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

                                      $("#visualizarPost").removeClass("disable").removeAttr("disabled", "disabled");
                                                        $(".sep_digala").slideDown(200);
                                }
                        }

                        if(responseJSON.tipo == 3 || responseJSON.tipo == 0 ){

                        //Objeto criado para Arquivos                            
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

                                  $("#visualizarPost").removeClass("disable").removeAttr("disabled", "disabled");
                                                        $(".sep_digala").slideDown(200);

                                console.log('agora sim');
                                //$("#compartilhar").hide();
                                $("#txtInput").focus();

                            }
                        }

/*									var itemNome = g_mensagemRapidaFile.nome;
								    var result = itemNome.match(caracterPermitido);
								    if(result.length>0){
								    	alert("O nome do Arquivo não pode conter caracteres especiais como: !,?,ç...");
								         deleteItem();
								    }
*/

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







/*						var idLista = g_mensagemRapidaFile.idPosition;

/*
						 var idClasse = document.getElementsByClassName("tipoArquivo_fineUpload");*/

/*console.log(this.getUuid(id));*/
/*						switch (responseJSON.extensao) {
							    case ".pdf":
							    var node = document.createElement("SPAN");
								var textnode = document.createTextNode(".pdf");
								node.appendChild(textnode);
								idClasse[idLista].appendChild(node);

							        break;
							    case ".doc":
							    var node = document.createElement("SPAN");
								var textnode = document.createTextNode(".doc");
								node.appendChild(textnode);
								idClasse[idLista].appendChild(node);
							        break;
							    case ".txt":
							    var node = document.createElement("SPAN");
								var textnode = document.createTextNode(".");
								node.appendChild(textnode);
								idClasse[idLista].appendChild(node);
							        break;
							    default:
							        preventDefault();
						}
*/












                     




                        

                    },
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
            });

            function deleteItem(){
                console.log(this.id);
            }          

        </script>


			<%
			}
			%>
			
		<%
		 }
		%>
	</div>
	<!-- Fim - Caixa de diálogo -->
	<!-- JavaScript at the bottom for fast page loading -->

  <!-- scripts concatenated and minified via ant build script-->
  <script defer src="/AVA/StaticContent/Common/Scripts/plugins.js<%=Url.TimeStampLink() %>"></script>
  <script defer src="/AVA/StaticContent/Common/Scripts/script_3.0.0.js<%=Url.TimeStampLink() %>"></script>
  <!-- end scripts-->
	
	<%
	if (Model.bolEducador)
	{ 
	%>
		<!-- Inserção de mídias -->
		<div class="dialogo_multimidia right">
			<%
			if (bolConfigImagem)
			{ 
			%>
				<a href="javascript:void(0);" id="multimidia_imagens" class="multimidia_imagens">Imagens</a>
			<%
			}
			if (bolConfigVideo)
			{ 
			%>
				<a href="javascript:void(0);" id="multimidia_video" class="multimidia_video">Vídeo</a>
			<%
			}
			if (bolConfigFile)
			{
			%>
				<a href="javascript:void(0);" id="multimidia_documentos" class="multimidia_documentos">Arquivos</a>

			<%
			}
			%>
		</div>
		
		
	<%
	}
	%>	
	<section class="modulos_extras">
		
		<div class="enviar_video" id="enviar_video" style="display:none;">
			<input type="text" placeholder="Cole aqui a url do vídeo do YouTube ou Vimeo" id="txtLinkVideoMensagem"/>
		</div>
		<div id="erro_enviar_video" class="feed_erro" style="display: none">A URL inserida acima é inválida ou não existe.</div>
		<div class="verificavideo" style="display: none">Verificando URL...</div>
		<input type="hidden" value="" id="urlVideoOriginal" />      
			
		<div id="seletorMuralDigaLa" class="seletor_compartilhamento" style="display: none;"></div>        
			
		<!-- Ações de finalização de nova postagem -->
		<div class="dialogo_acoes" id="dialogo_acoes" style="display:none;">
			<div class="btn_acoes right">
				<input type="button" name="cancelar" id="btnCancelarFerramentaMural" value="Cancelar" class="" disabled=""> 
				<input type="button" name="compartilhar" id="compartilhar" value="Compartilhar" class="compartilhar disable" style="" disabled="">
				<input type="button" name="agendar" id="agendar" value="Agendar" class="agendar" style="display:none;">
                
			</div>

			<!-- Feedback -->
			<p style="display:none;" id="feed_erro" class="feed_erro">Você precisa adicionar participantes</p>

		</div>
			
	</section>      
	        
</section>

<section id="area_criar_tarefa" class="bloco_tarefa" style="display:none;">
	<div class="loader"><img src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif"></div>
</section>