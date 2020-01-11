<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%= Html.ActionLink("Edição rápida", "CarregarEdicaoRapida", new { @id = Model.Id.ToString() }, new { @class = "btn normal btnEdicaoRapida" })%>