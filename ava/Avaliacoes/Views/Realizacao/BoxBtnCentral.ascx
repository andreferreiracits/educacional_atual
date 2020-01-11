<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<a id="btnLimpar"    class="btnNovo btnCinza <%=Model.LimparHabilitado %>"><div class="texto">Limpar</div></a>
<a id="btnRevisar"   class="btnNovo btnDourado <%=Model.BtnRevisar%>"><div class="texto"><%=Model.TxtRevisar%></div></a>
<a id="btnConferir"  class="btnNovo btnVerde btnRefazer <%=Model.Conferir %> <%=Model.ConferirHabilitado%>"><div class="texto">Conferir</div></a>

<div id="realizadortoolTip" class="realizador_toolTip hide"> <div class="seta"></div> <div class="corpo"></div> </div>

