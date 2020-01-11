
function montaPreviewImagemMensagemRapida(obj) {

    var $caixa = $(".dialogo_box .preview_post.imagens .engloba_classe .mCSB_container");

    if (obj !== undefined && obj != null && obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            var caminhoImagem = obj[i].diretorio;
            var thumb = obj[i].thumbnail + obj[i].extensao;
            var $div = $("<div />").addClass("prev_imagem").data("idarquivo", obj[i].idArquivo);
            var $img = $("<img />").attr("src", caminhoImagem + "/" + thumb).attr("width", "99").attr("height", "99").attr("alt", obj[i].nome);
            var $a = $("<a />").addClass("remover_multimidia").attr("href", "javascript:void(0);");
            var $span = $("<span />").addClass("FontAwesome");

            $a.append($span);
            $div.append($img);
            $div.append($a);

            if ($caixa.find(".prev_imagem:first").hasClass("adicionar")) {
                $caixa.prepend($div);
            } else {
                $caixa.find(".prev_imagem").not(".adicionar").last().after($div);
            }

        }
        $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
    }

}
function montaPreviewFilesMensagemRapida(obj) {

    var $caixa = $(".dialogo_box .preview_post.arquivos .mCSB_container");

    if (obj !== undefined && obj != null && obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {

            var $div = $("<div />").data("idarquivo", obj[i].idArquivo);
            var $divv = $("<div />").addClass("prev_documento");
            var $div3 = $("<div />").addClass("tipo_arquivo");
            var $img = $("<img />").attr("src", "/ava/StaticContent/Common/img/perfil/documento_multimidia.png").attr("width", "32").attr("height", "41");
            var $span = $("<span />").text(obj[i].extensao.substring(1, obj[i].extensao.length));
            var $p = $("<p />").text((obj[i].nome == "" ? obj[i].arquivo : obj[i].nome));
            var $a = $("<a />").attr("href", "#").addClass("remover_multimidia").text("Remover");
            var $spana = $("<span />").addClass("FontAwesome");


            $div3.append($img);
            $div3.append($span);
            $divv.append($div3);
            $divv.append($p);
            $a.prepend($spana);
            $div.append($divv);
            $div.append($a);

            $caixa.find(".adicionar_doc").prev().before($div);

        }
        $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update");
    }
}

var xmlGlobalEscolaTurmas = null;
var xmlGlobalFiltroTurmas = null;
var arrayArquivosUpload;
var arrayArquivosUploadExclusao;

