<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.ValueObjects.RankingPosicaoVO>>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
	<% Html.RenderPartial("Filtro", Model.Filtros); %>
	<tbody>
<%
	if (Model != null && Model.Linhas.Count > 0)
	{
        foreach (RankingPosicaoVO linha in Model.Linhas)
		{
%>
		<tr class="alturaLinhaAplicacao">
			<td><%=linha.Usuario %></td>
			<td><%=linha.Escola %></td>
            <td><%=linha.Serie %></td>
            <td><%=linha.Turma %></td>
            <td><%=linha.PosicaoNacional %></td>
			<td><%=linha.PosicaoEscola %></td>
            <td><%=linha.PosicaoSerie %></td>
            <td><%=linha.PosicaoTurma %></td>
            <td><%=linha.Nota %></td>
            <td><%=linha.MediaNacional %></td>
			<td><%=linha.MediaEscola %></td>
            <td><%=linha.MediaTurma %></td>
            <td><%=linha.MediaSerie %></td>
		</tr>
<%
		}
	}
	else
	{
%>
		<tr class="vazio">
			<td colspan="13">Não foi gerado o ranking.</td>
		</tr>
<%
	}
%>
	</tbody>
	<% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>




