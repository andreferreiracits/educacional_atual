<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="caixaConfiguracoesGerais">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Período</div>
        <div class="textoDivisao">Defina o intervalo de tempo em que o agendamento ficará aberto.</div>
    </div>
    <div class="linhaPar">
            <span class="texto">&nbsp;</span>
            <div class="opcoes">
                <label><input type="radio" name="rdoAgendamento" id="rdoAgendamentoNao" value="0" <%=Model.CheckSemAgendamento %>/> Aberto por período indeterminado.</label>
            </div>
        </div>
        <div class="linhaImpar">
            <span class="texto">&nbsp;</span>
            <div class="opcoes">
                <div style="float:left;">
                    <label><input type="radio" name="rdoAgendamento" id="rdoAgendamentoSim" value="1" <%=Model.CheckComAgendamento %>/> Período definido: <span class="obrigatorio">*</span></label>
                </div>
                <div id="boxAgendamento">
                    <div style="float:left;"><input id="txtDataRealizacaoInicio" class="txtData" type="text" value="<%=Model.RealizacaoDataInicio %>" name="txtDataRealizacaoInicio" /></div>
                    <div style="float:left;">  da(s) </div>
                    <div style="float:left;"><input id="txtHoraRealizacaoInicio" class="txtHora" type="text" value="<%=Model.RealizacaoHoraInicio %>" name="txtHoraRealizacaoInicio" /></div>
                    <div style="float:left;">  hora(s) até </div>
                    <div style="float:left;"><input id="txtDataRealizacaoFinal" class="txtData" type="text" value="<%=Model.RealizacaoDataFim %>" name="txtDataRealizacaoFinal" /></div>
                    <div style="float:left;">à(s) </div>
                    <div><input id="txtHoraRealizacaoFinal" name="txtHoraRealizacaoFinal" type="text" class="txtHora" value="<%=Model.RealizacaoHoraFim %>" /> hora(s)</div>
                </div>
            </div>
        </div>
        <div class="linhaPar">
            <span class="SEC02511_texto">Refazer aplicação:</span>
            <div class="opcoes">
                <div style="float:left;">
                    <label><input type="radio" id="rdoTentativaNao" name="rdoTentativa" value="0" <%= Model.LimitarTentativasNaoSelecionada %> /> Não</label>
                    <label><input type="radio" id="rdoTentativaSim" name="rdoTentativa" value="1" <%= Model.LimitarTentativasSimSelecionada %> />  Sim</label>
                </div>
                <div id="boxTentativas">
                    <input id="txtNumeroTentativa" class="txtTentativa" type="text" value="<%=Model.NumeroTentativas %>" name="txtNumeroTentativa" /> Número de tentativas
                </div>
            </div>
        </div>
</div>

