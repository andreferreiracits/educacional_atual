<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>
<div id="dlgHabileAdicionar" title="Associar Hábile" class="popup SEC02511 hide">
    <% using (Html.BeginForm("CarregarConteudoAdicionar", "Habile", FormMethod.Post, new { @class = "tbl" })) { %>
        <%=Html.ActionLink("Link Classificações questão", "ClassificacaoQuestao", "Habile", new { @class = "hide linkClassificacaoQuestao" })%>
        <div class="popupConteudo">
            <p>Selecione:</p>
            <div class="tituloArvoreQuestao">
                <label>Hábile:</label>
            </div>
            <div class="conteudoAdicionarSelect boxArvoreScroll">
                <% Html.RenderPartial("../Classificacao/Habile/ConteudoHabile"); %>
            </div>
        </div>
        <div class="popupBotoes">
            <div class="btnEspacamento1">
                <a class="btnNav btnCancelar">Cancelar</a>
            </div>
            <div class="btnEspacamento direita">
                <%=Html.ActionLink("Salvar", "RelacionarQuestao", "Salvar", new { @class = "btnNav btnSalvar" })%>
            </div>
        </div>
    <%  } %>
</div>
<script type="text/javascript">
    $('div.btnEspacamento1').click(function () {
        $.ajax({
            url: caminhoBase + '/Questoes/ClassificacaoQuestao/',
            data: $('#frmQuestao').serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornoClassificacaoQuestao(dados); }
        });
    });
</script>
