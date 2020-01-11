<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<div class="areaAlternativas">
    <div class="colunaAssoD">
        <ul id="alternativas">
    <%  
        foreach(AlternativaView alternativa in Model) { %>
            <li class="Alternativa ">
                <div class="naomarcouAlternativa"></div>
                <div class="ui-SeguraDivAsso">
                    <div class="boxRecebeAssociado">
                        <input id="txtResposta_<%= alternativa.Id %>" type="hidden" class="inputAlternativa" name="txtResposta" value="" />
                        <input id="idAssociativa_<%=alternativa.Id %>" type="hidden" class="inputAlternativa" name="txtIdAssociativa" value="<%=alternativa.Id %>" />
                        <input id="txtLetra_<%= alternativa.Id %>" type="text" maxlength="1" class="inputAlternativa" name="txtLetraAsso"  value="" />
                    </div>
                </div>
                <div class="texto mceView"><%= alternativa.Texto.TextoView %></div>
                <div class="clear"></div>
            </li>
    <%  
        } %>
        </ul>
    </div>
</div>
<div class="clear"></div>
<div class="boxGabaritoAlternativa">
    <ul>
        <li class="marcadoCorreta">
            <b>Gabarito: </b><span></span>
        </li>
    </ul>
</div>