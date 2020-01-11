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
        <li class="Alternativa">
            <div class="naomarcouAlternativa"></div>
            <input type="hidden" id="rdoAlternativa_<%= alternativa.Id %>" name="rdoAlternativa" value="<%= alternativa.Id %>" />
            <div class="alternativaConteudo">
                <div class="alternativaSomatoria"><!--%= alternativa.Letra%--> <%=count%>)</div>
                <div class="texto mceView"><%= alternativa.Texto.TextoView %></div>
            </div>
            <% Html.RenderPartial("../AplicadorOffline/BoxAreaComentarios", new {}); %>
            <div class="clear"></div>
        </li>
<%  
    count *= 2;
    } %>
    </ul>

    <input type="hidden" id="valorMaximoSomatoria" value="<%=count %>"/>
    
    <div class="boxSomatoria">
        <input type="text" size="5" maxlength="5" name="txtResposta" id="txtResposta" value="" class="txtAreaSomatoria inputAlternativa">
        <br>
        <span>Some os números das alternativas condizentes com o enunciado e digite o valor no campo.</span>
    </div>



</div>