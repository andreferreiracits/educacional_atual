<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div class="divisaoQuestao">
    <div class="tituloDivisao">Respostas</div>
    <div class="textoDivisao">Preencha as duas colunas e arraste as letras à esquerda até as lacunas à direita.</div>
    <a id="helpCadAlteQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
</div>
<div class="associativaEsquerda">
    <ul class="itensResposta">
        <% Html.RenderPartial(Model.TipoRespostaView.ViewAlternativa, Model); %>
    </ul>
    <div id="cxaAdicionarAlternativa" class="<%=Model.showBtnAdicionarAlternativa%> btnAddAlternativaAssociativa">
        <a class="btnAdicione"><img src="<%= UtilView.Url("/Content/imgcss/icoAdicionar.png") %>" alt="Adicionar alternativa" />adicionar alternativa</a>
    </div>
    <div class="clear"></div>
</div>

<div class="associativaDireita">
    <ul class="itensRespostaDireita">
        <% Html.RenderPartial("Answer/AlternativaAssociativaDireita", Model);
            //((ProvaColegiada.TabelaViews.Answer.AssociativaView)Model.TipoRespostaView.TipoView).AlternativasDireita(Model.Questao)
        %>
    </ul>
    <div id="cxaAdicionarAlternativaDireita" class="<%=((ProvaColegiada.TabelaViews.Answer.AssociativaView)Model.TipoRespostaView.TipoView).showBtnAdicionarAlternativa(Model.Questao)%>">
        <a class="btnAdicione"><img src="<%= UtilView.Url("/Content/imgcss/icoAdicionar.png") %>" alt="Adicionar alternativa" />adicionar alternativa</a>
    </div>
    <div class="clear"></div>
</div>
<div class="clear"></div>

