"use strict"

angular.module('Etapa').directive('listaDesafiosMural', function () {
    return {
        restrict: 'EAM',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/lista-desafios-mural.html',
        scope: {
            objEdicao: "=objEdicao",
            objEtapa: "=objEtapa"
        },
        link: function ($scope, element, attrs, controller) {
            $scope.getData = function (p_data) {
                if (p_data) if (p_data != "") {
                    return new Date(p_data);
                }
                return new Date();
            };
            $scope.getLocation = function () {
                return window.document.location;
            };
            $scope.getPathEtapa = function (edicao, etapa) {

                if (etapa.LinkTarefa !== null) {
                    return etapa.LinkTarefa;
                }

                switch (edicao.TipoProjeto) {
                    case 1:
                        return "/AVA/Projetos/" + edicao.Ano + "/" + edicao.Link + "/Etapas/" + etapa.Link;
                        break;
                    case 2:
                        return "/AVA/Projetos/Clube/" + edicao.LinkProjeto + "/Desafios/" + etapa.Link;
                        break;
                    default:
                        return "javascript:;";
                        break;
                }
            };
        },
        controller: ['$http', '$scope', '$timeout', 'constantes', function ($http, $scope, $timeout, constantes) {
            var that = this;
            //$scope.objEdicao = angular.copy(constantes.Edicao);
            //$scope.objEtapas = angular.copy(constantes.Edicao.Etapas);
            //$scope.usuario = angular.copy(constantes.Usuario);
            //$scope.defaultConfig = angular.copy(constantes.DefaultConfig);

            $scope.edicoes = new Array();
            $scope.etapa = {};
            if ($scope.objEdicao) if ($scope.objEdicao instanceof Array) {
                for (var edicao in $scope.objEdicao) {
                    angular.forEach($scope.objEdicao[edicao].Etapas, function (valor, chave) {
                        $scope.objEdicao[edicao].Etapas[chave].DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                        $scope.objEdicao[edicao].Etapas[chave].DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                        $scope.objEdicao[edicao].Etapas[chave].DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                    });
                    $scope.edicoes.push($scope.objEdicao[edicao]);
                    $scope.edicao = $scope.objEdicao[edicao];
                }
            }
            if ($scope.objEtapa) {
                $scope.etapa = $scope.objEtapa;
                $scope.etapa.DataInicio = eval("new " + $scope.etapa.DataInicio.replace(/\//ig, ""));
                $scope.etapa.DataFim = eval("new " + $scope.etapa.DataFim.replace(/\//ig, ""));
                $scope.etapa.DataResultado = eval("new " + $scope.etapa.DataResultado.replace(/\//ig, ""));
            }
            this.situacaoEtapa = function (etapa) {
                // Pegar essa data do Servidor erro apra computadores com datas erradas.
                if (typeof etapa.DataResultado == 'object') {
                    var dataAtual = new Date();

                    if (etapa.BolBreve != null && etapa.BolBreve) {
                        return 0;
                    } else if (dataAtual.getTime() > etapa.DataResultado.getTime()) { //Confira o resultado
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
        } ],
        controllerAs: "controleDesafioMural"
    }
});
