<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.ValueObjects.GrupoUsuarioVO>>" %>

<table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tbody>
<%  if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {   %>
        <tr>
            <td class="selecionar center" style="width:30px;">
                <input type="checkbox" id="chkGruposAdicionar_<%= linha.Id %>" name="chkGruposAdicionar" value="<%= linha.Id %>" />
            </td>
            <td><a class="lnk"><%= Html.Encode(linha.Nome)%></a></td>
        </tr>       
<%      }
    }
    else
    { %>
        <tr class="vazio">
            <td colspan="5">Nenhum grupo encontrado.</td>
        </tr>
<%  }   %>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>