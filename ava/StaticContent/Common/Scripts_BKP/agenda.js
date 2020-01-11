jQuery(function ($) {

	


    var dataBR = new Array();
    var url;
    url = location.href.toLowerCase();
    $(".meusChecks").live("click", function () {

        $(".meusChecks").attr("disabled", "disabled");
        $("#descricaoDia_EventoAgenda").empty().html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        var idCategoria = "";
        $("#formTemp").find(":checked").each(function () {
            //alert($(this).val());
            idCategoria = idCategoria + $(this).val() + ",";
        });
        var tamanho = idCategoria.length;
        idCategoria = idCategoria.substring(0, tamanho - 1);
        $(".agenda_BoxContador").empty().remove();
        var i = 0;
        var dataBR_aux = new Array();
        var $este = new Array();
        //.not(".ui-priority-secondary")
        $(".ui-state-default").each(function () {
            if ($(this).attr("ref") != undefined) {
                $este[i - 1] = $(this);
                valor = $(this).attr("ref").split("_");
                valor = valor[1].split("/");
                if (i == 1) {
                    dataBR_aux[0] = valor[1] + "/" + valor[0] + "/" + valor[2];
                    dataBR_aux[1] = valor[1] + "/" + valor[0] + "/" + valor[2];
                } else {
                    dataBR_aux[1] = valor[1] + "/" + valor[0] + "/" + valor[2];

                }
                //alert(dataBR_aux[0] + " - " + dataBR_aux[1]);
            }
            i++;
        });
        dataBR = getDates(dataBR_aux);
        mudarRel($este, dataBR, idCategoria);
        verificaEventos(dataBR, idCategoria);

        //carrega os eventos da data selecionada
        var $dataHoje = $("#calendar1").find(".ui-state-active").attr("rel");
        if ($dataHoje === undefined) {
            $dataHoje = $('.ui-datepicker-today').find('a').attr('rel');
        }
        if ($dataHoje != undefined) {
            $.post($dataHoje, function (data) {
                $('#descricaoDia_EventoAgenda').empty();
                $('#descricaoDia_EventoAgenda').html(data);
                $(".meusChecks").removeAttr("disabled");
            });
        } else {
            $('#descricaoDia_EventoAgenda').empty();
            $('#descricaoDia_EventoAgenda').html("Nenhum evento encontrado para esta data.");
            $(".meusChecks").removeAttr("disabled");
        }

        //$("#calendar1").empty().wijcalendar({ culture: 'pt-BR' });

    });



    /********************************************************************
    * Carrega Agenda
    ********************************************************************/
    if (url.indexOf("/perfil/home/index/") == -1) { //Se n�o for o perfil publico carrega
        $("#dadosAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.ajax({
            url: "/AVA/Agenda/Home/Index",
            success: function (data) {
                $("#dadosAgenda").html(data);
                $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
                /**********************************************************************/
                //Calendario
                /**********************************************************************/
                $("#calendar1").wijcalendar({ culture: 'pt-BR' });

                //carrega os eventos da data atual
                var $dataHoje = $('.ui-datepicker-today').find('a').attr('rel');
                $.post($dataHoje, function (data) {
                    $('#descricaoDia_EventoAgenda').html(data);

                });

            },
            error: function () {
                if (data.status != 0) {
                    console.debug("Ocorreu um erro na busca da agenda");
                }

                //alert("Ocorreu um erro na busca da agenda");
            }
        });
    } else { // esconde o a side no perfil publico
        $(".ads1").hide();
    }

    /********************************************************************
    * Mouseover em eventos cont�nuos
    ********************************************************************/
    $('.agd_evtContinuo').live('mouseover', function () {
        var $idEvento = $(this).attr('idevento');
        var $s_eventoId = "";

        $('a').each(function () {
            if ($(this).attr('eventoid')) {
                var $s_Continuo = 'Continuo' + $idEvento;
                $s_eventoId = $(this).attr('eventoid');

                if ($s_eventoId.length > 0) {
                    if ($s_eventoId.indexOf($s_Continuo, 0) > -1) {
                        $(this).css('background', '#F3DEB3');
                    }
                }
            }
        });
    }).live('mouseout', function () {
        var $idEvento = $(this).attr('idevento');

        $('a').each(function () {
            if ($(this).attr('eventoid')) {
                var $s_Continuo = 'Continuo' + $idEvento;
                $s_eventoId = $(this).attr('eventoid');

                if ($s_eventoId.length > 0) {
                    if ($s_eventoId.indexOf($s_Continuo, 0) > -1) {
                        $(this).css('background', '');
                    }
                }
            }
        });
    });


    $(".ads1").delegate("#dtmInicio", "blur", function () {
        $("#erroDataHora").css("display", "none");
    });
    $(".ads1").delegate("#dtmFim", "blur", function () {
        $("#erroDataHora").css("display", "none");
    });
    $(".ads1").delegate("#horaInicio", "blur", function () {
        $("#erroDataHora").css("display", "none");
    });
    $(".ads1").delegate("#horaFim", "blur", function () {
        $("#erroDataHora").css("display", "none");
    });

    /**********************************************************************/
    //Clique no dia
    /**********************************************************************/
    $('.avaJCalendario').live('click', function () {

        /**********************************************************************/
        //mostra a lista de eventos
        /**********************************************************************/

        $('a').each(function () {
            if ($(this).hasClass('ui-state-active')) {
                $(this).removeClass('ui-state-active');
            }
        });

        $(this).addClass('ui-state-active');
        $('#criar_EventoAgenda').show();
        $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $strRel = $(this).attr('rel');
        $.post($strRel, function (data) {
            $('#descricaoDia_EventoAgenda').html(data);
        });

        /**********************************************************************/
        //tira a sela��o do dia atual, e se for o dia atual, marca a sele��o
        /**********************************************************************/
        este = $(this).parent();
        dataClick = este.attr("databr");
        /*rel = rel.split("=");
        rel = rel[1];
        rel = rel.split("&");
        rel = rel[0];*/
        var data = new Date();
        dia = data.getDate();
        if (dia < 10) {
            dia = "0" + dia;
        }
        mes = data.getMonth() + 1;
        ano = data.getFullYear();
        hoje = dia + "/" + mes + "/" + ano;
        if (dataClick == hoje) {
            este.addClass("ui-datepicker-today");
        } else {
            $("#calendar1").find(".ui-datepicker-today").removeClass("ui-datepicker-today");
        }


    });

    //$('#criar_EventoAgenda').cluetip({ activation: 'click', width: 400, height: 200, cluetipClass: 'rounded', arrows: true, dropShadow: false, hoverIntent: false, sticky: true, mouseOutClose: false, closePosition: 'title', closeText: '<img src="/AVA/StaticContent/Common/img/perfil/close.png" />' });

    /**********************************************************************/
    //Bot�o Criar - criar novo evento
    /**********************************************************************/
    $('#criar_EventoAgenda').live('click', function () {
        $('#criar_EventoAgenda').hide();
        $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
		
		$.ajax({
            url: "/AVA/Agenda/Home/InserirData",
            success: function (data) {
                $('#descricaoDia_EventoAgenda').html(data);


				//Carrega os calendarios para data de inicio e fim do evento			
				$('#dtmInicio').DatePicker({
					format: 'd/m/Y',
					date: $('#dtmInicio').val(),
					current: $('#currentDay').val(),
					starts: 1,
					//position: 'b',
					onBeforeShow: function () {
						$('#dtmInicio').DatePickerSetDate($('#currentDay').val(), true);
					},
					onChange: function (formated, dates) {
						$('#dtmInicio').val(formated);
						$('#dtmInicio').DatePickerHide();

					},
					locale: {
						days: ["Domingo", "Segunda", "Ter�a", "Quarta", "Quinta", "Sexta", "S�bado", "Domingo"],
						daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
						daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
						months: ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
						monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
						weekMin: 'ms'
					}
				});

				$('#dtmFim').DatePicker({
					format: 'd/m/Y',
					date: $('#dtmFim').val(),
					current: $('#currentDay').val(),
					starts: 1,
					//position: 'b',
					onBeforeShow: function () {
						$('#dtmFim').DatePickerSetDate($('#currentDay').val(), true);
					},
					onChange: function (formated, dates) {
						$('#dtmFim').val(formated);
						$('#dtmFim').DatePickerHide();

					},
					locale: {
						days: ["Domingo", "Segunda", "Ter�a", "Quarta", "Quinta", "Sexta", "S�bado", "Domingo"],
						daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
						daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
						months: ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
						monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
						weekMin: 'ms'
					}
				});

				//Mascaras
				$('#dtmInicio').setMask('date'); // data
				$('#dtmFim').setMask('date'); // data
				$('#horaInicio').setMask('29:59').timepicker({
				    myPosition: 'right top',
				    atPosition: 'right bottom'
				}); // hora
				$('#horaFim').setMask('29:59').timepicker({
				    myPosition: 'right top',
				    atPosition: 'right bottom'
				}); // hora

				//Validate
				/*$("#frmAgenda").validate({
				rules: {
				//txtDescricao: "required",
				dtmInicio: "required",
				horaInicio: "required",
				dtmFim: "required",
				horaFim: "required"
				},
				messages: {
				//txtDescricao: "Preencha o texto",
				dtmInicio: "Preencha a data inicial<br/>",
				horaInicio: "Preencha a hora inicial<br/>",
				dtmFim: "Preencha a data final<br/>",
				horaFim: "Preencha a hora final<br/>"
				}
				});*/
				//Fim Validate
				var dataHoje = new Date();
				var dataSelecionado = $("#calendar1").find(".ui-state-active").parent().attr("databr");
				if (dataSelecionado === undefined) {
					dataSelecionado = $("#calendar1").find(".ui-datepicker-today").attr("databr");
				}
				$("#dtmInicio").val(dataSelecionado);
				$("#dtmFim").val(dataSelecionado);
				proxHora = dataHoje.getHours() + 1;
				fimHora = dataHoje.getHours() + 2;
				if (proxHora == 24) {
					proxHora = 00;
				}
				if (fimHora == 25) {
					fimHora = 01;
				}
				$("#horaInicio").val(proxHora + ":00");
				$("#horaFim").val(fimHora + ":00");

            },
            error: function () {
                if (data.status != 0) {
                    console.debug("Ocorreu um erro na busca da agenda");
                }

                //alert("Ocorreu um erro na busca da agenda");
            }
        });
    
    });

    /**********************************************************************/
    //Eventos do dia - mouseover e mouseout
    /**********************************************************************/
    /*$('.item_eventosDia').live('mouseover', function () {
    $(this).css('background', '#F8E2B9');
    $(this).find('.botao_itensEventosDia').show();
    }).live('mouseout', function () {
    $(this).css('background', '#FFF');
    $(this).find('.botao_itensEventosDia').hide();
    });*/

    /**********************************************************************/
    //Eventos do dia - excluir
    /**********************************************************************/

    $('.agendaItemExcluir').live('click', function () {
        $id = $(this).attr('id');
        $parent = $(this).parent();
        $parent.html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.post("/AVA/Agenda/Home/ExcluirEvento?id=" + $id, function (data) {
            //$parent.next().hide();
            //$parent.hide();
            $parent.remove();
        });
    });

    /**********************************************************************/
    //Eventos do dia - editar
    /**********************************************************************/
    $('.agendaItemEditar').live('click', function () {
        $id = $(this).attr('id');
        $('#criar_EventoAgenda').hide();
        $("#descricaoDia_EventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        $.post("/AVA/Agenda/Home/EditarData?id=" + $id, function (data) {
            $('#descricaoDia_EventoAgenda').html(data);


            /*//Carrega os calendarios para data de inicio e fim do evento
            $("#dtmInicio").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1990:2015",
            showOn: "both",
            buttonImage: "/AVA/StaticContent/Common/img/perfil/calendar.gif",
            buttonImageOnly: true,
            dateFormat: "dd/mm/yy"
            });

            $("#dtmFim").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1990:2015",
            showOn: "both",
            buttonImage: "/AVA/StaticContent/Common/img/perfil/calendar.gif",
            buttonImageOnly: true,
            dateFormat: "dd/mm/yy"
            });

            $("#dtmInicio").keydown(function (event) {
            if (event.which >= 48 && event.which <= 57 || event.which >= 96 && event.which <= 105) {
            $("#datePick").datepicker('hide');
            }
            });

            $("#dtmFim").keydown(function (event) {
            if (event.which >= 48 && event.which <= 57 || event.which >= 96 && event.which <= 105) {
            $("#datePick").datepicker('hide');
            }
            });*/
            //Carrega os calendarios para data de inicio e fim do evento	

            $('#dtmInicio').DatePicker({
                format: 'd/m/Y',
                date: $('#dtmInicio').val(),
                current: $('#currentDay').val(),
                starts: 1,
                //position: 'b',
                onBeforeShow: function () {
                    $('#dtmInicio').DatePickerSetDate($('#currentDay').val(), true);
                },
                onChange: function (formated, dates) {
                    $('#dtmInicio').val(formated);
                    $('#dtmInicio').DatePickerHide();

                },
                locale: {
                    days: ["Domingo", "Segunda", "Ter�a", "Quarta", "Quinta", "Sexta", "S�bado", "Domingo"],
                    daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
                    daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
                    months: ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    weekMin: 'ms'
                }
            });

            $('#dtmFim').DatePicker({
                format: 'd/m/Y',
                date: $('#dtmFim').val(),
                current: $('#currentDay').val(),
                starts: 1,
                //position: 'b',
                onBeforeShow: function () {
                    $('#dtmFim').DatePickerSetDate($('#currentDay').val(), true);
                },
                onChange: function (formated, dates) {
                    $('#dtmFim').val(formated);
                    $('#dtmFim').DatePickerHide();

                },
                locale: {
                    days: ["Domingo", "Segunda", "Ter�a", "Quarta", "Quinta", "Sexta", "S�bado", "Domingo"],
                    daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
                    daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
                    months: ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    weekMin: 'ms'
                }
            });

            //Mascaras dos campos
            $('#dtmInicio').setMask('date'); // data
            $('#dtmFim').setMask('date'); // data
            $('#horaInicio').setMask('29:59').timepicker({
                myPosition: 'right top',
                atPosition: 'right bottom'
            }); // hora
            $('#horaFim').setMask('29:59').timepicker({
                myPosition: 'right top',
                atPosition: 'right bottom'
            }); // hora
            //Validate
            /* $("#frmAgenda").validate({
            rules: {
            txtDescricao: "required",
            dtmInicio: "required",
            horaInicio: "required",
            dtmFim: "required",
            horaFim: "required"
            },
            messages: {
            txtDescricao: "Preencha o texto",
            dtmInicio: "Preencha a data inicial",
            horaInicio: "Preencha a hora inicial",
            dtmFim: "Preencha a data final",
            horaFim: "Preencha a hora final"
            }
            });*/
            //Fim Validate
        });

    });
    /**********************************************************************/
    //Verifica qual est� selecionado no criar Agenda Escola ou Portal
    /**********************************************************************/
    $(".checkAgenda").live("click", function () {

        id = $(this).attr("id");
        if (!$(this).is(":checked")) {
            $(this).removeAttr("checked");
        } else {
            $(".checkAgenda").removeAttr("checked");
            $("#" + id).attr("checked", "checked");
        }

        if (id == "agendaTurma") {
            $(".agendaPersonalizada").show();
        } else {
            $(".agendaPersonalizada").hide();
        }

        if ($(this).attr("id") == "agendaPortal" && $(this).is(":checked")) {
            $("#idStrUrlEvento").slideDown("slow");
        }
        else {
            if ($("#idStrUrlEvento").is(":visible")) {
                $("#idStrUrlEvento").slideUp("slow");
            }
        }


    });


});

