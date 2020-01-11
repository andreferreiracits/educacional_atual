<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div id="caixaCorrecao">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Correção</div>
        <div class="textoDivisao">Divulgação da correção (acerto ou erro do aluno) </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.Correcao%> <%=Model.DivulgacaoCorrecaoDataHora%>
        </div>
    </div>
</div>
