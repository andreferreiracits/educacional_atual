function unloadipad() {
    bolPassouNoBeforeUnload = !1
}


function verMaisMensagens(e) {
    _this = $(this), _this.removeAttr("href"), $("#btCarregaMensagensGrupos").unbind("click", verMaisMensagens), e.preventDefault(), $("#ava_footervejamais").html("<img id='imgLoaddingmensagemGrupos' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.post("/AVA/Grupo/Home/TimeLine?intAlteracaoTimeLine=" + intAlteracaoTimeLine + "&id=" + idUsuarioPublico + "&intInicio=" + intInicioTimeLineGrupo + "&idAssunto=" + $("#btnFiltroGrupo").attr("idAssunto"), function(e) {
        if (e.indexOf("semMensagens") > -1) $("#ava_footervejamais").hide(), $("#btCarregaMensagensGrupos").hide();
        else if (e.indexOf("poucaMensagem") > 0) {
            var o = e.indexOf("poucaMensagem"),
                a = e.substring(0, o);
            $("#ava_footervejamais, #imgLoaddingmensagemGrupos").remove(), $("#boxTimeLineGrupos").append(a)
        } else $("#btCarregaMensagensGrupos").prev().remove(), $("#ava_footervejamais, #imgLoaddingmensagemGrupos").remove(), $("#boxTimeLineGrupos").append(e), intInicioTimeLineGrupo += 1, $("#btCarregaMensagensGrupos").css("display", "block"), $("#btCarregaMensagensGrupos").html("Veja Mais"), $("#btCarregaMensagensGrupos").bind("click", verMaisMensagens);
        $(".b_tooltip_left").each(function() {
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
        }), $(".tooltipGostaram").each(function() {
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
        }), $("#boxTimeLineGrupos .ctn_msg").expander({
            slicePoint: 500,
            window: 2,
            expandText: " leia mais",
            expandPrefix: "...",
            userCollapseText: "menos",
            preserveWords: !0,
            expandEffect: "fadeIn",
            collapseEffect: "fadeOut"
        }), $("#boxTimeLineGrupos .iframeVideoVimeo").on("load", function() {
            var e = $f(this),
                o = !1;
            e.api("pause"), e.addEvent("ready", function() {
                e.addEvent("play", function() {
                    o || (o = !0, e.api("pause"))
                })
            })
        }), denunciarMensagem(), exclusaoMensagem(), exclusaoComentario(), acoesComentario()
    }), $(this).blur()
}

function validaMensagemGrupo() {
    $("#compartilhar").addClass("disable");
    var e = parseInt($("#hAssuntoPost").val()),
        o = "";
    void 0 != $("#container_preview_video").find("iframe").attr("src") && "" != $("#container_preview_video").find("iframe").attr("src") && (o = removerListUrlYoutube($("#urlVideoOriginal").val())), $.ajax({
        url: "/AVA/Grupo/Home/SaveMensagem",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            strMensagem: $("#txtInput").val().replace(/\r?\n|\r/g, "<br>"),
            idGrupo: $("#idGrupo").val(),
            idAssunto: e,
            strLinkVideo: o,
            imagens: JSON.stringify(objetoImagens.imagens),
            arquivos: JSON.stringify(objetoArquivos.arquivos)
        },
        success: function(e) {
            $("#txtInput").val(""), $("#txtInput").css("height", "48px"), $("#txtInput").siblings(":last").html(""), $("#compartilhar").addClass("disable").prop("disabled", !0), carregaTimeLineGrupo(0), intInicioTimeLineGrupo = 2, "Nenhuma mensagem enviada." == $("#boxTimeLineGrupos").find("article").last().text() && $("#boxTimeLineGrupos").find("article").last().remove(), $("#container_preview_video").fadeOut("slow", function() {
                $(this).html(""), $(".enviar_video").hide(), $("#txtLinkVideoMensagem").val("")
            }), $("#urlVideoOriginal").val(""), exclusaoMensagem(), exclusaoComentario(), acoesComentario(), $("#btnCancelarFerramentaMural").prop("disabled", !0).addClass("disable"), $("#btnCancelarFerramentaMural").hide(), $("#btnCancelarFerramentaMural").closest(".sep_digala").hide(), $(".mensagem_multimidia ul:not(#cbAssuntoPost)").show(), $(".dialogo .dialogo_box .preview_post.imagens").is(":visible") && $(".dialogo .dialogo_box .preview_post.imagens").hide(), $(".dialogo .dialogo_box .preview_post.arquivos").is(":visible") && $(".dialogo .dialogo_box .preview_post.arquivos").hide(), limpaPreviewImagemMensagemRapida(), limpaArrayImagensTimeLine(), limpaPreviewArquivosMensagemRapida(), limpaArrayArquivosTimeLine(), grupos_CancelarDigaLaClick(), resetarFiltroMural()
        },
        error: function(e) {
            alert("Ocorreu um erro no banco de dados.")
        }
    })
}

