<!--#include virtual="/include/inc_doctype.asp"-->
<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!-- #include virtual="/login/restrito.asp" -->
<%


testa_acesso(0)

	Response.AddHeader "cache-control", "private"
	Response.AddHeader "pragma", "no-cache"

	strPC = request("strpc_topo")

	if strPC = "" OR  len(strPC) <= 0 then
		response.redirect "/AVA/Mural"
	end if 

	strPC = replace(strPC, "Ã£", "ã")
	strPC = replace(strPC, "Ãƒ", "Ã")
	strPC = replace(strPC, "Ã§", "ç")
	strPC = replace(strPC, "A‡", "Ç")
	strPC = replace(strPC, "Ã¡", "á")
	strPC = replace(strPC, "ÃÂ¡", "á")
	strPC = replace(strPC, "Ãª", "ê")
	strPC = replace(strPC, "AŠ", "ê")
	strPC = replace(strPC, "Ãµ", "õ")
	strPC = replace(strPC, "Ã©", "é")
	strPC = replace(strPC, "ÃÂ©", "é")
	strPC = replace(strPC, "Ã³", "ó")
	strPC = replace(strPC, "Ã“", "ó")
	strPC = replace(strPC, "Ã­", "í")
	strPC = replace(strPC, "Ã­", "í")
	strPC = replace(strPC, "Aº", "ú")
	strPC = replace(strPC, "Ãº", "ú")
	strPC = replace(strPC, "Ãš", "Ú")
	strPC = replace(strPC, "Ã¢", "â")
	strPC = replace(strPC, "ÃÂ¢", "â")
	strPC = replace(strPC, "Ã±", "ñ")	
	strPC = replace(strPC, "Ã´", "ô")	
	strPC = replace(strPC, "Ã‚", "Â")
	strPC = replace(strPC, "Ã‘", "Ñ")	
	strPC = replace(strPC, "Ã”","Ô")
	strPC = replace(strPC, "'", "")
	strPC = replace(strPC, "%C2%83", "")
	strPC = replace(strPC, "Âº","º")
	strPC = replace(strPC, "Âª","ª")
	'A tio
	strPC = replace(strPC, "ÃÂƒ", "Ã")
    strPC = replace(strPC, "ÃÂ£", "ã")
	'o tio
	strPC = replace(strPC, "ÃÂµ", "õ")
    
    



	qtdAspas = Ubound(split(strPC,""""))
	
	if qtdAspas = 2 then
		pTipo = 3	
	else
		pTipo = 1
	end if


	strPC = replace(strPC, """", "")

	if strPC = "" then
		strPC = ""
	end if

	if strPC = "VERBO TO BE" OR strPC = "VERB TO BE" OR strPC = "TO BE" then
		pTipo = 3
	end if		
%>

<html lang="pt-br" xml:lang="pt-br">
	<head>
		<title><!--#include virtual="/include/inc_titulo.asp"--></title>
		<!--#include virtual="/include/frameworkjs.asp"-->
		<link href="http://wwweducacionalcombr2.cdn.educacional.com.br/AVA/StaticContent/Content/TES/css/pesquisa_escolar_3.1.1.css" rel="stylesheet">
		<link rel="stylesheet" href="Content/TES/css/fontface_ava(1).css"> 
<script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script> 
<script>
	
$(function () {

    pal = '<%=strPC%>';
    if (pal == ''){
		pal = $('#strpc_topo').val();
	}				
	
    $('#educ_conteudo').load('/AVA/Pesquisa/', {'ts': new Date().getTime(), 'palavra' : pal, 'tipo' : <%=pTipo%>}, function(){
	$('#fBusca').attr('action','/AVA/pesquisa/pesquisa.asp');
	$('#fBusca').attr('onsubmit','return validaPesqEscolar1()');
	$('#fBusca').attr('accept-charset','');
	$('#fBusca').find('p').remove();
	
	PesquisaSecoes ($(".ph"),$("#boxSecoes"));
	 //aurelio
            //$.post('/pesquisa/snipetAurelio.asp', { 'palavra': palavra }, function (data) {
                //$('.dicio').html(data).hide().fadeIn();


            //});
            //enciclopedia
            //$.post('Home/GetEncs', { 'palavra': palavra }, function (data) {
               //$('.enciclo').html(data).hide().fadeIn();


            //});	

	
   });	
});

function validaPesqEscolar1()
{
	//$('#educ_conteudo').html('');

	tipo = 1;
	if($(".ph").val().replace(/[^\"]/g, '').length == 2){
		tipo = 3;
	}

	pala = $(".ph").val();
	if (pala == ''){
		pala = $('#strpc_topo').val();
	}

	$('#educ_conteudo').load('/AVA/Pesquisa/', {'ts': new Date().getTime(), 'palavra' : pala, 'tipo' : tipo},function(){
			$(".ph").select();
		});
	return false;
}

function abrirInfoGrafico(strURL)
{
	window.open(strURL,'popExplore','width=1024, height=660, resizable=yes, scrollbars=yes');
}

</script>
<%if sessionman.valor("PUBSITE") <> 4 then%>
<script type="text/javascript" src="boxPesquisa.js?4"></script> 
<%else%>
<style type="text/css">
	#midia_suport {
		top: -8px;
	}
</style>
<%end if%>
		<%
			intTab = Request("intTab")
		%>
		
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		
		<%If SessionMan.Valor("intTipoPortal") = 2 Then%>
			<link rel="stylesheet" type="text/css" href="style/style_AB.css" />
		<%Else%>
			<link rel="stylesheet" type="text/css" href="style/style_novo.css" />
		<%End If%>
				
		<link type="text/css" href="css/menu/jquery-ui-1.8.2.custom.css" rel="stylesheet" />
		<style type="text/css">
			#li_item_<%=intLiItem%> a{
				font-weight:bold;
				color:orange !important;
			}
		</style>
		<!--<script type="text/javascript" src="js/jquery/jquery-1.4.2.min.js"></script>-->
		<script type="text/javascript" src="js/jquery/jquery-ui-1.8.2.custom.min.js"></script>
		<script src="Scripts/bootstrap/dropdown.js"></script>
		<script type="text/javascript">
			jQuery(function($)
			{
				// Tabs
				//$('#tabs').tabs({ selected: <%=Int(intTab)%>});
				
				//hover states on the static widgets
				//$('#dialog_link, ul#icons li').hover(
					//function() { $(this).addClass('ui-state-hover'); }, 
					//function() { $(this).removeClass('ui-state-hover'); }
				//);
				//$("#menucategoria").show();
			});
		</script>
		<!--#include virtual="/esc_include/esc_style/esc_style.asp"-->
		<link type="text/css" href="css/menu/jquery-ui-1.8.2.custom.css" rel="stylesheet" />
		
	</head>

	<body>
		<div id="educ_geralexterno">
			<%
			If SessionMan.Valor("intTipoPortal") <> 32 and SessionMan.Valor("intTipoPortal") <> 2048 Then
			%>
				<div id="educ_cabecalho1">
					<!--#include virtual="/include/barrass.asp"-->
					<!--#include virtual="/include/tarja_superior.inc"-->
					<!--#include virtual="/include/tarja_meio.inc"-->
				</div>
			<%
			End If
			%>
			<div id="educ_bgcorpo">
				
				<div id="educ_corpo" class="centraliza_res">

					
					<div id="educ_conteudo">

											
					</div>
				</div>
			</div>
			
			<%
			If SessionMan.Valor("intTipoPortal") <> 32 and SessionMan.Valor("intTipoPortal") <> 2048 Then
			%>
				<!--#include virtual="/include/copyright.asp" -->
			<%
			End If
			%>
		</div>
		
	</body>
</html>

