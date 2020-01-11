<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<li class="<%= (Model.ToLower().Equals("home")) ? "selecionado" : "" %> abaHome">
    <%=Html.ActionLink("Home", "Index", "Home")%>
</li>
