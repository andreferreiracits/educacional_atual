var globalStrNome;
var globalStrDescricao;
var globalAuxCancelar = false;
var globalAuxSlide = false;
var arraySelecionados = new Array();
var arraySelecionadosHtml = new Array();
var jcrop_api;
var bolCrop = false;
var bolTamanhoImg = false;
var globalSelecionados = false;
var idArquivoGlobalAux = 0;
var strNomeArquivoGlobalAux = "";
var bolAuxDeletarimg = false;
var imgPerfilAtualAux = "";
window.onbeforeunload = function(e) {
    deletarImagemProcessoIncompleto(idArquivoGlobalAux, strNomeArquivoGlobalAux, false)
};

function windowBeforeUnload() {
    deletarImagemProcessoIncompleto(idArquivoGlobalAux, strNomeArquivoGlobalAux, false)
}

function offBeforeUnload(event) {
    $(window).off("beforeunload")
}
jQuery(function($) {
    console.log('sfsdfsd');
    var idFerramentaTipo = $("#idFerramentaTipo").val();
    AtualizaContador();
    imgPerfilAtualAux = $("#imgPerfilAtualAux").val();
    ListaArquivosBiblioteca(idFerramentaTipo, 0);
    $(".tabs a").click(function() {
        $(".tabs li").removeClass("active");
        $(this).parent().addClass("active")
    });
    $("#btn_cancelar").click(function() {
        window.close()
    });
    $("#btn_salvarGeral").click(function() {
        bolAuxDeletarimg = false;
        var idFerramentaTipo = $("#idFerramentaTipo").val();
        var idFerramenta = $("#idFerramenta").val();
        var auxFerramenta = 0;
        var jsonArquivos = new Array();
        if (!validaBolCrop()) {
            if (arraySelecionados.length > 0) {
                $("#btn_salvarGeral").unbind("click");
                var count = arraySelecionados.length;
                var iAux = 1;
                for (var i = 0; i < count; i++) {
                    var idArquivo = arraySelecionados[i];
                    $.ajax({
                        type: "POST",
                        url: "/AVA/Upload/Home/RetornaJsonArquivos",
                        data: {
                            idArquivo: idArquivo
                        },
                        async: false,
                        dataType: "json",
                        success: function(data, status) {
                            jsonArquivos.push(data)
                        },
                        error: function(xmlHttpRequest, status, err) {
                            alert("Erro: " + err + "Status: " + status)
                        }
                    })
                }
                var jsonRetorno = {
                    idFerramenta: idFerramenta,
                    idFerramentaTipo: idFerramentaTipo,
                    arrayArquivo: jsonArquivos
                };
                window.opener.CallbackUpload(jsonRetorno);
                window.close()
            } else {
                alert("Favor selecionar um arquivo!")
            }
        } else {
            alert("Selecione uma imagem para recortar")
        }
    });
    $("#btn_cancelarGeral").click(function() {
        window.close()
    })
});

function ListaArquivosBiblioteca(idFerramentaTipo, idBiblioteca) {


    // console.log("12121");

    globalSelecionados = false;
    $(".lista_biblioteca").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    var strPesquisa = $("#strPesquisa").val();
    if (strPesquisa == undefined) {
        strPesquisa = "";
        $("#strPesquisa").val("")
    }
    $("#idBiblioteca").val(idBiblioteca);
    $.ajax({
        url: "/AVA/Upload/Home/ListaArquivosBiblioteca",
        data: {
            idFerramentaTipo: idFerramentaTipo,
            idBiblioteca: idBiblioteca,
            strPesquisa: strPesquisa
        },
        type: "POST",
        success: function(data) {
            $(".lista_biblioteca").html(data);
            $(".up_tooltip").each(function() {
                $(this).tooltip({
                    offset: [10, 40],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: true
                })
            });
            $(".item_arquivo").mouseenter(function() {
                $(this).find(".detalhe_arquivo").animate({
                    height: "40px"
                });
                $(this).find(".arq_menu_links").show()
            });
            $(".item_arquivo").mouseleave(function() {
                $(this).find(".detalhe_arquivo").animate({
                    height: "15px"
                });
                $(this).find(".arq_menu_links").hide()
            });
            ResetaSelecionados()
        },
        error: function(data) {
            console.debug(data.status)
        }
    })
}

