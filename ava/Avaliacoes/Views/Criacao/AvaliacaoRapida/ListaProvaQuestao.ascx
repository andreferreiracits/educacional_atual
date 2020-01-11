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
        <tr id="linha_<%=countLinha%>" class="<%=linha.BordaLastGrupo(Model.Linhas) %>">
            <td style="width: 5px; " class="bordaGrupo  <%=linha.BordaGrupo %> <%=linha.CorGrupo %>"></td>
            <td class="selecionar" style="width: 20px;">
                <%= Html.Hidden("Id", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkQuestao.Checked", false)%>
            </td>
            <td class="nopaddingR"> <!--style="width:15px"--> 
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão ID {0}", linha.Id)) %>" rel="<%= Url.Action("CarregarTooltip","Questoes", new { @id = linha.Id.ToString() })%>"></a>
            </td>
            <td  style="width:350px">
                <a class="lnk tooltipextra">
                    <%= Html.Encode(linha.Enunciado) %>
                </a>
                <div class="botoes">
                    <% if (linha.PermissaoAlterarEstrutura)
                       {  %>
                            <a class="btn btnExcluirQuestao funcao" href="javascript:void(0)">Remover</a>
                    <% } %>
                </div>
            </td>
            <td class="valorQuestao"  style="width:70px">
                <input type="text" name="Valor" class="txt centro" size="5" value="<%=linha.StrValorQuestao %>" <%=linha.ReadOnly %> <%=linha.Disabled %> />
            </td>
            <td  style="width:110px">
                <span><%= Html.Encode(linha.Identificador)%></span>
            </td>
            <td  style="width:120px">
                <%= Html.Encode(linha.Tipo.ToString()) %>
            </td>
            <td style="width:25px">
                <input type="hidden" id="hidPosicao_<%=linha.Id %>" name="hidPosicao" value="<%=linha.NrQuestao %>" />
                <input type="text" id="txtPosicao_<%=linha.Id %>" name="Posicao" class="txt" size="3" value="<%=linha.NrQuestao %>" />
            </td>
            <td style="width:15px;" class="nopaddingL">
                <a class="reordenar "></a>
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
            <td colspan="9" class="txtLongoTabela">Nenhuma questão selecionada por enquanto.</td>
        </tr>
<%
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="9" class="txtLongoTabela">Nenhuma questão selecionada por enquanto.</td>
        </tr>
<%
    }
%>
    </tbody>

    <%
        if (Model != null && Model.Linhas.Count > 0)
        {
            Html.RenderPartial("PaginacaoProvaQuestao", Model.Paginacao);
        }%>
</table>
