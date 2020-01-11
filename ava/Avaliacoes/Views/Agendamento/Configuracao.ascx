<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="areaConfiguracao">
<%  
    using (Html.BeginForm("ConfiguracaoAplicacao", "Agendamento", FormMethod.Post, new { @id = "frmConfiguracaoAplicacao" }))
    {
%>
    <%= Html.Hidden("txtIdAplicacaoConfiguracao", Model.Id, new { @id = "txtIdAplicacaoConfiguracao" }) %>
    <span class="templatesExplicacao">Selecione um modelo de agendamento ou, se preferir, personalize as configurações.</span>
    <div class="areaConfiguracoesTemplates">
        <ul class="templatesConfiguracao">
            <li><label>
                <input type="radio" name="rdoTemplate" value="1" id="rdoTemplate1" />
                <span>Modelo formal</span>
                <p>Tem prazo definido. O aluno só pode fazer a prova uma vez. Feedback de acerto e erro, gabaritos e notas são liberados após o final do agendamento.</p>
                </label></li>
             <li><label>
                <input type="radio" name="rdoTemplate" value="2" id="rdoTemplate2" />
                <span>Modelo Livre</span>
                <p>Tem prazo definido. O aluno pode repetir a prova até três vezes. O feedback de acerto ou erro é dado quando o aluno encerra a prova. Gabaritos e notas são liberados após o fim do agendamento.</p>
                </label></li>
            <li><label>
                <input type="radio" name="rdoTemplate" value="3" id="rdoTemplate3" />
                <span>Modelo autoavaliação</span>
                <p>Pode ser repetido à vontade. O aluno recebe feedback de acerto e erro ao confirmar a questão. Gabaritos e notas são liberados ao encerrar a prova.</p>
                </label></li>
            <li><label>
                <input type="radio" name="rdoTemplate" value="0" id="rdoTemplateAvancado" />
                <span>Personalizado</span>
                <p>Altere as configurações do agendamento da forma que achar melhor.</p>
                </label></li>
        </ul>
    </div>
    <div class="areaConfiguracoesAplicacao">
        
        <% Html.RenderPartial(Model.BoxConfigBasica, Model); %>
        

        
    <div class="clear"></div>
   <div class="configTitle opAvancada" id="btnConfigAvancada"><span>Mais Configurações</span> <a class="btnAdicione direita" ><div class="btn_setaUP">Ocultar</div></a>|<span>Mais Configurações</span> <a class="btnAdicione direita" ><div class="btn_setaDown">Opções avançadas</div></a></div>  

    
    <div class="configAvancadas hide">


        <% Html.RenderPartial(Model.BoxTentativas, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxEmbaralhamento, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxDicas, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxNotasFeedbacks, Model); %>
        <div class="clear"></div>
        <!--% Html.RenderPartial(Model.BoxCorrecao, Model); %>
        <div class="clear"></div>
        < % Html.RenderPartial(Model.BoxNota, Model); %>
        <div class="clear"></div-->
        <% Html.RenderPartial(Model.BoxGabarito, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxConfigExtras, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxAutoEstudo, Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial("Configuracoes/BoxDuvida", Model); %>
        <div class="clear"></div>
        <% Html.RenderPartial(Model.BoxLockView, Model); %>
        <div class="clear"></div>
    </div>    
<%  } %>

    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Agendamento", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarConfiguracao" class="btnNav">&laquo; Voltar</a>
            <a id="btnAvancarConfiguracao" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>
</div>
