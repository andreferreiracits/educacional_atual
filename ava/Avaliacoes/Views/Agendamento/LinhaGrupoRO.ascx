<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Exam.Realizador.AbstractTipoRealizadores>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador" %>

<tbody id="listaGrupos">
<%
    if (Model.Count > 0)
    {
        foreach (AbstractTipoRealizadores p in Model)
        {   %>
        <tr>
            <td>
                <%= Html.Encode(p.Nome) %>
                <div class="botoes">
                    <% if (p.IdTipo == EnumTipoRealizadores.RealizadorGrupo.Id) {%>
                        <a href="<%=p.Id.ToString() %>" class="btnVisualizar btn">visualizar</a>
                    <%} %>
                </div>
            </td>
        </tr>
<%      }
    }
    else
    { %>
        <tr>
            <td class="vazio">Nenhum grupo selecionado até o momento</td>
        </tr>
<%  } %>
</tbody>