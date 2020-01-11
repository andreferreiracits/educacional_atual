<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div id="caixaConfiguracoesGerais">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Período</div>
        <div class="textoDivisao">Defina o intervalo de tempo em que o agendamento ficará aberto.</div>
    </div>
    
    <% Html.RenderPartial(Model.BoxAgendamentoPeriodo, Model); %>
   
</div>
