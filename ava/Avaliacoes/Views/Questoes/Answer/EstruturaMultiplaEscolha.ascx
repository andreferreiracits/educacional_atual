<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div class="divisaoQuestao">
    <div class="tituloDivisao">Respostas</div>
    <div class="textoDivisao">Adicione quantas respostas quiser a questão, escolher a questão correta além de optar por comentários e editor html ou texto.</div>
    <a id="helpCadAlteQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
</div>
<ul class="itensResposta">
    <% Html.RenderPartial(Model.TipoRespostaView.ViewAlternativa, Model); %>
</ul>
<div id="cxaAdicionarAlternativa" class="<%=Model.showBtnAdicionarAlternativa%>">
    <a class="btnAdicione"><img src="<%= UtilView.Url("/Content/imgcss/icoAdicionar.png") %>" alt="Adicionar alternativa" />adicionar alternativa</a>
</div>