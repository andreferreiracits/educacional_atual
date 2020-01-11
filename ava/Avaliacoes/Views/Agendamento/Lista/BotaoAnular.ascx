<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<a href="AnularQuestao(<%=Model.Id.ToString() %>)" class="btn funcao">Anular Questão</a>
