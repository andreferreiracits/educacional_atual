<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Avinha.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Mural.Models.MainPerfilPrivado>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">  

   <%
       bool bolmenuSecretaria = ViewData["bolmenuSecretaria"] != null ? (bool)ViewData["bolmenuSecretaria"] : false;
       bool bolmenuAdministracao = ViewData["bolmenuAdministracao"] != null ? (bool)ViewData["bolmenuAdministracao"] : false;
    string param = "";
    string turmaAluno = "";

    if(Model.bolEducador) {
        param = "educador";
    } else if(Model.bolAluno) {
        param = "aluno";
        turmaAluno = Model.strTurma;
    } else {
        param = "pai";
    }
    
    int intIdPapel = Convert.ToInt32(Session["idPapel"]);

    

 %>

 
<% if(intIdPapel != 1000001  )
{
%>
<script type="text/javascript" id="ze-snippet"  src="https://static.zdassets.com/ekr/snippet.js?key=d8a33bde-29a4-4292-b1df-1cd55b2df997"/> 

<script type="text/javascript">
  
</script>


<script type="text/javascript" src="<%=Url.CDNLink("/Common/zenDesk/zenDesk.js") %><%=Url.TimeStampLink() %>"></script>  



<script>

    zenDeskLoad();

</script>

<%
}
%>

    <script src="/AVA/StaticContent/Common/Scripts/jquery.seletorAVA_3.0.2.js<%=Url.TimeStampLink() %>" type="text/javascript"></script>       
    <script src="/AVA/StaticContent/Common/Scripts/timeline_3.2.0.js<%=Url.TimeStampLink() %>" type="text/javascript"></script>

    <script type="text/javascript">

    var seletorCurr = 0;
    
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

    $(function(){
        if ("<%=bolmenuAdministracao%>" == "True")
        {
           var este = $(this);
            $.ajax({
                url: "/AVA/Barras/Home/Administracao/",
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                cache: false,
                success: function (data) {
                    $("#ava_mural_geral").html(data);

                    //Carrega menu administracao
                    $.ajax({
                        url: "/rede/barra_administracao_ava001.asp",
                        async: true,
                        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                        cache: false,
                        success: function (data) {

                            document.getElementById('div_cont_administra').innerHTML = data;
                            $("ul.css-tabs").fpTabs("div.css-panes > div");

                            $("#dadosPerfil ul li").removeClass("current");
                            este.parent().addClass("current");

                            $("#tabs").tabs();
                            $("#accordion").accordion();


                        },
                        error: function (data) {
                            console.debug(data.status);
                        }
                    });

                },
                error: function (data) {
                    console.debug(data.status);
                }
            });
        }

        if ("<%=bolmenuSecretaria%>" == "True")
        {
        var este = $(this);
        $.ajax({
            url: "/AVA/Barras/Home/Secretaria/",
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: false,
            success: function (data) {
                $("#ava_mural_geral").html(data);
                $('.loader').css('display', 'none');
                //Carrega secretaria
                $.ajax({
                    url: "/rede/barra_secretaria_ava001.asp",
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    cache: false,
                    success: function (data) {
                        document.getElementById('div_cont_secre').innerHTML = data;
                        $("ul.css-tabs").fpTabs("div.css-panes > div");
                        $("#dadosPerfil ul li").removeClass("current");
                        este.parent().addClass("current");

                        $("#tabs").tabs();
                        $("#accordion").accordion();
                    },
                    error: function (data) {
                        console.debug(data.status);
                    }
                });
            },
            error: function (data) {
                alert(data.status);
            }
        });

        }

        //mostra elementos de compartilhamento
            $('#txtInput').focus(function () {
                $('.compartilhamento').fadeIn('fast');
                $('#compartilhar').show();
            });

            //selecao de alunos/educadores/turmas
            $('.dialogo').seletorAVA({ 'turma': true, 'seguidor': true, 'professor': true, 'callBack':'retornoSeletorAVA'});

            $('#compartilhar').click(function(){
                if(!($(this).hasClass('disable'))){
                   //validaMensagemRapida();
                }
            });


            $('.compartilhamento').on('click', '.small-x', function () {
                if ($('.compartilhamento').find('.small').length <= 1) {
                    $('#compartilhar').addClass('disable');
                    $('#compartilhar').unbind('click', validaMensagemRapida);
                }
            });

            $('.selecao_personas').on('click', '.p-a-default', function () {
                if ($('#txtInput').val() != '' && $('#txtInput').val() != strMensagemPadrao) {
                    $('#compartilhar').removeClass('disable');
                    $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
                }
            });
    });
    


        $(function () {


            

            $('#ava_fluxoarticles_ei').on('click','.vejaMais_MR', see_more);


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
            

            if (strMensagem == '' || strMensagem == strMensagemPadrao || $('.compartilhamento').find('.small').length <= 0) {
                $('#compartilhar').addClass('disable');
                $('#compartilhar').unbind('click', validaMensagemRapida);
            } else {
                $('#compartilhar').removeClass('disable');
                $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
            }

        });

        

        function validaMensagemRapida() {

            //Identificar se está no tablet ou no Computador
            var inputSelected;
            if(navigator.userAgent.toLowerCase().search("android") > -1 || navigator.userAgent.toLowerCase().search("tb07sta") > -1){
                inputSelected = $("#txtInput").next().html();
                //alert("Você está no tablet: " + inputSelected);
            } else {
                inputSelected = $('#txtInput').val();
                //alert("Voce não está no tablet: " + inputSelected);
            }


            //$('#ava_fluxoarticles').prepend('<article class="waiting_for_feed <%if (Model.bolEducador){%> highlight <%} %>"><div style="text-align:center;"><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif"></div></article>');
            if(inputSelected != strMensagemPadrao){
                    $('#compartilhar').addClass('disable');
                    $.ajax({
                        url: '/AVA/Mural/Home/SaveMensagem',
                        type: 'POST',
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: { 'destino': montaJSON($('.compartilhamento')) },
                        success: function (data) {
                            $('#txtInput').val('');
                            $('#txtInput').css("height","48px");
                            $('#txtInput').siblings(":last").html('');
                            //$('#ava_fluxoarticles').find('.waiting_for_feed').html('').css('height','16px').html(data).slideDown().removeClass('waiting_for_feed').addClass('clearfix')<%if (Model.bolEducador){%>.addClass('highlight')<%} %>;
                            //var expandEste = $(data).find();
                            $('#ava_fluxoarticles_ei').prepend(data).find('article:first')<%if (Model.bolEducador){%>.addClass('highlight')<%} %>.slideDown(1000);
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
                            
                            $(".iframeVideoVimeo:first").on('load', function () {
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

                             $('#ava_fluxoarticles_ei .icon_compartilhado_com:first').booleTip(booleTipOptions);

                            if($('.selecao_personas').css('display') == 'block'){    
                                $('.troca_persona').click();
                            }
                            $('#busca_especifico').val('').keyup();
                             /*$(".b_tooltip_center").each(function () {

                                    $(this).tooltip({
                                        offset: [10, 450],
                                        opacity: 1,
                                        position: 'top center',
                                        effect: 'slide',
                                        relative: true,
                                        events: {
                                            def: 'click, mouseout'
                                        },
                                        delay: 350,
                                        tip: $(this).closest('article').find('.black_tip_center')
                                    });

                                   $(this).click(function (e) { e.preventDefault(); });
                                });*/
                            $('.mr_opcoes').click(function(e){
                                e.preventDefault();
                            });
                            $('.selecao_personas').find('.todos').find('.p-a-default').click();
                        },
                        error: function (data) {

                            //alert("Ocorreu um Erro no banco de dados.");
                            if(data.status != 0){
                                console.debug("Ocorreu um erro no banco de dados.");
                                $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
                            }

                        }
                    }); 
           }
        }


        //esconde elementos de compartilhamento
        /*$('section, body').click(function (event) {

            if (!($(event.target).closest('section').hasClass('dialogo')) && ($(event.target).attr('id') != 'fancybox-overlay') && !($(event.target).hasParent('#fancybox-outer'))) {
                $('.compartilhamento').hide();
                $('#compartilhar').hide();
                if ($('.selecao_personas').css('display') == 'block') {
                    $('.troca_persona').click();
                }
            }
        });*/


        jQuery(function($){
            $('.divulga').hide();
            $.ajax({
                url: "/esc_include/inc_home/inc_home_destaques_ava.asp",
                data: {paramPapelAva:"<%=param %>", paramTurmaAluno:"<%=turmaAluno %>"}, 
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                success: function(data){
                    $('section[class=divulga]').html(data);
                    $('.divulga').show();
                },
                error: function(data){
                    if(data.status != 0){
                        //alert(data.status);
                        console.debug(data.status);
                    }
                }
            });
            //$('section[class=divulga]').load('/esc_include/inc_home/inc_home_destaques_ava.asp');
        });


        //TIMELINE
        $(function(){
            $.post('/AVA/Mural/Home/TimeLine',                    
                    {TipoFiltro : 0}, function(data){
                $('#loader_timeline').hide();
                $('#ava_fluxoarticles_ei').hide().append(data).fadeIn();

                $("#ava_fluxoarticles_ei .ctn_msg").expander({
                    slicePoint: 500,
                    window: 2,
                    expandText: ' leia mais',
                    expandPrefix: '...',
                    userCollapseText: 'menos',
                    preserveWords: true,
                    expandEffect: 'fadeIn',
                    collapseEffect: 'fadeOut'
                });

                $("#ava_fluxoarticles_ei .iframeVideoVimeo").on('load', function () {
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

                $('#ava_fluxoarticles_ei .icon_compartilhado_com').booleTip(booleTipOptions);

                $('#loader_dialogo').remove();
                $('#txtInput').css('display','block');
                lightBoxAVA($('.denunciar_mensagem'), { 
                    afterShow : callBackDenunciaMensagem, 
                    type : "ajax", 
                    helpers: {
                        overlay: {
                            locked : false
                        }
                    } 
                });
                                
                gostaram_das_mensagens();
                gostaram_dos_comentarios();

                $("#ava_fluxoarticles_ei").find('.thumbs_mural').each(function () {
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
                $("#ava_fluxoarticles_ei").find(".imagens_mural").GaleriaAva();

            });
        });

var intInicioMsgPublica = 2;
function see_more(e) {
                _this = $(this);
                _this.removeAttr('href');
                 $('#ava_fluxoarticles_ei').off('click','.vejaMais_MR', see_more);
                
                e.preventDefault();
                //busca o id do hidden no final da view
                var id = $('#id').val();

                //carrega o loader
                $('.vejaMais_MR').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

                //posta a requisicao
                $.post("/AVA/Mural/Home/TimeLinePrivado?id=" + id + "&intInicio=" + intInicioMsgPublica, function (data) {

                    $('#ava_fluxoarticles_ei').on('click','.vejaMais_MR', see_more);
                    _this.parent().remove();
                    //sem nao tem msgs
                    if (data.indexOf('semMsgsRapidas') > -1) {
                        $('#ava_footervejamais').hide();
                    }
                    //se tem menos de 10 na requisicao
                    else if (data.indexOf('poucasMsgsRapidas') > 0) {
                        var _intPos = data.indexOf('poucasMsgsRapidas');
                        var _append = data.substring(0, _intPos);

                        $('#ava_fluxoarticles_ei').append(_append);
                        $("#ava_fluxoarticles_ei .ctn_msg").expander({
                            slicePoint: 500,
                            window: 2,
                            expandText: ' leia mais',
                            expandPrefix: '...',
                            userCollapseText: 'menos',
                            preserveWords: true,
                            expandEffect: 'fadeIn',
                            collapseEffect: 'fadeOut'
                        });

                        $('#ava_fluxoarticles_ei .icon_compartilhado_com').booleTip(booleTipOptions);

                        $("#ava_fluxoarticles_ei .iframeVideoVimeo").on('load', function () {
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
                            $(".imagens_mural").GaleriaAva();
                        
                        $('#ava_footervejamais').hide();
                        lightBoxAVA($('.denunciar_mensagem'), { 
                            afterShow: callBackDenunciaMensagem , 
                            type : "ajax",
                            helpers: {
                                overlay: {
                                    locked : false
                                }
                            }    
                        });
                    }
                    //se retorno as 10
                    else {
                        $('#ava_fluxoarticles_ei').append(data);
                        $("#ava_fluxoarticles_ei .ctn_msg").expander({
                            slicePoint: 500,
                            window: 2,
                            expandText: ' leia mais',
                            expandPrefix: '...',
                            userCollapseText: 'menos',
                            preserveWords: true,
                            expandEffect: 'fadeIn',
                            collapseEffect: 'fadeOut'
                        });

                        $('#ava_fluxoarticles_ei .icon_compartilhado_com').booleTip(booleTipOptions);

                        $("#ava_fluxoarticles_ei .iframeVideoVimeo").on('load', function () {
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
                            $(".imagens_mural").GaleriaAva();
                        
                        intInicioMsgPublica += 1;
                        if(_action.toLowerCase() != "avinha"){
                            $('.vejaMais_MR').html("Veja mais");
                        }

                        lightBoxAVA($('.denunciar_mensagem'), { 
                            afterShow: callBackDenunciaMensagem , 
                            type : "ajax",
                            helpers: {
                                overlay: {
                                    locked : false
                                }
                            }
                        });
                    }

                    gostaram_das_mensagens();
                    gostaram_dos_comentarios();
                   
                    
                });

                //remove o foco do veja mais
                $(this).blur();
                 
                 // IF AVINHA
                 if(_action.toLowerCase() != "avinha"){ 
                  
                    //Tooltip gostaram.
                     /*$(".tooltipGostaram").each(function () {
                        $(this).tooltip({
                            offset: [0, 0],
                            opacity: 1,
                            position: 'top center',
                            effect: 'slide',
                            relative: true
                        });
                    });

                    //tooltip de quem curtiu
                     $(".b_tooltip").each(function () {
                        $(this).tooltip({
                            offset: [0, 0],
                            opacity: 1,
                            position: 'top center',
                            effect: 'slide',
                            relative: true
                        });
                        $(this).click(function (e) { e.preventDefault(); });
                    });  */      
                } 
                // FIM IF AVINHA
            }


function launchwin( Pagina )
{
	if (BrowserNaoCompativel())
	{	
		 	
		w = window.open(Pagina,'FullScreen','width='+(screen.width-10)+',height='+(screen.height)+',screenX=0,screenY=0');
			
	}
	else
	{
		w = window.open(Pagina,'FullScreen','fullscreen=1');
	}

	w.focus();
}

function abrirBichoFloresta(){
var left = 0, top = 0;
var larg = screen.availWidth;
var alt = screen.availHeight;
				
if (screen) {
	left = screen.width/2 - larg/2;
	top = screen.height/2 - alt/2;
}
				
var wnd = window.open('/bichosdafloresta/redirect.asp', 'mapajogo', "toolbar=0,status=0,location=0,directories=0,menubar=0,scrollbars=" + (scroll ? "1" : "0") + ",resizable=1,left=" + left + ",top=" + top + ",width=" + larg + ",height=" + alt);
if (!wnd)
	alert("Você deve desativar seu bloqueador de pop-ups para continuar.");
else
	wnd.focus();
						
}
function BrowserNaoCompativel()
{
	appName = navigator.appName;
	appVersion =navigator.appVersion;
	if ((appName.indexOf("Netscape")>-1) && (appVersion.indexOf("4.")>-1))
	{
		return(true)
	}
	else
	{
		return(false);
	}
}
    </script>
   
<script type="text/javascript" language="javascript">
    function buscaCusticoesMensagem(_idMensagem) {

        $.ajax({
            url: "/AVA/Mural/Home/ListaCurtidasMensagem",
            data: { 'id': _idMensagem },
            success: function (data) {
                $(".lista_curtidas_" + _idMensagem).html(data); //.effect("bounce", { times: 2 }, 300);
            },
            error: function () {
                alert("Erro ao listar curticoes da mensagem.")
            }
        });

    }

     function buscaCusticoesComentarioAvinha(_idComentario) {


         $.ajax({
             url: "/AVA/Mural/Home/ListaCurtidasComentario",
             data: { 'id': _idComentario },
             success: function (data) {
                 $('.curtidas_comentario_' + _idComentario).html(data);
             },
             error: function () {
                 alert("Erro ao listar curticoes do comentário.")
             }
         });

    }


    $(document).ready(function () {
        //Nova função curtir/descurtir uma publicação na timeline - Renan Daré -> 08/04/2013
        $('a.botao_curtir').live('click', function () {
            var idMensagemRapida = $(this).attr("idMensagemRapida");

            if ($(this).hasClass('active')) { //descurtir mensagem
                $.ajax({
                    url: "/AVA/Mural/Home/DescurtirMensagem",
                    data: { 'id': idMensagemRapida },
                    success: function (data) {
                        buscaCusticoesMensagem(idMensagemRapida);
                       

                    },
                    error: function () {
                        alert("Erro ao descurtir mensagem.")
                    }
                });


            } else {  //curtir mensagem
                $.ajax({
                    url: "/AVA/Mural/Home/CurtirMensagem",
                    data: { 'id': idMensagemRapida },
                    success: function (data) {
                        buscaCusticoesMensagem(idMensagemRapida);
                        $(idMensagemRapida).addClass('active');
                    },
                    error: function () {
                        alert("Erro ao curtir mensagem.")
                    }
                });
            }
        });

        //Nova função curtir/descurtir um comentário na timeline - Renan Daré -> 08/04/2013

        $('a.botao_curtir_comentario').live('click', function () {
            var objClicado = $(this);
            var idComentario = $(this).attr("idcomentario");
            
            if ($(this).hasClass('active')) { //descurtir mensagem
                $.ajax({
                    url: "/AVA/Mural/Home/DescurtirComentarioAvinha",
                    data: { 'id': idComentario },
                    success: function (data) {
                        $(objClicado).removeClass('active');//.effect("bounce", { times: 2 }, 300); ;
                        buscaCusticoesComentarioAvinha(idComentario);
                    },
                    error: function () {
                        alert("Erro ao descurtir o comentário.")
                    }
                });


            } else {  //curtir comentário
                $.ajax({
                    url: "/AVA/Mural/Home/CurtirComentarioAvinha",
                    data: { 'id': idComentario },
                    success: function (data) {
                        $(objClicado).addClass('active');//.effect("bounce", { times: 2 }, 300); ;
                        buscaCusticoesComentarioAvinha(idComentario);
                        
                    },
                    error: function () {
                        alert("Erro ao curtir o comentário.")
                    }
                });
            }
        });

        //Nova função curtir/descurtir um comentário na timeline - Renan Daré -> 08/04/2013

    });
</script> 

</asp:Content>


<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
   
            
         
            
            <section class="timeline timeline_ei">
                <div style="padding:20px 47%;" id="loader_timeline"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0'/></div>
                <div id="ava_fluxoarticles_ei" class="ava_fluxoarticles_ei">
                    <% //Html.RenderPartial("Partials/TimeLine", Model); %>          	           
                </div>
            
            </section>
            			
		
        
        
        
        <%
       /* <section class="hs1">
		     
            <section class="divulga">

            </section>
            <section class="timeline">
                <header>
                    <h1 class="blokletters"><div class="icon_li mural"></div>MURAL</h1>
               
                    <!--div class="filtrar_tl">Filtrar por: <a href="#" class="lajotinha"><span class="add">Minha Turma &#9660;</span></a></div-->
                    <!--div class="filtrar_pr"><a href="#" class="current">Principais<span>▲</span></a></div>
                    <div class="filtrar_pr"><a href="#" class="">Recentes<span>▲</span></a></div-->
                </header>        
                <div style="padding:20px 47%;" id="loader_timeline"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0'/></div>
                <div id="ava_fluxoarticles">
                    <%//Html.RenderPartial("Partials/TimeLine", Model); % >     
                </div>
                
                
            </section>	      	
           
		</section><!-- .hs1 -->
        */
        %>

        <%--<style>
            .feedCurtir .botao_curtir.active span
            {
                background-position:2px -50px !important;
            }
        </style> --%> 
</asp:Content>
