<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Realizador.Master" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="Content2" ContentPlaceHolderID="CssArea" runat="server">
</asp:Content>


<asp:Content ID="Content1" ContentPlaceHolderID="JsArea" runat="server">

    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Confirm3.0.0.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/avaliacoes.quickaplicacao-2.0.1.js") %>"></script>   

	<script type="text/javascript" language="javascript">
        
        var bolGerenciador = true;

        var opcoesView = {
                'idProva': <%=ViewData["idProva"]%>,
                'modo' : 'view'
            };
        

        $(document).ready(function () {
            $("#caixaConteudoAvaliacoes").avaliacoesQuickAplicacao(opcoesView);
            
        });


    </script>

</asp:Content>
