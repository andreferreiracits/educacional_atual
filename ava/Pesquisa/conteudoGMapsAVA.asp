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
	if strLocal = "BRASIL (Rep�blica Federativa do)" then
		strLocal = "BRASIL"
	end if

	if strLocal = "HOMEM (Museu do)" then
		strLocal = "museu"
	end if
	if strLocal = "CAPARA� (Parque Nacional de)" then
		strLocal = "parque"
	end if

	if strLocal = "ESTADOS UNIDOS DA AM�RICA (E.U.A.)" then
		strLocal = "ESTADOS UNIDOS"
	end if
	
	'response.write strLocal
	intMaps = 0
	
	'Artificio pq estava dando as coordenadas fora do centro de Bras�lia
	If UCASE(strLocal) = "BRASILIA" Then 
		strLocal = "Bras�lia"
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
						Case 3:	'Regi�o do Brasil
							intZoom = 5	
						Case 4:	'Pa�s
							intZoom = 3
						Case 5:	'Micro Regi�o
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
'		strLocal = replace(strLocal, "�", "%C0")
'		strLocal = replace(strLocal, "�", "%C1")
'		strLocal = replace(strLocal, "�", "%C2")
'		strLocal = replace(strLocal, "�", "%C3")
'		strLocal = replace(strLocal, "�", "%C4")
'		strLocal = replace(strLocal, "�", "%C5")
'		strLocal = replace(strLocal, "�", "%C6")
'		strLocal = replace(strLocal, "�", "%C7")
'		strLocal = replace(strLocal, "�", "%C8")
'		strLocal = replace(strLocal, "�", "%C9")
'		strLocal = replace(strLocal, "�", "%CA")
'		strLocal = replace(strLocal, "�", "%CB")
'		strLocal = replace(strLocal, "�", "%CC")
'		strLocal = replace(strLocal, "�", "%CD")
'		strLocal = replace(strLocal, "�", "%CE")
'		strLocal = replace(strLocal, "�", "%CF")
'		strLocal = replace(strLocal, "�", "%D0")
'		strLocal = replace(strLocal, "�", "%D1")
'		strLocal = replace(strLocal, "�", "%D2")
'		strLocal = replace(strLocal, "�", "%D3")
'		strLocal = replace(strLocal, "�", "%D4")
'		strLocal = replace(strLocal, "�", "%D5")
'		strLocal = replace(strLocal, "�", "%D6")
'		strLocal = replace(strLocal, "�", "%D8")
'		strLocal = replace(strLocal, "�", "%D9")
'		strLocal = replace(strLocal, "�", "%DA")
'		strLocal = replace(strLocal, "�", "%DB")
'		strLocal = replace(strLocal, "�", "%DC")
'		strLocal = replace(strLocal, "�", "%DD")
'		strLocal = replace(strLocal, "�", "%DE")
'		strLocal = replace(strLocal, "�", "%DF")
'		strLocal = replace(strLocal, "�", "%E0")
'		strLocal = replace(strLocal, "�", "%E1")
'		strLocal = replace(strLocal, "�", "%E2")
'		strLocal = replace(strLocal, "�", "%E3")
'		strLocal = replace(strLocal, "�", "%E4")
'		strLocal = replace(strLocal, "�", "%E5")
'		strLocal = replace(strLocal, "�", "%E6")
'		strLocal = replace(strLocal, "�", "%E7")
'		strLocal = replace(strLocal, "�", "%E8")
'		strLocal = replace(strLocal, "�", "%E9")
'		strLocal = replace(strLocal, "�", "%EA")
'		strLocal = replace(strLocal, "�", "%EB")
'		strLocal = replace(strLocal, "�", "%EC")
'		strLocal = replace(strLocal, "�", "%ED")
'		strLocal = replace(strLocal, "�", "%EE")
'		strLocal = replace(strLocal, "�", "%EF")
'		strLocal = replace(strLocal, "�", "%F0")
'		strLocal = replace(strLocal, "�", "%F1")
'		strLocal = replace(strLocal, "�", "%F2")
'		strLocal = replace(strLocal, "�", "%F3")
'		strLocal = replace(strLocal, "�", "%F4")
'		strLocal = replace(strLocal, "�", "%F5")
'		strLocal = replace(strLocal, "�", "%F6")
'		strLocal = replace(strLocal, "�", "%F7")
'		strLocal = replace(strLocal, "�", "%F8")
'		strLocal = replace(strLocal, "�", "%F9")
'		strLocal = replace(strLocal, "�", "%FA")
'		strLocal = replace(strLocal, "�", "%FB")
'		strLocal = replace(strLocal, "�", "%FC")
'		strLocal = replace(strLocal, "�", "%FD")
'		strLocal = replace(strLocal, "�", "%FE")
'		strLocal = replace(strLocal, "�", "%FF")
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



