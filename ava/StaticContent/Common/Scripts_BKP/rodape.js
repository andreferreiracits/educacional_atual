jQuery(function ($) {

    if (!idUsuarioCript) {
        $.ajax({
            type: 'POST',
            url: "/AVA/Login/Home/UsuarioCript",
            async: false,
            success: function (data) {
                idUsuarioCript = data;
            },
            error: function (data) {
                if (data.status != 0) {
                    idUsuarioCript = 0;
                }
            }
        });
    }

    // se ok na busca do usuario criptografado
    if (idUsuarioCript != 0) {
        var rodapeValue = $.jStorage.get("rodape" + idUsuarioCript);

        if (!rodapeValue) {
            $("#rodapeValue").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            $.ajax({
                url: "/AVA/Barras/Home/Rodape",
                data: "ts=" + new Date().getTime(),
                async: false,
                success: function (data) {
                    rodapeValue = data;
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("Ocorreu um erro na busca da barraSS");
                    }
                }
            });
        }

        $("#ava_f1").html(rodapeValue);
        $.jStorage.set("rodape" + idUsuarioCript, rodapeValue);
        $.jStorage.setTTL("rodape" + idUsuarioCript, 90000); // expires in 3 seconds
    } else {
        // se erro na busca do usuario criptografado
        $("#rodapeValue").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            url: "/AVA/Barras/Home/Rodape",
            data: "ts=" + new Date().getTime(),
            async: false,
            success: function (data) {
                $("#ava_f1").html(rodapeValue);
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Ocorreu um erro na busca da barraSS");
                }
            }
        });
    }



    function iniciaLightBoxAvaDenuncia() {
        lightBoxAVA($('.denunciar'), { 'onComplete': callBackDenuncia });
    }


    function callBackDenuncia() {
        $('form[name=frmDenuncia]').find('h2').css({ 'position': 'absolute', 'top': '-10px' });
        $('#enviar_email').click(function () {
            if ($('#txtMotivo').val() != "") {
                $.post("/AVA/Barras/Denuncia/DenunciaPaginaGravar", { 'strNome': $('#strNomeLogado').val(), 'strLogin': $('#strLoginLogado').val(), 'strEmail': $('#strEmailLogado').val(), 'strURL': $('#strURLCorrente').val(), 'strMotivo': $('#txtMotivo').val() }, function (data) {
                    alert("E-mail enviado ao administrador de rede social!");

                    parent.$.fancybox.close();

                });
            } else {
                alert("Favor preencher o motivo!");
                return false;
            }
        });
    }
});