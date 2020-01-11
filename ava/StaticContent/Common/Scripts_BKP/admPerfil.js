jQuery(function ($) {


    //Inicia abas admin
    $(function () {
        $("#tabs").tabs();
    });

    //Inicia fancybox criar
    var o = {
        'onComplete': function () {
            //Mascaras
            $("#dtmInicio").mask("99/99/9999");
            $("#dtmFim").mask("99/99/9999");
            $("#horaInicio").mask("99:99");
            $("#horaFim").mask("99:99");
        },
        'hideOnOverlayClick': false,
        'type': 'ajax'
    }

    lightBoxAVA($("a#criar_aviso"), o);


    //Chama lista Relatorios
    //listaRelatorios();
    //Chama lista Mensagem
    listaMensagem();
    //Chama lista Avisos
    listaAvisos();
    //Chama lista Denuncias
    listaDenuncias();
    //Chama lista Suspensos
    listaSuspensos();
    //Chama lista Agenda
    listaAgenda();




    $('#btRelatorioDia').live('click', function () {
        $.ajax({
            url: "/AVA/AdminAVA/Mensagem/Geral",
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: false,
            success: function (data) {
                $("#box_ListarMensagens").html(data);
            },
            error: function (data) {
                //alert(data.status);
                console.debug(data.status);
            }
        });
    });

    $('#btRelatorioSemana').live('click', function () {
        $.ajax({
            url: "/AVA/AdminAVA/Relatorios/Geral?tipo=semana",
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: false,
            success: function (data) {
                $("#box_ListarEstatisticas").html(data);
            },
            error: function (data) {
                //alert(data.status);
                console.debug(data.status);
            }
        });
    });

    $('#btRelatorioMes').live('click', function () {
        $.ajax({
            url: "/AVA/AdminAVA/Relatorios/Geral?tipo=mes",
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: false,
            success: function (data) {
                $("#box_ListarEstatisticas").html(data);
            },
            error: function (data) {
                //alert(data.status);
                console.debug(data.status);
            }
        });
    });



});


//Lista Relatorios
function listaRelatorios() {

    $.ajax({
        url: "/AVA/AdminAVA/Relatorios/Geral",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {
            $("#box_ListarEstatisticas").html(data);
        },
        error: function (data) {
            //alert(data.status);
            console.debug(data.status);
        }
    });

}

//Lista Mensagem
function listaMensagem() {

    $.ajax({
        url: "/AVA/AdminAVA/Mensagem/Geral",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {
            $("#box_ListarMensagens").html(data);
        },
        error: function (data) {
            //alert(data.status);
            console.debug(data.status);
        }
    });

}


//Lista Avisos
function listaAvisos() {

    $.ajax({
        url: "/AVA/AdminAVA/Avisos/Listando",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {
            $("#box_ListarAviso").html(data);
        },
        error: function (data) {
            //alert(data.status);
            console.debug(data.status);
        }
    });

}

//Lista Denuncias
function listaDenuncias() {

    $.ajax({
        url: "/AVA/AdminAVA/Denuncias/Listar",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {
            $("#box_ListarDenuncia").html(data);

            //Inicia fancybox editar
            var u = {
                'onComplete': function () {
                    //Mascaras
                    $("#dtmInicio").mask("99/99/9999");
                    $("#dtmFim").mask("99/99/9999");
                    $("#horaInicio").mask("99:99");
                    $("#horaFim").mask("99:99");
                },
                'hideOnOverlayClick': false,
                'type': 'ajax'
            }
            lightBoxAVA($("a#editar_aviso"), u);

        },
        error: function (data) {
            //alert(data.status);
            console.debug(data.status);
        }
    });

}

//Lista Suspensos
function listaSuspensos() {

    $.ajax({
        url: "/AVA/AdminAVA/Suspensao/Listando",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {
            $("#box_ListarSuspensos").html(data);
        },
        error: function (data) {
            //alert(data.status);
            console.debug(data.status);
        }
    });

}

//Lista Agenda
function listaAgenda() {

    $.ajax({
        url: "/AVA/AdminAVA/Agenda/Listando",
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {
            $("#box_ListarAgenda").html(data);
        },
        error: function (data) {
            //alert(data.status);
            console.debug(data.status);
        }
    });

}

//Altera Status Denuncia
function alteraStatusDenuncia(idDenuncia) {

    $.ajax({
        type: "POST",
        url: "/AVA/AdminAVA/Denuncias/SetarVisualizada",
        cache: false,
        data: {
            id: idDenuncia
        },
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {

            listaDenuncias();

        },
        error: function (data) {
            //alert(data.status);
            console.debug(data.status);
        }
    });
    
}

