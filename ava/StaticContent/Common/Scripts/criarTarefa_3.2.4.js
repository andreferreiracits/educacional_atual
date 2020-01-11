var etapas = [];
var idCaminhos = [];
var Materias = null;
var ID_FERRAMENTA_TIPO_TAREFA = 17;


var idEtapa = 0;
var idRecurso = 0;
var idPublicacao = 0;
var idAvaliacao = 0;
var intValorRecurso = 0;
var intValorRecurso = 0;
var recurso = 0;

var dadosTarefa = {
    recurso : {
        idPublicacao : 0,
        idAvaliacao : 0,
        idRecurso : 0,
        nome : "",
        descricao: "",
        pOrdem : 0,
        sOrdem : 0,
        intValor : 0
    },
    midia : {
        idMidia : "",
        strLinkVideo: "",
        idTipoMidia : 0
    },
    links : [],
    tags : [],
    titulo : "",
    descricao : "",
    complemento : "",
    intNota : 0,
    idGrupo : 0,
    solicitarEntrega: 0,
    privadoCompartilhado : 2,
    turmasGrupos : [],
    alunos : [],
    dataInicial : "",
    dataFinal : "",
    horaInicio : "",
    horaFim : "",
    idUsuario : 0,
    material : {
        idFerramentaTipo: 0,
        idFerramenta: 0,
        arquivos: []
    }
};

function salvarRecursoRapidoTarefa(idCaminho, idEtapa, strTitulo, strDescricao, intValor) {
    console.log(" ====================== salvarRecursoRapidoTarefa");
    //$("#idCaminho").val(k);
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
        data: {
            idCaminho: idCaminho,
            idEtapa: idEtapa,
            idRecurso: idRecurso,
            idPublicacao: idPublicacao,
            idAvaliacao: idAvaliacao,
            strTitulo: strTitulo,
            strDescricao: strDescricao,
            intValor: intValor
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (m) {
            console.log("recurso salvo com sucesso");
            zerarValoresRecursos();
        },
        error: function (l) {
            if (l.status != 0) {
                console.debug("erro ao salvar recurso")
            }
        }
    })
}

function recuperarRecurso(i, e, h) {
    console.log("**************inserirRecursoRapidoTarefa");
    $(".time_loading").css("display", "block");
    var j = $("#strTituloTarefa").val();
    var g = $("#txtDescricaoTarefa").val();
    j = $("<div />").text(j).html();
    g = $("<div />").text(g).html();
    var c = 0;
    if ($("#valeNota").hasClass("ativo")) {
        c = $("#intValorTarefa").val();
        if (c == "") {
            $("#intValorTarefa").addClass("ativo");
            return
        } else {
            $("#intValorTarefa").removeClass("ativo")
        }
    } else {
        $("#intValorTarefa").removeClass("ativo")
    }
    var f = $("#idCaminho").val();
    if (f == "" || f == undefined) {
        f = 0
    }
    var d = $("#idEtapa").val();
    if (d == "" || d == undefined) {
        d = 0
    }
    var b = 2;
    $("input:radio[name=rTipo]").each(function () {
        if ($(this).is(":checked")) {
            b = parseInt($(this).val())
        }
    });
    if ($("#previewRecursoRapidoTarefa").length > 0) {
        excluirRecursoRapidoTarefa()
    }
    $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled");
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarCaminho/",
            data: {
                idRota: f,
                idUsuario: 0,
                strTitulo: j,
                strDescricao: g,
                intStatus: b,
                strTags: "",
                intTipo: 2,
                json:null,
                userturma:0
            },
            success: function (k) {
                $("#idCaminho").val(k);
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                    data: {
                        idCaminho: k,
                        idEtapa: d,
                        idRecurso: i,
                        idPublicacao: e,
                        idAvaliacao: h,
                        strTitulo: j,
                        strDescricao: g,
                        intValor: c
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (m) {
                        var n = m.split("_");
                        var l = n[0];
                        $("#idEtapa").val(n[1]);
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapidoNovaHome/",
                            data: {
                                idRecursoEtapa: l,
                                idAvaliacao: h
                            },
                            success: function (o) {
                                $("#previewAnexosTarefa").append(o);
                                removerClasseAtivo();
                                $("#clickListaRecurso").attr("data-original-title", "Substituir recurso");
                                $.fancybox.close();
                                $(".tooltip").text("Substituir recurso");
                                $("#abreListaRecursoTarefa").attr({
                                    href: "javascript:void(0);",
                                    title: "Substituir recurso"
                                });
                                $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso")
                            },
                            error: function (o) {
                                if (o.status != 0) {
                                    console.debug("erro ao retornar recurso escolhido")
                                }
                            }
                        })
                    },
                    error: function (l) {
                        if (l.status != 0) {
                            console.debug("erro ao salvar recurso")
                        }
                    }
                })
            },
            error: function (k) {
                if (k.status != 0) {
                    console.debug("erro ao salvar tarefa rápida")
                }
            }
        })
    }, 500)
}


function ListarDisciplinas(component) {

    var idProfessor = localStorage.getItem('idUser');
    if (Materias != null && Materias.readyState < 4) {
        Materias.abort()
    }
    var strHtml = '<div class="btn-group" id="idMateria">' +
        '<button href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton btnDisciplina_turmas">Disciplina&nbsp;<span class="caret"></span></button>' +
        '<ul class="dropdown-menu ulDisciplina_turmas"></ul>' +
        '</div>';

    $("#" + component).html(strHtml);

    var varHtmlStr = '<li dic="0" >' +
        '<input type="checkbox" id="ckDisciplina0">' +
        '<label for="ckDisciplina0">Selecione a disciplina</label>' +
        '</li>';

    Materias = $.ajax({
        url: "/ava/seletor/home/getMateriaPorProfessor",
        type: "POST",
        dataType: "json",
        data: { "idProfessor": idProfessor },
        success: function (aq) {
            if (aq.materias.length > 0) {
                $.each(aq.materias, function (ix, item) {
                    console.log(" item.strMateria " + item.strMateria);
                    varHtmlStr += '<li dic="' + item.IdMateria + '">' +
                        '<input type="checkbox" id="ckDisciplina' + item.IdMateria + '">' +
                        '<label for="ckDisciplina' + item.IdMateria + '">' + item.strMateria + '</label>' +
                        '</li>';
                });


                $('#' + component + ' ul.ulDisciplina_turmas').html(varHtmlStr);

                $('#' + component + ' button.btnDisciplina_turmas').click(function () {
                    $('#' + component + ' ul.ulDisciplina_turmas').show();
                });

                $('#' + component + ' ul.ulDisciplina_turmas').on('mouseleave', function () {
                    this.style.display = 'none';
                    $(this).slideUp();
                });

                $('#' + component + ' ul.ulDisciplina_turmas li').click(function () {
                    var valor = $(this).attr('dic');

                    $('#' + component + ' ul.ulDisciplina_turmas li input[type="checkbox"]:checked').each(function (i, item) {
                        item.checked = false;
                    });

                    document.getElementById("ckDisciplina" + valor).checked = true;
                    if (valor == 0) {
                        $('#' + component + ' button.btnDisciplina_turmas').html("Selecione a disciplina");
                        $('#' + component + ' button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');
                        disciplinaSelecionada = 0;
                    }
                    else {
                        disciplinaSelecionada = valor;
                        $('#' + component + ' button.btnDisciplina_turmas').html($(this).find('label').html());
                        $('#' + component + ' button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');
                    }
                    $('#' + component + ' ul.ulDisciplina_turmas').hide();
                });
            }
        },
        error: function (ap) {
            alert("ap.responseText - " + ap.materias);
            if (ap.statusText != "abort") {
                console.log(ap.responseText)
            }
        }
    })
}


//Aqui abre o criar a tarefa
function abrirCriarTarefa() {
    console.log("entrou no abrirCriarTarefa criarTarefa.js");
    
    // location.href = "/AVA/Caminhos/Home/CriarTarefa";
    $("#blocoDigaLa").hide();
    $("#menu_diga_la").removeClass("ativo");
    $("#menu_criar_tarefa").addClass("ativo");
    $("#area_criar_tarefa").show();
    arrayUsuariosAux = new Array();
    arrayGrupoAux = new Array();
    limpaArrayArquivosTimeLine();
    limpaPreviewArquivosDigaLa();
    limpaPreviewImagemMensagemRapida();
    limpaArrayImagensTimeLine();
    $("#container_preview_video").fadeOut("slow", function () {
        $(this).html("");
        $(".enviar_video").hide()
    });
    $(".dialogo_multimidia").hide();
    $("#erro_enviar_video").hide();
    arrayArquivosUpload = undefined;
    $("#btnCancelarFerramentaMural").hide();
    $("#seletorMuralTarefa").show();
    $("#seletorMuralDigaLa").hide();
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/AbreCriarTarefaRapidaNovaHome/",
        success: function (b) {
            $("#criarTarefaCarregando").remove();
            $("#area_criar_tarefa .load").hide();
            $("#area_criar_tarefa").html(b);
            if (b.indexOf("Você não tem turmas associadas") != -1) {
                $("#area_criar_tarefa").removeClass("bloco_tarefa").addClass("bloco_dialogo");
                return
            }
            if ($("#strTituloTarefa").val() !== undefined) {
                $(".compartilhamento").find("li:first").text("Agendar para:");
                $("#compartilhar").hide();
                $("#agendar").show();
                $(".selecao_personas").find("li:first").text("Selecione turmas e pessoas")
            } else {
                $("#compartilhar").hide()
            }
            $(".ph").addPlaceholder();
            $("#strTituloTarefa").live("focus", function () {
                $(this).removeClass("ava_field_alert")
            });
            $("#intValorTarefa").focus(function () {
                $(this).removeClass("alerta")
            });
            $(".tooltip_title").tooltip({
                offset: [-10, 0]
            });
            $("#valeNota").click(function () {
                if ($("#valeNota").attr("disabled") == "disabled") {
                    return
                }
                if ($("#valeNota").hasClass("ativo")) {
                    $("#valeNota").removeClass("ativo");
                    $("#intValorTarefa").prop("disabled", true);
                    $("#intValorTarefa").val("");
                    $("#intValorTarefa").focus()
                } else {
                    $("#valeNota").addClass("ativo");
                    $("#intValorTarefa").prop("disabled", false)
                }
            });
            $("#trf_devolutiva").click(function () {
                if ($("#trf_devolutiva").hasClass("ativo")) {
                    $("#trf_devolutiva").removeClass("ativo")
                } else {
                    $("#trf_devolutiva").addClass("ativo")
                }
            });
            $("#dataInicio").setMask("date");
            $("#dataFim").setMask("date");
            $("#horaInicio").setMask("29:59").timepicker({
                myPosition: "right top",
                atPosition: "right bottom"
            });
            $("#horaFim").setMask("29:59").timepicker({
                myPosition: "right top",
                atPosition: "right bottom"
            });
            $("#intValorTarefa").digitosDouble();
            montaCampoData("#dataInicio", "#dataFim");
            $("#dataInicio,#dataFim,#horaInicio,#horaFim").focus(function () {
                $(this).removeClass("ava_field_alert")
            });
            $("#txtDescricaoTarefa").limit("1000", "");
            if (b.indexOf("Você não tem turmas associadas") == -1 && !($("#seletorMuralTarefa").AvaSelector("bolInstanciado"))) {
                $("#seletorMuralTarefa").AvaSelector({
                    bolProfessor: false,
                    bolLajota: true,
                    bolSeguidores: false,
                    bolAluno: true,
                    botaoConclusao: $("#agendar"),
                    strTitulo: "Agendar para:",
                    btnTextoBotaoConclusaoSeletor: "Adicionar",
                    bolSeletorFinalizar: false,
                    bolCoordenador: false,
                    usuarioGrupoAdicionado: function (c, f, e) {
                        console.log("c arrayUsuariosAux =====================" + JSON.stringify(c));
                        console.log("f arrayGrupoAux =====================" + JSON.stringify(f));
                        console.log("e arrayGrupoAux =====================" + JSON.stringify(e));

                        arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                        arrayGrupoAux.splice(0, arrayGrupoAux.length);
                        for (var d = 0; d < c.length; d++) {
                            arrayUsuariosAux.push(c[d])
                        }
                        for (var d = 0; d < f.length; d++) {
                            arrayGrupoAux.push(f[d])
                        }
                        if (arrayUsuariosAux.length > 0 || arrayGrupoAux.length > 0) {
                            $("#feed_erro_tarefa").hide();
                            $("#erro_agendar_participante").hide();
                            $(".seletorGlobal .seletor_lista").removeClass("ava_field_alert")
                        }
                    }
                });
                $("#seletorMuralTarefa").show();
                instanciaSeletorMuralTarefa = true;
                $("#seletorMuralTarefa .seletor_lista input").attr("placeholder", "Agendar para...");
                $("#seletorMuralTarefa h1").first().remove();
                ListarDisciplinas("id_materia_turma");
            }
        },
        error: function (b) {
            if (b.status != 0) {
                console.log("Erro ao carregar tarefa rápida.")
            }
        }
    })
}

function abrirArquivosDigaLa() {
    abrirUploadArquivosDigaLa()
}

function abrirLinkTarefa() {
    removerClasseAtivo();
    $(".inserir_midia").hide();
    $("#tarefaInserirLink").show();
    $("#clickLinkTarefa").addClass("ativo")
}

function inserirLinkTarefa_OLD() {
    var c = $("#strTituloLink").val().trim();
    var g = $("#strLinkApoio").val().trim();
    var b = false;
    if (c == "" || c == "Título do Link") {
        $("#strTituloLink").addClass("ava_field_alert");
        b = true
    }
    if (g == "" || g == "Insira a URL") {
        $("#strLinkApoio").addClass("ava_field_alert");
        b = true
    }
    if (b) {
        return false
    }
    $("#strLinkApoio").removeClass("ava_field_alert");
    $("#strTituloLink").removeClass("ava_field_alert");
    if (g.indexOf("http") < 0) {
        g = "http://" + g;
        g = g.toLowerCase()
    }
    var e = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
    var i = e.test(g);
    if (!i) {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        return false
    }
    if (g.indexOf(".exe") > 0) {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        return false
    }
    var h = $("#idCaminho").val();
    if (h == "" || h == undefined) {
        h = 0
    }
    var f = $("#idEtapa").val();
    if (f == "" || f == undefined) {
        f = 0
    }
    var k = $("#strTituloTarefa").val();
    var j = $("#txtDescricaoTarefa").val();
    k = $("<div />").text(k).html();
    j = $("<div />").text(j).html();
    var d = 0;
    if ($("#valeNota").hasClass("ativo")) {
        d = $("#intValorTarefa").val()
    }
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarLinkApoioTarefaRapida/",
        data: {
            idCaminho: h,
            idEtapa: f,
            strTarefa: k != "" ? k : "Temp",
            strDescricao: j != "" ? j : "Temp",
            intNota: d,
            strTituloApoio: c,
            strLinkApoio: g
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (l) {
            var m = l.split("_");
            $("#idCaminho").val(m[0]);
            $("#idEtapa").val(m[1]);
            $("#idRecursoEtapa").val(m[2]);
            retornaLinksApoio(m[2])
        },
        error: function (l) {
            if (l.status != 0) {
                console.log("Erro ao salvar a tarefa.")
            }
        }
    })
}

