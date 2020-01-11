<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Usuario>>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>

<tbody id="listaUsuarios">
<%
    if (Model.Count > 0)
    {
        foreach (Usuario u in Model)
        {   %>
        <tr>
            <td>
                <%= Html.Encode(u.Nome) %>
                <div class="botoes">
                    <%= Html.ActionLink("remover", "RemoverUsuarioAplicacao", new { @id = u.Id.ToString() }, new { @class = "btnExcluir" })%>
                </div>
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