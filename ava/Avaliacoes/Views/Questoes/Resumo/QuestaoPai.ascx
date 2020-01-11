<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<!--% 
	
	
	if (Model.ExibirComentario) Html.RenderPartial("TrocaEstado", Model.Fluxo.UltimaTroca); %-->

<div class="areaTipoQuestao">
	<div class="divisaoQuestao">
		<div class="tituloDivisao">Tipo da quest�o</div>
		<div class="textoDivisao">Tipo da quest�o.</div>
		<a class="btn direita" id="btnResumoEditarTipo">Editar</a>
	</div>
	<div class="linhaPar">
		<label class="questao">Tipo de quest�o:</label>
		<label class="SEC02511_texto strong"><%= Model.TipoResposta %></label>
	</div>
	
	<div class="linhaImpar">
		<label class="questao">Finalidade:</label>
		<label class="SEC02511_texto strong"><%= Model.NomeTipoBanco %></label>
	</div>
</div>

<div class="areaEnunciado ConfirmaQuestao">
	<div class="divisaoQuestao">
		<div class="tituloDivisao">Estrutura da quest�o</div>
		<div class="textoDivisao">Enunciado e resposta</div>
		<a class="btn direita" id="btnResumoEditarEstrutura">Editar</a>
	</div> 
	
	<div class="SEC02511_titulo">Enunciado:</div>
	
	<div class="areaTextoEnunciado mceView">
		<%= Model.Enunciado.Texto.TextoView %>	    
	</div>
	
	<div class="clear"></div>
	
	<% Html.RenderPartial("ComentarioReadOnly", Model.Enunciado.Comentario); %>
</div>

 <div class="areaConfiguracoesQuestao validacaoEsp">
	<div class="divisaoQuestao">
		<div class="tituloDivisao">Classifica��o</div>
		<div class="textoDivisao">Classifica��o da quest�o.</div>
		<a class="btn direita" id="btnResumoEditarClassificacao">Editar</a>
		<a class="btn direita" id="btnExpandirEditarClassificacao"><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
	</div> <!--.divisaoQuestao -->

	<div id="boxClassificacaoQuestao">

		<div class="linhaPar">
			<label class="questao">Estado:</label>
			<span class="SEC02511_texto"><%= Model.Estado %></span>
		</div>
	
		<div class="linhaImpar">
			<label class="questao">Ano:</label>
			<span class="SEC02511_texto"><%= Model.Ano %></span>
		</div>
		<div class="linhaPar">
			<label class="questao">Identificador:</label>
			<span class="SEC02511_texto"><%= Html.Encode(Model.Identificador) %></span>
		</div>
		<div class="linhaPar">
			<label class="questao">Tags:</label>
			<span class="SEC02511_texto"><%= Html.Encode(Model.Tags) %></span>
		</div>
	</div>
</div>