function retornaLinksApoio(b) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SelecionarLinksEtapaNovaHome/",
        data: {
            idRecursoEtapa: b
        },
        success: function (c) {
            if (typeof (c) != "object") {
                $("#previewAnexosTarefa div[id=previewLinkTarefas]").remove();
                $("#previewAnexosTarefa").append(c);
                $("#previewAnexosTarefa").show();
                $("#tarefaInserirLink").hide();
                $("#strTituloLink").val("");
                $("#strLinkApoio").val("");
                removerClasseAtivo()
            }
        },
        error: function (c) {
            if (c.status != 0) {
                console.log("Erro ao retornar link da tarefa!")
            }
        }
    })
}

function removerLinkApoio(b) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirLinkApoio/",
        data: {
            idLink: b
        },
        success: function (c) {
            $("#" + b + "").parent().remove();
            if ($("#idTarefaLink").length == 0) {
                $("#clickLinkTarefa").removeClass("ativo")
            }
        },
        error: function () {
            mostraAlertaTarefa("Erro ao excluir link.")
        }
    })
}

function abrirMidiaTarefa() {
    removerClasseAtivo();
    var b = $("#clickMidiaTarefa").attr("data-original-title");
    if (b == "Substituir vídeo") {
        $("#btnAcaoRemoverVideo").click()
    }
    $(".inserir_midia").hide();
    $("#tarefaInserirVideo").show();
    $("#clickMidiaTarefa").addClass("ativo")
}

function inserirMidiaTarefa_OLD() {
    var f = $(".tarefa_video").val();
    var d = 0;
    var b = "";
    var c = f.substring(f.indexOf("t=") + 2, f.lenght);
    var e = retornaMatchVideo(f);
    if (e) {
        e.always(function () {
            if (bolVideoProibido && strTipoVideo == "") {
                mostraAlertaTarefa("Este vídeo tem sua incorporação proibida pelo seu proprietário e não pode ser inserido.");
                bolVideoProibido = false;
                strTipoVideo = "";
                $(".tarefa_video").find("input").addClass("ava_field_alert");
                return false
            } else {
                var j = validarURLVideo(f);
                if (j == "youtubeEncurtado") {
                    d = 1;
                    b = f.substring(f.indexOf("be/") + 3, f.length)
                } else {
                    if (j == "youtube") {
                        d = 1;
                        if (f.indexOf("&") > 0) {
                            b = f.substring(f.indexOf("v=") + 2, f.indexOf("&"))
                        } else {
                            b = f.substring(f.indexOf("v=") + 2, f.length)
                        }
                    } else {
                        if (j == "vimeo") {
                            d = 2;
                            b = f.substring(f.indexOf("vimeo.com/") + 10, f.length)
                        } else {
                            if (j == "globo") {
                                d = 3;
                                var m = f.split("/");
                                b = m[m.length - 2]
                            } else {
                                $(".tarefa_video").find("input").addClass("ava_field_alert");
                                return false
                            }
                        }
                    }
                }
                var h = $("#idCaminho").val();
                if (h == "" || h == undefined) {
                    h = 0
                }
                var i = $("#idEtapa").val();
                if (i == "" || i == undefined) {
                    i = 0
                }
                var l = $("#strTituloTarefa").val();
                var g = $("#txtDescricaoTarefa").val();
                l = $("<div />").text(l).html();
                g = $("<div />").text(g).html();
                var k = 0;
                if ($("#valeNota").hasClass("ativo")) {
                    k = $("#intValorTarefa").val()
                }
                $("#previewAnexosTarefa").prepend('<div class="loader"><img src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif"></div>');
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/SalvarMidiaTarefaRapida/",
                    data: {
                        idCaminho: h,
                        idEtapa: i,
                        strTarefa: l,
                        strDescricao: g,
                        intNota: k,
                        idMidia: b,
                        idTipoMidia: d,
                        strLinkVideo: f
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (o) {
                        var n = o.split("_");
                        $("#idCaminho").val(n[0]);
                        $("#idEtapa").val(n[1]);
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/RetornaPreviewMidiaNew/",
                            data: {
                                tipoVideo: d,
                                idMidia: b
                            },
                            success: function (p) {
                                $("#previewAnexosTarefa .loader").remove();
                                var q = '<div class="anexo_preview anx_video">' + p + '<a href="javascript:void(0);" id="btnAcaoRemoverVideo" class="btn_acao opcao_excluir" onclick="excluirMidiaTarefa(this)"></a>';
                                $("#previewAnexosTarefa").prepend(q);
                                removerClasseAtivo();
                                $("#tarefaInserirVideo").hide();
                                $("#tarefaLinkVideo").val("");
                                $("#clickMidiaTarefa").attr("data-original-title", "Substituir vídeo");
                                $(".anexo_preview.anx_video").slideDown("slow", function () {
                                    $("#inserirMidiaTarefa").addClass("disable");
                                    $("#inserirMidiaTarefa").removeAttr("onclick");
                                    $("#boxMidiaTarefa").remove();
                                    $(".iframeVideoVimeo", "#container_empilhaextras").on("load", function () {
                                        var s = $f(this);
                                        var r = false;
                                        s.api("pause");
                                        s.addEvent("ready", function () {
                                            s.addEvent("play", function () {
                                                if (!r) {
                                                    r = true;
                                                    s.api("pause")
                                                }
                                            })
                                        })
                                    })
                                })
                            },
                            error: function (p) {
                                if (p.status != 0) {
                                    $("#container_empilhaextras").prepend("erro ao salvar mídia na tarefa!")
                                }
                            }
                        })
                    },
                    error: function (n) {
                        if (n.status != 0) {
                            $("#container_empilhaextras").prepend("erro ao mostrar preview da mídia!")
                        }
                    }
                })
            }
        })
    } else {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        bolVideoProibido = false;
        strTipoVideo = "";
        $("#boxMidiaTarefa").find("input").addClass("ava_field_alert")
    }
}

function excluirMidiaTarefa(c) {
    var b = $("#idEtapa").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirMidiaEtapa/" + b,
        success: function (d) {
            c.parentElement.remove();
            if ($("#iframeTarefaId").length == 0) {
                $("#clickMidiaTarefa").removeClass("ativo")
            }
            $("#clickMidiaTarefa").attr("data-original-title", "Inserir v&iacute;deo")
        },
        error: function (d) {
            if (d.status != 0) {
                $("#boxPreviewMidiaTarefa").prepend("erro ao excluir mídia da tarefa!")
            }
        }
    })
}

function validarURLVideo(c) {
    var g = "";
    var e = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var b = e.exec(c);
    if (c == "") {
        $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
        return false
    } else {
        if (!b || strTipoVideo == "") {
            mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
            $("#boxMidiaTarefa").find("input").addClass("ava_field_alert");
            return false
        } else {
            if (c.indexOf("//youtu") > 0) {
                g = "youtubeEncurtado"
            } else {
                if (c.indexOf("youtube.com/watch?v=") > 0) {
                    g = "youtube"
                } else {
                    if (c.indexOf("youtube.com/v/") > 0) {
                        g = "youtube"
                    } else {
                        if (c.indexOf("vimeo.com/") > 0) {
                            g = "vimeo"
                        } else {
                            if (c.indexOf("video.globo.com/") > 0) {
                                if (c.indexOf("GIM") > 0) {
                                    g = "globo"
                                } else {
                                    mostraAlertaTarefa("URL da globo falta o parâmetro ID.");
                                    return false
                                }
                            } else {
                                if (c.indexOf("globotv.globo.com/") > 0) {
                                    var f = c.split("/");
                                    var d;
                                    if (c.substring(c.length - 1, c.length) == "/") {
                                        d = 2
                                    } else {
                                        d = 1
                                    }
                                    if (!isNaN(f[f.length - d])) {
                                        g = "globo"
                                    } else {
                                        mostraAlertaTarefa("URL da globo falta o parâmetro ID.");
                                        return false
                                    }
                                } else {
                                    mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
                                    return false
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return g
}

function abreUploadTarefaOld() {
    removerClasseAtivo();
    var b = $("#idCaminho").val();
    var c = $("#idEtapa").val();
    var d = $("#strTituloTarefa").val();
    var g = $("#txtDescricaoTarefa").val();
    d = $("<div />").text(d).html();
    g = $("<div />").text(g).html();
    var e = "mural";
    var f = 0;
    var h = 0;
    if ($("#valeNota").hasClass("ativo")) {
        h = $("#intValorTarefa").val()
    }
    if (b == "" || b == undefined) {
        b = 0
    }
    if (c == "" || c == undefined) {
        c = 0
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/AVA/Caminhos/Home/AbreUploadTarefa/?idCaminho=" + b + "&idEtapa=" + c + "&strTarefa=" + d + "&strDescricao=" + g + "&intNota=" + h,
        dataType: "json",
        async: false,
        success: function (o, m) {
            var p = o[0];
            var t = o[1];
            var l = o[2];
            var v = o[3];
            $("#idEtapa").val(t);
            $("#idCaminho").val(l);
            var j = [];
            if (arrayArquivosUpload != null && arrayArquivosUpload != undefined) {
                if (arrayArquivosUpload.arrayArquivo != null && arrayArquivosUpload.arrayArquivo != undefined) {
                    if (arrayArquivosUpload.arrayArquivo.length > 0) {
                        for (var u in arrayArquivosUpload.arrayArquivo) {
                            j.push(arrayArquivosUpload.arrayArquivo[u].id)
                        }
                    }
                }
            }
            var k = {
                idFerramenta: t,
                idFerramentaTipo: v,
                idsArquivosSelecionados: j.join(",")
            };
            var w;
            try {
                w = document.createElement("<form name='upload'>")
            } catch (q) {
                w = document.createElement("form");
                w.name = "upload"
            }
            for (var n in k) {
                if (k.hasOwnProperty(n)) {
                    var s = document.createElement("input");
                    s.type = "hidden";
                    s.name = n;
                    s.value = k[n];
                    w.appendChild(s)
                }
            }
            w.target = "Upload";
            w.method = "POST";
            w.action = "/AVA/Upload";
            document.body.appendChild(w);
            var r = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                r = null
            }
            a = window.open("", "Upload", r);
            if (a) {
                w.submit()
            }
            $("#clickUploadTarefa").addClass("ativo")
        },
        error: function (k, i, j) {
            alert("Erro: " + j + "Status: " + i)
        }
    })
}

function abreUploadTarefa() {
    //$.fancybox.showLoading();
    console.log("entrouabreUploadTarefa 1 ");

    $("#previewImagemMural").dialog({
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

    removerClasseAtivo();
    var b = $("#idCaminho").val();
    var c = $("#idEtapa").val();
    var d = $("#strTituloTarefa").val();
    var g = $("#txtDescricaoTarefa").val();
    d = $("<div />").text(d).html();
    g = $("<div />").text(g).html();
    var e = "mural";
    var f = 0;
    var h = 0;
    if ($("#valeNota").hasClass("ativo")) {
        h = $("#intValorTarefa").val()
    }
    if (b == "" || b == undefined) {
        b = 0
    }
    if (c == "" || c == undefined) {
        c = 0
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        // url: "/AVA/Caminhos/Home/AbreUploadTarefa/?idCaminho=" + b + "&idEtapa=" + c + "&strTarefa=" + d + "&strDescricao=" + g + "&intNota=" + h,
        url: "/AVA/Caminhos/Home/AbreUploadCriarTarefa/?idCaminho=" + b + "&idEtapa=" + c + "&strTarefa=" + d + "&strDescricao=" + g + "&intNota=" + h,
        dataType: "json",
        async: false,
        success: function (o, m) {
            var p = o[0];
            var t = o[1];
            var l = o[2];
            var v = o[3];
            $("#idEtapa").val(t);
            $("#idCaminho").val(l);
            var j = [];
            if (arrayArquivosUpload != null && arrayArquivosUpload != undefined) {
                if (arrayArquivosUpload.arrayArquivo != null && arrayArquivosUpload.arrayArquivo != undefined) {
                    if (arrayArquivosUpload.arrayArquivo.length > 0) {
                        for (var u in arrayArquivosUpload.arrayArquivo) {
                            j.push(arrayArquivosUpload.arrayArquivo[u].id)
                        }
                    }
                }
            }
            var k = {
                idFerramenta: t,
                idFerramentaTipo: v,
                idsArquivosSelecionados: j.join(",")
            };
            var w;
            try {
                w = document.createElement("<form name='upload'>")
            } catch (q) {
                w = document.createElement("form");
                w.name = "upload"
            }
            for (var n in k) {
                if (k.hasOwnProperty(n)) {
                    var s = document.createElement("input");
                    s.type = "hidden";
                    s.name = n;
                    s.value = k[n];
                    w.appendChild(s)
                }
            }

            w.target = "upload";
            w.method = "POST";
            w.action = "/AVA/Upload";
            document.body.appendChild(w);

            var r = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                r = null;
            }
            $("#previewImagemMural iframe").append(w);
            w.submit();
            $("#previewImagemMural").dialog("open");
            $.fancybox.hideLoading();

            $("#clickUploadTarefa").addClass("ativo");

        },
        error: function (k, i, j) {
            alert("Erro: " + j + "Status: " + i)
        }
    })
}

function abreCodigoTarefa() {
    removerClasseAtivo();
    $("#clickInserirCodigo").addClass("ativo");
    var b = {
        autoSize: false,
        width: 680,
        height: 450,
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        autoResize: false,
        type: "ajax",
        href: "/AVA/Caminhos/Home/SelecaoCodigosLivro",
        beforeClose: function () {
            removerClasseAtivo();
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/ListaCodigosDidaticoNew",
                data: {
                    idRecursoEtapa: $("#idRecursoEtapa").val()
                },
                success: function (c) {
                    $("#previewAnexosTarefa").show();
                    $("#previewAnexosTarefa").append(c)
                },
                error: function (c) {
                    if (c.status != 0) {
                        console.debug("erro ao buscar codigos da tarefa!")
                    }
                }
            })
        },
    };
    $.fancybox(b);
    return false
}

function abreListaRecurso() {
    removerClasseAtivo();
    $("#clickListaRecurso").addClass("ativo");
    var b = {
        scrolling: "no",
        autoSize: false,
        width: 730,
        height: 530,
        autoResize: false,
        fitToView: false,
        type: "ajax",
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        autoResize: false,
        href: "/AVA/Caminhos/Home/ListaRecursos",
        afterShow: function () {
            EscondeOsObjects();
            $(".cover").mosaic({
                animation: "slide",
                speed: 500,
                hover_x: "400px"
            })
        },
        beforeClose: function () {
            removerClasseAtivo();
            MostraOsObjects();
            $("html").css({
                overflow: "scroll"
            })
        },
        beforeShow: function () {
            $("html").css({
                overflow: "hidden"
            })
        }
    };
    $.fancybox(b);
    return false
}

function inserirRecursoRapidoTarefa(i, e, h) {
    console.log("**************inserirRecursoRapidoTarefa");
    $(".time_loading").css("display", "block");
    var j = $("#strTituloTarefa").val();
    var g = $("#txtDescricaoTarefa").val();
    j = $("<div />").text(j).html();
    g = $("<div />").text(g).html();
    var c = 0;
    if ($("#valeNota").hasClass("ativo")) {
        c = $("#intValorTarefa").val();
        if (c == "") {
            $("#intValorTarefa").addClass("ativo");
            return
        } else {
            $("#intValorTarefa").removeClass("ativo")
        }
    } else {
        $("#intValorTarefa").removeClass("ativo")
    }
    var f = $("#idCaminho").val();
    if (f == "" || f == undefined) {
        f = 0
    }
    var d = $("#idEtapa").val();
    if (d == "" || d == undefined) {
        d = 0
    }
    var b = 2;
    $("input:radio[name=rTipo]").each(function () {
        if ($(this).is(":checked")) {
            b = parseInt($(this).val())
        }
    });
    if ($("#previewRecursoRapidoTarefa").length > 0) {
        excluirRecursoRapidoTarefa()
    }
    $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled");
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarCaminho/",
            data: {
                idRota: f,
                idUsuario: 0,
                strTitulo: j,
                strDescricao: g,
                intStatus: b,
                strTags: "",
                intTipo: 2,
                json:null,
                userturma:0
            },
            success: function (k) {
                $("#idCaminho").val(k);
                //pegar os dados do recurso
                // claudemir::::
                idEtapa = d;
                idRecurso = i;
                idPublicacao = e;
                idAvaliacao = h;
                intValorRecurso = c;

                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
                    data: {
                        idCaminho: k,
                        idEtapa: d,
                        idRecurso: i,
                        idPublicacao: e,
                        idAvaliacao: h,
                        strTitulo: j,
                        strDescricao: g,
                        intValor: c
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (m) {
                        var n = m.split("_");
                        var l = n[0];
                        $("#idEtapa").val(n[1]);
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoRapidoNovaHome/",
                            data: {
                                idRecursoEtapa: l,
                                idAvaliacao: h
                            },
                            success: function (o) {
                                $("#previewAnexosTarefa").append(o);
                                removerClasseAtivo();
                                $("#clickListaRecurso").attr("data-original-title", "Substituir recurso");
                                $.fancybox.close();
                                $(".tooltip").text("Substituir recurso");
                                $("#abreListaRecursoTarefa").attr({
                                    href: "javascript:void(0);",
                                    title: "Substituir recurso"
                                });
                                $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso")
                                
                            },
                            error: function (o) {
                                if (o.status != 0) {
                                    console.debug("erro ao retornar recurso escolhido")
                                }
                            }
                        })
                    },
                    error: function (l) {
                        if (l.status != 0) {
                            console.debug("erro ao salvar recurso")
                        }
                    }
                })
            },
            error: function (k) {
                if (k.status != 0) {
                    console.debug("erro ao salvar tarefa rápida")
                }
            }
        })
    }, 500)
}

