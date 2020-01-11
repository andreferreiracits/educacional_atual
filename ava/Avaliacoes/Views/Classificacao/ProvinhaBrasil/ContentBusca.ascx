<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("CarregarConteudoFiltro", "ProvinhaBrasil", FormMethod.Post, new { @id = "frmAdicionarProvinhaBrasil", @class = "tbl" }))
{  %>
    <input type="hidden" name="intTipoClassificacao" value="<%=ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.ProvinhaBrasil.Id %>" />
    <div class="conteudoFiltroSelect boxArvoreScroll">
				
	</div> 
<% } %>
</div>
