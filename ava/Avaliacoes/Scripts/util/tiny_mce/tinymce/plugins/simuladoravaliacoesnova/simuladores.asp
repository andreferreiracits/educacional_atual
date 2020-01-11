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
	
	//fe.className = "mceSimulador";
	
	h = '<img src="/avaliacoes/tinymce/jscripts/tiny_mce/plugins/simulador/img/trans.gif"' ;
		
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
<style>

</style>
</head>
<body>
<table>
<tr>
	<td>
		Selecione o simulador abaixo para inseri-lo na questão.<br>
		Para conhecer melhor os simuladores disponíveis,<br>
		visite a seção <a href="http://www.educacional.com.br/simuladores" target="_blank">simuladores</a> do portal.
	</td>
</tr>
	
	<tr>		
		<td>
			<table>
			<%
			i=4
			while not rsC.eof
			%>
			<%if (i mod 4 = 0) then %>
				<tr>
			<%end if%>	
					<td align="center" valign="top">
						<table border=0 id="tbl1" style="cursor:pointer;">
							<tr>
								<td align="center" style="font-size:24px;">
									<%
										vetSimXY = split(rsC("strDimensoes"), "x")
									%>
									<div onClick="insertMedia('<%=rsC("idPublicacao")%>','<%=rsC("strURL")%>', '<%=vetSimXY(0)%>', '<%=vetSimXY(1)%>')"><img src="<%=rsc("strURLImagem")%>"></div>
								</td>
							<tr>
							</tr>	
								<td  align="center" style="color:#2A2661">
									<%=rsc("strName")%>
								</td>
							</tr>
						</table>			
					</td>
				<%if (i mod (i-1) = 0) then %>	
				</tr>
				<%end if%>
				<%
					i = i+1
					rsC.moveNext
				wend	
				%>
			</table>			
		</td>	
	</tr>
	
</table>
</body>
</html>