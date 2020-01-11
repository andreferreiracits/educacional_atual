<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="caixaAutoEstudo">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Autoestudo</div>
        <div class="textoDivisao">Após o fim do agendamento, a prova poderá ser refeita e utilizada para estudo do aluno quantas vezes ele desejar?</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Permitir autoestudo após encerramento da atividade:</div>
            <div class="txtMenorRO"><%=Model.AutoEstudo%></div> 
        </div>
    </div>
</div>
