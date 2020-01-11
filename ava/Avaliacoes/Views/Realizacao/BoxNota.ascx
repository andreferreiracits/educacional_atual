<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<tr style="height:25px" class="bgA" valign="middle">
    <td class="info">Nota:</td>
    <td class="strong"><%= Model.Nota%> de <%=Model.AplicacaoView.Prova.NotaAvaliacao%></td>
</tr>