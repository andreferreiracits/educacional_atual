﻿

function loadSeletor(a) {
    $(a).AvaSelector("bolInstanciado") && $(a).AvaSelector("limparUsuarios");
    var o = {
        bolAluno: !0,
        bolResponsavel: !1,
        bolEscondeTituloExterno: !0,
        bolLajota: !0,
        bolSeletorFinalizar: !1,
        bolSelecionarTodos: !0,
        botaoConclusao: $("#btnConcluirAgendamento"),
        btnTextoBotaoConclusaoSeletor: "Adicionar",
        strTitulo: "Agendar para:",
        bolCoordenador: !1,
        insertLajota: function(a, o) {
            arrayUsuarioAux = a, arrayEntidadeAux = o
        },
        usuarioGrupoAdicionado: function(a, o, e) {
            arrayUsuariosAux.splice(0, arrayUsuariosAux.length), arrayGrupoAux.splice(0, arrayGrupoAux.length);
            for (var i = 0; i < a.length; i++) arrayUsuariosAux.push(a[i]);
            for (var i = 0; i < o.length; i++) arrayGrupoAux.push(o[i])
        }
    };
    $(a).AvaSelector("bolInstanciado") ? $(a).AvaSelector("limparUsuarios") : $(a).AvaSelector(o)
}

function salvarPaginasCM() {
    var a = $("#paginacaoCM").find("option:selected"),
        o = $("#idEtapa");
    $.ajax({
        url: "/ava/caminhos/home/salvarPaginacaoCMRapido",
        data: {
            idEtapa: o.val(),
            pOrdem: a.attr("pOrdem"),
            sOrdem: a.attr("sOrdem")
        },
        type: "POST",
        async: !1,
        success: function(a) {
            var o = parseInt(a);
            2 == o && console.debug("Desconhecido")
        },
        error: function(a) {
            console.debug(a.responseText)
        }
    })
}

function visualizarCM() {
    var a = $("#paginacaoCM").find("option:selected").attr("iVersao"),
        o = $("#paginacaoCM").find("option:selected");
    visualizarPaginaCM(o, a)
}

function visualizarCMLista(a) {
    var o = $("#paginacaoCM_" + a).find("option:selected").attr("iVersao"),
        e = $("#paginacaoCM_" + a).find("option:selected");
    visualizarPaginaCM(e, o)
}

function visualizarPaginaCM(a, o) {

    console.log('Editarrrrr');

    var e = a.attr("idPublicacao");
    if (6 == o) {
        var i, t, r, n, s, l;
        i = 730, t = 500, r = screen.width, n = screen.height, s = (r - i) / 2, l = (n - t) / 2 - 20, window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(a.attr("url")) + "&idPublicacao=" + e + "&iVersao=" + o, e, "left=" + s + ",top=" + l + ",width=" + i + ",height=" + t + ",resizable=yes")
    } else 3 > o ? window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(a.attr("urlPai")) + "?bProcura=1&idPublicacao=" + e + "&idcapitulo=" + a.attr("pOrdem") + "&idSubcapitulo=" + a.attr("sOrdem") + "&iVersao=" + o, a.attr("idPublicacao"), "width=800,height=600,scrollbars=no,left=0,top=0,resizable=yes") : 7 == o ? window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(a.attr("urlPai")) + "?bProcura=1&idPublicacao=" + e + "&idcapitulo=" + a.attr("pOrdem") + "&idSubcapitulo=" + a.attr("sOrdem") + "&iVersao=" + o, a.attr("idPublicacao"), "width=790,height=560,scrollbars=no,left=0,top=0,resizable=yes") : window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(a.attr("urlPai")) + "?bProcura=1&idPublicacao=" + e + "&idcapitulo=" + a.attr("pOrdem") + "&idSubcapitulo=" + a.attr("sOrdem") + "&iVersao=" + o, a.attr("idPublicacao"), "width=780,height=580,scrollbars=no,left=0,top=0,resizable=yes")
}

function editar(a) {
    location.href = "/AVA/Caminhos/Home/Criar/" + a
}

function editarTarefa(a) {
    location.href = "/AVA/Caminhos/Home/CriarTarefa/" + a
}

function criar() {
    window.location = "/AVA/Caminhos/Home/Criar"
}

function criarTarefa() {
    window.location = "/AVA/Caminhos/Home/CriarTarefa"
}

function voltarEdicaoEtapa(a) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaUltimaEtapaByIdCaminho/" + a,
        success: function(o) {
            var e = o.split("_"),
                i = e[0],
                t = e[1];
            i > 0 && t > 0 ? editarEtapa(i, t) : criarEtapa(a)
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao buscar última etapa criada!")
        }
    })
}

function salvarCaminho(a, o, e) {
    
    if ($titulo = $("#strTitulo").val(), $descricao = $("<div/>").text($("#strDescricao").val()).html(), $titulo = $("<div/>").text($titulo).html(), "" == $titulo || "Escreva aqui um título para o seu caminho de aprendizagem." == $titulo) return $("#strTitulo").addClass("ava_field_alert"), $("html, body").animate({
        scrollTop: $("#tituloCaminho").offset().top - 60
    }, 1e3), !1;

    if ("Digite um texto explicando aos alunos o objetivo deste caminho." == $descricao && ($descricao = "Descrição do caminho"), $descricao.length > 800) return $("#strDescricao").addClass("ava_field_alert");

    $("html, body").animate({
        scrollTop: $("#descricaoCaminho").offset().top - 60
    }, 1e3), !1;
    var i = 2;
    $("input:radio[name=rTipo_1]").each(function() {
        $(this).is(":checked") && (i = parseInt($(this).val()))
    });
    var t = "";
    $(".ava_tags li").each(function() {
        t += $(this).text().substring(0, $(this).text().length) + ";", t = t.replace("x;", ";")
    });

    $("#btSalvarCaminhoSpan").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Salvando...");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminhoRecurso/",
        data: {
            idRota: o,
            idUsuario: a,
            strTitulo: $titulo,
            strDescricao: $descricao,
            intStatus: i,
            strTags: t,
            intTipo: 1,
            json : null,
            userturma : 0
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#idCaminho").val(a), $(".step_caminhos").attr("onclick", "editar(" + a + ")");
            var o = $("#idUsuario").val();
            $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled");
            
            $("#btnExcluirCaminhoSpan").html('<a href="javascript: void(0);" id="btnExcluirCaminho" class="ne-excluir large awesome awesome-red b_tooltip_center">excluir caminho</a><span class="black_tip_center tooltip" id="tooltipExc_' + a + '"><p>Deseja realmente excluir este caminho? </p> <a href="javascript: void(0);" class="bt_normal green" onclick="excluirRota(' + a + ', true)">sim</a> <a href="javascript: void(0);" class="bt_normal red" onclick="excluirRota(' + a + ', false)">não</a><span class="black_tip_seta">&#9660;</span></span>'), $("#btSalvarCaminhoSpan").html('<a href="javascript: void(0);" class="ne-salvar large awesome awesome-green" id="btSalvarCaminho" onclick="salvarCaminho(' + o + ", " + a + ', false)">salvar</a>'), $("#btnAvancarCaminho").attr("onclick", "salvarCaminho(" + o + ", " + a + ", true)"), $(".b_tooltip_center").tooltip({
                effect: "slide",
                position: "top center",
                relative: !0,
                events: {
                    def: "click, mouseout"
                }
            }), e && ($(".step_etapas").children(":first").attr("onclick", "salvarCaminho(" + o + "," + a + ",true);"), $(".step_conclusao").children(":first").attr("href", "/AVA/caminhos/home/concluir/" + a), $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/RetornaUltimaEtapaByIdCaminho/" + a,
                success: function(o) {
                    var e = o.split("_"),
                        i = e[0],
                        t = e[1];
                    i > 0 && t > 0 ? editarEtapa(i, t) : criarEtapa(a)
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao buscar última etapa criada!")
                }
            }));
            0 == $("#nav_etapas .atividade_salva").length ? ($("#nav_etapas").append('<div class="clearfix"></div><br /><div class="atividade_salva right">Seu caminho foi salvo com sucesso!</div>'), $(".atividade_salva").delay(2e3).fadeOut("slow")) : ($(".atividade_salva").show(), $("#nav_etapas .atividade_salva").html("Seu caminho foi salvo com sucesso!"), $(".atividade_salva").delay(2e3).fadeOut("slow"))
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao salvar caminho!")
        }
    })
}

function duplicarRota(a) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/DuplicarRota/",
        data: {
            id: a
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            editar(a)
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao duplicar caminho!")
        }
    })
}

function duplicarTarefa_OLD(a) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/DuplicarRota/",
        data: {
            id: a
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            editarTarefa(a)
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao duplicar caminho!")
        }
    })
}

function duplicarTarefa(a) {
    location.href = "/AVA/Caminhos/Home/CriarTarefa/" + a+"?d=1";
}

function abrirRecurso(a, o) {
    idCategoriaGlobal = a, idRecursoGlobal = o, retornaRecurso(idCategoriaGlobal, idRecursoGlobal), strPesquisaGlobal = "", rodarGlobal = 0, paginacaoTotal(idCategoriaGlobal, idRecursoGlobal)
}

function getParamID() {
    var a = window.location.href.toString().toLowerCase();
    return a = a.replace("http://novo.educacional/ava/caminhos/home/", ""), a = a.split("/"), a[1]
}

function voltarListaAvaliacoesCaminhos() {
    var a = $("#idEtapa").val(),
        o = $("#idCaminho").val();
    void 0 == a ? criarEtapa(o) : $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + a,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#recursoescolhido, #camposEtapa").html("").css("display", "none"), $(".ava_ativtable table").css("display", ""), listaAvaliacoesCaminhos("", "", "")
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir etapa!")
        }
    })
}

function voltarRecurso(a, o) {
    var e = $("#idEtapa").val(),
        i = $("#idCaminho").val();
    0 > a ? $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + e,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(e) {
            retornaRecurso(a, o)
        },
        error: function(a) {
            0 != a.status && console.debug("Erro ao excluir etapa!")
        }
    }) : void 0 == e ? criarEtapa(i) : $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + e,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(e) {
            $("#recursoescolhido, #camposEtapa").html("").css("display", "none"), $(".ava_ativtable table").css("display", ""), retornaRecurso(a, o)
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir etapa!")
        }
    })
}

function fazerCaminhoTarefa(a) {
    $.ajax({
        url: "/ava/caminhos/home/retornaRotaUsuarioEtapa/",
        data: {
            idCaminhoAgendamento: a
        },
        async: !1,
        success: function(o) {
            o.split("_");
            location.href = "/AVA/Caminhos/home/resumo/" + a
        },
        error: function(a) {
            0 != a.status && console.debug(a.status)
        }
    })
}

function criarRotaUsuario(a) {
    $.ajax({
        url: "/ava/caminhos/home/salvarCaminhoUsuario/",
        data: {
            idCaminhoAgendamento: a
        },
        async: !1,
        success: function(o) {
            location.href = "/AVA/Caminhos/home/resumo/" + a
        },
        error: function(a) {
            0 != a.status && console.debug(a.status)
        }
    })
}

function paginacao(a, o, e) {
    var i, t = 0;
    if (159 == a) {
        var r = $("#IdPapelEnsino").val(),
            n = $("#idDisciplina").val();
        i = {
            idCategoria: a,
            strPesquisa: o,
            intEnsino: r,
            intDisciplina: n
        }
    } else i = {
        idCategoria: a,
        strPesquisa: o
    };
    $.ajax({
        url: "/AVA/Caminhos/home/ProcurarRecursoItemTotal/",
        data: i,
        async: !1,
        success: function(a) {
            t = a, quantidadePorPagina = 10, t = parseInt(t), $("#Pagination").pagination(t, {
                items_per_page: quantidadePorPagina,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: retornaPagina
            }), 10 >= t ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
        },
        error: function(a) {
            0 != a.status && console.debug("Nao foi possivel obter o numero de resultados")
        }
    })
}

function paginacaoTotal(a, o) {
    idCategoriaGlobal = a, idRecursoGlobal = o;
    var e = 0;
    1 == o ? ("undefined" == typeof $tipopesquisa && ($tipopesquisa = 1), "undefined" == typeof idEstado && (idEstado = -1), "undefined" == typeof $tituloAval && ($tituloAval = ""), "undefined" == typeof $dataInicio && ($dataInicio = ""), "undefined" == typeof $dataFim && ($dataFim = ""), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaAvaliacoesTotal/",
        async: !1,
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
        success: function(a) {
            e = a, e = parseInt(e), intResultadoConteudoGlobal = e, 10 >= e ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
        },
        error: function(a) {
            0 != a.status && console.debug("Não foi possível obter o numero de resultados")
        }
    })) : $.ajax({
        url: "/AVA/Caminhos/home/SelecionarRecursoItemTotal/",
        data: "idCategoria=" + a + "&idRecurso=" + o,
        async: !1,
        success: function(a) {
            e = a, e = parseInt(e), intResultadoConteudoGlobal = e, 10 >= e ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
        },
        error: function(a) {
            0 != a.status && console.debug("Nao foi possivel obter o numero de resultados")
        }
    }), quantidadePorPagina = 10, $("#Pagination").pagination(e, {
        items_per_page: quantidadePorPagina,
        num_display_entries: 5,
        current_page: 0,
        num_edge_entries: 1,
        link_to: "javascript:void(0);",
        callback: retornaPagina
    })
}

function retornaPagina(a, o) {
    rodarGlobal > 0 && loadContents(a, idCategoriaGlobal, idRecursoGlobal, strPesquisaGlobal), rodarGlobal += 1
}

function retornaRecurso(a, o) {
    if ($("#recurso_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), 0 > a) {
        var e = $("#idCaminho").val();
        criarEtapa(e)
    } else $.ajax({
        url: "/AVA/Caminhos/Home/RetornaRecurso/?idCategoria=" + a,
        async: !1,
        success: function(e) {
            $("#recurso_ava").html(e).css("display", ""), $(".ph").addPlaceholder(), $("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", ""), 10 >= intResultadoConteudoGlobal ? $("#mostraPaginas").hide() : $("#mostraPaginas").show(), retornaRecursosItens(a, o)
        },
        error: function(a) {
            0 == a.status ? $("#recurso_ava").empty() : $("#recurso_ava").html("erro ao listar os recursos")
        }
    })
}

function loadContents(a, o, e, i) {
    a += 1;
    var t, r;
    if (r = quantidadePorPagina * a, t = r - quantidadePorPagina + 1, 1 == e);
    else {
        var n;
        if ($("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), "" == i || void 0 === i || null == i) n = {
            idCategoria: o,
            idRecurso: e,
            intInicio: t,
            intFim: r
        }, $.ajax({
            url: "/AVA/Caminhos/Home/RetornaRecursoItem/",
            async: !1,
            data: n,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(a) {
                $("#recursoitem_ava").html(a).css("display", "")
            },
            error: function(a) {
                0 != a.status && console.debug("erro")
            }
        });
        else {
            if (159 == o) {
                var s = $("#IdPapelEnsino").val(),
                    l = $("#idDisciplina").val();
                n = {
                    idCategoria: o,
                    idRecurso: e,
                    strPesquisa: i,
                    intEnsino: s,
                    intDisciplina: l,
                    intInicio: t,
                    intFim: r
                }
            } else n = {
                idCategoria: o,
                idRecurso: e,
                strPesquisa: i,
                intInicio: t,
                intFim: r
            };
            $.ajax({
                url: "/AVA/Caminhos/home/ProcurarRecursoItem/",
                data: n,
                async: !1,
                success: function(a) {
                    $("#recursoitem_ava").html(a)
                },
                error: function(a) {
                    0 != a.status && console.debug("Erro")
                }
            })
        }
    }
}

function retornaRecursosItens(a, o) {
    1 == o ? ($("#linha_filtro").css("display", ""), $("#linha_header_tbl").css("display", ""), $("#recursoitem_ava").attr("colspan", "3"), $("#recursoitem_ava").attr("class", "tablefix"), $.ajax({
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
        success: function(a) {
            $("#recursoitem_ava").html(a), $(".mouseover_aval").mouseover(function() {
                $(this).children(":first").find("div").css("display", "block")
            }).mouseout(function() {
                $(this).children(":first").find("div").css("display", "none")
            })
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao listar recursos!")
        }
    })) : ($("#recursoitem_ava").attr("class", "tablefix"), $("#tblrecursoitem_ava, div#recursoitem_ava").css("display", "none"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaRecursoItem/",
        data: {
            idCategoria: a,
            idRecurso: o,
            intInicio: 1,
            intFim: 10
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#recursoitem_ava").html(a).css("display", ""), $(".ava_container_masonry").masonry({
                itemSelector: ".ava_box_masonry"
            })
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao listar recursos!")
        }
    }))
}

function abrirRecursoEdicao(a, o, e, i) {
    var t = "";
    t = 1 == o ? "/AVA/Caminhos/Home/RetornaRecursoEdicao/?idCategoria=" + a + "&bolAvaliacao=true" : "/AVA/Caminhos/Home/RetornaRecursoEdicao/?idCategoria=" + a + "&bolAvaliacao=false", $("#recurso_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        url: t,
        data: {
            idEtapa: e,
            intEtapa: i
        },
        success: function(e) {
            $("#recurso_ava").html(e), $("#recursoitem_ava").css("display", "none"), 1 == o ? ($("#tblrecursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $("#linha_filtro, #linha_tbl_aval").css("display", ""), $.ajax({
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
                success: function(a) {
                    $("#tblrecursoitem_ava").html(a), $(".mouseover_aval").mouseover(function() {
                        $(this).children(":first").find("div").css("display", "block")
                    }).mouseout(function() {
                        $(this).children(":first").find("div").css("display", "none")
                    })
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao listar recursos!")
                }
            })) : (retornaRecursosItens(a, o), paginacaoTotal(a, o))
        },
        error: function(a) {
            0 == a.status ? $("#recurso_ava").empty() : $("#recurso_ava").html("erro ao listar os recursos")
        }
    })
}


function inserirDoMeuJeito(a) {
    var o = $("#idCaminho").val(),
        e = $("#intEtapa").val();
    $("#idEtapa").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecurso/",
        data: {
            idCaminho: o,
            idEtapa: 0,
            intEtapa: e,
            idRecurso: a,
            idPublicacao: 0,
            idAvaliacao: 0
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#recurso_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
                url: "/AVA/Caminhos/Home/RetornaRecurso/?idCategoria=-1",
                success: function(i) {
                    $("#recurso_ava").html(i).css("display", ""), $(".ava_ativtable tbody,tfoot").css("display", "none"), $("#camposEtapa").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", ""), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/TerminaEdicaoEtapa/",
                        data: {
                            idRecursoEtapa: a
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(i) {
                            $("#camposEtapa").html(i).css("display", ""), $("#tituloetapa").limit("100", "#tituloLimite"), $(".ph").addPlaceholder(), $("#tituloetapa").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#im_entrega").click(function() {
                                this.checked ? $("#obsEntrega").removeAttr("disabled") : ($("#obsEntrega").attr("disabled", "disabled"), $("#obsEntrega").val(""))
                            }), $("#strTituloLink").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#strUrl").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#valeNota").click(function() {
                                this.checked ? $("#intValorEtapa").removeAttr("disabled") : ($("#intValorEtapa").attr("disabled", "disabled"), $("#intValorEtapa").removeClass("ava_field_alert"))
                            }), $("#intValorEtapa").digitosDouble(), $("#intValorEtapa").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#toggle_midia").toggle(function() {
                                $("#sobedesce_midia").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_midia").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_entrega").toggle(function() {
                                $("#sobedesce_entrega").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_entrega").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_link").toggle(function() {
                                $("#sobedesce_link").slideDown(function() {
                                    $("#strTituloLink,#strLinkApoio").focus(function() {
                                        $(this).removeClass("ava_field_alert"), $("#strTituloLink").limit("100", ""), retornaLinksApoio(a)
                                    })
                                }), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_link").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_material").toggle(function() {
                                $(".sobedesce_material").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $(".sobedesce_material").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_codigoLivro").toggle(function() {
                                $(".sobedesce_codigoLivro").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $(".sobedesce_codigoLivro").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), carregaTiny(), montarNavegacaoEtapas(0, o, e), $("#btnAvancarCaminho").attr("onClick", "avancarConclusao(" + o + ")"), $("#btnAvancarCaminho").removeClass("disable")
                        },
                        error: function(a) {
                            0 != a.status && console.debug("erro ao terminar edição etapa!")
                        }
                    })
                },
                error: function(a) {
                    0 == a.status ? $("#recurso_ava").empty() : $("#recurso_ava").html("erro ao listar os recursos")
                }
            })
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao incluir etapa do meu jeito")
        }
    })
}

function abreUploadCaminhos(o) {
    var e = [];
    if (null != arrayArquivosUpload && void 0 != arrayArquivosUpload && null != arrayArquivosUpload.arrayArquivo && void 0 != arrayArquivosUpload.arrayArquivo && arrayArquivosUpload.arrayArquivo.length > 0)
        for (var i in arrayArquivosUpload.arrayArquivo) e.push(arrayArquivosUpload.arrayArquivo[i].id);
    var t, r = 15,
        n = {
            idFerramenta: o,
            idFerramentaTipo: r,
            idsArquivosSelecionados: e.join(",")
        };
    try {
        t = document.createElement("<form name='upload'>")
    } catch (s) {
        t = document.createElement("form"), t.name = "upload"
    }
    for (var l in n)
        if (n.hasOwnProperty(l)) {
            var c = document.createElement("input");
            c.type = "hidden", c.name = l, c.value = n[l], t.appendChild(c)
        }
    t.target = "Upload", t.method = "POST", t.action = "/AVA/Upload", document.body.appendChild(t);
    var d = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
    Modernizr.touch && (d = null), a = window.open("", "Upload", d), a && t.submit()
}

function carregaArquivosCaminho(a) {
    var o = ".cx_arq_" + a,
        e = ".container_inEntrega";
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaArquivosCaminho/",
        data: {
            idEtapa: a
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            "object" != typeof a && "" != a ? ($(o).html(a), (0 == $(o).text().length || "" == $(o).text()) && $(e).after(a), $(o).slideDown(), $(this).find(".up_down").html("&#9650;")) : $(o).slideUp();
            var i = location.href;
            if (i = i.toLowerCase(), -1 != i.indexOf("player") && (void 0 == arrayArquivosUpload || null == arrayArquivosUpload)) {
                var t = [];
                $(o + " .the_insertedMedia .bt_normal").each(function() {
                    t.push({
                        id: $(this).attr("idArquivo")
                    })
                }), arrayArquivosUpload = new Object, arrayArquivosUpload.arrayArquivo = t
            }
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao listar material de apoio!")
        }
    }), $("#toggle_material").toggle(function() {
        $(".sobedesce_material").slideDown(), $(this).find(".up_down").html("&#9650;")
    }, function() {
        $(".sobedesce_material").slideUp(), $(this).find(".up_down").html("&#9660;")
    })
}

function carregaArquivosEtapa(a) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaArquivosTarefa/",
        data: {
            idEtapa: a
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            "object" != typeof a && "" != a && ($("#boxMaterialApoioTarefa").remove(), $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa">' + a + "</div>"))
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao listar material de apoio!")
        }
    })
}

