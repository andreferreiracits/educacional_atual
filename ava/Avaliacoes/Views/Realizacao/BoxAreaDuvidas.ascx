<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.RealizacaoView>" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>

<div class="conteudoDuvidaQuestao">
    <% if (!Model.Encerrada && Model.DuvidaAtual.Count < DuvidaQuestaoRealizada.TOTAL_DUVIDAS)
       { %>
    <div class="areaBotaoDuvida">
        <a id="btnDuvida" class="btnNovo btnCinza210"><div class="texto">Dúvidas ou comentários?</div></a>    
    </div>
    <div id="boxCaixaDuvida" style="display:none;">
        <textarea id="txtTextoDuvida" name="txtTextoDuvida" class="txtAreaDuvida" maxchar="5000"></textarea>
        <div class="areaBotaoDuvida">
            <a id="btnSendDuvida" class="btnNovo btnCinza210" href="<%=Url.Action("Duvida", "Realizacao") %>"><div class="texto">Enviar dúvidas ou comentários?</div></a>    
        </div>
    </div>
    <% } %>
    <div id="boxListaDuvidas">
        <% Html.RenderPartial("ListaDuvidas", Model.DuvidaAtual); %>
    </div>
</div>