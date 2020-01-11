
function controleQuiz($http, $scope, $timeout, $filter, $location) {
    var _self = this;
    var _that = this;

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
}

function isAndroid() {
    return navigator.platform.toUpperCase().indexOf("ARM") > -1 || navigator.userAgent.toUpperCase().indexOf("ANDROID") > -1;
}

function isIpad() {
    return navigator.userAgent.match(/iPad/i) != null;
}

angular.module('resultado').directive('jogoQuiz',['$http','$timeout','$filter', function ($http, $timeout, $filter) {
    return {
        restrict: 'AEC',
        replace: true,
        transclude: true,
        scope: {
            edicao: "=",
            config: "=",
            resultado: "=",
            usuario: "=",
            dados: "="
        },
        templateUrl: function (element, attrs) {
            return '/AVA/Resultados/Scripts/Diretiva/Projeto/2016/comofunciona/quiz.html';
        },
        link: function link(scope, element, attrs) {
            var _self = this;
            var container = $(element);
			
			scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };
			
			scope.intPagina = 0;
			scope.intRegPorPagina = 20;
			scope.TotalParticipantes = 0;
			scope.Ranking = [];
			scope.Escolas = [];
			scope.Estados = [];
			scope.Turmas = [];
			scope.Categorias = [];
			scope.Questoes = [];
			scope.CacheQuestoes = [];
			scope.CacheEscolas = [];
			scope.CacheEstados = [];
			scope.CacheTurmas = [];
			scope.CacheEscolasFinal = [];
			scope.CacheEstadosFinal = [];
			scope.CacheTurmasFinal = [];

			scope.loadInProgress = true;
            scope.loadingRanking = false;
			scope.appendInProgress = false;

			scope.currentLevel = 0;

			scope.EstadoSelecionado = undefined;
			scope.EscolaSelecionada = undefined;
			scope.TurmaSelecionada = undefined;
			scope.controleAssincrono = undefined;
			scope.controleIntervalo = undefined;
			
			scope.activeArea='inicio';
			scope.activeSubArea='';
			scope.perguntaAtual = 0;
			scope.TempoPreviewRestante=0;
			scope.PontosTotal=0;
			scope.timeFinal = (new Date()).getTime();
            scope.configJogo = {};
            			
			scope.resetarJogo=function(){
				scope.sorteiaQuestoes();
				scope.activeArea='inicio';
				scope.perguntaAtual = 0;
				scope.PontosTotal = 0;
				scope.timeFinal = (new Date()).getTime();
				if(scope.controleIntervalo)
					clearInterval(scope.controleIntervalo);
				scope.controleIntervalo = undefined;
				scope.TempoPreviewRestante=0;
			};
			
			scope.close=function(){
				window.close();
			};

            scope.changeState=function(novo){
                if(scope.activeArea==novo){
                    if(scope.PontosTotal>0){
                        scope.activeArea='jogo';
				        scope.activeSubArea='';
                    }
                    else{
                        scope.activeArea='inicio';
				        scope.activeSubArea='';
                    }
                }
                else{
                    scope.activeArea = novo;
                }
            };
			
			scope.resetPergunta=function(ordem){
                //chamada caso erre a alternativa correta
                var tipoAcaoErro = 1; //integrar
                switch(tipoAcaoErro){
                    case 1:
                        //sorteia novas alternativas para a questão corrente
                        scope.questoes[(scope.perguntaAtual-1)].Alternativas = scope.misturarAlternativas(scope.questoes[(scope.perguntaAtual-1)]);                                
                        scope.questoes[(scope.perguntaAtual-1)].Alternativas.sort(function() {
		                    return .5-Math.random();
	                    });	

                        scope.TempoPreviewRestante=0;
					    var tempo = scope.questoes[scope.perguntaAtual-1].TempoPreview;
					    if(parseInt(tempo)>0){
						    scope.resetaContagem(tempo);
					    }
				        scope.activeArea='jogo';
				        scope.activeSubArea='';
                        break;
                    case 2:
                        //somente embaralha as alternativas já carregadas da questão corrente
                        scope.questoes[(scope.perguntaAtual-1)].Alternativas.sort(function() {
		                    return .5-Math.random();
	                    });	
                        scope.TempoPreviewRestante=0;
					    var tempo = scope.questoes[scope.perguntaAtual-1].TempoPreview;
					    if(parseInt(tempo)>0){
						    scope.resetaContagem(tempo);
					    }
				        scope.activeArea='jogo';
				        scope.activeSubArea='';
                        break;
                    case 3:
                        //carrega uma nova questão
                        scope.proxima();
                        break;
                    case 4:
                        //troca o enunciado, mantendo as alternativas
                        //BUG EXISTENTE: corrigir para optar por uma nova questão do mesmo tipo de questão
                        var proximaQuestao = scope.perguntaAtual
                        var questaoCorrente = (scope.perguntaAtual-1);
                        if(scope.perguntaAtual==scope.questoes.length){
                            proximaQuestao=1;
                        }
                        scope.questoes[proximaQuestao].Alternativas = angular.copy(scope.questoes[proximaQuestao].CacheAlternativas).splice(0,1);
                        for(var i=1;i<scope.questoes[questaoCorrente].Alternativas.length;i++){
                            if(scope.questoes[questaoCorrente]) if(scope.questoes[questaoCorrente].Alternativas) if(scope.questoes[questaoCorrente].Alternativas instanceof Array) if(scope.questoes[questaoCorrente].Alternativas[i]) if(scope.questoes[questaoCorrente].Alternativas[i].Id!=scope.questoes[proximaQuestao].Alternativas.Id){
                                scope.questoes[proximaQuestao].Alternativas.push(scope.questoes[questaoCorrente].Alternativas[i]);
                            }
                        }
                        //caso faltem alternativas, complementa com alternativas sorteadas do cache
                        if(scope.questoes[scope.perguntaAtual].Alternativas.length<scope.questoes[scope.perguntaAtual].MaximoAlternativas){
                            var tempQuestoes = [];
                            var arrAlternativasJaUtilizadas = [];
                            var arrAlternativas = [];
                            var questaoAtual = scope.questoes[proximaQuestao];
                            for(var tmpQuestao in scope.questoes){
                                if(questao!=tmpQuestao){
                                    for(var alternativa in scope.questoes[tmpQuestao].Alternativas){
                                        if(scope.questoes[tmpQuestao].Alternativas[alternativa]) if(scope.questoes[tmpQuestao].Alternativas[alternativa].Tipo==questaoAtual.Alternativas[0].Tipo){
                                            if(scope.questoes[tmpQuestao].Enunciado.Id!=questaoAtual.Enunciado.Id){
                                                tempQuestoes.push(angular.copy(scope.questoes[tmpQuestao]));
                                            }
                                        }
                                    }
                                }
                            }
                            if(tempQuestoes.length>0){
                                var limitador=0;
                                while(scope.questoes[proximaQuestao].Alternativas.length<scope.questoes[proximaQuestao].MaximoAlternativas && limitador<(scope.questoes[proximaQuestao].MaximoAlternativas*10)){
                                    var questaoSorteada = Math.round(Math.random()*tempQuestoes.length-1);
                                    if(questaoSorteada<=tempQuestoes.length) if(tempQuestoes[questaoSorteada]) if(tempQuestoes[questaoSorteada].Enunciado) if(tempQuestoes[questaoSorteada].Enunciado.Id != scope.questoes[proximaQuestao].Enunciado.Id) if(tempQuestoes[questaoSorteada].Alternativas) if(tempQuestoes[questaoSorteada].Alternativas instanceof Array) if(tempQuestoes[questaoSorteada].Alternativas.length>0){
                                        var alternativaSorteada = Math.round(Math.random()*tempQuestoes[questaoSorteada].Alternativas.length-1);
                                        if(alternativaSorteada<=tempQuestoes[questaoSorteada].Alternativas.length) if(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada]) if(arrAlternativas[0].Id!=tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Id) if(arrAlternativasJaUtilizadas.indexOf(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Id)==-1) if(scope.questoes[proximaQuestao].Alternativas[0].Tipo==tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Tipo){
                                            arrAlternativasJaUtilizadas.push(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Id);
                                            tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Correta = false;
                                            scope.questoes[proximaQuestao].Alternativas.push(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada]);
                                        }
                                    }
                                    limitador++;
                                }
                            }    
                        }
                        scope.proxima();
                        break;
                    default:
                        //repete a mesma pergunta com as mesmas alternativas
                        scope.perguntaAtual--;
                        scope.proxima();
                        break;
                }
			};
			
			scope.iniciarJogo=function(bolPreservaPontucao){
				scope.sorteiaQuestoes();
				scope.perguntaAtual=1;
				if(!bolPreservaPontucao)
					scope.PontosTotal = 0;
				scope.TempoPreviewRestante=0;
				var tempo = scope.questoes[0].TempoPreview;
				if(parseInt(tempo)>0){
					scope.resetaContagem(tempo);
				}
				scope.activeArea='jogo';
				scope.activeSubArea='';
			};
			
			scope.confereResposta=function(questao,alternativa){
				var bolProssegue=true;
				if(scope.questoes[scope.perguntaAtual-1].TempoPreview>0) if(scope.TempoPreviewRestante>0){
					bolProssegue=false;
				}
				if(bolProssegue){
					var acertou=(alternativa.IdQuestao==questao.Enunciado.Id)?true:false;
                    if(!acertou){
                        acertou=(alternativa.Envio.Id==questao.Enunciado.Envio.Id)?true:false;
                    }
                    if(!acertou){
                        acertou=(alternativa.Envio.Inscricao.Id==questao.Enunciado.Envio.Inscricao.Id)?true:false;
                    }
					scope.activeArea='feedback';
					if(acertou){
						scope.activeSubArea='acertou';	
						scope.PontosTotal = scope.PontosTotal + scope.pontuacaoRecebida();
						if(scope.perguntaAtual<scope.questoes.length) if(scope.questoes[scope.perguntaAtual].Tentativas>0){
							scope.questoes[scope.perguntaAtual].Consumido=0;
						}
					}
					else{
                        scope.activeSubArea='errou';
						if(scope.questoes[(scope.perguntaAtual-1)].Tentativas>0){
							scope.questoes[(scope.perguntaAtual-1)].Consumido++;
                            if(scope.questoes[(scope.perguntaAtual-1)].Tentativas==scope.questoes[(scope.perguntaAtual-1)].Consumido){
                                scope.salvarRanking();
                            }
						}
                        else{
                            scope.salvarRanking();
                        }
					}
				}
			};

            scope.salvarRanking=function(){
                var path = "/AVA/Projetos/JogoAssociacao/SalvarRankingJogoAssociacao/?_=" + new Date().getTime();

				var parametros = {
					intPontuacao: scope.PontosTotal,
                    idJogoAssociacao : scope.configJogo.Id,
                    idUsuarioRequest : scope.usuario.Id,
                    intRegPorPagina: scope.intRegPorPagina,
                    idCategoria : 0,
                    token:""
				};
                if(scope.validaParametros(parametros)){
				    $timeout(function(){
					    $http({
						    url: path,
						    method: "POST",
                            cache: false,
                            data:  angular.toJson(parametros),
						    params: parametros
					    }).success(function (data) {
						    if (data) if (data instanceof Object) {
							    if (data.status) if (!isNaN(data.status)) if (parseInt(data.status) >= 0) {
								    //salvo com sucesso
							        //atualiza o Ranking
							        if (data.listaRanking) if (data.listaRanking instanceof Array) if (data.listaRanking.length > 0) {
								        scope.Ranking = data.listaRanking;
							        }
							    }
                            }
						    scope.loadInProgress = false;
						    scope.appendInProgress = false;
					    }).error(function (err) {
						    console.log("Não foi possível buscar materiais da etapa");
					    }).finally(function(){
						
					    });
				    },150);
                }
                else{
                    console.log("Parametros inválidos");
					scope.loadInProgress = false;
					scope.appendInProgress = false;
                    scope.activeSubArea='errou';
                }
            };

            scope.validaParametros=function(params){
                var retorno=true;
                for(var attr in params){
                    if(typeof(params[attr])=="undefined"){
                        retorno=false;
                    }
                }
                if(retorno)
                    params.token = md5("token("+JSON.stringify(params)+")");  
                
                return retorno;
            };

            scope.setSessionIdentity=function(value){
                sessionStorage["SessionIdentity"] = value;
            }

            scope.getSessionIdentity=function(key){
                return sessionStorage["SessionIdentity"];
            }
			
			scope.pontuacaoRecebida=function(){
				var pontos = 0;
				if(scope.perguntaAtual>0){
					if(scope.questoes[scope.perguntaAtual-1].Tentativas>0){
						//regra: pontuação da questão - no. de erros
						pontos = scope.questoes[scope.perguntaAtual-1].Pontos;
                        if(scope.questoes[scope.perguntaAtual-1].PontosErro>0){
						    pontos = pontos - ((scope.questoes[scope.perguntaAtual-1].Consumido)*(scope.questoes[scope.perguntaAtual-1].PontosErro));
                        }
                        else{
                            pontos = pontos - scope.questoes[scope.perguntaAtual-1].Consumido;
                        }
					}
					else{
						pontos = scope.questoes[scope.perguntaAtual-1].Pontos;
					}
				}
				return pontos;
			};
			
			scope.sorteiaQuestoes=function(tipo){
                //console.log("sorteando");
                scope.loadInProgress=true;
				if(scope.configJogo) if(scope.configJogo.Aleatorio){
                    var tipoSorteio = 0;
                    if(tipo) if(!isNaN(tipo)) if(parseInt(tipo)>0){
                        tipoSorteio = parseInt(tipo);
                    }
                    switch(tipoSorteio){
                        case 1:
                            //mantem alternativas inalteradas, porem alteram as ordens dos questões
                            scope.questoes.sort(function() {
                                return .5-Math.random();
                            });
                            for(var questao in scope.questoes){
                                scope.questoes[questao].Consumido=0;
                            }
                            break;
                        case 2:
                            //mantem enunciados na mesma ordem, porem realiza o sorteio de novas alternativas para cada questão
                            scope.questoes = angular.copy(scope.CacheQuestoes);
                            for(var questao in scope.questoes){
                                scope.questoes[questao].Consumido=0;
                                scope.questoes[questao].Alternativas = scope.misturarAlternativas(questao);
                            }
                            break;
                        case 3:
                            //somente se alteram as ordens dos enunciados e das alternativas
                            scope.questoes.sort(function() {
                                return .5-Math.random();
                            });
                            for(var questao in scope.questoes){
                                scope.questoes[questao].Consumido=0;
                                scope.questoes[questao].Alternativas.sort(function() {
		                            return .5-Math.random();
	                            });	
                            }
                            break;
                        default:
                            //alteram as ordens dos enunciados e realiza o sorteio de novas alternativas para cada questão
                            scope.questoes = angular.copy(scope.CacheQuestoes);
                            for(var questao in scope.questoes){
                                scope.questoes[questao].Consumido=0;
                                scope.questoes[questao].Alternativas = scope.misturarAlternativas(questao);
                            }
                            //alteram as ordens dos enunciados
                            scope.questoes.sort(function() {
                                return .5-Math.random();
                            });
                            break;
                    }
                    scope.safeApply();
                }
                scope.loadInProgress=false;
			};

            scope.misturarAlternativas=function(questao){
                //realiza novamente o sorteio das alternativas de cada questão
                //mantém a alternativa certa em posição aleatória e concatena mais N alternativas do mesmo tipo
                //conforme o número máximo de alternativas da questão
                var arrAlternativasJaUtilizadas = [];
                var arrEnviosJaUtilizados = [];
                var arrInscricoesJaUtilizadas = [];
                //scope.questoes[questao].Alternativas = new Array();

                var arrAlternativas = [];
                var questaoAtual = {};
                if(questao instanceof Object){
                    arrAlternativas = angular.copy(questao.CacheAlternativas);
                    questaoAtual = questao;
                }
                else if(!isNaN(questao)){
                    arrAlternativas = angular.copy(scope.questoes[questao].CacheAlternativas);
                    questaoAtual = scope.questoes[questao];
                }
                if(arrAlternativas.length>0) if(questaoAtual.MaximoAlternativas>0){
                    if(arrAlternativas.length>1){
                        //sorteia 1 para manter nas alternativas certas
                        var sorteada = angular.copy(arrAlternativas[Math.round(Math.random()*arrAlternativas.length-1)]);
                        arrAlternativas = [];
                        arrAlternativas.push(sorteada);
                    }
                    //filtra as questões que possuem alternativas do mesmo tipo da alternativa da questão corrente
                    //var tempQuestoes = $filter('filter')(scope.CacheQuestoes, { Alternativas: { Tipo : parseInt(questaoAtual.Alternativas[0].Tipo)} }, false);
                    var tempQuestoes = [];
                    for(var tmpQuestao in scope.questoes){
                        if(questao!=tmpQuestao){
                            for(var alternativa in scope.questoes[tmpQuestao].Alternativas){
                                if(scope.questoes[tmpQuestao].Alternativas[alternativa]) if(scope.questoes[tmpQuestao].Alternativas[alternativa].Tipo==questaoAtual.Alternativas[0].Tipo){
                                    if(scope.questoes[tmpQuestao].Enunciado.Id!=questaoAtual.Enunciado.Id){
                                        tempQuestoes.push(angular.copy(scope.questoes[tmpQuestao]));
                                    }
                                }
                            }
                        }
                    }
                    if(tempQuestoes.length>0){
                        var limitador=0;
                        while(arrAlternativas.length<questaoAtual.MaximoAlternativas && limitador<(questaoAtual.MaximoAlternativas*10)){
                            var questaoSorteada = Math.round(Math.random()*tempQuestoes.length-1);
                            if(questaoSorteada<=tempQuestoes.length) if(tempQuestoes[questaoSorteada]) if(tempQuestoes[questaoSorteada].Enunciado) if(tempQuestoes[questaoSorteada].Enunciado.Id != questaoAtual.Enunciado.Id) if(tempQuestoes[questaoSorteada].Alternativas) if(tempQuestoes[questaoSorteada].Alternativas instanceof Array) if(tempQuestoes[questaoSorteada].Alternativas.length>0){
                                var alternativaSorteada = Math.round(Math.random()*tempQuestoes[questaoSorteada].Alternativas.length-1);
                                if(alternativaSorteada<=tempQuestoes[questaoSorteada].Alternativas.length) 
                                if(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada]) 
                                if(questaoAtual.Alternativas[0].Tipo==tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Tipo)
                                if(arrAlternativas[0].Envio.Inscricao.Id!=tempQuestoes[questaoSorteada].Alternativas[0].Envio.Inscricao.Id) 
                                if(arrAlternativas[0].Id!=tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Id) 
                                if(arrAlternativas[0].Envio.Id!=tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Envio.Id) 
                                if(arrAlternativas[0].Envio.Inscricao.Id!=tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Envio.Inscricao.Id) 
                                if(arrAlternativasJaUtilizadas.indexOf(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Id)==-1) 
                                if(arrEnviosJaUtilizados.indexOf(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Envio.Id)==-1) 
                                if(arrInscricoesJaUtilizadas.indexOf(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Envio.Inscricao.Id)==-1) 
                                {
                                    arrAlternativasJaUtilizadas.push(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Id);
                                    arrEnviosJaUtilizados.push(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Envio.Id);
                                    arrInscricoesJaUtilizadas.push(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Envio.Inscricao.Id);
                                    tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada].Correta = false;
                                    arrAlternativas.push(tempQuestoes[questaoSorteada].Alternativas[alternativaSorteada]);
                                }
                            }
                            limitador++;
                        }
                    }
                }
                arrAlternativas.sort(function() {
		            return .5-Math.random();
	            });	

                return arrAlternativas;
            };
			
			scope.proxima=function(){
				if(scope.perguntaAtual==scope.questoes.length){
                    //faz um novo ajax 
                    scope.loadInProgress=true;
                    scope.doAplicarFiltros(0,false,true,false);
					//faz o loop infinito para começar novamente o jogo 
					//scope.iniciarJogo(true);
				}
				else{
					scope.perguntaAtual++;
					scope.TempoPreviewRestante=0;
					var tempo = scope.questoes[scope.perguntaAtual-1].TempoPreview;
					if(parseInt(tempo)>0){
						scope.resetaContagem(tempo);
					}
				}
				scope.activeArea='jogo';
				scope.activeSubArea='';
			};
			
			scope.resetaContagem=function(tempo){
				scope.timeFinal = (new Date()).getTime()+(parseInt(tempo)*1000)+999;
				scope.TempoPreviewRestante = parseInt((scope.timeFinal-(new Date()).getTime())/1000);
				if(scope.controleIntervalo)
					clearInterval(scope.controleIntervalo);
				scope.controleIntervalo = setInterval(function(){
					if(scope.TempoPreviewRestante>0){
						scope.TempoPreviewRestante = parseInt((scope.timeFinal-(new Date()).getTime())/1000);
					}
					else{
						if(scope.controleIntervalo)
							clearInterval(scope.controleIntervalo);	
						scope.controleIntervalo = undefined;
					}
					scope.safeApply();
				},500);
			};
			
			scope.Right = function (str, n) {
				if (n <= 0)
					return "";
				else if (n > String(str).length)
					return str;
				else {
					var iLen = String(str).length;
					return String(str).substring(iLen, iLen - n);
				}
			};

            //(isImage(alternativa.Conteudo))?(questao.TempoPreview==0)?alternativa.Conteudo:(TempoPreviewRestante>0)?'/AVA/StaticContent/Projetos/Projeto/2015/comofunciona/imagens/pergunta.jpg':(TempoPreviewRestante==0)?alternativa.Conteudo:'/AVA/StaticContent/Projetos/Projeto/2015/comofunciona/imagens/pergunta.jpg':''
            //getBackImageAlternativa(questao,alternativa)
            scope.getBackImageAlternativa=function(questao,alternativa){
                if(scope.isImage(alternativa.Conteudo)){
                    if(questao.TempoPreview==0){
                        return alternativa.Conteudo;
                    }
                    else{
                        if(scope.TempoPreviewRestante>0){
                            return '/AVA/StaticContent/Projetos/Projeto/2016/comofunciona/imagens/pergunta.jpg';
                        }
                        else{
                            if(scope.TempoPreviewRestante==0){
                                return alternativa.Conteudo
                            }
                            else{
                                return '/AVA/StaticContent/Projetos/Projeto/2016/comofunciona/imagens/pergunta.jpg';
                            }
                        }
                    }
                }
                else {
                    return '';
                }
            };

            scope.isImage = function (valor) {
				if(valor) if(valor!='') if(valor.indexOf('.')!=-1) if(['jpg','png','jpeg','bmp','gif','tif'].indexOf(valor.toLowerCase().substr(valor.toLowerCase().lastIndexOf('.')+1))!=-1)
					return true;
                return false;
            };

            scope.isVideo = function (valor) {
				if(valor) if(valor!='') if(valor.indexOf('.')!=-1) if(valor.indexOf('youtu')!=-1||valor.indexOf('vimeo')!=-1)
					return true;
                return false;
            };

            scope.intTipoConteudo = function (obj) {
                var found = false;
                if(obj){
                    if(obj.Tipo) if(!isNaN(obj.Tipo)) if(obj.Tipo>0){
                        switch(obj.Tipo){
                            case 5:
                            case 13:
                            case 14:
                                //texto
                                return 1;
                                break;
                            case 6:
                            case 7:
                            case 15:
                            case 16:
                                //mídias
                                return 2;
                                break;
                        }
                    }
                    if(!found) if(obj.Conteudo) if(obj.Conteudo!="") if(obj.Conteudo.indexOf('.')!=-1) if(['jpg','png','jpeg','bmp','gif','tif'].indexOf(obj.Conteudo.toLowerCase().substr(obj.Conteudo.toLowerCase().lastIndexOf('.')+1))!=-1){
    			        return 2;
                    }
                }
                return 1;
            };

			scope.aplicarFiltros = function (level,bolAppend,resetJogo,loadRanking) {
				var carregado = false;
				if(scope.questoes) if(scope.questoes instanceof Array) if(scope.questoes.length>0){
					carregado = true;
				}
				if(!carregado){
					if(scope.controleAssincrono)
						clearTimeout(scope.controleAssincrono);
					scope.doAplicarFiltros(level,bolAppend,resetJogo,loadRanking);
				}
				else{
					if(scope.controleAssincrono)
						clearTimeout(scope.controleAssincrono);
					scope.controleAssincrono = setTimeout(function(){
						scope.doAplicarFiltros(level,bolAppend,resetJogo,loadRanking);
					},500);
				}
			};

			scope.doAplicarFiltros = function (level,bolAppend,resetJogo,loadRanking) {
				if(bolAppend){
					scope.intPagina=scope.intPagina+1;
				}
				else{
					scope.intPagina=1;
				}
				scope.currentLevel=level;

				var _self=this;

				var idEstado = '';
				var idEscola = 0;
				var idTurma = 0;
				var idCategoria = 0;
				var strUF = '';
				if (scope.EstadoSelecionado) if (scope.EstadoSelecionado.Sigla) if (scope.EstadoSelecionado.Sigla != "") {
					idEstado = scope.EstadoSelecionado.Sigla;
				}
				if (scope.EscolaSelecionada) if (scope.EscolaSelecionada.Id) if (!isNaN(scope.EscolaSelecionada.Id)) if (parseInt(scope.EscolaSelecionada.Id)>0){
					idEscola = parseInt(scope.EscolaSelecionada.Id);
				}
				if (scope.TurmaSelecionada) if (scope.TurmaSelecionada.Id) if (!isNaN(scope.TurmaSelecionada.Id)) if (parseInt(scope.TurmaSelecionada.Id)>0){
					idTurma = parseInt(scope.TurmaSelecionada.Id);
				}
				if (scope.CategoriaSelecionada) if (scope.CategoriaSelecionada.Id) if (!isNaN(scope.CategoriaSelecionada.Id)) if (parseInt(scope.CategoriaSelecionada.Id)>0){
					idCategoria = parseInt(scope.CategoriaSelecionada.Id);
				}
				//aplica filtragens nas combos após a seleção
				switch (level) {
					case 0:
						//filtra as Escolas conforme o Estado selecionado
						scope.EscolaSelecionada = undefined;
						scope.TurmaSelecionada = undefined;
						scope.Turmas = [];
						if (idEstado.length == 2) {
							//filtra as escolas conforme o estado selecionado
							var escolas = $filter('filter')(scope.CacheEscolas, { Estado: idEstado }, true);
							scope.Escolas = angular.copy(escolas);
						}
						else {
							scope.Escolas = angular.copy(scope.CacheEscolas);
						}
						break;
					case 1:
						//filtra as turmas conforme a escola selecionada
						scope.TurmaSelecionada = undefined;
						if (idEscola>0) {
							//filtra as escolas conforme o estado selecionado
							var turmas = $filter('filter')(scope.CacheTurmas, { Escola: { Id : idEscola} }, true);
							turmas=$filter('unique')(turmas,"Id");
							scope.Turmas = angular.copy(turmas);
						}
						else {
							scope.Turmas = [];
						}
						break;
				}
				var idEscola = 0;
				var idTurma = 0;
				if (scope.EscolaSelecionada) if (scope.EscolaSelecionada.Id) if (!isNaN(scope.EscolaSelecionada.Id)) if (parseInt(scope.EscolaSelecionada.Id)>0){
					idEscola = parseInt(scope.EscolaSelecionada.Id);
				}
				if (scope.TurmaSelecionada) if (scope.TurmaSelecionada.Id) if (!isNaN(scope.TurmaSelecionada.Id)) if (parseInt(scope.TurmaSelecionada.Id)>0){
					idTurma = parseInt(scope.TurmaSelecionada.Id);
				}

				//reseta/recarrega todos os elementos
				scope.CacheEscolasFinal = angular.copy(scope.CacheEscolas);
				if(!bolAppend){
					//scope.Ranking = [];
					scope.loadInProgress = true;
				}
				else{
					scope.appendInProgress = true;
				}
                if(loadRanking)
                    scope.loadingRanking = true;

				scope.TotalParticipantes = 0;
                var tipoSolicitacao=0;
                /*
                if(tipo) if(!isNaN(tipo)) if(tipo>0){
                    tipoSolicitacao=tipo;
                }
                */
				var path = "/AVA/Projetos/JogoAssociacao/GetDadosJogoAssociacao/?_=" + new Date().getTime();
                if(resetJogo){
                    tipoSolicitacao=1;  
                }
                if(loadRanking){
                    tipoSolicitacao=2;
                }
				var parametros = {
					idProjeto: scope.edicao.Projeto.Id,
					idEdicao: scope.edicao.Id,
					idEtapa: 0,
					idEscola : idEscola,
					strUF : idEstado,
					idTurma: idTurma,
					intPagina: scope.intPagina,
					intRegPorPagina: scope.intRegPorPagina,
					idCategoria: idCategoria,
                    intOrdenacao: 0,
                    tipoSolicitacao : tipoSolicitacao 
				};
				if (scope.intPagina == 1){
					scope.TotalParticipantes = 0;
        		}
				$timeout(function(){
					$http({
						url: path,
						method: "POST",
						params: parametros
					}).success(function (data) {
						if (data) if (data instanceof Object) {
							if (data.TotalParticipantes) if (!isNaN(data.TotalParticipantes)) if (parseInt(data.TotalParticipantes) >= 0) {
								scope.TotalParticipantes = parseInt(data.TotalParticipantes);
							}
							var inicializar=true;
							if(scope.CacheEscolas) if(scope.CacheEscolas instanceof Array) if(scope.CacheEscolas.length>0){
								inicializar=false;
							}
							if(inicializar || resetJogo){
								//lista de escolas/estados para os filtros

								if(scope.CacheEscolas.length==0) if (data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0) {
									scope.CacheEscolas = data.listaEscolas;
									var temp = ",";
									scope.Escolas = angular.copy(scope.CacheEscolas);
									scope.Estados = [];
									for (var escola in scope.Escolas) {
										if (temp.indexOf("," + scope.Escolas[escola].Estado + ",") == -1) {
											temp += scope.Escolas[escola].Estado + ",";
											scope.Estados.push({
												Estado: scope.getEstadoByUf(scope.Escolas[escola].Estado),
												Sigla: scope.Escolas[escola].Estado
											});
										}
									}
									if (scope.Estados.length > 0){
										scope.Estados.sort();
										scope.CacheEstados = angular.copy(scope.Estados);
									}
								}

								//lista de turmas para os filtros
								if (scope.CacheTurmas) if (scope.CacheTurmas instanceof Array) if (scope.CacheTurmas.length == 0) if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {
									scope.CacheTurmas = data.listaTurmas;
									scope.Turmas = angular.copy(scope.CacheTurmas);
									if (idEscola>0) {
										//filtra as escolas conforme a escola selecionada
										var turmas = $filter('filter')(scope.CacheTurmas, { Escola: { Id : idEscola} }, true);
										scope.Turmas = angular.copy(turmas);
									}
								}
								
								//lista das questões
								if (scope.CacheQuestoes) if (scope.CacheQuestoes instanceof Array) if ((scope.CacheQuestoes.length == 0) || resetJogo) if (data.listQuestoes) if (data.listQuestoes instanceof Array) if (data.listQuestoes.length > 0) {
                                    
									scope.CacheQuestoes = angular.copy(data.listQuestoes);
                                    for(var idxQuestao in scope.CacheQuestoes){
                                        scope.CacheQuestoes[idxQuestao].CacheAlternativas = new Array();
                                        if(scope.CacheQuestoes[idxQuestao]) if(scope.CacheQuestoes[idxQuestao].Alternativas) if(scope.CacheQuestoes[idxQuestao].Alternativas instanceof Array){
                                            scope.CacheQuestoes[idxQuestao].CacheAlternativas = angular.copy(scope.CacheQuestoes[idxQuestao].Alternativas);
                                        }
                                        //normaliza os timestamps do tempo da questão convertendo para o no. de segundos 
                                        scope.CacheQuestoes[idxQuestao].Consumido=0;
                                        scope.CacheQuestoes[idxQuestao].TempoPreview = parseInt(scope.CacheQuestoes[idxQuestao].TempoPreview.substr(6));
                                        if(scope.CacheQuestoes[idxQuestao].TempoPreview>999)
                                            scope.CacheQuestoes[idxQuestao].TempoPreview = scope.CacheQuestoes[idxQuestao].TempoPreview/1000;
                                    }
                                    
									if (idCategoria>0) {
										//filtra as questões de acordo com a categoria
										var questoes = $filter('filter')(scope.CacheQuestoes, { Categoria: { Id : idCategoria} }, true);
										scope.questoes = angular.copy(questoes);
									}
                                    else{
                                        scope.questoes = angular.copy(scope.CacheQuestoes);
                                    }
								}
								
								if (data.jogoConfig) if (data.jogoConfig instanceof Object) {
									scope.configJogo = data.jogoConfig;
								}

								if (data.listaCategorias) if (data.listaCategorias instanceof Array) if (data.listaCategorias.length > 0) {
									scope.Categorias = data.listaCategorias;
								}
							}
							//popula os Rankings toda vez que se chama
							if (data.listaRanking) if (data.listaRanking instanceof Array) if (data.listaRanking.length > 0) {
								if(bolAppend){
									for(var participante in data.listaRanking){
										scope.Ranking.push(data.listaRanking[participante]);
									}
								}
								else{
									scope.Ranking = data.listaRanking;
								}
							}
                            if(resetJogo){
                                scope.iniciarJogo(true);
                            }
						}
                        scope.loadingRanking = false;
						scope.loadInProgress = false;
						scope.appendInProgress = false;
					}).error(function (err) {
						console.log("Não foi possível buscar materiais da etapa");
					}).finally(function(){
						
					});
				},150);
			};

			scope.getEstadoByUf = function (strUF) {
				var arrNomes = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
				var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
				return arrNomes[arrSiglas.indexOf(strUF)];
			};

            scope.init = function () {
                //scope.edicao;
                scope.defaultConfig = scope.config;
                //scope.resultado;
                //scope.usuario;
                //scope.dados;
                scope.aplicarFiltros(0,false,false,false);
                scope.activeArea='inicio';
            };
            scope.init();
			//scope.safeApply();

            
        }
    };
}]);

angular.module('resultado').controller('ComoFuncionaJogo2016Ctrl', 
["$http", "$scope", "$timeout", "$filter", "$location", controleQuiz]);
