jQuery(function ($) {

    if (idUsuarioCript == 0) {
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


    /**************************************************************************************************************************************
    * Carrega barra da esquerda
    ***************************************************************************************************************************************/

    var intTipoPerfil = -1; // se -1 = reduzido, se 0 ou 1 perfil publico normal

    /********************************************************************
    * Verifica se é um perfil publico ou reduzido
    ********************************************************************/
    //alert('idUsuarioPublico: ' + idUsuarioPublico);
    if (idUsuarioPublico != "") {
        $.ajax({
            url: "/AVA/Perfil/Home/VerificaTipoPerfilUsuarioUsuario/",
            async: false,
            data: { "strLogin": idUsuarioPublico },
            success: function (data) {
                intTipoPerfil = data;
            },
            error: function (data) {
                intTipoPerfil = -1;
            }

        })
    } else {
        intTipoPerfil = 1;
    }



    /********************************************************************
    * Carrega Dados Perfil
    ********************************************************************/
    $("#dadosPerfil").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

    bolBlog = false;
    bolBlogCarregado = '';

    if (_controller == 'Home' && idUsuarioPublico == "") {
        _url_perfil = "/AVA/Barras/Home/Mural/";
    } else if (_controller == 'MeuPerfil') {
        _url_perfil = "/AVA/Barras/Home/MeuPerfil/";
        bolBlog = true;
    } else {
        _url_perfil = "/AVA/Barras/Home/DadosPerfil?id=" + idUsuarioPublico + "&tipo=" + intTipoPerfil;
        bolBlog = true;
    }

    $.ajax({
        url: _url_perfil,
        cache: false,
        success: function (data) {
            $("#dadosPerfil").html(data);
            if (bolBlog) {

                $('#meus_blogs_ava').click(function (event) {
                    if (!($(event.target).closest('ul').hasClass('sub_menu_perfil'))) {
                        event.preventDefault();
                    }

                    _this_b = $(this);

                    if (bolBlogCarregado == '') {
                        $.post('/rede/includes/blogsava.asp', { 'idUsuario': $("#dadosPerfil").find('#id_usuario_blog').val() }, function (data) {
                            _this_b.find('a').after(data);
                            bolBlogCarregado = data;
                            _this_b.find('ul.sub_menu_perfil').slideDown();
                        });
                    } else {
                        if ($('.sub_menu_perfil').css('display') == 'none') {
                            _this_b.find('ul.sub_menu_perfil').slideDown();

                        } else {

                            if (!($(event.target).closest('ul').hasClass('sub_menu_perfil'))) {
                                _this_b.find('ul.sub_menu_perfil').slideUp();
                            }
                        }
                    }

                });

            }
        },
        error: function (data) {
            if (data.status == 0) {
                $("#dadosPerfil").empty();
            } else {
                console.debug("Ocorreu um erro na busca do perfil do usuário.");
            }
        }

    });

    /********************************************************************
    * Botão de busca de pessoas
    ********************************************************************/
    var t = $("#abrebuscapessoas");
    var obj = function () {

        $("#ava_contentbuscapessoas #ava_loader").css("display", "none")

        $("#txtPesquisaGeralAva").live('focus', function () {
            if ($(this).val() == "Procurar por nome") {
                $(this).val("");
            }
        })

        $("#txtPesquisaGeralAva").live('blur', function () {
            if ($(this).val() == "") {
                $(this).val("Procurar por nome");
            }
        })

        $("#buscarpessoas").bind('click', function () {
            $("#ava_contentbuscapessoas #ava_loader").css("display", "");
            $("#ava_contentbuscapessoas #msgInicio").css("display", "none");
            $campo = $("#txtPesquisaGeralAva").val()
            if ($campo != "" || $campo != "Procurar por nome") {
                $("#ava_contentbuscapessoas div").remove();
                $urlBuscaPessoas = '/AVA/Barras/Home/PesquisaGeral/' + $campo;
                retornaJsonBuscaPessoas($urlBuscaPessoas);
            }
        })
        $("#txtPesquisaGeralAva").bind("keypress", function (event) {
            if (event.keyCode == 13) {
                $("#buscarpessoas").trigger("click");
                event.preventDefault();
            }
        });
    } //function fim obj

    montaLightBox(t, obj)


    /********************************************************************
    * Verifica se é responsável
    ********************************************************************/
    // se ok na busca do usuario criptografado
    if (idUsuarioCript != 0) {
        var EResponsavelValue = $.jStorage.get("VerificaSeEResponsavel" + idUsuarioCript);

        if (!EResponsavelValue) {

            $.ajax({
                url: "/AVA/Barras/Home/VerificaSeEResponsavel/",
                data: { "strLogin": idUsuarioPublico },
                async: false,
                success: function (bolPai_bolEduc) {
                    EResponsavelValue = bolPai_bolEduc;
                }
            });

            $.jStorage.set("VerificaSeEResponsavel" + idUsuarioCript, EResponsavelValue);
            $.jStorage.setTTL("VerificaSeEResponsavel" + idUsuarioCript, 600000); // expires in 10 minutos

        }

    }

    //console.log("VerificaSeEResponsavel: " + EResponsavelValue);
    // se for perfil publico carregas as listas    
    if (intTipoPerfil >= 0) {


        /********************************************************************
        * Carrega filhos
        ********************************************************************/

        if (idUsuarioCript != 0) {
            var EResponsavelValue = $.jStorage.get("VerificaSeEResponsavel" + idUsuarioCript);

            if (EResponsavelValue) {
                var arrPapel = EResponsavelValue.split('_');
                //console.log("É responsavel 1");
                if ((arrPapel[0] == "True" && arrPapel[1] == "True") || arrPapel[0] == "True") {
                    CarregaFilhos();
                }
            }
            else {
                //console.log("Não é responsavel 1");
                $.ajax({
                    url: "/AVA/Barras/Home/VerificaSeEResponsavel/",
                    data: { "strLogin": idUsuarioPublico },
                    success: function (bolPai_bolEduc) {
                        var arrPapel = bolPai_bolEduc.split('_');

                        if ((arrPapel[0] == "True" && arrPapel[1] == "True") || arrPapel[0] == "True") {

                            CarregaFilhos();

                        } //se data(true) 
                    },
                    error: function (data) {
                        if (data.status == 0) {
                            $("#sFilhos").empty();
                        } else {
                            $("#sFilhos").html("erro ao verificar filhos");
                        }
                    }
                });
            }
        }

        /********************************************************************
        * Carrega seguidores
        ********************************************************************/
        var strUrlAtualBarraEsq = location;
        var intPosPerfil = strUrlAtualBarraEsq.toString().indexOf("Perfil", 0);

        if (intPosPerfil < 0) {

            $("#sSeguidores").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

            if (idUsuarioCript != 0) {
                var seguidoresValue = $.jStorage.get("seguidores" + idUsuarioCript);

                if (!seguidoresValue) {

                    $urlSeguidores = "/AVA/Barras/Home/Seguidores/" + idUsuarioPublico;
                    $.ajax({
                        url: $urlSeguidores,
                        data: 'strLogin=' + idUsuarioPublico,
                        async: false,
                        success: function (data) {
                            seguidoresValue = data;

                        },
                        error: function (data) {
                            if (data.status == 0) {
                                $("#sSeguidores").empty();
                            } else {
                                seguidoresValue = "erro ao buscar seguidores";
                            }
                        }
                    });

                    $("#sSeguidores").html(seguidoresValue);
                    $.jStorage.set("seguidores" + idUsuarioCript, seguidoresValue);
                    $.jStorage.setTTL("seguidores" + idUsuarioCript, 600000); // expires in 10 minutos

                } else {

                    $("#sSeguidores").html(seguidoresValue);
                }

                $("#vertodosseguidores").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=3");

                var t = $("#vertodosseguidores");
                var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {

                    $urlSeguidoresCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=3&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=";
                    retornaJson($urlSeguidoresCompleto);

                } //function
                }

                lightBoxAVA(t, o);

                $(".aes4 header h1 .thumbs_lists").click(function (e) {
                    e.preventDefault();

                    $strClass = $(".aes4 ul").attr("class");
                    if ($strClass == "clearfix thumbs") {
                        $(".aes4 ul").attr("class", "clearfix");
                        $(".aes4 ul li").prepend("<div class=\"white_shadow\"></div>");
                        $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center 1px #FFFFFF");
                    } else {
                        $(".aes4 ul").attr("class", "clearfix thumbs");
                        $(".aes4 ul li").find("div").remove();
                        $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center -16px #FFFFFF");
                    }
                })
            } else {

                $urlSeguidores = "/AVA/Barras/Home/Seguidores/" + idUsuarioPublico;
                $.ajax({
                    url: $urlSeguidores,
                    data: 'strLogin=' + idUsuarioPublico,
                    success: function (data) {
                        $("#sSeguidores").html(data);

                        $("#vertodosseguidores").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=3");

                        var t = $("#vertodosseguidores");
                        var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {

                            $urlSeguidoresCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=3&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=";
                            retornaJson($urlSeguidoresCompleto);

                        } //function
                        }

                        lightBoxAVA(t, o);

                        $(".aes4 header h1 .thumbs_lists").click(function (e) {
                            e.preventDefault();

                            $strClass = $(".aes4 ul").attr("class");
                            if ($strClass == "clearfix thumbs") {
                                $(".aes4 ul").attr("class", "clearfix");
                                $(".aes4 ul li").prepend("<div class=\"white_shadow\"></div>");
                                $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center 1px #FFFFFF");
                            } else {
                                $(".aes4 ul").attr("class", "clearfix thumbs");
                                $(".aes4 ul li").find("div").remove();
                                $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center -16px #FFFFFF");
                            }
                        })

                    },
                    error: function (data) {
                        if (data.status == 0) {
                            $("#sSeguidores").empty();
                        } else {
                            $("#sSeguidores").html("erro ao buscar seguidores");
                        }
                    }
                });
            }

        } else {

            $('#sSeguidores').css('border-bottom', 0);
        }

        /********************************************************************
        * Carrega seguidos
        ********************************************************************/
        $("#sSeguidos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        CarregaSeguidos();


        /********************************************************************
        * Carrega educadores e turma
        ********************************************************************/
        var EResponsavelValue = $.jStorage.get("VerificaSeEResponsavel" + idUsuarioCript);
        if (EResponsavelValue) {
            var arrPapel = EResponsavelValue.split('_');

            if (arrPapel[1] == "True" || (arrPapel[0] == "False" && arrPapel[1] == "False")) { //é educador ou aluno
                carregaEducadores(idUsuarioPublico);
                carregaTurma(idUsuarioPublico);
            } else if (arrPapel[0] == "True" && idUsuarioPublico == "") {//é responsável e esta no mural
                carregaEducadores("");
                carregaTurma("");
            } else {
                $("#sEducadores").hide();
                $("#sTurma").hide();
            }

        } else {
            $.ajax({
                url: "/AVA/Barras/Home/VerificaSeEResponsavel/",
                data: { "strLogin": idUsuarioPublico },
                success: function (bolPai_bolEduc) {
                    var arrPapel = bolPai_bolEduc.split('_');

                    if (arrPapel[1] == "True" || (arrPapel[0] == "False" && arrPapel[1] == "False")) { //é educador ou aluno
                        carregaEducadores(idUsuarioPublico);
                        carregaTurma(idUsuarioPublico);
                    } else if (arrPapel[0] == "True" && idUsuarioPublico == "") {//é responsável e esta no mural
                        carregaEducadores("");
                        carregaTurma("");
                    } else {
                        $("#sEducadores").hide();
                        $("#sTurma").hide();
                    }
                }
            });
        }


    } else {
        $('#sEducadores').css('display', 'none');
        $('#sTurma').css('display', 'none');
        $('#sFilhos').css('display', 'none');
        $('#sSeguidos').css('display', 'none');
        $('#sSeguidores').css('display', 'none');
        $('#sProcuraPessoas').css('display', 'none');
        $('#dadosPerfil').css('border-bottom', '0px');


    } // fim verifica intTipoPerfil

    /***************************************************************************************************************************************
    * fim barra da esquerda
    ***************************************************************************************************************************************/

    /********************************************************************
    * Carrega Hoje e dia Avinha
    ********************************************************************/
    if (location.href.toLowerCase().indexOf("avinha") > -1) {
        $.ajax({
            url: "/ed_infantil_new/includes/inc_edinf_2010_meninomaluquinho.asp",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (data) {
                $("#hojeEDia").html(data);
            },
            error: function (data) {
                console.debug(data);
            }
        });
        /*$.post("/ed_infantil_new/includes/inc_edinf_2010_meninomaluquinho.asp", function (data) {
        data = escape(data);
        $("#hojeEDia").html(data);
        });*/
    }
});



