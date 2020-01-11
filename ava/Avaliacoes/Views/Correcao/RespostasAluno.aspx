<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.CorrecaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <script src="<%= UtilView.Url("/Scripts/util/jquery.textareaCounter.plugin.js") %>" type="text/javascript"></script>
	<script src="<%= UtilView.Url("/Scripts/class/Correcao.js") %>" type="text/javascript"></script>
	<script src="<%= UtilView.Url("/Scripts/view/respostas.js") %>" type="text/javascript"></script>
	<script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	<link href="<%= UtilView.Url("/Content/css/correcao.css") %>" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
	<div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				
				<div class="clear"></div>

                <div id="alerta" class="mensagem"></div>

				<div id="infoCorrecao">

					<% Html.RenderPartial("BoxTituloAplicacao", Model); %>

					<div class="boxQuestao">
						<div class="infoQuestao">
							<div class="conteudo">
                                <label>Aluno:</label> <%=Model.NomeAluno %>
							    <span class="btn"><%= Html.ActionLink("alterar aluno", "Aplicacao", "Correcao", new { @id = Model.IdAplicacao, @idSeg = Model.IdTipoCorrecao }, new { @class = "btn" })%></span>
                            </div>
                            <div class="botoes">
                                <a class="btn" href="<%=Url.Action("RespostasAluno", "Correcao", new { @id = Model.Anterior })%>" id="btnPrev" datavalor="<%=Model.Anterior %>">
                                    <span class="btnEsquerda"></span>
                                    Anterior
                                </a>                             
                                <a class="btn" href="<%=Url.Action("RespostasAluno", "Correcao", new { @id = Model.Proximo })%>" id="btnNext" datavalor="<%=Model.Proximo %>">
                                    Próximo
                                    <span class="btnDireita"></span>
                                </a>
                            </div>
						</div>
					</div>
					
					
					<% Html.RenderPartial("BoxMenuCorrecao", Model); %>
					
<%                  using (Html.BeginForm("CarregarRespostasAlunos", "Correcao", FormMethod.Post, new { @id = "frmResposta", @class = "tbl" }))
					{ %>
						<input type="hidden" id="txtIdProvaRealizada" name="txtIdProvaRealizada" value="<%= Model.IdProvaRealizada %>" />

						<div class="ferramentas hide">
							<div class="paginacao"></div>
						</div>
						<div id="lstRespostas"></div>
						<div class="ferramentas">
							<div class="resultado"></div>
							<div class="paginacao"></div>
						</div>
<%                  } %>
				</div>
			</div>
		</div>
	</div>
</asp:Content>
