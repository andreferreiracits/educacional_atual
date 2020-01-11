<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Site.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Perfil.Models.MainPerfilPrivado>" %>

<asp:Content ContentPlaceHolderID="PageJsArea" ID="PageJsArea" runat="server">   
    
    <script src="/AVA/StaticContent/Common/Scripts/jquery.seletorAVA_3.0.2.js<%=Url.TimeStampLink() %>" type="text/javascript"></script>
    <script type="text/javascript" defer="defer" >
        $(function () {   

            var intInicioMsgPublica = 2;

            $('.vejaMais_MR').live('click', function (e) {
                e.preventDefault();
                //busca o id do hidden no final da view
                var id = $('#id').val();

                //carrega o loader
                $('.vejaMais_MR').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

                //posta a requisicao
                $.post("/AVA/Perfil/Home/TimeLinePrivado?id=" + id + "&intInicio=" + intInicioMsgPublica, function (data) {
                    //sem nao tem msgs
                    if (data.indexOf('semMsgsRapidas') > -1) {
                        $('#ava_footervejamais').hide();
                    }
                    //se tem menos de 10 na requisicao
                    else if (data.indexOf('poucasMsgsRapidas') > 0) {
                        var _intPos = data.indexOf('poucasMsgsRapidas');
                        var _append = data.substring(0, _intPos);

                        $('#ava_fluxoarticles').append(_append);
                        $('#ava_footervejamais').hide();
                    }
                    //se retorno as 10
                    else {
                        $('#ava_fluxoarticles').append(data);
                        intInicioMsgPublica += 1;
                        $('.vejaMais_MR').html("veja mais");
                    }

                });

                //remove o foco do veja mais
                $(this).blur();
            })


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
          
            //mostra elementos de compartilhamento
            $('#txtInput').focus(function () {
                $('.compartilhamento').fadeIn('fast');
                $('#compartilhar').show();
            });

            //selecao de alunos/educadores/turmas
            $('.dialogo').seletorAVA({ 'turma': true, 'seguidor': true, 'professor': true });

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

        /********************************************************************
        * Valida o post da mensagem rapida
        ********************************************************************/
        strMensagemPadrao = "Olá! Compartilhe aqui ideias ou links!";

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
            
            var strLinkVideo = "";

            if ($('#container_preview_video').find('iframe').attr('src') != undefined) {
                strLinkVideo = $('#container_preview_video').find('iframe').attr('src').replace("//", "");
            }

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
            
            $('#compartilhar').addClass('disable');
                        
            $.ajax({
                url: '/AVA/Perfil/Home/SaveMensagem',
                type: 'POST',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: { 'destino': montaJSON($('.compartilhamento')), 'video': strLinkVideo},
                success: function (data) {

                  
                    $('#txtInput').val('');
                    $('#txtInput').css("height","48px");
                    $('#txtInput').siblings(":last").html('');
                    $('#ava_fluxoarticles').prepend(data).find('article:first')<%if (Model.bolEducador){%>.addClass('highlight')<%} %>.slideDown(1000);
                    $('#busca_especifico').val('').keyup();
                    $('.selecao_personas').find('.todos').find('.p-a-default').click();
                },
                error: function (data) {

                    alert("Ocorreu um Erro no banco de dados.");
                    $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);

                }
            }); 
           
        }


        jQuery(function($){
            $.ajax({
                url: "/esc_include/inc_home/inc_home_destaques_ava.asp",
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                success: function(data){
                    $('section[class=divulga]').html(data);
                },
                error: function(data){
                    alert(data.status);
                }
            });
            //$('section[class=divulga]').load('/esc_include/inc_home/inc_home_destaques_ava.asp');
        });

</script>   
    
<style type="text/css">
    
</style>
</asp:Content>


<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
   
		<section class="hs1">
		
            <%
            if(Model.bolAcessoEscrever)
            {
                Html.RenderPartial("Partials/MensagemRapida", Model); 
                
            }
            %> 
            <section class="divulga">
                Banners escola e e portal em carrosel
            </section>
            <section class="timeline">
                <header>
                    <h1 class="komika"><div class="icon_li mural"></div>MURAL</h1>
               
                    <!--div class="filtrar_tl">Filtrar por: <a href="#" class="lajotinha"><span class="add">Minha Turma &#9660;</span></a></div-->
                    <!--div class="filtrar_pr"><a href="#" class="current">Principais<span>▲</span></a></div>
                    <div class="filtrar_pr"><a href="#" class="">Recentes<span>▲</span></a></div-->
                </header>        
            
                <div id="ava_fluxoarticles">
                    <%Html.RenderPartial("Partials/TimeLine", Model); %>     
                </div>
             
                <%if(Model.TimeLinePrivado.mensagens.Count == 10) { %>
                    <footer id="ava_footervejamais" class="blokletters">
                        <!-- incite a riot: http://24ways.org/2009/incite-a-riot -->
                        <a href="#" title="veja mais" alt="veja mais" class="vejaMais_MR">veja mais</a>
                        <input type="hidden" id="id" value="<%=Model.idUsuario %>" />
                    </footer>
                <%} %>
            </section>	      	
           
		</section><!-- .hs1 -->
</asp:Content>














































