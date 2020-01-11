<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div id="caixaEmbaralhamento">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Embaralhamento</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes <%=Model.EmbaralharDesabilitado %>">
            <div class="conteudoLeft">Embaralhar as questões da prova de cada aluno?</div>
            <div class="txtMenor">
                <label><input type="radio" name="rdoEmbaralharQuestoes"  id="rdoEmbaralharQuestoesNao" value="0" <%=Model.NaoEmbaralharQuestoes %> <%=Model.EmbaralharDisabled %>/> Não</label>
                <label><input type="radio" name="rdoEmbaralharQuestoes" id="rdoEmbaralharQuestoesSim" value="1" <%=Model.EmbaralharQuestoes %> <%=Model.EmbaralharDisabled %>/> Sim</label>
            </div>
        </div>
    </div>
</div>
