angular.module('Etapa').directive('etapaGrupoFormulario', ['$http', function ($http) {
    return {
        restrict: 'E',
        scope: {
            etapaConfig: "=etapaConfig",
            idGrupoForm: "=idGrupoForm",
            idFormulario: "=idFormulario",
            idFormularioResposta: "=idFormularioResposta",
            turmap : "=turmap"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/etapa-grupo-formulario.html',
        link: function (scope, element, attrs) {
            //alert('ESCOPO = ' + scope.idGrupoForm);
        },
        controller: ['$scope','$filter','$timeout', function ($scope, $filter, $timeout) {

            $scope.convCatToClas = function (nomeCategoria) {

                nomeCategoria = nomeCategoria.toLowerCase();
                nomeCategoria = nomeCategoria.replace(/ç/g, 'c');
                nomeCategoria = nomeCategoria.replace(/ã|á|à|â|ä|â/g, 'a');
                nomeCategoria = nomeCategoria.replace(/é|ê|è|ë/g, 'e')
                nomeCategoria = nomeCategoria.replace(/í|ì|î|ï/g, 'i');
                nomeCategoria = nomeCategoria.replace(/õ|ô|ó|ò|ö/g, 'o');
                nomeCategoria = nomeCategoria.replace(/û|ú|ù|ü/g, 'u');
                nomeCategoria = nomeCategoria.replace(/[^\w\s]/gi, '');
                nomeCategoria = nomeCategoria.replace(/\s+/g, "-");
                return nomeCategoria;

            };

            $scope.formulariosGrupo = {};

            this.init = function () {
                //Verifica se possui grupos de formularios para esta Etapa
                if ($scope.etapaConfig.EtapaGrupos != null) {
                    var objGrupoForm = $filter('filter')($scope.etapaConfig.EtapaGrupos, { Id: $scope.idGrupoForm });

                    if (objGrupoForm.length > 0) {
                        $scope.formulariosGrupo = objGrupoForm[0];
                        scope = $scope;
                    }
                }
            };

            $scope.enviarFormulario = function (idForm) {
                $scope.idFormulario = idForm;
                //$scope.$parent.FormEnvio.idFormulario = idForm;
            };

            var that = this;
            $timeout(function () {
                that.init();
            }, 10);

        }],
        controllerAs: "etapaGrupoFormularioCtrl"
    };
} ]);

