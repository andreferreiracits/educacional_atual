var intMeusGlobal;
var intEscolaGlobal;
var intPortalGlobal;
var strPesquisaGlobal;
var dtmInicioGlobal;
var dtmFimGlobal;
var bolFiltrandoGlobal;
var rodarGlobal;
var idCategoriaGlobal;
var idRecursoGlobal;
var quantidadePorPagina;

jQuery(function ($) {
    var paginaAtual = 1;
    if (idRota === undefined || idRota == "") {
        $(".step_etapas").children(":first").removeAttr("onclick");
        $(".step_conclusao").children(":first").attr("href", "javascript:void(0)");
    }
   
});
function editar(idRota) {
    location.href = "/AVA/Caminhos/Home/Criar/" + idRota;
}
function editarTarefa(idRota) {
    location.href = "/AVA/Caminhos/Home/CriarTarefa/" + idRota;
}
function criar() {
    window.location = '/AVA/Caminhos/Home/Criar';
}
function criarTarefa() {
    window.location = '/AVA/Caminhos/Home/CriarTarefa';
}
function voltarEdicaoEtapa(idCaminho) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaUltimaEtapaByIdCaminho/" + idCaminho,
        success: function (etapa) {

            var vetEtapa = etapa.split("_");
            var idEtapa = vetEtapa[0];
            var intEtapa = vetEtapa[1];

            if (idEtapa > 0 && intEtapa > 0) {
                editarEtapa(idEtapa, intEtapa);
            } else {
                criarEtapa(idCaminho);
            }

        },
        error: function (data) {
            //alert("erro ao buscar última etapa criada!")
            if (data.status != 0) {
                console.debug("erro ao buscar última etapa criada!");
            }
        }
    });

}

function salvarCaminho(idUsuario, idRota, bolAvanca) {

    $titulo = $("#strTitulo").val()
    $descricao = $("#strDescricao").val()

    if ($titulo == "" || $titulo == "Escreva aqui um título para o seu caminho de aprendizagem") {
        $("#strTitulo").addClass('ava_field_alert');
        $('html, body').animate({
            scrollTop: $("#tituloCaminho").offset().top - 60
        }, 1000);
        return false;
    }

    if ($descricao.length > 800) {
        $("#strDescricao").addClass('ava_field_alert');
        $('html, body').animate({
            scrollTop: $("#descricaoCaminho").offset().top - 60
        }, 1000);
        return false;
    }

    var intRadio = 0;
    $('input:radio[name=rTipo]').each(function() {	    
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

	$("#btSalvarCaminhoSpan").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Salvando...");

	$.ajax({
	    type: "POST",
	    url: "/AVA/Caminhos/Home/SalvarCaminho/",
	    data: {
	        idRota: idRota,
	        idUsuario: idUsuario,
	        strTitulo: $titulo,
	        strDescricao: $descricao,
	        bolPublico: bolPublico,
	        strTags: tags,
            intTipo: 1
	    },
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    success: function (caminho) {

	        $('#idCaminho').val(caminho);
	        $('.step_caminhos').attr("onclick", "editar(" + caminho + ")");

	        var idUsuario = $('#idUsuario').val();

	        $("#btnExcluirCaminhoSpan").html('<a href="javascript: void(0);" id="btnExcluirCaminho" class="ne-excluir large awesome awesome-red b_tooltip_center">excluir caminho</a>'
                                            + '<span class="black_tip_center tooltip" id="tooltipExc_' + caminho + '">'
                                                + '<p>Deseja realmente excluir este caminho? </p> '
                                                + '<a href="javascript: void(0);" class="bt_normal green" onclick="excluirRota(' + caminho + ', true)">sim</a>'
                                                + ' <a href="javascript: void(0);" class="bt_normal red" onclick="excluirRota(' + caminho + ', false)">não</a>'
                                                + '<span class="black_tip_seta">&#9660;</span>'
                                            + '</span>');

	        $("#btSalvarCaminhoSpan").html('<a href="javascript: void(0);" class="ne-salvar large awesome awesome-green" id="btSalvarCaminho" onclick="salvarCaminho(' + idUsuario + ', ' + caminho + ', false)">salvar</a>');

	        $("#btnAvancarCaminho").attr("onclick", "salvarCaminho(" + idUsuario + ", " + caminho + ", true)")

	        $(".b_tooltip_center").tooltip({
	            effect: 'slide',
	            position: 'top center',
	            relative: true,
	            events: {
	                def: 'click, mouseout'
	            }
	        });

	        if (bolAvanca) {
	            $(".step_etapas").children(":first").attr("onclick", "salvarCaminho(" + idUsuario + "," + caminho + ",true);");
	            $(".step_conclusao").children(":first").attr("href", "/AVA/caminhos/home/concluir/" + caminho);

	            $.ajax({
	                type: "POST",
	                url: "/AVA/Caminhos/Home/RetornaUltimaEtapaByIdCaminho/" + caminho,
	                success: function (etapa) {

	                    var vetEtapa = etapa.split("_");
	                    var idEtapa = vetEtapa[0];
	                    var intEtapa = vetEtapa[1];

	                    if (idEtapa > 0 && intEtapa > 0) {
	                        editarEtapa(idEtapa, intEtapa);
	                    } else {
	                        criarEtapa(caminho);
	                    }

	                },
	                error: function (data) {
	                    if (data.status != 0) {
	                        console.debug("erro ao buscar última etapa criada!");
	                    }
	                }
	            });

	        }

	    },
	    error: function (data) {
	        if (data.status != 0) {
	            console.debug("erro ao salvar caminho!");
	        }
	    }
	});

}

function duplicarRota(idRota) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/DuplicarRota/",
        data: {
            id: idRota
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idCaminho) {
            editar(idCaminho)
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao duplicar caminho!");
            }
        }
    });

}

function duplicarTarefa(idRota) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/DuplicarRota/",
        data: {
            id: idRota
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idCaminho) {
            editarTarefa(idCaminho)
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao duplicar caminho!");
            }
        }
    });

}

function abrirRecurso(idCategoria1, idRecurso1) {
    idCategoriaGlobal = idCategoria1;
    idRecursoGlobal = idRecurso1;
    retornaRecurso(idCategoriaGlobal, idRecursoGlobal);
    strPesquisaGlobal = "";
    rodarGlobal = 0;

    paginacaoTotal(idCategoriaGlobal, idRecursoGlobal);
}

function getParamID() {
    var results = window.location.href.toString().toLowerCase();  
    results = results.replace("http://novo.educacional/ava/caminhos/home/", "");    
    results = results.split("/")    
    return results[1];
}

function voltarRecurso(idCategoria, idRecurso) {

    var idEtapa = $("#idEtapa").val();
    var idRota = $("#idCaminho").val();
        
    if (idCategoria < 0) {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirEtapa/" + idEtapa,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (ret) {

                retornaRecurso(idCategoria, idRecurso);

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Erro ao excluir etapa!");
                }
                //alert("erro ao excluir etapa!")
            }
        });
    }
    else
    {
        if (idEtapa == undefined) {           
            criarEtapa(idRota);
        } else {

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirEtapa/" + idEtapa,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (ret) {

                $("#recursoescolhido, #camposEtapa").html("").css("display", "none")
                $(".ava_ativtable table").css("display", "");
                retornaRecurso(idCategoria, idRecurso);

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao excluir etapa!");
                }
                //alert("erro ao excluir etapa!")
            }
        });
        
        }
    }
}

function fazerCaminhoTarefa(idCaminhoAgendamento) {
    $.ajax({
        url: "/ava/caminhos/home/retornaRotaUsuarioEtapa/",
        data: {
            idCaminhoAgendamento: idCaminhoAgendamento
        },
        async: false,
        success: function (idRotaUsuario_idEtapa) {
            var arrParam = idRotaUsuario_idEtapa.split('_');
            location.href = "/AVA/Caminhos/home/player/" + idCaminhoAgendamento + "/" + arrParam[1];
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug(data.status);
            }
        }
    });
}

function criarRotaUsuario(idCaminhoAgendamento) {
    $.ajax({
        url: "/ava/caminhos/home/salvarCaminhoUsuario/",
        data: {
            idCaminhoAgendamento: idCaminhoAgendamento
        },
        async: false,
        success: function (data) {
            location.href = "/AVA/Caminhos/home/resumo/" + idCaminhoAgendamento;
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug(data.status);
            }
            // alert(data.status);
        }
    });
}

function paginacao(idCategoria, strPesquisa, idRecurso) {
    
    var resultados = 0;

    $.ajax({
        url: "/AVA/Caminhos/home/ProcurarRecursoItemTotal/",
        data: "idCategoria=" + idCategoria + "&strPesquisa=" + strPesquisa,
        async: false,
        success: function (data) {
            resultados = data;

            quantidadePorPagina = 10;

            resultados = parseInt(resultados);
            $("#Pagination").pagination(
                resultados,
                {
                    items_per_page: quantidadePorPagina,
                    num_display_entries: 5,
                    current_page: 0,
                    num_edge_entries: 1,
                    link_to: "javascript:void(0);",
                    callback: retornaPagina
                }
            );

            if (resultados <= 10) {
                $("#mostraPaginas").hide();
            } else {
                if ($("#mostraPaginas").is(":hidden")) {
                    $("#mostraPaginas").show();
                }
            }

        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("Nao foi possivel obter o numero de resultados");
            }
            //alert("Não foi possível obter o numero de resultados");
        }
    });    
}

function paginacaoTotal(idCategoria, idRecurso) {

    idCategoriaGlobal = idCategoria;
    idRecursoGlobal = idRecurso;

    var resultados = 0;
    if (idRecurso == 1)
    {        
        if (typeof($tipopesquisa) == "undefined") {
            $tipopesquisa = 1;
        }
        if (typeof (idEstado) == "undefined") {
            idEstado = -1;
        }
        if (typeof ($tituloAval) == "undefined") {
            $tituloAval = "";
        }
        if (typeof ($dataInicio) == "undefined") {
            $dataInicio = "";
        }
        if (typeof ($dataFim) == "undefined") {
            $dataFim = "";
        }
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaAvaliacoesTotal/",
            async: false,
            data: {
                tipo: $tipopesquisa,
                strEstados: "2, 3, 5, 6, 8, 10",
                dtmInicio: $dataInicio,
                dtmFim: $dataFim,
                strPesquisa: $tituloAval,
                strPesquisaEncode1: $tituloAval,
                strPesquisaEncode2: $tituloAval,
                idEstado: idEstado
            },
            success: function (data) {
                resultados = data;
                resultados = parseInt(resultados);
                if (resultados <= 10) {
                    $("#mostraPaginas").hide();
                } else {
                    if ($("#mostraPaginas").is(":hidden")) {
                        $("#mostraPaginas").show();
                    }
                }
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Não foi possível obter o numero de resultados");
                }
                //alert("Não foi possível obter o numero de resultados");
            }
        });
    }
    else
    {
        $.ajax({
            url: "/AVA/Caminhos/home/SelecionarRecursoItemTotal/",
            data: "idCategoria=" + idCategoria + "&idRecurso=" + idRecurso,
            async: false,
            success: function (data) {
                resultados = data;
                resultados = parseInt(resultados);
                if (resultados <= 10) {
                    $("#mostraPaginas").hide();
                } else {
                    if ($("#mostraPaginas").is(":hidden")) {
                        $("#mostraPaginas").show();
                    }
                }
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Nao foi possivel obter o numero de resultados");
                }
                //alert("Não foi possível obter o numero de resultados");
            }
        });
    }    
    
    quantidadePorPagina = 10;
    
    $("#Pagination").pagination(
    resultados,
        {
            items_per_page: quantidadePorPagina,
            num_display_entries: 5,
            current_page: 0,
            num_edge_entries: 1,
            link_to: "javascript:void(0);",
            callback: retornaPagina
        }
    );

    
}

function retornaPagina(pag, jq) {
    if (rodarGlobal > 0) {
        loadContents(pag, idCategoriaGlobal, idRecursoGlobal, strPesquisaGlobal);
        $('.ava_container_masonry').masonry({
            itemSelector: '.ava_box_masonry'
        });
    }
    rodarGlobal += 1;
}

function retornaRecurso(idCategoria, idRecurso) {
    $("#recurso_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    
    if (idCategoria < 0) {
        var idCaminho = $("#idCaminho").val();
        criarEtapa(idCaminho)
    }
    else
    {
        $.ajax({
            url: "/AVA/Caminhos/Home/RetornaRecurso/?idCategoria=" + idCategoria,
            async: false,
            success: function (recurso) {
                $("#recurso_ava").html(recurso).css("display", "");
                $('.ph').addPlaceholder();
                $("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", "");
                $("#mostraPaginas").hide();
                retornaRecursosItens(idCategoria, idRecurso);

            },
            error: function (data) {
                //console.debug("erro ao listar os recursos");
                if (data.status == 0) {
                    $("#recurso_ava").empty();
                } else {
                    $("#recurso_ava").html("erro ao listar os recursos");
                }
            }
        });
    }
}

function loadContents(pag, idCategoria, idRecurso, strPesquisa) {
    pag += 1;
    
    var inicio;
    var fim;
    var diferenca;

    fim = quantidadePorPagina * pag; //30
    inicio = (fim - quantidadePorPagina) + 1; //21
    if (idRecurso == 1) {
        $("#linha_filtro").css("display", "")
        $("#linha_header_tbl").css("display", "")
        $("#recursoitem_ava").attr("colspan", "3")
        $("#recursoitem_ava").attr("class", "tablefix")
        if (typeof ($tipopesquisa) == "undefined") {
            $tipopesquisa = 1;
        }
        if (typeof (idEstado) == "undefined") {
            idEstado = -1;
        }
        if (typeof ($tituloAval) == "undefined") {
            $tituloAval = "";
        }
        if (typeof ($dataInicio) == "undefined") {
            $dataInicio = "";
        }
        if (typeof ($dataFim) == "undefined") {
            $dataFim = "";
        }
        $("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaAvaliacoes/",
            data: {
                tipo: $tipopesquisa,
                strEstados: "2, 3, 5, 6, 8, 10",
                dtmInicio: $dataInicio,
                dtmFim: $dataFim,
                strPesquisa: $tituloAval,
                strPesquisaEncode1: $tituloAval,
                strPesquisaEncode2: $tituloAval,
                idEstado: idEstado,
                intInicio: inicio,
                intFim: fim,
                intTipoOrdenacao: 1
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (itens) {
                $("#recursoitem_ava").html(itens)

                $(".mouseover_aval").mouseover(function () {
                    $(this).children(":first").find("div").css("display", "block");
                })
                .mouseout(function () {
                    $(this).children(":first").find("div").css("display", "none");
                });

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao listar recursos");
                }
                //alert("erro ao listar recursos!")
            }
        });
    } else {
        $("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        if (strPesquisa == "" || strPesquisa === undefined || strPesquisa == null) {
            $.ajax({
                url: "/AVA/Caminhos/Home/RetornaRecursoItem/",
                async: false,
                data: {
                    idCategoria: idCategoria,
                    idRecurso: idRecurso,
                    intInicio: inicio,
                    intFim: fim
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (itens) {
                    $("#recursoitem_ava").html(itens).css("display", "")
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro");
                    }
                    //alert("erro")
                }
            });
        }
        else
        {
            $.ajax({
                url: "/AVA/Caminhos/home/ProcurarRecursoItem/",
                data: "idCategoria=" + idCategoria + "&idRecurso=" + idRecurso + "&strPesquisa=" + strPesquisa + "&intInicio=" + inicio + "&intFim=" + fim,
                async: false,
                success: function (data) {
                    $("#recursoitem_ava").html(data);
                },
                error: function (data) {

                    //alert("erro")
                    if (data.status != 0) {
                        console.debug("Erro");
                    }
                }
            });
        }   
    }

}

function retornaRecursosItens(idCategoria, idRecurso) {

    if (idRecurso == 1) { //avaliações

        $("#linha_filtro").css("display", "")
        $("#linha_header_tbl").css("display", "")
        $("#recursoitem_ava").attr("colspan", "3")
        $("#recursoitem_ava").attr("class", "tablefix")

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaAvaliacoes/",
            data: {
                tipo: 1,
                strEstados: "2, 3, 5, 6, 8, 10",
                dtmInicio: "",
                dtmFim: "",
                strPesquisa: "",
                strPesquisaEncode1: "",
                strPesquisaEncode2: "",
                idEstado: -1,
                intInicio: 1,
                intFim: 10,
                intTipoOrdenacao: 1
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (itens) {
                $("#recursoitem_ava").html(itens)

                $(".mouseover_aval").mouseover(function () {
                    $(this).children(":first").find("div").css("display", "block");
                })
                .mouseout(function () {
                    $(this).children(":first").find("div").css("display", "none");
                });

            },
            error: function (data) {
                //alert("erro ao listar recursos!")
                if (data.status != 0) {
                    console.debug("erro ao listar recursos!");
                }
            }
        });

    } else {

        $("#recursoitem_ava").attr("class", "tablefix")
        $("#tblrecursoitem_ava, div#recursoitem_ava").css("display", "none")

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaRecursoItem/",
            data: {
                idCategoria: idCategoria,
                idRecurso: idRecurso,
                intInicio: 1,
                intFim: 10
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (itens) {
                $("#recursoitem_ava").html(itens).css("display", "")
                $('.ava_container_masonry').masonry({
                    itemSelector: '.ava_box_masonry'
                });
            },
            error: function (data) {
                //alert("erro ao listar recursos!")
                if (data.status != 0) {
                    console.debug("erro ao listar recursos!");
                }
            }
        });
    }
}

