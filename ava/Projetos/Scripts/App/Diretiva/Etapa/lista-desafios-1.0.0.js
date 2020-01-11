"use strict"

angular.module('Etapa').directive('listaDesafios', function () {
        return {
            restrict: 'EAM',
            templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/lista-desafios.html',
            scope: {
                objEdicaoConfig: "=objEdicaoConfig",
                objEdicao: "=objEdicao",
                objEdicoes: "=objEdicoes",
                defaultConfig: "=defaultConfig"
            },
            link: function ($scope, element, attrs, controller) {
                $scope.getData = function (p_data) {
                    if (p_data) if (p_data != "") {
                        return new Date(p_data);
                    }
                    return new Date();
                }
                $scope.getLocation = function () {
                    return window.document.location;
                }
            },
            controller: ['$http', '$scope', '$timeout', 'constantes',
                function ($http, $scope, $timeout, constantes) {
                    var _this = this;

                    var currentDate = new Date();

                    //Create group by name
                    var createGroupNameByDate = function (date) {

                        var groupName = {};
                        var year = date.getFullYear();

                        if (year >= currentDate.getFullYear())
                            groupName = { name: "Desafios em " + date.getFullYear().toString(), year: year }
                        else
                            groupName = { name: "Encerrados em " + date.getFullYear().toString(), year: year }


                        //  console.log("Groupname " + groupName );

                        return groupName;
                    };



                    $scope._etapas = [];
                    $scope._groupDates = [];

                    //abosorvendo cada etapada em um unico array
                    if ($scope.objEdicoes !== undefined) {

                        //monta lista de etapas
                        angular.forEach($scope.objEdicoes[0], function (item, key) {
                            $scope._etapas.push(item.Etapas[0]);
                        });

                        //Obtem a lista de anos possíveis
                        //Transformações das datas em objectos Date do Javascript
                        angular.forEach($scope._etapas, function (value, key) {

                            $scope._etapas[key].DataInicio = eval("new " + value.DataInicio.replace(/\//ig, ""));
                            $scope._etapas[key].DataFim = eval("new " + value.DataFim.replace(/\//ig, ""));
                            $scope._etapas[key].DataResultado = eval("new " + value.DataResultado.replace(/\//ig, ""));
                            //applica dateGroup em uma nova propriedade para ser filtrado na ui
                            $scope._etapas[key]._groupDate = createGroupNameByDate($scope._etapas[key].DataFim);

                            //popula a lista de possíveis grupos para o Select na ui
                            if ($scope._groupDates.length == 0)
                            {
                                $scope._groupDates.push($scope._etapas[key]._groupDate);
                            }                            
                            else
                            {
                                var needInsert = true;
                                angular.forEach($scope._groupDates, function (v, k)
                                {
                                    if ($scope._groupDates[k].name == $scope._etapas[key]._groupDate.name)
                                        needInsert = false;
                                });

                                if(needInsert)
                                    $scope._groupDates.push($scope._etapas[key]._groupDate);
                            }
                        });

                        $scope.edicao = $scope.objEdicoes[0];

                        //sort GroupNames
                        $scope._groupDates.sort(function (a, b) { return a.year < b.year; });

                        //Seleção inicial
                        $scope.selectedGroupName = $scope._groupDates[0].name;
                    }


                    $scope.filterByYear = function (year) {

                        return element.created.getMonth() == $scope.selectedMonth;
                    }




                    this.situacaoEtapa = function (etapa) {
                        // Pegar essa data do Servidor erro apra computadores com datas erradas.
                        if (typeof etapa.DataResultado == 'object') {
                            var dataAtual = new Date();

                            if (dataAtual.getTime() > etapa.DataResultado.getTime()) { //Confira o resultado
                                return 4;
                            }
                            else if (dataAtual.getTime() > etapa.DataFim.getTime()) { // Confira os envios, etapa passou
                                return 3;
                            }
                            else if (dataAtual.getTime() > etapa.DataInicio.getTime()) { // Confira e envie a etapa
                                return 2;
                            }
                            else { //Aguarde
                                return 1;
                            }
                        }
                        return false;
                    }

                    // $timeout(function () {
                    //     that.init();
                    // }, 10);

                }],
            controllerAs: "controleDesafio"
        }
    });
