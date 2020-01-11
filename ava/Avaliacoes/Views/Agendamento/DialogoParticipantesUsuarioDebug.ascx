<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>
<div id="dlgUsuarioDebug" title="Adicionar Usuario" class="popup SEC02511">
    <% using (Html.BeginForm("SalvarParticipantes", "Agendamento", FormMethod.Post, new { @id = "frmSalvarParticipantesUsuario" }))
       { %>
           <%= Html.Hidden("txtIdAplicacaoParticipantes", Model.Id, new { @id = "txtIdAplicacaoParticipantesUsuario" })%>
           <%= Html.Hidden("txtIdTipoParticipantes", EnumTipoRealizadores.RealizadorUsuario.Id, new { @id = "txtIdTipoParticipantesUsuario" })%>
       
            <div class="popupConteudo">

            </div>
        <% } %>
            <div class="popupBotoes">
                <div class="btnEspacamento">
                    <a id="btnCancelarUsuario" class="btnNav">Cancelar</a>
                </div>
                <div class="btnEspacamento direita">
                    <%= Html.ActionLink("Adicionar", "AdicionarUsuario", "Agendamento", new { @id = "btnAdicionarUsuarioDebug", @class = "btnNav" })%>
                </div>
            </div>
        
    </div>