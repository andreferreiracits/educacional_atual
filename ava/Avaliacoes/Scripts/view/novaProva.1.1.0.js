var FUNCAO_VAZIA = 'javascript:void(0)';
var proximaTela = "";
var aba, mensagem, tblLista, tblAdicionar, tblListaResumo, tblListaCriterio, confirm, dataMode, ajuda;
var tblAgrupamentos;
var formVez;
var lnkPosicionamento;
var trocarTipo;

// HOTFIX: We can't upgrade to jQuery UI 1.8.6 (yet)
// This hotfix makes older versions of jQuery UI drag-and-drop work in IE9
//corrigir o problema que no ie não funcionava o sortable em uma tabela
(function ($) { var a = $.ui.mouse.prototype._mouseMove; $.ui.mouse.prototype._mouseMove = function (b) { if ($.browser.msie && document.documentMode >= 9) { b.button = 1 }; a.apply(this, [b]); } } (jQuery));

function inicializar() {
    aba = new Aba('menuNavegacaoProva', carregarTela);
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta", ".navegacaoBotoes");
    dataMode = new DataMode(mensagem);
    ajuda = new Ajuda();
    ajuda.criar("helpCadAvaliacao", "helpCadAvaliacaoCaixa", RecursosJS["msg018"]);

    $('#frmProva').submit(function (e) {
        if (formVez) {
            parametros = formVez.serialize();
        } else {
            parametros = "";
        }

        carregando.mostrar();
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize() + "&" + parametros,
            type: "POST",
            success: function(dados, status, xhttp) { retornoCriacaoProva(dados); }
        });
        e.preventDefault();
    });

    criarBotaoExpandirArea('#btnOcultarHistorico', '#contentHistorico');

    carregarTela('estrutura');
}

function acaoSubmitSalvar(form2) {
    formVez = form2;
}

function carregarTela(tela) {
    proximaTela = tela;
    $('#frmProva').submit();
}

function trocarTela(tela) {
    aba.selecionar(tela);

    mensagem.close();
    confirm.close();

    switch (tela) {
        case 'estrutura':

            $("#cxaEstrutura").show();
            hideBoxArea("#cxaQuestoes");
            hideBoxArea("#cxaConfirmacao");
            inicializarEstrutura();
            break;

        case 'questoes':
            hideBoxArea("#cxaEstrutura");
            $("#cxaQuestoes").show();
            hideBoxArea("#cxaConfirmacao");
            inicializarQuestoes();
            break;
        case 'confirmacao':
            hideBoxArea("#cxaEstrutura");
            hideBoxArea("#cxaQuestoes");
            $("#cxaConfirmacao").show();
            inicializarConfirmacao();
            break;
    }
    carregando.esconder();
}

function hideBoxArea(sBox) {
    $(sBox).html('');
    $(sBox).hide();
}

function retornoCriacaoProva(dados) {

    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
        confirm.exibir($(dados), this.confirmaSalvar, this.naoConfirmaSalvar);
        carregando.esconder();
    } else {
        $('#bolConfirmTipo').remove();
        switch (proximaTela) {
            case 'estrutura': carregarEstrutura(); break;
            case 'questoes': carregarQuestoes(); break;
            case 'confirmacao': carregarConfirmacao(); break;
            case 'trocarnovotipo': (function () {
                trocarTipo()
            })(); break;
        }
    }
}
function confirmaSalvar(){
    $('#frmProva').append('<input id="bolConfirmTipo" name="bolConfirmTipo" type="hidden" value="1" />');
    $('#frmProva').submit();
}
function naoConfirmaSalvar() {
    switch (proximaTela) {
        case 'estrutura': carregarEstrutura(); break;
        case 'questoes': carregarQuestoes(); break;
        case 'confirmacao': carregarConfirmacao(); break;
    }
}
/* ******************** Estrutura ******************** */
function carregarEstrutura() {
    $.ajax({
        url: caminhoBase + '/Criacao/EstruturaProva/',
        data: $('#frmProva').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoEstrutura(dados); }
    });
}
function retornoEstrutura(dados) {

    if (!retornoErro(dados)) {
        $("div#cxaEstrutura").html(dados);
    }

    trocarTela('estrutura');
}
function inicializarEstrutura() {
    acaoSubmitSalvar($("#frmProvaEstrutura"));
    ajuda.criar("helpCriAvaliacao", "helpCriAvaliacaoCaixa", RecursosJS["msg019"]);
    ajuda.criar("helpSelecaoAvaliacao", "helpSelecaoAvaliacaoCaixa", RecursosJS["msg020"]);
    $('#btnAvancar').click(function () { carregarTela('questoes'); });
    FormatarTyneInstrucao();
    //ação para q salve o banco e atualize a view se muda de finalidade
    $("[name='rdoFinalidade']").change(function () {
        carregarTela('estrutura');
    });
    $(".trocarNovoFluxo").change(function () {
        var value = $(this).val();
        var id = $("input[name=txtIdProvaEstrutura]").val();
        carregando.mostrar();
        trocarTipo = function (conf) {
            $.ajax({
                url: caminhoBase + '/Criacao/ParaNovaProva/' + id + '/' + value + '/' + conf,
                type: "GET",
                success: function (dados, status, xhttp) {
                    if (retornoErro(dados)) {
                        carregando.esconder();
                        return;
                    }
                    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                        confirm.exibir($(dados), function () {
                            trocarTipo(1);
                        }, function () {
                            location.href = location.href;
                        });
                        carregando.esconder();
                    } else {
                        carregando.mostrar();
                        location.href = $(dados).text();
                    }
                }
            });
        };
        $('#frmProva').submit();
        proximaTela = 'trocarnovotipo';
        //trocarTipo(0);
    });
    criarBotaoExpandirArea('#btnExpandirTextoImpressa', '#areaTextoImpressa');
}

