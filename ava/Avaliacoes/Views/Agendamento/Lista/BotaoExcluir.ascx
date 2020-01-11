<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<%= Html.ActionLink("Excluir", "ExcluirAplicacao", new { @id = Model.Id.ToString() }, new { @class = "btnExcluir" })%>
