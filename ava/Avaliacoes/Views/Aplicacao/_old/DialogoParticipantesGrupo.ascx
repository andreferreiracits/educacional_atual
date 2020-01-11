<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>
<div id="dlgGrupos" title="Adicionar Grupos" class="popup SEC02511">
    <% using (Html.BeginForm("SalvarParticipantes", "Aplicacao", FormMethod.Post, new { @id = "frmSalvarParticipantesGrupos" }))
       { %>
           <%= Html.Hidden("txtIdAplicacaoParticipantes", Model.Id, new { @id = "txtIdAplicacaoParticipantesGrupo" })%>
           <%= Html.Hidden("txtIdTipoParticipantes", EnumTipoRealizadores.RealizadorGrupo.Id, new { @id = "txtIdTipoParticipantesGrupo" })%>
        <% foreach (AbstractTipoRealizadores g in Model.Realizadores(EnumTipoRealizadores.RealizadorGrupo))
          {%>
            <input type="hidden" name="chkRealizador" value="<%=g.Id %>" />
        <%} %>
       <% } %>
            <div class="popupConteudo">
                
            </div>
            <div class="popupBotoes">
                <div class="btnEspacamento">
                    <a id="btnCancelarGrupos" class="btnNav">Cancelar</a>
                </div>
                <div class="btnEspacamento direita">
                    <%= Html.ActionLink("Adicionar", "AdicionarGrupos", "Admin", new { @id = "btnAdicionarGrupos", @class = "btnNav" })%>
                </div>
            </div>
        
    </div>