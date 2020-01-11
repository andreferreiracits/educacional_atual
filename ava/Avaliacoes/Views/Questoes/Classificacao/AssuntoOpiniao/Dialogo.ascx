<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div id="dlgAssuntoPesquisaOpniao" title="Associar áreas e assuntos" class="popup SEC02511">
<%  using (Html.BeginForm("AdicionarAssunto", "Questoes", FormMethod.Post, new { @id = "frmAdicionarAssuntoPesquisaOpniao", @class = "tbl" }))
	{ %>
        <%= Html.Hidden("hidEditarClassificacao", 0, new { @id = "hidEditarAssunto" })%>
		<%= Html.Hidden("intTipoClassificacao", ProvaColegiada.Models.Classificacao.EnumTipoClassificacao.AssuntoPesquisaOpniao.Id, new { @id = "intTipoAssuntoPesquisaOpniao" })%>
		<div class="popupConteudo">
            <p class="instrucaoSelecionar">Organize suas questões para pesquisa de opinião classificando-as em categorias e tipos</p>
            <p class="instrucaoEditar">Crie suas classificações de categorias e tipos</p>
			<div class="tituloArvoreQuestao">
				<label>Área e assunto:</label>
                <a class="btn direita btnEditarClassificacao">editar|voltar seleção</a>
			</div>
			<div id="treeAssuntoPesquisaOpniao" class="boxArvoreScroll">

			</div> 
		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarAssuntoPesquisaOpniao" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnFiltroAssuntoPesquisaOpniao" class="btnNav btnExtra">Filtro</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnSalvarAssuntoPesquisaOpniao" class="btnNav">Salvar</a>
			</div>
		</div>
<%  } %>
</div>