function carregaTimeLineGrupo(e) {
    intAlteracaoTimeLine = 0, $("#boxTimeLineGrupos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        url: "/AVA/Grupo/Home/TimeLine",
        data: {
            intAlteracaoTimeLine: 0,
            id: idUsuarioPublico,
            intInicio: 1,
            idAssunto: e
        },
        async: !0,
        success: function(e) {
            $("#boxTimeLineGrupos").html(e).fadeIn("fast", function() {
                $(".b_tooltip_left").each(function() {
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
                
                }), $(".tooltipGostaram").tooltip({
                    offset: [0, 0],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: !0,
                    events: {
                        def: "mouseover, mouseout"
                    }
                /*/claudemir/*/
                }), acoesComentario(), exclusaoMensagem(), exclusaoComentario(), denunciarMensagem(), $(".thumbs_mural").each(function() {
                    var e = $(this),
                        o = 0,
                        a = 0;
                    $(this).find("a").each(function(i) {
                        "none" != $(this).css("display") && (o++, $(this).find("img").one("load", function() {
                            a++;
                            var i = $(this).height();
                            a == o && e.find("img:visible").each(function(a) {
                                var t = $(this),
                                    n = t.height();
                                n > i && (i = n), a == o - 1 && (e.closest("div").css("height", i), e.find("img").css({
                                    height: i,
                                    width: 217
                                }))
                            })
                        }).each(function() {
                            this.complete && $(this).load()
                        }))
                    })
                }), $(".imagens_mural").GaleriaAva()
            }), $("#txtInput").css("display", "block"), $("#btCarregaMensagensGrupos").bind("click", verMaisMensagens), $("#boxTimeLineGrupos .ctn_msg").expander({
                slicePoint: 500,
                window: 2,
                expandText: " leia mais",
                expandPrefix: "...",
                userCollapseText: "menos",
                preserveWords: !0,
                expandEffect: "fadeIn",
                collapseEffect: "fadeOut"
            }), $("#boxTimeLineGrupos .iframeVideoVimeo").on("load", function() {
                var e = $f(this),
                    o = !1;
                e.api("pause"), e.addEvent("ready", function() {
                    e.addEvent("play", function() {
                        o || (o = !0, e.api("pause"))
                    })
                })
            })
        },
        error: function() {
            $htmlErro = '<div class="container_error clearfix" style="padding: 15px;">', $htmlErro += '<h1 class="blokletters">Ops!</h1>', $htmlErro += "<h3>Aconteceu um erro inesperado. Por favor tente novamente em alguns instantes.</h3>", $htmlErro += "</div>", $Erro = "Aconteceu um erro inesperado. Por favor tente novamente em alguns instantes.", $("#boxTimeLineGrupos").hide().append($htmlErro).fadeIn(), $("#txtInput").html($Erro), $("#txtInput").css("font-weight", "bold"), $("#txtInput").css("display", "block"), $("#txtInput").focus(function() {
                $("#compartilhar").hide()
            })
        }
    })
}

function acoesComentario() {
    $(".botaoComentar").each(function() {
        var e = $(this).attr("idMensagemRapida");
        $(this).click(function() {
            $("#campoComentar_" + e + " input").focus()
        }), $("#campoComentar_" + e + " input").focus(function() {
            $(this).animate({
                width: "395px"
            }, 200), $("#campoComentar_" + e).addClass("foco")
        }), $("#campoComentar_" + e + " input").blur(function() {
            "" === $(this).val() && ($(this).animate({
                width: "426px"
            }, 200).val(""), $("#campoComentar_" + e).removeClass("foco"))
        })
    })
}

