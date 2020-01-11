<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.AplicacaoCorrecaoVOView>>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>" width="100%">
    <% Html.RenderPartial("NovoFiltro", Model.Filtros); %>
    <tbody>
        <%
            if (Model == null || Model.Linhas.Count == 0)
            {
                %>
                <tr class="vazio">
                    <td colspan="6">
                        Nenhuma prova encontrada.
                    </td>
                </tr>
                <%
            }
            else
            {
                foreach (var linha in Model.Linhas)
                {
                    %>
                    <tr class="alturaLinhaAplicacao">
                        <td class="selecionar" width="5%">
                            <%= Html.Hidden("chkAplicacao.Value", String.Format("{0}", linha.Id)) %>
                            <%= Html.CheckBox("chkAplicacao.Checked", false) %>
                        </td>
                        <td>
                            <a class="lnk">
                                <%= (linha.TamanhoTitulo == 0) ? ("<em class=\"semEnunciado\">" + linha.Titulo + "</em>") : Html.Encode(linha.Titulo) %>
                            </a>
                            <div class="botoes">
                                <%= Html.ActionLink("Corrigir", "Aplicacao", new { @id = linha.Id.ToString() }, new { @class = "btn normal" }) %>
                                <%
                                    if (linha.ShowAnular)
                                    {
                                        %>
                                        <a href="AnularQuestao(<%= linha.Id.ToString() %>)" class="btn funcao">Anular Questão</a>
                                        <%
                                    }
                                %>
                            </div>
                        </td>
                        <td>
                            <%= Html.Encode(linha.RealizacaoInicio) %>
                        </td>
                        <td>
                            <%= Html.Encode(linha.RealizacaoFim) %>
                        </td>
                        <td>
                            <%= Html.Encode(linha.TxtPendentes) %>
                        </td>
                    </tr>
                    <%
                }
            }
        %>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>
