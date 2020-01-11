<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("AdicionarHabilidade", "Questoes", FormMethod.Post, new { @id = "frmAdicionarHabilidade", @class = "tbl" }))
{ %>
    <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Habilidade.Id, new { @id = "intTipoHabilidade" })%>

    <div id="treeHabilidade" class="boxArvoreScroll">
				
	</div> 

<% } %>
</div>
