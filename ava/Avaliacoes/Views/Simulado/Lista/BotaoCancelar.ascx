<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<%= Html.ActionLink("Cancelar", "CancelarSimulado", new { @id = Model.Id.ToString() }, new { @class = "btnExcluir" })%>
