<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>
<%@ Import Namespace="ProvaColegiada.Models.Question.Correcao"%>

<div id="caixaCorrecaoParcial">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Correção de questões objetivas</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecaoNota" id="rdoCorrecaoNotaExata" value="<%=(int)EnumTipoCorrecao.Exata%>" <%=Model.CheckCorrecaoNotaExata %>/> Pontuar apenas acerto integral.</label>
        </div>
    </div>
    <div class="linhaPar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecaoNota" id="rdoCorrecaoNotaParcialRedutor" value="<%=(int)EnumTipoCorrecao.ParcialRedutor%>" <%=Model.CheckCorrecaoNotaParcialRedutor %>/> Pontuar acerto parcial usando redutor.</label>
        </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecaoNota" id="rdoCorrecaoNotaParcial" value="<%=(int)EnumTipoCorrecao.ParcialSemRedutor%>" <%=Model.CheckCorrecaoNotaParcial %>/> Pontuar acerto parcial sem redutor.</label>
        </div>
    </div>
    <div class="linhaPar">
        <div class="opcoes">
            <input type="hidden" name="hidUpLow" id="hidUpLow" value="0" />
            <label><input type="checkbox" onclick="$('#hidUpLow').val($(this).is(':checked') ? 1 : 0)" name="ckdUpLow" id="ckdUpLow" value="1" <%=Model.CheckCorrecaoLowUp %> /> Considerar maiúsculas e minúsculas na correção de questões discursivas automáticas e preenchimendo de lacunas.</label>
        </div>
    </div>
</div>
