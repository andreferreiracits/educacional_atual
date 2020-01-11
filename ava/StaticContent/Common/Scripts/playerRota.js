var intAgendamentoAvaliacaoAux = undefined;
jQuery(function($) {
    var urlname = window.location;
    var pathname = window.location.pathname;
    dominio = urlname.host;
    var i_sLastBarra = pathname.lastIndexOf("/", pathname.length);
    var i_sBLastBarra = pathname.lastIndexOf("/", i_sLastBarra - 1);
    var i_idRota = pathname.substring(i_sBLastBarra + 1, i_sLastBarra);
    var i_idEtapa = pathname.substring(i_sLastBarra + 1, pathname.length);
    $(".placa_amarela").each(function() {
        $(this).removeClass("atual")
    });
    if (pathname.toLowerCase().indexOf("/ava/caminhos/home/player") > -1) {
        $(".abrePlayer").each(function() {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {
                placa.parent().addClass("atual");
                $("#ava_box_player").height(placa.parent().next().height() + 30);
                var idRecurso = placa.attr("idRecurso");
                if (idRecurso == "1" || idRecurso == "9" || idRecurso == "11" || idRecurso == "12") {
                    $("#abas_player li:last").hide()
                } else {
                    if ($("#abas_player li:last").not(":visible")) {
                        $("#abas_player li:last a").text(placa.attr("tituloAba"));
                        $("#abas_player li:last").show()
                    }
                }
                executaPlayer(placa);
                return
            }
        });
        $(".avaliacao").each(function() {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {
                $("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass("atual");
                $("#ava_box_player").height(placa.parent().next().height() + 30);
                var idRecurso = placa.attr("idRecurso");
                if (idRecurso == "1" || idRecurso == "9" || idRecurso == "11" || idRecurso == "12") {
                    $("#abas_player li:last").hide()
                } else {
                    if ($("#abas_player li:last").not(":visible")) {
                        $("#abas_player li:last a").text(placa.attr("tituloAba"));
                        $("#abas_player li:last").show()
                    }
                }
                return
            }
        });
        $(".abreSecao").each(function() {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass("atual");
                $("#ava_box_player").empty();
                $("#ava_box_player").height(placa.parent().next().height() + 0);
                var idRecurso = placa.attr("idRecurso");
                if (idRecurso == "1" || idRecurso == "9" || idRecurso == "11" || idRecurso == "12") {
                    $("#abas_player li:last").hide()
                } else {
                    if ($("#abas_player li:last").not(":visible")) {
                        $("#abas_player li:last a").text(placa.attr("tituloAba"));
                        $("#abas_player li:last").show()
                    }
                }
                executaPlayer(placa);
                return
            }
        });
        $(".abrirObraLiteraria,.abrirJogo").each(function() {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {
                $("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass("atual");
                $("#ava_box_player").empty();
                $("#ava_box_player").height(placa.parent().next().height() + 30);
                var idRecurso = placa.attr("idRecurso");
                if (idRecurso == "1" || idRecurso == "9" || idRecurso == "11" || idRecurso == "12") {
                    $("#abas_player li:last").hide()
                } else {
                    if ($("#abas_player li:last").not(":visible")) {
                        $("#abas_player li:last a").text(placa.attr("tituloAba"));
                        $("#abas_player li:last").show()
                    }
                }
                return
            }
        });
        $(".etapaDoMeuJeito").each(function() {
            placa = $(this).parent();
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            var cxMsg = $(this).parent().next(".etapa_infos");
            if ($_idEtapa == i_idEtapa) {
                $(".placa_amarela").removeClass("atual");
                placa.addClass("atual");
                $("#ava_box_player").empty();
                var idRecurso = placa.children(":first").attr("idRecurso");
                if (idRecurso == "1" || idRecurso == "9" || idRecurso == "11" || idRecurso == "12") {
                    $("#abas_player li:last").hide()
                } else {
                    if ($("#abas_player li:last").not(":visible")) {
                        $("#abas_player li:last a").text(placa.attr("tituloAba"));
                        $("#abas_player li:last").show()
                    }
                }
                trabalho = cxMsg.find(".container_entrega_aluno");
                if (trabalho.attr("class") != "container_entrega_aluno") {
                    if (cxMsg.is(":visible") && placa.hasClass("atual")) {
                        var estaPlaca = placa;
                        setTimeout(function() {
                            var idRotaEtapaUsuario = estaPlaca.children(":first").attr("idRotaEtapaUsuario");
                            var idRotaUsuario = estaPlaca.children(":first").attr("idRotaUsuario");
                            var idEtapa = estaPlaca.children(":first").attr("idEtapa");
                            var idRecurso = estaPlaca.children(":first").attr("idRecurso");
                            var idRotaAgendamento = estaPlaca.children(":first").attr("idRotaAgendamento");
                            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                            verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
                            estaPlaca.find(".sprite_player.bolConcluidoPlaca").addClass("concluido")
                        }, 5000)
                    }
                }
                return
            }
        })
    } else {
        $(".abreSecao").each(function() {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass("atual");
                $("#ava_box_player").height(placa.parent().next().height() + 30);
                var idRecurso = placa.attr("idRecurso");
                if (idRecurso == "1" || idRecurso == "9" || idRecurso == "11" || idRecurso == "12") {
                    $("#abas_player li:last").hide()
                } else {
                    if ($("#abas_player li:last").not(":visible")) {
                        $("#abas_player li:last a").text(placa.attr("tituloAba"));
                        $("#abas_player li:last").show()
                    }
                }
                return
            }
        })
    }
    $(".verConteudo").live("click", function() {
        var este = $(this).closest(".etapa_infos").find(".fecha_X");
        este.trigger("click")
    });
    $(".abreSecao").live("click", function() {
        var idEtapa = $(this).attr("idetapa");
        var idRotaUsuario = $(this).attr("idrotausuario");
        var idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
        var este = $(this).parent().prev().children(":first");
        var idRecurso = $(this).attr("idrecurso");
        $_idEtapa = $(this).attr("idEtapa");
        idRotaAgendamento = location.href.split("rota=");
        idRotaAgendamento = idRotaAgendamento[1].split("&");
        idRotaAgendamento = idRotaAgendamento[0];
        janela = $(this).parent();
        placa = janela.prev().children(":first");
        $(".abas_player_atividades").find(".ui-tabs-selected").removeClass("ui-tabs-selected").removeClass("ui-state-active");
        $(".abas_player_atividades").find("li:last").addClass("ui-state-active").addClass("ui-tabs-selected");
        if (location.href.toLocaleLowerCase().indexOf("/interpretando") > -1) {
            $("#educ_conteudo_interpretando").show()
        }
        if (location.href.toLocaleLowerCase().indexOf("/foruns") > -1) {
            $(".tabelaprincipal").show()
        }
        fecharJanelaDescricao(janela);
        var teste = $(this).parent().find(".container_entrega_aluno");
        if (teste.attr("class") == "container_entrega_aluno") {} else {
            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
            $.ajax({
                url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                data: {
                    idRotaUsuario: idRotaUsuario,
                    idEtapa: $_idEtapa
                },
                cache: false,
                async: true,
                success: function(data) {
                    if (data != "0") {
                        este.find(".sprite_player.bolConcluidoPlaca").addClass("concluido")
                    }
                    verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
                },
                error: function(data) {
                    console.log(data)
                }
            })
        }
    });
    $(".abrePlayer").live("click", function() {
        var idEtapa = $(this).attr("idetapa");
        var idRotaUsuario = $(this).attr("idrotausuario");
        var idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
        var este = $(this).closest(".etapa_infos");
        var idRecurso = $(this).attr("idrecurso");
        var teste = $(this).parent().find(".container_entrega_aluno");
        $(".abas_player_atividades").find(".ui-tabs-selected").removeClass("ui-tabs-selected").removeClass("ui-state-active");
        $(".abas_player_atividades").find("li:last").addClass("ui-state-active").addClass("ui-tabs-selected");
        if ($("div#imgAVAPlayer").size() > 0) {
            $("div#imgAVAPlayer").show()
        }
        if (teste.attr("class") == "container_entrega_aluno") {} else {
            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, i_idRota, true, "normal", "nao");
            $.ajax({
                url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                data: {
                    idRotaUsuario: idRotaAtual,
                    idEtapa: idEtapa
                },
                cache: false,
                async: true,
                success: function(data) {
                    if (data != "0") {
                        este.prev().children(":first").find(".sprite_player.bolConcluidoPlaca").addClass("concluido")
                    }
                    verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
                },
                error: function(data) {
                    console.log(data)
                }
            })
        }
        fecharJanelaDescricao(este);
        $("#ava_box_player").attr("style", "");
        var iframHide = $("#ava_box_player").find("iframe");
        if (iframHide.attr("src") == "about:blank") {
            iframHide.attr("src", iframHide.attr("url"))
        }
        iframHide.show()
    });
    $(".ava_abreAvaliacao").live("click", function() {
        var idRotaUsuario = $(this).attr("idRotaUsuario");
        var idEtapa = $(this).attr("idEtapa");
        var idRecurso = $(this).attr("idRecurso");
        var idRotaAgendamento = $(this).attr("idRotaAgendamento");
        var idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
        var teste = $(this).parent().find(".container_entrega_aluno");
        intAgendamentoAvaliacaoAux = $(this).attr("intordemagendamento");
        if (teste.attr("class") == "container_entrega_aluno") {
            abreAvaliacao($(this))
        } else {
            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "avaliacao", "nao");
            abreAvaliacao($(this))
        }
    });
    if (pathname.toLowerCase().indexOf("/ava/caminhos/home/resumo") > -1) {
        verificaAvaliacaoConcluidaEditaEtapa()
    }
    if (pathname.toLowerCase().indexOf("/ava/caminhos/home/player") > -1) {
        $(".listaEtapas").each(function() {
            idRotaAtual = $(this).attr("idRotaUsuario")
        });
        $(".ava_abreAvaliacao").each(function() {
            var idAvaliacao = $(this).attr("idAvaliacao");
            var intOrdemAgendamento = $(this).attr("intOrdemAgendamento");
            var este = $(this).closest(".etapa_infos").prev().children(":first").find(".sprite_player.bolConcluidoPlaca");
            var idRotaUsuario = $(this).attr("idRotaUsuario");
            var idEtapa = $(this).attr("idEtapa");
            var idRotaAgendamento = $(this).attr("idRotaAgendamento");
            var idRecurso = $(this).attr("idRecurso");
            var idAvaliacao = $(this).attr("idAvaliacao");
            var intOrdemAgendamento = $(this).attr("intOrdemAgendamento");
            $.ajax({
                url: "/AVA/Caminhos/Home/VerificaAvaliacaoConcluidaEditaEtapa",
                data: {
                    idRotaUsuario: idRotaUsuario,
                    idEtapa: idEtapa,
                    idRotaAgendamento: idRotaAgendamento,
                    idRecurso: idRecurso,
                    idAvaliacao: idAvaliacao,
                    intOrdemAgendamento: intOrdemAgendamento
                },
                cache: false,
                async: false,
                success: function(data) {
                    var codigo = data.split(";");
                    if (!isNaN(codigo[0])) {
                        if (codigo[0] != "0" && codigo[0] != "2") {
                            este.addClass("concluido")
                        }
                    } else {
                        console.log(data)
                    }
                },
                error: function(data) {
                    console.log(data.status)
                }
            })
        });
        verificaTodosConcluidosParaEncerrarCaminho(idRotaAtual)
    }
    $(".placa_amarela").live("click", function(e) {
        var placa = $(this).children(":first");
        $(".etapa_infos").hide();
        janelaDescricao = $(this).next();
        var idRecurso = placa.attr("idRecurso");
        janelaDescricao.show();
        $("#ava_box_player").height($(this).next().height() + 30);
        $(".abas_player_atividades").find(".ui-tabs-selected").removeClass("ui-tabs-selected").removeClass("ui-state-active");
        $(".abas_player_atividades").find("li:first").addClass("ui-state-active").addClass("ui-tabs-selected");
        if (idRecurso == "1" || idRecurso == "9" || idRecurso == "11" || idRecurso == "12") {
            $("#abas_player li:last").hide()
        } else {
            if ($("#abas_player li:last").not(":visible")) {
                $("#abas_player li:last a").text(placa.attr("tituloAba"));
                $("#abas_player li:last").show()
            }
        }
        if (idRecurso != "1" && idRecurso != "8" && idRecurso != "3") {
            if (location.href.indexOf("/Player") < 1) {
                console.log('Teste');
                location.href = "/AVA/Caminhos/Home/Player/" + placa.attr("idRotaAgendamento") + "/" + placa.attr("idEtapa")
            } else {
                if (idRecurso == "11") {
                    $("#ava_box_player").empty();
                    $(".placa_amarela").removeClass("atual");
                    placa.parent().addClass("atual");
                    e.preventDefault();
                    rel = placa.attr("rel");
                    idRecurso = parseInt(placa.attr("idRecurso"));
                    idRotaUsuario = placa.attr("idRotaUsuario");
                    idEtapa = placa.attr("idEtapa");
                    idRotaAgendamento = placa.attr("idRotaAgendamento");
                    idRotaEtapaUsuario = placa.attr("idRotaEtapaUsuario");
                    trabalho = placa.parent().next(".etapa_infos").find(".container_entrega_aluno");
                    if (trabalho.attr("class") == "container_entrega_aluno") {} else {
                        $.ajax({
                            url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                            data: {
                                idRotaUsuario: idRotaUsuario,
                                idEtapa: idEtapa
                            },
                            cache: false,
                            async: false,
                            success: function(data) {
                                if (data == "0") {
                                    if (placa.parent().next(".etapa_infos").is(":visible")) {
                                        setTimeout(function() {
                                            var idRotaEtapaUsuario = placa.attr("idRotaEtapaUsuario");
                                            var idRotaUsuario = placa.attr("idRotaUsuario");
                                            var idEtapa = placa.attr("idEtapa");
                                            var idRecurso = placa.attr("idRecurso");
                                            var idRotaAgendamento = placa.attr("idRotaAgendamento");
                                            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                                            verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
                                            placa.find(".sprite_player.bolConcluidoPlaca").addClass("concluido")
                                        }, 5000)
                                    }
                                }
                                verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
                            },
                            error: function(data) {
                                console.log(data)
                            }
                        })
                    }
                    return
                } else {
                    if (idRecurso == "9") {
                        $("#ava_box_player").empty();
                        $(".placa_amarela").removeClass("atual");
                        placa.parent().addClass("atual");
                        e.preventDefault();
                        return
                    } else {
                        executaPlayer(placa)
                    }
                }
            }
        } else {
            if (idRecurso == "3" || idRecurso == "8") {
                location.href = janelaDescricao.prev().children(":first").attr("rel")
            } else {
                if (location.href.indexOf("/Player") < 1) {
                    location.href = "/AVA/Caminhos/Home/Player/" + placa.attr("idRotaAgendamento") + "/" + placa.attr("idEtapa")
                } else {
                    $("#ava_box_player").empty();
                    $(".placa_amarela").removeClass("atual");
                    placa.parent().addClass("atual")
                }
            }
        }
    });
    $("body").on("click", ".botoes_orientacao_player .proximo", function() {
        var este = $(this);
        $(".placa_amarela.atual").removeClass("atual").next().next().trigger("click")
    }).on("click", ".botoes_orientacao_player .anterior", function() {
        var este = $(this);
        $(".placa_amarela.atual").removeClass("atual").prev().prev().trigger("click")
    });
    $("body").on("click", ".orientacoes_player", function(e) {
        var este = $(this);
        $(".abas_player_atividades").find(".ui-tabs-selected").removeClass("ui-tabs-selected").removeClass("ui-state-active");
        este.parent().addClass("ui-state-active").addClass("ui-tabs-selected");
        if (location.href.toLocaleLowerCase().indexOf("/interpretando") > -1) {
            $("#educ_conteudo_interpretando").hide()
        }
        if (location.href.toLocaleLowerCase().indexOf("/foruns") > -1) {
            $(".tabelaprincipal").hide()
        }
        if ($("div#imgAVAPlayer").size() > 0) {
            $("div#imgAVAPlayer").hide()
        }
        if (este.attr("href").indexOf("1") > -1) {
            $(".placa_amarela.atual").next().show();
            if ($("#ifrmPlayer").size() > 0) {
                $("#ifrmPlayer").hide()
            }
        } else {
            $(".placa_amarela.atual").next().find(".verConteudo").trigger("click")
        }
    });
    $("#ava_container").delegate(".abrirObraLiteraria", "click", function() {
        var botaoPDF = $(this);
        rel = botaoPDF.attr("rel");
        idRecurso = parseInt(botaoPDF.attr("idRecurso"));
        idRotaUsuario = botaoPDF.attr("idRotaUsuario");
        idEtapa = botaoPDF.attr("idEtapa");
        idRotaAgendamento = botaoPDF.attr("idRotaAgendamento");
        idRotaEtapaUsuario = botaoPDF.attr("idRotaEtapaUsuario");
        este = $(this).closest(".etapa_infos").prev().children(":first").find(".sprite_player.bolConcluidoPlaca");
        var teste = $(this).closest(".etapa_infos").find(".container_entrega_aluno");
        if (teste.attr("class") == "container_entrega_aluno") {
            window.open(rel, "Obra_Literaria")
        } else {
            if (idRecurso == 9) {
                salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                $.ajax({
                    url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                    data: {
                        idRotaUsuario: idRotaUsuario,
                        idEtapa: idEtapa
                    },
                    cache: false,
                    async: false,
                    success: function(data) {
                        if (data != "0") {
                            este.addClass("concluido")
                        }
                        verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
                    },
                    error: function(data) {
                        console.log(data)
                    }
                });
                window.open(rel, "")
            }
        }
    });
    $("#ava_container").delegate(".abrirJogo", "click", function() {
        var botaoJogo = $(this);
        rel = botaoJogo.attr("rel");
        idRecurso = parseInt(botaoJogo.attr("idRecurso"));
        idRotaUsuario = botaoJogo.attr("idRotaUsuario");
        idEtapa = botaoJogo.attr("idEtapa");
        idRotaAgendamento = botaoJogo.attr("idRotaAgendamento");
        idRotaEtapaUsuario = botaoJogo.attr("idRotaEtapaUsuario");
        este = $(this).closest(".etapa_infos").prev().children(":first").find(".sprite_player.bolConcluidoPlaca");
        var teste = $(this).closest(".etapa_infos").find(".container_entrega_aluno");
        var temJS = false;
        if (rel.indexOf("window.open") == 0) {
            temJS = true
        }
        if (teste.attr("class") == "container_entrega_aluno") {
            if (temJS) {
                eval(rel)
            } else {
                window.open(rel, "Jogo")
            }
        } else {
            if (idRecurso == 12) {
                salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                $.ajax({
                    url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                    data: {
                        idRotaUsuario: idRotaUsuario,
                        idEtapa: idEtapa
                    },
                    cache: false,
                    async: false,
                    success: function(data) {
                        if (data != "0") {
                            este.addClass("concluido")
                        }
                        verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
                    },
                    error: function(data) {
                        console.log(data)
                    }
                });
                if (temJS) {
                    eval(rel)
                } else {
                    window.open(rel, "Jogo")
                }
            }
        }
    });
    $("#ava_container").delegate(".fecha_X", "click", function(e) {
        janela = $(this).parent();
        janela.fadeOut("slow");
        e.preventDefault
    });
    $("#botaoRecuroFecharJanela").live("click", function() {
        $(this).closest(".etapa_infos").find(".fecha_X").trigger("click")
    });
    $(".sobedesce_material").click(function() {
        var idAuxRotaEtapaUsuario = $(this).attr("idAuxRotaEtapaUsuario")
    })
});

