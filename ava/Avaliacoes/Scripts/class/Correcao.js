var retornoCarregarItens = undefined;

function Correcao(sFormulario, sLista, bIniciar, fRetornoPadrao) {
    var crc = this;

    this.CORRIGIR   = 0;
    this.CORRIGIDA  = 2;
    this.TODAS      = -1;

    this.version    = "0.1.0";
    this.id         = sFormulario;
    this.formulario = 'form#' + sFormulario;
    this.lista      = 'div#' + sLista;
    this.retornar   = fRetornoPadrao;
    this.inicia     = (bIniciar == undefined) ? false : bIniciar;
    this.estado     = this.CORRIGIR;
    this.menu       = "#menuSubConteudoInterno";
    
    /**
     * Inicializa a tabela carregando o formulário e mantendo em ajax
     */
    this.init = function () {
        this.caminho = $(this.formulario).attr("action");
        this.criarElementos();
        this.carregarMenu();
        $(this.formulario + ' > div.ferramentas > div.funcao > div.slc > div').hide();
        $(this.formulario).submit(function (e) {
            crc.carregar(true);
            $.ajax({
                url: crc.caminho,
                data: $(this).serialize() + '&' + $('#idBanco').parents('form').serialize(),
                type: "POST",
                success: function (dados, status, xhttp) { crc.carregarLista(dados); }
            });
            crc.limpar();
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
        var pagina = document.createElement("input");
        var acao = document.createElement("input");
        var estado = document.createElement("input");
        var viewstate = document.createElement("input");
        
        // Página
        pagina.type = "hidden";
        pagina.id = pagina.name = "txtPagina_" + this.id;
        pagina.value = "1";

        // Última Ação
        acao.type = "hidden";
        acao.id = acao.name = "txtAcao_" + this.id;
        acao.value = "1";
        
        // Estado
        estado.type = "hidden";
        estado.id = estado.name = "txtEstado_" + this.id;
        estado.value = this.estado;

        // Viewstate
        viewstate.type = "hidden";
        viewstate.id = viewstate.name = "viewState_" + this.id;

        var form = $(this.formulario);
        form.prepend($(pagina));
        form.prepend($(acao));
        form.prepend($(estado));
        form.append($(viewstate));
    };

    /* MENU */
    
    this.carregarMenu = function () {
        $(this.menu + ' > li').each(function () {
            var opcao = $(this);
            opcao.click(function () {
                crc.selecionarMenu(opcao);
                crc.alterarEstado();
            });
        });
        this.selecionarMenu($(this.menu + ' li:first'));
    };

    this.selecionarMenu = function (opcao) {
        this.limparMenu();
        opcao.addClass('selecionado');

        var item = opcao.attr('id');

        if (item == "listaQuestaoCorrigir")
            this.estado = this.CORRIGIR;
        else if (item == "listaQuestaoCorrigida")
            this.estado = this.CORRIGIDA;
        else if (item == "listaQuestaoTodas")
            this.estado = this.TODAS;
    };

    this.limparMenu = function () {
        $(this.menu + ' > li').removeClass('selecionado');
    };

    this.alterarEstado = function () {
        $("input#txtEstado_" + this.id).val(this.estado);
        this.trocarPagina(1);
    };

    /* CARREGAR */

    /**
     * Carregar as tabelas com os dados retornados pelo servidor
     * @param string dados Dados carregados pelo servidor com as informações da tabela
     */
    this.carregarLista = function (dados) {
        this.verficiarPagina(dados);
        this.carregarPaginacao(dados);
        this.carregarFiltro(dados);
        this.atualizarContador(dados);
        this.carregarItens(dados);
        if (retornoCarregarItens != undefined) {
            retornoCarregarItens();
    }
        this.carregar(false);
    };

    /**
     * Verifica e altera a página para a que retornou da tabela
     * @param string dados Dados carregados pelo servidor com as informações da tabela
     */
    this.verficiarPagina = function(dados) {
        $(dados).each(function() {
            crc.alterarPagina($(this).attr('atual'));
        });
    };

    /**
     * Atualiza a descrição das quantidades na tela
     * @param string dados Dados carregados pelo servidor com as informações da tabela
     */
    this.atualizarContador = function (dados) {
        var item = $(dados);
        $("span#qtdeNaoCorrigida").html(item.attr('naocorrigidas'));
        $("span#qtdeCorrigida").html(item.attr('corrigidas'));
        $("span#qtdeTotal").html(item.attr('todas'));
    };

    /**
     * Carrega as linhas da tabela, com a paginação 
     * @param string dados HTML com as linhas da tabela
     */
    this.carregarItens = function (dados) {
        var corpo = this.lista;
        $(this.lista).empty();
        $(dados).find("tbody > tr > td > div").each(function () {
            $(corpo).append($(this));
        });
        // Carrega as funções de cada caixa de aluno
        $(corpo + ' > div').each(function () {
            crc.carregarAcao($(this));
        });
    };

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
                    crc.trocarPagina(pagina);
                });
            }
        });
    };

    /**
     * Trocar de página da tabela
     * @param int pagina Número da página
     */
    this.trocarPagina = function(pagina) {
        $("#txtAcao_" + this.id).val("paginar");
        $("#txtPagina_" + this.id).val(pagina);
        $(this.formulario).submit();
    };

    /**
     * Trocar de página da tabela
     * @param int pagina Número da página
     */
    this.alterarPagina = function(pagina) {
        $("#txtAcao_" + this.id).val("paginar");
        $("#txtPagina_" + this.id).val(pagina);
    };

    /* ACAO EXTERNA */
    
    /**
     * Carrega uma ação externa (exemplo: botões dentro da linha) dentro da tabela
     */
    this.carregarAcao = function (item) {
        this.exibirAlterar(item);
        this.prepararResposta(item);
    };

    this.exibirAlterar = function (item) {
        // Verifica se a resposta foi corrigida
        /*if (item.hasClass('corrigida')) {
            $(' textarea[name=txtCorrecaoDocente]', item).attr('disabled', true).addClass('disabled');
            $(' > div.areaNotaAluno > .btnAlterar', item).show();
            $(' > div.areaNotaAluno > .notaAluno', item).show();
            $(' > div.areaNotaAluno > .btnConfirmar', item).hide();
        } else {
            $(' textarea[name=txtCorrecaoDocente]', item).attr('disabled', false).removeClass('disabled');
            $(' > div.areaNotaAluno > .btnAlterar', item).hide();
            $(' > div.areaNotaAluno > .notaAluno', item).hide();
            $(' > div.areaNotaAluno > .btnConfirmar', item).show();
        }*/
    };

    /**
     * Executa uma ação externa (exemplo: botões dentro da linha) dentro da tabela
     */
    this.executarAcao = function (acao, link, retorno) {
        $("#txtAcao_" + this.id).val(acao);
        $.ajax({
            url: link,
            data: $(this.formulario).serialize() + '&' + $('#idBanco').parents('form').serialize(),
            type: "POST",
            success: function(data) { crc.retornarAcao(acao, data); }
        });
    };

    /**
     * Executa um retorno de função para tratar retornos padrões de mensagem
     */
    this.retornarAcao = function(acao, dados) {
        if (this.retornar != undefined) {
            this.retornar(acao, dados)
        }
    };

    /* FILTRO */
    
    this.carregarFiltro = function (dados) {
        var filtro = this.formulario + ' > div.ferramentas > div.filtros';
        // Configura o combo do Filtro
        $(this.formulario + ' > div.ferramentas > div.funcao > div.slc#filtro').combo({
            close: "fechar",
            onOpen: function () { },
            onExecute: function () { crc.executarFiltro(); },
            onClose: function () { crc.limparFiltro(); }
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
                crc.removerFiltro(id);
            });
        });
    };

    this.executarFiltro = function() {
        $("#txtAcao_" + this.id).val("filtrar");
        $(this.formulario).submit();
    };

    this.removerFiltro = function(id) {
        var hidden = $('#txtFiltros');
        var campo = id.split('_')[1];
        var array = eval(hidden.val());
        var filtros = new Array();
        for (i = 0; i < array.length; i++) {
            if (array[i].campo != campo) {
                filtros.push(new Filtro(array[i]));
            }
        }
        $('#' + id).remove();
        hidden.val('[' + filtros + ']');
        crc.recarregarLista();
    };

    this.limparFiltro = function(id) {
        var caminho = this.formulario + ' > div.ferramentas > div.funcao > div.slc#filtro';
        $(caminho + ' select').each(function() { $(this).get(0).selectedIndex = 0; });
        $(caminho + ' input:text').each(function() { $(this).val(''); });
        $(caminho + ' input:checkbox').each(function() { $(this).attr('checked', ''); });
        $(caminho + ' input:radio').each(function() { $(this).attr('checked', ''); });
    };

    /* FUNCOES DE SALVAR */
    
    this.prepararResposta = function (div) {
        var idTipoResposta = div.attr("idtiporesposta");
        if (idTipoResposta === "3") {
            this.prepararRespostaDiscursiva(div);
        } else if (idTipoResposta === "13") {
            this.prepararRespostaRedacao(div);
        }
    };

    this.prepararRespostaDiscursiva = function (div) {
        var id = div.attr('id');
        var botaoConfirmar = $('div > a.btnConfirmar', div);
        var botaoAlterar = $('div > a.btnAlterar', div);

        var linkConfirmar = botaoConfirmar.attr('href');
        var linkAlterar = botaoAlterar.attr('href');

        botaoConfirmar.click(function () { crc.confirmarRespostaDiscursiva(id, linkConfirmar); }).attr('href', 'javascript:void(0)');
        botaoAlterar.click(function () { crc.alterarResposta(id, linkAlterar); }).attr('href', 'javascript:void(0)');

        var vDataMode = new DataMode("");

        vDataMode.decimal($(div).find('input[name=porcentagemResposta]'), 2, "oldValue", "iniValue");
        $(div).find('input[name=porcentagemResposta]').keydown(function (event) {
            if (event.which == 13) {
                $(this).blur();
            }
        }).blur(function () {
            var tmValor = parseFloat(this.value.replace(",", "."));

            tmValor = tmValor.toFixed(2);
            this.value = new String(tmValor).replace(".", ",");

            if (tmValor < 0) {
                this.value = 0;
            } else if (tmValor > 100) {
                this.value = 100;
            }

            //ajusta o valor do outro campo
            var tmpValorPontos = parseFloat($(div).find('input[name=valorResposta]').val().replace(",", "."));
            tmpValorPontos = tmpValorPontos.toFixed(2);

            var valor = this.value.replace(",", ".")
            var tmpValorFinal = tmpValorPontos * (valor / 100);

            tmpValorFinal = tmpValorFinal.toFixed(2);
            $(div).find('input[name=pontosResposta]').val(new String(tmpValorFinal).replace(".", ","));
            //ajusta o slide
            $(div).find(".sliderResposta").slider("value", this.value.replace(",", "."));
        });

        vDataMode.decimal($(div).find('input[name=pontosResposta]'), 2, "oldValue", "iniValue");
        $(div).find('input[name=pontosResposta]').keydown(function (event) {
            if (event.which == 13) {
                $(this).blur();
            }
        }).keyup(function () {
            var value = parseFloat(this.value.replace(",", "."));
            var max   = parseFloat($(this).attr("maxvalue").replace(",", "."));
            if (value < 0) {
                this.value = 0;
            } else if (value > max) {
                this.value = $(this).attr("maxvalue");
            }
        }).blur(function () {
            // verifica se a primeira posição é 0 para dai implementar a virgula
            if (this.value.indexOf("0") == 0 && this.value.indexOf(",") == -1) {
                this.value = this.value.substring(0, 1) + "," + this.value.substring(1);
            }
            var valorPontos = parseFloat(this.value.replace(",", "."));
            if (valorPontos < 0) {
                valorPontos = 0;
                this.value = 0;
            }
            var valorQuestao = parseFloat($(div).find('input[name=valorResposta]').val().replace(",", "."));
            var percentual = valorPontos / valorQuestao * 100;
            if (isNaN(percentual) || percentual == Infinity || percentual == -Infinity) {
                percentual = 0;
            }
            percentual = percentual.toFixed(2);
            $(div).find('input[name=porcentagemResposta]').val(new String(percentual).replace(".", ","));
            $(div).find(".sliderResposta").slider("value", percentual);
        }).attr("maxvalue", $(div).find('input[name=valorResposta]').val());

        $(div).find(".sliderResposta").slider({
            value: $(div).find('input[name=porcentagemResposta]').val(),
            min: 0,
            max: 100,
            step: 1,
            slide: function (event, ui) {
                //$("#amount").val("$" + ui.value);
                //ajusta os valores para os outros campos
                var tmpValorPontos = parseFloat($(div).find('input[name=valorResposta]').val().replace(",", "."));
                var tmpValorFinal = tmpValorPontos * (ui.value / 100);

                tmpValorFinal = tmpValorFinal.toFixed(2);

                $(div).find('input[name=pontosResposta]').val(new String(tmpValorFinal).replace(".", ","));

                $(div).find('input[name=porcentagemResposta]').val(ui.value);
            }
        });

        try {
            var textarea = $(div).find("textarea[name=txtCorrecaoDocente]");
            var optionsT = {
                'maxCharacterSize': parseInt(textarea.attr('maxchar')),
                'originalStyle': 'originalTextareaInfo',
                'warningStyle': 'warningTextareaInfo',
                'warningNumber': 40,
                'displayFormat': '#left caracteres restantes'
            };
            textarea.textareaCount(optionsT);
        } catch (e) {
        }
    };

    this.prepararRespostaRedacao = function (div) {
        new BoxRedacao(div);
    };

    function BoxRedacao($container) {
        var valorQuestao;
        var totalPeso;
        var isPerformanceBoxEnabled;
        var percentualDesempenho;

        init();

        function init() {
            $container.find("#boxCriteriosEliminacao .btnOcultarExibir").click(function () {
                $container.find("#boxCriteriosEliminacao table").toggle("fade", 1000);
                if ($(this).text().indexOf("ocultar") >= 0) {
                    $(this).text("exibir critérios de desclassificação");
                } else {
                    $(this).text("ocultar critérios de desclassificação");
                }
            });
            $container.find("#boxCriteriosCorrecao .btnConfirmar").click(function () {
                var idProvaRealizada = $container.find("#hidIdProvaRealizada").val() || $(crc.formulario).find("#txtIdProvaRealizada").val();
                var idQuestao = $container.find("#hidIdQuestao").val() || $(crc.formulario).find("#txtIdQuestao").val();
                var $form = $("<form>");
                $form.append($("<input>").attr({type: "hidden", name: "idProvaRealizada", value: idProvaRealizada}));
                $form.append($("<input>").attr({type: "hidden", name: "idQuestao", value: idQuestao}));
                $form.append($("<input>").attr({type: "hidden", name: "percDesemp", value: percentualDesempenho}));
                $form.append($container.find("textarea"));
                $form.append($container.find("#boxCriteriosEliminacao input[type=checkbox]"));
                $form.append($container.find("#boxCriteriosCorrecao input[type=hidden]"));
                $form.append($container.find("#boxCriteriosCorrecao input[type=text]"));
                carregando.mostrar();
                $.ajax({
                    type: "POST",
                    url: caminhoBase + "/Correcao/SalvarCorrecaoRedacao",
                    data: $form.serialize(),
                    success: function (dados, status, xhttp) {
                        carregando.esconder();
                        if ($(dados).attr("class") && $(dados).attr("class").indexOf("erro") >= 0) {
                            crc.retornarAcao("erro", dados);
                        } else {
                            crc.retornarAcao('confirmar', dados);
                        }
                    }
                });
            });
            $container.find("input[type=checkbox]").click(function () {
                if ($(this).prop("checked")) {
                    disablePerformanceBox();
                    updateTotaisDesempenho();
                } else {
                    enablePerformanceBox();
                }
            });
            
            var vDataMode = new DataMode("");
            vDataMode.decimal($container.find("input[name=txtDesempenho]"), 2, "oldValue", "iniValue");

            $container.find("input[name=txtDesempenho]").keydown(function (event) {
                if (event.which == 13) {
                    $(this).blur();
                }
            }).keyup(function () {
                var curValue = parseFloat(this.value.replace(",", "."));
                var maxValue = parseFloat($(this).attr('maxvalue').replace(",", "."));
                if (curValue > maxValue) {
                    this.value = maxValue;
                    $(this).blur();
                }
            }).blur(function () {
                updateTotaisDesempenho();
            });

            valorQuestao = parseFloat($container.find('input[name=valorResposta]').val().replace(",", "."));
            totalPeso = parseInt($container.find(".lbl-peso").text());

            isPerformanceBoxEnabled = true;

            if ($container.find("input:checked").length > 0) {
                disablePerformanceBox();
            }

            updateTotaisDesempenho();
        }

        function disablePerformanceBox() {
            if (isPerformanceBoxEnabled) {
                $container.find("input[name=idCriterioCorrecao]").prop("disabled", true);
                $container.find("input[name=txtDesempenho]").prop("disabled", true).val("0,00");
                isPerformanceBoxEnabled = false;
            }
        }

        function enablePerformanceBox() {
            if ($container.find("input:checked").length == 0) {
                $container.find("input[name=idCriterioCorrecao]").prop("disabled", false);
                $container.find("input[name=txtDesempenho]").prop("disabled", false);
                isPerformanceBoxEnabled = true;
            }
        }

        function updateTotaisDesempenho() {
            var totalDesempenho = 0;
            $container.find("input[name=txtDesempenho]").each(function (index, element) {
                totalDesempenho += parseFloat(element.value.replace(",", "."));
            });
            percentualDesempenho = totalDesempenho / totalPeso;
            var valorNota = valorQuestao * percentualDesempenho;
            $container.find(".lbl-desempenho").text(totalDesempenho.toFixed(2).replace(".", ","));
            $container.find(".lbl-percentual").text(percentualDesempenho == 1 ? "(100%)" : "(" + parseFloat(percentualDesempenho * 100).toFixed(2).replace(".", ",") + "%)");
            $container.find(".lbl-nota").text(valorNota.toFixed(2).replace(".", ","));
        }
    }

    this.confirmarRespostaDiscursiva = function (id, link) {
        carregando.mostrar();
        var div = $('#' + id);
        var percentualNota = div.find('input[name=porcentagemResposta]').val();
        var textoCorrecao = $('textarea[name=txtCorrecaoDocente]', div).val();

        var tmpForm = $("<form>");
        $("<input>").attr({ "name": "txtPercentualNota", "type":"hidden" }).val(percentualNota).appendTo(tmpForm);
        $("<input>").attr({ "name": "txtCorrecao", "type": "hidden" }).val(textoCorrecao).appendTo(tmpForm);
        
        var idResposta = $('input[name=hidIdProvaRealizada]', div).val();
        if (idResposta) {
            $("<input>").attr({ "name": "txtIdProvaRealizada", "type": "hidden" }).val(idResposta).appendTo(tmpForm);
        }
        
        var idQuestao = div.find('input[name=hidIdQuestao]').val();
        if (idQuestao) {
            $("<input>").attr({ "name": "txtIdQuestao", "type": "hidden" }).val(idQuestao).appendTo(tmpForm);
        }
        
        $.ajax({
            url: link,
            data: $(crc.formulario).serialize() + '&' + $('#idBanco').parents('form').serialize() + '&' + tmpForm.serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { crc.retornoConfirmarResposta(id, dados); }
        });
    };

    this.retornoConfirmarResposta = function (id, dados) {
        carregando.esconder();
        if ($(dados).attr('class') && $(dados).attr('class').indexOf("erro") >= 0) {
            crc.retornarAcao('erro', dados);
            return;
        }
        crc.retornarAcao('confirmar', dados);
    };

    this.alterarResposta = function (id, link) {
        carregando.mostrar();
        var div = $('#' + id);

        var idResposta = $('input[name=hidIdProvaRealizada]', div).val();
        var percentualNota = $('select[name=slcPercentualNota]', div).val();
        var textoCorrecao = $('textarea[name=txtCorrecaoDocente]', div).val();


        var tmpForm = $("<form>");
            $("<input>").attr({ "name": "txtIdProvaRealizada", "type": "hidden" }).val(idResposta).appendTo(tmpForm);
            $("<input>").attr({ "name": "txtPercentualNota", "type": "hidden" }).val(percentualNota).appendTo(tmpForm);
            $("<input>").attr({ "name": "txtCorrecao", "type": "hidden" }).val(textoCorrecao).appendTo(tmpForm);

        $.ajax({
            url: link,
            data: $(crc.formulario).serialize() + '&' + $('#idBanco').parents('form').serialize() + '&' + tmpForm.serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { crc.retornoAlterarResposta(id, dados); }
        });
    };

    this.retornoAlterarResposta = function (id, dados) {
        carregando.esconder();
        if ($(dados).attr('class').indexOf("erro") == -1) {
            var div = $('div#' + id);
            div.removeClass('corrigida');
            this.exibirAlterar(div);
        }
    };

    /* OUTRAS FUNCIONALIDADES */

    /**
     * Recarrega a lista
     */
    this.recarregarLista = function() {
        $("#txtAcao_" + this.id).val("recarregar");
        $(this.formulario).submit();
    };

    /**
     * Limpar a tabela
     */
    this.limpar = function() {
        $(this.lista).empty();
    };

    /**
     * Exibir carregando na tabela
     */
    this.carregar = function (exibir) {
        //this.limpar();
        if (exibir)
            $(this.lista).addClass('carregando');
        else
            $(this.lista).removeClass('carregando');
    };

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
    };

    this.tratarErros = function(dados) {};
    
    $(document).ready(function() { crc.init(); });
}
