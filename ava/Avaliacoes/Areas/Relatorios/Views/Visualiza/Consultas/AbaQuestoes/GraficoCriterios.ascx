<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.QuestoesCriteriosRedacaoDadosView>" %>

<div data-tipo="grafico" data-grafico-tipo="Column2D" data-grafico-width="650" data-grafico-height="350" data-grafico-nodata="<%: ViewData["GraficoNoData"] %>">
    <textarea name="chart">{ "showlabels": "0", "showvalues": "1", "xaxisname":"Critérios", "yaxisname":"", "caption":"" }</textarea>
    <textarea name="data"><%= Model.JsonFusionChart %></textarea>
</div>
<div class="legend-box">
    <%
        foreach (var criterio in Model.ListaCriteriosDesempenho)
        {
            %>
                <div class="legend-line">
                    <div class="legend-line-color" style="<%= "background-color: " + Model.GetColor() %>"></div>
                    <div class="legend-line-label"><%= criterio.NomeCriterio %></div>
                </div>
            <%
        }
    %>
</div>