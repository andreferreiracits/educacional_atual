//adicicao dos metodos da associativa
TipoResposta.prototype.initAssociativa = function () {

    var tiporesposta = this;

    this.lista2 = tiporesposta.id + ' > ul';

    this.alternativas2 = [];

    this.cxaAdicionarAlternativaAssociativa = function () {
        $('#cxaAdicionarAlternativa').click(function () {
            tiporesposta.adicionarAlternativa();
        });
        $('#cxaAdicionarAlternativaDireita').click(function () {
            tiporesposta.adicionarAlternativaAssociativa();
        });
        this.carregaDragDrop();
    };

    this.adicionarAlternativaAssociativa = function (confirm) {
        if ($(".associativaEsquerda .itensResposta > li").length > 0) {
            var load2 = document.createElement("div");
            load2.className = "carregando";
            $('#cxaAdicionarAlternativaDireita').append($(load2));
            $('#cxaAdicionarAlternativaDireita .btnAdicione').hide()
            $.ajax({
                url: caminhoBase + '/Questoes/AdicionarAlternativa/',
                data: $(this.formPrincipal).serialize() + "&bolDireita=1" + (confirm ? "&bolConfirmTipo=1" : ""),
                type: "POST",
                success: function (dados, status, xhttp) {
                    tiporesposta.retornoAdicionarAlternativaAssociativa(dados);
                }
            });
        }
        else {
            var dados = mensagem.htmlTemplate("Avaliações", true, RecursosJS["msg002"], 'alerta');
            mensagem.exibir($(dados));
        };
    };

    this.removerAlternativaAssociativa = function (letra, confirm) {
        $.ajax({
            url: caminhoBase + '/Questoes/RemoverAlternativa/',
            data: $(this.formPrincipal).serialize() + "&bolDireita=1" + '&letraAlternativa=' + letra + (confirm ? "&bolConfirmTipo=1" : ""),
            type: "POST",
            success: function (dados, status, xhttp) {
                tiporesposta.retornoRemoverAlternativaDireita(letra, dados);
            }
        });
    };

    this.retornoRemoverAlternativaAssociativa = function (letra, dados) {
        var alternativa = this.getAlternativaPorLetra(letra);
        var id = alternativa.nome.split('_')[1];
        $(".itensRespostaDireita input[value='" + id + "']").val("0");
        tiporesposta.retornoRemoverAlternativaDefault(letra, dados);
    };

    this.retornoAdicionarAlternativaAssociativa = function (dados) {
        $('#cxaAdicionarAlternativaDireita .carregando').remove();
        $('#cxaAdicionarAlternativaDireita .btnAdicione').show();
        if (retornoErro(dados)) {
            $('#cxaAdicionarAlternativaDireita').hide();
            return;
        }
        if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
            confirm.exibir($(dados), this.confirmaAdicionarAlternativaAssociativa);
            return;
        }
        $(this.lista2).append($(dados));
        var mudaStatus = $(this.lista2).find(".atualizastatus");
        if (mudaStatus.length > 0) {
            $('#statusQuestao').html(mudaStatus.html());
            mudaStatus.remove();
        }
        var letra = (this.alternativas2.length == 0) ? 'a' : this.alternativas2[this.alternativas2.length - 1].letra;
        var letraCodigo = letra.charCodeAt(0) + 1;
        $(this.lista2 + ' > li:last').each(function () {
            var alternativa = new Alternativa(String.fromCharCode(letraCodigo), $(this).attr('id'), "alternativa", tiporesposta);
            tiporesposta.alternativas2.push(alternativa);
        });
        $(this.id).show();
        this.callTipo("atualizarAlternativas", false);
        //verificar se chegou no limite
        if ($("#MaximoAlternativas").val() && $("#MaximoAlternativas").val() == 1) {
            $('#cxaAdicionarAlternativaDireita').hide();
            var msg = $(this.lista2).find('#mensagem').parent("div");
            mensagem.exibir($(msg));
            $(msg).remove();
        }
        $("#MaximoAlternativas").remove();
    };

    this.confirmaAdicionarAlternativaAssociativa = function () {
        tiporesposta.adicionarAlternativaAssociativa(true);
    };

    this.retornoRemoverAlternativaDireita = function (letra, dados) {
        if (retornoErro(dados)) {
            return;
        }
        if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
            confirm.exibir($(dados), this.confirmaRemoverAlternativaAssociativa);
            return;
        }
        if ($(dados).find('#status').length > 0) {
            $('#statusQuestao').html($(dados).find('#status').html());
        }
        var alternativa = this.getAlternativaAssociativaPorLetra(letra);
        alternativa.remover();
        if ($(dados).find('#acao').text() == "notIsMaximo") {
            $('#cxaAdicionarAlternativaDireita').show();
        }
        var i = 0;
        for (i = 0; i < this.alternativas2.length; i++) {
            if (this.alternativas2[i].letra == letra) {
                this.alternativas2.splice(i--, 1);
            }
        }
        this.callTipo("atualizarAlternativas", true);
    };

    this.confirmaRemoverAlternativaAssociativa = function () {
        var letra = $("#statusAtualConfirm").val();
        tiporesposta.removerAlternativaAssociativa(letra, true);
    };

    this.selecionarAssociativa = function () {
        var letraCodigo = 'a'.charCodeAt(0);
        var iniContador = 1;
        var alternativa;
        alternativas = [];
        alternativas2 = [];
        this.lista = this.id + ' ul.itensResposta'
        //Especial para Associativa
        this.lista2 = this.id + ' ul.itensRespostaDireita'
        $(this.lista + ' > li').each(function () {
            alternativa = new Alternativa(String.fromCharCode(letraCodigo++), $(this).attr('id'), "alternativa", tiporesposta);
            tiporesposta.alternativas.push(alternativa);
        });
        letraCodigo = 'a'.charCodeAt(0);
        $(this.lista2 + ' > li').each(function () {
            alternativa = new Alternativa(String.fromCharCode(letraCodigo++), $(this).attr('id'), "alternativa", tiporesposta);
            tiporesposta.alternativas2.push(alternativa);
        });
        $(this.id).show();
    };

    this.carregaDragDrop = function () {
        this.carregaInputLetraAssociar();
        $(".opcaoLetra").draggable({ revert: true });
        $(".boxRecebeAssociado").droppable({
            accept: ".opcaoLetra",
            activeClass: "ui-state-hover",
            hoverClass: "ui-state-active",
            drop: function (event, ui) {
                $(this).find("input[name=idAssociado]").val(ui.draggable.attr("id"));
                $(this).find("input[name=ltAssociado]").val(ui.draggable.html().toUpperCase());
            }
        });
    };

    this.carregaInputLetraAssociar = function () {
        $("input[name=ltAssociado]").keypress(function (e) {
            if (e.which != 8 && (e.which < 65 || e.which > 122)) {
                return false;
            } else {
                $(this).parents(".boxRecebeAssociado").find("input[name=idAssociado]").val("0");
            }
        });
    };

    this.atualizarAlternativasAssociativa = function (bolDireita) {
        var i = 0;
        var letraCodigo = 'a'.charCodeAt(0);
        var alterna = this.alternativas;
        if (bolDireita) {
            alterna = this.alternativas2;
        }
        for (i = 0; i < alterna.length; i++) {
            alterna[i].trocarLetraAssociativa(String.fromCharCode(letraCodigo++));
        }
        this.carregaDragDrop();
    };

    this.getAlternativaAssociativaPorLetra = function (letra) {
        for (var i = 0; i < this.alternativas2.length; i++) {
            if (letra == this.alternativas2[i].letra) {
                return this.alternativas2[i];
            }
        }
    };
}

