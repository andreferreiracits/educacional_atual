function $id(e) {
    return document.getElementById(e)
}

function OutputAlert(e, a) {
    var i = $id("messages_" + a);
    i.innerHTML = i.innerHTML + e
}

function FileDragHover(e) {
    if (console.log("FileDragHover"), getInternetExplorerVersion() > -1) {
        idSplit = e.srcElement.id, idSplit = idSplit.split("_"), e.cancelBubble = !0, e.returnValue = !1, $("#" + e.srcElement.id).removeClass("selhover");
        var a = "dragover" == e.type ? "drag-drop-area selhover" : "";
        $("#" + e.srcElement.id).addClass(a)
    } else {
        idSplit = e.currentTarget.id, idSplit = idSplit.split("_"), e.stopPropagation(), e.preventDefault(), $("#" + e.currentTarget.id).removeClass("selhover");
        var a = "dragover" == e.type ? "drag-drop-area selhover" : "";
        $("#" + e.currentTarget.id).addClass(a)
    }
}

function FileSelectHandler(e) {
    console.log("FileSelectHandler");


    var a;
    getInternetExplorerVersion() > -1 ? (idSplit = e.srcElement.id, idSplit = idSplit.split("_")) : (idSplit = e.currentTarget.id, idSplit = idSplit.split("_")), FileDragHover(e);
    var i = !1;
    a = getInternetExplorerVersion() > -1 ? e.srcElement.files : e.target.files, i = void 0 != a;
    var o = a || e.dataTransfer.files;
    $(".lista_biblioteca").html('<div id="progressbar_1"></div>');
    for (var r, s = 0; r = o[s]; s++) {
        for (var l = r.name.substring(r.name.lastIndexOf(".")).toLowerCase(), t = !1, n = 0; n < extensoesPermitidas.length; n++)
            if (extensoesPermitidas[n] == l) {
                t = !0;
                break
            }
        if (t)
            if (i) {
                $id("messages_" + idSplit[1]);
                UploadFileSelecao(r, idSplit[1])
            } else {
                $id("messages_" + idSplit[1]);
                UploadFileDrop(r, idSplit[1])
            }
        else InformationAlertFile(r, idSplit[1])
    }
    $id("fileselect_" + idSplit[1]).value = ""
}

function InformationAlertFile(e, a) {
    console.log("InformationAlertFile");
    var i = null;
    i = validaBolCrop() ? "<strong>Alerta:</strong> " + e.name + " falhou. Opera��o cancelada. Por favor, suba um arquivo em formato .jpg, .jpeg, .gif ou .png." : "<strong>Alerta:</strong> " + e.name + " falhou no upload devido a um erro. Este tipo de arquivo n&atilde;o &eacute; permitido por raz&otilde;es de seguran&ccedil;a.", OutputAlert("<div class='ui-widget'><div class='ui-state-error ui-corner-all' style='padding: 0 .7em;'><p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span>" + i + "</p></div></div>", a)
}

