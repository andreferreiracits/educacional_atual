"use strict"

angular.module('Inscricao.mista').directive('inscricaoMistaProjeto', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/inscricao-mista-projeto.html',
        scope: {
            usuario: "=usuario",
            edicao: "=edicao",
            edicaoConfig: "=edicaoConfig",
            objEtapa: "=objEtapa",
            listaTurmas: "=",
            listaEquipes: "=listaEquipes",
            listaInscricoesTurmas: "=listaInscricoesTurmas",
            listaInscricoesEquipes: "=listaInscricoesEquipes"
        },
        controller: ['$scope', '$http', '$modal', '$log', '$filter', '$timeout', function ($scope, $http, $modal, $log, $filter, $timeout) {

    
            //variaveis do escopo
            var objTipoInscricao = [];
            var self = this;
            $scope.objEquipe = {};
            $scope.objTurma = {};

            $scope.etapaConfig = {};
            $scope.objParceiros = {};
            $scope.bloqueiaAllEquipe = { block: false };
            $scope.bloqueiaAllTurma = { block: false };
            $scope.loadingConfig = true; //Controla o init(), lista turmas,etc.
            
            $scope.acesso = { primeiro: true, openListaEquipe: true, openListaTurma: true };
            $scope.parceirosEnvioSelected = [];

            //var bolTurmasCarregada = false;
            //if ($scope.listaTurmas != null) {
            //    if ($scope.listaTurmas.length > 0) {
            //        bolTurmasCarregada = true;
            //    }
            //}

            //$scope.listaTurmas = [];
            $scope.listaTurmasFinal = [];
            $scope.alunosAdicionados = [];
            $scope.alunosMonitores = [];
            

            var arraySeletorEnvioTurma = [];

            if ($scope.edicaoConfig) if ($scope.edicaoConfig.InscricoesTipos) {

                arraySeletorEnvioTurma = $filter('filter')($scope.edicaoConfig.InscricoesTipos, { Id: 1 }, true);

                //Verifica se existe inscricao por equipe de uma unica turma
                objTipoInscricao = $filter('filter')($scope.edicaoConfig.InscricoesTipos, { Id: 2 }, true);

                if (objTipoInscricao.length <= 0) {
                    //Verifica se é equipe de turmas da escola
                    objTipoInscricao = $filter('filter')($scope.edicaoConfig.InscricoesTipos, { Id: 3 }, true);
                }
            }
        
            $scope.objTipoInscricao = objTipoInscricao;

            /* Inicio controle das Abas */

            /*Aba seletor principal, Turmas ou Equipes */
            $scope.abaSeletor = { atual: 0 };

            if (arraySeletorEnvioTurma.length > 0) { //Se existir inscrição por Turma, vem aberto por primeiro
                $scope.abaSeletor.atual = 1;

                if (angular.isArray($scope.listaInscricoesTurmas) && $scope.listaInscricoesTurmas.length > 0) {
                    $scope.aba_atual = 1;
                } else {
                    $scope.aba_atual = 2;
                }
            } else if (objTipoInscricao.length > 0) { // Se existir por Equipe, vem aberto
                $scope.abaSeletor.atual = 2;

                if ($scope.listaInscricoesEquipes.length > 0) {
                    $scope.aba_atual = 3;
                } else {
                    $scope.aba_atual = 4;
                }
            }

            /*
            [1] - [Turma] Meus envios 
            [2] - [Turma] Novo material 
            [3] - [Equipe] Meus envios 
            [4] - [Equipe] Novo material 
            */



            /* Fim controle das Abas */


            //dados do controle de criar equipe migrados para o Pai, para permitir o controle top-down
            $scope.novaEquipe = function () {
                return {
                    Id: 0,
                    Foto: "",
                    Nome: "",
                    TxtApresentacao: "",
                    Arquivo: {
                        idArquivo: 0
                    },
                    Alunos: [],
                    Inscricao: {
                        Id: 0,
                        Categoria: [],
                        Turma: {
                            Id: 0
                        }
                    }
                };
            }

      
             //Atualiza turma/equipe que enviou material diretamente na aba Novo material
            $scope.$on("changeFinalizarEnvio",function(event, objRetorno){
                
                if($scope.aba_atual == 2){
                    var objEnviado = $filter('filter')($scope.listaInscricoesTurmas,{ Inscricao : { Id: objRetorno[0].Inscricao.Id } }, true);
                    if(objEnviado.length > 0){
                        objEnviado[0].Inscricao.EtapaInscricaoEnvios = objRetorno[0].EtapaInscricaoEnvioGrupos;
                    }
                }else if($scope.aba_atual == 4){
                    var objEnviado = $filter('filter')($scope.listaInscricoesEquipes,{ Inscricao : { Id: objRetorno[0].Inscricao.Id } }, true);
                    if(objEnviado.length > 0){
                        objEnviado[0].Inscricao.EtapaInscricaoEnvios = objRetorno[0].EtapaInscricaoEnvioGrupos;
                    }
                }

            });

            $scope.$on("changeListaInscricoesTurma", function (event, objRetorno) {
                if ($scope.aba_atual == 2) {
                    $scope.listaInscricoesTurmas = objRetorno.listaInscricoesTurmas;
                } else if ($scope.objTurma && objRetorno.Envio) {
                    if ($scope.objTurma.Inscricao != null) {
                        $scope.objTurma.Inscricao.Parceiros = objRetorno.Envio[0].Inscricao.Parceiros;
                    }
                }
            });


            $scope.$on("changeListaInscricoesEquipe", function (event, objRetorno) {
                if ($scope.aba_atual == 4) {
                    $scope.listaInscricoesEquipes = objRetorno.listaInscricoesEquipes;
                } else if ($scope.objEquipe && objRetorno.Envio) {
                    if ($scope.objEquipe.Inscricao != null) {
                        $scope.objEquipe.Inscricao.Parceiros = objRetorno.Envio[0].Inscricao.Parceiros;
                    }
                }
            });

            $scope.$on("changeListaEquipe", function (event, objListaEquipes) {
                $scope.listaEquipes = objListaEquipes;
            });

            
            if(objTipoInscricao.length > 0){
                $scope.novoForm = function () {
                    return {
                        Edicao: {
                            Id: $scope.edicao.Id
                        },
                        TipoInscricao: {
                            Id: $scope.objTipoInscricao[0].Id
                        },
                        Categorias: [],
                        Equipe: $scope.novaEquipe()
                    };
                }

                $scope.form = $scope.novoForm();
            }

            $scope.controle =
            {

                envios: false,
                novo: false,
                criar: false,
                gerenciador: false,
                semequipe: true
            };
            
            //rotina de inicialização
            $scope.init = function () {
                self.getProfessores();

            //    //$http.get('/AVA/ProjetoApi/v1/Etapa/GetEtapaConfiguracaoByIdEtapa/?idEtapa=' + $scope.objEtapa.Id)
            //    //$http.get('/AVA/Projetos/Etapa/GetEtapaConfiguracaoByIdEtapa/?idEtapa=' + $scope.objEtapa.Id)
            //
            //
            //
            //    //$http.get('/AVA/Projetos/Servico/GetConfiguracaoEquipesByIdEtapa/?idEtapa=' + $scope.objEtapa.Id)
            //    $http({
            //        cache: false,
            //        params: {
            //            idEtapa : $scope.objEtapa.Id,
            //            '_': new Date().getTime()
            //        },
            //        url: "/AVA/Projetos/Servico/GetConfiguracaoEquipesByIdEtapa/",
            //        method: 'GET'
            //    })
            //    .success(function (data) {
            //        $scope.etapa = data.EtapaConfiguracao.Etapa;
            //        $scope.etapaConfig = data.EtapaConfiguracao;
            //        $scope.listaTurmas = data.listaTurmas;
            //        if ($scope.listaTurmas) if ($scope.listaTurmas instanceof Array) {
            //            for (var turma in $scope.listaTurmas) {
            //                $scope.listaTurmas[turma].desabilitada = false;
            //            }
            //        }
            //        $scope.listaTurmasFinal = [{ Id: 0, Nome: "Turmas de toda a escola", desabilitada: true}].concat(clone_obj($scope.listaTurmas));
            //    }).error(function () {
            //        alert("Erro ao buscar configuração da Etapa.");
            //    }).finally(function(){
            //        $scope.loadingConfig = false;
            //    });
            };

            $scope.checkTurma = function (obj) {
                $scope.objEquipe = {};
                $scope.objTurma = {};
                $scope.parceirosEnvioSelected = [];

                $timeout(function () {
                    $scope.objTurma = obj;
                    if (obj.Inscricao != null) {
                        if (obj.Inscricao.Parceiros != null) {
                            var arrayParceiros = angular.copy(obj.Inscricao.Parceiros);
                            $scope.parceirosEnvioSelected = arrayParceiros;
                        }
                    }
                }, 300);
            };

            $scope.checkEquipe = function (obj) {
                $scope.objEquipe = {};
                $scope.objTurma = {};
                $scope.parceirosEnvioSelected = [];
                $timeout(function () {
                    $scope.objEquipe = obj;
                    if (obj.Inscricao != null) {
                        if (obj.Inscricao.Parceiros != null) {
                            var arrayParceiros = angular.copy(obj.Inscricao.Parceiros);
                            $scope.parceirosEnvioSelected = arrayParceiros;
                        }
                    }
                }, 300);
            };

            $scope.refreshComboTurmas = function (force_exit) {
                var possuiTipoEquipesHomogeneas = false;
                for (var tipo in $scope.edicao.InscricoesTipos) {
                    if ($scope.edicao.InscricoesTipos[tipo].Id == 2)
                        possuiTipoEquipesHomogeneas = true;
                }

                $scope.listaTurmasFinal = [{ Id: 0, Nome: "Turmas de toda a escola", desabilitada: true}].concat(clone_obj($scope.listaTurmas));
                for (var turma in $scope.listaTurmasFinal) {
                    if ($scope.listaTurmasFinal[turma].Id != 0)
                        $scope.listaTurmasFinal[turma].desabilitada = false;
                }
                //localiza e remove as turmas da combo não relacionadas com os alunos adicionados
                if ($scope.alunosAdicionados.length > 0) if (possuiTipoEquipesHomogeneas) if ($scope.listaTurmasFinal) if ($scope.listaTurmasFinal instanceof Array) {
                    for (var turma in $scope.listaTurmasFinal) {
                        $scope.listaTurmasFinal[turma].desabilitada = true;
                    }
                    var turmasLocalizadas = false;
                    for (var aluno in $scope.alunosAdicionados) {
                        if (!turmasLocalizadas) {
                            //primeira iteração habilita todas turmas
                            for (var turma in $scope.alunosAdicionados[aluno].Turmas) {
                                for (var lturma in $scope.listaTurmasFinal) {
                                    if ($scope.listaTurmasFinal[lturma].Id == $scope.alunosAdicionados[aluno].Turmas[turma].Id) {
                                        turmasLocalizadas = true;
                                        $scope.listaTurmasFinal[lturma].desabilitada = false;
                                    }
                                }
                            }
                        }
                        else {
                            //segunda iteração adiante, mantérá somente as repetidas
                            for (var lturma in $scope.listaTurmasFinal) {
                                var encontrada = false;
                                for (var turma in $scope.alunosAdicionados[aluno].Turmas) {
                                    if (!$scope.listaTurmasFinal[lturma].desabilitada && parseInt($scope.alunosAdicionados[aluno].Turmas[turma].Id) == parseInt($scope.listaTurmasFinal[lturma].Id)) {
                                        encontrada = true;
                                    }
                                }
                                if (!encontrada) {
                                    $scope.listaTurmasFinal[lturma].desabilitada = true;
                                }
                            }
                        }
                    }
                    //sinaliza em um vetor à parte quais turmas da combo não relacionadas com os alunos adicionados serão removidas
                    var arrRemover = new Array();
                    var novo_indice_selecionado = -1;
                    //verifica se ja existia seleção e se a selecionada permanecerá / caso positivo, manterá a mesma selecionada
                    var selecao_anterior = angular.element("#turmaBuscarAluno").val();
                    var bolPresente = false;
                    for (var turma in $scope.listaTurmasFinal) {
                        var indice = $scope.listaTurmasFinal.indexOf($scope.listaTurmasFinal[turma]);
                        if (selecao_anterior > 0 && $scope.listaTurmasFinal[turma].Id == selecao_anterior && !$scope.listaTurmasFinal[turma].desabilitada) {
                            bolPresente = true;
                            novo_indice_selecionado = indice;
                        }
                        if (typeof ($scope.listaTurmasFinal[turma]) != "object") {
                            arrRemover.push(indice);
                        }
                        if ($scope.listaTurmasFinal[turma].desabilitada) {
                            arrRemover.push(indice);
                        }
                        else {
                            if (novo_indice_selecionado == -1 && $scope.listaTurmasFinal[turma].Id > 0) {
                                if (!bolPresente)
                                    novo_indice_selecionado = indice;
                            }
                        }
                    }
                    //remove efetivamente da listagem no modelo
                    for (var i = (arrRemover.length - 1); i >= 0; i--) {
                        $scope.listaTurmasFinal.splice(arrRemover[i], 1);
                    }
                }
            };

            $scope.updateFormCriarEquipe = function (paramEquipe) {
                $scope.alunosAdicionados = new Array();
                $scope.alunosMonitores = new Array();
                $scope.form = $scope.novoForm();
                $scope.form.Equipe.Alunos = new Array();
                if (paramEquipe instanceof Object) if (paramEquipe.Id) if (paramEquipe.Id > 0) {

                    var indice = $scope.listaEquipes.indexOf(paramEquipe);

                    $scope.form.Equipe = clone_obj($scope.listaEquipes[indice]);

                    $scope.form.Equipe.Alunos = new Array();

                    //atualiza o array de alunos adicionados
                    for (var user in $scope.listaEquipes[indice].Alunos) {
                        var auxAluno = $scope.listaEquipes[indice].Alunos[user];
                        $scope.alunosAdicionados.push(auxAluno);
                        $scope.form.Equipe.Alunos.push(auxAluno);
                        if (auxAluno.bolMonitor == true) {
                            $scope.alunosMonitores.push(auxAluno);
                        }
                    }

                    //atualiza a combo de turmas relacionada com o equipe, caso a inscrição seja do tipo 2
                    $scope.listaTurmasFinal = [{ Id: 0, Nome: "Turmas de toda a escola", desabilitada: true}].concat(clone_obj($scope.listaTurmas));

                    //atualiza as categorias do wizzard conforme a categoria existente para a respectiva inscrição
                    if (paramEquipe.Inscricao) if (paramEquipe.Inscricao.Id) if (!isNaN(paramEquipe.Inscricao.Id)) if (parseInt(paramEquipe.Inscricao.Id) > 0) if (paramEquipe.Inscricao.Categorias) {
                        $scope.form.Categorias = new Array();
                        var indiceGrupo = 0;
                        for (var tmpCategoriaEquipe in $scope.edicaoConfig.GruposCategorias) {
                            for (var categoriaEscopo in $scope.edicaoConfig.GruposCategorias[tmpCategoriaEquipe].Categorias) {
                                if (paramEquipe.Inscricao.Categorias instanceof Array) {
                                    for (var categoria in paramEquipe.Inscricao.Categorias) {
                                        if (paramEquipe.Inscricao.Categorias[categoria].Id == $scope.edicaoConfig.GruposCategorias[tmpCategoriaEquipe].Categorias[categoriaEscopo].Id) {
                                            $scope.form.Categorias[indiceGrupo] = $scope.edicaoConfig.GruposCategorias[tmpCategoriaEquipe].Categorias[categoriaEscopo];
                                        }
                                    }
                                }
                                else if (paramEquipe.Inscricao.Categorias.Id) if (parseInt(paramEquipe.Inscricao.Categorias.Id) > 0) {
                                    if ($scope.edicaoConfig.GruposCategorias[tmpCategoriaEquipe].Categorias[categoriaEscopo].Id == paramEquipe.Inscricao.Categorias.Id) {
                                        $scope.form.Categorias[indiceGrupo] = $scope.edicaoConfig.GruposCategorias[tmpCategoriaEquipe].Categorias[categoriaEscopo];
                                    }
                                }
                            }
                            indiceGrupo++;
                        }
                    }
                }
            };

            $scope.openCriarEquipe = function (p_objEquipe, p_size) {

                var objPassagem;
                $scope.form = $scope.novoForm();
                $scope.alunosAdicionados = new Array();
                $scope.alunosMonitores = new Array();
                $scope.form.Equipe.Alunos = new Array();
                if (p_objEquipe) if (p_objEquipe.Id) if (!isNaN(p_objEquipe.Id)) if (parseInt(p_objEquipe.Id) > 0) {
                    //$scope.objEquipe = p_objEquipe;
                    objPassagem = angular.copy(p_objEquipe);
                    $scope.updateFormCriarEquipe(p_objEquipe);
                }
                if (!objPassagem) {
                    objPassagem = $scope.novaEquipe();
                }

                //$scope.objEquipe = {};
                //$scope.$broadcast("resetRadioEquipe");
                $scope.clearAllTurmaEquipeSelecao();

                var size = 0;
                if (p_size) if (!isNaN(p_size)) if (parseInt(p_size) > 0) {
                    size = parseInt(p_size);
                }

                var modalInstance = $modal.open({
                    templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/modal/criar-equipe.html',
                    controller: 'criarEquipeCtrl',
                    //scope: $scope,
                    size: size,
                    resolve: {
                        criarEquipe: function () {
                            return $scope.openCriarEquipe
                        },
                        gerenciarEquipe: function () {
                            return $scope.openGerenciarEquipe
                        },
                        gruposcategorias: function () {
                            return $scope.edicaoConfig.GruposCategorias;
                        },
                        listaTurmas: function () {
                            return $scope.listaTurmas
                        },
                        objTipoInscricao: function () {
                            return objTipoInscricao;
                        },
                        edicaoConfig: function () {
                            return $scope.edicaoConfig;
                        },
                        edicao: function () {
                            return $scope.edicao;
                        },
                        listaEquipes: function () {
                            return $scope.listaEquipes;
                        },
                        objEquipe: function () {
                            return objPassagem;
                        },
                        objEtapa: function () {
                            return $scope.objEtapa;
                        },
                        alunosAdicionados: function () {
                            return $scope.alunosAdicionados;
                        },
                        alunosMonitores: function () {
                            return $scope.alunosMonitores;
                        },
                        form: function () {
                            return $scope.form;
                        }
                    }
                    , backdrop: 'static'
                });

                modalInstance.result.then(function (p_equipe) { // Ao clicar em "OK", recebe os parametros!
                    //$log.info('Modal result dismissed at: ' + new Date());
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
                modalInstance.opened.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
                }, function () {
                    //$log.info('Modale opened dismissed at: ' + new Date());
                });
            };

            $scope.clearAllTurmaEquipeSelecao = function () {
                angular.element("input[name=radio_turma]").prop("checked", false);
                angular.element("input[name=radio_equipe]").prop("checked", false);
                $scope.objEquipe = {};
                $scope.objTurma = {};
            };

            $scope.openGerenciarEquipe = function (size) {
                $scope.clearAllTurmaEquipeSelecao();

                var modalInstance = $modal.open({
                    templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/modal/gerenciar-equipe.html',
                    controller: 'gerenciarEquipeCtrl',
                    size: size,
                    resolve: {
                        criarEquipe: function () {
                            return $scope.openCriarEquipe
                        },
                        listaTurmas: function () {
                            return $scope.listaTurmas
                        },
                        objTipoInscricao: function () {
                            return objTipoInscricao;
                        },
                        edicaoConfig: function () {
                            return $scope.edicaoConfig;
                        },
                        edicao: function () {
                            return $scope.edicao;
                        },
                        listaEquipes: function () {
                            return $scope.listaEquipes;
                        },
                        objEquipe: function () {
                            return $scope.objEquipe;
                        },
                        objEtapa: function () {
                            return $scope.objEtapa;
                        }
                    }
                });

                modalInstance.result.then(function (equipe) { // Ao clicar em "OK", recebe os parametros!
                    //$scope.listaEquipes.push(equipe);
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.openAbaSeletor = function (idAba) {
                if (idAba == 1) { //Turmas
                    $scope.clearAllTurmaEquipeSelecao();
                    if (angular.isArray($scope.listaInscricoesTurmas) && $scope.listaInscricoesTurmas.length > 0) {
                        $scope.aba_atual = 1;
                    } else {
                        $scope.aba_atual = 2;
                    }
                } else if (idAba == 2) { //Equipes
                     $scope.clearAllTurmaEquipeSelecao();
                    if ($scope.listaInscricoesEquipes.length > 0) {
                        $scope.aba_atual = 3;
                    } else {
                        $scope.aba_atual = 4;
                    }
                }

                $scope.abaSeletor.atual = idAba;
            };


            $scope.openEnviosTurma = function () {
                if ($scope.listaInscricoesTurmas.length > 0) {
                    $scope.objEquipe = {};
                    $scope.objTurma = {};
                    $scope.aba_atual = 1;
                }
            };

            $scope.openEnviosEquipe = function () {
                if ($scope.listaInscricoesEquipes.length > 0) {
                    $scope.objEquipe = {};
                    $scope.objTurma = {};
                    $scope.aba_atual = 3;
                }
            };


            $scope.addNovoMaterialTurma = function () {
                $scope.acesso.openListaTurma = false;
                $scope.aba_atual = 2;
                $scope.bloqueiaAllTurma.block = false;
                $scope.clearAllTurmaEquipeSelecao();
                $scope.parceirosEnvioSelected = []; //Reseta lista de parceiros selecionado

                angular.forEach($scope.listaTurmas, function (valor, chave) {
                    valor.Inscricao.Id = 0;
                    if(valor.Inscricao.EtapaInscricaoEnvios != null){
                        valor.Inscricao.EtapaInscricaoEnvios = null;
                    }
                });

                angular.element("input[name=radio_turma]").prop("checked", false);
                $timeout(function () {
                    $scope.acesso.openListaTurma = true;
                }, 200);
            };

            $scope.addNovoMaterialEquipe = function () {
                $scope.acesso.openListaEquipe = false;
                $scope.aba_atual = 4;
                $scope.bloqueiaAllEquipe.block = false;
                $scope.clearAllTurmaEquipeSelecao();
                $scope.parceirosEnvioSelected = []; //Reseta lista de parceiros selecionado

                angular.element("input[name=radio_equipe]").prop("checked", false);
                $timeout(function () {
                    $scope.acesso.openListaEquipe = true;
                }, 200);
            };

            this.resetControle = function () {
                $scope.controle =
                {
                    criar: false,
                    gerenciador: false,
                    semequipe: false
                };
            };

            // Busca Professores responsaveis que podem ser parceiros da turma
            this.getProfessores = function () {
                // Possivel Otimização
                /*
                Criar um cache com o promisse dos professores.
                assim se o usuario ficar mudando de uma turma para outra não refaz o HHTP Request
                */
                //$http.get('/AVA/Projetos/Servico/GetResponsaveisEdicaoTurmaLogin/?idEdicao=' + $scope.edicao.Id + '&idTurma=0&strLogin=')
                //.success(function (data) {
                //    $scope.objParceiros = data.Responsaveis;
                //})
                //.error(errorPadrao);

                //console.log("entrou");
                if(angular.isObject($scope.objTurma) && $scope.objTurma.Id > 0){
                    //$http.get('/AVA/Projetos/Servico/GetResponsaveisEdicaoTurmaLogin/?idEdicao=' + $scope.idEdicao + '&idTurma=' + $scope.objTurma.Id + '&strLogin=')
                    $http.get('/AVA/Projetos/Servico/GetResponsaveisEdicaoTurmaLogin/?idEdicao=' + $scope.edicao.Id + '&idTurma=' + $scope.objTurma.Id + '&strLogin=')
                    .success(function (data) {
                        angular.forEach(data.Responsaveis, function (value, index) {
                            value.eParceiro = false;
                        });
                        $scope.Responsaveis = data.Responsaveis;
                        jQuery("#professorResponsavel_value").focus();

                    })
                    .error(errorPadrao);
                }
            };

            this.isCheckTurma = function () {
                if ($scope.objTurma != null && angular.isObject($scope.objTurma) && $scope.objTurma.Id>0) {
                    return true
                }
                return false
            };

            $timeout(function () {
                $scope.init();
            }, 100);

        } ],
        controllerAs: "inscMistaProjeto"
    };
});



