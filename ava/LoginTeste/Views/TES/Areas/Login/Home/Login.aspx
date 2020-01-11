<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Login.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderLogo" runat="server">
    <h1><a href="/AVA/Mural"><img src="/AVA/StaticContent/Common/img/perfil/logo_educa_grande.png" alt="Logo" border="0"></a></h1>        
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentPlaceHolderConteudo" runat="server">
<br />
    <table align="center">
    <% using (Html.BeginForm())
        
       { %>
        <tr>
            <td colspan="2" align="left">
                <%: Html.ValidationSummary() %>
            </td>
        </tr>
        <%=Html.Hidden("academicoDominio", "TES") %>
        <%=Html.Hidden("returnUrl", ViewData["ReturnUrl"]).ToString()%>
        <tr>
            <td>
                <label for="login"><%= this.Resource("login_username_label")%> </label>
            </td>
            <td>
                <%=Html.TextBox("login") %>
            </td>
        </tr>
        <tr>
            <td>
                <label for="senha"><%= this.Resource("login_password_label")%> </label>
            </td>
            <td>
                <%=Html.Password("senha") %>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="right">
              <input type="submit" value="<%= this.Resource("login_singin_button")%>" />
            </td>
        </tr>
    <% } %>
    </table>
<br />
<br />
<br />
<br />
<br />
<br />
<br />
</asp:Content>