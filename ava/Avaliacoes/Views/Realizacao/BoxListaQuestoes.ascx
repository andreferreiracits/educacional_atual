<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>
<div id="boxListaQuestoes" class="boxListaQuestoes">
	<div class="btnPaginacaoInferior">
        <div class="navegaPaginacao">
	        <ul id="listaQuestoes">
	        </ul>
	    </div>
    </div>
    
    <div class="legenda <%= Model.Legenda %>">
        <div class="listaQuestoesAnulada <%= Model.EstiloLegendaConferir %>">Questão anulada</div>
        <div class="listaQuestoesEmRevisao <%= Model.EstiloLegendaRevisao %>">Questão a revisar</div>
        <div class="listaQuestoesDissertativa <%= Model.EstiloLegendaAberta %>">Questão dissertativa</div>
        <div class="listaQuestoesParcial <%= Model.EstiloLegendaParcial %>">Questão parcial</div>
        <div class="listaQuestoesIncorreta <%= Model.EstiloLegendaConferir %>">Questão incorreta</div>
        <div class="listaQuestoesCorreta <%= Model.EstiloLegendaConferir %>">Questão correta</div>
        <div class="texto">LEGENDA :</div>
		<!--div class="listaQuestoesNaoRespondida">Não Respondidas</div-->
	</div>

</div>
