jQuery(function(b) {
    b("#menu_criar_tarefa").click(function() {
        abrirCriarTarefa()
    });
    b("#menu_diga_la").click(function() {
        abrirDigaLa()
    });
    b("#multimidia_imagens").click(function() {
        abreUploadImagemTimeLine()
    });
    b("#multimidia_video").click(function() {
        bloqueiaOutrosDigaLa(true);
        if (!b("#enviar_video").is(":visible")) {
            b("#enviar_video").show();
            b("#seletorMuralDigaLa").show();
            preparaAvaSelector();
            b("#dialogo_acoes").show();
            b("#compartilhar").show();
            b("#btnCancelarFerramentaMural").show();
            b("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable")
        }
    });
    b("#multimidia_documentos").click(function() {
        console.log('rrrr');
        abrirUploadArquivosDigaLa()
    })
});

function abrirUploadArquivosDigaLa() {
    abreUploadFileTimeLine();
    $("#dialogo_acoes").show();
    $("#seletorMuralDigaLa").show();
    $("#compartilhar").show();
    $("#btnCancelarFerramentaMural").show();
    $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable")
}

function abrirDigaLa() {
    $("#area_criar_tarefa").hide();
    $("#menu_criar_tarefa").removeClass("ativo");
    $("#menu_diga_la").addClass("ativo");
    $("#area_diga_la").show();
    $("#conteudo_criar_tarefa").empty();
    $("#agendar").hide();
    $(".dialogo_multimidia.right").show();
    $(".verificavideo").hide();
    $("#erro_enviar_video").hide();
    $(".enviar_video").hide();
    $("#seletorMuralDigaLa").hide();
    $("#container_preview_video").hide();
    $("#btnCancelarFerramentaMural").click();
    $(".preview_arq_post").hide();
    $(".busca_especifico").val("");
    $("#blocoDigaLa").show()
}

function preparaVisualizacaoArquivosDigaLa(g) {
    var m = $("#previewArquivosDigaLa");
    if (m.find(".prev_midia.adicionar:first").hasClass("adicionar") == false) {
        var d = $("<div />").addClass("prev_midia").addClass("adicionar");
        var j = $("<a id='addArquivoDigaLa' onclick='abrirArquivosDigaLa()'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");
        m.append(d.append(j))
    }
    if (g !== undefined && g != null && g.length > 0) {
        for (var h = 0; h < g.length; h++) {
            var e = $("<div />").addClass("prev_midia").attr("data-idarquivo", g[h].idArquivo);
            var f = $("<div />").addClass("bloco_arq");
            var c = $("<div />").addClass("tipo_arquivo");
            var l = $("<span />").text(g[h].extensao.substring(1, g[h].extensao.length));
            var k = $("<p />").html((g[h].nome == "" ? g[h].arquivo : g[h].nome));
            var b = $("<a />").attr("href", "javascript:void(0);").attr("onclick", "removeArquivoDigaLa(this)").addClass("btn_acao opcao_excluir").text("Remover");
            c.append(l);
            f.append(c);
            f.append(k);
            e.append(f);
            e.append(b);
            m.prepend(e)
        }
        bloqueiaOutrosDigaLa(true);
        $("#previewArquivosDigaLa").show()
    }
}

function abreUploadFileTimeLine() {
    var j = true;
    var e = parseInt($("#previewArquivosDigaLa").data("idarquivomultimidia"));
    $.fancybox.showLoading();
    if (e === undefined || e == null || e == 0) {
        $.ajax({
            url: "/ava/mural/home/VerificaArquivoMultimidiaTimeline",
            dataType: "json",
            async: false,
            success: function(m) {
                var i = parseInt(m.error);
                if (i == 0) {
                    e = parseInt(m.arquivomultimidia.idArquivoMultimidia)
                } else {
                    console.log(m.msg);
                    j = false;
                    $.fancybox.hideLoading()
                }
            },
            error: function(i) {
                $.fancybox.hideLoading();
                j = false
            }
        })
    }
    if (j) {
        var b = new Array();
        if (objetoArquivos.arquivos.length > 0) {
            for (var k in objetoArquivos.arquivos) {
                b.push(objetoArquivos.arquivos[k].idArquivo)
            }
        }
        var c = {
            idFerramenta: e,
            idFerramentaTipo: idFerramentaTipoTimeLineFile,
            idsArquivosSelecionados: b.join(",")
        };
        var l;
        try {
            l = document.createElement("<form name='upload'>")
        } catch (f) {
            l = document.createElement("form");
            l.name = "upload"
        }
        for (var d in c) {
            if (c.hasOwnProperty(d)) {
                var h = document.createElement("input");
                h.type = "hidden";
                h.name = d;
                h.value = c[d];
                l.appendChild(h)
            }
        }
        l.target = "Upload";
        l.method = "POST";
        l.action = "/AVA/Upload";
        document.body.appendChild(l);
        var g = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        if (Modernizr.touch) {
            g = null
        }
        a = window.open("", "Upload", g);
        if (a) {
            l.submit()
        }
        $.fancybox.hideLoading()
    }
}

