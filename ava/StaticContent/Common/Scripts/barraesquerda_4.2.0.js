var idUsuarioPraCachear = idUsuarioPublico;
var idUsuarioSeguidorCacheado = 0;
var strLinkGrupo = idUsuarioPublico;
var temporizadorBuscaParticipante = "";
var xmlGlobalEscolaTurmas = null;
var xmlGlobalFiltroTurmas = null;
var arrayArquivosUpload;
var arrayArquivosUploadExclusao;
var arrArquivosTeste;
var GlobalPaginacaoModalInicio = 1;
var GlobalPaginacaoModalFim = 12;
var GlobalPaginacaoContador = 0;
var idLoadedGlobal = false;
var GlobalResultsBuscaPessoas = null;
var GlobalTotalResultsBuscaPessoas = 0;
var xmlGlobalPaginado = null;
var idNovoAssunto = -1;
var auxAssuntos = new Object();
auxAssuntos.Adicionar = new Array();
auxAssuntos.Editar = new Array();
auxAssuntos.Remover = new Array();
auxAssuntos.Mover = new Array();
//TODO:::
var objetoImagens = new Array();
var objAssuntoCadastrado = {
    id: 0,
    strAssunto: ""
};
var timeoutMensagemAssunto = null;
var jsonAlunosGrupoTurma = false;
var objConfiguracoes = new Object();
var bolAtualizarMuralDepoisDeAssuntos = false;
var idArquivoFoto = 0;
var modalEditarImagem;
var tpClick = "click";
$(function() {
    $("body").on("click", "input:radio[name=cbParticipante]", function(c) {
        var a = $(this).val();
        var b = $("#strParticipante").val();
        acoesListaParticipante(b, a)
    });
    $("body").on("keyup", "#strParticipante", function(a) {
        if (temporizadorBuscaParticipante != null && temporizadorBuscaParticipante != "" && temporizadorBuscaParticipante !== undefined) {
            clearTimeout(temporizadorBuscaParticipante)
        }
        $("#boxListaParticipantes").empty().html("<img border='0' src='/AVA/StaticContent/Common/img/perfil/carregando.gif'>");
        var b = $(this).val();
        temporizadorBuscaParticipante = setTimeout(function() {
            var c = $("input:radio[name=cbParticipante]:checked").val();
            var d = b;
            if (c == undefined) {
                c = "1,2,3"
            }
            acoesListaParticipante(d, c)
        }, 500)
    })
});

function fncActionsPerfilAbandonado() {
    var a = $("#idArquivoAux").val();
    if (a > 0) {
        $.ajax({
            type: "POST",
            url: "/AVA/Mural/Home/CorrigirEdicaoPerfilAbandonado",
            data: "idArquivo=" + a,
            async: true,
            success: function(b) {},
            error: function(b) {}
        })
    }
}

function fncActionsPerfilP() {
    $("#frmPerfil").find("h2").css({
        position: "absolute",
        top: 0
    });
    $(".mp_edt_perfil span").click(function() {
        enviarfotoP($("#strPastaDestino").val(), $("#strNomeFoto").val())
    }).css("cursor", "pointer");
    $("#txtSobreMim").keyup(function() {
        var a = $("#txtSobreMim").val().length;
        if (a > 300) {
            $("#txtSobreMim").val($("#txtSobreMim").val().substring(0, 300))
        }
    });
    $("#salvar_perfil").unbind("click");
    if ($("#strApelido").val() != $("#novo_apelido").val() && $("#novo_apelido").val() != "") {
        $("#strApelido").val($("#novo_apelido").val())
    }
    if ($("#txtSobreMim").val() != $("#novo_sobremim").val() && $("#novo_sobremim").val() != "") {
        $("#txtSobreMim").val($("#novo_sobremim").val())
    }
    $("#nova_foto").val($("#strFotoAtual").val())
}

function salvarPerfilPublicoEditarPerfil(m, g, n, a, l, v, b, z) {
    console.log("idLoginPerfil === "+$("#idLoginPerfil").val())
    var j = $("#idLoginPerfil").val();
    var e = g;
    var i = m;
    var q = n;
    var c = a;
    var s = l;
    var u = v;
    var d = b;
    var p = z;
    var f = 0;
    if (e.length > 22) {
        var k = e.split(" ");
        $.each(k, function(B, A) {
            if (A.length > 22) {
                f += 1
            }
        })
    }
    if (f > 0) {
        alert("Seu apelido esta muito longo. Por favor verifique");
        return false
    }
    if (e == "" || e.length >= 2) {
        $.ajax({
            url: "/AVA/Mural/Home/SalvarPerfilPublico",
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                ts: new Date().getTime(),
                idUsuarioRequest: j + "",
                idPerfil: i + "",
                strApelido: e + "",
                strEmail: c + "",
                strTexto: s + "",
                strFoto: q + "",
                charSexo: u + "",
                strSeries: d + "",
                idArquivoAux: p
            },
            success: function(C) {
                var B = j;
                if (C.indexOf("[:|:]") > 0) {
                    B = C.split("[:|:]")[1];
                    C = C.split("[:|:]")[0]
                }
                if ($("#nova_foto").val() != "") {
                    $("#frmPerfil img").attr("src", $("#nova_foto").val());
                    $("#strFoto").val($("#nova_foto").val())
                }
                if (s != "") {
                    $("#texto_sobre_mim").hide().html("<strong>Sobre mim</strong><br>" + s).fadeIn()
                } else {
                    $("#texto_sobre_mim").hide().html("").fadeIn()
                }
                if ($("#strApelido").val() != "") {
                    $("#meu_nome_rs").text(e);
                    if (j == B) {
                        $("#nameUser").text(e)
                    }
                    $("#dadosPerfil").find("h1").text(e)
                } else {
                    $("#meu_nome_rs").text($("#strNomeInicial").val());
                    if (j == B) {
                        $("#nameUser").text($("#strNomeInicial").val())
                    }
                    $("#dadosPerfil").find("h1").text($("#strNomeInicial").val())
                }
                $.fancybox.close();
                if (j == B) {
                    $("#ava_user img").attr("src", q.substring(0, q.lastIndexOf("/")) + "/minithumb" + q.substring(q.lastIndexOf("/"))).hide().fadeIn()
                }
                $("a[href*='Perfil/Home/Index/" + j + "'] img").attr("src", q.substring(0, q.lastIndexOf("/")) + "/minithumb" + q.substring(q.lastIndexOf("/"))).hide().fadeIn();
                $("#dadosPerfil").find("img").attr("src", q).hide().fadeIn();
                $("#textoMinhaInfo").text(s);
                $.jStorage.flush();
                $.ajax({
                    type: "POST",
                    url: "/AVA/Barras/Home/RemoveCacheDadosUsuario",
                    data: "idUsuario=" + j,
                    async: true,
                    success: function(D) {},
                    error: function(D) {}
                });
                $.ajax({
                    type: "POST",
                    url: "/AVA/Barras/Home/LimparCacheBarras",
                    data: "idUsuarioPerfil=" + j,
                    async: true,
                    success: function(D) {},
                    error: function(D) {}
                });
                $.ajax({
                    type: "POST",
                    url: "/AVA/Perfil/Home/RemoveCacheDadosUsuario",
                    data: "idUsuario=" + j,
                    async: true,
                    success: function(D) {},
                    error: function(D) {}
                });
                var A = q.split("/");
                A = A[A.length - 1];
                A = A.split(".");
                A = A[0]
            }
        })
    } else {
        alert("Digite 2 ou mais caracteres para o apelido")
    }
}

function enviarfotoP(a, b) {
    UploadUmArquivo("strFoto", "frmPerfil", a, b, "gif,bmp,jpg,jpeg,png", "mudaP")
}

function mudaP() {
    var a = $("#strFoto").val();
    $("#novo_apelido").val($("#strApelido").val());
    $("#novo_sobremim").val($("#txtSobreMim").val());
    fncActionsCrop = function() {
        var b = new Image();
        b.onload = function() {
            $(".fancybox-image").Jcrop({
                onSelect: "showCoords",
                bgColor: "#0099CC",
                bgOpacity: 0.8,
                aspectRatio: 13 / 13,
                onSelect: showCoords,
                trueSize: [b.width, b.height],
                setSelect: [400, 400, 50, 50]
            });
            $("#meu_recorte").click(function() {
                recortaP(a)
            });
            $("#meu_cancela").click(function() {
                parent.$.fancybox.close()
            })
        };
        b.src = a
    };
    $("#ava_editar_perfil_usuario").attr("href", a);
    $("#ava_editar_perfil_usuario").fancybox({
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
        afterShow: fncActionsCrop,
        beforeShow: function() {
            this.title += '<div id="meu_cancela" class="botao_jcrop botao_jcrop_cancelar">cancelar</div><div id="meu_recorte" class="botao_jcrop botao_jcrop_recortar">recortar</div>'
        },
        beforeClose: function() {
            $("#meu_cancela").remove();
            $("#meu_recorte").remove()
        },
        helpers: {
            overlay: {
                locked: false
            },
            title: {
                type: "inside"
            }
        },
        title: ""
    });
    $("#ava_editar_perfil_usuario").trigger("click")
}
x = 0;
y = 0;
w = 0;
h = 0;

function showCoords(a) {
    x = a.x;
    y = a.y;
    w = a.w;
    h = a.h
}

function recortaP(a) {
    if (w == "" || w < 1 || h == "" || h < 1) {
        alert("Selecione uma ï¿½rea da imagem para recorte.");
        return false
    }
    $(".botao_jcrop").remove();
    $.post("/rede/recorte.asp", {
        strFoto: a,
        x: x,
        y: y,
        w: w,
        h: h,
        crop: 1,
        ts: new Date().getTime()
    }, function(c) {
        t = $("#ava_editar_perfil_usuario");
        o = {
            autoSize: false,
            width: 600,
            height: 300,
            autoResize: false,
            fitToView: false,
            afterShow: fncActionsPerfilP,
            beforeClose: fncActionsPerfilAbandonado,
            ajax: {
                type: "POST",
                data: {
                    ts: new Date().getTime()
                }
            },
            type: "ajax",
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };
        var b = $("#strLoginPerfil").val();
        t.attr("href", "/AVA/Mural/Home/BuscarPerfilPublico/" + b);
        $("#nova_foto").val(c);
        lightBoxAVA(t, o);
        t.click()
    })
}

function cancelaCropP(a) {
    $(".botao_jcrop").remove();
    $.post("/rede/recorte.asp", {
        strFoto: a,
        x: x,
        y: y,
        w: w,
        h: h,
        crop: 1,
        ts: new Date().getTime()
    }, function(c) {
        t = $("#ava_editar_perfil_usuario");
        o = {
            autoSize: false,
            width: 600,
            height: 300,
            autoResize: false,
            fitToView: false,
            afterShow: fncActionsPerfilP,
            beforeClose: fncActionsPerfilAbandonado,
            ajax: {
                type: "POST",
                data: {
                    ts: new Date().getTime()
                }
            },
            type: "ajax",
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };
        var b = $("#strLoginPerfil").val();
        t.attr("href", "/AVA/Mural/Home/BuscarPerfilPublico/" + b);
        $("#nova_foto").val(c);
        lightBoxAVA(t, o);
        t.click()
    })
}

function AlteraFotoPerfil(idSelecionado) {

    console.log('Alterar '+idSelecionado);

    // if ($("#frmPerfil .altera_foto").is(":visible")) {


    $( "#previewUpload" ).dialog({

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
        close: function(event, ui){
            location.reload();
        }       

    });

        console.log('Entrou aqui');
        
        var a = 31;
        var g = {
            idFerramenta: 0,
            idFerramentaTipo: a,
            idVisitado:idSelecionado
        };
        var f;
        try {
            f = document.createElement("<form name='upload'>")
        } catch (e) {
            f = document.createElement("form");
            f.name = "upload"
        }
        for (var d in g) {
            if (g.hasOwnProperty(d)) {
                var b = document.createElement("input");
                b.type = "hidden";
                b.name = d;
                b.value = g[d];
                f.appendChild(b)
            }
        }
        f.target = "UploadFoto";
        f.method = "POST";
        f.action = "/AVA/Upload";
        
        document.body.appendChild(f);

        // var c = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        // if (Modernizr.touch) {
        //     c = null
        // }

        // modalEditarImagem = window.open("", "UploadFoto", c);
        
        // if (modalEditarImagem) {
        //     f.submit();
        // }
        // modalEditarImagem.blur();
        // modalEditarImagem.focus()

        var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
           if (Modernizr.touch) {
               parametros = null;
           }
           $("#previewUpload iframe").append(f);        
           f.submit();        
           $("#previewUpload").dialog("open");        
           $.fancybox.hideLoading();

    // }
}

function CallbackCancelarUpload() {
    // removerClasseAtivo()
    $( "#previewArquivosDigaLa" ).dialog('close');

}