function FormatarTyneInstrucao() {

    var campo = $("#txtIntroducao");
    campo.tinymce($.extend({}, formatIntroducaoProva, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));

    $("#btnExpandirTextoImpressa").bind("click", function () {
        if ($("#areaTextoImpressa").css("display") == "none") {
            setTimeout(function () {
                campo = $("#txtCabecalho");
                campo.tinymce($.extend({}, formatIntroducaoProva, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));

                campo = $("#txtRodape");
                campo.tinymce($.extend({}, formatIntroducaoProva, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));
            }, 100);
        } else {
            $("#btnExpandirTextoImpressa").unbind("click");
            criarBotaoExpandirArea('#btnExpandirTextoImpressa', '#areaTextoImpressa');
        }
    });
}
/* ********************* Questões ******************** */
function carregarQuestoes() {
    //mata os dialogos caso existam
    if ($("#dlgCriterioBusca").is(':data(dialog)')) {
        $("#dlgCriterioBusca").dialog("destroy");
        $("#dlgCriterioBusca").remove();
    }
    if ($("#dlgAdicionarBusca").is(':data(dialog)')) {
        $("#dlgAdicionarBusca").dialog("destroy");
        $("#dlgAdicionarBusca").remove();
    }

    //mata as instancias das classificações
    //Classificacao._instancias = [];
    destroyBuscaQuestaoProva();
    destroyBuscaCriterioProva();

    $.ajax({
        url: caminhoBase + '/Criacao/QuestoesProva/',
        data: $(this).serialize() + '&' + $('#frmProva').serialize(),
        type: "POST",
        success: function(dados, status, xhttp) { retornoQuestoes(dados); }
    });
}

var tipoSelecaoQuestao = 1; // 1 = manual, 2 = automatica
var bCancelarBusca = true;

