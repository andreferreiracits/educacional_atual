<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<String>" %>
<li aria-selected="<%=(Model == "Questao").ToString().ToLower()%>">
   <%=Html.ActionLink("Questões", "Index", "Questoes", new { area = "" }, null)%>
</li>