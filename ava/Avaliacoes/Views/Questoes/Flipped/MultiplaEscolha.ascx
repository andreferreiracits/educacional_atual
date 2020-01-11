<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.MultiplaEscolhaRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<div class="areaRespostas">
    <ul class="itensResposta">
    <%  Model.IniciaLetra(); foreach(Alternativa alternativa in Model.Alternativas) { %>
        <li class="Alternativa">
            <div class="<%= Model.CssAlternativaCorrecao(alternativa) %>"></div>
            <div class="opcaoLetra">(<%= Model.Letra %>)</div>
            <div class="opcaoResposta mceView"><%= alternativa.Texto.TextoView %> <% if (Model.CssCorreta(alternativa) != "hide")
                                                                                     { %> <span class="correta">[CORRETA]</span> <%} %></div>
        </li>
    <%  Model.ProximaLetra(); } %>
    </ul>
</div>