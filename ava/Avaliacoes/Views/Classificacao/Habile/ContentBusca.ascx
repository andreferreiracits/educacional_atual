<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="divBuscaAvancadaPasso">
<%  using (Html.BeginForm("AdicionarHabile", "Habile", FormMethod.Post, new { @id = "frmAdicionarHabile", @class = "tbl" }))
{ %>
    <%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Habile.Id, new { @id = "intTipoHabile" })%>
    <% Html.RenderPartial("../Questoes/Classificacao/Habile/SPE"); %> 
    
    <!--div class="conteudoFiltroSelect boxArvoreScroll">
				
	</div-->
<% } %>
</div>
