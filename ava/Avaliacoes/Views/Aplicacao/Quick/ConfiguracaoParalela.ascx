<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div class="configSPE" >
    <div id="caixaConteudo" class="caixaConteudo">
        <div id="infoAplicacao">
            <div class="areaDetalheConfiguracoes areaConfiguracoesAplicacao">
                <% Html.RenderPartial(Model.BoxConfigBasica, Model); %>
                <% Html.RenderPartial(Model.BoxCorrecao, Model); %>
                <% Html.RenderPartial(Model.BoxGabarito, Model); %>
<%--                <div class="divisaoQuestao">
                    <div class="tituloDivisao">Questões</div>
                    <div class="textoDivisao">Selecione as questões que fazem parte desta configuração</div>
                    <a class="btnAdicione direita" id="btnShowQuestoes" ><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
                </div>

                <div id="boxShowQuestoes">
                </div>--%>
            </div>
            <div class="navegacaoBotoes">
                <div class="btnEspacamento">
                    <a href="#" id="btnCancelarConfig" class="btnCancelar">Cancelar</a>
                </div>
                <div class="btnEspacamento direita">
                    <a id="btnVoltarConfig" class="btnNav" href="#">&laquo; Voltar</a> 
                    <a id="btnAvancarConfig" class="btnNav" href="#">Avançar &raquo;</a>
                </div>
            </div>
        </div>
    </div>
</div>
