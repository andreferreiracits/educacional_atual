<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!--#Include Virtual = "/Recursos/spConn/spConn.asp"-->
<%
	
	PATH = Application("educacional_otimizado.udl")
	sp = "spArquivo_SelectId"
	
	dim strCaminho
	dim strCamPreview
	dim idPub
	dim idArquivo
	DIM bolFlash
	
	'dirbase = "http://www.educacional.com.br"

	strCamPreview = request("imgpreview")
	idPub = clng(request("id"))
	idArquivo = Request("idArquivo")
	x = Request("x")
	y = Request("y")
	
	set rsArquivo = spConnRS(sp, PATH, Array(array("idArquivo", clng(idArquivo), 4)))
	
	strCaminho = dirbase & "/" & rsArquivo("strPath")
	
	
	if rsArquivo("idFormato")=194 THEN
		bolFlash = 1
	else
		bolFlash = 0
	end if	 
	'set objArquivos=server.CreateObject("PublicacaoBLL.clsPublicacaoArquivo")
	'set recArquivos=objArquivos.SelectByPublicacao(idPub)

	'strCaminho = ""

	'recArquivos.sort= "intTamanhoArq ASC"
	'do while not recArquivos.eof
		'response.write recArquivos("idformato")
		'if recArquivos("idFormato")=139 or recArquivos("idFormato")=140 then 
			'strCaminho = dirbase & "/" & recArquivos("strPath")
			'exit do
		'end if
		'//if recArquivos("idFormato")=194 then strTipoArq="SWF"
		'recArquivos.movenext
	'loop 
	'if strCaminho = "" then 
		'strCaminho = strCamPreview
	'end if
	
	
	
	

	'recArquivos.close()
	'set recArquivos = nothing
	'set objArquivos = nothing
	%>


	<html>
		<body  bgcolor="#FFFFCC" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"  >
			<script>
				parent.retorna('<%=strCaminho%>', <%=bolFlash%>, <%=x%>, <%=y%>);
			</script>
		</body>
	</html>
