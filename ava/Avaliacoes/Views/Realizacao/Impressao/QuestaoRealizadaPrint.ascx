<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoRealizadaPrint>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<table>
    <tr>
        <td class="questaoIndice">Questão <%=Model.Indice%> -&nbsp;</td>
        <td class="questaoInfo"><%=Model.CabecalhoQuestao%></td>
        <td class="questaoNota"><% Html.RenderPartial(Model.ViewValorQuestao, Model); %></td>
    </tr>

<% if (Model.TemReferenciaMultiploEnunciadoBase(questao))
    { %>
    <tr><td class="questaoBase" colspan="3">Leia o enunciado base <%=Model.ReferenciaMultiploEnunciadoBase(questao)%> antes de responder</td></tr>
<% } %>
    <tr><td class="questaoConteudo" colspan="3"> 

        <% Html.RenderPartial(Model.ViewTipoRealizadaPrint, Model.TipoRealizada); %>
    </td></tr>
</table>