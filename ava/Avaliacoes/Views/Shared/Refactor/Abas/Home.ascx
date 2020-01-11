<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<li>
   <%=Html.ActionLink("Home", "Index", "Home", new { area = "" }, null)%>
</li>