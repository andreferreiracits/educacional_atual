<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Tuple<int,Avaliacoes.Servicos.Agendamentos.Interfaces.IAgendamentoLista,Avaliacoes.Servicos.Agendamentos.Interfaces.IAgendamentoLista>>" %>
<div id="sec025BoxAgendamento">
<h1><b><%= (int)Model.Item1 %></b> <%=Html.RecursoPlural("ServicoAgendamentos.Textos.HomeAgendada", (int)Model.Item1)%></h1>
<% 
    //TODO: ver uma forma mais simples de passar a model sem precisar criar este anonimo
    Html.RenderAction("BoxAgendamentosAndamento", new { lista = Model.Item2 });
    Html.RenderAction("BoxAgendamentosAgendados", new { lista = Model.Item3 });
%>
</div>