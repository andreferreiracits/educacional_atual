var ajaxJsonDetalharDetalharDestinatarioMensagem = null;
function detalharDestinatarioMensagemAjax(idMensagem) {
    var jsonAjaxDetalharDetalharDestinatarioMensagem = null;
    
    if (ajaxJsonDetalharDetalharDestinatarioMensagem != null)
        ajaxJsonDetalharDetalharDestinatarioMensagem.abort();

    ajaxJsonDetalharDetalharDestinatarioMensagem = $.ajax({
        url: "/AVA/Seletor/Home/DestinoPostInicio",
        data: { idMensagem: idMensagem },
        type: 'POST',
        dataType: "json",
        async: false,
        success: function (data) {
            jsonAjaxDetalharDetalharDestinatarioMensagem = data;
        }, error: function (data) {
            jsonAjaxDetalharDetalharDestinatarioMensagem = null;
            console.log('não foi possivel buscar os detalhes');
        }
    });

    return jsonAjaxDetalharDetalharDestinatarioMensagem;
}

function detalharDestinatarioMensagemLajotinhaAjax(ajaxDetalheData, bolSeguidores) {
    var jsonAjaxDetalharDetalharDestinatarioMensagem = null;
    
    if (ajaxJsonDetalharDetalharDestinatarioMensagem != null)
        ajaxJsonDetalharDetalharDestinatarioMensagem.abort();

    ajaxJsonDetalharDetalharDestinatarioMensagem = $.ajax({
        url: bolSeguidores ? "/AVA/Seletor/Home/DestinoPostDetalharSeguidores" : "/AVA/Seletor/Home/DestinoPostDetalhar",
        data: ajaxDetalheData,
        type: 'POST',
        dataType: "json",
        async: false,
        success: function (data) {
            jsonAjaxDetalharDetalharDestinatarioMensagem = data;
        }, error: function (data) {
            jsonAjaxDetalharDetalharDestinatarioMensagem = null;
        }
    });

    return jsonAjaxDetalharDetalharDestinatarioMensagem;
}

