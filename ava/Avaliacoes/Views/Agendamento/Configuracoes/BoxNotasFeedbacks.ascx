<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>
<%@ Import Namespace="ProvaColegiada.Models.Question.Correcao"%>

<div id="caixaCorrecao">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Notas e Feedbacks</div>
        <div class="textoDivisao">Acesso às notas alcançadas na avaliação e informação de acerto ou erro de cada questão. </div>
    </div>
        

    <div class="linhaPar">
        <div class="opcoes">
            <label><input type="checkbox" name="checkCorrecao" id="checkCorrecao" value="1" <%=Model.CheckCorrecaoQuestao %> /> Informar imediatamente se acertou ou errou cada questão.
            <input type="hidden" name="checkCorrecao" value="0" /></label>
        </div>
    </div>
    <div class="subDivisaoQuestao">
        Quando divulgar notas:
    </div>
    <!--div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoQuestao" value="< %=(int)Aplicacao.TipoCorrecao.NaQuestao%>" < %=Model.CheckCorrecaoQuestao %>/> Imediatamente após confirmar cada questão.</label>
        </div>
    </div-->
    <div class="linhaPar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoEncerrar" value="<%=(int)Aplicacao.TipoCorrecao.AposEncerrar%>" <%=Model.CheckCorrecaoEncerrarNew %>/> Imediatamente após encerrar a avaliação.</label>
        </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoAgendamento" value="<%=(int)Aplicacao.TipoCorrecao.AposAgendamento%>" <%=Model.CheckCorrecaoAgendamento %>/> Após o final do período de agendamento.</label>
        </div>
    </div>
    <div class="linhaPar">
        <div class="opcoes">
            <div class="conteudoLeft">
                <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoData" value="<%=(int)Aplicacao.TipoCorrecao.AposData%>"  <%=Model.CheckCorrecaoData %>/> A partir de </label>
            </div>
            <div id="boxDataCorrecao">
                <input id="txtDataCorrecao" class="txtData" type="text" value="<%=Model.DivulgacaoCorrecaoData %>" name="txtDataCorrecao" />
                <div class="txtMenor"> à(s) </div>
                <input type="text" class="txtHora" id="txtHrCorrecao" name="txtHrCorrecao" value="<%=Model.DivulgacaoCorrecaoHora %>" />
                <div class="txtMenor">hora(s)</div>
            </div>
        </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoSem" value="<%=(int)Aplicacao.TipoCorrecao.Sem%>" <%=Model.CheckCorrecaoSem %>/> Não divulgar.</label>
        </div>
    </div>

    <div class="subDivisaoQuestao">
        Em que situação liberar notas:
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
