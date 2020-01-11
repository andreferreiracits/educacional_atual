<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<div class="btnPaginacaoSuperior">
    <% Html.RenderPartial(Model.BoxAreaIcones);%>
    <div class="boxControleNavegacao"><div id="currentQuestao" class="current">1</div></div>

    <div class="boxBtnNavegacao">
        
        <a id="btnAvancarInativo"  class="btnNewNavegacaoInativo"><img src="<%= UtilView.UrlCompleta(Request) %>/Content/imgcss/NavegacaoInativoProximo.png" /></a>
        <a id="btnAvancar"  class="btnNewNavegacao"><img src="<%= UtilView.UrlCompleta(Request) %>/Content/imgcss/NavegacaoAtivoProximo.png" /></a>
        <div id="btnListaQuestao" class="controleNavegacao controleNavegacaoDown"></div>
        <a id="btnVoltar"  class="btnNewNavegacao"><img src="<%= UtilView.UrlCompleta(Request) %>/Content/imgcss/NavegacaoAtivoAnterior.png" /></a>
        <a id="btnVoltarInativo"  class="btnNewNavegacaoInativo"><img src="<%= UtilView.UrlCompleta(Request) %>/Content/imgcss/NavegacaoInativoAnterior.png" /></a>
        
    </div>

</div>