Alternativa.prototype.initAssociativa = function () {
    
    var alternativa = this;

    this.botoesAssociativa = function () {
        $(this.id + ' ul li.altResposta > input:checkbox').click(function () {
            alternativa.callTipo("selecionarCorreta", this);
        });
    };

    this.executarRemoverAssociativa = function () {
        this.pai.removerAlternativaAssociativa(this.letra);
    };

    this.botoesRemoverAssociativa = function () {
        var funcao = "javascript:void(0);";
        $(this.id + ' ul li.localBtnRemoverE a.btnRemover').attr('href', funcao).click(function () {
            alternativa.executarRemover();
        });
        $(this.id + ' ul li.localBtnRemoverD a.btnRemover').attr('href', funcao).click(function () {
            alternativa.executarRemoverAssociativa();
        });
    };
    
    this.trocarLetraAssociativa = function (sLetra) {
        this.letra = sLetra;
        $(this.id + ' div.opcaoLetra').html(this.letra);
    };

    this.formatacaoTineAlternativaAssociativa = function () {
        return $.extend({}, formatAlternativaQuestao, {
            theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,forecolor,backcolor",
            theme_advanced_buttons2: "styleselect,formatselect,cut,copy,paste,pastetext,pasteword",
            theme_advanced_buttons3: "outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,|,hr,|,sub,sup,|,charmap,|,image",
            theme_advanced_buttons4: "tablecontrols,|,banco_imagens, simulador, media",
            theme_advanced_buttons5: "fontselect, fontsizeselect"
        });
    };
};
