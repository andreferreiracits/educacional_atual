<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
	<script language="javascript" type="text/javascript">
		var caminhoGerenciadorGrupos = "<%= UtilView.PathGerenciadorGrupos("") %>";
	</script>

    <script type="text/javascript" src="<%= UtilView.PathGerenciadorGrupos("/Scripts/view/GerenciadorGrupos4.0.0.js")%>"></script>

    <%--<script src="<%= UtilView.PathGerenciadorGrupos("/Scripts/class/ListaGerenciadorUsuarios1.0.1.js") %>"type="text/javascript"></script>--%>
    <!--script src="<%= UtilView.Url("/Scripts/view/coordenador.js") %>" type="text/javascript"></script-->
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/coordenador.1.{0.0}.js")%>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	<link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/coordenador.css") %>" />
    <%--Não é usado...<link href="<%= UtilView.PathGerenciadorGrupos("/Content/css/gerenciadorgrupos-1.0.1.css") %>" rel="stylesheet" type="text/css" />--%>
    <link href="<%= UtilView.PathGerenciadorGrupos("/Content/css/ListaGerenciadorUsuarios.css") %>" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
	    <div class="caixa">
            <% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
                <div id="infoCoordenador">
                    <div class="clear"></div>
                        <span class="subtitulo">Consulte avaliações e pesquisas agendadas para alunos ou criadas pelos professores da sua escola. Faça uma busca para encontrar um aluno ou educador.</span>
			        <div id="alerta" class="mensagem comBotao"></div>
                    <ul class="coordenadorOpcoes">
                        <li class="opcaoAluno"><a class="" id="btnListaAlunos">Aluno</a></li>
                        <li class="opcaoProfessor" ><a class="" id="btnListaProfessores">Professor</a></li>
                    </ul>
                    <div id="BoxListaCoordenador"></div>
                </div>
            </div>
		</div>
    </div>
    <div id="dlgResumoAplicacao" title="Resumo Agendamento" class="popup SEC02511">
    <%
        using (Html.BeginForm("ResumoAgendamento", "Agendamento", FormMethod.Post, new { @id = "formResumoAgendamento", @class = "tbl" }))
		{
            %>
            <div class="popupConteudo"></div>
            <div class="clear"></div>
		    <div class="popupBotoes">
			    <div class="btnEspacamento">
				    <a id="btnCancelarResumo" class="btnNav">Cancelar</a>
			    </div>
		    </div>
            <%
        }
    %>
	</div>
</asp:Content>