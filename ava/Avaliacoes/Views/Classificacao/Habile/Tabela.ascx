<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ClassificacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<% using (Html.BeginForm("CarregarClassificacaoQuestao", "Habile", FormMethod.Post, new { @id = "frmClassificacaoHabile" })) 
   { %>
	
    <%= Html.Hidden("totalPorPagina", 10, new { @id = "totalPorPaginaAssunto" })%>    
    <!--
    < %= Html.Hidden("intTipoClassificacao", EnumTipoClassificacao.SPE.Id, new { @id = "intTipoClassificacao" })%>    
    -->
    <table id="tblListHabile" class="tabela tamQuestao" cellpadding="0" cellspacing="0">
	    <thead>
		    <tr>
			    <td style="width: 100px;"><%= Html.ActionLink("Matriz", "Ordenar", new { @ordem = "matriz" })%></td>
			    <td style="width: 200px;"><%= Html.ActionLink("Competência", "Ordenar", new { @ordem = "competencia" })%></td>
                <td style="width: 150px;"><%= Html.ActionLink("Habilidade", "Ordenar", new { @ordem = "habilidade" })%></td>
                <td style="width: 150px;"><%= Html.ActionLink("Eixo", "Ordenar", new { @ordem = "eixo" })%></td>
                <td style="width: 150px;"><%= Html.ActionLink("Processo Cognitivo", "Ordenar", new { @ordem = "processocognitivo" })%></td>
                <td style="width: 150px;"><%= Html.ActionLink("Situação de Uso", "Ordenar", new { @ordem = "situacaouso" })%></td>
		    </tr>
	    </thead>
	    <tbody></tbody>
    </table>
    <div class="ferramentas">
		<div class="resultado"></div>
		<div class="paginacao"></div>
	</div>
<% } %>


