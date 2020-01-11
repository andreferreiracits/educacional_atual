"use strict";


angular.module("resultado")
.controller('ComoEsta2015Ctrl',
["$http", "$scope", "$timeout", "$filter", "$location", "projetoMapa", function ($http, $scope, $timeout, $filter, $location, projetoMapa) {

    var self = this;
    var map;
    var mgr;
    var _markersPrincipal = [];
    var _markersRestantes = [];
    var _totalCities = 3;
    var _strOrdemAba = "1";

    $scope.arrayDias = [{ "class": "dia13", "dia": "13", "semana": "Segunda-feira" }, { "class": "dia14", "dia": "14", "semana": "Terça-feira" }, { "class": "dia15", "dia": "15", "semana": "Quarta-feira" }, { "class": "dia16", "dia": "16", "semana": "Quinta-feira" }, { "class": "dia17", "dia": "17", "semana": "Sexta-feira" }, { "class": "dia23", "dia": "23", "semana": "Quinta-feira" }, { "class": "dia24", "dia": "24", "semana": "Sexta-feira" }, { "class": "dia27", "dia": "27", "semana": "Segunda-feira" }, { "class": "dia28", "dia": "28", "semana": "Terça-feira" }, { "class": "dia29", "dia": "29", "semana": "Quarta-feira"}]
    
    $scope.horaGrafico = "hora1"; //hora inicial do gráfico
    $scope.bolCarregouDados = false;
    $scope.listMapa = new Array();

    $scope.allMarkers = [];
    $scope.selectedMarkers = [];
    $scope.cityToAdd = [];
    $scope.objEtapa = {};
    $scope.objEtapaSlide = {};
    $scope.intDestaqueGrafico = 0;
    $scope.objFilter = {};
    $scope.objTooltip = {};

    /*Pega Id Etapa para filtro  */
    if ($scope.edicao) if ($scope.edicao.Etapas) {
        var _objEtapa = $filter("filter")($scope.edicao.Etapas, { Link: "comoestaotempo" }, true);
        if (_objEtapa.length > 0) {
            $scope.objEtapa = _objEtapa[0];
        }

        var _objEtapaSlide = $filter("filter")($scope.edicao.Etapas, { Link: "osotaquedanossaregiao" }, true);
        if (_objEtapaSlide.length > 0) {
            $scope.objEtapaSlide = _objEtapaSlide[0];
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

    var _strOpcao_CampoVideo = "";

    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }

            if ($scope.resultado.JsonConfig.etapa3) {
                if ($scope.resultado.JsonConfig.etapa3.campo_video) {
                    _strOpcao_CampoVideo = parseInt($scope.resultado.JsonConfig.etapa3.campo_video)
                    $scope.objFilter.opcao = _strOpcao_CampoVideo;
                }
            }


            if ($scope.resultado.JsonConfig.tooltip) {
                $scope.objTooltip = $scope.resultado.JsonConfig.tooltip;
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

        //$scope.listMapa = [
        //  { "Estado": "MA", "Cidade": "São Luis", "MinTemperatura": 16, "MaxTemperatura": 40, "Min_Dia": "16/04", "Max_Dia": "29/04", "Min_Hora": "15h", "Max_Hora": "15h", bolHora_1: false, bolHora_2: true },
        //  { "Estado": "MS", "Cidade": "Amambai", "MinTemperatura": 8, "MaxTemperatura": 27, "Min_Dia": "15/04", "Max_Dia": "23/04", "Min_Hora": "9h", "Max_Hora": "15h", bolHora_1: true, bolHora_2: true },
        //  { "Estado": "SP", "Cidade": "São José dos Campos ", "MinTemperatura": 18, "MaxTemperatura": 35, "Min_Dia": "13/04", "Max_Dia": "24/04", "Min_Hora": "9h", "Max_Hora": "15h", bolHora_1: true, bolHora_2: true }
        //  ,{ "Estado": "RS", "Cidade": "Ijuí", "MinTemperatura": 15, "MaxTemperatura": 26, "Min_Dia": "15/04", "Max_Dia": "29/04", "Min_Hora": "15h", "Max_Hora": "15h", bolHora_1: true, bolHora_2: true }
        //    //{ "Estado": "MS", "Cidade": "Dourados", "MinTemperatura": 20, "MaxTemperatura": 45, bolHora_1 : true, bolHora_2: false },
        //    //{ "Estado": "RS", "Cidade": "Ijuí", "MinTemperatura": 11, "MaxTemperatura": 111, bolHora_1 : true, bolHora_2: true },
        //    //{ "Estado": "PR", "Cidade": "São José dos Pinhais", "MinTemperatura": 18, "MaxTemperatura": 35, bolHora_1 : true, bolHora_2: true },
        //    //{ "Estado": "PR", "Cidade": "Pinhais", "MinTemperatura": 8, "MaxTemperatura": 26, bolHora_1 : true, bolHora_2: true },
        //    //{ "Estado": "PR", "Cidade": "Ponta Grossa", "MinTemperatura": 13, "MaxTemperatura": 31, bolHora_1 : true, bolHora_2: true },
        //    //{ "Estado": "PR", "Cidade": "Lapa", "MinTemperatura": 12, "MaxTemperatura": 27, bolHora_1 : true, bolHora_2: true },
        //    //{ "Estado": "PR", "Cidade": "Pontal do Paraná", "MinTemperatura": 8, "MaxTemperatura": 32, bolHora_1 : true, bolHora_2: true },
        //];
        //
        //google.maps.event.addListener(mgr, "loaded", function () {
        //    self.setupAllMarkers($scope.listMapa);
        //});
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
                        //$scope.cityToAdd[index].bolHora_1 = $scope.allMarkers[idxCidade].objeto.bolHora_1;
                        //$scope.cityToAdd[index].bolHora_2 = $scope.allMarkers[idxCidade].objeto.bolHora_2;
                        //if(($scope.cityToAdd[index].bolHora_1 != null && $scope.cityToAdd[index].bolHora_1) && ($scope.cityToAdd[index].bolHora_2 == null || $scope.cityToAdd[index].bolHora_2 == 0)){
                        //    $scope.cityToAdd[index].Hora = 9;
                        //    $scope.saveCityToMap(index);
                        //}else if(($scope.cityToAdd[index].bolHora_2 != null && $scope.cityToAdd[index].bolHora_2) && ($scope.cityToAdd[index].bolHora_1 == null || $scope.cityToAdd[index].bolHora_1 == 0)){
                        //    $scope.cityToAdd[index].Hora = 15;
                        //    $scope.saveCityToMap(index);
                        //}else{
                        //    var bolClickAdd = false;
                        //    if($scope.selectedMarkers[index]){
                        //        if($scope.selectedMarkers[index].showAddOverlay == true){
                        //            bolClickAdd = true; 
                        //        }
                        //    }
                        //    if(!bolClickAdd){
                        //        $scope.cityToAdd[index].Hora = 9;
                        //        $scope.saveCityToMap(index);
                        //    }
                        //}

                        bolAchou = true;
                        break;
                    }
                }
            }
        }

        if (!bolAchou) {
            $scope.selectedMarkers[index] = new self.createDefaultSelectedMarker();
            $scope.cityToAdd[index] = new self.createDefaultCity();
            $scope.$emit("broadGaleria", $scope.cityToAdd, $scope.objFilter);
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
                    $scope.selectedMarkers[i] = new self.createDefaultSelectedMarker();
                    $scope.cityToAdd[i] = new self.createDefaultCity();

                    $scope.$emit("broadGaleria", $scope.cityToAdd, $scope.objFilter);
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

                            $scope.$emit("broadGaleria", $scope.cityToAdd, $scope.objFilter);
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
                    //if(($scope.cityToAdd[freeIndice].bolHora_1 != null && $scope.cityToAdd[freeIndice].bolHora_1) && ($scope.cityToAdd[freeIndice].bolHora_2 == null || $scope.cityToAdd[freeIndice].bolHora_2 == 0)){
                    //    $scope.cityToAdd[freeIndice].Hora = 9;
                    //    $scope.saveCityToMap(freeIndice);
                    //}else if(($scope.cityToAdd[freeIndice].bolHora_2 != null && $scope.cityToAdd[freeIndice].bolHora_2) && ($scope.cityToAdd[freeIndice].bolHora_1 == null || $scope.cityToAdd[freeIndice].bolHora_1 == 0)){
                    //    $scope.cityToAdd[freeIndice].Hora = 15;
                    //    $scope.saveCityToMap(freeIndice);
                    //}

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

                            //$scope.saveCityToMap(index);
                            //if(false){
                            //    if($scope.cityToAdd[index].bolHora_1 != null && $scope.cityToAdd[index].bolHora_1){
                            //        $scope.cityToAdd[index].Hora = 9;
                            //        $scope.saveCityToMap(index);
                            //    }else if($scope.cityToAdd[index].bolHora_2 != null && $scope.cityToAdd[index].bolHora_2){
                            //        $scope.cityToAdd[index].Hora = 15;
                            //        $scope.saveCityToMap(index);
                            //    }else{
                            //        $scope.selectedMarkers[index] = new self.createDefaultSelectedMarker();
                            //        $scope.cityToAdd[index] = new self.createDefaultCity();
                            //       // $scope.$broadcast("changeListMap",$scope.cityToAdd);
                            //    }
                            //}
                        }
                    } catch (err) { };
                }
            } else {
                $scope.$emit("broadGaleria", $scope.cityToAdd, $scope.objFilter);
            }
        }
    }

    self.initDefaultObjects();

} ]);


