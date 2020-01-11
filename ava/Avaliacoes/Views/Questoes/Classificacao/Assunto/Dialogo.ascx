<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div id="dlgAssunto" title="Associar áreas e assuntos" class="popup SEC02511">
<%  using (Html.BeginForm("AdicionarAssunto", "Questoes", FormMethod.Post, new { @id = "frmAdicionarAssunto", @class = "tbl" }))
	{ %>
        <%= Html.Hidden("hidEditarClassificacao", 0, new { @id = "hidEditarAssunto" })%>
		<%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.Assunto.Id, new { @id = "intTipoAssunto" })%>
		<div class="popupConteudo">
			<p class="instrucaoSelecionar">Selecione as Áreas e Assuntos para o curso:</p>
            <p class="instrucaoEditar">Editar as Áreas e Assuntos para o curso:</p>
			<div class="tituloArvoreQuestao">
				<label>Área e assunto:</label>
                <a class="btn direita btnEditarClassificacao">editar|voltar seleção</a>
			</div>
			<div id="treeAssunto" class="boxArvoreScroll">
				
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarAssunto" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnFiltroAssunto" class="btnNav btnExtra">Filtro</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnSalvarAssunto" class="btnNav">Salvar</a>
			</div>
		</div>
<%  } %>
</div>

