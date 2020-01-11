
var contFile = 8000;
var contImg = 2000;


function montarContainerGrupo(a, o) {
    var e = $("<div />").addClass("itensGrupo").addClass(o);
    "descubra_novos_grupos" == o && e.addClass("descubra"), e.hide();
    var r = $("<h2 />"),
        i = $("<span />").text(a),
        t = $("<span />").addClass("linha_titulo").width("811px"),
        n = $("<a />").addClass("carregarMais").attr("href", "javascript:void(0);").text("Carregar mais grupos"),
        s = $("<span />").addClass("FontAwesome"),
        c = $("<span />").addClass("clearfix");
    n.prepend(s), r.append(i), r.append(t), e.append(r), e.append(n), e.append(c), $("#ava_container #wrapper").append(e)
}

function carregarGrupo(a, o) {
    var e = "",
        r = 0,
        i = 0,
        t = "";
    "convite_pendente" == a ? (t = "convitePendente", e = "getMeusGruposConvitesPendentes", r = 1, i = 7) : "moderado_por_voce" == a ? (t = "modera", e = "getMeusGruposModerados", r = 1, i = 7) : "voce_participa" == a ? (t = "participa", e = "getGruposParticipo", r = 1, i = 7) : "descubra_novos_grupos" == a && (t = "descubraNovosGrupos", e = "getGruposNovos", r = 1, i = 9), $.ajax({
        url: "/ava/grupo/home/" + e,
        type: "POST",
        dataType: "json",
        data: {
            strGrupo: "",
            intInicio: r,
            intFim: i
        },
        success: function(a) {
            processarJsonRetornoGrupos(a, t), void 0 !== a && "" != a && null != a.grupos && a.grupos.length > 0 ? o.show() : o = null, QtdAjaxGrupos.intCarregou++, QtdAjaxGrupos.intCarregou == QtdAjaxGrupos.intQtd && $.fancybox.hideLoading()
        },
        error: function(a) {
            console.log(a.responseText), QtdAjaxGrupos.intCarregou++, QtdAjaxGrupos.intCarregou == QtdAjaxGrupos.intQtd && $.fancybox.hideLoading()
        }
    })
}

function carregarMaisGrupos(a) {
    a.preventDefault();
    var o = 0,
        e = "",
        r = "",
        i = "",
        t = 0,
        n = 0;
    0 == selecionados.length && selecionados.push(1), 1 == selecionados[0] ? (strTipo = "1,2", strEstado = "1") : 2 == selecionados[0] ? (strTipo = "1,2", strEstado = "1") : 3 == selecionados[0] ? (strTipo = "1,2", strEstado = "1") : 4 == selecionados[0] ? (strTipo = "1,2", strEstado = "1") : 5 == selecionados[0] ? (strTipo = "1", strEstado = "1") : 6 == selecionados[0] ? (strTipo = "2", strEstado = "1") : 7 == selecionados[0] && (strTipo = "1,2", strEstado = "2,3"), $(this).closest(".itensGrupo").hasClass("moderado_por_voce") ? (e = $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").html(), $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").text("Aguarde ..."), $("#ava_wrap #ava_container .itensGrupo.moderado_por_voce .carregarMais").unbind(tpClickGrupo, carregarMaisGrupos), r = "modera", i = "/ava/grupo/home/getMeusGruposModerados", o = parseInt($("#ava_container .itensGrupo.moderado_por_voce > div").size()), t = o + 1, n = t + 8) : $(this).closest(".itensGrupo").hasClass("voce_participa") ? (e = $("#ava_container .itensGrupo.voce_participa .carregarMais").html(), $("#ava_container .itensGrupo.voce_participa .carregarMais").text("Aguarde ..."), $("#ava_wrap #ava_container .itensGrupo.voce_participa .carregarMais").unbind(tpClickGrupo, carregarMaisGrupos), r = "participa", i = "/ava/grupo/home/getGruposParticipo", o = parseInt($("#ava_container .itensGrupo.voce_participa > div").size()), t = o + 1, n = t + 8) : $(this).closest(".itensGrupo").hasClass("convite_pendente") ? (e = $("#ava_container .itensGrupo.convite_pendente .carregarMais").html(), $("#ava_container .itensGrupo.convite_pendente .carregarMais").text("Aguarde ..."), $("#ava_wrap #ava_container .itensGrupo.convite_pendente .carregarMais").unbind(tpClickGrupo, carregarMaisGrupos), r = "convitePendente", i = "/ava/grupo/home/getMeusGruposConvitesPendentes", o = parseInt($("#ava_container .itensGrupo.convite_pendente > div").size()), t = o + 1, n = t + 8) : $(this).closest(".itensGrupo").hasClass("desativados") ? (e = $("#ava_container .itensGrupo.desativados .carregarMais").html(), $("#ava_container .itensGrupo.desativados .carregarMais").text("Aguarde ..."), $("#ava_wrap #ava_container .itensGrupo.desativados .carregarMais").unbind(tpClickGrupo, carregarMaisGrupos), r = "desativados", i = "/ava/grupo/home/getGruposDesativados", o = parseInt($("#ava_container .itensGrupo.desativados > div").size()), t = o + 1, n = t + 8) : $(this).closest(".itensGrupo").hasClass("descubra_novos_grupos") && (e = $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").html(), $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").text("Aguarde ..."), $("#ava_wrap #ava_container .itensGrupo.descubra_novos_grupos .carregarMais").unbind(tpClickGrupo, carregarMaisGrupos), r = "descubraNovosGrupos", i = "/ava/grupo/home/getGruposNovos", o = parseInt($("#ava_container .itensGrupo.descubra_novos_grupos > div").size()), t = o + 1, n = t + 9), "descubraNovosGrupos" == r ? ("" == strTermoGrupoNovos && (strTipo = "1,2", strEstado = "1"), $.fancybox.showLoading(), $.ajax({
        url: i,
        type: "POST",
        dataType: "json",
        data: {
            strGrupo: strTermoGrupoNovos,
            strTipo: strTipo,
            strEstado: strEstado,
            intInicio: t,
            intFim: n
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            processarJsonRetornoGrupos(a, r, e), $.fancybox.hideLoading()
        },
        error: function(a) {
            console.log(a.responseText), $.fancybox.hideLoading()
        }
    })) : ($.fancybox.showLoading(), $.ajax({
        url: i,
        type: "POST",
        dataType: "json",
        data: {
            strGrupo: strTermoGrupo,
            strTipo: strTipo,
            strEstado: strEstado,
            intInicio: t,
            intFim: n
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(a) {
            processarJsonRetornoGrupos(a, r, e), $.fancybox.hideLoading()
        },
        error: function(a) {
            console.log(a.responseText), $.fancybox.hideLoading()
        }
    }))
}

function resetarPesquisa() {
    strTermoGrupo = "", $("#txtPesquisaGrupo").val(""), $(".bootstrap input[name='filtroGrupo'][type='radio'][value='1']").trigger("click"), $("#btnPesquisarGrupo").trigger("click")
}

function processarJsonRetornoGrupos(a, o, e) {
    var r = a;
    if (void 0 !== r && "" != r && null != r.grupos) {
        if ("modera" == o) {
            $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").hide();
            var i = r.grupos.length,
                t = 0;
            t = 9 == i ? i - 1 : i;
            for (var n = 0; t > n; n++) montaCarteirinhaHomeGrupo(r.grupos[n], o);
            9 == i ? ($("#ava_container .itensGrupo.moderado_por_voce .carregarMais").insertAfter("#ava_container .itensGrupo.moderado_por_voce > div:last"), $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").show(), "undefined" != typeof e && $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").html(e), $("#ava_wrap #ava_container .itensGrupo.moderado_por_voce .carregarMais").bind(tpClickGrupo, carregarMaisGrupos)) : ("undefined" != typeof e && $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").html(e), $("#ava_wrap #ava_container .itensGrupo.moderado_por_voce .carregarMais").bind(tpClickGrupo, carregarMaisGrupos))
        } else if ("participa" == o) {
            $("#ava_container .itensGrupo.voce_participa .carregarMais").hide();
            var i = r.grupos.length,
                t = 0;
            t = 9 == i ? i - 1 : i;
            for (var n = 0; t > n; n++) montaCarteirinhaHomeGrupo(r.grupos[n], o);
            9 == i ? ($("#ava_container .itensGrupo.voce_participa .carregarMais").insertAfter("#ava_container .itensGrupo.voce_participa > div:last"), $("#ava_container .itensGrupo.voce_participa .carregarMais").show(), "undefined" != typeof e && $("#ava_container .itensGrupo.voce_participa .carregarMais").html(e), $("#ava_wrap #ava_container .itensGrupo.voce_participa .carregarMais").bind(tpClickGrupo, carregarMaisGrupos)) : ("undefined" != typeof e && $("#ava_container .itensGrupo.voce_participa .carregarMais").html(e), $("#ava_wrap #ava_container .itensGrupo.voce_participa .carregarMais").bind(tpClickGrupo, carregarMaisGrupos))
        } else if ("convitePendente" == o) {
            $("#ava_container .itensGrupo.convite_pendente .carregarMais").hide();
            var i = r.grupos.length,
                t = 0;
            t = 9 == i ? i - 1 : i;
            for (var n = 0; t > n; n++) montaCarteirinhaHomeGrupo(r.grupos[n], o);
            9 == i ? ($("#ava_container .itensGrupo.convite_pendente .carregarMais").insertAfter("#ava_container .itensGrupo.convite_pendente > div:last"), $("#ava_container .itensGrupo.convite_pendente .carregarMais").show(), "undefined" != typeof e && $("#ava_container .itensGrupo.convite_pendente .carregarMais").html(e), $("#ava_wrap #ava_container .itensGrupo.convite_pendente .carregarMais").bind(tpClickGrupo, carregarMaisGrupos)) : ("undefined" != typeof e && $("#ava_container .itensGrupo.convite_pendente .carregarMais").html(e), $("#ava_wrap #ava_container .itensGrupo.convite_pendente .carregarMais").bind(tpClickGrupo, carregarMaisGrupos))
        } else if ("desativados" == o) {
            $("#ava_container .itensGrupo.desativados .carregarMais").hide();
            var i = r.grupos.length,
                t = 0;
            t = 9 == i ? i - 1 : i;
            for (var n = 0; t > n; n++) montaCarteirinhaHomeGrupo(r.grupos[n], o);
            9 == i ? ($("#ava_container .itensGrupo.desativados .carregarMais").insertAfter("#ava_container .itensGrupo.desativados > div:last"), $("#ava_container .itensGrupo.desativados .carregarMais").show(), "undefined" != typeof e && $("#ava_container .itensGrupo.desativados .carregarMais").html(e), $("#ava_wrap #ava_container .itensGrupo.desativados .carregarMais").bind(tpClickGrupo, carregarMaisGrupos)) : ("undefined" != typeof e && $("#ava_container .itensGrupo.desativados .carregarMais").html(e), $("#ava_wrap #ava_container .itensGrupo.desativados .carregarMais").bind(tpClickGrupo, carregarMaisGrupos))
        } else if ("descubraNovosGrupos" == o) {
            $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").hide();
            var i = r.grupos.length,
                t = 0;
            t = 10 == i ? i - 1 : i;
            for (var n = 0; t > n; n++) montaCarteirinhaHomeGrupo(r.grupos[n], o);
            10 == i ? ($("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").insertAfter("#ava_container .itensGrupo.descubra_novos_grupos > div:last"), $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").show(), "undefined" != typeof e && $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").html(e), $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").bind(tpClickGrupo, carregarMaisGrupos)) : ("undefined" != typeof e && $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").html(e), $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").bind(tpClickGrupo, carregarMaisGrupos))
        }
    } else "modera" == o ? $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").hide() : "participa" == o ? $("#ava_container .itensGrupo.voce_participa .carregarMais").hide() : "convitePendente" == o ? $("#ava_container .itensGrupo.convite_pendente .carregarMais").hide() : "desativados" == o ? $("#ava_container .itensGrupo.desativados .carregarMais").hide() : "descubraNovosGrupos" == o && $("#ava_container .itensGrupo.descubraNovosGrupos .carregarMais").hide()
}

