var tipoVisualizacao; // variavel global
var cursorDate;
var datasource;
var prefsDatasource;

(function ($) {
    $.fn.posiCalendario = function (options) {
        datasource = options.datasource;
		prefsDatasource = options.prefsDatasource;

        /*
        * methods
        */
        function cloneDate(date) {
            var retorno = new Date();
            retorno.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            return retorno;
        }

        function isEqualToModelElement(date, element) {
            return date.getDate() == element.Date &&
            date.getMonth() == element.Month &&
            date.getFullYear() == element.Year;
        }

        function gotoMonth(direction) {
            cursorDate.setMonth(cursorDate.getMonth() + (direction == 'next' ? 1 : -1));
            refreshView(direction);
        }

        function setNavFastText(whatToSay) {
            _e.find(".t-nav-fast")
            .hide()
            .fadeIn("fast")
            .html(whatToSay);
        }

        function pickYearToGo() {
            var htmlBag = [];
            var currentYear = new Date().getFullYear();

            // design table of years

            htmlBag.push("<thead><tr><th colspan='3'>Selecione ano</th></thead><tbody>");
            for (var i = 0; i < 3; i++) {
                htmlBag.push("<tr>");
                for (var j = 0; j < 3; j++) {
                    k = i * 3 + j;

                    htmlBag.push("<td><span>");
                    htmlBag.push(k - 4 + currentYear);
                    htmlBag.push("</span></td>");
                }
                htmlBag.push("</tr>");
            }
            htmlBag.push("</tbody>");

            _calendar.fadeOut("fast", function () {
                $(this).show().html(htmlBag.join(''))

                // bind click event on the table cells
                // set cursor's year to the year clicked on
                .find("td").click(function () {
                    var year = parseInt($(this).find("span").text());
                    cursorDate.setFullYear(year, 1, 1);
                    setNavFastText(year);
                    pickMonthToGo();
                });
            });
        }

        function pickMonthToGo() {
            var htmlBag = [];

            // design table of months

            htmlBag.push("<thead><tr><th colspan='3'>Selecione mês</th></thead><tbody>");
            for (var i = 0; i < 4; i++) {
                htmlBag.push("<tr>");
                for (var j = 0; j < 3; j++) {
                    k = i * 3 + j;

                    htmlBag.push("<td><span>");
                    htmlBag.push(monthName[k].substr(0, 3));
                    htmlBag.push("</span></td>");
                }
                htmlBag.push("</tr>");
            }
            htmlBag.push("</tbody>");

            _calendar.fadeOut("fast", function () {
                $(this).show().html(htmlBag.join(''))

                // bind click event on the table cells
                // set cursor's month to the month clicked on
                .find("td").click(function () {
                    var index = _calendar.find("td").index(this);
                    cursorDate.setMonth(index);
                    gotoDate();
                });
            });
        }

        function gotoDate(direction) {
            var htmlBag = [];

            htmlBag.push("<colgroup><col class='t-sunday' /><col class='t-weekday' span='5' /><col class='t-saturday' /></colgroup><thead><tr>");

            $.each(weekdayName, function (index, element) {
                htmlBag.push("<th>");
                htmlBag.push(element);
                htmlBag.push("</th>");
            });

            htmlBag.push("</tr></thead><tbody>");

            for (var i = 0; i < 6; i++) {
                htmlBag.push("<tr>");
                for (var j = 0; j < 7; j++) {
                    htmlBag.push("<td><span>&nbsp;</span></td>");
                }
                htmlBag.push("</tr>");
            }

            htmlBag.push("</tbody>");

            _calendar.html(htmlBag.join(''))

            // binding click event on calendar's table cells
            // select date and trigger event
            .find("td").click(function () {
                var _tds = _calendar.find("td");

                _tds.removeClass("t-selected");
                $(this).addClass("t-selected");

                var i = _tds.index(this);
                selectedDate = new Date(data[i].Year, data[i].Month, data[i].Date);
                cursorDate = cloneDate(selectedDate);
                isDateSelected = true;

                $.ajax({
                    url: prefsDatasource,
                    type: 'post',
                    data: {
                        what: "atualizaPreferencia",
                        titulo: "diaselecionado",
                        valor: data[i].Year + "," + data[i].Month + "," + data[i].Date
                    }
                });

                // trigger selection callback
                if ($.isFunction(onSelectionCallback))
                    onSelectionCallback.call(_e, selectedDate);
            });

            refreshView(direction);

            // enable navigational arrows
            isNavArrowsEnabled = true;
        }

        function selectWeek(direction) {
            var target = cloneDate(cursorDate);
            target.setHours(12, 0, 0, 0);
            target.setDate(target.getDate() + (direction == 'prev' ? (-7) : 7));

            if (target.getMonth() != cursorDate.getMonth()) {
                cursorDate = target;
                refreshView(direction);
            } else {
                cursorDate = target;
                refreshView(null);
            }

            var sunday = cloneDate(cursorDate);
            sunday.setDate(cursorDate.getDate() - cursorDate.getDay());

            var _s = _calendar.find("td").filter(function (index) {
                var target = cloneDate(sunday);
                for (var i = 0; i < 7; i++) {
                    if (isEqualToModelElement(target, data[index]))
                        return true;
                    target.setDate(target.getDate() + 1);
                }
                return false;
            }).addClass("t-selected");
        }

        function selectDate(direction) {
            var target = cloneDate(cursorDate);
            target.setHours(12, 0, 0, 0);
            target.setDate(target.getDate() + (direction == 'prev' ? (-1) : 1));

            if (target.getMonth() != cursorDate.getMonth()) {
                cursorDate = target;
                refreshView(direction);
            } else {
                cursorDate = target;
                refreshView(null);
            }

            var _s = _calendar.find("td").filter(function (index) {
                return isEqualToModelElement(target, data[index]);
            }).addClass("t-selected");
        }

        function selectPrevEpoch() {
            if (isDaily) {
                selectDate('prev');
            } else if (isWeekly) {
                selectWeek('prev');
            } else {
                gotoMonth('prev');
            }
        }

        function selectNextEpoch() {
            if (isDaily) {
                selectDate('next');
            } else if (isWeekly) {
                selectWeek('next');
            } else {
                gotoMonth('next');
            }
        }

        function selectToday() {
            var today = new Date();

            today.setHours(0, 0, 0, 0);
            cursorDate.setHours(0, 0, 0, 0);

            direction = (today > cursorDate ? "next" : (today < cursorDate ? "prev" : null));

            cursorDate = today;
            gotoDate(direction);

            _calendar.find("td").filter(function (index) {
                return isEqualToModelElement(cursorDate, data[index]);
            }).click();
        }

        function refreshView(direction) {
            var currentMonth = false;
            var today = new Date();

            // slide calendar on the screen
            direction = (direction == "next" ? "right" : (direction == "prev" ? "left" : null));

            if (direction == null)
                _calendar.hide().fadeIn("slow");
            else
                _calendar.show("slide", { direction: direction }, 600);

            // update info
            selectedDate = null;
            isDateSelected = false;
            data = Model.getMonthlyData(cursorDate);

            _calendar.find("td").each(function (index) {

                // toggle date class if it is not the current month
                if (data[index].Date == 1) currentMonth = !currentMonth;

                $(this).removeClass("t-selected")
                .find("span")
                    .removeClass()
                    .addClass(currentMonth ? "t-this-month" : "t-other-month")
                    .addClass(isEqualToModelElement(today, data[index]) ? "t-today" : "")
                    .html(data[index].Date);
            });

            setNavFastText(monthName[cursorDate.getMonth()] + "/" + cursorDate.getFullYear());
        }

        /*
        * static classes
        */
        var Constant = new function () {
            this.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30,
                31, 31, 30, 31, 30, 31];
            this.MONTH_NAME = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            this.WEEKDAY_NAME = ["D", "S", "T", "Q", "Q", "S", "S"];
        }

        var Model = new function () {
            this.getMonthlyData = function (date) {

                var arrData = [];
                var n, indexInicio, indexFim;
                var mesCursor, anoCursor;
                var nCells = 42;    // number of cells on the calendar table (6 w x 7 d)

                // initializing some vars
                mesCursor = date.getMonth();
                anoCursor = date.getFullYear();

                // look for the first day of cursor's month
                var dteInicioMes = cloneDate(date);
                dteInicioMes.setDate(1);

                // set indece
                n = Constant.DAYS_IN_MONTH[mesCursor - 1 < 0 ? (12 + mesCursor - 1) : (mesCursor - 1)];
                indexInicio = dteInicioMes.getDay();
                indexFim = Constant.DAYS_IN_MONTH[mesCursor] + indexInicio;

                // if it is a leap year and it is February, include one more day to the month
                if (mesCursor - 1 == 1 && anoCursor % 4 == 0) n++;
                if (mesCursor == 1 && anoCursor % 4 == 0) indexFim++;

                // render late days of previous month
                for (var i = 0, temp; i < indexInicio; i++) {
                    arrData.push({
                        Date: n - indexInicio + i + 1
			        , Month: (temp = mesCursor - 1) < 0 ? (12 + temp) : temp
			        , Year: mesCursor - 1 < 0 ? (anoCursor - 1) : anoCursor
                    });
                }
                // render days of current cursor's month
                for (var i = indexInicio; i < indexFim; i++) {
                    arrData.push({
                        Date: i - indexInicio + 1
                    , Month: mesCursor
			        , Year: anoCursor
                    });
                }
                // render first days of next month
                for (var i = indexFim, temp; i < nCells; i++) {
                    arrData.push({
                        Date: i - indexFim + 1
			        , Month: (temp = mesCursor + 1) >= 12 ? (temp - 12) : temp
			        , Year: mesCursor + 1 >= 12 ? (anoCursor + 1) : anoCursor
                    });
                }

                return arrData;
            }
        }

        /*
        *
        * Execution starts here
        *
        */
        var htmlBag = [];   // calendar's html bag

        // optional
        cursorDate = options.cursor ? cloneDate(options.cursor) : new Date(); // copy cursor date
        var selectedDate = null; // selected calendar date
        var isDateSelected = false; // flag to check if date was selected
        var isWeekly = options.isWeekly ? true : false; // flag to check if selection is weekly
        var isDaily = options.isDaily ? true : false; // flag to check if selection is daily
        var monthName = options.monthName || Constant.MONTH_NAME;   // list of months' names
        var weekdayName = options.weekdayName || Constant.WEEKDAY_NAME; // list of weekdays' names
        var isNavArrowsEnabled = true;  // flag to check if navigational arrows are enabled
        var prevButtonName = options.prevButtonName || "&larr;";
        var nextButtonName = options.nextButtonName || "&rarr;";
        var todayButtonName = options.todayButtonName || "Hoje";
        var monthButtonName = options.monthButtonName || "Mês";
        var weekButtonName = options.weekButtonName || "Semana";
        var dayButtonName = options.dayButtonName || "Dia";
        var onSelectionCallback = options.onSelection || function (date) { }; // selection callback
        var onMonthCallback = options.onMonth || function (date) { }; // on month button click callback
        var onWeekCallback = options.onWeek || function (date) { }; // on week button click callback
        var onDayCallback = options.onDay || function (date) { }; // on day button click callback
        var onPrevCallback = options.onPrev || function (date) { }; // on prev button click callback
        var onNextCallback = options.onNext || function (date) { }; // on next button click callback
        var onTodayCallback = options.onToday || function (date) { }; // on today button click callback
        var imageBaseUrl = options.imageBaseUrl || "cssimg";

        // REQUIRED
        var _e = this;
        var _n = $(options.selectionNav);

        // design calendar
        htmlBag.push("<div id='Calendar' class='t-calendar'>");
        htmlBag.push("<div class='t-header'>");
        htmlBag.push("<a class='t-nav-prev t-link' href='#'><span class='t-icon t-arrow-prev'>&lt;</span></a>");
        htmlBag.push("<a class='t-nav-fast t-link' href='#'></a>");
        htmlBag.push("<a class='t-nav-next t-link' href='#'><span class='t-icon t-arrow-next'>&gt;</span></a>");
        htmlBag.push("</div>");
        htmlBag.push("<table class='t-content' />");
        htmlBag.push("</div>");

        // materialize calendar
        $(htmlBag.join('')).appendTo(_e);

        var _calendar = _e.find(".t-calendar .t-content");

        gotoDate();

        // select date if cursor was informed
        _calendar.find("td").filter(function (index) {
            return isEqualToModelElement(cursorDate, data[index]);
        }).addClass("t-selected");

        // binding click event on calendar's navigational arrows
        _e.find(".t-nav-prev").click(function (ev) {
            ev.preventDefault();
            if (isNavArrowsEnabled) gotoMonth('prev');
        });
        _e.find(".t-nav-next").click(function (ev) {
            ev.preventDefault();
            if (isNavArrowsEnabled) gotoMonth('next');
        });
        _e.find(".t-nav-fast").click(function (ev) {
            ev.preventDefault();
            isNavArrowsEnabled = false;
            pickYearToGo();
        });

        // design selection navigational buttons
        htmlBag = [];
        htmlBag.push("<div class='t-selection-nav'>");
        htmlBag.push("<a href='#' class='t-selection-prev t-icon t-nav-prev'>" + prevButtonName + "</a>");
        htmlBag.push("<a href='#' class='t-selection-next t-icon t-nav-next'>" + nextButtonName + "</a>");
        htmlBag.push("<a href='#' class='ftr bt menor mleft'>Filtro<span class='t-icon'></span></a>");
        htmlBag.push("<a href='#' class='t-selection-month bt menor mleft'>" + monthButtonName + "</a>");
        htmlBag.push("<a href='#' class='t-selection-week bt menor mleft'>" + weekButtonName + "</a>");
        htmlBag.push("<a href='#' class='t-selection-day bt menor mleft'>" + dayButtonName + "</a>");
        htmlBag.push("<a href='#' class='t-selection-today bt menor mleft'>" + todayButtonName + "</a>");
        htmlBag.push("<div style='clear: both'></div>");
        htmlBag.push("</div>");

        // materialize selection navigational buttons
        $(htmlBag.join('')).appendTo(_n);

        var _navbar = _n.find(".t-selection-nav");

        function removeHighlight(selector) {
            $(selector, _navbar)
            .removeClass("selected")
            .find("span")
            .remove();
        }

        function insertHighlight(selector) {
            $(selector, _navbar)
            .addClass("selected")
            .append(
                $("<span/>")
                .addClass("abadown")
                .append(
                    $("<img />")
                    .attr("src", imageBaseUrl + "/seta.png")
                )
            );
        }

        // bind click event on selection navigational buttons
        _navbar.find(".t-selection-today").click(function (e) {
            e.preventDefault();

            selectToday();

            if ($.isFunction(onTodayCallback))
                onTodayCallback.call(_e, cursorDate);
        });

        _navbar.find(".t-selection-prev").click(function (e) {
            e.preventDefault();

            if ($.isFunction(onPrevCallback))
                onPrevCallback.call(_e, cursorDate);
            selectPrevEpoch();
        });

        _navbar.find(".t-selection-next").click(function (e) {
            e.preventDefault();

            if ($.isFunction(onNextCallback))
                onNextCallback.call(_e, cursorDate);
            selectNextEpoch();
        });

        if (isWeekly) {
            tipoVisualizacao = "W";
            insertHighlight(".t-selection-week");   // week view as default
        } else if (isDaily) {
            tipoVisualizacao = "D";
            insertHighlight(".t-selection-day");
        } else {
            tipoVisualizacao = "M";
            insertHighlight(".t-selection-month");
        }

        _navbar.find(".t-selection-month").click(function (e) {
            e.preventDefault();

            removeHighlight(".t-selection-week, .t-selection-day");
            insertHighlight(".t-selection-month");

            isWeekly = false;
            isDaily = false;

            tipoVisualizacao = "M";

            if ($.isFunction(onMonthCallback))
                onMonthCallback.call(_e, cursorDate);
            /********************************************************/
            $.ajax({
                url: prefsDatasource,
                type: 'post',
                data: {
                    what: "atualizaPreferencia",
                    titulo: "tipoVisualizacao",
                    valor: tipoVisualizacao
                }
            });
            /********************************************************/
        });

        _navbar.find(".t-selection-week").click(function (e) {
            e.preventDefault();

            removeHighlight(".t-selection-month, .t-selection-day");
            insertHighlight(".t-selection-week");

            isWeekly = true;
            isDaily = false;

            tipoVisualizacao = "W";

            if ($.isFunction(onWeekCallback))
                onWeekCallback.call(_e, cursorDate);
            /********************************************************/
            $.ajax({
                url: prefsDatasource,
                type: 'post',
                data: {
                    what: "atualizaPreferencia",
                    titulo: "tipoVisualizacao",
                    valor: tipoVisualizacao
                }
            });
            /********************************************************/
        });

        _navbar.find(".t-selection-day").click(function (e) {
            e.preventDefault();

            removeHighlight(".t-selection-week, .t-selection-month");
            insertHighlight(".t-selection-day");

            isWeekly = false;
            isDaily = true;

            tipoVisualizacao = "D";

            if ($.isFunction(onDayCallback))
                onDayCallback.call(_e, cursorDate);
            /********************************************************/
            $.ajax({
                url: prefsDatasource,
                type: 'post',
                data: {
                    what: "atualizaPreferencia",
                    titulo: "tipoVisualizacao",
                    valor: tipoVisualizacao
                }
            });
            /********************************************************/

        });
    };
})(jQuery);