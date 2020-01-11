<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<%
    var redacao = (Redacao) Model.Questao.Resposta;
%>
<%--
<%
    if (Model.Alternativas.Count > 0)
    {
        AlternativaView alternativa = Model.Alternativas[0];
        %>
            <li id="alternativa_<%= alternativa.Id %>" class="Alternativa <%= alternativa.Css %> DiscursivaManual">
                <div class="opcaoCampo opcaoCampoDiscursivaManual">
                    <input type="hidden" id="hidTemHtml_<%= alternativa.Id %>" name="hidTemHtml" value="<%= (alternativa.Texto.TemHtml || alternativa.Texto.Plano == "" ) ? "1" : "0" %>" />
    	            <%= Html.TextArea("txtAlternativa", (alternativa.Texto.TemHtml) ? alternativa.Texto.Html : alternativa.Texto.Plano, new { @id = "txtAlternativa" + alternativa.Id, @cols = "74", @rows = "18", @class = "txtareaResposta txtareaRespostaDiscursivaManual " + alternativa.Estilo, @maxchar = alternativa.Limite, @maxcharmsg = String.Format(Model.MsgLimiteCharAlternativa, alternativa.Limite) })%>
                    <ul class="opcoesAdicionais">                
                        <input type="hidden" id="rdoCorreta_<%= alternativa.Id %>" name="rdoCorreta" value="<%= alternativa.Id %>" <%= alternativa.Checked %>/>
                        <li class="editorTxt"><a title="Permite apenas texto puro sem formatação. A formatação atual será perdida.">Editor texto</a></li>
                        <li class="editorHtml"><a title="Permite a formatação do texto (negrito. itálico, etc.) e a inclusão de recursos como imagens, simuladores e fórmulas matemáticas.">Editor HTML</a></li>
                        <li class="comentAluno"><a>(Inserir|Exibir|Ocultar) Comentário</a></li>
                        <li class="comentDica"><a>(Inserir|Exibir|Ocultar) Dica</a></li>
                        <li class="comentProf"><a>(Inserir|Exibir|Ocultar) Sugestão para professor</a></li>
                    </ul>
                </div>
                <div class="clear"></div>
                <% Html.RenderPartial("Comentario", alternativa.Comentario); %>
            </li>
        <%
    }
%>
--%>
<div class="divisaoQuestao">
    <h2 class="tituloDivisao">Critérios</h2>
    <span class="textoDivisao">Utilize uma das opções abaixo como base para a correção da questão do aluno.</span>
    <a id="helpCadCritQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
</div>
<div id="boxCriterios">
    <ul class="criteriosOpcoes">
        <li class="opcaoEnem">
            <a class="<%= redacao.CriteriosEnem.Count() > 0 ? "ativo" : "" %>" id="btnCriteriosEnem">CRITÉRIOS DO ENEM</a>
        </li>
        <li class="opcaoSugeridos">
            <a class="<%= redacao.CriteriosEnem.Count() == 0 ? "ativo" : "" %>" id="btnCriteriosSugeridos">CRITÉRIOS SUGERIDOS</a>
        </li>
    </ul>
</div>
<div id="boxCriterios-detalhes">
    <div class="tarja">
        <span class="competencia">Competência</span>
        <span class="peso">Peso</span>
    </div>
    <div id="boxCriteriosObr">
        <% Html.RenderPartial("Answer/AlternativaRedacaoCriteriosObrigatorios", Model); %>
    </div>
    <div id="boxCriteriosElim">
        <div class="tarja">
            Critérios de eliminação
        </div>
        <input type="hidden" name="etapaEstrutura" value="1" />
        <table class="tabela" cellspacing="0" cellpadding="0">
            <tbody>
                <%
                    foreach (var criterio in Model.CriteriosGlobais.CriteriosEliminacao)
                    {
                        %>
                            <tr>
                                <td>
                                    <input type="checkbox" id="c<%= criterio.Id %>" name="idCriterioElim" value="<%= criterio.Id %>" <%= redacao.GetPeso(criterio.Id) > 0 ? "checked" : "" %> />
                                </td>
                                <td>
                                    <label for="c<%= criterio.Id %>"><%= criterio.Nome %></label>
                                </td>
                            </tr>
                        <%
                    }
                %>
            </tbody>
        </table>
    </div>
</div>