<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<div id="tooltipQuestao">
    <div class="areaEnunciado ConfirmaQuestao">
        <div class="SEC02511_titulo">Enunciado:</div>
        <div class="areaTextoEnunciado mceView">
            <%= Model.Enunciado.Texto.TextoView %>	    
        </div>
    
        <div class="clear"></div>
        
        <% Html.RenderPartial("ComentarioReadOnly", Model.Enunciado.Comentario); %>
    </div>
    
    <div>
    <%Html.RenderAction("QuestaoPaiRelacionadas", new { @id = Model.Id }); %>
    </div>
    <div class="clear"></div>
</div>