function recursividade(a, o, e, r) {
    if (o > e) {
        var i = montaCarteirinhaHomeGrupo(a[e], r);
        i.slideDown("fast", function() {
            recursividade(a, o, ++e, r)
        })
    } else {
        if ("modera" == r) return $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").insertAfter("#ava_container .itensGrupo.moderado_por_voce > div:last"), void $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").slideDown("fast");
        if ("participa" == r) return $("#ava_container .itensGrupo.voce_participa .carregarMais").insertAfter("#ava_container .itensGrupo.voce_participa > div:last"), void $("#ava_container .itensGrupo.voce_participa .carregarMais").slideDown("fast");
        if ("convitePendente" == r) return $("#ava_container .itensGrupo.convite_pendente .carregarMais").insertAfter("#ava_container .itensGrupo.convite_pendente > div:last"), void $("#ava_container .itensGrupo.convite_pendente .carregarMais").slideDown("fast");
        if ("desativados" == r) return $("#ava_container .itensGrupo.desativados .carregarMais").insertAfter("#ava_container .itensGrupo.desativados > div:last"), void $("#ava_container .itensGrupo.desativados .carregarMais").slideDown("fast");
        if ("descubraNovosGrupos" == r) return $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").insertAfter("#ava_container .itensGrupo.descubra_novos_grupos > div:last"), void $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").slideDown("fast")
    }
}

function montaCarteirinhaHomeGrupo(a, o) {
    var e = $("<div />");
    (2 == a.idEstado || 3 == a.idEstado) && e.addClass("grupo_inativo");
    var r = $("<img />");
    "descubraNovosGrupos" == o ? r.attr("height", 120).attr("width", 120).attr("src", void 0 !== a.strFoto && null != a.strFoto && "" != a.strFoto ? a.strFoto : "/imagens/templates/2010/avatar_turma_grande.gif") : r.attr("height", 79).attr("width", 79).attr("src", void 0 !== a.strFoto && null != a.strFoto && "" != a.strFoto ? a.strFoto : "/imagens/templates/2010/avatar_turma_grande.gif");
    var i = $("<div />").addClass("infoGrupo"),
        t = $("<h3 />"),
        n = $("<a />").attr("href", "/ava/grupo/home/perfilgrupo/" + a.strLinkPermanente).text(a.strNome),
        s = $("<div />").addClass("statusLista"),
        c = "";
    c = 0 == parseInt(a.qtdParticipante) ? "Sem participante" : 1 == parseInt(a.qtdParticipante) ? a.qtdParticipante + " participante" : (a.qtdParticipante > 99 ? "+99" : a.qtdParticipante) + " participantes";
    var p = $("<p />").text(c);
    if (t.append(n), i.append(t), s.append(p), 1 == parseInt(a.idTipo)) {
        var d = $("<div />").addClass("tag").text("Portal");
        e.append(d)
    }
    e.append(r), e.append(i), e.append(s), "modera" == o ? ((2 == a.idEstado || 3 == a.idEstado) && e.append('<div class="icon_inativo"><div class="tip_acoes">Desativado<span class="seta_p"></span></div><span class="FontAwesome"></span></div>'), $(".itensGrupo.moderado_por_voce > span").before(e)) : "participa" == o ? $(".itensGrupo.voce_participa > span").before(e) : "convitePendente" == o ? $(".itensGrupo.convite_pendente > span").before(e) : "descubraNovosGrupos" == o ? $(".itensGrupo.descubra_novos_grupos > span:last").before(e) : "desativados" == o && (e.append('<div class="icon_inativo"><div class="tip_acoes">Desativado<span class="seta_p"></span></div><span class="FontAwesome"></span></div>'), $(".itensGrupo.desativados > span:last").before(e))
}

function salvarGrupo(a) {
    var o = "",
        e = "",
        r = "",
        i = "",
        t = "",
        n = 2,
        s = !1;
    if ($("div.publico").hasClass("config_ativo")) {
        o = $("#txlNomeGrupoPublico").val(), e = $("#txtDescricaoGrupoPublico").val(), r = $("input:radio[name=rbAdesaoPublico]:checked").val();
        var c = $("input:checkbox[name='cbPublico']:checked").length - 1;
        $("input:checkbox[name='cbPublico']:checked").each(function(a) {
            c == a ? i += $(this).val() : i = i + $(this).val() + ","
        }), s = !0
    } else o = $("#txlNomeGrupoPrivado").val(), e = $("#txtDescricaoGrupoPrivado").val(), r = $("input:radio[name=rbAdesaoPrivado]:checked").val(), s = !1;
    return "" == o ? (jAlert("Nome &eacute; obrigat&oacute;rio.", ""), !1) : void $.ajax({
        url: "/AVA/Grupo/Home/MontaLinkPermanente",
        data: {
            strInput: o,
            idGrupo: a
        },
        success: function(c) {
            t = c, $.ajax({
                url: "/AVA/Grupo/Home/InserirGrupo",
                type: "POST",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {
                    idGrupo: a,
                    strNomeGrupo: o,
                    strDescricaoGrupo: e,
                    strLink: c,
                    idTipo: n,
                    bolPublico: s,
                    idEstado: 1,
                    idAdesao: r,
                    strPublicoPotencial: i
                },
                success: function(a) {
                    "erro" == a ? jAlert("Erro ao criar o grupo.", "") : window.location = "/AVA/Grupo/Home/PerfilGrupo/" + a
                },
                error: function(a) {
                    jAlert("Erro ao criar o grupo.", "")
                }
            })
        },
        error: function(a) {
            jAlert("Erro ao montar link permanente do grupo.", "")
        }
    })
}

function salvarEdicaoGrupo(a) {
    var o = "",
        e = "",
        r = "",
        i = "",
        t = "",
        n = !1;
    if ($("input:radio[name=rbEstadoGrupo]").each(function() {
            $(this).is(":checked") && (t = parseInt($(this).val()))
        }), o = $("#txtNomeGrupoPublico").val(), e = $("#txtDescricaoGrupoPublico").val(), "True" == $("#bolPublico").val()) {
        r = $("input:radio[name=rbAdesaoPublico]:checked").val();
        var s = $("input:checkbox[name='cbPublico']:checked").length - 1;
        $("input:checkbox[name='cbPublico']:checked").each(function(a) {
            s == a ? i += $(this).val() : i = i + $(this).val() + ","
        }), n = !0
    } else r = $("input:radio[name=rbAdesaoPrivado]:checked").val();
    return "" == o ? (jAlert("Nome &eacute; obrigat&oacute;rio.", ""), !1) : void $.ajax({
        url: "/AVA/Grupo/Home/InserirGrupo",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            idGrupo: a,
            strNomeGrupo: o,
            strDescricaoGrupo: e,
            strLink: $("#strLink").val(),
            idTipo: $("#idTipo").val(),
            bolPublico: n,
            idEstado: t,
            idAdesao: r,
            strPublicoPotencial: i
        },
        success: function(a) {
            "erro" == a ? jAlert("Erro ao editar o grupo.", "") : window.location = "/AVA/Grupo/Home/PerfilGrupo/" + a
        },
        error: function(a) {
            jAlert("Erro ao editar o grupo.", "")
        }
    })
}

