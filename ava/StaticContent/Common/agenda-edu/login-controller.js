function logarAgendaEdu(usuario){
    
    var urlLogin =  'https://api.agendaedu.com/api/import/v1/sessions';

    fetch( urlLogin, {
        method:'post',
        body: JSON.stringify(usuario),
        headers:{
            "Content-Type":"application/json",
            "x-api-key":getToken()
        }
        
    })
    .then( (resp) => resp.json())
    .then(function(data){
        var respota = data ;

        console.log(respota);

        sessionStorage.setItem('configuracao',JSON.stringify(respota));
    })
    .catch(function(err){
        console.log("Erro : "+err);
    });
}