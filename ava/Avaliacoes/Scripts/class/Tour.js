/*
depende do jquery
depende do jquery.cookie
 */
function Tour(sConteiner, sPathRoteiro, sPathSaveView, bolView, fInit, sConteinerOpen) {
	var tour = this;

	/* configurações do tour */
	this.container = sConteiner || "body"; //container para o overlay
	this.pathRoteiro = sPathRoteiro; //caminho com o roteiro
	this.pathSaveView = sPathSaveView;
	this.visualiza = bolView; //se deverá iniciar o tour ou não


	/*elementos basicos do tour*/
	this.start_step = undefined; //passo inicial (introdução ao tour)
	this.menu = undefined; //menu do tour
	this.open = $(sConteinerOpen); //quando já viu o tour ou fechou o tour

	/*callback para quando for carregado, deverá retornar true para prosseguir*/
	this.onLoad = undefined;
	this.onSaveView = undefined;
	this.onPreLoad = undefined;
	this.onInit = fInit;

	/*os roteiro*/
	this.tourRoteiros = [];
	this.roteiroAtual = 0;

	//armazena o passo atual
	this.atualStep = undefined;

	/*controle das variaveis do cookie*/
	this.refCookie = undefined;
	this.viewCookie = false;

	this.isLoad = false;

	this.onStep = undefined; //callback para quando abre um passo

	this.init = function () {
		//recupera do cookie qual é o passo em questão
		if ($.cookie('tourRef') && $.cookie('tourRef') != null) {
			this.refCookie = $.parseJSON($.cookie('tourRef'));
		}
		if ($.cookie('tourView') && $.cookie('tourView') != null) {
			this.viewCookie = parseInt($.cookie('tourView'), 10) == 1;
		}
		this.endLoadTour = function () {
			this.iniTour();
		};
		this.load();

		//observa as requisições ajax
		$('body').ajaxSuccess(function (e, xhr, settings) {
			var passoAtual;
			try {
				passoAtual = tour.tourRoteiros[tour.roteiroAtual].Step();
			} catch (ex) {}
			if (passoAtual && passoAtual.ajax && settings.url.toLowerCase().indexOf(passoAtual.ajax.toLowerCase()) > -1) {
				passoAtual.ajaxLoad = true;
				tour._showPassoAtual();
			}
		});

		/*this.open.click(function () {
		tour.botaoOpen();
		}).attr('href', 'javascript:void(0);');*/
	};

	//Funcao do botão inicial "Iniciar Tour"
	this.botaoOpen = function () {
		if (!tour.viewCookie) {
			tour.viewCookie = true;
			tour.openTour();
		}
	};

	this.load = function () {

		if (!tour.visualiza && !tour.viewCookie) {
			tour.endLoadTour();
			return;
		}

		if (tour.isLoad) {
			tour.endLoadTour();
			return;
		}

		if (this.onPreLoad) {
			this.onPreLoad();
		}

		//carregar o roteiro
		$.ajax({
			url : tour.pathRoteiro,
			type : "GET",
			cache : false,
			success : function (dados, status, xhttp) {
				if (tour.onLoad) {
					//tratar erro
					if (tour.onLoad(dados)) {
						tour.isLoad = true;
						tour._parseLoad(dados);
					}
				}

			}
		});
	};

	this._parseLoad = function (dados) {
		var totalLoad = 0;
		var countLoad = 0;
		//encontro os elementos em formato html e os transforma
		$(dados).find('> li').each(function () {

			var options = TourElementBase.JSonParse($(this));

			if (options.tipo == "start") {
				tour.start_step = new TourElementStart(options);
			} else if (options.tipo == "menu") {
				tour.menu = new TourElementMenu(options);
			} else if (options.tipo == "roteiro") {
				//so carrega os tours se for visualizar
				var elemento = new TourElementRoteiro();
				elemento.tour = tour;
				elemento.indice = tour.tourRoteiros.length;

				elemento.parse($(this));

				if (elemento.urlroteiro && elemento.urlroteiro != "" && !elemento.roteiroload) {
					totalLoad++;
					elemento.onLoadRoteiro = function () {
						countLoad++;
						if (totalLoad <= countLoad) {
							tour.endLoadTour();
						}
					};
				}

				tour.tourRoteiros.push(elemento);
			}
		});

		if (totalLoad <= 0) {
			tour.endLoadTour();
		}
		//
	};

	/*
	 * Navegação do tour
	 */

	//inicializa o tour
	this.iniTour = function () {

		if (this.onInit) {
			this.onInit();
		}
		if (!this.visualiza && !this.viewCookie) {
			this.sairTour();
			return;
		}
		if (this.refCookie) {
			this.gotoStep(this.refCookie.Roteiro, this.refCookie.Step);
			return;
		}

		this.startStep();

	};

	this.openTour = function () {
		this.setCookieVisualizando();
		this.onInit = undefined;
		this.load();
	};

	//apresenta o "start"
	this.startStep = function () {
		this.hideMenu();
		this.open.hide();

		this.removeTourElement();
		if (this.start_step) {
			this.start_step.show();
		}
	};

	//inicia o tour a partir do roteiro
	this.startTour = function (roteiro) {
		if (this.start_step) {
			this.start_step.remove();
		}

		//salva o tour como já tenha visto
		this.setCookieVisualizando();

		if (this.visualiza) {
			$.ajax({
				url : tour.pathSaveView,
				type : "POST",
				success : function (dados, status, xhttp) {
					if (tour.onSaveView) {
						tour.onSaveView(dados);
					}
				}
			});
		}
		this.roteiroAtual = roteiro || 0;
		this.showStep(this.tourRoteiros[this.roteiroAtual].First());

	};

	//vai para o próximo passo dentro do roteiro
	this.nextStep = function () {
		tour.showStep(tour.tourRoteiros[tour.roteiroAtual].Next());
	};

	//volta um passo dentro do roteiro
	this.prevStep = function () {
		tour.showStep(tour.tourRoteiros[tour.roteiroAtual].Prev());
	};

	//vai para um passo em um roteiro (passando o id de cada um)
	this.gotoStep = function (idRoteiro, idStep) {
		if (idRoteiro) {
			var bolFind = false;
			for (var i = 0; i < tour.tourRoteiros.length; i++) {
				if (tour.tourRoteiros[i].id == idRoteiro) {
					tour.roteiroAtual = i;
					bolFind = true;
					break;
				}
			}
			if (bolFind) {
				if (idStep) {
					tour.showStep(tour.tourRoteiros[tour.roteiroAtual].StepRef(idStep));
				} else {
					tour.showStep(tour.tourRoteiros[tour.roteiroAtual].First());
				}

			}
		}

	};

	//proximo roteiro
	this.nextRoteiro = function () {
		var proximo = tour.tourRoteiros[tour.roteiroAtual].indice + 1
			if (proximo < tour.tourRoteiros.length) {
				//alert(tour.tourRoteiros[proximo].id)
				tour.gotoStep(tour.tourRoteiros[proximo].id);
			}
	};

	//roteiro anterior
	this.prevRoteiro = function () {
		var anterior = tour.tourRoteiros[tour.roteiroAtual].indice - 1
			if (anterior >= 0) {
				tour.gotoStep(tour.tourRoteiros[anterior].id, tour.tourRoteiros[anterior].steps[tour.tourRoteiros[anterior].Count() - 1].id);
			}
	};

	//sair do tour
	this.sairTour = function () {

		$.cookie('tourRef', null, {
			path : '/'
		});
		$.cookie('tourView', null, {
			path : '/'
		});

		this.refCookie = undefined;
		this.viewCookie = undefined;

		this.removeOverlay();
		this.removeTourElement();

		this.hideMenu();
		//this.open.show();

		tour.botaoOpen();
	};

	//reset do tour (vai para o primeiro passo do primeiro roteiro)
	this.resetTour = function () {
		this.roteiroAtual = 0;
		tour.showStep(this.tourRoteiros[this.roteiroAtual].First());
	};

	/*
	 *   apresentação do passo
	 */
	//mostra o passo
	this.showStep = function (passoAtual) {

		this.showOverlay();

		this.open.hide();
		this.showMenu();

		if (this._dependeUrl(passoAtual)) {
			return;
		}

		if (this._dependeAjax(passoAtual)) {
			return;
		}

		this._showPassoAtual()
	};

	//mostra o passo atual
	this._showPassoAtual = function () {
		tour.removeTourElement();

		var passoAtual = tour.tourRoteiros[tour.roteiroAtual].Step();

		//aplica navegação entre os tours - proximo tour
		if (passoAtual.indice == tour.tourRoteiros[tour.roteiroAtual].Count() - 1) {
			var proximo = tour.tourRoteiros[tour.roteiroAtual].indice + 1
				if (proximo < tour.tourRoteiros.length) {
					//alert(tour.tourRoteiros[proximo].id)
					passoAtual.next = tour.nextRoteiro;
				}
		}
		/*if (passoAtual.indice == 0) {
		var anterior = tour.tourRoteiros[tour.roteiroAtual].indice - 1

		if (anterior >= 0) {
		//alert(tour.tourRoteiros[proximo].id)
		passoAtual.prev = tour.prevRoteiro;
		}
		}*/

		this.atualStep = passoAtual;

		passoAtual.show();

		//atualiza o cookie
		tour.setCookieVisualizando();
	};

	this._onStep = function () {
		if (tour.onStep)
			tour.onStep(tour.tourRoteiros[tour.roteiroAtual].id, tour.atualStep.id);
	};

	//se o passo depende de uma url
	this._dependeUrl = function (passoAtual) {
		if (passoAtual.url) {
			//se a referencia já estiver no cookie sai fora
			if (!this.refCookie || this.refCookie.Roteiro != passoAtual.roteiro || this.refCookie.Step != passoAtual.id) {
				//verifica se está na mesma pagina do link
				var atualUrl = window.location.pathname.toString();
				if (atualUrl != passoAtual.url) {
					//armazena no cookie a referencia e carrega a pagina
					this.setCookieRef(passoAtual);
					window.location = passoAtual.url;
					return true;
				}
			}
		}
		return false;
	};

	//se o passo depende de ter carregado um ajax
	this._dependeAjax = function (passoAtual) {
		if (passoAtual.ajax && !passoAtual.ajaxLoad) {
			//caso tenha que esperar uma requisição ajax
			return true;
		}
		return false;
	};

	//remove o passo e tudo aquilo que estive associado
	this.removeTourElement = function () {
		if (this.atualStep)
			this.atualStep.remove();
	};

	/*
	 *   overlay
	 */
	//mostrar o overlay
	this.showOverlay = function () {
		if ($(this.container).find('#tour_overlay').length <= 0) {
			$(this.container).prepend($('<div id="tour_overlay"></div>'));
		}
		$('#tour_overlay').show();
	};

	//esconder o overlay
	this.hideOverlay = function () {
		$('#tour_overlay').hide();
	};

	//remover o overlay
	this.removeOverlay = function () {
		$('#tour_overlay').remove();
	};

	/*
	 * menu
	 */
	this.showMenu = function () {
		if (this.menu) {
			this.menu.show();
		}

	};

	this.hideMenu = function () {
		if (this.menu)
			this.menu.hide();
	};

	/*
	 *   cookie
	 */
	this.setCookieRef = function (passoAtual) {
		var date = new Date();
		date.setTime(date.getTime() + (10 * 60 * 1000)); //fica por uns 10 minutos no cookie só
		var value = '{"Roteiro":"' + passoAtual.roteiro + '","Step":"' + passoAtual.id + '"}';
		$.cookie('tourRef', value, {
			expires : date,
			path : '/'
		});
	};

	this.setCookieVisualizando = function () {
		var date = new Date();
		date.setTime(date.getTime() + (10 * 60 * 1000)); //fica por uns 10 minutos no cookie só
		var value = '1';
		$.cookie('tourView', value, {
			expires : date,
			path : '/'
		});
	};

	this.init();
}

