<!--#include virtual="/include/inc_doctype.asp"-->
<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<%
	strPC = request("strpc_topo")
	if strPC = "" then
		strPC = "brasil"
	end if	
%>

<html lang="pt-br" xml:lang="pt-br">
	<head>
		<title><!--#include virtual="/include/inc_titulo.asp"--></title>
		<!--#include virtual="/include/frameworkjs.asp"-->
<script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script> 
<script>
$(function () {
   $('#educ_conteudo').load('/AVA/Pesquisa/', {'ts': new Date().getTime(), 'palavra' : '<%=strPC%>'}, function(){
	$('#fBusca').attr('action','/ava/pesquisa/pesquisa.asp');
	$('#fBusca').attr('accept-charset','');
	
	 //aurelio
            //$.post('/pesquisa/snipetAurelio.asp', { 'palavra': palavra }, function (data) {
                //$('.dicio').html(data).hide().fadeIn();


            //});
            //enciclopedia
            //$.post('Home/GetEncs', { 'palavra': palavra }, function (data) {
                //$('.enciclo').html(data).hide().fadeIn();


            //});	


		
			PesquisaSecoes ($(".ph"),$("#boxSecoes"));


	
   });	
});

</script>

<script type="text/javascript" src="boxPesquisa.js"></script> 
<style>

	#boxSecoes .selecover {
		background: #AAA;
	}	

</style>

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
				<div id="educ_cabecalho">
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

