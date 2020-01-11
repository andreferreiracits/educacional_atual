var urlAtual;
urlAtual = location.href;
var _id_c_d = null;
var _txt_c_d = null;
var GlobalPaginacaoModalInicio = 1;
var GlobalPaginacaoModalFim = 12;
var GlobalPaginacaoContador = 0;
var idLoadedGlobal = false;
var xmlGlobalPaginado = null;
var bolFezAlteracaoConfiguracoes = false;
var strMensagemConfiguracaoNaoSalvaUnload = "Você fez alterações nesta página que ainda não foram salvas.";
var strMensagemConfiguracaoNaoSalva = "Você fez alterações nesta página que ainda não foram salvas. Tem certeza de que deseja sair?";
var _idMsgComentarioGlobal = null;
var objetoIdMensagemRapida = {
    idMsgRapida: new Array()
};
var destinoIdAssunto = null;
var destinoConfiguracoes = null;
var bolPassouNoBeforeUnload = false;
window.onbeforeunload = function(a) {
    bolPassouNoBeforeUnload = true;
    if (bolFezAlteracaoConfiguracoes === true) {
        return strMensagemConfiguracaoNaoSalvaUnload
    }
};

function unloadipad() {
    if (bolPassouNoBeforeUnload === false) {
        if (bolFezAlteracaoConfiguracoes === true) {}
    }
    bolPassouNoBeforeUnload = false
}
var booleTipOptionsStyle = (typeof bolEstaNoMural != "undefined" && bolEstaNoMural) ? "tooltip_compartilhamento" : "qtip-light qtipAvaSelector tooltip_branco_qtip destino_post_mural";
var booleTipOptions = {
    urlAjax: "/AVA/Seletor/Home/destinoPost",
    style: {
        classes: booleTipOptionsStyle
    },
    position: {
        my: "bottom left",
        at: "top center",
        adjust: {
            y: 0
        }
    }
};
$(function() {
    $("body").on("keyup change paste", "input[name=strComentario]", function(h) {
        var g = false;
        var f = 0;
        _idMsgComentarioGlobal = $(h.target).attr("idmensagemrapida");
        for (f = 0; f < objetoIdMensagemRapida.idMsgRapida.length; f++) {
            if (objetoIdMensagemRapida.idMsgRapida[f] == _idMsgComentarioGlobal) {
                g = true;
                break
            }
        }
        if (!g && !$("#campoComentar_" + _idMsgComentarioGlobal + " input").val() == "") {
            objetoIdMensagemRapida.idMsgRapida.push(_idMsgComentarioGlobal)
        } else {
            g = false
        }
        if (!$("#campoComentar_" + _idMsgComentarioGlobal + " input").val() == "") {
            bolFezAlteracaoConfiguracoes = true
        } else {
            if (_idMsgComentarioGlobal !== undefined) {
                objetoIdMensagemRapida.idMsgRapida.splice(f, 1);
                if (!objetoIdMensagemRapida.idMsgRapida.length > 0) {
                    bolFezAlteracaoConfiguracoes = false
                }
            }
        }
    });
    $(document).ready(function() {
        $(".post_texto").expander({
            slicePoint: 500,
            window: 2,
            expandText: " leia mais",
            expandPrefix: "...",
            userCollapseText: "menos",
            preserveWords: true,
            expandEffect: "fadeIn",
            collapseEffect: "fadeOut"
        });
        $(".ctn_msg").expander({
            slicePoint: 500,
            window: 2,
            expandText: " leia mais",
            expandPrefix: "...",
            userCollapseText: "menos",
            preserveWords: true,
            expandEffect: "fadeIn",
            collapseEffect: "fadeOut"
        });
        $(".iframeVideoVimeo").on("load", function() {
            var f = $f(this);
            var e = false;
            f.api("pause");
            f.addEvent("ready", function() {
                f.addEvent("play", function() {
                    if (!e) {
                        e = true;
                        f.api("pause")
                    }
                })
            })
        })
    });
    var d = "click";
    var c = "focus";
    if (Modernizr.touch) {
        d = "touchstart"
    }
    $(".timeline").on(d, "article .ver_mais_doc", function(g) {
        g.preventDefault();
        var f = $(this);
        if (!f.prev().hasClass("mostra")) {
            f.prev().slideToggle("slow", function() {
                $(this).addClass("mostra")
            });
            f.text("Ver menos")
        } else {
            f.prev().slideToggle("slow", function() {
                $(this).removeClass("mostra")
            });
            f.text("Ver mais")
        }
    });
    $("body").on(d, ".combo_denunciar_excluir", function(f) {
        f.preventDefault();
        $(this).find("ul").show()
    });
    var b = 0;
    $("body").on(d, function(m) {
        b = 0;
        var l = "507px";
        var k = "471px";
        var f = "441px";
        var h = "410px";
        var j = "";
        if (!$(m.target).closest(".combo_denunciar_excluir").hasClass("combo_denunciar_excluir") && !$(m.target).hasClass("combo_denunciar_excluir")) {
            $(".combo_denunciar_excluir").find("ul").hide()
        }
        if (!$(m.target).closest(".post_opcoes").hasClass("post_opcoes") && !$(m.target).hasClass("post_opcoes")) {
            $(".post_opcoes").find("ul").hide()
        }
        if (Modernizr.touch && !$(m.target).hasClass("inputComentario")) {
            if ($(m.target).parent().hasClass("botaoComentar") || $(m.target).hasClass("botaoComentar") || $(m.target).parent().hasClass("escreverMais_") || $(m.target).hasClass("escreverMais_")) {
                var g = $(m.target).parent().attr("idMensagemRapida") || $(m.target).attr("idMensagemRapida");
                b = g;
                $("html, body").animate({
                    scrollTop: $("#campoComentar_" + g).offset().top - 400
                }, 1000);
                j = $("#campoComentar_" + g).closest("article").hasClass("pgedu") ? k : h;
                $("#campoComentar_" + g + " input").animate({
                    width: j
                }, 200);
                $("#campoComentar_" + g).addClass("foco");
                $("#campoComentar_" + g + " input").blur(function() {
                    if ($(this).val() === "Escreva um comentário...") {
                        $(this).animate({
                            width: "441px"
                        }, 200).val("");
                        $("#campoComentar_" + g).removeClass("foco")
                    }
                })

            } else {
                $("#campoComentar_" + g + " input").blur(function() {
                    if ($(this).val() === "Escreva um comentário...") {
                        $(this).animate({
                            width: "441px"
                        }, 200).val("");
                        $("#campoComentar_" + g).removeClass("foco");
                    }
                    alert("lse");
                })
            }
        } else {
            if ($(m.target).parent().hasClass("botaoComentar") || $(m.target).hasClass("botaoComentar") || $(m.target).hasClass("inputComentario") || $(m.target).parent().hasClass("escreverMais_") || $(m.target).hasClass("escreverMais_")) {
                var g = $(m.target).parent().attr("idMensagemRapida") || $(m.target).attr("idMensagemRapida");
                b = g;
                if (!$("#campoComentar_" + g).hasClass("foco")) {
                    j = $("#campoComentar_" + g).closest("article").hasClass("pgedu") ? k : h;
                    if (Modernizr.touch) {
                        // $("#campoComentar_" + g + " input").animate({
                        //     width: j
                        // }, 200);
                    } else {
                        // $("#campoComentar_" + g + " input").animate({
                        //     width: j
                        // }, 200).focus()
                    }
                    $("#campoComentar_" + g).addClass("foco");
                    $("#campoComentar_" + g + " input").css("width","90%");
                    //alert("0");
                }
                $("#campoComentar_" + g + " input").blur(function() {
                    if ($(this).val() === "Escreva um comentário...") {
                        $(this).animate({
                            //width: "441px"
                        }, 200).val("");
                        $("#campoComentar_" + g).removeClass("foco");
                    }
                    $("#campoComentar_" + g + " input").css("width","100%");
                    //alert("1");
                })
            } else {
                $("#campoComentar_" + g + " input").blur(function() {
                    if ($(this).val() === "Escreva um comentário...") {
                        $(this).animate({
                            width: "441px"
                        }, 200).val("");
                        $("#campoComentar_" + g).removeClass("foco")
                    }
                    alert("2");
                })
            }
        }
    });
    $("body").on(d, ".escreverMais_", function(g) {
        var f = $(g.target).parent().attr("idMensagemRapida") || $(g.target).attr("idMensagemRapida");
        $("html,body").animate({
            scrollTop: $("#campoComentar_" + f + " input").offset().top - 220
        }, 200)
    });
    $("body").on(d, ".quem_gostou_cmt", function(f) {
        f.preventDefault();
        var g = $(this);
        $.fancybox({
            href: g.attr("href"),
            autoSize: false,
            width: 700,
            height: 470,
            autoResize: false,
            fitToView: false,
            type: "ajax",
            afterShow: function() {
                var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idMensagemRapida=&idComentario=" + g.attr("ide");
                retornaJson(e)
            },
            helpers: {
                overlay: {
                    locked: false
                }
            }
        })
    });
    $("body").on("mouseenter", "#ava_fluxoarticles .opcoes, #paging_container1 .opcoes", function(f) {
        f.preventDefault();
        $(this).find(".cluetip").css("display", "inline-block")
    }).on("mouseleave", "#ava_fluxoarticles .opcoes, #paging_container1 .opcoes", function(f) {
        f.preventDefault();
        $(this).find(".cluetip").css("display", "none")
    }).on(d, "#ava_fluxoarticles .opcoes .mr_opcoes, #paging_container1 .opcoes .mr_opcoes", function(f) {
        f.preventDefault()
    });
    $("body").on(d, ".quem_gostou_msg", function(f) {
        idLoadedGlobal = false;
        f.preventDefault();
        var g = $(this);
        $.fancybox({
            href: g.attr("href"),
            autoSize: false,
            width: 900,
            height: 470,
            autoResize: false,
            fitToView: false,
            type: "ajax",
            afterShow: function() {
                var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + g.closest("article").attr("ide");
                retornaJson(e)
            },
            helpers: {
                overlay: {
                    locked: false
                }
            }
        })
    });
    $("body").on(d, ".carregarComentarios", function(l) {
        if (!$(this).hasClass("carregando")) {
            $(this).addClass("carregando");
            l.preventDefault();
            var f = $(this);
            var j = $(this).attr("ide");
            var k = j;
            var h = $(this).closest(".comentariosMural");
            var n = $(this).hasClass("pagina") ? true : false;
            var g = {
                id: k
            };
            if (n) {
                g = {
                    id: k,
                    maximo: 50,
                    dataPrimeiroLoad: $("#dtmPriUpd_" + k).val(),
                    idsCarregados: $("#idsPriUpd_" + k).val()
                }
            }
            var m = "/ava/Mural/Home/TodosComentarios/";
            if (!n) {
                h.html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />")
            } else {
                f.before('<div style="text-align: center;" class="divLoading_' + k + '"><img src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif" border="0" style="float:none;" /></div>')
            }
            $.post(m, g, function(r) {
                $(this).removeClass("carregando");
                if (!n) {
                    h.html(r).slideDown("fast")
                } else {
                    $(".divLoading_" + k).remove();
                    f.before(r);
                    $(".escreverMais_[ide=" + k + "]").remove();
                    if ($("#bolPodeComentar").val() == "True") {
                        f.after('<div ide="' + k + '" idmensagemrapida="' + k + '" class="escreverMais_" style=""><a class="color5" href="javascript:void(0);">Escreva um comentário...</a></div>')
                    }
                    var p = "";
                    if ($.trim($("#idsPriUpd_" + k).val()) != "") {
                        p += (atob($("#idsPriUpd_" + k).val()).split(","))
                    }
                    if ($.trim($("#idsUltUpd_" + k).val()) != "") {
                        if (p != "") {
                            p += ","
                        }
                        p += (atob($("#idsUltUpd_" + k).val()).split(","))
                    }
                    $("#idsPriUpd_" + k).val(btoa(p));
                    var o = parseInt(atob($("#totCom_" + k).val()));
                    var q = atob($("#idsPriUpd_" + k).val()).split(",").length;
                    var e = $("#bolVerMais50_" + k).val() == "1";
                    if (e) {
                        f.removeClass("carregando");
                        $(".carregarComentarios[ide=" + k + "] .totalCarregado").text(q + " de " + o)
                    } else {
                        $(".carregarComentarios[ide=" + k + "]").slideUp().remove()
                    }
                    $("#idsUltUpd_" + k).remove();
                    $("#bolVerMais50_" + k).remove();
                    $("#totComUpd_" + k).remove()
                }
                $(".ctn_msg", h).expander({
                    slicePoint: 500,
                    window: 2,
                    expandText: " leia mais",
                    expandPrefix: "...",
                    userCollapseText: "menos",
                    preserveWords: true,
                    expandEffect: "fadeIn",
                    collapseEffect: "fadeOut"
                });
                $(".iframeVideoVimeo", h).on("load", function() {
                    var t = $f(this);
                    var s = false;
                    t.api("pause");
                    t.addEvent("ready", function() {
                        t.addEvent("play", function() {
                            if (!s) {
                                s = true;
                                t.api("pause")
                            }
                        })
                    })
                });
                $(".compartilhado", h).booleTip(booleTipOptions)
            })
        }
    });
    $("#ava_wrap").on(d, "a.botaoCurtirGrupos", function(g) {
        g.preventDefault();
        var f = $(this).attr("idMensagemRapida");
        if ($(this).hasClass("ativo")) {
            $.ajax({
                url: "/AVA/mural/Home/DescurtirMensagem",
                data: {
                    id: f
                },
                success: function(e) {
                    $.jStorage.deleteKey("timeline" + idUsuarioCript);
                    $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                    buscaCusticoesMensagem(f)
                },
                error: function() {
                    alert("Erro ao descurtir mensagem.")
                }
            })
        } else {
            $.ajax({
                url: "/AVA/Mural/Home/CurtirMensagem",
                data: {
                    id: f
                },
                success: function(e) {
                    $.jStorage.deleteKey("timeline" + idUsuarioCript);
                    $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                    buscaCusticoesMensagem(f)
                },
                error: function() {
                    alert("Erro ao curtir mensagem.")
                }
            })
        }
        $(this).toggleClass("ativo")
    });
    $("#ava_wrap").on(d, "a.botaoCurtirComentario", function(g) {
        g.preventDefault();
        var f = $(this).attr("idComentario");
        if ($(this).hasClass("ativo")) {
            $.ajax({
                url: "/AVA/Mural/Home/DescurtirComentario",
                data: {
                    id: f
                },
                success: function(e) {
                    $.jStorage.deleteKey("timeline" + idUsuarioCript);
                    $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                    buscaCusticoesComentario(f)
                },
                error: function() {
                    alert("Erro ao descurtir comentário.")
                }
            })
        } else {
            $.ajax({
                url: "/AVA/Mural/Home/CurtirComentario",
                data: {
                    id: f
                },
                success: function(e) {
                    $.jStorage.deleteKey("timeline" + idUsuarioCript);
                    $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                    buscaCusticoesComentario(f)
                },
                error: function() {
                    alert("Erro ao descurtir comentário.")
                }
            })
        }
        $(this).toggleClass("ativo")
    });
    $("#ava_wrap").on(d, ".vertodoscurtirammensagem", function(f) {
        GlobalPaginacaoModalInicio = 1;
        GlobalPaginacaoModalFim = 12;
        idLoadedGlobal = false;
        f.preventDefault();
        var j = $(this);
        var h = $(this).attr("idmensagem");
        var g = {
            href: j.attr("href"),
            autoSize: false,
            width: 900,
            height: 530,
            type: "ajax",
            autoResize: false,
            fitToView: false,
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
                var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + h;
                retornaJsonNovo(e);
                $(".ava_lightcontent").scroll(function() {
                    if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                        idLoadedGlobal = true;
                        GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                        GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                        $.fancybox.showLoading();
                        var k = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + h + "&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                        retornaJsonNovo(k, "scrollMode")
                    }
                })
            },
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };
        $.fancybox(g)
    });
    $("#ava_wrap").on(d, ".vertodoscurtiramcomentario", function(f) {
        GlobalPaginacaoModalInicio = 1;
        GlobalPaginacaoModalFim = 12;
        idLoadedGlobal = false;
        f.preventDefault();
        var j = $(this);
        var h = $(this).attr("id");
        var g = {
            href: j.attr("href"),
            autoSize: false,
            width: 900,
            height: 530,
            autoResize: false,
            fitToView: false,
            padding: 0,
            type: "ajax",
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
                var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + h;
                retornaJsonNovo(e);
                $(".ava_lightcontent").scroll(function() {
                    if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                        idLoadedGlobal = true;
                        GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                        GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                        $.fancybox.showLoading();
                        var k = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + h + "&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                        retornaJsonNovo(k, "scrollMode")
                    }
                })
            },
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };
        $.fancybox(g)
    });
    $("body").on(d, ".msg_comente", function(f) {
        f.preventDefault();
        _this = $(this);
        $(".container_comment").has("input[type=text]").not(_this.closest("article").find(".container_comment")).hide();
        _this.closest("article").find(".container_comment:last").fadeIn("fast", function() {
            $(this).find("input[type=text]").focus()
        })
    });
    // ...
    /*$("body").on(d, ".opcao_editar", function(f) {
        var idMensagemRapida = $(this).attr("ident");  
        $.ajax({
            //url: "/AVA/mural/Home/RetornaMensagemRapida",
            url: "/AVA/mural/Home/RetornaFeedUser",
            data: {
                idMensagemRapida: idMensagemRapida
            },
            success: function(c) {
                console.log(c);
            },
            error: function() {
                console.log("Erro ao editar a Mensagem Rapida")
            }
        });
    });*/

    $("body").on(d, ".opcao_editar", function(f) {
        //flag = true;
        var idMensagemRapida = $(this).attr("ident");
        var content = $('.conteudo'+idMensagemRapida+' p').text();
        
        content = $.trim(content);

        $('.conteudo'+idMensagemRapida+' p').html('');

        $('.conteudo'+idMensagemRapida+' p').append('<textarea id="txtInputEdit" class="alter-input" autocomplete="off" cols="68" rows="2" style="display: block;">'+content+'</textarea>');
        $('#modulos_extras'+idMensagemRapida).show();
        
        $('#txtInputEdit').focus();
        $('#txtInputEdit').unbind('focusout');

        $('#EditPost'+idMensagemRapida).click(function(){
            EditPost(idMensagemRapida);
            $('#modulos_extras'+idMensagemRapida).hide();
        });

        $('#btnCancelarEdit'+idMensagemRapida).click(function(){
            $('#txtInputEdit').unbind('focusout');
            $('.conteudo'+idMensagemRapida+' p').html('');
            $('.conteudo'+idMensagemRapida+' p').html(content);           
            $('#modulos_extras'+idMensagemRapida).hide();
        });
        
        $("#avaMsg_"+idMensagemRapida).keypress(function(event) {
            if (event.ctrlKey === true) { 
                EditPost(idMensagemRapida);
                $('#modulos_extras'+idMensagemRapida).hide();
            }
        });
    
    });
   
    function EditPost(idMsgR){
            var textEdt = $('#txtInputEdit').val();

            console.log(textEdt);
              
              $.ajax({
                url: "/AVA/Mural/Home/EditMensagemNovaHome",
                type: "POST",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {
                    idMensagem: idMsgR,
                    mensagem: textEdt
                },
                success: function(e) {
                    //$('#glitter'+idMsgR).fadeTo( "slow", 0.8 );
                    //$('#glitter'+idMsgR).fadeTo( "slow", 0 );                  
                    $('#conteudo'+idMsgR+' p').html('');
                    $('#conteudo'+idMsgR+' p').html(textEdt);
                    $('#conteudo'+idMsgR+' p').addClass("orange-border", 1000);
                    $('#conteudo'+idMsgR+' p').removeClass("orange-border", 1000);
                },
                error: function(e) {
                    alert("Erro ao editar publicação.")
                }
            })
    }

    $("input[name=strComentario]").live("focus", function() {
        if ($(this).val() == "Escreva um comentário...") {
            $(this).val("")
        }
    });
    $("input[name=strComentario]").live("blur", function() {
        if ($(this).val() == "") {
            $(this).val("Escreva um comentário...")
        }
    });
    var a = false;
    $("section.timeline, section#ava_container .box_admin").on("keypress", "input[name=strComentario]", function(f) {
        if (!(a)) {
            _this = $(this);
            if (_this.val() != "") {
                if ((f.which && f.which == 13) || (f.keyCode && f.keyCode == 13)) {
                    a = true;
                    _id_msg = _this.attr("ident");
                    $.jStorage.deleteKey("timeline" + idUsuarioCript);
                    $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                    $.ajax({
                        url: "/AVA/Mural/Home/GravarComentario/" + _id_msg,
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: "strComentario=" + encodeURIComponent(_this.val()),
                        success: function(j) {
                            var g = $(j).attr("id").substring(7);
                            var l = $(_this).closest("article").hasClass("pgedu");
                            if (l) {
                                $("#boxComentarios_" + _id_msg).show();
                                $("#boxComentarios_" + _id_msg).prepend(j).slideDown(1000);
                                var m = new Array();
                                var k = $("#idsPriUpd_" + _id_msg).val();
                                if ($.trim(k) != "") {
                                    m = atob($("#idsPriUpd_" + _id_msg).val()).split(",")
                                }
                                var h = 0;
                                var e = $("#totCom_" + _id_msg).val();
                                if ($.trim(e) != "") {
                                    h = parseInt(atob(e))
                                }
                                h++;
                                $("#totCom_" + _id_msg).val(btoa(h));
                                m.push(g);
                                $("#idsPriUpd_" + _id_msg).val(btoa(m.join(",")));
                                $(".carregarComentarios[ide=" + _id_msg + "] .totalCarregado").text(m.length + " de " + h)
                            } else {
                                $("#boxComentarios_" + _id_msg).append(j).slideDown(1000)
                            }
                            _this.val("");
                            a = false;
                            $("#boxComentarios_" + _id_msg + " .ctn_msg").expander({
                                slicePoint: 500,
                                window: 2,
                                expandText: " leia mais",
                                expandPrefix: "...",
                                userCollapseText: "menos",
                                preserveWords: true,
                                expandEffect: "fadeIn",
                                collapseEffect: "fadeOut"
                            });
                            $("#boxComentarios_" + _id_msg + " .iframeVideoVimeo").on("load", function() {
                                var o = $f(this);
                                var n = false;
                                o.api("pause");
                                o.addEvent("ready", function() {
                                    o.addEvent("play", function() {
                                        if (!n) {
                                            n = true;
                                            o.api("pause")
                                        }
                                    })
                                })
                            });
                            for (i = 0; i < objetoIdMensagemRapida.idMsgRapida.length; i++) {
                                if (objetoIdMensagemRapida.idMsgRapida[i] == _id_msg) {
                                    objetoIdMensagemRapida.idMsgRapida.splice(i, 1);
                                    if (!objetoIdMensagemRapida.idMsgRapida.length > 0) {
                                        bolFezAlteracaoConfiguracoes = false
                                    }
                                    break
                                }
                            }
                        },
                        error: function(e) {
                            _clique = false;
                            console.debug("Ocorreu um erro no banco de dados.");
                            a = false
                        }
                    })
                }
            }
        }
    });
    $("body").on(d, ".excluir_mensagem", function(h) {
        h.preventDefault();
        var f = $(this).attr("ident");
        var g = this;
        $.fancybox({
            type: "ajax",
            href: "/ava/mural/Home/excluirMensagem/" + f,
            closeBtn: false,
            padding: 0,
            helpers: {
                overlay: {
                    closeClick: false,
                    locked: false
                }
            },
            afterShow: function() {
                $("#btnExcluidMensagem").click(function(j) {
                    var k = $(this).data("idmensagem");
                    excluirMensagem(k, true, g)
                });
                $("#btnCancelarExclusaoMensagem").click(function(j) {
                    $.fancybox.close()
                })
            }
        })
    });
    $("body").on(d, ".timeline .fecha_X", function(g) {
        var h = $(this).data("idcomentario");
        var f = $(this);
        $.fancybox({
            type: "ajax",
            href: "/ava/mural/Home/excluirComentarioView/" + h,
            afterShow: function() {
                $("#btnExcluirComentario").click(function(j) {
                    var k = $(this).data("idcomentario");
                    excluirComentario(k, true, f)
                });
                $("#btnCancelarExclusaoComentario").click(function(j) {
                    $.fancybox.close()
                })
            },
            closeBtn: false,
            helpers: {
                overlay: {
                    closeClick: false,
                    locked: false
                }
            },
            padding: 0
        })
    });
    $("body").on(d, ".denunciar_mensagem", function(f) {
        f.preventDefault();
        _id_c_d = $(this).closest("article").attr("ide");
        _txt_c_d = $(this).closest("article").find(".ctn_msg").text();
        $.fancybox({
            type: "ajax",
            href: "/rede/conteudo_denuncia.asp",
            afterShow: callBackDenunciaMensagem,
            type: "ajax",
            helpers: {
                overlay: {
                    locked: false
                }
            }
        })
    });
    $("body").on("click", ".seletor_compartilhado", function(g) {
        var f = $(this).attr("ide");
        $.fancybox({
            maxWidth: 780,
            maxHeight: 730,
            fitToView: false,
            width: 780,
            height: 530,
            padding: 0,
            autoSize: false,
            closeClick: false,
            openEffect: "none",
            hideOnContentClick: false,
            closeEffect: "none",
            type: "ajax",
            href: "/AVA/Pagina/Home/destinoPostEducacional/" + f,
            afterShow: function() {
                if (Modernizr.touch) {
                    $(".engloba_compartilhar").mCustomScrollbar()
                }
                $("#compartilhado_com .btn_cinza").on("click", function() {
                    $.fancybox.close()
                })
            }
        })
    })
});

