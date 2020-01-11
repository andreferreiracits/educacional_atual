<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaPaginada<ProvaColegiada.Models.Classificacao.AbstractClassificacao>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <tbody>
<%
    if (Model != null && Model.Linhas.Count > 0)
    {
        foreach (Enem enem in Model.Linhas)
        {
%>
        <tr>
            <td colspan="2">
                <a class="lnk"><%= enem.NomeCompleto%></a>
                <div class="botoes">
                    <%= Html.ActionLink("Excluir", "ExcluirTipoClassificacao", new { @id = enem.Id }, new { @class = "btnExcluir" })%>
                </div>
            </td>
        </tr>
<%
        }
    }else{
        %>
         <tr class="vazio">
            <td colspan="2">Nenhum assunto selecionado.</td>
        </tr>
        <%
    }
    
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>



