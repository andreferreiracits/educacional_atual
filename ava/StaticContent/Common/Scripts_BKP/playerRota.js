jQuery(function ($) {

    var urlname = window.location;
    var pathname = window.location.pathname;
    dominio = urlname.host;

    var i_sLastBarra = pathname.lastIndexOf("/", pathname.length);
    var i_sBLastBarra = pathname.lastIndexOf("/", i_sLastBarra - 1);
    var i_idRota = pathname.substring(i_sBLastBarra + 1, i_sLastBarra);
    var i_idEtapa = pathname.substring(i_sLastBarra + 1, pathname.length);

    //alert('i_idRota: ' + i_idRota);
    //alert('i_idEtapa: ' + i_idEtapa);

    /*******************
    * Remove a class atual das placas
    ********************/
    $('.placa_amarela').each(function () {
        $(this).removeClass('atual');
    });
    /*******************/


    /*******************
    * Verifica o ambiente e insere a classe atual e carrega o recurso
    ********************/
    if (pathname.toLowerCase().indexOf('/ava/caminhos/home/player') > -1) {
        $('.abrePlayer').each(function () {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr('idEtapa');
            $_link = placa.attr('rel');

            //alert($_idEtapa);

            if ($_idEtapa == i_idEtapa) {
                placa.parent().addClass('atual');
                executaPlayer(placa);
                return;
            }
        });

        $(".avaliacao").each(function () {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {

                $("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass('atual');
                //placa.parent().addClass("atual");
                //executaPlayer(placa);
                return;
            }
        });
        $(".abreSecao").each(function () {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {

                //$("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass('atual');
                $("#ava_box_player").empty();
                executaPlayer(placa);
                //placa.parent().addClass("atual");
                //executaPlayer(placa);
                return;
            }
        });
        $(".abrirObraLiteraria").each(function () {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {

                $("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass('atual');
                $("#ava_box_player").empty();
                //executaPlayer(placa);
                //placa.parent().addClass("atual");
                //executaPlayer(placa);
                return;
            }
        });
        $(".etapaDoMeuJeito").each(function () {
            placa = $(this).parent();
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            var cxMsg = $(this).parent().next(".etapa_infos");
            if ($_idEtapa == i_idEtapa) {

                $(".placa_amarela").removeClass("atual");
                placa.addClass('atual');
                $("#ava_box_player").empty();
                //executaPlayer(placa);
                //placa.parent().addClass("atual");
                //executaPlayer(placa);
                trabalho = cxMsg.find(".container_entrega_aluno");
                if (trabalho.attr("class") != "container_entrega_aluno") {
                    if (cxMsg.is(":visible") && placa.hasClass("atual")) {
                        var estaPlaca = placa;
                        setTimeout(function () {
                            var idRotaEtapaUsuario = estaPlaca.children(":first").attr("idRotaEtapaUsuario");
                            var idRotaUsuario = estaPlaca.children(":first").attr("idRotaUsuario");
                            var idEtapa = estaPlaca.children(":first").attr("idEtapa");
                            var idRecurso = estaPlaca.children(":first").attr("idRecurso");
                            var idRotaAgendamento = estaPlaca.children(":first").attr("idRotaAgendamento");
                            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                            estaPlaca.find(".ep_status").removeClass("ep_lida_off").addClass("ep_lida_on");
                        }, 5000);
                    }
                }

                return;

            }
        });
    } else { //Verifica fora da pagina do player
        $(".abreSecao").each(function () {
            placa = $(this).parent().prev().children(":first");
            $_idEtapa = $(this).attr("idEtapa");
            $_link = placa.attr("rel");
            if ($_idEtapa == i_idEtapa) {

                //$("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass('atual');
                placa.parent().find(".detalhes").hide();
                //placa.parent().addClass("atual");
                //executaPlayer(placa);
                return;
            }
        });

    }

    $(".verConteudo").live("click", function () {
        var este = $(this).closest(".etapa_infos").find(".fecha_X");
        este.trigger("click");
    });
    /*******************/

    $(".abreSecao").live("click", function () {
        var idEtapa = $(this).attr("idetapa");
        var idRotaUsuario = $(this).attr("idrotausuario");
        var idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
        var este = $(this).parent().prev().children(":first");
        var idRecurso = $(this).attr("idrecurso");
        $_idEtapa = $(this).attr("idEtapa");
        idRotaAgendamento = location.href.split("rota=");
        idRotaAgendamento = idRotaAgendamento[1].split("&");
        idRotaAgendamento = idRotaAgendamento[0];
        janela = $(this).parent();
        placa = janela.prev().children(":first");
        fecharJanelaDescricao(janela);
        var teste = $(this).parent().find(".container_entrega_aluno");
        if (teste.attr("class") == "container_entrega_aluno") {

        } else {
            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
            $.ajax({
                url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                data: {
                    idRotaUsuario: idRotaUsuario,
                    idEtapa: $_idEtapa //idEtapaAtual
                },
                cache: false,
                async: true,
                success: function (data) {
                    if (data != "0") {
                        este.find(".ep_status").removeClass("ep_lida_off").addClass("ep_lida_on");
                    }
                    verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
                },
                error: function (data) {
                    //alert(data);
                    console.debug(data);
                }
            });
        }
        //tamanho = idRotaAgendamento[1].split("&").length;
        //idEtapaPagina = idEtapaPagina[1].substring(1, tamanho);



    });
    $('.abrePlayer').live('click', function () {
        var idEtapa = $(this).attr("idetapa");
        var idRotaUsuario = $(this).attr("idrotausuario");
        var idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
        //var janela = $(this);
        var este = $(this).closest(".etapa_infos");
        var idRecurso = $(this).attr("idrecurso");
        var teste = $(this).parent().find(".container_entrega_aluno");
        if (teste.attr("class") == "container_entrega_aluno") {
            //alert("entrega trabalho");

        } else {
            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, i_idRota, true, "normal", "nao");
            $.ajax({
                url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                data: {
                    idRotaUsuario: idRotaAtual,
                    idEtapa: idEtapa //idEtapaAtual
                },
                cache: false,
                async: true,
                success: function (data) {
                    if (data != "0") {
                        //este.parent().addClass("feito");
                        este.prev().children(":first").find(".ep_status").removeClass("ep_lida_off").addClass("ep_lida_on");
                    }
                    verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
                },
                error: function (data) {
                    //alert(data);
                    console.debug(data);
                }
            });
        }

        fecharJanelaDescricao(este);
        este.prev().find(".detalhes").show().effect("bounce", { times: 3 }, 300);

        var iframHide = $("#ava_box_player").find("iframe");
        iframHide.show();
        //se estiver na página player do rotas


    });

    $('.ava_abreAvaliacao').live('click', function () {
        //se estiver na página player do rotas
        //if($('#ava_box_player').length){
        idRotaUsuario = $(this).attr("idRotaUsuario");
        idEtapa = $(this).attr("idEtapa");
        idRecurso = $(this).attr("idRecurso");
        idRotaAgendamento = $(this).attr("idRotaAgendamento");
        idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
        var teste = $(this).parent().find(".container_entrega_aluno");
        if (teste.attr("class") == "container_entrega_aluno") {
            abreAvaliacao($(this));
        } else {
            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "avaliacao", "nao");
            abreAvaliacao($(this));
        }

        /*}else{
        ////está em uma sessão do portal e tem q voltar para a página player do rotas		
        $idEtapa = $(this).attr('idEtapa');			
        window.location.href = "/AVA/Caminhos/Home/Player/81/" + $idEtapa;
        }*/

    });
    /*******************
    * Verifica se a etapa ja foi marcada como concluida
    ********************/
    if (pathname.toLowerCase().indexOf('/ava/caminhos/home/resumo') > -1) {
        verificaAvaliacaoConcluidaEditaEtapa();
        //idRotaUsuario = $(".table_etapas .e-titulo .e-actions").find(".bt_normal").attr("idRotaUsuario");
        //verificaTodosConcluidosParaEncerrarCaminho(location.href.split("/").pop());
    }

    /*******************
    * Verifica se a etapa ja foi marcada como concluida
    ********************/

    if (pathname.toLowerCase().indexOf('/ava/caminhos/home/player') > -1) {
        $(".listaEtapas").each(function () {
            idRotaAtual = $(this).attr("idRotaUsuario");
        });
        /* var quantidade = 0;
        $(".listaEtapas").each(function () {
        idEtapaAtual = $(this).attr("idEtapa");
        idRotaAtual = $(this).attr("idRotaUsuario");
        este = $(this).closest(".etapa_infos").prev().children(":first").find(".ep_status");
        trabalho = $(this).closest(".etapa_infos").find(".container_entrega_aluno");
        $.ajax({
        url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
        data: {
        idRotaUsuario: idRotaAtual,
        idEtapa: idEtapaAtual
        },
        async: false,
        success: function (data) {
        if (data != "0") {
        if(trabalho.attr("class") == "container_entrega_aluno"){
        este.removeClass("arq_enviado_off").addClass("arq_enviado_on");
        } else {
        este.removeClass("ep_lida_off").addClass("ep_lida_on");
        }
        quantidade++;
        }
        },
        error: function (data) {
        alert(data);
        }
        });
        });
        $(".placa_verde").children("p").children(":first").text(quantidade);*/
        $(".ava_abreAvaliacao").each(function () {
            idAvaliacao = $(this).attr("idAvaliacao");
            intOrdemAgendamento = $(this).attr("intOrdemAgendamento");
            este = $(this).closest(".etapa_infos").prev().children(":first").find(".ep_status");
            //trabalho = $(this).closest(".etapa_infos").find(".container_entrega_aluno");
            $.ajax({
                url: "/AVA/Caminhos/Home/VerificaAvaliacaoConcluida",
                data: {
                    idAvaliacao: idAvaliacao,
                    intOrdemAgendamento: intOrdemAgendamento

                },
                cache: false,
                async: false,
                success: function (data) {
                    if (data != "0") {
                        este.removeClass("ativ_off").addClass("ativ_on");
                    }
                },
                error: function (data) {
                    //alert(data.status);
                    console.debug(data.status);
                }
            });
        });
        verificaAvaliacaoConcluidaEditaEtapa();
        verificaTodosConcluidosParaEncerrarCaminho(idRotaAtual);

    }
    $(".placa_amarela").live("click", function (e) {
        //$("#ava_container").delegate(".placa_amarela", "click", function(){

        var placa = $(this).children(":first");
        $(".placa_amarela").find(".detalhes").show();
        placa.find(".detalhes").hide();
        $(".etapa_infos").hide();
        janelaDescricao = $(this).next();
        var idRecurso = placa.attr("idRecurso");
        janelaDescricao.show()
        if (idRecurso != "1" && idRecurso != "8" && idRecurso != "3") {
            if (location.href.indexOf("/Player") < 1) {

                location.href = "/AVA/Caminhos/Home/Player/" + placa.attr("idRotaAgendamento") + "/" + placa.attr("idEtapa");

            } else if (idRecurso == "11") {
                //Etapa do meu jeito
                //alert(idRecurso);
                $("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass("atual");
                e.preventDefault();


                //placa = $(this);
                rel = placa.attr("rel");
                idRecurso = parseInt(placa.attr("idRecurso"));
                idRotaUsuario = placa.attr("idRotaUsuario");
                idEtapa = placa.attr("idEtapa");
                idRotaAgendamento = placa.attr("idRotaAgendamento");
                idRotaEtapaUsuario = placa.attr("idRotaEtapaUsuario");
                trabalho = placa.parent().next(".etapa_infos").find(".container_entrega_aluno");
                if (trabalho.attr("class") == "container_entrega_aluno") {

                } else {

                    //salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                    $.ajax({
                        url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                        data: {
                            idRotaUsuario: idRotaUsuario,
                            idEtapa: idEtapa //idEtapaAtual
                        },
                        cache: false,
                        async: false,
                        success: function (data) {
                            if (data == "0") {
                                //placa.find(".ep_status").removeClass("ep_lida_off").addClass("ep_lida_on");

                                if (placa.parent().next(".etapa_infos").is(":visible")) {
                                    setTimeout(function () {
                                        var idRotaEtapaUsuario = placa.attr("idRotaEtapaUsuario");
                                        var idRotaUsuario = placa.attr("idRotaUsuario");
                                        var idEtapa = placa.attr("idEtapa");
                                        var idRecurso = placa.attr("idRecurso");
                                        var idRotaAgendamento = placa.attr("idRotaAgendamento");
                                        salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                                        placa.find(".ep_status").removeClass("ep_lida_off").addClass("ep_lida_on");
                                    }, 5000);
                                }

                            }
                            verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
                        },
                        error: function (data) {
                            //alert(data);
                            console.debug(data);
                        }
                    });

                }

                return;
            }
            else if (idRecurso == "9") {
                $("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass("atual");
                e.preventDefault();
                return;
            }
            else {
                executaPlayer(placa);
            }

        }
        else if (idRecurso == "3" || idRecurso == "8") {
            location.href = janelaDescricao.prev().children(":first").attr("rel");
        }
        /* else if(idRecurso == "8"){
        location.href = janelaDescricao.prev().children(":first").attr("rel");
        } */
        else {
            if (location.href.indexOf("/Player") < 1) {
                location.href = "/AVA/Caminhos/Home/Player/" + placa.attr("idRotaAgendamento") + "/" + placa.attr("idEtapa");
            } else {
                $("#ava_box_player").empty();
                $(".placa_amarela").removeClass("atual");
                placa.parent().addClass("atual");
            }
        }

    });

    /* $("#ava_container").delegate(".etapaDoMeuJeito", "click", function () {

    placa = $(this);
    rel = placa.attr("rel");
    idRecurso = parseInt(placa.attr("idRecurso"));
    idRotaUsuario = placa.attr("idRotaUsuario");
    idEtapa = placa.attr("idEtapa");
    idRotaAgendamento = placa.attr("idRotaAgendamento");
    idRotaEtapaUsuario = placa.attr("idRotaEtapaUsuario");
    //salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
    $.ajax({
    url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
    data: {
    idRotaUsuario: idRotaUsuario,
    idEtapa: idEtapa //idEtapaAtual
    },
    cache: false,
    async: false,
    success: function (data) {
    if (data != "0") {
    //placa.find(".ep_status").removeClass("ep_lida_off").addClass("ep_lida_on");
    trabalho = placa.parent().next(".etapa_infos").find(".container_entrega_aluno");
    if (trabalho.attr("class") != "container_entrega_aluno") {
    if (placa.parent().next(".etapa_infos").is(":visible")) {
    setTimeout(function () {
    var idRotaEtapaUsuario = placa.attr("idRotaEtapaUsuario");
    var idRotaUsuario = placa.attr("idRotaUsuario");
    var idEtapa = placa.attr("idEtapa");
    var idRecurso = placa.attr("idRecurso");
    var idRotaAgendamento = placa.attr("idRotaAgendamento");
    salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
    placa.find(".ep_status").removeClass("ep_lida_off").addClass("ep_lida_on");
    }, 5000);
    }
                        
    }
    }
    verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
    },
    error: function (data) {
    //alert(data);
    console.debug(data);
    }
    });
    });*/

    $("#ava_container").delegate(".abrirObraLiteraria", "click", function () {
        var botaoPDF = $(this);
        rel = botaoPDF.attr("rel");
        idRecurso = parseInt(botaoPDF.attr("idRecurso"));
        idRotaUsuario = botaoPDF.attr("idRotaUsuario");
        idEtapa = botaoPDF.attr("idEtapa");
        idRotaAgendamento = botaoPDF.attr("idRotaAgendamento");
        idRotaEtapaUsuario = botaoPDF.attr("idRotaEtapaUsuario");
        este = $(this).closest(".etapa_infos").prev().children(":first").find(".ep_status");
        var teste = $(this).closest(".etapa_infos").find(".container_entrega_aluno");
        if (teste.attr("class") == "container_entrega_aluno") {
            window.open(rel, "Obra Literaria");
        } else {

            if (idRecurso == 9) {
                salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                $.ajax({
                    url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                    data: {
                        idRotaUsuario: idRotaUsuario,
                        idEtapa: idEtapa //idEtapaAtual
                    },
                    cache: false,
                    async: false,
                    success: function (data) {
                        if (data != "0") {
                            este.removeClass("ep_lida_off").addClass("ep_lida_on");
                        }
                        verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
                    },
                    error: function (data) {
                        //alert(data);
                        console.debug(data);
                    }
                });
                window.open(rel, "");
            }
        }

    });




    /* #### Fecha Janela da descrição da etapa */
    $("#ava_container").delegate(".fecha_X", "click", function (e) {
        janela = $(this).parent();
        janela.fadeOut("slow");
        e.preventDefault;
    });

    $("#botaoRecuroFecharJanela").live("click", function () {
        $(this).closest(".etapa_infos").find(".fecha_X").trigger("click");
    });
    //if (location.href.indexOf('/AVA/Caminhos/Home/Player') > -1) {
    /* $.getScript("/AVA/StaticContent/Common/Scripts/filedrag.js");
    $.getScript("/AVA/StaticContent/Common/Scripts/ajaxfileupload.js");*/

    // }
});
function enviarTrabalhoMarcarConcluido(elemento){
    var idRotaUsuario = elemento.attr("idRotaUsuario")
    var idEtapa = elemento.attr("idEtapa");
    var idRecurso = elemento.attr("idRecurso");
    var idRotaAgendamento = elemento.attr("idRotaAgendamento");
    var idRotaEtapaUsuario = elemento.attr("idRotaEtapaUsuario");
    if (elemento.closest(".etapa_infos").prev().children(":first").find(".ep_status").hasClass("arq_enviado_off")) {
        salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "trabalho", "nao");
    }

    $.ajax({
        url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
        data: {
            idRotaUsuario: idRotaUsuario,
            idEtapa: elemento.attr("idEtapa") //idEtapaAtual
        },
        async: true,
        cache: false,
        success: function (data) {
            if (data != "0") {
                elemento.closest(".etapa_infos").prev().children(":first").find(".ep_status").removeClass("arq_enviado_off").addClass("arq_enviado_on");
            }
            verificaTodosConcluidosParaEncerrarCaminho(elemento.attr("idRotaUsuario"));
        },
        error: function (data) {
            //alert(data);
            console.debug(data);
        }
    });
}

