<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%= Html.ActionLink("Excluir", "ExcluirQuestao", new { @id = Model.Id.ToString() }, new { @class = "btnExcluir" })%>