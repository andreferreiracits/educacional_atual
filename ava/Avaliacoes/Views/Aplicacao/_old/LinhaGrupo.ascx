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
                    <%= Html.ActionLink("remover", "RemoverParticipanteAplicacao", new { @id = p.Id.ToString(), @idSeg = p.IdTipo.ToString() }, new { @class = "btnExcluir" })%>
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