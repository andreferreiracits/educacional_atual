<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Correcao"%>

<div class="areaConfiguracaoSimulado">
    <div class="areaConfiguracao">
<%  
    using (Html.BeginForm("ConfiguracaoSimulado", "Simulado", FormMethod.Post, new { @id = "frmConfiguracaoSimulado" }))
    {
%>
    <%= Html.Hidden("txtIdSimuladoConfiguracao", Model.Id, new { @id = "txtIdSimuladoConfiguracao" })%>
    
    

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Configurações</div>
        <div class="textoDivisao"></div>
    </div>
    <% Html.RenderPartial(Model.BoxFinalidade, Model);  %>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Título do simulado: <span class="obrigatorio">*</span></span>
        <label><input type="text" id="txtTituloSimulado" name="txtTituloSimulado" class="txt" maxlength="80" value="<%= Model.Nome %>" /></label>
    </div>
    
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Período</div>
        <div class="textoDivisao">Defina o intervalo de tempo em que o agendamento ficará aberto.</div>
    </div>

    <div class="linhaImpar">
        <div class="boxDatas">
            <div id="boxAgendamento" class="opcoes">
                <input id="txtDataRealizacaoInicio" class="txtData <%=Model.RealizacaoDesabilitada %>"  type="text" value="<%=Model.RealizacaoDataInicio %>"  name="txtDataRealizacaoInicio">
                <div class="txtMenor <%=Model.RealizacaoDesabilitada %>">  da(s) </div>
                <input id="txtHoraRealizacaoInicio" class="txtHora <%=Model.RealizacaoDesabilitada %>"  type="text" value="<%=Model.RealizacaoHoraInicio %>" name="txtHoraRealizacaoInicio"/>
                <div class="txtMenor <%=Model.RealizacaoDesabilitada %>">  hora(s) </div>
                <div class="txtMenor"> até </div>
                <input id="txtDataRealizacaoFinal" class="txtData" type="text" value="<%=Model.RealizacaoDataFim %>" name="txtDataRealizacaoFinal" />
                <div class="txtMenor">à(s) </div>
                <input id="txtHoraRealizacaoFinal" name="txtHoraRealizacaoFinal" type="text" class="txtHora" value="<%=Model.RealizacaoHoraFim %>" />
                <div class="txtMenor">hora(s)</div>
            </div>
        </div>
    </div>
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
            <div class="txtMenor">
                <label><input type="radio" name="rdoComentario" id="rdoComentarioSim" value="1" <%=Model.ExibirComentarioGabaritoSelecionada %>  /> Sim</label>
                <label><input type="radio" name="rdoComentario" id="rdoComentarioNao" value="0" <%=Model.NaoExibirComentarioGabaritoSelecionada %> /> Não</label>
            </div>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Solicitação de recursos</div>
        <div class="textoDivisao">Período em que será aceito recursos do usuário sobre o simulado realizado.</div>
    </div>
    <div class="linhaImpar">
        <div class="boxDatas">

            <input id="txtDataRecursoInicio" class="txtData" type="text" value="<%=Model.RecursoDataInicio %>" name="txtDataRecursoInicio" />
            <div class="txtMenor"> à(s) </div>

            <input type="text" class="txtHora" id="txtHoraRecursoInicio" value="<%=Model.RecursoHoraInicio %>" name="txtHoraRecursoInicio"  />
            <div class="txtMenor"> hora(s) até</div>

            <input id="txtDataRecursoFim" class="txtData" type="text" value="<%=Model.RecursoDataFim %>" name="txtDataRecursoFim" />
            <div class="txtMenor"> à(s) </div>

            <input type="text" class="txtHora" id="txtHoraRecursoFim" value="<%=Model.RecursoHoraFim %>" name="txtHoraRecursoFim"  />
            <div class="txtMenor"> hora(s)</div>

        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Liberação do ranking e relatótios</div>
        <div class="textoDivisao">Informação para o usuário de quando será liberado os rankings e os relatórios.</div>
    </div>
    <div class="linhaImpar">
        <div class="boxDatas">
            <input id="txtDataRanking" class="txtData" type="text" value="<%=Model.RankingData %>" name="txtDataRanking" />
            <div class="txtMenor"> à(s) </div>
            <input type="text" class="txtHora" id="txtHoraRanking" value="<%=Model.RankingHora %>" name="txtHoraRanking"  />
            <div class="txtMenor"> hora(s)</div>
        </div>
    </div>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Redação</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft"><span class="SEC02511_texto">O simulado terá redação(ões)?</span></div>
            <div class="txtMenor">
                <label><input type="radio" name="rdoRedacao" id="rdoRedacaoNao" <%=Model.CheckRedacaoNao %> <%=Model.RedacaoDisabled %> value="0"/> Não</label>
                <label><input type="radio" name="rdoRedacao" id="rdoRedacaoSim" <%=Model.CheckRedacaoSim %> <%=Model.RedacaoDisabled %> value="1"/> Sim</label>
            </div>
            <div id="boxRedacao" class="txtMenor">
                ID: <input id="txtIdRedacao" class="txtIdRedacao" type="text" value="<%=Model.Redacao %>" <%=Model.RedacaoDisabled %> name="txtIdRedacao" />
            </div>
        </div>
        
        
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Portais</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaPar">
		<div class="dadosCriacao">
            <input name="chkTipoPortal" type="hidden" value="0" />
			<%
                IList<SelectListItem> tipos = (IList<SelectListItem>)ViewData["Portais"];
                foreach (SelectListItem tipo in tipos)
            {
                %>
                <label><input name="chkTipoPortal" type="checkbox" value="<%=tipo.Value%>" <%= (tipo.Selected) ? "checked=\"checked\"" : "" %>  />
                <%=tipo.Text%></label>
                <%
            }
            %>
		</div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Embaralhamento</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Embaralhar as questões da prova de cada aluno?</div>
            <div class="txtMenor">
                <label><input type="radio" name="rdoEmbaralharQuestoes"  id="rdoEmbaralharQuestoesNao" value="0" <%=Model.NaoEmbaralharQuestoes %> <%=Model.EmbaralharDisabled %>/> Não</label>
                <label><input type="radio" name="rdoEmbaralharQuestoes" id="rdoEmbaralharQuestoesSim" value="1" <%=Model.EmbaralharQuestoes %> <%=Model.EmbaralharDisabled %>/> Sim</label>
            </div>
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

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Reabrir</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Permitir reabrir?</div>
            <div class="txtMenor">
                <label><input type="radio" name="rdoReabrir"  id="rdoReabrirNao" value="0" <%=Model.NaoReabrirChecked %> /> Não</label>
                <label><input type="radio" name="rdoReabrir" id="rdoReabrirSim" value="1" <%=Model.ReabrirChecked %> /> Sim</label>
            </div>
        </div>
    </div>

    <div class="clear"></div>
<%  } %>
    </div>
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Simulado", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnAvancarConfiguracao" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>
</div>
