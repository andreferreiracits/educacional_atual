var quantidadePorPaginaGlobal = 10;
var rodarGlobal = 0;
var idRecursoGlobal = 0;
var idCategoriaGlobal = 0;
var strPesquisaGlobal = "";
var tipoGlobal = 1;
var strEstadosGlobal = "2, 3, 5, 6, 8, 10";
var dtmInicioGlobal = "";
var dtmFimGlobal = "";
var idEstadoGlobal = -1;

function salvarTarefaAvancada(idUsuario) {

    var titulo = $("#strTituloTarefa").val()
    var descricao = $("#txtDescricaoTarefa").val()

    if (titulo == "" || titulo == "Escreva aqui um título para o seu caminho de aprendizagem") {
        $("#strTituloTarefa").addClass('ava_field_alert');
        $('html, body').animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);
        return false;
    }

    if (descricao.length > 800) {
        $("#txtDescricaoTarefa").addClass('ava_field_alert');
        $('html, body').animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);
        return false;
    }

    var intRadio = 0;
    $('input:radio[name=rTipo]').each(function () {
        if ($(this).is(':checked'))
            intRadio = parseInt($(this).val());
    })

    var bolPublico = false;
    if (intRadio == 1) {
        bolPublico = true;
    }

    var tags = "";
    $(".ava_tags li").each(function () {
        tags += $(this).text().substring(0, $(this).text().length - 1) + ";";
    })

    $("#boxBtnSalvarTarefaRapida").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Salvando...").attr('style', 'float: right;padding:38px');

    var idTarefa = $('#idCaminho').val();

    $.ajax({
        type: "POST",
        async:false,
        url: "/AVA/Caminhos/Home/SalvarCaminho/",
        data: {
            idRota: idTarefa,
            idUsuario: idUsuario,
            strTitulo: titulo,
            strDescricao: descricao,
            bolPublico: bolPublico,
            strTags: tags,
            intTipo: 2
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idTarefa) {

            $('#idCaminho').val(idTarefa);

            var bolEntrega = false;
            if ($("#bolSolicitaEntrega").val() == 1) {
                bolEntrega = true;
            }
            salvaSolicitacaoEntrega(bolEntrega);
            
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao salvar tarefa!");
            }
        }
    });

    $("#boxBtnSalvarTarefaRapida").html('<a href="javascript:void(0);" class="large awesome awesome-color frmr30" onclick="salvarTarefaAvancada()">Salvar <span class="awe_icons"></span></a>').removeAttr('style');
    return true;
}

function abreListaRecurso() {
    var o = { 'autoDimensions': false, 'width': 725, 'height': 510, 'hideOnOverlayClick': false, 'autoScale': false, 'href': '/AVA/Caminhos/Home/ListaRecursos', 'onComplete': function () {

        $('.cover').mosaic({
            animation: 'slide',
            speed: 500,
            hover_x: '400px'
        });

    } //function
    }

    $.fancybox(o);
    return false;
}

function voltaListaRecursos() {
    
    strPesquisaGlobal = "";
    tipoGlobal = 1;
    strEstadosGlobal = "2, 3, 5, 6, 8, 10";
    dtmInicioGlobal = "";
    dtmFimGlobal = "";
    idEstadoGlobal = -1;

    $("#fancybox-content div").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />")
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaRecursos/",
        success: function (data) {
            $("#fancybox-content div").html(data);
            $('.cover').mosaic({
                animation: 'slide',
                speed: 500,
                hover_x: '400px'
            });
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao retornar recurso escolhido");
            }
        }
    });

}

function paginacaoRecursoItemRapido(idCategoria, idRecurso) {

    $("#mostraPaginas").hide();

    idCategoriaGlobal = idCategoria;
    idRecursoGlobal = idRecurso;
    rodarGlobal = 1;

    var resultados = 0;

    if (idRecurso == 1) {

        $("#container_recAval").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaAvaliacoesTotal/",
            async: false,
            data: {
                tipo: tipoGlobal,
                strEstados: strEstadosGlobal,
                dtmInicio: dtmInicioGlobal,
                dtmFim: dtmFimGlobal,
                strPesquisa: strPesquisaGlobal,
                strPesquisaEncode1: strPesquisaGlobal,
                strPesquisaEncode2: strPesquisaGlobal,
                idEstado: idEstadoGlobal
            },
            success: function (data) {
                resultados = data;
                //resultados = 15;
                $("#fancybox-close").click(function () {
                    strPesquisaGlobal = "";
                    tipoGlobal = 1;
                    strEstadosGlobal = "2, 3, 5, 6, 8, 10";
                    dtmInicioGlobal = "";
                    dtmFimGlobal = "";
                    idEstadoGlobal = -1;
                })

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Não foi possível obter o numero de resultados");
                }
            }
        });
    } else {

        $.ajax({
            url: "/AVA/Caminhos/home/SelecionarRecursoItemTotal/",
            data: {
                idCategoria: idCategoriaGlobal,
                idRecurso: idRecursoGlobal
            },
            async: false,
            success: function (data) {
                resultados = data;
                $("#fancybox-close").click(function () {
                    strPesquisaGlobal = "";
                    tipoGlobal = 1;
                    strEstadosGlobal = "2, 3, 5, 6, 8, 10";
                    dtmInicioGlobal = "";
                    dtmFimGlobal = "";
                    idEstadoGlobal = -1;
                })
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Nao foi possivel obter o numero de resultados.");
                }
            }
        });

    }

    resultados = parseInt(resultados);

    $("#Pagination").pagination(
            resultados,
            {
                items_per_page: quantidadePorPaginaGlobal,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: retornaPaginaRecursoItemRapido
            }
        );
    if (resultados <= quantidadePorPaginaGlobal) {
        $("#mostraPaginas").hide();
    } else {
        if ($("#mostraPaginas").is(":hidden")) {
            $("#mostraPaginas").show();
        }
    }
}

