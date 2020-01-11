<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<String>" %>
<li aria-selected="<%=(Model == "Avaliacoes").ToString().ToLower()%>">
<%
if (this.Logado().TipoPortal == Avaliacoes.Framework.Usuario.EnumTipoPortal.Positivo){
    %>
   <%=Html.ActionLink("Provas", "Index", "Criacao", new { area = "" }, null)%>
<%}else{ %>
       <%=Html.ActionLink("Avaliações", "Index", "Criacao", new { area = "" }, null)%>

<%} %>
</li>