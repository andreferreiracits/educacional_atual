<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!--#Include Virtual="/login/restrito.asp" --> 
<%
Response.CacheControl = "no-cache"
Response.AddHeader "Pragma", "no-cache"
Response.Expires = -1
Response.Clear
Response.Charset = "ISO-8859-1"
Response.Buffer=true
%>
<%
'se está ou não logado
if Testa_Link(0) then
    Response.write("{IU:" & SessionMan.Valor("IdUsuario") & "}")
else
    Response.write("{IU:0}")
end if

%>