function callBackDenunciaMensagem() {
    $("form[name=frmDenuncia]").find("h2").css({
        position: "absolute",
        top: "-10px"
    });
    $("#enviar_email").click(function() {
        if ($("#txtMotivo").val() != "") {
            if (_id_c_d == undefined || _id_c_d == null || _id_c_d == "null") {
                _id_c_d = 0
            }
            var a = $("#txtMotivo").val();
            $.ajax({
                data: {
                    idMensagem: _id_c_d,
                    strNome: $("#strNomeLogado").val(),
                    strLogin: $("#strLoginLogado").val(),
                    strEmail: $("#strEmailLogado").val(),
                    strURL: $("#strURLCorrente").val(),
                    strMotivo: a
                },
                type: "POST",
                url: "/AVA/Barras/Denuncia/DenunciaMensagemGravar",
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                success: function(b) {
                    alert("Sua denúncia foi encaminhada para análise dos administradores do ambiente.");
                    parent.$.fancybox.close();
                    _id_c_d = 0;
                    _txt_c_d = ""
                },
                error: function() {}
            })
        } else {
            alert("Favor preencher o motivo!");
            return false
        }
    })
}

function excluirComentario(g, c, f) {
    _id_c = g;
    var b = g;
    _this = $(f);
    var a = $(f).closest("article").attr("ide");
    var d = $(f).closest("article").hasClass("paginas");
    if (c) {
        $.jStorage.deleteKey("timeline" + idUsuarioCript);
        $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
        $.ajax({
            url: "/AVA/Mural/Home/ExcluirComentario/" + _id_c,
            type: "GET",
            success: function(n) {
                if (d) {
                    var k = new Array();
                    var o = 0;
                    var h = $.trim($("#idsPriUpd_" + a).val());
                    if (h != "") {
                        k = atob(h).split(",");
                        var l = new Array();
                        for (var j = 0; j < k.length; j++) {
                            if (k[j] != b) {
                                l.push(k[j])
                            }
                        }
                        o = l.length;
                        $("#idsPriUpd_" + a).val(btoa(l))
                    }
                    var m = 0;
                    var e = $.trim($("#totCom_" + a).val());
                    if (e != "") {
                        m = atob(e);
                        m--;
                        $("#totCom_" + a).val(btoa(m))
                    }
                    $(".exibir_anteriores[ide=" + a + "] .totalCarregado").text(o + " de " + m);
                    if (m == 0) {
                        $("#boxComentarios_" + a).hide();
                        $(".exibir_anteriores[ide=" + a + "]").slideUp().remove()
                    }
                }
                $("#coment_" + _id_c).slideUp("slow", function() {
                    $(this).remove()
                });
                $.fancybox.close()
            },
            error: function(e) {
                _clique = false;
                console.debug("Ocorreu um erro no banco de dados.");
                _enterT = false
            }
        })
    } else {
        _this.closest(".exc_c").hide()
    }
}

