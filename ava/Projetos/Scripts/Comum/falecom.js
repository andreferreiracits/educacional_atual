"use strict"

var bolAjax_falecom = false;

function enviarFalecom() {
    var email      = jQuery("#emailUsuario").val();
    var mensagem   = jQuery("#mensagem").val();
    var assunto    = jQuery("#assunto").val();
    var idGrupoSac = jQuery("#idgs").val();
    var idTipoSac  = jQuery("#idts").val();
    var errorMsg = "";

    if (email == "") {
        errorMsg += "E-mail não foi selecionado.\n";
    }

    if (assunto == "") {
        errorMsg += "- Assunto \n";
    }
    
    if (mensagem == "") {
        errorMsg += "- Mensagem \n";
    }

    if (idGrupoSac == 0 || idTipoSac == 0) {
        errorMsg += "- O Fale com a tutoria não foi carregada corretamente. Tente fechar e abrir o navegador novamente!";
    }

    if (errorMsg.length > 0) {
        alert("Atenção, alguns campos não foram preenchidos. \n\n" + errorMsg);
    } else {
        if (!bolAjax_falecom) {
            bolAjax_falecom = true;
            jQuery("#loadingSac").show();
            jQuery.post("/Recursos/Projetos/include/falecom_gravasac.asp", {
                idGrupoSac: idGrupoSac,
                idTipoSac: idTipoSac,
                strEmail: email,
                strAssunto: assunto,
                strMensagem: mensagem
            }).done(function (data) {
                if (data == '0') {
                    alert("ERRO: Sua mensagem não foi enviada, por gentileza feche o navegador e abra novamente!");
                } else {
                    jQuery("#form_sac").remove();
                    jQuery("#feedback_sac")
                        .html("A sua mensagem foi enviada, anote o número da sua solicitação: " + data)
                        .show();
                }
                bolAjax_falecom = false;
                jQuery("#loadingSac").hide();
            }).fail(function (err) {
                alert('Não foi possível enviar o SAC neste momento. Tente novamente!');
                jQuery("#loadingSac").hide();
                bolAjax_falecom = false;
            });
        }
    }
}

