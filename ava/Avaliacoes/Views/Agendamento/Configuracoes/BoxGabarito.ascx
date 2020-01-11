<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div id="caixaDivulgacaoGabarito">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Gabarito</div>
        <div class="textoDivisao">Quando o respondente terá acesso ao gabarito da prova?</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoGabarito" id="rdoGabaritoEncerrar" value="<%=(int)Aplicacao.TipoGabarito.AposEncerrar%>" <%=Model.CheckGabaritoEncerrada %>/> Imediatamente após encerrar a avaliação.</label>
        </div>
    </div>
    <div class="linhaPar">
        <div class="opcoes">
            <label><input type="radio" name="rdoGabarito" id="rdoGabaritoAgendamento" value="<%=(int)Aplicacao.TipoGabarito.AposAgendamento%>" <%=Model.CheckGabaritoAposAgendamento %>/> Após o final do período de agendamento</label>
        </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">
                <label><input type="radio" name="rdoGabarito" id="rdoGabaritoData" value="<%=(int)Aplicacao.TipoGabarito.AposData%>" <%=Model.CheckGabaritoAposData %>/> A partir de:</label>
            </div>
            <div id="boxDataGabarito">
                <input id="txtDataGabarito" class="txtData" type="text" value="<%=Model.DivulgacaoGabaritoData%>" name="txtDataGabarito" />
                <div class="txtMenor"> à(s) </div>
                <input type="text" class="txtHora" id="txtHoraGabarito" value="<%=Model.DivulgacaoGabaritoHora%>" name="txtHoraGabarito"  />
                <div class="txtMenor"> hora(s)</div>
            </div>
        </div>
    </div>
    <div class="linhaPar">
        <div class="opcoes">
            <label><input type="radio" name="rdoGabarito" id="rdoGabaritoSem" value="<%=(int)Aplicacao.TipoGabarito.Sem%>" <%=Model.CheckGabaritoSem %>/> Não divulgar.</label>
        </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Os respondentes podem visualizar comentários das questões?</div>
            <div class="txtMenor <%=Model.ComentarioDesabilitado %>">
                <label><input type="radio" name="rdoComentario" id="rdoComentarioSim" value="1" <%=Model.ExibirComentarioGabaritoSelecionada %>  <%=Model.ComentarioDisabled %>/> Sim</label>
                <label><input type="radio" name="rdoComentario" id="rdoComentarioNao" value="0" <%=Model.NaoExibirComentarioGabaritoSelecionada %> <%=Model.ComentarioDisabled %>/> Não</label>
            </div>
        </div>
    </div>
</div>