function CallbackUpload(a) {

    console.log('SSSASA');

    var idDaRota = $("#idRota").val();

    var o = new Array,
        e = location.href;
    if (e = e.toLowerCase(), -1 != e.indexOf("tarefa")) {
        if (void 0 == arrayArquivosUpload) arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(a));
        else {
            var i = !1,
                t = [];
            if (arrayArquivosUpload.idFerramenta = a.idFerramenta, arrayArquivosUpload.idFerramentaTipo = a.idFerramentaTipo, arrayArquivosUpload.arrayArquivo.length > 0) {
                for (var r in arrayArquivosUpload.arrayArquivo) {
                    i = !1;
                    for (var n in a.arrayArquivo)
                        if (a.arrayArquivo[n].id == arrayArquivosUpload.arrayArquivo[r].id) {
                            i = !0;
                            break
                        }
                    i ? t.push(arrayArquivosUpload.arrayArquivo[r]) : $("#boxMaterialApoioTarefa .the_insertedLink .exclui_arquivo[idarquivo=" + arrayArquivosUpload.arrayArquivo[r].id + "]").parent().remove()
                }
                arrayArquivosUpload.arrayArquivo = t, t = []
            }

            for (var s = 0; s < a.arrayArquivo.length; s++) {
                // i = !1;
                // for (var r in arrayArquivosUpload.arrayArquivo)
                //     if (arrayArquivosUpload.arrayArquivo[r].id == a.arrayArquivo[s].id) {
                //         i = !0;
                //         break
                //     }
                // i || arrayArquivosUpload.arrayArquivo.push(a.arrayArquivo[s])
                if (arrayArquivosUpload.arrayArquivo.filter(f => f.id == a.arrayArquivo[s].id).length == 0) {
                    arrayArquivosUpload.arrayArquivo.push(a.arrayArquivo[s]);   
                }
            }

            $("#boxMaterialApoioTarefa").remove();
            console.log("arrayArquivosUpload", arrayArquivosUpload);
            console.log("a", a);
        }

        for (var l = $("#boxMaterialApoioTarefa .the_insertedLink"), s = 0; arrayArquivosUpload.arrayArquivo[s]; s++) {
            strAuxArquivo = arrayArquivosUpload.arrayArquivo[s].strArquivo, (null == strAuxArquivo || "" == strAuxArquivo || void 0 == strAuxArquivo) && (strAuxArquivo = arrayArquivosUpload.arrayArquivo[s].strNome);
            for (var c = 0; c < a.arrayArquivo.length; c++) {
                var d = a.arrayArquivo[c].id;
                if (void 0 == l.find("a[idArquivo*='" + d + "']").attr("idarquivo") && null != strAuxArquivo && "" != strAuxArquivo && void 0 != strAuxArquivo) {
                    strRetornoHtmlUpload += '<div class="the_insertedLink"><a href="' + arrayArquivosUpload.arrayArquivo[s].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[s].strArquivo + arrayArquivosUpload.arrayArquivo[s].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[s].strArquivo + '</a><a onclick="excluirArquivoFerramenta(' + arrayArquivosUpload.arrayArquivo[s].id + "," + $("#idEtapa").val() + ')" href="javascript:void(0);" class="bt_normal " idArquivo="' + arrayArquivosUpload.arrayArquivo[s].id + '"><strong>x</strong></a></div>';
                    break
                }
            }
        }

        l.find("div").hasClass("the_insertedLink") || ($("#boxMaterialApoioTarefa").remove(), $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa"><div class="container_inlinks"><h5>Material de apoio</h5>' + strRetornoHtmlUpload + "</div></div>")), $("#boxMaterialApoioTarefa .container_inlinks").find("h5").after(l), $(".exclui_arquivo").click(function() {
            for (var a = $(this).attr("idArquivo"), o = 0; o < arrayArquivosUpload.arrayArquivo.length; o++)
                if (arrayArquivosUpload.arrayArquivo[o].id == parseInt(a)) {
                    arrayArquivosUpload.arrayArquivo.splice(o, 1);
                    break
                }
            if ($(this).parent().remove(), 0 == arrayArquivosUpload.arrayArquivo.length) $("#boxMaterialApoioTarefa").remove();
            else
                for (var o = 0; arrayArquivosUpload.arrayArquivo[o]; o++) strRetornoHtmlUpload += '<div class="the_insertedLink"><a href="' + arrayArquivosUpload.arrayArquivo[o].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[o].strArquivo + arrayArquivosUpload.arrayArquivo[o].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[o].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" posArrayArquivo="' + o + '"><strong>x</strong></a></div>';
            arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(arrayArquivosUpload)), strRetornoHtmlUpload = ""
        }), strRetornoHtmlUpload = ""
    } else if (-1 != e.indexOf("criar") || -1 != e.indexOf("concluir")) {
        var u = ".cx_arq_aux_" + a.idFerramenta;
        if (void 0 == arrayArquivosUpload) arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(a));
        else {
            var i = !1,
                t = [];
            if (arrayArquivosUpload.arrayArquivo.length > 0) {
                for (var r in arrayArquivosUpload.arrayArquivo) {
                    i = !1;
                    for (var n in a.arrayArquivo)
                        if (a.arrayArquivo[n].id == arrayArquivosUpload.arrayArquivo[r].id) {
                            i = !0;
                            break
                        }
                    i ? t.push(arrayArquivosUpload.arrayArquivo[r]) : $("#boxMaterialApoioTarefa .the_insertedLink .exclui_arquivo[idarquivo=" + arrayArquivosUpload.arrayArquivo[r].id + "]").parent().remove()
                }
                arrayArquivosUpload.arrayArquivo = t, t = []
            }
            for (var s = 0; s < a.arrayArquivo.length; s++) {
                i = !1;
                for (var r in arrayArquivosUpload.arrayArquivo)
                    if (arrayArquivosUpload.arrayArquivo[r].id == a.arrayArquivo[s].id) {
                        i = !0;
                        break
                    }
                i || arrayArquivosUpload.arrayArquivo.push(a.arrayArquivo[s])
            }
        }
        for (var s = 0; arrayArquivosUpload.arrayArquivo[s]; s++) strRetornoHtmlUpload += '<div class="the_insertedMedia"><a href="' + arrayArquivosUpload.arrayArquivo[s].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[s].strArquivo + arrayArquivosUpload.arrayArquivo[s].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[s].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" idArquivo="' + arrayArquivosUpload.arrayArquivo[s].id + '"><strong>x</strong></a></div>';
        var m = $(u + " .container_inlinks");
        m.find("div").hasClass("the_insertedMedia") || ($(u).find(".container_inlinks").remove(), m = $(u + " .container_inlinks")), $(u).html('<div class="container_inlinks">' + strRetornoHtmlUpload + "</div>"), $(u).after(m), $(".exclui_arquivo").click(function() {
            for (var a = $(this).attr("idArquivo"), o = 0; o < arrayArquivosUpload.arrayArquivo.length; o++)
                if (arrayArquivosUpload.arrayArquivo[o].id == parseInt(a)) {
                    arrayArquivosUpload.arrayArquivo.splice(o, 1);
                    break
                }
            if ($(this).parent().remove(), 0 == arrayArquivosUpload.arrayArquivo.length) $("#boxMaterialApoioTarefa").remove();
            else
                for (var o = 0; arrayArquivosUpload.arrayArquivo[o]; o++) strRetornoHtmlUpload += '<div class="the_insertedMedia"><a href="' + arrayArquivosUpload.arrayArquivo[o].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[o].strArquivo + arrayArquivosUpload.arrayArquivo[o].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[o].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" posArrayArquivo="' + o + '"><strong>x</strong></a></div>';
            strRetornoHtmlUpload = ""
        }), strRetornoHtmlUpload = ""
    } else if (-1 != e.indexOf("player")) {
        var p = $("#idRotaEtapaUsuario_" + a.idFerramenta).val(),
            v = [],
            h = [],
            f = !1;
        if (void 0 != arrayArquivosUpload && null != arrayArquivosUpload && arrayArquivosUpload.arrayArquivo.length > 0)
            for (var g in arrayArquivosUpload.arrayArquivo) {
                f = !1;
                for (var s = 0; s < a.arrayArquivo.length; s++)
                    if (a.arrayArquivo[s].id == arrayArquivosUpload.arrayArquivo[g].id) {
                        f = !0;
                        break
                    }
                f || v.push(arrayArquivosUpload.arrayArquivo[g].id)
            }
        if (v.length > 0)
            for (var _ in v) excluirArquivoCaminho(v[_], p);
        var A = arrayArquivosUpload;
        if (void 0 == A) A = a;
        else
            for (var s = 0; s < a.arrayArquivo.length; s++) {
                f = !1;
                for (var _ in A.arrayArquivo)
                    if (A.arrayArquivo[_].id == a.arrayArquivo[s].id) {
                        f = !0;
                        break
                    }
                f || (h.push(a.arrayArquivo[s].id), A.arrayArquivo.push(a.arrayArquivo[s]))
            }
        var o = new Array,
            b = A;
        if (void 0 == b || "" == b || null == b) {
            b = "";
            var y = null
        } else {
            for (var s = 0; s < b.arrayArquivo.length; s++) o.push(b.arrayArquivo[s].id), 0 == s && enviarTrabalhoMarcarConcluidoFim(a.idFerramenta, p);
            var y = {
                idFerramentaTipo: a.idFerramentaTipo,
                idFerramenta: p,
                arquivos: o
            }
        }

       

        $.ajax({
            type: "POST",
            async: !1,
            url: "/AVA/Upload/Home/SalvaArquivoFerramentaCaminhos/",
            data: {
                json: JSON.stringify(y),
                idRota: idDaRota
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(a) {
                carregaArquivosCaminho(p)
            },
            error: function(a) {
                0 != a.status && console.debug("erro ao salvar arquivo ferramenta!")
            }
        }), arrayArquivosUpload = A
    }
}

function CallbackUpload_OLD(jsonRetorno) {

    var objArray = new Array();
    var urlNavegador = location.href;
    urlNavegador = urlNavegador.toLowerCase();

    if (urlNavegador.indexOf("tarefa") != -1) {
        
        if (arrayArquivosUpload == undefined) {
            //arrayArquivosUpload = jsonRetorno;
            arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(jsonRetorno));
        } else {
            for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
                if (arrayArquivosUpload.arrayArquivo.filter(f => f.id == jsonRetorno.arrayArquivo[i].id).length == 0) {
                    arrayArquivosUpload.arrayArquivo.push(jsonRetorno.arrayArquivo[i]);   
                }
            }
        }

        console.log(arrayArquivosUpload);

        for (var i = 0; arrayArquivosUpload.arrayArquivo[i]; i++) {
            strAuxArquivo = arrayArquivosUpload.arrayArquivo[i].strArquivo;
            if (strAuxArquivo == null || strAuxArquivo == "" || strAuxArquivo == undefined) {
                strAuxArquivo = arrayArquivosUpload.arrayArquivo[i].strNome;
            }
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

            arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(arrayArquivosUpload));

            strRetornoHtmlUpload = '';
        });

        strRetornoHtmlUpload = '';

        /*
        $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaArquivosTarefa/",
        data: {
        idEtapa: jsonRetorno.idFerramenta
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
        $("#boxMaterialApoioTarefa").remove();
        if (typeof (data) != "object" && data != "") {
        $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa">' + data + '</div>');
        }
        },
        error: function (data) {
        if (data.status != 0) {
        console.debug("erro ao listar material de apoio!");
        }
        }
        });
        */

    } else if (urlNavegador.indexOf("criar") != -1) {

        var auxClass = ".cx_arq_aux_" + jsonRetorno.idFerramenta;


        if (arrayArquivosUpload == undefined) {
            //arrayArquivosUpload = jsonRetorno;
            arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(jsonRetorno));
        } else {
            for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
                arrayArquivosUpload.arrayArquivo.push(jsonRetorno.arrayArquivo[i]);
            }
        }

        for (var i = 0; arrayArquivosUpload.arrayArquivo[i]; i++) {
            strRetornoHtmlUpload += '<div class="the_insertedMedia"><a href="' + arrayArquivosUpload.arrayArquivo[i].strDiretorio + '/' + arrayArquivosUpload.arrayArquivo[i].strArquivo + arrayArquivosUpload.arrayArquivo[i].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[i].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" idArquivo="' + arrayArquivosUpload.arrayArquivo[i].id + '"><strong>x</strong></a></div>';
        }

        $(auxClass).html('<div class="container_inlinks">' + strRetornoHtmlUpload + '</div>');

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
                    strRetornoHtmlUpload += '<div class="the_insertedMedia"><a href="' + arrayArquivosUpload.arrayArquivo[i].strDiretorio + '/' + arrayArquivosUpload.arrayArquivo[i].strArquivo + arrayArquivosUpload.arrayArquivo[i].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[i].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" posArrayArquivo="' + i + '"><strong>x</strong></a></div>';
                }
            }

            strRetornoHtmlUpload = '';
        });

        strRetornoHtmlUpload = '';


        /*
        $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaArquivosCaminhoEducador/",
        data: {
        idEtapa: jsonRetorno.idFerramenta
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {

        $(auxClass).html(data);

        },
        error: function (data) {
        if (data.status != 0) {
        console.debug("erro ao listar material de apoio!");
        }
        }
        });
        */

    } else if (urlNavegador.indexOf("player") != -1) {

        var idRotaEtapaUsuario = $("#idRotaEtapaUsuario_" + jsonRetorno.idFerramenta).val();


        var auxArquivosRet = arrayArquivosUpload;
        if (auxArquivosRet == undefined) {
            auxArquivosRet = jsonRetorno;
        } else {
            for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
                auxArquivosRet.arrayArquivo.push(jsonRetorno.arrayArquivo[i]);
            }
        }



        var objArray = new Array();
        // Salvar arquivo ferramenta
        // Array de arquivos - Novo Upload
        var arrayArquivos = auxArquivosRet;
        if (arrayArquivos == undefined || arrayArquivos == '' || arrayArquivos == null) {
            arrayArquivos = '';
            var jsonReturnFinal = null;
        } else {
            for (var i = 0; i < arrayArquivos.arrayArquivo.length; i++) {
                objArray.push(arrayArquivos.arrayArquivo[i].id);
                if (i == 0) {
                    enviarTrabalhoMarcarConcluidoFim(auxArquivosRet.idFerramenta, idRotaEtapaUsuario);
                }
            }
            var jsonReturnFinal = {
                'idFerramentaTipo': arrayArquivos.idFerramentaTipo,
                'idFerramenta': idRotaEtapaUsuario,
                'arquivos': objArray
            };
        }


        $.ajax({
            type: "POST",
            async: false,
            url: "/AVA/Upload/Home/SalvaArquivoFerramenta/",
            data: {
                json: JSON.stringify(jsonReturnFinal)
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {

                carregaArquivosCaminho(idRotaEtapaUsuario);

            },
            error: function (data) {
                if (data.status != 0) {
                    console.debug("erro ao salvar arquivo ferramenta!");
                }
            }
        });




        /*
        var idRotaEtapaUsuario = $("#idRotaEtapaUsuario_" + jsonRetorno.idFerramenta).val();
        var auxClass = ".cx_arq_" + idRotaEtapaUsuario;


        if (arrayArquivosUpload == undefined) {
        arrayArquivosUpload = jsonRetorno;
        } else {
        for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
        arrayArquivosUpload.arrayArquivo.push(jsonRetorno.arrayArquivo[i]);
        }
        }

        for (var i = 0; arrayArquivosUpload.arrayArquivo[i]; i++) {
        strRetornoHtmlUpload += '<div class="the_insertedMedia"><a href="' + arrayArquivosUpload.arrayArquivo[i].strDiretorio + '/' + arrayArquivosUpload.arrayArquivo[i].strArquivo + arrayArquivosUpload.arrayArquivo[i].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[i].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" idArquivo="' + arrayArquivosUpload.arrayArquivo[i].id + '"><strong>x</strong></a></div>';
        }

        $(auxClass).html('<div class="container_inlinks">' + strRetornoHtmlUpload + '</div>');


        $(auxClass).slideDown();
        $(this).find('.up_down').html("&#9650;");

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
        enviarTrabalhoMarcarConcluidoFim(arrayArquivosUpload.idFerramenta, idRotaEtapaUsuario);
        $(auxClass).slideUp();
        } else {
        for (var i = 0; arrayArquivosUpload.arrayArquivo[i]; i++) {
        strRetornoHtmlUpload += '<div class="the_insertedMedia"><a href="' + arrayArquivosUpload.arrayArquivo[i].strDiretorio + '/' + arrayArquivosUpload.arrayArquivo[i].strArquivo + arrayArquivosUpload.arrayArquivo[i].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[i].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" posArrayArquivo="' + i + '"><strong>x</strong></a></div>';
        }
        //$(auxClass).slideUp();
        $(this).find('.up_down').html("&#9650;");

        // INICIO remover bandeira
        //var auxId = $(".idEtapaClass_" + arrayArquivosUpload.idFerramenta).val();
        // FIM remover bandeira

        }

        strRetornoHtmlUpload = '';

        });

        strRetornoHtmlUpload = '';

        enviarTrabalhoMarcarConcluidoFim(arrayArquivosUpload.idFerramenta, idRotaEtapaUsuario);
        */

    }



}

function CallbackUploadExcluidos(a) {
    var o = a.idArquivo,
        e = 0,
        i = location.href;
    if (i = i.toLowerCase(), -1 != i.indexOf("tarefa")) {
        $("#boxMaterialApoioTarefa div.the_insertedLink").each(function() {
            e += 1
        }), e > 1 ? $("a[idArquivo*='" + o + "']").closest("div.the_insertedLink").remove() : ($("a[idArquivo*='" + o + "']").closest("div.the_insertedLink").remove(), $("#boxMaterialApoioTarefa").remove());
        for (var t = 0; t < arrayArquivosUpload.arrayArquivo.length; t++)
            if (arrayArquivosUpload.arrayArquivo[t].id == parseInt(o)) {
                arrayArquivosUpload.arrayArquivo.splice(t, 1);
                break
            }
    } else if (-1 != i.indexOf("criar")) {
        $("#boxMaterialApoioTarefa div.the_insertedMedia").each(function() {
            e += 1
        }), e > 1 ? $("a[idArquivo*='" + o + "']").closest("div.the_insertedMedia").remove() : $("a[idArquivo*='" + o + "']").closest("div.the_insertedMedia").remove().closest("div.container_inlinks").remove();
        for (var t = 0; t < arrayArquivosUpload.arrayArquivo.length; t++)
            if (arrayArquivosUpload.arrayArquivo[t].id == parseInt(o)) {
                arrayArquivosUpload.arrayArquivo.splice(t, 1);
                break
            }
    }
}

function excluirArquivoFerramenta(a, o) {
    var e = "#boxMaterialApoioTarefa",
        i = [];
    $(e + " .the_insertedLink .bt_normal").each(function() {
        $(this).attr("idArquivo") != a ? i.push({
            id: $(this).attr("idArquivo")
        }) : $(this).parent().remove()
    }), arrayArquivosUpload = new Object, arrayArquivosUpload.arrayArquivo = i;
    var t = new Array;
    t.push(a);
    var r = {
        idFerramenta: o,
        arquivos: t
    };
    $.ajax({
        type: "POST",
        url: "/AVA/Upload/Home/ExcluiArquivoFerramenta/",
        data: {
            json: JSON.stringify(r)
        },
        success: function(a) {

            console.log("arrayArquivosUpload",arrayArquivosUpload);
            if (arrayArquivosUpload.arrayArquivo.length <= 0) {
                $("#boxMaterialApoioTarefa").remove();
            }
            
            carregaArquivosCaminho(o);
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir material de apoio!")
        }
    })
}

function excluirArquivoCaminho(a, o) {
    var e = [];
    if (void 0 != arrayArquivosUpload && null != arrayArquivosUpload) {
        for (var i in arrayArquivosUpload.arrayArquivo) arrayArquivosUpload.arrayArquivo[i].id != a && e.push(arrayArquivosUpload.arrayArquivo[i]);
        arrayArquivosUpload.arrayArquivo = e
    }
    var t = new Array;
    t.push(a);
    var r = {
            idFerramenta: o,
            arquivos: t
        },
        n = $(".idEtapaClass_" + o).val();
    $.ajax({
        type: "POST",
        url: "/AVA/Upload/Home/ExcluiArquivoFerramenta/",
        data: {
            json: JSON.stringify(r)
        },
        async: !1,
        success: function(o) {
            var e = $("#boxarq_" + a).parent().parent();
            $("#boxarq_" + a).slideUp("slow", function() {
                $(this).remove()
            });
            var i = n;
            if ("" != i && void 0 !== i) {
                var t = $("#idRotaUsuario_" + i).val(),
                    r = $("#idRecurso_" + i).val(),
                    s = $("#idRotaAgendamento_" + i).val(),
                    l = $("#idRotaEtapaUsuario_" + i).val(),
                    c = 0;
                if ($(".cx_" + i).find(".the_insertedMedia").each(function() {
                        c++
                    }), c -= 1, 0 == c) {
                    e.closest(".etapa_info_" + i).prev().children(":first").find(".sprite_player.bolConcluidoPlaca");
                    $("#etapa_info_" + i).removeClass("concluido"), salvarCaminhoEtapaUsuario(l, t, i, r, s, !1, "normal", "sim")
                }
            }
            $("#msg_aviso").remove(), carregaArquivosCaminho(l)
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir material de apoio!")
        }
    })
}

function inserirRecurso(a, o) {
    var e = $("#bolEdicao").val(),
        i = $("#idCaminho").val(),
        t = $("#intEtapa").val(),
        r = $("#idEtapa").val();
    e ? $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecurso/",
        data: {
            idCaminho: i,
            idEtapa: r,
            intEtapa: t,
            idRecurso: a,
            idPublicacao: o,
            idAvaliacao: 0
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            editarEtapa(r, t)
        },
        error: function(a) {
            0 != a.status && console.debug("Erro ao salvar recurso!")
        }
    }) : ($(".busca_recurso").remove(), $("#recursoitem_ava").css("display", "none"), $("#mostraPaginas").hide(), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecurso/",
        data: {
            idCaminho: i,
            idEtapa: 0,
            intEtapa: t,
            idRecurso: a,
            idPublicacao: o,
            idAvaliacao: 0
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#recursoescolhido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", ""), $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaRecursoEscolhido/",
                data: {
                    idRecursoEtapa: a,
                    idAvaliacao: 0
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(o) {
                    $("#recursoescolhido").html(o), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/TerminaEdicaoEtapa/",
                        data: {
                            idRecursoEtapa: a
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(o) {
                            $("#camposEtapa").html(o).css("display", ""), $("#tituloetapa").limit("100", "#tituloLimite"), $(".ph").addPlaceholder(), carregaTiny(), $("#listaconteudo_caminho").delegate("#tituloetapa", "keyup", function() {
                                "" == $(this).val() ? strHTMLTitulo = "Título<span class='seta_etapa'></span>" : (strHTMLTitulo = $("<div />").text($(this).val()).html(), strHTMLTitulo += "<span class='seta_etapa'></span>"), $(".atual").children(":first").html(strHTMLTitulo)
                            }), $("#tituloetapa").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#im_entrega").click(function() {
                                this.checked ? $("#obsEntrega").removeAttr("disabled") : ($("#obsEntrega").attr("disabled", "disabled"), $("#obsEntrega").val(""))
                            }), $("#strTituloLink").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#strUrl").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#valeNota").click(function() {
                                this.checked ? $("#intValorEtapa").removeAttr("disabled") : ($("#intValorEtapa").attr("disabled", "disabled"), $("#intValorEtapa").removeClass("ava_field_alert"))
                            }), $("#intValorEtapa").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#intValorEtapa").digitosDouble(), $("#toggle_midia").toggle(function() {
                                $("#sobedesce_midia").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_midia").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_entrega").toggle(function() {
                                $("#sobedesce_entrega").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_entrega").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_link").toggle(function() {
                                $("#sobedesce_link").slideDown(function() {
                                    $("#strTituloLink,#strLinkApoio").focus(function() {
                                        $(this).removeClass("ava_field_alert"), $("#strTituloLink").limit("100", ""), retornaLinksApoio(a)
                                    })
                                }), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_link").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_material").toggle(function() {
                                $(".sobedesce_material").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $(".sobedesce_material").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_codigoLivro").toggle(function() {
                                $(".sobedesce_codigoLivro").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $(".sobedesce_codigoLivro").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), montarNavegacaoEtapas(0, i, t), $("#btnAvancarCaminho").attr("onClick", "avancarConclusao(" + i + ")"), $("#btnAvancarCaminho").removeClass("disable")
                        },
                        error: function(a) {
                            0 != a.status && console.debug("erro ao terminar edição etapa!")
                        }
                    })
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao listar recurso escolhido!")
                }
            })
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao salvar recurso")
        }
    }))
}