function inicializarQuestoes() {
    var lnkGerar, lnkBusca, lnkCriterio;

    ajuda.criarInversa("helpBoxQuestaoAvaliacao", "helpBoxQuestaoAvaliacaoCaixa", RecursosJS["msg021"]);
    ajuda.criar("helpLisQuestaoAvaliacao", "helpLisQuestaoAvaliacaoCaixa", RecursosJS["msg022"]);

    acaoSubmitSalvar(undefined);

    $('#btnVoltarQuestoes').click(function () { carregarTela('estrutura'); });
    $('#btnAvancarQuestoes').click(function () { carregarTela('confirmacao'); });

    tipoSelecaoQuestao = 1; //manual
    if ($('#QuestoesProvaAutomatica').length > 0) {
        tipoSelecaoQuestao = 2; //automatica
    }

    if (tipoSelecaoQuestao == 1) {
        lnkBusca = $('#btnAdicionarBuscaQuestoes').attr('href');

        $('#dlgAdicionarBusca').dialog({ dialogClass: 'SEC025_DIALOG',
            autoOpen: false, modal: true,
            width: 885, height: 777,
            position: ['center', 'center'],
            draggable: false, resizable: false,
            close: function () {
                if (bCancelarBusca) {
                    onCancelarBusca();
                }
                bCancelarBusca = true;
            }
        });

        $("input#txtModificadoInicial, input#txtDataBuscaFim").datepicker({
            showOn: "button",
            buttonImage: pathImgCalendario(),
            buttonImageOnly: true
        });
        
        dataMode.data("input#txtModificadoInicial, input#txtDataBuscaFim");

        tblAdicionar = new Tabela('frmTabelaBusca', 'tblBusca', false, new Ordenacao("nome", true), retornoTabelaBusca, '#frmProva, .dlgFiltroClassificacao > form');
        tblAdicionar.atualizarSelecionados = true;
        tblAdicionar.checkBoxName = "chkQuestaoBusca"; 

        tblAdicionar.retornoCarregarTabela = function (dados) {
            if (retornoErro(dados)) {
                return;
            }
            new QuestaoResumo("#tblBusca", "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra");;

            ajusteFiltroBuscaQuestao();
        }
        $('#btnCancelarBuscaQuestoes').attr('href', FUNCAO_VAZIA).click(cancelarBusca);
        $('#btnAdicionarBuscaQuestoes').attr('href', FUNCAO_VAZIA).click(function () { salvarBusca(); });

        //ajustar as classificacoes

        initBuscaQuestaoProva();

        iniTodasQuestoes(true, true);



    } else if (tipoSelecaoQuestao == 2) {
        /*criterios automaticos */
        lnkCriterio = $('#btnAdicionarBuscaCriterio').attr('href');

        $('#btnIncluirCriterio').attr('href', FUNCAO_VAZIA).click(abrirCriteriosBusca);

        $('#dlgCriterioBusca').dialog({ dialogClass: 'SEC025_DIALOG',
            autoOpen: false, modal: true,
            width: 885, height: 580,
            position: ['center', 'center'],
            draggable: false, resizable: false
        });
        //aplicar acoes aos botoes de criterios
        
        $('.btnCriterioClassificacao a').click(function(){
            criterioOpen($(this));
        });

        $('#btnCancelarCriterioBusca').click(cancelarCriteriosBusca);
        $('#btnAdicionarBuscaCriterio').attr('href', FUNCAO_VAZIA).click(function () { salvaCriterio(); });

        tblListaCriterio = new Tabela('frmTabelaCriterios', 'tblCriterios', true, new Ordenacao("nome", true), retornoTabelaCriterios,undefined, retornoCriterioVazio);

        $('input[name="rdoGerarProva"]').click(function () {
            if (this.value == 1) {
                EscolhaGerarProvaAgora();
            } else if (this.value == 2) {
                EscolhaGerarProvaDepois();
            }
        });
        var loadTabela = false;
        if ($("#rdoGerarProvaAgora").is(":checked")) {
            $('#BoxQuestoesProvaAutomatica').show();
            loadTabela = true
        } else {
            $('#BoxQuestoesProvaAutomatica').hide();
        }


        iniTodasQuestoes(loadTabela, false);

        
        $('.areaTabelaQuestoesCabecalho .btnEsq, .btnDir label[for="slcQuestoesPagina"], .areaTabelaQuestoesCabecalho div#caixaAdicionar').hide();

        $('.areaTabelaQuestoesFerramentas').hide();

        aplicarAcaoAgrupamento('frmTabelaCriterios', "tblAgrupamentoCriterio")

        //retornoCarregarLinhas_EventoCriterios
        tblListaCriterio.retornoCarregarTabela = function (dados) {
            if (retornoErro(dados)) {
                return;
            }
            //atribuir a ação para as caixas de valores
            //txtValorCriterio

            $("#frmTabelaCriterios input[name='txtQuestaoSelecionada']").setMask({
                mask: '999', autoTab: 'false'
            }).focusin(function () {
                $(this).attr("focusvalue", this.value);
            }).keydown(function () {
                $(this).attr("oldvalue", this.value);
            }).blur(function () {
                if ($(this).attr("focusvalue") != this.value) {
                    salvarQuestoesCriterio(this);
                }
            }).keypress(function (event) {
                if (event.which == 13) {
                    $(this).blur();
                }
            }).keyup(function () {
                if (parseInt(this.value,10) > parseInt($(this).parent().parent().find("input[name='txtQuestaoEncontrada']").val(),10)) {
                    this.value = $(this).attr("oldvalue");
                }
            });


            //seta a mascara para os valores
            dataMode.decimal("#frmTabelaCriterios input[name='txtValorCriterio']", 1, "oldValue", "focusvalue");
            $("#frmTabelaCriterios input[name='txtValorCriterio']").keydown(function (event) {
                if (event.which == 13) {
                    $(this).blur();
                }
            }).keyup(function () {
                if (parseFloat(this.value.replace(",", ".")).toFixed(1) > 100.0) {
                    this.value = 100;
                    $(this).attr("oldvalue", 0);
                    $(this).blur();
                }
            }).blur(function () {
                if (parseFloat(this.value.replace(",", ".")).toFixed(1) < 0.1) {
                    this.value = "0,1";
                    $(this).attr("oldvalue", 0);
                }
                //salva apenas se mudou de valor
                if (this.value != $(this).attr("focusvalue")) {
                    salvarValorCriterio(this);
                }
            });

            function salvarQuestoesCriterio(obj, bolConfirm) {
                var idQuestao = ($(obj).parent("td").parent("tr").find("input[name='chkCriterio.Value']").val());
                var selecionadas = obj.value;

                $.ajax({
                    url: caminhoBase + '/Criacao/SalvaQuestoesCriterio/',
                    data: $('#frmProva').serialize() + '&idProvaCriterio=' + idQuestao + '&intSelecionadas=' + selecionadas + (bolConfirm ? '&bolConfirmTipo=1' : ''),
                    type: "POST",
                    success: function (dados, status, xhttp) {

                        if (retornoErro(dados)) {
                            $(obj).val($(obj).attr("focusvalue"));
                            return;
                        }

                        if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                            confirm.exibir($(dados), function () { salvarQuestoesCriterio(obj, true) }, function () { $(obj).val($(obj).attr("focusvalue")); });
                            return;
                        }

                        $("#frmTabelaCriterios #txtSelecionadasTotal").html($(dados).text());
                        if (bolConfirm) {
                            tblLista.recarregarTabela();
                            NaoEscolherMomentoAutomatico();
                        }

                    }
                });
            }
            function salvarValorCriterio(obj, bolConfirm) {
                var idQuestao = ($(obj).parent("td").parent("tr").find("input[name='chkCriterio.Value']").val());
                var valor = obj.value;

                $.ajax({
                    url: caminhoBase + '/Criacao/SalvaValorCriterio/',
                    data: $('#frmProva').serialize() + '&idProvaCriterio=' + idQuestao + '&intValor=' + valor + (bolConfirm ? '&bolConfirmTipo=1' : ''),
                    type: "POST",
                    success: function (dados, status, xhttp) {
                        if (retornoErro(dados)) {
                            return;
                        }
                        if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                            confirm.exibir($(dados), function () { salvarValorCriterio(obj, true) }, function () { $(obj).val($(obj).attr("focusvalue")); });
                            return;
                        }

                        $("#frmTabelaCriterios #txtValorTotal").html($(dados).text());
                        if (bolConfirm) {
                            tblLista.recarregarTabela();
                            NaoEscolherMomentoAutomatico();
                        }


                    }
                });
            }
        }
    }

}
var bolCarregouAgrupamento = false;
function aplicarAcaoAgrupamento(form, tbl) {

    bolCarregouAgrupamento = false;

    //aplicar a tabela
    $('#dlgAgrupamento').dialog({
        dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 580,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });

    $("#" + form + ' .novogrupo').click(function () {
        abrirAgrupamento(0)
    }).attr('href', FUNCAO_VAZIA);

    $('#btnSalvarAgrupamento').click(salvarAgrupamento);
    $('#btnFecharAgrupamento').click(function () { $('#dlgAgrupamento').dialog('close'); });
    $('#btnCancelarAgrupamento').click(function () { $('#dlgAgrupamento').dialog('close');  });

    $("#" + form + ' > div.ferramentas > div.funcao > div.slc.ferragrupamento,' + "#" + form + ' > div.ferramentas > div.funcao > div.slc.agrupamentotabela').combo({
        close: "fechar",
        onOpen: function () {
            if (bolCarregouAgrupamento) {
                return;
            }

            var load = document.createElement("div");
            load.className = "carregando";

            $('#' + tbl)[0].cellSpacing = "0";
            $('#' + tbl)[0].cellPadding = "0";

            $('#' + tbl + ' tbody').html($(load))

            $.ajax({
                url: caminhoBase + '/Criacao/CarregarGrupos',
                data: $('#frmProva').serialize(),
                type: "POST",
                success: function (dados, status, xhttp) {
                    if (retornoErro(dados)) {
                        return;
                    }

                    showTabelaAgrupamento(dados)

                    bolCarregouAgrupamento = true;
                }
            });

        },
        onClose: function () { }
    });
}

