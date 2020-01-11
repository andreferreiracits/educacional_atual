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

angular.module('resultado').directive('compararPrecos', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/resultados/Scripts/Diretiva/Projeto/2017/oprecodascoisas/comparar-precos.html',
        scope: {},
        link: function (scope, el, attr) { },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', '$window', "projetoTools", function ($http, $scope, $timeout, $filter, $location, $window, projetoTools) {
            var self = this;
        }],
        controllerAs: 'compararPrecosCtrl'
    };
});

angular.module('resultado').service('Map', function ($q) {

    var markers = [];

    this.init = function () {
        var options = {
            zoom: 4,
            center: { lat: -15.799433, lng: -47.864138 }
            //center: new google.maps.LatLng(-15.778001, -47.879846),

        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }

    this.search = function (str) {
        var d = $q.defer();
        this.places.textSearch({ query: str }, function (results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }

    this.addMarkerRed = function (res) {
        //if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP,
            icon: 'http://www.googlemapsmarkers.com/v1/ff262d/'
        });
        this.map.setCenter(res.geometry.location);
		markers.push(this.marker);
    }

    this.addMarkerBlue = function (res) {
        //if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP,
            icon: 'http://www.googlemapsmarkers.com/v1/bbd9ff/'
        });
        this.map.setCenter(res.geometry.location);
		markers.push(this.marker);
    }

    this.addMarkerGreen = function (res) {
        //if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP,
            icon: 'http://www.googlemapsmarkers.com/v1/aacd34/'
        });
        this.map.setCenter(res.geometry.location);
		markers.push(this.marker);
    }

    this.clearMarkers = function () {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    this.alterarZoom = function (nvZoom) {
        this.map.setZoom(nvZoom);
    }

});