function excluirMensagem(c, a, b) {
    _id_msg = c;
    _this = $(b);
    if (a) {
        $.jStorage.deleteKey("timeline" + idUsuarioCript);
        $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
        $.ajax({
            url: "/AVA/Mural/Home/ExcluirMensagemRapida/" + _id_msg,
            type: "GET",
            success: function(d) {
                _this.closest("article").remove();
                $("#info_mensagens_adm_" + _id_msg).fadeOut();
                $.fancybox.close();
                toastr.success('Exclus&atilde;o realizada com sucesso.', 'Sucesso', {timeOut: 3000, positionClass: "toast-top-center", closeButton: true});
            },
            error: function(d) {
                _clique = false;
                console.debug("Ocorreu um Erro no banco de dados.");
                _enterT = false
            }
        })
    } else {
        _this.closest(".black_tip_center").hide()
    }
}

function gostaram_das_mensagens() {
    $(".quem_gostou_msg").each(function() {
        var b = $(this);
        var a = {
            autoSize: false,
            width: 700,
            height: 470,
            autoResize: false,
            fitToView: false,
            type: "ajax",
            afterShow: function() {
                var c = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + b.closest("article").attr("ide");
                retornaJson(c)
            },
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };
        lightBoxAVA(b, a)
    })
}

