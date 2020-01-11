function verMaisMensagens(e) {
    _this = $(this);
    _this.removeAttr("href");
    $("#boxTimeLineGrupos").off("click", "#btCarregaMensagensGrupos", verMaisMensagens);
    e.preventDefault();
    $("#boxTimeLineGrupos").append("<img id='imgLoaddingmensagemGrupos' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $("#btCarregaMensagensGrupos").css("display", "none");
    $.post("/AVA/Grupo/Home/TimeLine?id=" + idUsuarioPublico + "&intInicio=" + intInicioTimeLineGrupo, function(e) {
        $("#boxTimeLineGrupos").on("click", "#btCarregaMensagensGrupos", verMaisMensagens);
        if (e.indexOf("semMensagens") > -1) {
            $("#boxTimeLineGrupos").hide()
        } else if (e.indexOf("poucaMensagem") > 0) {
            var t = e.indexOf("poucaMensagem");
            var n = e.substring(0, t);
            $("#btCarregaMensagensGrupos, #imgLoaddingmensagemGrupos").remove();
            $("#boxTimeLineGrupos").append(n)
        } else {
            $("#btCarregaMensagensGrupos").prev().remove();
            $("#btCarregaMensagensGrupos, #imgLoaddingmensagemGrupos").remove();
            $("#boxTimeLineGrupos").append(e);
            intInicioTimeLineGrupo += 1;
            $("#btCarregaMensagensGrupos").css("display", "block");
            $("#btCarregaMensagensGrupos").html("Carregar mais mensagens")
        }
        $(".b_tooltip_left").each(function() {
            $(this).tooltip({
                offset: [0, 0],
                opacity: 1,
                position: "top center",
                effect: "slide",
                relative: true,
                events: {
                    def: "mouseover, mouseout"
                }
            })
        });
        $(".tooltipGostaram").each(function() {
            $(this).tooltip({
                offset: [0, 0],
                opacity: 1,
                position: "top center",
                effect: "slide",
                relative: true,
                events: {
                    def: "mouseover, mouseout"
                }
            })
        });
        denunciarMensagem()
    });
    $(this).blur()
}

function validaMensagemGrupo() {
    $("#btCompartilharGrupo").addClass("disable");
    $.ajax({
        url: "/AVA/Grupo/Home/SaveMensagem",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            strMensagem: $("#txtInput").val().replace(/\r?\n|\r/g, "<br>"),
            idGrupo: $("#idGrupo").val()
        },
        success: function(e) {
            $("#txtInput").val("");
            $("#boxTimeLineGrupos").prepend(e).find("div:first").slideDown(1e3);
            if ($("#boxTimeLineGrupos").find("article").last().text() == "Nenhuma mensagem enviada.") {
                $("#boxTimeLineGrupos").find("article").last().remove()
            }
            exclusaoMensagem();
            exclusaoComentario()
        },
        error: function(e) {
            alert("Ocorreu um erro no banco de dados.");
            $("#btCompartilharGrupo").unbind("click", validaMensagemGrupo).one("click", validaMensagemGrupo)
        }
    })
}

function carregaTimeLineGrupo() {
    $.ajax({
        url: "/AVA/Grupo/Home/TimeLine",
        data: {
            id: idUsuarioPublico,
            intInicio: 1
        },
        async: true,
        success: function(e) {
            $("#boxTimeLineGrupos").html(e).fadeIn();
            $("#txtInput").css("display", "block");
            $("#strComentarioGrupo").live("keypress", function(e) {
                var t = $(this);
                grava_comentario(e, t)
            });
            $(".b_tooltip_left").each(function() {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: true,
                    events: {
                        def: "mouseover, mouseout"
                    }
                })
            });
            $(".tooltipGostaram").tooltip({
                offset: [0, 0],
                opacity: 1,
                position: "top center",
                effect: "slide",
                relative: true,
                events: {
                    def: "mouseover, mouseout"
                }
            });
            exclusaoMensagem();
            exclusaoComentario();
            denunciarMensagem()
        },
        error: function() {
            $htmlErro = '<div class="container_error clearfix" style="padding: 15px;">';
            $htmlErro += '<h1 class="blokletters">Ops!</h1>';
            $htmlErro += "<h3>Aconteceu um erro inesperado. Por favor tente novamente em alguns instantes.</h3>";
            $htmlErro += "</div>";
            $Erro = "Aconteceu um erro inesperado. Por favor tente novamente em alguns instantes.";
            $("#boxTimeLineGrupos").hide().append($htmlErro).fadeIn();
            $("#txtInput").html($Erro);
            $("#txtInput").css("font-weight", "bold");
            $("#txtInput").css("display", "block");
            $("#txtInput").focus(function() {
                $("#compartilhar").hide()
            })
        }
    })
}

