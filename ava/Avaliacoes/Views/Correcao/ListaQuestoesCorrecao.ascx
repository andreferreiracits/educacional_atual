<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.CorrecaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.Models.Exam" %>
<%@ Import namespace="ProvaColegiada.TabelaViews.Shared" %>


<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <% Html.RenderPartial("Filtro", Model.Filtros); %>
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr class="alturaLinhaAplicacao">
            <td width="32%">
                <a class="lnk">
                    <%= (linha.Enunciado.Plano.Length < 40) ? Html.Encode(linha.Enunciado.Plano) : Html.Encode(linha.Enunciado.Plano.Substring(0, 40) + "...")%>
                </a>
                <div class="botoes">
                    <%= Html.ActionLink("Respostas", "RespostasQuestao", new { @id = linha.IdAplicacao.ToString(), @idSeg = linha.IdQuestao.ToString() }, new { @class = "btn normal" })%>
                </div>
            </td>
            <td width="15%"><%= Html.Encode(linha.NomeAutor)%></td>
            <td width="15%"><%= Html.Encode(linha.CountQuestaoPendente)%></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="2">Nenhuma questão encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>