/************************************************
* Cancelar o evento a ser editado
************************************************/
function cancelarEditAgenda() {
    var $dataHoje = $("#calendar1").find(".ui-state-active").attr("rel");
    if ($dataHoje === undefined) {
        $dataHoje = $('.ui-datepicker-today').find('a').attr('rel');
    }
    $.post($dataHoje, function (data) {
        $('#descricaoDia_EventoAgenda').empty();
        $('#descricaoDia_EventoAgenda').html(data);
        $(".meusChecks").removeAttr("disabled");
        $('#criar_EventoAgenda').show();
    });
}

/************************************************
* Valida o post da agenda e salva
************************************************/
function validarEdicaoAgenda() {
    var dataAtual = new Date();
    var objJsonAgenda;
	   $idCategoria = "";
	   $idEvento = $("#idEvento").val();
	   $dtmInicio = $("#dtmInicio").val();
	   $dtmFim = $("#dtmFim").val();
	   $horaInicio = $("#horaInicio").val();
	   $horaFim = $("#horaFim").val();
	   $txtTexto = $("#txtDescricao").val();
	   $strUrlEvento = $("#strUrlEvento").val();
	   objJsonAgenda = "a";
	   $(".checkAgenda").each(function () {
	       if ($(this).is(":checked")) {
	           $idCategoria = $(this).val();
	       }
	   });
	   //alert($(".checkAgenda").is(":checked").val());
	  

	   if ($idCategoria == "" || $idCategoria == null) {
	       $idCategoria = 1;
	   } 
	   var dtmInicio_aux = $dtmInicio.split("/");
	   var dtmFim_aux = $dtmFim.split("/");
	   dataComparaInicial = dtmInicio_aux[2] + "-" + dtmInicio_aux[1] + "-" + dtmInicio_aux[0];
	   dataComparaFinal = dtmFim_aux[2] + "-" + dtmFim_aux[1] + "-" + dtmFim_aux[0];

	   if ($dtmFim != "" && $dtmInicio != "") { // Se a data � preenchida, final deve ser maior, se vazio, passa
	       if (dataComparaFinal < dataComparaInicial) {
	           $(".form_input").find("label").each(function () {
	               if ($(this).attr("for") == "horaInicio") {
	                   $(this).css("display", "none");
	               }

	               if ($(this).attr("for") == "dtmInicio") {
	                   $(this).fadeIn('slow');
	                   $(this).text("A data final deve ser maior que a inicial");
	               }
	           });
	           return false;
	       }
       }
	   if ($dtmFim != "" && $dtmInicio != "") { // Se as datas preenchidas forem iguais, a hora final deve ser diferente
	       if (dataComparaInicial == dataComparaFinal && $horaFim == "" && $horaInicio == "") {
	           
           }
	       else if (dataComparaInicial == dataComparaFinal && ($horaFim <= $horaInicio)) {
	           $(".form_input").find("label").each(function () {
	               if ($(this).attr("for") == "dtmInicio") {
	                   $(this).css("display", "none");	                  
	               }

	               if ($(this).attr("for") == "horaInicio") {
	                   $(this).fadeIn('slow');
	                   $(this).text("A hora final deve ser maior que a inicial");
	               }
	           });
	           return false;
	       }
	   }
	   var dataBR = new Array();
	   if ($dtmInicio == "" && $dtmFim == "") {
	       var data = new Date();
	       mes = data.getMonth() + 1;
	       dataBR[0] = data.getDate() + "/" + mes + "/" + data.getFullYear();
	       dataBR[1] = data.getDate() + "/" + mes + "/" + data.getFullYear();
	   } else {
	       if ($dtmInicio != "" && $dtmFim == "") {
	           var dataBR_aux = new Array();
	           var dtmInicio_aux = $dtmInicio.split("/");
	           //var dtmFim_aux = $dtmFim.split("/");
	           dataBR_aux[0] = dtmInicio_aux[1] + "/" + dtmInicio_aux[0] + "/" + dtmInicio_aux[2];
	           dataBR_aux[1] = dtmInicio_aux[1] + "/" + dtmInicio_aux[0] + "/" + dtmInicio_aux[2];
	           dataBR = getDates(dataBR_aux);
	       } else {
	           var dataBR_aux = new Array();
	           var dtmInicio_aux = $dtmInicio.split("/");
	           var dtmFim_aux = $dtmFim.split("/");
	           dataBR_aux[0] = dtmInicio_aux[1] + "/" + dtmInicio_aux[0] + "/" + dtmInicio_aux[2];
	           dataBR_aux[1] = dtmFim_aux[1] + "/" + dtmFim_aux[0] + "/" + dtmFim_aux[2];
	           dataBR = getDates(dataBR_aux);
           }
	       
	   }
	   //var dataAtual = new Date();
	   if (dataAtual.getHours() >= 23) {
	       $(".form_input").find("label").each(function () {
	           if ($(this).attr("for") == "horaInicio") {
	               $(this).css("display", "block");
	               $(this).text("Voc� deve preencher todos os campos");
	           }
	       });
	       return false;
	   }
	   $.ajax({
	       url: "/AVA/Agenda/Home/GravarEvento/",
	       data: {
	           idEvento: $idEvento,
	           dtmInicio: $dtmInicio,
	           dtmFim: $dtmFim,
	           horaInicio: $horaInicio,
	           horaFim: $horaFim,
	           txtTexto: $txtTexto,
	           idCategoria: $idCategoria,
	           jsonDestino: montaJSON($(".agendaPersonalizada .compartilhamento")),
	           strUrlEvento: $strUrlEvento
	           
           },
           
	       contentType: "text/html; charset=iso-8859-1",
	       success: function (data) {
	           if ($dtmInicio != "" && ($dtmFim == "" || $dtmFim == null)) {
	               var retorno = data.split(";");
	               var primeiroDia = retorno[0];
	               var ultimoDia = retorno[1];
	               dataBR.length = 0;
	               dataBR[0] = primeiroDia;
	               dataBR[1] = ultimoDia;
	           }
	           $("#descricaoDia_EventoAgenda").html('');
	           $('#criar_EventoAgenda').show();
	           var i = 0;
	           var o = 0;
	           var $este = new Array();
	           var tamanhoDataBr = dataBR.length;
	           $(".ui-state-default").each(function () {
	               if ($(this).attr("ref") != undefined) {
	                   valor = $(this).attr("ref").split("_");
	                   valor = valor[1].split("/");
	                   dataBR_aux = valor[0] + "/" + valor[1] + "/" + valor[2];
	                   for (o = 0; o < tamanhoDataBr; o++) {
	                       if (dataBR_aux == dataBR[o]) {
	                           $este[i] = $(this);
	                           i++;
	                       }
	                   }
	               }

	           });
	           var idCategoria = "";
	           $("#formTemp").find(":checked").each(function () {
	               //alert($(this).val());
	               idCategoria = idCategoria + $(this).val() + ",";
	           });
	           var tamanho = idCategoria.length;
	           idCategoria = idCategoria.substring(0, tamanho - 1);
	           mudarRel($este, dataBR, idCategoria);
	           verificaEventos(dataBR, idCategoria);
	       },
	       error: function (data) {
	           if (data.status != 0) {
	               console.debug("Ocorreu um erro ao gravar novo evento na agenda.");
	           }
	           //alert("Ocorreu um erro ao gravar novo evento na agenda.");
	       }
	   });
	   /*if ($txtTexto == "") {
		   alert("Preencha o texto");
		   return false;
	   }*/
	  /* else if ($dtmInicio == "") {
		   alert("Preencha a data inicial");
		   return false;
	   }*/
	  /* else if ($horaInicio == "") {
		   alert("Preencha a hora inicial");
		   return false;
	   }*/
	 /*  else if ($dtmFim == "") {
		   alert("Preencha a data final");
		   return false;
	   }*/
	  /* else if ($horaFim == "") {
		   alert("Preencha a hora final");
		   return false;
	   }*/
	   /*if ($dtmInicio != "" && $dtmFim != "" && $horaInicio != "" && $horaFim != "") {
	       if (dataComparaInicial > dataComparaFinal) {
	           //alert("A data final deve ser maior que a inicial");
	           $("#erroDataHora").css("display", "block").text("A data final deve ser maior que a inicial");
	           return false;
	       }
	       else if ((dataComparaInicial == dataComparaFinal) && ($horaInicio > $horaFim || $horaInicio == $horaFim)) {
	           //alert("A hora inicial deve ser menor que a hora final");
	           $("#erroDataHora").css("display", "block").text("A hora inicial deve ser menor que a hora final");
	           return false;
	       }
	       else if ($txtTexto == "") {
                return false;
           }
	       else {

	           $("#salvar_eventoAgenda").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

	           var dataBR = new Array();
	           if ($dtmInicio == $dtmFim) {
	               dataBR[0] = $dtmInicio;
	               dataBR[1] = $dtmFim;
	           } else {
	               var dataBR_aux = new Array();
	               var dtmInicio_aux = $dtmInicio.split("/");
	               var dtmFim_aux = $dtmFim.split("/");
	               dataBR_aux[0] = dtmInicio_aux[1] + "/" + dtmInicio_aux[0] + "/" + dtmInicio_aux[2];
	               dataBR_aux[1] = dtmFim_aux[1] + "/" + dtmFim_aux[0] + "/" + dtmFim_aux[2];
	               dataBR = getDates(dataBR_aux);
	           }

	           $.ajax({
	               url: "/AVA/Agenda/Home/GravarEvento/",
	               data: {
	                   idEvento: $idEvento,
	                   dtmInicio: $dtmInicio,
	                   dtmFim: $dtmFim,
	                   horaInicio: $horaInicio,
	                   horaFim: $horaFim,
	                   txtTexto: $txtTexto
	               },
	               contentType: "text/html; charset=iso-8859-1",
	               success: function (data) {
	                   $("#descricaoDia_EventoAgenda").html('');
	                   $('#criar_EventoAgenda').show();
	                   verificaEventos(dataBR, idCategoria);
	               },
	               error: function () {
	                   alert("Ocorreu um erro ao gravar novo evento na agenda.");
	               }
	           });
	           return false;
	       }
	   }
	   else if ($dtmInicio != "" && $dtmFim != "") {
	       if ($dtmInicio > $dtmFim) {
	           alert("A data final deve ser maior que a inicial");
	           return false;
	       }
	       else if (($dtmInicio == $dtmFim) && ($horaInicio > $horaFim) || ($horaInicio == $horaFim)) {
	           alert("A hora inicial deve ser menor que a hora final");
	           return false;
	       }
	   }

	   else if ($dtmInicio == "" || $dtmFim == "" || $horaInicio == "" || $horaFim == "") {
	       return false;
	   }*/
}

