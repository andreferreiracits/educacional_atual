<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


	<div id="dlgHabilidades" title="Associar habilidades e competências" class="popup SEC02511">
<%      using (Html.BeginForm("AdicionarHabilidade", "Questoes", FormMethod.Post, new { @id = "frmAdicionarHabilidade", @class = "tbl" }))
		{ %>
		<%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Habilidade.Id, new { @id = "intTipoHabilidade" })%>
		<div class="popupConteudo">
			<p>Selecione as habilidades e competências:</p>
			<div class="tituloArvoreQuestao">
				<label>Habilidades e competências:</label>
			</div>
			<div id="treeHabilidade" class="boxArvoreScroll">
				
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarHabilidade" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnFiltroHabilidade" class="btnNav">Filtro</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnSalvarHabilidade" class="btnNav">Salvar</a>
			</div>
		</div>
<%  } %>
	</div>

