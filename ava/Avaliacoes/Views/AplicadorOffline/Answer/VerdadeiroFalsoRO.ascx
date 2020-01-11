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
            <div class="naomarcouAlternativa"></div>
            <input type="hidden" name="idAlternativa" value="<%= alternativa.Id %>" />
                <input class="inputAlternativa" type="hidden" id="rdoVerdadeira_<%= alternativa.Id %>" name="rdoVerdadeira" value=""/>
                <input class="inputAlternativa" type="hidden" id="rdoFalsa_<%= alternativa.Id %>" name="rdoFalsa" value=""/>

            <div class="inputVF">
                <input class="inputAlternativa" type="radio" id="rdoAlternativa_V_<%= alternativa.Id %>" name="rdoAlternativa_<%= alternativa.Id %>" value="V" /><label for="rdoVerdadeira_<%= alternativa.Id %>">V</label>
            </div>
            <div class="inputVF">
                <input class="inputAlternativa" type="radio" id="rdoAlternativa_F_<%= alternativa.Id %>" name="rdoAlternativa_<%= alternativa.Id %>" value="F" /><label for="rdoFalsa_<%= alternativa.Id %>">F</label>
            </div>
            <div class="alternativaConteudo">
                <div class="alternativa">(<%= alternativa.Letra %>)</div>
                <div class="textoVF mceView"><%= alternativa.Texto.TextoView %></div>
            </div>
            <% Html.RenderPartial("../AplicadorOffline/BoxAreaComentarios", new {}); %>

            <div class="clear"></div>
        </li>
<%  

    } %>
    </ul>
</div>