//incluir o recurso na turma
function inserirRecursoRapidoTurma(idCaminho, idEtapa, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValor) {


    $.ajax({
        type: "POST",
        async: false,
        url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
        data: {
            idCaminho: idCaminho,
            idEtapa: idEtapa,
            idRecurso: idRecurso,
            idPublicacao: idPublicacao,
            idAvaliacao: idAvaliacao,
            strTitulo: strTitulo,
            strDescricao: strDescricao,
            intValor: intValor
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (o) {
            var p = o.split("_");
            var n = p[0];
        },
        error: function (n) {
            if (n.status != 0) {
                console.debug("erro ao salvar recurso")
            }
        }
    })
}
//

function excluirRecursoRapidoTarefa() {
    console.log("############ excluirRecursoRapidoTarefa");
    var c = $("#idCaminho").val();
    var d = $("#idEtapa").val();
    var f = $("#strTituloTarefa").val();
    var b = $("#txtDescricaoTarefa").val();
    f = $("<div />").text(f).html();
    b = $("<div />").text(b).html();
    var e = 0;
    if ($("#valeNota").hasClass("ativo")) {
        e = $("#intValorTarefa").val()
    }
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/InserirRecursoRapido/",
        data: {
            idCaminho: c,
            idEtapa: d,
            idRecurso: 11,
            idPublicacao: 0,
            idAvaliacao: 0,
            strTitulo: f,
            strDescricao: b,
            intValor: e
        },
        success: function (g) {
            $("#previewRecursoRapidoTarefa").slideUp("slow", function () {
                $("#previewRecursoRapidoTarefa").parent().remove();
                $("#strTituloTarefa, #txtDescricaoTarefa, #valeNota, #intValorTarefa, #entrega_tarefa").removeAttr("disabled")
            });
            $(".tooltip").text("Inserir recurso");
            $("#abreListaRecursoTarefa").attr({
                href: "javascript:void(0);",
                title: "Inserir recurso"
            });
            $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Inserir recurso");
            $("#clickListaRecurso").attr("data-original-title", "Inserir recurso")
        },
        error: function (g) {
            if (g.status != 0) {
                console.debug("erro ao remover recurso")
            }
        }
    })
}

function removerClasseAtivo() {
    $("#clickListaRecurso").removeClass("ativo");
    $("#clickMidiaTarefa").removeClass("ativo");
    $("#clickUploadTarefa").removeClass("ativo");
    $("#clickLinkTarefa").removeClass("ativo");
    $("#clickInserirCodigo").removeClass("ativo");
    $("#clickInserirCodigo").removeClass("ativo")
}

function preparaArquivosParaTarefaRapida(e) {
    if (arrayArquivosUpload == undefined) {
        arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(e))
    } else {
        var d = false;
        var c = [];
        if (arrayArquivosUpload.arrayArquivo.length > 0) {
            for (var b in arrayArquivosUpload.arrayArquivo) {
                d = false;
                for (var g in e.arrayArquivo) {
                    if (e.arrayArquivo[g].id == arrayArquivosUpload.arrayArquivo[b].id) {
                        d = true;
                        break
                    }
                }
                if (!d) {
                    $("#boxMaterialApoioTarefa .the_insertedLink .exclui_arquivo[idarquivo=" + arrayArquivosUpload.arrayArquivo[b].id + "]").parent().remove()
                } else {
                    c.push(arrayArquivosUpload.arrayArquivo[b])
                }
            }
            arrayArquivosUpload.arrayArquivo = c;
            c = []
        }
        for (var f = 0; f < e.arrayArquivo.length; f++) {
            d = false;
            for (var b in arrayArquivosUpload.arrayArquivo) {
                if (arrayArquivosUpload.arrayArquivo[b].id == e.arrayArquivo[f].id) {
                    d = true;
                    break
                }
            }
            if (!d) {
                arrayArquivosUpload.arrayArquivo.push(e.arrayArquivo[f])
            }
        }
    }
    $("#previewAnexosTarefa div[id=materialApoioTarefas]").remove();
    for (var f = 0; arrayArquivosUpload.arrayArquivo[f]; f++) {
        strRetornoHtmlUpload += '<div id="materialApoioTarefas" class="anexo_preview anx_material"><a href="' + arrayArquivosUpload.arrayArquivo[f].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[f].strArquivo + arrayArquivosUpload.arrayArquivo[f].strExtensao + '" class="anx_dado" target="_blank">' + arrayArquivosUpload.arrayArquivo[f].strArquivo + '</a><a id="btnAcaoRemoverMaterial" href="javascript:void(0);" idArquivo="' + arrayArquivosUpload.arrayArquivo[f].id + '" class="btn_acao opcao_excluir"></a></div>'
    }
    $("#previewAnexosTarefa").prepend(strRetornoHtmlUpload);
    $("#previewAnexosTarefa").show();
    removerClasseAtivo();
    arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(arrayArquivosUpload));
    $(".anx_material a.btn_acao.opcao_excluir").click(function () {
        var j = $(this).attr("idArquivo");
        for (var h = 0; h < arrayArquivosUpload.arrayArquivo.length; h++) {
            if (arrayArquivosUpload.arrayArquivo[h].id == parseInt(j)) {
                arrayArquivosUpload.arrayArquivo.splice(h, 1);
                break
            }
        }
        $(this).parent().remove()
    });
    strRetornoHtmlUpload = ""
}

function excluirCodigoTarefa(d, b, c) {
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ExcluirCodigoEtapa",
        data: {
            idRecursoEtapa: b,
            idCodigo: d,
            idApostilaEdicao: c
        },
        success: function (e) {
            $("#previewAnexosTarefa #" + d).slideUp("slow", function () {
                $(this).remove()
            })
        },
        error: function (e) {
            if (e.status != 0) {
                $("#codigos_didatico #" + d).prepend("Erro ao excluir código da tarefa!")
            }
        }
    })
}

//SELECIONANDO SO TURMA
//Aluno individua tbm eh aqui
// function utilizada para publicar tanto no mural
// como tambem na turma

function agendarTarefaMuralTurma_OLD() {
    // console.log("entrou no agendarTarefaTurma criartarefa.js");
    console.debug("CriarTarefaRapidaNovaHome.ascx -> criartarefa.js -> func agendarTarefaMuralTurma() ln 1298");
    ShowBtnAgendar(false);
    var dataInicio = $("#dataInicio").val();
    var dataFim = $("#dataFim").val();
    var horaInicio = $("#horaInicio").val();
    var horaFim = $("#horaFim").val();

    var retorno = validaDataAgendamento(dataInicio, dataFim, horaInicio, horaFim);

    if (retorno == "ok") {
        var enviadoParaTurma = true;
        $("#strTituloTarefa").val($("#strTituloTarefa").val().trim());
        $("#txtDescricaoTarefa").val($("#txtDescricaoTarefa").val().trim());
        var strTitulo = $("#strTituloTarefa").val();
        var strDescricao = $("#txtDescricaoTarefa").val();

        strTitulo = $("<div />").text(strTitulo).html();
        strDescricao = $("<div />").text(strDescricao).html();

        if (strTitulo == "" || strTitulo == "Título da Tarefa") {
            $("#strTituloTarefa").addClass("alerta");
            ShowBtnAgendar(true);
            $("#feedErroTituloTarefa").show();
            $("html, body").animate({
                scrollTop: $("#frmMensagemRapida").offset().top - 115
            }, 1000);
            return false
        } else {
            $("#strTituloTarefa").removeClass("alerta");
            $("#feedErroTituloTarefa").hide()
        }

        if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
            $("#feed_erro_tarefa").show();
            $("#seletorMuralTarefa .seletor_lista").addClass("alerta");
            $("#seletorMuralTarefa").AvaSelector("focus");
            ShowBtnAgendar(true);
            return false
        } else {
            $("#seletorMuralTarefa .seletor_lista").removeClass("alerta")
        }

        var c = 0;
        if ($("#valeNota").hasClass("ativo")) {
            c = $("#intValorTarefa").val().replace(".", ",");
            if (c == "" || c == "Valor") {
                $("html, body").animate({
                    scrollTop: $("#intValorTarefa").offset().top - 200
                }, 800);
                $("#intValorTarefa").addClass("alerta");
                ShowBtnAgendar(true);
                return false
            } else {
                $("#intValorTarefa").removeClass("alerta")
            }
        }

        var g = $("#idCaminho").val();
        if (g == "" || g == undefined) {
            g = 0
        }
        var b = 2;
        $("input:radio[name=rTipo]").each(function () {
            if ($(this).is(":checked")) {
                b = parseInt($(this).val())
            }
        });

        var d = new Array();
        var f = arrayArquivosUpload;
        if (f == undefined || f == "" || f == null) {
            f = "";
            var k = null
        } else {
            for (var e = 0; e < f.arrayArquivo.length; e++) {
                d.push(f.arrayArquivo[e].id)
            }
            var k = {
                idFerramentaTipo: f.idFerramentaTipo,
                idFerramenta: f.idFerramenta,
                arquivos: d
            }
        }

        var idTurmas = [];
        var listaGrupo = [];

        if (arrayGrupoAux.length > 0) {
            for (var i = 0; i < arrayGrupoAux[0].usuarios.length; i++) {
                var objeto = {};
                objeto.idTurma = arrayGrupoAux[0].usuarios[i].idTurma;
                objeto.idGrupo = arrayGrupoAux[0].usuarios[i].idGrupo;
                listaGrupo.push(objeto);
                var idTurma = arrayGrupoAux[0].usuarios[i].idTurma;
                idTurmas.push(idTurma);
            }
        }

        $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");

        var txtDisponivel = ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

        var txtInput = strTitulo + txtDisponivel;
        var idGrupo = 0;
        var idAgendamentoUsuario = 0;


        var possueAluno = false;
        var grupos = [];
        var gruposNome = [];
        var turmas = [];
        arrayUsuariosAux.forEach(element => {
            if (element.idGrupo) {
                turmas.push(element);
            }
        });

        for (var i = 0; i < arrayUsuariosAux.length; i++) {
            if (arrayUsuariosAux[i].isTurma) {
                grupos.push(arrayUsuariosAux[i].idGrupo);
                gruposNome.push(arrayUsuariosAux[i].strNome);
            }
            else {
                // possueAluno = true;
                if (turmas.filter(a => a.idTurma == arrayUsuariosAux[i].idTurma).length == 0) {
                    possueAluno = true;    
                }
            }
        }

        for (var i = 0; i < arrayGrupoAux.length; i++) {
            for (var x = 0; x < arrayGrupoAux[i].usuarios.length; x++) {
                if (arrayGrupoAux[i].usuarios[x].isTurma) {
                    grupos.push(arrayGrupoAux[i].usuarios[x].idGrupo);
                    gruposNome.push(arrayGrupoAux[i].usuarios[x].strNome);
                }
                else {
                    arrayUsuariosAux.push(arrayGrupoAux[i].usuarios[x]);
                    possueAluno = true;
                }
            }
        }

		//Se tem aluno entra aqui
        if (possueAluno) {

            for (let index = 0; index < turmas.length; index++) {
                const element = turmas[index];
                var listaUsuario = [];
                
                arrayUsuariosAux.filter(a => a.idTurma == element.idTurma && a.idGrupo == undefined).forEach(element => {
                    listaUsuario.push(element);
                });
                
                listaUsuario.forEach(element => {
                    var removed = arrayUsuariosAux.splice(element, 1); // remove alunos que ja tem turmas na lista para priorizar sempre as turmas
                });
            }

            SalvarCaminhoCriarTarefa({
                idCaminho : $("#idCaminho").val() == "" ? 0 : $("#idCaminho").val(),
                idEtapa : $("#idEtapa").val() == "" ? 0 : $("#idEtapa").val(),
                strTarefa : $("#strTituloTarefa").val(),
                strDescricao : $("#txtDescricaoTarefa").val(),
                intNota : c
            }, function(data){
                var idCaminho = data.idCaminho;
                    
                if (g > 0) {
                    idCaminho = g;
                }

                var i = data.idEtapa;//$("#idEtapa").val();

                if (i == "" || i == undefined) {
                    i = 0;
                }
                
                var solicitacaoArquivom = false;
                if ($("#entrega_tarefa").attr("checked") || $("#trf_devolutiva").hasClass("ativo")) {
                    solicitacaoArquivom = true
                }
                
                $.ajax({
                    url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                    data: {
                        idCaminho: idCaminho,
                        idEtapa: i,
                        intValor: c,
                        solicitaEntrega: solicitacaoArquivom
                    },
                    type: "POST",
                    success: function (u) {

                        $("#idEtapa").val(u);

                        var idEtapa = u;
                    
                        etapas = [];
                        idCaminhos = [];
                        incluirAgendamentoMural(dataInicio, dataFim, horaInicio, horaFim, idCaminho, strDescricao, strTitulo, idEtapa);

                        for (var i = 0; i < grupos.length; i++) {
                            var grupoId = grupos[i];
                            var grupoNome = gruposNome[i];
                            SalvarCaminhoAlunos(idCaminho, strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, grupoId);
                        }

                        ShowToast({type: "success", title : "Seus alunos j&aacute; podem visualizar esta tarefa.", desc : "Tarefa publicada com sucesso!", callback: function(){
                            $("#strTituloTarefa").val("");
                            $("#txtDescricaoTarefa").val("");
                            enviadoParaTurma = false;
                            EscondeOsObjects();
                            $("#loader").hide();

                            location.href = "/ava/Mural";
                        }});
                        
                    },
                    error: function (n) {

                        ShowBtnAgendar(true);
                        if (n.status != 0) {
                            console.debug("erro ao salvar tarefa rápida!");
                        }
                    }
                });
            });
            /*
            //OLD
			var userturma = 1 ;
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/SalvarCaminhoSoUsuario/",
                data: {
                    idRota: g,
                    idUsuario: 0,
                    strTitulo: strTitulo,
                    strDescricao: strDescricao,
                    intStatus: b,
                    strTags: "",
                    intTipo: 2,
                    json: JSON.stringify(k),
					userturma : userturma
					
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (caminho) {
                    var idCaminho = caminho
                    if (g > 0) {
                        idCaminho = g;
                    }

                    var i = $("#idEtapa").val();

                    if (i == "" || i == undefined) {
                        i = 0
                    }
                    var m = false;
                    if ($("#entrega_tarefa").attr("checked") || $("#trf_devolutiva").hasClass("ativo")) {
                        m = true
                    }
                    var idEtapaTurma = 0;

                    $.ajax({
                        url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                        data: {
                            idCaminho: idCaminho,
                            idEtapa: i,
                            intValor: c,
                            solicitaEntrega: m
                        },
                        type: "POST",
                        success: function (u) {
                            $("#idEtapa").val(u);
                            var idEtapa = u;

                            etapas = [];
                            idCaminhos = [];
                            incluirAgendamentoMural(dataInicio, dataFim, horaInicio, horaFim, idCaminho, strDescricao, strTitulo, idEtapa);

                            limparDados();

                            toastr.options = {
                                "closeButton": true,
                                "debug": false,
                                "newestOnTop": false,
                                "progressBar": true,
                                "positionClass": "toast-top-center",
                                "preventDuplicates": false,
                                "onclick": null,
                                "showDuration": "900",
                                "hideDuration": "1000",
                                "timeOut": "9000",
                                "extendedTimeOut": "9000",
                                "showEasing": "swing",
                                "hideEasing": "linear",
                                "showMethod": "fadeIn",
                                "hideMethod": "fadeOut"
                            }
                            Command: toastr["success"]("Seus alunos j&aacute; podem visualizar esta tarefa.", "Tarefa publicada com sucesso!")

                            recurso = idRecurso;
                            for (var i = 0; i < grupos.length; i++) {
                                var grupoId = grupos[i];
                                var nomeTurma = gruposNome[i];
                                SalvarCaminho(strTitulo + " - Turma ", strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, grupoId);
                            }
                            idRecurso = 0;
                            
                            $("#strTituloTarefa").val("");
                            $("#txtDescricaoTarefa").val("");
                            enviadoParaTurma = false;
                            EscondeOsObjects();
                            $("#loader").hide();

                            console.log(etapas);
                        },
                        error: function (n) {
                            if (n.status != 0) {
                                console.debug("erro ao salvar tarefa rápida!")
                            }
                        }
                    })
                },
                error: function (i) {
                    ShowBtnAgendar(true);
                    if (i.status != 0) {
                        console.debug("erro ao salvar caminho rápido!")
                    }
                }
            });
            */
        }
        else {
            
            SalvarCaminhoCriarTarefa({
                idCaminho : $("#idCaminho").val() == "" ? 0 : $("#idCaminho").val(),
                idEtapa : $("#idEtapa").val() == "" ? 0 : $("#idEtapa").val(),
                strTarefa : $("#strTituloTarefa").val(),
                strDescricao : $("#txtDescricaoTarefa").val(),
                intNota : c
            }, function(data){
                for (var i = 0; i < grupos.length; i++) {
                    var grupoId = grupos[i];
                    var grupoNome = gruposNome[i];
                    SalvarCaminhoTurma( data.idCaminho, strTitulo, strDescricao, data.idUsuario, dataInicio, dataFim, horaInicio, horaFim, grupoId, i);
                }

                ShowToast({
                    type: "success", 
                    title : "Seus alunos j&aacute; podem visualizar esta tarefa.", 
                    desc : "Tarefa publicada com sucesso na(s) turma(s)!", 
                    callback: function(){
                        disciplinaSelecionada = 0;
                        $('#idMateria button.btnDisciplina_turmas').html("Selecione a disciplina");
                        $('#idMateria button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');

                        $("#strTituloTarefa").val("");
                        $("#txtDescricaoTarefa").val("");

                        enviadoParaTurma = false;
                        EscondeOsObjects();
                        $("#loader").hide();
                        zeraValoresRecurso();
                        location.href = "/ava/Mural";
                    }
                });

            });

            // for (var i = 0; i < grupos.length; i++) {
            //     var grupoId = grupos[i];
            //     var nomeTurma = gruposNome[i];
            //     SalvarCaminho(strTitulo + " - Turma " , strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, grupoId);
            // }
            // limparDados();
            // $("#strTituloTarefa").val("");
            // $("#txtDescricaoTarefa").val("");
            // enviadoParaTurma = false;
            // EscondeOsObjects();
            // $("#loader").hide();
            // abrirCriarTarefa();
        }

    } else {
        if (retorno == "erro") {
            return false
        } else {
            alert(retorno)
        }

        ShowBtnAgendar(true);
    }
}

