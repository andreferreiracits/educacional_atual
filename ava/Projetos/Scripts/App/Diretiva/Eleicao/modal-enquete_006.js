"use strict"

angular.module('Etapa').controller('ctrlModalEnquete', ['$scope', '$filter', '$log', '$modalInstance', '$http', '$timeout', 'edicaoConfig', 'objEdicao', 'objUsuario', 'defaultConfig', 'constantes', 'projetoTools', 'alternativa', 'etapa', 'enquetes', function ($scope, $filter, $log, $modalInstance, $http, $timeout, edicaoConfig, objEdicao, objUsuario, defaultConfig, constantes, projetoTools, alternativa, etapa, enquetes) {
    var self = this;
    $scope.projetoTools = projetoTools;

    $scope.defaultConfig = defaultConfig;
    $scope.edicaoConfig = edicaoConfig;
    $scope.etapa = etapa;
    $scope.objUsuario = objUsuario;
    $scope.objEdicao = objEdicao;
    $scope.constantes = constantes;
    $scope.enquetes = enquetes;
    $scope.alternativa = alternativa;
    $scope.serieSelecionada = undefined;
    $scope.turmasFiltradas = [];
    $scope.seriesComInscricoes = [];
    $scope.tipoEleicao = "Candidato";
    $scope.tipoEnquete = 0;

    $scope.ctrlRajadaEvento = undefined;

    $scope.bolJaVotado = false;
    $scope.bolRecemVotado = false;
    $scope.bolNaoVotou = true;

    $scope.bolEducador = false;
    $scope.bolAluno = false;
    $scope.bolPai = false;

    $scope.idEnquete = 0;
    $scope.OrdemVoto = 0;
    $scope.OrdemPartido = 0;

    $scope.confirmarVoto = function () {
        if ($scope.idEnquete > 0) {
            $http({
                cache: false,
                params: {
                    idEdicao: $scope.objEdicao.Id,
                    idEtapa: $scope.etapa.Id,
                    idEnquete: $scope.idEnquete,
                    idAlternativa: $scope.alternativa,
                    '_': new Date().getTime()
                },
                url: "/AVA/Projetos/Eleicoes/SalvarRespostaEnquete",
                method: 'POST'
            }).success(function (data) {
                if (data.status != null && projetoTools.getInt(data.status) >= 0) {
                    var status = projetoTools.getInt(data.status);
                    switch (status) {
                        case 0:
                            $scope.bolJaVotado = true;
                            $scope.bolRecemVotado = false;
                            $scope.bolNaoVotou = false;
                            break;
                        case 1:
                            $scope.bolJaVotado = true;
                            $scope.bolRecemVotado = true;
                            $scope.bolNaoVotou = false;
                            break;
                        default:
                            $scope.bolJaVotado = false;
                            $scope.bolRecemVotado = false;
                            $scope.bolNaoVotou = true;
                            break;
                    }
                }
                else {
                    $scope.bolJaVotado = false;
                    $scope.bolRecemVotado = false;
                    $scope.bolNaoVotou = true;
                }
            }).error(function (err) {
                $scope.bolJaVotado = false;
                $scope.bolRecemVotado = false;
                $scope.bolNaoVotou = true;
                alert("Ocorreu um erro ao tentar enviar o seu voto. Tente novamente atualizando a página ou depois!");
            }).then(function (data) {
                $scope.loadingSalvar = false;
            });
        }
        else {
            console.log("Erro de carregamento da enquete. Verifique novamente os parametros de abertura.");
            $scope.cancel();
        }
    };

    $scope.ok = function () {
        $modalInstance.close("teste");
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    this.initData = function () {
        //remapeia as funções de projetoTools para essa controller e para o escopo atual
        var initApi = true;
        if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
            initApi = false;
        }
        if (initApi) {
            angular.extendFunctions(self);
            angular.extendFunctions($scope);
        }

        $scope.bolEducador = projetoTools.verificaPerfil($scope.objUsuario, 'Educador');
        $scope.bolAluno = projetoTools.verificaPerfil($scope.objUsuario, 'Aluno');
        $scope.bolPai = projetoTools.verificaPerfil($scope.objUsuario, 'Responsável');

        $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEdicao.Etapas));
        $scope.situacaoEtapaFinal = projetoTools.situacaoEtapa($scope.etapaFinal);

        for (var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias) {
            //var slug = IniciaisMaiusculas(retira_acentos($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Descricao)).replace(/\s/g, "");
            //$scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Slug = slug;
            if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias) if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias instanceof Array) if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.length > 0) {
                $scope.tipoEleicao = "Partido";
                for (var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias.Subcategorias) {
                    //var subSlug = IniciaisMaiusculas(retira_acentos($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.Descricao)).replace(/\s/g, "");
                    //$scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.Slug = subSlug;
                }
            }
        }

        if ($scope.alternativa == 0 && $scope.situacaoEtapaFinal < 3) {
            //console.log($scope.objEdicao);
            console.log("Erro de carregamento da enquete. Verifique novamente os parametros de abertura.");
        }
        else if (($scope.bolAluno || $scope.bolPai) && $scope.situacaoEtapaFinal<3) {
            //console.log("enquetes");
            //console.log($scope.enquetes);
            for (var enq in $scope.enquetes) {
                for (var alt in $scope.enquetes[enq].Alternativas) {
                    if ($scope.enquetes[enq].Alternativas[alt].Id == $scope.alternativa) {
                        $scope.idEnquete = $scope.enquetes[enq].Id;
                        $scope.OrdemVoto = $scope.enquetes[enq].Alternativas[alt].Ordem;
                        $scope.tipoEnquete = $scope.enquetes[enq].IdTipo;
                        for (var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias) {
                            if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Id == $scope.enquetes[enq].IdCategoria) {
                                $scope.OrdemPartido = $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Ordem;
                            }
                        }
                    }
                }
            }

            if ($scope.idEnquete == 0 && $scope.situacaoEtapaFinal < 3) {
                console.log("Erro de carregamento da enquete. Verifique novamente os parametros de abertura.");
                $scope.cancel();
            }
        }
    };

    $scope.isRelacionadoComite = function (categoria) {
        $scope.objUsuario = constantes.Usuario;
        for (var turma in $scope.objUsuario.TurmasInscritas)
            if ($scope.objUsuario.TurmasInscritas[turma].Inscricao.Categorias[0].Id == categoria.Id) {

                for (var parceiro in $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros) {
                    if ($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros[parceiro].Id) {
                        return true;
                    }
                }

                if ($scope.objUsuario.Cargos && $scope.objUsuario.Cargos.length == 1)
                    if ($scope.objUsuario.Cargos[0] == 'Aluno')
                        return true;

                if ($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Responsavel.Id)
                    return true;

            }

        return false;
    }

    $scope.bolEleicaoEnqueteConcluida = function () {
        var EleicaoEnqueteConcluida = false;
        if (typeof etapa != "undefined") {
            //console.log(etapa);
            //if (etapa && (etapa.TipoEtapaEleicao == 1 || etapa.TipoEtapaEleicao == 3 || etapa.TipoEtapaEleicao == 5)) {
            if ([1, 3].indexOf(etapa.TipoEtapaEleicao) != -1) {
                var dataEtapaTemp = etapa.DataFim;
                if (dataEtapaTemp && dataEtapaTemp instanceof Date) {
                    if (dataEtapaTemp.getTime() < new Date().getTime()) {
                        EleicaoEnqueteConcluida = true;
                    }
                } else {
                    if (dataEtapaTemp && typeof dataEtapaTemp != 'undefined' && typeof dataEtapaTemp === 'string') {
                        if (dataEtapaTemp.indexOf('(') > -1 && dataEtapaTemp.indexOf(')') > -1) {
                            dataEtapaTemp = dataEtapaTemp.substring(dataEtapaTemp.indexOf('(') + 1, dataEtapaTemp.indexOf(')'));
                            if (dataEtapaTemp.length == 13) {
                                if (dataEtapaTemp < new Date().getTime()) {
                                    EleicaoEnqueteConcluida = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return EleicaoEnqueteConcluida;
    }

    this.init = function () {
        self.initData();
        //$scope.turmasFiltradas = $filter('filter')($scope.objUsuario.TurmasInscritas, { Inscricao: { Categorias: [{ Id: $scope.categoria.Id}]} }, true);
    };

    $timeout(function () {
        self.init();
    });
} ]);