function grava_comentario(e, t) {
    if (e.which && e.which == 13 || e.keyCode && e.keyCode == 13) {
        var n = t.attr("idMensagemRapida");
        if (t.val() != "") {
            $.ajax({
                url: "/AVA/Grupo/Home/GravarComentario",
                type: "POST",
                data: {
                    id: n,
                    strComentario: t.val()
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(e) {
                    $("#boxComentariosGrupo_" + n).append(e).slideDown(1e3);
                    t.val("");
                    exclusaoComentario()
                },
                error: function() {
                    alert("Erro ao salvar coment�rio.")
                }
            })
        }
    }
}

function buscaCusticoesMensagem(e) {
    $("#boxCurticoesMensagem_" + e).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        url: "/AVA/Grupo/Home/ListaCurtidasMensagem",
        data: {
            id: e
        },
        success: function(t) {
            $("#boxCurticoesMensagem_" + e).html(t);
            $(".b_tooltip_left").each(function() {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: true,
                    events: {
                        def: "mouseover, mouseout"
                    }
                })
            })
        },
        error: function() {
            alert("Erro ao listar curticoes da mensagem.")
        }
    })
}

function buscaCusticoesComentario(e) {
    $("#boxCurticoesComentario_" + e).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    $.ajax({
        url: "/AVA/Grupo/Home/ListaCurtidasComentario",
        data: {
            id: e
        },
        success: function(t) {
            $("#boxCurticoesComentario_" + e).html(t);
            $(".tooltipGostaram").each(function() {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: true,
                    events: {
                        def: "mouseover, mouseout"
                    }
                })
            })
        },
        error: function() {
            alert("Erro ao listar curticoes do comentario.")
        }
    })
}

function curtirDescutir_mensagem() {
    $("a.botaoCurtirGrupos").live("click", function() {
        var e = $(this).attr("idMensagemRapida");
        if ($(this).hasClass("ativo")) {
            $.ajax({
                url: "/AVA/Grupo/Home/DescurtirMensagem",
                data: {
                    id: e
                },
                success: function(t) {
                    buscaCusticoesMensagem(e)
                },
                error: function() {
                    alert("Erro ao descurtir mensagem.")
                }
            })
        } else {
            $.ajax({
                url: "/AVA/Grupo/Home/CurtirMensagem",
                data: {
                    id: e
                },
                success: function(t) {
                    buscaCusticoesMensagem(e)
                },
                error: function() {
                    alert("Erro ao curtir mensagem.")
                }
            })
        }
        $(this).toggleClass("ativo")
    })
}

function curtirDescurtir_comentario() {
    $("a.botaoCurtirComentario").live("click", function() {
        var e = $(this).attr("idComentario");
        if ($(this).hasClass("ativo")) {
            $.ajax({
                url: "/AVA/Grupo/Home/DescurtirComentario",
                data: {
                    id: e
                },
                success: function(t) {
                    buscaCusticoesComentario(e)
                },
                error: function() {
                    alert("Erro ao descurtir coment�rio.")
                }
            })
        } else {
            $.ajax({
                url: "/AVA/Grupo/Home/CurtirComentario",
                data: {
                    id: e
                },
                success: function(t) {
                    buscaCusticoesComentario(e)
                },
                error: function() {
                    alert("Erro ao descurtir coment�rio.")
                }
            })
        }
        $(this).toggleClass("ativo")
    })
}

function abreInfoGrupo() {
    $(".boxSobre").css("display", "block");
    $("#ava_barralateral-esquerda li.current").removeClass();
    $("div.icon_li.sobre").closest("li").addClass("current")
}

