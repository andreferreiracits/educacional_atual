<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<%
	dim opcoes, urls, ids
	opcoes=""
	urls = ""
	ids =""
	dirbase = "http://www.educacional.com.br"
	
	if request("assunto") <> "" then
		set objFiguras=Server.CreateObject("PublicacaoBLL.clsBancoImagem")
		set recFiguras=objFiguras.SelectFigurasByAssunto(clng(request("assunto")))
		dim cont
		if not (recFiguras.eof and recFiguras.bof) then
			do while not recFiguras.eof
				opcoes = opcoes & "<option>" & recFiguras("strTitulo") & "</option>"
				urls = urls & recFiguras("strURL") & "','"
				ids = ids & recFiguras("IdPublicacao") & ","
				recFiguras.movenext()
			loop
			urls = "var urls= new Array ('" & urls & "');"
			ids = "var ids= new Array (" & ids & "-1);"
		end if
	end if
	
	recFiguras.close
	set recFiguras=nothing
	set objFiguras=nothing
	
	
%>

<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<!-- #include virtual="/esc_include/esc_style/esc_style.asp" -->
<script src="jquery.js"> </script>
<script language = "JavaScript">

    function Visualiza() {
        if (document.frmArquivos.lstArquivos.selectedIndex != -1) {

            $("#formatosDIV").load('tamanhos.asp', { 'idPublicacao': ids[document.frmArquivos.lstArquivos.selectedIndex] });

            document.preview.src = "<%=dirbase%>/" + urls[document.frmArquivos.lstArquivos.selectedIndex];
        }
        else {
            document.preview.src = "branco.gif";
        }
    }

    function retorna() {
        if (document.frmArquivos.lstArquivos.selectedIndex != -1) {
            var x;
            var y;
            if (document.getElementById("tinyAltura"))
                y = document.getElementById("tinyAltura").value;
            else
                y = 0;

            if (document.getElementById("tinyLargura"))
                x = document.getElementById("tinyLargura").value;
            else
                x = 0;

            document.location.href = "pegaarquivo.asp?id=" + ids[document.frmArquivos.lstArquivos.selectedIndex] + "&imgpreview=<%=dirbase%>/" + urls[document.frmArquivos.lstArquivos.selectedIndex] + "&idArquivo=" + $("input[@name='radio" + ids[document.frmArquivos.lstArquivos.selectedIndex] + "']:checked").val() + "&y=" + y + "&x=" + x;
        }
    }


</script>
</head>

<body bgcolor="#FFFFCC" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<form name="frmArquivos" method="post" action="">
  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="00" bgcolor="#FFFFCC" >
    <tr> 
      <td width="9" height="4" align="left"><img src="branco.gif" width="1" height="1"></td>
      <td height="4" align="left" colspan="3"><img src="branco.gif" width="1" height="1"></td>
      <td width="255" height="4"><img src="branco.gif" width="1" height="1"></td>
    </tr>
    <tr> 
      <td width="9" height="147" align="left" rowspan="2">&nbsp;</td>
      <td height="25" align="left" colspan="3"> 
        <div align="left"  class="textopeq">&nbsp;&nbsp;<%=request("descrAssunto")%>:</div>
      </td>
      <td>&nbsp; </td>
    </tr>
    <tr> 
      <td width="39" height="155" align="center" bgcolor="#FFFFCC" valign="middle">&nbsp; 
      </td>
      <td width="252" height="155" align="center" bgcolor="#FFCC00" valign="middle"> 
        <select name="lstArquivos" style="WIDTH: 200px; " size="11" onChange = "Visualiza();">
          <%=opcoes%> 
        </select>
      </td>
	  
      <td width="30" height="155" align="center" bgcolor="#FFFFCC" valign="middle">&nbsp;</td>
      
	  <td width="255" height="147" >
	  	<table>
			<tr>
				<td>&nbsp;<img src="branco.gif" name="preview" width="130" height="136" border="0"></td>
			</tr>
			<tr>
				<td align="center">
					<table cellpadding="0">
						<tr id="formatosDIV">
				
						</tr>
					</table>
				</td>
			</tr>
		</table>
	  </td>
      			
	</tr>
	
  </table>
	<input type="hidden" name="NomeCampo"  value='<%=request("NomeCampo")%>'>
	<input type="hidden" name="NomeForm"  value='<%=request("NomeForm")%>'>
	<input type="hidden" name="NomeFuncao"  value='<%=request("NomeFuncao")%>'>
	

</form>


</body>
</html>


<script language = "JavaScript">
<%=urls%>
<%=ids%>	
</script>

