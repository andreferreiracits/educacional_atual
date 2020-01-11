<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Pagina.Models.PaginaEducacional>" %>
<% 
    var strLogoEscolaPadrao = ViewData["logoEscolaPadrao"].ToString();
    
    var strBackground = Model.strLogoTopo;
    var strLogoEscola = Model.strIconeTopo;

    if (String.IsNullOrEmpty(strBackground))
    {
        strBackground = "/AVA/StaticContent/Common/img/paginas/escolas/topo_padrao.jpg";
        if (String.IsNullOrEmpty(strLogoEscola))
        {
            strLogoEscola = strLogoEscolaPadrao;
        }
    }    
%>
<div class="barra_topo_itens" style="background:url(<%=strBackground%>);">
	<div class="info_grupo_topo">
		<% if(!String.IsNullOrEmpty(strLogoEscola)) { %>
		<div class="foto_grupo centraliza_icon">
			<img alt="" src="<%=strLogoEscola%>" />
		</div>
        <% } %>
	</div>	
</div>