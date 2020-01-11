var url;
url = location.href.toLowerCase();
var seletorAvaAgenda = 0;
var dataRealAux = dataReal.split("/")[2] + "/" + dataReal.split("/")[1] + "/" + dataReal.split("/")[0];
var dataRealAux2 = dataReal.split("/")[0] + "-" + dataReal.split("/")[1] + "-" + dataReal.split("/")[2];
var tpClickAgenda = "click";
var g_Filhos = [];
var g_PessoaSelecionada = 0;

var g_Date = new Date().getMonth() ;

var intOne = undefined;
var intTwo = undefined;
var intThree = undefined;

function carregaAgenda() {
    
    var c = parseInt($("body").data("bolclube"));
    //Grupo
    if (_projeto == "grupo" && c == 0) {

        console.log('Grupo');
        
        var a = "";
        if ($(location).attr("href").toLowerCase().indexOf("grupo/home/post") > 0) {
            a = $("#strIdLinkPermanente").val()
        } else {
            a = idUsuarioPublico
        }
        $.ajax({
            type: "POST",
            url: "/AVA/Grupo/Home/VerificaAcessoByLink/" + a,
            success: function(d) {
                if (d == "True") {
                    $("#agenda_reduzida").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
                    $("#ava_barralateral-direita  .bcs1 header h1").text("Agenda do Grupo");
                    $("#dadosAgenda").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
                    $.ajax({
                        url: "/AVA/Agenda/Grupo/Index/" + a,
                        success: function(e) {
                            $("#dadosAgenda").html(e);
                            $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                            $("#calendar1").wijcalendar({
                                culture: "pt-BR",
                                displayDate: new Date(dataReal)
                            });
                            $(".boxAgendaReduzida").show();
                            adequaAgendaNovaHome()
                        },
                        error: function(e) {
                            if (e.status != 0) {
                                console.debug("Ocorreu um erro na busca da agenda")
                            }
                        }
                    })
                } else {
                    $(".bcs1, .bcs5, .boxAgendaReduzida").hide()
                }
            },
            error: function(d) {
                console.debug(d)
            }
        })
    } 
    else {
        //Turma
        if (_projeto == "turma") {

            console.log('Turma');
            
            $("#agenda_reduzida").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
            $("#ava_barralateral-direita  .bcs1 header h1").text("AGENDA DA TURMA");
            $("#dadosAgenda").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
            var a = $("#strLinkPermanente").val();
            if ($(".boxAgendaReduzida").length) {
                $.ajax({
                    url: "/AVA/Agenda/Grupo/Index/" + a,
                    success: function(d) {
                        $("#dadosAgenda").html(d);
                        $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                        $("#calendar1").wijcalendar({
                            culture: "pt-BR",
                            displayDate: new Date(dataReal)
                        });
                        adequaAgendaNovaHome()
                    },
                    error: function(d) {
                        if (d.status != 0) {
                            console.debug("Ocorreu um erro na busca da agenda")
                        }
                    }
                })
            }
        } 
        else {

            
            //Perfil
            if (url.indexOf("/perfil/home/index/") == -1) {

            console.log('AGENBDA');
                
                var b = "MINHA AGENDA";
                if (location.href.toLowerCase().indexOf("/ava/pagina/") > 0) {
                    b = "AGENDA DE PROJETOS";
                    if ($("#idPagina").val() > 2) {
                        b = "AGENDA DA ESCOLA"
                    }
                }
                $("#agenda_reduzida").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
                $("#ava_barralateral-direita  .bcs1 header h1").text(b);
                $("#dadosAgenda").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
                $.ajax({
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    url: "/AVA/Agenda",
                    data: {
                        strURL: location.href
                    },
                    success: function(d) {

                            //  console.log('Data Real  '+dataReal);
                            // console.log(d);
                             
                        
                        $("#dadosAgenda").html(d);
                        $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                        $("#calendar1").wijcalendar({
                            culture: "pt-BR",
                            displayDate: new Date(dataReal)
                        });
                        $(".boxAgendaReduzida").show();
                        adequaAgendaNovaHome();
                        mostraFilhos(0);
                    },
                    error: function(d) {
                        if (d.status != 0) {
                            console.debug("Ocorreu um erro na busca da agenda")
                        }
                    }
                })
            }   
            else {
            console.log('Else');
                
                $(".bcs1, .boxAgendaReduzida").hide()
            }
        }
    }
}

function contarTotalPessoas() {
    var d = 0;
    var e = [];
    for (c = 0; c < arrayEntidadeAux.length; c++) {
        for (a = 0; a < arrayEntidadeAux[c].usuarios.length; a++) {
            e.push(parseInt(arrayEntidadeAux[c].usuarios[a].idUsuario))
        }
    }
    for (c = 0; c < arrayUsuarioAux.length; c++) {
        e.push(parseInt(arrayUsuarioAux[c].idUsuario))
    }
    idUsuariosContadorFinal = [];
    if (e.length > 0) {
        for (var c in e) {
            var b = false;
            for (var a in idUsuariosContadorFinal) {
                if (idUsuariosContadorFinal[a] == e[c]) {
                    b = true;
                    break
                }
            }
            if (!b) {
                idUsuariosContadorFinal.push(e[c])
            }
        }
        d = idUsuariosContadorFinal.length
    }
    return d
}

function alterarQtdUsuariosLabelLajotinha(e) {
    var f = contarTotalPessoas();
    var b = "";
    if (f > 1) {
        b = f + " pessoas selecionadas"
    } else {
        b = f + " pessoa selecionada"
    }
    $destinoLajotinhaCustomizada = $(e);
    var c = document.location.href.toLowerCase();
    var a = c.indexOf("/ava/mural");
    var d = "<div class='seletor_item agenda'><a href='javascript:void(0)' id='ver_pessoas'>" + b + "</a><a href='javascript:void(0);' onclick='removeSelecionadosAgenda(); return false;' class='opcao_excluir' alt='Excluir da lista'></a></div>";
    if (a == -1) {
        d = "<div class='lajotinha'><a href='javascript:void(0)' id='ver_pessoas'><i class='icon_lajotinha aluno_icon'></i>" + b + "</a><a href='javascript:void(0);' class='excluir_lajotinha FontAwesome' alt='Excluir da lista'></a></div>"
    }
    if (e == ".compartilhamento_link") {
        var h = ".seletor_lista";
        var g = ".seletor_item";
        if (a == -1) {
            h = ".listaLajotinhas";
            g = ".lajotinha"
        }
        $destinoLajotinhaCustomizada = $(h, $destinoLajotinhaCustomizada.next());
        $(g, $destinoLajotinhaCustomizada).remove();
        if (f > 0) {
            $destinoLajotinhaCustomizada.prepend(d);
            $destinoLajotinhaCustomizada.show()
        }
    } else {
        if (f <= 0) {
            $destinoLajotinhaCustomizada.html("");
            $destinoLajotinhaCustomizada.hide()
        } else {
            $destinoLajotinhaCustomizada.html(d);
            $destinoLajotinhaCustomizada.show()
        }
    }
}
var arrayUsuarioAux = new Array();
var arrayEntidadeAux = new Array();
var classSeletor;

function loadSeletor(c, b) {
    if (_projeto != "pagina") {
        classSeletor = c;
        if ($(c).AvaSelector("bolInstanciado")) {
            $(c).AvaSelector("limparUsuarios")
        }
        if (b) {
            $(c).html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
            $.ajax({
                url: "/AVA/Agenda/Home/GetUsuariosEvento/?idEvento=" + b,
                type: "GET",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                dataType: "json",
                success: function(e) {
                    arrayUsuarioAux = e.usuarios;
                    arrayEntidadeAux = e.grupos;
                    var d = {
                        bolAluno: true,
                        bolResponsavel: false,
                        bolEscondeTituloExterno: true,
                        bolLajota: true,
                        bolSeletorFinalizar: false,
                        bolSelecionarTodos: true,
                        botaoConclusao: $("#salvarNovoAgenda"),
                        detalhesGruposSeletor: true,
                        carregarUsuarios: arrayUsuarioAux,
                        carregarGrupos: arrayEntidadeAux,
                        bolAtualizarLajotaQuandoCancelar: false,
                        insertLajota: function(f, h) {
                            arrayUsuarioAux = f;
                            arrayEntidadeAux = h;
                            validarEdicaoNovaAgenda()
                        },
                        usuarioGrupoAdicionado: function(f, h) {
                            arrayUsuarioAux = f;
                            arrayEntidadeAux = h;
                            alterarQtdUsuariosLabelLajotinha(".compartilhamento_link")
                        },
                        cancelarInsertLajota: function(f, h) {
                            arrayUsuarioAux = f;
                            arrayEntidadeAux = h;
                            alterarQtdUsuariosLabelLajotinha(".compartilhamento_link")
                        }
                    };
                    if (!$(c).AvaSelector("bolInstanciado")) {
                        $(c).AvaSelector(d)
                    }
                },
                error: function(d) {
                    console.log("Erro ao buscar usuarios do evento")
                }
            })
        } else {
            arrayEntidadeAux = new Array();
            arrayUsuarioAux = new Array();
            var a = {
                bolAluno: true,
                bolResponsavel: false,
                bolEscondeTituloExterno: true,
                bolLajota: true,
                bolSeletorFinalizar: false,
                bolSelecionarTodos: true,
                botaoConclusao: $("#salvarNovoAgenda"),
                detalhesGruposSeletor: true,
                bolAtualizarLajotaQuandoCancelar: false,
                insertLajota: function(d, e) {
                    arrayUsuarioAux = d;
                    arrayEntidadeAux = e;
                    validarEdicaoNovaAgenda()
                },
                usuarioGrupoAdicionado: function(d, e) {
                    arrayUsuarioAux = d;
                    arrayEntidadeAux = e;
                    alterarQtdUsuariosLabelLajotinha(".compartilhamento_link")
                },
                cancelarInsertLajota: function(d, e) {
                    arrayUsuarioAux = d;
                    arrayEntidadeAux = e;
                    alterarQtdUsuariosLabelLajotinha(".compartilhamento_link")
                }
            };
            if (!$(c).AvaSelector("bolInstanciado")) {
                $(c).AvaSelector(a)
            } else {
                $(c).AvaSelector("limparUsuarios")
            }
        }
    }
}

