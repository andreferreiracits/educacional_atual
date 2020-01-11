<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<div id="caixaDicas">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Dicas</div>
        <div class="textoDivisao">Permite aos alunos a visualização de dicas para resolução das questões.</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Permitir a visualização das dicas:</div>
            <div class="txtMenor">
                <label><input type="radio" name="rdoDicas" id="rdoDicasNao" value="0" <%=Model.NaoExibirDicaSelecionada %>/> Não</label>
                <label><input type="radio" name="rdoDicas" id="rdoDicasSim" value="1" <%=Model.ExibirDicaSelecionada %>/> Sim</label>
            </div>
            <div id="boxTentativaDica">
                <input id="txtNumeroTentativaDica" class="txtTentativa" type="text" value="<%=Model.NumeroTentativasDica %>" name="txtNumeroTentativaDica" /> Número de tentativas
            </div>
        </div>
    </div>
</div>
