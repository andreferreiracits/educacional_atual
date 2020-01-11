<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="caixaDicas">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Dicas</div>
        <div class="textoDivisao">Visualização das dicas pelos alunos.</div>
    </div>
    <div class="linhaImpar">
        <span class="texto"></span>
        <div class="opcoes">
            <div class="conteudoLeft">Permitir a visualização das dicas:</div>
            <div class="txtMenorRO"><%=Model.Dicas%></div> 
            <div class="txtMenorRO"><% Html.RenderPartial(Model.BoxNrDicas, Model); %></div>
        </div>
    </div>
</div>