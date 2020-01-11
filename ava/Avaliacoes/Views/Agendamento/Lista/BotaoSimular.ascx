<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<a href="AgendamentoSimular(<%=Model.Id.ToString() %>)" class="btn funcao">Simular</a>