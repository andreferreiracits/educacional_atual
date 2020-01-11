<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import namespace="ProvaColegiada.Models" %>
<div class="novofiltro novofiltroBase">
    <input type="hidden" name="novofiltro" value="1" />
    <div class="filtrosSimples">
    <%= Html.TextBox("txtPalavraChave", "Palavra(s)-chave", new { maxlength = 60, @class = "txt txtPalavraChave", @title = "Palavra(s)-chave" })%>
    <a class="filtroBuscar">Buscar</a>
    </div>
    <div class="clear"></div>
    <div class="origemBusca">
    <% if (!((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal && !((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
       { %>
    <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Privada %>" checked="checked" /><span>Meus enunciados base</span></label>
    <%-- if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal != EnumTipoPortal.Positivo)
       { --%>
    <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Escola %>" /><span>Enunciados base da escola</span></label>
    <%-- } --%>
    <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Portal %>" /><span>Enunciados base do <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%></span></label>
    <% } %>
    </div>
    
</div>
<div class="clear"></div>
<div class="novofiltroTags"></div>
<div class="clear"></div>
