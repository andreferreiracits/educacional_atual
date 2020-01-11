<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<ul id="menuNavegacaoQuestao">
    
    <li id="tipoquestao" class="passo1 <%=Model.passoCadastroAtiva(QuestaoView.PassosCadastro.tipoquestao)%>"><a>Tipo da Questao</a></li>
    <li id="estrutura" class="passo2 <%=Model.passoCadastroAtiva(QuestaoView.PassosCadastro.estrutura)%>"><a>Estrutura da questão</a></li>
    <li id="classificacao" class="passo3 <%=Model.passoCadastroAtiva(QuestaoView.PassosCadastro.classificacao)%>"><a>Classificação</a></li>
    <li id="resumo" class="passo4 <%=Model.passoCadastroAtiva(QuestaoView.PassosCadastro.resumo)%>"><a>Resumo</a></li>
    
</ul>