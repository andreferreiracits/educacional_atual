<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared " %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer " %>

<div class='hide atualizastatus'>
    <%= Model.Estado %>
</div>

<ul class="boxTipoQuestao">
    <%
        foreach (TipoResposta resposta in (IList<TipoResposta>) ViewData["TipoResposta"])
        {
            Html.RenderPartial(EnumTipoRespostaView.ValueOf(resposta.Id).ViewEscolhaTipo, Model.EscolhaTipoResposta(resposta));
        }
    %>
</ul>
