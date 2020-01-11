<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.QuestoesPorAlternativaDadosView>" %>

<div data-tipo="grafico" data-grafico-tipo="Bar2D" data-grafico-width="650" data-grafico-height="350" data-grafico-nodata="<%: ViewData["GraficoNoData"] %>">
    <textarea name="chart">{ "showlabels": "1", "showvalues": "0", "xaxisname":"Alternativas", "yaxisname":"Alunos", "caption":"" , "formatnumber":"0", "formatnumberscale":"0", "sformatnumber":"0","sformatnumberscale":"0", "decimals":"0"}</textarea>
    <textarea name="data"><%= Model.JsonDataFusionCharts("#008E8F", "#008E8F")%></textarea>
</div>