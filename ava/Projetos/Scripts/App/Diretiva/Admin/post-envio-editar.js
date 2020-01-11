angular.module('Mural').directive('postEnvioEditar', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Admin/post-envio-editar.html',
        scope: {
            usuario: "=usuario",
            post: "=post",
            comentario: "=comentario",
            objMensagemRapida: "=mensagemRapida",
            objEdicao: "=edicao",
            objEtapa: "=etapa",
            etapaConfig: "=etapaConfig",
            defaultConfig: "=defaultConfig"
        },
        controller: ['$http', '$scope', '$timeout', '$filter', 'EtapaFactory', "$sce", "projetoTools", function ($http, $scope, $timeout, $filter, $etapaFactory, $sce, projetoTools) {
            $scope.objEdicaoPost = $scope.objEdicao;

            var self = this;
            var objFormSave = {};
            var timeoutSalvar;

            $scope.etapaEnvioGrupos = [];
            $scope.envio = {};
            $scope.currentIndex = 0;
            $scope._inscricaoenvio = {};
            $scope.loadingSituacaoEnvio = false;
            $scope.loadingDestaqueEnvio = false;
            $scope.loadingMaterialJogoEnvio = false;

            $scope.embedMapa = '&nbsp;';

            try {
                if ($scope.objMensagemRapida) {
                    if ($scope.objMensagemRapida.EtapaInscricaoEnvio) {
                        $scope._inscricaoenvio = $scope.objMensagemRapida.EtapaInscricaoEnvio;
                    }
                }
            } catch (err) { }


            $scope.arraySituacao = [];
            $scope.arraySituacao.push({ Id: 1, Descricao: "Publicado" });
            $scope.arraySituacao.push({ Id: 2, Descricao: "Novo" });
            $scope.arraySituacao.push({ Id: 3, Descricao: "Pendente" });
            $scope.arraySituacao.push({ Id: 4, Descricao: "Rascunho" });
            $scope.arraySituacao.push({ Id: 5, Descricao: "Pré-aprovado" });
            $scope.arraySituacao.push({ Id: 6, Descricao: "Excluído" });


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
            /* Fim declaração variáveis e objetos */

            if ($scope.objMensagemRapida) if ($scope.objMensagemRapida.EtapaInscricaoEnvio) {
                $scope.envio = $scope.objMensagemRapida.EtapaInscricaoEnvio;
                if ($scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa) {
                    $scope.etapa = $scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa;
                    $scope.edicao = $scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa.Edicao;
                    $scope.etapaEnvioGrupos = $scope.objMensagemRapida.EtapaInscricaoEnvio.EtapaInscricaoEnvioGrupos;
                }
            }



            /* Salvar envio */
            $scope.$on("fnPassoAnterior", function (event) {
                $etapaFactory.abrirPrevPasso();
            });

            $scope.$on("fnPassoProximo", function (event) {
                $etapaFactory.abrirNextPasso();
            });

            $scope.enviarEtapaFormulario = function () {

                $http.post("/AVA/Projetos/Etapa/VerificaTotalEnvioIncompleto",
                {
                    idInscricao: $scope._inscricaoenvio.Inscricao.Id,
                    idEtapa: $scope.etapa.Id
                }).success(function (data) {
                    if (data.incompleto != null) {
                        var msgConfirm = "";

                        if (data.incompleto.total > 1) {
                            msgConfirm = "Existem " + data.incompleto.total + " materiais que não foram Gravados corretamente e serão descartados ao concluir o envio. Deseja continuar?";
                        } else {
                            msgConfirm = "Existe " + data.incompleto.total + " material que não foi Gravado corretamente e será descartado ao concluir o envio. Deseja continuar?";
                        }

                        if (confirm(msgConfirm)) {
                            self.finalizarEnvioFormulario($scope._inscricaoenvio.Inscricao.Id, $scope.etapa.Id);
                        }

                    } else if (data.sucesso != null) {
                        if (confirm('O seu material será enviado para aprovação e não poderá mais ser alterado. Deseja continuar?')) {
                            self.finalizarEnvioFormulario($scope._inscricaoenvio.Inscricao.Id, $scope.etapa.Id);
                        }
                    }

                }).error(function (data) {
                    alert("Ocorreu um erro ao tentar enviar este material. Tente novamente atualizando a página!");
                });
            };

            this.finalizarEnvioFormulario = function (idInscricao, idEtapa) {
                $scope.loadingSalvar = true;
                $http.post("/AVA/Projetos/Etapa/EnviarEtapaFormulario",
                {
                    idInscricao: $scope._inscricaoenvio.Inscricao.Id,
                    idEtapa: $scope.etapa.Id
                }).success(function (data) {
                    //alert('enviou');

                    if (data.successo != null) {
                        if (data.TurmaEnvio != null) {
                            $scope._inscricaoenvio = data.TurmaEnvio;
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
                    Id: 0, //$scope.turmap.Id,
                    Inscricao:
                    {
                        Id: $scope._inscricaoenvio.Inscricao.Id
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
                    $http.post("/AVA/Projetos/Etapa/SalvarEtapaFormulario",
                    {
                        idInscricao: $scope._inscricaoenvio.Inscricao.Id,
                        idEtapa: $scope.etapa.Id,
                        idFormularioResposta: data.retorno.idFormularioResposta,
                        idGrupoForm: $scope.objAbaSelecionada.idGrupoForm,
                        intOrdem: $scope.objAbaSelecionada.materialIdx
                    }).success(function (data) {
                        if (timeoutSalvar) {
                            $timeout.cancel(timeoutSalvar);
                        }

                        if (data.TurmaEnvio != null) {
                            $scope._inscricaoenvio = data.TurmaEnvio[0];
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
            /* Fim salvar */

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

            this.abrirMaterial = function (grupoResposta, idGrupoForm, indexGrupo, indexMaterial) {
                if (grupoResposta) {
                    if (grupoResposta.FormularioResposta) {
                        if (grupoResposta.FormularioResposta.Formulario) {
                            $scope.bolClicado = !$scope.bolClicado;
                            $scope.FormEnvio.idFormulario = grupoResposta.FormularioResposta.Formulario.Id;
                            $scope.FormEnvio.idFormularioResposta = grupoResposta.FormularioResposta.Id;
                            self.selecionarAbaByIdxGrupoMaterial(indexGrupo, indexMaterial, idGrupoForm);
                        }
                    }
                }
            };

            //Marca uma aba como ativa, de acordo com o grupo e indice do material
            this.selecionarAbaByIdxGrupoMaterial = function (idxGrupo, idxMaterial, idGrupoForm) {
                $scope.objAbaSelecionada.grupoIdx = idxGrupo;
                $scope.objAbaSelecionada.materialIdx = idxMaterial;
                $scope.objAbaSelecionada.idGrupoForm = idGrupoForm;
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
            };

            this.atualizarSituacaoEnvio = function () {
                if (!$scope.loadingSituacaoEnvio) {
                    $scope.loadingSituacaoEnvio = true;

                    //return false;
                    $http.post("/AVA/Projetos/Etapa/AtualizarSituacaoEnvio",
                    {
                        idInscricaoEnvio: $scope._inscricaoenvio.Id,
                        idInscricao: $scope._inscricaoenvio.Inscricao.Id,
                        idEtapa: $scope.etapa.Id,
                        idSituacao: $scope._inscricaoenvio.Situacao.Id
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
                        idInscricaoEnvio: $scope._inscricaoenvio.Id,
                        idInscricao: $scope._inscricaoenvio.Inscricao.Id,
                        idEtapa: $scope.etapa.Id,
                        bolDestaque: $scope._inscricaoenvio.BolDestaque,
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
                        idInscricaoEnvio: $scope._inscricaoenvio.Id,
                        idInscricao: $scope._inscricaoenvio.Inscricao.Id,
                        idEtapa: $scope.etapa.Id,
                        bolMaterialJogo: $scope._inscricaoenvio.BolMaterialJogo
                    }).success(function (data) {

                    }).error(function (data) {
                        alert("Ocorreu um erro ao tentar esta operação. Tente novamente atualizando a página!");
                    }).then(function (data) {
                        $scope.loadingMaterialJogoEnvio = false;
                    });
                }
            };

            this.getMapa = function () {
                var urlMapa = '';
                var strEstado = '';
                var strCidade = '';

                if ($scope.objMensagemRapida) if ($scope.objMensagemRapida.EtapaInscricaoEnvio) {
                    strEstado = $scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Responsavel.Escola.Estado;
                    strCidade = $scope.objMensagemRapida.EtapaInscricaoEnvio.Inscricao.Responsavel.Escola.Cidade;

                    if (strEstado != null && strCidade != null) {
                        strEstado = retira_acentos(strEstado);
                        strCidade = retira_acentos(strCidade);

                        urlMapa = '<iframe width="100%" height="250" src="https://maps.google.com/maps?q=' + strCidade + ',' + strEstado + ',Brasil&ie=UTF8&hq=&hnear=' + strCidade + '&t=m&z=9&iwloc=A&output=embed"></iframe>';
                        $scope.embedMapa = $sce.trustAsHtml(urlMapa);
                    }
                }

            };
            this.getMapa();

            $timeout(function () {
                $scope.limpaFormularioEnvio();
            }, 200);


        } ],
        controllerAs: "postEnvioEditar"
    };
});
