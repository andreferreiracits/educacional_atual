angular.module('Mural').directive('postEnvio', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Mural/post-envio.html',
        scope: {
            usuario: "=usuario",
            post: "=post",
            comentario: "=comentario",
            objMensagemRapida: "=mensagemRapida",
            objEdicao: "=edicao",
            objEtapa: "=etapa",
            materiais: "=materiais"
        },
        controller: ['$http', '$scope', '$timeout', '$filter', function ($http, $scope, $timeout, $filter) {
            $scope.objEdicaoPost = $scope.objEdicao;

            var controller = this;

            $scope.envio = {};
            $scope.currentIndex = 0;
            
            if ($scope.objMensagemRapida) if ($scope.objMensagemRapida.FormularioPortalEnvio) {
                $scope.envio = $scope.objMensagemRapida.FormularioPortalEnvio;
                if ($scope.objMensagemRapida.FormularioPortalEnvio.Etapa) {
                    $scope.etapa = $scope.objMensagemRapida.FormularioPortalEnvio.Etapa;
                    $scope.edicao = $scope.objMensagemRapida.FormularioPortalEnvio.Etapa.Edicao;
                }
            }

            if ($scope.objMensagemRapida) if ($scope.objMensagemRapida.EtapaInscricaoEnvio) {
                $scope.envio = $scope.objMensagemRapida.EtapaInscricaoEnvio;
                if ($scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa) {
                    $scope.etapa = $scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa;
                    $scope.edicao = $scope.objMensagemRapida.EtapaInscricaoEnvio.Etapa.Edicao;
                }
            }


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

            $scope.setCurrentSlideIndex = function (index) {
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.prevSlide = function () {
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;

            };

        } ],
        controllerAs: "postEnvio"
    };
});