function detalharDestinatarioMensagem(idMensagem, idFerramentaTipoMensagem) {
    var JsonDetalharDetalharDestinatarioMensagem = null;
    
    var totalResultados = 0;
    var totalResultadosExibidos = 0;
    var intTotalScroll = 15;

    var JsonParcial = null;
    var JsonCarregado = null;

    $.fancybox({
        type: "ajax",
        href: "/AVA/Seletor/Home/modalDestinoPost/",
        ajax: {
            type: "POST",
            data: {
                idMensagem: idMensagem,
                idFerramentaTipo: idFerramentaTipoMensagem
            },
            dataType: "html"
        },
        scrolling: 'no',
        beforeShow: function () {
            $("html").css({ 'overflow': 'hidden' });
            $.fancybox.showLoading();
        },
        afterShow: function () {
            //Definindo o titulo usando idFerramentaTipo

            var strTituloModalDestino = '';
            switch (idFerramentaTipoMensagem) {
                case 2:
                case 4:
                case 14:
                case 15:
                case 17:
                case 18:
                case 19:
                case 25:
                    strTituloModalDestino = 'Agendado para:';
                    break;
                default:
                    strTituloModalDestino = 'Compartilhado com:';
                    break;
            }

            $('#ava_contentdestinopost_voltar').next().text(strTituloModalDestino);

            var data = detalharDestinatarioMensagemAjax(idMensagem);
            if (data != null) {

                JsonDetalharDetalharDestinatarioMensagem = $.parseJSON(JSON.stringify(data));

                totalResultados = JsonDetalharDetalharDestinatarioMensagem.length;
                totalResultadosExibidos = 0;

                JsonParcial = JsonDetalharDetalharDestinatarioMensagem.slice(0);

                JsonCarregado = JsonParcial.slice(0, intTotalScroll);
                JsonParcial.splice(0, intTotalScroll);

                if (totalResultados < intTotalScroll)
                    totalResultadosExibidos = totalResultados;
                else
                    totalResultadosExibidos = intTotalScroll;

                if (totalResultados == 0) {
                    $('#ava_contentdestinopost_total').html('<p>Nenhum resultado encontrado</p>');
                } else {
                    $('#ava_contentdestinopost_total').html('<p>Exibindo ' + totalResultadosExibidos + ' de ' + totalResultados + '</p>');
                }

                window.setTimeout(function () {
                    $("#myContentTemplateDestinoPost").tmpl({ Result: JsonCarregado }).appendTo("#ava_contentdestinopost");
                    window.setTimeout(function () { $.fancybox.hideLoading(); }, 100);
                }, 100);

                $('#ava_contentdestinopost_voltar', $('#ava_contentdestinopost').prev()).on('click', function () {
                    $.fancybox.showLoading();
                    $(this).hide();
                    $('#ava_contentdestinopost').prev().removeClass('titulo_modal_interno');
                    $('#ava_contentdestinopost_voltar', $('#ava_contentdestinopost').prev()).next().text(strTituloModalDestino);
                    JsonParcial = JsonDetalharDetalharDestinatarioMensagem.slice(0);

                    totalResultados = JsonParcial.length;
                    totalResultadosExibidos = 0;

                    JsonCarregado = JsonParcial.slice(0, intTotalScroll);
                    JsonParcial.splice(0, intTotalScroll);

                    if (totalResultados < intTotalScroll)
                        totalResultadosExibidos = totalResultados;
                    else
                        totalResultadosExibidos = intTotalScroll;

                    if (totalResultados == 0) {
                        $('#ava_contentdestinopost_total').html('<p>Nenhum resultado encontrado</p>');
                    } else {
                        $('#ava_contentdestinopost_total').html('<p>Exibindo ' + totalResultadosExibidos + ' de ' + totalResultados + '</p>');
                    }
                    $('#ava_contentdestinopost .carteirinha').remove();

                    window.setTimeout(function () {
                        $("#myContentTemplateDestinoPost").tmpl({ Result: JsonCarregado }).appendTo("#ava_contentdestinopost");
                        window.setTimeout(function () { $.fancybox.hideLoading(); }, 100);
                    }, 100);
                });

                $('#ava_contentdestinopost').on('click', '.carteirinha.compartilhado_grupo', function () {
                    $.fancybox.showLoading();

                    var strNomeGrupoDestino = strTituloModalDestino + " ";
                    strNomeGrupoDestino += $.trim($(this).find('strong').text());
                    strNomeGrupoDestino += " (" + $.trim($(this).find('span').text()) + ")";

                    if (strNomeGrupoDestino.length > 140) {
                        strNomeGrupoDestino = strNomeGrupoDestino.substring(0, 140) + "...";
                    }

                    $('#ava_contentdestinopost_voltar', $('#ava_contentdestinopost').prev()).show();
                    $('#ava_contentdestinopost_voltar', $('#ava_contentdestinopost').prev()).next().text(strNomeGrupoDestino);
                    $('#ava_contentdestinopost').prev().addClass('titulo_modal_interno');

                    var bolSeguidores = parseInt($(this).attr('bolSeguidores')) == 1;
                    var ajaxDetalheData = {};

                    if (!bolSeguidores) {
                        var idEscola = parseInt($(this).attr('idEscola'));
                        var idUnidade = parseInt($(this).attr('idUnidade'));
                        var idCurso = parseInt($(this).attr('idCurso'));
                        var idSerie = parseInt($(this).attr('idSerie'));
                        var idTurma = parseInt($(this).attr('idTurma'));
                        var idPapel = parseInt($(this).attr('idPapel'));

                        ajaxDetalheData = {
                            idMensagem: idMensagem,
                            idEscola: idEscola,
                            idUnidade: idUnidade,
                            idCurso: idCurso,
                            idSerie: idSerie,
                            idTurma: idTurma,
                            idPapel: idPapel
                        };

                    } else {
                        ajaxDetalheData = { idMensagem: idMensagem };
                    }

                    var data = detalharDestinatarioMensagemLajotinhaAjax(ajaxDetalheData, bolSeguidores);
                    if (data != null) {

                        JsonParcial = $.parseJSON(JSON.stringify(data));

                        totalResultados = JsonParcial.length;
                        totalResultadosExibidos = 0;

                        JsonCarregado = JsonParcial.slice(0, intTotalScroll);
                        JsonParcial.splice(0, intTotalScroll);

                        if (totalResultados < intTotalScroll)
                            totalResultadosExibidos = totalResultados;
                        else
                            totalResultadosExibidos = intTotalScroll;

                        if (totalResultados == 0) {
                            $('#ava_contentdestinopost_total').html('<p>Nenhum resultado encontrado</p>');
                        } else {
                            $('#ava_contentdestinopost_total').html('<p>Exibindo ' + totalResultadosExibidos + ' de ' + totalResultados + '</p>');
                        }
                        $('#ava_contentdestinopost .carteirinha').remove();
                        window.setTimeout(function () {
                            $("#myContentTemplateDestinoPost").tmpl({ Result: JsonCarregado }).appendTo("#ava_contentdestinopost");
                            window.setTimeout(function () { $.fancybox.hideLoading(); }, 100);
                        }, 100);
                    } else {
                        $.fancybox.hideLoading();
                    }
                });

                $(".ava_lightcontent").scroll(function () {
                    if (totalResultadosExibidos < totalResultados) {
                        if ($(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                            JsonCarregado = JsonParcial.slice(0, intTotalScroll);
                            JsonParcial.splice(0, intTotalScroll);
                            totalResultadosExibidos += JsonCarregado.length;
                            $('#ava_contentdestinopost_total').html('<p>Exibindo ' + totalResultadosExibidos + ' de ' + totalResultados + '</p>');
                            $("#myContentTemplateDestinoPost").tmpl({ Result: JsonCarregado }).appendTo("#ava_contentdestinopost");
                        }
                    }
                });
            } else {
                $.fancybox.hideLoading();
            }
        },
        beforeClose: function () {
            $.fancybox.hideLoading();
            JsonDetalharDetalharDestinatarioMensagem = null;
            if (ajaxJsonDetalharDetalharDestinatarioMensagem != null)
                ajaxJsonDetalharDetalharDestinatarioMensagem.abort();
            ajaxJsonDetalharDetalharDestinatarioMensagem = null;
        },
        afterClose: function () {
            $("html").css({ 'overflow': 'scroll' });
        },
        autoSize: false,
        width: 900,
        height: 530,
        type: "ajax",
        autoResize: false,
        fitToView: false,
        padding: 0,
        scrolling: 'no',
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
}