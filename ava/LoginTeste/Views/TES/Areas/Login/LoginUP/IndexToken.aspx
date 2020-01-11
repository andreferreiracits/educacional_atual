<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Login.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<table>
    <tr><td>Raw: </td><td><textarea cols="100" rows="5"><%=ViewData["strRawToken"]%></textarea></td></tr>
    <tr><td>Token: </td><td><textarea cols="100" rows="5"><%=ViewData["strToken"]%></textarea></td></tr>
</table>

	<form id="formulario" action="<%=Url.Action("SSO", "Home", new { area = "Login" } ) %>" method="get">
		<input type="hidden" name="token" value="<%=ViewData["strToken"]%>" />
        <input type="submit" value="Enviar" />
	</form>
</asp:Content>