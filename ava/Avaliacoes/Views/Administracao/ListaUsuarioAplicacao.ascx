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
                <%= Html.Hidden("chkUsuariosAplicacao.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkUsuariosAplicacao.Checked", false)%>
            </td>
            <td><%=linha.Nome%></td>
			<td class="selecionar">
                <%= Html.Hidden("chkAplicacaoCadastro.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkAplicacaoCadastro.Checked", linha.CheckCadastrarAplicacao)%>
            </td>
			<td class="selecionar">
                <%= Html.Hidden("chkAplicacaoPublicar.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkAplicacaoPublicar.Checked", linha.CheckPublicarAplicacao)%>
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