function showTabelaAgrupamento(dados) {
    var tbl = "#tblAgrupamentoQuestao";
    if (tipoSelecaoQuestao != 1) {
        tbl = "#tblAgrupamentoCriterio";
    }

    $(tbl + ' tbody').html(dados)

    // Efeito da linha selecionada
    $(tbl + ' tbody > tr').each(function (index) {
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

        var botoes = $('div.botoes > a', $(this));

        botoes.each(function (index) {
            var botao = $(this);
            var link = $(this).attr('href');

            if (botao.is('.funcao')) { // se for uma função javascript ele refaz como onclick
                botao.click(function () {
                    setTimeout(link, 1);
                });
                botao.attr('href', 'javascript:void(0)');
            }
        });


    });

    $(tbl).sortable({
        handle: 'a.reordenar',
        items: 'tr',
        axis: 'y',
        opacity: 0.9,
        update: function (event, ui) {
            $.ajax({
                url: caminhoBase + '/Criacao/ReordenarGrupo',
                data: $(tbl + ' tbody tr input[name="idProvaGrupo"]').serialize() + '&' + $('#frmProva').serialize(),
                type: "POST",
                success: function (dados, status, xhttp) {
                    if (retornoErro(dados)) {
                        return;
                    }
                    if (tipoSelecaoQuestao == 1) {
                        tblLista.recarregarTabela();
                    } else {
                        tblListaCriterio.recarregarTabela();
                        tblLista.recarregarTabela();
                    }
                }
            });


        }

    });
}
function abrirAgrupamento(idGrupo) {

    $('#btnSalvarAgrupamento').show();
    $('#btnCancelarAgrupamento').show();
    $('#btnFecharAgrupamento').hide();

    $('#frmAgrupamento').html('');

    $('#dlgAgrupamento').dialog('open');

    $.ajax({
        url: caminhoBase + '/Criacao/NovoGrupo',
        data: $('#frmProva').serialize() + '&idProvaGrupo=' + idGrupo,
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                return;
            }

            $('#frmAgrupamento').html(dados);


            $('#frmAgrupamento select[name="strCor"]').colourPicker({
                ico: caminhoBase + '/' + 'Content/imgcss/1.0.2/jquery.colourPicker.gif',
                title: false,
                callBack: escolheuCor
            });

            var funcaoAbre = function () {
                $('#dlgAgrupamento').dialog({ height: 580 });
                $('#conteudoCapa').show();
            }

            if ($('#conteudoCapa').is(":hidden")) {
                $('#dlgAgrupamento').dialog({ height: 250 });
                $('#rdoCapaSim').bind("change", function () {
                    funcaoAbre();
                    setTimeout(function () {
                        var campo = $("#strConteudoGrupo");
                        campo.tinymce($.extend({}, formatCapaProva, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));
                    }, 10);
                });
            } else {
                var campo = $("#strConteudoGrupo");
                campo.tinymce($.extend({}, formatCapaProva, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));
                funcaoAbre();
            }

            $('#rdoCapaNao').change(function () {
                $('#rdoCapaSim').unbind("change");
                $('#dlgAgrupamento').dialog({ height: 250 });
                $('#conteudoCapa').hide();
                $('#rdoCapaSim').bind("change", function () {
                    funcaoAbre();
                });
            });
        }

    });

}
function escolheuCor(cor) {
    $('#frmAgrupamento .labelSigla').attr('class', '').addClass('labelSigla').addClass('agrupamentoCor-' + cor);
}
function salvarAgrupamento() {
    $.ajax({
        url: caminhoBase + '/Criacao/SalvarGrupo',
        data: $('#frmProva').serialize() + '&' + $('#frmAgrupamento').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                return;
            }

            $('#dlgAgrupamento').dialog('close');

            showTabelaAgrupamento(dados);

            tblLista.recarregarTabela();
        }
    });
}
function visualizarAgrupamento(idGrupo) {
    $('#btnSalvarAgrupamento').hide();
    $('#btnCancelarAgrupamento').hide();
    $('#btnFecharAgrupamento').show();

    $('#dlgAgrupamento').dialog({ height: 580 });

    $('#frmAgrupamento').html('');

    $('#dlgAgrupamento').dialog('open');

    $.ajax({
        url: caminhoBase + '/Criacao/VisualizarGrupo',
        data: $('#frmProva').serialize() + '&idProvaGrupo=' + idGrupo,
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                return;
            }

            $('#frmAgrupamento').html(dados);


        }
    });
}
function excluirAgrupamento(idGrupo, bolConfirm){
    $.ajax({
        url: caminhoBase + '/Criacao/ExcluirGrupo',
        data: $('#frmProva').serialize() + '&idProvaGrupo=' + idGrupo + (bolConfirm ? '&bolConfirmTipo=1' : ''),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                return;
            }

            if ($(dados).hasClass("confirm")) {
                confirm.exibir($(dados), function () { excluirAgrupamento(idGrupo, true) });
                return;
            }

            showTabelaAgrupamento(dados);

            if (tipoSelecaoQuestao == 1) {
                tblLista.recarregarTabela();
            }
        }
    });
}
function aplicarAgrupamento(idGrupo) {
    if (tipoSelecaoQuestao == 1) {
        tblLista.executarAcaoExterna('agrupamento', caminhoBase + '/Criacao/AgruparQuestoes/', 'txtIdProvaGrupo=' + idGrupo);
    } else {
        tblListaCriterio.executarAcaoExterna('agrupamento', caminhoBase + '/Criacao/AgruparCriterios/', 'txtIdProvaGrupo=' + idGrupo);
    }
}
function confirmaAgrupamentoCriterio() {
    var idGrupo = $('#statusAtualConfirm').val();
    tblListaCriterio.executarAcaoExterna('agrupamentoconfirm', caminhoBase + '/Criacao/AgruparCriterios/', 'txtIdProvaGrupo=' + idGrupo + '&bolConfirmTipo=1');
}
function iniTodasQuestoes(loadTabela, bolModoManual) {
    var lnkGerar, lnkBusca, lnkCriterio;

    
    lnkPosicionamento = $('#btnPosicionamento').attr('href');

    $('#btnIncluirBusca').attr('href', FUNCAO_VAZIA).click(abrirQuestoesBusca);


    $("input#txtDataBuscaInicio, input#txtModificadoFinal").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true,
        constrainInput: true
    });
    dataMode.data("input#txtDataBuscaInicio, input#txtModificadoFinal");


    tblLista = new Tabela('frmTabelaQuestoes', 'tblQuestoes', false, new Ordenacao("nome", true), retornoTabelaQuestoes);
    tblLista.ModeOrdenacao(false);

    $('#slcQuestoesPagina').change(function () { trocarNumeroPaginas(); });
    $('#btnPosicionamento').attr('href', FUNCAO_VAZIA).click(function () { atualizarPosicionamento(lnkPosicionamento,true); });
    $('#btnPosicionamento').hide();
    //frmTabelaBuscaGenerica



    tblLista.retornoCarregarTabela = function (dados) {
        if (retornoErro(dados)) {
            return;
        }

        //visualização da questao
        var questaoResumo = new QuestaoResumo("#tblQuestoes", "a.tooltip", erroRetornoQuestaoResumo);
        questaoResumo.aplicarBotaoExtra("a.tooltipextra");
        if (tipoSelecaoQuestao == 1) {
            //seta a mascara para os valores
            dataMode.decimal("#frmTabelaQuestoes input[name='txtValorQuestao']", 2, "oldValue", "focusvalue");
            $("#frmTabelaQuestoes input[name='txtValorQuestao']").keydown(function (event) {
                if (event.which == 13) {
                    $(this).blur();
                }
            }).keyup(function () {
                if (parseFloat(this.value.replace(",", ".")).toFixed(2) > 100.0) {
                    this.value = 100;
                    $(this).attr("oldvalue", 0);
                    $(this).blur();
                }
            }).blur(function () {
                if (parseFloat(this.value.replace(",", ".")).toFixed(2) < 0.1) {
                    this.value = "0,10";
                    $(this).attr("oldvalue", 0);
                }
                //salva apenas se mudou de valor
                if (this.value != $(this).attr("focusvalue")) {
                    salvarValorQuestao(this);
                }
            });

            //seta para o valor total
            dataMode.decimal("#frmTabelaQuestoes input[name='txtValorTotal']", 2, "oldValue", "focusvalue");
            $("#frmTabelaQuestoes input[name='txtValorTotal']").keydown(function (event) {
                if (event.which == 13) {
                    $(this).blur();
                }
            }).keyup(function () {
                if (parseFloat(this.value.replace(",", ".")).toFixed(2) > 1000.0) {
                    this.value = 1000;
                    $(this).attr("oldvalue", 0);
                    $(this).blur();
                }
            }).blur(function () {
                if (parseFloat(this.value.replace(",", ".")).toFixed(2) < 0.02) {
                    this.value = "0,02";
                    $(this).attr("oldvalue", 0);
                }
                //salva apenas se mudou de valor
                if (this.value != $(this).attr("focusvalue")) {
                    salvarValorTotal(this);
                }
            });



        } else {
            $("#frmTabelaQuestoes input[name='txtValorTotal']").attr('readonly', true);
            $("#frmTabelaQuestoes input[name='txtValorQuestao']").attr('readonly', true);
        }
        //mascara para o posicionamento
        dataMode.decimal("#frmTabelaQuestoes input[name='txtPosicao']", 1, "oldValue", "focusvalue");
        $("#frmTabelaQuestoes input[name='txtPosicao']").setMask({
            mask: '999', autoTab: 'false'
        });
        $("#frmTabelaQuestoes input[name='txtPosicao']").keydown(function (event) {
            if (event.which == 13) {
                $(this).blur();
            }
        }).blur(function () {
            if (this.value != $(this).attr("focusvalue")) {
                //reposicionar as linhas para que fique no local correto
                var linha = $(this).closest('tr');
                var fieldName = $(this).attr('name');
                var linhaDestino = linha.closest('table').find('input[name="' + fieldName + '"][value="' + $(this).val() + '"]').closest('tr');
                //linha.find('input[name="hidPosicao"]').val($(this).val());
                linhaDestino.before(linha);
                //atualizarPosicionamento(lnkPosicionamento, true);
                atualizarLinhasTabela();
            }
        });

        $("#tblQuestoes tbody a.reordenar").mousedown(function () {
            questaoResumo.closeOpen();
        });
        $("#tblQuestoes tbody").sortable({
            handle: 'a.reordenar',
            axis: 'y',
            opacity: 0.9,
            update: function (event, ui) {

                atualizarLinhasTabela();
            }

        });

        function atualizarLinhasTabela() {
            var listLinha = $('#tblQuestoes tbody tr');
            var listaAtualizada = [];
            for (var i = 0; i < listLinha.length; i++) {
                var idPos = parseInt($(listLinha[i]).attr('id').split('_')[1], 10)
                if (idPos != i) {
                    var intPosicaoAtualiza = $($('#tblQuestoes tbody tr')[i]).find("input[name='hidPosicao']").val();
                    $($('#tblQuestoes tbody tr')[idPos]).find("input[name='txtPosicao']").val(intPosicaoAtualiza)
                    listaAtualizada.push($($('#tblQuestoes tbody tr')[i]));
                }
            }
            //finaliza a atualização da lista para que possa continuar mudando o posicionamento
            for (var i = 0; i < listaAtualizada.length; i++) {
                var idPos = listaAtualizada[i].find("input[name='txtPosicao']").val();
                listaAtualizada[i].find("input[name='hidPosicao']").val(idPos)
                listaAtualizada[i].attr('id', 'linha_' + i);
            }

            atualizarPosicionamento(lnkPosicionamento, true);
        };
        function salvarValorQuestao(obj, bolConfirm) {
            var idQuestao = ($(obj).parent("td").parent("tr").find("input[name='chkQuestao.Value']").val());
            var valorQuestao = obj.value;

            $.ajax({
                url: caminhoBase + '/Criacao/SalvaValorQuestao/',
                data: $('#frmProva').serialize() + '&idQuestao=' + idQuestao + '&intValor=' + valorQuestao + (bolConfirm ? '&bolConfirmTipo=1' : ''),
                type: "POST",
                success: function (dados, status, xhttp) {
                    if (retornoErro(dados)) {
                        return;
                    }
                    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                        confirm.exibir($(dados), function () { salvarValorQuestao(obj, true) }, function () { $(obj).val($(obj).attr("focusvalue")); });
                        return;
                    }
                    $("#frmTabelaQuestoes #txtValorTotal").val($(dados).text());
                }
            });
        }

        function salvarValorTotal(obj, bolConfirm) {
            var idQuestao = ($(obj).parent("td").parent("tr").find("input[name='chkQuestao.Value']").val());
            var valorQuestao = obj.value;

            $.ajax({
                url: caminhoBase + '/Criacao/SalvaValorTotal/',
                data: $('#frmProva').serialize() + '&intValor=' + valorQuestao + (bolConfirm ? '&bolConfirmTipo=1' : ''),
                type: "POST",
                success: function (dados, status, xhttp) {
                    if (retornoErro(dados)) {
                        return;
                    }
                    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                        confirm.exibir($(dados), function () { salvarValorTotal(obj, true) }, function () { $(obj).val($(obj).attr("focusvalue")); });
                        return;
                    }
                    var lstValores = eval($(dados).text()); //lista dos valores de todas as questoes
                    var lstCampos = $("#frmTabelaQuestoes input[name='txtValorQuestao']");
                    for (var i = 0; i < lstCampos.length; i++) {
                        //recuperar a posicao da questao para dai buscar o valor completo
                        var intPosicao = $(lstCampos[i]).parent().parent().find("input[name='hidPosicao']").val();
                        $(lstCampos[i]).val(lstValores[intPosicao - 1]);
                    }
                }
            });
        }
    }

    if (loadTabela) {
        tblLista.recarregarTabela();
    }

    if (tipoSelecaoQuestao == 1) {
        aplicarAcaoAgrupamento("frmTabelaQuestoes", "tblAgrupamentoQuestao");
    }
}

