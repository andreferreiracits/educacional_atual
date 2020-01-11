<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<table>
    <tr>
    <td colspan="4" class="questaoEnunciado"><%=UtilView.ResolvePathImgPrint(Model.Enunciado.Texto.TextoView)%></td>
    </tr>
    <tr>
    <td colspan="4"></td>
    </tr>
    <%

    if (Model.Alternativas.Count > 0)
    {
	    foreach (AlternativaView alternativa in Model.Alternativas)
	    {
     %>
	    <tr>
            <td class="alternativaMargin"> </td>
            <td class="alternativaMarc"><img src="data:image/gif;base64,R0lGODlhFwAZALMAAP7+/nV1dQUFBQICAgMDAwwMDAcHBw4ODvz8/Pj4+AsLCwkJCSIiIgEBAQAAAP///yH5BAAAAAAALAAAAAAXABkAAARr8MlJq6XB6c27DlNmOA3ZnGijbMQAPoNzzZJWy/RlP3teaQAezkfZLYZEiQBXShYdwabzFkUmgQ/pFKt1cq3E75SaBfuwsbFQ0r3ilmpNYj3WIOjTA65gzmEzJEseGgOCBAwvD4CDjIlqFREAOw==" alt="print-escolhasquare" /></td>
            <td class="alternativaLetra"><%= alternativa.Letra %>)</td>
		    <td class="alternativaConteudo">
			    <%= UtilView.ResolvePathImgPrint(alternativa.Texto.TextoView)%>
		    </td>
	    </tr>
    <%
	    }
    }
    %>
</table>
