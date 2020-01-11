<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="caixaAutoEstudo">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Prova encerrada</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Permitir que o respondente veja sua prova após encerrada, antes do término do agendamento?</div>
            <div class="txtMenorRO"><%=Model.LockView%></div> 
        </div>
    </div>
</div>
