<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div class="divisaoQuestao">
    <div class="tituloDivisao">Extras</div>
    <div class="textoDivisao">extras. </div>
</div>
<% Html.RenderPartial(Model.BoxConfigParalelas, Model); %>