function incluirAvaliacao(a) {
    var o = ($("#bolEdicao").val(), $("#idCaminho").val()),
        e = $("#intEtapa").val(),
        i = $("#idEtapa").val(),
        t = 1;
    ("" == i || void 0 == i) && (i = 0), $("#recursoitem_ava").css("display", "none"), $(".busca_recurso").css("display", "none"), $("#linha_filtro").css("display", "none"), $("#linha_header_tbl").css("display", "none"), $("#recurso_ava").css("display", "none"), $(".ava_ativtable table").css("display", "none"), $("#idAvaliacao").val(a), $("#recursoescolhido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", ""), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecurso/",
        data: {
            idCaminho: o,
            idEtapa: i,
            intEtapa: e,
            idRecurso: t,
            idPublicacao: 0,
            idAvaliacao: a
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(i) {
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaRecursoEscolhido/",
                data: {
                    idRecursoEtapa: i,
                    idAvaliacao: a
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(a) {
                    $("#recursoescolhido").html(a).addClass("ava_ativtable"), $("#camposEtapa").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", ""), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/TerminaEdicaoEtapa/",
                        data: {
                            idRecursoEtapa: i
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(a) {
                            $("#tituloetapa").limit("100", "#tituloLimite"), $("#listaconteudo_caminho").delegate("#tituloetapa", "keyup", function() {
                                "" == $(this).val() ? strHTMLTitulo = "Título<span class='seta_etapa'></span>" : (strHTMLTitulo = $("<div />").text($(this).val()).html(), strHTMLTitulo += "<span class='seta_etapa'></span>"), $(".atual").children(":first").html(strHTMLTitulo)
                            }), $("#valeNota").click(function() {
                                this.checked ? $("#intValorEtapa").removeAttr("disabled") : $("#intValorEtapa").attr("disabled", "disabled")
                            }), $("#intValorEtapa").focus(function() {
                                $(this).css("background-color", "")
                            }), $("#intValorEtapa").digitosDouble(), $("#camposEtapa").html(a), montarNavegacaoEtapas(0, o, e), $(".ph").addPlaceholder(), $("#toggle_midia").toggle(function() {
                                $("#sobedesce_midia").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_midia").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_entrega").toggle(function() {
                                $("#sobedesce_entrega").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_entrega").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_link").toggle(function() {
                                $("#sobedesce_link").slideDown(function() {
                                    $("#strTituloLink,#strLinkApoio").focus(function() {
                                        $(this).removeClass("ava_field_alert"), $("#strTituloLink").limit("100", ""), retornaLinksApoio(i)
                                    })
                                }), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $("#sobedesce_link").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_material").toggle(function() {
                                $(".sobedesce_material").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $(".sobedesce_material").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_codigoLivro").toggle(function() {
                                $(".sobedesce_codigoLivro").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $(".sobedesce_codigoLivro").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#btnAvancarCaminho").attr("onClick", "avancarConclusao(" + o + ")"), $("#btnAvancarCaminho").removeClass("disable")
                        },
                        error: function(a) {
                            0 != a.status && console.debug("erro ao terminar edição etapa!")
                        }
                    })
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao listar recurso escolhido")
                }
            })
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao salvar recurso")
        }
    })
}

function montarNavegacaoEtapas(a, o, e) {
    $("#nav_etapas").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/CarregaNavegacaoEtapa/",
        data: {
            idEtapa: a,
            idCaminho: o
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#nav_etapas").html(a), $(".ne-numeros").removeClass("ativo"), $("#" + e).addClass("ativo"), $(".b_tooltip_center").each(function() {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: !0,
                    events: {
                        def: "mouseover, mouseout"
                    }
                })
            })
        },
        error: function(a) {
            0 == a.status ? $("#nav_etapas").empty() : $("#nav_etapas").html("erro ao montar navegação das etapas!")
        }
    })
}

function avancarConclusao(a) {
    salvarEtapa(!0, !0)
}

function editarEtapa(a, o) {
    $(".step_caminhos").children(":first").removeClass("caminho_atual"), $(".step_etapas").children(":first").addClass("caminho_atual"), $(".step_conclusao").children(":first").removeClass("caminho_atual"), $(".busca_recurso").remove();
    var e = $("#idCaminho").val();
    $("#listaconteudo_caminho").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        url: "/AVA/Caminhos/Home/RetornaRecursoEtapa/" + a,
        success: function(i) {
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaEdicaoRecursoEscolhido/",
                data: {
                    idRecursoEtapa: i,
                    intEtapa: o
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(t) {
                    $("#listaconteudo_caminho").html(t), $(".b_tooltip_center").each(function() {
                        $(this).tooltip({
                            offset: [0, 0],
                            opacity: 1,
                            position: "top center",
                            effect: "slide",
                            relative: !0,
                            events: {
                                def: "click, mouseout"
                            }
                        })
                    }), $("#btnCancelarCaminho").html("Voltar para dados do caminho<span class='awe_icons'></span>"), $("#btnCancelarCaminho").attr("onclick", "editar(" + e + ")"), $("#btnCancelarCaminho").addClass("c-voltar"), $("#btnCancelarCaminho").removeClass("c-cancelar"), $("#ava_barralateral-direita").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/RetornaRotaByIdEtapa/" + a,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(a) {
                            $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/MostraPreview/?id=" + a + "&bolEtapa=true&intEtapa=" + o,
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function(o) {
                                    $("#ava_barralateral-direita").html(o), $("#btnAvancarCaminho").attr("onClick", "avancarConclusao(" + a + ")"), $("#bt_verMaisDescRota").toggle(function() {
                                        $("html, body").animate({
                                            scrollTop: $(".placa_verde").offset().top
                                        }, 1e3), $(this).html("veja menos"), $("#caminhoDescr").css("display", "none"), $("#caminhoDescrCompleto").css("display", "")
                                    }, function() {
                                        $("html, body").animate({
                                            scrollTop: $(".placa_verde").offset().top
                                        }, 1e3), $(this).html("veja mais"), $("#caminhoDescr").css("display", ""), $("#caminhoDescrCompleto").css("display", "none")
                                    })
                                },
                                error: function(a) {
                                    0 == a.status ? $("#ava_barralateral-direita").empty() : $("#ava_barralateral-direita").html("erro ao montar preview!")
                                }
                            })
                        },
                        error: function(a) {
                            0 == a.status ? $("#ava_barralateral-direita").empty() : $("#ava_barralateral-direita").html("erro ao buscar rota do preview!")
                        }
                    }), $("#camposEtapa").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/EditarEtapa/" + a,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(e) {
                            $("#camposEtapa").html(e), $("#tituloetapa").limit("100", "#tituloLimite"), $(".ph").addPlaceholder(), "False" == $("#bolAvaliacao").val() && carregaTiny(), $("#listaconteudo_caminho").delegate("#tituloetapa", "keyup", function() {
                                "" == $(this).val() ? strHTMLTitulo = "Título<span class='seta_etapa'></span>" : (strHTMLTitulo = $("<div />").text($(this).val()).html(), strHTMLTitulo += "<span class='seta_etapa'></span>"), $(".atual").children(":first").html(strHTMLTitulo)
                            }), $("#tituloetapa").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#im_entrega").click(function() {
                                this.checked ? $("#obsEntrega").removeAttr("disabled") : ($("#obsEntrega").attr("disabled", "disabled"), $("#obsEntrega").val(""))
                            }), $("#strTituloLink").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#strUrl").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $("#valeNota").click(function() {
                                this.checked ? $("#intValorEtapa").removeAttr("disabled") : ($("#intValorEtapa").attr("disabled", "disabled"), $("#intValorEtapa").removeClass("ava_field_alert"))
                            }), $("#intValorEtapa").digitosDouble(), $("#intValorEtapa").focus(function() {
                                $(this).removeClass("ava_field_alert")
                            }), $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/VerificaRecursoLink/",
                                data: {
                                    idEtapa: a
                                },
                                success: function(a) {
                                    a > 0 ? ($("#sobedesce_link").slideDown(), $("#toggle_link").find(".up_down").html("&#9650;"), retornaLinksApoio(i), $("#toggle_link").toggle(function() {
                                        $("#sobedesce_link").slideUp(), $(this).find(".up_down").html("&#9660;")
                                    }, function() {
                                        $("#sobedesce_link").slideDown(function() {
                                            $("#strTituloLink,#strLinkApoio").focus(function() {
                                                $(this).removeClass("ava_field_alert"), $("#strTituloLink").limit("100", ""), retornaLinksApoio(i)
                                            })
                                        }), $(this).find(".up_down").html("&#9650;")
                                    })) : $("#toggle_link").toggle(function() {
                                        $("#sobedesce_link").slideDown(function() {
                                            $("#strTituloLink,#strLinkApoio").focus(function() {
                                                $(this).removeClass("ava_field_alert"), $("#strTituloLink").limit("100", ""), retornaLinksApoio(i)
                                            })
                                        }), $(this).find(".up_down").html("&#9650;")
                                    }, function() {
                                        $("#sobedesce_link").slideUp(), $(this).find(".up_down").html("&#9660;")
                                    })
                                },
                                error: function(a) {
                                    0 != a.status && console.debug("erro ao verificar links!")
                                }
                            }), $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/VerificaRecursoEntrega/",
                                data: {
                                    idEtapa: a
                                },
                                success: function(a) {
                                    a > 0 ? ($("#sobedesce_entrega").slideDown(), $("#toggle_entrega").find(".up_down").html("&#9650;"), $("#toggle_entrega").toggle(function() {
                                        $("#sobedesce_entrega").slideUp(), $(this).find(".up_down").html("&#9660;")
                                    }, function() {
                                        $("#sobedesce_entrega").slideDown(), $(this).find(".up_down").html("&#9650;")
                                    })) : $("#toggle_entrega").toggle(function() {
                                        $("#sobedesce_entrega").slideDown(), $(this).find(".up_down").html("&#9650;")
                                    }, function() {
                                        $("#sobedesce_entrega").slideUp(), $(this).find(".up_down").html("&#9660;")
                                    })
                                },
                                error: function(a) {
                                    0 != a.status && console.debug("erro ao verificar entrega!")
                                }
                            }), $.ajax({
                                type: "POST",
                                url: "/AVA/Caminhos/Home/VerificaRecursoMidia/",
                                data: {
                                    idEtapa: a
                                },
                                success: function(a) {
                                    a > 0 ? ($("#sobedesce_midia").slideDown(), $("#toggle_midia").find(".up_down").html("&#9650;"), $("#toggle_midia").toggle(function() {
                                        $("#sobedesce_midia").slideUp(), $(this).find(".up_down").html("&#9660;")
                                    }, function() {
                                        $("#sobedesce_midia").slideDown(), $(this).find(".up_down").html("&#9650;")
                                    })) : $("#toggle_midia").toggle(function() {
                                        $("#sobedesce_midia").slideDown(), $(this).find(".up_down").html("&#9650;")
                                    }, function() {
                                        $("#sobedesce_midia").slideUp(), $(this).find(".up_down").html("&#9660;")
                                    })
                                },
                                error: function(a) {
                                    0 != a.status && console.debug("erro ao verificar midia!")
                                }
                            }), $("#toggle_material").toggle(function() {
                                $(".sobedesce_material").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $(".sobedesce_material").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), $("#toggle_codigoLivro").toggle(function() {
                                $(".sobedesce_codigoLivro").slideDown(), $(this).find(".up_down").html("&#9650;")
                            }, function() {
                                $(".sobedesce_codigoLivro").slideUp(), $(this).find(".up_down").html("&#9660;")
                            }), montarNavegacaoEtapas(a, 0, o)
                        },
                        error: function(a) {
                            0 == a.status ? $("#camposEtapa").empty() : $("#camposEtapa").html("erro ao listar edição da etapa!")
                        }
                    })
                },
                error: function(a) {
                    0 == a.status ? $("#listaconteudo_caminho").empty() : $("#listaconteudo_caminho").html("erro ao listar recurso escolhido!")
                }
            })
        },
        error: function(a) {
            0 == a.status ? $("#listaconteudo_caminho").empty() : $("#listaconteudo_caminho").html("erro ao buscar recurso etapa")
        }
    })
}

function alteraPreviewMidia() {
    $("#strUrl").val("").removeAttr("disabled"), $("#sobedesce_midia .midiaEtapa_educador").hide(), $("#sobedesce_midia a").addClass("awesome-green"), $("#sobedesce_midia a").html("Inserir"), $("#sobedesce_midia a").attr("onclick", "montaPreviewMidia()")
}

function montaPreviewMidia() {
    
    console.log('SSSASA');
    var a = 0,
        o = "",
        e = "";
    if (void 0 == $("#strUrl").val() || "" == $("#strUrl").val()) return $("#strUrl").addClass("ava_field_alert"), $("html, body").animate({
        scrollTop: $("#anc_strURL").offset().top
    }, 1e3), !1;
    $("#sobedesce_midia .midiaEtapa_educador").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), strLinkVideo = $("#strUrl").val(), -1 == strLinkVideo.indexOf("http://") && -1 == strLinkVideo.indexOf("https://") && (strLinkVideo = "http://" + strLinkVideo, $("#strUrl").val(strLinkVideo)), (strLinkVideo.indexOf("#t=") > 1 || strLinkVideo.indexOf("&t=") > 1 || strLinkVideo.indexOf("&amp;t=") > 1) && (e = strLinkVideo.split("t="), e.length > 0 ? (strLinkVideo = e[0].substring(0, e[0].length - 1), e = e[1]) : e = "");
    var i = retornaMatchVideo(strLinkVideo);
    i ? i.always(function() {
        if (bolVideoProibido && "" == strTipoVideo) return mostraAlertaEtapa("Este vídeo tem sua incorporação proibida pelo seu proprietário e não pode ser inserido."), bolVideoProibido = !1, strTipoVideo = "", $("#sobedesce_midia .midiaEtapa_educador").html("URL inválida ou vídeo não encontrado!"), $("#sobedesce_midia .midiaEtapa_educador").show(), $("#strUrl").attr("disabled", "disabled"), $("#sobedesce_midia a").removeClass("awesome-green"), $("#sobedesce_midia a").html("Alterar"), $("#sobedesce_midia a").attr("onclick", "alteraPreviewMidia()"), !1;
        var i = validarURL(strLinkVideo);
        if ("" != e && (strLinkVideo += "#t=" + e), "youtubeEncurtado" == i) a = 1, o = strLinkVideo.substring(strLinkVideo.indexOf("be/") + 3, strLinkVideo.length);
        else if ("youtube" == i) a = 1, o = strLinkVideo.indexOf("&") > 0 ? strLinkVideo.substring(strLinkVideo.indexOf("v=") + 2, strLinkVideo.indexOf("&")) : strLinkVideo.indexOf("/v/") > 0 ? strLinkVideo.substring(strLinkVideo.indexOf("/v/") + 3, strLinkVideo.length) : strLinkVideo.substring(strLinkVideo.indexOf("v=") + 2, strLinkVideo.length);
        else if ("vimeo" == i) a = 2, o = strLinkVideo.substring(strLinkVideo.indexOf("vimeo.com/") + 10, strLinkVideo.length);
        else {
            if ("globo" != i) return $("#sobedesce_midia .midiaEtapa_educador").html("URL inválida ou vídeo não encontrado!"), !1;
            a = 3;
            var t = strLinkVideo.split("/");
            o = t[t.length - 2]
        }
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaPreviewMidia/",
            data: {
                tipoVideo: a,
                idMidia: o
            },
            success: function(a) {
                $("#sobedesce_midia .midiaEtapa_educador").html(a), $("#sobedesce_midia .midiaEtapa_educador").show(), $("#strUrl").attr("disabled", "disabled"), $("#sobedesce_midia a").removeClass("awesome-green"), $("#sobedesce_midia a").html("Alterar"), $("#sobedesce_midia a").attr("onclick", "alteraPreviewMidia()"), $(".iframeVideoVimeo", ".midiaEtapa_educador").on("load", function() {
                    var a = $f(this),
                        o = !1;
                    a.api("pause"), a.addEvent("ready", function() {
                        a.addEvent("play", function() {
                            o || (o = !0, a.api("pause"))
                        })
                    })
                })
            },
            error: function(a) {
                0 == a.status ? $("#sobedesce_midia .midiaEtapa_educador").empty() : $("#sobedesce_midia .midiaEtapa_educador").html("erro ao mostrar preview da mídia!")
            }
        })
    }) : (mostraAlertaEtapa("URL inserida não é válida."), bolVideoProibido = !1, strTipoVideo = "", $("#sobedesce_midia .midiaEtapa_educador").html("URL inválida ou vídeo não encontrado!"), $("#sobedesce_midia .midiaEtapa_educador").show(), $("#strUrl").attr("disabled", "disabled"), $("#sobedesce_midia a").removeClass("awesome-green"), $("#sobedesce_midia a").html("Alterar"), $("#sobedesce_midia a").attr("onclick", "alteraPreviewMidia()"))
}

function adicionarEtapa(a) {
    salvarEtapa(!1, !1) && criarEtapa(a)
}

function criarEtapa(a) {
    $(".step_caminhos").children(":first").removeClass("caminho_atual"), $(".step_conclusao").children(":first").removeClass("caminho_atual"), $(".step_etapas").children(":first").addClass("caminho_atual"), $("#listaconteudo_caminho").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        url: "/AVA/Caminhos/Home/CriarEtapa/" + a,
        success: function(o) {
            $("#listaconteudo_caminho").html(o), $("#listaconteudo_caminho #idCaminho").val(a), $("#btnAvancarCaminho").addClass("disable"), $("#btnAvancarCaminho").removeAttr("onclick"), $("#btnCancelarCaminho").html("Voltar para dados do caminho<span class='awe_icons'></span>"), $("#btnCancelarCaminho").attr("onclick", "editar(" + a + ")"), $("#btnCancelarCaminho").addClass("c-voltar"), $("#btnCancelarCaminho").removeClass("c-cancelar"), carregaTiny(), $(".r-box").mouseenter(function() {
                var a = $(this).children(":first");
                a.fadeIn("fast")
            }), $(".r-s-desc").mouseleave(function() {
                $(this).fadeOut("fast")
            }), $(".cover").mosaic({
                animation: "slide",
                speed: 500,
                hover_x: "400px"
            }), $("#tituloetapa").limit("100", "#tituloLimite"), $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/MostraPreview/?id=" + a + "&bolEtapa=true",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(a) {
                    $("#ava_barralateral-direita").html(a), $("#recurso_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
                        url: "/AVA/Caminhos/Home/RetornaRecurso/?idCategoria=-999",
                        success: function(a) {
                            $("#recurso_ava").html(a)
                        },
                        error: function(a) {
                            0 == a.status ? $("#recurso_ava").empty() : $("#recurso_ava").html("erro ao listar os recursos")
                        }
                    }), $("#bt_verMaisDescRota").toggle(function() {
                        $("html, body").animate({
                            scrollTop: $(".placa_verde").offset().top
                        }, 1e3), $(this).html("veja menos"), $("#caminhoDescr").css("display", "none"), $("#caminhoDescrCompleto").css("display", "")
                    }, function() {
                        $("html, body").animate({
                            scrollTop: $(".placa_verde").offset().top
                        }, 1e3), $(this).html("veja mais"), $("#caminhoDescr").css("display", ""), $("#caminhoDescrCompleto").css("display", "none")
                    })
                },
                error: function(a) {
                    0 == a.status ? $("#ava_barralateral-direita").empty() : $("#ava_barralateral-direita").html("erro ao montar preview!")
                }
            })
        },
        error: function(a) {
            0 == a.status ? $("#listaconteudo_caminho").empty() : $("#listaconteudo_caminho").html("erro ao carregar etapa")
        }
    })
}

function inserirLinkApoio() {
    var a = $("#strTituloLink").val(),
        o = $("#strLinkApoio").val();
    if ("" == a) return $("#strTituloLink").addClass("ava_field_alert"), $("html, body").animate({
        scrollTop: $("#anc_linkApoio").offset().top
    }, 1e3), !1;
    if ("" == o) return $("#strLinkApoio").addClass("ava_field_alert"), $("html, body").animate({
        scrollTop: $("#anc_linkApoio").offset().top
    }, 1e3), !1;
    o.indexOf("http") < 0 && o.indexOf("https") < 0 && (o = "http://" + o);
    var e = /^(http[s]?:\/\/)?(www\.)?[a-zA-Z0-9-\.]+\.(com|org|net|mil|edu|ca|co.uk|com.au|gov|br)/,
        i = e.exec(o);
    if (!i) return mostraAlertaEtapa("URL inserida não é válida."), !1;
    if (o.indexOf(".exe") > 0) return mostraAlertaEtapa("URL inserida não é válida."), !1;
    var t = $("#idRecursoEtapa").val();
    $("#idEtapa").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarLinkApoio/",
        data: {
            idRecursoEtapa: t,
            strTitulo: a,
            strLink: o
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            retornaLinksApoio(t), $("#strTituloLink").val(""), $("#strLinkApoio").val("")
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao salvar etapa!")
        }
    })
}

function retornaLinksApoio(a) {
    $("#sobedesce_link").find("div.container_inlinks").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SelecionarLinksEtapa/",
        data: {
            idRecursoEtapa: a
        },
        success: function(a) {
            $("#sobedesce_link").find("div.container_inlinks").html(a)
        },
        error: function(a) {
            0 == a.status ? $("#sobedesce_link").find("div.container_inlinks").empty() : $("#sobedesce_link").find("div.container_inlinks").html("erro ao buscar links inseridos!")
        }
    })
}

function removerLinkApoio(a) {
    if (location.href.toLowerCase().indexOf("criartarefa") >= 0) $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirLinkApoio/",
        data: {
            idLink: a
        },
        success: function(a) {
            retornaLinksApoioTarefa($("#idRecursoEtapa").val())
        },
        error: function(a) {
            0 == a.status ? $(".container_inlinks").empty() : $(".container_inlinks").html("erro ao excluir link.")
        }
    });
    else {
        var o = ($("#idEtapa").val(), $("#idRecursoEtapa").val());
        $("#sobedesce_link").find("div.container_inlinks").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ExcluirLinkApoio/",
            data: {
                idLink: a
            },
            success: function(a) {
                retornaLinksApoio(o)
            },
            error: function(a) {
                0 == a.status ? $("#sobedesce_link").find("div.container_inlinks").empty() : $("#sobedesce_link").find("div.container_inlinks").html("erro ao buscar links inseridos!")
            }
        })
    }
}

function validarURL(a) {
    var o = "",
        e = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        i = e.exec(a);
    if ("" == a) return $("#strUrl").addClass("ava_field_alert"), $("html, body").animate({
        scrollTop: $("#anc_strURL").offset().top
    }, 1e3), !1;
    if (!i || "" == strTipoVideo) return mostraAlertaEtapa("URL inserida não é válida."), $("#sobedesce_midia .midiaEtapa_educador").html("URL inválida ou vídeo não encontrado!"), $("#sobedesce_midia .midiaEtapa_educador").show(), $("#strUrl").attr("disabled", "disabled"), $("#sobedesce_midia a").removeClass("awesome-green"), $("#sobedesce_midia a").html("Alterar"), $("#sobedesce_midia a").attr("onclick", "alteraPreviewMidia()"), !1;
    if (a.indexOf("//youtu.be") > 0) o = "youtubeEncurtado";
    else if (a.indexOf("youtube.com/watch?v=") > 0) o = "youtube";
    else if (a.indexOf("youtube.com/v/") > 0) o = "youtube";
    else if (a.indexOf("vimeo.com/") > 0) o = "vimeo";
    else if (a.indexOf("video.globo.com/") > 0) {
        if (!(a.indexOf("GIM") > 0)) return mostraAlertaEtapa("URL da globo falta o parâmetro ID."), !1;
        o = "globo"
    } else {
        if (!(a.indexOf("globotv.globo.com/") > 0)) return mostraAlertaEtapa("URL inserida não é válida."), !1;
        var t, r = a.split("/");
        if (t = "/" == a.substring(a.length - 1, a.length) ? 2 : 1, isNaN(r[r.length - t])) return mostraAlertaEtapa("URL da globo falta o parâmetro ID."), !1;
        o = "globo"
    }
    return o
}

function mostraAlertaEtapa(a) {
    $.fancybox({
        href: "/ava/caminhos/home/Alert/?strMensagem=" + escape(a),
        autoSize: !1,
        width: 400,
        height: 100,
        autoResize: !1,
        fitToView: !1,
        type: "ajax",
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        afterShow: function() {
            $("#fecharLightBox").click(function() {
                $.fancybox.close()
            })
        }
    })
}

