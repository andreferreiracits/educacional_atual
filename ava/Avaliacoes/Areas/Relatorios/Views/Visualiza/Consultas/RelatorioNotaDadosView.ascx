<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta.RelatorioNotaDadosView>" %>
<%@ Import Namespace="Avaliacaoes.Componentes.Relatorios.Models.Entidades.Consulta" %>
<%@ Import Namespace="Avaliacoes.Servicos.Relatorios.Imp.Entidade.Consulta" %>
<%@ Import Namespace="Avaliacoes.Framework.Utils.Entidades" %>

<%
    if ( Model.Itens.Count > 0 )
    {
        %>
            <div class="oitabelaRelatorioNotaDados" data-tipo="especificoTabelaRelatorioNotas" id="oiTabela">
                <div class="outer">
                    <div class="inner">
                        <% Html.RenderPartial("../Visualiza/Consultas/TabelaNotaDadosView", Model); %>
                    </div>
                </div>
            </div>
            <div id="oiTabelaPaginacao" class="ferramentas">
                <div class="resultado"><%= Model.Paginacao.TextoTotal %></div>
                <div class="paginacao">
                    <%
                        if ( Model.Paginacao != null && Model.Paginacao.ListaPaginas.Count > 0 )
                        {
                            %>
                                <div data-tabela-elemento="paginador" data-tabela-atual="Paginacao[Atual]">
                                    <a class="descricao"><%= Model.Paginacao.TextoDescricao %></a>
                                    <%= Html.Hidden("Paginacao[Atual]", Model.Paginacao.Atual) %> 
                                    <%
                                        foreach (Avaliacoes.Framework.Utils.Entidades.Lista.Paginacao.Pagina pagina in Model.Paginacao.ListaPaginas)
                                        {
                                            %>
                                                <a class="<%= pagina.Estilo %>" href="javascript:void(0);" data-pagina="<%= pagina.Numero %>"><%= pagina.Texto%></a>
                                            <%
                                        }
                                    %>
                                </div>
                            <%
                        }
                    %>
                </div>
            </div>
            <span class="infoExtraTabela">
                <span class="obrigatorio vermelho">*</span> A média é calculada pelo número de avaliações agendadas para o aluno
            </span>
        <%
    }
    else
    {
        %>
            <div class="grafico semDados"><%= ViewData["NotasNoData"] %></div>
        <%
    }
%>