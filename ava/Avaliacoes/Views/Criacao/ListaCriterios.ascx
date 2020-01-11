<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.CriterioVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>">
    <% Html.RenderPartial("Filtro", Model.Filtros); %>
    <tbody>
<%

    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (CriterioVOView linha in Model.Linhas)
        {
%>
        <tr  class="<%=linha.BordaLastGrupo(Model.Linhas) %>">
            <td style="width: 5px; " class="bordaGrupo  <%=linha.BordaGrupo %> <%=linha.CorGrupo %>"></td>
            <td class="selecionar">
                <%= Html.Hidden("chkCriterio.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkCriterio.Checked", false)%>
            </td>
            <td style="width:285px;">
                <a class="lnk">
                    <%= Html.Encode(linha.Nome)%>
                </a>
                <div class="botoes">
                    <%= Html.ActionLink("Remover", "ExcluirCriterioProva", "Criacao", new { @id = linha.Id.ToString() }, new { @class = "btnExcluir" })%>
                </div>
            </td>
            <td class="centro"><input type="hidden" name="txtQuestaoEncontrada" value="<%=linha.Encontradas %>" /><%=linha.Encontradas %></td>
            <td class="qstaoSelec centro"><input type="text" name="txtQuestaoSelecionada" class="txt centro" size="5" value="<%=linha.Selecionadas %>" /></td>
            <td class="valTotal centro"><input type="text" name="txtValorCriterio" class="txt centro" size="5" value="<%=linha.Valor.ToString("0.0") %>" /></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="7">Nenhum critério encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>

<% if (Model != null && Model.Linhas.Count > 0)
   { %>
    <tfoot>
        <tr>
            <td class="adicionados" colspan="4">
                Adicinados <%=Model.Linhas.Count%> criterios
            </td>
            <td class="qstaoSelec centro">
                Total: <span id="txtSelecionadasTotal"><%= Model.Linhas.Sum(c => c.Selecionadas) %></span>
            </td>
            <td class="valTotal centro">
                Total: <span id="txtValorTotal"><%= Model.Linhas.Sum(c => c.Valor).ToString("0.0") %></span>
            </td>
        </tr>
    </tfoot>
<% } %>
</table>
