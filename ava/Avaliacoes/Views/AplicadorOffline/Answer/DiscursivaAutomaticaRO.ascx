<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<div class="areaAlternativas nomobile">
    <div class="naomarcouAlternativa"></div>
    <div class="LabelDiscursiva">Sua resposta:</div>
    <div class="feedAutomatica"> </div>
    <div class="automatica">
        <textarea id="txtResposta" name="txtResposta" class="txtAreaDiscursivaAutomatica inputAlternativa"  maxchar="100"></textarea>
    </div>
</div>

