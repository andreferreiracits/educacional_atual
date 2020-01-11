<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaQuestaoProva<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>">
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr>
            <td>
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão ID {0}", linha.Id)) %>" rel="<%= Url.Action("CarregarTooltip","Questoes", new { @id = linha.Id.ToString() })%>"></a>
            </td>
            <td>
                <a class="lnk">
                    <%= Html.Encode(linha.Enunciado) %>
                </a>
            </td>
            
            <td><%= Html.Encode(linha.Identificador)%></td>
            <td><%= Html.Encode(linha.Tipo.ToString()) %></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="7" class="txtLongoTabela">Nenhuma questão encontrada.</td>
        </tr>
<%
    }
    
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>