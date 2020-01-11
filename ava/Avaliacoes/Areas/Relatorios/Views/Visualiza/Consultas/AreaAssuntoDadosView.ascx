<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.RelatorioClassificacaoAreaAssuntoDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp.Entidade.Consulta" %>

<%
Model.AddColumn("Acertos","#66A966",(item) => item.Acertos);
Model.AddColumn("Erros", "#FF6669", (item) => item.Erros);
Model.AddColumn("Parcial", "#65C2FF", (item) => item.Parcial);
%>

<%if ( Model.PossuiDados ) { %>
    <div data-tipo="grafico" data-grafico-tipo="MSColumn2D" data-grafico-width="700" data-grafico-height="350" data-grafico-nodata="<%: ViewData["GraficoNoData"] %>">
        <textarea name="chart">{ "showlabels": "0", "showvalues": "0" }</textarea>
        <textarea name="dataset"><%=Model.JsonDataSetFusionChart %></textarea>
        <textarea name="categories"><%=Model.JsonCategoriasFusionChart %></textarea>
    </div>
    <%--<div>
        <p>Realizações: <%=Model.Realizacoes %></p>
        <p>Realizadores: <%=Model.Realizalizadores %></p>
    </div>--%>
<% } else { %>       
   <div class="grafico semDados"> <%: ViewData["AreaAssuntoNoData"] %> </div>
<%} %>