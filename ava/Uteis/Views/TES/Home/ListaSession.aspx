<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SimpleContent.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>

<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
 
<table border="1" cellpadding="5" cellspacing="0" >
    <tr><td colspan="2"><h3>Session</h3></td></tr>
    <tr><th align="left">Nome</th>
        <th align="left">Valor</th>
    </tr>
    <%
    foreach (var key in System.Web.HttpContext.Current.Session)
    {%>
        <tr><td><%:key%></td><td><%:Session[key.ToString()]%>&nbsp;</td></tr>
    <%}%>

</table>
<br />
<table border="1" cellpadding="5" cellspacing="0" >
    <tr><td colspan="2"><h3>Request.Headers</h3></td></tr>
    <tr><th align="left">Nome</th>
        <th align="left">Valor</th>
    </tr>
    <%
    foreach (var key in Request.Headers)
    {%>
        <tr><td><%:key%></td><td><%:Request.Headers[key.ToString()]%>&nbsp; </td></tr>
    <%}%>
</table>
<br />
<table border="1" cellpadding="5" cellspacing="0" >
    <tr><td colspan="2"><h3>Request.Cookies</h3></td></tr>
    <tr><th align="left">Nome</th>
        <th align="left">Valor</th>
    </tr>
    <%
    foreach (var key in Request.Cookies)
    {%>
        <tr><td><%:key%></td><td><%:Request.Cookies[key.ToString()].Value%>&nbsp; </td></tr>
    <%}%>
</table>
<br />
<table border="1" cellpadding="5" cellspacing="0" >
    <tr><td colspan="2"><h3>Request.ServerVariables</h3></td></tr>
    <tr><th align="left">Nome</th>
        <th align="left">Valor</th>
    </tr>
    <%
    foreach (var key in Request.ServerVariables)
    {%>
        <tr><td><%:key%></td><td><%:(key.ToString().Equals("AUTH_PASSWORD"))?"":Request.ServerVariables[key.ToString()]%>&nbsp; </td></tr>
    <%}%>
</table>
<br />
<span id="resposta"></span>

</asp:Content>















