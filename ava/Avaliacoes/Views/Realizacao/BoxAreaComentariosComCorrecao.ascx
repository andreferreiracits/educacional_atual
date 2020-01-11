<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ComentarioRealizadaView.ComentarioRealizadaComCorrecaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class="areaDicas">
	<div class="areaDica">
		<div class="boxDica">
            <%= Html.ActionLink("(Exibir|Ocultar) dica", Model.ActionComentario, "Realizacao", new { @class = Model.BtnDica })%>
			<div class="indBoxDica hide"></div>
		</div> 
		<div class="boxComentario">
            <%= Html.ActionLink("(Exibir|Ocultar) comentário", Model.ActionComentario, "Realizacao", new { @class = Model.BtnAluno })%>
			<div class="indBoxComentario hide"></div>
		</div>
		<div class="boxProfessor">
            <%= Html.ActionLink("(Exibir|Ocultar) sugestão para professor", Model.ActionComentario, "Realizacao", new { @class = Model.BtnProfessor })%>
			<div class="indBoxProfessor hide"></div>
		</div>
        <div class="boxSugestao">
            <%= Html.ActionLink("(Exibir|Ocultar) resposta modelo", Model.ActionComentario, "Realizacao", new { @class = Model.BtnSugestao })%>
			<div class="indBoxSugestao hide"></div>
		</div>
        <div class="boxCorrecao">
            <%= Html.ActionLink("(Exibir|Ocultar) comentário correção", Model.ActionComentario, "Realizacao", new { @class = Model.BtnCorrecao })%>
			<div class="indBoxCorrecao hide"></div>
		</div>
	</div>
	<div class="areaConteudoDica">
		<div class="conteudoDica hide">
			<div class="textoDica"><%=Model.ContentDica%></div>
		</div>
		<div class="conteudoComentario hide">
			<div class="textoDica"><%=Model.ContentAluno%></div>
		</div>
		<div class="conteudoProfessor hide">
			<div class="textoDica"><%=Model.ContentProfessor%></div>
		</div>
        <div class="conteudoSugestao hide">
			<div class="textoDica"><%=Model.ContentSugestao%></div>
		</div>
        <div class="conteudoCorrecao hide">
			<div class="textoDica"><%=Model.ContentCorrecao%></div>
		</div>
	</div>
</div>