function retornaPaginaRecursoItemRapido(pag, jq) {
    if (rodarGlobal > 0) {
        listaRecursoItemRapidoPaginando(pag, idRecursoGlobal, idCategoriaGlobal);
    }
    rodarGlobal += 1;
}

function listaRecursoItemRapidoPaginando(numPag, idRecurso, idCategoria) {

    numPag += 1;

    var fim = quantidadePorPaginaGlobal * numPag;
    var inicio = (fim - quantidadePorPaginaGlobal) + 1;

    $("#container_recurso").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

    if (idRecurso == 1) {

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaAvaliacoesRapido/",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                $("#container_recurso").html(data);

                $('#filtro_aval').hide();

                $('#escorregaFiltro').toggle(
			            function () {
			                $(this).html("Adicionar filtros &#9650;");
			                montaCampoData('#dtmInicioAval');
			                montaCampoData('#dtmFimAval');
			                $('#filtro_aval').slideDown();
			            }, function () {
			                $(this).html("Adicionar filtros &#9660;");
			                $('#filtro_aval').slideUp();
			            }
		            );

                $("#container_recAval").html("<tr><td colspan='3'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></td></tr>");
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/RetornaListaAvaliacoesRapido/",
                    data: {
                        tipo: tipoGlobal,
                        strEstados: strEstadosGlobal,
                        dtmInicio: dtmInicioGlobal,
                        dtmFim: dtmFimGlobal,
                        strPesquisa: strPesquisaGlobal,
                        strPesquisaEncode1: strPesquisaGlobal,
                        strPesquisaEncode2: strPesquisaGlobal,
                        idEstado: idEstadoGlobal,
                        intInicio: inicio,
                        intFim: fim,
                        intTipoOrdenacao: 1
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (itens) {
                        $("#container_recAval").html(itens);

                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao listar avaliacao");
                        }
                    }
                });

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao listar avaliacao");
                }
            }
        });

    } else {

        $("#container_recurso").removeClass("tablefix_aval");
        $("#container_recurso").removeClass("trhover");

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ListaRecursoItensRapido/",
            data: {
                idCategoria: idCategoria,
                idRecurso: idRecurso,
                intInicio: inicio,
                intFim: fim
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (itens) {
                $("#container_recurso").html(itens)

                $('.ava_container_masonry').masonry({
                    itemSelector: '.ava_box_masonry'
                });
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao listar recursos!");
                }
            }
        });
    }

}

function inserirRecursoRapido(idRecurso, idPublicacao, idAvaliacao) {

    $(".time_loading").css("display", "block");

    var strTituloTarefa = $("#strTituloTarefa").val();
    var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();

    var intValorEtapa = 0;

    if ($('#valeNota').attr('checked')) {
        intValorEtapa = $("#intValorTarefa").val();
    }

    var idCaminho = $("#idCaminho").val();
    if (idCaminho == "" || idCaminho == undefined) {
        idCaminho = 0;
    }

    var idEtapa = $("#idEtapa").val();
    if (idEtapa == "" || idEtapa == undefined) {
        idEtapa = 0;
    }

    var tags = "";
    $(".ava_tags li").each(function () {
        tags += $(this).text().substring(0, $(this).text().length - 1) + ";";
    })

    var intRadio = 0;
    $('input:radio[name=rTipo]').each(function () {
        if ($(this).is(':checked'))
            intRadio = parseInt($(this).val());
    })

    var bolPublico = false;
    if (intRadio == 1) {
        bolPublico = true;
    }

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminho/",
        data: {
            idRota: idCaminho,
            idUsuario: 0,
            strTitulo: strTituloTarefa,
            strDescricao: txtDescricaoTarefa,
            bolPublico: bolPublico,
            strTags: tags,
            intTipo: 2
        },
        success: function (idCaminho) {

            $("#idCaminho").val(idCaminho);

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                data: {
                    idCaminho: idCaminho,
                    idEtapa: idEtapa,
                    idRecurso: idRecurso,
                    idPublicacao: idPublicacao,
                    idAvaliacao: idAvaliacao,
                    strTitulo: strTituloTarefa,
                    strDescricao: txtDescricaoTarefa,
                    intValor: intValorEtapa
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (idRecursoEtapa_idEtapa) {

                    var vetAux = idRecursoEtapa_idEtapa.split('_');
                    var idRecursoEtapa = vetAux[0];
                    $("#idRecursoEtapa").val(idRecursoEtapa);
                    $("#idEtapa").val(vetAux[1]);

                    $("#recursoRapido").remove();
                    $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_recurso clearfix" id="recursoRapido"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>');

                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapido/",
                        data: {
                            idRecursoEtapa: idRecursoEtapa
                        },
                        success: function (data) {
                            $("#container_empilhaextras #recursoRapido").remove();
                            $("#container_empilhaextras").prepend(data);
                            $("#fancybox-close").click();

                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("erro ao retornar recurso escolhido");
                            }
                        }
                    });
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao salvar recurso");
                    }
                }
            });
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao salvar tarefa rápida");
            }
        }
    });
}

