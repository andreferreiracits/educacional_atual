<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp" %>
<div class="slc menuTipoGrafico" data-tipo="menutipografico" data-destino="#sec025conteudoTipoGrafico" data-tipografico-naopermetidodestino="#sec025conteudoTipoGraficoNaoPermetido" data-tipografico-naopermetidos="4">
    <a class="nome slcLarga">Selecione um tipo de gráfico</a>
    <div class="opcoes">
        <ul>
            <li><label><%= Html.RadioButton("Consulta[Tipo]", TipoConsulta.RelatorioQuestoesAcertoParcialErro.Id, false, new { @id ="" }) %> Acertos / parciais / erros</label></li>
            <li><label><%= Html.RadioButton("Consulta[Tipo]", TipoConsulta.RelatorioQuestoesPorAlternativa.Id, new { @id = "" }) %> Número de respostas por alternativa</label></li>
            <%--<li><label><%= Html.RadioButton("Consulta[Tipo]", TipoConsulta.RelatorioCriteriosRedacao.Id, new { @id = "" }) %> Média de critérios de redação</label></li>--%>
        </ul>
    </div>
</div>
<div id="sec025conteudoTipoGrafico" class="conteudoAbaQuestao"></div>
<div id="sec025conteudoTipoGraficoNaoPermetido" class="conteudoAbaQuestao">
    <div class="grafico semDados"> <%= ViewData["TipoAvaliacaoSemGrafico"] %> </div>
</div>
