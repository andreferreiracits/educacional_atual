<%@ Page Language="C#" Inherits="Avaliacoes.Framework.Web.Master.AvaliacaoViewPage<Avaliacoes.Framework.Utils.Mensagem.MensagemErro>" MasterPageFile="~/Views/Shared/Refactor/Avaliacao.Master" %>

<asp:Content ID="Titulo" ContentPlaceHolderID="AvlTitulo" runat="server">
</asp:Content>

<asp:Content ID="Css" ContentPlaceHolderID="AvlCss" runat="server">

	<style>
	    #avl_erro
	    {
	        height: 200px;
	        background: url(<%=Html.BundleFile("refactor-content/avl_img/widget_geral/404.png")%>) no-repeat 25px center;
	        padding-left: 170px;
	        display: table-cell;
	        vertical-align: middle;
	        font-size: 13px;
	    }
	    #avl_erro p
	    {
	        margin-bottom: 15px;
	    }
	</style>
</asp:Content>

<asp:Content ID="ScriptHead" ContentPlaceHolderID="AvlScriptHead" runat="server">
	<!--scripts no cabeçalho-->
</asp:Content>

<asp:Content ID="Conteudo" ContentPlaceHolderID="AvlContent" runat="server">
	<section id="avl_erro">
        <p><%= Model.Mensagem %></p>
	    <p>
            <a href="javascript:history.back()">Voltar à página anterior</a>
            <a href="/">Voltar ao portal</a>
        </p>
    </section>
</asp:Content>

<asp:Content ID="ScriptBotton" ContentPlaceHolderID="AvlScriptBottom" runat="server">
    <% Html.RenderPartial("Refactor/Scripts/Gerais"); %>
</asp:Content>
