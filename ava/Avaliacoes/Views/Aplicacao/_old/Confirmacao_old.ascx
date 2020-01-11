<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="areaConfirmacao areaConfiguracoesAplicacao">
<%  
    using (Html.BeginForm("ConfirmarAplicacao", "Aplicacao", FormMethod.Post, new { @id = "frmConfirmacaoAplicacao" }))
    {
%>
    <%= Html.Hidden("txtIdAplicacaoConfirmacao", Model.Id) %>

    <% Html.RenderPartial("Aplicacao", Model); %>
    <div class="areaConfiguracoesAplicacao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Situação da prova</div>
            <div class="textoDivisao">Verifique o status de sua aplicação.</div>
        </div>
        <div class="statusProva">
            <label>
                <input type="radio" id="rdoStatusElaboracao" name="rdoStatus" checked="checked" value="<%= Convert.ToInt32(EstadoAplicacao.EmElaboracao) %>" />
                <strong>Em elaboração</strong>
            </label>
            <label>
                <input type="radio" id="rdoStatusPublicada" name="rdoStatus" value="<%= Convert.ToInt32(EstadoAplicacao.Publicada) %>" />
                <strong>Publicada</strong>
            </label>
        </div>
        <div class="clear"></div>
    </div>
    
<%  } %>
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Aplicacao", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarConfirmacao" class="btnNav">&laquo; Voltar</a>
            <a id="btnSalvarConfirmacao" class="btnNav">Salvar aplicação</a>
        </div>
    </div>
</div>