function verTodosQueCurtiramMensagem() {
    $(".vertodoscurtirammensagem").each(function() {
        var e = $(this);
        var t = {
            autoDimensions: false,
            width: 720,
            height: "auto",
            onComplete: function() {
                var t = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + e.attr("id");
                retornaJson(t)
            }
        };
        lightBoxAVA(e, t)
    })
}

function verTodosQueCurtiramComentario() {
    $(".vertodoscurtiramcomentario").each(function() {
        var e = $(this);
        var t = {
            autoDimensions: false,
            width: 720,
            height: "auto",
            onComplete: function() {
                var t = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idMensagemRapida=&idComentario=" + e.attr("id");
                retornaJson(t)
            }
        };
        lightBoxAVA(e, t)
    })
}

function exclusaoMensagem() {
    $(".excluir_mensagem_grupo").each(function() {
        $(this).tooltip({
            offset: [0, 0],
            opacity: 1,
            position: "top center",
            effect: "slide",
            relative: true,
            events: {
                def: "click, mouseout"
            }
        })
    })
}

function exclusaoComentario() {
    $(".excluir_comentario_grupo").each(function() {
        $(this).tooltip({
            offset: [0, 0],
            opacity: 1,
            position: "top center",
            effect: "slide",
            relative: true,
            events: {
                def: "click, mouseout"
            }
        })
    })
}

function excluirMensagem(e, t, n) {
    _id_msg = e;
    _this = $(n);
    if (t) {
        $.ajax({
            url: "/AVA/Grupo/Home/ExcluirMensagemRapida/" + _id_msg,
            type: "GET",
            success: function(e) {
                $("#msg_" + _id_msg).slideUp("slow", function() {
                    $(this).remove()
                })
            },
            error: function(e) {
                console.debug("Ocorreu um erro no banco de dados ao excluir mensagem.")
            }
        })
    } else {
        _this.closest(".black_tip_center").hide()
    }
}

function excluirComentario(e, t, n) {
    _id_coment = e;
    _this = $(n);
    if (t) {
        $.ajax({
            url: "/AVA/Grupo/Home/ExcluirComentario/" + _id_coment,
            type: "GET",
            success: function(e) {
                $("#coment_" + _id_coment).slideUp("slow", function() {
                    $(this).remove()
                })
            },
            error: function(e) {
                console.debug("Ocorreu um erro no banco de dados ao excluir mensagem.")
            }
        })
    } else {
        _this.closest(".black_tip_center").hide()
    }
}

function denunciarMensagem() {
    $(".denunciar_comentario").each(function() {
        var e = $(this).attr("idMensagem");
        var t = $(this);
        $(t).click(function() {
            var t = "#boxDenunciaMensagem_" + e;
            $(t).fadeIn("fast", function() {
                $(this).find(".fechar_denuncia").click(function() {
                    $(t).fadeOut("fast")
                })
            })
        })
    })
}

