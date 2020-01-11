<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<int>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


	<div id="dlgHabilidadesFiltro" title="Filtrar por habilidades e competências" class="popup SEC02511 dlgFiltroClassificacao">
    <form class="tbl formClassificacaoFiltro">
        <% foreach(int i in Model){ %>
            <input type="hidden" class="notsend" name="bancoPertence" value="<%=i %>" />
        <% } %>
		<div class="popupConteudo">
			<p>Selecione as habilidades e competências:</p>
			<div class="tituloArvoreQuestao">
				<label>Habilidades e competências:</label>
			</div>
			<div class="arvoreFiltroSelect boxArvoreScroll">
				
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarFiltroHabilidade" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnAdicionarFiltroHabilidade" class="btnNav">Filtro</a>
			</div>
		</div>
    </form>
	</div>

