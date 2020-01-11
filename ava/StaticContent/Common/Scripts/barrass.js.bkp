var cacheMenu = false;
var xhr;
var tempoSaida;
var tempoAtual;
var eGlobal;
var esteGlobal;
jQuery(function ($) {

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


    /********************************************************************
    * MAIN MENU
    ********************************************************************/
    //$(".nav").superfish().supposition();

    /********************************************************************
    * Carrega BarraSS
    ********************************************************************/

    // se ok na busca do usuario criptografado
    if (idUsuarioCript != 0) {

        try {
            var barraSSValue = $.jStorage.get("barraSS" + idUsuarioCript);
        } catch (err) {
            var barraSSValue = '';
        }
        //console.log(barraSSValue);
        if (!barraSSValue) {
            $("#ava_barratopo").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            $.ajax({
                url: "/AVA/Barras/Home/BarraSS/",
                data: "ts=" + new Date().getTime(),
                async: false,
                success: function (data) {
                    //$("#ava_barratopo").html(data);
                    barraSSValue = data;

                    /*
                    if (varTemaRel !== undefined) {
                    $(".trocarTemas:first").attr("rel", varTemaRel);
                    }
                    */
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("Ocorreu um erro na busca da barraSS");
                    }
                    //$("#ava_barratopo").html("Ocorreu um erro na busca da barraSS.");
                }
            });

            try {
                $.jStorage.set("barraSS" + idUsuarioCript, barraSSValue);
                $.jStorage.setTTL("barraSS" + idUsuarioCript, 600000); // expires in 10 minutos
            } catch (err) {
            }

        }
        $("#ava_barratopo").html(barraSSValue);

    } else {

        $("#ava_barratopo").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            url: "/AVA/Barras/Home/BarraSS/",
            data: "ts=" + new Date().getTime(),
            async: false,
            success: function (data) {
                $("#ava_barratopo").html(data);

                /*
                if (varTemaRel !== undefined) {
                $(".trocarTemas:first").attr("rel", varTemaRel);
                }
                */
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Ocorreu um erro na busca da barraSS");
                }
            }
        });
    }


    /********************************************************************
    * Carrega LIP
    ********************************************************************/
    try {
        var lipValue = $.jStorage.get("LIP" + idUsuarioCript);
    } catch (err) {
        var lipValue = '';
    }

    if (!lipValue) {

        $("#carregarLIP").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            url: "/escolas/portalpositivo/includes/alunos58/lipava.asp",
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            async: false,
            success: function (data) {
                //$("#carregarLIP").empty().html(data);
                lipValue = data;
            },
            error: function (data) {
                if (data.status != 0) {
                    //console.debug(data.responseText);
                }
                //alert(data.responseText);
            }
        });

        try {
            $.jStorage.set("LIP" + idUsuarioCript, lipValue);
            $.jStorage.setTTL("LIP" + idUsuarioCript, 600000); // expires in 10 minutos
        } catch (err) {
        }

    }
    $("#carregarLIP").empty().html(lipValue);

    /********************************************************************
    * Carrega LIP
    ********************************************************************/


    /********************************************************************
    * Notificações
    ********************************************************************/
    _total = 0
    $.get('/AVA/Mural/Home/ContaNotificacoes/' + $('#ava_user').attr('ident'), { "ts": new Date().getTime() }, function (data) {
        if (Number(data) > 0) {
            $('#vw_notif').removeClass('span_vazio').text(data);
            _total = Number(data);
        }
    });

    _notif_click = null;
    $('#vw_notif').click(function (e) {
        //LISTA AS NOTIFICACOES
        if ($(".drop_notif").is(":visible")) {
            $("#ava_user").find("ul.drop_notif").fadeOut("fast", function () {
                $(this).remove();
            });
        } else {
            $.get('/AVA/Mural/Home/NotificacoesTop/' + $('#ava_user').attr('ident'), { "ts": new Date().getTime() }, function (data) {
                $('#ava_user').find('.noti_li').append(data);
                //MARCA QUE O USUARIO JA SABE DAS NOTIFICACOES

                $.get('/AVA/Mural/Home/Notifica/' + $('#ava_user').attr('ident'), { "ts": new Date().getTime() }, function (data) {
                    if (_total > 0) {
                        $('#vw_notif').fadeOut('fast').text('').addClass('span_vazio').fadeIn('fast');
                        _total = 0;
                    }
                });

            });

        }
        e.preventDefault();
    });
    /*$('ul.drop_notif').live("mouseleave", function (e) {
    $(this).fadeOut("fast", function () {
    $(this).remove();
    });
    e.preventDefault();
    });*/
    /********************************************************************
    * Notificações
    ********************************************************************/

    //esconde elementos de compartilhamento
    $('section, body, ul li a').live("click", function (event) {

        if (!($(event.target).closest(".menunav").hasClass("menunav")) || $(event.target).attr("id") == "ava_acessorapido") {
            $("#ava_barratopo").find(".sub_menunav:visible").hide();
        }

        if (!($(event.target).closest(".drop_notif").hasClass("drop_notif"))) {
            if ($(".drop_notif").is(":visible")) {

                $("ul.drop_notif").fadeOut("fast", function () {
                    $(this).remove();
                });
            }
        }

        if ($(event.target).attr("id") != "ava_dropdown" && $(event.target).attr("id") != "ava_acessorapido" && event.target.localName != "input" && $(event.target).closest("#ava_dropdown").attr("id") != "ava_dropdown") {
            if (xhr !== undefined && xhr.readyState != 4) {
                xhr.abort();
                xhr = undefined;
                cacheMenu = false;
            }
            $("#ava_dropdown").hide();
        }

    });
    //Troca abas do conteudo
    $(".troca_conteudo").live("click", function (e) {
        $("#ava_dropdown:visible").hide();
        var este = $(this);
        if (este.hasClass("troca_ensMed")) {
            $(".ensinoMedio").show();
            $(".ensinoFundamental").hide();
        }
        else if (este.hasClass("troca_ensFund")) {
            $(".ensinoMedio").hide();
            $(".ensinoFundamental").show();
        }
        este = undefined;
        e.preventDefault;
    });

    $(".ava_ativ a:first").live("mouseenter", function (e) {
        $("#ava_dropdown:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false;
        }
        var cxEscondida = $(this).next();
        if (cxEscondida.is(":visible")) {
            cxEscondida.hide();
        } else {
            $(".sub_menunav:visible").hide();
            cxEscondida.show();
        }
        e.preventDefault;
    });
    $(".ava_ativ .sub_menunav").live("mouseleave", function (e) {
        $("#ava_dropdown:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false;
        }
        var este = $(this);
        if (este.is(":visible")) {
            este.fadeOut("fast");
        }
        este = undefined;
        e.preventDefault;
    });
    $(".ava_cont a:first").live("mouseenter", function (e) {
        $("#ava_dropdown:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false;
        }
        var cxEscondida = $(this).next();
        if (cxEscondida.is(":visible")) {
            cxEscondida.hide();
        } else {
            $(".sub_menunav:visible").hide();
            cxEscondida.show();
        }
        e.preventDefault;
    });
    $(".ava_cont .sub_menunav").live("mouseleave", function (e) {
        $("#ava_dropdown:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false;
        }
        var este = $(this);
        if (este.is(":visible")) {
            este.fadeOut("fast");
        }
        este = undefined;
        e.preventDefault;
    });
    $(".ava_cp a:first").live("mouseenter", function (e) {
        $("#ava_dropdown:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false;
        }
        var cxEscondida = $(this).next();
        if (cxEscondida.is(":visible")) {
            cxEscondida.hide();
        } else {
            $(".sub_menunav:visible").hide();
            cxEscondida.show();
        }
        e.preventDefault;
    });
    $(".ava_cp .sub_menunav").live("mouseleave", function (e) {
        $("#ava_dropdown:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false;
        }
        var este = $(this);
        if (este.is(":visible")) {
            este.fadeOut("fast");
        }
        este = undefined;
        e.preventDefault;
    });

    /********************************************************************
    * Carrega o Menu do LIP
    ********************************************************************/

    $('.ava_lip a:first').live('mouseenter', function (e) {
        $("#ava_dropdown:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false;
        }
        var elemento = $(this).next();
        e.stopPropagation();

        if (elemento.is(":visible")) {
            elemento.hide();
        } else {
            $(".sub_menunav:visible").hide();
            elemento.show();
        }

        elemento = undefined;
    });
    $(".ava_lip .sub_menunav").live("mouseleave", function (e) {
        var target = e ? e.target : window.event.srcElement;
        if (target.nodeName != "SELECT" && target.nodeName != "OPTION") {
            $("#ava_dropdown:visible").hide();
            if (xhr !== undefined && xhr.readyState != 4) {
                xhr.abort();
                xhr = undefined;
                cacheMenu = false;
            }
            var este = $(this);
            if (este.is(":visible")) {
                este.fadeOut("fast");
            }
            este = undefined;
            e.preventDefault;
        }
    });


    /********************************************************************
    * Carrega Tarja Superior
    ********************************************************************/
    // Check if "key" exists in the storage

    //var index = $.jStorage.index();
    //console.log(index); // ["key1","key2","key3"]

    try {
        var value = $.jStorage.get("tarjaSuperior" + idUsuarioCript);
    } catch (err) {
        var value = '';
    }
    //console.log(value);
    if (!value) {
        $("#ava_barraescola").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            url: "/AVA/Barras/Home/TarjaSuperior",
            async: false,
            success: function (data) {
                $("#ava_barraescola").html(data);
                $('.ph').addPlaceholder();
                value = data;
            },
            error: function (data) {
                if (data.status != 0) {
                    value = "erro";
                    console.debug("Ocorreu um erro na busca da Tarja Superior");
                }
                //$("#ava_barraescola").html("Ocorreu um erro na busca da Tarja Superior.");
            }
        });

        try {
            $.jStorage.set("tarjaSuperior" + idUsuarioCript, value);
            $.jStorage.setTTL("tarjaSuperior" + idUsuarioCript, 600000); // expires in 10 minutos
        } catch (err) {
        }
    }
    $("#ava_barraescola").html(value);


    //    $("#ava_barraescola").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    //    $.ajax({
    //        url: "/AVA/Barras/Home/TarjaSuperior",
    //        success: function (data) {
    //            $("#ava_barraescola").html(data);
    //            $('.ph').addPlaceholder();
    //        },
    //        error: function (data) {
    //            if (data.status != 0) {
    //                console.debug("Ocorreu um erro na busca da Tarja Superior");
    //            }
    //            //$("#ava_barraescola").html("Ocorreu um erro na busca da Tarja Superior.");
    //        }
    //    });

    /********************************************************************
    * Carrega Acesso Rapido
    ********************************************************************/

    $('#ava_acessorapido').live('mouseenter', function () {
        $("#ava_barratopo").find(".sub_menunav:visible").hide();
        if ($('#ava_dropdown').css('display') == 'none') {
            if (!cacheMenu) {
                $('#ava_dropdown').show().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                xhr = $.ajax({
                    url: "/AVA/Barras/AcessoRapido/MenuAcessoRapido",
                    cache: true,
                    success: function (data) {
                        $("#ava_dropdown").empty().html(data);
                        $('.ava_container_masonry').masonry({
                            itemSelector: '.ava_box_masonry'
                        });
                        $('#strpc_acessorapido').addPlaceholder();
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug(data.responseText);
                        }
                        //alert(data.responseText);
                    }
                });
                cacheMenu = true;
            } else {
                $("#ava_dropdown").show();
                $(".ava_container_masonry").masonry('reload');

            }
        } else {
            $('#ava_dropdown').hide();
        }
    });
    $("#ava_dropdown").live("mouseleave", function (e) {
        var este = $(this);
        //eGlobal.pr
        if (este.is(":visible")) {
            if (xhr !== undefined && xhr.readyState != 4) {
                xhr.abort();
                xhr = undefined;
                cacheMenu = false;
            }
            este.fadeOut("fast");
        }
        este = undefined;

        e.preventDefault;
    });

    /*$("*").not("#ava_dropdown").click(function () {
    if ($("#ava_dropdown").is(":visible")) {
    $("#    ").hide();
    }
    });*/

    /********************************************************************
    * Carrega Acesso Rapido Lista Completa
    ********************************************************************/
    $('#ava_bt_vejatudo').live('click', function () {
        $(this).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        vejaTudo();
    });
    $(".ava_resultados ul li:first a").live('click', function () {
        if ($(this).attr("href") == "semresultado") {
            vejaTudo();
        }
    });


    /********************************************************************
    * Pesquisa da Barra Superior Acesso Rapido
    ********************************************************************/
    //    $("#strpc_topo").live('focus', function () {
    //        if ($(this).val() == "Pesquisar") {
    //            $(this).val("");
    //        }
    //    });
    //    $("#strpc_topo").live('blur', function () {
    //        if ($(this).val() == "") {
    //            $(this).val("Pesquisar");
    //        }
    //    });
    $(".fim_resultados a").live('click', function () {
        var busca = $(this).attr("href");
        //$("#ava_wrap").load("/AVA/AcessoRapido/AcessoRapido/PesquisaBarraAcessoRapido/" + busca);
        location.href = "/AVA/AcessoRapido/AcessoRapido/PesquisaBarraSuperiorAcessoRapido/" + busca;

    });
    $("#strpc_acessorapido").live('keyup', function (event) {
        if ($(this).val().length > 0) {
            $.ajax({
                url: "/AVA/Barras/AcessoRapido/PesquisaAcessoRapido/" + $(this).val(),
                success: function (data) {
                    $(".ava_resultados").empty().show().html(data);
                    $(".fim_resultados a").attr("href", $("#strpc_topo").val());
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug(data.responseText);
                    }
                    //alert("Erro: " + data);
                }

            });
        } else {
            $(".ava_resultados").empty().hide();
        }

    });
    /********************************************************************
    * Pesquisa da Barra Superior Acesso Rapido - FIM
    ********************************************************************/

    /********************************************************************
    * Pesquisa da Busca Acesso Rapido
    ********************************************************************/
    //    $("#strpc_acessorapido").live('focus', function () {
    //        if ($(this).val() == "Pesquisar") {
    //            $(this).val("");
    //        }
    //    });
    //    $("#strpc_acessorapido").live('blur', function () {
    //        if ($(this).val() == "") {
    //            $(this).val("Pesquisar");
    //        }
    //    });
    $("#go_button").live('click', function () {

        $("#ava_listacompleta").empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            url: "/AVA/AcessoRapido/AcessoRapido/PesquisaAcessoRapido/" + $("#strpc_acessorapido").val(),
            success: function (data) {
                $("#ava_listacompleta").empty().html(data);
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Erro");
                }
                //alert("Erro");
            }

        });

    });
    /********************************************************************
    * Pesquisa da Busca Acesso Rapido - FIM
    ********************************************************************/

    /********************************************************************
    * LISTA LINKS RAPIDOS
    ********************************************************************/

    // se ok na busca do usuario criptografado
    if (idUsuarioCript != 0) {
        try {
            var linksRapidosValue = $.jStorage.get("linksRapidos" + idUsuarioCript);
        } catch (err) {
            var linksRapidosValue = '';
        }

        //console.log(barraSSValue);
        if (!linksRapidosValue) {

            $.ajax({
                url: "/AVA/Barras/Home/ListaAcessoRapido",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                success: function (data) {
                    linksRapidosValue = data;

                },
                error: function (data) {
                    linksRapidosValue = data.status;
                }
            });

            try {
                $.jStorage.set("linksRapidos" + idUsuarioCript, linksRapidosValue);
                $.jStorage.setTTL("linksRapidos" + idUsuarioCript, 600000); // expires in 10 minutos
            } catch (err) {
            }

        }
        $("#lista_links_rapidos").html(linksRapidosValue);

    } else {

        jQuery(function ($) {
            $.ajax({
                url: "/AVA/Barras/Home/ListaAcessoRapido",
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                success: function (data) {
                    $("#lista_links_rapidos").html(data);
                },
                error: function (data) {
                    $("#lista_links_rapidos").html(data.status);
                }
            });
        });
    }




    /********************************************************************
    * LISTA NOTICIAS ESCOLA
    ********************************************************************/
    // se ok na busca do usuario criptografado
    if (idUsuarioCript != 0) {
        try {
            var noticiasEscolaValue = $.jStorage.get("noticiasEscola" + idUsuarioCript);
        } catch (err) {
            var noticiasEscolaValue = '';
        }       

        if (!noticiasEscolaValue) {
            
            $.ajax({
                url: "/AVA/Barras/Home/ListaNoticiasEscola",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                success: function (data) {
                    console.log('data: ' + data);
                    noticiasEscolaValue = data;
                },
                error: function (data) {
                    noticiasEscolaValue = data.status;
                }
            });            

            try {
                $.jStorage.set("noticiasEscola" + idUsuarioCript, noticiasEscolaValue);
                $.jStorage.setTTL("noticiasEscola" + idUsuarioCript, 600000); // expires in 10 minutos
            } catch (err) {
            }

        }

        $("#lista_noticias").html(noticiasEscolaValue);

    } else {
        console.log('noticiasEscolaValue: AJAX');
        $.ajax({
            url: "/AVA/Barras/Home/ListaNoticiasEscola",
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            success: function (data) {
                $("#lista_noticias").html(data);
            },
            error: function (data) {
                $("#lista_noticias").html(data.status);
            }
        });

    }


    $(".editar_Perfil").live("click", function (e) {
        $("#ava_editar_perfil_usuario").trigger("click");
        e.preventDefault;
    });





});


