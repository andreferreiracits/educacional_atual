<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<div id="caixaConfiguracoesGerais">
    <div class="divisaoQuestaoParalela">
        <div>Escolha as configurações da atividade</div>
    </div>
     <div class="divisaoQuestao">
        <div class="tituloDivisao">Título da atividade</div>
        <div class="textoDivisao"> </div>
    </div>
    <div class="linhaImpar">
        <div class="cnfg_aplicador_titulo">               
            <input type="text" id="txtTituloAtividade" title="Atividade" name="txtTituloAtividade" class="defaultText" value="<%= Model.Nome %>" />
    </div>
</div>