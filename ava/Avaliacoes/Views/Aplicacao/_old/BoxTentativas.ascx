<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div class="linhaPar">
        <div class="opcoes">
            <div class="conteudoLeft">Refazer aplicação:</div>
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