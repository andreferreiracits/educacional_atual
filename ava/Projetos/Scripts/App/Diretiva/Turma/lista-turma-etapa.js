"use strict"
angular.module('Turma').directive('listaTurmaEtapa', ['$http', function ($http) {
    return {
        restrict: 'E',
        //replace: true,
        scope: {
            idEdicao: "=idEdicao",
            idEtapa: "=idEtapa",
            checkTurma: "=checkTurma",
            turmap: "=turmap"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Turma/lista-turma-etapa.html',
        controller: ['$scope', function ($scope) {
            var turma = this;
            $scope.Turmas = {};

            this.init = function (data) {
                //$http.get('/AVA/Projetos/Servico/GetListaTurmaEtapa/?idEdicao=' + $scope.idEdicao + '&idEtapa=' + $scope.idEtapa,
                //{
                //    cache: false,
                //    '_': new Date().getTime()
                //})
                $http({
                    cache: false,
                    params: {
                        idEdicao :  $scope.idEdicao,
                        idEtapa: $scope.idEtapa,
                        '_': new Date().getTime()
                    },
                    url: "/AVA/Projetos/Servico/GetListaTurmaEtapa/",
                    method: 'GET'
                })
                .success(function (data) {
                    turma = data;
                    $scope.Turmas = data.Turmas;
                    console.log(data.Turmas);
                    
                }).error(function () {
                    alert("Não foi possível carregar a lista de Turmas");
                });

                turma = data;
            };


            $scope.formRascunho = function (idSituacao) {
                if (idSituacao == 4 || idSituacao == 0) {
                    return true;
                }
                else {
                    return false;
                }
            };

            $scope.estaInscrito = function (inscricao) {
                if (inscricao == null) {
                    return false;
                }
                else {
                    return true;
                }
            }

            setTimeout(function () {
                turma.init();
            }, 10);

        } ],
        controllerAs: 'turmaEtapaCtrl'
    };
} ]);