function gostaram_dos_comentarios() {
    $(".quem_gostou_cmt").each(function() {
        var b = $(this);
        var a = {
            autoSize: false,
            width: 700,
            height: 470,
            autoResize: false,
            fitToView: false,
            type: "ajax",
            afterShow: function() {
                var c = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idMensagemRapida=&idComentario=" + b.attr("ide");
                retornaJson(c)
            },
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };
        lightBoxAVA(b, a)
    })
}

function aceitarConviteGrupo(b, c, a) {
    $("#btnAceitarRecusar_" + b + "_" + a).html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/AceitarRecusarConvite",
        data: {
            idGrupo: b,
            idConvite: c,
            bolAceitar: true
        },
        success: function(d) {
            $.jStorage.deleteKey("timeline" + idUsuarioCript);
            $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
            window.location = "/AVA/Grupo/Home/PerfilGrupo/" + d
        },
        error: function(d) {
            console.debug("Erro ao aceitar convite.")
        }
    })
}

function recusarConviteGrupo(b, c, a) {
    $("#btnAceitarRecusar_" + b + "_" + a).html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/AceitarRecusarConvite",
        data: {
            idGrupo: b,
            idConvite: c,
            bolAceitar: false
        },
        success: function(d) {
            $.jStorage.deleteKey("timeline" + idUsuarioCript);
            $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
            $("#btnAceitarRecusar_" + b + "_" + a).html("<p>Você recusou este convite.</p>")
        },
        error: function(d) {
            console.debug("Erro ao recusar convite.")
        }
    })
}

