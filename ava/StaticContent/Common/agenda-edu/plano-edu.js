function abrePlano(){
    $("#preview_plano").dialog({
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
                overflow: "auto"
            })
        },
        position: { my: "center", at: "center", of: $(".h2016") },
    });

    // $('#idusuario').attr('idusuario', ''+idUsuario);

    $("#preview_plano").dialog("open");
    $("html").css({
        overflow: "hidden"
    });
}

function fecharModal(){
    window.parent.$('#preview_plano').dialog('close');
}