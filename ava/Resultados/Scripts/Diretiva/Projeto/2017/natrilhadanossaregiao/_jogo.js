
function controleTrilha($http, $scope, $timeout, $filter, $location) {
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


angular.module('resultado').directive('jogoTrilha',['$http','$timeout','$filter', function ($http, $timeout, $filter) {
    return {
        restrict: 'AEC',
        //replace: true,
        transclude: true,
        scope: {
            edicao: "=",
            config: "=",
            resultado: "=",
            usuario: "=",
            dados: "="
        },
        templateUrl: function (element, attrs) {
            return '/AVA/Resultados/Scripts/Diretiva/Projeto/2017/natrilhadanossaregiao/trilha.html';
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
		    
			scope.jogoTrilha = {
			    Id: 0,
                IdProjetoEdicao: 0,
                Titulo: "",
                Orientacao: "",
                ConfiguracaoJogo: [],
                ConfiguracaoUsuario: { Id : 0 }
			};

			scope.infoModal = {
			    UF: "",
			    Cidade: "",
			    Escola: "",
			    Nome: "",
			    Foto: "",
			    IdJogoTrilhaTipoCarta: 1,
			    TipoCarta: "",
			    Capa: "",
			    NumeroCasaSorteReves: "",
			    TextoEndereco: "",
			    TextoLocal: "",
			    ConteudoImagem: [],
			    ConteudoAudio: [],
			    ConteudoVideo: [],
			    ConteudoTexto: [],
			    ConteudoPortal: []
			};
			scope.cartaJogoEmUso = [];
			scope.cartaJogo = [];
			scope.cartaConteudo = [];
			scope.cartaConteudoPortal = [];
			scope.novaTrilha = { IdConfiguracaoJogo: 0, intTipoDesenho: 0 };

			scope.ConfigTipoDesenhoTrilha = [
                { "intTipoDesenho": 1, "strTipoDesenho": "Trilha U" },
                { "intTipoDesenho": 2, "strTipoDesenho": "Trilha C" },
                { "intTipoDesenho": 3, "strTipoDesenho": "Trilha Z" },
			];

			scope.mudandoInfoModal = false;
			scope.loadingGameData = true;
			//scope.loadInProgress = true;
			scope.activeArea = '';
			scope.activeSubArea = '';
           
			//console.log('===scope.edicao===');
			//console.log(scope.edicao);
            			
			scope.resetarJogo = function () {
			    scope.cartaJogoEmUso = [];
			};

			scope.close=function(){
				window.close();
			};

            scope.changeState=function(novo){
                if(scope.activeArea!=novo){
                    scope.activeArea = novo;
                }                
            };

            scope.gerarNovaTrilha = function () {
                scope.novaTrilha = { IdConfiguracaoJogo: 0, intTipoDesenho: 0 };

                scope.changeState('novatrilha');
            };
						
			scope.iniciarJogo=function(){
				scope.activeArea='jogo';
			    //scope.activeSubArea='';

				scope.resetarJogo();
			};

			scope.telaInicio = function () {
			    scope.changeState('inicio');
			};

			scope.instrucaoQrcode = function () {
			    scope.changeState('qrcode');
			};

			scope.instrucaoComoJogar = function () {
			    scope.changeState('comojogar');
			};

            scope.setSessionIdentity=function(value){
                sessionStorage["SessionIdentity"] = value;
            }

            scope.getSessionIdentity=function(key){
                return sessionStorage["SessionIdentity"];
            }						
			
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
                    if (obj.IdFormularioCampoTipo) if (!isNaN(obj.IdFormularioCampoTipo)) if (obj.IdFormularioCampoTipo > 0) {
                        switch (obj.IdFormularioCampoTipo) {
                            case 5:
                            case 13:
                            case 14:
                                //texto
                                return 1;
                                break;
                            case 6:
                            case 7:
                                //Imagem
                                return 2;
                                break;
                            case 15:
                            case 16:
                                //Vídeo
                                return 3;
                                break;
                            case 1:
                            case 2:
                                //Áudio
                                return 4;
                                break;
                        }
                    }

                    if(!found) if(obj.Conteudo) if(obj.Conteudo!="") if(obj.Conteudo.indexOf('.')!=-1) if(['jpg','png','jpeg','bmp','gif','tif'].indexOf(obj.Conteudo.toLowerCase().substr(obj.Conteudo.toLowerCase().lastIndexOf('.')+1))!=-1){
    			        return 2;
                    }

                }
                return 1;
            };			

			scope.getEstadoByUf = function (strUF) {
				var arrNomes = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
				var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
				return arrNomes[arrSiglas.indexOf(strUF)];
			};

			scope.NumeroCasaTrilha = function () {
			    return scope.jogoTrilha.ConfiguracaoUsuario.ConfiguracaoJogo.NumeroCasa;
			};

			scope.TipoDesenhoTrilha = function () {
			    return scope.jogoTrilha.ConfiguracaoUsuario.TipoDesenho;
			};

			scope.GetCartasJogo = function () {
			    var aCartasFiltrado = [];

			    angular.forEach(scope.cartaConteudo, function (obj, index) {
			        aCartasFiltrado.push({
			            "IdJogoTrilhaCarta": obj.IdJogoTrilhaCarta,
			            "IdJogoTrilhaTipoCarta": obj.IdJogoTrilhaTipoCarta,
			            "TipoCarta": obj.TipoCarta

			        });
			    });
			    return aCartasFiltrado = $filter('unique')(aCartasFiltrado, 'IdJogoTrilhaCarta');			    
			    //return aCartasFiltrado = $filter('unique')(aCartasFiltrado);
			};

			scope.GetCartasJogoPorTipo = function (pIdTipoCarta) {
			    var aCartasFiltrado = [];

			    angular.forEach(scope.cartaConteudo, function (obj, index) {
			        if (obj.IdJogoTrilhaTipoCarta == pIdTipoCarta) {
			            aCartasFiltrado.push({
			                "IdJogoTrilhaCarta": obj.IdJogoTrilhaCarta,
			                "IdJogoTrilhaTipoCarta": obj.IdJogoTrilhaTipoCarta,
			                "TipoCarta": obj.TipoCarta
			            });
			        }
			    });
			    return aCartasFiltrado = $filter('unique')(aCartasFiltrado, 'IdJogoTrilhaCarta');			    
			};

			scope.GetCartaConteudo = function (idJogoTrilhaCarta) {
			    return $filter('filter')(scope.cartaConteudo, { 'IdJogoTrilhaCarta': idJogoTrilhaCarta }, true);
			};

			scope.GetCartaConteudoPortal = function (idProjetoEdicaoEtapaInscricaoEnvio) {
			    var aConteudoPortalEnvio = $filter('filter')(scope.cartaConteudoPortal, { 'IdProjetoEdicaoEtapaInscricaoEnvio': idProjetoEdicaoEtapaInscricaoEnvio }, true);
			    
			    return aConteudoPortalEnvio;
			};

			scope.CasaOcupada = function (pIntCasa) {
			    var bolOcupada = false;

			    for (var i = 0; i < scope.cartaJogoEmUso.length; i++) {
			        if (scope.cartaJogoEmUso[i].IntCasa == pIntCasa) {
			            bolOcupada = true;
			        }
			    }
			    return bolOcupada;
			};

			scope.SorteiaCasa = function (a) {
			    var bolEscolhendo = true;
			    var intCasaSorteada;
			    var index;

			    do {
			        index = Math.floor(Math.random() * a.length);
			        intCasaSorteada = a[index];
			        if (!scope.CasaOcupada(intCasaSorteada)) {
			            bolEscolhendo = false;
			        }
			        else {
			            a.splice(index, 1);
			        }
			    }
			    while (bolEscolhendo && a.length > 0);

			    if (!bolEscolhendo) {
			        return intCasaSorteada;
			    }
			    else {
			        return 0;
			    }
			};

			scope.DistribuiCartasSorteAzar = function () {
			    var aCartaCont = scope.cartaConteudo;
			    var oCasas = jQuery('button[data-intcasa]');
			    var intCasasCarta = 0;
			    var totCasasTrilha = scope.NumeroCasaTrilha();
			    var aCasasPossiveis = [];
			    var aCasasorte = [];
			    var aCasaAzar = [];
			    var j;

			    oCasas.each(function (i) {
			        var self = jQuery(this);
			        var intCasaTrilha = parseInt(self.attr('data-intcasa'));

			        aCasasPossiveis.push(intCasaTrilha);
			    });			    

			    if (aCasasPossiveis.length > 0) {
			        for (var i = 0; i < aCartaCont.length; i++) {
			            if (aCartaCont[i].BolNumeroCasasSorteReves) {
			                //try {
			                    intCasasCarta = parseInt(aCartaCont[i].Conteudo);
			                    var intCasaSorteada = 0;

			                    if (aCartaCont[i].IdJogoTrilhaTipoCarta == 1) {
			                        //Sorte, Avance
			                        for (j = 0; j < aCasasPossiveis.length; j++) {
			                            if ((totCasasTrilha - aCasasPossiveis[j]) > intCasasCarta) {
			                                aCasasorte.push(aCasasPossiveis[j]);
			                            }
			                        }
			                        intCasaSorteada = scope.SorteiaCasa(aCasasorte);
			                        if (intCasaSorteada > 0) {
			                            scope.cartaJogoEmUso.push({ "IdJogoTrilhaCarta": aCartaCont[i].IdJogoTrilhaCarta, "IntCasa": intCasaSorteada });
			                        }
			                    }

			                    if (aCartaCont[i].IdJogoTrilhaTipoCarta == 3) {
			                        //Azar, volte
			                        for (j = 0; j < aCasasPossiveis.length; j++) {
			                            if (aCasasPossiveis[j] > intCasasCarta) {
			                                aCasaAzar.push(aCasasPossiveis[j]);
			                            }
			                        }
			                        intCasaSorteada = scope.SorteiaCasa(aCasaAzar);
			                        if (intCasaSorteada > 0) {
			                            scope.cartaJogoEmUso.push({ "IdJogoTrilhaCarta": aCartaCont[i].IdJogoTrilhaCarta, "IntCasa": intCasaSorteada });
			                        }
			                    }


			                //}
			                //catch (err) { }
			            }
			        }
			    }
			    
			};

			scope.GetCartaModal = function (event) {
			    var intCasaClicada = parseInt(jQuery(event.currentTarget).attr('data-intcasa'));
			    var aCartas = scope.cartaJogo;			    
			    var idJogoTrilhaCarta = 0;
			    
			    if (scope.cartaJogoEmUso.length == 0) {
			        //primeira acesso, tenta distribuir cartas sorte/azar nas casas em que é possível, conforme regras
			        scope.DistribuiCartasSorteAzar();
			    }

			    for (var i = 0; i < scope.cartaJogoEmUso.length; i++) {
			        for (var j=0; j<aCartas.length; j++) {
			            if (aCartas[j].IdJogoTrilhaCarta == scope.cartaJogoEmUso[i].IdJogoTrilhaCarta) {
                            //Se estiver usando, remove
			                aCartas.splice(j, 1);
			            }
			        }

			        if (scope.cartaJogoEmUso[i].IntCasa == intCasaClicada) {
			            idJogoTrilhaCarta = scope.cartaJogoEmUso[i].IdJogoTrilhaCarta;
			        }
			    }
			    
			    if (idJogoTrilhaCarta > 0) {
			        //Ja tem uma escolhida
			        scope.SetInfoModal(idJogoTrilhaCarta);
			    }
			    else {
                    //Pega uma nova
			        if (aCartas.length > 0) {
			            var cartaEscolhida = aCartas[Math.floor(Math.random() * aCartas.length)];

			            scope.cartaJogoEmUso.push({ "IdJogoTrilhaCarta": cartaEscolhida.IdJogoTrilhaCarta, "IntCasa": intCasaClicada });
			            scope.SetInfoModal(cartaEscolhida.IdJogoTrilhaCarta);
			        }
			        else {
			            //Todas as cartas foram usadas, e esta tentando buscar uma nova
			            //tenta mostrar uma carta do tipo informação
			            //console.log('Faltou cartas.');
			            var aCartaInfo = scope.GetCartasJogoPorTipo(5);
			            if (aCartaInfo.length > 0) {
			                scope.SetInfoModal(aCartaInfo[Math.floor(Math.random() * aCartaInfo.length)].IdJogoTrilhaCarta);
			            }
			            else {
			                console.log('Não foi possível encontrar uma carta!');
			            }
			        }			        
			    }
			};

			scope.newInfoModal = function () {
			    scope.infoModal = {
			        UF: "",
			        Cidade: "",
			        Escola: "",
			        Nome: "",
			        Foto: "",
			        IdJogoTrilhaTipoCarta: 1,
			        TipoCarta: "",
			        Capa: "",
			        NumeroCasaSorteReves: "",
			        TextoEndereco: "",
			        TextoLocal: "",
			        ConteudoImagem: [],
			        ConteudoAudio: [],
			        ConteudoVideo: [],
			        ConteudoTexto: [],
                    ConteudoPortal: []
			    };                
			};

			scope.SetInfoModal = function (pIdJogoTrilhaCarta) {
			    var aCartaConteudo = scope.GetCartaConteudo(pIdJogoTrilhaCarta);			    

			    scope.newInfoModal();
			    scope.mudandoInfoModal = true;

			    if (aCartaConteudo.length > 0) {
			        scope.infoModal.UF = aCartaConteudo[0].UF;
			        scope.infoModal.Cidade = aCartaConteudo[0].Cidade;
			        scope.infoModal.Escola = aCartaConteudo[0].Escola;
			        scope.infoModal.Nome = aCartaConteudo[0].Nome;
			        scope.infoModal.Foto = aCartaConteudo[0].Foto;
			        scope.infoModal.IdJogoTrilhaTipoCarta = aCartaConteudo[0].IdJogoTrilhaTipoCarta;
			        scope.infoModal.TipoCarta = aCartaConteudo[0].TipoCarta;
			        if (scope.cartaConteudoPortal.length > 0) {
			            scope.infoModal.ConteudoPortal = scope.GetCartaConteudoPortal(aCartaConteudo[0].IdProjetoEdicaoEtapaInscricaoEnvio);
			        }

			        var bolUsado = false;
			        for (var i = 0; i < aCartaConteudo.length; i++) {

			            bolUsado = false;
			            if (aCartaConteudo[i].BolImagemCapa) {
			                scope.infoModal.Capa = aCartaConteudo[i].Conteudo;
			                bolUsado = true;
			            }

			            if (aCartaConteudo[i].BolNumeroCasasSorteReves && !bolUsado) {
			                scope.infoModal.NumeroCasaSorteReves = aCartaConteudo[i].Conteudo;
			                bolUsado = true;
			            }

			            if (aCartaConteudo[i].BolTextoEndereco && !bolUsado) {
			                scope.infoModal.TextoEndereco = aCartaConteudo[i].Conteudo;
			                bolUsado = true;
			            }

			            if (aCartaConteudo[i].BolTextoLocal && !bolUsado) {
			                scope.infoModal.TextoLocal = aCartaConteudo[i].Conteudo;
			                bolUsado = true;
			            }

			            if (scope.intTipoConteudo(aCartaConteudo[i]) == 1 && !bolUsado) {
			                scope.infoModal.ConteudoTexto.push({ "Conteudo": aCartaConteudo[i].Conteudo, "TituloCampo": aCartaConteudo[i].TituloCampo, "TituloCampoVisualizacao": aCartaConteudo[i].TituloCampoVisualizacao });
			                bolUsado = true;
			            }

			            if (scope.intTipoConteudo(aCartaConteudo[i]) == 2 && !bolUsado) {
			                scope.infoModal.ConteudoImagem.push({ "Conteudo": aCartaConteudo[i].Conteudo, "ConteudoLegenda": aCartaConteudo[i].ConteudoLegenda, "TituloCampo": aCartaConteudo[i].TituloCampo, "TituloCampoVisualizacao": aCartaConteudo[i].TituloCampoVisualizacao, "IntOrdemCampo": aCartaConteudo[i].IntOrdemCampo });
			                bolUsado = true;

			                //console.log(aCartaConteudo[i]);
			            }

			            if (scope.intTipoConteudo(aCartaConteudo[i]) == 3 && !bolUsado) {
			                scope.infoModal.ConteudoVideo.push({ "Conteudo": aCartaConteudo[i].Conteudo, "ConteudoLegenda": aCartaConteudo[i].ConteudoLegenda, "TituloCampo": aCartaConteudo[i].TituloCampo, "TituloCampoVisualizacao": aCartaConteudo[i].TituloCampoVisualizacao, "IntOrdemCampo": aCartaConteudo[i].IntOrdemCampo });
			                bolUsado = true;
			            }

			            if (scope.intTipoConteudo(aCartaConteudo[i]) == 4 && !bolUsado) {
			                scope.infoModal.ConteudoAudio.push({ "Conteudo": aCartaConteudo[i].Conteudo, "ConteudoLegenda": aCartaConteudo[i].ConteudoLegenda, "TituloCampo": aCartaConteudo[i].TituloCampo, "TituloCampoVisualizacao": aCartaConteudo[i].TituloCampoVisualizacao, "IntOrdemCampo": aCartaConteudo[i].IntOrdemCampo });
			                bolUsado = true;
			            }

			        }
			    }
			    //aConteudoPortalEnvio = $filter('orderBy')(aConteudoPortalEnvio, 'Nome');
			    
			    if (scope.infoModal.ConteudoImagem.length > 0) {			        
			        scope.infoModal.ConteudoImagem = $filter('orderBy')(scope.infoModal.ConteudoImagem, 'IntOrdemCampo');
			    }
			    
			    $timeout(function () {
			        scope.mudandoInfoModal = false;			        
			    }, 200);
			};

			scope.SetNumeroCasasTrilha = function (pIntCasas) {			    
			    if (scope.novaTrilha.IdConfiguracaoJogo != pIntCasas) {
			        
			        scope.novaTrilha.IdConfiguracaoJogo = pIntCasas;
			        if (scope.novaTrilha.IdConfiguracaoJogo > 0 && scope.novaTrilha.intTipoDesenho > 0) {
			            scope.SalvaConfiguracaoUsuario();
			        }			        
			    }
			};

			scope.SetTipoDesenhoTrilha = function (pIntDesenho) {
			    if (scope.novaTrilha.intTipoDesenho != pIntDesenho) {
			        
			        scope.novaTrilha.intTipoDesenho = pIntDesenho;
			        if (scope.novaTrilha.IdConfiguracaoJogo > 0 && scope.novaTrilha.intTipoDesenho > 0) {
			            scope.SalvaConfiguracaoUsuario();
			        }			        
			    }
			};

			scope.SalvaConfiguracaoUsuario = function () {
			    
			    var idConfiguracaoUsuario = 0;

			    if (scope.jogoTrilha.ConfiguracaoUsuario.Id > 0) {
			        idConfiguracaoUsuario = scope.jogoTrilha.ConfiguracaoUsuario.Id;
			    }

			    var parametros = {
			        idConfigUsuario: idConfiguracaoUsuario,
			        idJogoTrilha: scope.jogoTrilha.Id,
			        idConfiguracaoJogo: scope.novaTrilha.IdConfiguracaoJogo,
			        intTipoDesenho: scope.novaTrilha.intTipoDesenho
			    };

			    scope.loadingGameData = true;
			    scope.cartaConteudo = [];			   

			    $http({
			        url: '/AVA/Projetos/JogoTrilha/SalvarJogoUsuario/',
			        method: "POST",
			        cache: false,
			        data: angular.toJson(parametros),
			        params: parametros
			    }).success(function (data) {                   			        

			        if (data) if (data instanceof Object) {
			            if (data.status) if (!isNaN(data.status)) if (parseInt(data.status) >= 0) {
			                scope.jogoTrilha.ConfiguracaoUsuario = data.configuracaousuario;

			                if (data.cartaConteudo) if (data.cartaConteudo instanceof Array) if (data.cartaConteudo.length > 0) {
			                    scope.cartaConteudo = data.cartaConteudo;

			                    scope.cartaJogo = [];
			                    scope.cartaJogo = scope.GetCartasJogo();			                    
			                }
			            }
			        }                    
			        scope.loadingGameData = false;
			        scope.iniciarJogo();

			    }).error(function (err) {
			        alert("Não foi possível carregar o jogo!");
			    }).finally(function () { });


			};

            scope.init = function () {
                scope.defaultConfig = scope.config;
                
                var parametros = {
                    idEdicao: scope.edicao.Id
                };

                $http({
                    url: '/AVA/Projetos/JogoTrilha/GetDadosJogoTrilha/',
                    method: "POST",
                    cache: false,
                    data: angular.toJson(parametros),
                    params: parametros
                }).success(function (data) {

                    if (data) if (data instanceof Object) {
                        if (data.status) if (!isNaN(data.status)) if (parseInt(data.status) >= 0) {                            

                            if (data.jogotrilha) {
                                scope.jogoTrilha = data.jogotrilha;                                
                            }
                            
                            if (data.cartaConteudo) if (data.cartaConteudo instanceof Array) if (data.cartaConteudo.length > 0) {
                                scope.cartaConteudo = data.cartaConteudo;
                            }
                                
                            if (data.cartaConteudoPortal) if (data.cartaConteudoPortal instanceof Array) if (data.cartaConteudoPortal.length > 0) {
                                scope.cartaConteudoPortal = data.cartaConteudoPortal;
                            }
                                
                        }
                    }

                    if (scope.jogoTrilha.ConfiguracaoUsuario.Id > 0) {
                        scope.cartaJogo = [];
                        scope.cartaJogo = scope.GetCartasJogo();
                        scope.iniciarJogo();
                    }
                    else {
                        scope.activeArea = 'inicio';
                    }
                    scope.loadingGameData = false;

                }).error(function (err) {
                    alert("Não foi possível carregar o jogo!");
                }).finally(function () { });            

                jQuery('#largeShoes').on('hidden.bs.modal', function (e) {
                    try {
                        var oAudio = jQuery(this).find('audio');

                        oAudio[0].pause();
                        oAudio[0].currentTime = 0;
                    }
                    catch (err) {}                    
                });

            };
            scope.init();			
            
        }
    };
}]);

angular.module('resultado').controller('NaTrilhaDaNossaRegiaoJogo2017Ctrl', ["$http", "$scope", "$timeout", "$filter", "$location", controleTrilha]);
