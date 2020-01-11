<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Realizador.Master" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="Content2" ContentPlaceHolderID="CssArea" runat="server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="JsArea" runat="server">

<script type="text/javascript" language="javascript">
    $(document).ready(function () {
        var idAplicacao = <%=ViewData["idAplicacao"] %> ;
        var idUsuario = <%=ViewData["idUsuario"] %> ;
        
        var opcoes = {
            'idAplicacao': <%=ViewData["idAplicacao"]%>,
            'idConfig': <%=ViewData["idConfig"]%>
        }
        
        $.ajax({
            url: '/Realizacao/StatusRealizacaoUsuarioJson/' + idAplicacao + '/0/' + idUsuario + '/',
            type: 'post',
            success: function (data) {
                if (data.erro && data.erro.id == 3) {
                    $("#caixaConteudoAvaliacoes").avaliacoesRealizacao(opcoes).avaliacoesRealizacao("iniciar");
                } else {
                    $("#caixaConteudoAvaliacoes").avaliacoesRealizacao(opcoes).avaliacoesRealizacao("realizar", { questao: 0 });
                }
            }
        });
        
    });
</script>

</asp:Content>
