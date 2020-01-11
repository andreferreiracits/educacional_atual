<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/BarraEsquerda.Master" debug="true" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<List<Portfolio.Model.Materiais>>" %>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">

<%
    var strApelido = ViewData["strApelido"];
    var strNome = ViewData["strNome"];
    var strLogin = ViewData["strLogin"];

%>
   
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
                                 <%
                                     if (strApelido == "" || strApelido == null)
                                     {
                                         %>
                                            <h1 class="blokletters">Portf&oacute;lio de <%= strNome%></h1>
                                         <%
                                     }
                                     else
                                     {
                                        %>
                                            <h1 class="blokletters">Portf&oacute;lio de <%= strApelido%></h1>
                                        <%
                                     }
                                 %>
                                 
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
                                                        <% if (MaterialDoUsuario.strLink.Contains("javascript")){%>
                                                            <a href="<%=MaterialDoUsuario.strLink%>">
                                                        <% }else{ %>
                                                            <a href="<%=MaterialDoUsuario.strLink%>" target="_blank">
                                                        <% } %>

						                                <img src="<%=MaterialDoUsuario.strThumb%>" width="218" height="142" alt="<%=MaterialDoUsuario.strProducao%>"/>
                                                        </a>
					                                </span>
						                            
                                                        <% if (MaterialDoUsuario.strLink.Contains("javascript")){%>
                                                            <a href="<%=MaterialDoUsuario.strLink%>">
                                                        <% }else{ %>
                                                            <a href="<%=MaterialDoUsuario.strLink%>" target="_blank">
                                                        <% } %>

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
                           }
                            string strAnosCountTodos = ViewData["countAnoMaterias"].ToString();

                            if (strAnosCountTodos.Length > 0)
                            {
                                
                                
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
                            }
                            %>
					</section>
					<div class="carregar" style="display: none;">
						<img width="43" height="11" src="<%=Url.CDNLink("/Common/img/perfil/carregando.gif") %>">
						Carregando mais ítens do portfólio
					</div>	
				</div>	
					
			</section>

        <script src="/AVA/StaticContent/Common/Scripts/jquery.tools.min.js<%=Url.TimeStampLink() %>"></script>
		<script src="/AVA/StaticContent/Common/Scripts/libs/jquery.jcarousel.js<%=Url.TimeStampLink() %>"></script>
        <script src="/AVA/StaticContent/Common/Scripts/portfolio_3.0.0.js<%=Url.TimeStampLink() %>"></script>
           
</asp:Content>
