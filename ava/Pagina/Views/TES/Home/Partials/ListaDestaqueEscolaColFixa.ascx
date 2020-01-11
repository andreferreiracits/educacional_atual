<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Pagina.Models.MensagemRapida>>" %>
<%
    if (Model != null)
    {
        var count = 1;
%>
<header>
	<h4>Destaques da Escola</h4>
</header>
<div class="bloco_conteudo destaque">
    <%
        if (Model.Count > 1)
        {
    %>
    <nav class="nav_carrosel">
			<a href="" class="prev" id="next_destColFix_simples"></a>
			<a href="" class="next" id="prev_destColFix_simples"></a>
		</nav>
    <%
        }
    %>
    <div id="lista_destaqueColFix_simples" class="carrosel">
        <ul class="lista_destaques">
            <%
        var objPagina = (Pagina.Models.PaginaEducacional)ViewData["objPagina"];
        foreach (var d in Model)
        {
            ViewData["order"] = count;
            Html.RenderPartial("Partials/BoxMensagemDestaqueNovaHome", d, ViewData);
            count += 1;
        }
            %>
        </ul>
    </div>
    <%
    if (Model.Count > 0)
    {
    %>
        <nav id="nav_footer_destaqueColFix_simples" max="<%=Model.Count %>" class="nav_footer">
		    <a href="/AVA/Pagina/<%=objPagina.strLink %>#Destacados" class="opcao_vertodos">Veja mais</a>
	    </nav>
    <%
    }
    %>
</div>
<%
    }
    else
    {
%>0<%
    }
%>