//Grava Aviso
function gravaAviso() {

    var idBAviso = $("#idBAviso").val();
    var strMensagem = $("#strMensagem").val();
    var dtmInicio = $("#dtmInicio").val();
    var horaInicio = $("#horaInicio").val();
    var dtmFim = $("#dtmFim").val();
    var horaFim = $("#horaFim").val();

    $('#aviso_style').remove();

    //////////////////////////////////////////////////////////////////

    /*

    papeis = new Array();


    $("input[type=checkbox][name='papel[]']:checked").each(function () {
        papeis.push($(this).val());
    });

    if (papeis.length > 0) {
        var strPapeis = papeis.toString();
        var validaPapel = true;
    } else {
        alert("Nenhum papel selecionado!");
        return false;
    }

    //Pega segmentacao e serie
    segmentacaoSerie = new Array();

    $("input[type=checkbox][name='segmentSerie[]']:checked").each(function () {
        segmentacaoSerie.push($(this).val());
    });

    if (segmentacaoSerie.length > 0) {
        var strSegmentoSerie = segmentacaoSerie.toString();
        var validaSegSerie = true;
    } else {
        alert("Nenhuma segmentaçãoSerie selecionada!");
        return false;
    }



    */

    ///////////////////////////////////////////////////////////////////


    if (strMensagem == "" || strMensagem == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Título em branco! Favor preencher.</p></div>');
        // $('#div_criaAviso').show();
        return false;
    } else if (dtmInicio == "" || dtmInicio == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Data inicial em branco! Favor preencher.</p></div>');
        // $('#div_criaAviso').show();
        return false;
    } else if (horaInicio == "" || horaInicio == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Hora inicial em branco! Favor preencher.</p></div>');
        //$('#div_criaAviso').show();
        return false;
    } else if (dtmFim == "" || dtmFim == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Data final em branco! Favor preencher.</p></div>');
        //$('#div_criaAviso').show();
        return false;
    } else if (horaFim == "" || horaFim == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Data final em branco! Favor preencher.</p></div>');
        //$('#div_criaAviso').show();
        return false;
    } else if (!verifica_hora(horaInicio)) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Hora inicial inválida!</p></div>');
        return false;
    } else if (!verifica_hora(horaFim)) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Hora final inválida!</p></div>');
        return false;
    } else if (!valida_data(dtmInicio)) {
        return false;
    } else if (!valida_data(dtmFim)) {
        return false;
    } else if (dtmInicio == dtmFim && horaInicio >= horaFim) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Hora incial maior ou igual a hora final!</p></div>');
        return false;
    }
    else {

        var splitDataInicial = dtmInicio.split("/");
        dtmInicio = splitDataInicial[2] + "-" + splitDataInicial[1] + "-" + splitDataInicial[0];

        var splitDataFinal = dtmFim.split("/");
        dtmFim = splitDataFinal[2] + "-" + splitDataFinal[1] + "-" + splitDataFinal[0];

        $.ajax({
            type: "POST",
            url: "/AVA/AdminAVA/Avisos/GravarAviso",
            cache: false,
            data: {
                idBAviso: idBAviso,
                strMensagem: strMensagem,
                dtmInicio: dtmInicio,
                horaInicio: horaInicio,
                dtmFim: dtmFim,
                horaFim: horaFim
            },
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {

                parent.$.fancybox.close();
                listaAvisos();

            },
            error: function (data) {
                //alert(data.status);
                console.debug(data.status);
            }
        });

        return true;


    }
}


//Exclui Aviso
function excluiAviso(idAviso) {

    $.ajax({
        type: "POST",
        url: "/AVA/AdminAVA/Avisos/Excluir/" + idAviso,
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        cache: false,
        success: function (data) {

            listaAvisos();

        },
        error: function (data) {
            //alert(data.status);
            console.debug(data.status);
        }
    });

}