angular.module('resultado')
    .directive('popOver', ['$http', function ($http) {
        return {
            restrict: 'EA',
            scope: {
                objCidade: "=objCidade",
                objDia: "=objDia",
                objHora: "=hora",
                objTooltip: "=objTooltip"
            },
            link: function (scope, element, attr) {
                var i = 0;
                var _hora = "";
                //if (scope.objHora == 'hora1') {
                //    _hora = "09h00"
                //} else if (scope.objHora == 'hora2') {
                //    _hora = "15h00"
                //}
                var campo_tempimg, campo_hora_opcao;

                element.tooltipster({
                    contentAsHTML: true,
                    trigger: 'click',
                    multiple: true,
                    position: 'bottom-left',
                    hideOnClick: false,
                    interactive: true,
                    content: 'Carregando...',
                    functionReady: function (origin, tooltip) {
                        try {
                            origin.tooltipster('content', 'Carregando...');
                        } catch (err) { };
                    },
                    functionBefore: function (origin, continueTooltip) {

                        // we'll make this function asynchronous and allow the tooltip to go ahead and show the loading notification while fetching our data
                        continueTooltip();

                        var _auxHora = $("#horagrafico").attr("rel");

                        if (scope.objDia.dia == 13) {
                            campo_tempimg = scope.objTooltip.campo_tempimg_13;
                        } else {
                            campo_tempimg = scope.objTooltip.campo_tempimg_1X;
                        }

                        if (_auxHora == "hora1") {
                            _hora = "09h00";
                            campo_hora_opcao = scope.objTooltip.campo_hora_opcao_09;
                        } else if (_auxHora == "hora2") {
                            _hora = "15h00";
                            campo_hora_opcao = scope.objTooltip.campo_hora_opcao_15;
                        }

                        var _date = new Date().getTime();
                        $http
                        //.get('/AVA/Projetos/Servico/MontaTooltip', {
                    .get('/AVA/Resultados/NossaRegiao2015/MontaTooltip', {
                        params: {
                            cidade: scope.objCidade.objeto.Cidade,
                            dia: scope.objDia.dia,
                            horario: _hora,
                            campoProjEdicaoEtapa: scope.objTooltip.campo_proj_edicao_etapa,
                            campoHora: scope.objTooltip.campo_hora,
                            campoHoraOpcao: campo_hora_opcao,
                            campoTempImg: campo_tempimg,
                            _z: _date
                        }
                    }).success(function (data) {
                        origin.tooltipster('content', data);
                        $('a.nav_tooltip').unbind("click");
                        scope.initBind();
                    });
                    }
                });


                //element.bind('click', function (e) {
                //    //element.tooltipster('destroy');
                //    var _auxHora = $("#horagrafico").attr("rel");
                //
                //    if (_auxHora == "hora1") {
                //        _hora = "09h00";
                //    } else if (_auxHora == "hora2") {
                //        _hora = "15h00";
                //    }
                //    var _date = new Date().getTime();
                //    $http
                //    //.get('/AVA/Projetos/Servico/MontaTooltip', {
                //    .get('/AVA/Resultados/NossaRegiao2015/MontaTooltip', {
                //        params: {
                //            cidade: scope.objCidade.objeto.Cidade,
                //            dia: scope.objDia.dia,
                //            horario: _hora,
                //            campoProjEdicaoEtapa: scope.objTooltip.campo_proj_edicao_etapa,
                //            campoHora: scope.objTooltip.campo_hora,
                //            campoHoraOpcao: campo_hora_opcao,
                //            campoTempImg: campo_tempimg,
                //            _z: _date
                //        }
                //    }).success(function (data) {
                //        
                //        element.tooltipster({
                //            contentAsHTML: true,
                //            //content: $(data),
                //            multiple : true,
                //            trigger: 'click',
                //            position: 'bottom-left',
                //            hideOnClick: false,
                //            interactive: true
                //        });
                //        element.tooltipster('content',$(data));
                //        element.tooltipster('show');
                //
                //        $('a.nav_prev').unbind("click");
                //        $('a.nav_next').unbind("click");
                //
                //        scope.initBind();
                //    });
                //
                //
                //    /*
                //    $http({
                //    url: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/tooltip_etapa1.html",
                //    method: "GET",
                //    params: { _cidade: $scope._objTooltip.cidade, _dia: $scope._objTooltip.dia }
                //    });
                //    */
                //
                //});

                var slideCount = $('#galeria-slider ul li').length;
                var slideWidth = $('#galeria-slider ul li').width();
                var slideHeight = $('#galeria-slider ul li').height();
                var sliderUlWidth = slideCount * slideWidth;

                scope.initBind = function () {
                    slideCount = $('#galeria-slider ul li').length;
                    slideWidth = $('#galeria-slider ul li').width();
                    slideHeight = $('#galeria-slider ul li').height();
                    sliderUlWidth = slideCount * slideWidth;


                    try {
                        if (slideCount > 1) {
                            $('#galeria-slider').css({ width: slideWidth, height: slideHeight });

                            $('#galeria-slider ul').css({ width: sliderUlWidth, marginLeft: -slideWidth });

                            $('#galeria-slider ul li:last-child').prependTo('#galeria-slider ul');

                            $('a.nav_prev').click(function () {
                                scope.moveLeft();
                            });

                            $('a.nav_next').click(function (e) {
                                scope.moveRight();
                            });
                        }
                    } catch (err) { };
                };

                scope.moveLeft = function () {
                    $('#galeria-slider ul').animate({
                        left: +slideWidth
                    }, 200, function () {
                        $('#galeria-slider ul li:last-child').prependTo('#galeria-slider ul');
                        $('#galeria-slider ul').css('left', '');
                    });
                };

                scope.moveRight = function () {
                    $('#galeria-slider ul').animate({
                        left: -slideWidth
                    }, 200, function () {
                        $('#galeria-slider ul li:first-child').appendTo('#galeria-slider ul');
                        $('#galeria-slider ul').css('left', '');
                    });
                };
            }
        }
    } ]);