/*******************************************************************
*				FUNÇÕES DA BARRA DA ESQUERDA
*******************************************************************/
function seguir(idSeguidor, idPerseguido) {
    
    $.jStorage.deleteKey("seguidos" + idUsuarioCript);

    $("#btseg_" + idPerseguido).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.post('/AVA/Barras/Home/Seguir/?idSeguidor=' + idSeguidor + '&idPerseguido=' + idPerseguido, function (data) {

        if (data == "ok") {
            $linkhref = "javascript: parardeseguir(" + idSeguidor + "," + idPerseguido + ")";
            $("#btseg_" + idPerseguido).attr("href", $linkhref);
            $("#btseg_" + idPerseguido).attr("class", "bt_seguir");
            $("#btseg_" + idPerseguido).html('<span class="ava_seguindo">seguindo</span><span class="ava_parardeseguir">parar de seguir</span><span class="bt_seguir"></span>');
            $("#btseguir_perfil_" + idPerseguido).attr("href", $linkhref);
            $("#btseguir_perfil_" + idPerseguido).html("<span><div class=\"icon_li segue\"></div>Seguindo</span><span><div class=\"icon_li seguenot\"></div>Parar de seguir</span>").children("span:first").addClass("segue_span").css("display", "block").next().addClass("seguenot_span").css("display", "none");
        } else {
            alert("erro ao seguir usuário!")
        }

    });

}

