"use strict";


angular.module("resultado")
.controller('Relogio2015Ctrl',
["$http", "$scope", "$timeout", "$filter", "$location", "projetoMapa", function ($http, $scope, $timeout, $filter, $location, projetoMapa) {
    
    var self = this;
    var map;
    var _strOrdemAba = "6";
    var allMarkerClusters = [];

    $scope.objEtapaFiltro = {};
    $scope.objFilter = { markers: [], opcao: "" };


    /*Pega Id Etapa para filtro */
    if ($scope.edicao) if ($scope.edicao.Etapas) {
        var _objEtapa = $filter("filter")($scope.edicao.Etapas, { Link: "relogiodesol" }, true);
        if (_objEtapa.length > 0) {
            $scope.objEtapaFiltro = _objEtapa[0];
        }
    }


    /**
    '==========================================================================='
    '   # Buscar campos opção para passar a SP, pegando dados do json config #  '
    '==========================================================================='
    **/

    var _strFormCampoDiaTemperatura = "";
    var _strFormCampoDia = "";
    var _strOpcao_Brincadeira = "";
    var _strOpcao_Curiosidade = "";
    var _strOpcao_Entrevista = "";

    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }

            /* pega opções comuns */
            //--!> Etapa 1
            if ($scope.resultado.JsonConfig.etapa1) {
                if ($scope.resultado.JsonConfig.etapa1.formcampo_diatemperatura) { //Dia e Temperatura
                    _strFormCampoDiaTemperatura = $scope.resultado.JsonConfig.etapa1.formcampo_diatemperatura;
                }

                if ($scope.resultado.JsonConfig.etapa1.formcampo_dia) { //Opção só dia
                    _strFormCampoDia = $scope.resultado.JsonConfig.etapa1.formcampo_dia;
                }
            }
            //--!> Etapa 2 - Brincadeiras
            if ($scope.resultado.JsonConfig.etapa2) {
                if ($scope.resultado.JsonConfig.etapa2.brincadeiras && $scope.resultado.JsonConfig.etapa2.brincadeiras.strFormCampoOpcao) {
                    _strOpcao_Brincadeira = $scope.resultado.JsonConfig.etapa2.brincadeiras.strFormCampoOpcao;
                }
            }

            //--!> Etapa 2 - Curiosidade
            if ($scope.resultado.JsonConfig.etapa2) {
                if ($scope.resultado.JsonConfig.etapa2.curiosidades && $scope.resultado.JsonConfig.etapa2.curiosidades.strFormCampoOpcao) {
                    _strOpcao_Curiosidade = $scope.resultado.JsonConfig.etapa2.curiosidades.strFormCampoOpcao;
                }
            }

            //--!> Etapa 2 - Entrevistas
            if ($scope.resultado.JsonConfig.etapa2) {
                if ($scope.resultado.JsonConfig.etapa2.entrevistas && $scope.resultado.JsonConfig.etapa2.entrevistas.strFormCampoOpcao) {
                    _strOpcao_Entrevista = $scope.resultado.JsonConfig.etapa2.entrevistas.strFormCampoOpcao;
                }
            }
            /* fim dados comuns */
        }
    }
    /** Fim busca Json Config **/

    $scope.$on("mapInitialized", function (event, evtMap) {
        map = evtMap;

        //Quando o mapa estabilizar, faz ajax apenas uma vez!
        google.maps.event.addListenerOnce(map, "idle", function () {
            self.requestMap();
        });
    });

    this.requestMap = function () {
        $http({
            url: '/AVA/Resultados/NossaRegiao2015/JsonResultadoDadosPorOrdemAba',
            params: {
                'ordem': _strOrdemAba,
                'campo_diatemperatura': _strFormCampoDiaTemperatura,
                'campo_dia': _strFormCampoDia,
                'campoopcao_brincadeira': _strOpcao_Brincadeira,
                'campoopcao_curiosidade': _strOpcao_Curiosidade,
                'campoopcao_entrevista': _strOpcao_Entrevista
            },
            method: "GET"
        }).success(function (response) {
            var data = {};
            if (typeof (response) == "string") {
                data = angular.fromJson(response);
            }
            else {
                data = response;
            }

            if (data) if (data.dados) {
                if (typeof (data.dados) == "string") {
                    data.dados = angular.fromJson(data.dados);
                }
                else {
                    data.dados = data.dados;
                }

                $scope.listMapa = data.dados;
                $timeout(function () {
                    self.setupAllMarkersCluster($scope.listMapa);
                }, 200);
            }

        });
    };

    this.setupAllMarkersCluster = function (objLista) {
        angular.forEach(objLista, function (objeto, index) {
            var locationData = projetoMapa.getCoordenadasByUfCidade(objeto.Estado, objeto.Cidade);
            if (locationData != null) {
                var latLng = new google.maps.LatLng(locationData.position[0], locationData.position[1]);

                var tempMarker = new google.maps.Marker({
                    position: latLng,
                    //title: $scope.Escolas[escola].Cidade + "/" + $scope.Escolas[escola].Estado,
                    //icon: $scope.Marcador,
                    cursor: 'pointer',
                    objeto: objeto
                })

                google.maps.event.addListener(tempMarker, 'click', function () {
                    $scope.objFilter.markers = [];
                    $scope.objFilter.markers.push(tempMarker.objeto);
                    $scope.$emit("broadGaleriaCluster", $scope.objFilter);
                });
                allMarkerClusters.push(tempMarker);
            }
        });


        if (allMarkerClusters.length > 0) {
            var clusters = new MarkerClusterer(map, allMarkerClusters, {
                'gridSize': 40,
                'averageCenter': true,
                'zoomOnClick': false
            });

            google.maps.event.addListener(clusters, 'clusterclick', function (clickedCluster) {
                $scope.objFilter.markers = [];
                var markers = clickedCluster.getMarkers();

                for (var i = 0; i < markers.length; i++) {
                    $scope.objFilter.markers.push(markers[i].objeto);
                }

                $scope.$emit("broadGaleriaCluster", $scope.objFilter);
            });

            $scope.$emit("broadGaleriaCluster", $scope.objFilter);
        }

    };



} ]);