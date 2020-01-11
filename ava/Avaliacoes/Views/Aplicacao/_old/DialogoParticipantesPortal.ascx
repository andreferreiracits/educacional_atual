<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>
<div id="dlgPortal" title="Adicionar Portal" class="popup SEC02511">
<% using (Html.BeginForm("SalvarParticipantes", "Aplicacao", FormMethod.Post, new { @id = "frmSalvarParticipantesPortais" }))
       { %>
           <%= Html.Hidden("txtIdAplicacaoParticipantes", Model.Id, new { @id = "txtIdAplicacaoParticipantesPortais" })%>
           <%= Html.Hidden("txtIdTipoParticipantes", EnumTipoRealizadores.RealizadorPortal.Id, new { @id = "txtIdTipoParticipantesPortais" })%>
       
        <div class="popupConteudo">

        </div>
        <div class="popupBotoes">
            <div class="btnEspacamento">
                <a id="btnCancelarPortais" class="btnNav">Cancelar</a>
            </div>
            <div class="btnEspacamento direita">
                <%= Html.ActionLink("Adicionar", "AdicionarPortais", "Admin", new { @id = "btnAdicionarPortais", @class = "btnNav" })%>
            </div>
        </div>
<% } %>
</div>