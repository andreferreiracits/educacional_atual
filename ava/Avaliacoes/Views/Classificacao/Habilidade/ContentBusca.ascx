<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("CarregarConteudoFiltro", "HabilidadeCompetencia", FormMethod.Post, new { @id = "frmAdicionarHabilidade", @class = "tbl" }))
{  %>
    <input type="hidden" name="intTipoClassificacao" value="<%=ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Habilidade.Id %>" />
    <div class="conteudoFiltroSelect boxArvoreScroll">
				
	</div> 
<% } %>
</div>
