﻿<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<div id="caixaDicas">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Dicas</div>
        <div class="textoDivisao">Os respondentes terão acesso às dicas das questões durante a prova?</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft"></div>
            <div class="txtMenor">
                <label><input type="radio" name="rdoDicas" id="rdoDicasNao" value="0" <%=Model.NaoExibirDicaSelecionada %>/> Não</label>
                <label><input type="radio" name="rdoDicas" id="rdoDicasSim" value="1" <%=Model.ExibirDicaSelecionada %>/> Sim</label>
            </div>
            <div id="boxTentativaDica" class="txtMenor">
                <input id="txtNumeroTentativaDica" class="txtTentativa" type="text" value="<%=Model.NumeroTentativasDica %>" name="txtNumeroTentativaDica" /> Número de tentativas
            </div>
        </div>
    </div>
</div>
