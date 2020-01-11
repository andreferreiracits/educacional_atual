<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.VisualizacaoProvaView>" %>
<% using (Html.BeginForm("CarregarQuestao", "Aplicacao", FormMethod.Post, new { @id = "frmQuestaoViewProva", @class = "frmQuestaoRealizacao" }))
{ %>


	<%= Html.Hidden("idProva", Model.Id)%>
	<%= Html.Hidden("hidLista", Model.ListaToString(), new { @id = "hidLista" }) %>
	<div id="areaQuestao"></div>
<% } %>
