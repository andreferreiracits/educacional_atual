<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>


<% if (Model.EnunciadoPai != null)
    { %>
    <div class="tooltipArea">
        <h1>Enunciado Base:</h1>
        <div class="mceView">
            <%= Model.EnunciadoPai.Texto.TextoView %>	    
        </div>
    </div>
<% } %>
        