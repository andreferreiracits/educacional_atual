function loginPositivoON(){

	// var secret = window.localStorage.getItem('secret');

	// var strLg =  secret.substring(0 , secret.indexOf("..") )   ;
        
	// var strp =  secret.substring(secret.indexOf("..") + 2 , secret.length )  ;
	

		$.ajax({
			url:"/AVA/Barras/Home/GetDadosOn",
			cache:false,
			type:'GET',
			contentType: 'application/json; charset=utf-8',
			success: function (base) {
	
					$.ajax({
						url:"http://apion.editorapositivo.com.br/accountv2/user/authentication?grant_type=password&userName="+base.strl+"&password="+base.strpass+"&audienceClient=BB88C102-DBE3-E611-80CC-000D3AC0301F",
						cache:false,
						type:'GET',
						contentType: 'application/json; charset=utf-8',
						success: function (retorno) {
							
							try{

								var strUrl = "http://web.positivoon.com.br/integracao?tk="+retorno.access_token;

								window.open(strUrl) ; 

							}
							
							catch(err){
								mensagemErroLoginOn(retorno.mensagemErro);
							}
							$('.submenu').hide();

							
						},
						error: function(arg,e) {
							mensagemErroLoginOn('Error:' + base.erro);
							$('.submenu').hide();

						} 
						

					});

		},
		error: function(arg,e) {
			mensagemErroLoginOn('Error:' + arg.mensagemErroLoginOn);
			$('.submenu').hide();

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
