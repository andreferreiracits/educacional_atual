<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared " %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer " %>
<%
    using (Html.BeginForm("SalvarQuestao", "Questoes", FormMethod.Post, new { @id = "frmTipoQuestao" }))
    {
        %>
        <div class="areaTipoQuestao areaConfiguracoesQuestao">
            <%= Html.Hidden("txtIdQuestaoTipo", Model.Id) %>
            <% Html.RenderPartial(ViewData["FinalidadeView"].ToString(), Model);  %>
            <div class="linhaPar">
                <label class="questao" for="rdoTipoResposta_1">Escolha o tipo de questão:</label>
                <a id="helpTipoQuestao" class="btn sec_ajuda" href="javascript:void(0)">?</a>
                <div id="listaTipoQuestao">
                    <% Html.RenderPartial("Tipo/TrocaTipoQuestao", Model); %>
                </div>
            </div>
        </div>
        <div class="navegacaoBotoes">
            <div class="btnEspacamento">
                <%= Html.ActionLink("Cancelar", "Index", "Admin", new { @id = "btnCancelar", @class = "btnCancelar" })%>
            </div>
            <div class="btnEspacamento direita">
                <a id="btnAvancarTipo" class="btnNav">Avançar &raquo;</a>
            </div>
        </div>
        <%
    }
%>