function agendarTarefaMuralTurma(){

    ShowBtnAgendar(false);
    $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");

    if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
        $("#seletorTarefa").AvaSelector("focus");
        mostraAlertaTarefa("Adicione pessoas para agendar");
        ShowBtnAgendar(true);
        return false;
    }

    SalvarCaminhoCriarTarefaGlobal();
}

function SalvarCaminhoTurma(idCaminho, strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, idGrupo, index) {
    var files = arrayArquivosUpload; 
    var idCaminhoTurma = idCaminho;
    var idEtapaTurma = 0;
    var inserirRescuroFlag = true;

    var intNota = 0;
    if ($("#valeNota").hasClass("ativo")){
        intNota = $("#intValorTarefa").val().replace(".", ",");
    }
        
    var strComplemento = strTitulo + ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

    var solicitacaoArquivo = false;

    if (index == 0 && ($("#idEtapa").val() != "" || $("#idEtapa").val() != "0")) {
        idEtapaTurma = $("#idEtapa").val();
        inserirRescuroFlag = false;
    }
    
		
    if ($("#entrega_tarefa").attr("checked") || $("#trf_devolutiva").hasClass("ativo")) {
        solicitacaoArquivo = true;
        console.log('O valor de solicitacaoArquivo '+solicitacaoArquivo);
    }
    
    $.ajax({
        url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
        async: false,
        data: {
            idCaminho: idCaminhoTurma,
            idEtapa: idEtapaTurma,
            intValor: intNota,
            solicitaEntrega: solicitacaoArquivo
        },
        type: "POST",
        success: function (idEtapaTurma) {
            if (typeof disciplinaSelecionada === 'undefined') {
                disciplinaSelecionada = 0;
            }
            var idEtapaTurma = idEtapaTurma;

            console.log(idRecurso, idPublicacao, idAvaliacao, $("#idEtapa").val());
            if (idRecurso > 0 && inserirRescuroFlag==true) {
                console.log("Entrou no if ou era pra entrar");
                inserirRecursoRapidoTurma(idCaminho, idEtapaTurma, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValorRecurso);
            }

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
                async: false,
                data: {
                    idRotaAgendamento: 0,
                    idCaminho: idCaminhoTurma,
                    idGrupo: idGrupo,
                    dataInicio: dataInicio,
                    horaInicio: horaInicio,
                    dataFim: dataFim,
                    horaFim: horaFim,
                    strComplemento: strComplemento ,
                    strTitulo: strTitulo,
                    strDescricao: strDescricao,
                    idMateria: disciplinaSelecionada
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (response) {
                    var retorno = response.split("|");
                    
                    var arquivos = pegarDadosArquivos(files);
                    $.ajax({

                        type: "POST",
                        url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
                        async: false,
                        data: {
                            strUsuarios: retorno[1],
                            idGrupo: idGrupo,
                            idFerramentaTipo: ID_FERRAMENTA_TIPO_TAREFA,
                            idFerramenta: retorno[0],
                            idEtapa: idEtapaTurma,
                            strMensagem: strComplemento,
                            idMateria: disciplinaSelecionada, 
                            arquivos: JSON.stringify(arquivos),
                            idRota: idCaminhoTurma
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function () {
                            
                        },
                        error: function (a) {
                            0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
                        }
                    });

                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao inserir agendamento!")
                }
            })

        },
        error: function (n) {
            if (n.status != 0) {
                console.debug("erro ao salvar tarefa rápida!")
            }
        }
    });
}

function SalvarCaminhoAlunos(idCaminho, strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, idGrupo) {
    var idCaminhoTurma = idCaminho;
    var idEtapaTurma = 0;

    var strComplemento = strTitulo + ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

    var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;
    var intNota = parseFloat($("#intValorTarefa").val().replace(".", ","));
    $.ajax({
        url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
        async: false,
        data: {
            idCaminho: idCaminhoTurma,
            idEtapa: idEtapaTurma,
            intValor: intNota,
            solicitaEntrega: solicitacaoArquivo
        },
        type: "POST",
        success: function (idEtapaTurma) {
            
            if (typeof disciplinaSelecionada === 'undefined') {
                disciplinaSelecionada = 0;
            }
            var idEtapaTurma = idEtapaTurma;

            if (idRecurso > 0) {
                inserirRecursoRapidoTurma(idCaminho, idEtapaTurma, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValorRecurso);
            }

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
                async: false,
                data: {
                    idRotaAgendamento: 0,
                    idCaminho: idCaminhoTurma,
                    idGrupo: idGrupo,
                    dataInicio: dataInicio,
                    horaInicio: horaInicio,
                    dataFim: dataFim,
                    horaFim: horaFim,
                    strComplemento: strComplemento ,
                    strTitulo: strTitulo,
                    strDescricao: strDescricao,
                    idMateria: disciplinaSelecionada
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (response) {
                    
                    var retorno = response.split("|");
                    var arquivos = pegarDadosArquivos();
                    $.ajax({

                        type: "POST",
                        url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
                        async: false,
                        data: {
                            strUsuarios: retorno[1],
                            idGrupo: idGrupo,
                            idFerramentaTipo: ID_FERRAMENTA_TIPO_TAREFA,
                            idFerramenta: retorno[0],
                            idEtapa: idEtapaTurma,
                            strMensagem: strComplemento,
                            idMateria: disciplinaSelecionada, 
                            arquivos: JSON.stringify(arquivos),
                            idRota: idCaminhoTurma
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function () {
                        },
                        error: function (a) {
                            0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
                        }
                    });
                    

                },
                error: function (a) {
                    0 != a.status && console.debug("erro ao inserir agendamento!")
                }
            })

        },
        error: function (n) {
            if (n.status != 0) {
                console.debug("erro ao salvar tarefa rápida!")
            }
        }
    });
}

function SalvarCaminhoCriarTarefa(params, funcReturn){
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminhoCriarTarefa/",
        data: {
            idCaminho: params.idCaminho,
            idEtapa: params.idEtapa,
            strTarefa: params.strTarefa,
            strDescricao: params.strDescricao,
            intNota: params.intNota
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            $("#idEtapa").val(data.idEtapa);
            $("#idCaminho").val(data.idCaminho);
            funcReturn(data);
        },
        error: function (i) {
            if (i.status != 0) {
                console.debug("erro ao salvar caminho rápido!")
            }
            funcReturn(i);
        }
    });
}

function ShowBtnAgendar(show) {
    if (show) {
        $("#btn-agendar").show()
        $("#btn-agendando").hide();
    }
    else{
        $("#btn-agendar").hide()
        $("#btn-agendando").show();
    }
}

function limparDados() {
    $(".tooltip").text("Inserir recurso");
    $("#abreListaRecursoTarefa").attr({
        href: "javascript:void(0);",
        title: "Inserir recurso"
    });
    $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Inserir recurso");
    $("#clickListaRecurso").attr("data-original-title", "Inserir recurso")

    if ($("#iframeTarefaId").length == 0) {
        $("#clickMidiaTarefa").removeClass("ativo")
    }
    $("#clickMidiaTarefa").attr("data-original-title", "Inserir v&iacute;deo")

    $("#idTarefaLink").remove();
    $(".anexo_preview").remove();
}

function agendarTarefa() {
    var enviadoParaTurma = true;
    $("#strTituloTarefa").val($("#strTituloTarefa").val().trim());
    $("#txtDescricaoTarefa").val($("#txtDescricaoTarefa").val().trim());
    var j = $("#strTituloTarefa").val();
    var h = $("#txtDescricaoTarefa").val();
    j = $("<div />").text(j).html();
    h = $("<div />").text(h).html();
    if (j == "" || j == "Título da Tarefa") {
        $("#strTituloTarefa").addClass("alerta");
        $("#feedErroTituloTarefa").show();
        $("html, body").animate({
            scrollTop: $("#frmMensagemRapida").offset().top - 115
        }, 1000);
        return false
    } else {
        $("#strTituloTarefa").removeClass("alerta");
        $("#feedErroTituloTarefa").hide()
    }
    if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
        $("#feed_erro_tarefa").show();
        $("#seletorMuralTarefa .seletor_lista").addClass("alerta");
        $("#seletorMuralTarefa").AvaSelector("focus");
        return false
    } else {
        $("#seletorMuralTarefa .seletor_lista").removeClass("alerta")
    }
    var c = 0;
    if ($("#valeNota").hasClass("ativo")) {
        c = $("#intValorTarefa").val().replace(".", ",");
        if (c == "" || c == "Valor") {
            $("html, body").animate({
                scrollTop: $("#intValorTarefa").offset().top - 200
            }, 800);
            $("#intValorTarefa").addClass("alerta");
            return false
        } else {
            $("#intValorTarefa").removeClass("alerta")
        }
    }
    var g = $("#idCaminho").val();
    if (g == "" || g == undefined) {
        g = 0
    }
    var b = 2;
    $("input:radio[name=rTipo]").each(function () {
        if ($(this).is(":checked")) {
            b = parseInt($(this).val())
        }
    });
    var d = new Array();
    var f = arrayArquivosUpload;
    if (f == undefined || f == "" || f == null) {
        f = "";
        var k = null
    } else {
        for (var e = 0; e < f.arrayArquivo.length; e++) {
            d.push(f.arrayArquivo[e].id)
        }
        var k = {
            idFerramentaTipo: f.idFerramentaTipo,
            idFerramenta: f.idFerramenta,
            arquivos: d
        }
    }


    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminho/",
        data: {
            idRota: g,
            idUsuario: 0,
            strTitulo: j,
            strDescricao: h,
            intStatus: b,
            strTags: "",
            intTipo: 2,
            json: JSON.stringify(k),
            userturma:0
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (l) {
            $("#idCaminho").val(l);
            var i = $("#idEtapa").val();
            if (i == "" || i == undefined) {
                i = 0
            }
            var m = false;
            if ($("#entrega_tarefa").attr("checked") || $("#trf_devolutiva").hasClass("ativo")) {
                m = true
            }
            $.ajax({
                url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                data: {
                    idCaminho: l,
                    idEtapa: i,
                    intValor: c,
                    solicitaEntrega: m
                },
                type: "POST",
                success: function (u) {
                    $("#idEtapa").val(u);
                    var dataInicio = $("#dataInicio").val();
                    var dataFim = $("#dataFim").val();
                    var horaInicio = $("#horaInicio").val();
                    var horaFim = $("#horaFim").val();
                    var t = validaAgendamento(dataInicio, dataFim, horaInicio, horaFim);
                    if (t == "ok") {
                        var s = {
                            autoSize: false,
                            width: 760,
                            height: 510,
                            type: "ajax",
                            helpers: {
                                overlay: {
                                    closeClick: false,
                                    locked: false
                                }
                            },
                            padding: 0,
                            autoResize: false,
                            fitToView: false,
                            href: "/AVA/Caminhos/Home/ConcluirAgendamentoRapido",
                            ajax: {
                                type: "POST",
                                data: {
                                    idCaminho: l,
                                    dataInicio: dataInicio,
                                    horaInicio: horaInicio,
                                    dataFim: dataFim,
                                    horaFim: horaFim,
                                    bolTarefaGrupo: false
                                }
                            },
                            afterShow: function (o) {
                                /// inicio
                                console.log("arrayUsuariosAux == " + JSON.stringify(arrayUsuariosAux));
                                console.log("arrayGrupoAux == " + JSON.stringify(arrayGrupoAux));
                                //inserirAgendamento(idCaminho, dataInicio, horaInicio, dataFim, horaFim, j);
                                /// fimm
                                /* */
                                etapas = [];
                                idCaminhos = [];

                                if (enviadoParaTurma && arrayGrupoAux.length > 0) {
                                    for (var i = 0; i < arrayGrupoAux[0].usuarios.length; i++) {
                                        var idEtapa = agendarTarefaTurma(j, h, c, m, dataInicio, horaInicio, dataFim, horaFim);
                                        //etapas[i] = idEtapa;
                                        //console.log("idEtapa = " + idEtapa);
                                    }
                                    console.log(etapas);
                                }
                                enviadoParaTurma = false;

                                console.log("agendarTarefaTurma idEtapa *** " + idEtapa);
                                EscondeOsObjects();
                                $(".compartilhamento_cenario").hide();
                                $(".compartilhamento_cenario").prev().hide();
                                $("#btnCancelarAgendamentoRapido").click(function () {
                                    $.fancybox.close()
                                });
                                $("#strComplementoRapido").limit("200", "")
                                console.log(etapas);
                            },
                            beforeClose: function () {
                                MostraOsObjects()
                            }
                        };
                        $.fancybox(s);
                        return false
                    } else {
                        if (t == "erro") {
                            return false
                        } else {
                            alert(t)
                        }
                    }
                },
                error: function (n) {
                    if (n.status != 0) {
                        console.debug("erro ao salvar tarefa rápida!")
                    }
                }
            })
        },
        error: function (i) {
            if (i.status != 0) {
                console.debug("erro ao salvar caminho rápido!")
            }
        }
    })


}

