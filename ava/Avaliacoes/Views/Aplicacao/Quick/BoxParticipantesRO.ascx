<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Exam.Realizador" %>
<div id="caixaParticipantes">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Participantes</div>
        <div class="textoDivisao"></div>
    </div>
    <div>
        <table class="cnfg_aplicador_tblResumo tabela">
            <thead>
                <tr>
                    <td>Grupos selecionadas</td>
                    <td>Chave de acesso:</td>
                </tr>
            </thead>
            <tbody>
            <% 
                IList<AbstractTipoRealizadores> realizadores = Model.Realizadores(EnumTipoRealizadores.RealizadorGrupo);
                if (realizadores.Count > 0)
                { %>
                <% foreach (RealizadoresGrupo realizador in realizadores)
                   {  %>
                <tr>
                    <td><%=realizador.Nome%></td>
                    <td><%=realizador.Key%></td>
                </tr>
                <% } %>
            <% }
                else
                { %>
                <tr>
                    <td colspan="2">Nenhum grupo selecionado</td>
                </tr>
            <% } %>
            </tbody>
        </table>
    </div>
</div>