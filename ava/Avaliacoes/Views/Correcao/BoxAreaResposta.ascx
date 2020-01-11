<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RespostaAluno>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>

<div class="areaBoxRespotaAluno">
    <div class="boxRespotaAluno">
        <label for="txtRepostaAluno" class="ComentAluno">Resposta do aluno</label>
        <%= Model.Resposta %>
    </div>
</div>
<div class="areaBoxComentDocente">
    <div class="boxSugestaoDocente">
        <label for="txtCorrecaoDocente" class="ComentDocente">Comentário do professor</label>
        <%= Html.TextArea("txtCorrecaoDocente", Model.Correcao, new { @id = String.Format("txtCorrecaoDocente{0}", Model.IdQuestao), @cols = "74", @rows = "5", @class = "txtareaDocente", @maxchar = Model.LimiteDocente, @maxcharmsg = String.Format(Model.MsgLimiteDocente, Model.LimiteDocente) }) %>
    </div>
</div>
<div class="areaNotaAluno" style="padding-right: 15px;">
    <div class="valorQuestao">
        Valor da questão: <span><input type="text" name="valorResposta" readonly="readonly" value="<%= Model.ValorQuestao %>" /> ponto(s)</span>
    </div>
    <%
        if (Model.CorrecaoVO.Questao.Questao.Resposta is DiscursivaManual)
        {
            %>
            <p>Informe o percentual ou pontuação atingida pelo aluno:</p>
            <div class="boxSlider">
                <div class="sliderResposta"></div>
                <span class="sliderEsquerda">0%</span>
                <span class="sliderDireita">100%</span>
            </div>
            <div class="boxPontuacao">
                <input type="text" name="porcentagemResposta" class="txt" value="<%= Model.PorcentTaxa %>" /><span class="tMaior">%</span>
                <input type="text" name="pontosResposta" class="txt" value="<%= Model.Nota %>" /> <span>ponto(s)</span>
                <%= Html.ActionLink("confirmar", "ConfirmarResposta", "Correcao", new { id = Model.IdProva }, new { @class = "btn btnConfirmar" }) %>
            </div>
            <%
        }
        else
        {
            var resposta = (Redacao.RespostaQuestao) Model.CorrecaoVO.Questao.Resposta;
            var totalPeso = 0;
            %>
            <div id="boxCriteriosEliminacao">
                <a class="btn btnOcultarExibir">ocultar critérios de desclassificação</a>
                <table class="tabela" cellspacing="0" cellpadding="0" style="padding-top: 15px;">
                    <%
                        foreach (var criterio in resposta.CriteriosEliminacao)
                        {
                            var id = String.Format("r{0}c{1}", ViewData["r"], criterio.CriterioCorrecao.Criterio.Id);
                            %>
                            <tr>
                                <td width="90%" align="left">
                                    <label for="<%= id %>"><%= criterio.CriterioCorrecao.Criterio.Nome %></label>
                                </td>
                                <td width="10%" align="center">
                                    <input type="checkbox" id="<%= id %>" name="idCriterioElim" value="<%= criterio.CriterioCorrecao.Criterio.Id %>" <%= criterio.Desempenho > 0 ? "checked" : "" %> />
                                </td>
                            </tr>
                            <%
                        }
                    %>
                </table>
            </div>
            <p style="padding-top: 20px;">Informe o desempenho obtido pelo aluno em cada critério:</p>
            <div id="boxCriteriosCorrecao">
                <table class="tabela" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th width="80%" align="left"></th>
                            <th width="10%" align="center">Desempenho</th>
                            <th width="10%" align="center">Peso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <%
                            foreach (var criterio in resposta.CriteriosCorrecao)
                            {
                                if (criterio.CriterioCorrecao.Peso > 0)
                                {
                                    totalPeso += criterio.CriterioCorrecao.Peso;
                                    %>
                                    <tr>
                                        <td align="left">
                                            <%= criterio.CriterioCorrecao.Criterio.Nome %>
                                        </td>
                                        <td align="center">
                                            <input type="hidden" name="idCriterioCorrecao" value="<%= criterio.CriterioCorrecao.Criterio.Id %>" />
                                            <input type="text" name="txtDesempenho" value="<%= criterio.Desempenho.ToString("0.00") %>" class="txt centro" size="3" maxvalue="<%= criterio.CriterioCorrecao.Peso %>" />
                                        </td>
                                        <td align="center">
                                            <%= criterio.CriterioCorrecao.Peso %>
                                        </td>
                                    </tr>
                                    <%
                                }
                            }
                        %>
                    </tbody>
                </table>
                <div style="width: 100%; padding-top: 10px;">
                    <span style="float: left; width: 80%; text-align: right;">TOTAL:</span>
                    <span style="float: left; width: 9%; text-align: center; margin-left: 5px;" class="lbl-desempenho">0</span>
                    <span style="float: left; width: 2%; text-align: left;">de</span>
                    <span style="float: left; width: 4%; text-align: right;" class="lbl-peso"><%= totalPeso %></span>
                    <span style="float: right; width: 4%; text-align: right;" class="lbl-percentual">(0%)</span>
                </div>
                <div style="width: 100%; padding-top: 10px;">
                    <span style="float: left; width: 80%; text-align: right;">NOTA:</span>
                    <span style="float: left; width: 9%; text-align: center; margin-left: 5px;" class="lbl-nota">0</span>
                    <span style="float: left; width: 2%; text-align: left;">de</span>
                    <span style="float: left; width: 4%; text-align: right;"><%= Model.ValorQuestao %></span>
                    <span style="float: right; width: 4%; text-align: right;" class="lbl-percentual">(0%)</span>
                </div>
                <div style="clear: both; text-align: right; padding-top: 20px;">
                    <a class="btn btnConfirmar">confirmar</a>
                </div>
            </div>
            <%
        }
    %>
    <div class="clear"></div>
</div>