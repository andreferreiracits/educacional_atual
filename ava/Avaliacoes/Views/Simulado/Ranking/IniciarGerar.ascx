<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoRankingView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>


<p><%=Model.NomeSimulado %></p>
<input type="hidden" name="status" value="<%=Model.Estado %>" />
<input type="hidden" name="IdSimulado" value="<%=Model.IdSimulado %>" />
<input type="hidden" name="etapa" value="gerar" />
<div id="progressbar"></div>
<div id="logGerar"></div>

