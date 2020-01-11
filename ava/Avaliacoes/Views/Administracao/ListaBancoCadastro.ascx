<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.BancoQuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>">
    <tbody>
<%

    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (BancoQuestaoVOView linha in Model.Linhas)
        {
%>
        <tr>
            <td class="selecionar">
                <%= Html.Hidden("chkCriterio.Value", String.Format("{0}", linha.Id))%>
            </td>
            <td style="width:285px;">
                <%= (linha.TamanhoNome == 0) ? ("<em class=\"semEnunciado\">" + linha.Nome + "</em>") : Html.Encode(linha.Nome)%>
                <div class="botoes">
                    <%= Html.ActionLink("Editar", "Editar", new { @id = linha.Id.ToString() }, new { @class = "btn normal" })%>
                    <% if (linha.Excluir)
                       {%>
                        <%= Html.ActionLink("Excluir", "Excluir", new { @id = linha.Id.ToString() }, new { @class = "btnExcluir" })%>
                    <% } %>
                </div>
            </td>
            <td><%=linha.Visibilidade %></td>
            <td><%=linha.Fluxo %></td>
            <td><%=linha.Data %></td>
            <td><%=linha.NQuestoes%></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="6">Nenhuma banco encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
      <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>