function trocarNumeroPaginas() {
    tblLista.recarregarTabela();
}

function atualizarPosicionamento(link, recarregar) {
    $.ajax({
        url: link,
        data: $('#frmTabelaQuestoes').serialize() + '&' + $('#frmProva').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if(retornoErro(dados)){
                tblLista.recarregarTabela();
                return;
            }
            if (recarregar) {
                tblLista.recarregarTabela();
            } 
        }
    });
}

function retornarAcaoQuestoes(acao, dados) {
    alert("retornarAcaoQuestoes");
}

/* Questões selecionadas */
function retornoQuestoes(dados) {
    if (!retornoErro(dados)) {
        $('div.popup').remove();
        $("div#cxaQuestoes").html($(dados));
    }
    //initBuscaQuestaoProva();
    trocarTela('questoes');
}

function retornoTabelaQuestoes(acao, dados) {
    if (retornoErro(dados)) {
        return;
    }
    switch (acao.toLowerCase()) {
        case 'apagar':
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluirQuestaoMassa);
                return;
            }
            break;
        case 'excluir':
            //mensagem.exibir(div);
            break;
        case 'remover':
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluirQuestao);
                return;
            }
            break;
    }
    tblLista.recarregarTabela();
}
function confirmaExcluirQuestao() {
    var idQuestao = $("#statusAtualConfirm").val();
    tblLista.executarAcaoExterna('remover', '/Criacao/ExcluirQuestaoProva/' + idQuestao, 'bolConfirmTipo=1');
}
function confirmaExcluirQuestaoMassa() {
    tblLista.executarAcaoMassa('apagar', true);
}

