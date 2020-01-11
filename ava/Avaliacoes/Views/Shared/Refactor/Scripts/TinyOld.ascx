<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%=Html.BundleScript("Scripts/util/tiny_mce/tinymce/tiny_mce.js", 
                     "Scripts/util/tiny_mce/jquery.tinymce.js")%>
<%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.YUI, "refactor-scripts/componentes/tiny-0.{0.0}.js")%>
