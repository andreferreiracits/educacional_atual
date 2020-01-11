<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("CarregarConteudoFiltro", "NivelEnsino", FormMethod.Post, new { @id = "frmAdicionarNivelEnsino", @class = "tbl" }))
{ %>
    <input type="hidden" name="intTipoClassificacao" value="<%=ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.NivelEnsino.Id %>" />
    <div class="conteudoFiltroSelect boxArvoreScroll">
				
	</div> 
<% } %>
</div>