/*
 *   classe base para os elementos do tour
 *
 *   parametros de configuração
 *
 *   parametros que devem ser declarados dentro da tag
 *   id = indentificação do elemento
 *   class = caso seja aplicada algum css a mais
 *
 *   parametros que deverão estar no formato json dentro de um input hidden com o nome de 'config'
 *   container = relativo ao conteiner de referencia (caso for algum elemento de configuração irá aparecer internamente)
 *   delay = delay para aparecer o elemento (default é 300 mls)
 *
 *   html = este parametro é o conteúdo interno da tag li
 *
 */
function TourElementBase(options) {
	var tl = this;

	this.id = options ? options.id : undefined;
	this.container = options ? options.container : undefined;
	this.extraClass = options ? options.extraClass : undefined;
	this.html = options ? options.html : undefined;
	this.delay = options && options.delay ? options.delay : 300;

	this.element = undefined;

	this.createElement = function () {

		this._containerPrincipal();

		//container para todo o conteúdo
		this._containerInner();

		//container do conteudo
		this._containerContent();

		//criar o "cabecalho" caso tenha e mais os botoes
		this._containerHead();

		//cria a seta
		this._containerSeta();

		//seta a largura
		this._containerLargura();

		//posiciona e renderiza o elemento na tela (atravez do delay)
		if (this.delay) {
			setTimeout(function () {
				tl._renderElement();
			}, this.delay)
		} else {
			this._renderElement();
		}
	};

	// cria o container principal
	this._containerPrincipal = function () {
		this.element = $('<div>').addClass(this._className());
	};

	// retorna a classe para o elemento principal
	this._className = function () {
		return " tourElement " + " " + (this.extraClass ? this.extraClass : "");
	};

	// cria o container interno para todo o conteudo
	this._containerInner = function () {
		this.element.append($('<div>').addClass('innerStep'));
	};

	// cria o container do conteudo
	this._containerContent = function () {
		var $tourContent = $('<div>', {
				html : this.html
			}).addClass('contentStep');

		this.element.find('.innerStep').prepend($tourContent);
	};

	// cria o container do cabeçalho (deve ser reescrito)
	this._containerHead = function () {};

	// cria o para a seta do cabeçalho (deve ser reescrito)
	this._containerSeta = function () {};

	// renderiza o elemento na tela (deve ser reescrito)
	this._renderElement = function () {};

	// seta a largura do container (deve ser reescrito)
	this._containerLargura = function () {};

	// recupera a largura do container de "referencia"
	this.getSquareContainer = function () {};

	// mostrar o elemento
	this.show = function () {
		if (!this.element)
			this.createElement();

		this.element.show();
	};

	// esconder o elemento
	this.hide = function () {
		if (this.element)
			this.element.hide();
	};

	// remove o elemento
	this.remove = function () {
		if (this.element) {
			this.element.remove();
			this.element = undefined;
		}
		this._removeExtra();

	};

	// remove itens extras relativos ao elemento, reescrever
	this._removeExtra = function () {};
}

