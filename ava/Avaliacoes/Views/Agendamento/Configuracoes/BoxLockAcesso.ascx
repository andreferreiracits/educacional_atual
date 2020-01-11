<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div class="clear"></div>
<div>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Prova encerrada</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Permitir que o respondente veja sua prova após encerrada, antes do término do agendamento?</div>
            <div class="txtMenor"> 
                <label><input type="radio" name="rdoLockView" value="0" <%=Model.SimLockViewSelecionada %>/> Sim</label>
                <label><input type="radio" name="rdoLockView" value="1" <%=Model.NaoLockViewSelecionada %>/> Não</label>
            </div>
        </div>
    </div>
</div>
