<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoRealizadaView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

Nota da Questão:<span><%=Model.Nota%> de <%=Model.Valor %></span>
