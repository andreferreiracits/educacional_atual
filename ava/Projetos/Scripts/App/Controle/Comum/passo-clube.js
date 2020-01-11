"use strict";

angular.module('Inscricao.mista')
    .controller('passoClubeCtrl', ['$scope', '$timeout', '$filter', 'EtapaFactory', function ($scope, $timeout, $filter, $etapaFactory) {
        var self = this;
        this.bolAdicionado = false;
        this.idObjeto = 0;
        this.Passo = {
            maxPassoDinamico: 1,
            maxPassoByGrupo: 0
        };

        this.ObjetoSelecionado = {};
        this.objGrupo = {};

        this.clearPassos = function () {
            self.bolAdicionado = false;
            self.Passo = {
                maxPassoDinamico: 1,
                maxPassoByGrupo: 0
            };
        };

        this.adicionarPasso = function (grupo) {
            $scope.getStatusFormulario();

            var totalRespondido = 0;


            //Verifica o total de form resposta para este Grupo, para validar se pode adicionar um novo passo
            if (self.ObjetoSelecionado != null) if (self.ObjetoSelecionado.Inscricao != null) {
                
                if (self.ObjetoSelecionado.Inscricao.EtapaInscricaoEnvios != null) {
                    if (self.ObjetoSelecionado.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos != null) {

                        

                        var objGrupo = $filter('filter')(self.ObjetoSelecionado.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: grupo.Id} }, true);
                        if (objGrupo.length > 0) {
                            //totalRespondido = objGrupo[0].EtapaInscricaoEnvioGrupoRespostas.length; //Pega os respondidos do FORMULARIO aberto
                            var objTotalRespostas = $filter('filter')(objGrupo[0].EtapaInscricaoEnvioGrupoRespostas, { FormularioResposta: { BolValidado: true} }, true);
                            totalRespondido = objTotalRespostas.length;
                        }
                    }
                }
            }

            if ($scope.objFormValid.idfr > 0) {
                //console.error("totalRespondido = " + totalRespondido);
                //console.error("maxPassoDinamico = " + this.Passo.maxPassoDinamico);
                if ($scope.objFormValid.valid && (totalRespondido == this.Passo.maxPassoDinamico)) {
                    if (self.Passo.maxPassoByGrupo == 0) {
                        self.Passo.maxPassoDinamico++;
                        self.bolAdicionado = true;
                    } else if (this.Passo.maxPassoDinamico >= this.Passo.maxPassoByGrupo) {
                        alert('O máximo de passos permitidos é ' + this.Passo.maxPassoByGrupo);
                    } else {
                        self.Passo.maxPassoDinamico++;
                        self.bolAdicionado = true;
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
            self.objGrupo = p_grupo;
            self.Passo.maxPassoByGrupo = self.objGrupo.MaxEnvio;
            for (var i = 0; i < self.Passo.maxPassoDinamico; i++) {
                newArray[i] = self.objGrupo.EtapaGruposFormularios[0];
            }
            return newArray;
        };

        this.atualizaFormularioPasso = function () {
            var existeEnvio = false;

            if (self.ObjetoSelecionado.Inscricao.EtapaInscricaoEnvios != null) {
                if (self.ObjetoSelecionado.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos != null) {
                    var objTurmaEnvio = $filter('filter')(self.ObjetoSelecionado.Inscricao.EtapaInscricaoEnvios[0].EtapaInscricaoEnvioGrupos, { EtapaGrupo: { Id: this.objGrupo.Id} });
                    if (objTurmaEnvio.length > 0) {
                        if (!this.bolAdicionado) {
                            self.Passo.maxPassoDinamico = objTurmaEnvio[0].MaxOrdemEnviada;
                            existeEnvio = true;
                        }
                    }
                }
            }
        };

        $scope.grupoAtual = {};
        $scope.$watch("turma", function (newVal, oldVal) {
            if ($scope.turma) {
                self.ObjetoSelecionado = $scope.turma;
                if ($scope.turma.Id != self.idObjeto) {
                    self.clearPassos();
                    self.idObjeto = $scope.turma.Id;
                }
                self.atualizaFormularioPasso();
            }
        }, true);


        $scope.$watch("objEquipe", function (newVal, oldVal) {
            if ($scope.equipe) {
                self.ObjetoSelecionado = $scope.equipe;
                if ($scope.equipe.Id != self.idObjeto) {
                    self.clearPassos();
                    self.idObjeto = $scope.equipe.Id;
                }
            }
        }, true);


        $scope.$watch("objInscricaoSelecionada", function (newVal, oldVal) {
            if ($scope.objParametro) {
                self.ObjetoSelecionado = $scope.objParametro;
                if ($scope.objParametro.Id != self.idObjeto) {
                    self.clearPassos();
                    self.idObjeto = $scope.objParametro.Id;
                }
            }
        }, true);

        if ($scope.turma) {  //Turma
            $timeout(function () {
                self.ObjetoSelecionado = $scope.turma;
                if ($scope.turma.Id != self.idObjeto) {
                    self.clearPassos();
                    self.idObjeto = $scope.turma.Id;
                }
                self.atualizaFormularioPasso();
            }, 10);
        }

        if ($scope.equipe) { //Equipe
            $timeout(function () {
                self.ObjetoSelecionado = $scope.equipe;
                if ($scope.equipe.Id != self.idObjeto) {
                    self.clearPassos();
                    self.idObjeto = $scope.equipe.Id;
                }
                self.atualizaFormularioPasso();
            }, 10);
        }

        if ($scope.objParametro) { //Individual
            $timeout(function () {
                self.ObjetoSelecionado = $scope.objParametro;
                if ($scope.objParametro.Id != self.idObjeto) {
                    self.clearPassos();
                    self.idObjeto = $scope.objParametro.Id;
                }
                self.atualizaFormularioPasso();
            }, 10);
        }
        
    } ]);
    