function UploadFileSelecao(file, contador) {
    if (console.log("UploadFileSelecao"), !(location.host.indexOf("drag3") >= 0)) {
        var xhr = new XMLHttpRequest;
        if (xhr.upload && file.size <= limite) {
            ListaAndamento(), $(".tabs li").removeClass("active"), $(".auxMeusArq").addClass("active"), $("#menu_andamento").parent().css("display", "block"), countGlobalIdImage++, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")");
            var reader = new FileReader;
            reader.onload = function(e) {
                var auxFileName = file.name;
                auxFileName = auxFileName.replace(/ /g, ""), auxFileName = auxFileName.split(".");
                var auxFileNameExt = auxFileName[auxFileName.length - 1];
                auxFileName.pop();
                var auxFileNameName = auxFileName.join("");
                auxFileName = new Array, auxFileName.push(auxFileNameName), auxFileName.push(auxFileNameExt.toLowerCase()), countIdRetorno++;
                var envioRetorno = new Object;
                envioRetorno.idRetorno = countIdRetorno, "jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1] ? (srcGlobalImg = e.target.result, envioRetorno.srcImg = srcGlobalImg, arrayReturnObj.push(envioRetorno), $("#progressbar_" + contador).prepend("<div class='item_arquivo img arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + "'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'><img id='img_andamento_" + file.name + "' src='" + e.target.result + "' width='192' height='170' alt='" + file.name + "'></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>")) : "wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1] ? $("#progressbar_" + contador).prepend("<div class='item_arquivo audio'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'><p></p></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>") : $("#progressbar_" + contador).prepend("<div class='item_arquivo doc'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'><p>" + auxFileName[1] + "</p></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>"), $(".item_arquivo").mouseenter(function() {
                    $(this).find(".detalhe_arquivo").slideDown("fast")
                }), $(".item_arquivo").mouseleave(function() {
                    $(this).find(".detalhe_arquivo").slideUp()
                });
                var progressSingle = $("#progressbar_" + contador + " .singleProgress:first"),
                    progress = $("#progressbar_" + contador + " .algumProgresso:first");
                $("#progressbar_" + contador + " .algumProgresso:first").progressbar({
                    value: 0
                }), xhr.upload.addEventListener("progress", function(e) {
                    if (e.lengthComputable) {
                        var a = Math.round(100 * e.loaded / e.total);
                        progress.progressbar("option", "value", a), progress.next().html(a + "%")
                    } else alert("N�o foi poss�vel enviar o arquivo")
                }, !1), xhr.onreadystatechange = function(e) {
                    if (4 == xhr.readyState)
                        if (200 == xhr.status) {
                            var response = xhr.responseText;
                            response = eval("(" + response + ")");
                            var idArquivo = response.idarquivo,
                                idRetornoMet = response.idretorno,
                                error = response.error,
                                msg = response.msg;
                            if (console.log(idArquivo), 1 == idArquivo) alert(idRetornoMet);
                            else if (0 == idArquivo) InformationAlertFile(file, contador);
                            else {

                                var idFerrTipo = $("#idFerramentaTipo").val() ;

                                if(idFerrTipo == 35){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContador(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }

                                if(idFerrTipo == 31){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorArquivos(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }


                                 else if(idFerrTipo == 37){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorArquivos(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }

                                else if(idFerrTipo == 44){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorCp(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }

                                else if(idFerrTipo == 41){

                                    
                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorCp(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })



                                }

                                else if(idFerrTipo == 46){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorCp(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }

                                if(idFerrTipo == 15){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorTodosArquivos(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }
                            }
                        } else alert("N�o foi poss�vel enviar o arquivo")
                }, xhr.open("POST", $id("upload_" + contador).action, !0), xhr.setRequestHeader("X_FILENAME", retira_acentos(file.name)), xhr.setRequestHeader("idUsuarioRecebe", $id("idUsuarioRecebe_" + contador).value), xhr.setRequestHeader("intTamanho", file.size), xhr.setRequestHeader("idFerramenta", $id("idFerramenta_" + contador).value), xhr.setRequestHeader("idFerramentaTipo", $id("idFerramentaTipo_" + contador).value), xhr.setRequestHeader("idRetorno", envioRetorno.idRetorno), xhr.setRequestHeader("Content-Type", "multipart/form-data"), xhr.send(file)
            }, reader.readAsDataURL(file)
        } else alert("O arquivo pode ter no m�ximo 10MB, e o seguinte arquivo ultrapassa esse limite: " + file.name)
    }
}

function UploadFileDrop(file, contador) {
    
    console.log("file -> filedrag_3.2.0.js | func -> UploadFileDrop ");
    if (console.log("UploadFileDrop"), !(location.host.indexOf("drag3") >= 0)) {
        var xhr = new XMLHttpRequest;
        if (xhr.upload && file.size <= limite) {
            ListaAndamento(), $(".tabs li").removeClass("active"), $(".auxMeusArq").addClass("active"), $("#menu_andamento").parent().css("display", "block"), countGlobalIdImage++, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")");
            var reader = new FileReader;
            reader.onload = function(e) {
                var auxFileName = file.name;
                auxFileName = auxFileName.replace(/ /g, ""), auxFileName = auxFileName.split(".");
                var auxFileNameExt = auxFileName[auxFileName.length - 1];
                auxFileName.pop();
                var auxFileNameName = auxFileName.join("");
                auxFileName = new Array, auxFileName.push(auxFileNameName), auxFileName.push(auxFileNameExt.toLowerCase()), countIdRetorno++;
                var envioRetorno = new Object;
                envioRetorno.idRetorno = countIdRetorno, "jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1] ? (srcGlobalImg = e.target.result, envioRetorno.srcImg = srcGlobalImg, arrayReturnObj.push(envioRetorno), $("#progressbar_" + contador).prepend("<div class='item_arquivo img arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + "'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'><img id='img_andamento_" + file.name + "' src='" + e.target.result + "' width='192' height='170' alt='" + file.name + "'></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>")) : "wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1] ? $("#progressbar_" + contador).prepend("<div class='item_arquivo audio'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'><p></p></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>") : $("#progressbar_" + contador).prepend("<div class='item_arquivo doc'><div class='carregando'></div><div class='singleProgress'><div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span></div><div class='tipo_arquivo'><p>" + auxFileName[1] + "</p></div><div class='detalhe_arquivo'><p class='nome_arquivo'>" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + "</p></div></div>"), $(".item_arquivo").mouseenter(function() {
                    $(this).find(".detalhe_arquivo").slideDown("fast")
                }), $(".item_arquivo").mouseleave(function() {
                    $(this).find(".detalhe_arquivo").slideUp()
                });
                var progressSingle = $("#progressbar_" + contador + " .singleProgress:first"),
                    progress = $("#progressbar_" + contador + " .algumProgresso:first");
                $("#progressbar_" + contador + " .algumProgresso:first").progressbar({
                    value: 0
                }), xhr.upload.addEventListener("progress", function(e) {
                    if (e.lengthComputable) {
                        var a = Math.round(100 * e.loaded / e.total);
                        progress.progressbar("option", "value", a), progress.next().html(a + "%")
                    } else alert("N�o foi poss�vel enviar o arquivo")
                }, !1), xhr.onreadystatechange = function(e) {
                    if (4 == xhr.readyState)
                        if (200 == xhr.status) {
                            var response = xhr.responseText;
                            response = eval("(" + response + ")");
                            var idArquivo = response.idarquivo,
                                idRetornoMet = response.idretorno,
                                error = response.error,
                                msg = response.msg;
                            if (1 == idArquivo) alert(idRetornoMet);
                            else if (0 == idArquivo) InformationAlertFile(file, contador);
                            else {


                                var idFerrTipo = $("#idFerramentaTipo").val() ;

                                if(idFerrTipo == 15){


                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorTodosArquivos(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })



                                }
                                else if(idFerrTipo == 31){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorArquivos(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }
                                else if(idFerrTipo == 32){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorArquivos(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }
                                else if(idFerrTipo == 35){

                                    
                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContador(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })



                                }
                                else if(idFerrTipo == 36){

                                    
                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContador(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })



                                }
                                else if(idFerrTipo == 37){


                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorArquivos(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })


                                }
                                else if(idFerrTipo == 41){

                                    
                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorCp(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })



                                }
                                else if(idFerrTipo == 42){

                                    
                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorCp(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })



                                }
                                else if(idFerrTipo == 44){

                                    if (progress.progressbar("option", "value", 100), progress.next().html(" 100%"), AtualizaContadorCp(), !validaBolCrop())
                                        if ("jpg" == auxFileName[1] || "jpeg" == auxFileName[1] || "gif" == auxFileName[1] || "png" == auxFileName[1]) $(arrayReturnObj).each(function(e, a) {
                                            if (a.idRetorno == idRetornoMet) {
                                                var i = '<div class="item_arquivo img select idArq_' + idArquivo + '" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><img src="' + a.srcImg + '" width="192" height="170" alt="' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '"></div>	<div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0] + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 3)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                                arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(i)
                                            }
                                        });
                                        else if ("wav" == auxFileName[1] || "wma" == auxFileName[1] || "mp3" == auxFileName[1]) {
                                        var htmlArquivo = '<div class="item_arquivo audio idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p></p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 2)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    } else {
                                        var htmlArquivo = '<div class="item_arquivo doc idArq_' + idArquivo + ' select" idarquivo="' + idArquivo + '"><span class="ava_clips_seletor"></span><span class="ava_clips_seletor"></span><div class="tipo_arquivo"><p>.' + auxFileName[1] + '</p></div><div class="detalhe_arquivo" style="display: block; height: 15px;"><p class="nome_arquivo">' + auxFileName[0].replace(/[^a-zA-Z0-9]/g, "") + '</p><div class="arq_menu_links" style="display: none;"><a href="javascript:void(0);" class="FontAwesome visualizar_lupa up_tooltip" onclick="VisualizaArquivo(' + idArquivo + ', 1)"></a><div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;">Visualizar Arquivo</div></div></div></div>';
                                        arraySelecionados.push(idArquivo), arraySelecionadosHtml.push(htmlArquivo)
                                    }
                                    "jpg" != auxFileName[1] && "jpeg" != auxFileName[1] && "gif" != auxFileName[1] && "png" != auxFileName[1] || $("#ava_upload").on("click", ".arq_name_" + auxFileName[0].replace(/[^a-zA-Z0-9]/g, ""), function() {
                                        VisualizaArquivo(idArquivo, 3)
                                    }), countGlobalIdImage > 0 && (countGlobalIdImage--, $("#menu_andamento").html("Em andamento(" + countGlobalIdImage + ")")), 0 == countGlobalIdImage && $("#menu_andamento").parent().css("display", "none"), $(".carregando").remove(), $(".b_tooltip_center").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 0],
                                            opacity: 1,
                                            position: "top center",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_left").each(function() {
                                        $(this).tooltip({
                                            offset: [0, 40],
                                            opacity: 1,
                                            position: "top left",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    }), $(".b_tooltip_right").each(function() {
                                        $(this).tooltip({
                                            offset: [0, -40],
                                            opacity: 1,
                                            position: "top right",
                                            effect: "slide",
                                            relative: !0,
                                            events: {
                                                def: "click, mouseout"
                                            }
                                        })
                                    })
                                }
                            }
                        } else alert("N�o foi poss�vel enviar o arquivo")
                }, 
                
                xhr.open("POST", $id("upload_" + contador).action, !0), xhr.setRequestHeader("X_FILENAME", retira_acentos(file.name)), xhr.setRequestHeader("idUsuarioRecebe", $id("idUsuarioRecebe_" + contador).value), xhr.setRequestHeader("intTamanho", file.size), xhr.setRequestHeader("idFerramenta", $id("idFerramenta_" + contador).value), xhr.setRequestHeader("idFerramentaTipo", $id("idFerramentaTipo_" + contador).value), xhr.setRequestHeader("idRetorno", envioRetorno.idRetorno), xhr.setRequestHeader("Content-Type", "multipart/form-data"), xhr.send(file)
            }, 
            reader.readAsDataURL(file)
        } else alert("O arquivo pode ter no m�ximo 10MB, e o seguinte arquivo ultrapassa esse limite: " + file.name)
    }
}

