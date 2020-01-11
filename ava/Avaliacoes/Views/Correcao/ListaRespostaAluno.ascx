<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.RespostaAluno>>" %>
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
                                <%= Html.Hidden("hidIdQuestao", resposta.IdQuestao) %>
                                <div class="infoQuestaoAluno">
	                                <div class="tituloQuestaoAluno">Questão</div>
                                    <a class="btn direita btnOcultarEnunciado" id="btnOcultarEnunciado<%= i %>">
                                        <span class="btn_setaUP">Ocultar</span>|<span class="btn_setaDown">Expandir</span>
                                    </a>
                                </div>
                                <div class="boxQuestao">
						            <div class="textoQuestao mceView boxEnunciadoReduzido" id="boxEnunciadoReduzido<%= i %>"><%= Html.Encode(resposta.EnunciadoReduzido) %></div>
                                    <div class="textoQuestao mceView boxEnunciado" id="boxEnunciado<%= i %>"><%= resposta.EnunciadoView %></div>
					            </div>
                                <%
                                    if (!String.IsNullOrWhiteSpace(resposta.SugestaoProfessor))
                                    {
                                        %>
					                    <div class="areaBoxComentProf">
						                    <div class="boxSugestaoProfessor">
							                    <label class="ComentProf">Resposta modelo</label>
							                    <%= resposta.SugestaoProfessor %>
						                    </div>
					                    </div>
                                        <%
                                    }
                                %>
                                <% ViewData["r"] = i; %>
                                <% Html.RenderPartial("BoxAreaResposta", resposta); %>
                            </div>
                        </td>
                    </tr>
                    <%
                }
            }
            else
            {   %>
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