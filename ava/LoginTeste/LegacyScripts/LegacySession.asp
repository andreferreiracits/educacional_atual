<!-- #include virtual = "/Recursos/SessionMan/SessionMan.asp"-->

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
	Dim i ' <--- n�o est� declarado dentro do include do RC4...
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
<!-- #include virtual="/login/rc4/inc_rc4_unicenp.asp" --><%
	

	'
	' obter parametros
	'
	'key = Request("key")
	'value = Request("value")
	'operation = Request("operation")
	scrambledtoken = Request("n")
	'
	' decodifica e verifica se token � valido
	'
	Class TokenClass
	    Public CreatedOn
	    Public Key
	    Public Value
	    Public Operation
	    Public IsValid
	End Class
	Function Tokenize(scrambled)
	    '
	    ' inicializar o objeto de retorno dizendo que o token � invalido
	    '
	    Set Tokenize = New TokenClass
	    Tokenize.IsValid = False
	    
	    Dim oXmlDoc, oNodeDoc
	    Dim sToken

        sToken = RC4(TokenDecode(scrambled), "A1B2C3D4E5F1", "6F5E2D3C2B1A")
	    



	'filename = Server.MapPath("LogLegacySession.log")
	'Set fs = Server.CreateObject("Scripting.FileSystemObject")
	'Set log = fs.OpenTextFile(filename, 8, True)
	'log.WriteLine "----" & Now & "----"
	'log.WriteLine sToken 
	'log.Close


	    Set oXmlDoc = Server.CreateObject("Microsoft.XMLDOM")
	    oXmlDoc.async = False
	    If Not oXmlDoc.loadXML(sToken) Then Exit Function
   
	    Set oNodeDoc = oXmlDoc.selectSingleNode("//createdOn")
	    If oNodeDoc Is Nothing Then Exit Function
	        
	    Tokenize.CreatedOn = CDate(oNodeDoc.text)
	    ' token tem validade de 20 segundos 
	    ' (agora - createdOn) tem q ser menor que 20 s
		' alterado o tempo para 120
	    'If DateDiff("s", Tokenize.CreatedOn, Now) > 120 Then Exit Function
	    
        Set oNodeDoc = oXmlDoc.selectSingleNode("//operation")
        If oNodeDoc Is Nothing Then Exit Function
        Tokenize.Operation = oNodeDoc.text
        
        Set oNodeDoc = oXmlDoc.selectSingleNode("//key")
        If oNodeDoc Is Nothing Then Exit Function
        Tokenize.Key = oNodeDoc.text

        Set oNodeDoc = oXmlDoc.selectSingleNode("//value")
        If Not oNodeDoc Is Nothing Then ' tag opcional
            Tokenize.Value = oNodeDoc.text
        End If
        '
        ' o token � valido
        '
        Tokenize.IsValid = True	    
	End Function
	
	'Dim objConnOtimizado, strConnectionOtimizado

    'Set objConnOtimizado = Server.CreateObject("ADODB.Connection")
	'Dim PATH
	'PATH = "file name=D:\Componentes\redesocial.udl"

    'strConnectionOtimizado = PATH

    'objConnOtimizado.Open strConnectionOtimizado

    

        
	
    Set token = Tokenize(scrambledtoken)
    If Not token.IsValid Then
        Response.Status = "400 Bad Request"
	Else
    
	    operation = token.Operation
	    key = token.Key
	    value = token.Value
		'
		' realiza opera��o indicada
		'
		If operation = "Get" Then

			Response.Write SessionMan.Valor(key)

		ElseIf operation = "Set" Then

			SessionMan.Valor(key) = value
			Response.Write "ok"

		End If
	End If	
	
	'Dim spA
	'	spA = "spAVASalvarLogSession"

     '   id = spConn(spA, PATH, _
		'		Array(Array("strTexto", "Referer: " & Request.ServerVariables("HTTP_REFERER") & ", Tipo: " & operation & ", Chave: " & key & ", Valor: " & SessionMan.Valor(key), 1000 + 1), _
		'		      Array("idInt|OUTPUT",0, 4)))
					  
		'SessionMan.Valor("debug_legacy")  = key & " valor : " & valor
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
	' n�o fa�a sa�da (ex.: Response.Write "xyz") de mais nada na p�gina!
	'
%>