function CallbackUpload(p) {
    
    var objetoArquivos = {
        arquivos: []
    };

    var E = p.idFerramenta;//5319
    var B = parseInt(p.idFerramentaTipo);//37
    var A = p.arrayArquivo[0].id;//1109884
    var C = p.arrayArquivo[0].strDiretorio + "/" + p.arrayArquivo[0].strArquivo + p.arrayArquivo[0].strExtensao;
    if (B == 35) {
        var d = document.location.href.toLowerCase();
        var F = d.indexOf("/ava/mural");
        if (F > 0) {
            preparaImagensDigaLa(p)
        } else {
            var f = [];
            var m = false;
            if (objetoImagens.imagens != null) {
                for (var v in objetoImagens.imagens) {
                    m = false;
                    for (var z in p.arrayArquivo) {
                        if (p.arrayArquivo[z].id == objetoImagens.imagens[v].idArquivo) {
                            m = true;
                            f.push(objetoImagens.imagens[v])
                        }
                    }
                    if (!m) {
                        $(".dialogo_box .preview_post.imagens .prev_imagem").each(function() {
                            if ($(this).data("idarquivo") == objetoImagens.imagens[v].idArquivo) {
                                $(this).remove();
                                return false
                            }
                        })
                    }
                }
                $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update")
            }
            objetoImagens.imagens = f;
            f = [];
            for (var z = 0; z < p.arrayArquivo.length; z++) {
                m = false;
                for (var v in objetoImagens.imagens) {
                    if (objetoImagens.imagens[v].idArquivo == p.arrayArquivo[z].id) {
                        m = true;
                        break
                    }
                }
                if (!m) {
                    var b = {
                        bolPaisagem: p.arrayArquivo[z].bolPaisagem,
                        bolRetrato: p.arrayArquivo[z].bolRetrato,
                        idArquivo: p.arrayArquivo[z].id,
                        thumbnail: p.arrayArquivo[z].strThumbnail,
                        arquivo: p.arrayArquivo[z].strArquivo,
                        nome: p.arrayArquivo[z].strNome,
                        descricao: p.arrayArquivo[z].strDescricao,
                        diretorio: p.arrayArquivo[z].strDiretorio,
                        extensao: p.arrayArquivo[z].strExtensao,
                        altura: p.arrayArquivo[z].intAlturaImg,
                        largura: p.arrayArquivo[z].intLarguraImg
                    };
                    objetoImagens.imagens.push(b);
                    f.push(b)
                }
            }
            objetoImagens.imagens.sort(function(j, i) {
                if (i.largura > j.largura) {
                    return 1
                }
                return 0
            });
            objetoImagens.imagens.sort(function(j, i) {
                if (j.largura == i.largura) {
                    if (i.altura < j.altura) {
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
                    $("#btnCancelarFerramentaMural").show();
                    $("#btnCancelarFerramentaMural").closest(".sep_digala").show()
                }
                if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
                    $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false)
                }
                if ($("#compartilhar").hasClass("disable")) {
                    $("#compartilhar").removeClass("disable").prop("disabled", false)
                }
                if (!$("#seletorMuralDigaLa").is(":visible")) {
                    $("#seletorMuralDigaLa").show();
                    $(".sep_digala").show()
                }
                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                var k = location.href.toLowerCase();
                if (k.indexOf("perfil/home/index") == -1) {
                    preparaAvaSelector()
                } else {
                    $("#compartilhar").unbind("click", validaMensagemRapida).one("click", validaMensagemRapida)
                }
            } else {
                $("#compartilhar").addClass("disable").prop("disabled", true)
            }
            if (f !== undefined && f != null && f.length > 0) {
                if (!$(".dialogo .dialogo_box .preview_post.imagens").is(":visible")) {
                    $(".dialogo .dialogo_box .preview_post.imagens").show()
                }
                montaPreviewImagemMensagemRapida(f);
                if (_projeto == "grupo") {
                    $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide()
                } else {
                    $(".mensagem_multimidia").hide()
                }
            }
            f.splice(0, f.length);
            f = null
        }
    } else {
        if (B == 15) {
            var d = document.location.href.toLowerCase();
            var F = d.indexOf("/ava/mural");
            if (F > 0) {
                preparaArquivosParaTarefaRapida(p)
            } else {
                $("#boxMaterialApoioTarefa").remove();
                $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_mapoio" id="boxMaterialApoioTarefa"><img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0"/></div>');
                if (arrayArquivosUpload == undefined) {
                    arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(p))
                } else {
                    var e = false;
                    var g = [];
                    if (arrayArquivosUpload.arrayArquivo.length > 0) {
                        for (var D in arrayArquivosUpload.arrayArquivo) {
                            e = false;
                            for (var a in p.arrayArquivo) {
                                if (p.arrayArquivo[a].id == arrayArquivosUpload.arrayArquivo[D].id) {
                                    e = true;
                                    break
                                }
                            }
                            if (!e) {
                                $("#boxMaterialApoioTarefa .the_insertedLink .exclui_arquivo[idarquivo=" + arrayArquivosUpload.arrayArquivo[D].id + "]").parent().remove()
                            } else {
                                g.push(arrayArquivosUpload.arrayArquivo[D])
                            }
                        }
                        arrayArquivosUpload.arrayArquivo = g;
                        g = []
                    }
                    for (var z = 0; z < p.arrayArquivo.length; z++) {
                        e = false;
                        for (var D in arrayArquivosUpload.arrayArquivo) {
                            if (arrayArquivosUpload.arrayArquivo[D].id == p.arrayArquivo[z].id) {
                                e = true;
                                break
                            }
                        }
                        if (!e) {
                            arrayArquivosUpload.arrayArquivo.push(p.arrayArquivo[z])
                        }
                    }
                }
                for (var z = 0; arrayArquivosUpload.arrayArquivo[z]; z++) {
                    strRetornoHtmlUpload += '<div class="the_insertedLink"><a href="' + arrayArquivosUpload.arrayArquivo[z].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[z].strArquivo + arrayArquivosUpload.arrayArquivo[z].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[z].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" idArquivo="' + arrayArquivosUpload.arrayArquivo[z].id + '"><strong>x</strong></a></div>'
                }
                $("#boxMaterialApoioTarefa").remove();
                $("#container_empilhaextras").prepend('<div class="atividades_insert inserir_link" id="boxMaterialApoioTarefa"><div class="container_inlinks"><h5>Material de apoio</h5>' + strRetornoHtmlUpload + "</div></div>");
                arrayArquivosUpload = jQuery.parseJSON(JSON.stringify(arrayArquivosUpload));
                $(".exclui_arquivo").click(function() {
                    var G = $(this).attr("idArquivo");
                    for (var j = 0; j < arrayArquivosUpload.arrayArquivo.length; j++) {
                        if (arrayArquivosUpload.arrayArquivo[j].id == parseInt(G)) {
                            arrayArquivosUpload.arrayArquivo.splice(j, 1);
                            break
                        }
                    }
                    $(this).parent().remove();
                    if (arrayArquivosUpload.arrayArquivo.length == 0) {
                        $("#boxMaterialApoioTarefa").remove()
                    } else {
                        for (var j = 0; arrayArquivosUpload.arrayArquivo[j]; j++) {
                            strRetornoHtmlUpload += '<div class="the_insertedLink"><a href="' + arrayArquivosUpload.arrayArquivo[j].strDiretorio + "/" + arrayArquivosUpload.arrayArquivo[j].strArquivo + arrayArquivosUpload.arrayArquivo[j].strExtensao + '" class="umlink" target="_blank"><span class="umarquivo"></span>' + arrayArquivosUpload.arrayArquivo[j].strArquivo + '</a><a href="javascript:void(0);" class="bt_normal exclui_arquivo" posArrayArquivo="' + j + '"><strong>x</strong></a></div>'
                        }
                    }
                    strRetornoHtmlUpload = ""
                });
                strRetornoHtmlUpload = ""
            }
        } else {
            if (B == 36) {
                var f = [];
                var m = false;
                if (objetoImagens.imagens != null) {
                    for (var v in objetoImagens.imagens) {
                        m = false;
                        for (var z in p.arrayArquivo) {
                            if (p.arrayArquivo[z].id == objetoImagens.imagens[v].idArquivo) {
                                m = true;
                                f.push(objetoImagens.imagens[v])
                            }
                        }
                        if (!m) {
                            $(".dialogo_box .preview_post.imagens .prev_imagem").each(function() {
                                if ($(this).data("idarquivo") == objetoImagens.imagens[v].idArquivo) {
                                    $(this).remove();
                                    return false
                                }
                            })
                        }
                    }
                    $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update")
                }
                objetoImagens.imagens = f;
                f = [];
                for (var z = 0; z < p.arrayArquivo.length; z++) {
                    m = false;
                    for (var v in objetoImagens.imagens) {
                        if (objetoImagens.imagens[v].idArquivo == p.arrayArquivo[z].id) {
                            m = true;
                            break
                        }
                    }
                    if (!m) {
                        var b = {
                            bolPaisagem: p.arrayArquivo[z].bolPaisagem,
                            bolRetrato: p.arrayArquivo[z].bolRetrato,
                            idArquivo: p.arrayArquivo[z].id,
                            thumbnail: p.arrayArquivo[z].strThumbnail,
                            arquivo: p.arrayArquivo[z].strArquivo,
                            nome: p.arrayArquivo[z].strNome,
                            descricao: p.arrayArquivo[z].strDescricao,
                            diretorio: p.arrayArquivo[z].strDiretorio,
                            extensao: p.arrayArquivo[z].strExtensao,
                            altura: p.arrayArquivo[z].intAlturaImg,
                            largura: p.arrayArquivo[z].intLarguraImg
                        };
                        objetoImagens.imagens.push(b);
                        f.push(b)
                    }
                }
                objetoImagens.imagens.sort(function(j, i) {
                    if (i.largura > j.largura) {
                        return 1
                    }
                    return 0
                });
                objetoImagens.imagens.sort(function(j, i) {
                    if (j.largura == i.largura) {
                        if (i.altura < j.altura) {
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
                        $("#btnCancelarFerramentaMural").show();
                        $("#btnCancelarFerramentaMural").closest(".sep_digala").show()
                    }
                    if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
                        $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false)
                    }
                    if ($("#compartilhar").hasClass("disable")) {
                        $("#compartilhar").removeClass("disable").prop("disabled", false)
                    }
                    if (!$("#seletorMuralDigaLa").is(":visible")) {
                        $("#seletorMuralDigaLa").show();
                        $(".sep_digala").show()
                    }
                    $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable")
                } else {
                    $("#compartilhar").addClass("disable").prop("disabled", true)
                }
                if (f !== undefined && f != null && f.length > 0) {
                    if (!$(".dialogo .dialogo_box .preview_post.imagens").is(":visible")) {
                        $(".dialogo .dialogo_box .preview_post.imagens").show()
                    }
                    montaPreviewImagemMensagemRapida(f);
                    if (_projeto == "grupo") {
                        $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide()
                    } else {
                        $(".mensagem_multimidia").hide()
                    }
                }
                f.splice(0, f.length);
                f = null
            } else {
                if (B == 32) {
                    $.ajax({
                        url: "/AVA/Grupo/Home/SalvaFotoGrupo",
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: {
                            idGrupo: E,
                            idArquivo: A,
                            srcImagem: C
                        },
                        success: function(i) {
                            if (i == "erro" || i == 0) {
                                jAlert("Erro ao salvar foto do grupo.", "")
                            } else {
                                $(".foto_grupo img").attr("src", i)
                            }
                        },
                        error: function(i) {
                            jAlert("Erro ao editar o grupo.", "")
                        }
                    })
                } else {
                    if (B == 37) {
                        // alert('Entrou aqui');
                        var d = document.location.href.toLowerCase();
                        var F = d.indexOf("/ava/mural");
                        if (F > 0) {
                            preparaArquivosDigaLa(p)
                        } else {
                            var g = [];
                            var m = false;
                            // if (objetoArquivos.arquivos != null) {
                            //     for (var v in objetoArquivos.arquivos) {
                            //         m = false;
                            //         for (var z in p.arrayArquivo) {
                            //             if (p.arrayArquivo[z].id == objetoArquivos.arquivos[v].idArquivo) {
                            //                 m = true;
                            //                 g.push(objetoArquivos.arquivos[v])
                            //             }
                            //         }
                            //         if (!m) {
                            //             $(".dialogo_box .preview_post.arquivos .prev_documento").each(function() {
                            //                 if ($(this).parent().data("idarquivo") == objetoArquivos.arquivos[v].idArquivo) {
                            //                     $(this).parent().remove();
                            //                     return false
                            //                 }
                            //             })
                            //         }
                            //     }
                            //     $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update")
                            // }
                            // alert('Aqui');
                            objetoArquivos.arquivos = g;
                            g = [];
                            for (var z = 0; z < p.arrayArquivo.length; z++) {
                                m = false;
                                if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                                    for (var v in objetoArquivos.arquivos) {
                                        if (objetoArquivos.arquivos[v].idArquivo == p.arrayArquivo[z].id) {
                                            m = true;
                                            break
                                        }
                                    }
                                }
                                if (!m) {
                                    var l = {
                                        idArquivo: p.arrayArquivo[z].id,
                                        arquivo: p.arrayArquivo[z].strArquivo,
                                        nome: p.arrayArquivo[z].strNome,
                                        descricao: p.arrayArquivo[z].strDescricao,
                                        diretorio: p.arrayArquivo[z].strDiretorio,
                                        extensao: p.arrayArquivo[z].strExtensao
                                    };
                                    if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                                        var n = objetoArquivos.arquivos.length;
                                        var q = true;
                                        for (var s = 0; s < n; s++) {
                                            if (objetoArquivos.arquivos[s].idArquivo == l.idArquivo) {
                                                q = false;
                                                break
                                            }
                                        }
                                        if (q) {
                                            objetoArquivos.arquivos.push(l);
                                            g.push(l)
                                        }
                                    } else {
                                        objetoArquivos.arquivos.push(l);
                                        g.push(l)
                                    }
                                }
                            }
                            if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
                                if (!$("#compartilhar").is(":visible")) {
                                    $("#compartilhar").show()
                                }
                                if (!$("#btnCancelarFerramentaMural").is(":visible")) {
                                    $("#btnCancelarFerramentaMural").show();
                                    $("#btnCancelarFerramentaMural").closest(".sep_digala").show()
                                }
                                if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
                                    $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false)
                                }
                                if ($("#compartilhar").hasClass("disable")) {
                                    $("#compartilhar").removeClass("disable").prop("disabled", false)
                                }
                                if (!$("#seletorMuralDigaLa").is(":visible")) {
                                    $("#seletorMuralDigaLa").show();
                                    $(".sep_digala").show()
                                }
                                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable");
                                var k = location.href.toLowerCase();
                                if (k.indexOf("perfil/home/index") == -1) {
                                    preparaAvaSelector()
                                } else {
                                    $("#compartilhar").unbind("click", validaMensagemRapida).one("click", validaMensagemRapida)
                                }
                            } else {
                                $("#compartilhar").addClass("disable").prop("disabled", true)
                            }
                            if (g !== undefined && g != null && g.length > 0) {
                                if (!$(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")) {
                                    $(".dialogo .dialogo_box .preview_post.arquivos").show()
                                }
                                montaPreviewFilesMensagemRapida(g);
                                if (_projeto == "grupo") {
                                    $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide()
                                } else {
                                    $(".mensagem_multimidia").hide()
                                }
                                // alert(' passou daqui');
                            }
                            g.splice(0, g.length);
                            g = null
                        }
                    } else {
                        if (B == 38) {
                            var g = [];
                            if ($(".dialogo_box .preview_post.arquivos .mCSB_container .mCSB_container").length) {
                                $(".dialogo_box .preview_post.arquivos .mCSB_container").mCustomScrollbar("destroy");
                                $(".dialogo_box .preview_post.arquivos").mCustomScrollbar("destroy");
                                $(".dialogo_box .preview_post.arquivos").attr("class", "preview_post content arquivos");
                                $(".dialogo_box .preview_post.arquivos").mCustomScrollbar()
                            }
                            var m = false;
                            if (objetoArquivos.arquivos != null) {
                                for (var v in objetoArquivos.arquivos) {
                                    m = false;
                                    for (var z in p.arrayArquivo) {
                                        if (p.arrayArquivo[z].id == objetoArquivos.arquivos[v].idArquivo) {
                                            m = true;
                                            g.push(objetoArquivos.arquivos[v])
                                        }
                                    }
                                    if (!m) {
                                        $(".dialogo_box .preview_post.arquivos .prev_documento").each(function() {
                                            if ($(this).parent().data("idarquivo") == objetoArquivos.arquivos[v].idArquivo) {
                                                $(this).parent().remove();
                                                return false
                                            }
                                        })
                                    }
                                }
                                $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update")
                            }
                            objetoArquivos.arquivos = g;
                            g = [];
                            for (var z = 0; z < p.arrayArquivo.length; z++) {
                                m = false;
                                if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                                    for (var v in objetoArquivos.arquivos) {
                                        if (objetoArquivos.arquivos[v].idArquivo == p.arrayArquivo[z].id) {
                                            m = true;
                                            break
                                        }
                                    }
                                }
                                if (!m) {
                                    var l = {
                                        idArquivo: p.arrayArquivo[z].id,
                                        arquivo: p.arrayArquivo[z].strArquivo,
                                        nome: p.arrayArquivo[z].strNome,
                                        descricao: p.arrayArquivo[z].strDescricao,
                                        diretorio: p.arrayArquivo[z].strDiretorio,
                                        extensao: p.arrayArquivo[z].strExtensao
                                    };
                                    if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                                        var n = objetoArquivos.arquivos.length;
                                        var q = true;
                                        for (var s = 0; s < n; s++) {
                                            if (objetoArquivos.arquivos[s].idArquivo == l.idArquivo) {
                                                q = false;
                                                break
                                            }
                                        }
                                        if (q) {
                                            objetoArquivos.arquivos.push(l);
                                            g.push(l)
                                        }
                                    } else {
                                        objetoArquivos.arquivos.push(l);
                                        g.push(l)
                                    }
                                }
                            }
                            if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
                                if (!$("#compartilhar").is(":visible")) {
                                    $("#compartilhar").show()
                                }
                                if (!$("#btnCancelarFerramentaMural").is(":visible")) {
                                    $("#btnCancelarFerramentaMural").show();
                                    $("#btnCancelarFerramentaMural").closest(".sep_digala").show()
                                }
                                if ($("#btnCancelarFerramentaMural").hasClass("disable")) {
                                    $("#btnCancelarFerramentaMural").removeClass("disable").prop("disabled", false)
                                }
                                if ($("#compartilhar").hasClass("disable")) {
                                    $("#compartilhar").removeClass("disable").prop("disabled", false)
                                }
                                if (!$("#seletorMuralDigaLa").is(":visible")) {
                                    $("#seletorMuralDigaLa").show();
                                    $(".sep_digala").show()
                                }
                                $("#btnCancelarFerramentaMural").prop("disabled", false).removeClass("disable")
                            } else {
                                $("#compartilhar").addClass("disable").prop("disabled", true)
                            }
                            if (g !== undefined && g != null && g.length > 0) {
                                if (!$(".dialogo .dialogo_box .preview_post.arquivos").is(":visible")) {
                                    $(".dialogo .dialogo_box .preview_post.arquivos").show()
                                }
                                montaPreviewFilesMensagemRapida(g);
                                if (_projeto == "grupo") {
                                    $(".mensagem_multimidia ul:not(#cbAssuntoPost)").hide()
                                } else {
                                    $(".mensagem_multimidia").hide()
                                }
                            }
                            g.splice(0, g.length);
                            g = null
                        } else {
                            var u = new Array();
                            u.push(A);
                            var c = {
                                idFerramentaTipo: B,
                                idFerramenta: E,
                                arquivos: u
                            };
                            $.ajax({
                                type: "POST",
                                async: false,
                                url: "/AVA/Upload/Home/SalvaArquivoFerramenta/",
                                data: {
                                    json: JSON.stringify(c)
                                },
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                success: function(i) {
                                    $("#nova_foto").val(C);
                                    if ($("#nova_foto").val() != "") {
                                        $("#frmPerfil img").attr("src", $("#nova_foto").val());
                                        $("#strFoto").val($("#nova_foto").val());
                                        if (A > 0) {
                                            $("#idArquivoAux").val(A)
                                        }
                                    }
                                },
                                error: function(i) {
                                    if (i.status != 0) {
                                        console.debug("erro ao salvar arquivo ferramenta!")
                                    }
                                }
                            })
                        }
                    }
                }
            }
        }
    }
    // alert('saiu na moral daqui');
}