function abreUploadImagemTimeLine() {
    var h = true;
    var k = parseInt($("#previewImagemDigaLa").data("idalbum"));
    $.fancybox.showLoading();
    if (k === undefined || k == null || k == 0) {
        $.ajax({
            url: "/ava/mural/home/VerificaAlbumTimeline",
            dataType: "json",
            async: false,
            success: function(m) {
                var i = parseInt(m.error);
                if (i == 0) {
                    k = parseInt(m.album.idAlbum)
                } else {
                    console.log(m.msg);
                    h = false;
                    $.fancybox.hideLoading()
                }
            },
            error: function(i) {
                $.fancybox.hideLoading();
                h = false
            }
        })
    }
    if (h) {
        var b = new Array();
        if (objetoImagens.imagens.length > 0) {
            for (var j in objetoImagens.imagens) {
                b.push(objetoImagens.imagens[j].idArquivo)
            }
        }
        var c = {
            idFerramenta: k,
            idFerramentaTipo: idFerramentaTipoTimeLine,
            idsArquivosSelecionados: b.join(",")
        };
        var l;
        try {
            l = document.createElement("<form name='upload'>")
        } catch (e) {
            l = document.createElement("form");
            l.name = "upload"
        }
        for (var d in c) {
            if (c.hasOwnProperty(d)) {
                var g = document.createElement("input");
                g.type = "hidden";
                g.name = d;
                g.value = c[d];
                l.appendChild(g)
            }
        }
        l.target = "Upload";
        l.method = "POST";
        l.action = "/AVA/Upload";
        document.body.appendChild(l);
        var f = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        if (Modernizr.touch) {
            f = null
        }
        a = window.open("", "Upload", f);
        if (a) {
            l.submit()
        }
        $.fancybox.hideLoading()
    }
}

function preparaVisualizacaoImagensDigaLa(f) {
    var l = $("#previewImagemDigaLa");
    if (l.find(".prev_midia.adicionar:first").hasClass("adicionar") == false) {
        var e = $("<div />").addClass("prev_midia").addClass("adicionar");
        var h = $("<a id='addImagemDigaLa'>Adicionar</a>").addClass("btn_acao").addClass("opcao_adicionar").attr("href", "javascript:void(0);");
        l.append(e.append(h))
    }
    if (f !== undefined && f != null && f.length > 0) {
        for (var g = 0; g < f.length; g++) {
            var j = f[g].diretorio;
            var c = f[g].thumbnail + f[g].extensao;
            var k = $("<div />").addClass("prev_midia").attr("data-idarquivo", f[g].idArquivo);
            var d = $("<a>Remover</a>").addClass("btn_acao").addClass("opcao_excluir").attr("onclick", "removeImagemDigaLa(this)").attr("href", "javascript:void(0);");
            var b = $("<div />").addClass("bloco_img").css("background-image", "url(" + j + "/" + c + ")");
            k.append(d).append(b);
            if (l.find(".prev_midia:first").hasClass("adicionar")) {
                l.prepend(k)
            } else {
                l.find(".prev_midia").not(".adicionar").last().after(k)
            }
        }
        bloqueiaOutrosDigaLa(true);
        $("#previewImagemDigaLa").show()
    }
}

function removeImagemDigaLa(b) {
    var d = b.closest(".prev_midia");
    var e = parseInt(d.dataset.idarquivo);
    if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
        for (var c = 0; c < objetoImagens.imagens.length; c++) {
            if (objetoImagens.imagens[c].idArquivo == e) {
                objetoImagens.imagens.splice(c, 1);
                d.remove();
                break
            }
        }
    }
    if (objetoImagens === undefined || objetoImagens == null || objetoImagens.imagens.length == 0) {
        if ($.trim($("#txtInput").val()) == "" || $.trim($("#txtInput").val()).toLowerCase() == "olá! compartilhe aqui a sua ideia ou link...") {
            $("#compartilhar").addClass("disable").prop("disabled", true);
            $("#previewImagemDigaLa").hide();
            $("#compartilhar").hide();
            $("#btnCancelarFerramentaMural").hide();
            $("#seletorMuralDigaLa").hide();
            $("#dialogo_acoes").hide()
        } else {
            $("#previewImagemDigaLa").hide()
        }
        bloqueiaOutrosDigaLa()
    }
}

