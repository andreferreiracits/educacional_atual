<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div>
<p>Comentário:</p>
<%= Html.TextArea("txtComentarioEstado", "", new { @cols = "30", @rows = "4", @class = " " })%>
</div>
