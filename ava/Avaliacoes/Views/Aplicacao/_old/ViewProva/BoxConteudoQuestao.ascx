<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.VisualizacaoProvaView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div id="infoQuestao">
<div class="areaEnunciado ConfirmaQuestao">

    <% if (Model.Questao.TemQuestaoPai){%>
        <div id="btnQuestaoPai" class="btnQuestaoPai"><div id="imgBtnQuestaoPai" class="imagemMenos"></div></div>
        <div id="boxQuestaoPai" class="boxQuestaoPai">
            <div class="areaEnunciado mceView">
                <%= (Model.Questao.EnunciadoPai.Texto.TemHtml) ? Model.Questao.EnunciadoPai.Texto.Html : Model.Questao.EnunciadoPai.Texto.Plano%>
            </div>
        </div>
    <%} %>
    <div class="areaEnunciado mceView">
        <%= (Model.Questao.Enunciado.Texto.TemHtml) ? Model.Questao.Enunciado.Texto.Html : Model.Questao.Enunciado.Texto.Plano%>
    </div>
	
	<% Html.RenderPartial(Model.ViewBoxAreaComentarios, ((QuestaoView)Model.Questao).ComentarioRealizada); %>
</div>         
<div class="areaRespostas">

<%
            
    Html.RenderPartial(Model.ViewAlternativaRO, ((QuestaoView)Model.Questao).Alternativas);

    // Especial para Associativa
    //TODO: Tratar TipoResposta.Associativa
    if (Model.Questao.TipoResposta == ProvaColegiada.Models.Question.Answer.TipoResposta.Associativa)
    {
        QuestaoView obj = (QuestaoView)Model.Questao;
        Html.RenderPartial("../Realizacao/Answer/AssociativaDireitaRO", ((ProvaColegiada.TabelaViews.Answer.AssociativaView)obj.TipoRespostaView.TipoView).AlternativasDireita(obj.Questao));
    }
        
    
    
    //Html.RenderPartial(Model.ViewAlternativaRO, null);

%>


</div>
</div>
