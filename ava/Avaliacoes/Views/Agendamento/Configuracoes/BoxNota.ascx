<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>
<%@ Import Namespace="ProvaColegiada.Models.Question.Correcao"%>

<div id="caixaDivulgacaoNota">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Notas </div>
        <div class="textoDivisao">Quando o respondente terá acesso às notas alcançada na avaliação?</div>
    </div>
    <div class="linhaPar">
        <div class="opcoes">
            <label><input type="radio" name="rdoDivulgaNota" id="rdoDivulgaNotaProva" value="<%=(int)Aplicacao.TipoDivulgacaoNota.AposTodasCorrigidas%>" <%=Model.CheckDivulgaNotaTodas %>/> Somente quando todas as correções estejam concluídas.</label>
        </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoDivulgaNota" id="rdoDivulgaNotaTodas" value="<%=(int)Aplicacao.TipoDivulgacaoNota.AposProvaCorrigida%>" <%=Model.CheckDivulgaNotaProva %>/> Liberar resultados imediatamente à medida que as questões forem corrigidas.</label>
        </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoDivulgaNota" id="rdoDivulgaNotaSem" value="<%=(int)Aplicacao.TipoDivulgacaoNota.Sem%>" <%=Model.CheckDivulgaNotaSem %>/> Não divulgar.</label>
        </div>
    </div>
        <div class="linhaImpar">
        <div class="opcoes">
            <label>Obs.: Em avaliações com questões discursivas manuais a divulgação da nota depende da correção das questões pelo professor.</label>
        </div>
    </div>
    
        
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
            <label><input type="checkbox" name="ckdUpLow" id="ckdUpLow" value="0" <%=Model.CheckCorrecaoLowUp %> /> Considerar maiúsculas e minúsculas na correção de questões discursivas automáticas e preenchimendo de lacunas.</label>
        </div>
    </div>
    
</div>