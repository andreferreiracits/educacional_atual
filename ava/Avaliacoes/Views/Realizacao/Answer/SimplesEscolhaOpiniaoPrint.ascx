<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.SimplesEscolhaOpiniaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

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
            <td class="alternativaMargin" style="vertical-align: top;">
            </td>
            <td class="alternativaMarc">
                <% if (Model.EstiloAlternativaSelecionada(alternativa.Id) == "marcado")
                   {%>
                <img src="data:image/gif;base64,R0lGODlhFAAUAOYAAOTk5BISEnh4eFRUVMzMzO3t7QYGBgwMDLS0tCcnJ8DAwDk5OSQkJMPDwz8/P05OTjMzM3t7e2ZmZmBgYIeHhzw8PAMDA9LS0o2NjdjY2JOTkxsbG8bGxq6urvPz84SEhPn5+YGBgWNjY6urq0hISOrq6gkJCbe3t+fn5zY2Nt7e3r29vWlpaVFRUS0tLURERLGxsQ8PD3JyciEhIaWlpfz8/Lq6usnJyaioqNvb22xsbEpKSuzs7H5+fhUVFRgYGO7u7paWlnV1dZCQkPb29hcXF4qKitXV1UJCQh4eHv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAUABQAAAf7gEqCgzQDRUtLByQYg42DCg6IkpIuHY6CI4gJQSiCHh0ViBOOmUsRNUogBAQlghgmSxKDJT9LQ0oFLAeSD0dKHBZLDYIiSy1KAAyTiAcrSgJLSIIJSxlKkcuIAQUgyg0cSwtKDdmTIc9LFBpLOko95ZLiCEs7EUsfShLwiElKN0spjCwRgm6fOBtLXpxYQkLJin1LzlFYIsDDEgOdsGXbpgTCEgRKBixhgYzashgKlMxLIejCEgswlBCREQCRgQEAkPlIN0ifCRyDVFwYdGLDkgGOJiB6kHJQjmJLHgC5pMHokgAQIMywie+SoAIRQkliMMGaV0c8Vqk4GwgAOw==" alt="print-escolha-marcada" />
                <% }
                   else
                   {
                   %>
                <img src="data:image/gif;base64,R0lGODlhGAAYAOYAALS0tHt7e3h4eIeHh2BgYDMzM1RUVBsbGyQkJGZmZkhISAYGBoSEhK6urjY2NmNjY/Pz8zw8PMzMzMbGxpOTk6urq9jY2Ofn505OTsPDw8DAwAMDA7e3tycnJ42NjQkJCd7e3uzs7BUVFRgYGAwMDHV1de7u7i0tLfn5+aWlpZCQkDk5OcnJybq6uhcXFyEhIRISEmlpae3t7ZaWlkJCQrGxseTk5Pz8/Nvb20REROrq6j8/P0pKStLS0qioqFFRUYqKimxsbAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAYABgAAAfMgEOCg4SFhoeIiYpDKQYuQkIkCh6Lgxo7kJmZJw2LFZAdMxeCEA0RkASJn0IBN4ceH0IJhzojQiqKExtCGYYPQj+VAkI0hh1CFpUoCLyEE0IrlYLDA4QUQkHSQwBCPIQBQgzaLEIOhEBCJdotQjmEHEIK2gNCAoQQQgujlQVCAIUGhMSoxM1coR5CNtRQZEOEkGqGEgj54AMRhwNCDCQiAAmDBkI4fgnBYEIRBYxCYBQo8ALSAnGVZAQ4lQkBgWTaBIWQIAFEzp9AFQUCADs=" alt="print-escolha" />
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