function abrirRecursoEdicao(idCategoria, idRecurso, idEtapa, intEtapa) {
    
    var URL = "";
    if (idRecurso == 1) {
        URL = "/AVA/Caminhos/Home/RetornaRecursoEdicao/?idCategoria=" + idCategoria + "&bolAvaliacao=true"
    } else {
        URL = "/AVA/Caminhos/Home/RetornaRecursoEdicao/?idCategoria=" + idCategoria + "&bolAvaliacao=false"
    }

    $("#recurso_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        url: URL,
        data: {
            idEtapa: idEtapa,
            intEtapa: intEtapa
        },
        success: function (recurso) {

            $("#recurso_ava").html(recurso);

            $("#recursoitem_ava").css("display", "none");

            if (idRecurso == 1) {
                $("#tblrecursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                $("#linha_filtro, #linha_tbl_aval").css("display", "");
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/RetornaAvaliacoes/",
                    data: {
                        tipo: 1,
                        strEstados: "2, 3, 5, 6, 8, 10",
                        dtmInicio: "",
                        dtmFim: "",
                        strPesquisa: "",
                        strPesquisaEncode1: "",
                        strPesquisaEncode2: "",
                        idEstado: -1,
                        intInicio: 1,
                        intFim: 10,
                        intTipoOrdenacao: 1
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (itens) {
                        $("#tblrecursoitem_ava").html(itens)

                        $(".mouseover_aval").mouseover(function () {
                            $(this).children(":first").find("div").css("display", "block");
                        })
                        .mouseout(function () {
                            $(this).children(":first").find("div").css("display", "none");
                        });

                    },
                    error: function (data) {
                        //alert("erro ao listar recursos!")
                        if (data.status != 0) {
                            console.debug("erro ao listar recursos!");
                        }
                    }
                });

            } else {

                retornaRecursosItens(idCategoria, idRecurso);

            }


        },
        error: function (data) {
            //console.debug("erro ao listar os recursos");
            if (data.status == 0) {
                $("#recurso_ava").empty();
            } else {
                $("#recurso_ava").html("erro ao listar os recursos");
            }
        }
    });

}

function inserirDoMeuJeito(idRecurso) {
   
    var idCaminho = $("#idCaminho").val();
    var intEtapa = $("#intEtapa").val();
    var idEtapa = $("#idEtapa").val();

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecurso/",
        data: {
            idCaminho: idCaminho,
            idEtapa: 0,
            intEtapa: intEtapa,
            idRecurso: idRecurso,
            idPublicacao: 0,
            idAvaliacao: 0
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idRecursoEtapa) {

            $("#recurso_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

            $.ajax({
                url: "/AVA/Caminhos/Home/RetornaRecurso/?idCategoria=-1",
                success: function (recurso) {
                    $("#recurso_ava").html(recurso).css("display", "");

                    $(".ava_ativtable tbody,tfoot").css("display", "none")
                    $("#camposEtapa").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", "");
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/TerminaEdicaoEtapa/",
                        data: {
                            idRecursoEtapa: idRecursoEtapa
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {

                            $("#camposEtapa").html(data).css("display", "");

                            $('.ph').addPlaceholder();

                            $("#tituloetapa").focus(function () {
                                $(this).removeClass('ava_field_alert');
                            });

                            $("#im_entrega").click(function () {
                                if (this.checked) {
                                    $("#obsEntrega").removeAttr("disabled");
                                } else {
                                    $("#obsEntrega").attr("disabled", "disabled");
                                    $("#obsEntrega").val("");
                                }
                            })

                            $("#strTituloLink").focus(function () {
                                $(this).removeClass("ava_field_alert");
                            })

                            $("#strUrl").focus(function () {
                                $(this).removeClass("ava_field_alert");
                            })

                            $('#valeNota').click(function () {
                                if (this.checked) {
                                    $("#intValorEtapa").removeAttr("disabled");
                                } else {
                                    $("#intValorEtapa").attr("disabled", "disabled");
                                    $("#intValorEtapa").removeClass("ava_field_alert");
                                }
                            });
                            $('#intValorEtapa').setMask('999');

                            $("#intValorEtapa").focus(function () {
                                $(this).removeClass("ava_field_alert");
                            })

                            $('#toggle_midia').toggle(
			                    function () {
			                        $('#sobedesce_midia').slideDown();
			                        $(this).find('.up_down').html("&#9650;")
			                    }, function () {
			                        $('#sobedesce_midia').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            $('#toggle_entrega').toggle(
			                    function () {
			                        $('#sobedesce_entrega').slideDown();
			                        $(this).find('.up_down').html("&#9650;")
			                    }, function () {
			                        $('#sobedesce_entrega').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            $('#toggle_link').toggle(
			                    function () {
			                        $('#sobedesce_link').slideDown();
			                        $(this).find('.up_down').html("&#9650;")
			                        retornaLinksApoio(idRecursoEtapa);

			                    }, function () {
			                        $('#sobedesce_link').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            $('#toggle_material').toggle(
			                    function () {
			                        $('.sobedesce_material').slideDown();
			                        $(this).find('.up_down').html("&#9650;")


			                    }, function () {
			                        $('.sobedesce_material').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            carregaTiny();
                            montarNavegacaoEtapas(0, idCaminho, intEtapa)

                            $("#btnAvancarCaminho").attr("onClick", "avancarConclusao(" + idCaminho + ")");
                            $("#btnAvancarCaminho").removeClass("disable");

                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("erro ao terminar edição etapa!");
                            }
                            //alert("erro ao terminar edição etapa!")
                        }
                    });

                },
                error: function (data) {
                    if (data.status == 0) {
                        $("#recurso_ava").empty();
                    } else {
                        $("#recurso_ava").html("erro ao listar os recursos");
                    }
                }
            });


        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao incluir etapa do meu jeito");
            }
            //alert("erro ao incluir etapa do meu jeito!")
        }
    });
   

}

function inserirRecurso(idRecurso, idPublicacao) {
    var bolEdicao = $("#bolEdicao").val();
    var idCaminho = $("#idCaminho").val();
    var intEtapa = $("#intEtapa").val();
    var idEtapa = $("#idEtapa").val();    
    
    if (bolEdicao) {

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/InserirRecurso/",
            data: {
                idCaminho: idCaminho,
                idEtapa: idEtapa,
                intEtapa: intEtapa,
                idRecurso: idRecurso,
                idPublicacao: idPublicacao,
                idAvaliacao: 0
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (idRecursoEtapa) {
                editarEtapa(idEtapa, intEtapa);
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Erro ao salvar recurso!");
                }
                //alert("erro ao salvar recurso!")
            }
        });

    } else {

        $(".busca_recurso").remove();
        $("#recursoitem_ava").css("display", "none"); //lista dos itens do recurso
        $("#mostraPaginas").hide(); //paginação
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/InserirRecurso/",
            data: {
                idCaminho: idCaminho,
                idEtapa: 0,
                intEtapa: intEtapa,
                idRecurso: idRecurso,
                idPublicacao: idPublicacao,
                idAvaliacao: 0
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (idRecursoEtapa) {

                $("#recursoescolhido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", "");
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/ListaRecursoEscolhido/",
                    data: {
                        idRecursoEtapa: idRecursoEtapa
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (recEscolhido) {

                        $("#recursoescolhido").html(recEscolhido);

                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/TerminaEdicaoEtapa/",
                            data: {
                                idRecursoEtapa: idRecursoEtapa
                            },
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (data) {

                                $("#camposEtapa").html(data).css("display", "");

                                $('.ph').addPlaceholder();

                                carregaTiny();

                                $("#listaconteudo_caminho").delegate("#tituloetapa", "keyup", function () {
                                    if ($(this).val() == "") {
                                        $(".atual").children(":first").html("Título<span class='seta_etapa'></span>");
                                    } else {
                                        $(".atual").children(":first").html($(this).val() + "<span class='seta_etapa'></span>");
                                    }
                                });

                                $("#tituloetapa").focus(function () {
                                    $(this).removeClass('ava_field_alert');
                                });

                                $("#im_entrega").click(function () {
                                    if (this.checked) {
                                        $("#obsEntrega").removeAttr("disabled");
                                    } else {
                                        $("#obsEntrega").attr("disabled", "disabled");
                                        $("#obsEntrega").val("");
                                    }
                                })

                                $("#strTituloLink").focus(function () {
                                    $(this).removeClass("ava_field_alert");
                                })

                                $("#strUrl").focus(function () {
                                    $(this).removeClass("ava_field_alert");
                                })

                                $('#valeNota').click(function () {
                                    if (this.checked) {
                                        $("#intValorEtapa").removeAttr("disabled");
                                    } else {
                                        $("#intValorEtapa").attr("disabled", "disabled");
                                        $("#intValorEtapa").removeClass("ava_field_alert");
                                    }
                                });

                                $("#intValorEtapa").focus(function () {
                                    $(this).removeClass("ava_field_alert");
                                })

                                $("#intValorEtapa").setMask('999')

                                $('#toggle_midia').toggle(
			                        function () {
			                            $('#sobedesce_midia').slideDown();
			                            $(this).find('.up_down').html("&#9650;")
			                        }, function () {
			                            $('#sobedesce_midia').slideUp();
			                            $(this).find('.up_down').html("&#9660;")
			                        }
		                        );

                                $('#toggle_entrega').toggle(
			                        function () {
			                            $('#sobedesce_entrega').slideDown();
			                            $(this).find('.up_down').html("&#9650;")
			                        }, function () {
			                            $('#sobedesce_entrega').slideUp();
			                            $(this).find('.up_down').html("&#9660;")
			                        }
		                        );

                                $('#toggle_link').toggle(
			                        function () {
			                            $('#sobedesce_link').slideDown();
			                            $(this).find('.up_down').html("&#9650;")
			                            retornaLinksApoio(idRecursoEtapa);

			                        }, function () {
			                            $('#sobedesce_link').slideUp();
			                            $(this).find('.up_down').html("&#9660;")
			                        }
		                        );

                                $('#toggle_material').toggle(
			                        function () {
			                            $('.sobedesce_material').slideDown();
			                            $(this).find('.up_down').html("&#9650;")


			                        }, function () {
			                            $('.sobedesce_material').slideUp();
			                            $(this).find('.up_down').html("&#9660;")
			                        }
		                        );

                                montarNavegacaoEtapas(0, idCaminho, intEtapa);

                                $("#btnAvancarCaminho").attr("onClick", "avancarConclusao(" + idCaminho + ")");
                                $("#btnAvancarCaminho").removeClass("disable");

                            },
                            error: function (data) {
                                if (data.status != 0) {
                                    console.debug("erro ao terminar edição etapa!");
                                }
                                //alert("erro ao terminar edição etapa!")
                            }
                        });
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao listar recurso escolhido!");
                        }
                        //alert("erro ao listar recurso escolhido!")
                    }
                });
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao salvar recurso");
                }
                //alert("erro ao salvar recurso!")
            }
        });
    }

}

function incluirAvaliacao(idAvaliacao) {
    var bolEdicao = $("#bolEdicao").val();
    var idCaminho = $("#idCaminho").val();
    var intEtapa = $("#intEtapa").val();
    var idEtapa = $("#idEtapa").val();
    var idRecurso = 1;

    if (idEtapa == "" || idEtapa == undefined) {
        idEtapa = 0;
    }

    //$("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $("#recursoitem_ava").css("display", "none");
    $(".busca_recurso").css("display", "none");
    $("#linha_filtro").css("display", "none");
    $("#linha_header_tbl").css("display", "none");
    $("#recurso_ava").css("display", "none");
    $(".ava_ativtable table").css("display", "none");

    $("#recursoescolhido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", "");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecurso/",
        data: {
            idCaminho: idCaminho,
            idEtapa: idEtapa,
            intEtapa: intEtapa,
            idRecurso: idRecurso,
            idPublicacao: 0,
            idAvaliacao: idAvaliacao
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (idRecursoEtapa) {
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaRecursoEscolhido/",
                data: {
                    idRecursoEtapa: idRecursoEtapa
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (recEscolhido) {

                    $("#recursoescolhido").html(recEscolhido).addClass('ava_ativtable');
                    $("#camposEtapa").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", "");
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/TerminaEdicaoEtapa/",
                        data: {
                            idRecursoEtapa: idRecursoEtapa
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {

                            $("#listaconteudo_caminho").delegate("#tituloetapa", "keyup", function () {
                                if ($(this).val() == "") {
                                    $(".atual").children(":first").html("Título<span class='seta_etapa'></span>");
                                } else {
                                    $(".atual").children(":first").html($(this).val() + "<span class='seta_etapa'></span>");
                                }
                            });

                            $('#valeNota').click(function () {
                                if (this.checked) {
                                    $("#intValorEtapa").removeAttr("disabled");
                                } else {
                                    $("#intValorEtapa").attr("disabled", "disabled");
                                }
                            });

                            $("#intValorEtapa").focus(function () {
                                $(this).css("background-color", "");
                            })

                            $('#intValorEtapa').setMask('999');

                            $("#camposEtapa").html(data);
                            montarNavegacaoEtapas(0, idCaminho, intEtapa);

                            $('.ph').addPlaceholder();

                            $('#toggle_midia').toggle(
			                    function () {
			                        $('#sobedesce_midia').slideDown();
			                        $(this).find('.up_down').html("&#9650;")
			                    }, function () {
			                        $('#sobedesce_midia').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            $('#toggle_entrega').toggle(
			                    function () {
			                        $('#sobedesce_entrega').slideDown();
			                        $(this).find('.up_down').html("&#9650;")
			                    }, function () {
			                        $('#sobedesce_entrega').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            $('#toggle_link').toggle(
			                    function () {
			                        $('#sobedesce_link').slideDown();
			                        $(this).find('.up_down').html("&#9650;")
			                        retornaLinksApoio(idRecursoEtapa);

			                    }, function () {
			                        $('#sobedesce_link').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            $('#toggle_material').toggle(
			                    function () {
			                        $('.sobedesce_material').slideDown();
			                        $(this).find('.up_down').html("&#9650;")


			                    }, function () {
			                        $('.sobedesce_material').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            $("#btnAvancarCaminho").attr("onClick", "avancarConclusao(" + idCaminho + ")");
                            $("#btnAvancarCaminho").removeClass("disable");
                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("erro ao terminar edição etapa!");
                            }
                            //alert("erro ao terminar edição etapa!")
                        }
                    });
                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao listar recurso escolhido");
                    }
                    //alert("erro ao listar recurso escolhido!")
                }
            });
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao salvar recurso");
            }
            //alert("erro ao salvar recurso!")
        }
    });


}

function montarNavegacaoEtapas(idEtapa, idCaminho, intEtapa) {
    
    $("#nav_etapas").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/CarregaNavegacaoEtapa/",
        data: {
            idEtapa: idEtapa,
            idCaminho: idCaminho
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (nav_etapas) {
            $("#nav_etapas").html(nav_etapas);

            $(".ne-numeros").removeClass("ativo");
            $("#" + intEtapa).addClass("ativo");

            $(".b_tooltip_center").each(function () {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: 'top center',
                    effect: 'slide',
                    relative: true,
                    events: {
                        def: 'mouseover, mouseout'
                    }
                });
            });

        },
        error: function (data) {
            if (data.status == 0) {
                $("#nav_etapas").empty();
            } else {
                $("#nav_etapas").html("erro ao montar navegação das etapas!")
            }
        }
    });
}

function avancarConclusao(idCaminho) {
    salvarEtapa(true)
}

