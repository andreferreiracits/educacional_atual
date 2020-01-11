<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Exam.Realizador.AbstractTipoRealizadores>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam.Realizador" %>

<tbody id="listaUsuario">
<%
    if (Model.Count > 0)
    {
        foreach (AbstractTipoRealizadores p in Model)
        {
            
            RealizadoresUsuario usuario = (RealizadoresUsuario)p;
            
            string avatar = String.IsNullOrWhiteSpace(usuario.Avatar) ? "/Recursos/GerenciadorGrupos/Content/img/avatar_default.gif" : usuario.Avatar;
            %>
        <tr>
            <td>
                <input type="hidden" value="<%=usuario.Id %>" name="idParticipanteUsuario" />
                <img src="<%=avatar %>" alt="<%=usuario.Nome %>" /><%= Html.Encode(usuario.Nome)%>
                <div class="botoes">
                    <%= Html.ActionLink("remover", "RemoverParticipanteAplicacao", new { @id = usuario.Id.ToString(), @idSeg = usuario.IdTipo.ToString() }, new { @class = "btnExcluir" })%>
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