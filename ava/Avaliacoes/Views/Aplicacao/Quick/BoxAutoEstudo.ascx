<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div id="caixaAutoEstudo">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Autoestudo</div>
        <div class="textoDivisao">Questões disponíveis para os alunos após o período de agendamento (Não aparece no relatório).</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Permitir autoestudo após encerramento da atividade:</div>
            <label><input type="radio" name="rdoAutoEstudo" <%=Model.NaoTemAutoEstudo %> value="0"/> Não</label>
            <label><input type="radio" name="rdoAutoEstudo" <%=Model.TemAutoEstudo %> value="1"/> Sim</label>
        </div>
    </div>
</div>
