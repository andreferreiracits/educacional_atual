<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.TipoRespostaAbstractRealizada>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div id="graficoFusionChart">Carregando...</div>
<input id="graficoTipo" value="<%=Model.TipoGrafico %>" type="hidden" name="graficoTipo" />
<input id="graficoPath" value="<%=Model.PathGrafico %>" type="hidden" name="graficoPath" />