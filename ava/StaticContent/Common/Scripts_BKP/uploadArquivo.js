
function abrirUploadArquivo(idUsuarioRecebe, idFerramenta, idFerramentaTipo, bolMostraCaixaEnvio, contador, strBrowser, bolAluno) {
    
    if (strBrowser == "IE") {

        $("#countt_" + contador).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />")
        $.ajax({
            type: "POST",
            url: "/ava/upload/home/uploadIE",
            data: {
                idUsuarioRecebe: idUsuarioRecebe,
                idFerramenta: idFerramenta,
                idFerramentaTipo: idFerramentaTipo,
                contador: contador,
                bolAluno: bolAluno
            },
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                $("#countt_" + contador).html(data);
                $("#tabs_" + contador).tabs();

                $.getScript("/AVA/StaticContent/Common/Scripts/ajaxfileupload.js", function () {
                    if (bolMostraCaixaEnvio == "false") {

                        $(".etapa_infos").each(function () {
                            $(this).find("#filedrag_" + contador).remove();

                            if ($.trim($(this).find("#progressbar_" + contador).text()) == "") {
                                $(this).find("#progressbar_" + contador).html("<p>Nenhum arquivo enviado.</p>");
                            } else {
                                $(this).find("#progressbar_" + contador + " .excludeProgress").remove();
                            }
                        });

                    }
                });
                

            },
            error: function () {
                $(".container_inEntrega").html("erro ao carregar container upload.")
            }
        });

    } else {

        $("#countt_" + contador).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />")
        $.ajax({
            type: "POST",
            url: "/ava/upload/",
            data: {
                idUsuarioRecebe: idUsuarioRecebe,
                idFerramenta: idFerramenta,
                idFerramentaTipo: idFerramentaTipo,
                contador: contador
            },
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {
                $("#countt_" + contador).html(data);
                $("#tabs_" + contador).tabs();
                $.getScript("/AVA/StaticContent/Common/Scripts/filedrag.js", function () {
                    InitFileDrag(contador, bolAluno);

                    if (bolMostraCaixaEnvio == "false") {

                        $(".etapa_infos").each(function () {
                            $(this).find("#filedrag_" + contador).remove();

                            if ($.trim($(this).find("#progressbar_" + contador).text()) == "") {
                                $(this).find("#progressbar_" + contador).html("<p>Nenhum arquivo enviado.</p>");
                            } else {
                                $(this).find("#progressbar_" + contador + " .excludeProgress").remove();
                            }
                        });

                    }
                });
                

            },
            error: function () {
                $(".container_inEntrega").html("erro ao carregar container upload.")
            }
        });
    }

}

function excluirArquivo(idArquivo, bolExclui) {
    if (bolExclui) {
        $.ajax({
            type: "POST",
            url: "/ava/upload/home/Excluir",
            data: {
                id: idArquivo
            },
            cache: false,
            success: function (data) {
                var cxMsg = $("#boxarq_" + idArquivo).parent().parent();
                $('#boxarq_' + idArquivo).slideUp('slow', function () {
                    $(this).remove();                    
                });
                var idEtapa = cxMsg.closest(".etapa_infos").find(".listaEtapas").attr("idEtapa");
                if (idEtapa != "" && idEtapa !== undefined) {
                    var idRotaUsuario = cxMsg.closest(".etapa_infos").find(".listaEtapas").attr("idRotaUsuario");
                    var idRecurso = cxMsg.closest(".etapa_infos").find(".listaEtapas").attr("idRecurso");
                    var idRotaAgendamento = cxMsg.closest(".etapa_infos").find(".listaEtapas").attr("idRotaAgendamento");
                    var idRotaEtapaUsuario = cxMsg.closest(".etapa_infos").prev().children(":first").attr("idRotaEtapaUsuario");
                    var i = 0;
                    cxMsg.find(".nome_Arquiv").each(function () {
                        i++;
                    });
                    i = i - 1;
                    if (i == 0) {
                        var este = cxMsg.closest(".etapa_infos").prev().children(":first").find(".ep_status");
                        este.removeClass("arq_enviado_on").addClass("arq_enviado_off");
                        salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, false, "normal", "sim")
                    }

                }

                $("#msg_aviso").remove();
                
            },
            error: function () {
                $('#boxarq_' + idArquivo).html("erro ao excluir arquivo.")
            }
        });
    } else {        
        $('#tooltipExc_' + idArquivo).css("display","none");
    }
}

