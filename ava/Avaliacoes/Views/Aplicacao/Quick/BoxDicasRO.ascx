<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div id="caixaDicas">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Dicas</div>
        <div class="textoDivisao">Permite aos alunos a visualização de dicas para resolução das questões.</div>
    </div>
    <div class="linhaImpar">
        <span class="texto"></span>
        <div class="opcoes">
            <div class="conteudoLeft">Permitir a visualização das dicas:</div>
            <div class="txtMenor"><%=Model.Dicas%></div> 
            <div class="txtMenor"><% Html.RenderPartial(Model.BoxNrDicas, Model); %></div>
        </div>
    </div>
</div>