//Edita Aviso
function editaAviso() {

    var idBAviso = $("#idBAviso").val();
    var strMensagem = $("#strMensagem").val();
    var dtmInicio = $("#dtmInicio").val();
    var horaInicio = $("#horaInicio").val();
    var dtmFim = $("#dtmFim").val();
    var horaFim = $("#horaFim").val();

    $('#aviso_style').remove();

    if (strMensagem == "" || strMensagem == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Título em branco! Favor preencher.</p></div>');
        // $('#div_criaAviso').show();
        return false;
    } else if (dtmInicio == "" || dtmInicio == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Data inicial em branco! Favor preencher.</p></div>');
        // $('#div_criaAviso').show();
        return false;
    } else if (horaInicio == "" || horaInicio == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Hora inicial em branco! Favor preencher.</p></div>');
        //$('#div_criaAviso').show();
        return false;
    } else if (dtmFim == "" || dtmFim == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Data final em branco! Favor preencher.</p></div>');
        //$('#div_criaAviso').show();
        return false;
    } else if (horaFim == "" || horaFim == null) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Data final em branco! Favor preencher.</p></div>');
        //$('#div_criaAviso').show();
        return false;
    } else if (!verifica_hora(horaInicio)) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Hora inicial inválida!</p></div>');
        return false;
    } else if (!verifica_hora(horaFim)) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Hora final inválida!</p></div>');
        return false;
    } else if (!valida_data(dtmInicio)) {
        return false;
    } else if (!valida_data(dtmFim)) {
        return false;
    } else if (dtmInicio == dtmFim && horaInicio >= horaFim) {
        $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Hora incial maior ou igual a hora final!</p></div>');
        return false;
    } 
    else {

        var splitDataInicial = dtmInicio.split("/");
        dtmInicio = splitDataInicial[2] + "-" + splitDataInicial[1] + "-" + splitDataInicial[0];

        var splitDataFinal = dtmFim.split("/");
        dtmFim = splitDataFinal[2] + "-" + splitDataFinal[1] + "-" + splitDataFinal[0];

        $.ajax({
            type: "POST",
            url: "/AVA/AdminAVA/Avisos/Editar/",
            cache: false,
            data: {
                idBAviso: idBAviso,
                strMensagem: strMensagem,
                dtmInicio: dtmInicio,
                horaInicio: horaInicio,
                dtmFim: dtmFim,
                horaFim: horaFim

            },
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {

                parent.$.fancybox.close();
                listaAvisos();

            },
            error: function (data) {
                //alert(data.status);
                console.debug(data.status);
            }
        });

    }

}

function verifica_hora(campo) {

    var horario = campo.split(":");

    if ((horario[0] < 00) || (horario[0] > 23) || (horario[1] < 00) || (horario[1] > 59)) {
        return false;
    } else {
        return true;
    }

}

function valida_data(date) {

    if (date != "") {

        var array_data = new Array;
        var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
        //vetor que contem o dia o mes e o ano
        array_data = date.split("/");
        erro = false;

        //Valido se a data esta no formato dd/mm/yyyy e se o dia tem 2 digitos e esta entre 01 e 31
        //se o mes tem d2 digitos e esta entre 01 e 12 e o ano se tem 4 digitos e esta entre 1000 e 2999
        if (date.search(ExpReg) == -1)
            erro = true;
        //Valido os meses que nao tem 31 dias com execao de fevereiro
        else if (((array_data[1] == 4) || (array_data[1] == 6) || (array_data[1] == 9) || (array_data[1] == 11)) && (array_data[0] > 30))
            erro = true;
        //Valido o mes de fevereiro
        else if (array_data[1] == 2) {
            //Valido ano que nao e bissexto
            if ((array_data[0] > 28) && ((array_data[2] % 4) != 0))
                erro = true;
            //Valido ano bissexto
            if ((array_data[0] > 29) && ((array_data[2] % 4) == 0))
                erro = true;
        }

        if (array_data[2] < 1800) {
            $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> O ano deve ser superior a 1800.</p></div>');
            return (false);
        }

        if (erro) {
            $('#mostra_aviso').append('<div id="aviso_style" style="margin-top: 20px; padding: 0 .7em;" class="ui-state-highlight ui-corner-all"><p><span style="float: left; margin-right: .3em;" class="ui-icon ui-icon-info"></span><strong>Atenção!</strong> Data inválida!</p></div>');
            return (false);
        } else {
            return (true);
        }

    } else {

        return (true);
    }
}


function PegarValoresCheckbox() {

    //Pega papeis
    papeis = new Array();


    $("input[type=checkbox][name='papel[]']:checked").each(function () {
        papeis.push($(this).val());
    });

    if (papeis.length > 0) {
        var strPapeis = papeis.toString();
        var validaPapel = true;
    } else {
        alert("Nenhum papel selecionado!");
    }

    //Pega segmentacao e serie
    segmentacaoSerie = new Array();

    $("input[type=checkbox][name='segmentSerie[]']:checked").each(function () {
        segmentacaoSerie.push($(this).val());
    });

    if (segmentacaoSerie.length > 0) {
        var strSegmentoSerie = segmentacaoSerie.toString();
        var validaSegSerie = true;
    } else {
        alert("Nenhuma segmentaçãoSerie selecionada!");
    }


    if (validaPapel == true) {

        alert("Fooi");

        /*
        $.ajax({
            type: "POST",
            url: "/AVA/AdminAVA/Avisos/GravaPapelSegSerie",
            cache: false,
            data: {
                strPapel: strPapeis,
                strSegmentoSerie: strSegmentoSerie
            },
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: false,
            success: function (data) {

                alert("Fooi");

            },
            error: function (data) {
                //alert(data.status);
                console.debug(data.status);
            }
        });
        */

    } else {
        alert("Papel em branco!");
    }


}
