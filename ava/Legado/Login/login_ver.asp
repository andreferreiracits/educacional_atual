<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!--#include Virtual = "/include/log_arquivo_geral.asp" -->
<!--#include virtual="/Recursos/funcoes_redesocial_novovisual.asp"-->
<!--#include virtual="/Recursos/funcoes_acesso_ava.asp"-->
<!--#include virtual="/Recursos/spconn/spconn.asp"-->

<%
				
'Server.Execute "/include/testa_session.asp"
	
' Portal Educacional
' www.educacional.com.br

' Módulo: login_ver.asp
' Criação:   14/08/2000 - Erik
' Alteração: 07/12/2000 - Luciano
'			 26/09/2001 - Erik
'			 27/01/2002 - Erik
'			 15/02/2002 - Anderson
'			 21/05/2002 - Rieke
'			 21/11/2002 - Leo
'=========================================================================

'=========================================================================
' Função: IsVoid
' Propósito: Teste padrão para ver se uma string não é vazia.
'
' Histórico de Revisões:
'=========================================================================
Response.CacheControl = "no-cache"
Response.AddHeader "Pragma", "no-cache"
Response.Expires = -1
Response.Buffer=True
Response.Charset = "ISO-8859-1"
Response.clear

' Portal Positivo - Usuários do PP não podem se logar no Educacional e vice-versa

strEnderecoBlog = Request("strEndereco")
strEnderecoWiki = Request("strEnderecoWiki")
strEnderecoSite = Request("strEnderecoSite")

'Se veio do cdrom
'------------------------------------------------------------------
if sessionMan.valor("bolcdrom") = "1" then
	dim loginCdrom
	loginCdrom = Request.Form("strLogin")
	'Verifica se é pp ou educacional
	'--------------------------------------------------------------
	Set oCdrom = Server.CreateObject("cdromBLL.clsCdrom")
	Set rsCdrom = oCdrom.selectPortalByIdUsuario(trim(loginCdrom)) 
	Set oCdrom = Nothing
	if not rsCdrom.eof then
		if isnull(rsCdrom.fields("bolDistribuidora")) or rsCdrom.fields("bolDistribuidora") = 0 then
			SessionMan.valor("bolPP") = ""
		else
			SessionMan.valor("bolPP") = "pp"	
		end if 
	else		
		SessionMan.valor("bolPP") = ""
	end if 
	Set rsCdrom = Nothing
end if 
'------------------------------------------------------------------


bolPP_Inicio = False
bolEonLine_Inicio = False


if SessionMan.valor("bolPP") = "pp" then
	SessionMan.Valor("Escola_Dominio") = "pp"
	SessionMan.Valor("PubSite") = 4
	bolPP_Inicio = True
else	
	If InStr(1,Request.ServerVariables("HTTP_REFERER"),application("DOM_PP")) <> 0 OR SessionMan.Valor("Escola_Dominio") = "pp" Then
	  bolPP_Inicio = True
	End If

	If (InStr(1,Request.ServerVariables("HTTP_REFERER"),application("DOM_Educ")) <> 0) And (SessionMan.Valor("Escola_Dominio") = "pp") Then
	  bolPP_Inicio = True
	End If
end if 



Dim prilog

prilog=Request.QueryString("prilog")

Function IsVoid(text)
 IsVoid = (text = "" OR IsEmpty(text) OR IsNull(text))
End Function

'on error resume next

'=========================================================================
' Função: IsEmailValid
' Propósito: Checa a validade de um endereço de email
'
' Histórico de Revisões:
'=========================================================================



