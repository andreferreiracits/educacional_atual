<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Novos.TabelaView<ProvaColegiada.TabelaViews.Novos.Agendamento.Interface.IAgendamentoItemListaView>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Novos.Agendamento.Interface" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Geral" %>
<table data-tabela="mais" data-tabela-carrendo=".sec025carregando">
        <tbody>
            <% foreach (IAgendamentoItemListaView item in Model.Itens)
               { %>
            <tr>
                <td title="<%:item.Titulo %>"><p><%:item.Titulo %></p></td>
                <td title="<%:item.FormatPeriodo("ServicoAgendamentos.Textos.Periodo_HomeAgendadaFim_")%>"><%:item.FormatPeriodo("ServicoAgendamentos.Textos.Periodo_HomeAgendadaInicio_")%>
                <% //TODO: deixar a formatação em um arquivo na view referente a formatadao
                  %></td>
            </tr>  
            <% } %>
        </tbody>
        <% 
            //TODO: pensar em uma forma de abstrair melhor esta parte do "mais" caso seja utilizado mais vezes
            if (Model.Paginacao.Total > 1 && Model.Paginacao.Atual < Model.Paginacao.Total)
           {%>
        <tfoot>
            <tr><td colspan="2">
                <div class="sec025carregando">Carregando...</div>
                <%= Html.ActionLink("mais", "ProximaAgendada", "AgendamentoNovo", new { id = Model.Paginacao.Atual }, null)%>
                </td></tr>
        </tfoot>
        <%} %>
    </table>
