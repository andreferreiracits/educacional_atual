<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.ProvaVOView>>" %>
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
            <td style="width:22px;" class="selecionar"><%= Html.RadioButton("rdoProva", String.Format("{0}", linha.Id))%></td>
            <td style="width:400px;"><a class="lnk"><%= (linha.TamanhoNome == 0) ? ("<em class=\"semEnunciado\">" + linha.Nome + "</em>") : Html.Encode(linha.Nome)%></a></td>
            <td style="width:170px;" class="strong"><%= Html.Encode(linha.Autor)%></td>
            <td style="width:93px"><%= Html.Encode(linha.Modificado)%></td>
            <td style="width:150px;">< %= Html.Encode(linha.NomeCategoria)% ></td>
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
</table>