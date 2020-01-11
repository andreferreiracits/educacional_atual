<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Classificacao "%>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.Models" %>

<div class="novofiltro">
    <input type="hidden" name="novofiltro" value="1" />
    <p>Selecione uma ou mais opções abaixo para buscar por questões:</p>
    
    <div class="filtrosSimples">
    <%= Html.TextBox("txtPalavraChave", "Palavra(s)-chave", new { maxlength = 60, @class = "txt txtPalavraChave", @title = "Palavra(s)-chave" })%>
    <% Html.RenderAction("FiltroSelect", "NivelEnsino");%>
    <% Html.RenderAction("FiltroSelect", "AreaAssunto");%>
    <a class="filtroBuscar">Buscar</a>
    </div>
    <div class="clear"></div>
    <div class="origemBusca">
    <% if (!((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal && !((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
       { %>
    <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Privada %>" checked="checked" /><span>Minhas questões</span></label>
    <%-- if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal != EnumTipoPortal.Positivo)
       { --%>
    <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Escola %>" /><span>Questões da escola</span></label>
    <%-- } --%>
    <label><input type="checkbox" name="chkOrigemBusca" value="<%= (int)Compartilhada.Portal %>" /><span>Questões do <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%></span></label>
    <% } %>
    <a class="btnNovofiltroOpcoes fechado">» Mais opções</a>
    </div>
    
</div>
<div class="novofiltroOpcoes">
    <div class="classificacaoCriterios">Classificação:
    <%
        foreach (EnumClassificacaoView tipo in EnumClassificacaoView.Values())
        {
            Html.RenderAction(tipo.TipoView.ActionBtnFiltro,tipo.TipoView.Controller);
                                
    } %>
    </div>
    <div class="clear"></div>
    <div class="filtrosAvancadoslinha2">
    Finalidade:
    <% 
        
       IList<SelectListItem> bancos = (IList<SelectListItem>)ViewData["Bancos"];
       foreach (SelectListItem banco in bancos)
       {
            %>
    <label><input type="checkbox" name="chkFinalidade" value="<%= banco.Value %>" checked="checked" /><%=banco.Text%></label>
    <% } %>
    <%= Html.DropDownList("slcStatus", (IEnumerable<SelectListItem>)ViewData["Status"], new { @class = "slc" })%>
    <%= Html.DropDownList("slcTipo", (IEnumerable<SelectListItem>)ViewData["Tipo"], new { @class = "slc" })%>
    <% if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal || ((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
       {
           %>
    <%= Html.DropDownList("slcDificuldade", (IEnumerable<SelectListItem>)ViewData["Dificuldade"], new { @class = "slc" })%>
    <% } %>
    </div>
    <div class="clear"></div>
    <label class="topico" for="txtModificado">Data de modificação:</label>
	<%= Html.TextBox("txtModificadoInicial", "", new { @id = "txtModificadoInicial", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
	<span>a</span>
	<%= Html.TextBox("txtModificadoFinal", ViewData["Modificado"], new { @id = "txtModificadoFinal", @size = 14, @maxlength = 20, @class = "txt txtData" })%>
    <div class="clear"></div>
    <% if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.AdministradorPortal || ((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.PermissaoExtra)
       {
           %>
           <label class="topico" for="txtIdentificadores">Identificadores:<%= Html.TextBox("txtIdentificadores", " ", new { @class = "txt", @title = "", @size = 100 })%></label>
           <%
       }%>

</div>
<div class="clear"></div>
<div class="novofiltroTags"></div>
<div class="clear"></div>
