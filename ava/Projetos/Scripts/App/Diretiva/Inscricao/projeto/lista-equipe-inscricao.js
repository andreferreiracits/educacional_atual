"use strict"
angular.module('Inscricao.mista').directive('listaEquipeInscricao', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/projeto/lista-equipe-inscricao.html',
        scope: {
            edicao: "=edicao",
            listaEquipes: "=listaEquipes",
            objEquipe: "=objEquipe",
            objEtapa: "=objEtapa",
            checkEquipe: "=checkEquipe",
            objParceiros: "=objParceiros",
            parceirosEnvioSelected: "=parceirosEnvioSelected",
            bloqueiaAllEquipe: "=bloqueiaAllEquipe",
            acesso: "=acesso"
        },
        controller: ['$scope', '$http', '$log', '$filter', '$timeout', function ($scope, $http, $log, $filter, $timeout) {
            var self = this;
            var idEdicaoPrincipal = 0; //ID principal, pois projetos utiliza edicao.Id, e clubes utiliza objEtapa.Edicao.Id (desafio = edicao)
            var idTipoProjeto = 0;


            $scope.auxListaEquipes = [];
            $scope.maxEnvioEquipe = 0;


            if ($scope.edicao && $scope.edicao.Projeto && $scope.edicao.Projeto.Tipo) {
                if ($scope.edicao.Projeto.Tipo.Id == 1) {
                    idEdicaoPrincipal = $scope.edicao.Id;
                    idTipoProjeto = 1;
                } else if ($scope.edicao.Projeto.Tipo.Id == 2) {
                    idEdicaoPrincipal = $scope.objEtapa.Edicao.Id;
                    idTipoProjeto = 2;
                }
            }

            if (idEdicaoPrincipal == 0 && $scope.objEtapa) {
                idEdicaoPrincipal = $scope.objEtapa.Edicao.Id;
            }


            if (idTipoProjeto == 1) {
                if ($scope.edicao) if ($scope.edicao.InscricoesTipos) {
                    var objTipoInscricaoEtapa = $filter('filter')($scope.edicao.InscricoesTipos, { Id: 3 }, true);

                    if (objTipoInscricaoEtapa.length == 1) {
                        if (objTipoInscricaoEtapa[0].MaxEnvio > 0) {
                            $scope.maxEnvioEquipe = objTipoInscricaoEtapa[0].MaxEnvio;
                        }
                    }
                }
            } else {
                if ($scope.objEtapa) if ($scope.objEtapa.Edicao) if ($scope.objEtapa.Edicao.InscricoesTipos) {
                    var objTipoInscricaoEtapa = $filter('filter')($scope.objEtapa.Edicao.InscricoesTipos, { Id: 3 }, true);

                    //console.log(objTipoInscricaoEtapa);
                    if (objTipoInscricaoEtapa.length == 1) {
                        if (objTipoInscricaoEtapa[0].MaxEnvio > 0) {
                            $scope.maxEnvioEquipe = objTipoInscricaoEtapa[0].MaxEnvio;
                        }
                    }
                }
            }


            if (!($scope.acesso instanceof Object))
                $scope.acesso = { primeiro: true, openListaEquipe: true, openListaTurma: true };
            if ($scope.acesso.primeiro) {
                $scope.auxListaEquipes = $scope.listaEquipes;
            } else {
                $scope.acesso.primeiro = false;
                if (idEdicaoPrincipal > 0) {
                    $http.get('/AVA/Projetos/Servico/buscarEquipesNovoMaterial/?idEdicao=' + idEdicaoPrincipal)
		            .success(function (data) {
		                if (data.listaEquipes != null) {
		                    if (data.listaEquipes.length > 0) {
		                        $scope.auxListaEquipes = data.listaEquipes;
		                        //$scope.listaEquipes = data.listaEquipes;
		                        $scope.acesso.primeiro = true;
		                        $scope.$emit("changeListaEquipe", data.listaEquipes);
		                    }
		                }
		                angular.element("input[name=radio_equipe]").prop("checked", false);
		            }).error(function () {
		                alert("Erro ao buscar lista de equipes para envio.");
		            });
                }
            }

            $scope.selectEquipeInscricao = function (obj) {
                $scope.objEquipe = obj;
            };

            $scope.$on("resetRadioEquipe", function (event) {
                angular.element("input[name=radio_equipe]").prop("checked", false);
            });


            // Adiciona Professor Parceiro
            this.adicionarParceiro = function () {
                if (self.professorParceiro == undefined) {
                    $timeout(self.adicionarParceiro, 500);
                }
                else {
                    // inserindo mesmo cara 2 vezes
                    var result = $filter('filter')($scope.parceirosEnvioSelected, { Id: self.professorParceiro.Id });
                    if (result.length == 0) {
                        $scope.parceirosEnvioSelected.push({ "Id": "" + self.professorParceiro.Id + "", "Nome": "" + self.professorParceiro.Nome + "" });
                    }
                    $timeout(function () {
                        jQuery("#professorParceiro_value").val("");
                        jQuery("#professorParceiro_value").focus();
                        self.professorParceiro = undefined;
                    }, 100);
                }
            };

            // Remove Professor Parceiro
            this.removerParceiro = function (index) {
                $scope.parceirosEnvioSelected.splice(index, 1);
            };

            //Testa limite envio
            this.checkMaxEnvioEquipe = function (obj) {
                var bolMaxEnvio = false;

                if (obj) if (obj.Inscricao) if (obj.Inscricao.InscricaoTipo) {
                    var idInscricaoTipo = obj.Inscricao.InscricaoTipo.Id;

                    var objConfigInscricao = [];

                    if (idTipoProjeto == 1) {
                        objConfigInscricao = $filter('filter')($scope.edicao.InscricoesTipos, { Id: idInscricaoTipo }, true);
                    } else if (idTipoProjeto == 2) {
                        objConfigInscricao = $filter('filter')($scope.objEtapa.Edicao.InscricoesTipos, { Id: idInscricaoTipo }, true);
                    }

                    if (objConfigInscricao.length == 1) {
                        if (objConfigInscricao[0].MaxEnvio > 0) {
                            if (obj.TotalEnvios >= objConfigInscricao[0].MaxEnvio) {
                                bolMaxEnvio = true;
                            }
                        }
                    }
                }

                return bolMaxEnvio;
            };
            
        } ],
        controllerAs: "listaEquipeInscricaoCtrl"
    };
});
