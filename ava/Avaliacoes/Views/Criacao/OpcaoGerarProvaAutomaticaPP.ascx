<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>

<div class="boxEscolhaGerarProva">
    
    <ul class="escolhaGerarProva">
        <li class="gerarAgora <%=Model.GerarProvaAgoraAtivo %>"><label>
            <input type="radio" name="rdoGerarProva" value="1" id="rdoGerarProvaAgora" <%=Model.CheckGerarProvaAgora %> />
            <span>Gerar Avaliação Agora?</span>
            <p>Escolhendo esta opção você poderá revisar todas as questões filtradas</p>
            </label></li>
    </ul>
</div>
