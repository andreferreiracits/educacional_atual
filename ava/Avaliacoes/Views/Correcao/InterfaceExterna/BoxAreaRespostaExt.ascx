<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RespostaAluno>" %>
<%using (Html.BeginForm("ConfirmarRespostaExt", "Correcao", FormMethod.Post, new { @class = "frmCorrecaoExt" })) {%>
    <input type="hidden" name="txtIdProvaRealizada" value="<%= Model.IdProva %>" />
    <input type="hidden" name="txtIdQuestao" value="<%= Model.IdQuestao %>" />

    <div class="areaBoxRespotaAluno">
        <div class="boxRespotaAluno">
            <label for="txtRepostaAluno" class="ComentAluno">Resposta do aluno</label>
            <%= Model.Resposta %>
        </div>
    </div>
    <div class="areaBoxComentDocente">
        <div class="boxSugestaoDocente">    
            <label for="txtCorrecaoDocente" class="ComentDocente">Comentário do professor</label>
            <%= Html.TextArea("txtCorrecao", Model.Correcao, new { @id = String.Format("txtCorrecao{0}",Model.IdQuestao), @cols = "74", @rows = "5", @class = "txtareaDocente", @maxchar = Model.LimiteDocente, @maxcharmsg = String.Format(Model.MsgLimiteDocente, Model.LimiteDocente) })%>
        </div>
    </div>
    <div class="areaNotaAluno">
        <div class="valorQuestao">
            Valor da questão: <span><input type="text" name="valorResposta" readonly="readonly" value="<%=Model.ValorQuestao %>" /> ponto(s)</span>
        </div>
        <p>Informe o percentual ou pontuação atingida pelo aluno:</p>
        <div class="boxSlider">
            <div class="sliderResposta"></div>
            <span class="sliderEsquerda">0%</span>
            <span class="sliderDireita">100%</span>
        </div>
        <div class="boxPontuacao">
            <input type="text" name="txtPercentualNota" class="txt" value="<%=Model.PorcentTaxa %>" /><span class="tMaior">%</span>
            <input type="text" name="pontosResposta" class="txt" value="<%=Model.Nota %>" /> <span>ponto(s)</span>
            <%= Html.ActionLink("confirmar", "ConfirmarRespostaExt", "Correcao", new { @class = "btnCorrecao" })%>
        </div>
        <div class="clear"></div>
    </div>
<%}%>