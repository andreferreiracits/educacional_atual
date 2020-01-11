var limite = 10240000;
extensoesPermitidas = new Array(".ppt",".pptx",".odp",".wav",".wma",".mp3",".jpg",".jpeg",".gif",".png",".xls",".xlsx",".ods",".doc",".docx",".txt",".pdf",".odt",".rtf");
var bolAlunoGlobal = false;

// getElementById
function $id(id) {
    return document.getElementById(id);
}

// output information
function OutputAlert(msg, contador) {
    var fd = $id("messages_"+contador);
    fd.innerHTML = fd.innerHTML + msg;
}

// file drag hover
function FileDragHover(e) {
    if (getInternetExplorerVersion() > -1) {
        idSplit = e.srcElement.id;
        idSplit = idSplit.split("_");
        e.cancelBubble = true;
        e.returnValue = false;

        $("#" + e.srcElement.id).removeClass("selhover");
        var strClassHover = (e.type == "dragover" ? "drag-drop-area selhover" : "");
        $("#" + e.srcElement.id).addClass(strClassHover);
    } else {
        idSplit = e.currentTarget.id;
        idSplit = idSplit.split("_");
        e.stopPropagation();
        e.preventDefault();

        $("#" + e.currentTarget.id).removeClass("selhover");
        var strClassHover = (e.type == "dragover" ? "drag-drop-area selhover" : "");
        $("#" + e.currentTarget.id).addClass(strClassHover);
    }
    /*idSplit = e.currentTarget.id;
    idSplit = idSplit.split("_");*/


    
    
}

// file selection
function FileSelectHandler(e) {
    var arquivos;
    //alert(e.currentTarget.id);
    if (getInternetExplorerVersion() > -1) {
        idSplit = e.srcElement.id;
        idSplit = idSplit.split("_");
    } else {
        idSplit = e.currentTarget.id;
        idSplit = idSplit.split("_");
    }
    
    // cancel event and hover styling
    FileDragHover(e);
    var bolSelecao = false;

    if (getInternetExplorerVersion() > -1) {
        arquivos = e.srcElement.files;
    } else {
        arquivos = e.target.files;
    }

    if (arquivos == undefined) {
        bolSelecao = false;
    } else {
        bolSelecao = true;
    }

    // fetch FileList object
    var files = arquivos || e.dataTransfer.files;

    // process all File objects
    for (var i = 0, f; f = files[i]; i++) {
        var extensao = f.name.substring(f.name.lastIndexOf('.')).toLowerCase()
        var valido = false;
        for (var jj = 0; jj < extensoesPermitidas.length; jj++) {
            if(extensoesPermitidas[jj] == extensao){
                valido = true;
                break;
            }
        }
        if (!valido) {
            InformationAlertFile(f, idSplit[1])
        } else {
            if (bolSelecao) {
                var fd = $id("messages_" + idSplit[1]);
                UploadFileSelecao(f, idSplit[1]);
            } else {
                var fd = $id("messages_" + idSplit[1]);
                UploadFileDrop(f, idSplit[1]);
            }
        }
    }

    $id("fileselect_" + idSplit[1]).value = "";

}

function InformationAlertFile(file, contador) {
    OutputAlert(
		"<div class='ui-widget'><div class='ui-state-error ui-corner-all' style='padding: 0 .7em;'><p>" +
        "<span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span>" +
	    "<strong>Alerta:</strong> " + file.name + " falhou no upload devido a um erro. Este tipo de arquivo n&atilde;o &eacute; permitido por raz&otilde;es de seguran&ccedil;a." +
        "</p></div></div>", contador
	);
}

