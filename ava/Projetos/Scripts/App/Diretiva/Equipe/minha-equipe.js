"use strict"
angular.module('Equipe').directive('minhaEquipe', function () {
    return {
        restrict: 'E',
        scope: {
            edicao: '=edicao',
            usuario: '=usuario',            
            equipes: '=equipe',
            defaultConfig: '=defaultConfig',
            listaAnos : "=listaAnos"
        },
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Equipe/minha-equipe.html',
        controller: ['$http', '$scope', '$timeout', function ($http, $scope, $timeout) {
            var _self = this;

            $scope.filtroano = 0;
            this.filtroSituacao = 0;
            this.filtroEtapa = 0;
            this.filtroTurma = 0;
            this.filtroEquipe = 0;
            
            this.bolMonitor = $scope.usuario.bolMonitor;

            this.intPaginaAtual = 1;
            
            this.objEnviosInscricao = {
                totalEnvios: 0,
                envios: []
            };

            this.detalheEquipe = { Id: 0 };
            this.loadingBuscarGeral = true;

            this.convCatToClas = function (nomeCategoria) {

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
                //if (envio.SituacaoEnvio.Id == 2) {
                //    return "";
                //}

                var retorno = "/AVA/Projetos/" +  new Date(parseInt(envio.DataCriacao.substr(6), 10)).getFullYear() + "/" + $scope.edicao.Link + "/Etapas/" + envio.Etapa.Link + "/";
                
                if (envio.MensagemRapida && envio.MensagemRapida.StrEncryptIdMensagem && envio.MensagemRapida.StrEncryptIdMensagem != "" && envio.SituacaoEnvio.Id == 1) {
                    retorno += envio.MensagemRapida.StrEncryptIdMensagem;
                }
                else {
                    if(_self.bolMonitor && !$scope.edicao.BolEncerrado && ( envio.SituacaoEnvio.Id == 3 || envio.SituacaoEnvio.Id == 4 )){
                        retorno += "Formulario";
                    }
                    else{
                        return "";
                    }
                }

                return retorno;
            };            
            
            this.aplicaFiltros = function() {
                _self.loadingBuscarGeral = true;
                _self.intPaginaAtual = 1;

                _self.objEnviosInscricao.envios = [];
                _self.objEnviosInscricao.totalEnvios = 0;
                
                if (_self.filtroEquipe > 0 && _self.filtroEquipe !== _self.detalheEquipe.Id) {
                    var intFiltroEquipe = parseInt(_self.filtroEquipe);
                    
                    for (i = 0; i < $scope.equipes.length; i++) {
                        if ($scope.equipes[i].Id === intFiltroEquipe) {
                            _self.detalheEquipe = $scope.equipes[i];
                            _self.detalheEquipe.linkMapa = "https://maps.google.com/maps?q=" + $scope.usuario.Escola.Cidade + "," + $scope.usuario.Escola.Estado + ",Brasil&ie=UTF8&hq=&hnear=" + $scope.usuario.Escola.Cidade + "&t=m&z=9&iwloc=A&output=embed";
                            
                            $http({
                                url: "/AVA/Projetos/Servico/GetTodasInscricoesPorEquipe",
                                method: "POST",
                                params: {
                                    idProjetoEquipe: intFiltroEquipe
                                }
                            }).success(function(data) {                                
                                if (data && data instanceof Object) {
                                    if (data.listaInscricoes && data.listaInscricoes instanceof Array && data.listaInscricoes.length > 0) {
                                        _self.detalheEquipe.Inscricao = data.listaInscricoes[0];
                                    }
                                }
                                //console.log(data);
                            }).finally(function() {
                                _self.carregaConteudo();
                            });
                            
                        }
                    }
                }
                else {
                    _self.carregaConteudo();
                }                
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
                    url: '/AVA/Projetos/Servico/GetMeusEnviosEquipePaginado/',
                    method: 'POST',
                    params: {
                        idProjeto: $scope.edicao.Projeto.Id,
                        idProjetoEdicao: $scope.edicao.Id,
                        idProjetoEdicaoEtapa: _self.filtroEtapa,
                        idSituacao: _self.filtroSituacao,
                        idTurma: 0,
                        idProjetoEquipe: _self.filtroEquipe,
                        tipoOrdenacao: 2,
                        intPagina: _self.intPaginaAtual,
                        intRegPorPagina: 6,
                        intAno : $scope.filtroano
                    }
                }).success(function (data) {
                    
                    //console.log(data);
                    if (data && data instanceof Object) {
                        if (data.TotalEnvios && !isNaN(data.TotalEnvios) && parseInt(data.TotalEnvios) >= 0) {
                            _self.objEnviosInscricao.totalEnvios = parseInt(data.TotalEnvios);
                        }

                        if (data.listParticipanteEnvio && data.listParticipanteEnvio instanceof Array && data.listParticipanteEnvio.length > 0) {
                            if (_self.objEnviosInscricao.envios.length == 0) {
                                _self.objEnviosInscricao.envios = data.listParticipanteEnvio;
                                
                                //_self.detalheEquipe = _self.objEnviosInscricao.envios[0].Inscricao.Equipe;
                                //_self.detalheEquipe.linkMapa = "https://maps.google.com/maps?q=" + $scope.usuario.Escola.Cidade + "," + $scope.usuario.Escola.Estado + ",Brasil&ie=UTF8&hq=&hnear=" + $scope.usuario.Escola.Cidade + "&t=m&z=9&iwloc=A&output=embed";
                                                                
                                //if(_self.detalheEquipe.Inscricoes.length>0){
                                //    _self.detalheEquipe.Inscricao = _self.detalheEquipe.Inscricoes[0];                                   
                                //}

                                //console.log(_self.detalheEquipe);
                            
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
                }).finally(function(){
                    _self.loadingBuscarGeral = false;
                });
            };

            
            if($scope.listaAnos && $scope.listaAnos instanceof Array) if($scope.listaAnos.length > 1){
                if($scope.listaAnos[$scope.listaAnos.length - 1] > 0){
                    $scope.filtroano = parseInt($scope.listaAnos[$scope.listaAnos.length - 1]);
                }
            }

            if($scope.edicao.BolEncerrado){
                _self.filtroSituacao = 1;
            }
            
            this.carregaConteudo();          
            
        }],
        controllerAs: 'ctrlMinhaEquipe'
    };
});