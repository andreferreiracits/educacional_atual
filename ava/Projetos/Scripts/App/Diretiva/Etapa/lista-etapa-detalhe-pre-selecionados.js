"use strict"
angular.module('Etapa').directive('listaEtapaDetalhePreSelecionados', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/lista-etapa-detalhe-pre-selecionados.html',
        scope: {
            //idEdicao: "@idEdicao",
            objParceria: "=objParceria",
            objEdicao: "=objEdicao",
            objEtapa: "=objEtapa",
            usuario: "=usuario",
            defaultConfig: "=defaultConfig"
            //edicaoAno: "@edicaoAno",
            //edicaoLink: "@edicaoLink"
        },
        link: function (scope, el, attr) {
        },
        controller: ['$http', '$scope', '$timeout', '$filter', function ($http, $scope, $timeout, $filter) {

            var controller = this;

            $scope.existeParceria = false;
            $scope.objDetalhe = {
                totalInscrito: 0,
                totalEnviado: 0
            };

            $scope.portalEnvio = {};
            $scope.currentIndex = 0;

            if ($scope.objParceria) if ($scope.objParceria != null) {
                angular.forEach($scope.objParceria.Turmas, function (valor, chave) {
                    if (valor.Parceira && valor.Parceira != null) {
                        $scope.existeParceria = true;
                    }
                });
            }

            $scope.parceiraSelected = null;

            $scope.setFirstTurmaParceira = function () {
                $scope.comboTurma = $scope.objParceria.Turmas[0]
            };

            $scope.changeTurmaParceira = function () {
                $scope.parceiraSelected = null;
                $timeout(function () {
                    $scope.parceiraSelected = $scope.comboTurma;
                }, 500);
            };

            this.parceiraPossuiEnvio = function (turmaParceira) {
                if (turmaParceira) {
                    if (turmaParceira.Parceira) {
                        if (turmaParceira.Parceira.LinkPostEnvio) {
                            if (turmaParceira.Parceira.LinkPostEnvio.LinkPost != null && turmaParceira.Parceira.LinkPostEnvio.FormularioParticipanteEnvio != null) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            };

            this.init = function () {
                $scope.objEtapa.DataInicio = new Date(parseInt($scope.objEtapa.DataInicio.substr(6), 10));
                $scope.objEtapa.DataFim = new Date(parseInt($scope.objEtapa.DataFim.substr(6), 10));
                $scope.objEtapa.DataResultado = new Date(parseInt($scope.objEtapa.DataResultado.substr(6), 10));

                //if ($scope.objEtapa) {
                //angular.forEach($scope.objEtapa, function (valor, chave) {
                //$scope.objEtapa.DataInicio = new Date(parseInt($scope.objEtapa.DataInicio.substr(6)));
                //$scope.objEtapa.DataFim = new Date(parseInt($scope.objEtapa.DataFim.substr(6)));
                //$scope.objEtapa.DataResultado = new Date(parseInt($scope.objEtapa.DataResultado.substr(6)));
                //$scope.objEtapa.DataInicio = new Date(parseInt($scope.objEtapa.DataInicio.replace("/Date(", "").replace(")/",""), 10));
                //$scope.objEtapa.DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                //$scope.objEtapa.DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                //$scope.objEtapa.DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                //});
                //}

                //$http.get('/AVA/Projetos/Servico/GetEtapaDetalhe?idEtapa=' + $scope.objEtapa.Id,
                //{
                //    cache: false,
                //    '_': new Date().getTime()
                //})
                $http({
                    cache: false,
                    params: {
                        idEtapa: $scope.objEtapa.Id,
                        '_': new Date().getTime()
                    },
                    url: "/AVA/Projetos/Servico/GetEtapaDetalhe/",
                    method: 'GET'
                })
                .success(function (data) {
                    $scope.objDetalhe = data.DetalheEnvio;
                    $scope.portalEnvio = data.portalEnvio;
                    $scope.slides = data.portalEnvio;
                }).error(function (err) {
                    console.log("Não foi possível buscar detalhe da Etapa");
                });
            };

            this.situacaoEtapa = function (etapa) {
                //Pegar essa data do Servidor erro apra computadores com datas erradas.
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

            this.ehPerfil = function (perfil) {
                var retorno = false;
                if (perfil != null) {
                    var perfis = perfil.split(',');
                    if ($scope.usuario) if ($scope.usuario.Cargos) if ($scope.usuario.Cargos instanceof Array) if ($scope.usuario.Cargos.length > 0) {
                        angular.forEach($scope.usuario.Cargos, function (cargo) {
                            var teste = $filter('filter')(perfis, cargo.Nome)
                            if (teste) if (teste instanceof Array) if (teste.length > 0) {
                                retorno = true;
                            }
                        });
                    }
                }
                return retorno;
            };


            $scope.setCurrentSlideIndex = function (index) {
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.prevSlide = function () {
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
            };


            $timeout(function () {
                controller.init();
            }, 10);


        } ],
        controllerAs: 'etapaDetalheCtrl'
    };

});