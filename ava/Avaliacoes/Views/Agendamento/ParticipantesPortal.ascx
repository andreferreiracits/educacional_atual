<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>
<div id="itemPortal_<%= Model.Id %>" class="areaEscolhaGrupo itemGrupo">
    <div class="areaEscolhaParticipantes">
        <div class="selecionarParticipantes">
            <label class="destaqueAzul">
                Selecione portal:
                <a id="btnAdicionePortal" class="btnAdicione">
                    <img src="<%= UtilView.Url("/Content/imgcss/icoAdicionar.png") %>" alt="adicionar portal" />adicionar portal
                </a>
            </label>
        </div>
        <table id="tblPortal_<%=Model.Id %>" class="tabela tamQuestao" width="100%">
            <thead>
                <tr>
                    <td width="100%">Portais selecionados</td>
                </tr>
            </thead>
            <% Html.RenderPartial("LinhaPortais", Model.Realizadores(EnumTipoRealizadores.RealizadorPortal)); %>
        </table>
    </div>
</div>