function salvarEtapa(a, o) {
    var e = $("#bolAvaliacao").val();
    ("False" == e || "false" == e) && tinyMCE.triggerSave(), $titulo = $("#tituloetapa").val(), $descricao = $(".txtDescricaoEtapa").val(), $idCaminho = $("#idCaminho").val(), $intEtapa = $("#intEtapa").val(), $idEtapa = $("#idEtapa").val();
    var i = 0,
        t = "",
        r = "",
        n = "";
    if (void 0 != $("#strUrl").val() && $("#strUrl").val().indexOf("youtu") > -1 && (strTipoVideo = "youtube"), void 0 != $("#strUrl").val() && "" != $("#strUrl").val() && "Insira a URL" != $("#strUrl").val()) {
        r = $("#strUrl").val();
        var s = validarURL(r);
        if ("youtubeEncurtado" == s) i = 1, t = r.substring(r.indexOf("be/") + 3, r.length);
        else if ("youtube" == s) i = 1, t = r.indexOf("&") > 0 ? r.substring(r.indexOf("v=") + 2, r.indexOf("&")) : r.indexOf("/v/") > 0 ? r.substring(r.indexOf("/v/") + 3, r.length) : r.substring(r.indexOf("v=") + 2, r.length);
        else if ("vimeo" == s) i = 2, t = r.substring(r.indexOf("vimeo.com/") + 10, r.length);
        else {
            if ("globo" != s) return !1;
            i = 3;
            var l = r.split("/");
            t = l[l.length - 2]
        }
    }
    var c = !1;
    if ($("#im_entrega").attr("checked") && (c = !0, n = "Escreva aqui uma orientação para os alunos" == $("#obsEntrega").val() ? "" : $("#obsEntrega").val()), "" == $titulo || "Escreva aqui um título para a sua etapa" == $titulo) return $("#tituloetapa").addClass("ava_field_alert"), $("html, body").animate({
        scrollTop: $("#anc_titEtapa").offset().top - 60
    }, 1e3), !1;
    var d = $titulo.replace(/<script/gi, "&lt;script").replace(/<\/script/gi, "&lt;/script");
    if (strHTMLTitulo = d + "<span class='seta_etapa'></span>", $(".atual").children(":first").html(strHTMLTitulo), $("#valeNota").attr("checked")) {
        if ($intValorEtapa = $("#intValorEtapa").val(), "" == $intValorEtapa) return $("html, body").animate({
            scrollTop: $("#intValorEtapa").offset().top
        }, 1e3), $("#intValorEtapa").addClass("ava_field_alert"), !1
    } else $intValorEtapa = 0;
    var u = new Array,
        m = arrayArquivosUpload;
    if (void 0 == m || "" == m || null == m) {
        m = "";
        var p = null
    } else {
        for (var v = 0; v < m.arrayArquivo.length; v++) u.push(m.arrayArquivo[v].id);
        var p = {
            idFerramentaTipo: m.idFerramentaTipo,
            idFerramenta: m.idFerramenta,
            arquivos: u
        }
    }
    $("#btSalvarEtapaSpan").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Salvando...");
    var h, f = $("#paginacaoCM"),
        g = f.find("option:selected");
    if (void 0 !== f) {
        var _ = g.attr("pordem"),
            A = g.attr("sordem");
        h = {
            idEtapa: $idEtapa,
            idCaminho: $idCaminho,
            intEtapa: $intEtapa,
            strEtapa: $titulo,
            strDescricao: $descricao,
            intValor: $intValorEtapa,
            idMidia: t,
            idTipoMidia: i,
            strLinkMidia: r,
            bolEntrega: c,
            strObsEntrega: n,
            intOrdem: _,
            intOrdem2: A,
            json: JSON.stringify(p)
        }
    } else h = {
        idEtapa: $idEtapa,
        idCaminho: $idCaminho,
        intEtapa: $intEtapa,
        strEtapa: $titulo,
        strDescricao: $descricao,
        intValor: $intValorEtapa,
        idMidia: t,
        idTipoMidia: i,
        strLinkMidia: r,
        bolEntrega: c,
        strObsEntrega: n,
        json: JSON.stringify(p)
    };
    return $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarEtapa/",
        data: h,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(e) {
            arrayArquivosUpload = null, $("#btSalvarEtapaSpan").html('<a href="javascript: void(0);" class="ne-salvar large awesome awesome-green" id="btSalvarEtapa" onclick="salvarEtapa(false,true)">salvar</a>'), a && (window.location.href = "/ava/caminhos/home/concluir/" + $idCaminho), o && (0 == $("#nav_etapas .atividade_salva").length ? ($("#nav_etapas").append('<div class="clearfix"></div><br /><div class="atividade_salva right">Seu caminho foi salvo com sucesso!</div>'), $(".atividade_salva").delay(2e3).fadeOut("slow")) : ($(".atividade_salva").show(), $("#nav_etapas .atividade_salva").html("Seu caminho foi salvo com sucesso!"), $(".atividade_salva").delay(2e3).fadeOut("slow")))
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao salvar etapa!")
        }
    }), !0
}

function excluirEtapa() {
    $("#btExcluirEtapa").attr("disabled", "disabled"), $idCaminho = $("#idCaminho").val(), $idEtapa = $("#idEtapa").val(), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + $idEtapa,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            window.location.href = "/ava/caminhos/home/criar/" + $idCaminho
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir etapa!")
        }
    })
}

function excluirEtapaConclusao(a, o) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirEtapa/" + a,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function() {
            window.location.href = "/ava/caminhos/home/concluir/" + o
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir etapa!")
        }
    })
}

function excluirRota(a, o) {
    o ? $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirRota/" + a,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function() {
            window.location.href = "/ava/caminhos/home/index/2"
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir caminho!")
        }
    }) : $("#tooltipExc_" + a).css("display", "none")
}

function agendar(a) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/VerificaSeTemTurma",
        success: function(o) {
            "ok" != o ? (strMensagem = "Você não tem turmas associadas. <br>Entre em contato com a secretaria da sua escola.", $.fancybox({
                href: "/ava/caminhos/home/Alert/?strMensagem=" + escape(strMensagem),
                autoSize: !1,
                width: 450,
                height: 100,
                autoResize: !1,
                fitToView: !1,
                type: "ajax",
                helpers: {
                    overlay: {
                        closeClick: !1,
                        locked: !1
                    }
                },
                afterShow: function() {
                    $("#fecharLightBox").click(function() {
                        $.fancybox.close()
                    })
                }
            })) : ($("#ancora_agendamento").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", "block"), $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/Agendar/" + a,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(a) {
                    $("#ancora_agendamento").html(a), $("#dataInicio").setMask("date"), $("#dataFim").setMask("date"), $("#horaInicio").setMask("29:59").timepicker({
                        myPosition: "right top",
                        atPosition: "right bottom",
                        onSelect: atualizaHoraInicio
                    }), $("#horaFim").setMask("29:59").timepicker({
                        myPosition: "right top",
                        atPosition: "right bottom",
                        onSelect: atualizaHoraFim
                    }), montaCampoData("#dataInicio", "#dataFim"), $("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function() {
                        $(this).removeClass("ava_field_alert")
                    }), $("#horaInicio").keyup(function() {
                        $("#dInicio").text($("#dataInicio").val() + " " + $(this).val())
                    }), $("#horaFim").keyup(function() {
                        $("#dFim").text($("#dataFim").val() + " " + $(this).val())
                    }), $("#btnAgendarConclusao").removeAttr("onclick"), $("#btnAgendarConclusao").addClass("disable"), loadSeletor("#seletorTarefa"), $("html, body").animate({
                        scrollTop: $("#ancora_agendamento").offset().top - 60
                    }, 1e3)
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao carregar agendamento")
                }
            }))
        },
        error: function() {
            strMensagem = "erro"
        }
    })
}

function atualizaHoraInicio() {
    $("#dInicio").text($("#dataInicio").val() + " " + $("#horaInicio").val())
}

function atualizaHoraFim() {
    $("#dFim").text($("#dataFim").val() + " " + $("#horaFim").val())
}

function irParaConclusao(a) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/VerificaSeTemTurma",
        success: function(o) {
            if ("ok" != o) {
                strMensagem = "Você não tem turmas associadas. <br>Entre em contato com a secretaria da sua escola.";
                var e = $("#btEscondidoAgendamento_" + a),
                    i = {
                        href: "/ava/caminhos/home/Alert/?strMensagem=" + escape(strMensagem),
                        autoSize: !1,
                        width: 450,
                        height: 100,
                        autoResize: !1,
                        fitToView: !1,
                        type: "ajax",
                        helpers: {
                            overlay: {
                                closeClick: !1,
                                locked: !1
                            }
                        },
                        afterShow: function() {
                            $("#fecharLightBox").click(function() {
                                $.fancybox.close()
                            })
                        }
                    };
                lightBoxAVA(e, i), $("#btEscondidoAgendamento_" + a).click()
            } else window.location.href = "/ava/caminhos/home/concluir/" + a
        }
    })
}

var usuariosArrayTeste = [];



function concluirAgendamento(a, o) {

    if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) return $("#seletorTarefa").AvaSelector("focus"), alert("Adicione pessoas para agendar"), !1;
    var dataInicio = $("#dataInicio").val();
    var dataFim = $("#dataFim").val();
    var horaFim = $("#horaFim").val();
    var horasemTratamento = $("#horaInicio").val();
    var minutosServ = $("#minutosServidor").val();
    var array = horasemTratamento.split(":");
    var horas = array[0];
    var minutos = array[1];
    var intMinServidor = parseInt(minutosServ);
    var minutosInt = parseInt(array[1]) + 1;
    var MinutoString = minutosInt.toString();

    var arrayofUsers = [];
    //Adicionar no array de usuários....
    if(arrayUsuariosAux.length <= 0) {
        var arrayofUsers = arrayGrupoAux[0].usuarios ;    
    } else {
        var arrayofUsers = arrayUsuariosAux ;    
    }

    //var arrayofUsers = arrayGrupoAux[0].usuarios ;

    arrayofUsers.map(  function(elem ){


        var u = {

            "idUsuario":0,
            "strFoto":"",
            "strNome":"",
            "strApelido":"",
            "idTurma":0
        }

        u.idUsuario = elem.idUsuario;
        u.strFoto = elem.strFoto;
        u.strNome = elem.strNome;
        u.strApelido = elem.strApelido;
        u.idTurma = elem.idTurma;

        arrayUsuariosAux.push( u  );

    });

    arrayGrupoAux = [];

    if(minutos == intMinServidor){
        if(minutosInt<10){
            
            var horaInicio = horas + ":"+ "0"+MinutoString;
        }else{
            
                var horaInicio =  horas + ":"+MinutoString;
        }
    }else{

        var horaInicio = horas + ":" + minutos;
    }

    console.log("Hora Nova: ", horaInicio);
    console.log(" concluirAgendamento == caminhos.js");

    var e = validaAgendamento(dataInicio, dataFim, horaInicio, horaFim),
        i = $("#txtDisponivel").text(),
        t = $("#txtTitulo").text();

    var strComplemento = $("#strComplementoAgendamento").val();

    if ("" == strComplemento) var r = t + ". " + i;
    else var r = strComplemento + "<br>" + t + ". " + i;
    if ($("#txtInput").val(r), "ok" == e) {
        $("#btConcluirAgendamentoSpan").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");
        var n;
        $("#idAvaliacao").val();
        $.ajax({
            type: "POST",
            async: !1,
            url: "/AVA/Caminhos/Home/MontaDestinoAgendamento",
            data: {
                usuario: JSON.stringify(arrayUsuariosAux),
                grupo: JSON.stringify(arrayGrupoAux)
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(e) {
                n = e.split("|");
                var i = "";
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirAgendamento",
                    data: {
                        idRotaAgendamento: a,
                        idCaminho: o,
                        dataInicio: dataInicio,
                        horaInicio: horaInicio,
                        dataFim: dataFim,
                        horaFim: horaFim,
                        strComplemento: strComplemento,
                        usuario: JSON.stringify(arrayUsuariosAux),
                        grupo: JSON.stringify(arrayGrupoAux),
                        strUsuariosDestino: n[0],
                        strTurmasDestino: n[1],
                        idAgendamentoUsuario: 0
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function(e) {
                        return i = e, isNumeric(e) ? void $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
                            data: {
                                usuario: JSON.stringify(arrayUsuariosAux),
                                grupo: JSON.stringify(arrayGrupoAux),
                                idFerramentaTipo: 14,
                                idFerramenta: e,
                                idEtapa: 0,
                                strMensagem: r,
                                dtmCriacao: dataInicio
                            },
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function(a) {
                                var o = "Caminho agendado com sucesso!";
                                $.fancybox({
                                    href: "/ava/caminhos/home/Alert/?strMensagem=" + encodeURI(o),
                                    autoSize: !1,
                                    width: 400,
                                    height: 100,
                                    autoResize: !1,
                                    fitToView: !1,
                                    type: "ajax",
                                    helpers: {
                                        overlay: {
                                            closeClick: !1,
                                            locked: !1
                                        }
                                    },
                                    afterShow: function() {
                                        $("#fecharLightBox").click(function() {
                                            $.fancybox.close(), window.location.href = "/ava/caminhos/home/index/2"
                                        })
                                    },
                                    afterClose: function() {
                                        $.fancybox.close(), window.location.href = "/ava/caminhos/home/index/2"
                                    }
                                }), dataInicio == $("#currentDay").val() || $.ajax({
                                    type: "POST",
                                    url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
                                    data: {
                                        usuario: JSON.stringify(arrayUsuariosAux),
                                        grupo: JSON.stringify(arrayGrupoAux),
                                        idFerramentaTipo: 15,
                                        idFerramenta: e,
                                        idEtapa: 0,
                                        dtmCriacao: dataInicio,
                                        strMensagem: r
                                    },
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    success: function(a) {},
                                    error: function(a) {
                                        alert("erro ao postar alerta agendamento!")
                                    }
                                })
                            },
                            error: function(a) {
                                0 != a.status && console.debug("erro ao postar agendamento!")
                            }
                        }) : ($("#btConcluirAgendamentoSpan").html('<a class="large awesome awesome-color " href="javascript:void(0);" onclick="concluirAgendamento(' + a + "," + o + ');" id="btnConcluirAgendamento"><span></span>Agendar</a>'), $.fancybox({
                            href: "/ava/caminhos/home/Alert/?strMensagem=" + encodeURI(i),
                            autoSize: !1,
                            width: 400,
                            height: 100,
                            autoResize: !1,
                            fitToView: !1,
                            type: "ajax",
                            helpers: {
                                overlay: {
                                    closeClick: !1,
                                    locked: !1
                                }
                            },
                            afterShow: function() {
                                $("#fecharLightBox").click(function() {
                                    $.fancybox.close()
                                })
                            }
                        }), !1)
                    },
                    error: function(a) {
                        0 != a.status && console.debug("erro ao inserir agendamento!")
                    }
                }), passouAgendar = 0
            },
            error: function(a) {
                0 != a.status && console.debug("erro ao montar destino de agendamento!")
            }
        })
    } else {
        if ("erro" == e) return $("#btConcluirAgendamentoSpan").html('<a class="large awesome awesome-color " href="javascript:void(0);" onclick="concluirAgendamento(' + a + "," + o + ');" id="btnConcluirAgendamento"><span></span>Agendar</a>'), !1;
        $.fancybox({
            href: "/ava/caminhos/home/Alert/?strMensagem=" + encodeURI(e),
            autoSize: !1,
            width: 400,
            height: 100,
            autoResize: !1,
            fitToView: !1,
            type: "ajax",
            helpers: {
                overlay: {
                    closeClick: !1,
                    locked: !1
                }
            },
            afterShow: function() {
                $("#fecharLightBox").click(function() {
                    $.fancybox.close()
                })
            }
        })
    }
}

function isNumeric(a) {
    var o = /^[0-9]+$/;
    return o.test(a)
}

function validaAgendamento(dataInicio, dataFim, horaInicio, horaFim) {
    console.log(" validaAgendamento == caminhos.js");
    var t = "ok";
    if ("" == dataInicio) $("#dataInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == dataFim) $("#dataFim").addClass("ava_field_alert"), t = "erro";
    else if ("" == horaInicio) $("#horaInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == horaFim) $("#horaFim").addClass("ava_field_alert"), t = "erro";
    else {
        0 == validaData(dataInicio) ? t = "Data inicial inválida." : 0 == validaData(dataFim) ? t = "Data final inválida." : 0 == validaHora(horaInicio) ? t = "Hora inicial inválida." : 0 == validaHora(horaFim) && (t = "Hora final inválida.");
        var a = dataInicio.split("/"),
            r = a[2] + a[1] + a[0],
            o = dataFim.split("/"),
            n = o[2] + o[1] + o[0],
            e = horaInicio.split(":"),
            s = e[0] + e[1],
            i = horaFim.split(":"),
            l = i[0] + i[1],
            c = new Date;
        c.setFullYear(a[2], a[1] - 1, a[0]), c.setHours(e[0], e[1], 0, 0);
        var d = new Date;
        if (d.setFullYear(o[2], o[1] - 1, o[0]), d.setHours(i[0], i[1], 0, 0), d.getTime() < c.getTime()) t = "Data/Hora final deve ser maior que a inicial";
        else {
            var u = $("#dtmAtualServidor").val().split(" "),
                m = u[0].split("/"),
                p = u[1].split(":"),
                v = m[2] + m[1] + m[0],
                h = p[0] + p[1];
            r > n ? t = "Data inicial tem que ser menor que Data final." : r == v ? (h >= s && (t = "Hora inicial tem que ser maior que a hora atual."), r == n && s >= l && (t = "Hora inicial tem que ser menor que Hora final.")) : v > r ? t = "Data inicial tem que ser maior que a Data atual." : r == n && s >= l && (t = "Hora inicial tem que ser menor que Hora final.")
        }
    }
    return t
}

function validaData(a) {
    var o = a,
        e = new Array,
        i = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    return e = o.split("/"), erro = !1, -1 == o.search(i) ? erro = !0 : (4 == e[1] || 6 == e[1] || 9 == e[1] || 11 == e[1]) && e[0] > 30 ? erro = !0 : 2 == e[1] && (e[0] > 28 && e[2] % 4 != 0 && (erro = !0), e[0] > 29 && e[2] % 4 == 0 && (erro = !0)), erro ? !1 : !0
}

function validaHora(a) {
    var o = new Array;
    return o = a.split(":"), o[0] < 0 || o[0] > 23 || o[1] < 0 || o[1] > 59 ? !1 : !0
}

function cancelarAgendamento() {
    $("#ancora_agendamento").html("").css("display", "none"), $("html, body").animate({
        scrollTop: 0
    }, 1e3), $("#btnAgendarConclusao").attr("onclick", "agendar(" + trim($("#idCaminho").val()) + ")"), $("#btnAgendarConclusao").removeClass("disable"), passouAgendar = 0
}

function mudarDisciplinas(a) {
    var o;
    1010101 == a ? (o = '<option value="0" selected="selected">Todas as disciplinas</option><option value="6">Ciências</option><option value="8">Educação Física</option><option value="11">Geografia</option><option value="12">História</option><option value="73">Língua Inglesa</option><option value="15">Matemática</option><option value="16">Língua Portuguesa</option>', $("#idDisciplina").empty().html(o).removeAttr("disabled")) : 1010201 == a ? (o = '<option value="0" selected="selected">Todas as disciplinas</option> <option value="6">Ciências</option><option value="8">Educação Física</option><option value="10">Física</option><option value="11">Geografia</option><option value="12">História</option><option value="73">Língua Inglesa</option><option value="15">Matemática</option><option value="16">Língua Portuguesa</option><option value="19">Química</option>', $("#idDisciplina").empty().html(o).removeAttr("disabled")) : 1020001 == a ? (o = '<option value="0" selected="selected">Todas as disciplinas</option>  <option value="7">Biologia</option> <option value="8">Educação Física</option><option value="10">Física</option> <option value="11">Geografia</option> <option value="12">História</option> <option value="73">Língua Inglesa</option> <option value="15">Matemática</option> <option value="16">Língua Portuguesa</option> <option value="19">Química</option>', $("#idDisciplina").empty().html(o).removeAttr("disabled")) : (o = '<option value="0" selected="selected">Todas as disciplinas</option>', $("#idDisciplina").empty().html(o).attr("disabled", "disabled"))
}

function procurarRecurso(a, o) {
    if (1 != passouAgendar) {
        strPesquisaGlobal = $("#strPesquisaRecurso").val();
        var e = $("#IdPapelEnsino").val(),
            i = $("#idDisciplina").val();
        if ("" == strPesquisaGlobal) return $("#strPesquisaRecurso").addClass("ava_field_alert"), !1;
        $("#strPesquisaRecurso").removeClass("ava_field_alert");
        var t;
        t = 159 == o ? {
            idCategoria: idCategoriaGlobal,
            idRecurso: idRecursoGlobal,
            strPesquisa: strPesquisaGlobal,
            intEnsino: e,
            intDisciplina: i,
            intInicio: 1,
            intFim: 10
        } : {
            idCategoria: idCategoriaGlobal,
            idRecurso: idRecursoGlobal,
            strPesquisa: strPesquisaGlobal,
            intEnsino: 0,
            intDisciplina: 0,
            intInicio: 1,
            intFim: 10
        }, idRecursoGlobal = a, idCategoriaGlobal = o, rodarGlobal = 0, passouAgendar = 1, $("#mostraPaginas").hide(), $("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/ProcurarRecursoItem",
            data: t,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(a) {
                $("#recursoitem_ava").html(a), paginacao(idCategoriaGlobal, strPesquisaGlobal, idRecursoGlobal), $(".ava_container_masonry").masonry({
                    itemSelector: ".ava_box_masonry"
                }), passouAgendar = 0
            },
            error: function(a) {
                0 == a.status ? $("#recuroitem_ava").empty() : $("#recursoitem_ava").html("Erro ao procurar recurso.")
            }
        })
    }
}

function finalizar(a) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/VerificaSeFoiAgendado",
        data: {
            id: a
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            if ("true" == a.toString().toLowerCase()) window.location = "/ava/caminhos";
            else {
                var o = $("#confirmaAgendamento"),
                    e = {
                        autoSize: !1,
                        width: 550,
                        height: 350,
                        autoResize: !1,
                        fitToView: !1,
                        type: "ajax",
                        helpers: {
                            overlay: {
                                closeClick: !1,
                                locked: !1
                            }
                        }
                    };
                lightBoxAVA(o, e), $("#confirmaAgendamento").click()
            }
        },
        error: function(a) {
            0 != a.status && console.debug("Erro ao verificar agendamento!")
        }
    })
}

function prepararAgendamento(a) {
    $.fancybox.close(), agendar(a)
}

function naoAgendar() {
    $.fancybox.close(), window.location = "/ava/caminhos"
}

function montaCampoData(a, o) {
    $(a).setMask("date"), $(o).setMask("date"), $(a).datepicker({
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function(a) {
            $(o).datepicker("option", "minDate", a)
        },
        onClose: function(a) {
            $("#dInicio").html(a + " " + $("#horaInicio").val())
        }
    }), $(o).datepicker({
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function(o) {
            $(a).datepicker("option", "maxDate", o)
        },
        onClose: function(a) {
            $("#dFim").html(a + " " + $("#horaFim").val())
        }
    })
}

function montaCampoDataAgendamento(a, o, e) {
    $(a).setMask("date"), $(o).setMask("date"), $(a).datepicker({
        numberOfMonths: 1,
        minDate: new Date(e, 0, 1),
        maxDate: new Date(e, 11, 31),
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function(a) {
            $(o).datepicker("option", "minDate", a)
        },
        onClose: function(a) {
            $("#dInicio").html(a + " " + $("#horaInicio").val())
        }
    }), $(o).datepicker({
        numberOfMonths: 1,
        minDate: new Date(e, 0, 1),
        maxDate: new Date(e, 11, 31),
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        onSelect: function(o) {
            $(a).datepicker("option", "maxDate", o)
        },
        onClose: function(a) {
            $("#dFim").html(a + " " + $("#horaFim").val())
        }
    })
}

function limparfiltro() {
    $("#strPesquisa").val(""), $("#dataInicio, #dataFim").val("")
}

function filtrarAvaliacoesCaminhos() {
    return $tituloAval = $("#strPesquisa").val(), $dataInicio = $("#dtmInicioAval").val(), $dataFim = $("#dtmFimAval").val(), $dataInicio.length <= 0 && $dataFim.length > 0 ? (alert("Favor preencher a data inicial!"), !1) : $dataInicio.length > 0 && $dataFim.length <= 0 ? (alert("Favor preencher a data final!"), !1) : ($("#escorregaFiltro").html("Adicionar filtros &#9660;"), void listaAvaliacoesCaminhos($tituloAval, $dataInicio, $dataFim))
}

function filtrarAvaliacoes() {
    return $tituloAval = $("#strPesquisa").val(), $dataInicio = $("#dtmInicioAval").val(), $dataFim = $("#dtmFimAval").val(), $dataInicio.length <= 0 && $dataFim.length > 0 ? (alert("Favor preencher a data inicial!"), !1) : $dataInicio.length > 0 && $dataFim.length <= 0 ? (alert("Favor preencher a data final!"), !1) : ($("#filtro_aval").hide(), $("#escorregaFiltro").html("Adicionar filtros &#9660;"), void listaAvaliacoesNovaRapido($tituloAval, $dataInicio, $dataFim))
}

