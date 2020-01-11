var countGlobalIdImage = 0;

function abrirUploadArquivo(d, c, a, b, f, e, g,idVisitado) {
    if (e == "IE") {
        $("#countt_" + f).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/ava/upload/home/uploadIE",
            data: {
                idUsuarioRecebe: d,
                idFerramenta: c,
                idFerramentaTipo: a,
                contador: f,
                bolAluno: g
            },
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(h) {
                $("#countt_" + f).html(h);
                $("#tabs_" + f).tabs();
                if (b == "false") {
                    $(".etapa_infos").each(function() {
                        $(this).find("#filedrag_" + f).remove();
                        if ($.trim($(this).find("#progressbar_" + f).text()) == "") {
                            $(this).find("#progressbar_" + f).html("<p>Nenhum arquivo enviado.</p>")
                        } else {
                            $(this).find("#progressbar_" + f + " .excludeProgress").remove()
                        }
                    })
                }
            },
            error: function() {
                $(".container_inEntrega").html("erro ao carregar container upload.")
            }
        })
    } else {
        $("#countt_" + f).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            type: "POST",
            url: "/AVA/Upload/Home/UploadIndex",
            data: {
                idUsuarioRecebe: d,
                idFerramenta: c,
                idFerramentaTipo: a,
                contador: f,
                idVisitado: idVisitado
            },
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(h) {
                $("#countt_" + f).html(h);
                $("#tabs_" + f).tabs();
                InitFileDrag(f, g);
                if (b == "false") {
                    $(".etapa_infos").each(function() {
                        $(this).find("#filedrag_" + f).remove();
                        if ($.trim($(this).find("#progressbar_" + f).text()) == "") {
                            $(this).find("#progressbar_" + f).html("<p>Nenhum arquivo enviado.</p>")
                        } else {
                            $(this).find("#progressbar_" + f + " .excludeProgress").remove()
                        }
                    })
                }
            },
            error: function() {
                $(".container_inEntrega").html("erro ao carregar container upload.")
            }
        })
    }
}

function excluirArquivo(a, b) {
    if (b) {
        $.ajax({
            type: "POST",
            url: "/ava/upload/home/Excluir",
            data: {
                id: a
            },
            cache: false,
            success: function(g) {
                var f = $("#boxarq_" + a).parent().parent();
                $("#boxarq_" + a).slideUp("slow", function() {
                    $(this).remove()
                });
                var e = f.closest(".etapa_infos").find(".listaEtapas").attr("idEtapa");
                if (e != "" && e !== undefined) {
                    var d = f.closest(".etapa_infos").find(".listaEtapas").attr("idRotaUsuario");
                    var k = f.closest(".etapa_infos").find(".listaEtapas").attr("idRecurso");
                    var c = f.closest(".etapa_infos").find(".listaEtapas").attr("idRotaAgendamento");
                    var j = f.closest(".etapa_infos").prev().children(":first").attr("idRotaEtapaUsuario");
                    var h = 0;
                    f.find(".nome_Arquiv").each(function() {
                        h++
                    });
                    h = h - 1;
                    if (h == 0) {
                        var l = f.closest(".etapa_infos").prev().children(":first").find(".sprite_player.bolConcluidoPlaca");
                        l.removeClass("concluido");
                        salvarCaminhoEtapaUsuario(j, d, e, k, c, false, "normal", "sim")
                    }
                }
                $("#msg_aviso").remove()
            },
            error: function() {
                $("#boxarq_" + a).html("erro ao excluir arquivo.")
            }
        })
    } else {
        $("#tooltipExc_" + a).css("display", "none")
    }
}

