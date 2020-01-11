<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div id="caixaAutoEstudo">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Autoestudo</div>
        <div class="textoDivisao">Questões disponíveis para os alunos após o período de agendamento (Não aparece no relatório).</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Permitir autoestudo após encerramento da atividade:</div>
            <div class="txtMenor"><%=Model.AutoEstudo%></div> 
        </div>
    </div>
</div>
