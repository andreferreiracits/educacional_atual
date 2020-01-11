"use strict";

angular.module('resultado')
.run(
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
)
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('principal', {
            url: "/",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2016/nossacidadenossasruas/_deolhonotransito.html",
                    controller: "NossaCidadeTransito2016Ctrl",
                    controllerAs: 'transito2016Ctrl'
                }
            }
        })
        .state('nossasruas', {
            url: "/nossasruas",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2016/nossacidadenossasruas/_nossasruas.html",
                    controller: "NossaCidadeNossasRuas2016Ctrl",
                    controllerAs: 'nossasRuas2016Ctrl'
                }
            }
        });
    //Se não achar nenhuma rota, redireciona para raíz "/"
    $urlRouterProvider.otherwise("/");
} ]);


angular.module("resultado")
.controller('NossaCidade2016Ctrl',
["$http", "$scope", "$timeout", "$filter", "$location", "$state", function ($http, $scope, $timeout, $filter, $location, $state) {
    var self = this;
    
    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    };

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.Left = function (str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0, n);
    }
    $scope.Right = function (str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else {
            var iLen = String(str).length;
            return String(str).substring(iLen, iLen - n);
        }
    }

    $scope.DataZeros = function (data) {
        var d = new Date();
        if (data) if (data instanceof Date) {
            d = data;
        }
        var ret = $scope.Right("0" + d.getDate().toString(), 2);
        ret += '/' + $scope.Right("0" + (d.getMonth() + 1).toString(), 2);
        ret += '/' + d.getFullYear().toString();
        return ret;
    }

    $scope.categoriasEtapa1 = [];

    this.init = function () {

        if ($scope.dados) {
            if (typeof ($scope.dados) == "string") {
                $scope.dados = angular.fromJson($scope.dados);
            }
            else {
                $scope.dados = $scope.dados;
            }
        }
        else {
            $scope.dados = {};
        }        
    };

    this.init();
} ]);

