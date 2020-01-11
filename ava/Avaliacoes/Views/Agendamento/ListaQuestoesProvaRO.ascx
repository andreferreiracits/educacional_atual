<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaQuestaoAgendamento<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (QuestaoVOView linha in Model.Linhas)
        {
            //verifica se a questão está oculta
            if (!Model.isOculta(linha.Id))
            { 
%>
        <tr class="<%=linha.BordaLastGrupo(Model.Linhas) %>">
            <td style="width: 5px; " class="bordaGrupo  <%=linha.BordaGrupo %> <%=linha.CorGrupo %>"></td>
            <td style="width:20px;">
                <a class="tooltip" title="<%= Html.Encode(String.Format("Questão ID {0}", linha.Id)) %>" rel="<%= Url.Action("CarregarTooltip","Questoes", new { @id = linha.Id.ToString() })%>"></a>
            </td>
             <td style="width:445px;">
                <input type="hidden" name="chkHidQuestao" value="<%=linha.Id %>" <%=Model.CheckQuestaoOculta(linha.Id) %> />
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