function UploadFileSelecao(file, contador) {

    if (location.host.indexOf("drag3") >= 0) return

    var xhr = new XMLHttpRequest();

    if (xhr.upload && file.size <= limite) {

        $("#progressbar_" + contador).prepend(
                                   "<div class='singleProgress'><span class='nome_Arquiv' title='" + file.name + "'>" + file.name + "</span>"
                                  + "<div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span> <span class='excludeProgress'>"
                                  + "<a href='javascript:void(0);' class='bt_normal red_light b_tooltip_left'>X</a></span></div>"
                                  );

        var progressSingle = $("#progressbar_" + contador + " .singleProgress:first");
        var progress = $("#progressbar_" + contador + " .algumProgresso:first");

        $("#progressbar_" + contador + " .algumProgresso:first").progressbar({
            value: 0
        });
        
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {                   
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                progress.progressbar("option", "value", percentComplete);
                progress.next().html(percentComplete + "%");
                
            }else {
                alert("N„o foi possÌvel enviar o arquivo");
            }
        }, false);

        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var idArquivo = xhr.responseText;
                    if (idArquivo == "0") {
                        InformationAlertFile(file, contador);
                    } else {
                        if ($id("idFerramentaTipo_" + contador).value == "15" && bolAlunoGlobal) {
                            var a = progress.closest(".container_entrega_aluno").closest(".etapa_infos");
                            if (a.find(".fecha_X").attr("idrotaagendamento") != "" && a.find(".fecha_X").attr("idrotaagendamento") != undefined && a.find(".fecha_X").attr("idrotaagendamento") != null) {
                                a = a.find(".fecha_X");
                            }
                            else if (a.find(".abrirObraLiteraria").attr("idrotaagendamento") != "" && a.find(".abrirObraLiteraria").attr("idrotaagendamento") != undefined && a.find(".abrirObraLiteraria").attr("idrotaagendamento") != null) {
                                a = a.find(".abrirObraLiteraria");
                            }
                            //console.debug(progress.parent().parent().parent().parent().parent().parent().parent().parent(".container_entrega_aluno").parent(".etapa_infos").children("span:first"));
                            // var valor = $id("idFerramentaTipo_" + contador).value;
                        
                            enviarTrabalhoMarcarConcluido(a);
                        }
                        progress.progressbar("option", "value", 100);
                        progress.next().html(" 100%");
                        
                        // Msg upload concluÌdo.
                        $("#progressbar_" + contador).prepend(
                                   "<div id='msg_aviso' class='ui-widget'><div class='ui-state-highlight ui-corner-all' style='display:none; margin-top:8px; padding: 0 .7em;'><p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><strong>Ok:</strong> Upload do arquivo '" + file.name + "' realizado com sucesso!</p></div></div>"
                                  );
                        $(".ui-state-highlight").fadeIn("slow");

                        progressSingle.attr("id", "boxarq_" + idArquivo);
                        progressSingle.children('span:last').append('<span class="black_tip_left black_tip_M tooltip" id="tooltipExc_' + idArquivo + '">' +
                                                '<p>Deseja realmente excluir este arquivo? </p>' +
                                                '<a href="javascript: void(0);" class="bt_normal green" onclick="excluirArquivo(' + idArquivo + ', true)">sim</a>' +
                                                ' <a href="javascript: void(0);" class="bt_normal red" onclick="excluirArquivo(' + idArquivo + ', false)">n&atilde;o</a>' +
                                                '<span class="black_tip_seta">&#9660;</span>' +
                                            '</span>');

                        $(".b_tooltip_center").each(function () {
                            $(this).tooltip({
                                offset: [0, 0],
                                opacity: 1,
                                position: 'top center',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'click, mouseout'
                                }
                            });
                        });
                        $(".b_tooltip_left").each(function () {
                            $(this).tooltip({
                                offset: [0, 40],
                                opacity: 1,
                                position: 'top left',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'click, mouseout'
                                }
                            });
                        });
                        $(".b_tooltip_right").each(function () {
                            $(this).tooltip({
                                offset: [0, -40],
                                opacity: 1,
                                position: 'top right',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'click, mouseout'
                                }
                            });
                        });
                    }
                } else {
                    alert("N„o foi possÌvel enviar o arquivo");
                }
            }
        };

       // alert(retira_acentos(file.name))
        
        xhr.open("POST", $id("upload_" + contador).action, true);
        xhr.setRequestHeader("X_FILENAME", retira_acentos(file.name));
        xhr.setRequestHeader("idUsuarioRecebe", $id("idUsuarioRecebe_" + contador).value);
        xhr.setRequestHeader("intTamanho", file.size);
        xhr.setRequestHeader("idFerramenta", $id("idFerramenta_" + contador).value);
        xhr.setRequestHeader("idFerramentaTipo", $id("idFerramentaTipo_" + contador).value);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(file);
        
    } else {
        alert("Arquivo '" + file.name + "' passou do limite!")
    }

}

