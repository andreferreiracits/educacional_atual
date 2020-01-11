<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<ul id="menuSubConteudo" class="abaSubConteudo">
    <% 
        object atributos = new { @class = "umaLinha" };
        string submenu = ViewContext.Controller.ValueProvider.GetValue("action").RawValue.ToString();
    %>

    <li class="<%= (submenu.Equals("QuadroGeral")) ? "selecionado" : "" %>">
        <%= Html.ActionLink("Quadro Geral", "QuadroGeral", new { @id = ViewData["id"] }, new { @class = atributos })%>
    </li>
    <li class="<%= (submenu.Equals("Corporativo") || submenu.Equals("Disciplinas")) ? "selecionado" : "" %>">
        <%= Html.ActionLink("Gráficos Corporativos", "Corporativo", new { @id = ViewData["id"] }, new { @class = atributos })%>
    </li>
    <li class="<%= (submenu.Equals("Geral")) ? "selecionado" : "" %>">
        <%= Html.ActionLink("Formação Geral", "Geral", new { @id = ViewData["id"] }, new { @class = atributos })%>
    </li>
    <li class="<%= (submenu.Equals("Especifico")) ? "selecionado" : "" %>">
        <%= Html.ActionLink("Componente Específico", "Especifico", new { @id = ViewData["id"] }, new { @class = atributos })%>
    </li>
</ul>