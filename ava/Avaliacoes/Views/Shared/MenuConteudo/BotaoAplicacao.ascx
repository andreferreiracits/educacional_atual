<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<li class="<%= (Model.ToLower().Equals("agendamento")) ? "selecionado" : "" %> abaAplicacao">
    <%=Html.ActionLink("Agendamentos", "Index", "Agendamento")%>
</li>