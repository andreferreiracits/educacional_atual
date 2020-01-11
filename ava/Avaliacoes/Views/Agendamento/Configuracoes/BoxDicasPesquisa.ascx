<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<input type="hidden" name="rdoDicas" value="1"/>
<input class="txtTentativa" type="hidden" value="<%=Model.NumeroTentativasDica %>" name="txtNumeroTentativaDica" />