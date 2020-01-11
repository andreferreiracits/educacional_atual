<!-- #include virtual="/include/connection_open_educacionalotimizado.asp" -->
<%
	
	'strCaminho = request("strCaminho")

	idObjeto = request("idObjeto")
	set rsLink = objConnOtimizado.execute("select strURL from tblPublicacao where IdPublicacao=" & idObjeto)

	function TemHTML5(strCaminho)
	dim ObjFS	
	'/recursos/explore/conteudos/lessons/Biologia 1/uc_b4_l078/html/
	strCaminho = "/recursos/explore/conteudos/lessons/" & replace(strCaminho,".flo","/html/")
	set ObjFS = server.CreateObject("Scripting.FileSystemObject")
	''response.write "<!-- url:" & server.mappath(strCaminho) & "-->"	
	if ObjFS.FolderExists(server.mappath(strCaminho)) then
		TemHTML5 = strCaminho
			''response.write "<!-- 1 -->"
	else
		TemHTML5 = ""
		''response.write "<!-- 2 -->"
	end if
	set ObjFS = nothing
	end function

	if not 	rsLink.eof then
		response.write TemHTML5(rsLink("strURL"))
	else
		response.write ""
	end if
%>