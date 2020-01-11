<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Shared.Confirm>" %>

<div id="confirm" class="<%= Model.Estilo %> confirm" title="<%= Model.Titulo %>">
    <input type="hidden" id="statusAtualConfirm" value="<%= Model.StatusAtual %>"/>
    <%= Model.Texto %>
    <a href="javascript:;" class="btnConfirmSim">Sim</a>
    <a href="javascript:;" class="btnConfirmNao">Não</a>
</div>