function salvarDenunciaMensagem(e) {
    var t = "#boxDenunciaMensagem_" + e;
    var n = $(t).find("#strMotivo").val();
    var r = $(t).find("#strLoginDenunciado").val();
    if (n == "") {
        jAlert("Favor inserir o motivo da den�ncia!", "")
    } else {
        $.ajax({
            url: "/AVA/Grupo/Home/Denunciar",
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                idMensagem: e,
                strMotivo: n,
                strLoginDenunciado: r
            },
            success: function(e) {
                jAlert("Den�ncia enviada com sucesso!", "");
                $(t).fadeOut("fast")
            },
            error: function(e) {
                console.debug(e.status)
            }
        })
    }
}
$(function() {
    var e = "Ol�! compartilhe aqui a sua ideia ou link!";
    $("#txtInput").live("keyup", function() {
        var t = $(this).val();
        if (t == "" || t == e) {
            $("#btCompartilharGrupo").addClass("disable");
            $("#btCompartilharGrupo").unbind("click", validaMensagemGrupo)
        } else {
            $("#btCompartilharGrupo").removeClass("disable");
            $("#btCompartilharGrupo").unbind("click", validaMensagemGrupo).one("click", validaMensagemGrupo)
        }
    });
    if (_action.toLowerCase() == "post") {
        $("#txtInput").css("display", "block");
        $("#strComentarioGrupo").live("keypress", function(e) {
            var t = $(this);
            grava_comentario(e, t)
        });
        $(".b_tooltip_left").each(function() {
            $(this).tooltip({
                offset: [0, 0],
                opacity: 1,
                position: "top center",
                effect: "slide",
                relative: true,
                events: {
                    def: "mouseover, mouseout"
                }
            })
        });
        $(".tooltipGostaram").tooltip({
            offset: [0, 0],
            opacity: 1,
            position: "top center",
            effect: "slide",
            relative: true,
            events: {
                def: "mouseover, mouseout"
            }
        });
        exclusaoMensagem();
        exclusaoComentario();
        denunciarMensagem()
    } else {
        carregaTimeLineGrupo()
    }
    $("body").on("click", ".carregarComentarios", function(e) {
        e.preventDefault();
        var t = $(this).attr("idMensagem");
        var n = $(this).closest(".comentariosMuralGrupo");
        n.html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.post("/AVA/Grupo/Home/TodosComentarios/" + t, {}, function(e) {
            n.html(e).slideDown("fast");
            $(".tooltipGostaram").each(function() {
                $(this).tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: true,
                    events: {
                        def: "mouseover, mouseout"
                    }
                })
            });
            exclusaoComentario()
        })
    });
    $("#boxTimeLineGrupos").on("click", "#btCarregaMensagensGrupos", verMaisMensagens);
    $("#ava_wrap").on("click", ".vertodoscurtiramcomentario", function(e) {
        e.preventDefault();
        var t = $(this);
        $.fancybox({
            href: $(this).attr("href"),
            autoDimensions: false,
            width: 720,
            height: "auto",
            onComplete: function() {
                var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idMensagemRapida=&idComentario=" + t.attr("id");
                retornaJson(e)
            }
        })
    });
    $("#ava_wrap").on("click", "a.botaoCurtirComentario", function(e) {
        e.preventDefault();
        var t = $(this).attr("idComentario");
        if ($(this).hasClass("ativo")) {
            $.ajax({
                url: "/AVA/Grupo/Home/DescurtirComentario",
                data: {
                    id: t
                },
                success: function(e) {
                    buscaCusticoesComentario(t)
                },
                error: function() {
                    alert("Erro ao descurtir coment�rio.")
                }
            })
        } else {
            $.ajax({
                url: "/AVA/Grupo/Home/CurtirComentario",
                data: {
                    id: t
                },
                success: function(e) {
                    buscaCusticoesComentario(t)
                },
                error: function() {
                    alert("Erro ao descurtir coment�rio.")
                }
            })
        }
        $(this).toggleClass("ativo")
    });
    $("#ava_wrap").on("click", ".vertodoscurtirammensagem", function(e) {
        e.preventDefault();
        var t = $(this);
        var n = $(this).attr("idmensagem");
        var r = {
            href: t.attr("href"),
            autoDimensions: false,
            width: 720,
            height: "auto",
            onComplete: function() {
                var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + n;
                retornaJson(e)
            }
        };
        $.fancybox(r)
    });
    $("#ava_wrap").on("click", "a.botaoCurtirGrupos", function(e) {
        e.preventDefault();
        var t = $(this).attr("idMensagemRapida");
        if ($(this).hasClass("ativo")) {
            $.ajax({
                url: "/AVA/Grupo/Home/DescurtirMensagem",
                data: {
                    id: t
                },
                success: function(e) {
                    buscaCusticoesMensagem(t)
                },
                error: function() {
                    alert("Erro ao descurtir mensagem.")
                }
            })
        } else {
            $.ajax({
                url: "/AVA/Grupo/Home/CurtirMensagem",
                data: {
                    id: t
                },
                success: function(e) {
                    buscaCusticoesMensagem(t)
                },
                error: function() {
                    alert("Erro ao curtir mensagem.")
                }
            })
        }
        $(this).toggleClass("ativo")
    });
    $("#ava_wrap").on("click", ".denunciar_comentario", function(e) {
        e.preventDefault();
        var t = $(this).attr("idMensagem");
        var n = $(this);
        $(n).click(function(e) {
            e.preventDefault();
            var n = "#boxDenunciaMensagem_" + t;
            $(n).fadeIn("fast", function() {
                $(this).find(".fechar_denuncia").click(function() {
                    $(n).fadeOut("fast")
                })
            })
        })
    })
});
var intInicioTimeLineGrupo = 2