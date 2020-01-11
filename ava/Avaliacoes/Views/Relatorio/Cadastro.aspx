<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <script src="<%=Html.ConteudoPath("Relatorios", "Scripts/relatorio.home.0.0.1.js")%>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
    <link href="<%=Html.ConteudoPath("Relatorios", "Content/relatorio.0.0.1.css")%>" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				<% Html.RenderAction("Home", "Cadastro", new { area = "Relatorios" }); %>	
			</div>
		</div>
	</div>
</asp:Content>