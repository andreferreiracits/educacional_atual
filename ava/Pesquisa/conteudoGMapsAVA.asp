<!-- #include virtual="/recursos/sessionman/sessionman.asp" -->
<!-- #include virtual="/recursos/spConn/spConn.asp" -->
<script src="http://wwweducacionalcombr1.cdn.educacional.com.br/AVA/StaticContent/Common/jquery-ui-1.8.2.custom/development-bundle/jquery-1.7.js" type="text/javascript"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script>  
<%
	response.Charset="ISO-8859-1"
	Response.CodePage = 28591
	response.CacheControl = "no-cache"
	
	PATHPAIS = "file name=D:\Componentes_Educ\KH2002\KHCatalog.udl"	                	     
	PATH = "file name=D:\Componentes\educacional_otimizado.udl"           
	
	spName = "educacionalOtimizado.dbo.spPesquisa_PesquisaLogradouros"	
	spNameLocal = "KHCatalog.dbo.spKH_SelectLocalByNome"
	
	strLocal = request("palavra")
	if strLocal = "FRANK (Anne)" then
		strLocal = "Anne Frank"
	end if
	if strLocal = "BRASIL (República Federativa do)" then
		strLocal = "BRASIL"
	end if

	if strLocal = "HOMEM (Museu do)" then
		strLocal = "museu"
	end if
	if strLocal = "CAPARAÓ (Parque Nacional de)" then
		strLocal = "parque"
	end if

	if strLocal = "ESTADOS UNIDOS DA AMÉRICA (E.U.A.)" then
		strLocal = "ESTADOS UNIDOS"
	end if
	
	'response.write strLocal
	intMaps = 0
	
	'Artificio pq estava dando as coordenadas fora do centro de Brasília
	If UCASE(strLocal) = "BRASILIA" Then 
		strLocal = "Brasília"
	End If
	


	If Len(strLocal) > 0 Then
								
		set rsLocais = spConnRS(spName, PATH, Array(Array("strLocal", strLocal, 100), Array("intTipo", 3, 4)))		
		
		If rsLocais.EOF Then
			bolMapa = False
			bolEncontrado = False
			strResposta = "Nenhum local encontrado."
			intZoom = 0
		Else					
			strLocalExibicao = rsLocais("strTitulo")	
			
			Set rsLocalPais = spConnRS(spNameLocal, PATHPAIS, Array(Array("strLocal", strLocal, 100)))	
			If not rsLocalPais.EOF Then							
				
				'While not rsLocalPais.EOF	
					Select Case rsLocalPais("IdLocalTipo")
						Case 1: 'Municipio
							intZoom = 14
						Case 2:	'UF
							intZoom = 6
						Case 3:	'Região do Brasil
							intZoom = 5	
						Case 4:	'País
							intZoom = 3
						Case 5:	'Micro Região
							intZoom = 6
						Case 6:	'Continente
							intZoom = 2
						Case 7:	'Planeta
							intZoom = 1						
					End Select
					
					
				'	rsLocalPais.MoveNext					
				'Wend
			Else
				intZoom = 5
			End If
			
			bolMapa = True
			bolEncontrado = True
				
		End If
	Else
		bolMapa = False
		bolEncontrado = False
		strResposta = "Nenhum local encontrado."
		intZoom = 0
	End If

	'fim Google Maps

	spGmaps = "spPublicacao_SelectGmaps"
	set objListaGmaps  = spConnRS(spGmaps, PATH, _
	Array(Array("strPalavraChaveAux", strLocal, 255)))