function removeArquivoDigaLa(d) {
    var c = d.closest(".prev_midia");
    var e = parseInt(c.dataset.idarquivo);
    if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
        for (var b = 0; b < objetoArquivos.arquivos.length; b++) {
            if (objetoArquivos.arquivos[b].idArquivo == e) {
                objetoArquivos.arquivos.splice(b, 1);
                c.remove();
                break
            }
        }
    }
    if (objetoArquivos === undefined || objetoArquivos == null || objetoArquivos.arquivos.length == 0) {
        if ($.trim($("#txtInput").val()) == "" || $.trim($("#txtInput").val()).toLowerCase() == "olá! compartilhe aqui a sua ideia ou link...") {
            $("#compartilhar").addClass("disable").prop("disabled", true);
            $("#previewArquivosDigaLa").hide();
            $("#compartilhar").hide();
            $("#btnCancelarFerramentaMural").hide();
            $("#seletorMuralDigaLa").hide();
            $("#dialogo_acoes").hide()
        } else {
            $("#previewArquivosDigaLa").hide()
        }
        bloqueiaOutrosDigaLa()
    }
}

function preparaImagensDigaLa(d) {
    var f = [];
    var g = false;
    if (objetoImagens.imagens != null) {
        for (var c in objetoImagens.imagens) {
            g = false;
            for (var e in d.arrayArquivo) {
                if (d.arrayArquivo[e].id == objetoImagens.imagens[c].idArquivo) {
                    g = true;
                    f.push(objetoImagens.imagens[c])
                }
            }
            if (!g) {
                $("#previewImagemDigaLa").each(function() {
                    if ($(this).data("idarquivo") == objetoImagens.imagens[c].idArquivo) {
                        $(this).remove();
                        return false
                    }
                })
            }
        }
    }
    objetoImagens.imagens = f;
    f = [];
    for (var e = 0; e < d.arrayArquivo.length; e++) {
        g = false;
        for (var c in objetoImagens.imagens) {
            if (objetoImagens.imagens[c].idArquivo == d.arrayArquivo[e].id) {
                g = true;
                break
            }
        }
        if (!g) {
            var b = {
                bolPaisagem: d.arrayArquivo[e].bolPaisagem,
                bolRetrato: d.arrayArquivo[e].bolRetrato,
                idArquivo: d.arrayArquivo[e].id,
                thumbnail: d.arrayArquivo[e].strThumbnail,
                arquivo: d.arrayArquivo[e].strArquivo,
                nome: d.arrayArquivo[e].strNome,
                descricao: d.arrayArquivo[e].strDescricao,
                diretorio: d.arrayArquivo[e].strDiretorio,
                extensao: d.arrayArquivo[e].strExtensao,
                altura: d.arrayArquivo[e].intAlturaImg,
                largura: d.arrayArquivo[e].intLarguraImg
            };
            objetoImagens.imagens.push(b);
            f.push(b)
        }
    }
    objetoImagens.imagens.sort(function(i, h) {
        if (h.largura > i.largura) {
            return 1
        }
        return 0
    });
    objetoImagens.imagens.sort(function(i, h) {
        if (i.largura == h.largura) {
            if (h.altura < i.altura) {
                return 1
            }
            return -1
        }
        return 0
    });
    if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
        if (!$("#compartilhar").is(":visible")) {
            $("#compartilhar").show()
        }
        if (!$("#btnCancelarFerramentaMural").is(":visible")) {
            $("#btnCancelarFerramentaMural").show()
        }
        if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
            $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false)
        }
        if ($("#compartilhar").hasClass("disable")) {
            $("#compartilhar").removeClass("disable").prop("disabled", false)
        }
        $("#seletorMuralDigaLa").show();
        $("#dialogo_acoes").show();
        preparaAvaSelector();
        $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable")
    } else {
        $("#compartilhar").addClass("disable").prop("disabled", true)
    }
    if (f !== undefined && f != null && f.length > 0) {
        if (!$("#previewImagemDigaLa").is(":visible")) {
            $("#previewImagemDigaLa").show()
        }
        preparaVisualizacaoImagensDigaLa(f);
        if (_projeto == "grupo") {
            $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide()
        } else {
            $(".mensagem_multimidia").hide()
        }
    }
    f.splice(0, f.length);
    f = null
}

