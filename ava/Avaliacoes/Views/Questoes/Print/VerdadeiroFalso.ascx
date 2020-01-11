<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<table>
    <tr>
    <td colspan="5" class="questaoEnunciado"><%=UtilView.ResolvePathImgPrint(Model.Enunciado.Texto.TextoView)%></td>
    </tr>
    <tr>
    <td colspan="5"></td>
    </tr>
    <%

    if (Model.Alternativas.Count > 0)
    {
	    foreach (AlternativaView alternativa in Model.Alternativas)
	    {
     %>
	    <tr>
            <td class="alternativaMargin"> </td>
            <td class="alternativaMarc"><img src="data:image/gif;base64,R0lGODlhGAAYAOYAABEREWNjY4iIiDMzM9jY2Pz8/CIiIicnJz8/PwYGBpmZmfb29qurq6qqqt3d3VdXV6ioqEJCQpCQkNzc3EVFRcnJyQ8PD8DAwAwMDOTk5ERERLS0tISEhMzMzCoqKgkJCbe3t9LS0jY2Nru7u+7u7iQkJKKiovX19RUVFVRUVDAwML29vfT09A4ODmlpad7e3mxsbNvb22BgYBoaGpaWlu/v7z4+PvDw8EpKSnt7e0tLS1paWgMDA+3t7Wtra6WlpYeHh11dXeHh4c/Pzy0tLdXV1ZOTk9bW1mZmZgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAYABgAAAf/gEqCg4SFhoeIiYqCNSsKEDGLhhIISZaWBwEEkhOVSRYRSA8llgkSikcoSR4MBYQEAZYyiCSkKQuIDB9Jp4YPSRSuiQyfQoUhSRgZSg5JBoMjSUiCO0kwhTlJLoMDSQ6CSEkNgkNJKoU2SReDAkkCggYAhAdJm4MzScuCzRpK0dODdCTZQAhAkh6EBgAg0W7coF8QCHlIUoRQOwXxClVaNygcDUIdkmiQRmjBrhOEfiQZIAyeJYeCFAAzJCIJB4tJ5A16gSGJCUMgkiSokGhBhCRBEMVKwKHloAr0DrBIFGulkQ43QmwIwCNJhAmLQNS8RBagJCUQfAxoQQQHEHtnBePKlRQIADs=" alt="print-verdadeiro" /></td>
            <td class="alternativaMarc"><img src="data:image/gif;base64,R0lGODlhGAAYAOYAACQkJLGxsfb29kVFRcPDw2ZmZszMzE5OTjk5OTAwMOTk5AkJCe7u7hsbG0tLSzMzM3h4eLS0tDw8PBUVFYqKiubm5t7e3paWlhgYGKWlpXt7e/Dw8CEhIW9vb7e3ty0tLejo6M/Pzx4eHsDAwFdXV5mZmVlZWZCQkPj4+JycnEJCQqurqw8PD/X19cbGxgwMDNXV1V1dXXV1dSoqKlNTU3Jycurq6unp6a6uroeHh3d3d4SEhFFRUQMDA/n5+Ts7O42Nje3t7QYGBtvb25+fn8nJyREREQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAYABgAAAfggEiCg4SFhoeIiYqDFRElAQqLhhoSR5aWCDICkgQflhgOBQcNlgABigSWEiOFLgOWp4dFlhCJFJYehypHNYs7RwiGKUcAPoNGl5YMgglHFIUHR0SERkaHAUcDhchB1NaGAkJHKIM3RxPb34YAR0ODFkcc28k6hM0hgy1HC+mIGEcVCP04QsDbIRhHZhSCcCSGQUMdjhQoZOHFkQjH1A0i0OOIAUM5jjSIhMgGu4mHorHIcAjHhGyJGJCwNCCDAQEGVjiwxAPEogvsklkSAUSSIAEXTDxY8IDGiQ1Go0o1GggAOw==" alt="print-falso" /></td>
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
