<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>SessionId</title>
</head>
<body>
    <div>
    Incluir um id da sessão no cookie.
    Teste habilitado apenas para debug local.
<%
    using (Html.BeginForm("SalvarSessao", "MemCacheTest", FormMethod.Post, new { @id = "frmSessaoId" }))
{
	%>
    Insira o id da sessão do local:
	<input type="text" id="idSessao" name="idSessao" value="" />
    <input type="submit" value="Enviar" />
	<%
}
%>
    </div>
</body>
</html>