/*
 *   realiza o parse das configurações
 *   a partir do objeto 'li' do roteiro
 */
TourElementBase.JSonParse = function (objLi) {
	var options = $.parseJSON(objLi.find('input[name="config"]').val());

	options.id = objLi.attr('id');
	options.extraClass = objLi.attr('class');
	options.html = objLi.html();

	return options;
};

/*
 *   classe para o elemento start
 */
function TourElementStart(options) {
	var tl = this;
	TourElementBase.call(this, options);

	this._className = function () {
		return " tourElement startTour " + " " + (this.extraClass ? this.extraClass : "");
	};

	//apresenta dentro do container "referencia"
	this._renderElement = function () {
		$(this.container).append(this.element);
		return;
	};
}

/*
 *   classe para o elemento menu
 */
function TourElementMenu(options) {
	var tl = this;
	this.delay = 0;
	TourElementBase.call(this, options);

	this._className = function () {
		return " tourElement menuTour " + " " + (this.extraClass ? this.extraClass : "");
	};

	//apresenta dentro do container "referencia"
	this._renderElement = function () {
		$(this.container).append(this.element);
		return;
	};
}

/*
 *   classe para o elemento open
 */
function TourElementOpen(options) {
	var tl = this;
	TourElementBase.call(this, options);

	this._className = function () {
		return " tourElement openTour " + " " + (this.extraClass ? this.extraClass : "");
	};

	//apresenta dentro do container "referencia"
	this._renderElement = function () {
		$(this.container).append(this.element);
		return;
	};
}

