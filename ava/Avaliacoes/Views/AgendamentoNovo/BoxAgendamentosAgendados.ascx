<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Novos.TabelaView<ProvaColegiada.TabelaViews.Novos.Agendamento.Interface.IAgendamentoItemListaView>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Novos.Agendamento.Interface" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Geral" %>

<div>
    <h2><b>Próximos agendamentos</b></h2>

    <% Html.RenderPartial("TabelaAgendamentosAgendadosMais", Model); %>
</div>

