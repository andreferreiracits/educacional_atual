<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaPaginada<ProvaColegiada.Models.Classificacao.AbstractClassificacao>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <tbody>
<%
    if (Model != null && Model.Linhas.Count > 0)
    {
        foreach (NivelEnsino nivelEnsino in Model.Linhas)
        {
%>
        <tr>
            <td width="50%">
                <a class="lnk"><%= nivelEnsino.Pai.Nome%></a>
                <div class="botoes">
                    <%= Html.ActionLink("Excluir", "ExcluirTipoClassificacao", new { @id = nivelEnsino.Id }, new { @class = "btnExcluir" })%>
                </div>
            </td>
            <td width="50%"><%=nivelEnsino.RepresentaRaiz ? "" : nivelEnsino.Nome%></td>
        </tr>
<%
        }
    }else{
        %>
         <tr class="vazio">
            <td colspan="2">Nenhum nível de ensino selecionado.</td>
        </tr>
        <%
    }
    
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>



