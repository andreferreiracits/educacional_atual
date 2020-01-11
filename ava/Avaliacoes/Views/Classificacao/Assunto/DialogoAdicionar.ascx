<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div id="dlgAssunto" title="Associar áreas e assuntos" class="popup SEC02511 hide">
<%  using (Html.BeginForm("CarregarConteudoAdicionar", "AreaAssunto", FormMethod.Post, new {  @class = "tbl" }))
	{ %>
    <%=Html.ActionLink("Link Classificações questão", "ClassificacaoQuestao", "AreaAssunto", new { @class = "hide linkClassificacaoQuestao" })%>
    <%=Html.ActionLink("Link Classificações edição", "CarregarConteudoEdicao", "AreaAssunto", new { @class = "hide linkClassificacaoEdicao" })%>
    <%= Html.Hidden("hidEditarClassificacao", 0, new { @id = "hidEditarAssunto" })%>
		<div class="popupConteudo">
			<p class="instrucaoSelecionar">Selecione as Áreas e Assuntos:</p>
            <p class="instrucaoEditar">Editar as Áreas e Assuntos:</p>
			<div class="tituloArvoreQuestao">
				<label>Área e assunto:</label>
                <a class="btn direita btnEditarClassificacao">criar área e assunto|voltar à seleção</a>
			</div>
			<div class="conteudoAdicionarSelect boxArvoreScroll">
				
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a class="btnNav btnCancelar">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
                <%=Html.ActionLink("Salvar", "RelacionarQuestao", "AreaAssunto", new { @class = "btnNav btnSalvar" })%>
			</div>
		</div>
<%  } %>
</div>

