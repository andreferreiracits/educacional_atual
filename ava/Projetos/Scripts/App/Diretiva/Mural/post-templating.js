angular.module('Mural').directive('postTemplating', function () {
    return {
        restrict: 'E',
        scope: {
            edicao: "=edicao",
            etapa: "=etapa",
            envio: "=envio",
            usuario: "=usuario",
            template: "@template",
            navigation: "@navigation",
        },
        template: '<ng-include src="getTemplateUrl()"/>',
        controller: ['$http', '$scope', '$timeout', '$filter', function ($http, $scope, $timeout, $filter) {
            var controller = this;
            $scope.classe = "teste";
            $scope.getTemplateUrl = function () {
                if($scope.navigation==1){
                    if ($scope.template) if ($scope.template != "") if ($scope.template.indexOf("/") != -1) {
                        return $scope.template.replace(".html","-nav.html");
                    }
                    return '/AVA/Projetos/Scripts/App/Diretiva/Mural/post-templating-nav.html';
                }
                else{
                    if ($scope.template) if ($scope.template != "") if ($scope.template.indexOf("/") != -1) {
                        return $scope.template;
                    }
                }
                return '/AVA/Projetos/Scripts/App/Diretiva/Mural/post-templating.html';
            };
        }], controllerAs: "controleTemplating"
    };
});
