<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<li>
   <%=Html.ActionLink("A responder", "Index", "Aresponder", new { area = "" }, null)%>
</li>