<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<div id="caixaDivulgacaoGabarito">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Gabarito</div>
        <div class="textoDivisao">Divulgação do gabarito (respostas corretas) </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            - <%=Model.Gabarito%> <%=Model.DivulgacaoGabaritoDataHora%>
        </div>
    </div>
</div>
