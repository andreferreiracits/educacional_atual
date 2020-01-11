<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div id="dlgNivelEnsino" title="Associar nível de ensino" class="popup SEC02511 hide">
<%  using (Html.BeginForm("CarregarConteudoAdicionar", "NivelEnsino", FormMethod.Post, new {  @class = "tbl" }))
	{ %>
    <%=Html.ActionLink("Link Classificações questão", "ClassificacaoQuestao", "NivelEnsino", new { @class = "hide linkClassificacaoQuestao" })%>
    <%=Html.ActionLink("Link Classificações edição", "CarregarConteudoEdicao", "NivelEnsino", new { @class = "hide linkClassificacaoEdicao" })%>
    <%= Html.Hidden("hidEditarClassificacao", 0, new { @id = "hidEditarNivelEnsino" })%>
		<div class="popupConteudo">
			<p class="instrucaoSelecionar">Selecione o nível de ensino:</p>
            <p class="instrucaoEditar">Editar nível de ensino:</p>
			<div class="tituloArvoreQuestao">
				<label>Nível de ensino:</label>
                <a class="btn direita btnEditarClassificacao">editar|voltar seleção</a>
			</div>
			<div class="conteudoAdicionarSelect boxArvoreScroll">
				
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a class="btnNav btnCancelar">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
                <%=Html.ActionLink("Salvar", "RelacionarQuestao", "NivelEnsino", new { @class = "btnNav btnSalvar" })%>
			</div>
		</div>
<%  } %>
</div>

