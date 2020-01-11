
function loginSmart(){
	$.ajax({
	    url: "/login/sso/on/tokenSmart.asp",
		cache: false,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		success: function (retorno) {
		    try {
		        //var retorno = JSON.parse(retorno);
				if (retorno.result == "ok"){
					window.open(retorno.urlAcessoPositivoOn); 
					//mensagemSucessoLoginOn(retorno.urlAcessoPositivoOn);
				}else{
					mensagemErroLoginOn(retorno.mensagemErro);
				}
		    } catch (e) {
		        mensagemErroLoginOn('Error:' + e);
		    }
		},
		async: false,
		error: function(arg,e) {
            mensagemErroLoginOn('Error:' + arg.responseText);
		}
	});
}

function loginCentral(){
	
	$.ajax({
	    url: "/login/sso/on/tokenCentral.asp",
		cache: false,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		success: function (retorno) {
		    try {
		        //var retorno = JSON.parse(retorno);
				if (retorno.result == "ok"){
					window.open(retorno.urlAcessoPositivoOn); 
					//mensagemSucessoLoginOn(retorno.urlAcessoPositivoOn);
				}else{
					mensagemErroLoginOn(retorno.mensagemErro);
				}
		    } catch (e) {
		        mensagemErroLoginOn('Error:' + e);
		    }
		},
		async: false,
		error: function(arg,e) {
            mensagemErroLoginOn('Error:' + arg.responseText);
		}
	});
}

function mensagemErroLoginOn(mensagem){
	$(".ava_lip.menu_spe ul").hide();
	alert(mensagem);
}

function mensagemSucessoLoginOn(urlRedirect){
	$(".ava_lip.menu_spe ul").hide();
	window.open(urlRedirect);                     
	//document.location = urlRedirect;
}