function verMaisGrupos(a) {
    _this = $(this), _this.removeAttr("href"), a.preventDefault(), $("#btCarregaMaisGrupos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    var o = "",
        e = $("#txtGrupo").val(),
        r = $("input:checkbox[name='cbTipoGrupoFiltro']:checked").length - 1;
    $("input:checkbox[name='cbTipoGrupoFiltro']:checked").each(function(a) {
        r == a ? o += $(this).val() : o = o + $(this).val() + ","
    }), $.post("/AVA/Grupo/Home/ListarGruposDisponiveis?strGrupo=" + e + "&strTipo=" + o + "&intInicio=" + intInicioGrupo, function(a) {
        if (a.indexOf("semGrupos") > -1) $("#btCarregaMaisGrupos").hide();
        else if (a.indexOf("poucoGrupo") > 0) {
            var o = a.indexOf("poucoGrupo"),
                e = a.substring(0, o);
            $("#boxCarregaGrupos").append(e), $("#btCarregaMaisGrupos").hide()
        } else $("#btCarregaMaisGrupos").prev().remove(), $("#btCarregaMaisGrupos").remove(), $("#boxCarregaGrupos").append(a), intInicioGrupo += 1, $("#btCarregaMaisGrupos").html("Carregar mais grupos")
    }), $(this).blur()
}

function filtrarListaGrupo() {
    var a = "",
        o = $("#txtGrupo").val(),
        e = $("input:checkbox[name='cbTipoGrupoFiltro']:checked").length - 1;
    $("input:checkbox[name='cbTipoGrupoFiltro']:checked").each(function(o) {
        e == o ? a += $(this).val() : a = a + $(this).val() + ","
    }), $("#boxCarregaGrupos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />"), $.post("/AVA/Grupo/Home/ListarGruposDisponiveis?strGrupo=" + o + "&strTipo=" + a + "&intInicio=1", function(a) {
        $("#boxCarregaGrupos").html(a)
    })
}

function excluirParticipante(a, o, e) {
    $.ajax({
        url: "/AVA/Grupo/Home/ExcluirParticipante",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            idGrupo: a,
            idConvite: o,
            idParticipante: e
        },
        success: function(a) {
            "erro" == a ? jAlert("Erro ao excluir participante do grupo.", "") : ($.jStorage.deleteKey("timeline" + idUsuarioCript), window.location = "/AVA/Grupo")
        },
        error: function(a) {
            jAlert("Erro ao excluir participante do grupo.", "")
        }
    })
}

function montaPreviewFilesMensagemRapida(a) {
    var o = $(".dialogo_box .preview_post.arquivos .mCSB_container");
    if (void 0 !== a && null != a && a.length > 0) {
        for (var e = 0; e < a.length; e++) {
            var r = $("<div />").data("idarquivo", a[e].idArquivo),
                i = $("<div />").addClass("prev_documento"),
                t = $("<div />").addClass("tipo_arquivo"),
                n = $("<img />").attr("src", "/ava/StaticContent/Common/img/perfil/documento_multimidia.png").attr("width", "32").attr("height", "41"),
                s = $("<span />").text(a[e].extensao.substring(1, a[e].extensao.length)),
                c = $("<p />").html("" == a[e].nome ? a[e].arquivo : a[e].nome),
                p = $("<a />").attr("href", "#").addClass("remover_multimidia").text("Remover"),
                d = $("<span />").addClass("FontAwesome");
            t.append(n), t.append(s), i.append(t), i.append(c), p.prepend(d), r.append(i), r.append(p), o.find(".adicionar_doc").prev().before(r)
        
            //DEV
            // objetoArquivos.arquivos.push(a);
    
        }
        $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update")
    }


    var jsonObject = (a) ;

    if (jsonObject !== undefined && jsonObject != null && jsonObject.length > 0) {
        for (var i = 0; i < jsonObject.length; i++) {
            // var caminhoImagem = obj[i].diretorio;
            // var thumb = obj[i].thumbnail + obj[i].extensao;

            // var $div = $("<div />").addClass("prev_midia").attr('data-idarquivo', obj[i].idArquivo);
            // var $a = $("<a>Remover</a>").addClass("btn_acao").addClass("opcao_excluir").attr('onclick', 'removeImagemDigaLa(this)').attr("href", "javascript:void(0);");
            // var $img = $("<div />").addClass("bloco_img").css("background-image", 'url(' + caminhoImagem + "/" + thumb + ')');

            // $div.append($a).append($img);

            // if ($caixa.find(".prev_midia:first").hasClass("adicionar")) {
            //     $caixa.prepend($div);
            // } else {
            //     $caixa.find(".prev_midia").not(".adicionar").last().after($div);
            // }

            console.log(jsonObject[i].diretorio);

            jsonObject[i].idPosition = contFile;

            var htmlObject = '' +

            '<li class="qq-file-id-'+contFile+' qq-upload-success" qq-file-id="'+contFile+'">'+
                    '<span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>'+
                    '<div class="qq-progress-bar-container-selector qq-progress-bar-container qq-hide">'+
                      '  <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar" style="width: 100%;"></div>'+
                    '</div>'+
                    '<span class="qq-upload-spinner-selector qq-upload-spinner qq-hide"></span>'+
                    
                    '<div class="qq-thumbnail-wrapper">'+
                       ' <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale="" src="'+ jsonObject[i].diretorio+"/"+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+
                    '</div>'+
                    '<button type="button" class="qq-upload-cancel-selector qq-upload-cancel qq-hide">X</button>'+
                    '<button type="button" class="qq-upload-retry-selector qq-upload-retry qq-hide">'+
                    '   <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>'+
                    '    Retry'+
                    '</button>'+
                    '<div class="qq-file-info">'+
                    
                    '<div class="qq-file-name tipo_arquivo">'+
                    
                    '       <span class="qq-upload-file-selector qq-upload-file" title="'+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+jsonObject[i].arquivo+jsonObject[i].extensao+'</span>'+
                    '       <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>'+
                    '   </div>'+
                    '   <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">'+
                    '   <!-- <span class="qq-upload-size-selector qq-upload-size"></span> -->'+
                    '   <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">'+
                    '       <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>'+
                    '   </button>'+
                    '   <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause qq-hide">'+
                    '       <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>'+
                    '   </button>'+
                    '   <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue qq-hide">'+
                    '       <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>'+
                    '   </button>'+
                    '</div>'+
            '</li> ';
            
            $('.qq-upload-list').append(htmlObject);
            contFile++;

            if(g_mensagemRapidaFile == undefined){

                var g_mensagemRapidaFile ={
                    "idArquivo":0,
                    "arquivo":"",
                    "nome":"",
                    "descricao":"",
                    "diretorio":"",
                    "extensao":"",
                    "idPosition":0
                }
            }

            g_mensagemRapidaFile.idArquivo = jsonObject[i].idArquivo;
            g_mensagemRapidaFile.arquivo = jsonObject[i].arquivo;
            g_mensagemRapidaFile.nome  = jsonObject[i].nome;
            g_mensagemRapidaFile.descricao =  jsonObject[i].descricao;
            g_mensagemRapidaFile.diretorio =  jsonObject[i].diretorio;
            g_mensagemRapidaFile.extensao = jsonObject[i].extensao;
            g_mensagemRapidaFile.idPosition = jsonObject[i].idPosition;
        
            if( g_mensagemRapidaFile.idArquivo > 0 ){
                g_arrayMensagemRapidaFile.push(g_mensagemRapidaFile);
                console.log(JSON.stringify( g_arrayMensagemRapidaFile));
            }

        

        

        }

        // bloqueiaOutrosDigaLa(true);
        // $("#previewImagemDigaLa").show();
    }

}

function limpaPreviewArquivosMensagemRapida() {
    $(".dialogo_box .preview_post.arquivos .prev_documento").parent().remove()
}

function limpaArrayArquivosTimeLine() {
    void 0 !== objetoArquivos && null != objetoArquivos && objetoArquivos.arquivos.length > 0 && objetoArquivos.arquivos.splice(0, objetoArquivos.arquivos.length)
}

function abreUploadFileTimeLineOld() {
    var o = !0,
        e = parseInt($(".dialogo .dialogo_box .preview_post.arquivos").data("idarquivomultimidia"));
    if ($.fancybox.showLoading(), (void 0 === e || null == e || 0 == e) && $.ajax({
            url: "/ava/mural/home/VerificaArquivoMultimidiaTimeline",
            dataType: "json",
            async: !1,
            success: function(a) {
                var r = parseInt(a.error);
                0 == r ? e = parseInt(a.arquivomultimidia.idArquivoMultimidia) : (console.log(a.msg), o = !1, $.fancybox.hideLoading())
            },
            error: function(a) {
                $.fancybox.hideLoading(), o = !1
            }
        }), o) {
        var r = new Array;
        if (objetoArquivos.arquivos.length > 0)
            for (var i in objetoArquivos.arquivos) r.push(objetoArquivos.arquivos[i].idArquivo);
        var t, n = {
            idFerramenta: e,
            idFerramentaTipo: idFerramentaTipoGrupoFile,
            idsArquivosSelecionados: r.join(",")
        };
        try {
            t = document.createElement("<form name='upload'>")
        } catch (s) {
            t = document.createElement("form"), t.name = "upload"
        }
        for (var c in n)
            if (n.hasOwnProperty(c)) {
                var p = document.createElement("input");
                p.type = "hidden", p.name = c, p.value = n[c], t.appendChild(p)
            }
        t.target = "Upload", t.method = "POST", t.action = "/AVA/Upload", document.body.appendChild(t);
        var d = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        Modernizr.touch && (d = null), a = window.open("", "Upload", d), a && t.submit(), $.fancybox.hideLoading()
    }
}

function abreUploadFileTimeLine() {
    var o = !0,
        e = parseInt($(".dialogo .dialogo_box .preview_post.arquivos").data("idarquivomultimidia"));
    if ($.fancybox.showLoading(), (void 0 === e || null == e || 0 == e) && $.ajax({
            url: "/ava/mural/home/VerificaArquivoMultimidiaTimeline",
            dataType: "json",
            async: !1,
            success: function(a) {
                var r = parseInt(a.error);
                0 == r ? e = parseInt(a.arquivomultimidia.idArquivoMultimidia) : (console.log(a.msg), o = !1, $.fancybox.hideLoading())
            },
            error: function(a) {
                $.fancybox.hideLoading(), o = !1
            }
        }), o) {
        var r = new Array;
        if (objetoArquivos.arquivos.length > 0)
            for (var i in objetoArquivos.arquivos) r.push(objetoArquivos.arquivos[i].idArquivo);
        var t, n = {
            idFerramenta: e,
            idFerramentaTipo: idFerramentaTipoGrupoFile,
            idsArquivosSelecionados: r.join(",")
        };
        try {
            t = document.createElement("<form name='upload'>")
        } catch (s) {
            t = document.createElement("form"), t.name = "upload"
        }
        for (var c in n)
            if (n.hasOwnProperty(c)) {
                var p = document.createElement("input");
                p.type = "hidden", p.name = c, p.value = n[c], t.appendChild(p)
            }

        t.target = "Upload_arquivos";
        t.method = "POST"; 
        t.action = "/AVA/Upload"; 
        document.body.appendChild(t);

        var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                parametros = null;
            }
            $("#previewFileDigaLaGrupo iframe").append(t);		
            t.submit();		
            $("#previewFileDigaLaGrupo").dialog("open");		
            $.fancybox.hideLoading();
    }
}

