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
            <%=Html.Encode(Model.Nome)%>
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
   <div class="configTitle"><span>Mais Configurações</span> <a class="btnAdicione direita" id="btnConfigAvancada" ><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a></div>  
   <div class="configAvancadas hide">
    
        <div class="divisaoQuestao">
        <div class="tituloDivisao">Repetição</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
             <div class="conteudoLeft">Permitir refazer aplicação:</div>
             <div class="txtMenorRO"><%=Model.TemTentativas %> <% Html.RenderPartial(Model.BoxNrTentativas, Model);%></div>
        </div>
    </div>
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxEmbaralhamento, Model); %>

    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxNotasFeedbacks, Model); %>
    <!--div class="clear"></div>
    < % Html.RenderPartial(Model.BoxCorrecao, Model); %-->
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxGabarito, Model); %>
    <!--div class="clear"></div>
    < % Html.RenderPartial(Model.BoxNota, Model); %-->
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxAutoEstudo, Model); %>
    <div class="clear"></div>
    <% Html.RenderPartial(Model.BoxDicas, Model); %>
    <div class="clear"></div>
    
    <% Html.RenderPartial(Model.BoxLockView, Model); %>
    <div class="clear"></div>

    </div>

</div>