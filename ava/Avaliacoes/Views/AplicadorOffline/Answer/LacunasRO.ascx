<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas hide">
    <ul id="alternativas">
<%  foreach(AlternativaView alternativa in Model) {  %>
         <li class="alt">
            <input type="hidden" class="inputAlternativas" name="idLacunaResposta" value="<%= alternativa.Id %>" />
            <input type="hidden" class="inputAlternativas" name="txtLacunaPos" value="<%=alternativa.Letra  %>"/>
        </li>
<%  } %>
    </ul>
</div>
<div class="clear"></div>
<div class="boxGabaritoAlternativa">
    <ul>
        <li class="marcadoCorreta">
            <b>Gabarito: </b><span></span>
        </li>
    </ul>
</div>