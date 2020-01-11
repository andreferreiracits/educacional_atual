var contFile = 8000;
var contImg = 2000;


jQuery(function ($) {

    //TODO:::
    /*
    var idFerramentaTipoTimeLine = 35; //constante
    var idFerramentaTipoGrupo = 36; //constante
    var idFerramentaTipoTimeLineFile = 37; //constante
    var idFerramentaTipoGrupoFile = 38; //constante
    var objetoImagens = { imagens: new Array()};
    */

    $("#menu_criar_tarefa").click(function () {
        abrirCriarTarefa();
    });

    $("#menu_diga_la").click(function () {
        abrirDigaLa();
    });

    $("#multimidia_imagens").click(function () {
        abreUploadImagemTimeLineNovo();
    });

    $("#multimidia_video").click(function () {
        bloqueiaOutrosDigaLa(true);
        if (!$("#enviar_video").is(":visible")) {
            $("#enviar_video").show();
            $("#seletorMuralDigaLa").show();
            preparaAvaSelector();

            $("#dialogo_acoes").show();
            $('#compartilhar').show();
            $("#btnCancelarFerramentaMural").show();
            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
        }
    });

    $("#multimidia_documentos").click(function () {
        abrirUploadArquivosDigaLa();
    });
	
	$( "#previewImagemDigaLaNovo" ).dialog({
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

});

function abrirUploadArquivosDigaLa() {
    abreUploadFileTimeLine();
    $("#dialogo_acoes").show();
    $("#seletorMuralDigaLa").show();
    $('#compartilhar').show();
    $("#btnCancelarFerramentaMural").show();
    $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
}

function abrirDigaLa() {
    $('#area_criar_tarefa').hide();
    $('#menu_criar_tarefa').removeClass('ativo');
    $('#menu_diga_la').addClass('ativo');
    $('#area_diga_la').show();
    $('#conteudo_criar_tarefa').empty();

    $("#agendar").hide();
    $('.dialogo_multimidia.right').show();

    $(".verificavideo").hide();
    $("#erro_enviar_video").hide();
    $(".enviar_video").hide();
    $("#seletorMuralDigaLa").hide();
    $("#container_preview_video").hide();

    $("#btnCancelarFerramentaMural").click();
    $(".preview_arq_post").hide();
    $(".busca_especifico").val("");

    $("#blocoDigaLa").show();
}

function preparaVisualizacaoArquivosDigaLa(obj) {
    // var $caixa = $("#previewArquivosDigaLa");
    // if ($caixa.find(".prev_midia.adicionar:first").hasClass("adicionar") == false) {
    //     var $divAdd = $("<div />").addClass("prev_midia").addClass("adicionar");
    //     var $aAdd = $("<a id='addArquivoDigaLa' onclick='abrirArquivosDigaLa()'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");
    //     $caixa.append($divAdd.append($aAdd));
    // }

    console.log(JSON.stringify(obj));

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

            var htmlObject = '' +

            

            '<li class="qq-file-id-'+contFile+' qq-upload-success" qq-file-id="'+contFile+'">'+
                    '<span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>'+
                    '<div class="qq-progress-bar-container-selector qq-progress-bar-container qq-hide">'+
                      '  <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar" style="width: 100%;"></div>'+
                    '</div>'+
                    '<span class="qq-upload-spinner-selector qq-upload-spinner qq-hide"></span>'+

                    // '<div id= "miniatura" class="qq-thumbnail-wrapper">'+
                    //    ' <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale="" src="'+ jsonObject[i].diretorio+"/"+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+
                  
                    // '</div>'+

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
                    '<div class="qq-file-name">'+
                    '       <span class="qq-upload-file-selector qq-upload-file" title="'+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+jsonObject[i].arquivo+jsonObject[i].extensao+'</span>'+
                    '       <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>'+
                    '   </div>'+
                    '   <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">'+
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

            if (jsonObject[i].extensao == '.jpeg' || jsonObject[i].extensao == '.jpg' || jsonObject[i].extensao == '.gif' || jsonObject[i].extensao == '.png') {

                var idClasse = document.getElementsByClassName("tipoArquivo_fineUpload");
                var tamanhoValor = document.getElementsByClassName("tipoArquivo_fineUpload").length;
                var posicaoIcone = tamanhoValor - 1;
                idClasse[posicaoIcone].style.display = "none";

            } 
            else {

                // try{
                //     var idClasse = document.getElementsByClassName("tipoArquivo_fineUpload");
                //     var tamanhoValor = document.getElementsByClassName("tipoArquivo_fineUpload").length;
                //     var posicaoIcone = tamanhoValor - 1;
                //     console.log(posicaoIcone);

                //     var node = document.createElement("SPAN");
                //     var textnode = document.createTextNode(jsonObject[i].extensao);
                //     node.appendChild(textnode);
                //     idClasse[posicaoIcone].appendChild(node);
                //     idClasse[posicaoIcone].style.display = "block";
                // }
                // catch(err){

                // }
            }
            
            $('.qq-upload-list').append(htmlObject);
            contFile++;
        }

        // bloqueiaOutrosDigaLa(true);
        // $("#previewImagemDigaLa").show();
    }

    $("#compartilhar").removeClass("disable").removeAttr("disabled", "disabled");
 
    $('#seletorMuralDigaLa').show();

    $("#dialogo_acoes").show();
    
    preparaAvaSelector();

    $('#compartilhar').show();
}