function abreUploadGrupos_OLD(o) {
    var e, r = 32,
        i = {
            idFerramenta: o,
            idFerramentaTipo: r
        };
    try {
        e = document.createElement("<form name='upload'>")
    } catch (t) {
        e = document.createElement("form"), e.name = "upload"
    }
    for (var n in i)
        if (i.hasOwnProperty(n)) {
            var s = document.createElement("input");
            s.type = "hidden", s.name = n, s.value = i[n], e.appendChild(s)
        }
    e.target = "Upload", e.method = "POST", e.action = "/AVA/Upload", document.body.appendChild(e);
    var c = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
    Modernizr.touch && (c = null), a = window.open("", "Upload", c), a && e.submit()
}

function abreUploadGrupos(o) {

    $.fancybox.showLoading();

    console.log('file -> grupoturmas | func -> abreUploadGrupos');

    $('div.ui-dialog').remove();

    $("#previewTrocaFotoGrupos").dialog({
        autoOpen: false,
        height: 680,
        width: 900,
        modal: true,
        resizable: false,
        draggable: false,
        open: function (event, ui) {
            $(this).parent().find(".ui-dialog-titlebar").hide();
            $(this).parent().find(".ui-dialog-buttonpane").hide();
        },
    });

    var i = 32,

    r = {
        idFerramenta: o,
        idFerramentaTipo: i
    };

    var w;
    try {
        w = document.createElement("<form name='Upload_grupos'>")
    } catch (q) {
        w = document.createElement("form");
        w.name = "Upload_grupos"
    }

    for (var s in r)
        if (r.hasOwnProperty(s)) {
            var n = document.createElement("input");
            n.type = "hidden";
            n.name = s;
            n.value = r[s];
            w.appendChild(n)
        }

    w.target = "Upload_grupos";
    w.method = "POST";
    w.action = "/AVA/Upload";
    document.body.appendChild(w);

    var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
    if (Modernizr.touch) {
        parametros = null;
    }

    $("#previewTrocaFotoGrupos iframe").remove();

    $("#previewTrocaFotoGrupos").append('<iframe name="Upload_grupos" id="Upload_frameGrupos" style="width: 100%; height: 100%; border:0;"></iframe>');

    $("#previewTrocaFotoGrupos iframe").append(w);
    w.submit();
    $("#previewTrocaFotoGrupos").dialog("open");
    $.fancybox.hideLoading();
    w.submit();    
}

function CallbackUploadFotoGrupo(dados){
    var idGrupo = $('#idGrupo').val();

    console.log(idGrupo);
    console.log(JSON.stringify(dados));

    $.ajax({
        url: "/AVA/Grupo/Home/SalvaFotoGrupo",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            idGrupo: idGrupo,
            idArquivo: dados.arquivo.idArquivo,
            srcImagem: dados.arquivo.path
        },
        success: function(a) {
        
            $.fancybox.hideLoading();
            $('.foto_grupo').find('a img').attr('src',a);
            $("#previewTrocaFotoGrupos").dialog("close");
        },
        error: function(a) {
            $.fancybox.hideLoading()
        }
    })
}

function carregaSeletor() {
    var a = $("#strIdLinkPermanente").val();
    void 0 !== a && "" != a && $.ajax({
        url: "/ava/grupo/home/validarModerador",
        data: {
            link: a
        },
        dataType: "json",
        success: function(o) {
            var e = parseInt(o.bolmoderador);
            if (e) {
                var r = {
                    bolProfessor: o.bolEducador,
                    bolResponsavel: o.bolResponsavel,
                    bolAluno: o.bolAluno,
                    bolLajota: !0,
                    bolSeguidores: !1,
                    bolAdminCoordDiretor: o.bolEducador,
                    bolEscondeTituloExterno: !0,
                    botaoConclusao: $("#btn_inserir_convite"),
                    btnTextoBotaoConclusaoSeletor: "Inserir",
                    strTitulo: "Inserir Pessoas",
                    cancelarInsertLajota: function(a, o, e) {
                        $("#convidar .convite_combo").addClass("ativo")
                    },
                    insertLajota: function(o, e) {
                        $("#convidar .convite_combo").addClass("ativo");
                        var r = $("#strComentConvite").val(),
                            i = null,
                            t = null,
                            n = $("._convidar").attr("idAdesao");
                        4 == n ? (i = 33, t = 22, idStatus = 0, idTipoConvite = 0) : (i = 34, t = 24, idStatus = 1, idTipoConvite = 1), o.length > 0 && adicionarMembros(o, 0, a, i, t, r, idStatus, idTipoConvite), e.length > 0 && adicionarMembros(e, 1, a, i, t, r, idStatus, idTipoConvite)
                    },
                    atualizaListaUsuarios: function(a, o) {
                        atualizouUsuariosSeletor = !0
                    }
                };
                $(".selector_convidar").AvaSelector(r)
            }
        },
        error: function(a) {
            console.log(a.responseText)
        }
    })
}

function adicionarMembros(a, o, e, r, i, t, n, s) {
    $.ajax({
        url: "/ava/grupo/home/AdicionarMembros",
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        data: {
            tipo: o,
            strLinkPermanente: e,
            json: JSON.stringify(a),
            idFerramentaTipo: r,
            idNotificacaoTipo: i,
            msgComentario: t,
            idStatus: n,
            idTipoConvite: s
        },
        success: function(o) {
            var i = parseInt(o.error);
            0 == i && (a.length > 0 && $(".convite_conteudo").hide("fast", function() {
                $(".convite_enviado").show("fast", function() {
                    $(".convite_enviado").html(33 == r ? "Usu&aacute;rios inscritos com sucesso." : "Convites enviados com sucesso."), setTimeout(function() {
                        $(".convite_enviado").hide(), $(".convite_combo").removeClass("ativo"), $("#strComentConvite").val(""), $(".convite_conteudo").show()
                    }, 5e3), $(".actions[pos=0]").trigger("click")
                })
            }), $(".selector_convidar").AvaSelector("limparUsuarios"), TotalConvitesPendenteGrupo(e), TotalPedidosPendenteGrupo(e), $.jStorage.deleteKey("carregaParticipantes" + e + idUsuarioPraCachear), carregaParticipantes(e))
        },
        error: function(a) {
            console.log(a.responseText)
        }
    })
}

function participarGrupo(a, o) {
    1 == parseInt($("body").data("bolclube")) ? $(".solicitar_participacao").addClass("participando") : $(".solicitar_participacao").html(""), $.ajax({
        url: "/ava/grupo/home/ParticiparGrupo",
        type: "POST",
        dataType: "json",
        data: {
            idGrupo: a,
            intPublico: o
        },
        success: function(e) {
            if (parseInt(e) > 0 || 1 == parseInt(o)) {
                var r = e;
                0 == o ? $(".solicitar_participacao").html('<p>Pedido enviado para aprova&ccedil;&atilde;o. Aguarde.</p><a href="javascript:void(0)" class="btn_cinza right" onclick="cancelarParticipacao(' + a + ", " + r + ')">Cancelar solicita&ccedil;&atilde;o</a>') : ($(".solicitar_participacao").html(1 == parseInt($("body").data("bolclube")) ? "<p>Bem-vindo(a) ao grupo.</p><span></span>" : "<p>Bem-vindo(a) ao grupo.</p>"), $(".solicitar_participacao").addClass("boas_vindas_grupos"), setTimeout(function() {
                    location.reload()
                }, 5e3))
            }
            $.jStorage.deleteKey("timeline" + idUsuarioCript)
        },
        error: function(a) {
            console.log(a.responseText)
        }
    })
}

function cancelarParticipacao(a, o) {
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/AceitarRecusarConvite",
        data: {
            idGrupo: a,
            idConvite: o,
            bolAceitar: !1
        },
        success: function(a) {
            $(".solicitar_participacao").remove(), $.jStorage.deleteKey("timeline" + idUsuarioCript), location.reload()
        },
        error: function(a) {
            console.debug("Erro ao recusar convite.")
        }
    })
}

function removerParticipante(a, o, e, r) {
    $("#opcoes_" + o).removeClass("ativo");
    var i = $("#strIdLinkPermanente").val();
    $("#boxExcluirPart_" + o).fadeIn("fast", function() {
        $(this).find(".naoexc_usuario_grupo").click(function() {
            $("#boxExcluirPart_" + o).fadeOut("fast")
        }), $(this).find(".exc_usuario_grupo").click(function() {
            $.ajax({
                type: "POST",
                url: "/AVA/Grupo/Home/ExcluirParticipante",
                data: {
                    idGrupo: a,
                    idUsuario: o,
                    idConvite: e,
                    idParticipante: r
                },
                success: function(a) {
                    $("#cart_" + o).fadeOut("fast", function() {
                        $(this).remove()
                    }), TotalConvitesPendenteGrupo(i), TotalPedidosPendenteGrupo(i), $.jStorage.deleteKey("carregaParticipantes" + idUsuarioPublico + idUsuarioPraCachear), $.jStorage.deleteKey("timeline" + idUsuarioCript), carregaParticipantes(idUsuarioPublico), carregarMediadores(i)
                },
                error: function(a) {
                    console.debug(a)
                }
            })
        })
    })
}

function aceitarParticipante(a, o, e) {
    $("#dados_participante_" + o).html("<p class='promover_loading'></p>");
    var r = $("#strIdLinkPermanente").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/AceitarParticipante",
        data: {
            idGrupo: a,
            idConvite: e
        },
        success: function(e) {
            dadosParticipante(a, o), TotalConvitesPendenteGrupo(r), TotalPedidosPendenteGrupo(r), $.jStorage.deleteKey("timeline" + idUsuarioCript)
        },
        error: function(a) {
            console.debug("Erro ao aceitar participante")
        }
    })
}

function promoverParticipante(a, o) {
    $("#dados_participante_" + o).html("<p class='promover_loading'></p>");
    var e = $("#strIdLinkPermanente").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/Promover",
        data: {
            idGrupo: a,
            idUsuario: o
        },
        success: function(r) {
            dadosParticipante(a, o), carregarMediadores(e)
        },
        error: function(a) {
            console.debug("Erro ao promover participante")
        }
    })
}

