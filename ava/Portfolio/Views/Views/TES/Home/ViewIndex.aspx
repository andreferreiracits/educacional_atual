<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/BarraEsquerda.Master" debug="true" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<List<Portfolio.Model.Materiais>>" %>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
   
<section id="ava_2col" class="hs1">
			<!-- Cada section deve começar com um novo h1 (não h2),  e opicionalmente um header -->
			<!-- Pode haver multiplos footers e headers em cada pagina -->
				<div id="wrapper">
					<div id="main-nav-holder" class="time">
                    
						<nav id="main-nav">
							<div>
                                <%
                                    if (ViewData["strLogin"].Equals(""))
                                    {
                                %>
								    <h1 class="blokletters">Meu Portf&oacute;lio</h1>
                                <%}
                                 else
                                 { %>
                                 <h1 class="blokletters">Portf&oacute;lio de 
                                 
                                 <% if (ViewData["strApelido"] == "")
                                    {
                                 %>
                                    <%=ViewData["strNome"]%>
                                                                                    
                                 <%}%>
                                    
                                   <% else
                                    { %>
                                        <%=ViewData["strApelido"]%>
                                  <%} %></h1>
                                <%} %>
                                <ul class="din carrocel jcarousel-skin-tango" id="mycarousel">
									<% for (int i = (int)ViewData["anoVigente"]; i >= 2008;i--){ %>
                                        <li><a href="javascript:void(0);" class="anoTopo<%=i %>" intAno="<%=i %>"><%=i %></a></li>
                                    <%}%>
								</ul>
                                  <img class="imgCarregando" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">
								<div class="linha"></div>
							</div>
							<span class="sombra"></span>
						</nav>	
					</div>					
                    
					<span anoCarregado="<%= ViewData["anoVigente"] %>" id="Span1" class="blocoAno itens tipo_ano2 anoPortfolio<%= ViewData["anoVigente"] %>"><strong class="blokletters"><%=ViewData["anoVigente"] %></strong></span>
                    <section class="portfolio" id="listagem_itens">
                            <span id="materiais<%= ViewData["anoVigente"] %>">
						   <%
				           if (Model != null){
                               List<Portfolio.Model.Materiais> ModelAux = (List<Portfolio.Model.Materiais>)Model;
                               if (ModelAux.Count > 0)
                               {
                                int anoInicial = (int)ViewData["anoVigente"];
                                    bool escreveAno = true;
                                    int contador = 0;
                                    
                                    
                                    
                                    foreach (Portfolio.Model.Materiais MaterialDoUsuario in Model)
                                    {
                                        if (anoInicial != MaterialDoUsuario.intAno && escreveAno)
                                        {
                                            if (!ModelAux.Exists(m => m.intAno.Equals(anoInicial)))
                                            {
                                                %>
                                                <span class="itens carregar_proximo_sem_material"><p>Nenhum material encontrado.</p></span>
                                                <%
                                             }
                                                escreveAno = false;  
                                                %>
                                                </span>
                                                <span anoCarregado="<%= MaterialDoUsuario.intAno%>" id="anoSeparador" class="blocoAno itens tipo_ano2 anoPortfolio<%= MaterialDoUsuario.intAno%>"><strong class="blokletters"><%=MaterialDoUsuario.intAno%></strong></span>
                                                <span id="materiais<%= MaterialDoUsuario.intAno%>">
                                                <% 
                                        }
                                        if (escreveAno == false)
                                        {
                                            if (!ModelAux.Exists(m => m.intAno.Equals(anoInicial - 1)))
                                            {
                                                %>
                                                <span class="itens carregar_proximo_sem_material"><p>Nenhum material encontrado.</p></span>
                                                <%
                                            }
                                        }

                                        
                                        if (contador == 0)
                                        {
                                            if ((bool)ViewData["ultimoAnoSemResultado"])
                                            { 
                                                %>
                                                    <!--<span class="itens carregar_proximo_sem_material"><p>Nenhum material encontrado.</p></span>-->
                                                <%
                                            }
                                        }
                                        if (contador == 1)
                                        {
                                            if ((bool)ViewData["penultimoAnoSemResultado"])
                                            { 
                                                %>
                                                    <span class="itens carregar_proximo_sem_material"><p>Nenhum material encontrado.</p></span>
                                                <%
                                            }
                                        }
                                            %>
                                              <div class="itens">
                                                <ul class="acoes">
					                                <li class="comentar"><a href="javascript:void(0);" title="Comentar" class="comentarios_modal resumoComentario" ident="<%=MaterialDoUsuario.idProducaoUsuario%>"></a></li>	
                                                    <%if (MaterialDoUsuario.jaCurtiu)
                                                        {  %>
					                                    <li class="ativo gostar Gostar<%=MaterialDoUsuario.idProducaoUsuario%>" idProducaoUsuario="<%=MaterialDoUsuario.idProducaoUsuario%>"><a title="Você gostou disto (desfazer)" href="javascript:void(0);"></a></li>	
                                                    <%}
                                                        else
                                                        { %>
                                                        <li class="gostar Gostar<%=MaterialDoUsuario.idProducaoUsuario%>" idProducaoUsuario="<%=MaterialDoUsuario.idProducaoUsuario%>"><a title="Gostar" href="javascript:void(0);"></a></li>	
                                                    <%} %>
				                                </ul>
				                                <div class="conteudo_geral">
					                                <span class="porftolio_top">
                                                        <a href="<%=MaterialDoUsuario.strLink%>" target="_blank">
						                                <img src="<%=MaterialDoUsuario.strThumb%>" width="218" height="142" alt="<%=MaterialDoUsuario.strProducao%>"/>
                                                        </a>
					                                </span>
						                            <!--a href="<%=MaterialDoUsuario.strHome%>" target="_blank"><h2><%=MaterialDoUsuario.strProducao%></h2></a-->
                                                    <a href="<%=MaterialDoUsuario.strLink%>" target="_blank">
						                                <h3 class="din"><%=MaterialDoUsuario.strProducao%></h3>
						                                <p><%=MaterialDoUsuario.DescricaoFerramenta%></p>
                                                    </a>
				                                </div>
				                                <a class="resumo curtir_modal" title="Ver quem gostou" href="javascript:abreListaCurtidas(<%=MaterialDoUsuario.idProducaoUsuario%>);" ident="<%=MaterialDoUsuario.idProducaoUsuario%>">
                                                <%if (MaterialDoUsuario.jaCurtiu)
                                                    {  %>
					                                <span class="jaCurtiu resumo_curtir resumoCurtir<%=MaterialDoUsuario.idProducaoUsuario%>" ident="<%=MaterialDoUsuario.idProducaoUsuario%>"><%=MaterialDoUsuario.quantidadeCurtidas%></span>
                                                <%}
                                                    else
                                                    { %>
                                                    <span class="resumo_curtir resumoCurtir<%=MaterialDoUsuario.idProducaoUsuario%>" ident="<%=MaterialDoUsuario.idProducaoUsuario%>"><%=MaterialDoUsuario.quantidadeCurtidas%></span>
                                                <%} %>
				                                </a>
				                                <a href="javascript:void(0);" title="Comentar" class="resumo comentarios_modal resumoComentario" ident="<%=MaterialDoUsuario.idProducaoUsuario%>">
					                                <span class="resumo_comentario resumo_comentario<%=MaterialDoUsuario.idProducaoUsuario%>"><%=MaterialDoUsuario.quantidadeComentarios%></span>
				                                </a>
                                                <%
                                                if (MaterialDoUsuario.podeDespublicar)
                                                {
                                                    if (MaterialDoUsuario.bolPublico)
                                                    {
                                                        %>                               
    		                                                <a class="publicar" title="Publicado (Clique para despublicar)" idProducaoUsuario="<%=MaterialDoUsuario.idProducaoUsuario%>" href="javascript:void(0);"></a>
                                                        <%
                                                    }
                                                    else
                                                    { 
                                                        %>
                                                            <a class="publicar despublicar" title="Despublicado (Clique para publicar)" idProducaoUsuario="<%=MaterialDoUsuario.idProducaoUsuario%>" href="javascript:void(0);"></a>
                                                        <%
                                                    }
                                                }
                                                %>
			                                    </div>	
			                                  <%
                                 }
                                %>
                                </span>
                                <%
                            }else{
                                %>
                                    <span class="itens carregar_proximo_sem_material"><p>Nenhum material encontrado.</p></span>
                                    </span>
                                    <span id="materiais<%= Convert.ToInt32(ViewData["anoVigente"])-1 %>">
                                    <span anoCarregado="<%= Convert.ToInt32(ViewData["anoVigente"])-1 %>" id="Span3" class="blocoAno itens tipo_ano2 anoPortfolio<%= Convert.ToInt32(ViewData["anoVigente"])-1 %>"><strong class="blokletters"><%=  Convert.ToInt32(ViewData["anoVigente"])- 1%></strong></span>
                                    <span class="itens carregar_proximo_sem_material"><p>Nenhum material encontrado.</p></span>
                                    </span>
                                <%
                            }
                            //Fim if Model > 0
                           }
                           // Fim if Model != null


                            string strAnosCountTodos = ViewData["countAnoMaterias"].ToString();

                            string[] anosCount = strAnosCountTodos.Split('.');

                            foreach (string lista in anosCount)
                            {

                                string[] anosCount2 = lista.Split(',');
                                string ano = anosCount2[0].ToString();
                                int count = Convert.ToInt32(anosCount2[1]);
                                                        
                            %>
                                <span anoCarregado="<%=ano %>" id="Span2" class="blocoAno itens tipo_ano2 anoPortfolio<%=ano %>"><strong class="blokletters"><%=ano%></strong></span>
                                <span id="materiais<%=ano %>">
                                                                    
                                                    <%
                                if (count > 1)
                                {
                                                    %>
                                                    <span class="itens carregar_proximo_ano anoPortfolio<%=ano %> carregar<%=ano %>" intAnoCarregar="<%=ano %>">
						                                <a href="javascript:void(0);">Carregar os <strong><%=count%></strong> <strong>materiais</strong> de <%=ano %></a>
                                                    <%}
                                else if (count <= 0)
                                {
                                                    %>
                                                    <span class="itens carregar_proximo_sem_material anoPortfolio<%=ano %> carregar<%=ano %>" intAnoCarregar="<%=ano %>">
                                                        <p>Nenhum material encontrado.</p>
                                                    <%
                                }
                                else
                                {
                                                    %>
                                                    <span class="itens carregar_proximo_ano anoPortfolio<%=ano %> carregar<%=ano %>" intAnoCarregar="<%=ano %>">
                                                        <a href="javascript:void(0);">Carregar <strong><%=count%></strong> <strong>material</strong> de <%=ano%></a>
                                                    <%} %>
					                            </span>
                                            </span>
                                    <%

                        }
                                            
                                    

                            %>

                           
						            
					</section>
					
					<div class="carregar" style="display: none;">
						<img width="43" height="11" src="<%=Url.CDNLink("/Common/img/perfil/carregando.gif") %>">
						Carregando mais ítens do portfólio
					</div>	
				</div>	
					
			</section>

        <script src="/AVA/StaticContent/Common/Scripts/jquery.tools.min.js"></script>
		<script src="/AVA/StaticContent/Common/Scripts/libs/jquery.jcarousel.js"></script>
