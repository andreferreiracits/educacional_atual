<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div class="areaConfirmacao areaConfiguracoesAplicacao">
<%  
    using (Html.BeginForm("ConfirmarAplicacao", "Aplicacao", FormMethod.Post, new { @id = "frmConfirmacaoAplicacao" }))
    {
%>

    <% Html.RenderPartial("Aplicacao", Model); %>
    <div class="clear"></div>
    <div class="areaConfiguracoesAplicacao">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Situação do Agendamento</div>
            <div class="textoDivisao">Verifique o status de sua aplicação.</div>
        </div>
        <div class="statusProva">
            <label>
                <input type="radio" id="rdoStatusElaboracao" name="rdoStatus" checked="checked" value="<%= Convert.ToInt32(EstadoAplicacao.EmElaboracao) %>" <%=Model.CheckEmElaboracao%> />
                <strong>Em elaboração</strong>
            </label>
            <label>
                <input type="radio" id="rdoStatusPublicada" name="rdoStatus" value="<%= Convert.ToInt32(EstadoAplicacao.Publicada) %>" <%=Model.CheckPublicada%> />
                <strong>Publicada</strong>
            </label>
        </div>
        <div class="clear"></div>
    </div>
    
<%  } %>
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Aplicacao", new { @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnVoltarConfirmacao" class="btnNav">&laquo; Voltar</a>
            <a id="btnSalvarConfirmacao" class="btnNav">Salvar aplicação</a>
        </div>
    </div>
</div>

<div id="dlgVisualizarQuestoes" title="Listagem das Questões" class="popup SEC02511">
<%  using (Html.BeginForm("CarregarVisualizarQuestoesProva", "Aplicacao", FormMethod.Post, new { @id = "frmTabelaQuestoes", @class = "tbl" }))
    { %>
        <div class="popupConteudo">
            
                
        </div>
        <div class="popupBotoes">
            <div class="btnEspacamento direita">
                <a id="btnOcultarQuestoes" class="btnNav">Visualiar</a>
                <a id="btnFecharVisualizar" class="btnNav">Fechar</a>
            </div>
        </div>
    <% } %>
</div>