function excluirRecursoRapido() {

    var idCaminho = $("#idCaminho").val();
    var idEtapa = $("#idEtapa").val();

    var strTituloTarefa = $("#strTituloTarefa").val();
    var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();

    var intValorEtapa = 0;

    if ($('#valeNota').attr('checked')) {
        intValorEtapa = $("#intValorTarefa").val();
    }

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
        data: {
            idCaminho: idCaminho,
            idEtapa: idEtapa,
            idRecurso: 11,
            idPublicacao: 0,
            idAvaliacao: 0,
            strTitulo: strTituloTarefa,
            strDescricao: txtDescricaoTarefa,
            intValor: intValorEtapa
        },
        success: function (idRecursoEtapa_idEtapa) {
            $("#recursoRapido").slideUp('slow', function () {
                $("#recursoRapido").remove();
            });
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao remover recurso");
            }
        }
    });

}

function abrirMidiaTarefa() {
    $('#boxLinkTarefa,#boxMidiaTarefa').remove();

    var strHTML = '<div id="boxMidiaTarefa" class="atividades_insert inserir_midia bgcolor1" style="display:none">' +
            	      '  <input type="text" name="dialogo" placeholder="Insira o endereço URL" class="ipt_midia ph">' +
            	      '  <a href="javascript:void(0);" onclick="inserirMidiaTarefa()" class="ne-salvar medium awesome awesome-green">Inserir</a>' +
                      '  <span class="discreto">Digite ou cole uma URL de vídeo YouTube, Vimeo ou Globo.</span>' +
                      '</div>'

    $('#container_empilhaextras').prepend(strHTML);
    $('.ph').addPlaceholder();
    $('#boxMidiaTarefa').slideDown('slow');
    $("#boxMidiaTarefa").find("input").focus(function () {
        $(this).removeClass("ava_field_alert");
    })
}

function inserirMidiaTarefa() {
    
    var strURLVideo = $("#boxMidiaTarefa").find("input").val();
    var tipo = 0;
    var idVideo = "";

    var strTipoURL = validarURLVideo(strURLVideo);

    if (strTipoURL == "youtubeEncurtado") { //é youtube encurtado            
        tipo = 1;
        idVideo = strURLVideo.substring(strURLVideo.indexOf("be/") + 3, strURLVideo.length);
    } else if (strTipoURL == "youtube") { //é youtube normal            
        tipo = 1;
        if (strURLVideo.indexOf("&") > 0) {
            idVideo = strURLVideo.substring(strURLVideo.indexOf("v=") + 2, strURLVideo.indexOf("&"));
        } else {
            idVideo = strURLVideo.substring(strURLVideo.indexOf("v=") + 2, strURLVideo.length);
        }
    } else if (strTipoURL == "vimeo") {
        tipo = 2;
        idVideo = strURLVideo.substring(strURLVideo.indexOf("vimeo.com/") + 10, strURLVideo.length);
    } else if (strTipoURL == "globo") {
        tipo = 3;
        var quebraBarra = strURLVideo.split("/");
        idVideo = quebraBarra[quebraBarra.length - 2];
    } else {
        $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
        return false;
    }

    var idCaminho = $("#idCaminho").val();
    if (idCaminho == "" || idCaminho == undefined) {
        idCaminho = 0;
    }

    var idEtapa = $("#idEtapa").val();
    if (idEtapa == "" || idEtapa == undefined) {
        idEtapa = 0;
    }

    var strTituloTarefa = $("#strTituloTarefa").val();
    var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();
    var intValorEtapa = 0;

    if ($('#valeNota').attr('checked')) {
        intValorEtapa = $("#intValorTarefa").val();
    }

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarMidiaTarefaRapida/",
        data: {
            idCaminho: idCaminho,
            idEtapa: idEtapa,
            strTarefa: strTituloTarefa,
            strDescricao: txtDescricaoTarefa,
            intNota: intValorEtapa,
            idMidia: idVideo,
            idTipoMidia: tipo,
            strLinkVideo: strURLVideo
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idCaminho_idEtapa) {
            var vetCaminhoEtapa = idCaminho_idEtapa.split("_");

            $("#idCaminho").val(vetCaminhoEtapa[0]);
            $("#idEtapa").val(vetCaminhoEtapa[1]);

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/RetornaPreviewMidia/",
                data: { tipoVideo: tipo, idMidia: idVideo },
                success: function (data) {
                    $("#container_empilhaextras").prepend(
                                                        '<div class="atividades_insert inserir_midia clearfix" id="boxPreviewMidiaTarefa" style="display:none">' +
                                                            '<h5>Vídeo</h5>' +
				                                            '<a href="javascript:void(0);" onclick="excluirMidiaTarefa()"><span class="fecha_X"></span></a>' + data +
                                                        '</div>'
                                                     );
                    $("#boxPreviewMidiaTarefa").slideDown("slow", function () {
                        $("#inserirMidiaTarefa").addClass("disable");
                        $("#inserirMidiaTarefa").removeAttr("onclick");
                        $("#boxMidiaTarefa").remove();
                    });
                },
                error: function (data) {
                    if (data.status != 0) {
                        $("#container_empilhaextras").prepend("erro ao salvar vídeo na tarefa!")
                    }
                }
            });

        },
        error: function (data) {
            if (data.status != 0) {
                $("#container_empilhaextras").prepend("erro ao mostrar preview da vídeo!")
            }
        }
    });

}

