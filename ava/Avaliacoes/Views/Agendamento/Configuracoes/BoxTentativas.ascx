<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>


<div id="caixaConfiguracoesGerais">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Repetição</div>
        <div class="textoDivisao">O respondente pode refazer a prova? Serão consideradas as respostas da última tentativa que ele fizer.</div>
    </div>

    <div class="linhaPar">
            <div class="opcoes">
                <div class="conteudoLeft"></div>
                <div class="txtMenor">
                    <label><input type="radio" id="rdoTentativaNao" name="rdoTentativa" value="0" <%= Model.LimitarTentativasNaoSelecionada %> /> Não</label>
                    <label><input type="radio" id="rdoTentativaSim" name="rdoTentativa" value="1" <%= Model.LimitarTentativasSimSelecionada %> />  Sim</label>
                </div>
                <div id="boxTentativas" class="txtMenor">
                    <input id="txtNumeroTentativa" class="txtTentativa" type="text" value="<%=Model.NumeroTentativas %>" name="txtNumeroTentativa" /> Número de tentativas
                </div>
            </div>
        </div>
</div>