/* Questoes busca */
function abrirQuestoesBusca() {
    bCancelarBusca = true;
    $('#dlgAdicionarBusca').dialog('open');
    
    setTimeout(tblAdicionar.executarNovoFiltro, 100);
    //initBuscaQuestaoProva();
}

function retornoArvore(dados) {
    retornoErro(dados);
}

/*function executarBuscaAvanca(){
    tblAdicionar.formExtra += (tblAdicionar.formExtra ? ", " : "") + " #frmTabelaBuscaAvancada";
    
    //$('#frmTabelaBusca').submit();
    tblAdicionar.executarFiltro();
}*/
function cancelarBusca() {
    $('#dlgAdicionarBusca').dialog('close');
    onCancelarBusca();
}
function onCancelarBusca() {
    limparFiltroBuscaQuestao();
    tblAdicionar.limpar();
}
/*passo a passo busca avancada*/

function salvarBusca(bolConfirm) {
    var lnkBusca = caminhoBase + '/Criacao/AdicionarQuestoesBusca/'
    carregando.mostrar();
    tblAdicionar.executarAcaoExterna("adicionar", lnkBusca, (bolConfirm ? "&bolConfirmTipo=1" : ""));
}

function retornoTabelaBusca(acao, dados) {
    carregando.esconder();
    bCancelarBusca = false;
    $('#dlgAdicionarBusca').dialog('close');

    if ($(dados).attr('class') && $(dados).attr('class').indexOf("erro") > -1) {
        mensagem.exibir($(dados));
        return
    }
    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
        confirm.exibir($(dados), function () { salvarBusca(true) });
        return;
    }
    tblAdicionar.limpar();
    tblLista.recarregarTabela();
}

