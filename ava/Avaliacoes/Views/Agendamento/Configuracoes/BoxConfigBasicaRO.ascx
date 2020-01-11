<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="caixaConfiguracoesGerais">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Configurações Gerais</div>
        <div class="textoDivisao"> </div>
    </div>
</div>
<div class="linhaPar">
        <div class="opcoes">
        - <%=Model.Nome%>
        </div>
</div>
<div class="linhaImpar">
    <div class="opcoes">
        - <%=Model.Realizacao%>
    </div>
</div>
<div class="linhaPar">
    <div class="opcoes">
        - Permitir refazer aplicação: <div class="txtMenorRO"><%=Model.TemTentativas %> <% Html.RenderPartial(Model.BoxNrTentativas, Model);%></div>
    </div>
</div>