function fecharJanelaDescricao(janela){
    janela.hide();
}
function verificaAvaliacaoConcluidaEditaEtapa(){
    $(".avaliacao").each(function () {
        if ($(this).attr("idAvaliacao") != "0") {
            idRotaUsuario = $(this).attr("idRotaUsuario");
            idEtapa = $(this).attr("idEtapa");
            idRotaAgendamento = $(this).attr("idRotaAgendamento");
            idRecurso = $(this).attr("idRecurso");
            idAvaliacao = $(this).attr("idAvaliacao");
            intOrdemAgendamento = $(this).attr("intOrdemAgendamento");

            jQuery.ajax({
                url: "/AVA/Caminhos/Home/VerificaAvaliacaoConcluidaEditaEtapa",
                data: {
                    idRotaUsuario: idRotaUsuario,
                    idEtapa: idEtapa,
                    idRotaAgendamento: idRotaAgendamento,
                    idRecurso: idRecurso,
                    idAvaliacao: idAvaliacao,
                    intOrdemAgendamento: intOrdemAgendamento
                },
                cache: false,
                async: false,
                success: function (data) {
                    console.debug(data);
                },
                error: function (data) {
                    //alert(data.status);
                    console.debug(data.status);
                }
            });
        }
    });
    //VerificaAvaliacaoConcluida
}

function verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario) {

    jQuery.ajax({
        url: "/AVA/Caminhos/Home/VerificaTodasEtapasConcluidas",
        data: {
            idRotaUsuario: idRotaUsuario

        },
        cache: false,
        async: false,
        success: function (data) {
            if (data != "0") {
                console.debug(data);
            }

        },
        error: function (data) {
            //alert(data);
            console.debug(data);
        }
    });

}

function executaPlayer(e){
    
	$('#ava_box_player').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

	$('.placa_amarela').each(function () {
		$(this).removeClass('atual');
	});
    var idRecursoPlayer = e.attr("idRecurso");
	e.parent().addClass('atual');

	var $rel = e.attr('rel').toLowerCase();

	if ($rel == '') {
		$rel = 'Erro';
	}
	
	//Se for imagem, verifica largura e altura
	if (($rel.indexOf('.jpg') > 0) || ($rel.indexOf('.gif') > 0)) {		
		if(($rel.indexOf('http://') < 0)){
			$rel = "http://"+ dominio +"/" + $rel;
		}
		
		jQuery.ajax({
			url: "/AVA/Caminhos/Home/VerificaDetalhesImagem/",
			data: {
				strPath: $rel
			},
            cache: false,
			async: false,
			success: function (data) {
				$temp = data.split(',');
				//alert($temp[0]);
				//alert($temp[1]);
				if ($temp[0] > 726) {
					$('#ava_box_player').html("<a class='img_ava_red' href='" + $rel + "'><img  src='" + $rel + "' width='726' height='500' /></a>");
					/*****************************
					*LightBox Imagens
					*****************************/
					var t = $(".img_ava_red");
					var o = { 'autoScale': false, 'onComplete': function () {

					} //function
					}

					lightBoxAVA(t, o);
					/*****************************
					*LightBox Imagens
					*****************************/
				}
				else {
					$('#ava_box_player').html("<img src='" + $rel + "'/>");
				}
			},
			error: function () {
				alert("Ocorreu um erro ao buscar a imagem.");
			}


		});

	} else if (($rel.indexOf('conteudomultimidia') > 0) || ($rel.indexOf('linhadotempo') > 0)) {
        $('#ava_box_player').html("<iframe id='ifrmPlayer' src='" + $rel + "' width='100%' height='" + e.attr("alturaIframe") + "' frameborder='0' style='display: none;'></iframe>");
    } else if ($rel == 'Erro') {
		$('#ava_box_player').html($rel);	
	}
    else if(idRecursoPlayer == "3"){
        $('#ava_box_player').load("http://" + dominio + $rel);
    }
    else if(idRecursoPlayer == "8"){
        link = e.attr("rel");
        idRotaAgendamento = e.attr("idRotaAgendamento");
        idEtapa = e.attr("idEtapa");
        location.href = link; //+ "&rota=" + idRotaAgendamento + "&idEtapa=" + idEtapa;
    }
     else{
		$('#ava_box_player').load($rel);
	}
}

