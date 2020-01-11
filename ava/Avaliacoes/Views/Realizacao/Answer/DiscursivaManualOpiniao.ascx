<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.DiscursivaManualOpiniaoRealizadao>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>

<div class="areaAlternativas <%= UtilView.isMobileBrowser() ? "mobile" : "nomobile" %>">
    <div class="LabelDiscursiva">Sua resposta:</div>
    <div class="<%= Model.CssCorrecao() %>">
    </div>
    <% if (Model.Encerrada)
       { %>
        <div id="txtTextoResposta" name="txtTextoResposta" class="txtAreaDissertativaRespondida" maxchar="<%=Model.LimiteChar %>"><%=Model.Texto%></div>
    <% }
       else
       {%>
        <textarea id="txtTextoResposta" name="txtTextoResposta" class="txtAreaDissertativa" <%=Model.Disabled %> maxchar="<%=Model.LimiteChar %>"><%=Html.Encode(Model.Texto)%></textarea>       
       <%
       } %>
</div>