<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Novos.TabelaView<ProvaColegiada.TabelaViews.Novos.Agendamento.Interface.IAgendamentoItemListaView>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Novos.Agendamento.Interface" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Geral" %>

<div>
<h2><b>Hoje</b>
<%= 
//TODO: será q as formatações não seria legal estar em um arquivo de formatação?
Html.Recurso("Framework.Textos.Data_dd_MM", DateTime.Now)
%></h2>

<table>
<% foreach (IAgendamentoItemListaView item in Model.Itens)
   { %>
<tr>
    <td title="<%:item.Titulo %>"><p><%:item.Titulo %></p></td>
    <td><%=item.FormatPeriodo("ServicoAgendamentos.Textos.Periodo_HomeAndamento_")%>
    <% //TODO: deixar a formatação em um arquivo na view referente a formatadao
        %></td>
</tr>  
<% } %>
</table>
</div>

