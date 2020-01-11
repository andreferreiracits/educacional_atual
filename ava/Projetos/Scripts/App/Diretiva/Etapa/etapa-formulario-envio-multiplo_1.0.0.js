"use strict"
angular.module('Etapa').directive('etapaFormularioEnvioMultiplo', function () {
    return {
        restrict: 'E',
        //replace: true,
        scope: {
            idEdicao: "=idEdicao",
            idEtapa: "=idEtapa",
            usuario: "=usuario",
            defaultConfig: "=defaultConfig",
            listaInscricoesTurmas: "=listaInscricoesTurmas",
            listaInscricoesEquipes: "=listaInscricoesEquipes"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/etapa-formulario-envio-multiplo.html'
    };
});


angular.module('Etapa').controller("etapaFormularioEnvioMultiploCtrl", ['$http', '$scope', '$rootScope', 'perfilUsuario', '$timeout', '$interval', '$filter', 'projetoTools', 'constantes', function ($http, $scope, $rootScope, servicoUsuario, $timeout, $interval, $filter, projetoTools, constantes) {
    $scope.projetoTools = projetoTools;
    $scope.etapa = {};
    $scope.config = {};
    $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);
    $scope.etapaConfig = {};

    $scope.bolAluno = projetoTools.verificaPerfil($scope.usuario, 'Aluno');
    $scope.bolEducAdmin = projetoTools.verificaPerfil($scope.usuario, 'Educador,Administrador');
    $scope.bolEtapaLiberada = false;
    $scope.bolInscricaoPorTurma = false;
    $scope.bolInscricaoPorEquipe = false;
    $scope.bolInscritoComTurma = false;
    $scope.bolInscritoComEquipe = false;
    $scope.bolInscritoComEnviosTurma = false;
    $scope.bolInscritoComEnviosEquipe = false;

    $scope.loadingGeral = true;
    $scope.listaTurmas = [];
    $scope.listaEquipes = [];
    $scope.listaTurmasCache = [];
    $scope.listaEquipesCache = [];
    $scope.listaEnviosTurmas = [];
    $scope.listaEnviosEquipes = [];
    $scope.situacaoEtapa = 0;
    $scope.aba_atual = 1;
    $scope.abaSeletor = { atual: 0 };
    $scope.maxEnvio = 1;
    $scope.idxEnvio = -1;
    $scope.objTurmaSelecionada = {};



    $scope.controle = {
        envios: false,
        novo: false,
        criar: false,
        gerenciador: false,
        semequipe: true
    };

    $scope.forceRefresh = false;

    $scope.acesso = {
        primeiro: true,
        openListaEquipe: true,
        openListaTurma: true
    };

    $scope.bloqueiaAllEquipe = { block: false };
    $scope.bloqueiaAllTurma = { block: false };

    var that = this;
    this.usuario = {};
    this.etapaDataInicio = $scope.etapa.DataInicio;

    // Busca dados do Usuario via serviço Melhorar servios com.
    servicoUsuario.usuario().success(function (data) {
        that.usuario = data.usuario;
    });

    //atualiza os vetores utilizados no front, com os novos valores recebidos após os envios:
    //total de envios, situação, etc
    this.atualizaDadosEquipes = function (totalEnvios, Envios, objRetorno) {
        console.log("atualizaDadosEquipes");
    };

    this.atualizaDadosTurmas = function (totalEnvios, Envios, objRetorno) {
        //console.log("atualizaDadosTurmas");
        //atualiza o total de envios
        $scope.objTurmaSelecionada.TotalEnvios = totalEnvios;

        var idx = -1;
        var els = angular.element("input[name=radio_turma]");
        angular.forEach(els, function (el, index) {
            if (angular.element(el).get(0).checked && angular.element(el).is(":visible")) {
                idx = index;
            }
        });
        if (idx >= 0) {

            if ($scope.aba_atual % 2 > 0) {
                //edição de envio

                //mantém na relação de envios do registro somente o respectivo envio com a situação atualizada recebida do salvamento
                if (
                    (totalEnvios > 0) &&
                    (!isNaN(objRetorno.indiceEnvio)) &&
                    angular.isNumber(objRetorno.idEnvio) &&
                    (parseInt(objRetorno.indiceEnvio) >= 0) &&
                    angular.isArray(Envios) &&
                    (objRetorno.indiceEnvio < Envios.length) &&
                    (Envios[parseInt(objRetorno.indiceEnvio)].Id == parseInt(objRetorno.idEnvio))
                ) {
                    var indiceEnvioRetornado = parseInt(objRetorno.indiceEnvio);
                    $scope.objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios = [];
                    $scope.objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios.push(angular.copy(Envios[indiceEnvioRetornado]));

                    //corrige o índice da turma, com base no envio registrado
                    if (
                        $scope.listaEnviosTurmas[idx].Id != $scope.objTurmaSelecionada.Id ||
                        $scope.listaEnviosTurmas[idx].Inscricao.EtapaInscricaoEnvios[0].Id != $scope.objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios[0].Id
                    ) {
                        angular.forEach($scope.listaEnviosTurmas, function (objIteracao, index) {
                            if (
                                objIteracao.Inscricao.EtapaInscricaoEnvios != null &&
                                angular.isArray(objIteracao.Inscricao.EtapaInscricaoEnvios) &&
                                objIteracao.Id == $scope.objTurmaSelecionada.Id &&
                                objIteracao.Inscricao.EtapaInscricaoEnvios[0].Id == $scope.objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios[0].Id
                            ) {
                                idx = index;
                            }
                        });
                    }
                    $scope.idxEnvio = 0; //idx;
                    //atualiza a situação do material na relação da guia de envios
                    for (var curTurma in $scope.listaEnviosTurmas) {
                        if ($scope.listaEnviosTurmas[curTurma].Id == $scope.objTurmaSelecionada.Id) {

                            if ($scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].Id == Envios[indiceEnvioRetornado].Id) {
                                var idSituacaoEnvio = Envios[indiceEnvioRetornado].Situacao.Id;

                                var Situacao = "";
                                switch (idSituacaoEnvio) {
                                    case 2:
                                        Situacao = "Aguardando publicação";
                                        break;
                                    case 4:
                                        Situacao = "Rascunho";
                                        break;
                                }
                                $scope.listaEnviosTurmas[curTurma].TotalEnvios = totalEnvios;
                                $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].Situacao.Id = idSituacaoEnvio;
                                $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].BolPodeEnviar = Envios[indiceEnvioRetornado].BolPodeEnviar;
                                $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].Situacao.Descricao = Situacao;
                                $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos = angular.copy(Envios[indiceEnvioRetornado].EtapaInscricaoEnvioGrupos);
                            }

                        }
                    }
                }
                else {
                    console.log("ocorreu um erro");
                }
            }
            else {
                //novo envio
                if (totalEnvios > 0) {
                    $scope.objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios = [];
                    $scope.objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios.push(angular.copy(Envios[Envios.length - 1]));
                    $scope.idxEnvio = 0;
                }

                if ($scope.listaTurmasCache[idx].Id != $scope.objTurmaSelecionada.Id) {
                    idx = projetoTools.indexOfId($scope.listaTurmasCache, $scope.objTurmaSelecionada.Id);
                }

                //se verificado que realmente foi o início de um envio novo
                //objRetorno.request.Id = idFormularioResposta em novos envios no 1º request é 0 zero)
                //objRetorno.idEnvio = idEnvio em novos envios no 1º request é 0 zero também)
                if (objRetorno.request.Id == 0 && parseInt(objRetorno.idEnvio) == 0) {
                    //registra o novo envio para incrementar a relação de envios no front
                    $scope.bolInscritoComEnviosTurma = true;
                    $scope.listaEnviosTurmas.push(angular.copy($scope.objTurmaSelecionada));
                    $scope.$broadcast("updateTotalEnviosTurma", $scope.objTurmaSelecionada);
                }
                else {
                    //verifica se foi finalizado o envio para atualizar a situação do material na guia de envios
                    //nesse caso de editando um material na guia de novos envios, sempre o último material do vetor se refere ao material em edição
                    for (var curTurma in $scope.listaEnviosTurmas) {
                        if ($scope.listaEnviosTurmas[curTurma].Id == $scope.objTurmaSelecionada.Id) {
                            if ($scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].Id == Envios[Envios.length - 1].Id) {
                                var idSituacaoEnvio = Envios[Envios.length - 1].Situacao.Id;
                                if ($scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].Situacao.Id == 4) {
                                    if (idSituacaoEnvio == 2 && $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].Situacao.Id != idSituacaoEnvio) {
                                        var Situacao = "";
                                        switch (idSituacaoEnvio) {
                                            case 2:
                                                Situacao = "Aguardando publicação";
                                                break;
                                            case 4:
                                                Situacao = "Rascunho";
                                                break;
                                        }
                                        $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].Situacao.Id = idSituacaoEnvio;
                                        $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].BolPodeEnviar = Envios[Envios.length - 1].BolPodeEnviar;
                                        $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].Situacao.Descricao = Situacao;
                                    }
                                    $scope.listaEnviosTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos = angular.copy(Envios[Envios.length - 1].EtapaInscricaoEnvioGrupos);
                                }
                            }
                        }
                    }
                }
                $scope.listaTurmasCache[idx] = angular.copy($scope.objTurmaSelecionada);
                $scope.listaTurmas = angular.copy($scope.listaTurmasCache);
            }
        }
        //$scope.safeApply();
    };

    $scope.$on("changeListaEnviosTurma", function (event, objRetorno) {
        //callback executado ao término do salvamento na rotina de um novo envio
        //pode ser que se refira à um salvamento recorrente - salvando pela 2ª vez (não incrementa o total de envios)
        //console.log("changeListaEnviosTurma");
        var totalEnvios = 0;
        var Envios = [];
        if (objRetorno.TurmaEnvio && angular.isArray(objRetorno.TurmaEnvio) && objRetorno.TurmaEnvio.length > 0) {
            totalEnvios = Math.max(objRetorno.TurmaEnvio.length, ((objRetorno.TotalEnvios) ? objRetorno.TotalEnvios : 0));
            Envios = angular.copy(objRetorno.TurmaEnvio);
        }
        $scope.objTurmaSelecionada.TotalEnvios = totalEnvios;
        that.atualizaDadosTurmas(totalEnvios, Envios, objRetorno);
    });

    $scope.$on("changeListaInscricoesTurma", function (event, objRetorno) {
        //callback executado ao término do salvamento, na rotina de edição de envio previamente realizado(p.ex: editando um rascunho)
        //nesse caso somente é possível alterar no front a situação na relação de envios para 'Aguardando aprovação' do respectivo envio
        console.log("changeListaInscricoesTurma");
        var totalEnvios = 0;
        var Envios = [];
        if (objRetorno.Envio && angular.isArray(objRetorno.Envio) && objRetorno.Envio.length > 0) {
            totalEnvios = objRetorno.Envio.length;
            Envios = angular.copy(objRetorno.Envio);
        }
        that.atualizaDadosTurmas(totalEnvios, Envios, objRetorno);
    });

    $scope.$on("changeListaEnviosEquipe", function (event, objRetorno) {
        console.log("changeListaEnviosEquipe");
        var totalEnvios = 0;
        var Envios = [];
        if (objRetorno.Envio && angular.isArray(objRetorno.Envio) && objRetorno.Envio.length > 0) {
            totalEnvios = objRetorno.Envio.length;
            Envios = angular.copy(objRetorno.TurmaEnvio);
        }
        that.atualizaDadosEquipes(totalEnvios, Envios, objRetorno);
    });

    $scope.$on("changeListaInscricoesEquipe", function (event, objRetorno) {
        console.log("changeListaInscricoesEquipe");
        var totalEnvios = 0;
        var Envios = [];
        if (objRetorno.Envio && angular.isArray(objRetorno.Envio) && objRetorno.Envio.length > 0) {
            totalEnvios = objRetorno.Envio.length;
            Envios = angular.copy(objRetorno.Envio);
        }
        that.atualizaDadosEquipes(totalEnvios, Envios, objRetorno);
    });

    this.init = function () {
        var initApi = true;
        if (that.extendFunctions) if (typeof (that.extendFunctions) == "function") {
            initApi = false;
        }
        if (initApi) {
            projetoTools.extendFunctions(that);
            projetoTools.extendFunctions($scope);
            projetoTools.extendNativeFunctions($scope);
        }

        $scope.config.idEdicao = $scope.idEdicao;

        $http.get('/AVA/Projetos/Servico/GetEtapaConfiguracaoByIdEtapa/?idEtapa=' + $scope.idEtapa)
        .success(function (data) {
            $scope.etapa = data.EtapaConfiguracao.Etapa;
            $scope.etapaConfig = data.EtapaConfiguracao;

            //console.log($scope.etapa);

            $scope.situacaoEtapa = $scope.getStatusEtapa();

            that.finishInit();
            //$scope.safeApply();
        }).error(
        function () {
            alert("Erro ao buscar configuração da Etapa.");
        });
    };

    this.prepararDadosTurmas = function () {
        //correção de itens repetidos nas relações de novo materiais
        var inscricoes = [];
        $scope.listaTurmasCache = [];
        $scope.listaEnviosTurmas = [];
        for (var curTurma in $scope.listaInscricoesTurmas) {
            //prepara relação de inscrições por turmas
            if (inscricoes.indexOf($scope.listaInscricoesTurmas[curTurma].Inscricao.Id) == -1) {
                inscricoes.push(angular.copy($scope.listaInscricoesTurmas[curTurma].Inscricao.Id));

                var tempTurma = angular.copy($scope.listaInscricoesTurmas[curTurma]);

                //por padrão prepara para a array vazia para sempre realizar novos envios a partir dessa relação
                tempTurma.Inscricao.EtapaInscricaoEnvios = [];

                $scope.listaTurmasCache.push(tempTurma);
            }
            //prepara a relação de envios realizados em inscrições por turmas
            if ($scope.listaInscricoesTurmas[curTurma].TotalEnvios > 0) {
                for (var envio in $scope.listaInscricoesTurmas[curTurma].Inscricao.EtapaInscricaoEnvios) {
                    var tempTurma = angular.copy($scope.listaInscricoesTurmas[curTurma]);

                    //por padrão prepara para a array com um único e respectivo envio nessa relação
                    tempTurma.Inscricao.EtapaInscricaoEnvios = [];
                    var envio = angular.copy($scope.listaInscricoesTurmas[curTurma].Inscricao.EtapaInscricaoEnvios[envio]);
                    envio.indiceTurma = curTurma;
                    envio.indiceEnvio = envio;
                    tempTurma.Inscricao.EtapaInscricaoEnvios.push(envio);
                    $scope.listaEnviosTurmas.push(angular.copy(tempTurma));
                }
            }
        }
        $scope.listaTurmas = angular.copy($scope.listaTurmasCache);
        /*
        !!! - finalizar a lógica para equipes
        inscricoes = [];
        for (var equipe in $scope.listaInscricoesEquipes) {
        if (inscricoes.indexOf($scope.listaInscricoesEquipes[equipe].Inscricao.Id) == -1) {
        inscricoes.push(angular.copy($scope.listaInscricoesEquipes[equipe].Inscricao.Id));
        $scope.listaEquipesCache.push(angular.copy($scope.listaInscricoesEquipes[equipe]));
        }
        if ($scope.listaInscricoesEquipes[equipe].TotalEnvios > 0) {
        for (var envio in $scope.listaInscricoesEquipes[equipe].Inscricao.EtapaInscricaoEnvios) {
        $scope.listaEnviosEquipes.push(angular.copy($scope.listaInscricoesEquipes[equipe]));
        }
        }
        }
        */
    };

    this.finishInit = function () {
        if ($scope.ctrlRajadaEvento) {
            $timeout.cancel($scope.ctrlRajadaEvento);
            $scope.ctrlRajadaEvento = undefined;
        }
        $scope.ctrlRajadaEvento = $timeout(function (event) {
            that.prepararDadosTurmas();

            if ($scope.situacaoEtapa == 1)
                $scope.bolEtapaLiberada = true;
            if ($scope.indexOfId($scope.etapa.Edicao.InscricoesTipos, 1) != -1)
                $scope.bolInscricaoPorTurma = true;
            if ($scope.indexOfId($scope.etapa.Edicao.InscricoesTipos, 2) != -1 || $scope.indexOfId($scope.etapa.Edicao.InscricoesTipos, 3) != -1)
                $scope.bolInscricaoPorEquipe = true;
            if ($scope.bolInscricaoPorTurma && angular.isArray($scope.listaInscricoesTurmas) && $scope.listaInscricoesTurmas.length > 0)
                $scope.bolInscritoComTurma = true;
            if ($scope.bolInscricaoPorEquipe && angular.isArray($scope.listaInscricoesEquipes) && $scope.listaInscricoesEquipes.length > 0)
                $scope.bolInscritoComEquipe = true;
            if ($scope.bolInscricaoPorTurma && angular.isArray($scope.listaEnviosTurmas) && $scope.listaEnviosTurmas.length > 0)
                $scope.bolInscritoComEnviosTurma = true;
            if ($scope.bolInscricaoPorEquipe && angular.isArray($scope.listaEnviosEquipes) && $scope.listaEnviosEquipes.length > 0)
                $scope.bolInscritoComEnviosEquipe = true;


            /* Inicio controle das Abas */
            if (angular.isArray($scope.listaInscricoesTurmas) && $scope.listaInscricoesTurmas.length > 0) {
                $scope.abaSeletor.atual = 1;
                if (angular.isArray($scope.listaEnviosTurmas) && $scope.listaEnviosTurmas.length > 0) {
                    $scope.aba_atual = 1;
                } else {
                    $scope.aba_atual = 2;
                }
            }
            if ($scope.abaSeletor.atual == 0) { // Se existir por Equipe, vem aberto
                if ($scope.aba_atual > 0 && $scope.aba_atual < 3)
                    $scope.abaSeletor.atual = 1;
                else {
                    if (angular.isArray($scope.listaInscricoesEquipes) && $scope.listaInscricoesEquipes.length > 0) {
                        $scope.abaSeletor.atual = 1;
                        if (angular.isArray($scope.listaEnviosTurmas) && $scope.listaEnviosTurmas.length > 0) {
                            $scope.aba_atual = 3;
                        } else {
                            $scope.aba_atual = 4;
                        }
                        if ($scope.abaSeletor.atual == 0 && $scope.aba_atual > 2 && $scope.aba_atual < 5)
                            $scope.abaSeletor.atual = 2;
                    }
                }
            }
            /*
            [1] - [Turma] Meus envios 
            [2] - [Turma] Novo material 
            [3] - [Equipe] Meus envios 
            [4] - [Equipe] Novo material 
            */

            $scope.loadingGeral = false;
        }, 250);
    };

    $scope.openAbaSeletor = function (idAba) {
        $scope.objEquipe = {};
        $scope.objTurmaSelecionada = {};
        $scope.idxEnvio = -1;
        if (idAba == 1) { //Turmas
            $scope.clearAllTurmaEquipeSelecao();
            if (angular.isArray($scope.listaEnviosTurmas) && $scope.listaEnviosTurmas.length > 0) {
                $scope.aba_atual = 1;
            } else {
                $scope.aba_atual = 2;
            }
        } else if (idAba == 2) { //Equipes
            $scope.clearAllTurmaEquipeSelecao();
            if ($scope.listaEnviosEquipes.length > 0) {
                $scope.aba_atual = 3;
            } else {
                $scope.aba_atual = 4;
            }
        }

        $scope.abaSeletor.atual = idAba;
        //$scope.safeApply();
    };

    $scope.openEnviosTurma = function () {
        if ($scope.listaEnviosTurmas.length > 0) {
            $scope.objEquipe = {};
            $scope.objTurmaSelecionada = {};

            $scope.$broadcast("limpaFormTurma", { clickTurma: true });

            angular.element("input[name=radio_turma]").prop("checked", false);
            angular.element("input[name=radio_equipe]").prop("checked", false);

            $scope.idxEnvio = -1;
            $scope.aba_atual = 1;
        }
    };

    $scope.openEnviosEquipe = function () {
        if ($scope.listaEnviosEquipes.length > 0) {
            $scope.objEquipe = {};
            $scope.objTurmaSelecionada = {};

            $scope.$broadcast("limpaFormTurma", { clickTurma: true });

            angular.element("input[name=radio_turma]").prop("checked", false);
            angular.element("input[name=radio_equipe]").prop("checked", false);

            $scope.idxEnvio = -1;
            $scope.aba_atual = 3;
        }
    };

    $scope.addNovoMaterialTurma = function () {
        $scope.objEquipe = {};
        $scope.objTurmaSelecionada = {};
        $scope.idxEnvio = -1;

        $scope.acesso.openListaEquipe = false;
        $scope.acesso.openListaTurma = false;


        $scope.bloqueiaAllTurma.block = false;
        $scope.clearAllTurmaEquipeSelecao();
        $scope.parceirosEnvioSelected = []; //Reseta lista de parceiros selecionado

        $scope.aba_atual = 2;

        $scope.listaTurmas = angular.copy($scope.listaTurmasCache);

        angular.forEach($scope.listaTurmas, function (valor, chave) {
            //valor.Inscricao.Id = 0;
            if (valor.Inscricao.EtapaInscricaoEnvios != null) {
                valor.Inscricao.EtapaInscricaoEnvios = null;
            }
        });

        angular.element("input[name=radio_turma]").prop("checked", false);
        $timeout(function () {
            $scope.acesso.openListaTurma = true;
            //$scope.safeApply();
        }, 200);
    };

    $scope.addNovoMaterialEquipe = function () {
        $scope.objEquipe = {};
        $scope.objTurmaSelecionada = {};
        $scope.idxEnvio = -1;

        $scope.acesso.openListaEquipe = false;
        $scope.acesso.openListaTurma = false;

        $scope.aba_atual = 4;
        $scope.bloqueiaAllEquipe.block = false;
        $scope.clearAllTurmaEquipeSelecao();
        $scope.parceirosEnvioSelected = []; //Reseta lista de parceiros selecionado

        angular.element("input[name=radio_equipe]").prop("checked", false);
        $timeout(function () {
            $scope.acesso.openListaEquipe = true;
        }, 200);
    };

    $scope.clearAllTurmaEquipeSelecao = function () {
        angular.element("input[name=radio_turma]").prop("checked", false);
        angular.element("input[name=radio_equipe]").prop("checked", false);
        $scope.objEquipe = {};
        $scope.objTurmaSelecionada = {};
        $scope.idxEnvio = -1;
    };

    $scope.checkTurma = function (turma) {
        $scope.objEquipe = {};
        $scope.objTurmaSelecionada = {};
        $scope.idxEnvio = -1;
        $scope.parceirosEnvioSelected = [];

        $scope.maxEnvio = 1;
        if ($scope.etapa) if ($scope.etapa.Edicao) if ($scope.etapa.Edicao.InscricoesTipos) {
            var objTipoInscricaoEtapa = $filter('filter')($scope.etapa.Edicao.InscricoesTipos, { Id: 1 }, true);
            if (objTipoInscricaoEtapa.length == 1) {
                if (objTipoInscricaoEtapa[0].MaxEnvio != 1 || $scope.etapa.MaxEnvio != 1 || $scope.etapaConfig.Etapa.MaxEnvio != 1) {
                    $scope.maxEnvio = Math.max(objTipoInscricaoEtapa[0].MaxEnvio, $scope.etapa.MaxEnvio, $scope.etapaConfig.Etapa.MaxEnvio);
                }
            }
        }

        $timeout(function () {
            var idx = -1;
            var els = angular.element("input[name=radio_turma]");
            angular.forEach(els, function (el, index) {
                if (angular.element(el).get(0).checked && angular.element(el).is(":visible")) {
                    idx = index;
                }
            });
            if (idx >= 0) {

                var lista = []
                if ($scope.aba_atual % 2 > 0) {
                    //edição de envio

                    //correção do índice com base no envio
                    if ($scope.listaEnviosTurmas[idx].Id != turma.Id || $scope.listaEnviosTurmas[idx].Inscricao.EtapaInscricaoEnvios[0].Id != turma.Inscricao.EtapaInscricaoEnvios[0].Id) {
                        angular.forEach($scope.listaEnviosTurmas, function (objIteracao, index) {
                            if (objIteracao.Inscricao.EtapaInscricaoEnvios != null && angular.isArray(objIteracao.Inscricao.EtapaInscricaoEnvios) && objIteracao.Id != turma.Id && objIteracao.Inscricao.EtapaInscricaoEnvios[0].Id != turma.Inscricao.EtapaInscricaoEnvios[0].Id) {
                                //indice da turma na relação de envios
                                idx = index;
                            }
                        });
                    }
                    //indice do envio
                    $scope.idxEnvio = 0; //idx;

                    lista = angular.copy($scope.listaEnviosTurmas);
                    $scope.objTurmaSelecionada = angular.copy(lista[idx]);
                    //$scope.objTurmaSelecionada = lista[idx];

                }
                else {
                    //novo envio
                    lista = angular.copy($scope.listaTurmasCache);

                    //remove as referências dos envios para que o formulário seja carregado vazio
                    angular.forEach(lista, function (valor, chave) {
                        if (valor.Inscricao.EtapaInscricaoEnvios != null) {
                            valor.Inscricao.EtapaInscricaoEnvios = null;
                        }
                    });

                    //$scope.objTurmaSelecionada = angular.copy(lista[idx]);

                    if (($scope.maxEnvio > 0 && lista[idx].TotalEnvios < $scope.maxEnvio) || ($scope.maxEnvio == 0)) {

                        $scope.objTurmaSelecionada = angular.copy(lista[idx]);

                        //$scope.objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios = null;
                        $scope.listaTurmas = angular.copy(lista);

                        //em novos envios, o índice do envio sempre é 0 zero
                        $scope.idxEnvio = 0;
                    }
                    else {
                        $scope.clearAllTurmaEquipeSelecao();
                        return false;
                    }
                }
                //console.log($scope.objTurmaSelecionada);
                $scope.$broadcast("limpaFormTurma", { clickTurma: true });
                $scope.forceRefresh = true;
                $timeout(function () {
                    $scope.forceRefresh = false;
                }, 500);
            }
            //$scope.safeApply();
        }, 300);
    };

    $scope.checkEquipe = function (obj) {
        $scope.objEquipe = {};
        $scope.objTurmaSelecionada = {};
        $scope.idxEnvio = -1;
        $scope.parceirosEnvioSelected = [];
        $timeout(function () {
            $scope.objEquipe = obj;
        }, 300);
    };

    this.isCheckTurma = function () {
        if (
            $scope.objTurmaSelecionada != null &&
            angular.isDefined($scope.objTurmaSelecionada) &&
            angular.isObject($scope.objTurmaSelecionada)
        ) {
            return true
        }
        else {
            return false
        }
    };

    this.isCheckTurmaEdicaoEnvio = function () {
        var checked = false;
        var els = angular.element("input[name=radio_turma]");
        angular.forEach(els, function (el, index) {
            if (angular.element(el).get(0).checked && angular.element(el).is(":visible")) {
                checked = true;
            }
        });
        if (
            checked &&
            $scope.objTurmaSelecionada != null &&
            angular.isDefined($scope.objTurmaSelecionada) &&
            angular.isObject($scope.objTurmaSelecionada)
        ) {
            return true
        }
        else {
            return false
        }
    };

    this.isCheckTurmaNovoEnvio = function () {
        var checked = false;
        var els = angular.element("input[name=radio_turma]");
        angular.forEach(els, function (el, index) {
            if (angular.element(el).get(0).checked && angular.element(el).is(":visible")) {
                checked = true;
            }
        });
        if (
            checked &&
            $scope.objTurmaSelecionada != null &&
            angular.isDefined($scope.objTurmaSelecionada) &&
            angular.isObject($scope.objTurmaSelecionada)
        ) {
            return true
        }
        else {
            return false
        }
    };

    $scope.getStatusEtapa = function () {

        if (!$scope.etapa) {
            return false;
        }

        var dataAtual = new Date();
        var dataInicioEtapa = new Date(parseInt($scope.etapa.DataInicio.substr(6), 10));
        var dataFimEtapa = new Date(parseInt($scope.etapa.DataFim.substr(6), 10));
        if (dataAtual >= dataInicioEtapa && dataAtual <= dataFimEtapa) {
            return 1;
        } else if (dataAtual < dataInicioEtapa) {
            return 2;
        } else if (dataAtual > dataFimEtapa) {
            return 3;
        } else {
            return 0;
        }
    };

    setTimeout(function () { that.init(); }, 10);



} ]);