function editarEtapa(idEtapa, intEtapa) {
    
    $(".step_caminhos").children(":first").removeClass("caminho_atual");
    $(".step_etapas").children(":first").addClass("caminho_atual");
    $(".step_conclusao").children(":first").removeClass("caminho_atual");
    $(".busca_recurso").remove();

    var idCaminho = $("#idCaminho").val();

    $("#listaconteudo_caminho").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

    $.ajax({
        url: "/AVA/Caminhos/Home/RetornaRecursoEtapa/" + idEtapa,
        success: function (idRecursoEtapa) {

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaEdicaoRecursoEscolhido/",
                data: {
                    idRecursoEtapa: idRecursoEtapa,
                    intEtapa: intEtapa
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (recEscolhido) {

                    $("#listaconteudo_caminho").html(recEscolhido)
                    $(".b_tooltip_center").each(function () {
                        $(this).tooltip({
                            offset: [0, 0],
                            opacity: 1,
                            position: 'top center',
                            effect: 'slide',
                            relative: true,
                            events: {
                                def: 'click, mouseout'
                            }
                        });
                    });

                    $("#btnCancelarCaminho").html("Voltar para dados do caminho<span class='awe_icons'></span>");
                    $("#btnCancelarCaminho").attr("onclick", "editar(" + idCaminho + ")")
                    $("#btnCancelarCaminho").addClass("c-voltar");
                    $("#btnCancelarCaminho").removeClass("c-cancelar");

                    $("#ava_barralateral-direita").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/RetornaRotaByIdEtapa/" + idEtapa,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (idRota) {
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/MostraPreview/?id=" + idRota + "&bolEtapa=true&intEtapa=" + intEtapa,
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function (data) {
                                    $("#ava_barralateral-direita").html(data)
                                    $("#btnAvancarCaminho").attr("onClick", "avancarConclusao(" + idRota + ")")
                                    $('#bt_verMaisDescRota').toggle(
			                            function () {
			                                $('html, body').animate({
			                                    scrollTop: $(".placa_verde").offset().top
			                                }, 1000);
			                                $(this).html("veja menos");
			                                $("#caminhoDescr").css("display", "none")
			                                $("#caminhoDescrCompleto").css("display", "")
			                            }, function () {
			                                $('html, body').animate({
			                                    scrollTop: $(".placa_verde").offset().top
			                                }, 1000);
			                                $(this).html("veja mais");
			                                $("#caminhoDescr").css("display", "")
			                                $("#caminhoDescrCompleto").css("display", "none")
			                            }
		                            );

                                },
                                error: function (data) {
                                    if (data.status == 0) {
                                        $("#ava_barralateral-direita").empty();
                                    } else {
                                        $("#ava_barralateral-direita").html("erro ao montar preview!")
                                    }
                                }
                            });
                        },
                        error: function (data) {
                            if (data.status == 0) {
                                $("#ava_barralateral-direita").empty();
                            } else {
                                $("#ava_barralateral-direita").html("erro ao buscar rota do preview!")
                            }
                        }
                    });

                    $("#camposEtapa").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/EditarEtapa/" + idEtapa,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (etapa) {
                            $("#camposEtapa").html(etapa)

                            $('.ph').addPlaceholder();
                            carregaTiny();

                            $("#listaconteudo_caminho").delegate("#tituloetapa", "keyup", function () {
                                if ($(this).val() == "") {
                                    $(".atual").children(":first").html("Título<span class='seta_etapa'></span>");
                                } else {
                                    $(".atual").children(":first").html($(this).val() + "<span class='seta_etapa'></span>");
                                }
                            });

                            $("#tituloetapa").focus(function () {
                                $(this).removeClass('ava_field_alert');
                            });

                            $("#im_entrega").click(function () {
                                if (this.checked) {
                                    $("#obsEntrega").removeAttr("disabled");
                                } else {
                                    $("#obsEntrega").attr("disabled", "disabled");
                                    $("#obsEntrega").val("");
                                }
                            })

                            $("#strTituloLink").focus(function () {
                                $(this).removeClass("ava_field_alert");
                            })

                            $("#strUrl").focus(function () {
                                $(this).removeClass("ava_field_alert");
                            })

                            $('#valeNota').click(function () {
                                if (this.checked) {
                                    $("#intValorEtapa").removeAttr("disabled");
                                } else {
                                    $("#intValorEtapa").attr("disabled", "disabled");
                                    $("#intValorEtapa").removeClass("ava_field_alert");
                                }
                            });

                            $('#intValorEtapa').setMask('999');

                            $("#intValorEtapa").focus(function () {
                                $(this).removeClass("ava_field_alert");
                            })

                            //VERIFICA SE EXISTE LINK INSERIDO, SE TIVER TRAZ ABERTO
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/VerificaRecursoLink/",
                                data: { idEtapa: idEtapa },
                                success: function (qtdlink) {

                                    if (qtdlink > 0) {
                                        $('#sobedesce_link').slideDown();
                                        $("#toggle_link").find('.up_down').html("&#9650;")
                                        retornaLinksApoio(idRecursoEtapa);

                                        $('#toggle_link').toggle(
			                                function () {
			                                    $('#sobedesce_link').slideUp();
			                                    $(this).find('.up_down').html("&#9660;")
			                                }, function () {
			                                    $('#sobedesce_link').slideDown();
			                                    $(this).find('.up_down').html("&#9650;")
			                                }
		                                );
                                    } else {
                                        $('#toggle_link').toggle(
			                                function () {
			                                    $('#sobedesce_link').slideDown();
			                                    $(this).find('.up_down').html("&#9650;")
			                                    retornaLinksApoio(idRecursoEtapa);

			                                }, function () {
			                                    $('#sobedesce_link').slideUp();
			                                    $(this).find('.up_down').html("&#9660;")
			                                }
		                                );
                                    }
                                },
                                error: function (data) {
                                    if (data.status != 0) {
                                        console.debug("erro ao verificar links!");
                                    }
                                    //alert("erro ao verificar links!")
                                }
                            });

                            //VERIFICA SE EXISTE ENTREGA DE TRABALHO INSERIDO, SE TIVER TRAZ ABERTO
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/VerificaRecursoEntrega/",
                                data: { idEtapa: idEtapa },
                                success: function (qtdEntrega) {

                                    if (qtdEntrega > 0) {
                                        $('#sobedesce_entrega').slideDown();
                                        $("#toggle_entrega").find('.up_down').html("&#9650;")

                                        $('#toggle_entrega').toggle(
			                                function () {
			                                    $('#sobedesce_entrega').slideUp();
			                                    $(this).find('.up_down').html("&#9660;")
			                                }, function () {
			                                    $('#sobedesce_entrega').slideDown();
			                                    $(this).find('.up_down').html("&#9650;")
			                                }
		                                );
                                    } else {
                                        $('#toggle_entrega').toggle(
			                                function () {
			                                    $('#sobedesce_entrega').slideDown();
			                                    $(this).find('.up_down').html("&#9650;")
			                                }, function () {
			                                    $('#sobedesce_entrega').slideUp();
			                                    $(this).find('.up_down').html("&#9660;")
			                                }
		                                );
                                    }
                                },
                                error: function (data) {
                                    if (data.status != 0) {
                                        console.debug("erro ao verificar entrega!");
                                    }
                                    //alert("erro ao verificar entrega!")
                                }
                            });

                            //VERIFICA SE EXISTE MÍDIA INSERIDO, SE TIVER TRAZ ABERTO
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/VerificaRecursoMidia/",
                                data: { idEtapa: idEtapa },
                                success: function (qtdMidia) {

                                    if (qtdMidia > 0) {
                                        $('#sobedesce_midia').slideDown();
                                        $("#toggle_midia").find('.up_down').html("&#9650;")

                                        $('#toggle_midia').toggle(
			                            function () {
			                                $('#sobedesce_midia').slideUp();
			                                $(this).find('.up_down').html("&#9660;")
			                            }, function () {
			                                $('#sobedesce_midia').slideDown();
			                                $(this).find('.up_down').html("&#9650;")
			                            }
		                            );
                                    } else {
                                        $('#toggle_midia').toggle(
			                            function () {
			                                $('#sobedesce_midia').slideDown();
			                                $(this).find('.up_down').html("&#9650;")
			                            }, function () {
			                                $('#sobedesce_midia').slideUp();
			                                $(this).find('.up_down').html("&#9660;")
			                            }
		                            );
                                    }
                                },
                                error: function (data) {
                                    if (data.status != 0) {
                                        console.debug("erro ao verificar midia!");
                                    }
                                    //alert("erro ao verificar mídia!")
                                }
                            });

                            $('#toggle_material').toggle(
			                    function () {
			                        $('.sobedesce_material').slideDown();
			                        $(this).find('.up_down').html("&#9650;")


			                    }, function () {
			                        $('.sobedesce_material').slideUp();
			                        $(this).find('.up_down').html("&#9660;")
			                    }
		                    );

                            montarNavegacaoEtapas(idEtapa, 0, intEtapa);


                        },
                        error: function (data) {
                            if (data.status == 0) {
                                $("#camposEtapa").empty();
                            } else {
                                $("#camposEtapa").html("erro ao listar edição da etapa!")
                            }
                        }
                    });

                },
                error: function (data) {
                    if (data.status == 0) {
                        $("#listaconteudo_caminho").empty();
                    } else {
                        $("#listaconteudo_caminho").html("erro ao listar recurso escolhido!")
                    }
                }
            });

        },
        error: function (data) {
            if (data.status == 0) {
                $("#listaconteudo_caminho").empty();
            } else {
                $("#listaconteudo_caminho").html("erro ao buscar recurso etapa");
            }
        }
    });
}

function alteraPreviewMidia() {
    $("#strUrl").val("").removeAttr("disabled");
    $("#sobedesce_midia .midiaEtapa_educador").html("");
    $("#sobedesce_midia a").addClass("awesome-green");
    $("#sobedesce_midia a").html("Inserir");
    $("#sobedesce_midia a").attr("onclick", "montaPreviewMidia()")
}

function montaPreviewMidia() {

    var tipo = 0;
    var idVideo = "";
    
    if ($("#strUrl").val() != undefined && $("#strUrl").val() != "") {
        $("#sobedesce_midia .midiaEtapa_educador").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

        strLinkVideo = $("#strUrl").val();
        var strTipoURL = validarURL(strLinkVideo);        

        if (strTipoURL == "youtubeEncurtado") { //é youtube encurtado            
            tipo = 1;
            idVideo = strLinkVideo.substring(strLinkVideo.indexOf("be/") + 3, strLinkVideo.length);
        } else if (strTipoURL == "youtube") { //é youtube normal            
            tipo = 1;
            if (strLinkVideo.indexOf("&") > 0) {
                idVideo = strLinkVideo.substring(strLinkVideo.indexOf("v=") + 2, strLinkVideo.indexOf("&"));
            } else {
                idVideo = strLinkVideo.substring(strLinkVideo.indexOf("v=") + 2, strLinkVideo.length);
            }
        } else if (strTipoURL == "vimeo") {
            tipo = 2;
            idVideo = strLinkVideo.substring(strLinkVideo.indexOf("vimeo.com/") + 10, strLinkVideo.length);
        } else if (strTipoURL == "globo") {
            tipo = 3;
            var quebraBarra = strLinkVideo.split("/");
            /*var intPosIniIdVideo = strLinkVideo.indexOf("GIM") + 3;
            var intPosFimIdVideo = strLinkVideo.indexOf("-")*/
            idVideo = quebraBarra[quebraBarra.length - 2];
            
            //idVideo = strLinkVideo.substring(intPosIniIdVideo, intPosFimIdVideo)
        } else {
            $("#sobedesce_midia .midiaEtapa_educador").html("URL inválida ou vídeo não encontrado!")
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaPreviewMidia/",
            data: { tipoVideo: tipo, idMidia: idVideo },
            success: function (data) {
                $("#sobedesce_midia .midiaEtapa_educador").html(data);
                $("#strUrl").attr("disabled", "disabled");
                $("#sobedesce_midia a").removeClass("awesome-green");
                $("#sobedesce_midia a").html("Alterar");
                $("#sobedesce_midia a").attr("onclick", "alteraPreviewMidia()")

            },
            error: function (data) {
                if (data.status == 0) {
                    $("#sobedesce_midia .midiaEtapa_educador").empty();
                } else {
                    $("#sobedesce_midia .midiaEtapa_educador").html("erro ao mostrar preview da mídia!")
                }
            }
        });
    } else {        
        $("#strUrl").addClass("ava_field_alert");
        $('html, body').animate({
            scrollTop: $("#anc_strURL").offset().top
        }, 1000);
        return false;
    }  

}

function adicionarEtapa(idCaminho) {
    if (salvarEtapa(false)) {
        criarEtapa(idCaminho);
    }
}

function criarEtapa(idCaminho) {

    $(".step_caminhos").children(":first").removeClass("caminho_atual");
    $(".step_conclusao").children(":first").removeClass("caminho_atual");
    $(".step_etapas").children(":first").addClass("caminho_atual");

    $("#listaconteudo_caminho").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

    $.ajax({
        url: "/AVA/Caminhos/Home/CriarEtapa/" + idCaminho,
        success: function (data) {
            $("#listaconteudo_caminho").html(data);

            $("#listaconteudo_caminho #idCaminho").val(idCaminho);
            $("#btnAvancarCaminho").addClass("disable");
            $("#btnAvancarCaminho").removeAttr("onclick");

            $("#btnCancelarCaminho").html("Voltar para dados do caminho<span class='awe_icons'></span>");
            $("#btnCancelarCaminho").attr("onclick", "editar(" + idCaminho + ")")
            $("#btnCancelarCaminho").addClass("c-voltar");
            $("#btnCancelarCaminho").removeClass("c-cancelar");

            carregaTiny();

            $(".r-box").mouseenter(function () {
                var div = $(this).children(":first");
                div.fadeIn('fast');
            });
            $(".r-s-desc").mouseleave(function () {
                $(this).fadeOut('fast');
            });

            $('.cover').mosaic({
                animation: 'slide', //fade or slide
                speed: 500,
                hover_x: '400px'		//Horizontal position on hover
            });

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/MostraPreview/?id=" + idCaminho + "&bolEtapa=true",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $("#ava_barralateral-direita").html(data)

                    $("#recurso_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                    $.ajax({
                        url: "/AVA/Caminhos/Home/RetornaRecurso/?idCategoria=-999",
                        success: function (recursos) {
                            $("#recurso_ava").html(recursos);
                        },
                        error: function (data) {
                            if (data.status == 0) {
                                $("#recurso_ava").empty();
                            } else {
                                $("#recurso_ava").html("erro ao listar os recursos");
                            }
                        }
                    });

                    $('#bt_verMaisDescRota').toggle(
			            function () {
			                $('html, body').animate({
			                    scrollTop: $(".placa_verde").offset().top
			                }, 1000);
			                $(this).html("veja menos");
			                $("#caminhoDescr").css("display", "none")
			                $("#caminhoDescrCompleto").css("display", "")
			            }, function () {
			                $('html, body').animate({
			                    scrollTop: $(".placa_verde").offset().top
			                }, 1000);
			                $(this).html("veja mais");
			                $("#caminhoDescr").css("display", "")
			                $("#caminhoDescrCompleto").css("display", "none")
			            }
		            );

                },
                error: function (data) {
                    if (data.status == 0) {
                        $("#ava_barralateral-direita").empty();

                    } else {

                        $("#ava_barralateral-direita").html("erro ao montar preview!")
                    }
                }
            });

        },
        error: function (data) {
            if (data.status == 0) {
                $("#listaconteudo_caminho").empty();
            } else {
                $("#listaconteudo_caminho").html("erro ao carregar etapa");
            }
        }
    });

}

function inserirLinkApoio() {

    var strTitulo = $("#strTituloLink").val();
    var strLink = $("#strLinkApoio").val();

    if (strTitulo == "") {
        $("#strTituloLink").addClass("ava_field_alert");
        $('html, body').animate({
            scrollTop: $("#anc_linkApoio").offset().top
        }, 1000);
        return false;
    } else if (strLink == "") {
        $("#strLinkApoio").addClass("ava_field_alert");
        $('html, body').animate({
            scrollTop: $("#anc_linkApoio").offset().top
        }, 1000);
        return false;
    }

    if (strLink.indexOf("http") < 0 || strLink.indexOf("https") < 0) {
        strLink = "http://"+strLink
    }
    
    //var sel = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/    
    var sel = /^(http[s]?:\/\/)?(www\.)?[a-zA-Z0-9-\.]+\.(com|org|net|mil|edu|ca|co.uk|com.au|gov|br)/
    var ver = sel.exec(strLink);

    if (!ver) {
        mostraAlertaEtapa("URL inserida não é válida.");
        return false;
    }

    var idRecursoEtapa = $("#idRecursoEtapa").val();
    var idEtapa = $("#idEtapa").val();

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarLinkApoio/",
        data: {
            idRecursoEtapa: idRecursoEtapa,
            strTitulo: strTitulo,
            strLink: strLink
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            retornaLinksApoio(idRecursoEtapa);
            $("#strTituloLink").val("");
            $("#strLinkApoio").val("");
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao salvar etapa!");
            }
            //alert("erro ao salvar etapa!")
        }
    });

}

