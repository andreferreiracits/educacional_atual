<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>

<li class="<%= (Model.ToLower().Equals("responsavel")) ? "selecionado" : "" %>">
    <%=Html.ActionLink("Responsável", "Index", "Responsavel")%>
</li>