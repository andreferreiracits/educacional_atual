function lightBoxAVA(e, a) {
    null == a ? e.fancybox() : e.fancybox(a)
}

function getVideoTime(e) {
    var a = null;
    if (e.indexOf("#t=") > 0 ? a = e.split("#t=") : e.indexOf("?t=") > 0 ? a = e.split("?t=") : e.indexOf("&t=") > 0 ? a = e.split("&t=") : e.indexOf("&start=") > 0 ? a = e.split("&start=") : e.indexOf("?start=") > 0 && (a = e.split("?start=")), a.length > 1)
        if (a = a[1].toLowerCase(), a.indexOf("m") > 0) {
            var t = a.split("m"),
                o = 0,
                i = 0;
            o = parseInt(t[0]), o = isNaN(o) ? 0 : o > 0 ? 60 * o : 0, t.length > 1 && (i = parseInt(t[1].replace("s", "")), isNaN(i) && (i = 0)), a = o + i, a = isNaN(a) ? "" : 1 > a ? "" : a.toString()
        } else a = a.replace("s", "");
    else a = "";
    return a
}

function getVimeoData(e) {
    var a = null;
    return $.ajax({
        dataType: "json",
        url: "http://vimeo.com/api/oembed.json?url=" + e,
        async: !1,
        success: function(e) {
            a = e
        },
        error: function(e) {
            a = "erro"
        }
    }), a
}

function getVimeoThumb(e) {
    var a = null;
    return $.ajax({
        dataType: "json",
        url: "http://vimeo.com/api/oembed.json?url=" + e,
        async: !1,
        success: function(e) {
            a = e.thumbnail_url
        }
    }), a
}

function getYoutubeKey() {
    var e = "AIzaSyAC32w4_zig4w2vICD1JVNk6X_yboV3lKQ";
    return e
}

function getYoutubeURLDados(e) {
    return "https://www.googleapis.com/youtube/v3/videos?id=" + e + "&key=" + getYoutubeKey() + "&fields=items(snippet(channelId,title,categoryId),status(privacyStatus,license,embeddable))&part=snippet,status"
}

function getYoutubeVideo(e) {
    var a = null;
    return $.ajax({
        dataType: "json",
        url: getYoutubeURLDados(e),
        async: !1,
        success: function(e) {
            e.items.length > 0 && (a = e)
        }
    }), a
}

function retornaTextoErroVideo(e) {
    return e ? "Este vídeo tem sua incorporação proibida pelo seu proprietário e não pode ser inserido." : "A URL inserida acima é inválida ou não existe."
}

function retornaVideoURL(e) {
    var a = null;
    if (strTipoVideo = "", ("youtube.com" == e.url || "youtu.be" == e.url || "youtube" == e.url) && (a = $.ajax({
            url: getYoutubeURLDados(e.id),
            timeout: 5e3,
            success: function(e, a, t) {
                e.items.length > 0 && (0 == e.items[0].status.embeddable ? (bolVideoProibido = !0, strTipoVideo = "") : strTipoVideo = "youtube")
            },
            dataType: "jsonp"
        })), "vimeo.com" == e.url) {
        var t = "http://vimeo.com/api/v2/video/" + e.id + ".json";
        a = $.ajax({
            url: t,
            timeout: 2e3,
            dataType: "jsonp",
            success: function(e) {
                e.length > 0 && ("nowhere" == e[0].embed_privacy ? (bolVideoProibido = !0, strTipoVideo = "") : strTipoVideo = "vimeo")
            }
        })
    }
    return a
}

function retornaMatchVideo(e) {
    if (e.indexOf("http://") > -1 ? e = e.replace("http://", "") : e.indexOf("https://") > -1 && (e = e.replace("https://", "")), e.indexOf("&feature=youtu.be") > -1) {
        var a = e.indexOf("&feature=youtu.be");
        if (e.indexOf("&list=") > -1) {
            var t = e.indexOf("&list=");
            e = e.substring(0, a) + e.substring(t, e.length)
        } else if (e.indexOf("#t=") > -1) {
            var o = e.indexOf("#t=");
            e = e.substring(0, a) + e.substring(o, e.length)
        } else if (e.indexOf("&t=") > -1) {
            var o = e.indexOf("&t=");
            e = e.substring(0, a) + e.substring(o, e.length)
        } else if (e.indexOf("&amp;t=") > -1) {
            var o = e.indexOf("&amp;t=");
            e = e.substring(0, a) + e.substring(o, e.length)
        } else if (e.indexOf("?t=") > -1) {
            var o = e.indexOf("?t=");
            e = e.substring(0, a) + e.substring(o, e.length)
        } else e.indexOf("&feature=youtu.be") > -1 && (e = e.substring(0, a))
    }
    var i = /^(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be)|youtube)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
        n = i.exec(e);
    if (null == n) return !1;
    var s = {
            provider: null,
            url: n[2],
            id: n[5]
        },
        l = retornaVideoURL(s);
    return l
}

