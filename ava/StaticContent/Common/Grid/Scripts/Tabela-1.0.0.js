function Tabela(sFormulario, sTabela, bIniciar, oOrdemPadrao, fRetornoPadrao, fCallBack) {
    var tbl = this;

    this.version    = "0.1.0";
    this.id         = sFormulario;
    this.formulario = 'form#' + sFormulario;
    this.tabela     = this.formulario + ' table#' + sTabela;
    this.inicia     = (bIniciar != undefined) ? bIniciar : false;
    this.caminho    = "";
    this.ordem      = (oOrdemPadrao != undefined) ? oOrdemPadrao : new Ordenacao();
    this.retornar   = fRetornoPadrao;
	this.callBack   = fCallBack;
    
    /**
     * Inicializa a tabela carregando o formulário e mantendo em ajax
     */
    this.init = function() {
        this.caminho = $(this.formulario).attr("action");

        this.criarElementos();
        this.criarFuncionalidades();
        this.criarOrdenacao();

        $(this.formulario).submit(function(e) {
            $.ajax({
                url: tbl.caminho,
                data: $(this).serialize() + '&' +  $('#idBanco').parents('form').serialize(),
                type: "POST",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(dados, status, xhttp) { tbl.carregarTabela(dados); }
            });
            tbl.carregar(true);
            
            e.preventDefault();
        });

        if (this.inicia) {
            $(this.formulario).submit();
        }
    };

    /**
     * Cria os elementos de ação e paginação
     */
    this.criarElementos = function() {
        var pagina    = document.createElement("input");
        var acao      = document.createElement("input");
        var ordem     = document.createElement("input");
        var viewstate = document.createElement("input");
        
        // Página
        pagina.type = "hidden";
        pagina.id = pagina.name = "txtPagina_" + this.id;
        pagina.value = "1";

        // Última Ação
        acao.type = "hidden";
        acao.id = acao.name = "txtAcao_" + this.id;
        acao.value = "1";
        
        // Ordenação
        ordem.type = "hidden";
        ordem.id = ordem.name = "txtOrdem_" + this.id;
        ordem.value = "";

        // Viewstate
        viewstate.type = "hidden";
        viewstate.id = viewstate.name = "viewState_" + this.id;

        $(this.formulario).prepend($(pagina));
        $(this.formulario).prepend($(acao));
        $(this.formulario).prepend($(ordem));
        $(this.formulario).append($(viewstate));
    }

    /**
     * Inicializa as funcionalidades padrões das tabelas
     */
    this.criarFuncionalidades = function() {
        // Seleciona todos os itens da tabela se houver um checkbox no cabeçalho
        $(this.tabela + ' > thead > tr > td > input[type=checkbox]').click(function() {
            var nome = 'input[type=checkbox][name=' + this.id + '.Checked]';

            if ($(this).attr('checked') == true)
                $(nome).attr("checked", "checked");
            else
                $(nome).removeAttr("checked");
        });
    }

    /**
     * Cria as ordenações baseado no link que está na tabela
     */
    this.criarOrdenacao = function() {
        $(this.tabela + ' > thead > tr > td > a').each(function() {
            var ordem = "";
            var caminho = $(this).attr('href');
            var padrao = new RegExp("ordem\=([^&]+)");

            if (padrao.test(caminho))
                ordem = padrao.exec(caminho)[1];

            $(this).attr('href', 'javascript:void(0)');
            if (ordem != "") {
                $(this).click(function() {
                    tbl.ordenar(ordem, this);
                });
            }
        });
    }

    /**
     * Ordena o campo
     * @param tipo String do tipo de ordenação
     * @param objeto HTMLAnchorElement da tag de ordenação
     */
    this.ordenar = function(tipo, objeto) {
        if (tipo == this.ordem.tipo) {
            this.ordem.ascendente = !this.ordem.ascendente;
        } else {
            this.ordem.tipo = tipo;
            this.ordem.ascendente = true;
        }

        this.redesenharOrdenacao(objeto);
        
        $("#txtOrdem_" + this.id).val(this.ordem.tipo + ',' + ((this.ordem.ascendente) ? 0 : 1));
        $(this.formulario).submit();
    }

    /**
     * Redesenha os icones de ordenação
     * @param objeto HTMLAnchorElement da tag de ordenação
     * @param direcao Direção da ordenação
     */
    this.redesenharOrdenacao = function(objeto) {
        $(this.tabela + ' > thead > tr > td > a').removeClass(Ordenacao.CRESCENTE);
        $(this.tabela + ' > thead > tr > td > a').removeClass(Ordenacao.DECRESCENTE);
        
        if (this.ordem.ascendente)
            $(objeto).addClass(Ordenacao.CRESCENTE);
        else
            $(objeto).addClass(Ordenacao.DECRESCENTE);
    }

    /**
     * Carregar as tabelas com os dados retornados pelo servidor
     * @param string dados Dados carregados pelo servidor com as informações da tabela
     */
    this.carregarTabela = function(dados) {
        
        var id = this.id;
        if ($("#txtTotalRegistro_" + id).is("input:hidden") == false)
        {        
            var total       = document.createElement("input");
            total.type      = "hidden";
            total.id        = total.name = "txtTotalRegistro_" + id;
            total.value     = "-1";
            $(this.formulario).prepend($(total));
        }
        
        this.verficiarPagina(dados);
        this.carregarPaginacao(dados);
        this.carregarFiltro(dados);
        this.carregarAcaoMassa();
        this.carregarLinhas(dados);        
        
    }

    /**
     * Verifica e altera a página para a que retornou da tabela
     */
    this.verficiarPagina = function(dados) {
        var id = this.id;
        $(dados).each(function() {
            $("#txtTotalRegistro_" + id).val($(this).attr('total'));
            tbl.alterarPagina($(this).attr('atual'));
        });
    }

    /**
     * Carrega as linhas da tabela, com a paginação 
     * @param string dados HTML com as linhas da tabela
     */
    this.carregarLinhas = function (dados) {
        var tamanhos = [];
        var corpo = this.tabela + ' > tbody';

        $(dados).find("tbody").each(function () {
            if ($(tbl.tabela).hasClass('scroll')) {
                tamanhos = tbl.adicionarScroll();
                corpo += " > tr > td > div > table > tbody";
            }
            $(corpo).html($(this).children());
        });

        // Efeito da linha selecionada
        $(corpo + ' > tr').each(function (index) {
            
                // Linha colorida
                if (index % 2) $(this).addClass('impar');

                // Cria o efeito de Mouse Over
                $(this).hover(function () {
                    $('div.botoes', this).css('display', 'block');
                }, function () {
                    $('div.botoes', this).css('display', 'none');
                });
            
            tbl.carregarAcao(this);
        });
		
		if (this.callBack!=undefined)
			this.callBack(dados);
		
    }

    /**
     * Adicionar scroll em tabelas compatíveis com todos os navegadores
     * @return string Caminho do novo corpo da tabela
     */
    this.adicionarScroll = function() {
        var cabecalho = this.tabela + ' > thead';
        var corpo = this.tabela + ' > tbody';

        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var div = document.createElement("div");
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");

        var tamanhos = [];

        // Retorna as larguras das colunas
        $(cabecalho + ' > tr > td').each(function() {
            tamanhos.push($(this).css('width'));
        });

        table.className = "tabela";
        table.cellSpacing = "0";
        table.cellPadding = "0";
        
        // Seta o colspan
        td.colSpan = this.contarColunas($(cabecalho + ' > tr'));

        table.appendChild(tbody);

        div.appendChild(table);
        td.appendChild(div);
        tr.appendChild(td);

        $(corpo).html($(tr));

        return tamanhos;
    }

    /* PAGINAÇÃO */

    /**
     * Carrega a paginação
     * @param string dados HTML com a paginação da tabela
     */
    this.carregarPaginacao = function(dados) {
        var resultado = this.formulario + ' > div.ferramentas > div.resultado';
        var paginacao = this.formulario + ' > div.ferramentas > div.paginacao';

        $(resultado).empty();
        $(paginacao).empty();

        $(dados).find("tfoot").each(function() {
            $(paginacao).html($('tr > td#pagina', this).children());
            $(resultado).html($('tr > td#resultado', this).html());
        });

        // Altera o link de paginação para clicks
        $(paginacao + ' > a').each(function() {
            var pagina = 0;
            var caminho = $(this).attr('href');
            var padrao = new RegExp("pagina\=(\\d+)");

            if (padrao.test(caminho))
                pagina = padrao.exec(caminho)[1];

            $(this).attr('href', 'javascript:void(0)');

            if ($(this).attr('class') != "selecionado" && pagina > 0) {
                $(this).click(function() {
                    tbl.trocarPagina(pagina);
                });
            }
        });
    }

    /**
     * Trocar de página da tabela
     * @param int pagina Número da página
     */
    this.trocarPagina = function(pagina) {
        $("#txtAcao_" + this.id).val("paginar");
        $("#txtPagina_" + this.id).val(pagina);
        

        $(this.formulario).submit();
    }

    /**
     * Trocar de página da tabela
     * @param int pagina Número da página
     */
    this.alterarPagina = function(pagina) {
        $("#txtAcao_" + this.id).val("paginar");
        $("#txtPagina_" + this.id).val(pagina);
    }

/* ACAO EXTERNA */

    /**
     * Carrega uma ação externa (exemplo: botões dentro da linha) dentro da tabela
     */
    this.carregarAcao = function(linha) {
        var botoes = $('div.botoes > a', linha);

        botoes.each(function(index) {
            var botao = $(this);
            var link = $(this).attr('href');

            if (botao.is('.normal')) { // se for para manter o click

            } else if (botao.is('.funcao')) { // se for uma função javascript ele refaz como onclick
                botao.click(function() {
                    setTimeout(link, 1);
                });
                botao.attr('href', 'javascript:void(0)');
            } else {
                botao.click(function() {
                    tbl.executarAcao($(this).html(), link, tbl.retornarAcao);
                });
                botao.attr('href', 'javascript:void(0)');
            }
        });
    }

    /**
     * Executa uma ação externa (exemplo: botões dentro da linha) dentro da tabela
     */
    this.executarAcao = function(acao, link, retorno) {
        $("#txtAcao_" + this.id).val(acao);
        
        $.ajax({
            url: link,
            data: $(this.formulario).serialize() + '&' + $('#idBanco').parents('form').serialize(),
            type: "POST",
            success: function(data) { tbl.retornarAcao(acao, data); }
        });
    }

    /**
     * Executa um retorno de função para tratar retornos padrões de mensagem
     */
    this.retornarAcao = function(acao, dados) {
        if (this.retornar != undefined)
            this.retornar(acao, dados)
    }
    


/* FILTRO */

    /**
     * Carrega o filtro da página
     * @param string dados HTML com a paginação da tabela
     */
    this.carregarFiltro = function (dados) {
        var filtro = this.formulario + ' > div.ferramentas > div.filtros';

        // Configura o combo do Filtro
        $(this.formulario + ' > div.ferramentas > div.slc#filtro').combo({
            close: "fechar",
            onOpen: function () { },
            onExecute: function () { tbl.executarFiltro(); },
            onClose: function () { tbl.limparFiltro(); }
        });

        // Esvazia o cabeçalho de filtros e adiciona a listagem nova
        $(dados).find("thead").each(function (index) {
            $(filtro).empty();
            $(filtro).html($("tr > td", this).html());
        });

        // Adiciona a funcionalidade de remover filtro no botão fechar do filtro
        $('span.botaoFiltro').each(function (index) {
            var id = $(this).attr('id');

            $('a.botaoFechar', this).attr('href', 'javascript:void(0)')
            .click(function () {
                tbl.removerFiltro(id);
            });
        });
    }

    /**
     * Executa um filtro da tabela
     */
    this.executarFiltro = function() {
        $("#txtAcao_" + this.id).val("filtrar");
        $(this.formulario).submit();
    }



    /**
     * Executa uma ação ordenar
     */
    this.executarOrdem = function() {
        $("#txtAcao_" + this.id).val("ordenar");
        $(this.formulario).submit();
    }


    this.TrocaPeriodo = function() {
        $("#txtAcao_" + this.id).val("periodo");
        $(this.formulario).submit();
    }
    
    /**
     * Remove um filtro da tabela
     * @param id Identificador do filtro removido
     */
    this.removerFiltro = function (id) {
        var hidden = $('#txtFiltros');
        var campo = id.split('_')[1];
        var array = eval(hidden.val());
        var filtros = new Array();

        for (i = 0; i < array.length; i++)
            if (array[i].campo != campo)
                filtros.push(new Filtro(array[i]));

        name = id.replace("filtro_", "");

        if ($('#' + name).is("input:text")) {
            $('#' + name).val('');
        }
        else if ($('#' + name).is("input:radio") || $('#' + name).is("input:checkbox")) {
            $('#' + name).attr('checked', '');
        }
        else if ($('#' + name).is("select")) {
            $('#' + name).get(0).selectedIndex = 0;
            $('#' + name).trigger('change');
        }

        $('#' + id).remove();
        hidden.val('[' + filtros + ']');

        tbl.recarregarTabela();
    }

    this.limparFiltro = function(id) {
        var caminho = this.formulario + ' > div.ferramentas > div.slc#filtro';
    
     /* $(caminho + ' select').each(function() { $(this).get(0).selectedIndex = 0; });
        $(caminho + ' input:text').each(function() { $(this).val(''); });
        $(caminho + ' input:checkbox').each(function() { $(this).attr('checked', ''); });
        $(caminho + ' input:radio').each(function() { $(this).attr('checked', ''); });*/
    }

/* ACAO EM MASSA */

    /**
     * Carrega o item de ações em massa para executar funções pelos itens selecionados
     */
    this.carregarAcaoMassa = function() {
        $(this.formulario + ' > div.ferramentas > div.slc#acao').combo({
            close: "fechar",
            onOpen: function () { },
            onClose: function() { }
        });

        $('#acao > div > a').each(function(index) {
            var acao = "";
            var caminho = $(this).attr('href');
            var padrao = new RegExp("acao\=([^&]+)");

            if (padrao.test(caminho))
                acao = padrao.exec(caminho)[1];

            $(this).attr('href', 'javascript:void(0)');
            if (acao != "") {
                $(this).click(function() {
                    tbl.executarAcaoMassa(acao);
                });
            }
            $(this).parent().hide();
            $('a', $(this).parent().parent()).removeClass('selecionado');
        });
    }

    /**
     * Executa uma ação em massa
     */
    this.executarAcaoMassa = function(acao) {
        $("#txtAcao_" + this.id).val(acao);
        $.ajax({
            url: tbl.caminho,
            data: $(tbl.formulario).serialize() + '&' + $('#idBanco').parents('form').serialize(),
            type: "POST",
            success: function(dados) { tbl.retornarAcaoMassa(acao, dados); }
        });
    }
    
    /**
     * Retorna a ação em massa para a função que trata retornos de dados
     */
    this.retornarAcaoMassa = function(acao, dados) {
        if (this.retornar != undefined)
            this.retornar(acao, dados)
        
        this.recarregarTabela();
       
    }
    

/* OUTRAS FUNCIONALIDADES */

    /**
     * Recarrega a tabela
     */
    this.recarregarTabela = function() {
        $("#txtAcao_" + this.id).val("recarregar");
        $(this.formulario).submit();
        
         
        
    }

    /**
     * Limpar a tabela
     */
    this.limpar = function() {
        $(this.tabela + ' > thead > tr > td > input[type=checkbox]').each(function() {
            $(this).attr('checked', '');
        });
        $(this.tabela + ' > tbody').html($("<tr><td></td></tr>"));
    }

    /**
     * Exibir carregando na tabela
     */
    this.carregar = function(exibir) {
        this.limpar();
        
        if (exibir) {
            var linha = document.createElement("tr");
            var coluna = document.createElement("td");

            coluna.className = "carregando";
            try{
                coluna.colSpan = this.contarColunas($(this.tabela + ' > thead tr'));
            }catch(e){};

            linha.appendChild(coluna);

            $(this.tabela + ' > tbody').html($(linha));
        }
    }

    /**
     * Conta a quantidade de colunas de uma linha dinamicamente (considerando os colspan)
     * @param linha JQuery da linha para contar as colunas
     */
    this.contarColunas = function(linha) {
        var colunas = 0;
        $(linha).children().each(function(index) {
            var valor = $(this).attr('colspan');
            colunas += (valor == undefined) ? 1 : valor;
        });
        
        return colunas;
    }

    /**
     * 
     */
    this.tratarErros = function(dados) { }
    
    $(document).ready(function() { tbl.init(); });
}