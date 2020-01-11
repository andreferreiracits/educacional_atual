<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!--#Include Virtual = "/Recursos/spConn/spConn.asp"-->
<%

'set objC = server.CreateObject("ADODB.Command")
'objC.activeConnection = Application("educacional_otimizado.udl")
'objC.commandtext = "SELECT * FROM tblSimulador" 
'set rsC = server.createObject("ADODB.recordSET")
'rsC.cursorlocation = 3
'rsC.open objC

textEqt = Request("textEqt")

if len(textEqt) <= 0 then
 	textEqt   = "\frac {1}{c^{2}}"
end if


%>
<html>
<head>

<script type="text/javascript" src="../../tiny_mce_popup.js"></script>

<script>

ed = tinyMCEPopup.editor;

function setEqt(text) {
		
	var fe, f = document.forms[0], h;

	tinyMCEPopup.restoreSelection();
	
	//f.width.value = f.width.value == "" ? 100 : f.width.value;
	//f.height.value = f.height.value == "" ? 100 : f.height.value;

	//fe = ed.selection.getNode();
	
	//fe.className = "mceEquacao";
	
	h = '<img src="http://appserver.educacional.com.br:8080/EqEdt/servlet/mt2image?operation=getImageFromText&text=' + text + '"' ;
		
	h += ' class="mceEquacao"';
	//h += ' title="\'id\' : \''+ id +'\', \'url\' : \'' + url + '\', \'x\' : \'' + x + '\', \'y\' : \'' + y + '\'"';
	//h += ' width="' + '100' + '"';
	//h += ' height="' + '100' + '"';
	h += ' align="' + 'center' + '"';
	h += ' title="' + text + '"'; 
	h += ' />';
	
	ed.execCommand('mceInsertContent', false, h);
		
	tinyMCEPopup.close();
	
}
</script>
</head>
<body>
<APPLET height="550" 
	width="506" 
        MAYSCRIPT
	code="physicon.metatex3.applet.editor.EditorApplet.class" VIEWASTEXT>
	
<PARAM NAME="equation" VALUE="<%=textEqt%>">
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
<PARAM NAME="width" VALUE="506">
<PARAM NAME="idCaixa" VALUE="<%=request("idCaixa")%>">
<PARAM NAME="code" VALUE="physicon.metatex3.applet.editor.EditorApplet.class">
<!--PARAM NAME="serverURL" VALUE="HTTP://<%=Request.ServerVariables("SERVER_NAME")%>:<%=Request.ServerVariables("SERVER_PORT")%>"-->
<PARAM NAME="serverURL" VALUE="HTTP://<%=Request.ServerVariables("SERVER_NAME")%>:8080>
</APPLET> 

</body>
</html>