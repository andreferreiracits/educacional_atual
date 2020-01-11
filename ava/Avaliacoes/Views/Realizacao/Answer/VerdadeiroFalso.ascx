<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.VerdadeiroFalsoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas">
    <ul id="alternativas">
<%  
    Model.IniciaLetra();
    foreach(Alternativa alternativa in Model.Alternativas) { %>
        <li class="Alternativa">
            <div class="<%= Model.CssAlternativaCorrecao(alternativa) %>"> </div>
            <input type="hidden" name="idAlternativa" value="<%= alternativa.Id %>" />
            <input type="hidden" id="rdoVerdadeira_<%= alternativa.Id %>" name="rdoVerdadeira" value="<%=Model.IdVerdadeiroSelecionada(alternativa.Id)%>"/>
            <input type="hidden" id="rdoFalsa_<%= alternativa.Id %>" name="rdoFalsa" value="<%=Model.IdFalsaSelecionada(alternativa.Id)%>"/>

            <div class="inputVF <%= Model.CssInputCorreta(alternativa) %> <%=Model.EstiloVerdadeiraSelecionada(alternativa.Id) %>">
                <input type="radio" id="rdoAlternativa_V_<%= alternativa.Id %>" name="rdoAlternativa_<%= alternativa.Id %>" value="V" <%= Model.VerdadeiroSelecionada(alternativa.Id) %> <%=Model.Disabled %>   class="<%=Model.HideInput %>"/><label for="rdoAlternativa_V_<%= alternativa.Id %>" class="clickAlternativa">V</label>
            </div>
            <div class="inputVF  <%= Model.CssInputCorretaFalsa(alternativa) %> <%=Model.EstiloFalsaSelecionada(alternativa.Id) %>">
                <input type="radio" id="rdoAlternativa_F_<%= alternativa.Id %>" name="rdoAlternativa_<%= alternativa.Id %>" value="F" <%= Model.FalsoSelecionada(alternativa.Id) %> <%=Model.Disabled %>   class="<%=Model.HideInput %>"/><label for="rdoAlternativa_F_<%= alternativa.Id %>" class="clickAlternativa">F</label>
            </div>
            <div class="alternativaConteudo">
                <div class="alternativa">(<%= Model.Letra %>)</div>
                <div class="textoVF mceView"><%= alternativa.Texto.HtmlTextoView%></div>
            </div>
            <% Html.RenderPartial("BoxAreaComentarios", Model.ComentarioAlternativa(alternativa)); %>
            <div class="clear"></div>
        </li>
<%  
        Model.ProximaLetra();
    } %>
    </ul>
</div>