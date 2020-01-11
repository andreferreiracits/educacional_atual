<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>
<div id="itemGrupo_<%= Model.Id %>" class="areaEscolhaGrupo itemGrupo">
    <div class="areaEscolhaParticipantes">
        <table id="tblGrupos_<%=Model.Id %>" class="tabela tamQuestao" width="100%">
            <thead>
                <tr>
                    <td width="100%">Grupos selecionados</td>
                </tr>
            </thead>
            <% Html.RenderPartial("LinhaGrupoRO", Model.Realizadores(EnumTipoRealizadores.RealizadorGrupo)); %>
        </table>
    </div>
</div>