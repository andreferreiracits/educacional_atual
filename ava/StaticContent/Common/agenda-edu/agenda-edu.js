

function entrarAgendaEdu(){

    location.href = "https://escola.agendaedu.com/";

}


$(document).ready(function() {
    //Vem do Hub
    sessionStorage.setItem('token-agendaedu','UaQSbdjyj0208acElOhDfvOx5k0-TLFw0UV4_K8Hz7V69YDm6gkMUGC0L8SlqrLXs9syF0xzYoMVShYiXfG-ATEux7iqJ72zR_uAd14bj0We3mBzBBxsU1KLHkmw4yLJY5TWMw');

    var email = 'master@educacional.com';
	var password =  'agendaedu';

    console.log("Iniciando");

    var usuario = new UsuarioEdu(email,password);
    
    logarAgendaEdu(usuario);
});