<HTML><HEAD><TITLE>MetaTex Equation Editor</TITLE></HEAD>
<BODY bgColor=#ffffff>
<div id="divteste"></div>
<script type="text/javascript">
	function jsTeste(conteudo)
	{
	      document.getElementById('divteste').innerHTML= conteudo;     
	}
	function colaHTML(caixa,imageURL)
	{
	      window.opener.insert_content(caixa,imageURL);
		  //colaHTMLdoApplet(caixa,imageURL);
	}
	function colaImagemHTML(caixa,imageURL)
	{
	      window.opener.insert_content(caixa,imageURL);
		  //colaHTMLdoApplet(caixa,imageURL);
	}
</script>
<APPLET height="550" 
	width="556" 
        MAYSCRIPT
	code="physicon.metatex3.applet.editor.EditorApplet.class" VIEWASTEXT>
	
<PARAM NAME="equation" VALUE="\frac {1}{c^{2}}">
<!--
<PARAM NAME="mmlConverterUrl" VALUE="http://localhost:8080/servlets-examples/servlet/mml2image">
<PARAM NAME="mtConverterUrl" VALUE="http://localhost:8080/servlets-examples/servlet/mt2image">
<PARAM NAME="mml2MtTranslatorUrl" VALUE="http://localhost:8080/servlets-examples/servlet/mml2mt">
<PARAM NAME="mt2MmlTranslatorUrl" VALUE="http://localhost:8080/servlets-examples/servlet/mt2mml">
-->
<PARAM NAME="mmlConverterUrl" VALUE="http://local.educacional:2534/EqEdt/servlet/mml2image">
<PARAM NAME="mtConverterUrl" VALUE="http://local.educacional:2534/EqEdt/servlet/mt2image">
<PARAM NAME="mml2MtTranslatorUrl" VALUE="http://local.educacional:2534/EqEdt/servlet/mml2mt">
<PARAM NAME="mt2MmlTranslatorUrl" VALUE="http://local.educacional:2534/EqEdt/servlet/mt2mml">
<PARAM NAME="idChannel" VALUE="12">
<PARAM NAME="idIcon" VALUE="1">
<PARAM NAME="idUser" VALUE="1">
<PARAM NAME="archive" VALUE="editor.jar">
<PARAM NAME="codeBase" VALUE=".">
<PARAM NAME="height" VALUE="550">
<PARAM NAME="width" VALUE="556">
<PARAM NAME="idCaixa" VALUE="<%=request("idCaixa")%>">
<PARAM NAME="code" VALUE="physicon.metatex3.applet.editor.EditorApplet.class">
<!--PARAM NAME="serverURL" VALUE="HTTP://<%=Request.ServerVariables("SERVER_NAME")%>:<%=Request.ServerVariables("SERVER_PORT")%>"-->
<PARAM NAME="serverURL" VALUE="HTTP://<%=Request.ServerVariables("SERVER_NAME")%>:8080>
</APPLET> 
<BR><BR>
</A></BODY>
</HTML>