function retornaLinksApoio(idRecursoEtapa) {
   
    $(".container_inlinks").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SelecionarLinksEtapa/",
        data: { idRecursoEtapa: idRecursoEtapa },
        success: function (data) {
            $(".container_inlinks").html(data);
        },
        error: function (data) {
            if (data.status == 0) {
                $(".container_inlinks").empty();
            } else {
                $(".container_inlinks").html("erro ao buscar links inseridos!")
            }
        }
    });
}

function removerLinkApoio(idRecursoLink) {
    var idEtapa = $("#idEtapa").val();

    $(".container_inlinks").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirLinkApoio/",
        data: { idLink: idRecursoLink },
        success: function (data) {
            retornaLinksApoio(idEtapa)
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

function validarURL(texto) {
    var strRetorno = "";
    var sel = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var ver = sel.exec(texto);
    
    if (texto == "") {
        $("#strUrl").addClass("ava_field_alert");
        $('html, body').animate({
            scrollTop: $("#anc_strURL").offset().top
        }, 1000);
        return false;
    } else {
        if (!ver) {
            mostraAlertaEtapa("URL inserida não é válida.");
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
                    mostraAlertaEtapa("URL da globo falta o parâmetro ID.");
                    return false;
                }
            } else if (texto.indexOf("globotv.globo.com/") > 0) {
                var quebraBarra = texto.split("/");
                var confirmaIdVideo;
                //var tamanhoUrl = texto.length;
                if (texto.substring(texto.length - 1, texto.length) == "/") {
                    confirmaIdVideo = 2;
                } else {
                    confirmaIdVideo = 1;
                }

                if (!isNaN(quebraBarra[quebraBarra.length - confirmaIdVideo])) {
                    strRetorno = "globo";
                } else {
                    mostraAlertaEtapa("URL da globo falta o parâmetro ID.");
                    return false;
                }
                
            } else {
                mostraAlertaEtapa("URL inserida não é válida.");
                return false;
            }
            
        }
    }
    return strRetorno;
}

function mostraAlertaEtapa(strMensagem) {
    $("#btEscondidoEtapa").attr('href', '/ava/caminhos/home/Alert/?strMensagem=' + strMensagem);
    var t = $("#btEscondidoEtapa");
    var o = { 'autoDimensions': false, 'width': 400, 'height': 100, 'hideOnOverlayClick': false, 'onComplete': function () {

        $("#fecharLightBox").click(function () {
            $("#fancybox-close").click();
        })

    } //function
    }

    lightBoxAVA(t, o);
    $("#btEscondidoEtapa").click();
}

function salvarEtapa(bolAvancarConclusao) {
    
    var bolAvaliacao = $("#bolAvaliacao").val();
    
    if (bolAvaliacao == "False" || bolAvaliacao == "false") {
        tinyMCE.triggerSave(); //para poder pegar o conteúdo do tiny
    }
    
    $titulo = $("#tituloetapa").val();
    $descricao = $(".txtDescricaoEtapa").val();
    $idCaminho = $("#idCaminho").val();
    $intEtapa = $("#intEtapa").val();
    $idEtapa = $("#idEtapa").val();
    var tipo = 0;
    var idVideo = "";
    var strLinkVideo = "";
    var strObsEntrega = "";

    if ($("#strUrl").val() != undefined && $("#strUrl").val() != "" && $("#strUrl").val() != "Insira a URL") {
        strLinkVideo = $("#strUrl").val();
        var strTipoURL = validarURL(strLinkVideo);
        
        if (strTipoURL == "youtubeEncurtado") { //é youtube encurtado            
            tipo = 1;
            idVideo = strLinkVideo.substring(strLinkVideo.indexOf("be/") + 3, strLinkVideo.length);
        } else if (strTipoURL == "youtube") { //é youtube normal            
            tipo = 1;
            if (strLinkVideo.indexOf("&") > 0) {
                idVideo = strLinkVideo.substring(strLinkVideo.indexOf("v=") + 2, strLinkVideo.indexOf("&"));
            } else {
                idVideo = strLinkVideo.substring(strLinkVideo.indexOf("v=") + 2, strLinkVideo.length);
            }
        } else if (strTipoURL == "vimeo") {            
            tipo = 2;
            idVideo = strLinkVideo.substring(strLinkVideo.indexOf("vimeo.com/") + 10, strLinkVideo.length);
        } else if (strTipoURL == "globo") {
            tipo = 3;
            var quebraBarra = strLinkVideo.split("/");
            /*var intPosIniIdVideo = strLinkVideo.indexOf("GIM") + 3;
            var intPosFimIdVideo = strLinkVideo.indexOf("-")*/
            idVideo = quebraBarra[quebraBarra.length - 2];
            //idVideo = strLinkVideo.substring(intPosIniIdVideo, intPosFimIdVideo)
        } else {
            return false;
        }
    }

    var bolEntrega = false;

    if ($("#im_entrega").attr('checked')) {
        bolEntrega = true;

        if ($("#obsEntrega").val() == "Escreva aqui uma orientação para os alunos") {
            strObsEntrega = "";
        } else {
            strObsEntrega = $("#obsEntrega").val();
        }
               
    }

    if ($titulo == "" || $titulo == "Escreva aqui um título para a sua etapa") {
        $("#tituloetapa").addClass("ava_field_alert");
        $('html, body').animate({
            scrollTop: $("#anc_titEtapa").offset().top - 60
        }, 1000);
        return false;
    }

    $(".atual").children(":first").html($titulo + "<span class='seta_etapa'></span>");
    
    if ($('#valeNota').attr('checked')) {
        $intValorEtapa = $("#intValorEtapa").val();
        if ($intValorEtapa == "") {
            $('html, body').animate({
                scrollTop: $("#intValorEtapa").offset().top
            }, 1000);
            $("#intValorEtapa").addClass("ava_field_alert");
            return false;
        }
    } else {
        $intValorEtapa = 0;
    }

    $("#btSalvarEtapaSpan").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Salvando...");

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarEtapa/",
        data: {
            idEtapa: $idEtapa,
            idCaminho: $idCaminho,
            intEtapa: $intEtapa,
            strEtapa: $titulo,
            strDescricao: $descricao,
            intValor: $intValorEtapa,
            idMidia: idVideo,
            idTipoMidia: tipo,
            strLinkMidia: strLinkVideo,
            bolEntrega: bolEntrega,
            strObsEntrega: strObsEntrega
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (ret) {
            $("#btSalvarEtapaSpan").html('<a href="javascript: void(0);" class="ne-salvar large awesome awesome-green" id="btSalvarEtapa" onclick="salvarEtapa(false)">salvar</a>');
            if (bolAvancarConclusao) {
                window.location.href = '/ava/caminhos/home/concluir/' + $idCaminho;
            }
        },
        error: function (data) {
            //alert("erro ao salvar etapa!")
            if (data.status != 0) {
                console.debug("erro ao salvar etapa!");
            }
        }
    });
    return true;
      
}

function substituirRecurso(idRecursoItem, acao) {

    $idCaminho = $("#idCaminho").val();
    $idEtapa = $("#idEtapa").val();
    $intEtapa = $("#intEtapa").val();
    $idRecurso = $("#idRecurso").val();
    $idCategoria = $("#idCategoriaPublicacao").val();

    if ($idRecurso == undefined) {
        $idRecurso = 1;
    }
    if ($idCategoria == undefined) {
        $idCategoria = 0;
    }
    
    if (acao) {
        
        abrirRecursoEdicao($idCategoria, $idRecurso, $idEtapa, $intEtapa);
        $("#btnAvancarCaminho").attr("disabled", "disabled");
        $("#camposEtapa").css("display", "none");

    } else {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + $idEtapa,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (ret) {
            criarEtapa($idCaminho)
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao excluir etapa!");
            }
            //alert("erro ao excluir etapa!")
        }
    });

    }

}

function excluirEtapa() {
    
    $("#btExcluirEtapa").attr("disabled", "disabled");

    $idCaminho = $("#idCaminho").val();
    $idEtapa = $("#idEtapa").val();

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + $idEtapa,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (ret) {
            window.location.href = "/ava/caminhos/home/criar/" + $idCaminho;
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao excluir etapa!");
            }
            //alert("erro ao excluir etapa!")
        }
    });   

}

function excluirEtapaConclusao(idEtapa, idCaminho) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + idEtapa,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function () {
            window.location.href = "/ava/caminhos/home/concluir/" + idCaminho;
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao excluir etapa!");
            }
            //alert("erro ao excluir etapa!")
        }
    });

}

function excluirRota(id, bolVaiExcluir) {
    if (bolVaiExcluir) {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirRota/" + id,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function () {
                window.location.href = "/ava/caminhos/";
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao excluir caminho!");
                }
                //alert("erro ao excluir caminho!")
            }
        });
    } else {
        $('#tooltipExc_' + id).css('display', 'none');
    }
    
}

function agendar(idCaminho) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/VerificaSeTemTurma",
        success: function (msg) {
            if (msg != "ok") {
                strMensagem = "Você não tem turmas associadas. <br>Entre em contato com a secretaria da sua escola.";

                $("#btEscondidoAgendamento").attr('href', '/ava/caminhos/home/Alert/?strMensagem=' + strMensagem);
                var t = $("#btEscondidoAgendamento");
                var o = { 'autoDimensions': false, 'width': 450, 'height': 100, 'hideOnOverlayClick': false, 'onComplete': function () {

                    $("#fecharLightBox").click(function () {
                        $("#fancybox-close").click();
                    })

                } //function
                }

                lightBoxAVA(t, o);
                $("#btEscondidoAgendamento").click();

            } else {

                $('#ancora_agendamento').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css('display', 'block');
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/Agendar/" + idCaminho,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        $("#ancora_agendamento").html(data);

                        //Mascaras
                        $('#dataInicio').setMask('date'); // data
                        $('#dataFim').setMask('date'); // data
                        $('#horaInicio').setMask('29:59').timepicker({
                            myPosition: 'right top',
                            atPosition: 'right bottom'
                        }); // hora
                        $('#horaFim').setMask('29:59').timepicker({
                            myPosition: 'right top',
                            atPosition: 'right bottom'
                        }); // hora
                        

                        //Carrega os calendarios para data de inicio e fim do agendamento			
                        montaCampoData('#dataInicio');
                        montaCampoData('#dataFim');

                        $("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function () {
                            $(this).removeClass("ava_field_alert");
                        })

                        $('html, body').animate({
                            scrollTop: $("#ancora_agendamento").offset().top
                        }, 1000);

                        $("#btnAgendarConclusao").removeAttr("onclick");
                        $("#btnAgendarConclusao").addClass("disable");

                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao carregar agendamento");
                        }
                        //alert("erro ao carregar agendamento!")
                    }
                });

            }

        },
        error: function () {
            strMensagem = "erro"
        }
    });

}

function irParaConclusao(idCaminho) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/VerificaSeTemTurma",
        success: function (msg) {
            if (msg != "ok") {
                strMensagem = "Você não tem turmas associadas. <br>Entre em contato com a secretaria da sua escola.";

                $("#btEscondidoAgendamento_" + idCaminho).attr('href', '/ava/caminhos/home/Alert/?strMensagem=' + strMensagem);
                var t = $("#btEscondidoAgendamento_" + idCaminho);
                var o = { 'autoDimensions': false, 'width': 450, 'height': 100, 'hideOnOverlayClick': false, 'onComplete': function () {

                    $("#fecharLightBox").click(function () {
                        $("#fancybox-close").click();
                    })

                } //function
                }

                lightBoxAVA(t, o);
                $("#btEscondidoAgendamento_" + idCaminho).click();
            } else {
                window.location.href = "/ava/caminhos/home/concluir/" + idCaminho;
            }
        }
    });
    

}

function concluirAgendamento(idRotaAgendamento, idCaminho) {

    $dataInicio = $("#dataInicio").val();
    $dataFim = $("#dataFim").val();
    $horaInicio = $("#horaInicio").val();
    $horaFim = $("#horaFim").val();

    var strMensagem = validaAgendamento($dataInicio, $dataFim, $horaInicio, $horaFim);

    var txtDisponivel = $("#txtDisponivel").text();
    var txtTitulo = $("#txtTitulo").text();
    $strComplemento = $("#strComplementoAgendamento").val();

    var txtInput = $strComplemento + " ("+txtTitulo+") "+ txtDisponivel

    $("#txtInput").val(txtInput);

    if (strMensagem == "ok") {
        $("#btConcluirAgendamentoSpan").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/InserirAgendamento",
            data: {
                idRotaAgendamento: idRotaAgendamento,
                idCaminho: idCaminho,
                dataInicio: $dataInicio,
                horaInicio: $horaInicio,
                dataFim: $dataFim,
                horaFim: $horaFim,
                strComplemento: $strComplemento,
                jsonAgendamento: montaJSON($(".compartilhamento"))
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (idRotaAgendamentoAux) {

                //vai postar na timeline
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
                    data: {
                        destino: montaJSON($(".compartilhamento")),
                        idFerramentaTipo: 14,
                        idFerramenta: idRotaAgendamentoAux,
                        idEtapa:0,
                        strMensagem: txtInput
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        var strMensagem = "Caminho agendado com sucesso!"
                        $("#btEscondidoAgendamento").attr('href', '/ava/caminhos/home/Alert/?strMensagem=' + strMensagem);
                        var t = $("#btEscondidoAgendamento");
                        var o = { 'autoDimensions': false, 'width': 400, 'height': 100, 'hideOnOverlayClick': false, 'onComplete': function () {

                            $("#fecharLightBox").click(function () {
                                $("#fancybox-close").click();
                                window.location.href = "/ava/caminhos"
                            })

                        } //function
                        }

                        /*lightBoxAVA(t, o);
                        $("#btEscondidoAgendamento").click();*/


                        if ($dataInicio == $("#currentDay").val()) {
                            //window.location.href = "/ava/caminhos"
                        } else {
                            //vai postar na timeline alerta no dia
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
                                data: {
                                    destino: montaJSON($(".compartilhamento")),
                                    idFerramentaTipo: 15,
                                    idFerramenta: idRotaAgendamentoAux,
                                    idEtapa:0,
                                    dtmCriacao: $dataInicio,
                                    strMensagem: txtInput
                                },
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function (data) {
                                    //alert(data);
                                    //window.location.href = "/ava/caminhos"
                                },
                                error: function (data) {
                                    alert("erro ao postar alerta agendamento!")
                                }
                            });
                        }

                        lightBoxAVA(t, o);
                        $("#btEscondidoAgendamento").click();
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao postar agendamento!");
                        }
                        //alert("erro ao postar agendamento!")
                    }
                });

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao inserir agendamento!");
                }
                //alert("erro ao inserir agendamento!")
            }
        });

    } else if (strMensagem == "erro") {
        return false;
    }else {
        
        $("#btEscondidoAgendamento").attr('href', '/ava/caminhos/home/Alert/?strMensagem=' + strMensagem);
        var t = $("#btEscondidoAgendamento");
        var o = { 'autoDimensions': false, 'width': 400, 'height': 100, 'hideOnOverlayClick': false, 'onComplete': function () {

            $("#fecharLightBox").click(function () {
                $("#fancybox-close").click();
            })

        } //function
        }

        lightBoxAVA(t, o);
        $("#btEscondidoAgendamento").click();
        
    }

}

function validaAgendamento(dtmInicio, dtmFim, horaInicio, horaFim) {

    var strMensagem = "ok";

    if ($dataInicio == "") {
        $("#dataInicio").addClass("ava_field_alert");
        strMensagem = "erro";
    } else if ($dataFim == "") {
        $("#dataFim").addClass("ava_field_alert");
        strMensagem = "erro";
    } else if ($horaInicio == "") {
        $("#horaInicio").addClass("ava_field_alert");
        strMensagem = "erro";
    } else if ($horaFim == "") {
        $("#horaFim").addClass("ava_field_alert");
        strMensagem = "erro";
    } else {

        if (validaData($dataInicio) == false) {
            strMensagem = "Data inicial inválida."
        } else if (validaData($dataFim) == false) {
            strMensagem = "Data final inválida."
        } else if (validaHora($horaInicio) == false) {
            strMensagem = "Hora inicial inválida."
        } else if (validaHora($horaFim) == false) {
            strMensagem = "Hora final inválida."
        }

        var dtmInicio = $dataInicio.split('/');
        var dtmInicioAux = dtmInicio[2] + dtmInicio[1] + dtmInicio[0];
        var dtmFim = $dataFim.split('/');
        var dtmFimAux = dtmFim[2] + dtmFim[1] + dtmFim[0];

        var horaInicio = $horaInicio.split(':');
        var horaInicioAux = horaInicio[0] + horaInicio[1];
        var horaFim = $horaFim.split('/');
        var horaFimAux = horaFim[0] + horaFim[1];

        var dtmAtual = $("#dtmAtualServidor").val().split(" ");
        var dataAtual = dtmAtual[0].split("/");
        var horaAtual = dtmAtual[1].split(":");

        var dataAtualAux = dataAtual[2] + dataAtual[1] + dataAtual[0];
        var horaAtualAux = horaAtual[0] + horaAtual[1];

        if (dtmInicioAux > dtmFimAux) {
            strMensagem = "Data inicial tem que ser menor que Data final.";
        } else if (dtmInicioAux == dataAtualAux) {
            if (horaInicioAux <= horaAtualAux) {
                strMensagem = "Hora inicial tem que ser maior que a hora atual.";
            }
            if (dtmInicioAux == dtmFimAux) {
                if (horaInicioAux >= horaFimAux) {
                    strMensagem = "Hora inicial tem que ser menor que Hora final.";
                }
            }
        } else if (dtmInicioAux < dataAtualAux) {
            strMensagem = "Data inicial tem que ser maior que a Data atual.";
        } else {
            if (dtmInicioAux == dtmFimAux) {
                if (horaInicioAux >= horaFimAux) {
                    strMensagem = "Hora inicial tem que ser menor que Hora final.";
                }
            }
        }
    }

    return strMensagem;

}


