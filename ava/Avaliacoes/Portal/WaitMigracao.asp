
<%Response.charset="iso-8859-1"%>

<!-- #include virtual="/recursos/sessionman/sessionman.asp" -->
<!--#include virtual="/recursos/spConn/spConn.asp" -->
<!--#include virtual= "/login/restrito.asp" -->

<%
Call Testa_Acesso(0)
%>

<html lang="pt-br" xml:lang="pt-br">
<head>
<title><!--#include virtual="/include/inc_titulo.asp"--></title>
<!--#include virtual="/include/frameworkjs.asp"-->

<!--#include virtual="/esc_include/esc_style/esc_style.asp"-->

<style type="text/css">
#avaliacoeswaitmigracao_conteudo
{
    padding-top: 75px;
    padding-bottom: 150px;
    display: table-cell;
    width:inherit;
    text-align: center;
    vertical-align: middle;
    font-family: Arial;
}
#avaliacoeswaitmigracao_conteudo h1
{
    font-size: 16pt;
    color: #505050;
    font-weight: normal;
}
#avaliacoeswaitmigracao_conteudo p
{
    font-size: 13pt;
    color: #979797;
}
#avaliacoeswaitmigracao_conteudo p.imgLogo{
    margin-bottom: 30px;
}
#educ_corpo .barra_1024
{
    display: none;
}
</style>

</head>

<body>
<div id="educ_geralexterno">
	<div id="educ_cabecalho">
        <!--#include virtual="/include/barrass.asp"-->
        <!--#include virtual="/include/tarja_superior.inc"-->
        <!--#include virtual="/include/tarja_meio.inc"-->
	</div>
	<div id="educ_bgcorpo" class="bg_Port">
   	 
	  <div id="educ_corpo" class="centraliza_res" >

       	
			
      <div id="avaliacoeswaitmigracao_conteudo"> 
        
        <p class="imgLogo"><img src="/Ava/avaliacoes/Content/imgcss/1.0.2/logo_avaliacoes.png" /></p>
        <img src="/Ava/avaliacoes/Content/imgcss/1.0.2/linhaDegrade1.png" />
        <h1><%=Server.HTMLEncode("Serviço temporariamente indisponível.") %></h1>        <p><%=Server.HTMLEncode("Estamos migrando para a nova versão.") %> <br />
        <%=Server.HTMLEncode("Em breve, você conhecerá os novos recursos da ferramenta.") %></p>
        <img src="/Ava/avaliacoes/Content/imgcss/1.0.2/linhaDegrade1.png" />
        
      </div>
	</div>
	</div>
	<!--#include virtual="/include/copyright.asp"-->
	
</div>

</body>
</html>
