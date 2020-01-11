<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div class="configSPE" >
    <div id="caixaConteudo" class="caixaConteudo">
        <div id="infoAplicacao">
            <div class="areaConfiguracoesAplicacao">
                <div class="mensagem comBotao boxMsg"></div>
                <div id="containerGerenciadorGrupos">
                </div>
            </div>
            <div class="navegacaoBotoes">
                <div id="AA_GruposBtn">
                    <a id="AA_btnCriarGrupos" class="cnfg_aplicador_btnPadrao cnfg_aplicador_btnCriarGrupo" title="Clique para criar um novo grupo">
                        <span>Criar novo grupo</span><div class="cnfg_aplicador_btnMais"></div>
                    </a>
                    <a id="AA_btnGerenciadorMode" class="cnfg_aplicador_btnPadrao cnfg_aplicador_btnModeEdicao">
                        <span>Gerenciador de grupos</span><div class="cnfg_aplicador_img_conf"></div>
                    </a>
                    <div class="cnfg_aplicador_toolTip"><div class="seta"></div><div class="corpo">Use o Gerenciador para editar ou criar novos grupos.</div></div>
                </div>
                <div class="btnEspacamento">
                    <a id="btnCancelarGrupos" class="btnCancelar">Cancelar</a>
                </div>
                <div class="btnEspacamento direita">
                    <a id="btnVoltarGrupos" class="btnNav">&laquo; Voltar</a> 
                    <a id="btnAvancarGrupos" class="btnNav">Avançar &raquo;</a>
                    <a id="btnContinuarGrupos" class="btnNav">Voltar</a>
                    <a id="btnSalvarGrupos" class="btnNav">Gravar</a>
                </div>
            </div>
        </div>
    </div>
</div>
