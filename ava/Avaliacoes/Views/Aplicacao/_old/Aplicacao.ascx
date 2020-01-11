<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div id="detalhesAplicacao" class="areaConfiguracoesAplicacao">

    <% Html.RenderPartial(Model.BoxConfigBasica, Model); %>

    <div id="areaInstrucoes" class="areaDetalheConfiguracoes">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Instruções</div>
            <div class="textoDivisao">Texto de instruções para esta aplicação.</div>
        </div>
        <div class="areaInstrucoesHtml mceView">
            <%= Model.Instrucao.Html %>
        </div>
    </div>

    <div id="areaProva" class="areaDetalheConfiguracoes">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Prova</div>
            <div class="textoDivisao">Informações sobre prova associada a esta aplicação.</div>
        </div>
        <div id="listaProvas">
<%          if (Model.Prova != null) {
                Html.RenderPartial("ItemProvaResumo", Model);
            } %>
        </div>
    </div>
   
    <% Html.RenderPartial(Model.BoxParticipantesRO, Model); %>
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxEmbaralhamento, Model); %>
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxCorrecao, Model); %>
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxGabarito, Model); %>
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxNota, Model); %>
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxAutoEstudo, Model); %>
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxDicas, Model); %>

            

</div>