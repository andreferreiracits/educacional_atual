<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<a href="AgendamentoRelatorio(<%=Model.Id.ToString() %>)" class="btn funcao">Relatório</a>

<%--<a href="NovoRelatorio(<%=Model.Id.ToString() %>)" class="btn funcao">Relatório</a>--%>

