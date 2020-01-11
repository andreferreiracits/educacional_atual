<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<li class="<%= (Model.ToLower().Equals("correcao")) ? "selecionado" : "" %> abaCorrecao">
    <%=Html.ActionLink("Correção", "Index", "Correcao")%>
</li>