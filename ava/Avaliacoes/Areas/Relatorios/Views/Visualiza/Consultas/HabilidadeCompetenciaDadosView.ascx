<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.RelatorioClassificacaoHabilidadeCompetenciaDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp.Entidade.Consulta" %>

<%
Model.AddColumn("Acertos","#66A966",(item) => item.Acertos);
Model.AddColumn("Erros", "#FF6669", (item) => item.Erros);
Model.AddColumn("Parcial", "#65C2FF", (item) => item.Parcial);
//TODO: verificar se estas áreas não deveriam vir do banco de dados
%>

<%if ( Model.PossuiDados ) { %>
<div data-tipo="grafico" data-grafico-tipo="MSColumn2D" data-grafico-width="650" data-grafico-height="350" data-grafico-nodata="<%: ViewData["GraficoNoData"] %>">
    <textarea name="chart">{ "showlabels": "1", "showvalues": "0" }</textarea>
    <textarea name="dataset"><%=Model.JsonDataSetFusionChart %></textarea>
    <textarea name="categories"><%=Model.JsonCategoriasFusionChart %></textarea>
</div>
<% } else { %>       
    <div class="grafico semDados"> <%: ViewData["HabilidadeCompetenciaNoData"] %> </div>
<%} %>
<div>
    <ul class="filtroGrafico">
        <label>
            <li class="<%=Model.Area == 1 ? "ativo" : "" %>">
                <%=Html.RadioButton("Consulta[Area]", 1, Model.Area == 1, new Dictionary<string, object> { { "data-change-submit", "true" }, { "id" , "" } })%> Linguagens, Códigos e suas Tecnologias
            </li>
        </label>
        <label>
            <li class="<%=Model.Area == 2 ? "ativo" : "" %>">
                <%=Html.RadioButton("Consulta[Area]", 2, Model.Area == 2, new Dictionary<string, object> { { "data-change-submit", "true" }, { "id", "" } })%> Matemática e suas Tecnologias
            </li>
        </label>
        <label>
            <li class="<%=Model.Area == 3 ? "ativo" : "" %>">
                <%=Html.RadioButton("Consulta[Area]", 3, Model.Area == 3, new Dictionary<string, object> { { "data-change-submit", "true" }, { "id", "" } })%> Ciências da Natureza
            </li>
        </label>
        <label>
            <li class="<%=Model.Area == 4 ? "ativo" : "" %>">
                <%=Html.RadioButton("Consulta[Area]", 4, Model.Area == 4, new Dictionary<string, object> { { "data-change-submit", "true" }, { "id", "" } })%> Ciências Humanas e suas Tecnologias
            </li>
        </label>
    </ul>
<%-- %>                
    <p>Realizações: <%=Model.Realizacoes %></p>
    <p>Realizadores: <%=Model.Realizalizadores %></p>
--%>
</div>
