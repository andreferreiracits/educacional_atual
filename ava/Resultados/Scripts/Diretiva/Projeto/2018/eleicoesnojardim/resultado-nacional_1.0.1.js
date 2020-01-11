"use strict";

angular.module("resultado").controller('Eleicoes2018Ctrl', ["$http", "$rootScope", "$scope", "$timeout", "$filter", "$location", "$state", "$modal", "projetoTools", "constantes", function ($http, $rootScope, $scope, $timeout, $filter, $location, $state, $modal, projetoTools, constantes) {
    var self = this;

    $scope.edicao = angular.copy(constantes.Edicao);
    $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);
    $scope.defaultConfig = angular.copy(constantes.defaultConfig);
    $scope.dadosResultados = undefined;
    $scope.objEtapaHorta = undefined;
    $scope.loadingComplete = false;

    //$scope.resultado = {};
    $scope.dadosVencedores = [];
    $scope.cargos = [];
    $scope.complemento_frase = "";
    $scope.nome_cargo_principal = "";
    this.init = function () {
        if (!angular.isDefined($scope.usuario)) {
            $scope.usuario = angular.copy(constantes.Usuario);
        }
        self.getResultado(function (retorno) {
            if (angular.isDefined(retorno) && angular.isDefined(retorno.definitions) && angular.isDefined(retorno.config) && angular.isDefined(retorno.dados)) {
                var tempEtapaHorta = $filter('filter')($scope.edicao.Etapas, { BolOpcional: true, BolSemGaleria: false, BolSemFormulario: false }, true);
                if (tempEtapaHorta) if (angular.isArray(tempEtapaHorta)) if (projetoTools.hasArrayElems(tempEtapaHorta)) {
                    $scope.objEtapaHorta = angular.copy(tempEtapaHorta);
                }
                $scope.dadosResultados = angular.copy(retorno);
                $scope.safeApply();
                self.preparaDados();
                $scope.loadingComplete = true;
            }
        });
    };

    this.preparaDados = function () {
        $scope.dadosVencedores = angular.copy($scope.dadosResultados.dados);
        var unique = {};
        for (var i in $scope.dadosResultados.dados) {
            if (typeof (unique[$scope.dadosResultados.dados[i].indiceCargo]) == "undefined") {
                if ($scope.nome_cargo_principal == "")
                    $scope.nome_cargo_principal = $scope.dadosResultados.dados[i].Cargo.toLowerCase();
                $scope.cargos.push($scope.dadosResultados.dados[i].indiceCargo);
            }
            unique[$scope.dadosResultados.dados[i].indiceCargo] = 0;
        }

        var temp = $scope.edicao.Nome.split(" ");
        var artigo = temp[1].toLowerCase().replace(/[^ao]/gi, "");
        var objeto = $scope.edicao.Nome.replace(temp[0] + " ", "").replace(temp[1] + " ", "");
        $scope.complemento_frase = (artigo + " noss" + artigo + " " + objeto).toLowerCase();
    };

    //remapeia as funções de projetoTools para essa controller e para o escopo atual
    var initApi = true;
    if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
        initApi = false;
    }
    if (initApi) {
        projetoTools.extendFunctions(self);
        projetoTools.extendFunctions($scope);
    }

    this.getDados = function () {
        return $scope.dadosResultados;
    };

    this.getResultado = function (callback) {
        var retorno = {
            dados: undefined,
            config: undefined,
            definitions: undefined
        };
        if (angular.isDefined($scope.resultado)) {
            //verifica se estão disponíveis os dados (fornecidos pela ViewBag/Razor na diretiva raiz do resultado-nacional)
            //se já disponíveis no scopo formata para o uso pela diretiva
            if ($scope.dados)
                retorno.dados = angular.copy(self.getObject($scope.dados));
            var temp = undefined;
            if ($scope.resultado) {
                temp = angular.copy(self.getObject($scope.resultado));
            }
            if (temp && angular.isDefined($scope.resultado.MensagemRapida) && angular.isObject($scope.resultado.MensagemRapida) && $scope.resultado.MensagemRapida.Id > 0) {
                if (temp.JsonConfig) {
                    retorno.config = angular.copy(self.getObject(temp.JsonConfig));
                    retorno.definitions = {
                        dtmAtualizacao: temp.DataAtualizacao,
                        DataAtualizacao: temp.DataAtualizacao,
                        idMensagemRapida: temp.MensagemRapida.Id,
                        MensagemRapida: angular.copy(self.getObject(temp.MensagemRapida)),
                        idProjetoEdicao: temp.Id,
                        strDescricao: ""
                    };

                    if (retorno.definitions.dtmAtualizacao) if (retorno.definitions.dtmAtualizacao) if (retorno.definitions.dtmAtualizacao.indexOf("/") != -1) {
                        retorno.definitions.dtmAtualizacao = new Date(parseInt(retorno.definitions.dtmAtualizacao.substr(6), 10));
                    }
                    projetoTools.cb($scope, callback, angular.copy(retorno));
                }
            }
        }
        if (!(angular.isDefined(retorno) && angular.isDefined(retorno.definitions) && angular.isDefined(retorno.config) && angular.isDefined(retorno.dados) && angular.isArray(retorno.dados) && projetoTools.hasArrayElems(retorno.dados))) {
            //faz a requisição pelos dados remotamente
            $http({
                url: '/AVA/Resultados/Servico/GetResultadoEdicaoEtapa',
                params: {
                    idEdicao: $scope.edicao.Id,
                    idEtapa: $scope.edicao.Etapas[$scope.edicao.Etapas.length - 1].Id
                },
                method: "GET"
            }).success(function (response) {
                var data = angular.copy(self.getObject(response));
                if (data) {
                    if (data.dados)
                        retorno.dados = angular.copy(self.getObject(data.dados));
                    if (data.config)
                        retorno.config = angular.copy(self.getObject(data.config));
                    if (data.definitions)
                        retorno.definitions = angular.copy(self.getObject(data.definitions));
                    projetoTools.cb($scope, callback, angular.copy(retorno));
                }
            });
        }
    };

    this.getObject = function (content) {
        if (content) {
            if (typeof (content) == "string") {
                return angular.fromJson(content);
            }
            else {
                return angular.copy(content);
            }
        }
    };


    $scope.DataZeros = function (data) {
        var d = new Date();
        if (data) if (data instanceof Date) {
            d = data;
        }
        var ret = $scope.Right("0" + d.getDate().toString(), 2);
        ret += '/' + $scope.Right("0" + (d.getMonth() + 1).toString(), 2);
        ret += '/' + d.getFullYear().toString();
        return ret;
    }

    $scope.openModalGraficos = function (p_width, p_height, arrColors) {
        var modalInstance = $modal.open({
            templateUrl: '/AVA/Projetos/StaticResultados/Diretiva/Comum/modal-resultado-eleicoes.html',
            controller: 'modalResultadoPizzaCtrl',
            size: 0,
            resolve: {
                edicao: function () {
                    return $scope.edicao;
                },
                edicaoConfig: function () {
                    return $scope.edicaoConfig;
                },
                defaultConfig: function () {
                    return $scope.defaultConfig;
                },
                dadosResultados: function () {
                    return $scope.dadosResultados;
                },
                p_width: function () {
                    return p_width;
                },
                p_height: function () {
                    return p_height;
                },
                p_colors: function () {
                    return arrColors;
                }
            }
        });

        modalInstance.result.then(function (parametro) {
            // Ao clicar em "OK", recebe os parametros!
        }, function () {
            //reverte as alterações em caso de fechamento sem ok, p.exe: clicar fora do modal
        });
        modalInstance.opened.then(function (parametro) {
            // Ao clicar em "OK", recebe os parametros!
        }, function () {
        });
    };

    $timeout(function () {
        self.init();
    });
} ]);