function buscaCusticoesMensagem(a) {
    buscaCusticoesMensagemAll(a, "/AVA/Mural/Home/ListaCurtidasMensagem")
}

function buscaCusticoesMensagemNovaHome(a) {
    buscaCusticoesMensagemAll(a, "/AVA/Mural/Home/ListaCurtidasMensagemNovaHome")
}

function buscaCusticoesMensagemAll(a, b) {
    $("#boxCurticoesMensagem_" + a).html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
    $.ajax({
        url: b,
        data: {
            id: a
        },
        success: function(c) {
            $("#boxCurticoesMensagem_" + a).html(c)
        },
        error: function() {
            alert("Erro ao listar curticoes da mensagem.")
        }
    })
}

function buscaCusticoesComentarioNovaHome(a) {
    buscaCusticoesComentarioAll(a, "/AVA/Mural/Home/ListaCurtidasComentarioNovaHome")
}

function buscaCusticoesComentario(a) {
    buscaCusticoesComentarioAll(a, "/AVA/Mural/Home/ListaCurtidasComentario")
}

function buscaCusticoesComentarioAll(b, a) {
    $("#boxCurticoesComentario_" + b).html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
    $.ajax({
        url: a,
        data: {
            id: b
        },
        success: function(c) {
            $("#boxCurticoesComentario_" + b).html(c)
        },
        error: function() {
            alert("Erro ao listar curticoes do comentario.")
        }
    })
}

function validaURLVideo(e) {
    e = e.replace(/\s/g, "");
    if (e.length > 0) {
        if (e.indexOf("http://") > -1) {
            e = e.replace("http://", "")
        } else {
            if (e.indexOf("https://") > -1) {
                e = e.replace("https://", "")
            }
        }
        if (e.indexOf("&feature=youtu.be") > -1) {
            var d = e.indexOf("&feature=youtu.be");
            if (e.indexOf("&list=") > -1) {
                var f = e.indexOf("&list=");
                e = e.substring(0, d) + e.substring(f, e.length)
            } else {
                if (e.indexOf("#t=") > -1) {
                    var b = e.indexOf("#t=");
                    e = e.substring(0, d) + e.substring(b, e.length)
                } else {
                    if (e.indexOf("&t=") > -1) {
                        var b = e.indexOf("&t=");
                        e = e.substring(0, d) + e.substring(b, e.length)
                    } else {
                        if (e.indexOf("&amp;t=") > -1) {
                            var b = e.indexOf("&amp;t=");
                            e = e.substring(0, d) + e.substring(b, e.length)
                        } else {
                            if (e.indexOf("?t=") > -1) {
                                var b = e.indexOf("?t=");
                                e = e.substring(0, d) + e.substring(b, e.length)
                            } else {
                                if (e.indexOf("&feature=youtu.be") > -1) {
                                    e = e.substring(0, d)
                                }
                            }
                        }
                    }
                }
            }
        }
        e.match(/^(player.|www.)?(vimeo\.com|youtu(be\.com|\.be))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
        var a = {
            provider: null,
            url: RegExp.$2,
            id: RegExp.$5
        };
        var c;
        $.support.cors = true;
        c = retornaVideoURL(a);
        if (c) {
            c.always(function() {
                if (!bolVideoProibido) {
                    a.provider = strTipoVideo
                }
                if (a.provider) {
                    return true
                } else {
                    $(".verificavideo").fadeOut("fast", function() {
                        $("#erro_enviar_video").text(retornaTextoErroVideo(bolVideoProibido));
                        bolVideoProibido = false;
                        strTipoVideo = "";
                        $("#erro_enviar_video").fadeIn("slow")
                    });
                    return false
                }
            })
        } else {
            $(".verificavideo").fadeOut("fast", function() {
                $("#erro_enviar_video").text(retornaTextoErroVideo(bolVideoProibido));
                bolVideoProibido = false;
                strTipoVideo = "";
                $("#erro_enviar_video").fadeIn("slow")
            });
            return false
        }
    } else {
        return false
    }
}

function montaPreviewVideoMensagem(e) {
    e = decodeURI(e).replace(/\s/g, "");
    var f = "";
    if (e.length > 0) {
        $("#erro_enviar_video").fadeOut("fast", function() {
            $(".verificavideo").fadeIn("slow")
        });
        if (e.indexOf("#t=") > 1 || e.indexOf("&t=") > 1 || e.indexOf("&amp;t=") > 1 || e.indexOf("?t=") > 1) {
            f = getVideoTime(e)
        }
        if (e.indexOf("http://") > -1) {
            e = e.replace("http://", "")
        } else {
            if (e.indexOf("https://") > -1) {
                e = e.replace("https://", "")
            }
        }
        if (e.indexOf("&feature=youtu.be") > -1) {
            var d = e.indexOf("&feature=youtu.be");
            if (e.indexOf("&list=") > -1) {
                var g = e.indexOf("&list=");
                e = e.substring(0, d) + e.substring(g, e.length)
            } else {
                if (e.indexOf("#t=") > -1) {
                    var b = e.indexOf("#t=");
                    e = e.substring(0, d) + e.substring(b, e.length)
                } else {
                    if (e.indexOf("&t=") > -1) {
                        var b = e.indexOf("&t=");
                        e = e.substring(0, d) + e.substring(b, e.length)
                    } else {
                        if (e.indexOf("&amp;t=") > -1) {
                            var b = e.indexOf("&amp;t=");
                            e = e.substring(0, d) + e.substring(b, e.length)
                        } else {
                            if (e.indexOf("?t=") > -1) {
                                var b = e.indexOf("?t=");
                                e = e.substring(0, d) + e.substring(b, e.length)
                            } else {
                                if (e.indexOf("&feature=youtu.be") > -1) {
                                    e = e.substring(0, d)
                                }
                            }
                        }
                    }
                }
            }
        }
        e.match(/^(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be)|youtube)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
        var a = {
            provider: null,
            url: RegExp.$2,
            id: RegExp.$5
        };
        var c;
        $.support.cors = true;
        c = retornaVideoURL(a);
        if (c && a.id != "") {
            c.always(function() {
                if (!bolVideoProibido) {
                    a.provider = strTipoVideo
                }
                if (a.provider) {
                    var h = "";
                    var k = "";
                    $(".enviar_video, .verificavideo, #erro_enviar_video").hide();
                    if (a.provider == "youtube") {
                        h = "www.youtube.com/embed/" + a.id + "?rel=0&wmode=transparent";
                        if (f.length > 0) {
                            h += "&start=" + f
                        }
                    } else {
                        k = ' class="iframeVideoVimeo" ';
                        h = "player.vimeo.com/video/" + a.id + "?badge=0&byline=0&portrait=0&title=0&player_id=playerPreview&api=1";
                        if (f.length > 0) {
                            h += "#t=" + f
                        }
                    }
                    var j = "";
                    if (document.location.href.indexOf("/ava/mural") > 0 || document.location.href.indexOf("/ava/mural/Home/NovaHome") > 0 || document.location.href.indexOf("/ava/mural/Home/NovaHome2") > 0) {
                        j = "removerPreviewVideoDigaLa();"
                    } else {
                        j = "removerPreviewVideoMensagem();"
                    }
                    $("#container_preview_video").html('<div class="prev_midia"><iframe ' + k + ' src="//' + h + '" allowTransparency="true" frameborder="0" allowfullscreen></iframe><a href="javascript: void(0);" onClick="' + j + '" class=" btn_acao opcao_excluir"><span class="FontAwesome"></span>Remover</a></div>').fadeIn("slow", function() {
                        $(".enviar_video, .verificavideo, #erro_enviar_video").hide();
                        $("#seletorMuralDigaLa").show();
                        $(".sep_digala").fadeIn("fast");
                        $("#urlVideoOriginal").val(e);
                        $("#compartilhar").show();
                        $("#compartilhar").removeClass("disable").prop("disabled", false);
                        $("#btnCancelarFerramentaMural").show();
                        $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false);
                        if (location.href.toLowerCase().indexOf("perfil/home/index") > 0) {
                            $("#compartilhar").unbind("click", validaMensagemRapida).one("click", validaMensagemRapida)
                        }
                        $(".iframeVideoVimeo").on("load", function() {
                            var m = $f(this);
                            var l = false;
                            m.api("pause");
                            m.addEvent("ready", function() {
                                m.addEvent("play", function() {
                                    if (!l) {
                                        l = true;
                                        m.api("pause")
                                    }
                                })
                            })
                        })
                    })
                } else {
                    $(".verificavideo").fadeOut("fast", function() {
                        $("#erro_enviar_video").text(retornaTextoErroVideo(bolVideoProibido));
                        bolVideoProibido = false;
                        strTipoVideo = "";
                        $("#erro_enviar_video").fadeIn("slow")
                    })
                }
            })
        } else {
            $(".verificavideo").fadeOut("fast", function() {
                $("#erro_enviar_video").text(retornaTextoErroVideo(bolVideoProibido));
                bolVideoProibido = false;
                strTipoVideo = "";
                $("#erro_enviar_video").fadeIn("slow")
            })
        }
    }
    return false
}

