var cacheMenu = false;
var xhr;
var tempoSaida;
var tempoAtual;
var eGlobal;
var esteGlobal;
var tamanhoInputCampoBusca = 650;
var tamanhoOriginalBarrassTopo = 0;
var animacaoRecolherBusca = null;
var semLinks = false;
try {
    var $buoop = {
        vs: {
            i: 9,
            f: 8,
            o: 20,
            s: 4,
            n: 9
        }
    };
    $buoop.ol = window.onload;
    window.onload = function() {
        try {
            if ($buoop.ol) {
                $buoop.ol()
            }
        } catch (a) {}
        var a = document.createElement("script");
        a.setAttribute("type", "text/javascript");
        a.setAttribute("src", "/AVA/StaticContent/Common/Scripts/navegadorUpdate.js");
        document.body.appendChild(a)
    }
} catch (erro) {
    console.log(erro)
}
jQuery(function(f) {
    f.ajax({
        type: "POST",
        url: "/AVA/Login/Home/UsuarioCript",
        async: true,
        success: function(n) {
            idUsuarioCript = n
        },
        error: function(n) {
            if (n.status != 0) {
                idUsuarioCript = 0
            }
        }
    });
    try {
        if (idUsuarioCript == undefined || idUsuarioCript === undefined || idUsuarioCript == "undefined" || idUsuarioCript === "undefined" || idUsuarioCript == null) {
            window.idUsuarioCript = 0;
            console.log(idUsuarioCript)
        }
    } catch (c) {
        window.idUsuarioCript = 0;
        console.log("não foi possivel carregar usuario cript")
    }
    if (idUsuarioCript != 0) {
        var e = "barraSS";
        e += "_reduzido_";
        e += idUsuarioCript;
        try {
            var b = f.jStorage.get(e)
        } catch (d) {
            var b = ""
        }
        if (!b) {
            f("#ava_barratopo").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            f.ajax({
                url: "/AVA/Barras/Home/BarraSS/",
                data: "ts=" + new Date().getTime(),
                success: function(o) {
                    b = o;
                    f("#ava_barratopo").html(b);
                    try {
                        f.jStorage.set(e, b);
                        f.jStorage.setTTL(e, 600000)
                    } catch (n) {}
                    carregaNotificacoes();
                    PesquisaSecoes(f(".topo_reduzido .ph"));
                    f(".aviso_barrass_ava").detach().insertAfter(f("#ava_hd1")).fadeIn();
                    f('<div class="clearfix"></div>').insertAfter(f("#ava_hd1"))
                },
                error: function(n) {
                    if (n.status != 0) {
                        console.debug("Ocorreu um erro na busca da barraSS")
                    }
                }
            })
        } else {
            f("#ava_barratopo").html(b);
            carregaNotificacoes();
            PesquisaSecoes(f(".topo_reduzido .ph"));
            f(".aviso_barrass_ava").detach().insertAfter(f("#ava_hd1")).fadeIn();
            f('<div class="clearfix"></div>').insertAfter(f("#ava_hd1"))
        }
    } else {
        f("#ava_barratopo").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        f.ajax({
            url: "/AVA/Barras/Home/BarraSS/",
            data: "ts=" + new Date().getTime(),
            success: function(n) {
                f("#ava_barratopo").html(n);
                PesquisaSecoes(f(".topo_reduzido .ph"));
                carregaNotificacoes();
                f(".aviso_barrass_ava").detach().insertAfter(f("#ava_hd1")).fadeIn();
                f('<div class="clearfix"></div>').insertAfter(f("#ava_hd1"))
            },
            error: function(n) {
                if (n.status != 0) {
                    console.debug("Ocorreu um erro na busca da barraSS")
                }
            }
        })
    }
    f("body").on("click", ".aviso_barrass_ava a", function() {
        f(this).closest(".aviso_barrass_ava").fadeOut(function() {
            setTimeout(function() {
                f(".aviso_barrass_ava").remove()
            }, 100)
        })
    });
    f("section, body, ul li a").live("click", function(n) {
        if (!(f(n.target).closest(".ava_cont").hasClass("ava_cont"))) {
            if (f(".ava_cont .submenu").is(":visible")) {
                f(".ava_cont .submenu").hide()
            }
        }
        if (!(f(n.target).closest(".ava_ativ").hasClass("ava_ativ"))) {
            if (f(".ava_ativ .submenu").is(":visible")) {
                f(".ava_ativ .submenu").hide()
            }
        }
        if (!(f(n.target).closest(".ava_cp").hasClass("ava_cp"))) {
            if (f(".ava_cp .submenu").is(":visible")) {
                f(".ava_cp .submenu").hide()
            }
        }
        if (!(f(n.target).closest(".ava_lip").hasClass("ava_lip"))) {
            if (f(".ava_lip .submenu").is(":visible")) {
                f(".ava_lip .submenu").hide()
            }
        }
        if (!(f(n.target).closest(".ava_lip_aluno ").hasClass("ava_lip_aluno "))) {
            if (f(".ava_lip_aluno  .link_menu").is(":visible")) {
                f(".ava_li_aluno .submenu").hide()
            }
        }
        if (!(f(n.target).closest(".ava_li_acessorapido").hasClass("ava_li_acessorapido"))) {
            if (f(".ava_li_acessorapido .link_menu").is(":visible")) {
                f("#main_ava").hide()
            }
        }
        if (!(f(n.target).closest(".drop_notif").hasClass("drop_notif"))) {
            if (f(".drop_notif").is(":visible")) {
                f("ul.drop_notif:not(.drop_loading)").fadeOut("fast", function() {
                    f(this).remove()
                })
            }
        }
    });
    f(".troca_conteudo").live("click", function(o) {
        f("#menuava_geral:visible").hide();
        var n = f(this);
        if (n.hasClass("troca_ensMed")) {
            f(".ensinoMedio").show();
            f(".ensinoFundamental").hide()
        } else {
            if (n.hasClass("troca_ensFund")) {
                f(".ensinoMedio").hide();
                f(".ensinoFundamental").show()
            }
        }
        n = undefined;
        o.preventDefault()
    });
    f(".ava_ativ a:first").live("click", function(n) {
        if (f(this).hasClass("atvUnica")) {
            window.location.href = f(this).attr("href")
        } else {
            if (f("ul.drop_notif").hasClass("drop_loading")) {
                f("#vw_notif").addClass("paradoPeloMenu");
                setTimeout(function() {
                    f("#vw_notif").removeClass("paradoPeloMenu")
                }, 1000)
            }
            f("ul.drop_notif").remove();
            f("#menuava_geral:visible").hide();
            if (xhr !== undefined && xhr.readyState != 4) {
                xhr.abort();
                xhr = undefined;
                cacheMenu = false
            }
            var o = f(this).next();
            if (o.is(":visible")) {
                o.hide()
            } else {
                f(".sub_menunav:visible").hide();
                o.show()
            }
        }
        n.preventDefault()
    });
    f("body").on("click", "#ava_user .user_li a:first", function(n) {
        if (f("ul.drop_notif").hasClass("drop_loading")) {
            f("#vw_notif").addClass("paradoPeloMenu");
            setTimeout(function() {
                f("#vw_notif").removeClass("paradoPeloMenu")
            }, 1000)
        }
        f("ul.drop_notif").remove();
        var o = f(this).next();
        if (o.is(":visible")) {
            o.hide()
        } else {
            f(".sub_menunav:visible").hide();
            o.show()
        }
        n.preventDefault()
    });
    f(".ava_cont a:first").live("click", function(n) {
        if (f("ul.drop_notif").hasClass("drop_loading")) {
            f("#vw_notif").addClass("paradoPeloMenu");
            setTimeout(function() {
                f("#vw_notif").removeClass("paradoPeloMenu")
            }, 1000)
        }
        f("ul.drop_notif").remove();
        f("#menuava_geral:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false
        }
        var o = f(this).next();
        if (o.is(":visible")) {
            o.hide()
        } else {
            f(".sub_menunav:visible").hide();
            o.show()
        }
        n.preventDefault()
    });
    f(".ava_cp a:first").live("click", function(n) {
        f(".ava_resultados").empty().hide();
        f("#projeto_acessorapido").val("");
        if (f("ul.drop_notif").hasClass("drop_loading")) {
            f("#vw_notif").addClass("paradoPeloMenu");
            setTimeout(function() {
                f("#vw_notif").removeClass("paradoPeloMenu")
            }, 1000)
        }
        f("ul.drop_notif").remove();
        f("#menuava_geral:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false
        }
        var o = f(this).next();
        if (o.is(":visible")) {
            o.hide()
        } else {
            f(".sub_menunav:visible").hide();
            o.show()
        }
        n.preventDefault()
    });
    f(".ava_lip a:first").live("click", function(n) {
        if (f("ul.drop_notif").hasClass("drop_loading")) {
            f("#vw_notif").addClass("paradoPeloMenu");
            setTimeout(function() {
                f("#vw_notif").removeClass("paradoPeloMenu")
            }, 1000)
        }
        f("ul.drop_notif").remove();
        f("#menuava_geral:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false
        }
        var o = f(this).next();
        if (o.is(":visible")) {
            o.hide()
        } else {
            f(".sub_menunav:visible").hide();
            o.show()
        }
        n.preventDefault()
    });
    f(".ava_lip_aluno a:first").live("click", function(n) {
        if (f("ul.drop_notif").hasClass("drop_loading")) {
            f("#vw_notif").addClass("paradoPeloMenu");
            setTimeout(function() {
                f("#vw_notif").removeClass("paradoPeloMenu")
            }, 1000)
        }
        f("ul.drop_notif").remove();
        f("#menuava_geral:visible").hide();
        if (xhr !== undefined && xhr.readyState != 4) {
            xhr.abort();
            xhr = undefined;
            cacheMenu = false
        }
        var o = f(this).next();
        if (o.is(":visible")) {
            o.hide()
        } else {
            f(".sub_menunav:visible").hide();
            o.show()
        }
        n.preventDefault()
    });
    if (idUsuarioCript != 0) {
        var h = "tarjaSuperior";
        h += "_reduzido_";
        h += idUsuarioCript;
        var m = "";
        try {
            m = f.jStorage.get(h)
        } catch (d) {
            m = ""
        }
        f("#ava_barraescola").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        if (!m) {
            f.ajax({
                url: "/AVA/Barras/Home/TarjaSuperior",
                success: function(o) {
                    if (o[0] != "0") {
                        m = o;
                        f("#ava_barraescola").show().html(m);
                        try {
                            f.jStorage.set(h, m);
                            f.jStorage.setTTL(h, 600000)
                        } catch (n) {}
                        PesquisaSecoes(f(".topo_completo .ph"))
                    }
                },
                error: function(n) {
                    if (n.status != 0) {
                        m = "erro";
                        console.debug("Ocorreu um erro na busca da Tarja Superior")
                    }
                }
            })
        } else {
            f("#ava_barraescola").show().html(m);
            PesquisaSecoes(f(".topo_completo .ph"))
        }
    } else {
        f.ajax({
            url: "/AVA/Barras/Home/TarjaSuperior",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(n) {
                if (n[0] != "0") {
                    f("#ava_barraescola").show().html(n);
                    PesquisaSecoes(f(".topo_completo .ph"))
                }
            },
            error: function(n) {
                if (n.status != 0) {
                    m = "erro";
                    console.debug("Ocorreu um erro na busca da Tarja Superior")
                }
            }
        })
    }
    f("#ava_acessorapido").live("click", function() {
        if (!f("#menuava_geral").is(":visible")) {
            f("#menuava_geral").closest("nav").show();
            f("#menuava_geral").closest("div").show();
            f("#menu_equerda").show().html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
            f("#menu_direita").show().html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
            verificaSeTemLinks();
            xhr = f.ajax({
                url: "/AVA/Barras/AcessoRapido/MenuAcessoRapido",
                cache: true,
                success: function(n) {
                    f("#menuava_geral").empty().html(n);
                    f(".ava_container_masonry").masonry();
                    f("#strpc_acessorapido").addPlaceholder();
                    if (f("ul.drop_notif").hasClass("drop_loading")) {
                        f("#vw_notif").addClass("paradoPeloMenu");
                        setTimeout(function() {
                            f("#vw_notif").removeClass("paradoPeloMenu")
                        }, 1000)
                    }
                    f("ul.drop_notif").remove();
                    carregarPerfilUrlMenu("/AVA/Barras/Home/MuralMenu/")
                },
                error: function(n) {
                    if (n.status != 0) {
                        console.debug(n.responseText)
                    }
                }
            })
        } else {
            f("#menuava_geral").closest("nav").hide();
            f("#menuava_geral").closest("div").hide();
            f("#menu_equerda").hide()
        }
    });
    f("#ava_bt_vejatudo").live("click", function() {
        f(this).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        vejaTudo()
    });
    f(".ava_resultados ul li:first a").live("click", function() {
        if (f(this).attr("href") == "semresultado") {
            vejaTudo()
        }
    });
    f(".fim_resultados a").live("click", function() {
        if (f(".fim_resultados").prev().find("a").attr("href").indexOf("/AVA/Projetos") < 0) {
            var n = f(this).attr("href");
            location.href = "/AVA/AcessoRapido/AcessoRapido/listaCompleta/" + f("#strpc_acessorapido").val()
        }
    });
    f("#strpc_acessorapido").live("keyup", function(o) {
        var n = f(this).val();
        if (n.length > 0) {
            n = retira_acentos(n);
            f.ajax({
                method: "post",
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                url: "/AVA/Barras/AcessoRapido/PesquisaAcessoRapido/",
                data: {
                    sPesquisa: n
                },
                success: function(p) {
                    f(".ava_resultados").empty().show().html(p);
                    f(".fim_resultados a").attr("href", f("#strpc_topo").val())
                },
                error: function(p) {
                    if (p.status != 0) {
                        console.debug(p.responseText)
                    }
                }
            })
        } else {
            f(".ava_resultados").empty().hide()
        }
    });
    f("#go_button").live("click", function() {
        f("#ava_listacompleta").empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        f.ajax({
            url: "/AVA/AcessoRapido/AcessoRapido/PesquisaAcessoRapido/" + f("#strpc_acessorapido").val(),
            success: function(n) {
                f("#ava_listacompleta").empty().html(n)
            },
            error: function(n) {
                if (n.status != 0) {
                    console.debug("Erro")
                }
            }
        })
    });
    f("#projeto_acessorapido").live("keyup", function(o) {
        var n = f(this).val();
        if (n.length > 0) {
            n = retira_acentos(n);
            f.ajax({
                method: "post",
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                url: "/AVA/Barras/AcessoRapido/PesquisaAcessoRapidoProjetos/",
                data: {
                    sPesquisa: n
                },
                success: function(p) {
                    f(".ava_resultados").empty().show().html(p)
                },
                error: function(p) {
                    if (p.status != 0) {
                        console.debug(p.responseText)
                    }
                }
            })
        } else {
            f(".ava_resultados").empty().hide()
        }
    });
    f(function() {
        var o = "/AVA/Barras/Home/ListaNoticiasEscola";
        var q = (typeof bolEstaNoMural != "undefined" && bolEstaNoMural) ? "NovaHome" : "";
        o = "/AVA/Barras/Home/ListaNoticiasEscola" + q;
        if (idUsuarioCript != 0) {
            var p = "";
            try {
                p = f.jStorage.get("noticiasEscola" + q + idUsuarioCript)
            } catch (n) {}
        }
        if (p) {
            f("#lista_noticias").html(p)
        } else {
            f.ajax({
                url: o,
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                success: function(s) {
                    if (s.indexOf("Nenhuma notícia encontrada.") == -1) {
                        f("#lista_noticias").html(s);
                        try {
                            if (idUsuarioCript != 0) {
                                f.jStorage.set("noticiasEscola" + q + idUsuarioCript, s);
                                f.jStorage.setTTL("noticiasEscola" + q + idUsuarioCript, 600000)
                            }
                        } catch (r) {}
                    } else {
                        f("#lista_noticias").remove()
                    }
                },
                error: function(r) {
                    f("#lista_noticias").remove()
                }
            })
        }
    });
    if (idUsuarioCript != 0) {
        try {
            var l = f.jStorage.get("noticiasPortal" + idUsuarioCript);
            var g = f.jStorage.get("noticiasClube" + idUsuarioCript)
        } catch (d) {
            var l = "";
            var g = ""
        }
        if (!l) {
            if (f("body").data("bolclube") == 1) {
                f.ajax({
                    url: "/esc_include/inc_home/inc_barraDir_destaques_CLUBE.asp",
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    success: function(o) {
                        g = o;
                        f(".ph").addPlaceholder();
                        f(".bcs1").append(g);
                        try {
                            f.jStorage.set("noticiasClube" + idUsuarioCript, l);
                            f.jStorage.setTTL("noticiasClube" + idUsuarioCript, 300000)
                        } catch (n) {}
                    }
                });
                f(".bcs1").addClass("atividade_vez");
                f(".bcs1").prepend("<header><h1>Atividades do Clube</h1></header>")
            } else {
                if (!f("#ava_mural_geral > div").hasClass("perfil_restrito")) {
                    f.ajax({
                        url: "/esc_include/inc_home/inc_barraDir_destaques_ava.asp",
                        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                        success: function(o) {
                            l = o;
                            f(".ph").addPlaceholder();
                            f("#notiDs5").html(l);
                            if (l != "500" && l != "") {
                                f("#sLista_noticiasPortal").show()
                            }
                            try {
                                f.jStorage.set("noticiasPortal" + idUsuarioCript, l);
                                f.jStorage.setTTL("noticiasPortal" + idUsuarioCript, 300000)
                            } catch (n) {}
                        },
                        error: function(n) {
                            l = n.status;
                            f(".ph").addPlaceholder();
                            f("#notiDs5").html(l);
                            if (l != "500" && l != "") {
                                f("#sLista_noticiasPortal").show()
                            }
                        }
                    })
                }
            }
        } else {
            f(".ph").addPlaceholder();
            if (f("body").data("bolclube") == 1) {
                f(".bcs1").addClass("atividade_vez");
                f(".bcs1").prepend("<header><h1>Atividades do Clube</h1></header>");
                f.ajax({
                    url: "/esc_include/inc_home/inc_barraDir_destaques_CLUBE.asp",
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    success: function(o) {
                        g = o;
                        f(".ph").addPlaceholder();
                        f(".bcs1").append(g);
                        try {
                            f.jStorage.set("noticiasClube" + idUsuarioCript, l);
                            f.jStorage.setTTL("noticiasClube" + idUsuarioCript, 300000)
                        } catch (n) {}
                    }
                })
            } else {
                if (!f("#ava_mural_geral > div").hasClass("perfil_restrito")) {
                    f("#notiDs5").html(l);
                    f("#sLista_noticiasPortal").show()
                }
            }
        }
    } else {
        f(".ph").addPlaceholder();
        if (f("body").data("bolclube") == 1) {
            f.ajax({
                url: "/esc_include/inc_home/inc_barraDir_destaques_CLUBE.asp",
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                success: function(o) {
                    g = o;
                    f(".ph").addPlaceholder();
                    f(".bcs1").append(g);
                    try {
                        f.jStorage.set("noticiasClube" + idUsuarioCript, l);
                        f.jStorage.setTTL("noticiasClube" + idUsuarioCript, 300000)
                    } catch (n) {}
                }
            });
            f(".bcs1").addClass("atividade_vez");
            f(".bcs1").prepend("<header><h1>Atividades do Clube</h1></header>")
        } else {
            if (!f("#ava_mural_geral > div").hasClass("perfil_restrito")) {
                f.ajax({
                    url: "/esc_include/inc_home/inc_barraDir_destaques_ava.asp",
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    success: function(n) {
                        f("#notiDs5").html(n);
                        if (n != "500" && n != "") {
                            f("#sLista_noticiasPortal").show()
                        }
                    },
                    error: function(n) {
                        alert(n.status)
                    }
                })
            }
        }
    }
    f(".editar_Perfil").live("click", function(n) {
        f("#ava_editar_perfil_usuario").trigger("click");
        n.preventDefault()
    });
    f("#fBuscaReduzido").live("keypress", function(n) {
        if (n.which == 13) {
            f("#hdstrpc_topo").val(f("#strpc_topoReduzido").val())
        }
    });
    f("body").on("click", ".lupa_pesquisa", function(n) {
        f("#fBuscaReduzido").addClass("busca_ativa");
        if (f(this).prev().width() > 60) {
            if (f(this).closest(".pesquisa_escolar").hasClass("topo_reduzido")) {
                var o = f(this).siblings("input[name=strpc_topo]").val();
                clearTimeout(animacaoRecolherBusca);
                if (o.length < 2) {
                    alert("A pesquisa deve conter ao menos 2 caracteres");
                    f(".pesquisa_escolar.topo_reduzido .campo").stop().width(tamanhoInputCampoBusca);
                    f(".pesquisa_escolar.topo_reduzido .campo").focus();
                    f("body").one("blur", "#ava_barratopo .campo", blurCampoBuscaReduzido)
                } else {
                    f(".pesquisa_escolar.topo_reduzido .campo").stop().width(tamanhoInputCampoBusca);
                    f(this).closest("form").submit()
                }
            } else {
                var o = f(this).siblings("input[name=strpc_topo]").val();
                if (o.length < 2) {
                    alert("A pesquisa deve conter ao menos 2 caracteres")
                } else {
                    f(this).closest("form").submit()
                }
            }
        }
    });
    if (location.pathname.toLowerCase().indexOf("ava/") >= 0) {
        var a = false;
        try {
            a = Modernizr.touch
        } catch (k) {
            console.log("não foi possivel verificar se é mobile.")
        }
        if (!a) {
            try {
                f("#fimTarjaSuperior").waypoint(function(n, o) {
                    f("#ava_barratopo #menuava_geral").hide();
                    f("#ava_barratopo .sub_menunav").hide();
                    f(".campo_drop").hide();
                    f("ul.drop_notif").remove();
                    f("#ava_barraescola input.campo.ph").val("");
                    f("#ava_barratopo input.campo.ph").val("");
                    f("#ava_barratopo").parent().css({
                        height: "55px"
                    });
                    f("#ava_barratopo").css({
                        top: "0px"
                    });
                    f("#ava_barratopo").addClass("fixa_barratopo");
                    f("#ava_barratopo .ava_ico_home").show();
                    f("#ava_barratopo #txtSearch").show()
                })
            } catch (j) {
                console.log(j)
            }
        }
    }
    f(window).scroll(function(o) {
        var n = f(this).scrollTop();
        if (n == 0) {
            f("#ava_barratopo").removeClass("fixa_barratopo");
            f("#ava_barratopo").removeAttr("style")
        }
    });
    f("#strpc_topoReduzido").width(50);
    f("body").on("click", "#txtSearch", function() {
        if (f("#ava_barratopo #ava_acessorapido").parent().is(":visible")) {
            var r = f("#ava_barratopo .ava_li_acessorapido").offset();
            var o = f("#ava_barratopo .ava_li_acessorapido").width();
            var p = f("#strpc_topoReduzido").offset();
            tamanhoInputCampoBusca = Math.ceil((p.left - (r.left + o + 20)) + 50)
        } else {
            var q = f("#ava_barratopo .ava_ico_home").offset();
            var s = f("#ava_barratopo .ava_ico_home").width();
            var p = f("#strpc_topoReduzido").offset();
            tamanhoInputCampoBusca = Math.ceil((p.left - (q.left + s + 10)) + 50)
        }
        var n = f("#txtSearch .campo").width();
        if (n <= 60) {
            f("#txtSearch .campo").animate({
                width: tamanhoInputCampoBusca
            }, 600, function() {
                f("#hdstrpc_topo").val("");
                f("body").one("blur", "#ava_barratopo .campo", blurCampoBuscaReduzido);
                f("#ava_barratopo .campo_drop").width(tamanhoInputCampoBusca - 2);
                f("#txtSearch .campo").attr("placeholder", "Pesquise por conteúdos ou @códigos");
                f("#txtSearch .campo").focus()
            })
        }
    });
    f("body").on("keyup", ".pesquisa_escolar.topo_reduzido .campo", function(n) {
        f(this).prev().val(f(this).val())
    })
});

