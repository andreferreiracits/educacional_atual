"use strict";

angular.module("resultado")
.controller('EraUmaVezPrincesa2015Ctrl', ["$stateParams", "$http", "$scope", "$timeout", "$state", "galeria", function ($stateParams, $http, $scope, $timeout, $state, galeria) {
    var self = this;
    $scope.$emit("loadClassMain", "galeria-resultados");

    $scope.conto =
    {
        Nome: "",
        Ordem: 0,
        SlugImagem: "",
        Pagina: 1
    };

    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }
            if ($scope.resultado.JsonConfig.Contos) {
                if ($scope.resultado.JsonConfig.Contos.princesa) {
                    $scope.conto.SlugImagem = "princesa";
                    $scope.conto.Nome = $scope.resultado.JsonConfig.Contos.princesa.Nome;
                    $scope.conto.Ordem = $scope.resultado.JsonConfig.Contos.princesa.Ordem;
                }
            }
        }
    }

} ]);


angular.module("resultado")
.controller('EraUmaVezJoaoMaria2015Ctrl', ["$stateParams", "$http", "$scope", "$timeout", "galeria", function ($stateParams, $http, $scope, $timeout, galeria) {
    var self = this;
    $scope.$emit("loadClassMain", "galeria-resultados");

    $scope.conto =
    {
        Nome: "",
        Ordem: 0,
        SlugImagem: "",
        Pagina: 1
    };

    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }
            if ($scope.resultado.JsonConfig.Contos) {
                if ($scope.resultado.JsonConfig.Contos.joaoemaria) {
                    $scope.conto.SlugImagem = "joaoemaria";
                    $scope.conto.Nome = $scope.resultado.JsonConfig.Contos.joaoemaria.Nome;
                    $scope.conto.Ordem = $scope.resultado.JsonConfig.Contos.joaoemaria.Ordem;
                }
            }
        }
    }

} ]);


angular.module("resultado")
.controller('EraUmaVezBrancaDeNeve2015Ctrl', ["$stateParams", "$http", "$scope", "$timeout", "$filter", "$location", "$state", '$modal', function ($stateParams, $http, $scope, $timeout, $filter, $location, $state, $modal) {
    var self = this;
    $scope.$emit("loadClassMain", "galeria-resultados");

    $scope.conto =
    {
        Nome: "",
        Ordem: 0,
        SlugImagem: "",
        Pagina: 1
    };

    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }
            if ($scope.resultado.JsonConfig.Contos) {
                if ($scope.resultado.JsonConfig.Contos.brancadeneve) {
                    $scope.conto.SlugImagem = "brancadeneve";
                    $scope.conto.Nome = $scope.resultado.JsonConfig.Contos.brancadeneve.Nome;
                    $scope.conto.Ordem = $scope.resultado.JsonConfig.Contos.brancadeneve.Ordem;
                }
            }
        }
    }
} ]);


angular.module("resultado")
.controller('EraUmaVezChapeuzinho2015Ctrl', ["$http", "$scope", function ($http, $scope) {
    var self = this;
    $scope.$emit("loadClassMain", "galeria-resultados");

    $scope.conto =
    {
        Nome: "",
        Ordem: 0,
        SlugImagem: "",
        Pagina: 1
    };

    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }
            if ($scope.resultado.JsonConfig.Contos) {
                if ($scope.resultado.JsonConfig.Contos.joaoemaria) {
                    $scope.conto.SlugImagem = "chapeuzinho";
                    $scope.conto.Nome = $scope.resultado.JsonConfig.Contos.chapeuzinho.Nome;
                    $scope.conto.Ordem = $scope.resultado.JsonConfig.Contos.chapeuzinho.Ordem;
                }
            }
        }
    }
    
} ]);

angular.module("resultado")
.controller('EraUmaVezCigarraFormiga2015Ctrl', ["$http", "$scope", function ($http, $scope) {
    var self = this;
    $scope.$emit("loadClassMain", "galeria-resultados");

    $scope.conto =
    {
        Nome: "",
        Ordem: 0,
        SlugImagem: "",
        Pagina: 1
    };

    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }
            if ($scope.resultado.JsonConfig.Contos) {
                if ($scope.resultado.JsonConfig.Contos.cigarra) {
                    $scope.conto.SlugImagem = "cigarra";
                    $scope.conto.Nome = $scope.resultado.JsonConfig.Contos.cigarra.Nome;
                    $scope.conto.Ordem = $scope.resultado.JsonConfig.Contos.cigarra.Ordem;
                }
            }
        }
    }
} ]);