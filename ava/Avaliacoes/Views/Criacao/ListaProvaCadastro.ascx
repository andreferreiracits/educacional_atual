<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.ProvaVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <% Html.RenderPartial("NovoFiltro", Model.Filtros); %>
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr>
            <td class="selecionar" style="width: 20px;">
                <%= Html.Hidden("chkProva.Value", String.Format("{0}", linha.Id))%>
                <%
                    if (linha.Excluir || linha.Editar)
                    {
                        Response.Write(Html.CheckBox("chkProva.Checked", false));
                    }
                    else
                    {
                        %>
                        <input type="hidden" name="chkProva.Checked" value="false" />
                        <%
                    }
                %>
            </td>
            <td>
                <a class="lnk" title="<%= (linha.TamanhoNome == 0) ? "" : Html.Encode(linha.NomeCompleto)%>">
                    <%= (linha.TamanhoNome == 0) ? ("<em class=\"semEnunciado\">" + linha.Nome + "</em>") : Html.Encode(linha.Nome)%>
                </a>
                <div class="botoes">
                    <% Html.RenderPartial(linha.BotaoEditar, linha); %>
                    <% Html.RenderPartial(linha.BotaoVisualizar, linha); %>
                    <% Html.RenderPartial(linha.BotaoImprimir, linha); %>
                    <% Html.RenderPartial(linha.BotaoDuplicar, linha); %>
                    <% Html.RenderPartial(linha.BotaoExcluir, linha); %>
                    <% Html.RenderPartial(linha.BotaoAgendamento, linha); %>
                </div>
            </td>
            <td><%=Html.Encode(linha.Identificador) %></td>
            <td><%=Html.Encode(linha.Autor) %></td>
            <td><span class="<%= linha.CssEstado %>"><%= Html.Encode(linha.Estado) %></span></td>
            <td><%= Html.Encode(linha.Modificado)%></td>
            <td><%= Html.Encode(linha.TotalQuestoes)%></td>
        </tr>
<%
        }
    } else {
%>
        <tr class="vazio">
            <td colspan="7">Não foram encontradas avaliações. Para criar uma nova avaliação clique no botão acima e opte entre as modalidades "<b>selecão automática</b>" e "<b>seleção manual</b>".</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>
