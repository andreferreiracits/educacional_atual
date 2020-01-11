<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("CarregarConteudoFiltro", "AreaAssunto", FormMethod.Post, new { @id = "frmAdicionarAreaAssunto", @class = "tbl" }))
{ %>
    <input type="hidden" name="intTipoClassificacao" value="<%=ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Assunto.Id %>" />
    <div class="conteudoFiltroSelect boxArvoreScroll">
				
	</div> 
<% } %>
</div>
