<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        int countLinha = 0;
        foreach (QuestaoVOView linha in Model.Linhas)
        {
%>
        <tr id="linha_<%=countLinha%>" class="<%=linha.BordaLastGrupo(Model.Linhas) %>">
            <td style="width: 5px; " class="bordaGrupo  <%=linha.BordaGrupo %> <%=linha.CorGrupo %>"></td>
            <td class="selecionar" style="width:30px;"><input type="checkbox" name="chkHidQuestao" value="<%=linha.Id %>" checked="checked" /></td>
            <td style="width:15px" class="nopaddingR">
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão ID {0}", linha.Id)) %>" rel="<%= Url.Action("CarregarTooltip","Questoes", new { @id = linha.Id.ToString() })%>"></a>
            </td>
            <td style="width:680px;">
                <a class="lnk tooltipextra">
                <%= (linha.TamanhoEnunciado == 0) ? ("<em class=\"semEnunciado\">" + linha.Enunciado + "</em>") : Html.Encode(linha.Enunciado)%>
                </a>
                <div class="todoConteudo hide"></div>
            </td>
        </tr>
<%
    countLinha++;
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="4">Nenhuma questao encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
</table>