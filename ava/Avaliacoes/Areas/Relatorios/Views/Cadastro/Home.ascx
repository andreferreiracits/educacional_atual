<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="clear"></div>

<a class="btn" href='<%= Url.RouteUrl("Default", new { controller="Relatorio", action="Novo"}) %>'> <span class="btnCriar"></span>Criar novo relatório</a>

<%--<a id="helpCadRelatorio" class="btn" href="javascript:void(0)">?</a>--%>

<% Html.RenderPartial("../RelatorioNovo/TabelaBuscaRelatorio"); %>

<div class="clear"></div>