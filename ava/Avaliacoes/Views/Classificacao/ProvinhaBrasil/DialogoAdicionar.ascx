<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


	<div id="dlgProvinhaBrasilAdicionar" title="Associar habilidades e competências" class="popup SEC02511 hide">
<%      using (Html.BeginForm("CarregarConteudoAdicionar", "ProvinhaBrasil", FormMethod.Post, new { @class = "tbl" }))
		{ %>
        <%=Html.ActionLink("Link Classificações questão", "ClassificacaoQuestao", "ProvinhaBrasil", new { @class = "hide linkClassificacaoQuestao" })%>
		<div class="popupConteudo">
			<p>Selecione as habilidades e competências:</p>
			<div class="tituloArvoreQuestao">
				<label>Habilidades e competências:</label>
			</div>
			<div class="conteudoAdicionarSelect boxArvoreScroll">
				
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a class="btnNav btnCancelar">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<!--a class="btnNav btnSalvar">Salvar</a-->
                <%=Html.ActionLink("Salvar", "RelacionarQuestao", "ProvinhaBrasil", new { @class = "btnNav btnSalvar" })%>
			</div>
		</div>
<%  } %>
	</div>

