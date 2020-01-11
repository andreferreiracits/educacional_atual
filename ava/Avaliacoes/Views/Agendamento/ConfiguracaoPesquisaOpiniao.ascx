<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="areaConfiguracao">
<%  
    using (Html.BeginForm("ConfiguracaoAplicacao", "Agendamento", FormMethod.Post, new { @id = "frmConfiguracaoAplicacao" }))
    {
%>
    <%= Html.Hidden("txtIdAplicacaoConfiguracao", Model.Id, new { @id = "txtIdAplicacaoConfiguracao" }) %>
    
    
    <div class="areaConfiguracoesAplicacao">
        
        <%-- Html.RenderPartial("Configuracoes/BoxConfigBasicaPesquisa", Model); --%>
        <% Html.RenderPartial(Model.BoxConfigBasica, Model); %>

        <div class="clear"></div>


        <% Html.RenderPartial("Configuracoes/BoxDivulgacaoPesquisa", Model); %>
        <div class="clear"></div>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Sigilo </div>
            <div class="textoDivisao">A pesquisa é</div>
        </div>
        <div class="linhaPar">
            <div class="opcoes">
                <label><input type="radio" name="rdoSigilo" id="rdoSigiloAnomina" value="<%=(int)Aplicacao.TipoDivulgacaoSigilo.Anonima%>" <%=Model.CheckSigiloAnonima %>/> anônima. O relatório não mostra as respostas individuais dos respondentes.</label>
            </div>
        </div>
        <div class="linhaImpar">
            <div class="opcoes">
                <label><input type="radio" name="rdoSigilo" id="rdoSigiloNominal" value="<%=(int)Aplicacao.TipoDivulgacaoSigilo.Nominal%>" <%=Model.CheckSigiloNominal %>/> nominal. O relatório exibe as respostas individuais.</label>
            </div>
        </div>


        <% Html.RenderPartial("Configuracoes/BoxDicasPesquisa", Model); %>
  
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