//Abre 'componente' de upload para o usuario escolher os arquivos para o diga la.
function abreUploadFileTimeLine() {
    console.log("abreUploadFileTimeLine mensagemRapida");

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
    var idArquivoMultimidia = parseInt($("#previewFileDigaLaNovo").data("idarquivomultimidia"));
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
            "idFerramentaTipo": 37,//TODO::: idFerramentaTipoTimeLineFile,
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
        // o mForm.target tem que esta igual ao do div (mForm.target = "UploadFile" == <iframe name="UploadFile")
        mForm.target = "UploadFile";
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

//Abre 'componente' de upload para o usuario escolher os arquivos para o diga la.
function abreUploadFileTimeLineOld() {
    var flagContinua = true;
    var idArquivoMultimidia = parseInt($("#previewArquivosDigaLa").data("idarquivomultimidia"));
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
            "idFerramentaTipo": 37, //todo:::  idFerramentaTipoTimeLineFile,
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

//Abre 'componente' de upload para o usuario escolher as imagens para o diga la.
function abreUploadImagemTimeLineNovo() {
    console.log("##### abreUploadImagemTimeLineNovo ===="); 
	var flagContinua = true;
    var idalbum = parseInt($("#previewImagemDigaLaNovo").data("idalbum"));
    $.fancybox.showLoading();
    if (idalbum === undefined || idalbum == null || idalbum == 0) {
        $.ajax({
            url: "/ava/mural/home/  ",
            type: "POST",
            dataType: "json",
            async: !1,//false,
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
    //TODO:::
    if (flagContinua) {
        var idsArquivosPreSelecionados = new Array();
        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens !== undefined && objetoImagens.imagens.length > 0) {
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
        mForm.target = "Upload";
        mForm.method = "POST";
        mForm.action = "/AVA/Upload";

        document.body.appendChild(mForm);

        var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        if (Modernizr.touch) {
            parametros = null;
        }
        $("#previewImagemDigaLaNovo iframe").append(mForm);		
        mForm.submit();		
        $("#previewImagemDigaLaNovo").dialog("open");		
        $.fancybox.hideLoading();
    } 
}

//Abre 'componente' de upload para o usuario escolher as imagens para o diga la.
function abreUploadImagemTimeLine() {    
    var flagContinua = true;
    var idalbum = parseInt($("#previewImagemDigaLa").data("idalbum"));
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

function preparaVisualizacaoImagensDigaLa(obj) {

    console.log(JSON.stringify(obj));

    var jsonObject = (obj) ;

	// var $caixa = $("#previewImagemDigaLa");
    // if ($caixa.find(".prev_midia.adicionar:first").hasClass("adicionar") == false) {

    //     var $divAdd = $("<div />").addClass("prev_midia").addClass("adicionar");
    //     var $aAdd = $("<a id='addImagemDigaLa'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");

    //     $caixa.append($divAdd.append($aAdd));
    // }

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

            jsonObject[i].idPosition = contImg;
            

            var htmlObject = '' +

            '<li class="qq-file-id-'+contImg+' qq-upload-success" qq-file-id="'+contImg+'">'+
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

        $("#compartilhar").removeClass("disable").removeAttr("disabled", "disabled");
    
        $('#compartilhar').show();

        


        // $('#seletorMuralDigaLa').show();
        // $('#btnCancelarFerramentaMural').show();

        // console.log('Esta???');
        
        // $("#compartilhar").removeClass("disable");   
        
        // $("#compartilhar").removeAttr("disabled");   
        


        // $('#compartilhar').show();

        
        // bloqueiaOutrosDigaLa(true);
        // $("#previewImagemDigaLa").show();

        $("#compartilhar").removeClass("disable").removeAttr("disabled", "disabled");
 
        $('#seletorMuralDigaLa').show();
    
        $("#dialogo_acoes").show();
        
        preparaAvaSelector();
    
        $('#compartilhar').show();

    }
}



function deleteImg(d){
    // alert(d);
    // $("li.qq-file-id-"+d+".qq-upload-success").empty();

}

function preparaVisualizacaoImagensDigaLaNovo(obj) {
    var $caixa = $("#previewImagemDigaLaNovo");

    if ($caixa.find(".prev_midia.adicionar:first").hasClass("adicionar") == false) {
        var $divAdd = $("<div />").addClass("prev_midia").addClass("adicionar");
        var $aAdd = $("<a id='addImagemDigaLa'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");

        $caixa.append($divAdd.append($aAdd));
    }

    if (obj !== undefined && obj != null && obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            var caminhoImagem = obj[i].diretorio;
            var thumb = obj[i].thumbnail + obj[i].extensao;

            var $div = $("<div />").addClass("prev_midia").attr('data-idarquivo', obj[i].idArquivo);
            var $a = $("<a>Remover</a>").addClass("btn_acao").addClass("opcao_excluir").attr('onclick', 'removeImagemDigaLa(this)').attr("href", "javascript:void(0);");
            var $img = $("<div />").addClass("bloco_img").css("background-image", 'url(' + caminhoImagem + "/" + thumb + ')');

            $div.append($a).append($img);

            if ($caixa.find(".prev_midia:first").hasClass("adicionar")) {
                $caixa.prepend($div);
            } else {
                $caixa.find(".prev_midia").not(".adicionar").last().after($div);
            }
        }

        bloqueiaOutrosDigaLa(true);
        $("#previewImagemDigaLaNovo").show();
    }
}

function removeImagemDigaLa(img) {
    var parent = img.closest(".prev_midia");
    var idarquivo = parseInt(parent.dataset.idarquivo);
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
        if ($.trim($("#txtInput").val()) == "" || $.trim($("#txtInput").val()).toLowerCase() == "olá! compartilhe aqui a sua ideia ou link...") {
            $("#compartilhar").addClass("disable").prop("disabled", true);
			$("#previewImagemDigaLa").hide();
            $("#compartilhar").hide();
            $("#btnCancelarFerramentaMural").hide();
            $("#seletorMuralDigaLa").hide();
            $("#dialogo_acoes").hide();
        }
        else {
			$("#previewImagemDigaLa").hide();
        }
        bloqueiaOutrosDigaLa();
    }
}

function removeArquivoDigaLa(arquivo) {
    var parent = arquivo.closest(".prev_midia");
    var idarquivo = parseInt(parent.dataset.idarquivo);
    if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
        for (var i = 0; i < objetoArquivos.arquivos.length; i++) {
            if (objetoArquivos.arquivos[i].idArquivo == idarquivo) {
                objetoArquivos.arquivos.splice(i, 1);
                parent.remove();
                break;
            }
        }
    }

    if (objetoArquivos === undefined || objetoArquivos == null || objetoArquivos.arquivos.length == 0) {
        if ($.trim($("#txtInput").val()) == "" || $.trim($("#txtInput").val()).toLowerCase() == "olá! compartilhe aqui a sua ideia ou link...") {
            $("#compartilhar").addClass("disable").prop("disabled", true);
            $("#previewArquivosDigaLa").hide();
            $("#compartilhar").hide();
            $("#btnCancelarFerramentaMural").hide();
            $("#seletorMuralDigaLa").hide();
            $("#dialogo_acoes").hide();
        }
        else {
            $("#previewArquivosDigaLa").hide();
        }
        bloqueiaOutrosDigaLa();
    }
}

function preparaImagensDigaLa(jsonRetorno) {
    var auxImagens = [];

    //Remove os arquivos desselecionados no upload
    var bolArquivoExiste = false;
    if (objetoImagens.imagens != null) {
        for (var j in objetoImagens.imagens) {
            bolArquivoExiste = false;
            for (var i in jsonRetorno.arrayArquivo) {
                if (jsonRetorno.arrayArquivo[i].id == objetoImagens.imagens[j].idArquivo) {
                    bolArquivoExiste = true;
                    auxImagens.push(objetoImagens.imagens[j]);
                }
            }
            if (!bolArquivoExiste) {
				$('#previewImagemDigaLa').each(function () {
                    if ($(this).data("idarquivo") == objetoImagens.imagens[j].idArquivo) {
                        $(this).remove();
                        return false;
                    }
                });
            }
        }
    }

    objetoImagens.imagens = auxImagens;
    auxImagens = [];
    //Fim removendo 

    for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
        bolArquivoExiste = false;

        /*Só adiciona no array os arquivos recem selecionados, assim não faz uma nova ordem toda vez*/
        for (var j in objetoImagens.imagens) {
            if (objetoImagens.imagens[j].idArquivo == jsonRetorno.arrayArquivo[i].id) {
                bolArquivoExiste = true;
                break;
            }
        }

        if (!bolArquivoExiste) {
            var objImagem = {
                bolPaisagem: jsonRetorno.arrayArquivo[i].bolPaisagem,
                bolRetrato: jsonRetorno.arrayArquivo[i].bolRetrato,
                idArquivo: jsonRetorno.arrayArquivo[i].id,
                thumbnail: jsonRetorno.arrayArquivo[i].strThumbnail,
                arquivo: jsonRetorno.arrayArquivo[i].strArquivo,
                nome: jsonRetorno.arrayArquivo[i].strNome,
                descricao: jsonRetorno.arrayArquivo[i].strDescricao,
                diretorio: jsonRetorno.arrayArquivo[i].strDiretorio,
                extensao: jsonRetorno.arrayArquivo[i].strExtensao,
                altura: jsonRetorno.arrayArquivo[i].intAlturaImg,
                largura: jsonRetorno.arrayArquivo[i].intLarguraImg

            };

            g_arrayMensagemRapida.push(objImagem);

            // objetoImagens.imagens.push(objImagem);
            auxImagens.push(objImagem);
        }
    }

    objetoImagens.imagens.sort(function (a, b) {
        if (b.largura > a.largura)
            return 1;
        return 0;
    });
    objetoImagens.imagens.sort(function (a, b) {
        if (a.largura == b.largura) {
            if (b.altura < a.altura) {
                return 1;
            }
            return -1;
        }
        return 0;
    });

    if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
        if (!$("#compartilhar").is(":visible")) {
            $("#compartilhar").show();
        }
        if (!$("#btnCancelarFerramentaMural").is(":visible")) {
            $("#btnCancelarFerramentaMural").show();
        }
        if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
            $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false);
        }
        if ($("#compartilhar").hasClass("disable")) {
            $("#compartilhar").removeClass("disable").prop("disabled", false);
        }

        $("#seletorMuralDigaLa").show();
        $("#dialogo_acoes").show();
        preparaAvaSelector();

        $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

        //$('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
    } else {

        $("#compartilhar").addClass("disable").prop("disabled", true);
    }

    if (auxImagens !== undefined && auxImagens != null && auxImagens.length > 0) {
        if (!$("#previewImagemDigaLa").is(":visible")) {
			$("#previewImagemDigaLa").show();
        }

        preparaVisualizacaoImagensDigaLa(auxImagens);

        if (_projeto == 'grupo') {
            $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide();
        } else {
            $(".mensagem_multimidia").hide();
        }
    }
    // auxImagens.splice(0, auxImagens.length);
    // auxImagens = null;
}

