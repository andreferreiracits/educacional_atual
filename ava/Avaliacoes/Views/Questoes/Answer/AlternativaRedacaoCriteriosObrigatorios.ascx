<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<%
    var redacao = (Redacao) Model.Questao.Resposta;
    var peso = 0;
    var total = 0;
%>
<input type="hidden" id="tipoCriterio" value="<%= redacao.CriteriosEnem.Count() > 0 ? "enem" : "sugerido" %>" />
<%
    if (redacao.CriteriosEnem.Count() > 0)
    {
        %>
        <table class="tabela" cellspacing="0" cellpadding="0">
            <tbody>
                <%
                    foreach (var criterio in Model.CriteriosGlobais.CriteriosEnem)
                    {
                        peso = redacao.GetPeso(criterio.Id);
                        total += peso;
                        %>
                        <tr>
                            <td style="padding: 15px;">
                                <%= criterio.Nome %>
                            </td>
                            <td style="padding: 15px;">
                                <input type="hidden" name="idCriterioObr" value="<%= criterio.Id %>" />
                                <input type="text" name="pesoCriterioObr" value="<%= peso %>" size="3" class="txt centro"/>
                            </td>
                        </tr>
                        <%
                    }
                %>
            </tbody>
        </table>
        <%
    }
    else
    {
        %>
        <table class="tabela" cellspacing="0" cellpadding="0">
            <tbody>
                <%
                    foreach (var criterio in Model.CriteriosGlobais.CriteriosSugeridos)
                    {
                        peso = redacao.GetPeso(criterio.Id);
                        total += peso;
                        %>
                        <tr>
                            <td>
                                <input type="checkbox" id="cs<%= criterio.Id %>" <%= peso > 0 ? "checked" : "" %> />
                            </td>
                            <td>
                                <label for="cs<%= criterio.Id %>"><%= criterio.Nome %></label>
                            </td>
                            <td>
                                <input type="hidden" name="idCriterioObr" value="<%= criterio.Id %>" <%= peso == 0 ? "disabled" : "" %> />
                                <input type="text" name="pesoCriterioObr" value="<%= peso %>" <%= peso == 0 ? "disabled" : "" %> size="3" class="txt centro"/>
                            </td>
                        </tr>
                        <%
                    }
                    foreach (var criterio in redacao.CriteriosUsuario)
                    {
                        total += criterio.Peso;
                        %>
                        <tr>
                            <td>
                                <input type="checkbox" id="cu<%= criterio.Criterio.Id %>" <%= criterio.Peso > 0 ? "checked" : "" %> />
                            </td>
                            <td>
                                <label for="cu<%= criterio.Criterio.Id %>"><%= criterio.Criterio.Nome %></label>
                                <div class="botoes">
                                    <a href="javascript:void(0)" data-criterio-id="<%= criterio.Criterio.Id %>" class="btn edit">editar</a>
                                    <a href="javascript:void(0)" data-criterio-id="<%= criterio.Criterio.Id %>" class="btnExcluir remove">excluir</a>
                                </div>
                            </td>
                            <td>
                                <input type="hidden" name="idCriterioObr" value="<%= criterio.Criterio.Id %>" <%= criterio.Peso == 0 ? "disabled" : "" %> />
                                <input type="text" name="pesoCriterioObr" value="<%= criterio.Peso %>" <%= criterio.Peso == 0 ? "disabled" : "" %> size="3" class="txt centro"/>
                            </td>
                        </tr>
                        <%
                    }
                %>
                <tr id="boxNovoCriterio">
                    <td></td>
                    <td>
                        <a id="btnNovoCriterio" href="javascript:void(0)" class="btn">crie seu critério</a>
                    </td>
                    <td></td>
                </tr>
                <tr id="boxSalvarCriterio" style="display: none;">
                    <td>
                        <input type="checkbox" id="ckbNovoCriterio" checked />
                    </td>
                    <td>
                        <input type="text" id="txtNomeCriterio" class="txt" style="width: 82%" />
                        <a id="btnSalvarCriterio" href="javascript:void(0)" class="btn">salvar</a>
                        <a id="btnCancelar" href="javascript:void(0)" class="btnExcluir">cancelar</a>
                    </td>
                    <td>
                        <input type="text" id="txtPesoCriterio" value="20" size="3" class="txt centro" />
                    </td>
                </tr>
            </tbody>
        </table>
        <%
    }
%>
<div style="width:100%; height:25px; line-height:25px; font-weight:bold; display: table; text-align:center;">
    <span style="display: table-cell; vertical-align: middle; padding-left: 15px; text-align: left;">TOTAL</span>
    <span id="lblTotal" style="display: table-cell; vertical-align: middle; padding-right: 30px; text-align: right;"><%= total %></span>
</div>