function PesquisaArquivos(idFerramentaTipo) {

    // console.log('sss');
    
    globalSelecionados = false;
    $(".lista_biblioteca").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    var strPesquisa = $("#strPesquisa").val();
    if (strPesquisa == undefined) {
        strPesquisa = "";
        $("#strPesquisa").val("")
    }
    var idBiblioteca = $("#idBiblioteca").val();
    $.ajax({
        url: "/AVA/Upload/Home/ListaArquivosBiblioteca",
        data: {
            idFerramentaTipo: idFerramentaTipo,
            idBiblioteca: idBiblioteca,
            strPesquisa: strPesquisa
        },
        type: "POST",
        success: function(data) {
            $(".lista_biblioteca").html(data);
            $(".up_tooltip").each(function() {
                $(this).tooltip({
                    offset: [10, 40],
                    opacity: 1,
                    position: "top center",
                    effect: "slide",
                    relative: true
                })
            });
            $(".item_arquivo").mouseenter(function() {
                $(this).find(".detalhe_arquivo").animate({
                    height: "40px"
                });
                $(this).find(".arq_menu_links").show()
            });
            $(".item_arquivo").mouseleave(function() {
                $(this).find(".detalhe_arquivo").animate({
                    height: "15px"
                });
                $(this).find(".arq_menu_links").hide()
            });
            ResetaSelecionados()
        },
        error: function(data) {
            console.debug(data.status)
        }
    })
}

function ResetaSelecionados() {
    for (var i = 0; i < arraySelecionados.length; i++) {
        var classIdArquivo = ".idArq_" + arraySelecionados[i];
        $(classIdArquivo).addClass("select");
        $(classIdArquivo).prepend('<span class="ava_clips_seletor"></span>')
    }
    if (arraySelecionados.length > 0) {
        $(".arquivoSelecionado").slideDown()
    }
    if (arraySelecionados.length == 0) {
        $(".arquivoSelecionado").slideUp()
    }
    if (arraySelecionados.length == 0) {} else {
        if (arraySelecionados.length == 1) {
            $(".arquivoSelecionado a").html("<strong>1</strong> arquivo selecionado")
        } else {
            $(".arquivoSelecionado a").html("<strong>" + arraySelecionados.length + "</strong> arquivos selecionados")
        }
    }
    Selecionados()
}

function Selecionados() {
    $(".item_arquivo").unbind("click").click(function(e) {
        if (!$(e.target).hasClass("download") && !$(e.target).hasClass("excluir") && !$(this).find(".singleProgress").length) {
            var idArquivo = $(this).attr("idArquivo");
            var auxArq = false;
            var idFerramenta = $("#idFerramenta").val();
            var idFerramentaTipo = $("#idFerramentaTipo").val();
            if (arraySelecionados.length > 0) {
                for (var i = 0; i < arraySelecionados.length; i++) {
                    if (idArquivo == arraySelecionados[i]) {
                        $(this).removeClass("select");
                        $(this).children("span").remove();
                        removeItem(arraySelecionados, idArquivo);
                        arraySelecionadosHtml.splice(i, 1);
                        auxArq = true
                    }
                }
                if (!auxArq) {
                    arraySelecionados.push(idArquivo);
                    $(this).addClass("select");
                    $(this).prepend('<span class="ava_clips_seletor"></span>');
                    arraySelecionadosHtml.push($(this)[0].outerHTML)
                }
            } else {
                arraySelecionados.push(idArquivo);
                $(this).addClass("select");
                $(this).prepend('<span class="ava_clips_seletor"></span>');
                arraySelecionadosHtml.push($(this)[0].outerHTML)
            }
            if (arraySelecionados.length > 0) {
                $(".arquivoSelecionado").slideDown()
            }
            if (arraySelecionados.length > 0 && globalSelecionados) {
                VisualizaSelecionados()
            }
            if (arraySelecionados.length == 0) {
                $(".arquivoSelecionado").slideUp();
                if (globalSelecionados) {
                    ListaArquivosBiblioteca(idFerramentaTipo, 0)
                }
                $(".menu_arquivos").removeClass("active");
                $(".count_total").addClass("active")
            } else {
                if (arraySelecionados.length == 1) {
                    $(".arquivoSelecionado a").html("<strong>1</strong> arquivo selecionado")
                } else {
                    $(".arquivoSelecionado a").html("<strong>" + arraySelecionados.length + "</strong> arquivos selecionados")
                }
            }
        }
    })
}

