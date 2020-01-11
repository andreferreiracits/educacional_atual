/**
* popUpModal(url, width, height)
* Abre uma janela pop-up bloqueando o parent (janela de origem).
* março de 2009 - Adão Goncalves
*/
function popUpModal(pUrl, pWidth, pHeight, pTop, pLeft)
{
	if (navigator.platform.toLowerCase().indexOf("win") >= 0)
	{ // Para Windows
		if (window.showModalDialog)
		{
			return window.showModalDialog(pUrl, window, "center:yes;center:on;center:1;dialogWidth:" + pWidth + "px;dialogHeight:" + pHeight + "px;dialogTop:" + (typeof(pTop)!='undefined'?pTop:'10')+";dialogleft="+(typeof(pLeft)!='undefined'?pLeft:'10'));
		}
		else
		{
			try
			{
				/* ativa privilégio de segurança, para compatibilidade com o Firefox */
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");
				window.open(pUrl, "wndModal", "width=" + pWidth + ",height=" + pHeight + ",resizable=no,modal=yes,top="+(typeof(pTop)!='undefined'?pTop:'10')+",left="+(typeof(pLeft)!='undefined'?pLeft:'10'));
				return true;
			}
			catch (e)
			{
				alert("Script não confiável, não é possível abrir janela modal.");
				return false;
			}
		}
	}
	else
	{ // Para Linux
		window.open(pUrl, "wndModal", "width=" + pWidth + ",height=" + pHeight + ",resizable=no");
	}
}

/**
* Quebra palavras maiores que 'tamanhoPalavra' caracteres dentro do texto 'texto'.
*/
function quebraTexto(texto, tamanhoPalavra) {
    var palavras = texto.split(" ");
    var retorno = "";
    for (i = 0; i < palavras.length; i++) {
        palavra = palavras[i];
        if (palavra.length > tamanhoPalavra) {
            retorno += quebraPalavra(palavra, tamanhoPalavra) + " ";
        }
        else {
            retorno += palavra + " ";
        }
    }
    return retorno.substring(0, retorno.length - 1);
}
function quebraPalavra(palavra, tamanhoPalavra) {
    var retorno = "";
    while (palavra.length > tamanhoPalavra) {
        retorno += palavra.substring(0, tamanhoPalavra) + "- ";
        palavra = palavra.substring(tamanhoPalavra + 1);
    }
    return retorno + palavra;
}

/**
* Limita palavras para que sejam truncadas em tamanhoMaximo caracteres, terminadas com "...".
*/
function limitarTamanhoString(str, tamanhoMaximo) {
    if (str.length > tamanhoMaximo) {
        return (str.substring(0, tamanhoMaximo - 3) + "...");
    }
    return (str);
}

/**
* Remove todos os acentos de uma string
*/
function removeAccents(s) {
    return s.toLowerCase()
	.replace(new RegExp(/\s/g), "")
	.replace(new RegExp(/[àáâãäå]/g), "a")
	.replace(new RegExp(/æ/g), "ae")
	.replace(new RegExp(/ç/g), "c")
	.replace(new RegExp(/[èéêë]/g), "e")
	.replace(new RegExp(/[ìíîï]/g), "i")
	.replace(new RegExp(/ñ/g), "n")
	.replace(new RegExp(/[òóôõö]/g), "o")
	.replace(new RegExp(/œ/g), "o")
	.replace(new RegExp(/[ùúûü]/g), "u")
	.replace(new RegExp(/[ýÿ]/g), "y")
	.replace(new RegExp(/\W/g), "");
}

/**
* 
*/
function GetCookie(name) {
    var result = null;
    if (window.document.cookie && $.trim(window.document.cookie) != '') {
        var cookies = window.document.cookie.split(';');
        var cookiesLen = cookies.length;
        if (cookiesLen > 0) {
            for (var i = 0; i < cookiesLen; i++) {
                var cookie = $.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    result = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
    }
    return result;
} 

/**
* Adds a function to the window onunload event
*/
function addBeforeUnloadEvent(func) {
    var oldOnunload = window.onbeforeunload;
    if (typeof window.onbeforeunload != 'function') {
        window.onbeforeunload = func;
    }
    else {
        window.onbeforeunload = function () {
            oldOnunload();
            func();
        }
    }
}

/**
* Remove elementos de um array de acordo com o nome
*/
function removeArrayElement(arrayName, arrayElement) {
    for (var i = 0; i < arrayName.length; i++) {
        if (arrayName[i] == arrayElement)
            arrayName.splice(i, 1);
    }
}

/**
* Aplica o estilo FancyBorder aos elementos selecionados
*/
(function ($) {
    $.fn.fancyBorder = function () {
        var support = supportsFancyBorder();
        return this.each(function () {
            $(this).addClass("fancyBorder" + (support ? "" : "-unsupported"));
        });
    };

    function supportsFancyBorder() {
        return !$.browser.msie;
    }
})(jQuery);

/**
* 
*/
function LimitaTamTA(textAreaField, limit) {
    var ta = $("#" + textAreaField);
    var scrollTop;
    if (ta.val().length > limit) {
        scrollTop = ta[0].scrollTop;
        ta.val(ta.val().substring(0, limit));
        ta[0].scrollTop = scrollTop;
	}
}

/**
* 
*/
function multiLineHtmlEncode(value) {
	var lines = value.split(/\r\n|\r|\n/);
	for (var i = 0; i < lines.length; i++) {
		lines[i] = htmlEncode(lines[i]);
	}
	return lines.join('\r\n');
}

/**
* 
*/
function htmlEncode(value) {
	return $('<div/>').text(value).html();
} 