function retornaProfessoresTurma(e, a) {
    $(".vertodosEscola").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7");
    var t = $(".vertodosEscola"),
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
                $("#main_ava").hide(), $urlTurmaCompleta = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=7&idPublico=&strLogin=" + e + "&idTurma=0", retornaJsonMenu($urlTurmaCompleta), $(".scroll_cart_turmas").mCustomScrollbar(), 0 == a ? ($("#escolaRede").attr("disabled", !0), $("#minhasOuTodas").attr("disabled", !0), $("#unidades").attr("disabled", !0)) : $("#nivelEnsino").removeAttr("disabled")
            },
            helpers: {
                overlay: {
                    locked: !1
                }
            }
        };
    lightBoxAVA(t, o)
}

function retornaJsonMenu(e) {
    e.indexOf("idTurma=0") > 0 ? $.getJSON(e, null, function(e) {
        var a = null;
        a = e.Result, xmlGlobalEscolaTurmas = e, $("#myContentTemplate").tmpl(e).appendTo("#ava_contentlista"), $("#ava_contentlista #ava_loader").css("display", "none"), $("#txtFiltroAvaTurma").live("keyup", function(e) {
            if (e.which && 13 == e.which || e.keyCode && 13 == e.keyCode) return e.preventDefault(), !1;
            $(this).attr("id") ? _id = $(this).attr("id") : _id = 0;
            var t = "",
                o = "";
            t = $("#escolaRede").size() > 0 ? $("#escolaRede").val() : -1, o = $("#unidades").size() > 0 ? $("#unidades").val() : -1;
            var i = $("#nivelEnsino").val(),
                n = $("#intAnoSerie").val();
            0 == i && (i = -1), 0 == n && (n = -1), FiltrarTurmaCompletoMenu("#ava_contentlista", a, $(this).val(), t, o, i, n, -1, 0)
        }), $("#txtFiltroAvaTurma").live("focus", function() {
            "Pesquisar por turma" == $(this).val() && $(this).val("")
        }), $("#txtFiltroAvaTurma").live("blur", function() {
            "" == $(this).val() && $(this).val("Pesquisar por turma")
        }), $("#minhasOuTodas").change(function(e) {
            1 == $(this).val() ? ($("#filtrosEscolaCoord").find("select").attr("disabled", !0), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", -1, -1, -1, -1, -1, 1)) : ($("#escolaRede").val(0), $("#unidades").val(0), $("#nivelEnsino").val(-1), $("#intAnoSerie").val(0), $("#filtrosEscolaCoord").find("select").first().removeAttr("disabled"), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", -1, -1, -1, -1, -1, 0), $("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0)), void 0 == $("#minhasOuTodas").attr("disabled") && "disabled" == $("#nivelEnsino").attr("disabled") && ($("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#nivelEnsino").removeAttr("disabled"), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0))
        }), $("#escolaRede").size() > 0 ? idEscola = $("#escolaRede").val() : idEscola = -1, $("#unidades").size() > 0 ? idUnidade = $("#unidades").val() : idUnidade = -1, -1 == idEscola && -1 == idUnidade && ($("#nivelEnsino").removeAttr("disabled"), idEscola = $("#idEscola").val(), $.ajax({
            url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + idEscola + "&intUnidade=0",
            type: "GET",
            cache: !1,
            dataType: "json",
            success: function(e) {
                var t = parseInt(e.error);
                1 == t ? ($("#nivelEnsino").empty().html('<option value="n/a">Erro</option>'), console.log(e.responseText)) : ($("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#nivelEnsino").attr("disabled", !0), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), $("#nivelEnsino").removeAttr("disabled"), $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>'), $(e.listaEnsino).each(function(e, a) {
                    $("#nivelEnsino").append('<option value="' + a.idEnsino + '">' + a.strEnsino + "</option>")
                }), $("#listaCarteirinha").empty(), idLoadedGlobal = !1, $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />'), idUnidade = -1, idEnsino = -1, void 0 == $("#escolaRede").val() ? ($("#nivelEnsino").attr("disabled", !0), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", -1, idUnidade, idEnsino, -1, -1, 0)) : FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", idEscola, idUnidade, idEnsino, -1, -1, 0), void 0 == $("#minhasOuTodas").attr("disabled") && "disabled" == $("#nivelEnsino").attr("disabled") && $("#nivelEnsino").removeAttr("disabled"))
            },
            error: function(e) {
                $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>'), console.log(e.reseponseText)
            }
        })), $("#escolaRede").change(function(e) {
            $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
            var t = parseInt($(this).val()),
                o = $("#escolaRede option:selected").html();
            $("#unidades").size() > 0 ? 0 == t ? ($("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#nivelEnsino").attr("disabled", !0), $("#unidades").find("option[value=0]").attr("selected", !0), $("#unidades").attr("disabled", !0), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), idLoadedGlobal = !1, FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", -1, -1, -1, -1, -1, 0)) : $.ajax({
                url: "/AVA/Barras/Home/getUnidadesByIdEscola?id=" + t,
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(e) {
                    var a = parseInt(e.error);
                    1 == a ? ($("#unidades").empty().html('<option value="n/a">Erro</option>'), console.log(e.responseText)) : ($("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#nivelEnsino").attr("disabled", !0), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), $("#unidades").empty().html('<option value="0">Unidade (Todas)</option>'), $(e.listaUnidades).each(function(e, a) {
                        $("#unidades").append('<option value="' + a.id + '">' + a.strUnidade + "</option>")
                    }))
                },
                error: function(e) {
                    $("#unidades").empty().html('<option value="n/a">Erro</option>'), console.log(e.responseText)
                }
            }) : 0 == t ? ($("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#nivelEnsino").attr("disabled", !0), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), idLoadedGlobal = !1, FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", -1, -1, -1, -1, -1, 0)) : ($("#listaFiltrados").text(o), $.ajax({
                url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + t + "&intUnidade=0",
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(e) {
                    var o = parseInt(e.error);
                    1 == o ? ($("#nivelEnsino").empty().html('<option value="n/a">Erro</option>'), console.log(e.responseText)) : ($("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#nivelEnsino").attr("disabled", !0), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), $("#nivelEnsino").removeAttr("disabled"), $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>'), $(e.listaEnsino).each(function(e, a) {
                        $("#nivelEnsino").append('<option value="' + a.idEnsino + '">' + a.strEnsino + "</option>")
                    }), $("#listaCarteirinha").empty(), idLoadedGlobal = !1, $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />'), idUnidade = -1, idEnsino = -1, FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", t, idUnidade, idEnsino, -1, -1, 0))
                },
                error: function(e) {
                    $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>'), console.log(e.reseponseText)
                }
            }))
        }), $("#unidades").change(function(e) {
            $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
            var t = parseInt($(this).val()),
                o = "";
            o = $("#escolaRede").size() > 0 ? $("#escolaRede").val() : 0, 0 == t ? ($("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#nivelEnsino").attr("disabled", !0), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", -1, -1, -1, -1, -1, 0)) : $.ajax({
                url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + o + "&intUnidade=" + t,
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(e) {
                    var o = parseInt(e.error);
                    1 == o ? ($("#nivelEnsino").empty().html('<option value="n/a">Erro</option>'), console.log(e.responseText)) : ($("#nivelEnsino").find("option[value=-1]").attr("selected", !0), $("#nivelEnsino").attr("disabled", !0), $("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), $("#nivelEnsino").removeAttr("disabled"), $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>'), $(e.listaEnsino).each(function(e, a) {
                        $("#nivelEnsino").append('<option value="' + a.idEnsino + '">' + a.strEnsino + "</option>")
                    }), idLoadedGlobal = !1, FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", -1, t, -1, -1, -1, 0))
                },
                error: function(e) {
                    $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>'), console.log(e.reseponseText)
                }
            })
        }), $("#nivelEnsino").live("change", function(e) {
            $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
            var t = parseInt($(this).val()),
                o = "",
                i = "";
            o = $("#escolaRede").size() > 0 ? $("#escolaRede").val() : 0, i = $("#unidades").size() > 0 ? $("#unidades").val() : 0, 0 == o && 0 == i && ($("#nivelEnsino").removeAttr("disabled"), o = $("#idEscola").val()), -1 == t ? ($("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), idLoadedGlobal = !1, 0 == o && (o = -1), 0 == i && (i = -1), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", o, i, t, -1, -1, 0)) : $.ajax({
                url: "/ava/Barras/home/getAnoSerie?id=" + o + "&idUnidade=" + i + "&idEnsino=" + t,
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(e) {
                    var n = parseInt(e.error);
                    1 == n ? $("#intAnoSerie").empty().html('<option value="n/a">Erro</option>') : ($("#intAnoSerie").find("option[value=0]").attr("selected", !0), $("#intAnoSerie").attr("disabled", !0), $("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), $("#intAnoSerie").removeAttr("disabled"), $("#intAnoSerie").empty().html('<option value="0">Série (Todas)</option>'), $(e.listaSerie).each(function(e, a) {
                        $("#intAnoSerie").append('<option value="' + a.idSerie + '">' + a.strSerie + "</option>")
                    }), idLoadedGlobal = !1, 0 == o && (o = -1), 0 == i && (i = -1), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", o, i, t, -1, -1, 0))
                },
                error: function(e) {
                    $("#intAnoSerie").empty().html('<option value="n/a">Erro</option>'), console.log(e.responseText)
                }
            })
        }), $("#intAnoSerie").live("change", function(e) {
            $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
            var t = parseInt($(this).val()),
                o = $("#nivelEnsino").val(),
                i = "",
                n = "";
            i = $("#escolaRede").size() > 0 ? $("#escolaRede").val() : 0, n = $("#unidades").size() > 0 ? $("#unidades").val() : 0, 0 == t ? ($("#turmas").find("option[value=0]").attr("selected", !0), $("#turmas").attr("disabled", !0), idLoadedGlobal = !1, todosUsers = !1, 0 == i && (i = -1), 0 == n && (n = -1), 0 == t && (t = -1), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", i, n, o, t, -1, 0)) : $.ajax({
                url: "/ava/Barras/home/getTurmasByEscolaUnidadeEnsinoSerie?id=" + i + "&idUnidade=" + n + "&idEnsino=" + o + "&idSerie=" + t,
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(e) {
                    var s = parseInt(e.error);
                    0 == s ? ($("#turmas").removeAttr("disabled"), $("#turmas").empty().html('<option value="0">Turmas (Todas)</option>'), $(e.listaTurmas).each(function(e, a) {
                        $("#turmas").append('<option value="' + a.id + '">' + a.strNome + "</option>")
                    }), idLoadedGlobal = !1, 0 == i && (i = -1), 0 == n && (n = -1), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", i, n, o, t, -1, 0)) : 3 == s ? ($("#turmas").attr("disabled", !0), $("#turmas").empty().html('<option value="0">Sem Turmas</option>'), $("#listaCarteirinha").empty().html(e.msg)) : $("#turmas").empty().html('<option value="n/a">' + e.msg + "</option>")
                },
                error: function(e) {
                    console.log(e.responseText), $("#turmas").empty().html('<option value="n/a">Erro</option>')
                }
            })
        }), $("#turmas").live("change", function(e) {
            $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
            var t = $("#intAnoSerie").val(),
                o = $("#nivelEnsino").val(),
                i = "",
                n = "";
            i = $("#escolaRede").size() > 0 ? $("#escolaRede").val() : 0, n = $("#unidades").size() > 0 ? $("#unidades").val() : 0;
            var s = $(this).val();
            idLoadedGlobal = !1, todosUsers = !1, 0 == i && (i = -1), 0 == n && (n = -1), FiltrarTurmaCompletoMenu("#ava_contentlista", a, "", i, n, o, t, s, 0)
        })
    }) : $.getJSON(e, null, function(e) {
        var a = null;
        a = e.Result, GlobalPaginacaoContador = Object.keys(a).length, xmlGlobal = a, $("#myContentTemplate").tmpl(e).appendTo("#ava_contentlista"), $("#ava_contentlista #ava_loader").css("display", "none")
    })
}

