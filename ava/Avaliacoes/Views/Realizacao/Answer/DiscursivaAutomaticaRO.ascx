<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>


<div class="areaAlternativas">
    <!--label for="txtTextoResposta" class="bold">Sugestão de resposta:</label-->
    <div class="LabelDiscursiva">Sugestão de resposta:</div>
    <ul>
    
<%
    foreach (AlternativaView alternativa in Model) {
        var resposta = ((alternativa.Texto.TemHtml) ? alternativa.Texto.Html : Html.Encode(alternativa.Texto.Texto));
%>
      <li class="sugestaoResposta"><%= resposta %></li>
<%
    }
%>
    </ul>
    <div class="txtAreaDissertativa"></div>
</div>