<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>
<div class="boxAnulada">
    <div>
        <div class="imgAlertAnulada"></div>
        <div class="contentAnulada">
            <h1>Questao Anulada</h1>
            Todos que realizaram a avaliação vão receber o valor (<%=Model.Questao.Valor %>) correspondente à questão anulada.
        </div>
    </div>
</div>