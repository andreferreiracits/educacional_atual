<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Relatorios.DadosGraficoAlternativa>>" %>
<%@ Import namespace="ProvaColegiada.Models.Relatorios" %>
<% if(Model.Count > 0){ %>
    <graph caption='' xAxisName='Alternativas' yAxisName='Número de respostas' decimalPrecision='0' formatNumberScale='0'>
    <% foreach (DadosGraficoAlternativa dado in Model){ %>
     <set name='<%=dado.Letra%>-<%=dado.Total%>' value='<%=(dado.PercentTotal * 100).ToString("0")%>' color='666666'/>
     <% } %>           
    </graph>
<% } else { %>
<div class="vazio"></div>
<% } %>