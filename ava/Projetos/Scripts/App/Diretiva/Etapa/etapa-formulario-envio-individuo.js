//"use strict";
angular.module('Inscricao.mista')
    .directive('etapaFormularioEnvioIndividuo', ['$http', '$document', 'EtapaFactory', '$timeout', function ($http, $document, $etapaFactory, $timeout) {
        return {
            restrict: 'E',
            //replace: true,
            templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/etapa-formulario-envio-individuo.html',
            scope: {
                objParametro: "=objParametro",
                objEtapa: "=objEtapa",
                etapaConfig: "=etapaConfig",
                usuario: "=usuarioLogado",
                acesso: "=acesso",
                bloqueiaAll: "=bloqueiaAll",
                defaultConfig: "=defaultConfig"
            },
            link: function (scope, element, attrs) {
                scope.verificaNomeGrupo = function (grupoName, indice, grupoMaxEnvio) {
                    if (grupoName == "") {
                        return indice;
                    } else if (grupoMaxEnvio == 1) {
                        return grupoName;
                    } else {
                        return grupoName + " " + indice;
                    }
                };

                //Objeto valida situação do formulário aberto
                scope.objFormValid = {
                    idfr: 0,
                    pristine: true,
                    dirty: false,
                    valid: false
                };

                scope.getStatusFormulario = function () {
                    scope.objFormValid = {
                        idfr: 0,
                        pristine: true,
                        dirty: false,
                        valid: false
                    };
                    scope.$broadcast("getFormStatus", scope.getRetornoStatusForm);
                };

                scope.getRetornoStatusForm = function (data) {
                    scope.objFormValid = data;
                };

                scope.reiniciarObjForm = function () {
                    scope.objFormValid = {
                        idfr: 0,
                        pristine: true,
                        dirty: false,
                        valid: false
                    };
                };
            }
        }
    } ]);

    angular.module('Inscricao.mista').controller('etapaFormularioEnvioIndividuoCtrl', ['$scope', '$filter', '$timeout', '$http', 'EtapaFactory', function ($scope, $filter, $timeout, $http, $etapaFactory) {
        /*
        *Declaração de variáveis e objetos 
        */
        var self = this;
        var objFormSave = {};
        var timeoutSalvar;

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

        //$scope.bolPodeEnviar = false;
        $scope.bolClicado = false;
        $scope.bolFeedbackEnviado = false;

        $scope.objParametroSelecionado = $scope.objParametro;
        //$scope.objParametroSelecionado = angular.copy($scope.objParametro);

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
        /* Fim declaração variáveis e objetos */


        $scope.$on("fnPassoAnterior", function (event) {
            $etapaFactory.abrirPrevPasso();
        });

        $scope.$on("fnPassoProximo", function (event) {
            $etapaFactory.abrirNextPasso();
        });

        $scope.enviarEtapaFormulario = function () {
            //$http.post("/AVA/Projetos/Etapa/VerificaTotalEnvioIncompleto",
            //{
            //    idInscricao: $scope.objParametroSelecionado.Inscricao.Id,
            //    idEtapa: $scope.etapaConfig.Etapa.Id
            //})
            $http({
                cache: false,
                params: {
                    idInscricao: $scope.objParametroSelecionado.Inscricao.Id,
                    idEtapa: $scope.etapaConfig.Etapa.Id,
                    '_': new Date().getTime()
                },
                url: "/AVA/Projetos/Etapa/VerificaTotalEnvioIncompleto",
                method: 'POST'
            }).success(function (data) {
                if (data.incompleto != null) {
                    var msgConfirm = "";

                    if (data.incompleto.total > 1) {
                        msgConfirm = "Existem " + data.incompleto.total + " materiais que não foram Gravados corretamente e serão descartados ao concluir o envio. Deseja continuar?";
                    } else {
                        msgConfirm = "Existe " + data.incompleto.total + " material que não foi Gravado corretamente e será descartado ao concluir o envio. Deseja continuar?";
                    }

                    if (confirm(msgConfirm)) {
                        self.finalizarEnvioFormulario($scope.objParametroSelecionado.Inscricao.Id, $scope.etapaConfig.Etapa.Id);
                    }

                } else if (data.sucesso != null) {
                    if (confirm('O seu material será enviado para aprovação e não poderá mais ser alterado. Deseja continuar?')) {
                        self.finalizarEnvioFormulario($scope.objParametroSelecionado.Inscricao.Id, $scope.etapaConfig.Etapa.Id);
                    }
                }

            }).error(function (data) {
                alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
            });
        };

        this.finalizarEnvioFormulario = function (idInscricao, idEtapa) {
            $scope.loadingSalvar = true;
            //$http.post("/AVA/Projetos/Etapa/EnviarEtapaFormularioIndividual",
            //{
            //    idInscricao: $scope.objParametroSelecionado.Inscricao.Id,
            //    idEtapa: $scope.etapaConfig.Etapa.Id
            //})
            $http({
                cache: false,
                params: {
                    idInscricao: $scope.objParametroSelecionado.Inscricao.Id,
                    idEtapa: $scope.etapaConfig.Etapa.Id,
                    '_': new Date().getTime()
                },
                url: "/AVA/Projetos/Etapa/EnviarEtapaFormularioIndividual",
                method: 'POST'
            }).success(function (data) {
                if (data.successo != null) {
                    if (data.Envios != null) {
                        $scope.objParametroSelecionado.Inscricao.EtapaInscricaoEnvios = data.Envios;
                        $scope.$emit("changeInscricaoIndividuo", data);
                    }
                }
            }).error(function (err) {
                alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
            }).then(function (data) {
                $scope.loadingSalvar = false;
            });
        };

        $scope.salvarEtapaFormulario = function () {
            objFormSave.Turma =
            {
                Id: $scope.objParametroSelecionado.Id,
                Inscricao:
                {
                    Id: $scope.objParametroSelecionado.Inscricao.Id
                }
            };
            $scope.loadingSalvar = true;
            if ($scope.objAbaSelecionada.materialIdx >= 0) {
                objFormSave.Ordem = $scope.objAbaSelecionada.materialIdx;
            } else {
                alert("Clique em um formulário para realizar o envio");
                $scope.loadingSalvar = true;
                return false;
            }

            $scope.$broadcast("salvarFormularioRascunho", $scope.retornoSalvar);
        };

        $scope.retornoSalvar = function (data) {
            if (data) if (data.retorno.idFormularioResposta > 0) {
                //alert('resposta = ' + data.retorno.idFormularioResposta);
                var idInscricao = 0;
                if ($scope.objParametroSelecionado.Inscricao) if ($scope.objParametroSelecionado.Inscricao.Id) if (!isNaN($scope.objParametroSelecionado.Inscricao.Id)) if (parseInt($scope.objParametroSelecionado.Inscricao.Id) > 0)
                    idInscricao = parseInt($scope.objParametroSelecionado.Inscricao.Id);
                //$http.post("/AVA/Projetos/Etapa/SalvarEtapaFormularioIndividual",
                //{
                //    idInscricao: idInscricao,
                //    idUsuario: $scope.usuario.Id,
                //    idEdicao: $scope.objEtapa.Edicao.Id,
                //    idEtapa: $scope.etapaConfig.Etapa.Id,
                //    idFormularioResposta: data.retorno.idFormularioResposta,
                //    idGrupoForm: $scope.objAbaSelecionada.idGrupoForm,
                //    intOrdem: ($scope.objAbaSelecionada.materialIdx + 1)
                //})
                $http({
                    cache: false,
                    params: {
                        idInscricao: idInscricao,
                        idUsuario: $scope.usuario.Id,
                        idEdicao: $scope.objEtapa.Edicao.Id,
                        idEtapa: $scope.etapaConfig.Etapa.Id,
                        idFormularioResposta: data.retorno.idFormularioResposta,
                        idGrupoForm: $scope.objAbaSelecionada.idGrupoForm,
                        intOrdem: ($scope.objAbaSelecionada.materialIdx + 1),
                        '_': new Date().getTime()
                    },
                    url: "/AVA/Projetos/Etapa/SalvarEtapaFormularioIndividual",
                    method: 'POST'
                }).success(function (data) {
                    if (timeoutSalvar) {
                        $timeout.cancel(timeoutSalvar);
                    }

                    if (data.Envios != null) {
                        $scope.objParametroSelecionado.Inscricao.EtapaInscricaoEnvios = data.Envios;
                        $scope.objParametroSelecionado.Inscricao.Id = data.idInscricaoRetorno;
                        //$scope.objParametroSelecionado.Inscricoes = data.listaInscricoes;
                        $scope.bloqueiaAll.block = true;
                        $scope.acesso.primeiro = false;

                        $scope.$emit("changeListaInscricoesIndividuo", data);

                        $scope.rascunhoSalvo = true;
                        timeoutSalvar = $timeout(function () {
                            $scope.rascunhoSalvo = false;
                        }, 3000);
                    } else if (data.error != null) {
                        alert(data.error.mensagem);
                    }

                }).error(function (data) {
                    alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
                }).then(function (data) {
                    $scope.loadingSalvar = false;
                });
            }
        };

        $scope.$watch("bolClicado", function (newVal, oldVal) {
            $scope.bolFeedbackEnviado = false;
            //$scope.$broadcast('getFormStatus', $scope.getStatusForm);
            $scope.getStatusFormulario();
        }, true);


        $scope.$on("limpaFormTurma", function (event, options) {
            $scope.limpaFormularioEnvio();
        });

        $scope.$on("setFormularioAlterado", function (event) {
            if ($scope.objParametroSelecionado.Inscricao.EtapaInscricaoEnvios != null) {
                $scope.objParametroSelecionado.Inscricao.EtapaInscricaoEnvios[0].BolPodeEnviar = false;
            }
        });

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

            $scope.reiniciarObjForm();

            $timeout(function () {
                $etapaFactory.selectFirstMaterial();
            }, 100);
        };

        this.abrirUnicoMaterial = function (indexGrupo, indexMaterial, idGrupoForm, idFormulario, idFormResposta) {
            $scope.getStatusFormulario();

            if ($scope.objFormValid.pristine) {
                this.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                this.abrirFormularioDireto(indexGrupo, indexMaterial, idFormulario, idFormResposta);
            } else {
                if (confirm('Você alterou o formulário e não salvou como rascunho. Caso continue os dados alterados não serão salvos.')) {
                    this.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                    this.abrirFormularioDireto(indexGrupo, indexMaterial, idFormulario, idFormResposta);
                }
            }
        };

        this.abrirGrupoMaterial = function (indexGrupo, indexMaterial, idGrupoForm, idFormResposta) {
            //$scope.objAbaSelecionada.grupoIdx = indexGrupo;
            //$scope.objAbaSelecionada.materialIdx = indexMaterial;
            //$scope.$broadcast("getFormStatus", $scope.getStatusForm);
            $scope.getStatusFormulario();

            if ($scope.objFormValid.pristine) {
                this.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                this.abrirFormularioOptativo(indexGrupo, indexMaterial, idGrupoForm, idFormResposta);
            } else {
                if (confirm('Você alterou o formulário e não salvou como rascunho. Caso continue os dados alterados não serão salvos.')) {
                    this.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                    this.abrirFormularioOptativo(indexGrupo, indexMaterial, idGrupoForm, idFormResposta);
                }
            }
        };

        //Abre o formulário direto
        this.abrirFormularioDireto = function (indexGrupo, indexMaterial, idFormulario, idFormResposta) {
            $scope.bolClicado = !$scope.bolClicado;
            $scope.FormEnvio.Formulario.FormularioTipo.Id = 0;
            $scope.FormEnvio.Formulario.GrupoFormulario.Id = 0;

            $scope.FormEnvio.idFormulario = idFormulario;
            $scope.FormEnvio.idFormularioResposta = idFormResposta;
            $scope.FormEnvio.materialSelecionado = indexMaterial;
        };


        //Função para abrir formulario optativo
        this.abrirFormularioOptativo = function (indexGrupo, indexMaterial, idGrupoForm, idFormResposta) {
            $scope.bolClicado = !$scope.bolClicado;

            //Verifica se esta Turma tem envios
            if ($scope.objParametroSelecionado.Inscricao.EtapaInscricaoEnvios != null && idFormResposta > 0) {
                $scope.FormEnvio.Formulario.FormularioTipo.Id = 2;
                $scope.FormEnvio.Formulario.GrupoFormulario.Id = idGrupoForm;
            } else { //Esta turma não tem envios, então abre o grupo de formulários para escolha
                $scope.FormEnvio.idFormulario = 0;
                $scope.FormEnvio.Formulario.FormularioTipo.Id = 2;
                $scope.FormEnvio.Formulario.GrupoFormulario.Id = idGrupoForm;
            }

            //var objGrupo = $scope.$parent.etapaConfig.EtapaGrupos
            if (idFormResposta == 0) {
                $scope.FormEnvio.idFormulario = 0;
            }
            $scope.FormEnvio.idFormularioResposta = idFormResposta;
            $scope.FormEnvio.materialSelecionado = indexMaterial;
        };


        //Marca uma aba como ativa, de acordo com o grupo e indice do material
        this.selecionarAbaByIdxGrupoMaterial = function (idxGrupo, idxMaterial, idGrupoForm) {
            $scope.objAbaSelecionada.grupoIdx = idxGrupo;
            $scope.objAbaSelecionada.materialIdx = idxMaterial;
            $scope.objAbaSelecionada.idGrupoForm = idGrupoForm;
        };

        //Pega formulario resposta de  acordo com ordem do material e ordem do grupo
        this.getIdFormRespostaByOrdem = function (idx, idEtapaGrupo) {
            var idFormularioResposta = 0;
            var objInscricaoSelecionada = $scope.objParametroSelecionado;

            if (objInscricaoSelecionada.Inscricao != null) {
                if (objInscricaoSelecionada.Inscricao.EtapaInscricaoEnvios != null) {
                    if (objInscricaoSelecionada.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos != null) {
                        var objGrupo = $filter('filter')(objInscricaoSelecionada.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: idEtapaGrupo} }, true);

                        if (objGrupo.length > 0) {
                            //Existe envio neste grupo
                            //Só pode ter apenas um GRUPO, então usar indice [0], parametro 'true' no final do filter, indica valor absoluto do filtro, pois antes 1, filtrava 10,11,21, etc.
                            var objResposta = $filter('filter')(objGrupo[0].EtapaInscricaoEnvioGrupoRespostas, { Ordem: (idx + 1) }, true);

                            if (objResposta.length > 0) {
                                idFormularioResposta = objResposta[0].FormularioResposta.Id;
                                $scope.FormEnvio.idFormulario = objResposta[0].FormularioResposta.Formulario.Id;
                            }
                        }
                    }
                }
            }
            return idFormularioResposta;
        };

        this.getLoopTimes = function (indice, objeto) {
            var newArray = new Array();
            for (var i = 0; i < indice; i++) {
                newArray[i] = objeto;
            }
            return newArray;
        };


        this.init = function () {
            $timeout(function () {
                $scope.limpaFormularioEnvio()
            }, 100);
        };

        self.init();

    } ]);


