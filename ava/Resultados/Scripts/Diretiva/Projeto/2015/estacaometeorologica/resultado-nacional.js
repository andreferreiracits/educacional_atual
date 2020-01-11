"use strict";

angular.module("resultado")
    .controller('ctrl_estacaometeorologica',
    ["$http", "$scope", "$timeout", "$filter", "projetoMapa", function ($http, $scope, $timeout, $filter, projetoMapa) {
        
        var self = this;
        var map;
        var mgr;
        var _markersPrincipal = [];
        var _markersRestantes = [];
        var _totalCities = 4;

        $scope.bolCarregouDados = false;
        $scope.listMapa = new Array();
        $scope.dadosGerais = [];
        $scope.dadosConfig = {};

        $scope.dadosGeraisGraf2 = {
            estacaoExperimental: [],
            estacaoReal: []
        };

        $scope.allMarkers = [];

        $scope.selectedMarkers = [];
        $scope.cityToAdd = [];
        $scope.objEtapa = {};
        
        //=====================
        $scope.objEtapa3 = {};
        $scope.bolResultadoEt3 = false;

        this.filtroestadog3 = "";
        this.filtroescolag3 = 0;
        this.filtroturmag3 = 0;
        this.filtrocidadeg3 = "todas";

        // ETAPA 5 -------------------------
        $scope.objEtapa5 = {};
        $scope.bolResultadoEt5 = false;

        //----------------------------------

        this.paramBusca = { strCidade: "vazio" };

        $scope.loadingBuscarg3 = false;
        $scope.strTextFiltro = "Nenhuma cidade selecionada.";
        $scope.cidadesInFiltrog3 = [];
                
        $scope.filteredEstadosg3 = [];        
        this.cacheEscolag3 = [];
        $scope.filteredEscolag3 = [];
        this.cacheTurmag3 = [];
        $scope.filteredTurmag3 = [];

        this.cacheEnvioAnalise = [];
        $scope.filteredEnvioAnalise = [];        

        var _arrUF = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
        var _arrUFSigla = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];

        //------------------------------------------------------------------
        /*
        * Pega Id Etapa PRIMEIRA ANÁLISE para galeria
        */
        if($scope.edicao) if($scope.edicao.Etapas){
            var _objEtapa3 = $filter("filter")($scope.edicao.Etapas, { Link : "primeiraanalise" },true);
            if(_objEtapa3.length > 0){
                $scope.objEtapa3 = _objEtapa3[0];                
                                
                if( (new Date()-new Date(parseInt($scope.objEtapa3.DataResultado.replace(/\D+/g, ""))))>=0 ){
                    $scope.bolResultadoEt3 = true;
                }
            }
        }

        /*
        * Pega Id Etapa PRIMEIRA COLETA para galeria
        */
        if($scope.edicao) if($scope.edicao.Etapas){
            var _objEtapa = $filter("filter")($scope.edicao.Etapas, { Link : "primeiracoleta" },true);
            if(_objEtapa.length > 0){
                $scope.objEtapa = _objEtapa[0];
            }
        }
        
        //------------------------------------------------------------------
        /*
        * Pega Id Etapa SEGUNDA ANÁLISE para galeria
        */
        if($scope.edicao) if($scope.edicao.Etapas){
            var _objEtapa5 = $filter("filter")($scope.edicao.Etapas, { Link : "segundaanalise" },true);
            if(_objEtapa5.length > 0){
                $scope.objEtapa5 = _objEtapa5[0];                
                                
                if( (new Date()-new Date(parseInt($scope.objEtapa5.DataResultado.replace(/\D+/g, ""))))>=0 ){
                    $scope.bolResultadoEt5 = true;
                }
            }
        }

        //$scope.mapaResultado = projetoMapa.getTodasCoordenadas();
        this.initDefaultObjects = function(){
            for(var i = 0;i < _totalCities; i++){
                $scope.selectedMarkers[i] = new self.createDefaultSelectedMarker();
                $scope.cityToAdd[i] = new self.createDefaultCity();
            }
        };
        
        this.createDefaultSelectedMarker = function(){
            return  { indice: -1, showAddOverlay: false, objeto: {}, marker: {} };
        };

        this.createDefaultCity = function(){
            return  { indice: 0, Estado: "", Cidade: "", Hora: 0};
        };

        $scope.setHourToCity = function(index,value){
            if($scope.cityToAdd[index]){
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
                url: '/AVA/Resultados/Servico/GetResultadoEdicaoEtapa',
                params: {
                    idEdicao: $scope.edicao.Id,
                    idEtapa: 0
                },
                method: "GET"
            }).success(function (response) {
                var data = {};
                if (typeof(response)=="string"){
                    data = angular.fromJson(response);
                }
                else{
                    data = response;
                }
                
                if (data) if (data.dados) {
                    if (typeof(data.dados)=="string"){
                        data.dados = angular.fromJson(data.dados);
                    }
                    else{
                        data.dados = data.dados;
                    }

                    if(typeof(data.config) == "string"){
                        data.config = angular.fromJson(data.config);
                    }else{
                        data.config = data.config;
                    }

                    if (data.dados.dados1) {
                        if (typeof(data.dados.dados1)=="string"){
                            $scope.listMapa = JSON.parse(data.dados.dados1);
                        }
                        else if (data.dados.dados1 instanceof Array) if (data.dados.dados1.length > 0) {
                            $scope.listMapa = data.dados.dados1;
                        }
                    }
                    
                    if (data.dados.dados2){
                        if (typeof(data.dados.dados2)=="string"){
                            $scope.dadosGerais = JSON.parse(data.dados.dados2);
                        }
                        else if (data.dados.dados2 instanceof Array) if (data.dados.dados2.length > 0) {
                            $scope.dadosGerais = data.dados.dados2;
                        }
                        if ($scope.dadosGerais) if(data.config){
                            if (typeof(data.config)=="string"){
                                $scope.dadosConfig = JSON.parse(data.config);
                            }
                            if (data.config instanceof Object) if(data.config.validDataFields instanceof Array){
                                $scope.dadosConfig = data.config;
                            }
                        }
                    }

                    if (data.dados.dados3){                        
                        if (typeof(data.dados.dados3)=="string"){
                            $scope.dadosGeraisGraf2.estacaoExperimental = JSON.parse(data.dados.dados3);
                        }
                        else if (data.dados.dados3 instanceof Array) if (data.dados.dados3.length > 0) {
                            $scope.dadosGeraisGraf2.estacaoExperimental = data.dados.dados3;
                        }                        
                    }

                    if (data.dados.dados4){
                        if (typeof(data.dados.dados4)=="string"){
                            $scope.dadosGeraisGraf2.estacaoReal = JSON.parse(data.dados.dados4);
                        }
                        else if (data.dados.dados4 instanceof Array) if (data.dados.dados4.length > 0) {
                            $scope.dadosGeraisGraf2.estacaoReal = data.dados.dados4;
                        }                        
                    }

                    $timeout(function(){
                        self.setupAllMarkers($scope.listMapa);
                    },200);
                    
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
                //$scope.safeApply();
            }
        };

        $scope.setCityDetails = function(index,city){
            var bolAchou = false;
            if(index >= 0 && city != ""){
                for (var i = 0; i < $scope.allMarkers.length; i++) {
                    if ($scope.allMarkers[i]) if ($scope.allMarkers[i].objeto) {
                        if ($scope.allMarkers[i].objeto.Cidade.toLowerCase() == city.toLowerCase()) {
                            var idxCidade = i;
                            $scope.cityToAdd[index].indice = idxCidade;
                            $scope.cityToAdd[index].bolHora_1 = $scope.allMarkers[idxCidade].objeto.bolHora_1;
                            $scope.cityToAdd[index].bolHora_2 = $scope.allMarkers[idxCidade].objeto.bolHora_2;

                            if(($scope.cityToAdd[index].bolHora_1 != null && $scope.cityToAdd[index].bolHora_1) && ($scope.cityToAdd[index].bolHora_2 == null || $scope.cityToAdd[index].bolHora_2 == 0)){
                                $scope.cityToAdd[index].Hora = 9;
                                $scope.saveCityToMap(index);
                            }else if(($scope.cityToAdd[index].bolHora_2 != null && $scope.cityToAdd[index].bolHora_2) && ($scope.cityToAdd[index].bolHora_1 == null || $scope.cityToAdd[index].bolHora_1 == 0)){
                                $scope.cityToAdd[index].Hora = 15;
	                            $scope.saveCityToMap(index);
                            }else{
                                var bolClickAdd = false;
                                if($scope.selectedMarkers[index]){
                                    if($scope.selectedMarkers[index].showAddOverlay == true){
                                        bolClickAdd = true; 
                                    }
                                }
                                if(!bolClickAdd){
                                    $scope.cityToAdd[index].Hora = 9;
                                    $scope.saveCityToMap(index);
                                }
                            }

                            bolAchou = true;
                            break;
                        }
                    }
                }
            }

            if(!bolAchou){
                $scope.selectedMarkers[index] = new self.createDefaultSelectedMarker();
                $scope.cityToAdd[index] = new self.createDefaultCity();
                $scope.$broadcast("changeListMap",$scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig, $scope.dadosGeraisGraf2);
            }
        };

        $scope.getCityDetails = function(index){
            var city = "";

            if($scope.cityToAdd[index]) if($scope.cityToAdd[index].Cidade != null && $scope.cityToAdd[index].Cidade != ""){
                city = $scope.cityToAdd[index].Cidade;
            }
            
            if(city != ""){                
                $scope.setCityDetails(index,city);
            }else{
                $scope.cityToAdd[index].indice = 0;
                $scope.cityToAdd[index].bolHora_1 = 0;
                $scope.cityToAdd[index].bolHora_2 = 0;
                $scope.cityToAdd[index].Hora = 0;
            }
        };


        this.getIndiceMapByCity = function(city){
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

        $scope.freeSlotByIdx = function (idxCidade, index) {                    
            for (var i = 0; i < $scope.selectedMarkers.length; i++) {
                if ($scope.selectedMarkers[i] && $scope.selectedMarkers[i].objeto) {
                    if ($scope.selectedMarkers[i].indice == idxCidade && i == index) {
                        $scope.clearMapOverlayByIdx(i,idxCidade);
                        $scope.selectedMarkers[i] = new self.createDefaultSelectedMarker();
                        $scope.cityToAdd[i] = new self.createDefaultCity();
                        $scope.$broadcast("changeListMap",$scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig, $scope.dadosGeraisGraf2);
                        $scope.safeApply();
                        break;
                    }
                }
            }
        };

        $scope.saveCityToMap = function(indice){
            if($scope.cityToAdd[indice] != null){
                var cidadeOverlay = $scope.cityToAdd[indice];

                if(cidadeOverlay.Cidade != null && cidadeOverlay.Cidade != ""){
                    var _idxCidade = self.getIndiceMapByCity(cidadeOverlay.Cidade);
                    $scope.cityToAdd[indice].indice = _idxCidade;
                }                

                if((cidadeOverlay.indice != null && parseInt(cidadeOverlay.indice) >= 0) && (cidadeOverlay.Cidade != null && cidadeOverlay.Cidade != "") && parseInt(cidadeOverlay.Hora) > 0){
                    var idxCidade = $scope.cityToAdd[indice].indice;
                    var hora = $scope.cityToAdd[indice].Hora;                    
                    var totalSelected = self.getTotalSelectedMarkers();

//                    console.log("idxCidade: " + idxCidade);
//                    console.log("Hora: " + hora);                    
//                    console.log("totalSelected: " + totalSelected);
//                    console.log("Hora1: " + $scope.cityToAdd[indice].bolHora_1);
//                    console.log("Hora2: " + $scope.cityToAdd[indice].bolHora_2);
                    
                    if(idxCidade != null && idxCidade >= 0){
                        var divAux = document.createElement("div");
                        var obj = $scope.allMarkers[idxCidade].marker;

                        if (obj != null && obj) {
                            divAux.innerHTML = obj.labelContent;
                                                        
                            var anchor = $(divAux.getElementsByTagName("A")[0]);                            
                            if (anchor.hasClass("mais")) {
                        
                                var freeIndice =  indice; //self.getFreeSlotCity();
                                $scope.selectedMarkers[freeIndice] =
                                {
                                    indice: idxCidade,
                                    showAddOverlay: false,
                                    objeto: $scope.allMarkers[idxCidade].objeto,
                                    marker: $scope.allMarkers[idxCidade].marker
                                };

                                if(cidadeOverlay.Estado == null || cidadeOverlay.Estado == "" || cidadeOverlay.Estado === undefined){
                                    $scope.cityToAdd[indice].Estado =  $scope.allMarkers[idxCidade].objeto.Estado;
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

                                try{
                                    obj.label.draw(); 
                                }catch(err){
                                    //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
                                }
                                
                                $scope.$broadcast("changeListMap",$scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig, $scope.dadosGeraisGraf2);
                            }else{
                                //Se já foi adicionada, verifica se existe outro horário disponível.
 
                                var hora1 = $scope.cityToAdd[indice].bolHora_1;
                                var hora2 = $scope.cityToAdd[indice].bolHora_2;
                                var permiteNovoHorario = true;

                                for (var i = 0; i < $scope.cityToAdd.length; i++) {                                   
                                   if($scope.cityToAdd[i].Cidade != "" && ($scope.cityToAdd[i] != $scope.cityToAdd[indice]) && ($scope.cityToAdd[i].Cidade.toLowerCase() == $scope.cityToAdd[indice].Cidade.toLowerCase())){
                                        var horarioRegistrado = $scope.cityToAdd[i].Hora;                                        
                                        if(horarioRegistrado == $scope.cityToAdd[indice].Hora){                                            
                                            permiteNovoHorario = false;                                            
                                        }
                                   }
                                }

                                if(permiteNovoHorario){                                

                                    var freeIndice =  indice; //self.getFreeSlotCity();
                                    $scope.selectedMarkers[freeIndice] =
                                    {
                                        indice: idxCidade,
                                        showAddOverlay: false,
                                        objeto: $scope.allMarkers[idxCidade].objeto,
                                        marker: $scope.allMarkers[idxCidade].marker
                                    };

                                    if(cidadeOverlay.Estado == null || cidadeOverlay.Estado == "" || cidadeOverlay.Estado === undefined){
                                        $scope.cityToAdd[indice].Estado =  $scope.allMarkers[idxCidade].objeto.Estado;
                                    }

                                    /*
                                    anchor
                                        .removeClass("mais")
                                        .addClass("fechar");
                                    */                  
                                    var indiceExistente = "";
                                    for (var i = 0; i < $scope.selectedMarkers.length; i++) {
                                        if ($scope.selectedMarkers[i] && $scope.selectedMarkers[i].objeto) {
                                            if ($scope.selectedMarkers[i].indice == idxCidade) {                                                                      
                                                indiceExistente = i;                                                                 
                                            }
                                        }
                                    }             
                                    
                                    //alert('indiceExistente: ' +  indiceExistente + ", novoIndice: " + freeIndice);
                                    if(indiceExistente > freeIndice){                     
                                        anchor.parent("div")
                                            .removeClass (function (index, css) {
                                                return (css.match (/(^|\s)cidade-\S+/g) || []).join(' ');
                                            })
                                            .addClass("cidade-" + (freeIndice + 1));
                                    }
                                    

                                    map.setCenter(obj.getPosition());
                                    map.setZoom(6);

                                    obj.setZIndex(obj.getZIndex() + 20);
                                    obj.labelContent = divAux.innerHTML;

                                    try{
                                        obj.label.draw(); 
                                    }catch(err){
                                        //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
                                    }
                                
                                    $scope.$broadcast("changeListMap",$scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig, $scope.dadosGeraisGraf2);
                                }
                                else{
                                    $timeout(function(){
                                        alert("Esta cidade já foi adicionada!");
                                        $scope.cityToAdd[indice] = new self.createDefaultCity();
                                    },10);
                                }
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
            var maisDeUm = 0;

            if (obj != null && obj) {
                divAux.innerHTML = obj.labelContent;

                for (var i = 0; i < $scope.selectedMarkers.length; i++) {
                    if ($scope.selectedMarkers[i] && $scope.selectedMarkers[i].objeto) {
                        if ($scope.selectedMarkers[i].indice == idxCidade) {
                            maisDeUm = 1;
                            break;                             
                        }
                    }
                }               

                var anchor = $(divAux.getElementsByTagName("A")[0]);
                if (anchor.hasClass("mais") && maisDeUm == 0) {
                    if (totalSelected < _totalCities) {
                        //Abrir fancybox, sem atualizar cor,objeto!
                        var freeIndice = self.getFreeSlotCity();
                        
                        $scope.selectedMarkers[freeIndice] =
                        {
                            indice: idxCidade,
                            showAddOverlay: true,
                            // objeto: $scope.allMarkers[idxCidade].objeto,
                            // marker: $scope.allMarkers[idxCidade].marker
                        };
                        
                        $scope.cityToAdd[freeIndice] = 
                        {
                            indice: idxCidade,
                            Estado: $scope.allMarkers[idxCidade].objeto.Estado,
                            Cidade: $scope.allMarkers[idxCidade].objeto.Cidade,
                            bolHora_1 : $scope.allMarkers[idxCidade].objeto.bolHora_1,
                            bolHora_2 : $scope.allMarkers[idxCidade].objeto.bolHora_2,
                            Hora: 0
                        };
                        

                        if(($scope.cityToAdd[freeIndice].bolHora_1 != null && $scope.cityToAdd[freeIndice].bolHora_1) && ($scope.cityToAdd[freeIndice].bolHora_2 == null || $scope.cityToAdd[freeIndice].bolHora_2 == 0)){
                            $scope.cityToAdd[freeIndice].Hora = 9;
                            $scope.saveCityToMap(freeIndice);
                        }else if(($scope.cityToAdd[freeIndice].bolHora_2 != null && $scope.cityToAdd[freeIndice].bolHora_2) && ($scope.cityToAdd[freeIndice].bolHora_1 == null || $scope.cityToAdd[freeIndice].bolHora_1 == 0)){
                            $scope.cityToAdd[freeIndice].Hora = 15;
	                        $scope.saveCityToMap(freeIndice);
                        }
                        
                        $scope.safeApply();
                    } else {
                        alert("O limite é de " + _totalCities + " cidades!");
                    }
                } else {                    
                    $scope.freeSlotByIdx(idxCidade, i);             
                }
            }
        };


        $scope.clearMapOverlayByIdx = function(index,idxCidade){            
            var divAux = document.createElement("div");
            var obj = $scope.allMarkers[idxCidade].marker;
            
            if (obj != 
            null && obj) {
                divAux.innerHTML = obj.labelContent;
                var anchor = $(divAux.getElementsByTagName("A")[0]);
                var maisDeUm = 0;
                var pr_slot = "";
                var se_slot = "";

                for (var i = 0; i < $scope.selectedMarkers.length; i++) {
                    if ($scope.selectedMarkers[i] && $scope.selectedMarkers[i].objeto) {
                        if ($scope.selectedMarkers[i].indice == idxCidade) {                      
                            maisDeUm = maisDeUm + 1;                                                 
                            if (pr_slot.length == 0) {                                
                                pr_slot = i;                                
                            } else {                                
                                se_slot = i;                                
                            }                            
                        }
                    }
                }    
                
                if(pr_slot != index){
                    var pr_slot_aux = pr_slot;
                    var se_slot_aux = se_slot;
                    pr_slot = se_slot_aux;
                    se_slot = pr_slot_aux
                }
                           
                //alert(maisDeUm);                
                if(maisDeUm > 1){                          
                    //alert('pr_slot: ' + pr_slot + ', se_slot: ' + se_slot);
                    anchor = $(divAux.getElementsByTagName("A")[0]);        
                    
                    anchor.parent("div")                    
                        .removeClass (function (index, css) {
                                        return (css.match (/(^|\s)cidade-\S+/g) || []).join(' ');
                                    })                                   
                        .addClass("cidade-" + (se_slot+1));                    
                }else{
                    anchor = $(divAux.getElementsByTagName("A")[0]);
                    anchor
                        .removeClass("fechar")
                        .addClass("mais");

                    anchor.parent("div")
                    .removeClass("ativo")
                    .removeClass("cidade-" + (index+1));
                }
                

                obj.setZIndex(obj.getZIndex() - 2);
                obj.labelContent = divAux.innerHTML;

                try{
                    obj.label.draw(); 
                }catch(err){
                    //console.log("O estilo do overlay não foi atualizado, de um zoom para arrumar!" + err);
                }
            }
        };

        this.setupAllMarkers = function (objLista) {
            var arrEstadoSelecionado = [];
            var zIndexStart = 8000;
            
            angular.forEach($scope.listMapa, function (objeto, index) {
                var locationData = projetoMapa.getCoordenadasByUfCidade(objeto.Estado, objeto.Cidade);
                if (locationData != null) {
                    var latLng = new google.maps.LatLng(locationData.position[0], locationData.position[1]);
                    var html = '<div class="thumbs" style="position:none;">';

                    //ativo cidade-1
                    //var createAnchor = document.createElement('a');
                    //createAnchor.setAttribute("class", "mais");
                    //createAnchor.setAttribute("onclick", self.cityDetails());
                    //html += createAnchor;                    

                    html += "<a href='' rel='" + index + "' class='mais'></a>";
                    html += '	<h6>' + objeto.Cidade + '</h6>';
                    html += '	<div class="dados-cidade">';
                    html += '		<span class="mes">Mai</span>';
                    html += '		<span class="max">' + objeto.MaxTemperatura + '</span>';
                    html += '		<span class="min">' + objeto.MinTemperatura + '</span>';
                    html += '	</div>';
                    html += '   <div class="dados-cidade comp">';
                    html += '       <span class="mes">Ago</span>';
                    html += '       <span class="max">' + objeto.MaxTemperatura2 + '</span>';
                    html += '       <span class="min">' + objeto.MinTemperatura2 + '</span>';
                    html += '   </div>';
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

                    google.maps.event.addListener(marker, "mouseover", function() {
                        this.setOptions({zIndex:(zIndexStart + 30)});
                    });

                    google.maps.event.addListener(marker, "mouseout", function() {
                        this.setOptions({zIndex: zIndexStart});
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
                }else{
                    console.log("Cidade não encontrada a localização:");
                    console.log(objeto);
                }
            });

            if (_markersPrincipal.length > 0) {
                mgr.addMarkers(_markersPrincipal, 1);
                mgr.addMarkers(_markersRestantes, 6);
                mgr.refresh();

                if($scope.usuario) {
                    if($scope.usuario.Escola){
                        try {
                            var estado = $scope.usuario.Escola.Estado;
                            var cidade = $scope.usuario.Escola.Cidade;
                            var index  = 0;
                            if((estado != null && estado != "") && (cidade != null && cidade != "")){
                                $scope.cityToAdd[index].Estado = estado;
                                $scope.cityToAdd[index].Cidade = cidade;
                                $scope.setCityDetails(index,cidade);

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
                        }catch(err){ };
                    }
                }else{
                    $scope.$broadcast("changeListMap",$scope.cityToAdd, $scope.dadosGerais, $scope.dadosConfig, $scope.dadosGeraisGraf2);
                }
            }
        }
        
        $scope.safeApply = function( fn ) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        //=======
        //Galeria de análises, etapa 3      
        
         $scope.getLinkEtapa = function (Envio) {
            var retorno = "";            

            if ($scope.edicao) if ($scope.edicao.TipoProjeto) if (!isNaN($scope.edicao.TipoProjeto)) if (parseInt($scope.edicao.TipoProjeto)>0) if($scope.edicao.Id) if (!isNaN($scope.edicao.Id)) if (parseInt($scope.edicao.TipoProjeto)>0 && parseInt($scope.edicao.Id)>0) {
                    
                retorno = "/AVA/Projetos/"+ $scope.edicao.Ano +"/" + $scope.edicao.Link + "/Etapas/" + Envio.Etapa.Link + "/";                                                                            
                if(Envio.MensagemRapida) if(Envio.MensagemRapida.StrEncryptIdMensagem) if(Envio.MensagemRapida.StrEncryptIdMensagem!="") {
                    retorno +=  Envio.MensagemRapida.StrEncryptIdMensagem;
                }                                    
                    
            }
            return retorno;
        };        
                       
        this.getEstadoByUf = function (strUF) {
            if(_arrUFSigla.indexOf(strUF) > -1 ){
                return _arrUF[_arrUFSigla.indexOf(strUF)];
            }else{
                return strUF;
            }
        };        

        this.str2slug = function(str) {                            
            var from = "ãàáäâèéëêìíïîòóöôùúüûñç";
            var to = "aaaaaeeeeiiiioooouuuunc";

            for (var i = 0, l = from.length; i < l; i++) {
                str = str.replace(
                    new RegExp(from.charAt(i), 'g'),
                    to.charAt(i)
                );
            }                                

            return str;
        };

        this.getCidadeQuery = function(strCidade){
            var auxCidade = strCidade.toLowerCase();
            var strCidadeQuery = strCidade;                        

            switch(auxCidade) {
                case 'patos de minas':
                    strCidadeQuery = 'Pato de Minas';
                    break;
                case 'ijuí':
                    strCidadeQuery = 'Ijui';
                    break;
            }

            return strCidadeQuery;
        };

        this.temCidadeAnalisada = function(strCidades){
            var totalInFiltro = $scope.cidadesInFiltrog3.length;
            var bolOK = false;

            var listaCidadeAux = self.str2slug(strCidades.toLowerCase());
            var cidadeAux = '';
            

            if(self.filtrocidadeg3=="todas"){
                for(var i = 0; i < totalInFiltro; i++){
                    cidadeAux = self.str2slug(self.getCidadeQuery($scope.cidadesInFiltrog3[i].Cidade).toLowerCase());                                    
                    if(listaCidadeAux.indexOf(cidadeAux)!=-1){
                        bolOK = true;
                    }                         
                }               
            }
            else{
                cidadeAux = self.str2slug(self.getCidadeQuery(self.filtrocidadeg3).toLowerCase());                                    
                if(listaCidadeAux.indexOf(cidadeAux)!=-1){
                    bolOK = true;
                }  
            }

            return bolOK;
        };

        $scope.$on("changeListMap", function (event, obj) {                        
            $scope.strTextFiltro = "Nenhuma cidade selecionada.";
            $scope.cidadesInFiltrog3 = [];
            $scope.filteredEstadosg3 = [];            
            
            if(obj != null){
                var cidadesAdd = new Array();
                for(var i = 0;i < obj.length; i++){                                     
                    if((obj[i].Cidade != null && obj[i].Cidade != "") && parseInt(obj[i].Hora) > 0){                                                
                        if(cidadesAdd.indexOf(obj[i].Cidade) < 0){                            
                            $scope.cidadesInFiltrog3.push({
                                Sigla: obj[i].Estado,
                                Estado: self.getEstadoByUf(obj[i].Estado),
                                Cidade: obj[i].Cidade 
                            });         
                            cidadesAdd.push(obj[i].Cidade);
                            //console.log(cidadesAdd);
                        }
                        //console.log($scope.cidadesInFiltrog3);         
                    }                    
                }
            }

            if($scope.cidadesInFiltrog3.length > 0){
                var aux = "";
                var listaCidade = "";
                var totalInFiltro = $scope.cidadesInFiltrog3.length;

                for(var i = 0; i < totalInFiltro; i++){
                    if(aux == ""){
                        aux = $scope.cidadesInFiltrog3[i].Cidade;
                        listaCidade = $scope.cidadesInFiltrog3[i].Cidade;
                    }else{
                        var pre = ", ";
                        if(i == (totalInFiltro-1)){
                            pre = " e ";
                        }
                        if(aux.indexOf($scope.cidadesInFiltrog3[i].Cidade) < 0) {
                            aux += pre + $scope.cidadesInFiltrog3[i].Cidade;
                            listaCidade += ", " + $scope.cidadesInFiltrog3[i].Cidade;
                        }
                    }
                }                

                if(aux != ""){
                    aux = "envolvendo " + aux;
                    if(aux.length>65){
                        aux = "envolvendo as cidades selecionadas.";
                    }                    
                    $scope.strTextFiltro = aux;
                }                

                self.filtrocidadeg3 = "todas";
                self.filtroestadog3 = "";       
                self.filtroescolag3=0;
                self.filtroturmag3=0;         

                self.paramBusca.strCidade="vazio";                
                self.getEnvioFiltrog3();
            }            
            
        });

        this.updateFiltro = function(intFiltro){                     
            
            $scope.loadingBuscarg3 = true;
            switch (intFiltro) {
                case 0:
                    $scope.filteredEnvioAnalise = [];

                    angular.forEach(self.cacheEnvioAnalise,function(obj,idx){
                        if(
                            (self.filtroestadog3=="" || obj.Inscricao.Turma.Escola.Estado == self.filtroestadog3)
                            && (self.filtroescolag3=="0" || obj.Inscricao.Turma.Escola.Id == self.filtroescolag3)
                            && (self.filtroturmag3=="0" || obj.Inscricao.Turma.Id==self.filtroturmag3)
                        ){
                            if(self.temCidadeAnalisada(obj.Cidades)){
                                $scope.filteredEnvioAnalise.push(obj);
                            }
                        }
                    }); 
                    break;
                case 1:                    
                    self.filtroescolag3=0;
                    self.filtroturmag3=0;
                    
                    $scope.filteredEscolag3 = [];
                    $scope.filteredTurmag3 = [];
                    $scope.filteredEnvioAnalise = [];
                    
                    if(self.filtroestadog3==""){
                        $scope.filteredEscolag3 = self.cacheEscolag3;                        
                    }
                    else{
                        $scope.filteredEscolag3 = $filter("where")(self.cacheEscolag3, { Estado : self.filtroestadog3 }, true);                                           
                    }                           
                    
                    angular.forEach(self.cacheEnvioAnalise,function(obj,idx){
                        if(self.filtroestadog3=="" || obj.Inscricao.Turma.Escola.Estado==self.filtroestadog3){
                            if(self.temCidadeAnalisada(obj.Cidades)){
                                $scope.filteredEnvioAnalise.push(obj);
                            }
                        }
                    });                                 
                    break;
                case 2:
                    self.filtroturmag3=0;
                    $scope.filteredTurmag3 = [];
                    $scope.filteredEnvioAnalise = [];

                    if($scope.filteredEscolag3.length > 0 && self.filtroescolag3>0){                        

                        angular.forEach(self.cacheTurmag3,function(obj2,idx){
                            if(obj2.Escola.Id==self.filtroescolag3){
                                $scope.filteredTurmag3.push(obj2);                                    
                            }
                        });
                        
                    }

                    angular.forEach(self.cacheEnvioAnalise,function(obj,idx){
                        if(
                            (obj.Inscricao.Turma.Escola.Estado == self.filtroestadog3)
                            && (self.filtroescolag3=="0" || obj.Inscricao.Turma.Escola.Id == self.filtroescolag3)
                        ){
                            if(self.temCidadeAnalisada(obj.Cidades)){
                                $scope.filteredEnvioAnalise.push(obj);
                            }
                        }
                    }); 
                    break;
                case 3:
                    $scope.filteredEnvioAnalise = [];
                    
                    angular.forEach(self.cacheEnvioAnalise,function(obj,idx){
                        if(
                            (obj.Inscricao.Turma.Escola.Estado == self.filtroestadog3)
                            && (obj.Inscricao.Turma.Escola.Id == self.filtroescolag3)
                            && (self.filtroturmag3=="0" || obj.Inscricao.Turma.Id==self.filtroturmag3)
                        ){
                            if(self.temCidadeAnalisada(obj.Cidades)){
                                $scope.filteredEnvioAnalise.push(obj);
                            }
                        }
                    }); 
                    break;
            }                        
            $scope.loadingBuscarg3 = false;
        };        

        this.getEnvioFiltrog3 = function(){
            
            var listaCidade = "";
            var totalInFiltro = $scope.cidadesInFiltrog3.length;

            self.cacheEnvioAnalise = [];
            $scope.filteredEnvioAnalise = [];

            self.cacheEscolag3 = [];
            self.cacheTurmag3 = [];
            $scope.filteredEstadosg3 = [];
            $scope.filteredEscolag3 = [];
            $scope.filteredTurmag3 = [];

            for(var i = 0; i < totalInFiltro; i++){
                if(listaCidade == ""){                    
                    listaCidade = self.getCidadeQuery($scope.cidadesInFiltrog3[i].Cidade);
                }else{                    
                    listaCidade += ", " + self.getCidadeQuery($scope.cidadesInFiltrog3[i].Cidade);
                }
            }                     

            self.paramBusca.strCidade=listaCidade;            

            $scope.loadingBuscarg3 = true;
            $http.post('/AVA/Projetos/Servico/GetResultadoEnvioPorIdEtapaCidadeAnalisada',
            {                
                idEtapa: $scope.objEtapa3.Id +","+ $scope.objEtapa5.Id,    
                strCidades: self.paramBusca.strCidade
            }).success(function (data) {                

                //popula os envios
                if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {                    
                    self.cacheEnvioAnalise = data.listParticipanteEnvio;
                        
                    var _estados = [];
                    var _escolas = [];
                    var _turmas = [];
                    
                    angular.forEach(self.cacheEnvioAnalise,function(obj, index){
                        _estados.push({
                            Sigla: obj.Inscricao.Turma.Escola.Estado,
                            Estado: self.getEstadoByUf(obj.Inscricao.Turma.Escola.Estado)
                        });

                        _escolas.push(obj.Inscricao.Turma.Escola);
                        _turmas.push(obj.Inscricao.Turma);                        
                    });                    
                                                                       
                    self.cacheEscolag3 = $filter("unique")(_escolas, "Id");                    
                    self.cacheEscolag3 = $filter('orderBy')(self.cacheEscolag3, 'Nome');

                    self.cacheTurmag3 = $filter("unique")(_turmas, "Id");
                    self.cacheTurmag3 = $filter('orderBy')(self.cacheTurmag3, 'Nome');

                    //console.log(JSON.stringify(self.cacheEscolag3));                                              
                    
                    $scope.filteredEstadosg3 = $filter("unique")(_estados, "Sigla");    
                    $scope.filteredEstadosg3 = $filter('orderBy')($scope.filteredEstadosg3, 'Sigla');
                                        
                    $scope.filteredEscolag3 = self.cacheEscolag3;                                        
                    $scope.filteredTurmag3 = self.cacheTurmag3;                                        
                    $scope.filteredEnvioAnalise = self.cacheEnvioAnalise;                                        
                }                
            }).finally(function(){
                $scope.loadingBuscarg3 = false;
            });                
        };        
        //=======
        controllerAs: 'especialistaVideoCtrl'
        this.initDefaultObjects();
    } 
]);
