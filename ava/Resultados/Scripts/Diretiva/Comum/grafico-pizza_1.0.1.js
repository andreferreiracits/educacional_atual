"use strict"

function controleGraficoPizza($http, $scope, $timeout, $filter, $location, projetoTools) {
    var _self = this;
    this.graficos = [];
    $timeout(function () {
        //_self.init();
    });
}

angular.module('resultado').directive('graficoPizza', ['$http', '$timeout', '$filter', 'projetoTools', function ($http, $timeout, $filter, projetoTools) {
    return {
        restrict: 'AEC',
        replace: true,
        transclude: true,
        scope: {
            indice: "=",
            dados: "=",
            variante: "=",
            width: "=",
            height: "=",
            cargos: "=",
            colors: "="
        },
        templateUrl: function (element, attrs) {
            return '/AVA/Projetos/StaticResultados/Diretiva/Comum/grafico-pizza.html';
        },
        link: function link(scope, element, attrs, ctrl) {
            var _self = this;
            var container = jQuery(element);

            var getGraus = function (percentual) {
                return (360 * percentual) / 100;
            };

            var reverse = function (s) {
                if (s) if (s != "")
                    return s.split("").reverse().join("");
                return "";
            };

            var labelFormatter = function (label, series) {
                return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
            };

            var getNextColor = function (data) {
                return "#" + Math.round(Math.random() * 255).toString(16) + Math.round(Math.random() * 255).toString(16) + Math.round(Math.random() * 255).toString(16);
            };
            var getNextLightColor = function (data) {
                return "#" + Math.round(Math.random() * 255).toString(16) + Math.round(Math.random() * 255).toString(16) + Math.round(Math.random() * 255).toString(16);
            };

            var getCssBySelectProperty = function (seletor, propriedadesCSS) {
                var bolEncontrado = false;
                var retorno = "";
                if (!document.styleSheets)
                    return "";
                var theRules = new Array();
                for (var ki = 0; ki < document.styleSheets.length; ki++) {
                    try {
                        if (document.styleSheets[ki].cssRules) {
                            theRules = theRules.concat(document.styleSheets[ki].cssRules);
                        }
                    } catch (e) { }
                    try {
                        if (document.styleSheets[ki].rules) {
                            theRules = theRules.concat(document.styleSheets[ki].rules);
                        }
                    } catch (ex) { }
                }
                for (var ji = 0; ji < theRules.length; ji++) {
                    if (theRules[ji].selectorText) if (theRules[ji].selectorText != "") if (theRules[ji].selectorText.toLowerCase().indexOf(seletor.toLowerCase()) != -1) if (reverse(theRules[ji].selectorText.toLowerCase()).indexOf(reverse(seletor.toLowerCase())) != -1) {
                        if (theRules[ji].style) {
                            for (var prop in propriedadesCSS) {
                                if (theRules[ji].style[propriedadesCSS[prop]].toString().length > 0) {
                                    bolEncontrado = true;
                                    retorno = theRules[ji].style[propriedadesCSS[prop]].toString();
                                }
                            }
                        }
                    }
                }
                return retorno;
            };

            var getNextColorByCss = function (data, bolPartidario) {
                /*
                EXTRATOR DE CORES DAS DECLARAÇÕES REALIZADAS VIAS CSS. LÓGICA:
                - SEM DISTINÇÃO DE CARGOS
                1º: Tenta obter a cor pelo slug. P.Ex: '.grafico .pie.pitanga'
                2º: Tenta obter a cor pelo ordem da fatia. P.Ex: '.grafico .pieSlice1 .pie'
                - COM DISTINÇÃO DE CARGOS
                1º: Tenta obter a cor pelo slug. P.Ex: '.cargo_01 .grafico .pie.pitanga'
                2º: Tenta obter a cor pelo ordem da fatia. P.Ex: '.cargo_01 .grafico .pieSlice1 .pie'
                */
                var bgColor = "";
                var cargo = parseInt(data.indiceCargo);
                var ordem = parseInt(data.indiceCandidato);
                var slug = data.Slug;
                var seletorSlug = "";
                var seletorSlice = "";
                var bolSearchForColorOnCss = true;
                if (scope.colors) if (angular.isArray(scope.colors)) if (projetoTools.hasArrayElems(scope.colors)) {
                    bolSearchForColorOnCss = false;
                    if (bolPartidario) {
                        if (scope.colors.length >= cargo) {
                            if (angular.isArray(scope.colors[cargo - 1])) if (projetoTools.hasArrayElems(scope.colors[cargo - 1])) {
                                if (scope.colors[cargo - 1].length >= ordem && scope.colors[cargo - 1][ordem - 1] != "" && scope.colors[cargo - 1][ordem - 1].indexOf("#") != -1) {
                                    bgColor = scope.colors[cargo - 1][ordem - 1]
                                }
                            }
                        }
                    }
                    else {
                        if (scope.colors.length >= cargo) {
                            if (scope.colors.length >= ordem && scope.colors[ordem - 1] != "" && scope.colors[ordem - 1].indexOf("#") != -1) {
                                bgColor = scope.colors[ordem - 1];
                            }
                        }
                    }
                }
                if (bolSearchForColorOnCss || bgColor == "") {

                    if (bolPartidario) {
                        seletorSlug = ".cargo_0" + cargo + " .grafico .pie." + slug.toLowerCase();
                        seletorSlice = ".cargo_0" + cargo + " .grafico .pieSlice" + ordem + " .pie";
                    }
                    else {
                        seletorSlug = ".grafico .pie." + slug.toLowerCase();
                        seletorSlice = ".grafico .pieSlice" + ordem + " .pie";
                    }

                    if (seletorSlug != "") {
                        var temp = getCssBySelectProperty(seletorSlug, ["background-color", "background"]);
                        if (temp != "") {
                            bgColor = temp;
                        }
                    }
                    if (seletorSlice != "" && bgColor == "") {
                        temp = getCssBySelectProperty(seletorSlice, ["background-color", "background"]);
                        if (temp != "") {
                            bgColor = temp;
                        }
                    }
                }
                if (bgColor == "") {
                    bgColor = "#" + Math.round(Math.random() * 255).toString(16) + Math.round(Math.random() * 255).toString(16) + Math.round(Math.random() * 255).toString(16);
                }
                else if (bgColor.toLowerCase().indexOf("rgb") != -1) {
                    temp = bgColor.toLowerCase().replace("rgba", "").replace("rgb", "").replace("(", "").replace(")", "").replace(/\s/g, "").split(",");
                    bgColor = "#";
                    for (var col = 0; col < 3; col++) {
                        bgColor += projetoTools.Right("0" + parseInt(temp[col]).toString(16).toUpperCase(), 2);
                    }
                }
                return bgColor;
            };

            var formataDados = function (plugin, originalData, bolPartidario) {
                //var originalData = angular.copy(p_originalData);
                var newData = [];
                switch (plugin) {
                    case 'chartjs':
                        var totalVotos = 0;
                        var totalElementos = 0;
                        var totalValidos = 0;

                        for (var dado in originalData) {
                            var temp = 0;
                            var percent = 0.0;
                            totalElementos++;

                            temp = (projetoTools.getInt(angular.copy(originalData[dado].votos).toString()) - 1) + 1;
                            if (temp > 0) {
                                totalVotos += temp;
                                totalValidos++;
                            }

                            originalData[dado].Slug = (projetoTools.retira_acentos(originalData[dado].Candidato.toLowerCase())).split(' ')[0].split('-')[0];
                        }
                        //v1
                        for (var data in originalData) {
                            var temp = 0;
                            var percent = 0.0;
                            temp = (projetoTools.getInt(angular.copy(originalData[data].votos).toString()) - 1) + 1;
                            if (temp > 0) {
                                percent = ((temp * 100) / totalVotos).toFixed(2);
                            }
                            var dt = {
                                value: percent,
                                color: getNextColorByCss(originalData[data], bolPartidario),
                                highlight: getNextColorByCss(originalData[data], bolPartidario),
                                label: originalData[data].Candidato.toString()
                                //name: originalData[data].Candidato.toString()
                            };
                            newData.push(angular.copy(dt));
                        }

                        //v2
                        /*
                        var tempLabels = [];
                        var tempData = [];
                        var tempBgColors = [];
                        var tempHvColors = [];
                        for (var data in originalData) {
                        tempLabels.push(originalData[data].Candidato);
                        tempData.push(originalData[data].votos);
                        tempBgColors.push(getNextColorByCss(originalData[data], bolPartidario));
                        //tempHvColors.push(getNextLightColor(data));
                        }
                        newData = {
                        labels: tempLabels,
                        datasets: [{
                        data: tempData,
                        backgroundColor: tempBgColors
                        //hoverBackgroundColor: tempHvColors
                        }]
                        };
                        */
                        break;
                    case 'flot':
                        for (var data in originalData) {
                            newData.push({
                                label: originalData[data].Candidato,
                                data: originalData[data].votos
                                //data: ((originalData[data].votos * 100) / totalVotos) //,
                                //total: totalVotos,
                                //indice: originalData[data].indiceCandidato,
                                //ordem: originalData[data].Ordem,
                                //graus: _self(((originalData[data].votos * 100) / totalVotos)),
                                //transform: 'rotate(' + _self(((originalData[v].votos * 100) / totalVotos)) + 'deg)'
                                //, color: "#457447"
                            });
                        }
                        break;
                    case 'fusionchart':
                        break;
                    case 'css':
                    default:
                        var totalVotos = 0;
                        var totalElementos = 0;
                        var totalValidos = 0;
                        for (var data in originalData) {
                            totalElementos++;
                            if (originalData[data].votos > 0) {
                                totalVotos += parseInt(originalData[data].votos);
                                totalValidos++;
                            }
                        }
                        var startAngle = 0;
                        var indiceCor = 0;
                        for (var data in originalData) {
                            if (originalData[data].votos > 0) {
                                originalData[data].Slug = (projetoTools.retira_acentos(originalData[data].Candidato.toLowerCase())).split(' ')[0].split('-')[0];

                                var percent = ((originalData[data].votos * 100) / totalVotos);
                                var angulo = parseFloat((getGraus(percent)).toFixed(2));

                                originalData[data].proporcao = parseFloat(percent.toFixed(2));
                                originalData[data].total = totalVotos;

                                switch (originalData[data].Candidato) {
                                    case "Brancos":
                                        indiceCor = totalElementos - 1;
                                        break;
                                    case "Nulos":
                                        indiceCor = totalElementos;
                                        break;
                                    default:
                                        indiceCor = (parseInt(data) + 1);
                                        break;
                                }

                                if (angulo <= 180.0) {
                                    originalData[data].transformRoot = 'rotate(' + startAngle + 'deg)';
                                    originalData[data].transform = 'rotate(' + angulo + 'deg)';
                                    startAngle += angulo;
                                    originalData[data].graus = angulo;
                                    originalData[data].indice = indiceCor;
                                    originalData[data].index = (99990 + indiceCor).toString() + " !important";

                                    newData.push(angular.copy(originalData[data]));
                                }
                                else {
                                    var parte1 = angular.copy(originalData[data]);

                                    var diferenca = parseFloat((angulo - 180.0).toFixed(2));

                                    originalData[data].transformRoot = 'rotate(' + startAngle + 'deg)';
                                    originalData[data].transform = 'rotate(180deg)';
                                    startAngle += 180.0;
                                    originalData[data].graus = 180.0;
                                    originalData[data].indice = indiceCor;

                                    newData.push(angular.copy(originalData[data]));

                                    parte1.transformRoot = 'rotate(' + (startAngle - 1) + 'deg)';
                                    parte1.transform = 'rotate(' + (diferenca + 1) + 'deg)';
                                    startAngle += diferenca;
                                    parte1.graus = diferenca;
                                    parte1.indice = indiceCor;

                                    newData.push(parte1);
                                }
                            }
                        }
                        break;
                }
                return newData;
            };

            var init = function () {
                /*
                var initApi = true;
                if (_self.extendFunctions) if (typeof (_self.extendFunctions) == "function") {
                    initApi = false;
                }
                if (initApi) {
                    projetoTools.extendFunctions(_self);
                    projetoTools.extendFunctions(scope);
                }
                */

                var bolPartidario = false;
                var unique = {};
                var cargos = [];
                for (var dado in scope.dados) {
                    if (typeof (unique[scope.dados[dado].indiceCargo]) == "undefined") {
                        cargos.push(scope.dados[dado].indiceCargo);
                    }
                    unique[scope.dados[dado].indiceCargo] = 0;
                }
                if (cargos.length > 1 || scope.cargos > 1) {
                    bolPartidario = true;
                }

                //retorna os dados formatados conforme o plugin utilizado
                scope.data = formataDados(scope.variante, scope.dados, bolPartidario);


                $timeout(function () {
                    switch (scope.variante) {
                        case "flot":
                            jQuery.plot(jQuery("#placeholder" + scope.indice), scope.data, {
                                series: {
                                    pie: {
                                        show: true,
                                        radius: 1,
                                        label: {
                                            show: false,
                                            radius: 1,
                                            formatter: labelFormatter,
                                            background: {
                                                opacity: 0.8
                                            }
                                        }
                                    }
                                },
                                legend: {
                                    show: false,
                                    labelBoxBorderColor: "none"
                                }

                            });
                            break;
                        case "chartjs":
                            try {
                                var options = {
                                    segmentShowStroke: false,
                                    segmentStrokeColor: "#fff",
                                    segmentStrokeWidth: 0,
                                    percentageInnerCutout: 0,
                                    animationSteps: 1,
                                    animationEasing: "",
                                    animateRotate: false,
                                    animateScale: false,
                                    tooltipTemplate: "<%if(label.toLowerCase().indexOf('branco')!=-1 || label.toLowerCase().indexOf('nulo')!=-1){%><%=label%>: <%=value%>%<%}else{%><%=value%>%<%}%>",
                                    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label+'%'%><%}%></span></li><%}%></ul>"
                                };

                                var config = {
                                    type: 'pie',
                                    data: scope.data,
                                    options: {
                                        responsive: true
                                    }
                                };
                                var ok = false;
                                if (ctrl.graficos) if (ctrl.graficos instanceof Array) if (ctrl.graficos.length > scope.indice)
                                    ok = true;
                                if (!ok) {
                                    while (ctrl.graficos.length < scope.indice) {
                                        ctrl.graficos.push(undefined);
                                    }
                                }

                                if (ctrl.graficos[scope.indice]) {
                                    try {
                                        ctrl.graficos[scope.indice].stop();
                                        ctrl.graficos[scope.indice].clear();
                                        ctrl.graficos[scope.indice].destroy();
                                    }
                                    catch (ex) {
                                    };
                                    try {
                                        ctrl.graficos[scope.indice].dispose();
                                    }
                                    catch (ex) {
                                    };
                                }

                                var ctx = document.getElementById("grafico" + scope.indice).getContext("2d");

                                //v1
                                ctrl.graficos[scope.indice] = new Chart(ctx).Pie(scope.data, options);

                                //v2
                                //ctrl.graficos[scope.indice] = new Chart(ctx, config);
                                //ctrl.graficos[scope.indice].update();
                            }
                            catch (ex) {
                                ctrl.graficos[scope.indice] = undefined;
                            }
                            break;
                        case "fusionchart":

                            break;
                        case "css":
                            //usa a composição por CSS3
                            var targets = ".pieContainer,.pie";
                            if (true) jQuery(targets).each(function (test) {
                                var percentual = jQuery(this).attr("rel") + "%";
                                jQuery(this).attr('oldtitle', jQuery(this).attr('title'));
                                jQuery(this).get(0).removeAttribute('title');
                                jQuery(this).attr('oldalt', jQuery(this).attr('alt'));
                                jQuery(this).get(0).removeAttribute('alt');

                                //correção dos width/height 
                                var classTarget = jQuery(this).get(0).className;
                                var arrTargets = targets.replace(/\./g, "").replace(/\,/g, " ").split(" ");
                                var arrClasses = classTarget.split(" ");
                                var arrComum = projetoTools.ArrayIntersect(arrTargets, arrClasses);

                                if (arrComum[0] != arrTargets[0]) {
                                    angular.element(this).unbind("mouseover");
                                    angular.element(this).bind("mouseover", function (evt) {
                                        var elt = evt.target;
                                        var elm = angular.element(elt);
                                        (evt.originalEvent || evt).stopPropagation();
                                        (evt.originalEvent || evt).preventDefault();
                                    });
                                }
                                jQuery(this).qtip({
                                    content: {
                                        text: percentual
                                    },
                                    position: {
                                        target: 'mouse',
                                        adjust: { mouse: true }
                                    },
                                    show: { event: 'mouseover', target: jQuery(arrComum[0])}/*,
                                    events: {
                                        show: function (event, api) {
                                            if (event.originalEvent.button !== 2) {
                                                // IE might throw an error calling preventDefault(), so use a try/catch block.
                                                try { event.preventDefault(); } catch (e) { }
                                            }
                                        }
                                    }
                                    */
                                });
                            });

                            break;
                    }
                });
            };

            init();

        },
        controller: ["$http", "$scope", "$timeout", "$filter", "$location", 'projetoTools', controleGraficoPizza],
        controllerAs: 'ctrlGraficoPizza'
    };
} ]);

//angular.module('resultado').controller('GraficoPizzaCtrl', ["$http", "$scope", "$timeout", "$filter", "$location", 'projetoTools', controleGraficoPizza]);