function ajaxFileUpload(contador, bolAluno) {
    
    if ($("#fileToUpload_" + contador).val() != "") {
        $("#msg_aviso").remove();

        var idUsuarioRecebe = $("#idUsuarioRecebe_" + contador).val();
        var idFerramenta = $("#idFerramenta_" + contador).val();
        var idFerramentaTipo = $("#idFerramentaTipo_" + contador).val();
        var fileNameUp = $("#fileToUpload_" + contador).val();
        
        fileNameUp = fileNameUp.split('\\');
        
        var tamanho = fileNameUp.length - 1;

        fileNameUp = fileNameUp[tamanho];
        
        $("#progressbar_" + contador).prepend(
                                   "<div class='singleProgress'><span class='nome_Arquiv' title='" + fileNameUp+ "'>" + fileNameUp + "</span>"
                                  + "<div class='algumProgresso'></div><span class='percCompleteUpload'> 0%</span> <span class='excludeProgress'>"
                                  + "<a href='javascript:void(0);' class='bt_normal red_light b_tooltip_left'>X</a></span></div>"
                                  );

        var progressSingle = $("#progressbar_" + contador + " .singleProgress:first");
        var progress = $("#progressbar_" + contador + " .algumProgresso:first");

        $("#progressbar_" + contador + " .algumProgresso:first").progressbar({
            value: 0
        });

        $.ajaxFileUpload({
            url: '/ava/Upload/Home/IniciaUploadIE/?idUsuarioRecebe=' + idUsuarioRecebe + '&idFerramentaTipo=' + idFerramentaTipo + '&idFerramenta=' + idFerramenta,
            secureuri: false,
            fileElementId: 'fileToUpload_' + contador,
            dataType: 'json',
            beforeSend: function () {
                $("#loading_" + contador).show();
            },
            complete: function () {
                $("#loading_" + contador).hide();
            },
            success: function (data, status) {

                if (typeof (data.error) != 'undefined') {

                    if (data.error == "0") { //Sucesso
                        var idArquivo = data.idarquivo;
                        var msgRetorno = data.msg;
                        var idFerramentaTipoAux = $("#idFerramentaTipo_" + contador).val();

                        if (idFerramentaTipoAux == "15" && bolAluno == "true") {
                            var a = progress.closest(".container_entrega_aluno").closest(".etapa_infos");
                            if (a.find(".fecha_X").attr("idrotaagendamento") != "" && a.find(".fecha_X").attr("idrotaagendamento") != undefined && a.find(".fecha_X").attr("idrotaagendamento") != null) {
                                a = a.find(".fecha_X");
                            }
                            else if (a.find(".abrirObraLiteraria").attr("idrotaagendamento") != "" && a.find(".abrirObraLiteraria").attr("idrotaagendamento") != undefined && a.find(".abrirObraLiteraria").attr("idrotaagendamento") != null) {
                                a = a.find(".abrirObraLiteraria");
                            }
                            
                            enviarTrabalhoMarcarConcluido(a);
                        }
                        
                        progress.progressbar("option", "value", 100);
                        progress.next().html(" 100%");
                        
                        $("#progressbar_" + contador).prepend(
                                   "<div id='msg_aviso' class='ui-widget'><div class='ui-state-highlight ui-corner-all' style='display:none; margin-top:8px; padding: 0 .7em;'><p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span><strong>Ok:</strong> Upload do arquivo '" + fileNameUp + "' realizado com sucesso!</p></div></div>"
                                  );
                       
                        $(".ui-state-highlight").fadeIn("slow");

                        progressSingle.attr("id", "boxarq_" + idArquivo);
                        progressSingle.children('span:last').append('<span class="black_tip_left black_tip_M tooltip" id="tooltipExc_' + idArquivo + '">' +
                                                '<p>Deseja realmente excluir este arquivo? </p>' +
                                                '<a href="javascript: void(0);" class="bt_normal green" onclick="excluirArquivo(' + idArquivo + ', true)">sim</a>' +
                                                ' <a href="javascript: void(0);" class="bt_normal red" onclick="excluirArquivo(' + idArquivo + ', false)">n&atilde;o</a>' +
                                                '<span class="black_tip_seta">&#9660;</span>' +
                                            '</span>');                       

                        
                        $(".b_tooltip_left").each(function () {
                            $(this).tooltip({
                                offset: [0, 0],
                                opacity: 1,
                                position: 'top left',
                                effect: 'slide',
                                relative: true,
                                events: {
                                    def: 'click, mouseout'
                                }
                            });
                        });                        

                    } else {
                        if (data.error == "1") {
                            var idArquivo = data.idarquivo;
                            var msgRetorno = data.msg;
                            InformationAlertFile($("#fileToUpload_" + contador).val(), contador);
                        }                        
                    }
                }
            },
            error: function (data, status, e) {
                alert(e);
            }
        })

    } else {
        alert("Selecione um arquivo.")
    }
    return false;

}