/*
 *   classe para o elemento roteiro (conterá vários passos)
 *
 *   parametros na tag LI
 *   title = titulo da apresentação
 *   urlbase = raiz para a url que será chamada
 *   urlroteiro = arquivo q contenha os passos (caso tenha ignora o que tiver dentro da tag)
 */
function TourElementRoteiro(options) {

	var tl = this;
	TourElementBase.call(this, options);

	this.titulo = options ? options.titulo : undefined;
	this.urlbase = options && options.urlbase ? options.urlbase : "";
	this.urlroteiro = options && options.urlroteiro ? options.urlroteiro : "";
	this.indice = options ? options.indice : undefined;

	this.roteiroload = false;

	this.tour = undefined; //referencia para o objeto da class Tour

	this.steps = []; //lista dos passos
	this.atual = 0; //controle do passo atual

	//realiza o parse do roteiro e dos seus passos
	this.parse = function (objLi) {

		var optionsRoteiro = $.parseJSON(objLi.find(' > input[name="config"]').val());
		this.urlbase = optionsRoteiro.urlbase ? optionsRoteiro.urlbase : "";
		this.titulo = objLi.attr('title');
		this.id = objLi.attr('id');
		this.urlroteiro = optionsRoteiro.urlroteiro ? optionsRoteiro.urlroteiro : undefined;

		if (this.urlroteiro) {
			$.ajax({
				url : tl.urlroteiro,
				type : "GET",
				cache : true,
				success : function (dados, status, xhttp) {
					if (tour.onLoad) {
						tl.roteiroload = true;
						//tratar erro
						tl.parseSteps($(dados));
						if (tl.onLoadRoteiro)
							tl.onLoadRoteiro();
					}

				}
			});
		} else {
			this.parseSteps(objLi.find(' > ol'));
		}

	};

	this.parseSteps = function (objOl) {
		objOl.find(' > li').each(function () {

			var options = $.parseJSON($(this).find('input[name="config"]').val());

			options.id = $(this).attr('id');
			options.extraClass = $(this).attr('class');
			options.html = $(this).html();

			if (options.url) {
				options.url = tl.urlbase + options.url
			}
			options.indice = tl.steps.length;
			options.titulo = tl.titulo;
			options.tour = tl.tour;
			options.roteiro = tl.id;
			options.parent = tl;

			//navegação entre as partes
			if (tl.steps.length > 0) {
				tl.steps[tl.steps.length - 1].next = tl.tour.nextStep;
				options.prev = tl.tour.prevStep;
			}

			tl.steps.push(new TourElementStep(options));

		});

	};

	this._className = function () {
		return "";
	};

	//retorna o passo atual
	this.Step = function (pos) {
		if (pos)
			this.atual = pos;

		return this.steps[this.atual];
	};

	//retorna o proximo passo
	this.Next = function () {
		this.atual++;
		return this.Step()
	};

	//retorna o passo anterior
	this.Prev = function () {
		this.atual--;
		return this.Step()
	};

	//retorna o primeiro passo
	this.First = function () {
		this.atual = 0;
		return this.Step();
	};

	//retorna o passo pelo id
	this.StepRef = function (idRef) {
		var passo = 0;
		for (var i = 0; i < this.steps.length; i++) {
			if (this.steps[i].id == idRef) {
				passo = i;
				break;
			}
		}
		return this.Step(passo);
	};

	//retorna o total de elemntos
	this.Count = function () {
		return this.steps.length;
	};
}

