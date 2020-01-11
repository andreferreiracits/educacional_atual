<!--#Include Virtual = "/Recursos/spConn/spConn.asp"-->
<%
	'---
	' /_restrito/LegacyAuth.asp
	'
	' Script de login server-side no legado
	'
	' O ASP.NET abre uma conexão com o servidor ASP clássico, que,
	' por sua vez, executa o script abaixo. A Session do lado ASP clássico
	' é populada com todas as informações necessárias ao legado.
	'
	' O ASP.NET fica sabendo dos cookies gerados por este script e anexa-os
	' no lado ASP.NET.
	'
	' Shiniti
	' 21/out/2010
	'---
	'	
	' configura
	'
	'Option Explicit
	Session.LCID = 2048 ' EUA
	Response.Charset = "ISO-8859-1"
	'
	' declara vars
	'
	Dim strLogin
	Dim strSenha
	'Dim strAcademicoDominio
	'Dim strLoginAcademicoDominio
	'Dim strDominioNome
	Dim idUsuario
	Dim idEscola
	Dim strApelido
	Dim strNome
	Dim strEmail
	Dim strEmailEducacional
	Dim dteNascimento
	Dim strCidade
	Dim strCapital
	Dim strUF
	Dim strEscola
	Dim strCodEscola
	Dim idTurma
	Dim intSerie
	Dim intSexo
	Dim idPapel
	Dim bolStatusIncrementaAcesso
	Dim intStatusBatePapo
	Dim intStatusDebate
	Dim intStatusQAviso
	Dim intStatusWebmail
	Dim intStatusWebmailBarra
	Dim bolStatusComunicador
	Dim bolIniciaComunicador
	Dim bolStatusJogosCentral
	Dim bolStatusAgenda
	Dim NumAcesso
	Dim IdEstado
	
	Dim oUsuario
	Dim oRSUsuario
	Dim oPapel
	Dim oRSPapel
	Dim oEscolaParametros
	Dim oRSUsuarioPapel
	Dim oRSEscolaParametros
	Dim oCtrlServicoNav
	'
	' includes
	'
%>
<!--#include virtual="/Recursos/SessionMan/SessionMan.asp"-->
<!--#include virtual="/include/inc_servicos_status.asp"-->



