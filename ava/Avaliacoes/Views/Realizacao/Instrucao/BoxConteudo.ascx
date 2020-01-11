<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
	
<h1><%=Html.Encode(Model.Nome) %><p>Criada por <%=Model.Autor %></p></h1>

<% Html.RenderPartial(Model.ViewRealizacaoBoxAvisoSimulada, Model); %>
              
<% Html.RenderPartial(Model.ViewRealizacaoBoxIntroducao, Model); %>
				
<% Html.RenderPartial(Model.ViewRealizacaoBoxDataAgendamento, Model); %>

<% Html.RenderPartial(Model.ViewRealizacaoBoxDuracao, Model); %>
              
<p>Número de questões: <span><%=Model.NrQuestoes%></span></p>

<% Html.RenderPartial(Model.ViewRealizacaoBoxValor, Model); %>

<p>Data de divulgação dos resultados: <span><%=Model.Correcao%></span></p>

<% Html.RenderPartial(Model.ViewRealizacaoBoxTipoCorrecao, Model); %>

<% Html.RenderPartial(Model.ViewRealizacaoBoxTentativas, Model); %>

<% Html.RenderPartial(Model.ViewRealizacaoBoxAutoEstudo); %>
				
