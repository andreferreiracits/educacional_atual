<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%  using (Html.BeginForm("AdicionarAssunto", "Questoes", FormMethod.Post, new { @id = "frmAdicionarAssunto" }))
    { %>
    <div class="btnCriterioClassificacao">
        <a><div class="btnAddCriterio"><span>Áreas/assuntos</span></div></a>
    </div>
    <div class="ListaCriterio">
        <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Assunto.Id, new { @id = "intTipoAssunto" })%>
        <div id="treeAssunto" class="boxArvoreScroll">
				
        </div>
    </div>
<%} %>
