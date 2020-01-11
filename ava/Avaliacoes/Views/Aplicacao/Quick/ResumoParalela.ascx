<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div class="configSPE" >
    <div id="caixaConteudo" class="caixaConteudo">
        <div id="infoAplicacao">
            <div class="areaDetalheConfiguracoes areaConfiguracoesAplicacao">
                <% Html.RenderPartial(Model.BoxConfigBasica, Model); %>
                <% Html.RenderPartial(Model.BoxParticipantesRO, Model); %>

                <% Html.RenderPartial(Model.BoxCorrecao, Model); %>
                <% Html.RenderPartial(Model.BoxGabarito, Model); %>
                <div class="divisaoQuestao">
                    <div class="tituloDivisao">Questões</div>
                    <div class="textoDivisao">Seleção de questões da avaliação/atividade (Aplicar configurações)</div>
                    <a class="btnAdicione direita" id="btnShowQuestoesRO" ><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
                </div>
                <div id="boxShowQuestoesRO">
                    <% Html.RenderPartial("Quick/QuestoesRO", Model); %>
                </div>
                <div class="navegacaoBotoes">
                    <div class="btnEspacamento">
                        <a href="#" id="btnCancelarResumo" class="btnCancelar">Cancelar</a>
                    </div>
                    <div class="btnEspacamento direita">
                        <a  href="#" id="btnVoltarResumo" class="btnNav">&laquo; Voltar</a> 
                        <a  href="#" id="btnConcluirResumo" class="btnNav">Concluir</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
