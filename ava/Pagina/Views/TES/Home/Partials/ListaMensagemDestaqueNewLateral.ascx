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
			<a href="" class="prev" id="prev"></a>
			<a href="" class="next" id="next"></a>
		</nav>
        <%
        }
        %>
		<div id="" class="carrosel">
			<ul class="lista_destaques">
                <%
                    var objPagina = (Pagina.Models.PaginaEducacional)ViewData["objPagina"];
                    foreach (var d in Model)
                    {
                        ViewData["order"] = count;
                        Html.RenderPartial("Partials/BoxMensagemDestaque", d, ViewData);
                        count += 1;
                    }   
                %>				
			</ul>
		</div>
        <%
        if (Model.Count > 1)
        {
            var order = 1;
        %>
		<nav id="" max="<%=Model.Count %>" class="nav_footer">
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
