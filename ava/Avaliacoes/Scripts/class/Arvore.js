function Arvore(sId, sLocal, sCaminho, oNoPai, bInicializar, bEditavel, bSelecionavel, sForm, strPosFixo, fRetorno) {
	var arvore = this;
	
	this.id	= 'ul#' + sId;
	this.local = '#' + sLocal;
	this.nome = sId;
	this.form = sForm;
	this.caminho     = sCaminho;
	this.inicializar = (bInicializar == undefined) ? false : bInicializar;
	this.editavel = (bEditavel == undefined) ? true : bEditavel;
	this.selecionavel = (bSelecionavel == undefined) ? false : bSelecionavel;
    
	this.fechada = false;
	this.indices = 0;
	this.nos = [];
	this.noPai = oNoPai;

	this.posFixo = (strPosFixo == undefined) ? "" : strPosFixo;

	this.btnAdd = undefined;
	this.novoNo = undefined;
	
	this.retorno = fRetorno;

	/**
	 * Inicializa uma árvore criando um UL vazio e armazenando no local indicado como posição da árvore
	 */
	this.init = function() {
	    if (this.isRaiz())
	        $(this.local).empty();

	    var load = document.createElement("div");
	    load.className = "carregando";
	    $(this.local).append($(load));

	    $(this.local).append($("<ul></ul>", { id: this.nome, "class": "arvore" }));

	    if (this.inicializar) {
	        this.enviar("carregar");
	    }
	}


	/* ********************** REQUISIÇÕES DO SERVIDOR ********************** */
	
	/**
	 * Envia uma requisição da árvore ao servidor
	 * @param string Ação que sera executada no servidor
	 * @param string Parametros enviados ao servidor
	 */
	this.enviar = function (acao, params) {
	    if (this.caminho) {
	        params = (params == undefined) ? '' : params;
	        $.ajax({
	            url: this.caminho,
	            type: 'POST',
	            data: 'acao=' + acao + "&" + $(arvore.form).serialize() + "&" + params,
	            success: function (dados) {
	                arvore.retornoArvore(acao, dados);

	                $(arvore.local).find('.carregando').remove(); ;

	            }
	        });
	    }
	}

	/**
	 * Tratamento do retorno do servidor para a árvore
	 * @param acao  String da ação executada no servidor
	 * @param dados String do retorno da ação executada no servidor
	 */
	this.retornoArvore = function (acao, dados, indice) {

	    if ($(dados).attr('class') && $(dados).attr('class').indexOf("erro") > -1) {
	        if (this.retorno) {
	            this.retorno(dados);
	        }
	        return;
	    }

	    switch (acao) {
	        case "carregar": this.carregarArvore($(dados)); break;
	        case "salvar": this.salvarArvore(dados); break;
	        case "excluir": this.excluirArvore(dados); break;
	        case "novo": this.novoArvore(dados); break;
	    }
	    if (this.isRaiz())
	        this.colorirLinhas();
	}



	/**
     * Executa o parse de uma estrutura de árvore e transforma em comonentes da arvore
	 * @param HTMLUlElement Elemento HTML (jquery) do conteúdo da árvore
     */
	this.parse = function(ul) {
	    this.carregarArvore(ul);
    	    
	    if (this.isRaiz())
	        this.colorirLinhas();
	}

	/**
	* Desenha uma árvore carregada do servidor
	* @param HTMLUlElement Elemento HTML (jquery) do conteúdo da árvore
	*/
	this.carregarArvore = function (ul) {

	    ul.children().each(function () {
	        var a2 = $(this).find('> input');
	        var ul2 = $('> ul', this);
	        var checked = (a2.attr('checked') != undefined && a2.attr('checked').toLowerCase() == "checked")
	        var editavel = false;
	        var adicionar = false;
	        var raizselecionavel = false;

	        var sClass = "";
	        if (a2.attr('class')) {
	            sClass = a2.attr('class');
	            if (a2.attr('class').indexOf('editavel') > -1) {
	                editavel = true;
	            }
	            if (a2.attr('class').indexOf('addno') > -1) {
	                adicionar = true;
	            }
	            if (a2.attr('class').indexOf('raizselecionavel') > -1) {
                    raizselecionavel = true;
                }

                if (a2.attr('class').indexOf('semfilhos') > -1) {
                    ul2 = undefined;
                }

	        }
	        if (adicionar) {
	            arvore.carregarBtnAdicionar(a2.get(0).value, sClass);
	        } else {

	            arvore.carregarNo(a2.attr('title'), a2.attr('id'), a2.get(0).value, checked, ul2, editavel, sClass, raizselecionavel);
	        }
	    });

	    this.recolher();
	}

	/**
	 * Monta um item salvo na árvore
	 * @param string JSon do nó salvo no servidor
	 */
	this.salvarArvore = function (dados) {
	    var novo = eval(dados);
	    var filho = this.getNo(novo.indice);
	    var estilo = ""
	    if (novo.pertence) {
	        var estilo = "editavel pertence";
	    }
	    
	    filho.montar(novo.valor, novo.texto, estilo);
	}

	this.novoArvore = function (dados) {
	    arvore.novoNo.remove();
	    arvore.btnAdd.remove();
	    arvore.carregarArvore($(dados))
	    
	}
	/**
	 * Remove um item excluído da árvore
	 * @param string JSon do nó excluído do servidor
	 */
	this.excluirArvore = function(dados) {
	    var novo = eval(dados);
	    var i = this.getIndiceArray(novo.indice);
        
	    if (i > -1) {
	        this.nos[i].excluir();
	        this.nos.splice(i, 1);
	    }
	    if (!this.isRaiz()) this.noPai.remontarImagem();
	}


/* ********************** NÓS DA ÁRVORE ********************** */

	/**
	 * Cria um novo nó carregado na árvore <li class="no">
	 * @param string Valor do elemento adicionado na árvore
	 * @param string Texto do elemento adicionado na árvore
	 */
	this.carregarNo = function (valor, idlista, texto, selecionado, subarvore, editavel, sClass, raizselecionavel) {

	    var selecionavel = this.selecionavel
	    if (this.editavel)
	        selecionavel = false;

	    var filho = new No(this.indices++, "n_" + this.nome, this, editavel, selecionavel, this.posFixo, this.isRaiz(), sClass, this.form, this.retorno);
	    filho.raizselecionavel = raizselecionavel;
	    this.nos.push(filho);

	    filho.carregar(valor, idlista, texto, selecionado);

	    if (subarvore != undefined)
	        filho.carregarArvore(subarvore);

	    if (!this.isRaiz()) {
	        this.noPai.remontarImagem();
	    } else {
	        filho.remontarImagem();
	    }


	}

    /**
     * Cria um novo nó para adicionar na árvore <li class="adicionar">
     */
	this.adicionarNo = function () {
	    
	    var filho = new No(this.indices++, "n_" + this.nome, this, this.editavel, this.selecionavel, this.posFixo, this.isRaiz(), "", this.form, this.retorno);


	    this.nos.push(filho);

	    filho.adicionar();

	    if (!this.isRaiz()) this.noPai.remontarImagem();
	}

	/**
	 * Editar um nó da árvore
	 * @param int Índice do nó na árvore
	 */
	this.editarNo = function(indice) {
	    this.getNo(indice).editar();
	}

	/**
	 * Salva o nó de uma árvore enviando a requisição para o Servidor
	 * @param int Índice do nó na árvore
	 */
	this.salvarNo = function(indice) {
	    var filho = this.getNo(indice);

	    filho.salvar();

        if (filho.getTexto() != undefined)
            this.enviar("salvar", filho.toPost());
	}
    this.salvarNovoNo = function(indice) {
	    var filho = this.getNo(indice);

	    filho.salvar();

        if (filho.getTexto() != undefined)
            this.enviar("novo", filho.toPost());
	}
	/**
	 * Cancela a criação/edição de um nó
	 * @param int Índice do nó na árvore
	 */
	this.cancelarNo = function(indice) {
	    this.getNo(indice).cancelar();

	    if (!this.isRaiz()) {
	        this.noPai.cancelar();
	        this.noPai.remontarImagem();
	    }
	}
	this.cancelarNoNovo = function (obj) {
	    this.indices--;
	    this.novoNo = undefined;
	    this.btnAdd.show();
	    obj.remove();
	}

	/**
	 * Exclui um nó da arvore
	 * @param int Índice do nó na árvore
	 */
	this.excluirNo = function(indice) {
	    var filho = this.getNo(indice);

	    filho.salvar();

	    this.enviar("excluir", filho.toPost());
	}


/* ********************** TRATAMENTO ARRAY NÓS ********************** */
	
	/**
	 * Retorna o indice do array a partir de um valor do nó
	 * @param int Índice do nó na árvore
	 * @return int Índice do array do nó na árvore
	 */
	this.getIndiceArray = function(indice) {
		for (i = 0; i < this.nos.length; i++)
			if (this.nos[i].indice == indice)
				return i;
		
		return -1;
	}

	/**
	 * Retorna o nó da árvore indicado pelo índice
	 * @param int Índice do nó na árvore
	 * @return No Elemento de nó da árvore
	 */
	this.getNo = function (indice) {
		for (i = 0; i < this.nos.length; i++)
			if (this.nos[i].indice == indice)
				return this.nos[i];
		
		return undefined;
	}

	/**
	 * Retorna o caminho do servidor da árvore
	 * @return string Caminho do servidor para a árvore
	 */
	this.getCaminho = function() {
		return this.caminho;
	}

	/**
	 * Retorna o valor da raíz da árvore
	 * @return string Valor do pai da árvore ou -1 se não houver pai
	 */
	this.getValorNoPai = function() {
		if (this.noPai) return this.noPai.getValor();
		else return -1;
    }

    /**
    * Verifica se é uma árvore raíz ou não
    * @return true para raiz da árvore ou false quando é uma sub árvore
    */
    this.isRaiz = function() {
        return this.noPai == undefined;
    }

    /**
    * Verifica se a árvore é editavel
    * @return true para árvore editável ou false quando não é
    */
    this.isEditavel = function() {
        return this.editavel;
    }

    /**
     * Retorna o nome da classe
     * @return string Nome da classe
     */
    this.toString = function() {
        return "Arvore";
    }
    
    /**
     * Preenche os fundos das linhas da Árvore principal
     */
    this.colorirLinhas = function() {
        $(this.id + " > li:odd").addClass("par");
    }

    /**
     * Expandir a árvore
     */
    this.expandir = function() {
        for (var i = 0; i < this.nos.length; i++)
            this.nos[i].expandir();
    }

    /**
     * Recolher a árvore
     */
    this.recolher = function() {
        for (var i = 0; i < this.nos.length; i++)
            this.nos[i].recolher();
    }

    this.carregarBtnAdicionar = function (texto, sClass) {

        this.btnAdd = $("<li></li>", { "class": "no" });

        $("<a></a>", { "class": "btn " + sClass }).append("<span class='ico'></span><span>" + texto+"</span>").appendTo(this.btnAdd).click(function () {
            arvore.adicionarNovo();
        });
        $(this.id).append(this.btnAdd);
        /*return li;*/
    }

    this.adicionarNovo = function () {
        
        var filho = new No(this.indices++, "n_" + this.nome, this, this.editavel, this.selecionavel, this.posFixo, this.isRaiz(), "", this.form,this.retorno);


        this.nos.push(filho);

        this.novoNo = filho.montarAdicionar();


        this.btnAdd.before(this.novoNo);
        this.btnAdd.hide();
        filho.focar();
    }

	this.init();
}