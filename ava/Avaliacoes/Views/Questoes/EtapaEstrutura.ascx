<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class="hide atualizastatus"><%= Model.Estado %></div>
<% Html.RenderPartial(Model.EtapaEstruturaView, Model); %>