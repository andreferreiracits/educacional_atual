<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<%
    using (Html.BeginForm("CarregarClassificacaoQuestao", "HabilidadeCompetencia", FormMethod.Post, new { @id = "frmClassificacaoHabilidade" }))
		

	{ %>
	<%= Html.Hidden("totalPorPagina", 10, new { @id = "totalPorPaginaHabilidade" })%>
<table id="tblListHabilidade" class="tabela tamQuestao  %>" cellpadding="0" cellspacing="0">
	<thead>
		<tr>

			<td style="width: 480px;"><%= Html.ActionLink("Habilidades", "Ordenar", new { @ordem = "nome" })%>    </td>
			<td style="width: 480px;"><%= Html.ActionLink("Competências", "Ordenar", new { @ordem = "pai" })%></td>
		</tr>
	</thead>
	<tbody></tbody>
</table>
<div class="ferramentas">
		<div class="resultado"></div>
		<div class="paginacao"></div>
	</div>
<% } %>