/*
 *   Elemento do passo
 *
 *   parametros na tag li
 *   title = o titulo que irá ser apresentado (caso não passe pega do roteiro a que pertence)
 *
 *   parametros dentro da tag input hidden config no formato json
 *   posicao = o posicionamento relativo ao container referencia (T,R,B,L,TL,TR,BL,BR,LT,LB,RB,RT)
 *   width = largura para o box principal, padrao '300px'
 *   top = diferença na altura que irá aparecer (corrigir alguns problemas no calculo do posicionamento)
 *   left = diferença na largura que irá aparecer (corrigir alguns problemas no calculo do posicionamento)
 *   showNext = se deverá mostrar ou não o botão next (0 - 1)
 *   acaoNext = ação que será executada no botão next (passar como string, será feito um 'eval' desta ação)
 *   acaoPrev = ação que será executada no botão prev (passar como string, será feito um 'eval' desta ação)
 *   url = passar a url que depende para que o passo apareça no caso de uma naveção normal entre páginas
 *   ajax = passar a url que depende para que o passo apareça no caso de um carregamento ajax
 *   acao = uma ação tratada internamente no plugin (botao)
 */
function TourElementStep(options) {
	var tl = this;
	TourElementBase.call(this, options);

	this.posicao = options.posicao;
	this.titulo = options.titulo;
	this.width = options.width ? options.width : "300px";

	this.top = options.top ? parseInt(options.top, 10) : 0;
	this.left = options.left ? parseInt(options.left, 10) : 0;

	this.indice = options ? options.indice : undefined;

	this.acao = options.acao ? options.acao : undefined; //acoes que interagem com a página: botao=libera o botão para interajir

	this.showNext = options.showNext == undefined ? true : options.showNext == 1;
	this.acaoNext = options.acaoNext ? options.acaoNext : undefined;
	this.acaoPrev = options.acaoPrev ? options.acaoPrev : undefined;

	this.ajax = options.ajax ? options.ajax : undefined; //caso tenha que esperar um carregamento ajax
	this.url = options.url;

	/* as ações para o proximo passo ou passo anterior, determina se mostra o botão ou não */
	this.next = options.next;
	this.prev = options.prev;

	/* instancia de new Tour */
	this.tour = options.tour;

	/* titulo do roteiro */
	this.roteiro = options.roteiro;
	/* referencia ao roteiro */
	this.parent = options.parent;

	/* caso já tenha carregado o ajax */
	this.ajaxLoad = options.ajax ? false : true;

	this._className = function () {
		return " tourElement stepTour " + " " + (this.extraClass ? this.extraClass : "");
	};

	this._containerPrincipal = function () {
		this.element = $('<div id="tour_element">').addClass(this._className());
	};

	this._containerHead = function () {
		if (this.titulo) {

			var $tourHead = $('<div>', {
					html : '<p>' + this.titulo + '</p>'
				}).addClass('headStep');
			if (!this.showNext) {
				this.next = undefined;
			}

			if (this.next || this.prev) {
				var $tourBtns = $('<ul>');

				if (this.prev) {
					var $tourPrev = $('<li>', {
							html : '<a href="javascript:void(0);">« anterior</a>'
						}).addClass('tourPrev').click(function () {
							if (tl.acaoPrev) {
								eval(tl.acaoPrev);
							}
							tl.prev();
						});

					$tourBtns.append($tourPrev);
				}

				if (this.next) {
					var $tourNext = $('<li>', {
							html : '<a href="javascript:void(0);">próximo »</a>'
						}).addClass('tourNext').click(function () {
							if (tl.acaoNext) {
								eval(tl.acaoNext);
							}
							tl.next();
						});

					$tourBtns.append($tourNext);
				}
				$tourHead.append($tourBtns);
			}
			this.element.find('.innerStep').prepend($tourHead);
		}
	};

	this._containerSeta = function () {
		var $tourSeta = $('<span>').addClass('stepSeta stepSeta_' + this.posicao);
		this.element.prepend($tourSeta);
	};

	this._renderElement = function () {

		$('body').prepend(this.element);

		var posicionamento = this.getSquareContainer();

		var e_w = posicionamento.width;
		var e_h = posicionamento.height;
		var e_l = posicionamento.left;
		var e_t = posicionamento.top;
		//alert(e_l + " - " + e_t)
		var difTop = this.element.find('.innerStep').offset().top; //diferança que existe entre o container principal e a altura e largura (para a setinha)
		var difLeft = this.element.find('.innerStep').offset().left;

		difTop = parseInt(difTop, 10);
		//converte para um valor positivo
		if (difTop < 0)
			difTop *= -1;

		difLeft = parseInt(difLeft, 10);
		if (difLeft < 0)
			difLeft *= -1;

		var properties = {};

		switch (this.posicao) {
		case 'TL':
			properties = {
				'left' : e_l - difLeft,
				'top' : e_t + e_h + difTop
			};
			break;
		case 'TR':
			properties = {
				'left' : (e_l + e_w - this.element.width()) + difLeft,
				'top' : e_t + e_h + difTop
			};
			break;
		case 'BL':
			properties = {
				'left' : e_l - difLeft,
				'top' : (e_t - this.element.height()) - difTop
			};
			break;
		case 'BR':
			properties = {
				'left' : e_l + e_w - this.element.width() + difLeft,
				'top' : e_t - this.element.height() - difTop
			};
			break;
		case 'LT':
			properties = {
				'left' : ((e_l + e_w) - difLeft),
				'top' : (e_t - difTop)
			};
			//posicionamento da seta

			break;
		case 'LB':
			properties = {
				'left' : e_l + e_w + difLeft,
				'top' : e_t + e_h - this.element.height() + difTop
			};
			break;
		case 'RT':
			properties = {
				'left' : e_l - this.element.width() - difLeft,
				'top' : e_t - difTop
			};
			break;
		case 'RB':
			properties = {
				'left' : e_l - this.element.width() - difLeft,
				'top' : e_t + e_h - this.element.height() + difTop
			};
			break;
		case 'T':
			properties = {
				'left' : e_l + e_w / 2 - this.element.width() / 2 - difLeft,
				'top' : e_t + e_h + difTop
			};
			break;
		case 'R':
			properties = {
				'left' : e_l - this.element.width() - difLeft,
				'top' : e_t + e_h / 2 - this.element.height() / 2
			};
			break;
		case 'B':
			properties = {
				'left' : (e_l + e_w / 2 - this.element.width() / 2),
				'top' : ((e_t - this.element.height()) - difTop)
			};
			break;
		case 'L':
			properties = {
				'left' : e_l + e_w + difLeft,
				'top' : e_t + e_h / 2 - this.element.height() / 2
			};
			break;
		}

		//ajusta pelo q veio da configuração
		properties.top = (properties.top + this.top) + 'px';
		properties.left = (properties.left + this.left) + 'px';

		this.element.css(properties);

		//posiciona a seta
		var h_h = this.element.find('.headStep').height();
		var h_w = this.element.find('.headStep').width();

		var s_h = this.element.find('.stepSeta').height();
		var s_w = this.element.find('.stepSeta').width();

		var propertiesSeta = {};
		switch (this.posicao) {
		case 'TL':
			propertiesSeta = {
				'top' : (0) + 'px',
				'left' : (difLeft) + 'px'
			};
			break;
		case 'TR':
			propertiesSeta = {
				'top' : (0) + 'px',
				'left' : (this.element.width() - s_w - difLeft) + 'px'
			};
			break;
		case 'BL':
			propertiesSeta = {
				'top' : (this.element.height() - difTop) + 'px',
				'left' : difLeft + 'px'
			};
			break;
		case 'BR':
			propertiesSeta = {
				'top' : (this.element.height() - difTop) + 'px',
				'left' : (this.element.width() - s_w - difLeft) + 'px'
			};
			break;
		case 'LT':
			propertiesSeta = {
				'top' : (difTop + (h_h / 2)) + 'px',
				'left' : (0) + 'px'
			};
			break;
		case 'LB':
			propertiesSeta = {
				'top' : (this.element.height() - s_h - difTop) + 'px',
				'left' : (0) + 'px'
			};
			break;
		case 'RT':
			propertiesSeta = {
				'top' : (difTop + (h_h / 2)) + 'px',
				'left' : (this.element.width() - s_w) + 'px'
			};
			break;
		case 'RB':
			propertiesSeta = {
				'top' : (this.element.height() - s_h - difTop) + 'px',
				'left' : (this.element.width() - s_w) + 'px'
			};
			break;
		case 'T':
			propertiesSeta = {
				'top' : (0) + 'px',
				'left' : (((this.element.width() / 2) - (s_w / 2))) + 'px'
			};
			break;
		case 'R':
			propertiesSeta = {
				'top' : (((this.element.height() / 2) - (s_h / 2))) + 'px',
				'left' : (this.element.width() - s_w) + 'px'
			};
			break;
		case 'B':
			propertiesSeta = {
				'top' : (this.element.height() - difTop) + 'px',
				'left' : (((this.element.width() / 2) - (s_w / 2))) + 'px'
			};
			break;
		case 'L':
			propertiesSeta = {
				'top' : (((this.element.height() / 2) - (s_h / 2))) + 'px',
				'left' : (0) + 'px'
			};
			break;
		}

		this.element.find('.stepSeta').css(propertiesSeta);

		this._aplicarAcao();

		this._scroll();

		this.tour._onStep();
	};

	this._aplicarAcao = function () {
		if (this.acao) {
			if (this.acao == "botao") {
				$(this.container).addClass('tourContainerAtivo');
				$(this.container).bind('click', function () {
					tl.tour.setCookieRef(tl.parent.Next());
				})
			} else if (this.acao == "simples") {
				$(this.container).addClass('tourContainerAtivo');
			}
		}
	};

	this.getSquareContainer = function () {

		var e_w = 0;
		var e_h = 0;
		var e_l = 0;
		var e_t = 100;

        var $element = $(this.container);
		
		if ($element.length > 0) {
			e_w = $element.width();
			e_h = $element.height();
			e_l = $element.position().left;
			e_t = $element.offset().top;
		}

        return { top: e_t, left: e_l, width: e_w, height: e_h };
	};

	this._containerLargura = function () {
		if (this.width) {
			this.element.css({
				width : this.width
			})
		}
	};

	this._removeExtra = function () {
		$('.tourContainerAtivo').removeClass('tourContainerAtivo');
	};

	this._scroll = function () {

		var properties = {};
		properties.top = this.element.offset().top;
		properties.left = this.element.offset().left;
		properties.height = this.element.height();

		var square = this.getSquareContainer();

		var e_w = square.width;
		var e_h = square.height;
		var e_l = square.left;
		var e_t = square.top;

		var w_t = $(window).scrollTop();
		var w_b = $(window).scrollTop() + $(window).height();

		var b_t = parseFloat(properties.top, 10);

		if (e_t < b_t)
			b_t = e_t;

		var b_b = parseFloat(properties.top, 10) + properties.height;
		if ((e_t + e_h) > b_b)
			b_b = e_t + e_h;

		if ((b_t < w_t || b_t > w_b) || (b_b < w_t || b_b > w_b)) {
			$('html, body').stop()
			.animate({
				scrollTop : b_t
			}, 500, 'easeInOutExpo', function () {});
		}
	};

}