/***************************************************************************************************************
* FUNÇÕES DA BARRASS
***************************************************************************************************************/
function vejaTudo() {
    location.href = '/AVA/AcessoRapido';
    /*$.ajax({
    url: "/AVA/AcessoRapido/AcessoRapido/ListaCompletaAcessoRapido",
    success: function (data) {

    $("#ava_wrap").empty().show().html(data);
    $("#ava_dropdown").hide();
    },
    error: function () {
    alert("Erro");
    }

    });*/
}

function atualizaVersaoUsuarioAVA() {
    $.post("/avaliacoesonline/includes/ajax_grava_versao_usuario.asp?bolNova=0", function () {
        if (retorno = "1") {
            location.href = "/avaliacoes/";
        }
    });
}

/********************************************************************
* MENU A-Z
********************************************************************/
function MM_jumpMenu(targ, selObj) {
    if (selObj.options[selObj.selectedIndex].value == "#") {
        selObj.selectedIndex = 0;
    }
    else {
        eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'");
    }
}

/********************************************************************
* LOGOUT
********************************************************************/
function logoutAVA() {

    var arrayIndicesJStorage = $.jStorage.index();

    for (i = 0; i < arrayIndicesJStorage.length; i++) {        
        if (arrayIndicesJStorage[i].indexOf(idUsuarioCript) > 0) {
            $.jStorage.deleteKey(arrayIndicesJStorage[i]);
        }
    }

    location.href = "/AVA/Login/Home/Logout";    
}




