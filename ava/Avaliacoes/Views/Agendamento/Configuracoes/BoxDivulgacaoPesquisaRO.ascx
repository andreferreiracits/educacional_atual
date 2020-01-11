<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div id="caixaCorrecao">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Divulgação de resultados</div>
        <div class="textoDivisao"></div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <%=Model.Sigilo%>
        </div>
    </div>
    

</div>
