<%@ Page Language="C#" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Incluir Grupo</title>
    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/jquery-ui-1.8.4.custom.css") %>" />
    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/principal.css") %>" />
    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/form.css") %>" />
    
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.4.2.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery.ui.widget.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery-ui-1.8.5.custom.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/css_browser_selector.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.ui.mensagem.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Carregando.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/popupIncluirGrupo.js") %>"></script>
</head>
<body>
    <form id="frmIncluirGrupo" name="frmIncluirGrupo" method="post" action="http://universitario.local.educacional/academico/Servicos/unvGrupos/incluir_grupo.asp">
        <input type="hidden" id="strUrlRetorno" name="strUrlRetorno" value="" />
    </form>
</body>
</html>
