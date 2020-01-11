<%@ Page Language="C#"  MasterPageFile="~/Views/TES/Shared/Site.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Perfil.Models.MainPerfilPrivado>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">   

    <% 
        
    string idUsuarioCript = ViewData["idUsuarioCript"].ToString();
    var strLajotinhaTodos = "";

    var objPapelUsuarioLogado = (UsuarioAVA.Models.PapelUsuario)ViewData["objPapelUsuarioLogado"];
    var escolaEmRede = (bool)ViewData["escolaEmRede"];
    var escolaUnidade = (bool)ViewData["escolaUnidade"];

    if (objPapelUsuarioLogado.bolAluno)
    {
        strLajotinhaTodos = "Pode ser visto por seus colegas de turma, pais, responsáveis e seguidores.";
    }
    else if (objPapelUsuarioLogado.bolCoordenador || objPapelUsuarioLogado.admRedeSocial)
    {
        strLajotinhaTodos = "Pode ser visto por todos da sua escola.";
        if (escolaEmRede)
            strLajotinhaTodos = "Pode ser visto por toda rede de escolas.";
        else if (escolaUnidade)
            strLajotinhaTodos = "Pode ser visto por todas as unidades da escola.";
    }
    else
    {
        strLajotinhaTodos = "Pode ser visto por suas turmas, pais e responsáveis dos alunos das suas turmas, professores da sua escola e seguidores.";
    }    
    
    %>
    
    
    <script src="/AVA/StaticContent/Common/Scripts/jquery.seletorAVA_3.0.2.js<%=Url.TimeStampLink() %>" type="text/javascript"></script>
    <script src="/AVA/StaticContent/Common/Scripts/timeline_3.2.0.js<%=Url.TimeStampLink() %>" type="text/javascript"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.AvaSelector_3.4.7.js<%=Url.TimeStampLink() %>"></script>
    
    <script type="text/javascript" defer="defer">
        var seletorCurr = 0;

        var idUsuarioCriptTL = "<%=idUsuarioCript %>";

        function preparaAvaSelector(){
            if (!($("#seletorMuralDigaLa").AvaSelector("bolInstanciado"))) {
                //$('.dialogo').seletorAVA({ 'turma': true, 'seguidor': true, 'professor': true, 'callBack': 'retornoSeletorAVA', 'mural': true });
                $("#seletorMuralDigaLa").AvaSelector({
                    bolProfessor: <%=Model.bolAluno ? "false" : "true"%>,
                    bolLajota: true,
                    bolSeguidores: true,
                    bolAluno : true,
                    bolAdminCoordDiretor : <%=Model.bolAluno ? "false" : "true"%>,
                    bolResponsavel : <%=Model.bolAluno ? "false" : "true"%>,
                    botaoConclusao : $("#compartilhar"),
                    strTitulo : "Compartilhar com:",
                    btnTextoConclusao : "Adicionar",
                    btnTextoBotaoConclusaoSeletor : "Adicionar",
                    bolEscondeTituloExterno : true,
                    bolCoordenador : true,
                    insertLajota : function(u, g, seletor){                            
                        validaMensagemRapida(u, g);
                    },
                    strLajotinhaTodos: '<%=strLajotinhaTodos%>'
                });
            }
        }
        
        function retornoSeletorAVA(){
            if(seletorCurr==1){
            
                $('.selecao_personas').find('li[ident=seguidores]').hide();
                $('.selecao_personas').find('li[ident=professores]').hide();
                $('.compartilhamento').find('.todos').find('a:first').text('Minhas turmas ');
            }
        }
        
        $(function(){
        
            $('.dialogo > .blokletters').on('click', function(){
                if($(this).attr('pos') == 1){
                    $('.selecao_personas').find('.todos').find('.p-a-default').click();
                    $('.selecao_personas').find('li[ident=seguidores]').hide();
                    $('.selecao_personas').find('li[ident=professores]').hide();
                    $('.compartilhamento').find('.todos').find('a:first').text('Minhas turmas ');
                    seletorCurr=1;
               
                }else{
                    $('.selecao_personas').find('.todos').find('.p-a-default').click();
                    $('.selecao_personas').find('li[ident=seguidores]').show();
                    $('.selecao_personas').find('li[ident=professores]').show();
                    $('.compartilhamento').find('.todos').find('a:first').text('Todos ');
                    seletorCurr=0;               
                }
            });
        });

        $(function () {
            $('#txtInput').focus(function () {
                $('#compartilhar').show();
                $("#btnCancelarFerramentaMural").show();
                 $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                var strLinkVideo = "";

                if ($("#txtLinkVideoMensagem").val() != undefined) {
                    strLinkVideo = $("#txtLinkVideoMensagem").val();
                }

                if (strLinkVideo.length > 0) {
                    if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                        if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                            $('#compartilhar').removeClass('disable').prop("disabled", false);
                        }else {
                            $('#compartilhar').addClass('disable').prop("disabled", true);
                        }   
                    }
                } else {
                    var bolBlock = false;
                    if($(this).val().length <= 0 && objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens != null && objetoImagens.imagens.length == 0){
                        bolBlock = true;
                    } else {
                        bolBlock = false;
                    }
                    if(bolBlock && $(this).val().length <= 0 && objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos != null && objetoArquivos.arquivos.length == 0){
                         bolBlock = true;
                    } else {
                        bolBlock = false;
                    }
                    if(bolBlock){
                        $('#compartilhar').addClass('disable').prop("disabled", true);
                    }
                    /*if($(this).val().length <= 0){
                        $('#compartilhar').addClass('disable').prop("disabled", true);
                    } else {
                        $('#compartilhar').removeClass('disable').prop("disabled", false);
                    }*/
                }
            });

            <%
            if ((bool)ViewData["seletor"]) {
            %>
                //mostra elementos de compartilhamento
                $('#txtInput').focus(function () {
                    preparaAvaSelector();
                    //$('.compartilhamento').fadeIn('fast');
                
                    $("#seletorMuralDigaLa").show();
                    $('.sep_digala').fadeIn('fast');
                    
                    $('#compartilhar').show();                    

                });
 
                //selecao de alunos/educadores/turmas
                //$('.dialogo').seletorAVA({ 'turma': true, 'seguidor': true, 'professor': true, 'callBack':'retornoSeletorAVA'});
                 
                $('.compartilhamento').on('click', '.small-x', function () {
                    if ($('.compartilhamento').find('.small').length <= 1) {
                        $('#compartilhar').addClass('disable');
                    }
                });
 
                $('.selecao_personas').on('click', '.p-a-default', function () {
                    if ($('#txtInput').val() != '' && $('#txtInput').val() != strMensagemPadrao) {
                        $('#compartilhar').removeClass('disable');
                    }
                });
            <%} %>
 
            //$('#compartilhar').css('display','block');
 
            /********************************************************************
            * Carrega Veja Mais mensagens rápidas
            ********************************************************************/            
            $('#ava_fluxoarticles').on('click','.vejaMais_MR', see_more);     
 
            /********************************************************************
            * Carrega tip de opções de mensagens rápidas
            ********************************************************************/
            $('.ava_opcoesTimeline').cluetip({ cluetipClass: 'rounded', dropShadow: false, ajaxCache: false, arrows: false });
  
        }); 
       
            $('#txtInput').live('keyup', function () {
                var strMensagem = $(this).val();   
            
                var strLinkVideo = "";

                if ($("#txtLinkVideoMensagem").val() != undefined) {
                    strLinkVideo = $("#txtLinkVideoMensagem").val();
                }
 
                if (strMensagem == '' || strMensagem == strMensagemPadrao) {
                    if (strLinkVideo != "" && strLinkVideo != undefined) {
                        if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                            if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                                $('#compartilhar').removeClass('disable').prop("disabled", false);
                                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                            }else {
                                $('#compartilhar').addClass('disable').prop("disabled", true);
                                $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                            }
                        }
                    } else {
                        var bolBlock = false;
                        if(objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens != null && objetoImagens.imagens.length == 0){
                            bolBlock = true;
                        } else {
                            bolBlock = false;
                        }
                        if(bolBlock && objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos != null && objetoArquivos.arquivos.length == 0){
                             bolBlock = true;
                        } else {
                            bolBlock = false;
                        }
                        if(bolBlock){
                            $('#compartilhar').addClass('disable').prop("disabled", true);
                        }
                        
                    }

                    if (location.href.toLowerCase().indexOf("meuperfil") > -1) {
                            
                    } else {
                        $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
                    }
                    
                } else {
                    $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                    if (strLinkVideo != "" && strLinkVideo != undefined) {
                        if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                            if ($('#container_preview_video').find('iframe').attr('src').replace(/\s/g, '') != "") {
                                $('#compartilhar').removeClass('disable').prop("disabled", false);
                            }else {
                                $('#compartilhar').addClass('disable').prop("disabled", true);
                            }
                        }
                    } else {
                        $('#compartilhar').removeClass('disable').prop("disabled", false);
                    }
                    
                    if (location.href.toLowerCase().indexOf("meuperfil") > -1) {
                        
                    } else {
                        $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
                    }
                    
                }
 
            });

        <%if ((bool)ViewData["seletor"]) {%>
            function validaMensagemRapida(usuario, grupo) {
                        
            var inputSelected = "";
            var strLinkVideo = "";

            inputSelected = $('#txtInput').val();           

            if ($('#container_preview_video').find('iframe').attr('src') != undefined && $('#container_preview_video').find('iframe').attr('src') != "") {
                //strLinkVideo = $('#container_preview_video').find('iframe').attr('src').replace("//", "");
                strLinkVideo = removerListUrlYoutube($("#urlVideoOriginal").val());  
            }
                        
            if((inputSelected != strMensagemPadrao && inputSelected != "") || (strLinkVideo != undefined && strLinkVideo != "") || (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) || (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0)){
                inputSelected = inputSelected.replace(/\r?\n|\r/g, "<br>"); 
               
                if(g_arrayMensagemRapida.length > 0){

                  
                        objetoImagens = {'imagens':[]} ;

                    $.each( g_arrayMensagemRapida, function(index , item){

                        objetoImagens.imagens.push(item);

                    });

                    }

                    if(g_arrayMensagemRapidaFile.length > 0){

                        objetoArquivos = {'arquivos':[]} ;

                    $.each( g_arrayMensagemRapidaFile, function(  index, item  ){

                        objetoArquivos.arquivos.push(item);
                    });

                }

                    console.log('TEste 123');

                $.ajax({
                    url: '/AVA/Mural/Home/SaveMensagem',
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    data: { 
                        "usuario" : JSON.stringify(usuario),
                        "grupo" : JSON.stringify(grupo),
                        "mensagem" : inputSelected,
                        "video": strLinkVideo,
                        "imagens" : JSON.stringify(objetoImagens.imagens),
                        "arquivos" : JSON.stringify(objetoArquivos.arquivos)
                    },
                    success: function (data) {
                        try{
                            galleryUploader.reset();
                        }
                        catch(err){
                            
                        }

                        g_arrayMensagemRapida = [];
                        g_arrayMensagemRapidaFile = [];

                        $('#txtInput').val('');
                        $("#seletorMuralDigaLa").AvaSelector("limparUsuarios");
                        $("#seletorMuralDigaLa").hide();
                        $('.sep_digala').hide();
                        $('#compartilhar').hide();
                        $('#compartilhar').addClass('disable').prop("disabled", true);
                        $('#ava_fluxoarticles').prepend(data).find('article:first')<%=((Model.bolEducador) ? ".addClass('highlight')" : "")%>.slideDown(1000);
                                                                        
                        $(".ctn_msg:first").expander({
                            slicePoint: 500,
                            window: 2,
                            expandText: ' leia mais',
                            expandPrefix: '...',
                            userCollapseText: 'menos',
                            preserveWords: true,
                            expandEffect: 'fadeIn',
                            collapseEffect: 'fadeOut'
                        });

                        $('.icon_compartilhado_com:first').booleTip(booleTipOptions);

                        $(".e-wrap:first .iframeVideoVimeo").on('load', function () {
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

                        $("#ava_fluxoarticles").find("article:first").find('.thumbs_mural').each(function () {
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
                        
                        $("#ava_fluxoarticles").find("article:first").find(".imagens_mural").GaleriaAva();
                        //Diminuir tamanho do text area após envio de msg concluída
                        $('#txtInput').css("height","48px");
                        $('#txtInput').siblings(":last").html('');

                        //remove o vídeo
                        $("#container_preview_video").fadeOut('slow', function () {
                            
                            //correção do bug do vimeo no IE
                            $(this).find("iframe").attr('src', '');
                            setTimeout(function () {
                                $(this).find("iframe").remove();
                                $(this).html("");
                            }, 500);

                            $('.enviar_video').hide();
                            $('#txtLinkVideoMensagem').val("");
                        });
                        $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                        $("#btnCancelarFerramentaMural").hide();
                         $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                        $(".mensagem_multimidia").show();
                        if ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible")){
                            $(".dialogo .dialogo_box .preview_post.imagens").hide();
                        }
                        if ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")){
                            $(".dialogo .dialogo_box .preview_post.arquivos").hide();
                        }
                        limpaPreviewImagemMensagemRapida();
                        limpaArrayImagensTimeLine();
                        limpaPreviewArquivosMensagemRapida();
                        limpaArrayArquivosTimeLine();
                    },
                    error: function (data) {
                        if(data.status != 0){
                            console.debug("Ocorreu um erro no banco de dados.");
                        }
                        $('#compartilhar').removeClass('disable').prop("disabled", true);
                    }
                }); 
                $('#compartilhar').addClass('disable').prop("disabled", true);
           } else {
                return false;
           }
        }
        <%}else{ %>
        
            function validaMensagemRapida() {

                var strLinkVideo = "";

                if ($('#container_preview_video').find('iframe').attr('src') != undefined && $('#container_preview_video').find('iframe').attr('src') != "") {
                    //strLinkVideo = $('#container_preview_video').find('iframe').attr('src').replace("//", "");
                    strLinkVideo = removerListUrlYoutube($("#urlVideoOriginal").val());  
                }
                                
                 if($('#txtInput').val() != strMensagemPadrao || (strLinkVideo != undefined && strLinkVideo != "") || (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) || (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0)){       
                        $('#compartilhar').addClass('disable');
                        $.ajax({
                            url: '/AVA/Perfil/Home/SaveMensagemPublico/'+<%:Model.idUsuario%>,
                            type: 'POST',
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            data: {
                                    'StrMensagem': $('#txtInput').val().replace(/\r?\n|\r/g, "<br>"),
                                    'video' : strLinkVideo,
                                    "imagens" : JSON.stringify(objetoImagens.imagens),
                                    "arquivos" : JSON.stringify(objetoArquivos.arquivos)
                                  },
                            success: function (data) {
                                $('#txtInput').val('');    
                                $('#txtInput').css("height","48px");
                                $('#txtInput').siblings(":last").html('');                            
                                $('#ava_fluxoarticles').prepend(data).find('article:first')<%if (Model.bolVisitanteEducador){%>.addClass('highlight')<%} %>.slideDown(1000, function(){
                                    if($('#ava_fluxoarticles').find('article:last').text() == "Nenhuma mensagem por enquanto."){
                                        $('#ava_fluxoarticles').find('article:last').remove();
                                    }
                                });
                                
                                $("#ava_fluxoarticles .ctn_msg:first").expander({
                                    slicePoint: 500,
                                    window: 2,
                                    expandText: ' leia mais',
                                    expandPrefix: '...',
                                    userCollapseText: 'menos',
                                    preserveWords: true,
                                    expandEffect: 'fadeIn',
                                    collapseEffect: 'fadeOut'
                                });

                                $('.icon_compartilhado_com:first').booleTip(booleTipOptions);

                                $("#ava_fluxoarticles .iframeVideoVimeo:first").on('load', function () {
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

                                $("#ava_fluxoarticles").find("article:first").find('.thumbs_mural').each(function () {
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
                                $("#ava_fluxoarticles").find("article:first").find(".imagens_mural").GaleriaAva();

                                $('#busca_especifico').val('').keyup();
                                
                                //remove o vídeo
                                $("#container_preview_video").fadeOut('slow', function () {
                                    
                                    //correção do bug do vimeo no IE
                                    $(this).find("iframe").attr('src', '');
                                    setTimeout(function () {
                                        $(this).find("iframe").remove();
                                        $(this).html("");
                                    }, 500);

                                    $('.enviar_video').hide();
                                    $('#txtLinkVideoMensagem').val("");
                                });       
                                
                                $('#compartilhar').hide();
                                $('#compartilhar').addClass('disable').prop("disabled", true);   
                                $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                                $("#btnCancelarFerramentaMural").hide();
                                $("#btnCancelarFerramentaMural").closest('.sep_digala').hide();
                                $(".mensagem_multimidia").show();
                                if ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible")){
                                    $(".dialogo .dialogo_box .preview_post.imagens").hide();
                                }
                                if ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")){
                                    $(".dialogo .dialogo_box .preview_post.arquivos").hide();
                                }
                                limpaPreviewImagemMensagemRapida();
                                limpaArrayImagensTimeLine();     
                                limpaPreviewArquivosMensagemRapida();
                                limpaArrayArquivosTimeLine();               
                    
                            },
                            error: function (data) {
 
                                alert("Ocorreu um Erro no banco de dados.");
                                //$('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
 
                            }
                        }); 
                }
            }        
        <%} %>
    
    jQuery(function ($) {

        //Inicia fancybox denunciar
        var u = {
            afterShow: callBackDenunciaMensagem,
            helpers : {
                overlay : {
                    closeClick : false,
                    locked : false
                }
            },
            type: 'ajax',
            
            fitToView: false
        };

        lightBoxAVA($("a#ava_denunciar"), u);

    });

    /*
    function callBackDenunciaPerfil() {
        $('form[name=frmDenuncia]').find('h2').css({'position':'absolute','top':'-10px'});
        $('#enviar_email').live('click', function(){	
    
            $("#enviar_email").live("click", function() {
    
                if ($('#txtMotivo').val() != "") {

			        $.ajax({
				        data: { 'idMensagem': 0, 'strNome': $('#strNomeLogado').val(), 'strLogin': $('#strLoginLogado').val(), 'strEmail': $('#strEmailLogado').val(), 'strURL': $('#strURLCorrente').val(), 'strMotivo': 'Denúncia de perfil:' + $('#strLoginLogado').val() + '. Motivo: ' + $('#txtMotivo').val() },
				        type: "POST",
				        url: "/AVA/Barras/Denuncia/DenunciaMensagemGravar",				
				        contentType: "application/x-www-form-urlencoded;charset=UTF-8",				
				        success: function(data) {
				            alert("Sua denúncia foi encaminhada para análise dos administradores do ambiente.");
				            parent.$.fancybox.close();
				        }
			        });

                } else {
                    alert("Favor preencher o motivo!");
                    return false;
                }

            });
        });
    }
    */
   

    //TIMELINE
    $(function(){
        $.post('/AVA/Perfil/Home/TimeLine/<%:Model.strLogin%>',{}, function(data){
            $('#loader_timeline').hide();
            $('#ava_fluxoarticles').hide().append(data).fadeIn("fast", function(){
                                   
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
                $(".imagens_mural").GaleriaAva();
            });
            $('#loader_dialogo').remove();
            $('#txtInput').css('display','block');
            /*lightBoxAVA($('.denunciar_mensagem'), { 
                afterShow: callBackDenunciaMensagem, 
                type : "ajax",
                helpers: {
                    overlay: {
                        locked : false
                    }
                }
            });*/
            gostaram_das_mensagens();
            gostaram_dos_comentarios();
                                    
        });
        
    });


    var intInicioMsgPublica = 2;
    function see_more(e) {

                _this = $(this);
                _this.removeAttr('href');
                 $('#ava_fluxoarticles').off('click','.vejaMais_MR', see_more);

                e.preventDefault();
                //busca o id do hidden no final da view
                var id = $('#id').val();

                //carrega o loader
                $('.vejaMais_MR').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

                //posta a requisicao
                $.post("/AVA/Perfil/Home/TimeLinePrivado?id=" + id + "&intInicio=" + intInicioMsgPublica, function (data) {
                    $('#ava_fluxoarticles').on('click','.vejaMais_MR', see_more);
                    _this.parent().remove();
                    //sem nao tem msgs
                    if (data.indexOf('semMsgsRapidas') > -1) {
                        $('#ava_footervejamais').hide();
                    }
                    //se tem menos de 10 na requisicao
                    else if (data.indexOf('poucasMsgsRapidas') > 0) {
                        var _intPos = data.indexOf('poucasMsgsRapidas');
                        var _append = data.substring(0, _intPos);

                        $('#ava_fluxoarticles').append(_append).fadeIn("fast", function(){
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
                            $(".imagens_mural").GaleriaAva();
                        });
                        $('#ava_footervejamais').hide();

                        
                      

                        /*lightBoxAVA($('.denunciar_mensagem'), { 
                            afterShow: callBackDenunciaMensagem, 
                            type : "ajax",
                            helpers: {
                                overlay: {
                                    locked : false
                                }
                            }
                        });*/
                    }
                    //se retorno as 10
                    else {
                        $('#ava_fluxoarticles').append(data).fadeIn("fast", function(){
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
                            $(".imagens_mural").GaleriaAva();
                        });
                        intInicioMsgPublica += 1;
                        $('.vejaMais_MR').html("Veja mais");

                        
                        
                        /*lightBoxAVA($('.denunciar_mensagem'), {
                            afterShow: callBackDenunciaMensagem , 
                            type : "ajax",
                            helpers: {
                                overlay: {
                                    locked : false
                                }
                            }
                        });*/
                    }
                    gostaram_das_mensagens();
                    gostaram_dos_comentarios();
                });

                //remove o foco do veja mais
                $(this).blur();
            }

    </script>



</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">

    <section class="minhasInfos">
        <%
            if ((bool)ViewData["bolExcluido"] != false || (int)ViewData["idEstado"] == 6) { 
            %>
            	<div class="usuario_inativo">
					<span class="FontAwesome"></span>
					Usuário Inativo.
				</div>
            <%
            }
        %>    
    
  
            <%
                
             %>
            
            <p id="textoMinhaInfo"><%=Model.strTexto %></p>
            	
    </section>

    <%
    bool bolAcessoEscreverBloqueado = false;

    if (Model.segmentacaoBloqueio != null)
    {
        bolAcessoEscreverBloqueado = Model.segmentacaoBloqueio.bolBloqueado;
    }

    bool bolAlunoSemTurma = Convert.ToBoolean(ViewData["bolUsuarioSemTurma"]);
    bool bolAlunoNovo = Convert.ToBoolean(ViewData["bolAlunoNovo"]);
        
    if (bolAlunoSemTurma || bolAlunoNovo)
    {
        
    }
    else if (bolAcessoEscreverBloqueado && Model.intComunicacaoPermissao != 0)
    {
        %>
        <section class="banner_ferias_aluno">
			<h2>Férias! Aproveite para descansar.</h2>
			<p><%=Model.segmentacaoBloqueio.strTexto%></p>
		</section>
        <%
    } 
    else if (Model.bolAcessoEscrever && !(Model.bolSuspensoUsuarioVisitado) && Model.intComunicacaoPermissao == 1 && !(Model.bolSuspenso))
    {        
        Html.RenderPartial("../Home/Partials/MensagemRapida", Model);        
    }
    else if (Model.bolSuspensoUsuarioVisitado)
    {
        %><section class="dialogo clearfix"><div style="text-align:center;padding-bottom:15px"><b>Usuário temporariamente impossibilitado de receber mensagens.</b></div></section><%
    }
    else if (Model.bolSuspenso)
    {

        DateTime dataIni = Convert.ToDateTime(Model.dtmInicioSuspensao);
        DateTime dataFim = Convert.ToDateTime(Model.dtmFimSuspensao);
        string format = "dd/MM/yyyy";
            
        %><section class="dialogo clearfix">
            <div style="text-align:center;padding-bottom:15px">
                <p>Você está impedido de enviar mensagens de <b><%:dataIni.ToString(format) %></b> até <b><%:dataFim.ToString(format)%></b></p>
                    <p>Motivo: 
                        <%
                            if (Model.strJustificativaSuspenso == "")
                            {
                                %>
                                        Não declarado.
                                <%
                            }
                            else
                            {
                                %>
                                    <%:Model.strJustificativaSuspenso%>
                                <%
                            }
                        %>
                     </p>
                    <p>Administrador(a): <%:Model.strNomeAdmin %></p>
            </div>
        </section><%
        }
    %> 
    
    <section class="hs1">		        
        <section class="timeline">
            <header>
                <h1 class="blokletters"><div class="icon_li mural"></div>MURAL</h1>
                <% 
                if (Model.bolPaiDoVisitado)
                {
                    %>
                    <span class="fr avaMR10 discreto"><a class="tooltip_title" title="Os responsáveis podem acompanhar a vida escolar de seus filhos com a visualização personalizada do perfil. Ela inclui as mensagens de interesse pedagógico como as enviadas pelos professores para o aluno.">O que é exibido para pais</a></span>    
                    <%          
                }    
                %>                
            </header>        
            <div style="padding:20px 47%;" id="loader_timeline"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>
            <div id="ava_fluxoarticles">
                <%//Html.RenderPartial("../Home/Partials/TimeLine", Model, new ViewDataDictionary { { "admRede", ViewData["admRede"] } }); %>     
            </div>             
            
            

        </section>	
    </section><!-- .hs1 -->
</asp:Content>














