jQuery(function ($) {
    $("#dadosPerfil").delegate('[id^=btseguir_perfil_]', 'mouseover', function () {
        $("[id^=btseguir_perfil_]").children("span:first").css("display", "none").next().css("display", "block");
    });
    $("#dadosPerfil").delegate('[id^=btseguir_perfil_]', 'mouseout', function () {
        $("[id^=btseguir_perfil_]").children("span:first").css("display", "block").next().css("display", "none");
    });
});



function parardeseguir(idSeguidor, idPerseguido) {

    $.jStorage.deleteKey("seguidores" + idUsuarioCript);
    $("#btseg_" + idPerseguido).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.post('/AVA/Barras/Home/PararDeSeguir/?idSeguidor=' + idSeguidor + '&idPerseguido=' + idPerseguido, function (data) {

        if (data == "ok") {
            $linkhref = "javascript: seguir(" + idSeguidor + "," + idPerseguido + ")";
            $("#btseg_" + idPerseguido).attr("href", $linkhref);
            $("#btseg_" + idPerseguido).attr("class", "bt_seguir s_Indo")
            $("#btseg_" + idPerseguido).html('seguir<span class="bt_seguir"></span>');
            $("#btseguir_perfil_" + idPerseguido).attr("href", $linkhref);
            $("#btseguir_perfil_" + idPerseguido).html("<div class=\"icon_li seguir\"></div>seguir");

        } else {
            alert("erro ao parar de seguir usuário!")
        }
    });
}