/* criterios automaticos */
function abrirCriteriosBusca() {
    $('#dlgCriterioBusca').dialog('open');
    //deixa todos os criterios fechados
    $('.ListaCriterio').hide();
    $('.btnAddCriterio').removeClass('btnAddCriterioAberto');
    initCriterioProva();
}
function cancelarCriteriosBusca() {
    $('#dlgCriterioBusca').dialog('close');
}
function criterioOpen(obj) {
    var objLista = obj.parents('form').find('.ListaCriterio')
    var bolVisible = objLista.is(':visible');
    $('.btnAddCriterio').removeClass('btnAddCriterioAberto');
    $('.ListaCriterio').hide();
    if(!bolVisible){
        obj.find('.btnAddCriterio').addClass('btnAddCriterioAberto');
        objLista.show('fast');
    }
}
function salvaCriterio(bolConfirm) {
    carregando.mostrar();
    //incluir quais seriam as listas de criterios
    //lstClassificacaoTipo
    var listClassificacao = [];
    /*for(var i=0; i<Classificacao._instancias.length; i++){
        var valSelecionadas = Classificacao._instancias[i].getSelecionados(true);
        if($.trim(valSelecionadas) != ""){
            listClassificacao.push("lstClassificacaoTipo=" + valSelecionadas);
        }
    }*/
    for(var i=0; i<NovaClassificacao.listaCriterioRef.length; i++){
        var valRef = NovaClassificacao.listaCriterioRef[i];
        var valSelecionadas = NovaClassificacao.listaCriterio[valRef].buscaCriterioSelecionadas();
        if($.trim(valSelecionadas) != ""){
            /*var campo = $('<input type="hidden" name="lstClassificacaoTipo" value="" />')
            campo.val(valSelecionadas);
            $('#frmTabelaBuscaAvancada').append(campo);*/
            listClassificacao.push("lstClassificacaoTipo=" + valSelecionadas);
        }
    }
    $.ajax({
        url: caminhoBase + '/Criacao/AdicionarCriterioBusca/',
        data: $('#frmProva').serialize() + "&" + listClassificacao.join('&') + "&" + (bolConfirm ? '&bolConfirmTipo=1' : ''),
        type: "POST",
        success: function (dados, status, xhttp) { retornoSalvaCriterio(dados); if (bolConfirm) NaoEscolherMomentoAutomatico() }
    });
}
function retornoTabelaCriterios(acao, dados) {
    if (retornoErro(dados)) {
        return;
    }
    switch (acao.toLowerCase()) {
        case 'apagar':
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluirCriterioMassa);
                return;
            }
        case 'remover':
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluirCriterio);
                return;
            }
        case 'removerconfirm':
            NaoEscolherMomentoAutomatico();
            break;
        case 'apagarconfirm':
            NaoEscolherMomentoAutomatico();
            break;
        case 'excluir':
            break;
        case 'agrupamento':
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaAgrupamentoCriterio);
                return;
            }
            break;
        case 'agrupamentoconfirm':
            NaoEscolherMomentoAutomatico();
            break;
    }
    tblListaCriterio.recarregarTabela();
}
function confirmaExcluirCriterio() {
    var idCriterio = $("#statusAtualConfirm").val();
    tblListaCriterio.executarAcaoExterna('removerconfirm', caminhoBase +'/Criacao/ExcluirCriterioProva/' + idCriterio, 'bolConfirmTipo=1');
}
function confirmaExcluirCriterioMassa() {
    tblListaCriterio.executarAcaoMassa('apagarconfirm', true);
}
function retornoCriterioVazio(bolVazio) {
    if (bolVazio) {
        //$("#QuestoesProvaManual").hide();
    } else {
        $("#QuestoesProvaManual").show();
    }
}
function retornoSalvaCriterio(dados) {
    carregando.esconder();
    cancelarCriteriosBusca();
    if (retornoErro(dados)) {
        return;
    }
    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
        confirm.exibir($(dados), function () { salvaCriterio(true) });
        return;
    }
    tblListaCriterio.recarregarTabela();
}

function EscolhaGerarProvaAgora() {
    carregando.mostrar();
    $("li.gerarAgora").addClass("ativo");
    $("li.gerarRealizacao").removeClass("ativo");
    $.ajax({
        url: caminhoBase + '/Criacao/GerarProvaCriterios/',
        data: $('#frmProva').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoEscolhaGerarProvaAgora(dados); }
    });
}
function retornoEscolhaGerarProvaAgora(dados) {
    carregando.esconder();
    if(retornoErro(dados)){
        return;
    }

    $('.criterioInvalido').removeClass('criterioInvalido')
    var Retorno = $(dados).text().split(',');
    if (parseInt(Retorno[0],10) != 0) {
        //destacar os caras com problemas
        var tmpMsg = RecursosJS["msg004"];
        var dados = mensagem.htmlTemplate("Avaliações",true, tmpMsg, 'alerta');
        mensagem.exibir($(dados));
        $('input[name="chkCriterio.Value"]').each(function () {
             $(this).parent('td').parent('tr').removeClass('criterioInvalido')
            if (Retorno.indexOf(this.value) != -1) {
                $(this).parent('td').parent('tr').addClass('criterioInvalido')
            }
        });
    }

    carregando.esconder();
    tblLista.recarregarTabela();
    $('#BoxQuestoesProvaAutomatica').show();
}

