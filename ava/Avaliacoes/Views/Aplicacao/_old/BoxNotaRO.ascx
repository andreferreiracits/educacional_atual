<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div id="caixaDivulgacaoGabarito">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Nota</div>
        <div class="textoDivisao">Divulgação da nota </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.DivulgaNota %>
        </div>
    </div>
</div>
