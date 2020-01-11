<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<li class="<%= (Model.ToLower().Equals("aresponder")) ? "selecionado" : "" %>">
    <%=Html.ActionLink("A responder", "Index", "Aresponder")%>
</li>