<script type="text/javascript">
    $(document).ready(function () {

        jQuery('#mycarousel').jcarousel({
            wrap: 'both'
        });
        
        var cancelaPaginacaoPorScroll   = false;
        var jaFiltrouPorAno = false;
        
    /*function callBackDenunciaMensagem() {
    $('form[name=frmDenuncia]').find('h2').css({ 'position': 'absolute', 'top': '-10px' });
    $('#enviar_email').click(function () {
        if ($('#txtMotivo').val() != "") {
     
			$.ajax({
				data: { 'idMensagem': _id_c_d, 'strNome': $('#strNomeLogado').val(), 'strLogin': $('#strLoginLogado').val(), 'strEmail': $('#strEmailLogado').val(), 'strURL': $('#strURLCorrente').val(), 'strMotivo': 'Denúncia de mensagem de ID:' + _id_c_d + ' e texto: "' + _txt_c_d + '" ' + $('#txtMotivo').val() },
				type: "POST",
				url: "/AVA/Barras/Denuncia/DenunciaMensagemGravar",				
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",				
				success: function(data) {
				    alert("E-mail enviado ao administrador de rede social!");
				    parent.$.fancybox.close();
				}
			});

        } else {
            alert("Favor preencher o motivo!");
            return false;
        }
    });

} 
        lightBoxAVA($('.denunciar_mensagem'), { 'onComplete': callBackDenunciaMensagem });
         */
        $(".tooltip_title").tooltip({
					offset: [0, 0],
					opacity: 0.9,
					
				});


        $('.top').addClass('hidden');
        $.waypoints.settings.scrollThrottle = 20;
        $('#wrapper').waypoint(function (event, direction) {
            $('.top').toggleClass('hidden', direction === "up");
        }, {
            offset: '100%'
        }).find('#main-nav-holder').waypoint(function (event, direction) {
            $(this).parent().toggleClass('sticky', direction === "down");
            event.stopPropagation();
        });
        //Curtir um comentário
                $('body').on('click','.curtido',function(){
                        var botaoClicado            = $(this);
                        var idFerramentaMensagem    = $(this).attr('ident');
                        var bolCurtido              = false;

                        if ($(this).hasClass('ativo')) {
                            bolCurtido = true;
                            $(botaoClicado).attr('title', 'Gostar');
                        } else {
                            $(botaoClicado).attr('title', 'Você gostou disto (desfazer)');
                        }

                        if(!bolCurtido){
                            $.ajax({
                                url: '/AVA/Portfolio/Home/CurtirComentario/?idFerramentaMensagem='+idFerramentaMensagem,
                                type: 'POST',
                                success: function (data) {
                                    $(botaoClicado).toggleClass("ativo"); //Coloca a classe ativo no botão de gostar.
                                },
                                error: function (data) {
                                    alert('O comentário não pode ser curtido.');
                                    $(botaoClicado).toggleClass("ativo");
                                }
                            });
                        }else{
                                $.ajax({
                                url: '/AVA/Portfolio/Home/DescurtirComentario/?idFerramentaMensagem='+idFerramentaMensagem,
                                type: 'POST',
                                success: function (data) {
                                    $(botaoClicado).toggleClass("ativo"); //Coloca a classe ativo no botão superior de gostar.
                                },
                                error: function (data) {
                                    alert('O comentário não pode ser descurtido.');
                                    $(botaoClicado).toggleClass("ativo");
                                }
                            });
                        }

                });

        $("#listagem_itens").on('click','.resumoComentario',function(){
           var id = $(this).attr('ident');
           $.fancybox({
            'href': '/AVA/Portfolio/Home/ListaComentarios/?idProducaoUsuario='+id,
            'hideOnContentClick': false,
            'onComplete': function(){
                
                $(".denunciar_comentario").click(function () {
                    $(this).toggleClass("oppen");
                });

                $(".fechar_denuncia").click(function () {
                    $(".denunciar_comentario").toggleClass("oppen");
                });


                $(".b_tooltip_center").each(function () {
                    $(this).tooltip({
                        effect: 'slide',
                        position: 'top center',
                        relative: true,
                        events: {
                            def: 'click, mouseout'
                        }
                    });
                });
                
                //Comentar
                function replaceAll(string, token, newtoken) {
	                while (string.indexOf(token) != -1) {
 		                string = string.replace(token, newtoken);
	                }
	                return string;
                }
                $('.btnEnviarComentario').click(function(){
                       var strComentario    = replaceAll($('#txtComentario'+id).val(),"\n","<br>");
                       if(strComentario != "" && strComentario != "Escreva um comentário..."){
                       $.fancybox.showActivity();
                       $.ajax({
                            url: '/AVA/Portfolio/Home/GravarComentario/?idProducaoUsuario='+id,
                            dataType : 'json',
                            type: 'POST',
                            data: {'strComentario':strComentario},
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (data) {
                                $.fancybox.hideActivity();
                                $('.exibir').click(function(){

                                        $('.fecha').toggle();
                                        if($('.seta').hasClass('abre')){
                                            // esconder tudo que tem a classe escondame menos os 5 mais recentes.
                                            
                                            var totalComentarios = $(".comentario_usuario").size();
                                            var totalEscondidos = $(".escondame").size();

                                            if(totalComentarios > 5){
                                                $('.totalComentarios').html(totalEscondidos);
                                            }


                                        }else{
                                            // esconder tudo menos os 5 mais recentes.
                                            
                                            var totalComentarios = $(".comentario_usuario").size();
                                            var totalEscondidos = $(".escondame").size();

                                            
                                            $('.seta').removeClass('abre');
                                            if(totalComentarios > 5){
                                               //$('.exibir').html('Exibir todos os <strong class="totalComentarios">'+totalComentarios+' comentários</strong> <span class="seta">&nbsp;</span>');
                                               $('.totalComentarios').html(totalEscondidos);
                                            }
                                        }
                                        $('.escondame').toggle();
                                    });
                                if(data.Retorno[0].Erro == 1){
                                    
                                }else{
                                    if(data.Retorno[1].Comentario.jaCurtiu == 'True'){
                                        var classeAtivo = "ativo";
                                    }else{
                                        var classeAtivo = "";
                                    }

                                    
                                    var RetornoComentario = "";
                                    RetornoComentario += "<div class='comentario_usuario comentario_usuario"+ data.Retorno[1].Comentario.idFerramentaMensagem +"' style='display: block;'>";
                                    RetornoComentario += "    <a class='thumb_usuario tooltip_title' title='"+ data.Retorno[1].Comentario.strNome +"' href='javascript:void(0);\'> ";
                                    RetornoComentario += "    <img src='"+ data.Retorno[1].Comentario.strMiniFoto +"' height='33' width='33' /></a>";
                                    RetornoComentario += "    <a class='nome_usuario' href='/AVA/Perfil/Home/Index/"+ data.Retorno[1].Comentario.strLogin +"'>"+ data.Retorno[1].Comentario.strNome +"</a>";
                                    RetornoComentario += "    <small>"+ data.Retorno[1].Comentario.dtmMensagem +"</small>";
                                    RetornoComentario += "    <a href='javascript:void(0);' class='curtido "+ classeAtivo +"' ident='"+ data.Retorno[1].Comentario.idFerramentaMensagem +"'></a>";
                                   

                                    if(data.Retorno[1].Comentario.podeDeletar == 'true'){
                                        RetornoComentario += "<ul class=\"combo_denunciar_excluir\"><li><a href=\"#\" class=\"icone\"></a><ul><li><a href=\"javascript:void(0);\" class=\"b_tooltip_center\"><span class=\"excluir_comentario_combo\"></span>Excluir</a><span class=\"black_tip_center tooltip black_tip_M\" style=\"display:none;\"><p>Deseja realmente excluir este comentario? </p><a class=\"bt_normal green\" onclick=\"javascript:deletarComentario('"+ data.Retorno[1].Comentario.idFerramentaMensagem +"','"+ data.Retorno[1].Comentario.idProducaoUsuario +"',1);\" href=\"javascript: void(0);\">sim</a><a class=\"bt_normal red\" onclick=\"javascript:deletarComentario('"+ data.Retorno[1].Comentario.idFerramentaMensagem +"','"+ data.Retorno[1].Comentario.idProducaoUsuario +"',0);\"  href=\"javascript: void(0);\">não</a><span class=\"black_tip_seta\">▼</span></span></li></ul></li></ul>";
                                    }else{
                                        RetornoComentario += "<ul class=\"combo_denunciar_excluir\"><li><a href=\"#\" class=\"icone\"></a><ul><li><a href=\"javascript:void(0);\" class=\"denunciar_comentario\"><span class=\"denunciar_comentario_combo\"></span>Denunciar</a><div class=\"caixa_denunciar_comentario\"><h4>Por que você achou este conteúdo impróprio?</h4><textarea placeholder=\"Escreva a sua denuncia\" id=\"strMotivo_"+data.Retorno[1].Comentario.idFerramentaMensagem+"\"></textarea><small>Esta denúncia será enviada ao(s) administrador(es) da sua escola para análise e providências necessárias</small><input type=\"button\" value=\"Denunciar\" class=\"denunciar btn_cinza\" onclick=\"javascript:denunciarComentario('"+ data.Retorno[1].Comentario.idFerramentaMensagem +"');\"/><input type=\"hidden\" value=\'"+data.Retorno[1].Comentario.strLogin+"'\" id=\"strLoginComentario_" + data.Retorno[1].Comentario.idFerramentaMensagem + "\" /><a href=\"javascript:;\" class=\"btn_cinza fechar_denuncia\"><span class=\"iconic\">x</span>Fechar</a></div></li></ul></li></ul>";
                                    }





                                    //RetornoComentario += "<a href=\"javascript:void(0);\" class=\"denunciar_comentario\" onclick=\"javascript:denunciarComentario('"+ data.Retorno[1].Comentario.idFerramentaMensagem +"','"+ data.Retorno[1].Comentario.idProducaoUsuario +"');\"></a>";

                                    RetornoComentario += "    <p>"+ data.Retorno[1].Comentario.txtComentario +"</p>";
                                    RetornoComentario += "</div>";

                                    $(".comentar_texto")[0].reset();
                                    $('.semComentarios').hide();
                                    $('.mCSB_container').append(RetornoComentario);
                                    
                                    // add ultimo comentário dinamicamente
                                    $('.box_comentario').append(RetornoComentario);
                                    
                                    $('.escondame').slideUp();

                                    if($(".comentario_usuario").not(".escondame").size() > 5){
                                        $(".comentario_usuario").not(".escondame").eq(0).addClass('escondame').slideUp();
                                    }

                                    if($(".comentario_usuario").size() == 1) {
                                        $('.semComentarios').remove();
                                        $('.exibir').css('display', 'block');
                                    }

                                   if($(".comentario_usuario").size() > 5){
                                        $('.exibir').html('Exibir todos os <strong>'+$(".comentario_usuario").size()+' comentários</strong><span class="seta">&nbsp;</span>');
                                    }else if($(".comentario_usuario").not(".escondame").size() == 1){
                                        $('.exibir').html('<strong>'+$(".comentario_usuario").size()+' comentário</strong>');   
                                    }else{
                                        $('.exibir').html('<strong>'+$(".comentario_usuario").size()+' comentários</strong>');   
                                    }

                                    $('.resumo_comentario'+ data.Retorno[1].Comentario.idProducaoUsuario).html(data.Retorno[1].Comentario.quantidadeComentarios);
                                    
                                    $('.exibir').click(function(){

                                        $('.fecha').toggle();
                                        if($('.seta').hasClass('abre')){
                                            // esconder tudo que tem a classe escondame menos os 5 mais recentes.
                                            
                                            var totalComentarios = $(".comentario_usuario").size();
                                            var totalEscondidos = $(".escondame").size();

                                            if(totalComentarios > 5){
                                                $('.totalComentarios').html(totalEscondidos);
                                            }


                                        }else{
                                            // esconder tudo menos os 5 mais recentes.
                                            
                                            var totalComentarios = $(".comentario_usuario").size();
                                            var totalEscondidos = $(".escondame").size();

                                            
                                            $('.seta').removeClass('abre');
                                            if(totalComentarios > 5){
                                               //$('.exibir').html('Exibir todos os <strong class="totalComentarios">'+totalComentarios+' comentários</strong> <span class="seta">&nbsp;</span>');
                                               $('.totalComentarios').html(totalEscondidos);
                                            }
                                        }
                                        $('.escondame').toggle();
                                    });

                                    $(".b_tooltip_center").each(function () {
                                        $(this).tooltip({
                                            effect: 'slide',
                                            position: 'top center',
                                            relative: true,
                                            events: {
                                                def: 'click, mouseout'
                                            }
                                        });
                                    });

                                }
                            },
                            error: function (data) {
                                    alert('Ocorreu um erro tentar comentar o material, por favor tente novamente.');
                            }
                        });
                     }else{
                        alert('Por favor, escreva um comentário.');
                    }
                       //$('.box_comentario').mCustomScrollbar();
                    });
                   
                     $('.exibir').click(function(){

                        $('.fecha').toggle();
                        if(!$('.seta').hasClass('abre')){
                            $('.seta').addClass('abre');
                            
                            var texto               = $('.exibir').find('strong').html();
                            bolNaoConta             = false;
                            texto                   = texto.replace(' ', '');
                            texto                   = texto.replace('comentários', '');
                            totalComentarios        = parseInt(parseInt(texto));
                            totalEscondidos         = parseInt(parseInt(totalComentarios)-5);

                            if(totalComentarios > 5){
                                $('.exibir').html('Esconder os <strong>'+totalEscondidos+' comentários antigos</strong> <span class="seta abre">&nbsp;</span>');
                            }
                        }else{
                            
                            var texto               = $('.exibir').find('strong').html();
                            bolNaoConta             = false;
                            texto                   = texto.replace(' ', '');
                            texto                   = texto.replace('comentários', '');
                            totalComentarios        = parseInt(parseInt(texto)+5);
                            

                            $('.seta').removeClass('abre');
                            if(totalComentarios > 5){
                                $('.exibir').html('Exibir todos os <strong>'+totalComentarios+' comentários</strong> <span class="seta">&nbsp;</span>');
                            }
                        }
                        $('.escondame').toggle();
                    });

                    /*
                     $(".gostar").click(function(){
                        var botaoClicado            = $(this);
                        var idProducaoUsuario       = $(this).attr('idProducaoUsuario');
                        var bolCurtido              = false;

                        if ($(this).hasClass('ativo')) {
                            bolCurtido = true;
                            $('a', botaoClicado).attr('title', 'Gostar');
                        } else {
                            $('a', botaoClicado).attr('title', 'Você gostou disto (desfazer)');
                        }

                         var nomeUrl = location.href;
                         var strLogin = "";
                         var urlDestino = "";
                         var parametros = "";

                         if(nomeUrl.toLowerCase().indexOf("listamateriaispublico") > -1){
                            var aux     = nomeUrl.substring(nomeUrl.toLowerCase().indexOf("listamateriaispublico"));
                            aux         = aux.split("/");
                            strLogin    = aux[1];
                         }

                        if(!bolCurtido){
                            $.ajax({
                                url: '/AVA/Portfolio/Home/CurtirProducao/?idProducaoUsuario='+idProducaoUsuario+'&strLogin='+strLogin,
                                type: 'POST',
                                success: function (data) {
                                    $(botaoClicado).toggleClass("ativo"); //Coloca a classe ativo no botão de gostar.
                                    $('.resumoCurtir'+idProducaoUsuario).html(data).effect("bounce", {times:2}, 300); //Incrementa a qtdade de curtidas no botão debaixo
                                    $('.gostar'+idProducaoUsuario).addClass('ativo'); //Adiciona a classe ativo no botão curtir de baixo.
                                    $('.Gostar'+idProducaoUsuario).addClass('ativo'); //Adiciona a classe ativo no box de baixo.
                                },
                                error: function (data) {
                                    alert('O material não pode ser curtido.');
                                    $(botaoClicado).toggleClass("ativo");
                                }
                            });
                        }else{
                                $.ajax({
                                url: '/AVA/Portfolio/Home/DescurtirProducao/?idProducaoUsuario='+idProducaoUsuario+'&strLogin='+strLogin,
                                type: 'POST',
                                success: function (data) {
                                    $(botaoClicado).toggleClass("ativo"); //Coloca a classe ativo no botão superior de gostar.
                                    $('.resumoCurtir'+idProducaoUsuario).html(data).effect("bounce", {times:2}, 300); //decrementa a qtdade de curtidas no botão debaixo
                                    $('.gostar'+idProducaoUsuario).removeClass('ativo'); //remove a classe ativo no botão curtir debaixo.
                                    $('.Gostar'+idProducaoUsuario).removeClass('ativo'); //Remove a classe ativo do box debaixo.
                                },
                                error: function (data) {
                                    alert('O material não pode ser descurtido.');
                                    $(botaoClicado).toggleClass("ativo");
                                }
                            });
                        }

                    });
                    */
                } 
            });
        });

      
         $("#listagem_itens").on('click','.carregar_proximo_ano',function(){
            var intAno       = $(this).attr('intAnoCarregar');
            var anoClicado   = $(this);
            var hoje         = new Date()
            var anoAtual     = hoje.getFullYear();
            if(intAno != ""){
                
                if(intAno == anoAtual){
                    $('html,body').animate({scrollTop: parseInt($('#wrapper').offset().top)-5}, 2000);
                }
                $(anoClicado).fadeOut();
                var nomeUrl = location.href;
                var strLogin = "";
                var urlDestino = "";
                var parametros = "";

                if(nomeUrl.toLowerCase().indexOf("listamateriaispublico") > -1){

                    var aux     = nomeUrl.substring(nomeUrl.toLowerCase().indexOf("listamateriaispublico"));
                    aux         = aux.split("/");
                    strLogin    = aux[1];
                    urlDestino  = "/AVA/Portfolio/Home/ListaMateriaisPorAno";
                    parametros  = "intAno="+intAno+'&strLogin='+strLogin+'&paginacaoInicio=&paginacaoFim=';

                }else{

                    urlDestino  = "/AVA/Portfolio/Home/ListaMateriaisPorAno";
                    parametros  = "intAno="+intAno+'&strLogin=&paginacaoInicio=&paginacaoFim=';
                }
                  
                  $(anoClicado).after('<div class="carregar"><img width="43" height="11" src="<%=Url.CDNLink("/Common/img/perfil/carregando.gif") %>">Carregando mais ítens do portfólio</div>');

                  // Carrega os materiais filtrando pelo ano clicado.
                  $.ajax({
                    url:        urlDestino,
                    dataType :  'json',
                    type:       'GET',
                    data:       parametros,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                         $(anoClicado).html(""); 
                         $('.carregar').hide();
                         if (data.Retorno[0].erro == 1) {

                            naoTemMaterial = true;
                            $('.carregar').hide();
                            $('#materiais'+intAno).html('<span class="itens carregar_proximo_sem_material"><p>Nenhum material encontrado.</p></span>');
                            $('#listagem_itens').masonry('reload');
                            $('html,body').animate({scrollTop: parseInt($('.anoPortfolio'+intAno).offset().top)-55}, 2000); // rola a página para o ano selecionado.
                            
                        } else {
                            $(anoClicado).css('cursor','').attr('intAnoCarregar','');
                            

                            for (i = 1; i < data.Retorno.length; i++) {
                            
                                if(data.Retorno[i].Portfolio.bolPublico == 'True'){
                                    var classeAtivo = "";
                                }else{
                                    var classeAtivo = "despublicar";
                                }
                                  if(data.Retorno[i].Portfolio.jaCurtiu == 'True'){
                                        var jaCurtiu = "ativo";
                                    }else{
                                        var jaCurtiu = "";
                                    }

                                if(data.Retorno[i].Portfolio.podeDespublicar == 'True'){
                                    var podeDespublicar = true;
                                }else{
                                    var podeDespublicar = false;
                                }

                                var RetornoHtml = '';
                                        
                                RetornoHtml += '<div class="itens">';
                                RetornoHtml += '    <ul class="acoes">';
                                RetornoHtml += '        <li class="comentar"><a href="javascript:void(0);" title="Comentar" class="comentarios_modal resumoComentario" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'"></a></li>';
                                RetornoHtml += '        <li class="'+jaCurtiu+' gostar Gostar'+ data.Retorno[i].Portfolio.idProducaoUsuario +'" idProducaoUsuario="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'"><a href="javascript:void(0);"></a></li>';
                                RetornoHtml += '    </ul>';
                                RetornoHtml += '    <div class="conteudo_geral">';
                                RetornoHtml += '        <span class="porftolio_top">';
                                RetornoHtml += '            <a href="' + data.Retorno[i].Portfolio.strLink + '" target="_blank">';
                                RetornoHtml += '                <img src="' + data.Retorno[i].Portfolio.strThumb + '" width="218" height="142" alt="' + data.Retorno[i].Portfolio.strProducao + '"/>';
                                RetornoHtml += '            </a>';
                                RetornoHtml += '        </span>';
                                RetornoHtml += '        <a href="' + data.Retorno[i].Portfolio.strLink + '" target="_blank">';
                                RetornoHtml += '           <h3 class="din">' + data.Retorno[i].Portfolio.strProducao + '</h3>';
                                RetornoHtml += '            <p>' + data.Retorno[i].Portfolio.DescricaoFerramenta + '</p>';
                                RetornoHtml += '        </a>';
                                RetornoHtml += '    </div>';
                                RetornoHtml += '    <a class="resumo curtir_modal" title="Ver quem gostou" href="javascript:abreListaCurtidas(\'' + data.Retorno[i].Portfolio.idProducaoUsuario +'\');" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">';
                                RetornoHtml += '        <span class="resumo_curtir resumoCurtir'+ data.Retorno[i].Portfolio.idProducaoUsuario +'" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">'+ data.Retorno[i].Portfolio.quantidadeCurtidas +'</span>';
                                RetornoHtml += '        <!--<span class="resumo_share">15</span>-->';
                                RetornoHtml += '    </a>';
                                RetornoHtml += '    <a href="javascript:void(0);" title="Comentar" class="resumo comentarios_modal resumo_modal resumoComentario" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">';
                                RetornoHtml += '	    <span class="resumo_comentario resumo_comentario'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">'+ data.Retorno[i].Portfolio.quantidadeComentarios +'</span>';
                                RetornoHtml += '    </a>';
                                if(podeDespublicar){
                                    if (classeAtivo == "despublicar") {
                                        RetornoHtml += '    <a class="publicar '+classeAtivo+'" title="Despublicado (Clique para publicar)" idProducaoUsuario="' + data.Retorno[i].Portfolio.idProducaoUsuario + '" href="javascript:void(0);"></a>';
                                    } else {
                                        RetornoHtml += '    <a class="publicar '+classeAtivo+'" title="Publicado (Clique para despublicar)" idProducaoUsuario="' + data.Retorno[i].Portfolio.idProducaoUsuario + '" href="javascript:void(0);"></a>';
                                    }
                                }
                                RetornoHtml += '</div>';
                                        
                                $(anoClicado).after(RetornoHtml);

                            }
                        
                            $('#listagem_itens').masonry('reload');
                            $('html,body').animate({scrollTop: parseInt($('.anoPortfolio'+intAno).offset().top)-55}, 2000); // rola a página para o ano selecionado.
                        }
                    },
                    error: function (data) {
                         $(anoClicado).html("");
                         $('.carregar').hide();
                         $('#materiais'+intAno).html('Ocorreu um erro na filtragem dos materiais.');
                         $('html,body').animate({scrollTop: parseInt($('.anoPortfolio'+intAno).offset().top)-55}, 2000); // rola a página para o ano selecionado.
                    }
                });
            }

         });

        $(".din a").click(function () {
            
            var anoClicado                  = $(this);
            var intAno                      = $(this).attr('intAno');
            var hoje                        = new Date();
            var anoAtual                    = hoje.getFullYear();
            var bolClique                   = false;
            
            // Verifica se o material deste ano já está carregado, para não carregar duas vezes.
            // Só carrega o ano se ele for diferente do ano atual, evita problema de carregar duas vezes o mesmo ano.
            if(intAno != anoAtual && intAno != parseInt(anoAtual-1) && $('.anoPortfolio2011').not(".blocoAno").size() == 0){
               
                var nomeUrl     = location.href;
                var strLogin    = "";
                var urlDestino  = "";
                var parametros  = "";

                if(nomeUrl.toLowerCase().indexOf("listamateriaispublico") > -1){

                    var aux     = nomeUrl.substring(nomeUrl.toLowerCase().indexOf("listamateriaispublico"));
                    aux         = aux.split("/");
                    strLogin    = aux[1];
                    urlDestino  = "/AVA/Portfolio/Home/ListaMateriaisPorAno";
                    parametros  = "intAno="+intAno+'&strLogin='+strLogin+'&paginacaoInicio=&paginacaoFim=';


                }else{

                   urlDestino  = "/AVA/Portfolio/Home/ListaMateriaisPorAno";
                   parametros  = "intAno="+intAno+'&strLogin=&paginacaoInicio=&paginacaoFim=';

                }
                //$('#materiais'+intAno).html("");
                $('.imgCarregando').show();
                $.ajax({
                    url:        urlDestino,
                    dataType :  'json',
                    type:       'GET',
                    data:       parametros,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {

                         if (data.Retorno[0].erro == 1) {

                            naoTemMaterial = true;
                            $('.carregar').hide();
                            $('.imgCarregando').hide();
                            //$('#materiais'+intAno).html('<span class="itens carregar_proximo_sem_material"><p>Nenhum material encontrado.</p></span>');
                            $('#listagem_itens').masonry('reload');

                            $('.din a').removeClass('ativo');
                            $(anoClicado).addClass('ativo');
                            $('html,body').animate({scrollTop: parseInt($('.anoPortfolio'+intAno).offset().top)-55}, 2000); // rola a página para o ano selecionado.
                        } else {
                            
                            $('#materiais'+intAno).html("");

                            $('.ativo').removeClass('ativo');
                            $(anoClicado).addClass('ativo');
                            hoje                        = new Date()
                            anoAtual                    = hoje.getFullYear();
                            
                            for (i = 1; i < data.Retorno.length; i++) {
                            
                                if(data.Retorno[i].Portfolio.bolPublico == 'True'){
                                    var classeAtivo = "";
                                }else{
                                    var classeAtivo = "despublicar";
                                }

                                if(data.Retorno[i].Portfolio.jaCurtiu == 'True'){
                                       var jaCurtiu = "ativo";
                                }else{
                                       var jaCurtiu = "";
                                }

                                if(data.Retorno[i].Portfolio.podeDespublicar == 'True'){
                                    var podeDespublicar = true;
                                }else{
                                    var podeDespublicar = false;
                                }
                                var RetornoHtml = '';
                                        
                                 
                                RetornoHtml += '<div class="itens">';
                                RetornoHtml += '    <ul class="acoes">';
                                RetornoHtml += '        <li class="comentar"><a href="javascript:void(0);" title="Comentar" class="comentarios_modal resumoComentario" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'"></a></li>';
                                RetornoHtml += '        <li class="'+jaCurtiu+' gostar Gostar'+ data.Retorno[i].Portfolio.idProducaoUsuario +'" idProducaoUsuario="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'"><a href="javascript:void(0);"></a></li>';
                                RetornoHtml += '    </ul>';
                                RetornoHtml += '    <div class="conteudo_geral">';
                                RetornoHtml += '        <span class="porftolio_top">';
                                RetornoHtml += '            <a href="' + data.Retorno[i].Portfolio.strLink + '" target="_blank">';
                                RetornoHtml += '                <img src="' + data.Retorno[i].Portfolio.strThumb + '" width="218" height="142" alt="' + data.Retorno[i].Portfolio.strProducao + '"/>';
                                RetornoHtml += '            </a>';
                                RetornoHtml += '        </span>';
                                RetornoHtml += '        <a href="' + data.Retorno[i].Portfolio.strLink + '" target="_blank">';
                                RetornoHtml += '           <h3 class="din">' + data.Retorno[i].Portfolio.strProducao + '</h3>';
                                RetornoHtml += '            <p>' + data.Retorno[i].Portfolio.DescricaoFerramenta + '</p>';
                                RetornoHtml += '        </a>';
                                RetornoHtml += '    </div>';
                                RetornoHtml += '    <a class="resumo curtir_modal" title="Ver quem gostou" href="javascript:abreListaCurtidas(\'' + data.Retorno[i].Portfolio.idProducaoUsuario +'\');"'+ data.Retorno[i].Portfolio.idProducaoUsuario +'\");" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">';
                                RetornoHtml += '        <span class="resumo_curtir resumoCurtir'+ data.Retorno[i].Portfolio.idProducaoUsuario +'" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">'+ data.Retorno[i].Portfolio.quantidadeCurtidas +'</span>';
                                RetornoHtml += '        <!--<span class="resumo_share">15</span>-->';
                                RetornoHtml += '    </a>';
                                RetornoHtml += '    <a href="javascript:void(0);" title="Comentar" class="resumo comentarios_modal resumoComentario" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">';
                                RetornoHtml += '	    <span class="resumo_comentario resumo_comentario'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">'+ data.Retorno[i].Portfolio.quantidadeComentarios +'</span>';
                                RetornoHtml += '    </a>';
                                if(podeDespublicar){
                                    RetornoHtml += '    <a class="publicar '+classeAtivo+'" title="Publicado (Clique para despublicar)" idProducaoUsuario="' + data.Retorno[i].Portfolio.idProducaoUsuario + '" href="javascript:void(0);"></a>';
                                }
                                RetornoHtml += '</div>';
                                $('#materiais'+intAno).append(RetornoHtml);
                                
                            } 
                            $('.imgCarregando').hide();
                            $('.carregar').hide();
                            $('#listagem_itens').masonry('reload');
                            $('.din a').removeClass('ativo');
                            $(anoClicado).addClass('ativo');
                            $('html,body').animate({scrollTop: parseInt($('.anoPortfolio'+intAno).offset().top)-55}, 2000); // rola a página para o ano selecionado.

                        }
                    },
                    error: function (data) {
                      $('.imgCarregando').hide();
                      $('#materiais'+intAno).html('Ocorreu um erro na filtragem dos materiais.');
                      $('html,body').animate({scrollTop: parseInt($('.anoPortfolio'+intAno).offset().top)-55}, 2000); // rola a página para o ano selecionado.
                    }
                });
            }else{ // Ja tem o material carregado então só ajusta o site.
                    $('.din a').removeClass('ativo');
                    $(anoClicado).addClass('ativo');
                    $('html,body').animate({scrollTop: parseInt($('.anoPortfolio'+intAno).offset().top)-55}, 2000);
            }
        });

      

    });


    $('.ava_container_masonry').masonry({
        itemSelector: '.ava_box_masonry'
    });

    $('#listagem_itens').masonry({
        itemSelector: '.itens',
        columnWidth: 3
        /*columnWidth: function( containerWidth ) {
            return containerWidth / 5;
          }*/
    });

    $('#listagem_itens').on('click','a.publicar',function(){
    
        var olhoClicado = $(this);
        var idProducaoUsuario = $(this).attr('idProducaoUsuario');
        var bolPublico = 0;

        if ($(this).hasClass('despublicar')) {
            bolPublico = 1;
        } else {
            bolPublico = 0;
        }
        $.ajax({
            url: '/AVA/Portfolio/Home/PublicarDespublicarMaterial',
            type: 'POST',
            data: 'idProducaoUsuario=' + idProducaoUsuario + '&bolPublico=' + bolPublico,
            success: function (data) {
                $(olhoClicado).toggleClass("despublicar");
                if(bolPublico == 1) {
                    $(olhoClicado).attr('title', 'Publicado (Clique para despublicar)');
                } else {
                    $(olhoClicado).attr('title', 'Despublicado (Clique para publicar)');
                }
                
            },
            error: function (data) {
                alert('O material não pode ser despublicado.');
                $(olhoClicado).toggleClass("publicar");
                //$('.carregar').hide();
            }
        });

    });
    $("a.curtido").click(function () {
        $(this).toggleClass("ativo");
    });
    $(".listagem_curtidos a.mudar_listagem").click(function () {
        $(this).toggleClass("ativo");
    });
    $("body").on('click','.acoes .gostar',function(){
        var botaoClicado            = $(this);
        var idProducaoUsuario       = $(this).attr('idProducaoUsuario');
        var bolCurtido              = false;

        if ($(this).hasClass('ativo')) {
            bolCurtido = true;
            $('a', botaoClicado).attr('title', 'Gostar');
        } else {
            $('a', botaoClicado).attr('title', 'Você gostou disto (desfazer)');
        }

        var nomeUrl = location.href;
        var strLogin = "";
        var urlDestino = "";
        var parametros = "";

        if(nomeUrl.toLowerCase().indexOf("listamateriaispublico") > -1){
        var aux     = nomeUrl.substring(nomeUrl.toLowerCase().indexOf("listamateriaispublico"));
        aux         = aux.split("/");
        strLogin    = aux[1];
        }

        if(!bolCurtido){
            $.ajax({
                url: '/AVA/Portfolio/Home/CurtirProducao/?idProducaoUsuario='+idProducaoUsuario+'&strLogin='+strLogin,
                type: 'POST',
                success: function (data) {
                    $(botaoClicado).toggleClass("ativo"); //Coloca a classe ativo no botão superior de gostar.
                    $('.resumoCurtir'+idProducaoUsuario).html(data).effect("bounce", {times:2}, 300); //Incrementa a qtdade de curtidas no botão debaixo
                    $('.gostar'+idProducaoUsuario).addClass('ativo'); //Adiciona a classe ativo no botão curtir debaixo.
                },
                error: function (data) {
                    alert('O material não pode ser curtido.');
                    $(botaoClicado).toggleClass("ativo");
                }
            });
        }else{
                $.ajax({
                url: '/AVA/Portfolio/Home/DescurtirProducao/?idProducaoUsuario='+idProducaoUsuario+'&strLogin='+strLogin,
                type: 'POST',
                success: function (data) {
                    $(botaoClicado).toggleClass("ativo"); //Coloca a classe ativo no botão superior de gostar.
                    $('.resumoCurtir'+idProducaoUsuario).html(data).effect("bounce", {times:2}, 300); //decrementa a qtdade de curtidas no botão debaixo
                    $('.gostar'+idProducaoUsuario).removeClass('ativo'); //Adiciona a classe ativo no botão curtir debaixo.
                },
                error: function (data) {
                    alert('O material não pode ser descurtido.');
                    $(botaoClicado).toggleClass("ativo");
                }
            });
        }

    });

