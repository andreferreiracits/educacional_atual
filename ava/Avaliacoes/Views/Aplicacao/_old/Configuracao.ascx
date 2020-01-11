<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="areaConfiguracao">
<%  
    using (Html.BeginForm("ConfiguracaoAplicacao", "Aplicacao", FormMethod.Post, new { @id = "frmConfiguracaoAplicacao" }))
    {
%>
    <%= Html.Hidden("txtIdAplicacaoConfiguracao", Model.Id, new { @id = "txtIdAplicacaoConfiguracao" }) %>
    <div class="areaConfiguracoesAplicacao">

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Configurações Gerais</div>
            <div class="textoDivisao">Defina abaixo a configuração referente a esta atividade </div>
        </div>
    
        <div class="linhaPar">
            <div class="opcoes">
                <label><input type="radio" name="rdoAgendamento" id="rdoAgendamentoNao" value="0" <%=Model.CheckSemAgendamento %> /> Atividade sem data de agendamento.</label>
            </div>
        </div>
        <div class="linhaImpar">
            <div class="opcoes">
                <div>
                    <label><input type="radio" name="rdoAgendamento" id="rdoAgendamentoSim" value="1" <%=Model.CheckComAgendamento %> /> Data de agendamento: <span class="obrigatorio">*</span></label>
                </div>
                <div id="boxAgendamento">
                    <input id="txtDataRealizacaoInicio" class="txtData" type="text" value="<%=Model.RealizacaoDataInicio %>" name="txtDataRealizacaoInicio"/>
                    <div class="txtMenor">  da(s) </div>
                    <input id="txtHoraRealizacaoInicio" class="txtHora" type="text" value="<%=Model.RealizacaoHoraInicio %>" name="txtHoraRealizacaoInicio"/>
                    <div class="txtMenor">  hora(s) até </div>
                    <input id="txtDataRealizacaoFinal" class="txtData" type="text" value="<%=Model.RealizacaoDataFim %>" name="txtDataRealizacaoFinal" />
                    <div class="txtMenor">à(s) </div>
                    <input id="txtHoraRealizacaoFinal" name="txtHoraRealizacaoFinal" type="text" class="txtHora" value="<%=Model.RealizacaoHoraFim %>" />
                    <div class="txtMenor">hora(s)</div>
                </div>
            </div>
        </div>

        <% Html.RenderPartial(Model.BoxTentativas, Model); %>
        
        <div class="clear"></div>

        <div id="caixaEmbaralhamento">
            <div class="divisaoQuestao">
                <div class="tituloDivisao">Embaralhamento</div>
                <div class="textoDivisao">Critérios de embaralhamento. </div>
            </div>
            <div class="linhaImpar">
                <div class="opcoes">
                    <div class="conteudoLeft">Embaralhar questões:</div>
                    <div class="txtMenor">
                        <label><input type="radio" name="rdoEmbaralharQuestoes"  id="rdoEmbaralharQuestoesNao" value="0" <%=Model.NaoEmbaralharQuestoes %>/> Não</label>
                        <label><input type="radio" name="rdoEmbaralharQuestoes" id="rdoEmbaralharQuestoesSim" value="1" <%=Model.EmbaralharQuestoes %>/> Sim</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxCorrecao, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxGabarito, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxNota, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxAutoEstudo, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxDicas, Model); %>
        <div class="clear"></div>
                    
        <% Html.RenderPartial(Model.BoxConfigExtras, Model); %>


<%  } %>

    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Aplicacao", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarConfiguracao" class="btnNav">&laquo; Voltar</a>
            <a id="btnAvancarConfiguracao" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>
</div>
