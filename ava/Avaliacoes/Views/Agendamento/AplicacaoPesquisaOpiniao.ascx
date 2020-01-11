<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div id="detalhesAplicacao" class="areaConfiguracoesAplicacao">

    <div id="areaProva" class="areaDetalheConfiguracoes">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Avaliação agendada</div>
            <div class="textoDivisao"></div>
        </div>
        <div id="listaProvas">
<%          if (Model.Prova != null) {
                Html.RenderPartial("ItemProvaResumo", Model);
            } %>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Título do agendamento</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <%=Model.Nome%>
        </div>
    </div>
    
    <!--% Html.RenderPartial(Model.BoxConfigBasica, Model); %-->

    <div id="areaInstrucoes" class="areaDetalheConfiguracoes">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Texto introdutório</div>
            <div class="textoDivisao"></div>
        </div>
        <div class="areaInstrucoesHtml mceView">
            <%= Model.Instrucao.Html %>
        </div>
    </div>


   
   <div class="divisaoQuestao">
        <div class="tituloDivisao">Participantes</div>
        <div class="textoDivisao"></div>
    </div>
    <% foreach (string viewBoxParticipantes in Model.BoxParticipantesRO) {
            Html.RenderPartial(viewBoxParticipantes,Model);
        }       
    %>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Período</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <%=Model.Realizacao%>
        </div>
    </div>
   <div class="clear"></div>
   

    <div class="clear"></div>
    <% Html.RenderPartial("Configuracoes/BoxDivulgacaoPesquisaRO", Model); %>
    
</div>