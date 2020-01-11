function verificaEventos(a, e, t, i) {
    var n = a.length,
        r = new Array,
        o = new Array;
    $.ajax({
        type: "POST",
        url: "/AVA/Agenda/Escola/ContadorEventoDataEscola/?data=" + a + "&idCategoria=" + e + "&idEscola=" + t,
        async: !0,
        success: function(a) {
            var e = $(".ui-datepicker-today").attr("databr");
            o = a.split(";"), n = o.length - 1;
            for (var t = 0; n > t; t++) {
                r = o[t].split(",");
                var s = "avaCalendario_" + r[1],
                    d = parseInt(r[0]),
                    l = r[2],
                    c = r[1];
                if (d > 0) {
                    var v = '<div class="agenda_BoxContador" style="position:absolute; margin:auto;">';
                    if (d > 2) {
                        for ($i = 0; $i < 1; $i++) v += '<div class="agenda_countEvento" style=""></div>';
                        v += '<strong class="mais_eventos_agenda">+</strong>'
                    } else
                        for ($i = 0; $i < d; $i++) v += '<div class="agenda_countEvento" style=""></div>';
                    if (v += "</div>", $(".ui-state-default").each(function() {
                            if ($(this).attr("ref") == s) {
                                $(this).append(v);
                                var a = "";
                                if (l.length > 0) {
                                    for (var e = l.split("-"), t = 0; t < e.length; t++) a = 0 == t ? "Continuo_" + e[t] : a + ",Continuo_" + e[t];
                                    $(this).attr("eventoID", a)
                                }
                            }
                        }), c == e && "undefined" !== i && 1 == i) {
                        var g = "";
                        g = d > 1 ? " eventos para hoje." : " evento para hoje.";
                        var u = $("<div>");
                        u.addClass("agendados_data").text(g);
                        var h = $("<strong>");
                        h.text(d);
                        var f = $("<a>");
                        f.addClass("fechar_agendados").attr("title", "fechar").html("&nbsp;");
                        var p = $("<div>");
                        p.addClass("ponta_aviso_agenda"), u.prepend(h).append(f).append(p), $(".ui-datepicker-today").find(".agenda_BoxContador").append(u), setTimeout(function() {
                            u.is(":visible") && u.fadeOut("slow")
                        }, 5e3)
                    }
                }
            }
        },
        error: function(a) {}
    })
}

function fecharBalaoQtdEventos(a) {
    a.hide()
}

function getDates(a) {
    for (var e, t = a, i = new Date(t[0]).getTime(), n = new Date(t[t.length - 1]).getTime(), r = [], o = i; n >= o;) e = new Date(o), dia = e.getDate(), mes = e.getMonth() + 1, dia < 10 && (dia = "0" + dia), mes < 10 && (mes = "0" + mes), r.push(dia + "/" + mes + "/" + e.getFullYear()), o = new Date(o), o.setDate(o.getDate() + 1), o = o.getTime();
    return r
}

function mudarRel(a, e, t, n) {
    for (tamanho = a.length, i = 0; i < tamanho; i++) a[i].attr("rel", "/AVA/Agenda/Escola/VerificaEventoData?data=" + e[i] + "&idCategoria=" + t + "&idEscola=" + n), a[i].attr("href", "/AVA/Agenda/Escola/VerificaEventoData?data=" + e[i] + "&idCategoria=" + t + "&idEscola=" + n)
}
var url;
url = location.href.toLowerCase(), jQuery(function(a) {
    a("#calendar1").wijcalendar({
        culture: "pt-BR"
    });
    var e = (new Array, new Array);
    a(".bcs1").on("mouseenter", ".agd_evtContinuo", function(t) {
        var i = a(this).attr("id-evento");
        a("#calendar1").find(".avaJCalendario").each(function() {
            void 0 !== a(this).attr("eventoid") && -1 != a(this).attr("eventoid").indexOf("Continuo_" + i) && (a(this).css("background-color", "#e2e2e2"), a(this).hasClass("ui-state-highlight") && (e[0] = "ui-datepicker-today", e[1] = "ui-state-highlight", e[2] = a(this), a(this).parent().removeClass("ui-datepicker-today"), a(this).removeClass("ui-state-highlight")))
        })
    }).on("mouseleave", ".agd_evtContinuo", function(t) {
        var i = a(this).attr("id-evento");
        a("#calendar1").find(".avaJCalendario").each(function() {
            void 0 !== a(this).attr("eventoid") && -1 != a(this).attr("eventoid").indexOf("Continuo_" + i) && (a(this).css("background-color", ""), e.length > 0 && a(this).html() == e[2].html() && (a(this).addClass(e[1]), a(this).parent().addClass(e[0]), e = []))
        })
    }), a(".avaJCalendario").live("click", function(e) {
        if (e.preventDefault(), a(e.target).hasClass("fechar_agendados")) return void a(e.target).closest(".agendados_data").hide();
        a(e.target).closest(".agendados_data").hasClass("agendados_data") && a(e.target).closest(".agendados_data").is(":visible") && a(e.target).closest(".agendados_data").hide(), a(".avaJCalendario").removeClass("ui-state-active"), a(this).addClass("ui-state-active");
        var t = a("<div>");
        t.addClass("box_agenda").addClass("visualizar_evento");
        var i = a("<ul>"),
            n = a("<li>");
        n.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">'), n.addClass("carregando_center"), i.append(n), t.append(i), a("#eventos").empty().append(t);
        var r = a(this).attr("rel"),
            o = r.split("?"),
            s = o[0],
            d = o[1];
        a.ajax({
            url: s,
            data: d,
            type: "POST",
            success: function(e) {
                a("#eventos").empty().html(e);
                a(".agenda_lista_scroll_externo");
                a(".agenda_lista_scroll_externo").scroll(), a(".agenda_lista_scroll_externo").css("overflow", "auto").css("height", "100px")
            },
            error: function(a) {
                console.debug(a.responseText), n.empty().html("Erro ao carregar"), setTimeout(function() {
                    t.fadeOut("fast")
                }, 3e3)
            }
        });
        var l = a(this).parent(),
            c = l.attr("databr"),
            v = new Date,
            g = v.getDate();
        10 > g && (g = "0" + g);
        var u = v.getMonth() + 1,
            h = v.getFullYear(),
            f = g + "/" + u + "/" + h;
        c == f ? l.addClass("ui-datepicker-today") : a("#calendar1").find(".ui-datepicker-today").removeClass("ui-datepicker-today")
    }), a("#eventos").on("click", ".proximo_dia_agenda", function(e) {
        e.preventDefault();
        var t = a("<li>");
        t.addClass("carregando_center"), t.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">'), a(".visualizar_evento").find("ul").not(".filtro_agenda_home").empty().append(t);
        var i = a(".ui-state-active");
        i.parent().next().size() > 0 ? i.parent().next().children("a:first").trigger("click") : i.parent().parent().next().children("td:first").children("a:first").trigger("click")
    }), a("#eventos").on("click", ".anterior_dia_agenda", function(e) {
        e.preventDefault();
        var t = a("<li>");
        t.addClass("carregando_center"), t.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">'), a(".visualizar_evento").find("ul").not(".filtro_agenda_home").empty().append(t);
        var i = a(".ui-state-active");
        i.parent().prev().size() > 0 ? i.parent().prev().children("a:first").trigger("click") : i.parent().parent().prev().children("td:last").children("a:first").trigger("click")
    }), a("#eventos").on("click", ".fechar_agenda_externa", function(e) {
        e.preventDefault(), a(".visualizar_evento").hide().remove(), a(".ui-state-active").removeClass("ui-state-active")
    })
});