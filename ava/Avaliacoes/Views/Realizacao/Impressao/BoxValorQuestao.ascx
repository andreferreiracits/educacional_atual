<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoRealizadaPrint>" %>
Valor: <%=Model.Valor%>
<% Html.RenderPartial(Model.ViewNotaQuestao, Model); %>