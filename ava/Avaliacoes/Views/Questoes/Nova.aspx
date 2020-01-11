<%@ Page Title="" Language="C#" ValidateRequest="false" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.QuestaoView>" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
	<script language="javascript" type="text/javascript">
		var lstTipoResposta = <%=Model.JSArrayTipoResposta%>;
		var lstTipoClassificacao = <%=EnumClassificacaoView.JSArrayTipoClassificacao %>;
	</script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Aba.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Comentario.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Enunciado.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Alternativa.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.Associativa.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.Lacunas.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.SimplesEscolha.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.MultiplaEscolha.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.DiscursivaAutomatica.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.VerdadeiroFalso.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.Somatoria.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoResposta.Redacao.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/TipoCategoria.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Arquivo.js") %>"></script>
	<script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Classificacao.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/NovaClassificacao.js") %>"></script>
    <%
        foreach (string jsClassificacao in EnumClassificacaoView.JSTipoClassificacao)
        {
            %>
                <script src="<%= UtilView.Url(jsClassificacao) %>" type="text/javascript"></script>
            <%
        }
    %>
    <script src="<%= UtilView.Url("/Scripts/class/Tags.js") %>" type="text/javascript"></script>
	<script src="<%= UtilView.Url("/Scripts/view/novaQuestao.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/view/classificacaoQuestao.js") %>" type="text/javascript"></script>
	<script src="<%= UtilView.PathTiny %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/tiny_mce/jquery.tinymce.js") %>" type="text/javascript"></script>
    <% 
        //TODO: alterei temporariamente para resolver o problema dos usuários internos, tenho que voltar como estava para atender a estes usuários
        /*
         * Html.RenderPartial(Model.JsFormatTyneView);*/
        if (((ProvaColegiada.Controllers.BaseController)ViewContext.Controller).Usuario.AdministradorPortal ||
            ((ProvaColegiada.Controllers.BaseController)ViewContext.Controller).Usuario.PermissaoExtra)
        {
            Html.RenderPartial("FormatTyneAdmin");
        }
        else
        {
            Html.RenderPartial(Model.JsFormatTyneView);
        }
    %>
	<script src="<%= UtilView.Url("/Scripts/util/jquery.textareaCounter.plugin.js") %>" type="text/javascript"></script>
	<script src="<%= UtilView.Url("/Scripts/util/jquery.cluetip.js") %>" type="text/javascript"></script>
    <!--script type="text/javascript" src="< %= UtilView.Url("/Scripts/class/No.js") %>"></script-->
    <!--script type="text/javascript" src="< %= UtilView.Url("/Scripts/class/Arvore.js") %>"></script-->
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/NovaArvore.js") %>"></script> 
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Lista.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/arvore.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/questao.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
	<div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				<!-- % Html.RenderPartial("BancoSelecionado"); % -->
				<div id="infoQuestao">
					<div class="cxaTituloPagina">
						<h3 class="tituloStatus">Cadastro nova questão</h3>
					   <%= Html.ActionLink("« Voltar a listagem das questões", "Index", "Questoes", new { @class = "linkPadrao" })%>
					</div>
					<div id="avisoStatus">
						<div class="bordaEsq"></div>
						<div class="bordaMeio SEC02511_texto">
							Status da questão: <span id="statusQuestao" class="status"><%= Model.Estado %></span>
						</div>
						<div class="bordaDir"></div>
					</div>
                    <% Html.RenderPartial(Model.FluxoHistoricoEstadoView, Model.HistoricoEstado); %>
					<% Html.RenderPartial("MenuNavegacaoQuestao", Model); %>
					<div id="alerta" class="mensagem comBotao"></div>
                    <%
                        using (Html.BeginForm("SalvarQuestao", "Questoes", FormMethod.Post, new { @id = "frmQuestao" }))
                        {
                            %>
						        <input type="hidden" id="idQuestaoSalvar" name="idQuestaoSalvar" value="<%= Model.Id %>" />    
						    <%
                        }
                    %>
					<div id="cxaTipoQuestao"></div>
					<div id="cxaEstruturaQuestao"></div>
					<div id="cxaClassificacaoQuestao"></div>
					<div id="cxaResumoQuestao"></div>
				</div>
			</div>
		</div>
	</div>
</asp:Content>