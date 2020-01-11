<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("AdicionarNivelEnsino", "Questoes", FormMethod.Post, new { @id = "frmAdicionarNivelEnsino", @class = "tbl" }))
{ %>
    <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.NivelEnsino.Id, new { @id = "intTipoNivelEnsino" })%>
    <div id="treeNivelEnsino" class="boxArvoreScroll">
				
	</div> 
<% } %>
</div>
