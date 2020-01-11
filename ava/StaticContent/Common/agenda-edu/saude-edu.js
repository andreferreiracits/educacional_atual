

function abreSaude(){


    $("#preview_saude").dialog({
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


    $("#preview_saude").dialog("open");

}


function fecharModal(){
    window.parent.$('#preview_saude').dialog('close');
}