function preparaArquivosDigaLa(jsonRetorno) {
    var auxFiles = [];
    //Remove os arquivos desselecionados no upload
    var bolArquivoExiste = false;
    if (objetoArquivos.arquivos != null) {
        for (var j in objetoArquivos.arquivos) {
            bolArquivoExiste = false;
            for (var i in jsonRetorno.arrayArquivo) {
                if (jsonRetorno.arrayArquivo[i].id == objetoArquivos.arquivos[j].idArquivo) {
                    bolArquivoExiste = true;
                    auxFiles.push(objetoArquivos.arquivos[j]);
                }
            }
            if (!bolArquivoExiste) {
                $('#previewArquivosDigaLa').each(function () {
                    if ($(this).parent().data("idarquivo") == objetoArquivos.arquivos[j].idArquivo) {
                        $(this).parent().remove();
                        return false;
                    }
                });
            }
        }
    }

    objetoArquivos.arquivos = auxFiles;
    auxFiles = [];
    //Fim removendo 

    for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
        //Evitando que arquivo seja adicionado com duplicidade
        bolArquivoExiste = false;
        if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
            for (var j in objetoArquivos.arquivos) {
                if (objetoArquivos.arquivos[j].idArquivo == jsonRetorno.arrayArquivo[i].id) {
                    bolArquivoExiste = true;
                    break;
                }
            }
        }

        if (!bolArquivoExiste) {
            var objFile = {
                idArquivo: jsonRetorno.arrayArquivo[i].id,
                arquivo: jsonRetorno.arrayArquivo[i].strArquivo,
                nome: jsonRetorno.arrayArquivo[i].strNome,
                descricao: jsonRetorno.arrayArquivo[i].strDescricao,
                diretorio: jsonRetorno.arrayArquivo[i].strDiretorio,
                extensao: jsonRetorno.arrayArquivo[i].strExtensao
            };

            g_arrayMensagemRapidaFile.push(objFile);

            if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                var t = objetoArquivos.arquivos.length;
                var bolAdicionar = true;
                for (var o = 0; o < t; o++) {
                    if (objetoArquivos.arquivos[o].idArquivo == objFile.idArquivo) {
                        bolAdicionar = false;
                        break;
                    }
                }
                if (bolAdicionar) {
                    // objetoArquivos.arquivos.push(objFile);
                    auxFiles.push(objFile);
                }
            } else {
                // objetoArquivos.arquivos.push(objFile);
                auxFiles.push(objFile);
            }
        }
    }

    if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
        $("#compartilhar").show();
        $("#btnCancelarFerramentaMural").show();

        if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
            $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false);
        }

        if ($("#compartilhar").hasClass("disable")) {
            $("#compartilhar").removeClass("disable").prop("disabled", false);
        }

        $("#seletorMuralDigaLa").show();
        $("#previewArquivosDigaLa").show();
        $("#dialogo_acoes").show();
        preparaAvaSelector();

        $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

        //$('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
    } else {
        $("#compartilhar").addClass("disable").prop("disabled", true);
    }

    if (auxFiles !== undefined && auxFiles != null && auxFiles.length > 0) {
        $("#previewArquivosDigaLa").show();
        $("#dialogo_acoes").show();

        preparaVisualizacaoArquivosDigaLa(auxFiles);

        if (_projeto == 'grupo') {
            $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide();
        } else {
            $(".mensagem_multimidia").hide();
        }
    }

    // auxFiles.splice(0, auxFiles.length);
    // auxFiles = null;
}

