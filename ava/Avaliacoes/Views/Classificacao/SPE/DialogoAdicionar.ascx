<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


	<div id="dlgSPEAdicionar" title="Associar SPE" class="popup SEC02511 hide">
<%      using (Html.BeginForm("CarregarConteudoAdicionar", "SPE", FormMethod.Post, new { @class = "tbl" }))
		{ %>
        <%=Html.ActionLink("Link Classificações questão", "ClassificacaoQuestao", "SPE", new { @class = "hide linkClassificacaoQuestao" })%>
		<div class="popupConteudo">
			<p id='spe_top_message'>Selecione:</p>
			<div class="tituloArvoreQuestao">
				<label>Sistema Positivo de Ensino:</label>
			</div>
			<div class="conteudoAdicionarSelect boxArvoreScroll">
				<% Html.RenderPartial("../Classificacao/SPE/ConteudoSPE"); %>
			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a class="btnNav btnCancelar">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<!--a class="btnNav btnSalvar">Salvar</a-->
                <%=Html.ActionLink("Salvar", "RelacionarQuestao", "Salvar", new { @class = "btnNav btnSalvar" })%>
			</div>
		</div>
<%  } %>
	</div>

