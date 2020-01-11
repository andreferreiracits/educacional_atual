<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%
    using (Html.BeginForm("CarregarClassificacaoQuestao", "SPE", FormMethod.Post, new { @id = "frmClassificacaoSPE" }))
	{ %>
	<%= Html.Hidden("totalPorPagina", 10, new { @id = "totalPorPaginaAssunto" })%>    
    <!--
    < %= Html.Hidden("intTipoClassificacao", EnumTipoClassificacao.SPE.Id, new { @id = "intTipoClassificacao" })%>    
    -->
<table id="tblListSPE" class="tabela tamQuestao" cellpadding="0" cellspacing="0">
	<thead>
		<tr>
            <td style="width: 145px;"><%= Html.ActionLink("Coleção", "Ordenar", new { @ordem = "colecao" })%></td>
			<td style="width:  80px;"><%= Html.ActionLink("Edição", "Ordenar", new { @ordem = "edicao" })%></td>
			<td style="width: 200px;"><%= Html.ActionLink("Disciplina", "Ordenar", new { @ordem = "disciplina" })%></td>
            <td style="width: 145px;"><%= Html.ActionLink("Ano", "Ordenar", new { @ordem = "ano" })%></td>
            <td style="width: 165px;"><%= Html.ActionLink("Volume", "Ordenar", new { @ordem = "volume" })%></td>
            <td style="width: 165px;"><%= Html.ActionLink("Unidade", "Ordenar", new { @ordem = "unidade" })%></td>
            <td style="width: 155px;"><%= Html.ActionLink("Tipo", "Ordenar", new { @ordem = "tipo" })%></td>
            <td style="width: 135px;"><%= Html.ActionLink("Ordem", "Ordenar", new { @ordem = "ordem" })%></td>
            <td style="width: 135px;"><%= Html.ActionLink("Grupo", "Ordenar", new { @ordem = "grupo" })%></td>
		</tr>
	</thead>
	<tbody></tbody>
</table>
<div class="ferramentas">
		<div class="resultado"></div>
		<div class="paginacao"></div>
	</div>
<% } %>