function FiltrarTurmaCompletoMenu(e, a, t, o, i, n, s, l, d) {
    if ($(e).html(""), t) {
        var u = !1;
        for (r = 0; r < a.length; r++)
            if ((a[r].strNome.toLowerCase().indexOf(t.toLowerCase()) > -1 || a[r].strApelido.toLowerCase().indexOf(t.toLowerCase()) > -1 || retira_acentos(a[r].strNome).toLowerCase().indexOf(t.toLowerCase()) > -1 || retira_acentos(a[r].strApelido).toLowerCase().indexOf(t.toLowerCase()) > -1) && a[r].id != o) {
                u = !0;
                var c = "";
                c = populaFiltroTurma(a[r]), $(e).append(strBuilder)
            }
        if (!u) {
            $(e).html('<span class="letter-spacing">Nenhum resultado encontrado.</span>')
        }
    } else if ("" == t && -1 == o && -1 == i && -1 == n && -1 == s && -1 == l && 0 == d)
        for (r = 0; r < a.length; r++) {
            var c = "";
            a[r].id != o && (c = populaFiltroTurma(a[r]), $(e).append(strBuilder))
        } else
            for (r = 0; r < a.length; r++) {
                var c = "";
                (-1 == o || -1 != o && a[r].idEscola == o) && (0 == i || -1 == i || -1 != i && a[r].idUnidade == i) && (-1 == n || -1 != n && a[r].idCurso == n) && (-1 == s || -1 != s && a[r].idSerie == s) && (-1 == l || -1 != l && a[r].id == l) && ((0 == d || 0 != d && a[r].idMinhaTurma > 0) && (c = populaFiltroTurma(a[r])), $(e).append(c), xmlGlobalFiltroTurmas = c)
            }
}