function retornaJson(caminho) {
    //se for turmas - Para admin e Coordenadores
   

        $.getJSON(caminho, null, function (data) {

            var xml = null;
            xml = data.Result;
            xmlGlobal = xml;
            $("#myContentTemplate").tmpl(data).appendTo("#ava_contentlista");
            $("#ava_contentlista #ava_loader").css("display", "none");

            $("#txtFiltroAva").live('keyup', function (e) {

                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    e.preventDefault();
                    return false;
                }


                if ($(this).attr('idusuario')) {
                    _id = $(this).attr('idusuario')
                } else {
                    _id = 0
                }
                //console.log(xml);
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


//parametros: container, xml, pesquisa, idUsuario
function FiltrarUsuario(e, j, s, u) {
    $(e).html("");
    //console.log(j);

    if (s) {
        var bolTemUser = false;
        for (r = 0; r < j.length; r++) {

            if ((j[r].strNome.toLowerCase().indexOf(s.toLowerCase()) > -1) ||
                (j[r].strApelido.toLowerCase().indexOf(s.toLowerCase()) > -1) ||
                (retira_acentos(j[r].strNome).toLowerCase().indexOf(s.toLowerCase()) > -1) ||
                (retira_acentos(j[r].strApelido).toLowerCase().indexOf(s.toLowerCase()) > -1)) {

                if (j[r].id != u) {
                    bolTemUser = true;

                    var strHTML = "";
                    strHTML = populaFiltro(j[r]);

                    $(e).append(strBuilder);
                }

            }
        }

        if (!bolTemUser) {
            var htmlTitulo = $("#titListaUsuariosAva").clone();
            htmlTitulo.find("span").remove();
            var strTitulo = htmlTitulo.text();

            var palavra = "'" + s + "'"
            $(e).html('<span class="letter-spacing">Nenhum resultado encontrado na pesquisa de ' + strTitulo + '. Que tal pesquisar <a class="link" href="javascript: procurarpessoas(' + palavra + ')"> outros tipos de usuários?</a></span>');
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

function seguir(idSeguidor, idPerseguido) {

    $.ajax({
        type: 'POST',
        url: "/AVA/Login/Home/UsuarioCript",
        async: true,
        success: function (data) {
            idUsuarioSeguidorCacheado = data;

            $.jStorage.deleteKey("seguidos" + idUsuarioSeguidorCacheado);

            $("#btseg_" + idPerseguido).html("<img class='carregando_seguir' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

            $.post('/AVA/Barras/Home/Seguir/?idSeguidor=' + idSeguidor + '&idPerseguido=' + idPerseguido, function (data) {

                if (data == "ok") {
                    $linkhref = "javascript: parardeseguir(" + idSeguidor + "," + idPerseguido + ")";
                    $("#btseg_" + idPerseguido).attr("href", $linkhref);
                    $("#btseg_" + idPerseguido).attr("class", "bt_seguir");
                    $("#btseg_" + idPerseguido).html('<span class="ava_seguindo"></span><span class="ava_parardeseguir">parar de seguir</span><span class="fontello icoPararSeguir"></span>');
                    $("#btseguir_perfil_" + idPerseguido).attr("href", $linkhref);
                    $("#btseguir_perfil_" + idPerseguido).html("<span><div class=\"fontello icoSeguindo\"></div>Seguindo</span><span><div class=\"fontello icoPararSeguir\"></div>Parar de seguir</span>").children("span:first").addClass("segue_span").css("display", "block").next().addClass("seguenot_span").css("display", "none");

                    if (xmlGlobal.length > 0) {
                        for (var i = 0; i < xmlGlobal.length; i++) {
                            if (xmlGlobal[i].id == idPerseguido) {
                                xmlGlobal[i].bolEstouSeguindo = true;
                                break;
                            }
                        }
                    }

                } else {
                    alert("erro ao seguir usuário!")
                }

            });


        },
        error: function (data) {
            if (data.status != 0) {
                idUsuarioCript = 0;
            }
        }
    });

}

function parardeseguir(idSeguidor, idPerseguido) {

    $.ajax({
        type: 'POST',
        url: "/AVA/Login/Home/UsuarioCript",
        async: true,
        success: function (data) {
            idUsuarioSeguidorCacheado = data;

            $.jStorage.deleteKey("seguidos" + idUsuarioSeguidorCacheado);

            $("#btseg_" + idPerseguido).html("<img class='carregando_seguir' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            $.post('/AVA/Barras/Home/PararDeSeguir/?idSeguidor=' + idSeguidor + '&idPerseguido=' + idPerseguido, function (data) {

                if (data == "ok") {
                    $linkhref = "javascript: seguir(" + idSeguidor + "," + idPerseguido + ")";
                    $("#btseg_" + idPerseguido).attr("href", $linkhref);
                    $("#btseg_" + idPerseguido).attr("class", "bt_seguir s_Indo")
                    $("#btseg_" + idPerseguido).html('seguir<span class="fontello icoSeguir"></span>');
                    $("#btseguir_perfil_" + idPerseguido).attr("href", $linkhref);
                    $("#btseguir_perfil_" + idPerseguido).html("<div class=\"fontello icoSeguir\"></div>seguir");
                    if (xmlGlobal.length > 0) {
                        for (var i = 0; i < xmlGlobal.length; i++) {
                            if (xmlGlobal[i].id == idPerseguido) {
                                xmlGlobal[i].bolEstouSeguindo = false;
                                break;
                            }
                        }
                    }
                } else {
                    alert("erro ao parar de seguir usuário!")
                }
            });


        },
        error: function (data) {
            if (data.status != 0) {
                idUsuarioCript = 0;
            }
        }
    });

}

var jaClicouNoBuscar = false;
function procurarpessoas(busca) {

    var t = $("#abrebuscapessoasaux");
    var obj = function () {
        //$("#ava_contentbuscapessoas").html("<img id='ava_loader' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

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
            $campo = $("#txtPesquisaGeralAva").val();

            if ($campo != "" || $campo != "Procurar por nome") {
                $("#ava_contentbuscapessoas div").remove();
                $urlBuscaPessoas = '/AVA/Barras/Home/PesquisaGeral/'; // +$campo;
                retornaJsonBuscaPessoas($urlBuscaPessoas, $campo);

            }

        });

        $("#ava_loader").hide();

        /*$("#txtPesquisaGeralAva").val(busca);
        $urlBuscaPessoas = '/AVA/Barras/Home/PesquisaGeral/'; // +busca;
        $_busca = busca;
        retornaJsonBuscaPessoas($urlBuscaPessoas, busca);
        */
    }             //function fim obj

    montaLightBox(t, obj)

    $('#abrebuscapessoasaux').click();

}
function populaFiltro(vJson) {
    //console.log(vJson);

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

    if (vJson.strApelido.length > 0)
        strNome = vJson.strApelido
    else
        strNome = vJson.strNome;

    if (strNome.lenght > 10)
        strNome = strNome.substring(0, 9);

    strBuilder += '<a href="/AVA/Perfil/Home/Index/' + vJson.strLogin + '"><img src="' + strFoto + '" width="55" height="55" alt="avatar"><span>' + strNome + '</span></a>';

    if (vJson.bolSigoAuto && vJson.idSeguidor != vJson.id) {
        strBuilder += '<a class=" bt_seguir s_IdoForever txtSeguindoBloqueadoModal" href="#">Seguindo<span class="fontello icoSeguindo"></span></a>'
    } else if (vJson.bolPossoSeguir && !vJson.bolEstouSeguindo && vJson.idSeguidor != vJson.id) {
        strBuilder += '<a id="btseg_' + vJson.id + '" class="bt_seguir s_Indo" href="javascript: seguir(' + vJson.idSeguidor + ',' + vJson.id + ')">seguir<span class="fontello icoSeguir"></span></a>';
    } else if (vJson.bolPossoSeguir && vJson.bolEstouSeguindo && vJson.idSeguidor != vJson.id) {
        strBuilder += '<a id="btseg_' + vJson.id + '" href="javascript: parardeseguir(' + vJson.idSeguidor + ',' + vJson.id + ')" class="bt_seguir"><span class="ava_seguindo"></span><span class="ava_parardeseguir">parar de seguir</span><span class="fontello icoPararSeguir"></span></a>';
    }

    strBuilder += '</div></div>';

    return strBuilder;

}
function montaLightBox(t, obj) {

    var w = 700;
    var h = 470;

    if (t.find('abrebuscapessoasaux')) {
        w = 900;
        h = 530;
    }

    var o = {
        autoSize: false,
        width: w,
        height: h,
        autoResize: false,
        fitToView: false,
        afterShow: obj,
        type: "ajax",
        helpers: {
            overlay: {
                locked: false
            }
        }
    }

    lightBoxAVA(t, o);
}



function CallbackUpload(jsonRetorno) {

    var idFerramenta = jsonRetorno.idFerramenta;
    var idFerramentaTipo = parseInt(jsonRetorno.idFerramentaTipo);
    var idArquivo = jsonRetorno.arrayArquivo[0].id;
    var srcImagem = jsonRetorno.arrayArquivo[0].strDiretorio + "/" + jsonRetorno.arrayArquivo[0].strArquivo + jsonRetorno.arrayArquivo[0].strExtensao;

    //alert(idFerramentaTipo);


    if (idFerramentaTipo == 35) { //Album timeline
        var auxImagens = new Array();


        for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
            var objImagem = {
                bolPaisagem: jsonRetorno.arrayArquivo[i].bolPaisagem,
                bolRetrato: jsonRetorno.arrayArquivo[i].bolRetrato,
                idArquivo: jsonRetorno.arrayArquivo[i].id,
                thumbnail: jsonRetorno.arrayArquivo[i].strThumbnail,
                arquivo: jsonRetorno.arrayArquivo[i].strArquivo,
                nome: jsonRetorno.arrayArquivo[i].strNome,
                descricao: jsonRetorno.arrayArquivo[i].strDescricao,
                diretorio: jsonRetorno.arrayArquivo[i].strDiretorio,
                extensao: jsonRetorno.arrayArquivo[i].strExtensao,
                altura: jsonRetorno.arrayArquivo[i].intAlturaImg,
                largura: jsonRetorno.arrayArquivo[i].intLarguraImg

            };

            objetoImagens.imagens.push(objImagem);

            auxImagens.push(objImagem);
        }

        objetoImagens.imagens.sort(function (a, b) {
            if (b.largura > a.largura)
                return 1;
            return 0;
        });
        objetoImagens.imagens.sort(function (a, b) {
            if (a.largura == b.largura) {
                if (b.altura < a.altura) {
                    return 1;
                }
                return -1;
            }
            return 0;
        });

        /*objetoImagens.imagens.sort(function (a, b) {
        if (b.largura > a.largura || b.altura != a.altura) {
        if (b.altura > a.altura) {
        return 1;
        }
        //return 0;
        }
        if (b.largura < a.largura || b.altura != a.altura) {
        if (b.altura < a.altura) {
        return -1;
        }
        //return 0;
        }
        return 0;
        //return b.largura - a.largura && a.altura - b.altura;
        });*/
        /*objetoImagens.imagens.sort(function (a, b) {
        return a.altura - b.altura;
        });*/
        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
            if (!$("#compartilhar").is(":visible")) {
                $("#compartilhar").show();
            }
            if (!$("#btnCancelarFerramentaMural").is(":visible")) {
                $("#btnCancelarFerramentaMural").show();
                $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
            }
            if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
                $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false);
            }
            if ($("#compartilhar").hasClass("disable")) {
                $("#compartilhar").removeClass("disable").prop("disabled", false);
            }
            if (!$("#seletorMuralDigaLa").is(":visible")) {
                $("#seletorMuralDigaLa").show();
                $("#seletorMuralDigaLa").closest('.sep_digala').show();
            }
            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

            var url = location.href.toLowerCase();
            if (url.indexOf("perfil/home/index") == -1) {

                preparaAvaSelector();
            } else {
                $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
            }
        } else {

            $("#compartilhar").addClass("disable").prop("disabled", true);
        }


        if (auxImagens !== undefined && auxImagens != null && auxImagens.length > 0) {
            if (!$(".dialogo .dialogo_box .preview_post.imagens").is(":visible")) {
                $(".dialogo .dialogo_box .preview_post.imagens").show();

            }
            montaPreviewImagemMensagemRapida(auxImagens);
            if ($(".mensagem_multimidia").is(":visible")) {
                $(".mensagem_multimidia").hide();
            }
        }
        auxImagens.splice(0, auxImagens.length);
        auxImagens = null;
        //console.log(jsonRetorno);      

    } else if (idFerramentaTipo == 15) { //Caminhos de Aprendizagem - Lembrete

        $("#boxMaterialApoioTarefa").remove();
        $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_mapoio" id="boxMaterialApoioTarefa"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>');

        if (arrayArquivosUpload == undefined) {
            arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(jsonRetorno)); //corre��o para IE
            // arrayArquivosUpload = jsonRetorno;
        } else {

            for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
                arrayArquivosUpload.arrayArquivo.push(jsonRetorno.arrayArquivo[i]);
            }
        }

        for (var i = 0; arrayArquivosUpload.arrayArquivo[i]; i++) {
            strRetornoHtmlUpload += '<div class="the_insertedLink"><a href="' + arrayArquivosUpload.arrayArquivo[i].strDiretorio + '/' + arrayArquivosUpload.arrayArquivo[i].strArquivo + arrayArquivosUpload.arrayArquivo[i].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[i].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" idArquivo="' + arrayArquivosUpload.arrayArquivo[i].id + '"><strong>x</strong></a></div>';
        }

        $("#boxMaterialApoioTarefa").remove();
        $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa"><div class="container_inlinks"><h5>Material de apoio</h5>' + strRetornoHtmlUpload + '</div></div>');

        arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(arrayArquivosUpload));

        $(".exclui_arquivo").click(function () {

            var idArquivo = $(this).attr("idArquivo");

            for (var i = 0; i < arrayArquivosUpload.arrayArquivo.length; i++) {
                if (arrayArquivosUpload.arrayArquivo[i].id == parseInt(idArquivo)) {
                    arrayArquivosUpload.arrayArquivo.splice(i, 1);
                    break;
                }
            }

            $(this).parent().remove();

            if (arrayArquivosUpload.arrayArquivo.length == 0) {
                $("#boxMaterialApoioTarefa").remove();
            } else {
                for (var i = 0; arrayArquivosUpload.arrayArquivo[i]; i++) {
                    strRetornoHtmlUpload += '<div class="the_insertedLink"><a href="' + arrayArquivosUpload.arrayArquivo[i].strDiretorio + '/' + arrayArquivosUpload.arrayArquivo[i].strArquivo + arrayArquivosUpload.arrayArquivo[i].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[i].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" posArrayArquivo="' + i + '"><strong>x</strong></a></div>';
                }
            }

            strRetornoHtmlUpload = '';
        });


        strRetornoHtmlUpload = '';


    } else if (idFerramentaTipo == 36) { //Album Grupo
        var auxImagens = new Array();

        for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
            var objImagem = {
                bolPaisagem: jsonRetorno.arrayArquivo[i].bolPaisagem,
                bolRetrato: jsonRetorno.arrayArquivo[i].bolRetrato,
                idArquivo: jsonRetorno.arrayArquivo[i].id,
                thumbnail: jsonRetorno.arrayArquivo[i].strThumbnail,
                arquivo: jsonRetorno.arrayArquivo[i].strArquivo,
                nome: jsonRetorno.arrayArquivo[i].strNome,
                descricao: jsonRetorno.arrayArquivo[i].strDescricao,
                diretorio: jsonRetorno.arrayArquivo[i].strDiretorio,
                extensao: jsonRetorno.arrayArquivo[i].strExtensao,
                altura: jsonRetorno.arrayArquivo[i].intAlturaImg,
                largura: jsonRetorno.arrayArquivo[i].intLarguraImg

            };

            objetoImagens.imagens.push(objImagem);

            auxImagens.push(objImagem);
        }
        objetoImagens.imagens.sort(function (a, b) {
            if (b.largura > a.largura)
                return 1;
            return 0;
        });
        objetoImagens.imagens.sort(function (a, b) {
            if (a.largura == b.largura) {
                if (b.altura < a.altura) {
                    return 1;
                }
                return -1;
            }
            return 0;
        });
        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
            if (!$("#compartilhar").is(":visible")) {
                $("#compartilhar").show();
            }
            if (!$("#btnCancelarFerramentaMural").is(":visible")) {
                $("#btnCancelarFerramentaMural").show();
                $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
            }
            if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
                $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false);
            }
            if ($("#compartilhar").hasClass("disable")) {
                $("#compartilhar").removeClass("disable").prop("disabled", false);
            }
            if (!$("#seletorMuralDigaLa").is(":visible")) {
                $("#seletorMuralDigaLa").show();
                $("#seletorMuralDigaLa").closest('.sep_digala').show();
            }
            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
            /*if (!$("#btnCancelarFerramentaMural").is(":visible")) {
            $("#btnCancelarFerramentaMural")..prop("disabled", true).addClass("disable");
            }*/

        } else {

            $("#compartilhar").addClass("disable").prop("disabled", true);
        }


        if (auxImagens !== undefined && auxImagens != null && auxImagens.length > 0) {
            if (!$(".dialogo .dialogo_box .preview_post.imagens").is(":visible")) {
                $(".dialogo .dialogo_box .preview_post.imagens").show();

            }
            montaPreviewImagemMensagemRapida(auxImagens);
            if ($(".mensagem_multimidia").is(":visible")) {
                $(".mensagem_multimidia").hide();
            }
        }
        auxImagens.splice(0, auxImagens.length);
        auxImagens = null;
        //console.log(jsonRetorno);

    } else if (idFerramentaTipo == 32) { //Perfil Grupo

        $.ajax({
            url: "/AVA/Grupo/Home/SalvaFotoGrupo",
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                'idGrupo': idFerramenta,
                'idArquivo': idArquivo,
                'srcImagem': srcImagem
            },
            success: function (data) {
                if (data == "erro" || data == 0) {
                    jAlert("Erro ao salvar foto do grupo.", "")
                } else {
                    $(".foto_grupo img").attr("src", data);
                }
            },
            error: function (data) {
                jAlert("Erro ao editar o grupo.", "")
            }
        });
    }
    else if (idFerramentaTipo == 37) { // Arquivos timeline
        var auxFiles = new Array();
        for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
            var objFile = {
                idArquivo: jsonRetorno.arrayArquivo[i].id,
                arquivo: jsonRetorno.arrayArquivo[i].strArquivo,
                nome: jsonRetorno.arrayArquivo[i].strNome,
                descricao: jsonRetorno.arrayArquivo[i].strDescricao,
                diretorio: jsonRetorno.arrayArquivo[i].strDiretorio,
                extensao: jsonRetorno.arrayArquivo[i].strExtensao

            };

            if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                var t = objetoArquivos.arquivos.length;
                var bolAdicionar = true;
                for (var o = 0; o < t; o++) {
                    if (objetoArquivos.arquivos[o].idArquivo == objFile.idArquivo) {
                        bolAdicionar = false;
                        break;
                    }
                }
                if (bolAdicionar) {
                    objetoArquivos.arquivos.push(objFile);
                    auxFiles.push(objFile);
                }
            } else {
                objetoArquivos.arquivos.push(objFile);
                auxFiles.push(objFile);
            }


        }

        if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
            if (!$("#compartilhar").is(":visible")) {
                $("#compartilhar").show();
            }
            if (!$("#btnCancelarFerramentaMural").is(":visible")) {
                $("#btnCancelarFerramentaMural").show();
                $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
            }
            if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
                $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false);
            }
            if ($("#compartilhar").hasClass("disable")) {
                $("#compartilhar").removeClass("disable").prop("disabled", false);
            }
            if (!$("#seletorMuralDigaLa").is(":visible")) {
                $("#seletorMuralDigaLa").show();
                $("#seletorMuralDigaLa").closest('.sep_digala').show();
            }
            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");

            var url = location.href.toLowerCase();
            if (url.indexOf("perfil/home/index") == -1) {

                preparaAvaSelector();
            } else {
                $('#compartilhar').unbind('click', validaMensagemRapida).one('click', validaMensagemRapida);
            }
        } else {

            $("#compartilhar").addClass("disable").prop("disabled", true);
        }

        if (auxFiles !== undefined && auxFiles != null && auxFiles.length > 0) {
            if (!$(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")) {
                $(".dialogo .dialogo_box .preview_post.arquivos").show();

            }
            montaPreviewFilesMensagemRapida(auxFiles);
            if ($(".mensagem_multimidia").is(":visible")) {
                $(".mensagem_multimidia").hide();
            }
        }
        auxFiles.splice(0, auxFiles.length);
        auxFiles = null;
    }
    else if (idFerramentaTipo == 38) { // arquivos grupo
        var auxFiles = new Array();
        for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
            var objFile = {
                idArquivo: jsonRetorno.arrayArquivo[i].id,
                arquivo: jsonRetorno.arrayArquivo[i].strArquivo,
                nome: jsonRetorno.arrayArquivo[i].strNome,
                descricao: jsonRetorno.arrayArquivo[i].strDescricao,
                diretorio: jsonRetorno.arrayArquivo[i].strDiretorio,
                extensao: jsonRetorno.arrayArquivo[i].strExtensao

            };

            if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                var t = objetoArquivos.arquivos.length;
                var bolAdicionar = true;
                for (var o = 0; o < t; o++) {
                    if (objetoArquivos.arquivos[o].idArquivo == objFile.idArquivo) {
                        bolAdicionar = false;
                        break;
                    }
                }
                if (bolAdicionar) {
                    objetoArquivos.arquivos.push(objFile);
                    auxFiles.push(objFile);
                }
            } else {
                objetoArquivos.arquivos.push(objFile);
                auxFiles.push(objFile);
            }
        }

        if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
            if (!$("#compartilhar").is(":visible")) {
                $("#compartilhar").show();
            }
            if (!$("#btnCancelarFerramentaMural").is(":visible")) {
                $("#btnCancelarFerramentaMural").show();
                $("#btnCancelarFerramentaMural").closest('.sep_digala').show();
            }
            if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
                $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false);
            }
            if ($("#compartilhar").hasClass("disable")) {
                $("#compartilhar").removeClass("disable").prop("disabled", false);
            }
            if (!$("#seletorMuralDigaLa").is(":visible")) {
                $("#seletorMuralDigaLa").show();
                $("#seletorMuralDigaLa").closest('.sep_digala').show();
            }
            $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");


        } else {

            $("#compartilhar").addClass("disable").prop("disabled", true);
        }

        if (auxFiles !== undefined && auxFiles != null && auxFiles.length > 0) {
            if (!$(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")) {
                $(".dialogo .dialogo_box .preview_post.arquivos").show();

            }
            montaPreviewFilesMensagemRapida(auxFiles);
            if ($(".mensagem_multimidia").is(":visible")) {
                $(".mensagem_multimidia").hide();
            }
        }
        auxFiles.splice(0, auxFiles.length);
        auxFiles = null;

    } else {

        var objArray = new Array();
        objArray.push(idArquivo);

        var jsonReturnFinal = {
            'idFerramentaTipo': idFerramentaTipo,
            'idFerramenta': idFerramenta,
            'arquivos': objArray
        };

        $.ajax({
            type: "POST",
            async: false,
            url: "/AVA/Upload/Home/SalvaArquivoFerramenta/",
            data: {
                json: JSON.stringify(jsonReturnFinal)
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {

                $('#nova_foto').val(srcImagem);

                if ($("#nova_foto").val() != "") {
                    $("#frmPerfil img").attr("src", $("#nova_foto").val());
                    $("#strFoto").val($("#nova_foto").val());
                    if (idArquivo > 0) {
                        $("#idArquivoAux").val(idArquivo);
                    }
                }

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao salvar arquivo ferramenta!");
                }
            }
        });
    }

}