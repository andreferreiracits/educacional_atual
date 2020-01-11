<!-- #include virtual="/recursos/sessionman/sessionman.asp" -->
<!-- #include virtual="/recursos/spConn/spConn.asp" -->
<%
	response.Charset="ISO-8859-1"
	Response.CodePage = 28591
	response.CacheControl = "no-cache"
	
	PATHPAIS = "file name=D:\Componentes_Educ\KH2002\KHCatalog.udl"	                	     
	PATH = "file name=D:\Componentes\educacional_otimizado.udl"           
	
	spName = "educacionalOtimizado.dbo.spPesquisa_PesquisaLogradouros"	
	spNameLocal = "KHCatalog.dbo.spKH_SelectLocalByNome"
	
	strLocal = request("palavra")
	if strLocal  = "BRASIL (República Federativa do)" then
		strLocal   = "BRASIL"
	end if
	

	if strLocal = "" then
		strLocal = "itália"
	end if

	intMaps = 0
	
	'Artificio pq estava dando as coordenadas fora do centro de Brasília
	If UCASE(strLocal) = "BRASILIA" Then 
		strLocal = "Brasília"
	End If
	
	If Len(strLocal) > 0 Then
								
		set rsLocais = spConnRS(spName, PATH, Array(Array("strLocal", strLocal, 100), Array("intTipo", 1, 4)))		
		
		If rsLocais.EOF Then
			bolMapa = False
			bolEncontrado = False
			strResposta = "Nenhum local encontrado."
			intZoom = 5
		Else					
			strLocalExibicao = rsLocais("strTitulo")	
			
			Set rsLocalPais = spConnRS(spNameLocal, PATH, Array(Array("strLocal", strLocal, 100)))
			
			
			If not rsLocalPais.EOF Then							
				
				'While not rsLocalPais.EOF	
					Select Case rsLocalPais("IdLocalTipo")
						Case 1: 'Municipio
							intZoom = 10
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
	set objListaGmaps  = spConnRS_Cache(20,spGmaps, PATH, _
	Array(Array("strPalavraChaveAux", strLocal, 255)))	
	
%>
<%


	
%>
<!--#include virtual="/include/frameworkjs.asp"-->
<script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script> 



<script type="text/javascript">
$(function(){	
	
		initialize_gooogleMaps()
	
		
	
	

});

function remove(){
	window.parent.$('.googlem').hide();
}

function initialize_gooogleMaps() {	

	
			
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
		marker.setMap(map);
		
		
		

	  } else {
	    //alert("Geocode was not successful for the following reason: " + status);
		//)
		//setTimeout("$('iframe').remove()",1000);
		remove();		
	  }
	});
}



</script>


		
                <div id="map_canvas" style="width: 280px; height: 200px;"></div>

                
                     
            
            
		  

	