function validaData(valor) {
    var date = valor;
    var ardt = new Array;
    var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    ardt = date.split("/");
    erro = false;
    if (date.search(ExpReg) == -1) {
        erro = true;
    }
    else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11)) && (ardt[0] > 30))
        erro = true;
    else if (ardt[1] == 2) {
        if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
            erro = true;
        if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
            erro = true;
    }
    if (erro) {
        return false;
    }
    return true;
}

function validaHora(horario) {
    var arrHorario = new Array;
    arrHorario = horario.split(":");

    if ((arrHorario[0] < 00) || (arrHorario[0] > 23) || (arrHorario[1] < 00) || (arrHorario[1] > 59)) {
        return false;
    }

    return true;

} 


function cancelarAgendamento() {
    $('#ancora_agendamento').html("").css('display', 'none');
    $('html, body').animate({
        scrollTop: $("#ava_steps").offset().top
    }, 1000);
    $("#btnAgendarConclusao").attr("onclick", "agendar("+$("#idCaminho").val().trim()+")");
    $("#btnAgendarConclusao").removeClass("disable");
}

function procurarRecurso(idRecurso, idcat) {
    rodarGlobal = 0;
    strPesquisaGlobal = $("#strPesquisaRecurso").val();
    idRecursoGlobal = idRecurso;
    idCategoriaGlobal = idcat;

    $("#mostraPaginas").hide();

    if (strPesquisaGlobal == "") {

    } else {

        $('#recursoitem_ava').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ProcurarRecursoItem",
            data: {
                idCategoria: idCategoriaGlobal,
                idRecurso: idRecursoGlobal,
                strPesquisa: strPesquisaGlobal,
                intInicio: 1,
                intFim: 10
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                $("#recursoitem_ava").html(data);
                paginacao(idCategoriaGlobal, strPesquisaGlobal, idRecursoGlobal);
                $('.ava_container_masonry').masonry({
                    itemSelector: '.ava_box_masonry'
                });
            },
            error: function (data) {
                if (data.status == 0) {
                    $("#recuroitem_ava").empty();
                } else {
                    $("#recursoitem_ava").html("Erro ao procurar recurso.")
                }
            }
        });

    }

}

function finalizar(idCaminho) {

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/VerificaSeFoiAgendado",
        data: {
            id: idCaminho
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (foiAgendado) {
            if (foiAgendado.toString().toLowerCase() == "true") {
                window.location = "/ava/caminhos";
            } else {

                var t = $("#confirmaAgendamento");
                var o = { 'autoDimensions': false, 'width': 550, 'height': 350, 'onComplete': function () {
                } //function
                }

                lightBoxAVA(t, o);

                $("#confirmaAgendamento").click();

            }
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("Erro ao verificar agendamento!");
            }
            //alert("Erro ao vefiricar agendamento.")
        }
    });
}

function prepararAgendamento(idCaminho) {
    $("#fancybox-close").click();
    agendar(idCaminho);
}

function naoAgendar() {
    $("#fancybox-close").click();
    window.location = "/ava/caminhos";
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
            
            if ($("#dInicio").html() != undefined) {
                if (field_ == "#dataInicio") {
                    $("#dInicio").html(formated);
                } else if (field_ == "#dataFim") {
                    $("#dFim").html(formated);
                }
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

function limparfiltro() {
    $('#escola_aval, #portal_aval, #cbCompartilhada, #cbPrivado, #minhas_aval').removeAttr('checked');
    $('#strPesquisa').val('');
    $('#dataInicio, #dataFim').val('');
    $("#minhas_aval").attr('checked', true);
}

function filtrarAvaliacoes() {
    
    $tipopesquisa = $("input:radio[name=tipopesquisa]:checked").val(); //1=minhas,2=escola,3=portal
    
    idEstado = "";
    $("input:checkbox[name=idEstadoFiltro]:checked").each(function () {
        idEstado += $(this).val();
    });
    if (idEstado == "") {
        idEstado = -1;
    } else if (idEstado.lenght > 1) {
        idEstado = 1;
    }

    $tituloAval = $('#strPesquisa').val();

    $dataInicio = $('#dataInicio').val();
    $dataFim = $('#dataFim').val();

    if ($dataInicio.length > 0 && $dataFim.length > 0) {
        var arrDataInicio = $dataInicio.split("/");
        $dataInicio = arrDataInicio[2] + "-" + arrDataInicio[1] + "-" + arrDataInicio[0];
        var arrDataFim = $dataFim.split("/");
        $dataFim = arrDataFim[2] + "-" + arrDataFim[1] + "-" + arrDataFim[0];
    } else if ($dataInicio.length <= 0 && $dataFim.length > 0) {
        alert("Favor preencher a data inicial!")
        return false;
    } else if ($dataInicio.length > 0 && $dataFim.length <= 0) {
        alert("Favor preencher a data final!")
        return false;
    }

    $("#mostraPaginas").hide();

    montaLajotinhaFiltro($tipopesquisa, idEstado, $tituloAval, $('#dataInicio').val(), $('#dataFim').val());
    
    $('#filtro_aval').hide();
    $('#escorregaFiltro').html("Adicionar filtros &#9660;");

    $("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaAvaliacoes/",
        async: false,
        data: {
            tipo: $tipopesquisa,
            strEstados: "2, 3, 5, 6, 8, 10",
            dtmInicio: $dataInicio,
            dtmFim: $dataFim,
            strPesquisa: $tituloAval,
            strPesquisaEncode1: $tituloAval,
            strPesquisaEncode2: $tituloAval,
            idEstado: idEstado,
            intInicio: 1,
            intFim: 10,
            intTipoOrdenacao: 1
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (itens) {
            $("#recursoitem_ava").html(itens)

            $(".mouseover_aval").mouseover(function () {
                $(this).children(":first").find("div").css("display", "block");
            }).mouseout(function () {
                $(this).children(":first").find("div").css("display", "none");
            });

        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao listar recursos!");
            }
            //alert("erro ao listar recursos!")
        }
    });
    rodarGlobal = 0;
    paginacaoTotal(idCategoriaGlobal, idRecursoGlobal);
}

function montaLajotinhaFiltro(tipo, estado, titulo, dataInicio, dataFim) {

    $('.lajotinhas ul').html('');

    /*********TIPO PESQUISA*************/
    var strTipo = "Minhas"
    if (tipo == 2) {
        strTipo = "Escola"
    } else if (tipo == 3) {
        strTipo = "Portal"
    }

    $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">' + strTipo + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(1, 1)">x</a></span></span></li>')

    /*********ESTADO*************/
    if (estado != "") {
        if (estado == 5) {
            $('.lajotinhas ul').append('<li id="2"><span class="lajotinha">Pública<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(2,2)">x</a></span></span></li>')
        } else if (estado == 6) {
            $('.lajotinhas ul').append('<li id="2"><span class="lajotinha">Privada<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(2,3)">x</a></span></span></li>')
        } else if (estado == 56) { //publica e privada
            $('.lajotinhas ul').append('<li id="2"><span class="lajotinha">Pública<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(2,2)">x</a></span></span></li>')
            $('.lajotinhas ul').append('<li id="3"><span class="lajotinha">Privada<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(3,3)">x</a></span></span></li>')
        }
    }

    if (titulo != "") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })

        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + titulo + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(' + cont + ', 4)">x</a></span></span></li>')
    }

    if (dataInicio != "" && dataFim != "") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })

        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + dataInicio + ' a ' + dataFim + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltro(' + cont + ', 5)">x</a></span></span></li>')

    }

    $('.lajotinhas a.bt_normal').remove();


}

function excluirFiltro(idLI, qual) {

    /****
    1=tipoPesquisa
    2=compartilhado
    3=privado
    4=titulo
    5=data        
    ***/

    if (qual == 1) {
        $("#minhas_aval").attr('checked', true);
    } else if (qual == 2) {
        $('#cbCompartilhada').removeAttr('checked');
    } else if (qual == 3) {
        $('#cbPrivado').removeAttr('checked');
    } else if (qual == 4) {
        $('#strPesquisa').val('');
    } else if (qual == 5) {
        $('#dataInicio, #dataFim').val('');
    }

    $('#' + idLI).remove();

    $('.lajotinhas a.bt_normal').remove();
    $('.lajotinhas').append('<a class="bt_normal" href="javascript: void(0);" onclick="filtrarAvaliacoes();"><span class="ava_refresh"></span>atualizar filtro</a>');
}

function filtrarCaminho() {

    var tipopesquisa = "";
    var intMeus = 1;
    var intEscola = 1;
    var intPortal = 1;
   
    $("input:checkbox[name=tipopesquisa]:checked").each(function () {
        tipopesquisa += $(this).val();
    });
    
    if (tipopesquisa == "") {
        tipopesquisa = "123";
        $("#meus_cam").attr('checked', true);
        $("#escola_cam").attr('checked', true);
        $("#portal_cam").attr('checked', true);
    }

    if (tipopesquisa == "1") {
        intMeus = 1;
        intEscola = 0;
        intPortal = 0;
    }else if(tipopesquisa == "2"){
        intMeus = 0;
        intEscola = 1;
        intPortal = 0;
    }else if(tipopesquisa == "3"){
        intMeus = 0;
        intEscola = 0;
        intPortal = 1;
    }else if(tipopesquisa == "12"){
        intMeus = 1;
        intEscola = 1;
        intPortal = 0;
    }else if(tipopesquisa == "13"){
        intMeus = 1;
        intEscola = 0;
        intPortal = 1;
    }else if(tipopesquisa == "23"){
        intMeus = 0;
        intEscola = 1;
        intPortal = 1;
    }
    
    $palavrachave = $('#strPesquisa').val();

    $dataInicio = $('#dataInicio').val();
    $dataFim = $('#dataFim').val();

    if ($dataInicio.length > 0 && $dataFim.length > 0) {
        var arrDataInicio = $dataInicio.split("/");
        $dataInicio = arrDataInicio[2] + "-" + arrDataInicio[1] + "-" + arrDataInicio[0];
        var arrDataFim = $dataFim.split("/");
        $dataFim = arrDataFim[2] + "-" + arrDataFim[1] + "-" + arrDataFim[0];
    } else if ($dataInicio.length <= 0 && $dataFim.length > 0) {
        alert("Favor preencher a data inicial!")
        return false;
    } else if ($dataInicio.length > 0 && $dataFim.length <= 0) {
        alert("Favor preencher a data final!")
        return false;
    }

    montaLajotinhaFiltroCaminho(tipopesquisa, $palavrachave, $('#dataInicio').val(), $('#dataFim').val());
    
    abrirBancoCaminhos(intMeus, intEscola, intPortal, $palavrachave, $dataInicio, $dataFim, true);
}

function montaLajotinhaFiltroCaminho(tipo, palavrachave, dataInicio, dataFim) {
    
    $('.lajotinhas ul').html('');

    /*********TIPO PESQUISA*************/   
    if (tipo == "123") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Meus<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 1)">x</a></span></span></li>')
        $('.lajotinhas ul').append('<li id="2"><span class="lajotinha">Escola<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(2, 1, 2)">x</a></span></span></li>')
        $('.lajotinhas ul').append('<li id="3"><span class="lajotinha">Portal<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(3, 1, 3)">x</a></span></span></li>')
    } else if (tipo == "12") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++;        
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Meus<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho('+cont+', 1, 1)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Escola<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho('+cont+', 1, 2)">x</a></span></span></li>')
    } else if (tipo == "13") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++; 
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Meus<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho('+cont+', 1, 1)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Portal<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho('+cont+', 1, 3)">x</a></span></span></li>')    
    } else if (tipo == "23") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++; 
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Escola<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho('+cont+', 1, 2)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Portal<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho('+cont+', 1, 3)">x</a></span></span></li>')
    } else if (tipo == "1") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Meus<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 1)">x</a></span></span></li>')
    }
    else if (tipo == "2") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Escola<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 2)">x</a></span></span></li>')
    }
    else if (tipo == "3") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Portal<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 3)">x</a></span></span></li>')
    }
    
    if (palavrachave != "") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })

        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + palavrachave + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + cont + ', 2, 4)">x</a></span></span></li>')
    }

    if (dataInicio != "" && dataFim != "") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })

        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + dataInicio + ' a ' + dataFim + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + cont + ', 3, 5)">x</a></span></span></li>')
    }

    $('.lajotinhas a.bt_normal').remove();

}

function excluirFiltroCaminho(idLI, qual, tipo) {

    if (tipo == 1 || tipo == 2 || tipo == 3) { //tipopesquisa
        if (tipo == 1) {
            $("#meus_cam").attr('checked', false);
        } else if (tipo == 2) {
            $("#escola_cam").attr('checked', false);
        } else if (tipo == 3) {
            $("#portal_cam").attr('checked', false);
        }
    }

    if (tipo == 4) { //palavrachave
        $("#strPesquisa").val('');
    }

    if (tipo == 5) { //dtmInicio e dtmFim
        $('#dataInicio, #dataFim').val('');
    }

    $('#' + idLI).remove();

    $('.lajotinhas a.bt_normal').remove();
    $('.lajotinhas').append('<a class="bt_normal" href="javascript: void(0);" onclick="filtrarCaminho();"><span class="ava_refresh"></span>atualizar filtro</a>');
}

function filtrarTarefa() {

    var tipopesquisa = "";
    var intMeus = 1;
    var intEscola = 1;
    var intPortal = 1;

    $("input:checkbox[name=tipopesquisa]:checked").each(function () {
        tipopesquisa += $(this).val();
    });

    if (tipopesquisa == "") {
        tipopesquisa = "123";
        $("#meus_cam").attr('checked', true);
        $("#escola_cam").attr('checked', true);
        $("#portal_cam").attr('checked', true);
    }

    if (tipopesquisa == "1") {
        intMeus = 1;
        intEscola = 0;
        intPortal = 0;
    } else if (tipopesquisa == "2") {
        intMeus = 0;
        intEscola = 1;
        intPortal = 0;
    } else if (tipopesquisa == "3") {
        intMeus = 0;
        intEscola = 0;
        intPortal = 1;
    } else if (tipopesquisa == "12") {
        intMeus = 1;
        intEscola = 1;
        intPortal = 0;
    } else if (tipopesquisa == "13") {
        intMeus = 1;
        intEscola = 0;
        intPortal = 1;
    } else if (tipopesquisa == "23") {
        intMeus = 0;
        intEscola = 1;
        intPortal = 1;
    }

    $palavrachave = $('#strPesquisa').val();

    $dataInicio = $('#dataInicio').val();
    $dataFim = $('#dataFim').val();

    if ($dataInicio.length > 0 && $dataFim.length > 0) {
        var arrDataInicio = $dataInicio.split("/");
        $dataInicio = arrDataInicio[2] + "-" + arrDataInicio[1] + "-" + arrDataInicio[0];
        var arrDataFim = $dataFim.split("/");
        $dataFim = arrDataFim[2] + "-" + arrDataFim[1] + "-" + arrDataFim[0];
    } else if ($dataInicio.length <= 0 && $dataFim.length > 0) {
        alert("Favor preencher a data inicial!")
        return false;
    } else if ($dataInicio.length > 0 && $dataFim.length <= 0) {
        alert("Favor preencher a data final!")
        return false;
    }

    montaLajotinhaFiltroTarefa(tipopesquisa, $palavrachave, $('#dataInicio').val(), $('#dataFim').val());

    abrirBancoTarefas(intMeus, intEscola, intPortal, $palavrachave, $dataInicio, $dataFim, true);
}


