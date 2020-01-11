"use strict"
angular.module('Etapa').directive('galeriaVotacaoJuriPopular', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Galeria/galeria-votacao-juri-popular.html',
        scope: {             
            enquete: "=objEnquete",
            objFiltro: "=objFiltro",
            idMensagemRapida: "=idMensagemRapida",
            usuarioCurtiu: "=usuarioCurtiu"
        },
        link: function (scope, el, attr) { },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', "projetoTools", function ($http, $scope, $timeout, $filter, $location, projetoTools) {
            var self = this;           

            //====Variáveis========================
            self.intPaginaAtual = 1;
            
            $scope.objEdicao = null;
            $scope.objEnviosInscricao = { TotalEnvios: 0, Envios: [] };
                        
            $scope.loadingBuscarGeral = false;

            self.galeriaFiltro = {
                Id : 0,
                IdProjetoEnquete: 0,
                BolFCategoria: true,
                BolFEstado: true,
                BolFEscola: true,
                BolAbaCategoria: false
            };

            self.bolVotacaoAberta = false;
            self.bolVotacaoEncerrada = false;            
            self.bolTemEnquete = false;

            self.filtroOriginal = {};
            
            self.filtroCategorias = [];
            self.filtroEstados = [];
            self.filtroEscolas = [];

            self.filtroCamposFull = { combo: [], texto: [] };
            self.filtroCampos = [];
            self.filtroPalavraChave = [];

            self.idEnquete = 0;

            self.comboOpcaoOpt = 0;
            
            self.mTipoOrdenacao = 1;
            self.mCategoria = "";
            self.mEstado = "";
            self.mEscola = "";
            self.mPalavraPesquisa = "";

            self.mCampos = [];
            //============================================================                        

            if ($scope.enquete) {
                self.bolVotacaoAberta = $scope.enquete.BolVotacaoAberta;
                self.bolVotacaoEncerrada = $scope.enquete.BolVotacaoEncerrada;
                                
                self.idEnquete = $scope.enquete.EtapaEnqueteJuri.Id;

                if ($scope.enquete.EtapaEnqueteJuri.Id > 0) { self.bolTemEnquete = true; }

                if($scope.enquete.EtapaMaterialBaseVotacao){
                    if($scope.enquete.EtapaMaterialBaseVotacao.Edicao){
                        $scope.objEdicao = $scope.enquete.EtapaMaterialBaseVotacao.Edicao;
                    }                    
                }

                //console.log($scope.enquete.GaleriaEnqueteFiltro);
                if($scope.enquete.GaleriaEnqueteFiltro){
                    if($scope.enquete.GaleriaEnqueteFiltro.Id>0){
                        self.galeriaFiltro = $scope.enquete.GaleriaEnqueteFiltro;
                    }                    
                }

                if(self.bolVotacaoEncerrada){
                    self.mTipoOrdenacao = 2;
                }

            }
            
            if ($scope.objFiltro) {
                if (typeof ($scope.objFiltro) == "string") {                    
                    self.filtroOriginal = angular.fromJson($scope.objFiltro);                    
                }
                else {
                    self.filtroOriginal = $scope.objFiltro;
                }
            }
            else {
                self.filtroOriginal = {};
            }

            if(self.filtroOriginal.filtroCategoria){
                if (self.filtroOriginal.filtroCategoria instanceof Array) if (self.filtroOriginal.filtroCategoria.length > 0) {                    
                    if(self.galeriaFiltro.BolAbaCategoria){
                        self.filtroCategorias = $filter('orderBy')(self.filtroOriginal.filtroCategoria, 'strProjetoCategoria');
                        self.mCategoria = self.filtroCategorias[0];
                    }
                    else{
                        self.filtroCategorias = self.filtroOriginal.filtroCategoria;
                    }
                }
            }

            if(self.filtroOriginal.filtroEstado){
                if (self.filtroOriginal.filtroEstado instanceof Array) if (self.filtroOriginal.filtroEstado.length > 0) {
                    self.filtroEstados = self.filtroOriginal.filtroEstado;
                }
            }

            if(self.filtroOriginal.filtroEscola){
                if (self.filtroOriginal.filtroEscola instanceof Array) if (self.filtroOriginal.filtroEscola.length > 0) {
                    self.filtroEscolas = self.filtroOriginal.filtroEscola;
                }
            }

            if(self.filtroOriginal.filtroCampos){
                if (self.filtroOriginal.filtroCampos instanceof Array) if (self.filtroOriginal.filtroCampos.length > 0) {
                    angular.forEach(self.filtroOriginal.filtroCampos, function (valor, chave) {
                        
                        if(valor.filtroTipo==1){
                            self.filtroCampos.push(valor);
                        }
                        else{
                            if(valor.filtroTipo==3){
                                self.filtroPalavraChave.push(valor);
                            }
                        }
                        
                    });
                }
                
            }

            if(self.filtroCampos.length>0){
                angular.copy(self.filtroCampos, self.mCampos);
                angular.copy(self.filtroCampos, self.filtroCamposFull.combo);

                angular.forEach(self.mCampos, function (valor, chave) { valor["idSelecionado"] = ""; });
            }            

            self.MudaCategoria = function(cat){
                //console.log(cat);
                if ((self.mCategoria=="") || (cat.idProjetoCategoria!=self.mCategoria.idProjetoCategoria)){
                    self.mCategoria = cat;
                    self.aplicarFiltro(1, -1);
                }
            };


            self.aplicarFiltro = function(intLevel, indiceCampo){
                var aEnvios = [];                             
                
                switch(intLevel) {
                    case 1:
                        //Categoria                        
                        if(self.mCategoria){ aEnvios = self.mCategoria.envios; }else{ aEnvios = []; }                        
                        break;
                    case 2:
                        //Estado                        
                        if(self.mEstado){ aEnvios=self.mEstado.envios; }else{ aEnvios=[]; }
                        break;
                    case 3:
                        //Escola                        
                        if(self.mEscola){ aEnvios=self.mEscola.envios; } else{ aEnvios=[]; }
                        break;
                    case 4:
                        //Palavra-chave
                        break;
                    default:
                        if(intLevel>=5){
//                            console.log('self.mCampos');
                            //console.log(self.mCampos[indiceCampo].idSelecionado);
                            if(self.mCampos[indiceCampo].idSelecionado){ 
                                aEnvios=self.mCampos[indiceCampo].idSelecionado.envios;
                            }
                            else{ 
                                aEnvios=[]; 
                            }
                        }
                }
                
                var valorAnterior;

                if(aEnvios.length>0){                    
                    
                    if(intLevel!=1){
                        if(!self.galeriaFiltro.BolAbaCategoria){
                            valorAnterior = null;
                            if(self.mCategoria){  valorAnterior = self.mCategoria; }
                                                
                            self.filtroCategorias = [];
                            angular.forEach(self.filtroOriginal.filtroCategoria, function (valor, chave) {                            
                                var bolAdicionou = false;

                                for(var i=0; i<aEnvios.length; i++){
                                    if(!bolAdicionou){
                                        if(valor.envios.indexOf(aEnvios[i])!=-1){
                                            self.filtroCategorias.push(valor);                                                                                
                                            bolAdicionou = true;
                                        }
                                    }
                                }
                            });

                            self.mCategoria = "";
                            if(valorAnterior && valorAnterior!=""){
                                angular.forEach(self.filtroCategorias, function (valor, chave) {                                
                                    if(valor.idProjetoCategoria==valorAnterior.idProjetoCategoria){
                                        self.mCategoria = valorAnterior;
                                    }                                
                                });    
                            }
                        }
                    }

                    if(intLevel!=2){
                        
                        valorAnterior = null;
                        if(self.mEstado){  valorAnterior = self.mEstado; }
                                                
                        self.filtroEstados = [];
                        angular.forEach(self.filtroOriginal.filtroEstado, function (valor, chave) {                            
                            var bolAdicionou = false;

                            for(var i=0; i<aEnvios.length; i++){
                                if(!bolAdicionou){
                                    if(valor.envios.indexOf(aEnvios[i])!=-1){
                                        self.filtroEstados.push(valor);                                                                                
                                        bolAdicionou = true;
                                    }
                                }
                            }
                        });

                        self.mEstado = "";
                        if(valorAnterior && valorAnterior!=""){
                            angular.forEach(self.filtroEstados, function (valor, chave) {                                
                                if(valor.strUF==valorAnterior.strUF){
                                    self.mEstado = valorAnterior;
                                }                                
                            });    
                        }                        
                    }

                    if(intLevel!=3){
                        
                        valorAnterior = null;
                        if(self.mEscola){  valorAnterior = self.mEscola; }
                                                
                        self.filtroEscolas = [];
                        angular.forEach(self.filtroOriginal.filtroEscola, function (valor, chave) {                            
                            var bolAdicionou = false;

                            for(var i=0; i<aEnvios.length; i++){
                                if(!bolAdicionou){
                                    if(valor.envios.indexOf(aEnvios[i])!=-1){
                                        self.filtroEscolas.push(valor);                                                                                
                                        bolAdicionou = true;
                                    }
                                }
                            }
                        });

                        self.mEscola = "";
                        if(valorAnterior && valorAnterior!=""){
                            angular.forEach(self.filtroEscolas, function (valor, chave) {                                
                                if(valor.idEscola==valorAnterior.idEscola){
                                    self.mEscola = valorAnterior;
                                }                                
                            });    
                        }                        
                    }

                    if(intLevel<5 || (intLevel>=5 && self.filtroCampos.length>1) ){
                        
                        for(var j=0; j<self.filtroCampos.length; j++){
                            if(j!=indiceCampo){
                                valorAnterior = null;
                                if(self.mCampos[j].idSelecionado){  
                                    valorAnterior = self.mCampos[j].idSelecionado; 
                                }

                                self.filtroCampos[j].opcoes = [];
                                angular.forEach(self.filtroCamposFull.combo[j].opcoes, function (valor, chave) {
                                    var bolAdicionou = false;

                                    for(var k=0; k<aEnvios.length; k++){
                                        if(!bolAdicionou){
                                            if(valor.intOrdem==0){
                                                //optgroup
                                                self.filtroCampos[j].opcoes.push(valor);
                                                bolAdicionou = true;
                                            }
                                            else{
                                                if(valor.envios.length>0 && valor.envios.indexOf(aEnvios[k])!=-1){
                                                    self.filtroCampos[j].opcoes.push(valor);                                                                                
                                                    bolAdicionou = true;
                                                }
                                            }
                                        }
                                    }
                                });

                                self.mCampos[j].idSelecionado = "";
                                if(valorAnterior && valorAnterior!=""){
                                    angular.forEach(self.filtroCampos[j].opcoes, function (valor, chave) {                                
                                        if(valor.idFormularioCampoOpcao==valorAnterior.idFormularioCampoOpcao){
                                            self.mCampos[j].idSelecionado = valorAnterior;
                                        }                                
                                    });    
                                }

                            }
                        }
                        
                    }


                }
                else{

                    var bolRepopulaCombos = true;                    

                    for(var m=0; m<self.filtroCampos.length; m++){
                        if(self.mCampos[m].idSelecionado){
                            bolRepopulaCombos = false;
                        }
                    }

                    if(self.galeriaFiltro.BolAbaCategoria){
                        bolRepopulaCombos = (
                            bolRepopulaCombos                         
                            && (!self.mEstado || self.mEstado=="")
                            && (!self.mEscola || self.mEscola=="")
                        );
                    }
                    else{
                        bolRepopulaCombos = (
                            bolRepopulaCombos 
                            && (!self.mCategoria || self.mCategoria=="")
                            && (!self.mEstado || self.mEstado=="")
                            && (!self.mEscola || self.mEscola=="")
                        );
                    }

                    if(bolRepopulaCombos){  
                        
                        //console.log('Resetou opções combo');

                        //Repopula combo categoria
                        if(!self.galeriaFiltro.BolAbaCategoria){
                            self.filtroCategorias = self.filtroOriginal.filtroCategoria;
                            self.mCategoria = "";
                        }
                        
                        //Repopula combo estado                        
                        self.filtroEstados = self.filtroOriginal.filtroEstado;
                        self.mEstado = "";
                        
                        //Repopula combo Escola                        
                        self.filtroEscolas = self.filtroOriginal.filtroEscola;
                        self.mEscola = "";
                        
                        //Campos form
                        for(var n=0; n<self.filtroCampos.length; n++){
                            self.filtroCampos[n].opcoes = self.filtroCamposFull.combo[n].opcoes;
                        }
                        
                    }                                      
                    
                }

                self.intPaginaAtual = 1;
                self.getResultadoFiltro(true);                
            };

            self.filtrarPalavraChave = function(){ 
                var strPalavra = "";
                
                if(self.mPalavraPesquisa){
                    strPalavra = self.mPalavraPesquisa;
                }
                
                               
                if(strPalavra=="" || strPalavra.length>=2){
                    self.intPaginaAtual = 1;
                    self.getResultadoFiltro(true);
                }
                else{
                    alert("A palavra precisar ter no mínimo duas letras!");
                }
            };

            self.mudarOrdenacao = function(){
                self.intPaginaAtual = 1;
                self.getResultadoFiltro(true);                
            };

            self.getParametros = function(){
                
                //var intRegPagina = 3;
                var intRegPagina = 12;

                var param = {
                    idProjetoEnQuete: self.idEnquete,
                    idProjetoCategoria: 0,
	                idEscola: 0,
	                strUF: "",	
	                intPagina: self.intPaginaAtual,
                    intRegPorPagina: intRegPagina,	                
	                tipoOrdenacao: self.mTipoOrdenacao,
	                strPalavraPesquisa: "",
	                strXmlCampos: ""
                };

                if(self.mPalavraPesquisa && self.mPalavraPesquisa!=""){
                    param.strPalavraPesquisa = self.mPalavraPesquisa;
                }
                else{
                    param.strPalavraPesquisa = "";
                }

                if(self.mCategoria && self.mCategoria!=""){                    
                    param.idProjetoCategoria = self.mCategoria.idProjetoCategoria;
                }

                if(self.mEstado && self.mEstado!=""){                                        
                    param.strUF = self.mEstado.strUF;
                }

                if(self.mEscola && self.mEscola!=""){                    
                    param.idEscola = self.mEscola.idEscola;
                }                

//                if(self.mTipoOrdenacao && (self.mTipoOrdenacao=='2' || self.mTipoOrdenacao=='1')){
//                    var tipoOrdenacao = parseInt(self.mTipoOrdenacao);

//                    param.tipoOrdenacao = tipoOrdenacao;
//                }
//                else{
//                    param.tipoOrdenacao = 2;
//                }


                //formato xml
                // '<Root><c1362>789</c1362><c1352>147</c1352><c1322>963</c1322></Root>'

                var xmlString = "<Root></Root>";
                var parser = new DOMParser();                
                var xmlDoc = parser.parseFromString(xmlString, "text/xml");                              
                var elements = xmlDoc.getElementsByTagName("Root");
                
                for(var i=0; i<self.filtroCampos.length; i++){
                    if(self.mCampos[i].idSelecionado && self.mCampos[i].idSelecionado!=""){
                        var node = xmlDoc.createElement("c" + self.mCampos[i].idSelecionado.idFormularioCampo);
                        var newText = xmlDoc.createTextNode("" + self.mCampos[i].idSelecionado.idFormularioCampoOpcao);

                        node.appendChild(newText);
                        elements[0].appendChild(node)

                        //console.log('===self.mCampos[i].idSelecionado===');
                        //console.log(self.mCampos[i].idSelecionado);                        
                    }
                }
                var serializer = new XMLSerializer();
                xmlString = serializer.serializeToString(xmlDoc);
                
                param.strXmlCampos = xmlString;     
                
                //console.log('===param===');
                //console.log(param);

                return param;
            };

            self.getResultadoFiltro = function(bolLimpa){                

                $scope.loadingBuscarGeral = true;
                var path = "/AVA/Projetos/Servico/GetEnviosGaleriaVotacaoPaginado/";                

                var parametros = self.getParametros();
                //console.log(parametros);

                if (bolLimpa){                    
                    $scope.objEnviosInscricao.TotalEnvios = 0;
                    $scope.objEnviosInscricao.Envios = new Array();                    
                }

                $http({
                    url: path,
                    method: "POST",
                    params: parametros
                }).success(function (data) {

                    //console.log('===data===');
                    //console.log(data);

                    if (data) if (data instanceof Object) {
                        
                        if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {                            
                            $scope.objEnviosInscricao.TotalEnvios = parseInt(data.TotalEnvios);
                            //console.log(data.TotalEnvios);                            
                        }

                        if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                            if($scope.objEnviosInscricao.Envios.length==0){
                                $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                            }
                            else{
                                angular.forEach(data.listParticipanteEnvio, function (valor, chave) {
                                    $scope.objEnviosInscricao.Envios.push(valor);
                                });
                            }  
                        }                              

                    }                    
                }).error(function (err) {
                    console.log("Não foi possível buscar materiais da etapa");
                }).finally(function(){
                    $scope.loadingBuscarGeral = false;
                });
            };  

            self.opcoesOptGroup = function (oOpcoes) {

                var aOpcoesRetorno = [];
                var aCategoria = [];
                var valAux;

                //console.log('chamou');
                if (oOpcoes && oOpcoes instanceof Array) {
                    for (var k = 0; k < oOpcoes.length; k++) {
                        valAux = oOpcoes[k];

                        if (valAux.intOrdem == 0) {
                            aCategoria.push(valAux);
                        }
                        else {
                            valAux["strGrupo"] = "";
                            aOpcoesRetorno.push(valAux);
                        }
                    }

                    for (var i = 0; i < aOpcoesRetorno.length; i++) {
                        for (var j = 0; j < aCategoria.length; j++) {
                            if (aOpcoesRetorno[i].intOrdem == aCategoria[j].idFormularioCampoOpcao) {
                                aOpcoesRetorno[i].strGrupo = aCategoria[j].strOpcao;
                            }
                        }
                    }
                }

                //console.log(aOpcoesRetorno);
                return aOpcoesRetorno;
            };

            self.getInfoAuxHtml = function(pstrInfo, pStrTitulo){
                var strHtml = "";
                var oInfo = {};

                //<h3 ng-if="(Envio.Titulo != null && Envio.Titulo!='')">{{ Envio.Titulo }}</h3>
                if(pStrTitulo!=null && pStrTitulo!=""){
                    strHtml = '<h3>'+ pStrTitulo +'</h3>';
                }

                if(pstrInfo){                    
                    if (typeof (pstrInfo) == "string") {
                        if(pstrInfo!=""){                            
                            try {
                                oInfo = angular.fromJson(pstrInfo);

                                if(oInfo.strHtml!=''){
                                    strHtml = strHtml + oInfo.strHtml;
                                }
                            }
                            catch(err) {}
                        
                            //console.log(oInfo);
                        }
                    }
                }
                return strHtml;
            };

            self.getClassArea = function(pstrInfo){
                var strClasse="";
                var oInfo = {};

                if(pstrInfo){                    
                    if (typeof (pstrInfo) == "string") {
                        if(pstrInfo!=""){                            
                            try {
                                oInfo = angular.fromJson(pstrInfo);

                                if(oInfo.strClasse!=''){
                                    strClasse = 'area-' + self.str2slug(oInfo.strClasse);
                                }
                            }
                            catch(err) {}                                                   
                        }
                    }
                }
                return strClasse;
            };

            self.str2slug = function(str) {
                var rep = '_';
                
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

            $scope.getLinkEtapa = function (Edicao, Envio) {
                var retorno = "";

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

            self.carregarMais = function() {
                if(!$scope.loadingBuscarGeral){
                    self.intPaginaAtual = self.intPaginaAtual+1;                    
                    
                    self.getResultadoFiltro(false);
                }                
            };         

            self.getResultadoFiltro(true);
                           
        } ],
        controllerAs: 'galeriaVJPopCtrl'
    };
});
