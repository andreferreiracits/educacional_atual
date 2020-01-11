<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div class="divisaoQuestao">
    <h2 class="tituloDivisao">Alternativas</h2>
    <span class="textoDivisao">Adicione mais alternativas, se desejar e use o modo HTML se quiser formatar o texto das alternativas.</span>
    <a id="helpCadAlteQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
</div>
<ul class="itensResposta">
    <% Html.RenderPartial(Model.TipoRespostaView.ViewAlternativa, Model); %>
</ul>
<div id="cxaAdicionarAlternativa" class="<%=Model.showBtnAdicionarAlternativa%>">
    <a class="btnAdicione"><img src="<%= UtilView.Url("/Content/imgcss/icoAdicionar.png") %>" alt="Adicionar alternativa" />adicionar alternativa</a>
</div>