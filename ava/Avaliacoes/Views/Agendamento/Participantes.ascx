<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div class="areaParticipantes">
    <a id="helpParticipantesAvaliacao" class="btn sec_menuNavegacao" href="javascript:void(0)">?</a>
    <div>
        <%= Html.Hidden("txtIdAplicacaoParticipantes", Model.Id) %>
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Participantes</div>
            <div class="textoDivisao">Selecione abaixo os participantes a serem associados a esta aplicação.</div>
        </div>

        <% foreach(string viewBoxParticipantes in Model.BoxParticipantes){
               Html.RenderPartial(viewBoxParticipantes,Model);
           }       
        %>


    </div>
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Criacao", new { @id = "btnCancelarArea", @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarParticipante" class="btnNav">&laquo; Voltar</a>
            <a id="btnAvancarParticipante" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>

    <% foreach (string viewDialogParticipantes in Model.BoxDialogoParticipantes)
   {
       Html.RenderPartial(viewDialogParticipantes, Model);
        }       
    %>
</div>