function UploadFileDrop(file, contador) {
        
    if (location.host.indexOf("drag3") >= 0) return

    var xhr = new XMLHttpRequest();

    if (xhr.upload && file.size <= limite) {

        $("#progressbar_"+contador).prepend(
                                   "<div class='singleProgress'><span class='nome_Arquiv' title='" + file.name + "'>" + file.name + "</span>"
                                  + "<div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span> <span class='excludeProgress'>"
                                  + "<a href='javascript:void(0);' class='bt_normal red_light b_tooltip_left'>X</a></span></div>"
                                  );

        var progressSingle = $("#progressbar_" + contador + " .singleProgress:first");
        var progress = $("#progressbar_" + contador + " .algumProgresso:first");

        $("#progressbar_" + contador + " .algumProgresso:first").progressbar({
            value: 0
        });
        
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                progress.progressbar("option", "value", percentComplete);
                progress.next().html(percentComplete + "%");
            } else {
                alert("N„o foi possÌvel enviar o arquivo");
            }
        }, false);

        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var idArquivo = xhr.responseText;
                    if (idArquivo == "0") {
                        InformationAlertFile(file, contador);
                    } else {
                        if ($id("idFerramentaTipo_" + contador).value == "15" && bolAlunoGlobal) {
                            var a = progress.closest(".container_entrega_aluno").closest(".etapa_infos");
                            if (a.find(".fecha_X").attr("idrotaagendamento") != "" && a.find(".fecha_X").attr("idrotaagendamento") != undefined && a.find(".fecha_X").attr("idrotaagendamento") != null) {
                                a = a.find(".fecha_X");
                            }
                            else if (a.find(".abrirObraLiteraria").attr("idrotaagendamento") != "" && a.find(".abrirObraLiteraria").attr("idrotaagendamento") != undefined && a.find(".abrirObraLiteraria").attr("idrotaagendamento") != null) {
                                a = a.find(".abrirObraLiteraria");
                            }
                            //console.debug(progress.parent().parent().parent().parent().parent().parent().parent().parent(".container_entrega_aluno").parent(".etapa_infos").children("span:first"));
                            // var valor = $id("idFerramentaTipo_" + contador).value;

                            enviarTrabalhoMarcarConcluido(a);
                        }
                        progress.progressbar("option", "value", 100);
                        progress.next().html(" 100%");

                        // Msg upload concluÌdo.
                        $("#progressbar_" + contador).prepend(
                                   "<div id='msg_aviso' class='ui-widget'><div class='ui-state-highlight ui-corner-all' style='display:none; margin-top:8px; padding: 0 .7em;'><p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><strong>Ok:</strong> Upload do arquivo '" + file.name + "' realizado com sucesso!</p></div></div>"
                                  );
                        $(".ui-state-highlight").fadeIn("slow");

                        progressSingle.attr("id", "boxarq_" + idArquivo);
                        progressSingle.children('span:last').append('<span class="black_tip_left black_tip_M tooltip" id="tooltipExc_' + idArquivo + '">' +
                                                '<p>Deseja realmente excluir este arquivo? </p>' +
                                                '<a href="javascript: void(0);" class="bt_normal green" onclick="excluirArquivo(' + idArquivo + ', true)">sim</a>' +
                                                ' <a href="javascript: void(0);" class="bt_normal red" onclick="excluirArquivo(' + idArquivo + ', false)">n&atilde;o</a>' +
                                                '<span class="black_tip_seta">&#9660;</span>' +
                                            '</span>');

                        $(".b_tooltip_center").each(function () {
                            $(this).tooltip({
                                offset: [0, 0],
                                opacity: 1,
                                position: 'top center',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'click, mouseout'
                                }
                            });
                        });
                        $(".b_tooltip_left").each(function () {
                            $(this).tooltip({
                                offset: [0, 40],
                                opacity: 1,
                                position: 'top left',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'click, mouseout'
                                }
                            });
                        });
                        $(".b_tooltip_right").each(function () {
                            $(this).tooltip({
                                offset: [0, -40],
                                opacity: 1,
                                position: 'top right',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'click, mouseout'
                                }
                            });
                        });

                    }
                } else {
                    alert("N„o foi possÌvel enviar o arquivo");
                }
            }
        };

        xhr.open("POST", $id("upload_" + contador).action, true);
        xhr.setRequestHeader("X_FILENAME", retira_acentos(file.name));
        xhr.setRequestHeader("idUsuarioRecebe", $id("idUsuarioRecebe_" + contador).value);
        xhr.setRequestHeader("intTamanho", file.size);
        xhr.setRequestHeader("idFerramenta", $id("idFerramenta_" + contador).value);
        xhr.setRequestHeader("idFerramentaTipo", $id("idFerramentaTipo_" + contador).value);
        xhr.setRequestHeader("Content-Type", "multipart/form-data; charset=UTF-8");
        xhr.send(file);
      
    } else {
        alert("Arquivo '" + file.name + "' passou do limite!")
    }

}

