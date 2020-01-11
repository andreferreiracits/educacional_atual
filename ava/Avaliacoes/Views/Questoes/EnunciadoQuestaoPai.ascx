<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<%  if (Model.EnunciadoPai != null) { 
%>
		<div class="divisaoQuestao">
			<h2 class="tituloDivisao">Enunciado base da questão</h2>
			<span class="textoDivisao">Um texto para esta caixa.</span>
			<a href="javascript:;" class="btn direita" id="btnOcultarQuestaoPai"><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
            <% if (Model.PassoCadastro != (int)QuestaoView.PassosCadastro.resumo && Model.IncluirQuestaoPai)
               { %>
			<%= Html.ActionLink("Remover", "RetirarQuestaoPai", new { @id = Model.IdQuestaoPai }, new { @class = "btn direita", @id = "btnRemoverQuestaoPai" })%>
            <% } %>
		</div>
        <div id="areaEnunciadoBaseContent">
		<div class="areaTextoEnunciado mceView">
			<%= Model.EnunciadoPai.Texto.TextoView %>	    
		</div>
		<div class="clear"></div>
	
		<% Html.RenderPartial("ComentarioReadOnly", Model.EnunciadoPai.Comentario); %>
        </div>
<%  } 
%>