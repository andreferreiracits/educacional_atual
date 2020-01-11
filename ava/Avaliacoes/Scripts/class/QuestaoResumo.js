function QuestaoResumo(sTabela, sBtn, fRetorno) {

    var qr = this;
    this.sTabela = sTabela;
    this.sBtn = sBtn;
    
    this.fRetorno = fRetorno;

    this.init = function () {
        this.aplicarBotao();
    };



    this.aplicarBotao = function () {

        $(this.sBtn).click(function () {
            qr.acaoBotao($(this));
        }).addClass('close');
    };

    this.aplicarBotaoExtra = function (lnkExtra) {
        //, "a.tooltipextra"

        $(lnkExtra).click(function () {
            var linha = $(this).parent('td').parent('tr');
            linha.find(qr.sBtn).click();
        });
    };
    this.aplicarBotaoLinha = function (lnkLinha) {

        $(lnkLinha).click(function () {
            var linha = $(this);
            qr.acaoBotao(linha.find(qr.sBtn));
        });
        $(qr.sBtn).click(false);
    };

    this.acaoBotao = function (btn) {
        //verifico se já está aberto
        var bolOpen = true;
        if (btn.is('.open')) {
            bolOpen = false;
        }

        $("#linhaResumoQuestao, #linhaResumoQuestaoDivisao, #linhaResumoQuestaoDivisaoGrupo").remove();
        $(".celResumoQuestaoLeft, .celResumoQuestaoTop, .celResumoQuestaoRight, .celResumoQuestaoCheck, .linhaResumoQuestaoAnterior")
            .removeClass("celResumoQuestaoLeft")
            .removeClass("celResumoQuestaoTop")
            .removeClass("celResumoQuestaoRight")
            .removeClass("celResumoQuestaoCheck")
            .removeClass("linhaResumoQuestaoAnterior");

        //reaplica a classe da linha daquelas que foram tiradas
        $(qr.sTabela + ' tr[oldclass*="bordaAgrupamento"]').each(function () {
            $(this).addClass($(this).attr('oldclass'));
            $(this).attr('oldclass', '');
        });

        if (bolOpen) {
            $(qr.sTabela).find('a.open').removeClass('open').addClass('close');

            var bolGrupos = $(qr.sTabela).find('thead > tr > td.bordaGrupo').length >= 1;



            var linha = btn.parent('td').parent('tr');
            var intColSpan = qr.contarColunas(linha);
            var celLeft = 0;

            //verifica quantas colunas tem antes do botão
            $(linha).children().each(function (index) {
                if ($(this).find("a[rel='" + btn.attr('rel') + "']").length) {
                    celLeft = index;
                    return;
                }
            });

            //estilo para a td do grupo
            var classe = ($(linha.find('td')[0]).attr('class'))
            var style = $(linha.find('td')[0]).attr('style')
            var classLinha = $(linha).attr('class');

            //caso tenha botoes, jogar para uma linha abaixo com a linha de divisão

            var botoes = linha.find("div.botoes");

            if (botoes.length > 0) {
                if (bolGrupos) {
                    linha.removeClass(classLinha);
                    linha.attr('oldclass', classLinha);
                    linha.after('<tr id="linhaResumoQuestaoDivisao" class="' + classLinha + '"><td class="' + classe + '" style="' + style + '"></td><td colspan="' + (intColSpan - 1) + '"></td></tr>')
                } else {
                    linha.after('<tr id="linhaResumoQuestaoDivisao"><td colspan="' + (intColSpan) + '"></td></tr>')
                }
            } else {
                if (bolGrupos) {
                    linha.removeClass(classLinha);
                    linha.attr('oldclass', classLinha);
                    linha.after('<tr id="linhaResumoQuestaoDivisaoGrupo" class="' + classLinha + '" style="height: 5px !important;"><td class="' + classe + '" style="' + style + '"></td><td colspan="' + (intColSpan - 1) + '"></td></tr>')
                }
            }

            var linhaResumoQuestao = $("<tr id='linhaResumoQuestao'></tr>")

            for (var i = 0; i < celLeft; i++) {
                if (bolGrupos && i == 0) {

                    linhaResumoQuestao.append("<td class='" + classe + "' style='" + style + "'></td>");
                } else {
                    linhaResumoQuestao.append("<td class='celResumoQuestaoCheck'></td>");
                }
            }
            linhaResumoQuestao.append('<td id="celResumoQuestao" colspan="' + (intColSpan - celLeft) + '"><div></div></td>');
            linha.after(linhaResumoQuestao)

            //aplicar os estilos na linha do botão
            var cels = linha.find('td');
            for (var i = 0; i < celLeft; i++) {
                $(cels[i]).addClass('celResumoQuestaoCheck');
            }
            $(cels[celLeft]).addClass('celResumoQuestaoLeft');
            for (var i = celLeft + 1; i < cels.length - 1; i++) {
                $(cels[i]).addClass('celResumoQuestaoTop');
            }
            $(cels[cels.length - 1]).addClass('celResumoQuestaoRight');

            //aplicar o estilo para tirar a linha de baixo da linha anterior
            var linhas = $(qr.sTabela).find('tr');
            for (var i = 0; i < linhas.length; i++) {
                //alert($(this).attr("id"))
                if ($(linhas[i]).attr("id") == "linhaResumoQuestao") {
                    if (i - 2 >= 0) {
                        $(linhas[i - 2]).addClass('linhaResumoQuestaoAnterior');
                    }
                    break;
                }

            }

            $("<div class='resumoQuestaoWait'></div>").appendTo($("#linhaResumoQuestao div"));

            btn.removeClass('close').addClass('open');

            $.ajax({
                url: btn.attr('rel'),
                type: "GET",
                cache: false,
                success: function (dados, status, xhttp) {
                    if ($(dados).attr('class') && $(dados).attr('class').indexOf("erro") > -1) {
                        qr.fRetorno(dados);
                        return;
                    }

                    $("#linhaResumoQuestao div").html(dados);
                }
            });
        } else {
            btn.removeClass('open').addClass('close');
        }
    };

    this.closeOpen = function () {
        $(this.sBtn).each(function () {
            if ($(this).is('.open')) {
                $("#linhaResumoQuestao, #linhaResumoQuestaoDivisao").remove();
                $(".celResumoQuestaoLeft, .celResumoQuestaoTop, .celResumoQuestaoRight, .celResumoQuestaoCheck, .linhaResumoQuestaoAnterior")
                    .removeClass("celResumoQuestaoLeft")
                    .removeClass("celResumoQuestaoTop")
                    .removeClass("celResumoQuestaoRight")
                    .removeClass("celResumoQuestaoCheck")
                    .removeClass("linhaResumoQuestaoAnterior");

                $(this).removeClass('open').addClass('close'); 
            }
        })
    }

    this.contarColunas = function (linha) {
        var colunas = 0;
        $(linha).children().each(function (index) {
            var valorColSpan = $(this).attr('colspan');
            if (valorColSpan) {
                var valor = parseInt($(this).attr('colspan'), 10);
            } else {
                var valor = 1;
            }

            colunas += valor;
        });

        return colunas;
    }

    this.init();

    return this;
}