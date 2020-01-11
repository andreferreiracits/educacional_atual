<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<table>
    <tr>
    <td class="questaoEnunciado" colspan="2"><%=UtilView.ResolvePathImgPrint(Model.Enunciado.Texto.TextoView)%></td>
    </tr>
    <tr colspan="2"><td> </td></tr>
    <tr>
        <td class="alternativaMargin"> </td>
        <td class="alternativaConteudo"><% Html.RenderPartial(Model.ViewLinhasQuestao, Model); %></td>
    </tr>
    
</table>