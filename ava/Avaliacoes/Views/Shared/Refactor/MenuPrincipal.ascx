<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% 
   String ativa = this.ViewContext.Controller.ControllerContext.RouteData.DataTokens["area"].ToString();
%>
<ul id="avl_menu">
    <%Html.RenderAction("Home", "Abas", new { area = ""}); %>
    <%Html.RenderPartial("Refactor/Abas/Questoes", ativa); %>
    <%Html.RenderPartial("Refactor/Abas/Avaliacoes", ativa); %>
    <%Html.RenderAction("Agendamentos", "Abas", new { area = "" }); %>
    <%Html.RenderAction("Correcao", "Abas", new { area = "" }); %>
    <%Html.RenderAction("Relatorios", "Abas", new { area = "" }); %>
    <%Html.RenderAction("Aresponder", "Abas", new { area = "" }); %>
    <%Html.RenderAction("Responsavel", "Abas", new { area = "" }); %>
    <%Html.RenderAction("Coordenador", "Abas", new { area = "" }); %>
    <%Html.RenderAction("Simulado", "Abas", new { area = "" }); %>
    <%Html.RenderAction("Administracao", "Abas", new { area = "" }); %>
</ul>

