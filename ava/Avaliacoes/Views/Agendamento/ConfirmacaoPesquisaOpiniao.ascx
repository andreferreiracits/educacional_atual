<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="areaConfirmacao areaConfiguracoesAplicacao">
<%  
    using (Html.BeginForm("ConfirmarAplicacao", "Agendamento", FormMethod.Post, new { @id = "frmConfirmacaoAplicacao" }))
    {
%>

    <% Html.RenderPartial("AplicacaoPesquisaOpiniao", Model); %>
    <div class="clear"></div>
    <div class="areaConfiguracoesAplicacao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Situação do Agendamento</div>
            <div class="textoDivisao">Verifique o status de sua aplicação.</div>
        </div>
        <% Html.RenderPartial(Model.BoxStatus, Model); %>
        <div class="clear"></div>
    </div>
    
<%  } %>
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Agendamento", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarConfirmacao" class="btnNav">&laquo; Voltar</a>
            <a id="btnSalvarConfirmacao" class="btnNav">Salvar aplicação</a>
        </div>
    </div>
</div>

<div id="dlgVisualizarQuestoesResumo" title="Listagem das Questões" class="popup SEC02511">
<%  using (Html.BeginForm("CarregarVisualizarQuestoesProva", "Agendamento", FormMethod.Post, new { @id = "frmTabelaQuestoesResumo", @class = "tbl" }))
    { %>
    <input type="hidden" value="1" id="tipoShow" name="tipoShow" />
        <div class="popupConteudo">
        <table id="tblQuestoes" class="tabela scroll scrollAnular" cellpadding="0" cellspacing="0" border="0" width="860">
            <thead>
                <tr>
                    <td colspan="3">Enunciado</td>
                    <td style="width:115px;">Valor</td>
                    <td style="width:150px;">Identificador</td>
                </tr>
            </thead>
            <tbody>
                <tr class="vazio"><td colspan="5"></td></tr>
            </tbody>
        </table>
        </div>
        <div class="popupBotoes">
            <div class="btnEspacamento direita">
                <a id="btnFecharVisualizar" class="btnNav">Fechar</a>
            </div>
        </div>
    <% } %>
</div>
