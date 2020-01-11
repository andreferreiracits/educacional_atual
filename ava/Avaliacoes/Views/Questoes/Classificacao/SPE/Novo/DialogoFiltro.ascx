<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


	<div id="dlgSPEFiltro" title="Filtrar por SPE" class="popup SEC02511 dlgFiltroClassificacao">
    <form class="tbl">
		<div class="popupConteudo">
			<p>Selecione:</p>
			<div class="tituloArvoreQuestao">
				<label>SPE:</label>
			</div>

				<% Html.RenderPartial("../Questoes/Classificacao/SPE/SPE"); %> 

		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarFiltroSPE" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnAdicionarFiltroSPE" class="btnNav">Filtro</a>
			</div>
		</div>
    </form>
	</div>

