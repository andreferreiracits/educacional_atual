//"use strict";
angular.module('Etapa')
    .directive('etapaFormularioEnvio', ['$http', '$document', 'EtapaFactory', '$timeout', function ($http, $document, $etapaFactory, $timeout) {
        return {
            restrict: 'E',
            //replace: true,
            templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/etapa-formulario-envio.html',
            scope: {
                config: "=config",
                turmap: "=turmap",
                etapaConfig: "=etapaConfig",
                defaultConfig: "=defaultConfig",
                idxEnvio: "=idxEnvio",
                forceRefresh: "=forceRefresh",
            },
            link: function (scope, element, attrs) {
                scope.forceRefreshDefined = false;
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

    angular.module('Etapa').controller('etapaFormularioEnvioCtrl', ['$scope', '$filter', '$timeout', '$http', 'EtapaFactory', 'projetoTools', function ($scope, $filter, $timeout, $http, $etapaFactory, projetoTools) {

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

        /*
        *Declaração de variáveis e objetos 
        */
        var that = this;
        var objFormSave = {};
        var timeoutSalvar;

        $scope.idx = 0;
        if (angular.isDefined($scope.idxEnvio)) if (!isNaN($scope.idxEnvio)) if ($scope.idxEnvio > 0) {
            $scope.idx = parseInt($scope.idxEnvio);
        }
        //console.log($scope.idx);
        //$scope.bolPodeEnviar = false;
        $scope.bolClicado = false;
        $scope.bolFeedbackEnviado = false;

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
            //    idInscricao: $scope.turmap.Inscricao.Id,
            //    idEtapa: $scope.etapaConfig.Etapa.Id
            //})
            $http({
                cache: false,
                params: {
                    idInscricao: $scope.turmap.Inscricao.Id,
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
                        that.finalizarEnvioFormulario($scope.turmap.Inscricao.Id, $scope.etapaConfig.Etapa.Id);
                    }

                } else if (data.sucesso != null) {
                    if (confirm('O seu material será enviado para aprovação e não poderá mais ser alterado. Deseja continuar?')) {
                        that.finalizarEnvioFormulario($scope.turmap.Inscricao.Id, $scope.etapaConfig.Etapa.Id);
                    }
                }

            }).error(function (data) {
                alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
            });
        };

        this.finalizarEnvioFormulario = function (idInscricao, idEtapa) {
            $scope.loadingSalvar = true;
            //$http.post("/AVA/Projetos/Etapa/EnviarEtapaFormulario",
            //{
            //    idInscricao: $scope.turmap.Inscricao.Id,
            //    idEtapa: $scope.etapaConfig.Etapa.Id
            //})

            var idEnvio = 0;
            if ($scope.idx >= 0 && angular.isArray($scope.turmap.Inscricao.EtapaInscricaoEnvios) && angular.isObject($scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx]) && $scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].Id > 0)
                idEnvio = $scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].Id;

            //console.log("finalizarEnvioFormulario:" + $scope.idx + "_" + idEnvio);

            var parametros = {
                idInscricao: $scope.turmap.Inscricao.Id,
                idEtapa: $scope.etapaConfig.Etapa.Id,
                idEnvio: idEnvio,
                '_': new Date().getTime()
            };
            $http({
                cache: false,
                params: parametros,
                url: "/AVA/Projetos/Etapa/EnviarEtapaFormulario",
                method: 'POST'
            }).success(function (data) {
                //alert('enviou');

                if (data.successo != null) {
                    if (data.TurmaEnvio != null) {
                        $scope.turmap.Inscricao.EtapaInscricaoEnvios = angular.copy(data.TurmaEnvio);
                        var indiceLista = projetoTools.indexOfId($scope.turmap.Inscricao.EtapaInscricaoEnvios, idEnvio);
                        $scope.$emit("changeListaEnviosTurma", {
                            TurmaEnvio: angular.copy(data.TurmaEnvio),
                            TotalEnvios: angular.copy(data.TurmaEnvio.lenght),
                            request: angular.copy(parametros),
                            response: angular.copy(data),
                            indice: angular.copy($scope.idxEnvio),
                            indiceEnvio: indiceLista,
                            idEnvio: angular.copy(idEnvio)
                        });
                    }
                }
            }).error(function (err) {
                alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
            }).then(function (data) {
                $scope.loadingSalvar = false;
            });
        };

        $scope.salvarEtapaFormulario = function () {
            var idEnvio = 0;
            if ($scope.idx >= 0 && angular.isArray($scope.turmap.Inscricao.EtapaInscricaoEnvios) && angular.isObject($scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx]) && $scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].Id > 0)
                idEnvio = $scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].Id;

            objFormSave.Turma =
            {
                Id: $scope.turmap.Id,
                Inscricao:
                {
                    Id: $scope.turmap.Inscricao.Id
                },
                IdEnvio: idEnvio
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

        $scope.retornoSalvar = function (original_data) {
            if (original_data) if (original_data.retorno.idFormularioResposta > 0) {
                //alert('resposta = ' + original_data.retorno.idFormularioResposta);
                //$http.post("/AVA/Projetos/Etapa/SalvarEtapaFormulario",
                //{
                //    idInscricao: $scope.turmap.Inscricao.Id,
                //    idEtapa: $scope.etapaConfig.Etapa.Id,
                //    idFormularioResposta: original_data.retorno.idFormularioResposta,
                //    idGrupoForm: $scope.objAbaSelecionada.idGrupoForm,
                //    intOrdem: ($scope.objAbaSelecionada.materialIdx + 1)
                //})
                //console.log("vai salvar");
                //console.log($scope.turmap);

                var idEnvio = 0;
                if ($scope.idx >= 0 && angular.isArray($scope.turmap.Inscricao.EtapaInscricaoEnvios) && angular.isObject($scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx]) && $scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].Id > 0)
                    idEnvio = $scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].Id;

                //console.log("retornoSalvar:" + $scope.idx + "_" + idEnvio);
                //console.log(original_data);
                $http({
                    cache: false,
                    params: {
                        idInscricao: $scope.turmap.Inscricao.Id,
                        idEtapa: $scope.etapaConfig.Etapa.Id,
                        idFormularioResposta: original_data.retorno.idFormularioResposta,
                        idGrupoForm: $scope.objAbaSelecionada.idGrupoForm,
                        intOrdem: ($scope.objAbaSelecionada.materialIdx + 1),
                        idEnvio: idEnvio,
                        '_': new Date().getTime()
                    },
                    url: "/AVA/Projetos/Etapa/SalvarEtapaFormulario",
                    method: 'POST'
                }).success(function (data) {
                    if (timeoutSalvar) {
                        $timeout.cancel(timeoutSalvar);
                    }

                    if (data.TurmaEnvio != null) {
                        $scope.turmap.Inscricao.EtapaInscricaoEnvios = angular.copy(data.TurmaEnvio);
                        var indiceLista = projetoTools.indexOfId($scope.turmap.Inscricao.EtapaInscricaoEnvios, idEnvio);
                        $scope.rascunhoSalvo = true;

                        $scope.$emit("changeListaEnviosTurma", {
                            TurmaEnvio: angular.copy(data.TurmaEnvio),
                            TotalEnvios: angular.copy(data.TurmaEnvio.lenght),
                            request: angular.copy(original_data.request),
                            response: angular.copy(original_data.retorno),
                            indice: angular.copy($scope.idx),
                            indiceEnvio: indiceLista,
                            idEnvio: angular.copy(idEnvio)
                        });

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
            if ($scope.turmap.Inscricao.EtapaInscricaoEnvios != null) {
                $scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].BolPodeEnviar = false;
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

        $scope.ctrlRajadaUnicoMaterial = undefined;
        this.abrirUnicoMaterial = function (indexGrupo, indexMaterial, idGrupoForm, idFormulario, idFormResposta) {
            if ($scope.ctrlRajadaUnicoMaterial) {
                $timeout.cancel($scope.ctrlRajadaUnicoMaterial);
                $scope.ctrlRajadaUnicoMaterial = undefined;
            }
            $scope.ctrlRajadaUnicoMaterial = $timeout(function (event) {
                $scope.getStatusFormulario();

                if ($scope.objFormValid.pristine) {
                    that.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                    that.abrirFormularioDireto(indexGrupo, indexMaterial, idFormulario, idFormResposta);
                } else {
                    if (confirm('Você alterou o formulário e não salvou como rascunho. Caso continue os dados alterados não serão salvos.')) {
                        that.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                        that.abrirFormularioDireto(indexGrupo, indexMaterial, idFormulario, idFormResposta);
                    }
                }
            }, 250);
        };

        $scope.ctrlRajadaGrupoMaterial = undefined;
        this.abrirGrupoMaterial = function (indexGrupo, indexMaterial, idGrupoForm, idFormResposta) {
            if ($scope.ctrlRajadaGrupoMaterial) {
                $timeout.cancel($scope.ctrlRajadaGrupoMaterial);
                $scope.ctrlRajadaGrupoMaterial = undefined;
            }
            $scope.ctrlRajadaGrupoMaterial = $timeout(function (event) {
                //$scope.objAbaSelecionada.grupoIdx = indexGrupo;
                //$scope.objAbaSelecionada.materialIdx = indexMaterial;
                //$scope.$broadcast("getFormStatus", $scope.getStatusForm);
                $scope.getStatusFormulario();

                if ($scope.objFormValid.pristine) {
                    that.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                    that.abrirFormularioOptativo(indexGrupo, indexMaterial, idGrupoForm, idFormResposta);
                } else {
                    if (confirm('Você alterou o formulário e não salvou como rascunho. Caso continue os dados alterados não serão salvos.')) {
                        that.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                        that.abrirFormularioOptativo(indexGrupo, indexMaterial, idGrupoForm, idFormResposta);
                    }
                }
            }, 250);
        };

        //Abre o formulário direto
        $scope.ctrlRajadaFormularioDireto = undefined;
        this.abrirFormularioDireto = function (indexGrupo, indexMaterial, idFormulario, idFormResposta) {
            if ($scope.ctrlRajadaFormularioDireto) {
                $timeout.cancel($scope.ctrlRajadaFormularioDireto);
                $scope.ctrlRajadaFormularioDireto = undefined;
            }
            $scope.ctrlRajadaFormularioDireto = $timeout(function (event) {

                $scope.bolClicado = !$scope.bolClicado;
                $scope.FormEnvio.Formulario.FormularioTipo.Id = 0;
                $scope.FormEnvio.Formulario.GrupoFormulario.Id = 0;

                $scope.FormEnvio.idFormulario = idFormulario;
                $scope.FormEnvio.idFormularioResposta = idFormResposta;
                $scope.FormEnvio.materialSelecionado = indexMaterial;
            }, 250);
        };


        //Função para abrir formulario optativo
        $scope.ctrlRajadaFormularioOptativo = undefined;
        this.abrirFormularioOptativo = function (indexGrupo, indexMaterial, idGrupoForm, idFormResposta) {
            if ($scope.ctrlRajadaFormularioOptativo) {
                $timeout.cancel($scope.ctrlRajadaFormularioOptativo);
                $scope.ctrlRajadaFormularioOptativo = undefined;
            }
            $scope.ctrlRajadaFormularioOptativo = $timeout(function (event) {
                $scope.bolClicado = !$scope.bolClicado;

                //Verifica se esta Turma tem envios
                if ($scope.turmap.Inscricao.EtapaInscricaoEnvios != null && idFormResposta > 0) {
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
            }, 250);
        };


        //Marca uma aba como ativa, de acordo com o grupo e indice do material
        $scope.ctrlRajadaSelecionarAbaByIdxGrupoMaterial = undefined;
        this.selecionarAbaByIdxGrupoMaterial = function (idxGrupo, idxMaterial, idGrupoForm) {
            if ($scope.ctrlRajadaSelecionarAbaByIdxGrupoMaterial) {
                $timeout.cancel($scope.ctrlRajadaSelecionarAbaByIdxGrupoMaterial);
                $scope.ctrlRajadaSelecionarAbaByIdxGrupoMaterial = undefined;
            }
            $scope.ctrlRajadaSelecionarAbaByIdxGrupoMaterial = $timeout(function (event) {
                $scope.objAbaSelecionada.grupoIdx = idxGrupo;
                $scope.objAbaSelecionada.materialIdx = idxMaterial;
                $scope.objAbaSelecionada.idGrupoForm = idGrupoForm;
            }, 250);
        };

        //Pega formulario resposta de  acordo com ordem do material e ordem do grupo
        this.getIdFormRespostaByOrdem = function (idx, idEtapaGrupo) {
            var idFormularioResposta = 0;
            if ($scope.turmap.Inscricao.EtapaInscricaoEnvios != null) {
                if ($scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].EtapaInscricaoEnvioGrupos != null) {
                    var objGrupo = $filter('filter')($scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: idEtapaGrupo} }, true);

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
            return idFormularioResposta;
        };

        this.getLoopTimes = function (indice, objeto) {
            var newArray = new Array();
            for (var i = 0; i < indice; i++) {
                newArray[i] = objeto;
            }
            return newArray;
        };

    } ]);


    angular.module('Etapa')
    .controller('passoCtrl', ['$scope', '$timeout', '$filter', 'EtapaFactory', function ($scope, $timeout, $filter, $etapaFactory) {
        var that = this;
        this.bolAdicionado = false;
        this.idTurma = 0;
        this.Passo = {
            maxPassoDinamico: 1,
            maxPassoByGrupo: 0
        };

        that.Turma = {};
        this.objGrupo = {};

        this.clearPassos = function () {
            that.bolAdicionado = false;
            that.Passo = {
                maxPassoDinamico: 1,
                maxPassoByGrupo: 0
            };
        };

        this.adicionarPasso = function (grupo) {
            $scope.getStatusFormulario();
            var totalRespondido = 0;
            //Verifica o total de form resposta para este Grupo, para validar se pode adicionar um novo passo
            if ($scope.turmap.Inscricao.EtapaInscricaoEnvios != null) {
                if ($scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].EtapaInscricaoEnvioGrupos != null) {
                    var objGrupo = $filter('filter')($scope.turmap.Inscricao.EtapaInscricaoEnvios[$scope.idx].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: grupo.Id} }, true);
                    if (objGrupo.length > 0) {
                        //totalRespondido = objGrupo[0].EtapaInscricaoEnvioGrupoRespostas.length; //Pega os respondidos do FORMULARIO aberto
                        var objTotalRespostas = $filter('filter')(objGrupo[0].EtapaInscricaoEnvioGrupoRespostas, { FormularioResposta: { BolValidado: true} }, true);
                        totalRespondido = objTotalRespostas.length;
                    }
                }
            }

            if ($scope.objFormValid.idfr > 0) {
                //console.error("totalRespondido = " + totalRespondido);
                //console.error("maxPassoDinamico = " + this.Passo.maxPassoDinamico);
                if ($scope.objFormValid.valid && (totalRespondido == this.Passo.maxPassoDinamico)) {
                    if (that.Passo.maxPassoByGrupo == 0) {
                        this.Passo.maxPassoDinamico++;
                        this.bolAdicionado = true;
                    } else if (this.Passo.maxPassoDinamico >= this.Passo.maxPassoByGrupo) {
                        alert('O máximo de passos permitidos é ' + this.Passo.maxPassoByGrupo);
                    } else {
                        this.Passo.maxPassoDinamico++;
                        this.bolAdicionado = true;
                    }
                } else {
                    alert("Para adicionar um novo passo, preencha o último corretamente.");
                }
            } else {
                alert("Para adicionar um novo passo, será preciso preencher os campos do último corretamente e apertar o botão Gravar!");
            }
        };

        this.getArrayDinamicoPasso = function (p_grupo) {
            var newArray = new Array();
            this.objGrupo = p_grupo;
            this.Passo.maxPassoByGrupo = this.objGrupo.MaxEnvio;
            for (var i = 0; i < this.Passo.maxPassoDinamico; i++) {
                newArray[i] = this.objGrupo.EtapaGruposFormularios[0];
            }
            return newArray;
        };

        this.atualizaFormularioPasso = function () {
            var existeEnvio = false;
            if (that.Turma) if (that.Turma.Inscricao) if (that.Turma.Inscricao.EtapaInscricaoEnvios != null) {
                if (that.Turma.Inscricao.EtapaInscricaoEnvios[$scope.idx].EtapaInscricaoEnvioGrupos != null) {
                    var objTurmaEnvio = $filter('filter')(that.Turma.Inscricao.EtapaInscricaoEnvios[$scope.idx].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: this.objGrupo.Id} });
                    if (objTurmaEnvio.length > 0) {
                        if (!this.bolAdicionado) {
                            that.Passo.maxPassoDinamico = objTurmaEnvio[0].MaxOrdemEnviada;
                            existeEnvio = true;
                        }
                    }
                }
            }
        };

        $scope.grupoAtual = {};

        $scope.ctrlRajadaWatchTurmap = undefined;
        $scope.ctrlRajadaWatchRefresh = undefined;
        if(!$scope.forceRefreshDefined){
            $scope.$watch("turmap", function (newVal, oldVal) {
                if ($scope.ctrlRajadaWatchTurmap) {
                    $timeout.cancel($scope.ctrlRajadaWatchTurmap);
                    $scope.ctrlRajadaWatchTurmap = undefined;
                }
                $scope.ctrlRajadaWatchTurmap = $timeout(function (event) {
                    if ($scope.turmap) {
                        that.Turma = angular.copy($scope.turmap);
                        if ($scope.turmap.Id != that.idTurma) {
                            that.clearPassos();
                            that.idTurma = $scope.turmap.Id;
                        }
                        that.atualizaFormularioPasso();
                    }
                },100);
            }, true);
        }
        else{
            $scope.$watch("forceRefresh", function (newVal, oldVal) {
                if(newVal) {
                    $scope.forceRefresh=false;
                    if ($scope.ctrlRajadaWatchRefresh) {
                        $timeout.cancel($scope.ctrlRajadaWatchRefresh);
                        $scope.ctrlRajadaWatchRefresh = undefined;
                    }
                    $scope.ctrlRajadaWatchRefresh = $timeout(function (event) {
                        if ($scope.turmap) {
                            that.Turma = angular.copy($scope.turmap);
                            if ($scope.turmap.Id != that.idTurma) {
                                that.clearPassos();
                                that.idTurma = $scope.turmap.Id;
                            }
                            that.atualizaFormularioPasso();
                        }
                    },100);
                }
            }, true);
        }

        this.init = function (grupo) {
            this.objGrupo = grupo;
            //that.Turma = Turma;
            that.Turma = angular.copy($scope.turmap);
            this.Passo.maxPassoByGrupo = this.objGrupo.MaxEnvio;
            if ($scope.turmap.Id != that.idTurma) {
                this.clearPassos();
                this.idTurma = $scope.turmap.Id;
            }

            this.atualizaFormularioPasso();
        };

        if ($scope.turmap) {
            $timeout(function () {
                that.Turma = $scope.turmap;
                if ($scope.turmap.Id != that.idTurma) {
                    that.clearPassos();
                    that.idTurma = $scope.turmap.Id;
                }
                that.atualizaFormularioPasso();
            }, 10);
        }

    } ]);
    

