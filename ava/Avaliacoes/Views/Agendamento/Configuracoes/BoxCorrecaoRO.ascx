<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="caixaCorrecao">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Feedback de acerto e erro </div>
        <div class="textoDivisao">Quando o respondente será informado se acertou ou errou a questão? </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.Correcao%> <%=Model.DivulgacaoCorrecaoDataHora%>
        </div>
    </div>
</div>
