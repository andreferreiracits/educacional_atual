<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.LacunasRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas hide">
    <ul id="alternativas">
<%  
    Model.IniciaLetra();
    foreach(Alternativa alternativa in Model.Alternativas) { %>
        <li class="alt"> 
            <input type="hidden" name="idLacunaResposta" value="<%= alternativa.Id %>" />
            <input type="hidden" name="txtLacunaResposta" value="<%= Html.Encode( Model.alternativaResposta ) %>"/>
            <input type="hidden" name="txtLacunaPos" value="<%= Model.Letra %>"/>
            <input type="hidden" name="txtLacunaCss" value="<%= Model.CssAlternativaCorrecao(alternativa) %>"/>
            <input type="hidden" name="txtDesabilitado" value="<%=Model.Disabled %>"/>
        </li>
        <%  
        Model.ProximaLetra();
    } %>
    </ul>
</div>

<%Html.RenderPartial( Model.ViewAlternativaGabarito, Model); %>