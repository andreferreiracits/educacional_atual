<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Answer.TipoRespostaAbstractRealizada>" %>

<div class='clear'></div>
<div class="boxGabaritoAlternativa">
    <ul>
        <li class="marcadoCorreta">
            <b>Gabarito: </b><%=Model.AlternativaGabarito %>
        </li>
    </ul>
</div>