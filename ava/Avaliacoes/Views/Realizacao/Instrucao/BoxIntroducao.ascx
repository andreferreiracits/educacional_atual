<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div class="boxIntroducao">
<h2>Introdução</h2>
<%= (Model.Instrucao.TemHtml) ? Model.Instrucao.Html : Model.Instrucao.Plano %>
</div>