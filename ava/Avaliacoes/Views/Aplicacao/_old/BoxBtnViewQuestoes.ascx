<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div class="btnQuestoes">
    <%= Html.ActionLink("visualizar questões", "VisualizarQuestoes", "Prova", new { @id = "btnVisualizarQuestao", @class = "btnM" })%>
</div>