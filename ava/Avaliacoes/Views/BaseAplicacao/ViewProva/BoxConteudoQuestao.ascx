<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.VisualizacaoProvaView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>

<div id="infoQuestao">
    <div class="areaEnunciado ConfirmaQuestao">
        <%
            if ( Model.Questao.TemQuestaoBase )
            {
                %>
                    <div id="btnQuestaoPai" class="btnQuestaoPai">
                        <div id="imgBtnQuestaoPai" class="imagemMenos"></div>
                    </div>
                    <div id="boxQuestaoPai" class="boxQuestaoPai">
                        <%
                            foreach ( var e in Model.Questao.EnunciadoBase )
                            {
                                %>
                                    <div class="separadorQuestaoBase"></div>
                                    <div class="areaEnunciado mceView">
                                        <%= e.Texto.TextoView %>
                                    </div>
                                <%
                            }
                        %>
                    </div>
                <%
            }
        %>
        <div class="areaEnunciado mceView">
            <%= Model.InstiuicaoEnunciado %>
            <%= Model.Questao.Enunciado.Texto.TextoView %>
        </div>
	    <% Html.RenderPartial(Model.ViewBoxAreaComentarios, ((QuestaoView)Model.Questao).ComentarioRealizada); %>
    </div>         
    <div class="areaRespostas">
        <%
            ViewData["idQuestao"] = Model.ItemAtual.IdQuestao;
            Html.RenderPartial(Model.ViewAlternativaRO, ((QuestaoView)Model.Questao).Alternativas);
            // Especial para Associativa
            //TODO: Tratar TipoResposta.Associativa
            if (Model.Questao.TipoResposta == ProvaColegiada.Models.Question.Answer.TipoResposta.Associativa)
            {
                QuestaoView obj = (QuestaoView)Model.Questao;
                Html.RenderPartial( Model.ViewAlternativaDireitaRO, ((ProvaColegiada.TabelaViews.Answer.AssociativaView)obj.TipoRespostaView.TipoView).AlternativasDireita(obj.Questao));
            }
        %>
    </div>
    <% Html.RenderPartial(Model.BoxInfoQuestao, Model); %>
</div>
