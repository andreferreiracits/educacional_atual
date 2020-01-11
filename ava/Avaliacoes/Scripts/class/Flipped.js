function Flipped() {
    var flp = this;
    this.tipoAtivo = 1;
    this.ocultarNomes = false;

    this.init = function () {
        //btnTipos
        $("#frmRelatorioFlipped .btnTipos").hide();
        $("#frmRelatorioFlipped #btnListaAlunos").click(function () {
            flp.tipoAtivo = 1;
            flp._carregar();

        });
        $("#frmRelatorioFlipped #btnListaDuvidas").click(function () {
            flp.tipoAtivo = 2;
            flp._carregar();

        });

        $("#frmRelatorioFlipped .relatorioConteudo").html('');

        //$('#frmRelatorioFlipped  #slcGrupoFlipped').selectcombo();
        $('#frmRelatorioFlipped #slcGrupoFlipped').change(function () {
            $('#frmRelatorioFlipped .relatorioSuperior .rlCabDireita').append($('#frmRelatorioFlipped #comboGrupos'))
            flp._carregar();
        });


        $(window).resize(function () {
            //flp.ajustarDimensao()
            //alert("resize");
            $('td.TabelaConteudo div.interno').hide();
            setTimeout(flp.ajustarDimensao, 100);
        });

        if ($('#frmRelatorioFlipped #slcGrupoFlipped').val() > -1) {
            $('#frmRelatorioFlipped #comboGrupos').hide();
            flp.tipoAtivo = 1;
            flp._carregar();
        }
    }


    this._carregar = function () {
        var idAplicacao = $("#frmRelatorioFlipped input[name='idAplicacao']").val();
        var idGrupo = $("#frmRelatorioFlipped .relatorioSuperior #slcGrupoFlipped").val();
        //alert("carregar o relatorio da turma " + idAplicacao + " - " + idTurma);
        flp.Carregar(idAplicacao, idGrupo);
    };

    this.Carregar = function (idAplicacao, idGrupo) {

        carregando.mostrar();
        $("#frmRelatorioFlipped .btnTipos").show();

        var url = caminhoBase + '/FlippedLearning/AlunoVsQuestao/' + idAplicacao + "/" + idGrupo
        if (flp.tipoAtivo == 2) {
            url = caminhoBase + '/FlippedLearning/QuestaoVsDuvida/' + idAplicacao + "/" + idGrupo
            //return;
            $("#frmRelatorioFlipped #btnListaDuvidas").addClass("ativo");
            $("#frmRelatorioFlipped #btnListaAlunos").removeClass("ativo");
        } else {
            $("#frmRelatorioFlipped #btnListaDuvidas").removeClass("ativo");
            $("#frmRelatorioFlipped #btnListaAlunos").addClass("ativo");
        }


        $.ajax({
            url: url,
            cache: false,
            success: function (dados, status, xhttp) {
                carregando.esconder();
                if (retornoErro(dados)) {
                    return;
                }

                $("#frmRelatorioFlipped .relatorioConteudo").html(dados);

                var totalDuvidas = $("#frmRelatorioFlipped .relatorioConteudo").find("#TotalDuvidasTurma").val();
                $('#LabelTotalDuvidas').text('');
                $('#LabelTotalDuvidas').hide();
                if (totalDuvidas > 0) {
                    $('#LabelTotalDuvidas').show();
                    $('#LabelTotalDuvidas').text(totalDuvidas);
                }
                $("#frmRelatorioFlipped .relatorioConteudo").find("#TotalDuvidasTurma").remove();
                if (flp.tipoAtivo == 2) {
                    new QuestaoResumo('#frmRelatorioFlipped table.QuestoesDuvidas', "a.tooltip", retornoErro).aplicarBotaoLinha("tr.tooltipextra"); ;
                    //ocultar os nomes
                    flp.aplicarAcaoOcultarNomes();


                } else if (flp.tipoAtivo == 1) {
                    $('td.TabelaConteudo div.interno').hide();
                    //aplica a acao
                    $('#scrollright').click(function () {
                        $('#TabelaConteudo').parent().get(0).scrollLeft += 25;
                    });
                    $('#scrolleft').click(function () {
                        $('#TabelaConteudo').parent().get(0).scrollLeft -= 25;
                    });

                    setTimeout(flp.ajustarDimensao, 100);
                }

            }
        });
    };
    this.aplicarAcaoOcultarNomes = function () {
        $('#btnMostrarNome').click(function () {
            flp.ocultarNomes = false;
            flp.executarAcaoOcultarNomes()
        });
        $('#btnOcultarNome').click(function () {
            flp.ocultarNomes = true;
            flp.executarAcaoOcultarNomes()
        });


        flp.executarAcaoOcultarNomes();
    }
    this.executarAcaoOcultarNomes = function () {

        if (flp.ocultarNomes) {
            $('#btnMostrarNome').show();
            $('#btnOcultarNome').hide();
            $("#frmRelatorioFlipped .relatorioConteudo table.QuestoesDuvidas").addClass("QuestoesDuvidasOcultar");
        } else {
            $('#btnMostrarNome').hide();
            $('#btnOcultarNome').show();
            $("#frmRelatorioFlipped .relatorioConteudo table.QuestoesDuvidas").removeClass("QuestoesDuvidasOcultar");
        }
    }
    this.ajustarDimensao = function () {
        //alert($('td.TabelaConteudo').width())
        //alert($('td.TabelaConteudo').width() + " - " + $('td.TabelaConteudo').height())
        $('td.TabelaConteudo div.interno').width($('td.TabelaConteudo').width())
        $('td.TabelaConteudo div.interno').height($('td.TabelaConteudo').height())
        $('td.TabelaConteudo div.interno').show();
        $('#scrolleft').hide();
        $('#scrollright').hide();

        if ($('#tblAlunoQuestao').length > 0) {
            $('#scrollright').css("left", $('#tblAlunoQuestao').width() + $('#tblAlunoQuestao').offset().left);
        }

        if ($('td.TabelaConteudo div').width() < $('#TabelaConteudo').width()) {
            $('#scrolleft').show();
            $('#scrollright').show();
        }

        //scroll
        //
    };
    this.questaoRealizada = function (idProvaRealizada, posQuestao) {
        carregando.mostrar();
        $.ajax({
            url: caminhoBase + '/FlippedLearning/ViewQuestaoRealizada/' + idProvaRealizada + "/" + posQuestao,
            cache: false,
            success: function (dados, status, xhttp) {
                $('#dlgRelatorioFlipped').remove();
                carregando.esconder();
                if (retornoErro(dados)) {
                    return;
                }
                $('body').append($(dados));

                $('#dlgRelatorioFlipped').dialog({ dialogClass: 'SEC025_DIALOG',
                    autoOpen: true, modal: true,
                    width: 785, minHeight: 500,
                    position: ['center', 'top'],
                    draggable: false, resizable: false
                });
            }
        });
    };

    this.provaRealizada = function (idProvaRealizada) {
        carregando.mostrar();
        $.ajax({
            url: caminhoBase + '/FlippedLearning/DadosRealizacao/' + idProvaRealizada,
            cache: false,
            success: function (dados, status, xhttp) {
                $('#dlgRelatorioFlippedProva').remove();
                carregando.esconder();
                if (retornoErro(dados)) {
                    return;
                }
                $('body').append($(dados));

                $('#dlgRelatorioFlippedProva').dialog({ dialogClass: 'SEC025_DIALOG',
                    autoOpen: true, modal: true,
                    width: 600, height: 250,
                    position: ['center', 'center'],
                    draggable: false, resizable: false
                });
            }
        });
    };

    this.init();
}

