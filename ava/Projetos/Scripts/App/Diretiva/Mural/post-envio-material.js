angular.module('Mural').directive('postEnvioMaterial', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Mural/post-envio-material.html',
        scope: {
            usuario: "=usuario",
            post: "=post",
            comentario: "=comentario",
            objMensagemRapida: "=mensagemRapida",
            objEdicao: "=edicao",
            objEtapa: "=etapa",
            bolAdm: "=bolAdm",
            defaultConfig: "=defaultConfig",
            campoRelacionado: "=campoRelacionado"

        },
        controller: ['$http', '$scope', "$rootScope", '$timeout', '$filter', 'EtapaFactory', function ($http, $scope, $rootScope, $timeout, $filter, $etapaFactory) {
            $scope.objEdicaoPost = $scope.objEdicao;
            
            var self = this;

            self.bolEscondeCurtir = false;

            $scope.etapaEnvioGrupos = [];
            $scope.envio = {};
            $scope.currentIndex = 0;
            $scope.loadingSituacaoEnvio = false;
            $scope.loadingDestaqueEnvio = false;
            $scope.loadingMaterialJogoEnvio = false;
            $scope.envioParceira = null;
            $scope.turmaParceira = null;

            $scope.envioParceiraProxima = null;
            $scope.turmaParceiraProxima = null;

            $scope.arraySituacao = [];
            $scope.arraySituacao.push({ Id: 1, Descricao: "Publicado" });
            $scope.arraySituacao.push({ Id: 2, Descricao: "Novo" });
            $scope.arraySituacao.push({ Id: 3, Descricao: "Pendente" });
            $scope.arraySituacao.push({ Id: 4, Descricao: "Rascunho" });
            $scope.arraySituacao.push({ Id: 5, Descricao: "Pré-aprovado" });
            $scope.arraySituacao.push({ Id: 6, Descricao: "Excluído" });
            if ($scope.post != null)
                $scope.idMensagem = $scope.post.timeline.IdMensagemrapida;

            // StepNavigationLink
            // default values before server results
            $scope.stepNavigationLink =
            {
                isPreviousEnable: false,
                isNextEnable: false,
                currentStep: 0,
                totalSteps: 0,
                previousLink: "",
                nextLink: ""
            }

            


            /* Formulário */
            $scope.bolClicado = false;
            $scope.FormEnvio = {};
            $scope.FormEnvio.Formulario = {};
            $scope.FormEnvio.Formulario.FormularioTipo = { Id: 0 };
            $scope.FormEnvio.Formulario.GrupoFormulario = { Id: 0 };
            $scope.FormEnvio.materialSelecionado = -1;

            //Objeto para controlar a aba ativa
            $scope.objAbaSelecionada = {
                grupoIdx: -1,
                materialIdx: -1,
                idGrupoForm: 0
            };
            
            
            /* Turma parceira 
            ====================*/
            if ($scope.objMensagemRapida) if ($scope.objMensagemRapida.EtapaInscricaoEnvio) {
                if ($scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao) if ($scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Turma) {
                    if ($scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Turma.Parceira) if ($scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Turma.Parceira.LinkPostEnvio) if ($scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Turma.Parceira.LinkPostEnvio.FormularioParticipanteEnvio) {
                        $scope.envioParceira = $scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Turma.Parceira.LinkPostEnvio.FormularioParticipanteEnvio;
                        $scope.turmaParceira = $scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Turma.Parceira;
                        
                    }
                }
            }
            /* FIM Turma Parceira 
            ====================*/

            /* Turma parceira - Prox Etapa
            ====================*/
            if ($scope.post != null)
                $http.post("/AVA/Projetos/Post/GetProjetoInscricaoAndLinks", { idMensagem: $scope.post.timeline.IdMensagemrapida, idEdicao: $scope.objEdicao.Id }).then(function (data) {
                
                    if (data.data.status == true) {
                        $scope.envioParceiraProxima = data.data.next.EtapaInscricaoEnvio.Inscricao.Turma.Parceira.LinkPostEnvio.FormularioParticipanteEnvio;
                        $scope.turmaParceiraProxima = data.data.next.EtapaInscricaoEnvio.Inscricao.Turma.Parceira;
                    
                    }
                }).catch(function (e) {
                    console.log("errro chamada getprojeto! :", e);
                    //throw e; // rethrow to not marked as handled, 
                    // in $q it's better to `return $q.reject(e)` here
                });

            /* FIM Turma Parceira - Prox Etapa
            ====================*/

            if ($scope.objMensagemRapida) if ($scope.objMensagemRapida.EtapaInscricaoEnvio) {
                $scope.envio = $scope.objMensagemRapida.EtapaInscricaoEnvio;
                if ($scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa) {
                    $scope.etapa = $scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa;
                    $scope.edicao = $scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa.Edicao;
                    $scope.etapaEnvioGrupos = $scope.objMensagemRapida.EtapaInscricaoEnvio.EtapaInscricaoEnvioGrupos;
                }
            }



            this.CreateStepNavegationLink = () =>
            {
                // StepNavigationLinkParameter (EtapaController.cs)
                let parameter = 
                   {
                       idProjeto : $scope.edicao.Projeto.Id,
                       idEdicao : $scope.edicao.Id,
                       idEtapa : $scope.etapa.Id,
                       IdProjetoInscricaoEnvio : $scope.envio.Id
                   }               

                $http
                    .post("/AVA/ProjetoApi/v1/Etapa/CreateStepNavigationLink", parameter)
                    .then
                    (
                        (sucessResponse) => $scope.stepNavigationLink = sucessResponse.data,
                        (error) => console.log(error)
                    )
            }
            // Call once per post
            this.CreateStepNavegationLink();

            $scope.verificaNomeGrupo = function (grupoName, indice, grupoMaxEnvio) {
                if (grupoName == "") {
                    return indice;
                } else if (grupoMaxEnvio == 1) {
                    return grupoName;
                } else {
                    return grupoName + " " + indice;
                }
            };

            $scope.limpaFormularioEnvio = function () {
                $scope.bolFeedbackEnviado = false;

                $scope.FormEnvio.idFormulario = 0;
                $scope.FormEnvio.idFormularioResposta = 0;
                $scope.FormEnvio.Formulario.FormularioTipo = { Id: 0 };
                $scope.FormEnvio.Formulario.GrupoFormulario = { Id: 0 };
                $scope.FormEnvio.materialSelecionado = -1;

                //Objeto para controlar a aba ativa
                $scope.objAbaSelecionada = {
                    grupoIdx: -1,
                    materialIdx: -1,
                    idGrupoForm: 0
                };

                $timeout(function () {
                    $etapaFactory.selectFirstMaterial();
                }, 100);
            };

            $scope.$on("fnPassoAnterior", function (event) {
                $etapaFactory.abrirPrevPasso();
            });

            $scope.$on("fnPassoProximo", function (event) {
                $etapaFactory.abrirNextPasso();
            });

            $scope.$on("votacaoAbertaJuriPopular", function (event, obj) {
                //Esconde curtir enquanto a votação estiver aberta
                self.bolEscondeCurtir = obj.bolVotacaoAberta;
            });

            //Faz um brodcast pra saber se votação esta aberta (pra quando o primeiro brodcast do votacao-simples.js falhar)
            $rootScope.$broadcast("estadoVotacaoJuriPopular", {});

            this.atualizarSituacaoEnvio = function () {
                if (!$scope.loadingSituacaoEnvio) {
                    $scope.loadingSituacaoEnvio = true;
                    $http.post("/AVA/Projetos/Etapa/AtualizarSituacaoEnvio",
                    {
                        idInscricaoEnvio: $scope.objMensagemRapida.EtapaInscricaoEnvio.Id,
                        idInscricao: $scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Id,
                        idEtapa: $scope.etapa.Id,
                        idSituacao: $scope.objMensagemRapida.EtapaInscricaoEnvio.Situacao.Id
                    }).success(function (data) {

                    }).error(function (data) {
                        alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
                    }).then(function (data) {
                        $scope.loadingSituacaoEnvio = false;
                    });
                }
            };

            this.atualizarDestaqueEnvio = function () {
                if (!$scope.loadingDestaqueEnvio) {
                    $scope.loadingDestaqueEnvio = true;
                    $http.post("/AVA/Projetos/Etapa/AtualizarDestaqueEnvio",
                    {
                        idInscricaoEnvio: $scope.objMensagemRapida.EtapaInscricaoEnvio.Id,
                        idInscricao: $scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Id,
                        idEtapa: $scope.etapa.Id,
                        bolDestaque: $scope.objMensagemRapida.EtapaInscricaoEnvio.BolDestaque,
                        bolPreSelecao: $scope.objMensagemRapida.EtapaInscricaoEnvio.BolPreSelecao
                    }).success(function (data) {

                    }).error(function (data) {
                        alert("Ocorreu um erro ao tentar esta operação. Tente novamente atualizando a página!");
                    }).then(function (data) {
                        $scope.loadingDestaqueEnvio = false;
                    });
                }
            };

            this.atualizarMaterialJogoEnvio = function () {
                if (!$scope.loadingMaterialJogoEnvio) {
                    $scope.loadingMaterialJogoEnvio = true;
                    $http.post("/AVA/Projetos/Etapa/AtualizarMaterialJogoEnvio",
                    {
                        idInscricaoEnvio: $scope.objMensagemRapida.EtapaInscricaoEnvio.Id,
                        idInscricao: $scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Id,
                        idEtapa: $scope.etapa.Id,
                        bolMaterialJogo: $scope.objMensagemRapida.EtapaInscricaoEnvio.BolMaterialJogo
                    }).success(function (data) {

                    }).error(function (data) {
                        alert("Ocorreu um erro ao tentar esta operação. Tente novamente atualizando a página!");
                    }).then(function (data) {
                        $scope.loadingMaterialJogoEnvio = false;
                    });
                }
            };

            this.abrirMaterial = function (grupoResposta, idGrupoForm, indexGrupo, indexMaterial, grupo) {
                if (grupoResposta) {
                    if (grupoResposta.FormularioResposta) {
                        if (grupoResposta.FormularioResposta.Formulario) {
                            $scope.bolClicado = !$scope.bolClicado;
                            $scope.FormEnvio.idFormulario = grupoResposta.FormularioResposta.Formulario.Id;
                            $scope.FormEnvio.idFormularioResposta = grupoResposta.FormularioResposta.Id;

                            //console.log('DENTRO DO GRUPO');
                            //console.log(grupo);
                            var ordemForm = 0;
                            try {
                                if (grupo.EtapaInscricaoEnvioGrupoRespostas != null) if (grupo.EtapaInscricaoEnvioGrupoRespostas.length > 0) {
                                    ordemForm = grupo.EtapaInscricaoEnvioGrupoRespostas[0].FormularioResposta.Formulario.Id;
                                }

                            } catch (err) { };
                            self.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm, ordemForm);
                        }
                    }
                }
            };

            //Marca uma aba como ativa, de acordo com o grupo e indice do material
            this.selecionarAbaByIdxGrupoMaterial = function (idxGrupo, idxMaterial, idGrupoForm, ordemForm) {
                $scope.objAbaSelecionada.grupoIdx = idxGrupo;
                $scope.objAbaSelecionada.materialIdx = idxMaterial;
                $scope.objAbaSelecionada.idGrupoForm = idGrupoForm;
                $scope.objAbaSelecionada.ordemForm = ordemForm;
            };


            this.situacaoEtapa = function (etapa) {
                // Pegar essa data do Servidor erro apra computadores com datas erradas.
                if (typeof etapa.DataResultado == 'object') {
                    var dataAtual = new Date();

                    if (dataAtual.getTime() > etapa.DataResultado.getTime()) { //Confira o resultado
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


            $timeout(function () {
                $scope.limpaFormularioEnvio();
            }, 200);


        }],
        controllerAs: "postEnvioMaterial"
    };
});
