NovaClassificacao.prototype.initHabile = function () {
    var cls = this;

    this.habileLoad = false; //

    this.HabileDialogInit = function (container) {
        if ($('#idClassificacao').val() > 0)
            carregarClassificacao($('#idClassificacao').val());
        else
            carregarMatrizes();

        //Alterações para o filtro
        var __ma = -1;
        var __co = -1;
        var __ha = -1;
        var __ei = -1;
        var __pr = -1;
        var __se = -1;
        var __si = -1;


        $(container + ' .habilematrizfiltro').html('<option value="0">-selecione-</option>');
        $(container + ' .habilecompetenciafiltro').html('<option value="0">-selecione-</option>');
        $(container + ' .habilehabilidadefiltro').html('<option value="0">-selecione-</option>');
        $(container + ' .habileeixofiltro').html('<option value="0">-selecione-</option>');
        $(container + ' .habileprocecognitivofiltro').html('<option value="0">-selecione-</option>');
        $(container + ' .habileseriefiltro').html('<option value="0">-selecione-</option>');
        $(container + ' .habilesituacaousofiltro').html('<option value="0">-selecione-</option>');
        $.getJSON(caminhoBase + "/Habile/Matrizfiltro", function (result) {
            var options = $(container + ' .habilematrizfiltro');
            $.each(result, function () {
                options.append($("<option />").val(this.Id).text(this.Nome));
            });
            if (__ma > 0)
                $(container + ' .habilematrizfiltro').val(__ma);
        });
        $.getJSON(caminhoBase + "/Habile/Competenciafiltro", function (result) {
            var options = $(container + ' .habilecompetenciafiltro');
            $.each(result, function () {
                options.append($("<option />").val(this.Id).text(this.Nome));
            });
            if (__co > 0)
                $(container + ' .habilecompetenciafiltro').val(__co);
        });
        $.getJSON(caminhoBase + "/Habile/Habilidadefiltro", function (result) {
            var options = $(container + ' .habilehabilidadefiltro');
            $.each(result, function () {
                options.append($("<option />").val(this.Id).text(this.Codigo + ' - ' + this.Descricao));
            });
            if (__ha > 0)
                $(container + ' .habilehabilidadefiltro').val(__ha);
        });
        $.getJSON(caminhoBase + "/Habile/Eixofiltro", function (result) {
            var options = $(container + ' .habileeixofiltro');
            $.each(result, function () {
                options.append($("<option />").val(this.Id).text(this.Nome));
            });
            if (__ei > 0)
                $(container + ' .habileeixofiltro').val(__ei);
        });
        $.getJSON(caminhoBase + "/Habile/Processofiltro", function (result) {
            var options = $(container + ' .habileprocecognitivofiltro');
            $.each(result, function () {
                options.append($("<option />").val(this.Id).text(this.Nome));
            });
            if (__pr > 0)
                $(container + ' .habileprocecognitivofiltro').val(__pr);
        });
        $.getJSON(caminhoBase + "/Habile/Seriefiltro", function (result) {
            var options = $(container + ' .habileseriefiltro');
            $.each(result, function () {
                options.append($("<option />").val(this.Id).text(this.Nome));
            });
            if (__se > 0)
                $(container + ' .habileseriefiltro').val(__se);
        });
        $.getJSON(caminhoBase + "/Habile/Situacaofiltro", function (result) {
            var options = $(container + ' .habilesituacaousofiltro');
            $.each(result, function () {
                options.append($("<option />").val(this.Id).text(this.Nome));
            });
            if (__si > 0)
                $(container + ' .habilesituacaousofiltro').val(__si);
        });
        var habile_url = caminhoBase + '/Habile/ClassQuestao?id=0';
        if ($('#idQuestaoSalvar').val() != undefined)
            habile_url = caminhoBase + "/Habile/ClassQuestao?id=" + $('#idQuestaoSalvar').val();
        $.getJSON(habile_url, function (result) {
            if (result) {
                $(container + ' .habilematrizfiltro').val(result.matriz);
                $(container + ' .habilecompetenciafiltro').val(result.competencia);
                $(container + ' .habilehabilidadefiltro').val(result.habilidade);
                $(container + ' .habileeixofiltro').val(result.eixo);
                $(container + ' .habileprocecognitivofiltro').val(result.processo);
                $(container + ' .habileseriefiltro').val(result.serie);
                $(container + ' .habilesituacaousofiltro').val(result.situacao);
                __ma = result.matriz;
                __co = result.competencia;
                __ha = result.habilidade;
                __ei = result.eixo;
                __pr = result.processo;
                __se = result.serie;
                __si = result.situacao;
            }

            cls.habileLoad = true;
        });
        //


    }

    this.carregarConteudoAdicionarHabile = function (bReload) {
        this.HabileDialogInit(cls.dialogoAdicionar);
    }

    this.carregarConteudoFiltroHabile = function () {
        if (cls.habileLoad) //
            return; //
        this.HabileDialogInit(cls.dialogoListaFiltro);
    };

    //Alterações para o filtro
    this.ajusteFiltroHabile = function (callBack) {
        $('span.botaoFiltro[title="Habile"]').remove();

        var lstCampos = ['select.habilematrizfiltro', 'select.habilecompetenciafiltro', 'select.habilehabilidadefiltro', 'select.habileeixofiltro', 'select.habileprocecognitivofiltro', 'select.habileseriefiltro', 'select.habilesituacaousofiltro'];
        var lstTitulo = ['Matriz', 'Competência', 'Habilidade', 'Eixo', 'Processo Cognitivo', 'Série', 'Situação Uso']
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
                cls._filtroDialogoHabile(callBack);
            });
        });
    }

    this.limparFiltroHabile = function (callBack) {
        $('input[name="filtroCampoExtra"]').each(function () {
            var campo = $(this).val();
            $(campo).find('> option:first-child').attr('selected', 'selected');
            console.log("a");
            cls._filtroDialogoHabile();
        });

        if (callBack) {
            callBack();
        }
    }

    this.filtroDialogoHabile = function () {
        this._filtroDialogoHabile(function () {
            $(cls.dialogoListaFiltro).dialog('close');
        });

    }
    this._filtroDialogoHabile = function (callBack) {
        var matriz = $(cls.dialogoListaFiltro + ' .habilematrizfiltro').val();
        var competencia = $(cls.dialogoListaFiltro + ' .habilecompetenciafiltro').val();
        var habilidade = $(cls.dialogoListaFiltro + ' .habilehabilidadefiltro').val();
        var eixo = $(cls.dialogoListaFiltro + ' .habileeixofiltro').val();
        var processo = $(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro').val();
        var serie = $(cls.dialogoListaFiltro + ' .habileseriefiltro').val();
        var situacao = $(cls.dialogoListaFiltro + ' .habilesituacaousofiltro').val();
        var id = $(cls.dialogoListaFiltro + ' .idQuestaoSalvar').val();

        $.ajax({
            url: caminhoBase + '/Habile/IdClassificacao',
            dataType: 'json',
            type: 'POST',
            data: { id: id, matriz: matriz, competencia: competencia, habilidade: habilidade, eixo: eixo, processo: processo, serie: serie, situacao: situacao },
            success: function (result) {

                $(cls.dialogoListaFiltro + ' input[name="chkClassificacao_6"]').remove();

                if (result) {
                    var lstClass = eval(result);
                    if (lstClass.length > 0) {
                        for (var i = 0; i < lstClass.length; i++) {
                            $(cls.dialogoListaFiltro + ' form').append($('<input type="hidden" value="' + lstClass[i] + ';Habile' + '" name="chkClassificacao_6" />'))
                        }
                    }
                }

                if (callBack) {
                    callBack();
                }


            }
        });
    }

    this.executarFiltroHabile = function () {
        cls.filtroDialogoHabile();
    }

    this.carregarConteudoAdicionarHabile = function (bReload) {
        this.HabileDialogInit(cls.dialogoAdicionar);
    }
    //

    this.EditarClassificacaoQuestao = function (idClassificacao) {
        $('#idClassificacao').val(idClassificacao);
        $(cls.dialogoAdicionar).dialog('open');
    };
    //Function SelecionarMatriz
    this.selecionarMatriz = function () {
        limparCampo("competencias");
        $('#eixos').empty();
        $('#proce').empty();
        limparCampo("habilidades");
        limparCampo("series"); //Inserido para listar Series        
        $('#situacoesuso').empty();
        $('#habilidades').attr("disabled", true);
        $('#series').attr("disabled", true); //Inserido para listar Series
        $('#eixos').attr("disabled", true);
        //$('#especificacoes').val(''); //Especificacoes
        //$('#especificacoes').attr("disabled", true); //Especificacoes
        $('#comentarios').val(''); //Comentarios
        $('#conteudos').val(''); //Conteudos
        //$('#comentarios').attr("disabled", true); //Comentarios
        var idMatriz = $('#matrizes').val();
        var idQuestao = $('#idQuestaoSalvar').val();
        if (idMatriz == 0) {
            $('#competencias').attr("disabled", true);
        } else {
            consultarMatriz(idMatriz, idQuestao);
        }
    }
    //Function SelecionarCompetencia
    this.selecionarCompetencia = function () {

        limparCampo("habilidades");
        limparCampo("eixos"); //$('#eixos').empty();
        limparCampo("proce"); //$('#proce').empty();
        limparCampo("series"); //Inserido para listar Series
        //$('#especificacoes').val(''); //Especificacoes
        //$('#comentarios').val(''); //Comentarios

        var idCompetencia = $('#competencias').val();
        var idMatriz = $('#matrizes').val();

        if (idCompetencia == 0) {
            $('#habilidades').attr("disabled", true);
            $('#eixos').attr("disabled", true);
            $('#proce').attr("disabled", true);
            $('#series').attr("disabled", true); //Inserido para listar Series
            //$('#especificacoes').attr("disabled", true); //Especificacoes
            //$('#comentarios').attr("disabled", true); //Comentarios
        } else {
            //$('#habilidades').attr("disabled", false);
            $('#eixos').attr("disabled", false);
            carregarEixos(idMatriz); //
            carregarProcessosCognitivos(idMatriz); //
            //carregarHabilidades(idCompetencia);
        }
    }
    //Function SelecionarEixo
    this.selecionarEixo = function () {
        limparCampo("habilidades");
        limparCampo("series");
        $('#series').attr("disabled", true);
        var idEixo = $('#eixos').val();

        if (idEixo == 0) {
            $('#habilidades').attr("disabled", true);
        } else {
            $('#habilidades').attr("disabled", false);
            carregarHabilidades(idEixo);
        }
    }
    //Function SelecionarHabilidade
    this.selecionarHabilidade = function () {

        limparCampo("series"); //Inserido para listar Series
        //$('#especificacoes').val(''); //Especificacoes
        //$('#comentarios').val(''); //Comentarios

        //$('#eixos').empty();
        //$('#proce').empty();

        var idHabilidade = $('#habilidades').val();

        if (idHabilidade != 0) {
            //carregarEixos(idHabilidade);
            //carregarProcessosCognitivos(idHabilidade);
            $('#series').attr("disabled", false); //Inserido para listar Series.
            carregarSeries(idHabilidade); //Inserido para listar Series
        } else {
            $('#series').attr("disabled", true); //Inserido para listar Series
            //$('#especificacoes').attr("disabled", true); //Especificacoes
            //$('#comentarios').attr("disabled", true); //Comentarios
        }
    }
    //Function SelecionarSerie    
    this.selecionarSerie = function () {
        //$('#especificacoes').val(''); //Especificacoes
        //$('#comentarios').val(''); //Comentarios

        var idSerie = $('#series').val();

        if (idSerie != 0) {
            //$('#especificacoes').attr("disabled", false); //Especificacoes
            //$('#comentarios').attr("disabled", false); //Comentarios
        } else {
            //$('#especificacoes').attr("disabled", true); //Especificacoes
            //$('#comentarios').attr("disabled", true); //Comentarios
        }
    }

    //Filtro
    //Function SelecionarMatrizFiltro e popula combo Competencia
    this.selecionarMatrizFiltro = function () {
        //Limpa os campos
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habilecompetenciafiltro');
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habilehabilidadefiltro');
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habileeixofiltro');
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro');
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habilesituacaousofiltro');
        //Desabilita os Campos
        $(cls.dialogoListaFiltro + ' .habilehabilidadefiltro').attr("disabled", true);
        $(cls.dialogoListaFiltro + ' .habileeixofiltro').attr("disabled", true);
        $(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro').attr("disabled", true);
        //Popula a combo
        var idMatriz = $(cls.dialogoListaFiltro + ' .habilematrizfiltro').val();
        if (idMatriz == 0) {
            $(cls.dialogoListaFiltro + ' .habilecompetenciafiltro').attr("disabled", true);
            $(cls.dialogoListaFiltro + ' .habilesituacaousofiltro').attr("disabled", true);
        } else {
            $(cls.dialogoListaFiltro + ' .habilecompetenciafiltro').attr("disabled", false);
            $.getJSON(caminhoBase + "/Habile/Competenciafiltro", { id: idMatriz }, function (result) {
                var options = $(cls.dialogoListaFiltro + ' .habilecompetenciafiltro');
                $.each(result, function () {
                    options.append($("<option />").val(this.Id).text(this.Nome));
                });
            });
            $(cls.dialogoListaFiltro + ' .habilesituacaousofiltro').attr("disabled", false);
            $.getJSON(caminhoBase + "/Habile/Situacaofiltro", { id: idMatriz }, function (result) {
                var options = $(cls.dialogoListaFiltro + ' .habilesituacaousofiltro');
                $.each(result, function () {
                    options.append($("<option />").val(this.Id).val(this.Id).text(this.Nome));
                });
            });
        }
    }
    //Function SelecionarCompetenciaFiltro e popula combo Habilidade
    this.selecionarCompetenciaFiltro = function () {
        //Limpa os campos
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habilehabilidadefiltro');
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habileeixofiltro');
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro');
        //Desabilita os Campos
        $(cls.dialogoListaFiltro + ' .habileeixofiltro').attr("disabled", true);
        $(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro').attr("disabled", true);
        //Popula a combo
        var idCompetencia = $(cls.dialogoListaFiltro + ' .habilecompetenciafiltro').val();
        if (idCompetencia == 0) {
            $(cls.dialogoListaFiltro + ' .habilehabilidadefiltro').attr("disabled", true);
        } else {
            $(cls.dialogoListaFiltro + ' .habilehabilidadefiltro').attr("disabled", false);
            $.getJSON(caminhoBase + "/Habile/Habilidadefiltro", { id: idCompetencia }, function (result) {
                var options = $(cls.dialogoListaFiltro + ' .habilehabilidadefiltro');
                $.each(result, function () {
                    options.append($("<option />").val(this.Id).text(this.Codigo + ' - ' + this.Descricao));
                });
            });
        }
    }
    //Function SelecionarHabilidadeFiltro e popula combo Eixo
    this.selecionarHabilidadeFiltro = function () {
        //Limpa os campos
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habileeixofiltro');
        limparCampoFiltro(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro');
        //Popula a combo
        var idHabilidade = $(cls.dialogoListaFiltro + ' .habilehabilidadefiltro').val();
        if (idHabilidade == 0) {
            $(cls.dialogoListaFiltro + ' .habileeixofiltro').attr("disabled", true);
            $(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro').attr("disabled", true);
        } else {
            $(cls.dialogoListaFiltro + ' .habileeixofiltro').attr("disabled", false);
            $.getJSON(caminhoBase + "/Habile/Eixofiltro", { id: idHabilidade }, function (result) {
                var options = $(cls.dialogoListaFiltro + ' .habileeixofiltro');
                $.each(result, function () {
                    options.append($("<option />").val(this.Id).val(this.Id).text(this.Nome));
                });
            });
            $(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro').attr("disabled", false);
            $.getJSON(caminhoBase + "/Habile/Processofiltro", { id: idHabilidade }, function (result) {
                var options = $(cls.dialogoListaFiltro + ' .habileprocecognitivofiltro');
                $.each(result, function () {
                    options.append($("<option />").val(this.Id).val(this.Id).text(this.Nome));
                });
            });
        }
    }


    this.carregarConteudoBuscaHabile = function () {

        this.HabileDialogInit(cls.containerBuscaProva);
    };

    this.buscaProvaCheckedDefault = function () {

        if (this.getSelecionadosHabile().length > 0) {
            return true;
        }

        return false;
    };

    this.buscaProvaSelecionadasHabile = function () {

        var matriz = $(cls.containerBuscaProva + ' .habilematrizfiltro').val();
        var competencia = $(cls.containerBuscaProva + ' .habilecompetenciafiltro').val();
        var habilidade = $(cls.containerBuscaProva + ' .habilehabilidadefiltro').val();
        var eixo = $(cls.containerBuscaProva + ' .habileeixofiltro').val();
        var processo = $(cls.containerBuscaProva + ' .habileprocecognitivofiltro').val();
        var serie = $(cls.containerBuscaProva + ' .habileseriefiltro').val();
        var situacao = $(cls.containerBuscaProva + ' .habilesituacaousofiltro').val();
        var id = 0;

        $.ajax({
            url: caminhoBase + '/Habile/IdClassificacao',
            dataType: 'json',
            type: 'POST',
            data: { id: id, matriz: matriz, competencia: competencia, habilidade: habilidade, eixo: eixo, processo: processo, serie: serie, situacao: situacao },
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

    this.getSelecionadosHabile = function () {

        var retorno = [];
        var matriz = $(cls.containerBuscaProva + ' .habilematrizfiltro').val();
        var competencia = $(cls.containerBuscaProva + ' .habilecompetenciafiltro').val();
        var habilidade = $(cls.containerBuscaProva + ' .habilehabilidadefiltro').val();
        var eixo = $(cls.containerBuscaProva + ' .habileeixofiltro').val();
        var processo = $(cls.containerBuscaProva + ' .habileprocecognitivofiltro').val();
        var serie = $(cls.containerBuscaProva + ' .habileseriefiltro').val();
        var situacao = $(cls.containerBuscaProva + ' .habilesituacaousofiltro').val();

        if (matriz && matriz != "" && parseInt(matriz, 10) != 0) retorno.push(4 + "-matriz:" + matriz);
        if (competencia && competencia != "" && parseInt(competencia, 10) != 0) retorno.push(4 + "-competencia:" + competencia);
        if (habilidade && habilidade != "" && parseInt(habilidade, 10) != 0) retorno.push(4 + "-habilidade:" + habilidade);
        if (eixo && eixo != "" && parseInt(eixo, 10) != 0) retorno.push(4 + "-eixo:" + eixo);
        if (processo && processo != "" && parseInt(processo, 10) != 0) retorno.push(4 + "-processo:" + processo);
        if (serie && serie != "" && parseInt(serie, 10) != 0) retorno.push(4 + "-serie:" + serie);
        if (situacao && situacao != "" && parseInt(situacao, 10) != 0) retorno.push(4 + "-situacao:" + situacao);

        return retorno.join(',');
    }
    //

    function consultarMatriz(idMatriz, idQuestao) {
        carregando.mostrar();
        $.getJSON(caminhoBase + '/Habile/Consultar', { idMatriz: idMatriz, idQuestao: idQuestao }, jaFoiUtilizada);
    }
    function jaFoiUtilizada(result) {
        carregando.esconder();
        if (result) {
            alert('Esta Matriz está sendo utilizada.\nVocê poderá editá-la.');
            limparCampo('matrizes');
            carregarClassificacao(result.idClassificacao);
        } else {
            $('#competencias').attr("disabled", false);
            $('#habilidades').attr("disabled", true);
            carregarCompetencias($('#matrizes').val());
            carregarSituacoesUso($('#matrizes').val());
        }
    }

    function carregarClassificacao(idClassificacao) {
        $.getJSON(
            caminhoBase + '/Habile/CarregarClassificacao', { idClassificacao: idClassificacao },
            function (result) {
                carregarMatrizes(result.matriz);
                carregarSituacoesUso(result.matriz, result.sitUso);
                carregarCompetencias(result.matriz, result.competencia);
                carregarHabilidades(result.eixo, result.habilidade); //carregarHabilidades(result.competencia, result.habilidade);
                carregarEixos(result.matriz, result.eixo);  //carregarEixos(result.habilidade);
                carregarProcessosCognitivos(result.matriz); //carregarProcessosCognitivos(result.habilidade);
                carregarSeries(result.habilidade, result.serie); //Inserido para listar Series
                carregarEspecificacoes(result.classific);
                carregarComentarios(result.classific);
                carregarConteudos(result.classific);
                $('#competencias').attr("disabled", false);
                $('#habilidades').attr("disabled", false);
                $('#series').attr("disabled", false); //Inserido para listar Series
                $('#especificacoes').attr("disabled", false); //Especificacoes
                $('#comentarios').attr("disabled", false); //Comentarios
                $('#conteudos').attr("disabled", false);
                $('#eixos').attr("disabled", false); //Eixos
            });
    }
    function carregarMatrizes(idSelecionado) {
        $.getJSON(
            caminhoBase + '/Habile/ListarMatrizes',
            function (result) {
                var select = $('#matrizes');
                $.each(result, function () {
                    if (this.Id == idSelecionado)
                        select.append($("<option selected='selected'/>").val(this.Id).text(this.Nome));
                    else
                        select.append($("<option />").val(this.Id).text(this.Nome));
                });
            });
    }
    function carregarCompetencias(idMatriz, idSelecionado) {
        $.getJSON(
            caminhoBase + '/Habile/ListarCompetencias', { id: idMatriz },
            function (result) {
                var options = $('#competencias');
                $.each(result, function () {
                    if (this.Id == idSelecionado) {
                        options.append($("<option selected='selected' />").val(this.Id).text(this.Nome));
                    } else {
                        options.append($("<option />").val(this.Id).text(this.Nome));
                    }
                });
            });
    }
    function carregarSituacoesUso(idMatriz, sitUso) {
        $.getJSON(
            caminhoBase + '/Habile/ListarSituacoesUso', { id: idMatriz },
            function (result) {
                var situacoesuso = $('#situacoesuso');
                $.each(result, function () {
                    var check = null;
                    if ($.inArray(this.Id, sitUso) < 0) {
                        check = "<p><input type='checkbox' id='su_" + this.Id + "' name='situso' value='" + this.Id + "'/>&nbsp&nbsp<label for='su_" + this.Id + "'>" + this.Nome + "</label></p>";
                    } else {
                        check = "<p><input type='checkbox' checked='checked' id='su_" + this.Id + "' name='situso' value='" + this.Id + "'/>&nbsp&nbsp<label for='su_" + this.Id + "'>" + this.Nome + "</label></p>";
                    }
                    $(check).appendTo('#situacoesuso');
                });
            });
    }
    function carregarHabilidades(idEixo, idSelecionado) {
        $.getJSON(
            caminhoBase + '/Habile/ListarHabilidades', { id: idEixo },
            function (result) {
                var options = $('#habilidades');
                $.each(result, function () {
                    if (this.Id == idSelecionado) {
                        options.append($("<option selected='selected' />").val(this.Id).text(this.Codigo + ' - ' + this.Descricao));
                    } else {
                        options.append($("<option />").val(this.Id).text(this.Codigo + ' - ' + this.Descricao));
                    }
                });
            });
    }
    /*function carregarEixos(idHabilidade) {
    $.getJSON(
    caminhoBase + '/Habile/ListarEixos', { id: idHabilidade },
    function (result) {
    $.each(result, function () {
    var eixo = "<p>" + this.Nome + "</p>";
    $(eixo).appendTo('#eixos');
    });
    });
    }*/
    function carregarEixos(idMatriz, idSelecionado) {
        $.getJSON(
            caminhoBase + '/Habile/ListarEixos', { id: idMatriz },
            function (result) {
                var options = $('#eixos');
                $.each(result, function () {
                    if (this.Id == idSelecionado) {
                        options.append($("<option selected='selected' />").val(this.Id).text(this.Nome));
                    } else {
                        options.append($("<option />").val(this.Id).text(this.Nome));
                    }
                });
            });
    }
    function carregarProcessosCognitivos(idMatriz) {
        $.getJSON(
            caminhoBase + '/Habile/ListarProcessosCognitivos', { id: idMatriz },
            function (result) {
                $('#proce').empty();
                $.each(result, function () {
                    var proc = "<p>" + this.Nome + "</p>";
                    $(proc).appendTo('#proce');
                });
            });
    }
    //Function CarregarSeries
    function carregarSeries(idHabilidade, idSelecionado) {
        $.getJSON(
            caminhoBase + '/Habile/ListarSeriesPorHabilidade', { id: idHabilidade },
            function (result) {
                var options = $('#series');
                $.each(result, function () {
                    if (this.Id == idSelecionado) {
                        options.append($("<option selected='selected' />").val(this.Id).text(this.Nome));
                    } else {
                        options.append($("<option />").val(this.Id).text(this.Nome));
                    }
                });
            });
    }
    //Function CarregarEspecificacoes
    function carregarEspecificacoes(idClassificacao) {
        $.getJSON(
            caminhoBase + '/Habile/ListarEspecificacoes', { id: idClassificacao },
            function (result) {
                $.each(result, function () {
                    var especificacao = this.Especificacao;
                    $('#especificacoes').val(especificacao);
                });
            });
    }
    //Function CarregarComentarios
    function carregarComentarios(idClassificacao) {
        $.getJSON(
            caminhoBase + '/Habile/ListarComentarios', { id: idClassificacao },
            function (result) {
                $.each(result, function () {
                    var comentario = this.Comentario;
                    $('#comentarios').val(comentario);
                });
            });
    }
    //Function CarregarConteudos
    function carregarConteudos(idClassificacao) {
        $.getJSON(
            caminhoBase + '/Habile/ListarConteudos', { id: idClassificacao },
            function (result) {
                $.each(result, function () {
                    var conteudo = this.Conteudo;
                    $('#conteudos').val(conteudo);
                });
            });
    }
    function limparCampo(nomeCampo) {
        $('#' + nomeCampo).empty();
        $('#' + nomeCampo).append($('<option />').val('0').text('-selecione-'));
    }
    function limparCampoFiltro(nomeCampo) {
        $(nomeCampo).empty();
        $(nomeCampo).append($('<option />').val('0').text('-selecione-'));
    }

    this.relacionarQuestaoHabile = function (link) {
        this._SalvarHabile();
    };
    this._SalvarHabile = function () {

        var idMatriz = $('#matrizes').val();
        var idCompetencia = $('#competencias').val();
        var idEixo = $('#eixos').val();
        var idHabilidade = $('#habilidades').val();
        var idsSituacoesUso = new Array();
        var idSerie = $('#series').val();
        var especificacao = $('#especificacoes').val();
        var comentario = $('#comentarios').val();
        var conteudo = $('#conteudos').val();

        var checks = document.getElementsByName('situso');

        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                idsSituacoesUso.push(checks[i].value);
            }
        }

        //if (idMatriz == 0 || idCompetencia == 0 || idHabilidade == 0 || idsSituacoesUso.length == 0 || idSerie == 0 || especificacao.length == 0 || comentario.length == 0) {
        //    alert('Todos os campos devem ser corretamente preenchidos.');
        //    carregando.esconder();
        //    return;
        if (idMatriz == 0) {
            alert('Uma matriz deve ser selecionada');
            carregando.esconder();
            return;
        } else if (idCompetencia == 0) {
            alert('Uma competência deve ser selecionada');
            carregando.esconder();
            return;
        } else if (idEixo == 0) {
            alert('Um eixo deve ser selecionado');
            carregando.esconder();
            return;
        } else if (idHabilidade == 0) {
            alert('Uma habilidade deve ser selecionada');
            carregando.esconder();
            return;
        } else if (idsSituacoesUso.length == 0) {
            alert('Uma situação de uso deve ser selecionada');
            carregando.esconder();
            return;
        } else if (idSerie == 0) {
            alert('Uma série deve ser selecionada');
            carregando.esconder();
            return;
        } else if (especificacao.length == 0) {
            alert('O campo Especificação deve ser preenchido');
            carregando.esconder();
            return;
        } else if (comentario.length == 0) {
            //alert('O campo Análise deve ser preenchido');
            alert('O campo Comentário deve ser preenchido');
            carregando.esconder();
            return;
        } else if (conteudo.length == 0) {
            alert('O campo Conteúdo deve ser preenchido');
            carregando.esconder();
            return
        }

        else {
            var idQuestao = $('#idQuestaoSalvar').val();
            $.ajax({
                url: caminhoBase + '/Habile/Salvar',
                dataType: 'json',
                type: 'POST',
                traditional: true,
                data: { idQuestao: idQuestao, idMatriz: idMatriz, idHabilidade: idHabilidade, situacoesUso: JSON.stringify(idsSituacoesUso), idSerie: idSerie, especificacao: especificacao, comentario: comentario, conteudo: conteudo },
                success: function (result) {
                    if (retornoErro(result)) {
                        return;
                    }
                    $(cls.dialogoAdicionar).dialog('close');
                    if (cls.onAdicionou)
                        cls.onAdicionou();
                }
            });
            //Teste recarregar página
            $.ajax({
                url: caminhoBase + '/Questoes/ClassificacaoQuestao/',
                data: $('#frmQuestao').serialize(),
                type: "POST",
                success: function (dados, status, xhttp) { retornoClassificacaoQuestao(dados); }
            });
        }
    };

}