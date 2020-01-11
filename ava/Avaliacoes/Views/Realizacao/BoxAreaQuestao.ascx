<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<% using (Html.BeginForm(Model.ActionCarregarQuestao, "Realizacao", FormMethod.Post, new { @id = "frmQuestaoRealizacao", @class = "frmQuestaoRealizacao" }))
{ %>
	<%= Html.Hidden("idProvaRealizacao", Model.Id) %>
	<%= Html.Hidden("hidLista", Model.ListaToString(), new { @id = "hidLista" }) %>
	<div id="areaQuestao"></div>
<% } %>
