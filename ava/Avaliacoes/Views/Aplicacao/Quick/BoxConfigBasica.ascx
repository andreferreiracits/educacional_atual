<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div id="caixaConfiguracoesGerais">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Configurações Gerais</div>
        <div class="textoDivisao"> </div>
    </div>
    <div class="linhaImpar">
    <div class="opcoes">               
        <div class="conteudoLeft">Título da atividade: </div>
        <div class="txtMenor">
            <input type="text" id="txtTituloAtividade" name="txtTituloAtividade" title="Atividade" class="txt defaultText" value="<%= Model.Nome %>" />
        </div>
    </div>
</div>
    <%Html.RenderPartial("Quick/Boxes/BoxAgendamentoImediato", Model); %>
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