angular.module('resultado').controller('modalResultadoPizzaCtrl', ['$scope', '$modalInstance', '$http', '$filter', '$timeout', 'projetoTools', 'edicao', 'edicaoConfig', 'defaultConfig', 'dadosResultados', 'p_width', 'p_height', 'p_colors', function ($scope, $modalInstance, $http, $filter, $timeout, projetoTools, edicao, edicaoConfig, defaultConfig, dadosResultados, p_width, p_height, p_colors) {
    var _self = this;
    this.lastScrollPosition = 0;
    this.controlDynamicImgLoad = undefined;

    $scope.edicao = edicao;
    $scope.defaultConfig = defaultConfig;
    $scope.edicaoConfig = edicaoConfig;
    $scope.dadosResultados = dadosResultados;
    $scope.width = p_width;
    $scope.height = p_height;
    $scope.arrColors = p_colors;

    $scope.dadosCargo = [];

    $scope.variante = "flot";
    $scope.variante = "fusionchart";
    $scope.variante = "chartjs";
    //$scope.variante = "css";

    this.init = function () {
        //REALIZA OS AJUSTES NO FORMATO DOS DADOS PARA SEREM USADO NO FRONT
        //obtém a relação de cargos, para organizar/particionar os dados

        var unique = {};
        var cargos = [];
        for (var i in $scope.dadosResultados.dados) {
            if (typeof (unique[$scope.dadosResultados.dados[i].indiceCargo]) == "undefined") {
                cargos.push($scope.dadosResultados.dados[i].indiceCargo);
            }
            unique[$scope.dadosResultados.dados[i].indiceCargo] = 0;

            $scope.dadosResultados.dados[i].Slug = (projetoTools.retira_acentos($scope.dadosResultados.dados[i].Candidato.toLowerCase())).split(' ')[0].split('-')[0];
        }

        //particiona os dados sendo um slot para cada cargo na array 
        for (var cargo in cargos) {
            var tempCargo = $filter('filter')($scope.dadosResultados.dados, { indiceCargo: cargos[cargo] }, true); //, idCandidato: '!' + 0 }, true);
            var totalValidos = 0;
            var arrDadosCandidato = [];
            for (var candidato in tempCargo) {
                if (tempCargo[candidato].votos > 0) {
                    totalValidos++;
                }
            }
            for (var candidato in tempCargo) {
                if (totalValidos > 0 && tempCargo[candidato].votos > 0) {
                    tempCargo[candidato].indiceCargo = angular.copy(cargos[cargo]);
                    arrDadosCandidato.push(tempCargo[candidato]);
                }
            }
            $scope.dadosCargo.push(arrDadosCandidato);
        }

    };

    $scope.getGraus = function (percentual) {
        return (360 * percentual) / 100;
    };

    $scope.ok = function () {
        var bolClose = true;
        if (bolClose) {
            $modalInstance.close();
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $timeout(function () {
        _self.init();
    }, 100);

} ]);
