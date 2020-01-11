"use strict"
angular.module('Equipe').directive('listaEquipeEtapa', ['$http', function ($http) {
    return {
        restrict: 'E',
        //replace: true,
        scope: {
            idEdicao: "=idEdicao",
            idEtapa: "=idEtapa",
            checkEquipe: "=checkEquipe",
            objEquipe: "=objEquipe",
            usuario: "=usuario"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Equipe/lista-equipe-etapa.html',
        controller: ['$scope', function ($scope) {
            var equipe = this;
            $scope.Equipes = {};

            this.init = function (data) {
                $http({
                    cache: false,
                    params: {
                        idEdicao: $scope.idEdicao,
                        idEtapa: $scope.idEtapa,
                        '_': new Date().getTime()
                    },
                    url: "/AVA/Projetos/Servico/GetListaEquipeEtapa/",
                    method: 'POST'
                })
                .success(function (data) {
                    equipe = data;
                    $scope.Equipes = data.Equipes;

                    if ($scope.usuario) if ($scope.usuario.bolMonitor) if ($scope.Equipes.length == 1) {
                        $scope.checkEquipe($scope.Equipes[0]);
                    }

                })
                .error(function () {
                    alert("Não foi possível carregar a lista de Equipes");
                });

                equipe = data;
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
                equipe.init();
            }, 10);

        } ],
        controllerAs: 'turmaEtapaCtrl'
    };
} ]);