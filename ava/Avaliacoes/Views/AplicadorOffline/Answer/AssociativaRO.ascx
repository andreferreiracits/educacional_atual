<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.TabelaViews.AlternativaView>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<div class="areaAlternativas">
    <div class="colunaAssoE">
        <ul id="alternativas">
        <%  foreach(AlternativaView alternativa in Model) { %>
            <li class="Alternativa">
                <div class="naomarcouAlternativa"></div>
                <div class="ui-SeguraDivAsso">
                    <div id="<%= alternativa.Id %>" class="opcaoLetra ui-AlternativaAsso"><%= alternativa.Letra %></div>
                </div>
                <div class="texto mceView"><%= alternativa.Texto.TextoView %></div>
                <input id="txtLetraOpcoes_<%= alternativa.Id %>" type="hidden" name="txtLetraOpcoes" class="inputAlternativa" value="<%= alternativa.Id %>" />
                <div class="clear"></div>
            </li>
        <%  } %>
        </ul>
    </div>
</div>