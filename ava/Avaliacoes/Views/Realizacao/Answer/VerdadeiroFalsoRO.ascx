<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas">
    <ul id="alternativas">
<%  
    foreach (AlternativaView alternativa in Model)
    { %>
        <li class="Alternativa">
            <input type="hidden" name="idAlternativa" value="<%= alternativa.Id %>" />

            <div class="inputVF <%= alternativa.CssCorreta %>">
                <input type="radio" id="rdoAlternativa_V_<%= alternativa.Id %>" name="rdoAlternativa_<%= alternativa.Id %>" value="V" <%=alternativa.Disabled %> /><label for="rdoVerdadeira_<%= alternativa.Id %>">V</label>
            </div>
            <div class="inputVF  <%= alternativa.CssCorretaFalsa %>">
                <input type="radio" id="rdoAlternativa_F_<%= alternativa.Id %>" name="rdoAlternativa_<%= alternativa.Id %>" value="F" <%=alternativa.Disabled %> /><label for="rdoFalsa_<%= alternativa.Id %>">F</label>
            </div>
            <div class="alternativaConteudo">
                <div class="alternativa">(<%= alternativa.Letra %>)</div>
                <div class="textoVF mceView"><%= alternativa.Texto.HtmlTextoView%></div>
            </div>
                <% Html.RenderPartial(alternativa.BoxAreaComentarios, alternativa.ComentarioRealizada); %>

            <div class="clear"></div>
        </li>
<%  

    } %>
    </ul>
</div>