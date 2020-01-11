<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoAgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews"%>
<div id="itemAgendamento_<%=Model.Id%>" class="itemAgendamento">
    <%= Html.Hidden("txtIdAgendamento", Model.Id, new { @id = "txtIdAgendamento_"+Model.Id })%>
    <div class="destaqueAzul">
        <label>Avaliação Selecionada:</label>
        <strong><%= Model.Prova.Nome%></strong>
        <%= Html.ActionLink("visualizar questões", "VisualizarQuestoes", "Prova", new { @class = "btnM btnVisualizarQuestao" })%>
        <% Html.RenderPartial(Model.BoxRemover); %>
        <%= Html.ActionLink("anular questões", "AnularQuestoes", "Prova", new { @class = "btnM btnAnularQuestao" })%>
        <!--a href="AnularQuestao(<%=Model.Id.ToString() %>)" class="btnM btnAnularQuestao">Anular Questão</a-->
    </div>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Autor:</span>
        <label><%= Model.Prova.Autor%></label>
    </div>
    <div class="linhaPar">
        <span class="SEC02511_texto">Data da última modificação:</span>
	    <label><%= Model.Prova.Modificado%></label>
    </div>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Questões:</span>
        <label><%= Model.Prova.TextoNrQuestao%></label>
    </div>
    <div class="linhaPar">
        <span class="SEC02511_texto">tempo de realização desta avaliação:</span>
        <label><input type="text" name="txtDuracaoAgendamento" class="txtHora" maxlength="3" value="<%= Model.Duracao %>" <%=Model.DuracaoDisabled%> />hora(s)</label>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft"><span class="SEC02511_texto">Exclusiva</span></div>
            <div class="txtMenor">
                <label><input type="radio" name="rdoExclusiva_<%=Model.Id%>" <%=Model.CheckExclusivaNao %> <%=Model.GrupoDisabled%> value="0"/> Não</label>
                <label><input type="radio" name="rdoExclusiva_<%=Model.Id%>" <%=Model.CheckExclusivaSim %> <%=Model.GrupoDisabled%> value="1"/> Sim</label>
            </div>
            <div class="txtMenor boxGrupo">
                Grupo: <input id="txtIdGrupo_<%=Model.Id%>" class="txtIdRedacao" type="text" value="<%=Model.Grupo %>" <%=Model.GrupoDisabled%> name="txtIdGrupo" />
            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>
