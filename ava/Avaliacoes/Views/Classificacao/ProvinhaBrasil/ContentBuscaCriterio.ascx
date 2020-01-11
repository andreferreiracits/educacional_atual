<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%  using (Html.BeginForm("CarregarConteudoAdicionar", "ProvinhaBrasil", FormMethod.Post, new { @id = "frmCriterioProvinhaBrasil" }))
    { %>
    <div class="btnCriterioClassificacao">
        <a><div class="btnAddCriterio"><span>Provinha Brasil - Competências/habilidades</span></div></a>
    </div>
    <div class="ListaCriterio">
        <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.ProvinhaBrasil.Id, new { @id = "intTipoProvinhaBrasil" })%>
        <%=Html.ActionLink("Link Criterios Prova", "CriteriosProva", "ProvinhaBrasil", null, new { @class = "hide linkCriterioProva" })%>
        <div class="conteudoAdicionarSelect boxArvoreScroll">
				
        </div>
    </div>
<%} %>
