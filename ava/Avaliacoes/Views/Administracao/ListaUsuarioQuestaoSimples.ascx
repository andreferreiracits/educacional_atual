<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.TabelaViews.UsuariosPermissaoVOView>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Permissoes" %>

<table atual="<%= Model.Paginacao.PaginaAtual %>">
    <tbody>
<%

    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (UsuariosPermissaoVOView linha in Model.Linhas)
        {
%>
        <tr>
            <td class="selecionar">
                <%= Html.Hidden("chkUsuariosQuestao.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkUsuariosQuestao.Checked", false)%>
            </td>
            <td><%=linha.Nome%></td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="2">Nenhum usuário cadastrado.</td>
        </tr>
<%
    }
%>
    </tbody>
</table>