function blurCampoBuscaReduzido(b) {
    var a = $(".pesquisa_escolar.topo_reduzido .campo_drop").is(":visible") ? 100 : 0;
    var c = $(this);
    $("#fBuscaReduzido").removeClass("busca_ativa");
    $(this).siblings("input[name=strpc_topo]").val(c.val());
    window.setTimeout(function() {
        c.blur();
        c.val("");
        c.siblings(".campo_drop").hide();
        c.removeAttr("placeholder");
        clearTimeout(animacaoRecolherBusca);
        animacaoRecolherBusca = window.setTimeout(function() {
            c.animate({
                width: 50
            }, 600)
        }, 100)
    }, a)
}

function carregarLIP() {
    if (idUsuarioCript != 0) {
        try {
            var a = $.jStorage.get("LIP" + idUsuarioCript)
        } catch (b) {
            var a = ""
        }
        $("#carregarLIP").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        if (!a) {
            $.ajax({
                url: "/escolas/portalpositivo/includes/alunos58/lipava.asp",
                contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                success: function(d) {
                    a = d;
                    $("#carregarLIP").empty().html(d);
                    try {
                        $.jStorage.set("LIP" + idUsuarioCript, d);
                        $.jStorage.setTTL("LIP" + idUsuarioCript, 600000)
                    } catch (c) {}
                },
                error: function(c) {
                    if (c.status != 0) {}
                }
            })
        } else {
            $("#carregarLIP").empty().html(a)
        }
    } else {
        $.ajax({
            url: "/escolas/portalpositivo/includes/alunos58/lipava.asp",
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            success: function(c) {
                $("#carregarLIP").empty().html(c)
            },
            error: function(c) {
                if (c.status != 0) {}
            }
        })
    }
}

