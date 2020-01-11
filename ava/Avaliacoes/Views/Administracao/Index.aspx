<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
	<script src="<%= UtilView.Url("/Scripts/view/administracao.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
    <link href="<%= UtilView.Url("/Content/css/administracao.css") %>" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
	<div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				<div class="clear"></div>

				<%= Html.ActionLink("Criar novo banco", "CriarBanco", "Administracao", new { @id = "addBanco", @class = "btn" })%>
				
				<div id="alerta" class="mensagem comBotao"></div>
				
			<!-- #region Formulário da Tabela de Aplicacao -->
				<% using (Html.BeginForm("CarregarBancoCadastro", "Administracao", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" }))
       { %>
				<div class="ferramentas hide">
					<div class="paginacao"></div>
				</div>
				<div class="clear"></div>
				<table id="tblBancos" class="tabela">
					<thead>
						<tr>
							<td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkBanco" name="chkBanco" /></td>
							<td style="width: 400px;"><%= Html.ActionLink("Nome do banco", "Ordenar", new { @ordem = "titulo" }, new { @class = "crescente" })%></td>
							<td style="width: 110px;"><%= Html.ActionLink("Visibilidade", "Ordenar", new { @ordem = "visibilidade" })%></td>
							<td style="width: 100px;"><%= Html.ActionLink("Fluxo", "Ordenar", new { @ordem = "fluxo" })%></td>
							<td style="width: 100px;"><%= Html.ActionLink("Data criação", "Ordenar", new { @ordem = "data" })%></td>
                            <td style="width: 100px;"><%= Html.ActionLink("Nº Questões", "Ordenar", new { @ordem = "questoes" })%></td>
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


</asp:Content>