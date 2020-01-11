<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%  using (Html.BeginForm("CarregarConteudoAdicionar", "NivelEnsino", FormMethod.Post, new { @id = "frmCriterioNivelEnsino" }))
    { %>
    <div class="btnCriterioClassificacao">
        <a><div class="btnAddCriterio"><span>Nível de ensino</span></div></a>
    </div>
    <div class="ListaCriterio">
        <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.NivelEnsino.Id, new { @id = "intTipoNivelEnsino" })%>
        <%=Html.ActionLink("Link Criterios Prova", "CriteriosProva", "NivelEnsino", null, new { @class = "hide linkCriterioProva" })%>
        <div class="conteudoAdicionarSelect boxArvoreScroll">
				
        </div>
    </div>
<%} %>
