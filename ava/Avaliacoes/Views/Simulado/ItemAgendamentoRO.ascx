<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoAgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews"%>

<div id="itemAgendamento_<%=Model.Id%> %>" class="itemAgendamento">
    <div class="destaqueAzul">
        <label>Avaliação Selecionada:</label>
        <strong><%= Model.Prova.Nome%></strong>
    </div>
     <div class="linhaImpar">
        <span class="SEC02511_texto">tempo de realização desta avaliação:</span>
        <label><%= Model.Duracao %> hora(s)</label>
    </div>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Grupo:</span>
        <label><%=Model.Grupo == 0 ? "" : Model.Grupo.ToString()%></label>
    </div>
    <div class="clear"></div>
</div>



