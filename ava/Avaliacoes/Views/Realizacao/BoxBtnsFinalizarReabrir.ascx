<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<% if ( !Model.BolLockView ) { %>
    <a id="btnView"      class="btnNovo btnCinza btnView"><div class="texto">Visualizar</div></a>
    <% if (!Model.Simulada) { %> 
        <a id="btnImprimir"  class="btnNovo btnCinza" href="/Realizacao/Imprimir/<%=Model.Id %>"><div class="texto">Imprimir</div></a>
    <% } %>
<%} %>
<a id="btnReabrir"   class="btnNovo btnCinza btnReabrir"><div class="texto">Reabrir</div></a>
<a id="btnFechar"    class="btnNovo btnCinza"><div class="texto">Fechar</div></a>