function removerMediacao(a, o) {
    $("#dados_participante_" + o).html("<p class='promover_loading'></p>");
    var e = $("#strIdLinkPermanente").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/Despromover",
        data: {
            idGrupo: a,
            idUsuario: o
        },
        dataType: "json",
        success: function(r) {
            dadosParticipante(a, o), carregarMediadores(e)
        },
        error: function(a) {
            console.debug("Erro ao remover media&ccedil;&atilde;o")
        }
    })
}

function dadosParticipante(a, o) {
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/DadosParticipante",
        data: {
            idGrupo: a,
            idUsuario: o
        },
        success: function(a) {
            $("#dados_participante_" + o).html(a), $(".seta_combo_carteirinha").click(function() {
                $("#opcoes_" + o).addClass("ativo").mouseleave(function() {
                    $(this).removeClass("ativo")
                })
            }), $.jStorage.deleteKey("carregaParticipantes" + idUsuarioPublico + idUsuarioPraCachear), carregaParticipantes(idUsuarioPublico)
        },
        error: function(a) {
            console.debug("Erro ao aceitar participante")
        }
    })
}

function excluirGrupo(a) {
    $.ajax({
        url: "/AVA/Grupo/Home/ExcluirGrupo",
        type: "POST",
        data: {
            idGrupo: a
        },
        success: function(a) {
            "erro" == a ? jAlert("Erro ao excluir o grupo.", "") : window.location = "/AVA/Grupo"
        },
        error: function(a) {
            jAlert("Erro ao excluir grupo.", "")
        }
    })
}

function TotalConvitesPendenteGrupo(a) {
    $.ajax({
        url: "/AVA/Grupo/Home/TotalConvitesPendentesGrupo",
        type: "POST",
        data: {
            strIdLinkPermanente: a
        },
        success: function(a) {
            0 == a ? $("#convite_pendente").parent().hide() : $("#convite_pendente").html("Convites (" + a + ")").parent().show()
        },
        error: function(a) {
            jAlert("Erro total convites", "")
        }
    })
}

function TotalPedidosPendenteGrupo(a) {
    $.ajax({
        url: "/AVA/Grupo/Home/TotalPedidosPendentesGrupo",
        type: "POST",
        data: {
            strIdLinkPermanente: a
        },
        success: function(a) {
            0 == a ? $("#pedido_pendente").parent().hide() : $("#pedido_pendente").html("Pedidos (" + a + ")").parent().show()
        },
        error: function(a) {
            jAlert("Erro total pedidos", "")
        }
    })
}

function aceitarConvite(a, o) {
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/AceitarRecusarConvite",
        data: {
            idGrupo: a,
            idConvite: o,
            bolAceitar: !0
        },
        success: function(a) {
            $(".solicitar_participacao").html("<p>Bem-vindo(a) ao grupo.</p>"), $(".solicitar_participacao").addClass("boas_vindas_grupos"), setTimeout(function() {
                location.reload()
            }, 3e3)
        },
        error: function(a) {
            console.debug("Erro ao aceitar convite.")
        }
    })
}

function recusarConvite(a, o) {
    $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/AceitarRecusarConvite",
        data: {
            idGrupo: a,
            idConvite: o,
            bolAceitar: !1
        },
        success: function(a) {
            $(".solicitar_participacao").remove(), location.href = "/AVA/Grupo"
        },
        error: function(a) {
            console.debug("Erro ao recusar convite.")
        }
    })
}

function CallbackUploadExcluidos(a) {
    if (15 == parseInt(a.idFerramentaTipo)) {
        if ($("#boxMaterialApoioTarefa .the_insertedLink a.exclui_arquivo[idarquivo=" + a.idArquivo + "]").length && ($("#boxMaterialApoioTarefa .the_insertedLink a.exclui_arquivo[idarquivo=" + a.idArquivo + "]").parent().remove(), null != arrayArquivosUpload)) {
            var o = [];
            for (var e in arrayArquivosUpload.arrayArquivo) arrayArquivosUpload.arrayArquivo[e].id != a.idArquivo && o.push(arrayArquivosUpload.arrayArquivo[e]);
            arrayArquivosUpload.arrayArquivo = o, 0 == o.length && $("#boxMaterialApoioTarefa").remove(), o = []
        }
    } else if (parseInt(a.idFerramentaTipo) == idFerramentaTipoGrupo) {
        if (void 0 !== objetoImagens && null != objetoImagens && null != objetoImagens.imagens && objetoImagens.imagens.length > 0) {
            for (var r = objetoImagens.imagens.length, i = 0; r > i; i++)
                if (objetoImagens.imagens[i].idArquivo == a.idArquivo) {
                    objetoImagens.imagens.splice(i, 1), $(".preview_post.imagens").find(".prev_imagem").not(".adicionar").each(function() {
                        return $(this).data("idarquivo") == a.idArquivo ? void $(this).remove() : void 0
                    });
                    break
                }
            0 == objetoImagens.imagens.length && ($(".dialogo .dialogo_box .preview_post.imagens").is(":visible") && $(".dialogo .dialogo_box .preview_post.imagens").hide(), 
            $(".mensagem_multimidia ul:not(#cbAssuntoPost)").is(":visible") || ($(".mensagem_multimidia ul:not(#cbAssuntoPost)").show(), "" == $("#txtInput").val() && $("#compartilhar").addClass("disable").prop("disabled", !0)))
        }
    } else if (parseInt(a.idFerramentaTipo) == idFerramentaTipoGrupoFile && void 0 !== objetoArquivos && null != objetoArquivos && null != objetoArquivos.arquivos && objetoArquivos.arquivos.length > 0) {
        for (var r = objetoArquivos.arquivos.length, i = 0; r > i; i++)
            if (objetoArquivos.arquivos[i].idArquivo == a.idArquivo) {
                objetoArquivos.arquivos.splice(i, 1), $(".preview_post.arquivos").find(".prev_documento").each(function() {
                    return parseInt($(this).parent().data("idarquivo")) == a.idArquivo ? void $(this).parent().remove() : void 0
                });
                break
            }
        0 == objetoArquivos.arquivos.length && ($(".dialogo .dialogo_box .preview_post.arquivos").is(":visible") && $(".dialogo .dialogo_box .preview_post.arquivos").hide(), $(".mensagem_multimidia ul:not(#cbAssuntoPost)").is(":visible") || ($(".mensagem_multimidia ul:not(#cbAssuntoPost)").show(), "" == $("#txtInput").val() && $("#compartilhar").addClass("disable").prop("disabled", !0)))
    }
}

function abreUploadImagemTimeLineOld() {
    var o = !0,
        e = parseInt($(".dialogo .dialogo_box .preview_post.imagens").data("idalbum")),
        r = location.href.split("/")[7];
    if ($.fancybox.showLoading(), (void 0 === e || null == e || 0 == e) && $.ajax({
            url: "/ava/Grupo/home/VerificaAlbumTimeline",
            dataType: "json",
            data: {
                linkGrupo: r
            },
            type: "POST",
            async: !1,
            success: function(a) {
                var r = parseInt(a.error);
                0 == r ? e = parseInt(a.album.idAlbum) : (console.log(a.msg), o = !1, $.fancybox.hideLoading())
            },
            error: function(a) {
                $.fancybox.hideLoading(), o = !1
            }
        }), o) {
        var i = new Array;
        if (objetoImagens.imagens.length > 0)
            for (var t in objetoImagens.imagens) i.push(objetoImagens.imagens[t].idArquivo);
        var n, s = {
            idFerramenta: e,
            idFerramentaTipo: idFerramentaTipoGrupo,
            idsArquivosSelecionados: i.join(",")
        };
        try {
            n = document.createElement("<form name='upload'>")
        } catch (c) {
            n = document.createElement("form"), n.name = "upload"
        }
        for (var p in s)
            if (s.hasOwnProperty(p)) {
                var d = document.createElement("input");
                d.type = "hidden", d.name = p, d.value = s[p], n.appendChild(d)
            }
        n.target = "Upload", n.method = "POST", n.action = "/AVA/Upload", document.body.appendChild(n);
        var u = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        Modernizr.touch && (u = null), a = window.open("", "Upload", u), a && n.submit(), $.fancybox.hideLoading()
    }
}

function abreUploadImagemTimeLine() {
    console.log("**** grupos.js abreUploadImagemTimeLine *****");
    var flagContinua = true;
    var o = !0,
        e = parseInt($(".dialogo .dialogo_box .preview_post.imagens").data("idalbum")),
        r = location.href.split("/")[7];
    $.fancybox.showLoading();
    if ($.fancybox.showLoading(), (void 0 === e || null == e || 0 == e) && $.ajax({
            url: "/ava/Grupo/home/VerificaAlbumTimeline",
            dataType: "json",
            data: {
                linkGrupo: r
            },
            type: "POST",
            async: !1,
            success: function(a) {
                var r = parseInt(a.error);
                0 == r ? e = parseInt(a.album.idAlbum) : (console.log(a.msg), o = !1, $.fancybox.hideLoading())
            },
            error: function(a) {
                $.fancybox.hideLoading(), o = !1
            }
        }), o) {
        var i = new Array;
        if (objetoImagens.imagens.length > 0)
            for (var t in objetoImagens.imagens) i.push(objetoImagens.imagens[t].idArquivo);
        var n, s = {
            idFerramenta: e,
            idFerramentaTipo: idFerramentaTipoGrupo,
            idsArquivosSelecionados: i.join(",")
        };
        try {
            n = document.createElement("<form name='upload'>")
        } catch (c) {
            n = document.createElement("form"), n.name = "upload"
        }
        for (var p in s)
            if (s.hasOwnProperty(p)) {
                var d = document.createElement("input");
                d.type = "hidden", d.name = p, d.value = s[p], n.appendChild(d)
            }
        n.target = "Upload";
        n.method = "POST"; 
        n.action = "/AVA/Upload"; 
        document.body.appendChild(n);

        var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                parametros = null;
            }
            $("#previewImagemDigaLaGrupo iframe").append(n);		
            n.submit();		
            $("#previewImagemDigaLaGrupo").dialog("open");		
            $.fancybox.hideLoading();
    }
}

