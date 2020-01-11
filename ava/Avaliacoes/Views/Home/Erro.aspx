<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
	<div id="conteudo">
	    <div class="caixa">
            <% Html.RenderPartial("MenuConteudo"); %>
            <div id="caixaConteudo" class="caixaConteudo">
                <img src="<%= UtilView.Url("/Content/imgcss/404.png") %>" class="img-right" />
                <p class="fontePadrao"><%= ViewData["Erro"] %></p>
	            <br />
                <a href="javascript:history.back()" class="btn">Voltar à página anterior</a>
                <a href="<%=UtilView.UserHomeUrl %>" class="btn">Voltar ao portal</a>
                <div class="clear"></div>
            </div>

        </div>
    </div>
</asp:Content>