function enviarTrabalhoMarcarConcluido(elemento) {
    var idRotaUsuario = elemento.attr("idRotaUsuario");
    var idEtapa = elemento.attr("idEtapa");
    var idRecurso = elemento.attr("idRecurso");
    var idRotaAgendamento = elemento.attr("idRotaAgendamento");
    var idRotaEtapaUsuario = elemento.parent().find(".container_inEntrega").find("input[id^='idFerramenta_']").val();
    if (!(elemento.closest(".etapa_infos").prev().children(":first").find(".sprite_player.bolConcluidoPlaca").hasClass("concluido"))) {
        salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "trabalho", "nao")
    }
    $.ajax({
        url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
        data: {
            idRotaUsuario: idRotaUsuario,
            idEtapa: idEtapa
        },
        async: true,
        cache: false,
        success: function(data) {
            if (data != "0") {
                elemento.closest(".etapa_infos").prev().children(":first").find(".sprite_player.bolConcluidoPlaca").addClass("concluido")
            }
            verificaTodosConcluidosParaEncerrarCaminho(elemento.attr("idRotaUsuario"))
        },
        error: function(data) {
            console.log(data)
        }
    })
}

function enviarTrabalhoMarcarConcluidoFim(idEtapa, idRotaEtapaUsuario) {
    var idRotaUsuario = $("#idRotaUsuario_" + idEtapa).val();
    var idRecurso = $("#idRecurso_" + idEtapa).val();
    var idRotaAgendamento = $("#idRotaAgendamento_" + idEtapa).val();
    if (!($("#etapa_info_" + idEtapa).hasClass("concluido"))) {
        salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "trabalho", "nao")
    }
    $.ajax({
        url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
        data: {
            idRotaUsuario: idRotaUsuario,
            idEtapa: idEtapa
        },
        async: true,
        cache: false,
        success: function(data) {
            if (data != "0") {
                $("#etapa_info_" + idEtapa).addClass("concluido")
            }
            verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
        },
        error: function(data) {
            console.log(data)
        }
    })
}