function excluirFiltroTarefa(idLI, qual, tipo) {

    if (tipo == 1 || tipo == 2 || tipo == 3) { //tipopesquisa
        if (tipo == 1) {
            $("#meus_cam").attr('checked', false);
        } else if (tipo == 2) {
            $("#escola_cam").attr('checked', false);
        } else if (tipo == 3) {
            $("#portal_cam").attr('checked', false);
        }
    }

    if (tipo == 4) { //palavrachave
        $("#strPesquisa").val('');
    }

    if (tipo == 5) { //dtmInicio e dtmFim
        $('#dataInicio, #dataFim').val('');
    }

    $('#' + idLI).remove();

    $('.lajotinhas a.bt_normal').remove();
    $('.lajotinhas').append('<a class="bt_normal" href="javascript: void(0);" onclick="filtrarTarefa();"><span class="ava_refresh"></span>atualizar filtro</a>');
}

function limparfiltroTarefa() {
    $('#meus_cam, #escola_cam, #portal_cam').attr('checked', true);
    $('#strPesquisa').val('');
    $('#dataInicio, #dataFim').val('');
}


function montaLajotinhaFiltroTarefa(tipo, palavrachave, dataInicio, dataFim) {

    $('.lajotinhas ul').html('');

    /*********TIPO PESQUISA*************/
    if (tipo == "123") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Minhas<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(1, 1, 1)">x</a></span></span></li>')
        $('.lajotinhas ul').append('<li id="2"><span class="lajotinha">Escola<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(2, 1, 2)">x</a></span></span></li>')
        $('.lajotinhas ul').append('<li id="3"><span class="lajotinha">Portal<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(3, 1, 3)">x</a></span></span></li>')
    } else if (tipo == "12") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">Minhas<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + cont + ', 1, 1)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">Escola<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + cont + ', 1, 2)">x</a></span></span></li>')
    } else if (tipo == "13") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">Minhas<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + cont + ', 1, 1)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">Portal<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + cont + ', 1, 3)">x</a></span></span></li>')
    } else if (tipo == "23") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">Escola<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + cont + ', 1, 2)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">Portal<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + cont + ', 1, 3)">x</a></span></span></li>')
    } else if (tipo == "1") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Minhas<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(1, 1, 1)">x</a></span></span></li>')
    }
    else if (tipo == "2") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Escola<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(1, 1, 2)">x</a></span></span></li>')
    }
    else if (tipo == "3") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Portal<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 3)">x</a></span></span></li>')
    }

    if (palavrachave != "") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })

        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + palavrachave + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + cont + ', 2, 4)">x</a></span></span></li>')
    }

    if (dataInicio != "" && dataFim != "") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })

        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + dataInicio + ' a ' + dataFim + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + cont + ', 3, 5)">x</a></span></span></li>')
    }

    $('.lajotinhas a.bt_normal').remove();

}

function limparfiltroCaminho() {
    $('#meus_cam, #escola_cam, #portal_cam').attr('checked', true);
    $('#strPesquisa').val('');
    $('#dataInicio, #dataFim').val('');
}

function filtrarAgendamento() {

    var tipopesquisa = "";
    var intAberto = 1;
    var intEmBreve = 1;
    var intEncerrado = 1;
   
    $("input:checkbox[name=cbStatus]:checked").each(function () {
        tipopesquisa += $(this).val();
    });    
    
    if (tipopesquisa == "") {        
        tipopesquisa = "123";
        $("#aberto_age").attr('checked', true);
        $("#embreve_age").attr('checked', true);
        $("#enc_age").attr('checked', true);
    }

    if (tipopesquisa == "1") {
        intEmBreve = 0;
        intEncerrado = 0;
    }else if(tipopesquisa == "2"){
        intAberto = 0;
        intEncerrado = 0;
    }else if(tipopesquisa == "3"){
        intEmBreve = 0;
        intAberto = 0;
    }else if(tipopesquisa == "12"){
        intEncerrado = 0;
    }else if(tipopesquisa == "13"){
        intEmBreve = 0;
    }else if(tipopesquisa == "23"){
        intAberto = 0;
    }
    
    $palavrachave = $('#strPesquisa').val();

    $dataInicio = $('#dataInicio').val();
    $dataFim = $('#dataFim').val();

    if ($dataInicio.length > 0 && $dataFim.length > 0) {
        var arrDataInicio = $dataInicio.split("/");
        $dataInicio = arrDataInicio[2] + "-" + arrDataInicio[1] + "-" + arrDataInicio[0];
        var arrDataFim = $dataFim.split("/");
        $dataFim = arrDataFim[2] + "-" + arrDataFim[1] + "-" + arrDataFim[0];
    } else if ($dataInicio.length <= 0 && $dataFim.length > 0) {
        alert("Favor preencher a data inicial!")
        return false;
    } else if ($dataInicio.length > 0 && $dataFim.length <= 0) {
        alert("Favor preencher a data final!")
        return false;
    }
      
    abrirAgendamento(0, intAberto, intEmBreve, intEncerrado, $palavrachave, $dataInicio, $dataFim, true);
}

function excluirFiltroAgendadas(idLI, qual, tipo) {
    
    if (tipo == 1 || tipo == 2 || tipo == 3) { //tipopesquisa
        if (tipo == 1) {
            $("#aberto_age").attr('checked', false);
        } else if (tipo == 2) {
            $("#embreve_age").attr('checked', false);
        } else if (tipo == 3) {
            $("#enc_age").attr('checked', false);
        }
    }

    if (tipo == 4) { //palavrachave
        $("#strPesquisa").val('');
    }

    if (tipo == 5) { //dtmInicio e dtmFim
        $('#dataInicio, #dataFim').val('');
    }

    $('#' + idLI).remove();

    $('.lajotinhas a.bt_normal').remove();
    $('.lajotinhas').append('<a class="bt_normal" href="javascript: void(0);" onclick="filtrarAgendamento();"><span class="ava_refresh"></span>atualizar filtro</a>');
}

function limparfiltroAgendamento() {    
    $('#strPesquisa').val('');
    $('#dataInicio, #dataFim').val('');
    $('#aberto_age, #embreve_age, #enc_age').attr('checked', true);
}

function abrirAgendamento(idCaminhoAux, intAbertoAux, intEmBreveAux, intEncerradoAux, strPesquisaAgendamentoAux, dtmInicioAgendamentoAux, dtmFimAgendamentoAux, bolFiltrando) {

    $('#Hcaminhos').html('<h1 class="blokletters">Agendamentos</h1><p class="blokletters">tarefas e caminhos de aprendizagem agendados</p>');
    $('#aba_agendadas').removeClass('atual').addClass("atual");
    $('#aba_tarefas,#aba_caminhos').removeClass('atual');
    
    $("#container_painelcontrole").css('min-height', '0')
    $('#container_painelcontrole').html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaAgendadas/",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $('#container_painelcontrole').html(data);

            $('#filtro_aval').hide();

            if (bolFiltrando) {

                if (dtmInicioAgendamentoAux != "") {
                    var arrDataInicio = dtmInicioAgendamentoAux.split('-');
                    dtmInicioAgendamentoAux = arrDataInicio[2] + "/" + arrDataInicio[1] + "/" + arrDataInicio[0]
                }
                if (dtmFimAgendamentoAux != "") {
                    var arrDataFim = dtmFimAgendamentoAux.split('-');
                    dtmFimAgendamentoAux = arrDataFim[2] + "/" + arrDataFim[1] + "/" + arrDataFim[0]
                }

                $('#strPesquisa').val(strPesquisaAgendamentoAux);
                $('#dataInicio').val(dtmInicioAgendamentoAux);
                $('#dataFim').val(dtmFimAgendamentoAux);

                var tipopesquisa = "";

                if (intAbertoAux == 0) {
                    $("#aberto_age").attr('checked', false);
                } else {
                    tipopesquisa += "1";
                }
                if (intEmBreveAux == 0) {
                    $("#embreve_age").attr('checked', false);
                } else {
                    tipopesquisa += "2";
                }
                if (intEncerradoAux == 0) {
                    $("#enc_age").attr('checked', false);
                } else {
                    tipopesquisa += "3";
                }

                montaLajotinhaFiltroAgendadas(tipopesquisa, strPesquisaAgendamentoAux, $('#dataInicio').val(), $('#dataFim').val())

            }

            $('#escorregaFiltro').toggle(
			    function () {
			        $(this).html("Adicionar filtros &#9650;");
			        montaCampoData('#dataInicio');
			        montaCampoData('#dataFim');
			        $('#filtro_aval').slideDown();
			    }, function () {
			        $(this).html("Adicionar filtros &#9660;");
			        $('#filtro_aval').slideUp();
			    }
		    );

            idCaminho = idCaminhoAux;

            strPesquisaAgendamento = strPesquisaAgendamentoAux;
            intAberto = intAbertoAux;
            intEmBreve = intEmBreveAux;
            intEncerrado = intEncerradoAux;
            dtmInicioAgendamento = dtmInicioAgendamentoAux;
            dtmFimAgendamento = dtmFimAgendamentoAux;
            rodar = 1;

            paginacaoAgendadas(idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento);

        },
        error: function (data) {
            if (data.status == 0) {
                $("#container_painelcontrole").empty();
            } else {
                $('#container_painelcontrole').html("erro ao listar agendadas!")
            }
        }
    });
}

function retornaAgendadasPaginando(numPag, idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento) {

    numPag += 1;

    var inicio;
    var fim;

    fim = quantidadePorPagina * numPag;
    inicio = (fim - quantidadePorPagina) + 1;

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaAgendadasPaginando/",
        data: {
            id: idCaminho,
            intAberto: intAberto,
            intEmBreve: intEmBreve,
            intEncerrado: intEncerrado,
            strPesquisa: strPesquisaAgendamento,
            dtmInicio: dtmInicioAgendamento,
            dtmFim: dtmFimAgendamento,
            intInicio: inicio,
            intFim: fim
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {

            $('#container_painelcontrole #agendadas_paginando').html(data);

            $('.btnEscorregarAgendadas').toggle(
			    function () {
			        $id = $(this).attr("id")

			        $('.bancocaminho_' + $id).addClass("table_selected");
			        $('#agendamento_' + $id).slideDown('slow');
			        $('#seta_' + $id).html('&#9650;');
			        $('#containerescorrega_' + $id).html("<div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>");
			        $.ajax({
			            type: "POST",
			            url: "/AVA/Caminhos/Home/RetornaAgendamento/" + $id,
			            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			            success: function (data) {
			                $('#containerescorrega_' + $id).html(data)

			                $('#containerescorrega_' + $id).find('#bt_verMaisDescRota').toggle(
			                    function () {
			                        $(this).html("veja menos");
			                        $('#containerescorrega_' + $id).find("#caminhoDescr").css("display", "none")
			                        $('#containerescorrega_' + $id).find("#caminhoDescrCompleto").css("display", "")
			                    }, function () {
			                        $(this).html("veja mais");
			                        $('#containerescorrega_' + $id).find("#caminhoDescr").css("display", "")
			                        $('#containerescorrega_' + $id).find("#caminhoDescrCompleto").css("display", "none")
			                    }
		                    );

			                var idTurma = $('.sTurmas').find('option').filter(':selected').attr('id');

			                retornaUsuariosAgendamento($id, idTurma)

			                $('#containerescorrega_' + $id + ' .sTurmas').change(function () {
			                    retornaUsuariosAgendamento($id, $(this).find('option').filter(':selected').attr('id'))
			                });
			            },
			            error: function (data) {
			                if (data.status == 0) {
			                    $("#containerescorrega_" + $id).empty();
			                } else {
			                    $('#containerescorrega_' + $id).html("erro ao listar agendamento!")
			                }
			            }
			        });

			    }, function () {
			        $id = $(this).attr("id")

			        $('.bancocaminho_' + $id).removeClass("table_selected");
			        $('#agendamento_' + $id).slideUp('slow');
			        $('#containerescorrega_' + $id).slideUp('slow');
			        $('#seta_' + $id).html('&#9660;');
			    }
		    );
        },
        error: function (data) {
            if (data.status == 0) {
                $("#container_painelcontrole #agendadas_paginando").empty();
            } else {
                $('#container_painelcontrole #agendadas_paginando').html("erro ao listar agendadas paginando!")
            }
        }
    });

}

function montaLajotinhaFiltroAgendadas(tipo, palavrachave, dataInicio, dataFim) {
    
    $('.lajotinhas ul').html('');

    /*********TIPO PESQUISA*************/   
    if (tipo == "123") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Aberto<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1, 1, 1)">x</a></span></span></li>')
        $('.lajotinhas ul').append('<li id="2"><span class="lajotinha">Em Breve<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(2, 1, 2)">x</a></span></span></li>')
        $('.lajotinhas ul').append('<li id="3"><span class="lajotinha">Encerrado<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(3, 1, 3)">x</a></span></span></li>')
    } else if (tipo == "12") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++;        
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Aberto<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas('+cont+', 1, 1)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Em Breve<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas('+cont+', 1, 2)">x</a></span></span></li>')
    } else if (tipo == "13") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++; 
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Aberto<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas('+cont+', 1, 1)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Encerrado<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas('+cont+', 1, 3)">x</a></span></span></li>')    
    } else if (tipo == "23") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })
        cont++; 
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Em Breve<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas('+cont+', 1, 2)">x</a></span></span></li>')
        cont++;
        $('.lajotinhas ul').append('<li id="'+cont+'"><span class="lajotinha">Encerrado<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas('+cont+', 1, 3)">x</a></span></span></li>')
    } else if (tipo == "1") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Aberto<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1, 1, 1)">x</a></span></span></li>')
    }
    else if (tipo == "2") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Em Breve<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1, 1, 2)">x</a></span></span></li>')
    }
    else if (tipo == "3") {
        $('.lajotinhas ul').append('<li id="1"><span class="lajotinha">Encerrado<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1, 1, 3)">x</a></span></span></li>')
    }
    
    if (palavrachave != "") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })

        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + palavrachave + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + cont + ', 2, 4)">x</a></span></span></li>')
    }

    if (dataInicio != "" && dataFim != "") {
        var cont = 0;
        $(".lajotinhas li").each(function () {
            cont++;
        })

        cont++;
        $('.lajotinhas ul').append('<li id="' + cont + '"><span class="lajotinha">' + dataInicio + ' a ' + dataFim + '<span class="lajo_x"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + cont + ', 3, 5)">x</a></span></span></li>')
    }

    $('.lajotinhas a.bt_normal').remove();

}

function retornaUsuariosAgendamento(idRotaAgendamento, idTurma){
    
    $('#containerescorrega_'+ idRotaAgendamento + ' .usuarios_agendamento').html("<div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>")
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaUsuariosAgendamento",
        data: {
            idRotaAgendamento: idRotaAgendamento,
            idTurma: idTurma
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $('#containerescorrega_' + idRotaAgendamento + ' .usuarios_agendamento').html(data);
            $('#containerescorrega_' + idRotaAgendamento).slideDown('slow');
            $(".b_tooltip_center").each(function () {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: 'top center',
                    effect: 'slide',
                    relative: true,
                    events: {
                        def: 'mouseover, mouseout'
                    }
                });
            });
        },
        error: function (data) {
            if (data.status == 0) {
                $("#containerescorrega_" + idRotaAgendamento).empty();
            } else {
                $('#containerescorrega_' + idRotaAgendamento).html("erro ao listar usuários do agendamento!")
            }
        }
    });

}

function montaProgessBar(qtd, id) {    
    $("#progressbar_"+id).progressbar({
        value: qtd
    });    
}

