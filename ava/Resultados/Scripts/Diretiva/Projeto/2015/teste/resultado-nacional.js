//var providers = {};
//
//angular.module('resultado', [], function ($controllerProvider, $compileProvider, $provide) {
//    providers = {
//        $controllerProvider: $controllerProvider,
//        $compileProvider: $compileProvider,
//        $provide: $provide
//    };
//});

angular.module('resultado').directive('resultadoNacional', function () {
    return {
        restrict: 'E',
        scope: {
            edicao: "=objEdicao",
            defaultConfig : "=defaultConfig"

        },
        templateUrl: function () {
            return '/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/resultado-nacional.html';
        }
    };
});



// Bootstrap Foo
//angular.bootstrap($('body'), ['resultadoNac']);


//var queueLen = angular.module('resultadoNac')._invokeQueue.length;
//console.log('tam = ' + queueLen);
//
//
//angular.module('resultadoNac')
// .controller('resultado_etapa1',
//["$http", "$scope", "$compile", "$timeout", "$filter", function ($http, $scope, $compile, $timeout, $filter) {
//
//
//} ]);
//
//// Register the controls/directives/services we just loaded
//var queue = angular.module('resultadoNac')._invokeQueue;
//for (var i = queueLen; i < queue.length; i++) {
//    var call = queue[i];
//    // call is in the form [providerName, providerFunc, providerArguments]
//    var provider = providers[call[0]];
//    if (provider) {
//        // e.g. $controllerProvider.register("Ctrl", function() { ... })
//        provider[call[1]].apply(provider, call[2]);
//    }
//}
//
//// compile the new element
//$('body').injector().invoke(function ($compile, $rootScope) {
//    $compile($('resultado_etapa1'))($rootScope);
//    $rootScope.$apply();
//});

angular.module('resultado')
    .controller('res1',
    ["$http", "$scope", "$compile", "$timeout", "$filter", function ($http, $scope, $compile, $timeout, $filter) {

        $scope.teste2 = function () {
            alert('ESTOU AQUI NO OUTRO PROJETO');
        };

} ]);