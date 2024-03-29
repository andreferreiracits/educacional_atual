﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.QuestoesAcertoErroDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>

<div class="boxTituloAba">
    Selecione a questão da avaliação <span><%= Model.RelatorioAvaliacao.Titulo %></span> que você deseja visualizar os relatórios:
</div>
<%
    Html.RenderPartial("../Visualiza/Consultas/AbaQuestoes/ListaDeQuestao", Model.RelatorioAvaliacao.ListaQuestoes.Select(t => t.Id).ToList(), new ViewDataDictionary() { { "questaoAtual", Model.Selecionada.Id } });
    Html.RenderPartial("../Visualiza/Consultas/AbaQuestoes/ResumoQuestao", Model.Selecionada);
%>
<%
    if ( Model.TemGrafico )
    {
        %>
            <% Html.RenderPartial("../Visualiza/Consultas/AbaQuestoes/GraficoPorQuestao", Model); %>
        <%
    }
    else
    {
        %>
            <div class="grafico semDados">
                <%= ViewData["TipoDeGraficoNaoDisponivel"] %>
            </div>
        <%
    }
%>