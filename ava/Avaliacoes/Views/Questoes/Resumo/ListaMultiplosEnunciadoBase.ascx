<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr>
            <td>
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão ID {0}", linha.Id)) %>" rel="<%= Url.Action("CarregarTooltip", new { @id = linha.Id.ToString() })%>"></a>
            </td> 
            <td width="55%">
                <a class="lnk tooltipextra">
                    <%= (linha.TamanhoEnunciado == 0) ? ("<em class=\"semEnunciado\">" + linha.Enunciado + "</em>") : Html.Encode(linha.EnunciadoLimite(100))%>
                </a>
            </td>
                      
            <td width="11%"><%= Html.Encode(linha.Autor)%></td>
            <td width="20%"><%= Html.Encode(linha.Modificado)%></td>
            <td width="12%"><%= Html.Encode(linha.Identificador)%></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="5">Nenhuma questão encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
</table>