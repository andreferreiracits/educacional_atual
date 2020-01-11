<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.RelatorioAgendamentoAvaliacaoView>" %>
<form>
    <div class="divisaoTopicos">
        <div class="tituloDivisao">Configurações</div>
        <div class="textoDivisao"> Dados básicos do relatório. </div>
        <a class="btn direita bkCxPasso0" href="javascript:void(0);">Editar</a>
    </div>
	<div class="linhaPar">
        <span class="SEC02511_texto">Titulo:</span>
		<label> <%: Model.Titulo %> </label>
	</div>
	<div class="linhaImpar">
        <span class="SEC02511_texto">Identificador:</span>
		<label> <%: Model.Identificador %> </label>
	</div>
	<div class="linhaPar">
        <span class="SEC02511_texto">Compartilhamento:</span>
		<label> <%: Model.Compartilhamento %> </label>
	</div>
    <div class="divisaoTopicos">
        <div class="tituloDivisao">Agendamento(s)</div>
        <div class="textoDivisao"> Agendamento(s) que deseja gerar o relatório. </div>
        <a class="btn direita bkCxPasso0" href="javascript:void(0);">Editar</a>
    </div>
</form>
<div>
    <% Html.RenderPartial("../AgendamentoNovo/TabelaRelatorioAgendamentoRO", new ViewDataDictionary { 
        { "AgendamentosConfig", String.Join(",", Model.AgendamentosConfig) },
    }); %>
</div>
