﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.RespostaAluno>>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" naocorrigidas="<%= ViewData["naocorrigidas"] %>" corrigidas="<%= ViewData["corrigidas"] %>" todas="<%= ViewData["total"] %>">
    <% Html.RenderPartial("Filtro", Model.Filtros); %>
    <tbody>
        <%
            int i = 0;
            if (Model != null &&  Model.Linhas.Count > 0)
            {
                foreach (RespostaAluno resposta in Model.Linhas)
                {
                    var idTipoResposta = resposta.CorrecaoVO.Questao.Questao.TipoResposta.Id;
                    %>
                    <tr>
                        <td>
                            <div id="r<%= i++ %>" idtiporesposta="<%= idTipoResposta %>" class="boxRespostaAluno <%= resposta.CssCorrigida %>">
                                <%= Html.Hidden("hidIdProvaRealizada", resposta.IdProva) %>
                                <div class="infoQuestaoAluno">
	                                <div class="tituloQuestaoAluno">Resposta do aluno</div>
                                    <div class="nomeQuestaoAluno"><strong><%= resposta.Nome %></strong> - <%= resposta.Turma %></div>
                                </div>
                                <% ViewData["r"] = i; %>
                                <% Html.RenderPartial("BoxAreaResposta", resposta); %>
                            </div>
                        </td>
                    </tr>
                    <%
                }
            }
            else
            {   
                %>
                <tr class="vazio">
                    <td>
                        <div class="boxRespostaAlunoVazio">Nenhuma questão encontrada.</div>
                    </td>
                </tr>
                <%
            }
        %>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>