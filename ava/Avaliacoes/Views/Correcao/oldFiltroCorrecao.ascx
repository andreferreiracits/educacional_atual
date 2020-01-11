<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="filtro" class="slc">
	<a class="nome">Filtros</a>
	<div class="opcoes filtro">
		<a class="fechar right" href="#fechar">X</a>
		<div class="frm">
			<label for="txtNome">Título:</label>
			<%= Html.TextBox("txtTitulo", "", new { maxlength = 60, @class = "txt" })%>
									
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
