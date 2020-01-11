<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<%=Html.ActionLink("Agendamento", "AvaliacaoCriarAgendamento", "Agendamento", new { @id = Model.Id }, new { @class = "btn normal" })%>
