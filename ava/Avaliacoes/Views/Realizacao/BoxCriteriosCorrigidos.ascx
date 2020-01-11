<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.RedacaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%
    var resposta = (Redacao.RespostaQuestao) Model.Questao.Resposta;
    var foiEliminada = resposta.CriteriosEliminacao.Sum(x => x.Desempenho) > 0;
    int totalPeso = 0;
    decimal totalDesempenho = 0;
%>
<div class="corrigidos">
    <%
        if (foiEliminada)
        {
            %>
                <div class="eliminacao">
                    <ul>
                        <li>Sua redação foi eliminada pelo(s) seguinte(s) motivo(s):</li>
                        <%
                            foreach (var item in resposta.CriteriosEliminacao.Where(x => x.Desempenho > 0))
                            {
                                %>
                                    <li>- <%= item.CriterioCorrecao.Criterio.Nome %></li>
                                <%
                            }
                        %>
                    </ul>
                </div>
            <%
        }
        else
        {
            %>
                <div class="correcao">
                    <div><b>Desempenho por critérios de correção:</b></div>
                    <table cellpadding="0" cellspacing="0">
                        <thead>
                            <tr>
                                <th width="70%" align="left"></th>
                                <th width="10%" align="center">Desempenho</th>
                                <th width="03%" align="center"></th>
                                <th width="10%" align="center">Peso</th>
                                <th width="07%" align="center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <%
                                foreach (var item in resposta.CriteriosCorrecao)
                                {
                                    if (item.CriterioCorrecao.Peso > 0)
                                    {
                                        totalPeso += item.CriterioCorrecao.Peso;
                                        totalDesempenho += item.Desempenho;
                                        %>
                                            <tr>
                                                <td align="left"><%= item.CriterioCorrecao.Criterio.Nome %></td>
                                                <td align="center"><%= item.Desempenho.ToString("0.00") %></td>
                                                <td align="center"></td>
                                                <td align="center"><%= item.CriterioCorrecao.Peso %></td>
                                                <td align="center"></td>
                                            </tr>
                                        <%
                                    }
                                }
                            %>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td align="right"><b>TOTAL:</b></td>
                                <td align="center"><%= totalDesempenho.ToString("0.00") %></td>
                                <td align="center">de</td>
                                <td align="center"><%= totalPeso %></td>
                                <td align="center">(<%= Math.Round(totalDesempenho / totalPeso * 100)%>%)</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            <%
        }
    %>
</div>
