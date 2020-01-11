<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>
				  
		<div class="areaEnunciado">
			<div class="divisaoQuestao">
				<h2 class="tituloDivisao">Mais Informações:</h2>
				<span class="textoDivisao">Edite informações complementares a questão.</span>
                <a id="helpClasPaiQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
			</div>
						   
		</div>

		<%            
			Html.RenderPartial(Model.outrasPropriedadesClassificacao, Model);
		%>
