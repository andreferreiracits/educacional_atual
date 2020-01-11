<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.Models.Question.CriterioCorrecao>" %>

<tr>
    <td>
        <input type="checkbox" id="cu<%= Model.Criterio.Id %>" <%= Model.Peso > 0 ? "checked" : "" %> />
    </td>
    <td>
        <label for="cu<%= Model.Criterio.Id %>"><%= Model.Criterio.Nome %></label>
        <div class="botoes">
            <a href="javascript:void(0)" data-criterio-id="<%= Model.Criterio.Id %>" class="btn edit">editar</a>
            <a href="javascript:void(0)" data-criterio-id="<%= Model.Criterio.Id %>" class="btnExcluir remove">excluir</a>
        </div>
    </td>
    <td>
        <input type="hidden" name="idCriterioObr" value="<%= Model.Criterio.Id %>" <%= Model.Peso == 0 ? "disabled" : "" %> />
        <input type="text" name="pesoCriterioObr" value="<%= Model.Peso %>" <%= Model.Peso == 0 ? "disabled" : "" %> size="3" class="txt centro"/>
    </td>
</tr>