function montaLajotinhaFiltro(a, o, e) {
    if ($(".lajotinhas ul").html(""), "" != a) {
        var i = 0;
        $(".lajotinhas li").each(function() {
            i++
        }), i++, $(".lajotinhas ul").append('<li id="' + i + '"><span class="lajotinha">' + a + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltro(' + i + ', 4)"></a></span></span></li>')
    }
    if ("" != o && "" != e) {
        var i = 0;
        $(".lajotinhas li").each(function() {
            i++
        }), i++, $(".lajotinhas ul").append('<li id="' + i + '"><span class="lajotinha">' + o + " a " + e + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltro(' + i + ', 5)"></a></span></span></li>')
    }
    $(".lajotinhas a.bt_normal").remove()
}

function montaLajotinhaFiltroAvaliacaoCaminho(a, o, e) {
    if ($(".lajotinhas ul").html(""), "" != a) {
        var i = 0;
        $(".lajotinhas li").each(function() {
            i++
        }), i++, $(".lajotinhas ul").append('<li id="' + i + '"><span class="lajotinha">' + a + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAvaliacaoCaminho(' + i + ', 4)"></a></span></span></li>')
    }
    if ("" != o && "" != e) {
        var i = 0;
        $(".lajotinhas li").each(function() {
            i++
        }), i++, $(".lajotinhas ul").append('<li id="' + i + '"><span class="lajotinha">' + o + " a " + e + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAvaliacaoCaminho(' + i + ', 5)"></a></span></span></li>')
    }
    $(".lajotinhas a.bt_normal").remove()
}

function excluirFiltro(a, o) {
    1 == o ? $("#minhas_aval").attr("checked", !0) : 2 == o ? $("#cbCompartilhada").removeAttr("checked") : 3 == o ? $("#cbPrivado").removeAttr("checked") : 4 == o ? $("#strPesquisa").val("") : 5 == o && $("#dtmInicioAval, #dtmFimAval").val(""), $("#" + a).remove(), $(".lajotinhas a.bt_normal").remove(), $(".lajotinhas").append('<a class="bt_normal" href="javascript: void(0);" onclick="filtrarAvaliacoes();"><span class="ava_refresh"></span>atualizar filtro</a>')
}

function excluirFiltroAvaliacaoCaminho(a, o) {
    4 == o ? $("#strPesquisa").val("") : 5 == o && $("#dtmInicioAval, #dtmFimAval").val(""), $("#" + a).remove(), $(".lajotinhas a.bt_normal").remove(), $(".lajotinhas").append('<a class="bt_normal" href="javascript: void(0);" onclick="filtrarAvaliacoesCaminhos();"><span class="ava_refresh"></span>atualizar filtro</a>')
}

function filtrarCaminho() {
    var a = "",
        o = 1,
        e = 1,
        i = 1,
        t = 0,
        r = !1,
        n = !1;
    if (r = $("#bolAdmin").val(), n = $("#bolAvaPuro").val(), bolPOL = 3760001 == $("#idEscola").val() ? !0 : !1, $("#sVerComo").length && (t = $("#sVerComo").val()), $("input:checkbox[name=tipopesquisa]:checked").each(function() {
            a += $(this).val()
        }), "" != a || "False" != r && 0 != r || "False" != n ? "False" == r && "True" == n && "" == a ? (a = "12", $("#meus_cam").attr("checked", !0), $("#escola_cam").attr("checked", !0), $("#portal_cam").attr("checked", !1)) : ("" == a && "True" == r || "True" == n && "True" == r && "" == a) && (1 == t ? (a = "2", $("#escola_cam").attr("checked", !0)) : (a = "1", $("#meus_cam").attr("checked", !0))) : (a = "123", $("#meus_cam").attr("checked", !0), $("#escola_cam").attr("checked", !0), $("#portal_cam").attr("checked", !0)), "1" == a ? (o = 1, e = 0, i = 0) : "2" == a ? (o = 0, e = 1, i = 0) : "3" == a ? (o = 0, e = 0, i = 1) : "12" == a ? (o = 1, e = 1, i = 0) : "13" == a ? (o = 1, e = 0, i = 1) : "23" == a && (o = 0, e = 1, i = 1), bolPOL && (e = 0), $palavrachave = $("#strPesquisa").val(), $dataInicio = $("#dataInicio").val(), $dataFim = $("#dataFim").val(), $dataInicio.length > 0 && $dataFim.length > 0) {
        var s = $dataInicio.split("/");
        $dataInicio = s[2] + "-" + s[1] + "-" + s[0];
        var l = $dataFim.split("/");
        $dataFim = l[2] + "-" + l[1] + "-" + l[0]
    } else {
        if ($dataInicio.length <= 0 && $dataFim.length > 0) return alert("Favor preencher a data inicial!"), !1;
        if ($dataInicio.length > 0 && $dataFim.length <= 0) return alert("Favor preencher a data final!"), !1
    }
    if (!valida_data($("#dataInicio").val())) return !1;
    if (!valida_data($("#dataFim").val())) return !1;
    if ($dataInicio > $dataFim) return alert("Data inicial maior que data final!"), !1;
    var c = "",
        d = 0,
        u = $("input:checkbox[name=statuspesquisa_cam]:checked").length;
    if (u > 0 ? $("input:checkbox[name=statuspesquisa_cam]:checked").each(function() {
            d++, c += u > d ? $(this).val() + "," : $(this).val()
        }) : c = bolPOL ? "1,2,3,4" : "1,2", $("#sVerComo").size() > 0)
        if (intVerComo = $("#sVerComo").val(), intVerComoAux = intVerComo, 3 != intVerComo) {
            if (strPesquisaUsuarios = "", !(arrayUsuariosAux.length > 0)) return alert("Selecione ao menos um usuário para a pesquisa."), !1;
            for (var m = 0; m < arrayUsuariosAux.length; m++) strPesquisaUsuarios.length > 0 && (strPesquisaUsuarios += ","), strPesquisaUsuarios += arrayUsuariosAux[m].idUsuario
        } else strPesquisaUsuarios = "";
    strHTMLLajotas = $(".listaLajotinhas").html(), abrirBancoCaminhos(c, o, e, i, $palavrachave, $dataInicio, $dataFim, !0, r, intVerComoAux, strPesquisaUsuarios)
}

function montaLajotinhaFiltroCaminho(a, o, e, i, t) {
    $(".le_filtros").html("<span>Filtrado por: </span>"), "123" == o ? ($(".le_filtros").append('<span id="1" class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 1)"></a></span></span>'), $(".le_filtros").append('<span id="2" class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(2, 1, 2)"></a></span></span>')) : "12" == o ? ($(".le_filtros").append('<span id="1" class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 1)"></a></span></span>'), $(".le_filtros").append('<span id="2" class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(2, 1, 2)"></a></span></span>')) : "13" == o ? $(".le_filtros").append('<span id="1" class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 1)"></a></span></span>') : "23" == o ? $(".le_filtros").append('<span id="2" class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(2, 1, 2)"></a></span></span>') : "1" == o ? $(".le_filtros").append('<span id="1" class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(1, 1, 1)"></a></span></span>') : "2" == o && $(".le_filtros").append('<span id="2" class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(2, 1, 2)"></a></span></span>');
    var r = a.split(",");
    if (r.length > 0)
        for (var n = 0; n < r.length; n++) {
            var s = 1;
            for ($(".lajotinha").each(function() {
                    s++
                });;) {
                if (!($(".lajotinha").find("span[id=" + s + "]").size() > 0)) break;
                s++
            }
            var l = "";
            switch (parseInt(r[n])) {
                case 1:
                    l = "Compartilhado", $(".le_filtros").append('<span id="' + s + '" class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s + ', 1, 6)"></a></span></span>');
                    break;
                case 2:
                    l = "Privado", $(".le_filtros").append('<span id="' + s + '" class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s + ', 4, 6)"></a></span></span>');
                    break;
                case 3:
                    l = "Compartilhado para o POL", $(".le_filtros").append('<span id="' + s + '"  class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s + ', 2, 6)"></a></span></span>');
                    break;
                case 4:
                    $("#revisao").size() > 0 && (l = "Em revisão", $(".le_filtros").append('<span id="' + s + '"  class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s + ', 3, 6)"></a></span></span>'))
            }
        } else {
            var s = 1;
            $(".lajotinhas").each(function() {
                s++
            }), $(".le_filtros").append('<span id="' + s + ' class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s + ', 1, 6)"></a></span></span>'), $(".le_filtros").append('<span id="' + s++ + ' class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s++ + ', 4, 6)"></a></span></span>'), $(".le_filtros").append('<span id="' + s++ + ' class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s++ + ', 2, 6)"></a></span></span>'), $(".le_filtros").append('<span id="' + s++ + ' class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s++ + ', 3, 6)"></a></span></span>')
        }
    if ("" != e) {
        var s = 0;
        for ($(".lajotinhas").each(function() {
                s++
            });;) {
            if (!($(".lajotinha").find("span[id=" + s + "]").size() > 0)) break;
            s++
        }
        $(".le_filtros").append('<span id="' + s + '" class="lajotinha">' + e + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s + ', 2, 4)"></a></span></span>')
    }
    if ("" != i && "" != t) {
        var s = 0;
        for ($(".lajotinhas").each(function() {
                s++
            });;) {
            if (!($(".lajotinha").find("span[id=" + s + "]").size() > 0)) break;
            s++
        }
        $(".le_filtros").append('<span id="' + s + '" class="lajotinha">' + i + " a " + t + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroCaminho(' + s + ', 3, 5)"></a></span></span>')
    }
    $(".le_filtros").append('<div id="le_filtros_pesquisaUsuario"></div>'), $(".le_filtros_pesquisaUsuario").html(strHTMLLajotas)
}

function excluirFiltroCaminho(a, o, e) {
    (1 == e || 2 == e || 3 == e) && (1 == e ? $("#meus_cam").attr("checked", !1) : 2 == e ? $("#escola_cam").attr("checked", !1) : 3 == e && $("#portal_cam").attr("checked", !1)), 4 == e && $("#strPesquisa").val(""), 5 == e && $("#dataInicio, #dataFim").val(""), 6 == e && (1 == o ? $("#comp_escola").attr("checked", !1) : 2 == o ? $("#comp_portal").attr("checked", !1) : 3 == o ? $("#revisao").attr("checked", !1) : $("#privado").attr("checked", !1)), $("#" + a).remove(), $(".le_filtros_pesquisaUsuario a.bt_normal").remove(), $(".ava_refresh").length <= 0 && $(".le_filtros").append('<a class="bt_normal right" href="javascript: void(0);" onclick="filtrarCaminho();"><span class="ava_refresh"></span>atualizar filtro</a>')
}

function filtrarTarefa() {
    var a = "",
        o = 1,
        e = 1,
        i = 1,
        t = !1,
        r = !1,
        n = !1;
    if (n = 3760001 == $("#idEscola").val() ? !0 : !1, t = $("#bolAdmin").val(), r = $("#bolAvaPuro").val(), $("#sVerComo").length && (verComo = intVerComoAux), $("input:checkbox[name=tipopesquisa]:checked").each(function() {
            a += $(this).val()
        }), "" != a || "False" != t && 0 != t || "False" != r ? "False" == t && "True" == r && "" == a ? (a = "12", $("#meus_cam").attr("checked", !0), $("#escola_cam").attr("checked", !0), $("#portal_cam").attr("checked", !1)) : ("" == a && "True" == t || "True" == r && "True" == t && "" == a) && (1 == verComo ? (a = "2", $("#escola_cam").attr("checked", !0)) : (a = "1", $("#meus_cam").attr("checked", !0))) : (a = "123", $("#meus_cam").attr("checked", !0), $("#escola_cam").attr("checked", !0), $("#portal_cam").attr("checked", !0)), "1" == a ? (o = 1, e = 0, i = 0) : "2" == a ? (o = 0, e = 1, i = 0) : "3" == a ? (o = 0, e = 0, i = 1) : "12" == a ? (o = 1, e = 1, i = 0) : "13" == a ? (o = 1, e = 0, i = 1) : "23" == a && (o = 0, e = 1, i = 1), n && (e = 0), $palavrachave = $("#strPesquisa").val(), $dataInicio = $("#dataInicio").val(), $dataFim = $("#dataFim").val(), $dataInicio.length > 0 && $dataFim.length > 0) {
        var s = $dataInicio.split("/");
        $dataInicio = s[2] + "-" + s[1] + "-" + s[0];
        var l = $dataFim.split("/");
        $dataFim = l[2] + "-" + l[1] + "-" + l[0]
    } else {
        if ($dataInicio.length <= 0 && $dataFim.length > 0) return alert("Favor preencher a data inicial!"), !1;
        if ($dataInicio.length > 0 && $dataFim.length <= 0) return alert("Favor preencher a data final!"), !1
    }
    if (!valida_data($("#dataInicio").val())) return !1;
    if (!valida_data($("#dataFim").val())) return !1;
    if ($dataInicio > $dataFim) return alert("Data inicial maior que data final!"), !1;
    var c = "",
        d = 0,
        u = $("input:checkbox[name=statuspesquisa]:checked").length;
    if (u > 0 ? $("input:checkbox[name=statuspesquisa]:checked").each(function() {
            d++, c += u > d ? $(this).val() + "," : $(this).val()
        }) : c = n ? "1,2,3,4" : "1,2", t = $("#bolAdmin").val(), $("#sVerComo").size() > 0)
        if (intVerComo = $("#sVerComo").val(), intVerComoAux = intVerComo, 3 != intVerComo) {
            if (strPesquisaUsuarios = "", !(arrayUsuariosAux.length > 0)) return alert("Selecione ao menos um usuários para a pesquisa."), !1;
            for (var m = 0; m < arrayUsuariosAux.length; m++) strPesquisaUsuarios.length > 0 && (strPesquisaUsuarios += ","), strPesquisaUsuarios += arrayUsuariosAux[m].idUsuario
        } else strPesquisaUsuarios = "";
    montaLajotinhaFiltroTarefa(c, a, $palavrachave, $("#dataInicio").val(), $("#dataFim").val()), abrirBancoTarefas(c, o, e, i, $palavrachave, $dataInicio, $dataFim, !0, t, strPesquisaUsuarios)
}

function excluirFiltroTarefa(a, o, e) {
    (1 == e || 2 == e || 3 == e) && (1 == e ? $("#meus_cam").attr("checked", !1) : 2 == e ? $("#escola_cam").attr("checked", !1) : 3 == e && $("#portal_cam").attr("checked", !1)), 4 == e && $("#strPesquisa").val(""), 5 == e && $("#dataInicio, #dataFim").val(""), 6 == e && (1 == o ? $("#comp_escola").attr("checked", !1) : 2 == o ? $("#comp_portal").attr("checked", !1) : 3 == o ? $("#revisao").attr("checked", !1) : $("#privado").attr("checked", !1)), $("#" + a).remove(), $(".le_filtros_pesquisaUsuario").remove(), $(".ava_refresh").length <= 0 && $(".le_filtros").append('<a class="bt_normal right" href="javascript: void(0);" onclick="filtrarTarefa();"><span class="ava_refresh"></span>atualizar filtro</a>')
}

function limparfiltroTarefa() {
    var a = $("#bolAdmin").val();
    "False" == a ? ($("#comp_escola, #comp_portal, #revisao, #privado").attr("checked", !0), $("#meus_cam, #escola_cam, #portal_cam").attr("checked", !0), $("#strPesquisa").val(""), $("#dataInicio, #dataFim").val("")) : ($("#comp_escola, #comp_portal, #revisao, #privado").attr("checked", !0), $("#meus_cam").attr("checked", !0), $("#escola_cam, #portal_cam").attr("checked", !1), $("#strPesquisa").val(""), $("#dataInicio, #dataFim").val(""), $("#sVerComo").prop("disabled", !0), $("#sVerComo").val(3), $("#divSelecaoUsuarios").hide(), $("#divSelecaoUsuarios").AvaSelector("limparUsuarios"), arrayUsuariosAux.length = 0)
}

function montaLajotinhaFiltroTarefa(a, o, e, i, t) {
    $(".le_filtros").html("<span>Filtrado por: </span>"), "123" == o ? ($(".le_filtros").append('<span id="1" class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(1, 1, 1)"></a></span></span>'), $(".le_filtros").append('<span id="2" class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(2, 1, 2)"></a></span></span>')) : "12" == o ? ($(".le_filtros").append('<span id="1" class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(1, 1, 1)"></a></span></span>'), $(".le_filtros").append('<span id="2" class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(2, 1, 2)"></a></span></span>')) : "13" == o ? $(".le_filtros").append('<span id="1" class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(1, 1, 1)"></a></span></span>') : "23" == o ? $(".le_filtros").append('<span id="2" class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(2, 1, 2)"></a></span></span>') : "1" == o ? $(".le_filtros").append('<span id="1" class="lajotinha">Minhas<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(1, 1, 1)"></a></span></span>') : "2" == o && $(".le_filtros").append('<span id="2" class="lajotinha">Escola<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(2, 1, 2)"></a></span></span>');
    var r = a.split(",");
    if (r.length > 0)
        for (var n = 0; n < r.length; n++) {
            var s = 1;
            for ($(".lajotinha").each(function() {
                    s++
                });;) {
                if (!($(".lajotinha").find("span[id=" + s + "]").size() > 0)) break;
                s++
            }
            var l = "";
            switch (parseInt(r[n])) {
                case 1:
                    l = "Compartilhado", $(".le_filtros").append('<span id="' + s + '" class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s + ', 1, 6)"></a></span></span>');
                    break;
                case 2:
                    l = "Privado", $(".le_filtros").append('<span id="' + s + '" class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s + ', 4, 6)"></a></span></span>');
                    break;
                case 3:
                    l = "Compartilhado para o POL", $(".le_filtros").append('<span id="' + s + '"  class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s + ', 2, 6)"></a></span></span>');
                    break;
                case 4:
                    $("#revisao").size() > 0 && (l = "Em revisão", $(".le_filtros").append('<span id="' + s + '"  class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s + ', 3, 6)"></a></span></span>'))
            }
        } else {
            var s = 1;
            $(".lajotinhas").each(function() {
                s++
            }), $(".le_filtros").append('<span id="' + s + ' class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s + ', 1, 6)"></a></span></span>'), $(".le_filtros").append('<span id="' + s++ + ' class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s++ + ', 4, 6)"></a></span></span>'), $(".le_filtros").append('<span id="' + s++ + ' class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s++ + ', 2, 6)"></a></span></span>'), $(".le_filtros").append('<span id="' + s++ + ' class="lajotinha">' + l + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s++ + ', 3, 6)"></a></span></span>')
        }
    if ("" != e) {
        var s = 0;
        for ($(".lajotinhas").each(function() {
                s++
            });;) {
            if (!($(".lajotinha").find("span[id=" + s + "]").size() > 0)) break;
            s++
        }
        $(".le_filtros").append('<span id="' + s + '" class="lajotinha">' + e + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s + ', 2, 4)"></a></span></span>')
    }
    if ("" != i && "" != t) {
        var s = 0;
        for ($(".lajotinhas").each(function() {
                s++
            });;) {
            if (!($(".lajotinha").find("span[id=" + s + "]").size() > 0)) break;
            s++
        }
        $(".le_filtros").append('<span id="' + s + '" class="lajotinha">' + i + " a " + t + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroTarefa(' + s + ', 3, 5)"></a></span></span>')
    }
    $(".le_filtros").append('<div id="le_filtros_pesquisaUsuario"></div>'), $(".le_filtros_pesquisaUsuario").html(strHTMLLajotas)
}

function limparfiltroCaminho() {
    var a = $("#bolAdmin").val();
    "False" == a ? ($("#comp_escola, #comp_portal, #revisao, #privado").attr("checked", !0), $("#meus_cam, #escola_cam, #portal_cam").attr("checked", !0), $("#strPesquisa").val(""), $("#dataInicio, #dataFim").val("")) : ($("#comp_escola, #comp_portal, #revisao, #privado").attr("checked", !0), $("#meus_cam").attr("checked", !0), $("#escola_cam, #portal_cam").attr("checked", !1), $("#strPesquisa").val(""), $("#dataInicio, #dataFim").val(""), $("#sVerComo").prop("disabled", !0), $("#sVerComo").val(3), $("#divSelecaoUsuarios").hide(), $("#divSelecaoUsuarios").AvaSelector("limparUsuarios"), arrayUsuariosAux.length = 0)
}

function filtrarAgendamento() {
    var a = "",
        o = 1,
        e = 1,
        i = 1;
    if ($("input:checkbox[name=cbStatus]:checked").each(function() {
            a += $(this).val()
        }), "" == a && (a = "123", $("#aberto_age").attr("checked", !0), $("#embreve_age").attr("checked", !0), $("#enc_age").attr("checked", !0)), "1" == a ? (e = 0, i = 0) : "2" == a ? (o = 0, i = 0) : "3" == a ? (e = 0, o = 0) : "12" == a ? i = 0 : "13" == a ? e = 0 : "23" == a && (o = 0), $palavrachave = $("#strPesquisa").val(), $dataInicio = $("#dataInicio").val(), $dataFim = $("#dataFim").val(), $dataInicio.length > 0 && $dataFim.length > 0) {
        var t = $dataInicio.split("/");
        $dataInicio = t[2] + "-" + t[1] + "-" + t[0];
        var r = $dataFim.split("/");
        $dataFim = r[2] + "-" + r[1] + "-" + r[0]
    } else {
        if ($dataInicio.length <= 0 && $dataFim.length > 0) return alert("Favor preencher a data inicial!"), !1;
        if ($dataInicio.length > 0 && $dataFim.length <= 0) return alert("Favor preencher a data final!"), !1
    }
    if (!valida_data($("#dataInicio").val())) return !1;
    if (!valida_data($("#dataFim").val())) return !1;
    if ($dataInicio > $dataFim) return alert("Data inicial maior que data final!"), !1;
    if (bolAdmin = $("#bolAdmin").val(), $("#sVerComo").size() > 0)
        if (intVerComo = $("#sVerComo").val(), intVerComoAux = intVerComo, 3 != intVerComo) {
            if (strPesquisaUsuarios = "", !(arrayUsuariosAux.length > 0)) return alert("Selecione ao menos um usuários para a pesquisa."), !1;
            for (var n = 0; n < arrayUsuariosAux.length; n++) strPesquisaUsuarios.length > 0 && (strPesquisaUsuarios += ","), strPesquisaUsuarios += arrayUsuariosAux[n].idUsuario
        } else strPesquisaUsuarios = void 0;
        "" == strPesquisaUsuarios && (strPesquisaUsuarios = void 0);
    var s = $("input:radio[name='tpAgendamento']:checked").val();
    abrirAgendamento(0, o, e, i, $palavrachave, $dataInicio, $dataFim, !0, bolAdmin, intVerComoAux, strPesquisaUsuarios, s)
}

function excluirFiltroAgendadas(a, o, e) {
    (1 == e || 2 == e || 3 == e) && (1 == e ? $("#aberto_age").attr("checked", !1) : 2 == e ? $("#embreve_age").attr("checked", !1) : 3 == e && $("#enc_age").attr("checked", !1)), 4 == e && $("#strPesquisa").val(""), 5 == e && $("#dataInicio, #dataFim").val(""), 6 == e && $("#rbTpGerais").attr("checked", "checked"), $("#" + a).remove(), $(".le_filtros_pesquisaUsuario a.bt_normal").remove(), $(".ava_refresh").length <= 0 && $(".le_filtros").append('<a class="bt_normal right" href="javascript: void(0);" onclick="filtrarAgendamento();"><span class="ava_refresh"></span>atualizar filtro</a>')
}

function limparfiltroAgendamento() {
    var a = $("#bolAdmin").val();
    "False" == a ? ($("#strPesquisa").val(""), $("#dataInicio, #dataFim").val(""), $("#aberto_age, #embreve_age, #enc_age").attr("checked", !0)) : ($("#strPesquisa").val(""), $("#dataInicio, #dataFim").val(""), $("#aberto_age, #embreve_age, #enc_age").attr("checked", !0), $("#sVerComo").attr("disabled", !1), $("#sVerComo").val(3), $("#divSelecaoUsuarios").hide(), $("#divSelecaoUsuarios").AvaSelector("limparUsuarios"), arrayUsuariosAux.length = 0)
}

function abrirAgendamento(a, o, e, i, t, r, n, s, l, c, d, u) {
    var m = $("#anoVigente").val();

    var dateYear = new Date();
    m = dateYear.getFullYear();

    s || (c = 0, $("#le_filtros_pesquisaUsuario").html(""), arrayUsuariosAux.length = 0), void 0 === l ? l = 0 : "True" == l ? l = 1 : "False" == l && (l = 0), $("#Hcaminhos").html('<h1 class="blokletters">Agendamentos</h1><p class="blokletters">Acompanhe as Tarefas e Caminhos de aprendizagem agendados para seus alunos.</p>'), $("#aba_agendadas").removeClass("atual").addClass("atual"), $("#aba_tarefas,#aba_caminhos").removeClass("atual"), $("#container_painelcontrole").css("min-height", "0"), $("#container_painelcontrole").html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>"), "" == r && (r = m + "-01-01", n = m + "-12-31");
    var p = r,
        v = n;
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaAgendadas/",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(h) {
            if ($("#container_painelcontrole").html(h), s) {
                if ("" != r) {
                    var f = r.split("-");
                    r = f[2] + "/" + f[1] + "/" + f[0]
                }
                if ("" != n) {
                    var g = n.split("-");
                    n = g[2] + "/" + g[1] + "/" + g[0]
                }
                $("#strPesquisa").val(t), $("#dataInicio").val(r), $("#dataFim").val(n);
                var _ = "";
                0 == o ? $("#aberto_age").attr("checked", !1) : _ += "1", 0 == e ? $("#embreve_age").attr("checked", !1) : _ += "2", 0 == i ? $("#enc_age").attr("checked", !1) : _ += "3", 0 != c && $("#sVerComo > option").each(function() {
                    $(this).val() == c && $(this).attr("selected", "selected")
                }), 1 == u ? $("#rbTpGerais").attr("checked", "checked") : $("#rbTpGrupos").attr("checked", "checked"), montaLajotinhaFiltroAgendadas(_, t, $("#dataInicio").val(), $("#dataFim").val(), u)
            }
            $("#escorregaFiltro").toggle(function() {
                $(this).html("Fechar &#9650;"), $("#conteudo_filtro").slideDown()
            }, function() {
                $(this).html("Abrir &#9660;"), $("#conteudo_filtro").slideUp()
            }), montaCampoDataAgendamento("#dataInicio", "#dataFim", m), idCaminho = a, strPesquisaAgendamento = t, intAberto = o, intEmBreve = e, intEncerrado = i, dtmInicioAgendamento = p, dtmFimAgendamento = v, d = d, rodar = 1;
            var A = 0;
            if (0 != l && $("#sVerComo").length ? (A = $("#sVerComo").val(), 2 == A ? paginacaoAgendadasAlunos(idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento, d, u) : paginacaoAgendadas(idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento, d, u)) : paginacaoAgendadas(idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento, d, u), $("#sVerComo").length) {
                var A = $("#sVerComo").val();
                3 != A ? ($("#divSelecaoUsuarios").show(), 1 == $("#sVerComo").val() && (aluno = !1, educador = !0), 2 == $("#sVerComo").val() && (aluno = !0, educador = !1), carregaSeletorAdmins(aluno, educador)) : $("#divSelecaoUsuarios").hide(), $("#sVerComo").change(function() {
                    d = "", 3 == $(this).val() ? ($("#divSelecaoUsuarios").hide(), c = 3) : (1 == $(this).val() && (aluno = !1, educador = !0, c = 1), 2 == $(this).val() && (aluno = !0, educador = !1, c = 2), $("#divSelecaoUsuarios").AvaSelector("bolInstanciado") && $("#divSelecaoUsuarios").AvaSelector("destruir"), arrayUsuariosAux.length = 0, $("#divSelecaoUsuarios").show(), carregaSeletorAdmins(aluno, educador), $("#divSelecaoUsuarios").AvaSelector("limparUsuarios"))
                })
            }
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole").empty() : $("#container_painelcontrole").html("erro ao listar agendadas!")
        }
    })
}

function retornaAgendadasPaginando(a, o, e, i, t, r, n, s, l) {
    a += 1;
    var c, d;
    d = quantidadePorPagina * a, c = d - quantidadePorPagina + 1, $("#container_painelcontrole #agendadas_paginando").html("<tr></tr>");
    var u = $("#container_painelcontrole #mostraPaginas").clone();
    u.html("<div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>").removeAttr("id"), $("#container_painelcontrole #agendadas_paginando tr").html(u), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaAgendadasPaginando/",
        data: {
            id: o,
            intAberto: e,
            intEmBreve: i,
            intEncerrado: t,
            strPesquisa: r,
            dtmInicio: n,
            dtmFim: s,
            intInicio: c,
            intFim: d,
            strPesquisaUsuarios: l
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#container_painelcontrole #agendadas_paginando").html(a)
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole #agendadas_paginando").empty() : $("#container_painelcontrole #agendadas_paginando").html("erro ao listar agendadas paginando!")
        }
    })
}