//Valida Agendamento
function validaDataAgendamento(a, o, e, i) {
    console.log("dtmAtualServidor == " + $("#dtmAtualServidor").val().split(" "));
    var t = "ok";
    if ("" == a) $("#dataInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == o) $("#dataFim").addClass("ava_field_alert"), t = "erro";
    else if ("" == e) $("#horaInicio").addClass("ava_field_alert"), t = "erro";
    else if ("" == i) $("#horaFim").addClass("ava_field_alert"), t = "erro";
    else {
        var r = a.split("/"),
            n = r[2] + r[1] + r[0],
            s = o.split("/"),
            l = s[2] + s[1] + s[0],
            e = e.split(":"),
            c = e[0] + e[1],
            i = i.split(":"),
            d = i[0] + i[1],
            u = $("#dtmAtualServidor").val().split(" "),// validaDataAgendamento
            p = u[0].split("/"),
            m = u[1].split(":"),
            v = p[2] + p[1] + p[0],
            f = m[0] + m[1];

        // n > l ? t = "Data inicial tem que ser menor que Data final." : n == v ? (f >= c && (t = "Hora inicial tem que ser maior que a hora atual."),
        // n == l && c >= d && (t = "Hora inicial tem que ser menor que Hora final.")) : v > n ? t = "Data inicial tem que ser maior que a Data atual." : n == l && c >= d && (t = "Hora inicial tem que ser menor que Hora final.")
        var new_dataInicial = new Date(parseInt(r[2]),parseInt(r[1])-1, parseInt(r[0]), parseInt(e[0]), parseInt(e[1]), 0);
        var new_dataFinal = new Date(parseInt(s[2]),parseInt(s[1])-1, parseInt(s[0]), parseInt(i[0]), parseInt(i[1]), 0);
        var new_datahoraServidor = new Date(parseInt(p[2]),parseInt(p[1])-1, parseInt(p[0]), parseInt(m[0]), parseInt(m[1]), 0);

        var new_dataatual = new Date();
        // dataInicio > dataFim 
        // ? t = "Data inicial tem que ser menor que Data final." 
        // : dataInicio == dataAtual  
        // ? (  (horaServidor)>= horaInicio && (t = "Hora inicial tem que ser maior que a hora atual."), 
        // dataInicio == dataFim && horaInicio > horaFinal && (t = "Hora inicial tem que ser menor que Hora final."))
        // : dataAtual  > dataInicio ? t = "Data inicial tem que ser maior que a Data atual." 
        // : dataInicio == dataFim && horaInicio >= horaFinal && (t = "Hora inicial tem que ser menor que Hora final.")
        if (new_dataInicial.getTime() > new_dataFinal.getTime()) {
            t = "Data inicial tem que ser menor que Data final.";
        }
        else if(new_dataInicial.getTime() < new_dataatual.getTime()){
            t = "Data/Hora inicial tem que ser maior que a data/hora atual.";
        }
    }
    return t
}

function getDataHoraCorrente(){
    var data = new Date();
    var dia = data.getDate();
    var mes     = data.getMonth();
    var ano4    = data.getFullYear(); 
    var hora    = data.getHours();
    var min     = data.getMinutes();
    var str_data = dia + '/' + (mes+1) + '/' + ano4 + ' ' + hora + ':' + min;
    console.log(str_data);

    return str_data;
}

$("#PreVisualizarPublicacao").fancybox({
    autoSize: false,
    width: 760,
    height: 510,
    padding: 0,
    autoResize: false,
    fitToView: false,
    afterLoad: function () {
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/PegarDadosUsuarioLogado",
            data: {},
            success: function (result) {

                $("#visDisponivel").text("Disponivel de " + $("#dataInicio").val() + " " + $("#horaInicio").val() + " at\u00e9 " + $("#dataFim").val() + " " + $("#horaFim").val());
                $("#visTitulo").text($("#strTituloTarefa").val());
                $("#visNome").text(result.Result.strNome);
                $('#visFoto').attr('src', result.Result.strMiniFoto);
                $('#visDescricaoTarefa').text($("#txtDescricaoTarefa").val());
            },
            error: function (c) {
                console.debug("erro ao buscar codigos da tarefa!")
            }
        })
    },
    beforeClose: function () {
        this.content = this.content.html();
    }
});

function inserirAgendamento(idCaminho, dataInicio, horaInicio, dataFim, horaFim, strComplemento) {
    $.ajax({
        type: "POST",
        async: false,
        url: "/AVA/Caminhos/Home/MontaDestinoAgendamento",
        data: {
            "usuario": JSON.stringify(arrayUsuariosAux),
            "grupo": JSON.stringify(arrayGrupoAux)
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (usuarios_turmas) {
            console.log("usuarios_turmas ======= " + usuarios_turmas);
            var vetDestino = usuarios_turmas.split('|');

            var strMensagemErroAgendamento = "";


            console.log("strUsuariosDestino[0] == " + vetDestino[0]);
            console.log("strTurmasDestino[1] == " + vetDestino[1]);
            /*
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirAgendamento",
                async: 1,
                data: {
                    idRotaAgendamento: 0,
                    idCaminho: idCaminho,
                    dataInicio: dataInicio,
                    horaInicio: horaInicio,
                    dataFim: dataFim,
                    horaFim: horaFim,
                    strComplemento: strComplemento,
                    usuario: JSON.stringify(arrayUsuariosAux),
                    grupo: JSON.stringify(arrayGrupoAux),
                    strUsuariosDestino: vetDestino[0],
                    strTurmasDestino: vetDestino[1]
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (idRotaAgendamentoAux) {

                    strMensagemErroAgendamento = idRotaAgendamentoAux;

                    if (isNumeric(idRotaAgendamentoAux)) { //verifica se não deu erro no agendamento
                        //salvarMensagemRapida(arrayUsuariosAux, arrayGrupoAux, 17, idRotaAgendamentoAux, $("#idEtapa").val(), txtInput);
                        arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                        arrayGrupoAux.splice(0, arrayGrupoAux.length);
                        //$("#seletorMuralTarefa").AvaSelector("limparUsuarios");
                        //abrirCriarTarefa();
                    } else {
                        //$("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoTarefaRapidaMural()"><span></span>Enviar Agendamento</a>');
                        return false;
                    }

                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao inserir agendamento!");
                    }
                }
            });
            */

        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao montar destino de agendamento!");
            }
        }
    });
}

// essa função inclui a tarefa na turma 
function agendarTarefaTurma(titulo, descricao, valor, solicitaEntrega, dataInicio, horaInicio, dataFim, horaFim) {

    var idEtapa = 0;
    var g = $("#idCaminho").val();
    if (g == "" || g == undefined) {
        g = 0
    }
    var b = 2;
    $("input:radio[name=rTipo]").each(function () {
        if ($(this).is(":checked")) {
            b = parseInt($(this).val())
        }
    });
    var d = new Array();
    var f = arrayArquivosUpload;
    if (f == undefined || f == "" || f == null) {
        f = "";
        var k = null
    } else {
        for (var e = 0; e < f.arrayArquivo.length; e++) {
            d.push(f.arrayArquivo[e].id)
        }
        var k = {
            idFerramentaTipo: f.idFerramentaTipo,
            idFerramenta: f.idFerramenta,
            arquivos: d
        }
    }
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarCaminho/",
        data: {
            idRota: 0,
            idUsuario: 0,
            strTitulo: titulo,
            strDescricao: descricao,
            intStatus: 2,
            strTags: "",
            intTipo: 2,
            json: null,
            userturma:1
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (l) {
            var idCaminho = l;
            idCaminhos.push(idCaminho);
            idEtapa = 0;

            $.ajax({
                url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
                data: {
                    idCaminho: idCaminho,
                    idEtapa: idEtapa,
                    intValor: valor,
                    solicitaEntrega: solicitaEntrega
                },
                type: "POST",
                async: false,
                success: function (etapa) {
                    etapas.push(etapa);
                    idEtapa = etapa
                    $.ajax({
                        url: "/AVA/Caminhos/Home/ConcluirAgendamentoRapido",
                        data: {
                            idCaminho: idCaminho,
                            dataInicio: dataInicio,
                            horaInicio: horaInicio,
                            dataFim: dataFim,
                            horaFim: horaFim,
                            bolTarefaGrupo: false
                        },
                        type: "POST",
                        success: function (u) {
                            console.log("ConcluirAgendamentoRapido ok");
                        },
                        error: function (n) {
                            if (n.status != 0) {
                                console.debug("erro ao salvar tarefa rápida!")
                            }
                        }
                    });

                },
                error: function (n) {
                    if (n.status != 0) {
                        console.debug("erro ao salvar tarefa rápida!")
                    }
                }
            })

        },
        error: function (i) {
            if (i.status != 0) {
                console.debug("erro ao salvar caminho rápido!")
            }
        }
    })
    return idEtapa;
}

function salvarMensagemRapidaTarefaRapida(e, f, b, d, c, g) {

    if (typeof disciplinaSelecionada === 'undefined') {
        disciplinaSelecionada = 0;
    }

    console.log("entrou oooooo salvarMensagemRapidaTarefaRapida");
    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/SalvarMensagemRapida",
        data: {
            usuario: JSON.stringify(e),
            grupo: JSON.stringify(f),
            idFerramentaTipo: b,
            idFerramenta: d,
            idEtapa: c,
            strMensagem: g,
            idMateria: disciplinaSelecionada
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (h) {
            $.ajax({
                type: "POST",
                url: "/AVA/Mural/Home/RetornaFeedUserNovaHome",
                data: {
                    idMensagemRapida: h
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (k) {
                    var j = $("#hTipoDePostMural").val();
                    $.fancybox.close();
                    $("#txtInput").val("");
                    $("#txtInput").css("height", "48px");
                    $("#txtInput").siblings(":last").html("");
                    $(".actions[pos=1]").click();
                    if (j == 0 || j == 1 || j == 2) {
                        $("#ava_fluxoarticles").prepend(k).find("article:first").addClass("highlight").slideDown(1000);
                        $("#ava_fluxoarticles article:first .compartilhado").booleTip({
                            urlAjax: "/AVA/Seletor/Home/destinoPost",
                            style: {
                                classes: "tooltip_compartilhamento"
                            },
                            position: {
                                my: "bottom left",
                                at: "top center",
                                adjust: {
                                    y: 0
                                }
                            }
                        })
                    } else {
                        $("#hTipoDePostMural").val(0);
                        $("#ava_fluxoarticles").html("");
                        $("#cbTipoDePostMural input[type=checkbox]").removeAttr("checked");
                        $("#cbTipoDePostMural li[filtrotipo=0] input[type=checkbox]").attr("checked", "checked");
                        var i = 'Todos os posts <span class="caret">';
                        $("#txtTipoDePostMural").html(i);
                        $("#loader_timeline").fadeIn("fast", function () {
                            carregaTimeLine(1)
                        })
                    }
                },
                error: function (i) {
                    if (i.status != 0) {
                        console.debug("erro ao retornar feed user!")
                    }
                }
            })
        },
        error: function (h) {
            if (h.status != 0) {
                console.debug("erro ao salvar mensagem rápida!")
            }
        }
    })
};

function incluirAgendamentoMural(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtDisponivel, txtTitulo, idEtapa) {

    $("#container_btnConcluirAgendamentoRapido").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando_red.gif' border='0' /> Agendando...");

    var txtDisponivel = ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

    var txtInput = txtTitulo + txtDisponivel;
    var idGrupo = 0;
    var idAgendamentoUsuario = 0;

    for (var i = 0; i < arrayUsuariosAux.length; i++) {
        if (arrayUsuariosAux[i].isTurma) {
            console.log(" ============ " + arrayUsuariosAux[i].idGrupo);
            idGrupo = arrayUsuariosAux[i].idGrupo;
            break;
        }
    }

    if (arrayUsuariosAux.length == 0) {
        for (var i = 0; i < arrayGrupoAux.length; i++) {
            idAgendamentoUsuario = arrayGrupoAux[i].usuarios[0].listaAlunos[0].idUsuario
            break;
        }
    }

    if (idGrupo != 0) {
        $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/GetAlunoIdByTurmaId/",
            data: {
                idGrupo: idGrupo
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                console.log(" sucesso idUsuario == " + data.result);
                var idAgendamentoUsuario = data.result;
                incluirAgendamento(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtInput, idEtapa, idAgendamentoUsuario);
            },
            error: function (data) {
                console.log("erro == " + data.result);
            }
        });
    }
    else {
        incluirAgendamento(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtInput, idEtapa, idAgendamentoUsuario);
    }
}

