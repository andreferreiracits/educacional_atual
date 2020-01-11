<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.AresponderVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.Models.Exam" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%" cellspacing="0" cellpadding="0" data-json='<%=ViewData["TotalJson"]%>'>
    <% Html.RenderPartial("Filtro", Model.Filtros); %>
    <tbody>

    <%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr><td colspan="2"><hr></td></tr>
        <tr class="<%=linha.CssTRStatusAberta %> <%=linha.CssVizualizarAvaliaca %>" <%=linha.VizualizarAvaliacao %>>
            <td>
                <div class="divLinhaAplic">
                    <div class="titAplic">
                        <div onmouseover='divTipoAv(this);' onmouseout='divTipoAv(this);' id="tpAplic" class="tmhIcoAplic <%= linha.CssTipoAvaliacao %>"><div class="divInfoTipoAva hide"><%= linha.InfoTipoAvaliacao %></div> </div>
                        <%= (linha.TamanhoTitulo == 0) ? linha.TituloAplicacao : Html.Encode(linha.TituloAplicacao)%>
                    </div>
                    <div class="descAplic">
                        <%
                            if (!String.IsNullOrWhiteSpace(linha.RealizacaoInicio)) {
                        %>
                        <span class="tmhIcoAplic icoDataAgendado"></span><span> Começa em: <b><%= linha.RealizacaoInicio %></b> | Termina em: <b><%= linha.RealizacaoFim %></b></span>
                        <%
                            }
                        %>
                        <span class="icoAgendador"></span><span> Agendado por: <b><%= linha.NomeAutorAplicacao %></b></span>
                    </div>
                </div>
            </td>
            <td class="tdStatusAvaliacao <%= linha.StatusAplicacao %>" title="<%= linha.HintStatusAplicacao %>"></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="6">Nenhuma prova encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>