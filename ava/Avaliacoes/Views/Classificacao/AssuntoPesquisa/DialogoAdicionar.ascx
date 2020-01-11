<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>


	<div id="dlgAssuntoPesquisaAdicionar" title="Associar áreas e assuntos" class="popup SEC02511 hide">
<%      using (Html.BeginForm("CarregarConteudoAdicionar", "AreaAssuntoPesquisa", FormMethod.Post, new { @class = "tbl" }))
		{ %>
        <%=Html.ActionLink("Link Classificações questão", "ClassificacaoQuestao", "AreaAssuntoPesquisa", new { @class = "hide linkClassificacaoQuestao" })%>
        <%=Html.ActionLink("Link Classificações edição", "CarregarConteudoEdicao", "AreaAssuntoPesquisa", new { @class = "hide linkClassificacaoEdicao" })%>
        <%= Html.Hidden("hidEditarClassificacao", 0, new { @id = "hidEditarPesquisa" })%>
		<div class="popupConteudo">
			<p>Organize suas questões para pesquisa de opinião classificando-as em categorias e tipos</p>
			<div class="tituloArvoreQuestao">
				<label>Área e assunto:</label>
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
				<!--a class="btnNav btnSalvar">Salvar</a-->
                <%=Html.ActionLink("Salvar", "RelacionarQuestao", "AreaAssuntoPesquisa", new { @class = "btnNav btnSalvar" })%>
			</div>
		</div>
<%  } %>
	</div>

