<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaQuestaoAgendamento<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (QuestaoVOView linha in Model.Linhas)
        {
%>
        <tr class="<%=linha.BordaLastGrupo(Model.Linhas) %>">
            <td style="width: 5px; " class="bordaGrupo  <%=linha.BordaGrupo %> <%=linha.CorGrupo %>"></td>
            <td class="selecionar" style="width:30px;"><input type="checkbox" name="chkHidQuestao" value="<%=linha.Id %>" <%=Model.CheckQuestaoOculta(linha.Id) %> /></td>
            <td style="width:20px;">
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão ID {0}", linha.Id)) %>" rel="<%= Url.Action("CarregarTooltip","Questoes", new { @id = linha.Id.ToString() })%>"></a>
            </td>
            <td style="width:415px;">
                <a class="lnk tooltipextra">
                <%= (linha.TamanhoEnunciado == 0) ? ("<em class=\"semEnunciado\">" + linha.Enunciado + "</em>") : Html.Encode(linha.Enunciado)%>
                </a>
                <div class="todoConteudo hide"></div>
            </td>
             <td style="width:80px;"><%= linha.StrValorQuestao%></td>
             <td style="width:100px;"><%= Html.Encode(linha.Identificador)%></td>

        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="5">Nenhuma questao encontrada.</td>
        </tr>
<%
    }
%>
    </tbody>
</table>