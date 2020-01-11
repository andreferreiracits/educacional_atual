<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer "%>
<%
    if (Model.Alternativas.Count > 0) { 
    %>
<div class='hide atualizastatus'><%= Model.Alternativas[0].Estado %></div>

<% 
    
    string viewAssociativa = Model.Alternativas[0].TipoView.ViewAlternativa;
    viewAssociativa += "Direita";
    Html.RenderPartial(viewAssociativa, Model);
    }
%>

