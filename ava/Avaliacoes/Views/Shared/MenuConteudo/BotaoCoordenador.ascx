<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<li class="<%= (Model.ToLower().Equals("coordenador")) ? "selecionado" : "" %>">
    <%=Html.ActionLink("Coordenador", "Index", "Coordenador")%>
</li>