<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.AresponderVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>">
    <% Html.RenderPartial("Filtro", Model.Filtros); %>
    <tbody>
<%

    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (AresponderVOView linha in Model.Linhas)
        {
%>
        <tr>
            <td class="selecionar">
                <%= Html.Hidden("chkCriterio.Value", String.Format("{0}", linha.Id))%>
            </td>
            <td style="width:285px;">
                <%=Html.Encode(linha.Titulo) %>
                <div class="botoes">
                    <%if (linha.PodeVisualizar) { %>
                        <a href="javascript:ViewProvaRealizada(<%=linha.IdProvaRealizada.ToString() %>);" class="btn funcao">Visualizar</a>
                    <%} %>
                </div>
            </td>
            <td class=""><%=linha.NomeAutorAplicacao%></td>
            <td class=""><%=linha.RealizacaoInicio %></td>
            <td class=""><%=linha.RealizacaoFim %></td>
            <td class="<%=linha.EstiloRealizacao %>"><%=linha.StatusRealizacaoTexto%></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="7">Nenhuma aplicação encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
      <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>
