<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<div class="associativaDireita">
<% IList<AlternativaView> alternativas = ((ProvaColegiada.TabelaViews.Answer.AssociativaView)Model.TipoRespostaView.TipoView).AlternativasDireita(Model.Questao);
        
if (alternativas.Count > 0) {
    foreach (AlternativaView alternativa in alternativas) {%>
        <ul class="itensResposta">
    	    <li class="AssociativaResumo Alternativa">
        	    <div class="opcaoLetra"><span class="Correta">(<%= (alternativa.LetraAssociado != null && alternativa.LetraAssociado != 0) ? alternativa.LetraAssociado : ' '%>)</span></div> 
                <div class="opcaoResposta mceView"> <%= alternativa.Texto.TextoView %> </div> 
            </li>
        </ul>     
<%  }
}
%>
</div>
<div class="clear"></div>

