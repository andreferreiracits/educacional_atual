<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<int?>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Relatório</title>
    <base id="baseSite" href="<%= UtilView.UrlCompleta(Request) %>" />
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.7.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery-ui-1.8.5.custom.min.js") %>"></script>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/jquery.ui.core.min.js") %>"></script>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/jquery.ui.widget.min.js") %>"></script>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/jquery.ui.position.min.js") %>"></script>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/jquery.ui.menu.min.js") %>"></script>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/jquery.ui.autocomplete.min.js") %>"></script>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/jquery.ui.combo.js") %>"></script>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/jquery.ui.selectcombo.1.0.0.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Mensagem3.1.0.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/FusionCharts/FusionCharts.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/FusionCharts/FusionCharts.jqueryplugin.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Carregando3.0.0.js") %>"></script>
    <%= Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Areas/Relatorios/Scripts/relatorio.visualizar.0.{0.0}.js") %>
    <% Html.RenderPartial("CssPadrao"); %>
    <%= Html.BundleCss(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Areas/Relatorios/Content/relatorio.0.{0.0}.css") %>
    <link rel="stylesheet" type="text/css" href="<%= Html.ConteudoPath("Relatorios", "Content/relatorio.print.0.0.1.css") %>" media="print" />
</head>
<body class="bodyAvaliacoes">
    <div id="alerta" class="mensagem comBotao"></div>
    <% Html.RenderAction("Index", (string) ViewData["controller"], new { area = "Relatorios", id = Model }); %>
</body>
</html>