function excluirMidiaTarefa() {
    var idEtapa = $("#idEtapa").val();

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirMidiaEtapa/" + idEtapa,
        success: function (data) {
            $("#boxPreviewMidiaTarefa").slideUp("slow", function () {
                $("#boxPreviewMidiaTarefa").remove();                
                $("#inserirMidiaTarefa").removeClass("disable");                
                $("#inserirMidiaTarefa").attr("onclick", "abrirMidiaTarefa()");                
            });
        },
        error: function (data) {
            if (data.status != 0) {
                $("#boxPreviewMidiaTarefa").prepend("erro ao excluir mídia da tarefa!")
            }
        }
    });

}

function validarURLVideo(texto) {
    var strRetorno = "";
    var sel = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var ver = sel.exec(texto);

    if (texto == "") {
        $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
        return false;
    } else {
        if (!ver) {
            mostraAlertaTarefa("URL inserida não é válida.");
            return false;
        } else {

            if (texto.indexOf("//youtu") > 0) { //é youtube encurtado
                strRetorno = "youtubeEncurtado";
            } else if (texto.indexOf("youtube.com/watch?v=") > 0) { //é youtube normal
                strRetorno = "youtube";
            } else if (texto.indexOf("vimeo.com/") > 0) {
                strRetorno = "vimeo";
            } else if (texto.indexOf("video.globo.com/") > 0) {
                if (texto.indexOf("GIM") > 0) {
                    strRetorno = "globo";
                } else {
                    mostraAlertaTarefa("URL da globo falta o parâmetro ID.");
                    return false;
                }
            } else if (texto.indexOf("globotv.globo.com/") > 0) {
                var quebraBarra = texto.split("/");
                var confirmaIdVideo;

                if (texto.substring(texto.length - 1, texto.length) == "/") {
                    confirmaIdVideo = 2;
                } else {
                    confirmaIdVideo = 1;
                }

                if (!isNaN(quebraBarra[quebraBarra.length - confirmaIdVideo])) {
                    strRetorno = "globo";
                } else {
                    mostraAlertaTarefa("URL da globo falta o parâmetro ID.");
                    return false;
                }
            } else {
                mostraAlertaTarefa("URL inserida não é válida.");
                return false;
            }
        }
    }
    return strRetorno;
}

function mostraAlertaTarefa(strMensagem) {
    $("#btEscondidoTarefa").attr('href', '/ava/caminhos/home/Alert/?strMensagem=' + escape(strMensagem));
    var t = $("#btEscondidoTarefa");
    var o = { 'autoDimensions': false, 'width': 400, 'height': 100, 'hideOnOverlayClick': false, 'onComplete': function () {

        $("#fecharLightBox").click(function () {
            $("#fancybox-close").click();
        })

    } //function
    }

    lightBoxAVA(t, o);
    $("#btEscondidoTarefa").click();
}

function abreUploadTarefa() {

    var idCaminho = $("#idCaminho").val();
    var idEtapa = $("#idEtapa").val();

    var strTarefa = $("#strTituloTarefa").val();
    var strDescricao = $("#txtDescricaoTarefa").val();

    var intNota = 0;

    if ($('#valeNota').attr('checked')) {
        intNota = $("#intValorTarefa").val();
    }

    if (idCaminho == "" || idCaminho == undefined) {
        idCaminho = 0;
    }

    if (idEtapa == "" || idEtapa == undefined) {
        idEtapa = 0;
    }
    
    $("#btEscondidoTarefa").attr('href', '/AVA/Caminhos/Home/AbreUploadTarefa/?idCaminho=' + idCaminho + '&idEtapa=' + idEtapa + '&strTarefa=' + strTarefa + '&strDescricao=' + strDescricao + '&intNota=' + intNota);

    var t = $("#btEscondidoTarefa");
    var o = { 'autoDimensions': false, 'width': 726, 'height': 400, 'hideOnOverlayClick': false, 'autoScale': false, 'onComplete': function () {

        $("#fancybox-close").bind("click", function () {
            if ($("#idEtapa").val() != "") {
                carregaArquivosTarefa($("#idEtapa").val());
            }
        });

        $("#btnFinalizarMaterialApoio").bind("click", function () {
            $("#fancybox-close").click();
        })

    } //function
    }

    lightBoxAVA(t, o);
    $("#btEscondidoTarefa").click();
}

function excluirArquivoTarefa(idArquivo) {

    $.ajax({
        type: "POST",
        url: "/AVA/Upload/Home/Excluir/" + idArquivo,
        success: function (data) {
            carregaArquivosTarefa($("#idEtapa").val())
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao excluir material de apoio!");
            }
        }
    });

}

function carregaArquivosTarefa(idEtapa) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaArquivosTarefa/",
        data: {
            idEtapa: idEtapa
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            if (typeof (data) != "object" && data != "") {
                $("#boxMaterialApoioTarefa").remove();
                $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa">' + data + '</div>');
            }
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao listar material de apoio!");
            }
        }
    });

}

