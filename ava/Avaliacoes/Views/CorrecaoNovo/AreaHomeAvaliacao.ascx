<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Tuple<int, ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.AplicacaoCorrecaoVOView>>>" %>
<div id="sec025BoxCorrecao">
<h1><b><%= (int)Model.Item1 %></b><%=Html.RecursoPlural("Framework.Migrar.HomeCorrecao", (int)Model.Item1)%></h1>
<% 
    //TODO: ver uma forma mais simples de passar a model sem precisar criar este anonimo
    Html.RenderAction("BoxCorrecoes", new { lista = Model.Item2 });
%>
</div>
