<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.MultiplaEscolhaOpiniaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas">
    <ul id="alternativas">
<%  Model.IniciaLetra();
    foreach(Alternativa alternativa in Model.Alternativas) { %>
        <li class="Alternativa <%= Model.EstiloAlternativaSelecionada(alternativa.Id) %> <%= Model.CssTxtCorreta(alternativa) %>">
            <div class="<%= Model.CssAlternativaCorrecao(alternativa) %>">
            </div>
            <div class="input">
                <input type="checkbox" id="rdoAlternativa_<%= alternativa.Id %>" name="rdoAlternativa" value="<%= alternativa.Id %>" <%= Model.AlternativaSelecionada(alternativa.Id) %> <%=Model.Disabled %>   class="<%=Model.HideInput %>" />
            </div>
            <div class="alternativaConteudo">
                <div class="alternativa"><label for="rdoAlternativa_<%= alternativa.Id %>" class="clickAlternativa">(<%= Model.Letra %>)</label></div>
                <div class="texto mceView"><label for="rdoAlternativa_<%= alternativa.Id %>" class="clickAlternativa"><%= alternativa.Texto.HtmlTextoView%></label></div>
            </div>
            <% Html.RenderPartial("BoxAreaComentarios", Model.ComentarioAlternativa(alternativa)); %>
            <div class="clear"></div>
        </li>
<%  
        Model.ProximaLetra();
    } %>
    </ul>
</div>
<% Html.RenderPartial(Model.ViewGrafico); %>