function abrirLinkTarefa() {
    $('#boxLinkTarefa,#boxMidiaTarefa').remove();

    var strHTML = '<div id="boxLinkTarefa" class="atividades_insert inserir_link bgcolor1" style="display:none">' +
                      '    <input type="text" id="strTituloLink" name="dialogo" placeholder="Título do Link" class="ipt_link ph">' +
                      '    <input type="text" id="strLinkApoio" name="dialogo" placeholder="Insira a URL" class="ipt_link ph">' +
                      '    <a style="cursor: pointer" onclick="inserirLinkTarefa()" class="ne-salvar medium awesome awesome-green">Inserir</a>' +
                      '</div>'

    $('#container_empilhaextras').prepend(strHTML);
    $('.ph').addPlaceholder();
    $('#boxLinkTarefa').slideDown('slow');
    $("#strTituloLink,#strLinkApoio").focus(function () {
        $(this).removeClass("ava_field_alert");
    })
}

function inserirLinkTarefa() {

    var strTitulo = $("#strTituloLink").val();
    var strLink = $("#strLinkApoio").val();

    if (strTitulo == "" || strTitulo == "Título do Link") {
        $("#strTituloLink").addClass("ava_field_alert");
        return false;
    } else if (strLink == "" || strLink == "Insira a URL") {
        $("#strLinkApoio").addClass("ava_field_alert");
        return false;
    }

    if (strLink.indexOf("http") < 0) {
        strLink = "http://" + strLink
    }

    var sel = /^(http[s]?:\/\/)?(www\.)?[a-zA-Z0-9-\.]+\.(com|org|net|mil|edu|ca|co.uk|com.au|gov|br)/
    var ver = sel.exec(strLink);

    if (!ver) {
        mostraAlertaTarefa("URL inserida não é válida.");
        return false;
    }

    var idCaminho = $("#idCaminho").val();
    if (idCaminho == "" || idCaminho == undefined) {
        idCaminho = 0;
    }

    var idEtapa = $("#idEtapa").val();
    if (idEtapa == "" || idEtapa == undefined) {
        idEtapa = 0;
    }

    var strTituloTarefa = $("#strTituloTarefa").val();
    var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();
    var intValorEtapa = 0;

    if ($('#valeNota').attr('checked')) {
        intValorEtapa = $("#intValorTarefa").val();
    }

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarLinkApoioTarefaRapida/",
        data: {
            idCaminho: idCaminho,
            idEtapa: idEtapa,
            strTarefa: strTituloTarefa,
            strDescricao: txtDescricaoTarefa,
            intNota: intValorEtapa,
            strTituloApoio: strTitulo,
            strLinkApoio: strLink
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idCaminho_idEtapa_idRecursoEtapa) {
            var vetCaminhoEtapaRecurso = idCaminho_idEtapa_idRecursoEtapa.split("_");

            $("#idCaminho").val(vetCaminhoEtapaRecurso[0]);
            $("#idEtapa").val(vetCaminhoEtapaRecurso[1]);
            $("#idRecursoEtapa").val(vetCaminhoEtapaRecurso[2]);

            retornaLinksApoio(vetCaminhoEtapaRecurso[2])

        },
        error: function (data) {
            if (data.status != 0) {
                $("#container_empilhaextras").prepend("erro ao salvar link da tarefa!")
            }
        }
    });

}

function removerLinkApoio(idRecursoLink) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirLinkApoio/",
        data: { idLink: idRecursoLink },
        success: function (data) {
            retornaLinksApoio($("#idRecursoEtapa").val())
        },
        error: function (data) {
            if (data.status == 0) {
                $(".container_inlinks").empty();
            } else {
                $(".container_inlinks").html("erro ao excluir link.")
            }
        }
    });
}

function retornaLinksApoio(idRecursoEtapa) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SelecionarLinksEtapa/",
        data: { idRecursoEtapa: idRecursoEtapa },
        success: function (data) {
            $("#container_empilhaextras").find("#boxPreviewLinksTarefa").remove();
            if (typeof (data) != "object" && data != "") {
                $("#container_empilhaextras").prepend(
                                                        '<div class="atividades_insert inserir_link" id="boxPreviewLinksTarefa" style="display:none">' + data + '</div>'
                                                     );
            }
            $("#boxPreviewLinksTarefa").slideDown("slow", function () {
                $("#boxLinkTarefa").remove();
            });
            
        },
        error: function (data) {
            if (data.status != 0) {
                $("#container_empilhaextras").prepend("erro ao retornar link da tarefa!")
            }
        }
    });

}

function abreCodigo() {

    var o = { 'autoDimensions': false, 'width': 680, 'height': 450, 'hideOnOverlayClick': false, 'autoScale': false, 'href': '/AVA/Caminhos/Home/SelecaoCodigosLivro', 'onComplete': function () {

        $("#fancybox-close").click(function () {

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaCodigosDidatico",
                data: {
                    idRecursoEtapa: $("#idRecursoEtapa").val()
                },
                success: function (data) {
                    $('#codigos_didatico').html("");
                    $('#container_empilhaextras').prepend(data);
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao buscar codigos da tarefa!");
                    }
                }
            });

        })


    } //function
    }

    $.fancybox(o);
    return false;
}

