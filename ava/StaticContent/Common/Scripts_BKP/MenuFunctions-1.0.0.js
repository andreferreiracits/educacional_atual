function openComunicador(theURL, W, H, wname) {

    //Validar se usuário está usando IE, caso contrário não deverá exibir a ferramenta -------------------------------------
    if (navigator.appName.indexOf('Microsoft') == -1) {
        alert("Ferramenta não disponível para a sua versão de browser.\nDisponível apenas para browser Internet Explorer.");
    } else {

        CLOSEdwn = "/comunidade/imagens/close_dwn.gif"
        CLOSEup = "/comunidade/imagens/close_up.gif"
        CLOSEovr = "/comunidade/imagens/close_ovr.gif"
        MINIdwn = "/comunidade/imagens/mini_dwn.gif"
        MINIup = "/comunidade/imagens/mini_up.gif"
        MINIovr = "/comunidade/imagens/mini_ovr.gif"
        NONEgrf = "/comunidade/imagens/none.gif"
        CLOCKgrf = "/comunidade/imagens/clock.gif"
        titHTML = "<font face=verdana size=1>&nbsp;" + wname + "</font>"
        titWIN = wname
        winBORDERCOLOR = "#000000"
        winBORDERCOLORsel = "#FFFFFF"
        winBGCOLOR = "#FF6600"
        winBGCOLORsel = "#FFCC00"

        var useragent = navigator.userAgent;
        var pos = useragent.indexOf('MSIE');
        if (pos > -1) {
            bVer = useragent.substring(pos + 5);
            var pos = bVer.indexOf(';');
            var bVer = bVer.substring(0, pos);
        }

        try {
            if ((pos > -1) && (parseInt(bVer) >= 6)) {
                var leftprop, topprop;
                leftprop = (screen.availWidth - W) / 2;
                topprop = (screen.availHeight - H) / 2;
                mywin = window.open(theURL, wname, 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=' + W + ',height=' + H + ',left = ' + leftprop + ', top = ' + topprop);
            }
            else {
                mywin = openchromelesscomunicador(theURL, wname, W, H, NONEgrf, CLOSEdwn, CLOSEup, CLOSEovr, MINIdwn, MINIup, MINIovr, CLOCKgrf, titHTML, titWIN, winBORDERCOLOR, winBORDERCOLORsel, winBGCOLOR, winBGCOLORsel)
            }
        }
        catch (e) {
            mywin = window.open(theURL, wname, 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=' + W + ',height=' + H + ',left =300 , top = 200');
        }

    }
}





/* ***** Notas e Faltas ********************************************** */
jQuery(function () {
    var formulario = "<form method='post' name='frmMatricula' id='frmMatricula' action='http://200.230.78.130/notas_faltas.php' style='display:none' >";
    formulario += "	 <input name='LoginID' type='hidden' size='12' value='' >"
    formulario += "</form>"
    $(".bg_content").append(formulario);


    $.ajax({
        url: "/LMS/Core/Usuario/GetLogin",
        cache: false,
        async: false,
        dataType: "json",
        type: "GET",
        success: function (res, textStatus, XMLHttpRequest) {
            $("#frmMatricula input[name = LoginID]").val(res);
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            PosiLog.logDebug("Notas Faltas ERRO-->" + textStatus);
        }
    });
});
/* ***** Notas e Faltas ********************************************** */