function retornaJson(caminho) {
    $.getJSON(caminho, null, function (data) {

        var xml = null;
        xml = data.Result;

        $("#myContentTemplate").tmpl(data).appendTo("#ava_contentlista");
        $("#ava_contentlista #ava_loader").css("display", "none");

        $("#txtFiltroAva").live('keyup', function () {
            if ($(this).attr('idusuario')) {
                _id = $(this).attr('idusuario')
            } else {
                _id = 0
            }
            FiltrarUsuario('#ava_contentlista', xml, $(this).val(), _id);
        });

        $("#txtFiltroAva").live('focus', function () {
            if ($(this).val() == "Filtrar por nome") {
                $(this).val("");
            }
        })

        $("#txtFiltroAva").live('blur', function () {
            if ($(this).val() == "") {
                $(this).val("Filtrar por nome");
            }
        })

    })//getJson
}

function retornaJsonBuscaPessoas(caminho) {

    $.ajax({
        dataType: 'json',
        type: 'get',
        url: caminho,
        success: function (data) {
            $("#ava_contentbuscapessoas #ava_loader").css("display", "none");
            if (data.Result.length > 0) {
                $("#myContentTemplate").tmpl(data).appendTo("#ava_contentbuscapessoas");
            } else {
                $("#ava_contentbuscapessoas").append("<div class='letter-spacing'>Nenhum resultado encontrado.</div>")
            }
        },
        error: function (e) {
            console.debug(e);
        }
    });

}

