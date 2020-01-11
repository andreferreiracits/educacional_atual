<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<table>
    <tr>
    <td colspan="3" class="questaoEnunciado"><%=UtilView.ResolvePathImgPrint(Model.Enunciado.Texto.TextoView)%></td>
    </tr>
    <tr>
    <td colspan="3"></td>
    </tr>
    <%

    if (Model.Alternativas.Count > 0)
    {
        int contagem = 1;
	    foreach (AlternativaView alternativa in Model.Alternativas)
	    {
     %>
	    <tr>
            <td class="alternativaMargin"> </td>
            <td class="alternativaLetra"><%= contagem %>)</td>
		    <td class="alternativaConteudo">
			    <%= UtilView.ResolvePathImgPrint(alternativa.Texto.TextoView)%>
		    </td>
	    </tr>
    <%
        contagem *= 2;
	    }
    }
    %>
    <tr>
       <td class="alternativaMargin"> </td>
       <td class="alternativaSoma" colspan="2">Soma: <img src="<%=UtilView.UrlPrint(Request) + "/Content/imgcss/1.0.2/print-soma.gif"%>" /></td>
    </tr>
</table>
