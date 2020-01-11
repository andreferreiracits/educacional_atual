function criarAtividadeAgendaEdu(idTurma,idUser){

    var url =  'https://api.agendaedu.com/v1/summaryday_classrooms';

    // school_user_id,classroom_id,title,description,taskhome,page_book

    
    var school_user_id = ""+74530;
    var classroom_id = ""+1 ;

    // var school_user_id = ""+idUser;
    // var classroom_id = ""+idTurma ;

    var title =  dadosTarefa.titulo;
    var description = dadosTarefa.descricao;
    var taskhome = 'false';
    var page_book = '';

    var atividade = {
        'request' : {
            'school_user_id' : '' ,
            'classroom_id' : '',
            'title' : '',
            'description' : '',
            'taskhome'  : '',
            'page_book' : ''
        }
    }

    atividade.request.school_user_id = school_user_id ;
    atividade.request.classroom_id = classroom_id ;
    atividade.request.title = title ;
    atividade.request.description = description ;
    atividade.request.taskhome = taskhome ;
    atividade.request.page_book = page_book ;

    fetch( url, {
        method:'post',
        body: JSON.stringify(atividade),
        headers:{
            "Content-Type":"application/json",
            "x-school-token":getToken()
        }
        
    })
    .then( (resp) => resp.json())
    .then(function(data){

        var respota = data ;

        console.log(respota);

        


    })
    .catch(function(err){
        console.log("Erro : "+err);

    });



}