/*    function CarregarAno(ano){
            
            var intAno       = ano;
            var anoClicado   = $('.anoPortfolio'+ano);
            var hoje         = new Date()
            var anoAtual     = hoje.getFullYear();
            if(intAno != ""){
                
                if(intAno == anoAtual){
                    $('html,body').animate({scrollTop: parseInt($('#wrapper').offset().top)-5}, 2000);
                }
               
                var nomeUrl = location.href;
                var strLogin = "";
                var urlDestino = "";
                var parametros = "";

                if(nomeUrl.toLowerCase().indexOf("listamateriaispublico") > -1){

                    var aux     = nomeUrl.substring(nomeUrl.toLowerCase().indexOf("listamateriaispublico"));
                    aux         = aux.split("/");
                    strLogin    = aux[1];
                    urlDestino  = "/AVA/Portfolio/Home/ListaMateriaisPorAno";
                    parametros  = "intAno="+intAno+'&strLogin='+strLogin+'&paginacaoInicio=&paginacaoFim=';

                }else{

                    urlDestino  = "/AVA/Portfolio/Home/ListaMateriaisPorAno";
                    parametros  = "intAno="+intAno+'&strLogin=&paginacaoInicio=&paginacaoFim=';
                }
                  
                  //$(anoClicado).after('<div class="carregar"><img width="43" height="11" src="<%=Url.CDNLink("/Common/img/perfil/carregando.gif") %>">Carregando mais ítens do portfólio</div>');
                  $('.anoPortfolio2008').after().html("");
                  // Carrega os materiais filtrando pelo ano clicado.
                  $.ajax({
                    url:        urlDestino,
                    dataType :  'json',
                    type:       'GET',
                    data:       parametros,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                         
                         $('.carregar').hide();
                         if (data.Retorno[0].erro == 1) {

                            naoTemMaterial = true;
                            $('.carregar').hide();
                            if(intAno != anoAtual){
                                $('anoPortfolio'+intAno).html('Nenhum material encontrado.');
                            }

                        } else {
                            $(anoClicado).css('cursor','').attr('intAnoCarregar','');
                            

                            for (i = 1; i < data.Retorno.length; i++) {
                            
                                if(data.Retorno[i].Portfolio.bolPublico == 'True'){
                                    var classeAtivo = "";
                                }else{
                                    var classeAtivo = "despublicar";
                                }
                                  if(data.Retorno[i].Portfolio.jaCurtiu == 'True'){
                                        var jaCurtiu = "ativo";
                                    }else{
                                        var jaCurtiu = "";
                                    }

                                if(data.Retorno[i].Portfolio.podeDespublicar == 'True'){
                                    var podeDespublicar = true;
                                }else{
                                    var podeDespublicar = false;
                                }

                                var RetornoHtml = '';
                                        
                                RetornoHtml += '<div class="itens">';
                                RetornoHtml += '    <ul class="acoes">';
                                RetornoHtml += '        <li class="comentar"><a href="javascript:void(0);" class="comentarios_modal resumoComentario" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'"></a></li>';
                                RetornoHtml += '        <li class="'+jaCurtiu+' gostar Gostar'+ data.Retorno[i].Portfolio.idProducaoUsuario +'" idProducaoUsuario="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'"><a href="javascript:void(0);"></a></li>';
                                RetornoHtml += '    </ul>';
                                RetornoHtml += '    <div class="conteudo_geral">';
                                RetornoHtml += '        <span class="porftolio_top">';
                                RetornoHtml += '            <a href="' + data.Retorno[i].Portfolio.strLink + '" target="_blank">';
                                RetornoHtml += '                <img src="/AVA' + data.Retorno[i].Portfolio.strThumb + '" width="218" height="142" alt="atividade"/>';
                                RetornoHtml += '            </a>';
                                RetornoHtml += '        </span>';
                                RetornoHtml += '        <a href="' + data.Retorno[i].Portfolio.strLink + '" target="_blank">';
                                RetornoHtml += '           <h3 class="din">' + data.Retorno[i].Portfolio.strProducao + '</h3>';
                                RetornoHtml += '            <p>' + data.Retorno[i].Portfolio.DescricaoFerramenta + '</p>';
                                RetornoHtml += '        </a>';
                                RetornoHtml += '    </div>';
                                RetornoHtml += '    <a class="resumo curtir_modal" href="javascript:abreListaCurtidas(\'' + data.Retorno[i].Portfolio.idProducaoUsuario +'\');" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">';
                                RetornoHtml += '        <span class="resumo_curtir resumoCurtir'+ data.Retorno[i].Portfolio.idProducaoUsuario +'" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">'+ data.Retorno[i].Portfolio.quantidadeCurtidas +'</span>';
                                RetornoHtml += '        <!--<span class="resumo_share">15</span>-->';
                                RetornoHtml += '    </a>';
                                RetornoHtml += '    <a href="javascript:void(0);" class="resumo comentarios_modal resumo_modal resumoComentario" ident="'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">';
                                RetornoHtml += '	    <span class="resumo_comentario resumo_comentario'+ data.Retorno[i].Portfolio.idProducaoUsuario +'">'+ data.Retorno[i].Portfolio.quantidadeComentarios +'</span>';
                                RetornoHtml += '    </a>';
                                if(podeDespublicar){
                                    RetornoHtml += '    <a class="publicar '+classeAtivo+'" idProducaoUsuario="' + data.Retorno[i].Portfolio.idProducaoUsuario + '" href="javascript:void(0);"></a>';
                                }
                                RetornoHtml += '</div>';
                                        
                                $(anoClicado).after(RetornoHtml);

                            }
                        
                            $('#listagem_itens').masonry('reload');
                            $('html,body').animate({scrollTop: parseInt($('.anoPortfolio'+intAno).offset().top)-55}, 2000); // rola a página para o ano selecionado.
                        }
                    },
                    error: function (data) {
                         
                         $('.carregar').hide();
                         $(anoClicado).after('Ocorreu um erro na filtragem dos materiais.');
                    }
                });
            }

    }
    */
    function deletarComentario(idFerramentaMensagem,idProducaoUsuario, intValida){

        if (intValida == 1) {
            $.ajax({
                url: '/AVA/Portfolio/Home/DeletarComentario/?idFerramentaMensagem='+idFerramentaMensagem,
                type: 'POST',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $('.comentario_usuario'+idFerramentaMensagem).remove();
                   
                    if($(".comentario_usuario").not(".escondame").size() > 5){
                        $('.exibir').html('<a href="javascript:void(0);" class="exibir">Exibir todos os <strong>'+$(".comentario_usuario").size()+' comentários</strong><span class="seta">&nbsp;</span></a>');
                    }else if($(".comentario_usuario").not(".escondame").size() == 1){
                        $('.exibir').html('<strong>'+$(".comentario_usuario").size()+' comentário</strong>');   
                    }else{
                        $('.exibir').html('<strong>'+$(".comentario_usuario").size()+' comentários</strong>');   
                    }
                    }
            });
        } else {
            $('span.tooltip').css('display', 'none');
        }

    }

    function abreListaCurtidas(idProducaoEdicao){
    
     $.fancybox({
            'height' : '630px',
            'href': '/AVA/Portfolio/Home/ListaCurtidas/?idProducaoUsuario='+idProducaoEdicao,
            'hideOnContentClick': false,
            'onComplete': function(e){
                    // Funções que serão executadas dentro do fancybox
                    $('.mudar_listagem').toggle();
                    $('.escondame').toggle();
                    
                    // Curtir publicação
                    /*
                    $(".gostar").click(function(){
                        var botaoClicado            = $(this);
                        var idProducaoUsuario       = $(this).attr('idProducaoUsuario');
                        var bolCurtido              = false;

                        if ($(this).hasClass('ativo')) {
                            bolCurtido = true;
                        } 

                         var nomeUrl = location.href;
                         var strLogin = "";
                         var urlDestino = "";
                         var parametros = "";

                         if(nomeUrl.toLowerCase().indexOf("listamateriaispublico") > -1){
                            var aux     = nomeUrl.substring(nomeUrl.toLowerCase().indexOf("listamateriaispublico"));
                            aux         = aux.split("/");
                            strLogin    = aux[1];
                         }
                        if(!bolCurtido){
                            $.ajax({
                                url: '/AVA/Portfolio/Home/CurtirProducao/?idProducaoUsuario='+idProducaoUsuario+'&strLogin='+strLogin,
                                type: 'POST',
                                success: function (data) {
                                    $(botaoClicado).toggleClass("ativo"); //Coloca a classe ativo no botão de gostar.
                                    $('.resumoCurtir'+idProducaoUsuario).html(data).effect("bounce", {times:2}, 300); //Incrementa a qtdade de curtidas no botão debaixo
                                    $('.gostar'+idProducaoUsuario).addClass('ativo'); //Adiciona a classe ativo no botão curtir de baixo.
                                    $('.Gostar'+idProducaoUsuario).addClass('ativo'); //Adiciona a classe ativo no box de baixo.
                                    parent.$.fancybox.close();
                                    $(e).trigger('click');
                                    
                                },
                                error: function (data) {
                                    alert('O material não pode ser curtido.');
                                    $(botaoClicado).toggleClass("ativo");
                                }
                            });
                        }else{
                                $.ajax({
                                url: '/AVA/Portfolio/Home/DescurtirProducao/?idProducaoUsuario='+idProducaoUsuario+'&strLogin='+strLogin,
                                type: 'POST',
                                success: function (data) {
                                    $(botaoClicado).toggleClass("ativo"); //Coloca a classe ativo no botão superior de gostar.
                                    $('.resumoCurtir'+idProducaoUsuario).html(data).effect("bounce", {times:2}, 300); //decrementa a qtdade de curtidas no botão debaixo
                                    $('.gostar'+idProducaoUsuario).removeClass('ativo'); //remove a classe ativo no botão curtir debaixo.
                                    $('.Gostar'+idProducaoUsuario).removeClass('ativo'); //Remove a classe ativo do box debaixo.
                                    parent.$.fancybox.close();
                                    $(e).trigger('click');
                                },
                                error: function (data) {
                                    alert('O material não pode ser descurtido.');
                                    $(botaoClicado).toggleClass("ativo");
                                }
                            });
                        }

                    });
                    */

                }
            });
            
    }

	</script>    
</asp:Content>
