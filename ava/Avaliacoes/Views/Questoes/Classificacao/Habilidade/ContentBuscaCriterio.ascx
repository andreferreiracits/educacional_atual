<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%  using (Html.BeginForm("AdicionarHabilidade", "Questoes", FormMethod.Post, new { @id = "frmAdicionarHabilidade" }))
    { %>
    <div class="btnCriterioClassificacao">
        <a><div class="btnAddCriterio"><span>Competências/habilidades</span></div></a>
    </div>
    <div class="ListaCriterio">
        <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Habilidade.Id, new { @id = "intTipoHabilidade" })%>
        <div id="treeHabilidade" class="boxArvoreScroll">
				
        </div>
    </div>
<%} %>
