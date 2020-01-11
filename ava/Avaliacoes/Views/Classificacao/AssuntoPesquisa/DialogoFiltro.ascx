<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<int>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


<div id="dlgAssuntoPesquisaOpniaoFiltro" title="Filtrar categorias de pesquisa" class="popup SEC02511 dlgFiltroClassificacao">
<%
    using (Html.BeginForm("CarregarConteudoFiltro", "AreaAssuntoPesquisa", FormMethod.Post, new { @class = "tbl formClassificacaoFiltro" }))
    { %>
    <% foreach (int i in Model)
       { %>
        <input type="hidden" class="notsend" name="bancoPertence" value="<%=i %>" />
    <% } %>
	<div class="popupConteudo">
		<p>Selecione as categorias e tipos:</p>
		<div class="tituloArvoreQuestao">
			<label>Categorias e tipos:</label>
		</div>
		<div class="conteudoFiltroSelect boxArvoreScroll">
				
		</div> 
	</div>
	<div class="popupBotoes">
		<div class="btnEspacamento">
			<a class="btnNav btnCancelar">Cancelar</a>
		</div>
		<div class="btnEspacamento direita">
			<a class="btnNav btnFiltro">Filtro</a>
		</div>
	</div>
<%} %>
</div>

