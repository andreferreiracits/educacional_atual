"use strict";

angular.module('resultado')
.directive('galeriaFiltro', function () {
    return {
        restrict: 'EA',
        scope: {
            edicao : "=edicao",
            jsonConfig : "=jsonConfig",
            ordemConto: "=ordemConto",
            config : "=config"
        },
        controller: "galeriaFiltroCtrl",
        templateUrl: '/AVA/Resultados/Scripts/Diretiva/Projeto/2015/eraumavezeraoutravez/_galeriafiltro.html',
        link: function (scope, elm, attrs) {
        }
    };
});

angular.module("resultado")
.controller('galeriaFiltroCtrl', ["$http", "$scope", "$timeout", "galeria", function ($http, $scope, $timeout, galeria) {
    var self = this;
    var pagina = 1;
    $scope.totalRegistro = 0;
    $scope.galeria = galeria;
    $scope.EstadoSelecionado = "";
    $scope.EscolaSelecionado = "";
    $scope.TurmaSelecionado = "";

    $scope.envios = [];
    $scope.filtros = [];
    $scope.bolCarregado = false;
    var json = $scope.jsonConfig;

    this.getFiltro = function () {
        var request = galeria.getFiltro(json.Edicao.Id, json.Etapas.Etapa_1.Id, json.Etapas.Etapa_2.Id, json.Etapas.Etapa_3.Id, json.idFormCampoPersonagem, $scope.ordemConto, pagina, $scope.EstadoSelecionado, $scope.EscolaSelecionado, $scope.TurmaSelecionado);
        request.then(function (data) {
            if (data) {
                if (data.filtros) {
                    $scope.filtros = data.filtros;
                }
            }
        }, function () {
            console.log("Error");
        });
    };

    $scope.aplicarFiltro = function (tipo) {
        if (tipo == 0) {
            $scope.EscolaSelecionado = "";
            $scope.TurmaSelecionado = "";
        }
        if (tipo == 1) {
            if ($scope.EscolaSelecionado == "" || $scope.EscolaSelecionado == null) {
                $scope.TurmaSelecionado = "";
            }
        }
        self.getGaleria();
    };

    this.getGaleria = function () {
        pagina = 1;
        $scope.envios = [];

        if (!$scope.loadingAjax) {
            $scope.loadingAjax = true;
            var request = galeria.getGaleria(json.Edicao.Id, json.Etapas.Etapa_1.Id, json.Etapas.Etapa_2.Id, json.Etapas.Etapa_3.Id, json.idFormCampoPersonagem, $scope.ordemConto, pagina, $scope.EstadoSelecionado, $scope.EscolaSelecionado, $scope.TurmaSelecionado);
            request.then(function (data) {
                if (data) {
                    if (data.totalRegistro) {
                        $scope.totalRegistro = parseInt(data.totalRegistro);
                    }
                    if (data.dados) {
                        angular.forEach(data.dados, function (obj, index) {
                            $scope.envios.push(obj);
                        });
                    }
                }
                $scope.loadingAjax = false;
                $scope.bolCarregado = true;
            }, function () {
                console.log("Error");
                $scope.loadingAjax = false;
            });
        }
    };


    $scope.nextResult = function () {
        pagina++;
        if (!$scope.loadingAjax) {
            $scope.loadingAjax = true;
            var request = galeria.getGaleria(json.Edicao.Id, json.Etapas.Etapa_1.Id, json.Etapas.Etapa_2.Id, json.Etapas.Etapa_3.Id, json.idFormCampoPersonagem, $scope.ordemConto, pagina, $scope.EstadoSelecionado, $scope.EscolaSelecionado, $scope.TurmaSelecionado);
            request.then(function (data) {
                if (data) {
                    if (data.totalRegistro) {
                        $scope.totalRegistro = parseInt(data.totalRegistro);
                    }
                    if (data.dados) {
                        angular.forEach(data.dados, function (obj, index) {
                            $scope.envios.push(obj);
                        });
                    }
                }
                $scope.loadingAjax = false;
            }, function () {
                console.log("Error");
                $scope.loadingAjax = false;
            });
        }
    };

    self.getFiltro();
    self.getGaleria();
} ]);


angular.module("resultado")
.factory("galeria", ["$http", "$q", function ($http, $q) {
    var dados = "";
    var arrNomes = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
    var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];

    function getEstadoByUf(strUF) {
        return arrNomes[arrSiglas.indexOf(strUF)];
    }

    function getFiltro(idEdicao, idEtapa_1,idEtapa_2, idEtapa_3, idFormCampoPersonagem, ordemConto, pagina) {
        var def = $q.defer();

        $http({
            method: "POST",
            url: "/AVA/Resultados/Eraumavez2015/GetFiltroGaleria",
            data: {
                idProjetoEdicao: idEdicao,
                idProjetoEdicaoEtapa_1: idEtapa_1,
                idProjetoEdicaoEtapa_2: idEtapa_2,
                idProjetoEdicaoEtapa_3: idEtapa_3,
                idFormCampoPersonagem: idFormCampoPersonagem,
                intOrdemConto: ordemConto,
                intPagina: pagina
            }
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject("Não foi possível carregar os dados:" + err);
        });

        return def.promise
    }

    function getGaleria(idEdicao, idEtapa_1, idEtapa_2, idEtapa_3, idFormCampoPersonagem, ordemConto, pagina, filtroEstado, filtroEscola, filtroTurma) {
        var def = $q.defer();

        if (filtroEscola == "" || filtroEscola == null) {
            filtroEscola = 0;
        } else {
            filtroEscola = parseInt(filtroEscola);
        }

        if (filtroTurma == "" || filtroTurma == null) {
            filtroTurma = 0;
        } else {
            filtroTurma = parseInt(filtroTurma);
        }

        $http({
            method: "POST",
            url: "/AVA/Resultados/Eraumavez2015/JsonResultadoGaleria",
            data: {
                idProjetoEdicao: idEdicao,
                idProjetoEdicaoEtapa_1: idEtapa_1,
                idProjetoEdicaoEtapa_2: idEtapa_2,
                idProjetoEdicaoEtapa_3: idEtapa_3,
                idFormCampoPersonagem : idFormCampoPersonagem,
                intOrdemConto: ordemConto,
                intPagina: pagina,
                filtroEstado: filtroEstado,
                filtroEscola: filtroEscola,
                filtroTurma: filtroTurma
            }
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject("Não foi possível carregar os dados:" + err);
        });

        return def.promise
    }

    return {
        getEstadoByUf: getEstadoByUf,
        getFiltro: getFiltro,
        getGaleria: getGaleria
    };

} ]);



