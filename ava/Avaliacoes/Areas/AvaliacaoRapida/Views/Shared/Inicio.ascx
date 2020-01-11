<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div class="SEC02511 SEC025AVRAPIDA">
    <div class="caixaN">
        <div class="caixaConteudo">
            <div class="cxaTituloPagina">
                <h3 class="tituloStatus">Avaliação Rápida</h3>
            </div>
            <ul class="menuNavegacao menuAvRapida">
                <li id="menuPasso0" class="passo passo0"><a href="javascript:void(0);">Estrutura da prova</a></li>
                <li id="menuPasso1" class="passo passo1"><a href="javascript:void(0);">Questões</a></li>
                <li id="menuPasso2" class="passo passo2"><a href="javascript:void(0);">Confirmação</a></li>
            </ul>

            <a href="javascript:void(0)" id="helpTop1" class="btn sec_menuNavegacao hideI">?</a>  
            <a href="javascript:void(0)" id="helpTop2" class="btn sec_menuNavegacao hideI">?</a>  
            <a href="javascript:void(0)" id="helpTop3" class="btn sec_menuNavegacao hideI">?</a>  

            <div class="clear"></div>

            <div class="cxEtapa cxaEtapa0 hide"></div>
            <div class="cxEtapa cxaEtapa1 hide"></div>
            <div class="cxEtapa cxaEtapa2 hide"></div>

            <div class="clear"></div>

            <div class="navegacaoBotoes">
                <div class="btnEspacamento">
                    <a id="btnCancelar" class="btnNav branco">Cancelar</a>
                </div>
                <div class="btnEspacamento direita">
                    <a id="btnVoltar" class="btnNav">Voltar »</a>
                    <a id="btnAvancar" class="btnNav">Avançar »</a>
                </div>
            </div>
            <div class="clear"></div>
            <div class="helpObrigatorio">* obrigatório</div>
        </div>
    </div>
</div>