<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<string>" %>

<li class="<%= (Model.ToLower().Equals("criacao")) ? "selecionado" : "" %> abaProva">
    <%=Html.ActionLink("Avaliações", "Index", "Criacao")%>
</li>