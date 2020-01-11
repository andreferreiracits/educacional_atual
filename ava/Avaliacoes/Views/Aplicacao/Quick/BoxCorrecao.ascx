<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div id="caixaCorrecao">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Correção</div>
        <div class="textoDivisao">Divulgação da correção (acerto ou erro do aluno) </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoQuestao" value="<%=(int)Aplicacao.TipoCorrecao.NaQuestao%>" <%=Model.CheckCorrecaoQuestao %>/> Imediata questão por questão</label>
        </div>
    </div>
    <div class="linhaPar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoEncerrar" value="<%=(int)Aplicacao.TipoCorrecao.AposEncerrar%>" <%=Model.CheckCorrecaoEncerrar %>/> Imediata após encerrar a avaliação</label>
        </div>
    </div>
    <%Html.RenderPartial(Model.BoxAgendamentoFinalPeriodo, Model); %>
    <div class="linhaPar">
        <div class="opcoes">
            <div class="conteudoLeft">
                <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoData" value="<%=(int)Aplicacao.TipoCorrecao.AposData%>"  <%=Model.CheckCorrecaoData %>/> A partir de:</label>
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
            <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoSem" value="<%=(int)Aplicacao.TipoCorrecao.Sem%>" <%=Model.CheckCorrecaoSem %>/> Não divulgar</label>
        </div>
    </div>

</div>
