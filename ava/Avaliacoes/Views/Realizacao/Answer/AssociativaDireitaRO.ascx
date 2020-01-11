<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<div class="colunaAssoD">
<div class="areaAlternativas">
    <ul id="alternativas">
<%  
    foreach(AlternativaView alternativa in Model) { %>
        <li class="Alternativa <%= alternativa.CssCorreta %>">
            <div class="alternativa">[<%= alternativa.LetraAssociado %>]</div>
            <div class="texto mceView"><%= alternativa.Texto.HtmlTextoView%></div>
            <div class="clear"></div>
        </li>
<%  
    } %>
    </ul>
</div>
</div>