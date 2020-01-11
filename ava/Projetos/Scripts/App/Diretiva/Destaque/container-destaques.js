"use strict"
angular.module('Destaques').directive('containerDestaques', function () {
    return {
        restrict: 'E',
        scope: {
            idContainer: "=idContainer",
            strErro: "=mensagemErro"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Destaque/container-destaques.html'
    };
});
var globalPopUpArray = {};
function abrirMeuPops(idc,idx) {
    window.open(globalPopUpArray[idc][idx][0], globalPopUpArray[idc][idx][1], globalPopUpArray[idc][idx][2]);
    return false;
}
angular.module('Destaques').controller('controleDestaques', ['$http', '$scope', '$element', '$attrs', '$compile', '$timeout', '$filter', '$sce', function ($http, $scope, $element, $attrs, $compile, $timeout, $filter, $sce) {
    $scope.loadInProgress = true;
    $scope.bolError = false;
    $scope.mensagemErro = "Não foram encontrados conteúdos nessa seção";
    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
    $scope.initController = function () {
        if (parseInt($scope.idContainer) > 0) {
            globalPopUpArray[$scope.idContainer] = new Array();
            var path = "/Recursos/Destaques/ajaxDestaques.asp";
            var parametros = {
                idContainer: $scope.idContainer
            };
            if ($scope.strErro != "")
                $scope.mensagemErro = $scope.strErro;
            $http({
                url: path,
                method: "GET",
                params: parametros
            }).success(function (data) {
                if (data) if (data != "") {
                    var Pattern = new Array();
                    var lastIndex = 0;
                    var temp = data;
                    Pattern.push(new RegExp(/\'javascript\:window\.open\(([^\(]+)\)([^\']+)\'/gi));
                    var match;
                    for (var i = 0; i < Pattern.length; i++) {
                        while (match = Pattern[i].exec(temp.substr(lastIndex))) {
                            var tmp = match[1].toString().replace(/\"/g, "").replace(/\'/g, "").split(",");
                            var aux = "";
                            var virg = "";
                            for (var vvi = 2; vvi < tmp.length; vvi++) {
                                aux = aux + virg + tmp[vvi];
                                virg = ",";
                            }
                            var final = new Array(tmp[0], tmp[1], aux);
                            globalPopUpArray[$scope.idContainer].push(final);
                            temp = temp.replace(match[0], "'javascript:abrirMeuPops(" + $scope.idContainer + "," + (globalPopUpArray[$scope.idContainer].length - 1) + ");void(0);'");
                        }
                    }
                    Pattern = new Array();
                    lastIndex = 0;
                    Pattern.push(new RegExp(/\'javascript\:OpenWindow\(([^\(]+)\)([^\']+)\'/gi));
                    for (var i = 0; i < Pattern.length; i++) {
                        while (match = Pattern[i].exec(temp.substr(lastIndex))) {
                            var tmp = match[1].toString().replace(/\"/g, "").replace(/\'/g, "").split(",");
                            var aux = "width=" + tmp[2] + ",height=" + tmp[3];
                            var final = new Array(tmp[1], tmp[0], aux);
                            globalPopUpArray[$scope.idContainer].push(final);
                            temp = temp.replace(match[0], "'javascript:abrirMeuPops(" + $scope.idContainer + "," + (globalPopUpArray[$scope.idContainer].length - 1) + ");void(0);'");
                        }
                    }
                    $scope.content = $sce.trustAsHtml(temp);
                    $scope.loadInProgress = false;
                }
                if ($scope.loadInProgress) {
                    $scope.content = $scope.mensagemErro;
                    $scope.loadInProgress = false;
                }
            }).error(function () {
                $scope.bolError = true;
                $scope.content = "";
                $scope.loadInProgress = false;
            });
        }
    };
    $scope.controleInicio = undefined;
    $scope.tryInit = function () {
        $scope.controleInicio = setTimeout(function () {
            if (parseInt($scope.idContainer) > 0) {
                clearTimeout($scope.controleInicio);
                $scope.initController();
            }
            else {
                $scope.tryInit($scope);
            }
        }, 1000);
    };
    $timeout(function () {
        $scope.tryInit();
    });
} ]);