function carregarDadosGrupo(a) {
    if (intTipoPerfil >= 0) {
        var b = "";
        if ($(location).attr("href").toLowerCase().indexOf("grupo/home/post") > 0) {
            b = $("#strIdLinkPermanente").val()
        } else {
            b = idUsuarioPublico
        }
        $.ajax({
            type: "POST",
            url: "/AVA/Grupo/Home/VerificaAcessoByLink/" + a,
            cache: false,
            success: function(c) {
                if (c == "True") {
                    $("#sMediadoresGrupo, #sParticipantesGrupo").css("display", "");
                    $.ajax({
                        url: "/ava/grupo/home/validarModerador",
                        data: {
                            link: b
                        },
                        dataType: "json",
                        success: function(e) {
                            var d = parseFloat(e.bolmoderador);
                            if (d) {
                                $("#sAssuntosGrupo").css("display", "")
                            }
                        }
                    });
                    $("#sMediadoresGrupo").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                    carregarMediadores(a);
                    $("#sParticipantesGrupo").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                    carregaParticipantes(a)
                }
            },
            error: function(c) {
                console.debug(c)
            }
        })
    } else {
        if (intTipoPerfil == -2) {
            $("#sLista_noticiasPortal").css("display", "none")
        }
    }
}
var intTipoPerfil = -1;
jQuery(function(e) {
    if (idUsuarioCript == 0) {
        var c = false;
        if (e.browser.webkit) {
            c = true
        }
        e.ajax({
            type: "POST",
            url: "/AVA/Login/Home/UsuarioCript",
            async: c,
            success: function(l) {
                idUsuarioCript = l
            },
            error: function(l) {
                if (l.status != 0) {
                    idUsuarioCript = 0
                }
            }
        })
    }
    if (idUsuarioPublico == "") {
        idUsuarioPraCachear = idUsuarioCript
    }
    if (_action.toLowerCase() == "post" && _projeto.toLowerCase() == "mural") {
        idUsuarioPublico = ""
    }
    if (idUsuarioPublico != "" && _projeto.toLowerCase() != "grupo" && _action.toLowerCase() != "jogos") {
        e.ajax({
            url: "/AVA/Perfil/Home/VerificaTipoPerfilUsuarioUsuario/",
            async: false,
            data: {
                strLogin: idUsuarioPublico
            },
            success: function(l) {
                intTipoPerfil = l;
                if (parseInt(intTipoPerfil) == -2) {
                    e("#sLista_noticiasPortal").hide()
                }
            },
            error: function(l) {
                intTipoPerfil = -1
            }
        })
    } else {
        intTipoPerfil = 1
    }
    e("#dadosPerfil").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    bolBlog = false;
    bolBlogCarregado = "";
    if (_action.toLowerCase() == "perfilgrupo" || (_action.toLowerCase() == "post" && _projeto.toLowerCase() == "grupo")) {
        if (_action.toLowerCase() == "post") {
            e.ajax({
                url: "/AVA/Grupo/Home/BuscaGrupoByIdMensagemRapida",
                async: true,
                data: {
                    idMensagemRapida: idUsuarioPublico
                },
                success: function(l) {
                    _url_perfil = "/AVA/Barras/Home/DadosPerfilGrupo/?id=" + l;
                    strLinkGrupo = l;
                    carregarDadosGrupo(strLinkGrupo)
                },
                error: function(l) {
                    alert("Erro ao buscar grupo para barra da esquerda")
                }
            })
        } else {
            _url_perfil = "/AVA/Barras/Home/DadosPerfilGrupo/?id=" + idUsuarioPublico
        }
        e("#dadosPerfil").hide()
    } else {

        console.log("_controller "+_controller);
        console.log("idUsuarioPublico "+idUsuarioPublico);
        console.log("intTipoPerfil "+ intTipoPerfil);
        console.log("_action "+_action);

        console.log('aqui');

        if (_controller == "Home" && idUsuarioPublico == "") {

            console.log('EDUC1');
            
            _url_perfil = "/AVA/Barras/Home/Mural/";

            if( _action == "Post"  ){
                console.log('Entrou aqui');
                _url_perfil = "/AVA/Barras/Home/MeuPerfil/";

            }
            else if(_action == "Index"){
                _url_perfil = "/AVA/Barras/Home/Mural/";

            }
            else{
                console.log('Entrou aqui preventDefault');
                _url_perfil = "/AVA/Barras/Home/Mural/";

            }



            bolBlog = true;
            carregarPerfilUrl(_url_perfil)
        } 
        
        else {


            if (_controller == "MeuPerfil") {
                console.log('EDUC2');
                _url_perfil = "/AVA/Barras/Home/MeuPerfil/";
                bolBlog = true;
                carregarPerfilUrl(_url_perfil)
            }

            if (_controller == "MeuPerfil") {
                console.log('EDUC2');
                _url_perfil = "/AVA/Barras/Home/MeuPerfil/";
                bolBlog = true;
                carregarPerfilUrl(_url_perfil)
            } 

           

            else {
                _url_perfil = "/AVA/Barras/Home/DadosPerfil?id=" + idUsuarioPublico + "&tipo=" + intTipoPerfil;
                console.log('EDUC3');
                bolBlog = true;
                carregarPerfilUrl(_url_perfil)
            }
        }
    }
    var k = e("#abrebuscapessoas");
    var b = {
        autoSize: false,
        width: 900,
        height: 530,
        type: "ajax",
        autoResize: false,
        fitToView: false,
        padding: 0,
        scrolling: "no",
        beforeShow: function() {
            e("html").css({
                overflow: "hidden"
            })
        },
        afterClose: function() {
            e("html").css({
                overflow: "scroll"
            })
        },
        afterShow: function() {
            e("#main_ava").hide();
            e("#ava_contentbuscapessoas #ava_loader").css("display", "none");
            e("#txtPesquisaGeralAva").live("focus", function() {
                if (e(this).val() == "Procurar por nome") {
                    e(this).val("")
                }
            });
            e("#txtPesquisaGeralAva").live("blur", function() {
                if (e(this).val() == "") {
                    e(this).val("Procurar por nome")
                }
            });
            e("#buscarpessoas").bind("click", function() {
                if (e("#txtPesquisaGeralAva").val() == "" || e("#txtPesquisaGeralAva").val() == "Procurar por nome") {
                    alert("Informe o nome a ser pesquisado")
                } else {
                    if (!jaClicouNoBuscar) {
                        GlobalResultsBuscaPessoas = "";
                        GlobalTotalResultsBuscaPessoas = 0;
                        GlobalPaginacaoModalInicio = 1;
                        GlobalPaginacaoModalFim = 12;
                        idLoadedGlobal = false;
                        e.fancybox.showLoading();
                        e("#ava_contentbuscapessoas #msgInicio").css("display", "none");
                        $campo = e("#txtPesquisaGeralAva").val();
                        jaClicouNoBuscar = true;
                        if ($campo != "" || $campo != "Procurar por nome") {
                            e("#ava_contentbuscapessoas div").remove();
                            $urlBuscaPessoas = "/AVA/Barras/Home/PesquisaGeral/";
                            e.fancybox.showLoading();
                            e.ajax({
                                dataType: "json",
                                type: "post",
                                url: $urlBuscaPessoas,
                                cache: false,
                                data: {
                                    busca: $campo
                                },
                                success: function(l) {
                                    GlobalResultsBuscaPessoas = l.Result;
                                    GlobalTotalResultsBuscaPessoas = Object.keys(l.Result).length;
                                    if (GlobalTotalResultsBuscaPessoas < 12) {
                                        totalExibidos = GlobalTotalResultsBuscaPessoas
                                    } else {
                                        totalExibidos = GlobalPaginacaoModalFim
                                    }
                                    xml = GlobalResultsBuscaPessoas;
                                    teste = xml.slice(0, 12);
                                    teste2 = {
                                        Result: teste
                                    };
                                    if (GlobalTotalResultsBuscaPessoas == 0) {
                                        e("#exibe_resultado_combo").html("<p>Nenhum resultado encontrado.</p>")
                                    } else {
                                        e("#exibe_resultado_combo").html("<p>Exibindo resultado de busca para <strong>" + $campo + "</strong> - " + totalExibidos + " de " + GlobalTotalResultsBuscaPessoas + "</p>")
                                    }
                                    e("#myContentTemplate").tmpl(teste2).appendTo("#ava_contentbuscapessoas");
                                    e.fancybox.hideLoading();
                                    e(".ava_lightcontent").scroll(function() {
                                        if (!idLoadedGlobal && e(".ava_lightcontent").get(0).clientHeight + 20 >= (e(".ava_lightcontent").get(0).scrollHeight - e(".ava_lightcontent").get(0).scrollTop)) {
                                            idLoadedGlobal = true;
                                            e.fancybox.showLoading();
                                            xml = GlobalResultsBuscaPessoas;
                                            GlobalPaginacaoModalInicio = (GlobalPaginacaoModalInicio - 1) + 12;
                                            GlobalPaginacaoModalFim = (GlobalPaginacaoModalFim - 1) + 12;
                                            totalExibidos = GlobalPaginacaoModalFim + 1;
                                            if (totalExibidos > GlobalTotalResultsBuscaPessoas) {
                                                totalExibidos = GlobalTotalResultsBuscaPessoas
                                            }
                                            e.fancybox.showLoading();
                                            teste = xml.slice(GlobalPaginacaoModalInicio, GlobalPaginacaoModalFim);
                                            teste2 = {
                                                Result: teste
                                            };
                                            e("#exibe_resultado_combo").html("<p>Exibindo resultado de busca para <strong>" + $campo + "</strong> - " + totalExibidos + " de " + GlobalTotalResultsBuscaPessoas + "</p>");
                                            e("#myContentTemplate").tmpl(teste2).appendTo("#ava_contentbuscapessoas");
                                            e.fancybox.hideLoading();
                                            if (GlobalPaginacaoModalFim + 12 < GlobalTotalResultsBuscaPessoas || (GlobalPaginacaoModalFim + 12 < GlobalTotalResultsBuscaPessoas + 12)) {
                                                idLoadedGlobal = false
                                            }
                                        }
                                    })
                                },
                                error: function(l) {
                                    console.debug(l);
                                    jaClicouNoBuscar = false
                                }
                            });
                            jaClicouNoBuscar = false
                        }
                    }
                }
            });
            e("#txtPesquisaGeralAva").bind("keypress", function(l) {
                if (l.keyCode == 13) {
                    l.preventDefault();
                    e("#buscarpessoas").trigger("click")
                }
            })
        },
        helpers: {
            overlay: {
                locked: false
            }
        }
    };
    lightBoxAVA(k, b);
    if (idUsuarioCript != 0) {
        try {
            var f = e.jStorage.get("VerificaSeEResponsavel" + idUsuarioPraCachear)
        } catch (d) {
            var f = ""
        }
        if (!f) {
            e.ajax({
                url: "/AVA/Barras/Home/VerificaSeEResponsavel/",
                cache: false,
                data: {
                    strLogin: idUsuarioPublico
                },
                success: function(l) {
                    f = l;
                    try {
                        e.jStorage.set("VerificaSeEResponsavel" + idUsuarioPraCachear, f);
                        e.jStorage.setTTL("VerificaSeEResponsavel" + idUsuarioPraCachear, 600000)
                    } catch (m) {}
                }
            })
        }
    }
    if (intTipoPerfil >= 0 && ((_projeto.toLowerCase() != "grupo" && _action.toLowerCase() != "post") || (_projeto.toLowerCase() == "grupo" && _action.toLowerCase() == "index") || (_projeto.toLowerCase() == "mural" && _action.toLowerCase() == "post"))) {
        if (idUsuarioCript != 0) {
            try {
                var f = e.jStorage.get("VerificaSeEResponsavel" + idUsuarioPraCachear)
            } catch (d) {
                var f = ""
            }
            if (f) {
                var g = f.split("_");
                if ((g[0] == "True" && g[1] == "True") || g[0] == "True") {
                    CarregaFilhos()
                }
            } else {
                e.ajax({
                    url: "/AVA/Barras/Home/VerificaSeEResponsavel/",
                    cache: false,
                    data: {
                        strLogin: idUsuarioPublico
                    },
                    success: function(l) {
                        var m = l.split("_");
                        if ((m[0] == "True" && m[1] == "True") || m[0] == "True") {
                            CarregaFilhos()
                        }
                    },
                    error: function(l) {
                        if (l.status == 0) {
                            e("#sFilhos").empty()
                        } else {
                            e("#sFilhos").html("erro ao verificar filhos")
                        }
                    }
                })
            }
        }
        var a = location;
        var j = a.toString().indexOf("Perfil", 0);
        if (j < 0) {
            e("#sSeguidores").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            if (idUsuarioCript != 0) {
                try {
                    var i = e.jStorage.get("seguidores" + idUsuarioPraCachear)
                } catch (d) {
                    var i = ""
                }
                if (!i) {
                    $urlSeguidores = "/AVA/Barras/Home/Seguidores/" + idUsuarioPublico;
                    e.ajax({
                        url: $urlSeguidores,
                        data: "strLogin=" + idUsuarioPublico,
                        cache: false,
                        success: function(m) {
                            if (m[0] != "0") {
                                i = m;
                                e("#sSeguidores").html(i).show();
                                window.setTimeout(CarregaComplementoSeguidores, 2);
                                try {
                                    e.jStorage.set("seguidores" + idUsuarioPraCachear, i);
                                    e.jStorage.setTTL("seguidores" + idUsuarioPraCachear, 600000)
                                } catch (l) {}
                            }
                        },
                        error: function(l) {
                            if (l.status == 0) {
                                e("#sSeguidores").empty()
                            } else {
                                i = "erro ao buscar seguidores";
                                e("#sSeguidores").html(i)
                            }
                        }
                    })
                } else {
                    e("#sSeguidores").html(i).show();
                    window.setTimeout(CarregaComplementoSeguidores, 2)
                }
            } else {
                $urlSeguidores = "/AVA/Barras/Home/Seguidores/" + idUsuarioPublico;
                e.ajax({
                    url: $urlSeguidores,
                    cache: false,
                    data: "strLogin=" + idUsuarioPublico,
                    success: function(l) {
                        if (l[0] != "0") {
                            e("#sSeguidores").html(l).show();
                            window.setTimeout(CarregaComplementoSeguidores, 2)
                        }
                    },
                    error: function(l) {
                        if (l.status == 0) {
                            e("#sSeguidores").empty()
                        } else {
                            e("#sSeguidores").html("erro ao buscar seguidores")
                        }
                    }
                })
            }
        } else {
            e("#sSeguidores").css("border-bottom", 0)
        }
        e("#sSeguidos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        CarregaSeguidos();
        var f = e.jStorage.get("VerificaSeEResponsavel" + idUsuarioPraCachear);
        if (f) {
            var g = f.split("_");
            if (g[1] == "True" || (g[0] == "False" && g[1] == "False")) {
                carregaEducadores(idUsuarioPublico);
                carregaTurma(idUsuarioPublico)
            } else {
                if (g[0] == "True" && idUsuarioPublico == "") {
                    carregaEducadores("");
                    carregaTurma("")
                } else {
                    e("#sEducadores").hide();
                    e("#sTurma").hide()
                }
            }
        } else {
            e.ajax({
                url: "/AVA/Barras/Home/VerificaSeEResponsavel/",
                cache: false,
                data: {
                    strLogin: idUsuarioPublico
                },
                success: function(l) {
                    var m = l.split("_");
                    if (m[1] == "True" || (m[0] == "False" && m[1] == "False")) {
                        carregaEducadores(idUsuarioPublico);
                        carregaTurma(idUsuarioPublico)
                    } else {
                        if (m[0] == "True" && idUsuarioPublico == "") {
                            carregaEducadores("");
                            carregaTurma("")
                        } else {
                            e("#sEducadores").hide();
                            e("#sTurma").hide()
                        }
                    }
                }
            })
        }

         /********************************************************************
        * Carrega grupos
        ********************************************************************/
        $("#sGrupos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

        //if (idUsuarioCript != 0) {
        var listaGrupos = undefined;//$.jStorage.get("listaGrupos" + strLogin + idUsuarioCript);
        //if (!listaEducadoresValue) {
        $urlEducadores = "/AVA/Barras/Home/Grupos";
        $.ajax({
            url: $urlEducadores,
            //data: 'strLogin=' + strLogin,
            async: false,
            success: function (data) {
                console.log('data', data);
                listaGrupos = data;
            },
            error: function (data) {
                console.log('data', data);
                if (data.status == 0) {
                    $("#sGrupos").empty();
                    listaGrupos = "empty";
                } else {
                        listaGrupos = "erro ao buscar Grupos";
                }
            }
        });

        $("#sGrupos").html(listaGrupos);

        $.jStorage.set("listaGrupos" + strLogin + idUsuarioCript, listaGrupos);
        $.jStorage.setTTL("listaGrupos" + strLogin + idUsuarioCript, 600000); // expires in 10 minutos
        
        $("#btCriarGrupo").live("click", function() {
            $("#boxCriarGrupo").css("display", "block");
            console.log('click do criar grupo!!');
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
    } else {
        e("#sEducadores").css("display", "none");
        e("#sTurma").css("display", "none");
        e("#sFilhos").css("display", "none");
        e("#sSeguidos").css("display", "none");
        e("#sSeguidores").css("display", "none");
        e("#sProcuraPessoas").css("display", "none");
        e("#dadosPerfil").css("border-bottom", "0px");
        if (_projeto.toLowerCase() == "grupo" && _action.toLowerCase() != "post") {
            carregarDadosGrupo(strLinkGrupo)
        }
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

    var tpClickGrupo = "click";
    var atualizouUsuariosSeletor = !1;

    $("#btCriarGrupo").live("click", function() {
        $("#boxCriarGrupo").css("display", "block");
        console.log('click do criar grupo!!');
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
    }) /*$("#btnPesquisarGrupo").click(function(a) {
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
        })*/
    //}), $("#ava_wrap #ava_container .itensGrupo.moderado_por_voce .carregarMais, #ava_wrap #ava_container .itensGrupo.voce_participa .carregarMais, #ava_wrap #ava_container .itensGrupo.convite_pendente .carregarMais, #ava_wrap #ava_container .itensGrupo.descubra_novos_grupos .carregarMais").bind(tpClickGrupo, carregarMaisGrupos)

    e("body").on("click", "#voltarListaPesquisa", function(l) {
        $id = e(this).attr("idItem");
        $tipo = e(this).attr("idTipo");
        e("#txtFiltroAva").val("Pesquisar por nome");
        console.log('Achou');
        // removeCarteirinhas("ava_contentlista");
        e(".limpa_pesquisa").hide();
        GlobalPaginacaoModalInicio = 1;
        GlobalPaginacaoModalFim = 12;
        GlobalPaginacaoContador = 0;
        idLoadedGlobal = false;
        e.fancybox.showLoading();
        if ($tipo == 1) {
            var m = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma="
        } else {
            if ($tipo == 6) {
                var m = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + $id
            } else {
                if ($tipo == 5) {
                    var m = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + $id
                } else {
                    if ($tipo == 2) {
                        var m = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=&strLogin=&idTurma="
                    } else {
                        if ($tipo == 3) {
                            var m = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=3&idPublico=&strLogin=&idTurma="
                        }
                    }
                }
            }
        }
        retornaJsonNovo(m)
    });
    e("body").on("focusin", "#txtFiltroAva", function(l) {
        if (e(this).val() == "Pesquisar por nome") {
            e(this).val("")
        }
    });
    e("body").on("focusout", "#txtFiltroAva", function(l) {
        if (e(this).val() == "") {
            e(this).val("Pesquisar por nome")
        }
    })
});

function carregarPerfilUrl(a) {
    $.ajax({
        url: a,
        cache: false,
        success: function(b) {
            $("#dadosPerfil").html(b);
            if (_projeto.toLowerCase() == "grupo") {
                $("#ava_barralateral-esquerda li.current").removeClass();
                $("div.icon_li.grupos").closest("li").addClass("current");
                $("#fecharInfoGrupo").click(function() {
                    $(".boxSobre").css("display", "none");
                    $("#ava_barralateral-esquerda li.current").removeClass();
                    $("div.icon_li.grupos").closest("li").addClass("current")
                });
                $("#ava_editar_grupo").fancybox({
                    fitToView: true,
                    width: 550,
                    height: 630,
                    padding: 0,
                    autoSize: false,
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
                        window.prettyPrint && prettyPrint();
                        $("body").on("switch-change", "#mySwitch", function(g, f) {
                            var c = $(f.el),
                                d = f.value
                        });
                        $("input:radio").styleRadioCheckbox({
                            classChecked: "inputRadioChecked",
                            classFocus: "inputFocus"
                        });
                        $("#cbPublicoPotencial").find("li").eq(0).click(function() {
                            $(this).closest("ul").find("li").not('input[value="1"]').each(function() {
                                var c = $(this);
                                if (c.find("input").is(":checked")) {
                                    c.find("input").click()
                                }
                            });
                            $("#txtPublicoPotencial").click()
                        });
                        $("#excluir_grupo").fancybox({
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
                                    excluirGrupo($(this).attr("btnExclusaoGrupo"))
                                })
                            }
                        })
                    }
                })
            }
            if (bolBlog) {
                $("#meus_blogs_ava").click(function(c) {
                    if (!($(c.target).closest("ul").hasClass("sub_menu_perfil"))) {
                        c.preventDefault()
                    }
                    _this_b = $(this);
                    if (bolBlogCarregado == "") {
                        $.post("/rede/includes/blogsava.asp", {
                            idUsuario: $("#dadosPerfil").find("#id_usuario_blog").val()
                        }, function(d) {
                            _this_b.find("a").after(d);
                            bolBlogCarregado = d;
                            _this_b.find("ul.sub_menu_perfil").slideDown()
                        })
                    } else {
                        if ($(".sub_menu_perfil").css("display") == "none") {
                            _this_b.find("ul.sub_menu_perfil").slideDown()
                        } else {
                            if (!($(c.target).closest("ul").hasClass("sub_menu_perfil"))) {
                                _this_b.find("ul.sub_menu_perfil").slideUp()
                            }
                        }
                    }
                })
            }
            t = $(".edit_perfil");
            o = {
                autoSize: false,
                width: 600,
                height: 300,
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
                afterShow: fncActionsPerfilP,
                beforeClose: fncActionsPerfilAbandonado,
                ajax: {
                    type: "POST",
                    data: {
                        ts: new Date().getTime()
                    }
                },
                type: "ajax",
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            };
            lightBoxAVA(t, o)
        },
        error: function(b) {
            if (b.status == 0) {
                $("#dadosPerfil").empty()
            } else {
                console.debug("Ocorreu um erro na busca do perfil do usuï¿½rio.")
            }
        }
    })
}

function seguir(a, b) {
    $.ajax({
        type: "POST",
        url: "/AVA/Login/Home/UsuarioCript",
        async: true,
        success: function(c) {
            idUsuarioSeguidorCacheado = c;
            $.jStorage.deleteKey("seguidos" + idUsuarioSeguidorCacheado);
            $("#btseg_" + b).html("<img class='carregando_seguir' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            $.post("/AVA/Barras/Home/Seguir/?idSeguidor=" + a + "&idPerseguido=" + b, function(e) {
                if (e == "ok") {
                    $linkhref = "javascript: parardeseguir(" + a + "," + b + ")";
                    $("#btseg_" + b).attr("href", $linkhref);
                    $("#btseg_" + b).attr("class", "bt_seguir");
                    $("#btseg_" + b).html('<span class="ava_seguindo"></span><span class="ava_parardeseguir">parar de seguir</span><span class="fontello icoPararSeguir"></span>');
                    $("#btseguir_perfil_" + b).attr("href", $linkhref);
                    $("#btseguir_perfil_" + b).html('<span><div class="fontello icoSeguindo"></div>Seguindo</span><span><div class="fontello icoPararSeguir"></div>Parar de seguir</span>').children("span:first").addClass("segue_span").css("display", "block").next().addClass("seguenot_span").css("display", "none");
                    if (xmlGlobal.length > 0) {
                        for (var d = 0; d < xmlGlobal.length; d++) {
                            if (xmlGlobal[d].id == b) {
                                xmlGlobal[d].bolEstouSeguindo = true;
                                break
                            }
                        }
                    }
                } else {
                    alert("erro ao seguir usuï¿½rio!")
                }
            })
        },
        error: function(c) {
            if (c.status != 0) {
                idUsuarioCript = 0
            }
        }
    })
}
jQuery(function(a) {
    a("#dadosPerfil").delegate("[id^=btseguir_perfil_]", "mouseover", function() {
        a("[id^=btseguir_perfil_]").children("span:first").css("display", "none").next().css("display", "block")
    });
    a("#dadosPerfil").delegate("[id^=btseguir_perfil_]", "mouseout", function() {
        a("[id^=btseguir_perfil_]").children("span:first").css("display", "block").next().css("display", "none")
    })
});

