<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer "%>
<%
    IList<AlternativaView> alternativas = ((ProvaColegiada.TabelaViews.Answer.AssociativaView)Model.TipoRespostaView.TipoView).AlternativasDireita(Model.Questao, Model.AlternativaAdicionada);    
%>
<input type="hidden" id="MaximoAlternativas" value="1" />
<div class='hide atualizastatus'><%= alternativas[0].Estado%></div>

<% Html.RenderPartial("Mensagem", new Mensagem(false, Mensagem.ALERTA, "Limite máximo de alternativas"));%>
<% Html.RenderPartial("Answer/AlternativaAssociativaDireita", Model); %>

