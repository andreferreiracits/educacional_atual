<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div id="pagina" revisao="<%= Model.AtualRevisao ? "1" : "0" %>" atual="<%= Model.PaginaAtual %>" final="<%= Model.PaginaFinal %>" tipo="<%=Model.IdTipoResposta%>">
    <%= Html.Hidden("hidListaAtualizada", Model.ListaToString(), new { @id = "hidListaAtualizada" }) %>
    <div id="conteudo">
        <% Html.RenderPartial(Model.BoxConteudoQuestao, Model); %>
    </div>
</div>
