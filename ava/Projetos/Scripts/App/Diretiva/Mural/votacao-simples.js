angular.module('Mural').directive('votacaoSimples', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Mural/votacao-simples.html',
        scope: {
            enquete: "=enquete",
            etapaInscricaoEnvio: "=etapaInscricaoEnvio"
        },
        controller: ['$http', '$scope', "$rootScope", '$timeout', '$filter', function ($http, $scope, $rootScope, $timeout, $filter) {
            var self = this;

            self.bolVotacaoAberta = false;
            self.bolVotacaoEncerrada = false;
            self.bolVotou = false;
            self.bolTemEnquete = false;
            self.bolMostraEnviosPreSelecionados = false;
            self.bolEnvioPreSelecionado = false;

            self.idObjetoVotacao = 0;
            self.idEnquete = 0;
            self.totalVotos = 0;

            self.bolAlterando = false;

            //console.log('=====enquete=====');
            //console.log($scope.enquete);
            //console.log($scope.etapaInscricaoEnvio);

            if ($scope.enquete) {
                self.bolVotacaoAberta = $scope.enquete.BolVotacaoAberta;
                self.bolVotacaoEncerrada = $scope.enquete.BolVotacaoEncerrada;
                self.bolVotou = $scope.enquete.EtapaEnqueteVoto.BolVotou;
                self.totalVotos = $scope.enquete.EtapaEnqueteVoto.TotalVotos;

                self.idObjetoVotacao = $scope.enquete.IdObjetoVotacao;
                self.idEnquete = $scope.enquete.EtapaEnqueteJuri.Id;                               

                if ($scope.enquete.GaleriaEnqueteFiltro) { self.bolMostraEnviosPreSelecionados = $scope.enquete.GaleriaEnqueteFiltro.BolEnviosPreSelecionados; }

                if ($scope.enquete.EtapaEnqueteJuri.Id > 0) { self.bolTemEnquete = true; }

                if (self.bolVotacaoAberta) {
                    $rootScope.$broadcast("votacaoAbertaJuriPopular", { bolVotacaoAberta: true });
                }
            }

            if ($scope.etapaInscricaoEnvio) {
                self.bolEnvioPreSelecionado = $scope.etapaInscricaoEnvio.BolPreSelecao;
            }

            $scope.$on("estadoVotacaoJuriPopular", function (event, obj) {
                //console.log('perguntaram estado da votacao!');

                if (self.bolVotacaoAberta) { $rootScope.$broadcast("votacaoAbertaJuriPopular", { bolVotacaoAberta: true }); }
            });

            self.getTextoBotao = function () {
                var strTexto = "";

                if (!self.bolVotou) {
                    strTexto = "Votar neste";
                }
                else {
                    strTexto = "Você votou";
                }
                return strTexto;
            };

            self.getTextoVotos = function () {
                var strTexto = "";

                if (!self.bolVotou) {
                    if (self.totalVotos == 1) {
                        strTexto = '<span>1</span> votou';
                    }
                    else {
                        strTexto = '<span>' + self.totalVotos + '</span> votaram';
                    }
                }
                else {
                    if ((self.totalVotos - 1) == 1) {
                        strTexto = '+ <span>' + (self.totalVotos - 1) + '</span> votou';
                    }
                    else {
                        strTexto = '+ <span>' + (self.totalVotos - 1) + '</span> votaram';
                    }

                }
                return strTexto;
            };

            self.getTextoVotacaoEncerrada = function () {
                var strTexto = "";

                if (!self.bolVotou) {
                    if (self.totalVotos == 1) {
                        strTexto = 'Votos: <span>1 votou</span>';
                    }
                    else {
                        strTexto = 'Votos: <span>' + self.totalVotos + ' votaram</span>';
                    }
                }
                else {
                    if (self.totalVotos == 1) {
                        strTexto = 'Votos: <span>1 votou</span>';
                    }
                    else {
                        strTexto = 'Votos: <span>Você + ' + (self.totalVotos - 1) + ' votaram</span>';
                    }
                }
                return strTexto;
            };

            self.votar = function () {
                if (!self.bolAlterando && !self.bolVotou) {
                    self.setVotoUsuario();
                }
            };

            self.cancelarVoto = function () {
                if (!self.bolAlterando && self.bolVotou) {
                    self.setVotoUsuario();
                }
            };

            self.setVotoUsuario = function () {
                var param = {
                    idEnquete: self.idEnquete,
                    idObjeto: self.idObjetoVotacao
                };

                if (!self.bolAlterando) {

                    self.bolAlterando = true;
                    $http.post(
                        '/AVA/Projetos/Servico/SetVotoEnqueteJuriPopular/',
                        param
                    ).success(function (data, status, headers, config) {
                        if (data) {
                            //console.log('===data===');
                            //console.log(data);

                            self.bolVotou = data.EnqueteVotoEnvio.BolVotou;
                            self.totalVotos = data.EnqueteVotoEnvio.TotalVotos;

                            $scope.enquete.EtapaEnqueteVoto = data.EnqueteVotoEnvio;
                        }
                        else {
                            alert("Não foi possível completar a ação!");
                        }
                        self.bolAlterando = false;

                    }).error(function (data, status, headers, config) {
                        alert("Não foi possível completar a ação!");
                        self.bolAlterando = false;
                    });

                }

            };

        } ],
        controllerAs: "votacaoSimples"
    };
});
