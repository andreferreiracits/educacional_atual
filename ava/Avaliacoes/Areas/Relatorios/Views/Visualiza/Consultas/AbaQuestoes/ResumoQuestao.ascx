<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Servicos.Relatorios.Imp.Avaliacao.RelatorioQuestao>" %>

<div class="boxResumoQuestao">
    <div class="textoResumo"><%: Model.Enunciado %></div>
    <a class="botaoResumo" data-tipo="expandirbox" data-destino="#boxResumo" data-estado="fechado" data-textfechado="Abrir questão" data-textaberto="Fechar questão" href="<%= Url.RouteUrl("Default", new { controller = "Questoes", action = "ResumoQuestaoRelatorio", id=Model.Id }) %>">Abrir questão</a>
    <div id="boxResumo" class="questaoResumo">conteudo da questão</div>
    <div class="clear"></div>
</div>