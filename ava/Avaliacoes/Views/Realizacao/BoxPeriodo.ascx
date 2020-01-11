<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<div class="campoTempo hide">
	Início: <span class="bold"><%= Model.HorarioInicio %></span> / 
	Término: <span class="bold"><%= Model.HorarioFim %></span>
</div>
