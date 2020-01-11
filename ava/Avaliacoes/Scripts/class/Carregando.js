/**
 * Componente para exibir mensagem de carregando
 * @param string idCarregando Id do componente de carregando que será criado (referenciado pela classe)
 * @param string oExecucao string: Caminho do arquivo que será carregado por Ajax, function: Função que será executada quando para iniciar o carregar
 * @param array aPropriedades Array com as propriedades de cada janela (mensagem, tipo e se bloqueia a tela ou não)
 * @param string idPai 
 */
function Carregando(idCarregando, idPai, aPropriedades, oExecucao)
{
	this.versao		= '3.0.0';
	this.tentativa	= 0;
	this.link		= false;
	this.valor      = 1000;
	this.nome		= (idCarregando != undefined) ? idCarregando : 'carregando';
	this.id			= '#' + this.nome;
	this.pai		= idPai != undefined ? '#' + idPai : undefined;
	this.caminho    = (oExecucao || undefined);
	
	this.telas		= (aPropriedades || [
		{ mensagem:'<span class="loadImg"></span>Aguarde, carregando...', tipo:Carregando.TIPO_INICIO, bloquear:true }
	]);

	this.inicializar = function() {
		this.montar(this.tentativa);
	}
	
// Montagem das telas
/*
	<div class="opacidadeLoadingBox">
		<div class="loadingBox">
			<div class="area">
				<p><span class="loadImg"></span>Aguarde, carregando...</p>
			</div>
		</div>
	</div>
*/
	this.montar = function (numero) {
	    var carregando = this;
	    var campo, fundo, caixa, area, texto;

	    if ($(this.id).get(0) == undefined) {

	        campo = (this.pai == undefined) ? $('body') : $(this.pai);

	        fundo = $('<div></div>', {
	            id: this.nome,
	            className: "opacidadeLoadingBox"
	        });
	        caixa = $('<div></div>', {
	            id: this.nome + "Caixa",
	            className: "loadingBox mensagem" + (numero + 1)
	        });
	        area = $('<div></div>', {
	            id: this.nome + "Area",
	            className: "area"
	        });

	        texto = $("<p></p>");

	        this.adicionarTexto(texto, this.telas[numero].mensagem);

	        area.append(texto);
	        caixa.append(area);
	        fundo.append(caixa);
	        campo.append(fundo);

	        this.montarTentarNovamente();
	        this.montarOk();
	        this.montarCancelar();

	        // Gera o bloqueio
	        if (this.telas[numero].bloquear) {
	            this.reposicionar();
	            $(window).scroll(function () { carregando.reposicionar(); });
	        } else {
	            $(window).unbind('scroll');
	        }

	        this.esconder();
	    }
	}
	
	this.adicionarTexto = function(elemento, texto) {
	    texto.replace('\n', '<br />');
		elemento.append(texto);
	}
	
	this.reposicionar = function (event) {
		var fundo	 = $(this.id);
		var cima	 = $(window).scrollTop();
		var esquerda = $(window).scrollLeft();
		
		fundo.css('top', cima);
		fundo.css('left', esquerda);
	}

// Criando os botões
	this.montarOk = function() {
		this.criarBotao(
			"OK",
			"ok_" + this.id,
			"ok",
			$("#caixa_" + this.id + " > div.area")
		);
	}
	
	this.montarCancelar = function() {
		this.criarBotao(
			"Cancelar",
			"cancelar_" + this.id,
			"cancelar",
			$("#caixa_" + this.id + " > div.area")
		);
	}
	
	this.montarTentarNovamente = function() {
		this.criarBotao(
			"Tentar novamente",
			"tentar_" + this.id,
			"tentarNovamente",
			$("#caixa_" + this.id + " > div.area")
		);
	}

	this.criarBotao = function(texto, id, classe, local) {
		var botao;
		if (this.link)
			botao = $("<a></a>", { href: 'javascript:void(0)' }).append(texto);
		else
			botao = $("<input />", { type: 'button', value: texto });
		
		botao.attr('id', id);
		botao.addClass(classe);
		botao.css('display', "none");
		botao.appendTo(local);
		
		return botao;
	}

// Limpando a tela
	this.limpar = function() {
		var area = $("#caixa_" + this.id + " > div.area");
		
		$('> p', area).empty();
		
		$("#tentar_" + this.id, area).hide();
		$("#ok_" + this.id, area).hide();
		$("#cancelar_" + this.id, area).hide();
	}
	
// Troca de mensagem
	this.trocarMensagem = function(numero) {
		var caixa = $("#caixa_" + this.id);
		var texto = $('div.area > p', caixa);
		
		this.limpar();
		
		// Troca a mensagem
		caixa.removeClass("mensagem" + numero).addClass("mensagem" + (numero + 1));
		
		this.adicionarTexto(texto, this.telas[numero].mensagem);
				
		// Gera o bloqueio
		if (this.telas[numero].bloquear) {
			this.reposicionar();
			$(window).scroll(function() { carregando.reposicionar(); } );
		} else {
			$(window).unbind('scroll');
		}
		
		// Executa a mensagem de acordo com o tipo
		switch (this.telas[numero].tipo) {
			case Carregando.TIPO_OK: this.ok(); break;
			case Carregando.TIPO_OK_CANCELAR: this.ok(); this.cancelar(); break;
			case Carregando.TIPO_TENTAR: this.tentar(); this.cancelar(); break;
			case Carregando.TIPO_FINAL:  break;
			case Carregando.TIPO_INICIO:  break;
			default: this.executar(); break;
		}
	}
	
// Executa a requisição
	this.executar = function() {
		var carregando = this;
		
		if (typeof this.caminho == 'string') {
			$.ajax({
				url: this.caminho,
				async: true,
				type: 'post',
				success: function() { carregando.onSuccess(); },
				error: function() { carregando.onError(); }
			});
			carregando.onCreate();
		} else if (typeof this.caminho == 'function') {
			this.caminho();
		}
	}
	
	this.iniciar = function() {
	    this.mostrar();
	}

// Esconde o carregando
	this.retornar = function() {
		this.tentativa = 0;
		this.trocarMensagem(this.tentativa);
		this.esconder();
	}

// Tenta novamente carregar, trocando o carregando para a próxima mensagem
	this.tentarNovamente = function() {
	    // Verifica se não ultrapassou o limite de tentativas
		if (this.tentativa < (this.telas.length - 1))
		    this.trocarMensagem(++this.tentativa);
		else
			this.finalizar();
	}

//	Finaliza o carregando exibindo a última mensagem
	this.finalizar = function() {
		this.trocarMensagem(this.tentativa);
		this.retornar();
	}

// Funções dos botões
	this.tentar	= function() {
	    var interno = this;
	    $("#tentar_" + this.id).click(function() { interno.tentarNovamente(); }).show();
    }
    
	this.ok = function() {
	    var interno = this;
	    $("#ok_" + this.id).click(function() { interno.retornar(); }).show();
	}
	
	this.cancelar = function() {
	    var interno = this;
	    $("#cancelar_" + this.id).click(function() { interno.retornar(); }).show();
    }
	
// Hook para chamadas externas do carregando
	this.onCreate	= function() { this.iniciar(); }
	this.onSuccess	= function() { this.retornar(); }
	this.onError	= function() { this.tentarNovamente(); }

// Geral
    this.mostrar = function() { $(this.id).show(); }
	this.esconder = function() { $(this.id).hide(); }
	this.toString = function() { return "class Carregando"; }
	
	this.inicializar();
}

Carregando.TIPO_CARREGANDO	= 0
Carregando.TIPO_OK			= 1
Carregando.TIPO_OK_CANCELAR	= 2
Carregando.TIPO_TENTAR		= 3
Carregando.TIPO_INICIO		= 4
Carregando.TIPO_FINAL		= 5
