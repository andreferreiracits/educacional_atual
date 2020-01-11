<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("AdicionarAssunto", "Questoes", FormMethod.Post, new { @id = "frmAdicionarAssunto", @class = "tbl" }))
{ %>
    <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Assunto.Id, new { @id = "intTipoAssunto" })%>
    <div id="treeAssunto" class="boxArvoreScroll">
				
	</div> 
<% } %>
</div>