function parardeseguir(a, b) {
    $.ajax({
        type: "POST",
        url: "/AVA/Login/Home/UsuarioCript",
        async: true,
        success: function(c) {
            idUsuarioSeguidorCacheado = c;
            $.jStorage.deleteKey("seguidos" + idUsuarioSeguidorCacheado);
            $("#btseg_" + b).html("<img class='carregando_seguir' src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
            $.post("/AVA/Barras/Home/PararDeSeguir/?idSeguidor=" + a + "&idPerseguido=" + b, function(e) {
                if (e == "ok") {
                    $linkhref = "javascript: seguir(" + a + "," + b + ")";
                    $("#btseg_" + b).attr("href", $linkhref);
                    $("#btseg_" + b).attr("class", "bt_seguir s_Indo");
                    $("#btseg_" + b).html('seguir<span class="fontello icoSeguir"></span>');
                    $("#btseguir_perfil_" + b).attr("href", $linkhref);
                    $("#btseguir_perfil_" + b).html('<div class="fontello icoSeguir"></div>seguir');
                    if (xmlGlobal.length > 0) {
                        for (var d = 0; d < xmlGlobal.length; d++) {
                            if (xmlGlobal[d].id == b) {
                                xmlGlobal[d].bolEstouSeguindo = false;
                                break
                            }
                        }
                    }
                } else {
                    alert("erro ao parar de seguir usuï¿½rio!")
                }
            })
        },
        error: function(c) {
            if (c.status != 0) {
                idUsuarioCript = 0
            }
        }
    })
}
var xmlGlobal = null;

function retornaJson(a) {
    console.log(a);

    if (a.indexOf("idTurma=0") > 0) {
        console.log('IF');
       
        console.log(  JSON.stringify(a)  );

        $.ajax({
            url:a,
            type:"GET",
            success: function(res){
               
                var c = res;

                if(res.Result == undefined ){

                    c = JSON.parse(res);

                    c = {'Result':c}
                }else{
                    c = res;
                }


                var b = null;

                b = c.Result;

                xmlGlobalEscolaTurmas = c;
                $("#myContentTemplate").tmpl(c).appendTo("#ava_contentlista");
                // $("#ava_contentlista #ava_loader").css("display", "none");
                $("#txtFiltroAvaTurma").live("keyup", function(j) {
                    if ((j.which && j.which == 13) || (j.keyCode && j.keyCode == 13)) {
                        j.preventDefault();
                        console.log('Aqui');
                        return false
                    }
                    if ($(this).attr("id")) {
                        _id = $(this).attr("id")
                    } else {
                        _id = 0
                    }
                    var d = "";
                    var i = "";
                    if ($("#escolaRede").size() > 0) {
                        d = $("#escolaRede").val()
                    } else {
                        d = -1
                    }
                    if ($("#unidades").size() > 0) {
                        i = $("#unidades").val()
                    } else {
                        i = -1
                    }
                    var g = $("#nivelEnsino").val();
                    var f = $("#intAnoSerie").val();
                    if (g == 0) {
                        g = -1
                    }
                    if (f == 0) {
                        f = -1
                    }
                        console.log('Antes do filtro');

                    FiltrarTurmaCompleto("#ava_contentlista", b, $(this).val(), d, i, g, f, -1, 0)
                });
                $("#txtFiltroAvaTurma").live("focus", function() {
                    if ($(this).val() == "Pesquisar por turma") {
                        $(this).val("")
                    }
                });
                $("#txtFiltroAvaTurma").live("blur", function() {
                    if ($(this).val() == "") {
                        $(this).val("Pesquisar por turma")
                    }
                });
                $("#minhasOuTodas").change(function(d) {

                    // alert('Foi');
                    console.log(d);
                    console.log('Fltrou');
                    if ($(this).val() == 1) {

                        $("#filtrosEscolaCoord").find("select").attr("disabled", true);
                        FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 1)
                    } else {

                        // alert('ELSE');
                        console.log('ELSE');


                        $("#escolaRede").val(0);
                        $("#unidades").val(0);
                        $("#nivelEnsino").val(-1);
                        $("#intAnoSerie").val(0);
                        $("#filtrosEscolaCoord").find("select").first().removeAttr("disabled");
                        FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)
                    }
                });
                if ($("#escolaRede").size() > 0) {
                    idEscola = $("#escolaRede").val()
                } else {
                    idEscola = -1
                }
                if ($("#unidades").size() > 0) {
                    idUnidade = $("#unidades").val()
                } else {
                    idUnidade = -1
                }

                $('#ava_loader').hide();

                if (idEscola == -1 && idUnidade == -1) {
                    console.log('Conv');
                    $("#nivelEnsino").removeAttr("disabled");
                    idEscola = $("#idEscola").val();

                    if(idEscola == undefined){

                        console.log('Valor de ESCOLA  '+idEscola);

                        
                        $.ajax({

                            url: "/AVA/Barras/Home/RetornaIdEscola",
                            type: "GET",
                            cache: false,

                            success: function(idEEscola){ 

                                idEscola = idEEscola;

                                $.ajax({
                                    url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + idEscola + "&intUnidade=0",
                                    type: "GET",
                                    cache: false,
                                    dataType: "json",
                                    success: function(e) {
                                        var d = parseInt(e.error);
                                        if (d == 1) {
                                            $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
                                            console.log(e.responseText)
                                        } else {
                                            $("#nivelEnsino").find("option[value=0]").attr("selected", true);
                                            $("#nivelEnsino").attr("disabled", true);
                                            $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                                            $("#intAnoSerie").attr("disabled", true);
                                            $("#turmas").find("option[value=0]").attr("selected", true);
                                            $("#turmas").attr("disabled", true);
                                            $("#nivelEnsino").removeAttr("disabled");
                                            $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>');
                                            $(e.listaEnsino).each(function(f, g) {
                                                $("#nivelEnsino").append('<option value="' + g.idEnsino + '">' + g.strEnsino + "</option>")
                                            });
                                            $("#listaCarteirinha").empty();
                                            idLoadedGlobal = false;
                                            // $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
                                            idUnidade = -1;
                                            idEnsino = -1;
                                            // FiltrarTurmaCompleto("#ava_contentlista", b, "", idEscola, idUnidade, idEnsino, -1, -1, 0)
                                        }
                                        $('#ava_loader').hide();
                                    },
                                    error: function(d) {
                                        $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
                                        console.log(d.reseponseText)
                                    }
                                })

                            },
                            error: function(){

                            }

                        });
                    }

                    else{
                        console.log('Valor de ESCOLA  '+idEscola);

                        $.ajax({
                            url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + idEscola + "&intUnidade=0",
                            type: "GET",
                            cache: false,
                            dataType: "json",
                            success: function(e) {
                                var d = parseInt(e.error);
                                if (d == 1) {
                                    $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
                                    console.log(e.responseText)
                                } else {
                                    $("#nivelEnsino").find("option[value=0]").attr("selected", true);
                                    $("#nivelEnsino").attr("disabled", true);
                                    $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                                    $("#intAnoSerie").attr("disabled", true);
                                    $("#turmas").find("option[value=0]").attr("selected", true);
                                    $("#turmas").attr("disabled", true);
                                    $("#nivelEnsino").removeAttr("disabled");
                                    $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>');
                                    $(e.listaEnsino).each(function(f, g) {
                                        $("#nivelEnsino").append('<option value="' + g.idEnsino + '">' + g.strEnsino + "</option>")
                                    });
                                    $("#listaCarteirinha").empty();
                                    idLoadedGlobal = false;
                                    // $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
                                    idUnidade = -1;
                                    idEnsino = -1;
                                    // FiltrarTurmaCompleto("#ava_contentlista", b, "", idEscola, idUnidade, idEnsino, -1, -1, 0)
                                }
                                $('#ava_loader').hide();
                            },
                            error: function(d) {
                                $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
                                console.log(d.reseponseText)
                            }
                        })

                    }
                }
                $("#escolaRede").change(function(g) {
                    $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
                    var d = parseInt($(this).val());
                    var f = $("#escolaRede option:selected").html();
                    if ($("#unidades").size() > 0) {
                        if (d == 0) {
                            $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
                            $("#nivelEnsino").attr("disabled", true);
                            $("#unidades").find("option[value=0]").attr("selected", true);
                            $("#unidades").attr("disabled", true);
                            $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                            $("#intAnoSerie").attr("disabled", true);
                            $("#turmas").find("option[value=0]").attr("selected", true);
                            $("#turmas").attr("disabled", true);
                            idLoadedGlobal = false;
                            FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)
                        } else {
                            $.ajax({
                                url: "/AVA/Barras/Home/getUnidadesByIdEscola?id=" + d,
                                type: "GET",
                                cache: false,
                                dataType: "json",
                                success: function(i) {
                                    var e = parseInt(i.error);
                                    if (e == 1) {
                                        $("#unidades").empty().html('<option value="n/a">Erro</option>');
                                        console.log(i.responseText)
                                    } else {
                                        $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
                                        $("#nivelEnsino").attr("disabled", true);
                                        $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                                        $("#intAnoSerie").attr("disabled", true);
                                        $("#turmas").find("option[value=0]").attr("selected", true);
                                        $("#turmas").attr("disabled", true);
                                        $("#unidades").empty().html('<option value="0">Unidade (Todas)</option>');
                                        $(i.listaUnidades).each(function(j, k) {
                                            $("#unidades").append('<option value="' + k.id + '">' + k.strUnidade + "</option>")
                                        })
                                    }
                                },
                                error: function(e) {
                                    $("#unidades").empty().html('<option value="n/a">Erro</option>');
                                    console.log(e.responseText)
                                }
                            })
                        }
                    } else {
                        if (d == 0) {
                            $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
                            $("#nivelEnsino").attr("disabled", true);
                            $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                            $("#intAnoSerie").attr("disabled", true);
                            $("#turmas").find("option[value=0]").attr("selected", true);
                            $("#turmas").attr("disabled", true);
                            idLoadedGlobal = false;
                            FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)
                        } else {
                            $("#listaFiltrados").text(f);
                            $.ajax({
                                url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + d + "&intUnidade=0",
                                type: "GET",
                                cache: false,
                                dataType: "json",
                                success: function(i) {
                                    var e = parseInt(i.error);
                                    if (e == 1) {
                                        $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
                                        console.log(i.responseText)
                                    } else {
                                        $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
                                        $("#nivelEnsino").attr("disabled", true);
                                        $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                                        $("#intAnoSerie").attr("disabled", true);
                                        $("#turmas").find("option[value=0]").attr("selected", true);
                                        $("#turmas").attr("disabled", true);
                                        $("#nivelEnsino").removeAttr("disabled");
                                        $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>');
                                        $(i.listaEnsino).each(function(j, k) {
                                            $("#nivelEnsino").append('<option value="' + k.idEnsino + '">' + k.strEnsino + "</option>")
                                        });
                                        $("#listaCarteirinha").empty();
                                        idLoadedGlobal = false;
                                        $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
                                        idUnidade = -1;
                                        idEnsino = -1;
                                        FiltrarTurmaCompleto("#ava_contentlista", b, "", d, idUnidade, idEnsino, -1, -1, 0)
                                    }
                                },
                                error: function(e) {
                                    $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
                                    console.log(e.reseponseText)
                                }
                            })
                        }
                    }
                });
                $("#unidades").change(function(g) {
                    $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
                    var f = parseInt($(this).val());
                    var d = "";
                    if ($("#escolaRede").size() > 0) {
                        d = $("#escolaRede").val()
                    } else {
                        d = 0
                    }
                    if (f == 0) {
                        $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
                        $("#nivelEnsino").attr("disabled", true);
                        $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                        $("#intAnoSerie").attr("disabled", true);
                        $("#turmas").find("option[value=0]").attr("selected", true);
                        $("#turmas").attr("disabled", true);
                        FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)
                    } else {
                        $.ajax({
                            url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + d + "&intUnidade=" + f,
                            type: "GET",
                            cache: false,
                            dataType: "json",
                            success: function(i) {
                                var e = parseInt(i.error);
                                if (e == 1) {
                                    $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
                                    console.log(i.responseText)
                                } else {
                                    $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
                                    $("#nivelEnsino").attr("disabled", true);
                                    $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                                    $("#intAnoSerie").attr("disabled", true);
                                    $("#turmas").find("option[value=0]").attr("selected", true);
                                    $("#turmas").attr("disabled", true);
                                    $("#nivelEnsino").removeAttr("disabled");
                                    $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>');
                                    $(i.listaEnsino).each(function(j, k) {
                                        $("#nivelEnsino").append('<option value="' + k.idEnsino + '">' + k.strEnsino + "</option>")
                                    });
                                    idLoadedGlobal = false;
                                    FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, f, -1, -1, -1, 0)
                                }
                            },
                            error: function(e) {
                                $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
                                console.log(e.reseponseText)
                            }
                        })
                    }
                });
                $("#nivelEnsino").live("change", function(i) {
                    $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
                    var f = parseInt($(this).val());
                    var d = "";
                    var g = "";
                    if ($("#escolaRede").size() > 0) {
                        d = $("#escolaRede").val()
                    } else {
                        d = 0
                    }
                    if ($("#unidades").size() > 0) {
                        g = $("#unidades").val()
                    } else {
                        g = 0
                    }
                    if (d == 0 && g == 0) {
                        $("#nivelEnsino").removeAttr("disabled");
                        d = $("#idEscola").val()
                    }
                    if (f == -1) {
                        $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                        $("#intAnoSerie").attr("disabled", true);
                        $("#turmas").find("option[value=0]").attr("selected", true);
                        $("#turmas").attr("disabled", true);
                        idLoadedGlobal = false;
                        if (d == 0) {
                            d = -1
                        }
                        if (g == 0) {
                            g = -1
                        }
                        FiltrarTurmaCompleto("#ava_contentlista", b, "", d, g, f, -1, -1, 0)
                    } else {
                        $.ajax({
                            url: "/ava/Barras/home/getAnoSerie?id=" + d + "&idUnidade=" + g + "&idEnsino=" + f,
                            type: "GET",
                            cache: false,
                            dataType: "json",
                            success: function(j) {
                                var e = parseInt(j.error);
                                if (e == 1) {
                                    $("#intAnoSerie").empty().html('<option value="n/a">Erro</option>')
                                } else {
                                    $("#intAnoSerie").find("option[value=0]").attr("selected", true);
                                    $("#intAnoSerie").attr("disabled", true);
                                    $("#turmas").find("option[value=0]").attr("selected", true);
                                    $("#turmas").attr("disabled", true);
                                    $("#intAnoSerie").removeAttr("disabled");
                                    $("#intAnoSerie").empty().html('<option value="0">S&#233;rie (Todas)</option>');
                                    $(j.listaSerie).each(function(k, l) {
                                        $("#intAnoSerie").append('<option value="' + l.idSerie + '">' + l.strSerie + "</option>")
                                    });
                                    idLoadedGlobal = false;
                                    if (d == 0) {
                                        d = -1
                                    }
                                    if (g == 0) {
                                        g = -1
                                    }
                                    FiltrarTurmaCompleto("#ava_contentlista", b, "", d, g, f, -1, -1, 0)
                                }
                            },
                            error: function(e) {
                                $("#intAnoSerie").empty().html('<option value="n/a">Erro</option>');
                                console.log(e.responseText)
                            }
                        })
                    }
                });
                $("#intAnoSerie").live("change", function(j) {
                    $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
                    var f = parseInt($(this).val());
                    var g = $("#nivelEnsino").val();
                    var d = "";
                    var i = "";
                    if ($("#escolaRede").size() > 0) {
                        d = $("#escolaRede").val()
                    } else {
                        d = 0
                    }
                    if ($("#unidades").size() > 0) {
                        i = $("#unidades").val()
                    } else {
                        i = 0
                    }
                    if (f == 0) {
                        $("#turmas").find("option[value=0]").attr("selected", true);
                        $("#turmas").attr("disabled", true);
                        idLoadedGlobal = false;
                        todosUsers = false;
                        if (d == 0) {
                            d = -1
                        }
                        if (i == 0) {
                            i = -1
                        }
                        if (f == 0) {
                            f = -1
                        }
                        FiltrarTurmaCompleto("#ava_contentlista", b, "", d, i, g, f, -1, 0)
                    } else {
                        $.ajax({
                            url: "/ava/Barras/home/getTurmasByEscolaUnidadeEnsinoSerie?id=" + d + "&idUnidade=" + i + "&idEnsino=" + g + "&idSerie=" + f,
                            type: "GET",
                            cache: false,
                            dataType: "json",
                            success: function(k) {
                                var e = parseInt(k.error);
                                if (e == 0) {
                                    $("#turmas").removeAttr("disabled");
                                    $("#turmas").empty().html('<option value="0">Turmas (Todas)</option>');
                                    $(k.listaTurmas).each(function(l, m) {
                                        $("#turmas").append('<option value="' + m.id + '">' + m.strNome + "</option>")
                                    });
                                    idLoadedGlobal = false;
                                    if (d == 0) {
                                        d = -1
                                    }
                                    if (i == 0) {
                                        i = -1
                                    }
                                    FiltrarTurmaCompleto("#ava_contentlista", b, "", d, i, g, f, -1, 0)
                                } else {
                                    if (e == 3) {
                                        $("#turmas").attr("disabled", true);
                                        $("#turmas").empty().html('<option value="0">Sem Turmas</option>');
                                        $("#listaCarteirinha").empty().html(k.msg)
                                    } else {
                                        $("#turmas").empty().html('<option value="n/a">' + k.msg + "</option>")
                                    }
                                }
                            },
                            error: function(e) {
                                console.log(e.responseText);
                                $("#turmas").empty().html('<option value="n/a">Erro</option>')
                            }
                        })
                    }
                });
                $("#turmas").live("change", function(k) {
                    $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
                    var f = $("#intAnoSerie").val();
                    var g = $("#nivelEnsino").val();
                    var d = "";
                    var j = "";
                    if ($("#escolaRede").size() > 0) {
                        d = $("#escolaRede").val()
                    } else {
                        d = 0
                    }
                    if ($("#unidades").size() > 0) {
                        j = $("#unidades").val()
                    } else {
                        j = 0
                    }
                    var i = $(this).val();
                    idLoadedGlobal = false;
                    todosUsers = false;
                    if (d == 0) {
                        d = -1
                    }
                    if (j == 0) {
                        j = -1
                    }
                    FiltrarTurmaCompleto("#ava_contentlista", b, "", d, j, g, f, i, 0)
                })

            },
            error : function(err){
                console.log(  'Houve algum erro :'+err  );
                
            }
        })


        // $.getJSON(a, null, function(c) {
        //     console.log('asllll');
    
        //         console.log(c.Result);
        //         var b = null;
        //         b = c.Result;
        //         xmlGlobalEscolaTurmas = c;
        //         $("#myContentTemplate").tmpl(c).appendTo("#ava_contentlista");
        //         // $("#ava_contentlista #ava_loader").css("display", "none");
        //         $("#txtFiltroAvaTurma").live("keyup", function(j) {
        //             if ((j.which && j.which == 13) || (j.keyCode && j.keyCode == 13)) {
        //                 j.preventDefault();
        //                 console.log('Aqui');
        //                 return false
        //             }
        //             if ($(this).attr("id")) {
        //                 _id = $(this).attr("id")
        //             } else {
        //                 _id = 0
        //             }
        //             var d = "";
        //             var i = "";
        //             if ($("#escolaRede").size() > 0) {
        //                 d = $("#escolaRede").val()
        //             } else {
        //                 d = -1
        //             }
        //             if ($("#unidades").size() > 0) {
        //                 i = $("#unidades").val()
        //             } else {
        //                 i = -1
        //             }
        //             var g = $("#nivelEnsino").val();
        //             var f = $("#intAnoSerie").val();
        //             if (g == 0) {
        //                 g = -1
        //             }
        //             if (f == 0) {
        //                 f = -1
        //             }
        //                 console.log('Antes do filtro');
    
        //             FiltrarTurmaCompleto("#ava_contentlista", b, $(this).val(), d, i, g, f, -1, 0)
        //         });
        //         $("#txtFiltroAvaTurma").live("focus", function() {
        //             if ($(this).val() == "Pesquisar por turma") {
        //                 $(this).val("")
        //             }
        //         });
        //         $("#txtFiltroAvaTurma").live("blur", function() {
        //             if ($(this).val() == "") {
        //                 $(this).val("Pesquisar por turma")
        //             }
        //         });
        //         $("#minhasOuTodas").change(function(d) {
        //             console.log(d);
        //             console.log('Fltrou');
        //             if ($(this).val() == 1) {
        //                 $("#filtrosEscolaCoord").find("select").attr("disabled", true);
        //                 FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 1)
        //             } else {
        //                 $("#escolaRede").val(0);
        //                 $("#unidades").val(0);
        //                 $("#nivelEnsino").val(-1);
        //                 $("#intAnoSerie").val(0);
        //                 $("#filtrosEscolaCoord").find("select").first().removeAttr("disabled");
        //                 FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)
        //             }
        //         });
        //         if ($("#escolaRede").size() > 0) {
        //             idEscola = $("#escolaRede").val()
        //         } else {
        //             idEscola = -1
        //         }
        //         if ($("#unidades").size() > 0) {
        //             idUnidade = $("#unidades").val()
        //         } else {
        //             idUnidade = -1
        //         }
    
        //         $('#ava_loader').hide();
    
        //         if (idEscola == -1 && idUnidade == -1) {
        //             console.log('Conv');
        //             $("#nivelEnsino").removeAttr("disabled");
        //             idEscola = $("#idEscola").val();
    
        //             if(idEscola == undefined){
    
        //                 console.log('Valor de ESCOLA  '+idEscola);
    
                        
        //                 $.ajax({
    
        //                     url: "/AVA/Barras/Home/RetornaIdEscola",
        //                     type: "GET",
        //                     cache: false,
    
        //                     success: function(idEEscola){ 
    
        //                         idEscola = idEEscola;
    
        //                         $.ajax({
        //                             url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + idEscola + "&intUnidade=0",
        //                             type: "GET",
        //                             cache: false,
        //                             dataType: "json",
        //                             success: function(e) {
        //                                 var d = parseInt(e.error);
        //                                 if (d == 1) {
        //                                     $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
        //                                     console.log(e.responseText)
        //                                 } else {
        //                                     $("#nivelEnsino").find("option[value=0]").attr("selected", true);
        //                                     $("#nivelEnsino").attr("disabled", true);
        //                                     $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                                     $("#intAnoSerie").attr("disabled", true);
        //                                     $("#turmas").find("option[value=0]").attr("selected", true);
        //                                     $("#turmas").attr("disabled", true);
        //                                     $("#nivelEnsino").removeAttr("disabled");
        //                                     $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>');
        //                                     $(e.listaEnsino).each(function(f, g) {
        //                                         $("#nivelEnsino").append('<option value="' + g.idEnsino + '">' + g.strEnsino + "</option>")
        //                                     });
        //                                     $("#listaCarteirinha").empty();
        //                                     idLoadedGlobal = false;
        //                                     // $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
        //                                     idUnidade = -1;
        //                                     idEnsino = -1;
        //                                     // FiltrarTurmaCompleto("#ava_contentlista", b, "", idEscola, idUnidade, idEnsino, -1, -1, 0)
        //                                 }
        //                                 $('#ava_loader').hide();
        //                             },
        //                             error: function(d) {
        //                                 $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
        //                                 console.log(d.reseponseText)
        //                             }
        //                         })
    
        //                     },
        //                     error: function(){
    
        //                     }
    
        //                 });
        //             }
    
        //             else{
        //                 console.log('Valor de ESCOLA  '+idEscola);
    
        //                 $.ajax({
        //                     url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + idEscola + "&intUnidade=0",
        //                     type: "GET",
        //                     cache: false,
        //                     dataType: "json",
        //                     success: function(e) {
        //                         var d = parseInt(e.error);
        //                         if (d == 1) {
        //                             $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
        //                             console.log(e.responseText)
        //                         } else {
        //                             $("#nivelEnsino").find("option[value=0]").attr("selected", true);
        //                             $("#nivelEnsino").attr("disabled", true);
        //                             $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                             $("#intAnoSerie").attr("disabled", true);
        //                             $("#turmas").find("option[value=0]").attr("selected", true);
        //                             $("#turmas").attr("disabled", true);
        //                             $("#nivelEnsino").removeAttr("disabled");
        //                             $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>');
        //                             $(e.listaEnsino).each(function(f, g) {
        //                                 $("#nivelEnsino").append('<option value="' + g.idEnsino + '">' + g.strEnsino + "</option>")
        //                             });
        //                             $("#listaCarteirinha").empty();
        //                             idLoadedGlobal = false;
        //                             // $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
        //                             idUnidade = -1;
        //                             idEnsino = -1;
        //                             // FiltrarTurmaCompleto("#ava_contentlista", b, "", idEscola, idUnidade, idEnsino, -1, -1, 0)
        //                         }
        //                         $('#ava_loader').hide();
        //                     },
        //                     error: function(d) {
        //                         $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
        //                         console.log(d.reseponseText)
        //                     }
        //                 })
    
        //             }
        //         }
        //         $("#escolaRede").change(function(g) {
        //             $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
        //             var d = parseInt($(this).val());
        //             var f = $("#escolaRede option:selected").html();
        //             if ($("#unidades").size() > 0) {
        //                 if (d == 0) {
        //                     $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
        //                     $("#nivelEnsino").attr("disabled", true);
        //                     $("#unidades").find("option[value=0]").attr("selected", true);
        //                     $("#unidades").attr("disabled", true);
        //                     $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                     $("#intAnoSerie").attr("disabled", true);
        //                     $("#turmas").find("option[value=0]").attr("selected", true);
        //                     $("#turmas").attr("disabled", true);
        //                     idLoadedGlobal = false;
        //                     FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)
        //                 } else {
        //                     $.ajax({
        //                         url: "/AVA/Barras/Home/getUnidadesByIdEscola?id=" + d,
        //                         type: "GET",
        //                         cache: false,
        //                         dataType: "json",
        //                         success: function(i) {
        //                             var e = parseInt(i.error);
        //                             if (e == 1) {
        //                                 $("#unidades").empty().html('<option value="n/a">Erro</option>');
        //                                 console.log(i.responseText)
        //                             } else {
        //                                 $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
        //                                 $("#nivelEnsino").attr("disabled", true);
        //                                 $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                                 $("#intAnoSerie").attr("disabled", true);
        //                                 $("#turmas").find("option[value=0]").attr("selected", true);
        //                                 $("#turmas").attr("disabled", true);
        //                                 $("#unidades").empty().html('<option value="0">Unidade (Todas)</option>');
        //                                 $(i.listaUnidades).each(function(j, k) {
        //                                     $("#unidades").append('<option value="' + k.id + '">' + k.strUnidade + "</option>")
        //                                 })
        //                             }
        //                         },
        //                         error: function(e) {
        //                             $("#unidades").empty().html('<option value="n/a">Erro</option>');
        //                             console.log(e.responseText)
        //                         }
        //                     })
        //                 }
        //             } else {
        //                 if (d == 0) {
        //                     $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
        //                     $("#nivelEnsino").attr("disabled", true);
        //                     $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                     $("#intAnoSerie").attr("disabled", true);
        //                     $("#turmas").find("option[value=0]").attr("selected", true);
        //                     $("#turmas").attr("disabled", true);
        //                     idLoadedGlobal = false;
        //                     FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)
        //                 } else {
        //                     $("#listaFiltrados").text(f);
        //                     $.ajax({
        //                         url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + d + "&intUnidade=0",
        //                         type: "GET",
        //                         cache: false,
        //                         dataType: "json",
        //                         success: function(i) {
        //                             var e = parseInt(i.error);
        //                             if (e == 1) {
        //                                 $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
        //                                 console.log(i.responseText)
        //                             } else {
        //                                 $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
        //                                 $("#nivelEnsino").attr("disabled", true);
        //                                 $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                                 $("#intAnoSerie").attr("disabled", true);
        //                                 $("#turmas").find("option[value=0]").attr("selected", true);
        //                                 $("#turmas").attr("disabled", true);
        //                                 $("#nivelEnsino").removeAttr("disabled");
        //                                 $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>');
        //                                 $(i.listaEnsino).each(function(j, k) {
        //                                     $("#nivelEnsino").append('<option value="' + k.idEnsino + '">' + k.strEnsino + "</option>")
        //                                 });
        //                                 $("#listaCarteirinha").empty();
        //                                 idLoadedGlobal = false;
        //                                 $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
        //                                 idUnidade = -1;
        //                                 idEnsino = -1;
        //                                 FiltrarTurmaCompleto("#ava_contentlista", b, "", d, idUnidade, idEnsino, -1, -1, 0)
        //                             }
        //                         },
        //                         error: function(e) {
        //                             $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
        //                             console.log(e.reseponseText)
        //                         }
        //                     })
        //                 }
        //             }
        //         });
        //         $("#unidades").change(function(g) {
        //             $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
        //             var f = parseInt($(this).val());
        //             var d = "";
        //             if ($("#escolaRede").size() > 0) {
        //                 d = $("#escolaRede").val()
        //             } else {
        //                 d = 0
        //             }
        //             if (f == 0) {
        //                 $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
        //                 $("#nivelEnsino").attr("disabled", true);
        //                 $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                 $("#intAnoSerie").attr("disabled", true);
        //                 $("#turmas").find("option[value=0]").attr("selected", true);
        //                 $("#turmas").attr("disabled", true);
        //                 FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)
        //             } else {
        //                 $.ajax({
        //                     url: "/AVA/Barras/Home/getNivelEnsinoByEscolaOuUnidade?id=" + d + "&intUnidade=" + f,
        //                     type: "GET",
        //                     cache: false,
        //                     dataType: "json",
        //                     success: function(i) {
        //                         var e = parseInt(i.error);
        //                         if (e == 1) {
        //                             $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
        //                             console.log(i.responseText)
        //                         } else {
        //                             $("#nivelEnsino").find("option[value=-1]").attr("selected", true);
        //                             $("#nivelEnsino").attr("disabled", true);
        //                             $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                             $("#intAnoSerie").attr("disabled", true);
        //                             $("#turmas").find("option[value=0]").attr("selected", true);
        //                             $("#turmas").attr("disabled", true);
        //                             $("#nivelEnsino").removeAttr("disabled");
        //                             $("#nivelEnsino").empty().html('<option value="-1">Ensino (Todos)</option>');
        //                             $(i.listaEnsino).each(function(j, k) {
        //                                 $("#nivelEnsino").append('<option value="' + k.idEnsino + '">' + k.strEnsino + "</option>")
        //                             });
        //                             idLoadedGlobal = false;
        //                             FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, f, -1, -1, -1, 0)
        //                         }
        //                     },
        //                     error: function(e) {
        //                         $("#nivelEnsino").empty().html('<option value="n/a">Erro</option>');
        //                         console.log(e.reseponseText)
        //                     }
        //                 })
        //             }
        //         });
        //         $("#nivelEnsino").live("change", function(i) {
        //             $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
        //             var f = parseInt($(this).val());
        //             var d = "";
        //             var g = "";
        //             if ($("#escolaRede").size() > 0) {
        //                 d = $("#escolaRede").val()
        //             } else {
        //                 d = 0
        //             }
        //             if ($("#unidades").size() > 0) {
        //                 g = $("#unidades").val()
        //             } else {
        //                 g = 0
        //             }
        //             if (d == 0 && g == 0) {
        //                 $("#nivelEnsino").removeAttr("disabled");
        //                 d = $("#idEscola").val()
        //             }
        //             if (f == -1) {
        //                 $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                 $("#intAnoSerie").attr("disabled", true);
        //                 $("#turmas").find("option[value=0]").attr("selected", true);
        //                 $("#turmas").attr("disabled", true);
        //                 idLoadedGlobal = false;
        //                 if (d == 0) {
        //                     d = -1
        //                 }
        //                 if (g == 0) {
        //                     g = -1
        //                 }
        //                 FiltrarTurmaCompleto("#ava_contentlista", b, "", d, g, f, -1, -1, 0)
        //             } else {
        //                 $.ajax({
        //                     url: "/ava/Barras/home/getAnoSerie?id=" + d + "&idUnidade=" + g + "&idEnsino=" + f,
        //                     type: "GET",
        //                     cache: false,
        //                     dataType: "json",
        //                     success: function(j) {
        //                         var e = parseInt(j.error);
        //                         if (e == 1) {
        //                             $("#intAnoSerie").empty().html('<option value="n/a">Erro</option>')
        //                         } else {
        //                             $("#intAnoSerie").find("option[value=0]").attr("selected", true);
        //                             $("#intAnoSerie").attr("disabled", true);
        //                             $("#turmas").find("option[value=0]").attr("selected", true);
        //                             $("#turmas").attr("disabled", true);
        //                             $("#intAnoSerie").removeAttr("disabled");
        //                             $("#intAnoSerie").empty().html('<option value="0">S&#233;rie (Todas)</option>');
        //                             $(j.listaSerie).each(function(k, l) {
        //                                 $("#intAnoSerie").append('<option value="' + l.idSerie + '">' + l.strSerie + "</option>")
        //                             });
        //                             idLoadedGlobal = false;
        //                             if (d == 0) {
        //                                 d = -1
        //                             }
        //                             if (g == 0) {
        //                                 g = -1
        //                             }
        //                             FiltrarTurmaCompleto("#ava_contentlista", b, "", d, g, f, -1, -1, 0)
        //                         }
        //                     },
        //                     error: function(e) {
        //                         $("#intAnoSerie").empty().html('<option value="n/a">Erro</option>');
        //                         console.log(e.responseText)
        //                     }
        //                 })
        //             }
        //         });
        //         $("#intAnoSerie").live("change", function(j) {
        //             $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
        //             var f = parseInt($(this).val());
        //             var g = $("#nivelEnsino").val();
        //             var d = "";
        //             var i = "";
        //             if ($("#escolaRede").size() > 0) {
        //                 d = $("#escolaRede").val()
        //             } else {
        //                 d = 0
        //             }
        //             if ($("#unidades").size() > 0) {
        //                 i = $("#unidades").val()
        //             } else {
        //                 i = 0
        //             }
        //             if (f == 0) {
        //                 $("#turmas").find("option[value=0]").attr("selected", true);
        //                 $("#turmas").attr("disabled", true);
        //                 idLoadedGlobal = false;
        //                 todosUsers = false;
        //                 if (d == 0) {
        //                     d = -1
        //                 }
        //                 if (i == 0) {
        //                     i = -1
        //                 }
        //                 if (f == 0) {
        //                     f = -1
        //                 }
        //                 FiltrarTurmaCompleto("#ava_contentlista", b, "", d, i, g, f, -1, 0)
        //             } else {
        //                 $.ajax({
        //                     url: "/ava/Barras/home/getTurmasByEscolaUnidadeEnsinoSerie?id=" + d + "&idUnidade=" + i + "&idEnsino=" + g + "&idSerie=" + f,
        //                     type: "GET",
        //                     cache: false,
        //                     dataType: "json",
        //                     success: function(k) {
        //                         var e = parseInt(k.error);
        //                         if (e == 0) {
        //                             $("#turmas").removeAttr("disabled");
        //                             $("#turmas").empty().html('<option value="0">Turmas (Todas)</option>');
        //                             $(k.listaTurmas).each(function(l, m) {
        //                                 $("#turmas").append('<option value="' + m.id + '">' + m.strNome + "</option>")
        //                             });
        //                             idLoadedGlobal = false;
        //                             if (d == 0) {
        //                                 d = -1
        //                             }
        //                             if (i == 0) {
        //                                 i = -1
        //                             }
        //                             FiltrarTurmaCompleto("#ava_contentlista", b, "", d, i, g, f, -1, 0)
        //                         } else {
        //                             if (e == 3) {
        //                                 $("#turmas").attr("disabled", true);
        //                                 $("#turmas").empty().html('<option value="0">Sem Turmas</option>');
        //                                 $("#listaCarteirinha").empty().html(k.msg)
        //                             } else {
        //                                 $("#turmas").empty().html('<option value="n/a">' + k.msg + "</option>")
        //                             }
        //                         }
        //                     },
        //                     error: function(e) {
        //                         console.log(e.responseText);
        //                         $("#turmas").empty().html('<option value="n/a">Erro</option>')
        //                     }
        //                 })
        //             }
        //         });
        //         $("#turmas").live("change", function(k) {
        //             $("#ava_contentlista").html('<img id="ava_loader" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
        //             var f = $("#intAnoSerie").val();
        //             var g = $("#nivelEnsino").val();
        //             var d = "";
        //             var j = "";
        //             if ($("#escolaRede").size() > 0) {
        //                 d = $("#escolaRede").val()
        //             } else {
        //                 d = 0
        //             }
        //             if ($("#unidades").size() > 0) {
        //                 j = $("#unidades").val()
        //             } else {
        //                 j = 0
        //             }
        //             var i = $(this).val();
        //             idLoadedGlobal = false;
        //             todosUsers = false;
        //             if (d == 0) {
        //                 d = -1
        //             }
        //             if (j == 0) {
        //                 j = -1
        //             }
        //             FiltrarTurmaCompleto("#ava_contentlista", b, "", d, j, g, f, i, 0)
        //         })
        //     })

    } 
    else {
        console.log('Else');
        $.getJSON(a, null, function(c) {
            var b = null;
            b = c.Result;
            GlobalPaginacaoContador = Object.keys(b).length;
            xmlGlobal = b;
            $("#myContentTemplate").tmpl(c).appendTo("#ava_contentlista");
            $("#ava_contentlista #ava_loader").css("display", "none")
        })
    }
    console.log('asaaaa');

}

