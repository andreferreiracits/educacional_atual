"use strict";

angular.module("resultado")
.controller('NossoSotaque2015Ctrl',
["$http", "$scope", "$timeout", "$filter", "$location", "projetoMapa", function ($http, $scope, $timeout, $filter, $location, projetoMapa) {

    var self = this;
    var map;
    var mgr;
    var _markersPrincipal = [];
    var _markersRestantes = [];
    var _totalCities = 3;
    var _strOrdemAba = "5";
    
    $scope.bolCarregouDados = false;
    $scope.listMapa = new Array();
    $scope.dadosGerais = [];
    $scope.dadosConfig = {};
    $scope.allMarkers = [];
    $scope.selectedMarkers = [];
    $scope.cityToAdd = [];
    $scope.objEtapa = {};
    $scope.intDestaqueGrafico = 0;


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


    //$scope.mapaResultado = projetoMapa.getTodasCoordenadas();
    this.initDefaultObjects = function () {
        for (var i = 0; i < _totalCities; i++) {
            $scope.selectedMarkers[i] = new self.createDefaultSelectedMarker();
            $scope.cityToAdd[i] = new self.createDefaultCity();
        }
    };

    this.createDefaultSelectedMarker = function () {
        return { indice: -1, showAddOverlay: false, objeto: {}, marker: {} };
    };

    this.createDefaultCity = function () {
        return { indice: 0, Estado: "", Cidade: "", Hora: 0 };
    };

    $scope.setHourToCity = function (index, value) {
        if ($scope.cityToAdd[index]) {
            $scope.cityToAdd[index].Hora = value;
        }
    };

    $scope.$on("mapInitialized", function (event, evtMap) {
        map = evtMap;
        mgr = new MarkerManager(map);

        google.maps.event.addListener(mgr, "loaded", function () {
            self.requestMap();
        });
    });

    this.requestMap = function () {
        $http({
            url: '/AVA/Resultados/NossaRegiao2015/JsonResultadoDadosPorOrdemAba',
            params: {
                'ordem': _strOrdemAba,
                'campo_diatemperatura' : _strFormCampoDiaTemperatura,
                'campo_dia' : _strFormCampoDia,
                'campoopcao_brincadeira' : _strOpcao_Brincadeira,
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
                    self.setupAllMarkers($scope.listMapa);
                }, 200);
            }

        });
    };

    $scope.addCity = function (index) {
        if ($scope.selectedMarkers[index]) {
            $scope.selectedMarkers[index].showAddOverlay = true;
        }
    };

    $scope.closeAddOverlay = function (index) {
        if ($scope.selectedMarkers[index]) {
            $scope.selectedMarkers[index] = new self.createDefaultSelectedMarker();
            $scope.cityToAdd[index] = new self.createDefaultCity();
        }
    };

    $scope.setDestaqueGrafico = function (idx) {
        $scope.intDestaqueGrafico = idx;
    };


    $scope.setCityDetails = function (index, city) {
        var bolAchou = false;
        if (index >= 0 && city != "") {
            for (var i = 0; i < $scope.allMarkers.length; i++) {
                if ($scope.allMarkers[i]) if ($scope.allMarkers[i].objeto) {
                    if ($scope.allMarkers[i].objeto.Cidade.toLowerCase() == city.toLowerCase()) {
                        var idxCidade = i;
                        $scope.cityToAdd[index].indice = idxCidade;
                        $scope.saveCityToMap(index);
                        bolAchou = true;
                        break;
                    }
                }
            }
        }

        if (!bolAchou) {
            $scope.selectedMarkers[index] = new self.createDefaultSelectedMarker();
            $scope.cityToAdd[index] = new self.createDefaultCity();
            $scope.$emit("broadGaleria", $scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig);
        }
    };

    $scope.getCityDetails = function (index) {
        var city = "";

        if ($scope.cityToAdd[index]) if ($scope.cityToAdd[index].Cidade != null && $scope.cityToAdd[index].Cidade != "") {
            city = $scope.cityToAdd[index].Cidade;
        }

        if (city != "") {
            $scope.setCityDetails(index, city);
        } else {
            $scope.cityToAdd[index].indice = 0;
            $scope.cityToAdd[index].bolHora_1 = 0;
            $scope.cityToAdd[index].bolHora_2 = 0;
            $scope.cityToAdd[index].Hora = 0;
        }
    };


    this.getIndiceMapByCity = function (city) {
        var idxCidade = 0;
        for (var i = 0; i < $scope.allMarkers.length; i++) {
            if ($scope.allMarkers[i]) if ($scope.allMarkers[i].objeto) {
                if ($scope.allMarkers[i].objeto.Cidade.toLowerCase() == city.toLowerCase()) {
                    idxCidade = i;
                    break;
                }
            }
        }
        return idxCidade;
    };

    this.getTotalSelectedMarkers = function () {
        var total = 0;
        for (var i = 0; i < $scope.selectedMarkers.length; i++) {
            if ($scope.selectedMarkers[i]) if ($scope.selectedMarkers[i].objeto) {
                if ($scope.selectedMarkers[i].objeto.Cidade != null) {
                    total++;
                }
            }
        }
        return total;
    };

    $scope.getTotalSelectedMarkers = function () {
        var total = 0;
        for (var i = 0; i < $scope.selectedMarkers.length; i++) {
            if ($scope.selectedMarkers[i]) if ($scope.selectedMarkers[i].objeto) {
                if ($scope.selectedMarkers[i].objeto.Cidade != null) {
                    total++;
                }
            }
        }
        return total;
    };

    this.getFreeSlotCity = function () {
        var indice = 0;
        for (var i = 0; i < $scope.selectedMarkers.length; i++) {
            if ($scope.selectedMarkers[i] && (!$scope.selectedMarkers[i].objeto || $scope.selectedMarkers[i].objeto.Cidade == null)) {
                indice = i;
                break;
            }
        }
        return indice;
    };

    $scope.freeSlotByIdx = function (idxCidade) {
        for (var i = 0; i < $scope.selectedMarkers.length; i++) {
            if ($scope.selectedMarkers[i] && $scope.selectedMarkers[i].objeto) {
                if ($scope.selectedMarkers[i].indice == idxCidade) {
                    $scope.clearMapOverlayByIdx(i, idxCidade);
                    
                    if ($scope.selectedMarkers[i].slug) {
                        $scope.$emit("removeAudio", $scope.selectedMarkers[i].slug);
                    }

                    $scope.selectedMarkers[i] = new self.createDefaultSelectedMarker();
                    $scope.cityToAdd[i] = new self.createDefaultCity();
                    $scope.$emit("broadGaleria", $scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig);

                    $scope.safeApply();
                    break;
                }
            }
        }
    };

    $scope.saveCityToMap = function (indice) {
        if ($scope.cityToAdd[indice] != null) {
            var cidadeOverlay = $scope.cityToAdd[indice];

            if (cidadeOverlay.Cidade != null && cidadeOverlay.Cidade != "") {
                var _idxCidade = self.getIndiceMapByCity(cidadeOverlay.Cidade);
                $scope.cityToAdd[indice].indice = _idxCidade;
            }

            if ((cidadeOverlay.indice != null && parseInt(cidadeOverlay.indice) >= 0) && (cidadeOverlay.Cidade != null && cidadeOverlay.Cidade != "")) {
                var idxCidade = $scope.cityToAdd[indice].indice;
                var totalSelected = self.getTotalSelectedMarkers();

                if (idxCidade != null && idxCidade >= 0) {
                    var divAux = document.createElement("div");
                    var obj = $scope.allMarkers[idxCidade].marker;

                    if (obj != null && obj) {
                        divAux.innerHTML = obj.labelContent;
                        var anchor = $(divAux.getElementsByTagName("A")[0]);
                        if (anchor.hasClass("mais")) {

                            var freeIndice = indice; //self.getFreeSlotCity();
                            var slug;
                            var _auxSlug = $filter("makeSlugBasic")($scope.allMarkers[idxCidade].objeto.Cidade);

                            if (_auxSlug != "" && _auxSlug !== undefined) {
                                slug = _auxSlug;
                            }
                
                            //$scope.allMarkers[idxCidade].objeto.Cidade
                            $scope.selectedMarkers[freeIndice] =
                            {
                                indice: idxCidade,
                                showAddOverlay: false,
                                objeto: $scope.allMarkers[idxCidade].objeto,
                                slug: slug,
                                marker: $scope.allMarkers[idxCidade].marker
                            };

                            $scope.intDestaqueGrafico = freeIndice;

                            if (cidadeOverlay.Estado == null || cidadeOverlay.Estado == "" || cidadeOverlay.Estado === undefined) {
                                $scope.cityToAdd[indice].Estado = $scope.allMarkers[idxCidade].objeto.Estado;
                            }

                            anchor
                                .removeClass("mais")
                                .addClass("fechar");

                            anchor.parent("div")
                                .addClass("ativo")
                                .addClass("cidade-" + (freeIndice + 1));

                            map.setCenter(obj.getPosition());
                            map.setZoom(6);

                            obj.setZIndex(obj.getZIndex() + 20);
                            obj.labelContent = divAux.innerHTML;

                            try {
                                obj.label.draw();
                            } catch (err) {
                                //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
                            }

                            $scope.$emit("broadGaleria", $scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig);
                        } else {
                            //Se já foi adicionada, verifica se existe outro horário disponível.
                            $timeout(function () {
                                alert("Esta cidade já foi adicionada!");
                                $scope.cityToAdd[indice] = new self.createDefaultCity();
                            }, 10);
                        }
                    }
                }
            }
        }
    };

    $scope.openCityDetails = function (idxCidade) {
        var totalSelected = self.getTotalSelectedMarkers();
        var divAux = document.createElement("div");
        var obj = $scope.allMarkers[idxCidade].marker;


        if (obj != null && obj) {
            divAux.innerHTML = obj.labelContent;
            var anchor = $(divAux.getElementsByTagName("A")[0]);
            if (anchor.hasClass("mais")) {
                if (totalSelected < _totalCities) {
                    //Abrir fancybox, sem atualizar cor,objeto!
                    var freeIndice = self.getFreeSlotCity();

                    $scope.selectedMarkers[freeIndice] =
                    {
                        indice: idxCidade,
                        showAddOverlay: true
                        // objeto: $scope.allMarkers[idxCidade].objeto,
                        // marker: $scope.allMarkers[idxCidade].marker
                    };

                    $scope.cityToAdd[freeIndice] =
                    {
                        indice: idxCidade,
                        Estado: $scope.allMarkers[idxCidade].objeto.Estado,
                        Cidade: $scope.allMarkers[idxCidade].objeto.Cidade,
                        bolHora_1: $scope.allMarkers[idxCidade].objeto.bolHora_1,
                        bolHora_2: $scope.allMarkers[idxCidade].objeto.bolHora_2,
                        Hora: 0
                    };

                    $scope.saveCityToMap(freeIndice);
                    $scope.safeApply();
                } else {
                    alert("O limite é de " + _totalCities + " cidades!");
                }
            } else {
                $scope.freeSlotByIdx(idxCidade);
            }
        }
    };


    $scope.clearMapOverlayByIdx = function (index, idxCidade) {

        var divAux = document.createElement("div");
        var obj = $scope.allMarkers[idxCidade].marker;

        if (obj != null && obj) {
            divAux.innerHTML = obj.labelContent;
            var anchor = $(divAux.getElementsByTagName("A")[0]);

            anchor
                .removeClass("fechar")
                .addClass("mais");
            anchor.parent("div")
                .removeClass("ativo")
                .removeClass("cidade-" + (index + 1));

            obj.setZIndex(obj.getZIndex() - 2);
            obj.labelContent = divAux.innerHTML;

            try {
                obj.label.draw();
            } catch (err) {
                //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
            }
        }
    };

    this.setupAllMarkers = function (objLista) {
        var arrEstadoSelecionado = [];
        var zIndexStart = 8000;

        angular.forEach(objLista, function (objeto, index) {
            var locationData = projetoMapa.getCoordenadasByUfCidade(objeto.Estado, objeto.Cidade);
            if (locationData != null) {
                var latLng = new google.maps.LatLng(locationData.position[0], locationData.position[1]);
                var html = '<div class="thumbs" style="position:none;">';
                html += "<a href='' rel='" + index + "' class='mais'></a>";
                html += '	<h6>' + objeto.Cidade + '</h6>';
                html += '	<div class="dados-cidade">';
                html += '		<span class="mes">Abr</span>';
                html += '		<span class="max">' + objeto.MaxTemperatura + '</span>';
                html += '		<span class="min">' + objeto.MinTemperatura + '</span>';
                html += '	</div>';
                html += '</div>';

                var bolUfSetada = $filter('filter')(arrEstadoSelecionado, { UF: objeto.Estado }, true);
                arrEstadoSelecionado.push({ UF: objeto.Estado });

                var marker = new MarkerWithLabel({
                    position: latLng,
                    icon: "/AVA/Resultados/Imagens/marker_transparent.png",
                    labelContent: html,
                    labelAnchor: new google.maps.Point(26, 32),
                    labelStyle: { zIndex: zIndexStart },
                    labelClass: "labels"//, // the CSS class for the label
                    //map: map, //Se colocar map, ele já coloca no mapa sem precisar do markermanager
                    //draggable: true,
                    //raiseOnDrag: true,
                    // labelStyle: { opacity: 0.75 }
                });

                google.maps.event.addListener(marker, 'click', function (e) {
                    var target = e.target || e.srcElement;
                    if (target && target.tagName.toLowerCase() == 'a') {
                        var idxCidade = parseInt(target.getAttribute("rel"));
                        $scope.openCityDetails(idxCidade);
                    } else { //Se clicar no overlay, da zoom
                        map.setCenter(this.getPosition());
                        map.setZoom(map.getZoom() + 1);
                    }
                });

                google.maps.event.addListener(marker, "mouseover", function () {
                    this.setOptions({ zIndex: (zIndexStart + 30) });
                });

                google.maps.event.addListener(marker, "mouseout", function () {
                    this.setOptions({ zIndex: zIndexStart });
                });

                if (bolUfSetada.length > 0) {
                    _markersRestantes.push(marker);
                } else {
                    _markersPrincipal.push(marker); // Markers no zoom inicial
                }

                // Array com todos os markers (Principal e Restantes)
                $scope.allMarkers.push({
                    objeto: objeto,
                    marker: marker
                });
            } else {
                console.log("Cidade não encontrada a localização:");
                console.log(objeto);
            }
        });

        if (_markersPrincipal.length > 0) {
            mgr.addMarkers(_markersPrincipal, 1);
            mgr.addMarkers(_markersRestantes, 6);
            mgr.refresh();

            if ($scope.usuario) {
                if ($scope.usuario.Escola) {
                    try {
                        var estado = $scope.usuario.Escola.Estado;
                        var cidade = $scope.usuario.Escola.Cidade;
                        var index = 0;
                        if ((estado != null && estado != "") && (cidade != null && cidade != "")) {
                            $scope.cityToAdd[index].Estado = estado;
                            $scope.cityToAdd[index].Cidade = cidade;
                            $scope.setCityDetails(index, cidade);
                        }
                    } catch (err) { };
                }
            } else {
                $scope.$emit("broadGaleria", $scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig);
            }
        }
    }

    self.initDefaultObjects();

} ]);


