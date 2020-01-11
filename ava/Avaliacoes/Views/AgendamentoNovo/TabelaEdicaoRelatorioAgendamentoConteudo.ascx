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
<%--                <%= Html.CheckBox("chkRelatorioAgendamentoEdicao.Checked", false ) %>
                <%= Html.Hidden("chkRelatorioAgendamentoEdicao.Id", String.Format("{0}", linha.Id))%>
                <%= Html.Hidden("chkRelatorioAgendamentoEdicao.Value", String.Format("{0}", linha.IdConfig))%>--%>
            </td>
		    <td style="width: 400px;"><%: linha.Titulo %>
                <input type="hidden" name="IdAgendamentoConfig" value="<%:linha.IdConfig %>" />
                <input type="hidden" name="IdAgendamento" value="<%:linha.Id %>" />
                <div class="botoes">
<%--                <%if( linha.Excluir ) { %>--%>
                    <a href="javascript:void(0)" class="btn btnExcluir funcao">Excluir</a>
<%--                <%} %>--%>
                </div>
            </td>
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