function EscolhaGerarProvaDepois() {
    carregando.mostrar();
    $("li.gerarAgora").removeClass("ativo");
    $("li.gerarRealizacao").addClass("ativo");
    $.ajax({
        url: caminhoBase + '/Criacao/DesGerarProvaCriterios/',
        data: $('#frmProva').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoEscolhaGerarProvaDepois(dados); }
    });
}
function retornoEscolhaGerarProvaDepois(dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }

    $('.criterioInvalido').removeClass('criterioInvalido')
    var Retorno = $(dados).text().split(',');
    if (parseInt(Retorno[0], 10) != 0) {
        //destacar os caras com problemas
        var tmpMsg = RecursosJS["msg004"];
        var dados = mensagem.htmlTemplate("Avaliações", true, tmpMsg, 'alerta');
        mensagem.exibir($(dados));
        $('input[name="chkCriterio.Value"]').each(function () {
            $(this).parent('td').parent('tr').removeClass('criterioInvalido')
            if (Retorno.indexOf(this.value) != -1) {
                $(this).parent('td').parent('tr').addClass('criterioInvalido')
            }
        });
    }

    $('#BoxQuestoesProvaAutomatica').hide();
}

function NaoEscolherMomentoAutomatico() {
    $("li.gerarAgora").removeClass("ativo");
    $("li.gerarRealizacao").removeClass("ativo");
    $('input[name="rdoGerarProva"]').attr('checked', false);
    $('#BoxQuestoesProvaAutomatica').hide();
}
/* ******************* Confirmação ******************* */
function carregarConfirmacao() {
    $.ajax({
        url: caminhoBase + '/Criacao/Confirmacao/',
        data: $(this).serialize() + '&' + $('#frmProva').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoConfirmacao(dados); }
    });
}

function retornoConfirmacao(dados) {
    if (!retornoErro(dados)){
        $('#dlgVisualizarQuestoes').remove();
        $("div#cxaConfirmacao").html($(dados));
    }
    trocarTela('confirmacao');
}

function inicializarConfirmacao() {
    acaoSubmitSalvar(undefined);
    ajuda.criar("helpConfirmacaoAvaliacao", "helpConfirmacaoAvaliacaoCaixa", RecursosJS["msg023"]);
    $('.btnConfirmacaoEditarConfiguracao').click(function () { carregarTela('estrutura'); });
    $('#btnConfirmcacaoEditarQuestao').click(function () { carregarTela('questoes'); });
    var ul, arvores;
    //var lnkVisualizar = $('#btnVisualizarQuestao').attr('href');
    tblListaResumo = new Tabela('frmTabelaQuestoes', 'tblQuestoes', false, new Ordenacao("nome", true));
    tblListaResumo.retornoCarregarTabela = function (dados) {
        if (retornoErro(dados)) {
            return;
        }
        new QuestaoResumo("#tblQuestoes", "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra");
    }
    $('#dlgVisualizarQuestoes').dialog({
        dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 580,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });
    $('#btnVisualizarQuestao').attr('href', FUNCAO_VAZIA).click(abrirVisualizarQuestoes);
    $('#btnFecharVisualizar').attr('href', FUNCAO_VAZIA).click(fecharVisualizarQuestoes);
    $('#btnVoltarConfirmacao').click(function () { carregarTela('questoes'); });
    $('#btnSalvarConfirmacao').click(function () { salvarConfirmacao(); });
    $('form#frmConfirmacaoProva').submit(function (e) {
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize() + '&' + $('#frmProva').serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornoSalvarConfirmacao(dados); }
        });
        e.preventDefault();
    });
}

function salvarConfirmacao() {
    carregando.mostrar();
    $('form#frmConfirmacaoProva').submit();
}

/* Visualizar Questões */
function abrirVisualizarQuestoes() {
    tblListaResumo.recarregarTabela();
    $('#dlgVisualizarQuestoes').dialog('open');
}
function fecharVisualizarQuestoes() {
    tblListaResumo.limpar();
    tblListaResumo.limparPaginacao();
    $('#dlgVisualizarQuestoes').dialog('close');
}

function retornoSalvarConfirmacao(dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
    } else {
        location.href = $(dados).text();
    }
}

/* expandir */
function criarBotaoExpandirArea(sBotao, sBox) {
    if ($(sBotao).length <= 0) {
        return;
    }
    var txtBotao = $(sBotao).html().split("|");
    $(sBotao).attr("txtHide", txtBotao[0]);
    $(sBotao).attr("txtShow", txtBotao[1]);
    $(sBotao).attr("areaBox", sBox);
    if ($(sBox).is(":visible")) {
        $(sBotao).html($(sBotao).attr("txtHide"));
    } else {
        $(sBotao).html($(sBotao).attr("txtShow"));
    }
    $(sBotao).click(function () {
        if ($($(this).attr("areaBox")).is(":visible")) {
            $($(this).attr("areaBox")).hide();
            $(this).html($(this).attr("txtShow"));
        } else {
            $($(this).attr("areaBox")).show();
            $(this).html($(this).attr("txtHide"));
        }
    });
}
function expandirBoxArea() {
    if ($(sBox).is(":visible")) {
        $(sBox).hide("slow");
    } else {
        $(sBox).show("slow");
    }
}

function erroRetornoQuestaoResumo(dados) {
    retornoErro(dados);
}
