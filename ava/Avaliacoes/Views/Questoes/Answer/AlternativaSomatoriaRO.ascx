<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<div class="SEC02511_titulo">Alternativas:</div>
<ul class="itensResposta">
<%    
    
    if (Model.Alternativas.Count > 0)
{
    int intValor = 1;
    
    foreach (AlternativaView alternativa in Model.Alternativas)
    {
        
        %>

        
    	    <li class="Alternativa <%= alternativa.Correta ? "bgOpcaoCorreta" : "" %>">
                <% if (alternativa.Correta){%>
                    <div class="correta">[Correta]</div>
                <%} %>
           	    <div class="opcaoLetra">[<%=intValor.ToString() %>]</div> 
                <div class="opcaoResposta mceView">
                    <%= alternativa.Texto.TextoView%>                                  
                    <% Html.RenderPartial("ComentarioReadOnly", alternativa.Comentario); %>
                </div>
            </li>
             
<%  
    intValor *= 2;
    }
}
%>
</ul>