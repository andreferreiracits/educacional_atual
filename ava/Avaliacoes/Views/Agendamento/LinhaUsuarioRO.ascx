<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Exam.Realizador.AbstractTipoRealizadores>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador" %>

<tbody id="listaUsuario">
<%
    if (Model.Count > 0)
    {
        foreach (AbstractTipoRealizadores p in Model)
        {   %>
        <tr>
            <td>
                <%= Html.Encode(p.Nome) %>
            </td>
        </tr>
<%      }
    }
    else
    { %>
        <tr>
            <td class="vazio">Nenhum usuário selecionado até o momento</td>
        </tr>
<%  } %>
</tbody>