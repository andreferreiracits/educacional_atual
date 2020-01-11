<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared"%>

<asp:Content ID="JsArea" ContentPlaceHolderID="JsArea" runat="server">
	
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/simulado.1.{0.0}.js")%>
	<script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>

</asp:Content>

<asp:Content ID="CssArea" ContentPlaceHolderID="CssArea" runat="server">
	<link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/simulado.css") %>" />
</asp:Content>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
		<div class="caixa">
			<% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
				
				<div class="clear"></div>

                <% Html.RenderPartial(ViewData["ViewBotaoCriar"].ToString()); %>

				<div id="alerta" class="mensagem"></div>
				
			<!-- #region Formulário da Tabela de Aplicacao -->
				<% using (Html.BeginForm("CarregarSimulados", "Simulado", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" }))
				{ %>
				<div class="ferramentas hide">
					<div class="funcao">
						<div id="acao" class="slc">
							<a class="nome">Ações</a>
							<div class="opcoes acao">
								<%= Html.ActionLink("Excluir", "ExcluirAplicacao", "Agendamento", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
							</div>
						</div>
						<div id="filtro" class="slc">
							<a class="nome">Filtros</a>
							<div class="opcoes filtro">
								<a class="fechar right" href="#fechar">X</a>
								<div class="frm">
									<label for="txtNome">Título:</label>
									<%= Html.TextBox("txtTitulo", "", new { maxlength = 60, @class = "txt" })%>
									
									<div class="clear"></div>
									
									<label for="slcStatus">Status:</label>
									<%= Html.DropDownList("slcStatus", (IEnumerable<SelectListItem>)ViewData["Status"], new { @class = "slc" })%>
									 
									<div class="clear"></div>
									
									<div class="clear"></div>

									<label for="txtRealizacao" class="labelData">Realização:</label>
									<%= Html.TextBox("txtRealizacaoInicial", "", new { @id = "txtRealizacaoInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
									<span>a</span>
									<%= Html.TextBox("txtRealizacaoFinal", "", new { @id = "txtRealizacaoFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
									
								</div>
								<div class="botoes">
									<input type="button" id="btnCancelar" class="btn fechar left" value="Cancelar" />
									<input type="button" id="btnFiltrar" class="btn executar right" value="Filtrar" />
								</div>
							</div>
						</div>
					</div>
					<div class="filtros"></div>
					<div class="paginacao"></div>
				</div>
				<div class="clear"></div>
				<table id="tblSimulados" class="tabela">
					<thead>
						<tr>
							<td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkSimulado" name="chkSimulado" /></td>
							<td style="width:35%;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "titulo" })%></td>
							<td><%= Html.ActionLink("Início", "Ordenar", new { @ordem = "inicio" }, new { @class = "crescente" })%></td>
                            <td><%= Html.ActionLink("Término", "Ordenar", new { @ordem = "fim" }, new { @class = "crescente" })%></td>
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


    <div id="dlgRanking" title="Ranking simulado" class="popup SEC02511">
<%      using (Html.BeginForm("VisualizarRankingCompleto", "Simulado", FormMethod.Post, new { @id = "frmRankingSimulado", @class = "tbl" }))
		{ %>
		<div class="popupConteudo">

		</div>
		<div class="popupBotoes">
			<div class="btnEspacamento">
				<a id="btnCancelarRanking" class="btnNav">Cancelar</a>
			</div>
			<div class="btnEspacamento direita">
				<a id="btnVisualizarRanking" class="btnNav">Visualizar</a>
			</div>
            <div class="btnEspacamento direita">
				<a id="btnGerarRanking" class="btnNav">Gerar Ranking</a>
			</div>
            <div class="btnEspacamento direita">
				<a id="btnContinuarGerarRanking" class="btnNav">Continuar Processo</a>
			</div>
            <div class="btnEspacamento direita">
				<a id="btnOcultarRanking" class="btnNav">Ocultar Ranking</a>
			</div>
            <div class="btnEspacamento direita">
				<a id="btnLiberarRanking" class="btnNav">Liberar Ranking</a>
			</div>
            <div class="btnEspacamento direita">
				<a id="btnVoltarRanking" class="btnNav">Voltar</a>
			</div>
		</div>
<%  } %>


	</div>
	
</asp:Content>