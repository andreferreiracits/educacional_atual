<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Simples.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>


<asp:Content ID="ContentArea" ContentPlaceHolderID="ContentPlaceHolderConteudo" runat="server">
  <script type="text/javascript" src="<%=Url.CDNLink("/Common/jquery-ui-1.8.2.custom/development-bundle/jquery-1.7.js") %>"></script>
  <script type="text/javascript">
      $(function () {
          $.ajax({
              url: '/_restrito/lista_Session.asp',
              contentType: "text/html; charset=ISO-8859-1",
              success: function (html) {
                  $("#resposta").append(html);
              }
          });
      });
    </script>
      <style type="text/css">
                th { font-size: medium; font-family:Arial;} 
                td { font-size:small; font-family:Arial; } 
    </style>

<h1>Variaveis de Sessao</h1>
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















