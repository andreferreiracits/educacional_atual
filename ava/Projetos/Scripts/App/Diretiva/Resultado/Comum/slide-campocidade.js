"use strict"
angular.module('resultado')
.directive('slideCampoCidade', function () {
    return {
        restrict: 'EA',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Resultado/Comum/slide-campocidade.html',
        scope: {
            objEdicao: "=objEdicao",
            objEtapa: "=objEtapa",
            defaultConfig: "=defaultConfig",
            textFilter: "@textFilter",
            sectionClass: "@sectionClass"
        },
        link: function (scope, el, attr) {
            if (scope.sectionClass === undefined || scope.sectionClass == null) {
                scope.sectionClass = '';
            }
        },
        controller: ['$http', '$scope', '$timeout', '$filter', function ($http, $scope, $timeout, $filter) {

            $scope.listaEnvio = [];
            $scope.cidadesInFiltro = [];
            $scope.currentIndex = 0;
            $scope.loadingDados = false;

            var self = this;
            var _idEtapa = 0;
            var _strOpcao = "";
            var _cidade = "";

            var _arrUF = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
            var _arrUFSigla = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];

            if ($scope.objEtapa) {
                if ($scope.objEtapa.Id) {
                    _idEtapa = $scope.objEtapa.Id;
                }
            }



            $scope.setCurrentSlideIndex = function (index) {
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.prevSlide = function () {
                $scope.currentIndex = ($scope.currentIndex < $scope.listaEnvio.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.listaEnvio.length - 1;

            };
            
            this.getDadosEnvio = function () {

                $scope.loadingDados = true;
                _cidade = self.getCidadesFiltro();

                $http({
                    url: '/AVA/Projetos/Servico/JsonResultadoPorEtapaCampoCidadeVazio',
                    data: {
                        idEtapa: _idEtapa,
                        idFormCampo: _strOpcao,
                        cidade: _cidade,
                        bolVazio: 0
                    },
                    method: "POST"
                }).success(function (response) {
                    var data = {};
                    if (typeof (response) == "string") {
                        data = angular.fromJson(response);
                    }
                    else {
                        data = response;
                    }

                    if (data) if (data.dados) {
                        if (typeof (data.dados) == "string") {
                            data.dados = angular.fromJson(data.dados);
                        }
                        else {
                            data.dados = data.dados;
                        }
                        $scope.currentIndex = 0;
                        $scope.listaEnvio = data.dados;
                    }
                    $scope.loadingDados = false;
                }).error(function(){
                    $scope.loadingDados = false;
                });

            };

            this.getEstadoByUf = function (strUF) {
                if (_arrUFSigla.indexOf(strUF) > -1) {
                    return _arrUF[_arrUFSigla.indexOf(strUF)];
                } else {
                    return strUF;
                }
            };

            this.getCidadesFiltro = function () {
                var strFiltro = "";

                if ($scope.cidadesInFiltro.length > 0) {
                    var _cidades = $filter("unique")($scope.cidadesInFiltro, "Cidade");
                    if (_cidades.length > 0) {
                        angular.forEach(_cidades, function (obj, index) {
                            if (strFiltro == "") {
                                strFiltro = obj.Cidade;
                            } else {
                                strFiltro += "," + obj.Cidade;
                            }
                        });
                    }
                }

                return strFiltro;
            };


            //Watch quando mapa é alterado [ OVERLAY ]
            $scope.$on("changeListMap", function (event, obj, objFilter) {
                //console.log('changelistmap(slide)');
                //console.log(obj);
                //console.log(objFilter);
                $scope.cidadesInFiltro = [];
                $scope.listaEnvio = [];

                if (obj != null) {
                    for (var i = 0; i < obj.length; i++) {
                        if ((obj[i].Cidade != null && obj[i].Cidade != "")) {
                            $scope.cidadesInFiltro.push(
                           {
                               Sigla: obj[i].Estado,
                               Estado: self.getEstadoByUf(obj[i].Estado),
                               Cidade: obj[i].Cidade
                           });
                        }
                    }
                }

                if (objFilter) {
                    if (objFilter.opcao) {
                        _strOpcao = objFilter.opcao;
                    }
                }
                // _cidade = self.getCidadesFiltro();
                //
                //console.log($scope.cidadesInFiltro);
                //console.log('ajax')
                //console.log(_idEtapa);
                //console.log(_strOpcao);
                //console.log(_cidade);

                if ($scope.cidadesInFiltro.length > 0) {
                    self.getDadosEnvio();
                }
            });

            //Watch mapa alterado [ CLUSTER ]
            $scope.$on("changeListMapOpcao", function (event, objFilter) {
                console.log("//--> Não implementado Galeria Slide por cluster/opção ##");
            });
        } ],
        controllerAs: 'slideCampoCidadeCtrl'
    };
});