function vejaTudo() {
    location.href = "/AVA/AcessoRapido"
}

function atualizaVersaoUsuarioAVA() {
    $.post("/avaliacoesonline/includes/ajax_grava_versao_usuario.asp?bolNova=0", function() {
        if (retorno = "1") {
            location.href = "/avaliacoes/"
        }
    })
}

function MM_jumpMenu(targ, selObj) {
    if (selObj.options[selObj.selectedIndex].value == "#") {
        selObj.selectedIndex = 0
    } else {
        eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'")
    }
}

function logoutAVA() {

    localStorage.setItem("Token",null);
    localStorage.setItem("idUser",null);
    localStorage.setItem("secret",null);
    localStorage.setItem("tka",null);





    try {
        var b = $.jStorage.index();
        for (i = 0; i < b.length; i++) {
            if (b[i].indexOf(idUsuarioCript) > 0) {
                $.jStorage.deleteKey(b[i])
            }
        }
    } catch (a) {
        console.log("não foi possivel limpar o storage")
    }
    location.href = "/AVA/Login/Home/Logout"
}

function logoutAVADados() {

    try {
        var b = $.jStorage.index();
        for (i = 0; i < b.length; i++) {
            if (b[i].indexOf(idUsuarioCript) > 0) {
                $.jStorage.deleteKey(b[i])
            }
        }
    } catch (a) {
        console.log("não foi possivel limpar o storage")
    }
    location.href = "/AVA/Login/Home/LogoutDados"
}

