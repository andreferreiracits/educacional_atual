<!-- #include virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!--#include virtual="/Recursos/spConn/spConn.asp"-->

<%
	'---
	' /_restrito/LegacySession.asp
	'
	' Compartilhamento de Sessao entre o ASP.NET e o legado
	'
	' Shiniti
	'
	' 29/10/2010
	'
	'---
	'
	' configurar
	'
	'Option Explicit
	'Session.LCID = 2048 ' EUA
	'
	' declarar vars
	'
	Dim i ' <--- não está declarado dentro do include do RC4...
	Dim key
	Dim value
	Dim operation
	Dim scrambledtoken
	Dim token
	Dim fs, log, filename
	Dim formElem
	'
	' includes
	'
%>
<!-- #include virtual="/login/rc4/inc_rc4_unicenp.asp" -->
<%
	
	'Dim strConnectionOtimizado
	Dim PATH
    PATH = "file name=D:\Componentes\redesocial.udl"

    'strConnectionOtimizado = PATH

    'objConnOtimizado.Open strConnectionOtimizado

	'
	' obter parametros
	'
	key = Request("key")
	value = Request("value")
	operation = Request("operation")
	'scrambledtoken = Request("n")
	'
	' decodifica e verifica se token é valido
	'
	
	
    
    
	    'operation = token.Operation
	    'key = token.Key
	    'value = token.Value
		'
		' realiza operação indicada
		'
		If operation = "Get" Then

			Response.Write SessionMan.Valor(key)

		ElseIf operation = "Set" Then

			SessionMan.Valor(key) = value
			Response.Write "ok"

		End If
		Dim spA
		spA = "spAVASalvarLogSession"

        id = spConn(spA, PATH, _
				Array(Array("strTexto", "Referer: " & Request.ServerVariables("HTTP_REFERER") & ", Tipo: " & operation & ", Chave: " & key & ", Valor: " & SessionMan.Valor(key), 1000 + 1), _
				      Array("idInt|OUTPUT",0, 4)))
	'
	' Logging
	'
	'filename = Server.MapPath("LogLegacySession.log")
	
	'Set fs = Server.CreateObject("Scripting.FileSystemObject")
	'Set log = fs.OpenTextFile(filename, 8, True)

	'log.WriteLine "----" & Now & "----"
	'log.WriteLine "ALL_RAW"
	'log.WriteLine Request.ServerVariables("ALL_RAW")
	'log.WriteLine "FORM"
	'For Each formElem In Request.Form
	'    log.WriteLine formElem & " = " & Request.Form(formElem)
	'Next 
	'log.Close
	'
	' não faça saída (ex.: Response.Write "xyz") de mais nada na página!
	'
%>