<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%  using (Html.BeginForm("AdicionarNivelEnsino", "Questoes", FormMethod.Post, new { @id = "frmAdicionarNivelEnsino" }))
    { %>
    <div class="btnCriterioClassificacao">
        <a><div class="btnAddCriterio"><span>Nível de ensino</span></div></a>
    </div>
    <div class="ListaCriterio">
        <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.NivelEnsino.Id, new { @id = "intTipoNivelEnsino" })%>
        <div id="treeNivelEnsino" class="boxArvoreScroll">
				
        </div>
    </div>
<%} %>
