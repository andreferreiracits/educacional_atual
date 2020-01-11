function loginPenseMatematica(){
	$(".ava_lip.menu_pense ul").hide();
	if(window.location.href.indexOf("educacional.com.br") > -1) {
       window.open("http://www.educacional.com.br/penseRedir");
    }else if(window.location.href.indexOf("dev.educacional") > -1) {
       window.open("http://dev.educacional.net/penseRedir");
    }else if(window.location.href.indexOf("aceite.educacional") > -1) {
       window.open("http://aceite.educacional.net/penseRedir");
    }else if(window.location.href.indexOf("homolog.educacional") > -1) {
       window.open("http://homolog.educacional.net/penseRedir");
    }
}

function mensagemErroLoginPM(mensagem){
	$(".ava_lip.menu_pense ul").hide();
	alert(mensagem);
}

function mensagemSucessoLoginPM(urlRedirect){
	$(".ava_lip.menu_pense ul").hide();
	window.open(urlRedirect);                     
	//document.location = urlRedirect;
}

function openPense(){
	
}

//window.location = "http://www.educacional.com.br/penseRedir";