function procurarpessoas(busca) {

    var t = $("#abrebuscapessoasaux");
    var obj = function () {
        $("#ava_contentbuscapessoas").html("<img id='ava_loader' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

        $("#txtPesquisaGeralAva").live('focus', function () {
            if ($(this).val() == "Procurar por nome") {
                $(this).val("");
            }
        })

        $("#txtPesquisaGeralAva").live('blur', function () {
            if ($(this).val() == "") {
                $(this).val("Procurar por nome");
            }
        })

        $("#buscarpessoas").bind('click', function () {
            $("#ava_contentbuscapessoas #ava_loader").css("display", "");
            $campo = $("#txtPesquisaGeralAva").val()
            if ($campo != "" || $campo != "Procurar por nome") {
                $("#ava_contentbuscapessoas div").remove();
                $urlBuscaPessoas = '/AVA/Barras/Home/PesquisaGeral/' + $campo;
                retornaJsonBuscaPessoas($urlBuscaPessoas);
            }
        })

        $("#txtPesquisaGeralAva").val(busca);
        $urlBuscaPessoas = '/AVA/Barras/Home/PesquisaGeral/' + busca;
        retornaJsonBuscaPessoas($urlBuscaPessoas);

    }    //function fim obj

    montaLightBox(t, obj)

    $('#abrebuscapessoasaux').click();

}

function FiltrarUsuario(e, j, s, u) {
    $(e).html("");

    if (s) {
        var bolTemUser = false;
        for (r = 0; r < j.length; r++) {

            if ((j[r].strNome.toLowerCase().indexOf(s.toLowerCase()) > -1)) {

                if (j[r].id != u) {
                    bolTemUser = true;

                    var strHTML = "";
                    strHTML = populaFiltro(j[r]);

                    $(e).append(strBuilder);
                }

            }
        }

        if (!bolTemUser) {
            var palavra = "'" + s + "'"
            $(e).html('<span class="letter-spacing">Nenhum resultado encontrado. Que tal <a href="javascript: procurarpessoas(' + palavra + ')">procurar pessoas?</a></span>');
        }

    } else {

        for (r = 0; r < j.length; r++) {

            var strHTML = "";
            if (j[r].id != u) {
                strHTML = populaFiltro(j[r]);
                $(e).append(strBuilder);
            }
        }

    }

}

function populaFiltro(vJson) {

    var strHTML = "";
    var strFoto = "";

    strBuilder = '<div class="carteirinha" id="cart_' + vJson.id + '"><div class="in_cT">';

    if (vJson.bolEducador) {
        strBuilder += '<div class="souProf"><span>Professor</span></div>';
    }

    if (vJson.strFoto.length <= 0) {
        strFoto = "/AVA/StaticContent/Common/img/perfil/avatar.jpg"
    } else {
        strFoto = vJson.strFoto;
    }

    strBuilder += '<a href="/AVA/Perfil/Home/Index/' + vJson.strLogin + '"><img src="' + strFoto + '" width="55" height="55" alt="avatar">' + vJson.strNome.substring(0, 9) + '</a>';

    if (vJson.bolSigoAuto) {
        strBuilder += '<a class=" bt_seguir s_IdoForever" href="#">seguindo<span class="bt_seguir"></span></a>'
    } else if (vJson.bolPossoSeguir && !vJson.bolEstouSeguindo) {
        strBuilder += '<a id="btseg_' + vJson.id + '" class="bt_seguir s_Indo" href="javascript: seguir(' + vJson.idSeguidor + ',' + vJson.id + ')">seguir<span class="bt_seguir"></span></a>';
    } else {
        strBuilder += '<a id="btseg_' + vJson.id + '" href="javascript: parardeseguir(' + vJson.idSeguidor + ',' + vJson.id + ')" class="bt_seguir"><span class="ava_seguindo">seguindo</span><span class="ava_parardeseguir">parar de seguir</span><span class="bt_seguir"></span></a>';
    }

    strBuilder += '</div></div>';

    return strBuilder;

}

function montaLightBox(t, obj) {
    var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': obj
    }

    lightBoxAVA(t, o);
}

