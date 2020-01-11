<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<Avaliacoes.Servicos.Relatorios.Imp.TipoRelatorio>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <script src="<%=Html.ConteudoPath("Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
    <script src="<%=Html.ConteudoPath("Scripts/util/form.Serialize.To.JavaScriptObject.js")%>" type="text/javascript"></script>
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Areas/Relatorios/Scripts/relatorio.cadastro.0.{0.0}.js")%>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
    <link href="<%=Html.ConteudoPath("Content/css/principal1.0.0extended.css")%>" rel="stylesheet" type="text/css" />
    <link href="<%=Html.ConteudoPath("Relatorios", "Content/relatorio.0.0.1.css")%>" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				<% Html.RenderAction("Criar", "Cadastro", new { area = "Relatorios", tipo = Model.Id }); %>
			</div>
		</div>
	</div>
</asp:Content>