Function IsEmailValid(strAddress)
 Dim AtSym, Period, Space, Length, LAtSym, AtError1, AtError2
 If NOT IsVoid(strAddress) Then
  AtSym = InStr(1,strAddress,"@")
  LAtSym = InStrRev(strAddress,"@")
  AtError1 = InStr(1,strAddress,"@.")
  AtError2 = InStr(1,strAddress,".@")
  Period = InStrRev(strAddress,".")
  Space  = InStr(1,strAddress," ")
  Asterisco  = InStr(1,strAddress,"*")
  Barra  = InStr(1,strAddress,"/")
  BarraRev  = InStr(1,strAddress,"\")
  Length = Len(strAddress) - 1
  
  If AtSym <> LAtSym OR AtSym = Length OR AtSym < 2 OR AtError1 <> 0 OR AtError2 <> 0 OR Period = Length OR Period = 1 OR Space <> 0 Or Asterisco <> 0 Or Barra <> 0 Or BarraRev <> 0 Then
   IsEmailValid = False
  Else
   IsEmailValid = True
  End If
 Else
  IsEmailValid = False
 End If
End Function

'=========================================================================
' Procedimento: ZeraObjetos
' Propósito: Finaliza os objetos globais
'
' Histórico de Revisões:
'=========================================================================

Sub ZeraObjetos
  Set oUsuario = Nothing
  Set oRSUsuario = Nothing
  Set oRSUsuarioPapel = Nothing
  Set oEscolaParametros = Nothing
  Set oRSEscolaParametros = Nothing
  Set oEscola = nothing
  Set oRSEscola = nothing
End Sub

'=========================================================================
' Procedimento: Módulo Principal
' Propósito: Responsável pelo login do usuário no site
'
' Histórico de Revisões:
'=========================================================================

Dim oUsuario, oRSUsuario, oRSUsuarioPapel, oEscolaParametros, oRSEscolaParametros, oEscola, oRSEscola
Dim strLogin, strSenha, oUsuarioWiz, strLoginWiz, strSenhaWiz
Dim intSerie, strURL
Dim strNome
Dim bolAtualizaDados
Dim intSexo
Dim strCodEscola

cEscolaSim = 3950001

sessionMan.valor("RedeSocial_BuscaApelido") = ""
sessionMan.valor("RedeSocial_EscolaMenuRoxo") = ""
sessionMan.valor("RedeSocial_EscolaNovoVisual") = ""
sessionMan.valor("RedeSocial_EscolaRedeSocial") = ""
sessionMan.valor("RedeSocial_RedeSocialEducadores") = ""
sessionMan.valor("RedeSocial_VerificaAluno") = ""
sessionMan.valor("RedeSocial_VerificaEducador") = ""
sessionMan.valor("BarraSS_BuscaFotoMiniThumb") = ""
sessionMan.valor("PAPEL_LISTA") = ""
sessionMan.valor("PAPEL_PADRAO") = ""

If Request.QueryString("from") = "termos" Then
  strLogin = SessionMan.Valor("LoginTemp")
  strSenha = SessionMan.Valor("SenhaTemp")
ElseIf Request.QueryString("from") = "loginmaster2" Then
  strLogin = SessionMan.Valor("LoginTemp")
  strSenha = SessionMan.Valor("SenhaTemp")
ElseIf Request.QueryString("from") = "login1" Then
  strLogin = left(SessionMan.Valor("LoginID"),20)' existem escolas onde o campo login não apresenta limite de caracteres
  strSenha = left(SessionMan.Valor("SenhaID"),20)' existem escolas onde o campo senha não apresenta limite de caracteres
ElseIf Request.QueryString("login") = 1 Then
	'SessionMan.Abandon ()
	Dim IdUsuariop, oAluno, oRSAluno
	IdUsuariop=Request.Form("idUsuario")
	SET oAluno = Server.CreateObject("EducacionalBLL.clsUsuario")
	SET oRSaluno = oAluno.SelectById(IdUsuariop)
	Set oAluno = Nothing
	if not oRSaluno.eof then
		strLogin = oRSAluno("strLogin")
		strSenha = oRSAluno("strSenha")
		SessionMan.Valor("LoginID") = strLogin
		SessionMan.Valor("SenhaID") = strSenha
	end if	
	SET oRSaluno = Nothing
Else
    'alteração THIAGO 27/10/2006 (verifica se é uma tentativa de login externo)
    if clng(sessionMan.valor("gen")) = 1 then
		strLogin = left(sessionMan.valor("strLogin"), 20)
		strSenha = left(sessionMan.valor("strSenha"), 20)
		strLoginSuporte = left(sessionMan.valor("strLoginSuporte"), 20)
    else
		strLogin = Trim(left(Request("strLogin"),20))' existem escolas onde o campo login não apresenta limite de caracteres
		strSenha = Trim(left(Request("strSenha"),20))' existem escolas onde o campo senha não apresenta limite de caracteres
		if strSenha = "" then
		    strSenha = Trim(left(Request("strSenhaSS"),20))
		end if
		'Alteração ragna - pegar o login do usuário que está acessando a página de suporte
		strLoginSuporte = Request("strLoginSuporte")
	end if	
End If


Set oUsuario = CreateObject("EducacionalBLL.clsUsuario")
set oEscola = Server.CreateObject("EducacionalBLL.clsEscola")


'--------------------
'Valida login suporte 
'-------------------- 
'se vier do login suporte valida usuario suporte caso contrario valida usuario normal.
'#######################################################################################

'Response.Write strLogin & "/" & strSenha 'sessionMan.Valor("suporte")
'Response.End

if  IsNull(sessionMan.Valor("suporte")) or sessionMan.Valor("suporte") <> 1 then
	Set oRSUsuario = oUsuario.Validar(strLogin, strSenha)

	'' Verifica nas escolas com integração de login "interna"
	if oRSUsuario.BOF And oRSUsuario.EOF Then
		SET oRSUsuario = spConnRS("spUsuarioLoginEscola_Validar",  Application("educacional_otimizado.udl"), Array(Array("strLogin",strLogin,30),Array("strSenha", strSenha ,20)))						
		if not oRSUsuario.EOF then
			strSenha = oRsUsuario("strsenha")
			strLogin = oRsUsuario("strlogin")
		end if
	end if

	' Verifica Livro Usuário
	if not oRSUsuario.eof then
		spConn "spUsuarioLivro_Salvar",  Application("educacional_otimizado.udl"), Array(Array("idUsuario",clng(oRSUsuario("idUsuario")),4),Array("intAno", 2014, 4))
	end if

	if Request("cbAVABarrass") = "" then
					
		'--------------AVA-----------------
		If not oRSUsuario.EOF Then
			idEscolaVerificaAVA = oRSUsuario("idEscola")
			
			bolRedirecionaAVA = False
			idEscolaAVA = 0
			
			VerificaEscolaAcessoAVA idEscolaVerificaAVA, bolRedirecionaAVA, idEscolaAVA			
				
			If bolRedirecionaAVA Then						
								
				SET rsAcessaAVA = spConnRS("spAVA_VerificaAVAAcessoByIdPapel", "file name=D:\Componentes\redesocial.udl", Array(Array("idAVAEscola",clng(idEscolaAVA),4),Array("idUsuario", clng(oRSUsuario("idUsuario")) ,4)))						
				if not rsAcessaAVA.eof then
				
					'Se vier com o papel = 0 é pq é aluno e a escola esta em período de testes. Durante o período de testes as alunos não podem acessar o AVA.
					if rsAcessaAVA("idPapel") = 0 Then
						SessionMan.Valor("EscolaAVAEmTeste") = 1 'Seta na sessão que a escola esta em teste para desabilitar a rede antiga.					
					Else
						str_gen_url = Request("URL")
					
						if lcase(str_gen_url) = "/login/login_ver.asp" then
							str_gen_url = ""
						end if
						
						str_gen_url = replace(str_gen_url,"/ttcm/","/tabletcm/")
						SessionMan.Valor("DEBUG_URL_REDIRECT_LOGINVER") = str_gen_url
						
						
						%>
						<html>
							<body>
								<script src="/AVA/StaticContent/Common/jquery-ui-1.8.2.custom/development-bundle/jquery-1.7.js" type="text/javascript"></script>
								<script src="/include/jquery.json-2.3.min.js" type="text/javascript" ></script>
								<script src="/AVA/StaticContent/Common/Scripts/jStorage.js" type="text/javascript" ></script>

								<form action="/AVA/Login/Home/LoginVer" method="post" name="fLoginAVA">
									<input type="hidden" value="<%=strLogin%>" name="strLogin" id="strLogin" />
									<input type="password" value="<%=strSenha%>" name="strSenhaSS" id="strSenhaSS" style="display: none" />
									<input type="hidden" value="<%=str_gen_url%>" name="strURL" id="strURL">
									
									<div class="container_central" style="text-align:center; margin-top:80px; font-family:Arial, Helvetica, sans-serif; font-size:14px">
										<strong>Carregando login <%=strLogin%></strong>
										<p><img src="/ava/staticContent/Common/img/perfil/loadingAnima.gif" width="208" height="13"></p>								
									</div>
								</form>
								<script>
									$(document).ready(function() {

										try {
										$.jStorage.flush();
											}
										catch(e){}
										document.fLoginAVA.submit();
									});
								</script>
							</body>
							
						</html>
						<%
						'Response.Redirect "/AVA/Login/Home/LoginVer?strLogin=" & strLogin & "&strSenhaSS=" &strSenha
						Response.End
					End If
				end if
			End If
		
		end if
	End If	
	'--------------AVA-----------------
	
	If Request.QueryString("from") = "loginmaster2" Then
		sessionMan.Valor("suporte") = 1
	End If	
	
elseif Request.QueryString("from") = "masterescola" Then 'vem do Login Suporte de Escola (/escolas/administra/loginMasterEscola.asp)

	Dim rsUsuarioMaster, oRSUsuarioTemp

	strLoginSuporteEscola = SessionMan.Valor("LoginMaster")

	Set rsUsuarioMaster = oUsuario.Validar(SessionMan.Valor("LoginMaster"), SessionMan.Valor("SenhaMaster")) 
	'Valida para verificar se o usuário é realmente o Master
	SessionMan.Valor("LoginMaster") = ""
	SessionMan.Valor("SenhaMaster") = ""
	
	If not rsUsuarioMaster.EOF Then
		'Busca o login e senha do usuário que será utilizado pelo idUsuario passado pela página /escolas/administra/loginMasterEscola.asp
		Set oRSUsuarioTemp = oUsuario.SelectById(cLng(Request.Form("slc_escola")))
		strLogin = oRSUsuarioTemp.fields("strLogin")
		strSenha = oRSUsuarioTemp.fields("strSenha")
		Set oRSUsuarioTemp = nothing
		
		Set oRSUsuario = oUsuario.Validar(strLogin, strSenha)


	'############################################## Gravar log do campo ############################################
		If not oRSUsuario.EOF  Then
			IdOperacao     = 4 'Logar
			IdServico      = 3 'Login Suporte Escola
			strPagina      = Request.ServerVariables("HTTP_HOST") & Request.ServerVariables("URL")		
			strRegistroLog = fStrGerarCampo("IdUsuarioUsado", oRSUsuario.fields("idUsuario"))
			strRegistroLog = strRegistroLog & fStrGerarCampo("LoginUsado", oRSUsuario.fields("strLogin"))			
			fSubGerarLog rsUsuarioMaster.fields("idUsuario"), IdOperacao, IdServico, strPagina, strRegistroLog	
			
			
			'**************AVA
			idEscolaVerificaAVA = oRSUsuario("idEscola")
			
			bolRedirecionaAVA = False
			idEscolaAVA = 0
			
			VerificaEscolaAcessoAVA idEscolaVerificaAVA, bolRedirecionaAVA, idEscolaAVA			
				
			If bolRedirecionaAVA Then						
								
				SET rsAcessaAVA = spConnRS("spAVA_VerificaAVAAcessoByIdPapel", "file name=D:\Componentes\redesocial.udl", Array(Array("idAVAEscola",clng(idEscolaAVA),4),Array("idUsuario", clng(oRSUsuario("idUsuario")) ,4)))						
				if not rsAcessaAVA.eof then
				
					'Se vier com o papel = 0 é pq é aluno e a escola esta em período de testes. Durante o período de testes as alunos não podem acessar o AVA.
					if rsAcessaAVA("idPapel") = 0 Then
						SessionMan.Valor("EscolaAVAEmTeste") = 1 'Seta na sessão que a escola esta em teste para desabilitar a rede antiga.					
					Else
						str_gen_url = Request("URL")
						
						if lcase(str_gen_url) = "/login/login_ver.asp" then
							str_gen_url = ""
						end if
						str_gen_url = replace(str_gen_url,"/ttcm/","/tabletcm/")

						SessionMan.Valor("DEBUG_URL_REDIRECT_LOGINVER") = str_gen_url
						
						
						%>
						<html>
							<body>
								<script src="/AVA/StaticContent/Common/jquery-ui-1.8.2.custom/development-bundle/jquery-1.7.js" type="text/javascript"></script>
								<script src="/AVA/StaticContent/Common/Scripts/jStorage.js" type="text/javascript" ></script>

								<form action="/AVA/Login/Home/LoginVer" method="post" name="fLoginAVA">
									<input type="hidden" value="<%=strLogin%>" name="strLogin" id="strLogin" />
									<input type="password" value="<%=strSenha%>" name="strSenhaSS" id="strSenhaSS" style="display: none" />
									<input type="hidden" value="<%=str_gen_url%>" name="strURL" id="strURL">
									
									<div class="container_central" style="text-align:center; margin-top:80px; font-family:Arial, Helvetica, sans-serif; font-size:14px">
										<strong>Carregando login <%=strLogin%></strong>
										<p><img src="/ava/staticContent/Common/img/perfil/loadingAnima.gif" width="208" height="13"></p>								
									</div>
								</form>
								<script>
									$(document).ready(function() {

										try {
										$.jStorage.flush();
											}
										catch(e){}
										document.fLoginAVA.submit();
									});
								</script>
							</body>
							
						</html>
						<%
						'Response.Redirect "/AVA/Login/Home/LoginVer?strLogin=" & strLogin & "&strSenhaSS=" &strSenha
						Response.End
					End If
				end if
			End If			
			'**************AVA
			
		end if	
	'###############################################################################################################

		
	End If	
	Set rsUsuarioMaster = nothing

else
	
	'Alteração Ragna - Verifica o login e senha do usuário que está acessando a página
	' e confere se este possui papel de suporte Educacional: 6800002     ADM_SuporteEDUC
	Set oRSUsuario = oUsuario.Validar(strLoginSuporte, strSenha) 'Login e senha do suporte
	strSenhaSuporteAVA = strSenha
	If not oRSUsuario.BOF And not oRSUsuario.EOF Then 'Confere se este possui o papel de suporte				
		IdUsuarioSuporte = oRSUsuario("IdUsuario")		
		Set oRsUsuario = nothing
		Set oRSUsuario = oUsuario.SelectPapelById(IdUsuarioSuporte)
		
		oRSUsuario.filter = "IdPapel = 6800002 or IdPapel = 6800003"	
		
		If not oRSUsuario.BOF And not oRSUsuario.EOF Then
		
			If oRSUsuario.Fields("idPapel") = 6800003 Then
				sessionMan.valor("suporteusuarioconsultor") = 1
			End If
		
			'pega senha original do usuario
			Set oRsUsuario    = nothing
			Set oRSUsuario    = oUsuario.SelectByLogin(strLogin)
			oRSUsuario.filter = "bolexcluido = 0 and idEstado <> 6" 'usuário não pode ser excluído 
									
			If not oRSUsuario.BOF And not oRSUsuario.EOF Then
				strSenha        = oRSUsuario.Fields("strSenha")
				IdUsuarioEscola = oRSUsuario.Fields("IdUsuario")
				IdEscolaUsuario = oRSUsuario.Fields("IdEscola")
				Set oRsUsuario = nothing
				
			end if 			
			
			'efetua o login com a senha original do usuario
			Set oRSUsuario = oUsuario.Validar(strLogin, strSenha)
			
			'Verifica se usuario a ser logado está em Escola AVA
			
			'--------------AVA-----------------
			If not oRSUsuario.EOF Then
				
				idEscolaVerificaAVA = oRSUsuario("idEscola")
				
				bolRedirecionaAVA = False
				idEscolaAVA = 0
				VerificaEscolaAcessoAVA idEscolaVerificaAVA, bolRedirecionaAVA, idEscolaAVA
				
				If bolRedirecionaAVA Then
					
					SET rsAcessaAVA = spConnRS("spAVA_VerificaAVAAcessoByIdPapel", "file name=D:\Componentes\redesocial.udl", Array(Array("idAVAEscola",clng(idEscolaAVA),4),Array("idUsuario", clng(oRSUsuario("idUsuario")) ,4)))
					'Response.Write idEscolaAVA & " " & oRSUsuario("idUsuario")
					'Response.End()
					
					if not rsAcessaAVA.eof then
					
						'Se vier com o papel = 0 é pq é aluno e a escola esta em período de testes. Durante o período de testes as alunos não podem acessar o AVA.
						if rsAcessaAVA("idPapel") = 0 Then
							SessionMan.Valor("EscolaAVAEmTeste") = 1 'Seta na sessão que a escola esta em teste para desabilitar a rede antiga.					
						Else							
							
							%>
							<html>
								<body>
									<form action="/AVA/Login/Home/Suporte" method="post" name="fLoginAVA">
										<input type="hidden" value="<%=strLogin%>" name="login" id="login" />
										<input type="hidden" value="<%=Request.Cookies("SessionMan_SessionId")%>" name="SessionMan_SessionId" id="SessionMan_SessionId" />
										<input type="hidden" value="<%=strLoginSuporte%>" name="loginSuporte" id="loginSuporte" style="display: none" />
										<input type="password" value="<%=strSenhaSuporteAVA%>" style="display: none" name="senhaSuporte" id="senhaSuporte"/>
										
										<div class="container_central" style="text-align:center; margin-top:80px; font-family:Arial, Helvetica, sans-serif; font-size:14px">
											<strong>Carregando login <%=strLogin%></strong>
											<p><img src="/ava/staticContent/Common/img/perfil/loadingAnima.gif" width="208" height="13"></p>								
										</div>
									</form>
									<script>
										document.fLoginAVA.submit();
									</script>
								</body>
								
							</html>
							<%
							'Response.Redirect "/AVA/Login/Home/LoginVer?strLogin=" & strLogin & "&strSenhaSS=" &strSenha
							Response.End
						End if						
					end if
				End If
			
			end if
			'--------------AVA-----------------
			
			
		end if
	end if
	
	
	'############################################## Gravar log do campo ############################################
	If not oRSUsuario.BOF  Then
		IdOperacao     = 4 'Logar
		IdServico      = 1 'Login Suporte
		strPagina      = Request.ServerVariables("HTTP_HOST") & Request.ServerVariables("URL")		
		strRegistroLog = fStrGerarCampo("IdUsuarioEscola", IdUsuarioEscola)		
		fSubGerarLog IdUsuarioSuporte, IdOperacao, IdServico, strPagina, strRegistroLog	
	end if	
	'###############################################################################################################
end if
 
'######################################################################################


If oRSUsuario.BOF And oRSUsuario.EOF Then

	   ZeraObjetos
	  
	  'verifica se expirou login do pp
	  SET rsPPExpira = spConnRS("spUsuario_VerificaLoginExpiradoPP", Application("educacional_otimizado.udl"), Array(Array("strLogin",strLogin,20),Array("strSenha", strSenha,20)))
	  if not rsPPExpira.eof then
	  	Response.Redirect "/login/errologin.asp?errexp=1"
	  end if	
	  If Request.QueryString("from") = "lab" Then 
		Response.Redirect "/lab/errologin.htm"
	  ElseIf Request.Form("hid_bolSaibaMais") = "1" then
		Response.Redirect "/WWWSaibaMais/logue.asp?URL=" & Server.URLEncode(Request.QueryString("URL")) & "&logErr=1"
	  ElseIf Request.Form("hid_bolTelaoInterativo") = "1" then
		Response.Redirect "/aulastelao/login.asp?login=err"
	  Else
		Response.Redirect "/login/errologin.asp?1"  
	  End If
End If

'Zera SessionMan.Valor("strRestricaoMenu") para que o mesmo seja atualizado
'com as restrições do usuário logado.
'Alteração feita por Marcelo Ando (23/02/2006)
SessionMan.Valor("strRestricaoMenu") = ""

'Response.End
'*********************************************************
If oRSUsuario.Fields("IdEstado") <> 1 Then
	ZeraObjetos
  	if Request.QueryString("login") <> "1" then
		
		If Request.QueryString("from") = "lab" Then 
		  Response.Redirect "/lab/default.htm"
		ElseIf Request.Form("hid_bolTelaoInterativo") = "1" Then 
		  Response.Redirect "/aulastelao/login.asp?login=err"
		Else
		  Response.Redirect "/login/errologin.asp?2"
		End If
	end if	
End If
'*********************************************************

'Response.End
dim intTipoPortal

intTipoPortal = 0

Set oEscolaParametros = CreateObject("EducacionalBLL.clsEscolaParametros")
Set oRSEscolaParametros = oEscolaParametros.SelectById(oRSUsuario.Fields("IdEscola"))


'#######################################################
'Verifica se é AB e redireciona caso venha do www.SaibaMais.com.br, ou erro login caso falso
If oRSEscolaParametros.Fields("bolAprendeBrasil") Then
	If Request.Form("hid_bolSaibaMais") = "1" Then
		SessionMan.Valor("fromSPE") = "SPE_AB"
		SessionMan.Valor("strLogin_SPE") = Request.Form("strLogin")
		SessionMan.Valor("strSenha_SPE") = Request.Form("strSenha")

		'if Request.QueryString("URL") <> "" then
		'	strURL = replace(Request.ServerVariables("QUERY_STRING"),"&aoxnqp","?")
		'	if strURL <> "" then
		'		strURL = right(strURL,len(strURL)-4)
		'	end if
		'end if

		SessionMan.Valor("strURL_SPE") = Request.QueryString("URLab")
		'Response.Write "URL:" & SessionMan.Valor("strURL_SPE")
		'Response.End
		'Server.Transfer "/WWWSaibaMais/copy.asp"
		Response.Redirect "/WWWSaibaMais/copy.asp"

	ElseIf Request.Form("hid_bolTelaoInterativo") = "1" Then
		ZeraObjetos
		Response.Redirect "/aulastelao/login.asp?login=err"
	Else
		ZeraObjetos
		Response.Redirect "/login/errologin.asp?3"
	End If
End If
'#######################################################

' Portal Positivo - Usuários do PP não podem se logar no Educacional e vice-versa
'	portal educador-online também

If (Not oRSEscolaParametros.BOF) And (Not oRSEscolaParametros.EOF) Then
  SessionMan.Valor("Escola_PP") = oRSEscolaParametros.Fields("bolDistribuidora")

  If IsNull(SessionMan.Valor("Escola_PP")) Then
    SessionMan.Valor("Escola_PP") = False
  End If
  
  'Educacional com bolPositivo = true seta PubSite = 8 (Educacional/Positivo)
  If oRSEscolaParametros.Fields("bolPositivo") and not(SessionMan.Valor("Escola_PP"))  then
    SessionMan.Valor("PubSite") = 8
	intTipoPortal = 8
  end if
	'#######################################################
	'JAMAICA - verifica se eh Educacional/Positivo (PARCIAL)
  if SessionMan.Valor("PubSite") = 8 then
	  If oRSEscolaParametros.Fields("intTipoPortal") = 16  then	'Educacional/PP PARCIAL
'    	SessionMan.Valor("intTipoPortal") = 16
		intTipoPortal = 16
    	SessionMan.Valor("idEscolaPP") = oRSEscolaParametros.Fields("idEscolaPP")
	  Else	'Soh Educacional/PP
'    	SessionMan.Valor("intTipoPortal") = SessionMan.Valor("PubSite")
'    	SessionMan.Valor("intTipoPortal") = 8
		intTipoPortal = 8
    	SessionMan.Valor("idEscolaPP") = oRSEscolaParametros.Fields("idEscolaPP")
	  end if
  elseif oRSEscolaParametros.Fields("intTipoPortal") = 128 then	'EducadorOnline
'    	SessionMan.Valor("intTipoPortal") = 4
		intTipoPortal = 128
		SessionMan.Valor("Escola_Dominio") = "educadoronline"
  elseif SessionMan.Valor("PubSite") = 4 then	'soh PP
'    	SessionMan.Valor("intTipoPortal") = 4
		intTipoPortal = 4
'    	SessionMan.Valor("idEscolaPP") = oRSEscolaParametros.Fields("idEscolaPP")

  end if
'#######################################################
Else
  SessionMan.Valor("Escola_PP") = False
End If

'#######################################################
' login do Universitario
if oRSEscolaParametros.Fields("bolUniversitario") = 1 or oRSEscolaParametros.Fields("intTipoPortal") = 32 then
	intTipoPortal = 32
end if


'######################################################
'PP e EPC não podem usar Telão Interativo
If (SessionMan.Valor("Escola_PP") OR oRSEscolaParametros.Fields("intTipoPortal") = 64) AND  Request.Form("hid_bolTelaoInterativo") = "1" Then 
	Response.Redirect "/aulastelao/login.asp?login=err"
End If

'#######################################################
' login do EPC
if oRSEscolaParametros.Fields("intTipoPortal") = 64 then
	intTipoPortal = 64
end if

if intTipoPortal = 0 then
	intTipoPortal = 1
end if

SessionMan.Valor("intTipoPortal") = intTipoPortal

'se Request.Form("hid_bolSaibaMais") = "1", usuários de ambos os portais podem logar
'se Request.QueryString("SPE") <> "1" , link de assessoria de área, ambos os portais podem logar


'comentando para todos os portais poderem logar... CLEBER 201304016
''If (Not bolPP_Inicio) And SessionMan.Valor("Escola_PP") AND Request.Form("hid_bolSaibaMais") <> "1" AND Request.QueryString("SPE") <> "1" Then
''  ZeraObjetos
''  
''  Response.Redirect "/login/restritopositivo.asp"
''End If
''
''If bolPP_Inicio And Not(SessionMan.Valor("Escola_PP")) AND Request.Form("hid_bolSaibaMais") <> "1" AND oRSEscolaParametros.Fields("intTipoPortal") <> 128 Then
''  
''  ZeraObjetos
''  
''  Response.Redirect "/login/restritoeducacional.asp"
''End If


'#######################################################
' login do PCPV
if oRSEscolaParametros.Fields("intTipoPortal") = 256 then
	intTipoPortal = 256
end if

'########################################################
' login coleção
if oRSEscolaParametros.Fields("intTipoPortal") = 512 then
	intTipoPortal = 512
end if


'########################################################
' familia digital
if oRSEscolaParametros.Fields("intTipoPortal") = 1024 then
	intTipoPortal = 1024
end if


if oRSEscolaParametros.Fields("intTipoPortal") = 16384 then
	intTipoPortal = 16384
	response.redirect "http://avaliacoes.educacional.com.br"
	response.end
end if


if intTipoPortal = 0 then
	intTipoPortal = 1
end if

SessionMan.Valor("intTipoPortal") = intTipoPortal

'se Request.Form("hid_bolSaibaMais") = "1", usuários de ambos os portais podem logar
'se Request.QueryString("SPE") <> "1" , link de assessoria de área, ambos os portais podem logar


'comentando para todos os portais poderem logar... CLEBER 201304016
''If (Not bolPP_Inicio) And SessionMan.Valor("Escola_PP") AND Request.Form("hid_bolSaibaMais") <> "1" AND Request.QueryString("SPE") <> "1" Then
''  ZeraObjetos
''  
''  Response.Redirect "/login/restritopositivo.asp"
''End If
''
''If bolPP_Inicio And Not(SessionMan.Valor("Escola_PP")) AND Request.Form("hid_bolSaibaMais") <> "1" AND oRSEscolaParametros.Fields("intTipoPortal") <> 128 Then
''  
''  ZeraObjetos
''  
''  Response.Redirect "/login/restritoeducacional.asp"
''End If

'#######################################################
'Se é login do Educador Online e não veio do Educador online dá erro login e vice versa
If SessionMan.valor("Escola_Dominio") <> "educadoronline" AND intTipoPortal = 128 Then
	ZeraObjetos	
	Response.Redirect "/login/errologin.asp"
End If

If SessionMan.valor("Escola_Dominio") = "educadoronline" AND intTipoPortal <> 128 Then
	ZeraObjetos	
	Response.Redirect "/login/errologin.asp"
End If

'#######################################################

'#######################################################
'inicio redireciona logins do Universitario
'if oRSEscolaParametros.Fields("intTipoPortal") = 32 then
if intTipoPortal = 32 then
	ZeraObjetos	
	Response.Redirect "/login/errologin.asp"
end if
'#######################################################

'#######################################################
'inicio redireciona logins do EPC
'if oRSEscolaParametros.Fields("intTipoPortal") = 64 then
if intTipoPortal = 64 then
	ZeraObjetos	
	Response.Redirect "/login/errologin.asp"
end if
'fim redireciona logins do EPC
'#######################################################


'#######################################################
'inicio redireciona logins do PVPV
'if oRSEscolaParametros.Fields("intTipoPortal") = 64 then
if intTipoPortal = 256 then
	ZeraObjetos	
	Response.Redirect "/login/errologin.asp"
end if
'fim redireciona logins do EPC
'#######################################################


'#######################################################
'inicio redireciona logins PCDAFAMILIA
'if oRSEscolaParametros.Fields("intTipoPortal") = 64 then
if intTipoPortal = 1024 and len(sessionman.valor("strSuporteBlog")) <= 0 then
	ZeraObjetos	
	Response.Redirect "/login/errologin.asp"
end if
'fim redireciona logins do PCDAFAMILIA
'#######################################################


' fim.

'Response.End

If (IsNull(oRSUsuario.Fields("bolTermoAceito")) Or oRSUsuario.Fields("bolTermoAceito") = False) AND SessionMan.Valor("suporte") <> 1 Then
	if sessionMan.valor("gen") = 1 then
		'LOGIN EXTERNO VIA TOKEN, ATUALIZA BOLTERMOACEITO PARA TRUE	
		Set oUsuarioParametros = CreateObject("EducacionalBLL.clsUsuarioParametros")
		oUsuarioParametros.SaveTermo oRSUsuario("IdUsuario"), True, vbNullString, vbNullString, Now
		set oUsuarioParametros = nothing
	else

' Desligando o aceita termos no legado... Só será aceito pelo AVA 2013/03/21 -- Cleber
' Desligando o deslicar o termo - 2013/08/16 - Cleber'
		''if intTipoPortal = 4  or intTipoPortal = 2 then ' só apresenta o termo aceito para os usuarios pp e ab '
			SessionMan.Valor("LoginTemp") = strLogin
			SessionMan.Valor("SenhaTemp") = strSenha

			ZeraObjetos

			Response.Redirect "/termos/termos.asp"
		''end if
	end if
		
End If

Set oRSUsuarioPapel = oUsuario.SelectPapelById(oRSUsuario.Fields("IdUsuario"))



'ESTATISTICA
'######################################################################################
' ATENçÃO PLANTÃO:   QUEM HABILITAR/DESABILITAR ESTE SERVIÇO DEVE COMENTAR DATA-HORA-
'                                                                          MOTIVO-QUEM
'######################################################################################
'Desabilitado - 11:50 18/01/2004 - JAMAICA - Estava com blocks no banco
'HabilitadO - 11:20 16/02/2004 - JAMAICA - HABILITADO PQ PASSOU O STRESS.
'######################################################################################

'######################################################################################
'se vier do loginsuporte ou loginMasterEscola não conta estatistica
if sessionMan.valor("suporte") <> 1 then 
	NumAcesso = oUsuario.IncrementarNumAcesso(oRSUsuario.Fields("IdUsuario"))
	NumAcesso = oUsuario.IncrementarNumAcessoNew(oRSUsuario.Fields("IdUsuario"),CDate(now()))
end if 
'#######################################################################################


If (Not oRSEscolaParametros.BOF) And (Not oRSEscolaParametros.EOF) Then
  
  
  SessionMan.Valor("Escola_Logo") = oRSEscolaParametros.Fields("strLogo")
  SessionMan.Valor("Escola_URL") = oRSEscolaParametros.Fields("strURL")
  SessionMan.valor("bolModular") = oRSEscolaParametros.Fields("bolModular")
  'Alteração para extrair eventuais espaços antes e/ou depois da string
  'que podem ocasionar problemas na identificação da escola.
  'Feito em 20/12/2007 por Marcelo Ando
  SessionMan.Valor("Escola_Logo_Color") = Trim(oRSEscolaParametros.Fields("strColor"))
  if  SessionMan.Valor("Escola_Dominio") = "comercialspe2010" then
	SessionMan.Valor("Escola_Logo_Color") = "comercialspe2010"
  end if
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
  SessionMan.Valor("Escola_Ano") = oRSEscolaParametros.Fields("intAnoVigente")
  SessionMan.Valor("Escola_Semestre") = oRSEscolaParametros.Fields("intSemestreVigente")
  SessionMan.Valor("Escola_Comunicador") = oRSEscolaParametros.Fields("bolComunicador")
  If SessionMan.Valor("Escola_Dominio") <> "pp" AND SessionMan.Valor("Escola_Dominio") <> "educadoronline" then 
	SessionMan.Valor("Escola_Dominio") = ""
  End If
  SessionMan.Valor("Escola_URLAtiva") = ""
  SessionMan.Valor("Escola_LinkCor") = ""
  SessionMan.Valor("Escola_PP") = oRSEscolaParametros.Fields("bolDistribuidora")
  If IsNull(oRSEscolaParametros.Fields("intAnoVigente")) Then
    SessionMan.Valor("Escola_Ano") = Year(Date())
  End If
  If IsNull(oRSEscolaParametros.Fields("intSemestreVigente")) Then
    SessionMan.Valor("Escola_Semestre") = 0
  End If
End If


Set oEscolaParametros = Nothing
Set oRSEscolaParametros = Nothing

SessionMan.Valor("AlteraDados") = 1
SessionMan.Valor("LoginID") = strLogin
SessionMan.Valor("SenhaID") = strSenha
SessionMan.Valor("CodigoUsuario") = oUsuario.GetIdAntigo(oRSUsuario.Fields("IdUsuario"))
SessionMan.Valor("IdUsuario") = oRSUsuario.Fields("IdUsuario")
SessionMan.Valor("Apelido") = oRSUsuario.Fields("strApelido")

If InStr(1,oRSUsuario.Fields("strNome")," ") <> 0 Then
  SessionMan.Valor("Nome") = Left(oRSUsuario.Fields("strNome"),InStr(1,oRSUsuario.Fields("strNome")," ")-1)
  SessionMan.Valor("Sobrenome") = Right(oRSUsuario.Fields("strNome"),Len(oRSUsuario.Fields("strNome"))-InStr(1,oRSUsuario.Fields("strNome")," "))
Else
  SessionMan.Valor("Nome") = oRSUsuario.Fields("strNome")
  SessionMan.Valor("Sobrenome") = ""
End If

SessionMan.Valor("EMail") = oRSUsuario.Fields("strEmail")
SessionMan.Valor("EMailEducacional") = oRSUsuario.Fields("strEmailEducacional")
SessionMan.Valor("Nascimento") = oRSUsuario.Fields("dataNascimento")
SessionMan.Valor("Tipo") = Left(oRSUsuarioPapel.Fields("IdPapel"),1)

'''''''''''''''''''''''''''patrick
oRSUsuarioPapel.filter = "bolPadrao = 1"
If (Left(oRSUsuarioPapel.Fields("IdPapel"),1) = 3) Then
  SessionMan.Valor("Tipo") = 2
ElseIf (Left(oRSUsuarioPapel.Fields("IdPapel"),1)= 4) Then
  SessionMan.Valor("Tipo") = 3
ElseIf (Left(oRSUsuarioPapel.Fields("IdPapel"),1)= 2) Then 
  SessionMan.Valor("Tipo") = 4
ElseIf (Left(oRSUsuarioPapel.Fields("IdPapel"),1)= 6) Then
  SessionMan.Valor("Tipo") = 6
End If

'Ana Shima - 11/08/2008
'Criado para amenizar a pesquisa em banco pelo papel do usuário.
SessionMan.Valor("IdPapelPadrao") = oRSUsuarioPapel.Fields("IdPapel")


'Limpa o cache da barra de logados.
Set objBarraLogadosBL = Server.CreateObject("BarraLogadosBLL.clsBarraLogados")
objBarraLogadosBL.LimparCache SessionMan.Valor("IdUsuario")
Set objBarraLogadosBL = Nothing

'se vier do suporte ou loginMasterEscola não conta loginUnico
'se vier do login do Telão Interativo também não conta loginUnico
if sessionMan.valor("suporte") <> 1 AND Request.Form("hid_bolTelaoInterativo") <> "1" then 
	'###################################################################################################
	'Leo C. Ianze
	'18/11/2002
	'rotina que grava identidade do login unico no banco e na session.
	'verficar se a chamada veio da pagina de login multiplo. Se sim não entra na rotina abaixo.
	'LOGINUNICO
	'###########################################################################################
	if Request.QueryString("educ") <> 1 then
		Dim oLoginUnico
		Dim rsLoginUnico
		Dim val
		val = oRSUsuario.Fields("IdUsuario")
		set oLoginunico = server.CreateObject("LoginUnicoBLL.clsLoginUnico")
		rsLoginUnico = clng(oLoginUnico.UpdateById(clng(val)))
		SessionMan.Valor("LoginUnico") = rsLoginUnico
		Set oLoginunico = nothing
	end if 	
	'###########################################################################################

'SUPORTE
end if 
'##########################################################################################
'SessionMan.Valor ("suporte") = 1 'cacela verificação de acesso duplicado no testaacesso.asp
'###################################################################################################


set oRSEScola = oEScola.SelectById (oRSUsuario("idEScola"))

'SessionMan.Valor("Cidade") = oRSUsuario.Fields("strCidade")
SessionMan.Valor("Cidade") = oRSEscola.Fields("strCidade")
SessionMan.Valor("Capital") = oRSUsuario.Fields("strCapital")
'SessionMan.Valor("UF") = oRSUsuario.Fields("strUF")
SessionMan.Valor("UF") = oRSEscola.Fields("strUF")
SessionMan.Valor("CodigoEscola") = oRSUsuario.Fields("IdEscola")
SessionMan.Valor("EscolaID") = oRSUsuario.Fields("IdEscola")
SessionMan.Valor("Escola") = oRSUsuario.Fields("strEscola")
SessionMan.Valor("Escola_Mat") = oRSUsuario.Fields("strCodEscola")
SessionMan.Valor("IdSerieAluno") = oRSUsuario.Fields("IdSerieAluno")

If IsNull(SessionMan.Valor("IdSerieAluno")) Then
  SessionMan.Valor("IdSerieAluno") = 0
End If

If IsNull(oRSEscola.Fields("strCidade")) Then
  SessionMan.Valor("Cidade") = ""
End If

If IsNull(oRSUsuario.Fields("strCapital")) Then
  SessionMan.Valor("Capital") = ""
End If

If IsNull(oRSEscola.Fields("strUf")) Then
  SessionMan.Valor("UF") = ""
End If

'SessionMan.Valor("Turma") = oRSUsuario.Fields("IdTurma")
'SessionMan.Valor("Serie") = oRSUsuario.Fields("intSerie")
'verifica se veio do login multiplo 
if Request.QueryString("login") = 1 then
	SessionMan.Valor("IdTipoSenha") = CInt(146)
else	
	If IsNumeric(oRSUsuario.Fields("IdTipoSenha")) Then
		SessionMan.Valor("IdTipoSenha") = CInt(oRSUsuario.Fields("IdTipoSenha"))
	Else
		SessionMan.Valor("IdTipoSenha") = 0
	End If
end if	

SessionMan.Valor("bolComunicador") = oRSUsuario.Fields("bolComunicador")


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

'
'	Anderson Guiera - Fazendo as verificações antes de filtrar a turma pelo ano e semestre
'
strNome = oRSUsuario.Fields("strNome")
intSexo = oRSUsuario.Fields("intSexo")
If IsEmpty(oRSUsuario.Fields("strCidade")) Or IsEmpty(oRSUsuario.Fields("strUF")) Or IsEmpty(oRSUsuario.Fields("dataNascimento")) Or IsEmpty(oRSUsuario.Fields("intSexo")) Then
	bolAtualizaDados = true
else
	bolAtualizaDados = false
end if

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

'
'	Anderson Guiera - Fim
'

If IsNull(SessionMan.Valor("Serie")) Then
  SessionMan.Valor("Serie") = 0
End If

If intSexo = 1 Then
  SessionMan.Valor("Artigo") = "a"
  SessionMan.Valor("Sexo") = "F"
Else
  SessionMan.Valor("Artigo") = "o"
  SessionMan.Valor("Sexo") = "M"
End If

Response.Cookies("IdUsuario") = SessionMan.Valor("IdUsuario")
Response.Cookies("Nome") = strNome
Response.Cookies("Escola") = SessionMan.Valor("Escola")
Response.Cookies("idEscolaEstatistica") = SessionMan.Valor("EscolaID")
Response.Cookies("Papel") = SessionMan.Valor("Tipo")
Response.Cookies("Serie") = SessionMan.Valor("Serie")
Response.Cookies("Sexo") = SessionMan.Valor("Sexo")

If (Request.QueryString("from") = "sim") then   ' Or (SessionMan.Valor("EscolaID") = cEscolaSim) Then	--> comentado por Rieke
  ZeraObjetos
  
  Response.Redirect "/sim/interna.asp"
End If

If Request.QueryString("from") = "termos" Then
  If SessionMan.Valor("IdTipoSenha") <> 146 And SessionMan.Valor("IdTipoSenha") <> 193 Then
    ZeraObjetos
    if prilog <> 1 then ' se não for primeiro login
		Response.Redirect "/login/login1.asp?returnto=ver"
    end if 
  End If
End If

'
'	Anderson Guiera - Substituição da condição anterior pelo bolAtualizaDados
'	Condição anterior: If IsEmpty(oRSUsuario.Fields("strCidade")) Or IsEmpty(oRSUsuario.Fields("strUF")) Or IsEmpty(oRSUsuario.Fields("dataNascimento")) Or IsEmpty(oRSUsuario.Fields("intSexo")) Then
'
If bolAtualizaDados Then
  If SessionMan.Valor("IdTipoSenha") <> 146 And SessionMan.Valor("IdTipoSenha") <> 193 Then
    ZeraObjetos
    Response.Redirect "/login/atualizadadosform.asp"
  End If
End If
'
'	Anderson Guiera - Fim da Substituição
'

If (NOT (IsEmailValid(SessionMan.Valor("Email")) OR IsEmailValid(SessionMan.Valor("EmailEducacional"))) OR (SessionMan.Valor("Email") = "email@dominio.com.br" AND NOT(IsEmailValid(SessionMan.Valor("EmailEducacional"))))) Then
  If SessionMan.Valor("IdTipoSenha") <> 146 And SessionMan.Valor("IdTipoSenha") <> 193 Then
    ZeraObjetos
	'verifica se é primeiro login
	if prilog <> 1 then
		'esta session é somente para teste (retirar após aprovado)
		'if SessionMan.Valor("TesteLeo") = "2" then
		'	SessionMan.Valor("TesteLeo") = 0
		'else	
		'	Response.Redirect "/login/alteraemail.asp"
		'end if	
		
	end if
		
  End If
End If

If Request.QueryString("from") = "lab" Then
  ZeraObjetos
  SessionMan.Valor("LoginID") = strLogin
  SessionMan.Valor("SenhaID") = strSenha

  Response.Redirect "/lab/lista.htm"
End If

ZeraObjetos

'Verifica se a chamada é da página de login multiplo (educador)
if Request.QueryString("educ") =1 then
	if SessionMan.Valor("tipo") = 2 then
		Response.Redirect "/LoginMultiplo/default.asp?educ=1"
	end if	
end if

'verifica se veio do login do telão interativo
if Request.Form("hid_bolTelaoInterativo") = "1" then
	Response.Redirect "/aulastelao/default_exe.asp"
end if

'verifica se veio do ppremiado
if Request.form("ppremiado") = "aceito" then
	 Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/portalpremiado/"
end if

'strURL = Request.QueryString("URL")
if Request.QueryString("URL") <> "" then

	If Request.Form("hid_bolSaibaMais") = "1" Then 'veio do www.saibamais.com.br, não precisa tratar o endereço
		Response.Redirect Request.QueryString("URL")
	End If

	strURL = replace(Request.ServerVariables("QUERY_STRING"),"&aoxnqp","?")
	strURL = Replace(strURL, "$$", "?", 1, 1, 1)
	strURL = Replace(strURL, "$$", "&")
	
	if strURL <> "" then
		strURL = right(strURL,len(strURL)-4)
		strURL = replace(strURL,"/ttcm/","/tabletcm/")
	end if
end if

'Response.Write Request.ServerVariables("QUERY_STRING")'Request.QueryString("URL")
'Response.End

'strURL = Request.QueryString("URL")

If strURL <> "" Then
  If strURL = "/pesquisa_nova/respostapalavra.asp" Or strURL = "/pesquisa_nova/respostadisci.asp" Or strURL = "/pesquisa_nova/respostadisci1.asp" Then
    If SessionMan.Valor("Escola_PP") Then
      SessionMan.Valor("PP_strURL") = application("URL_Educ") & SessionMan.Valor("Pes_URL")
      Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/login/loginpp.asp"
    ElseIf intTipoPortal = 128 Then
			Response.Redirect "/Recursos/SessionMan/CopySessionOrigem.asp?servidor=" & application("DOM_EonLine") & "&url=" & application("URL_Educ") & SessionMan.Valor("Pes_URL")
			'Response.Redirect application("URL_Educ") & SessionMan.Valor("Pes_URL")
	Else
      Response.Redirect SessionMan.Valor("Pes_URL")
    End If
  ElseIf strURL = "/pesquisa/respostapalavra.asp" Or strURL = "/pesquisa/respostadisci.asp" Or strURL = "/pesquisa/respostadisci1.asp" Then
    If SessionMan.Valor("Escola_PP") Then
      SessionMan.Valor("PP_strURL") = application("URL_Educ") & SessionMan.Valor("Pes_URL")
      Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/login/loginpp.asp"
    ElseIf intTipoPortal = 128 Then
			Response.Redirect "/Recursos/SessionMan/CopySessionOrigem.asp?servidor=" & application("DOM_EonLine") & "&url=" & application("URL_Educ") & SessionMan.Valor("Pes_URL")
			'Response.Redirect application("URL_Educ") & SessionMan.Valor("Pes_URL")
	Else
      Response.Redirect SessionMan.Valor("Pes_URL")    
    End If
  ElseIf strURL = "/catalogo/catalogo_lista.asp" Or strURL = "/catalogo/catalogo_pasta.asp" Then
    If SessionMan.Valor("Escola_PP") Then
      SessionMan.Valor("PP_strURL") = application("URL_Educ") & SessionMan.Valor("Cat_URL")
      Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/login/loginpp.asp"
    ElseIf intTipoPortal = 128 Then
			Response.Redirect "/Recursos/SessionMan/CopySessionOrigem.asp?servidor=" & application("DOM_EonLine") & "&url=" & application("URL_Educ") & SessionMan.Valor("Cat_URL")
			'Response.Redirect application("URL_Educ") & SessionMan.Valor("Cat_URL")
	Else
      Response.Redirect SessionMan.Valor("Cat_URL")
    End If
  Else

    strURL = Replace(strURL,"*rdservidor","?servidor")
    strURL = Replace(strURL,"*rdurl","&url")

    If SessionMan.Valor("Escola_PP") AND Request.Form("hid_bolSaibaMais") = "1" Then
		SessionMan.Valor("Escola_Dominio") = "pp"
		SessionMan.Valor("PubSite") = 4
		Response.Redirect strURL
    
    Elseif SessionMan.Valor("Escola_PP") Then
    
      SessionMan.Valor("PP_strURL") = application("URL_Educ") & strURL
      Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/login/loginpp.asp"
      
	ElseIf intTipoPortal = 128 Then
			'SessionMan.Valor("Escola_Dominio") = "educadoronline"			
			If strURL = "/home.asp" Then
			    Response.Redirect "/Recursos/SessionMan/CopySessionOrigem.asp?servidor=" & application("DOM_EonLine") & "&url=" & application("URL_Eonline") & strURL
			Else
			    Response.Redirect "/Recursos/SessionMan/CopySessionOrigem.asp?servidor=" & application("DOM_EonLine") & "&url=" & application("URL_Educ") & strURL
			End If
			'Response.Redirect application("URL_Educ") & strURL
    Else
      
    
      Response.Redirect strURL
      
    End If
  End If
End If

If SessionMan.Valor("Escola_PP") Then
			SessionMan.Valor("intTipoPortal") = 4
			SessionMan.Valor("PubSite") = 4
			Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/minhaHome.asp"
	
		  'Select Case CInt(SessionMan.Valor("Tipo"))
			'Case 1
			 ' If SessionMan.Valor("IdSerieAluno") <> 0 Then
			  'intSerie referese ao idSerie!
				'intSerie = CInt(SessionMan.Valor("IdSerieAluno"))
				'If ((intSerie >= 1) And (intSerie <= 4) OR intSerie = 27) Then
				'  Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/alunos14.asp"
				'ElseIf ((intSerie >= 5) And (intSerie <= 8)) Then
				'  Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/alunos58.asp"
				'ElseIf ((intSerie = 17) Or (intSerie = 10) Or (intSerie = 11) Or (intSerie = 18)) Then
				'  Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/alunos13.asp"
				'ElseIf ((intSerie >= 12) And (intSerie <= 16) Or intSerie = 9) Then
				'  Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/ed_infantil.asp"
				'End If
			  'End If
			  'Response.Redirect("/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/home.asp")
			'Case 2
			 ' Response.Redirect "/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/educadores.asp"
			'Case Else
			 ' Response.Redirect("/rd/gravar.asp?servidor=" & application("DOM_PP") & "&url=/home.asp")
		  'End Select
		  
End If

If intTipoPortal = 128 Then	'educador online

	'Response.Write "teste:" & SessionMan.Valor("Escola_Dominio")
	'Response.Write "login: " & SessionMan.Valor("LoginID")
	'Response.End 

	Response.Redirect "/Recursos/SessionMan/CopySessionOrigem.asp?servidor=" & application("DOM_EonLine") & "&url=/home.asp"
	'Response.Redirect application("URL_EonLine") & "/inicio.asp"
	
End If

If strEnderecoBlog <> "" Then
	Response.Redirect "/blog/gerenciamento/redirect.asp?blog=" & strEnderecoBlog
ElseIf strEnderecoWiki <> "" Then
    Response.Redirect "/wikieducacional/redirect.asp?wiki=" & strEnderecoWiki
ElseIf strEnderecoSite <> "" Then
    Response.Redirect "/novoconstrutor/redirect.asp?site=" & strEnderecoSite
elseif VerificaEscolaRedeSocial(sessionman.valor("EscolaID")) then
	Response.Redirect "/rede/minhapagina.asp"
Else
	if sessionman.valor("bolModular") then
		response.redirect "/home_modular.asp"
	else

			Select Case CInt(SessionMan.Valor("Tipo"))
			  Case 1
				If SessionMan.Valor("Serie") <> "" Then
				  intSerie = CInt(SessionMan.Valor("Serie"))
				  If ((intSerie >= 1) And (intSerie <= 4) OR intSerie = 10) Then
						Response.Redirect "/alunos14/alunos14.asp"
				  ElseIf ((intSerie >= 5) And (intSerie <= 8)) Then
					Response.Redirect "/alunos58/alunos58.asp"
				  ElseIf ((intSerie >= 11) And (intSerie <= 14)) Then
					Response.Redirect "/alunos13/alunos13.asp"
				  ElseIf ((intSerie >= 90) And (intSerie <= 94) Or intSerie = 9) Then
					Response.Redirect "/ed_infantil/ed_infantil.asp"
				  End If
				Else
				  SessionMan.Valor("Serie") = 0
				End If
				Response.Redirect "/alunos.asp"	
			  Case 2
				if VerificaRedeSocialEducadores(SessionMan.Valor("EscolaID"))  then	
					Response.Redirect "/rede/minhapagina.asp"
				else
					Response.Redirect "/educadores/educadores.asp"
			    end if 
			  Case 3
				if VerificaRedeSocialEducadores(SessionMan.Valor("EscolaID"))  then	
					Response.Redirect "/rede/minhapagina.asp"
				else
					Response.Redirect "/educadores/educadores.asp"
			    end if 
			  Case 4
				Response.Redirect "/pais/pais.asp"
			  Case 5
				if VerificaRedeSocialEducadores(SessionMan.Valor("EscolaID"))  then	
					Response.Redirect "/rede/minhapagina.asp"
				else
					Response.Redirect "/educadores/educadores.asp"
			    end if 
			  Case 6
				if VerificaRedeSocialEducadores(SessionMan.Valor("EscolaID"))  then	
					Response.Redirect "/rede/minhapagina.asp"
				else
					Response.Redirect "/educadores/educadores.asp"
			    end if 
			  Case Else
				Response.Redirect("/home.asp")	
			End Select
	end if
End If

ZeraObjetos
%>
