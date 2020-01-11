<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<div class="SEC02511_titulo">Alternativas:</div>
<div class="associativaEsquerda">
<%if (Model.Alternativas.Count > 0){
    foreach (AlternativaView alternativa in Model.Alternativas) {%>
        <ul class="itensResposta">
    	    <li class="AssociativaResumo">
        	    <div class="opcaoLetra">(<%= alternativa.Letra %>)</div> 
                <div class="opcaoRespostaAsso mceView"><%= alternativa.Texto.TextoView %></div>
            </li>
        </ul>     
<%  }
}
%>
</div>
<div class="associativaDireita">
<% IList<AlternativaView> alternativas = ((ProvaColegiada.TabelaViews.Answer.AssociativaView)Model.TipoRespostaView.TipoView).AlternativasDireita(Model.Questao);
        
if (alternativas.Count > 0) {
    foreach (AlternativaView alternativa in alternativas) {%>
        <ul class="itensResposta">
    	    <li class="AssociativaResumo">
        	    <div class="opcaoLetra"><span class="Correta">(<%= (alternativa.LetraAssociado != null && alternativa.LetraAssociado != 0) ? alternativa.LetraAssociado : ' '%>)</span></div> 
                <div class="opcaoRespostaAsso mceView"> <%= alternativa.Texto.TextoView %> </div> 
            </li>
        </ul>     
<%  }
}
%>
</div>
<div class="clear"></div>
