<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div id="dlgNivelEnsino" title="Associar nível de ensino" class="popup SEC02511">
<%  using (Html.BeginForm("AdicionarNivelEnsino", "Questoes", FormMethod.Post, new { @id = "frmAdicionarNivelEnsino", @class = "tbl" }))
	{ %>
        <%= Html.Hidden("hidEditarClassificacao", 0, new { @id = "hidEditarNivelEnsino" })%>
		<%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.NivelEnsino.Id, new { @id = "intTipoNivelEnsino" })%>
		<div class="popupConteudo">
			<p class="instrucaoSelecionar">Selecione o nível de ensino:</p>
            <p class="instrucaoEditar">Editar o nível de ensino:</p>
			<div class="tituloArvoreQuestao">
				<label>Nível de ensino:</label>
                <a class="btn direita btnEditarClassificacao">editar|voltar seleção</a>
			</div>
			<div id="treeNivelEnsino" class="boxArvoreScroll">
				
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarNivelEnsino" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnFiltroNivelEnsino" class="btnNav btnExtra">Filtro</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnSalvarNivelEnsino" class="btnNav">Salvar</a>
			</div>
		</div>
<%  } %>
</div>