function populaFiltroTurma(e) {
    return strBuilder = '<a href="' + e.UrlGrupo + '">', strBuilder += '<div class="carteirinha turma" id="cart_' + e.id + '" title="' + e.strNome + '"><div class="in_cT">', e.strNome.lenght > 10 ? strNome = e.strNome.substring(0, 9) : strNome = e.strNome, strBuilder += '<img src="' + e.strFoto + '" /><span>' + strNome + "</span>", strBuilder += "</div></div></a>", strBuilder
}

function retornaProcurarPessoas() {
    $("#abrebuscapessoas").attr("href", "/AVA/Barras/Home/RetornaViewBuscaPessoas/");
    var e = $("#abrebuscapessoas"),
        a = {
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
                $("#main_ava").hide(), $("#ava_contentbuscapessoas #ava_loader").css("display", "none"), $("#txtPesquisaGeralAva").live("focus", function() {
                    "Procurar por nome" == $(this).val() && $(this).val("")
                }), $("#txtPesquisaGeralAva").live("blur", function() {
                    "" == $(this).val() && $(this).val("Procurar por nome")
                }), $("#buscarpessoas").bind("click", function() {
                    "" == $("#txtPesquisaGeralAva").val() || "Procurar por nome" == $("#txtPesquisaGeralAva").val() ? alert("Informe o nome a ser pesquisado") : jaClicouNoBuscar || (GlobalResultsBuscaPessoas = "", GlobalTotalResultsBuscaPessoas = 0, GlobalPaginacaoModalInicio = 1, GlobalPaginacaoModalFim = 12, idLoadedGlobal = !1, $.fancybox.showLoading(), $("#ava_contentbuscapessoas #msgInicio").css("display", "none"), $campo = $("#txtPesquisaGeralAva").val(), jaClicouNoBuscar = !0, ("" != $campo || "Procurar por nome" != $campo) && ($("#ava_contentbuscapessoas div").remove(), $urlBuscaPessoas = "/AVA/Barras/Home/PesquisaGeral/", $.fancybox.showLoading(), $.ajax({
                        dataType: "json",
                        type: "post",
                        url: $urlBuscaPessoas,
                        cache: !1,
                        data: {
                            busca: $campo
                        },
                        success: function(e) {
                            GlobalResultsBuscaPessoas = e.Result, GlobalTotalResultsBuscaPessoas = Object.keys(e.Result).length, GlobalTotalResultsBuscaPessoas < 12 ? totalExibidos = GlobalTotalResultsBuscaPessoas : totalExibidos = GlobalPaginacaoModalFim, xml = GlobalResultsBuscaPessoas, teste = xml.slice(0, 12), teste2 = {
                                Result: teste
                            }, 0 == GlobalTotalResultsBuscaPessoas ? $("#exibe_resultado_combo").html("<p>Nenhum resultado encontrado.</p>") : $("#exibe_resultado_combo").html("<p>Exibindo resultado de busca para <strong>" + $campo + "</strong> - " + totalExibidos + " de " + GlobalTotalResultsBuscaPessoas + "</p>"), $("#myContentTemplate").tmpl(teste2).appendTo("#ava_contentbuscapessoas"), $.fancybox.hideLoading(), $(".ava_lightcontent").scroll(function() {
                                !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= $(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop && (idLoadedGlobal = !0, $.fancybox.showLoading(), xml = GlobalResultsBuscaPessoas, GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio - 1 + 12, GlobalPaginacaoModalFim = GlobalPaginacaoModalFim - 1 + 12, totalExibidos = GlobalPaginacaoModalFim + 1, totalExibidos > GlobalTotalResultsBuscaPessoas && (totalExibidos = GlobalTotalResultsBuscaPessoas), $.fancybox.showLoading(), teste = xml.slice(GlobalPaginacaoModalInicio, GlobalPaginacaoModalFim), teste2 = {
                                    Result: teste
                                }, $("#exibe_resultado_combo").html("<p>Exibindo resultado de busca para <strong>" + $campo + "</strong> - " + totalExibidos + " de " + GlobalTotalResultsBuscaPessoas + "</p>"), $("#myContentTemplate").tmpl(teste2).appendTo("#ava_contentbuscapessoas"), $.fancybox.hideLoading(), (GlobalPaginacaoModalFim + 12 < GlobalTotalResultsBuscaPessoas || GlobalPaginacaoModalFim + 12 < GlobalTotalResultsBuscaPessoas + 12) && (idLoadedGlobal = !1))
                            })
                        },
                        error: function(e) {
                            console.debug(e), jaClicouNoBuscar = !1
                        }
                    }), jaClicouNoBuscar = !1))
                }), $("#txtPesquisaGeralAva").bind("keypress", function(e) {
                    13 == e.keyCode && (e.preventDefault(), $("#buscarpessoas").trigger("click"))
                })
            },
            helpers: {
                overlay: {
                    locked: !1
                }
            }
        };
    lightBoxAVA(e, a)
}

