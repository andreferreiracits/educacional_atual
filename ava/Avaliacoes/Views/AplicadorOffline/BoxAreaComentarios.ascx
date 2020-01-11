<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class="areaDicas">
	<div class="areaDica hide">
		<div class="boxDica">
            <a class="hide" href="/Realizacao/Comentario?Length=10">(Exibir|Ocultar) dica</a>
			<div class="indBoxDica hide"></div>
		</div> 
		<div class="boxComentario">
            <a class="hide" href="/Realizacao/Comentario?Length=10">(Exibir|Ocultar) comentário</a>
			<div class="indBoxComentario hide"></div>
		</div>
		<div class="boxProfessor">
            <a class="hide" href="/Realizacao/Comentario?Length=10">(Exibir|Ocultar) sugestão para professor</a>
			<div class="indBoxProfessor hide"></div>
		</div>
        <div class="boxSugestao">
            <a class="hide" href="/Realizacao/Comentario?Length=10">(Exibir|Ocultar) resposta modelo</a>
			<div class="indBoxSugestao hide"></div>
		</div>
        <div class="boxCorrecao">
            <a class="hide" href="/Realizacao/Comentario?Length=10">(Exibir|Ocultar) comentário correção</a>
			<div class="indBoxCorrecao hide"></div>
		</div>
	</div>

	<div class="areaConteudoDica hide">
		<div class="conteudoDica hide">
			<div class="textoDica"></div>
		</div>
		<div class="conteudoComentario hide">
			<div class="textoDica"></div>
			</div>
		<div class="conteudoProfessor hide">
			<div class="textoDica"></div>
		</div>
        <div class="conteudoSugestao hide">
			<div class="textoDica"></div>
		</div>
        <div class="conteudoCorrecao hide">
			<div class="textoDica"></div>
		</div>
	</div>
</div>
