<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
    <script type="text/javascript" src="<%= UtilView.PathGerenciadorGrupos("/Scripts/view/GerenciadorGrupos5.1.1.js")%>"></script>

	<script type="text/javascript" src="<%= UtilView.PathTiny %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/tiny_mce/jquery.tinymce.js") %>"></script>

    <%Html.RenderPartial("FormatTyne"); %>


    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery.timePicker.min.js") %>"></script>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery.ui.datepicker-pt-BR.js") %>"></script> <%-- //TODO: VERIFICAR - quando carrega o ava este js já está incluso... /AVA/StaticContent/Common/datePicker/js/datepicker.js? ' --%>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery.textareaCounter.plugin.js") %>"></script>

    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/class/Ajuda.js") %>"></script>

    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/class/NovaArvore2.0.0.js") %>"></script> 
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/class/NovaClassificacao.js") %>"></script>

    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/class/tabela1.0.0.js") %>"></script>

    <script  type="text/javascript" src="<%=Html.ConteudoPath("AvaliacaoRapida", "Scripts/avaliacoes.avaliacaorapida-1.0.0.js")%>"></script>
    <script  type="text/javascript" src="<%=Html.ConteudoPath("Scripts/view/home.1.0.0.js")%>"></script>
    
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
    <link rel="stylesheet" type="text/css" href="<%= UtilView.PathGerenciadorGrupos("/Content/css/gerenciadorgrupos-1.0.1.css") %>"/>
    <link rel="stylesheet" type="text/css" href="<%= UtilView.PathGerenciadorGrupos("/Content/css/PersonalizarGrupo.css") %>"/>
    <link rel="stylesheet" type="text/css" href="<%= UtilView.PathGerenciadorGrupos("/Content/css/ListaGerenciadorUsuarios.css") %>"/>

    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("AvaliacaoRapida", "Content/avaliacoes.avaliacaorapida-1.0.0.css") %>" />

    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/arvore.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/timePicker.css") %>" />

    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/ajudaView.css") %>" />

    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/principal1.0.0extended.css") %>" />
    <%=Html.BundleCss(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "refactor-content/avl_css/home.1.{0.0}.css")%>
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
                <div>
                    <% Html.RenderAction("BannerHome", "App"); %>
                    <div data-acao="load">
                        <%= Html.ActionLink("Area Agendamento", "AreaHomeAvaliacao", "AgendamentoNovo", null, new { @class="hide" })%>
                        <div class="sec025carregando">Carregando...</div>
                    </div>
                </div>
                <div>
				    <div id="sec025BoxAvaliacaoRapida">
                        <p>Quer criar e aplicar uma avaliação em apenas três passos?
                        <a href="#" id="sec025btnAbrirAvRapida">Comece já!<!--img src="<%=Html.ConteudoPath("AvaliacaoRapida", "Content/imgcss/btn_avalicao_rapida.jpg")%>" title="Avaliação Rápida" /--></a></p>
                    </div>
                    <div  data-acao="load">
                        <%= Html.ActionLink("Area Correcao", "AreaHomeAvaliacao", "CorrecaoNovo", null, new { @class="hide" })%>
                        <div class="sec025carregando">Carregando...</div>
                    </div>
                </div>
			</div>
		</div>
	</div>
    <div id="dlgAvaliacaoRapida" title="Avaliação Rápida" class="popup SEC02511">
        <div id="sec025AvRapida"></div>
    </div>
</asp:Content>
