<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="areaConfirmacao areaConfiguracoesAplicacao">

    <% Html.RenderPartial("Aplicacao", Model); %>
    <div class="clear"></div>
    <div class="areaConfiguracoesAplicacao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Situação do Agendamento</div>
            <div class="textoDivisao">Verifique o status de sua aplicação.</div>
        </div>
        <% Html.RenderPartial(Model.BoxStatus, Model); %>
        <div class="clear"></div>
    </div>
    
</div>
