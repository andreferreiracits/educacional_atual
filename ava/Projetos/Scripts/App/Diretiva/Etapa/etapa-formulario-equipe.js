"use strict"
angular.module('Etapa').directive('etapaFormularioEquipe', function () {
    return {
        restrict: 'E',
        //replace: true,
        scope: {
            idEdicao: "=idEdicao",
            idEtapa: "=idEtapa",
            usuario: "=usuario",
            defaultConfig: "=defaultConfig"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/etapa-formulario-equipe.html'
    };
});


angular.module('Etapa').controller("etapaFormularioEquipeCtrl", ['$http', '$scope', '$rootScope', 'perfilUsuario', '$timeout', 'projetoTools', function ($http, $scope, $rootScope, servicoUsuario, $timeout, projetoTools) {
    
    $scope.projetoTools = projetoTools;
    //$scope.objEquipe = {};
    $scope.etapa = {};
    $scope.config = {};
    $scope.etapaConfig = {};
    $scope.situacaoEtapa = 0;

    var that = this;
    this.usuario = {};

    this.etapaDataInicio = $scope.etapa.DataInicio;

    //Busca dados do Usuario via serviço Melhorar servios com.
    servicoUsuario.usuario().success(function (data) {
        that.usuario = data.usuario;
    });

    this.init = function () {
        $scope.config.idEdicao = $scope.idEdicao;

        $http.get('/AVA/Projetos/Servico/GetEtapaConfiguracaoByIdEtapa/?idEtapa=' + $scope.idEtapa)
        .success(function (data) {
            $scope.etapa = data.EtapaConfiguracao.Etapa;
            $scope.etapaConfig = data.EtapaConfiguracao;

            $scope.situacaoEtapa = $scope.getStatusEtapa();

        }).error(
        function () {
            alert("Erro ao buscar configuração da Etapa.");
        });
    };

    $scope.checkTurma = function (turma) {
        $scope.Turma = turma;
        $timeout(function () {
            $scope.$broadcast("limpaFormTurma", { clickTurma: true });
        }, 100);
    };

    this.isCheckTurma = function () {
        if ($scope.Turma == null) {
            return false
        }
        else {
            return true
        }
    };

    $scope.checkEquipe = function (equipe) {
        $scope.objEquipe = equipe;
        $timeout(function () {
            $scope.$broadcast("limpaFormTurma", { clickTurma: true });
        }, 100);
    };

    this.isCheckEquipe = function () {
        if ($scope.objEquipe == null) {
            return false
        }
        else {
            return true
        }
    };

    $scope.getStatusEtapa = function () {

        if (!$scope.etapa) {
            return false;
        }

        var dataAtual = new Date();
        var dataInicioEtapa = new Date(parseInt($scope.etapa.DataInicio.substr(6), 10));
        var dataFimEtapa = new Date(parseInt($scope.etapa.DataFim.substr(6), 10));
        if (dataAtual >= dataInicioEtapa && dataAtual <= dataFimEtapa) {
            return 1;
        } else if (dataAtual < dataInicioEtapa) {
            return 2;
        } else if (dataAtual > dataFimEtapa) {
            return 3;
        } else {
            return 0;
        }
    };

    setTimeout(function () { that.init(); }, 10);



} ]);

