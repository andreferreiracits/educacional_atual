<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
	<script language="javascript" type="text/javascript">
		var caminhoGerenciadorGrupos = "<%= UtilView.PathGerenciadorGrupos("") %>";
	</script>

    <script src="<%= UtilView.PathTiny %>" type="text/javascript"></script>
	<script src="<%= UtilView.Url("/Scripts/util/tiny_mce/jquery.tinymce.js") %>" type="text/javascript"></script>
    <% Html.RenderPartial(Model.JsFormatTyneView); %>

    <script src="<%= UtilView.Url("/Scripts/class/Aba.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/class/Instrucao.js") %>" type="text/javascript"></script>
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/novaAplicacao.1.{0.0}.js")%>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.timePicker.min.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
    <script type="text/javascript" src="<%= UtilView.PathGerenciadorGrupos("/Scripts/view/GerenciadorGrupos4.0.0.js")%>"></script>
    <%--<script type="text/javascript" src="<%= UtilView.PathGerenciadorGrupos("/Scripts/class/PersonalizarGrupo.js")%>"></script>--%>
    <%--<script type="text/javascript" src="<%= UtilView.PathGerenciadorGrupos("/Scripts/class/ListaGerenciadorUsuarios1.0.1.js") %>"></script>--%>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	<link href="<%= UtilView.Url("/Content/css/aplicacao.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/timePicker.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.PathGerenciadorGrupos("/Content/css/gerenciadorgrupos-1.0.1.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.PathGerenciadorGrupos("/Content/css/PersonalizarGrupo.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.PathGerenciadorGrupos("/Content/css/ListaGerenciadorUsuarios.css") %>" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
	    <div class="caixa">
		    <% Html.RenderPartial("MenuConteudo"); %>
		    <div id="caixaConteudo" class="caixaConteudo">
                <div id="infoAplicacao">
                    <div class="cxaTituloPagina">
    	               <h3 id="tituloPagina" class="tituloStatus">Cadastro novo agendamento</h3>
                 	   <%= Html.ActionLink("« Voltar a listagem das aplicações", "Index", "Agendamento", new { @class = "linkPadrao" })%>
                    </div>
                    
                    <div id="avisoStatus">
        	            <div class="bordaEsq"></div>
                            <div class="bordaMeio SEC02511_texto">
                                Status da criação:
                                <span id="statusQuestao" class="status"><%= Model.Estado %></span>
                            </div>
        	            <div class="bordaDir"></div>
                    </div>
                    
                    
                    <% Html.RenderPartial(Model.FluxoHistoricoEstadoView, Model.HistoricoEstado); %>

                    <% Html.RenderPartial("MenuNavegacaoAplicacao"); %>
                    
                    <div id="alerta" class="mensagem comBotao"></div>
                    
<%                  using (Html.BeginForm("SalvarAplicacao", "Agendamento", FormMethod.Post, new { @id = "frmAplicacao" }))
                    {
                        Response.Write(Html.Hidden("idAplicacaoSalvar", Model.Id));
                    }
%>
                    <div id="cxaEstrutura">
                    </div>
                    <div id="cxaProva"></div>
                    <div id="cxaParticipantes"></div>
                    <div id="cxaConfiguracao"></div>
                    <div id="cxaConfirmacao"></div>

                </div>
            </div>
        </div>
    </div>

    
</asp:Content>