function abreUploadCaminhosAluno(idEtapa, idRotaEtapaUsuario, idFerramentaTipo, bolCaixaEnvio, intCountEtapa, strNavegador, bolAluno) {
    var idFerramentaTipo = 15;
    var param = {
        idFerramenta: idEtapa,
        idFerramentaTipo: idFerramentaTipo
    };
    var mForm;
    try {
        mForm = document.createElement("<form name='upload'>")
    } catch (ex) {
        mForm = document.createElement("form");
        mForm.name = "upload"
    }
    for (var i in param) {
        if (param.hasOwnProperty(i)) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = i;
            input.value = param[i];
            mForm.appendChild(input)
        }
    }
    mForm.target = "Upload";
    mForm.method = "POST";
    mForm.action = "/AVA/Upload";
    document.body.appendChild(mForm);
    var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
    if (Modernizr.touch) {
        parametros = null
    }
    a = window.open("", "Upload", parametros);
    if (a) {
        mForm.submit()
    }
}

function fecharJanelaDescricao(janela) {
    janela.hide()
}

function verificaAvaliacaoConcluidaEditaEtapa() {
    $(".avaliacao").each(function() {
        if ($(this).attr("idAvaliacao") != "0") {
            var idRotaUsuario = $(this).attr("idRotaUsuario");
            var idEtapa = $(this).attr("idEtapa");
            var idRotaAgendamento = $(this).attr("idRotaAgendamento");
            var idRecurso = $(this).attr("idRecurso");
            var idAvaliacao = $(this).attr("idAvaliacao");
            var intOrdemAgendamento = $(this).attr("intOrdemAgendamento");
            var idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
            if (intAgendamentoAvaliacaoAux == intOrdemAgendamento) {
                jQuery.ajax({
                    url: "/AVA/Caminhos/Home/VerificaAvaliacaoConcluidaEditaEtapa",
                    data: {
                        idRotaUsuario: idRotaUsuario,
                        idEtapa: idEtapa,
                        idRotaAgendamento: idRotaAgendamento,
                        idRecurso: idRecurso,
                        idAvaliacao: idAvaliacao,
                        intOrdemAgendamento: intOrdemAgendamento
                    },
                    cache: false,
                    async: false,
                    success: function(data) {
                        var feitos = $(".placa_verde").children("p").children(":first").text();
                        var feitosTotal = $(".placa_verde").children("p").children(":last").text();
                        var codigo = data.split(";");
                        if (!isNaN(codigo[0])) {
                            if (codigo[0] != "0" && codigo[0] != "2") {
                                var este = $(".etapa_infos:visible");
                                if (este.length > 0 && este.length == 1) {
                                    if (este.find(".avaliacao").hasClass("avaliacao")) {
                                        var pAmarela = este.prev().children(":first").find(".sprite_player.bolConcluidoPlaca");
                                        if (!(pAmarela.hasClass("concluido"))) {
                                            pAmarela.addClass("concluido");
                                            feitos = parseInt(feitos);
                                            feitos = feitos + 1;
                                            feitosTotal = parseInt(feitosTotal);
                                            if (!($(".placa_verde").children("p").hasClass("e_finalizada"))) {
                                                if (feitos == feitosTotal) {
                                                    $(".placa_verde").children("p").remove();
                                                    $(".placa_verde").append('<p class="e_finalizada">Etapas finalizadas!  <span class="feito"></span></p>');
                                                    $(".placa_verde .e_finalizada").effect("bounce", {
                                                        times: 2
                                                    }, 300)
                                                } else {
                                                    $(".placa_verde").children("p").children(":first").text(feitos)
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    console.log(data)
                                }
                            }
                        } else {
                            console.log(data)
                        }
                        verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
                    },
                    error: function(data) {
                        console.log(data.status)
                    }
                })
            }
        }
    })
}

function verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario) {
    jQuery.ajax({
        url: "/AVA/Caminhos/Home/VerificaTodasEtapasConcluidas",
        data: {
            idRotaUsuario: idRotaUsuario
        },
        cache: false,
        async: false,
        success: function(data) {
            if (data != "0") {
                console.log(data)
            }
        },
        error: function(data) {
            console.log(data)
        }
    })
}

function executaPlayer(e) {
    $("#ava_box_player").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $(".placa_amarela").each(function() {
        $(this).removeClass("atual")
    });
    var idRecursoPlayer = e.attr("idRecurso");
    e.parent().addClass("atual");
    var $rel = e.attr("rel").toLowerCase();
    if ($rel == "") {
        $rel = "Erro"
    }
    if (($rel.indexOf(".jpg") > 0) || ($rel.indexOf(".gif") > 0)) {
        if (($rel.indexOf("http://") < 0)) {
            $rel = "http://" + dominio + "/" + $rel
        }
        jQuery.ajax({
            url: "/AVA/Caminhos/Home/VerificaDetalhesImagem/",
            data: {
                strPath: $rel
            },
            cache: false,
            async: false,
            success: function(data) {
                $temp = data.split(",");
                if ($temp[0] > 726) {
                    $("#ava_box_player").html("<div id=\"imgAVAPlayer\"><a class='img_ava_red' href='" + $rel + "'><img  src='" + $rel + "' width='726' height='' /></a></div>");
                    var t = $(".img_ava_red");
                    var o = {
                        autoSize: false,
                        autoResize: false,
                        fitToView: false,
                        helpers: {
                            overlay: {
                                locked: false
                            }
                        }
                    };
                    lightBoxAVA(t, o)
                } else {
                    $("#ava_box_player").html('<div id="imgAVAPlayer"><img src=\'' + $rel + "'/></div>")
                }
                $("#ava_box_player > div#imgAVAPlayer").hide()
            },
            error: function() {
                alert("Ocorreu um erro ao buscar a imagem.")
            }
        })
    } else {
        if (idRecursoPlayer == 2 || $rel.indexOf("linhadotempo") > 0) {
            if (idRecursoPlayer == 2) {
                var iVersao = e.attr("iVersao");
                var urlCM = e.attr("url");
                var urlCMPai = e.attr("urlPai");
                var pOrdem = e.attr("pOrdem");
                var sOrdem = e.attr("sOrdem");
                var idPublicacaoCM = e.attr("idPublicacao");
                if (iVersao == 6) {
                    var w, h, rw, rh, x, y;
                    w = 730;
                    h = 500;
                    rw = screen.width;
                    rh = screen.height;
                    x = (rw - w) / 2;
                    y = ((rh - h) / 2) - 20;
                    $("#ava_box_player").html('<iframe id="ifrmPlayer" src="about:blank" url="/multimidia/popcacm.asp?AVA=1&URL=' + encodeURIComponent(urlCM) + "&idPublicacao=" + idPublicacaoCM + "&iVersao=" + iVersao + '" width="' + w + '" height="' + h + '" frameborder="0" style=\'display: none;\'></iframe>')
                } else {
                    if (iVersao < 3) {
                        $("#ava_box_player").html('<iframe id="ifrmPlayer" src="about:blank" url="/multimidia/popcacm.asp?AVA=1&URL=' + encodeURIComponent(urlCMPai) + "?bProcura=1&idPublicacao=" + idPublicacaoCM + "&idcapitulo=" + pOrdem + "&idSubcapitulo=" + sOrdem + "&iVersao=" + iVersao + '" width="800" height="600" frameborder="0" style=\'display: none;\'></iframe>')
                    } else {
                        if (iVersao == 7) {
                            $("#ava_box_player").html('<iframe id="ifrmPlayer" src="about:blank" url="/multimidia/popcacm.asp?AVA=1&URL=' + encodeURIComponent(urlCMPai) + "?bProcura=1&idPublicacao=" + idPublicacaoCM + "&idcapitulo=" + pOrdem + "&idSubcapitulo=" + sOrdem + "&iVersao=" + iVersao + '" width="790" height="560" frameborder="0" style=\'display: none;\'></iframe>')
                        } else {
                            var iframe = $("<iframe />");
                            iframe.css({
                                display: "none"
                            });
                            iframe.attr("width", "780").attr("height", "580");
                            iframe.attr("url", "/multimidia/popcacm.asp?AVA=1&URL=" + encodeURIComponent(urlCMPai) + "?bProcura=1&idPublicacao=" + idPublicacaoCM + "&idcapitulo=" + pOrdem + "&idSubcapitulo=" + sOrdem + "&iVersao=" + iVersao);
                            iframe.attr("id", "ifrmPlayer");
                            iframe.attr("src", "about:blank");
                            iframe.attr("frameborder", "0");
                            $("#ava_box_player").empty();
                            $("#ava_box_player").append(iframe)
                        }
                    }
                }
            } else {
                $("#ava_box_player").html("<iframe id='ifrmPlayer' src='about:blank' url='" + $rel + "' width='100%' height='" + e.attr("alturaIframe") + "' frameborder='0' style='display: none;'></iframe>")
            }
        } else {
            if ($rel == "Erro") {
                $("#ava_box_player").html($rel)
            } else {
                if (idRecursoPlayer == "8" || idRecursoPlayer == "3") {
                    location.href = $rel
                } else {
                    if (idRecursoPlayer == "10" || idRecursoPlayer == "5") {
                        $("#ava_box_player").html('<iframe id="ifrmPlayer" src="about:blank" url="' + $rel + '" width="780" height="600" style="display: none;"></iframe>')
                    } else {
                        $("#ava_box_player").load($rel)
                    }
                }
            }
        }
    }
}

function visualizarPaginaCMPlayer(idPublicacao, url, pOrdem, sOrdem, iVersao) {
    if (iVersao == 6) {
        var w, h, rw, rh, x, y;
        w = 730;
        h = 500;
        rw = screen.width;
        rh = screen.height;
        x = (rw - w) / 2;
        y = ((rh - h) / 2) - 20;
        window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(url) + "&idPublicacao=" + idPublicacao + "&iVersao=" + iVersao, idPublicacao, "left=" + x + ",top=" + y + ",width=" + w + ",height=" + h + ",resizable=yes")
    } else {
        if (iVersao < 3) {
            window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(url) + "?bProcura=1&idPublicacao=" + idPublicacao + "&idcapitulo=" + pOrdem + "&idSubcapitulo=" + sOrdem + "&iVersao=" + iVersao, idPublicacao, "width=800,height=600,scrollbars=no,left=0,top=0,resizable=yes")
        } else {
            if (iVersao == 7) {
                window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(url) + "?bProcura=1&idPublicacao=" + idPublicacao + "&idcapitulo=" + pOrdem + "&idSubcapitulo=" + sOrdem + "&iVersao=" + iVersao, idPublicacao, "width=790,height=560,scrollbars=no,left=0,top=0,resizable=yes")
            } else {
                window.open("/multimidia/popcacm.asp?URL=" + encodeURIComponent(url) + "?bProcura=1&idPublicacao=" + idPublicacao + "&idcapitulo=" + pOrdem + "&idSubcapitulo=" + sOrdem + "&iVersao=" + iVersao, idPublicacao, "width=780,height=580,scrollbars=no,left=0,top=0,resizable=yes")
            }
        }
    }
}