function retornaAgendadasGrupoPaginando(a, o, e, i, t, r, n, s, l) {

    var idRotaAgendamento = $('#idRotaAgendamento').val();
    if (parseInt(idRotaAgendamento) != 0) {
        
        a += 1;
        var c, d;
        d = quantidadePorPagina * a, c = d - quantidadePorPagina + 1, $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaAgendadasPaginandoGrupoByIdAgendamento/",
            data: {
                id: parseInt(idRotaAgendamento),
                intAberto: e,
                intEmBreve: i,
                intEncerrado: t,
                strPesquisa: r,
                dtmInicio: n,
                dtmFim: s,
                intInicio: c,
                intFim: d,
                strPesquisaUsuarios: l
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(a) {
                $("#container_painelcontrole #agendadas_paginando").html(a);
                $('#'+idRotaAgendamento).click();
            },
            error: function(a) {
                0 == a.status ? $("#container_painelcontrole #agendadas_paginando").empty() : $("#container_painelcontrole #agendadas_paginando").html("erro ao listar agendadas paginando!")
            }
        });

    }
    else{
        a += 1;
        var c, d;
        d = quantidadePorPagina * a, c = d - quantidadePorPagina + 1, $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaAgendadasPaginandoGrupo/",
            data: {
                id: o,
                intAberto: e,
                intEmBreve: i,
                intEncerrado: t,
                strPesquisa: r,
                dtmInicio: n,
                dtmFim: s,
                intInicio: c,
                intFim: d,
                strPesquisaUsuarios: l
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(a) {
                $("#container_painelcontrole #agendadas_paginando").html(a);

            },
            error: function(a) {
                0 == a.status ? $("#container_painelcontrole #agendadas_paginando").empty() : $("#container_painelcontrole #agendadas_paginando").html("erro ao listar agendadas paginando!")
            }
        });
    }
}

function retornaAgendadasPaginandoAlunos(a, o, e, i, t, r, n, s, l) {
    a += 1;
    var c, d;
    d = quantidadePorPagina * a, c = d - quantidadePorPagina + 1;
    var u = "";
    1 == e && (u += "1,"), 1 == i && (u += "2,"), 1 == t && (u += "3,4");
    var m = "False" == $("#bolAdmin").val() ? 6 : 7;
    $("#container_painelcontrole #agendadas_paginando").empty().html("<tr><td colspan='" + m + "'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/BancoAtividadesAlunoCoordPaginando/",
        data: {
            tipoAtividade: "1,2,3",
            strAtividade: r,
            strStatus: u,
            idProfessor: 0,
            dtmInicio: n,
            dtmFimAgendamento: s,
            inicio: c,
            fim: d,
            ordernar: "",
            bolOrdenar: !1,
            strPesquisaUsuarios: l
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $(".tbHeaderEducadores").hide(), $(".tbHeaderAlunos").show(), $("#container_painelcontrole #agendadas_paginando").html(a), $(".btnVerDetalhes").toggle(function() {
                id = $(this).attr("idAtiv"), $("#linha_atividade_" + id).addClass("table_selected"), $("#linhaprabaixo_" + id).show(), $("#vaiprabaixo_" + id).slideDown("slow"), $("#seta_" + id).html("&#9650;"), $("#btDetalhe_" + id).html("ocultar detalhes")
            }, function() {
                id = $(this).attr("idAtiv"), $("#linha_atividade_" + id).removeClass("table_selected"), $("#vaiprabaixo_" + id).slideUp("slow", function() {
                    $("#linhaprabaixo_" + id).hide()
                }), $("#seta_" + id).html("&#9660;"), $("#btDetalhe_" + id).html("ver detalhes")
            })
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole #agendadas_paginando").empty() : $("#container_painelcontrole #agendadas_paginando").html("erro ao listar agendadas paginando!")
        }
    })
}

function retornaAgendadasPaginandoAlunosGrupo(a, o, e, i, t, r, n, s, l) {
    a += 1;
    var c, d;
    d = quantidadePorPagina * a, c = d - quantidadePorPagina + 1;
    var u = "";
    1 == e && (u += "1,"), 1 == i && (u += "2,"), 1 == t && (u += "3,4"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/BancoAtividadesAlunoGrupoCoordPaginando/",
        data: {
            tipoAtividade: "1,2",
            strAtividade: r,
            strStatus: u,
            idProfessor: 0,
            dtmInicio: n,
            dtmFimAgendamento: s,
            inicio: c,
            fim: d,
            ordernar: "",
            bolOrdenar: !1,
            strPesquisaUsuarios: l
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $(".tbHeaderEducadores").hide(), $(".tbHeaderAlunos").show(), $("#container_painelcontrole #agendadas_paginando").html(a), $(".btnVerDetalhes").toggle(function() {
                id = $(this).attr("idAtiv"), $("#linha_atividade_" + id).addClass("table_selected"), $("#linhaprabaixo_" + id).show(), $("#vaiprabaixo_" + id).slideDown("slow"), $("#seta_" + id).html("&#9650;"), $("#btDetalhe_" + id).html("ocultar detalhes")
            }, function() {
                id = $(this).attr("idAtiv"), $("#linha_atividade_" + id).removeClass("table_selected"), $("#vaiprabaixo_" + id).slideUp("slow", function() {
                    $("#linhaprabaixo_" + id).hide()
                }), $("#seta_" + id).html("&#9660;"), $("#btDetalhe_" + id).html("ver detalhes")
            })
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole #agendadas_paginando").empty() : $("#container_painelcontrole #agendadas_paginando").html("erro ao listar agendadas paginando!")
        }
    })
}

function montaLajotinhaFiltroAgendadas(a, o, e, i, t) {
    if ($(".le_filtros").html("<span>Filtrado por: </span>"), "123" == a) $(".le_filtros").append('<span id="1" class="lajotinha">Aberto<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1, 1, 1)"></a></span></span>'), $(".le_filtros").append('<span id="2" class="lajotinha">Em Breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(2, 1, 2)"></a></span></span>'), $(".le_filtros").append('<span id="3" class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(3, 1, 3)"></a></span></span>');
    else if ("12" == a) {
        var r = 0;
        $(".lajotinha").each(function() {
            r++
        }), r++, $(".le_filtros").append('<span id="' + r + '" class="lajotinha">Aberto<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 1, 1)"></a></span></span>'), r++, $(".le_filtros").append('<span id="' + r + '" class="lajotinha">Em Breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 1, 2)"></a></span></span>')
    } else if ("13" == a) {
        var r = 0;
        $(".lajotinha").each(function() {
            r++
        }), r++, $(".le_filtros").append('<span id="' + r + '" class="lajotinha">Aberto<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 1, 1)"></a></span></span>'), r++, $(".le_filtros").append('<span id="' + r + '" class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 1, 3)"></a></span></span>')
    } else if ("23" == a) {
        var r = 0;
        $(".lajotinha").each(function() {
            r++
        }), r++, $(".le_filtros").append('<span id="' + r + '" class="lajotinha">Em Breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 1, 2)"></a></span></span>'), r++, $(".le_filtros").append('<span id="' + r + '" class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 1, 3)"></a></span></span>')
    } else "1" == a ? $(".le_filtros").append('<span id="1" class="lajotinha">Aberto<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1, 1, 1)"></a></span></span>') : "2" == a ? $(".le_filtros").append('<span id="1" class="lajotinha">Em Breve<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1, 1, 2)"></a></span></span>') : "3" == a && $(".le_filtros").append('<span id="1" class="lajotinha">Encerrado<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(1, 1, 3)"></a></span></span>');
    if ("" != o) {
        var r = 0;
        $(".lajotinha").each(function() {
            r++
        }), r++, $(".le_filtros").append('<span id="' + r + '" class="lajotinha">' + o + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 2, 4)"></a></span></span>')
    }
    if ("" != e && "" != i) {
        var r = 0;
        $(".lajotinha").each(function() {
            r++
        }), r++, $(".le_filtros").append('<span id="' + r + '" class="lajotinha">' + e + " a " + i + '<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 3, 5)"></a></span></span>')
    }
    if ("" != t) {
        var r = 0;
        $(".lajotinha").each(function() {
            r++
        }), r++, 1 == t ? $(".le_filtros").append('<span id="' + r + '" class="lajotinha">Gerais<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 4, 6)"></a></span></span>') : $(".le_filtros").append('<span id="' + r + '" class="lajotinha">Grupos<span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="excluirFiltroAgendadas(' + r + ', 4, 6)"></a></span></span>')
    }
    $(".le_filtros").append('<div id="le_filtros_pesquisaUsuario"></div>'), $(".le_filtros_pesquisaUsuario").html(strHTMLLajotas)
}

function retornaUsuariosAgendamento(a, o) {
    $("#containerescorrega_" + a + " .usuarios_agendamento").html("<div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaUsuariosAgendamento",
        data: {
            idRotaAgendamento: a,
            idTurma: o
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(o) {
            $("#containerescorrega_" + a + " .usuarios_agendamento").html(o), $("#containerescorrega_" + a).slideDown("slow"), $(".b_tooltip_center").each(function() {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: !0,
                    events: {
                        def: "mouseover, mouseout"
                    }
                })
            })
        },
        error: function(o) {
            0 == o.status ? $("#containerescorrega_" + a).empty() : $("#containerescorrega_" + a).html("erro ao listar usuários do agendamento!")
        }
    })
}

function montaProgessBar(a, o) {
    $("#progressbar_" + o).progressbar({
        value: a
    })
}

function abrirBancoCaminhos(a, o, e, i, t, r, n, s, l, c, d) {
    s || (c = 0, $("#le_filtros_pesquisaUsuario").html(""), arrayUsuariosAux.length = 0), void 0 === l ? l = 0 : "True" == l ? l = 1 : "False" == l && (l = 0), $("#Hcaminhos").html('<h1 class="blokletters">Caminhos de aprendizagem</h1><p class="blokletters">Utilize sequências de tarefas que auxiliam no processo de ensino e aprendizagem.</p>'), $("#aba_caminhos").removeClass("atual").addClass("atual"), $("#aba_tarefas,#aba_agendadas").removeClass("atual"), $("#container_painelcontrole").css("min-height", "0"), $("#container_painelcontrole").html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>");
    var u = r,
        m = n;
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaBancoCaminhos/",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(p) {
            if ($("#container_painelcontrole").html(p), $("#conteudo_filtro").show(), "" != r) {
                var v = r.split("-");
                r = v[2] + "/" + v[1] + "/" + v[0]
            }
            if ("" != n) {
                var h = n.split("-");
                n = h[2] + "/" + h[1] + "/" + h[0]
            }
            $("#dataInicio").val(r), $("#dataFim").val(n), $("#strPesquisa").val(t);
            var f = "";
            0 == o ? $("#meus_cam").attr("checked", !1) : ($("#meus_cam").prop("checked", !0), f += "1"), 0 == e ? $("#escola_cam").attr("checked", !1) : ($("#escola_cam").prop("checked", !0), f += "2"), 0 == i ? $("#portal_cam").attr("checked", !1) : ($("#portal_cam").prop("checked", !0), f += "3"), "2" == f && 1 == parseInt(e) && "" != d && $("#sVerComo").prop("disabled", !1);
            var g = a.split(",");
            if (g.length > 0) {
                $("#comp_escola").attr("checked", !1), $("#privado").attr("checked", !1), $("#comp_portal").attr("checked", !1), $("#revisao").attr("checked", !1);
                for (var _ = 0; _ < g.length; _++) switch (parseInt(g[_])) {
                    case 1:
                        strStatus = "Compartilhado", $("#comp_escola").attr("checked", !0);
                        break;
                    case 2:
                        $("#privado").attr("checked", !0);
                        break;
                    case 3:
                        $("#comp_portal").attr("checked", !0);
                        break;
                    case 4:
                        $("#revisao").attr("checked", !0)
                }
            }
            if (0 != c && $("#sVerComo > option").each(function() {
                    $(this).val() == c && $(this).attr("selected", "selected")
                }), montaLajotinhaFiltroCaminho(a, f, t, r, n), montaCampoData("#dataInicio", "#dataFim"), $("#escorregaFiltro").toggle(function() {
                    0 == l ? ($(this).html("Fechar &#9650;"), montaCampoData("#dataInicio", "#dataFim"), $("#conteudo_filtro").slideDown()) : ($(this).html("Abrir &#9660;"), $("#conteudo_filtro").slideUp())
                }, function() {
                    0 == l ? ($(this).html("Abrir &#9660;"), $("#conteudo_filtro").slideUp()) : ($(this).html("Fechar &#9650;"), montaCampoData("#dataInicio", "#dataFim"), $("#conteudo_filtro").slideDown())
                }), strIntStatusGlobal = a, intMeusGlobal = o, intEscolaGlobal = e, intPortalGlobal = i, strPesquisaGlobal = t, dtmInicioGlobal = u, dtmFimGlobal = m, bolFiltrandoGlobal = s, rodarGlobal = 1, paginacaoCaminhos(strIntStatusGlobal, intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal, d), $('input[name="tipopesquisa"]').change(function() {
                    intChecked = 0, $('input[name="tipopesquisa"]').each(function() {
                        $(this).is(":checked") && (intChecked += 1)
                    }), intChecked > 0 ? ($("#sVerComo").attr("disabled", !0), $("#sVerComo").val(3), $("#divSelecaoUsuarios").hide()) : ($("#sVerComo").attr("disabled", !1), $("#sVerComo").val(3), $("#divSelecaoUsuarios").hide())
                }), $("#sVerComo").length) {
                var A = $("#sVerComo").val();
                3 != A ? ($("#divSelecaoUsuarios").show(), 1 == $("#sVerComo").val() && (aluno = !1, educador = !0), carregaSeletorAdmins(aluno, educador)) : $("#divSelecaoUsuarios").hide(), $("#sVerComo").change(function() {
                    d = "", 3 == $(this).val() ? (c = 3, $("#divSelecaoUsuarios").hide(), $("#meus_cam").attr("checked", !1), $("#escola_cam").attr("checked", !1), $("#portal_cam").attr("checked", !1)) : (1 == $(this).val() && (c = 1, $("#meus_cam").attr("checked", !1), $("#escola_cam").attr("checked", !1), $("#portal_cam").attr("checked", !1), aluno = !1, educador = !0), $("#divSelecaoUsuarios").show(), carregaSeletorAdmins(aluno, educador))
                })
            }
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole").empty() : $("#container_painelcontrole").html("erro ao listar banco!")
        }
    })
}

function abrirBancoTarefas(a, o, e, i, t, r, n, s, l, c) {
    $("#idRotaAgendamento").val('0');
    s || (intVerComoAux = 0, $("#le_filtros_pesquisaUsuario").html(""), arrayUsuariosAux.length = 0), void 0 === l ? l = 0 : "True" == l ? l = 1 : "False" == l && (l = 0), $("#Hcaminhos").html('<h1 class="blokletters">Tarefas</h1><p class="blokletters">Crie, agende para seus alunos e compartilhe tarefas com os professores da sua escola.</p>'), $("#aba_tarefas").removeClass("atual").addClass("atual"), $("#aba_caminhos,#aba_agendadas").removeClass("atual"), $("#container_painelcontrole").css("min-height", "0"), $("#container_painelcontrole").html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>");
    var d = r,
        u = n;
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaBancoTarefas/",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(m) {
            if ($("#container_painelcontrole").html(m), $("#conteudo_filtro").show(), "" != r) {
                var p = r.split("-");
                r = p[2] + "/" + p[1] + "/" + p[0]
            }
            if ("" != n) {
                var v = n.split("-");
                n = v[2] + "/" + v[1] + "/" + v[0]
            }
            $("#dataInicio").val(r), $("#dataFim").val(n), $("#strPesquisa").val(t);
            var h = "";
            0 == o ? $("#meus_cam").attr("checked", !1) : ($("#meus_cam").prop("checked", !0), h += "1"), 0 == e ? $("#escola_cam").attr("checked", !1) : ($("#escola_cam").prop("checked", !0), h += "2"), 0 == i ? $("#portal_cam").attr("checked", !1) : ($("#portal_cam").prop("checked", !0), h += "3"), "2" == h && 1 == parseInt(e) && "" != c && $("#sVerComo").prop("disabled", !1);
            var f = a.split(",");
            if (f.length > 0) {
                $("#comp_escola").attr("checked", !1), $("#privado").attr("checked", !1), $("#comp_portal").attr("checked", !1), $("#revisao").attr("checked", !1);
                for (var g = 0; g < f.length; g++) switch (parseInt(f[g])) {
                    case 1:
                        strStatus = "Compartilhado", $("#comp_escola").attr("checked", !0);
                        break;
                    case 2:
                        $("#privado").attr("checked", !0);
                        break;
                    case 3:
                        $("#comp_portal").attr("checked", !0);
                        break;
                    case 4:
                        $("#revisao").attr("checked", !0)
                }
            }
            if (0 != intVerComoAux && $("#sVerComo > option").each(function() {
                    $(this).val() == intVerComoAux && $(this).attr("selected", "selected")
                }), montaLajotinhaFiltroTarefa(a, h, t, r, n), montaCampoData("#dataInicio", "#dataFim"), $("#escorregaFiltro").toggle(function() {
                    0 == l ? ($(this).html("Fechar &#9650;"), montaCampoData("#dataInicio", "#dataFim"), $("#conteudo_filtro").slideDown()) : ($(this).html("Abrir &#9660;"), $("#conteudo_filtro").slideUp())
                }, function() {
                    0 == l ? ($(this).html("Abrir &#9660;"), $("#conteudo_filtro").slideUp()) : ($(this).html("Fechar &#9650;"), montaCampoData("#dataInicio", "#dataFim"), $("#conteudo_filtro").slideDown())
                }), strIntStatusGlobal = a, intMeusGlobal = o, intEscolaGlobal = e, intPortalGlobal = i, strPesquisaGlobal = t, dtmInicioGlobal = d, dtmFimGlobal = u, bolFiltrandoGlobal = s, rodarGlobal = 1, paginacaoTarefas(strIntStatusGlobal, intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal, c), $('input[name="tipopesquisa"]').change(function() {
                    intChecked = 0, $('input[name="tipopesquisa"]').each(function() {
                        $(this).is(":checked") && (intChecked += 1)
                    }), intChecked > 0 ? ($("#sVerComo").attr("disabled", !0), $("#sVerComo").val(3), $("#divSelecaoUsuarios").hide()) : ($("#sVerComo").attr("disabled", !1), $("#sVerComo").val(3), $("#divSelecaoUsuarios").hide())
                }), $("#sVerComo").length) {
                var _ = $("#sVerComo").val();
                3 != _ ? ($("#divSelecaoUsuarios").show(), 1 == $("#sVerComo").val() && (aluno = !1, educador = !0), carregaSeletorAdmins(aluno, educador)) : $("#divSelecaoUsuarios").hide(), $("#sVerComo").change(function() {
                    c = "", 3 == $(this).val() ? ($("#divSelecaoUsuarios").hide(), $("#meus_cam").attr("checked", !0), $("#escola_cam").attr("checked", !1), $("#portal_cam").attr("checked", !1), intVerComoAux = 3) : (1 == $(this).val() && ($("#meus_cam").attr("checked", !1), $("#escola_cam").attr("checked", !1), $("#portal_cam").attr("checked", !1), intVerComoAux = 1, aluno = !1, educador = !0), $("#divSelecaoUsuarios").show(), carregaSeletorAdmins(aluno, educador), $("#divSelecaoUsuarios").AvaSelector("limparUsuarios"))
                })
            }
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole").empty() : $("#container_painelcontrole").html("erro ao listar banco!")
        }
    })
}

function escorregaCaminho(a) {
    $("#escorrega_" + a).trigger("click")
}

function RetornaCaminhosPaginando(a, o, e, i, t, r, n, s, l, c) {
    a += 1;
    var d = quantidadePorPagina * a,
        u = d - quantidadePorPagina + 1;
    $("#container_painelcontrole #caminhos_paginando").html("<tr><td colspan='4'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaBancoCaminhosPaginando/",
        data: {
            strStatus: o,
            intMeus: e,
            intEscola: i,
            intPortal: t,
            strPesquisa: r,
            dtmInicio: n,
            dtmFim: s,
            intInicio: u,
            intFim: d,
            strPesquisaUsuarios: c
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#container_painelcontrole #caminhos_paginando").html(a), $(".bcam").each(function() {
                $("#bt_verMaisDescRota_" + $(this).attr("id")).toggle(function() {
                    var a = $(this).attr("rel");
                    $(this).html("veja menos"), $("#caminhoDescr_" + a).css("display", "none"), $("#caminhoDescrCompleto_" + a).css("display", "")
                }, function() {
                    var a = $(this).attr("rel");
                    $(this).html("veja mais"), $("#caminhoDescr_" + a).css("display", ""), $("#caminhoDescrCompleto_" + a).css("display", "none")
                })
            }), $(".b_tooltip_center").each(function() {
                $(this).tooltip({
                    effect: "slide",
                    position: "top center",
                    relative: !0,
                    events: {
                        def: "click, mouseout"
                    }
                })
            }), $(".btnEscorregarCaminho").toggle(function() {
                id = $(this).attr("idAtiv"), $(".bancocaminho_" + id).addClass("table_selected"), $("#caminho_" + id + ", #containerescorrega_" + id).slideDown("slow"), $("#seta_" + id).html("&#9650;"), $("#btDetalhe_" + id).html("ocultar detalhes")
            }, function() {
                id = $(this).attr("idAtiv"), $(".bancocaminho_" + id).removeClass("table_selected"), $("#caminho_" + id + ", #containerescorrega_" + id).slideUp("slow"), $("#seta_" + id).html("&#9660;"), $("#btDetalhe_" + id).html("ver detalhes")
            }), $(".lbopcoes input:radio").click(function() {
                $intStatus = $(this).val(), $idCaminho = $(this).attr("idCaminho"), $.ajax({
                    url: "/AVA/Caminhos/home/SalvarEstadoRota/",
                    data: {
                        intStatus: $intStatus,
                        idCaminho: $idCaminho
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function(a) {
                        1 == $intStatus ? $("#status_" + $idCaminho).html("<span class='publica'></span>Compartilhado") : 2 == $intStatus ? $("#status_" + $idCaminho).html("<span class='privada'></span>Privado") : 3 == $intStatus ? $("#status_" + $idCaminho).html("<span class='publica'></span>Compartilhado para o portal") : $("#status_" + $idCaminho).html("<span class='privada'></span>Em revisão")
                    },
                    error: function(a) {
                        0 != a.status && console.debug("erro ao salvar estado do caminho. ")
                    }
                })
            });
            var o = 0;
            $(".arrastaveis").each(function() {
                o += 1, $(".arrastar" + o).sortable({
                    stop: function(a, o) {
                        $(".arrastaveis").find(".e-fim").each(function() {
                            $(this).removeClass("e-fim")
                        }), $(".arrastaveis").children(":last").addClass("e-fim");
                        var e = 1;
                        $(this).find("li").each(function() {
                            var a = $(this).attr("idetapa");
                            $.ajax({
                                url: "/AVA/Caminhos/home/salvarOrdemEtapa/?idEtapa=" + a + "&ordem=" + e,
                                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                                async: !1,
                                success: function(a) {},
                                error: function(a) {
                                    alert("Erro: " + a.status)
                                }
                            }), e++
                        })
                    }
                }).disableSelection()
            }), $(".bcam .btnEscorregarCaminho:first").trigger("click")
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole #caminhos_paginando").empty() : $("#container_painelcontrole #caminhos_paginando").html("erro ao listar banco paginando!")
        }
    })
}

