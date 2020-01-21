function entrarAgendaEdu(){
    var token_escola = 'iaW_Uw0DU2dZvvYQKrbhZjFdAYZAX4M0CJVCtAFSAPVVcz73-ifg5tCDSSl3n9ky5x-KJjNUkrwv7Ur_yfDcAZB59QwBN5dhrqsUjjoKnB7aHPaCSrSv0esX3xxaysavhqZ-zw';
    var secret_key = 'b9bd3dd5b9c53402231c7d368b8364f5';
    var secret = window.localStorage.getItem('secret');
    var loginName =  secret.substring(0 , secret.indexOf("..") );
    var ulrAuth = 'http://login.dev.educacional.net/api/AuthAgendaEdu?username='+loginName+'&tks='+secret_key;
        $.ajax({
        url: ulrAuth,
        success: function (data) {
            var token_user = data;
			//token de teste do agenda edu
			//token_user= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRob2QiOiJ1c2VybmFtZSIsImxvZ2luIjoibWFybG9uLnJhcGhhZWwifQ.toP7BVHpxKD_jFDYTVIRjkZdeeIQj12oDoEaMHxGni4";
			// cria div temporaria
			var container = $(document.createElement('div'));
			// cria o form authAgendaEdu para autenticação, baseado na documentação do agenda edu
			var divSubmit = $(document.createElement('div'));
			$(divSubmit).append('<form id="authAgendaEdu" action="https://escola.agendaedu.com/auth_jwt/positivo/sign_in" method="post">'+
			'<input type="hidden" name="school_token" value="'+token_escola+'">'+
			'<input type="hidden" name="jwt_token" value="'+token_user+'">'+
			'<button style="font-weight: bold;background-color: azure; padding: 20px; border-radius: 10px; border: 1px solid #bbb">Logar na Agenda Edu</button></form>');
			// adiciona o formulario no form principal de forma oculta
			$('#agendaEdu').after(container, divSubmit);
			// força o submit do formulario
			$('#authAgendaEdu').submit();
			// remove o form authAgendaEdu
			$('#authAgendaEdu').remove();
        },
        error: function () {
            console.debug("Erro");
        }
    });
}

$(document).ready(function() {
    //Vem do Hub
    sessionStorage.setItem('token-agendaedu','UaQSbdjyj0208acElOhDfvOx5k0-TLFw0UV4_K8Hz7V69YDm6gkMUGC0L8SlqrLXs9syF0xzYoMVShYiXfG-ATEux7iqJ72zR_uAd14bj0We3mBzBBxsU1KLHkmw4yLJY5TWMw');
    var email = 'master@educacional.com';
	var password =  'agendaedu';
    //console.log("Iniciando");
    var usuario = new UsuarioEdu(email,password);
    logarAgendaEdu(usuario);
});