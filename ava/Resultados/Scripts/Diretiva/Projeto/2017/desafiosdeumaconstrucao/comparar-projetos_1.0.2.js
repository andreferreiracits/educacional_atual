"use strict";

angular.module('resultado').run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);

angular.module('resultado').directive('compararProjetos', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/resultados/Scripts/Diretiva/Projeto/2017/desafiosdeumaconstrucao/comparar-projetos.html',
        scope: {
            bolPense: "=bolPense"
        },
        link: function (scope, el, attr) { },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', '$window', "projetoTools", "projetoMapaDesafiosDeumaConstrucao", function ($http, $scope, $timeout, $filter, $location, $window, projetoTools, projetoMapa) {
            var self = this;
            
        }],
        controllerAs: 'compararProjetosCtrl'
    };
});

angular.module("resultado")
    .controller('CompararProjetosCtrl',
    ["$http", "$scope", "$timeout", "$interval", "$filter", "$location", '$window', "$state", "$modal", "projetoMapaDesafiosDeumaConstrucao",
        function ($http, $scope, $timeout, $interval, $filter, $location, $window, $state, $modal, projetoMapa) {

            $scope.projetosSelecionados = [];
            $scope.loadInProgressComparar = false;
            $scope.loadInProgressMap = true;
            $scope.bolFirstLoad = true;

            $scope.idProjetoInscricaoSelecionado = 0;
            $scope.indexEnvios = 0;

            $scope.intCategoria = 1;
            $scope.oBotaoSelecionado = { 'background-color': '#e7e7e7', 'border-bottom': '5px solid #000', 'cursor': 'default' };
            $scope.oBotaoNormal = { 'background-color': 'transparent', 'border-bottom': '0px', 'cursor': 'pointer' };

            $scope.styleCat1 = $scope.oBotaoNormal;
            $scope.styleCat2 = $scope.oBotaoNormal;
            $scope.styleCat3 = $scope.oBotaoNormal;

            var _markersPrincipal = [];
            var map;
            var mapManager;
            var indexPOI;
            var geocoder = new google.maps.Geocoder();
            var indexInitLocations = 0;
            var todosEnvios = [];
            var currentMarkerSelected = null;
            var currentIdFamilia = 0;

            var planta = new Planta();
            var terreno = new Terreno();
            var maquete = new Maquete();
            var projetoSelecionado = null;
            
            if ($scope.bolPense == null) {
                $scope.bolPense = false;
            }

            $scope.$on('mapInitialized', function (event, evtMap) {
                map = evtMap;
                mapManager = new MarkerManager(map);

                google.maps.event.addListener(mapManager, "loaded", function () {
                    $scope.initLocations();
                });
            });

            $scope.CriarPOIsPorFamilia = function (idFamilia, pIntCategoria) {
                if (pIntCategoria != $scope.intCategoria) {
                    $scope.intCategoria = pIntCategoria;
                    $scope.SetStyleBotao();
                }
                indexInitLocations = 0;
                currentIdFamilia = idFamilia;
                $scope.loadInProgressMap = true;
                _markersPrincipal = [];

                $http({
                    url: "/AVA/Projetos/Servico/GetTurmasInscritasDesafiosDeUmaConstrucao2017",
                    method: "GET",
                    cache: false,
                    params: {
                        idProjetoCategoria: idFamilia
                    }
                }).success(function (data) {
                    if (data != null) {
                        $scope.ResultPOIs = data.ResultadoPOIs;
                        $scope.Envios = data.Envios;
                    }
                }).error(function (err) {
                    console.log("Não foi possível buscar detalhe das Turmas Inscritas");
                }).finally(function () {
                    self.loadingBuscarGeral = false;

                    $scope.loadInProgressMap = false;
                });

            };

            $scope.CriarPOIsPorFamilia(33, 1);

            $scope.initLocations = function () {
                var zIndexStart = 8000;
                if (indexInitLocations < $scope.ResultPOIs.length) {
                    var equipeParticipante = $scope.ResultPOIs[indexInitLocations];
                    var endereco = equipeParticipante.Endereco;
                    geocoder.geocode({ address: endereco }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var locationData = results[0].geometry.location;
                            if (locationData != null) {

                                var infoWindow = new google.maps.InfoWindow();

                                var icon = '';
                                if (!equipeParticipante.IsVencedor) {
                                    icon = "/AVA/Resultados/Imagens/house-marker-default.png";
                                } else {
                                    icon = "/AVA/Resultados/Imagens/trophy-venc-default.png";
                                }

                                var checkNewIcon = checkAlreadyInclude(equipeParticipante.IdFormularioResposta);

                                if (checkNewIcon != null) {
                                    icon = checkNewIcon;
                                }

                                var tempMarker = new MarkerWithLabel({
                                    position: locationData,
                                    icon: icon,
                                    labelInBackground: true,
                                    labelAnchor: new google.maps.Point(26, 32),
                                    labelStyle: { zIndex: zIndexStart }
                                });

                                infoWindow.addListener("domready", function () {
                                    //console.log('infoWindow.domready');
                                    //console.log(jQuery('.box-casa-selecao').find('input'));

                                    var check = checkAlreadyInclude(equipeParticipante.IdFormularioResposta);
                                    if (check != null) {
                                        $("#btn-comparar").prop("disabled", true);
                                        $("#btn-comparar").html('Comparando');
                                    }

                                    $("#btn-comparar").click(function () {
                                        $scope.checkIfChecked();
                                    });
                                    
                                    $("#btn-moredetails").click(function () {
                                        $scope.GoToPostEnvioByIdEnvio($scope.idProjetoInscricaoSelecionado);
                                    });
                                    
                                });

                                google.maps.event.addListener(tempMarker, 'click', function (e) {
                                    map.setCenter(this.getPosition());
                                    currentMarkerSelected = tempMarker;
                                    $scope.idProjetoInscricaoSelecionado = equipeParticipante.IdProjetoInscricao;
                                    var image = equipeParticipante.Imagem;
                                    var nomeCasa = equipeParticipante.NomeCasa;
                                    var cidadeUF = equipeParticipante.Endereco;
                                    var area = '0';
                                    if (equipeParticipante.Area != null || equipeParticipante.Area === 'undefined') {
                                        area = equipeParticipante.Area;
                                    }
                                    var valor = equipeParticipante.Valor;
                                    var content = $scope.ballonHTML(image, nomeCasa, cidadeUF, area, valor);
                                    infoWindow.setContent(content);
                                    infoWindow.open(map, tempMarker);
                                });


                                google.maps.event.addListener(tempMarker, "mouseover", function () {
                                    this.setOptions({ zIndex: (zIndexStart + 30) });
                                });

                                google.maps.event.addListener(tempMarker, "mouseout", function () {
                                    this.setOptions({ zIndex: zIndexStart });
                                });

                                _markersPrincipal.push(tempMarker);
                            }
                        }

                        indexInitLocations++;
                        $scope.initLocations();

                        if (_markersPrincipal.length > 0) {
                            $scope.markerClusterer = new MarkerClusterer(map, _markersPrincipal, {
                                'gridSize': 40,
                                'averageCenter': true
                            });
                        }
                    });

                    if (_markersPrincipal.length > 0) {
                        mapManager.addMarkers(_markersPrincipal, 1);
                        mapManager.refresh();
                    }
                }
            };

            function checkAlreadyInclude(idFormularioResposta) {
                var newIcon = null;
                if ($scope.projetosSelecionados.length > 0) {
                    for (var i = 0; i < $scope.projetosSelecionados.length; i++) {
                        var projeto = $scope.projetosSelecionados[i];
                        if (projeto.planta.idProjetoResposta == idFormularioResposta ||
                            projeto.maquete.idProjetoResposta == idFormularioResposta ||
                            projeto.terreno.idProjetoResposta == idFormularioResposta) {
                            if (i == 0) {
                                if (!projeto.isVencedor) {
                                    newIcon = "/AVA/Resultados/Imagens/house-marker-red.png";
                                } else {
                                    newIcon = "/AVA/Resultados/Imagens/trophy-venc-red.png";
                                }
                            } else if (i == 1) {
                                if (!projeto.isVencedor) {
                                    newIcon = "/AVA/Resultados/Imagens/house-marker-green.png";
                                } else {
                                    newIcon = "/AVA/Resultados/Imagens/trophy-venc-green.png";
                                }
                            } else if (i == 2) {
                                if (!projeto.isVencedor) {
                                    newIcon = "/AVA/Resultados/Imagens/house-marker-yellow.png";
                                } else {
                                    newIcon = "/AVA/Resultados/Imagens/trophy-venc-yellow.png";
                                }
                            }
                        }
                    }
                }
                return newIcon;
            }

            $scope.ballonHTML = function (image, nomeCasa, cidadeUF, area, valor) {
                var content = '<html>'
                content += '<style type="text/css"> ';
                content += '    .box-casa-selecao{ ';
                content += '    width: 320px; ';
                content += '    background-color: #fff;';
                content += '    border-radius: 5px;';
                content += '    padding: 10px;';
                content += '    box-shadow: 0px 0px 0px rgba(0,0,0,0.0); ';
                content += '     margin: 10px; ';
                content += '    }';
                content += '    .casa-foto img{ ';
                content += '    width: 130px;';
                content += '    height: auto;';
                content += '    }';
                content += '   ul.lista-dados-casa{';
                content += '     list-style: none; ';
                content += '     padding: 0; ';
                content += '   }';
                content += '   ul.lista-dados-casa li{';
                content += '     font-size: 12px;';
                content += '   }';
                content += '   ul.lista-dados-casa li:first-child{';
                content += '     font-weight: 600;';
                content += '   }';
                content += '   label{';
                content += '     font-size: 10px;';
                content += '   }';
                content += '   #btn-comparar:disabled {';
                content += '    background: #ccc;';
                content += '   }';
                content += '   </style>';
                content += '  <div class="box-casa-selecao"> ';
                content += '	<div class="row" style="margin-bottom: 10px;">';
                content += '	    <div class="casa-foto col-md-6">';
                content += '	        <img src="' + image + '">';
                content += '	    </div>';
                content += '	    <div class="dados-casa col-md-6">';
                content += '	        <ul class="lista-dados-casa">';
                content += '	            <li>' + nomeCasa + '</li>';
                content += '	            <li>Cidade: ' + cidadeUF + '</li>';
                content += '	            <li>Area: ' + area + ' m²</li>';
                content += '	            <li>Valor: R$ ' + valor + '</li>';
                content += '	        </ul>';
                content += '	    </div>';
                content += '	</div>';
                content += '	<div class="row">';
                content += '	    <div class="comparar-casa col-md-6">';
                content += '	        <button id="btn-comparar" type="button">Comparar</button>';
                content += '	    </div>';
                content += '	    <div class="detalhes-casa col-md-6">';

                if ($scope.bolPense) {
                    content += '&nbsp;';
                }
                else {
                    content += '	        <button id="btn-moredetails" >mais detalhes</button>';
                }

                content += '	    </div>';
                content += '	 </div>';
                content += ' </div>';
                content += ' </html>';
                return content;
            };

            $scope.checkAllSteps = function (idInscricao) {
                var result = [];
                for (var i = 0; i < $scope.Envios.length; i++) {
                    var equipe = $scope.Envios[i];
                    if (equipe.IdProjetoInscricao == idInscricao) {
                        result.push(equipe);
                    }
                }
                return result;
            };

            function getEnvioByIdFormularioResposta(idFormularioResposta) {
                var result = null;
                for (var i = 0; i < $scope.Envios.length; i++) {
                    var envio = $scope.Envios[i];
                    if (envio.IdFormularioResposta == idFormularioResposta) {
                        result = envio;
                    }
                }
                return result;
            };

            $scope.checkIfChecked = function () {
                if ($scope.projetosSelecionados.length >= 0 && $scope.projetosSelecionados.length <= 2) {
                    if ($scope.idProjetoInscricaoSelecionado != 0) {
                        $scope.loadInProgressComparar = true;
                        $scope.indexEnvios = 0;
                        todosEnvios = $scope.checkAllSteps($scope.idProjetoInscricaoSelecionado);
                        var envio = todosEnvios[$scope.indexEnvios];
                        GetAllFormulario(envio.IdFormulario,
                            envio.IdFormularioResposta,
                            envio.IdProjetoInscricao);
                        $("#btn-comparar").prop("disabled", true);
                        $("#btn-comparar").html('Comparando');
                    }
                } else {
                    alert("Remova uma das casas para realizar a comparação");
                }
            }

            $scope.removeProject = function (index) {
                if (index >= 0 && index <= 3 && $scope.projetosSelecionados.length > 0) {
                    var newIcon = '';
                    var currentMarkerSelected = $scope.projetosSelecionados[index].marker;
                    mapManager.removeMarker(currentMarkerSelected, true);
                    if (!$scope.projetosSelecionados[index].isVencedor) {
                        newIcon = "/AVA/Resultados/Imagens/house-marker-default.png";
                    } else {
                        newIcon = "/AVA/Resultados/Imagens/trophy-venc-default.png";
                    }
                    var valueFamilia = '';
                    if (currentIdFamilia == 33) {
                        valueFamilia = "Família Santos";
                    } else if (currentIdFamilia == 34) {
                        valueFamilia = "Família Drabik";
                    } else if (currentIdFamilia == 35) {
                        valueFamilia = "Família Freitas";
                    }
                    currentMarkerSelected.icon = newIcon;
                    if ($scope.projetosSelecionados[index].familia == valueFamilia) {
                        mapManager.addMarker(currentMarkerSelected, true);
                        mapManager.refresh();
                    }

                    $scope.projetosSelecionados.splice(index, 1);

                    for (var i = 0; i < $scope.projetosSelecionados.length; i++) {
                        var currentMarkerSelected = $scope.projetosSelecionados[i].marker;
                        mapManager.removeMarker(currentMarkerSelected, true);
                        if (i == 0) {
                            if (!$scope.projetosSelecionados[i].isVencedor) {
                                newIcon = "/AVA/Resultados/Imagens/house-marker-red.png";
                            } else {
                                newIcon = "/AVA/Resultados/Imagens/trophy-venc-red.png";
                            }
                        } else if (i == 1) {
                            if (!$scope.projetosSelecionados[i].isVencedor) {
                                newIcon = "/AVA/Resultados/Imagens/house-marker-green.png";
                            } else {
                                newIcon = "/AVA/Resultados/Imagens/trophy-venc-green.png";
                            }
                        }
                        currentMarkerSelected.icon = newIcon;
                        if ($scope.projetosSelecionados[i].familia == valueFamilia) {
                            mapManager.addMarker(currentMarkerSelected, true);
                            mapManager.refresh();
                        }
                    }
                }
            }

            $scope.openModalCategoria = function () {

                var objCategoria = {};

                var modalInstance = $modal.open({
                    templateUrl: '/AVA/Resultados/Scripts/Diretiva/Projeto/2017/desafiosdeumaconstrucao/modal-categoria.html',
                    controller: 'compararModalCategoriaCtrl',
                    //size: 'sm',
                    resolve: {
                        objCategoria: function () {
                            return objCategoria;
                        },
                        intCategoria: function () {
                            return $scope.intCategoria;
                        }
                    },
                    backdrop: 'static'
                });

                modalInstance.result.then(function () {
                    // Ao clicar em "OK", recebe os parametros!
                    //$log.info('Modal result dismissed at: ' + new Date());
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });

                modalInstance.opened.then(function (parametro) {
                    // Ao clicar em "OK", recebe os parametros!
                }, function () {
                    //$log.info('Modale opened dismissed at: ' + new Date());
                });
            };

            $scope.SetStyleBotao = function () {
                if ($scope.intCategoria == 1) {
                    $scope.styleCat1 = $scope.oBotaoSelecionado;
                    $scope.styleCat2 = $scope.oBotaoNormal;
                    $scope.styleCat3 = $scope.oBotaoNormal;
                }

                if ($scope.intCategoria == 2) {
                    $scope.styleCat1 = $scope.oBotaoNormal;
                    $scope.styleCat2 = $scope.oBotaoSelecionado;
                    $scope.styleCat3 = $scope.oBotaoNormal;
                }

                if ($scope.intCategoria == 3) {
                    $scope.styleCat3 = $scope.oBotaoSelecionado;
                    $scope.styleCat2 = $scope.oBotaoNormal;
                    $scope.styleCat1 = $scope.oBotaoNormal;
                }
            };

            $scope.GoToPostEnvioMaquete = function (idResposta) {
                var envio = null;
                for (var i = 0; i < $scope.Envios.length; i++) {
                    var item = $scope.Envios[i];
                    if (item.IdFormularioResposta == idResposta) {
                        envio = item;
                        break;
                    }
                }

                if (envio != null) {
                    var newUrl = '/AVA/Projetos/2017/desafiosdeumaconstrucao/etapas/maquete/' + envio.MensagemRapidaCrypt;
                    window.open($window.location.origin + newUrl, '_blank');
                }
            }

            $scope.GoToPostEnvioTerreno = function (idResposta) {
                var envio = null;
                for (var i = 0; i < $scope.Envios.length; i++) {
                    var item = $scope.Envios[i];
                    if (item.IdFormularioResposta == idResposta) {
                        envio = item;
                        break;
                    }
                }

                if (envio != null) {
                    var newUrl = '/AVA/Projetos/2017/desafiosdeumaconstrucao/etapas/terreno/' + envio.MensagemRapidaCrypt;
                    window.open($window.location.origin + newUrl, '_blank');
                }
            }

            $scope.GoToPostEnvioPlanta = function (idResposta) {
                var envio = null;
                for (var i = 0; i < $scope.Envios.length; i++) {
                    var item = $scope.Envios[i];
                    if (item.IdFormularioResposta == idResposta) {
                        envio = item;
                        break;
                    }
                }

                if (envio != null) {
                    var newUrl = '/AVA/Projetos/2017/desafiosdeumaconstrucao/etapas/planta/' + envio.MensagemRapidaCrypt;
                    window.open($window.location.origin + newUrl, '_blank');
                }
            }

            $scope.GoToPostEnvioByIdEnvio = function (idProjetoInscricao) {
                var envio = [];
                for (var i = 0; i < $scope.Envios.length; i++) {
                    var item = $scope.Envios[i];
                    if (item.IdProjetoInscricao == idProjetoInscricao) {
                        envio.push(item);
                    }
                }

                var newUrl = '/AVA/Projetos/2017/desafiosdeumaconstrucao/etapas/maquete/' + envio[envio.length - 1].MensagemRapidaCrypt;
                window.open($window.location.origin + newUrl, '_blank');
            }

            function GetAllFormulario(idFormulario, idFormularioResposta, idInscricao) {

                $http({
                    url: "/AVA/ProjetoApi/v1/Formulario/GetAll/",
                    method: "GET",
                    cache: false,
                    params: {
                        idFormulario: idFormulario,
                        idFormularioResposta: idFormularioResposta,
                        idInscricao: idInscricao,
                    }
                }).success(function (data) {
                    if (data) {
                        if (data.Config.Id == 128) { // ETAPA DA PLANTA
                            planta = new Planta();
                            for (var i = 0; i < data.FormularioResposta.Campos.length; i++) {
                                var campo = data.FormularioResposta.Campos[i];
                                if (campo.FormularioCampo.Id === 920) {
                                    planta.setImage(campo.Valor);
                                } else if (campo.FormularioCampo.Id === 923) {
                                    var itens = []
                                    for (var x = 0; x < campo.Itens.length; x++) {
                                        itens.push(campo.Itens[x]);
                                    }
                                    planta.setComodos(itens);
                                } else if (campo.FormularioCampo.Id === 997 || campo.FormularioCampo.Id === 1056) {
                                    planta.setTotalArea(campo.Valor + " m²");
                                }
                            }
                            planta.setIdProjetoResposta(data.FormularioResposta.Id);
                        } else if (data.Config.Id == 127) { // ETAPA DO TERRENO
                            terreno = new Terreno();
                            for (var i = 0; i < data.FormularioResposta.Campos.length; i++) {
                                var campo = data.FormularioResposta.Campos[i];
                                if (campo.FormularioCampo.Id == 937) {
                                    terreno.setImage(campo.Valor);
                                } else if (campo.FormularioCampo.Id == 908) {
                                    terreno.setCidadeUF(campo.Valor);
                                } else if (campo.FormularioCampo.Id == 975 || campo.FormularioCampo.Id == 947) {
                                    terreno.setFrente(campo.Valor + " m");
                                } else if (campo.FormularioCampo.Id == 976 || campo.FormularioCampo.Id == 948) {
                                    terreno.setFundo(campo.Valor + " m");
                                } else if (campo.FormularioCampo.Id == 974 || campo.FormularioCampo.Id == 946) {
                                    terreno.setArea(campo.Valor + " m²");
                                } else if (campo.FormularioCampo.Id == 912) {
                                    terreno.setValorTerreno("R$ " + campo.Valor);
                                } else if (campo.FormularioCampo.Id == 917) {
                                    terreno.setJustificativa(campo.Valor);
                                }
                            }
                            terreno.setIdProjetoResposta(data.FormularioResposta.Id);
                        } else if (data.Config.Id == 129) { // ETAPA DO MAQUETE - APRESENTACAO
                            for (var i = 0; i < data.FormularioResposta.Campos.length; i++) {
                                var campo = data.FormularioResposta.Campos[i];
                                if (campo.FormularioCampo.Id == 928) {
                                    maquete.setImage(campo.Valor);
                                } else if (campo.FormularioCampo.Id == 944) {
                                    maquete.setValorObra("R$ " + campo.Valor);
                                } else if (campo.FormularioCampo.Id == 926) {
                                    maquete.setValorImovel("R$ " + campo.Valor);
                                } else if (campo.FormularioCampo.Id == 925) {
                                    maquete.setTituloCasa(campo.Valor);
                                }
                            }
                            maquete.setIdProjetoResposta(data.FormularioResposta.Id);
                        } else if (data.Config.Id == 130) { // ETAPA DO MAQUETE - SERVICOS INICIAIS
                            for (var i = 0; i < data.FormularioResposta.Campos.length; i++) {
                                var campo = data.FormularioResposta.Campos[i];
                                if (campo.FormularioCampo.Id == 940) {
                                    maquete.setServicosIniciais("R$ " + campo.Valor);
                                }
                            }
                        } else if (data.Config.Id == 131) { // ETAPA DO MAQUETE - CONSTRUCAO
                            for (var i = 0; i < data.FormularioResposta.Campos.length; i++) {
                                var campo = data.FormularioResposta.Campos[i];
                                if (campo.FormularioCampo.Id == 941) {
                                    maquete.setConstrucaoBruta("R$ " + campo.Valor);
                                }
                            }
                        } else if (data.Config.Id == 132) { // ETAPA DO MAQUETE - ACABAMENTO
                            for (var i = 0; i < data.FormularioResposta.Campos.length; i++) {
                                var campo = data.FormularioResposta.Campos[i];
                                if (campo.FormularioCampo.Id == 1250 || campo.FormularioCampo.Id == 1059) {
                                    maquete.setAcabamento("R$ " + campo.Valor);
                                }
                            }
                        } else if (data.Config.Id == 133) { // ETAPA DO MAQUETE - AREA EXTERNA
                            for (var i = 0; i < data.FormularioResposta.Campos.length; i++) {
                                var campo = data.FormularioResposta.Campos[i];
                                if (campo.FormularioCampo.Id == 943) {
                                    maquete.setAreaExterna("R$ " + campo.Valor);
                                }
                            }
                        }

                        $scope.indexEnvios++;
                        if ($scope.indexEnvios < todosEnvios.length) {
                            var envio = todosEnvios[$scope.indexEnvios];
                            GetAllFormulario(envio.IdFormulario,
                                envio.IdFormularioResposta,
                                envio.IdProjetoInscricao);
                        } else {
                            var envio = getEnvioByIdFormularioResposta(data.FormularioResposta.Id)

                            $scope.loadInProgressComparar = false;
                            $scope.indexEnvios = 0;
                            mapManager.removeMarker(currentMarkerSelected, true);
                            var newIcon = '';
                            if ($scope.projetosSelecionados.length == 0) {
                                if (!envio.IsVencedor) {
                                    newIcon = "/AVA/Resultados/Imagens/house-marker-red.png";
                                } else {
                                    newIcon = "/AVA/Resultados/Imagens/trophy-venc-red.png";
                                }
                            } else if ($scope.projetosSelecionados.length == 1) {
                                if (!envio.IsVencedor) {
                                    newIcon = "/AVA/Resultados/Imagens/house-marker-green.png";
                                } else {
                                    newIcon = "/AVA/Resultados/Imagens/trophy-venc-green.png";
                                }
                            } else if ($scope.projetosSelecionados.length == 2) {
                                if (!envio.IsVencedor) {
                                    newIcon = "/AVA/Resultados/Imagens/house-marker-yellow.png";
                                } else {
                                    newIcon = "/AVA/Resultados/Imagens/trophy-venc-yellow.png";
                                }
                            }
                            currentMarkerSelected.icon = newIcon;
                            mapManager.addMarker(currentMarkerSelected, true);
                            mapManager.refresh();
                            projetoSelecionado = new Project(terreno, planta, maquete);
                            if (currentIdFamilia == 33) {
                                projetoSelecionado.setFamilia("Família Santos");
                            } else if (currentIdFamilia == 34) {
                                projetoSelecionado.setFamilia("Família Drabik");
                            } else if (currentIdFamilia == 35) {
                                projetoSelecionado.setFamilia("Família Freitas");
                            }
                            projetoSelecionado.setIsVencedor(envio.IsVencedor);
                            projetoSelecionado.setMarker(currentMarkerSelected);
                            maquete = new Maquete();
                            $scope.projetosSelecionados.push(projetoSelecionado);
                        }

                    }
                }).error(function (data, status, headers, config) {
                    console.log("Ocorreu um erro ao buscar os dados [comparar-projetos.js]");
                })
            };

            $scope.SetStyleBotao();

        }]);

angular.module("resultado").controller('compararModalCategoriaCtrl', [
    "$http", "$scope", "$timeout", "$interval", "$filter", "$location", "$state", "$modalInstance", "objCategoria", "intCategoria",
    function ($http, $scope, $timeout, $interval, $filter, $location, $state, $modalInstance, objCategoria, intCategoria) {
        var self = this;

        $scope.objCategoria = objCategoria;
        $scope.intCategoria = intCategoria;
        $scope.intMembroFamilia = 1;

        console.log($scope.objCategoria);

        $scope.setMembro = function (pIntMembro) {
            if ($scope.intMembroFamilia != pIntMembro) {
                $scope.intMembroFamilia = pIntMembro;
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);