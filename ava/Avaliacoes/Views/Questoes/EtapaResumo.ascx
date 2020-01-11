<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class='hide atualizastatus'><%= Model.Estado %></div>
<a id="helpResTopQuestao" class="btn sec_menuNavegacao" href="javascript:void(0)">?</a>
<% 
    Html.RenderPartial(Model.EtapaResumoView, Model); 
%>