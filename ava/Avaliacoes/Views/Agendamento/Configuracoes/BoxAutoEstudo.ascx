<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div id="caixaAutoEstudo">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Autoestudo</div>
        <div class="textoDivisao">Após o fim do agendamento, a prova poderá ser refeita e utilizada para estudo do aluno quantas vezes ele desejar?
</div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <div class="conteudoLeft"></div>
            <div class="txtMenor"> 
                <label><input type="radio" name="rdoAutoEstudo" <%=Model.NaoTemAutoEstudo %> value="0"/> Não</label>
                <label><input type="radio" name="rdoAutoEstudo" <%=Model.TemAutoEstudo %> value="1"/> Sim</label>
            </div>
        </div>
    </div>
</div>
