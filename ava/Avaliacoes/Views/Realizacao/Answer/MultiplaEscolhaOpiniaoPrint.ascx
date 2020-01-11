<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.MultiplaEscolhaOpiniaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<table>
    <tr>
    <td colspan="4" class="questaoEnunciado"><%=UtilView.ResolvePathImgPrint(Model.Questao.Questao.Enunciado.TextoView)%></td>
    </tr>
    <tr>
    <td colspan="4"></td>
    </tr>
    <%

    if (Model.Alternativas.Count > 0)
    {
        Model.IniciaLetra();
        foreach (Alternativa alternativa in Model.Alternativas)
	    {
     %>
	    <tr>
            <td class="alternativaMargin"  style="vertical-align: top;">
            </td>
            <td class="alternativaMarc">
            <% if (Model.EstiloAlternativaSelecionada(alternativa.Id) == "marcado")
               { %>
                <img src="data:image/gif;base64,R0lGODlhFwAZAMQAAP7+/nV1dSIiIu7u7ru7u3d3dxEREQUFBQICAqqqqoiIiGZmZgMDA0RERPz8/JmZmTMzM8zMzFVVVQwMDA4ODgsLCwcHB/j4+AkJCd3d3QEBAQAAAP///wAAAAAAAAAAACH5BAAAAAAALAAAAAAXABkAAAWuICeOZGmSwaaubKsGY2ptGq3duFatDAJziM1pKFIVhcSTkbNMllQAJtJJWmKmClVDFFEZBqMDskYSqBIciOpR3UTJI4JKkN1s2++paMEyZJ5uHHAjAwYrCiZQgnp7K0qBgyJyKwWJkHoDZhuGGwSAeSQFKgWTAmAjikFxc2CiGxJtInCZZyK0G2hHImJUgBdSvW0OwMEiFEgTjFSKKTRiLioIzwwCPxzN0NnWxSchADs=" alt="print-marcadisc" />
            <% }
               else
               {
                   %>
                   <img src="data:image/gif;base64,R0lGODlhFwAZALMAAP7+/nV1dQUFBQICAgMDAwwMDAcHBw4ODvz8/Pj4+AsLCwkJCSIiIgEBAQAAAP///yH5BAAAAAAALAAAAAAXABkAAARr8MlJq6XB6c27DlNmOA3ZnGijbMQAPoNzzZJWy/RlP3teaQAezkfZLYZEiQBXShYdwabzFkUmgQ/pFKt1cq3E75SaBfuwsbFQ0r3ilmpNYj3WIOjTA65gzmEzJEseGgOCBAwvD4CDjIlqFREAOw==" alt="print-escolhasquare" />
                   <%
               } %>
            </td>
            <td class="alternativaLetra"><%= Model.Letra%>)</td>
		    <td class="alternativaConteudo">
			    <%= UtilView.ResolvePathImgPrint(alternativa.Texto.TextoView)%>
		    </td>
	    </tr>
        
    <%
            Model.ProximaLetra();
	    }
    }
    %>

</table>