function incluirAgendamento(dataInicio, dataFim, horaInicio, horaFim, idCaminho, txtInput, idEtapa, idAgendamentoUsuario) {
    $.ajax({
        type: "POST",
        async: false,
        url: "/AVA/Caminhos/Home/MontaDestinoAgendamento",
        data: {
            "usuario": JSON.stringify(arrayUsuariosAux),
            "grupo": JSON.stringify(arrayGrupoAux)
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (usuarios_turmas) {
            var vetDestino = usuarios_turmas.split('|');

            var strMensagemErroAgendamento = "";

            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/InserirAgendamento",
                data: {
                    idRotaAgendamento: 0,
                    idCaminho: idCaminho,
                    dataInicio: dataInicio,
                    horaInicio: horaInicio,
                    dataFim: dataFim,
                    horaFim: horaFim,
                    strComplemento: txtInput,
                    usuario: JSON.stringify(arrayUsuariosAux),
                    grupo: JSON.stringify(arrayGrupoAux),
                    strUsuariosDestino: vetDestino[0],
                    strTurmasDestino: vetDestino[1],
                    idAgendamentoUsuario: idAgendamentoUsuario
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (idRotaAgendamentoAux) {

                    strMensagemErroAgendamento = idRotaAgendamentoAux;

                    if (isNumeric(idRotaAgendamentoAux)) { //verifica se não deu erro no agendamento
                        salvarMensagemRapida(arrayUsuariosAux, arrayGrupoAux, 17, idRotaAgendamentoAux, idEtapa, txtInput);

                        $("#seletorMuralTarefa").AvaSelector("limparUsuarios");
                        arrayUsuariosAux.splice(0, arrayUsuariosAux.length);
                        arrayGrupoAux.splice(0, arrayGrupoAux.length);

                    } else {
                        $("#container_btnConcluirAgendamentoRapido").html('<a class="large awesome awesome-color " style="cursor: pointer;" id="btnConcluirAgendamentoRapido" onclick="concluirAgendamentoTarefaRapidaMural()"><span></span>Enviar Agendamento</a>');
                        return false;
                    }

                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao inserir agendamento!");
                    }
                }
            });

        },
        error: function (data) {
            if (data.status != 0) {
                console.debug("erro ao montar destino de agendamento!");
            }
        }
    });

}

function zeraValoresRecurso() {
    console.log();
    idRecurso = 0;
    idPublicacao = 0;
    idAvaliacao = 0;
}

function pegarDadosArquivos(arrayArquivosUpload){
    var f = arrayArquivosUpload;
    if (f == undefined || f == "" || f == null) {
        f = "";
        var k = null
    }
    var temp = [];
    if(typeof f.arrayArquivo != "undefined"){
        for (var i = 0; i < f.arrayArquivo.length; i++ ){
            var objeto = {
                "idArquivo": f.arrayArquivo[i].id,
                "strArquivo": f.arrayArquivo[i].strArquivo,
                "nome": f.arrayArquivo[i].strNome,
                "descricao":"",
                "diretorio": f.arrayArquivo[i].strDiretorio,
                "extensao": f.arrayArquivo[i].strExtensao
            }
            temp.push(objeto);
        }        
    }
    return temp;
}

function ShowToast(params) {

    var time = 5000;
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "900",
        "hideDuration": ""+time,
        "timeOut": ""+time,
        "extendedTimeOut": ""+time,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    if (params.callback) {
        toastr.options.onHidden = params.callback;
        toastr.options.onclick = params.callback;
    }

    Command: toastr[params.type](params.title, params.desc);
}

