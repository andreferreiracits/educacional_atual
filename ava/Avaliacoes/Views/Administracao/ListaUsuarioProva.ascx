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
                <%= Html.Hidden("chkUsuariosProva.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkUsuariosProva.Checked", false)%>
            </td>
            <td><%=linha.Nome%></td>
			<td class="selecionar">
                <%= Html.Hidden("chkProvaCadastro.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkProvaCadastro.Checked", linha.CheckCadastrarProva)%>
            </td>
			<td class="selecionar">
                <%= Html.Hidden("chkProvaRevisor.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkProvaRevisor.Checked", linha.CheckRevisarProva)%>
            </td>
			<td class="selecionar">
                <%= Html.Hidden("chkProvaPublicar.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkProvaPublicar.Checked", linha.CheckPublicarProva)%>
            </td>
        </tr>
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="5">Nenhum usuário cadastrado.</td>
        </tr>
<%
    }
%>
    </tbody>
</table>
