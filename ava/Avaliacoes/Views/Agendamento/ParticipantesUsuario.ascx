<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador "%>
<div id="itemGrupo_<%= Model.Id %>" class="areaEscolhaGrupo itemGrupo">
    <div class="areaEscolhaParticipantes">
        <div class="selecionarParticipantes">
            <label class="destaqueAzul">
                Selecione usuário:<input type="text" name="strBuscaUsuario" id="strBuscaUsuario" value="" />
                ou busque usuários por turmas ou grupos:
                <a id="btnAdicioneUsuario" class="btnAdicione">
                    <img src="<%= UtilView.Url("/Content/imgcss/icoAdicionar.png") %>" alt="adicionar usuário" />adicionar usuário
                </a>
            </label>
        </div>
        <table id="tblUsuarios" class="tabela tamQuestao" width="100%">
            <thead>
                <tr>
                    <td width="100%">Usuários selecionados</td>
                </tr>
            </thead>
            <% Html.RenderPartial("LinhaUsuario", Model.Realizadores(EnumTipoRealizadores.RealizadorUsuario)); %>
        </table>
    </div>
</div>