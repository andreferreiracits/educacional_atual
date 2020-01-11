<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div class="configSPE" >
    <div id="caixaConteudo" class="caixaConteudo">
        <div id="infoAplicacao">
            <div class="areaDetalheConfiguracoes areaConfiguracoesAplicacao">
                <% Html.RenderPartial(Model.BoxConfigBasica, Model); %>
                <% Html.RenderPartial(Model.BoxCorrecao, Model); %>
            <div class="cabecalhoSPE">Configurações Avançadas <a class="btnAdicione direita" id="btnConfigAvancada" ><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a></div>
                <div id="boxConfigAvancada">
                    <% Html.RenderPartial(Model.BoxGabarito, Model); %>
                    <% Html.RenderPartial(Model.BoxCorrecaoParcial, Model); %>
                    <% Html.RenderPartial(Model.BoxAutoEstudo, Model); %>
                    <% Html.RenderPartial(Model.BoxDicas, Model); %>
                    <% Html.RenderPartial(Model.BoxEmbaralhamento, Model); %>
                    <div class="divisaoQuestao">
                        <div class="tituloDivisao">Questões</div>
                        <div class="textoDivisao">Seleção de questões da avaliação/atividade.</div>
                        <a class="btnAdicione direita" id="btnShowQuestoes" ><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
                    </div>
                </div>
                <div id="boxShowQuestoes">
                </div>
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
