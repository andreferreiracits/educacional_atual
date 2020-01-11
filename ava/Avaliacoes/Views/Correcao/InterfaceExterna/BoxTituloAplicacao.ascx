<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.CorrecaoView>" %>

<div class="aplicacaoSelecioanda">
	<label>Aplicação:</label>
	<span class="nomeAplicacao"><%= Html.Encode(Model.NomeAplicacao) %></span>
	<span class="infoAplicacao"> - <%= Model.RealizacaoAplicacao %></span>
</div>