function carregaNotificacoes() {
    var a = $("#ava_user").attr("ident");
    if (!isNaN(a)) {
        _total = 0;
        _notif_click = null;
        $.get("/AVA/Mural/Home/ContaNotificacoes/" + a, {
            ts: new Date().getTime()
        }, function(b) {
            if (Number(b) > 0) {
                $("#vw_notif .noti_quant").fadeIn().text(Number(b));
                _total = Number(b)
            }
            $("#vw_notif").click(function(c) {
                if ($(".drop_notif").is(":visible")) {
                    $("#ava_user").find("ul.drop_notif").fadeOut("fast", function() {
                        $(this).remove()
                    })
                } else {
                    $("#ava_user .noti_li").append('<ul class="drop_notif drop_loading"><a class="seta_up" href="#"></a><li style="padding:15px; text-align:center;"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" /></li></ul>');
                    $.get("/AVA/Mural/Home/NotificacoesTop/" + a, {
                        ts: new Date().getTime()
                    }, function(d) {
                        if (!$("#vw_notif").hasClass("paradoPeloMenu")) {
                            $("#ava_user .noti_li").append(d);
                            $("#ava_user .drop_loading").remove();
                            $.get("/AVA/Mural/Home/Notifica/" + a, {
                                ts: new Date().getTime()
                            }, function(e) {
                                _total = 0;
                                $("#vw_notif .noti_quant").fadeOut().text("")
                            })
                        } else {
                            $("#vw_notif").removeClass("paradoPeloMenu")
                        }
                    })
                }
                c.preventDefault()
            })
        })
    }
}