function RetornaTarefasPaginando(a, o, e, i, t, r, n, s, l, c) {
    a += 1;
    var d = quantidadePorPagina * a,
        u = d - quantidadePorPagina + 1;

    console.log('RetornaTarefasPaginando');


    $("#container_painelcontrole #caminhos_paginando").html("<tr><td colspan='4'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaBancoTarefasPaginando/",
        data: {
            strStatus: o,
            intMeus: e,
            intEscola: i,
            intPortal: t,
            strPesquisa: r,
            dtmInicio: n,
            dtmFim: s,
            intInicio: u,
            intFim: d,
            strPesquisaUsuarios: c
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            $("#container_painelcontrole #caminhos_paginando").html(a), $(".iframeVideoVimeo", "#container_painelcontrole").on("load", function() {
                var a = $f(this),
                    o = !1;
                a.api("pause"), a.addEvent("ready", function() {
                    a.addEvent("play", function() {
                        o || (o = !0, a.api("pause"))
                    })
                })
            }), $(".bcam").each(function() {
                $("#bt_verMaisDescRota_" + $(this).attr("id")).toggle(function() {
                    var a = $(this).attr("rel");
                    $(this).html("veja menos"), $("#caminhoDescr_" + a).css("display", "none"), $("#caminhoDescrCompleto_" + a).css("display", "")
                }, function() {
                    var a = $(this).attr("rel");
                    $(this).html("veja mais"), $("#caminhoDescr_" + a).css("display", ""), $("#caminhoDescrCompleto_" + a).css("display", "none")
                })
            }), $(".b_tooltip_center").each(function() {
                $(this).tooltip({
                    effect: "slide",
                    position: "top center",
                    relative: !0,
                    events: {
                        def: "click, mouseout"
                    }
                })
            }), $(".btnEscorregarCaminho").toggle(function() {
                id = $(this).attr("idAtiv"), $(".bancocaminho_" + id).addClass("table_selected"), $("#caminho_" + id + ", #containerescorrega_" + id).slideDown("slow"), $("#seta_" + id).html("&#9650;"), $("#btDetalhe_" + id).html("ocultar detalhes")
            }, function() {
                id = $(this).attr("idAtiv"), $(".bancocaminho_" + id).removeClass("table_selected"), $("#caminho_" + id + ", #containerescorrega_" + id).slideUp("slow"), $("#seta_" + id).html("&#9660;"), $("#btDetalhe_" + id).html("ver detalhes")
            }), $(".lbopcoes input:radio").click(function() {
                $intStatus = $(this).val(), $idCaminho = $(this).attr("idCaminho"), $.ajax({
                    url: "/AVA/Caminhos/home/SalvarEstadoRota/",
                    data: {
                        intStatus: $intStatus,
                        idCaminho: $idCaminho
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function(a) {
                        1 == $intStatus ? $("#status_" + $idCaminho).html("<span class='publica'></span>Compartilhado") : 2 == $intStatus ? $("#status_" + $idCaminho).html("<span class='privada'></span>Privado") : 3 == $intStatus ? $("#status_" + $idCaminho).html("<span class='publica'></span>Compartilhado para o portal") : $("#status_" + $idCaminho).html("<span class='privada'></span>Em revisão")
                    },
                    error: function(a) {
                        0 != a.status && console.debug("erro ao salvar estado do caminho. ")
                    }
                })
            });
            var o = 0;
            $(".arrastaveis").each(function() {
                o += 1, $(".arrastar" + o).sortable({
                    stop: function(a, o) {
                        $(".arrastaveis").find(".e-fim").each(function() {
                            $(this).removeClass("e-fim")
                        }), $(".arrastaveis").children(":last").addClass("e-fim");
                        var e = 1;
                        $(this).find("li").each(function() {
                            var a = $(this).attr("idetapa");
                            $.ajax({
                                url: "/AVA/Caminhos/home/salvarOrdemEtapa/?idEtapa=" + a + "&ordem=" + e,
                                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                                async: !1,
                                success: function(a) {},
                                error: function(a) {
                                    alert("Erro: " + a.status)
                                }
                            }), e++
                        })
                    }
                }).disableSelection()
            }), $(".bcam .btnEscorregarCaminho:first").trigger("click")
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole #caminhos_paginando").empty() : $("#container_painelcontrole #caminhos_paginando").html("erro ao listar banco paginando!")
        }
    })
}

function fecharTag(a, o, e) {
    o > 0 && e > 0 ? $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirTagDaRota/?idRota=" + e + "&idTag=" + o,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(o) {
            $("#" + a).remove()
        },
        error: function(a) {
            0 != a.status && console.debug("Erro ao remover tag!")
        }
    }) : $("#" + a).remove()
}

function limiteCaracter(a, o) {
    if ("titulo" == o || "tituloetapa" == o) {
        var e = 100,
            i = a.value.length;
        return a = a.value, e >= i ? (restante = e - i, restante > 1 ? $("#tituloLimite").text(restante + " caracteres restantes") : $("#tituloLimite").text(restante + " caracter restante"), !1) : ("titulo" == o ? $("#strTitulo").val(a.substring(0, i - 1)) : $("#tituloetapa").val(a.substring(0, i - 1)), !1)
    }
    if ("descricao" == o) {
        var e = 800,
            i = a.value.length;
        if (a = a.value, e >= i) return restante = e - i, restante > 1 ? $("#textoLimite").text(restante + " caracteres restantes") : $("#textoLimite").text(restante + " caracter restante"), !1;
        if (!(i >= e)) return $("#strDescricao").val(a.substring(0, i - 1)), !1;
        restante = e - i, $("#textoLimite").text(restante + " caracteres - limite excedente")
    } else if ("tag" == o) {
        var e = 30,
            i = a.value.length;
        return a = a.value, e >= i ? (restante = e - i, restante > 1 ? $("#tagLimite").text(restante + " caracteres restantes para esta tag") : $("#tagLimite").text(restante + " caracter restante para esta tag"), !1) : ($("#iTags").val(a.substring(0, i - 1)), !1)
    }
}

function trim(a) {
    return a.replace(/^\s+|\s+$/g, "")
}

function montaTag(a, o, e) {
    var i = "separe as tags por vírgula.";
    if (188 == parseInt(a.which) || 13 == parseInt(a.which) || 191 == parseInt(a.which) || "blur" == e && o.toLowerCase() != i) {
        var t = (o.substring(o.length - 1, o.length), "");
        if (t = o.replace(/,/g, "").replace(/;/g, ""), trim(t).length > 0) {
            var r = 0,
                n = !0;
            if ($(".ava_tags li").each(function(a) {
                    r++;
                    var o = $(this).text().substring(0, $(this).text().length - 1);
                    if (trim(t.toLowerCase()) == trim(o.toLowerCase())) {
                        n = !1;
                        var e = "#" + $(this).attr("id");
                        return $(this).addClass("tag_existente"), window.setTimeout(function() {
                            $(e).removeClass("tag_existente", "fast")
                        }, 1500), !1
                    }
                }), t.length > 0 && n) {
                r += 1;
                var s = t.replace(/<script/gi, "&lt;script").replace(/<\/script/gi, "&lt;/script");
                $(".ava_tags").append('<li id="' + r + '">' + s + '<span class="lajo_x FontAwesome"><a class="" href="javascript: void(0);" onclick="fecharTag(' + r + ', 0, 0)"></a></span></li>')
            }
        }
        $("#iTags").val("")
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
        theme_advanced_resizing: !1,
        extended_valid_elements: "a[name|href|target|title|onclick],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style]",
        template_external_list_url: "example_template_list.js",
        file_browser_callback: "fileBrowserCallBack",
        flash_wmode: "transparent",
        flash_quality: "high",
        flash_menu: "false",
        media_use_script: !1,
        theme_advanced_resizing: !0,
        theme_advanced_resize_horizontal: !1
    })
}

function fileBrowserCallBack(a, o, e, i) {
    var t = $("#dirUsuario").val();
    data = new Date, agora = data.getTime(), UploadUmArquivo("strImagemEditor", "fEtapa", t, agora, "jpg,gif,bmp", "AtualizaImagem"), _win = i, _field_name = a
}

function AtualizaImagem() {
    _win.document.forms[0].elements[_field_name].value = document.getElementById("strImagemEditor").value
}

function UploadUmArquivo(a, o, e, i, t, r) {
    var n;
    n = null == r ? window.open("/Recursos/EdHtmlNovo/enviar_tiny.asp?NomeCampo=" + a + "&NomeForm=" + o + "&DirDestino=" + e + "&NomeDestino=" + i + "&TiposArquivos=" + t + "&wMaxImageResize=" + wMaxImageResize + "&hMaxImageResize=" + hMaxImageResize, "wndEnviar", "height=130,width=330") : window.open("/Recursos/EdHtmlNovo/enviar_tiny.asp?NomeCampo=" + a + "&NomeForm=" + o + "&DirDestino=" + e + "&NomeDestino=" + i + "&TiposArquivos=" + t + "&NomeFuncao=" + r + "&wMaxImageResize=" + wMaxImageResize + "&hMaxImageResize=" + hMaxImageResize, "wndEnviar", "height=130,width=330"), n.focus()
}

function retornaUsuariosAgendamentoIndividual(a, o, e, i, t) {
    $(".ta_alunos_container").html("<div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>"), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaUsuariosAgendamento",
        data: {
            idRotaAgendamento: a,
            idTurma: o,
            idAluno: e
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(o) {
            $(".ta_alunos_container").html(o);
            var r = $(".ta_alunos_ft:first img").attr("id");
            // i || r == e ? ($("#btPrevAluno").removeAttr("onclick"), $("#btPrevAluno").addClass("disable")) : ($("#btPrevAluno").attr("onclick", "prev(" + a + ")"), $("#btPrevAluno").removeClass("disable"));
            r == e ? ($("#btPrevAluno").removeAttr("onclick"), $("#btPrevAluno").addClass("disable")) : ($("#btPrevAluno").attr("onclick", "prev(" + a + ")"), $("#btPrevAluno").removeClass("disable"));
            
            var n = $(".ta_alunos_ft:last img").attr("id");
            e == n ? ($("#btNextAluno").removeAttr("onclick"), $("#btNextAluno").addClass("disable")) : ($("#btNextAluno").attr("onclick", "next(" + a + ")"), $("#btNextAluno").removeClass("disable")), $(".b_tooltip_center").each(function() {
            // t || e == n ? ($("#btNextAluno").removeAttr("onclick"), $("#btNextAluno").addClass("disable")) : ($("#btNextAluno").attr("onclick", "next(" + a + ")"), $("#btNextAluno").removeClass("disable")), $(".b_tooltip_center").each(function() {
            
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: !0,
                    events: {
                        def: "mouseover, mouseout"
                    }
                })
            })
        },
        error: function(a) {
            0 == a.status ? $(".ta_alunos_container").empty() : $(".ta_alunos_container").html("erro ao listar usuários do agendamento!")
        }
    })
}

function corrigeAluno(a, o, e, i, t) {
    $("#container_painelcontrole").css("min-height", $("#container_painelcontrole").height()), $("html, body").animate({
        scrollTop: $("#container_painelcontrole").offset().top
    }, 1e3), $("#container_painelcontrole").html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>"), 0 == a && $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaPrimeiroUsuarioTurma/",
        data: {
            idRotaAgendamento: o,
            idTurma: e
        },
        success: function(o) {
            a = o
        },
        error: function(a) {
            0 == a.status ? $("#container_alunoagendamento").empty() : $("#container_alunoagendamento").html("erro ao listar agendamento individual do usuário.")
        }
    }), $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaAgendamentoByIdRotaAgendamento/",
        data: {
            idAluno: a,
            idRotaAgendamento: o,
            idTurma: e
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(r) {
            $("#container_painelcontrole").html(r), $("#container_alunoagendamento").html("<tr><td><div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div><td><tr>"), $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaEtapasAgendadasUsuarioByIdRotaAgendamentoByIdAluno/",
                data: {
                    idAluno: a,
                    idRotaAgendamento: o,
                    idTurma: e
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(r) {
                    $("#container_alunoagendamento").html(r), retornaUsuariosAgendamentoIndividual(o, e, a, i, t), $(".sTurmas").change(function() {
                        $idTurma = $(this).find("option").filter(":selected").attr("id"), corrigeAluno(0, o, $idTurma, !1, !1)
                    }),
                    
                    $(".grade input").focus(function() {
                        $(this).removeClass("ava_field_alert")
                    }).numeric({
                        allow: "."
                    })
                },
                error: function(a) {
                    0 == a.status ? $("#container_alunoagendamento").empty() : $("#container_alunoagendamento").html("erro ao listar agendamento individual do usuário.")
                }
            })
        },
        error: function(a) {
            0 == a.status ? $("#container_painelcontrole").empty() : $("#container_painelcontrole").html("erro ao listar agendamento do usuário.")
        }
    })
}


function visualizaAluno( idUsuario , idRotaAgendamento , strFoto, idTurma   ){

    // corrigeAluno(<%=usuarios.id%>, <%=idAgendamento%>, 0);
    var a = idUsuario;
    var o = idRotaAgendamento ;
    var e = idTurma ;

    var strHtmlDados = '';
    var aux = '';

    $('#dados-tarefa-aluno').html('');


    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/RetornaAnexoUsuario/",
        data: {
            idAluno: a,
            idRotaAgendamento: o,
            idTurma: e
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(result) {


                $('#loadAtividades').show();

                
                $('#ta_desc').addClass('ta_desc');
            

                strHtmlDados = '<h3>Aluno</h3>'+
                                    '<div id="aluno_atividade">'+
                                        '<img src="'+result.turmaAgendamento.lUsuarioAgendamento[0].strFoto+'" width="170" height="170">'+
                                        '<h4 class="blokletters">'+result.turmaAgendamento.lUsuarioAgendamento[0].strNome+'</h4></div>'+'<div class="dados-anexo-tarefa">';

                                if(result.retult.lArquivos.length > 0){
                                    strHtmlDados = strHtmlDados +'<h1 class="blokletters">Anexos:</h1>';

                                        $.each( result.retult.lArquivos  , function(ix, item) {


                                            aux = aux +

                                            '<div class="container_inlinks">'+

                                            //string strDiretorio = item.strDiretorio + "/" + item.strArquivo + item.strExtensao;
                                    
                                            '<div class="the_insertedLink">'+
                                                '<a target="_blank" href="'+ item.strDiretorio + "/" + item.strArquivo + item.strExtensao +'" class="umlink"><span class="umarquivo"></span>'+item.strArquivo+'</a>'+
                                                
                                                //<a target="_blank" href="<%=strDiretorio%>" class="umlink"><span class="umarquivo"></span><%=material.strArquivo%></a>                        
                                                

                                            '</div></div>';

                                        });
                                }


                strHtmlDados = strHtmlDados + aux + '</div>' ;

                $('#dados-tarefa-aluno').append(strHtmlDados);

                $('#loadAtividades').hide();


            
        },
        error: function(error){

        }
    });


    


    // <div  id="ta_desc">
    
    // <!-- <h3>Aluno</h3>
    
    // <div id="aluno_atividade"> -->
    
    //     <!-- <div class="ta_desc_corr"> -->
        
    //         <!-- <a href="javascript: void(0);" id="btPrevAluno" class="bt_normal disable">« Anterior</a>
    //         <a href="javascript: void(0);" id="btNextAluno" class="bt_normal" onclick="next(180117)">Próximo »</a>     -->
            
    //     <!-- <img src="/userData/ava/repositorio/11993/11993917/Imagens/201892493237_170.Jpeg" width="170" height="170">
    //     <h4 class="blokletters">Aluno 01 - QA (PE/PP)</h4>
    //     <h1 class="blokletters">Anexos:</h1>
    //     <h4 class="blokletters">asdasdasdasdasdasdasdasda</h4> -->
        
        
        
    // <!-- </div> -->

    // <!-- </div> -->

// </div>



    // $("#container_painelcontrole").css("min-height", $("#container_painelcontrole").height()), $("html, body").animate({
    //     scrollTop: $("#container_painelcontrole").offset().top
    // // }, 1e3), $("#container_painelcontrole").html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>"), 0 == a && $.ajax({
    // }, 1e3), $("#container_painelcontrole").html("<div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>"), 0 == a && $.ajax({

    //     type: "POST",
    //     url: "/AVA/Caminhos/Home/RetornaPrimeiroUsuarioTurma/",
    //     data: {
    //         idRotaAgendamento: idRotaAgendamento,
    //         idTurma: idTurma
    //     },
    //     success: function(result) {
    //         console.log( JSON.stringify(result) );
    //     },
    //     error: function(a) {
    //         0 == a.status ? $("#container_alunoagendamento").empty() : $("#container_alunoagendamento").html("erro ao listar agendamento individual do usuário.")
    //     }
    // }), 
    
    
    
    
    // $.ajax({
    //     type: "POST",
    //     url: "/AVA/Caminhos/Home/ListaAgendamentoByIdRotaAgendamento/",
    //     data: {
    //         idAluno: a,
    //         idRotaAgendamento: o,
    //         idTurma: e
    //     },
    //     contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    //     success: function(r) {
    //         $("#container_painelcontrole").html(r), $("#container_alunoagendamento").html("<tr><td><div style='margin-top: 10px;' align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div><td><tr>"), $.ajax({
    //             type: "POST",
    //             url: "/AVA/Caminhos/Home/ListaEtapasAgendadasUsuarioByIdRotaAgendamentoByIdAluno/",
    //             data: {
    //                 idAluno: a,
    //                 idRotaAgendamento: o,
    //                 idTurma: e
    //             },
    //             contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    //             success: function(r) {

    //                 console.log( r  );

    //                 $("#container_alunoagendamento").html(r);


    //                 retornaUsuariosAgendamentoIndividual(o, e, a, 0, 0);

    //                 // $(".sTurmas").change(function() {
    //                 //     $idTurma = $(this).find("option").filter(":selected").attr("id"), corrigeAluno(0, o, $idTurma, !1, !1)
    //                 // });

    //                 // $(".grade input").focus(function() {
    //                 //     $(this).removeClass("ava_field_alert")
    //                 // }).numeric({
    //                 //     allow: ".,"
    //                 // });

    //                 // $("#container_alunoagendamento").html(r), retornaUsuariosAgendamentoIndividual(o, e, a, i, t), $(".sTurmas").change(function() {
    //                 //     $idTurma = $(this).find("option").filter(":selected").attr("id"), corrigeAluno(0, o, $idTurma, !1, !1)
    //                 // }), $(".grade input").focus(function() {
    //                 //     $(this).removeClass("ava_field_alert")
    //                 // }).numeric({
    //                 //     allow: ".,"
    //                 // })
    //             },
    //             error: function(a) {
    //                 0 == a.status ? $("#container_alunoagendamento").empty() : $("#container_alunoagendamento").html("erro ao listar agendamento individual do usuário.")
    //             }
    //         })
    //     },
    //     error: function(a) {
    //         0 == a.status ? $("#container_painelcontrole").empty() : $("#container_painelcontrole").html("erro ao listar agendamento do usuário.")
    //     }
    // })


}


function next(a) {
    var o = $(".ta_alunos_ft:last img").attr("id"),
        e = $(".ta_selected").next().children(":first").attr("id"),
        i = !1;
    o == e && (i = !0), corrigeAluno(e, a, 0, !1, i)
}

function prev(a) {
    var o = $(".ta_alunos_ft:first img").attr("id"),
        e = $(".ta_selected").prev().children(":first").attr("id"),
        i = !1;
    o == e && (i = !0), corrigeAluno(e, a, 0, i, !1)
}

function dataInvalida(a) {
    var o = /^(([0-2]\d|[3][0-1])\/([0]\d|[1][0-2])\/[1-2][0-9]\d{2})$/;
    return a.match(o) && "" != a ? !1 : !0
}

function paginacaoCaminhos(a, o, e, i, t, r, n, s) {
    var l = 0;
    $("#container_painelcontrole #caminhos_paginando").html("<tr><td colspan='4'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>"), $.ajax({
        url: "/AVA/Caminhos/home/SelecionaCaminhosTotal/",
        data: {
            strStatus: a,
            intMeus: o,
            intEscola: e,
            intPortal: i,
            strPesquisa: t,
            dtmInicio: r,
            dtmFim: n,
            strPesquisaUsuarios: s
        },
        async: !1,
        success: function(a) {
            l = a
        },
        error: function(a) {
            0 != a.status && console.debug("Nao foi possivel obter o numero de resultados")
        }
    }), quantidadePorPagina = 10, l = parseInt(l), $("#Pagination").pagination(l, {
        items_per_page: quantidadePorPagina,
        num_display_entries: 5,
        current_page: 0,
        num_edge_entries: 1,
        link_to: "javascript:void(0);",
        callback: retornaPaginaCaminhos
    }), quantidadePorPagina >= l ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
}

function paginacaoTarefas(a, o, e, i, t, r, n, s) {
    var l = 0;
    $("#container_painelcontrole #caminhos_paginando").html("<tr><td colspan='4'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>"), $.ajax({
        url: "/AVA/Caminhos/home/SelecionaTarefasTotal/",
        data: {
            strStatus: a,
            intMeus: o,
            intEscola: e,
            intPortal: i,
            strPesquisa: t,
            dtmInicio: r,
            dtmFim: n,
            strPesquisaUsuarios: s
        },
        async: !1,
        success: function(a) {
            l = a
        },
        error: function(a) {
            0 != a.status && console.debug("Nao foi possivel obter o numero de resultados")
        }
    }), quantidadePorPagina = 10, l = parseInt(l), $("#Pagination").pagination(l, {
        items_per_page: quantidadePorPagina,
        num_display_entries: 5,
        current_page: 0,
        num_edge_entries: 1,
        link_to: "javascript:void(0);",
        callback: retornaPaginaTarefas
    }), quantidadePorPagina >= l ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
}

function retornaPaginaCaminhos(a, o) {
    rodarGlobal > 0 && RetornaCaminhosPaginando(a, strIntStatusGlobal, intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal, bolFiltrandoGlobal, strPesquisaUsuarios), rodarGlobal += 1
}

function retornaPaginaTarefas(a, o) {
    rodarGlobal > 0 && RetornaTarefasPaginando(a, strIntStatusGlobal, intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal, bolFiltrandoGlobal, strPesquisaUsuarios), rodarGlobal += 1
}

function paginacaoAgendadas(a, o, e, i, t, r, n, s, l) {
    var c = 0;
    "undefined" == s && (s = "");
    var d = "False" == $("#bolAdmin").val() ? 6 : 7;
    $("#container_painelcontrole #agendadas_paginando").html("<tr><td colspan='" + d + "'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>");
    var u = "";
    u = 1 == l ? "/AVA/Caminhos/home/SelecionaAgendadasTotal/" : "/AVA/Caminhos/home/SelecionaAgendadasGrupoTotal/", $.ajax({
        url: u,
        data: {
            idCaminho: a,
            intAberto: o,
            intEmBreve: e,
            intEncerrado: i,
            strPesquisa: t,
            dtmInicio: r,
            dtmFim: n,
            strPesquisaUsuarios: s
        },
        async: !0,
        success: function(a) {

            if (l == 1) {
                $("#rbTpGerais").attr("checked", "checked") 
            }
            else{
                $("#rbTpGrupos").attr("checked", "checked");
            }

            c = a, quantidadePorPagina = 10, c = parseInt(c), 1 == l ? $("#Pagination").pagination(c, {
                items_per_page: quantidadePorPagina,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: retornaPaginaAgendadas
            }) : $("#Pagination").pagination(c, {
                items_per_page: quantidadePorPagina,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: retornaPaginaAgendadasGrupo
            }), quantidadePorPagina >= c ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
        },
        error: function(a) {
            0 != a.status && console.debug("Nao foi possivel obter o numero de resultatos")
        }
    })
}

