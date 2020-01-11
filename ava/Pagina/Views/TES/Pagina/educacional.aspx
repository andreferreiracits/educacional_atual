<%@ Page Title="" Language="C#" MasterPageFile="~/Views/TES/Shared/Pagina.Master" Inherits="System.Web.Mvc.ViewPage<Pagina.Models.PaginaEducacional>" %>
<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <input type="hidden" id="idPagina" value="<%=Model.idPagina%>" />
    <input type="hidden" id="intAlteracoesPagina" value="0" />
    <input type="hidden" id="indexPaginacao" value="1" />    
    <input type="hidden" id="editando" value="0" />
	
    <%
    
    bool bolPostUnico = ViewData["bolPostUnico"] == null ? false : (bool)ViewData["bolPostUnico"];
    int idPostUnico = ViewData["idPostUnico"] == null ? 0 : (int)ViewData["idPostUnico"];
    var bolPossuiDestaques = (bool)ViewData["bolPossuiDestaques"];
    bool bolCPPuro = (bool)Session["bolCPPuro"];

    switch (Model.idPagina)
    { 
        case 1:
            Html.RenderPartial("Partials/BarraPagina", Model);
            break;
        case 2:
            Html.RenderPartial("Partials/BarraProjetos", Model, ViewData);
            break;
        default:
            Html.RenderPartial("Partials/BarraEscolas", Model);
            break;
    }
    
    %>
    <input type="hidden" id="idPost" value="<%=ViewData["idPost"]%>">
	<section class="hs1" id="ava_mural_geral">
		<div id="wrapper">
			<% if (Model.bolPodeAdministrar && !bolPostUnico) { Html.RenderPartial("../Home/Partials/MensagemRapida", null, new ViewDataDictionary(){ {"objPagina", Model} }); } %>
			<section class="timeline paginas">
                <input type="hidden" id="hAssuntoTimeLine" initvalue="0" value="0" />
                <% if(!bolPostUnico) { %>
		        <header>
		            <h1 class="komika sessao_mural ativo"><a href="javascript:void(0);"><span class="seta_baixo"></span>MURAL</a></h1>  
                    <% if(Model.bolPodeAdministrar) { %>
		                <h1 class="komika sessao_agendados"><a href="javascript:void(0);"><span class="seta_baixo"></span>AGENDADOS</a></h1>
                    <% } %>
                    <% if (Model.idPagina > 2 && bolPossuiDestaques || Model.idPagina == 1 && bolPossuiDestaques)
                       { %>
                    <h1 class="komika sessao_destacados"><a href="javascript:void(0);"><span class="seta_baixo"></span>DESTACADOS</a></h1>
                    <% 
                       }

                       if ((bolCPPuro && Model.idPagina != 1) || !bolCPPuro)
                       {
                    %>
                    <div class="bootstrap right">
				        <div class="btn-group">                     
			                <button href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtAssuntoTimeLine"> 
                                Todos os assuntos&nbsp;<span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" id="cbAssuntoTimeLine">
                                <li assu="0" strassu="geral">
                                    <input type="checkbox" id="ckAssuntoTimeLine0" checked="checked" />
			                        <label for="ckAssuntoTimeLine0">Todos os assuntos&nbsp;</label>
			                    </li>
                                <% foreach (var assu in Model.assuntos)
                                   { %> 
                                    <li assu="<%=assu.idAssunto%>" strassu="<%=HttpUtility.UrlEncodeUnicode(assu.strAssunto.ToLower())%>">
                                        <input type="checkbox" id="ckAssuntoTimeLine<%=assu.idAssunto%>" />
			                            <label for="ckAssuntoTimeLine<%=assu.idAssunto%>"><%=assu.strAssunto%>&nbsp;</label>
			                        </li>                        
                                <% } %>	                                                     
			                </ul>
			            </div>  
			        </div>
                    <% } %>                        
		        </header>	
                <% } %>	
		        <div id="ava_fluxoarticles">
		          	 <div id="loader_timeline" style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>           
		        </div>
		        <footer class="blokletters" style="display:none;">
		            <a class="" title="veja mais" href="#">veja mais</a>
		        </footer>
		    </section>
            <input type="hidden" id="idPostUnico" init="<%=idPostUnico %>" value="<%=idPostUnico %>" /> 				
		</div>
	</section>	
</asp:Content>