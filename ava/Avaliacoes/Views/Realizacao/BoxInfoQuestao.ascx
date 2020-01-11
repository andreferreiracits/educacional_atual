<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div class="clear"></div>
<div class="boxInfoQuestao">
    <% Html.RenderPartial(Model.Questao.BoxInfoValor, Model.Questao); %>
    <% Html.RenderPartial(Model.Questao.BoxInfoIndentificador, Model.Questao); %>
    <% Html.RenderPartial(Model.Questao.BoxInfoAno, Model.Questao); %>
    <%--<% Html.RenderPartial(Model.Questao.BoxInfoOrigem, Model.Questao); %>--%>
    <% Html.RenderPartial(Model.BoxLabelGrupo, Model.GrupoAtual); %>
</div>