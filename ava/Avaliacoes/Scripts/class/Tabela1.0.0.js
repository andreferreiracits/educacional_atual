var retornoCarregarLinhas = undefined;


function Tabela(sFormulario, sTabela, bIniciar, oOrdemPadrao, fRetornoPadrao, sFormExtra, fVazio, bolSemFormNomeCampos) {
    var tbl = this;

    this.version = "0.1.0";
    this.id = sFormulario;
    this.formulario = 'form#' + sFormulario;
    this.tabela = this.formulario + ' table#' + sTabela;
    this.inicia = (bIniciar != undefined) ? bIniciar : false;
    this.caminho = "";
    this.ordem = (oOrdemPadrao != undefined) ? oOrdemPadrao : new Ordenacao();
    this.retornar = fRetornoPadrao;
    this.formExtra = sFormExtra;
    this.retornoVazio = fVazio
    this.openFiltro;
    this.retornoCarregarTabela = undefined;
    this.tabelaOriginal = ' table#' + sTabela;
    this.varOrdenar = true;

    this.atualizarSelecionados = false;
    this.checkBoxName = "";
    this.bolNovoFiltro = false;
    
    this.onExecutarAcao = undefined;

    if (bolSemFormNomeCampos) {
        this.bolSemFormNomeCampos = bolSemFormNomeCampos
    } else {
        this.bolSemFormNomeCampos = false
    }
    //false = inativo, true = ativo(padrão)
    this.ModeOrdenacao = function (mode) {
        tbl.varOrdenar = mode;
        if (!tbl.varOrdenar)
            $(tbl.tabela).addClass("offOrdenacao");
    }


    /**
    * Inicializa a tabela carregando o formulário e mantendo em ajax
    */
    this.init = function () {
        this.caminho = $(this.formulario).attr("action");

        this.criarElementos();
        this.criarFuncionalidades();
        this.criarOrdenacao();
        this.iniNovoFiltro();

        $(this.formulario + ' > div.ferramentas > div.funcao > div.slc > div').hide();

        if (!this.bolNovoFiltro) {
            $(this.formulario + " #filtro").keypress(function (e) {
                if (e.which == 13) {
                    tbl.executarFiltro();
                    $('a.fechar').trigger("click");
                }
            });
        }

        $(this.formulario).submit(function (e) {

            tbl._exibir(true);

            //descinsiderar os campos que não serão enviados:
            $(this).find('.notsend').attr('disabled', 'disabled');
            $(tbl.formExtra).find('.notsend').attr('disabled', 'disabled');

            //ajusta os campos de texto
            var camposTexto = $(this, tbl.formExtra).find(' input[type="text"]');
            camposTexto.each(function () {
                if ($(this).val() == $(this).attr('title')) {
                    $(this).val('');
                }
            });


            if (tbl.formExtra) {
                var dados = $(this).serialize() + '&' + $(tbl.formExtra).serialize()
            } else {
                var dados = $(this).serialize() + '&' + $('#idBanco').parents('form').serialize();
            }

            tbl.requisicao(tbl.caminho, dados, function (dados, status, xhttp) {
                tbl.carregarTabela(dados);
                //reabilita os campos
                $(tbl.formulario).find('.notsend').removeAttr('disabled');
                $(tbl.formExtra).find('.notsend').removeAttr('disabled');
                camposTexto.each(function () {
                    if ($.trim($(this).val()) == '') {
                        $(this).val($(this).attr('title'));
                    }
                });
            });

            tbl.carregar(true);

            e.preventDefault();
        });

        if (this.inicia) {
            $(this.formulario).submit();
        }

        tbl._exibir(this.inicia);

        $(this.formulario + ' div.ferramentas.hide').show();
    };
    this._exibir = function (bol) {
        if (bol) {
            $(tbl.tabela).show();
        } else {
            $(tbl.tabela).hide();
        }
    };
    this.requisicao = function (caminho, dados, retorno) {
        $.ajax({
            url: caminho,
            data: dados,
            type: "POST",
            success: function (dados, status, xhttp) {
                retorno(dados, status, xhttp);
            }
        });
    }


    this.setTabelaExterna = function(strTabela){
        if(strTabela){
            this.tabela = strTabela;
        }else{
            this.tabela = this.tabelaOriginal;
        }
    }
    /**
    * Cria os elementos de ação e paginação
    */
    this.criarElementos = function () {
        var pagina = document.createElement("input");
        var acao = document.createElement("input");
        var ordem = document.createElement("input");
        var viewstate = document.createElement("input");
        

        //tabela de orgiem
        if (!this.bolSemFormNomeCampos) {
            var tblorigem = document.createElement("input");
            tblorigem.type = "hidden";
            tblorigem.name = "txtTabelaOrigem";
            tblorigem.value = this.id;
            $(this.formulario).append($(tblorigem));
        }
        // Página
        pagina.type = "hidden";
        if (this.bolSemFormNomeCampos) {
            pagina.id = "txtPagina_" + this.id;
            pagina.name = "txtPagina";
        } else {
            pagina.id = pagina.name = "txtPagina_" + this.id;
        }

        pagina.value = "1";

        // Última Ação
        acao.type = "hidden";
        if (this.bolSemFormNomeCampos) {
            acao.id = "txtAcao_" + this.id;
            acao.name = "txtAcao";
        } else {
            acao.id = acao.name = "txtAcao_" + this.id;
        }
        acao.value = "1";

        // Ordenação
        ordem.type = "hidden";
        if (this.bolSemFormNomeCampos) {
            ordem.id = "txtOrdem_" + this.id;
            ordem.name = "txtOrdem";
        } else {
            ordem.id = ordem.name = "txtOrdem_" + this.id;
        }
        ordem.value = "";

        // Viewstate
        viewstate.type = "hidden";
        if (this.bolSemFormNomeCampos) {
            viewstate.id = "viewState_" + this.id;
            viewstate.name = "viewState";
        } else {
            viewstate.id = viewstate.name = "viewState_" + this.id;
        }

        $(this.formulario).prepend($(pagina));
        $(this.formulario).prepend($(acao));
        $(this.formulario).prepend($(ordem));
        $(this.formulario).append($(viewstate));
        
    }

    /**
    * Inicializa as funcionalidades padrões das tabelas
    */
    this.criarFuncionalidades = function () {
        // Seleciona todos os itens da tabela se houver um checkbox no cabeçalho
        $(this.tabela + ' > thead > tr > td > input[type=checkbox]').click(function () {

            var nome = 'input[type=checkbox][name="' + this.id + '.Checked"]';

            if ($(this).is(':checked'))
                $(nome).attr("checked", true);
            else
                $(nome).removeAttr("checked");

            tbl.atualizaChecked();
        })


        //atualiza o contador atualizaChecked
    }

    /**
    * Cria as ordenações baseado no link que está na tabela
    */
    this.criarOrdenacao = function () {
        $(this.tabela + ' > thead > tr > td > a').each(function () {
            var ordem = "";
            var caminho = $(this).attr('href');
            var padrao = new RegExp("ordem\=([^&]+)");

            if (padrao.test(caminho))
                ordem = padrao.exec(caminho)[1];

            $(this).attr('href', 'javascript:void(0)');
            if (ordem != "") {
                $(this).click(function () {
                    if (tbl.varOrdenar)
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
    this.ordenar = function (tipo, objeto) {
        if (tipo == this.ordem.tipo) {
            this.ordem.ascendente = !this.ordem.ascendente;
        } else {
            this.ordem.tipo = tipo;
            this.ordem.ascendente = true;
        }

        this.redesenharOrdenacao(objeto);

        $("#txtAcao_" + this.id).val("paginar");
        $("#txtOrdem_" + this.id).val(this.ordem.tipo + ',' + ((this.ordem.ascendente) ? 0 : 1));
        $(this.formulario).submit();
    }

    /**
    * Redesenha os icones de ordenação
    * @param objeto HTMLAnchorElement da tag de ordenação
    * @param direcao Direção da ordenação
    */
    this.redesenharOrdenacao = function (objeto) {
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
    this.carregarTabela = function (dados) {
        if (this.retornoErros(dados)) {
            if (this.retornoCarregarTabela != undefined)
                this.retornoCarregarTabela(dados);
        }
        this.verificarVazio(dados)

        this.verficiarPagina(dados);

        this.carregarPaginacao(dados);
        this.carregarFiltro(dados);
        this.carregarNovoFiltro(dados);

        this.carregarAcaoMassa();
        this.carregarLinhas(dados);

        $(this.tabela)[0].cellSpacing = "0";
        $(this.tabela)[0].cellPadding = "0";

        this.atualizaChecked();

        //aplica a ação aos botoes
        $(this.tabela + ' input[type=checkbox][name$=".Checked"]').change(function () {

            tbl.atualizaChecked();
        });

        if (retornoCarregarLinhas != undefined)
            retornoCarregarLinhas();

        if (this.retornoCarregarTabela != undefined)
            this.retornoCarregarTabela(dados);


    }

    /**
    * Verifica se a tabela retornou vazio e dispara um callback
    */
    this.verificarVazio = function (dados) {
        if (this.retornoVazio) {
            if ($(dados).find('.vazio').length > 0) {
                this.retornoVazio(true);
            } else {
                this.retornoVazio(false);
            }
        }
    }
    /**
    * Verifica e altera a página para a que retornou da tabela
    */
    this.verficiarPagina = function (dados) {
        $(dados).each(function () {
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
                if ($(this).hasClass('lockLinha')) {
                    return;
                }
                $('div.botoes', this).css('display', 'block');
            }, function () {
                if ($(this).hasClass('lockLinha')) {
                    return;
                }
                $('div.botoes', this).css('display', 'none');


            });

            tbl.carregarAcao(this);
        });
    }
    
    /**
    * Adicionar scroll em tabelas compatíveis com todos os navegadores
    * @return string Caminho do novo corpo da tabela
    */
    this.adicionarScroll = function () {
        var cabecalho = this.tabela + ' > thead';
        var corpo = this.tabela + ' > tbody';

        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var div = document.createElement("div");
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");

        var tamanhos = [];

        // Retorna as larguras das colunas
        $(cabecalho + ' > tr > td').each(function () {
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
    this.carregarPaginacao = function (dados) {

        if ($(this.formulario + ' > div.ferramentas').length > 0) {
            var resultado = this.formulario + ' > div.ferramentas > div.resultado';
            var paginacao = this.formulario + ' > div.ferramentas > div.paginacao';
        } else {
            var resultado = this.formulario + ' div.ferramentas div.resultado';
            var paginacao = this.formulario + ' div.ferramentas div.paginacao';
        }
        if ($(resultado).length == 0 && $(paginacao).length == 0) {
            $(this.tabela).find("tfoot").remove();
            $(dados).find("tfoot").appendTo($(this.tabela));
            return;
        }
        if ($(this.formulario + ' tfoot.substituir').length > 0) {
            this.carregarPaginacaoSubstituir(dados);
            return;
        }
        $(resultado).empty();
        $(paginacao).empty();

        $(dados).find("tfoot").each(function () {
            $(paginacao).html($('tr > td#pagina', this).children());
            $(resultado).html($('tr > td#resultado', this).html());
        });

        // Altera o link de paginação para clicks
        $(paginacao + ' > a').each(function () {
            var pagina = 0;
            var caminho = $(this).attr('href');
            var padrao = new RegExp("pagina\=(\\d+)");

            if (padrao.test(caminho))
                pagina = padrao.exec(caminho)[1];

            $(this).attr('href', 'javascript:void(0)');

            if ($(this).attr('class') != "selecionado" && pagina > 0) {
                $(this).click(function () {
                    tbl.trocarPagina(pagina);
                });
            }
        });


    }

    this.aplicarIrPara = function () {

        var paginacao = this.formulario + ' div.ferramentas div.paginacao';

        if ($(paginacao).find('a.descricao').length <= 0) {

            return;
        }

        var campoPagina = $('<input type="text" value="Ir para a página" name="idPaginaIr" title="Ir para a página" class="txt" />')
        campoPagina.focusin(function () {
            if (this.value == $(this).attr('title')) {
                $(this).val('');
            }
        });
        campoPagina.focusout(function () {
            if ($.trim($(this).val()) == '') {
                $(this).val($(this).attr('title'));
            }
        });
        $(paginacao).append(campoPagina);
        var ir = $('<a>Ir</a>')

        ir.click(function () {
            var idPag = $(this).parent().find('input[name="idPaginaIr"]').val();
            if (isNaN(idPag)) {
                $(this).parent().find('input[name="idPaginaIr"]').focus();
                return;
            }
            if (parseInt(idPag, 10) <= 0) {
                idPag = 1;
            }
            tbl.trocarPagina(idPag);
        }).attr('href', 'javascript:void(0);');

        $(paginacao).append(ir);
    }
    this.atualizaChecked = function () {
        // Alterado, ocorria um problema quando havia mais de uma tabela na página.
        // var resultado = 'div.ferramentas div.resultado'; 
        var $resultado = $(tbl.tabela).closest("form");

        if (this.atualizarSelecionados) {
            var selecionados = this.countSelecionados();

            if (selecionados > 0) {
                if ($resultado.find('span.selecionados').length <= 0) {
                    $resultado.find("div.ferramentas div.resultado").append($('<span class="selecionados"></span>'));
                }
                $resultado.find('span.selecionados').html("<span> | </span> " + selecionados + " selecionado(s).");
            } else {
                $resultado.find('span.selecionados').remove();
            }
        }
    }
    this.countSelecionados = function () {
        var totalHidem = $(tbl.tabela).find("tbody").find('input[type="hidden"][name="'+ tbl.checkBoxName +'.Checked"][value="true"]').length;
        totalHidem  += $(tbl.tabela).find("tbody").find('input[type="checkbox"][name="'+ tbl.checkBoxName +'.Checked"]:checked').length;
        return totalHidem;
    }
    this.getSelecionados = function (estringue) {

        if (estringue === undefined)
            estringue = "Value";

        var selecionadas = [];

        //os que estão checados desta página...
        $(tbl.tabela).find("tbody").find('input[type="checkbox"][name="' + tbl.checkBoxName + '.Checked"]:checked').each(function () {
            selecionadas.push($(this).closest("td").find('input[type="hidden"][name="' + tbl.checkBoxName + '.' + estringue + '"]').val());
        });

        //os que estão checados... de outras páginas
        var quantidade = $(tbl.tabela).find("tbody").find('input[type="hidden"][name="' + tbl.checkBoxName + '.Checked"][value="true"]').length;
        var totalPagina = $(tbl.tabela).find("tbody").find('input[type="hidden"][name="' + tbl.checkBoxName + '.' + estringue + '"]').length;

        $(tbl.tabela).find("tbody").find('input[type="hidden"][name="' + tbl.checkBoxName + '.' + estringue + '"]').each(function (i, v) {

            if ((i + 1) > (totalPagina - quantidade))
                selecionadas.push($(this).val());
        });

        return selecionadas;
    }
    this.carregarPaginacaoSubstituir = function (dados) {
        var paginacaoOriginal = this.formulario + ' div.ferramentas div.paginacao';
        var paginacaoRodape = this.formulario + ' tfoot.substituir div.paginacao';

        $(paginacaoOriginal).empty();

        $(dados).find("tfoot").each(function () {
            var tmpHtml = $(dados).find('tr > td > div.paginacao').html();
            $(paginacaoOriginal).html(tmpHtml);
        });

        $(this.formulario + ' tfoot.substituir > tr').remove();
        $(dados).find("tfoot > tr").appendTo($(this.formulario + ' tfoot.substituir'));

        // Altera o link de paginação para clicks
        $(paginacaoOriginal + ' > a' + ',' + paginacaoRodape + ' > a ').each(function () {
            var pagina = 0;
            var caminho = $(this).attr('href');
            var padrao = new RegExp("pagina\=(\\d+)");

            if (padrao.test(caminho))
                pagina = padrao.exec(caminho)[1];

            $(this).attr('href', 'javascript:void(0)');

            if ($(this).attr('class') != "selecionado" && pagina > 0) {
                $(this).click(function () {
                    tbl.trocarPagina(pagina);
                });
            }
        });

    }
    this.limparPaginacao = function () {
        if ($(this.formulario + ' > div.ferramentas').length > 0) {
            var resultado = this.formulario + ' > div.ferramentas > div.resultado';
            var paginacao = this.formulario + ' > div.ferramentas > div.paginacao';
        } else {
            var resultado = this.formulario + ' div.ferramentas div.resultado';
            var paginacao = this.formulario + ' div.ferramentas div.paginacao';
        }

        $(resultado).empty();
        $(paginacao).empty();
    }
    /**
    * Trocar de página da tabela
    * @param int pagina Número da página
    */
    this.trocarPagina = function (pagina) {
        $("#txtAcao_" + this.id).val("paginar");
        $("#txtPagina_" + this.id).val(pagina);
        $(this.formulario).submit();
    }

    /**
    * Trocar de página da tabela
    * @param int pagina Número da página
    */
    this.alterarPagina = function (pagina) {
        $("#txtAcao_" + this.id).val("paginar");
        $("#txtPagina_" + this.id).val(pagina);
    }

    /* ACAO EXTERNA */

    /**
    * Carrega uma ação externa (exemplo: botões dentro da linha) dentro da tabela
    */
    this.carregarAcao = function (linha) {

        var botoes = $('div.botoes > a', linha);

        botoes.each(function (index) {
            var botao = $(this);
            var link = $(this).attr('href');

            if (botao.is('.normal')) { // se for para manter o click

            } else if (botao.is('.funcao')) { // se for uma função javascript ele refaz como onclick
                botao.click(function () {
                    setTimeout(link, 1);
                });
                botao.attr('href', 'javascript:void(0)');
            } else {
                botao.click(function () {
                    if (tbl.onExecutarAcao) {
                        tbl.onExecutarAcao($(this).html())
                    }
                    tbl.executarAcao($(this).html(), link, tbl.retornarAcao);
                });
                botao.attr('href', 'javascript:void(0)');
            }
        });
    }

    /**
    * Executa uma ação externa (exemplo: botões dentro da linha) dentro da tabela
    */
    this.executarAcao = function (acao, link, retorno) {

        $("#txtAcao_" + this.id).val(acao);

        if (tbl.formExtra) {
            var dados = $(this.formulario).serialize() + '&' + $(this.formExtra).serialize()
        } else {
            var dados = $(this.formulario).serialize() + '&' + $('#idBanco').parents('form').serialize();
        }

        $.ajax({
            url: link,
            data: dados,
            type: "POST",
            success: function (data) { tbl.retornarAcao(acao, data); }
        });
    }

    this.executarAcaoExterna = function (acao, link, dadosExtras) {

        $("#txtAcao_" + this.id).val(acao);

        if (tbl.formExtra) {
            var dados = $(this.formulario).serialize() + '&' + $(this.formExtra).serialize()
        } else {
            var dados = $(this.formulario).serialize() + '&' + $('#idBanco').parents('form').serialize();
        }

        $.ajax({
            url: link,
            data: dados + '&' + dadosExtras,
            type: "POST",
            success: function (data) { tbl.retornarAcao(acao, data); }
        });
    }

    /**
    * Executa um retorno de função para tratar retornos padrões de mensagem
    */
    this.retornarAcao = function (acao, dados) {
        if (this.retornar != undefined)
            this.retornar(acao, dados)
    }



    /* FILTRO */

    /**
    * Carrega o filtro da página
    * @param string dados HTML com a paginação da tabela
    */
    this.carregarFiltro = function (dados) {
        if (this.bolNovoFiltro)
            return;

        var filtro = this.formulario + ' > div.ferramentas > div.filtros';
        //alert($(this.formulario + ' > div.ferramentas > div.funcao > div.slc#filtro').html());

        // Configura o combo do Filtro
        $(this.formulario + ' > div.ferramentas > div.funcao > div.slc#filtro').combo({
            close: "fechar",
            onOpen: function () {
                if (tbl.openFiltro) { tbl.openFiltro(); }
            },
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

    this.iniNovoFiltro = function (dados) {
        var filtro = this.formulario + ' div.novofiltro';
        if ($(filtro).length > 0) {
            this.bolNovoFiltro = true;
        }
        $(this.formulario + " div.novofiltro").keypress(function (e) {
            if (e.which == 13) {
                tbl.executarNovoFiltro();
                e.preventDefault();
            }
        });

        $(filtro + ' a.filtroBuscar').click(function () {
            tbl.executarNovoFiltro();
        });

        //limpa o campo da palavra chave
        $(filtro + ' input.txtPalavraChave').focusin(function () {
            if ($(this).val() == $(this).attr('title')) {
                $(this).val('');
            }
        });
        $(filtro + ' input.txtPalavraChave').focusout(function () {
            if ($.trim($(this).val()) == '') {
                $(this).val($(this).attr('title'));
            }
        });

        $(this.formulario + " div.novofiltroOpcoes").hide();
        //mais opções
        $(this.formulario + " a.btnNovofiltroOpcoes").click(function () {
            tbl.abrirFecharMaisOpcoesNovoFiltro()
        });

    }

    this.abrirFecharMaisOpcoesNovoFiltro = function () {
        $(this.formulario + " .novofiltroOpcoes").toggle('fast');

        if ($(this.formulario + " .novofiltroOpcoes").is(":visible")) {
            $(this.formulario + " a.btnNovofiltroOpcoes").removeClass('fechado').addClass('aberto');
        } else {
            $(this.formulario + " a.btnNovofiltroOpcoes").removeClass('aberto').addClass('fechado');
        }
    }

    this.carregarNovoFiltro = function (dados) {

        var filtro = this.formulario + ' div.novofiltroTags';

        $(dados).find("thead").each(function (index) {
            $(filtro).empty();
            $(filtro).html($("tr > td", this).html());
        });

        // Adiciona a funcionalidade de remover filtro no botão fechar do filtro
        $('span.botaoFiltro').each(function (index) {
            var obj = this;
            $('a.botaoFechar', this).attr('href', 'javascript:void(0)')
            .click(function () {
                tbl.removerFiltroNovo($(obj));
            });
        });
    }
    /**
    * Executa um filtro da tabela
    */
    this.executarFiltro = function () {
        $("#txtAcao_" + this.id).val("filtrar");
        $(this.formulario).submit();
    }
    this.executarNovoFiltro = function () {
        var filtro = this.formulario + ' div.novofiltro';
        tbl.executarFiltro();
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

        $('#' + id).remove();
        hidden.val('[' + filtros + ']');

        tbl.recarregarTabela();
    }

    this.removerFiltroNovo = function (obj) {
        var campo = obj.find('input[name="filtroCampo"]').val();
        var valor = obj.find('input[name="filtroValor"]').val();
        //caso contenha mais de um campo num mesmo filtro (exemplo da data de inicio e fim)
        var campos = campo.split(',');
        for (var i = 0; i < campos.length; i++) {
            //limpa os campos, de acordo com o tipo q ele é
            $(tbl.formulario + "," + tbl.formExtra).find('input[name="' + campos[i] + '"][type="text"]').val('');


            $(tbl.formulario + "," + tbl.formExtra).find('input[name="' + campos[i] + '"][value="' + valor + '"][type="checkbox"]:checked').click();
            if ($(tbl.formulario + "," + tbl.formExtra).find('input[name="' + campos[i] + '"][value="' + valor + '"][type="checkbox"]:checked').length >= 1) {
                $(tbl.formulario + "," + tbl.formExtra).find('input[name="' + campos[i] + '"][value="' + valor + '"][type="checkbox"]:checked').removeAttr("checked");
            }

            $(tbl.formulario + "," + tbl.formExtra).find('select[name="' + campos[i] + '"] > option:first-child').attr('selected', 'selected');
            $(tbl.formulario + "," + tbl.formExtra).find('select').change();
        }
        tbl.executarNovoFiltro();

    }

    this.limparFiltro = function (id) {
        var caminho = this.formulario + ' > div.ferramentas > div.funcao > div.slc#filtro';
        $(caminho + ' select').each(function () { $(this).get(0).selectedIndex = 0; });
        $(caminho + ' input:text').each(function () { $(this).val(''); });
        $(caminho + ' input:checkbox').each(function () { $(this).removeAttr("checked"); });
        $(caminho + ' input:radio').each(function () { $(this).attr('checked', ''); });
    }


    this.limparFiltroNovo = function () {
        //aplicar a ação para remover os campos extras
        $(tbl.formulario + ' .areaBotoesFiltros input[name="filtroCampo"]').each(function () {
            var botao = $(this).parents(".botaoFiltro");
            var campo = botao.find('input[name="filtroCampo"]').val();
            var valor = botao.find('input[name="filtroValor"]').val();
            //caso contenha mais de um campo num mesmo filtro (exemplo da data de inicio e fim)
            var campos = campo.split(',');
            for (var i = 0; i < campos.length; i++) {
                //limpa os campos, de acordo com o tipo q ele é
                $(tbl.formulario + "," + tbl.formExtra).find('input[name="' + campos[i] + '"][type="text"]').val('');

                $(tbl.formulario + "," + tbl.formExtra).find('input[name="' + campos[i] + '"][value="' + valor + '"][type="checkbox"]:checked').click();

                $(tbl.formulario + "," + tbl.formExtra).find('select[name="' + campos[i] + '"] > option:first-child').attr('selected', 'selected');
                $(tbl.formulario + "," + tbl.formExtra).find('select').change();
            }

        });

        $(tbl.formulario + ' input:checkbox[name=chkFinalidade]').each(function () { $(this).attr("checked", "checked"); });
        $(tbl.formulario + ' input:checkbox[name=chkOrigemBusca]:eq(0)').attr("checked", "checked");
    }




    this.setOpenFiltro = function (sFuncao) {
        this.openFiltro = sFuncao;
    }
    /* ACAO EM MASSA */

    /**
    * Carrega o item de ações em massa para executar funções pelos itens selecionados
    */
    this.carregarAcaoMassa = function () {
        $(this.formulario + ' > div.ferramentas > div.funcao > div.slc#acao,'+
         this.formulario + ' > div.ferramentas > div.funcao > div.slc.acaotabela').combo({
            close: "fechar",
            onOpen: function () { },
            onClose: function () { }
        });

        $('#acao > div > a, ' + this.formulario + ' .acaotabela > div > a').each(function (index) {
            var acao = "";
            var caminho = $(this).attr('href');
            var padrao = new RegExp("acao\=([^&]+)");

            if (padrao.test(caminho))
                acao = padrao.exec(caminho)[1];

            $(this).attr('href', 'javascript:void(0)');
            if (acao != "") {
                $(this).click(function () {
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
    this.executarAcaoMassa = function (acao, confirm) {

        $("#txtAcao_" + this.id).val(acao);

        if (tbl.formExtra) {
            var dados = $(tbl.formulario).serialize() + (confirm ? '&bolConfirmTipo=1' : '') + '&' + $(this.formExtra).serialize()
        } else {
            var dados = $(this.formulario).serialize() + (confirm ? '&bolConfirmTipo=1' : '') + '&' + $('#idBanco').parents('form').serialize();
        }

        $.ajax({
            url: tbl.caminho,
            data: dados, //$(tbl.formulario).serialize() + (confirm ? '&bolConfirmTipo=1' : '')/* + '&' + $('#idBanco').parents('form').serialize()*/,
            type: "POST",
            success: function (dados) { tbl.retornarAcaoMassa(acao, dados); }
        });
    }

    /**
    * Retorna a ação em massa para a função que trata retornos de dados
    */
    this.retornarAcaoMassa = function (acao, dados) {
        if (this.retornar != undefined)
            this.retornar(acao, dados)

        //$(this.formulario + ' > div.ferramentas > div.funcao > div.slc > div').hide();
        //this.recarregarTabela();
        this.carregarAcaoMassa();
    }


    /* OUTRAS FUNCIONALIDADES */

    /**
    * Recarrega a tabela
    */
    this.recarregarTabela = function () {
        $("#txtAcao_" + this.id).val("recarregar");
        $(this.formulario).submit();
    }

    /**
    * Limpar a tabela
    */
    this.limpar = function () {
        $(this.tabela + ' > thead > tr > td > input[type=checkbox]').removeAttr("checked");
        $(this.tabela + ' > tbody').html($("<tr><td></td></tr>"));
    }

    /**
    * Exibir carregando na tabela
    */
    this.carregar = function (exibir) {
        this.limpar();
        if (exibir) {
            var linha = document.createElement("tr");
            var coluna = document.createElement("td");

            coluna.setAttribute('class', 'carregando');
            coluna.setAttribute('colspan', this.contarColunas($(this.tabela + ' > thead tr')));

            linha.appendChild(coluna);

            $(this.tabela + ' > tbody').html($(linha));
        }
    }

    /**
    * Conta a quantidade de colunas de uma linha dinamicamente (considerando os colspan)
    * @param linha JQuery da linha para contar as colunas
    */
    this.contarColunas = function (linha) {
        var colunas = 0;
        $(linha).children().each(function (index) {
            var valorColSpan = $(this).attr('colspan');
            if (valorColSpan) {
                var valor = parseInt($(this).attr('colspan'),10);
            } else {
                var valor = 1;
            }

            colunas += valor;
        });

        return colunas;
    }

    /*
    * Bloqueia a linha da tabela
    * @param obj objeto tr da linha q deverá ser bloqueada
    */
    this.lockHoverLinha = function (trAtivo) {
        this.unlockHoverLinha();
        trAtivo.addClass('lockLinha');
    }

    /*
    * Desbloqueia todas as linhas ativas
    */
    this.unlockHoverLinha = function () {
        $('tr.lockLinha div.botoes').css('display', 'none');
        $('tr.lockLinha').removeClass('lockLinha');
    }

    this.trocarAcao = function (acao) {
        $("#txtAcao_" + this.id).val(acao);
    }
    /**
    * 
    */
    this.retornoErros = function (dados) {
        if ($(dados).hasClass('erro')) {
            return true;
        }
        return false;
    }

    $(document).ready(function () { tbl.init(); });
}
