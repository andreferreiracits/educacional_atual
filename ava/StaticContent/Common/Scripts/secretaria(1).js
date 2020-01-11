//document.domain = "educacional.com.br";
function IncludeJS(source) {
    if (source != null) {
        /*var oHead = jQuery("head");
        var oScript = jQuery("<script>")
        .attr("language", "javascript")
        .attr("type", "text/javascript")
        .html(source);
        //.appendTo(oHead);
        oHead.append(oScript.outerHTML);*/
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.language = "javascript";
        oScript.type = "text/javascript";
        
        oScript.defer = true;
        oScript.text = source;
        oHead.appendChild( oScript );
    }
}

	
	
    /*
	
	function showDiv( objeto )
	{
		div = document.getElementById(objeto);
		if ( div.style.display == 'none' )
			div.style.display = '';
		else
			div.style.display = 'none';
	}

	
	function Popup_AE()
	{
		var larguraPopup = 790
		var alturaPopup = 460
		var x = (screen.availWidth - larguraPopup) / 2
		var y = (screen.availHeight - alturaPopup) / 2
		var desktop = window.open("/escolas/administra/acompanhamento/acompanhamento.asp", "_blank", "width=" + larguraPopup + ",height=" + alturaPopup + ",left=" + x + ",top=" + y + ",screenX=" + x + ",screenY=" + y + ",toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no");
	}

	
	function openavp()
	{
		var w = 796;
		var h = 525;
		var winl = (screen.width - w) / 2;
		var wint = (screen.height - h) / 2; 
		var mypage = '/avaliacaoparcial/FrameSet.asp'
		var myname = 'window_pop_av';
		var winprop = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=true,resizable=false,toolbar=no,location=no,status=no,menubar=no' 
		win = window.open(mypage, myname, winprop) 
		if (parseInt(navigator.appVersion) >= 4)
		{
			win.window.focus();
		}
	}


	
	function openwindow(idUsuario)
	{
		var w = 522;
		var h = 258;
		var winl = (screen.width - w) / 2;
		var wint = (screen.height - h) / 2; 
		var mypage = '/avaliacaodescritiva/listaAV.asp?idUsuario=' + idUsuario + ''
		var myname = 'window_lista_avd';
		var winprop = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=yes,resizable=false,toolbar=no,location=no,status=no,menubar=no' 
		win = window.open(mypage, myname, winprop) 
		if (parseInt(navigator.appVersion) >= 4)
		{
			win.window.focus();
		}
	}

	
	function sac_homepages()
	{
		var mypage = '/sac/homepage';
		var myname = 'sachomepagesEducacional';

		win = window.open(mypage, myname);
		if (parseInt(navigator.appVersion) >= 4)
		{
			win.window.focus();
		}
	}
	
	function FichaMedica( id )
	{		
		var ficha = window.open("/fichaMedica/dadosGerais.asp?idUsuario=" + id, "ficha", "width=800,height=550,toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=no,left=0,top=0");
		ficha.focus(); 
	}



	function abrirComunicadoSemanal(strUsuario)
	{
		var pJanela; 
		var w = 772;
		var h = 500;
		var winl = (screen.width - w) / 2;
		var wint = (screen.height - h) / 2; 
		var mypage = '/pais/csimprimir.asp?xu=' + strUsuario + ''
		var winprop = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=no,topMargin=0,leftMargin=0';
		pJanela = window.open(mypage, '', winprop) 
		if (parseInt(navigator.appVersion) >= 4)
		{
			pJanela.window.focus();
		}
	}
	
	function abrirBoletoBancario(strUsuario)
	{
		var pJanela; 
		var w = 680;
		var h = 500;
		var winl = (screen.width - w) / 2;
		var wint = (screen.height - h) / 2; 
		var mypage = '/boleto/listaluno.asp?x=' + strUsuario
		var winprop = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=no,topMargin=0,leftMargin=0';
		pJanela = window.open(mypage, '', winprop) 
		if (parseInt(navigator.appVersion) >= 4)
		{
			pJanela.window.focus();
		}
	}
	
	function loginAprimoraHP()
	{
		var pJanela; 
		var w = 772;
		var h = 480;
		var winl = (screen.width - w) / 2;
		var wint = (screen.height - h) / 2; 
		var mypage = 'http://www.educacional.com.br/rd/gravar.asp?servidor=www.colegiopositivo.com.br&url=/LoginAprimora.asp';
		var winprop = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',toolbar=no,location=no,menubar=no,scrollbars=no,resizable=no,topMargin=0,leftMargin=0';
		pJanela = window.open(mypage, '', winprop) 
		if (parseInt(navigator.appVersion) >= 4)
		{
			pJanela.window.focus();
		}
	}
	
	function abreTutorialInfoAcad()
	{
		var pJanela; 
		var w = 240;
		var h = 240;
		var winl = (screen.width - w) / 2;
		var wint = (screen.height - h) / 2; 
		var mypage = 'http://www.educacional.com.br/rd/gravar.asp?servidor=www.colegiopositivo.com.br&url=/pais_tutorial_acesso_info_academicas.asp';
		var winprop = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',toolbar=no,location=no,menubar=no,scrollbars=no,resizable=no,topMargin=0,leftMargin=0';
		pJanela = window.open(mypage, '', winprop) 
		if (parseInt(navigator.appVersion) >= 4)
		{
			pJanela.window.focus();
		}
	}
	
	function openAvalDescr(id)
	{
		var w = 796;
		var h = 525;
		var winl = (screen.width - w) / 2;
		var wint = (screen.height - h) / 2; 
		var mypage = 'http://www.educacional.com.br/rd/gravar.asp?servidor=www.colegiopositivo.com.br&url=/avaliacao_descritiva_abre.asp?x=' + id;
        
		var myname = 'window_aval';
		var winprop = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=yes,resizable=yes,toolbar=yes,location=yes,status=yes,menubar=yes';

		win = window.open(mypage, myname, winprop);
		if (parseInt(navigator.appVersion) >= 4)
		{
			win.window.focus();
		}
	}

    */


jQuery(function ($) {

    $("#ava_wrap").delegate(".action_secre", "click", function () {

        var este = $(this);
        /*$.ajax({
            type: "GET",
            url: "/rede/se_escolas.asp",
            //dataType: "script",
            //async: false,
            success: function (data) {
                IncludeJS(data);
            }
        });*/

        $.ajax({
            url: "/AVA/Barras/Home/Secretaria/",
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: false,
            success: function (data) {
                $("#ava_mural_geral").html(data);

                /*
                $.getScript("/rede/se_escolas.asp", function (data, textStatus, jqxhr) {
                console.log(data); //data returned
                console.log(textStatus); //success
                console.log(jqxhr.status); //200
                console.log('Load was performed.');
                });
                */





                //Carrega secretaria
                $.ajax({
                    url: "/rede/barra_secretaria_ava001.asp",
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    cache: false,
                    success: function (data) {

                        document.getElementById('div_cont_secre').innerHTML = data;
                        $("ul.css-tabs").fpTabs("div.css-panes > div");
                        //$(".conteudo_Secre").html(data);

                        $("#dadosPerfil ul li").removeClass("current");
                        este.parent().addClass("current");

                        $("#tabs").tabs();
                        $("#accordion").accordion();


                    },
                    error: function (data) {
                        console.debug(data.status);
                    }
                });

            },
            error: function (data) {
                alert(data.status);
            }
        });

    });


});


