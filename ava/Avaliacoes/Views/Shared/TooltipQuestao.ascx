<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<div id="tooltipQuestao">
    <div class="tooltipArea">
        <h1>Tipo de Questão:</h1>
        <div class="tooltipAreaContent">
            <p>Tipo de questao: <span><%= Model.TipoResposta %></span></p>
            <p>Finalidade: <span><%= Model.NomeTipoBanco %></span></p>
        </div>
    </div>
    <% Html.RenderPartial(Model.BoxEnunciadoBaseTooltip, Model); %>
    <div class="tooltipArea">
        <h1>Enunciado:</h1>
        <div class="mceView">
            <%= Model.Enunciado.Texto.TextoView %>	    
        </div>
        <div class="clear"></div>
        <% Html.RenderPartial("ComentarioReadOnly", Model.Enunciado.Comentario); %>
    </div>
    <%
        if (Model.TipoRespostaView.ViewAlternativaRO != "Vazia")
        {
            %>
                <div class="tooltipArea areaRespostas">
                    <%
                        if (!(Model.TipoRespostaView.TipoView is ProvaColegiada.TabelaViews.Answer.RedacaoView))
                        {
                            %>
                                <h1>Respostas:</h1>
                            <%
                        }
                    %>
                    <% Html.RenderPartial(Model.TipoRespostaView.ViewAlternativaRO, Model); %>
                    <div class="clear"></div>
                </div>
            <%
        }
    %>
</div>