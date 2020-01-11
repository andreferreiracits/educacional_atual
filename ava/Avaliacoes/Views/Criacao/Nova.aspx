<%@ Page Language="C#" validateRequest="false" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>
<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    
    <script language="javascript" type="text/javascript">
		var lstTipoClassificacao = <%=EnumClassificacaoView.JSArrayTipoClassificacao %>;
	</script>

    <script src="<%= UtilView.PathTiny %>" type="text/javascript"></script>
	<script src="<%= UtilView.Url("/Scripts/util/tiny_mce/jquery.tinymce.js") %>" type="text/javascript"></script>
    <% Html.RenderPartial(Model.JsFormatTyneView); %>

    <script src="<%= UtilView.Url("/Scripts/class/Aba.js") %>" type="text/javascript"></script>
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/novaProva.1.{0.0}.js")%>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.hoverIntent.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.colourPicker.js") %>" type="text/javascript"></script>

    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/No.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Arvore.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/NovaArvore.js") %>"></script> 
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/NovaClassificacao.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Classificacao.js") %>"></script>
    <% foreach (string jsClassificacao in EnumClassificacaoView.JSTipoClassificacao)
       { %>
       <script src="<%= UtilView.Url(jsClassificacao) %>" type="text/javascript"></script>
    <% } %>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Lista.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>

    <script src="<%= UtilView.Url("/Scripts/view/classificacaoQuestao.js") %>" type="text/javascript"></script>

</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
        <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/arvore.css") %>" />
        <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
        <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/questaoAgrupamento.css") %>" />
        
        <!--link href="< %= UtilView.Url("/Content/css/criacao.css") %>" rel="stylesheet" type="text/css" /-->
        <%=Html.BundleCss(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Content/css/criacao.1.{0.0}.css")%>
        <link href="<%= UtilView.Url("/Content/css/jquery.colourPicker.css") %>" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
	    <div class="caixa">
		    <% Html.RenderPartial("MenuConteudo"); %>
		    <div id="caixaConteudo" class="caixaConteudo">

                <div id="infoCriacao">
                    <div class="cxaTituloPagina">
                        <h3 class="tituloStatus">Cadastro de avaliação</h3>
                        <%= Html.ActionLink("« Voltar a listagem das avaliações", "Index", "Criacao", new { @class = "linkPadrao" })%>
                    </div>
                    
                    <div id="avisoStatus">
        	            <div class="bordaEsq"></div>
                        <div class="bordaMeio SEC02511_texto">
            	            Estado da avaliação: <span id="statusQuestao" class="status"><%= Model.Estado%></span>
                        </div>
        	            <div class="bordaDir"></div>
                    </div>
                    
                    
                     <% Html.RenderPartial(Model.FluxoHistoricoEstadoView, Model.HistoricoEstado); %>

                    <% Html.RenderPartial("MenuNavegacaoProva"); %>
                    
                    <div id="alerta" class="mensagem comBotao"></div>
                    
<%                  using (Html.BeginForm("SalvarProva", "Criacao", FormMethod.Post, new { @id = "frmProva" }))
                    {
                        Response.Write(Html.Hidden("idProvaSalvar", Model.Id));
                    }
%>
                    <div id="cxaEstrutura"></div>
                    <div id="cxaQuestoes"></div>
                    <div id="cxaConfirmacao"></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>