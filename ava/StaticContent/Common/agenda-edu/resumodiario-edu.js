



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
        beforeClose: function( event, ui ) {
            $("html").css({
                overflow: "scroll"
            })
        },
        position: { my: "center", at: "center", of: $(".h2016") },
    });

    // $('#idusuario').attr('idusuario', ''+idUsuario);

    $("#preview_diario").dialog("open");
    $("html").css({
        overflow: "hidden"
    });
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
        var respota = data;
        console.log(respota);
    })
    .catch(function(err){
        console.log("Erro : "+err);
    });
}