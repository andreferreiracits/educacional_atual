<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.CorrecaoView>" %>

<div class="aplicacaoSelecioanda">
    <label>Aplicação:</label>
	<span class="nomeAplicacao"><%= Html.Encode(Model.NomeAplicacao) %></span>
	<span class="infoAplicacao"> - <%= Model.RealizacaoAplicacao %></span>
    <span class="btn direita"><%= Html.ActionLink("alterar método de correção", "Aplicacao", "Correcao", new { @id = Model.IdAplicacao, @idSeg = Model.IdTipoCorrecaoI }, new { @class = "btn" })%></span>
</div>