angular.module('resultado')
.directive('sotaqueBoxAudio', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            edicao: "=edicao",
            objFiltro: "=objFiltro",
            resultado: "=resultado",
            config: "=config"
        },
        templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/_nossosotaque_box_audio.html",
        link: function (scope, elm, attrs) {
        },
        controller: ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

            $scope.objListaAudio = [];

            var _opcaoAudio = 0;
            var _cidade = "";
            var _idEtapa = 0;

            if ($scope.objFiltro) {
                if ($scope.objFiltro.objeto) {
                    _cidade = $scope.objFiltro.objeto.Cidade;
                }
            }

            /**
            '==========================================================================='
            '   # Buscar campos opção para passar a SP, pegando dados do json config #  '
            '==========================================================================='
            **/
            if ($scope.resultado) {
                if ($scope.resultado.JsonConfig) {
                    if (typeof ($scope.resultado.JsonConfig) == "string") {
                        $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
                        //Pega opção caso exista no JsonConfig
                        if ($scope.resultado.JsonConfig.etapa3) {
                            if ($scope.resultado.JsonConfig.etapa3.campo_audio) {
                                _opcaoAudio = parseInt($scope.resultado.JsonConfig.etapa3.campo_audio)
                            }
                        }
                    } else {
                        if ($scope.resultado.JsonConfig.etapa3) {
                            if ($scope.resultado.JsonConfig.etapa3.campo_audio) {
                                _opcaoAudio = parseInt($scope.resultado.JsonConfig.etapa3.campo_audio);
                            }
                        }
                    }
                }
            }
            /** Fim busca Json Config **/


            /*Pega Id Etapa primeira coleta para galeria */
            if ($scope.edicao) if ($scope.edicao.Etapas) {
                var _objEtapa = $filter("filter")($scope.edicao.Etapas, { Link: "osotaquedanossaregiao" }, true);
                if (_objEtapa.length > 0) {
                    _idEtapa = _objEtapa[0].Id;
                }
            }

            //Ajax para box do áudio
            $http({
                url: '/AVA/Resultados/NossaRegiao2015/JsonResultadoPorEtapaCampoCidade',
                params: {
                    idEtapa: _idEtapa,
                    idFormCampo: _opcaoAudio,
                    cidade: _cidade
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

                    $scope.objListaAudio = data.dados;
                }

            });

        } ]
    };
});
