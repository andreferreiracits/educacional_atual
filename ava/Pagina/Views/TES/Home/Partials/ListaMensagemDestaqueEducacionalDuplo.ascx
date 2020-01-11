<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Pagina.Models.MensagemRapida>>" %>
    <%
    if (Model != null)
    {
        var count = 1;
    %>
        <header>
	        <h4>Destaques Educacional</h4>
        </header>
        <div class="bloco_conteudo destaque">
        <%
        if (Model.Count > 1)
        {
        %>
            <nav class="nav_carrosel">
		        <a href="" class="prev" id="prev_dest_duplo"></a>
		        <a href="" class="next" id="next_dest_duplo"></a>
	        </nav>
        <%
        }
        %>
        <div id="lista_destaque_duplo" class="carrosel">
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
        var order = 1;
        int numberOf = (Model.Count < 4) ? Model.Count : 4;
        %>
        <nav id="nav_footer_destaque_duplo" max="<%=numberOf %>" class="nav_footer">
            <a href="/AVA/Pagina/<%=objPagina.strLink%>#Destacados" class="opcao_vertodos">Veja mais</a>
            <%
            if (numberOf > 1)
            {
            %>
		        <ul>
                    <%foreach (var f in Model.Take(numberOf))
                        {%>
				        <li id="<%=order %>" order="<%=order %>" <%if(order == 1){ %>class="ativo bulletNav"<%} %>><a id="<%=order %>" ></a></li>
				        <%order = order + 1; %>
                    <%
                        }
                    %>
		        </ul>
            <% 
            }
            %>
	    </nav>
    </div>
    <%

    }
    else
    {
        %>0<%
    }
%>