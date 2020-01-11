<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Mural.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Mural.Models.MainPerfilPrivado>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">
    <%

        string param = "";
        string turmaAluno = "";
        string idUsuarioCript = "";
        //string sessionSecrePai = "";
        string bolAVAPuroAux = "";
        var strLajotinhaTodos = "";
        int bolAVAPuro = 0;
        
        var objPapelUsuario = (UsuarioAVA.Models.PapelUsuario)ViewData["objPapelUsuario"];
        var escolaEmRede = (bool)ViewData["escolaEmRede"];
        var escolaUnidade = (bool)ViewData["escolaUnidade"];

        if (objPapelUsuario.bolAluno)
        {
            strLajotinhaTodos = "Pode ser visto por seus colegas de turma, pais, responsáveis e seguidores.";
        }
        else if (objPapelUsuario.bolCoordenador || objPapelUsuario.admRedeSocial)
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
        
        if (Model.bolEducador)
        {
            param = "educador";
        }
        else if (Model.bolAluno)
        {
            param = "aluno";
            turmaAluno = Session["Serie"].ToString(); //Model.strTurma;
            
        }
        else
        {
            param = "pai";
        }

        idUsuarioCript = ViewData["idUsuarioCript"].ToString();
        //sessionSecrePai = ViewData["sessionSecrePai"].ToString();
        bolAVAPuroAux = ViewData["bolAVAPuro"].ToString();
        if (bolAVAPuroAux == "" || bolAVAPuroAux == "null")
        {
            bolAVAPuroAux = "0";
        }
        bolAVAPuro = Convert.ToInt32(bolAVAPuro);    

    %>
    
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.AvaSelector_3.4.4.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/jquery.seletorAVA_3.0.2.js<%=Url.TimeStampLink() %>"></script>
    <script src="/AVA/StaticContent/Common/Scripts/timeline_3.2.0.js<%=Url.TimeStampLink() %>"
        type="text/javascript"></script>
    <script src="/AVA/StaticContent/Common/Scripts/ajaxfileupload(1).js<%=Url.TimeStampLink() %>"
        type="text/javascript"></script>
    <script type="text/javascript">
    
    var seletorCurr = 0;
    var idUsuarioCriptTL = "<%=idUsuarioCript %>";
    var instanciaSeletorMural = false;
    var instanciaSeletorMuralTarefa = false;

    function retornoSeletorAVA(){
        if(seletorCurr==1){
            $('.selecao_personas').find('li[ident=seguidores]').hide();
            $('.selecao_personas').find('li[ident=professores]').hide();
            $('.compartilhamento').find('.todos').find('a:first').text('Minhas turmas ');
        }
    }

    function preparaAvaSelector(){
        if (!($("#seletorMuralDigaLa").AvaSelector("bolInstanciado"))) {
                
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
                $('.troca_persona').text("Selecionar");
            }
        });
           
        
        //mostra elementos de compartilhamento
        $('#txtInput').focus(function () {
                            
            $("#seletorMuralDigaLa").show();
            $('.sep_digala').fadeIn("fast");
            
            preparaAvaSelector();

            $('#compartilhar').show();
            $("#btnCancelarFerramentaMural").show();
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
                
            }

        });

        $('#compartilhar').click(function(){
            if(!($(this).hasClass('disable'))){
                //validaMensagemRapida();
            }
        });

    });
    

    $(function () {

            

        $('#ava_fluxoarticles').on('click','.vejaMais_MR', see_more);

        /********************************************************************
        * Carrega tip de opções de mensagens rápidas
        ********************************************************************/
        $('.ava_opcoesTimeline').cluetip({ width: '60px', dropShadow: false, sticky: true, ajaxCache: false, arrows: false, positionBy: 'bottomTop', topOffset: 4, showTitle: false });
            
        /********************************************************************
        * Esconde o texto default do Diga-la
        ********************************************************************/
        $('#txtInput').live('focus', function () {
            if ($(this).text() == "Olá! Compartilhe aqui ideias ou links!") {
                $(this).text("");
            }
        }).blur(function () {
            if(navigator.userAgent.toLowerCase().search("android") > -1 || navigator.userAgent.toLowerCase().search("tb07sta") > -1){

            } else {
                if ($(this).text() == "") {
                    $(this).text("Olá! Compartilhe aqui ideias ou links!");
                }
            }

        });
    });

        /********************************************************************
        * Valida o post da mensagem rapida
        ********************************************************************/
        var strMensagemPadrao = "Olá! Compartilhe aqui ideias ou links!";

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
            } else {
               $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
               if (timeout == undefined || timeout != null) {
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
                }
            }

        });


        function validaMensagemRapida(usuario, grupo) {
            
            //Identificar se está no tablet ou no Computador
            var inputSelected = "";
            /*if(navigator.userAgent.toLowerCase().search("android") > -1 || navigator.userAgent.toLowerCase().search("tb07sta") > -1){
                inputSelected = $("#txtInput").next().html();
            } else {
             */   
            inputSelected = $('#txtInput').val();
            //}

            var strLinkVideo = "";

            if ($('#container_preview_video').find('iframe').attr('src') != undefined && $('#container_preview_video').find('iframe').attr('src') != "") {
                //strLinkVideo = $('#container_preview_video').find('iframe').attr('src').replace("//", "");
                strLinkVideo = removerListUrlYoutube($("#urlVideoOriginal").val());            
            }
            
            if((inputSelected != strMensagemPadrao && inputSelected != "") || (strLinkVideo != undefined && strLinkVideo != "") || (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) || (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0)){
                
                if (inputSelected == strMensagemPadrao) {
                    inputSelected = "";
                }

                inputSelected = inputSelected.replace(/\r?\n|\r/g, "<br>"); 
                
                $.jStorage.deleteKey("timeline" + idUsuarioCriptTL);
                //$.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                //Não deleta o cache de filtro por que está tratando o post e tarefa rapida.
               
                $.ajax({
                    url: '/AVA/Mural/Home/SaveMensagem',
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    data: { 
                        "usuario" : JSON.stringify(usuario),
                        "grupo" : JSON.stringify(grupo),
                        "mensagem" : inputSelected,
                        "video" : strLinkVideo,
                        "imagens" : JSON.stringify(objetoImagens.imagens),
                        "arquivos" : JSON.stringify(objetoArquivos.arquivos)
                    },
                    success: function (data) {
                        <%="var bolEducador = " + ((Model.bolEducador) ? "true" : "false") + ";"%>
                        var timelineFiltroValueH = $('#hTipoDePostMural').val();

                        $('#txtInput').val('');
                        $("#seletorMuralDigaLa").AvaSelector("limparUsuarios");
                        $("#seletorMuralDigaLa").hide();
                        $('.sep_digala').hide();
                        $('#compartilhar').hide();
                        $('#compartilhar').addClass('disable').prop("disabled", true);

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

                            $("#txtLinkVideoMensagem").val("");
                        });
                        $("#btnCancelarFerramentaMural").prop("disabled", true).addClass("disable");
                        $("#btnCancelarFerramentaMural").hide();
                        $(".mensagem_multimidia").show();
                        if ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible")){
                            $(".dialogo .dialogo_box .preview_post.imagens").hide();
                        }
                        if ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")){
                            $(".dialogo .dialogo_box .preview_post.arquivos").hide();
                        }
                        //Limpa preview de imagem

                        limpaPreviewImagemMensagemRapida();
                        limpaArrayImagensTimeLine();
                        limpaPreviewArquivosMensagemRapida();
                        limpaArrayArquivosTimeLine();
                        
                        if((bolEducador && (timelineFiltroValueH == 0 || timelineFiltroValueH == 1 || timelineFiltroValueH == 4)) 
                            || (!bolEducador && timelineFiltroValueH == 0)) {                       
    
                            $('#ava_fluxoarticles').prepend(data).find('article:first')<%if (Model.bolEducador){%>.addClass('highlight')<%} %>.slideDown(1000);
                            $("#ava_fluxoarticles article:first p.ctn_msg:first").expander({
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

                            $("#ava_fluxoarticles article:first .iframeVideoVimeo").on('load', function () {
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
                                $(this).find('a').each(function(e){
                                    if($(this).css("display") != "none"){
                                        totalImg++;
                                        $(this).find("img").one("load", function(){
                                            todosCarregados++;
                                            //var menorAltura = $(this).find('img:first').height();
                                            var maiorAltura = $(this).height();

                                            if(todosCarregados == totalImg){

                                                $este.find('img:visible').each(function (i) {

                                                    var img = $(this);

                                                    var alturaCorrente = img.height();

                                                    if (alturaCorrente > maiorAltura) {
                                                        maiorAltura = alturaCorrente;
                                                    }

                                                    if (i == (totalImg - 1)) {
                                                        $este.closest('div').css('height', maiorAltura);
                                                        $este.find("img").css({"height": maiorAltura, "width" : 217});
                                                    }

                                                });
                                            }
                                
                                        }).each(function(){
                                            if(this.complete) 
                                                $(this).load();
                                        });
                                    }
                                });
            
                            });                        
                        
                            $("#ava_fluxoarticles").find("article:first").find(".imagens_mural").GaleriaAva();                            
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

        function mycarousel_initCallback(carousel)
	    {
		    // Disable autoscrolling if the user clicks the prev or next button.
		    carousel.buttonNext.bind('click', function() {
			    carousel.startAuto(0);
		    });

		    carousel.buttonPrev.bind('click', function() {
			    carousel.startAuto(0);
		    });

		    // Pause autoscrolling if the user moves with the cursor over the clip.
		    carousel.clip.hover(function() {
			    carousel.stopAuto();
		    }, function() {
			    carousel.startAuto();
		    });
	    };

        var bolAlunoNovo = '<%=Session["bolAlunoNovo"]%>'.toLowerCase();
        
        if (bolAlunoNovo == "false" || bolAlunoNovo == "") {
            
            jQuery(function($){
                var elementoDivulga = $(".divulga");
                
                try {
                    if (idUsuarioCriptTL != 0) {
                        var cacheDestaque = $.jStorage.get("cacheDestaque" + idUsuarioCriptTL);
                    
                        if(!cacheDestaque){
                              elementoDivulga.empty().html("<div style='width:43px; height:11px; margin: 0 auto; top: 50%;'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>");
                                $.ajax({
                                    url: "/esc_include/inc_home/inc_home_destaques_ava.asp",
                                    data: {paramPapelAva:"<%=param %>", paramTurmaAluno:"<%=turmaAluno %>"}, 
                                    async: true,
                                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                                    success: function(data){
                                        var qtdImagem = $(data).find("img").size();
                                        var i = 0;
                                        $(data).find("img").each(function(){
                                            var estaImagem = $(this);
                                            var caminho = estaImagem.attr("src");

                                            var img = new Image();
					                        // image onload
			                                $(img).load(function () {
						                        i++;
                                                if(i == qtdImagem){
                                                    elementoDivulga.empty().html(data);
                                                    setTimeout(function(){
                                                        $('#mycarousel').jcarousel({
			                                                scroll: 2,
			                                                auto: 6,
			                                                wrap: 'both',
			                                                initCallback: mycarousel_initCallback
		                                                });
                                                    }, 140);
                                                }
			                                }).attr("src", caminho);					                    
				                         });

                                        cacheDestaque = data;
                                        $.jStorage.set("cacheDestaque" + idUsuarioCriptTL, cacheDestaque);
                                        $.jStorage.setTTL("cacheDestaque" + idUsuarioCriptTL, 86400000); // expires in 10 minutos
                                    },
                                    error: function(data){
                                        if(data.status != 0){
                                            //alert(data.status);
                                            console.debug(data.status);
                                        }
                                    }
                        
                            });
                       
                        } else {
                       
                            elementoDivulga.empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                            var qtdImagem = $(cacheDestaque).find("img").size();
                            var i = 0;
                            $(cacheDestaque).find("img").each(function(){
                                var estaImagem = $(this);
                                var caminho = estaImagem.attr("src");

                                var img = new Image();
					            // image onload
			                    $(img).load(function () {
						            i++;
                                    if(i == qtdImagem){
                                        elementoDivulga.empty().html(cacheDestaque);
                                        setTimeout(function(){
                                            $('#mycarousel').jcarousel({
			                                    scroll: 2,
			                                    auto: 6,
			                                    wrap: 'both',
			                                    initCallback: mycarousel_initCallback
		                                    });
                                        }, 140);
                                    }
			                    }).attr("src", caminho);					                    
				                }); 
                        }

                    } else {
                        //$('.divulga').hide();
                            elementoDivulga.empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                            $.ajax({
                                url: "/esc_include/inc_home/inc_home_destaques_ava.asp",
                                data: {paramPapelAva:"<%=param %>", paramTurmaAluno:"<%=turmaAluno %>"}, 
                                async: true,
                                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                                success: function(data){                               
                                    var qtdImagem = $(data).find("img").size();
                                    var i = 0;
                                    $(data).find("img").each(function(){
                                        var estaImagem = $(this);
                                        var caminho = estaImagem.attr("src");

                                        var img = new Image();
					                    // image onload
			                            $(img).load(function () {
						                    i++;
                                            if(i == qtdImagem){
                                                elementoDivulga.empty().html(data);
                                                //elementoDivulga.hide();
                                                setTimeout(function(){
                                                    //elementoDivulga.show();
                                                    $('#mycarousel').jcarousel({
			                                            scroll: 2,
			                                            auto: 6,
			                                            wrap: 'both',
			                                            //itemFallbackDimension : 300,
			                                            initCallback: mycarousel_initCallback
		                                            });
                                                    $("#mycarousel").css("height", "230px");
                                                }, 140);
                                            }
			                            }).attr("src", caminho);					                    
				                        });
                                
                                    cacheDestaque = data;
                                    $.jStorage.set("cacheDestaque" + idUsuarioCriptTL, cacheDestaque);
                                    $.jStorage.setTTL("cacheDestaque" + idUsuarioCriptTL, 86400000); // expires in 10 minutos
                                },
                                error: function(data){
                                    if(data.status != 0){
                                        //alert(data.status);
                                        console.debug(data.status);
                                    }
                                }
                        
                            //$('section[class=divulga]').load('/esc_include/inc_home/inc_home_destaques_ava.asp');
                        });
                    }
                } catch(err){
                    console.log(err.message);
            
                       // $('.divulga').hide();
                       elementoDivulga.empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                        $.ajax({
                            url: "/esc_include/inc_home/inc_home_destaques_ava.asp",
                            data: {paramPapelAva:"<%=param %>", paramTurmaAluno:"<%=turmaAluno %>"}, 
                            async: true,
                            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                            success: function(data){
                                /*$('.divulga').show();
                                elementoDivulga.empty().html(data);
                                setTimeout(
                                    function(){
                                        $('#mycarousel').jcarousel({
			                                scroll: 2,
			                                auto: 6,
			                                wrap: 'both',
			                                itemFallbackDimension : 300,
			                                size: 6,
			                                initCallback: mycarousel_initCallback
		                                });
                                    }, 1000);*/
                                var qtdImagem = $(data).find("img").size();
                                var i = 0;
                                $(data).find("img").each(function(){
                                    var estaImagem = $(this);
                                    var caminho = estaImagem.attr("src");

                                    var img = new Image();
					                // image onload
			                        $(img).load(function () {
						                i++;
                                        if(i == qtdImagem){
                                            elementoDivulga.empty().html(data);
                                            //elementoDivulga.hide();
                                            setTimeout(function(){
                                                //elementoDivulga.show();
                                                $('#mycarousel').jcarousel({
			                                        scroll: 2,
			                                        auto: 6,
			                                        wrap: 'both',
			                                        //itemFallbackDimension : 300,
			                                        initCallback: mycarousel_initCallback
		                                        });
                                                $("#mycarousel").css("height", "230px");
                                            }, 140);
                                        }
			                        }).attr("src", caminho);					                    
				                    });
                            
                            },
                            error: function(data){
                                if(data.status != 0){
                                    //alert(data.status);
                                    console.debug(data.status);
                                }
                            }
                        });
                        //$('section[class=divulga]').load('/esc_include/inc_home/inc_home_destaques_ava.asp');
                }
            });


        } //bolAlunoNovo
        
        
        //TIMELINE               
        if (idUsuarioCriptTL != 0) {
            try {
                var timelineValue = $.jStorage.get("timeline" + idUsuarioCriptTL);
            } catch (err) {
                var timelineValue = '';
            }

            if (!timelineValue) {
                carregaTimeLine(1);                
            }else{       
                window.setTimeout(executaCarregamentoTL, 500);
            }   
        }else{
            carregaTimeLine(0);
        }
        
        //Tratando filtro mural quando recarrega a pagina
        $(document).ready(function(){
            var timelineFiltroValue = $.jStorage.get("timelineFiltro" + idUsuarioCriptTL);
            var timelineFiltroValueH = $('#hTipoDePostMural').val();
            
            if(timelineFiltroValue)
            {
                timelineFiltroValueH = timelineFiltroValue;
                $('#hTipoDePostMural').val(timelineFiltroValueH);
            }else{
                $('#cbTipoDePostMural input[type=checkbox]').removeAttr("checked");
                $('#cbTipoDePostMural li[filtrotipo=0] input[type=checkbox]').attr("checked", "checked");
                $('#hTipoDePostMural').val(0);
            }

            if(timelineFiltroValueH > 0)
            {
                $('#cbTipoDePostMural input[type=checkbox]').removeAttr("checked");
                var liFiltroSelecionadoSeletor = '#cbTipoDePostMural li[filtrotipo=' + ($('#hTipoDePostMural').val()) + ']';
                $('input[type=checkbox]', liFiltroSelecionadoSeletor).attr("checked", "checked");
                var txtTextoMural = $.trim($(liFiltroSelecionadoSeletor).attr("subtexto"));
                if (txtTextoMural.length > 0)
                    txtTextoMural += ': ';
                txtTextoMural += $.trim($(liFiltroSelecionadoSeletor).text()) + ' <span class="caret">';
                $('#txtTipoDePostMural').html(txtTextoMural);
            }
        });
        //Fim tratamento cache filtro mural                

function setSessionSecre() {

     $.ajax({
        url: "/AVA/Mural/Home/SetSessionSecretaria",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {

        },
        error: function (data) {
            console.debug(data.status);
        }
     });

}
        
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

    //Verifica se está filtrando
    var strTipoFiltro = $('#hTipoDePostMural').val();
    if(strTipoFiltro > 0)
        strTipoFiltro = '&tipoFiltro=' + strTipoFiltro;
    else
        strTipoFiltro = '';

    //posta a requisicao
    $.post("/AVA/Mural/Home/TimeLinePrivado?id=" + id + "&intInicio=" + intInicioMsgPublica + strTipoFiltro, function (data) {

        var $resultadoTimeline = null;

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
            $resultadoTimeline = $(_append);

            $('#ava_fluxoarticles').append($resultadoTimeline);
            $('#ava_footervejamais').hide();            
        }
        //se retorno as 10
        else {
            $resultadoTimeline = $(data);
            $('#ava_fluxoarticles').append($resultadoTimeline);
            intInicioMsgPublica += 1;
            $('.vejaMais_MR').html("Veja mais");            
        }
        $('.thumbs_mural').each(function () {
            var $este = $(this);
            var totalImg = 0;
            var todosCarregados = 0;
            $(this).find('a').each(function(e){
                if($(this).css("display") != "none"){
                    totalImg++;
                    $(this).find("img").one("load", function(){
                        todosCarregados++;
                        
                        var maiorAltura = $(this).height();

                        if(todosCarregados == totalImg){

                            $este.find('img:visible').each(function (i) {

                                var img = $(this);

                                var alturaCorrente = img.height();

                                if (alturaCorrente > maiorAltura) {
                                    maiorAltura = alturaCorrente;
                                }

                                if (i == (totalImg - 1)) {
                                    $este.closest('div').css('height', maiorAltura);
                                    $este.find("img").css({"height": maiorAltura, "width" : 217});
                                }

                            });
                        }
                                
                    }).each(function(){
                        if(this.complete) 
                            $(this).load();
                    });
                }
            });
            
        });
        if($resultadoTimeline != null)
        {
            $('.banner_mural img', $resultadoTimeline).one('load', function () {
                var tamanhoBanner = $(this).width();                
                if (tamanhoBanner > 300) {                    
                    $(this).parent().parent().width('100%');
                }                    
            });
            $('.icon_compartilhado_com', $resultadoTimeline).booleTip(booleTipOptions);
        }
        $(".imagens_mural").GaleriaAva();

    });

    //remove o foco do veja mais
    $(this).blur();
}

var ajaxCarregaTimeLine = null;

function carregaTimeLine(storage){
    intInicioMsgPublica = 2;
    var strTipoFiltro = $('#hTipoDePostMural').val();
    if(!(strTipoFiltro > 0))
        strTipoFiltro = 0;

    if(ajaxCarregaTimeLine != null)
    {
        ajaxCarregaTimeLine.abort(); 
        $('#ava_fluxoarticles .container_error').remove();
        $('#loader_timeline').show();           
    }

    ajaxCarregaTimeLine = $.ajax({
        url: "/AVA/Mural/Home/TimeLine",       
        async: true,
        data: { tipoFiltro:strTipoFiltro },
        success: function (data) {      
            $('#loader_timeline').hide();

            var $resultadoTimeline = $(data);

            $('#ava_fluxoarticles').hide().html('').append($resultadoTimeline).fadeIn("fast", function(){
                
                 $('.thumbs_mural').each(function () {
                    var $este = $(this);
                    var totalImg = 0;
                    var todosCarregados = 0;
                    $(this).find('a').each(function(e){
                        if($(this).css("display") != "none"){
                            totalImg++;
                            $(this).find("img").one("load", function(){
                                todosCarregados++;
                                //var menorAltura = $(this).find('img:first').height();
                                var maiorAltura = $(this).height();

                                if(todosCarregados == totalImg){

                                    $este.find('img:visible').each(function (i) {

                                        var img = $(this);

                                        var alturaCorrente = img.height();

                                        if (alturaCorrente > maiorAltura) {
                                            maiorAltura = alturaCorrente;
                                        }

                                        if (i == (totalImg - 1)) {
                                            $este.closest('div').css('height', maiorAltura);
                                            $este.find("img").css({"height": maiorAltura, "width" : 217});
                                        }

                                    });
                                }
                                
                            }).each(function(){
                                if(this.complete) 
                                    $(this).load();
                            });
                        }
                    });
            
                });
            });
            $('#loader_dialogo').remove();
            $('#txtInput').css('display','block');
            $('.banner_mural img', $resultadoTimeline).one('load', function () {
                var tamanhoBanner = $(this).width();                
                if (tamanhoBanner > 300) {                    
                    $(this).parent().parent().width('100%');
                }                    
            });

            $('.icon_compartilhado_com', $resultadoTimeline).booleTip(booleTipOptions);
            
            if(storage == 1){
                try {
                    $.jStorage.set("timeline" + idUsuarioCriptTL, data);
                    $.jStorage.setTTL("timeline" + idUsuarioCriptTL, 180000); // expires in 3 minutos
                    $.jStorage.set("timelineFiltro" + idUsuarioCriptTL, strTipoFiltro);
                    $.jStorage.setTTL("timelineFiltro" + idUsuarioCriptTL, 180000); // expires in 3 minutos
                } catch (err) {
                }
            }

            $(".imagens_mural").GaleriaAva();

        },
        error: function (dataError) {

            if(dataError.statusText != 'abort'){
                
                $htmlErro = '<div class="container_error clearfix" style="padding: 15px;">';
                $htmlErro += '<h1 class="blokletters">Ops!</h1>';
                $htmlErro += '<h3>Aconteceu um erro inesperado. Por favor tente novamente em alguns instantes.</h3>';
                $htmlErro += '</div>';

                $Erro = "Aconteceu um erro inesperado. Por favor tente novamente em alguns instantes."

                $('#loader_timeline').hide();
                $('#ava_fluxoarticles').hide().append($htmlErro).fadeIn();

                $('#loader_dialogo').remove();
                $('#txtInput').html($Erro);
                $('#txtInput').css('font-weight','bold');
                $('#txtInput').css('display','block');
                 
                $('#txtInput').focus(function () {
                    $('.compartilhamento').hide();
                    $('#compartilhar').hide();
                });

            }
        }
    });
}

function executaCarregamentoTL(){
    $('#loader_timeline').hide();  
    
    var $resultadoTimeline = $(timelineValue)
      
    $('#ava_fluxoarticles').hide().append($resultadoTimeline).fadeIn("fast", function(){
         $('.thumbs_mural').each(function () {
            var $este = $(this);
            var totalImg = 0;
            var todosCarregados = 0;
            $(this).find('a').each(function(e){
                if($(this).css("display") != "none"){
                    totalImg++;
                    $(this).find("img").one("load", function(){
                        todosCarregados++;
                        
                        var maiorAltura = $(this).height();

                        if(todosCarregados == totalImg){

                            $este.find('img:visible').each(function (i) {

                                var img = $(this);

                                var alturaCorrente = img.height();

                                if (alturaCorrente > maiorAltura) {
                                    maiorAltura = alturaCorrente;
                                }

                                if (i == (totalImg - 1)) {
                                    $este.closest('div').css('height', maiorAltura);
                                    $este.find("img").css({"height": maiorAltura, "width" : 217});
                                }

                            });
                        }
                                
                    }).each(function(){
                        if(this.complete) 
                            $(this).load();
                    });
                }
            });
            
        });
    });    
    $('.banner_mural img', $resultadoTimeline).one('load', function () {
        var tamanhoBanner = $(this).width();                
        if (tamanhoBanner > 300) {                    
            $(this).parent().parent().width('100%');
        }                    
    });
    $('.icon_compartilhado_com', $resultadoTimeline).booleTip(booleTipOptions);
    $('#loader_dialogo').remove();
    $('#txtInput').css('display','block');
    $(".imagens_mural").GaleriaAva();
                   
}
    </script>
</asp:Content>
<asp:Content ContentPlaceHolderID="ContentAreaAdvertencias" ID="ContentAreaAdvertencias" runat="server">
    
        <%
            bool bolAcessoEscreverBloqueado = false;
            bool bolUsuarioSemTurma = Convert.ToBoolean(Session["bolUsuarioSemTurma"]);

            if (Model.segmentacaoBloqueio != null)
            {
                bolAcessoEscreverBloqueado = Model.segmentacaoBloqueio.bolBloqueado;
            }

            if (bolUsuarioSemTurma)
            {
                %>
                <section class="bloco_aviso_aluno bloco bl_1 sem_turma">
					<div class="aviso_conteudo">
						<h3>O ano está começando!</h3>
						<p>O seu cadastro está sendo realizado e, quando for concluído, a sua rede social voltará ao normal.</p>
						<p>Aguarde!</p>
					</div>
				</section>
                <%    
            }
            else if (bolAcessoEscreverBloqueado)
            {
                %>
                <section class="bloco_aviso_aluno bloco bl_1 bloqueio_ferias">
					<div class="aviso_conteudo">
						<h3>Férias! Aproveite para descansar.</h3>
						<p>
							<%=Model.segmentacaoBloqueio.strTexto%>
						</p>
					</div>
				</section>
                <%
            }         
            else if (Model.bolSuspenso)
            {
                DateTime dataIni = Convert.ToDateTime(Model.dtmInicioSuspensao);
                DateTime dataFim = Convert.ToDateTime(Model.dtmFimSuspensao);
                string format = "dd/MM/yyyy"; 
            %>
            <section class="bloco_aviso_aluno bloco bl_1 suspenso">

				<h3>
                    Você está impedido de enviar mensagens de 
                    <span><%:dataIni.ToString(format) %> até <%:dataFim.ToString(format)%></span>
				</h3>
				<p class="motivo">
					<strong>Motivo:</strong>
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

				<span class="autor"><strong>Administrador(a):</strong> <%:Model.strNomeAdmin %></span>
			</section>
            <%
            }

        %>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentAreaTimeline" ID="ContentArea" runat="server">
        <%            
            bool bolAcessoEscreverBloqueado = false;            

            if (Model.segmentacaoBloqueio != null)
            {
                bolAcessoEscreverBloqueado = Model.segmentacaoBloqueio.bolBloqueado;
            }
            
            if (Model.bolAcessoEscrever && !(Model.bolSuspenso) && (!bolAcessoEscreverBloqueado) && Model.intComunicacaoPermissao == 1)
            {
                Html.RenderPartial("Partials/MensagemRapidaNew", Model, new ViewDataDictionary { { "idAlbum", ViewData["idAlbum"] }, { "idArquivoMultimidia", ViewData["idArquivoMultimidia"] }, { "bolConfigImagem", ViewData["bolConfigImagem"] }, { "bolConfigVideo", ViewData["bolConfigVideo"] }, { "bolConfigFile", ViewData["bolConfigFile"] } });

            }      
        %>
        <section id="ava_mural_geral">
            <section class="timeline">
                <header class="mural_header h_timeline">                    
                    <h2 class="title">Mural</h2>

                    <input type="hidden" value="0" id="hTipoDePostMural" />
                    <div class="bootstrap filtros">
					    <div class="btn-group">
						    <a href="javascript: void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtTipoDePostMural"> 
							    <span class="FontAwesome"></span>Todos os posts <span class="caret"></span>
						    </a>
						    <ul class="dropdown-menu" id="Ul1">
							    <li filtrotipo="0">
								    <input type="checkbox" id="Checkbox1" checked="checked">
								    <label for="ckfiltroTipo0">Todos os posts</label>
							    </li>
							    <li class="divider"></li>
							    <li filtrotipo="1">
								    <input type="checkbox" id="Checkbox2">
								    <label for="ckfiltroTipo1">Posts de professores</label>
							    </li>
							    <li filtrotipo="2" class="sub_item_filtro" subtexto="Posts de professores">
								    <input type="checkbox" id="Checkbox3">
								    <label for="ckfiltroTipo2">Atividades</label>
							    </li>
							    <li filtrotipo="3" class="sub_item_filtro" subtexto="Posts de professores">
								    <input type="checkbox" id="Checkbox4">
								    <label for="ckfiltroTipo3">Blogs</label>
							    </li>
							    <li filtrotipo="4" class="sub_item_filtro" subtexto="Posts de professores">
								    <input type="checkbox" id="Checkbox5">
								    <label for="ckfiltroTipo4">Diga lá</label>
							    </li>
							    <li filtrotipo="5" class="sub_item_filtro" subtexto="Posts de professores">
								    <input type="checkbox" id="Checkbox6">
								    <label for="ckfiltroTipo5">Recomendações</label>
							    </li>
						    </ul>
					    </div>
				    </div>                          
                </header>        
                <div style="padding:20px 47%;" id="loader_timeline"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0'/></div>
                <div id="ava_fluxoarticles">
                                            
                </div>
            </section>
        </section>	      	           

</asp:Content>