function preparaArquivosDigaLa(k) {
    var f = [];
    var e = false;
    if (objetoArquivos.arquivos != null) {
        for (var c in objetoArquivos.arquivos) {
            e = false;
            for (var d in k.arrayArquivo) {
                if (k.arrayArquivo[d].id == objetoArquivos.arquivos[c].idArquivo) {
                    e = true;
                    f.push(objetoArquivos.arquivos[c])
                }
            }
            if (!e) {
                $("#previewArquivosDigaLa").each(function() {
                    if ($(this).parent().data("idarquivo") == objetoArquivos.arquivos[c].idArquivo) {
                        $(this).parent().remove();
                        return false
                    }
                })
            }
        }
    }
    objetoArquivos.arquivos = f;
    f = [];
    for (var d = 0; d < k.arrayArquivo.length; d++) {
        e = false;
        if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
            for (var c in objetoArquivos.arquivos) {
                if (objetoArquivos.arquivos[c].idArquivo == k.arrayArquivo[d].id) {
                    e = true;
                    break
                }
            }
        }
        if (!e) {
            var g = {
                idArquivo: k.arrayArquivo[d].id,
                arquivo: k.arrayArquivo[d].strArquivo,
                nome: k.arrayArquivo[d].strNome,
                descricao: k.arrayArquivo[d].strDescricao,
                diretorio: k.arrayArquivo[d].strDiretorio,
                extensao: k.arrayArquivo[d].strExtensao
            };
            if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                var l = objetoArquivos.arquivos.length;
                var h = true;
                for (var b = 0; b < l; b++) {
                    if (objetoArquivos.arquivos[b].idArquivo == g.idArquivo) {
                        h = false;
                        break
                    }
                }
                if (h) {
                    objetoArquivos.arquivos.push(g);
                    f.push(g)
                }
            } else {
                objetoArquivos.arquivos.push(g);
                f.push(g)
            }
        }
    }
    if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
        $("#compartilhar").show();
        $("#btnCancelarFerramentaMural").show();
        if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
            $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false)
        }
        if ($("#compartilhar").hasClass("disable")) {
            $("#compartilhar").removeClass("disable").prop("disabled", false)
        }
        $("#seletorMuralDigaLa").show();
        $("#previewArquivosDigaLa").show();
        $("#dialogo_acoes").show();
        preparaAvaSelector();
        $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable")
    } else {
        $("#compartilhar").addClass("disable").prop("disabled", true)
    }
    if (f !== undefined && f != null && f.length > 0) {
        $("#previewArquivosDigaLa").show();
        $("#dialogo_acoes").show();
        preparaVisualizacaoArquivosDigaLa(f);
        if (_projeto == "grupo") {
            $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide()
        } else {
            $(".mensagem_multimidia").hide()
        }
    }
    f.splice(0, f.length);
    f = null
}

function removerPreviewVideoDigaLa() {
    $("#container_preview_video").fadeOut("slow", function() {
        $(this).find("iframe").attr("src", "");
        setTimeout(function() {
            $(this).find("iframe").remove();
            $(this).html("")
        }, 200);
        $("#txtLinkVideoMensagem").val("");
        var b = "Olá! Compartilhe aqui a sua ideia ou link...";
        var c = $("#txtInput").val();
        if ($.trim($("#txtInput").val()) == "" || $.trim($("#txtInput").val()).toLowerCase() == "olá! compartilhe aqui a sua ideia ou link...") {
            $("#compartilhar").addClass("disable").prop("disabled", true);
            $("#container_preview_video").hide();
            $("#compartilhar").hide();
            $("#btnCancelarFerramentaMural").hide();
            $("#seletorMuralDigaLa").hide();
            $("#dialogo_acoes").hide()
        } else {
            $("#container_preview_video").hide()
        }
    })
}

function bloqueiaOutrosDigaLa(b) {
    if (b) {
        $("#multimidia_video").hide();
        $("#multimidia_imagens").hide();
        $("#multimidia_documentos").hide()
    } else {
        $("#multimidia_video").show();
        $("#multimidia_imagens").show();
        $("#multimidia_documentos").show()
    }
};