function abreAvaliacao(e) {
    var idConfig = 0;
    var idAplicacao = e.attr("intordemagendamento");
    var opcoes = {
        idAplicacao: idAplicacao,
        idConfig: idConfig,
        caminhoBase: "/AVA/Avaliacoes"
    };
    var idUsuario = idUsuarioAvaliacao;
    $.fancybox({
        href: "/ava/caminhos/home/AbrirBoxAvaliacao",
        autoSize: false,
        width: 830,
        height: 600,
        autoResize: false,
        fitToView: false,
        autoCenter: false,
        type: "ajax",
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        afterShow: function() {
            $(this.wrap).addClass("modalAvaliacoes");
            if (verificaCaminhoEstaEncerrado) {
                $.ajax({
                    url: opcoes.caminhoBase + "/Realizacao/StatusRealizacaoUsuarioJson/" + idAplicacao + "/" + idConfig + "/" + idUsuario + "/",
                    type: "post",
                    success: function(data) {
                        if (data.erro && data.erro.id == 3) {
                            $("#abrirAvalicaoBox").avaliacoesRealizacao(opcoes).avaliacoesRealizacao("iniciar");
                            var alturaLightBox = $(".fancybox-skin").height();
                            $("#abrirAvalicaoBox").parent().css("height", alturaLightBox + "px")
                        } else {
                            $("#abrirAvalicaoBox").avaliacoesRealizacao(opcoes).avaliacoesRealizacao("realizar", {
                                questao: 0
                            });
                            var alturaLightBox = $(".fancybox-skin").height();
                            $("#abrirAvalicaoBox").parent().css("height", alturaLightBox + "px")
                        }
                    }
                })
            } else {
                $("#abrirAvalicaoBox").avaliacoesRealizacao(opcoes).avaliacoesRealizacao("iniciar");
                var alturaLightBox = $(".fancybox-skin").height();
                $("#abrirAvalicaoBox").parent().css("height", alturaLightBox + "px")
            }
        },
        beforeClose: function() {
            verificaAvaliacaoConcluidaEditaEtapa();
            intAgendamentoAvaliacaoAux = undefined
        }
    })
}

function gerarIdRotaEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, bolConcluido, idRotaAgendamento) {
    idRotaEtapaUsuario = parseInt(idRotaEtapaUsuario);
    if (idRotaEtapaUsuario == 0) {
        var retorno = 0;
        $.ajax({
            url: "/ava/caminhos/home/SalvarCaminhoEtapaUsuario/",
            async: false,
            data: {
                idRotaEtapaUsuario: 0,
                idRotaUsuario: idRotaUsuario,
                idEtapa: idEtapa,
                bolConcluido: false,
                idRotaAgendamento: idRotaAgendamento,
                tipo: "trabalho",
                del: "nao"
            },
            async: false,
            success: function(data) {
                if (isNaN(data)) {
                    retorno = 0
                } else {
                    retorno = parseInt(data)
                }
            },
            error: function(data) {
                return false
            }
        });
        return retorno
    } else {
        return idRotaEtapaUsuario
    }
}

function salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, bolConcluido, tipo, del) {
    if (isNaN(idRotaEtapaUsuario)) {
        if (idRotaEtapaUsuario.indexOf("container_error") > -1) {
            location.href = location.href
        } else {
            return
        }
    }
    if (isNaN(idRotaUsuario)) {
        if (idRotaUsuario.indexOf("container_error") > -1) {
            location.href = location.href
        } else {
            return
        }
    }
    if (isNaN(idEtapa)) {
        if (idEtapa.indexOf("container_error") > -1) {
            location.href = location.href
        } else {
            return
        }
    }
    if (isNaN(idRecurso)) {
        if (idRecurso.indexOf("container_error") > -1) {
            location.href = location.href
        } else {
            return
        }
    }
    if (isNaN(idRotaAgendamento)) {
        if (idRotaAgendamento.indexOf("container_error") > -1) {
            location.href = location.href
        } else {
            return
        }
    }
    var feitos = $(".placa_verde").children("p").children(":first").text();
    var feitosTotal = $(".placa_verde").children("p").children(":last").text();
    if (idRecurso == 1) {
        var bolConcluido = false
    }
    jQuery.ajax({
        url: "/AVA/Caminhos/Home/SalvarCaminhoEtapaUsuario",
        data: {
            idRotaEtapaUsuario: idRotaEtapaUsuario,
            idRotaUsuario: idRotaUsuario,
            idEtapa: idEtapa,
            bolConcluido: bolConcluido,
            idRotaAgendamento: idRotaAgendamento,
            tipo: tipo,
            del: del
        },
        async: false,
        cache: false,
        timeout: 60000,
        success: function(data) {
            var idRotaEtapaUsuarioAtual;
            var elAux;
            $("#ava_barralateral-direita").find(".placa_amarela").each(function() {
                if ($(this).children(":first").attr("idEtapa") == idEtapa) {
                    elAux = $(this);
                    idRotaEtapaUsuarioAtual = $(this).children(":first").attr("idRotaEtapaUsuario");
                    var valorSaida;
                    if (data == "-1") {
                        valorSaida = 0
                    } else {
                        valorSaida = data
                    }
                    $(this).children(":first").attr("idRotaEtapaUsuario", valorSaida);
                    if ($(this).next().find(".listaEtapas").hasClass("listaEtapas")) {
                        $(this).next().find(".listaEtapas").attr("idRotaEtapaUsuario", valorSaida)
                    }
                    return
                }
            });
            if (data != "Caminho j� est� encerrado" && data.substring(0, 200).indexOf("doctype html") < 0) {
                if (data != "-1") {
                    if (idRotaEtapaUsuarioAtual == "0" || idRotaEtapaUsuarioAtual == "-1" || !(elAux.find("> a > .sprite_player.bolConcluidoPlaca").hasClass("concluido"))) {
                        if ((idRecurso == 1 && bolConcluido) || idRecurso > 1) {
                            feitos = parseInt(feitos);
                            feitos = feitos + 1;
                            feitosTotal = parseInt(feitosTotal);
                            if (!($(".placa_verde").children("p").hasClass("e_finalizada"))) {
                                if (feitos == feitosTotal) {
                                    $(".placa_verde").children("p").remove();
                                    $(".placa_verde").append('<p class="e_finalizada">Etapas finalizadas!  <span class="feito"></span></p>');
                                    $(".placa_verde .e_finalizada").effect("bounce", {
                                        times: 2
                                    }, 300)
                                } else {
                                    $(".placa_verde").children("p").children(":first").text(feitos)
                                }
                            }
                        }
                    }
                } else {
                    if ($(".placa_verde").children("p").hasClass("e_finalizada")) {
                        $(".placa_verde").children("p").remove();
                        if (feitosTotal == "") {
                            var contPlaca = 0;
                            $(".placa_amarela").each(function() {
                                contPlaca++
                            })
                        }
                        $(".placa_verde").append('<p>Etapas completas: <span class="geral_etapas">' + (contPlaca - 1) + '</span> de <span class="geral_etapas">' + contPlaca + "</span></p>");
                        verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
                    } else {
                        if (parseInt(feitos) > 0) {
                            $(".placa_verde").children("p").children("span:first").text(feitos - 1)
                        }
                    }
                }
            }
        },
        error: function(data) {
            console.log("Erro ao salvar caminho etapa - debug: " + data.responseText + " - " + data.status)
        }
    })
}

