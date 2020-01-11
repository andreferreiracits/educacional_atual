<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Framework.Utils.Entidades.Lista.Paginacao.PaginacaoView>" %>
<tfoot>
    <tr>
        <td id="resultado"> <%= Model.TextoTotal %> </td>
        <% if (Model != null && Model.ListaPaginas.Count > 0) { %>
        <td id="pagina">
            <a class="descricao"><%= Model.TextoDescricao %></a>
            <% foreach (Avaliacoes.Framework.Utils.Entidades.Lista.Paginacao.Pagina pagina in Model.ListaPaginas) {
                if (pagina.Numero > 0) { %>
                    <%= Html.ActionLink(pagina.Texto, "GestoresBanco", new { @pagina = pagina.Numero }, new { @class = pagina.Estilo })%>
               <% } else { %>
                    <a class="<%= pagina.Estilo %>"><%= pagina.Texto %></a>
               <% }
               } %>
        </td>
        <% } %>
    </tr>
</tfoot>