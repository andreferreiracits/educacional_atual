<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<li>
   <%=Html.ActionLink("Agendamentos", "Index", "Agendamento", new { area = "" }, null)%>
</li>