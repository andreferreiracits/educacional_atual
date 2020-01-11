//"use strict";
angular.module('Etapa')
.directive('materialTurmaParceira', ['$http', function ($http) {
    return {
        restrict: 'EA',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/material-turma-parceira.html',
        scope: {
            turmaParceira : "="
        },
        link: function (scope, element, attrs) {
        },
        controller: 'materialParceiraCtrl'
    }
}]);

angular.module('Etapa')
.controller('materialParceiraCtrl',
['$scope', '$filter', '$http', function ($scope, $timeout, $http) {
    
    $scope.envio = {};
    if ($scope.turmaParceira) if ($scope.turmaParceira.LinkPostEnvio) if ($scope.turmaParceira.LinkPostEnvio.FormularioParticipanteEnvio) {
        $scope.envio = $scope.turmaParceira.LinkPostEnvio.FormularioParticipanteEnvio;
    }

} ]);
    

