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
                <a id="helpClasTopoQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
			</div>
						   
		</div>

		<% if (Model.btnsAdicionarClassificacao.Length > 0) {%>
		<div class="areaTipoClassificacao">
			<div class="linhaPar">
				<label class="SEC02511_titulo strong">Classificação:</label>
				<span class="SEC02511_texto">
					<% foreach (string v in Model.btnsAdicionarClassificacao)
					{
						Html.RenderPartial(v);
					} %>
					
				</span>
			</div>
		</div>

		<div class="areaClassificacaoTabela" id="areaClassificacaoQuestao">
			 <% foreach (string v in Model.tabelasClassificacao)
			{
				Html.RenderPartial(v, Model.Classificacao);
			} %>
		</div>
		<%} %>

		<%            
			Html.RenderPartial(Model.outrasPropriedadesClassificacao, Model);
		%>

<%
	/*if (Model.dialogosClassificacao.Length > 0)
	{
		foreach (string v in Model.dialogosClassificacao)
		{
			Html.RenderPartial(v);
		}
	}*/

   
    
    if (Model.ClassificacoesBanco.Length > 0)
    {
        foreach (EnumClassificacaoView classificaView in Model.ClassificacoesBanco)
        {
            Html.RenderAction(classificaView.TipoView.ActionDialogoAdicionar, classificaView.TipoView.Controller);
        }
    }
%>

