"use strict"
angular.module('Etapa').directive('listaEtapaDetalheEleicoes', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/lista-etapa-detalhe-eleicoes.html',
        scope: {
            objParceria: "=objParceria",
            objEtapa: "=objEtapa",
            objEdicao: "=objEdicao",
            usuario: "=usuario",
            defaultConfig: "=defaultConfig"
        },
        link: function (scope, el, attr) {
        },
        controller: ['$http', '$scope', '$timeout', '$filter', '$modal', 'constantes', 'projetoTools', function ($http, $scope, $timeout, $filter, $modal, constantes, projetoTools) {
            var self = this;
            $scope.existeParceria = false;
            $scope.objDetalhe = {
                totalInscrito: 0,
                totalEnviado: 0
            };
            $scope.portalEnvio = {};
            $scope.currentIndex = 0;
            if ($scope.objParceria) if ($scope.objParceria != null) {
                angular.forEach($scope.objParceria.Turmas, function (valor, chave) {
                    if (valor.Parceira && valor.Parceira != null) {
                        $scope.existeParceria = true;
                    }
                });
            }
            $scope.parceiraSelected = null;
            $scope.setFirstTurmaParceira = function () {
                $scope.comboTurma = $scope.objParceria.Turmas[0]
            };
            $scope.changeTurmaParceira = function () {
                $scope.parceiraSelected = null;
                $timeout(function () {
                    $scope.parceiraSelected = $scope.comboTurma;
                }, 500);
            };

            //PARA ELEIÇÕES
            $scope.edicaoConfig = undefined;
            $scope.objUsuario = undefined;
            if (angular.isObject(constantes.edicaoConfig))
                $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);
            if (angular.isObject(constantes.Usuario))
                $scope.objUsuario = angular.copy(constantes.Usuario);
            /*
            if(angular.isObject($scope.objEdicao) && angular.isObject(constantes.Edicao))
            $scope.objEdicao = angular.copy(constantes.Edicao);
            
            if(angular.isObject($scope.defaultConfig) && angular.isObject(constantes.DefaultConfig))
            $scope.defaultConfig = angular.copy(constantes.DefaultConfig);
            */
            $scope.bolEducador = false;
            $scope.bolAdministrador = false;
            $scope.bolAluno = false;
            $scope.bolPai = false;
            $scope.bolEleicoes = false;
            $scope.bolVotou = false;
            $scope.TipoEleicao = "";
            $scope.Partido = "";
            $scope.Comite = "";
            $scope.TipoComite = "Candidato";
            $scope.bolAlunoInscritoEleicoes = false;
            $scope.bolEducadorInscritoEleicoes = false;
            $scope.bolPaiInscritoEleicoes = false;
            $scope.situacaoEtapaFinal = 0;
            $scope.etapaFinal = {};
            $scope.objEtapas = [];

            $scope.acaoEleicao = function (p_etapa) {
                if (p_etapa.TipoEtapaEleicao == 5 && $scope.situacaoEtapaFinal == 2) {
                    $scope.AbreUrna(p_etapa);
                }
                else if ($scope.bolEducadorInscritoEleicoes || $scope.situacaoEtapaFinal >= 2) {
                    $scope.openModalEducador(p_etapa);
                }
            };

            $scope.AbreUrna = function (etapa) {
                var linkTarefa = "";
                if (etapa) if (etapa.LinkTarefa) if (etapa.LinkTarefa != "") if (etapa.LinkTarefa.toLowerCase().indexOf("eleicoes/urna") != -1) {
                    linkTarefa = etapa.LinkTarefa;
                }
                if (!etapa) if (projetoTools.hasArrayElems($scope.objEtapas)) {
                    var temp = $filter('filter')($scope.objEtapas, { TipoEtapaEleicao: { Id: 5} }, false);
                    if (projetoTools.hasArrayElems(temp)) if (temp[0].LinkTarefa != "") {
                        linkTarefa = temp[0].LinkTarefa;
                    }
                }
                if (linkTarefa != "") {
                    var modalInstance = $modal.open({
                        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-votacao-urna.html',
                        controller: 'ctrlModalVotacao',
                        resolve: {
                            linkTarefa: function () {
                                return linkTarefa;
                            }
                        },
                        backdrop: 'static'
                    });

                    modalInstance.result.then(function (parametro) {
                        //
                    }, function () {
                        //
                    });

                    modalInstance.opened.then(function (parametro) {
                        //
                    }, function () {
                        //
                    });
                }
                else {
                    console.log("Endereço da etapa não configurado.");
                }
            };

            $scope.openModalEducador = function (p_etapa) {
                //var p_etapa = undefined; //angular.copy($scope.objEtapas[0]);
                var categorias = undefined;
                if (!p_etapa) {
                    angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                        if (self.situacaoEtapa(curEtapa) == 2 && [1, 3].indexOf(curEtapa.TipoEtapaEleicao) != -1) {
                            p_etapa = angular.copy(curEtapa);
                        }
                    });
                }
                if (projetoTools.hasArrayElems($scope.edicaoConfig.GruposCategorias))
                    if (projetoTools.hasArrayElems($scope.edicaoConfig.GruposCategorias[0].Categorias)) {
                        categorias = angular.copy($scope.edicaoConfig.GruposCategorias[0].Categorias);
                    }
                var modalInstance = $modal.open({
                    templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-enquete-educador.html',
                    controller: 'ctrlModalEnquete',
                    resolve: {
                        defaultConfig: function () {
                            return $scope.defaultConfig;
                        },
                        edicaoConfig: function () {
                            return $scope.edicaoConfig;
                        },
                        etapa: function () {
                            return p_etapa;
                        },
                        objUsuario: function () {
                            return $scope.objUsuario
                        },
                        objEdicao: function () {
                            return $scope.objEdicao;
                        },
                        enquetes: function () {
                            return categorias;
                        },
                        alternativa: function () {
                            return 0;
                        }
                    },
                    backdrop: 'static'
                });

                modalInstance.result.then(function (parametro) {
                    //

                }, function () {
                    //
                });
                modalInstance.opened.then(function (parametro) {
                    //
                }, function () {
                    //
                });
            };


            this.loadStatusEleicoes = function () {
                var tmpEleicoes = $filter('filter')($scope.objEdicao.Etapas, { TipoEtapaEleicao: '!' + 0 }, false);
                if (angular.isArray(tmpEleicoes)) if (tmpEleicoes.length > 0) {
                    if (projetoTools.ArrayIntersect([1, 2, 3, 4, 5, 6], tmpEleicoes.map(function () { return arguments[0].TipoEtapaEleicao })).length > 0) {
                        $scope.bolEleicoes = true;
                    }
                }

                if ($scope.bolEleicoes) {
                    $scope.TipoEleicao = "Candidato";
                    for (var categoria in constantes.EdicaoConfig.GruposCategorias[0].Categorias) {
                        var slug = IniciaisMaiusculas(retira_acentos(constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Descricao).replace(/-/g, " ")).replace(/\s/g, "");
                        constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Slug = slug;
                        if (constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias) if (constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias instanceof Array) if (constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.length > 0) {
                            $scope.TipoEleicao = "Partido";
                            for (var categoria in constantes.EdicaoConfig.GruposCategorias[0].Categorias.Subcategorias) {
                                var subSlug = IniciaisMaiusculas(retira_acentos(constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.Descricao).replace(/-/g, " ")).replace(/\s/g, "");
                                constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.Slug = subSlug;
                            }
                        }
                        if (projetoTools.verificaPerfil($scope.usuario, "Aluno")) {
                            var turmas_inscritas = $filter('filter')(constantes.Usuario.TurmasInscritas, { Inscricao: { Id: '!' + 0, Categorias: [{ Id: '!' + 0}]} }, true);
                            //console.log(turmas_inscritas);
                            if (turmas_inscritas) if (turmas_inscritas instanceof Array) if (turmas_inscritas.length >= 1) {
                                var idCategoriaInscricaoAluno = turmas_inscritas[0].Inscricao.Categorias[0].Id;
                                var idxCategoria = projetoTools.indexOfId(constantes.EdicaoConfig.GruposCategorias[0].Categorias, idCategoriaInscricaoAluno);
                                $scope.Partido = constantes.EdicaoConfig.GruposCategorias[0].Categorias[idxCategoria].Slug;
                                if ($scope.bolAluno) {
                                    $scope.bolAlunoInscritoEleicoes = true;
                                }
                                if ($scope.bolPai) {
                                    $scope.bolPaiInscritoEleicoes = true;
                                }
                                if ($scope.bolEducador || $scope.bolAdministrador) {
                                    $scope.bolEducadorInscritoEleicoes = true;
                                }
                            }
                        }
                    }
                }
            };

            this.parceiraPossuiEnvio = function (turmaParceira) {
                if (turmaParceira) {
                    if (turmaParceira.Parceira) {
                        if (turmaParceira.Parceira.LinkPostEnvio) {
                            if (turmaParceira.Parceira.LinkPostEnvio.LinkPost != null && turmaParceira.Parceira.LinkPostEnvio.FormularioParticipanteEnvio != null) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            };

            this.init = function () {
                var initApi = true;
                if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
                    initApi = false;
                }
                if (initApi) {
                    projetoTools.extendFunctions(self);
                    projetoTools.extendFunctions($scope);
                }

                if (angular.isDefined($scope.objEdicao) && angular.isObject($scope.objEdicao) && angular.isArray($scope.objEdicao.Etapas) && projetoTools.hasArrayElems($scope.objEdicao.Etapas)) {
                    $scope.objEtapas = angular.copy($scope.objEdicao.Etapas);
                }
                if (typeof $scope.objEtapa.DataResultado != 'object') {
                    $scope.objEtapa.DataInicio = new Date(parseInt($scope.objEtapa.DataInicio.substr(6), 10));
                    $scope.objEtapa.DataFim = new Date(parseInt($scope.objEtapa.DataFim.substr(6), 10));
                    $scope.objEtapa.DataResultado = new Date(parseInt($scope.objEtapa.DataResultado.substr(6), 10));
                    /*
                    $scope.objEtapa.DataResultado = eval("new " + $scope.objEtapa.DataResultado.replace(/\//ig, ""));
                    $scope.objEtapa.DataFim = eval("new " + $scope.objEtapa.DataFim.replace(/\//ig, ""));
                    $scope.objEtapa.DataInicio = eval("new " + $scope.objEtapa.DataInicio.replace(/\//ig, ""));
                    */
                }

                $scope.bolEducador = projetoTools.verificaPerfil($scope.objUsuario, 'Educador');
                $scope.bolAdministrador = projetoTools.verificaPerfil($scope.objUsuario, 'Administrador');
                $scope.bolAluno = projetoTools.verificaPerfil($scope.objUsuario, 'Aluno');
                $scope.bolPai = projetoTools.verificaPerfil($scope.objUsuario, 'Responsável');

                self.loadStatusEleicoes();

                if ($scope.objEtapas != undefined) {
                    angular.forEach($scope.objEtapas, function (valor, chave) {
                        $scope.objEtapas[chave].DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                        $scope.objEtapas[chave].DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                        $scope.objEtapas[chave].DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                    });
                    $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEtapas));
                    $scope.situacaoEtapaFinal = self.situacaoEtapa($scope.etapaFinal);
                }

                $http({
                    cache: false,
                    params: {
                        idEtapa: $scope.objEtapa.Id,
                        '_': new Date().getTime()
                    },
                    url: "/AVA/Projetos/Servico/GetEtapaDetalhe/",
                    method: 'GET'
                })
                .success(function (data) {
                    $scope.objDetalhe = data.DetalheEnvio;
                    $scope.portalEnvio = data.portalEnvio;
                    $scope.slides = data.portalEnvio;


                }).error(function (err) {
                    console.log("Não foi possível buscar detalhe da Etapa");
                });
            };

            this.situacaoEtapa = function (etapa) {
                // Pegar essa data do Servidor erro apra computadores com datas erradas.
                if (typeof etapa.DataResultado != 'object') {
                    etapa.DataResultado = eval("new " + etapa.DataResultado.replace(/\//ig, ""));
                    etapa.DataFim = eval("new " + etapa.DataFim.replace(/\//ig, ""));
                    etapa.DataInicio = eval("new " + etapa.DataInicio.replace(/\//ig, ""));
                }

                if (typeof etapa.DataResultado == 'object') {
                    var dataAtual = new Date();

                    if (etapa.BolBreve != null && etapa.BolBreve) {
                        return 0;
                    } else if (dataAtual.getTime() > etapa.DataResultado.getTime()) { //Confira o resultado
                        return 4;
                    }
                    else if (dataAtual.getTime() > etapa.DataFim.getTime()) { // Confira os envios, etapa passou
                        return 3;
                    }
                    else if (dataAtual.getTime() > etapa.DataInicio.getTime()) { // Confira e envie a etapa
                        return 2;
                    }
                    else { //Aguarde
                        return 1;
                    }
                }

                return false;
            }

            this.ehPerfil = function (perfil) {
                var retorno = false;
                if (perfil != null) {
                    var perfis = perfil.split(',');
                    if ($scope.usuario) if ($scope.usuario.Cargos) if ($scope.usuario.Cargos instanceof Array) if ($scope.usuario.Cargos.length > 0) {
                        angular.forEach($scope.usuario.Cargos, function (cargo) {
                            var teste = $filter('filter')(perfis, cargo.Nome)
                            if (teste) if (teste instanceof Array) if (teste.length > 0) {
                                retorno = true;
                            }
                        });
                    }
                }
                return retorno;
            };


            $scope.setCurrentSlideIndex = function (index) {
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.prevSlide = function () {
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
            };


            $timeout(function () {
                self.init();
            }, 10);


        } ],
        controllerAs: 'etapaDetalheCtrl'
    };

});
