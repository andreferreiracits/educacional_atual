<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Login.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <% using (Html.BeginForm())
       { %>
        <%=Html.Hidden("academicoDominio", "TES") %>
        <br />
        <label for="login"><%= this.Resource("login_username_label")%> </label>
        <%=Html.TextBox("login") %>
        <br />
        <label for="senha"><%= this.Resource("login_password_label")%> </label>
        <%=Html.Password("senha") %>
        <br />
        <input type="submit" value="<%= this.Resource("login_singin_button")%>" />
        <br />
        <%= Html.ValidationMessage("_FORM") %>
    <% } %>
</asp:Content>