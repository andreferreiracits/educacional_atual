<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoCorrecao" id="rdoCorrecaoAgendamento" value="<%=(int)Aplicacao.TipoCorrecao.AposAgendamento%>" <%=Model.CheckCorrecaoAgendamento %>/> Após o final do período de agendamento</label>
        </div>
    </div>