function removerPreviewVideoDigaLa() {
    $("#container_preview_video").fadeOut('slow', function () {

        $(this).find("iframe").attr('src', '');

        setTimeout(function () {
            $(this).find("iframe").remove();
            $(this).html("")
        }, 200);

        $("#txtLinkVideoMensagem").val("");

        var strMensagemPadrao = "Olá! Compartilhe aqui a sua ideia ou link...";
        var strMensagem = $('#txtInput').val();

        if ($.trim($("#txtInput").val()) == "" || $.trim($("#txtInput").val()).toLowerCase() == "olá! compartilhe aqui a sua ideia ou link...") {
            $("#compartilhar").addClass("disable").prop("disabled", true);
            $("#container_preview_video").hide();
            $("#compartilhar").hide();
            $("#btnCancelarFerramentaMural").hide();
            $("#seletorMuralDigaLa").hide();
            $("#dialogo_acoes").hide();
        }
        else {
            $("#container_preview_video").hide();
        }
    });
}



function bloqueiaOutrosDigaLa(bloqueia) {
    if (bloqueia) {
        $("#multimidia_video").hide();
        $("#multimidia_imagens").hide();
        $("#multimidia_documentos").hide();
    }
    else {
        $("#multimidia_video").show();
        $("#multimidia_imagens").show();
        $("#multimidia_documentos").show();
    }
}


