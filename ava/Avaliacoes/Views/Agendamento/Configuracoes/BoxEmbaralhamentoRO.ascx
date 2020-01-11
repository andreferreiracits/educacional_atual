<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="caixaEmbaralhamento">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Embaralhamento</div>
        <div class="textoDivisao">Os alunos recebem as questões em ordem diferente. </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Embaralhar questões:</div><div class="txtMenorRO"><%=Model.Embaralhar%></div>
        </div>
    </div>
</div>
