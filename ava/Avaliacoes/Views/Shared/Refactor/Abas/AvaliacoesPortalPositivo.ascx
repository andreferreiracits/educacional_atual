<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<li aria-selected="true">
   <%=Html.ActionLink("Provas", "Index", "Criacao", new { area = "" }, null)%>
</li>