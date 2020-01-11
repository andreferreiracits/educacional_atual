function TipoCategoria(sId, sIdCategoria, sCaminhoTrocar, strConteinerTipo, sCaminhoTrocarTipo,sIdTipo) {
    var tiporesposta = this;

    this.id = '#' + sId;
    this.nome = sId;
    this.categoria = sIdCategoria;
    this.tipo = sIdTipo

    this.tipoAtual = 0;
    this.finalidadeAtual = 0;

    this.conteinerTipo = strConteinerTipo;
    // Caminhos de requisição para o Server
    this.caminhoTrocar = sCaminhoTrocar;
    this.caminhoTrocarTipo = sCaminhoTrocarTipo;

    this.init = function () {
        // Adiciona a função de trocar de tipo

        if ($("select[name=" + this.categoria + "]").length > 0) {
            tiporesposta.finalidadeAtual = $("select[name=" + this.categoria + "]").val();
            $("select[name=" + this.categoria + "]").change(function () {
                
                if (tiporesposta.finalidadeAtual != this.value) {
                    tiporesposta.trocarCategoria();
                }
            });
        } else {
            $("input[name=" + this.categoria + "]").each(function () {
                if (this.checked) {
                    tiporesposta.finalidadeAtual = this.value;
                }
                $(this).click(function () {
                    //tiporesposta.trocarCategoria($(this).val());
                    if (tiporesposta.finalidadeAtual != this.value) {
                        tiporesposta.trocarCategoria();
                    }
                });
            });
        }
       
        this.botoesTipo();
        // Seleciona o tipo atual
    }

    this.botoesTipo = function () {
        $("input[name=" + this.tipo + "]").each(function () {

            if (this.checked) {
                tiporesposta.tipoAtual = this.value;
            }

            $(this).click(function () {
                if (tiporesposta.tipoAtual != this.value) {
                    tiporesposta.trocarTipo();
                }
            });
        });
    }
    this.trocarCategoria = function (confirm) {
        carregando.mostrar();
        $.ajax({
            url: this.caminhoTrocar,
            data: $(this.id).serialize() + (confirm ? "&bolConfirmTipo=1" : ""),
            type: "POST",
            success: function (dados, status, xhttp) { tiporesposta.retornoTrocarCategoria(dados); }
        });
    }


    this.retornoTrocarCategoria = function (dados) {
        carregando.esconder();
        if (retornoErro(dados)) {
            return;
        }
        if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
            confirm.exibir($(dados), this.confirmaTrocaCategoria, this.naoConfirmaTrocaCategoria);
            return;
        }
        if ($(dados).get(0).nodeName.toLowerCase() == "vazio") {
            return;
        }


        $("#" + this.conteinerTipo).html(dados);

        var mudaStatus = $("#" + this.conteinerTipo).find(".atualizastatus");
        if (mudaStatus.length > 0) {
            $('#statusQuestao').html(mudaStatus.html());
            mudaStatus.remove();
        }

        if ($("select[name=" + this.categoria + "]").length > 0) {
            tiporesposta.finalidadeAtual = $("select[name=" + this.categoria + "]").val();
        } else {

            $("input[name=" + this.categoria + "]").each(function () {
                if (this.checked) {
                    tiporesposta.finalidadeAtual = this.value;
                }
            });
        }


        this.botoesTipo();
    }
    this.confirmaTrocaCategoria = function () {
        tiporesposta.trocarCategoria(true);
    }
    this.naoConfirmaTrocaCategoria = function () {
        var intTipoAtual = $("#statusAtualConfirm").val();
        $("#" + tiporesposta.categoria + "_" + intTipoAtual).attr('checked', true);
        //rdoTipoResposta
    }
    this.trocarTipo = function (confirm) {
        carregando.mostrar();
        $.ajax({
            url: this.caminhoTrocarTipo,
            data: $(this.id).serialize() + (confirm ? "&bolConfirmTipo=1" : ""),
            type: "POST",
            success: function (dados, status, xhttp) { tiporesposta.retornoTrocarTipo(dados); }
        });
    }
    this.retornoTrocarTipo = function (dados) {
        carregando.esconder();
        if (retornoErro(dados)) {
            return;
        }
        if ($(dados).attr('class').indexOf("confirm") > -1) {
            confirm.exibir($(dados), this.confirmaTrocaTipo, this.naoConfirmaTrocaTipo);
            return;
        }

        if ($(dados).attr('class').indexOf("atualizastatus") > -1) {
            $('#statusQuestao').html($(dados).html());
        }

        $("input[name=" + this.tipo + "]").each(function () {
            $(this).parent().removeClass('ativo')
            if (this.checked) {
                $(this).parent().addClass('ativo')
                tiporesposta.tipoAtual = this.value;
            }
        });


    }
    this.confirmaTrocaTipo = function () {
        tiporesposta.trocarTipo(true);
    }
    this.naoConfirmaTrocaTipo = function () {
        var intTipoAtual = $("#statusAtualConfirm").val();
        $("#" + tiporesposta.tipo + "_" + intTipoAtual).attr('checked', true);
        //rdoTipoResposta
    }
    this.init();
}