function fazerEtapa(idRota, idEtapa, idRecurso, strLink, idRotaUsuario, idAvaliacao, intOrdemAgendamento) {
    $rel = "http://" + dominio + "/avaliacoesonline/fazer_avaliacao.asp?inicio=1&idAvaliacao=" + idAvaliacao + "&intAgend=" + intOrdemAgendamento;
    $("#ava_box_player").html("<a target='_blank'  class='ava_abreAvaliacao_frame' href='" + $rel + "'>Fazer Avalia��o</a>");
    if (idRecurso == 8) {
        window.location.href = strLink + "&rota=" + idRota + "&idEtapa=" + idEtapa
    } else {
        if (idRecurso == 9) {
            window.location.href = "/AVA/Caminhos/Home/Player/" + idRota + "/" + idEtapa
        } else {
            if (idRecurso == 3) {
                window.location.href = strLink + "&rota=" + idRota + "&idEtapa=" + idEtapa
            } else {
                window.location.href = "/AVA/Caminhos/Home/Player/" + idRota + "/" + idEtapa
            }
        }
    }
}

function fazer(rel, idEtapa, idRotaEtapaUsuario, idRotaUsuario, idRecurso, idAvaliacao, intOrdemAgendamento, idRotaAgendamento, trabalho) {
    if (trabalho == "true") {
        trabalho = true
    } else {
        trabalho = false
    }
    if (idRecurso != 1) {
        if (idRecurso == 8 || idRecurso == 3) {} else {
            if (idRecurso == 9) {} else {
                if (idRecurso == 11) {} else {
                    var teste = $(this).parent().find(".container_entrega_aluno");
                    if (trabalho) {} else {
                        salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                        $.ajax({
                            url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                            data: {
                                idRotaUsuario: idRotaAtual,
                                idEtapa: idEtapa
                            },
                            cache: false,
                            async: true,
                            success: function(data) {
                                if (data != "0") {
                                    este.prev().children(":first").find(".sprite_player.bolConcluidoPlaca").addClass("concluido")
                                }
                                verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario)
                            },
                            error: function(data) {
                                console.debgu(data)
                            }
                        })
                    }
                }
            }
        }
    } else {
        if (trabalho) {
            abreAvaliacao(rel)
        } else {
            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "avaliacao", "nao");
            abreAvaliacao(rel)
        }
    }
};