/************************************************
* Varifica os eventos por data - datas pessados pelo array dataBR
************************************************/
function verificaEventos (dataBR, idCategoria) {
	//alert('teste');
	
	var total = dataBR.length;
	var $retorno = new Array();
	var ArrayCompleto = new Array();
	$.ajax({
	    type: "POST",
	    url: '/AVA/Agenda/Home/ContadorEventoData/?data=' + dataBR + '&idCategoria=' + idCategoria,
	    async: true,
	    success: function (data) {
	        ArrayCompleto = data.split(";");
	        total = ArrayCompleto.length - 1;
	        for (var i = 0; i < total; i++) {
	            $retorno = ArrayCompleto[i].split(",");
	            var $ref = 'avaCalendario_' + $retorno[1];
	            var $total = $retorno[0];
	            var $idsEventos = $retorno[2];
	            //************ ANA ************
	            if ($total > 0) {
	                var $html = '<div class="agenda_BoxContador" style="position:absolute; margin:auto;">';
	                if ($total > 4) {
	                    for ($i = 0; $i < 3; $i++) {
	                        $html = $html + '<div class="agenda_countEvento" style="width:4px; height:4px; background-color:#FC9802; float:left; margin:1px;"></div>';
	                    }
	                    $html = $html + '<div class="agenda_countEvento" style="width:4px; height:4px; background:url(/AVA/StaticContent/Content/TES/img/agenda/setinha.png); float:left; margin:1px;"></div>';
	                } else {
	                    for ($i = 0; $i < $total; $i++) {
	                        $html = $html + '<div class="agenda_countEvento" style="width:4px; height:4px; background-color:#FC9802; float:left; margin:1px;"></div>';
	                    }
	                }
	                $html = $html + '</div>';

	                $('.ui-state-default').each(function () {
	                    //alert($(this).attr('ref') + '   ------ ' + $ref);						
	                    if ($(this).attr('ref') == $ref) {
	                        $(this).append($html);

	                        //alert($idsEventos.length);


	                        if ($idsEventos.length > 0) {
	                            var $listaIdsEventos = $idsEventos.split("-");

	                            for (var j = 0; j < $listaIdsEventos.length; j++) {
	                                $attrId = $(this).attr('eventoID') + "," + 'Continuo' + $listaIdsEventos[j];
	                                $(this).attr('eventoID', $attrId);
	                            }
	                        }
	                    }
	                });

	            }
	        }
	    },
	    error: function (data) {
	    }
	});

	
	/*for(var i = 0; i < total; i++){		
		
		//Contador de eventos na data
		$.ajax({ 
			type:"POST", 
			url:'/AVA/Agenda/Home/ContadorEventoData/?data=' + dataBR[i] + '&idCategoria=' + idCategoria,
			async: true, 
			success:function(data) { 
				$retorno = data.split(",");
				var $ref =  'avaCalendario_' + $retorno[1];
				var $total = $retorno[0];
				var $idsEventos = $retorno[2];
				//************ ANA ************
				if ($total > 0){	
					var $html = '<div class="agenda_BoxContador" style="position:absolute; margin:auto;">';
					if($total > 4){
						for ($i=0; $i < 3; $i++){
							$html = $html + '<div class="agenda_countEvento" style="width:4px; height:4px; background-color:#FC9802; float:left; margin:1px;"></div>';								
						}
						$html = $html + '<div class="agenda_countEvento" style="width:4px; height:4px; background:url(/AVA/StaticContent/Content/TES/img/agenda/setinha.png); float:left; margin:1px;"></div>';	
					}else{
						for ($i=0; $i < $total; $i++){
							$html = $html + '<div class="agenda_countEvento" style="width:4px; height:4px; background-color:#FC9802; float:left; margin:1px;"></div>';								
						}
					}
					$html = $html + '</div>';
					
					$('.ui-state-default').each(function(){
						//alert($(this).attr('ref') + '   ------ ' + $ref);						
						if($(this).attr('ref') == $ref){							
							$(this).append($html);
							
							//alert($idsEventos.length);
							
							
							if($idsEventos.length > 0){
								var $listaIdsEventos = $idsEventos.split("-");
									
								for(var j=0; j<$listaIdsEventos.length; j++ ){
									$attrId = $(this).attr('eventoID') + "," + 'Continuo' + $listaIdsEventos[j];
									$(this).attr('eventoID', $attrId );
								}																
							}
						}
					});	
					
				}			
				//************ ANA ************	
			} 
		}); 	
	}*/
	
}	