function abreAvaliacao(e){		
	//$('#ava_box_player').html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
	
	var $rel = e.attr('rel').toLowerCase();
	$('#ava_box_player').html("<a class='ava_abreAvaliacao_frame' href='" + $rel + "'></a>");
					
	/*****************************
	*LightBox Imagens
	*****************************/
	
	
	$(".ava_abreAvaliacao_frame").trigger('click');
	window.open($rel, "Avaliacao", "toolbar = no, location = yes, status = yes, menubar = no, scrollbars = yes, resizable = no, width = 900, height = 600");
}

function salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, bolConcluido, tipo, del) {
    //tipo = normal, trabalho, avaliacao
    var feitos = $(".placa_verde").children("p").children(":first").text();
    var feitosTotal = $(".placa_verde").children("p").children(":last").text();
    if (idRecurso != 1) {
        jQuery.ajax({
            url: "/AVA/Caminhos/Home/SalvarCaminhoEtapaUsuario",
            data:
            {
                idRotaEtapaUsuario: idRotaEtapaUsuario,
                idRotaUsuario: idRotaUsuario,
                idEtapa: idEtapa,
                bolConcluido: bolConcluido,
                idRotaAgendamento: idRotaAgendamento,
                /*idRecurso: idRecurso,*/
                tipo: tipo,
                del: del
            },
            async: false,
            cache: false,
            timeout: 60000,
            success: function (data) {
                //alert(data)
                var idRotaEtapaUsuarioAtual;
                $("#ava_barralateral-direita").find(".placa_amarela").each(function () {
                    if ($(this).children(":first").attr("idEtapa") == idEtapa) {
                        idRotaEtapaUsuarioAtual = $(this).children(":first").attr("idRotaEtapaUsuario");
                        $(this).children(":first").attr("idRotaEtapaUsuario", data);
                        return;
                    }
                });
                if (data != "Caminho já está encerrado" && data.substring(0, 200).indexOf("doctype html") < 0) {
                    if (data != "-1") {
                        if (idRotaEtapaUsuarioAtual == "0" || idRotaEtapaUsuarioAtual == "-1") {
                            feitos = parseInt(feitos);
                            feitos = feitos + 1;
                            feitosTotal = parseInt(feitosTotal);
                            if (!($(".placa_verde").children("p").hasClass("e_finalizada"))) {
                                if (feitos == feitosTotal) {
                                    $(".placa_verde").children("p").remove();
                                    $(".placa_verde").append("<p class=\"e_finalizada\">Etapas finalizadas!  <span class=\"feito\"></span></p>");
                                    $(".placa_verde .e_finalizada").effect("bounce", { times: 2 }, 300);
                                } else {
                                    $(".placa_verde").children("p").children(":first").text(feitos);
                                }
                            }
                        }
                    } else {

                        if ($(".placa_verde").children("p").hasClass("e_finalizada")) {
                            $(".placa_verde").children("p").remove();
                            if (feitosTotal == "") {
                                var contPlaca = 0;
                                $(".placa_amarela").each(function () {
                                    contPlaca++;
                                });
                            }
                            $(".placa_verde").append("<p>Etapas completas: <span class=\"geral_etapas\">" + (contPlaca - 1) + "</span> de <span class=\"geral_etapas\">" + contPlaca + "</span></p>");
                            verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
                        } else {
                            $(".placa_verde").children("p").children("span:first").text(feitos - 1);
                        }

                    }


                }
            },
            error: function (data) {
                //alert("Erro ao salvar caminho etapa");
                console.debug("Erro ao salvar caminho etapa - debug: " + data.responseText + " - " + data.status);
            }
        });
    }
    else 
    {
        jQuery.ajax({
            url: "/AVA/Caminhos/Home/SalvarCaminhoEtapaUsuario",
            data:
            {
                idRotaEtapaUsuario: idRotaEtapaUsuario,
                idRotaUsuario: idRotaUsuario,
                idEtapa: idEtapa,
                bolConcluido: false,
                idRotaAgendamento: idRotaAgendamento,
                idRecurso: idRecurso
            },
            async: false,
            cache: false,
            timeout: 60000,
            success: function (data) {
                //alert(data)
            },
            error: function (data) {
                //alert("Erro ao salvar caminho etapa");
                //console.debug("Erro ao salvar caminho etapa");
                console.debug("Erro ao salvar caminho etapa - debug: " + data.responseText + " - " + data.status);
            }
        });
    }
}