function VisualizaSelecionados() {
    if (arraySelecionadosHtml.length > 0) {
        globalSelecionados = true;
        $(".lista_biblioteca").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $(".lista_biblioteca").html("");
        for (var i = 0; i < arraySelecionadosHtml.length; i++) {
            $(".lista_biblioteca").prepend(arraySelecionadosHtml[i])
        }
        $(".up_tooltip").each(function() {
            $(this).tooltip({
                offset: [10, 40],
                opacity: 1,
                position: "top center",
                effect: "slide",
                relative: true
            })
        });
        $(".item_arquivo").mouseenter(function() {
            $(this).find(".detalhe_arquivo").animate({
                height: "40px"
            });
            $(this).find(".arq_menu_links").show()
        });
        $(".item_arquivo").mouseleave(function() {
            $(this).find(".detalhe_arquivo").animate({
                height: "15px"
            });
            $(this).find(".arq_menu_links").hide()
        });
        if (validaBolCrop()) {
            Selecionados()
        }
        ResetaSelecionados()
    } else {
        globalSelecionados = false
    }
}

function removeItem(originalArray, itemToRemove) {
    var j = 0;
    while (j < originalArray.length) {
        if (originalArray[j] == itemToRemove) {
            originalArray.splice(j, 1)
        } else {
            j++
        }
    }
    return originalArray
}

function AtualizaContador() {
    var idFerramentaTipo = $("#idFerramentaTipo").val();
    $.ajax({
        type: "POST",
        url: "/AVA/Upload/Home/CountArquivosBiblioteca",
        data: {
            idFerramentaTipo: idFerramentaTipo
        },
        dataType: "json",
        success: function(data, status) {
            var countTotal = 0;
            if (data.length > 0) {
                var count;
                $(".menu_arquivos").empty();
                $(".menu_arquivos").append('<li onClick="VisualizaSelecionados()" class="arquivoSelecionado"><a href="javascript:void(0);"><strong>0</strong> arquivo selecionado</a></li>');
                if (data.length > 1) {
                    $(".menu_arquivos").append('<li onCLick="ListaArquivosBiblioteca(' + idFerramentaTipo + ',0)" style="cursor:pointer;" class="active count_total"><a href="javascript:void(0);">Todos(' + countTotal + ")</a></li>")
                }
                for (var i = 0; i < data.length; i++) {
                    count = i;
                    count = count + 1;
                    $(".menu_arquivos").append('<li onclick="ListaArquivosBiblioteca(' + idFerramentaTipo + "," + data[i].idBilbioteca + ')" style="cursor:pointer;"><a href="javascript:void(0)">' + data[i].strNomeBiblioteca + "( .... " + data[i].intTotal + ")</a></li>");
                    countTotal = countTotal + data[i].intTotal
                }
                $(".count_total").html('<a href="javascript:void(0);">Todos(' + countTotal + ")</a>");
                $(".menu_arquivos").append('<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em andamento(0)</a></li>')
            } else {
                $(".menu_arquivos").append('<li onClick="VisualizaSelecionados()" class="arquivoSelecionado"><a href="javascript:void(0);"><strong>1</strong> arquivo selecionado</a></li>');
                $(".menu_arquivos").append('<li onCLick="ListaArquivosBiblioteca(' + idFerramentaTipo + ',0)" style="cursor:pointer" class="active"><a href="javascript:void(0);">Todos(' + countTotal + ")</a></li>");
                $(".menu_arquivos").append('<li style="display:none"><a href="javascript:void(0);" id="menu_andamento">Em andamento(0)</a></li>')
            }
            $(".menu_arquivos li").click(function() {
                $(".menu_arquivos li").removeClass("active");
                $(this).addClass("active")
            });
            $(".arquivoSelecionado").hide();
            ResetaSelecionados()
        },
        error: function(xmlHttpRequest, status, err) {
            alert("Erro: " + err + "Status: " + status)
        }
    })
}

function ExcluirArquivo(idArquivo) {
    var classArquivo = ".idArq_" + idArquivo;
    var valida = confirm("Tem certeza que deseja excluir esse arquivo?");
    if (valida == true) {
        $.ajax({
            url: "/AVA/Upload/Home/Excluir",
            data: {
                id: idArquivo
            },
            type: "POST",
            success: function(data) {
                $(classArquivo).hide(500, function() {
                    $(classArquivo).remove();
                    AtualizaContador()
                });
                var idFerramentaTipo = $("#idFerramentaTipo").val();
                var jsonRetorno = {
                    idArquivo: idArquivo,
                    idFerramentaTipo: idFerramentaTipo
                };
                if (window.opener.CallbackUploadExcluidos) {
                    window.opener.CallbackUploadExcluidos(jsonRetorno)
                }
            },
            error: function(data) {
                console.debug(data.status)
            }
        })
    }
}

