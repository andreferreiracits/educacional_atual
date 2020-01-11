<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Tabela<ProvaColegiada.ValueObjects.UsuarioVO>>" %>

<table cellpadding="0" cellspacing="0" border="0">
    <tbody>
<%
    if (Model != null &&  Model.Linhas.Count > 0)
    {
        foreach (var linha in Model.Linhas)
        {
%>
        <tr>
            <td class="selecionar center" style="width:30px;">
                <%= Html.Hidden("chkUsuarioAdicionar.Value", String.Format("{0}", linha.Id))%>
                <%= Html.CheckBox("chkUsuarioAdicionar.Checked", false)%>
            </td>
            <td style="width:240px;"><a class="lnk"><%= Html.Encode(linha.Nome)%></a></td>
            <td style="width:270px;"><%= Html.Encode(linha.Instituicao)%></td>
            <td style="width:160px;"><%= Html.Encode(linha.Codigo)%></td>
            <td style="width:155px;"><%= Html.Encode(linha.Login)%></td>
        </tr>       
<%
        }
    }
    else
    {
%>
        <tr class="vazio">
            <td colspan="5">Nenhum usuário encontrado.</td>
        </tr>
<%
    }
%>
    </tbody>
    <% Html.RenderPartial("Paginacao", Model.Paginacao); %>
</table>