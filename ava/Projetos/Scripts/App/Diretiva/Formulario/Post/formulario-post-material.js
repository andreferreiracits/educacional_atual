"use strict"
angular.module('formulario').directive('formularioPostMaterial', ['$timeout', 'constantes', function ($templateCache, $compile) {
    return {
        restrict: 'AEC',
        replace: false,
        scope: {
            idFormulario: "=idFormulario",
            idFormularioResposta: "=idFormularioResposta",
            bolClicado: "=bolClicado",
            readOnly: "=readOnly",
            autoControle: "=autoControle",
            showSaveButton: "=showSaveButton",
            idInscricao: "=idInscricao",
            idEdicao: "=idEdicao",
            showNavButton: "=showNavButton",
            objAbaSelecionada: "=objAbaSelecionada",
            defaultConfig: "=defaultConfig",
            mensagemRapida: "=mensagemRapida"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Formulario/Post/formulario-post-index.html',
        link: function (scope, elem, attr, ctrl) {
            scope.startLoading = function () {
                scope.loadInProgress = true;
            };
            scope.stopLoading = function () {
                scope.loadInProgress = false;
                scope.safeApply();
            };
            scope.verificaLoading = function () {
                return scope.loadInProgress;
            };

            scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            scope.isGrupoImagens = function (oGrupo) {
                var bolSomenteImagens = true;

                angular.forEach(oGrupo.Campos, function (value, key) {
                    if (value) if (value.FormularioCampoTipo) if (value.FormularioCampoTipo.Id != 6) {
                        bolSomenteImagens = false;
                    }
                });
                return bolSomenteImagens;
            };

            scope.arrayLabelGrupoCampo = [];
            scope.verificaFirstTitulo = function (indice) {
                return scope.arrayLabelGrupoCampo[indice];
            };
            scope.setFirstTitulo = function (indice, valor) {
                scope.arrayLabelGrupoCampo[indice] = valor;
            };
        },
        controller: ['$http', '$scope', '$timeout', '$location', '$filter', '$modal', 'constantes', 'projetoTools', function ($http, $scope, $timeout, $location, $filter, $modal, constantes, projetoTools) {
            var self = this;
            this.loadInProgress = true;
            this.bolHabilitadoModoEdicaoEnquete = false;
            this.loadingConteudoEnquete = false;

            $scope.Inscricao = undefined;

            self.getInscricao = function (idInscricao) {
                if (angular.isObject(constantes.Usuario)) if (angular.isArray(constantes.Usuario.TurmasInscritas)) {
                    var tmp = $filter('filter')(constantes.Usuario.TurmasInscritas, { Inscricao: { Id: idInscricao} }, false);
                    if (angular.isArray(tmp)) if (tmp.length == 1) if (angular.isObject(tmp[0])) if (angular.isObject(tmp[0].Inscricao)) {
                        return tmp[0].Inscricao;
                    }
                }
                if (angular.isObject(constantes.Usuario)) if (angular.isArray(constantes.Usuario.EquipesInscritas)) {
                    var tmp = $filter('filter')(constantes.Usuario.EquipesInscritas, { Inscricao: { Id: idInscricao} }, false);
                    if (angular.isArray(tmp)) if (tmp.length == 1) if (angular.isObject(tmp[0])) if (angular.isObject(tmp[0].Inscricao)) {
                        return tmp[0].Inscricao;
                    }
                }
                return undefined;
            }

            self.loadInscricao = function () {
                if (!$scope.Inscricao && $scope.idInscricao > 0) {
                    $scope.Inscricao = self.getInscricao($scope.idInscricao);
                }
            };

            self.getHabilitadoModoEdicaoEnquete = function () {
                if (projetoTools.getInt($scope.mensagemRapida.EtapaInscricaoEnvio.Etapa.Id) > 0 && projetoTools.getInt($scope.mensagemRapida.EtapaInscricaoEnvio.Etapa.TipoEtapaEleicao) == 2 && document.location.href.toLowerCase().indexOf("/ava/projetos/envio/visualizar") != -1 && document.location.href.toLowerCase().indexOf("/ava/projetos/2") == -1) {
                    var idEtapaMaterial = projetoTools.getInt($scope.mensagemRapida.EtapaInscricaoEnvio.Etapa.Id);
                    var etapaMaterial = $filter('filter')(constantes.Edicao.Etapas, { Id: idEtapaMaterial, TipoEtapaEleicao: 2 }, true);
                    if (projetoTools.hasArrayElems(etapaMaterial)) {
                        return true;
                    }
                }
                return false;
            };


            self.atualizarConteudoEnquete = function (objFRC) {
                if (!self.loadingConteudoEnquete) {
                    if (self.bolHabilitadoModoEdicaoEnquete) if (objFRC) if (objFRC instanceof Object) if (objFRC.Id) if (objFRC.Id > 0) {
                        self.loadingConteudoEnquete = true;
                        $http.post("/AVA/Projetos/Etapa/AtualizarConteudoEnquete",
                        {
                            idEtapa: $scope.mensagemRapida.EtapaInscricaoEnvio.Etapa.Id,
                            idFormularioRespostaCampo: objFRC.Id,
                            bolConteudoEnquete: objFRC.BolConteudoEnquete
                        }).success(function (data) {
                            //executado o salvamento
                        }).error(function (data) {
                            objFRC.BolConteudoEnquete = !objFRC.BolConteudoEnquete;
                            alert("Ocorreu um erro ao tentar esta operação. Tente novamente atualizando a página!");
                        }).then(function (data) {
                            self.loadingConteudoEnquete = false;
                        });
                    }
                }
            };

            self.init = function () {
                var initApi = true;
                if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
                    initApi = false;
                }
                if (initApi) {
                    projetoTools.extendFunctions(self);
                    projetoTools.extendFunctions($scope);
                }
                self.loadInscricao();
                self.bolHabilitadoModoEdicaoEnquete = self.getHabilitadoModoEdicaoEnquete();
                $scope.safeApply();
            };

            $scope.$watch("bolClicado", function (newVal, oldVal) {
                //evento propagado proveniente do controle de grupos de formulário superior
                //self.init();
            }, true);

            $timeout(function () { self.init() }, 150);
        } ],
        controllerAs: 'ctrlFormPostMaterial'
    };
} ]);
