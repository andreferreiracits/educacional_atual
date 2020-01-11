<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.RedacaoRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>

<div class="areaAlternativas <%= UtilView.isMobileBrowser() ? "mobile" : "nomobile" %>">
    <div class="LabelDiscursiva">Sua redação:</div>
    <div class="<%= Model.CssCorrecao() %>"></div>
    <%
        if (Model.Encerrada)
        {
            %>
                <div id="txtTextoRedacao" name="txtTextoRedacao" class="txtAreaDissertativaRespondida" maxchar="<%= Model.LimiteChar %>">
                    <%= Model.Texto %>
                </div>
            <%
        }
        else
        {
            %>
                <textarea id="txtTextoRedacao" name="txtTextoRedacao" class="txtAreaDissertativa" <%= Model.Disabled %> maxchar="<%= Model.LimiteChar %>"><%= Html.Encode(Model.Texto) %></textarea>
            <%
        }
    %>
</div>
<div class="SEC025_Criterios">
    <%
        if (Model.Encerrada)
        {
            if ((bool) ViewData["ShowNota"])
            {
                Html.RenderAction("CriteriosCorrigidos", "Realizacao", new { model = Model });
            }
            else
            {
                Html.RenderAction("Criterios", "Realizacao", new { idQuestao = Model.Questao.Id });
            }
        }
        else
        {
            Html.RenderAction("Criterios", "Realizacao", new { idQuestao = Model.Questao.Id });
        }
    %>
</div>
