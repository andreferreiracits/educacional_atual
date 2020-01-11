<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.AssociativaRealizada>" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer" %>
<div class="areaAlternativas">
    <div class="instrucao_associativa">
        Arraste as letras da coluna à esquerda até a coluna da direita. Se preferir, digite
        a letra correspondente nas lacunas da direita.</div>
    <div class="colunaAssoE">
        <ul id="alternativas">
            <%  
                Model.IniciaLetra();
                foreach ( Alternativa alternativa in Model.Alternativas ) { %>
            <li class="Alternativa">
                <div class="ui-SeguraDivAsso">
                    <div id="<%= alternativa.Id %>" class="opcaoLetra ui-AlternativaAsso"><%= Model.Letra %></div>
                </div>
                <div class="texto mceView"><%= alternativa.Texto.HtmlTextoView%></div>
                <input id="txtLetraOpcoes_<%= alternativa.Id %>" type="hidden" name="txtLetraOpcoes" value="<%= alternativa.Id %>" />
                <div class="clear"></div>
            </li>
            <%  
        Model.ProximaLetra();
    } %>
        </ul>
    </div>
    <div class="colunaAssoD">
        <ul id="alternativas">
            <%  

                foreach ( AlternativaDireita alternativa in Model.AlternativasDireita ) { %>
            <li class="Alternativa">
                <div class="<%= Model.CssAlternativaCorrecaoAssociativa(alternativa) %>">
                </div>
                <div class="ui-SeguraDivAsso">
                    <div class="boxRecebeAssociado">
                        <input id="txtResposta_<%= alternativa.Id %>" type="hidden" name="txtResposta" value="<%=Model.AlternativaAssociadaUser(alternativa.Id) %>" />
                        <input id="idAssociativa_<%=alternativa.Id %>" type="hidden" name="txtIdAssociativa" value="<%=alternativa.Id %>" />
                        <input id="txtLetra_<%= alternativa.Id %>" type="text" maxlength="1" name="txtLetraAsso" <%=Model.Disabled %> value="<%=Model.LetraAssociadaUser(alternativa.Id)%>" />
                    </div>
                </div>
                <div class="texto mceView">
                    <%= alternativa.Texto.HtmlTextoView%></div>
                <div class="clear">
                </div>
            </li>
            <%  

    } %>
        </ul>
    </div>

</div>
<%Html.RenderPartial( Model.ViewAlternativaGabarito, Model); %>