angular.module("resultado")
    .controller('CompararPrecosCtrl',
    ["$http", "$scope", "$timeout", "$interval", "$filter", "$location", '$window', "$state", "$modal", "Map",
        function ($http, $scope, $timeout, $interval, $filter, $location, $window, $state, $modal, Map) {

            var pId = $location.path();

            var idProjeto = 59;
            var idProjetoEdicaoEtapa = 157;
            var idFormulario = 151;
            var pagina = 1;
            var totalPaginas = 0;

            $scope.loading = false;
            $scope.modalLoading = false;
            $scope.lista = [];
            $scope.estados = [];
            $scope.cidades = [];
            $scope.prodSelecionado = undefined;
            $scope.estadoSelecionado = "BR";
            $scope.cidadeSelecionada = "Todas as Cidades";
            $scope.ordenacao = 1;
            $scope.ordem = "DESC";
            $scope.dataModal = new DataCompararPrecos();
            $scope.dataModal.produtos = new Array();
            $scope.dataModal.produtosRegionais = new Array();

            $scope.ordemDaLista = [false, false, false, false, false, false, false, false, true, false];

            $scope.init = function () {
                Map.init();
                $scope.selectProduto("ALFACE");
            };

            $scope.getEstadoByUf = function (strUF) {
                var arrNomes = ['Todos os Estados', 'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
                var arrSiglas = ['BR', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
                return arrNomes[arrSiglas.indexOf(strUF)];
            };

            $scope.getPrepByUf = function (strUF) {
                var arrNomes = ['NO', 'NO', 'NO', 'NO', 'NA', 'NO', 'NO', 'NO', 'EM', 'NO', 'NO', 'NO', 'EM', 'NO', 'NA', 'NO', 'EM', 'NO', 'NO', 'NO', 'NO', 'EM', 'EM', 'EM', 'EM', 'EM', 'NO'];
                var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
                return arrNomes[arrSiglas.indexOf(strUF)];
            };

            $scope.GetDadosCompararPrecos = function (pg) {
                if (pg === undefined) {
                    pagina = 1;
                    $scope.lista = [];
                }

                $scope.loading = true;

                $http({
                    url: "/AVA/Projetos/Servico/GetResultadosCompararPrecos",
                    method: "GET",
                    cache: false,
                    params: {
                        idProjeto: idProjeto,
                        idProjetoEdicaoEtapa: idProjetoEdicaoEtapa,
                        idFormulario: idFormulario,
                        idCampoMarca: $scope.prodSelecionado.idCampoMarca,
                        idCampoValor: $scope.prodSelecionado.idCampoValor,
                        uf: $scope.estadoSelecionado == "BR" ? "" : $scope.estadoSelecionado,
                        cidade: $scope.cidadeSelecionada == "Todas as Cidades" ? "" : $scope.cidadeSelecionada,
                        ordenacao: $scope.ordenacao,
                        ordem: $scope.ordem,
                        pagina: pagina,
                        regPorPagina: 10
                    }
                }).success(function (data) {
                    if (data) {
                        $scope.data = data;
                        $scope.lista = $scope.lista.concat(data.Lista);
                        $scope.destaqueCaro = data.MaisCaro;
                        $scope.destaqueBarato = data.MaisBarato;
                        $scope.estados = [];
                        $scope.cidades = data.Cidades;
                        totalPaginas = data.Paginas;

                        for (var e in data.Estados) {
                            $scope.estados.push({
                                Estado: $scope.getEstadoByUf(data.Estados[e]),
                                Sigla: data.Estados[e]
                            });
                        }

                        if (pg === undefined) {
                            if ($scope.cidadeSelecionada != "Todas as Cidades") {
                                $scope.fraseDestaque = $scope.fraseDestaque + "EM " + $scope.cidadeSelecionada.toUpperCase() + ", " + $scope.estadoSelecionado + "?";
                            } else if ($scope.estadoSelecionado != "BR") {
                                $scope.fraseDestaque = $scope.fraseDestaque + $scope.getPrepByUf($scope.estadoSelecionado).toUpperCase() + " " + $scope.getEstadoByUf($scope.estadoSelecionado).toUpperCase() + "?";
                            } else {
                                $scope.fraseDestaque = $scope.fraseDestaque + "EM TODOS OS ESTADOS?";
                            }
                        }

                        if ($scope.destaqueCaro !== undefined && $scope.destaqueBarato !== undefined) {
                            Map.clearMarkers();
                            if (($scope.destaqueBarato.UF === $scope.destaqueCaro.UF && $scope.destaqueBarato.UF === $scope.estadoSelecionado) || 
								($scope.destaqueBarato.Cidade === $scope.destaqueCaro.Cidade && $scope.destaqueBarato.Cidade === $scope.cidadeSelecionada)) {
                                Map.alterarZoom(6);
                                $scope.marcarNeutro($scope.destaqueCaro.Cidade + ", " + $scope.destaqueCaro.UF, $scope.destaqueBarato.Cidade + ", " + $scope.destaqueBarato.UF);
                            } else {
                                Map.alterarZoom(4);
                                $scope.marcarCaroEBarato($scope.destaqueCaro.Cidade + ", " + $scope.destaqueCaro.UF, $scope.destaqueBarato.Cidade + ", " + $scope.destaqueBarato.UF);
                            }
                        }
                    }
                    $scope.loading = false;
                }).error(function (data, status, headers, config) {
                    $scope.loading = false;
                    console.log("Ocorreu um erro ao buscar os dados [comparar-projetos.js]");
                });
            };

            $scope.setOrdClass = function (ord) {
                for (var j = 0; j < $scope.ordemDaLista.length; j++) {
                    $scope.ordemDaLista[j] = false;
                }
                $scope.ordemDaLista[ord] = true;
            }

            $scope.selectOrdem = function (ordenacao, ordem) {
                $scope.ordenacao = ordenacao;
                $scope.ordem = ordem;
                $scope.selectProduto($scope.prodSelecionado.nome);
            };

            $scope.selectEstado = function (estado) {
                $scope.estadoSelecionado = estado;
                $scope.cidadeSelecionada = "Todas as Cidades";
                $scope.selectProduto($scope.prodSelecionado.nome);
            };

            $scope.selectCidade = function (cidade) {
                $scope.cidadeSelecionada = cidade;
                $scope.selectProduto($scope.prodSelecionado.nome);
            };

            $scope.selectProduto = function (produto) {

                $scope.fraseDestaque = "QUAL É O PREÇO DE ";

                switch (produto) {
                    case "ALFACE":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1 UNIDADE DE " + produto + " ";
                        $scope.prodImgSrc = "alface.gif";
                        $scope.prodNavName = "Alface";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1225, idCampoMarca: 1226 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "BANANA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "banana.gif";
                        $scope.prodNavName = "Banana";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1227, idCampoMarca: 1228 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "BATATA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "batata.gif";
                        $scope.prodNavName = "Batata";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1229, idCampoMarca: 1230 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "LARANJA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "2kg DE " + produto + " ";
                        $scope.prodImgSrc = "laranja.gif";
                        $scope.prodNavName = "Laranja";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1231, idCampoMarca: 1232 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "MAÇÃ":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "maca.gif";
                        $scope.prodNavName = "Maçã";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1233, idCampoMarca: 1234 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "CEBOLA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "cebola.gif";
                        $scope.prodNavName = "Cebola";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1235, idCampoMarca: 1236 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "CENOURA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "cenoura.gif";
                        $scope.prodNavName = "Cenoura";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1237, idCampoMarca: 1238 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "COUVE MANTEIGA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1 UNIDADE DE " + produto + " ";
                        $scope.prodImgSrc = "couve_manteiga.gif";
                        $scope.prodNavName = "Couve manteiga";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1239, idCampoMarca: 1240 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "TOMATE":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "tomate.gif";
                        $scope.prodNavName = "Tomate";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1241, idCampoMarca: 1242 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "AÇÚCAR":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "acucar.gif";
                        $scope.prodNavName = "Açucar";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1243, idCampoMarca: 1244 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "SAL REFINADO":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE SAL REFINADO ";
                        $scope.prodImgSrc = "sal.gif";
                        $scope.prodNavName = "Sal refinado";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1245, idCampoMarca: 1246 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "CAFÉ":
                        $scope.fraseDestaque = $scope.fraseDestaque + "500g DE " + produto + " ";
                        $scope.prodImgSrc = "cafe.gif";
                        $scope.prodNavName = "Café";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1247, idCampoMarca: 1248 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "LEITE INTEGRAL":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1L DE " + produto + " ";
                        $scope.prodImgSrc = "leite_integral.gif";
                        $scope.prodNavName = "Leite integral";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1249, idCampoMarca: 1250 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "ARROZ BRANCO":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "arroz.gif";
                        $scope.prodNavName = "Arroz branco";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1251, idCampoMarca: 1252 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "FEIJÃO PRETO":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "feijao_preto.gif";
                        $scope.prodNavName = "Feijão preto";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1253, idCampoMarca: 1254 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "OVOS":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1 DÚZIA " + produto + " ";
                        $scope.prodImgSrc = "ovos.gif";
                        $scope.prodNavName = "Ovos";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1255, idCampoMarca: 1256 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "BISCOITO DE MAIZENA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "400g DE " + produto + " ";
                        $scope.prodImgSrc = "biscoito_de_maizena.gif";
                        $scope.prodNavName = "Biscoito de maizena";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1257, idCampoMarca: 1258 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "PÃO FRANCÊS":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "pao_frances.gif";
                        $scope.prodNavName = "Pão francês";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1259, idCampoMarca: 1260 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "MANTEIGA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "250g DE " + produto + " ";
                        $scope.prodImgSrc = "manteiga.gif";
                        $scope.prodNavName = "Manteiga";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1261, idCampoMarca: 1262 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "MARGARINA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "200g DE " + produto + " ";
                        $scope.prodImgSrc = "margarina.gif";
                        $scope.prodNavName = "Margarina";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1263, idCampoMarca: 1264 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "MACARRÃO ESPAGUETE":
                        $scope.fraseDestaque = $scope.fraseDestaque + "500g DE " + produto + " ";
                        $scope.prodImgSrc = "macarrao.gif";
                        $scope.prodNavName = "Macarrão espaguete";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1265, idCampoMarca: 1266 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "ÓLEO DE SOJA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "900mL DE " + produto + " ";
                        $scope.prodImgSrc = "oleo_de_soja.gif";
                        $scope.prodNavName = "Óleo de soja";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1267, idCampoMarca: 1268 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "FARINHA DE TRIGO":
                        $scope.fraseDestaque = $scope.fraseDestaque + "1kg DE " + produto + " ";
                        $scope.prodImgSrc = "farinha_de_trigo.gif";
                        $scope.prodNavName = "Farinha de trigo";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1269, idCampoMarca: 1270 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "SABONETE":
                        $scope.fraseDestaque = $scope.fraseDestaque + "85g DE " + produto + " ";
                        $scope.prodImgSrc = "sabonete.gif";
                        $scope.prodNavName = "Sabonete";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1271, idCampoMarca: 1272 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "CREME DENTAL":
                        $scope.fraseDestaque = $scope.fraseDestaque + "UM TUBO DE 90g DE " + produto + " ";
                        $scope.prodImgSrc = "creme_dental.gif";
                        $scope.prodNavName = "Creme dental";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1273, idCampoMarca: 1274 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "DESODORANTE":
                        $scope.fraseDestaque = $scope.fraseDestaque + "150mL DE " + produto + " ";
                        $scope.prodImgSrc = "desodorante.gif";
                        $scope.prodNavName = "Desodorante";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1275, idCampoMarca: 1276 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "PAPEL HIGIÊNICO":
                        $scope.fraseDestaque = $scope.fraseDestaque + "12 UNIDADES DE " + produto + " ";
                        $scope.prodImgSrc = "papel_higienico.gif";
                        $scope.prodNavName = "Papel higiênico";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1277, idCampoMarca: 1278 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "ÁGUA SANITÁRIA":
                        $scope.fraseDestaque = $scope.fraseDestaque + "2L DE " + produto + " ";
                        $scope.prodImgSrc = "agua_sanitaria.gif";
                        $scope.prodNavName = "Água sanitária";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1279, idCampoMarca: 1280 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "DETERGENTE LÍQUIDO":
                        $scope.fraseDestaque = $scope.fraseDestaque + "500mL DE " + produto + " ";
                        $scope.prodImgSrc = "detergente_liquido.gif";
                        $scope.prodNavName = "Detergente líquido";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1281, idCampoMarca: 1282 };
                        $scope.GetDadosCompararPrecos();
                        break;
                    case "SABÃO EM PÓ":
                        $scope.fraseDestaque = $scope.fraseDestaque + "2kg DE " + produto + " ";
                        $scope.prodImgSrc = "sabao_em_po.gif";
                        $scope.prodNavName = "Sabão em pó";
                        $scope.prodSelecionado = { nome: produto, idCampoValor: 1283, idCampoMarca: 1284 };
                        $scope.GetDadosCompararPrecos();
                        break;
                }

            };

	    $scope.adicionarJingle = function(){
		jQuery('#audioPlayer').remove();

		if($scope.dataModal.jingle !== undefined){
		    switch ($scope.dataModal.jingle.toLowerCase().substr($scope.dataModal.jingle.lastIndexOf('.') + 1)) {
			case 'mp3':
			    jQuery('#jingle').append("<audio id='audioPlayer' class='audioPlayer' controls><source src='" + $scope.dataModal.jingle + "' type='audio/mpeg'></audio>");
                            break;
			case 'ogg':
			    jQuery('#jingle').append("<audio id='audioPlayer' class='audioPlayer' controls><source src='" + $scope.dataModal.jingle + "' type='audio/ogg'></audio>");
                            break;
			case 'wav':
			    jQuery('#jingle').append("<audio id='audioPlayer' class='audioPlayer' controls><source src='" + $scope.dataModal.jingle + "' type='audio/wav'></audio>");
                            break;
			case 'wma':
			    jQuery('#jingle').append("<embed id='audioPlayer' class='audioPlayerClassic' style='display:block;' src='" + $scope.dataModal.jingle + "' type='video/x-ms-asf-plugin' pluginspage='http://www.microsoft.com/netshow/download/player.htm' autostart=false transparentatstart=true width='0' height='0'  ShowStatusBar=false animationatstart=true  showcontrols=0 showpositioncontrols=0></embed>");
                            break;
			default:
			    jQuery('#jingle').append("<audio id='audioPlayer' class='audioPlayer' controls><source src='' type='audio/mpeg'></audio>");
                            break;

		    }
		}else{
		    jQuery('#jingle').append("<audio id='audioPlayer' class='audioPlayer' controls><source src='' type='audio/mpeg'></audio>");
		}
	    };


            $scope.GetAllFormulario = function (item) {
                $scope.modalLoading = true;
                $scope.dataModal = new DataCompararPrecos();
                $scope.dataModal.produtos = new Array();
                $scope.dataModal.produtosRegionais = new Array();
                $http({
                    url: "/AVA/ProjetoApi/v1/Formulario/GetAll/",
                    method: "GET",
                    cache: false,
                    params: {
                        idFormulario: idFormulario,
                        idFormularioResposta: item.idFormularioResposta,
                        idInscricao: item.idProjetoInscricao
                    }
                }).success(function (data) {
                    if (data) {
                        var alface = new Produto();
                        var banana = new Produto();
                        var batata = new Produto();
                        var laranja = new Produto();
                        var maca = new Produto();
                        var cebola = new Produto();
                        var cenoura = new Produto();
                        var couve = new Produto();
                        var tomate = new Produto();
                        var acucar = new Produto();
                        var sal = new Produto();
                        var cafe = new Produto();
                        var leite = new Produto();
                        var arroz = new Produto();
                        var feijao = new Produto();
                        var ovos = new Produto();
                        var maizena = new Produto();
                        var pao = new Produto();
                        var manteiga = new Produto();
                        var margarina = new Produto();
                        var macarrao = new Produto();
                        var oleo = new Produto();
                        var trigo = new Produto();
                        var sabonete = new Produto();
                        var cremeDental = new Produto();
                        var desodorante = new Produto();
                        var papelHigienico = new Produto();
                        var aguaSanitario = new Produto();
                        var detergente = new Produto();
                        var sabao = new Produto();

                        var primeiroProdutoRegional = new ProdutoRegional();
                        var segundoProdutoRegional = new ProdutoRegional();
                        var terceiroProdutoRegional = new ProdutoRegional();

                        $scope.dataModal.setNomeTurma(item.Turma);
                        $scope.dataModal.setNomeEscola(item.Escola);
                        $scope.dataModal.setCidadeUF(item.Cidade + "/" + item.UF);

                        for (var i = 0; i < data.FormularioResposta.Campos.length; i++) {
                            var campo = data.FormularioResposta.Campos[i];
                            if (campo.FormularioCampo.Id == 1143) {
                                $scope.dataModal.setNomeMercadinho(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1144) {
                                $scope.dataModal.setLogotipo(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1145) {
                                $scope.dataModal.setSlogan(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1146) {
                                $scope.dataModal.setJingle(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1225) {
                                alface.setNomeProduto("Alface");
                                alface.setQuantidade("Unidade");
                                alface.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1226) {
                                alface.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1227) {
                                banana.setNomeProduto("Banana");
                                banana.setQuantidade("1 Kg");
                                banana.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1228) {
                                banana.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1229) {
                                batata.setNomeProduto("Batata");
                                batata.setQuantidade("1 Kg");
                                batata.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1230) {
                                batata.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1231) {
                                laranja.setNomeProduto("Laranja");
                                laranja.setQuantidade("2 Kg");
                                laranja.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1232) {
                                laranja.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1233) {
                                maca.setNomeProduto("Maça");
                                maca.setQuantidade("1 Kg");
                                maca.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1234) {
                                maca.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1235) {
                                cebola.setNomeProduto("Cebola");
                                cebola.setQuantidade("1 Kg");
                                cebola.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1236) {
                                cebola.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1237) {
                                cenoura.setNomeProduto("Cenoura");
                                cenoura.setQuantidade("1 Kg");
                                cenoura.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1238) {
                                cenoura.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1239) {
                                couve.setNomeProduto("Couve manteiga");
                                couve.setQuantidade("Unidade");
                                couve.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1240) {
                                couve.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1241) {
                                tomate.setNomeProduto("Tomate");
                                tomate.setQuantidade("1 Kg");
                                tomate.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1242) {
                                tomate.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1243) {
                                acucar.setNomeProduto("Açucar");
                                acucar.setQuantidade("1 Kg");
                                acucar.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1244) {
                                acucar.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1245) {
                                sal.setNomeProduto("Sal Refinado");
                                sal.setQuantidade("1 Kg");
                                sal.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1246) {
                                sal.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1247) {
                                cafe.setNomeProduto("Café");
                                cafe.setQuantidade("500g");
                                cafe.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1248) {
                                cafe.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1249) {
                                leite.setNomeProduto("Leite Integral");
                                leite.setQuantidade("1 litro");
                                leite.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1250) {
                                leite.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1251) {
                                arroz.setNomeProduto("Arroz Branco");
                                arroz.setQuantidade("1 Kg");
                                arroz.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1252) {
                                arroz.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1253) {
                                feijao.setNomeProduto("Feijão Preto");
                                feijao.setQuantidade("1 Kg");
                                feijao.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1254) {
                                feijao.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1255) {
                                ovos.setNomeProduto("Ovos");
                                ovos.setQuantidade("1 dúzia");
                                ovos.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1256) {
                                ovos.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1257) {
                                maizena.setNomeProduto("Biscoito de Maizena");
                                maizena.setQuantidade("400g");
                                maizena.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1258) {
                                maizena.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1259) {
                                pao.setNomeProduto("Pão Francês");
                                pao.setQuantidade("1 Kg");
                                pao.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1260) {
                                pao.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1261) {
                                manteiga.setNomeProduto("Manteiga");
                                manteiga.setQuantidade("250g");
                                manteiga.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1262) {
                                manteiga.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1263) {
                                margarina.setNomeProduto("Margarina");
                                margarina.setQuantidade("200g");
                                margarina.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1264) {
                                margarina.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1265) {
                                macarrao.setNomeProduto("Macarrão espaguete");
                                macarrao.setQuantidade("500g");
                                macarrao.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1266) {
                                macarrao.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1267) {
                                oleo.setNomeProduto("Óleo de soja");
                                oleo.setQuantidade("900ml");
                                oleo.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1268) {
                                oleo.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1269) {
                                trigo.setNomeProduto("Farinha de trigo");
                                trigo.setQuantidade("1 Kg");
                                trigo.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1270) {
                                trigo.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1271) {
                                sabonete.setNomeProduto("Sabonete");
                                sabonete.setQuantidade("85g");
                                sabonete.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1272) {
                                sabonete.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1273) {
                                cremeDental.setNomeProduto("Creme Dental");
                                cremeDental.setQuantidade("Tubo 90g");
                                cremeDental.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1274) {
                                cremeDental.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1275) {
                                desodorante.setNomeProduto("Desodorante");
                                desodorante.setQuantidade("150 ml");
                                desodorante.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1276) {
                                desodorante.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1277) {
                                papelHigienico.setNomeProduto("Papel higiênico");
                                papelHigienico.setQuantidade("12 unidades");
                                papelHigienico.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1278) {
                                papelHigienico.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1279) {
                                aguaSanitario.setNomeProduto("Água sanitária");
                                aguaSanitario.setQuantidade("2 litros");
                                aguaSanitario.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1280) {
                                aguaSanitario.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1281) {
                                detergente.setNomeProduto("Detergente líquido");
                                detergente.setQuantidade("500ml");
                                detergente.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1282) {
                                detergente.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1283) {
                                sabao.setNomeProduto("Sabão em pó");
                                sabao.setQuantidade("2 Kg");
                                sabao.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1284) {
                                sabao.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1286) {
                                primeiroProdutoRegional.setNomeProduto(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1287) {
                                primeiroProdutoRegional.setLogotipo(campo.Valor);
                                primeiroProdutoRegional.setLegenda(campo.Legenda);
                            } else if (campo.FormularioCampo.Id == 1288) {
                                primeiroProdutoRegional.setQuantidade(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1289) {
                                primeiroProdutoRegional.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1290) {
                                primeiroProdutoRegional.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1291) {
                                segundoProdutoRegional.setNomeProduto(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1292) {
                                segundoProdutoRegional.setLogotipo(campo.Valor);
                                segundoProdutoRegional.setLegenda(campo.Legenda);
                            } else if (campo.FormularioCampo.Id == 1293) {
                                segundoProdutoRegional.setQuantidade(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1294) {
                                segundoProdutoRegional.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1295) {
                                segundoProdutoRegional.setPreco(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1296) {
                                terceiroProdutoRegional.setNomeProduto(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1297) {
                                terceiroProdutoRegional.setLogotipo(campo.Valor);
                                terceiroProdutoRegional.setLegenda(campo.Legenda);
                            } else if (campo.FormularioCampo.Id == 1298) {
                                terceiroProdutoRegional.setQuantidade(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1299) {
                                terceiroProdutoRegional.setMarca(campo.Valor);
                            } else if (campo.FormularioCampo.Id == 1300) {
                                terceiroProdutoRegional.setPreco(campo.Valor);
                            }
                        }

                        $scope.dataModal.produtos.push(alface);
                        $scope.dataModal.produtos.push(banana);
                        $scope.dataModal.produtos.push(batata);
                        $scope.dataModal.produtos.push(laranja);
                        $scope.dataModal.produtos.push(maca);
                        $scope.dataModal.produtos.push(cebola);
                        $scope.dataModal.produtos.push(cenoura);
                        $scope.dataModal.produtos.push(couve);
                        $scope.dataModal.produtos.push(tomate);
                        $scope.dataModal.produtos.push(acucar);
                        $scope.dataModal.produtos.push(sal);
                        $scope.dataModal.produtos.push(cafe);
                        $scope.dataModal.produtos.push(leite);
                        $scope.dataModal.produtos.push(arroz);
                        $scope.dataModal.produtos.push(feijao);
                        $scope.dataModal.produtos.push(ovos);
                        $scope.dataModal.produtos.push(maizena);
                        $scope.dataModal.produtos.push(pao);
                        $scope.dataModal.produtos.push(manteiga);
                        $scope.dataModal.produtos.push(margarina);
                        $scope.dataModal.produtos.push(macarrao);
                        $scope.dataModal.produtos.push(oleo);
                        $scope.dataModal.produtos.push(trigo);
                        $scope.dataModal.produtos.push(sabonete);
                        $scope.dataModal.produtos.push(cremeDental);
                        $scope.dataModal.produtos.push(desodorante);
                        $scope.dataModal.produtos.push(papelHigienico);
                        $scope.dataModal.produtos.push(aguaSanitario);
                        $scope.dataModal.produtos.push(detergente);
                        $scope.dataModal.produtos.push(sabao);

                        $scope.dataModal.produtosRegionais.push(primeiroProdutoRegional);
                        $scope.dataModal.produtosRegionais.push(segundoProdutoRegional);
                        $scope.dataModal.produtosRegionais.push(terceiroProdutoRegional);

			            $scope.adicionarJingle();
			            $scope.modalLoading = false;
                    } else {
                        alert("Houve um problema ao buscar os dados. Tente novamente.");
                        $scope.modalLoading = false;
                    }
                }).error(function (data, status, headers, config) {
                    $scope.modalLoading = false;
                    console.log("Ocorreu um erro ao buscar os dados [comparar-projetos.js]");
                });
            };

            //faz chamada api para buscar os dados do produto de acordo como o filtro

            $scope.marcarCaroEBarato = function (caro, barato) {
                $scope.apiError = false;

                Map.search(caro)
                .then(
                    function (res) { // success
                        Map.addMarkerRed(res);

                    },
                    function (status) { // error
                        $scope.apiError = true;
                        $scope.apiStatus = status;
                    }
                );

                Map.search(barato)
                .then(
                    function (res) { // success
                        Map.addMarkerGreen(res);

                    },
                    function (status) { // error
                        $scope.apiError = true;
                        $scope.apiStatus = status;
                    }
                );
            }

            $scope.marcarNeutro = function (caro, barato) {
                $scope.apiError = false;

                Map.search(caro)
                .then(
                    function (res) { // success
                        Map.addMarkerBlue(res);

                    },
                    function (status) { // error
                        $scope.apiError = true;
                        $scope.apiStatus = status;
                    }
                );

                Map.search(barato)
                .then(
                    function (res) { // success
                        Map.addMarkerBlue(res);

                    },
                    function (status) { // error
                        $scope.apiError = true;
                        $scope.apiStatus = status;
                    }
                );
            }

            //Função para chamar os dados quando chegar no final da lista
            angular.element($window).bind("scroll", function () {
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10 && pagina <= totalPaginas && !$scope.loading) {
                    pagina++;
                    $scope.GetDadosCompararPrecos(pagina);
                }
            });

            $scope.init();
        }]);

