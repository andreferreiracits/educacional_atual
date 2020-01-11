<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div id="caixaDivulgacaoGabarito">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Nota</div>
        <div class="textoDivisao">Divulgação da Nota </div>
    </div>
    <div class="linhaImpar">
        <div class="opcoes">
            <label><input type="radio" name="rdoDivulgaNota" id="rdoDivulgaNotaSem" value="<%=(int)Aplicacao.TipoDivulgacaoNota.Sem%>" <%=Model.CheckDivulgaNotaSem %>/> Sem.</label>
        </div>
        <div class="opcoes">
            <label><input type="radio" name="rdoDivulgaNota" id="rdoDivulgaNotaProva" value="<%=(int)Aplicacao.TipoDivulgacaoNota.AposProvaCorrigida%>" <%=Model.CheckDivulgaNotaProva %>/> somente quando todas as correções estejam concluídas.</label>
        </div>
        <div class="opcoes">
            <label><input type="radio" name="rdoDivulgaNota" id="rdoDivulgaNotaTodas" value="<%=(int)Aplicacao.TipoDivulgacaoNota.AposTodasCorrigidas%>" <%=Model.CheckDivulgaNotaTodas %>/> liberar resultados imedatamente à medida que as questões forem corrigidas.</label>
        </div>
    </div>
    
</div>