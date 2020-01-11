<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<div class="SEC02511_titulo">Alternativas:</div>
<%
if (Model.Alternativas.Count > 0)
{
    foreach (AlternativaView alternativa in Model.Alternativas)
    {%>
        <ul class="itensResposta">
    	    <li class="Alternativa <%= alternativa.Correta ? "bgOpcaoCorreta" : "" %>">
        	    <div class="opcaoLetra">(<%= alternativa.Letra %>)</div> 
                <div class="opcaoResposta mceView">
                     <%= alternativa.Texto.TextoView%>                       
                     <% Html.RenderPartial("ComentarioReadOnly", alternativa.Comentario); %>
                </div> <!--.opcaoResposta-->
            </li>
        </ul>    
<%  }
}
%>