function retornaJsonNovo(a, b) {
    console.log('Achou');
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
var xmlGlobalEstruturaEscola = null;

function retornaJsonEstruturaEscola(a) {
    $.getJSON(a, null, function(c) {
        var b = null;
        b = c.Result;
        xmlGlobalEstruturaEscola = b;
        $("#myContentTemplateEscola").tmpl(c).appendTo("#ava_escolaLista")
    })
}
var xmlGlobalGrupo = null;

function retornaJsonParticipantesGrupo(a) {
    $.getJSON(a, null, function(d) {
        var b = null;
        b = d.Result;
        xmlGlobalGrupo = b;
        var c = d.bolModerador;
        $("#myContentTemplate").tmpl(d).appendTo("#carteirinhaParticipante");
        $("#carteirinhaParticipante #ava_loader").css("display", "none");
        $("#txlFiltroParticipantes").live("keyup", function(f) {
            if ((f.which && f.which == 13) || (f.keyCode && f.keyCode == 13)) {
                f.preventDefault();
                return false
            }
            if ($(this).attr("idusuario")) {
                _id = $(this).attr("idusuario")
            } else {
                _id = 0
            }
            FiltrarUsuarioParticipanteGrupo("#carteirinhaParticipante", xmlGlobalGrupo, $(this).val(), _id, c)
        });
        $("#txlFiltroParticipantes").live("focus", function() {
            if ($(this).val() == "Filtrar por nome") {
                $(this).val("")
            }
        });
        $("#txlFiltroParticipantes").live("blur", function() {
            if ($(this).val() == "") {
                $(this).val("Filtrar por nome")
            }
        })
    })
}

function retornaJsonBuscaPessoas(b, a) {
    $.ajax({
        dataType: "json",
        type: "post",
        url: b,
        cache: false,
        data: {
            busca: a
        },
        success: function(c) {
            $("#ava_contentbuscapessoas #ava_loader").css("display", "none");
            if (c.Result.length > 0) {
                $("#myContentTemplate").tmpl(c).appendTo("#ava_contentbuscapessoas")
            } else {
                $("#ava_contentbuscapessoas").append("<div class='letter-spacing'>Nenhum resultado encontrado.</div>")
            }
            jaClicouNoBuscar = false
        },
        error: function(c) {
            console.debug(c);
            jaClicouNoBuscar = false
        }
    })
}
var jaClicouNoBuscar = false;

function procurarpessoas(c) {
    var a = $("#abrebuscapessoasaux");
    var b = function() {
        $("#txtPesquisaGeralAva").live("focus", function() {
            if ($(this).val() == "Procurar por nome") {
                $(this).val("")
            }
        });
        $("#txtPesquisaGeralAva").live("blur", function() {
            if ($(this).val() == "") {
                $(this).val("Procurar por nome")
            }
        });
        $("#buscarpessoas").bind("click", function() {
            $("#ava_contentbuscapessoas #ava_loader").css("display", "");
            $campo = $("#txtPesquisaGeralAva").val();
            if ($campo != "" || $campo != "Procurar por nome") {
                $("#ava_contentbuscapessoas div").remove();
                $urlBuscaPessoas = "/AVA/Barras/Home/PesquisaGeral/";
                retornaJsonBuscaPessoas($urlBuscaPessoas, $campo)
            }
        });
        $("#ava_loader").hide()
    };
    montaLightBox(a, b);
    $("#abrebuscapessoasaux").click()
}

function FiltrarUsuario(g, b, l, k) {
    $(g).html("");
    if (l) {
        var i = false;
        for (r = 0; r < b.length; r++) {
            if ((b[r].strNome.toLowerCase().indexOf(l.toLowerCase()) > -1) || (b[r].strApelido.toLowerCase().indexOf(l.toLowerCase()) > -1) || (retira_acentos(b[r].strNome).toLowerCase().indexOf(l.toLowerCase()) > -1) || (retira_acentos(b[r].strApelido).toLowerCase().indexOf(l.toLowerCase()) > -1)) {
                if (b[r].id != k) {
                    i = true;
                    var f = "";
                    f = populaFiltro(b[r]);
                    $(g).append(strBuilder)
                }
            }
        }
        if (!i) {
            var c = $("#titListaUsuariosAva").clone();
            c.find("span").remove();
            var a = c.text();
            var d = "'" + l + "'";
            $(g).html('<span class="letter-spacing">Nenhum resultado encontrado na pesquisa de ' + a + '. Que tal pesquisar <a class="link" href="javascript: procurarpessoas(' + d + ')"> outros tipos de usuï¿½rios?</a></span>')
        }
    } else {
        for (r = 0; r < b.length; r++) {
            var f = "";
            if (b[r].id != k) {
                f = populaFiltro(b[r]);
                $(g).append(strBuilder)
            }
        }
    }
}

function FiltrarUsuarioParticipanteGrupo(k, c, g, b, d) {
    $(k).html("");
    if (g) {
        var i = false;
        for (r = 0; r < c.length; r++) {
            if ((c[r].strNome.toLowerCase().indexOf(g.toLowerCase()) > -1) || (c[r].strApelido.toLowerCase().indexOf(g.toLowerCase()) > -1) || (retira_acentos(c[r].strNome).toLowerCase().indexOf(g.toLowerCase()) > -1) || (retira_acentos(c[r].strApelido).toLowerCase().indexOf(g.toLowerCase()) > -1)) {
                if (c[r].id != b) {
                    i = true;
                    var a = "";
                    a = populaFiltroParticipanteGrupo(c[r], d);
                    $(k).append(a)
                }
            }
        }
        if (!i) {
            var f = "'" + g + "'";
            $(k).html('<span class="letter-spacing">Nenhum resultado encontrado. Que tal <a href="javascript: procurarpessoas(' + f + ')">procurar pessoas?</a></span>')
        }
    } else {
        for (r = 0; r < c.length; r++) {
            var a = "";
            if (c[r].id != b) {
                a = populaFiltroParticipanteGrupo(c[r], d);
                $(k).append(a)
            }
        }
    }
}

//parametros: container, xml, pesquisa, idEscola, idUnidade, idCurso, idSerie, idTurma, somenteturmasdoprof
function FiltrarTurmaCompleto(k, b, A, q, n, l, d, v, a) {

    console.log('Filtrou');

    // FiltrarTurmaCompleto("#ava_contentlista", b, "", -1, -1, -1, -1, -1, 0)


    $(k).html("");
    if (A) {
        var p = false;
        for (r = 0; r < b.length; r++) {
            if ((b[r].strNome.toLowerCase().indexOf(A.toLowerCase()) > -1) || (b[r].strApelido.toLowerCase().indexOf(A.toLowerCase()) > -1) || (retira_acentos(b[r].strNome).toLowerCase().indexOf(A.toLowerCase()) > -1) || (retira_acentos(b[r].strApelido).toLowerCase().indexOf(A.toLowerCase()) > -1)) {
                if (b[r].id != q) {
                    p = true;
                    var i = "";
                    i = populaFiltroTurma(b[r]);
                    $(k).append(strBuilder)
                }
            }
        }
        if (!p) {
            var f = "'" + A + "'";
            $(k).html('<span class="letter-spacing">Nenhum resultado encontrado.</span>')
        }
    }
    else {
        if (A == "" && q == -1 && n == -1 && l == -1 && d == -1 && v == -1 && a == 0) {
            for (r = 0; r < b.length; r++) {
                var i = "";
                if (b[r].id != q) {
                    i = populaFiltroTurma(b[r]);
                    $(k).append(strBuilder)
                }
            }
        } else {
            for (r = 0; r < b.length; r++) {
                var i = "";
                if (q == -1 || (q != -1 && b[r].idEscola == q)) {
                    if (n == 0 || n == -1 || (n != -1 && b[r].idUnidade == n)) {
                        if (l == -1 || (l != -1 && b[r].idCurso == l)) {
                            if (d == -1 || (d != -1 && b[r].idSerie == d)) {
                                if (v == -1 || (v != -1 && b[r].id == v)) {
                                    if (a == 0 || (a != 0 && b[r].idMinhaTurma > 0)) {
                                        i = populaFiltroTurma(b[r])
                                    }
                                    else{
                                        i = populaFiltroTurma(b[r]);
                                    }
                                    $(k).append(i);
                                    xmlGlobalFiltroTurmas = i
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function populaFiltroParticipanteGrupo(b, c) {
    var a = "";
    var d = "";
    a = '<div class="carteirinha" id="cart_' + b.id + '"><div class="Feed_full" style="display:none" id="boxExcluirPart_' + b.id + '"><p>Deseja remover esse usuï¿½rio do grupo?</p><div class="acoesFeed"><a href="javascript: void(0);" class="bt_normal green exc_usuario_grupo">Sim</a><a href="javascript: void(0);" class="bt_normal red naoexc_usuario_grupo">Nï¿½o</a></div></div>';
    '<div class="in_cT"><span class="ava_clips"></span>';
    if (b.papelUsuario.bolEducador) {
        a = a + '<div class="souProf"><span>Professor</span></div>'
    }
    if (c && (b.bolParticipante || b.bolMediador)) {
        a = a + '<a href="javascript:void(0);" class="excluir_usuario_grupo FontAwesome" ide="' + b.id + '" idGrupo="' + b.idGrupo + '"></a>'
    }
    if (b.strFoto.length <= 0) {
        d = "/AVA/StaticContent/Common/img/perfil/avatar.jpg"
    } else {
        d = b.strFoto
    }
    a = a + '<a href="/AVA/Perfil/Home/Index/' + b.strLogin + '" class="cart_nome tooltip_title"><img src="' + d + '" width="55" height="55" alt="' + (b.strApelido.length > 0 ? b.strApelido : b.strNome) + '"><div class="cart_so_nome">' + b.strNome + "</div></a>";
    if (c) {
        if (b.bolMediador) {
            a = a + '<a id="btprom_' + b.id + '" href="javascript: despromoverParticipanteGrupo(' + b.id + ", " + b.idGrupo + ')" class="mediador">mediador</a>'
        } else {
            if (b.bolParticipante) {
                a = a + '<a id="btprom_' + b.id + '" href="javascript: promoverParticipanteGrupo(' + b.id + ", " + b.idGrupo + ')" class="tornar_mediador">Promover a mediador</a>'
            }
        }
    }
    a = a + "</div></div>";
    return a
}

function populaFiltro(b) {
    var a = "";
    var c = "";
    strBuilder = '<div class="carteirinha" id="cart_' + b.id + '"><div class="in_cT">';
    if (b.bolEducador) {
        strBuilder += '<div class="souProf"><span>Professor</span></div>'
    }
    if (b.strFoto.length <= 0) {
        c = "/AVA/StaticContent/Common/img/perfil/avatar.jpg"
    } else {
        c = b.strFoto
    }
    if (b.strApelido.length > 0) {
        strNome = b.strApelido
    } else {
        strNome = b.strNome
    }
    if (strNome.lenght > 10) {
        strNome = strNome.substring(0, 9)
    }
    strBuilder += '<a href="/AVA/Perfil/Home/Index/' + b.strLogin + '"><img src="' + c + '" width="55" height="55" alt="avatar"><span>' + strNome + "</span></a>";
    if (b.bolSigoAuto && b.idSeguidor != b.id) {
        strBuilder += '<a class=" bt_seguir s_IdoForever txtSeguindoBloqueadoModal" href="#">Seguindo<span class="fontello icoSeguindo"></span></a>'
    } else {
        if (b.bolPossoSeguir && !b.bolEstouSeguindo && b.idSeguidor != b.id) {
            strBuilder += '<a id="btseg_' + b.id + '" class="bt_seguir s_Indo" href="javascript: seguir(' + b.idSeguidor + "," + b.id + ')">seguir<span class="fontello icoSeguir"></span></a>'
        } else {
            if (b.bolPossoSeguir && b.bolEstouSeguindo && b.idSeguidor != b.id) {
                strBuilder += '<a id="btseg_' + b.id + '" href="javascript: parardeseguir(' + b.idSeguidor + "," + b.id + ')" class="bt_seguir"><span class="ava_seguindo"></span><span class="ava_parardeseguir">parar de seguir</span><span class="fontello icoPararSeguir"></span></a>'
            }
        }
    }
    strBuilder += "</div></div>";
    return strBuilder
}

function populaFiltroTurma(b) {
    var a = "";
    var c = "";
    strBuilder = '<a href="' + b.UrlGrupo + '">';
    strBuilder += '<div class="carteirinha turma" id="cart_' + b.id + '" title="' + b.strNome + '"><div class="in_cT">';
    if (b.strNome.lenght > 10) {
        strNome = b.strNome.substring(0, 9)
    } else {
        strNome = b.strNome
    }
    strBuilder += '<img src="' + b.strFoto + '" /><span>' + strNome + "</span>";
    strBuilder += "</div></div></a>";
    return strBuilder
}

function PopulaFiltroCursos(a) {
    $.ajax({
        dataType: "json",
        type: "get",
        url: a,
        success: function(b) {
            xml = b.Result;
            strBuilder = "";
            strBuilder += '<option value="-1">Nï¿½vel de ensino</option>';
            for (r = 0; r < xml.length; r++) {
                if (xml[r].strCurso.lenght > 10) {
                    strCurso = xml[r].strCurso.substring(0, 9)
                } else {
                    strCurso = xml[r].strCurso
                }
                strBuilder += '<option value="' + xml[r].idCurso + '">' + strCurso + "</option>"
            }
            $("#nivelEnsino").html(strBuilder)
        },
        error: function(b) {
            alert("erro ao carregar cursos")
        }
    })
}

function PopulaFiltroSeries(a) {
    $.ajax({
        dataType: "json",
        type: "get",
        url: a,
        success: function(b) {
            xml = b.Result;
            strBuilder = "";
            strBuilder += '<option value="-1">Sï¿½ries</option>';
            for (r = 0; r < xml.length; r++) {
                if (xml[r].strSerie.lenght > 10) {
                    strSerie = xml[r].strSerie.substring(0, 9)
                } else {
                    strSerie = xml[r].strSerie
                }
                strBuilder += '<option value="' + xml[r].idSerie + '">' + strSerie + "</option>"
            }
            $("#idSerie").html(strBuilder)
        },
        error: function(b) {
            alert("erro ao carregar sï¿½ries")
        }
    })
}

function PopulaFiltroTurmas(a) {
    $.ajax({
        dataType: "json",
        type: "get",
        url: a,
        success: function(b) {
            xml = b.Result;
            strBuilder = "";
            strBuilder += '<option value="-1">Turmas</option>';
            for (r = 0; r < xml.length; r++) {
                if (xml[r].strNome.lenght > 10) {
                    strTurma = xml[r].strNome.substring(0, 9)
                } else {
                    strTurma = xml[r].strNome
                }
                strBuilder += '<option value="' + xml[r].id + '">' + strTurma + "</option>"
            }
            $("#idTurma").html(strBuilder)
        },
        error: function(b) {
            alert("erro ao carregar turmas")
        }
    })
}

function montaLightBox(b, d) {
    var a = 700;
    var c = 470;
    if (b.find("abrebuscapessoasaux")) {
        a = 900;
        c = 530
    }
    var e = {
        autoSize: false,
        width: a,
        height: c,
        autoResize: false,
        fitToView: false,
        afterShow: d,
        type: "ajax",
        helpers: {
            overlay: {
                locked: false
            }
        }
    };
    lightBoxAVA(b, e)
}

function carregaEducadores(b) {

    

    $("#sEducadores").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    if (idUsuarioCript != 0) {
        try {
            var c = $.jStorage.get("listaEducadores" + b + idUsuarioPraCachear)
        } catch (d) {
            var c = ""
        }

        $.ajax({
            url: "/AVA/Barras/Home/EscondeEducadores/"+b,
            cache: false,
            success: function(h) {
                try{
                    if(h.bolEVisitante){
                        $("#sEducadores").hide();
                    }
                }
                catch(err){

                }
                finally{


                    if (!c) {
                        $urlEducadores = "/AVA/Barras/Home/Educadores/" + b;
                        $.ajax({
                            url: $urlEducadores,
                            data: "strLogin=" + b,
                            cache: false,
                            success: function(g) {
            
                                
            
                                c = g;
                                $("#sEducadores").html(c);
                                $("#vertodoseducadores").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=1");
                                var f = $("#vertodoseducadores");
                                var i = {
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
                                        $("#main_ava").hide();
                                        $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + b + "&strLogin=" + b + "&idTurma=";
                                        retornaJson($urlEducCompleto);
                                        $(".ava_lightcontent").scroll(function() {
                                            if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                                                idLoadedGlobal = true;
                                                GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                                                GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                                                $.fancybox.showLoading();
                                                $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + b + "&strLogin=" + b + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                                                retornaJsonNovo($urlEducCompleto, "scrollMode")
                                            }
                                        });
                                        filtrarPessoas()
            
                                        
                                    },
                                    helpers: {
                                        overlay: {
                                            locked: false
                                        }
                                    }
                                };
                                lightBoxAVA(f, i);
                                $(".aes1 header h1 .thumbs_lists").click(function(j) {
                                    j.preventDefault();
                                    $strClass = $(".aes1 ul").attr("class");
                                    if ($strClass == "clearfix thumbs") {
                                        $(".aes1 ul").attr("class", "clearfix");
                                        $(".aes1 ul li").prepend('<div class="white_shadow"></div>');
                                        $(this).attr("class", "thumbs_lists lists")
                                    } else {
                                        $(".aes1 ul").attr("class", "clearfix thumbs");
                                        $(".aes1 ul li").find("div").remove();
                                        $(this).attr("class", "thumbs_lists thumbs")
                                    }
                                })
                            },
                            error: function(f) {
                                if (f.status == 0) {
                                    $("#sEducadores").empty();
                                    istaEducadoresValue = "empty"
                                } else {
                                    c = "erro ao buscar educadores"
                                }
                            }
                        })
            
            
                        console.log("_controller "+_controller);
                        console.log("idUsuarioPublico "+idUsuarioPublico);
                        console.log("intTipoPerfil "+ intTipoPerfil);
                        console.log("_action "+_action);
            
                        
                    } else {
            
                        $("#sEducadores").html(c);
                        $("#vertodoseducadores").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=1");
                        var a = $("#vertodoseducadores");
                        var e = {
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
                                $("#main_ava").hide();
                                $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + b + "&strLogin=" + b + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                                retornaJson($urlEducCompleto);
                                $(".ava_lightcontent").scroll(function() {
                                    var f = $(this).scrollTop();
                                    if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
                                        $("#ava_loader").show();
                                        GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                                        GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                                        $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + b + "&strLogin=" + b + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                                        window.setTimeout(retornaJson($urlEducCompleto), 10000)
                                    }
                                })
                            },
                            helpers: {
                                overlay: {
                                    locked: false
                                }
                            }
                        };
                        lightBoxAVA(a, e);
                        $(".aes1 header h1 .thumbs_lists").click(function(f) {
                            f.preventDefault();
                            $strClass = $(".aes1 ul").attr("class");
                            if ($strClass == "clearfix thumbs") {
                                $(".aes1 ul").attr("class", "clearfix");
                                $(".aes1 ul li").prepend('<div class="white_shadow"></div>');
                                $(this).attr("class", "thumbs_lists lists")
                            } else {
                                $(".aes1 ul").attr("class", "clearfix thumbs");
                                $(".aes1 ul li").find("div").remove();
                                $(this).attr("class", "thumbs_lists thumbs")
                            }
                        })
                    }
                

                }

            },
            error: function(h) {
                console.log(h);
            }
        });

      
       
        
    } else {
        $urlEducadores = "/AVA/Barras/Home/Educadores/" + b;
        $.ajax({
            url: $urlEducadores,
            data: "strLogin=" + b,
            cache: false,
            success: function(g) {
                $("#sEducadores").html(g);
                $("#sEducadores").html(c);
                $("#vertodoseducadores").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=1");
                var f = $("#vertodoseducadores");
                var i = {
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
                        $("#main_ava").hide();
                        $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + b + "&strLogin=" + b + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                        retornaJson($urlEducCompleto);
                        $(window).scroll(function() {
                            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                                GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                                GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                                $("div#loadmoreajaxloader").show();
                                $urlEducCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=1&idPublico=" + b + "&strLogin=" + b + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                                window.setTimeout(retornaJson($urlEducCompleto), 10000);
                                window.setTimeout(retornaJson($urlEducCompleto), 10000)
                            }
                        })
                    },
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    }
                };
                lightBoxAVA(f, i);
                $(".aes1 header h1 .thumbs_lists").click(function(j) {
                    j.preventDefault();
                    $strClass = $(".aes1 ul").attr("class");
                    if ($strClass == "clearfix thumbs") {
                        $(".aes1 ul").attr("class", "clearfix");
                        $(".aes1 ul li").prepend('<div class="white_shadow"></div>');
                        $(this).attr("class", "thumbs_lists lists")
                    } else {
                        $(".aes1 ul").attr("class", "clearfix thumbs");
                        $(".aes1 ul li").find("div").remove();
                        $(this).attr("class", "thumbs_lists thumbs")
                    }
                })
            },
            error: function(f) {
                if (f.status == 0) {
                    $("#sEducadores").empty()
                } else {
                    $("#sEducadores").html("erro ao buscar educadores")
                }
            }
        })
    
    }



}

function carregaTurma(c) {
    if (typeof e != "undefined") {
        return
    }
    var i = location.pathname.toLowerCase();
    var e = i.endsWith("mural") || i.endsWith("mural/") || i.endsWith("mural/home") || i.endsWith("mural/home/") || i.endsWith("mural/home/index") || i.endsWith("mural/home/index/");
    if (e) {
        return
    }
    $(".vertodosEscola").css("cursor", "pointer");
    $urlTurma = "/AVA/Barras/Home/Turma/";
    var a = 0;
    if (idUsuarioCript != 0) {
        try {
            var d = $.jStorage.get("carregaTurma" + c + idUsuarioPraCachear)
        } catch (f) {
            var d = ""
        }
        if (!d) {
            $.ajax({
                url: $urlTurma,
                data: "strLogin=" + c,
                success: function(k) {
                    $("#sTurma .loader").hide();
                    d = k;
                    $("#sTurma").html(d);
                    $(".aes2 header a.thumbs_lists").click(function(l) {
                        l.preventDefault();
                        $strClass = $(".aes2 ul").attr("class");
                        if ($strClass == "clearfix thumbs") {
                            $(".aes2 ul").attr("class", "clearfix");
                            $(".aes2 ul li").prepend('<div class="white_shadow"></div>');
                            $(this).attr("class", "thumbs_lists lists")
                        } else {
                            $(".aes2 ul").attr("class", "clearfix thumbs");
                            $(".aes2 ul li").find("div").remove();
                            $(this).attr("class", "thumbs_lists thumbs")
                        }
                    });
                    try {
                        $.jStorage.set("carregaTurma" + c + idUsuarioPraCachear, d);
                        $.jStorage.setTTL("carregaTurma" + c + idUsuarioPraCachear, 600000)
                    } catch (j) {}
                },
                error: function(j) {
                    if (j.status == 0) {
                        $("#sTurma").empty()
                    } else {
                        d = "erro ao buscar Turma/Aluno Turma"
                    }
                }
            });
            $(".vertodosEscola").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7");
            var b = $(".vertodosEscola");
            var g = {
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
                    $idTurma = $(this).find("img").attr("idTurma");
                    $urlTurmaCompleta = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=7&idPublico=&strLogin=" + c + "&idTurma=0";
                    console.log('Daqui vem a parada!!');
                    console.log($urlTurmaCompleta);
                    retornaJson($urlTurmaCompleta);
                    $(".scroll_cart_turmas").mCustomScrollbar()
                },
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            };
            lightBoxAVA(b, g)
        } else {
            $("#sTurma").html(d);
            $(".vertodosEscola").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7");
            var b = $(".vertodosEscola");
            var g = {
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
                    $idTurma = $(this).find("img").attr("idTurma");
                    $urlTurmaCompleta = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=7&idPublico=&strLogin=" + c + "&idTurma=0";
                    retornaJson($urlTurmaCompleta);
                    $(".scroll_cart_turmas").mCustomScrollbar()
                },
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            };
            lightBoxAVA(b, g);
            $(".aes2 header a.thumbs_lists").click(function(j) {
                j.preventDefault();
                $strClass = $(".aes2 ul").attr("class");
                if ($strClass == "clearfix thumbs") {
                    $(".aes2 ul").attr("class", "clearfix");
                    $(".aes2 ul li").prepend('<div class="white_shadow"></div>');
                    $(this).attr("class", "thumbs_lists lists")
                } else {
                    $(".aes2 ul").attr("class", "clearfix thumbs");
                    $(".aes2 ul li").find("div").remove();
                    $(this).attr("class", "thumbs_lists thumbs")
                }
            })
        }
    } else {
        $.ajax({
            url: $urlTurma,
            data: "strLogin=" + c,
            success: function(k) {
                $("#sTurma").html(k);
                $(".vertodosEscola").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7");
                var j = $(".vertodosEscola");
                var l = {
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
                        $idTurma = $(this).find("img").attr("idTurma");
                        $urlTurmaCompleta = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=7&idPublico=&strLogin=" + c + "&idTurma=0";
                        retornaJson($urlTurmaCompleta);
                        $(".scroll_cart_turmas").mCustomScrollbar()
                    },
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    }
                };
                lightBoxAVA(j, l);
                $(".aes2 header a.thumbs_lists").click(function(m) {
                    m.preventDefault();
                    $strClass = $(".aes2 ul").attr("class");
                    if ($strClass == "clearfix thumbs") {
                        $(".aes2 ul").attr("class", "clearfix");
                        $(".aes2 ul li").prepend('<div class="white_shadow"></div>');
                        $(this).attr("class", "thumbs_lists lists")
                    } else {
                        $(".aes2 ul").attr("class", "clearfix thumbs");
                        $(".aes2 ul li").find("div").remove();
                        $(this).attr("class", "thumbs_lists thumbs")
                    }
                })
            },
            error: function(j) {
                if (j.status == 0) {
                    $("#sTurma").empty()
                } else {
                    $("#sTurma").html("erro ao buscar Turma/Aluno Turma")
                }
            }
        })
    }
}