<%	

	'SessionMan.Contents.RemoveAll()

	'
	' recebe parametros
	'
	strLogin = Request("g")
	strSenha = Request("h")
	'strAcademicoDominio = Request("d")
	'strDominioNome = Request("n")
	'strLoginAcademicoDominio = Request("z")
	'
	' se todos os parametros forem vazios, faz Session.Abandon
	'
	'Response.Write "strLogin: " & strLogin & "<br>"
	'Response.Write "strSenha: " & strSenha & "<br>"
    'Response.End	
	
    'SessionMan.Valor("Escola_Dominio") = "colpositivo"
	
	'SessionMan.Valor("ContadoAna") = SessionMan.Valor("ContadoAna") & 1
			
	If strLogin = "" And strSenha = "" Then
 	    
		'Response.Write "PASSOU:"
		'SessionMan.Valor("EscolaID") = ""
		'SessionMan.Valor("LoginId") = "0"
		'SessionMan.Valor("idUsuario") = "0"
		'SessionMan.Valor("CodigoUsuario") = "0"
		'SessionMan.Valor("Apelido") = ""
		'SessionMan.Valor("Nome") = ""
		'SessionMan.Valor("EMail") = ""
		'SessionMan.Valor("EMailEducacional") = ""
		'SessionMan.Valor("IdPapel") = "0"			
		'SessionMan.Valor("STRLOGIN") = ""	
		'SessionMan.Valor("SENHAID") = ""	
		'SessionMan.Valor("EscolaAVA") = "0"
		SessionMan.Valor("TESTEANALOGOUT") = "NUM FUNSCO"
		
		'Session.Abandon
		SessionMan.Abandon
		
		Response.Cookies("SessionMan_ServerId") = "WEBAVA"
		Response.Cookies("SessionMan_SessionId") = ""
		Response.Cookies("SessionMan_SessionId_1") = ""
		
		'Response.Write "PASSOU:"
		Response.End
		
	End If	
	'
	' daqui para baixo, quase ipsis literis dos vários scripts de login,
	' exceto por desconsiderar os desvios de execução por causa da
	' validação do usuário (não precisa fazer validação aqui, pois ela já ocorreu
	' no lado ASP.NET)
	'
	'
	
	' login_unicenp_new.asp
	'if strAcademicoDominio = "UNI" or strAcademicoDominio = "CTP" then
	'	SessionMan.Valor("bUBrasil") = true
	'	SessionMan.Valor("strLoginUNICENP") = strLogin
	'	SessionMan.Valor("strSenhaUNICENP") = strSenha
	'	'SessionMan.Valor("strUnidadeUNICENP") = strUnidade
	'end if
	' login_unicenp_new.asp
		
	
	
	SessionMan.Valor("novaplataforma") = 1	' necessario para desativar partes do legado

	SessionMan.Valor("intTipoPortal") = 1
	SessionMan.Valor("strLogin") = strLogin
	'SessionMan.Valor("Academico_Dominio") = strAcademicoDominio
	'Response.Cookies("Cook_Academico_Dominio") = strAcademicoDominio
	'SessionMan.Valor("Academico_titulo") = strDominioNome

	Set oUsuario = CreateObject("EducacionalBLL.clsUsuario")
	Set oRSUsuario = oUsuario.Validar(strLogin, strSenha)
	idUsuario = oRSUsuario("IdUsuario")
	idEscola = oRSUsuario("IdEscola")
	strApelido = oRSUsuario("strApelido")
	strNome = oRSUsuario("strNome")
	strEmail = oRSUsuario("strEmail")
	strEmailEducacional = oRSUsuario("strEmailEducacional")
	dteNascimento = oRSUsuario("dataNascimento")
	strCidade = oRSUsuario("strCidade")
	strCapital = oRSUsuario("strCapital")
	strUF = oRSUsuario("strUF")
	strEscola = oRSUsuario("strEscola")
	strCodEscola = oRSUsuario("strCodEscola")
	'idTurma = oRSUsuario("idTurma")
	'intSerie = oRSUsuario("intSerie")
	intSexo = oRSUsuario("intSexo")
	IdEstado = oRSUsuario("IdEstado")

    'Bug Id 5264 -----
    SessionMan.Valor("Escola_Mat") = oRSUsuario("strCodEscola")
    '-----------------

	Set oPapel = CreateObject("EducacionalBLL.clsPapelUsuario")
	Set oRSPapel = oPapel.SelectByIdUsuario(idUsuario)

	SessionMan.Valor("Professor") = False
	SessionMan.Valor("Coordenador") = False
	SessionMan.Valor("AdmRedeSocial") = False

	While Not oRSPapel.EOF
		If oRSPapel.Fields("IdPapel") = 3010001 Then
			SessionMan.Valor("Professor") = True
		Elseif oRSPapel.Fields("IdPapel") = 3030001 Then
			SessionMan.Valor("Coordenador") = True
		Elseif oRSPapel.Fields("IdPapel") = 6800001 Then 'AdmEscolaMaster			
			SessionMan.Valor("AdmRedeSocial") = True		
		Elseif oRSPapel.Fields("IdPapel") = 6960011 OR oRSPapel.Fields("IdPapel") = 10900001 Then 'AdmRedeSocial
			SessionMan.Valor("AdmRedeSocial") = True	
		End If
			
		oRSPapel.MoveNext
	Wend

	Set oRSPapel = Nothing
	Set oPapel = Nothing
	
	'************** SETA ADMREDESOCIAL ********************
	'Adm Rede ocial tem os poder na rede
	PATH_REDE_SOCIAL = "file name=D:\Componentes\redesocial.udl"
	spName = "redesocial.dbo.spRedeSocial_VerificaAcessoAdmRedeSocial"	
	set rsAcessoAdmRS = spConnRS(spName, PATH_REDE_SOCIAL, Array(Array("idUsuario",clng(idUsuario),4), _
			   Array("idEscola", clng(idEscola), 4)))	
		   
	if not rsAcessoAdmRS.eof then
		SessionMan.Valor("AdmRedeSocial") = True
	end if
	'************** SETA ADMREDESOCIAL ********************

    '************** SETA AVAPURO ********************	
	PATH_REDE_SOCIAL = "file name=D:\Componentes\redesocial.udl"
	spName = "redesocial.dbo.spAVA_VerificaAVAPuro"	
	set rsBolAvaPuro = spConnRS(spName, PATH_REDE_SOCIAL, Array(Array("idEscola",clng(idEscola),4)))	
		   
	if not rsBolAvaPuro.eof then
        if rsBolAvaPuro("bolAVAPuro") Then
		    SessionMan.Valor("bolAVAPuro") = 1
        else
            SessionMan.Valor("bolAVAPuro") = 0
        end if
    else
        SessionMan.Valor("bolAVAPuro") = 0
	end if
	'************** SETA AVAPURO ********************

     '************** SETA BOLCP ********************	
	PATH_REDE_SOCIAL = "file name=D:\Componentes\redesocial.udl"
	spName = "redesocial.dbo.spAVA_VerificaCP"	
	set rsBolCP = spConnRS(spName, PATH_REDE_SOCIAL, Array(Array("idEscola",clng(idEscola),4)))	
		   
	if not rsBolCP.eof then
        if rsBolCP("bolCP") Then
		    SessionMan.Valor("bolCP") = 1
        else
            SessionMan.Valor("bolCP") = 0
        end if
    else
        SessionMan.Valor("bolCP") = 0
	end if
	'************** SETA BOLCP ********************

    '************** SETA BOLAVALIACOES ********************	
	PATH_REDE_SOCIAL = "file name=D:\Componentes\redesocial.udl"
	spName = "redesocial.dbo.spAVA_VerificaBolAvalicoes"	
	set rsBolCP = spConnRS(spName, PATH_REDE_SOCIAL, Array(Array("idEscola",clng(idEscola),4)))	
		   
	if not rsBolCP.eof then
        if rsBolCP("bolAvaliacoes") Then
		    SessionMan.Valor("bolAvaliacoes") = 1
        else
            SessionMan.Valor("bolAvaliacoes") = 0
        end if
    else
        SessionMan.Valor("bolAvaliacoes") = 0
	end if
	'************** SETA BOLAVALIACOES ********************

	

	If bolStatusIncrementaAcesso Then 'Variável setada no arquivo /include/inc_servicos_status.asp para incrementar ou não nº de acessos 
		NumAcesso = oUsuario.IncrementarNumAcesso(idUsuario)
		NumAcesso = oUsuario.IncrementarNumAcessoNew(idUsuario, Now)
	End If

	SessionMan.Valor("thiagodebug")      = NumAcesso

	Set oEscolaParametros = CreateObject("EducacionalBLL.clsEscolaParametros")
	Set oRSUsuarioPapel = oUsuario.SelectPapelById(idUsuario)
	oRSUsuarioPapel.Filter = "bolPadrao = 1"
	idPapel = oRSUsuarioPapel("IdPapel")


	
	Set oRSEscolaParametros = oEscolaParametros.SelectById(idEscola)

	If Not oRSEscolaParametros.BOF And Not oRSEscolaParametros.EOF Then

					
		SessionMan.Valor("Escola_Logo")        = oRSEscolaParametros.Fields("strLogo")
		SessionMan.Valor("Escola_Ano")         = oRSEscolaParametros.Fields("intAnoVigente")
		SessionMan.Valor("Escola_Semestre")    = oRSEscolaParametros.Fields("intSemestreVigente")
		SessionMan.Valor("Escola_URL")    		= oRSEscolaParametros.Fields("strURL")
        SessionMan.Valor("intTipoPortal")       = oRSEscolaParametros.Fields("intTipoPortal")
		SessionMan.Valor("PubSite") 			= oRSEscolaParametros.Fields("intTipoPortal")
		SessionMan.Valor("Escola_Logo_Color") = Trim(oRSEscolaParametros.Fields("strColor"))
        SessionMan.Valor("Escola_Dominio")    = Trim(oRSEscolaParametros.Fields("strColor"))
        SessionMan.valor("bolModular")          = oRSEscolaParametros.Fields("bolModular")
		'response.write("Aqui 2: " & SessionMan.valor("bolModular"))
		'response.end
		'Alteração para evitar que a variável Escola_Interno não fique com valor Null
		  'Feito em 23/02/2006 por Marcelo Ando
		  If IsNull(oRSEscolaParametros.Fields("intCor")) Then
			SessionMan.Valor("Escola_Interno") = 0
		  Else
			SessionMan.Valor("Escola_Interno") = oRSEscolaParametros.Fields("intCor")
		  End If
		  SessionMan.Valor("Escola_BLE_Aluno") = oRSEscolaParametros.Fields("intBLE_Aluno")
		  SessionMan.Valor("Escola_BLE_Educador") = oRSEscolaParametros.Fields("intBLE_Educador")
		  SessionMan.Valor("Escola_BLE_Pai") = oRSEscolaParametros.Fields("intBLE_Pai")
		  SessionMan.Valor("Escola_AceResExc") = oRSEscolaParametros.Fields("intAceResExc")
		  
		  If IsNull(oRSEscolaParametros.Fields("intAnoVigente")) Then
			SessionMan.Valor("Escola_Ano") = Year(Date())
		  End If
		  If IsNull(oRSEscolaParametros.Fields("intSemestreVigente")) Then
			SessionMan.Valor("Escola_Semestre") = 0
		  End If
		  
	End If
	
	If SessionMan.Valor("Escola_Semestre") = "" OR Len(SessionMan.Valor("Escola_Semestre")) <= 0 OR isNull(SessionMan.Valor("Escola_Semestre")) Then
		SessionMan.Valor("Escola_Semestre") = 0
	End IF
	
	'	recupera o ano e semestre vigente da escola:
	lngEscolaAno = SessionMan.Valor("Escola_Ano")
	if len(lngEscolaAno) = 0 then lngEscolaAno = Year(Date)
	lngEscolaSemestre = SessionMan.Valor("Escola_Semestre")
	if (Len(lngEscolaSemestre) <= 0) Or (IsNull(lngEscolaSemestre)) then
		if month(Date()) <= 6 then
			lngEscolaSemestre = 1
		else
			lngEscolaSemestre = 2
		end if
	else
		if (lngEscolaSemestre = 0) Or (lngEscolaSemestre = "0") then
			if month(Date()) <= 6 then
				lngEscolaSemestre = 1
			else
				lngEscolaSemestre = 2
			end if
		end if
	end if
	
	

	SessionMan.Valor("AlteraDados")   = 1
	SessionMan.Valor("LoginID")       = strLogin
	SessionMan.Valor("SenhaID")       = strSenha
	SessionMan.Valor("CodigoUsuario") = oUsuario.GetIdAntigo(idUsuario)
	SessionMan.Valor("IdUsuario")     = idUsuario
	SessionMan.Valor("Apelido")       = strApelido
	SessionMan.Valor("IdEstado")      = IdEstado
	
	
	Dim oLoginUnico
	Dim rsLoginUnico
	Dim val
	val = idUsuario
	set oLoginunico = server.CreateObject("LoginUnicoBLL.clsLoginUnico")
	rsLoginUnico = clng(oLoginUnico.UpdateById(clng(val)))
	SessionMan.Valor("LoginUnico") = rsLoginUnico
	Set oLoginunico = nothing

	Dim arrTempNome
	arrTempNome = Split(strNome, " ")
	If UBound(arrTempNome) > 0 Then
		SessionMan.Valor("Nome")      = arrTempNome(0)
		arrTempNome(0) = ""
		SessionMan.Valor("Sobrenome") = Join(arrTempNome, " ")
	Else
		SessionMan.Valor("Nome")      = strNome
		SessionMan.Valor("Sobrenome") = ""
	End If

	SessionMan.Valor("EMail")            = strEmail
	SessionMan.Valor("EMailEducacional") = strEmailEducacional
	SessionMan.Valor("Nascimento")       = dteNascimento
	SessionMan.Valor("IdPapelPadrao")    = IdPapel
	SessionMan.Valor("Tipo")             = Left(IdPapel, 1)

	If Left(IdPapel, 1) = 3 Then
		SessionMan.Valor("Tipo") = 2
	ElseIf Left(IdPapel, 1) = 4 Then
		SessionMan.Valor("Tipo") = 3
	ElseIf Left(IdPapel, 1) = 2 Then
		SessionMan.Valor("Tipo") = 4
	End If

	SessionMan.Valor("Cidade")       = strCidade
	SessionMan.Valor("Capital")      = strCapital
	SessionMan.Valor("UF")           = strUF
	SessionMan.Valor("CodigoEscola") = idEscola
	SessionMan.Valor("EscolaID")     = idEscola
	SessionMan.Valor("IdEscola")     = idEscola
	SessionMan.Valor("Escola")       = strEscola
	'SessionMan.Valor("Turma")        = idTurma
	'SessionMan.Valor("Serie")        = intSerie
	SessionMan.Valor("StrCodEscola") = strCodEscola
	SessionMan.Valor("StrLogin")	 = strLogin

	'If IsNull(intSerie) Then
		'SessionMan.Valor("Serie") = 0
	'End If

	If intSexo = 1 Then
		SessionMan.Valor("Artigo") = "a"
		SessionMan.Valor("Sexo")   = "F"
	Else
		SessionMan.Valor("Artigo") = "o"
		SessionMan.Valor("Sexo")   = "M"
	End If

	'SessionMan.Valor("Escola_Dominio") = "colpositivo"

	'Comunicador
	if SessionMan.valor("usaComunicador") = "" and SessionMan.valor("idEscola") <> "" then
	'	SessionMan.valor("usaComunicador")  = getOpcaoUniversidade()
	end if
	
	SessionMan.valor("usaComunicador") = false

	
	'login_unicenp_new
	Response.Cookies("Nome")                = oRSUsuario.Fields("strNome")
	
	'login_unicenp_new

	'Set oCtrlServicoNav = server.CreateObject("unvServicos.cCtrl")
	'SessionMan.valor("strXmlNav")		= oCtrlServicoNav.getFerramentaMenuXML(idEscola, idPapel)
	'SessionMan.valor("strXmlNavPapel")	= oCtrlServicoNav.getPapelUsuarioXML(idUsuario, idPapel) 
	'Set oCtrlServicoNav = nothing

	
	'login_unicenp_new
	'If IsEmpty(oRSUsuario.Fields("strCidade")) Or IsEmpty(oRSUsuario.Fields("strUF")) Or IsEmpty(oRSUsuario.Fields("dataNascimento")) Or IsEmpty(oRSUsuario.Fields("intSexo")) Then
	'  ZeraObjetos
	'  Response.Redirect "/login/atualizadadosform.asp"
	'End If
	'login_unicenp_new
	
	'Filtrando os registros
	'oRSUsuario.Filter = "intAno = " & SessionMan.Valor("Escola_Ano") & " and intSemestre = " & SessionMan.Valor("Escola_Semestre")
	
	oRSUsuario.filter = "(intSemestre = " & lngEscolaSemestre & " AND intAno = " & lngEscolaAno & ") OR " & _
						"(intSemestre = 0 AND intAno = " & lngEscolaAno & ") OR " & _
						"(intSemestre = NULL AND intAno = " & lngEscolaAno & ")"

	if not oRSUsuario.EOF then
		SessionMan.Valor("Turma") = oRSUsuario.Fields("IdTurma")
		SessionMan.Valor("Serie") = oRSUsuario.Fields("intSerie")
	else
		SessionMan.Valor("Turma") = 0
		SessionMan.Valor("Serie") = 0
	end if
	If IsNull(SessionMan.Valor("Serie")) Then
	  SessionMan.Valor("Serie") = 0
	End If
	
	Response.Cookies("Escola")              = SessionMan.Valor("Escola")
	Response.Cookies("Papel")               = SessionMan.Valor("Tipo")
	Response.Cookies("Serie")               = SessionMan.Valor("Serie")
	Response.Cookies("Sexo")                = SessionMan.Valor("Sexo")
	Response.Cookies("idEscolaEstatistica") = SessionMan.Valor("EscolaID")
	Response.Cookies("IdUsuario")			= SessionMan.Valor("IdUsuario")
	
%>
