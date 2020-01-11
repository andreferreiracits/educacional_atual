<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="areaConfirmacao areaConfiguracoesAplicacao">
<%  
    using (Html.BeginForm("ConfirmarAplicacao", "Agendamento", FormMethod.Post, new { @id = "frmConfirmacaoAplicacao" }))
    {
%>

    <% Html.RenderPartial("Aplicacao", Model); %>
    <div class="clear"></div>
    <div class="areaConfiguracoesAplicacao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Situação do Agendamento</div>
            <div class="textoDivisao">Verifique o status de sua aplicação.</div>
        </div>
        
        <div class="clear"></div>
    </div>

        <div class="navegacaoBotoes">
            <div class="btnEspacamento btnCanconfirma">
                    <%= Html.ActionLink("Cancelar", "Index", "Agendamento", new { @class = "btnCancelar" })%>
                </div>
                <div id="botoesResumo" class="to direita boxPublica">
                <div class="statusProva">
                    <div>Quando desejar efetuar o <br /> agendamento, escolha o estado <br /> <b>Publicada</b> e salve a aplicação.</div>
                        <% Html.RenderPartial(Model.BoxStatus, Model); %>
                </div>

                    <a id="btnVoltarConfirmacao" class="btnNav">&laquo; Voltar</a>
                    <a id="btnSalvarConfirmacao" class="btnNav">Salvar aplicação</a>
                </div>
    </div>
    <div class="clear"></div>
    
<%  } %>
</div>

<div id="dlgVisualizarQuestoesResumo" title="Listagem das Questões" class="popup SEC02511">
<%  using (Html.BeginForm("CarregarVisualizarQuestoesProva", "Agendamento", FormMethod.Post, new { @id = "frmTabelaQuestoesResumo", @class = "tbl" }))
    { %>
    <input type="hidden" value="1" id="tipoShow" name="tipoShow" />
        <div class="popupConteudo">
        <table id="tblQuestoes" class="tabela scroll scrollAnular" cellpadding="0" cellspacing="0" border="0" width="860">
            <thead>
                <tr>
                    <td style="width: 5px; " class="bordaGrupo"></td>
                    <td colspan="3" style="width:590px; padding-left:10px;">Enunciado</td>
                    <td style="width:114px;">Valor</td>
                    <td style="width:145px;">Identificador</td>
                </tr>
            </thead>
            <tbody>
                <tr class="vazio"><td colspan="6"></td></tr>
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

<div id="dlgUsuario" title="Visualizar Grupo" class="popup SEC02511">
    <div class="popupConteudo" id="conteudoDialogoUsuarios"> </div>
    <div class="popupBotoes">
        <div class="btnEspacamento">
            <a id="btnCancelarUsuario" class="btnNav">Cancelar</a>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnAdicionarUsuario" class="btnNav">Adicionar</a>
        </div>
    </div>
</div>