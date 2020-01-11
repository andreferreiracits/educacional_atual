<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.RelatorioCompletoPesquisaOpiniaoDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp.Entidade.Consulta" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.DAO.Consultas" %>

<%if ( Model.Itens.Count > 0 ) { %>


<% Html.RenderPartial("../Visualiza/Consultas/TabelaCompletoPesquisaOpiniaoDadosView", Model); %>

<div id="oiTabelaPaginacao" class="ferramentas">
    <div class="resultado"> <%= Model.Paginacao.TextoTotal%> </div>
    <div class="paginacao">
        <% if ( Model.Paginacao != null && Model.Paginacao.ListaPaginas.Count > 0 ) { %>
            <div data-tabela-elemento="paginador" data-tabela-atual="Paginacao[Atual]">
                <a class="descricao"><%= Model.Paginacao.TextoDescricao %></a>
                <%=Html.Hidden("Paginacao[Atual]", Model.Paginacao.Atual)%> 
                <%  foreach (Avaliacoes.Framework.Utils.Entidades.Lista.Paginacao.Pagina pagina in Model.Paginacao.ListaPaginas) { %>
                    <a class="<%=pagina.Estilo %>" href="javascript:void(0);" data-pagina="<%= pagina.Numero %>"><%= pagina.Texto%></a>
                <%  } %>
            </div>
        <% } %>
    </div>
</div>

<% } else { %>       
    <div class="grafico semDados"> <%: ViewData["NotasNoData"]%> </div>
<%} %>


