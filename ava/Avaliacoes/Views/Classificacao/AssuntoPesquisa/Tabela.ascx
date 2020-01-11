<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<%
	using (Html.BeginForm("CarregarClassificacaoQuestao", "AreaAssuntoPesquisa", FormMethod.Post, new { @id = "frmClassificacaoAssuntoPesquisaOpniao" }))
		

	{ %>
	<%= Html.Hidden("totalPorPagina", 10, new { @id = "totalPorPaginaHabilidade" })%>
<table id="tblListAssuntoPesquisaOpniao" class="tabela tamQuestao" cellpadding="0" cellspacing="0">
	<thead>
		<tr>

			<td style="width: 480px;"><%=Html.ActionLink("Área", "Ordenar", new { @ordem = "pai" })%></td>
			<td style="width: 480px;"><%= Html.ActionLink("Assunto", "Ordenar", new { @ordem = "nome" })%></td>
		</tr>
	</thead>
	<tbody></tbody>
</table>
<div class="ferramentas">
		<div class="resultado"></div>
		<div class="paginacao"></div>
	</div>
<% } %>

