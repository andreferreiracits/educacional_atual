<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Realizador.Master" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="Content2" ContentPlaceHolderID="CssArea" runat="server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="JsArea" runat="server">
	<script type="text/javascript" language="javascript">
        
        var opcoes = {
                'idProvaRealizada': <%=ViewData["idProvaRealizada"]%>,
                'showRealizadaRespostas': false,
                'showRealizadaResumo' : false,
                'showRealizadaRespostaIndividuais' : true
            };
        var idPagina = <%=ViewData["idPagina"]%> ;
        $(document).ready(function () {
            if(idPagina > 0){
                $("#caixaConteudoAvaliacoes").avaliacoesRealizacao(opcoes)
                                             .avaliacoesRealizacao("visualizardireto");
            }else{
                $("#caixaConteudoAvaliacoes").avaliacoesRealizacao(opcoes)
                                             .avaliacoesRealizacao("visualizardireto", {questao:idPagina-1});
            }
        });


    </script>
</asp:Content>
