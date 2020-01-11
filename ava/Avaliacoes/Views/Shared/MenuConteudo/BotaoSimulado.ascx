<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<li class="<%= (Model.ToLower().Equals("simulado")) ? "selecionado" : "" %>">
    <%=Html.ActionLink("Simulados", "Index", "Simulado")%>
</li>