function carregaEducadores(strLogin) {
    $("#sEducadores").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

    if (idUsuarioCript != 0) {

        var listaEducadoresValue = $.jStorage.get("listaEducadores" + strLogin + idUsuarioCript);
        if (!listaEducadoresValue) {
            $urlEducadores = "/AVA/Barras/Home/Educadores/" + strLogin;
            $.ajax({
                url: $urlEducadores,
                data: 'strLogin=' + strLogin,
                async: false,
                success: function (data) {
                    listaEducadoresValue = data;
                },
                error: function (data) {
                    if (data.status == 0) {
                        $("#sEducadores").empty();
                        istaEducadoresValue = "empty";
                    } else {
                        listaEducadoresValue = "erro ao buscar educadores";
                    }
                }
            });
            $.jStorage.set("listaEducadores" + strLogin + idUsuarioCript, listaEducadoresValue);
            $.jStorage.setTTL("listaEducadores" + strLogin + idUsuarioCript, 600000); // expires in 10 minutos

        }        

    } else {
        $urlEducadores = "/AVA/Barras/Home/Educadores/" + strLogin;
        $.ajax({
            url: $urlEducadores,
            data: 'strLogin=' + strLogin,
            success: function (data) {

                $("#sEducadores").html(data);               
            },
            error: function (data) {
                //console.debug("erro ao buscar educadores");
                if (data.status == 0) {
                    $("#sEducadores").empty();
                } else {
                    $("#sEducadores").html("erro ao buscar educadores");
                }
            }
        });
    }

    $("#sEducadores").html(listaEducadoresValue);

    $("#vertodoseducadores").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=1");

    var t = $("#vertodoseducadores");
    var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {

        $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + strLogin + "&strLogin=" + strLogin + "&idTurma=";
        retornaJson($urlEducCompleto);

    } //function
    }

    lightBoxAVA(t, o);

    $(".aes1 header h1 .thumbs_lists").click(function (e) {
        e.preventDefault();

        $strClass = $(".aes1 ul").attr("class");
        if ($strClass == "clearfix thumbs") {
            $(".aes1 ul").attr("class", "clearfix");
            $(".aes1 ul li").prepend("<div class=\"white_shadow\"></div>");
            $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center 1px #FFFFFF");
        } else {
            $(".aes1 ul").attr("class", "clearfix thumbs");
            $(".aes1 ul li").find("div").remove();
            $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center -16px #FFFFFF");
        }
    })




}

