<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>

<li class="<%= (Model.ToLower().Equals("questoes")) ? "selecionado" : "" %> abaQuestao">
    <%=Html.ActionLink("Questões", "Index", "Questoes")%>
</li>