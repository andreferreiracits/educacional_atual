<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<label class="destaqueCurso">Você selecionou:</label>
<span class="nome"><%= (Model.TextoNrQuestao == null) ? 0.ToString() : Model.TextoNrQuestao %></span>
<div class="btnResumoQuestao">
    <%= Html.ActionLink("visualizar questões", "VisualizarQuestoes", "Criacao", new { @id = "btnVisualizarQuestao", @class = "btnM" })%>
</div>