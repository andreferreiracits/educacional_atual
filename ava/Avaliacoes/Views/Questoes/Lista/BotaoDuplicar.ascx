﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%= Html.ActionLink("Duplicar", "Duplicar", new { @id = Model.Id.ToString() }, new { @class = "btn normal" })%>