function removerPreviewVideoMensagem(a) {
    if (a === undefined || a == null || a == "") {
        a = false
    }
    $("#container_preview_video").fadeOut("slow", function() {
        $(this).find("iframe").attr("src", "");
        setTimeout(function() {
            $(this).find("iframe").remove();
            $(this).html("")
        }, 200);
        $("#txtLinkVideoMensagem").val("");
        if (!a) {
            $(".enviar_video").show()
        }
        var b = "Olá! Compartilhe aqui a sua ideia ou link...";
        var c = $("#txtInput").val();
        if (!$("#compartilhar").hasClass("disable") && $("#txtInput").val() !== "") {
            $(".dialogo .dialogo_multimidia").show();
            $(".enviar_video").hide()
        }
    });
    bloqueiaOutrosDigaLa()
}

function removerListUrlYoutube(d) {
    var c = "list?=?([^#&?]*)";
    var b = d.match(c);
    var e = "";
    if (b != null) {
        var a = "&" + b[0];
        var f = b[0];
        if (d.indexOf(a) > 0) {
            e = d.replace(a, "")
        } else {
            e = d.replace(f, "")
        }
    } else {
        e = d
    }
    if (e.indexOf("http") >= 0) {
        return e
    } else {
        return "http://" + e
    }
}

function excluirComentarioGrupo(a) {
    _id_coment = a;
    $.ajax({
        url: "/AVA/Grupo/Home/ExcluirComentario/" + _id_coment,
        type: "GET",
        success: function(b) {
            $("#coment_" + _id_coment).slideUp("slow", function() {
                $(this).remove()
            });
            $.fancybox.close()
        },
        error: function(b) {
            console.debug("Ocorreu um erro no banco de dados ao excluir comentário.")
        }
    })
}

function exclusaoComentarioGrupo() {
    $(".excluir_comentario_grupo").each(function() {
        $(this).fancybox({
            fitToView: true,
            padding: 0,
            autoSize: true,
            closeClick: false,
            openEffect: "none",
            autoResize: true,
            closeEffect: "none",
            closeBtn: false,
            helpers: {
                overlay: {
                    closeClick: false,
                    locked: false
                }
            },
            afterShow: function() {
                $("#btnCancelarExclusaoMensagem").click(function() {
                    $.fancybox.close()
                });
                $("#btnExclusaoMensagem").click(function() {
                    excluirComentarioGrupo($(this).attr("idMensagem"))
                })
            }
        })
    })
}

function ViewRealizacaoProva(a) {
    window.open("/AVA/avaliacoes/Realizacao/index/" + a, "RealizacaoProva", "width=800, height=600, scrollbars=1, resizable=1")
}

function CustomConfirmConfiguracoes(b, a, c) {
    $.fancybox({
        type: "ajax",
        href: "/AVA/Perfil/Home/AbandonarConfiguracoes/",
        afterShow: function() {
            $("body").on("click", "#btnSairPaginaConfiguracoes", function() {
                bolFezAlteracaoConfiguracoes = false;
                switch (destinoConfiguracoes) {
                    case "timeline":
                        LimparCampoComentario(a);
                        $.fancybox.close();
                        PrepararTimeLineFocus(c);
                        break;
                    case "digalaCompartilhar":
                        LimparCampoComentario(a);
                        $.fancybox.close();
                        var d = {
                            usuario: new Array()
                        };
                        var e = {
                            grupo: new Array()
                        };
                        validaMensagemRapida(d, e);
                        break;
                    case "comboFiltroAssuntoTimeline":
                        LimparCampoComentario(a);
                        $.fancybox.close();
                        PrepararFiltroAssuntoTimeline(destinoIdAssunto);
                        break;
                    default:
                        break
                }
                destinoConfiguracoes = null;
                destinoIdAssunto = null
            });
            $("body").on("click", "#btnPermanecerPaginaConfiguracoes", function() {
                $.fancybox.close()
            })
        },
        closeBtn: false,
        modal: true,
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        padding: 0
    })
}

function LimparCampoComentario(b) {
    var c = b.idMsgRapida.length;
    for (var a = c - 1; a >= 0; a--) {
        var d = $(this).closest("article").hasClass("pgedu") ? "507px" : "441px";
        $("#campoComentar_" + b.idMsgRapida[a] + " input").animate({
            width: d
        }, 200).val("");
        $("#campoComentar_" + b.idMsgRapida[a]).removeClass("foco");
        $("#campoComentar_" + b.idMsgRapida[a]).blur();
        b.idMsgRapida.splice(a, 1)
    }
}

function PrepararTimeLineFocus(a) {
    $("html, body").animate({
        scrollTop: $("#campoComentar_" + a).offset().top - 400
    }, 1000);
    var b = $("#campoComentar_" + a).closest("article").hasClass("pgedu") ? "507px" : "441px";
    $("#campoComentar_" + a + " input").animate({
        width: b
    }, 200);
    $("#campoComentar_" + a).addClass("foco")
}

function PrepararFiltroAssuntoTimeline(b) {
    $("#cbTipoDePostMural input[type=checkbox]").removeAttr("checked");
    $("#ckfiltroTipo" + b).attr("checked", "checked");
    var a = null;
    $("#cbTipoDePostMural").find("#ckfiltroTipo" + b).parent().each(function() {
        a = $.trim($(this).find("label").text()) + '<span class="caret">'
    });
    $("#txtTipoDePostMural").html(a);
    $("#hTipoDePostMural").val(b);
    $("#ava_fluxoarticles").html("");
    $("#loader_timeline").fadeIn("fast", function() {
        carregaTimeLine(1)
    });
    $("#cbTipoDePostMural").closest("div.btn-group").removeClass("open")
}

function retornaJsonNovo(a, b) {
    $.getJSON(a, null, function(d) {
        var c = null;
        c = d.Result;
        GlobalPaginacaoContador = Object.keys(c).length;
        xmlGlobal = c;
        xmlGlobalPaginado = xmlGlobalPaginado + c;
        $("#myContentTemplate").tmpl(d).appendTo("#ava_contentlista");
        $("#ava_contentlista #ava_loader").css("display", "none");
        if (b !== undefined && b == "scrollMode") {
            idLoadedGlobal = false
        }
        $.fancybox.hideLoading()
    })
}

function exibirOpcoesPostagem(a) {
    $(a).find("ul").toggle('show');
}