function defineOptionsMD(nivel) {

    nivel = nivel.value;

    document.getElementById('intBimestre').disabled = false;
    document.getElementById('selAreas').disabled = false;

    strNivel = nivel;
    strSelSerie = '';
    strSelArea = '';
    strSelArea += '<option value="0" selected>selecione uma área</option>';

    if (nivel == 'EI_alu') {

        document.getElementById('intBimestre').disabled = true;
        document.getElementById('selAreas').disabled = true;
        document.getElementById('selSerie').disabled = false;

        strSelSerie = '';
        strSelSerie += '<option value="0" selected>selecione um grupo</option>';
        strSelSerie += '<option value="3" >Grupo 3</option>';
        strSelSerie += '<option value="4" >Grupo 4</option>';
        strSelSerie += '<option value="5" >Grupo 5</option>';
        strSelSerie += '<option value="1" >1º ano / nível III</option>';

    } else if (nivel == 'EF_I') {

        document.getElementById('selSerie').disabled = false;

        strSelSerie += '<option value="2" >2º ano / 1ª série</option>';
        strSelSerie += '<option value="3" >3º ano / 2ª série</option>';
        strSelSerie += '<option value="4" >4º ano / 3ª série</option>';
        strSelSerie += '<option value="5" >5º ano / 4ª série</option>';

        strSelArea += '<option value="art" >Artes</option>';
        strSelArea += '<option value="cie" >Ciências</option>';
        strSelArea += '<option value="fil" >Filosofia</option>';
        strSelArea += '<option value="geo" >Geografia</option>';
        strSelArea += '<option value="his" >História</option>';
        strSelArea += '<option value="ing" >Língua Inglesa</option>';
        strSelArea += '<option value="por" >Língua Portuguesa</option>';
        strSelArea += '<option value="mat" >Matemática</option>';

    } else if (nivel == 'EF_II') {

        document.getElementById('selSerie').disabled = false;

        strSelSerie += '<option value="6" >6º ano / 5ª série</option>';
        strSelSerie += '<option value="7" >7º ano / 6ª série</option>';
        strSelSerie += '<option value="8" >8º ano / 7ª série</option>';
        strSelSerie += '<option value="9" >9º ano / 8ª série</option>';

        strSelArea += '<option value="art" >Artes</option>';
        strSelArea += '<option value="cie" >Ciências</option>';
        strSelArea += '<option value="fis" >Física</option>';
        strSelArea += '<option value="geo" >Geografia</option>';
        strSelArea += '<option value="his" >História</option>';
        strSelArea += '<option value="hgb" >Hist. Geral e do Brasil</option>';
        strSelArea += '<option value="ing" >Língua Inglesa</option>';
        strSelArea += '<option value="por" >Língua Portuguesa</option>';
        strSelArea += '<option value="mat" >Matemática</option>';
        strSelArea += '<option value="qui" >Química</option>';

    } else if (nivel == 'EM') {

        document.getElementById('selSerie').disabled = false;

        strSelSerie += '<option value="1" >1ª série</option>';
        strSelSerie += '<option value="2" >2ª série</option>';
        strSelSerie += '<option value="3" >3ª série</option>';

        strSelArea += '<option value="art" >Artes</option>';
        strSelArea += '<option value="bio" >Biologia</option>';
        strSelArea += '<option value="fil" >Filosofia</option>';
        strSelArea += '<option value="fis" >Física</option>';
        strSelArea += '<option value="geo" >Geografia</option>';
        strSelArea += '<option value="his" >História</option>';
        strSelArea += '<option value="hgb" >Hist. Geral e do Brasil</option>';
        strSelArea += '<option value="ing" >Língua Inglesa</option>';
        strSelArea += '<option value="por" >Língua Portuguesa</option>';
        strSelArea += '<option value="lit" >Literatura</option>';
        strSelArea += '<option value="mat" >Matemática</option>';
        strSelArea += '<option value="qui" >Química</option>';
        strSelArea += '<option value="soc" >Sociologia</option>';

    } else if (nivel == 'MOD') {
        document.getElementById('selSerie').disabled = true;

        strSelSerie = '';
        strSelSerie += '<option value="0" selected>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>';
        strSelArea += '<option value="art" >Artes</option>';
        strSelArea += '<option value="bio" >Biologia</option>';
        strSelArea += '<option value="fil" >Filosofia</option>';
        strSelArea += '<option value="fis" >Física</option>';
        strSelArea += '<option value="geo" >Geografia</option>';
        strSelArea += '<option value="his" >História</option>';
        strSelArea += '<option value="ing" >Língua Inglesa</option>';
        strSelArea += '<option value="por" >Língua Portuguesa</option>';
        strSelArea += '<option value="esp" >Língua Espanhola</option>';
        strSelArea += '<option value="lit" >Literatura</option>';
        strSelArea += '<option value="mat" >Matemática</option>';
        strSelArea += '<option value="qui" >Química</option>';
        strSelArea += '<option value="soc" >Sociologia</option>';

        document.getElementById('intBimestre').disabled = true;

    } else if (nivel == 'EXT') {

        document.getElementById('selSerie').disabled = true;

        strSelArea += '<option value="bio" >Biologia</option>';
        strSelArea += '<option value="fis" >Física</option>';
        strSelArea += '<option value="geo" >Geografia</option>';
        strSelArea += '<option value="his" >História</option>';
        strSelArea += '<option value="ing" >Língua Inglesa</option>';
        strSelArea += '<option value="por" >Língua Portuguesa</option>';
        strSelArea += '<option value="esp" >Língua Espanhola</option>';
        strSelArea += '<option value="lit" >Literatura</option>';
        strSelArea += '<option value="mat" >Matemática</option>';
        strSelArea += '<option value="qui" >Química</option>';

        document.getElementById('intBimestre').disabled = true;

    }

    $('#selSerie').html(strSelSerie);
    $('#selAreas').html(strSelArea);
}

