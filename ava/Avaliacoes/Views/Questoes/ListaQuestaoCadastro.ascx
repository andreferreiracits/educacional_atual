<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <% Html.RenderPartial(ViewData["ViewFiltro"].ToString(), Model.Filtros); %>
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr>
            <td class="selecionar" width="2%">
                <%= Html.Hidden("chkQuestao.Value", String.Format("{0}", linha.Id))%>
                <%= Html.Hidden("chkQuestao.Tipo", String.Format("{0}", linha.TipoResposta))%>
<%--                <%
                    if (linha.Excluir)
                    {--%>
                        <% Response.Write(Html.CheckBox("chkQuestao.Checked", Model.ControleCheck.IsCheck(linha.Id.ToString()))); %>
<%--                    }
                    else
                    {
                    <input type="hidden" name="chkQuestao.Checked" value="false" />
                        %>--%>
                        
<%--                        <%
                    }
                %>--%>
            </td>
            <td>
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão ID {0}", linha.Identificador)) %>" rel="<%= Url.Action("CarregarTooltip", new { @id = linha.Id.ToString() })%>"></a>
            </td>
            <td width="41%">
                <a class="lnk tooltipextra">
                    <%= (linha.TamanhoEnunciado == 0) ? ("<em class=\"semEnunciado\">" + linha.Enunciado + "</em>") : Html.Encode(linha.Enunciado)%>
                </a>
                <div class="botoes">
                    <% Html.RenderPartial(linha.BotaoEditar, linha); %>
                    <% Html.RenderPartial(linha.BotaoEditarRapido, linha); %>
                    <% Html.RenderPartial(linha.BotaoDuplicar, linha); %>
                    <% Html.RenderPartial(linha.BotaoExcluir, linha); %>
                </div>
            </td>

            <td width="10%"><%= Html.Encode(linha.Autor)%></td>
            <td width="18%"><%= Html.Encode(linha.Modificado)%></td>
            <td width="10%"><%= Html.Encode(linha.Identificador)%></td>
            <td width="10%"><span class="<%= linha.CssEstado %>"><%= Html.Encode(linha.Estado) %></span></td>
            <td width="18%"><%= Html.Encode(linha.Tipo) %></td>
            
        </tr>


<%
        }
        
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="8">Nenhuma questão encontrada.</td>
        </tr>
<%
    }
%>
    <% foreach(string campo in Model.ControleCheck.HtmlChecados()){
       Response.Write(campo);
    }%>
    
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>