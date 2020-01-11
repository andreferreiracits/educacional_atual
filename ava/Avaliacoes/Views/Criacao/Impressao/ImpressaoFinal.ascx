<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Impressao>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<table>
    <tr>
        <td class="finalConteudo"><%=UtilView.ResolvePathImgPrint(Model.Rodape)%></td>
    </tr>
</table>



