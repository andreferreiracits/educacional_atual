<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<div id="boxInstrucao" class="areaConteudoIntro">
    
    <% Html.RenderPartial("Instrucao/BoxConteudo", Model.AplicacaoView); %>
    <div class="clear"></div>
    <% if (!Model.Simulada && !Model.BolLockView) { %>
        <a id="btnInstrucaoImprimir" class="btnNovo btnCinza" href="/Realizacao/Imprimir/<%=Model.Id %>"><div class="texto">Imprimir</div></a>
    <%} %>
    <a id="btnInstrucaoFechar" class="btnNovo btnCinza btnIniciar"><div class="texto">Ok</div></a>

    <!--div class="botao"><a id="btnInstrucaoFechar" class="btnPadrao">Ok</a></div-->
    <div class="clear"></div>
</div>
