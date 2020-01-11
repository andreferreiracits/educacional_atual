<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<!--div id="infoQuestao"-->
<div class="areaEnunciado">
<div id="areaEnunciadoQuestaoPai"><% Html.RenderPartial(Model.EnunciadoView, Model.EnunciadoVazio); %></div>
</div>
<input type="hidden" value="<%=(int)Model.ProximoEstado %>" name="rdoEstado" />
<!--/div-->

