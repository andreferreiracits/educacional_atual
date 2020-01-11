"use strict";

angular.module("resultado").controller('NossaCidadeTransito2016Ctrl',
["$stateParams", "$http", "$rootScope", "$scope", "$timeout", "$filter", "$location", "$state", "projetoMapa", function ($stateParams, $http, $rootScope, $scope, $timeout, $filter, $location, $state, projetoMapa) {
    var self = this;

    var map;
    var mgr;
    var _markersPrincipal = [];
    var _markersRestantes = [];
    var _totalSlots = 3;

    var coordRuas = {
        "DF": [
		    {
		        "cidade": "Brasília",
		        "rua": [
				    { "nome": "Via HI4 Sul", "position": [-15.8453554, -47.883694] }
			    ]
		    }
	    ],
        "ES": [
		    {
		        "cidade": "Cariacica",
		        "rua": [
				    { "nome": "Rodovia José Sette", "position": [-20.2473529, -40.4185646] }
			    ]
		    }
	    ],
        "MG": [
		    {
		        "cidade": "Paracatu",
		        "rua": [
				    { "nome": "Avenida Olegario Maciel", "position": [-17.2175836, -46.8796391] },
				    { "nome": "Largo da Jaqueira", "position": [-17.2395713, -46.8556372] },
				    { "nome": "Rua Doutor Seabra", "position": [-17.2274095, -46.87420150000001] }
			    ]
		    },
		    {
		        "cidade": "Uberlândia",
		        "rua": [
				    { "nome": "Afonso Pena", "position": [-18.9013348, -48.2652141] },
				    { "nome": "Avenida Floriano Peixoto", "position": [-18.8981129, -48.2609127] },
				    { "nome": "Avenida João Pinheiro", "position": [-18.9012405, -48.26690050000001] }
			    ]
		    }
	    ],
        "MS": [
		    {
		        "cidade": "Amambai",
		        "rua": [
				    { "nome": "Avenida Pedro Manvailer", "position": [-23.1083066, -55.22566699999999] },
				    { "nome": "Rua da república", "position": [-23.1060648, -55.228278] },
				    { "nome": "Rua Marechal Deodoro", "position": [-23.1024167, -55.2331855] },
				    { "nome": "Rua Sete  de Setembro", "position": [-23.1076853, -55.2302642] },
				    { "nome": "Rua sete de setembro", "position": [-23.1076853, -55.2302642] }
			    ]
		    }
	    ],
        "MT": [
		    {
		        "cidade": "Primavera do Leste",
		        "rua": [
				    { "nome": "Avenida Porto Alegre", "position": [-15.5501653, -54.29877] },
				    { "nome": "Avenida São João", "position": [-15.5584623, -54.3054012] }
			    ]
		    }
	    ],
        "PR": [
		    {
		        "cidade": "Curitiba",
		        "rua": [
				    { "nome": "Rua Paulo Setubal ", "position": [-25.5035644, -49.2490033] },
                    { "nome": "Rua Padre Anchieta", "position": [-25.43094, -49.2942995] },
                    { "nome": "Rua Dr. Pedrosa", "position": [-25.4380069, -49.27689640000001] },
                    { "nome": "Rua Senador Accioly Filho", "position": [-25.4974762, -49.3251187] }
			    ]
		    },
            {
                "cidade": "Fazenda Rio Grande",
                "rua": [
				    { "nome": "Carlos Eduardo Nichele", "position": [-25.6471003, -49.3129127] },
				    { "nome": "Rua Carlos Eduardo Nichelle", "position": [-25.6471003, -49.3129127] }
			    ]
            },
            {
                "cidade": "Santo Antônio da Platina",
                "rua": [
				    { "nome": "Avenida Frei Guilherme Maria", "position": [-23.2902651, -50.0652712] }
			    ]
            }
	    ],
        "RN": [
		    {
		        "cidade": "Natal",
		        "rua": [
				    { "nome": "Rua do Cobre", "position": [-5.827743100000001, -35.2060516] },
				    { "nome": "Rua: Cel. Norton Chaves", "position": [-5.8275293, -35.2059341] }
			    ]
		    }
	    ],
        "RS": [
		    {
		        "cidade": "Canoas",
		        "rua": [
				    { "nome": "Rua Jacob Longoni", "position": [-29.9132584, -51.1861921] }
			    ]
		    },
		    {
		        "cidade": "Passo Fundo",
		        "rua": [
				    { "nome": "Rua Paissandu", "position": [-28.260897, -52.4105539] }
			    ]
		    },
		    {
		        "cidade": "Santiago",
		        "rua": [
				    { "nome": "Rua Pinheiro Machado ", "position": [-29.1908619, -54.86508809999999] }
			    ]
		    }
	    ],
        "SC": [
		    {
		        "cidade": "Chapecó",
		        "rua": [
				    { "nome": "Rua Clevelândia", "position": [-27.1058372, -52.6108166] },
				    { "nome": "Rua Fernando Machado", "position": [-27.0648251, -52.6301141] }
			    ]
		    },
		    {
		        "cidade": "Ibirama",
		        "rua": [
				    { "nome": "Rua Getúlio Vargas", "position": [-27.0548385, -49.5193478] }
			    ]
		    },
		    {
		        "cidade": "São Bento do Sul",
		        "rua": [
				    { "nome": "Rua Antonio Kaesemodel", "position": [-26.2309734, -49.3987085] }
			    ]
		    }
	    ],
        "SP": [
		    {
		        "cidade": "Bebedouro",
		        "rua": [
				    { "nome": "Av. São Francisco", "position": [-20.9604597, -48.4745654] },
				    { "nome": "Rua Alameda Belmonte", "position": [-20.9197354, -48.4942532] },
				    { "nome": "Rua Joaquim Moreira", "position": [-20.9627234, -48.473752] }
			    ]
		    },
		    {
		        "cidade": "Guarujá",
		        "rua": [
				    { "nome": "Av. Pulglisi", "position": [-23.9929459, -46.2581754] },
				    { "nome": "Rua Washington", "position": [-23.9932163, -46.2564044] }
			    ]
		    },
		    {
		        "cidade": "Guarulhos",
		        "rua": [
				    { "nome": "Av Monteiro Lobato", "position": [-23.4632301, -46.5029513] },
				    { "nome": "Avenida Monteiro Lobato", "position": [-23.4632301, -46.5029513] },
				    { "nome": "Rua do Rosário ", "position": [-23.4673211, -46.5200502] }
			    ]
		    },
		    {
		        "cidade": "Lins",
		        "rua": [
				    { "nome": "Rua Dom Bosco", "position": [-21.6722181, -49.7572592] }
			    ]
		    },
		    {
		        "cidade": "São José dos Campos ",
		        "rua": [
				    { "nome": "Avenida Lineu de Moura ", "position": [-23.1905456, -45.9185263] }
			    ]
		    },
		    {
		        "cidade": "São Paulo",
		        "rua": [
				    { "nome": "Avenida do Cursino", "position": [-23.6309152, -46.6176636] },
				    { "nome": "Avenida Paes de Barros", "position": [-23.5675215, -46.5911497] },
				    { "nome": "Coronel Silvério Magalhães ", "position": [-23.6285413, -46.6220213] },
				    { "nome": "Cristiano Viana", "position": [-23.5563342, -46.67926260000001] },
				    { "nome": "Estrada de Itapecerica", "position": [-23.6606078, -46.7680914] },
				    { "nome": "R. Alves Guimarães", "position": [-23.555839, -46.6782251] },
				    { "nome": "Rua Alves Guimarães", "position": [-23.555839, -46.6782251] },
				    { "nome": "Rua Antônio Cantarella", "position": [-23.6268361, -46.623796] },
				    { "nome": "Rua Christiano Viana", "position": [-23.5563342, -46.67926260000001] },
				    { "nome": "Rua Coronel Silvério Magalhães", "position": [-23.6285413, -46.6220213] },
				    { "nome": "Rua Cristiano Viana", "position": [-23.5563342, -46.67926260000001] },
				    { "nome": "Rua Hermes Fontes", "position": [-23.559876, -46.6915687] },
				    { "nome": "Rua São Leopoldo", "position": [-23.5412862, -46.5992644] },
				    { "nome": "Sinfonia Italiana", "position": [-23.756605, -46.7078005] },
                    { "nome": "Rua Caraça", "position": [-23.5503314, -46.7024634] }
			    ]
		    }
	    ]
    };

    self.allMarkers = [];
    self.selectedMarkers = [];

    self.bolSlotDestacado = 0;
    self.transitoFiltro = {
        "slot1": { "uf": "", "cidade": "", "rua": "" },
        "slot2": { "uf": "", "cidade": "", "rua": "" },
        "slot3": { "uf": "", "cidade": "", "rua": "" }
    };

    self.dadosTransitoFiltro = { "hora1": [], "hora2": [] };
    self.seletorHora = { "hora1": true, "hora2": true };
    self.seletorTransporte = 1;

    self.umPeriodo = {
        "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
        "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
        "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
        "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
        "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
    };

    self.doisPeriodos = {
        "hora1": {
            "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
        },
        "hora2": {
            "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
        }
    };


    self.mapselection = 1;
    self.bolMapaSelection = true;
    self.dadosGeral = {};

    self.dadosMapa = {};
    self.dadosTransito = {};

    if ($scope.dados) {
        if (typeof ($scope.dados[0].deOlhoNoTransito) == "string") {
            self.dadosGeral = angular.fromJson($scope.dados[0].deOlhoNoTransito);
        }
        else {
            self.dadosGeral = $scope.dados[0].deOlhoNoTransito;
        }

        self.dadosMapa = self.dadosGeral.dadosMapa;
        self.dadosTransito = self.dadosGeral.dadosTransito;
    }
    //console.log(self.dadosGeral);

    self.getCoordRua = function (uf, cidade, rua) {
        var retorno = null;

        uf = uf.toUpperCase();
        cidade = self.retira_acentos(self.trim(cidade.toLowerCase()));
        rua = self.retira_acentos(self.trim(rua.toLowerCase()));

        //console.log(uf + ' - ' + cidade + ' - ' + rua);

        angular.forEach(coordRuas[uf], function (objeto, index) {

            //console.log(self.retira_acentos(self.trim(objeto.cidade.toLowerCase())) + ' - ' + cidade)

            if (self.retira_acentos(self.trim(objeto.cidade.toLowerCase())) == cidade) {
                angular.forEach(objeto.rua, function (obj2, index) {
                    if (self.retira_acentos(self.trim(obj2.nome.toLowerCase())) == rua) {
                        retorno = obj2;
                    }
                });
            }

        });
        return retorno;
    };

    self.retira_acentos = function (palavra) {
        var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
        var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
        var nova = '';
        for (i = 0; i < palavra.length; i++) {
            if (com_acento.search(palavra.substr(i, 1)) >= 0) {
                nova += sem_acento.substr(com_acento.search(palavra.substr(i, 1)), 1);
            } else {
                nova += palavra.substr(i, 1);
            }
        }
        return nova.toLowerCase();
    };

    self.trim = function (str) {
        return str.replace(/^\s+|\s+$/g, "");
    };

    self.txtByIndice = function (idx) {
        var txtAux = '';
        var aTextos = [];

        aTextos.push({ "txt1": "Estado 1", "txt2": "Cidade 1", "txt3": "Rua 1" });
        aTextos.push({ "txt1": "Estado 2", "txt2": "Cidade 2", "txt3": "Rua 2" });
        aTextos.push({ "txt1": "Estado 3", "txt2": "Cidade 3", "txt3": "Rua 3" });

        aTextos.push({ "txt1": "Adicionar estado", "txt2": "Adicionar cidade", "txt3": "Adicionar rua" });

        switch (self.mapselection) {
            case 1:
                txtAux = aTextos[idx].txt1;
                break;
            case 2:
                txtAux = aTextos[idx].txt2;
                break;
            case 3:
                txtAux = aTextos[idx].txt3;
                break;
            default:
        }
        return txtAux;
    };

    self.txtMarcadorSelecionado = function (idxSlot) {
        var txtAux = ''

        switch (self.mapselection) {
            case 1:
                txtAux = self.selectedMarkers[idxSlot].objeto.uf;
                break;
            case 2:
                txtAux = self.selectedMarkers[idxSlot].objeto.cidade;
                break;
            case 3:
                txtAux = self.selectedMarkers[idxSlot].objeto.rua;
                break;
            default:
        }
        return txtAux;
    };


    $scope.$on("mapInitialized", function (event, evtMap) {
        map = evtMap;
        mgr = new MarkerManager(map);

        //console.log('mapInitialized');
        google.maps.event.addListener(mgr, "loaded", function () {
            //self.requestMap();
            //console.log('loaded');

            $timeout(function () {
                self.setupAllMarkers();
            }, 200);
        });
    });

    self.setupAllMarkers = function () {
        var arrEstadoSelecionado = [];
        var zIndexStart = 8000;

        var objListMapa = {};

        switch (self.mapselection) {
            case 1:

                //uf
                objListMapa = self.dadosMapa.estado;
                //                console.log('Marcadores estado:')
                //                console.log(objListMapa);
                angular.forEach(objListMapa, function (objeto, index) {
                    var html = '';
                    var locationData = projetoMapa.getCoordenadasByUf(objeto.uf);

                    //                    console.log('locationData:');
                    //                    console.log(locationData);
                    if (locationData != null) {
                        var latLng = new google.maps.LatLng(locationData.position[0], locationData.position[1]);

                        html = '<div class="ico_map modo-local" style="position: relative;">';
                        html += '     <h5>' + objeto.uf + '</h5>';
                        html += '     <a href="" rel="' + index + '" class="btn_fechar"></a>';
                        html += '     <a href="" rel="' + index + '" class="btn_adicionar"></a>';
                        html += '     <div class="ico"></div>';
                        html += '     <div class="dados">';
                        html += '         <div class="max">Máx.: <span>' + objeto.max + '</span></div>';
                        html += '         <div class="min">Mín.: <span>' + objeto.min + '</span></div>';
                        html += '     </div>';
                        html += '</div>';

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
                                var idxMarker = parseInt(target.getAttribute("rel"));

                                if (angular.element(target).hasClass('btn_adicionar')) {
                                    self.openDetails(idxMarker, -1);
                                }
                                else {
                                    self.freeSlotByIdx(idxMarker);
                                }
                            } else {
                                //Se clicar no overlay, da zoom
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

                        // Markers no zoom inicial
                        _markersPrincipal.push(marker);

                        // Array com todos os markers (Principal e Restantes)
                        self.allMarkers.push({
                            objeto: objeto,
                            marker: marker
                        });

                    } else {
                        console.log("Não encontrada a localização do estado:");
                        //console.log(objeto);
                    }
                });

                break;
            case 2:

                //cidade
                objListMapa = self.dadosMapa.cidade;
                angular.forEach(objListMapa, function (objeto, index) {
                    var html = '';
                    var locationData = projetoMapa.getCoordenadasByUfCidade(objeto.uf, objeto.cidade);

                    if (locationData != null) {
                        var latLng = new google.maps.LatLng(locationData.position[0], locationData.position[1]);

                        html = '<div class="ico_map modo-local" style="position: relative;">';
                        html += '     <h5>' + objeto.cidade + '</h5>';
                        html += '     <a href="" rel="' + index + '" class="btn_fechar"></a>';
                        html += '     <a href="" rel="' + index + '" class="btn_adicionar"></a>';
                        html += '     <div class="ico"></div>';
                        html += '     <div class="dados">';
                        html += '         <div class="max">Máx.: <span>' + objeto.max + '</span></div>';
                        html += '         <div class="min">Mín.: <span>' + objeto.min + '</span></div>';
                        html += '     </div>';
                        html += '</div>';

                        var bolUfSetada = $filter('filter')(arrEstadoSelecionado, { UF: objeto.uf }, true);
                        arrEstadoSelecionado.push({ UF: objeto.uf });

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
                                var idxMarker = parseInt(target.getAttribute("rel"));

                                //self.openDetails(idxMarker, -1);
                                if (angular.element(target).hasClass('btn_adicionar')) {
                                    self.openDetails(idxMarker, -1);
                                }
                                else {
                                    self.freeSlotByIdx(idxMarker);
                                }
                            } else {
                                //Se clicar no overlay, da zoom
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
                            _markersPrincipal.push(marker);
                            // Markers no zoom inicial
                        }

                        // Array com todos os markers (Principal e Restantes)
                        self.allMarkers.push({ objeto: objeto, marker: marker });

                    } else {
                        console.log("Cidade não encontrada a localização:");
                        //console.log(objeto);
                    }
                });

                break;
            case 3:

                objListMapa = self.dadosMapa.rua;

                angular.forEach(objListMapa, function (objeto, index) {
                    var html = '';
                    var locationData;

                    locationData = self.getCoordRua(objeto.uf, objeto.cidade, objeto.rua);
                    if (locationData == null) {
                        locationData = projetoMapa.getCoordenadasByUfCidade(objeto.uf, objeto.cidade);
                    }
                    //console.log(self.getCoordRua(objeto.uf, objeto.cidade, objeto.rua));

                    if (locationData != null) {
                        var latLng = new google.maps.LatLng(locationData.position[0], locationData.position[1]);

                        html = '<div class="ico_map modo-rua" style="position: relative;">';
                        html += '     <a href="" rel="' + index + '" class="btn_fechar"></a>';
                        html += '     <a href="" rel="' + index + '" class="btn_adicionar"></a>';
                        html += '     <div class="ico"></div>';
                        html += '</div>';

                        var bolUfSetada = $filter('filter')(arrEstadoSelecionado, { UF: objeto.uf }, true);
                        arrEstadoSelecionado.push({ UF: objeto.uf });

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
                                var idxMarker = parseInt(target.getAttribute("rel"));

                                //self.openDetails(idxMarker, -1);
                                if (angular.element(target).hasClass('btn_adicionar')) {
                                    self.openDetails(idxMarker, -1);
                                }
                                else {
                                    self.freeSlotByIdx(idxMarker);
                                }
                            } else {
                                //Se clicar no overlay, da zoom
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
                            _markersPrincipal.push(marker);
                            // Markers no zoom inicial
                        }

                        // Array com todos os markers (Principal e Restantes)
                        self.allMarkers.push({ objeto: objeto, marker: marker });

                    } else {
                        console.log("Cidade não encontrada a localização:");
                        //console.log(objeto);
                    }
                });

                break;
            default: //default code block
        }

        //console.log('_markersPrincipal:');
        //console.log(_markersPrincipal);

        if (_markersPrincipal.length > 0) {
            mgr.addMarkers(_markersPrincipal, 3);

            if (_markersRestantes.length > 0) {
                mgr.addMarkers(_markersRestantes, 6);
            }
            mgr.refresh();

            if ($scope.usuario) {
                if ($scope.usuario.Escola) {
                    try {
                        //                        var estado = $scope.usuario.Escola.Estado;
                        //                        var cidade = $scope.usuario.Escola.Cidade;
                        //                        var index = 0;
                        //                        if ((estado != null && estado != "") && (cidade != null && cidade != "")) {
                        //                            $scope.cityToAdd[index].Estado = estado;
                        //                            $scope.cityToAdd[index].Cidade = cidade;
                        //                            $scope.setCityDetails(index, cidade);
                        //                        }
                    } catch (err) { };
                }
                $rootScope.$broadcast("changeListMap", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 1, listaInscricoes: [] });
            } else {
                $rootScope.$broadcast("changeListMap", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 1, listaInscricoes: [] });
            }
        }
    };

    self.ativaItemTransporte = function (intTransporte) {
        if (self.seletorTransporte != intTransporte) {
            self.seletorTransporte = intTransporte;

            self.geraGrafico();
        }
    };

    self.destacaSlot = function (intSlot) {
        if (intSlot != self.bolSlotDestacado) {
            self.bolSlotDestacado = intSlot;
        }
    };

    self.selectHora = function (intHora) {

        if (intHora == 1) {
            if ((self.seletorHora.hora2 && self.seletorHora.hora1) || (self.seletorHora.hora2 && !self.seletorHora.hora1)) {
                self.seletorHora.hora1 = !self.seletorHora.hora1;

                self.geraGrafico();
            }
        }
        else {
            if ((self.seletorHora.hora2 && self.seletorHora.hora1) || (self.seletorHora.hora1 && !self.seletorHora.hora2)) {
                self.seletorHora.hora2 = !self.seletorHora.hora2;

                self.geraGrafico();
            }
        }
    };

    self.AddItem = function ($event, intSlot) {
        var oFiltro = { "uf": "", "cidade": "", "rua": "" };
        var idxFreeSlot = -1;
        var idxMarker = -1;
        var oBotao = angular.element($event.currentTarget);

        switch (intSlot) {
            case 0:
                oFiltro = self.transitoFiltro.slot1;
                idxFreeSlot = 0;
                break;
            case 1:
                oFiltro = self.transitoFiltro.slot2;
                idxFreeSlot = 1;
                break;
            case 2:
                oFiltro = self.transitoFiltro.slot3;
                idxFreeSlot = 2;
                break;
            default:
        }

        switch (self.mapselection) {
            case 1:
                if (oFiltro.uf == "") {
                    alert('Selecione o estado!');
                    return false;
                }
                else {
                    for (var i = 0; i < self.allMarkers.length; i++) {
                        if (self.allMarkers[i] && self.allMarkers[i].objeto) {
                            if (self.allMarkers[i].objeto.uf.toLowerCase() == oFiltro.uf.toLowerCase()) {
                                idxMarker = i;
                                break;
                            }
                        }
                    }
                }
                break;
            case 2:
                if (oFiltro.uf == "" || oFiltro.cidade == "") {
                    alert('Selecione a cidade!');
                    return false;
                }
                else {
                    for (var j = 0; j < self.allMarkers.length; j++) {
                        if (self.allMarkers[j] && self.allMarkers[j].objeto) {
                            if (
                                self.allMarkers[j].objeto.uf.toLowerCase() == oFiltro.uf.toLowerCase()
                                && self.allMarkers[j].objeto.cidade.toLowerCase() == oFiltro.cidade.toLowerCase()
                            ) {
                                idxMarker = j;
                                break;
                            }
                        }
                    }
                }
                break;
            case 3:
                if (oFiltro.uf == "" || oFiltro.cidade == "" || oFiltro.rua == "") {
                    alert('Digite o nome da rua!');
                    return false;
                }
                else {
                    for (var k = 0; k < self.allMarkers.length; k++) {
                        if (self.allMarkers[k] && self.allMarkers[k].objeto) {
                            if (
                                self.allMarkers[k].objeto.uf.toLowerCase() == oFiltro.uf.toLowerCase()
                                && self.allMarkers[k].objeto.cidade.toLowerCase() == oFiltro.cidade.toLowerCase()
                                && self.allMarkers[k].objeto.rua.toLowerCase() == oFiltro.rua.toLowerCase()
                            ) {
                                idxMarker = k;
                                break;
                            }
                        }
                    }
                }
                break;
            default:
        }

        if (idxMarker != -1) {
            for (var l = 0; l < self.selectedMarkers.length; l++) {
                if (self.selectedMarkers[l] && self.selectedMarkers[l].objeto) {
                    if (self.selectedMarkers[l].indice == idxMarker) {
                        //maisDeUm
                        alert('Não é possível selecionar 2 itens iguais!');
                        return false;
                    }
                }
            }

            oBotao.parent().hide();
            self.openDetails(idxMarker, idxFreeSlot);
        }
        else {
            alert('Não foi encontrado nenhum resultado!');
        }

    };

    self.openDetails = function (idxMarker, idxFreeSlot) {
        var totalSelected = self.getTotalSelectedMarkers();
        var divAux = document.createElement("div");
        var obj = self.allMarkers[idxMarker].marker;
        var maisDeUm = 0;
        var freeIndice = -1;        

        //console.log('idxMarker: ' + idxMarker);
        if (obj != null && obj) {
            divAux.innerHTML = obj.labelContent;

            for (var i = 0; i < self.selectedMarkers.length; i++) {
                if (self.selectedMarkers[i] && self.selectedMarkers[i].objeto) {
                    if (self.selectedMarkers[i].indice == idxMarker) {
                        maisDeUm = 1;
                        break;
                    }
                }
            }

            var markerAtivoAux = angular.element(divAux).find('.ativo');

            //console.log(markerAtivoAux);
            if (markerAtivoAux.length == 0 && maisDeUm == 0) {
                //console.log('entrou no if');
                if (totalSelected < _totalSlots) {
                    //Abrir fancybox, sem atualizar cor,objeto!
                    if (idxFreeSlot != -1) {
                        freeIndice = idxFreeSlot;
                    }
                    else {
                        freeIndice = self.getFreeSlotCity();
                    }

                    self.selectedMarkers[freeIndice] =
                    {
                        indice: idxMarker,
                        showAddOverlay: true,
                        objeto: self.allMarkers[idxMarker].objeto,
                        marker: self.allMarkers[idxMarker].marker
                    };

                    angular.element(divAux).find('.ico_map').addClass('ativo slot' + (freeIndice + 1));
                    map.setCenter(obj.getPosition());
                    if (self.mapselection == 3) {
                        map.setZoom(12);
                    }
                    else {
                        map.setZoom(6);
                    }

                    obj.setZIndex(obj.getZIndex() + 20);
                    obj.labelContent = divAux.innerHTML;                    
                    angular.element('.slots .box_slot-' + (freeIndice + 1) + ' .form').hide();

                    try {
                        obj.label.draw();
                    } catch (err) {
                        //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
                    }

                    $rootScope.$broadcast("changeListMap", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 1, listaInscricoes: self.getListaInscricaoGaleria() });
                    $scope.safeApply();

                    //                    console.log('=============');
                    //                    console.log(self.selectedMarkers);
                    //                    console.log('=============');
                } else {
                    alert("O limite é de " + _totalSlots + "!");
                }
            } else {
                if (maisDeUm > 0) {
                    alert('Não é possível adicionar 2 itens iguais!')
                }
                //self.freeSlotByIdx(idxMarker);
            }

        }
        //console.log(self.selectedMarkers);

    };

    self.clearMapOverlayByIdx = function (idxMarker) {
        var divAux = document.createElement("div");
        var obj = self.allMarkers[idxMarker].marker;

        if (obj != null && obj) {
            divAux.innerHTML = obj.labelContent;

            var markerAux = angular.element(divAux).find('.ico_map');
            markerAux.removeClass("ativo slot1 slot2 slot3");

            obj.setZIndex(obj.getZIndex() - 2);
            obj.labelContent = divAux.innerHTML;

            try {
                obj.label.draw();
            } catch (err) {
                //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
            }
        }
    };

    self.changeEstado = function (intSlot) {

        switch (intSlot) {
            case 0:
                self.transitoFiltro.slot1.cidade = "";
                break;
            case 1:
                self.transitoFiltro.slot2.cidade = "";
                break;
            case 2:
                self.transitoFiltro.slot3.cidade = "";
                break;
            default:
        }

    };

    self.freeSlotFromSlot = function (idx) {

        //console.log("idx: " + idx);
        if (self.selectedMarkers[idx] && self.selectedMarkers[idx].objeto) {
            if (self.selectedMarkers[idx].indice != -1) {
                self.freeSlotByIdx(self.selectedMarkers[idx].indice);
                //console.log('idxMarker: ' + self.selectedMarkers[idx].indice);
            }
        }

    };

    self.freeSlotByIdx = function (idxMarker) {

        //console.log('freeSlotByIdx: ' + idxMarker);
        for (var i = 0; i < self.selectedMarkers.length; i++) {
            if (self.selectedMarkers[i] && self.selectedMarkers[i].objeto) {
                if (self.selectedMarkers[i].indice == idxMarker) {
                    self.clearMapOverlayByIdx(idxMarker);
                    self.selectedMarkers[i] = new self.createDefaultSelectedMarker();

                    $rootScope.$broadcast("changeListMap", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 1, listaInscricoes: self.getListaInscricaoGaleria() });
                    $scope.safeApply();
                    break;
                }
            }
        }

        for (var j = 0; j < self.selectedMarkers.length; j++) {
            if (self.selectedMarkers[j] && (!self.selectedMarkers[j].objeto || self.selectedMarkers[j].objeto.uf == null)) {
                switch (j) {
                    case 0:
                        self.transitoFiltro.slot1 = { "uf": "", "cidade": "", "rua": "" };
                        break;
                    case 1:
                        self.transitoFiltro.slot2 = { "uf": "", "cidade": "", "rua": "" };
                        break;
                    case 2:
                        self.transitoFiltro.slot3 = { "uf": "", "cidade": "", "rua": "" };
                        break;
                    default:
                }
            }
        }

    };

    self.getFreeSlotCity = function () {
        var indice = 0;

        for (var i = 0; i < self.selectedMarkers.length; i++) {
            if (self.selectedMarkers[i] && (!self.selectedMarkers[i].objeto || self.selectedMarkers[i].objeto.uf == null)) {
                indice = i;
                break;
            }
        }
        return indice;
    };

    self.getTotalSelectedMarkers = function () {
        var total = 0;

        for (var i = 0; i < self.selectedMarkers.length; i++) {
            if (self.selectedMarkers[i]) if (self.selectedMarkers[i].objeto) {
                if (self.selectedMarkers[i].objeto.uf != null) {
                    total++;
                }
            }
        }
        return total;
    };

    $scope.$on("changeListMap", function (event, obj) {
        //console.log('changeListMap de olho no transito!');

        if (self.getTotalSelectedMarkers() > 0) {
            self.getDadosFiltro();
            self.geraGrafico();
        }
        else {
            self.transitoFiltro = {
                "slot1": { "uf": "", "cidade": "", "rua": "" },
                "slot2": { "uf": "", "cidade": "", "rua": "" },
                "slot3": { "uf": "", "cidade": "", "rua": "" }
            };
        }

    });

    self.getHeightBarra = function (intValor, intQtdeMax, intHeightMax) {
        var intHeight = 0;

        intHeight = (intValor * intHeightMax) / intQtdeMax;
        if (intHeight < 0) {
            intHeight = 0;
        }
        else {
            intHeight = Math.round(intHeight);
        }

        return intHeight;
    };

    self.getOpacityBarra = function (intSlot) {
        if (intSlot == self.bolSlotDestacado) { return '1'; } else { return '0.5'; }
    };

    self.geraGrafico = function () {

        if (
            self.dadosTransitoFiltro.hora1.length > 0
            && self.dadosTransitoFiltro.hora2.length > 0
            && self.seletorHora.hora1
            && self.seletorHora.hora2
        ) {
            //Mostra os 2 horários
            self.geraGraficoDoisPeriodos();
        }
        else {
            //Mostra 1 horário
            if (self.dadosTransitoFiltro.hora1.length > 0 && self.dadosTransitoFiltro.hora2.length > 0) {
                if (self.seletorHora.hora1) {
                    self.geraGraficoUmPeriodo(self.dadosTransitoFiltro.hora1);
                }
                else {
                    self.geraGraficoUmPeriodo(self.dadosTransitoFiltro.hora2);
                }
            }
            else {
                if (self.dadosTransitoFiltro.hora1.length > 0) {
                    self.geraGraficoUmPeriodo(self.dadosTransitoFiltro.hora1);
                }
                else {
                    self.geraGraficoUmPeriodo(self.dadosTransitoFiltro.hora2);
                }
            }

        }
    };

    self.geraGraficoUmPeriodo = function (obj) {
        //var intTotalEnvio = obj.length;
        var aTotalEnvioDia = [];

        aTotalEnvioDia = {
            "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
        };

        //        aTotalEnvioDia["segunda"] = 0;
        //        aTotalEnvioDia["terca"] = 0;
        //        aTotalEnvioDia["quarta"] = 0;
        //        aTotalEnvioDia["quinta"] = 0;
        //        aTotalEnvioDia["sexta"] = 0;

        self.resetaValoresGrafico();
        angular.forEach(obj, function (objeto, index) {
            //var oEnvioGrupo = objeto.envioGrupo;
            var idxSlot = objeto.idxSlot;
            var strSlot = 'slot' + objeto.idxSlot;
            var intOrdemGrupo = objeto.intOrdemGrupo;
            var dados = objeto.dados;

            if (intOrdemGrupo == 2) {
                //aTotalEnvioDia["segunda"]++;
                aTotalEnvioDia.segunda[strSlot]++;
            }
            if (intOrdemGrupo == 3) {
                //aTotalEnvioDia["terca"]++; 
                aTotalEnvioDia.terca[strSlot]++;
            }
            if (intOrdemGrupo == 4) {
                //aTotalEnvioDia["quarta"]++; 
                aTotalEnvioDia.quarta[strSlot]++;
            }
            if (intOrdemGrupo == 5) {
                //aTotalEnvioDia["quinta"]++; 
                aTotalEnvioDia.quinta[strSlot]++;
            }
            if (intOrdemGrupo == 6) {
                //aTotalEnvioDia["sexta"]++; 
                aTotalEnvioDia.sexta[strSlot]++;
            }

            switch (self.seletorTransporte) {
                case 1:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.umPeriodo.segunda[strSlot] = self.umPeriodo.segunda[strSlot] + dados.carro;
                            break;
                        case 3:
                            self.umPeriodo.terca[strSlot] = self.umPeriodo.terca[strSlot] + dados.carro;
                            break;
                        case 4:
                            self.umPeriodo.quarta[strSlot] = self.umPeriodo.quarta[strSlot] + dados.carro;
                            break;
                        case 5:
                            self.umPeriodo.quinta[strSlot] = self.umPeriodo.quinta[strSlot] + dados.carro;
                            break;
                        case 6:
                            self.umPeriodo.sexta[strSlot] = self.umPeriodo.sexta[strSlot] + dados.carro;
                            break;
                        default:
                    }
                    break;
                case 2:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.umPeriodo.segunda[strSlot] = self.umPeriodo.segunda[strSlot] + dados.motocicleta;
                            break;
                        case 3:
                            self.umPeriodo.terca[strSlot] = self.umPeriodo.terca[strSlot] + dados.motocicleta;
                            break;
                        case 4:
                            self.umPeriodo.quarta[strSlot] = self.umPeriodo.quarta[strSlot] + dados.motocicleta;
                            break;
                        case 5:
                            self.umPeriodo.quinta[strSlot] = self.umPeriodo.quinta[strSlot] + dados.motocicleta;
                            break;
                        case 6:
                            self.umPeriodo.sexta[strSlot] = self.umPeriodo.sexta[strSlot] + dados.motocicleta;
                            break;
                        default:
                    }
                    break;
                case 3:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.umPeriodo.segunda[strSlot] = self.umPeriodo.segunda[strSlot] + dados.caminhao;
                            break;
                        case 3:
                            self.umPeriodo.terca[strSlot] = self.umPeriodo.terca[strSlot] + dados.caminhao;
                            break;
                        case 4:
                            self.umPeriodo.quarta[strSlot] = self.umPeriodo.quarta[strSlot] + dados.caminhao;
                            break;
                        case 5:
                            self.umPeriodo.quinta[strSlot] = self.umPeriodo.quinta[strSlot] + dados.caminhao;
                            break;
                        case 6:
                            self.umPeriodo.sexta[strSlot] = self.umPeriodo.sexta[strSlot] + dados.caminhao;
                            break;
                        default:
                    }
                    break;
                case 4:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.umPeriodo.segunda[strSlot] = self.umPeriodo.segunda[strSlot] + dados.onibus;
                            break;
                        case 3:
                            self.umPeriodo.terca[strSlot] = self.umPeriodo.terca[strSlot] + dados.onibus;
                            break;
                        case 4:
                            self.umPeriodo.quarta[strSlot] = self.umPeriodo.quarta[strSlot] + dados.onibus;
                            break;
                        case 5:
                            self.umPeriodo.quinta[strSlot] = self.umPeriodo.quinta[strSlot] + dados.onibus;
                            break;
                        case 6:
                            self.umPeriodo.sexta[strSlot] = self.umPeriodo.sexta[strSlot] + dados.onibus;
                            break;
                        default:
                    }
                    break;
                case 5:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.umPeriodo.segunda[strSlot] = self.umPeriodo.segunda[strSlot] + dados.bicicleta;
                            break;
                        case 3:
                            self.umPeriodo.terca[strSlot] = self.umPeriodo.terca[strSlot] + dados.bicicleta;
                            break;
                        case 4:
                            self.umPeriodo.quarta[strSlot] = self.umPeriodo.quarta[strSlot] + dados.bicicleta;
                            break;
                        case 5:
                            self.umPeriodo.quinta[strSlot] = self.umPeriodo.quinta[strSlot] + dados.bicicleta;
                            break;
                        case 6:
                            self.umPeriodo.sexta[strSlot] = self.umPeriodo.sexta[strSlot] + dados.bicicleta;
                            break;
                        default:
                    }
                    break;
                case 6:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.umPeriodo.segunda[strSlot] = self.umPeriodo.segunda[strSlot] + dados.outro;
                            break;
                        case 3:
                            self.umPeriodo.terca[strSlot] = self.umPeriodo.terca[strSlot] + dados.outro;
                            break;
                        case 4:
                            self.umPeriodo.quarta[strSlot] = self.umPeriodo.quarta[strSlot] + dados.outro;
                            break;
                        case 5:
                            self.umPeriodo.quinta[strSlot] = self.umPeriodo.quinta[strSlot] + dados.outro;
                            break;
                        case 6:
                            self.umPeriodo.sexta[strSlot] = self.umPeriodo.sexta[strSlot] + dados.outro;
                            break;
                        default:
                    }
                    break;
                default:
            }

        });

        angular.forEach(self.umPeriodo, function (value, key) {
            var intTotalEnvioDiaSlot0 = aTotalEnvioDia[key].slot0;
            var intTotalEnvioDiaSlot1 = aTotalEnvioDia[key].slot1;
            var intTotalEnvioDiaSlot2 = aTotalEnvioDia[key].slot2;

            //intTotalEnvioDia = aTotalEnvioDia[key];

            //            if (value["slot0"] > 0) { value["slot0"] = Math.round(value["slot0"] / intTotalEnvioDia); }
            //            if (value["slot1"] > 0) { value["slot1"] = Math.round(value["slot1"] / intTotalEnvioDia); }
            //            if (value["slot2"] > 0) { value["slot2"] = Math.round(value["slot2"] / intTotalEnvioDia); }

            if (value["slot0"] > 0) { value["slot0"] = Math.round(value["slot0"] / intTotalEnvioDiaSlot0); }
            if (value["slot1"] > 0) { value["slot1"] = Math.round(value["slot1"] / intTotalEnvioDiaSlot1); }
            if (value["slot2"] > 0) { value["slot2"] = Math.round(value["slot2"] / intTotalEnvioDiaSlot2); }
        });

    };

    self.geraGraficoDoisPeriodos = function () {

        //var intTotalEnvioHora1 = self.dadosTransitoFiltro.hora1.length;
        //var intTotalEnvioHora2 = self.dadosTransitoFiltro.hora2.length;
        var aTotalEnvioDia = {
            "hora1": {
                "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
            },
            "hora2": {
                "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
            }
        };

        //        aTotalEnvioDia.hora1["segunda"] = 0;
        //        aTotalEnvioDia.hora1["terca"] = 0;
        //        aTotalEnvioDia.hora1["quarta"] = 0;
        //        aTotalEnvioDia.hora1["quinta"] = 0;
        //        aTotalEnvioDia.hora1["sexta"] = 0;

        //        aTotalEnvioDia.hora2["segunda"] = 0;
        //        aTotalEnvioDia.hora2["terca"] = 0;
        //        aTotalEnvioDia.hora2["quarta"] = 0;
        //        aTotalEnvioDia.hora2["quinta"] = 0;
        //        aTotalEnvioDia.hora2["sexta"] = 0;

        self.resetaValoresGrafico();
        angular.forEach(self.dadosTransitoFiltro.hora1, function (objeto, index) {
            //var oEnvioGrupo = objeto.envioGrupo;
            var idxSlot = objeto.idxSlot;
            var strSlot = 'slot' + objeto.idxSlot;
            var intOrdemGrupo = objeto.intOrdemGrupo;
            var dados = objeto.dados;

            if (intOrdemGrupo == 2) { aTotalEnvioDia.hora1.segunda[strSlot]++; }
            if (intOrdemGrupo == 3) { aTotalEnvioDia.hora1.terca[strSlot]++; }
            if (intOrdemGrupo == 4) { aTotalEnvioDia.hora1.quarta[strSlot]++; }
            if (intOrdemGrupo == 5) { aTotalEnvioDia.hora1.quinta[strSlot]++; }
            if (intOrdemGrupo == 6) { aTotalEnvioDia.hora1.sexta[strSlot]++; }

            switch (self.seletorTransporte) {
                case 1:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora1.segunda[strSlot] = self.doisPeriodos.hora1.segunda[strSlot] + dados.carro;
                            break;
                        case 3:
                            self.doisPeriodos.hora1.terca[strSlot] = self.doisPeriodos.hora1.terca[strSlot] + dados.carro;
                            break;
                        case 4:
                            self.doisPeriodos.hora1.quarta[strSlot] = self.doisPeriodos.hora1.quarta[strSlot] + dados.carro;
                            break;
                        case 5:
                            self.doisPeriodos.hora1.quinta[strSlot] = self.doisPeriodos.hora1.quinta[strSlot] + dados.carro;
                            break;
                        case 6:
                            self.doisPeriodos.hora1.sexta[strSlot] = self.doisPeriodos.hora1.sexta[strSlot] + dados.carro;
                            break;
                        default:
                    }
                    break;
                case 2:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora1.segunda[strSlot] = self.doisPeriodos.hora1.segunda[strSlot] + dados.motocicleta;
                            break;
                        case 3:
                            self.doisPeriodos.hora1.terca[strSlot] = self.doisPeriodos.hora1.terca[strSlot] + dados.motocicleta;
                            break;
                        case 4:
                            self.doisPeriodos.hora1.quarta[strSlot] = self.doisPeriodos.hora1.quarta[strSlot] + dados.motocicleta;
                            break;
                        case 5:
                            self.doisPeriodos.hora1.quinta[strSlot] = self.doisPeriodos.hora1.quinta[strSlot] + dados.motocicleta;
                            break;
                        case 6:
                            self.doisPeriodos.hora1.sexta[strSlot] = self.doisPeriodos.hora1.sexta[strSlot] + dados.motocicleta;
                            break;
                        default:
                    }
                    break;
                case 3:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora1.segunda[strSlot] = self.doisPeriodos.hora1.segunda[strSlot] + dados.caminhao;
                            break;
                        case 3:
                            self.doisPeriodos.hora1.terca[strSlot] = self.doisPeriodos.hora1.terca[strSlot] + dados.caminhao;
                            break;
                        case 4:
                            self.doisPeriodos.hora1.quarta[strSlot] = self.doisPeriodos.hora1.quarta[strSlot] + dados.caminhao;
                            break;
                        case 5:
                            self.doisPeriodos.hora1.quinta[strSlot] = self.doisPeriodos.hora1.quinta[strSlot] + dados.caminhao;
                            break;
                        case 6:
                            self.doisPeriodos.hora1.sexta[strSlot] = self.doisPeriodos.hora1.sexta[strSlot] + dados.caminhao;
                            break;
                        default:
                    }
                    break;
                case 4:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora1.segunda[strSlot] = self.doisPeriodos.hora1.segunda[strSlot] + dados.onibus;
                            break;
                        case 3:
                            self.doisPeriodos.hora1.terca[strSlot] = self.doisPeriodos.hora1.terca[strSlot] + dados.onibus;
                            break;
                        case 4:
                            self.doisPeriodos.hora1.quarta[strSlot] = self.doisPeriodos.hora1.quarta[strSlot] + dados.onibus;
                            break;
                        case 5:
                            self.doisPeriodos.hora1.quinta[strSlot] = self.doisPeriodos.hora1.quinta[strSlot] + dados.onibus;
                            break;
                        case 6:
                            self.doisPeriodos.hora1.sexta[strSlot] = self.doisPeriodos.hora1.sexta[strSlot] + dados.onibus;
                            break;
                        default:
                    }
                    break;
                case 5:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora1.segunda[strSlot] = self.doisPeriodos.hora1.segunda[strSlot] + dados.bicicleta;
                            break;
                        case 3:
                            self.doisPeriodos.hora1.terca[strSlot] = self.doisPeriodos.hora1.terca[strSlot] + dados.bicicleta;
                            break;
                        case 4:
                            self.doisPeriodos.hora1.quarta[strSlot] = self.doisPeriodos.hora1.quarta[strSlot] + dados.bicicleta;
                            break;
                        case 5:
                            self.doisPeriodos.hora1.quinta[strSlot] = self.doisPeriodos.hora1.quinta[strSlot] + dados.bicicleta;
                            break;
                        case 6:
                            self.doisPeriodos.hora1.sexta[strSlot] = self.doisPeriodos.hora1.sexta[strSlot] + dados.bicicleta;
                            break;
                        default:
                    }
                    break;
                case 6:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora1.segunda[strSlot] = self.doisPeriodos.hora1.segunda[strSlot] + dados.outro;
                            break;
                        case 3:
                            self.doisPeriodos.hora1.terca[strSlot] = self.doisPeriodos.hora1.terca[strSlot] + dados.outro;
                            break;
                        case 4:
                            self.doisPeriodos.hora1.quarta[strSlot] = self.doisPeriodos.hora1.quarta[strSlot] + dados.outro;
                            break;
                        case 5:
                            self.doisPeriodos.hora1.quinta[strSlot] = self.doisPeriodos.hora1.quinta[strSlot] + dados.outro;
                            break;
                        case 6:
                            self.doisPeriodos.hora1.sexta[strSlot] = self.doisPeriodos.hora1.sexta[strSlot] + dados.outro;
                            break;
                        default:
                    }
                    break;
                default:
            }

        });

        angular.forEach(self.dadosTransitoFiltro.hora2, function (objeto, index) {
            //var oEnvioGrupo = objeto.envioGrupo;
            var idxSlot = objeto.idxSlot;
            var strSlot = 'slot' + objeto.idxSlot;
            var intOrdemGrupo = objeto.intOrdemGrupo;
            var dados = objeto.dados;

            if (intOrdemGrupo == 2) { aTotalEnvioDia.hora2.segunda[strSlot]++; }
            if (intOrdemGrupo == 3) { aTotalEnvioDia.hora2.terca[strSlot]++; }
            if (intOrdemGrupo == 4) { aTotalEnvioDia.hora2.quarta[strSlot]++; }
            if (intOrdemGrupo == 5) { aTotalEnvioDia.hora2.quinta[strSlot]++; }
            if (intOrdemGrupo == 6) { aTotalEnvioDia.hora2.sexta[strSlot]++; }

            switch (self.seletorTransporte) {
                case 1:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora2.segunda[strSlot] = self.doisPeriodos.hora2.segunda[strSlot] + dados.carro;
                            break;
                        case 3:
                            self.doisPeriodos.hora2.terca[strSlot] = self.doisPeriodos.hora2.terca[strSlot] + dados.carro;
                            break;
                        case 4:
                            self.doisPeriodos.hora2.quarta[strSlot] = self.doisPeriodos.hora2.quarta[strSlot] + dados.carro;
                            break;
                        case 5:
                            self.doisPeriodos.hora2.quinta[strSlot] = self.doisPeriodos.hora2.quinta[strSlot] + dados.carro;
                            break;
                        case 6:
                            self.doisPeriodos.hora2.sexta[strSlot] = self.doisPeriodos.hora2.sexta[strSlot] + dados.carro;
                            break;
                        default:
                    }
                    break;
                case 2:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora2.segunda[strSlot] = self.doisPeriodos.hora2.segunda[strSlot] + dados.motocicleta;
                            break;
                        case 3:
                            self.doisPeriodos.hora2.terca[strSlot] = self.doisPeriodos.hora2.terca[strSlot] + dados.motocicleta;
                            break;
                        case 4:
                            self.doisPeriodos.hora2.quarta[strSlot] = self.doisPeriodos.hora2.quarta[strSlot] + dados.motocicleta;
                            break;
                        case 5:
                            self.doisPeriodos.hora2.quinta[strSlot] = self.doisPeriodos.hora2.quinta[strSlot] + dados.motocicleta;
                            break;
                        case 6:
                            self.doisPeriodos.hora2.sexta[strSlot] = self.doisPeriodos.hora2.sexta[strSlot] + dados.motocicleta;
                            break;
                        default:
                    }
                    break;
                case 3:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora2.segunda[strSlot] = self.doisPeriodos.hora2.segunda[strSlot] + dados.caminhao;
                            break;
                        case 3:
                            self.doisPeriodos.hora2.terca[strSlot] = self.doisPeriodos.hora2.terca[strSlot] + dados.caminhao;
                            break;
                        case 4:
                            self.doisPeriodos.hora2.quarta[strSlot] = self.doisPeriodos.hora2.quarta[strSlot] + dados.caminhao;
                            break;
                        case 5:
                            self.doisPeriodos.hora2.quinta[strSlot] = self.doisPeriodos.hora2.quinta[strSlot] + dados.caminhao;
                            break;
                        case 6:
                            self.doisPeriodos.hora2.sexta[strSlot] = self.doisPeriodos.hora2.sexta[strSlot] + dados.caminhao;
                            break;
                        default:
                    }
                    break;
                case 4:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora2.segunda[strSlot] = self.doisPeriodos.hora2.segunda[strSlot] + dados.onibus;
                            break;
                        case 3:
                            self.doisPeriodos.hora2.terca[strSlot] = self.doisPeriodos.hora2.terca[strSlot] + dados.onibus;
                            break;
                        case 4:
                            self.doisPeriodos.hora2.quarta[strSlot] = self.doisPeriodos.hora2.quarta[strSlot] + dados.onibus;
                            break;
                        case 5:
                            self.doisPeriodos.hora2.quinta[strSlot] = self.doisPeriodos.hora2.quinta[strSlot] + dados.onibus;
                            break;
                        case 6:
                            self.doisPeriodos.hora2.sexta[strSlot] = self.doisPeriodos.hora2.sexta[strSlot] + dados.onibus;
                            break;
                        default:
                    }
                    break;
                case 5:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora2.segunda[strSlot] = self.doisPeriodos.hora2.segunda[strSlot] + dados.bicicleta;
                            break;
                        case 3:
                            self.doisPeriodos.hora2.terca[strSlot] = self.doisPeriodos.hora2.terca[strSlot] + dados.bicicleta;
                            break;
                        case 4:
                            self.doisPeriodos.hora2.quarta[strSlot] = self.doisPeriodos.hora2.quarta[strSlot] + dados.bicicleta;
                            break;
                        case 5:
                            self.doisPeriodos.hora2.quinta[strSlot] = self.doisPeriodos.hora2.quinta[strSlot] + dados.bicicleta;
                            break;
                        case 6:
                            self.doisPeriodos.hora2.sexta[strSlot] = self.doisPeriodos.hora2.sexta[strSlot] + dados.bicicleta;
                            break;
                        default:
                    }
                    break;
                case 6:
                    switch (intOrdemGrupo) {
                        case 2:
                            self.doisPeriodos.hora2.segunda[strSlot] = self.doisPeriodos.hora2.segunda[strSlot] + dados.outro;
                            break;
                        case 3:
                            self.doisPeriodos.hora2.terca[strSlot] = self.doisPeriodos.hora2.terca[strSlot] + dados.outro;
                            break;
                        case 4:
                            self.doisPeriodos.hora2.quarta[strSlot] = self.doisPeriodos.hora2.quarta[strSlot] + dados.outro;
                            break;
                        case 5:
                            self.doisPeriodos.hora2.quinta[strSlot] = self.doisPeriodos.hora2.quinta[strSlot] + dados.outro;
                            break;
                        case 6:
                            self.doisPeriodos.hora2.sexta[strSlot] = self.doisPeriodos.hora2.sexta[strSlot] + dados.outro;
                            break;
                        default:
                    }
                    break;
                default:
            }

        });


        angular.forEach(self.doisPeriodos.hora1, function (value, key) {
            var intTotalEnvioDiaSlot0 = aTotalEnvioDia.hora1[key].slot0;
            var intTotalEnvioDiaSlot1 = aTotalEnvioDia.hora1[key].slot1;
            var intTotalEnvioDiaSlot2 = aTotalEnvioDia.hora1[key].slot2;

            //intTotalEnvioDia = aTotalEnvioDia.hora1[key];

            if (value["slot0"] > 0) { value["slot0"] = Math.round(value["slot0"] / intTotalEnvioDiaSlot0); }
            if (value["slot1"] > 0) { value["slot1"] = Math.round(value["slot1"] / intTotalEnvioDiaSlot1); }
            if (value["slot2"] > 0) { value["slot2"] = Math.round(value["slot2"] / intTotalEnvioDiaSlot2); }
        });

        angular.forEach(self.doisPeriodos.hora2, function (value, key) {
            var intTotalEnvioDiaSlot0 = aTotalEnvioDia.hora2[key].slot0;
            var intTotalEnvioDiaSlot1 = aTotalEnvioDia.hora2[key].slot1;
            var intTotalEnvioDiaSlot2 = aTotalEnvioDia.hora2[key].slot2;
            //intTotalEnvioDia = aTotalEnvioDia.hora2[key];

            if (value["slot0"] > 0) { value["slot0"] = Math.round(value["slot0"] / intTotalEnvioDiaSlot0); }
            if (value["slot1"] > 0) { value["slot1"] = Math.round(value["slot1"] / intTotalEnvioDiaSlot1); }
            if (value["slot2"] > 0) { value["slot2"] = Math.round(value["slot2"] / intTotalEnvioDiaSlot2); }
        });
    };

    self.resetaValoresGrafico = function () {

        self.umPeriodo = {
            "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
            "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
        };

        self.doisPeriodos = {
            "hora1": {
                "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
            },
            "hora2": {
                "segunda": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "terca": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "quarta": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "quinta": { "slot0": 0, "slot1": 0, "slot2": 0 },
                "sexta": { "slot0": 0, "slot1": 0, "slot2": 0 }
            }
        };

    };

    self.getListaInscricaoGaleria = function () {

        var aInscricao = [];

        for (var i = 0; i < self.selectedMarkers.length; i++) {
            if (self.selectedMarkers[i]) if (self.selectedMarkers[i].objeto) {
                if (self.selectedMarkers[i].objeto.uf != null) {
                    if (self.dadosTransito) {
                        angular.forEach(self.dadosTransito, function (objeto, index) {
                            var objAux = objeto.envioGrupo;

                            switch (self.mapselection) {
                                case 1:
                                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[i].objeto.uf.toLowerCase()) {
                                        aInscricao.push(objeto.idProjetoInscricao);
                                    }
                                    break;
                                case 2:
                                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[i].objeto.uf.toLowerCase() && objeto.strCidadeEscola.toLowerCase() == self.selectedMarkers[i].objeto.cidade.toLowerCase()) {
                                        aInscricao.push(objeto.idProjetoInscricao);
                                    }
                                    break;
                                case 3:
                                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[i].objeto.uf.toLowerCase() && objeto.strCidadeEscola.toLowerCase() == self.selectedMarkers[i].objeto.cidade.toLowerCase()) {
                                        if (objeto.envioGrupo[0]) {
                                            if (objeto.envioGrupo[0].intOrdemGrupo == 1) {
                                                if (objeto.envioGrupo[0].dados) {
                                                    if (objeto.envioGrupo[0].dados.nomeRua.toLowerCase() == self.selectedMarkers[i].objeto.rua.toLowerCase()) {
                                                        aInscricao.push(objeto.idProjetoInscricao);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    break;
                                default:
                            }

                        });
                    }
                }
            }
        }
        return aInscricao;
    };

    self.getDadosFiltro = function () {
        //var objMarkers
        self.dadosTransitoFiltro = { "hora1": [], "hora2": [] };

        for (var i = 0; i < self.selectedMarkers.length; i++) {
            if (self.selectedMarkers[i]) if (self.selectedMarkers[i].objeto) {
                if (self.selectedMarkers[i].objeto.uf != null) {
                    if (self.dadosTransito) {
                        angular.forEach(self.dadosTransito, function (objeto, index) {
                            var bolIncluir = false;
                            var objAux = objeto.envioGrupo;

                            switch (self.mapselection) {
                                case 1:
                                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[i].objeto.uf.toLowerCase()) {
                                        bolIncluir = true;
                                    }
                                    break;
                                case 2:
                                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[i].objeto.uf.toLowerCase() && objeto.strCidadeEscola.toLowerCase() == self.selectedMarkers[i].objeto.cidade.toLowerCase()) {
                                        bolIncluir = true;
                                    }
                                    break;
                                case 3:
                                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[i].objeto.uf.toLowerCase() && objeto.strCidadeEscola.toLowerCase() == self.selectedMarkers[i].objeto.cidade.toLowerCase()) {
                                        if (objeto.envioGrupo[0]) {
                                            if (objeto.envioGrupo[0].intOrdemGrupo == 1) {
                                                if (objeto.envioGrupo[0].dados) {
                                                    if (objeto.envioGrupo[0].dados.nomeRua.toLowerCase() == self.selectedMarkers[i].objeto.rua.toLowerCase()) {
                                                        bolIncluir = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    break;
                                default:
                            }

                            if (bolIncluir) {
                                //objAux["idxSlot"] = i;
                                angular.forEach(objAux, function (objeto2, index) {
                                    var objAuxDia = objeto2;

                                    objAuxDia["idxSlot"] = i;
                                    if (objAuxDia.intOrdemGrupo > 1) {
                                        if (objAuxDia.dados.hora == 1) {
                                            self.dadosTransitoFiltro.hora1.push(objAuxDia);
                                        }
                                        else {
                                            self.dadosTransitoFiltro.hora2.push(objAuxDia);
                                        }
                                    }

                                });
                            }

                        });
                    }
                }
            }
        }

        //console.log(self.dadosTransitoFiltro);
    };

    self.changeMapSelection = function (intSelection) {
        if (self.mapselection != intSelection) {
            _markersPrincipal = [];
            _markersRestantes = [];
            self.allMarkers = [];
            self.dadosTransitoFiltro = { "hora1": [], "hora2": [] };
            self.transitoFiltro = {
                "slot1": { "uf": "", "cidade": "", "rua": "" },
                "slot2": { "uf": "", "cidade": "", "rua": "" },
                "slot3": { "uf": "", "cidade": "", "rua": "" }
            };

            self.mapselection = intSelection;
            self.bolMapaSelection = !self.bolMapaSelection;

            for (var i = 0; i < _totalSlots; i++) {
                self.selectedMarkers[i] = new self.createDefaultSelectedMarker();
            }
        }

        //console.log(self.mapselection);
    };

    self.showHideForm = function ($event) {
        var objSlot = angular.element($event.currentTarget).parent();
        var oBotao = angular.element($event.currentTarget);

        if (oBotao.hasClass('btn_abrir')) {
            objSlot.find('.form').show();
            oBotao.removeClass('btn_abrir').addClass('btn_fechar');
        }
        else {
            objSlot.find('.form').hide();
            oBotao.removeClass('btn_fechar').addClass('btn_abrir');
        }
    };

    self.initDefaultObjects = function () {
        for (var i = 0; i < _totalSlots; i++) {
            self.selectedMarkers[i] = new self.createDefaultSelectedMarker();
            //self.cityToAdd[i] = new self.createDefaultCity();
        }
    };

    self.createDefaultSelectedMarker = function () {
        return { indice: -1, showAddOverlay: false, objeto: {}, marker: {} };
    };

    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    };



    self.initDefaultObjects();
    //console.log(projetoMapa.getCoordenadasByUf('PR'));
    //console.log($scope.dados);

} ]);