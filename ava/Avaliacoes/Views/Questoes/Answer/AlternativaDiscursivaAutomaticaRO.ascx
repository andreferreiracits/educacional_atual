<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<div class="SEC02511_titulo">Respostas:</div>
<%
if (Model.Alternativas.Count > 0)
{
    foreach (AlternativaView alternativa in Model.Alternativas)
    {%>
        <ul class="itensResposta">
    	    <li class="Alternativa <%= alternativa.Correta ? "bgOpcaoCorreta" : "" %>">
                <div class="opcaoResposta mceView">
                 <%= alternativa.Texto.TextoView %>                
                </div> <!--.opcaoResposta-->
            </li>
        </ul>     
<%  }
}
%>