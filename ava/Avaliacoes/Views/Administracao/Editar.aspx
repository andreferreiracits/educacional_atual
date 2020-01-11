<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.BancoQuestaoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>
<%@ Import Namespace="ProvaColegiada.Models" %>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
	<script src="<%= UtilView.Url("/Scripts/class/Aba.js") %>" type="text/javascript"></script>
	<script language="javascript" type="text/javascript">
		var caminhoGerenciadorGrupos = "<%= UtilView.PathGerenciadorGrupos("") %>";
	</script>

    <%--<script src="<%= UtilView.PathGerenciadorGrupos("/Scripts/class/ListaGerenciadorUsuarios1.0.1.js") %>"type="text/javascript"></script>--%>
    <script type="text/javascript" src="<%= UtilView.PathGerenciadorGrupos("/Scripts/view/GerenciadorGrupos4.0.0.js")%>"></script>

    <script src="<%= UtilView.Url("/Scripts/view/novoBancoQuestao.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	<link href="<%= UtilView.Url("/Content/css/administracao.css") %>" rel="stylesheet" type="text/css" />

	<link href="<%= UtilView.PathGerenciadorGrupos("/Content/css/ListaGerenciadorUsuarios.css") %>" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
	<div id="conteudo">
		<div class="caixa">

			<% Html.RenderPartial("MenuConteudo"); %>

			<div id="caixaConteudo" class="caixaConteudo">
				<div id="infoAdministracao">
					<div class="cxaTituloPagina">
					   <h3 id="tituloPagina" class="tituloStatus">Cadastro novo banco</h3>
					   <%= Html.ActionLink("« Voltar a listagem dos bancos", "Index", "Administracao", new { @class = "linkPadrao" })%>
					</div>
					
					<% Html.RenderPartial("MenuNavegacaoAdministracao"); %>
					
					<div id="alerta" class="mensagem comBotao"></div>
					
<%                  using (Html.BeginForm("SalvarBanco", "Administracao", FormMethod.Post, new { @id = "frmAdministracao" }))
					{
						Response.Write(Html.Hidden("idBancoSalvar", Model.Id));
					}
%>
					<div id="cxaConfiguracao"></div>
					<div id="cxaUsuario"></div>
					<div id="cxaConfirmacao"></div>

				</div>
			</div>
		</div>
	</div>

	
</asp:Content>