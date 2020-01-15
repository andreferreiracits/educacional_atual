function abreCriarEvento(isCriarEvento){
    $("#preview_criar_evento").dialog({
        autoOpen: false,
        height: 680,
        width: 900,
        modal: true,
        resizable: false,
        draggable: false,
        open: function (event, ui) {
            $(this).parent().find(".ui-dialog-titlebar").hide();
            $(this).parent().find(".ui-dialog-buttonpane").hide();
            localStorage.removeItem('isCriarEvento');
            localStorage.setItem('isCriarEvento', isCriarEvento);
            $(this).parent().find('#teste').html('<p>' + isCriarEvento + '</p>');
        },
        beforeClose: function( event, ui ) {
            $("html").css({
                overflow: "auto"
            })
        },
        position: { my: "center", at: "center", of: $("#educContent") },
    });

    // $('#idusuario').attr('idusuario', ''+idUsuario);
    localStorage.removeItem('isCriarEvento');
    localStorage.setItem('isCriarEvento', isCriarEvento);
    $("#preview_criar_evento").dialog("open");
    $("html").css({
        overflow: "hidden"
    })
}

function fecharModal(){
    window.parent.$('#preview_criar_evento').dialog('close');
}