function retira_acentos(e) {
    for (com_acento = "����������������������������������������������", sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC", nova = "", com_acento = new Array(225, 224, 227, 226, 228, 233, 232, 234, 235, 237, 236, 238, 239, 243, 242, 245, 244, 246, 250, 249, 251, 252, 231, 193, 192, 195, 194, 196, 201, 200, 202, 203, 205, 204, 206, 207, 211, 210, 213, 214, 212, 218, 217, 219, 220, 199), i = 0; i < e.length; i++) {
        for (var a = !1, o = 0; o < com_acento.length; o++) e.substr(i, 1).charCodeAt(0) == com_acento[o] && (a = !0, nova += sem_acento.substr(o, 1));
        a || (nova += e.substr(i, 1))
    }
    return nova
}

function InitFileDrag(e, a) {
    console.log('123');
    bolAlunoGlobal = a;
    var i = $id("fileselect_" + e),
        o = $id("filedrag_" + e);
    getInternetExplorerVersion() > -1 ? i.attachEvent("onchange", FileSelectHandler, !1) : i.addEventListener("change", FileSelectHandler, !1);
    var r = new XMLHttpRequest;
    getInternetExplorerVersion() > -1 ? r.upload && (o.attachEvent("ondragover", FileDragHover, !1), o.attachEvent("ondragleave", FileDragHover, !1), o.attachEvent("ondrop", FileSelectHandler, !1), o.style.display = "block") : r.upload && (o.addEventListener("dragover", FileDragHover, !1), o.addEventListener("dragleave", FileDragHover, !1), o.addEventListener("drop", FileSelectHandler, !1), o.style.display = "block")
}