'response.write strLocal

	
%>
<%
'if true then		
'		strLocal = replace(strLocal, " ", "%20")
'		strLocal = replace(strLocal, "À", "%C0")
'		strLocal = replace(strLocal, "Á", "%C1")
'		strLocal = replace(strLocal, "Â", "%C2")
'		strLocal = replace(strLocal, "Ã", "%C3")
'		strLocal = replace(strLocal, "Ä", "%C4")
'		strLocal = replace(strLocal, "Å", "%C5")
'		strLocal = replace(strLocal, "Æ", "%C6")
'		strLocal = replace(strLocal, "Ç", "%C7")
'		strLocal = replace(strLocal, "È", "%C8")
'		strLocal = replace(strLocal, "É", "%C9")
'		strLocal = replace(strLocal, "Ê", "%CA")
'		strLocal = replace(strLocal, "Ë", "%CB")
'		strLocal = replace(strLocal, "Ì", "%CC")
'		strLocal = replace(strLocal, "Í", "%CD")
'		strLocal = replace(strLocal, "Î", "%CE")
'		strLocal = replace(strLocal, "Ï", "%CF")
'		strLocal = replace(strLocal, "Ð", "%D0")
'		strLocal = replace(strLocal, "Ñ", "%D1")
'		strLocal = replace(strLocal, "Ò", "%D2")
'		strLocal = replace(strLocal, "Ó", "%D3")
'		strLocal = replace(strLocal, "Ô", "%D4")
'		strLocal = replace(strLocal, "Õ", "%D5")
'		strLocal = replace(strLocal, "Ö", "%D6")
'		strLocal = replace(strLocal, "Ø", "%D8")
'		strLocal = replace(strLocal, "Ù", "%D9")
'		strLocal = replace(strLocal, "Ú", "%DA")
'		strLocal = replace(strLocal, "Û", "%DB")
'		strLocal = replace(strLocal, "Ü", "%DC")
'		strLocal = replace(strLocal, "Ý", "%DD")
'		strLocal = replace(strLocal, "Þ", "%DE")
'		strLocal = replace(strLocal, "ß", "%DF")
'		strLocal = replace(strLocal, "à", "%E0")
'		strLocal = replace(strLocal, "á", "%E1")
'		strLocal = replace(strLocal, "â", "%E2")
'		strLocal = replace(strLocal, "ã", "%E3")
'		strLocal = replace(strLocal, "ä", "%E4")
'		strLocal = replace(strLocal, "å", "%E5")
'		strLocal = replace(strLocal, "æ", "%E6")
'		strLocal = replace(strLocal, "ç", "%E7")
'		strLocal = replace(strLocal, "è", "%E8")
'		strLocal = replace(strLocal, "é", "%E9")
'		strLocal = replace(strLocal, "ê", "%EA")
'		strLocal = replace(strLocal, "ë", "%EB")
'		strLocal = replace(strLocal, "ì", "%EC")
'		strLocal = replace(strLocal, "í", "%ED")
'		strLocal = replace(strLocal, "î", "%EE")
'		strLocal = replace(strLocal, "ï", "%EF")
'		strLocal = replace(strLocal, "ð", "%F0")
'		strLocal = replace(strLocal, "ñ", "%F1")
'		strLocal = replace(strLocal, "ò", "%F2")
'		strLocal = replace(strLocal, "ó", "%F3")
'		strLocal = replace(strLocal, "ô", "%F4")
'		strLocal = replace(strLocal, "õ", "%F5")
'		strLocal = replace(strLocal, "ö", "%F6")
'		strLocal = replace(strLocal, "÷", "%F7")
'		strLocal = replace(strLocal, "ø", "%F8")
'		strLocal = replace(strLocal, "ù", "%F9")
'		strLocal = replace(strLocal, "ú", "%FA")
'		strLocal = replace(strLocal, "û", "%FB")
'		strLocal = replace(strLocal, "ü", "%FC")
'		strLocal = replace(strLocal, "ý", "%FD")
'		strLocal = replace(strLocal, "þ", "%FE")
'		strLocal = replace(strLocal, "ÿ", "%FF")
'end if

	
%>
<!-- nao sendo usado 
<script type="text/javascript" src="js/jcarouselYouTube.js"></script>
<script type="text/javascript" src="js/jquery.superlightbox_gmaps.js"></script>-->

<script type="text/javascript">
$(function(){	
	var bolMapa = "<%=bolMapa%>"
	
	if(bolMapa == "True"){
		initialize_gooogleMaps()
	}else{
		trocaGmap(1);
	}
		
	
	
	//$('#amplia_mapa').click(function(e){e.preventDefault()}).superlightbox({ajax : {ativo : true, pagina : 'MostraMapaAmpliado.asp?idPub='+ $('#amplia_mapa').attr('rel') +'&ts=<%=timer%>'},fechar : 'imagens/novas/bt_fechar.gif',borda : 'solid 3px #F8E3C6', altura : '552', largura : '552'});
	
/*	$('#amplia_mapa').click(function(e){
		e.preventDefault();
		
		//fecha o lightbox
		$('div.overlaylb').each(function(){
			$temp = $(this).attr('id');
			var iLen = String($temp).length;
			$indice = (String($temp).substring(iLen, iLen - 1));
			
			$('#superlb'+$indice).html('');
			$('#superlb'+$indice).fadeOut();
			$('#overlaylb'+$indice).remove();	
		});		
		
		$(this)..superlightbox({ajax : {ativo : true, pagina : 'MostraMapaAmpliado.asp?idPub='+ $('#amplia_mapa').attr('rel') +'&ts=<%'=timer%>'},fechar : 'imagens/novas/bt_fechar.gif',borda : 'solid 3px #F8E3C6', altura : '552', largura : '552'});
	});*/

});


