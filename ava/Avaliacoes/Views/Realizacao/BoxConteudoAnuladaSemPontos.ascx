<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>
<div class="boxAnulada">
    <div>
        <div class="imgAlertAnulada"></div>
        <div class="contentAnulada">
            <h1>Questao Anulada</h1>
            O valor (<%=Model.Questao.Valor %>) correspondente a esta questão foi removido da avaliação.
        </div>
    </div>
</div>