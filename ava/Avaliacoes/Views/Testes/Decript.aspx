<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Teste Bundel</title>
    
</head>
<body>
    <h1>Descriptografar Conteudo Avaliacao</h1>
    <%  
        using (Html.BeginForm("Decript", "TesteFramework", FormMethod.Post, new { @id = "frmJson", @target="_blank" }))
        {%>
        <textarea name="Conteudo"></textarea>
        <button type="submit">Decriptar</button>
    <%} %>

</body>
</html>
