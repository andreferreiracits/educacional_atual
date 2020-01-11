<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.SimuladoVOView>>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <% Html.RenderPartial("Filtro", Model.Filtros); %>
    <tbody>
<%
    if (Model != null && Model.Linhas.Count > 0)
    {
        foreach (SimuladoVOView linha in Model.Linhas)
        {
%>
        <tr class="alturaLinhaAplicacao">
            <td class="selecionar" width="3%">
                <%= Html.Hidden("chkSimulado.Value", String.Format("{0}", linha.Id))%>
                <%
                    if (linha.Excluir)
                    {
                        Response.Write(Html.CheckBox("chkSimulado.Checked", false));
                    }
                    else
                    {
                        %>
                        <input type="hidden" name="chkSimulado.Checked" value="false" />
                        <%
                    }
                %>

            </td>
            <td width="32%">
                <a class="lnk">
                    <%= (linha.TamanhoTitulo == 0) ? ("<em class=\"semEnunciado\">" + linha.Titulo + "</em>") : Html.Encode(linha.Titulo)%>
                </a>
                <div class="botoes">
                    <% Html.RenderPartial(linha.BotaoEditar, linha); %>
                    <% Html.RenderPartial(linha.BotaoExcluir, linha); %>
                    <% Html.RenderPartial(linha.BotaoCancelar, linha); %>
                    <% Html.RenderPartial(linha.BotaoRanking, linha); %>
                </div>
            </td>
            <td width="15%"><%= Html.Encode(linha.RealizacaoInicio)%></td>
            <td width="15%"><%= Html.Encode(linha.RealizacaoFim)%></td>
            <td width="13%"><span class="<%=linha.CssEstado %>"><%= Html.Encode(linha.Estado) %></span></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="5">Nenhuma agendamento encontrado.</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>




