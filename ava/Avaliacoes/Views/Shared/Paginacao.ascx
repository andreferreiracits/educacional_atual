<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Paginacao>" %>
<tfoot>
    <tr>
        <td id="resultado">
            <%= Model.Total %>
        </td>
        <%
            if (Model != null && Model.Paginas.Count > 0)
            {
                %>
                <td id="pagina">
                    <a class="descricao"><%= Model.Descricao %></a>
                    <%
                        foreach (ProvaColegiada.TabelaViews.Pagina pagina in Model.Paginas)
                        {
                            if (pagina.Numero > 0)
                            {
                                %>
                                <%= Html.ActionLink(pagina.Texto, "GestoresBanco", new { @pagina = pagina.Numero }, new { @class = pagina.Estilo }) %>
                                <%
                            }
                            else
                            {
                                %>
                                <a class="<%= pagina.Estilo %>"><%= pagina.Texto %></a>
                                <%
                            }
                        }
                    %>
                </td>
                <%
            }
        %>
    </tr>
</tfoot>