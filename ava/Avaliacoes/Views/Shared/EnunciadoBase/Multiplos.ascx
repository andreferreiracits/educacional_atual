<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>


<% if (Model.Questao.QuestoesBase.Count > 0)
    { %>
    <div class="tooltipArea">
        <h1>Enunciado Base:</h1>
        <% foreach (Questao questao in Model.Questao.QuestoesBase)
           {
           %>
           <div class="mceView multiploEnunciadoBase">
                <%= questao.Enunciado.TextoView %>	    
            </div>
           <%
           } %>
        
    </div>
<% } %>
        