"use strict"
angular.module('resultado').directive('galeriaResultado', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Resultado/Comum/galeria-resultado.html',
        scope: {
            objEdicao: "=objEdicao",
            objEtapa: "=objEtapa",
            defaultConfig: "=defaultConfig",
            maxRegistroPagina: "@maxRegistroPagina",
            simplesmenteDestaques: "@simplesmenteDestaques",
            textFilter : "@textFilter",
            textEnvio : "@textEnvio" //Para colocar o numero total de envios na esquerda, ex: "123 brincadeiras de 4 turmas.."
        },
        link: function (scope, el, attr) {
        },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', function ($http, $scope, $timeout, $filter, $location) {
            var self = this;
            $scope.nuncaExistiramMateriais=true;
            $scope.Escolas = [];
            $scope.Estados = [];
            $scope.Turmas = [];
            $scope.CacheEscolas = [];
            $scope.CacheEstados = [];
            $scope.CacheTurmas = [];
            $scope.loadingBuscarGeral = false;
            $scope.totalTurmasEnvio = 0;
            $scope.totalEnviosFiltrado = 0;

            $scope.filteredEstados = [];
            $scope.filteredEscolas = [];
            $scope.filteredTurmas = [];
            $scope.cidadesInFiltro = [];
            $scope.bolCarregouDados = false;

            if(!$scope.textEnvio || $scope.textEnvio == null || $scope.textEnvio === undefined){
                $scope.textEnvio = 0;
            }

            var _arrUF = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
            var _arrUFSigla = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];

            this.EstadoSelecionado = undefined;
            this.EscolaSelecionada = undefined;
            this.TurmaSelecionada = undefined;

            try{
                var bolPossuiMax = false;
                if($scope.maxRegistroPagina){
                    if($scope.maxRegistroPagina > 0 ){
                        bolPossuiMax = true;
                    }
                }
                if(!bolPossuiMax){
                    $scope.maxRegistroPagina = 6;
                }
            }catch(err){}
            
            $scope.paramsMateriais =
            {
                idEtapaParam: 0,
                intPagina: 1,
                intRegPorPagina: parseInt($scope.maxRegistroPagina),
                simplesmenteDestaques: parseInt($scope.simplesmenteDestaques),
                total: 0
            };

            try {
                if ($scope.objEtapa) {
                    if ($scope.objEtapa.Id > 0) {
                        $scope.paramsMateriais.idEtapaParam = $scope.objEtapa.Id
                    }
                }
            } catch (err) {
                console.error("erro " + err.message);
            }
            
            $scope.objEnviosInscricao = {
                TotalEnvios: 0,
                Envios: []
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

            $scope.getLinkPerfil = function (idInscricaoTipo, idObjeto, linkUsuario) {
                var retorno = "";
                switch (parseInt(idInscricaoTipo)) {
                    case 1:
                        //1	Inscrição por turmas
                        retorno = "/AVA/turma/" + idObjeto;
                    case 2:
                        //2	Inscrição por equipes em uma turma
                        //Deve ir para o Minha(s) Equipe(s)
                        //retorno = "/AVA/Projetos/Perfil/Equipe/" + idObjeto???;
                        retorno = "/AVA/Perfil/Home/Index/" + linkUsuario;
                    case 3:
                        //3	Inscrição por equipes em uma escola 
                        //Deve ir para o Minha(s) Equipe(s)
                        //retorno = "/AVA/Projetos/Perfil/Equipe/" + idObjeto???;
                        retorno = "/AVA/Perfil/Home/Index/" + linkUsuario;
                    case 4:
                        //4	Inscrição por Escola - vai para o mural da escola/home do projeto?
                        retorno = "/AVA/Mural/";
                    case 5:
                        //5	Inscrição Individual
                        retorno = "/AVA/Perfil/Home/Index/" + idObjeto;
                        break;
                    default:
                        //erro
                        break;
                }
                return retorno;
            };
                        
            $scope.combo_order =  0;

            $scope.getPath=function(){
                if($location.path()){
                    return $location.path();
                }
                else{
                    return document.location.pathname;
                }
            };

            $scope.isHome=function(){
                var path =  $scope.getPath();
                if(path.substr(0,1)=="/"){
	                path=path.substr(1);
                }
                if(path.substr(path.length-1)=="/"){
	                path=path.substr(0,(path.length-1));
                }
                if(path.indexOf("/")!=-1) if(path.split("/").length==5){
                    return true;
                }
                return false;
            };

            this.buscarGaleriaOrdenado = function(){
                $scope.paramsMateriais.intPagina=1;
                self.aplicarFiltros(2);
            };
            
            this.getEstadoByUf = function (strUF) {
                if(_arrUFSigla.indexOf(strUF) > -1 ){
                    return _arrUF[_arrUFSigla.indexOf(strUF)];
                }else{
                    return strUF;
                }
            };

            this.getOrdenacao=function(){
                var retorno=0;
                if($scope.combo_order) if($scope.combo_order instanceof Object) if($scope.combo_order.Id) if(!isNaN($scope.combo_order.Id)){
                    retorno=parseInt($scope.combo_order.Id);
                }
                if($scope.combo_order) if(!isNaN($scope.combo_order)){
                    retorno=parseInt($scope.combo_order);
                }
                return retorno;
            }

            this.buscarGaleriaResultado = function (bolNaoMudaAba) {
                var idEstado = self.getEstadosFiltro();
                var strCidades = self.getCidadesFiltro();

                //self.resetAllFiltroGaleria();

                if(!$scope.loadingBuscarGeral){
                    $scope.loadingBuscarGeral = true;
                    $scope.paramsMateriais.intPagina = 1;

                    $http.post('/AVA/Projetos/Servico/GetResultadoEnvioPorIdProjetoEdicaoEtapaTipoProjeto',
                    {
                        idProjeto: $scope.objEdicao.Projeto.Id,
                        idEdicao: $scope.objEdicao.Id,
                        idEtapa: $scope.paramsMateriais.idEtapaParam,
                        tipoProjeto: $scope.objEdicao.TipoProjeto,
                        tipoOrdenacao: self.getOrdenacao(),
                        intPagina: $scope.paramsMateriais.intPagina,
                        intRegPorPagina: $scope.paramsMateriais.intRegPorPagina,
                        strUF : idEstado,
                        strCidades: strCidades,
                        intDestaque: $scope.paramsMateriais.simplesmenteDestaques
                    }).success(function (data) {
                        $scope.filteredEnvioPortal = [];
                        $scope.filteredEscolas = [];
                        $scope.filteredTurmas = [];
                        $scope.bolCarregouDados = true; //Carregou dados primeira vez!

                        var intPagina = $scope.paramsMateriais.intPagina;
                        var regPorPagina = $scope.paramsMateriais.intRegPorPagina;

                        //lista de escolas/estados para os filtros
                        if (data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0) {
                            $scope.CacheEscolas = data.listaEscolas;
                            for(var i =0; i < $scope.cidadesInFiltro.length; i++){
                                var _auxEscolas = $filter("where")($scope.CacheEscolas, { Cidade : $scope.cidadesInFiltro[i].Cidade },true);
                                if(_auxEscolas.length > 0){
                                    angular.forEach(_auxEscolas,function(obj,idx){
                                        $scope.filteredEscolas.push(obj);
                                    });
                                }
                            }
                        }

                        //lista de turmas para os filtros
                        if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {
                            $scope.CacheTurmas = data.listaTurmas;

                            if($scope.cidadesInFiltro.length > 0){
                                for(var i = 0; i < $scope.cidadesInFiltro.length; i++){
                                    //var _auxTurmas = $filter("where")(data.listaTurmas, { Escola : { Cidade : "Curitiba" } },true);
                                    var _auxTurmas = $filter("filter")(data.listaTurmas, { Escola : { Cidade : $scope.cidadesInFiltro[i].Cidade } },false);

                                    // $filter('filter')($scope.CacheTurmas, { Escola: { Id : idEscola} }, true);
                                    if(_auxTurmas.length > 0){
                                        //_escolas.push(_aux);
                                        angular.forEach(_auxTurmas,function(obj,idx){
                                            $scope.filteredTurmas.push(obj);
                                        }); 
                                        $scope.totalTurmasEnvio = $scope.filteredTurmas.length;
                                    }
                                }
                            }else{
                                self.updateFiltroByGeral();
                            }
                        }

                        //valor base para o total de envios
                        if(data.TotalEnvios){
                            $scope.objEnviosInscricao.TotalEnvios = data.TotalEnvios;
                            $scope.totalEnviosFiltrado = parseInt(data.TotalEnvios);
                        }
                        //popula os envios
                        if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                            $scope.nuncaExistiramMateriais=false;
                            $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                        }
                    }).error(function (err) {
                        console.log("Não foi possível buscar detalhe da Etapa");
                    }).finally(function(){
                        $scope.loadingBuscarGeral = false;
                    });
                }
            };
            

            this.getEstadosFiltro = function(){
                var strFiltro = "";
                //console.log("DENTRO DO FILTRO");
                //console.log(self.EstadoSelecionado);
                if (self.EstadoSelecionado){
                    if (self.EstadoSelecionado.Sigla) if (self.EstadoSelecionado.Sigla != "") {
                        strFiltro = self.EstadoSelecionado.Sigla;
                    }
                    //console.log(self.EstadoSelecionado);
                }else{
                    var _estados = $filter("unique")($scope.cidadesInFiltro, "Estado");
                    if(_estados.length > 0){
                        angular.forEach(_estados,function(obj,index){
                            if(strFiltro == ""){
                                strFiltro = obj.Sigla;
                            }else{
                                strFiltro += "," + obj.Sigla;
                            }
                        });
                    }
                }

                return strFiltro;
            };

            this.getCidadesFiltro = function(){
                var strFiltro = "";

                if($scope.cidadesInFiltro.length > 0){
                    var _cidades = $filter("unique")($scope.cidadesInFiltro, "Cidade");
                    if(_cidades.length > 0){
                        angular.forEach(_cidades,function(obj,index){
                            if(strFiltro == ""){
                                strFiltro = obj.Cidade;
                            }else{
                                strFiltro += "," + obj.Cidade;
                            }
                        });
                    }
                }

                return strFiltro;
            };

            this.aplicarFiltros = function(level){
                $scope.paramsMateriais.intPagina=1;

                var idEstado = '';
                var idEscola = 0;
                var idTurma = 0;
                var strUF = '';

                //console.log('filtrando');
                //console.log(self.EstadoSelecionado);
                if (self.EstadoSelecionado) if (self.EstadoSelecionado.Sigla) if (self.EstadoSelecionado.Sigla != "") {
                    idEstado = self.EstadoSelecionado.Sigla;
                }

                if (self.EscolaSelecionada) if (self.EscolaSelecionada.Id) if (!isNaN(self.EscolaSelecionada.Id)) if (parseInt(self.EscolaSelecionada.Id)>0){
                    idEscola = parseInt(self.EscolaSelecionada.Id);
                }

                if (self.TurmaSelecionada) if (self.TurmaSelecionada.Id) if (!isNaN(self.TurmaSelecionada.Id)) if (parseInt(self.TurmaSelecionada.Id)>0){
                    idTurma = parseInt(self.TurmaSelecionada.Id);
                }


                //aplica filtragens nas combos após a seleção
                switch (level) {
                    case 0:
                        //filtra as Escolas conforme o Estado selecionado
                        self.EscolaSelecionada = undefined;
                        self.TurmaSelecionada = undefined;
                        //$scope.filteredTurmas  = [];

                        //$scope.Turmas = [];
                        //if (idEstado.length == 2) {
                        //    //filtra as escolas conforme o estado selecionado
                        //
                        //    var escolas = $filter('filter')($scope.CacheEscolas, { Estado: idEstado }, true);
                        //    $scope.Escolas = angular.copy(escolas);
                        //}
                        //else {
                        //    $scope.Escolas = angular.copy($scope.CacheEscolas);
                        //}
                        break;
                    case 1:
                        //filtra as turmas conforme a escola selecionada
                        self.TurmaSelecionada = undefined;
                        $scope.filteredTurmas  = [];

                        if(idEscola > 0){
                            var _auxTurmas = $filter("filter")($scope.CacheTurmas, { Escola : { Id : idEscola } },true);
                            // $filter('filter')($scope.CacheTurmas, { Escola: { Id : idEscola} }, true);
                            if(_auxTurmas.length > 0){
                                //_escolas.push(_aux);
                                angular.forEach(_auxTurmas,function(obj,idx){
                                    $scope.filteredTurmas.push(obj);
                                }); 
                            }

                        }
                        //if (idEscola>0) {
                        //    //filtra as escolas conforme o estado selecionado
                        //    var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Id : idEscola} }, true);
                        //    $scope.Turmas = angular.copy(turmas);
                        //}
                        //else {
                        //    $scope.Turmas = [];
                        //}
                        break;
                }
                
                var idEscola = 0;
                var idTurma = 0;
                if (self.EscolaSelecionada) if (self.EscolaSelecionada.Id) if (!isNaN(self.EscolaSelecionada.Id)) if (parseInt(self.EscolaSelecionada.Id)>0){
                    idEscola = parseInt(self.EscolaSelecionada.Id);
                }

                if (self.TurmaSelecionada) if (self.TurmaSelecionada.Id) if (!isNaN(self.TurmaSelecionada.Id)) if (parseInt(self.TurmaSelecionada.Id)>0){
                    idTurma = parseInt(self.TurmaSelecionada.Id);
                }

                //Se não selecionou o combo, filtra pelas cidades no mapa!
                if(idEstado == "" || idEstado === undefined || idEstado == null){
                    idEstado = self.getEstadosFiltro();
                }
                
                self.requestEnvioPaginado(idEstado,idEscola,idTurma,0);
            };

            $scope.carregaProximaPagina = function(){
                var idEscola = 0;
                var idEstado = '';
                var idTurma = 0;
                var strUF = '';

                if (self.EstadoSelecionado) if (self.EstadoSelecionado.Sigla) if (self.EstadoSelecionado.Sigla != "") {
                    idEstado = self.EstadoSelecionado.Sigla;
                }
                if (self.EscolaSelecionada) if (self.EscolaSelecionada.Id) if (!isNaN(self.EscolaSelecionada.Id)) if (parseInt(self.EscolaSelecionada.Id)>0){
                    idEscola = parseInt(self.EscolaSelecionada.Id);
                }


                //Se não selecionou o combo, filtra pelas cidades no mapa!
                if(idEstado == "" || idEstado === undefined || idEstado == null){
                    idEstado = self.getEstadosFiltro();
                }

                self.requestEnvioPaginado(idEstado,idEscola,idTurma,1);
            };


            this.requestEnvioPaginado = function(_idEstado,_idEscola,_idTurma,_bolProxPagina){
                var strCidades = self.getCidadesFiltro();
                
                if(_bolProxPagina && _bolProxPagina == 1){
                    $scope.paramsMateriais.intPagina++;
                    $scope.loadMoreInProgress = true;
                }else{
                    $scope.loadingBuscarGeral = true;
                }

                //console.log('idEstado = ' + _idEstado);
                //console.log('idEscola = ' + _idEscola);
                //console.log('idTurma = ' + _idTurma);
                //console.log('cidades = ' + strCidades);

                var path = "/AVA/Projetos/Servico/GetResultadoEnvioPaginado/";
                var parametros = {
                    idProjeto: $scope.objEdicao.Projeto.Id,
                    idEdicao: $scope.objEdicao.Id, 
                    idEtapa: $scope.paramsMateriais.idEtapaParam,
                    idSituacao: 1,
                    idEscola : _idEscola,
                    strUF : _idEstado,
                    strCidades: strCidades,
                    idTurma: _idTurma,
                    idInscricao:0,
                    idUsuario:0,
                    tipoProjeto: $scope.objEdicao.TipoProjeto,
                    tipoOrdenacao: 0,
                    intPagina: $scope.paramsMateriais.intPagina,
                    intRegPorPagina: $scope.paramsMateriais.intRegPorPagina,
                    intDestaque: $scope.paramsMateriais.simplesmenteDestaques
                };
                if (parametros.intPagina == 1){
                    $scope.objEnviosInscricao.TotalEnvios = 0;
                    $scope.objEnviosInscricao.Envios = new Array();
                }
                
                if(_bolProxPagina == 0){
                    $http({
                        url: path,
                        method: "POST",
                        params: parametros
                    }).success(function (data) {
                        if (data) if (data instanceof Object) {
                            if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                                $scope.objEnviosInscricao.TotalEnvios = parseInt(data.TotalEnvios);
                                $scope.totalEnviosFiltrado = parseInt(data.TotalEnvios);
                            }
                            if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                                $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                            }
                        }
                    }).error(function (err) {
                        console.log("Não foi possível buscar materiais da etapa");
                    }).finally(function(){
                        $scope.loadingBuscarGeral = false;
                    });
                }else{
                    
                    $http({
                        url: path,
                        method: "POST",
                        params: parametros
                    }).success(function (data) {
                        if (data) if (data instanceof Object) {
                            if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                                $scope.objEnviosInscricao.TotalEnvios = parseInt(data.Total);

                                try{
                                    if(data.Total){
                                        $scope.totalEnviosFiltrado = parseInt(data.Total);
                                    }else if(data.TotalEnvios){
                                        $scope.totalEnviosFiltrado = parseInt(data.TotalEnvios);
                                    }
                                }catch(err){};
                            }
                            if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                                angular.forEach(data.listParticipanteEnvio, function (valor, chave) {
                                    $scope.objEnviosInscricao.Envios.push(valor);
                                });
                                $scope.objEnviosInscricao.TotalEnvios = data.TotalEnvios; 
                                $scope.totalEnviosFiltrado = parseInt(data.TotalEnvios);
                            }
                        }
                    }).error(function (err) {
                        console.log("Não foi possível buscar materiais da etapa");
                    }).finally(function(){
                        $scope.loadMoreInProgress = false;
                    });
                }
            };

            this.resetAllFiltroGaleria = function(){
                self.EstadoSelecionado = undefined;
                self.EscolaSelecionada = undefined;
                self.TurmaSelecionada = undefined;
            };
            
            this.updateFiltroByGeral = function(){

                var _escolas = $filter("unique")($scope.CacheEscolas,"Estado");

                if(_escolas.length > 0){
                    angular.forEach(_escolas,function(obj,index){
                        $scope.filteredEstados.push({
                            Sigla: obj.Estado,
                            Estado: self.getEstadoByUf(obj.Estado)
                        });
                    });
                }else{
                    angular.forEach($scope.CacheEscolas,function(obj,index){
                        $scope.filteredEstados.push({
                            Sigla: obj.Estado,
                            Estado: self.getEstadoByUf(obj.Estado)
                        });
                    });
                }
                
                angular.forEach($scope.CacheTurmas,function(obj,index){
                    $scope.filteredTurmas.push(obj);
                });

                $scope.totalTurmasEnvio = $scope.filteredTurmas.length;
                $scope.filteredEscolas = $scope.CacheEscolas;
            };

            this.updateFiltroByCidade = function(){
                //Na segunda vez, tb atualizar LISTA de Escolas
                angular.forEach($scope.cidadesInFiltro,function(obj,index){
                    $scope.filteredEstados.push({
                        Sigla: obj.Sigla,
                        Estado: obj.Estado
                    });
                });

                for(var i = 0; i < $scope.cidadesInFiltro.length; i++){
                    var _auxEscolas = $filter("where")($scope.CacheEscolas, { Cidade : $scope.cidadesInFiltro[i].Cidade },true);
                            
                    if(_auxEscolas.length > 0){
                        angular.forEach(_auxEscolas,function(obj,idx){
                            $scope.filteredEscolas.push(obj);
                        });
                    }

                    var _auxTurmas = $filter("filter")($scope.CacheTurmas, { Escola : { Cidade : $scope.cidadesInFiltro[i].Cidade } },true);
                    if(_auxTurmas.length > 0){    
                        angular.forEach(_auxTurmas,function(obj,idx){
                            $scope.filteredTurmas.push(obj);
                        }); 
                        $scope.totalTurmasEnvio = $scope.filteredTurmas.length;
                    }
                }
            };
            

            //lista mapa com Overlay(html content)
            $scope.$on("changeListMap", function (event, obj) {
                $scope.strTextFiltro = "em todo Brasil.";

                $scope.paramsMateriais.intPagina = 1;
                $scope.cidadesInFiltro = [];
                $scope.filteredEstados = [];
                self.resetAllFiltroGaleria();

                if(obj != null){
                    var cidadesAdd = new Array();
                    for(var i = 0;i < obj.length; i++){
                        if((obj[i].Cidade != null && obj[i].Cidade != "")){
                            if(cidadesAdd.indexOf(obj[i].Cidade) < 0){ 
                               $scope.cidadesInFiltro.push(
                               {
                                Sigla: obj[i].Estado,
                                Estado: self.getEstadoByUf(obj[i].Estado),
                                Cidade: obj[i].Cidade 
                               });

                               cidadesAdd.push(obj[i].Cidade);
                            }
                        }
                    }
                }

                //console.log('total: ' + $scope.cidadesInFiltro.length );
                if($scope.cidadesInFiltro.length > 0){
                    var aux = "";
                    var totalInFiltro = $scope.cidadesInFiltro.length;
                    for(var i = 0; i < totalInFiltro; i++){
                        if(aux == ""){
                            aux = $scope.cidadesInFiltro[i].Cidade;
                        }else{
                            var pre = ", ";
                            if(i == (totalInFiltro-1)){
                                pre = " e ";
                            }
                            aux += pre + $scope.cidadesInFiltro[i].Cidade;
                        }
                    }
                    if(aux != ""){
                        $scope.strTextFiltro = aux;
                    }
                }
                

                if(!$scope.bolCarregouDados){
                    //console.log('[1] First time.. vamos laa');
                    //console.log($scope.cidadesInFiltro);
                    angular.forEach($scope.cidadesInFiltro,function(obj,index){
                        $scope.filteredEstados.push({
                            Sigla: obj.Sigla,
                            Estado: obj.Estado
                        });
                    });

                    //Se tiver passado CIDADe, já filtrar, SE NÃO TRAZER TODOS!!!
                    self.buscarGaleriaResultado();
                }else{
                    $scope.filteredTurmas = [];
                    $scope.filteredEscolas = [];

                    if($scope.cidadesInFiltro.length == 0){ //Busca todos os materiais
                        //console.log('[1] Segunda vez, mas TODOS MATERIAIS');
                        self.updateFiltroByGeral(); //Todos materiais
                    }else{
                        //console.log('[2] ** Segunda vez, com cidade no filtro');
                        self.updateFiltroByCidade(); //Materiais pelo filtro no mapa
                    }
                    self.aplicarFiltros(0);
                }
            });


            //Mapa estilo Cluster
            $scope.$on("changeListMapOpcao", function (event, objFilter) {
                $scope.strTextFiltro = "em todo Brasil.";
                $scope.paramsMateriais.intPagina = 1;
                $scope.cidadesInFiltro = [];
                $scope.strOpcaoFiltro = "";
                $scope.filteredEstados = [];
                self.resetAllFiltroGaleria();

                
                if(objFilter != null){
                    if(objFilter.opcao != null){
                        if(objFilter.opcao != ""){
                            $scope.strOpcaoFiltro = objFilter.opcao;
                        }
                    }

                    if(objFilter.markers.length > 0){
                        $scope.strTextFiltro = "nesta região"
                        $scope.totalEnviosFiltrado = objFilter.markers.length;
                        var _markersCity = $filter("unique")(objFilter.markers, "Cidade");
                        for(var i = 0;i < _markersCity.length; i++){
                            if((_markersCity[i].Cidade != null && _markersCity[i].Cidade != "")){
                               $scope.cidadesInFiltro.push(
                               {
                                Sigla: _markersCity[i].Estado,
                                Estado: self.getEstadoByUf(_markersCity[i].Estado),
                                Cidade: _markersCity[i].Cidade 
                               });
                            }
                        }
                    }
                }

                /*  
                   '#######################################################################################'
                   ' Descomentar caso queira incluir o nome das cidades filtrar: em São Paulo e Curitiba.  '
                   '#######################################################################################'

                if($scope.cidadesInFiltro.length > 0){
                    var aux = "";
                    var totalInFiltro = $scope.cidadesInFiltro.length;
                    for(var i = 0; i < totalInFiltro; i++){
                        if(aux == ""){
                            aux = $scope.cidadesInFiltro[i].Cidade;
                        }else{
                            var pre = ", ";
                            if(i == (totalInFiltro-1)){
                                pre = " e ";
                            }
                            aux += pre + $scope.cidadesInFiltro[i].Cidade;
                        }
                    }
                    if(aux != ""){
                        $scope.strTextFiltro = aux;
                    }
                }
                */

                if(!$scope.bolCarregouDados){
                    //console.log('[1] First time.. vamos laa');
                    //console.log($scope.cidadesInFiltro);
                    angular.forEach($scope.cidadesInFiltro,function(obj,index){
                        $scope.filteredEstados.push({
                            Sigla: obj.Sigla,
                            Estado: obj.Estado
                        });
                    });

                    //Se tiver passado CIDADe, já filtrar, SE NÃO TRAZER TODOS!!!
                    self.buscarGaleriaResultado();
                }else{
                    $scope.filteredTurmas = [];
                    $scope.filteredEscolas = [];

                    if($scope.cidadesInFiltro.length == 0){ //Busca todos os materiais
                        self.updateFiltroByGeral(); //Todos materiais
                    }else{
                        self.updateFiltroByCidade(); //Materiais pelo filtro no mapa
                    }
                    self.aplicarFiltros(0);
                }
            });

        } ],
        controllerAs: 'galeriaResultadoCtrl'
    };
});
