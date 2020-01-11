<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<%= Html.ActionLink("Editar", "Nova", new { @id = Model.Id.ToString() }, new { @class = "btn normal" })%>