function retornaProcurarProfessoresAluno(e) {
    strUsuarioFiltro = e, $(".vertodoseducadoresMenu").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=1");
    var a = $(".vertodoseducadoresMenu"),
        t = {
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
                $("#main_ava").hide(), $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + e + "&strLogin=" + e + "&idTurma=", retornaJsonMenu($urlEducCompleto), $(".ava_lightcontent").scroll(function() {
                    12 == GlobalPaginacaoContador && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= $(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop && (idLoadedGlobal = !0, GlobalPaginacaoModalInicio += 12, GlobalPaginacaoModalFim += 12, $.fancybox.showLoading(), $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + e + "&strLogin=" + e + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim, retornaJsonMenu($urlEducCompleto, "scrollMode"))
                }), filtrarPessoasMenu()
            },
            helpers: {
                overlay: {
                    locked: !1
                }
            }
        };
    lightBoxAVA(a, t), $(".aes1 header h1 .thumbs_lists").click(function(e) {
        e.preventDefault(), $strClass = $(".aes1 ul").attr("class"), "clearfix thumbs" == $strClass ? ($(".aes1 ul").attr("class", "clearfix"), $(".aes1 ul li").prepend('<div class="white_shadow"></div>'), $(this).attr("class", "thumbs_lists lists")) : ($(".aes1 ul").attr("class", "clearfix thumbs"), $(".aes1 ul li").find("div").remove(), $(this).attr("class", "thumbs_lists thumbs"))
    })
}

