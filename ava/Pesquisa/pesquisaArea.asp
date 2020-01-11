<!--#include virtual="/include/inc_doctype.asp"-->
<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<!--#include virtual="/login/restrito.asp" -->
<%


testa_acesso(0)

	Response.AddHeader "cache-control", "private"
	Response.AddHeader "pragma", "no-cache"
	id = request("id")
    if len(id) <= 0 or isNull(id) or not isNumeric(id) then
        id = 28
    end if
    pg= request("pg")
    if len(pg) <= 0 or isNull(pg) or not isNumeric(pg) then
        pg = 1
    end if
%>

<script type="text/javascript">

    //Botao de navegacao
    function trocaPagina(strPagina, oBloco, bloco, intPagina, origem) {
        AreaCon(strPagina + '&intpagatual=' + intPagina);
    }

    function AreaCon(cam) {
        $('#resultados_col').html('<div class="bl_p"><img src="Imagens/ajax-loader.gif"></div>');
        $.ajax({
            type: 'POST',
            url: '/pesquisa/' + cam,
            data: { 'ts': new Date().getTime() },
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function (data) {
                $('#resultados_col').html('').append(data).hide().fadeIn();
                $('#Macros, #migalhas').find('a').click(function (e) {
                    e.preventDefault();
                    AreaCon($(this).attr('fake'));
                });
                $('#bootAreas').find('input').click(function () {
                    AreaCon($(this).attr('fake'));
                });
            }
        });

    }
    //Combo das disciplinas
    $('#_area_con').find('a').click(function (e) {
        e.preventDefault();
        $('#resultados_col').addClass('fullwidth');
        $('#filtros_p').hide();
        $('#categorias_p').hide();
        $('#bd_pesquisa').hide();
        AbortaAJAX();
        AreaCon($(this).attr('fake'));
    }).css('cursor', 'pointer');
</script>

<html lang="pt-br" xml:lang="pt-br">
	<head>
		<title><!--#include virtual="/include/inc_titulo.asp"--></title>
		<!--#include virtual="/include/frameworkjs.asp"-->
		<link href="Content/TES/css/pesquisa_escolar.css?a=xs8" rel="stylesheet">
        <link href="Scripts/bootstrap/bootstrap_ava.css" type="text/css" rel="stylesheet">
		<link rel="stylesheet" href="Content/TES/css/fontface_ava(1).css"> 
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script> 
        <script>
            $(function () {
                id = <%=id%>;
                pg = <%=pg%>;
                AreaCon('respostadisci1AVA.asp?id=' + id + '&intpagatual=' + pg);
            });
        </script>

        <%if sessionman.valor("PUBSITE") <> 4 then%>
        <script type="text/javascript" src="boxPesquisa.js?4"></script> 
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
				
		<style type="text/css">
			#li_item_<%=intLiItem%> a{
				font-weight:bold;
				color:orange !important;
			}
			@font-face {
              font-family: "FontAwesome";
	            src:url('Scripts/fonts/fontawesome-webfont.eot');
	            src:url('Scripts/fonts/fontawesome-webfont.eot?#iefix') format('embedded-opentype'),
		            url('Scripts/fonts/fontawesome-webfont.ttf') format('truetype'), 
		            url('Scripts/fonts/fontawesome-webfont.svg#FontAwesome') format('svg');
              font-weight: normal;
              font-style: normal;
            }
		</style>

		<script src="Scripts/bootstrap/dropdown.js"></script>
		<!--#include virtual="/esc_include/esc_style/esc_style.asp"-->
		

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
							<section id="resultados_col" class="fullwidth" role="main" style="display: inline-block;">
                            </section>				
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

