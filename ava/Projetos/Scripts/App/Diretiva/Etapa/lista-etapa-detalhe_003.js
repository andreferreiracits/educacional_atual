"use strict"

angular.module('Etapa').directive('listaEtapaDetalhe', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/lista-etapa-detalhe.html',
        scope: {
            //idEdicao: "@idEdicao",
            objParceria: "=objParceria",
            objEdicao: "=objEdicao",
            objEtapa: "=objEtapa",
            usuario: "=usuario",
            defaultConfig: "=defaultConfig"
            //edicaoAno: "@edicaoAno",
            //edicaoLink: "@edicaoLink"
        },
        link: function (scope, el, attr) {
        },
        controller: ['$http', '$scope', '$timeout', '$filter', 'projetoTools', function ($http, $scope, $timeout, $filter, projetoTools) {

            var controller = this;

            //ELEIÇÃO - tratar se ja votou
            $scope.bolEleicoes = false;
            $scope.bolVotou = false;
            $scope.TipoEleicao = "";
            $scope.Partido = "";
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
                if (typeof $scope.objEtapa.DataInicio != 'object')
                    $scope.objEtapa.DataInicio = new Date(parseInt($scope.objEtapa.DataInicio.substr(6), 10));
                if (typeof $scope.objEtapa.DataFim != 'object')
                    $scope.objEtapa.DataFim = new Date(parseInt($scope.objEtapa.DataFim.substr(6), 10));
                if (typeof $scope.objEtapa.DataResultado != 'object')
                    $scope.objEtapa.DataResultado = new Date(parseInt($scope.objEtapa.DataResultado.substr(6), 10));

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
                            console.log(turmas_inscritas);
                            if (turmas_inscritas) if (turmas_inscritas instanceof Array) if (turmas_inscritas.length >= 1) {
                                var idCategoriaInscricaoAluno = turmas_inscritas[0].Inscricao.Categorias[0].Id;
                                var idxCategoria = projetoTools.indexOfId(constantes.EdicaoConfig.GruposCategorias[0].Categorias, idCategoriaInscricaoAluno);
                                $scope.Partido = constantes.EdicaoConfig.GruposCategorias[0].Categorias[idxCategoria].Slug;
                            }
                        }
                    }
                }

                //if ($scope.objEtapa) {
                //angular.forEach($scope.objEtapa, function (valor, chave) {
                //$scope.objEtapa.DataInicio = new Date(parseInt($scope.objEtapa.DataInicio.substr(6)));
                //$scope.objEtapa.DataFim = new Date(parseInt($scope.objEtapa.DataFim.substr(6)));
                //$scope.objEtapa.DataResultado = new Date(parseInt($scope.objEtapa.DataResultado.substr(6)));
                //$scope.objEtapa.DataInicio = new Date(parseInt($scope.objEtapa.DataInicio.replace("/Date(", "").replace(")/",""), 10));
                //$scope.objEtapa.DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                //$scope.objEtapa.DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                //$scope.objEtapa.DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                //});
                //}

                //$http.get('/AVA/Projetos/Servico/GetEtapaDetalhe?idEtapa=' + $scope.objEtapa.Id,
                //{
                //    cache: false,
                //    '_': new Date().getTime()
                //})
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
                controller.init();
            }, 10);


        } ],
        controllerAs: 'etapaDetalheCtrl'
    };

});