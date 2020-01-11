<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Turma.Models.MensagemRapida>>" %>
<%
    if (Model != null)
    {
        foreach (var ms in Model)
        {
            switch (ms.IdFerramentaTipo)
            { 
                case 19:
                case 17:
                    Html.RenderPartial("Partials/MensagemFeedTarefa", ms, ViewData);
                    break;
                default:
                    Html.RenderPartial("Partials/MensagemFeed", ms, ViewData);
                    break;
            }
        }
    }

    bool bolPossuiVerMais = ViewData["bolPossuiVerMais"] != null ? ((bool)ViewData["bolPossuiVerMais"]) : false;
    bool bolSemMensagemNoFiltroAtual = ViewData["SemMensagemNoFiltroAtual"] != null ? ((bool)ViewData["SemMensagemNoFiltroAtual"]) : false;
    bool bolPostUnicoExcluido = ViewData["bolPostUnicoExcluido"] != null ? (bool)ViewData["bolPostUnicoExcluido"] : false;
%>
<% if(bolPossuiVerMais) { %>
    <footer class="mural_footer" id="verMaisMensagens">
		<a class="mural_footer" title="veja mais" href="javascript:void(0);">veja mais</a>
	</footer>
<% } %>
<%=Model.Count == 0 ? ((bolPostUnicoExcluido) ? "-2" : (bolSemMensagemNoFiltroAtual ? "-1" : "0")) : ""%>