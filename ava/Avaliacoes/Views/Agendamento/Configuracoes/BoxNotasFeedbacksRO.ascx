<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>
<%@ Import Namespace="ProvaColegiada.Models.Question.Correcao"%>

<div id="caixaCorrecao">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Notas e Feedbacks</div>
        <div class="textoDivisao">Acesso às notas alcançadas na avaliação e informação de acerto ou erro de cada questão. </div>
    </div>
        

    <div class="linhaPar">
        <div class="opcoes">
            <% if (Model.CorrecaoNaQuestao) { %>
            Informar imediatamente se acertou ou errou cada questão.
            <% } %>
        </div>
    </div>
    <div class="subDivisaoQuestao">
        Quando divulgar notas:
    </div>

    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.CorrecaoNew%> <%=Model.DivulgacaoCorrecaoDataHora%>
        </div>
    </div>

    <div class="subDivisaoQuestao">
        Em que situação liberar notas:
    </div>

    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.DivulgaNota %>
        </div>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Correção de questões objetivas</div>
        <div class="textoDivisao"></div>
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
