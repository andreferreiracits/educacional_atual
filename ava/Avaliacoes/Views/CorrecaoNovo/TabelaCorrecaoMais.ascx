<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.AplicacaoCorrecaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.Models.Exam" %>
<%@ Import namespace="ProvaColegiada.TabelaViews.Shared" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="Avaliacoes.Framework.Utils.Geral" %>
<table data-tabela="mais" data-tabela-carrendo=".sec025carregando">
        <tbody>
            <% foreach (AplicacaoCorrecaoVOView item in Model.Linhas)
               {  %>
            <tr>
                <td title="<%:item.Titulo %>"><p><%=Html.ActionLink(item.Titulo, "Aplicacao", "Correcao", new { id = item.Id }, null)%></p></td>
                <td><%=Html.RecursoPlural("Framework.Migrar.HomeCorrecaoFalta", item.TotalQuestoesPendentesCorrigir)%> <b><%=item.TotalQuestoesPendentesCorrigir%></b> <%=Html.RecursoPlural("Framework.Migrar.HomeCorrecaoQuestao", item.TotalQuestoesPendentesCorrigir)%></td>
            </tr>  
            <% } %>
        </tbody>
        <% 
            //TODO: pensar em uma forma de abstrair melhor esta parte do "mais" caso seja utilizado mais vezes
            if (Model.Paginacao.TotalPaginas > 1 && Model.Paginacao.PaginaAtual < Model.Paginacao.TotalPaginas)
           {%>
        <tfoot>
            <tr><td colspan="2">
                <div class="sec025carregando">Carregando...</div>
                <%= Html.ActionLink("mais", "ProximaCorrecao", "CorrecaoNovo", new { id = Model.Paginacao.PaginaAtual }, null)%>
                </td></tr>
        </tfoot>
        <%} %>
    </table>
