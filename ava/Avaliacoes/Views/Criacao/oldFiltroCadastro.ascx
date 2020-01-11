<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="filtro" class="slc">
	<a class="nome">Filtros</a>
	<div class="opcoes filtro">

		<a class="fechar right" href="#fechar">X</a>

		<div class="frm">
			<label for="txtNome">Nome:</label>
			<%= Html.TextBox("txtNome", "", new { maxlength = 60, @class = "txt" })%>
					                
			<div class="clear"></div>
				                
    		<label for="txtNome">Identificador:</label>
			<%= Html.TextBox("txtIdentificador", "", new { maxlength = 100, @class = "txt" })%>
					                
			<div class="clear"></div>

			<label for="slcStatus">Estado:</label>
			<%= Html.DropDownList("slcStatus", (IEnumerable<SelectListItem>)ViewData["Status"], new { @class = "slc" })%>

			<div class="clear"></div>

            <label for="slcTipoSelecao">Seleção:</label>
			<%= Html.DropDownList("slcTipoSelecao", (IEnumerable<SelectListItem>)ViewData["TipoSelecao"], new { @class = "slc" })%>

            <div class="clear"></div>

			<label for="txtModificado" class="labelData">Modificado:</label>
			<%= Html.TextBox("txtModificadoInicial", "", new { @id = "txtModificadoInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
			<span>a</span>
			<%= Html.TextBox("txtModificadoFinal", "", new { @id = "txtModificadoFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
					                
            <div class="clear"></div>

            <label for="txtTotalQuestoes">N. Questões:</label>
			<%= Html.TextBox("txtTotalQuestoes", "", new { maxlength = 3, @class = "txt" })%>
					                
					                

		</div>
		<div class="botoes">
			<input type="button" id="btnCancelar" class="btn fechar left" value="Cancelar" />
			<input type="button" id="btnFiltrar" class="btn executar right" value="Filtrar" />
		</div>
	</div>
</div>
