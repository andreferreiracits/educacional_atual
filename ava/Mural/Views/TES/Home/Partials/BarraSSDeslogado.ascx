<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id="login_ava">
    <form id="Form1" method="post" action="<%= System.Web.Security.FormsAuthentication.LoginUrl %>/Home/Login">
        <label>Login:</label><%=Html.TextBox("login") %>
        <label>Senha:</label><%=Html.Password("senha") %>
        <%=Html.Hidden("academicoDominio", "TES") %>
        <input type="submit" value="Ok" />
    </form>
</div>