<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<p>Início: <span><%=Model.RealizacaoDataInicio %> <%=Model.RealizacaoHoraInicio %>*</span></p>
<p>Fim: <span><%=Model.RealizacaoDataFim %> <%=Model.RealizacaoHoraFim%>*</span></p>