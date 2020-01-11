<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoVOView>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<% if(Model.EstadoAplicacao == ProvaColegiada.Models.Exam.EstadoAplicacao.Realizada) {%>
<a href="RelatorioFlipped(<%=Model.Id.ToString() %>)" class="btn funcao">Relatório Flipped</a>
<%} %>
