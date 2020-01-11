<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>


    <div class="pesquisaAlunoProfessor">
    <% Html.RenderAction("BoxBuscaProfessores"); %>
        <!--label>
            Digite o nome do professor:
            <input type="text" class="txtC" name="txtNomeProcurado" id="txtNomeProcuradoProfessor"/>
        </label-->
    </div>



<div id="professorCoordenador" class="hide">

    <div class="clear"></div>
        <div class="boxAlertaMensagemAzul">
            <div class="alertaMensagemAzul">
                <span class="SEC02511_texto">Você está filtrando os dados de: <b></b></span>
                <a href="" id="btnClearFiltro" class="btnM direita">limpar filtro</a>
            </div>
        </div>
    <div class="clear"></div>

<!-- #region Formulário da Tabela de Questao -->
<% using (Html.BeginForm("CarregarAplicacoesProfessores", "Coordenador", FormMethod.Post, new { @id = "frmTabela", @class = "tbl" })) {%>
<input type="hidden" name="intIdProcurado" />
<div class="ferramentas">
	<div class="funcao">
			            
		<div id="filtro" class="slc">
			<a class="nome">Filtros</a>
			<div class="opcoes filtro">
				<a class="fechar right" href="#fechar">X</a>
				<div class="frm">
					<label for="txtNome">Título:</label>
					<%= Html.TextBox("txtTitulo", "", new { maxlength = 60, @class = "txt" })%>
					<div class="clear"></div>
									 
					<label for="slcTipo">Tipo:</label>
					<%= Html.DropDownList("slcTipo", (IEnumerable<SelectListItem>)ViewData["Tipo"], new { @class = "slc" })%>
                    
                    <label for="slcTipo">Status:</label>
                    <%= Html.DropDownList("slcStatus", (IEnumerable<SelectListItem>)ViewData["Status"], new { @class = "slc" })%>

					<label for="txtModificado" class="labelData">Modificado:</label>
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
<table id="tblAplicacoes" class="tabela" width="100%">
	<thead>
		<tr>
			<td class="selecionar" style="width: 20px;"></td>
			<td style="width: 310px;"><%= Html.ActionLink("Título", "Ordenar", new { @ordem = "titulo" })%></td>
			<td style="width: 180px;"><%= Html.ActionLink("Tipo", "Ordenar", new { @ordem = "tipo" })%></td>
			<td style="width: 160px;"><%= Html.ActionLink("Começa", "Ordenar", new { @ordem = "comeco" }, new { @class = "crescente" })%></td>
			<td style="width: 160px;"><%= Html.ActionLink("Termina", "Ordenar", new { @ordem = "termina" })%></td>
			<td style="width: 100px;"><%= Html.ActionLink("Estado", "Ordenar", new { @ordem = "status" })%></td>
		</tr>
	</thead>
	<tbody></tbody>
</table>
<div class="ferramentas">
	<div class="resultado"></div>
	<div class="paginacao"></div>
</div>
<% } %>
<!-- #end region Formulário da Tabela de Questao -->
</div>