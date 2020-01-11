<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<asp:Content ID="TitleArea" ContentPlaceHolderID="TitleArea" runat="server">
    <%=Html.BundleScript(Avaliacoes.Framework.Web.Bundle.Bundle.Tipo.Sem, "Scripts/view/relatorio.1.{0.0}.js")%>
    <script src="<%= Page.ResolveUrl("~/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentArea" runat="server">
    <div id="conteudo">
	    <div class="caixa">
            <% Html.RenderPartial("MenuConteudo"); %>
			<div id="caixaConteudo" class="caixaConteudo">
			    <% Html.RenderPartial("BancoSelecionado"); %>

			    <div class="clear"></div>
	    
            <!-- #region Formulário da Tabela de Aplicacao -->
                <% using (Html.BeginForm("CarregarAplicacaoRelatorio", "Relatorio", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" }))
                { %>
			    <div class="ferramentas">
			        <div class="funcao">
			            <div id="acao" class="slc">
		                    <a class="nome">Ações</a>
		                    <div class="opcoes acao">
		                        <%= Html.ActionLink("Excluir", "ExcluirAplicacao", "Aplicacao", new { acao = "apagar" }, new { @id = "apagar", @class = "opcao" })%>
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
    								 
					                <label for="slcInstituicao">Instituição:</label>
					                <%= Html.DropDownList("slcInstituicao", (IEnumerable<SelectListItem>) ViewData["Instituicoes"], new { @class = "slc" })%>

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
				<table id="tblProvas" class="tabela">
	                <thead>
		                <tr>
			                <td class="selecionar" style="width: 20px;"><input type="checkbox" id="chkProva" name="chkProva" /></td>
			                <td style="width: 400px;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "titulo" })%></td>
			                <td style="width: 180px;"><%= Html.ActionLink("Instituição", "Ordenar", new { @ordem = "instituicao" })%></td>
			                <td style="width: 110px;"><%= Html.ActionLink("Realização", "Ordenar", new { @ordem = "realizacao" }, new { @class = "crescente" })%></td>
			                <td style="width: 140px;"><%= Html.ActionLink("Estado", "Ordenar", new { @ordem = "status" })%></td>
			                <td style="width: 160px;"><%= Html.ActionLink("Tipo", "Ordenar", new { @ordem = "tipo" })%></td>
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
