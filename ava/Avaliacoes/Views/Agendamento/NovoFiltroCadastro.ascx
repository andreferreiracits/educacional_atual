<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div class="novofiltro novofiltroAg">
    <input type="hidden" name="novofiltro" value="1" />
    <p>Selecione uma ou mais opções abaixo para buscar por agendamentos:</p>
    
    <div class="filtrosSimples">
    <%= Html.TextBox("txtPalavraChave", "Palavra(s)-chave", new { maxlength = 60, @class = "txt txtPalavraChave txtPalavraChaveAg", @title = "Palavra(s)-chave" })%>
    <%= Html.DropDownList("slcStatus", (IEnumerable<SelectListItem>)ViewData["Status"], new { @class = "slc" })%>
    <div class="dataModificacao modificacaoAgendamento">
        <label class="topico" for="txtModificado">Realização:</label>
	    <%= Html.TextBox("txtRealizacaoInicial", "", new { @id = "txtRealizacaoInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
	    <span>a</span>
	    <%= Html.TextBox("txtRealizacaoFinal", ViewData["Modificado"], new { @id = "txtRealizacaoFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
    </div>
    <a class="filtroBuscar">Buscar</a>
    </div>
    <div class="clear"></div>
</div>
<div class="clear"></div>
<div class="novofiltroTags"></div>
<div class="clear"></div>
