<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("CarregarConteudoFiltro", "AreaAssuntoPesquisa", FormMethod.Post, new { @id = "frmAdicionarAssuntoPesquisaOpniao", @class = "tbl" }))
{ %>
    <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.AssuntoPesquisaOpniao.Id, new { @id = "intTipoAssuntoPesquisaOpniao" })%>
    <div class="conteudoFiltroSelect boxArvoreScroll">
				
	</div> 
<% } %>
</div>