function AlternaAbas(intAba) {
    // console.log('655');

    deletarImagemProcessoIncompleto(idArquivoGlobalAux, strNomeArquivoGlobalAux, true);
    $(".visu_arquivos").hide();
    var idBiblioteca = $("#idBiblioteca").val();
    var idFerramentaTipo = $("#idFerramentaTipo").val();
    if (intAba == 1) {
        $(".add_arquivos").hide();
        ListaArquivosBiblioteca(idFerramentaTipo, 0);
        $(".titulo_voltar").html("<h1>Arquivos</h1>");
        $(".meus_arquivos").show()
    } else {
        if (intAba == 2) {
            $(".meus_arquivos").hide();
            $(".add_arquivos").show();
            $("#permissoes_arquivos").html("<strong>Os formatos aceitos s�o:</strong> " + strExtensoes + ".")
        } else {
            $(".add_arquivos").hide();
            $(".meus_arquivos").show()
        }
    }
}

function VisualizaArquivo(idArquivo, idTipo) {
    idArquivoGlobalAux = idArquivo;
    $(".meus_arquivos").hide();
    $(".titulo_voltar").html('<div class="arquivos_topo_voltar"><a href="javascript:void(0);" class="FontAwesome voltar_modal" id="btn_voltar"><span></span></a><h1>Arquivos</h1></div>');
    $(".lista_biblioteca").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
    var idFerramentaTipo = $("#idFerramentaTipo").val();
    var idFerramenta = $("#idFerramenta").val();
    $.ajax({
        url: "/AVA/Upload/Home/SelecionaArquivo",
        data: {
            idArquivo: idArquivo
        },
        type: "POST",
        success: function(data) {
            bolAuxDeletarimg = true;
            $(".visu_arq").html(data);
            $(".visu_arquivos").show();
            $(".visu_arquivos").data("idarquivo", idArquivo);
            $("#btn_voltar").click(function() {
                $(".titulo_voltar").html("<h1>Arquivos</h1>");
                // console.log('asdada');
                ListaArquivosBiblioteca(idFerramentaTipo, idTipo);
                AlternaAbas(1);
                $("#strPesquisa").val("")
            });
            globalStrNome = $("#campo_nome p").text();
            globalStrDescricao = $("#campo_descricao p").text();
            $(".tooltip").css("display", "none");
            $("#edita_nome").click(function() {
                var nome = $("#strNome").val();
                $("#campo_nome").html('<input id="strNome" type="text" value="' + nome + '" maxlength="60"/>')
            });
            $("#edita_desc").click(function() {
                var desc = $("#strDescricao").val();
                $("#campo_descricao").html('<textarea id="strDescricao">' + desc + "</textarea>")
            });
            if (validaBolCrop() && idTipo == 3) {
                var idImagem = idArquivo;
                var dadosImg = getDadosImagem(idImagem);
                if (dadosImg[2]) {
                    bolTamanhoImg = true;
                    $(".select_corte").show();
                    $("#imagem_crop").Jcrop({
                        bgColor: "black",
                        bgOpacity: 0.4,
                        aspectRatio: 1,
                        onSelect: showCoords
                    }, function() {
                        jcrop_api = this;
                        jcrop_api.setSelect(getRandom());
                        $(".combo_recortar").show()
                    });
                    $(".cancela_recorte").click(function(e) {
                        jcrop_api.release();
                        $("#x1").val("");
                        $("#x2").val("");
                        $("#y1").val("");
                        $("#y2").val("");
                        $(".combo_recortar").hide();
                        return false
                    });
                    $(".select_corte").click(function(e) {
                        jcrop_api.setSelect(getRandom());
                        $(".combo_recortar").show()
                    });
                    $(".recortar_imagem").click(function() {
                        var srcImagem = $("#imagem_crop").attr("src");
                        var x1 = $("#x1").val();
                        var x2 = $("#x2").val();
                        var y1 = $("#y1").val();
                        var y2 = $("#y2").val();
                        var strNomeArquivo = $("#strNomeArquivo").val();
                        var strDirAqruivo = $("#strDirAqruivo").val();
                        if (x2 == "" || x2 < 1 || y2 == "" || y2 < 1) {
                            alert("Selecione uma �rea da imagem para recorte.")
                        } else {
                            if (x2 < 170 || y2 < 170) {
                                alert("Crop n�o tem o tamanho m�nimo de 170 x 170 pixels.")
                            } else {
                                $.ajax({
                                    type: "POST",
                                    url: "/AVA/Upload/Home/Crop",
                                    data: {
                                        x1: x1,
                                        x2: x2,
                                        y1: y1,
                                        y2: y2,
                                        srcImagem: srcImagem,
                                        strNomeArquivo: strNomeArquivo,
                                        strDirArquivo: strDirAqruivo,
                                        idArquivo: idArquivo
                                    },
                                    dataType: "json",
                                    success: function(data, status) {
                                        strNomeArquivoGlobalAux = data.nomefinal;
                                        $("#img_padrao").html('<img src="' + data.imagem_recortada + '"/>');
                                        $(".recortar_imagem").hide();
                                        $(".combo_recortar").hide();
                                        $("#strDirArquivoCrop").val(data.imagem_recortada);
                                        $(".download").attr("href", "/AVA/Upload/Home/ForceDownload?strSrcArquivo=" + data.imagem_recortada);
                                        bolCrop = true;
                                        $(".select_corte").hide()
                                    },
                                    error: function(xmlHttpRequest, status, err) {
                                        alert("Erro: " + err + "Status: " + status)
                                    }
                                })
                            }
                        }
                    })
                } else {
                    alert("Esta imagem n�o tem o tamanho m�nimo de 170 x 170 pixels.");
                    $(".recortar_imagem").hide()
                }
            } else {
                $(".recortar_imagem").hide()
            }
        },
        error: function(data) {
            console.debug(data.status)
        }
    })
}

