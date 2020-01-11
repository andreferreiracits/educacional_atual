<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.AplicacaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.Models.Exam" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <% Html.RenderPartial("NovoFiltro", Model.Filtros); %>
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr class="alturaLinhaAplicacao">
            <td class="selecionar" width="3%">
                <%= Html.Hidden("chkAplicacao.Value", String.Format("{0}", linha.Id))%>
                <%
                    if (linha.Excluir)
                    {
                        Response.Write(Html.CheckBox("chkAplicacao.Checked", false));
                    }
                    else
                    {
                        %>
                        <input type="hidden" name="chkAplicacao.Checked" value="false" />
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
                    <% Html.RenderPartial(linha.BotaoSimular, linha); %>
                   <% if (linha.Duvida) {
                           Html.RenderPartial("Lista/BotaoFlipped", linha);
                       } %>
                       <% Html.RenderPartial(linha.BotaoAnular, linha); %>
                    <% Html.RenderPartial(linha.BotaoRelatorio, linha); %>
                    
                </div>
            </td>
            <td width="15%"><%= Html.Encode(linha.RealizacaoInicio)%></td>
            <td width="15%"><%= Html.Encode(linha.RealizacaoFim)%></td>
            <td width="13%"><span class="<%= linha.CssEstado %>"><%= Html.Encode(linha.Estado) %></span></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="6">Nenhum agendamento encontrado.</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>




