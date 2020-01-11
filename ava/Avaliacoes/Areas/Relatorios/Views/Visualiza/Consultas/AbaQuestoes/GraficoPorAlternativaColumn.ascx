<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.QuestoesPorAlternativaDadosView>" %>

<div data-tipo="grafico" data-grafico-tipo="Column2D" data-grafico-width="650" data-grafico-height="350" data-grafico-nodata="<%: ViewData["GraficoNoData"] %>">
    <textarea name="chart">{ "showlabels": "1", "showvalues": "0", "xaxisname":"Alternativas", "yaxisname":"", "caption":"" }</textarea>
    <textarea name="data"><%= Model.JsonDataFusionCharts("#16CF16", "#FF6669") %></textarea>
</div>