/*function initialize_gooogleMaps() {		
  if (GBrowserIsCompatible()) {
	var map = new GMap2(document.getElementById("map_canvas"));
	geocoder = new GClientGeocoder();
	geocoder.getLatLng("<%=strLocal%>", function(point){
		map.setCenter(point, <%=intZoom%>);
		map.setUIToDefault();
	}); 
  }
}
*/
function initialize_gooogleMaps() {	
  //alert('oi');
  //if (GBrowserIsCompatible()) {
	/*var map = new GMap2(document.getElementById("map_canvas"));
	geocoder = new GClientGeocoder();
	geocoder.getLatLng("<%=strLocal%>", function(point){
		map.setCenter(point, 6);
		map.setUIToDefault();
	}); 
	*/
			
	geocoder = new google.maps.Geocoder();
	
	var address = '<%=strLocal%>';	
	geocoder.geocode( { 'address': address}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		var myOptions = {
		  zoom: <%=intZoom%>,
		  center: results[0].geometry.location,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);	    
	    var marker = new google.maps.Marker({
	        map: map, 
	        position: results[0].geometry.location
	    });
	  } else {
	    //alert("Geocode was not successful for the following reason: " + status);
		remove();
	  }
	});
}

function trocaGmap(intMapa, idPub){

	var $_iframe = "<iframe width='270' height='200' frameborder='0' src='" + $('#url_mapa'+intMapa).html() + "'></iframe>";
	$('#map_canvas').html($_iframe);
	
	$('#titulo_mapa').text($('#tit_mapa'+intMapa).text());
	

	$('#amplia_mapa').attr('rel', idPub);
	//alert($('#amplia_mapa').attr('rel'));
}

function voltaGmap(idPub){
	initialize_gooogleMaps();
	$('#titulo_mapa').text("<%=strLocalExibicao%>");

	$('#amplia_mapa').attr('rel', idPub);
	//alert($('#amplia_mapa').attr('rel'));
}

function ampliaMapa(){
	//fecha o lightbox
	$('div.overlaylb').each(function(){
		$temp = $(this).attr('id');
		var iLen = String($temp).length;
		$indice = (String($temp).substring(iLen, iLen - 1));
				
		$('#superlb'+$indice).html('');
		$('#superlb'+$indice).remove();
		$('#overlaylb'+$indice).remove();	
	});		
	
	$('#amplia_mapa').superlightbox_stand({ajax : {ativo : true, pagina : 'MostraMapaAmpliado.asp?idPub='+ $('#amplia_mapa').attr('rel') +'&ts=<%=timer%>'},fechar : 'imagens/novas/bt_fechar.gif',borda : 'solid 3px #F8E3C6', altura : '552', largura : '552'});
}

function remove(){
	window.parent.$('.googlem').hide();
}

</script>


	<%If bolEncontrado or objListaGmaps.RecordCount > 0 Then
	%> 
		
                <%'If bolMapa Then%>
                <div id="map_canvas" style="width: 270px; height: 180px; margin-top:15px; margin:auto;"></div>
                <%'End If%>
                
                <%
			
			If not objListaGmaps.EOF Then
					intMaps = 1
					While not objListaGmaps.EOF
				%> 
					<div id="mapa<%=intMaps%>" style=" position:relative; margin-left:0; margin-top:0; width:580px; height:380px; display:none;"> 													                                                  																								
						<div class="tit_mapa" id="tit_mapa<%=intMaps%>"><%=objListaGmaps("strTitulo")%></div>
						<div id="url_mapa<%=intMaps%>"><%=objListaGmaps("strURL")%></div>
					</div>
				<%
						intMaps = intMaps + 1
						objListaGmaps.MoveNext													
					Wend
					objListaGmaps.MoveFirst				
				End If
				%>            
            </div>
            
                
					
						<%If bolMapa and intMaps > 0 Then %>
						<%
							strLocalExibicaot = strLocalExibicao
							if len(strLocalExibicao) > 5 then
								strLocalExibicao = left(strLocalExibicao,5)&"..."
							end if
						%>
					        <div style="font-size:10px;padding-rigt:3px;display:inline;font-family:verdana;"><a href="#" onClick="voltaGmap('0'); return false;" title="<%=strLocalExibicaot%>"><%=strLocalExibicao%></a></div>
					    <%End If%>
					    <%If not objListaGmaps.EOF Then
							intMaps = 1
							While not objListaGmaps.EOF
								
								strLocalExibicaot = objListaGmaps("strTitulo")
							if len(objListaGmaps("strTitulo")) > 5 then
								strLocalExibicaot = left(objListaGmaps("strTitulo"),5)&"..."
							end if	
							
						%> 
								<div style="font-size:10px;padding-rigt:3px;display:inline;font-family:verdana;"><a href="#" onClick="trocaGmap('<%=intMaps%>', '<%=objListaGmaps("idPublicacao")%>');  return false;" title="<%=objListaGmaps("strTitulo")%>"><%=strLocalExibicaot%></a></div>
						<%
								intMaps = intMaps + 1
								objListaGmaps.MoveNext													
							Wend
						End If
					%>   
		    

	<%End If
	%>	



