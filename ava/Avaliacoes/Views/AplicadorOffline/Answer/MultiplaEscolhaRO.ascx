<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<div class="areaAlternativas">
    <ul id="alternativas">
<%  foreach(AlternativaView alternativa in Model) { %>
        <li class="Alternativa">
            <div class="naomarcouAlternativa"></div>
            <div class="input">
                <input class="inputAlternativa" type="checkbox" id="rdoAlternativa_<%= alternativa.Id %>" name="rdoAlternativa" value="<%= alternativa.Id %>" />
            </div>
            <div class="alternativaConteudo">
                <div class="alternativa"><label for="rdoAlternativa_<%= alternativa.Id %>" class="clickAlternativa">(<%= alternativa.Letra%>)</label></div>
                <div class="texto mceView"><label for="rdoAlternativa_<%= alternativa.Id %>" class="clickAlternativa"><%= alternativa.Texto.TextoView %></label></div>
            </div>
            <% Html.RenderPartial("../AplicadorOffline/BoxAreaComentarios", new {}); %>
            <div class="clear"></div>
        </li>
<%  } %>
    </ul>
</div>