function fazerEtapa(idRota, idEtapa, idRecurso, strLink, idRotaUsuario, idAvaliacao, intOrdemAgendamento) {
    
    $rel = "http://" + dominio + "/avaliacoesonline/fazer_avaliacao.asp?inicio=1&idAvaliacao=" + idAvaliacao + "&intAgend=" + intOrdemAgendamento;
	$('#ava_box_player').html("<a target='_blank'  class='ava_abreAvaliacao_frame' href='" + $rel + "'>Fazer Avaliação</a>");
					
		
    if(idRecurso == 8){
		//Fóruns
		window.location.href = strLink + "&rota=" + idRota + "&idEtapa=" + idEtapa;
	}else if(idRecurso == 9){
		//Obras Literárias
        window.location.href = "/AVA/Caminhos/Home/Player/" + idRota + "/" + idEtapa;
		//window.location.href = strLink + "?rota=" + idRota;
	}
    else if(idRecurso == 3){
        window.location.href = strLink + "&rota=" + idRota + "&idEtapa=" + idEtapa;
    }

    else{
		window.location.href = "/AVA/Caminhos/Home/Player/" + idRota + "/" + idEtapa;
	}
}

function fazer(rel, idEtapa, idRotaEtapaUsuario, idRotaUsuario, idRecurso, idAvaliacao, intOrdemAgendamento, idRotaAgendamento, trabalho){
    if(trabalho == "true"){
        trabalho = true;
    } else {
        trabalho = false;
    }
    if(idRecurso != 1){ // Não é Avaliação
        if(idRecurso == 8 || idRecurso == 3){ //AbreSecao
        }
        else if(idRecurso == 9){ //Obra Literaria
        }
        else if(idRecurso == 11){ //Etapa do Meu Jeito
        }
        else { // Abre Player
            /*var idEtapa = $(this).attr("idetapa");
            var idRotaUsuario = $(this).attr("idrotausuario");
            var idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
            //var janela = $(this);
            var este = $(this).closest(".etapa_infos");
            var idRecurso = $(this).attr("idrecurso");*/
            var teste = $(this).parent().find(".container_entrega_aluno");
            if(trabalho){
                //alert("entrega trabalho");
            
            } else {
                salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "normal", "nao");
                $.ajax({
                    url: "/AVA/Caminhos/Home/VerificaEtapaConcluida",
                    data: {
                        idRotaUsuario: idRotaAtual,
                        idEtapa: idEtapa //idEtapaAtual
                    },
                    cache: false,
                    async: true,
                    success: function (data) {
                        if (data != "0") {
                            //este.parent().addClass("feito");
                            este.prev().children(":first").find(".ep_status").removeClass("ep_lida_off").addClass("ep_lida_on");
                        }
                        verificaTodosConcluidosParaEncerrarCaminho(idRotaUsuario);
                    },
                    error: function (data) {
                        //alert(data);
                        console.debgu(data);
                    }
                });
            }
        
        //fecharJanelaDescricao(este);
        }
    }
    else { //Avaliacao
        /*idRotaUsuario = $(this).attr("idRotaUsuario");
        idEtapa = $(this).attr("idEtapa");
        idRecurso = $(this).attr("idRecurso");
        idRotaAgendamento = $(this).attr("idRotaAgendamento");
        idRotaEtapaUsuario = $(this).attr("idRotaEtapaUsuario");
        var teste = $(this).parent().find(".container_entrega_aluno");*/
        if(trabalho){
            abreAvaliacao(rel);
        } else {
            salvarCaminhoEtapaUsuario(idRotaEtapaUsuario, idRotaUsuario, idEtapa, idRecurso, idRotaAgendamento, true, "avaliacao", "nao");
            abreAvaliacao(rel);
        }
        
    }
}