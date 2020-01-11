function Lista(sId, sLocal, sFormulario, sTitulo, fRetornoPadrao) {
    var lst = this;

    this.TIPO = { LISTA: 0, SELECIONADO: 1 }
	
    this.id = '#' + sId;
    this.nome = sId;
    this.formulario = "form#" + sFormulario;
    this.local = '#' + sLocal;
    this.caminho = "";
    this.retornar = fRetornoPadrao;

    if (sTitulo.indexOf(',') > -1) {
        this.titulo = sTitulo.split(',');
    } else {
        this.titulo = [];
        this.titulo[0] = sTitulo;
        this.titulo[1] = sTitulo;
    }
    
    this.lista = this.nome + "_lista";
    this.botaoAssociar = this.nome + "_botaoAssociar";
    this.botaoDesassociar = this.nome + "_botaoDesassociar";
    this.selecionado = this.nome + "_selecionado";

    /**
     * Inicializar da lista
     */
    this.init = function() {
        this.caminho = $(this.formulario).attr("action");

        $(this.formulario).submit(function(e) {
            var acao = $("#txtAcao_" + lst.nome).attr("value");
            $.ajax({
                url: lst.caminho,
                data: $(this).serialize() + '&' + lst.getPostSelecionados(),
                type: "POST",
                success: function (dados, status, xhttp) {
                    lst.carregarRetorno(dados, acao);
                    lst.esconderCarregando(lst.lista);
                    lst.esconderCarregando(lst.selecionado);
                }
            });
            e.preventDefault();
        });

        this.montar();
    }

    /**
     * Executa a ação de buscar
     */
    this.buscar = function () {
        this.mostrarCarregando(this.lista);
        $("#txtAcao_" + this.nome).attr("value", "buscar");
        $(this.formulario).submit();
    }

    /**
     * Executa a ação de adicionar
     */
    this.adicionar = function () {
        this.mostrarCarregando(this.selecionado);
        $("#txtAcao_" + this.nome).attr("value", "adicionar");
        $(this.formulario).submit();
    }
    
    /**
     * Executa a ação de adicionar
     */
    this.carregar = function () {
        this.mostrarCarregando(this.lista);
        this.mostrarCarregando(this.selecionado);
        $("#txtAcao_" + this.nome).attr("value", "carregar");
        $(this.formulario).submit();
    }

    /**
     * Carrega a resposta de uma ação do banco
     * @param dados string HTML dos dados carregados
     * @param acao string Tipo da ação
     */
    this.carregarRetorno = function(dados, acao) {
        switch (acao) {
            case "buscar":
                this.carregarItens(dados, this.lista);
                break;
            case "carregar":
                this.carregarAtuais(dados, this.selecionado);
                break;
            case "adicionar":
                this.retornar(dados);
                break;
        }
    }

    /**
    * Carrega a resposta de uma ação do banco
    * @param dados string HTML dos dados carregados
    */
    this.carregarItens = function(dados, local) {
        var associados = '#' + this.selecionado + ' ul > li  > input';
        var itens = $("ul#lista", dados);
        var resultado = $("div#resultado", dados);

        var quantidade = parseInt(itens.attr('title'));

        if (quantidade > 0) {
            itens.children().each(function() {
                var check = $(' > input:checkbox', this);
                if ($(associados + "[value=" + check.attr('value') + "]").length > 0)
                    check.attr('disabled', 'disabled');
            });

            $('#corpo' + local).html(itens.html());
            $('#corpo' + local + " > li:odd").addClass('par');
        } else {
            $('#corpo' + local).html(itens.html());
        }

        $('#' + local + ' > div.rodape').html(resultado.html());

    }

    /**
     * Carrega a resposta de uma ação do banco
     * @param dados string HTML dos dados carregados
     */
    this.carregarAtuais = function(dados, local) {
        var associados = '#' + this.selecionado + ' ul > li  > input';
        var itens = $("ul#lista", dados);
        var resultado = $("div#resultado", dados);

        var quantidade = parseInt(itens.attr('title'));

        if (quantidade > 0) {
            itens.children().each(function() {
                var check = $(' > input:checkbox', this);
                if ($(associados + "[value=" + check.attr('value') + "]").length > 0)
                    check.attr('disabled', 'disabled');
            });

            $('#corpo' + local).html(itens.html());
            $('#corpo' + local + " > li:odd").addClass('par');
        } else {
            $('#corpo' + local).html(itens.html());
        }

        $('#' + local + ' > div.rodape').html(resultado.html());

    }

    /**
     * Conta os itens selecionados
     */
    this.contarSelecionados = function() {
        var texto, total;

        total = $('#corpo' + this.selecionado + ' > li').length;

        if (total > 1)
            texto = total + " itens selecionados";
        else if (total == 1)
            texto = total + " item selecionado";
        else
            texto = "Nenhuma item selecionado";

        $('#' + this.selecionado + ' > div.rodape').html(texto);
    }
    
    /**
    * Montar o componente completo (listas, botão e formulário)
    */
    this.montar = function() {
        var pai = $(this.local);
        var botoes = $("<div></div>", { "class": "setas" });

        this.montarAcao();

        botoes.append(this.montarBotaoAssociar(this.botaoAssociar));
        botoes.append(this.montarBotaoDesassociar(this.botaoDesassociar));
        
        pai.append(this.montarLista(this.lista, this.TIPO.LISTA));
        pai.append(botoes);
        pai.append(this.montarLista(this.selecionado, this.TIPO.SELECIONADO));
    }

    /**
     * Monta os itens de ação do formulário
     */
    this.montarAcao = function() {
        var acao = document.createElement("input");
        var viewstate = document.createElement("input");

        // Última Ação
        acao.type = "hidden";
        acao.id = acao.name = "txtAcao_" + this.nome;
        acao.value = "1";

        // Viewstate
        viewstate.type = "hidden";
        viewstate.id = viewstate.name = "viewState_" + this.nome;

        $(this.formulario).prepend($(acao));
        $(this.formulario).append($(viewstate));
    }

    /**
     * Montar uma lista
     * @param string Nome da lista
     * @param int Tipo da lista
     *  <div class="lst">
     *      <div class="topo">
     *          <span class="textoLista">Disciplinas</span>
     *          <span class="acoesLista">
     *               selecionar: 
     *               <a id="todosAssociar" class="lnk">todos</a>, 
     *               <a id="nenhumAssociar" class="lnk">nenhum</a>
     *               <input type="button" id="btnAssociar" nome="btnAssociar" class="btnM" value="associar" />
     *           </span>
     *      </div>
     *      <div class="corpo">
     *           <ul>
     *              <li>
     *                  <input id="chkAssociarDisciplina" name="chkAssociarDisciplina" type="checkbox" value="" class="espCampo" />
     *                  <strong>Nome da disciplina</strong> - código disciplina
     *              </li>
     *          </ul>
     *      </div>
     *      <div class="rodape">Encotradas 22 disciplinas.</div>
     *  </div>
     */
    this.montarLista = function(nome, tipo) {
        var lista = $("<div></div>", { "class": "lst", id: nome });
        var topo = $("<div></div>", { "class": "topo" });
        var corpo = $("<div></div>", { "class": "corpo" });
        var rodape = $("<div></div>", { "class": "rodape" });

        // Cabeçalho
        var texto = $("<span></span>", { "class": "titulo" }).append(this.titulo[tipo]).appendTo(topo);
        var acoes = $("<span></span>", { "class": "acoes" }).append("selecionar: ").appendTo(topo);

        $("<a></a>", {
            id: "todosLista" + nome,
            href: 'javascript:void(0)',
            "class": "lnk",
            click: function() { lst.selecionarLista(nome, true); }
        }).append("todos").appendTo(acoes);
        acoes.append(", ");
        $("<a></a>", {
            id: "nenhumLista" + nome,
            href: 'javascript:void(0)',
            "class": "lnk",
            click: function() { lst.selecionarLista(nome, false); }
        }).append("nenhum").appendTo(acoes);

        if (tipo == this.TIPO.LISTA) {
            $("<input />", {
                type: "button",
                id: "btnAssociar" + nome,
                nome: "btnAssociar" + nome,
                value: "associar",
                "class": "btnM",
                click: function() { lst.associar(); }
            }).appendTo(acoes);
        } else {
            $("<input />", {
                type: "button",
                id: "btnRemover" + nome,
                nome: "btnRemover" + nome,
                value: "remover",
                "class": "btnExcluir btnM",
                click: function() { lst.remover(); }
            }).appendTo(acoes);
        }

        // Corpo
        $('<ul></ul>', { id: "corpo" + nome }).appendTo(corpo);

        lista.append(topo);
        lista.append(corpo);
        lista.append(rodape);

        return lista;
    }

    /**
     * Montar o botão central de associar itens da lista
     * <a href="javascript:void(0);">&gt;</a>
     */
    this.montarBotaoAssociar = function(nome) {
        var botao = $('<a></a>', {
            id: nome,
            href: "javascript:void(0);",
            "class": "btnSeta",
            "alt": "associar",
            click: function() {
                lst.associar();
            }
        }).append("&gt;");

        return botao;
    }


    /**
     * Montar o botão central de desassociar itens da lista
     * <a href="javascript:void(0);">&lt;</a>
     */
    this.montarBotaoDesassociar = function(nome) {
        var botao = $('<a></a>', {
            id: nome,
            href: "javascript:void(0);",
            "class": "btnSetaInvertida",
            "alt": "remover",
            click: function() {
                lst.remover();
            }
        }).append("&lt;");

        return botao;
    }

    /**
     * Associa os itens selecionados na lista
     */
    this.associar = function() {
        var associar = '#' + this.lista + ' input:checked';
        var associados = '#' + this.selecionado + ' ul';

        $(associar).each(function() {
            var check = $(this).attr('checked', '').attr('disabled', 'disabled');
            var li = check.parent().clone();

            li = check.parent().clone();
            $('> input', li).attr('disabled', '');

            $(associados).append(li);
        });

        $(associados + ' > li:odd').addClass('par');
        $(associados + ' > li:even').removeClass('par');

        this.contarSelecionados();
    }

    /**
     * Remove os itens da lista selecionada
     */
    this.remover = function() {
        var associar = '#' + this.lista + ' input';
        var associados = '#' + this.selecionado + ' input:checked';

        $(associados).each(function() {
            var check = $(this);
            
            $(associar + "[value="+ check.attr('value') +"]").attr('disabled', '');
            
            check.parent().remove();
        });
        
        this.contarSelecionados();
    }

    /**
     * Seleciona os itens de uma lista
     * @param string Nome da lista com os itens que serão selecionados
     * @param boolean true para selecionar todos ou false para desselecionar os itens
     */
    this.selecionarLista = function(nome, selecionar) {
        $('#' + nome + ' input:checkbox').each(function() {
            if (!$(this).attr('disabled'))
                $(this).attr('checked', (selecionar) ? 'checked' : '');
        });
    }

    /**
     * Retorna a lista de ids selecionados
     */
    this.getPostSelecionados = function() {
        var selecionados = []
        $('#' + this.selecionado + ' input:checkbox').each(function() {
            selecionados.push($(this).attr('value'));
        });

        return 'chkSelecionados='+selecionados.toString();
    }

    /**
     * Retorna a lista de ids selecionados
     * @param array Array com os valores dos checkboxes selecionados
     */
    this.getSelecionados = function() {
        var selecionados = [];
        var nome = '#' + this.selecionado + ' input:checkbox';

        $(nome).each(function() {
            selecionados.push($(this).attr('value'));
        });

        return selecionados;
    }


    /**
     * Limpa os conteudos do objeto de lista
     */
    this.limpar = function() {
        $('#' + this.lista + ' > div.corpo > ul').empty();
        $('#' + this.lista + ' > div.rodape').empty();

        $('#' + this.selecionado + ' > div.corpo > ul').empty();
        $('#' + this.selecionado + ' > div.rodape').empty();
    }


    this.mostrarCarregando = function (parte) {
        $('#' + parte + ' > div.corpo').addClass('carregando');
    }
    this.esconderCarregando = function (parte) {
        $('#' + parte + ' > div.corpo').removeClass('carregando');
    }

    this.init();
}