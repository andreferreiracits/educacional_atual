<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ComentarioRealizadaView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class="areaDicas">
	<div class="areaDica <%=Model.ShowAllDicas %>">
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
	</div>

	<div class="areaConteudoDica <%=Model.ShowAllDicas %>">
		<div class="conteudoDica hide">
			<div class="textoDica"><%=Model.ContentDica%></div>
		</div>
		<div class="conteudoComentario hide">
			<div class="textoDica"><%=Model.ContentAluno%></div>
			</div>
		<div class="conteudoProfessor hide">
			<div class="textoDica"><%=Model.ContentProfessor%></div>
		</div>
	</div>
</div>
