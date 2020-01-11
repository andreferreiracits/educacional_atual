<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<li class="<%= (Model.ToLower().Equals("administracao")) ? "selecionado" : "" %>">
    <%=Html.ActionLink("Gerenciador", "Index", "Administracao")%>
</li>