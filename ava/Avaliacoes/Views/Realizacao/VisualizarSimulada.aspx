<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Realizador.Master" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="Content2" ContentPlaceHolderID="CssArea" runat="server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="JsArea" runat="server">
	<script type="text/javascript" language="javascript">
        
    var opcoes = {
                'idAplicacao': <%=ViewData["idAplicacao"]%>,
                'idConfig': <%=ViewData["idConfig"]%>,
                'bolSimulada' : true
            };
        

        $(document).ready(function () {
            $("#caixaConteudoAvaliacoes").avaliacoesRealizacao(opcoes)
                                            .avaliacoesRealizacao("iniciar");
        });

    </script>

</asp:Content>
