<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<%--
<%
    string resposta = "";
    foreach (AlternativaView alternativa in Model)
    {
        resposta += ((alternativa.Texto.TemHtml) ? alternativa.Texto.Html : Html.Encode(alternativa.Texto.Texto)) + ", ";
    }
    resposta = (resposta.Length > 0) ? resposta.Remove(resposta.Length - 2) : "";
%>
--%>
<div class="areaAlternativas">
    <%--
    <%if ( !String.IsNullOrEmpty(resposta) ) { %>
        <div class="LabelDiscursiva">Sugestão de resposta:</div>
        <!--label for="txtTextoResposta" class="bold"></label-->
        <div class="txtAreaDissertativa"><%=resposta%></div>
    <%} %>
    --%>
</div>
<div class="SEC025_Criterios">
    <%
        Html.RenderAction("Criterios", "Realizacao", new { idQuestao = ViewData["idQuestao"] });
    %>
</div>
