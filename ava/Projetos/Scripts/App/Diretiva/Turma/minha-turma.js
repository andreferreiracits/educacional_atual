"use strict"
angular.module('Turma').directive('minhaTurma', function () {
    return {
        restrict: 'E',
        scope: {
            edicao: '=edicao',
            usuario: '=usuario',
            turma: '=turma',
            inscricao: '=inscricao',
            defaultConfig: '=defaultConfig',
            listaAnos : "=listaAnos"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Turma/minha-turma.html',
        controller: ['$http', '$scope', '$timeout', function ($http, $scope, $timeout) {
            var _self = this;

            this.filtroEtapa = 0;
            this.intPaginaAtual = 1;

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
            
            this.objEnviosInscricao = {
                totalEnvios: 0,
                envios: []
            };

            this.loadingBuscarGeral = true;

            this.etapaAberta = function(et) {
                var bolEtapaAberta = true;

                try {                                        
                    var intDiferenca = new Date() - new Date(parseInt(et.DataInicio.replace(/\D+/g, "")));

                    if (intDiferenca < 0) {
                        bolEtapaAberta = false;
                    }
                }
                catch(err) {
                    
                };

                return bolEtapaAberta;
            };

            this.getLinkEtapa = function(envio) {
                var retorno = "/AVA/Projetos/" +  new Date(parseInt(envio.DataCriacao.substr(6), 10)).getFullYear() + "/" + $scope.edicao.Link + "/Etapas/" + envio.Etapa.Link + "/";
                
                if (envio.MensagemRapida && envio.MensagemRapida.StrEncryptIdMensagem && envio.MensagemRapida.StrEncryptIdMensagem != "") {
                    retorno += envio.MensagemRapida.StrEncryptIdMensagem;
                }
                else {
                    retorno += "Formulario";
                }

                return retorno;
            };

            this.aplicaFiltros = function() {
                _self.loadingBuscarGeral = true;
                _self.intPaginaAtual = 1;

                _self.objEnviosInscricao.envios = [];
                _self.objEnviosInscricao.totalEnvios = 0;
                
                _self.carregaConteudo();
            };

            this.carregarMais = function() {
                if (!_self.loadingBuscarGeral) {
                    _self.loadingBuscarGeral = true;
                    _self.intPaginaAtual++;

                    _self.carregaConteudo();
                }                
            };

            this.carregaConteudo = function() {
                $http({
                    url: '/AVA/Projetos/Servico/GetMeusEnviosPaginado/',
                    method: 'POST',
                    params: {
                        idProjeto: $scope.edicao.Projeto.Id,
                        idProjetoEdicao: $scope.edicao.Id,
                        idProjetoEdicaoEtapa: _self.filtroEtapa,
                        idSituacao: 1,
                        idTurma: $scope.usuario.Turmas[0].Id,
                        tipoOrdenacao: 2,
                        intPagina: _self.intPaginaAtual,
                        intRegPorPagina: 6,
                        intAno : $scope.edicao.Ano
                    }
                }).success(function (data) {
                    if (data && data instanceof Object) {
                        if (data.TotalEnvios && !isNaN(data.TotalEnvios) && parseInt(data.TotalEnvios) >= 0) {
                            _self.objEnviosInscricao.totalEnvios = parseInt(data.TotalEnvios);
                        }

                        if (data.listParticipanteEnvio && data.listParticipanteEnvio instanceof Array && data.listParticipanteEnvio.length > 0) {
                            if (_self.objEnviosInscricao.envios.length == 0) {
                                _self.objEnviosInscricao.envios = data.listParticipanteEnvio;
                            }
                            else {
                                angular.forEach(data.listParticipanteEnvio, function (valor, chave) {
                                    _self.objEnviosInscricao.envios.push(valor);
                                });
                            }

                            if (data.listParticipanteEnvio.length < $scope.maxRegistroPagina) {
                                $scope.bolFimMateriais = true;
                            }
                            else {
                                $scope.bolFimMateriais = false;
                            }
                        }
                        else {
                            $scope.bolFimMateriais = true;
                        }
                    }
                }).error(function (err) {
                    console.log("Não foi possível buscar materiais da etapa");
                }).finally(function () {
                    //Levando em consideração que apenas envios da turma em que o aluno está matriculado serão retornados, e que turmas podem ter apenas uma categoria de inscrição:
                    $scope.inscTurmCat = _self.objEnviosInscricao.envios[0].Inscricao;
                    _self.loadingBuscarGeral = false;

                });
            };

            _self.detalheTurma = $scope.turma;

            _self.detalheTurma.linkMapa = "https://maps.google.com/maps?q=" + $scope.usuario.Escola.Cidade + "," + $scope.usuario.Escola.Estado + ",Brasil&ie=UTF8&hq=&hnear=" + $scope.usuario.Escola.Cidade + "&t=m&z=9&iwloc=A&output=embed";

            _self.carregaConteudo();


        }],
        controllerAs: 'ctrlMinhaTurma'
    };
});