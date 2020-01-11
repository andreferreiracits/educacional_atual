function No(iIndice, sId, oArvore, bEditavel, bSelecionavel, strPosFixo, bRaiz, sClass, sForm, fRetorno) {
	var no = this;
	
	this.ESTADOS = { ABERTO: 0, FECHADO: 1, FOLHA: 2 }
	
	this.indice = iIndice;
	
	// Valores do Nó
	this.arvore         = (oArvore != undefined) ? oArvore : undefined;
	this.subarvore      = undefined
	this.texto		    = undefined;
	this.valor          = -1;
	this.idlista        = -1;
	this.selecionado    = false;

	this.isRaiz = bRaiz;

	this.estado         = this.ESTADOS.FOLHA;
	this.editavel       = (bEditavel == undefined) ? true : bEditavel;
	this.selecionavel   = (bSelecionavel == undefined) ? true : bSelecionavel;
	this.raizselecionavel = false;
	this.sClass = sClass;
	this.sForm = sForm;

	// Valores do HTML
	this.id			= 'li#' + sId + '_' + this.indice;
	this.nome		= sId + '_' + this.indice;
	this.idPai      = (this.arvore != undefined) ? 'ul#' + this.arvore.nome : undefined;
	this.nomePai    = (this.arvore != undefined) ? this.arvore.nome : undefined;

	this.caminhoBase = $('base').attr('href') == undefined ? "/" : $('base').attr('href');

	this.posFixo = (strPosFixo == undefined) ? "" : strPosFixo;

	this.retorno = fRetorno;
	/**
	 * Inicializa o nó da arvore e instancia a li
	 */
	this.init = function() {}

	this.getTexto = function () {
	    return this.texto;
	}


/* ********************** MANIPULAÇÃO DO NÓ ********************** */
	
	/**
     * Carrega um novo item na árvore
	 * @param string Valor do nó
	 * @param string Texto do nó
     */
	this.carregar = function (valor, idlista, texto, selecionado) {
	    this.valor = valor;
	    this.idlista = idlista;
	    this.texto = texto;
	    this.selecionado = selecionado;

	    if (this.editavel) {
	        $(this.idPai).append(this.montarCarregado());
	    } else {
            $(this.idPai).append(this.montarSomenteLeitura());
	    }
	}
	
	/**
	 * Adiciona um nó na árvore
	 */
	this.adicionar = function() {
	    $(this.idPai).append(this.montarAdicionar());
	    this.focar();
	}
	
	/**
	 * Edita o conteúdo de um nó
	 */
	this.editar = function() {
	    this.montarEditar();
	    this.focar();
	}
	
	/**
	 * Salva um nó e substitui pelo formato final
	 */
	this.salvar = function () {
	    var texto = $(this.id + ' > span > input').attr('value'); // Pega o valor de texto inserido

	    if (texto != undefined) {
	        texto = texto.trim();

	        if (texto != undefined && texto != "") {
	            var tmp = document.createElement("DIV");
	            tmp.innerHTML = texto;
	            texto = tmp.textContent || tmp.innerText;
	            texto = texto.trim();


	            this.texto = texto;

	        }
	    }
	}
	
	/**
	 * Cancelar a montagem de um elemento
	 */
	this.cancelar = function () {
		this.montar(this.valor, this.texto, this.sClass);
		
		if (this.texto == undefined)
			$(this.id).remove();
	}

	/**
	 * Atualiza os valores do nó
	 * @param string Valor do nó
	 * @param string Texto do nó
	 */
	this.atualizar = function(valor, texto) {
	    this.montar(valor, texto);
	}
	
	/**
	 * Exclui o nó
	 */
	this.excluir = function() {
		$(this.id).remove();
	}


/* ********************** SUB-ÁRVORE ********************** */

	/**
	 * Cria um subárvore para este nó
	 */
	this.criarArvore = function() {
	if (this.subarvore == undefined)
	    this.subarvore = new Arvore("sn_" + this.nome, this.nome, this.arvore.getCaminho(), this, false, this.editavel, this.selecionavel, this.sForm, this.posFixo, this.retorno);

	    this.abrir(); // Para garantir que a árvore não está oculta

	    this.subarvore.adicionarNo();
	}

	/**
	 * Carrega um subárvore para este nó a partir de um elemento carregado
	 * @param HTMLUlElement Elemento ul (jquery) do item da sub-árvore
	 */
	this.carregarArvore = function(ul) {
	if (this.subarvore == undefined)
	    this.subarvore = new Arvore("sn_" + this.nome, this.nome, this.arvore.getCaminho(), this, false, this.editavel, this.selecionavel, this.sForm, this.posFixo, this.retorno);
	    else
	        this.abrir(); // Para garantir que a árvore não está oculta
            
	    this.subarvore.carregarArvore(ul);
	}


/* ********************** MONTAR  ********************** */
	
	/**
	 * Monta a linha de adicionar um No de árvore
	 *	<li class="adicionar">
	 * 		<label for="novo">Adicionar [sub]nível:</label>
	 * 		<span>
	 * 			<input type="text" id="novo" name="novo" value="Arte, Cultura e Filosofia" />
	 * 			<a id="salvar" class="btn">salvar</a>
	 * 			<a id="cancelar" class="btn">cancelar</a>
	 * 		</span>
	 *	</li>
	 */
	this.montarAdicionar = function () {
	    var indice = this.indice;

	    var nome = this.nome;
	    var classe = (this.arvore.isRaiz()) ? "adicionar" : "subadicionar";

	    var li = $("<li></li>", { "class": classe, id: nome });
	    var span = $("<span></span>");
	    
	    // Texto
	    $("<input />", {
	        type: "text",
	        id: "novo_" + nome,
	        name: "novo_" + nome,
	        "class": "txt",
	        maxlength: 255,
	        keypress: function (event) {
	            if (event.keyCode == '13')
	                no.arvore.salvarNo(indice);
	        }
	    }).appendTo(span);

	    // Salvar
	    $("<a></a>", {
	        id: "salvar_" + nome,
	        name: "salvar_" + nome,
	        "class": "btn",
	        click: function () {
	            no.arvore.salvarNovoNo(indice);
	        }
	    }).append("salvar").appendTo(span);

	    // Cancelar
	    $("<a></a>", {
	        id: "cancelar_" + nome,
	        name: "cancelar_" + nome,
	        "class": "btn",
	        click: function () {
	            no.arvore.cancelarNoNovo(li);
	        }
	    }).append("cancelar").appendTo(span);

	    // Label
	    /*if (this.arvore.isRaiz())
	    $('<label>Adicionar n&iacute;vel:</label>').appendTo(li);
	    else
	    $('<label>Adicionar subn&iacute;vel:</label>').appendTo(li);*/

	    // Span
	    span.appendTo(li);
	    /*this.arvore.indice++;
	    this.indice = this.arvore.indice;*/
	    return li;
	}
	
	/**
	 * Montar a linha da árvore
	 *	<li id="arvore_sn1" class="no">
	 *		<img class="menos" src="img/icoMenos.png" alt="fechar" />
	 *		<span class="nome">
	 *			<a href="#">Leitura e interpretação de texto</a>
	 *			<span class="botoes" style="display:none;">
	 *				<a id="editar" class="btn">editar</a>
	 *				<a id="adicionar" class="btn">adicionar</a>
	 *				<a id="excluir" class="btnExcluir">excluir</a>
	 *			</span>
	 *		</span>
	 *		<ul class="subnivel"></ul>
	 *	</li>
	 */
	this.montar = function (valor, texto, estilo) {
	    
	    if (texto == undefined || texto == "")
	        texto = this.texto;
	    if (valor == undefined || valor == "")
	        valor = this.valor;

	    // Se o conteudo continua vazio após atualizar o valor, retorna undefined
	    if (texto == undefined || texto == "")
	        return undefined;

	    var id = this.id;
	    var indice = this.indice;

	    $(this.id).addClass('no');
	    $(this.id).removeClass('editar');
	    $(this.id).removeClass('adicionar');
	    $(this.id).removeClass('subadicionar');
	    $(this.id).removeClass('over');

	    var img = this.montarImagem();
	    var nome = $("<span></span>", {
	        "class": "nome",
	        mouseenter: function () {
	            $(this).parent().addClass('over');
	            $('span.botoes', $(this)).show();
	        },
	        mouseleave: function () {
	            $(this).parent().removeClass('over');
	            $('span.botoes', $(this)).hide();
	        }
	    });
	    var botoes = $("<span></span>", { "class": "botoes" }).css('display', 'none');

	    // Editar
	    $("<a></a>", {
	        id: "editar_" + this.nome,
	        "class": "btn",
	        click: function () {
	            no.arvore.editarNo(indice);
	        }
	    }).append("editar").appendTo(botoes);

	    // Adicionar
	    /*$("<a></a>", {
	        id: "adicionar_" + this.nome,
	        "class": "btn",
	        click: function () {
	            no.criarArvore();
	        }
	    }).append("adicionar").appendTo(botoes);*/

	    // Excluir
	    $("<a></a>", {
	        id: "excluir_" + this.nome,
	        "class": "btnExcluir",
	        click: function () {
	            no.arvore.excluirNo(indice);
	        }
	    }).append("excluir").appendTo(botoes);

	    $("<a></a>", { "class": "txt " + estilo }).append(texto).appendTo(nome);

	    botoes.appendTo(nome);

	    $(this.id + ' > label').remove();
	    $(this.id + ' > .ico').remove();
	    $(this.id + ' > input').remove();
	    $(this.id + ' > span').remove();

	    $(this.id).prepend(nome);
	    $(this.id).prepend(img);

	    this.texto = texto;
	    this.valor = valor;
	}

	/**
	 * Monta a linha de editar o No
	 *	<li class="editar">
	 * 		<span>
	 * 			<input type="text" id="novo" name="novo" value="Arte, Cultura e Filosofia" />
	 * 			<a id="salvar" class="btn">salvar</a>
	 * 			<a id="cancelar" class="btn">cancelar</a>
	 * 		</span>
	 *	</li>
	 */
	this.montarEditar = function() {
	    var span = $("<span></span>");
	    var indice = this.indice;

	    $(this.id).addClass('editar');
	    $(this.id).removeClass('no');
	    $(this.id).removeClass('adicionar');
	    $(this.id).removeClass('subadicionar');

	    $("<input />", {
	        type: "text",
	        id: "novo_" + this.nome,
	        name: "novo_" + this.nome,
	        "class": "txt",
            maxlength:255,
	        value: this.texto,
	        keypress: function(event) {
	            if (event.keyCode == '13') {
	                no.arvore.salvarNo(indice);
	            }
	        }
	    }).appendTo(span);

	    $("<a></a>", {
	        id: "salvar_" + this.nome,
	        name: "salvar_" + this.nome,
	        "class": "btn",
	        click: function() {
	            no.arvore.salvarNo(indice);
	        }
	    }).append("salvar").appendTo(span);

	    $("<a></a>", {
	        id: "cancelar_" + this.nome,
	        name: "cancelar_" + this.nome,
	        "class": "btn",
	        click: function() {
	            no.arvore.cancelarNo(indice);
	        }
	    }).append("cancelar").appendTo(span);

	    $(this.id + ' > span').replaceWith(span);
	    $(this.id + ' > .ico').replaceWith(this.montarImagem());
	}

	/**
	 * Monta a linha de um No de árvore carregado
	 *	<li id="arvore_sn1" class="no">
	 *		<img class="menos" src="img/icoMenos.png" alt="fechar" />
	 *		<span class="nome">
	 *			<a href="#">Leitura e interpretação de texto</a>
	 *			<span class="botoes" style="display:none;">
	 *				<a id="editar" class="btn">editar</a>
	 *				<a id="adicionar" class="btn">adicionar</a>
	 *				<a id="excluir" class="btnExcluir">excluir</a>
	 *			</span>
	 *		</span>
	 *		<ul class="subnivel"></ul>
	 *	</li>
	 */
	this.montarCarregado = function () {
	    var id = this.id;
	    var indice = this.indice;
	    var nome = this.nome;
	    var texto = this.texto;
	    var idlista = this.idlista;

	    var li = $("<li></li>", { "class": "no " + this.sClass, id: nome });
	    var span = $("<span></span>", {
	        "class": "nome",
	        mouseenter: function () {
	            $(this).parent().addClass('over');
	            $('span.botoes', $(this)).show();
	        },
	        mouseleave: function () {
	            $(this).parent().removeClass('over');
	            $('span.botoes', $(this)).hide();
	        }
	    });

	    var img = this.montarImagem();
	    var hid = this.montarHidden();

	    var botoes = $("<span></span>", { "class": "botoes" }).css('display', 'none');

	    // Editar
	    $("<a></a>", {
	        id: "editar_" + this.nome,
	        "class": "btn",
	        click: function () {
	            no.arvore.editarNo(no.indice);
	        }
	    }).append("editar").appendTo(botoes);

	    // Adicionar
	    /*$("<a></a>", {
	    id: "adicionar_" + this.nome,
	    "class": "btn",
	    click: function () {
	    no.criarArvore();
	    }
	    }).append("adicionar").appendTo(botoes);*/

	    // Excluir
	    $("<a></a>", {
	        id: "excluir_" + this.nome,
	        "class": "btnExcluir",
	        click: function () {
	            no.arvore.excluirNo(no.indice);
	        }
	    }).append("excluir").appendTo(botoes);

	    // Span
	    $("<a></a>", { "class": "txt " + this.sClass }).append(texto).appendTo(span);

	    botoes.appendTo(span);
	    img.appendTo(li);
	    if (hid != undefined)
	        hid.appendTo(li);
	    span.appendTo(li);

	    return li;
	}
	
	/**
	 * Monta a linha de um No de árvore somente leitura
	 *	<li id="arvore_sn1" class="no">
	 *		<img class="menos" src="img/icoMenos.png" alt="fechar" />
	 *		<span class="nome">
	 *			<a href="#">Leitura e interpretação de texto</a>
	 *			<span class="botoes" style="display:none;">
	 *				<a id="editar" class="btn">editar</a>
	 *				<a id="adicionar" class="btn">adicionar</a>
	 *				<a id="excluir" class="btnExcluir">excluir</a>
	 *			</span>
	 *		</span>
	 *		<ul class="subnivel"></ul>
	 *	</li>
	 */
	this.montarSomenteLeitura = function () {
	    var id = this.id;
	    var indice = this.indice;
	    var nome = this.nome;
	    var texto = this.texto;

	    var li = $("<li></li>", { "class": "no", id: nome });
	    var span = $("<span></span>", {
	        "class": "nome"
	    });

	    var img = this.montarImagem();
	    var hid = this.montarHidden();

	    $("<a></a>", { "class": "txt " + this.sClass }).append('<label for="' + img.attr('id') + '">' + texto + '</label>').appendTo(span);

	    img.appendTo(li);
	    /*if (this.raizselecionavel) {
	        var checkRaiz = this.imagemCheck(false);
	        checkRaiz.insertBefore(img);
	    }*/
	    

	    if (hid != undefined) hid.appendTo(li);

	    

	    span.appendTo(li);

	    

	    return li;
	}

	


/* ********************** MONTAR AS IMAGENS DA ARVORE ********************** */



	/**
	* Monta a imagem do ícone de expandir/recolher
	*/
	this.montarHidden = function () {
	    var id = this.id;
	    var hid = undefined;
	    if (this.subarvore == undefined)
	        this.estado = this.ESTADOS.FOLHA;

	    if (this.estado == this.ESTADOS.FOLHA && this.selecionavel) {
	        hid = $('<input />', {
	            "type": "hidden",
	            "id": "chkFolhaHid_" + this.valor,
	            "name": "chkFolhaHid_" + this.valor,
	            "value": this.idlista
	        });
	    }
	    return hid;
	}
	
	/**
	 * Monta a imagem do ícone de expandir/recolher
	 */
	this.montarImagem = function () {

	    var id = this.id;
	    var img;


	    if (this.subarvore == undefined && !this.isRaiz)
	        this.estado = this.ESTADOS.FOLHA;


	    switch (this.estado) {
	        case this.ESTADOS.FOLHA:
	            img = this.imagemCheck(true);
	            break;

	        case this.ESTADOS.FECHADO:
	            img = this.imagemFechado();
	            break;

	        case this.ESTADOS.ABERTO:
	            img = this.imagemAberto();
	            break;

	    }
	    //incluir o select junto;

	    return img;
	}
	
    this.imagemCheck = function(bolIco, bolRaiz){
        var img = $('<input />', {
                    "class": "selecionar " + (bolIco ? "ico" : "") + " " + (bolRaiz ? "checkRaiz" : ""),
	                "type": "checkbox",
	                "id": "chkFolha_" + this.nome,
	                "name": "chkFolha" + this.posFixo,
	                "value": this.valor
	            })
	    if (this.selecionado) {
	        img.attr("checked", "checked");
	    }
	    if (!this.selecionavel) {
	        img.attr("disabled", "disabled");
	    }

        return img;
    }
    this.imagemFechado = function () {
        var img = $("<img />", {
            "src": no.caminhoBase + "/" + "Content/imgcss/icoMais.png",
            "alt": "exibir",
            "class": "mais, ico",
            "click": function () {
                no.abrir();
            }
        });

        return img;
    }
    this.imagemAberto = function () {
        var img = $("<img />", {
            "src": no.caminhoBase + "/" + "Content/imgcss/icoMenos.png",
            "alt": "esconder",
            "class": "menos ico",
            "click": function () {
                no.fechar();
            }
        });
        return img;
    }
	/**
	 * Remontar a imagem do ícone de expandir/recolher
	 */
    this.remontarImagem = function () {
        if (this.subarvore == undefined && this.isRaiz)
            this.estado = this.ESTADOS.FOLHA;
        else
            this.estado = this.ESTADOS.ABERTO;

        var img = this.montarImagem();
        $(this.id + ' > .ico').replaceWith(img);

        //incluir o check caso seja necessário
        if (this.raizselecionavel && this.subarvore != undefined) {
            //verifica se já não foi inserido
            if ($(this.id + ' > input[type="checkbox"]').length <= 0) {
                var checkRaiz = this.imagemCheck(false, true);
                checkRaiz.insertBefore(img);
            }
            
        }


    }


/* ********************** RECOLHER E EXPANDIR A ÁRVORE ********************** */

	/**
	 * Expande a sub árvore do nó
	 */
	this.abrir = function(bAnimacao) {
	    bAnimacao = (bAnimacao == undefined) ? true : bAnimacao;
	
	    if (bAnimacao)
	        $(this.id + ' > ul').show('slow');
	    else
	        $(this.id + ' > ul').show();
        
	    this.estado = this.ESTADOS.ABERTO;

	    $(this.id + ' > .ico').replaceWith(this.montarImagem());
	}
	
	/**
	 * Recolhe a sub árvore do nó
	 */
	this.fechar = function(bAnimacao) {
	    bAnimacao = (bAnimacao == undefined) ? true : bAnimacao;

	    if (bAnimacao)
	        $(this.id + ' > ul').hide('slow');
	    else
	        $(this.id + ' > ul').hide();
		    
		    
		this.estado = this.ESTADOS.FECHADO;
		
		$(this.id + ' > .ico').replaceWith(this.montarImagem());
	}
	
	/**
	 * Seta o foco no input de texto da criação/edição do nó
	 */
	this.focar = function() {
		$(this.id + ' > span > input').focus();
    }

    /**
     * Expandir a subarvore e abrir o nó
     */
    this.expandir = function() {
        if (this.subarvore != undefined)
            this.subarvore.expandir();

        if (this.estado != this.ESTADOS.FOLHA)
            this.abrir(false);
    }
    
    /**
     * Recolher a subarvore e fechar o nó
     */
    this.recolher = function() {
        if (this.subarvore != undefined)
            this.subarvore.recolher();
        
        if (this.estado != this.ESTADOS.FOLHA)
            this.fechar(false);
    }


/* ********************** DADOS DO NÓ ********************** */

	/**
	 * Retorna o objeto do nó em formato string
	 * @return string Objeto nó em formato string
	 */
    this.toString = function () {
	    return '{ pai:' + this.arvore.getValorNoPai() + ', texto: "'+ encodeURI(this.texto) + '"' + ', valor: '+ this.valor + '}'
	}


	/**
	* Retorna o objeto do nó em formato string
	* @return string Objeto nó em formato string
	*/
	this.toPost = function() {
	    return '&pai=' + this.arvore.getValorNoPai() + '&texto=' + encodeURI(this.texto) + '&valor=' + (this.valor?this.valor:0) + '&indice=' + this.indice
	}

	/**
	 * Retorna o valor do nó
	 * @return int Valor do nó da árvore
	 */
	this.getValor = function() {
		return this.valor;
	}


	this.init();	
}