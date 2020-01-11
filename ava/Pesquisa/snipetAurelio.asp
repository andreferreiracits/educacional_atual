<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<%



strPC = "CHINA"
dim strRetPesqAurelio


' <RESULTADOS DO AURÉLIO>
'	- verifica se foi selecionada a categoria do Aurélio 
'	- verifica se á a página 1
'   - verifica se extem outros resultados. 
'	- executa a pesquisa no aurélio
'	- se possui resultados incui o resultado e o cabeçalho da lista
function obtemResultadosAurelio(strRetPesqAurelio)
	strRetPesqAurelio=""
	dim objAurelioPesquisa
	dim strBuscasAurelio		'usada para separar em várias buscas
	dim contPalavrasAurelio		' conta o número de buscas realizadas
	dim totalPalavrasEncontradas ' acumula o total de palavras 
		
	'if bConsultaAurelio AND intPag = 1 and intTotalRegistros <> -1 then	
		' cria o objeto
		set objAurelioPesquisa = CreateObject("AurelioPesquisa.cPesquisa")
		
		' separa as palavras em um array
		if intRadTipo=2 then
			strBuscasAurelio = split(strPC," ")
		else
			strBuscasAurelio = array(strPC) ' se existe apenas uma palavra coloca ela na posicão 0 do Array
		end if
		
		'Inicializa as variaveis utilizadas
		strRetPesqAurelio = ""
		contPalavrasAurelio = 0
		totalPalavrasEncontradas = 0
		

		strAurelioInicioTabelaP1 = "|iniciotbl|" 
		strAurelioFimTabelaP1 = "|fimtbl|"
		
		'Executa a pesquisa
		do while contPalavrasAurelio <= ubound(strBuscasAurelio)
			strRetPesqAurelio =  strRetPesqAurelio & objAurelioPesquisa.PesquisaVerbete(strBuscasAurelio(contPalavrasAurelio),CONST_NUMREGAURELIO) '(string as ser pesquisada, número de resultados)
			strRetPesqAurelio = strAurelioInicioTabelaP1 & strRetPesqAurelio & strAurelioFimTabelaP1
			totalPalavrasEncontradas = totalPalavrasEncontradas + objAurelioPesquisa.NumResultadosPesquisa()
			contPalavrasAurelio = contPalavrasAurelio + 1
		loop
		 
		obtemResultadosAurelio = totalPalavrasEncontradas
	'end if
end function



function verResAurelio(palavra)
	
	dim objAurelioPesquisa
	dim strBuscasAurelio		'usada para separar em várias buscas
	dim contPalavrasAurelio		' conta o número de buscas realizadas
	dim totalPalavrasEncontradas ' acumula o total de palavras 
		
	if bConsultaAurelio AND intPag = 1 and intTotalRegistros <> -1 then	
		' cria o objeto
		set objAurelioPesquisa = CreateObject("AurelioPesquisa.cPesquisa")
		
		
			strBuscasAurelio = array(palavra) ' se existe apenas uma palavra coloca ela na posicão 0 do Array
		
		
		'Inicializa as variaveis utilizadas
		strRetPesqAurelio = ""
		contPalavrasAurelio = 0
		totalPalavrasEncontradas = 0
		

		strAurelioInicioTabelaP1 = "|iniciotbl|" 
		strAurelioFimTabelaP1 = "|fimtbl|"
		
		'Executa a pesquisa
		do while contPalavrasAurelio <= ubound(strBuscasAurelio)
			strRetPesqAurelio =  strRetPesqAurelio & objAurelioPesquisa.PesquisaVerbete(strBuscasAurelio(contPalavrasAurelio),CONST_NUMREGAURELIO) '(string as ser pesquisada, número de resultados)
			strRetPesqAurelio = strAurelioInicioTabelaP1 & strRetPesqAurelio & strAurelioFimTabelaP1
			totalPalavrasEncontradas = totalPalavrasEncontradas + objAurelioPesquisa.NumResultadosPesquisa()
			contPalavrasAurelio = contPalavrasAurelio + 1
		loop
		 
		verResAurelio = totalPalavrasEncontradas
	end if
end function



intTotalRegistrosAurelio = obtemResultadosAurelio(strRetPesqAurelio)

%>
<h4 class="din">Dicionário Aurélio</h4><div class="titulo_p_stats"><a class="btn_cinza avaML5" href="#"><%=intTotalRegistrosAurelio%> verbetes</a></div>
 <div class="verbete">
<p>
               <!--h5> <a href="#"><b><%=strPC%></b></a></h5-->
		

		<%

							    strRetPesqAurelio = replace(strRetPesqAurelio,"""","")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"<br>","|#|")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"<span id=D_TITULO>","|$|")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"</span>","|$$|")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"<a","|@|")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"</a>","|@@|")
    
                                                            strRetPesqAurelio = strRetPesqAurelio
    
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"|iniciotbl|","")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"|#|","<br>")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"|@|",strAurelioFimTabela&""&strAurelioInicioTabela&"<a TARGET='_blank'")
                                                            'strRetPesqAurelio = replace(strRetPesqAurelio,"|$|",strAurelioFimTabela&""&strAurelioInicioTabela&"<strong>")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"|$|","<span style='color:#0C00D5; font-size:14px;'>")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"|$$|","</span>")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"|@@|","</a>")
                                                            strRetPesqAurelio = replace(strRetPesqAurelio,"|fimtbl|","")
							    
                                                            Response.Write strRetPesqAurelio		

		%>
		

</p>
</div>                
 