function filtrarPessoasMenu() {
    $("#filtrarPessoas").on("click", function() {
        $pesquisa = $("#txtFiltroAva").val(), $id = $("#idAux").val(), $tipo = $("#tipo").val(), "" == $pesquisa || "Pesquisar por nome" == $pesquisa ? alert("Informe um nome para pesquisa") : ($.fancybox.showLoading(), $.ajax({
            type: "POST",
            url: "/AVA/Barras/Home/PesquisaPorNome?id=" + $id + "&busca=" + $pesquisa + "&tipo=" + $tipo,
            async: !0,
            success: function(e) {
                xml = e.Result, $totalResults = Object.keys(xml).length, removeCarteirinhasMenu("ava_contentlista"), $totalResults > 0 ? ($mensagem = "<p>Exibindo " + $totalResults + " resultados de busca para <strong>" + $pesquisa + "</strong></p>", $("#exibe_resultado_combo p").remove(), $("#exibe_resultado_combo").prepend($mensagem), $("#voltarListaPesquisa").show(), $("#myContentTemplate").tmpl(e).appendTo("#ava_contentlista"), idLoadedGlobal = !0, $.fancybox.hideLoading(), $(".limpa_pesquisa").show()) : ($("#exibe_resultado_combo p").remove(), $("#exibe_resultado_combo").prepend("<p>Nenhum resultado encontrado.</p>"), $("#voltarListaPesquisa").show(), $(".limpa_pesquisa").show(), $.fancybox.hideLoading())
            },
            error: function(e) {
                $("#ava_contentlista").append("<div class='letter-spacing'>Erro ao pesquisar pessoas.</div>")
            }
        }))
    })
}

function removeCarteirinhasMenu(e) {
    $("#" + e + " .carteirinha").each(function() {
        $(this).remove()
    })
}

