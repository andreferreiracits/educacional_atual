<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaQuestaoProva<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>">
    <% Html.RenderPartial("Filtro", Model.Filtros); %>
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        int countLinha = 0;
        foreach (var linha in Model.Linhas)
        {
%>
        <tr id="linha_<%=countLinha%>">
            <td class="selecionar">
                <%= Html.Hidden("chkQuestao.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkQuestao.Checked", false)%>
            </td>
            <td style="width:15px" class="nopaddingR">
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão {0}", linha.Identificador)) %>" rel="<%= Url.Action("CarregarTooltip","Questoes", new { @id = linha.Id.ToString() })%>"></a>
            </td>
            <td style="width:552px">
                <a class="lnk">
                    <%= Html.Encode(linha.Enunciado) %>
                </a>
                <div class="botoes">
                    <%= Html.ActionLink("Remover", "ExcluirQuestaoProva", "Criacao", new { @id = linha.Id.ToString() }, new { @class = linha.BtnExcluir })%>
                </div>
            </td>

            <td style="width:110px"><%= Html.Encode(linha.Identificador)%></td>
            <td style="width:120px"><%= Html.Encode(linha.Tipo.ToString()) %></td>
            <td style="width:25px">
                <input type="hidden" id="hidPosicao_<%=linha.Id %>" name="hidPosicao" value="<%=linha.NrQuestao %>" />
                <input type="text" id="txtPosicao_<%=linha.Id %>" name="txtPosicao" class="txt" size="3" value="<%=linha.NrQuestao %>" />
            </td>
            <td style="width:15px;" class="nopaddingL">
                <a class="reordenar"></a>
            </td>
        </tr>
<%
    countLinha++;
        }
    }
    else if (Model.Filtros.Count > 0)
    {
%>
        <tr class="vazio">
            <td colspan="8" class="txtLongoTabela">Nenhuma questão encontrada.</td>
        </tr>
<%
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="8" class="txtLongoTabela">Nenhuma questão selecionada.</td>    
        </tr>
<%
    }
%>
    </tbody>

    <%
        if (Model != null && Model.Linhas.Count > 0)
        {
            Html.RenderPartial("Pesquisa/PaginacaoProvaQuestao", Model.Paginacao);
        }%>
</table>
