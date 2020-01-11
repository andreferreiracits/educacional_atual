<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>

<div class="areaResumoProva">

<a id="helpConfirmacaoAvaliacao" class="btn sec_menuNavegacao" href="javascript:void(0)">?</a>

<%  
    using (Html.BeginForm("ConfirmarProva", "Criacao", FormMethod.Post, new { @id = "frmConfirmacaoProva", @class = "tbl" }))
    {
%>
	
        <% Html.RenderPartial("Prova", Model); %>


        <div class="areaResumoPasso5">
            <div class="divisaoQuestao">
                <div class="tituloDivisao">Estado da avaliação</div>
                <div class="textoDivisao">Verifique o status de sua prova.</div>
            </div>
            <div class="clear"></div>
        </div>

    <div class="navegacaoBotoes">
            <div class="btnEspacamento btnCanconfirma">
                    <%= Html.ActionLink("Cancelar", "Index", "Admin", new { @id = "btnCancelar", @class = "btnCancelar" })%>
                </div>
                <div id="botoesResumo" class="to direita boxPublica">
                <div class="statusProva">
                    <div>Escolha o estado da avaliação: <br /> (Somente poderá ser agendada <br /> após ser publicada)</div>
                    <% Html.RenderPartial(Model.ComentarioEstadoView); %>
                    <% foreach (SelectListItem estado in Model.listaSelectStatus) { %>
                            <%=Html.RadioButton("rdoStatus", estado.Value, estado.Selected, new { @id = "rdoStatus" + estado.Value.ToString() })%>
                            <label for="rdoStatus<%=estado.Value.ToString()%>"><%=estado.Text %></label>
                    <% } %>
                </div>

                    <a id="btnVoltarConfirmacao" class="btnNav">&laquo; Voltar</a>
                    <a id="btnSalvarConfirmacao" class="btnNav">Salvar avaliação</a>
                </div>
    </div>
    <div class="clear"></div>
    <%  } %>
    
    <% Html.RenderPartial(Model.ViewDlgConfirmacaoQuestoes, Model); %>

    
</div>