function carregaTurma(strLogin) {

    $("#sTurma").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $urlTurma = "/AVA/Barras/Home/Turma/";
    var $idTurmaAux = 0;

    $(".vertodosturma").live('click', function () {

        if ($(this).find('img').attr("idturma")) {
            $idTurmaAux = $(this).find('img').attr("idturma");
        } else {
            $idTurmaAux = $(this).attr("idturma");
        }

        $.ajax({
            url: "/ava/barras/home/RetornaNomeTurma/" + $idTurmaAux,
            success: function (data) {
                $("#titListaUsuariosAva").append(" " + data)
            },
            error: function (data) {
                if (data.status == 0) {
                    $("#sTurma").empty();
                } else {
                    $("#sTurma").html("erro ao buscar nome de turma");
                }
            }
        });

    });

    if (idUsuarioCript != 0) {

        var carregaTurmaValue = $.jStorage.get("carregaTurma" + strLogin + idUsuarioCript);
        if (!carregaTurmaValue) {

            $.ajax({
                url: $urlTurma,
                data: 'strLogin=' + strLogin,
                async: false,
                success: function (data) {
                    carregaTurmaValue = data;
                },
                error: function (data) {
                    if (data.status == 0) {
                        $("#sTurma").empty();
                    } else {
                        carregaTurmaValue = "erro ao buscar Turma/Aluno Turma";
                    }
                }
            });

            $.jStorage.set("carregaTurma" + strLogin + idUsuarioCript, carregaTurmaValue);
            $.jStorage.setTTL("carregaTurma" + strLogin + idUsuarioCript, 600000); // expires in 10 minutos

        }
       

    } else {
        $.ajax({
            url: $urlTurma,
            data: 'strLogin=' + strLogin,
            success: function (data) {
                $("#sTurma").html(data);
            },
            error: function (data) {
                if (data.status == 0) {
                    $("#sTurma").empty();
                } else {
                    $("#sTurma").html("erro ao buscar Turma/Aluno Turma");
                }
            }
        });
    }

    $("#sTurma").html(carregaTurmaValue);

    $(".vertodosturma").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=4");

    var t = $(".vertodosturma");
    var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {

        $idTurma = $(this).find('img').attr("idTurma");
        $urlTurmaCompleta = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=4&idPublico=&strLogin=" + strLogin + "&idTurma=" + $idTurmaAux;
        retornaJson($urlTurmaCompleta);

    } //function
    }

    lightBoxAVA(t, o);

    $(".aes2 header a.thumbs_lists").click(function (e) {
        e.preventDefault();

        $strClass = $(".aes2 ul").attr("class");
        if ($strClass == "clearfix thumbs") {
            $(".aes2 ul").attr("class", "clearfix");
            $(".aes2 ul li").prepend("<div class=\"white_shadow\"></div>");
            $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center 1px #FFFFFF");
        } else {
            $(".aes2 ul").attr("class", "clearfix thumbs");
            $(".aes2 ul li").find("div").remove();
            $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center -16px #FFFFFF");
        }
    })


}

function CarregaFilhos() {
    $("#sFilhos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", "");

    if (idUsuarioCript != 0) {
        var listaFilhosValue = $.jStorage.get("listaFilhos" + idUsuarioCript);
        if (!listaFilhosValue) {

            $.ajax({
                url: "/AVA/Barras/Home/Filhos/",
                data: { "strLogin": idUsuarioPublico },
                async: false,
                success: function (data) {
                    listaFilhosValue = data;
                },
                error: function (data) {
                    if (data.status == 0) {
                        $("#sFilhos").empty();
                    } else {
                        listaFilhosValue = "erro ao buscar filhos";
                    }

                }
            });

            $.jStorage.set("listaFilhos" + idUsuarioCript, listaFilhosValue);
            $.jStorage.setTTL("listaFilhos" + idUsuarioCript, 600000); // expires in 10 minutos
        }
        $("#sFilhos").html(listaFilhosValue);

        $(".aes5 header h1 .thumbs_lists").click(function (e) {
            e.preventDefault();

            $strClass = $(".aes5 ul").attr("class");
            if ($strClass == "clearfix thumbs") {
                $(".aes5 ul").attr("class", "clearfix");
                $(".aes5 ul li").prepend("<div class=\"white_shadow\"></div>");
                $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center 1px #FFFFFF");
            } else {
                $(".aes5 ul").attr("class", "clearfix thumbs");
                $(".aes5 ul li").find("div").remove();
                $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center -16px #FFFFFF");
            }
        });

    } else {

        $.ajax({
            url: "/AVA/Barras/Home/Filhos/",
            data: { "strLogin": idUsuarioPublico },
            async: true,
            success: function (data) {
                $("#sFilhos").html(data);

                $(".aes5 header h1 .thumbs_lists").click(function (e) {
                    e.preventDefault();

                    $strClass = $(".aes5 ul").attr("class");
                    if ($strClass == "clearfix thumbs") {
                        $(".aes5 ul").attr("class", "clearfix");
                        $(".aes5 ul li").prepend("<div class=\"white_shadow\"></div>");
                        $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center 1px #FFFFFF");
                    } else {
                        $(".aes5 ul").attr("class", "clearfix thumbs");
                        $(".aes5 ul li").find("div").remove();
                        $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center -16px #FFFFFF");
                    }
                });
            },
            error: function (data) {
                if (data.status == 0) {
                    $("#sFilhos").empty();
                } else {
                    listaFilhosValue = "erro ao buscar filhos";
                }
            }
        });
    }
}

