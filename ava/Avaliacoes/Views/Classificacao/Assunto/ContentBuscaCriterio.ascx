<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%  using (Html.BeginForm("CarregarConteudoAdicionarCriterio", "AreaAssunto", FormMethod.Post, new { @id = "frmCriterioAssunto" }))
    { %>
    <div class="btnCriterioClassificacao">
        <a><div class="btnAddCriterio"><span>Áreas/assuntos</span></div></a>
    </div>
    <div class="ListaCriterio">
        <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Assunto.Id, new { @id = "intTipoAssunto" })%>
        <%=Html.ActionLink("Link Criterios Prova", "CriteriosProva", "AreaAssunto", null, new { @class = "hide linkCriterioProva" })%>
        <div class="conteudoAdicionarSelect boxArvoreScroll">
				
        </div>
    </div>
<%} %>