function retira_acentos(palavra) {
    com_acento = '·‡„‚‰ÈËÍÎÌÏÓÔÛÚıÙˆ˙˘˚¸Á¡¿√¬ƒ…» ÀÕÃŒœ”“’÷‘⁄Ÿ€‹«';
    sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    nova = '';

    com_acento = new Array(225, 224, 227, 226, 228, 233, 232, 234, 235, 237, 236, 238, 239, 243, 242, 245, 244, 246, 250, 249, 251, 252, 231, 193, 192, 195, 194, 196, 201, 200, 202, 203, 205, 204, 206, 207, 211, 210, 213, 214, 212, 218, 217, 219, 220, 199);
    
    for (i = 0; i < palavra.length; i++) {
        var trocou = false;
        for (var j = 0; j < com_acento.length; j++) {
            if (palavra.substr(i, 1).charCodeAt(0) == com_acento[j]) {
                trocou = true;
                nova += sem_acento.substr(j, 1);
            }
        }
        if(!trocou) {
            nova += palavra.substr(i, 1);
        }       
    }
    return nova;
}
    
function InitFileDrag(contador, bolAluno) {

    bolAlunoGlobal = bolAluno;

    var fileselect = $id("fileselect_"+contador),
		filedrag = $id("filedrag_" + contador);

    if (getInternetExplorerVersion() > -1) {
        fileselect.attachEvent("on" + "change", FileSelectHandler, false);
    } else {
        fileselect.addEventListener("change", FileSelectHandler, false);
    }

    var xhr = new XMLHttpRequest();

    if (getInternetExplorerVersion() > -1) {       
        if (xhr.upload) {
            filedrag.attachEvent("on" + "dragover", FileDragHover, false);
            filedrag.attachEvent("on" + "dragleave", FileDragHover, false);
            filedrag.attachEvent("on" + "drop", FileSelectHandler, false);
            filedrag.style.display = "block";
        }
    } else {
        if (xhr.upload) {
            filedrag.addEventListener("dragover", FileDragHover, false);
            filedrag.addEventListener("dragleave", FileDragHover, false);
            filedrag.addEventListener("drop", FileSelectHandler, false);
            filedrag.style.display = "block";
        }
    }

}

function getInternetExplorerVersion()
{
    var rv = -1;
    var ua = navigator.userAgent;    

    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    return rv;
}