function getInternetExplorerVersion() {
    var e = -1,
        a = navigator.userAgent,
        i = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
    return null != i.exec(a) && (e = parseFloat(RegExp.$1)), e
}
var limite = 1024e4,
    bolAlunoGlobal = !1,
    countGlobalIdImage = 0,
    srcGlobalImg = null,
    countIdRetorno = 0,
    arrayReturnObj = new Array,
    extensoesPermitidas = new Array,
    strExtensoes = "";
jQuery(function(e) {
    var a = parseInt(e("#bolAudio").val()),
        i = parseInt(e("#bolDocumento").val()),
        o = parseInt(e("#bolImagem").val()),
        r = new Array;
    e.ajax({
        type: "POST",
        url: "/AVA/Upload/Home/RetornaJsonExtensoesPermitidas",
        async: !1,
        dataType: "json",
        success: function(e) {
            r = e;
            for (var s = 0; s < r.length; s++) a > 0 && "�udio" == r[s].strBiblioteca && (extensoesPermitidas.push(r[s].strExtensao), strExtensoes += r[s].strExtensao.replace(".", "") + ", "), i > 0 && "Documentos" == r[s].strBiblioteca && (extensoesPermitidas.push(r[s].strExtensao), strExtensoes += r[s].strExtensao.replace(".", "") + ", "), o > 0 && "Imagens" == r[s].strBiblioteca && (extensoesPermitidas.push(r[s].strExtensao), strExtensoes += r[s].strExtensao.replace(".", "") + ", ");
            strExtensoes = strExtensoes.substring(0, strExtensoes.length - 2)
        },
        error: function(e, a, i) {
            alert("Erro: " + i + "Status: " + a)
        }
    })
});