function retira_acentos(a) {
    com_acento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
    sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    nova = "";
    for (i = 0; i < a.length; i++) {
        if (com_acento.search(a.substr(i, 1)) >= 0) {
            nova += sem_acento.substr(com_acento.search(a.substr(i, 1)), 1)
        } else {
            nova += a.substr(i, 1)
        }
    }
    return nova
}

function validaPesqEscolar(b) {
    var a = $("input[name=strpc_topo]", b).val();
    if (a.length < 2) {
        if ($(b).attr("id") == "fBuscaReduzido") {
            alert("A pesquisa deve conter ao menos 2 caracteres");
            clearTimeout(animacaoRecolherBusca);
            $(".pesquisa_escolar.topo_reduzido .campo").stop().width(tamanhoInputCampoBusca);
            $(".pesquisa_escolar.topo_reduzido .campo").stop().focus();
            $("body").one("blur", "#ava_barratopo .campo", blurCampoBuscaReduzido)
        } else {
            alert("A pesquisa deve conter ao menos 2 caracteres")
        }
        return false
    }
}
if (typeof String.prototype.endsWith !== "function") {
    String.prototype.endsWith = function(a) {
        return this.indexOf(a, this.length - a.length) !== -1
    }
}

function carregarPerfilUrlMenu(a) {
    $("#menu_equerda").show().html("<img src='/AVA/StaticContent/Common/img/geral/ajax-loader.gif' border='0' />");
    $.ajax({
        url: a,
        cache: false,
        success: function(b) {
            $("#menu_equerda").html(b);
            if (semLinks) {
                $(".menu_item_links").css("display", "none")
            }
        },
        error: function(b) {
            if (b.status == 0) {
                $("#menu_equerda").empty()
            } else {
                console.debug("Ocorreu um erro na busca do perfil do usuário.")
            }
        }
    })
}

function verificaSeTemLinks() {
    $.ajax({
        url: "/AVA/Barras/Home/MenuLinks/",
        cache: false,
        success: function(a) {
            if (a == "" || a == undefined || a == "undefined") {
                semLinks = true
            }
        },
        error: function(a) {
            if (a.status == 0) {
                $(".menu_item_links").find("div.mask").empty()
            }
        }
    })
};