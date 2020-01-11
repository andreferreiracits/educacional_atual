//"use strict";
angular.module('Etapa')
    .directive('etapaFormularioEnvioEquipeProjeto', ['$http', '$document', 'EtapaFactory', '$timeout', function ($http, $document, $etapaFactory, $timeout) {
        return {
            restrict: 'E',
            //replace: true,
            templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/etapa-formulario-envio-equipe-projeto.html',
            scope: {
                config: "=config",
                objEquipe: "=objEquipe",
                etapaConfig: "=etapaConfig",
                defaultConfig: "=defaultConfig",
                usuario : "=usuario"
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
    }]);

    angular.module('Etapa').controller('etapaFormularioEnvioEquipeProjetoCtrl', ['$scope', '$filter', '$timeout', '$http', 'EtapaFactory', function ($scope, $filter, $timeout, $http, $etapaFactory) {

        /*
        * Declaração de variáveis e objetos 
        */
        
        var that = this;
        var objFormSave = {};
        var timeoutSalvar;

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

        $scope.convCatToClas = function (nomeCategoria) {

            nomeCategoria = nomeCategoria.toLowerCase();
            nomeCategoria = nomeCategoria.replace(/ç/g, 'c');
            nomeCategoria = nomeCategoria.replace(/ã|á|à|â/g, 'a');
            nomeCategoria = nomeCategoria.replace(/é|ê/g, 'e')
            nomeCategoria = nomeCategoria.replace(/í/g, 'i');
            nomeCategoria = nomeCategoria.replace(/ô|ô|ó/g, 'o');
            nomeCategoria = nomeCategoria.replace(/û|ú/g, 'u');
            nomeCategoria = nomeCategoria.replace(/[^\w\s]/gi, '');
            nomeCategoria = nomeCategoria.replace(/\s+/g, "-");
            return nomeCategoria;

        };

        $scope.$on("fnPassoAnterior", function (event) {
            $etapaFactory.abrirPrevPasso();
        });

        $scope.$on("fnPassoProximo", function (event) {
            $etapaFactory.abrirNextPasso();
        });


        $scope.envioDevolucaoAlunoProfessor = function (idSituacao) {

            //$scope.objEquipe.Inscricao.EtapaInscricaoEnvios[0].Situacao = { Id : 7, Descricao : "Enviado ao professor" };

            //return true;

            $scope.getStatusFormulario();

            if ($scope.objFormValid.pristine) {
                that.enviarMaterialAlunoProfessor(idSituacao);
            } else {
                if (confirm("Você alterou o formulário e não gravou as alterações. Caso continue os dados alterados não serão salvos.")) {
                    that.enviarMaterialAlunoProfessor(idSituacao);
                }
            }

        };

        this.enviarMaterialAlunoProfessor = function (idSituacao) {
            if (idSituacao == 4) {
                if (confirm('Ao devolver para o aluno, o formulário ficará desbloqueado para que ele faça alterações.')) {
                    this.ajaxEnviarMaterialAlunoProfessor(idSituacao);
                }
            } else if (idSituacao == 7) {
                if (confirm('O seu material será enviado para o professor e você não poderá mais alterá-lo. Deseja continuar?')) {
                    this.ajaxEnviarMaterialAlunoProfessor(idSituacao);
                }
            }
        };

        this.ajaxEnviarMaterialAlunoProfessor = function (idSituacao) {
            $scope.loadingSalvar = true;

            $http({
                cache: false,
                params: {
                    idInscricao: $scope.objEquipe.Inscricao.Id,
                    idEtapa: $scope.etapaConfig.Etapa.Id,
                    idSituacao: idSituacao,
                    '_': new Date().getTime()
                },
                url: "/AVA/Projetos/Etapa/EnviarEtapaFormularioParaSituacao",
                method: 'POST'
            }).success(function (data) {
                //alert('enviou');

                if (data.successo != null) {
                    $scope.objEquipe.Inscricao.EtapaInscricaoEnvios[0].Situacao = data.Situacao;
                }

            }).error(function (err) {
                alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
            }).then(function (data) {
                $scope.loadingSalvar = false;
            });

        };

        $scope.enviarEtapaFormulario = function (idSituacao) {

            $http({
                cache: false,
                params: {
                    idInscricao: $scope.objEquipe.Inscricao.Id,
                    idEtapa: $scope.etapaConfig.Etapa.Id,
                    idSituacao: idSituacao,
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
                        that.finalizarEnvioFormulario($scope.objEquipe.Inscricao.Id, $scope.etapaConfig.Etapa.Id);
                    }

                } else if (data.sucesso != null) {
                    if (confirm('O seu material será enviado para aprovação e não poderá mais ser alterado. Deseja continuar?')) {
                        that.finalizarEnvioFormulario($scope.objEquipe.Inscricao.Id, $scope.etapaConfig.Etapa.Id);
                    }
                }

            }).error(function (data) {
                alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
            });
        };

        this.finalizarEnvioFormulario = function (idInscricao, idEtapa) {
            $scope.loadingSalvar = true;

            $http({
                cache: false,
                params: {
                    idInscricao: $scope.objEquipe.Inscricao.Id,
                    idEtapa: $scope.etapaConfig.Etapa.Id,
                    '_': new Date().getTime()
                },
                url: "/AVA/Projetos/Etapa/EnviarEtapaFormulario",
                method: 'POST'
            }).success(function (data) {
                
                if (data.successo != null) {
                    if (data.TurmaEnvio != null) {
                        $scope.objEquipe.Inscricao.EtapaInscricaoEnvios = data.TurmaEnvio;
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
                Id: $scope.objEquipe.Id,
                Inscricao:
                {
                    Id: $scope.objEquipe.Inscricao.Id
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

                $http({
                    cache: false,
                    params: {
                        idInscricao: $scope.objEquipe.Inscricao.Id,
                        idEtapa: $scope.etapaConfig.Etapa.Id,
                        idFormularioResposta: data.retorno.idFormularioResposta,
                        idGrupoForm: $scope.objAbaSelecionada.idGrupoForm,
                        intOrdem: ($scope.objAbaSelecionada.materialIdx + 1),
                        '_': new Date().getTime()
                    },
                    url: "/AVA/Projetos/Etapa/SalvarEtapaFormulario",
                    method: 'POST'
                }).success(function (data) {
                    if (timeoutSalvar) {
                        $timeout.cancel(timeoutSalvar);
                    }

                    if (data.TurmaEnvio != null) {
                        $scope.objEquipe.Inscricao.EtapaInscricaoEnvios = data.TurmaEnvio;
                        $scope.rascunhoSalvo = true;

                        $scope.$emit("changeListaEnviosEquipe", data);

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
            if ($scope.objEquipe.Inscricao.EtapaInscricaoEnvios != null) {
                $scope.objEquipe.Inscricao.EtapaInscricaoEnvios[0].BolPodeEnviar = false;
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
                if (confirm('Você alterou o formulário e não gravou as alterações. Caso continue os dados alterados não serão salvos.')) {
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
                if (confirm('Você alterou o formulário e não gravou as alterações. Caso continue os dados alterados não serão salvos.')) {
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
            if ($scope.objEquipe.Inscricao.EtapaInscricaoEnvios != null && idFormResposta > 0) {
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
            var objTurmaSelecionada = $scope.objEquipe;

            if (objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios != null) {

                if (objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos != null) {
                    var objGrupo = $filter('filter')(objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: idEtapaGrupo} }, true);

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

        var that = this;
        this.bolAdicionado = false;
        this.idTurma = 0;
        this.Passo = {
            maxPassoDinamico: 1,
            maxPassoByGrupo: 0
        };

        this.Turma = {};
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

            var objTurmaSelecionada = $scope.objEquipe;
            var totalRespondido = 0;

            //Verifica o total de form resposta para este Grupo, para validar se pode adicionar um novo passo
            if (objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios != null) {
                if (objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos != null) {
                    var objGrupo = $filter('filter')(objTurmaSelecionada.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: grupo.Id} }, true);
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

            if (this.Turma.Inscricao.EtapaInscricaoEnvios != null) {
                if (this.Turma.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos != null) {
                    var objTurmaEnvio = $filter('filter')(this.Turma.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: this.objGrupo.Id} });
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
        $scope.$watch("objEquipe", function (newVal, oldVal) {
            if ($scope.objEquipe) {
                that.Turma = $scope.objEquipe;
                if ($scope.objEquipe.Id != that.idTurma) {
                    that.clearPassos();
                    that.idTurma = $scope.objEquipe.Id;
                }
                that.atualizaFormularioPasso();
            }
        }, true);


        this.init = function (grupo) {

            this.objGrupo = grupo;
            //this.Turma = Turma;
            this.Turma = $scope.objEquipe;
            this.Passo.maxPassoByGrupo = this.objGrupo.MaxEnvio;
            if ($scope.objEquipe.Id != that.idTurma) {
                this.clearPassos();
                this.idTurma = $scope.objEquipe.Id;
            }

            this.atualizaFormularioPasso();
        };

        if ($scope.objEquipe) {
            $timeout(function () {
                that.Turma = $scope.objEquipe;
                if ($scope.objEquipe.Id != that.idTurma) {
                    that.clearPassos();
                    that.idTurma = $scope.objEquipe.Id;
                }
                that.atualizaFormularioPasso();
            }, 10);
        }

    } ]);
    

