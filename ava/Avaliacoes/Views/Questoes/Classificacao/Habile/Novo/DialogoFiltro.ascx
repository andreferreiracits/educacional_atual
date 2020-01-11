<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


	<div id="dlgHabileFiltro" title="Filtrar por Habile" class="popup SEC02511 dlgFiltroClassificacao">
    <form class="tbl">
		<div class="popupConteudo">
			<p>Selecione:</p>
			<div class="tituloArvoreQuestao">
				<label>Habile:</label>
			</div>

				<% Html.RenderPartial("../Questoes/Classificacao/Habile/Habile"); %> 

		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarFiltroHabile" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnAdicionarFiltroHabile" class="btnNav">Filtro</a>
			</div>
		</div>
    </form>
	</div>


