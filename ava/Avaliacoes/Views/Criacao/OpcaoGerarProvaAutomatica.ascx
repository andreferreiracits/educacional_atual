<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>

<div class="boxEscolhaGerarProva">
    <div class="boxSeparador"><div class="SEC02511_texto">OU</div></div>
    <ul class="escolhaGerarProva">
        <li class="gerarAgora <%=Model.GerarProvaAgoraAtivo %>"><label>
            <input type="radio" name="rdoGerarProva" value="1" id="rdoGerarProvaAgora" <%=Model.CheckGerarProvaAgora %> />
            <span>Gerar Avaliação Agora?</span>
            <p>Escolhendo esta opção você poderá revisar todas as questões filtradas</p>
            </label></li>
            <li class="gerarRealizacao  < %=Model.GerarProvaDepoisAtivo %>"><label>
            <input type="radio" name="rdoGerarProva" value="2" id="rdoGerarProvaDepois" <%=Model.CheckGerarProvaDepois %> />
            <span>Gerar Avaliação na Resolução?</span>
            <p>Escolhendo esta opção você será direcionado a próxima página sem poder revisar suas questões</p>
        </label></li>
    </ul>
</div>
