function abreComunicado(){
    $("#preview_comunicado").dialog({
        autoOpen: false,
        height: 647,
        maxHeight: 647,
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
                overflow: "auto"
            })
        },
        position: { my: "center", at: "center", of: $(".h2016") },
    });

    // $('#idusuario').attr('idusuario', ''+idUsuario);

    $("#preview_comunicado").dialog("open");
    $("html").css({
        overflow: "hidden"
    });
    // $(".ui-dialog").css({
    //     top : '45px'
    // });
}

function fecharModal(){
    window.parent.$('#preview_comunicado').dialog('close');
}