function excluirPostagem(a) {
    var b = $(a).attr("ident");
    var c = this;
    $.fancybox({
        type: "ajax",
        href: "/ava/mural/Home/excluirMensagem/" + b,
        closeBtn: false,
        padding: 0,
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        afterShow: function() {
            $(".fancybox-wrap .fancybox-inner").addClass("excluirPostMural");
            $("#btnExcluidMensagem").click(function(d) {
                var f = $(this).data("idmensagem");
                excluirMensagem(f, true, a)
            });
            $("#btnCancelarExclusaoMensagem").click(function(d) {
                $.fancybox.close()
            })
        }
    })
}

// buscar os dados da postagem
// RetornaFeedUser editarPostagem
//function editarPostagem(){
//    var idMensagemRapida = $(a).attr("ident");
//    var = content = $(a);
    
//}

// buscar os dados da postagem
// RetornaFeedUser editarPostagem
/*function editarPostagem(){
    console.log("entrou no editarPostagem "+ a);
    var idMensagemRapida = $(a).attr("ident");
    $.ajax({
        //url: "/AVA/mural/Home/RetornaFeedUserNovaHome",
        url: "/AVA/mural/Home/RetornaFeedUser",
        data: {
            id: idMensagemRapida
        },
        success: function(c) {
            alert(c);
        },
        error: function() {
            alert("Erro ao editar a Mensagem Rapida")
        }
    })
}*/

function denunciarPostagem(a) {
    _id_c_d = $(a).closest("article").attr("ide");
    _txt_c_d = $(a).closest("article").find(".post_texto").text();
    $.fancybox({
        type: "ajax",
        href: "/rede/conteudo_denuncia.asp",
        afterShow: function() {
            $(".fancybox-wrap .fancybox-inner").addClass("denunciaMural");
            callBackDenunciaMensagem()
        },
        type: "ajax",
        helpers: {
            overlay: {
                locked: false
            }
        }
    })
}

function curtirPostagem(a) {
    var b = $(a).attr("idMensagemRapida");
    if ($(a).hasClass("ativo")) {
        $.ajax({
            url: "/AVA/mural/Home/DescurtirMensagem",
            data: {
                id: b
            },
            success: function(c) {
                $.jStorage.deleteKey("timeline" + idUsuarioCript);
                $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                buscaCusticoesMensagemNovaHome(b)
            },
            error: function() {
                alert("Erro ao descurtir mensagem.")
            }
        })
    } else {
        $.ajax({
            url: "/AVA/Mural/Home/CurtirMensagem",
            data: {
                id: b
            },
            success: function(c) {
                $.jStorage.deleteKey("timeline" + idUsuarioCript);
                $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                buscaCusticoesMensagemNovaHome(b)
            },
            error: function() {
                alert("Erro ao curtir mensagem.")
            }
        })
    }
    $(a).toggleClass("ativo")
}

function exibeComentarios(a) {
    var c = $(a);
    var b = c.attr("idMensagemRapida");
    $("#boxComentarios_" + b).show();
    $("#campoComentar_" + b).show();
    $("#campoComentar_" + b + " input").focus();
    c.next("div").find("a").show();
    $("html,body").animate({
        scrollTop: $("#campoComentar_" + b + " input").offset().top - 400
    }, 200)
}

function verTodosOsComentarios(b) {
    if (!$(b).hasClass("carregando")) {
        $(b).addClass("carregando");
        var a = $(b);
        var e = $(b).attr("ide");
        var d = $(b).closest(".comentariosMural");
        var c = {
            id: e
        };
        var f = "/ava/Mural/Home/TodosComentariosNovaHome/";
        a.before('<div style="text-align: center;" class="divLoading_' + e + '"><img src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif" border="0" style="float:none;" /></div>');
        $.post(f, c, function(h) {
            $(this).removeClass("carregando");
            d.html(h).slideDown("fast");
            if ($("#bolPodeComentar").val() == "True" && $(b).closest("article").hasClass("entidade")) {
                d.append('<div ide="' + e + '" idmensagemrapida="' + e + '" class="escreverMais_" style=""><a class="color5" href="javascript:void(0);">Escreva um comentário...</a></div>')
            }
            $(".divLoading_" + e).remove();
            a.before(h);
            var g = "";
            if ($.trim($("#idsPriUpd_" + e).val()) != "") {
                g += (atob($("#idsPriUpd_" + e).val()).split(","))
            }
            if ($.trim($("#idsUltUpd_" + e).val()) != "") {
                if (g != "") {
                    g += ","
                }
                g += (atob($("#idsUltUpd_" + e).val()).split(","))
            }
            $("#idsPriUpd_" + e).val(btoa(g));
            $(".exibir_anteriores[ide=" + e + "]").slideUp().remove();
            $("#idsUltUpd_" + e).remove();
            $("#bolVerMais50_" + e).remove();
            $("#totComUpd_" + e).remove();
            $(".post_texto", d).expander({
                slicePoint: 500,
                window: 2,
                expandText: " leia mais",
                expandPrefix: "...",
                userCollapseText: "menos",
                preserveWords: true,
                expandEffect: "fadeIn",
                collapseEffect: "fadeOut"
            });
            $(".iframeVideoVimeo", d).on("load", function() {
                var k = $f(this);
                var j = false;
                k.api("pause");
                k.addEvent("ready", function() {
                    k.addEvent("play", function() {
                        if (!j) {
                            j = true;
                            k.api("pause")
                        }
                    })
                })
            });
            $(".compartilhado", d).booleTip(booleTipOptions)
        })
    }
}

function comentarioInputBlur(a) {
    if ($(a).val() === "Escreva um comentário...") {
        $(a).val("")
    }
}
var inputSubmeteComentario = true;

function submeteComentario(a, b) {
    _this = $(a);
    if (b.which != 13 || b.keyCode != 13) {
        return
    }
    if (_this.val().trim() == "") {
        return
    }
    if (!inputSubmeteComentario) {
        return
    }
    inputSubmeteComentario = false;
    _id_msg = _this.attr("ident");
    $.jStorage.deleteKey("timeline" + idUsuarioCript);
    $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
    $.ajax({
        url: "/AVA/Mural/Home/GravarComentarioNovaHome/" + _id_msg,
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: "strComentario=" + encodeURIComponent(_this.val()),
        success: function(f) {
            var d = $(f).attr("id").substring(7);
            var h = $(_this).closest("article").hasClass("entidade");
            if (h) {
                $("#comentarios_" + _id_msg).prepend($(f)).slideDown(1000);
                var j = new Array();
                var g = $("#idsPriUpd_" + _id_msg).val();
                if ($.trim(g) != "") {
                    j = atob($("#idsPriUpd_" + _id_msg).val()).split(",")
                }
                var e = 0;
                var c = $("#totCom_" + _id_msg).val();
                if ($.trim(c) != "") {
                    e = parseInt(atob(c))
                }
                e++;
                $("#totCom_" + _id_msg).val(btoa(e));
                j.push(d);
                $("#idsPriUpd_" + _id_msg).val(btoa(j.join(",")));
                $(".exibir_anteriores[ide=" + _id_msg + "] .totalCarregado").text(j.length + " de " + e)
            } else {
                $(f).insertBefore($("#campoComentar_" + _id_msg)).slideDown(1000)
            }
            _this.val("");
            $("#boxComentarios_" + _id_msg + " .post_texto").expander({
                slicePoint: 500,
                window: 2,
                expandText: " leia mais",
                expandPrefix: "...",
                userCollapseText: "menos",
                preserveWords: true,
                expandEffect: "fadeIn",
                collapseEffect: "fadeOut"
            });
            $("#boxComentarios_" + _id_msg + " .iframeVideoVimeo").on("load", function() {
                var l = $f(this);
                var k = false;
                l.api("pause");
                l.addEvent("ready", function() {
                    l.addEvent("play", function() {
                        if (!k) {
                            k = true;
                            l.api("pause")
                        }
                    })
                })
            });
            for (i = 0; i < objetoIdMensagemRapida.idMsgRapida.length; i++) {
                if (objetoIdMensagemRapida.idMsgRapida[i] == _id_msg) {
                    objetoIdMensagemRapida.idMsgRapida.splice(i, 1);
                    if (!objetoIdMensagemRapida.idMsgRapida.length > 0) {
                        bolFezAlteracaoConfiguracoes = false
                    }
                    break
                }
            }
            inputSubmeteComentario = true
        },
        error: function(c) {
            console.debug("Ocorreu um erro no banco de dados.");
            inputSubmeteComentario = true
        }
    })
}

