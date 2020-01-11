<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>
<%@ Import Namespace="ProvaColegiada.Models.Question.Correcao"%>

<div id="caixaCorrecaoParcial">
    
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Correção de questões objetivas</div>
        <div class="textoDivisao"> </div>
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