function fncPesquisa() {

    var selNivel = $('#selNivel').val();
    var selSerie = $('#selSerie').val();
    var selAreas = $('#selAreas').val();

    if (selNivel == '0') {
        alert('Você precisa selecionar um nível.')
        return;
    }
    if (selSerie == '0' && $('#selNivel').value != 'MOD') {
        alert('Você precisa selecionar uma série.')
        return;
    }
    if (selAreas == '0' && $('#selNivel').value != 'EI_alu') {
        alert('Você precisa selecionar uma área.')
        return;
    }

    $("#container_codigos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/pesquisa/listaLinks_MD_AVA.asp",
        data: {
            selNivel: selNivel,
            selSerie: selSerie,
            selAreas: selAreas
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $("#container_codigos").html(data);
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao procurar codigo!");
            }
        }
    });

}

function inserirCodigo(idCodigo) {

    $(".time_loading").css("display", "block");

    var strTituloTarefa = $("#strTituloTarefa").val();
    var txtDescricaoTarefa = $("#txtDescricaoTarefa").val();

    var intValorEtapa = 0;

    if ($('#valeNota').attr('checked')) {
        intValorEtapa = $("#intValorTarefa").val();
    }

    var idCaminho = $("#idCaminho").val();
    if (idCaminho == "" || idCaminho == undefined) {
        idCaminho = 0;
    }

    var idEtapa = $("#idEtapa").val();
    if (idEtapa == "" || idEtapa == undefined) {
        idEtapa = 0;
    }

    $("#boxBTNInsCodigo_" + idCodigo).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Inserindo...");

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminho/",
        data: {
            idRota: idCaminho,
            idUsuario: 0,
            strTitulo: strTituloTarefa,
            strDescricao: txtDescricaoTarefa,
            bolPublico: false,
            strTags: "",
            intTipo: 2
        },
        success: function (idCaminho) {

            $("#idCaminho").val(idCaminho);

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                data: {
                    idCaminho: idCaminho,
                    idEtapa: idEtapa,
                    idRecurso: 11,
                    idPublicacao: 0,
                    idAvaliacao: 0,
                    strTitulo: strTituloTarefa,
                    strDescricao: txtDescricaoTarefa,
                    intValor: intValorEtapa
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (idRecursoEtapa_idEtapa) {

                    var vetAux = idRecursoEtapa_idEtapa.split('_');
                    var idRecursoEtapa = vetAux[0];
                    $("#idEtapa").val(vetAux[1]);
                    $("#idRecursoEtapa").val(idRecursoEtapa);

                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/InserirCodigoDidatico/",
                        data: {
                            idRecursoEtapa: idRecursoEtapa,
                            idCodigo: idCodigo
                        },
                        success: function (data) {

                            $("div#" + idCodigo).html("<span>Código inserido com sucesso!</span>");

                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("erro ao inserir codigo didatico: " + idCodigo);
                            }
                        }
                    });
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao salvar recurso");
                    }
                }
            });
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao salvar tarefa rápida");
            }
        }
    });
}

function excluirCodigo(idCodigo, idRecursoEtapa) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirCodigoEtapa",
        data: {
            idRecursoEtapa: idRecursoEtapa,
            idCodigo: idCodigo
        },
        success: function (data) {
            $("#codigos_didatico #" + idCodigo).slideUp("slow", function () {
                $(this).remove();
            });

        },
        error: function (data) {
            if (data.status != 0) {
                $("#codigos_didatico #" + idCodigo).prepend("erro ao excluir código da tarefa!")
            }
        }
    });

}

function pesquisaPorCodigo() {
    
    var strCodigo = $("#strCodigoDidatico").val();
    if (strCodigo == "") {
        alert("Digite um código.");
    } else {
        $("#container_codigos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/pesquisa/resultadoPesquisaMD_AVA.asp",
            data: {
                strCodigo: strCodigo
            },
            success: function (data) {
                $("#container_codigos").html(data);
            },
            error: function (data) {
                if (data.status != 0) {
                    $("#container_codigos").prepend("erro ao buscar codigo!")
                }
            }
        });
    }

}

function trocaStatusSolicitacaoEntrega() {

    if ($("#solicita_entrega").find("i").hasClass("entrega_icon_vazio")) {
        $("#solicita_entrega").find("i").removeClass("entrega_icon_vazio");
        $("#bolSolicitaEntrega").val("1");
    } else {
        $("#solicita_entrega").find("i").addClass("entrega_icon_vazio");
        $("#bolSolicitaEntrega").val("0");
    }
               
}

function salvaSolicitacaoEntrega(bolEntrega) {

    var intValorEtapa = 0;

    if ($('#valeNota').attr('checked')) {
        intValorEtapa = $("#intValorTarefa").val();
    }

    var idCaminho = $("#idCaminho").val();
    if (idCaminho == "" || idCaminho == undefined) {
        idCaminho = 0;
    }

    var idEtapa = $("#idEtapa").val();
    if (idEtapa == "" || idEtapa == undefined) {
        idEtapa = 0;
    }

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarTarefaRapida",
        data: {
            idCaminho: idCaminho,
            idEtapa: idEtapa,
            intValor: intValorEtapa,
            solicitaEntrega: bolEntrega
        },
        success: function (idEtapaRetorno) {
            $("#idEtapa").val(idEtapaRetorno);
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao buscar codigos da tarefa!");
            }
        }
    });

}

