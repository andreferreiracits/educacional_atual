<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas">
    <ul id="alternativas">
    <% foreach(AlternativaView alternativa in Model) { %>
        <li class="Alternativa <%= alternativa.CssCorreta %>">
            <div class="input">
                <input type="radio" id="rdoAlternativa_<%= alternativa.Id %>" name="rdoAlternativa" value="<%= alternativa.Id %>"  <%=alternativa.Disabled %> />
            </div>
            <div class="alternativaConteudo">
                <div class="alternativa">(<%= alternativa.Letra %>)</div>
                <div class="texto mceView"><%= alternativa.Texto.HtmlTextoView%></div>
            </div>
            <% Html.RenderPartial(alternativa.BoxAreaComentarios, alternativa.ComentarioRealizada); %>
            <div class="clear"></div>
        </li>
    <%  } %>
    </ul>
</div>