function linkSecretaria() {
    var e = location.pathname.toLowerCase(),
        a = e.endsWith("mural") || e.endsWith("mural/") || e.endsWith("mural/home") || e.endsWith("mural/home/") || e.endsWith("mural/home/index") || e.endsWith("mural/home/index/"),
        t = e.endsWith("mural/home/avinha") || e.endsWith("mural/home/avinha/");
    if (a || t || (window.location.href = "/AVA/Mural/?menuSecretaria=True"), a) return $("#menu_secretaria").is(":visible") && clickBloco("#menu_secretaria", ".bloco_secretaria"), void $("#main_ava").hide();
    if (t) {
        $("#main_ava").hide();
        var o = $(this);
        $.ajax({
            url: "/AVA/Barras/Home/Secretaria/",
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: !1,
            success: function(e) {
                $("#ava_mural_geral").html(e), $(".loader").css("display", "none"), $.ajax({
                    url: "/rede/barra_secretaria_ava001.asp",
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    cache: !1,
                    success: function(e) {
                        document.getElementById("div_cont_secre").innerHTML = e, $("ul.css-tabs").fpTabs("div.css-panes > div"), $("#dadosPerfil ul li").removeClass("current"), o.parent().addClass("current"), $("#tabs").tabs(), $("#accordion").accordion()
                    },
                    error: function(e) {
                        console.debug(e.status)
                    }
                }), bloco.find(".loader").hide(), bloco.find("#div_cont_secre").empty(), bloco.find("#div_cont_secre").append(e)
            },
            error: function(e) {
                alert(e.status)
            }
        })
    }
}

function linkAdministracao() {
    var e = location.pathname.toLowerCase(),
        a = e.endsWith("mural") || e.endsWith("mural/") || e.endsWith("mural/home") || e.endsWith("mural/home/") || e.endsWith("mural/home/index") || e.endsWith("mural/home/index/") || e.endsWith("mural/home/avinha") || e.endsWith("mural/home/avinha/");
    if (a || (window.location.href = "/AVA/Mural/?menuAdministracao=True"), a) {
        var t = $(this);
        $.ajax({
            url: "/AVA/Barras/Home/Administracao/",
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            cache: !1,
            success: function(e) {
                $("#ava_mural_geral").html(e), $.ajax({
                    url: "/rede/barra_administracao_ava001.asp",
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                    cache: !1,
                    success: function(e) {
                        document.getElementById("div_cont_administra").innerHTML = e, $("ul.css-tabs").fpTabs("div.css-panes > div"), $("#dadosPerfil ul li").removeClass("current"), t.parent().addClass("current"), $("#tabs").tabs(), $("#accordion").accordion()
                    },
                    error: function(e) {
                        console.debug(e.status)
                    }
                })
            },
            error: function(e) {
                console.debug(e.status)
            }
        })
    }
}

