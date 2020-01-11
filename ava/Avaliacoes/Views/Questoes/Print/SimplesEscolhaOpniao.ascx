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
            <td class="alternativaMarc"><img src="data:image/gif;base64,R0lGODlhGAAYAOYAALS0tHt7e3h4eIeHh2BgYDMzM1RUVBsbGyQkJGZmZkhISAYGBoSEhK6urjY2NmNjY/Pz8zw8PMzMzMbGxpOTk6urq9jY2Ofn505OTsPDw8DAwAMDA7e3tycnJ42NjQkJCd7e3uzs7BUVFRgYGAwMDHV1de7u7i0tLfn5+aWlpZCQkDk5OcnJybq6uhcXFyEhIRISEmlpae3t7ZaWlkJCQrGxseTk5Pz8/Nvb20REROrq6j8/P0pKStLS0qioqFFRUYqKimxsbAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAYABgAAAfMgEOCg4SFhoeIiYpDKQYuQkIkCh6Lgxo7kJmZJw2LFZAdMxeCEA0RkASJn0IBN4ceH0IJhzojQiqKExtCGYYPQj+VAkI0hh1CFpUoCLyEE0IrlYLDA4QUQkHSQwBCPIQBQgzaLEIOhEBCJdotQjmEHEIK2gNCAoQQQgujlQVCAIUGhMSoxM1coR5CNtRQZEOEkGqGEgj54AMRhwNCDCQiAAmDBkI4fgnBYEIRBYxCYBQo8ALSAnGVZAQ4lQkBgWTaBIWQIAFEzp9AFQUCADs=" alt="print-escolha"  /></td>
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