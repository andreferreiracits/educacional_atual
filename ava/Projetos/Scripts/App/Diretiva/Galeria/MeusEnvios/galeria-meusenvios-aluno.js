"use strict"
angular.module('galeria').directive('galeriaMeusenviosal', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Galeria/MeusEnvios/galeria-meusenvios-aluno.html',
        scope: { 
            listaAnos : "=listaAnos",
            objEtapa: "=objEtapa",
            objEdicao: "=objEdicao",               
            objEscola: "=objEscola",
            objPerfil: "=objPerfil",            
            idUsuario: "@idUsuario",
            defaultConfig: "=defaultConfig",
            maxRegistroPagina: "@maxRegistroPagina",
            simplesmenteDestaques: "@simplesmenteDestaques"
        },
        link: function (scope, el, attr) { },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', function ($http, $scope, $timeout, $filter, $location) {            
            var self = this;

            $scope.convCatToClas = function (nomeCategoria) {

                nomeCategoria = nomeCategoria.toLowerCase();
                nomeCategoria = nomeCategoria.replace(/ç/g, 'c');
                nomeCategoria = nomeCategoria.replace(/ã|á|à|â|ä|â/g, 'a');
                nomeCategoria = nomeCategoria.replace(/é|ê|è|ë/g, 'e')
                nomeCategoria = nomeCategoria.replace(/í|ì|î|ï/g, 'i');
                nomeCategoria = nomeCategoria.replace(/õ|ô|ó|ò|ö/g, 'o');
                nomeCategoria = nomeCategoria.replace(/û|ú|ù|ü/g, 'u');
                nomeCategoria = nomeCategoria.replace(/[^\w\s]/gi, '');
                nomeCategoria = nomeCategoria.replace(/\s+/g, "-");
                return nomeCategoria;

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

            //====Variáveis========================
            $scope.nuncaExistiramMateriais=true;
            $scope.filtrostatus = 0;
            $scope.filtroetapa = 0;
            $scope.filtroturma = 0;  
            $scope.filtroano = 0;                    

            $scope.intPaginaAtual = 1;
            
            $scope.alunos = [];
            $scope.objEnviosInscricao = { TotalEnvios: 0, Envios: [] };            

            $scope.paramsMateriais = {
                idProjeto: $scope.objEdicao.Projeto.Id,
                idProjetoEdicaoEtapa: 0,
                idUsuario: parseInt($scope.idUsuario),
                idEscola: $scope.objEscola.Id,
                idTurma : 0,
                idSituacao: 0,
                intPagina: 1,
                intRegPorPagina: parseInt($scope.maxRegistroPagina),
                simplesmenteDestaques: parseInt($scope.simplesmenteDestaques),
                total: 0
            };
                        
            $scope.loadingBuscarGeral = false;
            $scope.bolFimMateriais = false;            
            //============================================================
           

           $scope.getLinkEtapa = function (Edicao, Envio) {
                var retorno = "";

                //console.log(Envio);

                if (Edicao) if (Edicao.TipoProjeto) if (!isNaN(Edicao.TipoProjeto)) if (parseInt(Edicao.TipoProjeto)>0) if(Edicao.Id) if (!isNaN(Edicao.Id)) if (parseInt(Edicao.TipoProjeto)>0 && parseInt(Edicao.Id)>0) {
                    
                    retorno = "/AVA/Projetos/Clube/" + Edicao.Projeto.Link + "/Desafios/" + Envio.Etapa.Link + "/";                    
                    
                    if((Envio.SituacaoEnvio.Id==3 || Envio.SituacaoEnvio.Id==4) && Envio.Inscricao.InscricaoTipo.Id==5) {
                        retorno +=  'Formulario';
                    }
                    else{
                        if(Envio.SituacaoEnvio.Id==2){
                            retorno = '';
                        }
                        else{
                            if(Envio.MensagemRapida) if(Envio.MensagemRapida.StrEncryptIdMensagem) if(Envio.MensagemRapida.StrEncryptIdMensagem!="") if(Envio.SituacaoEnvio.Id==1){
                                retorno +=  Envio.MensagemRapida.StrEncryptIdMensagem;
                            }
                        }
                    }
                    
                }
                return retorno;
            };           

            self.etapaAberta = function(et){
                var bolEtapaAberta = true;
                var datInicio = et.DataInicio;
                //console.log('datainicio: ' + new Date(parseInt($scope.objEtapa[0].DataInicio.replace(/\D+/g, ""))));
                //var intDiferenca = new Date()-new Date(arrayData[0]);

                try{                                        
                    var intDiferenca = new Date()-new Date(parseInt(datInicio.replace(/\D+/g, "")));

                    if(intDiferenca<0){
                        bolEtapaAberta = false;
                    }

                }
                catch(err){};

                //alert(et.Nome + ' - ' + bolEtapaAberta);

                return bolEtapaAberta;
            };

            self.filtraStatus = function(idStatus){
                if($scope.filtrostatus != idStatus && !$scope.loadingBuscarGeral){ 
                    $scope.intPaginaAtual = 1; 
                    $scope.filtrostatus = idStatus;

                    self.aplicarFiltros();
                }                                
            };     

             self.filtraComboBox = function(){                
                $scope.intPaginaAtual = 1;                

                self.aplicarFiltros();                
            };    

            self.aplicarFiltros = function () {
                $scope.paramsMateriais.idProjetoEdicaoEtapa = $scope.filtroetapa;
                //$scope.paramsMateriais.idTurma = $scope.filtroturma;
                
                //$scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                if($scope.listaAnos){
                    //console.log($scope.objEdicao.Ano);
                    if($scope.listaAnos.length > 1){
                        if($scope.filtroano < $scope.objEdicao.Ano || $scope.objEdicao.BolEncerrado){
                            $scope.filtrostatus = 1;
                            $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                        }
                        else{
                            $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                        }
                    }
                    else{                        
                        if(self.verificaEnvioFechado()){
                            $scope.filtrostatus = 1;
                            $scope.paramsMateriais.idSituacao = $scope.filtrostatus;                        
                        }
                        else{
                            $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                        }
                    }

                }
                else{
                    if(self.verificaEnvioFechado()){
                        $scope.filtrostatus = 1;
                        $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                    }
                    else{
                        $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                    }
                }
                
                $scope.paramsMateriais.intPagina = $scope.intPaginaAtual;
                
                $scope.objEnviosInscricao.Envios = [];
                $scope.objEnviosInscricao.TotalEnvios = 0;
                                
                self.getResultadoFiltro(true);  
                                
            };

             self.carregarMais = function() {
                if(!$scope.loadingBuscarGeral){
                    $scope.intPaginaAtual = $scope.intPaginaAtual+1;

                    $scope.paramsMateriais.idProjetoEdicaoEtapa = $scope.filtroetapa;
                    //$scope.paramsMateriais.idTurma = $scope.filtroturma;
                    $scope.paramsMateriais.idSituacao = $scope.filtrostatus;
                    $scope.paramsMateriais.intPagina = $scope.intPaginaAtual;                    
                    
                    self.getResultadoFiltro(false);
                }                
            };

             self.getResultadoFiltro = function(bolLimpa){
                
                $scope.loadingBuscarGeral = true;

                var intAnoAux = 0;
                if($scope.filtroano != null){
                    if($scope.filtroano==0){
                        if($scope.listaAnos){
                            if($scope.listaAnos instanceof Array){
                                if($scope.listaAnos.length == 1){
                                    intAnoAux = $scope.listaAnos[0];
                                }
                            }
                        }
                    }
                    else{
                        intAnoAux = $scope.filtroano;                
                    }
                }
                else{
                    if($scope.listaAnos){
                        if($scope.listaAnos instanceof Array){
                            if($scope.listaAnos.length == 1){
                                intAnoAux = $scope.listaAnos[0];
                            }
                        }
                    }
                }
                
                //var path = "/AVA/Projetos/Servico/GetMeusEnviosPaginado/";
                var path = "/AVA/Projetos/Servico/GetMeusEnviosPaginadoAndPreAprov/";
                
//                var parametros = {
//                    idProjeto: $scope.paramsMateriais.idProjeto,
//                    idProjetoEdicao: 0,
//                    idProjetoEdicaoEtapa: $scope.paramsMateriais.idProjetoEdicaoEtapa,
//                    idSituacao: $scope.paramsMateriais.idSituacao,
//                    idTurma : 0,
//                    tipoOrdenacao : 2,
//                    intPagina: $scope.paramsMateriais.intPagina,
//                    intRegPorPagina:$scope.paramsMateriais.intRegPorPagina,
//                    intAno : $scope.filtroano
//                };

                 var parametros = {
                    idProjeto: $scope.paramsMateriais.idProjeto,
                    idProjetoEdicao: 0,
                    idProjetoEdicaoEtapa: $scope.paramsMateriais.idProjetoEdicaoEtapa,
                    idSituacao: $scope.paramsMateriais.idSituacao,
                    idTurma : 0,
                    tipoOrdenacao : 2,
                    intPagina: $scope.paramsMateriais.intPagina,
                    intRegPorPagina:$scope.paramsMateriais.intRegPorPagina,
                    intAno : intAnoAux
                };


                if (bolLimpa){                    
                    $scope.objEnviosInscricao.TotalEnvios = 0;
                    $scope.objEnviosInscricao.Envios = new Array();                    
                }

                $http({
                    url: path,
                    method: "POST",
                    params: parametros
                }).success(function (data) {

                    if (data) if (data instanceof Object) {
                        
                        if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {                            
                            $scope.objEnviosInscricao.TotalEnvios = parseInt(data.TotalEnvios);
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

                            for (var i = 0; i < $scope.objEnviosInscricao.Envios.length; i++) {
                                if ($scope.objEnviosInscricao.Envios[i].SituacaoEnvio.Descricao.toLowerCase() === 'pré-aprovado' || $scope.objEnviosInscricao.Envios[i].SituacaoEnvio.Descricao.toLowerCase() === 'aguardando publicação') {
                                    $scope.objEnviosInscricao.Envios[i].SituacaoEnvio.Descricao = 'Em Moderação';
                                }
                            }

                            if (data.listParticipanteEnvio.length < $scope.maxRegistroPagina){
                                $scope.bolFimMateriais = true;
                            }
                            else{
                                $scope.bolFimMateriais = false;
                            }                            
                        }
                        else{
                            $scope.bolFimMateriais = true;
                        }
                        
                    }                    

                }).error(function (err) {
                    console.log("Não foi possível buscar materiais da etapa");
                }).finally(function(){
                    $scope.loadingBuscarGeral = false;
                });

            }; 

             
            this.verificaEnvioFechado = function(){
                var retorno = false;
                
                if($scope.listaAnos){
                    if($scope.listaAnos instanceof Array){
                        
                        if($scope.listaAnos.length > 1 && $scope.filtroano){
                            if(parseInt($scope.filtroano) != parseInt($scope.listaAnos[$scope.listaAnos.length - 1])){
                                retorno = true;
                            }
                        }else if($scope.listaAnos.length == 1){
                            var anoAtual = new Date().getFullYear();
                            if(anoAtual > $scope.listaAnos[0]){
                                return true;
                            }
                        }else if($scope.listaAnos.length == 0){
                            return true;
                        }
                    } 
                    else{                        
                        return true;
                    }
                }
                else{                    
                    return true;
                }

                return retorno;
            };

            if($scope.objEdicao.BolEncerrado){
                $scope.paramsMateriais.idSituacao = 1;
            }

            if($scope.listaAnos) if($scope.listaAnos.length > 1){
                if($scope.listaAnos[$scope.listaAnos.length - 1] > 0){
                    $scope.filtroano = parseInt($scope.listaAnos[$scope.listaAnos.length - 1]);
                }
            }

            self.aplicarFiltros();    


        } ],
        controllerAs: 'galeriaMeusenviosalCtrl'
    };
});