function curtirMensagem(a) {
    var b = $(a).attr("idComentario");
    if ($(a).hasClass("ativo")) {
        $.ajax({
            url: "/AVA/Mural/Home/DescurtirComentario",
            data: {
                id: b
            },
            success: function(c) {
                $.jStorage.deleteKey("timeline" + idUsuarioCript);
                $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                buscaCusticoesComentarioNovaHome(b)
            },
            error: function() {
                alert("Erro ao descurtir comentário.")
            }
        })
    } else {
        $.ajax({
            url: "/AVA/Mural/Home/CurtirComentario",
            data: {
                id: b
            },
            success: function(c) {
                $.jStorage.deleteKey("timeline" + idUsuarioCript);
                $.jStorage.deleteKey("timelineFiltro" + idUsuarioCript);
                buscaCusticoesComentarioNovaHome(b)
            },
            error: function() {
                alert("Erro ao descurtir comentário.")
            }
        })
    }
    $(a).toggleClass("ativo")
}

function excluirMensagemComentario(a) {
    var b = $(a);
    var c = b.attr("idComentario");
    $.fancybox({
        type: "ajax",
        href: "/ava/mural/Home/excluirComentarioViewNovaHome/" + c,
        afterShow: function() {
            $("#btnExcluirComentario").click(function(d) {
                var f = $(this).data("idcomentario");
                excluirComentario(f, true, b)
            });
            $("#btnCancelarExclusaoComentario").click(function(d) {
                $.fancybox.close()
            })
        },
        closeBtn: false,
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        padding: 0
    })
}

function vejaMais(a, b) {
    var e = $(a);
    var d = e.parent();
    if (e.hasClass("disable")) {
        return
    }
    e.addClass("disable");
    e.html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
    var c = $("#hTipoDePostMural").val();
    if (c > 0) {
        c = "&tipoFiltro=" + c
    } else {
        c = ""
    }
    $.post("/AVA/Mural/Home/TimeLinePrivadoNovaHome?id=" + b + "&intInicio=" + intInicioMsgPublica + c, function(h) {
        var f = null;
        d.remove();
        if (h.indexOf("semMsgsRapidas") > -1) {
            $("#ava_footervejamais").remove()
        } else {
            if (h.indexOf("poucasMsgsRapidas") > 0) {
                var j = h.indexOf("poucasMsgsRapidas");
                var g = h.substring(0, j);
                f = $(g);
                $("#ava_fluxoarticles").append(f);
                $("#ava_footervejamais").remove()
            } else {
                f = $(h);
                $("#ava_fluxoarticles").append(f);
                intInicioMsgPublica += 1
            }
        }
        $(".thumbs_mural").each(function() {
            var k = $(this);
            var m = 0;
            var l = 0;
            $(this).find("a").each(function(n) {
                if ($(this).css("display") != "none") {
                    m++;
                    $(this).find("img").one("load", function() {
                        l++;
                        var o = $(this).height();
                        if (l == m) {
                            k.find("img:visible").each(function(q) {
                                var p = $(this);
                                var r = p.height();
                                if (r > o) {
                                    o = r
                                }
                                if (q == (m - 1)) {
                                    k.closest("div").css("height", o);
                                    k.find("img").css({
                                        height: o,
                                        width: 217
                                    })
                                }
                            })
                        }
                    }).each(function() {
                        if (this.complete) {
                            $(this).load()
                        }
                    })
                }
            })
        });
        if (f != null) {
            $(".banner_mural img", f).one("load", function() {
                var k = $(a).width();
                if (k > 300) {
                    $(a).parent().parent().width("100%")
                }
            });
            $(".compartilhado", f).booleTip(booleTipOptions)
        }
        $(".imagens_mural").GaleriaAva()
    });
    $(a).blur()
}

function filtraTimeline(a) {
    var d = $(a);
    var c = d.attr("filtroTipo");
    if (c) {
        if (bolFezAlteracaoConfiguracoes) {
            destinoIdAssunto = c;
            destinoConfiguracoes = "comboFiltroAssuntoTimeline";
            CustomConfirmConfiguracoes("comboFiltroAssuntoTimeline", objetoIdMensagemRapida, c)
        } else {
            $("#cbTipoDePostMural input[type=checkbox]").removeAttr("checked");
            $("input[type=checkbox]", a).attr("checked", "checked");
            var b = $.trim(d.text()) + '<span class="caret">';
            $("#txtTipoDePostMural").html(b);
            $("#hTipoDePostMural").val(c);
            $("#ava_fluxoarticles").html("");
            $("#loader_timeline").fadeIn("fast", function() {
                carregaTimeLine(1)
            });
            d.closest("div.btn-group").removeClass("open")
        }
    }
}

function verMaisDoc(a) {
    var b = $(a);
    if (!b.parent().prev().hasClass("mostra")) {
        b.parent().prev().slideToggle("slow", function() {
            $(this).addClass("mostra")
        });
        b.text("Ver menos")
    } else {
        b.parent().prev().slideToggle("slow", function() {
            $(this).removeClass("mostra")
        });
        b.text("Ver mais")
    }
}

function mostraMaisImagens(d) {
    var b = $(d).parent();
    var a = $(b).siblings("div.post_imagem");
    var c = $(a).find(".thumbs_mural");
    $(c).css("max-height", "initial");
    $(c).css("height", "");
    $(c).find("a:nth-child(n+3)").css("display", "block");
    $(b).siblings(".continua_post").css("display", "block");
    $(b).css("display", "none")
}

function mostraCurtidores(b, a) {
    b.preventDefault();
    GlobalPaginacaoModalInicio = 1;
    GlobalPaginacaoModalFim = 12;
    idLoadedGlobal = false;
    var f = $(a);
    var d = $(a).attr("id");
    var c = {
        href: f.attr("href"),
        autoSize: false,
        width: 900,
        height: 530,
        autoResize: false,
        fitToView: false,
        padding: 0,
        type: "ajax",
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
            var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + d;
            retornaJsonNovo(e);
            $(".ava_lightcontent").scroll(function() {
                if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                    idLoadedGlobal = true;
                    GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                    GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                    $.fancybox.showLoading();
                    var g = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + d + "&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                    retornaJsonNovo(g, "scrollMode")
                }
            })
        },
        helpers: {
            overlay: {
                locked: false
            }
        }
    };
    $.fancybox(c)
}

function mostraCurtidoresPostagem(a) {
    GlobalPaginacaoModalInicio = 1;
    GlobalPaginacaoModalFim = 12;
    idLoadedGlobal = false;
    var d = $(a);
    var c = $(a).attr("idmensagem");
    var b = {
        href: d.attr("href"),
        autoSize: false,
        width: 900,
        height: 530,
        type: "ajax",
        autoResize: false,
        fitToView: false,
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
            var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + c;
            retornaJsonNovo(e);
            $(".ava_lightcontent").scroll(function() {
                if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                    idLoadedGlobal = true;
                    GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                    GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                    $.fancybox.showLoading();
                    var f = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + c + "&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                    retornaJsonNovo(f, "scrollMode")
                }
            })
        },
        helpers: {
            overlay: {
                locked: false
            }
        }
    };
    $.fancybox(b)
}

function bloqueiaOutrosDigaLa(a) {
    if (a) {
        $("#multimidia_video").hide();
        $("#multimidia_imagens").hide();
        $("#multimidia_documentos").hide()
    } else {
        $("#multimidia_video").show();
        $("#multimidia_imagens").show();
        $("#multimidia_documentos").show()
    }
};