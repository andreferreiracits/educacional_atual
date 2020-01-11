



function abreDiario(){


    $("#preview_diario").dialog({
        autoOpen: false,
        height: 680,
        width: 900,
        modal: true,
        resizable: false,
        draggable: false,
        open: function (event, ui) {
            $(this).parent().find(".ui-dialog-titlebar").hide();
            $(this).parent().find(".ui-dialog-buttonpane").hide();
        },
    });

    // $('#idusuario').attr('idusuario', ''+idUsuario);


    $("#preview_diario").dialog("open");

}


function fecharModal(){
    window.parent.$('#preview_diario').dialog('close');
}





function carregarResumoDiarioAluno(idAluno,date){

    var url =  'https://api.agendaedu.com/v1/students/'+idAluno+'/daily_summary?date='+date;

    fetch( url, {
        method:'GET',
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