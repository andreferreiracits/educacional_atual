<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div class="areaTipoQuestao">
	<div class="divisaoQuestao">
		<div class="tituloDivisao">Tipo da questão</div>
		<div class="textoDivisao">Tipo da questão.</div>
		<a class="btn direita" id="btnResumoEditarTipo">Editar</a>
	</div>
	<div class="linhaPar">
		<label class="questao">Tipo de questão:</label>
		<label class="SEC02511_texto strong"><%= Model.TipoResposta %></label>
        <input type="hidden" name="intQuestaoTipo" value="<%=Model.TipoResposta.Id %>"/>
	</div>
	<div class="linhaImpar">
		<label class="questao">Finalidade:</label>
		<label class="SEC02511_texto strong"><%= Model.NomeTipoBanco %></label>
	</div>
</div>
<div class="areaEnunciado ConfirmaQuestao">
    <div id="areaEnunciadoBase">
		<% Html.RenderPartial(Model.BoxEnunciadoBaseResumo, Model); %>
	</div>
	<div class="divisaoQuestao">
		<div class="tituloDivisao">Estrutura da questão</div>
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
<div class="areaRespostas">
    <% Html.RenderPartial(Model.TipoRespostaView.ViewAlternativaRO, Model); %>
</div>
 <div class="areaConfiguracoesQuestao validacaoEsp">
	<div class="divisaoQuestao">
		<div class="tituloDivisao">Classificação</div>
		<div class="textoDivisao">Classificação da questão.</div>
		<a class="btn direita" id="btnResumoEditarClassificacao">Editar</a>
		<a class="btn direita" id="btnExpandirEditarClassificacao"><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
	</div>
	<div id="boxClassificacaoQuestao">
		<div class="areaClassificacaoTabela">
            <%
                foreach (string v in Model.tabelasROClassificacao)
		        {
                    Html.RenderPartial(v, Model.Classificacao);
		        }
            %>
		</div>
		<div class="linhaImpar">
			<label class="questao">Grau de dificuldade:</label>
			<span class="SEC02511_texto"><%= Model.Dificuldade %></span>
		</div>
		<% Html.RenderPartial(Model.CompartilhamentoViewRO, Model); %>
        <div class="linhaImpar">
			<label class="questao">Estado:</label>
			<span class="SEC02511_texto"><%= Model.Estado %></span>
		</div>
		<div class="linhaPar">
			<label class="questao">Ano:</label>
			<span class="SEC02511_texto"><%= Model.Ano %></span>
		</div>
		<div class="linhaImpar">
			<label class="questao">Identificador:</label>
			<span class="SEC02511_texto"><%= Html.Encode(Model.Identificador)%></span>
		</div>
		<div class="linhaPar">
			<label class="questao">Tags:</label>
			<span class="SEC02511_texto"><%= Html.Encode(Model.Tags) %></span>
		</div>
	</div>
</div>
