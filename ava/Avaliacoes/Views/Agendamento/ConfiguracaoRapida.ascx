<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>

<div class="areaConfiguracao">
<% using (Html.BeginForm("SalvarAplicacaoRapida", "Agendamento", FormMethod.Post, new { @id = "frmSalvarParticipantesPortais" }))
    {
%>
    <%= Html.Hidden("txtIdAplicacaoParticipantes", Model.Id, new { @id = "txtIdAplicacaoParticipantesPortais" })%>
    <%= Html.Hidden("txtIdTipoParticipantes", EnumTipoRealizadores.RealizadorPortal.Id, new { @id = "txtIdTipoParticipantesPortais" })%>
    
    <div class="areaConfiguracoesAplicacao">
                
        <div class="configAvancadas">
            <% Html.RenderPartial(Model.BoxTentativas, Model); %>
            <div class="clear"></div>
            <% Html.RenderPartial(Model.BoxNotasFeedbacks, Model); %>
            <div class="clear"></div>
            <% Html.RenderPartial(Model.BoxGabarito, Model); %>
            <div class="clear"></div>
            <% Html.RenderPartial(Model.BoxDicas, Model); %>
            <div class="clear"></div>
            <% Html.RenderPartial(Model.BoxAutoEstudo, Model); %>
            <div class="clear"></div>
            <% Html.RenderPartial(Model.BoxConfigExtras, Model); %>
        </div>    

    </div>
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Participantes</div>
            <div class="textoDivisao">Selecione abaixo os participantes a serem associados a esta aplicação.</div>
        </div>
        <% Html.RenderPartial("ConteudoDialogoParticipantesPortal", Model); %>

<% } %>




</div>
