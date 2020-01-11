<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Novos.TabelaView<ProvaColegiada.TabelaViews.Novos.Agendamento.Interface.IAgendamentoItemListaView>>" %>
<table atual="<%= Model.Paginacao.Atual %>" width="100%">
    <tbody>
<%
    if (Model != null &&  Model.Itens.Count > 0)
    {
        foreach (var linha in Model.Itens)
        {
%>
        <tr>
		    <td style="width: 400px;"><%: linha.Titulo %></td>
		    <td style="width: 270px;"><%: linha.FormatPeriodo("ServicoAgendamentos.Textos.Periodo_AgendamentoRelatorio_")%></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="5">Nenhum agendamento selecionado.</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial(Model.ViewPaginacao, Model.Paginacao); %>
</table>