function CarregaSeguidos() {

    if (idUsuarioCript != 0) {
        var seguidosValue = $.jStorage.get("seguidos" + idUsuarioPublico + idUsuarioCript);

        if (!seguidosValue) {
            $urlSeguidos = "/AVA/Barras/Home/Seguidos/" + idUsuarioPublico;
            $.ajax({
                url: $urlSeguidos,
                data: 'strLogin=' + idUsuarioPublico,
                async: false,
                success: function (data) {
                    //$("#sSeguidos").html(data);
                    seguidosValue = data;
                },
                error: function (data) {
                    if (data.status == 0) {
                        $("#sSeguidos").empty();
                    } else {
                        $("#sSeguidos").html("erro ao buscar seguidos");
                    }
                }
            });

            $.jStorage.set("seguidos" + idUsuarioPublico + idUsuarioCript, seguidosValue);
            $.jStorage.setTTL("seguidos" + idUsuarioPublico + idUsuarioCript, 600000); // expires in 10 minutos

        }

        $("#sSeguidos").html(seguidosValue);

        $("#vertodosseguidos").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=2");

        var t = $("#vertodosseguidos");
        var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {

            $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=";
            retornaJson($urlSeguidosCompleto);

        } //function
        }

        lightBoxAVA(t, o);

        $(".aes3 header h1 .thumbs_lists").click(function (e) {
            e.preventDefault();

            $strClass = $(".aes3 ul").attr("class");
            if ($strClass == "clearfix thumbs") {
                $(".aes3 ul").attr("class", "clearfix");
                $(".aes3 ul li").prepend("<div class=\"white_shadow\"></div>");
                $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center 1px #FFFFFF");
            } else {
                $(".aes3 ul").attr("class", "clearfix thumbs");
                $(".aes3 ul li").find("div").remove();
                $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center -16px #FFFFFF");
            }
        })

    } else {
        $urlSeguidos = "/AVA/Barras/Home/Seguidos/" + idUsuarioPublico;
        $.ajax({
            url: $urlSeguidos,
            data: 'strLogin=' + idUsuarioPublico,
            success: function (data) {
                $("#sSeguidos").html(data);

                $("#vertodosseguidos").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=2");

                var t = $("#vertodosseguidos");
                var o = { 'autoDimensions': false, 'width': 700, 'height': 470, 'onComplete': function () {

                    $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=";
                    retornaJson($urlSeguidosCompleto);

                } //function
                }

                lightBoxAVA(t, o);

                $(".aes3 header h1 .thumbs_lists").click(function (e) {
                    e.preventDefault();

                    $strClass = $(".aes3 ul").attr("class");
                    if ($strClass == "clearfix thumbs") {
                        $(".aes3 ul").attr("class", "clearfix");
                        $(".aes3 ul li").prepend("<div class=\"white_shadow\"></div>");
                        $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center 1px #FFFFFF");
                    } else {
                        $(".aes3 ul").attr("class", "clearfix thumbs");
                        $(".aes3 ul li").find("div").remove();
                        $(this).css("background", "url('/AVA/StaticContent/Common/img/perfil/thumbs_lists.png') no-repeat scroll center -16px #FFFFFF");
                    }
                })

            },
            error: function (data) {
                if (data.status == 0) {
                    $("#sSeguidos").empty();
                } else {
                    $("#sSeguidos").html("erro ao buscar seguidos");
                }
            }
        });
    }
}