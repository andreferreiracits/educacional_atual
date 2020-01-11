<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div id="caixaEmbaralhamento">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Embaralhamento</div>
        <div class="textoDivisao">Os alunos recebem as questões em ordem diferente. </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft">Embaralhar questões:</div><div class="txtMenor"><%=Model.Embaralhar%></div>
        </div>
    </div>
</div>
