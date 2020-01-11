NovaClassificacao.prototype.initSPE = function () {
    var cls = this;

    this.speLoad = false;
    this.get_count = 0;

    this.limpa_load = function (count) {
        if ((count > 6) && (parseInt($('#spe_idClassificacao').val()) == 0)) {
            $('div#spe_class_loading_div').hide();
        }
        if ((count > 7) && (parseInt($('#spe_idClassificacao').val()) > 0)) {
            $('div#spe_class_loading_div').hide();
        }
    };

    this.SpeDialogInit = function (container) {
        $('div#spe_class_loading_div').show();
        if (parseInt($('#spe_idClassificacao').val()) > 0)
            $('#spe_top_message').html('Alterar a classificação SPE já associada a essa questão.');
        else
            $('#spe_top_message').html('Criar nova classificação SPE associada a essa questão.');

        var __co = -1;
        var __ed = -1;
        var __di = -1;
        var __an = -1;
        var __vo = -1;
        var __ti = -1;
        var __un = -1;
        var __or = -1;
        var __gp = -1;

        $(container + ' .specolecaocombo').html('<option value="0">-selecione-</option>');
        $(container + ' .speedicaocombo').html('<option value="0">-selecione-</option>');
        $(container + ' .spedisciplinacombo').html('<option value="0">-selecione-</option>');
        $(container + ' .speanocombo').html('<option value="0">-selecione-</option>');
        $(container + ' .spevolumecombo').html('<option value="0">-selecione-</option>');
        $(container + ' .spetipocombo').html('<option value="0">-selecione-</option>');
        $(container + ' .speunidadecombo').html('<option value="0">-selecione-</option>');
        $(container + ' .speordemcombo').html('<option value="0">-selecione-</option>');
        $(container + ' .spegrupocombo').html('<option value="0">-selecione-</option>');

        cls.get_count = 0;

        $.getJSON(caminhoBase + "/SPE/Colecoes", function (result) {
            var options = $(container + ' .specolecaocombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.colecao));
            });
            if (__co > 0)
                $(container + ' .specolecaocombo').val(__co);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        $.getJSON(caminhoBase + "/SPE/Edicoes", function (result) {
            var options = $(container + ' .speedicaocombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.edicao));
            });
            if (__ed > 0)
                $(container + ' .speedicaocombo').val(__ed);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        $.getJSON(caminhoBase + "/SPE/Disciplinas", function (result) {
            var options = $(container + ' .spedisciplinacombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.disciplina));
            });
            if (__di > 0)
                $(container + ' .spedisciplinacombo').val(__di);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        $.getJSON(caminhoBase + "/SPE/Anos", function (result) {
            var options = $(container + ' .speanocombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.ano));
            });
            if (__an > 0)
                $(container + ' .speanocombo').val(__an);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        $.getJSON(caminhoBase + "/SPE/Volumes", function (result) {
            var options = $(container + ' .spevolumecombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.volume));
            });
            if (__vo > 0)
                $(container + ' .spevolumecombo').val(__vo);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        $.getJSON(caminhoBase + "/SPE/Unidades", function (result) {
            var options = $(container + ' .speunidadecombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.unidade));
            });
            if (__un > 0)
                $(container + ' .speunidadecombo').val(__un);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        $.getJSON(caminhoBase + "/SPE/Tipos", function (result) {
            var options = $(container + ' .spetipocombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.tipo));
            });
            if (__ti > 0)
                $(container + ' .spetipocombo').val(__ti);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        $.getJSON(caminhoBase + "/SPE/Ordem", function (result) {
            var options = $(container + ' .speordemcombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.ordem));
            });
            if (__ti > 0)
                $(container + ' .speordemcombo').val(__ti);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        $.getJSON(caminhoBase + "/SPE/Grupo", function (result) {
            var options = $(container + ' .spegrupocombo');
            $.each(result, function () {
                options.append($("<option />").val(this.id).text(this.grupo));
            });
            if (__ti > 0)
                $(container + ' .spegrupocombo').val(__ti);
            cls.get_count++;
            cls.limpa_load(cls.get_count);
        });
        if ($('#spe_idClassificacao').val() > 0 && $('#idQuestaoSalvar').val() != undefined) {
            spe_url = caminhoBase + "/SPE/ClassQuestao?idQuestao=" + $('#idQuestaoSalvar').val() + "&idClass=" + $('#spe_idClassificacao').val();
            $.getJSON(spe_url, function (result) {
                if (result) {
                    $(container + ' .specolecaocombo').val(result.colecao);
                    $(container + ' .speedicaocombo').val(result.edicao);
                    $(container + ' .spedisciplinacombo').val(result.disciplina);
                    $(container + ' .speanocombo').val(result.ano);
                    $(container + ' .spevolumecombo').val(result.volume);
                    $(container + ' .speunidadecombo').val(result.unidade);
                    $(container + ' .spetipocombo').val(result.tipo);
                    $(container + ' .speordemcombo').val(result.ordem);
                    $(container + ' .spegrupocombo').val(result.grupo);
                    __co = result.colecao;
                    __ed = result.edicao;
                    __di = result.disciplina;
                    __an = result.ano;
                    __vo = result.volume;
                    __un = result.unidade;
                    __ti = result.tipo;
                    __or = result.ordem;
                    __gp = result.grupo;
                }
                cls.get_count++;
                cls.limpa_load(cls.get_count);
                cls.speLoad = true;
            });
        }
    }

    this.EditarClassificacaoQuestao = function (idClassificacao) {
        $('#spe_idClassificacao').val(idClassificacao);
        $(cls.dialogoAdicionar).dialog('open');
    };

    this.carregarConteudoFiltroSPE = function () {
        if (cls.speLoad)
            return;
        this.SpeDialogInit(cls.dialogoListaFiltro);
    };
    this.ajusteFiltroSPE = function (callBack) {
        $('span.botaoFiltro[title="SPE"]').remove();

        var lstCampos = ['select.specolecaocombo', 'select.speedicaocombo', 'select.spedisciplinacombo', 'select.speanocombo', 'select.spevolumecombo', 'select.speunidadecombo', 'select.spetipocombo', 'select.speordemcombo', 'select.spegrupocombo'];
        var lstTitulo = ['Coleção', 'Edição', 'Disciplina', 'Ano', 'Volume', 'Unidade', 'Tipo', 'Ordem', 'Grupo']
        for (var i = 0; i < lstCampos.length; i++) {
            var idCampo = $(cls.dialogoListaFiltro + ' ' + lstCampos[i]).val();
            if (idCampo > 0) {
                var campo = lstTitulo[i] + "-" + $(cls.dialogoListaFiltro + ' ' + lstCampos[i] + ' > option[value="' + idCampo + '"]').text();
                var tag = $('<span class="botaoFiltro" title="' + campo + '"><span>' + campo + '</span><a class="botaoFechar" href="javascript:void(0)">x</a></span>');
                tag.append($('<input type="hidden" value="' + cls.dialogoListaFiltro + ' ' + lstCampos[i] + '" name="filtroCampoExtra" />'))
                tag.append($('<input type="hidden" value="' + idCampo + '" name="filtroValor" />'))
                $('span.areaBotoesFiltros').append(tag);
            }
        }

        //aplicar a ação para remover os campos extras
        $('input[name="filtroCampoExtra"]').each(function () {
            var campo = $(this).val();
            $(this).parent().find('a.botaoFechar').click(function () {
                $(campo).find('> option:first-child').attr('selected', 'selected');
                cls._filtroDialogoSPE(callBack);
            });
        });
    }

    this.limparFiltroSPE = function (callBack) {
        $('input[name="filtroCampoExtra"]').each(function () {
            var campo = $(this).val();
            $(campo).find('> option:first-child').attr('selected', 'selected');
            console.log("a");
            cls._filtroDialogoSPE();
        });

        if (callBack) {
            callBack();
        }
    }

    this.filtroDialogoSPE = function () {
        this._filtroDialogoSPE(function () {
            $(cls.dialogoListaFiltro).dialog('close');
        });

    }
    this._filtroDialogoSPE = function (callBack) {
        var colecao = $(cls.dialogoListaFiltro + ' .specolecaocombo').val();
        var edicao = $(cls.dialogoListaFiltro + ' .speedicaocombo').val();
        var disciplina = $(cls.dialogoListaFiltro + ' .spedisciplinacombo').val();
        var ano = $(cls.dialogoListaFiltro + ' .speanocombo').val();
        var volume = $(cls.dialogoListaFiltro + ' .spevolumecombo').val();
        var tipo = $(cls.dialogoListaFiltro + ' .spetipocombo').val();
        var unidade = $(cls.dialogoListaFiltro + ' .speunidadecombo').val();
        var ordem = $(cls.dialogoListaFiltro + ' .speordemcombo').val();
        var grupo = $(cls.dialogoListaFiltro + ' .spegrupocombo').val();
        var id = $(cls.dialogoListaFiltro + ' .idQuestaoSalvar').val();

        $.ajax({
            url: caminhoBase + '/SPE/IdClassificacao',
            dataType: 'json',
            type: 'POST',
            data: { id: id, colecao: colecao, edicao: edicao, disciplina: disciplina, ano: ano, volume: volume, unidade: unidade, tipo: tipo, ordem: ordem, grupo: grupo },
            success: function (result) {

                $(cls.dialogoListaFiltro + ' input[name="chkClassificacao_4"]').remove();

                if (result) {
                    var lstClass = eval(result);
                    if (lstClass.length > 0) {
                        for (var i = 0; i < lstClass.length; i++) {
                            $(cls.dialogoListaFiltro + ' form').append($('<input type="hidden" value="' + lstClass[i] + ';SPE' + '" name="chkClassificacao_4" />'))
                        }
                    }
                }

                if (callBack) {
                    callBack();
                }


            }
        });
    }

    this.executarFiltroSPE = function () {
        cls.filtroDialogoSPE();
    }

    this.fecharConteudoAdicionarSPE = function () {
        $('#spe_idClassificacao').val(0);
    }
    this.carregarConteudoAdicionarSPE = function (bReload) {
        this.SpeDialogInit(cls.dialogoAdicionar);
    }

    this.relacionarQuestaoSPE = function (link) {
        this._SalvarSPE()
    };

    this._SalvarSPE = function () {
        if ($(cls.dialogoAdicionar + ' .specolecaocombo').val() == 0 ||
            $(cls.dialogoAdicionar + ' .speedicaocombo').val() == 0 ||
            $(cls.dialogoAdicionar + ' .spedisciplinacombo').val() == 0 ||
            $(cls.dialogoAdicionar + ' .speanocombo').val() == 0 ||
            $(cls.dialogoAdicionar + ' .spevolumecombo').val() == 0 ||
            $(cls.dialogoAdicionar + ' .speunidadecombo').val() == 0 ||
            $(cls.dialogoAdicionar + ' .speordemcombo').val() == 0 ||
            $(cls.dialogoAdicionar + ' .spegrupocombo').val() == 0 ||
            $(cls.dialogoAdicionar + ' .spetipocombo').val() == 0) {
            alert('Todos os campos devem ser corretamente selecionados.');
            carregando.esconder();
            return;
        } else {
            var colecao = $(cls.dialogoAdicionar + ' .specolecaocombo').val();
            var edicao = $(cls.dialogoAdicionar + ' .speedicaocombo').val();
            var disciplina = $(cls.dialogoAdicionar + ' .spedisciplinacombo').val();
            var ano = $(cls.dialogoAdicionar + ' .speanocombo').val();
            var volume = $(cls.dialogoAdicionar + ' .spevolumecombo').val();
            var tipo = $(cls.dialogoAdicionar + ' .spetipocombo').val();
            var unidade = $(cls.dialogoAdicionar + ' .speunidadecombo').val();
            var ordem = $(cls.dialogoAdicionar + ' .speordemcombo').val();
            var grupo = $(cls.dialogoAdicionar + ' .spegrupocombo').val();
            var idQuestao = $('#idQuestaoSalvar').val();
            var idClass = $('#spe_idClassificacao').val();
            $.ajax({
                url: caminhoBase + '/SPE/Salvar',
                dataType: 'json',
                data: { idQuestao: idQuestao, idClass: idClass, colecao: colecao, edicao: edicao, disciplina: disciplina, ano: ano, volume: volume, unidade: unidade, tipo: tipo, ordem: ordem, grupo: grupo },
                success: function (result) {
                    if (retornoErro(result)) {
                        return;
                    }
                    $(cls.dialogoAdicionar).dialog('close');
                    if (cls.onAdicionou)
                        cls.onAdicionou();
                }
            });
        }
    }

    this.carregarConteudoBuscaSPE = function () {

        this.SpeDialogInit(cls.containerBuscaProva);
    };

    this.buscaProvaCheckedDefault = function () {

        if (this.getSelecionadosSPE().length > 0) {
            return true;
        }

        return false;
    };
    this.buscaProvaSelecionadasSPE = function () {

        var colecao = $(cls.containerBuscaProva + ' .specolecaocombo').val();
        var edicao = $(cls.containerBuscaProva + ' .speedicaocombo').val();
        var disciplina = $(cls.containerBuscaProva + ' .spedisciplinacombo').val();
        var ano = $(cls.containerBuscaProva + ' .speanocombo').val();
        var volume = $(cls.containerBuscaProva + ' .spevolumecombo').val();
        var tipo = $(cls.containerBuscaProva + ' .spetipocombo').val();
        var unidade = $(cls.containerBuscaProva + ' .speunidadecombo').val();
        var ordem = $(cls.containerBuscaProva + ' .speordemcombo').val();
        var grupo = $(cls.containerBuscaProva + ' .spegrupocombo').val();
        var id = 0;

        $.ajax({
            url: caminhoBase + '/SPE/IdClassificacao',
            dataType: 'json',
            type: 'POST',
            data: { id: id, colecao: colecao, edicao: edicao, disciplina: disciplina, ano: ano, volume: volume, unidade: unidade, tipo: tipo, ordem: ordem, grupo: grupo },
            success: function (result) {
                var idClassificacao = $(cls.containerBuscaProva + ' input[name="intTipoClassificacao"]').val();
                if (result) {
                    var lstClass = eval(result);
                    if (lstClass.length > 0) {
                        for (var i = 0; i < lstClass.length; i++) {
                            lstClass[i] = idClassificacao + '-' + lstClass[i];
                        }
                        cls.onBuscaSelecionada(lstClass.join(','));
                        return;
                    }
                }
                cls.onBuscaSelecionada('');


            }
        });


    }
    this.getSelecionadosSPE = function () {

        var retorno = [];
        var colecao = $(cls.containerBuscaProva + ' .specolecaocombo').val();
        var edicao = $(cls.containerBuscaProva + ' .speedicaocombo').val();
        var disciplina = $(cls.containerBuscaProva + ' .spedisciplinacombo').val();
        var ano = $(cls.containerBuscaProva + ' .speanocombo').val();
        var volume = $(cls.containerBuscaProva + ' .spevolumecombo').val();
        var tipo = $(cls.containerBuscaProva + ' .spetipocombo').val();
        var unidade = $(cls.containerBuscaProva + ' .speunidadecombo').val();
        var ordem = $(cls.containerBuscaProva + ' .speordemcombo').val();
        var grupo = $(cls.containerBuscaProva + ' .spegrupocombo').val();

        if (colecao && colecao != "" && parseInt(colecao, 10) != 0) retorno.push(4 + "-colecao:" + colecao);
        if (edicao && edicao != "" && parseInt(edicao, 10) != 0) retorno.push(4 + "-edicao:" + edicao);
        if (ano && ano != "" && parseInt(ano, 10) != 0) retorno.push(4 + "-ano:" + ano);
        if (disciplina && disciplina != "" && parseInt(disciplina, 10) != 0) retorno.push(4 + "-disciplina:" + disciplina);
        if (volume && volume != "" && parseInt(volume, 10) != 0) retorno.push(4 + "-volume:" + volume);
        if (tipo && tipo != "" && parseInt(tipo, 10) != 0) retorno.push(4 + "-tipo:" + tipo);
        if (unidade && unidade != "" && parseInt(unidade, 10) != 0) retorno.push(4 + "-unidade:" + unidade);
        if (ordem && ordem != "" && parseInt(ordem, 10) != 0) retorno.push(4 + "-ordem:" + ordem);
        if (grupo && grupo != "" && parseInt(grupo, 10) != 0) retorno.push(4 + "-grupo:" + grupo);

        return retorno.join(',');
    }
}