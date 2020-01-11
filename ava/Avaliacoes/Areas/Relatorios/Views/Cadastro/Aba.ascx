<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>
<li class="<%= (Model.ToLower().Equals("relatorio")) ? "selecionado" : "" %> abaRelatorio">
    <%=Html.ActionLink("Relatórios", "Cadastro", "Relatorio", new {area="" }, null)%>
</li>