function habilitaRecorte() {
    jcrop_api.setSelect(getRandom());
    $(".combo_recortar").show()
}

function getRandom() {
    var idImagem = $("#idArquivo").val();
    var width = null;
    var height = null;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        async: false,
        url: "/AVA/Upload/Home/GetDadosImagem?idImagem=" + idImagem,
        dataType: "json",
        success: function(data, status) {
            width = data.width;
            height = data.height
        },
        error: function(xmlHttpRequest, status, err) {
            alert("Erro: " + err + "Status: " + status)
        }
    });
    posicao = new Object();
    posicao.w = width;
    posicao.h = height;
    posicao.x = 0;
    posicao.y = 0;
    if (height <= width) {
        posicao.x2 = height;
        posicao.y2 = height
    } else {
        posicao.x2 = width;
        posicao.y2 = width
    }
    showCoords(posicao);
    return [posicao.x, posicao.y, posicao.x2, posicao.y2]
}

function getDadosImagem(idImagem) {
    var width = null;
    var height = null;
    var boolTamanho;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/AVA/Upload/Home/GetDadosImagem?idImagem=" + idImagem,
        async: false,
        dataType: "json",
        success: function(data, status) {
            width = data.width;
            height = data.height;
            boolTamanho = data.boolTamanho
        },
        error: function(xmlHttpRequest, status, err) {
            alert("Erro: " + err + "Status: " + status)
        }
    });
    return [width, height, boolTamanho]
}

function showCoords(c) {
    $("#x1").val(c.x);
    $("#x2").val(c.x2);
    $("#y1").val(c.y);
    $("#y2").val(c.y2);
    $(".combo_recortar").show()
}

