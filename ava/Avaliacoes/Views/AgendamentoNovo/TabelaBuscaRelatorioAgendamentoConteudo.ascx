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
            <td class="selecionar" style="width: 20px;">
                <%= Html.Hidden("chkRelatorioAgendamento.Id", String.Format("{0}", linha.Id))%>
                <%= Html.Hidden("chkRelatorioAgendamento.Value", String.Format("{0}", linha.IdConfig))%>
                <%= Html.CheckBox("chkRelatorioAgendamento.Checked", Model.ControleCheck.IsCheck(linha.IdConfig.ToString() ) ) %>
            </td>
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
            <td colspan="5">Nenhum agendamento encontrado.</td>
        </tr>
<%
    }
%>
    <% foreach(string campo in Model.ControleCheck.HtmlChecados()){
       Response.Write(campo);
    }%>

    </tbody>
    <% Html.RenderPartial(Model.ViewPaginacao, Model.Paginacao); %>
</table>