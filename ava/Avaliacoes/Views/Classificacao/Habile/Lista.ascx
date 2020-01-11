<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.TabelaPaginada<ProvaColegiada.Models.Classificacao.AbstractClassificacao>>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">    
    <tbody>
        <%
            if (Model != null && Model.Linhas.Count > 0)
            {
                foreach (HabileClassificacao classificacao in Model.Linhas)
                {
                    %>
                        <tr>
                            <td style='width:15%;'>
                                <a class="lnk"><%= classificacao.Matriz.Nome%></a>
                                <div class="botoes">
                                    <a href="classHabile.EditarClassificacaoQuestao(<%=classificacao.Id %>)" class= "btn funcao">Editar</a>
                                    <%= Html.ActionLink("Excluir", "ExcluirTipoClassificacao", new { @id = classificacao.Id }, new { @class = "btnExcluir" })%>
                                </div>
                            </td>
                            <td style='width:15%;'>
                                <%= classificacao.Habilidade.Competencia.Nome%>
                            </td>
                            <td style='width:35%;'>
                                <%= classificacao.Habilidade.Codigo%> - <%= classificacao.Habilidade.Descricao%>
                            </td>
                            <td style='width:10%;'>
                                <%
                                    foreach (var eixo in classificacao.Habilidade.Eixos)
                                    {
                                        %>
                                            <p><%= eixo.Nome %></p>
                                        <%
                                    }
                                %>
                            </td>
                            <td style='width:15%;'>
                                <%
                                    foreach (var procCog in classificacao.Habilidade.ProcessosCognitivos)
                                    {
                                        %>
                                            <p><%= procCog.Nome %></p>
                                        <%
                                    }
                                %>
                            </td>
                            <td style='width:10%;'>
                                <%
                                    foreach (var sitUso in classificacao.SituacoesUso)
                                    {
                                        %>
                                            <p><%= sitUso.Nome %></p>
                                        <%
                                    }    
                                %>
                            </td>
                        </tr>    
                    <%
                }
            }
            else
            {
                %>
                <tr class="vazio">
                    <td colspan="2">Nenhum assunto selecionado.</td>
                </tr>
                <%
            }    
        %>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>
