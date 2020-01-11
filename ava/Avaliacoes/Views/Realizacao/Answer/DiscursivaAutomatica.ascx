<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.DiscursivaAutomaticaRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>

<div class="areaAlternativas">
    <div class="LabelDiscursiva">Sua resposta:</div>
    <div class="feedAutomatica <%= Model.CssCorrecao() %>"> </div>
    <div class="automatica">
        <textarea id="txtResposta" name="txtResposta" class="txtAreaDiscursivaAutomatica" <%=Model.Disabled %>  maxchar="<%=Model.LimiteChar %>"><%= Html.Encode(Model.Texto) %></textarea>
    </div>
</div>