jQuery(function(d) {
    d(".excluir_lajotinha").live("click", function() {
        arrayEntidadeAux = new Array();
        arrayUsuarioAux = new Array();
        alterarQtdUsuariosLabelLajotinha(".compartilhamento_link");
        d(classSeletor).AvaSelector("limparUsuarios")
    });
    d("#ver_pessoas").live("click", function() {
    
        d(".seletor_adicionar").click()
    });
    if (Modernizr.touch) {
        tpClickAgenda = "touchstart"
    }
    var c = new Array();
    d(".meusChecksResult").live("click", function(o) {
        console.log('Dirddddd');
        
        d(".meusChecksResult").attr("disabled", "disabled");
        var k = "";
        d(".filtro_agenda_home.filtro_box_agenda").find(":checked").each(function() {
            k = k + d(this).val() + ","
        });
        if (k == "" || k.lenght == 0) {
            d(".filtro_agenda_home.filtro_box_agenda li").attr("checked", "checked")
        }
        var q = k.length;
        k = k.substring(0, q - 1);
        var m = d(".ui-state-active");
        var n = d("<div>");
        n.addClass("box_agenda").addClass("visualizar_evento");
        var p = d("<ul>");
        var h = d("<li>");
        h.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
        h.addClass("carregando_center");
        p.append(h);
        n.append(p);
        d("#dadosAuxAgenda").empty().append(n);
        var l = {
            data: m.parent().attr("databr"),
            idCategoria: k
        };
        if (_projeto == "turma") {
            l.idCategoria = 4;
            l.bolMostrarFiltro = false;
            l.idTurma = d("#idTurma").val()
        }
        if (_projeto == "pagina") {
            l.idCategoria = 2;
            l.bolMostrarFiltro = false
        }

        console.log('Estamos aqui');

        d.ajax({
            url: "/AVA/Agenda/Home/VerificaEventoData",
            type: "GET",
            data: l,
            success: function(r) {
                
                d("#dadosAuxAgenda").empty().html(r);
                var s = d(".agenda_lista_scroll");
                if (s.find("ul").children().size() > 1) {
                    d(".agenda_lista_scroll").addClass("maisumevento").css("height", "143px").mCustomScrollbar({
                        scrollButtons: {
                            enable: true
                        }
                    })
                }
                d(".bcs1").find(".filtro_box_agenda").find("input[type=checkbox]").each(function() {
                    var t = d(this);
                    if (k.indexOf(t.val()) > -1) {
                        t.attr("checked", "checked")
                    }
                });
                adequaAgendaNovaHome()
            },
            error: function(r) {
                adequaAgendaNovaHome()
            }
        })
    });
    d(".meusChecks").live("click", function() {
        console.log('adsdasd');
        
        d(".meusChecks").attr("disabled", "disabled");
        var h = "";
        d(".filtro_agenda_home").not(".filtro_box_agenda").find(":checked").each(function() {
            h = h + d(this).val() + ","
        });
        if (h == "" || h.lenght == 0) {
            d(".filtro_agenda_home li").attr("checked", "checked")
        }
        var s = h.length;
        h = h.substring(0, s - 1);
        d(".agenda_BoxContador").empty().remove();
        var n = 0;
        var m = new Array();
        var r = new Array();
        d(".ui-state-default").each(function() {
            if (d(this).attr("ref") != undefined) {
                r[n - 1] = d(this);
                valor = d(this).attr("ref").split("_");
                valor = valor[1].split("/");
                if (n == 1) {
                    m[0] = valor[1] + "/" + valor[0] + "/" + valor[2];
                    m[1] = valor[1] + "/" + valor[0] + "/" + valor[2]
                } else {
                    m[1] = valor[1] + "/" + valor[0] + "/" + valor[2]
                }
            }
            n++
        });
        c = getDates(m);

        intOne = r;
        intTwo = c;
        intThree = h;

        mudarRel(r, c, h);
        var l = d(".avaJCalendario:first").parent().attr("dataus");
        var p = d(".avaJCalendario:last").parent().attr("dataus");
        var q = d(".ui-datepicker-title").attr("mes");
        var k = d(".ui-datepicker-title").attr("ano");
        if (l == "" || p == "" || q == "" || k == "") {
            setTimeout(getDadosDataEvento(), 300)
        }
        console.log('VD1');
        
        verificaEventos(l, p, q, k, h, true);
        var o = d("#calendar1").find(".ui-state-active").attr("rel");
        if (o === undefined) {
            o = d(".ui-datepicker-today").find("a").attr("rel")
        }
        if (o != undefined) {
            d.post(o, function(t) {
                d("#descricaoDia_EventoAgenda").empty();
                d("#descricaoDia_EventoAgenda").html(t);
                d(".meusChecks").removeAttr("disabled")
            })
        } else {
            d("#descricaoDia_EventoAgenda").empty();
            d("#descricaoDia_EventoAgenda").html("Nenhum evento encontrado para esta data.");
            d(".meusChecks").removeAttr("disabled")
        }
        if (d(".visualizar_evento").is(":visible")) {
            d(".visualizar_evento").hide();
            d(".ui-state-active:first").click()
        }
    });
    carregaAgenda();
    var g = new Array();
    var e = null;
    d(".bcs1").on("mouseenter", ".agd_evtContinuo", function(k) {
        var h = d(this).attr("id-evento");
        e = h;
        d("#calendar1").find(".avaJCalendario").each(function() {
            if (d(this).attr("eventoid") !== undefined && d(this).attr("eventoid").indexOf("Continuo_" + h) != -1) {
                d(this).css("background-color", "#e2e2e2");
                if (d(this).hasClass("ui-state-highlight")) {
                    g[0] = "ui-datepicker-today";
                    g[1] = "ui-state-highlight";
                    g[2] = d(this);
                    d(this).parent().removeClass("ui-datepicker-today");
                    d(this).removeClass("ui-state-highlight")
                }
            }
        })
    }).on("mouseleave", ".agd_evtContinuo", function(k) {
        var h = d(this).attr("id-evento");
        d("#calendar1").find(".avaJCalendario").each(function() {
            if (d(this).attr("eventoid") !== undefined && d(this).attr("eventoid").indexOf("Continuo_" + h) != -1) {
                d(this).css("background-color", "");
                if (g.length > 0 && d(this).html() == g[2].html()) {
                    d(this).addClass(g[1]);
                    d(this).parent().addClass(g[0]);
                    g = []
                }
            }
        })
    });
    d("body").on("click", ".editar_evento_agenda", function(n) {
        n.preventDefault();
        var o = d(".box_agenda").find("ul:last");
        var m = d(this).closest("li").attr("id-evento");
        var h = "";
        var k = {};
        var l = false;
        if (d(this).closest(".box_agenda").hasClass("eventos_grupo")) {
            h = "/ava/agenda/grupo/CriarEditarAgendaGrupo/";
            k = {
                strLinkPermanente: idUsuarioPublico,
                idEvento: m
            };
            l = true
        } else {
            h = "/ava/agenda/home/CriarEditarNovaAgenda/";
            k = {
                idEvento: m
            };
            if (_projeto == "turma") {
                k.idTurmaGrupoDeTurma = d("#idTurma").val();
                k.idGrupoGrupoDeTurma = d("#idGrupo").val()
            }
            if (_projeto == "pagina") {
                k.idPagina = d("#idPagina").val()
            }
        }
        o.empty().html('<li><img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif"></li>');
        if (m > 0) {
            d.ajax({
                url: h,
                data: k,
                type: "GET",
                success: function(p) {
                    d("body").prepend('<div class="block_edicao_agenda" style="display: none;"></div>');
                    if (d.browser.msie && parseInt(d.browser.version) < 9) {
                        d(".block_edicao_agenda").fadeIn("fast", function() {
                            d(".block_edicao_agenda").css("filter", "alpha(opacity=80)")
                        })
                    } else {
                        d(".block_edicao_agenda").fadeIn("fast")
                    }
                    d("#dadosAuxAgenda").empty().html(p);
                    d("#dtmInicio").datepicker({
                        numberOfMonths: 1,
                        dateFormat: "dd/mm/yy",
                        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                        onSelect: function(s) {
                            d("#dtmFim").datepicker("option", "minDate", s)
                        }
                    });
                    d("#dtmFim").datepicker({
                        numberOfMonths: 1,
                        dateFormat: "dd/mm/yy",
                        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                        onSelect: function(s) {
                            d("#dtmInicio").datepicker("option", "maxDate", s)
                        }
                    });
                    d("#dtmInicio").setMask("date");
                    d("#dtmFim").setMask("date");
                    d(".criar_evento input#horaInicio").setMask("29:59").timepicker({
                        myPosition: "right top",
                        atPosition: "right bottom"
                    });
                    d(".criar_evento input#horaFim").setMask("29:59").timepicker({
                        myPosition: "right top",
                        atPosition: "right bottom"
                    });
                    var r = [];
                    var q = 0;
                    d(".bcs1").find(".compartilhamento").find(".small").each(function(s) {
                        r[q] = d(this);
                        q++
                    });
                    if (!l && _projeto != "turma" && _projeto != "pagina") {
                        d(".dialogo.agendaPersonalizada").seletorAVA({
                            turma: true,
                            attachBox: r
                        })
                    } else {
                        if (_projeto == "pagina") {
                            if (d("#idPagina").val() == "2") {
                                d(".dialogo.agendaPersonalizada").seletorAVA({
                                    turma: true,
                                    attachBox: r
                                })
                            }
                        }
                    }
                    d(".avaJCalendario").css("background-color", "");
                    d("#calendar1").find(".avaJCalendario").each(function() {
                        if (d(this).attr("eventoid") !== undefined && d(this).attr("eventoid").indexOf("Continuo_" + m) != -1) {
                            if (g.length > 0 && d(this).html() == g[2].html()) {
                                d(this).addClass(g[1]);
                                d(this).parent().addClass(g[0]);
                                g = []
                            }
                        }
                    });
                    if (_projeto != "turma") {
                        loadSeletor(".compartilhamento", m)
                    }
                },
                error: function(p) {
                    console.debug(p);
                    o.empty().html("<li>Erro ao carregar</li>")
                }
            })
        } else {
            o.empty().html("<li>Erro ao carregar</li>")
        }
    });
    d(".bcs1").on("click", ".excluir_evento_agenda", function(n) {
        n.preventDefault();
        var h = "";
        if (d(this).closest(".box_agenda").hasClass("eventos_grupo")) {
            h = "/ava/agenda/grupo/ExcluirEvento/"
        } else {
            h = "/ava/agenda/home/ExcluirEvento/"
        }
        var k = d(this).closest("li").clone();
        var m = d(this).closest("li").attr("id-evento");
        var l = d(this).closest("li");
        d(this).closest("li").empty().html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
        d.ajax({
            url: h,
            type: "GET",
            data: {
                idEvento: m
            },
            success: function(t) {
                l.slideUp("slow", function() {
                    d(this).remove()
                });
                var o = "";
                d(".filtro_agenda_home").not(".filtro_box_agenda").find(":checked").each(function() {
                    o = o + d(this).val() + ","
                });
                if (o == "" || o.lenght == 0) {
                    d(".filtro_agenda_home li").attr("checked", "checked")
                }
                var z = o.length;
                o = o.substring(0, z - 1);
                var x = o;
                if (_projeto == "turma") {
                    x = 4
                }
                var r = null;
                var u = 0;
                var s = new Array();
                d(".avaJCalendario").css("background-color", "");
                d("#calendar1").find(".avaJCalendario").each(function() {
                    if (d(this).attr("eventoid") !== undefined && d(this).attr("eventoid").indexOf("Continuo_" + e) != -1) {
                        d(this).css("background-color", "");
                        if (g.length > 0 && d(this).html() == g[2].html()) {
                            d(this).addClass(g[1]);
                            d(this).parent().addClass(g[0]);
                            g = []
                        }
                    }
                });
                var q = d(".avaJCalendario:first").parent().attr("dataus");
                var w = d(".avaJCalendario:last").parent().attr("dataus");
                var y = d(".ui-datepicker-title").attr("mes");
                var p = d(".ui-datepicker-title").attr("ano");
                d(".agenda_BoxContador").empty().remove();
                d(".avaJCalendario").attr("eventoid", "");
                if (q == "" || w == "" || y == "" || p == "") {
                    setTimeout(getDadosDataEvento(), 300)
                }
                var v = d(".agenda_lista_scroll");
                if ((v.find("ul").children().size() == 1)) {
                    if ((v.find("ul").children().find("img"))) {
                        d(".agenda_lista_scroll").html("<span class='agenda_sem_eventos'>Não há evento cadastrado para a data selecionada.</span>")
                    }
                }
                console.log('VD2');
                verificaEventos(q, w, y, p, x, true)
            },
            error: function(o) {
                console.debug(o);
                l.empty().text("Erro ao excluir");
                setTimeout(function() {
                    l.replaceWith(k);
                    k = null
                }, 3000)
            }
        })
    });
    d(".avaJCalendario").live("click", function(p) {
        console.log('AI');
        p.preventDefault();
        if (d(p.target).hasClass("fechar_agendados")) {
            d(p.target).closest(".agendados_data").hide();
            return
        } else {
            if (d(p.target).closest(".agendados_data").hasClass("agendados_data") && d(p.target).closest(".agendados_data").is(":visible")) {
                d(p.target).closest(".agendados_data").hide()
            }
            d(".avaJCalendario").removeClass("ui-state-active");
            d(this).addClass("ui-state-active");
            var n = d("<div>");
            n.addClass("box_agenda").addClass("visualizar_evento");
            var q = d("<ul>");
            var l = d("<li>");
            l.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
            l.addClass("carregando_center");
            q.append(l);
            n.append(q);
            d("#dadosAuxAgenda").empty().append(n);
            var w = d(this).attr("rel");
            var x = w.split("?");
            
            // /AVA/Agenda/Home/VerificaEventoData
            var h = x[0];
            
            // data=23/08/2018&idCategoria=1,2,3,4,5
            var s = x[1];

            var idUserSelected = 0 ;
            
            try{
                if( eResponsavel == true   ){
                    idUserSelected =  $(".filho_selecionado").attr('data-id');
                }
            }
            catch(err){
                idUserSelected = 0 ;
            }
            var ed = false;
            try{
                ed = eEducador;
            }
            catch(err){
                ed = false;
            }

            //alert(ed);

            d.ajax({
                url: h,
                data: s+ "&idPessoa="+idUserSelected+"&isProfessor="+ed,
                type: "POST",
                success: function(y) {

                        var dataData = s.split("&");
                        var validDate = dataData[0].split("=");       

                        var htmlT = '';

                        try{
                            if(listaAtividadesParaAgendar == undefined){
                                
                            }
                        }
                        catch(err){
                                listaAtividadesParaAgendar = [];
                        }

                        listaAtividadesParaAgendar = [];
                        

                        if(listaAtividadesParaAgendar.length >0){
                            listaAtividadesParaAgendar.forEach(  function( item , chave   ){

                            var date= item.strDtmInicio.split("/");
                            var dataInicial = new Date( date[2] , date[1] - 1 ,  date[0] );

                            var date2= item.strDtmFim.split("/");
                            var dataFinal = new Date( date2[2] , date2[1] - 1 ,  date2[0] );

                            var date3= validDate[1].split("/");
                            var compareDate = new Date( date3[2] , date3[1] - 1 ,  date3[0] );


                            if(     compareDate.getDate() >= dataInicial.getDate() && compareDate.getDate() <= dataFinal.getDate()        ){

                                var verificaDisp = verficaDispinibilidade( item.strDtmInicio , item.strDtmFim );


                                if(item.evaluationTypeId == 0){

                                    if( ! verificaDisp ){

                                        htmlT += ' <li  class="atvInativa" id='+item.strTitulo+chave+'>   '+

                                                 '<span class="bullet_cor" style="background-color: #ec976f"></span>'+
                                                            
                                                                '<span style="color: #ec976f">Tarefa</span>'+
                                                                
                                                                    '<small>Duração: '+ item.strDtmInicio+ '  a ' + item.strDtmFim +'</small>'+
                                                                    
                                                                    '<p>'+item.strTitulo+'</p>'+

                                                '</li>';
                                    }
                                    else{

                                        htmlT += ' <li onclick="abrirQuestaoEducacional(\'/AVA/Caminhos/Home/Player/'+item.idRotaAgendamento+'/'+item.idRota+'\')"  id='+item.strTitulo+chave+'>   '+

                                                 '<span class="bullet_cor" style="background-color: #ec976f"></span>'+
                                                            
                                                                '<span style="color: #ec976f">Tarefa</span>'+
                                                                
                                                                    '<small>Duração: '+ item.strDtmInicio+ '  a ' + item.strDtmFim +'</small>'+
                                                                    
                                                                    '<p>'+item.strTitulo+'</p>'+

                                                '</li>';

                                    }
                                }

                                else{

                                    if( ! verificaDisp ){

                                        htmlT += ' <li  class="atvInativa" id='+item.strTitulo+chave+'>   '+

                                                 '<span class="bullet_cor" style="background-color: #046b8f"></span>'+
                                                            
                                                                '<span style="color: #046b8f">Aprimora</span>'+
                                                                
                                                                    '<small>Duração: '+ item.strDtmInicio+ '  a ' + item.strDtmFim +'</small>'+
                                                                    
                                                                    '<p>'+item.strTitulo+'</p>'+

                                                '</li>';
                                    }
                                    else{

                                        htmlT += ' <li onclick="abrirQuestao(\''+item.base64+'\',\''+verificaDisp+'\')"  id='+item.strTitulo+chave+'>   '+

                                                 '<span class="bullet_cor" style="background-color: #046b8f"></span>'+
                                                            
                                                                '<span style="color: #046b8f">Aprimora</span>'+
                                                                
                                                                    '<small>Duração: '+ item.strDtmInicio+ '  a ' + item.strDtmFim +'</small>'+
                                                                    
                                                                    '<p>'+item.strTitulo+'</p>'+

                                                '</li>';

                                    }

                                }
                            }

                            });
                        }


                    d("#dadosAuxAgenda").empty().html(y);

                    if(htmlT == ''  ){
                        d(".agenda_lista_scroll ul").append(htmlT);
                    }
                    else{
                        d("#naoTemEventos").hide();
                        d(".agenda_lista_scroll ul").append(htmlT);   
                    }
                    var A = d(".agenda_lista_scroll");
                    if (A.find("ul").children().size() > 1) {
                        d(".agenda_lista_scroll").scroll();
                        d(".agenda_lista_scroll").css("overflow", "auto").css("height", "100px")
                    }
                    d(".bcs1").find("form:first ul").find("input[type=checkbox]:checked").each(function() {
                        var B = d(this).val();
                        d("#dadosAuxAgenda").find(".filtro_agenda_eventos").find("input[value=" + B + "]").attr("checked", "checked")
                    });
                    var z = d(".ui-state-active");
                    if (z.parent().next().size() > 0 && (z.parent().next().attr("daytype") == "2" || z.parent().next().attr("daytype") == "3")) {
                        d(".proximo_dia_agenda").hide()
                    }
                    if (z.parent().prev().size() > 0 && (z.parent().prev().attr("daytype") == "2" || z.parent().prev().attr("daytype") == "3")) {
                        d(".anterior_dia_agenda").hide()
                    }
                    adequaAgendaNovaHome()
                },
                error: function(y) {
                    console.debug(y.responseText);
                    l.empty().html("Erro ao carregar");
                    setTimeout(function() {
                        n.fadeOut("fast")
                    }, 3000)
                }
            });
            var t = d(this).parent();
            var k = t.attr("databr");
            var m = new Date();
            var v = m.getDate();
            if (v < 10) {
                v = "0" + v
            }
            var o = m.getMonth() + 1;
            var u = m.getFullYear();
            var r = v + "/" + o + "/" + u
        }
    });

    function b() {
        if (d("#estadoCriacaoAgenda").is(":visible")) {
            d("#estadoCriacaoAgenda").slideUp()
        }
        if (d("#spanStrUrlAgenda") !== undefined && d("#spanStrUrlAgenda") != null) {
            d("#spanStrUrlAgenda").slideUp()
        }
        if (d("#divTipoEventoAgenda") !== undefined && d("#divTipoEventoAgenda").size() > 0 && d("#divTipoEventoAgenda").is(":visible")) {
            d("#divTipoEventoAgenda").slideUp()
        }
    }

    function a() {
        if (d(".agendaPersonalizada").size() > 0 && d(".agendaPersonalizada").is(":visible")) {
            d(".agendaPersonalizada").slideUp()
        }
        if (!(d("#estadoCriacaoAgenda").is(":visible"))) {
            d("#estadoCriacaoAgenda").slideDown()
        }
        if (d("#spanStrUrlAgenda") !== undefined && d("#spanStrUrlAgenda").size() > 0 && !(d("#spanStrUrlAgenda").is(":visible"))) {
            d("#spanStrUrlAgenda").slideDown()
        }
    }

    function f() {
        if (d("#divTipoEventoAgenda") !== undefined && d("#divTipoEventoAgenda").size() > 0) {
            d("#divTipoEventoAgenda").slideUp()
        }
    }
    d("body").on("click", "input[name=paraCriarAgenda]", function() {
        try {
            var h = parseInt(d(this).val())
        } catch (k) {
            contole.log("erro ao recuperar opção do tipo de evento na agenda");
            return
        }
        switch (h) {
            case 1:
                b();
                if (d(".agendaPersonalizada").size() > 0 && d(".agendaPersonalizada").is(":visible")) {
                    d(".agendaPersonalizada").slideUp()
                }
                break;
            case 2:
                a();
                if (d("#divTipoEventoAgenda") !== undefined && d("#divTipoEventoAgenda").size() > 0) {
                    d("#divTipoEventoAgenda").slideDown()
                }
                break;
            case 3:
                a();
                f();
                break;
            case 4:
                b();
                if (!(d(".agendaPersonalizada").is(":visible"))) {
                    d(".agendaPersonalizada").slideDown()
                }
                break;
            default:
                f();
                if (d("#spanStrUrlAgenda") !== undefined && d("#spanStrUrlAgenda").size() > 0) {
                    d("#spanStrUrlAgenda").slideUp()
                }
                break
        }
    });
    d("body").on("click", "#cancelarCriarAgenda, #cancelarCriarAgendaGrupo", function() {
        if (parseInt(d("#idEventoAgenda").val()) > 0 && d(".block_edicao_agenda").size() > 0) {
            d(".block_edicao_agenda").fadeOut("fast", function() {
                d(this).remove()
            })
        }
        d("#msgErroCriarAgenda").hide();
        d("#strTituloAgenda").val("");
        d("#strUrlAgenda").val("");
        d(".criar_evento").hide();
        var l = dataReal.split(" ")[0];
        var m = l.split("/")[2] + "/" + l.split("/")[1] + "/" + 2099;
        l = l.split("/")[2] + "/" + l.split("/")[1] + "/" + l.split("/")[0];
        d("#dtmInicio").datepicker("option", "maxDate", m);
        d("#dtmInicio").datepicker("setDate", l);
        d("#dtmFim").datepicker("option", "minDate", l);
        d("#dtmFim").datepicker("setDate", l);
        var k = dataReal.split(" ")[1];
        var h = k.split(":")[0];
        proxHora = parseInt(h) + 1;
        fimHora = parseInt(h) + 2;
        if (parseInt(proxHora) >= 0 && parseInt(proxHora) <= 9) {
            proxHora = "0" + proxHora.toString()
        }
        if (parseInt(fimHora) >= 0 && parseInt(fimHora) <= 9) {
            fimHora = "0" + fimHora.toString()
        }
        if (proxHora == "24") {
            proxHora = "00"
        }
        if (fimHora == "25") {
            fimHora = "01"
        }
        d(".criar_evento input#horaInicio").val(proxHora + ":00");
        d(".criar_evento input#horaFim").val(fimHora + ":00")
    });
    d("body").on("click", "#criar_EventoAgenda", function() {
        d(this).empty().html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
        d("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        var k = d(this);
        var h = null;
        if (_projeto == "turma") {
            h = {
                idTurmaGrupoDeTurma: d("#idTurma").val(),
                idGrupoGrupoDeTurma: d("#idGrupo").val()
            }
        }
        if (_projeto == "pagina") {
            h = {
                idPagina: d("#idPagina").val()
            }
        }
        d.ajax({
            url: "/AVA/Agenda/Home/CriarEditarNovaAgenda",
            data: h,
            success: function(n) {
                d("#dadosAuxAgenda").html(n);
                d("#dtmInicio").datepicker({
                    numberOfMonths: 1,
                    dateFormat: "dd/mm/yy",
                    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    onSelect: function(o) {
                        d("#dtmFim").datepicker("option", "minDate", o)
                    }
                });
                d("#dtmFim").datepicker({
                    numberOfMonths: 1,
                    dateFormat: "dd/mm/yy",
                    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    onSelect: function(o) {
                        d("#dtmInicio").datepicker("option", "maxDate", o)
                    }
                });
                d("#dtmInicio").setMask("date");
                d("#dtmFim").setMask("date");
                d(".criar_evento input#horaInicio").setMask("29:59").timepicker({
                    myPosition: "right top",
                    atPosition: "right bottom"
                });
                d(".criar_evento input#horaFim").setMask("29:59").timepicker({
                    myPosition: "right top",
                    atPosition: "right bottom"
                });
                var l = new Date(dataReal);
                var m = d("#calendar1").find(".ui-state-active").parent().attr("databr");
                if (m === undefined) {
                    m = d("#calendar1").find(".ui-datepicker-today").attr("databr")
                }
                d("#dtmInicio").val(m);
                d("#dtmFim").val(m);
                proxHora = l.getHours() + 1;
                fimHora = l.getHours() + 2;
                proxHora = proxHora.toString();
                fimHora = fimHora.toString();
                if (parseInt(proxHora) >= 0 && parseInt(proxHora) <= 9) {
                    proxHora = "0" + proxHora.toString()
                }
                if (parseInt(fimHora) >= 0 && parseInt(fimHora) <= 9) {
                    fimHora = "0" + fimHora.toString()
                }
                if (proxHora == "24") {
                    proxHora = "00"
                }
                if (fimHora == "25") {
                    fimHora = "01"
                }
                d(".criar_evento input#horaInicio").val(proxHora + ":00");
                d(".criar_evento input#horaFim").val(fimHora + ":00");
                k.empty().text("Criar");
                if (_projeto != "turma") {
                    loadSeletor(".compartilhamento")
                }
            },
            error: function() {
                if (data.status != 0) {
                    console.debug("Ocorreu um erro na busca da agenda")
                }
                k.empty().text("Criar")
            }
        })
    });
    d("body").on("click", "#criar_EventoAgendaGrupo", function(h) {
        h.preventDefault();
        d(this).empty().html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
        if (d("#dadosAuxAgenda").children(".criar_evento").size() > 0) {
            d(".criar_evento").show();
            d(this).empty().text("Criar")
        } else {
            d("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            var k = d(this);
            d.ajax({
                url: "/AVA/Agenda/Grupo/CriarEditarAgendaGrupo/",
                type: "POST",
                data: {
                    strLinkPermanente: idUsuarioPublico
                },
                success: function(n) {
                    d("#dadosAuxAgenda").html(n);
                    d("#dtmInicio").datepicker({
                        numberOfMonths: 1,
                        dateFormat: "dd/mm/yy",
                        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                        onSelect: function(o) {
                            d("#dtmFim").datepicker("option", "minDate", o)
                        }
                    });
                    d("#dtmFim").datepicker({
                        numberOfMonths: 1,
                        dateFormat: "dd/mm/yy",
                        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                        onSelect: function(o) {
                            d("#dtmInicio").datepicker("option", "maxDate", o)
                        }
                    });
                    d("#dtmInicio").setMask("date");
                    d("#dtmFim").setMask("date");
                    d(".criar_evento input#horaInicio").setMask("29:59").timepicker({
                        myPosition: "right top",
                        atPosition: "right bottom"
                    });
                    d(".criar_evento input#horaFim").setMask("29:59").timepicker({
                        myPosition: "right top",
                        atPosition: "right bottom"
                    });
                    var l = new Date(dataReal);
                    var m = d("#calendar1").find(".ui-state-active").parent().attr("databr");
                    if (m === undefined) {
                        m = d("#calendar1").find(".ui-datepicker-today").attr("databr")
                    }
                    d("#dtmInicio").val(m);
                    d("#dtmFim").val(m);
                    proxHora = l.getHours() + 1;
                    fimHora = l.getHours() + 2;
                    proxHora = proxHora.toString();
                    fimHora = fimHora.toString();
                    if (parseInt(proxHora) >= 0 && parseInt(proxHora) <= 9) {
                        proxHora = "0" + proxHora.toString()
                    }
                    if (parseInt(fimHora) >= 0 && parseInt(fimHora) <= 9) {
                        fimHora = "0" + fimHora.toString()
                    }
                    if (proxHora == "24") {
                        proxHora = "00"
                    }
                    if (fimHora == "25") {
                        fimHora = "01"
                    }
                    d(".criar_evento input#horaInicio").val(proxHora + ":00");
                    d(".criar_evento input#horaFim").val(fimHora + ":00");
                    k.empty().text("Criar")
                },
                error: function() {
                    if (data.status != 0) {
                        console.debug("Ocorreu um erro na busca da agenda")
                    }
                    k.empty().text("Criar")
                }
            })
        }
    });
    d(".agendaItemExcluir").live("click", function() {
        $id = d(this).attr("id");
        $parent = d(this).parent();
        $parent.html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        d.post("/AVA/Agenda/Home/ExcluirEvento?id=" + $id, function(h) {
            $parent.remove()
        });
        carregaAgenda()
    });
    d(".agendaItemEditar").live("click", function() {
        $id = d(this).attr("id");
        d("#criar_EventoAgenda").hide();
        d("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        d.post("/AVA/Agenda/Home/EditarData?id=" + $id, function(h) {
            d("#descricaoDia_EventoAgenda").html(h);
            d("#dtmInicio").datepicker({
                numberOfMonths: 1,
                dateFormat: "dd/mm/yy",
                dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                onSelect: function(k) {
                    d("#dtmFim").datepicker("option", "minDate", k)
                }
            });
            d("#dtmFim").datepicker({
                numberOfMonths: 1,
                dateFormat: "dd/mm/yy",
                dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                onSelect: function(k) {
                    d("#dtmInicio").datepicker("option", "maxDate", k)
                }
            });
            d("#dtmInicio").setMask("date");
            d("#dtmFim").setMask("date");
            d(".criar_evento input#horaInicio").setMask("29:59").timepicker({
                myPosition: "right top",
                atPosition: "right bottom"
            });
            d(".criar_evento input#horaFim").setMask("29:59").timepicker({
                myPosition: "right top",
                atPosition: "right bottom"
            })
        })
    });
    d("body").on("click", ".proximo_dia_agenda", function(k) {
        console.log('Direita');
        k.preventDefault();
        var l = d("<li>");
        l.addClass("carregando_center");
        l.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
        d(".visualizar_evento").find("ul").not(".filtro_agenda_home").empty().append(l);
        var h = d(".ui-state-active");
        if (h.parent().next().size() > 0) {
            h.parent().next().children("a:first").trigger("click")
        } else {
            h.parent().parent().next().children("td:first").children("a:first").trigger("click")
        }
        //dev
    });
    d("body").on("click", ".anterior_dia_agenda", function(k) {
        console.log('Esquerda');
        
        k.preventDefault();
        var l = d("<li>");
        l.addClass("carregando_center");
        l.html('<img border="0" src="/AVA/StaticContent/Common/img/perfil/carregando.gif">');
        d(".visualizar_evento").find("ul").not(".filtro_agenda_home").empty().append(l);
        var h = d(".ui-state-active");
        if (h.parent().prev().size() > 0) {
            h.parent().prev().children("a:first").trigger("click")
        } else {
            h.parent().parent().prev().children("td:last").children("a:first").trigger("click")
        }
    });
    d("body").on("click", "#fecharCaixaEventoAgenda", function(h) {
        h.preventDefault();
        d(".visualizar_evento").hide().remove();
        d(".ui-state-active").removeClass("ui-state-active")
    });
    d(".checkAgenda").live("click", function() {
        console.log('D°°°');
        
        var h = d(this).attr("id");
        if (!d(this).is(":checked")) {
            d(this).removeAttr("checked")
        } else {
            d(".checkAgenda").removeAttr("checked");
            d("#" + h).attr("checked", "checked")
        }
        if (h == "agendaTurma") {
            d(".agendaPersonalizada").show()
        } else {
            d(".agendaPersonalizada").hide()
        }
        if (d(this).attr("id") == "agendaPortal" && d(this).is(":checked")) {
            d("#idStrUrlEvento").slideDown("slow")
        } else {
            if (d("#idStrUrlEvento").is(":visible")) {
                d("#idStrUrlEvento").slideUp("slow")
            }
        }
    });
    d(this).on("click", ".boxAgendaReduzida", function(h) {
        h.preventDefault();
        if (d(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown")) {
            d(".bcs1").show();
            d(".boxAgendaReduzida").find(".fontello.setaAgendaDown").addClass("setaAgendaUp");
            d(".boxAgendaReduzida").find(".fontello.setaAgendaDown").removeClass("setaAgendaDown");
            d(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
            d(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
        } else {
            d(".bcs1").hide();
            d(".boxAgendaReduzida").find(".fontello.setaAgendaUp").addClass("setaAgendaDown");
            d(".boxAgendaReduzida").find(".fontello.setaAgendaUp").removeClass("setaAgendaUp");
            d(".agendaReduzidaCalendario").addClass("boxAgendaReduzida");
            d(".boxAgendaReduzida").removeClass("agendaReduzidaCalendario")
        }
    });
    d(this).on("click", ".agendaReduzidaCalendario", function(h) {
        h.preventDefault();
        if (d(".agendaReduzidaCalendario .fontello").hasClass("setaAgendaDown")) {
            d(".bcs1").show();
            d(".agendaReduzidaCalendario").find(".fontello.setaAgendaDown").addClass("setaAgendaUp");
            d(".agendaReduzidaCalendario").find(".fontello.setaAgendaDown").removeClass("setaAgendaDown");
            d(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
            d(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
        } else {
            d(".bcs1").hide();
            d(".agendaReduzidaCalendario").find(".fontello.setaAgendaUp").addClass("setaAgendaDown");
            d(".agendaReduzidaCalendario").find(".fontello.setaAgendaUp").removeClass("setaAgendaUp");
            d(".agendaReduzidaCalendario").addClass("boxAgendaReduzida");
            d(".boxAgendaReduzida").removeClass("agendaReduzidaCalendario")
        }
    })

    
        
});

function cancelarEditAgenda() {
    var a = $("#calendar1").find(".ui-state-active").attr("rel");
    if (a === undefined) {
        a = $(".ui-datepicker-today").find("a").attr("rel")
    }
    $.post(a, function(b) {
        $("#descricaoDia_EventoAgenda").empty();
        $("#descricaoDia_EventoAgenda").html(b);
        $(".meusChecks").removeAttr("disabled");
        $("#criar_EventoAgenda").show()
    })
}

function validarEdicaoNovaAgenda() {
    var f = new Date();
    var b = "";
    var l = "";
    var o = $("#idEventoAgenda").val();
    var x = $("#dtmInicio").val();
    var c = $("#dtmFim").val();
    var a = $(".criar_evento input#horaInicio").val();
    var h = $(".criar_evento input#horaFim").val();
    var s = $("#strTituloAgenda").val();
    var n = "";
    var k = 1;
    var A = "";
    $("input.btn_laranja.salvar").val("Aguarde");
    $("input.btn_laranja.salvar").prop("disabled", true);
    $("input[name=paraCriarAgenda]").each(function() {
        if ($(this).is(":checked")) {
            try {
                l = parseInt($(this).val())
            } catch (B) {}
        }
    });
    if ($("#strUrlAgenda") !== undefined && (l == 3 || l == 2) && $("#strUrlAgenda").val().length > 0) {
        var p = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
        var d = p.exec($("#strUrlAgenda").val().toLowerCase());
        if (!d) {
            $("#msgErroCriarAgenda").show();
            $("#msgErroCriarAgenda span:last").empty().text("URL Inválida");
            $("input.btn_laranja.salvar").val("Salvar");
            $("input.btn_laranja.salvar").removeAttr("disabled");
            return false
        } else {
            n = $("#strUrlAgenda").val()
        }
    }
    if ($("#estadoCriacaoAgenda") !== undefined && $("#estadoCriacaoAgenda") != null) {
        if (l == 2 || l == 3) {
            try {
                k = parseInt($("input[name=estadoPublicadoPrivadoAgenda]:checked").val())
            } catch (w) {}
        } else {
            k = 1
        }
    }
    if (l == 2) {
        A = parseInt($("#eventoTipoAgenda option:selected").val())
    } else {
        A = 0
    }
    if (s.length > 100) {
        $("#msgErroCriarAgenda").show();
        $("#msgErroCriarAgenda span:last").empty().text("Título inválido - Máximo 100 caracteres.");
        $("input.btn_laranja.salvar").val("Salvar");
        $("input.btn_laranja.salvar").removeAttr("disabled");
        return false
    }
    var u = x.split("/");
    var t = c.split("/");
    var r = u[2] + "-" + u[1] + "-" + u[0];
    var y = t[2] + "-" + t[1] + "-" + t[0];
    if (c != "" && x != "") {
        if (y < r) {
            $("#msgErroCriarAgenda").show();
            $("#msgErroCriarAgenda span:last").empty().text("Data/hora Final deve ser maior que a incial");
            $("input.btn_laranja.salvar").val("Salvar");
            $("input.btn_laranja.salvar").removeAttr("disabled");
            return false
        }
        if (r == y && (h <= a)) {
            $("#msgErroCriarAgenda").show();
            $("#msgErroCriarAgenda span:last").empty().text("A hora final deve ser maior que a inicial");
            $("input.btn_laranja.salvar").val("Salvar");
            $("input.btn_laranja.salvar").removeAttr("disabled");
            return false
        }
    }
    var q = new Array();
    if (x == "" && c == "") {
        var z = new Date();
        mes = z.getMonth() + 1;
        q[0] = z.getDate() + "/" + mes + "/" + z.getFullYear();
        q[1] = z.getDate() + "/" + mes + "/" + z.getFullYear()
    } else {
        if (x != "" && c == "") {
            var v = new Array();
            var u = $dtmInicio.split("/");
            v[0] = u[1] + "/" + u[0] + "/" + u[2];
            v[1] = u[1] + "/" + u[0] + "/" + u[2];
            q = getDates(v)
        } else {
            var v = new Array();
            var u = x.split("/");
            var t = c.split("/");
            v[0] = u[1] + "/" + u[0] + "/" + u[2];
            v[1] = t[1] + "/" + t[0] + "/" + t[2];
            q = getDates(v)
        }
    }
    if (f.getHours() >= 23) {
        $("#msgErroCriarAgenda").show().text("").text("Favor inserir hora válida");
        $("input.btn_laranja.salvar").val("Salvar");
        $("input.btn_laranja.salvar").removeAttr("disabled");
        return false
    }
    var m = {
        idEvento: o,
        dtmInicio: x,
        dtmFim: c,
        horaInicio: a,
        horaFim: h,
        strTitulo: s,
        idCategoria: l,
        jsonUsuario: "",
        jsonGrupo: "",
        strUrlEvento: n,
        idEventoTipo: A,
        bolPrivado: k
    };
        console.log('fora no IF');


    if (location.href.toLowerCase().indexOf("avinha") == -1) {
        console.log('Entrou no IF');
        console.log(_projeto);

        if (_projeto != "turma") {
            try {
                for (i = 0; i < arrayUsuarioAux.length; i++) {
                    arrayUsuarioAux[i]["dtmCriacao"] = ""
                }
            } catch (g) {
                console.log(g)
            }
            try {
                for (i = 0; i < arrayEntidadeAux.length; i++) {
                    for (j = 0; j < arrayEntidadeAux[i]["usuarios"].length; j++) {
                        arrayEntidadeAux[i]["usuarios"][j]["dtmCriacao"] = ""
                    }
                }
            } catch (g) {
                console.log(g)
            }
            console.log("===================arrayUsuarioAux====================");
            console.log(JSON.stringify(arrayUsuarioAux));
            console.log("==================arrayEntidadeAux=====================");
            console.log(JSON.stringify(arrayEntidadeAux));

            formatarJson(arrayUsuarioAux);
            
            console.log("===================arrayUsuarioAux====================");
            console.log(JSON.stringify(arrayUsuarioAux));
            console.log("==================arrayEntidadeAux=====================");
            console.log(JSON.stringify(arrayEntidadeAux));

            m.jsonUsuario = JSON.stringify(arrayUsuarioAux);
            m.jsonGrupo = JSON.stringify(arrayEntidadeAux);            

            console.log(l);

            if(l == 4){
                m.jsonUsuario =  "grupoDeTurma";
            }


        } else {
            m.jsonUsuario = "grupoDeTurma";
            m.jsonGrupo = $("#idTurma").val()
        }
    }
    $("#msgErroCriarAgenda").hide();
    $.ajax({
        url: "/AVA/Agenda/Home/SalvarEvento",
        type: "POST",
        data: m,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(U) {
            var P = U;
            P = U.split(";");
            var H = null;
            H = P[0];
            var C = P[1];
            if (H == "Erro") {
                $("#msgErroCriarAgenda span:last").empty().text(C);
                $("#msgErroCriarAgenda").show();
                $("input.btn_laranja.salvar").val("Salvar");
                $("input.btn_laranja.salvar").removeAttr("disabled")
            } 
            else {
                if (parseInt($("#idEventoAgenda").val()) > 0 && $(".block_edicao_agenda").size() > 0) {
                    $(".block_edicao_agenda").fadeOut("fast", function() {
                        $(this).remove()
                    })
                }
                $(".box_agenda").fadeOut("slow", function() {
                    $(this).remove()
                });
                if (x != "" && (c == "" || c == null)) {
                    var N = U.split(";");
                    var G = P[0];
                    var L = P[1];
                    q.length = 0;
                    q[0] = G;
                    q[1] = L
                }
                var O = 0;
                var K = 0;
                var B = new Array();
                var e = q.length;
                var D = "";
                var Q = "";
                $(".ui-state-default").each(function() {
                    if ($(this).attr("ref") != undefined) {
                        D = $(this).attr("ref").split("_");
                        D = D[1].split("/");
                        Q = D[0] + "/" + D[1] + "/" + D[2];
                        for (K = 0; K < e; K++) {
                            if (Q == q[K]) {
                                B[O] = $(this);
                                O++
                            }
                        }
                    }
                });
                var F = "";
                $("form .filtro_agenda_home").find(":checked").each(function() {
                    F = F + $(this).val() + ","
                });
                var T = F.length;
                F = F.substring(0, T - 1);
                var R = 0;
                var I = F;
                if (_projeto == "turma") {
                    I = 4
                    
    // }

                }
                if (_projeto == "pagina") {
                    if ($("#idPagina").val() > 2) {
                        I = 2
                    }
                    if ($("#idPagina").val() == 2) {
                        I = 3
                    }
                }

                console.log(B);
                console.log(q);
                console.log(I);
                
                
                intOne = B;
                intTwo = q;
                intThree = I;

                mudarRel(B, q, I);
                var M = $(".avaJCalendario:first").parent().attr("dataus");
                var J = $(".avaJCalendario:last").parent().attr("dataus");
                var E = $(".ui-datepicker-title").attr("mes");
                var S = $(".ui-datepicker-title").attr("ano");
                $(".agenda_BoxContador").empty().remove();
                $(".avaJCalendario").attr("eventoid", "");
                if (M == "" || J == "" || E == "" || S == "") {
                    setTimeout(getDadosDataEvento(), 300)
                }
                console.log('VD3');
                // verificaEventos(M, J, E, S, I, true);
                verificaEventos(M, J, E, S, I, true);

                $(".ui-state-active").removeClass("ui-state-active")
            }
        },
        error: function(e) {
            if (e.status != 0) {
                console.debug("Ocorreu um erro ao gravar novo evento na agenda.")
            }
            $("input.btn_laranja.salvar").val("Salvar");
            $("input.btn_laranja.salvar").removeAttr("disabled")
        }
    })
}

function formatarJson(lista){  
    var objeto = [{
        "idGrupo":1,
        "idEscola":0,
        "idUnidade":0,
        "idEnsino":-1,
        "idSerie":0,
        "idTurma":0,
        "nomeGrupo":"aluno",
        "bolCompleto":true,
        "tipo":2,
        "usuarios": []
    }];
   
    var usuarios = [];
    for(var i = 0; i < lista.length; i++){
        var usuario = {
            "idUsuario": lista[i].idUsuario,
            "strNome": lista[i].strNome,
            "strApelido": lista[i].strApelido,
            "strFoto":"",
            "idTurma": lista[i].idTurma,
            "isTurma":false,
            "dtmCriacao":""
        };
        usuarios.push(usuario);
        objeto[0].usuarios.push(usuario);
    }

    if(objeto[0].usuarios.length > 0) {
        arrayEntidadeAux = objeto;
    }
    console.log("=======" + JSON.stringify(arrayUsuarioAux));
}

function validarEdicaoAgendaGrupo() {
    var e = new Date();
    var b = "";
    var h = 5;
    var l = $("#idEventoAgenda").val();
    var t = $("#dtmInicio").val();
    var c = $("#dtmFim").val();
    var a = $(".criar_evento input#horaInicio").val();
    var g = $(".criar_evento input#horaFim").val();
    var p = $("#strTituloAgenda").val();
    var k = "";
    var w = "";
    $("input.btn_laranja.salvar").val("Aguarde");
    $("input.btn_laranja.salvar").prop("disabled", true);
    if ($("#strUrlAgenda") !== undefined && h == 5 && $("#strUrlAgenda").val().length > 0) {
        var m = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
        var d = m.exec($("#strUrlAgenda").val().toLowerCase());
        if (!d) {
            $("#msgErroCriarAgenda").show();
            $("#msgErroCriarAgenda span:last").empty().text("URL Inválida");
            $("input.btn_laranja.salvar").val("Salvar");
            $("input.btn_laranja.salvar").removeAttr("disabled");
            return false
        } else {
            k = $("#strUrlAgenda").val()
        }
    }
    if (p.length > 100) {
        $("#msgErroCriarAgenda").show();
        $("#msgErroCriarAgenda span:last").empty().text("Título inválido - Máximo 100 caracteres.");
        $("input.btn_laranja.salvar").val("Salvar");
        $("input.btn_laranja.salvar").removeAttr("disabled");
        return false
    }
    var r = t.split("/");
    var q = c.split("/");
    var o = r[2] + "-" + r[1] + "-" + r[0];
    var u = q[2] + "-" + q[1] + "-" + q[0];
    if (c != "" && t != "") {
        if (u < o) {
            $("#msgErroCriarAgenda").show();
            $("#msgErroCriarAgenda span:last").empty().text("Data/hora Final deve ser maior que a incial");
            $("input.btn_laranja.salvar").val("Salvar");
            $("input.btn_laranja.salvar").removeAttr("disabled");
            return false
        }
        if (o == u && (g <= a)) {
            $("#msgErroCriarAgenda").show();
            $("#msgErroCriarAgenda span:last").empty().text("A hora final deve ser maior que a inicial");
            $("input.btn_laranja.salvar").val("Salvar");
            $("input.btn_laranja.salvar").removeAttr("disabled");
            return false
        }
    }
    var n = new Array();
    if (t == "" && c == "") {
        var v = new Date();
        mes = v.getMonth() + 1;
        n[0] = v.getDate() + "/" + mes + "/" + v.getFullYear();
        n[1] = v.getDate() + "/" + mes + "/" + v.getFullYear()
    } else {
        if (t != "" && c == "") {
            var s = new Array();
            var r = $dtmInicio.split("/");
            s[0] = r[1] + "/" + r[0] + "/" + r[2];
            s[1] = r[1] + "/" + r[0] + "/" + r[2];
            n = getDates(s)
        } else {
            var s = new Array();
            var r = t.split("/");
            var q = c.split("/");
            s[0] = r[1] + "/" + r[0] + "/" + r[2];
            s[1] = q[1] + "/" + q[0] + "/" + q[2];
            n = getDates(s)
        }
    }
    if (e.getHours() >= 23) {
        $("#msgErroCriarAgenda").show().text("").text("Favor inserir hora válida");
        $("input.btn_laranja.salvar").val("Salvar");
        $("input.btn_laranja.salvar").removeAttr("disabled");
        return false
    }
    if (location.href.toLowerCase().indexOf("avinha") > -1) {
        obj = {
            idEvento: l,
            strLinkPermanente: $("#strIdLinkPermanente").val(),
            dtmInicio: t,
            dtmFim: c,
            horaInicio: a,
            horaFim: g,
            strTitulo: p,
            strUrlEvento: k
        }
    } else {
        try {
            for (i = 0; i < arrayUsuarioAux.length; i++) {
                arrayUsuarioAux[i]["dtmCriacao"] = ""
            }
        } catch (f) {
            console.log(f)
        }
        try {
            for (i = 0; i < arrayEntidadeAux.length; i++) {
                for (j = 0; j < arrayEntidadeAux[i]["usuarios"].length; j++) {
                    arrayEntidadeAux[i]["usuarios"][j]["dtmCriacao"] = ""
                }
            }
        } catch (f) {
            console.log(f)
        }
        obj = {
            idEvento: l,
            strLinkPermanente: $("#strIdLinkPermanente").val(),
            dtmInicio: t,
            dtmFim: c,
            horaInicio: a,
            horaFim: g,
            strTitulo: p,
            strUrlEvento: k
        }
    }
        console.log('Esse no IF');

    $("#msgErroCriarAgenda").hide();
    $.ajax({
        url: "/AVA/Agenda/Grupo/SalvarEvento/",
        data: obj,
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(P) {
            var L = P;
            L = P.split(";");
            var E = null;
            E = L[0];
            var z = L[1];
            if (E == "Erro") {
                $("#msgErroCriarAgenda span:last").empty().text(z);
                $("#msgErroCriarAgenda").show();
                $("input.btn_laranja.salvar").val("Salvar")
            } else {
                if (parseInt($("#idEventoAgenda").val()) > 0 && $(".block_edicao_agenda").size() > 0) {
                    $(".block_edicao_agenda").fadeOut("fast", function() {
                        $(this).remove()
                    })
                }
                $(".box_agenda").fadeOut("slow", function() {
                    $(this).remove()
                });
                if (t != "" && (c == "" || c == null)) {
                    var J = P.split(";");
                    var D = L[0];
                    var H = L[1];
                    n.length = 0;
                    n[0] = D;
                    n[1] = H
                }
                var K = 0;
                var G = 0;
                var y = new Array();
                var x = n.length;
                var A = "";
                var M = "";
                $(".ui-state-default").each(function() {
                    if ($(this).attr("ref") != undefined) {
                        A = $(this).attr("ref").split("_");
                        A = A[1].split("/");
                        M = A[0] + "/" + A[1] + "/" + A[2];
                        for (G = 0; G < x; G++) {
                            if (M == n[G]) {
                                y[K] = $(this);
                                K++
                            }
                        }
                    }
                });
                var C = "5";
                var N = 0;

                intOne = y;
                intTwo = n;
                intThree = c;


                mudarRel(y, n, C);
                var I = $(".avaJCalendario:first").parent().attr("dataus");
                var F = $(".avaJCalendario:last").parent().attr("dataus");
                var B = $(".ui-datepicker-title").attr("mes");
                var O = $(".ui-datepicker-title").attr("ano");
                $(".agenda_BoxContador").empty().remove();
                $(".avaJCalendario").attr("eventoid", "");
                if (I == "" || F == "" || B == "" || O == "") {
                    setTimeout(getDadosDataEvento(), 300)
                }
                console.log('VD4');
                verificaEventos(I, F, B, O, C, true);
                $(".ui-state-active").removeClass("ui-state-active")
            }
        },
        error: function(x) {
            if (x.status != 0) {
                console.debug("Ocorreu um erro ao gravar novo evento na agenda.")
            }
            $("input.btn_laranja.salvar").val("Salvar")
        }
    })
}

function validarEdicaoAgenda() {
    var e = new Date();
    var c;
    $idCategoria = "";
    $idEvento = $("#idEvento").val();
    $dtmInicio = $("#dtmInicio").val();
    $dtmFim = $("#dtmFim").val();
    $horaInicio = $(".criar_evento input#horaInicio").val();
    $horaFim = $(".criar_evento input#horaFim").val();
    $txtTexto = $("#txtDescricao").val();
    $strUrlEvento = $("#strUrlEvento").val();
    c = "a";
    $(".checkAgenda").each(function() {
        if ($(this).is(":checked")) {
            $idCategoria = $(this).val()
        }
    });
    if ($txtTexto.length > 100) {
        alert("Título inválido - Máximo 100 caracteres.");
        return false
    }
    if ($idCategoria == "" || $idCategoria == null) {
        $idCategoria = 1
    }
    var b = $dtmInicio.split("/");
    var h = $dtmFim.split("/");
    dataComparaInicial = b[2] + "-" + b[1] + "-" + b[0];
    dataComparaFinal = h[2] + "-" + h[1] + "-" + h[0];
    if ($dtmFim != "" && $dtmInicio != "") {
        if (dataComparaFinal < dataComparaInicial) {
            $(".form_input").find("label").each(function() {
                if ($(this).attr("for") == "horaInicio") {
                    $(this).css("display", "none")
                }
                if ($(this).attr("for") == "dtmInicio") {
                    $(this).fadeIn("slow");
                    $(this).text("A data final deve ser maior que a inicial")
                }
            });
            return false
        }
    }
    if ($dtmFim != "" && $dtmInicio != "") {
        if (dataComparaInicial == dataComparaFinal && $horaFim == "" && $horaInicio == "") {} else {
            if (dataComparaInicial == dataComparaFinal && ($horaFim <= $horaInicio)) {
                $(".form_input").find("label").each(function() {
                    if ($(this).attr("for") == "dtmInicio") {
                        $(this).css("display", "none")
                    }
                    if ($(this).attr("for") == "horaInicio") {
                        $(this).fadeIn("slow");
                        $(this).text("A hora final deve ser maior que a inicial")
                    }
                });
                return false
            }
        }
    }
    var d = new Array();
    if ($dtmInicio == "" && $dtmFim == "") {
        var f = new Date();
        mes = f.getMonth() + 1;
        d[0] = f.getDate() + "/" + mes + "/" + f.getFullYear();
        d[1] = f.getDate() + "/" + mes + "/" + f.getFullYear()
    } else {
        if ($dtmInicio != "" && $dtmFim == "") {
            var a = new Array();
            var b = $dtmInicio.split("/");
            a[0] = b[1] + "/" + b[0] + "/" + b[2];
            a[1] = b[1] + "/" + b[0] + "/" + b[2];
            d = getDates(a)
        } else {
            var a = new Array();
            var b = $dtmInicio.split("/");
            var h = $dtmFim.split("/");
            a[0] = b[1] + "/" + b[0] + "/" + b[2];
            a[1] = h[1] + "/" + h[0] + "/" + h[2];
            d = getDates(a)
        }
    }
    if (e.getHours() >= 23) {
        $(".form_input").find("label").each(function() {
            if ($(this).attr("for") == "horaInicio") {
                $(this).css("display", "block");
                $(this).text("Você deve preencher todos os campos")
            }
        });
        return false
    }
    var g = {};
    if (location.href.toLowerCase().indexOf("avinha") > -1) {
        g = {
            idEvento: $idEvento,
            dtmInicio: $dtmInicio,
            dtmFim: $dtmFim,
            horaInicio: $horaInicio,
            horaFim: $horaFim,
            txtTexto: $txtTexto,
            idCategoria: $idCategoria,
            jsonDestino: "",
            strUrlEvento: ""
        }
    } else {
        g = {
            idEvento: $idEvento,
            dtmInicio: $dtmInicio,
            dtmFim: $dtmFim,
            horaInicio: $horaInicio,
            horaFim: $horaFim,
            txtTexto: $txtTexto,
            idCategoria: $idCategoria,
            jsonDestino: montaJSON($(".agendaPersonalizada .compartilhamento"), true),
            strUrlEvento: $strUrlEvento
        }
    }
    $.ajax({
        url: "/AVA/Agenda/Home/GravarEvento/",
        data: g,
        contentType: "text/html; charset=iso-8859-1",
        success: function(p) {

            console.log(JSON.stringify(p));

            if ($dtmInicio != "" && ($dtmFim == "" || $dtmFim == null)) {
                var r = p.split(";");
                var t = r[0];
                var x = r[1];
                d.length = 0;
                d[0] = t;
                d[1] = x
            }
            $("#descricaoDia_EventoAgenda").html("");
            $("#criar_EventoAgenda").show();
            var q = 0;
            var l = 0;
            var v = new Array();
            var y = d.length;
            $(".ui-state-default").each(function() {
                if ($(this).attr("ref") != undefined) {
                    valor = $(this).attr("ref").split("_");
                    valor = valor[1].split("/");
                    a = valor[0] + "/" + valor[1] + "/" + valor[2];
                    for (l = 0; l < y; l++) {
                        if (a == d[l]) {
                            v[q] = $(this);
                            q++
                        }
                    }
                }
            });
            var k = "";
            $("#formTemp").find(":checked").each(function() {
                k = k + $(this).val() + ","
            });
            var w = k.length;
            k = k.substring(0, w - 1);

            intOne = v;
            intTwo = d;
            intThree = k;


            mudarRel(v, d, k);
            var n = $(".avaJCalendario:first").parent().attr("dataus");
            var s = $(".avaJCalendario:last").parent().attr("dataus");
            var u = $(".ui-datepicker-title").attr("mes");
            var m = $(".ui-datepicker-title").attr("ano");
            console.log('VD5');
            verificaEventos(n, s, u, m, k, true);
            carregaAgenda();
            $(".avaJCalendario").css("background", "#ffffff")
        },
        error: function(k) {
            if (k.status != 0) {
                console.debug("Ocorreu um erro ao gravar novo evento na agenda.")
            }
        }
    })
}

function verificaEventos(p, n, d, r, f, q) {



    // atualizaTotalEventosHoje(0);
    // console.log("g_PessoaSelecionada -> "+g_PessoaSelecionada);

    $(".agenda_BoxContador").empty();
    $('.agenda_countEvento').empty();

    console.log("GDATE  "   +g_Date);
    
    //dev
    var idFilho = undefined;
    
    if(g_PessoaSelecionada != 0){
        idFilho = g_PessoaSelecionada;
    }
    

    // console.log( "Cara selecionado ->  "+ idFilho);

    if(idFilho != undefined){
        f = '4,3,2,1' ;
    }

    if (d == "" || d.lenght < 1 || d == null) {
        var k = new Date(p);
        var m = new Date(n);
        var e = k.getDate();
        var s = k.getMonth() + 1;
        var t = m.getMonth() + 1;
        var g = k.getYear();
        var l = m.getYear();
        var o = 0;
        if (s == 12) {
            o = 1
        } else {
            o = s + 1
        }
        if (e == 1 && s == (t - 1)) {
            d = s
        } else {
            if ((o > s || (o < s && l > g)) && (o < t || (o > t && l > g))) {
                d = o;
                console.log("mês corrente: " + o)
            } else {
                console.log("Erro ao recuperar o mês corrente.")
            }
        }
    }
    var b = new Array();
    var a = new Array();
    var c = "";
    var h = {};
    if (_projeto == "grupo") {
        c = "/AVA/Agenda/Grupo/ContadorEventoData";
        h = {
            dataInicial: p,
            dataFinal: n,
            mes: d,
            ano: r,
            idCategoria: f,
            strLinkPermanente: idUsuarioPublico
        }
    } 
    else {
        c = "/AVA/Agenda/Home/ContadorEventoDataFilho";
        h = {
            dataInicial: p,
            dataFinal: n,
            mes: d,
            ano: r,
            idCategoria: f,
            idFilho: idFilho
        };
        if (_projeto == "turma") {
            h.idTurma = $("#idTurma").val()
        }
        if (_projeto == "pagina") {
            if ($("#idPagina").val() > 2) {
                h.idCategoria = 2
            }
            if ($("#idPagina").val() == 2) {
                h.idCategoria = 3
            }
        }
    }
    if( idFilho != undefined  ){

        $.ajax({
            type: "POST",
            url: c,
            data: h,
            async: false,
            success: function(retornoEventosFilho){
            
                // console.log( "Fora do outro END-POINT :  "+ JSON.stringify( retornoEventosFilho )  );
                        console.log('Me chamou quando clicou ');
                        // remontarFiltroFilhos();
              
                          try{

                            // console.log( "Dentro do outro END-POINT :  "+ retornoEventosFilho  );
                            // console.log( listaAtividadesParaAgendar  );

                                var E = $(".ui-datepicker-today").attr("databr");
                                a = retornoEventosFilho.split(";");
                                total = a.length - 1;
                                
                                for (var z = 0; z < total; z++) {

                                    b = a[z].split(",");
                                    var H = "avaCalendario_" + b[1];
                                    var F = parseInt(b[0]);
                                    var u = b[2];
                                    var D = b[1];

                                    var numeroAtividadesNoDia =  comparaDatas( D ,listaAtividadesParaAgendar );
                                    // var numeroAtividadesNoDia =  0;

                                    // console.log( 'NUmer do dia   '+numeroAtividadesNoDia  );

                                    F = F + numeroAtividadesNoDia ;

                                    // console.log('Dia '+D+ " EVENTOS " + F);
                                    if (F > 0) {
                                        
                                        var x = '<div class="agenda_BoxContador" style="position:absolute; margin:auto;">';
                                        if (F > 4) {
                                            for ($i = 0; $i < 3; $i++) {
                                                x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                            }
                                            x = x + '<strong class="mais_eventos_agenda">+</strong>'
                                        } else {
                                            for ($i = 0; $i < F; $i++) {
                                                x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                            }
                                        }
                                        x = x + "</div>";
                                        
                                        console.log($(".ui-state-default").html());

                                      

                                        if (D == E && q !== "undefined" && q == true && ($(".ui-datepicker-today").attr("daytype") == "8" || $(".ui-datepicker-today").attr("daytype") == "9")) {
                                            
                                            console.log('HEREEEEEEE');
                                            atualizaTotalEventosHoje(F);
                                            var B = "";
                                            var C = "";
                                            if (F > 1) {
                                                B = " para hoje";
                                                C = " eventos"
                                            } else {
                                                B = " para hoje";
                                                C = " evento "
                                            }
                                            var A = $("<div>");
                                            A.addClass("agendados_data").text(B);
                                            var G = $("<strong>");
                                            G.text(F + " " + C);
                                            var v = $("<a>");
                                            v.addClass("fechar_agendados").attr("title", "fechar").html("&nbsp;");
                                            var I = $("<div>");
                                            I.addClass("ponta_aviso_agenda");
                                            A.prepend(G).append(v).append(I);
                                            var w = $("<span>");
                                            w.text(B);
                                            w.prepend(G);
                                            if (_projeto == "grupo") {
                                                if (!($(".fontello").hasClass("setaAgendaUp"))) {
                                                    $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                }
                                            } else {
                                                if (_projeto == "turma") {
                                                    if (!($(".fontello").hasClass("setaAgendaDown"))) {
                                                        $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                    }
                                                } else {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                            $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                        }
                                                    } else {
                                                        if (!($(" .boxAgendaReduzida.fontello").hasClass("setaAgendaUp"))) {
                                                            if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                                $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            $("#agenda_reduzida").html("");
                                            $("#agenda_reduzida").prepend("<span class='fontello reduzido'></span>");
                                            $("#agenda_reduzida").append(w);
                                            if (_projeto == "grupo") {
                                                $(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                                                $(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
                                            }
                                            $("#ava_barralateral-direita .bcs1 header").remove();
                                            setTimeout(function() {
                                                if (A.is(":visible")) {
                                                    A.fadeOut("slow")
                                                }
                                            }, 3000)
                                        }


                                        $(".ui-state-default").each(function() {
                                            console.log('Valor de H -> '+H);
                                            
                                            if ( $(this).attr("ref")==H ) {
                                                $(this).append(x);
                                                var L = "";
                                                if (u.length > 0) {
                                                    var K = u.split("-");
                                                    for (var J = 0; J < K.length; J++) {
                                                        if (J == 0) {
                                                            L = "Continuo_" + K[J]
                                                        } else {
                                                            L = L + ",Continuo_" + K[J]
                                                        }
                                                    }
                                                    $(this).attr("eventoID", L)
                                                }
                                            }

                                        });
                                    }
                                    
                                    else {
                                            if (F == 0) {
                                                if (D == E && q !== "undefined" && q == true && ($(".ui-datepicker-today").attr("daytype") == "8" || $(".ui-datepicker-today").attr("daytype") == "9")) {
                                                    var B = "";
                                                    atualizaTotalEventosHoje(F);
                                                    if (_projeto == "grupo") {
                                                        B = "AGENDA DO GRUPO"
                                                    } else {
                                                        if (_projeto == "turma") {
                                                            B = "AGENDA DA TURMA"
                                                        } else {
                                                            if (location.href.toLowerCase().indexOf("/ava/pagina/") > 0) {
                                                                if ($("#idPagina").val() > 2) {
                                                                    B = "AGENDA DA ESCOLA"
                                                                } else {
                                                                    B = "AGENDA DE PROJETOS"
                                                                }
                                                            } else {
                                                                B = "MINHA AGENDA"
                                                            }
                                                        }
                                                    }
                                                    var w = $("<span>");
                                                    w.addClass("conteudoAgenda");
                                                    w.text(B);
                                                    if (_projeto == "grupo") {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                            $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                        }
                                                    } else {
                                                        if (_projeto == "turma") {
                                                            if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                                $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                            }
                                                        } else {
                                                            if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                                    $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                                }
                                                            } else {
                                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                                        $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    $("#agenda_reduzida").html("");
                                                    $("#agenda_reduzida").prepend("<span class='fontello reduzido'></span>");
                                                    $("#agenda_reduzida").append(w);
                                                    if (_projeto == "grupo") {
                                                        $(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                                                        $(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
                                                    }
                                                    $("#ava_barralateral-direita .bcs1 header").remove()
                                                }
                                            }
                                    }
                                }

                        }
                        catch(error){

                            console.log('Aqio no else');
                                    var E = $(".ui-datepicker-today").attr("databr");
                            a = retornoEventosFilho.split(";");
                            total = a.length - 1;
                            for (var z = 0; z < total; z++) {
                                b = a[z].split(",");
                                var H = "avaCalendario_" + b[1];
                                var F = parseInt(b[0]);
                                var u = b[2];
                                var D = b[1];

                                if (F > 0) {
                                    var x = '<div class="agenda_BoxContador" style="position:absolute; margin:auto;">';
                                    if (F > 4) {
                                        for ($i = 0; $i < 3; $i++) {
                                            x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                        }
                                        x = x + '<strong class="mais_eventos_agenda">+</strong>'
                                    } else {
                                        for ($i = 0; $i < F; $i++) {
                                            x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                        }
                                    }
                                    x = x + "</div>";
                                    $(".ui-state-default").each(function() {
                                        if ($(this).attr("ref") == H) {
                                            $(this).append(x);
                                            var L = "";
                                            if (u.length > 0) {
                                                var K = u.split("-");
                                                for (var J = 0; J < K.length; J++) {
                                                    if (J == 0) {
                                                        L = "Continuo_" + K[J]
                                                    } else {
                                                        L = L + ",Continuo_" + K[J]
                                                    }
                                                }
                                                $(this).attr("eventoID", L)
                                            }
                                        }
                                    });
                                    if (D == E && q !== "undefined" && q == true && ($(".ui-datepicker-today").attr("daytype") == "8" || $(".ui-datepicker-today").attr("daytype") == "9")) {
                                        atualizaTotalEventosHoje(F);
                                        var B = "";
                                        var C = "";
                                        if (F > 1) {
                                            B = " para hoje";
                                            C = " eventos"
                                        } else {
                                            B = " para hoje";
                                            C = " evento "
                                        }
                                        var A = $("<div>");
                                        A.addClass("agendados_data").text(B);
                                        var G = $("<strong>");
                                        G.text(F + " " + C);
                                        var v = $("<a>");
                                        v.addClass("fechar_agendados").attr("title", "fechar").html("&nbsp;");
                                        var I = $("<div>");
                                        I.addClass("ponta_aviso_agenda");
                                        A.prepend(G).append(v).append(I);
                                        var w = $("<span>");
                                        w.text(B);
                                        w.prepend(G);
                                        if (_projeto == "grupo") {
                                            if (!($(".fontello").hasClass("setaAgendaUp"))) {
                                                $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                            }
                                        } else {
                                            if (_projeto == "turma") {
                                                if (!($(".fontello").hasClass("setaAgendaDown"))) {
                                                    $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                }
                                            } else {
                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                        $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                    }
                                                } else {
                                                    if (!($(" .boxAgendaReduzida.fontello").hasClass("setaAgendaUp"))) {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                            $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        $("#agenda_reduzida").html("");
                                        $("#agenda_reduzida").prepend("<span class='fontello reduzido'></span>");
                                        $("#agenda_reduzida").append(w);
                                        if (_projeto == "grupo") {
                                            $(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                                            $(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
                                        }
                                        $("#ava_barralateral-direita .bcs1 header").remove();
                                        setTimeout(function() {
                                            if (A.is(":visible")) {
                                                A.fadeOut("slow")
                                            }
                                        }, 5000)
                                    }
                                } 
                                else {
                                    if (F == 0) {
                                        if (D == E && q !== "undefined" && q == true && ($(".ui-datepicker-today").attr("daytype") == "8" || $(".ui-datepicker-today").attr("daytype") == "9")) {
                                            var B = "";
                                            atualizaTotalEventosHoje(F);
                                            if (_projeto == "grupo") {
                                                B = "AGENDA DO GRUPO"
                                            } 
                                            else {
                                                if (_projeto == "turma") {
                                                    B = "AGENDA DA TURMA"
                                                } else {
                                                    if (location.href.toLowerCase().indexOf("/ava/pagina/") > 0) {
                                                        if ($("#idPagina").val() > 2) {
                                                            B = "AGENDA DA ESCOLA"
                                                        } else {
                                                            B = "AGENDA DE PROJETOS"
                                                        }
                                                    } else {
                                                        B = "MINHA AGENDA"
                                                    }
                                                }
                                            }
                                            var w = $("<span>");
                                            w.addClass("conteudoAgenda");
                                            w.text(B);
                                            if (_projeto == "grupo") {
                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                    $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                }
                                            } else {
                                                if (_projeto == "turma") {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                        $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                    }
                                                } else {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                            $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                        }
                                                    } else {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                            if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                                $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            $("#agenda_reduzida").html("");
                                            $("#agenda_reduzida").prepend("<span class='fontello reduzido'></span>");
                                            $("#agenda_reduzida").append(w);
                                            if (_projeto == "grupo") {
                                                $(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                                                $(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
                                            }
                                            $("#ava_barralateral-direita .bcs1 header").remove()
                                        }
                                    }
                                }
                            }
                        }
            setTimeout(() => {
              
                updateMonth(retornoEventosFilho);
                

            }, 50);
            
            },
            error: function(retornoError){


            }


        });
    
    }

    else{

            if (d == "" || d.lenght < 1 || d == null) {
                var k = new Date(p);
                var m = new Date(n);
                var e = k.getDate();
                var s = k.getMonth() + 1;
                var t = m.getMonth() + 1;
                var g = k.getYear();
                var l = m.getYear();
                var o = 0;
                if (s == 12) {
                    o = 1
                } else {
                    o = s + 1
                }
                if (e == 1 && s == (t - 1)) {
                    d = s
                } else {
                    if ((o > s || (o < s && l > g)) && (o < t || (o > t && l > g))) {
                        d = o;
                        console.log("mês corrente: " + o)
                    } else {
                        console.log("Erro ao recuperar o mês corrente.")
                    }
                }
            }
            var b = new Array();
            var a = new Array();
            var c = "";
            var h = {};
            if (_projeto == "grupo") {
                c = "/AVA/Agenda/Grupo/ContadorEventoData";
                h = {
                    dataInicial: p,
                    dataFinal: n,
                    mes: d,
                    ano: r,
                    idCategoria: f,
                    strLinkPermanente: idUsuarioPublico
                }
            } 
            else {
                c = "/AVA/Agenda/Home/ContadorEventoData";
                h = {
                    dataInicial: p,
                    dataFinal: n,
                    mes: d,
                    ano: r,
                    idCategoria: f
                };
                if (_projeto == "turma") {
                    h.idTurma = $("#idTurma").val()
                }
                if (_projeto == "pagina") {
                    if ($("#idPagina").val() > 2) {
                        h.idCategoria = 2
                    }
                    if ($("#idPagina").val() == 2) {
                        h.idCategoria = 3
                    }
                }
            }
            $.ajax({
                type: "POST",
                url: c,
                data: h,
                async: true,
                success: function(y) {
                    
                    //   console.log( JSON.stringify(y) );
                    

                    try{
                        // console.log( listaAtividadesParaAgendar  );

                            var E = $(".ui-datepicker-today").attr("databr");
                            a = y.split(";");
                            total = a.length - 1;
                            for (var z = 0; z < total; z++) {
                                b = a[z].split(",");
                                var H = "avaCalendario_" + b[1];
                                var F = parseInt(b[0]);
                                var u = b[2];
                                var D = b[1];

                                var numeroAtividadesNoDia =  comparaDatas( D ,listaAtividadesParaAgendar );
                                // var numeroAtividadesNoDia =  0;
                                // console.log( 'NUmer do dia   '+numeroAtividadesNoDia  );

                                F = F + numeroAtividadesNoDia ;

                                if (F > 0) {
                                    var x = '<div class="agenda_BoxContador" style="position:absolute; margin:auto;">';
                                    if (F > 4) {
                                        for ($i = 0; $i < 3; $i++) {
                                            x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                        }
                                        x = x + '<strong class="mais_eventos_agenda">+</strong>'
                                    } else {
                                        for ($i = 0; $i < F; $i++) {
                                            x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                        }
                                    }
                                    x = x + "</div>";
                                    $(".ui-state-default").each(function() {
                                        if ($(this).attr("ref") == H) {
                                            $(this).append(x);
                                            var L = "";
                                            if (u.length > 0) {
                                                var K = u.split("-");
                                                for (var J = 0; J < K.length; J++) {
                                                    if (J == 0) {
                                                        L = "Continuo_" + K[J]
                                                    } else {
                                                        L = L + ",Continuo_" + K[J]
                                                    }
                                                }
                                                $(this).attr("eventoID", L)
                                            }
                                        }
                                    });
                                    if (D == E && q !== "undefined" && q == true && ($(".ui-datepicker-today").attr("daytype") == "8" || $(".ui-datepicker-today").attr("daytype") == "9")) {
                                        atualizaTotalEventosHoje(F);
                                        var B = "";
                                        var C = "";
                                        if (F > 1) {
                                            B = " para hoje";
                                            C = " eventos"
                                        } else {
                                            B = " para hoje";
                                            C = " evento "
                                        }
                                        var A = $("<div>");
                                        A.addClass("agendados_data").text(B);
                                        var G = $("<strong>");
                                        G.text(F + " " + C);
                                        var v = $("<a>");
                                        v.addClass("fechar_agendados").attr("title", "fechar").html("&nbsp;");
                                        var I = $("<div>");
                                        I.addClass("ponta_aviso_agenda");
                                        A.prepend(G).append(v).append(I);
                                        var w = $("<span>");
                                        w.text(B);
                                        w.prepend(G);
                                        if (_projeto == "grupo") {
                                            if (!($(".fontello").hasClass("setaAgendaUp"))) {
                                                $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                            }
                                        } else {
                                            if (_projeto == "turma") {
                                                if (!($(".fontello").hasClass("setaAgendaDown"))) {
                                                    $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                }
                                            } else {
                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                        $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                    }
                                                } else {
                                                    if (!($(" .boxAgendaReduzida.fontello").hasClass("setaAgendaUp"))) {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                            $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        $("#agenda_reduzida").html("");
                                        $("#agenda_reduzida").prepend("<span class='fontello reduzido'></span>");
                                        $("#agenda_reduzida").append(w);
                                        if (_projeto == "grupo") {
                                            $(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                                            $(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
                                        }
                                        $("#ava_barralateral-direita .bcs1 header").remove();
                                        setTimeout(function() {
                                            if (A.is(":visible")) {
                                                A.fadeOut("slow")
                                            }
                                        }, 5000)
                                    }
                                }
                                else {
                                        if (F == 0) {
                                            if (D == E && q !== "undefined" && q == true && ($(".ui-datepicker-today").attr("daytype") == "8" || $(".ui-datepicker-today").attr("daytype") == "9")) {
                                                var B = "";
                                                atualizaTotalEventosHoje(F);
                                                if (_projeto == "grupo") {
                                                    B = "AGENDA DO GRUPO"
                                                } else {
                                                    if (_projeto == "turma") {
                                                        B = "AGENDA DA TURMA"
                                                    } else {
                                                        if (location.href.toLowerCase().indexOf("/ava/pagina/") > 0) {
                                                            if ($("#idPagina").val() > 2) {
                                                                B = "AGENDA DA ESCOLA"
                                                            } else {
                                                                B = "AGENDA DE PROJETOS"
                                                            }
                                                        } else {
                                                            B = "MINHA AGENDA"
                                                        }
                                                    }
                                                }
                                                var w = $("<span>");
                                                w.addClass("conteudoAgenda");
                                                w.text(B);
                                                if (_projeto == "grupo") {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                        $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                    }
                                                } else {
                                                    if (_projeto == "turma") {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                            $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                        }
                                                    } else {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                            if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                                $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                            }
                                                        } else {
                                                            if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                                    $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                $("#agenda_reduzida").html("");
                                                $("#agenda_reduzida").prepend("<span class='fontello reduzido'></span>");
                                                $("#agenda_reduzida").append(w);
                                                if (_projeto == "grupo") {
                                                    $(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                                                    $(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
                                                }
                                                $("#ava_barralateral-direita .bcs1 header").remove()
                                        }
                                        }
                                }

                                    
                            }
                   

                    }
                    catch(error){

                        console.log('Aqio no else');
                                var E = $(".ui-datepicker-today").attr("databr");
                        a = y.split(";");
                        total = a.length - 1;
                        for (var z = 0; z < total; z++) {
                            b = a[z].split(",");
                            var H = "avaCalendario_" + b[1];
                            var F = parseInt(b[0]);
                            var u = b[2];
                            var D = b[1];

                            if (F > 0) {
                                var x = '<div class="agenda_BoxContador" style="position:absolute; margin:auto;">';
                                if (F > 4) {
                                    for ($i = 0; $i < 3; $i++) {
                                        x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                    }
                                    x = x + '<strong class="mais_eventos_agenda">+</strong>'
                                } else {
                                    for ($i = 0; $i < F; $i++) {
                                        x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                    }
                                }
                                x = x + "</div>";
                                $(".ui-state-default").each(function() {
                                    if ($(this).attr("ref") == H) {
                                        $(this).append(x);
                                        var L = "";
                                        if (u.length > 0) {
                                            var K = u.split("-");
                                            for (var J = 0; J < K.length; J++) {
                                                if (J == 0) {
                                                    L = "Continuo_" + K[J]
                                                } else {
                                                    L = L + ",Continuo_" + K[J]
                                                }
                                            }
                                            $(this).attr("eventoID", L)
                                        }
                                    }
                                });
                                if (D == E && q !== "undefined" && q == true && ($(".ui-datepicker-today").attr("daytype") == "8" || $(".ui-datepicker-today").attr("daytype") == "9")) {
                                    atualizaTotalEventosHoje(F);
                                    var B = "";
                                    var C = "";
                                    if (F > 1) {
                                        B = " para hoje";
                                        C = " eventos"
                                    } else {
                                        B = " para hoje";
                                        C = " evento "
                                    }
                                    var A = $("<div>");
                                    A.addClass("agendados_data").text(B);
                                    var G = $("<strong>");
                                    G.text(F + " " + C);
                                    var v = $("<a>");
                                    v.addClass("fechar_agendados").attr("title", "fechar").html("&nbsp;");
                                    var I = $("<div>");
                                    I.addClass("ponta_aviso_agenda");
                                    A.prepend(G).append(v).append(I);
                                    var w = $("<span>");
                                    w.text(B);
                                    w.prepend(G);
                                    if (_projeto == "grupo") {
                                        if (!($(".fontello").hasClass("setaAgendaUp"))) {
                                            $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                        }
                                    } else {
                                        if (_projeto == "turma") {
                                            if (!($(".fontello").hasClass("setaAgendaDown"))) {
                                                $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                            }
                                        } else {
                                            if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                    $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                }
                                            } else {
                                                if (!($(" .boxAgendaReduzida.fontello").hasClass("setaAgendaUp"))) {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                        $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    $("#agenda_reduzida").html("");
                                    $("#agenda_reduzida").prepend("<span class='fontello reduzido'></span>");
                                    $("#agenda_reduzida").append(w);
                                    if (_projeto == "grupo") {
                                        $(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                                        $(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
                                    }
                                    $("#ava_barralateral-direita .bcs1 header").remove();
                                    setTimeout(function() {
                                        if (A.is(":visible")) {
                                            A.fadeOut("slow")
                                        }
                                    }, 5000)
                                }
                            } 
                            else {
                                if (F == 0) {
                                    if (D == E && q !== "undefined" && q == true && ($(".ui-datepicker-today").attr("daytype") == "8" || $(".ui-datepicker-today").attr("daytype") == "9")) {
                                        var B = "";
                                        atualizaTotalEventosHoje(F);
                                        if (_projeto == "grupo") {
                                            B = "AGENDA DO GRUPO"
                                        } 
                                        else {
                                            if (_projeto == "turma") {
                                                B = "AGENDA DA TURMA"
                                            } else {
                                                if (location.href.toLowerCase().indexOf("/ava/pagina/") > 0) {
                                                    if ($("#idPagina").val() > 2) {
                                                        B = "AGENDA DA ESCOLA"
                                                    } else {
                                                        B = "AGENDA DE PROJETOS"
                                                    }
                                                } else {
                                                    B = "MINHA AGENDA"
                                                }
                                            }
                                        }
                                        var w = $("<span>");
                                        w.addClass("conteudoAgenda");
                                        w.text(B);
                                        if (_projeto == "grupo") {
                                            if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                            }
                                        } else {
                                            if (_projeto == "turma") {
                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                    $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                }
                                            } else {
                                                if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                        $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaDown'>")
                                                    }
                                                } else {
                                                    if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaUp"))) {
                                                        if (!($(".boxAgendaReduzida .fontello").hasClass("setaAgendaDown"))) {
                                                            $(".boxAgendaReduzida").prepend("<span class='fontello setaAgendaUp'>")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        $("#agenda_reduzida").html("");
                                        $("#agenda_reduzida").prepend("<span class='fontello reduzido'></span>");
                                        $("#agenda_reduzida").append(w);
                                        if (_projeto == "grupo") {
                                            $(".boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                                            $(".agendaReduzidaCalendario").removeClass("boxAgendaReduzida")
                                        }
                                        $("#ava_barralateral-direita .bcs1 header").remove()
                                    }
                                }
                            }
                        }
                    }



                    // console.log('Top');

                },
                error: function(u) {}
            })
        }


    
    
    
    }


function updateMonth(retornoEventosFilho){

                                var a = "";
                                var E = $(".ui-datepicker-today").attr("databr");
                                a = retornoEventosFilho.split(";");
                                total = a.length - 1;
                                
                                for (var z = 0; z < total; z++) {

                                    b = a[z].split(",");
                                    var H = "avaCalendario_" + b[1];
                                    var F = parseInt(b[0]);
                                    var u = b[2];
                                    var D = b[1];

                                    // var numeroAtividadesNoDia =  comparaDatas( D ,listaAtividadesParaAgendar );
                                    // var numeroAtividadesNoDia =  0;

                                    // console.log( 'NUmer do dia   '+numeroAtividadesNoDia  );

                                    // F = F + numeroAtividadesNoDia ;

                                    // console.log('Dia '+D+ " EVENTOS " + F);
                                    if (F > 0) {
                                        
                                        var x = '<div class="agenda_BoxContador" style="position:absolute; margin:auto;">';
                                        if (F > 4)
                                         {
                                            for ($i = 0; $i < 3; $i++) {
                                                x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                            }
                                            x = x + '<strong class="mais_eventos_agenda">+</strong>'
                                        } 
                                        else 
                                        {
                                            for ($i = 0; $i < F; $i++) {
                                                x = x + '<div class="agenda_countEvento" style="width:4px; height:4px; float:left; margin:1px;"></div>'
                                            }
                                        }
                                        x = x + "</div>";
                                        
                                        console.log($(".ui-state-default").html());

                                        $(".ui-state-default").each(function() {
                                            console.log('Valor de H -> '+H);
                                            
                                            if ( $(this).attr("ref")==H ) {
                                                $(this).append(x);
                                                var L = "";
                                                if (u.length > 0) {
                                                    var K = u.split("-");
                                                    for (var J = 0; J < K.length; J++) {
                                                        if (J == 0) {
                                                            L = "Continuo_" + K[J]
                                                        } else {
                                                            L = L + ",Continuo_" + K[J]
                                                        }
                                                    }
                                                    $(this).attr("eventoID", L)
                                                }
                                            }

                                        });
                                    }
                                }

}


function fecharBalaoQtdEventos(a) {
    a.hide()
}

function getDates(b) {
    var e = b;
    var c = new Date(e[0]).getTime(),
        h = new Date(e[e.length - 1]).getTime();
    var g = [],
        a = c,
        f;
    while (a <= h) {
        f = new Date(a);
        dia = f.getDate();
        mes = f.getMonth() + 1;
        if (dia < 10) {
            dia = "0" + dia
        }
        if (mes < 10) {
            mes = "0" + mes
        }
        g.push(dia + "/" + mes + "/" + f.getFullYear());
        a = new Date(a);
        a.setDate(a.getDate() + 1);
        a = a.getTime()
    }
    return g
}

function mudarRel(c, b, a) {
    console.log('PAssou por aqui');
    tamanho = c.length;
    for (i = 0; i < tamanho; i++) {
        if (_projeto == "grupo") {
            c[i].attr("rel", "/AVA/Agenda/Grupo/VerificaEventoData?data=" + b[i] + "&idCategoria=" + a + "&strLinkPermanente=" + idUsuarioPublico);
            console.log(5);
            c[i].attr("href", "/AVA/Agenda/Grupo/VerificaEventoData?data=" + b[i] + "&idCategoria=" + a + "&strLinkPermanente=" + idUsuarioPublico)
            console.log(6);
            
        } else {
            if (_projeto == "turma") {
                console.log(7);
                
                c[i].attr("rel", "/AVA/Agenda/Home/VerificaEventoData?data=" + b[i] + "&idCategoria=" + a + "&bolMostrarFiltro=false&idTurma=" + $("#idTurma").val());
                c[i].attr("href", "/AVA/Agenda/Home/VerificaEventoData?data=" + b[i] + "&idCategoria=" + a + "&bolMostrarFiltro=false&idTurma=" + $("#idTurma").val())
            } else {
                if (_projeto == "pagina") {
                    if ($("#idPagina").val() > 2) {
                   console.log(8);
                        
                        c[i].attr("rel", "/AVA/Agenda/Home/VerificaEventoData?data=" + b[i] + "&idCategoria=2&bolMostrarFiltro=false");
                        c[i].attr("href", "/AVA/Agenda/Home/VerificaEventoData?data=" + b[i] + "&idCategoria=2&bolMostrarFiltro=false")
                    } else {
                   console.log(9);
                        
                        c[i].attr("rel", "/AVA/Agenda/Home/VerificaEventoData?data=" + b[i] + "&idCategoria=" + a);
                        c[i].attr("href", "/AVA/Agenda/Home/VerificaEventoData?data=" + b[i] + "&idCategoria=" + a)
                    }
                } else {
                   console.log(10);
                    
                    
                    c[i].attr("rel", "/AVA/Agenda/Home/VerificaEventoData?data=" + b[i] + "&idCategoria=" + a);
                    c[i].attr("href", "/AVA/Agenda/Home/VerificaEventoData?data=" + b[i] + "&idCategoria=" + a)
                }
            }
        }
    }
}

function comparaDatas(  data , listaAtividadesParaAgendar  ){
    var number = 0 ;

    //Remover o comentário para funcionar

    // listaAtividadesParaAgendar.forEach(  function( item , chave   ){

       
    //     var date= item.strDtmInicio.split("/");
    //     var dataInicial = new Date( date[2] , date[1] - 1 ,  date[0] );

    //     var date2= item.strDtmFim.split("/");
    //     var dataFinal = new Date( date2[2] , date2[1] - 1 ,  date2[0] );

    //     var date3= data.split("/");
    //     var compareDate = new Date( date3[2] , date3[1] - 1 ,  date3[0] );

       

       
    //     if(  compareDate.getMonth()  == dataInicial.getMonth() ){
        

    //             if(   compareDate.getDate() >= dataInicial.getDate() && compareDate.getDate() <= dataFinal.getDate()      ){
    //                 number  = number+1;
    //             }

    //     }


         



    // });

    return number;
}



 function abrirQuestaoEducacional(strUrl){
        

            location.href = strUrl;
        


    }


    function abrirQuestao( base ,disponivel){

        


         if( disponivel.indexOf('true') >= 0 ){


            var token =  localStorage.getItem('Token');


            var strUrl = 'https://aprimoraweb.educacional.com.br/#/main/module/question?data='+encodeURIComponent(token)+'&tk='+encodeURIComponent(token)+'&dat='+encodeURIComponent(base)+'&l=false'+'&ver=4.1.0&acs=&prx=true'+'&usr='+encodeURIComponent(token);


            location.href = strUrl;
        }
        else{
            // alert('Atividade ainda não está disponível');
        }

    }



 function verficaDispinibilidade(  dateStart , dateEnd  ){

        try{


          
            var dateParts = dateStart.split("/");
            var initialWorkDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            var dateParts = dateEnd.split("/");
            var finalWorkDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); 


            // var dateStart = epochStartDate.getDate()+'/'+(epochStartDate.getMonth()+1)+'/'+epochStartDate.getFullYear() ;
            // var dateEnd =  epochEndDate.getDate()+'/'+(epochEndDate.getMonth()+1)+'/'+epochEndDate.getFullYear() ;
            // var dateStartTime = epochStartDate.getHours()+':'+(epochStartDate.getMinutes());
            // var dateEndTime = epochEndDate.getHours()+':'+(epochEndDate.getMinutes()); 

            // alert(  'date 1 - '+epochStartDate+'   , dat 2 -  ' +epochEndDate  );

            var currDay = new Date; // get current date
            var first = currDay.getDate() - currDay.getDay(); // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6


            //26
            //29

            var firstWeekDay = new Date(currDay.setDate(first));//8
            var lastWeekDay = new Date(currDay.setDate(last));//14


            if(  initialWorkDate.getDate()  >=  firstWeekDay.getDate()  && initialWorkDate.getDate()  >=  lastWeekDay.getDate()   ){

                return false;
            }
            else{

                return true;

            }
        }
        catch(err){
            // alert(err);
        }

    } 


function getDadosDataEvento() {
    _dataInicial = $(".avaJCalendario:first").parent().attr("dataus");
    _dataFinal = $(".avaJCalendario:last").parent().attr("dataus");
    _mes = $(".ui-datepicker-title").attr("mes");
    _ano = $(".ui-datepicker-title").attr("ano")
}

function adequaAgendaNovaHome() {
    var b = document.location.href.toLowerCase();
    var a = b.indexOf("/ava/mural");
    if (a > 0) {
        $(".filtro_agenda_eventos strong").each(function() {
            $(this).text("Filtrar por")
        });
        $(".container").css("width", "")
    }
}

function atualizaTotalEventosHoje(a) {
    if (a < 1) {
        $("#agenda_noti_quant").hide();
        $("#agenda_noti_quant2").hide()
    } else {
        $("#agenda_noti_quant").html(a);
        $("#agenda_noti_quant").show();
        $("#agenda_noti_quant2").html(a)
    }
}

function removeSelecionadosAgenda() {
    arrayEntidadeAux = new Array();
    arrayUsuarioAux = new Array();
    alterarQtdUsuariosLabelLajotinha(".compartilhamento_link");
    $(classSeletor).AvaSelector("limparUsuarios")
};

function mostraFilhos(position){

    try{

        if(eResponsavel == undefined){
            eResponsavel = false;
        }

        var secret = window.localStorage.getItem('secret');

        var loginName =  secret.substring(0 , secret.indexOf("..") )   ;

        setTimeout(() => {
            
            if( eResponsavel == true   ){

                $('#ul_filho').empty();
                
                if(g_Filhos.length <= 0 ){
                    $.ajax({
                        url: "/AVA/Barras/Home/RetornaMeusFilhos/"+loginName,
                        async: true,
                        success: function(retorno){
                            
                            if(g_Filhos.length <= 0){
                                g_Filhos = retorno.Result;
                            }
                            
                            remontarFiltroFilhos(0);
                            
                        }

                        ,
                        error: function(retorno){
                            console.log('error');
                        }

                    });
                }
                else{
                    
                    remontarFiltroFilhos(position);
                    var k = "";
                    $("#formTemp").find(":checked").each(function() {
                        k = k + $(this).val() + ","
                    });
                    var w = k.length;
                    k = k.substring(0, w - 1);                    

                    // mudarRel(intOne, intTwo, intThree);
                    var n = $(".avaJCalendario:first").parent().attr("dataus");
                    var s = $(".avaJCalendario:last").parent().attr("dataus");
                    var u = $(".ui-datepicker-title").attr("mes");
                    var m = $(".ui-datepicker-title").attr("ano");
                    verificaEventos(n, s, u, m, k, true);
                    // validarEdicaoNovaAgenda();
                }

                $('#id_agenda_filhos').show();
                
                $('.ativo').show();

            }
            

        }, 100);
    }
    catch(err){

    }
    
}

function remontarFiltroFilhos(position){
    
    var strData = '';
    var pessoaSelecionada = {};
    if(g_Filhos.length > 0){
        

        strData += ''+           
        '<div class="filho_selecionado"  data-id="'+g_Filhos[position].id+'" title="'+g_Filhos[position].strNome+'">'+
        '   <img src="'+g_Filhos[position].strMiniFoto+'">'+g_Filhos[position].strNome+
        '</div>';

        strData += ''+
        '<li class="ativo" data-id="'+g_Filhos[position].id+'" data-ix="'+position+'" title="'+g_Filhos[position].strNome+'">'+
         '   <img src="'+g_Filhos[position].strMiniFoto+'">'+g_Filhos[position].strNome+
        '</li>';


        $.each(g_Filhos, function (ix, item) {
        
            
            if(ix == 0 && position ==0  ){
               
                strData += ''+
                '<li class="ativo" data-id="'+item.id+'" data-ix="'+ix+'" title="'+item.strNome+'">'+
                 '   <img src="'+item.strMiniFoto+'">'+item.strNome+
                '</li>';
            }
            else{
                strData += ''+
                '<li class="" data-id="'+item.id+'" data-ix="'+ix+'" title="'+item.strNome+'">'+
                 '   <img src="'+item.strMiniFoto+'">'+item.strNome+
                '</li>';
            }
            // if(g_PessoaSelecionada == item.id){
            //     pessoaSelecionada = item;
            // }
        });

       

    }

    $("#ul_filho").mouseover(function(){
        $('#ul_filho').addClass("open");
    });

    $("#ul_filho").mouseout(function(){
        $('#ul_filho').removeClass("open");
    });

    $('#ul_filho').html(strData);

    // if(g_PessoaSelecionada == 0){
        // $(".filho_selecionado").html( '   <img src="'+pessoaSelecionada.strMiniFoto+'">'+pessoaSelecionada.strNome);
        // $(".filho_selecionado").attr('title', pessoaSelecionada.strNome);
        // $(".filho_selecionado").attr('data-id',pessoaSelecionada.id);

        // $(".filho_selecionado").attr('data-id',pessoaSelecionada.id);
        // g_PessoaSelecionada = $(".filho_selecionado").attr('data-ix');
    // }
    
    $("#ul_filho li").click(function(){

        var strObj = $(this).attr('data-ix');
        var idUserAgenda = $(this).attr('data-id');

        $("#ul_filho li").each(function(n) {
            $(this).removeClass('ativo');
        });

        $( "#ul_filho li" ).eq( strObj ).addClass('ativo');

        // $(".filho_selecionado").html( '   <img src="'+g_Filhos[strObj].strMiniFoto+'">'+g_Filhos[strObj].strNome);
        // $(".filho_selecionado").attr('title',g_Filhos[strObj].strNome);
        // $(".filho_selecionado").attr('data-id',g_Filhos[strObj].id);
        g_PessoaSelecionada = idUserAgenda;
        recriaAgenda(idUserAgenda,strObj);

    });

    $('#id_agenda_filhos').show();
                
    $('.ativo').show();
}



function recriaAgenda(idUserAgenda,position){


    var b = "MINHA AGENDA";
    if (location.href.toLowerCase().indexOf("/ava/pagina/") > 0) {
        b = "AGENDA DE PROJETOS";
        if ($("#idPagina").val() > 2) {
            b = "AGENDA DA ESCOLA"
        }
    }
    $("#agenda_reduzida").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
    $("#ava_barralateral-direita  .bcs1 header h1").text(b);
    $("#dadosAgenda").html("<span class=\"carregando_center\"><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></span>");
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "/AVA/Agenda/Home/AgendaFilhos",
        data: {
            strURL: location.href,
            idUserAgenda: idUserAgenda
        },
        success: function(d) {
            
            $("#dadosAgenda").html(d);
            $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            $("#calendar1").wijcalendar({
                culture: "pt-BR",
                displayDate: new Date(dataReal)
            });
            $(".boxAgendaReduzida").show();
            adequaAgendaNovaHome();

            // setTimeout(() => {
                // remontarFiltroFilhos();
                mostraFilhos(position);
                
                
            // }, 3000);
            
        },
        error: function(d) {
            if (d.status != 0) {
                console.debug("Ocorreu um erro na busca da agenda")
            }
        }
    })
}