function grava_comentario(e, o) {
    if (13 == e.which && 13 == e.keyCode && "" != o.val().trim() && inputSubmeteComentario) {
        inputSubmeteComentario = !1;
        var a = o.attr("idMensagemRapida");
        $.ajax({
            url: "/AVA/Grupo/Home/GravarComentario",
            type: "POST",
            data: {
                id: a,
                strComentario: o.val()
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(e) {
                for ($("#boxComentariosGrupo_" + a).append(e).slideDown(1e3), o.val(""), exclusaoComentario(), $("#boxComentariosGrupo_" + a + " .ctn_msg").expander({
                        slicePoint: 500,
                        window: 2,
                        expandText: " leia mais",
                        expandPrefix: "...",
                        userCollapseText: "menos",
                        preserveWords: !0,
                        expandEffect: "fadeIn",
                        collapseEffect: "fadeOut"
                    }), $("#boxComentariosGrupo_" + a + " .iframeVideoVimeo").on("load", function() {
                        var e = $f(this),
                            o = !1;
                        e.api("pause"), e.addEvent("ready", function() {
                            e.addEvent("play", function() {
                                o || (o = !0, e.api("pause"))
                            })
                        })
                    }), i = 0; i < objetoIdMensagemRapida.idMsgRapida.length; i++)
                    if (objetoIdMensagemRapida.idMsgRapida[i] == a) {
                        objetoIdMensagemRapida.idMsgRapida.splice(i, 1), !objetoIdMensagemRapida.idMsgRapida.length > 0 && (bolFezAlteracaoConfiguracoes = !1);
                        break
                    }
                inputSubmeteComentario = !0
            },
            error: function() {
                alert("Erro ao salvar coment�rio."), inputSubmeteComentario = !0
            }
        })
    }
}

function buscaCusticoesMensagem(e) {
    $("#boxCurticoesMensagem_" + e).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        url: "/AVA/Grupo/Home/ListaCurtidasMensagem",
        data: {
            id: e
        },
        success: function(o) {
            $("#boxCurticoesMensagem_" + e).html(o), $(".b_tooltip_left").each(function() {
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
        error: function() {
            alert("Erro ao listar curticoes da mensagem.")
        }
    })
}

function buscaCusticoesComentario(e) {
    $("#boxCurticoesComentario_" + e).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.ajax({
        url: "/AVA/Grupo/Home/ListaCurtidasComentario",
        data: {
            id: e
        },
        success: function(o) {
            $("#boxCurticoesComentario_" + e).html(o), $(".tooltipGostaram").each(function() {
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
        error: function() {
            alert("Erro ao listar curticoes do comentario.")
        }
    })
}

function curtirDescutir_mensagem() {
    $("a.botaoCurtirGrupos").live("click", function() {
        var e = $(this).attr("idMensagemRapida");
        $(this).hasClass("ativo") ? $.ajax({
            url: "/AVA/Grupo/Home/DescurtirMensagem",
            data: {
                id: e
            },
            success: function(o) {
                buscaCusticoesMensagem(e)
            },
            error: function() {
                alert("Erro ao descurtir mensagem.")
            }
        }) : $.ajax({
            url: "/AVA/Grupo/Home/CurtirMensagem",
            data: {
                id: e
            },
            success: function(o) {
                buscaCusticoesMensagem(e)
            },
            error: function() {
                alert("Erro ao curtir mensagem.")
            }
        }), $(this).toggleClass("ativo")
    })
}

function curtirDescurtir_comentario() {
    $("a.botaoCurtirComentario").live("click", function() {
        var e = $(this).attr("idComentario");
        $(this).hasClass("ativo") ? $.ajax({
            url: "/AVA/Grupo/Home/DescurtirComentario",
            data: {
                id: e
            },
            success: function(o) {
                buscaCusticoesComentario(e)
            },
            error: function() {
                alert("Erro ao descurtir coment�rio.")
            }
        }) : $.ajax({
            url: "/AVA/Grupo/Home/CurtirComentario",
            data: {
                id: e
            },
            success: function(o) {
                buscaCusticoesComentario(e)
            },
            error: function() {
                alert("Erro ao descurtir coment�rio.")
            }
        }), $(this).toggleClass("ativo")
    })
}

function abreInfoGrupo() {
    $(".boxSobre").css("display", "block"), $("#ava_barralateral-esquerda li.current").removeClass(), $("div.icon_li.sobre").closest("li").addClass("current")
}

function verTodosQueCurtiramMensagem() {
    $(".vertodoscurtirammensagem").each(function() {
        var e = $(this),
            o = {
                autoSize: !1,
                type: "ajax",
                width: 900,
                height: 530,
                height: "auto",
                autoResize: !1,
                fitToView: !1,
                padding: 0,
                scrolling: "no",
                beforeShow: function() {
                    $("html").css({
                        overflow: "hidden"
                    })
                },
                afterClose: function() {
                    $("html").css({
                        overflow: "scroll"
                    })
                },
                afterShow: function() {
                    var o = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + e.attr("id");
                    retornaJson(o), $(".ava_lightcontent").scroll(function() {
                        if (12 == GlobalPaginacaoContador && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= $(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop) {
                            idLoadedGlobal = !0, GlobalPaginacaoModalInicio += 12, GlobalPaginacaoModalFim += 12, $.fancybox.showLoading();
                            var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=3&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                            retornaJsonNovo(e, "scrollMode")
                        }
                    })
                },
                helpers: {
                    overlay: {
                        locked: !1
                    }
                }
            };
        lightBoxAVA(e, o)
    })
}

function verTodosQueCurtiramComentario() {
    $(".vertodoscurtiramcomentario").each(function() {
        var e = $(this),
            o = {
                autoSize: !1,
                width: 900,
                height: 530,
                type: "ajax",
                autoResize: !1,
                fitToView: !1,
                padding: 0,
                scrolling: "no",
                beforeShow: function() {
                    $("html").css({
                        overflow: "hidden"
                    })
                },
                afterClose: function() {
                    $("html").css({
                        overflow: "scroll"
                    })
                },
                afterShow: function() {
                    var o = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idMensagemRapida=&idComentario=" + e.attr("id");
                    retornaJson(o)
                },
                helpers: {
                    overlay: {
                        locked: !1
                    }
                }
            };
        lightBoxAVA(e, o)
    })
}

function exclusaoMensagem() {
    $(".excluir_mensagem_grupo").each(function(e) {
        $(this).fancybox({
            fitToView: !0,
            padding: 0,
            autoSize: !0,
            closeClick: !1,
            openEffect: "none",
            autoResize: !0,
            closeEffect: "none",
            closeBtn: !1,
            helpers: {
                overlay: {
                    closeClick: !1,
                    locked: !1
                }
            },
            scrolling: "no",
            beforeShow: function() {
                $("html").css({
                    overflow: "hidden"
                })
            },
            afterClose: function() {
                $("html").css({
                    overflow: "scroll"
                })
            },
            afterShow: function() {
                $("#btnCancelarExclusaoMensagem").click(function() {
                    $.fancybox.close()
                }), $("#btnExclusaoMensagem").click(function() {
                    excluirMensagem($(this).attr("idMensagem"))
                })
            }
        })
    })
}

function exclusaoComentario() {
    $(".excluir_comentario_grupo").each(function() {
        $(this).fancybox({
            fitToView: !0,
            padding: 0,
            autoSize: !0,
            closeClick: !1,
            openEffect: "none",
            autoResize: !0,
            closeEffect: "none",
            closeBtn: !1,
            helpers: {
                overlay: {
                    closeClick: !1,
                    locked: !1
                }
            },
            scrolling: "no",
            beforeShow: function() {
                $("html").css({
                    overflow: "hidden"
                })
            },
            afterClose: function() {
                $("html").css({
                    overflow: "scroll"
                })
            },
            afterShow: function() {
                $("#btnCancelarExclusaoMensagem").click(function() {
                    $.fancybox.close()
                }), $("#btnExclusaoMensagem").click(function() {
                    excluirComentario($(this).attr("idMensagem"))
                })
            }
        })
    })
}

function excluirMensagem(e) {
    _id_msg = e, $.ajax({
        url: "/AVA/Grupo/Home/ExcluirMensagemRapida/" + _id_msg,
        type: "GET",
        success: function(e) {
            $("#msg_" + _id_msg).slideUp("slow", function() {
                $(this).remove()
            }), $.fancybox.close(), intAlteracaoTimeLine += 1
        },
        error: function(e) {
            console.debug("Ocorreu um erro no banco de dados ao excluir mensagem.")
        }
    })
}

function excluirComentario(e) {
    _id_coment = e, $.ajax({
        url: "/AVA/Grupo/Home/ExcluirComentario/" + _id_coment,
        type: "GET",
        success: function(e) {
            $("#coment_" + _id_coment).slideUp("slow", function() {
                $(this).remove()
            }), $.fancybox.close()
        },
        error: function(e) {
            console.debug("Ocorreu um erro no banco de dados ao excluir coment�rio.")
        }
    })
}

function denunciarMensagem() {
    $(".denunciar_comentario").each(function() {
        var e = $(this).attr("idMensagem"),
            o = $(this);
        $(o).click(function() {
            var o = "#boxDenunciaMensagem_" + e;
            $(o).fadeIn("fast", function() {
                $(this).find(".fechar_denuncia").click(function() {
                    $(o).fadeOut("fast")
                })
            })
        })
    })
}

function salvarDenunciaMensagem(e) {
    var o = "#boxDenunciaMensagem_" + e,
        a = $(o).find("#strMotivo").val(),
        i = $(o).find("#strLoginDenunciado").val();
    "" == a ? jAlert("Favor inserir o motivo da den�ncia!", "") : $.ajax({
        url: "/AVA/Grupo/Home/Denunciar",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            idMensagem: e,
            strMotivo: a,
            strLoginDenunciado: i
        },
        success: function(e) {
            jAlert("Den�ncia enviada com sucesso!", ""), $(o).fadeOut("fast")
        },
        error: function(e) {
            console.debug(e.status)
        }
    })
}

function validaURLVideo(e) {
    if (e.length > 0) {
        e.match(/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
        var o, o, a = {
            provider: null,
            url: RegExp.$2,
            id: RegExp.$5
        };
        if ($.support.cors = !0, o = retornaVideoURL(a), !o) return $(".verificavideo").fadeOut("fast", function() {
            $(".errovideo").text(retornaTextoErroVideo(bolVideoProibido)), bolVideoProibido = !1, strTipoVideo = "", $(".errovideo").fadeIn("slow")
        }), !1;
        bolVideoProibido || (a.provider = strTipoVideo), o.always(function() {
            return a.provider ? !0 : ($(".verificavideo").fadeOut("fast", function() {
                $(".errovideo").text(retornaTextoErroVideo(bolVideoProibido)), bolVideoProibido = !1, strTipoVideo = "", $(".errovideo").fadeIn("slow")
            }), !1)
        })
    }
    return !1
}

function montaPreviewVideoMensagem(e) {
    e = decodeURI(e).replace(/\s/g, "");
    var o = "";
    if (e.length > 0) {
        if ($(".errovideo").fadeOut("fast", function() {
                $(".verificavideo").fadeIn("slow")
            }), (e.indexOf("#t=") > 1 || e.indexOf("&t=") > 1 || e.indexOf("&amp;t=") > 1 || e.indexOf("?t=") > 1) && (o = getVideoTime(e)), e.indexOf("http://") > -1 ? e = e.replace("http://", "") : e.indexOf("https://") > -1 && (e = e.replace("https://", "")), e.indexOf("&feature=youtu.be") > -1) {
            var a = e.indexOf("&feature=youtu.be");
            if (e.indexOf("&list=") > -1) {
                var i = e.indexOf("&list=");
                e = e.substring(0, a) + e.substring(i, e.length)
            } else if (e.indexOf("#t=") > -1) {
                var t = e.indexOf("#t=");
                e = e.substring(0, a) + e.substring(t, e.length)
            } else if (e.indexOf("&t=") > -1) {
                var t = e.indexOf("&t=");
                e = e.substring(0, a) + e.substring(t, e.length)
            } else if (e.indexOf("&amp;t=") > -1) {
                var t = e.indexOf("&amp;t=");
                e = e.substring(0, a) + e.substring(t, e.length)
            } else if (e.indexOf("?t=") > -1) {
                var t = e.indexOf("?t=");
                e = e.substring(0, a) + e.substring(t, e.length)
            } else e.indexOf("&feature=youtu.be") > -1 && (e = e.substring(0, a))
        }
        e.match(/^(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be)|youtube)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
        var n, r = {
            provider: null,
            url: RegExp.$2,
            id: RegExp.$5
        };
        $.support.cors = !0, n = retornaVideoURL(r), n && "" != r.id ? n.always(function() {
            if (bolVideoProibido || (r.provider = strTipoVideo), r.provider) {
                var a = "",
                    i = "";
                $(".enviar_video, .verificavideo, .errovideo").hide(), "youtube" == r.provider ? (a = "www.youtube.com/embed/" + r.id + "?rel=0&wmode=transparent", o.length > 0 && (a += "&start=" + o)) : (i = ' class="iframeVideoVimeo" ', a = "player.vimeo.com/video/" + r.id + "?badge=0&byline=0&portrait=0&title=0&player_id=playerPreview&api=1", o.length > 0 && (a += "#t=" + o)), $("#container_preview_video").html("<iframe " + i + ' width="300" height="165" src="//' + a + '" allowTransparency="true" frameborder="0" allowfullscreen></iframe><a href="javascript: void(0);" onClick="removerPreviewVideoMensagem();" class="remover_multimidia"><span class="FontAwesome"></span>Remover</a>').fadeIn("slow", function() {
                    $(".enviar_video, .verificavideo, .errovideo").hide(), $("#compartilhar").show(), $("#compartilhar").removeClass("disable").prop("disabled", !1), $("#urlVideoOriginal").val(e), $(".iframeVideoVimeo").on("load", function() {
                        var e = $f(this),
                            o = !1;
                        e.api("pause"), e.addEvent("ready", function() {
                            e.addEvent("play", function() {
                                o || (o = !0, e.api("pause"))
                            })
                        })
                    })
                })
            } else $(".verificavideo").fadeOut("fast", function() {
                $(".errovideo").text(retornaTextoErroVideo(bolVideoProibido)), bolVideoProibido = !1, strTipoVideo = "", $(".errovideo").fadeIn("slow")
            })
        }) : $(".verificavideo").fadeOut("fast", function() {
            $(".errovideo").text(retornaTextoErroVideo(bolVideoProibido)), bolVideoProibido = !1, strTipoVideo = "", $(".errovideo").fadeIn("slow")
        })
    }
    return !1
}

function removerPreviewVideoMensagem(e) {
    (void 0 === e || null == e || "" == e) && (e = !1), $("#container_preview_video").fadeOut("slow", function() {
        $(this).find("iframe").attr("src", ""), setTimeout(function() {
            $(this).find("iframe").remove(), $(this).html("")
        }, 500), $("#txtLinkVideoMensagem").val(""), e || $(".enviar_video").show();
        var o = "Ol�! Compartilhe aqui ideias ou links!",
            a = $("#txtInput").val();
        ("" == a || a == o) && ($(".dialogo_box .preview_post.arquivos").hide(), $("#compartilhar").hide(), $("#btnCancelarFerramentaMural").hide(), $("#btnCancelarFerramentaMural").closest(".sep_digala").hide(), $(".dialogo .mensagem_multimidia ul:not(#cbAssuntoPost)").show(), $("#seletorMuralDigaLa").hide(), $(".enviar_video").hide()), $("#compartilhar").hasClass("disable") || "" === $("#txtInput").val() || ($(".dialogo .mensagem_multimidia ul:not(#cbAssuntoPost)").show(), $(".enviar_video").hide())
    })
}

function removerListUrlYoutube(e) {
    var o = "list?=?([^#&?]*)",
        a = e.match(o),
        i = "";
    if (null != a) {
        var t = "&" + a[0],
            n = a[0];
        i = e.indexOf(t) > 0 ? e.replace(t, "") : e.replace(n, "")
    } else i = e;
    return i.indexOf("http") >= 0 ? i : "http://" + i
}

function callBackDenunciaMensagem() {
    $("form[name=frmDenuncia]").find("h2").css({
        position: "absolute",
        top: "-10px"
    }), $("#enviar_email").click(function() {
        if ("" == $("#txtMotivo").val()) return alert("Favor preencher o motivo!"), !1;
        (void 0 == _idMsgDenunciaGlobal || null == _idMsgDenunciaGlobal) && (_idMsgDenunciaGlobal = 0);
        var e = $("#txtMotivo").val();
        $.ajax({
            data: {
                idMensagem: _idMsgDenunciaGlobal,
                strNome: $("#strNomeLogado").val(),
                strLogin: $("#strLoginLogado").val(),
                strEmail: $("#strEmailLogado").val(),
                strURL: $("#strURLCorrente").val(),
                strMotivo: e
            },
            type: "POST",
            url: "/AVA/Barras/Denuncia/DenunciaMensagemGravar",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(e) {
                alert("Sua den�ncia foi encaminhada para an�lise dos administradores do ambiente."), parent.$.fancybox.close()
            },
            error: function() {}
        })
    })
}

function CustomConfirmConfiguracoes(e, o, a) {
    $.fancybox({
        type: "ajax",
        href: "/AVA/Grupo/Home/AbandonarConfiguracoes/",
        afterShow: function() {
            $("body").on("click", "#btnSairPaginaConfiguracoes", function() {
                switch (bolFezAlteracaoConfiguracoes = !1, destinoConfiguracoes) {
                    case "timeline":
                        LimparCampoComentario(o), $.fancybox.close(), PrepararTimeLineFocus(a);
                        break;
                    case "digalaCompartilhar":
                        LimparCampoComentario(o), $.fancybox.close(), validaMensagemGrupo();
                        break;
                    case "btnAgendarTarefa":
                        LimparCampoComentario(o), $.fancybox.close(), FazAgendar();
                        break;
                    case "comboFiltroAssuntoTimeline":
                        LimparCampoComentario(o), $.fancybox.close(), PrepararFiltroAssuntoTimeline(destinoIdAssunto)
                }
                destinoConfiguracoes = null, destinoIdAssunto = null
            }), $("body").on("click", "#btnPermanecerPaginaConfiguracoes", function() {
                $.fancybox.close()
            })
        },
        closeBtn: !1,
        modal: !0,
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        padding: 0
    })
}

function LimparCampoComentario(e) {
    for (var o = e.idMsgRapida.length, a = o - 1; a >= 0; a--) $("#campoComentar_" + e.idMsgRapida[a] + " input").animate({
        width: "426px"
    }, 200).val(""), $("#campoComentar_" + e.idMsgRapida[a]).removeClass("foco"), e.idMsgRapida.splice(a, 1)
}

function PrepararTimeLineFocus(e) {
    $(this).animate({
        width: "395px"
    }, 200), $("#campoComentar_" + e).addClass("foco")
}

function PrepararFiltroAssuntoTimeline(e) {
    $("#hAssuntoTimeLine").val(e), $("#cbFiltroAssunto input[type=checkbox]").removeAttr("checked"), $("#rbFiltroAssunto_" + e).attr("checked", "checked");
    var o = $("#rbFiltroAssunto_" + e).parent().text() + '<span class="caret"></span>';
    $("#btnFiltroGrupo").html(o), $("#cbFiltroAssunto").parent().removeClass("open"), carregaTimeLineGrupo(e), $(".criar_evento").hide(), $(".convite_combo").blur(), $(".config_combo").blur(), $(".box_agenda.criar_evento").css("display", "none"), $("#txtInput").blur()
}

function PrepararDigala() {
    $("#compartilhar").show(), $("#btnCancelarFerramentaMural").show(), $("#btnCancelarFerramentaMural").closest(".sep_digala").show(), $("#btnCancelarFerramentaMural").prop("disabled", !1).removeClass("disable");
    var e = "";
    if (void 0 != $("#txtLinkVideoMensagem").val() && (e = $("#txtLinkVideoMensagem").val()), e.length > 0) void 0 != $("#container_preview_video").find("iframe").attr("src") && ("" != $("#container_preview_video").find("iframe").attr("src").replace(/\s/g, "") ? $("#compartilhar").removeClass("disable").prop("disabled", !1) : $("#compartilhar").addClass("disable").prop("disabled", !0));
    else {
        var o = !1;
        o = $(this).val().length <= 0 && void 0 !== objetoImagens && null != objetoImagens && null != objetoImagens.imagens && 0 == objetoImagens.imagens.length ? !0 : !1, o = o && $(this).val().length <= 0 && void 0 !== objetoArquivos && null != objetoArquivos && null != objetoArquivos.arquivos && 0 == objetoArquivos.arquivos.length ? !0 : !1, o && $("#compartilhar").addClass("disable").prop("disabled", !0)
    }
}
var bolFezAlteracaoConfiguracoes = !1,
    strMensagemConfiguracaoNaoSalvaUnload = "Voc� fez altera��es nesta p�gina que ainda n�o foram salvas.",
    strMensagemConfiguracaoNaoSalva = "Voc� fez altera��es nesta p�gina que ainda n�o foram salvas. Tem certeza de que deseja sair?",
    tpClickGrupo = "click",
    _idMsgDenunciaGlobal = null,
    _idMsgComentarioGlobal = null,
    objetoIdMensagemRapida = {
        idMsgRapida: new Array
    },
    destinoConfiguracoes = null,
    destinoIdAssunto = null,
    bolPassouNoBeforeUnload = !1;
window.onbeforeunload = function(e) {
    return bolPassouNoBeforeUnload = !0, bolFezAlteracaoConfiguracoes === !0 ? strMensagemConfiguracaoNaoSalvaUnload : void 0
}, $(function() {
    $("body").on("keyup change paste", "input[name=strComentarioGrupo]", function(e) {
        var o = !1,
            a = 0;
        for (_idMsgComentarioGlobal = $(e.target).attr("idMensagemRapida"), a = 0; a < objetoIdMensagemRapida.idMsgRapida.length; a++)
            if (objetoIdMensagemRapida.idMsgRapida[a] == _idMsgComentarioGlobal) {
                o = !0;
                break
            }
        o || "" != !$("#campoComentar_" + _idMsgComentarioGlobal + " input").val() ? o = !1 : objetoIdMensagemRapida.idMsgRapida.push(_idMsgComentarioGlobal), "" == !$("#campoComentar_" + _idMsgComentarioGlobal + " input").val() ? bolFezAlteracaoConfiguracoes = !0 : void 0 !== _idMsgComentarioGlobal && (objetoIdMensagemRapida.idMsgRapida.splice(a, 1), !objetoIdMensagemRapida.idMsgRapida.length > 0 && (bolFezAlteracaoConfiguracoes = !1))
    }), $("body").on(tpClickGrupo, function(e) {
        $(e.target).closest(".combo_denunciar_excluir").hasClass("combo_denunciar_excluir") || $(e.target).hasClass("combo_denunciar_excluir") || $(".combo_denunciar_excluir").find("ul").hide()
    }), $("body").on(tpClickGrupo, ".combo_denunciar_excluir", function(e) {
        e.preventDefault(), $(this).find("ul").show()
    }), $("body").on(tpClickGrupo, ".denunciar_mensagem", function(e) {
        e.preventDefault(), _idMsgDenunciaGlobal = $(this).attr("ide"), $.fancybox({
            type: "ajax",
            href: "/rede/conteudo_denuncia.asp",
            scrolling: "no",
            beforeShow: function() {
                $("html").css({
                    overflow: "hidden"
                })
            },
            afterClose: function() {
                $("html").css({
                    overflow: "scroll"
                })
            },
            afterShow: callBackDenunciaMensagem,
            helpers: {
                overlay: {
                    locked: !1
                }
            }
        })
    }), $("body").on(tpClickGrupo, ".excluir_mensagem_grupo", function(e) {
        e.preventDefault();
        var o = $(this).attr("ident");
        $.fancybox({
            type: "ajax",
            href: "/AVA/Grupo/Home/ListaExclusaoMensagem/" + o,
            closeBtn: !1,
            padding: 0,
            helpers: {
                overlay: {
                    closeClick: !1,
                    locked: !1
                }
            },
            scrolling: "no",
            beforeShow: function() {
                $("html").css({
                    overflow: "hidden"
                })
            },
            afterClose: function() {
                $("html").css({
                    overflow: "scroll"
                })
            },
            afterShow: function() {
                $("#btnCancelarExclusaoMensagem").click(function() {
                    $.fancybox.close()
                }), $("#btnExclusaoMensagem").click(function() {
                    $(this).addClass("disable"), excluirMensagem(o)
                })
            }
        })
    }), $(document).ready(function() {
        $(".ctn_msg").expander({
            slicePoint: 500,
            window: 2,
            expandText: " leia mais",
            expandPrefix: "...",
            userCollapseText: "menos",
            preserveWords: !0,
            expandEffect: "fadeIn",
            collapseEffect: "fadeOut"
        }), $(".iframeVideoVimeo").on("load", function() {
            var e = $f(this),
                o = !1;
            e.api("pause"), e.addEvent("ready", function() {
                e.addEvent("play", function() {
                    o || (o = !0, e.api("pause"))
                })
            })
        })
    });
    var e = null;
    if (Modernizr.touch) {
        var o = navigator.userAgent.toLowerCase(),
            a = o.indexOf("android") > -1;
        tpClickGrupo = a ? "click" : "touchstart"
    }
    $(".timeline").on(tpClickGrupo, ".comentConteudo .ver_mais_doc", function(e) {
        e.preventDefault();
        var o = $(this);
        o.prev().hasClass("mostra") ? (o.prev().slideToggle("slow", function() {
            $(this).removeClass("mostra")
        }), o.text("Ver mais")) : (o.prev().slideToggle("slow", function() {
            $(this).addClass("mostra")
        }), o.text("Ver menos"))
    }), $("#compartilhar").live("click", function() {
        bolFezAlteracaoConfiguracoes ? (destinoConfiguracoes = "digalaCompartilhar", CustomConfirmConfiguracoes("digalaCompartilhar", objetoIdMensagemRapida, 0)) : validaMensagemGrupo()
    }), $("#txtInput").focus(function() {
        $("#compartilhar").show(), $("#btnCancelarFerramentaMural").show(), $("#btnCancelarFerramentaMural").closest(".sep_digala").show(), $("#btnCancelarFerramentaMural").prop("disabled", !1).removeClass("disable");
        var e = "";
        if (void 0 != $("#txtLinkVideoMensagem").val() && (e = $("#txtLinkVideoMensagem").val()), e.length > 0) void 0 != $("#container_preview_video").find("iframe").attr("src") && ("" != $("#container_preview_video").find("iframe").attr("src").replace(/\s/g, "") ? $("#compartilhar").removeClass("disable").prop("disabled", !1) : $("#compartilhar").addClass("disable").prop("disabled", !0));
        else {
            var o = !1;
            o = $(this).val().length <= 0 && void 0 !== objetoImagens && null != objetoImagens && null != objetoImagens.imagens && 0 == objetoImagens.imagens.length ? !0 : !1, o = o && $(this).val().length <= 0 && void 0 !== objetoArquivos && null != objetoArquivos && null != objetoArquivos.arquivos && 0 == objetoArquivos.arquivos.length ? !0 : !1, o && $("#compartilhar").addClass("disable").prop("disabled", !0)
        }
    }), $("#txtInput").keyup(function() {
        var o = $(this).val(),
            a = "";
        if (void 0 != $("#txtLinkVideoMensagem").val() && (a = $("#txtLinkVideoMensagem").val()), "" == o || o == i)
            if ("" != a && void 0 != a) void 0 != $("#container_preview_video").find("iframe").attr("src") && ("" != $("#container_preview_video").find("iframe").attr("src").replace(/\s/g, "") ? ($("#compartilhar").removeClass("disable").prop("disabled", !1), $("#btnCancelarFerramentaMural").prop("disabled", !1).removeClass("disable")) : ($("#compartilhar").addClass("disable").prop("disabled", !0), $("#btnCancelarFerramentaMural").prop("disabled", !0).addClass("disable")));
            else {
                var t = !1;
                t = void 0 !== objetoImagens && null != objetoImagens && null != objetoImagens.imagens && 0 == objetoImagens.imagens.length ? !0 : !1, t = t && void 0 !== objetoArquivos && null != objetoArquivos && null != objetoArquivos.arquivos && 0 == objetoArquivos.arquivos.length ? !0 : !1, t && $("#compartilhar").addClass("disable").prop("disabled", !0)
            } else $("#btnCancelarFerramentaMural").prop("disabled", !1).removeClass("disable"), (void 0 == e || null != e) && ("" != a && void 0 != a ? void 0 != $("#container_preview_video").find("iframe").attr("src") && ("" != $("#container_preview_video").find("iframe").attr("src").replace(/\s/g, "") ? $("#compartilhar").removeClass("disable").prop("disabled", !1) : $("#compartilhar").addClass("disable").prop("disabled", !0)) : $("#compartilhar").removeClass("disable").prop("disabled", !1))
    }), $("#txtLinkVideoMensagem").live("input paste", function() {
        0 == $(this).val().length ? $(".errovideo, .verificavideo").hide() : (void 0 !== e && null != e && clearTimeout(e), e = setTimeout(function() {
            montaPreviewVideoMensagem($("#txtLinkVideoMensagem").val())
        }, 1e3))
    }), $("#txtLinkVideoMensagem").keyup(function() {
        0 == $(this).val().length ? ($(".errovideo, .verificavideo").hide(), "" != $("#txtInput").val() && $("#compartilhar").removeClass("disable").prop("disabled", !1)) : ($("#compartilhar").addClass("disable").prop("disabled", !0), void 0 !== e && null != e && clearTimeout(e), e = setTimeout(function() {
            montaPreviewVideoMensagem($("#txtLinkVideoMensagem").val())
        }, 1e3))
    }), $("body").on("keypress", "#strComentarioGrupo", function(e) {
        var o = $(this);
        grava_comentario(e, o)
    });
    var i = "Ol�! compartilhe aqui a sua ideia ou link!";
    "post" == _action.toLowerCase() ? ($("#txtInput").css("display", "block"), $(".b_tooltip_left").each(function() {
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
    }), $(".tooltipGostaram").tooltip({
        offset: [0, 0],
        opacity: 1,
        position: "top center",
        effect: "slide",
        relative: !0,
        events: {
            def: "mouseover, mouseout"
        }
    }), exclusaoMensagem(), exclusaoComentario(), denunciarMensagem(), acoesComentario()) : carregaTimeLineGrupo(0), $("body").on("click", ".carregarComentarios", function(e) {
        e.preventDefault();
        var o = $(this).attr("idMensagem"),
            a = $(this).closest(".comentariosMuralGrupo");
        a.html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.post("/AVA/Grupo/Home/TodosComentarios/" + o, {}, function(e) {
            a.html(e).slideDown("fast"), $(".tooltipGostaram").each(function() {
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
            }), $(".ctn_msg", a).expander({
                slicePoint: 500,
                window: 2,
                expandText: " leia mais",
                expandPrefix: "...",
                userCollapseText: "menos",
                preserveWords: !0,
                expandEffect: "fadeIn",
                collapseEffect: "fadeOut"
            }), $(" .iframeVideoVimeo", a).on("load", function() {
                var e = $f(this),
                    o = !1;
                e.api("pause"), e.addEvent("ready", function() {
                    e.addEvent("play", function() {
                        o || (o = !0, e.api("pause"))
                    })
                })
            }), exclusaoComentario()
        })
    }), $("body").on("click", "input:radio[name=cbFiltroAssuntoTimeLine]", function() {
        var e = $(this).val();
        $("#btnFiltroGrupo").attr("idAssunto", e), carregaTimeLineGrupo(e)
    }), $("#ava_wrap").on("click", ".vertodoscurtiramcomentario", function(e) {
        e.preventDefault();
        var o = $(this);
        $.fancybox({
            href: $(this).attr("href"),
            autoSize: !1,
            width: 900,
            height: 530,
            type: "ajax",
            autoResize: !1,
            fitToView: !1,
            padding: 0,
            scrolling: "no",
            beforeShow: function() {
                $("html").css({
                    overflow: "hidden"
                })
            },
            afterClose: function() {
                $("html").css({
                    overflow: "scroll"
                })
            },
            afterShow: function() {
                var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idMensagemRapida=&idComentario=" + o.attr("id");
                retornaJson(e), $(".ava_lightcontent").scroll(function() {
                    12 == GlobalPaginacaoContador && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= $(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop && (idLoadedGlobal = !0, GlobalPaginacaoModalInicio += 12, GlobalPaginacaoModalFim += 12, $.fancybox.showLoading(), $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idMensagemRapida=&idComentario=" + o.attr("id") + "&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim, retornaJsonNovo($urlEducCompleto, "scrollMode"))
                })
            },
            beforeLoad: function() {
                $("body").css({
                    "overflow-y": "hidden"
                })
            },
            afterClose: function() {
                $("body").css({
                    "overflow-y": "visible"
                })
            },
            helpers: {
                overlay: {
                    locked: !1
                }
            }
        })
    }), $("#ava_wrap").on("click", "a.botaoCurtirComentario", function(e) {
        e.preventDefault();
        var o = $(this).attr("idComentario");
        $(this).hasClass("ativo") ? $.ajax({
            url: "/AVA/Grupo/Home/DescurtirComentario",
            data: {
                id: o
            },
            success: function(e) {
                buscaCusticoesComentario(o)
            },
            error: function() {
                alert("Erro ao descurtir coment�rio.")
            }
        }) : $.ajax({
            url: "/AVA/Grupo/Home/CurtirComentario",
            data: {
                id: o
            },
            success: function(e) {
                buscaCusticoesComentario(o)
            },
            error: function() {
                alert("Erro ao descurtir coment�rio.")
            }
        }), $(this).toggleClass("ativo")
    }), $("#ava_wrap").on("click", ".vertodoscurtirammensagem", function(e) {
        e.preventDefault();
        var o = $(this),
            a = $(this).attr("idmensagem"),
            i = {
                href: o.attr("href"),
                autoSize: !1,
                width: 900,
                height: 530,
                type: "ajax",
                autoResize: !1,
                fitToView: !1,
                padding: 0,
                scrolling: "no",
                beforeShow: function() {
                    $("html").css({
                        overflow: "hidden"
                    })
                },
                afterClose: function() {
                    $("html").css({
                        overflow: "scroll"
                    })
                },
                afterShow: function() {
                    var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + a;
                    retornaJson(e), $(".ava_lightcontent").scroll(function() {
                        12 == GlobalPaginacaoContador && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= $(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop && (idLoadedGlobal = !0, GlobalPaginacaoModalInicio += 12, GlobalPaginacaoModalFim += 12, $.fancybox.showLoading(), $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + a + "&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim, retornaJsonNovo($urlEducCompleto, "scrollMode"))
                    })
                },
                helpers: {
                    overlay: {
                        locked: !1
                    }
                }
            };
        $.fancybox(i)
    }), $("#ava_wrap").on("click", "a.botaoCurtirGrupos", function(e) {
        e.preventDefault();
        var o = $(this).attr("idMensagemRapida");
        $(this).hasClass("ativo") ? $.ajax({
            url: "/AVA/Grupo/Home/DescurtirMensagem",
            data: {
                id: o
            },
            success: function(e) {
                buscaCusticoesMensagem(o)
            },
            error: function() {
                alert("Erro ao descurtir mensagem.")
            }
        }) : $.ajax({
            url: "/AVA/Grupo/Home/CurtirMensagem",
            data: {
                id: o
            },
            success: function(e) {
                buscaCusticoesMensagem(o)
            },
            error: function() {
                alert("Erro ao curtir mensagem.")
            }
        }), $(this).toggleClass("ativo")
    })
});
var intAlteracaoTimeLine = 0,
    intInicioTimeLineGrupo = 2,
    inputSubmeteComentario = !0;