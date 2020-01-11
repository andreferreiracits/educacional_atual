<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.SomatoriaRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>

<div class="areaAlternativas">
    <ul id="alternativas">
<%  
    Model.IniciaLetra();
    int valorMaximo = 0;
    foreach(Alternativa alternativa in Model.Alternativas) { %>
        <li class="Alternativa <%= Model.CssTxtCorreta(alternativa) %> <%= Model.EstiloAlternativaSelecionada(alternativa.Id) %>">
            <div class="<%= Model.CssAlternativaCorrecao(alternativa) %>">
            </div>
            <input type="hidden" id="rdoAlternativa_<%= alternativa.Id %>" name="rdoAlternativa" value="<%= alternativa.Id %>" />
                        <div class="alternativaConteudo">
            <div class="alternativaSomatoria"><!--%= Model.Letra %--> <%= Model.Cont%>)</div>
            <div class="texto mceView"><%= alternativa.Texto.HtmlTextoView%></div>
            </div>
            <% Html.RenderPartial("BoxAreaComentarios", Model.ComentarioAlternativa(alternativa)); %>
            <div class="clear"></div>
        </li>
<%  
        valorMaximo = valorMaximo + Convert.ToInt32(Model.Cont);
        Model.ProximaLetra();
    } %>
    </ul>
    <input type="hidden" value="<%=valorMaximo%>" id="valorMaximoSomatoria" name="valorMaximoSomatoria" />
    <div class="boxSomatoria">
        <input  type="text" size="5" maxlength="5" name="txtResposta" id="txtResposta" value="<%=Model.Valor %>" class="txtAreaSomatoria" <%=Model.Disabled %> />
        <br/>
        <span>Some os números das alternativas condizentes com o enunciado e digite o valor no campo.</span>
    </div>
</div>
