angular.module('Etapa')
.directive('boxTemParceria', function () {
    return {
        restrict: 'EA',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/box-tem-parceria.html',
        scope: {
            
        },
        controller:
        ['$http', '$scope', '$timeout', '$filter', function ($http, $scope, $timeout, $filter) {
         
            
        }],
        controllerAs: "parceriaCtrl"
    };
});
