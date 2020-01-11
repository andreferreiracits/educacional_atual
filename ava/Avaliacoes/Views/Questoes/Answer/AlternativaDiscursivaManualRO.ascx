<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<div class="SEC02511_titulo">Resposta modelo:</div>
<%
if (Model.Alternativas.Count > 0)
{
    AlternativaView alternativa = Model.Alternativas[0];
%>
        <ul class="itensResposta">
    	    <li class="Alternativa <%= alternativa.Correta ? "bgOpcaoCorreta" : "" %>">
                <div class="opcaoResposta mceView">
                 <%= alternativa.Texto.TextoView%>                
                 <% Html.RenderPartial("ComentarioReadOnly", alternativa.Comentario); %>
                </div> <!--.opcaoResposta-->
            </li>
        </ul>     
<%
}
%>