function abrirBancoCaminhos(intMeusAux, intEscolaAux, intPortalAux, strPesquisaAux, dtmInicioAux, dtmFimAux, bolFiltrandoAux) {

    $('#Hcaminhos').html('<h1 class="blokletters">Caminhos de aprendizagem</h1><p class="blokletters">um roteiro de tarefas para seus alunos</p>');

    $('#aba_caminhos').removeClass('atual').addClass("atual");
    $('#aba_tarefas,#aba_agendadas').removeClass('atual');
    
    $("#container_painelcontrole").css('min-height', '0');
    $('#container_painelcontrole').html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>");

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaBancoCaminhos/",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $('#container_painelcontrole').html(data);

            if (!bolFiltrandoAux) {
                $('#filtro_aval').hide();
            } else {
                
                /*if (dtmInicioAux != "") {
                    var arrDataInicio = dtmInicioAux.split('-');
                    dtmInicioAux = arrDataInicio[2] + "/" + arrDataInicio[1] + "/" + arrDataInicio[0]
                }
                if (dtmFimAux != "") {
                    var arrDataFim = dtmFimAux.split('-');
                    dtmFimAux = arrDataFim[2] + "/" + arrDataFim[1] + "/" + arrDataFim[0]
                }*/

                $('#dataInicio').val(dtmInicioAux)
                $('#dataFim').val(dtmFimAux)
                $('#strPesquisa').val(strPesquisaAux)

                var tipopesquisa = "";
                if (intMeusAux == 0) {
                    $("#meus_cam").attr('checked', false);
                } else {
                    tipopesquisa += "1";
                }
                if (intEscolaAux == 0) {
                    $("#escola_cam").attr('checked', false);
                } else {
                    tipopesquisa += "2";
                }
                if (intPortalAux == 0) {
                    $("#portal_cam").attr('checked', false);
                } else {
                    tipopesquisa += "3";
                }

                montaLajotinhaFiltroCaminho(tipopesquisa, strPesquisaAux, dtmInicioAux, dtmFimAux);

                $('#filtro_aval').hide();

            }

            montaCampoData('#dataInicio');
            montaCampoData('#dataFim');


            $('#escorregaFiltro').toggle(
			    function () {
			        $(this).html("Adicionar filtros &#9650;");
			        montaCampoData('#dataInicio');
			        montaCampoData('#dataFim');
			        $('#filtro_aval').slideDown();
			    }, function () {
			        $(this).html("Adicionar filtros &#9660;");
			        $('#filtro_aval').slideUp();
			    }
		    );

            intMeusGlobal = intMeusAux;
            intEscolaGlobal = intEscolaAux;
            intPortalGlobal = intPortalAux;
            strPesquisaGlobal = strPesquisaAux;
            dtmInicioGlobal = dtmInicioAux;
            dtmFimGlobal = dtmFimAux;
            bolFiltrandoGlobal = bolFiltrandoAux;
            rodarGlobal = 1;

            paginacaoCaminhos(intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal);

        },
        error: function (data) {
            if (data.status == 0) {
                $("#container_painelcontrole").empty();
            } else {
                $('#container_painelcontrole').html("erro ao listar banco!")
            }

        }
    });

}

function abrirBancoTarefas(intMeusAux, intEscolaAux, intPortalAux, strPesquisaAux, dtmInicioAux, dtmFimAux, bolFiltrandoAux) {

    $('#Hcaminhos').html('<h1 class="blokletters">Tarefas</h1>');
    $('#aba_tarefas').removeClass('atual').addClass("atual");
    $('#aba_caminhos,#aba_agendadas').removeClass('atual');
    
    $("#container_painelcontrole").css('min-height', '0');
    $('#container_painelcontrole').html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>");

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaBancoTarefas/",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $('#container_painelcontrole').html(data);

            if (!bolFiltrandoAux) {
                $('#filtro_aval').hide();
            } else {

                if (dtmInicioAux != "") {
                    var arrDataInicio = dtmInicioAux.split('-');
                    dtmInicioAux = arrDataInicio[2] + "/" + arrDataInicio[1] + "/" + arrDataInicio[0]
                }
                if (dtmFimAux != "") {
                    var arrDataFim = dtmFimAux.split('-');
                    dtmFimAux = arrDataFim[2] + "/" + arrDataFim[1] + "/" + arrDataFim[0]
                }

                $('#dataInicio').val(dtmInicioAux)
                $('#dataFim').val(dtmFimAux)
                $('#strPesquisa').val(strPesquisaAux)

                var tipopesquisa = "";
                if (intMeusAux == 0) {
                    $("#meus_cam").attr('checked', false);
                } else {
                    tipopesquisa += "1";
                }
                if (intEscolaAux == 0) {
                    $("#escola_cam").attr('checked', false);
                } else {
                    tipopesquisa += "2";
                }
                if (intPortalAux == 0) {
                    $("#portal_cam").attr('checked', false);
                } else {
                    tipopesquisa += "3";
                }

                montaLajotinhaFiltroTarefa(tipopesquisa, strPesquisaAux, dtmInicioAux, dtmFimAux);

                $('#filtro_aval').hide();

            }

            montaCampoData('#dataInicio');
            montaCampoData('#dataFim');

            $('#escorregaFiltro').toggle(
			    function () {
			        $(this).html("Adicionar filtros &#9650;");
			        montaCampoData('#dataInicio');
			        montaCampoData('#dataFim');
			        $('#filtro_aval').slideDown();
			    }, function () {
			        $(this).html("Adicionar filtros &#9660;");
			        $('#filtro_aval').slideUp();
			    }
		    );

            intMeusGlobal = intMeusAux;
            intEscolaGlobal = intEscolaAux;
            intPortalGlobal = intPortalAux;
            strPesquisaGlobal = strPesquisaAux;
            dtmInicioGlobal = dtmInicioAux;
            dtmFimGlobal = dtmFimAux;
            bolFiltrandoGlobal = bolFiltrandoAux;
            rodarGlobal = 1;

            paginacaoTarefas(intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal);

        },
        error: function (data) {
            if (data.status == 0) {
                $("#container_painelcontrole").empty();
            } else {
                $('#container_painelcontrole').html("erro ao listar banco!")
            }

        }
    });

}

function escorregaCaminho(idCaminho) {
    $("#escorrega_" + idCaminho).click();
}

function RetornaCaminhosPaginando(numPag, intMeus, intEscola, intPortal, strPesquisa, dtmInicio, dtmFim, bolFiltrando) {
    
    numPag += 1;

    var fim = quantidadePorPagina * numPag;
    var inicio = (fim - quantidadePorPagina) + 1;

    $('#container_painelcontrole #caminhos_paginando').html("<tr><td colspan='4'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaBancoCaminhosPaginando/",
        data: {
            intMeus: intMeus,
            intEscola: intEscola,
            intPortal: intPortal,
            strPesquisa: strPesquisa,
            dtmInicio: dtmInicio,
            dtmFim: dtmFim,
            intInicio: inicio,
            intFim: fim
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $('#container_painelcontrole #caminhos_paginando').html(data);

            $('.bcam').each(function () {
                $('#bt_verMaisDescRota_' + $(this).attr("id")).toggle(
			        function () {
			            var idCaminhoAtual = $(this).attr("rel")
			            $(this).html("veja menos");
			            $("#caminhoDescr_" + idCaminhoAtual).css("display", "none")
			            $("#caminhoDescrCompleto_" + idCaminhoAtual).css("display", "")
			        }, function () {
			            var idCaminhoAtual = $(this).attr("rel")
			            $(this).html("veja mais");
			            $("#caminhoDescr_" + idCaminhoAtual).css("display", "")
			            $("#caminhoDescrCompleto_" + idCaminhoAtual).css("display", "none")
			        }
		        );

            })

            $(".b_tooltip_center").each(function () {
                $(this).tooltip({
                    effect: 'slide',
                    position: 'top center',
                    relative: true,
                    events: {
                        def: 'click, mouseout'
                    }
                });
            })

            $('.btnEscorregarCaminho').toggle(
			    function () {
			        id = $(this).attr("idAtiv");
			        $('.bancocaminho_' + id).addClass("table_selected")
			        $('#caminho_' + id + ', #containerescorrega_' + id).slideDown('slow');
			        $('#seta_' + id).html('&#9650;');
			        $('#btDetalhe_' + id).html('ocultar detalhes');
			    }, function () {
			        id = $(this).attr("idAtiv");
			        $('.bancocaminho_' + id).removeClass("table_selected")
			        $('#caminho_' + id + ', #containerescorrega_' + id).slideUp('slow');
			        $('#seta_' + id).html('&#9660;');
			        $('#btDetalhe_' + id).html('ver detalhes');
			    }
		    );

            $('.lbopcoes input:radio').click(function () {
                $bolPublico = true;
                $idCaminho = $(this).attr("name").replace("cbEstado", "")

                if ($(this).val() == 0) {
                    $bolPublico = false;
                }

                $.ajax({
                    url: "/AVA/Caminhos/home/SalvarEstadoRota/",
                    data: {
                        bolPublico: $bolPublico,
                        idCaminho: $idCaminho
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        if ($bolPublico) {
                            $("#status_" + $idCaminho).html("<span class='publica'></span>Compartilhado")
                        } else {
                            $("#status_" + $idCaminho).html("<span class='privada'></span>Privado")
                        }
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao salvar estado do caminho. ");
                        }
                        //alert("erro ao salvar estado do caminho.");
                    }

                });

            })

            var qtdArrasta = 0;
            $(".arrastaveis").each(function () {
                qtdArrasta += 1;
                $('.arrastar' + qtdArrasta).Sortable({
                    accept: 'e-a-box',
                    tolerance: 'pointer',
                    onChange: function (ser) {

                    },
                    onStart: function () {
                        $.iAutoscroller.start(this, document.getElementsByTagName('body'));
                    },
                    onStop: function () {
                        $(this).parent().find(".e-fim").each(function () {
                            $(this).removeClass("e-fim");
                        });
                        $(this).parent().children(":last").addClass("e-fim");
                        var i = 1;

                        $(this).parent().find("li").each(function () {
                            idEtapa = $(this).attr("idetapa");

                            $.ajax({
                                url: "/AVA/Caminhos/home/salvarOrdemEtapa/?idEtapa=" + idEtapa + "&ordem=" + i,
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                async: true,
                                success: function (data) {

                                },
                                error: function (data) {
                                    //alert("Erro: " + data.status);
                                    if (data.status != 0) {
                                        console.debug(data.status);
                                    }
                                }
                            });
                            i++;
                        });
                        $.iAutoscroller.stop();
                    }
                });
                $(".arrastar" + qtdArrasta + " .e-titulo").mouseover(function () {
                    $(this).css("cursor", "move");
                })
                        .mouseout(function () {
                            $(this).css("cursor", "none");
                        });
            }); //.arrastaveis

            $(".bcam .btnEscorregarCaminho:first").click();
        },
        error: function (data) {
            if (data.status == 0) {
                $("#container_painelcontrole #caminhos_paginando").empty();
            } else {
                $('#container_painelcontrole #caminhos_paginando').html("erro ao listar banco paginando!")

            }

        }
    });

}

function RetornaTarefasPaginando(numPag, intMeus, intEscola, intPortal, strPesquisa, dtmInicio, dtmFim, bolFiltrando) {

    numPag += 1;

    var fim = quantidadePorPagina * numPag;
    var inicio = (fim - quantidadePorPagina) + 1;

    $('#container_painelcontrole #caminhos_paginando').html("<tr><td colspan='4'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaBancoTarefasPaginando/",
        data: {
            intMeus: intMeus,
            intEscola: intEscola,
            intPortal: intPortal,
            strPesquisa: strPesquisa,
            dtmInicio: dtmInicio,
            dtmFim: dtmFim,
            intInicio: inicio,
            intFim: fim
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $('#container_painelcontrole #caminhos_paginando').html(data);

            $('.bcam').each(function () {
                $('#bt_verMaisDescRota_' + $(this).attr("id")).toggle(
			        function () {
			            var idCaminhoAtual = $(this).attr("rel")
			            $(this).html("veja menos");
			            $("#caminhoDescr_" + idCaminhoAtual).css("display", "none")
			            $("#caminhoDescrCompleto_" + idCaminhoAtual).css("display", "")
			        }, function () {
			            var idCaminhoAtual = $(this).attr("rel")
			            $(this).html("veja mais");
			            $("#caminhoDescr_" + idCaminhoAtual).css("display", "")
			            $("#caminhoDescrCompleto_" + idCaminhoAtual).css("display", "none")
			        }
		        );

            })

            $(".b_tooltip_center").each(function () {
                $(this).tooltip({
                    effect: 'slide',
                    position: 'top center',
                    relative: true,
                    events: {
                        def: 'click, mouseout'
                    }
                });
            })

            $('.btnEscorregarCaminho').toggle(
			    function () {
			        id = $(this).attr("idAtiv");
			        $('.bancocaminho_' + id).addClass("table_selected")
			        $('#caminho_' + id + ', #containerescorrega_' + id).slideDown('slow');
			        $('#seta_' + id).html('&#9650;');
			        $('#btDetalhe_' + id).html('ocultar detalhes');
			    }, function () {
			        id = $(this).attr("idAtiv");
			        $('.bancocaminho_' + id).removeClass("table_selected")
			        $('#caminho_' + id + ', #containerescorrega_' + id).slideUp('slow');
			        $('#seta_' + id).html('&#9660;');
			        $('#btDetalhe_' + id).html('ver detalhes');
			    }
		    );

            $('.lbopcoes input:radio').click(function () {
                $bolPublico = true;
                $idCaminho = $(this).attr("name").replace("cbEstado", "")

                if ($(this).val() == 0) {
                    $bolPublico = false;
                }

                $.ajax({
                    url: "/AVA/Caminhos/home/SalvarEstadoRota/",
                    data: {
                        bolPublico: $bolPublico,
                        idCaminho: $idCaminho
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        if ($bolPublico) {
                            $("#status_" + $idCaminho).html("<span class='publica'></span>Compartilhado")
                        } else {
                            $("#status_" + $idCaminho).html("<span class='privada'></span>Privado")
                        }
                    },
                    error: function (data) {
                        if (data.status != 0) {
                            console.debug("erro ao salvar estado do caminho. ");
                        }
                        //alert("erro ao salvar estado do caminho.");
                    }

                });

            })

            var qtdArrasta = 0;
            $(".arrastaveis").each(function () {
                qtdArrasta += 1;
                $('.arrastar' + qtdArrasta).Sortable({
                    accept: 'e-a-box',
                    tolerance: 'pointer',
                    onChange: function (ser) {

                    },
                    onStart: function () {
                        $.iAutoscroller.start(this, document.getElementsByTagName('body'));
                    },
                    onStop: function () {
                        $(this).parent().find(".e-fim").each(function () {
                            $(this).removeClass("e-fim");
                        });
                        $(this).parent().children(":last").addClass("e-fim");
                        var i = 1;

                        $(this).parent().find("li").each(function () {
                            idEtapa = $(this).attr("idetapa");

                            $.ajax({
                                url: "/AVA/Caminhos/home/salvarOrdemEtapa/?idEtapa=" + idEtapa + "&ordem=" + i,
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                async: true,
                                success: function (data) {

                                },
                                error: function (data) {
                                    //alert("Erro: " + data.status);
                                    if (data.status != 0) {
                                        console.debug(data.status);
                                    }
                                }
                            });
                            i++;
                        });
                        $.iAutoscroller.stop();
                    }
                });
                $(".arrastar" + qtdArrasta + " .e-titulo").mouseover(function () {
                    $(this).css("cursor", "move");
                }).mouseout(function () {
                            $(this).css("cursor", "none");
                        });
            }); //.arrastaveis

            $(".bcam .btnEscorregarCaminho:first").click();
        },
        error: function (data) {
            if (data.status == 0) {
                $("#container_painelcontrole #caminhos_paginando").empty();
            } else {
                $('#container_painelcontrole #caminhos_paginando').html("erro ao listar banco paginando!")

            }

        }
    });

}

function fecharTag(qualTag, idTag, idRota) {
    
    if (idTag > 0 && idRota > 0) {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirTagDaRota/?idRota=" + idRota + "&idTag=" + idTag,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                $("#" + qualTag).remove();
            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Erro ao remover tag!");
                }
                //alert("erro ao remover tag!")
            }
        });
    } else {
        $("#" + qualTag).remove();
    }
}

function limiteCaracter(texto, tipo) {
    if (tipo == "titulo" || tipo == "tituloetapa") {
        var limite = 100;
        var tamanho = texto.value.length;
        texto = texto.value;
        
        if (tamanho <= limite) {
            restante = limite - tamanho;
            if (restante > 1) {
                $("#tituloLimite").text(restante + " caracteres restantes");
            } else {
                $("#tituloLimite").text(restante + " caracter restante");
            }
            return false;
        } else {
            if (tipo == "titulo") {
                $("#strTitulo").val(texto.substring(0, tamanho - 1));
            } else {
                $("#tituloetapa").val(texto.substring(0, tamanho - 1));
            }
            
            return false;
        }
    }else if (tipo == "descricao") {
        var limite = 800;
        var tamanho = texto.value.length;
        texto = texto.value;
        if (tamanho <= limite) {
            restante = limite - tamanho;
            if (restante > 1) {
                $("#textoLimite").text(restante + " caracteres restantes");
            } else {
                $("#textoLimite").text(restante + " caracter restante");
            }
            return false;
        }
        else if (limite <= tamanho) {
            restante = limite - tamanho;
            $("#textoLimite").text(restante + " caracteres - limite excedente");
        }
        else {
            $("#strDescricao").val(texto.substring(0, tamanho - 1));
            return false;
        }
    } else if (tipo == "tag") {
        var limite = 30;
        var tamanho = texto.value.length;
        texto = texto.value;
        if (tamanho <= limite) {
            restante = limite - tamanho;
            if (restante > 1) {
                $("#tagLimite").text(restante + " caracteres restantes para esta tag");
            } else {
                $("#tagLimite").text(restante + " caracter restante para esta tag");
            }
            return false;
        } else {
            $("#iTags").val(texto.substring(0, tamanho - 1));
            return false;
        }
    }
}

