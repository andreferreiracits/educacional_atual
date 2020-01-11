<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="conteudo">
    <div id="caixaConfiguracoesGerais">
    <div class="divisaoTopicos">
        <div class="tituloDivisao">Participantes</div>
        <div class="textoDivisao">Selecione as pessoas, grupos ou turmas que devem responder a avaliação.</div>
    </div>
    <div class="selecionarParticipantes">
        <div class="destaqueAzul">
            Selecione pessoas:<input type="text" name="strBuscaUsuario" placeholder="Digite um nome" id="strBuscaUsuario" value="">
            ou selecione turmas e grupos:
                <a id="avRapidaBtnGerenciadorGrupos" class="btn btnAdicione">
                    <span class="icoAdicionar"></span> adicionar grupos
                </a>
        </div>
    </div>
    <div id="avRapidaGerenciadorGrupos"></div>

    <table id="avRapidaAgendamentoRealizadores" class="tabela tamQuestao" width="100%">
        <thead>
            <tr>
                <td width="100%">Respondentes selecionados</td>
            </tr>
        </thead>
        <tbody>
            <tr class="Modelo hide">
                <td>
                    <span>EM1A</span>
                    <div class="botoes" style="display: none;">
                        <a class="btnExcluir" href="javascript:void(0)">remover</a>
                    </div>  
                </td>
            </tr>
            <tr>
                <td class="vazio">Nenhuma pessoa selecionada até agora.</td>
            </tr>
        </tbody>
    </table>



<%--    <div class="linhaPar"> --%>
        <%--<input type="text" value="" placeholder="seletor...">--%>
<%--        <div id="avRapidaGerenciadorGrupos"></div>
        <div class="Realizador">
            Grupo = 1, Portal = 2, Usuario = 3
            <input type='text' name="Id"  placeholder="Id do participante" value=""/>
            <input type='text' name="Tipo" placeholder="Tipo do participante" value=""/>
        </div>--%>
<%--        </div> --%>

    <div class="clear"></div>
    <form id="avRapidaNovoAgendamento">
    <div class="divisaoTopicos">
        <div class="tituloDivisao">Configurações</div>
        <div class="textoDivisao">Selecione um modelo de agendamento para a avaliação.</div>
    </div>
    <ul class="menuTemplate">
        <li>
            <label>
                <div class="ativo">
                    <input checked="checked" type="radio" name="rdoTemplateAgendamento" value="1" id="rdoTemplateAgendamento1"
                    data-vform=' { "Correcao" : { "Tipo":3, "Regra": 0, "CaseSensitive": false, "AguardaDivulga": 1 },  "Gabarito" : { "Tipo":2, "Comentarios": false },  "Dica" :     {"Tem":false, "AposTentativasConferir":0},  "Tentativas" : 0,  "AutoEstudo" : false }'/>
                    <span>Modelo Formal</span>
                    <p>Tem prazo definido. O aluno só pode fazer a prova uma vez. Feedback de acerto e erro, gabaritos e nota são liberados após o final do agendamento.</p>
                </div>
            </label>
        </li>
        <li>
            <label>
                <div>
                    <input type="radio" name="rdoTemplateAgendamento" value="2" id="rdoTemplateAgendamento2"
                    data-vform=' { "Correcao" : { "Tipo":2, "Regra": 0, "CaseSensitive": false, "AguardaDivulga": 1 },  "Gabarito" : { "Tipo":2, "Comentarios": false },  "Dica" :     {"Tem":false, "AposTentativasConferir":0},  "Tentativas" : 3,  "AutoEstudo" : false }'/>
                    <span>Modelo Livre</span>
                    <p>Tem prazo definido. O aluno pode repetir até três vezes. O feedback de acertto e erro, gabaritos e notas são liberados após o final do agendamento.</p>
                </div>
            </label>
        </li>
        <li>
            <label>
                <div>
                    <input type="radio" name="rdoTemplateAgendamento" value="3" id="rdoTemplateAgendamento3"
                    data-vform=' { "Correcao" : { "Tipo":1, "Regra": 0, "CaseSensitive": false, "AguardaDivulga": 1 },  "Gabarito" : { "Tipo":1, "Comentarios": false },  "Dica" :     {"Tem":false, "AposTentativasConferir":0},  "Tentativas" : 3,  "AutoEstudo" : true }'/>
                    <span>Modelo auto-avaliação</span>
                    <p>Por ser repetido à vontade. O aluno recebe feedback de acerto e erro ao confirmar a questão. Gabaritos e notas são liberados ao encerrar a prova.</p>
                </div>
            </label>
        </li>
    </ul>
    <input type="hidden" name="IdAgendamento"   value="0" />
    <input type="hidden" name="TipoAgendamento" value="1"  />
    <input type="hidden" name="IdBanco" value="<%:ViewData["IdBanco"] %>"  />
    <input type="hidden" name="Estado" value="2"  />
    <div class="divisaoTopicos branco">
        <%--<div class="tituloDivisao">Periodo</div>--%>
        <div class="textoDivisao">Defina o intervalo de tempo em que o agendamento ficará aberto.</div>
    </div>
    <div class="linhaPar">
        <div class="box">
            <div class="opcoesBox">
                <label class="titulo">Início:</label>
            </div>
            <div class="opcoesBox">
                <div class="opcao">
                    <label class=" habilitado ">
                        <input type="radio" name="rdoAgendamento" id="rdoAgendamentoNao" value="2" checked="checked"> Inicio imediato após publicação.
                    </label>
                </div>
                <div class="opcao">
                    <div class="conteudoLeft">
                        <label><input type="radio" name="rdoAgendamento" id="rdoAgendamentoSim" value="1"> Em:</label>
                    </div>
                    <div id="boxAgendamento" class="desabilitado">
                        <input id="txtDataRealizacaoInicio" class="txtData  habilitado" type="text" value="" name="txtDataRealizacaoInicio" disabled="disabled">
                        <div class="txtMenor">  à(s) </div>
                        <input id="txtHoraRealizacaoInicio" class="txtHora  habilitado" type="text" value="" name="txtHoraRealizacaoInicio" autocomplete="OFF" disabled="disabled">
                        <div class="txtMenor">  hora(s) </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="opcoesBox">
                <label class="titulo">Término:</label>
            </div>
            <div class="opcoesBox">
                <div class="opcao">
                    <input id="txtDataRealizacaoFinal" type="text" class="txtData" name="txtDataRealizacaoFinal"  value="<%: DateTime.Now.AddDays(7).ToString("dd/MM/yyyy") %>"> <div class="txtMenor">à(s) </div>
                    <input id="txtHoraRealizacaoFinal" type="text" class="txtHora" name="txtHoraRealizacaoFinal"  value="<%: DateTime.Now.ToShortTimeString() %>"> <div class="txtMenor">hora(s)</div>
                </div>
            </div>
        </div>
    </div>
    <div class="divisaoTopicos branco">
        <%--<div class="tituloDivisao">Periodo</div>--%>
        <div class="textoDivisao">Embaralhar as questões da prova de cada aluno</div>
        <div class="txtMenor">
            <label><input type="radio" name="rdoEmbaralharQuestoes" id="rdoEmbaralharQuestoesNao" value="false" checked="checked"/> Não</label>
            <label><input type="radio" name="rdoEmbaralharQuestoes" id="rdoEmbaralharQuestoesSim" value="true" /> Sim</label>
        </div>
    </div>
    </form>
    </div>

</div>