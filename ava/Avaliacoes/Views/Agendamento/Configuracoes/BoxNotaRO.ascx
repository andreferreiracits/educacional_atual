<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="caixaDivulgacaoGabarito">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Nota</div>
        <div class="textoDivisao">Divulgação da nota </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.DivulgaNota %>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Correção de questões objetivas</div>
        <div class="textoDivisao">Divulgação da nota </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.CorrecaoNota %>
        </div>
    </div>
        <div class="linhaPar">
        <div class="opcoes">
            - <%=Model.CorrecaoNotaLowUp%>
        </div>
    </div>
</div>
