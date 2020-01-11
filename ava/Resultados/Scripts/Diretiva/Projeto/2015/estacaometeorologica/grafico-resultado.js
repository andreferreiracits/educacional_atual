angular.module('resultado').controller('controleGrafico', ['$http', '$scope', '$element', '$attrs', '$compile', '$timeout', '$filter', function ($http, $scope, $element, $attrs, $compile, $timeout, $filter) {
    var _self = this;
    var _that = this;

    $scope.randomScalingFactor = function () {
        return Math.round(Math.random() * 200)
    };

    $scope.dados_modificados = {};
    $scope.dados_servico = {
        dados: [],
        filtrados: []
    };

    $scope.dados_modificadosgraf2 = {
        experimental: {},
        real: {}
    };

    $scope.dados_servicograf2 = {
        experimental: {
            dados: [],
            filtrados: [],
            container: 'graficoexp_1',
            grafico: null
        },
        real: {
            dados: [],
            filtrados: [],
            container: 'graficoreal_1',
            grafico: null
        }
    };
    $scope.bolEstacaoReal = false;

    $scope.chartType = -1;

    $scope.cidadesAdicionadasCache = [];
    $scope.legenda = "";
    $scope.graficoAtual = {};
    $scope.dadosCarregados = false;

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.cacheDadosChaveados = {
        tipo: 0,
        index: 0,
        container: ''
    };

    $scope.redesenhaGrafico = function () {
        $timeout(function () {
            $scope.chaveiaDados($scope.cacheDadosChaveados.tipo, $scope.cacheDadosChaveados.index, $scope.cacheDadosChaveados.container);
        }, 500);
        //console.log(this.tipo + ' - ' + this.index + ' - ' + this.container);
    }

    this.dadosEstacaoReal = function (intEstacao) {
        if (intEstacao == 2) {
            $scope.bolEstacaoReal = true;
        }
        else {
            $scope.bolEstacaoReal = false;
        }
        $scope.redesenhaGrafico();
    };

    this.init = function () {
        var bolLoaded = false;
        //$scope.cidadesAdicionadas) if($scope.cidadesAdicionadas instanceof Array) if($scope.cidadesAdicionadas.length>0)
        if (true) {
            //$scope.safeApply();
            bolLoaded = true;
            var valido = false;
            if ($scope) if ($scope.dados_servico) if ($scope.dados_servico instanceof Object) if ($scope.dados_servico.dados) if ($scope.dados_servico.dados instanceof Array) if ($scope.dados_servico.dados.length > 0) {
                valido = true;
                $scope.chartType = 0;
            }

            if (!valido && parseInt($scope.edicao.Id) > 0) {
                valido = true;
                $scope.dados_servico = {
                    dados: $scope.dados,
                    filtrados: []
                };
                if (valido) {
                    if ($scope.cidadesAdicionadas) if ($scope.cidadesAdicionadas instanceof Array) if ($scope.cidadesAdicionadas.length > 0) {
                        if ($scope.cidadesAdicionadasCache.length == 0)
                            $scope.cidadesAdicionadasCache = clone_obj($scope.cidadesAdicionadas);
                        var test = $filter('filter')($scope.cidadesAdicionadasCache, { indice: 0 }, true);
                        if (test.length != $scope.cidadesAdicionadasCache.length) {
                            $scope.dadosCarregados = true;
                        }
                    }
                    if ($scope.dadosCarregados) {
                        //processa/filtra os dados e atualiza os gráficos
                        //$scope.chartType = 0;
                        //if(parseInt($scope.idEdicao)>0 && parseInt($scope.idEtapa)>0) {
                        //$scope.safeApply();
                        $scope.atualizaGrafico();
                        //}
                    }
                }
            }
            else {
                console.log("Não foi possível buscar dados dos resultados por falta de parâmetros");
            }
        }
    };

    $scope.getIndexByEstadoCidade = function (strEstado, strCidade) {
        var test = $filter('filter')($scope.cidadesAdicionadas, { Cidade: strCidade, Estado: strEstado }, true);
        if (test) if (test instanceof Array) if (test.length == 1) {
            return test.indice;
        }
        return 0;
    };

    $scope.getEstadoCidadeByIndex = function (index) {
        var test = $filter('filter')($scope.cidadesAdicionadas, { indice: index }, true);
        if (test) if (test instanceof Array) if (test.length == 1) {
            return { Cidade: test.Cidade, Estado: test.Estado };
        }
        return 0;
    };

    $scope.possuiDadosCarregados = function () {
        if ($scope.cidadesAdicionadasCache) if ($scope.cidadesAdicionadasCache instanceof Array) {
            var test3 = $filter('filter')($scope.cidadesAdicionadasCache, { indice: 0 }, true);
            if (test3) if (test3 instanceof Array) if (test3.length != $scope.cidadesAdicionadasCache.length) {
                if ($scope.dados_servico) if ($scope.dados_servico.filtrados) if ($scope.dados_servico.filtrados instanceof Array) if ($scope.dados_servico.filtrados.length > 0) {
                    return true;
                }
            }
        }
        return false;
    };

    $scope.$on("changeListMap", function (event, obj, objDados, objConfig, objDadosGraf2) {
        var bolRegular = false;
        var _self = this;

        if (obj) if (obj instanceof Array) if (obj.length > 0) {
            bolRegular = true;
            $scope.cidadesAdicionadas = obj;
            $scope.cidadesAdicionadasCache = obj;

            $scope.config = objConfig;
            $scope.dados_servico.dados = objDados;

            $scope.dados_servicograf2.experimental.dados = objDadosGraf2.estacaoExperimental;
            $scope.dados_servicograf2.real.dados = objDadosGraf2.estacaoReal;
            $scope.bolEstacaoReal = false;

            //console.log($scope.dados_servicograf2.real.dados);

            $scope.dadosCarregados = true;
            $scope.atualizaGrafico();
        }

        if (!bolRegular) {
            //esconde os gráfico pois removeu todas as cidades
            $scope.cidadesAdicionadas = [];
            $scope.cidadesAdicionadasCache = [];
            $scope.dados_servico.filtrados = [];

            $scope.dados_servicograf2.experimental.filtrados = [];
            $scope.dados_servicograf2.real.filtrados = [];

            $scope.dadosCarregados = false;
        }
    });

    this.chaveiaDados = function (tipo, index, container) {
        $scope.chaveiaDados(tipo, index, container);

        $scope.cacheDadosChaveados.tipo = tipo;
        $scope.cacheDadosChaveados.index = index;
        $scope.cacheDadosChaveados.container = container;
    };

    $scope.chaveiaDados = function (tipo, index, container) {

        //console.log('chaveiadados');
        if ($scope.config) if ($scope.config.validDataFields) if ($scope.config.validDataFields instanceof Array) if ($scope.dados_servico.filtrados) if ($scope.dados_servico.filtrados instanceof Array) {
            try {
                $scope.graficoAtual.stop();
                $scope.graficoAtual.clear();
                $scope.graficoAtual.destroy();

                //Chart.defaults.global.responsive = true;
                //Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>";
                //Chart.defaults.global.legendTemplate = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";
            }
            catch (ex) {
            };

            try {
                $scope.graficoAtual.dispose();
            }
            catch (ex) {
            };

            $scope.chartType = 1;
            //$scope.safeApply();
            switch (tipo) {
                case 0:
                case 1:
                case 2:
                    var ok = false;
                    if (document.getElementById(container)) if (document.getElementById(container).parentNode) {
                        ok = true;
                        document.getElementById(container).parentNode.innerHTML = '<canvas id="grafico1" height="320" width="420">Chart will load here</canvas>';
                    }

                    if (!ok) if (document.getElementById($scope.mainElementName)) {
                        document.getElementById($scope.mainElementName).innerHTML = '<canvas id="grafico1" height="320" width="420">Chart will load here</canvas>';
                    }

                    if (document.getElementById($scope.dados_servicograf2.experimental.container)) {
                        if (document.getElementById($scope.dados_servicograf2.experimental.container).parentNode) {
                            document.getElementById($scope.dados_servicograf2.experimental.container).parentNode.innerHTML = '<canvas id="' + $scope.dados_servicograf2.experimental.container + '" height="320" width="420">Chart will load here</canvas>';
                        }
                    }

                    if (document.getElementById($scope.dados_servicograf2.real.container)) {
                        if (document.getElementById($scope.dados_servicograf2.real.container).parentNode) {
                            document.getElementById($scope.dados_servicograf2.real.container).parentNode.innerHTML = '<canvas id="' + $scope.dados_servicograf2.real.container + '" height="320" width="420">Chart will load here</canvas>';
                        }
                    }
                    break;
                case 3:
                case 4:
                    $scope.chartType = 2;
                    var ok = false;
                    if (document.getElementById(container)) if (document.getElementById(container).parentNode) {
                        ok = true;
                        document.getElementById(container).parentNode.innerHTML = '<div id="grafico2" align="center" style="width:420px;height:320px;float:left;">fusion will load here</div>';
                    }
                    if (!ok) if (document.getElementById($scope.mainElementName)) {
                        document.getElementById($scope.mainElementName).innerHTML = '<div id="grafico2" align="center" style="width:420px;height:320px;float:left;">fusion will load here</div>';
                    }
                    break;
            }

            $scope.dados_modificados = $scope.formataDados($scope.chartType, tipo, index, $scope.dados_servico, $scope.config);
            $scope.dados_modificadosgraf2.experimental = $scope.formataDados($scope.chartType, tipo, index, $scope.dados_servicograf2.experimental, $scope.config);
            $scope.dados_modificadosgraf2.real = $scope.formataDados($scope.chartType, tipo, index, $scope.dados_servicograf2.real, $scope.config);

            //mudança do menu
            angular.element('nav.parametros li').removeClass("ativo");
            angular.element('nav.parametros li').eq(index).addClass("ativo");
            switch (tipo) {
                case 0:
                    //chart.org - lines
                    var options = {};
                    switch (index) {
                        case 0:
                            //AvgPrecipitacao mm3
                            //0 à 500 (6333 adapatado para 63,33
                            options = {
                                responsive: true,
                                bezierCurve: false,
                                animation: false,
                                showScale: true,
                                scaleOverride: true,
                                scaleStartValue: 0,
                                scaleSteps: 14,
                                scaleStepWidth: 100,
                                tooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>",
                                multiTooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>"
                            };
                            break;
                        case 1:
                            //tipo personalizado para os ventos. trocadas:
                            //- força a escala para de 0 a 3
                            //- as legendas das abscissas
                            //- as legendas dos tooltips
                            //- o modelo de passagem de dados
                            options = {
                                responsive: true,
                                bezierCurve: false,
                                animation: false,
                                showScale: true,
                                scaleOverride: true,
                                scaleStartValue: 0,
                                scaleSteps: 3,
                                scaleStepWidth: 1,
                                scaleLabel: "<%if(value==0){%><%='Sem Vento'%><%}%><%if(value==1){%><%='Fraco'%><%}%><%if(value==2){%><%='Médio'%><%}%><%if(value==3){%><%='Forte'%><%}%>",
                                tooltipTemplate: "<%if(value==0){%><%='Sem Vento'%><%}%><%if(value==1){%><%='Fraco'%><%}%><%if(value==2){%><%='Médio'%><%}%><%if(value==3){%><%='Forte'%><%}%><%if(value>0){%><%=' - '%><%}%><%if(complemento==1){%><%='N'%><%}%><%if(complemento==2){%><%='NE'%><%}%><%if(complemento==3){%><%='L'%><%}%><%if(complemento==4){%><%='SE'%><%}%><%if(complemento==5){%><%='S'%><%}%><%if(complemento==6){%><%='SO'%><%}%><%if(complemento==7){%><%='O'%><%}%><%if(complemento==8){%><%='NO'%><%}%>",
                                multiTooltipTemplate: "<%if(value==0){%><%='Sem Vento'%><%}%><%if(value==1){%><%='Fraco'%><%}%><%if(value==2){%><%='Médio'%><%}%><%if(value==3){%><%='Forte'%><%}%><%if(value>0){%><%=' - '%><%}%><%if(complemento==1){%><%='N'%><%}%><%if(complemento==2){%><%='NE'%><%}%><%if(complemento==3){%><%='L'%><%}%><%if(complemento==4){%><%='SE'%><%}%><%if(complemento==5){%><%='S'%><%}%><%if(complemento==6){%><%='SO'%><%}%><%if(complemento==7){%><%='O'%><%}%><%if(complemento==8){%><%='NO'%><%}%>"
                                //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
                            };
                            break;
                        case 2:
                            //AvgParticulas
                            //0 a 70
                            options = {
                                responsive: true,
                                bezierCurve: false,
                                animation: false,
                                showScale: true,
                                scaleOverride: true,
                                scaleStartValue: 0,
                                scaleSteps: 12,
                                scaleStepWidth: 20,
                                tooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>",
                                multiTooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>"
                            };
                            break;
                        case 3:
                            //AvgNebulosidade %
                            //0 a 100
                            options = {
                                responsive: true,
                                bezierCurve: false,
                                animation: false,
                                showScale: true,
                                scaleOverride: true,
                                scaleStartValue: 0,
                                scaleSteps: 10,
                                scaleStepWidth: 10,
                                tooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>",
                                multiTooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>"
                            };
                            break;
                        case 4:
                            //AvgTemperatura ºC
                            //9 a 32
                            options = {
                                responsive: true,
                                bezierCurve: false,
                                animation: false,
                                showScale: true,
                                scaleOverride: true,
                                scaleStartValue: 8,
                                scaleSteps: 12,
                                scaleStepWidth: 3,
                                tooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>",
                                multiTooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>"
                            };
                            break;
                        case 5:
                            //AvgUmidade %
                            //19 a 96 - considerado de 0 a 100
                            options = {
                                responsive: true,
                                bezierCurve: false,
                                animation: false,
                                showScale: true,
                                scaleOverride: true,
                                scaleStartValue: 0,
                                scaleSteps: 10,
                                scaleStepWidth: 10,
                                tooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>",
                                multiTooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>"
                            };
                            break;
                        default:
                            options = {
                                responsive: true,
                                bezierCurve: false,
                                animation: false,
                                tooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>",
                                multiTooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>"
                            };
                            break;
                    }

                    $scope.graficoAtual = new Chart(document.getElementById(container).getContext("2d")).Line($scope.dados_modificados, options);
                    try {
                        $scope.graficoAtual = new Chart(document.getElementById(container).getContext("2d")).Line($scope.dados_modificados, options);

                        //Gráfico etapa4
                        new Chart(document.getElementById($scope.dados_servicograf2.experimental.container).getContext("2d")).Line($scope.dados_modificadosgraf2.experimental, options);

                        if ($scope.bolEstacaoReal) {
                            //   TEMPERATURA
                            if (index == 1) {
                                //Ajustar aqui o máximo do eixo Y, do gráfico do vento da estação real
                                options = {
                                    responsive: true,
                                    bezierCurve: false,
                                    animation: false,
                                    showScale: true,
                                    scaleOverride: true,
                                    scaleStartValue: 0,
                                    scaleSteps: 10,
                                    scaleStepWidth: 15,
                                    tooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>",
                                    multiTooltipTemplate: "<%if(value.toString().indexOf('.')!=-1){%><%=(value.toString().split('.')[0])+'.'+(value.toString().split('.')[1].substr(0,2))%><%}%><%if(value.toString().indexOf('.')==-1){%><%=value%><%}%><%if(" + index + "==0){%><%='mm³'%><%}%><%if(" + index + "==3){%><%='%'%><%}%><%if(" + index + "==4){%><%='ºC'%><%}%><%if(" + index + "==5){%><%='%'%><%}%><%if(" + index + "==6){%><%='Pa'%><%}%>"
                                };
                            }
                            new Chart(document.getElementById($scope.dados_servicograf2.real.container).getContext("2d")).Line($scope.dados_modificadosgraf2.real, options);
                        }
                        //$scope.legenda = $scope.graficoAtual.generateLegend();
                    }
                    catch (ex) {
                        $scope.graficoAtual = null;
                    }
                    break;
                case 1:
                    //chart.org - radar
                    $scope.graficoAtual = new Chart(document.getElementById(container).getContext("2d")).Radar($scope.dados_modificados, {
                        responsive: true,
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
                    });
                    $scope.legenda = $scope.graficoAtual.generateLegend();
                    break;
                case 2:
                    //chart.org - polar
                    $scope.graficoAtual = new Chart(document.getElementById(container).getContext("2d")).PolarArea($scope.dados_modificados, {
                        responsive: true,
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
                    });
                    $scope.legenda = $scope.graficoAtual.generateLegend();
                    break;
                case 3:
                    //fusionchart - line
                    $scope.graficoAtual = new FusionCharts("Line", "ChartId", "420", "320", "0", "0");
                    $scope.graficoAtual.setJSONData($scope.dados_modificados);
                    $scope.graficoAtual.render(container);
                    break;
                case 4:
                    //fusionchart - radar
                    $scope.graficoAtual = new FusionCharts("Radar", "ChartId", "420", "320", "0", "0");
                    $scope.graficoAtual.setJSONData($scope.dados_modificados);
                    $scope.graficoAtual.render(container);
                    break;

            }
        }
    };

    this.atualizaGrafico = function () {
        $scope.atualizaGrafico();
    };

    $scope.atualizaGrafico = function () {
        //filtra os dados recebidos
        $scope.dados_servico.filtrados = [];

        $scope.dados_servicograf2.experimental.filtrados = [];
        $scope.dados_servicograf2.real.filtrados = [];

        $scope.dadosCarregados = false;
        if ($scope.cidadesAdicionadasCache) if ($scope.cidadesAdicionadasCache instanceof Array) if ($scope.cidadesAdicionadasCache.length > 0) {
            for (var cidade in $scope.cidadesAdicionadasCache) {
                if ($scope.cidadesAdicionadasCache[cidade].indice >= 0) {

                    //Primeira coleta de dados
                    for (var dado in $scope.dados_servico.dados) {
                        if ($scope.dados_servico.dados[dado].hora.indexOf(":") != -1)
                            if (!isNaN($scope.dados_servico.dados[dado].hora.split(":")[0].replace("0", "")))
                                if (parseInt($scope.dados_servico.dados[dado].hora.split(":")[0].replace("0", "")) > 0)
                                    if (!isNaN($scope.cidadesAdicionadasCache[cidade].Hora))
                                        if (parseInt($scope.cidadesAdicionadasCache[cidade].Hora) > 0)
                                            if (($scope.dados_servico.dados[dado].Cidade.toLowerCase() == $scope.cidadesAdicionadasCache[cidade].Cidade.toLowerCase()) && (parseInt($scope.dados_servico.dados[dado].hora.toString().split(":")[0].replace("0", "")) == parseInt($scope.cidadesAdicionadasCache[cidade].Hora))) {
                                                $scope.dados_servico.filtrados.push(clone_obj($scope.dados_servico.dados[dado]));
                                                $scope.dadosCarregados = true;
                                            }
                    }
                    
                    //Segunda coleta de dados - Estação experimental
                    for (var dado in $scope.dados_servicograf2.experimental.dados) {
                        if ($scope.dados_servicograf2.experimental.dados[dado].hora.indexOf(":") != -1)
                            if (!isNaN($scope.dados_servicograf2.experimental.dados[dado].hora.split(":")[0].replace("0", "")))
                                if (parseInt($scope.dados_servicograf2.experimental.dados[dado].hora.split(":")[0].replace("0", "")) > 0)
                                    if (!isNaN($scope.cidadesAdicionadasCache[cidade].Hora))
                                        if (parseInt($scope.cidadesAdicionadasCache[cidade].Hora) > 0)
                                            if (($scope.dados_servicograf2.experimental.dados[dado].Cidade.toLowerCase() == $scope.cidadesAdicionadasCache[cidade].Cidade.toLowerCase()) && (parseInt($scope.dados_servicograf2.experimental.dados[dado].hora.toString().split(":")[0].replace("0", "")) == parseInt($scope.cidadesAdicionadasCache[cidade].Hora))) {
                                                $scope.dados_servicograf2.experimental.filtrados.push(clone_obj($scope.dados_servicograf2.experimental.dados[dado]));
                                                $scope.dadosCarregados = $scope.dadosCarregados && true;
                                            }
                                        }
                    
                    //Segunda coleta de dados - Estação real
                    for (var dado in $scope.dados_servicograf2.real.dados) {
                        if ($scope.dados_servicograf2.real.dados[dado].hora.indexOf(":") != -1)
                            if (!isNaN($scope.dados_servicograf2.real.dados[dado].hora.split(":")[0].replace("0", "")))
                                if (parseInt($scope.dados_servicograf2.real.dados[dado].hora.split(":")[0].replace("0", "")) > 0)
                                    if (!isNaN($scope.cidadesAdicionadasCache[cidade].Hora))
                                        if (parseInt($scope.cidadesAdicionadasCache[cidade].Hora) > 0)
                                            if (($scope.dados_servicograf2.real.dados[dado].Cidade.toLowerCase() == $scope.cidadesAdicionadasCache[cidade].Cidade.toLowerCase()) && (parseInt($scope.dados_servicograf2.real.dados[dado].hora.toString().split(":")[0].replace("0", "")) == parseInt($scope.cidadesAdicionadasCache[cidade].Hora))) {
                                                $scope.dados_servicograf2.real.filtrados.push(clone_obj($scope.dados_servicograf2.real.dados[dado]));
                                                //$scope.dadosCarregados = $scope.dadosCarregados && true;
                                                //console.log($scope.dados_servicograf2.real.filtrados);
                                            }
                    }

                }
            }
        }

        if ($scope.dadosCarregados) {
            $timeout(function () {
                //recurso temporário para iniciar o gráfico carregado
                //procurar alternativa funcional desacoplada do DOM!!!
                //navigator.platform.toUpperCase().indexOf("ARM") > -1 || navigator.userAgent.toUpperCase().indexOf("ANDROID") > -1 || 
                angular.element(".parametros li").eq(0).trigger('click');
                if (navigator.userAgent.match(/iPad/i) != null) {
                    angular.element(".parametros li").eq(0).trigger('touchend');
                }
                //_that.chaveiaDados(0, 0, "galeria1");
            }, 500);
        }
    };

    $scope.parse = function (valores) {
        var retorno = {};
        try {
            retorno = JSON.parse(valores);
        }
        catch (ex) {
        }
        return retorno;
    };

    //adapta os dados flatten para o modelos utilizado pelo respectivo componente empregado para a exibição dos dados
    $scope.formataDados = function (plugin, tipo, index, dados, config) {
        var newData = [];
        switch (plugin) {
            case 1:
                //chartjs.org
                switch (tipo) {
                    case 0:
                        //gráfico do tipo linhas

                        //preenche o array de labels do eixo X - ordenadas
                        var arrLabelsX = [];
                        //var temp = $filter('unique')(dados, config.campoLabelX);
                        for (var info in dados.dados) {
                            var nova_label = eval("dados.dados[info]." + config.campoLabelX);
                            if (arrLabelsX.indexOf(nova_label) == -1) {
                                arrLabelsX.push(nova_label);
                            }
                        }
                        arrLabelsX.sort();

                        //seta a condição de personalização das labels do eixo Y - abscissas
                        var bolYLabels = false;
                        var arrLabelsY = [];
                        if (config.customLabelY) if (config.customLabelYMap instanceof Array) {
                            arrLabelsY = config.customLabelYMap;
                        }

                        //preenche os dados referente ao index selecionado
                        //para agrupar os dados por cidade presente nos dados
                        var arrCidades = [];
                        for (var dado in dados.filtrados) {
                            var bolAdicionada = false;
                            for (var regiao in arrCidades) {
                                if ((arrCidades[regiao].Regiao == dados.filtrados[dado].Estado + "/" + dados.filtrados[dado].Cidade) && (arrCidades[regiao].Hora == parseInt(dados.filtrados[dado].hora.toString().split(":")[0].replace("0", "")))) {
                                    bolAdicionada = true;
                                }
                            }
                            //if (arrCidades.indexOf(dados.filtrados[dado].Estado + "/" + dados.filtrados[dado].Cidade) == -1) {
                            if (!bolAdicionada) {
                                arrCidades.push({
                                    Regiao: dados.filtrados[dado].Estado + "/" + dados.filtrados[dado].Cidade,
                                    Hora: parseInt(dados.filtrados[dado].hora.toString().split(":")[0].replace("0", ""))
                                });
                            }
                        }

                        var campoValores = $scope.config.validDataFields[index];
                        var indexCidade = -1;
                        var arrAllData = [];
                        var indexSegmento = 0;
                        var dados_Segmentados = [];
                        var dados_Segmentados_final = [];
                        var bolPossuiNulos = false;
                        var totalSegmentos = 0;
                        for (var strUfCidade in arrCidades) {
                            indexSegmento = 0;
                            dados_Segmentados = [];
                            bolPossuiNulos = false;
                            totalSegmentos = 0;
                            var horaCidadeAtual = arrCidades[strUfCidade].Hora;
                            //seletor do indice da cidade no slot para chavear a cor do elemento gráfico
                            for (var ct in $scope.cidadesAdicionadasCache) {
                                if ($scope.cidadesAdicionadasCache[ct].Cidade.toString() != "" && arrCidades[strUfCidade].Regiao.toString().toLowerCase().indexOf($scope.cidadesAdicionadasCache[ct].Estado.toString().toLowerCase() + "/" + $scope.cidadesAdicionadasCache[ct].Cidade.toString().toLowerCase()) != -1) {
                                    //indexCidade = parseInt(ct);
                                    if (!isNaN($scope.cidadesAdicionadasCache[ct].Hora)) if (parseInt($scope.cidadesAdicionadasCache[ct].Hora) > 0) {
                                        if (parseInt($scope.cidadesAdicionadasCache[ct].Hora) == horaCidadeAtual) {
                                            indexCidade = parseInt(ct);
                                            //break;
                                        }
                                        //horaCidadeAtual = parseInt($scope.cidadesAdicionadasCache[ct].Hora);
                                    }
                                }
                            }
                            if (indexCidade >= 0) {
                                var dados_cidade = [null, null, null, null, null];
                                for (var registro in dados.filtrados) {
                                    if (dados.filtrados[registro].hora.indexOf(":") != -1) {
                                        if (!isNaN(dados.filtrados[registro].hora.split(":")[0].replace("0", ""))) if (parseInt(dados.filtrados[registro].hora.split(":")[0].replace("0", "")) > 0) {
                                            if ((arrCidades[strUfCidade].Regiao == (dados.filtrados[registro].Estado + "/" + dados.filtrados[registro].Cidade)) && (parseInt(dados.filtrados[registro].hora.split(":")[0].replace("0", "")) == horaCidadeAtual)) {
                                                //correção do bug que agrupava os dados sempre à esquerda
                                                var dia_atual = dados.filtrados[registro].dia
                                                if (arrLabelsX.indexOf(dia_atual) != -1) {
                                                    var temp = dados.filtrados[registro];
                                                    for (var registro_dados in temp) {
                                                        if (registro_dados == campoValores) {
                                                            if (($scope.config.customLabelYFields == campoValores) && (index == 1)) {

                                                                //campo de ventos composto por intensidade(0 à 3).direção(0 à 8)
                                                                if (temp[registro_dados].indexOf(';') == -1) {
                                                                    dados_cidade[arrLabelsX.indexOf(dia_atual)] = {
                                                                        value: parseInt(temp[registro_dados].split(",")[0]),
                                                                        aux: temp[registro_dados].split(",")[1]
                                                                    };
                                                                }
                                                                else {
                                                                    //Artifício técnico para dados das estações reais
                                                                    dados_cidade[arrLabelsX.indexOf(dia_atual)] = {
                                                                        value: parseInt(temp[registro_dados].split(";")[0]),
                                                                        aux: temp[registro_dados].split(";")[1]
                                                                    };
                                                                }
                                                            }
                                                            else {
                                                                dados_cidade[arrLabelsX.indexOf(dia_atual)] = parseInt(temp[registro_dados]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                var label = arrCidades[strUfCidade].Regiao;

                                //segmenta dados com 'buracos', para evitar que as linhas se conectem nos intervalos sem dados
                                var lastData = null;
                                var dados_Segmento = [];
                                for (var dado in dados_cidade) {
                                    if (dados_cidade[dado] == null) {
                                        if (dado != 0 && dado != dados_cidade.lenght) {
                                            bolPossuiNulos = true;
                                        }
                                    }
                                    if (lastData == null && dados_cidade[dado] != null) {
                                        totalSegmentos++;
                                    }
                                    if (lastData != null && dados_cidade[dado] == null) {
                                        for (var i = dados_cidade.length; i > dado; i--) {
                                            dados_Segmentados[indexSegmento].push(null);
                                        }
                                        indexSegmento++;
                                    }
                                    if (!(dados_Segmentados[indexSegmento] instanceof Array)) {
                                        dados_Segmentados[indexSegmento] = [];
                                        for (var i = 0; i < dado; i++) {
                                            dados_Segmentados[indexSegmento].push(null);
                                        }
                                    }
                                    dados_Segmentados[indexSegmento].push(dados_cidade[dado]);
                                    lastData = dados_cidade[dado];
                                }
                                if (dados_Segmentados.length > 0) {
                                    for (var idx = 0; idx < dados_Segmentados.length; idx++) {
                                        dados_Segmentados_final.push({
                                            label: label,
                                            fillColor: $scope.config.fillColor,
                                            strokeColor: $scope.config.dataColorsSequence[indexCidade],
                                            pointColor: $scope.config.dataColorsSequence[indexCidade],
                                            pointStrokeColor: $scope.config.background,
                                            pointHighlightFill: $scope.config.background,
                                            pointHighlightStroke: $scope.config.dataColorsSequence[indexCidade],
                                            data: dados_Segmentados[idx]
                                        });
                                    }
                                }
                                else {
                                    arrAllData.push({
                                        label: label,
                                        fillColor: $scope.config.fillColor,
                                        strokeColor: $scope.config.dataColorsSequence[indexCidade],
                                        pointColor: $scope.config.dataColorsSequence[indexCidade],
                                        pointStrokeColor: $scope.config.background,
                                        pointHighlightFill: $scope.config.background,
                                        pointHighlightStroke: $scope.config.dataColorsSequence[indexCidade],
                                        data: dados_cidade
                                    });
                                }
                            }
                            indexCidade = -1;
                        }
                        if (dados_Segmentados_final.length > 0) {
                            //for (var dat in dados_Segmentados_final) {
                            newData = {
                                labels: arrLabelsX,
                                datasets: dados_Segmentados_final
                            };
                            //}
                        }
                        else {
                            newData = {
                                labels: arrLabelsX,
                                datasets: arrAllData
                            };
                        }

                        /*
                        {
                        labels: ['18/05', '19/05', '20/05', '21/05', '22/05'],
                        datasets: [
                        {
                        label: "Cidade 1",
                        fillColor: "transparent",
                        strokeColor: "#00A3D9",
                        pointColor: "#00A3D9",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "#00A3D9",
                        data: [$scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor()]
                        },...
                        ]
                        }
                        */
                        break;
                    case 1:
                        //radar
                        /*
                        {
                        labels: ["Norte", "Nordeste", "Leste", "Sudeste", "Sul", "Sudoeste", "Oeste", "Noroeste"],
                        datasets: [
                        {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [0, 2, 3, 1, 0, 0, 0, 0]
                        },...
                        ]
                        }
                        */
                        break;
                    case 2:
                        //polar
                        /*
                        [
                        {
                        value: 120,
                        color: "#4D5360",
                        highlight: "#616774",
                        label: "Dark Grey",
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
                        },...
                        ]
                        */
                        break;
                    case 3:
                        //pie
                        break;
                }
                break;
            case 2:
                //fusionchart
                switch (tipo) {
                    case 0:
                        //linhas
                        /*
                        {
                        "chart": {
                        "canvaspadding": "10",
                        "caption": "Monthly Sales Summary",
                        "subcaption": "For the year 2004",
                        "xaxisname": "Month",
                        "yaxisname": "Sales",
                        "numberprefix": "$",
                        "showlabels": "1",
                        "showcolumnshadow": "1",
                        "animation": "1",
                        "showalternatehgridcolor": "1",
                        "alternatehgridcolor": "ff5904",
                        "divlinecolor": "ff5904",
                        "divlinealpha": "20",
                        "alternatehgridalpha": "5",
                        "canvasbordercolor": "666666",
                        "basefontcolor": "666666",
                        "linecolor": "FF5904",
                        "linealpha": "85",
                        "showvalues": "1",
                        "rotatevalues": "1",
                        "valueposition": "auto"
                        },
                        "data": [
                        {
                        "label": "Jan",
                        "value": "27400"
                        },...
                        ]
                        }
                        */
                        break;
                    case 1:
                        //radar
                        /*
                        */
                        break;
                    case 2:
                        //polar
                        /*
                        */
                        break;
                    case 3:
                        //pie
                        break;
                }
                break;
        }
        return newData;
    };
} ]);

angular.module('resultado').directive('graficoResultado', function () {
    return {
        restrict: 'E',
        scope: {
            container: "@container",
            width: "=width",
            height: "=height",
            edicao: "=edicao",
            dados: "=dados",
            config: "=config",
            chartType: "@chartTypeInit",
            cidadesAdicionadas: "=cidadesAdicionadas"
        },
        templateUrl: function (element, attrs) {
            return '/AVA/Resultados/Scripts/Diretiva/Comum/grafico-resultado.html';
        },
        link: function (scope, elm, attrs, ctrl) {
            var self = this;
            scope.mainElementName = "rnd" + Math.round(Math.random() * 100000000);

            scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };
            
            /*
            setTimeout(function(){
            scope.safeApply
            },500);
            */
        }
    };
});