//Mnada na Turma
// Manda Salvar aqui o caminho
function SalvarCaminho(strTitulo, strDescricao, k, dataInicio, dataFim, horaInicio, horaFim, idGrupo) {

	var files = arrayArquivosUpload; 

    idCaminho = $("#idCaminho").val();
    

    var c = 0;
    if ($("#valeNota").hasClass("ativo")) {
        c = $("#intValorTarefa").val().replace(".", ",");
        if (c == "" || c == "Valor") {
            $("html, body").animate({
                scrollTop: $("#intValorTarefa").offset().top - 200
            }, 800);
            $("#intValorTarefa").addClass("alerta");
            return false
        } else {
            $("#intValorTarefa").removeClass("alerta")
        }
    }

	if (idCaminho == "" || idCaminho == undefined || idCaminho == 0) {
        idCaminho = 0;

		var solicitacaoArquivo = false;
		
			if ($("#entrega_tarefa").attr("checked") || $("#trf_devolutiva").hasClass("ativo")) {
                solicitacaoArquivo = true;
				console.log('O valor de solicitacaoArquivo '+solicitacaoArquivo);
            }
		
			

		
			$.ajax({
				type: "POST",
				url: "/AVA/Caminhos/Home/SalvarCaminho/",
				data: {
					idRota: 0,
					idUsuario: 0,
					strTitulo: strTitulo,
					strDescricao: strDescricao,
					intStatus: 2,
					strTags: "",
					intTipo: 2,
                    json: JSON.stringify(k),
                    userturma:1
				},
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				success: function (idCaminho) {
					var idCaminhoTurma = idCaminho;
					var idEtapaTurma = 0;

					if (recurso > 0) {
						inserirRecursoRapidoTurma(idCaminho, idEtapaTurma, recurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValorRecurso)
					}

					var strComplemento = strTitulo + ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

					$.ajax({
						url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
						data: {
							idCaminho: idCaminhoTurma,
							idEtapa: idEtapaTurma,
							intValor: c,
							solicitaEntrega: solicitacaoArquivo
						},
						type: "POST",
						success: function (idEtapaTurma) {
							console.log("InserirAgendamentoGrupo 111111111111111111111");
							if (typeof disciplinaSelecionada === 'undefined') {
								disciplinaSelecionada = 0;
							}
							var idEtapaTurma = idEtapaTurma;
							$.ajax({
								type: "POST",
								url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
								data: {
									idRotaAgendamento: 0,
									idCaminho: idCaminhoTurma,
									idGrupo: idGrupo,
									dataInicio: dataInicio,
									horaInicio: horaInicio,
									dataFim: dataFim,
									horaFim: horaFim,
                                    strComplemento: strComplemento + " - Mural",
                                    strTitulo: strTitulo,
                                    strDescricao: strDescricao,
									idMateria: disciplinaSelecionada
                                },
                                
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								success: function (response) {
									var retorno = response.split("|");
									console.log("SalvarMensagemTarefaTurma criarTarefa.js claudemir =========");
									$.ajax({

										type: "POST",
										url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
										data: {
											strUsuarios: retorno[1],
											idGrupo: idGrupo,
											idFerramentaTipo: ID_FERRAMENTA_TIPO_TAREFA,
											idFerramenta: retorno[0],
											idEtapa: idEtapaTurma,
											strMensagem: strComplemento + " - Mural",
											idMateria: disciplinaSelecionada//,idAssunto: 27948
											,idRota: idCaminhoTurma
											
										},
										contentType: "application/x-www-form-urlencoded; charset=UTF-8",
										success: function () {
											disciplinaSelecionada = 0;
											$('#idMateria button.btnDisciplina_turmas').html("Selecione a disciplina");
											$('#idMateria button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');

											console.log("tarefa criada com sucesso na turma =======================");
											console.log('Antes');
											carregaIndicacoesAprimora();
                                            console.log('Depois');
                                            
                                            setTimeout(() => {
                                        
                                                location.href = "/ava/Mural";
                                                
                                            }, 3000);

                                            toastr.options = {
                                                "closeButton": true,
                                                "debug": false,
                                                "newestOnTop": false,
                                                "progressBar": true,
                                                "positionClass": "toast-top-center",
                                                "preventDuplicates": false,
                                                "onclick": null,
                                                "showDuration": "900",
                                                "hideDuration": "1000",
                                                "timeOut": "9000",
                                                "extendedTimeOut": "9000",
                                                "showEasing": "swing",
                                                "hideEasing": "linear",
                                                "showMethod": "fadeIn",
                                                "hideMethod": "fadeOut"
                                            }
                                            Command: toastr["success"]("Seus alunos j&aacute; podem visualizar esta tarefa.", "Tarefa publicada com sucesso na(s) turma(s)!")
            


										},
										error: function (a) {
											0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
										}
									})

								},
								error: function (a) {
									0 != a.status && console.debug("erro ao inserir agendamento!")
								}
							})

						},
						error: function (n) {
							if (n.status != 0) {
								console.debug("erro ao salvar tarefa rápida!")
							}
						}
					})


				},
				error: function (i) {
					if (i.status != 0) {
						console.debug("erro ao salvar caminho rápido!")
					}
				}
			});

	}
	//Caso o ID do caminho seja diferente de zero
	 else {
        var idCaminhoTurma = idCaminho;
        var idEtapaTurma = 0;

        if (idRecurso > 0) {
            inserirRecursoRapidoTurma(idCaminho, idEtapaTurma, idRecurso, idPublicacao, idAvaliacao, strTitulo, strDescricao, intValorRecurso)
        }

        var strComplemento = strTitulo + ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;

		 
		
        var solicitacaoArquivo = false;
		
			if ($("#entrega_tarefa").attr("checked") || $("#trf_devolutiva").hasClass("ativo")) {
                solicitacaoArquivo = true;
				console.log('O valor de solicitacaoArquivo '+solicitacaoArquivo);
            }

        $.ajax({
            url: "/AVA/Caminhos/Home/SalvarTarefaRapida/",
            data: {
                idCaminho: idCaminhoTurma,
                idEtapa: idEtapaTurma,
                intValor: c,
                solicitaEntrega: solicitacaoArquivo
            },
            type: "POST",
            success: function (idEtapaTurma) {
                console.log("Entrou no inserir arquivo na turma");
                if (typeof disciplinaSelecionada === 'undefined') {
                    disciplinaSelecionada = 0;
                }
                var idEtapaTurma = idEtapaTurma;
                $.ajax({
                    type: "POST",
                    url: "/AVA/Caminhos/Home/InserirAgendamentoGrupo",
                    data: {
                        idRotaAgendamento: 0,
                        idCaminho: idCaminhoTurma,
                        idGrupo: idGrupo,
                        dataInicio: dataInicio,
                        horaInicio: horaInicio,
                        dataFim: dataFim,
                        horaFim: horaFim,
                        strComplemento: strComplemento ,
                        strTitulo: strTitulo,
                        strDescricao: strDescricao,
                        idMateria: disciplinaSelecionada
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (response) {
                        var retorno = response.split("|");
                        
                        var arquivos = pegarDadosArquivos(files);
                        $.ajax({

                            type: "POST",
                            url: "/AVA/Grupo/Home/SalvarMensagemTarefaTurma",
                            data: {
                                strUsuarios: retorno[1],
                                idGrupo: idGrupo,
                                idFerramentaTipo: ID_FERRAMENTA_TIPO_TAREFA,
                                idFerramenta: retorno[0],
                                idEtapa: idEtapaTurma,
                                strMensagem: strComplemento,
                                idMateria: disciplinaSelecionada, 
                                arquivos: JSON.stringify(arquivos),
                                idRota: idCaminhoTurma
                            },
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function () {
                                disciplinaSelecionada = 0;
                                $('#idMateria button.btnDisciplina_turmas').html("Selecione a disciplina");
                                $('#idMateria button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');

                                console.log("tarefa criada com sucesso na turma");
                                setTimeout(() => {
                                        
                                    location.href = "/ava/Mural";
                                    
                                }, 3000);

                                  //limparDados();
                                toastr.options = {
                                    "closeButton": true,
                                    "debug": false,
                                    "newestOnTop": false,
                                    "progressBar": true,
                                    "positionClass": "toast-top-center",
                                    "preventDuplicates": false,
                                    "onclick": null,
                                    "showDuration": "900",
                                    "hideDuration": "1000",
                                    "timeOut": "9000",
                                    "extendedTimeOut": "9000",
                                    "showEasing": "swing",
                                    "hideEasing": "linear",
                                    "showMethod": "fadeIn",
                                    "hideMethod": "fadeOut"
                                }
                                Command: toastr["success"]("Seus alunos j&aacute; podem visualizar esta tarefa.", "Tarefa publicada com sucesso na(s) turma(s)!")

                                $("#strTituloTarefa").val("");
                                $("#txtDescricaoTarefa").val("");
                                enviadoParaTurma = false;
                                EscondeOsObjects();
                                $("#loader").hide();
                                zeraValoresRecurso();
                                // location.reload();

                            },
                            error: function (a) {
                                0 != a.status && console.debug("erro ao salvar mensagem r�pida!")
                            }
                        })

                    },
                    error: function (a) {
                        0 != a.status && console.debug("erro ao inserir agendamento!")
                    }
                })

            },
            error: function (n) {
                if (n.status != 0) {
                    console.debug("erro ao salvar tarefa rápida!")
                }
            }
        })

    }
}

//codigo universal para todas as pagina de criar tarefa
function inserirAvaliacaoRapido(idAvaliacao) {
    
    console.log("file -> tarefa | func -> inserirAvaliacaoRapido");

    var titulo = $("#strTituloTarefa").val(),
        descricao = $("#txtDescricaoTarefa").val(),
        msg = "",
        flag = true;
    
    if (titulo.length > 0 && descricao.length > 0) {
        msg = "T&#237;tulo e Descri&#231;&#227;o ser&#227;o sobreescritos";
    }
    else if(titulo.length > 0 && descricao.length <= 0){
        msg = "T&#237;tulo ser&#225; sobreescrito";
    }
    else if(titulo.length <= 0 && descricao.length > 0){
        msg = "Descri&#231;&#227;o ser&#225; sobreescrita";
    }
    else{
        flag = false;
    }

    if ($("#entrega_tarefa").attr("checked") && flag == true ) {
        msg += " e a solicita&#231;&#227;o de entrega ser&#225; perdida.\nDeseja continuar?";
        flag = true;
    }
    else if ($("#entrega_tarefa").attr("checked") && flag == false) {
        i += "Sua solicita&#231;&#227;o de entrega ser&#225; perdida.\nDeseja continuar?";
        flag = true;
    }

    if (flag == true && !$("#entrega_tarefa").attr("checked")) {
        msg += ".\nDeseja continuar?"
    }
    
    var intNota = 0;

    if ($("#valeNota").attr("checked")) {
        intNota = $("#intValorTarefa").val();
    }

    if (flag) {
        jConfirm(msg, "", function(i) {
            i && ($(".time_loading").css("display", "block"), $.ajax({
                type: "POST",
                url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + idAvaliacao,
                success: function(i) {
                    titulo = i.Nome;
                    descricao = i.TextoIntrodutorio;
                    intNota = i.ValorTotal;
                    $("#strTituloTarefa").val(titulo);
                    $("#txtDescricaoTarefa").val(descricao);
                    $("#intValorTarefa").val(intNota);
                    $("#valeNota").attr("checked", "true");
                    $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").attr("disabled", "disabled");
                    $("#solicita_entrega").removeAttr("onclick");
                    $("#solicita_entrega").removeAttr("href");
                    $("#entrega_tarefa").attr("checked") && $("#entrega_tarefa").removeAttr("checked");
                    $("#solicita_entrega").find("i").addClass("entrega_icon_vazio"), $("#bolSolicitaEntrega").val("0");
                    salvarRecursoAvaliacaoHtml(i);
                },
                error: function(a) {
                    0 != a.status && console.debug("erro ao retornar dados da avaliacao.")
                }
            }))
        });
    }
    else{
        ($(".time_loading").css("display", "block"), $.ajax({
            type: "POST",
            url: "/Ava/Avaliacoes/Criacao/ProvaJson/" + idAvaliacao,
            success: function(i) {
                titulo = i.Nome;
                descricao = i.TextoIntrodutorio;
                intNota = i.ValorTotal;
                $("#strTituloTarefa").val(titulo);
                $("#txtDescricaoTarefa").val(descricao);
                $("#intValorTarefa").val(intNota);
                $("#valeNota").attr("checked", "true");
                $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").attr("disabled", "disabled");
                $("#solicita_entrega").removeAttr("onclick");
                $("#solicita_entrega").removeAttr("href");
                
                $("#entrega_tarefa").attr("checked") && $("#entrega_tarefa").removeAttr("checked");
                $("#solicita_entrega").find("i").addClass("entrega_icon_vazio");
                $("#bolSolicitaEntrega").val("0");
                salvarRecursoAvaliacaoHtml(i);
            },
            error: function(a) {
                0 != a.status && console.debug("erro ao retornar dados da avaliacao.")
            }
        }));
    }
}

function inserirRecursoRapido(idRecurso, idPublicacao, idAvaliacao) {
    console.log("file -> tarefa | func -> inserirRecursoRapido");

    if ($("#recursoRapido").find("img").attr("src") != undefined) {
        if ($("#recursoRapido").attr("data-value") == "1") {
            $("#valeNota,#intValorTarefa,#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled");
            $("#strTituloTarefa").val("");
            $("#txtDescricaoTarefa").val("");
            $("#intValorTarefa").val("");
            $("#valeNota").removeAttr("checked")
        }
    }

    $("#entrega_tarefa,#strTituloTarefa,#txtDescricaoTarefa").removeAttr("disabled");

    $(".time_loading").css("display", "block");

    $.ajax({
        type: "POST",
        url: "/AVA/Caminhos/Home/ListaRecursoEscolhidoJSON/",
        data: {
            idPublicacao: idPublicacao,
            idAvaliacao: idAvaliacao,
            idRecurso : idRecurso
        },
        success: function (data) {
            salvarRecursoPublicacaoHtml(data);
        },
        error: function (q) {
            if (q.status != 0) {
                console.debug("erro ao retornar recurso escolhido")
            }
        }
    });         
}

function salvarRecursoAvaliacaoHtml(recursoJSON) {

    dadosTarefa.recurso = {
        idPublicacao : 0,
        idAvaliacao : recursoJSON.Id,
        idRecurso : 1,
        nome : recursoJSON.Nome,
        descricao: recursoJSON.TextoIntrodutorio,
        pOrdem : 0,
        sOrdem : 0,
        intValor : recursoJSON.ValorTotal
    }

    $(".anexo_preview.anx_recurso").remove();
    $("#previewAnexosTarefa").prepend('<div class="anexo_preview anx_recurso">'+
                                        '<div class="anx_dados_recurso" id="previewRecursoRapidoTarefa" data-value="1">'+
                                            '<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/>'+
                                        '</div>'+
                                        '<a href="javascript:void(0);" class="btn_acao opcao_excluir" onclick="excluirRecursoRapidoHtml()"></a>'+
                                       '</div>');
    $.fancybox.close();
    $(".ab_bts").find("a").first().html("<i class='recurso_icon'></i> Substituir recurso");
    $("#abreListaRecursoTarefa").attr({
        href: "javascript:void(0);",
        title: "Substituir recurso"
    });
    $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso");
    $(".tooltip").each(function() {
        "Inserir recurso" === $(this).text() && $(this).html("Substituir recurso")
    });
    
    removerClasseAtivo();
    $("#clickListaRecurso").attr("data-original-title", "Substituir recurso");
    $.fancybox.close();
    $(".tooltip").text("Substituir recurso");
    $("#abreListaRecursoTarefa").attr({
        href: "javascript:void(0);",
        title: "Substituir recurso"
    });
    $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso")

    var strHtml =   '<img width="55" height="55" alt="Avaliações" src="/ava/StaticContent/Common/img/recursos/Avaliacoes_55x55.jpg">'+
                    '<div class="txt_recurso">'+
                        '<h4>'+recursoJSON.Nome+'</h4>'+
                        '<p></p>'+
                    '</div>';

    $("#previewAnexosTarefa #previewRecursoRapidoTarefa").html(strHtml);
}

function salvarRecursoPublicacaoHtml(recursoJSON) {
    
    dadosTarefa.recurso = {
        idPublicacao : recursoJSON.ri.idPublicacao,
        idAvaliacao : 0,
        idRecurso : recursoJSON.ri.idRecurso,
        nome : recursoJSON.ri.strTitulo,
        descricao: recursoJSON.ri.strDescricao,
        pOrdem : 0,
        sOrdem : 0,
        intValor : 0
    }

    $(".anexo_preview.anx_recurso").remove();
    $("#previewAnexosTarefa").prepend('<div class="anexo_preview anx_recurso">'+
                                        '<div class="anx_dados_recurso" id="previewRecursoRapidoTarefa" data-value="'+recursoJSON.ri.idRecurso+'">'+
                                            '<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/>'+
                                        '</div>'+
                                        '<a href="javascript:void(0);" class="btn_acao opcao_excluir" onclick="excluirRecursoRapidoHtml()"></a>'+
                                       '</div>');
    $.fancybox.close();

    $(".ab_bts").find("a").first().html("<i class='recurso_icon'></i> Substituir recurso");
    $("#abreListaRecursoTarefa").attr({
        href: "javascript:void(0);",
        title: "Substituir recurso"
    });
    $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso");
    $(".tooltip").each(function() {
        "Inserir recurso" === $(this).text() && $(this).html("Substituir recurso")
    });

    removerClasseAtivo();
    $("#clickListaRecurso").attr("data-original-title", "Substituir recurso");
    $.fancybox.close();
    $(".tooltip").text("Substituir recurso");
    $("#abreListaRecursoTarefa").attr({
        href: "javascript:void(0);",
        title: "Substituir recurso"
    });
    $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Substituir recurso")

    var strHtml = ''+
        '<img width="55" height="55" alt="'+recursoJSON.ri.strRecurso+'" src="'+recursoJSON.ri.strThumbRecurso+'">'+
        '<div class="txt_recurso">'+
            '<h4>'+recursoJSON.ri.strTitulo+'</h4>'+
            '<p>'+recursoJSON.ri.strDescricao+'</p>';
        if (recursoJSON.ri.idCategoria == 159) {
            strHtml +='<div class="recurso_acao">';
                strHtml += '<span id="spanRecursoTarefa">Iniciar em:</span>'+
                            '<div class="bootstrap selecao">'+
                                '<select name="paginacaoCM" id="paginacaoCM" onchange="salvarPaginasCMHTML();">';
                                    $.each(recursoJSON.ri.paginasCM, function (index, value) {
                                        if (index == 0) {
                                            strHtml += '<option selected="selected" value="'+value.iVersaoCM+';'+value.intOrdem+';'+value.intOrdem2+'" url="'+value.url+'" urlPai="'+value.urlPai+'" pOrdem="'+value.intOrdem+'" sOrdem="'+value.intOrdem2+'" iVersao="'+value.iVersaoCM+'" idPublicacao="'+value.idPublicacao+'">'+value.strTitulo+'</option>';
                                        }
                                        else{
                                            strHtml += '<option value="'+value.iVersaoCM+';'+value.intOrdem+';'+value.intOrdem2+'" url="'+value.url+'" urlPai="'+value.urlPai+'" pOrdem="'+value.intOrdem+'" sOrdem="'+value.intOrdem2+'" iVersao="'+value.iVersaoCM+'" idPublicacao="'+value.idPublicacao+'">'+value.strTitulo+'</option>';
                                        }    
                                    });
                    strHtml += '</select>'+
                                '<a href="#VisualizarCM" class="btn_acao visualizar" onclick="visualizarCM(); return false;">Visualizar</a>'+
                            '</div>';
            strHtml +='</div>';
        }
    strHtml += '</div>'

    $("#previewAnexosTarefa #previewRecursoRapidoTarefa").html(strHtml);
}

function excluirRecursoRapidoHtml() {
    if ($("#previewRecursoRapidoTarefa").attr("data-value") == "1") {
        $("#strTituloTarefa").val("");
        $("#txtDescricaoTarefa").val("");
        $("#intValorTarefa").val("");
        $("#valeNota").removeAttr("checked");
        $("#valeNota").removeClass("ativo");
    }
    
    $(".ab_bts").find("a").first().html("<i class='recurso_icon'></i> Inserir recurso");
    $(".tooltip").first().text("Inserir recurso");
    $(".anexo_preview.anx_recurso").slideUp("slow", function () {
        $(".anexo_preview.anx_recurso").remove();
        $("#strTituloTarefa, #txtDescricaoTarefa, #valeNota, #intValorTarefa, #entrega_tarefa").removeAttr("disabled");
        $("#solicita_entrega").attr("onclick", "trocaStatusSolicitacaoEntrega()");
        $("#solicita_entrega").attr("href", "javascript: void(0);")
    });

    removerClasseAtivo();
    $("#clickListaRecurso").attr("data-original-title", "Inserir recurso");
    $.fancybox.close();
    $(".tooltip").text("Inserir recurso");
    $("#abreListaRecursoTarefa").attr({
        href: "javascript:void(0);",
        title: "Inserir recurso"
    });
    $("#abreListaRecursoTarefa").html("<i class='recurso_icon'></i> Inserir recurso")

    // limpa objeto
    dadosTarefa.recurso = {
        idPublicacao : 0,
        idAvaliacao : 0,
        idRecurso : 0,
        nome : "",
        descricao: "",
        pOrdem : 0,
        sOrdem : 0,
        intValor : 0
    }
    $(".anexo_preview.anx_recurso").remove();
}

function salvarPaginasCMHTML(){
    var a = $("#paginacaoCM").find("option:selected"),
        o = $("#idEtapa");
    dadosTarefa.recurso.pOrdem = a.attr("pOrdem");
    dadosTarefa.recurso.sOrdem = a.attr("sOrdem");
}

function inserirLinkTarefa() {

    var b = $("#strTituloLink").val();
    var f = $("#strLinkApoio").val();

    if (b == "" || b == "Título do Link") {
        $("#strTituloLink").addClass("ava_field_alert");
        return false;
    } 
    else 
    {
        if (f == "" || f == "Insira a URL") {
            $("#strLinkApoio").addClass("ava_field_alert");
            return false;
        }
    }

    if (f.indexOf("http") < 0) {
        f = "http://" + f
    }
    var d = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?((\/|([\w#!:.?+=&%@!\-]))(\.))+([\w#!:.?+=&%@!\-]){2,}(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var h = d.exec(f);
    if (!h) {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        return false
    }
    if (f.indexOf(".exe") > 0) {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        return false
    }
    var g = $("#idCaminho").val();
    if (g == "" || g == undefined) {
        g = 0
    }
    var e = $("#idEtapa").val();
    if (e == "" || e == undefined) {
        e = 0
    }
    var k = $("#strTituloTarefa").val();
    var j = $("#txtDescricaoTarefa").val();
    k = $("<div />").text(k).html();
    j = $("<div />").text(j).html();
    var c = 0;
    if ($("#valeNota").attr("checked")) {
        c = $("#intValorTarefa").val()
    }

    var ix = dadosTarefa.links.push(
        {
            strTituloApoio: b,
            strLinkApoio: f,
            bolExcluido: 0,
            bolNew:1,
            index : 0
        }
    );

    console.log(ix);

    dadosTarefa.links[ix-1].index = ix-1;

    ExibiLinksApoio();

    $("#tarefaInserirLink").hide();
    $("#strTituloLink").val("");
    $("#strLinkApoio").val("");
}

function ExibiLinksApoio() {

    $("#previewAnexosTarefa .anexo_preview.anx_link").remove();
    
    var strHtml = '';
    var countAtivo = 0;
    $.each(dadosTarefa.links, function (index, value) {

        if (value.bolExcluido == 0) {
            countAtivo++;
            strHtml += '<div class="anexo_preview anx_link">'+
                            '<a target="_blank" href="'+value.strLinkApoio+'" class="anx_dado">'+value.strTituloApoio+' </a>'+
                            '<a href="javascript:void(0);" class="btn_acao opcao_excluir " onclick="removerLinkApoioHtml('+index+')"></a>'+
                        '</div>';
        }

    });

    $("#previewAnexosTarefa").prepend(strHtml);

    if (countAtivo == 0) {
        $("#boxPreviewLinksTarefa").remove();
    }

    // $("#previewAnexosTarefa").append(c);
    // $("#previewAnexosTarefa").show();
}

function removerLinkApoioHtml(index) {
    dadosTarefa.links[index].bolExcluido = 1;
    ExibiLinksApoio();
}

function inserirMidiaTarefa() {

    var f = $(".tarefa_video").val();
    //var f = $("#boxMidiaTarefa").find("input").val();
    var c = 0;
    var b = "";
    var e = "";

    if (f.indexOf("http://") == -1 && f.indexOf("https://") == -1) {
        f = "http://" + f;
        $(".tarefa_video").find("input").val(f)
    }

    if (f.indexOf("#t=") > 1 || f.indexOf("&t=") > 1 || f.indexOf("&amp;t=") > 1) {
        e = f.split("t=");
        if (e.length > 0) {
            f = e[0].substring(0, (e[0].length - 1));
            e = e[1]
        } else {
            e = ""
        }
    }

    var d = retornaMatchVideo(f);
    if (d) {
        d.always(function () {
            if (bolVideoProibido && strTipoVideo == "") {
                mostraAlertaTarefa("Este vídeo tem sua incorporação proibida pelo seu proprietário e não pode ser inserido.");
                bolVideoProibido = false;
                strTipoVideo = "";
                $(".tarefa_video").find("input").addClass("ava_field_alert");
                return false
            } else {
                var k = validarURLVideo(f);
                if (e != "") {
                    f += "#t=" + e
                }
                if (k == "youtubeEncurtado") {
                    c = 1;
                    b = f.substring(f.indexOf("be/") + 3, f.length)
                } else {
                    if (k == "youtube") {
                        c = 1;
                        if (f.indexOf("&") > 0) {
                            b = f.substring(f.indexOf("v=") + 2, f.indexOf("&"))
                        } else {
                            if (f.indexOf("/v/") > 0) {
                                b = f.substring(f.indexOf("/v/") + 3, f.length)
                            } else {
                                b = f.substring(f.indexOf("v=") + 2, f.length)
                            }
                        }
                    } else {
                        if (k == "vimeo") {
                            c = 2;
                            b = f.substring(f.indexOf("vimeo.com/") + 10, f.length)
                        } else {
                            if (k == "globo") {
                                c = 3;
                                var n = f.split("/");
                                b = n[n.length - 2]
                            } else {
                                $(".tarefa_video").find("input").addClass("ava_field_alert");
                                return false
                            }
                        }
                    }
                }
                var h = $("#idCaminho").val();
                if (h == "" || h == undefined) {
                    h = 0
                }
                var j = $("#idEtapa").val();
                if (j == "" || j == undefined) {
                    j = 0
                }
                var m = $("#strTituloTarefa").val();
                var g = $("#txtDescricaoTarefa").val();
                m = $("<div />").text(m).html();
                g = $("<div />").text(g).html();
                var l = 0;
                if ($("#valeNota").attr("checked")) {
                    l = $("#intValorTarefa").val()
                }

                data = {
                    idCaminho: h,
                    idEtapa: j,
                    strTarefa: m,
                    strDescricao: g,
                    intNota: l,
                    idMidia: b,
                    idTipoMidia: c,
                    strLinkVideo: f
                }

                dadosTarefa.midia.idMidia = b;
                dadosTarefa.midia.strLinkVideo = f;
                dadosTarefa.midia.idTipoMidia = c;
                var larguraVideo = "210";
                var alturaVideo = "158";
                var embed = "";
                var tempo = "";
                var idMidia = b;
                switch (c)
                {
                    case 1:
                        {//Youtube 
                            embed = "<iframe id=\"iframeTarefaId\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" src=\"http://www.youtube.com/embed/" + idMidia + "?autoplay=0&wmode=transparent" + tempo + "\" frameborder=\"0\" allowfullscreen></iframe>";
                        } break;
                    case 2:
                        { //Vimeo
                            embed = "<iframe id=\"iframeTarefaId\" class=\"iframeVideoVimeo\" src=\"http://player.vimeo.com/video/" + idMidia + tempo + "\" width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
                        } break;
                    case 3:
                        { //Globo
                            embed = "<object width=\"" + larguraVideo + "\" height=\"" + alturaVideo + "\" data=\"http://s.videos.globo.com/p2/player.swf\" type=\"application/x-shockwave-flash\"><param value=\"true\" name=\"allowFullScreen\"><param value=\"http://s.videos.globo.com/p2/player.swf\" name=\"movie\" /><param value=\"high\" name=\"quality\" /><param value=\"midiaId=" + idMidia + "&autoStart=false&width=" + larguraVideo + "&height=" + alturaVideo + "\" name=\"FlashVars\" /></object>";
                        } break;
                }

                $('#boxPreviewMidiaTarefa').remove();
                $("#previewAnexosTarefa").prepend('<div class="anexo_preview anx_video" id="boxPreviewMidiaTarefa" style="display:none"><a href="javascript:void(0);" class="btn_acao opcao_excluir" onclick="excluirMidiaTarefaHtml()"></a>' + embed + "</div>");
                $(".iframeVideoVimeo", "#previewAnexosTarefa").on("load", function () {
                    var s = $f(this);
                    var r = false;
                    s.api("pause");
                    s.addEvent("ready", function () {
                        s.addEvent("play", function () {
                            if (!r) {
                                r = true;
                                s.api("pause")
                            }
                        })
                    })
                });

                removerClasseAtivo();
                $("#tarefaInserirVideo").hide();
                $("#tarefaLinkVideo").val("");
                $("#clickMidiaTarefa").attr("data-original-title", "Substituir v&#237;deo");

                $("#boxPreviewMidiaTarefa").slideDown("slow", function () {
                    $("#inserirMidiaTarefa").addClass("disable");
                    $("#inserirMidiaTarefa").removeAttr("onclick");
                    $("#boxMidiaTarefa").remove();
                    $("#tarefaInserirVideo").hide();
                });
            }
        });
    } else {
        mostraAlertaTarefa("URL inserida n&atilde;o &eacute; v&aacute;lida.");
        bolVideoProibido = false;
        strTipoVideo = "";
        $(".tarefa_video").find("input").addClass("ava_field_alert")
    }
}

function excluirMidiaTarefaHtml() {

    dadosTarefa.midia.idMidia = "";
    dadosTarefa.midia.strLinkVideo = "";
    dadosTarefa.midia.idTipoMidia = 0;

    $("#boxPreviewMidiaTarefa").slideUp("slow", function () {
        $("#boxPreviewMidiaTarefa").hide();
        $("#clickMidiaTarefa").attr("data-original-title", "Inserir v&#237;deo");
        $("#inserirMidiaTarefa").removeClass("disable");
        $("#inserirMidiaTarefa").attr("onclick", "abrirMidiaTarefa()")
    });
}

function SalvarCaminhoCriarTarefaGlobal() {
    
    var enviadoParaTurma = true;

    $("#strTituloTarefa").val($("#strTituloTarefa").val().trim());
    $("#txtDescricaoTarefa").val($("#txtDescricaoTarefa").val().trim());

    var strTitulo = $("#strTituloTarefa").val();
    var strDescricao = $("#txtDescricaoTarefa").val();

    strTitulo = $("<div />").text(strTitulo).html();
    strDescricao = $("<div />").text(strDescricao).html();

    if (strTitulo == "" || strTitulo == "Título da Tarefa") {
        $("#strTituloTarefa").addClass("alerta");
        $("#feedErroTituloTarefa").show();

        $("html, body").animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);

        $("#atividades_box .strTituloTarefa").addClass("ava_field_alert");
        $("#strTituloTarefa").addClass('ava_field_alert');
        ShowBtnAgendar(true);
        return false;
    } 
    else if (strDescricao == "") {
        $("#txtDescricaoTarefa").addClass("alerta");
        $("#feedErroTituloTarefa").show();

        $("html, body").animate({
            scrollTop: $(".atividades_box").offset().top - 60
        }, 1000);

        $("#txtDescricaoTarefa").addClass('ava_field_alert');
        ShowBtnAgendar(true);
        return false;
    } 
    else {
        $("#strTituloTarefa").removeClass("alerta");
        $("#txtDescricaoTarefa").removeClass("alerta");
        $("#feedErroTituloTarefa").hide();
    }

    if (arrayUsuariosAux.length <= 0 && arrayGrupoAux.length <= 0) {
        $("#feed_erro_tarefa").show();
        $("#seletorMuralTarefa .seletor_lista").addClass("alerta");
        $("#seletorMuralTarefa").AvaSelector("focus");
        ShowBtnAgendar(true);
        return false;
    } 
    else {
        $("#seletorMuralTarefa .seletor_lista").removeClass("alerta");
    }

    var intNota = 0;

    if (!$("#intValorTarefa").attr("disabled")) {
        intNota = $("#intValorTarefa").val().replace(".", ",");

        if (intNota == "" || intNota == "Valor") {

            $("html, body").animate({
                scrollTop: $("#intValorTarefa").offset().top - 200
            }, 800);

            $("#intValorTarefa").addClass("alerta");
            ShowBtnAgendar(true);
            return false;
        } 
        else {
            $("#intValorTarefa").removeClass("alerta")
        }
    }


    var privadoCompartilhado = 2;
    $("input:radio[name=rTipo_1]").each(function () {
        if ($(this).is(":checked")) {
            privadoCompartilhado = parseInt($(this).val())
        }
    });

    var arrayFiles = new Array();
    var f = arrayArquivosUpload;
    var arrayArquivos = null;

    if (arrayArquivosUpload == undefined || arrayArquivosUpload == "" || arrayArquivosUpload == null) {
        arrayArquivos = null;
    } 
    else {

        for (var e = 0; e < arrayArquivosUpload.arrayArquivo.length; e++) {
            arrayFiles.push(arrayArquivosUpload.arrayArquivo[e].id)
        }

        arrayArquivos = {
            idFerramentaTipo: f.idFerramentaTipo !=  undefined ? parseInt(f.idFerramentaTipo) : 0,
            idFerramenta: f.idFerramenta != undefined ? parseInt(f.idFerramenta) : 0,
            arquivos: arrayFiles
        }
    }

    var idTurmas = [];
    var listaGrupo = [];

    if (arrayGrupoAux.length > 0) {
        for (var i = 0; i < arrayGrupoAux[0].usuarios.length; i++) {
            var objeto = {};
            objeto.idTurma = arrayGrupoAux[0].usuarios[i].idTurma;
            objeto.idGrupo = arrayGrupoAux[0].usuarios[i].idGrupo;
            listaGrupo.push(objeto);
            var idTurma = arrayGrupoAux[0].usuarios[i].idTurma;
            idTurmas.push(idTurma);
        }
    }

    
    var idGrupo = 0;
    var idAgendamentoUsuario = 0;
    var dataInicio = $("#dataInicio").val();
    var dataFim = $("#dataFim").val();

    $horasemTratamento = $("#horaInicio").val();
    $minutosServ = $("#minutosServidor").val();

    var array = $horasemTratamento.split(":");
    var horas = array[0];
    var minutos = array[1];
    var intMinServidor = parseInt($minutosServ);
    var minutosInt = parseInt(array[1]) + 1;
    var MinutoString = minutosInt.toString();

    if(minutos == intMinServidor){
        if(minutosInt<10){
            var horaInicio = horas + ":"+ "0"+MinutoString;
        }
        else {
            var horaInicio =  horas + ":"+MinutoString;
        }
    }
    else {
        var horaInicio = horas + ":" + minutos;
    }

    var horaFim = $("#horaFim").val();

    var possueAluno = false;
    var grupos = [];
    var gruposNome = [];
    var turmas = [];
    var txtDisponivel = ". Dispon\u00edvel de " + dataInicio + " " + horaInicio + " at\u00e9 " + dataFim + " " + horaFim;
    var txtInput = strTitulo + txtDisponivel;
    arrayUsuariosAux.forEach(element => {
        if (element.idGrupo) {
            turmas.push(element);
        }
    });

    for (var i = 0; i < arrayUsuariosAux.length; i++) {

        if (arrayUsuariosAux[i].idUsuario == 0) {
            grupos.push(arrayUsuariosAux[i].idGrupo);
            gruposNome.push(arrayUsuariosAux[i].strNome);
        }
        else {
            if (turmas.filter(a => a.idTurma == arrayUsuariosAux[i].idTurma).length == 0) {
                possueAluno = true;    
            }
        }
    }

    for (var i = 0; i < arrayGrupoAux.length; i++) {
        for (var x = 0; x < arrayGrupoAux[i].usuarios.length; x++) {
            if (arrayGrupoAux[i].usuarios[x].isTurma) {
                grupos.push(arrayGrupoAux[i].usuarios[x].idGrupo);
                gruposNome.push(arrayGrupoAux[i].usuarios[x].strNome);
            }
            else {
                // arrayUsuariosAux.push(arrayGrupoAux[i].usuarios[x]);
                // possueAluno = true;
                if (turmas.filter(a => a.idTurma == arrayUsuariosAux[i].idTurma).length == 0) {
                    arrayUsuariosAux.push(arrayGrupoAux[i].usuarios[x]);
                    possueAluno = true;    
                }
            }
        }
    }

    var solicitacaoArquivo = $('#bolSolicitaEntrega').val() == 1 ? true : false;

    if ($("#trf_devolutiva").hasClass("ativo")) {
        solicitacaoArquivo = true;
    }
    var arrayUsuariosAuxTemp = [];
    var listaUsuario = [];

    var tags = "";
    $(".ava_tags li").each(function () {
        tags += $(this).text().substring(0, $(this).text().length) + ";"
    });

    for (let index = 0; index < turmas.length; index++) {
        const element = turmas[index];
        arrayUsuariosAux.filter(a => a.idTurma == element.idTurma && a.idGrupo == undefined).forEach(element => {
            listaUsuario.push(element);
        });
    }

    arrayUsuariosAux.filter(a => a.idGrupo == undefined).forEach(e => {
        if (listaUsuario.filter(f => f.idUsuario == e.idUsuario).length == 0) {
            arrayUsuariosAuxTemp.push({
                idGrupo: 0,
                idTurma: e.idTurma,
                idUsuario: e.idUsuario,
                strApelido: e.strApelido,
                strFoto: e.strFoto,
                strNome: e.strNome
            });
        }
    });

    dadosTarefa.tags = tags;
    dadosTarefa.titulo = $("#strTituloTarefa").val();
    dadosTarefa.descricao = $("#txtDescricaoTarefa").val();
    dadosTarefa.intNota = intNota;
    dadosTarefa.solicitarEntrega = solicitacaoArquivo;
    dadosTarefa.privadoCompartilhado = privadoCompartilhado;
    dadosTarefa.turmasGrupos = turmas;
    dadosTarefa.alunos = arrayUsuariosAuxTemp;
    dadosTarefa.possuiAluno = possueAluno;
    dadosTarefa.possuiTurmas = turmas.length > 0 ? true : false;
    dadosTarefa.dataInicial = dataInicio
    dadosTarefa.dataFinal = dataFim;
    dadosTarefa.horaInicio = horaInicio
    dadosTarefa.horaFim = horaFim;
    dadosTarefa.idUsuario = $("#agendarTarefa").data("idusuario");
    if (arrayArquivos == null) {
        dadosTarefa.material = {
            idFerramentaTipo: 0,
            idFerramenta: 0,
            arquivos: []
        }
    }
    else{
        dadosTarefa.material = arrayArquivos;
    }
    
    dadosTarefa.complemento = txtInput;

    dadosTarefa.idCaminho = $("#idCaminho").val() == "" ? 0 : $("#idCaminho").val();
    dadosTarefa.idEtapa = $("#idEtapa").val() == "" ? 0 : $("#idEtapa").val();
    dadosTarefa.strDescricao = $("#txtDescricaoTarefa").val();

    dadosTarefa.disciplinaSelecionada = 0;

    var valor = $("#idMateria").val();

    if (valor == "0" || valor == undefined) {
        dadosTarefa.disciplinaSelecionada = 0;
    }
    else {
        dadosTarefa.disciplinaSelecionada = valor;
    }

    var retorno = validaDataAgendamento(dataInicio, dataFim, horaInicio, horaFim);
    if (retorno == "ok") {
        console.log(dadosTarefa);

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/SalvarCaminhoCriarTarefaGlobal",
            data: JSON.stringify(dadosTarefa),
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $.fancybox.close();

                // ShowBtnAgendar(true);
                // return;

                if (data.msg == "") {
                    ShowToast({
                        type: "success", 
                        title : "Seus alunos j&aacute; podem visualizar esta tarefa.", 
                        desc : "Tarefa publicada com sucesso na(s) turma(s)!", 
                        callback: function(){
                            disciplinaSelecionada = 0;
                            $('#idMateria button.btnDisciplina_turmas').html("Selecione a disciplina");
                            $('#idMateria button.btnDisciplina_turmas').append('&nbsp;<span class="caret"></span>');

                            $("#strTituloTarefa").val("");
                            $("#txtDescricaoTarefa").val("");
                            //ShowBtnAgendar(true);
                            enviadoParaTurma = false;
                            EscondeOsObjects();
                            $("#loader").hide();
                            zeraValoresRecurso();


                            //Criar uma promise aqui
                            //Será necessário criar um loop + passar o IdTurma e IdUser real.
                            //Isso depois do HUB pronto.

                            var tTurmas = dadosTarefa.turmasGrupos ;

                            try{

                                var t = dadosTarefa.turmasGrupos.map(  function(item,index,tTurmas){

    
                                    criarAtividadeAgendaEdu(item.idTurma,idUsuario);


                                }  )
                                
                                // criarAtividadeAgendaEdu();

                                // location.href = "/ava/Mural";
                            }
                            catch(err){
                                location.href = "/ava/Mural";

                            }
                        }
                    });
                }
                else{
                    ShowToast({
                        type: "success", 
                        title : "Algum processo deu errado, tente novamente mais tarde.", 
                        desc : "Erro ao publicar tarefa", 
                        callback: function(){
    
                            location.href = "/ava/caminhos/home/index/1";
                        }
                    });
                }
            },
            error: function (i) {
                if (i.status != 0) {
                    console.debug("erro ao retornar feed user!")
                }
            }
        });

    } 
    else {
        ShowBtnAgendar(true);
        if (retorno == "erro") {
            return false
        } 
        else {
            mostraAlertaTarefa(retorno)
        }
    }
}

function BindAgendar(){
    $("#agendarTarefa").bind("click");
    $("#agendarTarefa").html('<span class=" awe_icons"></span>Agendar ');
}