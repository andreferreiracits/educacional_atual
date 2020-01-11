<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Impressao>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<table>
    <tr>
        <td class="introducaoTitulo">Introdução</td>
    </tr>
    <tr>
        <td class="introducaoConteudo"><%=UtilView.ResolvePathImgPrint(Model.Introducao)%></td>
    </tr>
</table>



