"use strict"
angular.module('Etapa').directive('listaPartido', function () {
    return {
        restrict: 'EA',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/lista-partido.html',
        scope: {
            objEtapas: "=objEtapas",
            objEdicao: "=objEdicao",
            defaultConfig: "=defaultConfig",
            objEnquetes: "=objEnquetes"
            //objUsuario: "=objUsuario"
        },
        link: function (scope, el, attr) {

        },
        controller: ['$http', '$scope', '$timeout', '$location', '$filter', '$modal', 'constantes', 'projetoTools', function ($http, $scope, $timeout, $location, $filter, $modal, constantes, projetoTools) {
            var self = this;
            $scope.projetoTools = projetoTools;

            $scope.clickEvt = "click";
            $scope.overEvt = "mouseover";
            $scope.outEvt = "mouseout";

            $scope.bolMobile = projetoTools.isMobile();
            $scope.bolDesktop = projetoTools.isDesktop();

            /*
            0 - não iniciada
            1 - enquete prévia
            2 - envio dos materiais que serão utilizados na enquete
            3 - enquete material
            4 - resultado enquete material
            5 - votacao
            6 - resultado votacao
            */
            $scope.faseEleicao = 0;
            $scope.etapaCorrente = undefined;
            $scope.etapaFinal = undefined;
            $scope.objUsuario = angular.copy(constantes.Usuario);

            $scope.bolEducador = projetoTools.verificaPerfil($scope.objUsuario,'Educador');
            $scope.bolAdministrador = projetoTools.verificaPerfil($scope.objUsuario,'Administrador');
            $scope.bolAluno = projetoTools.verificaPerfil($scope.objUsuario,'Aluno');
            $scope.bolPaiDeElunoInscrito = false;
            $scope.bolAlunoInscritoEleicoes=false;

            /*
            $scope.defaultConfig = angular.copy(constantes.DefaultConfig);
            $scope.objEdicao = angular.copy(constantes.Edicao);
            $scope.objEtapas = angular.copy(constantes.Edicao.Etapas);
            */
            $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);
            $scope.constantes = angular.copy(constantes);

            $scope.ctrlRajadaEvento = undefined;

            $scope.bolRelacionadoComite=false; 
            $scope.bolResultadoEnquetePrevia=false; 
            $scope.bolResultadoEnqueteMaterial=false;
            $scope.bolResultadoEleicao=false; 
            $scope.bolResultadosRevelados = false;
            $scope.dataRevelacaoResultado = "DD/MM";

            $scope.candidatoEscolhidoPrevia = undefined;
            $scope.arrAlternativasEscolhidas = [];
            
            $scope.intVotoUserPrevia=0;
            $scope.intVotoUserMaterial=[];
            $scope.intCandidatoEscolhido=0;

            $scope.EnquetePrevia = {};
            $scope.EnquetesMateriais = [];

            $scope.partido = {};      
            $scope.enquete = {};
            $scope.loadingPlataforma = false;
            this.init = function () {
                self.preInit();
                self.initBinders();
            };

            $scope.scrollDown=function(){
                window.scrollTo(0, 1000);
            };

            this.loadEnquete=function(tipo, situacaoEtapa, objPartido){
                //carregamento das enquetes conforme a situação em que se encontram as etapas
                if(angular.isDefined($scope.objEnquetes) && angular.isArray($scope.objEnquetes) && projetoTools.hasArrayElems($scope.objEnquetes)) {
                    var bolSortByPosicao=false;
                    for(var enquete in $scope.objEnquetes){
                        //filtra pelas enquetes dos respectivos partido e tipo informado
                        var bolProssegue = true;
                        if(objPartido){
                            bolProssegue = false;
                            if(objPartido.Id == $scope.objEnquetes[enquete].IdCategoria){
                                bolProssegue = true;
                            }
                        }
                        if(bolProssegue && (tipo==0 || tipo == $scope.objEnquetes[enquete].IdTipo)){
                            switch($scope.objEnquetes[enquete].IdTipo){
                                case 1:
                                    //enquete sobre as categorias - prévias
                                    if(situacaoEtapa>=2){
                                        //tras a enquete para ser respondida na mesma ordem que foi recebida
                                        
                                        for(var alternativa in $scope.objEnquetes[enquete].Alternativas){
                                            if($scope.objEnquetes[enquete].Alternativas[alternativa].Votei){
                                                $scope.intCandidatoEscolhido = $scope.objEnquetes[enquete].Alternativas[alternativa].IdObjeto;
                                                $scope.intVotoUserPrevia = $scope.intCandidatoEscolhido;
                                            }
                                        }
                                        if(situacaoEtapa>2){
                                            //resultados revelados
                                            //complementa os dados das categorias ao vetor do resultado da enquete: número do candidato
                                            for(var alternativa in $scope.objEnquetes[enquete].Alternativas){
                                                var cat = $filter('filter')($scope.partido.Subcategorias, { Id: $scope.objEnquetes[enquete].Alternativas[alternativa].IdObjeto }, false);
                                                $scope.objEnquetes[enquete].Alternativas[alternativa].Identificador = $scope.objEnquetes[enquete].Alternativas[alternativa].Ordem;
                                                if(projetoTools.hasArrayElems(cat) && cat[0].Id == $scope.objEnquetes[enquete].Alternativas[alternativa].IdObjeto){
                                                    $scope.objEnquetes[enquete].Alternativas[alternativa].Identificador = cat[0].Complemento;
                                                }
                                            }
                                        }
                                        $scope.EnquetePrevia = angular.copy($scope.objEnquetes[enquete]);
                                    }
                                    break;
                                case 2:
                                    //enquete sobre materiais enviados e sinalizados para tal
                                    if(situacaoEtapa>=2){
                                        //tras a enquete vencedora por primeiro no slot 0 do array
                                        var curEnquete = angular.copy($scope.objEnquetes[enquete]); 
                                        if(situacaoEtapa>2){
                                            //sinaliza para ordenar as alternativas conforme a posição obtida no resultado
                                            //para posionar os vencedores no slot 0 do array as alternativas
                                            
                                            //recurso provisório para contornar o problema da publicação de 2016, onde foram divulgados erroneamente os resultados das enquetes invertidos
                                            var tempData = angular.copy($scope.objEdicao.DataInicioInscricao);
                                            if (typeof (tempData) == "string") if (!(tempData instanceof Date)) if (tempData.indexOf("/") != -1) {
                                                tempData = eval("new " + tempData.replace(/\//ig, ""));
                                            }
                                            if(tempData.getFullYear() == 2016){
                                                curEnquete.Alternativas = curEnquete.Alternativas.sort(function(a,b){return b.Posicao - a.Posicao});
                                            }
                                            else{
                                                //ordem crescente 
                                                curEnquete.Alternativas = curEnquete.Alternativas.sort(function(a,b){return a.Posicao - b.Posicao});
                                            }
                                            
                                        }
                                        curEnquete.IdTipoMedia = 1;
                                        if(projetoTools.hasArrayElems(curEnquete.Alternativas)){
                                            if(curEnquete.Alternativas[0].Texto.toLowerCase().indexOf(".mp3")!=-1 || curEnquete.Alternativas[0].Texto.toLowerCase().indexOf(".wav")!=-1)                                             
                                                curEnquete.IdTipoMedia = 2;
                                        }
                                        $scope.EnquetesMateriais.push(curEnquete);
                                    }
                                    break;
                            }
                        }
                    }
                }
            }

            $scope.PlataformaSorteada = "";
            $scope.buscarNovaPlataforma = function (idEtapa,idFormulario) {
                $scope.PlataformaSorteada = "";
                $scope.loadingPlataforma = true;
                //busca inicialmente a plataforma oficial: setada como destaque ou  pré-selecionado
                //vencedora da enquete
                //nas buscas consecutivas, busca por plataformas aleatórias
                //busca a etapa que tem material sinalizado para a enquete do tipo de materiais
                var idEtapa = 0;
                angular.forEach($scope.objEtapas, function (valor, chave) {
                    if($scope.objEtapas[chave].TipoEtapaEleicao == 2){
                        idEtapa = $scope.objEtapas[chave].Id;
                    }
                });
                if(idEtapa>0){
                    var path = "/AVA/Projetos/Servico/GetInscricaoEnvioPaginado/";
                    var parametros = {
                        idProjeto: $scope.objEdicao.Projeto.Id,
                        idEdicao: $scope.objEdicao.Id,
                        idEtapa: idEtapa,
                        idSituacao: 1,
                        idEscola : 0,
                        strUF : '',
                        idTurma: 0,
                        idInscricao:0,
                        idUsuario:0,
                        tipoProjeto: $scope.objEdicao.TipoProjeto,
                        tipoOrdenacao: 3,
                        intPagina: 1,
                        intRegPorPagina: 1,
                        intDestaque: 0,
                        intAno : 2016,
                        idCategoria : $scope.partido.Id,
                        bolEnviosCompletos: true
                    };
                    $http({
                        url: path,
                        method: "POST",
                        params: parametros
                    }).success(function (data) {
                        if (data) if (data instanceof Object) {
                            //trata o recebimento da relação de materiais
                            if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                                var idInscricao = data.listParticipanteEnvio[0].Inscricao.Id;
                                var idEnvio = data.listParticipanteEnvio[0].IdProjetoInscricaoEnvio;
                                var idFormularioResposta = data.listParticipanteEnvio[0].MensagemRapida.EtapaInscricaoEnvio.EtapaInscricaoEnvioGrupos[0].EtapaInscricaoEnvioGrupoRespostas[0].FormularioResposta.Id;

                                if(idFormulario>0 && idInscricao>0 && idFormularioResposta>0){
                                    //console.log("chegou aqui:"+idFormulario+"_"+idInscricao+"_"+idFormularioResposta);
                                    $scope.getFormData(idFormulario, idInscricao, idFormularioResposta, function(retorno){
                                        var idFormularioCampo = 0;
                                        var idxFormularioCampo = -1;
                                        //resgata o valor do campo tipo 21: campo de audio com transcricao pela mediação (na legenda do campo)
                                        if(projetoTools.hasArrayElems(retorno.FormularioResposta.Campos)){
                                            for(var campo in retorno.FormularioResposta.Campos){
                                                if(retorno.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo.Id == 21){
                                                    idFormularioCampo = retorno.FormularioResposta.Campos[campo].FormularioCampo.Id;
                                                    idxFormularioCampo =  retorno.FormularioResposta.Campos.indexOf(retorno.FormularioResposta.Campos[campo]);
                                                    $scope.loadingPlataforma = false;
                                                    $scope.PlataformaSorteada = retorno.FormularioResposta.Campos[campo].Legenda;    
                                                    break;
                                                }
                                            }
                                            //caso não encontre, tentar resgatar o valor do campo tipo 2: campo de audio com legenda
                                            if(!(idFormularioCampo>0 && idxFormularioCampo>=0 && $scope.PlataformaSorteada!="")){
                                                for(var campo in retorno.FormularioResposta.Campos){
                                                    if(retorno.FormularioResposta.Campos[campo].FormularioCampo.FormularioCampoTipo.Id == 2){
                                                        idFormularioCampo = retorno.FormularioResposta.Campos[campo].FormularioCampo.Id;
                                                        idxFormularioCampo =  retorno.FormularioResposta.Campos.indexOf(retorno.FormularioResposta.Campos[campo]);
                                                        $scope.loadingPlataforma = false;
                                                        $scope.PlataformaSorteada = retorno.FormularioResposta.Campos[campo].Legenda;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        /*
                                        //tenta obter pelas definições do form
                                        if(!(idFormularioCampo>0 && idxFormularioCampo>=0 && $scope.PlataformaSorteada!="")){
                                            if(projetoTools.hasArrayElems(retorno.FormularioResposta.Formulario.Grupos[0].Campos)){
                                                for(var campo in retorno.FormularioResposta.Formulario.Grupos[0].Campos){
                                                    if(retorno.FormularioResposta.Formulario.Grupos[0].Campos[campo].FormularioCampoTipo.Id == 21){
                                                        idFormularioCampo = retorno.FormularioResposta.Formulario.Grupos[0].Campos[campo].Id;
                                                        idxFormularioCampo =  retorno.FormularioResposta.Formulario.Grupos[0].Campos.indexOf(retorno.FormularioResposta.Formulario.Grupos[0].Campos[campo]);
                                                        break;
                                                    }
                                                }
                                            }    
                                            if(idFormularioCampo>0 && idxFormularioCampo>=0){
                                                $scope.PlataformaSorteada = retorno.FormularioResposta.Campos[idxFormularioCampo].Legenda;    
                                            }
                                        }
                                        */
                                    });
                                    $scope.loadingPlataforma = false;
                                }
                            }
                        }
                    }).error(function (err) {
                        console.log("Não foi possível buscar materiais da etapa");
                    }).finally(function(){
                        $scope.loadingPlataforma = false;
                    });
                }
            };

            $scope.getFormData = function (idFormulario, idInscricao, idFormularioResposta, callback) {
                if (idFormulario > 0 && idFormularioResposta > 0) {
                    var path = "/AVA/ProjetoApi/v1/Formulario/GetAll/";                
                    $http({
                        url: path,
                        method: "GET",
                        cache: false,
                        params: {
                            idFormulario: idFormulario,
                            idInscricao: idInscricao,
                            idFormularioResposta: idFormularioResposta,
                            intOrdem: 0,
                            '_': new Date().getTime()
                        }
                    }).success(function (data) {
                        if (data) if (data instanceof Object) {
                            if (data.Config) {
                                projetoTools.cb($scope,callback,data);
                            }
                            if (!data.Config) {
                                throw new Error("ERRO: Não foi possível obter os dados de configuração do formulário");
                            }                    
                        }
                    }).error(function (data, status, headers, config) {
                        console.log("Ocorreu um erro ao tentar carregar os dados dos formularios. [Formulario.js]");
                    }).then(function (res) {
                        //console.log("then ajax");
                    }).finally(function (res) {
                        //console.log("finally ajax");
                    });
                }
            }

            this.preInit = function () {
                //remapeia as funções de projetoTools para essa controller e para o escopo atual
                var initApi = true;
                if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
                    initApi = false;
                }
                if (initApi) {
                    projetoTools.extendFunctions(self);
                    projetoTools.extendFunctions($scope);
                }
                if ($scope.objEtapas != undefined) if (angular.isArray($scope.objEtapas)) {
                    if ($scope.objEtapas.length > 0) {
                        //preparação dos dados e setup dos parâmetros
                        for(var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias){
                            $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Slug = IniciaisMaiusculas(retira_acentos($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Descricao).replace(/-/g," ")).replace(/\s/g,"");
                            if($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Slug.toLowerCase()==document.location.href.split("/")[document.location.href.split("/").length-1].toLowerCase()){
                                $scope.partido = angular.copy($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria]);
                                var turmas_inscritas = $filter('filter')($scope.objUsuario.TurmasInscritas, { Inscricao: { Id: '!' + 0, Categorias: [ { Id : $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Id } ] } }, true);
                                if (turmas_inscritas) if (turmas_inscritas instanceof Array) if (turmas_inscritas.length > 0) {
                                    $scope.bolRelacionadoComite=true;
                                    if(projetoTools.verificaPerfil($scope.objUsuario,'Responsável')){
                                        $scope.bolPaiDeElunoInscrito = true;
                                    }
                                    if($scope.bolAluno){
                                        $scope.bolAlunoInscritoEleicoes=true;
                                    }
                                }
                            }
                            if(angular.hasArrayElems($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias)) for(var subcategoria in $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias){
                                $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias[subcategoria].Slug = IniciaisMaiusculas(retira_acentos($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias[subcategoria].Descricao).replace(/-/g," ")).replace(/\s/g,"");
                            }
                        }
                        //adequa as datas
                        var idEtapaPlataforma = 0;
                        var idFormularioPlataforma = 0;
                        angular.forEach($scope.objEtapas, function (valor, chave) {
                            if (typeof (valor.DataInicio) == "string") if (!(valor.DataInicio instanceof Date)) if (valor.DataInicio.indexOf("/") != -1) {
                                $scope.objEtapas[chave].DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                                $scope.objEtapas[chave].DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                                $scope.objEtapas[chave].DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                            }
                            if($scope.objEtapas[chave].TipoEtapaEleicao>0){
                                switch($scope.objEtapas[chave].TipoEtapaEleicao){
                                    case 1:
                                        //etapa da enquete de prévisa
                                        var objPartido = $scope.partido;
                                        if(self.situacaoEtapa($scope.objEtapas[chave])==2){// && hoje>$scope.objEtapas[chave].DataInicio && hoje<$scope.objEtapas[chave].DataFim){
                                            //enquete em andamento prévia
                                            self.loadEnquete(1, 2, objPartido);
                                        }
                                        if(self.situacaoEtapa($scope.objEtapas[chave])>2){
                                            //enquete finalizada - resultado revelado
                                            $scope.bolResultadoEnquetePrevia = true;
                                            self.loadEnquete(1, 3, objPartido);
                                        }
                                        var test = $filter('filter')($scope.EnquetePrevia.Alternativas, { Votei: true }, false);
                                        if(angular.hasArrayElems(test)){
                                             $scope.intCandidatoEscolhido = test[0].IdObjeto;
                                             $scope.intVotoUserPrevia = $scope.intCandidatoEscolhido;
                                        }
                                        break;
                                    case 2:
                                        //etapa de envios dos materiais da enquete
                                        idEtapaPlataforma = $scope.objEtapas[chave].Id;
                                        idFormularioPlataforma = $scope.objEtapas[chave].Configuracao.EtapaGrupos[0].EtapaGruposFormularios[0].Formulario.Id;
                                        
                                        //console.log("etapa");
                                        //console.log($scope.objEtapas[chave]);
                                        

                                        if(self.situacaoEtapa($scope.objEtapas[chave])>=2){
                                            $scope.bolResultadoEnquetePrevia = true;
                                        }
                                        break;  
                                    case 3:
                                        //etapa da enquete de materiais
                                        if(self.situacaoEtapa($scope.objEtapas[chave])==2){
                                            //enquete em andamento de materiais
                                            self.loadEnquete(2, 2, objPartido);
                                        }
                                        if(self.situacaoEtapa($scope.objEtapas[chave])>2){
                                            //enquete finalizada - resultado revelado
                                            $scope.bolResultadoEnqueteMaterial = true;
                                            self.loadEnquete(2, 3, objPartido);
                                            if($scope.faseEleicao<4) {
                                                $scope.faseEleicao = 4;
                                            }
                                        }
                                        for(var enq in $scope.EnquetesMateriais){
                                            var test = $filter('filter')($scope.EnquetesMateriais[enq].Alternativas, { Votei: true }, false);
                                            if(angular.hasArrayElems(test)){
                                                var ordem = $scope.EnquetesMateriais[enq].Ordem-1;
                                                if(!angular.isArray($scope.arrAlternativasEscolhidas))
                                                    $scope.arrAlternativasEscolhidas=[];
                                                while(!angular.hasArrayElems($scope.arrAlternativasEscolhidas) || $scope.arrAlternativasEscolhidas.length<$scope.EnquetesMateriais.length){
                                                    var temp = {};
                                                    $scope.arrAlternativasEscolhidas.push(angular.copy(temp));
                                                }
                                                $scope.arrAlternativasEscolhidas[ordem] = angular.copy(test[0]);

                                                if(!angular.isArray($scope.intVotoUserMaterial))
                                                    $scope.intVotoUserMaterial=[];
                                                while(!angular.hasArrayElems($scope.intVotoUserMaterial) || $scope.intVotoUserMaterial.length<$scope.EnquetesMateriais.length){
                                                    var temp = 0;
                                                    $scope.intVotoUserMaterial.push(angular.copy(temp));
                                                }
                                                $scope.intVotoUserMaterial[ordem] = test[0].IdObjeto;
                                            }
                                        }
                                        if(self.situacaoEtapa($scope.objEtapas[chave])>=2){
                                            $scope.bolResultadoEnquetePrevia = true;
                                        }
                                        break;
                                    case 5:
                                        //revelação dos resultados para todos
                                        $scope.dataRevelacaoResultado = projetoTools.DiaMesComZeros($scope.objEtapas[chave].DataInicio);
                                        var dataAtual = new Date();
                                        if (dataAtual.getTime() > $scope.objEtapas[chave].DataInicio.getTime()) {
                                            $scope.bolResultadosRevelados = true;
                                        }
                                        if(self.situacaoEtapa($scope.objEtapas[chave])>=2){
                                            $scope.bolResultadoEnquetePrevia = true;
                                        }

                                        //comentado pois foi implementada ordenação no BackEnd
                                        //reordena os candidatos conforme o resultado da enquete de prévia - 
                                        /*
                                        if(self.situacaoEtapa($scope.objEtapas[chave])>=2){
                                            console.log($scope.EnquetePrevia.Alternativas);

                                            $scope.EnquetePrevia.Alternativas = $scope.EnquetePrevia.Alternativas.sort(function(a,b){
                                                if(!isNaN(a.Identificador) && !isNaN(b.Identificador)){
                                                    return parseInt(a.Identificador) - parseInt(b.Identificador)
                                                }
                                                else{
                                                    return parseInt(a.Posicao) - parseInt(b.Posicao)
                                                }
                                            });

                                            
                                            //$scope.partido.Subcategorias = $scope.partido.Subcategorias.sort(function(a,b){
                                            //    if(!isNaN(a.Complemento) && !isNaN(b.Complemento)){
                                            //        return parseInt(a.Complemento) - parseInt(b.Complemento)
                                            //    }
                                            //    else{
                                            //        return parseInt(a.Ordem) - parseInt(b.Ordem)
                                            //    }
                                            //});
                                            
                                            //console.log($scope.EnquetePrevia.Alternativas);
                                        }
                                        */
                                        if(self.situacaoEtapa($scope.objEtapas[chave])==2){
                                            //enfim votação
                                            if($scope.faseEleicao<5) {
                                                $scope.faseEleicao = 5;
                                            }
                                        }
                                        break;
                                }
                                
                            }
                        });
                        
                        if($scope.bolResultadoEnquetePrevia){
                            $scope.partido.Subcategorias = $scope.partido.Subcategorias.sort(function(a,b){
                                if(!isNaN(a.Complemento) && !isNaN(b.Complemento)){
                                    return parseInt(a.Complemento) - parseInt(b.Complemento)
                                }
                                else{
                                    return parseInt(a.Ordem) - parseInt(b.Ordem)
                                }
                            });
                            //console.log($scope.EnquetePrevia.Alternativas);
                            //console.log($scope.partido.Subcategorias);
                        }

                        /*
                        if($scope.bolResultadosRevelados && idEtapaPlataforma>0 && idFormularioPlataforma>0){
                            $scope.buscarNovaPlataforma(idEtapaPlataforma, idFormularioPlataforma);
                        }
                        */

                        //console.log("$scope.Enquetes...");
                        //console.log($scope.EnquetePrevia);
                        //console.log($scope.EnquetesMateriais);

                        $scope.etapaCorrenteAtiva = projetoTools.getEtapaCorrente($scope.objEtapas,false);
                        if ($scope.etapaCorrenteAtiva) {
                            $scope.etapaUltimaEtapaOcorreu = $scope.etapaCorrenteAtiva;
                        }
                        else {
                            $scope.etapaUltimaEtapaOcorreu = projetoTools.getEtapaCorrente($scope.objEtapas,true);
                        }
                        if(angular.isObject($scope.etapaUltimaEtapaOcorreu)) if($scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao) if(angular.getInt($scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao)>0){
                            $scope.faseEleicao = $scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao;
                        }
                        //$scope.etapaFinal = angular.copy($scope.objEtapas[$scope.objEtapas.length - 1]);
                        $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEtapas));

                        //flag se sinaliza se o resultado das eleições já está disponível
                        if(self.situacaoEtapa($scope.etapaFinal)==4 && ($scope.etapaFinal.TipoEtapaEleicao==5 || $scope.etapaFinal.TipoEtapaEleicao==6)){
                            $scope.bolResultadoEleicao=true;
                        }
                        $scope.safeApply();
                    }
                }
            };



            this.initBinders = function () {
                //em desktop trata a exibição do tooltip por hover
                if ($scope.bolMobile) {
                    $scope.clickEvt = "touchend";
                    $scope.overEvt = "touchstart";
                    $scope.outEvt = "touchend";
                }
                if ($scope.bolDesktop && !$scope.bolMobile) {
                    $scope.clickEvt = "click";
                    $scope.overEvt = "mouseover";
                    $scope.outEvt = "mouseout";
                }

                var els = angular.element("section.previas > a.btn_confirmar");
                angular.forEach(els, function (el) {
                    angular.element(el).unbind($scope.clickEvt);
                    angular.element(el).bind($scope.clickEvt, function (evt) {
                        if ($scope.ctrlRajadaEvento) {
                            $timeout.cancel($scope.ctrlRajadaEvento);
                            $scope.ctrlRajadaEvento = undefined;
                        }
                        $scope.ctrlRajadaEvento = $timeout(function (event) {
                            var elt = evt.target;
                            var elm = angular.element(elt);

                            $scope.registrarVotoPrevia();
                        }, 150);
                    });
                });

                var els = angular.element("section.bloco-enquete > a.btn_confirmar");
                angular.forEach(els, function (el) {
                    angular.element(el).unbind($scope.clickEvt);
                    angular.element(el).bind($scope.clickEvt, function (evt) {
                        if ($scope.ctrlRajadaEvento) {
                            $timeout.cancel($scope.ctrlRajadaEvento);
                            $scope.ctrlRajadaEvento = undefined;
                        }
                        $scope.ctrlRajadaEvento = $timeout(function (event) {
                            var elt = evt.target;
                            var elm = angular.element(elt);

                            $scope.registrarVotoMaterial();
                        }, 150);
                    });

                });
            }

            $scope.setCustomRadio = function(objeto,ordem){
                //if($scope.bolEducador || $scope.bolAdministrador){
                //    self.openModalNaoAutorizado($scope.categoria, 1);
                //}
                //else 
                if($scope.bolRelacionadoComite && $scope.bolAluno){
                    //Tipo prévia
                    if($scope.faseEleicao==1 && $scope.intVotoUserPrevia==0){
                        $scope.candidatoEscolhidoPrevia = undefined;
                        if(objeto){
                            $scope.candidatoEscolhidoPrevia = objeto;
                            $scope.intCandidatoEscolhido = objeto.Ordem;
                        }
                        var seletor = "section.previas div.seletor";
                        var elms = angular.element(seletor);
                        angular.forEach(elms, function (el) {
                            angular.element(el).removeClass("ativo");
                            if($scope.intCandidatoEscolhido>0 && angular.element(el).hasClass("candidato_0"+$scope.intCandidatoEscolhido)){
                                angular.element(el).addClass("ativo");
                            }
                        });
                    }
                    //Tipo materiais
                    if($scope.faseEleicao==3 && ordem!=undefined && ordem>=0 && !($scope.intVotoUserMaterial[ordem]>0)){
                        if(objeto){
                            if(!angular.isArray($scope.arrAlternativasEscolhidas))
                                $scope.arrAlternativasEscolhidas=[];
                            while(!angular.hasArrayElems($scope.arrAlternativasEscolhidas) || $scope.arrAlternativasEscolhidas.length<=ordem){
                                var temp = {};
                                $scope.arrAlternativasEscolhidas.push(angular.copy(temp));
                            }
                            $scope.arrAlternativasEscolhidas[ordem] = angular.copy(objeto);
                        }
                        var seletor = "section.enquete div.seletor";
                        var elms = angular.element(seletor);
                        angular.forEach(elms, function (el) {
                            angular.element(el).removeClass("ativo");
                            if($scope.intCandidatoEscolhido>0 && angular.element(el).hasClass("candidato_0"+$scope.intCandidatoEscolhido)){
                                angular.element(el).addClass("ativo");
                            }
                        });
                    }
                }
            };

            //registra o voto em uma enquete
            //incrementa o número de votos em uma subcategoria - tblCategoriaVotos
            $scope.registrarVotoPrevia = function(){
                var categoria = angular.copy($scope.candidatoEscolhidoPrevia);
                //if($scope.bolEducador || $scope.bolAdministrador){
                //    self.openModalNaoAutorizado(categoria, 1);
                //}
                //else
                if($scope.intVotoUserPrevia==0 && $scope.bolAluno && $scope.bolRelacionadoComite){
                    if($scope.intCandidatoEscolhido>0 && $scope.candidatoEscolhidoPrevia){       
                        self.openModalConfirmacaoEnquete(categoria, 1);
                    }
                    else{
                        alert("Selecione um candidato para registrar o seu voto!");
                    }
                }
            };

            $scope.votouEnquete=function(objEnquete){
                var votoscomputados = $filter('filter')(objEnquete.Alternativas, { Votei: true }, false);
                if(projetoTools.hasArrayElems(votoscomputados)){
                    return true;
                }
                return false;
            };

            $scope.registrarVotoMaterial = function(ordem){
                var categoria = angular.copy($scope.arrAlternativasEscolhidas[ordem]);
                //if($scope.bolEducador || $scope.bolAdministrador){
                //    self.openModalNaoAutorizado(categoria, 1);
                //}
                //else
                if($scope.bolAluno && $scope.bolRelacionadoComite && !($scope.intVotoUserMaterial[ordem]>0)) {
                    if(projetoTools.hasArrayElems($scope.arrAlternativasEscolhidas) && $scope.arrAlternativasEscolhidas[ordem]){      
                        self.openModalConfirmacaoEnquete(categoria,2,ordem);
                    }
                    else{
                        alert("Selecione um material para registrar o seu voto!");
                    }
                }
            };
            
            $scope.getCargo = function(intPosicao, alternativas){				
				if(alternativas.length==4){
					switch(intPosicao){
						case 1:
							return "Presidente"
							break;
						case 2:
							return "Governador"
							break;
						case 3:
							return "Senador"
							break;
						case 4:
							return "Deputado"
							break;
					}
				}
				else{
					switch(intPosicao){
						case 1:
							return "Prefeito"
							break;
						case 2:
							return "Vice-prefeito"
							break;
						case 3:
							return "Vereador"
							break;
					}
				}
            };

            this.openModalNaoAutorizado = function (alternativa, variante) {
                var p_etapa = angular.copy($scope.etapaCorrenteAtiva);
                var modalInstance = $modal.open({
                    templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-enquete-educador.html',
                    controller: 'ctrlModalEnquete',
                    resolve: {
                        defaultConfig: function () {
                            return $scope.defaultConfig;
                        },
                        edicaoConfig: function () {
                            return $scope.edicaoConfig;
                        },
                        etapa: function () {
                            var p_etapa = angular.copy($scope.etapaCorrenteAtiva);
                            if(variante==2) {
                                angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                                    if($scope.EnquetesMateriais[ordem].IdEtapa == curEtapa.Id){
                                        p_etapa = angular.copy(curEtapa);
                                    }
                                });
                            }
                            return p_etapa;
                        },
                        objUsuario: function () {
                            return $scope.objUsuario
                        },
                        objEdicao: function () {
                            return $scope.objEdicao;
                        },
                        enquetes: function () {
                            return undefined;
                        },
                        alternativa: function () {
                            return 0;
                        }
                    },
                    backdrop: 'static'
                });

                modalInstance.result.then(function (parametro) {
                    //

                }, function () {
                    //
                });
                modalInstance.opened.then(function (parametro) {
                    //
                }, function () {
                    //
                });
            };
            /*
            this.openModalNaoAutorizadoUrna = function (p_etapa) {
                if(!p_etapa){
                    angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                        if(self.situacaoEtapa(curEtapa)==2 && [5].indexOf(curEtapa.TipoEtapaEleicao)!=-1) if(self.situacaoEtapa(curEtapa)==2){
                            p_etapa = angular.copy(curEtapa);        
                        }
                    });
                }
                if(p_etapa){
                    var modalInstance = $modal.open({
                        templateUrl: "/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-votacao-educador.html",
                        controller: "ctrlModalVotacaoEducador",
                        resolve: {
                            defaultConfig: function () {
                                return $scope.defaultConfig;
                            },
                            edicaoConfig: function () {
                                return $scope.edicaoConfig;
                            },
                            etapa: function () {
                                return p_etapa;
                            },
                            objUsuario: function () {
                                return $scope.objUsuario
                            },
                            objEdicao: function () {
                                return $scope.objEdicao;
                            },
                            enquetes: function () {
                                return undefined;
                            },
                            alternativa: function () {
                                return 0;
                            }
                        },
                        backdrop: 'static'
                    });

                    modalInstance.result.then(function (parametro) {
                        //

                    }, function () {
                        //
                    });
                    modalInstance.opened.then(function (parametro) {
                        //
                    }, function () {
                        //
                    });
                }
            };
            */
            this.openModalConfirmacaoEnquete = function (alternativa, variante, ordem) {
                var p_etapa = angular.copy($scope.etapaCorrenteAtiva);
                if(variante==2) {
                    angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                        if($scope.EnquetesMateriais[ordem].IdEtapa == curEtapa.Id){
                            p_etapa = angular.copy(curEtapa);
                        }
                    });
                }
                try{
                    var modalInstance = $modal.open({
                        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-enquete.html',
                        controller: 'ctrlModalEnquete',
                        resolve: {
                            defaultConfig: function () {
                                return $scope.defaultConfig;
                            },
                            edicaoConfig: function () {
                                return $scope.edicaoConfig;
                            },
                            etapa: function () {
                                var p_etapa = angular.copy($scope.etapaCorrenteAtiva);
                                if(variante==2) {
                                    angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                                        if($scope.EnquetesMateriais[ordem].IdEtapa == curEtapa.Id){
                                            p_etapa = angular.copy(curEtapa);
                                        }
                                    });
                                }
                                return p_etapa;
                            },
                            objUsuario: function () {
                                return $scope.objUsuario
                            },
                            objEdicao: function () {
                                return $scope.objEdicao;
                            },
                            enquetes: function () {
                                switch(variante){
                                    case 1:
                                        return [$scope.EnquetePrevia];
                                        break;
                                    case 2:
                                        return $scope.EnquetesMateriais;
                                        break;
                                }
                            
                            },
                            alternativa: function () {
                                switch(variante){
                                    case 1:
                                        return alternativa.Id;
                                        break;
                                    case 2:
                                        return alternativa.Id;
                                        break;
                                }
                            
                            },
                        },
                        backdrop: 'static'
                    });

                    modalInstance.result.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
                        var sucesso = false;
                        sucesso = true;
                        switch(variante){
                            case 1:
                                $scope.intVotoUserPrevia = alternativa.Id;
                                for(var alt in $scope.EnquetePrevia.Alternativas){
                                    if($scope.EnquetePrevia.Alternativas[alt].IdObjeto == alternativa.Id){
                                        $scope.EnquetePrevia.Alternativas[alt].Votei=true;
                                    }
                                }
                                break;
                            case 2:
                                $scope.intVotoUserMaterial[ordem] = alternativa.Id;
                                for(var alt in $scope.EnquetesMateriais[ordem].Alternativas){
                                    if($scope.EnquetesMateriais[ordem].Alternativas[alt].IdObjeto == alternativa.Id){
                                        $scope.EnquetesMateriais[ordem].Alternativas[alt].Votei=true;
                                    }
                                }
                                break;
                        }
                        $scope.safeApply();
                    }, function () {
                        //
                    });
                    modalInstance.opened.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
                    }, function () {
                        //
                    });
                }
                catch(ex){
                    alert("erro:"+ex);
                }
            };

            
            //abre a urna virtual em um modal embutido - nao usar popup
            this.openVotacao = function (etapa) {
                /*
                if($scope.bolEducador || $scope.bolAdministrador){
                    self.openModalNaoAutorizadoUrna(etapa);
                }
                else{
                */
                    var linkTarefa = "";
                    var p_etapa = undefined;
                    if(etapa) if (etapa.LinkTarefa) if (etapa.LinkTarefa!="") if(etapa.LinkTarefa.toLowerCase().indexOf("eleicoes/urna")!=-1) {
                        linkTarefa = etapa.LinkTarefa;
                        p_etapa = angular.copy(etapa);
                    }
                    if(linkTarefa == "") if(!etapa) if(projetoTools.hasArrayElems($scope.objEtapas)) {
                        var temp = $filter('filter')($scope.objEtapas, { TipoEtapaEleicao: { Id: 5 } }, false);
                        if(projetoTools.hasArrayElems(temp)) if (temp[0].LinkTarefa != "") {
                            linkTarefa = temp[0].LinkTarefa;
                            p_etapa = angular.copy(temp[0]);
                        }
                    }
                    if(p_etapa.TipoEtapaEleicao==5 && linkTarefa != "") {
                        var modalInstance = $modal.open({
                            templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-votacao-urna.html',
                            controller: 'ctrlModalVotacao',
                            resolve: {
                                linkTarefa: function () {
                                    return linkTarefa;
                                }
                            },
                            backdrop: 'static'
                        });

                        modalInstance.result.then(function (p_equipe) { 
                            //
                        }, function () {
                            //
                        });
                        modalInstance.opened.then(function (parametro) { 
                        }, function () {
                            //
                        });
                    }
                //}
            };
            
            this.observeUserAudioEnded=function(bolStart,idxAudio,clsPlay,clsStop){
                if ($scope.ctrlAudio) {
                    $timeout.cancel($scope.ctrlAudio);
                    $scope.ctrlAudio = undefined;
                }
                if(bolStart) $scope.ctrlAudio = $timeout(function(){
                    var classPlay = "play";
                    var classStop = "stop";
                    if(clsPlay)
                        classPlay = clsPlay;
                    if(clsStop)
                        classStop = clsStop;
                    var found=false;
                    var prefix = '#'+idxAudio;
                    if(angular.element(prefix)) if(angular.element(prefix).eq(0).get(0)) if(angular.element(prefix).eq(0).get(0).ended) {
                        found=true; 
                        if(angular.element("[rel='" + idxAudio + "']").size()>0){
                            angular.element("[rel='" + idxAudio + "']").removeClass(classStop).addClass(classPlay);
                        }
                        self.stopAudio(idxAudio);
                        if ($scope.ctrlAudio) {
                            $timeout.cancel($scope.ctrlAudio);
                            $scope.ctrlAudio = undefined;
                        }
                    }
                    if(!found){
                        self.observeUserAudioEnded(true, idxAudio,clsPlay,clsStop);
                    }
                },1000);
            };

            $timeout(function () { self.init() }, 10);
        } ],
        controllerAs: 'ctrlCandidatos'
    };

});

 