function CarregaFilhos() {
    $("#sFilhos").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />").css("display", "");
    if (idUsuarioCript != 0) {
        try {
            var b = $.jStorage.get("listaFilhos" + idUsuarioPraCachear)
        } catch (a) {
            var b = ""
        }
        if (!b) {
            $.ajax({
                url: "/AVA/Barras/Home/Filhos/",
                data: {
                    strLogin: idUsuarioPublico
                },
                cache: false,
                success: function(d) {
                    b = d;
                    $("#sFilhos").html(b);
                    $(".aes5 header h1 .thumbs_lists").click(function(f) {
                        f.preventDefault();
                        $strClass = $(".aes5 ul").attr("class");
                        if ($strClass == "clearfix thumbs") {
                            $(".aes5 ul").attr("class", "clearfix lists");
                            $(".aes5 ul li").prepend('<div class="white_shadow"></div>');
                            $(this).attr("class", "thumbs_lists lists")
                        } else {
                            $(".aes5 ul").attr("class", "clearfix thumbs");
                            $(".aes5 ul li").find("div").remove();
                            $(this).attr("class", "thumbs_lists thumbs")
                        }
                    });
                    try {
                        $.jStorage.set("listaFilhos" + idUsuarioPraCachear, b);
                        $.jStorage.setTTL("listaFilhos" + idUsuarioPraCachear, 600000)
                    } catch (c) {}
                },
                error: function(c) {
                    if (c.status == 0) {
                        $("#sFilhos").empty()
                    } else {
                        b = "erro ao buscar filhos"
                    }
                }
            })
        } else {
            $("#sFilhos").html(b);
            $(".aes5 header h1 .thumbs_lists").click(function(c) {
                c.preventDefault();
                $strClass = $(".aes5 ul").attr("class");
                if ($strClass == "clearfix thumbs") {
                    $(".aes5 ul").attr("class", "clearfix lists");
                    $(".aes5 ul li").prepend('<div class="white_shadow"></div>');
                    $(this).attr("class", "thumbs_lists lists")
                } else {
                    $(".aes5 ul").attr("class", "clearfix thumbs");
                    $(".aes5 ul li").find("div").remove();
                    $(this).attr("class", "thumbs_lists thumbs")
                }
            })
        }
    } else {
        $.ajax({
            url: "/AVA/Barras/Home/Filhos/",
            data: {
                strLogin: idUsuarioPublico
            },
            cache: false,
            success: function(c) {
                $("#sFilhos").html(c);
                $(".aes5 header h1 .thumbs_lists").click(function(d) {
                    d.preventDefault();
                    $strClass = $(".aes5 ul").attr("class");
                    if ($strClass == "clearfix thumbs") {
                        $(".aes5 ul").attr("class", "clearfix lists");
                        $(".aes5 ul li").prepend('<div class="white_shadow"></div>');
                        $(this).attr("class", "thumbs_lists lists")
                    } else {
                        $(".aes5 ul").attr("class", "clearfix thumbs");
                        $(".aes5 ul li").find("div").remove();
                        $(this).attr("class", "thumbs_lists thumbs")
                    }
                })
            },
            error: function(c) {
                if (c.status == 0) {
                    $("#sFilhos").empty()
                } else {
                    b = "erro ao buscar filhos"
                }
            }
        })
    }
}

function CarregaSeguidos() {
    if (idUsuarioCript != 0) {
        try {
            var b = $.jStorage.get("seguidos" + idUsuarioPraCachear)
        } catch (c) {
            var b = ""
        }
        if (!b) {
            $urlSeguidos = "/AVA/Barras/Home/Seguidos/" + idUsuarioPublico;
            $.ajax({
                url: $urlSeguidos,
                data: "strLogin=" + idUsuarioPublico,
                cache: false,
                success: function(f) {
                    GlobalResultsBuscaPessoas = "";
                    GlobalTotalResultsBuscaPessoas = 0;
                    GlobalPaginacaoModalInicio = 1;
                    GlobalPaginacaoModalFim = 12;
                    idLoadedGlobal = false;
                    if (f[0] != "0") {
                        b = f;
                        $("#sSeguidos").html(b).show();
                        $("#vertodosseguidos").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=2");
                        var e = $("#vertodosseguidos");
                        var g = {
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
                                $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=";
                                retornaJson($urlSeguidosCompleto);
                                $(".ava_lightcontent").scroll(function() {
                                    if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                                        idLoadedGlobal = true;
                                        GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                                        GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                                        $.fancybox.showLoading();
                                        var i = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                                        retornaJsonNovo(i, "scrollMode")
                                    }
                                });
                                filtrarPessoas()
                            },
                            helpers: {
                                overlay: {
                                    locked: false
                                }
                            }
                        };
                        lightBoxAVA(e, g);
                        $(".aes3 header h1 .thumbs_lists").click(function(i) {
                            i.preventDefault();
                            $strClass = $(".aes3 ul").attr("class");
                            if ($strClass == "clearfix thumbs") {
                                $(".aes3 ul").attr("class", "clearfix");
                                $(".aes3 ul li").prepend('<div class="white_shadow"></div>');
                                $(this).attr("class", "thumbs_lists lists")
                            } else {
                                $(".aes3 ul").attr("class", "clearfix thumbs");
                                $(".aes3 ul li").find("div").remove();
                                $(this).attr("class", "thumbs_lists thumbs")
                            }
                        });
                        $.jStorage.set("seguidos" + idUsuarioPraCachear, b);
                        $.jStorage.setTTL("seguidos" + idUsuarioPraCachear, 600000)
                    }
                },
                error: function(e) {
                    if (e.status == 0) {
                        $("#sSeguidos").empty()
                    } else {
                        $("#sSeguidos").html("erro ao buscar seguidos")
                    }
                }
            })
        } else {
            $("#sSeguidos").html(b).show();
            $("#vertodosseguidos").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=2");
            var a = $("#vertodosseguidos");
            var d = {
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
                    GlobalResultsBuscaPessoas = "";
                    GlobalTotalResultsBuscaPessoas = 0;
                    GlobalPaginacaoModalInicio = 1;
                    GlobalPaginacaoModalFim = 12;
                    idLoadedGlobal = false;
                    $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=";
                    retornaJson($urlSeguidosCompleto);
                    $(".ava_lightcontent").scroll(function() {
                        if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                            idLoadedGlobal = true;
                            GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                            GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                            $.fancybox.showLoading();
                            var e = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                            retornaJsonNovo(e, "scrollMode")
                        }
                    });
                    filtrarPessoas()
                },
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            };
            lightBoxAVA(a, d);
            $(".aes3 header h1 .thumbs_lists").click(function(f) {
                f.preventDefault();
                $strClass = $(".aes3 ul").attr("class");
                if ($strClass == "clearfix thumbs") {
                    $(".aes3 ul").attr("class", "clearfix");
                    $(".aes3 ul li").prepend('<div class="white_shadow"></div>');
                    $(this).attr("class", "thumbs_lists lists")
                } else {
                    $(".aes3 ul").attr("class", "clearfix thumbs");
                    $(".aes3 ul li").find("div").remove();
                    $(this).attr("class", "thumbs_lists thumbs")
                }
            })
        }
    } else {
        $urlSeguidos = "/AVA/Barras/Home/Seguidos/" + idUsuarioPublico;
        $.ajax({
            url: $urlSeguidos,
            data: "strLogin=" + idUsuarioPublico,
            cache: false,
            success: function(f) {
                if (f[0] != "0") {
                    GlobalResultsBuscaPessoas = "";
                    GlobalTotalResultsBuscaPessoas = 0;
                    GlobalPaginacaoModalInicio = 1;
                    GlobalPaginacaoModalFim = 12;
                    idLoadedGlobal = false;
                    $("#sSeguidos").html(f).show();
                    $("#vertodosseguidos").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=2");
                    var e = $("#vertodosseguidos");
                    var g = {
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
                            $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=&intInicio=1&intFim=12";
                            retornaJson($urlSeguidosCompleto);
                            $(".ava_lightcontent").scroll(function() {
                                if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                                    idLoadedGlobal = true;
                                    GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                                    GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                                    $.fancybox.showLoading();
                                    var i = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=2&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                                    retornaJsonNovo(i, "scrollMode")
                                }
                            });
                            filtrarPessoas()
                        },
                        helpers: {
                            overlay: {
                                locked: false
                            }
                        }
                    };
                    lightBoxAVA(e, g);
                    $(".aes3 header h1 .thumbs_lists").click(function(i) {
                        i.preventDefault();
                        $strClass = $(".aes3 ul").attr("class");
                        if ($strClass == "clearfix thumbs") {
                            $(".aes3 ul").attr("class", "clearfix");
                            $(".aes3 ul li").prepend('<div class="white_shadow"></div>');
                            $(this).attr("class", "thumbs_lists lists")
                        } else {
                            $(".aes3 ul").attr("class", "clearfix thumbs");
                            $(".aes3 ul li").find("div").remove();
                            $(this).attr("class", "thumbs_lists thumbs")
                        }
                    })
                }
            },
            error: function(e) {
                if (e.status == 0) {
                    $("#sSeguidos").empty()
                } else {
                    $("#sSeguidos").html("erro ao buscar seguidos")
                }
            }
        })
    }
}

function filtrarPessoas() {
    $("#filtrarPessoas").on("click", function() {
        $pesquisa = $("#txtFiltroAva").val();
        $id = $("#idAux").val();
        $tipo = $("#tipo").val();
        if ($pesquisa == "" || $pesquisa == "Pesquisar por nome") {
            alert("Informe um nome para pesquisa")
        } else {
            $.fancybox.showLoading();
            $.ajax({
                type: "POST",
                url: "/AVA/Barras/Home/PesquisaPorNome?id=" + $id + "&busca=" + $pesquisa + "&tipo=" + $tipo,
                async: true,
                success: function(a) {
                    xml = a.Result;
                    $totalResults = Object.keys(xml).length;
                    removeCarteirinhas("ava_contentlista");
                    if ($totalResults > 0) {
                        $mensagem = "<p>Exibindo " + $totalResults + " resultados de busca para <strong>" + $pesquisa + "</strong></p>";
                        $("#exibe_resultado_combo p").remove();
                        $("#exibe_resultado_combo").prepend($mensagem);
                        $("#voltarListaPesquisa").show();
                        $("#myContentTemplate").tmpl(a).appendTo("#ava_contentlista");
                        idLoadedGlobal = true;
                        $.fancybox.hideLoading();
                        $(".limpa_pesquisa").show()
                    } else {
                        $("#exibe_resultado_combo p").remove();
                        $("#exibe_resultado_combo").prepend("<p>Nenhum resultado encontrado.</p>");
                        $("#voltarListaPesquisa").show();
                        $(".limpa_pesquisa").show();
                        $.fancybox.hideLoading()
                    }
                },
                error: function(a) {
                    $("#ava_contentlista").append("<div class='letter-spacing'>Erro ao pesquisar pessoas.</div>")
                }
            })
        }
    })
}

function CarregaComplementoSeguidores() {
    $("#vertodosseguidores").attr("href", "/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=3");
    var a = $("#vertodosseguidores");
    var b = {
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
            GlobalResultsBuscaPessoas = "";
            GlobalTotalResultsBuscaPessoas = 0;
            GlobalPaginacaoModalInicio = 1;
            GlobalPaginacaoModalFim = 12;
            idLoadedGlobal = false;
            $urlSeguidoresCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=3&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=";
            retornaJson($urlSeguidoresCompleto);
            $(".ava_lightcontent").scroll(function() {
                if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                    idLoadedGlobal = true;
                    GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                    GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;
                    $.fancybox.showLoading();
                    var c = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=3&idPublico=" + idUsuarioPublico + "&strLogin=" + idUsuarioPublico + "&idTurma=&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                    retornaJsonNovo(c, "scrollMode")
                }
            });
            filtrarPessoas()
        },
        helpers: {
            overlay: {
                locked: false
            }
        }
    };
    lightBoxAVA(a, b);
    $(".aes4 header h1 .thumbs_lists").click(function(c) {
        c.preventDefault();
        $strClass = $(".aes4 ul").attr("class");
        if ($strClass == "clearfix thumbs") {
            $(".aes4 ul").attr("class", "clearfix");
            $(".aes4 ul li").prepend('<div class="white_shadow"></div>');
            $(this).attr("class", "thumbs_lists lists")
        } else {
            $(".aes4 ul").attr("class", "clearfix thumbs");
            $(".aes4 ul li").find("div").remove();
            $(this).attr("class", "thumbs_lists thumbs")
        }
    })
}

function carregarMediadores(a) {
    if (idUsuarioCript != 0) {
        try {
            var c = $.jStorage.get("carregaMediadores" + a + idUsuarioPraCachear)
        } catch (b) {
            var c = ""
        }
        carregaMediadores = "";
        if (!carregaMediadores) {
            $.ajax({
                url: "/AVA/Barras/Home/ParticipantesGrupo",
                cache: false,
                data: {
                    id: a,
                    tipo: 1
                },
                success: function(e) {
                    c = e;
                    $("#sMediadoresGrupo").html(c);
                    $(".aes6 header a.thumbs_lists").click(function(f) {
                        f.preventDefault();
                        $strClass = $(".aes6 ul").attr("class");
                        if ($strClass == "clearfix thumbs") {
                            $(".aes6 ul").attr("class", "clearfix");
                            $(".aes6 ul li").prepend('<div class="white_shadow"></div>');
                            $(this).attr("class", "thumbs_lists lists")
                        } else {
                            $(".aes6 ul").attr("class", "clearfix thumbs");
                            $(".aes6 ul li").find("div").remove();
                            $(this).attr("class", "thumbs_lists thumbs")
                        }
                    });
                    try {
                        $.jStorage.set("carregaMediadores" + a + idUsuarioPraCachear, c);
                        $.jStorage.setTTL("carregaMediadores" + a + idUsuarioPraCachear, 600000)
                    } catch (d) {}
                    if ($("body").data("bolclube") == 1) {
                        $("#interroga_mediador").hide()
                    }
                },
                error: function(d) {
                    if (d.status == 0) {
                        $("#sMediadoresGrupo").empty()
                    } else {
                        c = "erro ao buscar mediadores do grupo"
                    }
                }
            })
        } else {
            $("#sMediadoresGrupo").html(c);
            if ($("body").data("bolclube") == 1) {
                $("#interroga_mediador").hide()
            }
            $(".aes6 header a.thumbs_lists").click(function(d) {
                d.preventDefault();
                $strClass = $(".aes6 ul").attr("class");
                if ($strClass == "clearfix thumbs") {
                    $(".aes6 ul").attr("class", "clearfix");
                    $(".aes6 ul li").prepend('<div class="white_shadow"></div>');
                    $(this).attr("class", "thumbs_lists lists")
                } else {
                    $(".aes6 ul").attr("class", "clearfix thumbs");
                    $(".aes6 ul li").find("div").remove();
                    $(this).attr("class", "thumbs_lists thumbs")
                }
            })
        }
    } else {
        $.ajax({
            url: "/AVA/Barras/Home/ParticipantesGrupo",
            cache: false,
            data: {
                id: a,
                tipo: 1
            },
            success: function(d) {
                $("#sMediadoresGrupo").html(d);
                $(".aes6 header a.thumbs_lists").click(function(f) {
                    f.preventDefault();
                    $strClass = $(".aes6 ul").attr("class");
                    if ($strClass == "clearfix thumbs") {
                        $(".aes6 ul").attr("class", "clearfix");
                        $(".aes6 ul li").prepend('<div class="white_shadow"></div>');
                        $(this).attr("class", "thumbs_lists lists")
                    } else {
                        $(".aes6 ul").attr("class", "clearfix thumbs");
                        $(".aes6 ul li").find("div").remove();
                        $(this).attr("class", "thumbs_lists thumbs")
                    }
                })
            },
            error: function(d) {
                if (d.status == 0) {
                    $("#sMediadoresGrupo").empty()
                } else {
                    $("#sMediadoresGrupo").html("erro ao buscar mediadores do grupo")
                }
            }
        })
    }
}