angular.module("resultado")
.controller('GaleriaNossaCidade2016Ctrl',
["$http", "$scope", "$timeout", "$filter", "$location", "$state", function ($http, $scope, $timeout, $filter, $location, $state) {
    var self = this;
    
    
    self.idEtapa1 = 0;

    self.bolGaleria = false;
    self.bolPodeBuscarMais = false;

    self.loadingBuscarGeral = false;
    self.intPagina = 1;
    self.intRegPorPagina = 6;
    
    self.totalEnviosFiltrado = 0;
    self.cacheListaEnvios = [];
    self.cacheInscricoes = '';
        
    self.turmasInscritas = [];
    
    self.estadoSelecionado="";
    self.escolaSelecionada=0;
    self.turmaSelecionada=0;

    self.filtroEstados = [];
    self.filtroEscola = [];
    self.filtroTurma = [];

    
    if($scope.edicao){
        if($scope.edicao.Etapas){
            angular.forEach($scope.edicao.Etapas, function (objeto, index) {
                if(objeto.Link=='transito'){
                    self.idEtapa1 = objeto.Id;
                    //console.log('achou a etapa 1' + self.idEtapa1);
                }
            });
        }
    }
//    $scope.edicao.Etapas[0].Id

    self.resetVariaveis = function(){
        self.intPagina = 1;
        self.totalEnviosFiltrado = 0;
        self.cacheListaEnvios = [];

        self.filtroEstados = [];
        self.filtroEscola = [];
        self.filtroTurma = [];

        self.estadoSelecionado="";
        self.escolaSelecionada=0;
        self.turmaSelecionada=0;

        self.turmasInscritas = [];
    };

    $scope.$on("changeListMap", function (event, obj) {        
        
        var selectedMarkers = obj.selectedMarkers;
        var mapSelection = obj.mapSelection;
        var abaResultado = obj.abaResultado;
        var aListaInscricoes = obj.listaInscricoes;

        var bolBuscaResultado = false;

        if (abaResultado == 1) {
            //console.log(aListaInscricoes);
            if (aListaInscricoes) {
                var strLista = aListaInscricoes.toString();
                
                //console.log('strLista: ' + strLista);
                if (strLista != '') {
                    self.bolGaleria = true;
                    self.cacheInscricoes = strLista;
                    self.resetVariaveis();

                    self.buscarGaleriaResultado(strLista);
                }
                else{
                    self.bolGaleria = false;
                    self.cacheInscricoes = '';
                }
            }
            else{
                self.bolGaleria = false;
                self.cacheInscricoes = '';
            }
             
        }
        else {
            self.bolGaleria = false;
            self.cacheInscricoes = '';
        }
    });    

    self.aplicarFiltros = function(intCombo){
        if(intCombo==0){            
            self.escolaSelecionada=0;
            self.turmaSelecionada=0;
        }

        if(intCombo==1){ self.turmaSelecionada=0; }
        
        self.intPagina = 1;
        self.totalEnviosFiltrado = 0;
        self.cacheListaEnvios = [];

        self.buscarGaleriaResultado(self.cacheInscricoes);
    };

    self.carregarMais = function(){
        self.intPagina++;

        self.buscarGaleriaResultado(self.cacheInscricoes);
    };

    self.buscarGaleriaResultado = function (listaInscricao) {                

        if(!self.loadingBuscarGeral){
            self.loadingBuscarGeral = true;            

            $http.post('/AVA/Projetos/Servico/GetResultadoEnvioByListaInscricao',
            {
                idProjeto: $scope.edicao.Projeto.Id,
                idProjetoEdicao: $scope.edicao.Id,
                idProjetoEdicaoEtapa: self.idEtapa1,
                idSituacao: 1,                
                listaIdProjetoInscricao: listaInscricao,
                idUsuario: 0,
                idEscola: self.escolaSelecionada,
                idTurma: self.turmaSelecionada,
                strUF: self.estadoSelecionado,
                tipoOrdenacao: 0,
                intPagina: self.intPagina,
                intRegPorPagina: self.intRegPorPagina,
                intDestaque: 0
            }).success(function (data) {
                //console.log('===GetResultadoEnvioByListaInscricao===');
                //console.log(data);

//                $scope.bolCarregouDados = true; 
                //Carregou dados primeira vez!
                if(self.cacheListaEnvios.length==0){
                    self.cacheListaEnvios = data.listParticipanteEnvio;
                }
                else{
                    angular.forEach(data.listParticipanteEnvio, function(obj,idx){
                        self.cacheListaEnvios.push(obj);    
                    });
                }

                if(self.turmasInscritas.length==0){
                    self.turmasInscritas = data.listaTurma;
                    self.filtroTurma = self.turmasInscritas;                
                    angular.forEach(self.turmasInscritas,function(obj,idx){
                        var bolAdicionaUF = true;
                        var bolAdicionaEscola = true;

                        if(self.filtroEstados.length==0){
                            self.filtroEstados.push(obj.strUF);
                        }
                        else{
                            for(var i=0; i < self.filtroEstados.length; i++){
                                if(self.filtroEstados[i]==obj.strUF){
                                    bolAdicionaUF=false;
                                }
                            }

                            if(bolAdicionaUF){
                                self.filtroEstados.push(obj.strUF);
                            }
                        }

                        if(self.filtroEscola.length==0){
                            self.filtroEscola.push({"idEscola": obj.idEscola,"uf": obj.strUF, "strNome": obj.strNomeEscola });
                        }
                        else{
                            for(var j=0; j < self.filtroEscola.length; j++){
                                if(self.filtroEscola[j].idEscola==obj.idEscola){
                                    bolAdicionaEscola=false;
                                }
                            }

                            if(bolAdicionaEscola){
                                self.filtroEscola.push({"idEscola": obj.idEscola,"uf": obj.strUF, "strNome": obj.strNomeEscola });
                            }
                        }

                    });
                }

                //valor base para o total de envios
                if(data.TotalEnvios){
                    //$scope.objEnviosInscricao.TotalEnvios = data.TotalEnvios;
                    self.totalEnviosFiltrado = parseInt(data.TotalEnvios);
                }

                if(data.listParticipanteEnvio.length<self.intRegPorPagina || self.cacheListaEnvios>=self.totalEnviosFiltrado){
                    self.bolPodeBuscarMais = false;
                }
                else{
                    self.bolPodeBuscarMais = true;
                }
                                
            }).error(function (err) {
                console.log("Não foi possível buscar detalhe da Etapa");
            }).finally(function(){
                self.loadingBuscarGeral = false;
            });
        }
    };

    self.getLinkEtapa = function (Envio) {
        var retorno = "";
        var Edicao = $scope.edicao;

        if (Edicao) if (Edicao.TipoProjeto) if (!isNaN(Edicao.TipoProjeto)) if (parseInt(Edicao.TipoProjeto)>0) if(Edicao.Id) if (!isNaN(Edicao.Id)) if (parseInt(Edicao.TipoProjeto)>0 && parseInt(Edicao.Id)>0) {
            switch (parseInt(Edicao.TipoProjeto)) {
                case 1:
                    //projeto
                    retorno = "/AVA/Projetos/" +  new Date(parseInt(Envio.DataCriacao.substr(6), 10)).getFullYear() + "/" + Edicao.Link + "/Etapas/" + Envio.Etapa.Link + "/";
                    break;
                case 2:
                    //clube
                    retorno = "/AVA/Projetos/Clube/" + Edicao.Projeto.Link + "/Desafios/" + Envio.Etapa.Link + "/";
                    break;
            }
            
            if(Envio.MensagemRapida) if(Envio.MensagemRapida.StrEncryptIdMensagem) if(Envio.MensagemRapida.StrEncryptIdMensagem!=""){
                retorno +=  Envio.MensagemRapida.StrEncryptIdMensagem;
            }
        }

        return retorno;
    };    

} ]);