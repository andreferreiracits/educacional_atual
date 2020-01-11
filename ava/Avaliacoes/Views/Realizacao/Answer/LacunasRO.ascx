<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas hide">
    <ul id="alternativas">
<%  
    foreach(AlternativaView alternativa in Model) { 
        var resposta = (alternativa.Texto.TemHtml) ? alternativa.Texto.Html : alternativa.Texto.Texto;
        %>
         <li class="alt">
            <input type="hidden" name="idLacunaResposta" value="<%= alternativa.Id %>" />
            <input type="hidden" name="txtLacunaResposta" value="<%= Html.Encode( resposta ) %> "/>
            <input type="hidden" name="txtLacunaPos" value="<%=alternativa.Letra  %>"/>
            <input type="hidden" name="txtLacunaCss" value="<%=alternativa.CssLacunasCorreta %>"/>
            <input type="hidden" name="txtDesabilitado" value="<%=alternativa.Disabled %>"/>
        </li>
<%  
    } %>
    </ul>
</div>