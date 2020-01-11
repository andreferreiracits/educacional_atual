<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<div class="hide">
<div class="SEC02511_titulo">Alternativas:</div>
<ul class="itensResposta">
<%
if (Model.Alternativas.Count > 0)
{
    foreach (AlternativaView alternativa in Model.Alternativas)
    {%>
        
    	    <li>
                <input type="hidden" name="txtLacunaPos" value="<%= alternativa.Letra %>"/>
                <input type="hidden" name="txtLacunaResposta" value="<%= (alternativa.Texto.TemHtml) ? alternativa.Texto.Html : alternativa.Texto.TextoView %>"/>
            </li>
<%  }
}
%>
</ul>
</div>