"use strict";

angular.module("resultado").controller('NossaCidadeNossasRuas2016Ctrl',
["$stateParams", "$http", "$rootScope", "$scope", "$timeout", "$filter", "$location", "$state", "projetoMapa", function ($stateParams, $http, $rootScope, $scope, $timeout, $filter, $location, $state, projetoMapa) {
    var self = this;

    var map;
    var mgr;

    var _markersPrincipal = [];
    var _markersRestantes = [];
    var _totalSlots = 2;

    self.loadingBuscarGeral = false;
    self.loadingSlot = {slot0: false, slot1: false};

    self.allMarkers = [];
    self.selectedMarkers = [];

    self.mapselection = 1;
    self.bolMapaSelection = true;

    self.dadosGeral = {};
    self.dadosMapa = {};

    self.dadosNossaRuas = {};
    self.dadosTransito = {};

    var coordRuas = {
        "DF": [
		    {
		        "cidade": "Brasília",
		        "rua": [
				    { "nome": "Via HI4 Sul", "position": [-15.8453554, -47.883694] },
                    { "nome": "Eixo Rodoviário", "position": [-15.7630343, -47.8839108] }
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
				    { "nome": "Rua Doutor Seabra", "position": [-17.2274095, -46.87420150000001] },
                    { "nome": "Rua Dr. Seabra", "position": [-17.2274095, -46.87420150000001] },
                    { "nome": "Rua do Ávila", "position": [-17.2227681, -46.8735398] },
                    { "nome": "Rua Goiás", "position": [-17.2220592, -46.8729697] },
                    { "nome": "Rua Matias Mundim", "position": [-17.2203282, -46.8800756] }
			    ]
		    },
		    {
		        "cidade": "Uberlândia",
		        "rua": [
				    { "nome": "Afonso Pena", "position": [-18.9013348, -48.2652141] },
				    { "nome": "Avenida Floriano Peixoto", "position": [-18.8981129, -48.2609127] },
                    { "nome": "Av. Floriano Peixoto", "position": [-18.8981129, -48.2609127] },
				    { "nome": "Avenida João Pinheiro", "position": [-18.9012405, -48.26690050000001] },
                    { "nome": "Av. João Pinheiro", "position": [-18.9012405, -48.26690050000001] },
                    { "nome": "Avenida Fernando Vilela", "position": [-18.9136629, -48.2898639] },
                    { "nome": "Rua Fernando Vilela", "position": [-18.9136629, -48.2898639] }
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
				    { "nome": "Rua sete de setembro", "position": [-23.1076853, -55.2302642] },
                    { "nome": "Rua 7 de Setembro, nº 31710", "position": [-23.1076853, -55.2302642] },
                    { "nome": "Rua 7 de setembro, nº 3710", "position": [-23.1076853, -55.2302642] },
                    { "nome": "Rua Benjamin Constant", "position": [-23.1005999, -55.2322832] }
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
        "PA": [
		    {
		        "cidade": "Belém",
		        "rua": [
				    { "nome": "Rua Santa Paz", "position": [-1.3581491, -48.4319661] },
                    { "nome": "Travessa 14 de Março", "position": [-1.4516273, -48.48059749999999] },
                    { "nome": "Travessa Estrela", "position": [-1.4343073, -48.4654151] }
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
				    { "nome": "Rua Carlos Eduardo Nichelle", "position": [-25.6471003, -49.3129127] },
                    { "nome": "Avenida Portugal", "position": [-25.6651518, -49.3070569] }
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
				    { "nome": "Rua: Cel. Norton Chaves", "position": [-5.8275293, -35.2059341] },
                    { "nome": "Avenida Rio Branco", "position": [-5.7845138, -35.2061197] }
			    ]
		    }
	    ],
        "RS": [
		    {
		        "cidade": "Bento Gonçalves",
		        "rua": [
				    { "nome": "Rua Marechal Deodoro", "position": [-29.1656588, -51.5174329] }
			    ]
		    },
            {
		        "cidade": "Canoas",
		        "rua": [
				    { "nome": "Rua Jacob Longoni", "position": [-29.9132584, -51.1861921] }
			    ]
		    },
            {
		        "cidade": "Caxias do Sul",
		        "rua": [
				    { "nome": "Avenida Itália", "position": [-29.1687789, -51.191147] },
                    { "nome": "Avenida Julio de Castilhos", "position": [-29.1679032, -51.1841906] },
                    { "nome": "Rua La Salle", "position": [-29.1660806, -51.1912569] }
			    ]
		    },
		    {
		        "cidade": "Passo Fundo",
		        "rua": [
				    { "nome": "Rua Paissandu", "position": [-28.260897, -52.4105539] },
                    { "nome": "Avenida Brasil", "position": [-28.2659956, -52.418755] }
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
				    { "nome": "Rua Fernando Machado", "position": [-27.0648251, -52.6301141] },
                    { "nome": "Av. Porto Alegre", "position": [-27.1092539, -52.6166418] },
                    { "nome": "Avenida Getúlio Dorneles Vargas", "position": [-27.089459, -52.6185978] }
			    ]
		    },
		    {
		        "cidade": "Ibirama",
		        "rua": [
				    { "nome": "Rua Getúlio Vargas", "position": [-27.0548385, -49.5193478] },
                    { "nome": "Dr. Getúlio Vargas", "position": [-27.0548385, -49.5193478] }
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
				    { "nome": "Rua Joaquim Moreira", "position": [-20.9627234, -48.473752] },
                    { "nome": "Avenida dos Antunes", "position": [-20.9489903, -48.4751157] }
			    ]
		    },
		    {
		        "cidade": "Guarujá",
		        "rua": [
				    { "nome": "Av. Pulglisi", "position": [-23.9929459, -46.2581754] },
				    { "nome": "Rua Washington", "position": [-23.9932163, -46.2564044] },
                    { "nome": "Av Mal Deodoro da Fonseca", "position": [-23.9976488, -46.2578687] },
                    { "nome": "Avenida Leomil", "position": [-23.9964167, -46.2598963] },
                    { "nome": "Rua Dr. Artur da Costa Filho", "position": [-23.9912662, -46.2549633] },
                    { "nome": "Avenida Monteiro Lobato", "position": [-23.4632301, -46.5029513] },
                    { "nome": "Rua do Rosário", "position": [-23.4673211, -46.5200502] }
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
				    { "nome": "Avenida Lineu de Moura", "position": [-23.1905456, -45.9185263] },
                    { "nome": "Avenida Benedito Matarazzo", "position": [-23.2120086, -45.8924022] },
                    { "nome": "Avenida João Guilhermino", "position": [-23.1891993, -45.8865334] },
                    { "nome": "Avenida São João", "position": [-23.2012116, -45.9022273] }
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
                    { "nome": "Antônio Cantarela, Vila Santo Estéfano.", "position": [-23.6268361, -46.623796] },
				    { "nome": "Rua Christiano Viana", "position": [-23.5563342, -46.67926260000001] },
				    { "nome": "Rua Coronel Silvério Magalhães", "position": [-23.6285413, -46.6220213] },
				    { "nome": "Rua Cristiano Viana", "position": [-23.5563342, -46.67926260000001] },
				    { "nome": "Rua Hermes Fontes", "position": [-23.559876, -46.6915687] },
				    { "nome": "Rua São Leopoldo", "position": [-23.5412862, -46.5992644] },
				    { "nome": "Sinfonia Italiana", "position": [-23.756605, -46.7078005] },
                    { "nome": "Av. Paulista - Centro - São Paulo", "position": [-23.5630684, -46.6544327] },
                    { "nome": "Av. Santo Amaro - Santo Amaro - SP", "position": [-23.6176772, -46.6817542] },
                    { "nome": "Avenida Carlos Hoberhuber", "position": [-23.7434311, -46.7116113] },
                    { "nome": "Avenida Carlos Oberhuber", "position": [-23.7434311, -46.7116113] },
                    { "nome": "Avenida Doutor Bernardino Brito Fonseca", "position": [-23.5406685, -46.5131465] },
                    { "nome": "Avenida Senador Teotônio Vilela", "position": [-23.7411945, -46.7057653] },
                    { "nome": "Estrada do corredor", "position": [-23.446778, -46.7277524] },
                    { "nome": "R. 25 de Março - Centro - SP", "position": [-23.5435483, -46.6325165] },
                    { "nome": "R. da Consolação - Centro - São Paulo", "position": [-23.5525684, -46.6556591] },
                    { "nome": "Rua Deputado Lacerda Franco", "position": [-23.5622826, -46.6911733] },
                    { "nome": "Rua Hermes Fontes, 190.", "position": [-23.559876, -46.6915687] },
                    { "nome": "Rua Caraça", "position": [-23.5503314, -46.7024634] }
			    ]
		    }
	    ]
    };

    self.transitoFiltro = {
        "slot1": {
            "uf": "", "cidade": "", "rua": "",
            "info1": { "moderna": false, "preservahistoria": true },
            "info2": { "comercial": true, "residencial": false },
            "info3": { "ciclovia": false, "estacionamentobicicleta": false, "estacionamentocarro": false, "faixaelevada": false, "faixapedestre": false, "guiarebaixada": false, "pisotatil": false, "vegetacao": false }
        },
        "slot2": {
            "uf": "", "cidade": "", "rua": "",
            "info1": { "moderna": false, "preservahistoria": true },
            "info2": { "comercial": true, "residencial": false },
            "info3": { "ciclovia": false, "estacionamentobicicleta": false, "estacionamentocarro": false, "faixaelevada": false, "faixapedestre": false, "guiarebaixada": false, "pisotatil": false, "vegetacao": false }
        }
    };

    if ($scope.dados) {
        if (typeof ($scope.dados[0].nossasRuas) == "string") {
            self.dadosNossaRuas = angular.fromJson($scope.dados[0].nossasRuas);
        }
        else {
            self.dadosNossaRuas = $scope.dados[0].nossasRuas;
        }

        if (typeof ($scope.dados[0].deOlhoNoTransito) == "string") {
            self.dadosTransito = angular.fromJson($scope.dados[0].deOlhoNoTransito);
        }
        else {
            self.dadosTransito = $scope.dados[0].deOlhoNoTransito;
        }

        self.dadosMapa = self.dadosNossaRuas.dadosMapa;
        self.dadosGeral = self.dadosNossaRuas.dadosNossaRua;
    }
//    console.log($scope.dados);
//    console.log(self.dadosNossaRuas);
//    console.log(self.dadosMapa);

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

    self.setupAllMarkers = function () {
        var arrEstadoSelecionado = [];
        var zIndexStart = 8000;

        var objListMapa = {};

        switch (self.mapselection) {
            case 1:

                //uf
                objListMapa = self.dadosMapa.estado;
                //console.log('Marcadores estado:')
                //console.log(objListMapa);
                angular.forEach(objListMapa, function (objeto, index) {
                    var html = '';
                    var locationData = projetoMapa.getCoordenadasByUf(objeto.uf);

                    //console.log('locationData:');
                    //console.log(locationData);
                    if (locationData != null) {
                        var latLng = new google.maps.LatLng(locationData.position[0], locationData.position[1]);

                        html = '<div class="ico_map modo-local-ruas" style="position: relative;">';
                        html += '    <h5>' + objeto.uf + '</h5>';
                        html += '    <a href="" rel="' + index + '" class="btn_fechar"></a>';
                        html += '    <a href="" rel="' + index + '" class="btn_adicionar"></a>';
                        html += '    <div class="ico"></div>';
                        html += '    <div class="dados">' + objeto.numRuas + '</div>';
                        html += '</div>';

                        var marker = new MarkerWithLabel({
                            position: latLng,
                            icon: "/AVA/Resultados/Imagens/marker_transparent.png",
                            labelContent: html,
                            labelAnchor: new google.maps.Point(26, 32),
                            labelStyle: { zIndex: zIndexStart },
                            labelClass: "labels"
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
                        console.log(objeto);
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

                        html = '<div class="ico_map modo-local-ruas" style="position: relative;">';
                        html += '    <h5>' + objeto.cidade + '</h5>';
                        html += '    <a href="" rel="' + index + '" class="btn_fechar"></a>';
                        html += '    <a href="" rel="' + index + '" class="btn_adicionar"></a>';
                        html += '    <div class="ico"></div>';
                        html += '    <div class="dados">' + objeto.numRuas + '</div>';
                        html += '</div>';

                        var bolUfSetada = $filter('filter')(arrEstadoSelecionado, { UF: objeto.uf }, true);
                        arrEstadoSelecionado.push({ UF: objeto.uf });

                        var marker = new MarkerWithLabel({
                            position: latLng,
                            icon: "/AVA/Resultados/Imagens/marker_transparent.png",
                            labelContent: html,
                            labelAnchor: new google.maps.Point(26, 32),
                            labelStyle: { zIndex: zIndexStart },
                            labelClass: "labels"
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
                        console.log(objeto);
                    }
                });

                break;
            case 3:

                objListMapa = self.dadosMapa.rua;

                angular.forEach(objListMapa, function (objeto, index) {
                    var html = '';
                    var locationData; // = projetoMapa.getCoordenadasByUfCidade(objeto.uf, objeto.cidade);

                    locationData = self.getCoordRua(objeto.uf, objeto.cidade, objeto.rua);
                    if(locationData==null){
                        locationData = projetoMapa.getCoordenadasByUfCidade(objeto.uf, objeto.cidade);   
                    }                     

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
                            labelClass: "labels"
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
                        console.log(objeto);
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
                $rootScope.$broadcast("changeListMapNossasRuas", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 2, listaInscricoes: [] });
            } else {
                $rootScope.$broadcast("changeListMapNossasRuas", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 2, listaInscricoes: [] });
            }
        }
    };

    $scope.$on("changeListMapNossasRuas", function (event, obj) {

        if (self.getTotalSelectedMarkers() == 0) {
            //self.getDadosFiltro();
            //self.geraGrafico();
        }        

    });

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
            case 1:
                self.transitoFiltro.slot1.cidade = "";
                break;
            case 2:
                self.transitoFiltro.slot2.cidade = "";
                break;
            default:
        }

    };

    self.changeValMobilidade = function (intSlot, strChave) {

        if (intSlot == 1) {
            self.transitoFiltro.slot1.info3[strChave] = !self.transitoFiltro.slot1.info3[strChave];
        }
        else {
            self.transitoFiltro.slot2.info3[strChave] = !self.transitoFiltro.slot2.info3[strChave];
        }

    };

    self.changeValRadio = function (intSlot, intRadio) {

        if (intSlot == 1) {
            if (intRadio == 1) {
                self.transitoFiltro.slot1.info2.comercial = !self.transitoFiltro.slot1.info2.comercial;
                self.transitoFiltro.slot1.info2.residencial = !self.transitoFiltro.slot1.info2.comercial;
            }
            else {
                self.transitoFiltro.slot1.info1.preservahistoria = !self.transitoFiltro.slot1.info1.preservahistoria;
                self.transitoFiltro.slot1.info1.moderna = !self.transitoFiltro.slot1.info1.preservahistoria;
            }
        }
        else {
            if (intRadio == 1) {
                self.transitoFiltro.slot2.info2.comercial = !self.transitoFiltro.slot2.info2.comercial;
                self.transitoFiltro.slot2.info2.residencial = !self.transitoFiltro.slot2.info2.comercial;
            }
            else {
                self.transitoFiltro.slot2.info1.preservahistoria = !self.transitoFiltro.slot2.info1.preservahistoria;
                self.transitoFiltro.slot2.info1.moderna = !self.transitoFiltro.slot2.info1.preservahistoria;
            }
        }

    };

    self.hasCaracteristicas = function (objEnvio, objFiltro) {

        var bolCaracteristica1 = false;
        var bolCaracteristica2 = false;

        var bolMobilidade = false;
        var bolSelecionouMobilidade = false;

        if (objFiltro.info1.moderna && objEnvio.dados.info1.moderna) { bolCaracteristica2 = true; }
        if (objFiltro.info1.preservahistoria && objEnvio.dados.info1.preservahistoria) { bolCaracteristica2 = true; }

        if (objFiltro.info2.comercial && objEnvio.dados.info2.comercial) { bolCaracteristica1 = true; }
        if (objFiltro.info2.residencial && objEnvio.dados.info2.residencial) { bolCaracteristica1 = true; }

        angular.forEach(objFiltro.info3, function (value, key) {
            //console.log('key: ' + key);
            //console.log('value: ' + value);            
            if (value && objEnvio.dados.info3[key]) {
                //Tem pelo menos uma das mobilidades
                bolMobilidade = true;
            }

            if(value){ bolSelecionouMobilidade = true; }
        });
        //console.log('bolSelecionouMobilidade: ' + bolSelecionouMobilidade);

        if(!bolSelecionouMobilidade){ 
            //Se não selecionou nenhum item de mobilidade, retorna verdadeiro pra tudo
            bolMobilidade = true; 
        }

        return (bolCaracteristica1 && bolCaracteristica2 && bolMobilidade);
    };

    self.getValidMarker = function (objProcura) {

        var idxMarker = -1;

        switch (self.mapselection) {
            case 1:

                for (var i = 0; i < self.allMarkers.length; i++) {
                    if (self.allMarkers[i] && self.allMarkers[i].objeto) {
                        if (self.allMarkers[i].objeto.uf.toLowerCase() == objProcura.strUFEscola.toLowerCase()) {
                            idxMarker = i;
                            break;
                        }
                    }
                }

                break;
            case 2:

                for (var j = 0; j < self.allMarkers.length; j++) {
                    if (self.allMarkers[j] && self.allMarkers[j].objeto) {
                        if (
                            self.allMarkers[j].objeto.uf.toLowerCase() == objProcura.strUFEscola.toLowerCase()
                            && self.allMarkers[j].objeto.cidade.toLowerCase() == objProcura.strCidadeEscola.toLowerCase()
                        ) {
                            idxMarker = j;
                            break;
                        }
                    }
                }

                break;
            case 3:

                for (var k = 0; k < self.allMarkers.length; k++) {
                    if (self.allMarkers[k] && self.allMarkers[k].objeto) {
                        if (
                            self.allMarkers[k].objeto.uf.toLowerCase() == objProcura.strUFEscola.toLowerCase()
                            && self.allMarkers[k].objeto.cidade.toLowerCase() == objProcura.strCidadeEscola.toLowerCase()
                            && self.allMarkers[k].objeto.rua.toLowerCase() == objProcura.rua.toLowerCase()
                        ) {
                            idxMarker = k;
                            break;
                        }
                    }
                }

                break;
            default:
        }
        return idxMarker;
    };

    self.getFiltroBySlot = function (intSlot) {

        var oFiltro = {
            "uf": "", "cidade": "", "rua": "",
            "info1": { "moderna": false, "preservahistoria": true },
            "info2": { "comercial": true, "residencial": false },
            "info3": { "ciclovia": false, "estacionamentobicicleta": false, "estacionamentocarro": false, "faixaelevada": false, "faixapedestre": false, "guiarebaixada": false, "pisotatil": false, "vegetacao": false }
        };

        switch (intSlot) {
            case 0:
                oFiltro = self.transitoFiltro.slot1;
                break;
            case 1:
                oFiltro = self.transitoFiltro.slot2;
                break;
            default:
        }
        return oFiltro;
    };

    self.AddItem = function ($event, intSlot) {
        var oFiltro = self.getFiltroBySlot(intSlot);        

        var idxFreeSlot = -1;
        var idxMarker = -1;
        var oBotao = angular.element($event.currentTarget);
        var strMensagem = '';

        var objProcura = null;

        switch (intSlot) {
            case 0:                
                idxFreeSlot = 0;
                break;
            case 1:                
                idxFreeSlot = 1;
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

                    angular.forEach(self.dadosGeral, function (objeto, index) {

                        if (objProcura == null) {
                            if (objeto.strUFEscola.toLowerCase() == oFiltro.uf.toLowerCase()) {
                                if (self.hasCaracteristicas(objeto, oFiltro)) {
                                    objProcura = objeto;
                                }
                            }
                        }

                    });

                }
                break;
            case 2:
                if (oFiltro.uf == "" || oFiltro.cidade == "") {
                    if (oFiltro.uf == "") { strMensagem = 'Selecione o estado!'; }
                    if (oFiltro.cidade == "" && strMensagem == '') { strMensagem = 'Selecione a cidade!'; }

                    alert(strMensagem);
                    return false;
                }
                else {

                    angular.forEach(self.dadosGeral, function (objeto, index) {

                        if (objProcura == null) {
                            if (
                                objeto.strUFEscola.toLowerCase() == oFiltro.uf.toLowerCase()
                                && objeto.strCidadeEscola.toLowerCase() == oFiltro.cidade.toLowerCase()
                            ) {
                                if (self.hasCaracteristicas(objeto, oFiltro)) {
                                    objProcura = objeto;
                                }
                            }
                        }

                    });

                }
                break;
            case 3:
                if (oFiltro.uf == "" || oFiltro.cidade == "" || oFiltro.rua == "") {
                    if (oFiltro.uf == "") { strMensagem = 'Selecione o estado!'; }
                    if (oFiltro.cidade == "" && strMensagem == '') { strMensagem = 'Selecione a cidade!'; }
                    if (oFiltro.rua == "" && strMensagem == '') { strMensagem = 'Digite o nome da rua!'; }

                    alert(strMensagem);
                    return false;
                }
                else {

                    angular.forEach(self.dadosGeral, function (objeto, index) {

                        if (objProcura == null) {
                            if (
                                objeto.strUFEscola.toLowerCase() == oFiltro.uf.toLowerCase()
                                && objeto.strCidadeEscola.toLowerCase() == oFiltro.cidade.toLowerCase()
                                && objeto.rua.toLowerCase() == oFiltro.rua.toLowerCase()
                            ) {
                                if (self.hasCaracteristicas(objeto, oFiltro)) {
                                    objProcura = objeto;
                                }
                            }
                        }

                    });

                }
                break;
            default:
        }

        if (objProcura == null) {
            alert('Não foi encontrado nenhum resultado com os parâmetros fornecidos!');
        }
        else {
            var idxMarkerValido = self.getValidMarker(objProcura);

            if (idxMarkerValido != -1) {
                self.openDetails2(idxMarkerValido, idxFreeSlot, objProcura);
            }
            else {
                console.log('Não foi encontrado o marcador!');
            }
        }
    };

    self.openDetails2 = function (idxMarker, idxFreeSlot, objProcura) {
        var totalSelected = self.getTotalSelectedMarkers();
        var divAux = document.createElement("div");
        var obj = self.allMarkers[idxMarker].marker;
        var maisDeUm = 0;
        var freeIndice = -1;

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

            if (markerAtivoAux.length == 0 && maisDeUm == 0) {

                if (totalSelected < _totalSlots) {

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
                        marker: self.allMarkers[idxMarker].marker,
                        objRua: objProcura,
                        enviosMarker: [],
                        materialGaleria: { passado:[], presente:[], futuro: [], seessaruafosseminha: [] }
                    };

                    angular.forEach(self.dadosGeral, function (objeto, index) {

                        switch (self.mapselection) {
                            case 1:
                                if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[freeIndice].objeto.uf.toLowerCase()) {
                                    if (self.hasCaracteristicas(objeto, self.getFiltroBySlot(freeIndice))) {
                                        self.selectedMarkers[freeIndice].enviosMarker.push(objeto);
                                    }
                                }
                                break;
                            case 2:
                                if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[freeIndice].objeto.uf.toLowerCase() && objeto.strCidadeEscola.toLowerCase() == self.selectedMarkers[freeIndice].objeto.cidade.toLowerCase()) {
                                    if (self.hasCaracteristicas(objeto, self.getFiltroBySlot(freeIndice))) {
                                        self.selectedMarkers[freeIndice].enviosMarker.push(objeto);
                                    }
                                }
                                break;
                            case 3:
                                if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[freeIndice].objeto.uf.toLowerCase() && objeto.strCidadeEscola.toLowerCase() == self.selectedMarkers[freeIndice].objeto.cidade.toLowerCase()) {
                                    if (objeto.rua.toLowerCase() == self.selectedMarkers[freeIndice].objeto.rua.toLowerCase()) {
                                        if (self.hasCaracteristicas(objeto, self.getFiltroBySlot(freeIndice))) {
                                            self.selectedMarkers[freeIndice].enviosMarker.push(objeto);
                                        }
                                    }
                                }
                                break;
                            default:
                        }

                    });

                    //Busca galeria das etapas
                    self.buscarGaleriaResultado(self.selectedMarkers[freeIndice].objRua.idProjetoInscricao.toString(), freeIndice);

                    angular.element(divAux).find('.ico_map').addClass('ativo slot' + (freeIndice + 1));
                    map.setCenter(obj.getPosition());
                    //map.setZoom(6);
                    if (self.mapselection == 3) {
                        map.setZoom(12);
                    }
                    else {
                        map.setZoom(6);
                    }

                    obj.setZIndex(obj.getZIndex() + 20);
                    obj.labelContent = divAux.innerHTML;

                    try {
                        obj.label.draw();
                    } catch (err) {
                        //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
                    }

                    //$rootScope.$broadcast("changeListMap", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 1, listaInscricoes: self.getListaInscricaoGaleria() });
                    $scope.safeApply();
                } else {
                    alert("O limite é de " + _totalSlots + "!");
                }
            } else {
                if (maisDeUm > 0) {
                    alert('Não é possível adicionar 2 itens iguais!')
                }
            }

        }
        //console.log(self.selectedMarkers);

    };

    self.stopAllSound = function (idxSlot) {
        var oAudio;

        if (idxSlot == 0) {
            oAudio = angular.element('.box-ruas-slots .slot1 audio');
        }
        else {
            oAudio = angular.element('.box-ruas-slots .slot2 audio');
        }

        if (oAudio.length > 0) {
            oAudio.trigger('pause').prop("currentTime", 0);
        }
    };

    self.playMusica = function ($event) {
        var oBotao = angular.element($event.currentTarget);
        var oPai = oBotao.parent();
        var oAudio = oPai.find('audio');

        if (oBotao.hasClass('play')) {
            oAudio.on('ended', function () {
                try {
                    oBotao.removeClass('stop').addClass('play');
                    angular.element(this).off('ended');
                }
                catch (err) { }
            });
            oBotao.removeClass('play').addClass('stop');
            oAudio.trigger('play');
        }
        else {
            oAudio.off('ended');

            oBotao.removeClass('stop').addClass('play');
            oAudio.trigger('pause').prop("currentTime", 0);
        }

    };

    self.getNomeArquivo = function (strPath) {
        
        var strNome = "";
        var aPath = strPath.split("/");
                
        if (aPath.length > 1) {
            strNome = aPath[aPath.length - 1];
        }

        return strNome;
    };

    self.freeSlotFromSlot = function (idx) {

        //console.log("idx: " + idx);
        if(!self.loadingSlot['slot' + idx]){
            if (self.selectedMarkers[idx] && self.selectedMarkers[idx].objeto) {
                if (self.selectedMarkers[idx].indice != -1) {                
                    self.freeSlotByIdx(self.selectedMarkers[idx].indice);                
                }
            }
        }

    };

    self.freeSlotByIdx = function (idxMarker) {
        
        for (var i = 0; i < self.selectedMarkers.length; i++) {
            if (self.selectedMarkers[i] && self.selectedMarkers[i].objeto) {
                if (self.selectedMarkers[i].indice == idxMarker) {
                    if(!self.loadingSlot['slot' + i]){
                        self.clearMapOverlayByIdx(idxMarker);

                        self.stopAllSound(i);
                        self.selectedMarkers[i] = new self.createDefaultSelectedMarker();

                        $rootScope.$broadcast("changeListMapNossasRuas", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 2, listaInscricoes: [] });
                        $scope.safeApply();
                        break;
                    }
                }
            }
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
                        marker: self.allMarkers[idxMarker].marker,
                        objRua: {},
                        enviosMarker: [],
                        materialGaleria: { passado:[], presente:[], futuro: [], seessaruafosseminha: [] }
                    };
                    self.setRuaInfoRuaByIdxSlot(freeIndice)

                    //Busca galeria das etapas
                    self.buscarGaleriaResultado(self.selectedMarkers[freeIndice].objRua.idProjetoInscricao.toString(), freeIndice);

                    angular.element(divAux).find('.ico_map').addClass('ativo slot' + (freeIndice + 1));
                    map.setCenter(obj.getPosition());
                    //map.setZoom(6);
                    if (self.mapselection == 3) {
                        map.setZoom(12);
                    }
                    else {
                        map.setZoom(6);
                    }

                    obj.setZIndex(obj.getZIndex() + 20);
                    obj.labelContent = divAux.innerHTML;

                    try {
                        obj.label.draw();
                    } catch (err) {
                        //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
                    }

                    //$rootScope.$broadcast("changeListMap", { selectedMarkers: self.selectedMarkers, mapSelection: self.mapselection, abaResultado: 1, listaInscricoes: self.getListaInscricaoGaleria() });
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
            }

        }
        //console.log(self.selectedMarkers);

    };

    self.setRuaInfoRuaByIdxSlot = function (idxSlot) {
        var objeto = self.selectedMarkers[idxSlot].objeto;
        var bolEncontrou = false;

        angular.forEach(self.dadosGeral, function (objeto, index) {
            //console.log(objeto);

            //if (!bolEncontrou) {
            switch (self.mapselection) {
                case 1:
                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[idxSlot].objeto.uf.toLowerCase()) {
                        self.selectedMarkers[idxSlot].enviosMarker.push(objeto);
                        self.selectedMarkers[idxSlot].objRua = objeto;
                        bolEncontrou = true;
                    }
                    break;
                case 2:
                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[idxSlot].objeto.uf.toLowerCase() && objeto.strCidadeEscola.toLowerCase() == self.selectedMarkers[idxSlot].objeto.cidade.toLowerCase()) {
                        self.selectedMarkers[idxSlot].enviosMarker.push(objeto);
                        self.selectedMarkers[idxSlot].objRua = objeto;
                        bolEncontrou = true;
                    }
                    break;
                case 3:
                    if (objeto.strUFEscola.toLowerCase() == self.selectedMarkers[idxSlot].objeto.uf.toLowerCase() && objeto.strCidadeEscola.toLowerCase() == self.selectedMarkers[idxSlot].objeto.cidade.toLowerCase()) {
                        //console.log(objeto.rua);
                        if (objeto.rua.toLowerCase() == self.selectedMarkers[idxSlot].objeto.rua.toLowerCase()) {
                            self.selectedMarkers[idxSlot].enviosMarker.push(objeto);
                            self.selectedMarkers[idxSlot].objRua = objeto;
                            bolEncontrou = true;
                        }
                    }
                    break;
                default:
            }
            //}

        });

        if (!bolEncontrou) {
            console.log('Não foi possível encontrar envio com parâmetros fornecidos!');
        }

    };

    self.changeMapSelection = function (intSelection) {
        if (self.mapselection != intSelection) {
            _markersPrincipal = [];
            _markersRestantes = [];
            self.allMarkers = [];            

            self.mapselection = intSelection;
            self.bolMapaSelection = !self.bolMapaSelection;

            for (var i = 0; i < _totalSlots; i++) {
                self.selectedMarkers[i] = new self.createDefaultSelectedMarker();
            }
        }

        //console.log(self.mapselection);
    };

    self.changeEnvioSlot = function (idxSlot) {
        var idxEnvioNovo = 0;        

        if(!self.loadingSlot['slot' + idxSlot]){
            for (var i = 0; i < self.selectedMarkers[idxSlot].enviosMarker.length; i++) {
                if (self.selectedMarkers[idxSlot].enviosMarker[i].idProjetoInscricao == self.selectedMarkers[idxSlot].objRua.idProjetoInscricao) {
                    if ((i + 1) >= self.selectedMarkers[idxSlot].enviosMarker.length) {
                        idxEnvioNovo = 0;
                    }
                    else {
                        idxEnvioNovo = i + 1;
                    }
                }
            }
            self.stopAllSound(idxSlot);
            self.selectedMarkers[idxSlot].objRua = self.selectedMarkers[idxSlot].enviosMarker[idxEnvioNovo];

            self.buscarGaleriaResultado(self.selectedMarkers[idxSlot].objRua.idProjetoInscricao.toString(), idxSlot);
        }
    };

    self.txtByIndice = function (idx) {
        var txtAux = '';
        var aTextos = [];

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

    self.getLinkEtapaPost = function (Envio) {
        var retorno = "";
        var Edicao = $scope.edicao;

        if(Envio){
            if (Edicao) if (Edicao.TipoProjeto) if (!isNaN(Edicao.TipoProjeto)) if (parseInt(Edicao.TipoProjeto) > 0) if (Edicao.Id) if (!isNaN(Edicao.Id)) if (parseInt(Edicao.TipoProjeto) > 0 && parseInt(Edicao.Id) > 0) {
                switch (parseInt(Edicao.TipoProjeto)) {
                    case 1:
                        //projeto
                        retorno = "/AVA/Projetos/" + new Date(parseInt(Envio.DataCriacao.substr(6), 10)).getFullYear() + "/" + Edicao.Link + "/Etapas/" + Envio.Etapa.Link + "/";
                        break;
                    case 2:
                        //clube
                        retorno = "/AVA/Projetos/Clube/" + Edicao.Projeto.Link + "/Desafios/" + Envio.Etapa.Link + "/";
                        break;
                }

                if (Envio.MensagemRapida) if (Envio.MensagemRapida.StrEncryptIdMensagem) if (Envio.MensagemRapida.StrEncryptIdMensagem != "") {
                    retorno += Envio.MensagemRapida.StrEncryptIdMensagem;
                }
            }
        }

        return retorno;
    };

    self.getLinkEtapa = function (Envio) {
        var retorno = "";
        var Edicao = $scope.edicao;

        if(Envio){
            if (Edicao) if (Edicao.TipoProjeto) if (!isNaN(Edicao.TipoProjeto)) if (parseInt(Edicao.TipoProjeto) > 0) if (Edicao.Id) if (!isNaN(Edicao.Id)) if (parseInt(Edicao.TipoProjeto) > 0 && parseInt(Edicao.Id) > 0) {
                switch (parseInt(Edicao.TipoProjeto)) {
                    case 1:
                        //projeto
                        retorno = "/AVA/Projetos/" + new Date(parseInt(Envio.DataCriacao.substr(6), 10)).getFullYear() + "/" + Edicao.Link + "/Etapas/" + Envio.Etapa.Link + "/";
                        break;
                    case 2:
                        //clube
                        retorno = "/AVA/Projetos/Clube/" + Edicao.Projeto.Link + "/Desafios/" + Envio.Etapa.Link + "/";
                        break;
                }            
            }
        }

        return retorno;
    };

    self.getBg = function(Envio){
        
        var strBackground = '';

        if(Envio.Video != null && Envio.Video !=  ''){
            strBackground = $filter('GetYouTubeThumb')(Envio.Video);
        }
        else{
            if( (Envio.Video == null || Envio.Video == '') && (Envio.Imagem != null && Envio.Imagem !=  '') ){
                strBackground = Envio.Imagem;
            }
            else{
                if(  
                    Envio.Inscricao.InscricaoTipo.Id==1 
                    && (Envio.Imagem == null || Envio.Imagem ==  '') 
                    && (Envio.Video == null || Envio.Video ==  '')
                ){
                    if(Envio.Inscricao.Turma.Foto!='' && Envio.Inscricao.Turma.Foto!=null){
                        strBackground = Envio.Inscricao.Turma.Foto;
                    }
                    else{
                        strBackground = $scope.config.DefImgTurmaLarge;
                    }                    
                }
                else{
                    if(
                        (Envio.Inscricao.InscricaoTipo.Id==2 || Envio.Inscricao.InscricaoTipo.Id==3) 
                        && (Envio.Imagem == null || Envio.Imagem ==  '') 
                        && (Envio.Video == null || Envio.Video ==  '')
                    ){
                        if(Envio.Inscricao.Equipe.Foto!='' && Envio.Inscricao.Equipe.Foto!=null){
                            strBackground = Envio.Inscricao.Equipe.Foto;
                        }
                        else{
                            strBackground = $scope.config.DefImgTurmaLarge;
                        }
                    }
                    else{
                        if(
                            Envio.Inscricao.InscricaoTipo.Id==5 
                            && (Envio.Imagem == null || Envio.Imagem ==  '') 
                            && (Envio.Video == null || Envio.Video ==  '')
                        ){
                            if(Envio.Inscricao.Responsavel.Perfil.Foto!='' && Envio.Inscricao.Responsavel.Perfil.Foto!=null){
                                strBackground = Envio.Inscricao.Responsavel.Perfil.Foto;
                            }
                            else{
                                strBackground = $scope.config.DefImgPerfilLarge;
                            }
                        }
                    }
                }
            }
        }
        return strBackground;
    };
    
    self.buscarGaleriaResultado = function (listaInscricao, idxSlot) {                

        if(!self.loadingSlot['slot'+idxSlot]){
            self.loadingSlot['slot'+idxSlot] = true;            

            $http.post('/AVA/Projetos/Servico/GetResultadoEnvioByListaInscricao',
            {
                idProjeto: $scope.edicao.Projeto.Id,
                idProjetoEdicao: $scope.edicao.Id,
                idProjetoEdicaoEtapa: 0,
                idSituacao: 1,                
                listaIdProjetoInscricao: listaInscricao,
                idUsuario: 0,
                idEscola: 0,
                idTurma: 0,
                strUF: '',
                tipoOrdenacao: 0,
                intPagina: 1,
                intRegPorPagina: 30,
                intDestaque: 0
            }).success(function (data) {
                //console.log('===GetResultadoEnvioByListaInscricao===');
                //console.log(data);
                
                self.selectedMarkers[idxSlot].materialGaleria = { passado:[], presente:[], futuro: [], seessaruafosseminha: [] };
                angular.forEach(data.listParticipanteEnvio, function(obj,idx){
                    if(obj.Etapa.Link=='presente' || obj.Etapa.Link=='passado' || obj.Etapa.Link=='futuro'){
                        self.selectedMarkers[idxSlot].materialGaleria[obj.Etapa.Link].push(obj);
                    }

                    if(obj.Etapa.Link=='seessaruafosseminha'){
                        self.selectedMarkers[idxSlot].materialGaleria[obj.Etapa.Link].push(obj);
                        //console.log(self.selectedMarkers[idxSlot].materialGaleria);
                        //console.log('slot: ' + idxSlot);
                    }
                });
                                
            }).error(function (err) {
                console.log("Não foi possível buscar detalhe da Etapa");
            }).finally(function(){                
                self.loadingSlot['slot'+idxSlot] = false;
            });
        }
    };


    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    };

    self.createDefaultSelectedMarker = function () {
        return { indice: -1, showAddOverlay: false, objeto: {}, marker: {}, objRua: {}, enviosMarker: [], materialGaleria: { passado:[], presente:[], futuro: [], seessaruafosseminha: [] } };
    };

    this.initDefaultObjects = function (teste) {
        for (var i = 0; i < _totalSlots; i++) {
            self.selectedMarkers[i] = new self.createDefaultSelectedMarker();
            //self.cityToAdd[i] = new self.createDefaultCity();
        }
    };

    self.initDefaultObjects();
    $rootScope.$broadcast("changeListMap", { selectedMarkers: [], mapSelection: 1, abaResultado: 2, listaInscricoes: [] });

    //console.log('==self.selectedMarkers===');
    //console.log(self.selectedMarkers);
} ]);