function mostraSecretaria(e) {
    $.ajax({
        url: "/rede/secretaria_json.asp",
        async: !1,
        cache: !1,
        success: function(a) {
            if ($.get("/include/barra_logados/inc_esc_1.asp", function(a) {
                    e.append(a)
                }), "" != a.include && $.get(a.include, function(a) {
                    e.append(a)
                }), a.filho.length > 0) {
                e.find(".sct_abas li").eq(1).show(), objCombo = e.find(".sct_abas li").eq(1).find("ul"), objCombo.html(""), e.find("#tabs-2 .css-panes").html("");
                var t = 0;
                $.each(a.filho, function(a, o) {
                    0 == a ? (objCombo.append('<div class="filho_selecionado" title= "' + o.Nome + '"><img src="' + o.Thumb + '" >' + o.Nome + "</div>"), objCombo.append('<li class="ativo" data-ix="' + a + '" title= "' + o.Nome + '"><img src="' + o.Thumb + '">' + o.Nome + "</li>"), e.find("#tabs-2 .css-panes").append('<ul id="tab_filho' + a + '"></ul>')) : (objCombo.append('<li data-ix="' + a + '" title= "' + o.Nome + '"><img src="' + o.Thumb + '">' + o.Nome + "</li>"), e.find("#tabs-2 .css-panes").append('<ul id="tab_filho' + a + '" style="display:none" ></ul>')), o.ferramenta.sort(function(e, a) {
                        return e.Nome.localeCompare(a.Nome)
                    }), $.each(o.ferramenta, function(t, o) {
                        e.find("#tabs-2 #tab_filho" + a).append('<li><a title = "' + o.Nome + '" href="' + o.Path + '" ><span class="secre_desc">' + o.Nome + "</span></a></li>")
                    }), t++
                }), 1 == t && e.find(".sct_abas ul").addClass("unico"), e.find(".sct_abas li").eq(1).find("li").click(function(a) {
                    $(this).parent().find("li").removeClass("ativo"), $(this).addClass("ativo"), $(this).parent().find("div").html($(this).html()), $(this).parent().removeClass("open"), e.find(".sct_abas li").eq(1).find("div").attr("title", $(this).text()), e.find("#tabs-2 .css-panes ul").hide(), e.find("#tabs-2 .css-panes").find("#tab_filho" + $(this).attr("data-ix")).show()
                }), e.find(".sct_abas ul").mouseover(function(e) {
                    $(this).addClass("open")
                }), e.find(".sct_abas ul").mouseleave(function(e) {
                    $(this).removeClass("open")
                })
            } else e.find(".sct_abas li").eq(1).hide();
            a.ferramenta.length > 0 ? (e.find(".sct_abas li").eq(0).show(), e.find(".sct_abas li").eq(1).removeClass("ativo"), e.find(".sct_abas li").eq(0).addClass("ativo"), e.find("#tabs-1 ul").html(""), a.ferramenta.sort(function(e, a) {
                return e.Nome.localeCompare(a.Nome)
            }), $.each(a.ferramenta, function(a, t) {
                e.find("#tabs-1 ul").append('<li><a title = "' + t.Nome + '" href="' + t.Path + '"><span class="secre_desc">' + t.Nome + "</span></a></li>")
            }), e.find("#tabs-2").hide(), e.find("#tabs-1").show(), e.find(".sct_abas li").eq(1).find("ul").hide()) : e.find(".sct_abas li").eq(0).hide()
        }
    }), e.find(".sct_abas li").eq(0).click(function() {
        e.find(".sct_abas li").eq(1).find("ul").hide(), e.find(".sct_abas li").eq(1).removeClass("ativo"), e.find(".sct_abas li").eq(0).addClass("ativo"), e.find("#tabs-2").hide(), e.find("#tabs-1").show()
    }), e.find(".sct_abas li").eq(1).click(function() {
        e.find(".sct_abas li").eq(1).find("ul").show(), e.find(".sct_abas li").eq(0).removeClass("ativo"), e.find(".sct_abas li").eq(1).addClass("ativo"), e.find("#tabs-1").hide(), e.find("#tabs-2").show()
    })
}
var idUsuarioCript = "",
    bolVideoProibido = !1,
    strTipoVideo = "",
    GlobalPaginacaoModalInicio = 1,
    GlobalPaginacaoModalFim = 12,
    idLoadedGlobal = !1,
    strUsuarioFiltro = "";
jQuery(function(e) {
    "undefined" != typeof idUsuarioCriptTL && null != idUsuarioCriptTL && "" != idUsuarioCriptTL && (idUsuarioCript = idUsuarioCriptTL), e(document).ajaxComplete(function(e, a, t) {
        var o = a.responseText;
        "abort" != a.statusText && o.indexOf("LoginMaster.js", 1) > 0 && (window.top.location = "/AVA/Login/Home/Restrito")
    });
    var a = location.href.toLowerCase(); - 1 != a.indexOf("/perfil/home/index/") && e("#lista_atividades").hide(), e("body").on("click", "#voltarListaPesquisa", function(a) {
        var t = location.pathname.toLowerCase(),
            o = t.endsWith("mural") || t.endsWith("mural/") || t.endsWith("mural/home") || t.endsWith("mural/home/") || t.endsWith("mural/home/index") || t.endsWith("mural/home/index/") || t.endsWith("mural/home/avinha") || t.endsWith("mural/home/avinha/");
        o || ($id = e(this).attr("idItem"), $tipo = e(this).attr("idTipo"), e("#txtFiltroAva").val("Pesquisar por nome"), removeCarteirinhasMenu("ava_contentlista"), e(".limpa_pesquisa").hide(), GlobalPaginacaoModalInicio = 1, GlobalPaginacaoModalFim = 12, GlobalPaginacaoContador = 0, idLoadedGlobal = !1, e.fancybox.showLoading(), retornaJsonMenu("/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + strUsuarioFiltro + "&strLogin=" + strUsuarioFiltro + "&idTurma="), e.fancybox.hideLoading())
    }), e("body").on("focusin", "#txtFiltroAva", function(a) {
        "Pesquisar por nome" == e(this).val() && e(this).val("")
    }), e("body").on("focusout", "#txtFiltroAva", function(a) {
        "" == e(this).val() && e(this).val("Pesquisar por nome")
    })
});
var jaClicouNoBuscar = !1;