function carregaParticipantes(b) {
    if (idUsuarioCript != 0) {
        try {
            var a = $.jStorage.get("carregaParticipantes" + b + idUsuarioPraCachear)
        } catch (c) {
            var a = ""
        }
        a = "";
        if (!a) {
            $.ajax({
                url: "/AVA/Barras/Home/ParticipantesGrupo",
                cache: false,
                data: {
                    id: b,
                    tipo: 2
                },
                success: function(e) {
                    a = e;
                    $("#sParticipantesGrupo").html(a);
                    $("#interroga_mediador").click(function() {
                        $("#sobre_mediador").show();
                        $("#boxListaParticipantesGeral").hide();
                        $(".combo_topo.ativo").removeClass("ativo")
                    });
                    $("#vertodosparticipantesgrupo").click(function() {
                        $("#sobre_mediador").hide();
                        $(".combo_topo.ativo").removeClass("ativo");
                        $("#boxListaParticipantesGeral").show("fast", function() {
                            $(".fechar_participantes").click(function() {
                                $("#boxListaParticipantesGeral").hide();
                                $("#strParticipante").val("")
                            });
                            $("#cbParticipante_0").click()
                        })
                    });
                    $(".aes7 header a.thumbs_lists").click(function(f) {
                        f.preventDefault();
                        $strClass = $(".aes7 ul").attr("class");
                        if ($strClass == "clearfix thumbs") {
                            $(".aes7 ul").attr("class", "clearfix");
                            $(".aes7 ul li").prepend('<div class="white_shadow"></div>');
                            $(this).attr("class", "thumbs_lists lists")
                        } else {
                            $(".aes7 ul").attr("class", "clearfix thumbs");
                            $(".aes7 ul li").find("div").remove();
                            $(this).attr("class", "thumbs_lists thumbs")
                        }
                    });
                    try {
                        $.jStorage.set("carregaParticipantes" + b + idUsuarioPraCachear, a);
                        $.jStorage.setTTL("carregaParticipantes" + b + idUsuarioPraCachear, 600000)
                    } catch (d) {}
                },
                error: function(d) {
                    if (d.status == 0) {
                        $("#sParticipantesGrupo").empty()
                    } else {
                        a = "erro ao buscar participantes do grupo"
                    }
                }
            })
        } else {
            $("#sParticipantesGrupo").html(a);
            acoesListaParticipante("", "1,2,3,4");
            $(".aes7 header a.thumbs_lists").click(function(d) {
                d.preventDefault();
                $strClass = $(".aes7 ul").attr("class");
                if ($strClass == "clearfix thumbs") {
                    $(".aes7 ul").attr("class", "clearfix");
                    $(".aes7 ul li").prepend('<div class="white_shadow"></div>');
                    $(this).attr("class", "thumbs_lists lists")
                } else {
                    $(".aes7 ul").attr("class", "clearfix thumbs");
                    $(".aes7 ul li").find("div").remove();
                    $(this).attr("class", "thumbs_lists thumbs")
                }
            })
        }
    } else {
        $.ajax({
            url: "/AVA/Barras/Home/ParticipantesGrupo",
            data: {
                id: b,
                tipo: 2
            },
            success: function(d) {
                $("#sParticipantesGrupo").html(d);
                $(".aes7 header a.thumbs_lists").click(function(f) {
                    f.preventDefault();
                    $strClass = $(".aes7 ul").attr("class");
                    if ($strClass == "clearfix thumbs") {
                        $(".aes7 ul").attr("class", "clearfix");
                        $(".aes7 ul li").prepend('<div class="white_shadow"></div>');
                        $(this).attr("class", "thumbs_lists lists")
                    } else {
                        $(".aes7 ul").attr("class", "clearfix thumbs");
                        $(".aes7 ul li").find("div").remove();
                        $(this).attr("class", "thumbs_lists thumbs")
                    }
                })
            },
            error: function(d) {
                if (d.status == 0) {
                    $("#sParticipantesGrupo").empty()
                } else {
                    $("#sParticipantesGrupo").html("erro ao buscar participantes do grupo")
                }
            }
        })
    }
}

function listaAssuntoGrupo(a) {
    $.ajax({
        url: "/AVA/Grupo/Home/ListaAssuntoPorGrupo",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            id: a
        },
        success: function(b) {
            $("#boxCriarAssunto").fadeOut("slow", function() {
                $("#txtAssunto").val("");
                if ($("#btVerMaisAssunto").html() == null) {
                    $("#boxListaAnyAssuntoGrupo").html(b)
                } else {
                    $("#boxListaAllAssuntoGrupo").html(b);
                    $("#btVerMaisAssunto").click()
                }
                editarAssuntoGrupo()
            })
        },
        error: function(b) {
            alert("erro ao listar os assuntos.")
        }
    })
}

function listaAssuntoFiltrarMensagemGrupo(a) {
    $.ajax({
        url: "/AVA/Grupo/Home/ListaAssuntoFiltrarMensagemGrupo",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            id: a
        },
        success: function(b) {
            $("#cbFiltroAssunto").html(b)
        },
        error: function(b) {
            alert("erro ao listar os assuntos.")
        }
    })
}

function listaAssuntoPostarMensagemGrupo(a) {
    $.ajax({
        url: "/AVA/Grupo/Home/ListaAssuntoPostarMensagemGrupo",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            id: a
        },
        success: function(b) {
            $("#cbAssuntoMensagem").html(b)
        },
        error: function(b) {
            alert("erro ao listar os assuntos.")
        }
    })
}

function salvarAssuntoGrupo(a) {
    var c = a.attr("idAssunto");
    var b = $("#idGrupo").val();
    var d = a.val();
    if (d != "") {
        $.ajax({
            url: "/AVA/Grupo/Home/InserirAssunto",
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                idAssunto: c,
                idGrupo: b,
                strAssunto: d
            },
            success: function(e) {
                if (e == "ok") {
                    a.val("");
                    listaAssuntoGrupo(b);
                    listaAssuntoPostarMensagemGrupo(b);
                    listaAssuntoFiltrarMensagemGrupo(b)
                } else {
                    a.after('<div class="erro_existe" style="display: none;">*Esse assunto jï¿½ existe</div>');
                    $(".erro_existe").fadeIn("slow", function() {
                        setTimeout(function() {
                            $(".erro_existe").fadeOut("slow", function() {
                                $(this).remove()
                            })
                        }, 3000)
                    });
                    a.focus();
                    return false
                }
            },
            error: function(e) {
                alert("erro ao salvar assunto.")
            }
        })
    }
}

function carregaAssunto(a) {
    if (location.href.toLocaleLowerCase().indexOf("grupo/home/post") == -1) {
        $.ajax({
            url: "/AVA/Grupo/Home/Assuntos",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                id: a
            },
            success: function(b) {
                $("#sAssuntosGrupo").html(b);
                $("#btVerMaisAssunto").toggle(function() {
                    $(this).html("ver menos");
                    $("#boxListaAnyAssuntoGrupo").css("display", "none");
                    $("#boxListaAllAssuntoGrupo").css("display", "block");
                    editarAssuntoGrupo()
                }, function() {
                    $(this).html("ver mais");
                    $("#boxListaAnyAssuntoGrupo").css("display", "block");
                    $("#boxListaAllAssuntoGrupo").css("display", "none")
                });
                $("#btCriarAssunto").click(function() {
                    $.ajax({
                        url: "/AVA/Grupo/Home/ListaCriacaoAssunto",
                        success: function(c) {
                            $("#boxCriarAssunto").html(c).removeClass("editar");
                            $("#boxCriarAssunto").fadeIn("slow", function() {
                                $("#txtAssunto").focus();
                                $("#btCancelarCriarAssunto").click(function() {
                                    $("#boxCriarAssunto").fadeOut("slow", function() {
                                        $("#txtAssunto").val("")
                                    })
                                });
                                $("#txtAssunto").keyup(function(d) {
                                    if (parseInt(d.which) == 13) {
                                        salvarAssuntoGrupo($(this))
                                    }
                                })
                            })
                        },
                        error: function(c) {
                            alert("erro ao listar ediï¿½ï¿½o do assunto.")
                        }
                    })
                });
                editarAssuntoGrupo()
            },
            error: function(b) {
                if (b.status == 0) {
                    $("#sAssuntosGrupo").empty()
                } else {
                    $("#sAssuntosGrupo").html("erro ao buscar assuntos do grupo")
                }
            }
        })
    } else {
        $("#sAssuntosGrupo").remove()
    }
}

function editarAssuntoGrupo() {
    $(".btEditarAssunto").click(function() {
        var a = $(this).attr("idAssunto");
        $.ajax({
            url: "/AVA/Grupo/Home/ListaEdicaoAssunto",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                id: a
            },
            success: function(b) {
                $("#boxCriarAssunto").html(b).addClass("editar_categoria");
                $("#boxCriarAssunto").fadeIn("slow", function() {
                    $("#txtAssunto").focus();
                    $("#btCancelarCriarAssunto").click(function() {
                        $("#boxCriarAssunto").fadeOut("slow", function() {
                            $("#txtAssunto").val("")
                        })
                    });
                    $("#txtAssunto").keyup(function(c) {
                        if (parseInt(c.which) == 13) {
                            salvarAssuntoGrupo($(this))
                        }
                    })
                })
            },
            error: function(b) {
                alert("erro ao listar ediï¿½ï¿½o do assunto.")
            }
        })
    })
}

function excluirAssuntoGrupo(a) {
    $("#boxCriarAssunto").css("display", "none");
    if ($("#boxListaAnyAssuntoGrupo li").length <= 3) {
        $("#boxExcluirAssunto > div").addClass("desce")
    } else {
        $("#boxExcluirAssunto > div").removeClass("desce")
    }
    $("#boxExcluirAssunto").fadeIn("slow", function() {
        $("#btCancelarExclusaoAssunto").click(function() {
            $("#boxExcluirAssunto").fadeOut("slow")
        });
        $("#btExcluirAssunto").click(function() {
            $.ajax({
                url: "/AVA/Grupo/Home/ExcluirAssunto",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {
                    id: a
                },
                success: function(b) {
                    $("#boxExcluirAssunto").fadeOut("slow", function() {
                        var c = $("#idGrupo").val();
                        listaAssuntoGrupo(c);
                        listaAssuntoPostarMensagemGrupo(c);
                        listaAssuntoFiltrarMensagemGrupo(c);
                        $("#rbFiltroAssunto_0").click()
                    })
                },
                error: function(b) {
                    alert("erro ao excluir assunto [" + a + "].")
                }
            })
        })
    })
}

function carregaTimeLineGrupoAux(a) {
    $("#rbFiltroAssunto_" + a).attr("checked", "checked");
    var b = $("#textoFiltroAssunto_" + a).text().replace(/<script/gi, "&lt;script").replace(/<\/script/gi, "&lt;/script");
    $("#btnFiltroGrupo").html('<span class="FontAwesome"></span><span id="textoBtnFiltroAssunto">' + b + ' </span><span class="caret"></span>');
    carregaTimeLineGrupo(a)
}

function abreUsuariosTurma(b, a) {
    $("#listaTurmas").load("/AVA/Barras/Home/RetornaViewTurmaCompleta", function() {
        $("h2.komika").text("Turma " + a);
        $urlTurmaCompleta = "/AVA/Barras/Home/PerseguicaoCompletaUsuariosTurma/?idTurma=" + b;
        retornaJson($urlTurmaCompleta)
    })
}

function listaTurmas() {
    $("#listaTurmas").load("/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=7", function() {
        $urlTurmaCompleta = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=7&idPublico=&strLogin=&idTurma=0";
        retornaJson($urlTurmaCompleta);
        $(".scroll_cart_turmas").mCustomScrollbar()
    })
}
var ajaxParticipante;

function acoesListaParticipante(b, a) {
    if (typeof ajaxParticipante !== "undefined") {
        ajaxParticipante.abort()
    }
    $("#boxListaParticipantes").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    ajaxParticipante = $.ajax({
        type: "POST",
        url: "/AVA/Grupo/Home/ListaParticipantes",
        data: {
            strLink: idUsuarioPublico,
            strParticipante: b,
            strTipo: a,
            intInicio: 1,
            intFim: 1000
        },
        success: function(c) {
            $("#boxListaParticipantes").html(c);
            $(".seta_combo_carteirinha").click(function() {
                var d = $(this).attr("idUser");
                $("#opcoes_" + d).addClass("ativo").mouseleave(function() {
                    $(this).removeClass("ativo")
                })
            })
        },
        error: function(c) {
            $("#boxListaParticipantes").html("erro ao buscar participantes do grupo")
        }
    })
}

