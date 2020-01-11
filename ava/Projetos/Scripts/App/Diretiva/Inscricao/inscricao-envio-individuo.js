"use strict"

angular.module('Inscricao.mista').directive('inscricaoEnvioIndividuo', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/inscricao-envio-individuo.html',
        scope: {
            usuario: "=usuario",
            edicao: "=edicao",
            edicaoConfig: "=edicaoConfig",
            objEtapa: "=objEtapa",
            etapa: "=objEtapa",
            etapaConfig: "=etapaConfig",
            objParametro: "=objParametro"
        },
        controller: ['$scope', '$http', '$modal', '$log', '$filter', '$timeout', function ($scope, $http, $modal, $log, $filter, $timeout) {
            //variaveis do escopo
            var self = this;
            var objTipoInscricao = [];
            var arraySeletorEnvio = [];
            
            $scope.objParametroFinal = angular.copy($scope.objParametro);
            //$scope.objParametroFinal = $scope.objParametro);
            
            $scope.maxEnvioIndividuo = 0;

            $scope.objInscricaoSelecionada = {};
            $scope.acesso = { primeiro: true, openListaIndividual: true };
            $scope.abaSeletor = { atual: 2 };
            $scope.bloqueiaAll = { block: false };
            $scope.controle =
            {
                envios: false,
                novo: false
            };

            $scope.novoForm = function () {
                return {
                    Edicao: {
                        Id: $scope.objEtapa.Edicao.Id
                    },
                    TipoInscricao: {
                        Id: $scope.objTipoInscricao[0].Id
                    },
                    Categorias: []
                };
            }

            $scope.abreEnvios = function () {
                if ($scope.objParametroFinal.Inscricoes.length > 0)
                    $scope.abaSeletor.atual = 1;
                else
                    $scope.abaSeletor.atual = 2
            };

            //rotina de inicialização
            $scope.init = function () {

                if ($scope.objEtapa) if ($scope.objEtapa.Edicao) if ($scope.objEtapa.Edicao.InscricoesTipos) {
                    var objTipoInscricaoEtapa = $filter('filter')($scope.objEtapa.Edicao.InscricoesTipos, { Id: 5 }, true);

                    if (objTipoInscricaoEtapa.length == 1) {
                        if (objTipoInscricaoEtapa[0].MaxEnvio > 0) {
                            $scope.maxEnvioIndividuo = objTipoInscricaoEtapa[0].MaxEnvio;
                        }
                    }
                }

                if ($scope.edicaoConfig) if ($scope.edicaoConfig.InscricoesTipos) {
                    arraySeletorEnvio = $filter('filter')($scope.edicaoConfig.InscricoesTipos, { Id: 5 }, true);
                    //Verifica se existe inscricao por equipe de uma unica turma
                    objTipoInscricao = $filter('filter')($scope.edicaoConfig.InscricoesTipos, { Id: 5 }, true);
                    if (objTipoInscricao.length == 1)
                        $scope.objTipoInscricao = objTipoInscricao;
                }

                if ($scope.objParametro) if ($scope.objParametro.Inscricao) if ($scope.objParametro.Inscricao.Id) if (!isNaN($scope.objParametro.Inscricao.Id)) if (parseInt($scope.objParametro.Inscricao.Id) > 0) {
                    $scope.objParametroFinal = $scope.objParametro;
                }
                $scope.form = $scope.novoForm();

                if (($scope.maxEnvioIndividuo > 0) && ($scope.objParametroFinal.Inscricoes.length >= $scope.maxEnvioIndividuo)) {
                    $scope.openEnvioIndividual();
                }



                //$http.get('/AVA/Projetos/Servico/GetConfiguracaoIndividualByIdEdicao/?idEdicao=' + $scope.objEtapa.Edicao.Id)

                $http({
                    cache: false,
                    params: {
                        idEdicao: $scope.objEtapa.Edicao.Id,
                        '_': new Date().getTime()
                    },
                    url: "/AVA/Projetos/Servico/GetConfiguracaoIndividualByIdEdicao/",
                    method: 'GET'
                })
                .success(function (data) {
                    if (data) if (data.status) if (data.status == 1) {
                        if (data.Inscricao) if (data.Inscricao.Id) if (!isNaN(data.Inscricao.Id)) if (parseInt(data.Inscricao.Id) > 0) {
                            $scope.objInscricao = data.Inscricao;
                            $scope.idInscricao = $scope.objInscricao.Id;
                        }
                        
                        //if (data.Envio) if (data.Envio.Id) if (!isNaN(data.Envio.Id)) if (parseInt(data.Envio.Id) > 0)
                        //$scope.objInscricaoSelecionada = data.Envio;

                    }
                }).error(function () {
                    alert("Erro ao buscar configuração da Etapa.");
                });

            };


            $scope.$on("changeListaInscricoesIndividuo", function (event, objRetorno) {
                //$scope.objInscricao = objRetorno.Inscricao;
                //$scope.objInscricaoSelecionada.EtapaInscricaoEnvios = objRetorno.Envios;
                if ($scope.abaSeletor.atual == 1) {
                    $scope.objParametroFinal.Inscricao.EtapaInscricaoEnvios = objRetorno.Envios;
                } else {
                    $scope.objParametroFinal.Inscricoes = objRetorno.listaInscricoes;
                }
                //$scope.objParametroSelecionado.Inscricoes = data.listaInscricoes;
            });

            $scope.$on("changeInscricaoIndividuo", function (event, objRetorno) {
                var result = $filter('filter')($scope.objParametroFinal.Inscricoes, { Id: objRetorno.Envios[0].Inscricao.Id });
                if (result.length > 0) {

                    result[0].EtapaInscricaoEnvios[0].Situacao = objRetorno.Envios[0].Situacao;
                }
            });

            $scope.openEnvioIndividual = function () {
                $scope.abaSeletor.atual = 1;
                $scope.objInscricaoSelecionada = {};
            };

            $scope.checkInscricao = function (obj) {
                $scope.objInscricaoSelecionada = {};
                $timeout(function () {
                    $scope.objInscricaoSelecionada = obj;
                }, 100);
            };

            $scope.addNovoMaterialIndividual = function () {
                $scope.abaSeletor.atual = 2;
                $scope.acesso.openListaIndividual = false;
                $scope.bloqueiaAll.block = false;
                $scope.objInscricaoSelecionada = {};
                $timeout(function () {
                    $scope.acesso.openListaIndividual = true;
                }, 200);
            };

            this.resetControle = function () {
                $scope.controle =
                {
                    envios: false,
                    novo: false
                };
            };

            $timeout(function () {
                $scope.init();
            }, 100);

        } ],
        controllerAs: "inscEnvioIndividuoClube"
    };
});



