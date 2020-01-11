<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
	
	<%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/correcao.1.{0.0}.js")%>
	<script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>

    <script src="<%= UtilView.Url("/Scripts/class/AnularQuestao.js") %>" type="text/javascript"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Ajuda.js") %>"></script>

</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	<link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/anularquestao.css") %>" />
        <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/ajudaView.css") %>" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				
				<div class="clear"></div>
                <a id="helpTopoCorrecao" class="btn sec_menuNavegacao" href="javascript:void(O)">?</a>
				<div id="alerta" class="mensagem"></div>
				
			<!-- #region Formulário da Tabela de Aplicacao -->
				<% using (Html.BeginForm("CarregarAplicacaoCorrecao", "Correcao", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" }))
				{ %>
                <% Html.RenderPartial("NovoFiltroCorrecao"); %>
				<div class="ferramentas hide">
					<div class="funcao">
						<!--% Html.RenderPartial("oldFiltroCorrecao"); %-->
					</div>
					<div class="filtros"></div>
					<div class="paginacao"></div>
				</div>
				<div class="clear"></div>
				<table id="tblProvas" class="tabela">
					<thead>
						<tr>
							<td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkProva" name="chkProva" /></td>
							<td style="width:35%;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "titulo" })%></td>
							<td><%= Html.ActionLink("Início", "Ordenar", new { @ordem = "inicio" }, new { @class = "crescente" })%></td>
                            <td><%= Html.ActionLink("Término", "Ordenar", new { @ordem = "fim" }, new { @class = "crescente" })%></td>
                            <td style="width:21%;"><%= Html.ActionLink("Questões Pendentes", "Ordenar", new { @ordem = "pendentes" }, new { @class = "crescente" })%></td>
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
	
</asp:Content>