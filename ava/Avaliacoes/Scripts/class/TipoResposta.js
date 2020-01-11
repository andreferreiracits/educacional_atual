function TipoResposta(sId, sIdTipo, sCaminhoAdicionar, sCaminhoRemover, formPrincipal) {
    
    var tiporesposta = this;

    this.id = '#' + sId;
    this.tipo = sIdTipo;
    this.lista = this.id + ' > ul';
    this.tipoAtual = 0;
    this.alternativas = [];
    this.formPrincipal = formPrincipal;
    this.caminhoAdicionar = sCaminhoAdicionar;
    this.caminhoRemover = sCaminhoRemover;
    this.lstTipos = lstTipoResposta;

    this.init = function () {
        this.tipoAtual = $("#" + this.tipo).val();
        if (this.tipoAtual >= this.lstTipos.length) {
            throw 'O tipo de resposta não está setado na lista de tipos.';
            return;
        }
        this.callTipo("init");
        this.callTipo("cxaAdicionarAlternativa");
        this.callTipo("selecionar");
    };

    this.callTipo = function (func) {
        var funcDefault = func + this.lstTipos[0];
        func = func + this.lstTipos[this.tipoAtual];
        var args = [];
        // copy all other arguments we want to "pass through"
        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        if (this[func]) {
            return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return this[funcDefault].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };
    
    this.initDefault = function () {
        // ...
    };

    this.cxaAdicionarAlternativaDefault = function () {
        $('#cxaAdicionarAlternativa').click(function () {
            tiporesposta.adicionarAlternativa();
        });
    };

    this.selecionarDefault = function () {
        var letraCodigo = 'a'.charCodeAt(0);
        alternativas = [];
        $(this.lista + ' > li').each(function () {
            tiporesposta.alternativas.push(new Alternativa(String.fromCharCode(letraCodigo++), $(this).attr('id'), "alternativa", tiporesposta));
        });
        $(this.id).show();
    };

    this.tratarEnunciado = function () {
        this.callTipo("tratarEnunciado");
    };

    this.tratarEnunciadoDefault = function () {
        // ...
    };

    this.formatacaoTineEnunciado = function () {
        return this.callTipo("formatacaoTineEnunciado");
    };
    
    this.formatacaoTineEnunciadoDefault = function () {
        return formatEnunciadoQuestao;
    };
    
    this.adicionarAlternativa = function (confirm) {
        var load = document.createElement("div");
        load.className = "carregando";
        $('#cxaAdicionarAlternativa').append($(load));
        $('#cxaAdicionarAlternativa .btnAdicione').hide();
        $.ajax({
            url: this.caminhoAdicionar,
            data: $(this.formPrincipal).serialize() + (confirm ? "&bolConfirmTipo=1" : ""),
            type: "POST",
            success: function(dados, status, xhttp) {
                tiporesposta.retornoAdicionarAlternativa(dados);
            }
        });
    };

    this.removerAlternativa = function (letra, confirm) {
        $.ajax({
            url: this.caminhoRemover,
            data: $(this.formPrincipal).serialize() + '&letraAlternativa=' + letra + (confirm ? "&bolConfirmTipo=1" : ""),
            type: "POST",
            success: function (dados, status, xhttp) {
                tiporesposta.retornoRemoverAlternativa(letra, dados);
                //tiporesposta.callTipo("retornoRemoverAlternativa", letra, dados);
            }
        });
    };
    
    this.mostrarEmbaralhamento = function(mostrar) {
        var embaralhar = $('#linhaEmbaralhamento');
        if (mostrar) {
            embaralhar.removeClass('hide');
        } else {
            embaralhar.addClass('hide');
        }
    };

    this.retornoAdicionarAlternativa = function (dados) {
        $('#cxaAdicionarAlternativa .carregando').remove();
        $('#cxaAdicionarAlternativa .btnAdicione').show();
        if (retornoErro(dados)) {
            $('#cxaAdicionarAlternativa').hide();
            return;
        }
        if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
            confirm.exibir($(dados), this.confirmaAdicionarAlternativa);
            return;
        }
        $(this.lista).append($(dados));
        var mudaStatus = $(this.lista).find(".atualizastatus");
        if (mudaStatus.length > 0) {
            $('#statusQuestao').html(mudaStatus.html());
            mudaStatus.remove();
        }
        var letra = (this.alternativas.length == 0) ? 'a' : this.alternativas[this.alternativas.length - 1].letra;
        var letraCodigo = letra.charCodeAt(0);
        $(this.lista + ' > li:last').each(function () {
            var alternativa = new Alternativa(String.fromCharCode(letraCodigo++), $(this).attr('id'), "alternativa", tiporesposta);
            tiporesposta.alternativas.push(alternativa);
        });
        $(this.id).show();
        this.callTipo("atualizarAlternativas");
        //verificar se chegou no limite
        if ($("#MaximoAlternativas").val() && $("#MaximoAlternativas").val() == 1) {
            $('#cxaAdicionarAlternativa').hide();
            //var msg = $(this.lista).find('#mensagem');
            var msg = $(this.lista).find('#mensagem').parent("div");
            mensagem.exibir($(msg));
            $(msg).remove();
        }
        $("#MaximoAlternativas").remove();
    };

    this.confirmaAdicionarAlternativa = function () {
        tiporesposta.adicionarAlternativa(true);
    };

    this.retornoRemoverAlternativa = function (letra, dados) {
        if (retornoErro(dados)) {
            return;
        }
        tiporesposta.callTipo("retornoRemoverAlternativa", letra, dados);
    };
    
    this.retornoRemoverAlternativaDefault = function (letra, dados) {
        if ($(dados).attr("class") && $(dados).attr("class").indexOf("confirm") > -1) {
            confirm.exibir($(dados), this.confirmaRemoverAlternativa);
            return;
        }
        if ($(dados).find('#status').length > 0) {
            $('#statusQuestao').html($(dados).find('#status').html());
        }
        var alternativa = this.getAlternativaPorLetra(letra);
        alternativa.remover();
        if ($(dados).find('#acao').text() == "notIsMaximo") {
            $('#cxaAdicionarAlternativa').show();
        }
        var i = 0;
        for (i = 0; i < this.alternativas.length; i++) {
            if (this.alternativas[i].letra == letra) {
                this.alternativas.splice(i--, 1);
            }
        }
        this.callTipo("atualizarAlternativas");
    };
    
    this.confirmaRemoverAlternativa = function () {
        var letra = $("#statusAtualConfirm").val();
        tiporesposta.removerAlternativa(letra, true);
    };
    
    this.atualizarAlternativasDefault = function () {
        var i = 0;
        var letraCodigo = 'a'.charCodeAt(0);
        for (i = 0; i < this.alternativas.length; i++) {
            this.alternativas[i].trocarLetra(String.fromCharCode(letraCodigo++));
        }
    };

    this.removerAlternativaPorLetra = function(letra) {
        // ...
    };

    this.getAlternativaPorLetra = function (letra) {
        for (var i = 0; i < this.alternativas.length; i++) {
            if (letra == this.alternativas[i].letra) {
                return this.alternativas[i];
            }
        }
    };
    
    this.init();
}
