<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<String>" %>
<li>
   <%=Html.ActionLink("Gerenciador", "Index", "Administracao", new { area = "" }, null)%>
</li>