/************************************************
* Busca todas as datas entre duas datas
************************************************/

function getDates(dataBR) {
	var dates = dataBR; 
	var minDate = new Date(dates[0]).getTime(),
    maxDate = new Date(dates[dates.length - 1]).getTime();

	var newDates = [],
		currentDate = minDate,
		d;

	while (currentDate <= maxDate) {
	    d = new Date(currentDate);
	    dia = d.getDate();
	    mes = d.getMonth() + 1;
	    if (dia < 10) {
	        dia = "0" + dia;
	    }
	    if (mes < 10) {
	        mes = "0" + mes;
	    }
	    newDates.push(dia + '/' + mes + '/' + d.getFullYear());
	    currentDate = new Date(currentDate);
	    currentDate.setDate(currentDate.getDate() + 1); // += (24 * 60 * 60 * 1000); // add one day
	    currentDate = currentDate.getTime();
	}	
	
	return newDates;
}

/************************************************
* Muda o rel e o href das datas quando usa o filtro
************************************************/

function mudarRel($elementoArray, dataBR, idCategoria) {
    tamanho = $elementoArray.length;
    for (i = 0; i < tamanho; i++) {
        $elementoArray[i].attr("rel", "/AVA/Agenda/Home/VerificaEventoData?data=" + dataBR[i] + "&idCategoria=" + idCategoria);
        $elementoArray[i].attr("href", "/AVA/Agenda/Home/VerificaEventoData?data=" + dataBR[i] + "&idCategoria=" + idCategoria);
    }
}
