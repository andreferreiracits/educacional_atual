<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
	<script src="<%= UtilView.Url("/Scripts/class/RelatorioAgendamento.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/class/AnularQuestao.js") %>" type="text/javascript"></script>
    
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/aplicacao.1.{0.0}.js")%>
	<script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	 <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/anularquestao.css") %>" />
     <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/relatorioAgendamento.css") %>" />
         <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">

	<div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				<div class="clear"></div>

				<% Html.RenderPartial(ViewData["ViewBotaoCriar"].ToString()); %>
				
				<div id="alerta" class="mensagem comBotao"></div>
				
			<!-- #region Formulário da Tabela de Aplicacao -->
				<% using (Html.BeginForm("CarregarAplicacaoCadastro", "Agendamento", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" })) { %>

                <% Html.RenderPartial("NovoFiltroCadastro"); %>
				<div class="ferramentas hide">
					<div class="funcao">
						<div id="acao" class="slc">
							<a class="nome">Ações</a>
							<div class="opcoes acao">
								<%= Html.ActionLink("Excluir", "ExcluirAplicacao", "Agendamento", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
							</div>
						</div>
						<!--% Html.RenderPartial("oldFiltroCadastro"); %-->
					</div>
					<div class="filtros"></div>
					<div class="paginacao"></div>
				</div>
				<div class="clear"></div>
				<table id="tblProvas" class="tabela">
					<thead>
						<tr>
							<td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkProva" name="chkProva" /></td>
							<td style="width: 400px;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "titulo" })%></td>
							<!--td style="width: 180px;">< %= Html.ActionLink("Instituição", "Ordenar", new { @ordem = "instituicao" })%></td-->
							<td style="width: 110px;"><%= Html.ActionLink("Início", "Ordenar", new { @ordem = "realizacaoInicio" }, new { @class = "crescente" })%></td>
							<td style="width: 140px;"><%= Html.ActionLink("Fim", "Ordenar", new { @ordem = "realizacaoFim" })%></td>
							<td style="width: 160px;"><%= Html.ActionLink("Estado", "Ordenar", new { @ordem = "status" })%></td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
				<div class="ferramentas">
					<div class="resultado"></div>
					<div class="paginacao"></div>
				</div>
				<% } %>
			<!-- #end region Formulário da Tabela de Aplicacao -->
			
			</div>
		</div>
	</div>

    <% Html.RenderPartial("../Agendamento/DlgAnularQuestao"); %>
    <% Html.RenderPartial("../Agendamento/Relatorio/DlgRelatorio"); %>
    

</asp:Content>