function ajaxFileUpload(k, b) {
    if ($("#fileToUpload_" + k).val() != "") {
        $("#msg_aviso").remove();
        var h = $("#idUsuarioRecebe_" + k).val();
        var n = $("#idFerramenta_" + k).val();
        var l = $("#idFerramentaTipo_" + k).val();
        var c = $("#fileToUpload_" + k).val();
        c = c.replace(/ /g, "");
        c = c.split("\\");
        var j = c.length - 1;
        c = c[j];
        countGlobalIdImage++;
        var d = false;
        var g = c;
        g = g.split(".");
        g[1] = g[1].toLowerCase();
        if (g.length > 0) {
            for (var e = 0; e < g.length; e++) {
                if (e == g.length - 1) {
                    var f = g[e]
                }
            }
            if (f == "exe" || f == "bat") {
                d = true
            }
            f = f.toLowerCase()
        }
        if (!d) {
            if (validaPerfil(f, validaBolCrop()) || validaBolCrop()) {
                $(".lista_biblioteca").html('<div id="progressbar_1"></div>');
                ListaAndamento();
                $(".tabs li").removeClass("active");
                $(".auxMeusArq").addClass("active");
                $("#menu_andamento").parent().css("display", "block");
                $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")");
                if (f == "jpg" || f == "jpeg" || f == "gif" || f == "png") {
                    $("#progressbar_" + k).prepend("<div class='item_arquivo img_ie arq_name_" + g[0].replace(/[^a-zA-Z0-9]/g, "") + "'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + g[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>");
                    $(".item_arquivo").mouseenter(function() {
                        $(this).find(".detalhe_arquivo").slideDown("fast")
                    });
                    $(".item_arquivo").mouseleave(function() {
                        $(this).find(".detalhe_arquivo").slideUp()
                    });
                    var m = $("#progressbar_" + k + " .singleProgress:first");
                    var a = $("#progressbar_" + k + " .algumProgresso:first");
                    $("#progressbar_" + k + " .algumProgresso:first").progressbar({
                        value: 0
                    });
                    $.ajaxFileUpload({
                        url: "/ava/Upload/Home/IniciaUploadIE/?idUsuarioRecebe=" + h + "&idFerramentaTipo=" + l + "&idFerramenta=" + n,
                        secureuri: false,
                        fileElementId: "fileToUpload_" + k,
                        dataType: "text",
                        beforeSend: function() {
                            $("#loading_" + k).show()
                        },
                        complete: function() {
                            $("#loading_" + k).hide()
                        },
                        success: function(o, q) {
                            data = jQuery.parseJSON(o);
                            if (typeof(data.error) != "undefined") {
                                if (data.error == "0" || data.error == "-4") {
                                    var r = data.idarquivo;
                                    var t = data.msg;
                                    var i = $("#idFerramentaTipo_" + k).val();
                                    if (i == "15" && b == "true") {
                                        var p = a.closest(".container_entrega_aluno").closest(".etapa_infos");
                                        if (p.find(".fecha_X").attr("idrotaagendamento") != "" && p.find(".fecha_X").attr("idrotaagendamento") != undefined && p.find(".fecha_X").attr("idrotaagendamento") != null) {
                                            p = p.find(".fecha_X")
                                        } else {
                                            if (p.find(".abrirObraLiteraria").attr("idrotaagendamento") != "" && p.find(".abrirObraLiteraria").attr("idrotaagendamento") != undefined && p.find(".abrirObraLiteraria").attr("idrotaagendamento") != null) {
                                                p = p.find(".abrirObraLiteraria")
                                            } else {
                                                if (p.find(".listaEtapas").attr("idrotaagendamento") != "" && p.find(".listaEtapas").attr("idrotaagendamento") != undefined && p.find(".listaEtapas").attr("idrotaagendamento") != null) {
                                                    p = p.find(".listaEtapas")
                                                }
                                            }
                                        }
                                        enviarTrabalhoMarcarConcluido(p)
                                    }
                                    a.progressbar("option", "value", 100);
                                    a.next().html(" 100%");
                                    AtualizaContador();
                                    $(".item_arquivo").addClass("select");
                                    if (!validaBolCrop()) {
                                        if (f == "jpg" || f == "jpeg" || f == "gif" || f == "png") {
                                            var s = '<div class="item_arquivo img_ie select idArq_' + r + '" idarquivo="' + r + '"><div class="tipo_arquivo"><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + g[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + r + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>'
                                        } else {
                                            if (f == "wav" || f == "wma" || f == "mp3") {
                                                var s = '<div class="item_arquivo audio idArq_' + r + ' select" idarquivo="' + r + '"><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + g[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + r + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>'
                                            } else {
                                                var s = '<div class="item_arquivo doc idArq_' + r + ' select" idarquivo="' + r + '"><div class="tipo_arquivo"><p>.' + f + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + g[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + r + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>'
                                            }
                                        }
                                        arraySelecionados.push(r);
                                        arraySelecionadosHtml.push(s)
                                    }
                                    if (g[1] == "jpg" || g[1] == "jpeg" || g[1] == "gif" || g[1] == "png") {
                                        $("#ava_upload").on("click", ".arq_name_" + g[0].replace(/[^a-zA-Z0-9]/g, ""), function(u) {
                                            VisualizaArquivo(r, 3)
                                        })
                                    }
                                    if (countGlobalIdImage > 0) {
                                        countGlobalIdImage--;
                                        $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")
                                    }
                                    if (countGlobalIdImage == 0) {
                                        $("#menu_andamento").parent().css("display", "none")
                                    }
                                    $(".carregando").remove();
                                    $(".b_tooltip_center").each(function() {
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
                                    });
                                    $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: true,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    });
                                    $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: true,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                } else {
                                    if (data.error == "1") {
                                        var r = data.idarquivo;
                                        var t = data.msg;
                                        InformationAlertFileIE(c, k)
                                    }
                                }
                            }
                        },
                        error: function(o, i, p) {
                            alert(p)
                        }
                    })
                } else {
                    InformationAlertFileIE(c, k)
                }
            } else {
                if (l == 35 || l == 36) {
                    if (f == "jpg" || f == "jpeg" || f == "gif" || f == "png") {
                        $(".lista_biblioteca").html('<div id="progressbar_1"></div>');
                        ListaAndamento();
                        $(".tabs li").removeClass("active");
                        $(".auxMeusArq").addClass("active");
                        $("#menu_andamento").parent().css("display", "block");
                        $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")");
                        $("#progressbar_" + k).prepend("<div class='item_arquivo img_ie arq_name_" + g[0].replace(/[^a-zA-Z0-9]/g, "") + "'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + g[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>")
                    } else {
                        InformationAlertFileIE(c, k)
                    }
                } else {
                    $(".lista_biblioteca").html('<div id="progressbar_1"></div>');
                    ListaAndamento();
                    $(".tabs li").removeClass("active");
                    $(".auxMeusArq").addClass("active");
                    $("#menu_andamento").parent().css("display", "block");
                    $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")");
                    if (f == "jpg" || f == "jpeg" || f == "gif" || f == "png") {
                        $("#progressbar_" + k).prepend("<div class='item_arquivo img_ie arq_name_ " + g[0].replace(/[^a-zA-Z0-9]/g, "") + "'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + g[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>")
                    }
                    if (f == "wav" || f == "wma" || f == "mp3") {
                        $("#progressbar_" + k).prepend("<div class='item_arquivo audio'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'><p></p></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + g[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>")
                    }
                    if (f == "doc" || f == "ppt" || f == "pptx" || f == "odp" || f == "xls" || f == "xlsx" || f == "ods" || f == "doc" || f == "docx" || f == "txt" || f == "pdf" || f == "odt" || f == "rtf" || f == "pub") {
                        $("#progressbar_" + k).prepend("<div class='item_arquivo doc'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'><p>" + f + "</p></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + g[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>")
                    }
                }
                $(".item_arquivo").mouseenter(function() {
                    $(this).find(".detalhe_arquivo").slideDown("fast")
                });
                $(".item_arquivo").mouseleave(function() {
                    $(this).find(".detalhe_arquivo").slideUp()
                });
                var m = $("#progressbar_" + k + " .singleProgress:first");
                var a = $("#progressbar_" + k + " .algumProgresso:first");
                $("#progressbar_" + k + " .algumProgresso:first").progressbar({
                    value: 0
                });
                $.ajaxFileUpload({
                    url: "/ava/Upload/Home/IniciaUploadIE/?idUsuarioRecebe=" + h + "&idFerramentaTipo=" + l + "&idFerramenta=" + n,
                    secureuri: false,
                    fileElementId: "fileToUpload_" + k,
                    dataType: "text",
                    beforeSend: function() {
                        $("#loading_" + k).show()
                    },
                    complete: function() {
                        $("#loading_" + k).hide()
                    },
                    success: function(o, q) {
                        data = jQuery.parseJSON(o);
                        if (typeof(data.error) != "undefined") {
                            if (data.error == "0" || data.error == "-4") {
                                var r = data.idarquivo;
                                var t = data.msg;
                                var i = $("#idFerramentaTipo_" + k).val();
                                if (i == "15" && b == "true") {
                                    var p = a.closest(".container_entrega_aluno").closest(".etapa_infos");
                                    if (p.find(".fecha_X").attr("idrotaagendamento") != "" && p.find(".fecha_X").attr("idrotaagendamento") != undefined && p.find(".fecha_X").attr("idrotaagendamento") != null) {
                                        p = p.find(".fecha_X")
                                    } else {
                                        if (p.find(".abrirObraLiteraria").attr("idrotaagendamento") != "" && p.find(".abrirObraLiteraria").attr("idrotaagendamento") != undefined && p.find(".abrirObraLiteraria").attr("idrotaagendamento") != null) {
                                            p = p.find(".abrirObraLiteraria")
                                        } else {
                                            if (p.find(".listaEtapas").attr("idrotaagendamento") != "" && p.find(".listaEtapas").attr("idrotaagendamento") != undefined && p.find(".listaEtapas").attr("idrotaagendamento") != null) {
                                                p = p.find(".listaEtapas")
                                            }
                                        }
                                    }
                                    enviarTrabalhoMarcarConcluido(p)
                                }
                                a.progressbar("option", "value", 100);
                                a.next().html(" 100%");
                                AtualizaContador();
                                if (!validaBolCrop()) {
                                    if (f == "jpg" || f == "jpeg" || f == "gif" || f == "png") {
                                        var s = '<div class="item_arquivo img_ie select idArq_' + r + '" idarquivo="' + r + '"><div class="tipo_arquivo"><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + g[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + r + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>'
                                    } else {
                                        if (f == "wav" || f == "wma" || f == "mp3") {
                                            var s = '<div class="item_arquivo audio idArq_' + r + ' select" idarquivo="' + r + '"><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + g[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + r + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>'
                                        } else {
                                            var s = '<div class="item_arquivo doc idArq_' + r + ' select" idarquivo="' + r + '"><div class="tipo_arquivo"><p>.' + f + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + g[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + r + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>'
                                        }
                                    }
                                    arraySelecionados.push(r);
                                    arraySelecionadosHtml.push(s)
                                }
                                if (g[1] == "jpg" || g[1] == "jpeg" || g[1] == "gif" || g[1] == "png") {
                                    $("#ava_upload").on("click", ".arq_name_" + g[0].replace(/[^a-zA-Z0-9]/g, ""), function(u) {
                                        VisualizaArquivo(r, 3)
                                    })
                                }
                                if (countGlobalIdImage > 0) {
                                    countGlobalIdImage--;
                                    $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")
                                }
                                if (countGlobalIdImage == 0) {
                                    $("#menu_andamento").parent().css("display", "none")
                                }
                                $(".carregando").remove();
                                $(".b_tooltip_center").each(function() {
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
                                });
                                $(".b_tooltip_left").each(function() {
                                    $(this).tooltip({
                                        offset: [0, 40],
                                        opacity: 1,
                                        position: "top left",
                                        effect: "slide",
                                        relative: true,
                                        events: {
                                            def: "click, mouseout"
                                        }
                                    })
                                });
                                $(".b_tooltip_right").each(function() {
                                    $(this).tooltip({
                                        offset: [0, -40],
                                        opacity: 1,
                                        position: "top right",
                                        effect: "slide",
                                        relative: true,
                                        events: {
                                            def: "click, mouseout"
                                        }
                                    })
                                })
                            } else {
                                if (data.error == "1") {
                                    var r = data.idarquivo;
                                    var t = data.msg;
                                    InformationAlertFileIE(c, k)
                                }
                            }
                        }
                    },
                    error: function(o, i, p) {
                        alert(p)
                    }
                })
            }
        } else {
            InformationAlertFileIE(c, k)
        }
    } else {
        alert("Selecione um arquivo.")
    }
    return false
}

function InformationAlertFileIE(b, c) {
    var a = null;
    if (validaBolCrop()) {
        a = "<strong>Alerta:</strong> " + b + " falhou. Opera��o cancelada. Por favor, suba um arquivo em formato .jpg, .jpeg, .gif ou .png."
    } else {
        a = "<strong>Alerta:</strong> " + b + " falhou no upload devido a um erro. Este tipo de arquivo n&atilde;o &eacute; permitido por raz&otilde;es de seguran&ccedil;a."
    }
    OutputAlert("<div class='ui-widget'><div class='ui-state-error ui-corner-all' style='padding: 0 .7em;'><p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span>" + a + "</p></div></div>", c)
}

function validaPerfil(a, b) {
    if (b) {
        if (a == "jpg" || a == "jpeg" || a == "gif" || a == "png") {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
};