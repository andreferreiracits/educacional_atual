<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.ProvaVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (ProvaVOView linha in Model.Linhas)
        {
%>
        <tr>
            <td class="selecionar"  style="width:30px;"><%= Html.RadioButton("rdoProva", String.Format("{0}", linha.Id))%></td>
            <td style="width:300px;"><a class="lnk"><%= (linha.TamanhoNome == 0) ? ("<em class=\"semEnunciado\">" + linha.Nome + "</em>") : Html.Encode(linha.Nome)%></a></td>
            <td style="width:100px;"><%= Html.Encode(linha.Identificador)%></td>
            <td style="width:200px;"><%= Html.Encode(linha.Modificado)%></td>
            <td style="width:100px;"><%= Html.Encode(linha.NomeSelecao)%></td>
            <td style="width:100px;"><%= Html.Encode(linha.TotalQuestoes)%></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="5">Nenhuma prova encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>