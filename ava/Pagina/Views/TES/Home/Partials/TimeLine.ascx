<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Pagina.Models.MensagemRapida>>" %>
<%
    bool bolPostUnicoMensagemExcluida = ViewData["bolPostUnicoMensagemExcluida"] == null ? false : (bool)ViewData["bolPostUnicoMensagemExcluida"];
    bool bolPossuiVerMais = ViewData["bolPossuiVerMais"] != null ? ((bool)ViewData["bolPossuiVerMais"]) : false;
    bool bolSemMensagemNoFiltroAtual = ViewData["SemMensagemNoFiltroAtual"] != null ? ((bool)ViewData["SemMensagemNoFiltroAtual"]) : false;
    
    if (Model != null)
    {
        foreach (var ms in Model)
            Html.RenderPartial("Partials/MensagemFeed", ms, ViewData);
    }    
    
    if(bolPossuiVerMais) { %>
    <footer class="blokletters" id="verMaisMensagens">
		<a class="" title="veja mais" href="javascript:void(0);">veja mais</a>
	</footer>
<% } %>
<%=Model.Count == 0 ? ((bolPostUnicoMensagemExcluida) ? "-2" : (bolSemMensagemNoFiltroAtual ? "-1" : "0")) : ""%>