var ativGeraisChk;
var disciplinasChk = new Array();
var atividadesChk = new Array();

(function ($) {
    $.fn.posiGantt = function (options) {
        /* REQUIRED */
        var _c = this;   // fullCalendar selector
        var _d = $(options.disciplinaSelector);     // disciplina selector
        var _a = $(options.atividadeSelector);  // atividade selector
        var _ab = $(options.atividadeTogglerSelector);   // botao de abrir e fechar atividade
        var datasource = options.datasource;
		var prefsDatasource = options.prefsDatasource;

        /* optional */
        var monthNames = options.monthNames || ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        var monthNamesShort = options.monthNamesShort || ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        var dayNamesShort = options.dayNamesShort || ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        var todayButton = options.todayButton || 'Hoje';
        var monthButton = options.monthButton || 'M';
        var weekButton = options.weekButton || 'S';
        var weekColumnFormat = options.weekColumnFormat || 'ddd d/M';
        var dayColumnFormat = options.dayColumnFormat || 'dd/MMM/yyyy';
        var weekTitleFormat = options.weekTitleFormat || 'dd[/MMM]{-dd/MMM/yy}';
        var dayTitleFormat = options.dayTitleFormat || 'dd/MMM/yyyy';
        var disciplinaSelectorTitle = options.disciplinaSelectorTitle || 'Selecione';
        var atividadeSelectorTitle = options.atividadeSelectorTitle || 'Selecione atividade';
        var disciplina = options.disciplina || '';
        var disciplinaIconClasses = options.disciplinaIconClasses || [
            { id: 2, className: 'debatePP', alt: 'Debate' },
            { id: 3, className: 'salavirtualPP', alt: 'Sala virtual' },
            { id: 4, className: 'avaexePP', alt: 'Avaliação/Exercício' },
            { id: 5, className: 'aulaPP', alt: 'Aula' },
            { id: 7, className: 'entregaPP', alt: 'Entrega de trabalho' },
            { id: 15, className: 'salavirtualmmPP', alt: 'Sala virtual multimídia' },
            { id: 17, className: 'scormPP', alt: 'Conteúdos SCORM' }
        ];

        /*
        *
        * initialization or setup?
        *
        */
        if (typeof (arguments[0]) == "string") {
            // setup!
            _c.fullCalendar.apply(_c, arguments);
            return _c;
        }

        // check whether it is a basic, month or week view
        if (tipoVisualizacao == "D")
            tipoVisualizacaoN = "basicDay";
        else if (tipoVisualizacao == "M")
            tipoVisualizacaoN = "month";
        else
            tipoVisualizacaoN = "basicWeek";

        /* 
        *
        * an instance of fullCalendar 
        *
        */
        _c.fullCalendar({
            year: cursorDate.getFullYear(),
            month: cursorDate.getMonth(),
            date: cursorDate.getDate(),
            buttonText: {
                month: monthButton,
                today: todayButton,
                week: weekButton
            },
            columnFormat: {
                day: dayColumnFormat,
                week: weekColumnFormat
            },
            defaultView: tipoVisualizacaoN,
            dayNamesShort: dayNamesShort,
            events: function (start, end, callback) {
                // fetch events from database
                var myEvents = fetchDisciplinaData(start, end);
                var splitEvents = splitRepeatingEvents(myEvents);
                callback(
                    splitEvents
                );
            },
            eventClick: function (event, jsEvent, view) {
                if (disciplina == "")
                {
                    var data = event.id.split(","); /*data[0] = idservico, data[1] = iditem*/
                    if (event.start > new Date()) {
                        alert("A atividade ainda não pode ser acessada.");
                        return;
                    }
                    $.post(datasource, { what: "url", IdServico: parseInt(data[0]), IdItem: parseInt(data[1]) }, function (url) {
                        location.href = url;
                    });
                }
            },
            eventRender: function (event, domElem, view) {
                var x = Math.random();

                $(domElem)
                .find("a")
                .addClass("icc_" + event.color);

                if (event.mandatory)
                {
                    $(domElem)
                    .find("a").prepend(
                        $("<div/>").append(
                            $("<img/>")
                            .attr("src", "/LMS/StaticContent/Common/img/icon/ic_obrigatorio.png")
                            .attr("title", "Atividade de participação obrigatória")
                        )
                        .css("float", "left")
                        .css("position", "relative")
                        .css("top", "1px")
                    );
                }

                $(domElem)
                .find("a")
                .prepend(
                    $("<div/>")
                    .addClass("iconPP")
                    .addClass("ice_" + event.color)
                    .addClass(event.iconClassName || "")
                    .attr("title", event.alt)
                )
                .end()
                .find("span")
                .wrap("<div class='title' />");

                if (disciplina != "")
                {
                    $(domElem)
                    .find("a")
                    .css("cursor", "default")
                }

                // Se é visualização de dia e calendário de aluno, coloca bandeira
                if (view.name == "basicDay" && disciplina == "") {
                    $(domElem)
                    .find("a")
                    .append(
                        $("<div/>")
                        .addClass("t-" + (event.bandeira ? "" : "un") + "selected-check")
                        .attr("title", event.bandeira ? "Concluído" : "Não concluído")
                        .click(function (e) {
                            if ($(this).hasClass("t-selected-check")) {
                                $(this)
                                .removeClass("t-selected-check")
                                .addClass("t-unselected-check")
                                .attr("title", "Não concluído");
                            }
                            else {
                                $(this)
                                .removeClass("t-unselected-check")
                                .addClass("t-selected-check")
                                .attr("title", "Concluído");
                            }
                            $.ajax({
                                async: false,
                                url: datasource,
                                type: 'post',
                                data: {
                                    what: "bandeira",
                                    idServico: event.id.split(",")[0],
                                    idAtividade: event.id.split(",")[1]
                                }
                            });
                            e.preventDefault();
                            return false;
                        })
                    );
                }
            },
            header: false,
            height: 400,
            lazyFetching: false,
            monthNames: monthNames,
            monthNamesShort: monthNamesShort,
            titleFormat: {
                day: dayTitleFormat,
                month: 'MMMM/yyyy',
                week: weekTitleFormat
            },
            viewDisplay: function (view) {
                //Tira a cor creme do dia atual se a visão é de dia
                if (view.name == "basicDay") {
                    $(".fc-today").removeClass("fc-state-highlight");
                }
                else {
                    $(".fc-today").addClass("fc-state-highlight");
                }
            }
        });

        Array.prototype.find = function (comparer, what) {
            return find(this.sort(comparer), comparer, what);

            function find(vector, comparer, what) {
                var size = vector.length;
                if (size < 2) {
                    // so tem um elemento
                    if (size == 1 && comparer(vector[0], what) == 0) return 1;  // no vetor 
                    // e ele coincide com o que se busca
                    return 0;   // nao achou nenhum
                }

                var bisector = Math.floor(size / 2);
                var rightBranch = vector.slice(0, bisector);
                var leftBranch = vector.slice(bisector + 1, size);

                if (comparer(vector[bisector], what) > 0)
                    return find(rightBranch, comparer, what);   // ainda procurando
                else if (comparer(vector[bisector], what) < 0)
                    return find(leftBranch, comparer, what);    // ainda procurando
                else
                    return 1 +
                     find(rightBranch, comparer, what) +
                     find(leftBranch, comparer, what);    // achou pelo menos um; procura os demais
            }
        };

        function strcmp(a, b) { return a.id == b.id ? 0 : (a.id > b.id ? 1 : -1); }

        function splitRepeatingEvents(events) {
            var nonRepeatingEvents = [];
            var repeatingEvents = [];

            events.sort(strcmp);

            $.each(events, function (index, element) {

                if (events.find(strcmp, element) > 1) {
                    if (repeatingEvents.find(strcmp, element) < 1) {
                        element.color = '99';
                        repeatingEvents.push(element);
                    }
                }
                else {
                    nonRepeatingEvents.push(element);
                }
            });

            return repeatingEvents.concat(nonRepeatingEvents);
        }

        function fetchDisciplinaData(start, end) {
            var events = [];
            var flag = 0;

            $(".t-atividade-cb:checked").each(function () {
                // bitmask calculation
                flag += parseInt(this.value);
            });

            if (disciplina == "") {
                $(".t-disciplina-cb:checked").each(function () {
                    var checkbox = this;

                    // fetch events related to this disciplina
                    $.ajax({
                        async: false,
                        data: {
                            what: 'evento',
                            start: Math.floor(start.getTime() / 1000),    // unix timestamp
                            end: Math.floor(end.getTime() / 1000),
                            disciplina: this.value,
                            atividade: flag,
                            timeZoneOffSet: (new Date()).getTimezoneOffset()
                        },
                        dataType: 'json',
                        success: function (data, status, xhr) {
                            // which color is the disciplina?
                            var colorCode = $(checkbox).closest('.dsc').colorCode();

                            $.each(data, function (index, event) {
                                // apply color to each event
                                event.color = colorCode;

                                // extract event's idservico
                                var idservico = parseInt(/(\d+),\d+/.exec(event.id)[1]);

                                // apply icon type to each event
                                $.each(disciplinaIconClasses, function (index, icon) {
                                    if (icon.id == idservico)
                                    {
                                        event.iconClassName = icon.className;
                                        event.alt = icon.alt;
                                    }
                                });
                            });

                            events = events.concat(data);
                        },
                        type: 'post',
                        url: datasource
                    });
                });
            }
            else {
                $.ajax({
                        async: false,
                        data: {
                            what: 'evento',
                            start: Math.floor(start.getTime() / 1000),    // unix timestamp
                            end: Math.floor(end.getTime() / 1000),
                            disciplina: disciplina,
                            atividade: flag,
                            timeZoneOffSet: (new Date()).getTimezoneOffset()
                        },
                        dataType: 'json',
                        success: function (data, status, xhr) {
                            // which color is the disciplina?
                            var colorCode = $(".dsc:first").colorCode();

                            $.each(data, function (index, event) {
                                // apply color to each event
                                event.color = colorCode;

                                // extract event's idservico
                                var idservico = parseInt(/(\d+),\d+/.exec(event.id)[1]);

                                // apply icon type to each event
                                $.each(disciplinaIconClasses, function (index, icon) {
                                    if (icon.id == idservico)
                                    {
                                        event.iconClassName = icon.className;
                                        event.alt = icon.alt;
                                    }
                                });
                            });

                            events = events.concat(data);
                        },
                        type: 'post',
                        url: datasource
                    });
            }

            return events;
        }

        /*
        *
        * an instance of disciplina selector
        *
        */
        if (disciplina == "") {
            _d
            .append(
                $("<span />")
                .attr("id", "disciplinaSelectorTitle")
                .text(disciplinaSelectorTitle)
            )
        }
        _d
        .append(
            $("<div />")
            .attr("id", "disciplinaSelector")
        );

        // populate disciplina selector
        function disciplinaClick(selector) {
            _c.fullCalendar('refetchEvents');
            if ($(selector).val() == "0,0,0") {
                ativGeraisChk = ($(selector).attr("checked"))

                /******************/
                $.ajax({
                    url: prefsDatasource,
                    type: 'post',
                    data: {
                        what: "atualizaPreferencia",
                        titulo: "ativGeraisChk",
                        valor: ativGeraisChk
                    }
                });
                /******************/


            }
            else {
                if ($(selector).attr("checked")) {
                    disciplinasChk.push($(selector).val());
                }
                else {
                    removeArrayElement(disciplinasChk, $(selector).val());
                }

                
                /******************/
                $.ajax({
                    url: prefsDatasource,
                    type: 'post',
                    data: {
                        what: "atualizaDisciplinas",
                        disciplinaIds: disciplinasChk.join("-")
                    }
                });
                /******************/
            }
            $("#calendarioCarregando").hide();
        }

        $.ajax({
            async: false,
            dataType: 'json',
            type: 'post',
            url: datasource,
            data: {
                what: 'disciplina'
            },
            success: function (data, status, xhr) {
                if (disciplina == "") {
                    if (preferencias.ativGeraisChk)
                    {
                        ativGeraisChk = true;
                    }

                    // include "atividades gerais" option to be clicked
                    $("#disciplinaSelector")
                    .append(
                        $("<div/>")
                        .addClass("dsc")
                        .addClass("ice_01")
                        .append(
                            $("<div/>")
                            .addClass("paleta")
                        ) 
                        .append(
                            $("<div/>")
                            .addClass("icc_01")
                            .addClass("atenua")
                            .append(
                                $("<input type='checkbox' " + preferencias.ativGeraisChk + "/>")
                                .addClass("t-disciplina-cb")
                                .click(function () {
                                    $("#calendarioCarregando").show();
                                    setTimeout(function() {
                                        disciplinaClick($(".icc_01 input"));
                                    }, 1);
                                })
                                .val("0,0,0")
                            )
                            .append(
                                $("<span/>")
                                .text("Atividades gerais")
                            )
                        )
                    )
                    .append(
                        $("<div/>")
                        .addClass("dsc")
                        .addClass("ice_99")
                        .append(
                            $("<div/>")
                            .addClass("paleta")
                        )
                        .append(
                            $("<div/>")
                            .addClass("icc_99")
                            .addClass("atenua")
                            .append(
                                $("<span/>")
                                .text("Atividades associadas a várias áreas de estudo")
                            )
                        )
                    );
                }

                $.each(data, function (index, element) {
                    var i = index + 2;

                    if (disciplina == "") {
                        if (element.isChecked)
                        {
                            disciplinasChk.push(element.id);
                        }
                    }

                    if (disciplina == "" || disciplina == element.id) {
                        var disciplinaSelectorContent = 
                            $("<div/>")
                            .addClass("icc_" + (i < 10 ? "0" + i : "" + i))
                            .addClass("atenua");

                        if (disciplina == "") {
                            $(disciplinaSelectorContent).append(
                                $("<input type='checkbox' " + element.isChecked + "/>")
                                .addClass("t-disciplina-cb")
                                .click(function () {
                                    $("#calendarioCarregando").show();
                                    setTimeout(function() {
                                        disciplinaClick($(".icc_" + (i < 10 ? "0" + i : "" + i) + " input"));
                                    }, 1);
                                })
                                .val(element.id)
                            );
                        }
                        
                        $(disciplinaSelectorContent).append(
                            $("<span/>")
                            .text(element.title)
                        );

                        $("#disciplinaSelector")
                        .append(
                            $("<div/>")
                            .addClass("dsc")
                            .addClass("ice_" + (i < 10 ? "0" + i : "" + i))
                            .append(
                                $("<div/>")
                                .addClass("paleta")
                            )
                            .append(
                                $(disciplinaSelectorContent)
                            )
                        );
                    }
                });
            }
        });

        $("#scrollingDiv")
        .append(
            _a //atividade selector
            .css("position", "absolute")
            .css("top", "27px")
            .css("left", "410px")
            .append(
                $("<div/>")
                .attr("id", "atividadeSelectorTitle")
                .append(
                    $("<span/>")
                    .text(atividadeSelectorTitle)
                )
                .append($("<a/>")
                    .text(" X ")
                    .attr("href", "#")
                    .attr("id", "bt-fecha-div")
                    .click(function ()
                    {
                        _ab.click(); //Fecha div do filtro
                        return false;
                    })
                )
                .append("<br />")
            )
            .append(
                $("<div id='atividadeSelector'></div>")
            )
        );

        _a.fancyBorder();

        _ab
        .toggle(
            function () {
                _a.show();
            },

            function () {
                _a.hide();
            }
        );

        // populate disciplina selector
        function atividadeClick(selector) {
            if ($(selector).attr("checked")) {
                atividadesChk.push($(selector).val());
            }
            else {
                removeArrayElement(atividadesChk, $(selector).val());
            }
        }

        function aplicarFiltroAtividade()
        {
            _c.fullCalendar('refetchEvents');

            /**********************/
            $.ajax({
                async: false,
                url: prefsDatasource,
                type: 'post',
                data: {
                    what: "atualizaAtividades",
                    atividadeIds: "-" + atividadesChk.join("-")
                }
            });
            /**********************/
        }

        $.ajax({
            async: false,
            dataType: 'json',
            type: 'post',
            url: datasource,

            data: {
                what: 'atividade'
            },
            success: function (data, status, xhr) {
                $("#atividadeSelector").append($("<br/>"));
                $.each(data, function (index, element) {
                    if (element.isChecked)
                    {
                        atividadesChk.push(element.id);
                    }
                    $("#atividadeSelector")
                    .append(
                        $("<div />")
                        .css("height", "20px")
                        .css("position", "relative")
                        .css("margin-bottom", "3px")
                        .append(
                            $("<input />")
                            .addClass("t-atividade-cb")
                            .css("float", "left")
                            .attr("type", "checkbox")
                            .attr("value", element.id)
		                    .bind("click", function () {
			                    atividadeClick(this);
		                    })
                        )
                        .append(
                            $("<div />")
                            .css("position", "absolute")
                            .css("top", "-3px")
                            .css("left", "13px")
                            .css("width", "200px")
                            .append(
                                $("<div />")
                                .addClass("iconPP")
                                .addClass("ice_99")
                                .addClass(element.icon)
                                .css("float", "left")
                                .css("margin-left", "5px")
                            )
                            .append(
                                $("<p />")
                                .css("font-size", "11px")
                                .css("padding", "3px 0px 0px")
                                .text(element.title)
                            )
                        )
                    )
                    $("#atividadeSelector input").last().attr("checked", element.isChecked);
                });
                $("#atividadeSelector").append(
                    $("<br/>")
                )
                .append(
                    $("<div/>")
                    .attr("id", "btAplicarFiltro")
                    .append(
                        $("<a/>")
                        .text("Aplicar")
                        .addClass("bt")
                        .click(function ()
                            {
                                aplicarFiltroAtividade();
                                _ab.click(); //Fecha div do filtro
                                return false;
                            })
                        .attr("href", "#")
                    )
                );
            }
        });
        _c.fullCalendar('refetchEvents'); //Para mostrar as atividades das disciplinas pré-selecionadas

        /** BALOES **/
        function mostraBaloes()
        {
            $("#calendarioDiv")
            .append(
	            $("<div />")
	            .attr("id", "balao1")
	            .css("position", "absolute")
	            .css("top", "230px")
	            .css("left", "190px")
	            .css("z-index", "100")
                .css("width", "276px")
                .css("height", "115px")
	            .append(
		            $("<img />")
		            .attr("src", "/LMS/StaticContent/Content/TES/cssimg/calendario/balao_atividades-do-calendario.png")
                    .css("width", "276px")
                    .css("height", "115px")
	            )
            )
            .append(
	            $("<div />")
	            .attr("id", "balao2")
	            .css("position", "absolute")
	            .css("top", "27px")
	            .css("left", "375px")
	            .css("z-index", "100")
                .css("width", "194px")
                .css("height", "141px")
	            .append(
		            $("<img />")
		            .attr("src", "/LMS/StaticContent/Content/TES/cssimg/calendario/balao_tipos-de-atividades.png")
		            .css("width", "194px")
                    .css("height", "141px")
	            )
            );
        }

        function removeBaloes()
        {
            $("#balao1").remove();
            $("#balao2").remove();
        }

        if (disciplina == "" && disciplinasChk.length == 0 && !ativGeraisChk)
        {
            mostraBaloes();
            $("#scrollingDiv a, #scrollingDiv input")
            .click(
                function ()
                {
                    removeBaloes();
                }
            );
        }
        /** BALOES **/

        $("#scrollingDiv")
        .append(
	        $("<img />")
            .attr("id", "calendarioCarregando")
	        .attr("src", "http://universitarioup.educacional.com.br/LMS/StaticContent/Common/img/icon/carregando.gif")
	        .css("position", "absolute")
	        .css("top", "200px")
	        .css("left", "370px")
	        .css("z-index", "999")
            .hide()
        );
    };
})(jQuery);

(function ($) {
    $.fn.colorCode = function () {
        var classe = $(this).attr("class");
        return classe==null?"":/ic._(\d{1,2})/.exec(classe)[1];
    };
})(jQuery);