function limpaPreviewImagemMensagemRapida() {
    $(".dialogo_box .preview_post.imagens .engloba_classe .prev_imagem").not(".adicionar").remove()
}

function limpaArrayImagensTimeLine() {
    void 0 !== objetoImagens && null != objetoImagens && objetoImagens.imagens.length > 0 && objetoImagens.imagens.splice(0, objetoImagens.imagens.length)
}

function montaPreviewImagemMensagemRapida(a) {
    var o = $(".dialogo_box .preview_post.imagens .engloba_classe .mCSB_container");
    if (void 0 !== a && null != a && a.length > 0) {
        for (var e = 0; e < a.length; e++) {
            var r = a[e].diretorio,
                i = a[e].thumbnail + a[e].extensao,
                t = $("<div />").addClass("prev_imagem").data("idarquivo", a[e].idArquivo),
                n = $("<img />").attr("src", r + "/" + i).attr("width", "99").attr("height", "99").attr("alt", a[e].nome),
                s = $("<a />").addClass("remover_multimidia").attr("href", "javascript:void(0);"),
                c = $("<span />").addClass("FontAwesome");
            s.append(c), t.append(n), t.append(s), o.find(".prev_imagem:first").hasClass("adicionar") ? o.prepend(t) : o.find(".prev_imagem").not(".adicionar").last().after(t);

        }
        $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update")
    }

    var jsonObject = (a) ;

        console.log(jsonObject);

        for(var i = 0; i < jsonObject.length; i++){

            console.log(jsonObject[i].diretorio);

            jsonObject[i].idPosition = contImg;

            var htmlObject = '' +

            '<li class="qq-file-id-'+contImg+' qq-upload-success"    qq-file-id="'+contImg+'">'+
                    '<span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>'+
                    '<div class="qq-progress-bar-container-selector qq-progress-bar-container qq-hide">'+
                      '  <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar" style="width: 100%;"></div>'+
                    '</div>'+
                    '<span class="qq-upload-spinner-selector qq-upload-spinner qq-hide"></span>'+
                    '<div class="qq-thumbnail-wrapper">'+
                       ' <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale="" src="'+ jsonObject[i].diretorio+"/"+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+
                    '</div>'+
                    '<button type="button" class="qq-upload-cancel-selector qq-upload-cancel qq-hide">X</button>'+
                    '<button type="button" class="qq-upload-retry-selector qq-upload-retry qq-hide">'+
                    '   <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>'+
                    '    Retry'+
                    '</button>'+
                    '<div class="qq-file-info">'+
                    '<div class="qq-file-name">'+
                    '       <span class="qq-upload-file-selector qq-upload-file" title="'+jsonObject[i].arquivo+jsonObject[i].extensao+'">'+jsonObject[i].arquivo+jsonObject[i].extensao+'</span>'+
                    '       <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>'+
                    '   </div>'+
                    '   <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">'+
                    '   <!-- <span class="qq-upload-size-selector qq-upload-size"></span> -->'+
                    '   <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete"   onclick=deleteImg('+contImg+') >   '+
                    '       <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>'+
                    '   </button>'+
                    '   <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause qq-hide">'+
                    '       <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>'+
                    '   </button>'+
                    '   <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue qq-hide">'+
                    '       <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>'+
                    '   </button>'+
                    '</div>'+
            '</li> ';
            
            $('.qq-upload-list').append(htmlObject);
            contImg++;


            if(g_mensagemRapida == undefined){
            

                var g_mensagemRapida = {
                    "bolPaisagem":false,
                    "bolRetrato":false,
                    "idArquivo":0,
                    "thumbnail":"",
                    "arquivo":"",
                    "nome": "",
                    "descricao": "",
                    "diretorio": "",
                    "extensao": "",
                    "altura": 0,
                    "largura": 0,
                    "idPosition":0
                };   
            }
                    
                g_mensagemRapida.bolPaisagem = jsonObject[i].bolPaisagem;
                g_mensagemRapida.bolRetrato = jsonObject[i].bolRetrato;
                g_mensagemRapida.idArquivo = jsonObject[i].idArquivo;
                g_mensagemRapida.thumbnail = jsonObject[i].thumbnail;
                g_mensagemRapida.arquivo = jsonObject[i].arquivo;
                g_mensagemRapida.nome  = jsonObject[i].nome;
                g_mensagemRapida.descricao =  jsonObject[i].descricao;
                g_mensagemRapida.diretorio =  jsonObject[i].diretorio;
                g_mensagemRapida.extensao = jsonObject[i].extensao;
                g_mensagemRapida.altura = jsonObject[i].altura;
                g_mensagemRapida.largura = jsonObject[i].largura;
                g_mensagemRapida.idPosition = jsonObject[i].idPosition;
                    

                if( g_mensagemRapida.idArquivo > 0 ){
                    g_arrayMensagemRapida.push(g_mensagemRapida);
                    console.log(JSON.stringify( g_arrayMensagemRapida));
                }
            

        }
}
var ehClube = parseInt($("body").data("bolclube")),
    idFerramentaTipoGrupo = 36,
    idFerramentaTipoGrupoFile = 38,
    objetoImagens = {
        imagens: new Array
    },
    objetoArquivos = {
        arquivos: new Array
    },
    tpClickGrupo = "click",
    QtdAjaxGrupos = {
        intQtd: 4,
        intCarregou: 0
    };


