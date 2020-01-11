<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%  using (Html.BeginForm("CarregarConteudoAdicionar", "HabilidadeCompetencia", FormMethod.Post, new { @id = "frmCriterioHabilidade" }))
    { %>
    <div class="btnCriterioClassificacao">
        <a><div class="btnAddCriterio"><span>Competências/habilidades</span></div></a>
    </div>
    <div class="ListaCriterio">
        <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Habilidade.Id, new { @id = "intTipoHabilidade" })%>
        <%=Html.ActionLink("Link Criterios Prova", "CriteriosProva", "HabilidadeCompetencia", null, new { @class = "hide linkCriterioProva" })%>
        <div class="conteudoAdicionarSelect boxArvoreScroll">
				
        </div>
    </div>
<%} %>