function criarAgendamento(idUsuario) {

    if (salvarTarefaAvancada(idUsuario)) {

        var objHTML = $(".compartilhamento ul").clone();
        objHTML.find("li").eq(0).remove();
        objHTML.find("li").eq(0).remove();
        objHTML.find("input").remove();
        objHTML.find("a.small-x").remove();
        objHTML.find("li:last").remove();
        objHTML.find("a").removeAttr("href");
        objHTML.find("a,li").removeAttr("style");
        objHTML.find("a").removeAttr('class');

        var idTarefa = $("#idCaminho").val();
        var idEtapa = $("#idEtapa").val();

        var o = { 'autoDimensions': false, 'width': 600, 'height': 450, 'hideOnOverlayClick': false, 'autoScale': false, 'href': '/AVA/Caminhos/Home/CriarAgendamentoTarefaAvancada?idTarefa=' + idTarefa + "&htmlPersona=" + objHTML.html(), 'onComplete': function (data) {

            $('.compartilhamento_cenario').find('li').after('&nbsp;');
            $('.ph').addPlaceholder();

            $("#horaInicio").keyup(function () {
                $("#dInicio").text($("#dataInicio").val() + " " + $(this).val());
            })

            $("#horaFim").keyup(function () {
                $("#dFim").text($("#dataFim").val() + " " + $(this).val());
            })

            //Carrega os calendarios para data de inicio e fim do agendamento			
            montaCampoData('#dataInicio');
            montaCampoData('#dataFim');

            //Mascaras
            $('#horaInicio').setMask('time'); // hora
            $('#horaFim').setMask('time'); // hora

            $("#btnCancelarAgendamentoRapido").live('click', function () {
                $("#fancybox-close").click();
            })

            $("#btnConcluirAgendamentoRapido").click(function () {

                $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");

                var txtDisponivel = $("#txtDisponivel").text();
                var txtTitulo = $("#txtTitulo").text();
                var strComplemento = $("#strComplementoRapido").val();

                if (strComplemento == "") {
                    strComplemento = "Agendei esta tarefa para você. Bom estudo!";
                }

                var txtInput = strComplemento + " (" + txtTitulo + ") " + txtDisponivel

                $("#txtInput").val(txtInput);

                var json = montaJSON($(".compartilhamento"));

                var dataInicio = $("#dataInicio").val();
                var dataFim = $("#dataFim").val();
                var horaInicio = $("#horaInicio").val();
                var horaFim = $("#horaFim").val();

                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirAgendamento",
                    data: {
                        idRotaAgendamento: 0,
                        idCaminho: idTarefa,
                        dataInicio: dataInicio,
                        horaInicio: horaInicio,
                        dataFim: dataFim,
                        horaFim: horaFim,
                        strComplemento: txtInput,
                        jsonAgendamento: json
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (idRotaAgendamentoAux) {

                        salvarMensagemRapidaAvancada(json, 17, idRotaAgendamentoAux, idEtapa, txtInput);

                        $("#fancybox-close").click();

                        $("#msg_aviso").slideDown(function () {
                            var qtdAgendamento = retornaQtdeAgendamentosTarefa(idTarefa);
                            $("#msg_qtdAgendadas").html('Esta tarefa possui <a href="/ava/caminhos">' + qtdAgendamento + ' agendamento(s)</a>');

                            window.setTimeout(function () { $("#msg_aviso").slideUp(); }, 5000)
                        })

                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao inserir agendamento!");
                        }
                    }
                }); //ajax inseriragendamento

            })//btnConcluirAgendamentoRapido click

        } //function
        } //var o

        $.fancybox(o);
        return false;
    }
}

function retornaQtdeAgendamentosTarefa(idTarefa) {
    var qtde = 0;

    $.ajax({
        type: "POST",
        async: false,
        url: "/AVA/Caminhos/Home/SelecionaAgendadasTotal",
        data: {
            idCaminho: idTarefa
        },
        success: function (qtd) {

            qtde = qtd;
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao buscar qtd de agendamentos!");
            }
        }
    });

    return qtde;

}

function salvarMensagemRapidaAvancada(json, idFerramentaTipo, idFerramenta, idEtapa, strMensagem) {

    $.ajax({
        type: "POST",
        async: false,
        url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
        data: {
            destino: json,
            idFerramentaTipo: idFerramentaTipo,
            idFerramenta: idFerramenta,
            idEtapa: idEtapa,
            strMensagem: strMensagem
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idMensagemRapida) {
    
            
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao salvar mensagem rápida!");
            }
        }
    });


}

function montaCampoData(field_) {

    $(field_).setMask('date');

    $(field_).DatePicker({
        format: 'd/m/Y',
        date: $(field_).val(),
        current: $('#currentDay').val(),
        starts: 1,
        //position: 'r',
        onBeforeShow: function () {
            $(field_).DatePickerSetDate($('#currentDay').val(), true);
        },
        onChange: function (formated, dates) {
            $(field_).val(formated);
            $(field_).DatePickerHide();
            
            if (field_ == "#dataInicio") {
                $("#dInicio").text(formated + " " + $("#horaInicio").val());
            } else {
                $("#dFim").text(formated + " " + $("#horaFim").val());
            }
            
        },
        locale: {
            days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
            daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
            daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
            months: ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            weekMin: 'ms'
        }
    });
}