function removeCarteirinhas(a) {
    $("#" + a + " .carteirinha").each(function() {
        $(this).remove()
    })
}
jQuery(function(a) {
    a("#hAssuntoPost").val(a("#hAssuntoPost").attr("initvalue"));
    a("#cbAssuntoPost input[type=checkbox]").removeAttr("checked");
    a("#ckAssuntoPost" + a("#hAssuntoPost").val()).attr("checked", "checked");
    a("body").on(tpClick, "#cbAssuntoPost li", function() {
        if (!(a(this).hasClass("li_criar_editar_assunto") || a(this).parent().hasClass("li_criar_editar_assunto"))) {
            var b = a(this).attr("assu");
            a("#hAssuntoPost").val(b);
            a("#cbAssuntoPost input[type=checkbox]").removeAttr("checked");
            a("#ckAssuntoPost" + b).attr("checked", "checked");
            var c = a("label", this).text() + '<span class="caret"></span>';
            a("#txtAssuntoPost").html(c);
            a("#cbAssuntoPost").parent().removeClass("open")
        }
    });
    a("body").on(tpClick, "section.dialogo .criar_editar_assunto.fancy", function() {
        var b = a("#idGrupo").val();
        a.fancybox({
            type: "ajax",
            href: "/AVA/Grupo/Home/ListaAssuntoPorGrupo",
            ajax: {
                type: "POST",
                data: {
                    id: b
                },
                dataType: "html"
            },
            beforeShow: function() {
                a("html").css({
                    overflow: "hidden"
                })
            },
            afterShow: function() {
                auxAssuntos.Adicionar = new Array();
                auxAssuntos.Editar = new Array();
                auxAssuntos.Remover = new Array();
                auxAssuntos.Mover = new Array();
                objAssuntoCadastrado = {
                    id: 0,
                    strAssunto: ""
                };
                bolAtualizarMuralDepoisDeAssuntos = false;
                try {
                    if (Modernizr.touch) {
                        var c = a("#criareditar.fancyAssuntos ._feed_lista_assunto ul").width();
                        c = parseInt(auxWidth) + 20;
                        a("#criareditar.fancyAssuntos ._feed_lista_assunto ul").width(c);
                        a("#criareditar.fancyAssuntos ._feed_lista_assunto ul").mCustomScrollbar()
                    }
                } catch (d) {
                    console.log("Ocorreu um erro ao chamar o scrollbar")
                }
            },
            afterClose: function() {
                a("html").css({
                    overflow: "scroll"
                });
                if (bolAtualizarMuralDepoisDeAssuntos) {
                    carregaTimeLineGrupo(0)
                }
                if (objAssuntoCadastrado.id > 0) {
                    a("#hAssuntoPost").val(objAssuntoCadastrado.id);
                    a("#cbAssuntoPost input:checkbox").removeAttr("checked");
                    a("#ckAssuntoPost" + objAssuntoCadastrado.id).attr("checked", "checked");
                    a("#txtAssuntoPost").html(objAssuntoCadastrado.strAssunto + '&nbsp;<span class="caret"></span>')
                } else {
                    a("#hAssuntoPost").val(a("#hAssuntoPost").attr("initvalue"));
                    a("#cbAssuntoPost input:checkbox").removeAttr("checked");
                    a("#ckAssuntoPost" + a("#hAssuntoPost").val()).attr("checked", "checked");
                    a("#txtAssuntoPost").html(a("#ckAssuntoPost" + a("#hAssuntoPost").val()).next().text() + '&nbsp;<span class="caret"></span>')
                }
            },
            maxWidth: 425,
            maxHeight: 425,
            fitToView: false,
            width: 425,
            height: 425,
            padding: 0,
            autoSize: false,
            closeClick: false,
            openEffect: "none",
            hideOnContentClick: false,
            closeEffect: "none",
            scrolling: "no"
        })
    });
    a("body").on(tpClick, "#criareditar .link_direto", function() {
        a(this).hide();
        a(this).siblings("input").show().focus();
        a(this).siblings(".inputAssuntoLimpar").show();
        a("._feed_lista_assunto li.liassunto a:not(.inputAssuntoLimpar)").show();
        a("._feed_lista_assunto li.liassunto span:not(.icon_excluir)").show();
        a("._feed_lista_assunto li.liassunto input").hide();
        a("._feed_lista_assunto li.liassunto div").hide();
        a("._feed_lista_assunto li.liassunto a.inputAssuntoLimpar").hide();
        a("._feed_lista_assunto li.liassunto a.salvarEditar_link").hide();
        a("._feed_lista_assunto li.liassunto span.liassuntonome").each(function() {
            a(this).siblings("input").val(a(this).text())
        });
        a(".salvar_link").show()
    });
    a("body").on(tpClick, "#criareditar .salvar_link", function(b) {
        idNovoAssunto--;
        var d = a.trim(a("._inputNovoAssunto").val());
        if (d.length > 0) {
            var e = d.toLowerCase() == "geral";
            if (!e) {
                a(".liassunto .liassuntonome").each(function() {
                    if (d.toLowerCase() == a(this).text().toLowerCase()) {
                        e = true
                    }
                })
            }
            if (e) {
                a(".tooltip_obrigatorio p").text("Esse assunto jï¿½ existe");
                a("._inputNovoAssunto").prev().show();
                a("._inputNovoAssunto").addClass("obrigatorio");
                a(".salvar_link").trigger()
            } else {
                a(this).removeClass("obrigatorio");
                a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
                var c = '<li assu="' + idNovoAssunto + '" class="liassunto"><a href="javascript:void(0);" class="mostra_input"><span class="fontello icon_editar"></span></a><span class="liassuntonome">' + d + '</span><a href="javascript:void(0);" class="feed_confirma_exclui assusmpst"><span class="fontello icon_excluir"></span></a><div class="tooltip_obrigatorio" style="display:none;"><p>O nome do assunto ï¿½ obrigatï¿½rio</p><span class="seta_baixo"></span></div><input class="_inputEditarAssunto" type="text" value="' + d + '" maxlength="40" placeholder="Nome assunto"/><a href="javascript:void(0);" class="inputAssuntoLimpar" style="display:none;"><span class="fontello icon_limpar"></span></a><a href="javascript:void(0);" class="salvarEditar_link" style="display: none;"> Salvar</a></li>';
                a(this).parent().after(c);
                a(this).blur();
                a(this).hide();
                a(this).siblings("a:not(.inputAssuntoLimpar)").show();
                a(this).siblings("a.inputAssuntoLimpar").hide();
                a(this).val("");
                var f = new Object();
                f.idAssunto = idNovoAssunto;
                f.strAssunto = d;
                auxAssuntos.Adicionar.push(f);
                a(".acoesResultado").text("Assunto criado");
                GravarAssuntosCadastrados(0);
                a("._inputNovoAssunto").siblings(".salvar_link").hide()
            }
        } else {
            a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
            a("._inputNovoAssunto").addClass("obrigatorio");
            a("._inputNovoAssunto").prev().show();
            a(".salvar_link").trigger()
        }
    });
    a("body").on(tpClick, "#criareditar", function(b) {
        if (a(b.target).parent().hasClass("inputAssuntoLimpar") || a(b.target).hasClass("icon_limpar")) {
            var c = a(b.target).closest("li");
            a("input", c).val("").focus()
        } else {
            if (a(b.target).hasClass("_inputNovoAssunto") || a(b.target).hasClass("_inputEditarAssunto") || a(b.target).hasClass("mostra_input") || a(b.target).hasClass("icon_editar") || a(b.target).hasClass("link_direto")) {} else {
                if (a("#criareditar ._inputNovoAssunto").is(":visible")) {
                    var d = a("#criareditar ._inputNovoAssunto");
                    a(d).removeClass("obrigatorio");
                    a(d).prev().hide();
                    a(d).hide();
                    a(d).siblings(".inputAssuntoLimpar").hide();
                    a(d).siblings("a:not(.inputAssuntoLimpar)").show();
                    a(d).val("");
                    a(d).siblings(".salvar_link").hide()
                }
                a("._feed_lista_assunto li.liassunto input:visible").each(function() {
                    var e = a(this).closest("li");
                    a("a:not(.inputAssuntoLimpar)", e).show();
                    a("a.inputAssuntoLimpar", e).hide();
                    a("span:not(.icon_excluir)", e).show();
                    a("input", e).hide();
                    a("div", e).hide();
                    a(".salvarEditar_link").hide();
                    a("span.liassuntonome", e).each(function() {
                        a(this).siblings("input").val(a(this).text())
                    })
                })
            }
        }
    });
    a("body").on("keyup", "#criareditar ._inputNovoAssunto", function(b) {
        if (b.keyCode == 13) {
            idNovoAssunto--;
            var d = a.trim(a(this).val());
            if (d.length > 0) {
                var e = d.toLowerCase() == "geral";
                if (!e) {
                    a(".liassunto .liassuntonome").each(function() {
                        if (d.toLowerCase() == a(this).text().toLowerCase()) {
                            e = true
                        }
                    })
                }
                if (e) {
                    a(".tooltip_obrigatorio p").text("Esse assunto jï¿½ existe");
                    a(this).prev().show();
                    a(this).addClass("obrigatorio")
                } else {
                    a(this).removeClass("obrigatorio");
                    a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
                    var c = '<li assu="' + idNovoAssunto + '" class="liassunto"><a href="javascript:void(0);" class="mostra_input"><span class="fontello icon_editar"></span></a><span class="liassuntonome">' + d + '</span><a href="javascript:void(0);" class="feed_confirma_exclui assusmpst"><span class="fontello icon_excluir"></span></a><div class="tooltip_obrigatorio" style="display:none;"><p>O nome do assunto ï¿½ obrigatï¿½rio</p><span class="seta_baixo"></span></div><input class="_inputEditarAssunto" type="text" value="' + d + '" maxlength="40" placeholder="Nome assunto"/><a href="javascript:void(0);" class="inputAssuntoLimpar" style="display:none;"><span class="fontello icon_limpar"></span></a><a href="javascript:void(0);" class="salvarEditar_link" style="display: none;"> Salvar</a></li>';
                    a(this).parent().after(c);
                    a(this).blur();
                    a(this).hide();
                    a(this).siblings("a:not(.inputAssuntoLimpar)").show();
                    a(this).siblings("a.inputAssuntoLimpar").hide();
                    a(this).val("");
                    var f = new Object();
                    f.idAssunto = idNovoAssunto;
                    f.strAssunto = d;
                    auxAssuntos.Adicionar.push(f);
                    a(".acoesResultado").text("Assunto criado");
                    GravarAssuntosCadastrados(0);
                    a(this).siblings(".salvar_link").hide()
                }
            } else {
                a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
                a(this).addClass("obrigatorio");
                a(this).prev().show()
            }
        } else {
            if (b.keyCode == 27) {
                a(this).hide();
                a(this).siblings("a:not(.inputAssuntoLimpar)").show();
                a(this).siblings("a.inputAssuntoLimpar").hide();
                a(this).val("");
                a(".tooltip_obrigatorio").hide();
                a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
                return false
            } else {
                a(this).removeClass("obrigatorio");
                a(this).prev().hide();
                a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio")
            }
        }
    });
    a("body").on(tpClick, "#criareditar .mostra_input", function() {
        a(".link_direto").siblings("input").hide();
        a(".link_direto").siblings(".inputAssuntoLimpar").hide();
        a(".salvar_link").hide();
        a(".link_direto").show();
        a(".tooltip_obrigatorio").hide();
        a("._feed_lista_assunto li.liassunto a:not(.inputAssuntoLimpar)").show();
        a("._feed_lista_assunto li.liassunto a.inputAssuntoLimpar").hide();
        a("._feed_lista_assunto li.liassunto a.salvarEditar_link").hide();
        a("._feed_lista_assunto li.liassunto span:not(.icon_excluir)").show();
        a("._feed_lista_assunto li.liassunto input").hide();
        a("._feed_lista_assunto li.liassunto div").hide();
        a("._feed_lista_assunto li.liassunto span.liassuntonome").each(function() {
            a(this).siblings("input").val(a(this).text())
        });
        a(this).hide();
        a(this).siblings("a, span").hide();
        a(this).siblings(".salvarEditar_link").show();
        a(this).siblings("a.inputAssuntoLimpar").show();
        a(this).siblings("input").show().focus().off("keyup");
        a(this).siblings("input").on("keyup", function(b) {
            if (b.keyCode == 13) {
                var d = a(this).val();
                if (d.length > 0) {
                    var f = d.toLowerCase() == "geral";
                    var e = parseInt(a(this).closest("li").attr("assu"));
                    if (!f) {
                        a(".liassunto:not(.liassunto[assu=" + e + "]) .liassuntonome").each(function() {
                            if (d.toLowerCase() == a(this).text().toLowerCase()) {
                                f = true
                            }
                        })
                    }
                    if (f) {
                        a(".tooltip_obrigatorio p").text("Esse assunto jï¿½ existe");
                        a(this).prev().show();
                        a(this).addClass("obrigatorio")
                    } else {
                        a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
                        a(this).removeClass("obrigatorio");
                        a(this).siblings("span").text(d);
                        if (e < 0) {
                            for (var c in auxAssuntos.Adicionar) {
                                if (auxAssuntos.Adicionar[c].idAssunto == e) {
                                    auxAssuntos.Adicionar[c].strAssunto = d
                                }
                            }
                        } else {
                            if (e > 0) {
                                var j = false;
                                for (var c in auxAssuntos.Editar) {
                                    if (auxAssuntos.Editar[c].idAssunto == e) {
                                        j = true;
                                        auxAssuntos.Editar[c].strAssunto = d
                                    }
                                }
                                if (!j) {
                                    var g = new Object();
                                    g.idAssunto = e;
                                    g.strAssunto = d;
                                    auxAssuntos.Editar.push(g)
                                }
                            } else {}
                        }
                        a(this).siblings("a:not(.inputAssuntoLimpar), span").show();
                        a(this).siblings("a.inputAssuntoLimpar").hide();
                        a(this).blur();
                        a(this).hide();
                        a(".acoesResultado").text("Assunto editado");
                        bolAtualizarMuralDepoisDeAssuntos = true;
                        GravarAssuntosCadastrados(e);
                        a(this).siblings(".salvarEditar_link").hide()
                    }
                } else {
                    a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
                    a(this).addClass("obrigatorio");
                    a(this).prev().show()
                }
            } else {
                if (b.keyCode == 27) {
                    a(this).val(a(this).siblings("span").text());
                    a(this).siblings("a:not(.inputAssuntoLimpar), span").show();
                    a(this).siblings("a.inputAssuntoLimpar").hide();
                    a(this).hide();
                    a(".tooltip_obrigatorio").hide();
                    a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
                    return false
                } else {
                    a(this).removeClass("obrigatorio");
                    a(this).prev().hide();
                    a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio")
                }
            }
        })
    });
    a("body").on(tpClick, "#criareditar .salvarEditar_link", function(b) {
        var d = a(this).siblings("input").val();
        if (d.length > 0) {
            var f = d.toLowerCase() == "geral";
            var e = parseInt(a(this).closest("li").attr("assu"));
            if (!f) {
                a(".liassunto:not(.liassunto[assu=" + e + "]) .liassuntonome").each(function() {
                    if (d.toLowerCase() == a(this).text().toLowerCase()) {
                        f = true
                    }
                })
            }
            if (f) {
                a(".tooltip_obrigatorio p").text("Esse assunto jï¿½ existe");
                a(this).siblings("input").prev().show();
                a(this).siblings("input").addClass("obrigatorio");
                a(".salvar_link").trigger()
            } else {
                a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
                a(this).removeClass("obrigatorio");
                a(this).siblings("span").text(d);
                if (e < 0) {
                    for (var c in auxAssuntos.Adicionar) {
                        if (auxAssuntos.Adicionar[c].idAssunto == e) {
                            auxAssuntos.Adicionar[c].strAssunto = d
                        }
                    }
                } else {
                    if (e > 0) {
                        var j = false;
                        for (var c in auxAssuntos.Editar) {
                            if (auxAssuntos.Editar[c].idAssunto == e) {
                                j = true;
                                auxAssuntos.Editar[c].strAssunto = d
                            }
                        }
                        if (!j) {
                            var g = new Object();
                            g.idAssunto = e;
                            g.strAssunto = d;
                            auxAssuntos.Editar.push(g)
                        }
                    } else {}
                }
                a(this).siblings("a:not(.inputAssuntoLimpar), span").show();
                a(this).siblings("a.inputAssuntoLimpar").hide();
                a(this).blur();
                a(this).hide();
                a(".acoesResultado").text("Assunto editado");
                bolAtualizarMuralDepoisDeAssuntos = true;
                GravarAssuntosCadastrados(e);
                a("._inputEditarAssunto").siblings(".salvarEditar_link").hide()
            }
        } else {
            a(".tooltip_obrigatorio p").text("O nome do assunto ï¿½ obrigatï¿½rio");
            a(this).siblings("input").addClass("obrigatorio");
            a(this).siblings("input").prev().show();
            a(".salvar_link").trigger()
        }
    });
    a("body").on(tpClick, "#feed_confirma_RadioRemoverLabel", function() {
        a(this).addClass("inputRadioChecked");
        a("#feed_confirma_RadioMoverLabel").removeClass("inputRadioChecked")
    });
    a("body").on(tpClick, "#feed_confirma_RadioMoverLabel", function() {
        a(this).addClass("inputRadioChecked");
        a("#feed_confirma_RadioRemoverLabel").removeClass("inputRadioChecked")
    });
    a("body").on(tpClick, "#cbAssuntoEditar li label", function() {
        var b = a(this).parent().attr("assu");
        a("#hAssuntoEditar").val(b);
        a("#cbAssuntoEditar input[type=checkbox]").removeAttr("checked");
        a("#ckAssuntoEditar" + b).attr("checked", "checked");
        var c = a(this).text() + '<span class="caret"></span>';
        a("#txtAssuntoEditar").html(c);
        a("#cbAssuntoEditar").parent().removeClass("open");
        return false
    });
    a("body").on(tpClick, "#cbFiltroAssunto li label", function() {
        var b = a(this).parent().attr("assu");
        if (bolFezAlteracaoConfiguracoes) {
            destinoIdAssunto = b;
            destinoConfiguracoes = "comboFiltroAssuntoTimeline";
            CustomConfirmConfiguracoes("comboFiltroAssuntoTimeline", objetoIdMensagemRapida, b)
        } else {
            a("#hAssuntoTimeLine").val(b);
            a("#cbFiltroAssunto input[type=checkbox]").removeAttr("checked");
            a("#rbFiltroAssunto_" + b).attr("checked", "checked");
            var c = a(this).text() + '<span class="caret"></span>';
            a("#btnFiltroGrupo").html(c);
            a("#cbFiltroAssunto").parent().removeClass("open");
            carregaTimeLineGrupo(b)
        }
        return false
    });
    a("body").on(tpClick, "#criareditar .feed_confirma_exclui", function() {
        var b = a(this).parent().attr("assu");
        if (a(this).hasClass("assusmpst") || parseInt(a(this).parent().attr("assu")) < 0) {
            a(".feed_confirma h2").text("Remover o assunto " + a(this).siblings("span").text() + "?");
            a("#cbAssuntoEditar li[assu=" + b + "]").hide();
            a("#idAssuntoRemover").val(b);
            a("strong, label, div.bootstrap", ".feed_confirma").hide();
            a("#feed_confirma_RadioRemoverLabel, #feed_confirma_RadioMoverLabel").removeClass("inputRadioChecked");
            a("#feed_confirma_RadioRemoverLabel").addClass("inputRadioChecked");
            a(".feed_confirma input:radio").removeAttr("checked");
            a("#feed_confirma_RadioRemover").attr("checked", "checked");
            a("._feed_lista_assunto").hide();
            a(".feed_confirma").slideDown()
        } else {
            a(".feed_confirma h2").text("Remover o assunto " + a(this).siblings("span").text() + "?");
            a("#cbAssuntoEditar li[assu=" + b + "]").hide();
            a("#idAssuntoRemover").val(b);
            a("._feed_lista_assunto").hide();
            a(".feed_confirma").slideDown()
        }
    });
    a("body").on(tpClick, "#criareditar .feed_confirma .btn_cor", function() {
        var e = a("#feed_confirma_RadioRemover").is(":checked");
        if (e) {
            var f = a("#idAssuntoRemover").val();
            var d = new Array();
            for (var c in auxAssuntos.Adicionar) {
                if (auxAssuntos.Adicionar[c].idAssunto != f) {
                    d.push(auxAssuntos.Adicionar[c])
                }
            }
            auxAssuntos.Adicionar = d;
            auxAssuntos.Remover.push(a("#idAssuntoRemover").val());
            a("._feed_lista_assunto li[assu=" + a("#idAssuntoRemover").val() + "]").remove();
            if (objAssuntoCadastrado.id == f) {
                objAssuntoCadastrado = {
                    id: 0,
                    strAssunto: ""
                }
            }
        } else {
            var b = new Object();
            var f = a("#idAssuntoRemover").val();
            b.idAssuntoOrigem = f;
            b.idAssuntoDestino = a("#hAssuntoEditar").val();
            auxAssuntos.Mover.push(b);
            a("._feed_lista_assunto li[assu=" + a("#idAssuntoRemover").val() + "]").remove();
            a("._feed_lista_assunto li[assu=" + b.idAssuntoDestino + "] .feed_confirma_exclui").removeClass("assusmpst");
            if (objAssuntoCadastrado.id == f) {
                objAssuntoCadastrado = {
                    id: 0,
                    strAssunto: ""
                }
            }
        }
        a("#cbAssuntoEditar li[assu=" + a("#idAssuntoRemover").val() + "]").remove();
        a(".acoesResultado").text("Assunto excluï¿½do");
        bolAtualizarMuralDepoisDeAssuntos = true;
        GravarAssuntosCadastrados(0);
        cancelarRemoverAssunto()
    });
    a("body").on(tpClick, "#criareditar .feed_confirma .btn_cinza", cancelarRemoverAssunto);
    a("body").on(tpClick, "#btnCancelarFerramentaMural", grupos_CancelarDigaLaClick);
    a("body").on(tpClick, "._feed_lista_assunto .acoes .btn_cinza", function() {
        a.fancybox.close()
    })
});

function GravarAssuntosCadastrados(a) {
    if (!($("._feed_lista_assunto .acoes .btn_cor").hasClass("salvando"))) {
        $("._feed_lista_assunto .acoes .btn_cor").addClass("salvando");
        $.ajax({
            url: "/AVA/Grupo/Home/SalvarAssuntos/",
            type: "POST",
            data: {
                idGrupo: $("#idGrupo").val(),
                jsonAssuntos: JSON.stringify(auxAssuntos)
            },
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(d) {
                var f = "";
                var b = jQuery.parseJSON(JSON.stringify(d));
                if (a > 0) {
                    for (var e in b) {
                        if (b[e].id == a) {
                            objAssuntoCadastrado = b[e]
                        }
                    }
                } else {
                    for (var k in auxAssuntos.Adicionar) {
                        var c = $(".liassunto[assu=" + auxAssuntos.Adicionar[k].idAssunto + "]");
                        for (var e in b) {
                            if (b[e].strAssunto == $(".liassuntonome", c).text()) {
                                $(".liassunto[assu=" + auxAssuntos.Adicionar[k].idAssunto + "]").attr("assu", b[e].id);
                                objAssuntoCadastrado = b[e]
                            }
                        }
                    }
                }
                $(".acoesResultado").fadeIn();
                clearTimeout(timeoutMensagemAssunto);
                timeoutMensagemAssunto = window.setTimeout(function() {
                    $(".acoesResultado").fadeOut()
                }, 5000);
                resetarFiltroMural();
                var i = "";
                var l = "";
                var g = "";
                l += '\n<li assu="0">\n<input type="checkbox" id="rbFiltroAssunto_0" name="cbFiltroAssuntoTimeLine" value="0" checked="checked">\n<label for="cbFiltroAssuntoTimeLine0"><span class="FontAwesome"></span> Todos os assuntos</label>\n</li>';
                for (var e in b) {
                    i += '\n<li assu="' + b[e].id + '">\n<input type="checkbox" id="ckAssuntoPost' + b[e].id + '"';
                    if (b[e].BolGeral) {
                        i += ' checked="checked" />'
                    } else {
                        i += " />"
                    }
                    i += '\n<label for="ckAssuntoPost' + b[e].id + '">' + b[e].strAssunto + "&nbsp;</label>\n</li>";
                    l += '\n<li assu="' + b[e].id + '">\n<input type="checkbox" id="rbFiltroAssunto_' + b[e].id + '" />\n<label for="cbFiltroAssuntoTimeLine' + b[e].id + '">' + b[e].strAssunto + "&nbsp;</label>\n</li>";
                    g += '\n<li assu="' + b[e].id + '">\n<input type="checkbox" id="ckAssuntoEditar' + b[e].id + '"';
                    if (b[e].BolGeral) {
                        g += ' checked="checked" />'
                    } else {
                        g += " />"
                    }
                    g += '\n<label for="ckAssuntoEditar' + b[e].id + '">' + b[e].strAssunto + "&nbsp;</label>\n</li>"
                }
                $("#cbAssuntoPost li:not(.li_criar_editar_assunto)").remove();
                $("#cbAssuntoPost li.li_criar_editar_assunto").before(i);
                $("#cbFiltroAssunto li").remove();
                $("#cbFiltroAssunto").html(l);
                $("#cbAssuntoEditar li").remove();
                $("#cbAssuntoEditar").html(g);
                history.pushState({
                    comboDigaLa: $("#cbAssuntoPost").html(),
                    comboTimeLine: $("#cbAssuntoTimeLine").html(),
                    comboEditar: $("#cbAssuntoEditar").html()
                }, location.pathname, location.pathname);
                auxAssuntos.Adicionar = new Array();
                auxAssuntos.Editar = new Array();
                auxAssuntos.Remover = new Array();
                auxAssuntos.Mover = new Array();
                try {
                    if (Modernizr.touch) {
                        $("#criareditar.fancyAssuntos ._feed_lista_assunto ul").mCustomScrollbar("update")
                    }
                } catch (j) {
                    console.log("Ocorreu um erro ao chamar o scrollbar")
                }
            },
            error: function(b) {
                console.log("Ocorreu um salvar os assuntos");
                $(".acoesResultado").text("Erro ao salvar assunto.").fadeIn();
                clearTimeout(timeoutMensagemAssunto);
                timeoutMensagemAssunto = window.setTimeout(function() {
                    $(".acoesResultado").fadeOut()
                }, 5000);
                auxAssuntos.Adicionar = new Array();
                auxAssuntos.Editar = new Array();
                auxAssuntos.Remover = new Array();
                auxAssuntos.Mover = new Array()
            }
        })
    }
}

function cancelarRemoverAssunto() {
	alert('Tentou remover aqui');
    $("#cbAssuntoEditar li").show();
    $("#idAssuntoRemover").val("");
    $(".feed_confirma").hide();
    $("._feed_lista_assunto").slideDown();
    $("#hAssuntoEditar").val($("#hAssuntoEditar").attr("initvalue"));
    $("#cbAssuntoEditar input[type=checkbox]").removeAttr("checked");
    $("#ckAssuntoEditar" + $("#hAssuntoEditar").val()).attr("checked", "checked");
    var a = $("#cbAssuntoEditar li[assu=" + $("#hAssuntoEditar").attr("initvalue") + "] label").text() + '<span class="caret"></span>';
    $("#txtAssuntoEditar").html(a);
    $("#cbAssuntoEditar").parent().removeClass("open");
    $("#feed_confirma_RadioRemoverLabel, #feed_confirma_RadioMoverLabel").removeClass("inputRadioChecked");
    $("#feed_confirma_RadioMoverLabel").addClass("inputRadioChecked");
    $(".feed_confirma input:radio").removeAttr("checked");
    $("#feed_confirma_RadioMover").attr("checked", "checked");
    $("strong, label, div.bootstrap", ".feed_confirma").show()
}

function resetarFiltroMural() {
    $("#hAssuntoTimeLine").val(0);
    $("#cbFiltroAssunto input[type=checkbox]").removeAttr("checked");
    $("#rbFiltroAssunto_0").attr("checked", "checked");
    var a = $("#cbFiltroAssunto li[assu=0]'").text() + '<span class="caret"></span>';
    $("#btnFiltroGrupo").html(a);
    $("#cbFiltroAssunto").parent().removeClass("open")
}

function grupos_CancelarDigaLaClick() {
    grupos_CancelarDigaLa();
    removerPreviewVideoMensagem(true);
    limpaArrayImagensTimeLine();
    $(".dialogo_box .preview_post.imagens .prev_imagem:not(.adicionar)").remove();
    $(".dialogo_box .preview_post.imagens").hide();
    $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
    limpaArrayArquivosTimeLine();
    $(".dialogo_box .preview_post.arquivos .prev_documento:not(.adicionar)").parent().remove();
    $(".dialogo_box .preview_post.arquivos").mCustomScrollbar("update");
    $(".dialogo_box .preview_post.arquivos").hide()
}

function grupos_CancelarDigaLa() {
    grupos_LimparCaixaTexto("#txtInput");
    $("#hAssuntoPost").val($("#hAssuntoPost").attr("initvalue"));
    $("#cbAssuntoPost input[type=checkbox]").removeAttr("checked");
    $("#ckAssuntoPost" + $("#hAssuntoPost").val()).attr("checked", "checked");
    var a = $("#ckAssuntoPost" + $("#hAssuntoPost").val()).next().text() + '<span class="caret"></span>';
    $("#txtAssuntoPost").html(a);
    $(".enviar_video").hide();
    $(".mensagem_multimidia ul:not(#cbAssuntoPost)").show();
    $(".mensagem_multimidia").show();
    $("#urlVideoOriginal").val("");
    $("#erro_enviar_video").hide();
    $("#txtLinkVideoMensagem").val("");
    $("#btnCancelarFerramentaMural").closest(".sep_digala").slideUp(200)
}

function removerPreviewVideoMensagem(a) {
    if (a === undefined || a == null || a == "") {
        a = false
    }
    $("#container_preview_video").fadeOut("slow", function() {
        var b = $("iframe", $(this));
        b.attr("src", "");
        setTimeout(function() {
            b.remove();
            $("#container_preview_video").html("")
        }, 20);
        $("#txtLinkVideoMensagem").val("");
        $(".enviar_video").hide();
        $("#urlVideoOriginal").val("");
        if (!a) {
            var c = $.trim($("#txtInput").val());
            if (c == "") {
                paginaEducacional_CancelarDigaLa()
            } else {
                $(".mensagem_multimidia ul:not(#cbAssuntoPost)").show();
                $(".mensagem_multimidia").show()
            }
        }
    })
}

function limpaArrayImagensTimeLine() {
    //TODO:::
    if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
        objetoImagens.imagens.splice(0, objetoImagens.imagens.length)
    }
}

function limpaArrayArquivosTimeLine() {
    if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
        objetoArquivos.arquivos.splice(0, objetoArquivos.arquivos.length)
    }
}

function grupos_LimparCaixaTexto(a) {
    $(a).val("");
    $(a).siblings(":last").html("");
    $(a).siblings(":last").prev().html("");
    $(a).height(28)
};


  function montaPreviewFilesMensagemRapida(a) {
        alert( 'oi'+ a);
        var o = $(".dialogo_box .preview_post.arquivos .mCSB_container");
        if (void 0 !== a && null != a && a.length > 0) {
            for (var e = 0; e < a.length; e++) {
                var i = $("<div />").data("idarquivo", a[e].idArquivo),
                    r = $("<div />").addClass("prev_documento"),
                    t = $("<div />").addClass("tipo_arquivo"),
                    s = $("<img />").attr("src", "/ava/StaticContent/Common/img/perfil/documento_multimidia.png").attr("width", "32").attr("height", "41"),
                    n = $("<span />").text(a[e].extensao.substring(1, a[e].extensao.length)),
                    l = $("<p />").html("" == a[e].nome ? a[e].arquivo : a[e].nome),
                    u = $("<a />").attr("href", "#").addClass("remover_multimidia").text("Remover"),
                    d = $("<span />").addClass("FontAwesome");
                t.append(s), t.append(n), r.append(t), r.append(l), u.prepend(d), i.append(r), i.append(u), o.find(".adicionar_doc").prev().before(i)
            }
            $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update")
        }
    }