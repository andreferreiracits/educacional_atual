<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas">
    <ul id="alternativas">
<%  
    int count = 1;
    foreach (AlternativaView alternativa in Model)
    { %>
        <li class="Alternativa <%= alternativa.CssCorreta %>">
            <input type="hidden" id="rdoAlternativa_<%= alternativa.Id %>" name="rdoAlternativa" value="<%= alternativa.Id %>" />
                        <div class="alternativaConteudo">
            <div class="alternativaSomatoria"><!--%= alternativa.Letra%--> <%=count%>)</div>
            <div class="texto mceView"><%= alternativa.Texto.HtmlTextoView%></div>
            </div>
            <% Html.RenderPartial(alternativa.BoxAreaComentarios, alternativa.ComentarioRealizada); %>
            <div class="clear"></div>
        </li>
<%  
    count *= 2;
    } %>
    </ul>
    <input  type="text" size="5" maxlength="5" name="txtResposta" id="txtResposta" value="" class="txtAreaSomatoria" disabled="disabled" />
    
</div>