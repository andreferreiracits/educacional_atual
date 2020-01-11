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
			<a href="" class="prev" id="prev_destE_simples"></a>
			<a href="" class="next" id="next_destE_simples"></a>
		</nav>
        <%
        }
        %>
		<div id="lista_destaqueE_simples" class="carrosel">
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
		<nav id="nav_footer_destaqueE_simples" max="<%=Model.Count %>" class="nav_footer">
			<a href="/AVA/Pagina/<%=objPagina.strLink %>#Destacados" class="opcao_vertodos opcao_furacao">Veja mais</a>
			<ul>
                <%foreach(var f in Model) {%>
					<li id="<%=order %>" order="<%=order %>" <%if(order == 1){ %>class="ativo bulletNav"<%} %>><a id="<%=order %>" ></a></li>
                <%
                      order += 1;
                } 
                %>				
			</ul>
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
