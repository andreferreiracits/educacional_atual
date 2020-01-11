<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
    <div class="linhaPar">
        <div class="opcoes indeterminado">
            <label><input type="radio" name="rdoAgendamento" id="rdoAgendamentoNao" value="0" <%=Model.CheckSemAgendamento %>/> Aberto por período indeterminado.</label>
        </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">
                <label><input type="radio" name="rdoAgendamento" id="rdoAgendamentoSim" value="1" <%=Model.CheckComAgendamento %>/> Período definido: <span class="obrigatorio">*</span></label>
            </div>
            <div id="boxAgendamento">
                <input id="txtDataRealizacaoInicio" class="txtData <%=Model.AgendamentoDesabilitado %>" type="text" value="<%=Model.RealizacaoDataInicio %>" name="txtDataRealizacaoInicio" <%=Model.AgendamentoDisabled %> />
                <div class="txtMenor">  da(s) </div>
                <input id="txtHoraRealizacaoInicio" class="txtHora <%=Model.AgendamentoDesabilitado %>" type="text" value="<%=Model.RealizacaoHoraInicio %>" name="txtHoraRealizacaoInicio" <%=Model.AgendamentoDisabled %>/>
                <div class="txtMenor">  hora(s) até </div>
                <input id="txtDataRealizacaoFinal" class="txtData" type="text" value="<%=Model.RealizacaoDataFim %>" name="txtDataRealizacaoFinal" />
                <div class="txtMenor">à(s) </div>
                <input id="txtHoraRealizacaoFinal" name="txtHoraRealizacaoFinal" type="text" class="txtHora" value="<%=Model.RealizacaoHoraFim %>" />
                <div class="txtMenor">hora(s)</div>
            </div>
        </div>
    </div>
