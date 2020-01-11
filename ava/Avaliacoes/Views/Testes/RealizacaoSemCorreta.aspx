<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Realizador.Master" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="Content2" ContentPlaceHolderID="CssArea" runat="server">

    <link href="<%= UtilView.Url("/Content/css/carregando_aplicador.css")%>" rel="stylesheet" type="text/css" />
	<link href="<%= UtilView.Url("Content/css/realizacao2.1.0.css")%>" rel="stylesheet" type="text/css" />

</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="JsArea" runat="server">

    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Confirm3.0.0.js")%>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/avaliacoes.quickaplicacao-2.0.1.js") %>"></script>


	<script type="text/javascript" language="javascript">
        
        var opcoesView = {
            'idProva': <%=ViewData["idProva"]%>,
            'modo' : 'view',
            'idPagina': 0,
			'viewCorreta' : (<%=ViewData["correta"]%> == 1 ? true : false)
        };

        $(document).ready(function () {
            $("#caixaConteudoAvaliacoes").avaliacoesQuickAplicacao(opcoesView);
        });
</script>

</asp:Content>