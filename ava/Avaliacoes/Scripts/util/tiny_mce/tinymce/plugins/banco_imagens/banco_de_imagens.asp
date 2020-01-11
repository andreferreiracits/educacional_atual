<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!--#Include Virtual = "/Recursos/spConn/spConn.asp"-->
<%

set objC = server.CreateObject("ADODB.Command")
objC.activeConnection = Application("educacional_otimizado.udl")
objC.commandtext = "SELECT * FROM tblSimulador" 
set rsC = server.createObject("ADODB.recordSET")
rsC.cursorlocation = 3
rsC.open objC

%>
<html>
<head>
<script type="text/javascript" src="../../tiny_mce_popup.js"></script>

<script>

ed = tinyMCEPopup.editor;

function insertMedia(id,url,x,y) {
	
	var fe, f = document.forms[0], h;

	tinyMCEPopup.restoreSelection();
	
	//f.width.value = f.width.value == "" ? 100 : f.width.value;
	//f.height.value = f.height.value == "" ? 100 : f.height.value;

	fe = ed.selection.getNode();
	
	fe.className = "mceSimulador";
	
	h = '<img src="tinymce/jscripts/tiny_mce/plugins/simulador/participe_icone.gif"' ;
		
	h += ' class="mceSimulador"';
	h += ' title="\'id\' : \''+ id +'\', \'url\' : \'' + url + '\', \'x\' : \'' + x + '\', \'y\' : \'' + y + '\'"';
	h += ' width="' + x + '"';
	h += ' height="' + y + '"';
	h += ' align="' + 'center' + '"';

	h += ' />';
	
	ed.execCommand('mceInsertContent', false, h);
		
	tinyMCEPopup.close();
	
}
</script>
</head>
<body>
<table>
	<%while not rsC.eof%>
	<tr>		
		<td>
			<%
				vetSimXY = split(rsC("strDimensoes"), "x")
			%>
			<div onClick="insertMedia('<%=rsC("idPublicacao")%>','<%=rsC("strURL")%>', '<%=vetSimXY(0)%>', '<%=vetSimXY(1)%>')"><img src="<%=rsc("strURLImagem")%>"></div>
		</td>
		<td>
			<%=rsc("strName")%>
		</td>	
	</tr>
	<%
		rsC.moveNext
	wend	
	%>
</table>
</body>
</html>