$(function() {
    if (Modernizr.touch) {
        var a = navigator.userAgent.toLowerCase(),
            o = a.indexOf("android") > -1;
        tpClickGrupo = o ? "click" : "touchstart"
    }
    //ok
    $( "#previewImagemDigaLaGrupo" ).dialog({
        autoOpen: false,
        height: 680,
        width: 900,
        modal: true,
        resizable: false,
        draggable: false,
        open: function(event, ui) {
            $(this).parent().find(".ui-dialog-titlebar").hide();
            $(this).parent().find(".ui-dialog-buttonpane").hide();
        },
    }), 
    
    $( "#previewFileDigaLaGrupo" ).dialog({
        autoOpen: false,
        height: 680,
        width: 900,
        modal: true,
        resizable: false,
        draggable: false,
        open: function(event, ui) {
            $(this).parent().find(".ui-dialog-titlebar").hide();
            $(this).parent().find(".ui-dialog-buttonpane").hide();
        },       

    }), 

    $("#btCriarGrupo").live("click", function() {
        $("#boxCriarGrupo").css("display", "block")
    }), $("#boxCarregaGrupos").on("click", "#btCarregaMaisGrupos", verMaisGrupos), $("#btCriarGrupo").fancybox({
        fitToView: !1,
        padding: 0,
        autoSize: !0,
        closeClick: !1,
        openEffect: "none",
        autoResize: !0,
        closeEffect: "none",
        closeBtn: !1,
        scrolling: "no",
        autoDimensions: !0,
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
        helpers: {
            overlay: {
                closeClick: !1,
                locked: !1
            }
        },
        afterShow: function() {
            $(".botoes.right").css("cssText", "margin-bottom: 25px! important; margin-right : 35px !important;"), $(".botoes.right").find(".btn_cinza").css("cssText", "margin-top : 25px"), $("#txtDescricaoGrupoPrivado").limit("1000"), $("#txtDescricaoGrupoPublico").limit("1000"), $(".envolto >div").click(function() {
                $(this).addClass("config_ativo"), $(this).removeClass("config_inativo"), $(this).siblings().removeClass("config_ativo"), $(this).siblings().addClass("config_inativo"), "none" == $("#btnSalvarGrupo").css("display") && $("#btnSalvarGrupo").css("display", ""), $.fancybox.update()
            }), $("input:radio").styleRadioCheckbox({
                classChecked: "inputRadioChecked",
                classFocus: "inputFocus"
            }), $("#cbPublicoPotencial").find("li").eq(0).click(function() {
                $(this).closest("ul").find("li").not('input[value="1"]').each(function() {
                    var a = $(this);
                    a.find("input").is(":checked") && a.find("input").click()
                }), $("#txtPublicoPotencial").click()
            })
        }
    }), $("#cbTipoGrupo").find("li").eq(0).click(function() {
        $(this).closest("ul").find("li").not('input[value="0"]').each(function() {
            var a = $(this);
            a.find("input").is(":checked") && a.find("input").click()
        }), $("#txtTipoGrupoFiltro").click()
    }), $("#ava_editar_grupo").fancybox({
        fitToView: !1,
        width: 550,
        height: 580,
        padding: 0,
        autoSize: !1,
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
        afterShow: function() {
            window.prettyPrint && prettyPrint(), $("body").on("switch-change", "#mySwitch", function(a, o) {
                var e = $(o.el),
                    r = o.value;
                console.log(a, e, r)
            }), $("input:radio").styleRadioCheckbox({
                classChecked: "inputRadioChecked",
                classFocus: "inputFocus"
            }), "False" == $("#bolPublico").val() && window.setTimeout(function() {
                $("#bolPublico").closest(".fancybox-inner").css("height", "510px")
            }, 1), $("#cbPublicoPotencial").find("li").eq(0).click(function() {
                $(this).closest("ul").find("li").not('input[value="1"]').each(function() {
                    var a = $(this);
                    a.find("input").is(":checked") && a.find("input").click()
                }), $("#txtPublicoPotencial").html('<span class="FontAwesome"></span>Todos os usu&aacute;rios <span class="caret"></span>')
            }), $("#txtDescricaoGrupoPublico").limit("1000"), $("#excluir_grupo").fancybox({
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
                afterShow: function() {
                    $("#btnCancelarExclusaoMensagem").click(function() {
                        $.fancybox.close()
                    }), $("#btnExclusaoGrupo").click(function() {
                        excluirGrupo($(this).attr("idGrupo"))
                    })
                }
            })
        }
    }), $("#ava_wrap").on("click", ".menu_grupo_topo #sobre", function() {
        $(".combo_topo.ativo").removeClass("ativo"), $(".sobre_combo").toggleClass("ativo"), $("#boxListaParticipantesGeral").hide(), $("#sobre_mediador").hide()
    }), $("#ava_wrap").on("click", ".menu_grupo_topo #convidar > a", function(a) {
        a.preventDefault(), carregaSeletor(), $(".combo_topo.ativo").removeClass("ativo"), $(".convite_combo").toggleClass("ativo"), $("#boxListaParticipantesGeral").hide(), $("#sobre_mediador").hide()
    }), $("#ava_wrap").on("click", "#btn_cancelar_convite", function(a) {
        a.preventDefault(), $(".convite_combo").removeClass("ativo"), $(".selector_convidar").AvaSelector("limparUsuarios")
    }), $("#ava_wrap").on("click", ".menu_grupo_topo #configurar", function() {
        $(".combo_topo.ativo").removeClass("ativo"), $(".config_combo").toggleClass("ativo"), $("#boxListaParticipantesGeral").hide(), $("#sobre_mediador").hide()
    }), $("#ava_wrap").on("click", ".menu_grupo_topo #convite_pendente", function() {
        $(".combo_topo.ativo").removeClass("ativo"), $("#sobre_mediador").hide(), $("#boxListaParticipantesGeral").show("fast", function() {
            $(".fechar_participantes").click(function() {
                $("#boxListaParticipantesGeral").hide()
            }), $("#cbParticipante_3").click()
        })
    }), $("body").click(function(a) {
        0 == $(a.target).closest("#vertodosparticipantesgrupo").size() && 0 == $(a.target).closest("#boxListaParticipantesGeral").size() && 0 == $(a.target).closest(".menu_grupo_topo").size() && 0 == $(a.target).closest("#interroga_mediador").size() && 0 == $(a.target).closest("#sobre_mediador").size() && 0 == $(a.target).closest(".ui-autocomplete").size() && (atualizouUsuariosSeletor || ($("#boxListaParticipantesGeral").hide(), $(".seletor").is(":visible") || $(".combo_topo.convite_combo").removeClass("ativo"), $(".config_combo").removeClass("ativo"), $(".sobre_combo").removeClass("ativo"), $("#sobre_mediador").hide())), atualizouUsuariosSeletor = !1
    }), $("#ava_wrap").on("click", ".menu_grupo_topo #pedido_pendente", function() {
        $(".convite_combo").removeClass("ativo"), $("#sobre_mediador").hide(), $("#boxListaParticipantesGeral").show("fast", function() {
            $(".fechar_participantes").click(function() {
                $("#boxListaParticipantesGeral").hide()
            }), $("#cbParticipante_2").click()
        })
    }), $("body").on(tpClickGrupo, ".mensagem_multimidia .multimidia_documentos", function(a) {
        a.preventDefault(), abreUploadFileTimeLine()
    }).on("click", ".dialogo_box .preview_post.arquivos .remover_multimidia", function(a) {
        a.preventDefault();
        var o = $(this).parent(),
            e = parseInt(o.data("idarquivo"));
        if (void 0 !== objetoArquivos && null !== objetoArquivos && objetoArquivos.arquivos.length > 0)
            for (var r = 0; r < objetoArquivos.arquivos.length; r++)
                if (objetoArquivos.arquivos[r].idArquivo == e) {
                    objetoArquivos.arquivos.splice(r, 1), o.remove();
                    break
                }(void 0 === objetoArquivos || null == objetoArquivos || 0 == objetoArquivos.arquivos.length) && ($("#compartilhar").hasClass("disable") || "" != $("#txtInput").val() || ($("#compartilhar").addClass("disable").prop("disabled", !0), $(".dialogo_box .preview_post.arquivos").hide(), $("#compartilhar").hide(), $("#btnCancelarFerramentaMural").hide(), $("#btnCancelarFerramentaMural").closest(".sep_digala").hide(), $(".dialogo .mensagem_multimidia ul:not(#cbAssuntoPost)").show(), $("#seletorMuralDigaLa").hide()), $("#compartilhar").hasClass("disable") || "" === $("#txtInput").val() || ($(".dialogo .mensagem_multimidia ul:not(#cbAssuntoPost)").show(), $(".dialogo_box .preview_post.arquivos").hide(), $("#btnCancelarFerramentaMural").show(), $("#btnCancelarFerramentaMural").closest(".sep_digala").show(), $("#seletorMuralDigaLa").show(), $("#compartilhar").show())), $(".dialogo_box .preview_post.arquivos").mCustomScrollbar("update")
    }), $(".dialogo_box .preview_post.arquivos .adicionar_doc").click(function(a) {
        a.preventDefault(), abreUploadFileTimeLine()
    }), $(".dialogo_box .preview_post.arquivos").mCustomScrollbar(), $("body").on("click", ".dialogo_box .preview_post.imagens .remover_multimidia", function(a) {
        a.preventDefault();
        var o = $(this).closest(".prev_imagem"),
            e = parseInt(o.data("idarquivo"));
        if (void 0 !== objetoImagens && null != objetoImagens && objetoImagens.imagens.length > 0)
            for (var r = 0; r < objetoImagens.imagens.length; r++)
                if (objetoImagens.imagens[r].idArquivo == e) {
                    objetoImagens.imagens.splice(r, 1), o.remove();
                    break
                }(void 0 === objetoImagens || null == objetoImagens || 0 == objetoImagens.imagens.length) && ($("#compartilhar").hasClass("disable") || "" != $("#txtInput").val() || ($("#compartilhar").addClass("disable").prop("disabled", !0), $(".dialogo .dialogo_box .preview_post.imagens").hide(), $(".dialogo_box .preview_post.imagens").hide(), $("#compartilhar").hide(), $("#btnCancelarFerramentaMural").hide(), $("#btnCancelarFerramentaMural").closest(".sep_digala").hide(), $(".dialogo .mensagem_multimidia ul:not(#cbAssuntoPost)").show(), $("#seletorMuralDigaLa").hide()), $("#compartilhar").hasClass("disable") || "" === $("#txtInput").val() || ($(".dialogo .mensagem_multimidia ul:not(#cbAssuntoPost)").show(), $(".dialogo .dialogo_box .preview_post.imagens").hide(), $("#btnCancelarFerramentaMural").show(), $("#btnCancelarFerramentaMural").closest(".sep_digala").show(), $("#seletorMuralDigaLa").show(), $("#compartilhar").show())), $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update")
    }).on(tpClickGrupo, ".mensagem_multimidia .multimidia_imagens", function(a) {
        a.preventDefault(), abreUploadImagemTimeLine()
    }).on(tpClickGrupo, ".mensagem_multimidia .multimidia_video", function(a) {
        a.preventDefault(), $(this).closest(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide(), $(".enviar_video").is(":visible") || ($(this).closest(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide(), $(".enviar_video").show(), $("#compartilhar").show(), $("#btnCancelarFerramentaMural").show(), $("#btnCancelarFerramentaMural").closest(".sep_digala").show(), $("#btnCancelarFerramentaMural").prop("disabled", !1).removeClass("disable"))
        
    }).on(tpClickGrupo, "#btnCancelarFerramentaMural", function(a) {
        a.preventDefault(), $(".dialogo .dialogo_box .preview_post.imagens").is(":visible") ? (limpaPreviewImagemMensagemRapida(), limpaArrayImagensTimeLine(), $(".dialogo .dialogo_box .preview_post.imagens").hide(), $("#compartilhar").addClass("disable").prop("disabled", !0)) : $(".enviar_video").is(":visible") || $(".dialogo .dialogo_box .preview_post.video").is(":visible") ? ($(".enviar_video").hide(), removerPreviewVideoMensagem(!0), $("#btnCancelarFerramentaMural").hide(), $("#btnCancelarFerramentaMural").closest(".sep_digala").hide(), $("#compartilhar").addClass("disable").prop("disabled", !0), $(".errovideo").hide()) : $(".dialogo .dialogo_box .preview_post.arquivos").is(":visible") && (limpaPreviewArquivosMensagemRapida(), limpaArrayArquivosTimeLine(), $(".dialogo .dialogo_box .preview_post.arquivos").hide(), $("#compartilhar").addClass("disable").prop("disabled", !0)), $("#txtInput").val(""), $("#txtInput").css("height", "48px"), $("#txtInput").siblings(":last").html(""), $(".mensagem_multimidia ul:not(#cbAssuntoPost)").show(), $(this).prop("disabled", !0).addClass("disable"), $(this).hide(), $("#compartilhar").hide(), $("#seletorMuralDigaLa").hide(), $("#compartilhar").closest(".sep_digala").hide()
    }), $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar({
        horizontalScroll: !0,
        advanced: {
            autoExpandHorizontalScroll: !0
        }
    }), $(".dialogo_box .preview_post.imagens .adicionar .adicionar_multimidia").click(function(a) {
        a.preventDefault(), abreUploadImagemTimeLine()
    }), $(".itensGrupo").find("> h2").each(function() {
        var a = $(this).width(),
            o = a - $(this).find("> span:first").width();
        $(this).find("> span:last").width(o - 30)
    }), $(".dropdown-menu input[type='radio'][name='filtroGrupo']").change(function(a) {
        var o = $(this);
        if (selecionados = [], 1 == parseInt(o.val()) && o.is(":checked")) $(".dropdown-menu input[type='checkbox'][name='filtroGrupo']").not("[value='1']").prop("checked", !1), selecionados.push(1);
        else {
            if ($(this).is(":checked")) {
                for (var e = selecionados.length, r = !1, i = 0; e > i; i++)
                    if (selecionados[i] == parseInt($(this).val())) {
                        r = !0;
                        break
                    }
                r || selecionados.push(parseInt($(this).val()))
            } else
                for (var e = selecionados.length, i = 0; e > i; i++) selecionados[i] == parseInt($(this).val()) && selecionados.splice(i, 1);
            6 == selecionados.length ? ($(".dropdown-menu input[type='checkbox'][name='filtroGrupo']").not("[value='1']").prop("checked", !1), $(".dropdown-menu input[type='checkbox'][name='filtroGrupo'][value='1']").prop("checked", !0), selecionados.splice(0, selecionados.length)) : 0 == selecionados.length ? $(".dropdown-menu input[type='checkbox'][name='filtroGrupo'][value='1']").is(":checked") || $(".dropdown-menu input[type='checkbox'][name='filtroGrupo'][value='1']").prop("checked", !0) : selecionados.length < 6 && $(".dropdown-menu input[type='checkbox'][name='filtroGrupo'][value='1']").is(":checked") && $(".dropdown-menu input[type='checkbox'][name='filtroGrupo'][value='1']").prop("checked", !1)
        }
    }), $(".itensGrupo div").click(function() {
        var a = $(this).find(".infoGrupo h3 a").attr("href");
        location.href = a
    }), $("#txtPesquisaGrupo").keypress(function(a) {
        var o = a.keyCode || a.wich;
        return 13 == o ? (a.preventDefault(), void $("#btnPesquisarGrupo").trigger("click")) : void 0
    }), $("#btnPesquisarGrupo").click(function(a) {
        a.preventDefault();
        var o = null;
        strTermoGrupoNovos = strTermoGrupo = $("#txtPesquisaGrupo").val(), o = {
            termo: strTermoGrupo,
            tipo: selecionados
        }, 0 == o.tipo.length && o.tipo.push(1), $.fancybox.showLoading(), $.ajax({
            url: "/ava/grupo/home/pesquisarGrupos",
            type: "POST",
            dataType: "json",
            data: {
                json: JSON.stringify(o)
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(a) {
                var e = a.meusGrupos,
                    r = a.meusGruposConvitesPendentes,
                    i = a.meusGruposModerados,
                    t = a.novosGrupos,
                    n = a.desativados,
                    s = a.bolResultadoComFiltro;
                if (s || (strTermoGrupoNovos = ""), null != e || null != r || null != i || null != n || s ? ($(".feedback_grupo").hide(), "" == o.termo ? 1 != parseInt($(".dropdown-menu input[type='radio'][name='filtroGrupo']:checked").val()) ? ($(".resultado_pesquisa_grupo").show(), $(".resultado_pesquisa_grupo > span").text($(".dropdown-menu input[type='radio'][name='filtroGrupo']:checked").next().text())) : $(".resultado_pesquisa_grupo").hide() : ($(".resultado_pesquisa_grupo").show(), $(".resultado_pesquisa_grupo > span").text(o.termo))) : (1 == selecionados[0] && "" == strTermoGrupo ? ($(".feedback_grupo.com_categoria").hide(), $(".feedback_grupo.com_termo").hide(), $(".feedback_grupo").hasClass("sem_grupo") ? $(".feedback_grupo.sem_grupo").show() : $(".feedback_grupo.sem_grupo_filtro").show()) : "" == strTermoGrupo ? ($(".feedback_grupo.com_categoria").show(), $(".feedback_grupo.com_termo").hide(), $(".feedback_grupo").hasClass("sem_grupo") ? $(".feedback_grupo.sem_grupo").hide() : $(".feedback_grupo.sem_grupo_filtro").hide()) : ($(".feedback_grupo.com_termo").show(), $(".feedback_grupo.com_categoria").hide(), $(".feedback_grupo > p > span").text(o.termo), $(".feedback_grupo").hasClass("sem_grupo") ? $(".feedback_grupo.sem_grupo").hide() : $(".feedback_grupo.sem_grupo_filtro").hide()), $(".resultado_pesquisa_grupo").hide()), null != e) {
                    $(".voce_participa").is(":visible") || $(".voce_participa").show();
                    var c = e.length,
                        p = 0,
                        d = !1;
                    null == r && null == i ? p = c > 8 && 16 > c ? c : 16 == c ? c - 1 : 8 == c ? 8 : c : 9 == c ? (p = 7, d = !0) : p = 8 == c ? 8 : 16 == c ? c - 1 : c, $(".voce_participa > div").remove(), $("#ava_container .itensGrupo.voce_participa .carregarMais").hide();
                    for (var u = 0; p > u; u++) montaCarteirinhaHomeGrupo(e[u], "participa");
                    null == r && null == i ? 16 == c && ($("#ava_container .itensGrupo.voce_participa .carregarMais").insertAfter("#ava_container .itensGrupo.voce_participa > div:last"), $("#ava_container .itensGrupo.voce_participa .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.voce_participa .carregarMais").html(txtBackup)) : d ? ($("#ava_container .itensGrupo.voce_participa .carregarMais").insertAfter("#ava_container .itensGrupo.voce_participa > div:last"), $("#ava_container .itensGrupo.voce_participa .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.voce_participa .carregarMais").html(txtBackup)) : 16 == c && ($("#ava_container .itensGrupo.voce_participa .carregarMais").insertAfter("#ava_container .itensGrupo.voce_participa > div:last"), $("#ava_container .itensGrupo.voce_participa .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.voce_participa .carregarMais").html(txtBackup))
                } else $(".voce_participa").hide();
                if (null != r) {
                    $(".convite_pendente").is(":visible") || $(".convite_pendente").show();
                    var c = r.length,
                        p = 0,
                        d = !1;
                    null == e && null == i ? p = c > 8 && 16 > c ? c : 16 == c ? c - 1 : 8 == c ? 8 : c : 9 == c ? (p = 7, d = !0) : p = 8 == c ? 8 : 16 == c ? c - 1 : c, $(".convite_pendente > div").remove(), $("#ava_container .itensGrupo.convite_pendente .carregarMais").hide();
                    for (var u = 0; p > u; u++) montaCarteirinhaHomeGrupo(r[u], "convitePendente");
                    null == e && null == i ? 16 == c && ($("#ava_container .itensGrupo.convite_pendente .carregarMais").insertAfter("#ava_container .itensGrupo.convite_pendente > div:last"), $("#ava_container .itensGrupo.convite_pendente .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.convite_pendente .carregarMais").html(txtBackup)) : d ? ($("#ava_container .itensGrupo.convite_pendente .carregarMais").insertAfter("#ava_container .itensGrupo.convite_pendente > div:last"), $("#ava_container .itensGrupo.convite_pendente .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.convite_pendente .carregarMais").html(txtBackup)) : 16 == c && ($("#ava_container .itensGrupo.convite_pendente .carregarMais").insertAfter("#ava_container .itensGrupo.convite_pendente > div:last"), $("#ava_container .itensGrupo.convite_pendente .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.convite_pendente .carregarMais").html(txtBackup))
                } else $(".convite_pendente").hide();
                if (null != i) {
                    $(".moderado_por_voce").is(":visible") || $(".moderado_por_voce").show();
                    var c = i.length,
                        p = 0,
                        d = !1;
                    null == e && null == r ? p = c > 8 && 16 > c ? c : 16 == c ? c - 1 : 8 == c ? 8 : c : 9 == c ? (p = 7, d = !0) : p = 8 == c ? 8 : 16 == c ? c - 1 : c, $(".moderado_por_voce > div").remove(), $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").hide();
                    for (var u = 0; p > u; u++) montaCarteirinhaHomeGrupo(i[u], "modera");
                    null == e && null == r ? 16 == c && ($("#ava_container .itensGrupo.moderado_por_voce .carregarMais").insertAfter("#ava_container .itensGrupo.moderado_por_voce > div:last"), $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").html(txtBackup)) : d ? ($("#ava_container .itensGrupo.moderado_por_voce .carregarMais").insertAfter("#ava_container .itensGrupo.moderado_por_voce > div:last"), $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").html(txtBackup)) : 16 == c && ($("#ava_container .itensGrupo.moderado_por_voce .carregarMais").insertAfter("#ava_container .itensGrupo.moderado_por_voce > div:last"), $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.moderado_por_voce .carregarMais").html(txtBackup))
                } else $(".moderado_por_voce").hide();
                if (null != n) {
                    0 == $(".desativados").size() && montarContainerGrupo("Desativados", "desativados"), $("#ava_wrap #ava_container .itensGrupo.desativados .carregarMais").bind(tpClickGrupo, carregarMaisGrupos), $(".desativados").is(":visible") || $(".desativados").show();
                    var c = n.length,
                        p = 0,
                        d = !1;
                    null == i ? p = c > 8 && 16 > c ? c : 16 == c ? c - 1 : 8 == c ? 8 : c : 9 == c ? (p = 7, d = !0) : p = 8 == c ? 8 : 16 == c ? c - 1 : c, $(".desativados > div").remove(), $("#ava_container .itensGrupo.desativados .carregarMais").hide();
                    for (var u = 0; p > u; u++) montaCarteirinhaHomeGrupo(n[u], "desativados");
                    null == i ? 16 == c && ($("#ava_container .itensGrupo.desativados .carregarMais").insertAfter("#ava_container .itensGrupo.desativados > div:last"), $("#ava_container .itensGrupo.desativados .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.desativados .carregarMais").html(txtBackup)) : d ? ($("#ava_container .itensGrupo.desativados .carregarMais").insertAfter("#ava_container .itensGrupo.desativados > div:last"), $("#ava_container .itensGrupo.desativados .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.desativados .carregarMais").html(txtBackup)) : 16 == c && ($("#ava_container .itensGrupo.desativados .carregarMais").insertAfter("#ava_container .itensGrupo.desativados > div:last"), $("#ava_container .itensGrupo.desativados .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.desativados .carregarMais").html(txtBackup))
                } else $(".desativados").hide();
                if (null != t) {
                    $(".descubra_novos_grupos").is(":visible") || $(".descubra_novos_grupos").show();
                    var c = t.length,
                        p = 0;
                    p = 10 == c ? c - 1 : c, $(".descubra_novos_grupos > div").remove(), $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").hide();
                    for (var u = 0; p > u; u++) montaCarteirinhaHomeGrupo(t[u], "descubraNovosGrupos");
                    10 == c && ($("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").insertAfter("#ava_container .itensGrupo.descubra_novos_grupos > div:last"), $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").show(), "undefined" != typeof txtBackup && $("#ava_container .itensGrupo.descubra_novos_grupos .carregarMais").html(txtBackup))
                } else $(".descubra_novos_grupos").hide();
                $.fancybox.hideLoading()
            },
            error: function(a) {
                $.fancybox.hideLoading()
            }
        })
    }), $("#ava_wrap #ava_container .itensGrupo.moderado_por_voce .carregarMais, #ava_wrap #ava_container .itensGrupo.voce_participa .carregarMais, #ava_wrap #ava_container .itensGrupo.convite_pendente .carregarMais, #ava_wrap #ava_container .itensGrupo.descubra_novos_grupos .carregarMais").bind(tpClickGrupo, carregarMaisGrupos)
});
var strTermoGrupo = "",
    strTermoGrupoNovos = "",
    strTipo = "",
    strEstado = "",
    selecionados = new Array,
    intInicioGrupo = 2,
    atualizouUsuariosSeletor = !1;