function AlterarArquivo() {
    var idArquivo = $("#idArquivo").val();
    var strNome = $("#strNome").val();
    var strDescricao = $("#strDescricao").val();
    var idFerramenta = $("#idFerramenta").val();
    var idFerramentaTipo = $("#idFerramentaTipo").val();
    var strArquivo = $("#strNomeArquivo").val();
    var strDirArquivoCrop = $("#strDirArquivoCrop").val();
    var nomeImgTemp = strDirArquivoCrop.split("/");
    nomeImgTemp = nomeImgTemp[nomeImgTemp.length - 1];
    nomeImgTemp = nomeImgTemp.split(".");
    nomeImgTemp = nomeImgTemp[0];
    if (strNome == "") {
        alert("Nome do arquivo em branco.")
    } else {
        if (!bolTamanhoImg && validaBolCrop()) {
            alert("Esta imagem n�o tem o tamanho m�nimo de 170 x 170 pixels.")
        } else {
            if (!bolCrop && validaBolCrop()) {
                alert("Imagem deve ser recortada.")
            } else {
                if (bolCrop && validaBolCrop()) {
                    var srcImagem = null;
                    var strDirArquivoCrop = $("#strDirArquivoCrop").val();
                    $.ajax({
                        url: "/AVA/Upload/Home/SalvaArquivoPerfil",
                        data: {
                            idArquivo: idArquivo,
                            idFerramentaTipo: idFerramentaTipo,
                            nomeImgTemp: nomeImgTemp,
                            imgPerfilAtualAux: imgPerfilAtualAux
                        },
                        type: "POST",
                        dataType: "json",
                        async: false,
                        success: function(data) {
                            var erro = parseInt(data.error);
                            if (erro == 0) {
                                srcImagem = data.strArquivo
                            } else {
                                alert(data.strArquivo)
                            }
                        },
                        error: function(data) {
                            console.debug(data.status)
                        }
                    })
                }
                var jsonArq = {
                    id: idArquivo,
                    strNome: strNome,
                    strDescricao: strDescricao
                };
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/AVA/Upload/Home/AlteraArquivo",
                    data: {
                        json: JSON.stringify(jsonArq)
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function(data) {
                        var jsonArquivos = new Array();
                        $.ajax({
                            type: "POST",
                            url: "/AVA/Upload/Home/RetornaJsonArquivos",
                            data: {
                                idArquivo: idArquivo
                            },
                            async: false,
                            dataType: "json",
                            success: function(data, status) {
                                jsonArquivos.push(data)
                            },
                            error: function(xmlHttpRequest, status, err) {
                                alert("Erro: " + err + "Status: " + status)
                            }
                        });
                        if (validaBolCrop()) {
                            jsonArquivos[0].strArquivo = srcImagem
                        }
                        bolAuxDeletarimg = false;
                        alert("Arquivo alterado com sucesso!");
                        var jsonRetorno = {
                            idFerramenta: idFerramenta,
                            idFerramentaTipo: idFerramentaTipo,
                            arrayArquivo: jsonArquivos
                        };
                        if (bolCrop && validaBolCrop()) {
                            window.opener.CallbackUpload(jsonRetorno);
                            window.close()
                        }
                    },
                    error: function(data) {
                        if (data.status != 0) {
                            console.debug("Erro ao salvar arquivo.")
                        }
                    }
                })
            }
        }
    }
}

function SalvaArquivoCropPerfil() {
    var strDirArquivoCrop = $("#strDirArquivoCrop").val();
    $.ajax({
        url: "/AVA/Upload/Home/SalvaArquivoPerfil",
        data: {
            strDirArquivoCrop: strDirArquivoCrop
        },
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(data) {},
        error: function(data) {
            console.debug(data.status)
        }
    })
}

function ListaAndamento() {
    $(".add_arquivos").hide();
    $(".meus_arquivos").show()
}

function DownloadArquivo(strCaminhoArquivo) {
    var contentType = null;
    $.ajax({
        url: "/AVA/Upload/Home/ForceDownload",
        data: {
            caminhoArquivo: strCaminhoArquivo,
            contentType: contentType
        },
        type: "POST",
        success: function(data) {},
        error: function(data) {
            console.debug(data.status)
        }
    })
}

function deletarImagemProcessoIncompleto(idArquivo, strArquivo, bolAsync) {
    if (bolAsync === undefined || bolAsync == "" || bolAsync == null) {
        bolAsync = false
    }
    if (idArquivo !== undefined && idArquivo != "" && idArquivo != 0 && bolAuxDeletarimg) {
        $.ajax({
            url: "/ava/upload/home/removerImagemTrocarAbaOuFecharJanela",
            type: "POST",
            dataType: "json",
            data: {
                idarquivo: idArquivo,
                nomeArquivo: strArquivo
            },
            success: function(data) {
                strNomeArquivoGlobalAux = "";
                idArquivoGlobalAux = 0;
                var erro = parseInt(data.error);
                bolAuxDeletarimg = false;
                if (erro == 0) {
                    // console.log(data.msg)
                } else {
                    // console.log(data.msg)
                }
            },
            error: function(data) {},
            async: bolAsync
        })
    }
}

function ExcluirArquivoFerramenta(idArquivo, idFerramenta) {
    $.ajax({
        url: "/AVA/Upload/Home/ExcluiArquivoFerramenta",
        data: {
            idArquivo: idArquivo,
            idFerramenta: idFerramenta
        },
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(data) {},
        error: function(data) {
            console.debug(data.status)
        }
    })
}

function validaBolCrop() {
    var bolSomenteImgCrop = $("#bolSomenteImgCrop").val();
    if (bolSomenteImgCrop == "False") {
        bolSomenteImgCrop = false
    } else {
        bolSomenteImgCrop = true
    }
    return bolSomenteImgCrop
};