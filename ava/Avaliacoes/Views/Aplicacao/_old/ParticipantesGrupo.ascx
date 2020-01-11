<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>
<div id="itemGrupo_<%= Model.Id %>" class="areaEscolhaGrupo itemGrupo">
    <div class="areaEscolhaParticipantes">
        <div class="selecionarParticipantes">
            <label class="destaqueAzul">
                Selecione grupos:
                <a id="btnAdicioneGrupos" class="btnAdicione">
                    <img src="<%= UtilView.Url("/Content/imgcss/icoAdicionar.png") %>" alt="adicionar grupos" />adicionar grupos
                </a>
            </label>
        </div>
        <table id="tblGrupos_<%=Model.Id %>" class="tabela tamQuestao" width="100%">
            <thead>
                <tr>
                    <td width="100%">Grupos selecionados</td>
                </tr>
            </thead>
            <% Html.RenderPartial("LinhaGrupo", Model.Realizadores(EnumTipoRealizadores.RealizadorGrupo)); %>
        </table>
    </div>
</div>