function montaTag(e, valueTexto, evento) {
    
    if ((parseInt(e.which) == 188 || parseInt(e.which) == 13 || parseInt(e.which) == 191) || evento == "blur" && valueTexto.toLowerCase() != "separe as tags por vírgula") {
        var ultPosicao = valueTexto.substring(valueTexto.length - 1, valueTexto.length);
        var texto = "";

        if (ultPosicao == "," || ultPosicao == ";") {
            texto = valueTexto.substring(0, valueTexto.length - 1);
        } else {
            texto = valueTexto;
        }

        if (texto.trim().length > 0) {
            var cont = 0;
            $(".ava_tags li").each(function () {
                cont++;
            })

            if (texto.length > 0) {
                cont = cont + 1;
                $('.ava_tags').append('<li id="' + cont + '">' + texto + '<span class="lajo_x"><a class="" href="javascript: void(0);" onclick="fecharTag(' + cont + ', 0, 0)">x</a></span></li>');
            }
        }
        $("#iTags").val("");
    }

}

function carregaTiny() {

     tinyMCE.init({
        mode: "specific_textareas",
        theme: "advanced",
        editor_selector: "descricaoetapa",
        language: "pt",
        plugins: "banco_imagens",
        theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,fontselect,fontsizeselect,|,forecolor,backcolor,|,image,banco_imagens",
        theme_advanced_buttons2: "",
        theme_advanced_buttons3: "",
        theme_advanced_buttons4: "",
        theme_advanced_toolbar_location: "top",
        theme_advanced_toolbar_align: "left",
        theme_advanced_statusbar_location: "bottom",
        theme_advanced_resizing: false,
        extended_valid_elements: "a[name|href|target|title|onclick],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style]",
        template_external_list_url: "example_template_list.js",
        file_browser_callback: "fileBrowserCallBack",
        flash_wmode: "transparent",
        flash_quality: "high",
        flash_menu: "false",
        media_use_script: false,
        theme_advanced_resizing: true,
        theme_advanced_resize_horizontal: false
    });    

}

function fileBrowserCallBack(field_name, url, type, win) {
    var dirUsuario = $("#dirUsuario").val()       
	data = new Date();
	agora = data.getTime();
	UploadUmArquivo("strImagemEditor", "fEtapa", dirUsuario, agora, "jpg,gif,bmp", "AtualizaImagem")
	_win = win;
	_field_name = field_name;		
}
function AtualizaImagem(){
	 _win.document.forms[0].elements[_field_name].value = document.getElementById('strImagemEditor').value;
}
function UploadUmArquivo (NomeCampo,NomeForm, DirDestino,NomeDestino,TiposArquivos,NomeFuncao){	
	var wenv;
	if (NomeFuncao==null){
		wenv = window.open("/Recursos/EdHtmlNovo/enviar_tiny.asp?NomeCampo="+NomeCampo+"&NomeForm="+NomeForm+"&DirDestino="+DirDestino+"&NomeDestino="+NomeDestino+"&TiposArquivos="+TiposArquivos+"&wMaxImageResize="+wMaxImageResize+"&hMaxImageResize="+hMaxImageResize,"wndEnviar","height=130,width=330");
	}
	else{
		wenv = window.open("/Recursos/EdHtmlNovo/enviar_tiny.asp?NomeCampo="+NomeCampo+"&NomeForm="+NomeForm+"&DirDestino="+DirDestino+"&NomeDestino="+NomeDestino+"&TiposArquivos="+TiposArquivos+"&NomeFuncao="+NomeFuncao+"&wMaxImageResize="+wMaxImageResize+"&hMaxImageResize="+hMaxImageResize,"wndEnviar","height=130,width=330");
	}	
	wenv.focus();
}

function retornaUsuariosAgendamentoIndividual(idRotaAgendamento, idTurma, idAluno, bolPrimeiro, bolUltimo){    
    $('.ta_alunos_container').html("<div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>")
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaUsuariosAgendamento",
        data: {
            idRotaAgendamento: idRotaAgendamento,
            idTurma: idTurma,
            idAluno: idAluno
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $('.ta_alunos_container').html(data);
            var priIdAluno = $('.ta_alunos_ft:first img').attr('id')
            if (bolPrimeiro || priIdAluno == idAluno) {
                $('#btPrevAluno').removeAttr('onclick');
                $('#btPrevAluno').addClass('disable');
            } else {
                $('#btPrevAluno').attr('onclick', 'prev(' + idRotaAgendamento + ')');
                $('#btPrevAluno').removeClass('disable');
            }

            var ultIdAluno = $('.ta_alunos_ft:last img').attr('id')
            if (bolUltimo || idAluno == ultIdAluno) {
                $('#btNextAluno').removeAttr('onclick');
                $('#btNextAluno').addClass('disable');
            } else {
                $('#btNextAluno').attr('onclick', 'next(' + idRotaAgendamento + ')');
                $('#btNextAluno').removeClass('disable');
            }
            $(".b_tooltip_center").each(function () {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: 'top center',
                    effect: 'slide',
                    relative: true,
                    events: {
                        def: 'mouseover, mouseout'
                    }
                });
            });

        },
        error: function (data) {
            if (data.status == 0) {
                $(".ta_alunos_container").empty();
            } else {
                $('.ta_alunos_container').html("erro ao listar usuários do agendamento!")
            }
        }
    });

}

function corrigeAluno(idAluno, idRotaAgendamento, idTurma, bolPrimeiro, bolUltimo){
    
    $("#container_painelcontrole").css('min-height',$("#container_painelcontrole").height())

    $('html, body').animate({
      scrollTop: $("#container_painelcontrole").offset().top
    }, 1000);
   
    $('#container_painelcontrole').html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>");

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaAgendamentoByIdRotaAgendamento/",
        data: {
            idAluno: idAluno,
            idRotaAgendamento: idRotaAgendamento,
            idTurma: idTurma
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $('#container_painelcontrole').html(data);

            $('#container_alunoagendamento').html("<tr><td><div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div><td><tr>");
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaEtapasAgendadasUsuarioByIdRotaAgendamentoByIdAluno/",
                data: {
                    idAluno: idAluno,
                    idRotaAgendamento: idRotaAgendamento,
                    idTurma: idTurma
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $('#container_alunoagendamento').html(data);
                    retornaUsuariosAgendamentoIndividual(idRotaAgendamento, idTurma, idAluno, bolPrimeiro, bolUltimo);
                    $('.sTurmas').change(function () {
                        $idTurma = $(this).find('option').filter(':selected').attr('id')
                        corrigeAluno(0, idRotaAgendamento, $idTurma, false, false)
                    });

                },
                error: function (data) {
                    if (data.status == 0) {
                        $("#container_alunoagendamento").empty();
                    } else {
                        $('#container_alunoagendamento').html("erro ao listar agendamento individual do usuário.");
                    }
                }
            });

        },
        error: function (data) {
            if (data.status == 0) {
                $("#container_painelcontrole").empty();
            } else {
                $('#container_painelcontrole').html("erro ao listar agendamento do usuário.")
            }
        }
    });

}

function next(idRotaAgendamento){

    var ultIdAluno = $('.ta_alunos_ft:last img').attr('id')    
    var idAluno = $('.ta_selected').next().children(':first').attr('id');
    var bolUltimo = false;
    if (ultIdAluno == idAluno) {
        bolUltimo = true;        
    }
    corrigeAluno(idAluno, idRotaAgendamento, 0, false, bolUltimo)

}

function prev(idRotaAgendamento){
    
    var priIdAluno = $('.ta_alunos_ft:first img').attr('id')    
    var idAluno = $('.ta_selected').prev().children(':first').attr('id');    
    var bolPrimeiro = false    

    if (priIdAluno == idAluno) {
        bolPrimeiro = true;        
    }        
    corrigeAluno(idAluno, idRotaAgendamento, 0, bolPrimeiro, false)

}

function dataInvalida(data) {
    var expReg = /^(([0-2]\d|[3][0-1])\/([0]\d|[1][0-2])\/[1-2][0-9]\d{2})$/;
    if ((data.match(expReg)) && (data != '')) {
        return false; //válida
    } else {
        return true; //é inválida        
    }
}

function paginacaoCaminhos(intMeus, intEscola, intPortal, strPesquisa, dtmInicio, dtmFim) {
   var resultados = 0;   
   $('#container_painelcontrole #caminhos_paginando').html("<tr><td colspan='4'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>");
   $.ajax({
       url: "/AVA/Caminhos/home/SelecionaCaminhosTotal/",
       data: {
           intMeus: intMeus,
           intEscola: intEscola,
           intPortal: intPortal,
           strPesquisa: strPesquisa,
           dtmInicio: dtmInicio,
           dtmFim: dtmFim
       },
       async: false,
       success: function (data) {
           resultados = data;
       },
       error: function (data) {
           if (data.status != 0) {
               console.debug("Nao foi possivel obter o numero de resultados");
           }
           //alert("Não foi possível obter o numero de resultados");
       }
   });   
    quantidadePorPagina = 10;

    resultados = parseInt(resultados);
    $("#Pagination").pagination(
        resultados,
        {
            items_per_page: quantidadePorPagina,
            num_display_entries: 5,
            current_page: 0,
            num_edge_entries: 1,
            link_to: "javascript:void(0);",
            callback: retornaPaginaCaminhos
        }
    );
    if (resultados <= quantidadePorPagina) {
        $("#mostraPaginas").hide();
    } else {
        if ($("#mostraPaginas").is(":hidden")) {
            $("#mostraPaginas").show();
        }
    }
}

function paginacaoTarefas(intMeus, intEscola, intPortal, strPesquisa, dtmInicio, dtmFim) {
    var resultados = 0;
    $('#container_painelcontrole #caminhos_paginando').html("<tr><td colspan='4'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>");
    $.ajax({
        url: "/AVA/Caminhos/home/SelecionaTarefasTotal/",
        data: {
            intMeus: intMeus,
            intEscola: intEscola,
            intPortal: intPortal,
            strPesquisa: strPesquisa,
            dtmInicio: dtmInicio,
            dtmFim: dtmFim
        },
        async: false,
        success: function (data) {
            resultados = data;
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("Nao foi possivel obter o numero de resultados");
            }
            //alert("Não foi possível obter o numero de resultados");
        }
    });
    quantidadePorPagina = 10;

    resultados = parseInt(resultados);
    $("#Pagination").pagination(
        resultados,
        {
            items_per_page: quantidadePorPagina,
            num_display_entries: 5,
            current_page: 0,
            num_edge_entries: 1,
            link_to: "javascript:void(0);",
            callback: retornaPaginaTarefas
        }
    );
    if (resultados <= quantidadePorPagina) {
        $("#mostraPaginas").hide();
    } else {
        if ($("#mostraPaginas").is(":hidden")) {
            $("#mostraPaginas").show();
        }
    }
}

function retornaPaginaCaminhos(pag, jq) {
    if (rodarGlobal > 0) {
        RetornaCaminhosPaginando(pag, intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal, bolFiltrandoGlobal);        
    }
    rodarGlobal += 1;
}

function retornaPaginaTarefas(pag, jq) {
    if (rodarGlobal > 0) {
        RetornaTarefasPaginando(pag, intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal, bolFiltrandoGlobal);
    }
    rodarGlobal += 1;
}

function paginacaoAgendadas(idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento) {
    var resultados = 0;

    $('#container_painelcontrole #agendadas_paginando').html("<tr><td colspan='6'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>");
    $.ajax({
        url: "/AVA/Caminhos/home/SelecionaAgendadasTotal/",
        data: {
            idCaminho: idCaminho
        },
        async: false,
        success: function (data) {
            resultados = data;
        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("Nao foi possivel obter o numero de resultatos");
            }
            //alert("Não foi possível obter o numero de resultados");
        }
    });
    quantidadePorPagina = 10;

    resultados = parseInt(resultados);
    $("#Pagination").pagination(
        resultados,
        {
            items_per_page: quantidadePorPagina,
            num_display_entries: 5,
            current_page: 0,
            num_edge_entries: 1,
            link_to: "javascript:void(0);",
            callback: retornaPaginaAgendadas
        }
    );
    if (resultados <= quantidadePorPagina) {
        $("#mostraPaginas").hide();
    } else {
        if ($("#mostraPaginas").is(":hidden")) {
            $("#mostraPaginas").show();
        }
    }
}

function retornaPaginaAgendadas(pag, jq) {
    if (rodar > 0) {
        retornaAgendadasPaginando(pag, idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento)              
    }
    rodar += 1;
}

function simularAvaliacao(idAvaliacao) {
    window.open('/avaliacoesonline/fazer_avaliacao.asp?inicio=1&idAvaliacao=' + idAvaliacao + '&intAgend=0', 'wndFazerAvaliacao', 'width=799,height=480, scrollbars=1, resizable=yes');
}

function salvarAlteracoesEtapaAluno(){

    var idAluno = $("#idAluno").val();
    var idRotaAgendamento = $("#idRotaAgendamento").val();

    var qtdEtapa = 0;
    $('.comentarioEtapaAluno').each(function(){
        qtdEtapa++;
    })

    $('#btSalvarAlteracao').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Salvando...");
    $('.comentarioEtapaAluno').each(function (i) {
        i++;

        var idComentAluno = "#" + $(this).attr("id");
        var idEtapaAux = idComentAluno.split("_");
        var idEtapa = idEtapaAux[1];

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/home/SalvarComentarioEtapaAluno/",
            data: {
                idAluno: idAluno,
                idRotaAgendamento: idRotaAgendamento,
                idEtapa: idEtapa,
                txtComentario: $(idComentAluno).val()
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {

                //se salvou o comentário então salva a nota
                var idNotaAluno = "#nota_" + idEtapa;
                var notaEtapaAluno = $(idNotaAluno).val();

                if (notaEtapaAluno != undefined) {
                    if (notaEtapaAluno == "") {
                        $(idNotaAluno).addClass("ava_field_alert");
                        $('html, body').animate({
                            scrollTop: $(idNotaAluno).offset().top
                        }, 1000);
                        return false;
                    }
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/home/SalvarNotaEtapaAluno/",
                        data: {
                            idAluno: idAluno,
                            idRotaAgendamento: idRotaAgendamento,
                            idEtapa: idEtapa,
                            notaEtapaAluno: notaEtapaAluno
                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("Nao foi possivel salvar a nota do aluno.");
                            }
                            //alert("Não foi possível salvar a nota do aluno.");
                        }
                    });
                }

                if (i == qtdEtapa) {
                    $('#btSalvarAlteracao').html('<a class="ne-salvar large awesome awesome-green " href="javascript:void(0);" onclick="salvarAlteracoesEtapaAluno();">Salvar alterações</a>');
                }

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("Nao foi possivel salvar o comentario do aluno");
                }
                //alert("Não foi possível salvar o comentário do aluno.");
            }
        });

    })

}

function verOrientacoes(idEtapa){
    
    var t = $("#btVer_"+idEtapa);
    var o = { 'autoDimensions': false, 'width': 685, 'height': 565, 'hideOnOverlayClick': false, 'autoScale':false, 'onComplete': function () {
            
            //callback

        } //function
    }

    lightBoxAVA(t, o);
    $("#btVer_"+idEtapa).click();
}

function excluirAgendamento(idAgendamento) {

    var o = { 'autoDimensions': false, 'width': 550, 'height': 'auto', 'hideOnOverlayClick': false, 'autoScale': false, 'href': '/AVA/Caminhos/Home/SelecionaExclusaoAgendamento/' + idAgendamento, 'onComplete': function () {

        $("#btCancelarAgendamento").click(function () {
            $("#fancybox-close").click();
        })

        $("#btExcAgendamento").click(function () {
            var cont = $("input[type=checkbox][name='cbTurmaAgendada']:checked").length;

            if (cont > 0) {

                $("input[type=checkbox][name='cbTurmaAgendada']:checked").each(function (i) {

                    var idTurma = $(this).val();
                    var strTurmas = "";
                    $.ajax({
                        type: "POST",
                        url: "/ava/caminhos/home/ExcluirAgendamentoPorTurma/",
                        data: {
                            idRotaAgendamento: idAgendamento,
                            idTurma: idTurma
                        },
                        success: function (data) {                            
                            //vai postar na timeline
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/SalvarCancelamentoMensagemRapidaAtividade",
                                data: {
                                    destino: idTurma,
                                    idRotaAgendamento: idAgendamento
                                },
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function (data) {
                                    abrirAgendamento(0, 1, 1, 1, '', '', '', false);
                                    $("#fancybox-close").click();
                                },
                                error: function (data) {
                                    if (data.status != 0) {
                                        console.debug("erro ao postar cancelamento de agendamento!");
                                    }
                                }
                            });//postar timeline

                           
                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("Nao foi possivel excluir o agendamento da turma " + idTurma);
                            }
                        }
                    }); //ajax delete agendamento                    

                }); //each checkbox

            } else {
                alert("Selecione pelo menos uma turma!")
            }
        })

    } //function
    }

    $.fancybox(o);
    return false;

}
