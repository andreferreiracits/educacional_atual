<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Login.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderLogo" runat="server">
    <h1><a href="/AVA/Mural"><img src="/AVA/StaticContent/Common/img/perfil/logo_educa_novo.png" alt="Logo" border="0"></a></h1>        
</asp:Content>

<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentPlaceHolderConteudo" runat="server">
<section id="ava_container">
    <table align="center">
    <% using (Html.BeginForm())
        
       { %>
       <tbody>
        <tr>
            <td colspan="2" align="left">
                <%: Html.ValidationSummary() %>
            </td>
        </tr>
        <input id="academicoDominio" name="academicoDominio" type="hidden" value="TES">
        <input id="returnUrl" name="returnUrl" type="hidden" value="">
        <tr>
            <td>
                <label for="login">Usuário: </label>
            </td>
            <td>
                <input id="login" name="login" type="text" value="">
            </td>
        </tr>
        <tr>
            <td>
                <label for="senha">Senha: </label>
            </td>
            <td>
                <input id="senha" name="senha" type="password">
            </td>
        </tr>
        <tr>
            <td colspan="2" align="right">
              <input type="submit" value="Acessar">
            </td>
        </tr>
       </tbody>
    <% } %>
    </table>
</section>
</asp:Content>