function paginacaoAgendadasAlunos(a, o, e, i, t, r, n, s, l) {
    var c = 0;
    "undefined" == s && (s = "");
    var d = "";
    1 == o && (d += "1,"), 1 == e && (d += "2,"), 1 == i && (d += "3,4");
    var u = "False" == $("#bolAdmin").val() ? 6 : 7;
    $("#container_painelcontrole #agendadas_paginando").html("<tr><td colspan='" + u + "'><div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div></td></tr>");
    var m = "";
    m = 1 == l ? "/AVA/Caminhos/home/BancoAtividadesAlunosTotalByCoord/" : "/AVA/Caminhos/home/BancoAtividadesAlunosGrupoTotalByCoord/", $.ajax({
        url: m,
        data: {
            dtmFim: n,
            dtmInicio: r,
            idProfessor: 0,
            strAtividade: t,
            strPesquisaUsuarios: s,
            strStatus: d,
            tipoAtividade: "1,2"
        },
        async: !0,
        success: function(a) {
            c = a, quantidadePorPagina = 10, c = parseInt(c), 1 == l ? $("#Pagination").pagination(c, {
                items_per_page: quantidadePorPagina,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: retornaPaginaAgendadasAlunos
            }) : $("#Pagination").pagination(c, {
                items_per_page: quantidadePorPagina,
                num_display_entries: 5,
                current_page: 0,
                num_edge_entries: 1,
                link_to: "javascript:void(0);",
                callback: retornaPaginaAgendadasAlunosGrupo
            }), quantidadePorPagina >= c ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
        },
        error: function(a) {
            0 != a.status && console.debug("Nao foi possivel obter o numero de resultatos")
        }
    })
}

function retornaPaginaAgendadas(a, o) {
    rodar > 0 && retornaAgendadasPaginando(a, idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento, strPesquisaUsuarios), rodar += 1
}

function retornaPaginaAgendadasGrupo(a, o) {
    rodar > 0 && retornaAgendadasGrupoPaginando(a, idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento, strPesquisaUsuarios), rodar += 1
}

function retornaPaginaAgendadasAlunos(a, o) {
    rodar > 0 && retornaAgendadasPaginandoAlunos(a, idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento, strPesquisaUsuarios), rodar += 1
}

function retornaPaginaAgendadasAlunosGrupo(a, o) {
    rodar > 0 && retornaAgendadasPaginandoAlunosGrupo(a, idCaminho, intAberto, intEmBreve, intEncerrado, strPesquisaAgendamento, dtmInicioAgendamento, dtmFimAgendamento, strPesquisaUsuarios), rodar += 1
}

function simularAvaliacao(a) {
    window.open("/ava/avaliacoes/Agendamento/VisualizacaoProva/" + a, "wnvsimularavaliacao", "width=799,height=480, scrollbars=1, resizable=yes")
}

function salvarAlteracoesEtapaAluno() {
    var a = $("#idAluno").val(),
        o = $("#idRotaAgendamentoSalvar").val(),
        e = 0;
    $(".comentarioEtapaAluno").each(function() {
        e++
    }), $("#btSalvarAlteracao").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Salvando..."), $(".comentarioEtapaAluno").each(function(i) {
        i++;
        var t = "#" + $(this).attr("id"),
            r = t.split("_"),
            n = r[1];


        // var note =  $('#idNota_last').val();

        var note =  $('#nota_'+n).val() ;

        if( note == undefined  ){

            note = $('#tdnotas_'+n).find('span').text();
        
        }

        // if( note === ""  ){
        //     note = 0;
        // }

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/home/SalvarComentarioEtapaAluno/",
            data: {
                idAluno: a,
                idRotaAgendamento: o,
                idEtapa: n,
                txtComentario: $(t).val(),
                nota: note
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(t) {
                var r = "#nota_" + n,
                    s = $(r).val(),
                    l = $("#notamaxima_" + n).text();
                if (0 != s && void 0 != s && (s = s.replace(",", "."), l = l.replace(",", "."), void 0 != s)) {
                    if ("" == s) return $(r).addClass("ava_field_alert"), $("html, body").animate({
                        scrollTop: $(r).offset().top
                    }, 1e3), $("#btSalvarAlteracao").html('<a class="ne-salvar large awesome awesome-green " href="javascript:void(0);" onclick="salvarAlteracoesEtapaAluno();">Salvar alterações</a>'), !1;
                    if (parseFloat(s) > parseFloat(l)) return jAlert("Nota acima do valor máximo.", ""), $("#btSalvarAlteracao").html('<a class="ne-salvar large awesome awesome-green " href="javascript:void(0);" onclick="salvarAlteracoesEtapaAluno();">Salvar alterações</a>'), !1;
                    if (parseInt(s) < 0) return jAlert("Digite uma nota igual ou maior do que zero.", ""), $("#btSalvarAlteracao").html('<a class="ne-salvar large awesome awesome-green " href="javascript:void(0);" onclick="salvarAlteracoesEtapaAluno();">Salvar alterações</a>'), !1;
                    s = s.replace(".", ","), l = l.replace(".", ","), $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/home/SalvarNotaEtapaAluno/",
                        data: {
                            idAluno: a,
                            idRotaAgendamento: o,
                            idEtapa: n,
                            notaEtapaAluno: s
                        },
                        error: function(a) {
                            0 != a.status && console.debug("Nao foi possivel salvar a nota do aluno.")
                        }
                    })
                }
                i == e && $("#btSalvarAlteracao").html('<a class="ne-salvar large awesome awesome-green " href="javascript:void(0);" onclick="salvarAlteracoesEtapaAluno();">Salvar alterações</a>')
            },
            error: function(a) {
                0 != a.status && console.debug("Nao foi possivel salvar o comentario do aluno")
            }
        })
    })
}

function verOrientacoes(a) {
    $.ajax({
        type: "GET",
        url: $("#btVer_" + a).attr("href"),
        success: function(a) {
            $.fancybox(a, {
                autoSize: !1,
                width: 685,
                height: 565,
                autoResize: !1,
                fitToView: !1,
                autoResize: !1,
                helpers: {
                    overlay: {
                        closeClick: !1,
                        locked: !1
                    }
                },
                afterShow: function() {
                    $(".iframeVideoVimeo").on("load", function() {
                        var a = $f(this),
                            o = !1;
                        a.api("pause"), a.addEvent("ready", function() {
                            a.addEvent("play", function() {
                                o || (o = !0, a.api("pause"))
                            })
                        })
                    })
                }
            })
        },
        error: function(a) {
            console.debug(a)
        }
    })
}

function valida_data(a) {
    if (void 0 !== a && "" != a) {
        var o = new Array,
            e = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
        return o = a.split("/"), erro = !1, -1 == a.search(e) ? erro = !0 : (4 == o[1] || 6 == o[1] || 9 == o[1] || 11 == o[1]) && o[0] > 30 ? erro = !0 : 2 == o[1] && (o[0] > 28 && o[2] % 4 != 0 && (erro = !0), o[0] > 29 && o[2] % 4 == 0 && (erro = !0)), o[2] < 1800 ? (alert("O ano deve ser superior a 1800."), !1) : erro ? (alert("Data inválida!"), !1) : !0
    }
    return !0
}

function excluirAgendamento(a) {
    var o = {
        autoSize: !1,
        width: 550,
        height: "auto",
        autoResize: !1,
        fitToView: !1,
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        fitToView: !1,
        type: "ajax",
        autoResize: !1,
        href: "/AVA/Caminhos/Home/SelecionaExclusaoAgendamento/" + a,
        afterShow: function() {
            var o = $("input[type=checkbox][name='cbTurmaAgendada']").length > 0,
                e = $("input:radio[name='tpAgendamento']:checked").val();
            $("#btCancelarAgendamento").click(function() {
                $.fancybox.close()
            }), $("#btExcAgendamento").click(function() {
                var i = $("input[type=checkbox][name='cbTurmaAgendada']:checked").length;
                i > 0 ? $("input[type=checkbox][name='cbTurmaAgendada']:checked").each(function(o) {
                    var i = $(this).val();
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/RetornaUsuariosTurmasCancelarAgendamentoAvaliavao",
                        data: {
                            idRotaAgendamento: a,
                            idTurma: i
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(o) {
                            var t = o.split("_");
                            if (t[2] > 0) {
                                var r = t[2],
                                    n = "",
                                    s = "";
                                "0" != t[1] && (n = t[1]), "0" != t[0] && (s = t[0]), (n.length > 0 || s.length > 0) && $.ajax({
                                    type: "POST",
                                    async: !1,
                                    url: "/AVA/Avaliacoes/Aplicacao/SalvarAgendamento",
                                    data: {
                                        agendamento: r,
                                        usuarios: n,
                                        turmas: s,
                                        periodo: 0
                                    },
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    success: function(a) {},
                                    error: function(a) {
                                        0 != a.status && console.debug("erro ao inserir agendamento!")
                                    }
                                })
                            }
                            $.ajax({
                                type: "POST",
                                url: "/ava/caminhos/home/ExcluirAgendamentoPorTurma/",
                                data: {
                                    idRotaAgendamento: a,
                                    idTurma: i
                                },
                                success: function(o) {
                                    $.ajax({
                                        type: "POST",
                                        url: "/AVA/Caminhos/Home/SalvarCancelamentoMensagemRapidaAtividade",
                                        data: {
                                            destino: i,
                                            idRotaAgendamento: a
                                        },
                                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                        success: function(a) {
                                            abrirAgendamento(0, 1, 1, 1, "", "", "", !1, void 0, void 0, void 0, e), $.fancybox.close()
                                        },
                                        error: function(a) {
                                            0 != a.status && console.debug("erro ao postar cancelamento de agendamento!")
                                        }
                                    })
                                },
                                error: function(a) {
                                    0 != a.status && console.debug("Nao foi possivel excluir o agendamento da turma " + i)
                                }
                            })
                        },
                        error: function(a) {
                            0 != a.status && console.debug("erro ao buscar destinatario de agendamento!")
                        }
                    })
                }) : o ? alert("Selecione pelo menos uma turma!") : $.ajax({
                    type: "POST",
                    url: "/ava/caminhos/home/ExcluirAgendamentoSemTurma/",
                    data: {
                        idRotaAgendamento: a
                    },
                    success: function(a) {
                        abrirAgendamento(0, 1, 1, 1, "", "", "", !1, void 0, void 0, void 0, e), $.fancybox.close()
                    },
                    error: function(a) {
                        0 != a.status && console.debug("Nao foi possivel excluir o agendamento")
                    }
                })
            })
        }
    };
    return $.fancybox(o), !1
}

function listaAvaliacoesCaminhos(a, o, e) {
    $("#linha_filtro").css("display", ""), $("#linha_header_tbl,#recursoitem_ava").css("display", ""), $("#recursoitem_ava").attr("colspan", "2"), $("#recursoitem_ava").attr("class", "tablefix"), $("#recursoitem_ava").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $("#strPesquisa").val(a), $("#dtmInicioAval").val(o), $("#dtmFimAval").val(e), montaLajotinhaFiltroAvaliacaoCaminho(a, o, e), $.ajax({
        url: "/AVA/Caminhos/Home/RetornaRecurso/?idCategoria=0",
        async: !1,
        success: function(i) {
            $("#recurso_ava").html(i).css("display", ""), $(".ph").addPlaceholder(), $.ajax({
                type: "POST",
                url: "/AVA/Avaliacoes/Agendamento/ListagemAvaliacoes",
                async: !1,
                data: {
                    pagina: 1,
                    tamanho: quantidadePorPaginaGlobal,
                    limite: 5,
                    ordem: "nome,0",
                    nome: a,
                    datainicio: o,
                    datafim: e,
                    origem: 0
                },
                success: function(i) {
                    var t = 0;
                    try {
                        t = -1 == i.erro.id ? 0 : i.Paginacao.Total
                    } catch (r) {
                        t = i.Paginacao.Total
                    }
                    strPesquisaGlobal = a, dtmInicioGlobal = o, dtmFimGlobal = e, $("#Pagination").pagination(t, {
                        items_per_page: quantidadePorPaginaGlobal,
                        num_display_entries: 5,
                        current_page: 0,
                        num_edge_entries: 1,
                        link_to: "javascript:void(0);",
                        callback: listaAvaliacoesCaminhosPaginado
                    }), quantidadePorPaginaGlobal >= t ? $("#mostraPaginas").hide() : $("#mostraPaginas").is(":hidden") && $("#mostraPaginas").show()
                },
                error: function(a) {
                    0 != a.status && console.debug("Não foi possível obter o numero de resultados da avaliação")
                }
            })
        },
        error: function(a) {
            0 == a.status ? $("#recurso_ava").empty() : $("#recurso_ava").html("erro ao listar os recursos")
        }
    })
}

function listaAvaliacoesCaminhosPaginado(a, o) {
    strTitulo = strPesquisaGlobal, dtmInicio = dtmInicioGlobal, dtmFim = dtmFimGlobal, a += 1, $.ajax({
        type: "POST",
        url: "/AVA/Avaliacoes/Agendamento/ListagemAvaliacoes",
        async: !1,
        data: {
            pagina: a,
            tamanho: quantidadePorPaginaGlobal,
            limite: 5,
            ordem: "nome,0",
            nome: strTitulo,
            datainicio: dtmInicio,
            datafim: dtmFim,
            origem: 0
        },
        success: function(a) {
            try {
                -1 == a.erro.id ? $("#recursoitem_ava").html('<tr><td colspan="2">Nenhuma avaliação encontrada.</td></tr>') : $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/RetornaListaAvaliacoes",
                    data: {
                        jsonListaAvaliacao: jQuery.toJSON(a)
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function(a) {
                        $("#recursoitem_ava").html(a), Modernizr.touch && ($(".ava_ativtable table").addClass("mobile"), $(".table_aberta").addClass("mobile"))
                    },
                    error: function(a) {
                        0 != a.status && console.debug("erro ao listar avaliacao")
                    }
                })
            } catch (o) {
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/RetornaListaAvaliacoes",
                    data: {
                        jsonListaAvaliacao: jQuery.toJSON(a)
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function(a) {
                        $("#recursoitem_ava").html(a), Modernizr.touch && ($(".ava_ativtable table").addClass("mobile"), $(".table_aberta").addClass("mobile"))
                    },
                    error: function(a) {
                        0 != a.status && console.debug("erro ao listar avaliacao")
                    }
                })
            }
        },
        error: function(a) {
            0 != a.status && console.debug("Não foi possível obter lista de avaliação")
        }
    })
}

function abreAvaliacao(a, o, e, i) {
    var t = a,
        r = o;
    $.fancybox({
        href: "/ava/caminhos/home/AbrirBoxAvaliacao",
        autoSize: !1,
        width: 800,
        height: 600,
        autoResize: !1,
        fitToView: !1,
        type: "ajax",
        autoCenter: !0,
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        afterShow: function() {
            $("#abrirAvalicaoBox").avaliacoescorrecao({
                varAluno: r,
                varAplicacao: t,
                varQtdPorPagina: 1,
                funcaoErro: callBackErro,
                funcaoSucesso: callBackErro,
                caminhoBase: "/ava/avaliacoes/"
            })
        },
        beforeClose: function() {
            $.ajax({
                type: "POST",
                url: "/AVA/avaliacoes/Realizacao/StatusRealizacaoUsuarioJson/" + a + "/0/" + o,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(a) {
                    var t = a.correcaoCompleta,
                        r = a.nota;
                    1 == t && $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/SalvarNotaNovaAvaliacaoEtapaAluno",
                        data: {
                            idRotaAgendamento: i,
                            idEtapa: e,
                            nota: r,
                            idAluno: o
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(a) {
                            parseInt($("#notamaxima_" + e).text());
                            $("#tdnotas_" + e + " span").length > 1 ? ($("#tdnotas_" + e + " span").first().html(r), $("#tdnotas_" + e + " a").text("alterar")) : ($("#tdnotas_" + e).prepend('<span class="grade">' + r + "</span>"), $("#tdnotas_" + e + " a").text("alterar"))
                        },
                        error: function(a) {
                            0 != a.status && console.debug("erro ao salvar nota da etapa do aluno")
                        }
                    })
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao listar status avaliacao")
                }
            })
        }
    })
}

function EscondeOsObjects() {
    var a = document.getElementsByTagName("object");
    for (i = 0; i < a.length; i++) a[i].style.display = "none"
}

function MostraOsObjects() {
    var a = document.getElementsByTagName("object");
    for (i = 0; i < a.length; i++) a[i].style.display = "block"
}

function carregaSeletorAdmins(a, o) {
    var e = {
        bolAluno: a,
        bolResponsavel: !1,
        bolProfessor: o,
        bolLajota: !0,
        bolEscondeTituloExterno: !0,
        caixaLajotaExterna: $("#le_filtros_pesquisaUsuario"),
        bolSeletorFinalizar: !1,
        btnTextoBotaoConclusaoSeletor: "Selecionar",
        botaoConclusao: $("#btFiltrar"),
        bolSelecionarTodos: !1,
        usuarioGrupoAdicionado: function(a, o, e) {
            arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
            for (var i = 0; i < a.length; i++) arrayUsuariosAux.push(a[i])
        },
        carregarUsuarios: arrayUsuariosAux
    };
    $("#divSelecaoUsuarios").AvaSelector(e)
}

function excluirArquivoAoEditar(a, o) {
    var e = ".cx_arq_aux_" + a,
        i = [];
    $(e + " .the_insertedMedia .bt_normal").each(function() {
        $(this).attr("idArquivo") != o ? i.push({
            id: $(this).attr("idArquivo")
        }) : $(this).parent().remove()
    }), arrayArquivosUpload = new Object, arrayArquivosUpload.arrayArquivo = i;
    var t = new Array;
    t.push(o);
    var r = {
        idFerramenta: a,
        arquivos: t
    };
    $.ajax({
        type: "POST",
        url: "/AVA/Upload/Home/ExcluiArquivoFerramenta/",
        data: {
            json: JSON.stringify(r)
        },
        async: !1,
        success: function(a) {
            salvarEtapa(!1, !1)
        },
        error: function(a) {
            0 != a.status && console.debug("erro ao excluir material de apoio!")
        }
    })
}
var strIntStatusGlobal, intMeusGlobal, intEscolaGlobal, intPortalGlobal, strPesquisaGlobal, dtmInicioGlobal, dtmFimGlobal, bolFiltrandoGlobal, rodarGlobal, idCategoriaGlobal, idRecursoGlobal, quantidadePorPagina, quantidadePorPaginaGlobal = 10,
    intResultadoConteudoGlobal, strPesquisaUsuarios = "",
    intVerComoAux = 0,
    arrayUsuariosAux = new Array,
    strHTMLLajotas, strRetornoHtmlUpload = "",
    arrayArquivosUpload, strHTMLTitulo = "",
    passouAgendar = 0;
jQuery(function(a) {
    (void 0 === idRota || "" == idRota) && (a(".step_etapas").children(":first").removeAttr("onclick"), a(".step_conclusao").children(":first").attr("href", "javascript:void(0)")), a(".abrirDetalhesRecursoProfessor").live("click", function(o) {
        o.preventDefault(), visualizarPaginaCM(a(this), a(this).attr("iversao"))
    }), a(".iframeVideoVimeo").on("load", function() {
        var a = $f(this),
            o = !1;
        a.api("pause"), a.addEvent("ready", function() {
            a.addEvent("play", function() {
                o || (o = !0, a.api("pause"))
            })
        })
    }), a(".excluirCaminho").fancybox({
        type: "ajax",
        closeBtn: !1,
        padding: 0,
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        afterShow: function() {
            a("#btnExcluirCaminho").click(function(o) {
                var e = a(this).data("idrota");
                excluirRota(e, !0), a.fancybox.close()
            }), a("#btnCancelarExclusaoCaminho").click(function(o) {
                a.fancybox.close()
            })
        }
    }), a(".excluirTarefaCaminho").fancybox({
        type: "ajax",
        closeBtn: !1,
        padding: 0,
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        afterShow: function() {
            a("#btnExcluirTarefaCaminho").click(function(o) {
                var e = a(this).data("idrota");
                excluirRotaTarefa(e, !0), a.fancybox.close()
            }), a("#btnCancelarExclusaoTarefaCaminho").click(function(o) {
                a.fancybox.close()
            })
        }
    });
    var o = "click";
    Modernizr.touch && (o = "touchstart"), a("body").on(o, ".btnEscorregarAgendadas", function(o) {
        var e = a(this).attr("id");
        a("#agendamento_" + e).is(":visible") ? (a(".bancocaminho_" + e).removeClass("table_selected"), a("#agendamento_" + e).slideUp("slow"), a("#containerescorrega_" + e).slideUp("slow"), a("#seta_" + e).html("&#9660;")) : (a(".bancocaminho_" + e).addClass("table_selected"), a("#agendamento_" + e).slideDown("slow"), a("#seta_" + e).html("&#9650;"), a("#containerescorrega_" + e).html("<div align='center'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></div>"), a.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/RetornaAgendamento/" + e,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(o) {
                a("#containerescorrega_" + e).html(o), a("#containerescorrega_" + e).find(".sTurmas").attr("agendamento", e), a("#containerescorrega_" + e).find("#bt_verMaisDescRota").toggle(function() {
                    a(this).html("veja menos"), a("#containerescorrega_" + e).find("#caminhoDescr").css("display", "none"), a("#containerescorrega_" + e).find("#caminhoDescrCompleto").css("display", "")
                }, function() {
                    a(this).html("veja mais"), a("#containerescorrega_" + e).find("#caminhoDescr").css("display", ""), a("#containerescorrega_" + e).find("#caminhoDescrCompleto").css("display", "none")
                });
                var i = a("#containerescorrega_" + e).find(".sTurmas").find("option").filter(":selected").attr("id");
                retornaUsuariosAgendamento(e, i), a("#containerescorrega_" + e + " .sTurmas").change(function() {
                    retornaUsuariosAgendamento(a(this).attr("agendamento"), a(this).find("option").filter(":selected").attr("id"))
                })
            },
            error: function(o) {
                0 == o.status ? a("#containerescorrega_" + e).empty() : a("#containerescorrega_" + e).html("erro ao listar agendamento!")
            }
        }))
    }), a("#btnAgendarConclusao").live("click", function() {
        if (1 != passouAgendar) {
            var o = a("#idCaminho").val();
            a.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/Agendar/" + o,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(o) {
                    passouAgendar = 1, a("#btnAgendarConclusao").removeAttr("onclick"), a("#btnAgendarConclusao").addClass("disable"), a("#ancora_agendamento").html(o), a("#dataInicio").setMask("date"), a("#dataFim").setMask("date"), a("#horaInicio").setMask("29:59").timepicker({
                        myPosition: "right top",
                        atPosition: "right bottom",
                        onSelect: atualizaHoraInicio
                    }), a("#horaFim").setMask("29:59").timepicker({
                        myPosition: "right top",
                        atPosition: "right bottom",
                        onSelect: atualizaHoraFim
                    }), montaCampoData("#dataInicio", "#dataFim"), a("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function() {
                        a(this).removeClass("ava_field_alert")
                    }), a("#horaInicio").keyup(function() {
                        a("#dInicio").text(a("#dataInicio").val() + " " + a(this).val())
                    }), a("#horaFim").keyup(function() {
                        a("#dFim").text(a("#dataFim").val() + " " + a(this).val())
                    }), a("html, body").animate({
                        scrollTop: a("#ancora_agendamento").offset().top - 60
                    }, 1e3)
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao carregar agendamento")
                }
            })
        }
    })
});
var arrayUsuarioAux = new Array,
    arrayEntidadeAux = new Array;
jQuery(document).ready(function() {
    $("body").on("click", ".mceColorSplitMenu a", function(a) {
        var o = $(this).closest("div.mceColorSplitMenu");
        o.hasClass("mce_forecolor") ? ($("#descricaoetapa_forecolor_menu").hide(), $("#descricaoetapa_forecolor").removeClass("mceSplitButtonSelected")) : o.hasClass("mce_backcolor") && ($("#descricaoetapa_backcolor_menu").hide(), $("#descricaoetapa_backcolor").removeClass("mceSplitButtonSelected"))
    })
}), callBackErro = function(a) {};