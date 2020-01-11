<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews"%>

<div class="areaResumoSimulado">
    <div class="areaConfiguracao">
<%  
    using (Html.BeginForm("ConfirmarSimulado", "Simulado", FormMethod.Post, new { @id = "frmResumoSimulado" }))
    {
%>
    <%= Html.Hidden("txtIdSimuladoResumo", Model.Id, new { @id = "txtIdSimuladoResumo" })%>
     <div class="divisaoQuestao">
        <div class="tituloDivisao">Título</div>
        <div class="textoDivisao">texto</div>
    </div>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Título do simulado:</span>
        <label><%= Model.Nome %></label>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.Realizacao%>
        </div>
    </div>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Liberação do gabarito</div>
        <div class="textoDivisao">data de liberação do gabarito na(s) avaliação(ões)</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.Gabarito%> <%=Model.DivulgacaoGabaritoDataHora%>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Solicitação de recursos</div>
        <div class="textoDivisao">Período em que será aceito recursos do usuário sobre o simulado realizado.</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.Recurso%>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Liberação do ranking e relatótios</div>
        <div class="textoDivisao">Informação para o usuário de quando será liberado os rankings e os relatórios.</div>
    </div>
    <div class="linhaImpar">
        <div class="boxDatas">
            <%=Model.RankingData %>
            <div class="txtMenor"> à(s) </div>
            <%=Model.RankingHora%>
            <div class="txtMenor"> hora(s)</div>
        </div>
    </div>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Redação</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div id="boxRedacao" class="txtMenor">
                ID: <%=Model.RedacaoResumo%>
            </div>
        </div>
    </div>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Portais</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <% foreach (string realizador in Model.Realizadores)
               {
                   %>
                   <p><%=realizador%></p>
                   <%
               } %>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Embaralhamento</div>
        <div class="textoDivisao">Os alunos recebem as questões em ordem diferente. </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Embaralhar questões:</div><div class="txtMenorRO"><%=Model.Embaralhar%></div>
        </div>
    </div>


    <div class="divisaoQuestao">
        <div class="tituloDivisao">Correção de questões objetivas</div>
        <div class="textoDivisao">Divulgação da nota </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.CorrecaoNota %>
        </div>
    </div>
        <div class="linhaPar">
        <div class="opcoes">
            - <%=Model.CorrecaoNotaLowUp%>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Reabrir</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.ResumoReabrir%>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Avaliação</div>
        <div class="textoDivisao"></div>
    </div>
    <div id="listaAgendamentos">
    <% foreach (AgendamentoView agendamento in Model.Aplicacoes)
       {
           Html.RenderPartial("ItemAgendamentoRO", agendamento);
       } %>
    </div>
    <div class="clear"></div>


    <div class="divisaoQuestao">
        <div class="tituloDivisao">Situação do Simulado</div>
        <div class="textoDivisao">Verifique o status do simulado.</div>
    </div>
    <% Html.RenderPartial("BoxStatus", Model); %>
    <div class="clear"></div>


<%  } %>
    </div>
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Simulado", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarResumo" class="btnNav">&laquo; Voltar</a>
            <a id="btnSalvarConfirmacao" class="btnNav">Salvar simulado</a>
        </div>
    </div>
</div>
