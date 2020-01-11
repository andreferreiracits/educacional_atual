<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% /* script type="text/javascript" src="http://013DES2376/PlungerJS/plungerjs-0.4.0.js"></script>
< %=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Union, "refactor-scripts/uteis/jquery.tmpl.min.js", "refactor-scripts/uteis/jstorage.min.js") */ %>

<%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Union, "refactor-scripts/uteis/jquery.tmpl.min.js", "refactor-scripts/uteis/jstorage.min.js", "refactor-scripts/uteis/plungerjs-0.{0.0}.min.js")%>

<%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.YUI, 
"refactor-scripts/geral-0.{0.0}.js",
    "refactor-scripts/avl_principal-0.{0.0}.js")%>
<%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.YUI,
"refactor-scripts/componentes/widgets-0.{0.0}.js",
    "refactor-scripts/componentes/form-0.{0.0}.js",
        "refactor-scripts/componentes/tbl-0.{0.0}.js")%>
