<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<div class="novofiltro novofiltroAv">
    <input type="hidden" name="novofiltro" value="1" />
    <p>Selecione uma ou mais opções abaixo para buscar por avaliações:</p>
    
    <div class="filtrosSimples">
    <%= Html.TextBox("txtPalavraChave", "Palavra(s)-chave", new { maxlength = 60, @class = "txt txtPalavraChave", @title = "Palavra(s)-chave" })%>
    <a class="filtroBuscar">Buscar</a>
    </div>
    <%= Html.DropDownList("slcStatus", (IEnumerable<SelectListItem>)ViewData["Status"], new { @class = "slc" })%>
    <%= Html.DropDownList("slcTipoSelecao", (IEnumerable<SelectListItem>)ViewData["TipoSelecao"], new { @class = "slc" })%>
    <div class="clear"></div>
    <div class="origemBusca">
        <% if (!((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal && !((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
           { %>
        <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Privada %>" checked="checked" /><span>Minhas avaliações</span></label>
        <%-- if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal != EnumTipoPortal.Positivo)
           { --%>
        <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Escola %>" /><span>Avaliações da escola</span></label>
        <%-- } --%>
        <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Portal %>" /><span>Avaliações do <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%></span></label>
        <%} %>
        <div class="dataModificacao">
            <label class="topico" for="txtModificado">Data de modificação:</label>
	        <%= Html.TextBox("txtModificadoInicial", "", new { @id = "txtModificadoInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
	        <span>a</span>
	        <%= Html.TextBox("txtModificadoFinal", ViewData["Modificado"], new { @id = "txtModificadoFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
        </div>
    </div>
    
    <div class="clear"></div>
</div>
<div class="clear"></div>
<div class="novofiltroTags"></div>
<div class="clear"></div>
