<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Login.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>
<%@ Import Namespace="PositivoLMS.DAL.DALInterface.Login.DTO" %>


<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <table>
    <% using (Html.BeginForm())
        
       { %>
        <tr>
            <td colspan="2" align="left">
                <%: Html.ValidationSummary() %>
            </td>
        </tr>
        <tr>
            <td>
                <label for="loginAcademicoDominio">Unidade: </label>
            </td>
            <td>
                <select name="loginAcademicoDominio">
                    <option value="UNI">UNI</option>
                    <option value="CT">CT</option>
                </select>
            </td>
        </tr>

        <tr>
            <td>
                <label for="login">Login: </label>
            </td>
            <td>
                <select name="login">
                <%
                    UsuarioDTO[] usuarios = (UsuarioDTO[])ViewData["usuarios"];
                    foreach (UsuarioDTO o in usuarios)
                    {
                        %><option value="<%=o.strLogin%>"><%=o.strLogin%></option><%
                    }
                %>
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="right">
              <input type="submit" value="Enviar" />
            </td>
        </tr>
    <% } %>
    </table>
</asp:Content>