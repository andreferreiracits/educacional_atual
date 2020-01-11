<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<%

idPublicacao = Request("idPublicacao")

checked = false

set objFiguras = Server.CreateObject ("PublicacaoBLL.clsBancoImagem")
set recFiguras = objFiguras.SelectById(idPublicacao)

set objArquivos=server.CreateObject("PublicacaoBLL.clsPublicacaoArquivo")
set recArquivos=objArquivos.SelectByPublicacao(idPublicacao)

if not recArquivos.EOF then

	while not recArquivos.EOF
	  if recArquivos("idFormato") <> 194 and recArquivos("idFormato") <> 196  then 
	   if not isnull(recArquivos("intResolucaoH")) and (recArquivos("intResolucaoH")) = cint(72)  then
		if recArquivos("idFormato")=140 then strTipoArq="JPG"
		if recArquivos("idFormato")=139 then strTipoArq="GIF"
		if recArquivos("idFormato")=194 then strTipoArq="SWF"
		if recArquivos("idFormato")=195 then strTipoArq="BMP"
		if recArquivos("idFormato")=196 then strTipoArq="CDR"
		if isnull(recArquivos("intLargura")) or isnull(recArquivos("intAltura")) then
			intLarg=700
			intAlt=500
			strTamanhoArquivo="&nbsp;"
			strResolucao="&nbsp;"
		else
			if recArquivos("intLargura") > 700 then intLarg=700 else intLarg=recArquivos("intLargura") + 40
			if recArquivos("intAltura") > 500 then intAlt=500 else intAlt=recArquivos("intAltura") + 40
			strTamanhoArquivo=CStr(recArquivos("intTamanhoArq")) + "Kb"
		end if
		if strTipoArq <> "CDR" then 'and strTipoArq <> "SWF" then
			if strTipoArq <> "SWF" then 
				strResolucao="" + CStr(recArquivos("intResolucaoH")) + "dpi" 
				strLinkTabajara="&swf=0"
			else 
				strResolucao=""
				strLinkTabajara="&swf=1"
			end if
			
			checked = true
		%>
		<td align="center"><b><font class="textompeq" color="#CCCCCC" style="padding-right:5px;">
		<input type="radio"  name="radio<%=idPublicacao%>" value="<%=recArquivos("idArquivo")%>" checked></br>
		<font color="#3789A8" class="textompeq" style="font-family:verdana;font-size:10px;"><%=strResolucao%></font>
		</td>  
		<%
		
		end if	
	 end if
	 end if
	 recArquivos.MoveNext
	wend
	recArquivos.MoveFirst
	


	end if
	if not recArquivos.EOF then

	while not recArquivos.EOF
	  if recArquivos("idFormato") <> 194 and recArquivos("idFormato") <> 196  then 
	   if not isnull(recArquivos("intResolucaoH")) and (recArquivos("intResolucaoH")) = cint(150)  then
		if recArquivos("idFormato")=140 then strTipoArq="JPG"
		if recArquivos("idFormato")=139 then strTipoArq="GIF"
		if recArquivos("idFormato")=194 then strTipoArq="SWF"
		if recArquivos("idFormato")=195 then strTipoArq="BMP"
		if recArquivos("idFormato")=196 then strTipoArq="CDR"
		if isnull(recArquivos("intLargura")) or isnull(recArquivos("intAltura")) then
			intLarg=700
			intAlt=500
			strTamanhoArquivo="&nbsp;"
			strResolucao="&nbsp;"
		else
			if recArquivos("intLargura") > 700 then intLarg=700 else intLarg=recArquivos("intLargura") + 40
			if recArquivos("intAltura") > 500 then intAlt=500 else intAlt=recArquivos("intAltura") + 40
			strTamanhoArquivo=CStr(recArquivos("intTamanhoArq")) + "Kb"
		end if
		if strTipoArq <> "CDR" then 'and strTipoArq <> "SWF" then
			if strTipoArq <> "SWF" then 
				strResolucao="" + CStr(recArquivos("intResolucaoH")) + "dpi" 
				strLinkTabajara="&swf=0"
			else 
				strResolucao=""
				strLinkTabajara="&swf=1"
			end if
		%>
		<td align="center"><b><font class="textompeq" color="#CCCCCC" style="padding-right:5px;">
		<input type="radio"  name="radio<%=idPublicacao%>" value="<%=recArquivos("idArquivo")%>" <%if not checked then%> checked <%end if%>></br>
		<font color="#3789A8" class="textompeq" style="font-family:verdana;font-size:10px;"><%=strResolucao%></font>
		</td>  
		<%
			checked = true
		end if	
	 end if
	 end if
	 recArquivos.MoveNext
	wend
	recArquivos.MoveFirst
	


	end if
	if not recArquivos.EOF then

	while not recArquivos.EOF
	  if recArquivos("idFormato") <> 194 and recArquivos("idFormato") <> 196  then 
	   if not isnull(recArquivos("intResolucaoH")) and (recArquivos("intResolucaoH")) = cint(300)  then
		if recArquivos("idFormato")=140 then strTipoArq="JPG"
		if recArquivos("idFormato")=139 then strTipoArq="GIF"
		if recArquivos("idFormato")=194 then strTipoArq="SWF"
		if recArquivos("idFormato")=195 then strTipoArq="BMP"
		if recArquivos("idFormato")=196 then strTipoArq="CDR"
		if isnull(recArquivos("intLargura")) or isnull(recArquivos("intAltura")) then
			intLarg=700
			intAlt=500
			strTamanhoArquivo="&nbsp;"
			strResolucao="&nbsp;"
		else
			if recArquivos("intLargura") > 700 then intLarg=700 else intLarg=recArquivos("intLargura") + 40
			if recArquivos("intAltura") > 500 then intAlt=500 else intAlt=recArquivos("intAltura") + 40
			strTamanhoArquivo=CStr(recArquivos("intTamanhoArq")) + "Kb"
		end if
		if strTipoArq <> "CDR" then 'and strTipoArq <> "SWF" then
			if strTipoArq <> "SWF" then 
				strResolucao="" + CStr(recArquivos("intResolucaoH")) + "dpi" 
				strLinkTabajara="&swf=0"
			else 
				strResolucao=""
				strLinkTabajara="&swf=1"
			end if
		%>
		<td align="center"><b><font class="textompeq" color="#CCCCCC" style="padding-right:5px;">
		<input type="radio"  name="radio<%=idPublicacao%>" value="<%=recArquivos("idArquivo")%>" <%if not checked then%> checked <%end if%>></br>
		
		  <font color="#3789A8" class="textompeq" style="font-family:verdana;font-size:10px;"><%=strResolucao%></font>
		</td>  
		<%
			checked = true
		end if	
	 end if
	 end if
	 recArquivos.MoveNext
	wend
	recArquivos.MoveFirst
	
	'flash gordon
	if not recArquivos.EOF and sessionman.valor("intTipoPortal") <> 4 then

	while not recArquivos.EOF
	  if recArquivos("idFormato") = 194 or recArquivos("idFormato") = 196  then 
	  
		if recArquivos("idFormato")=140 then strTipoArq="JPG"
		if recArquivos("idFormato")=139 then strTipoArq="GIF"
		if recArquivos("idFormato")=194 then strTipoArq="SWF"
		if recArquivos("idFormato")=195 then strTipoArq="BMP"
		if recArquivos("idFormato")=196 then strTipoArq="CDR"
		if isnull(recArquivos("intLargura")) or isnull(recArquivos("intAltura")) then
			intLarg=700
			intAlt=500
			strTamanhoArquivo="&nbsp;"
			strResolucao="&nbsp;"
		else
			if recArquivos("intLargura") > 700 then intLarg=700 else intLarg=recArquivos("intLargura")
			if recArquivos("intAltura") > 500 then intAlt=500 else intAlt=recArquivos("intAltura")
			strTamanhoArquivo=CStr(recArquivos("intTamanhoArq")) + "Kb"
		end if
		if strTipoArq <> "CDR" then 'and strTipoArq <> "SWF" then
			if strTipoArq <> "SWF" then 
				strResolucao="" + CStr(recArquivos("intResolucaoH")) + "dpi" 
				strLinkTabajara="&swf=0"
			else 
				strResolucao=""
				strLinkTabajara="&swf=1"
			end if
		%>
		<td align="center"><b><font class="textompeq" color="#CCCCCC" style="padding-right:5px;">
		<input type="radio"  name="radio<%=idPublicacao%>" value="<%=recArquivos("idArquivo")%>" <%if not checked then%> checked <%end if%>></br>
		<font color="#3789A8" class="textompeq" style="font-family:verdana;font-size:10px;"><%="SWF"%></font>
		<input type="hidden" value="<%=intLarg%>" id="tinyLargura">
		<input type="hidden" value="<%=intAlt%>" id="tinyAltura">
		</td>  
		<%
			checked = true
		end if	
	 
	 end if
	 recArquivos.MoveNext
	wend
	recArquivos.MoveFirst
	


	end if
	


	end if

	%>