<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="colunaAssoE">
<div class="areaAlternativas">
    <ul id="alternativas">
<%  
    foreach(AlternativaView alternativa in Model) { %>
        <li class="Alternativa">
            <div class="alternativa">(<%= alternativa.Letra %>)</div>
            <div class="texto mceView"><%= alternativa.Texto.HtmlTextoView%></div>
            <div class="clear"></div>
        </li>
<%  
    } %>
    </ul>
</div>
</div>