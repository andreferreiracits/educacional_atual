<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.QuestaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<%
    if (Model != null &&  Model.Count > 0)
    { %>
<table width="100%" cellspacing="0" class="tblQuestaoPaiRelacionada">
    <thead>
        <tr>
            <th>Questões relacionadas:</th>
            <th width="10%">Identificador:</th>
        </tr>
    </thead>
    <tbody>
<%
        int cont = 0;
        foreach (QuestaoVOView linha in Model)
        {
            
%>
        <tr class="<%=cont%2 == 0 ? "linhaum":"linhadois" %>">
            <td>
                <%= (linha.TamanhoEnunciado == 0) ? ("<em class=\"semEnunciado\">" + linha.Enunciado + "</em>") : Html.Encode(linha.Enunciado)%>
            </td>
            <td><%= Html.Encode(linha.Identificador)%></td>
        </tr>


<%
            cont++;
        }
%>
    
    </tbody>
</table>
<%
        }
%>